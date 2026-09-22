import { createHash } from 'node:crypto';

const issuer=new Set(['https://accounts.google.com','accounts.google.com']);
export function ready(){return !!(process.env.GOOGLE_LOGIN_CLIENT_ID&&process.env.GOOGLE_LOGIN_CLIENT_SECRET&&process.env.GOOGLE_LOGIN_REDIRECT_URI);}
export function authorizationUrl({state,nonce,codeChallenge}){
  const url=new URL('https://accounts.google.com/o/oauth2/v2/auth');
  url.search=new URLSearchParams({client_id:process.env.GOOGLE_LOGIN_CLIENT_ID,redirect_uri:process.env.GOOGLE_LOGIN_REDIRECT_URI,response_type:'code',scope:'openid email profile',state,nonce,code_challenge:codeChallenge,code_challenge_method:'S256',prompt:'select_account'}).toString();
  return url.toString();
}
export async function exchange(code,codeVerifier){
  const response=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({code,client_id:process.env.GOOGLE_LOGIN_CLIENT_ID,client_secret:process.env.GOOGLE_LOGIN_CLIENT_SECRET,redirect_uri:process.env.GOOGLE_LOGIN_REDIRECT_URI,grant_type:'authorization_code',code_verifier:codeVerifier})});
  if(!response.ok)throw new Error('GOOGLE_LOGIN_TOKEN_EXCHANGE');
  const data=await response.json();if(typeof data.id_token!=='string')throw new Error('GOOGLE_LOGIN_ID_TOKEN');return data.id_token;
}
export async function identity(idToken,nonce){
  const response=await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);
  if(!response.ok)throw new Error('GOOGLE_LOGIN_ID_TOKEN');
  const data=await response.json();
  if(data.aud!==process.env.GOOGLE_LOGIN_CLIENT_ID||!issuer.has(data.iss)||data.nonce!==nonce||data.email_verified!=='true'||typeof data.sub!=='string'||!/^\d{8,}$/.test(data.sub)||typeof data.email!=='string')throw new Error('GOOGLE_LOGIN_IDENTITY_INVALID');
  return {sub:data.sub,email:data.email.trim().toLowerCase()};
}
export const tokenHash=value=>createHash('sha256').update(value).digest('hex');
