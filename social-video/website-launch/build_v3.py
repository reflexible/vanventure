from pathlib import Path
import subprocess,json,shutil,hashlib
from PIL import Image,ImageOps,ImageDraw,ImageFilter
import build as b

WORK=b.ROOT/'work/v3';OUT=b.OUT
def run(args):
 p=subprocess.run([str(b.FF),'-hide_banner','-loglevel','error','-y',*map(str,args)],capture_output=True,text=True)
 if p.returncode:raise RuntimeError(p.stderr)
def overlay(i,title,label):
 # No full-frame gradient or vignette. Shadows follow the glyphs only.
 ink=(17,35,29);im=Image.new('RGBA',(1080,1920));shadow=im.copy();sd=ImageDraw.Draw(shadow)
 positions=[((191,197),'VANVENTURE',32),((80,335),title,94),((80,1510),'vanventure.at',50)]
 for (x,y),text,size in positions:sd.multiline_text((x+2,y+3),text,font=b.font(size),fill=(*ink,230),stroke_width=4,spacing=4)
 im=Image.alpha_composite(im,shadow.filter(ImageFilter.GaussianBlur(5)));d=ImageDraw.Draw(im)
 b.logo(im,(78,170),90)
 for pos,text,size in positions:d.multiline_text(pos,text,font=b.font(size),fill=b.CREAM,stroke_width=1,stroke_fill=(*ink,140),spacing=4)
 boxwidth=min(870,int(d.textlength(label,font=b.font(28)))+55)
 d.rounded_rectangle((80,1400,80+boxwidth,1478),radius=12,fill=(*ink,185))
 d.text((107,1420),label,font=b.font(28),fill=b.LIME)
 im.save(WORK/f'overlay-{i}.png')
def render(i,src,vf,seconds,still=False):
 args=['-loop','1'] if still else []
 run([*args,'-i',src,'-loop','1','-i',WORK/f'overlay-{i}.png','-filter_complex',f'[0:v]{vf},setsar=1[bg];[bg][1:v]overlay=0:0,format=yuv420p[v]','-map','[v]','-frames:v',seconds*30,'-r','30','-an','-c:v','libx264','-crf','18','-preset','fast','-threads','4','-filter_complex_threads','1',WORK/f'{i}.mp4'])
 print(f'Scene {i} complete',flush=True)
if __name__=='__main__':
 original=b.ROOT/'source/v3-sardinien-handy/DSC_0279.JPG'
 # Preserve the byte-identical archive copy; only orient an independent video input.
 ImageOps.exif_transpose(Image.open(original)).convert('RGB').save(WORK/'bike-oriented.png')
 overlay(0,'Wir sind\nonline.','SARDINIEN · UNSERE REISEN')
 overlay(2,'Raus aufs\nWasser.','NORWEGEN · MIT DEM KAJAK')
 overlay(3,'Mit dem Bike.\nNach draußen.','SARDINIEN · BIKES AM MEER')
 overlay(4,'Das Meer\nim Blick.','ITALIEN · REISEBERICHTE & INSPIRATION')
 render(0,b.ROOT/'source/v2/0-original-frames.mkv','crop=540:960:1070:60,eq=gamma=1.04:saturation=1.08,scale=1080:1920:flags=lanczos,fps=30',3)
 render(2,b.ROOT/'source/v2/2-original-frames.mkv','crop=540:960:360:60,minterpolate=fps=30:mi_mode=mci:mc_mode=aobmc:me_mode=bidir,tpad=stop_mode=clone:stop_duration=0.12,trim=duration=2,eq=gamma=1.04:saturation=1.04,scale=1080:1920:flags=lanczos',2)
 render(3,WORK/'bike-oriented.png','scale=-2:1920:flags=lanczos,crop=1080:1920,eq=gamma=1.18:saturation=1.06,fps=30',2,True)
 render(4,b.ROOT/'work/v2/4-stabilized-wide.mp4','crop=360:640:520:40,eq=gamma=1.17:saturation=1.12:brightness=0.012,scale=1080:1920:flags=lanczos,fps=30',3)
 for i in [1,5,6]:shutil.copy2(b.ROOT/f'work/v2/{i}.mp4',WORK/f'{i}.mp4')
 (WORK/'concat.txt').write_text('\n'.join(f"file '{i}.mp4'" for i in range(7)))
 silent=OUT/'VanVenture_Website_Launch_v3_ohne_Musik.mp4';final=OUT/'VanVenture_Website_Launch_v3.mp4'
 run(['-f','concat','-safe','0','-i',WORK/'concat.txt','-c','copy','-movflags','+faststart',silent])
 run(['-i',silent,'-i',OUT/'VanVenture_Website_Launch.mp4','-map','0:v','-map','1:a','-c','copy','-movflags','+faststart',final])
 source={'photo_original':'E:/_fotos_original/urlaubsSammlungen/sardinien2019/handy/DSC_0279.JPG','unchanged_project_copy':str(original),'sha256':hashlib.sha256(original.read_bytes()).hexdigest(),'changes':'Removed full-frame gradients from scenic shots; lifted shadows and moderately enriched color; replaced bike ground footage with original portrait photo, fixed framing, no zoom; Tropea reframed to include sea and coast. Prior stabilization retained.','duration':24,'fps':30}
 (b.ROOT/'Schnittplan_v3.json').write_text(json.dumps(source,ensure_ascii=False,indent=2),encoding='utf-8')
 sheet=Image.new('RGB',(7*216,384))
 for i in range(7):
  p=WORK/f'qa-{i}.jpg';run(['-ss','0.8','-i',WORK/f'{i}.mp4','-frames:v','1','-vf','scale=216:384',p]);sheet.paste(Image.open(p),(i*216,0))
 sheet.save(WORK/'Kontaktbogen_v3.jpg')
 print('V3 complete',flush=True)
