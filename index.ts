import indexHtml from "./index.html";

interface CustomPreset {
  id: string;
  name: string;
  icon: string;
  settings: Record<string, number>;
}

let customPresets: CustomPreset[] = [];

try {
  const file = Bun.file("user_presets.json");
  if (await file.exists()) {
    customPresets = await file.json();
  }
} catch (e) {
  console.log("No existing custom presets file found, starting fresh.");
}

const fetchHandler = async (req: Request, server: any) => {
  const url = new URL(req.url);

  if (url.pathname === "/ws") {
    const upgraded = server.upgrade(req, {
      data: { createdAt: Date.now() },
    });
    if (upgraded) return undefined;
    return new Response("WebSocket upgrade failed", { status: 400 });
  }

  if (url.pathname === "/processor.js") {
    const file = Bun.file("./processor.js");
    return new Response(file, {
      headers: { "Content-Type": "application/javascript" },
    });
  }

  if (url.pathname === "/styles.css") {
    const file = Bun.file("./styles.css");
    return new Response(file, {
      headers: { "Content-Type": "text/css" },
    });
  }

  if (url.pathname === "/app.js") {
    const file = Bun.file("./app.js");
    return new Response(file, {
      headers: { "Content-Type": "application/javascript" },
    });
  }

  if (url.pathname === "/manifest.json") {
    const file = Bun.file("./manifest.json");
    return new Response(file, {
      headers: { "Content-Type": "application/manifest+json" },
    });
  }

  if (url.pathname === "/sw.js") {
    const file = Bun.file("./sw.js");
    return new Response(file, {
      headers: { 
        "Content-Type": "application/javascript",
        "Service-Worker-Allowed": "/"
      },
    });
  }

  if (url.pathname === "/icon-192.png") {
    const file = Bun.file("./icon-192.png");
    return new Response(file, {
      headers: { "Content-Type": "image/png" },
    });
  }

  if (url.pathname === "/icon-512.png") {
    const file = Bun.file("./icon-512.png");
    return new Response(file, {
      headers: { "Content-Type": "image/png" },
    });
  }

  if (url.pathname === "/api/health") {
    return Response.json({
      status: "ok",
      server: "RADIONEST Radio Broadcaster Studio",
      uptime: process.uptime(),
      connectedClients: server.subscriberCount("voice-room"),
    });
  }

  if (url.pathname === "/api/presets") {
    if (req.method === "GET") {
      return Response.json({ presets: customPresets });
    }
    if (req.method === "POST") {
      try {
        const body = await req.json() as { name?: string; icon?: string; settings?: Record<string, number> };
        if (body && body.name && body.settings) {
          const newPreset: CustomPreset = {
            id: "custom-" + Date.now(),
            name: body.name,
            icon: body.icon || "🎛️",
            settings: body.settings,
          };
          customPresets.push(newPreset);
          await Bun.write("user_presets.json", JSON.stringify(customPresets, null, 2));
          return Response.json({ success: true, preset: newPreset });
        }
        return Response.json({ error: "Invalid preset payload" }, { status: 400 });
      } catch (err) {
        return Response.json({ error: "Failed to parse JSON payload" }, { status: 400 });
      }
    }
  }

  return new Response("Not Found", { status: 404 });
};

const websocketHandler = {
  open(ws: any) {
    ws.subscribe("voice-room");
    const clientCount = server.subscriberCount("voice-room");
    server.publish("voice-room", JSON.stringify({ type: "presence", count: clientCount }));
    ws.send(JSON.stringify({ type: "welcome", count: clientCount }));
  },
  message(ws: any, message: any) {
    if (typeof message === "string") {
      ws.publishText("voice-room", message);
    } else {
      ws.publishBinary("voice-room", message);
    }
  },
  close(ws: any) {
    ws.unsubscribe("voice-room");
    const clientCount = server.subscriberCount("voice-room");
    server.publish("voice-room", JSON.stringify({ type: "presence", count: clientCount }));
  },
};

const preferredPort = Number(process.env.PORT) || 3000;
let server: any;

try {
  server = Bun.serve({
    port: preferredPort,
    routes: { "/": indexHtml },
    fetch: fetchHandler,
    websocket: websocketHandler,
    development: { hmr: true, console: true },
  });
} catch (err) {
  // Port conflict fallback
  server = Bun.serve({
    port: 0,
    routes: { "/": indexHtml },
    fetch: fetchHandler,
    websocket: websocketHandler,
    development: { hmr: true, console: true },
  });
}

console.log(`🎙️ Voice Changer Server running at http://localhost:${server.port}`);

export default server;