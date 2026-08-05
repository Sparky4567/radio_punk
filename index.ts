import { Database } from "bun:sqlite";
import indexHtml from "./index.html";

interface CustomPreset {
  id: string;
  name: string;
  icon: string;
  storage_type?: string;
  settings: Record<string, number>;
}

// SQLite Database Initialization
const db = new Database("presets.sqlite");
db.run(`
  CREATE TABLE IF NOT EXISTS presets (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    storage_type TEXT DEFAULT 'sqlite',
    settings TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Seed default SQLite presets if table is empty
const countRow = db.query("SELECT COUNT(*) as count FROM presets").get() as { count: number };
if (countRow && countRow.count === 0) {
  const seeds = [
    {
      id: "sqlite-seed-1",
      name: "Golden Age Radio",
      icon: "📻",
      settings: { pitchShift: 0, radioBass: 8, radioPresence: 10, radioWarmth: 40, radioCompressor: 80, masterGain: 100 }
    },
    {
      id: "sqlite-seed-2",
      name: "Deep Space FM",
      icon: "🚀",
      settings: { pitchShift: -2, radioBass: 12, radioPresence: 5, radioWarmth: 30, radioCompressor: 70, masterGain: 105 }
    },
    {
      id: "sqlite-seed-3",
      name: "Broadcast Master Punch",
      icon: "⚡",
      settings: { pitchShift: 0, radioBass: 14, radioPresence: 12, radioWarmth: 20, radioCompressor: 90, masterGain: 110 }
    }
  ];
  for (const seed of seeds) {
    db.query("INSERT INTO presets (id, name, icon, storage_type, settings) VALUES (?, ?, ?, ?, ?)").run(
      seed.id,
      seed.name,
      seed.icon,
      "sqlite",
      JSON.stringify(seed.settings)
    );
  }
}

function getSqlitePresets(): CustomPreset[] {
  try {
    const rows = db.query("SELECT * FROM presets ORDER BY created_at DESC").all() as any[];
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      icon: row.icon,
      storage_type: row.storage_type || "sqlite",
      settings: typeof row.settings === "string" ? JSON.parse(row.settings) : row.settings,
    }));
  } catch (err) {
    console.error("Error fetching SQLite presets:", err);
    return [];
  }
}

function saveSqlitePreset(name: string, icon: string, settings: Record<string, number>): CustomPreset {
  const id = "sqlite-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7);
  const iconVal = icon || "🎛️";
  const settingsJson = JSON.stringify(settings);
  db.query("INSERT INTO presets (id, name, icon, storage_type, settings) VALUES (?, ?, ?, ?, ?)").run(
    id,
    name,
    iconVal,
    "sqlite",
    settingsJson
  );
  return {
    id,
    name,
    icon: iconVal,
    storage_type: "sqlite",
    settings,
  };
}

function deleteSqlitePreset(id: string): boolean {
  const result = db.query("DELETE FROM presets WHERE id = ?").run(id);
  return result.changes > 0;
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
      sqlitePresetsCount: getSqlitePresets().length,
    });
  }

  // Dedicated SQLite Presets API
  if (url.pathname === "/api/presets/sqlite") {
    if (req.method === "GET") {
      const presets = getSqlitePresets();
      return Response.json({ presets });
    }
    if (req.method === "POST") {
      try {
        const body = (await req.json()) as { name?: string; icon?: string; settings?: Record<string, number> };
        if (body && body.name && body.settings) {
          const preset = saveSqlitePreset(body.name, body.icon || "🎛️", body.settings);
          return Response.json({ success: true, preset });
        }
        return Response.json({ error: "Invalid preset payload" }, { status: 400 });
      } catch (err) {
        return Response.json({ error: "Failed to parse JSON payload" }, { status: 400 });
      }
    }
  }

  if (url.pathname.startsWith("/api/presets/sqlite/")) {
    const id = url.pathname.replace("/api/presets/sqlite/", "");
    if (req.method === "DELETE") {
      const deleted = deleteSqlitePreset(id);
      return Response.json({ success: deleted });
    }
  }

  if (url.pathname === "/api/presets") {
    const engineParam = url.searchParams.get("engine");
    if (engineParam === "sqlite") {
      if (req.method === "GET") {
        return Response.json({ presets: getSqlitePresets() });
      }
    }
    if (req.method === "GET") {
      return Response.json({ presets: customPresets, sqlitePresets: getSqlitePresets() });
    }
    if (req.method === "POST") {
      try {
        const body = await req.json() as { name?: string; icon?: string; settings?: Record<string, number>; storage_type?: string };
        if (body && body.name && body.settings) {
          if (body.storage_type === "sqlite") {
            const preset = saveSqlitePreset(body.name, body.icon || "🎛️", body.settings);
            return Response.json({ success: true, preset });
          }
          const newPreset: CustomPreset = {
            id: "custom-" + Date.now(),
            name: body.name,
            icon: body.icon || "🎛️",
            storage_type: "file",
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

  if (url.pathname.startsWith("/api/presets/")) {
    const id = url.pathname.replace("/api/presets/", "");
    if (req.method === "DELETE") {
      if (id.startsWith("sqlite-")) {
        const deleted = deleteSqlitePreset(id);
        return Response.json({ success: deleted });
      } else {
        const idx = customPresets.findIndex((p) => p.id === id);
        if (idx !== -1) {
          customPresets.splice(idx, 1);
          await Bun.write("user_presets.json", JSON.stringify(customPresets, null, 2));
          return Response.json({ success: true });
        }
        return Response.json({ error: "Preset not found" }, { status: 404 });
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