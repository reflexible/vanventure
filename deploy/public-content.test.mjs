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
  'kajak.html':{modules:['<main','kayak-page-hero','riverstar-fjord-gespiegelt.png','kajak-hero.css','kayak-gallery story-gallery','data-photo-gallery','kajak-gallery.css','UNSER GELIEBTER GRABNER RIVERSTAR'],gallery:14,prefix:'assets/riverstar/gallery/'},
  'ausruestung.html':{modules:['<main','equipment-gallery','equipment-gallery-grid'],photoLinks:3},
  'norwegen-2018.html':{modules:['<main','story-gallery','data-photo-gallery'],gallery:6},
  'sardinien-2019.html':{modules:['<main','story-gallery','data-photo-gallery'],gallery:6},
  'italien-2021.html':{modules:['<main','story-gallery','data-photo-gallery'],gallery:7}
};

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
      const images=[...page.matchAll(/<button class="gallery-photo" type="button"><img src="([^"]+)"/g)].map(match=>match[1]);
      assert.equal(images.length,expectation.gallery,`${file}: falsche Anzahl an Galerie-Kacheln.`);
      if(file==='kajak.html') assert.deepEqual(images,Array.from({length:14},(_,index)=>`assets/riverstar/gallery/kajak-${String(index+1).padStart(2,'0')}.jpg`),'Kajak: Die vollständige, freigegebene Bildfolge 01–14 muss erhalten bleiben.');
      for(const image of images){
        if(expectation.prefix) assert.ok(image.startsWith(expectation.prefix),`${file}: falsche Bildquelle ${image}`);
        assert.ok(fs.existsSync(path.join(root,image)),`${file}: Galeriebild fehlt: ${image}`);
      }
    }
    if(expectation.photoLinks!==undefined) assert.equal((page.match(/class="photo-link"/g)||[]).length,expectation.photoLinks,`${file}: falsche Anzahl an vergrößerbaren Galeriebildern.`);
  }
});

test('öffentliche interne Seitenlinks verweisen auf vorhandene Seiten',()=>{
  for(const file of Object.keys(publicPages)){
    const page=read(file);
    for(const match of page.matchAll(/href="([^"#?]+\.html)(?:#[^"]*)?"/g)){
      const target=match[1].replace(/^https:\/\/vanventure\.at\//,'');
      assert.ok(fs.existsSync(path.join(root,target)),`${file}: interner Link fehlt: ${target}`);
    }
  }
});
