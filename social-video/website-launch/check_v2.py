import subprocess,json
from pathlib import Path
import numpy as np,cv2
from PIL import Image,ImageDraw
import build_v2 as b
cv2.setNumThreads(1)
def frames(path):
 raw=subprocess.check_output([str(b.b.FF),'-v','error','-i',str(path),'-vf','scale=480:270,fps=30','-pix_fmt','gray','-f','rawvideo','pipe:1'])
 return np.frombuffer(raw,np.uint8).reshape(-1,270,480)
def jitter(a):
 steps=[];mask=np.zeros((270,480),np.uint8);mask[35:240,40:440]=255
 for prev,cur in zip(a,a[1:]):
  p=cv2.goodFeaturesToTrack(prev,250,.01,7,mask=mask)
  if p is None:continue
  q,st,err=cv2.calcOpticalFlowPyrLK(prev,cur,p,None)
  good=(st.ravel()>0)&(err.ravel()<25)
  if good.sum()<10:continue
  m,inliers=cv2.estimateAffinePartial2D(p[good],q[good],method=cv2.RANSAC,ransacReprojThreshold=1.5)
  if m is not None and inliers.sum()>8:steps.append([m[0,2],m[1,2],np.arctan2(m[1,0],m[0,0])*200])
 return float(np.sqrt(np.mean(np.diff(steps,axis=0)**2))) if len(steps)>5 else None
report=[]
for s in b.shots:
 i=s['i'];before=jitter(frames(b.SRC/f'{i}-original-frames.mkv'));after=jitter(frames(b.WORK/f'{i}-stabilized-wide.mp4'))
 report.append(dict(scene=s['name'],before=before,after=after,reduction_percent=round(100*(1-after/before),1) if before and after is not None else None))
sheet=Image.new('RGB',(7*216,384));
for i in range(7):
 p=b.WORK/f'qa-{i}.jpg';b.run(['-ss','0.8','-i',b.WORK/f'{i}.mp4','-frames:v','1','-vf','scale=216:384',p]);sheet.paste(Image.open(p),(i*216,0))
sheet.save(b.WORK/'Kontaktbogen_v2.jpg')
final=b.OUT/'VanVenture_Website_Launch_v2.mp4'
p=subprocess.run([str(b.b.FF),'-hide_banner','-i',str(final),'-vf','blackdetect=d=0.1:pix_th=0.1','-af','volumedetect','-f','null','NUL'],capture_output=True,text=True)
(b.WORK/'decode-check.txt').write_text(p.stderr,encoding='utf-8')
result={'motion_estimate':report,'decode_exit':p.returncode,'note':'Optical-flow estimate of frame-to-frame acceleration at 480x270, not a guarantee for every local object or rolling-shutter distortion.'}
(b.ROOT/'Pruefung_v2.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8');print(json.dumps(result,ensure_ascii=False,indent=2))
