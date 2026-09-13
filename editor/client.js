const $=id=>document.getElementById(id);
let csrf='',current=null,dirty=false,proposal=null,busy=false,editingUser=null;
function message(text){$('message').textContent=text;}
async function api(path,method='GET',data){
  const r=await fetch(`/api/${path}`,{method,headers:{'Content-Type':'application/json','X-CSRF-Token':csrf},body:data?JSON.stringify(data):undefined});
  const result=await r.json();if(!r.ok)throw new Error(result.error||'Anfrage fehlgeschlagen.');return result;
}
function run(fn){return async e=>{e?.preventDefault();try{await fn(e);}catch(error){message(error.message);}};}
function markDirty(){dirty=true;$('saved').textContent='Ungespeicherte Änderungen';}
function button(text,fn){const b=document.createElement('button');b.type='button';b.textContent=text;b.addEventListener('click',fn);return b;}
function render(){
  const s=current.story;
  for(const k of ['title','subtitle','meta','lead'])$(k).value=s[k][0];
  for(const k of ['facts','highlights','keywords'])$(k).value=current.notes[k];
  $('chapters').replaceChildren();
  s.chapters.forEach((c,i)=>{
    const section=document.createElement('section');section.className='chapter';
    const label=document.createElement('label');label.textContent=`Kapitel ${i+1}`;
    const title=document.createElement('input');title.value=c.title[0];title.dataset.chapter=i;title.dataset.field='title';label.append(title);
    const textLabel=document.createElement('label');textLabel.textContent='Text (Leerzeile zwischen Absätzen)';
    const text=document.createElement('textarea');text.rows=Math.max(7,c.paragraphs.length*4);text.value=c.paragraphs.map(p=>p[0]).join('\n\n');text.dataset.chapter=i;text.dataset.field='text';textLabel.append(text);
    section.append(label,textLabel);$('chapters').append(section);
  });
  $('export').href=`/api/stories/${s.slug}/export`;dirty=false;$('saved').textContent=`Gespeichert · Version ${current.revision}`;
  $('draft-preview').href=`/api/stories/${s.slug}/preview`;
}
function collect(){
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
  for(const id of ['users-button','publish'])$(id).hidden=session.role!=='admin';
  $('ai-status').textContent='Texte und Notizen werden in der Datenbank gespeichert. Beauftragt die Überarbeitung anschließend im Codex-Chat.';
  const stories=await api('stories');$('trip').replaceChildren();for(const s of stories){const o=document.createElement('option');o.value=s.slug;o.textContent=s.title;$('trip').append(o);}await load(stories[0].slug);
}
$('login-form').addEventListener('submit',run(async()=>{const form=new FormData($('login-form'));const session=await api('login','POST',Object.fromEntries(form));$('login-form').reset();await enter(session);}));
$('logout').addEventListener('click',run(async()=>{if(dirty&&!confirm('Ungespeicherte Änderungen verwerfen und abmelden?'))return;await api('logout','POST',{});location.reload();}));
$('workspace').addEventListener('input',e=>{if(e.target.matches('input,textarea'))markDirty();});
$('save').addEventListener('click',run(async()=>{await save();message('Änderungen gespeichert.');}));
$('reload').addEventListener('click',run(async()=>{if(dirty&&!confirm('Ungespeicherte Änderungen verwerfen und neu laden?'))return;await load(current.story.slug);}));
$('trip').addEventListener('change',run(async()=>{if(busy){$('trip').value=current.story.slug;return;}if(dirty&&!confirm('Ungespeicherte Änderungen verwerfen und Reise wechseln?')){$('trip').value=current.story.slug;return;}await load($('trip').value);}));
$('add-chapter').addEventListener('click',()=>{collect();current.story.chapters.push({title:['Neues Kapitel','New chapter'],paragraphs:[['','']]});render();markDirty();});
$('request-edit').addEventListener('click',run(async()=>{await save();message('Texte und Änderungswünsche gespeichert. Schreibt jetzt im Codex-Chat: Bitte überarbeite die gespeicherten Reiseberichte und aktualisiere die Homepage.');}));
$('export').addEventListener('click',e=>{if(dirty){e.preventDefault();message('Bitte zuerst speichern, bevor ihr den Entwurf exportiert.');}});
window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue='';}});
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>$(b.dataset.close).close()));
function dialogRun(id,fn){return async e=>{e?.preventDefault();try{await fn(e);}catch(error){$(id).textContent=error.message;}};}
$('setup-form').addEventListener('submit',run(async()=>{
  const b=Object.fromEntries(new FormData($('setup-form')));if(b.password!==b.confirmPassword)throw new Error('Die Passwörter stimmen nicht überein.');
  await api('setup','POST',b);const session=await api('login','POST',{name:b.name,password:b.password});$('setup-form').reset();await enter(session);message('Willkommen! Weitere Konten könnt ihr unter Benutzer anlegen.');
}));
function newUser(){editingUser=null;$('user-form').reset();$('user-form').elements.name.disabled=false;$('user-form').elements.password.required=true;$('user-form-title').textContent='Neuen Benutzer anlegen';}
async function users(){
  const list=await api('users');$('user-list').replaceChildren();
  for(const user of list){const row=document.createElement('div');row.className='user-row';const name=document.createElement('span');name.textContent=`${user.display_name||user.name} · ${user.name} · ${user.role==='admin'?'Administrator':'Redaktion'}${user.enabled?'':' · inaktiv'}`;
    row.append(name,button('Bearbeiten',()=>{editingUser=user.name;const f=$('user-form').elements;f.name.value=user.name;f.name.disabled=true;f.displayName.value=user.display_name||user.name;f.role.value=user.role;f.enabled.checked=user.enabled;f.password.value='';f.password.required=false;$('user-form-title').textContent='Benutzer bearbeiten · Passwort leer lassen, um es beizubehalten';}));$('user-list').append(row);}
}
$('users-button').addEventListener('click',run(async()=>{newUser();await users();$('users-message').textContent='';$('users-dialog').showModal();}));
$('new-user').addEventListener('click',newUser);
$('user-form').addEventListener('submit',dialogRun('users-message',async()=>{
  const f=$('user-form').elements,b=Object.fromEntries(new FormData($('user-form')));b.enabled=f.enabled.checked;if(editingUser)b.name=editingUser;
  await api(editingUser?`users/${encodeURIComponent(editingUser)}`:'users',editingUser?'PUT':'POST',b);newUser();await users();$('users-message').textContent='Benutzer gespeichert. Geänderte Konten müssen sich neu anmelden.';
}));
$('password-button').addEventListener('click',()=>{$('password-form').reset();$('password-message').textContent='';$('password-dialog').showModal();});
$('password-form').addEventListener('submit',dialogRun('password-message',async()=>{const b=Object.fromEntries(new FormData($('password-form')));if(b.password!==b.confirmPassword)throw new Error('Die Passwörter stimmen nicht überein.');await api('password','POST',b);dirty=false;location.reload();}));
$('draft-preview').addEventListener('click',e=>{if(dirty){e.preventDefault();message('Bitte zuerst speichern, bevor ihr die Vorschau öffnet.');}});
$('publish').addEventListener('click',run(async()=>{if(dirty){message('Bitte zuerst speichern und die Vorschau prüfen.');return;}if(!confirm('Diesen gespeicherten Reisebericht für die Website freigeben? Er wird dort sofort sichtbar.'))return;await api(`stories/${current.story.slug}/publish`,'POST',{revision:current.revision});message('Reisebericht für die Website freigegeben.');}));
async function start(){
  try{await enter(await api('session'));return;}catch{}
  try{if((await api('setup')).available){$('login').hidden=true;$('setup').hidden=false;const token=new URL(location.href).searchParams.get('setup');if(token){$('setup-form').elements.setupToken.value=token;history.replaceState(null,'','/redaktion');}}}catch(error){message(error.message);}
}
start();
