import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=relative=>fs.readFileSync(path.join(root,relative),'utf8');

const publicPages={
  'index.html':{modules:['<main','id="reisen"','id="ausruestung"','id="ueber-uns"']},
  'vehicle.html':{modules:['<main','vehicle-gallery','data-photo-gallery'],gallery:3},
  'kajak.html':{modules:['<main','kayak-page-hero','riverstar-fjord-gespiegelt.png','kajak-hero.css','kayak-gallery story-gallery','data-photo-gallery','kajak-gallery.css','UNSER GELIEBTER GRABNER RIVERSTAR'],gallery:13,prefix:'assets/riverstar/gallery/'},
  'scott-mountainbike.html':{modules:['<main','bike-gallery','data-photo-gallery','Black Beauty'],gallery:15,prefix:'assets/bikes/'},
  'norwegen-2018.html':{modules:['<main','story-gallery','data-photo-gallery'],gallery:6},
  'sardinien-2019.html':{modules:['<main','story-gallery','data-photo-gallery'],gallery:6},
  'italien-2021.html':{modules:['<main','story-gallery','data-photo-gallery'],gallery:7}
};

const publicShellPages=[
  'index.html','vehicle.html','kajak.html',
  'cube.html','scott-mountainbike.html','trek-gravelbike.html','woom-2.html',
  'diamant-stadtraeder.html','norwegen-2018.html','sardinien-2019.html','italien-2021.html'
];

test('alle öffentlichen Seiten beziehen dieselbe zentrale Navigation',()=>{
  for(const file of publicShellPages){
    const page=read(file);
    assert.match(page,/navigation\.css/,`${file}: zentrale Navigations-Styles fehlen.`);
    assert.match(page,/navigation\.js/,`${file}: zentrale Navigationslogik fehlt.`);
    assert.match(page,/class="[^"]*site-header[^"]*magazine-header[^"]*"/,`${file}: gemeinsamer Header-Anker fehlt.`);
    assert.match(page,/class="header-actions"/,`${file}: gemeinsame Kopf-Aktionen fehlen.`);
    assert.match(page,/<footer[\s>]/,`${file}: gemeinsamer Footer-Anker fehlt.`);
  }
  assert.match(read('navigation.js'),/footer\.innerHTML/, 'Footer muss aus der gemeinsamen Shell kommen.');
  assert.doesNotMatch(read('navigation.js'),/<a href="ausruestung\.html"/, 'Die Ausrüstungsübersicht darf nicht mehr im gemeinsamen Menü stehen.');
  assert.doesNotMatch(read('navigation.js'),/<a href="bike\.html"/, 'Die Radübersicht darf nicht als zusätzlicher Menüpunkt erscheinen.');
  assert.match(read('navigation.js'),/<a href="scott-mountainbike\.html">Black Beauty<\/a>/, 'Radprofile bleiben direkt erreichbar.');
  assert.doesNotMatch(read('index.html'),/href="ausruestung\.html"/, 'Die Startseite darf nicht mehr zur gestrichenen Übersicht führen.');
  assert.doesNotMatch(read('index.html'),/href="bike\.html"/, 'Die Startseite darf nicht zur zusätzlichen Radübersicht führen.');
  for(const file of ['cube.html','trek-gravelbike.html','diamant-stadtraeder.html','woom-2.html']){
    assert.doesNotMatch(read(file),/href="bike\.html"/, `${file}: keine versteckten Rücklinks zur Radübersicht.`);
  }
});

