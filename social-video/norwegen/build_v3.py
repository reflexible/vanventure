import os,json,subprocess,concurrent.futures
from pathlib import Path
from build_videos import FF,SRC,ROOT,overlay
from build_v2 import SPECIAL
WORK=ROOT/'work/v3';WORK.mkdir(exist_ok=True);OUT=ROOT/'exports'
ENV=dict(os.environ,OMP_NUM_THREADS='2')
def run(args):
    p=subprocess.run([str(FF),'-hide_banner','-loglevel','warning','-y',*map(str,args)],cwd=WORK,env=ENV,capture_output=True,text=True)
    if p.returncode:raise RuntimeError(p.stderr)
    return p.stderr
def shot(job):
    p,r=job;i=r['index'];name=p['name'];t,_,x,cap,label,mode,speed=r['settings'];n=r['frames']
    stem=f'{name}-{i:02d}';trf=f'{stem}.trf';png=WORK/f'{stem}.png'
    overlay(png,cap,label,i,len(p['rows']))
    base=f'setpts=(PTS-STARTPTS)/{speed},fps=24,trim=end_frame={n},setpts=PTS-STARTPTS'
    log=''
    if not (WORK/trf).exists():
        log=run(['-ss',t,'-i',SRC,'-an','-vf',base+f',vidstabdetect=shakiness=8:accuracy=15:stepsize=6:mincontrast=0.15:result={trf}',
                 '-frames:v',n,'-threads','2','-filter_threads','1','-f','null','NUL'])
    # A fixed zoom per shot avoids breathing borders; correction precedes reframing and text.
    stabilized=base+f',vidstabtransform=input={trf}:smoothing=12:optalgo=gauss:maxshift=100:maxangle=0.08:crop=black:optzoom=1:zoom=2:interpol=bicubic,tpad=stop_mode=clone:stop_duration=0.125'
    if mode:
        w,h,cx,cy,oy=SPECIAL[mode]
        vf=f'[0:v]{stabilized},split[b][f];[b]crop=540:960:690:60,scale=270:480,boxblur=14:2,scale=1080:1920,eq=brightness=-0.13[bg];[f]crop={w}:{h}:{cx}:{cy},scale=1080:-2:flags=lanczos[fg];[bg][fg]overlay=0:{oy},setsar=1[v]'
    else:
        # Remove the v2 digital zoom, whose pixel rounding can add visible micro-jitter.
        vf=f'[0:v]{stabilized},crop=540:960:{x}:60,scale=1080:1920:flags=lanczos,setsar=1[v]'
    log+=run(['-ss',t,'-i',SRC,'-loop','1','-i',png,'-filter_complex',vf+';[v][1:v]overlay=0:0:format=auto,format=yuv420p,settb=1/24,setpts=N[out]',
             '-map','[out]','-frames:v',n,'-r','24','-fps_mode','cfr','-an','-c:v','libx264','-preset','fast','-crf','18','-threads','3','-filter_complex_threads','1',WORK/f'{stem}.mp4'])
    (WORK/f'{stem}.log').write_text(log,encoding='utf-8')
    print(f'{name}: {i+1}/{len(p["rows"])} stabilisiert',flush=True)
def finish(p):
    name=p['name'];old=name.replace('_v3','_v2');txt=WORK/f'{name}.txt'
    txt.write_text('\n'.join(f"file '{name}-{r['index']:02d}.mp4'" for r in p['rows']))
    run(['-f','concat','-safe','0','-i',txt,'-i',OUT/f'{old}.mp4','-map','0:v','-map','1:a','-c','copy','-movflags','+faststart',OUT/f'{name}.mp4'])
    run(['-i',OUT/f'{name}.mp4','-map','0:v','-c','copy','-movflags','+faststart',OUT/f'{name}_ohne_Musik.mp4'])
    run(['-ss','0.25','-i',OUT/f'{name}.mp4','-frames:v','1','-q:v','2',OUT/f'{name}_Cover.jpg'])
if __name__=='__main__':
    plans=json.loads((ROOT/'Schnittplan_v2.json').read_text(encoding='utf-8'))
    for p in plans:p['name']=p['name'].replace('_v2','_v3');p['stabilization']='Per-shot two-pass vidstab, smoothing=12, fixed optimal zoom + 2%; no digital zoom; original v2 audio copied'
    (ROOT/'Schnittplan_v3.json').write_text(json.dumps(plans,ensure_ascii=False,indent=2),encoding='utf-8')
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:list(pool.map(shot,[(p,r) for p in plans for r in p['rows']]))
    for p in plans:finish(p)
    print('V3 fertig',flush=True)
