// Writes a styled out/404.html (GitHub Pages serves it for unknown paths).
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const emblem = readFileSync(join(root, "src/brand/emblem.svg"), "utf8")
  .replace("<svg ", '<svg width="72" height="72" ')
  .replaceAll("currentColor", "#0b3a8a");

const html = `<!doctype html>
<html lang="uz">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>404 — Guaress</title>
<link rel="icon" href="${base}/icon.svg">
<style>
  html,body{margin:0;height:100%;background:#f2eee8;color:#141414;font-family:Jost,system-ui,-apple-system,"Segoe UI",sans-serif}
  main{min-height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px;box-sizing:border-box}
  h1{font-weight:300;text-transform:uppercase;letter-spacing:.06em;font-size:clamp(32px,6vw,56px);margin:28px 0 10px}
  p{color:#6d6862;font-weight:300;margin:0 0 32px}
  a{display:inline-flex;align-items:center;height:52px;padding:0 28px;background:#141414;color:#fff;text-decoration:none;font-size:12px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;margin:4px}
  a:hover{background:#0b3a8a}
</style>
</head>
<body><main>
${emblem}
<h1>404</h1>
<p>Sahifa topilmadi · Страница не найдена</p>
<div><a href="${base}/uz/">Bosh sahifa</a><a href="${base}/ru/">Главная</a></div>
</main></body>
</html>
`;
writeFileSync(join(root, "out/404.html"), html);
console.log("postbuild: wrote out/404.html");
