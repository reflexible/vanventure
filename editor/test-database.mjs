import net from 'node:net';
import pg from 'pg';
import {randomBytes} from 'node:crypto';
export async function freePort(){const s=net.createServer();await new Promise(r=>s.listen(0,'127.0.0.1',r));const p=s.address().port;await new Promise(r=>s.close(r));return p;}
export async function testDatabase(){
  if(process.env.TEST_DATABASE_URL){
    const admin=new pg.Client({connectionString:process.env.TEST_DATABASE_URL});await admin.connect();
    const schema='vv_test_'+randomBytes(12).toString('hex');await admin.query(`CREATE SCHEMA ${schema}`);
    const url=new URL(process.env.TEST_DATABASE_URL);url.searchParams.set('options',`-c search_path=${schema}`);
    return {url:url.toString(),close:async()=>{try{await admin.query(`DROP SCHEMA ${schema} CASCADE`);}finally{await admin.end();}}};
  }
  const {PGlite}=await import('@electric-sql/pglite');
  const {PGLiteSocketServer}=await import('@electric-sql/pglite-socket');
  const db=await PGlite.create(),port=await freePort();
  const socket=new PGLiteSocketServer({db,port,host:'127.0.0.1'});await socket.start();
  return {url:`postgresql://postgres:postgres@127.0.0.1:${port}/postgres`,close:async()=>{await socket.stop();await db.close();}};
}
