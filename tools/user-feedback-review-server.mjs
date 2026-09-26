// Private, read-only before/after review for the user's numbered photo feedback.
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { readFile, realpath } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const folder = path.join(root, 'review/graded-previews/user-feedback-2026-09-24');
const review = JSON.parse(await readFile(path.join(folder, 'manifest.json'), 'utf8'));
const old = [];
for (const batch of [1, 2, 3]) {
  old.push(...JSON.parse(await readFile(path.join(root, `review/graded-previews/sitewide-second-pass-round${batch}-2026-09-24/manifest.json`), 'utf8')));
}
if (review.length !== 18 || old.length !== 74) throw new Error('Unexpected photo inventory');
const files = new Map();
const hash = value => createHash('sha256').update(value).digest('hex');
for (const item of review) {
  const id = item.number === 'Italy hero V5' ? 'italien' : String(item.number);
  const after = path.resolve(root, item.reviewDerivative);
  const source = path.resolve(root, item.projectCopy);
  if (!after.startsWith(`${folder}${path.sep}`) || !source.startsWith(`${root}${path.sep}`)) {
    throw new Error(`Photo path escaped project: ${id}`);
  }
  if (hash(await readFile(source)) !== item.sourceSha256 ||
      hash(await readFile(after)) !== item.derivativeSha256) {
    throw new Error(`Protected source/review hash mismatch: ${id}`);
  }
  let before;
  if (id === 'italien') {
    before = path.join(root, 'review/graded-previews/italien-hero-editorial-v4.jpg');
  } else if (item.number === 48) {
    before = path.join(root, 'review/graded-previews/sitewide-second-pass-round3-2026-09-24/03-privacy-masked-v4-review.jpg');
  } else {
    before = path.resolve(root, old[item.number - 1].reviewDerivative);
  }
  const visibleAfter = item.number === 48
    ? path.join(folder, '48-feedback-v1-plate-masked.jpg') : after;
  if (item.number === 48 && hash(await readFile(visibleAfter)) !==
      'f7b5af7175e67a238d8ec63b0b21e059a9935849cd357695a7e97a388338d90a') {
    throw new Error('Photo 48 plate-masked derivative differs');
  }
  files.set(`${id}/before`, before);
  files.set(`${id}/after`, visibleAfter);
}
// Later feedback supersedes selected V1 previews without changing any web asset.
for (const [number, folderName, fileName] of [
  [2, 'user-feedback-haze-v2-2026-09-24', '02-haze-v2.jpg'],
  [11, 'user-feedback-haze-v2-2026-09-24', '11-haze-v2.jpg'],
  [26, 'user-feedback-followup-2026-09-24', '26-followup-v2.jpg'],
  [28, 'user-feedback-followup-2026-09-24', '28-followup-v2.jpg'],
  [36, 'user-feedback-followup-2026-09-24', '36-followup-v2.jpg'],
  [50, 'photo-50-natural-v3-2026-09-24', '50-natural-v3.jpg'],
]) {
  const target = path.join(root, 'review/graded-previews', folderName, fileName);
  const manifest = JSON.parse(await readFile(path.join(root, 'review/graded-previews', folderName, 'manifest.json'), 'utf8'));
  const record = Array.isArray(manifest) ? manifest.find(entry => entry.number === number) : manifest;
  if (!record || hash(await readFile(target)) !== record.derivativeSha256) {
    throw new Error(`Follow-up hash mismatch: ${number}`);
  }
  if (number !== 36) files.set(`${number}/before`, files.get(`${number}/after`));
  files.set(`${number}/after`, target);
}
files.set('49/before', files.get('49/after'));
files.set('49/after', path.resolve(root, old[48].reviewDerivative));
const escape = value => String(value).replace(/[&<>"']/g, char =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const cards = review.map(item => {
  const id = item.number === 'Italy hero V5' ? 'italien' : String(item.number);
  const name = item.number === 'Italy hero V5' ? 'Italien-Hero · V4 → V5' :
    `${String(item.number).padStart(2, '0')} · ${item.webAsset.replace(/^assets\//, '')}`;
  const warning = item.number === 23
    ? '<p class="warning">Diese Fassung ist verworfen: Schattenartefakte; Mast-Retusche weiterhin offen.</p>'
    : item.number === 49
      ? '<p class="warning">Gewählt: bisherige Farbprobe; neuere Fassung verworfen.</p>'
    : item.number === 50
      ? '<p class="warning">Neue natürliche Einzelmotiv-Probe aus unveränderter Projektkopie; noch nicht freigegeben.</p>'
    : item.number === 13 || item.number === 19
      ? '<p class="warning">Die Wiesen sind in der Quelle überwiegend trockenbraun; kein künstlich erfundenes Grün.</p>'
      : '';
  return `<section id="bild-${id}"><h2>${escape(name)}</h2><p>${escape(item.operation)}</p>${warning}` +
    `<div class="pair"><figure><a href="/image/${id}/before" target="_blank"><img loading="lazy" src="/image/${id}/before" alt="Bisherige Farbprobe ${escape(name)}"></a><figcaption>Bisherige Farbprobe</figcaption></figure>` +
    `<figure><a href="/image/${id}/after" target="_blank"><img loading="lazy" src="/image/${id}/after" alt="Neue Prüffassung ${escape(name)}"></a><figcaption>Neue Prüffassung · nicht freigegeben</figcaption></figure></div></section>`;
}).join('\n');
const html = `<!doctype html><html lang="de"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>VanVenture · Korrektur-Review</title><style>
body{margin:0;background:#f3f0e7;color:#173a30;font:16px/1.5 system-ui,sans-serif}header{padding:1.5rem 3vw;background:#e3e7dd;position:sticky;top:0;z-index:1}h1{font:2rem Georgia,serif;margin:0}header p{margin:.3rem 0 0}main{padding:1rem 3vw 4rem}section{background:#fff;border-radius:12px;margin:1.4rem 0;padding:1rem 1.3rem;box-shadow:0 2px 12px #173a3017}h2{font:1.35rem Georgia,serif;margin:.2rem 0}section p{margin:.25rem 0 1rem}.warning{color:#8b4e20}.pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}figure{margin:0}img{display:block;width:100%;height:auto;max-height:75vh;object-fit:contain;background:#eee}figcaption{font-size:.9rem;padding:.45rem 0;color:#53665b}@media(max-width:720px){.pair{grid-template-columns:1fr}}a{color:#173a30}
</style><header><h1>VanVenture · gezielte Bildkorrekturen</h1><p>18 neue private Prüffassungen aus unveränderten Projektkopien. Links bisher, rechts neu. Keine davon ist in die Website eingebaut oder freigegeben.</p><p><a href="http://127.0.0.1:8789/">Zum gesamten Bildreview</a> · <a href="http://127.0.0.1:8790/">Zum Seitenreview</a></p></header><main>${cards}</main></html>`;

createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  if (pathname === '/') {
    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' }).end(html);
    return;
  }
  const key = /^\/image\/(italien|\d+)\/(before|after)$/.exec(pathname);
  const target = key && files.get(`${key[1]}/${key[2]}`);
  if (!target) { response.writeHead(404).end(); return; }
  try {
    const resolved = await realpath(target);
    if (!resolved.startsWith(`${root}${path.sep}`)) throw new Error('Path escaped project');
    response.writeHead(200, { 'content-type': 'image/jpeg', 'cache-control': 'no-store' }).end(await readFile(resolved));
  } catch {
    response.writeHead(404).end();
  }
}).listen(8791, '127.0.0.1', () => console.log('Private feedback review: http://127.0.0.1:8791/'));
