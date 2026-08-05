import { test, expect, describe, beforeAll, afterAll } from "bun:test";
import server from "./index";

describe("RADIONEST Radio Broadcaster Studio & API", () => {
  const baseUrl = `http://localhost:${server.port}`;

  test("GET / returns 200 and index.html Radio Console content", async () => {
    const res = await fetch(`${baseUrl}/`);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("RADIONEST");
    expect(html).toContain("STUDIO CONSOLE");
    expect(html).toContain("DECK A");
    expect(html).toContain("DECK B");
    expect(html).toContain("CROSSFADER");
    expect(html).toContain("SOUNDBOARD JINGLE CART WALL");
  });

  test("GET /processor.js returns javascript content type", async () => {
    const res = await fetch(`${baseUrl}/processor.js`);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("javascript");
    const code = await res.text();
    expect(code).toContain("PitchShifterProcessor");
  });

  test("GET /styles.css returns CSS content type", async () => {
    const res = await fetch(`${baseUrl}/styles.css`);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("css");
    const css = await res.text();
    expect(css).toContain("on-air-badge");
    expect(css).toContain("crossfader-card");
  });

  test("GET /app.js returns javascript content type", async () => {
    const res = await fetch(`${baseUrl}/app.js`);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("javascript");
    const js = await res.text();
    expect(js).toContain("RadioStudioEngine");
    expect(js).toContain("triggerSoundboard");
  });

  test("GET /api/health returns radio studio health status JSON", async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    expect(res.status).toBe(200);
    const json = await res.json() as { status: string; server: string };
    expect(json.status).toBe("ok");
    expect(json.server).toContain("RADIONEST Radio Broadcaster Studio");
  });

  test("GET /api/presets & POST /api/presets works correctly", async () => {
    const getRes = await fetch(`${baseUrl}/api/presets`);
    expect(getRes.status).toBe(200);
    const getJson = await getRes.json() as { presets: any[] };
    expect(Array.isArray(getJson.presets)).toBe(true);

    const newPreset = {
      name: "Midnight Jazz FM",
      icon: "🎷",
      settings: { radioBass: 14, radioPresence: 6 }
    };
    const postRes = await fetch(`${baseUrl}/api/presets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPreset)
    });
    expect(postRes.status).toBe(200);
    const postJson = await postRes.json() as { success: boolean; preset: { name: string } };
    expect(postJson.success).toBe(true);
    expect(postJson.preset.name).toBe("Midnight Jazz FM");
  });

  test("GET / contains ON AIR and Soundboard controls", async () => {
    const res = await fetch(`${baseUrl}/`);
    const html = await res.text();
    expect(html).toContain("ON AIR");
    expect(html).toContain("AIRHORN");
    expect(html).toContain("NEWS INTRO");
    expect(html).toContain("SIREN");
  });

  test("GET /manifest.json returns valid web app manifest", async () => {
    const res = await fetch(`${baseUrl}/manifest.json`);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("manifest+json");
    const manifest = await res.json() as { name: string; display: string };
    expect(manifest.name).toContain("RADIONEST");
    expect(manifest.display).toBe("standalone");
  });

  test("GET /sw.js returns service worker script", async () => {
    const res = await fetch(`${baseUrl}/sw.js`);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("javascript");
    const code = await res.text();
    expect(code).toContain("CACHE_NAME");
  });

  test("GET /icon-192.png & /icon-512.png returns PNG images", async () => {
    const res192 = await fetch(`${baseUrl}/icon-192.png`);
    expect(res192.status).toBe(200);
    expect(res192.headers.get("content-type")).toContain("image/png");

    const res512 = await fetch(`${baseUrl}/icon-512.png`);
    expect(res512.status).toBe(200);
    expect(res512.headers.get("content-type")).toContain("image/png");
  });
});

describe("Radio DSP & Equal Power Crossfader Calculations", () => {
  test("Equal power crossfade curve calculation", () => {
    const calcXfaderGains = (val: number) => {
      const x = val / 100;
      return {
        gainA: Math.cos(x * 0.5 * Math.PI),
        gainB: Math.sin(x * 0.5 * Math.PI),
      };
    };

    const left = calcXfaderGains(0);
    expect(left.gainA).toBeCloseTo(1.0);
    expect(left.gainB).toBeCloseTo(0.0);

    const center = calcXfaderGains(50);
    expect(center.gainA).toBeCloseTo(Math.SQRT1_2);
    expect(center.gainB).toBeCloseTo(Math.SQRT1_2);

    const right = calcXfaderGains(100);
    expect(right.gainA).toBeCloseTo(0.0);
    expect(right.gainB).toBeCloseTo(1.0);
  });
});
