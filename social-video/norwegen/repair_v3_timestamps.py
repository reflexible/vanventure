import json,concurrent.futures
from build_v3 import ROOT,WORK,run,finish
plans=json.loads((ROOT/'Schnittplan_v3.json').read_text(encoding='utf-8'))
def repair(job):
    p,r=job;old=WORK/f'{p["name"]}-{r["index"]:02d}.mp4';new=old.with_name(old.stem+'-cfr.mp4')
    run(['-i',old,'-vf','settb=1/24,setpts=N','-frames:v',r['frames'],'-r','24','-fps_mode','cfr','-an','-c:v','libx264','-preset','fast','-crf','17','-threads','3',new])
    new.replace(old)
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:list(pool.map(repair,[(p,r) for p in plans for r in p['rows']]))
for p in plans:finish(p)
print('Constant frame timestamps restored.')
