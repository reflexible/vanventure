import sys,json,subprocess,re,hashlib
from pathlib import Path
sys.path.insert(0,r'D:\work\_venventure\_analysis_tools')
import cv2,numpy as np
from PIL import Image,ImageDraw
from build_videos import ROOT,FF
OUT=ROOT/'exports';WORK=ROOT/'work/v3';cv2.setNumThreads(1)
def decode(path):
    b=subprocess.check_output([str(FF),'-v','error','-i',str(path),'-an','-vf','scale=270:480','-f','rawvideo','-pix_fmt','gray','pipe:1'])
    return np.frombuffer(b,np.uint8).reshape(-1,480,270)
def motion(frames):
    steps=[];mask=np.zeros((480,270),np.uint8);mask[120:348,15:255]=255
    for a,b in zip(frames,frames[1:]):
        p=cv2.goodFeaturesToTrack(a,maxCorners=180,qualityLevel=.015,minDistance=7,mask=mask)
        if p is None or len(p)<10:continue
        q,st,err=cv2.calcOpticalFlowPyrLK(a,b,p,None,winSize=(21,21),maxLevel=3)
        good=(st.reshape(-1)>0)&(err.reshape(-1)<25)
        if good.sum()<10:continue
        m,inliers=cv2.estimateAffinePartial2D(p[good],q[good],method=cv2.RANSAC,ransacReprojThreshold=1.5)
        if m is not None and inliers.sum()>=8:steps.append([m[0,2],m[1,2],np.arctan2(m[1,0],m[0,0])*200])
    if len(steps)<5:return None
    return float(np.sqrt(np.mean(np.diff(np.array(steps),axis=0)**2)))
plans=json.loads((ROOT/'Schnittplan_v3.json').read_text(encoding='utf-8'));report=[]
for p in plans:
    name=p['name'];new=decode(OUT/f'{name}.mp4');old=decode(OUT/f'{name.replace("_v3","_v2")}.mp4')
    print(name,'decoded frames:',len(new),len(old),'planned:',p['rows'][-1]['end_frame'],flush=True)
    assert len(new)==len(old)==p['rows'][-1]['end_frame']
    metrics=[];sheet=Image.new('RGB',(6*270,3*500),(15,20,22));d=ImageDraw.Draw(sheet)
    for r in p['rows']:
        i=r['index'];a=r['start_frame'];b=r['end_frame'];before=motion(old[a:b]);after=motion(new[a:b])
        metrics.append(dict(shot=i+1,before=before,after=after))
        frame=WORK/f'{name}-qa-{i}.jpg'
        subprocess.run([str(FF),'-v','error','-y','-ss',str((a+b)/48),'-i',str(OUT/f'{name}.mp4'),'-frames:v','1','-vf','scale=270:480',str(frame)],check=True)
        x=i%6*270;y=i//6*500;sheet.paste(Image.open(frame),(x,y));d.text((x+5,y+482),str(i+1),fill='white')
    sheet.save(WORK/f'{name}-check.jpg')
    r=subprocess.run([str(FF),'-hide_banner','-i',str(OUT/f'{name}.mp4'),'-vf','blackdetect=d=0.08:pix_th=0.10','-af','volumedetect','-f','null','NUL'],capture_output=True,text=True)
    audio=[]
    for path in [OUT/f'{name}.mp4',OUT/f'{name.replace("_v3","_v2")}.mp4']:
        raw=subprocess.check_output([str(FF),'-v','error','-i',str(path),'-map','0:a','-c','copy','-f','adts','pipe:1']);audio.append(hashlib.sha256(raw).hexdigest())
    report.append(dict(name=name,decode_exit=r.returncode,frames=len(new),audio_identical=audio[0]==audio[1],black_sections=re.findall(r'black_start:[^\r\n]*',r.stderr),motion=metrics))
(ROOT/'Pruefung_v3.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
for p in report:
    print(p['name'],'frames',p['frames'],'audio identical',p['audio_identical'],'black',p['black_sections'])
    print('Motion:',[(r['shot'],round(r['before'] or 0,3),round(r['after'] or 0,3)) for r in p['motion']])
