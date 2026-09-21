import { applySeo } from './seo.mjs';

export function escape(value) {
  return String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function text(tag, pair, cls = '') {
  return `<${tag}${cls ? ` class="${cls}"` : ''} data-de="${escape(pair[0])}" data-en="${escape(pair[1])}">${escape(pair[0])}</${tag}>`;
}

function imagePath(path) {
  return /^assets\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_.-]+\.(png|jpe?g|webp)$/i.test(path || '') ? '/' + path : '';
}

function videos(s) {
  return (s.videos || [])
    .filter(v => /^[a-zA-Z0-9_-]{11}$/.test(v[0]))
    .map(v => `<a class="button button-dark" href="https://www.youtube.com/watch?v=${escape(v[0])}" target="_blank" rel="noopener">${escape(v[1])} ↗</a>`)
    .join('');
}

function siteHeader() {
  return `<header class="site-header magazine-header story-header" data-section="trips"><a class="brand" href="/" aria-label="VanVenture Home"><img src="/assets/vanventure-logo-transparent.png" alt="" aria-hidden="true"><span>VANVENTURE</span></a><nav id="site-navigation" class="main-navigation" aria-label="Hauptnavigation"><details class="nav-trips is-active"><summary data-de="Reisen" data-en="Trips">Reisen</summary><div class="trip-menu"><a href="/#reisen" data-de="Alle Reisen" data-en="All trips">Alle Reisen</a><a href="/norwegen-2018.html"><b data-de="Norwegen" data-en="Norway">Norwegen</b><span>2018</span></a><a href="/sardinien-2019.html"><b data-de="Sardinien" data-en="Sardinia">Sardinien</b><span>2019</span></a><a href="/italien-2021.html"><b data-de="Italien" data-en="Italy">Italien</b><span>2021</span></a></div></details><a href="/vehicle.html" data-nav="vehicle" data-de="Fahrzeug" data-en="Vehicle">Fahrzeug</a><a href="/kajak.html" data-nav="kayak" data-de="Kajak" data-en="Kayak">Kajak</a><a href="/#ausruestung" data-nav="gear" data-de="Ausrüstung" data-en="Gear">Ausrüstung</a><a href="/#ueber-uns" data-nav="about" data-de="Über uns" data-en="About us">Über uns</a></nav><div class="header-actions"><button id="language" class="language" type="button" aria-label="Switch to English">EN</button><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation"><span class="menu-label" data-de="Menü" data-en="Menu">Menü</span><span class="menu-icon" aria-hidden="true"></span></button></div></header>`;
}

export function renderHomepage(html, stories) {
  return html.replace(/<article class="journey">[\s\S]*?<\/article>/g, block => {
    const story = stories.find(s => block.includes(`href="${s.slug}.html"`));
    if (!story) return block;
    block = block.replace(/<p data-de="[^"]*" data-en="[^"]*">[\s\S]*?<\/p>/, text('p', story.subtitle));
    return block.replace(
      /<details class="trip-details">[\s\S]*?<\/details>/,
      `<details class="trip-details"><summary data-de="Etappen im Überblick" data-en="Stages at a glance">Etappen im Überblick</summary><div class="trip-story">${story.chapters.map(c => `<div class="trip-chapter">${text('h4', c.title)}${c.paragraphs.map(p => text('p', p)).join('')}</div>`).join('')}${videos(story)}</div></details>`,
    );
  });
}

export function renderStory(s, preview = false) {
  const html = renderStoryHtml(s, preview);
  return preview ? html : applySeo(html, `${s.slug}.html`, s);
}

function renderStoryHtml(s, preview = false) {
  const chapters = s.chapters.map((c, i) => `<section class="story-chapter" id="kapitel-${i + 1}"><span class="chapter-number">${String(i + 1).padStart(2, '0')}</span>${text('h2', c.title)}${c.paragraphs.map(p => text('p', p)).join('')}${(c.photos || []).filter(p => imagePath(p.src)).map(p => `<figure class="story-photo"><img src="${imagePath(p.src)}" alt="${escape(p.caption[0])}" loading="lazy">${text('figcaption', p.caption)}</figure>`).join('')}</section>`).join('');
  const toc = s.chapters.map((c, i) => `<a href="#kapitel-${i + 1}" data-de="${escape(c.title[0])}" data-en="${escape(c.title[1])}">${escape(c.title[0])}</a>`).join('');
  const heroImage = imagePath(s.hero?.src) ? `<img class="story-hero-image" src="${imagePath(s.hero.src)}" alt="${escape(s.hero.alt || '')}">` : '';

  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(s.title[0])} | VanVenture</title><meta name="description" content="${escape(s.subtitle[0])}">${preview ? '<meta name="robots" content="noindex,nofollow">' : ''}<link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/travel-stories.css"><link rel="stylesheet" href="/hero-shared.css"><link rel="stylesheet" href="/navigation.css"><link rel="stylesheet" href="/photo-viewer.css"></head><body class="story-page">${siteHeader()}<main><section class="story-hero">${heroImage}<div class="story-hero-copy">${text('p', [`${s.country[0]} · ${s.year}${preview ? ' · ENTWURF' : ''}`, `${s.country[1]} · ${s.year}${preview ? ' · DRAFT' : ''}`], 'eyebrow')}${text('h1', s.title)}${text('p', s.subtitle, 'story-subtitle')}${text('p', s.meta, 'story-meta')}</div></section><div class="story-layout"><aside class="story-sidebar"><p class="eyebrow" data-de="DIE ETAPPEN" data-en="THE CHAPTERS">DIE ETAPPEN</p><nav aria-label="Kapitel">${toc}</nav></aside><article class="story-body">${text('p', s.lead, 'story-lead')}${chapters}<a class="button button-dark" href="/#riverstar" data-de="Unser Grabner Riverstar ↗" data-en="Our Grabner Riverstar ↗">Unser Grabner Riverstar ↗</a></article></div><section class="story-end"><h2 data-de="Die Reise in bewegten Bildern." data-en="The journey in motion.">Die Reise in bewegten Bildern.</h2><div class="story-videos">${videos(s)}<a class="button button-dark" href="/#reisen" data-de="← Zurück zum Reisearchiv" data-en="← Back to the trip archive">← Zurück zum Reisearchiv</a></div></section></main><footer><span>© <span id="year"></span> VanVenture</span><a href="/redaktion">Redaktion · Anmelden</a><span>Travel slow. Go far.</span></footer><script src="/script.js"></script><script src="/navigation.js"></script><script src="/photo-viewer.js" defer></script></body></html>`;
}
