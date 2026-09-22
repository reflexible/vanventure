const $=id=>document.getElementById(id);let csrf='';
async function request(path,method='GET',data){const response=await fetch(path,{method,headers:{'Content-Type':'application/json','X-CSRF-Token':csrf},body:data?JSON.stringify(data):undefined});const result=await response.json().catch(()=>({}));if(!response.ok)throw new Error(result.error||'Die Anfrage konnte nicht ausgeführt werden.');return result;}
function message(value){$('message').textContent=value;}
async function start(){try{const session=await request('/api/profile');csrf=session.csrf;$('user-name').textContent=session.displayName||session.name;$('display-name').value=session.displayName||session.name;}catch{location.replace('/redaktion');}}
$('profile-form').addEventListener('submit',async event=>{event.preventDefault();try{const result=await request('/api/profile','PUT',{displayName:$('display-name').value});$('user-name').textContent=result.displayName;message('Profil gespeichert.');}catch(error){message(error.message);}});
$('logout').addEventListener('click',async()=>{try{await request('/api/logout','POST',{});}finally{location.replace('/');}});start();
