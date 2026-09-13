// Agent-only database access inside the container; no public endpoint or API call.
import { openPostgres } from './postgres.mjs';
const db=await openPostgres();
try {
  const [command,slug]=process.argv.slice(2);
  if(command==='read') {
    const items=slug?[{slug}]:await db.list();
    console.log(JSON.stringify(await Promise.all(items.map(async item=>({slug:item.slug,...await db.draft(item.slug)}))),null,2));
  } else if(command==='apply'&&slug) {
    let input='';for await(const chunk of process.stdin)input+=chunk;
    const result=JSON.parse(input),current=await db.draft(slug);
    if(!current||result.revision!==current.revision)throw new Error('CONFLICT');
    const story=result.story;
    const pair=v=>Array.isArray(v)&&v.length===2&&v.every(t=>typeof t==='string');
    if(!story||!['title','subtitle','meta','lead'].every(k=>pair(story[k]))||!Array.isArray(story.chapters)||!story.chapters.length||story.chapters.length>30||story.chapters.some(c=>!pair(c.title)||!Array.isArray(c.paragraphs)||c.paragraphs.some(p=>!pair(p))))throw new Error('Invalid bilingual story');
    for(const key of ['slug','country','year','videos','hero'])story[key]=current.story[key];
    // Keep photo references intact; the agent edits text, not the photo archive.
    if(story.chapters.length!==current.story.chapters.length)throw new Error('Keep chapter structure and photo references');
    story.chapters=story.chapters.map((c,i)=>({...current.story.chapters[i],title:c.title,paragraphs:c.paragraphs}));
    const revision=await db.save(slug,{story:{...current.story,...story},notes:{facts:'',highlights:'',keywords:''}},current.revision,'codex-redaktion');
    await db.publish(slug,revision,'codex-redaktion');
    console.log(JSON.stringify({slug,revision,published:true}));
  } else throw new Error('Use: node editor/redaction.mjs read [slug] | apply slug (JSON from stdin)');
} finally {await db.close();}
