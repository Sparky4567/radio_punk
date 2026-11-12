import { mkdir, rm } from "node:fs/promises";

// Publish only browser assets; never upload the database or server source.
await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
const assets = [
  "app.js", "styles.css", "processor.js", "manifest.json", "sw.js",
  "icon-192.png", "icon-512.png",
];
for (const asset of assets) {
  await Bun.write(`dist/${asset}`, Bun.file(asset));
}
const html = (await Bun.file("index.html").text())
  .replace("<html", '<html data-static-host="true"');
await Bun.write("dist/index.html", html);
// Prevent Pages' SPA fallback from returning HTML for missing API/assets.
await Bun.write("dist/404.html", "<!doctype html><title>Not found</title><h1>Not found</h1>");
await Bun.write("dist/_headers", "/sw.js\n  Cache-Control: no-cache\n  Service-Worker-Allowed: /\n");
console.log("Built Cloudflare Pages assets in dist/");
