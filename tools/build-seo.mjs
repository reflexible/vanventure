import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { applySeo, pages, sitemap, robots } from '../editor/seo.mjs';
const root = new URL('../', import.meta.url);
for (const file of Object.keys(pages)) {
  const source = file;
  const sourcePath = fileURLToPath(new URL(source, root));
  const targetPath = fileURLToPath(new URL(file, root));
  writeFileSync(targetPath, applySeo(readFileSync(sourcePath, 'utf8'), file));
}
writeFileSync(new URL('sitemap.xml', root), sitemap());
writeFileSync(new URL('robots.txt', root), robots());
console.log(`SEO metadata and sitemap built for ${Object.keys(pages).length} public pages.`);
