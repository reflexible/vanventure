import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { applySeo, pages, canonicalUrl, sitemap } from './seo.mjs';
import { renderStory } from './render.mjs';

test('static SEO is idempotent, references existing images, and has exactly one canonical per public page', () => {
  for (const file of Object.keys(pages)) {
    const html = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
    assert.equal(applySeo(html, file).replaceAll('\r\n','\n'), html.replaceAll('\r\n','\n'));
    assert.equal((html.match(/rel="canonical"/g)||[]).length, 1);
    assert.equal((html.match(/<title>/g)||[]).length, 1);
    assert.equal((html.match(/name="description"/g)||[]).length, 1);
    assert.ok(html.includes(`href="${canonicalUrl(file)}"`));
    assert.match(html, /<link rel="icon" href="\/favicon\.ico" sizes="any">/);
    assert.match(html, /<link rel="icon" type="image\/png" href="\/favicon-96x96\.png" sizes="96x96">/);
    assert.match(html, /<link rel="apple-touch-icon" href="\/apple-touch-icon\.png" sizes="180x180">/);
    assert.match(html, /<link rel="manifest" href="\/site\.webmanifest">/);
    const data = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    const image = new URL(data['@graph'][1].primaryImageOfPage.url);
    assert.ok(existsSync(new URL(`..${image.pathname}`, import.meta.url)));
  }
  assert.ok(!sitemap().includes('redaktion'));
  assert.ok(!sitemap().includes('review'));
  for (const file of ['favicon.ico', 'favicon-96x96.png', 'favicon-192x192.png', 'favicon-512x512.png', 'apple-touch-icon.png', 'site.webmanifest']) {
    assert.ok(existsSync(new URL(`../${file}`, import.meta.url)), `${file} missing`);
  }
});
test('published story metadata follows editorial changes; preview stays noindex and JSON-LD cannot inject HTML', () => {
  const story = JSON.parse(readFileSync(new URL('../travel-stories.json', import.meta.url)))[0];
  story.subtitle[0] = 'Fjord & Kajak </script><script>alert(1)</script>';
  const html = renderStory(story);
  const json = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1];
  assert.equal(JSON.parse(json)['@graph'][1].description, story.subtitle[0]);
  assert.ok(!json.includes('<'));
  const preview = renderStory(story, true);
  assert.match(preview, /noindex,nofollow/);
  assert.ok(!preview.includes('rel="canonical"'));
});
