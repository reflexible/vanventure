// Local-only photo review. Serves checked derivatives, never source copies.
import { createServer } from 'node:http';
import { readFile, realpath } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const folders = [1, 2, 3].map(round =>
  path.join(root, 'review', 'graded-previews', `sitewide-second-pass-round${round}-2026-09-24`));
const entries = [];
for (const folder of folders) {
  const manifest = JSON.parse(await readFile(path.join(folder, 'manifest.json'), 'utf8'));
  for (const entry of manifest) {
    const file = path.resolve(root, entry.reviewDerivative);
    if (!file.startsWith(`${folder}${path.sep}`) || !entry.derivativeSha256) {
      throw new Error(`Invalid derivative manifest entry: ${entry.webAsset}`);
    }
    entries.push({ ...entry, file });
  }
}
if (entries.length !== 74) throw new Error(`Expected 74 review variants, got ${entries.length}`);
const masked = new Map([
  [37, path.join(folders[1], '01-reisen--italien-2021--gallery--dsc-1719-review-child-only-v3.jpg')],
  [45, path.join(folders[2], '01-privacy-masked-v5-review.jpg')],
  [51, path.join(folders[2], '07-privacy-masked-v10-review.jpg')],
  [66, path.join(folders[2], '22-privacy-masked-v13-review.jpg')],
  [47, path.join(folders[2], '03-privacy-masked-v4-review.jpg')],
  [52, path.join(folders[2], '08-privacy-masked-v3-review.jpg')],
  [53, path.join(folders[2], '09-privacy-masked-v3-review.jpg')],
  [55, path.join(folders[2], '11-privacy-masked-v5-review.jpg')],
  [61, path.join(folders[2], '17-privacy-masked-v5-review.jpg')],
  [72, path.join(folders[2], '28-privacy-masked-v10-review.jpg')],
]);
// Both were checked at full preview resolution: only non-identifying back-of-head views.
const safeBackViews = new Set([70, 73]);
// Full-resolution crops: the Norway campsite view has no visible plate or face.
const safeNoVisibleIdentifiers = new Set([56]);
// Explicit 24 Sep decision: adults remain visible; no routine adult face masks.
const adultPreviews = new Set([39, 48, 49, 50, 54, 57, 58, 59, 60, 63, 65, 71]);
const isVisible = (entry, index) =>
  Boolean(entry.safeForChatPreview || masked.has(index) || safeBackViews.has(index) || safeNoVisibleIdentifiers.has(index) || adultPreviews.has(index));
const visibleCount = entries.filter(isVisible).length;
const blockedCount = entries.length - visibleCount;
const specials = new Map([
  ['italien', path.join(root, 'review/graded-previews/italien-hero-editorial-v4.jpg')],
  ['trulli', path.join(root, 'review/privacy-previews/trulli-editorial-review-v12.jpg')],
]);

const escapeHtml = value => String(value).replace(/[&<>"']/g, character =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const cards = entries.map((entry, index) => {
  const label = `${String(index + 1).padStart(2, '0')} · ${entry.webAsset.replace(/^assets\//, '')}`;
  const visible = isVisible(entry, index);
  const media = visible
    ? `<a href="/photo/${index}" target="_blank" rel="noopener"><img src="/photo/${index}" loading="lazy" alt="${escapeHtml(label)}"></a>`
    : '<div class="blocked">Zurückgestellt: Gesichts- oder Kennzeichenprüfung</div>';
  return `<article id="bild-${index + 1}">${media}<p>${escapeHtml(label)}</p><small>${escapeHtml(entry.profile)} · ${visible ? 'Farbvorschau, noch nicht freigegeben' : 'noch keine sichere Vorschau'}</small></article>`;
}).join('\n');
const html = `<!doctype html><html lang="de"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>VanVenture · Bildreview</title><style>
body{margin:0;background:#f4f2ec;color:#173b32;font:16px/1.45 system-ui,sans-serif}header{position:sticky;top:0;background:#f4f2eced;padding:1rem 3vw;z-index:1;border-bottom:1px solid #cad1c6}h1{font-size:1.4rem;margin:0}header p{margin:.3rem 0 0}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,560px),1fr));gap:2rem;padding:2rem 3vw}article{background:white;border-radius:14px;overflow:hidden;box-shadow:0 2px 12px #183c321c}img{display:block;width:100%;height:auto;max-height:80vh;object-fit:contain;background:#ebeae3}.blocked{display:grid;place-items:center;min-height:260px;padding:1rem;background:#e5e8e0;color:#6a514b;text-align:center}article p{font-weight:650;margin:1rem 1rem .2rem;overflow-wrap:anywhere}small{display:block;margin:0 1rem 1rem;color:#586b60}
</style><header><h1>VanVenture · Einzelbild-Review</h1><p>74 weitere Varianten: ${visibleCount} private Farbproben sichtbar, ${blockedCount} bis zur Datenschutzprüfung zurückgestellt. Die freigegebenen Bilder 1, 2 und 5 sowie Fahrzeugbilder bleiben unangetastet. Kein Bild dieser Seite ist damit zur Veröffentlichung freigegeben.</p><p><a href="http://127.0.0.1:8790/">Zum Seitenreview ↗</a></p></header><main><article><a href="/special/italien" target="_blank" rel="noopener"><img src="/special/italien" alt="Italien-Hero: neue private Farbprobe V4"></a><p>Italien-Hero · Farbprobe V4</p><small>Noch nicht eingebaut oder freigegeben</small></article><article><a href="/special/trulli" target="_blank" rel="noopener"><img src="/special/trulli" alt="Trulli-Haus: neue private Perspektiv- und Datenschutzprobe V12"></a><p>Trulli-Haus · Perspektive V12</p><small>Noch nicht eingebaut oder freigegeben</small></article>${cards}</main></html>`;

createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  if (pathname === '/') {
    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' }).end(html);
    return;
  }
  const special = /^\/special\/(italien|trulli)$/.exec(pathname)?.[1];
  if (special) {
    try {
      response.writeHead(200, { 'content-type': 'image/jpeg', 'cache-control': 'no-store' }).end(await readFile(specials.get(special)));
    } catch { response.writeHead(404).end(); }
    return;
  }
  const match = /^\/photo\/(\d+)$/.exec(pathname);
  const index = match ? Number(match[1]) : -1;
  const entry = entries[index];
  if (!entry || !isVisible(entry, index)) {
    response.writeHead(404).end();
    return;
  }
  try {
    const file = await realpath(masked.get(index) ?? entry.file);
    if (!file.startsWith(`${folders[Math.floor(index < 37 ? 0 : index < 45 ? 1 : 2)]}${path.sep}`)) throw new Error('Escaped review folder');
    response.writeHead(200, { 'content-type': 'image/jpeg', 'cache-control': 'no-store' }).end(await readFile(file));
  } catch {
    response.writeHead(404).end();
  }
}).listen(8789, '127.0.0.1', () => console.log('Private review: http://127.0.0.1:8789/'));
