from pathlib import Path
import subprocess, concurrent.futures, sys
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).parent
FF=Path(r'D:\work\_venventure\_analysis_tools\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe')
SRC=ROOT/'source/norway_2018.mp4'
def frame(t):
    p=ROOT/'work'/f'frame-{t:07.2f}.jpg'
    if not p.exists():
        subprocess.run([str(FF),'-hide_banner','-loglevel','error','-ss',str(t),'-i',str(SRC),'-frames:v','1','-vf','scale=384:216','-q:v','3','-y',str(p)],check=True)
    return p
if __name__=='__main__':
    times=[float(t) for t in sys.argv[1:]] if len(sys.argv)>1 else list(range(10,1390,20))
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: paths=list(pool.map(frame,times))
    for page in range((len(times)+23)//24):
        sheet=Image.new('RGB',(1536,6*244),(18,23,25)); d=ImageDraw.Draw(sheet)
        for i,(t,p) in enumerate(list(zip(times,paths))[page*24:(page+1)*24]):
            x=(i%4)*384;y=(i//4)*244
            sheet.paste(Image.open(p),(x,y));d.text((x+8,y+218),f'{t//60:02.0f}:{t%60:05.2f}   ({t}s)',fill='white')
        sheet.save(ROOT/'work'/f'sheet-{page}.jpg')
        print(ROOT/'work'/f'sheet-{page}.jpg',flush=True)
