const $=id=>document.getElementById(id);
let csrf='',current=null,dirty=false,proposal=null,busy=false;
function message(text){$('message').textContent=text;}
async function api(path,method='GET',data){
  const r=await fetch(`/api/${path}`,{method,headers:{'Content-Type':'application/json','X-CSRF-Token':csrf},body:data?JSON.stringify(data):undefined});
  const result=await r.json();if(!r.ok)throw new Error(result.error||'Anfrage fehlgeschlagen.');return result;
}
function run(fn){return async e=>{e?.preventDefault();try{await fn(e);}catch(error){message(error.message);}};}
function markDirty(){dirty=true;$('saved').textContent='Ungespeicherte Änderungen';}
function button(text,fn){const b=document.createElement('button');b.type='button';b.textContent=text;b.addEventListener('click',fn);return b;}
function itinerary(){return Array.isArray(current.notes.itinerary)?current.notes.itinerary:(current.notes.itinerary=[]);}
function renderItinerary(){
  const list=$('itinerary');list.replaceChildren();
  itinerary().forEach((stop,i)=>{
    const row=document.createElement('div');row.className='itinerary-stop';
    const field=(label,name,value,cls='')=>{const l=document.createElement('label');l.textContent=label;l.className=cls;const input=document.createElement('input');input.value=value??'';input.dataset.stop=i;input.dataset.stopField=name;l.append(input);return l;};
    const details=field('Was geschah dort?','details',stop.details,'stop-details');details.querySelector('input').placeholder='Kurzes Erlebnis, Aktivität oder wichtige Korrektur';
    const actions=document.createElement('div');actions.className='stop-actions';actions.append(button('↑',()=>moveStop(i,-1)),button('↓',()=>moveStop(i,1)),button('Löschen',()=>removeStop(i)));
    row.append(field('Datum / Tag','date',stop.date),field('Ort','place',stop.place,'place'),field('Breite','lat',stop.lat),field('Länge','lon',stop.lon),actions,details);list.append(row);
  });
  if(!itinerary().length){const p=document.createElement('p');p.className='hint';p.textContent='Noch keine Etappen eingetragen.';list.append(p);}
}
function collectItinerary(){document.querySelectorAll('[data-stop]').forEach(el=>{const stop=itinerary()[Number(el.dataset.stop)];if(stop)stop[el.dataset.stopField]=el.value.trim();});}
function moveStop(i,d){collectItinerary();const j=i+d;if(j<0||j>=itinerary().length)return;[itinerary()[i],itinerary()[j]]=[itinerary()[j],itinerary()[i]];renderItinerary();markDirty();}
function removeStop(i){collectItinerary();itinerary().splice(i,1);renderItinerary();markDirty();}
function render(){
  const s=current.story;
  for(const k of ['title','subtitle','meta','lead'])$(k).value=s[k][0];
  for(const k of ['facts','highlights','keywords'])$(k).value=current.notes[k];
  renderItinerary();
  $('chapters').replaceChildren();
  s.chapters.forEach((c,i)=>{
    const section=document.createElement('section');section.className='chapter';
    const label=document.createElement('label');label.textContent=`Kapitel ${i+1}`;
    const title=document.createElement('input');title.value=c.title[0];title.dataset.chapter=i;title.dataset.field='title';label.append(title);
    const textLabel=document.createElement('label');textLabel.textContent='Text (Leerzeile zwischen Absätzen)';
    const text=document.createElement('textarea');text.rows=Math.max(7,c.paragraphs.length*4);text.value=c.paragraphs.map(p=>p[0]).join('\n\n');text.dataset.chapter=i;text.dataset.field='text';textLabel.append(text);
    section.append(label,textLabel);$('chapters').append(section);
  });
  $('export').href=`/api/stories/${s.slug}/export`;$('route-export').href=`/api/stories/${s.slug}/route.geojson`;dirty=false;$('saved').textContent=`Gespeichert · Version ${current.revision}`;
  $('draft-preview').href=`/api/stories/${s.slug}/preview`;
}
function collect(){
  collectItinerary();
  for(const k of ['title','subtitle','meta','lead'])current.story[k][0]=$(k).value;
  for(const k of ['facts','highlights','keywords'])current.notes[k]=$(k).value;
  document.querySelectorAll('[data-chapter]').forEach(el=>{
    const c=current.story.chapters[Number(el.dataset.chapter)];
    if(el.dataset.field==='title')c.title[0]=el.value;
    else c.paragraphs=el.value.split(/\n\s*\n/).filter(p=>p.trim()).map((p,i)=>[p.trim(),c.paragraphs[i]?.[1]||'']);
  });
}
async function save(){collect();const r=await api(`stories/${current.story.slug}`,'PUT',current);current.revision=r.revision;dirty=false;$('saved').textContent=`Gespeichert · Version ${r.revision}`;}
async function load(slug){current=await api(`stories/${slug}`);render();message('');}
async function enter(session){
  csrf=session.csrf;$('name').textContent=session.displayName||session.name;$('account').hidden=false;$('login').hidden=true;$('setup').hidden=true;$('workspace').hidden=false;
  $('publish').hidden=session.role!=='admin';
  $('ai-status').textContent='Texte und Notizen werden in der Datenbank gespeichert. Beauftragt die Überarbeitung anschließend im Codex-Chat.';
  const stories=await api('stories');$('trip').replaceChildren();for(const s of stories){const o=document.createElement('option');o.value=s.slug;o.textContent=s.title;$('trip').append(o);}await load(stories[0].slug);
}
$('login-form').addEventListener('submit',run(async()=>{const form=new FormData($('login-form'));const session=await api('login','POST',Object.fromEntries(form));$('login-form').reset();await enter(session);}));
$('workspace').addEventListener('input',e=>{if(e.target.matches('input,textarea'))markDirty();});
$('save').addEventListener('click',run(async()=>{await save();message('Änderungen gespeichert.');}));
$('reload').addEventListener('click',run(async()=>{if(dirty&&!confirm('Ungespeicherte Änderungen verwerfen und neu laden?'))return;await load(current.story.slug);}));
$('trip').addEventListener('change',run(async()=>{if(busy){$('trip').value=current.story.slug;return;}if(dirty&&!confirm('Ungespeicherte Änderungen verwerfen und Reise wechseln?')){$('trip').value=current.story.slug;return;}await load($('trip').value);}));
$('add-chapter').addEventListener('click',()=>{collect();current.story.chapters.push({title:['Neues Kapitel','New chapter'],paragraphs:[['','']]});render();markDirty();});
$('add-stop').addEventListener('click',()=>{collectItinerary();itinerary().push({date:'',place:'',details:'',lat:'',lon:''});renderItinerary();markDirty();});
$('import-stops').addEventListener('click',()=>{
  collect();if(itinerary().length&&!confirm('Die vorhandene Etappenliste durch die Kapitel des Berichts ersetzen?'))return;
  current.notes.itinerary=current.story.chapters.map(c=>({date:'',place:c.title[0],details:c.paragraphs.map(p=>p[0]).join(' '),lat:'',lon:''}));renderItinerary();markDirty();
});
$('request-edit').addEventListener('click',run(async()=>{await save();message('Texte und Änderungswünsche gespeichert. Schreibt jetzt im Codex-Chat: Bitte überarbeite die gespeicherten Reiseberichte und aktualisiere die Homepage.');}));
$('export').addEventListener('click',e=>{if(dirty){e.preventDefault();message('Bitte zuerst speichern, bevor ihr den Entwurf exportiert.');}});
$('route-export').addEventListener('click',e=>{if(dirty){e.preventDefault();message('Bitte zuerst speichern, bevor ihr die Kartendaten exportiert.');}});
window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue='';}});
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>$(b.dataset.close).close()));
function dialogRun(id,fn){return async e=>{e?.preventDefault();try{await fn(e);}catch(error){$(id).textContent=error.message;}};}
$('setup-form').addEventListener('submit',run(async()=>{
  const b=Object.fromEntries(new FormData($('setup-form')));if(b.password!==b.confirmPassword)throw new Error('Die Passwörter stimmen nicht überein.');
  await api('setup','POST',b);const session=await api('login','POST',{name:b.name,password:b.password});$('setup-form').reset();await enter(session);message('Willkommen! Weitere Konten könnt ihr unter Benutzer anlegen.');
}));
$('password-form').addEventListener('submit',dialogRun('password-message',async()=>{const b=Object.fromEntries(new FormData($('password-form')));if(b.password!==b.confirmPassword)throw new Error('Die Passwörter stimmen nicht überein.');await api('password','POST',b);dirty=false;location.reload();}));
$('draft-preview').addEventListener('click',e=>{if(dirty){e.preventDefault();message('Bitte zuerst speichern, bevor ihr die Vorschau öffnet.');}});
$('publish').addEventListener('click',run(async()=>{if(dirty){message('Bitte zuerst speichern und die Vorschau prüfen.');return;}const approval=await api(`stories/${current.story.slug}/release-scopes?revision=${current.revision}`);if(!approval.scopes.length){message('Für diesen Stand liegt keine serverseitig hinterlegte Freigabe für den konkreten Release-Umfang vor.');return;}const labels=approval.scopes.map((scope,i)=>`${i+1}: ${scope.scope_ref} (${scope.approval_ref})`).join('\n');const choice=approval.scopes.length===1?0:Number(prompt(`Freigegebenen Release-Umfang wählen:\n${labels}`))-1;if(!Number.isInteger(choice)||!approval.scopes[choice])return;const scope=approval.scopes[choice];if(!confirm(`Diesen gespeicherten Reisebericht im freigegebenen Umfang ${scope.scope_ref} veröffentlichen?`))return;await api(`stories/${current.story.slug}/publish`,'POST',{revision:current.revision,scope_ref:scope.scope_ref});message(`Reisebericht mit Freigabe ${scope.approval_ref} veröffentlicht.`);}));
async function start(){
  try{const session=await api('session');await enter(session);return;}catch(error){if(error.message!=='Bitte anmelden.')message(`Bestehende Sitzung konnte nicht geladen werden: ${error.message}`);}
  try{if((await api('setup')).available){$('login').hidden=true;$('setup').hidden=false;const token=new URL(location.href).searchParams.get('setup');if(token){$('setup-form').elements.setupToken.value=token;history.replaceState(null,'','/redaktion');}}}catch(error){message(error.message);}
}
start();