test('Kajak und fertiges Radprofil behalten die gemeinsame Editorial-Grundlage',()=>{
  for(const file of ['kajak.html','scott-mountainbike.html']){
    const page=read(file);
    assert.match(page,/href="detail-editorial\.css"/,`${file}: gemeinsames Editorial-CSS fehlt.`);
    assert.match(page,/<main class="detail-page">/,`${file}: gemeinsame Detailseiten-Hülle fehlt.`);
    assert.match(page,/detail-story-pair/,`${file}: gemeinsamer Bild-Text-Baustein fehlt.`);
  }
  assert.match(read('kajak-hero.css'),/\.kayak-page-hero\{box-sizing:border-box;/,
    'Ohne border-box wird der Scott-Hero durch sein Padding höher als die Kajak-Referenz.');
  assert.doesNotMatch(read('bike-pages.css'),/\.scott-page \.gear-story section\.scott-story-pair[^\n]*display:grid/,
    'Ein eigener Scott-Grid-Block würde die zentrale Bild-Text-Vorlage wieder überstimmen.');
  const scott = read('scott-mountainbike.html');
  assert.equal((scott.match(/detail-balanced/g)||[]).length,4,
    'Vier redaktionelle Radfotos müssen gleichmäßig im gemeinsamen Bild-Text-Baustein stehen.');
  assert.equal((scott.match(/detail-media-right/g)||[]).length,2,
    'Die Radfotos dürfen nicht mehr als reine linke Bildspalte nach unten laufen.');
  assert.match(scott,/detail-photo-feature/,
    'Auch das fünfte redaktionelle Radfoto muss dieselbe Größenlogik nutzen.');
  assert.equal((scott.match(/detail-wide-crop/g)||[]).length,3,
    'Die drei freigegebenen breiten Scott-Ausschnitte müssen aus der zentralen Konfiguration kommen.');
  assert.equal((scott.match(/detail-panorama-crop/g)||[]).length,2,
    'Wiesenpause und Trail müssen im Seitenlayout ein eigenes Panoramaformat erhalten.');
  assert.match(read('detail-editorial.css'),/\.detail-page \.benefits \.cards h3\{[^}]*27px\/1\.18/,
    'Kajak und Scott brauchen dieselbe Kartentitel-Typografie aus dem gemeinsamen CSS.');
  assert.match(read('detail-editorial.css'),/\.detail-page a:not\(\.photo-link\)\{[^}]*color:inherit;[^}]*text-decoration:underline;[^}]*text-underline-offset:5px/,
    'Redaktionelle Textlinks brauchen den Kajak-Stil aus dem gemeinsamen CSS.');
  assert.doesNotMatch(read('equipment-pages.css'),/\.gear-links a/,
    'Scott-Textlinks dürfen nicht im alten Ausrüstungs-CSS separat gestaltet werden.');
  assert.doesNotMatch(read('bike-pages.css'),/\.scott-page \.benefits|\.scott-page \.cards/,
    'Karten dürfen keine Scott-spezifische CSS-Kopie erhalten.');
});

test('jede öffentliche Seite enthält ihre freigegebenen Kernmodule',()=>{
  for(const [file,expectation] of Object.entries(publicPages)){
    const page=read(file);
    assert.doesNotMatch(page,/<meta name="robots" content="[^"]*noindex/i,`${file} darf nicht versehentlich deaktiviert werden.`);
    const canonical=`https://vanventure.at/${file==='index.html'?'':file}`;
    assert.ok(page.includes(`rel="canonical" href="${canonical}"`),`${file} braucht einen Canonical-Link.`);
    assert.match(page,/<header[\s>]/,`${file} braucht den öffentlichen Kopf.`);
    assert.match(page,/<footer[\s>]/,`${file} braucht den öffentlichen Footer.`);
    for(const module of expectation.modules) assert.ok(page.includes(module),`${file}: Kernmodul fehlt: ${module}`);
    if(expectation.gallery!==undefined){
      const images=[...page.matchAll(/<button class="gallery-photo" type="button"><img\b[^>]*\bsrc="([^"]+)"/g)].map(match=>match[1]);
      assert.equal(images.length,expectation.gallery,`${file}: falsche Anzahl an Galerie-Kacheln.`);
      if(file==='kajak.html') assert.deepEqual(images,Array.from({length:14},(_,index)=>`assets/riverstar/gallery/kajak-${String(index+1).padStart(2,'0')}.jpg`).filter(src=>!src.endsWith('kajak-06.jpg')),'Kajak: Das ausdrücklich ausgeschlossene Motiv 06 darf nicht in der Galerie erscheinen.');
      for(const image of images){
        if(expectation.prefix) assert.ok(image.startsWith(expectation.prefix),`${file}: falsche Bildquelle ${image}`);
        assert.ok(fs.existsSync(path.join(root,image)),`${file}: Galeriebild fehlt: ${image}`);
      }
    }
    if(expectation.photoLinks!==undefined) assert.equal((page.match(/class="photo-link"/g)||[]).length,expectation.photoLinks,`${file}: falsche Anzahl an vergrößerbaren Galeriebildern.`);
  }
});

