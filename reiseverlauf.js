const $=id=>document.getElementById(id),storageKey=slug=>`vanventure-route-${slug}`;
let stories=[],stops=[];
const blank=()=>({date:'',place:'',details:'',lat:'',lon:''});
function save(){localStorage.setItem(storageKey($('journey').value),JSON.stringify(stops));}
function load(){try{stops=JSON.parse(localStorage.getItem(storageKey($('journey').value)))||[];}catch{stops=[];}render();}
function render(){const list=$('stops');list.replaceChildren();stops.forEach((stop,i)=>{const node=$('stop-template').content.cloneNode(true),article=node.querySelector('.stop');article.dataset.index=i;node.querySelector('.stop-number').textContent=String(i+1).padStart(2,'0');node.querySelectorAll('[data-field]').forEach(el=>{el.value=stop[el.dataset.field]||'';el.addEventListener('input',()=>{stops[i][el.dataset.field]=el.value;save();});});node.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>act(i,b.dataset.action)));list.append(node);});$('message').textContent=stops.length?`${stops.length} Etappen · automatisch auf diesem Handy gespeichert`:'Noch keine Etappen angelegt.';}
function act(i,action){if(action==='delete')stops.splice(i,1);else{const j=i+(action==='up'?-1:1);if(j<0||j>=stops.length)return;[stops[i],stops[j]]=[stops[j],stops[i]];}save();render();}
function payload(){return JSON.stringify({reise:$('journey').value,etappen:stops.map((s,i)=>({reihenfolge:i+1,...s}))},null,2);}
async function copy(){try{await navigator.clipboard.writeText(`Bitte überarbeite diesen Reisebericht chronologisch und aktualisiere danach Homepage und Karte:\n\n${payload()}`);$('message').textContent='Kopiert. Füge den Inhalt jetzt im Codex-Chat ein.';}catch{$('message').textContent='Kopieren wurde blockiert. Nutze „Teilen“ oder „Datei speichern“.';}}
async function start(){stories=await fetch('travel-stories.json').then(r=>r.json());for(const story of stories){const o=document.createElement('option');o.value=story.slug;o.textContent=`${story.country[0]} ${story.year}`;$('journey').append(o);}$('journey').addEventListener('change',load);load();}
$('add').addEventListener('click',()=>{stops.push(blank());save();render();});
$('import').addEventListener('click',()=>{if(stops.length&&!confirm('Vorhandene mobile Liste durch die Kapitel des Berichts ersetzen?'))return;const story=stories.find(s=>s.slug===$('journey').value);stops=story.chapters.map(c=>({date:'',place:c.title[0],details:c.paragraphs.map(p=>p[0]).join(' '),lat:'',lon:''}));save();render();});
$('clear').addEventListener('click',()=>{if(confirm('Alle Etappen dieser Reise auf diesem Handy löschen?')){stops=[];save();render();}});
$('copy').addEventListener('click',copy);
$('share').addEventListener('click',async()=>{if(navigator.share)await navigator.share({title:'VanVenture Reiseverlauf',text:payload()});else copy();});
$('download').addEventListener('click',()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([payload()],{type:'application/json'}));a.download=`${$('journey').value}-reiseverlauf.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);});
start().catch(()=>$('message').textContent='Die Reisedaten konnten nicht geladen werden. Bitte die Seite neu öffnen.');
