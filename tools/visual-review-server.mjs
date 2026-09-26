/** Local-only visual acceptance hub; never serves source or original photos. */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const folder = path.join(root, 'review', 'responsive-2026-09-24');
const audit = JSON.parse(await readFile(path.join(folder, 'audit.json'), 'utf8'));
const pages = [...new Set(audit.map(row => row.filename))];
const sizes = ['phone-portrait', 'phone-landscape', 'tablet-portrait', 'tablet-landscape', 'desktop'];
const labels = { 'phone-portrait': 'Smartphone hoch', 'phone-landscape': 'Smartphone quer',
  'tablet-portrait': 'Tablet hoch', 'tablet-landscape': 'Tablet quer', desktop: 'Desktop' };
const escapeHtml = value => String(value).replace(/[&<>"']/g, character =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const allowed = new Set(audit.map(row => `${row.filename.slice(0, -5)}-${row.size}.png`));
for (const file of ['navigation-mobile-open.png', 'scott-gallery-desktop.png',
  'kajak-gallery-mobile.png', 'sardinien-gallery-desktop.png',
  'scott-viewer-mobile.png', 'scott-viewer-desktop.png']) allowed.add(file);
const cards = pages.map(filename => {
  const stem = filename.slice(0, -5);
  const rows = audit.filter(row => row.filename === filename);
  const failed = rows.filter(row => row.status !== 200 || row.documentWidth > row.viewport + 2 ||
    row.h1Count !== 1 || row.brokenImages.length || row.errors.length || row.viewer.includes('failed'));
  const tiles = sizes.map(size => `<a class="shot" href="/shot/${stem}-${size}.png" target="_blank" rel="noopener"><img src="/shot/${stem}-${size}.png" alt="${escapeHtml(filename)} · ${labels[size]}" loading="lazy"><span>${labels[size]}</span></a>`).join('');
  return `<section id="${stem}"><div class="title"><h2>${escapeHtml(filename)}</h2><a href="http://127.0.0.1:8788/${filename}" target="_blank" rel="noopener">Seite selbst öffnen ↗</a><small>${failed.length ? `${failed.length} offene Prüfpunkte` : '5 Formate technisch bestanden'}</small></div><div class="tiles">${tiles}</div></section>`;
}).join('');
const html = `<!doctype html><html lang="de"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>VanVenture · visueller Seitenreview</title><style>
*{box-sizing:border-box}body{margin:0;background:#f4f2ec;color:#173b32;font:16px/1.5 system-ui,sans-serif}header{padding:2rem 3vw;background:#173b32;color:white}h1{margin:0;font-size:clamp(1.6rem,3vw,2.5rem)}header p{max-width:70ch}a{color:inherit}nav{position:sticky;top:0;z-index:2;background:#e9ede6;padding:.6rem 3vw;display:flex;gap:1rem;overflow:auto;white-space:nowrap;border-bottom:1px solid #bac9bd}nav a{text-decoration:none;font-size:.82rem}main{padding:1rem 3vw 3rem}section{padding:2rem 0;border-bottom:1px solid #c8d1c7}.title{display:flex;align-items:baseline;gap:1rem;flex-wrap:wrap}.title h2{margin:0;font-size:1.35rem}.title a{font-size:.85rem}.title small{color:#617367}.tiles{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:1rem;margin-top:1rem}.shot{display:block;background:white;padding:.55rem;text-decoration:none;box-shadow:0 2px 10px #173b3220}.shot img{display:block;width:100%;height:290px;object-fit:contain;object-position:top;background:#f7f7f2}.shot span{display:block;padding:.4rem .15rem;font-size:.8rem}@media(max-width:900px){.tiles{grid-template-columns:repeat(2,minmax(0,1fr))}.shot img{height:230px}}@media(max-width:500px){.tiles{grid-template-columns:1fr 1fr}.shot img{height:180px}}
</style><header><h1>VanVenture · lokaler Seitenreview</h1><p>${pages.length} öffentliche Seiten in fünf Formaten. Die früheren Ausrüstungs- und Radübersichten sind nicht mehr öffentlich; ihre Adressen leiten zur Startseite. Die Bilder zeigen den aktuellen lokalen Stand, keine Live-Veröffentlichung. Anklicken öffnet den Screenshot in voller Größe; „Seite selbst öffnen“ erlaubt das Prüfen von Navigation, Galerie und Foto-Viewer.</p><p><a href="http://127.0.0.1:8789/">Zum separaten Bildreview ↗</a></p></header><nav>${pages.map(filename => `<a href="#${filename.slice(0, -5)}">${escapeHtml(filename)}</a>`).join('')}</nav><main><section><div class="title"><h2>Gemeinsame Navigation, Galerien und Viewer</h2></div><div class="tiles">${[
  ['navigation-mobile-open.png', 'Navigation · mobil'],
  ['scott-gallery-desktop.png', 'Black-Beauty-Galerie'],
  ['kajak-gallery-mobile.png', 'Kajak-Galerie · mobil'],
  ['sardinien-gallery-desktop.png', 'Sardinien-Galerie'],
  ['scott-viewer-mobile.png', 'Foto-Viewer · mobil'],
  ['scott-viewer-desktop.png', 'Foto-Viewer · Desktop'],
].map(([file, label]) => `<a class="shot" href="/shot/${file}" target="_blank" rel="noopener"><img src="/shot/${file}" alt="${label}" loading="lazy"><span>${label}</span></a>`).join('')}</div></section>${cards}</main></html>`;

createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  if (pathname === '/') {
    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' }).end(html);
    return;
  }
  const match = /^\/shot\/([\w-]+\.png)$/.exec(pathname);
  if (!match || !allowed.has(match[1])) { response.writeHead(404).end(); return; }
  try {
    const file = await readFile(path.join(folder, match[1]));
    response.writeHead(200, { 'content-type': 'image/png', 'cache-control': 'no-store' }).end(file);
  } catch { response.writeHead(404).end(); }
}).listen(8790, '127.0.0.1', () => console.log('Visual review: http://127.0.0.1:8790/'));