test('Galerien teilen Raster und Viewer, unvollständige Profile bleiben kenntlich',()=>{
  assert.match(read('photo-viewer.css'),/@import url\("gallery-shared\.css"\)/);
  const galleryCss=read('gallery-shared.css');
  assert.match(galleryCss,/\[data-photo-gallery\]/);
  assert.match(galleryCss,/\.gallery-caption\{[^}]*background:transparent/);
  assert.match(galleryCss,/figure figcaption\{[^}]*background:transparent/);
  assert.match(read('photo-viewer.css'),/\[data-photo-gallery\] \.gallery-photo::after[^\n]*width:27px/);
  assert.match(read('photo-viewer.css'),/\.site-photo-stage button svg\{display:block/);
  assert.match(read('photo-viewer.css'),/\.site-photo-stage img\{[^}]*width:100%;height:100%;[^}]*object-fit:contain/,
    'Die Vollansicht muss das ganze Bild einpassen, nicht oben und unten abschneiden.');
  for(const file of ['vehicle.html','kajak.html','norwegen-2018.html','sardinien-2019.html',
    'italien-2021.html','scott-mountainbike.html']){
    const page=read(file);
    assert.match(page,/photo-viewer\.css/,`${file}: gemeinsamer Viewer-Style fehlt`);
    assert.match(page,/photo-viewer\.js/,`${file}: gemeinsamer Viewer fehlt`);
  }
  for(const file of ['cube.html','trek-gravelbike.html','diamant-stadtraeder.html','woom-2.html']){
    const page=read(file);
    assert.match(page,/<meta name="robots" content="noindex"/);
    assert.match(page,/in Vorbereitung/);
  }
});

test('freigegebene Farbableitungen und enge Fahrzeug-Ausnahme bleiben nachvollziehbar',()=>{
  const sardinia=read('sardinien-2019.html');
  const italy=read('italien-2021.html');
  assert.match(sardinia,/assets\/reisen\/sardinien-2019\/bikepause-im-gruenen-editorial-v2\.jpg/);
  assert.match(sardinia,/assets\/reisen\/sardinien-2019\/sardinien-kueste-editorial-v2\.jpg/);
  assert.match(italy,/assets\/heroes\/italien-2021-tropea-editorial-v2\.jpg/);
  const vehicle=read('vehicle.html');
  const records=JSON.parse(read('docs/vehicle-bildquellen.json'));
  assert.equal(records.length,4);
  for(const record of records){
    assert.ok(fs.existsSync(path.join(root,record.web_image)),record.web_image);
    assert.match(record.approval_status,/bestehende KI-bereinigte Webfassung darf unverändert bleiben/);
    if(record.web_image==='assets/vehicle/vehicle-header-clean-v3.png')
      assert.match(read('vehicle-profile.css'),/vehicle-header-clean-v3\.png/);
    else assert.ok(vehicle.includes(record.web_image),`Fahrzeugmotiv fehlt: ${record.web_image}`);
  }
});

test('alle Vergrößerungen nutzen die freigegebene zentrale Lupe ohne sichtbaren Text',()=>{
  const css=read('photo-viewer.css');
  assert.match(css,/\.photo-zoom,[^\n]*\.gallery-photo::after/);
  assert.match(css,/\.site-photo-zoom-icon/);
  assert.match(css,/font-size:0/);
  assert.match(css,/svg%3E/);
  const viewer=read('photo-viewer.js');
  assert.match(viewer,/site-photo-zoom-host/);
  assert.match(viewer,/control\.classList\.contains\('photo-link'\) && !control\.querySelector\('\.photo-zoom'\)/);
  assert.match(viewer,/setAttribute\('aria-label'/);
  for(const file of ['kajak.html','vehicle.html','norwegen-2018.html','sardinien-2019.html',
    'italien-2021.html','scott-mountainbike.html']){
    assert.match(read(file),/photo-viewer\.css/,`${file}: zentraler Lupenstil fehlt`);
  }
});

test('öffentliche interne Seitenlinks verweisen auf vorhandene Seiten',()=>{
  for(const file of Object.keys(publicPages)){
    const page=read(file);
    assert.doesNotMatch(page,/href="(?:ausruestung|bike)\.html"/,`${file}: kein Link zu entfernten Übersichten`);
    for(const match of page.matchAll(/href="([^"#?]+\.html)(?:#[^"]*)?"/g)){
      const target=match[1].replace(/^https:\/\/vanventure\.at\//,'');
      assert.ok(fs.existsSync(path.join(root,target)),`${file}: interner Link fehlt: ${target}`);
    }
  }
});

test('entfernte Übersichten und fehlende HTML-Seiten leiten zur Startseite',async()=>{
  const {homepageRedirect}=await import('../public-page-routes.mjs');
  assert.equal(homepageRedirect('/bike.html'),301);
  assert.equal(homepageRedirect('/ausruestung.html'),301);
  assert.equal(homepageRedirect('/nicht-vorhanden.html'),302);
  assert.equal(homepageRedirect('/assets/fehlendes-bild.jpg'),null);
  assert.doesNotMatch(read('editor/seo.mjs'),/^[ \t]*'(?:bike|ausruestung)\.html':/m);
});
