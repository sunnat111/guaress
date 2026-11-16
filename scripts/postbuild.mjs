// Writes a styled out/404.html (GitHub Pages serves it for unknown paths).
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const emblem = readFileSync(join(root, "src/brand/emblem.svg"), "utf8")
  .replace("<svg ", '<svg width="72" height="72" ')
  .replaceAll("currentColor", "#0e2f66");

const html = `<!doctype html>
<html lang="uz">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>404 — Guaress</title>
<link rel="icon" href="${base}/icon.svg">
<style>
  html,body{margin:0;height:100%;background:#fbf9f5;color:#15171c;font-family:Manrope,system-ui,-apple-system,"Segoe UI",sans-serif}
  main{min-height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px;box-sizing:border-box}
  h1{font-family:"Cormorant Garamond","Times New Roman",serif;font-weight:300;font-size:clamp(72px,14vw,140px);line-height:1;margin:32px 0 8px;color:#0e2f66;font-style:italic}
  p{color:#5b5e66;margin:0 0 36px;font-size:15px}
  a{display:inline-flex;align-items:center;height:50px;padding:0 28px;border-radius:999px;background:#0e2f66;color:#fff;text-decoration:none;font-size:13px;font-weight:600;margin:4px}
  a+a{background:transparent;color:#15171c;border:1px solid rgba(21,23,28,.2)}
  a:hover{background:#15171c;color:#fff}
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
