import os,json,subprocess
from pathlib import Path
import build as b

ROOT=b.ROOT; WORK=ROOT/'work/v2'; OUT=b.OUT; SRC=ROOT/'source/v2'
WORK.mkdir(exist_ok=True);SRC.mkdir(exist_ok=True)
os.environ['OMP_NUM_THREADS']='2'
def run(args):
 p=subprocess.run([str(b.FF),'-hide_banner','-loglevel','warning','-y',*map(str,args)],cwd=WORK,capture_output=True,text=True)
 if p.returncode:raise RuntimeError(p.stderr)
 return p.stderr

# Copy decoded source frames to lossless project intermediates before processing.
shots=[
 dict(i=0,name='Sardinien · La Pelosa',file='E:/eigene_movies/sardinien/sardinien_master.mp4',start=209,duration=3,crop='540:960:1070:60',title='Wir sind\nonline.',label='SARDINIEN · UNSERE REISEN',locked=True),
 dict(i=2,name='Norwegen · Aurlandsfjord',file=str(b.VIDEO),start=366,duration=2,crop='540:960:360:60',title='Raus aufs\nWasser.',label='NORWEGEN · MIT DEM KAJAK',locked=True),
 dict(i=3,name='Sardinien · mit dem Bike',file='E:/eigene_movies/sardinien/sardinien_master.mp4',start=89,duration=2,crop='540:960:690:60',title='Neue Wege\nentdecken.',label='SARDINIEN · MIT DEM BIKE'),
 dict(i=4,name='Italien · Tropea',file=str(b.PROJECT/'video-analysis/sources/al5rjX3PDWM.mp4'),start=31.5,duration=3,crop='360:640:670:40',title='Das Meer\nim Blick.',label='ITALIEN · REISEBERICHTE & INSPIRATION'),
]
def process(s):
 i=s['i'];src=SRC/f'{i}-original-frames.mkv';n=s['duration']
 if not src.exists():run(['-ss',s['start'],'-i',s['file'],'-t',n,'-map','0:v:0','-an','-c:v','ffv1','-level','3','-threads','3',src])
 b.overlay(i,s['title'],s['label'])
 trf=f'shot-{i}.trf'
 run(['-i',src,'-vf',f'vidstabdetect=shakiness=10:accuracy=15:stepsize=6:mincontrast=0.12:result={trf}','-an','-threads','2','-filter_threads','1','-f','null','NUL'])
 # Fixed framing and fixed optical zoom. No zoompan, dynamic crop, or animated zoom.
 stable='null' if s.get('locked') else f'vidstabtransform=input={trf}:smoothing=20:optalgo=gauss:crop=black:optzoom=1:zoom=5:interpol=bicubic'
 fps='minterpolate=fps=30:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1' if i==4 else 'fps=30'
 stable+=f',{fps},tpad=stop_mode=clone:stop_duration=0.12,trim=duration={n},setpts=PTS-STARTPTS'
 run(['-i',src,'-an','-vf',stable,'-c:v','libx264','-crf','16','-preset','fast','-threads','3','-filter_threads','1',WORK/f'{i}-stabilized-wide.mp4'])
 vf=f'crop={s["crop"]},scale=1080:1920:flags=lanczos,setsar=1'
 renderinput=WORK/f'{i}-stabilized-wide.mp4'
 if i==2:
  # Convert native 24fps motion after the fixed crop, avoiding duplicate-frame cadence.
  renderinput=src
  vf=f'crop={s["crop"]},minterpolate=fps=30:mi_mode=mci:mc_mode=aobmc:me_mode=bidir,tpad=stop_mode=clone:stop_duration=0.12,trim=duration={n},scale=1080:1920:flags=lanczos,setsar=1'
 run(['-i',renderinput,'-loop','1','-i',b.WORK/f'overlay{i}.png','-filter_complex',f'[0:v]{vf}[bg];[bg][1:v]overlay=0:0,format=yuv420p[v]','-map','[v]','-frames:v',n*30,'-an','-c:v','libx264','-crf','19','-preset','fast','-threads','3','-filter_complex_threads','1',WORK/f'{i}.mp4'])
 print(f'{i}: {s["name"]} stabilized',flush=True)

if __name__=='__main__':
 for s in shots:process(s)
 # Stable brand/website panels retained; no artificial camera movement.
 for i,dur,source in [(1,2,b.WORK/'van.jpg'),(5,6,b.WORK/'website.jpg'),(6,6,b.WORK/'end.jpg')]:
  run(['-loop','1','-i',source,'-t',dur,'-vf','fps=30,format=yuv420p,setsar=1','-an','-c:v','libx264','-crf','19','-preset','fast','-threads','3',WORK/f'{i}.mp4'])
 (WORK/'concat.txt').write_text('\n'.join(f"file '{i}.mp4'" for i in range(7)))
 silent=OUT/'VanVenture_Website_Launch_v2_ohne_Musik.mp4';final=OUT/'VanVenture_Website_Launch_v2.mp4'
 run(['-f','concat','-safe','0','-i','concat.txt','-c','copy','-movflags','+faststart',silent])
 run(['-i',silent,'-i',OUT/'VanVenture_Website_Launch.mp4','-map','0:v','-map','1:a','-c','copy','-movflags','+faststart',final])
 (ROOT/'Schnittplan_v2.json').write_text(json.dumps({'duration':24,'fps':30,'shots':shots,'stabilization':'Bike and Italy: two-pass vidstab, Gaussian smoothing=20; fixed per-shot zoom; fixed crop; no zoompan. Already steady sea/kayak scenes retain original camera motion: correction rejected after measured degradation. Italy 24fps converted with motion-compensated interpolation to 30fps.','audio':'Original v1 audio retained'},ensure_ascii=False,indent=2),encoding='utf-8')
 print('V2 COMPLETE',flush=True)
