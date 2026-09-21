import sys,json
sys.path.insert(0,r'D:\work\_venventure\_analysis_tools')
import cv2
from build_videos import ROOT
plans=json.loads((ROOT/'Schnittplan_v3.json').read_text(encoding='utf-8'))
for p in plans:
    print(p['name'])
    for r in p['rows']:
        stem=f'{p["name"]}-{r["index"]:02d}.mp4'
        cap=cv2.VideoCapture(str(ROOT/'work/v3'/stem));got=int(cap.get(cv2.CAP_PROP_FRAME_COUNT));cap.release()
        if got!=r['frames']:print(r['index'],r['frames'],got)
    for v in ['v2','v3']:
        cap=cv2.VideoCapture(str(ROOT/'exports'/f'{p["name"].replace("v3",v)}.mp4'))
        print(v,cap.get(cv2.CAP_PROP_FRAME_COUNT),cap.get(cv2.CAP_PROP_FPS));cap.release()
