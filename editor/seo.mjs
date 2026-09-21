// Shared by the live renderer and the static export. Only public pages belong here.
export const siteUrl = 'https://vanventure.at/';
export const pages = {
  'index.html': { title: 'VanVenture – Reisen mit Camper, Mountainbike und Kajak', description: 'Sabine und Helmut reisen mit Julie durch Europa: persönliche Reiseberichte aus Norwegen, Sardinien und Italien sowie unser HYMER Grand Canyon S CrossOver.', image: 'assets/hero-norway.jpg' },
  'vehicle.html': { title: 'HYMER Grand Canyon S CrossOver 2025: unser Van | VanVenture', description: 'Unser HYMER Grand Canyon S CrossOver, Modelljahr 2025: Fahrzeugprofil, Ausstattung und persönlicher Ausbau für Reisen mit Bike und Kajak.', image: 'assets/vehicle/vehicle-header-clean-v3.png' },
  'bike.html': { title: 'Mit dem Mountainbike unterwegs | VanVenture', description: 'Unsere Mountainbikes gehören zu unseren Reisen mit dem Van: Touren, Trails und Erinnerungen aus Sardinien und Italien.', image: 'assets/reisen/sardinien-2019/mountainbikes-am-meer-natur.png' },
  'kajak.html': { title: 'Grabner Riverstar: unser Kajak für unterwegs | VanVenture', description: 'Unser Grabner Riverstar begleitet uns im Van nach Norwegen und Sardinien: persönliche Erfahrungen, Ausstattung und Erinnerungen vom Wasser.', image: 'assets/riverstar/riverstar-am-ufer.jpg' },
  'norwegen-2018.html': { title: 'Norwegen 2018 mit dem VW California | VanVenture' },
  'sardinien-2019.html': { title: 'Sardinien 2019: Camper, Mountainbike und Kajak | VanVenture' },
  'italien-2021.html': { title: 'Italien 2021: fünf Wochen mit dem Camper | VanVenture' },
};
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const decode = value => value.replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
export const canonicalUrl = file => new URL(file === 'index.html' ? '' : file, siteUrl).href;
export function applySeo(html, file, story) {
  const page = pages[file];
  if (!page) throw new Error(`Unknown public SEO page: ${file}`);
  const url = canonicalUrl(file);
  const description = story?.subtitle?.[0] || page.description || decode(html.match(/<meta name="description" content="([^"]*)"\s*\/?\s*>/i)?.[1] || '');
  const imagePath = story?.hero?.src || page.image || decode(html.match(/<img class="story-hero-image" src="([^"]*)"/i)?.[1] || 'assets/hero-norway.jpg');
  const image = new URL(imagePath.replace(/^\//, ''), siteUrl).href;
  const graph = [
    { '@type': 'WebSite', '@id': `${siteUrl}#website`, url: siteUrl, name: 'VanVenture', inLanguage: 'de' },
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: page.title, description, inLanguage: 'de', isPartOf: { '@id': `${siteUrl}#website` }, primaryImageOfPage: { '@type': 'ImageObject', url: image } },
  ];
  if (file !== 'index.html') graph.push({ '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'VanVenture', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: page.title.replace(' | VanVenture', ''), item: url },
  ] });
  // Escape '<' so editorial text cannot terminate the JSON-LD script element.
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  const head = `<!-- seo:start -->
<title>${escape(page.title)}</title>
<meta name="description" content="${escape(description)}">
<link rel="canonical" href="${escape(url)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="VanVenture">
<meta property="og:locale" content="de_AT">
<meta property="og:title" content="${escape(page.title)}">
<meta property="og:description" content="${escape(description)}">
<meta property="og:url" content="${escape(url)}">
<meta property="og:image" content="${escape(image)}">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${json}</script>
<!-- seo:end -->`;
  return html.replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->\s*/g, '')
    .replace(/<meta name="robots" content="noindex,nofollow"\s*\/?>\s*/i, '')
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta name="description" content="[^"]*"\s*\/?\s*>\s*/i, '')
    .replace('</head>', `${head}\n</head>`);
}
export function sitemap() {
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + Object.keys(pages).map(file => `  <url><loc>${canonicalUrl(file)}</loc></url>`).join('\n') + '\n</urlset>\n';
}
export function robots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}sitemap.xml\n`;
}
