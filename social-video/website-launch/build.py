from pathlib import Path
import subprocess, json, wave, shutil
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageFilter

ROOT=Path(__file__).parent
PROJECT=ROOT.parent.parent
WORK=ROOT/'work'; OUT=ROOT/'exports'; SOURCE=ROOT/'source'
FF=PROJECT/'_analysis_tools/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'
VIDEO=PROJECT/'social-video/norwegen/source/norway_2018.mp4'
W,H=1080,1920
INK=(17,35,29); CREAM=(244,241,230); LIME=(210,227,105)
FONT='C:/Windows/Fonts/arialbd.ttf'; REG='C:/Windows/Fonts/arial.ttf'
def font(n,bold=True):return ImageFont.truetype(FONT if bold else REG,n)
def run(args):
 p=subprocess.run([str(FF),'-hide_banner','-loglevel','error','-y',*map(str,args)],capture_output=True,text=True)
 if p.returncode:raise RuntimeError(p.stderr)
def txt(d,xy,s,n=70,color=CREAM,bold=True):d.text(xy,s,font=font(n,bold),fill=color)
def centered(d,y,s,n=70,color=CREAM):
 f=font(n); x=(W-d.textlength(s,font=f))/2;d.text((x,y),s,font=f,fill=color)
def logo(im,xy,size):
 a=Image.open(SOURCE/'logo.png').convert('RGBA');a.thumbnail((size,size));im.alpha_composite(a,xy)
def overlay(i,title,sub):
 im=Image.new('RGBA',(W,H)); d=ImageDraw.Draw(im)
 for y in range(H):
  a=int(185*max(0,1-y/900)+215*max(0,(y-1000)/920))
  d.line((0,y,W,y),fill=(*INK,a))
 logo(im,(78,170),90)
 txt(d,(191,197),'VANVENTURE',32)
 txt(d,(80,335),title,98)
 d.rounded_rectangle((80,1400,900,1480),radius=12,fill=(*INK,235))
 txt(d,(108,1420),sub,28,LIME)
 txt(d,(80,1510),'vanventure.at',50)
 im.save(WORK/f'overlay{i}.png')
def copy_sources():
 mapping={'logo.png':'assets/vanventure-logo-transparent.png','van.png':'assets/vehicle/vehicle-side-camp-v2.png','italien.jpg':'assets/heroes/italien-2021-tropea.jpg','fjord.jpg':'assets/heroes/norwegen-2018.jpg'}
 for name,p in mapping.items():shutil.copy2(PROJECT/p,SOURCE/name)
 (SOURCE/'Quellen.json').write_text(json.dumps({'copies':mapping,'video':str(VIDEO),'website':'https://vanventure.at/','website_capture':'2026-09-20','audio':'Original instrumental synthesized by build.py; no third-party samples','archive':'No reads or writes to protected photo archives'},indent=2),encoding='utf-8')
def panels():
 im=Image.new('RGBA',(W,H),INK);d=ImageDraw.Draw(im)
 logo(im,(78,170),90);txt(d,(191,197),'VANVENTURE',32)
 txt(d,(80,340),'Unser Van.',98);txt(d,(80,457),'Unser Basislager.',64,LIME)
 photo=Image.open(SOURCE/'van.png').convert('RGB'); photo=ImageOps.fit(photo,(1080,680))
 im.paste(photo,(0,665));txt(d,(80,1410),'REISEN. FAHRZEUG. AUSRÜSTUNG.',30,LIME);txt(d,(80,1510),'vanventure.at',50)
 im.convert('RGB').save(WORK/'van.jpg',quality=96)
 im=Image.new('RGBA',(W,H),INK);d=ImageDraw.Draw(im)
 txt(d,(80,175),'UNSERE WEBSITE IST ONLINE',31,LIME)
 txt(d,(80,245),'Reinschauen.',86)
 # Real mobile website screenshot inside a simple device frame.
 shot=Image.open(SOURCE/'website-mobile.png').convert('RGB')
 shot=shot.crop((0,0,shot.width-15,shot.height))
 shot=ImageOps.fit(shot,(548,1114))
 d.rounded_rectangle((242,408,838,1582),radius=55,fill=(7,14,12),outline=(103,126,113),width=3)
 mask=Image.new('L',shot.size);ImageDraw.Draw(mask).rounded_rectangle((0,0,547,1113),radius=29,fill=255)
 im.paste(shot,(266,435),mask)
 d.rounded_rectangle((430,1547,650,1554),radius=3,fill=CREAM)
 im.convert('RGB').save(WORK/'website.jpg',quality=97)
 im=Image.new('RGBA',(W,H),INK);d=ImageDraw.Draw(im)
 for r in (450,650,850): d.ellipse((540-r,710-r,540+r,710+r),outline=(34,58,45),width=2)
 logo(im,(300,270),480)
 centered(d,830,'Wir sind online.',83)
 centered(d,950,'Komm mit nach draußen.',43)
 d.rounded_rectangle((90,1110,990,1260),radius=22,fill=LIME)
 centered(d,1136,'vanventure.at',91,INK)
 centered(d,1330,'JETZT ENTDECKEN & UNS FOLGEN',30,LIME)
 centered(d,1460,'Travel slow. Go far.',34)
 im.convert('RGB').save(WORK/'end.jpg',quality=96)
