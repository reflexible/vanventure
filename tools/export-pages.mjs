import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { renderHomepage } from '../editor/render.mjs';
const docker=process.env.DOCKER_BIN||'docker';
const code="import {openPostgres} from './editor/postgres.mjs'; const db=await openPostgres(); try{console.log(JSON.stringify(await db.allPublished()));}finally{await db.close();}";
const result=spawnSync(docker,['compose','exec','-T','web','node','--input-type=module','-e',code],{encoding:'utf8'});
if(result.status!==0)throw new Error('Export aus dem Docker-Webserver fehlgeschlagen.');
const published=JSON.parse(result.stdout),stories=JSON.parse(readFileSync('travel-stories.json','utf8'));
for(const story of published){const i=stories.findIndex(s=>s.slug===story.slug);if(i<0)throw new Error('Unbekannte freigegebene Reise.');stories[i]=story;}
writeFileSync('travel-stories.json',JSON.stringify(stories,null,2)+'\n');
// GitHub Pages has no login server. The Docker homepage inserts its own link.
let homepage=renderHomepage(readFileSync('index.html','utf8'),stories);
homepage=homepage.replace(/<a href="\/redaktion"[^>]*>[^<]*<\/a>/g,'');
writeFileSync('index.html',homepage);
const build=spawnSync(process.env.PYTHON_BIN||'python',['build-travel-pages.py'],{stdio:'inherit'});
if(build.status!==0)throw new Error('Statische Reiseseiten konnten nicht erstellt werden.');
const seo=spawnSync(process.execPath,['tools/build-seo.mjs'],{stdio:'inherit'});
if(seo.status!==0)throw new Error('SEO-Metadaten konnten nicht erstellt werden.');
console.log(`${published.length} freigegebene Berichte für GitHub Pages exportiert.`);
