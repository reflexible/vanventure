from pathlib import Path
from PIL import Image,ImageDraw
import subprocess
from build_videos import ROOT,WORK,OUT,FF,REEL,SHORT
for name,shots in [('Norwegen_Reel',REEL),('Norwegen_YouTube_Short',SHORT)]:
    sheet=Image.new('RGB',(5*270,((len(shots)+4)//5)*500),(15,20,22));draw=ImageDraw.Draw(sheet)
    for i,s in enumerate(shots):
        p=WORK/f'{name}-check-{i}.jpg'
        subprocess.run([str(FF),'-hide_banner','-loglevel','error','-ss',str(s[1]/2),'-i',str(WORK/f'{name}-{i:02d}.mp4'),'-frames:v','1','-vf','scale=270:480','-y',str(p)],check=True)
        x=i%5*270;y=i//5*500;sheet.paste(Image.open(p),(x,y));draw.text((x+6,y+481),f'Shot {i+1}, source {s[0]}s',fill='white')
    sheet.save(WORK/f'{name}-check.jpg')