def music():
 sr=48000;duration=24; audio=np.zeros((duration*sr,2),dtype=np.float64);rng=np.random.default_rng(42)
 def add(start,x,gain=1,pan=0):
  k=int(start*sr);n=min(len(x),len(audio)-k)
  if n>0:audio[k:k+n,0]+=x[:n]*gain*(1-pan*.3);audio[k:k+n,1]+=x[:n]*gain*(1+pan*.3)
 chords=[[146.832,220,293.665,349.228],[116.541,174.614,233.082,293.665],[174.614,261.626,349.228,440],[130.813,195.998,261.626,329.628]]
 for beat in range(48):
  t=np.arange(int(.42*sr))/sr
  kick=np.sin(2*np.pi*(48*t+52*.025*(1-np.exp(-t/.025))))*np.exp(-t*15)
  add(beat*.5,kick,.34)
  ht=np.arange(int(.065*sr))/sr;noise=rng.normal(0,1,len(ht));noise=np.r_[0,np.diff(noise)]
  add(beat*.5,noise*np.exp(-ht*80),.022)
  add(beat*.5+.25,noise*np.exp(-ht*90),.013,.5)
  if beat%2:
   st=np.arange(int(.15*sr))/sr;sn=rng.normal(0,1,len(st))*np.exp(-st*32)
   add(beat*.5,sn,.07)
 for bar in range(12):
  chord=chords[(bar//2)%4];t=np.arange(2*sr)/sr
  env=np.minimum(1,t/.15)*np.minimum(1,(2-t)/.35)
  pad=sum(np.sin(2*np.pi*f*t)+.3*np.sin(2*np.pi*f*1.002*t) for f in chord)/len(chord)
  add(bar*2,pad*env,.095)
  for j in range(8):
   f=chord[[0,2,1,3,2,1,3,2][j]]*2;t=np.arange(int(.65*sr))/sr
   x=(np.sin(2*np.pi*f*t)+.3*np.sin(2*np.pi*2*f*t))*np.exp(-t*7)*np.minimum(1,t/.006)
   add(bar*2+j*.25,x,.11,(-1)**j*.6)
 audio*=np.minimum(1,np.arange(len(audio))/sr/.05)[:,None]
 audio*=np.minimum(1,(len(audio)-np.arange(len(audio)))/sr/1.3)[:,None]
 audio=np.tanh(audio*1.3)*.8
 with wave.open(str(WORK/'original-beat.wav'),'wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((audio*32767).astype('<i2').tobytes())
def clip(i,duration,source,video_start=None,x=0,ov=None,zoom=False):
 args=[]
 if video_start is not None:args=['-ss',video_start,'-i',source];vf=f'crop=540:960:{x}:60,scale=1080:1920:flags=lanczos,fps=30,setsar=1'
 else:
  args=['-loop','1','-i',source]
  if zoom:vf=f'scale=-1:2200,crop=1238:2200,zoompan=z=1+0.00045*on:x=iw/2-iw/zoom/2:y=ih/2-ih/zoom/2:d=1:s=1080x1920:fps=30,setsar=1'
  else:vf='scale=1080:1920,setsar=1,fps=30'
 if ov:
  args+=['-loop','1','-i',ov];fc=f'[0:v]{vf}[bg];[bg][1:v]overlay=0:0,format=yuv420p[v]'
 else:fc=f'[0:v]{vf},format=yuv420p[v]'
 run([*args,'-filter_complex',fc,'-map','[v]','-t',duration,'-an','-c:v','libx264','-preset','fast','-crf','19','-threads','4','-filter_complex_threads','1',WORK/f'{i}.mp4'])
 print(f'Scene {i} complete',flush=True)
if __name__=='__main__':
 copy_sources();panels();music()
 overlay(0,'Wir sind\nonline.','DEIN NÄCHSTES ABENTEUER BEGINNT HIER')
 overlay(1,'Mehr draußen.\nMehr erleben.','UNSERE REISEN · ECHTE ERINNERUNGEN')
 overlay(3,'Von Fjorden\nbis ans Meer.','REISEBERICHTE & INSPIRATION')
 clip(0,3,VIDEO,667,280,WORK/'overlay0.png')
 clip(1,3,VIDEO,365.75,360,WORK/'overlay1.png')
 clip(2,3,WORK/'van.jpg')
 clip(3,3,SOURCE/'italien.jpg',ov=WORK/'overlay3.png',zoom=True)
 clip(4,6,WORK/'website.jpg')
 clip(5,6,WORK/'end.jpg')
 (WORK/'concat.txt').write_text('\n'.join(f"file '{i}.mp4'" for i in range(6)))
 silent=OUT/'VanVenture_Website_Launch_ohne_Musik.mp4'
 run(['-f','concat','-safe','0','-i',WORK/'concat.txt','-c','copy','-movflags','+faststart',silent])
 run(['-i',silent,'-i',WORK/'original-beat.wav','-map','0:v','-map','1:a','-c:v','copy','-af','loudnorm=I=-16:TP=-1.5:LRA=9','-c:a','aac','-b:a','192k','-ar','48000','-t','24','-movflags','+faststart',OUT/'VanVenture_Website_Launch.mp4'])
 Image.open(WORK/'end.jpg').save(OUT/'VanVenture_Website_Cover.jpg',quality=96)
 print('FINISHED',flush=True)
