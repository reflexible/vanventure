import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=relative=>fs.readFileSync(path.join(root,relative),'utf8');

export function checkPlanConsistency(){
  const register=JSON.parse(read('docs/plan-register.json'));
  const canonical=read(register.canonicalPlan),errors=[];
  if(!canonical.includes('einzige aktive Arbeitsliste'))errors.push(`${register.canonicalPlan}: Kennzeichnung als einziger aktiver Plan fehlt.`);
  const documented=new Set([register.canonicalPlan,...register.sources.map(source=>source.path)]);
  const docsRoot=path.join(root,'docs');
  const files=[];
  const walk=directory=>{for(const entry of fs.readdirSync(directory,{withFileTypes:true})){const absolute=path.join(directory,entry.name);if(entry.isDirectory())walk(absolute);else if(entry.isFile()&&entry.name.endsWith('.md'))files.push(path.relative(root,absolute).replaceAll(path.sep,'/'));}};
  walk(docsRoot);
  for(const file of files){if(!documented.has(file))errors.push(`${file}: fehlt im Planregister.`);}
  for(const file of documented){if(file.endsWith('.md')&&!files.includes(file))errors.push(`${file}: ist im Planregister eingetragen, existiert aber nicht.`);}
  for(const source of register.sources){
    let text;
    try{text=read(source.path);}catch{errors.push(`${source.path}: Datei fehlt.`);continue;}
    if(!text.includes('ausbauplan.md'))errors.push(`${source.path}: Verweis auf den Gesamtplan fehlt.`);
    if(['archived-plan','technical-reference','historical-reference','audit-reference'].includes(source.role)&&/^\s*[-*]\s+\[[ xX]\]/m.test(text))errors.push(`${source.path}: Referenzdatei enthält eine aktive Aufgabenliste.`);
    for(const phrase of source.requiredCanonicalPhrases){if(!canonical.includes(phrase))errors.push(`${source.path}: Pflichtpunkt fehlt im Gesamtplan: ${JSON.stringify(phrase)}.`);}
  }
  if(errors.length)throw new Error(`Planabgleich fehlgeschlagen:\n- ${errors.join('\n- ')}`);
  return {sources:register.sources.length,canonicalPlan:register.canonicalPlan};
}

if(process.argv[1]===fileURLToPath(import.meta.url)){const result=checkPlanConsistency();console.log(`Planabgleich erfolgreich: ${result.sources} Quellen sind im ${result.canonicalPlan} abgedeckt.`);}
