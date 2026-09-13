import { readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
const source=process.argv[2];if(!source)throw new Error('Aufruf: node editor/import.mjs PFAD-ZUM-FREIGEGEBENEN-EXPORT.json');
const path=resolve('travel-stories.json'),stories=JSON.parse(readFileSync(path,'utf8')),story=JSON.parse(readFileSync(resolve(source),'utf8'));
const index=stories.findIndex(s=>s.slug===story.slug);if(index<0)throw new Error('Unbekannte Reise.');
for(const k of ['title','subtitle','meta','lead'])if(!Array.isArray(story[k])||story[k].length!==2||story[k].some(v=>typeof v!=='string'))throw new Error('Ungültiger Export.');
if(!Array.isArray(story.chapters)||!story.chapters.length||story.chapters.some(c=>!Array.isArray(c.title)||c.title.length!==2||c.title.some(t=>typeof t!=='string')||!Array.isArray(c.paragraphs)||c.paragraphs.some(p=>!Array.isArray(p)||p.length!==2||p.some(t=>typeof t!=='string'))))throw new Error('Ungültige Kapitel.');
for(const k of ['slug','country','year','videos'])story[k]=stories[index][k];
copyFileSync(path,`${path}.backup`);stories[index]=story;writeFileSync(path,JSON.stringify(stories,null,2)+'\n');console.log('Freigegebenen Entwurf lokal übernommen. Jetzt python build-travel-pages.py ausführen.');
