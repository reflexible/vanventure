/** Read-only local-site visual/interaction audit; screenshots stay in review/. */
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require(path.resolve(path.dirname(process.execPath), '../node_modules/playwright'))); }

const origin = process.env.VANVENTURE_PREVIEW_ORIGIN || 'http://127.0.0.1:8788';
const output = path.resolve('review/responsive-2026-09-24');
const pages = [
  'index.html', 'vehicle.html', 'kajak.html', 'norwegen-2018.html',
  'sardinien-2019.html', 'italien-2021.html',
  'scott-mountainbike.html', 'cube.html', 'trek-gravelbike.html',
  'diamant-stadtraeder.html', 'woom-2.html',
];
const sizes = [
  { name: 'phone-portrait', width: 390, height: 844 },
  { name: 'phone-landscape', width: 844, height: 390 },
  { name: 'tablet-portrait', width: 768, height: 1024 },
  { name: 'tablet-landscape', width: 1024, height: 768 },
  { name: 'desktop', width: 1440, height: 900 },
];
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.VANVENTURE_CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
});
const result = [];
await mkdir(output, { recursive: true });
try {
  for (const filename of pages) {
    for (const size of sizes) {
      const page = await browser.newPage({ viewport: size, deviceScaleFactor: 1 });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      const response = await page.goto(`${origin}/${filename}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(250);
      const metrics = await page.evaluate(() => {
        const all = [...document.querySelectorAll('body *')];
        const overflowing = all.filter(element => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return rect.width > 0 && rect.left < innerWidth && rect.right > innerWidth + 2 &&
            !['absolute', 'fixed'].includes(style.position) && style.visibility !== 'hidden';
        }).slice(0, 8).map(element => ({ tag: element.tagName, className: String(element.className).slice(0, 100) }));
        const vehicleContent = document.querySelector('#fahrzeugdaten > :last-child');
        const setupHeading = document.querySelector('#ausruestung .section-topline');
        return {
          viewport: innerWidth, documentWidth: document.documentElement.scrollWidth,
          h1Count: document.querySelectorAll('h1').length,
          images: document.querySelectorAll('main img').length,
          brokenImages: [...document.querySelectorAll('main img')].filter(image => image.complete && !image.naturalWidth).map(image => image.getAttribute('src')),
          setupCards: [...document.querySelectorAll('#ausruestung .kit-grid > a')].map(link => link.getAttribute('href')),
          setupGap: vehicleContent && setupHeading ? Math.round(setupHeading.getBoundingClientRect().top - vehicleContent.getBoundingClientRect().bottom) : null,
          overflowing,
        };
      });
      const stem = filename.replace('.html', '');
      await page.screenshot({ path: path.join(output, `${stem}-${size.name}.png`) });
      if (filename === 'index.html') {
        await page.locator('#ausruestung').screenshot({ path: path.join(output, `index-${size.name}-setup.png`) });
        await page.evaluate(() => {
          const setup = document.querySelector('#ausruestung');
          scrollTo(0, setup.getBoundingClientRect().top + scrollY - Math.min(innerHeight * 0.65, 390));
        });
        await page.screenshot({ path: path.join(output, `index-${size.name}-setup-transition.png`) });
      }
      let viewer = 'none';
      const trigger = page.locator('main .site-photo-trigger').first();
      if (await trigger.count()) {
        try {
          const firstIsHero = await trigger.evaluate(element => Boolean(element.closest('.kayak-page-hero, .equipment-hero, .story-hero, .hero')));
          if (firstIsHero) {
            const bounds = await trigger.boundingBox();
            await trigger.click({ timeout: 3000, position: { x: Math.max(5, bounds.width - 26), y: Math.min(100, bounds.height / 2) } });
          } else {
            await trigger.evaluate(element => element.scrollIntoView({ block: 'center' }));
            await page.waitForTimeout(500); // lazy-loaded editorial images gain height after scrolling
            await trigger.click({ timeout: 3000 });
          }
          viewer = await page.locator('#site-photo-viewer').evaluate(dialog => dialog.open ? 'opened' : 'failed');
          await page.keyboard.press('Escape');
          if (await page.locator('#site-photo-viewer').evaluate(dialog => dialog.open)) viewer = 'escape-failed';
        } catch (error) { viewer = `failed: ${error.message.split('\n')[0]}`; }
      }
      result.push({ filename, size: size.name, status: response?.status(), ...metrics, viewer, errors });
      await page.close();
    }
  }
} finally { await browser.close(); }
await writeFile(path.join(output, 'audit.json'), JSON.stringify(result, null, 2));
const failures = result.filter(row => row.status !== 200 || row.documentWidth > row.viewport + 2 || row.h1Count !== 1 || row.brokenImages.length || row.errors.length || row.viewer.includes('failed') ||
  (row.filename === 'index.html' && (row.setupCards.join(',') !== 'vehicle.html,scott-mountainbike.html,kajak.html' || row.setupGap === null || row.setupGap > 200)));
console.log(`${result.length} viewport/page checks; ${failures.length} failures. Screenshots and audit.json: ${output}`);
for (const row of failures) console.log(`${row.filename} ${row.size}: width ${row.documentWidth}/${row.viewport}, broken ${row.brokenImages.length}, h1 ${row.h1Count}, viewer ${row.viewer}, errors ${row.errors.length}`);
if (failures.length) process.exitCode = 1;
