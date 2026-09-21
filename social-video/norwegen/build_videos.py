from pathlib import Path
import subprocess, json, concurrent.futures
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).parent
FF=Path(r'D:\work\_venventure\_analysis_tools\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe')
SRC=ROOT/'source/norway_2018.mp4'
WORK=ROOT/'work'; OUT=ROOT/'exports'
BOLD=r'C:\Windows\Fonts\arialbd.ttf'; REG=r'C:\Windows\Fonts\arial.ttf'
# Source seconds, duration, horizontal crop position, caption, scene label.
REEL=[
 (667,2.5,280,'NORWEGEN.\nKOMMST DU MIT?','TROLLTUNGA'),
 (411,2.5,1040,'NORWEGEN.\nKOMMST DU MIT?','JULIE IST DABEI'),
 (365.75,2.5,360,'FJORDE. BERGE.\nFREIHEIT.','AURLANDSFJORD'),
 (545,2,640,'FJORDE. BERGE.\nFREIHEIT.','BUARBREEN'),
 (550.25,2,730,'FJORDE. BERGE.\nFREIHEIT.','UNTERWEGS IN NORWEGEN'),
 (791,2.5,1100,'SO FÜHLT SICH\nDRAUSSEN AN.','PREIKESTOLEN'),
 (681.5,3,1050,'SO FÜHLT SICH\nDRAUSSEN AN.','UNSER PLATZ FÜR DIE NACHT'),
 (687,3,780,'SO FÜHLT SICH\nDRAUSSEN AN.','MORGENLICHT IN DEN BERGEN'),
 (667,4,280,'MEHR NORWEGEN?\n@VanVenture','DEN GANZEN FILM AUF YOUTUBE'),
]
SHORT=[
 (667,2.5,280,'WÜRDEST DU\nHIER STEHEN?','TROLLTUNGA · NORWEGEN'),
 (609.5,2.5,780,'DAFÜR SIND WIR\nLOSGEZOGEN.','UNSERE REISE · 2018'),
 (612,2,270,'DAFÜR SIND WIR\nLOSGEZOGEN.','MIT RUCKSACK UND VORFREUDE'),
 (621.5,2.5,1050,'JULIE?\nNATÜRLICH DABEI.','KURZE PAUSE AM WASSER'),
 (628,4,760,'SCHON DER WEG:\nDIESE AUSSICHT.','OBEN IN DEN BERGEN'),
 (662,2.5,430,'UND DANN:\nTROLLTUNGA.','DER MOMENT, FÜR DEN WIR KAMEN'),
 (664.75,2,820,'UND DANN:\nTROLLTUNGA.','DER MOMENT, FÜR DEN WIR KAMEN'),
 (667,2.5,280,'EINMAL\nDURCHATMEN.','DIESER BLICK BLEIBT'),
 (681.5,3,'1050','WIR BLEIBEN\nÜBER NACHT.','ZELT, BERGE UND JULIE'),
 (687,4,780,'UND WACHEN\nSO AUF.','MORGENLICHT BEI DER TROLLTUNGA'),
 (628,4.5,760,'DIE GANZE REISE\nAUF DEM KANAL.','@VanVenture  ·  JETZT ABONNIEREN'),
]
def run(args):
    p=subprocess.run([str(FF),'-hide_banner','-loglevel','error','-y',*map(str,args)],capture_output=True,text=True)
    if p.returncode: raise RuntimeError(p.stderr)
def overlay(path,caption,label,index,count):
    im=Image.new('RGBA',(1080,1920));d=ImageDraw.Draw(im)
    for y in range(1920):
        a=int(140*max(0,1-y/640)) if y<640 else int(175*min(1,max(0,(y-1240)/450)))
        if a:d.line((0,y,1079,y),fill=(7,18,21,a))
    lime=(220,241,145,255)
    d.rounded_rectangle((74,196,82,237),radius=4,fill=lime)
    d.text((102,196),'VANVENTURE / NORWEGEN',font=ImageFont.truetype(BOLD,30),fill='white',stroke_width=1)
    size=82
    while max(d.textlength(line,font=ImageFont.truetype(BOLD,size)) for line in caption.split('\n'))>850:size-=1
    d.multiline_text((72,275),caption,font=ImageFont.truetype(BOLD,size),fill='white',spacing=8,stroke_width=1,stroke_fill=(0,0,0,50))
    labelsize=29
    while d.textlength(label,font=ImageFont.truetype(BOLD,labelsize))>840:labelsize-=1
    d.text((76,1440),label,font=ImageFont.truetype(BOLD,labelsize),fill=lime)
    d.text((76,1490),'VAN · KAJAK · BERGE · ABENTEUER',font=ImageFont.truetype(REG,24),fill=(255,255,255,220))
    for k in range(count):
        x=76+k*(828/count)
        d.rounded_rectangle((x,1560,x+828/count-8,1565),radius=2,fill=lime if k<=index else (255,255,255,85))
    im.save(path)
def shot(job):
    name,i,s,count=job;t,dur,x,cap,label=s
    png=WORK/f'{name}-{i:02d}.png';mp4=WORK/f'{name}-{i:02d}.mp4'
    overlay(png,cap,label,i,count)
    special={('Norwegen_Reel',1):(960,960,960,60,420),('Norwegen_Reel',5):(1080,1080,840,0,420),('Norwegen_YouTube_Short',2):(1080,1080,80,0,420),('Norwegen_YouTube_Short',5):(1920,880,0,30,650),('Norwegen_YouTube_Short',6):(1500,880,140,30,590)}
    if (name,i) in special:
        w,h,cx,cy,oy=special[name,i]
        vf=f'[0:v]split[b][f];[b]crop=540:960:690:60,scale=270:480,boxblur=14:2,scale=1080:1920,eq=brightness=-0.13[bg];[f]crop={w}:{h}:{cx}:{cy},scale=1080:-2:flags=lanczos[fg];[bg][fg]overlay=0:{oy},setsar=1,fps=24[v]'
    else:
        slow='setpts=1.6*(PTS-STARTPTS),' if name=='Norwegen_Reel' and i==8 else ''
        vf=f'[0:v]{slow}crop=540:960:{x}:60,scale=1080:1920:flags=lanczos,setsar=1,fps=24[v]'
    run(['-ss',t,'-i',SRC,'-loop','1','-i',png,'-filter_complex',vf+';[v][1:v]overlay=0:0:format=auto,format=yuv420p[out]',
         '-map','[out]','-t',dur,'-an','-c:v','libx264','-preset','fast','-crf','19','-threads','3','-filter_complex_threads','1',mp4])
    print(f'{name} shot {i+1}/{count}',flush=True)
def finish(name,shots,music_start):
    total=sum(float(s[1]) for s in shots)
    concat=WORK/f'{name}-concat.txt'
    concat.write_text('\n'.join(f"file '{name}-{i:02d}.mp4'" for i in range(len(shots))),encoding='utf-8')
    run(['-f','concat','-safe','0','-i',concat,'-c','copy',WORK/f'{name}-silent.mp4'])
    # The film has two mono tracks: combine them as left/right of its stereo soundtrack.
    run(['-i',WORK/f'{name}-silent.mp4','-ss',music_start,'-i',SRC,'-filter_complex',
         f'[1:a:0][1:a:1]join=inputs=2:channel_layout=stereo,atrim=duration={total},asetpts=PTS-STARTPTS,loudnorm=I=-16:TP=-1.5:LRA=11,afade=t=in:d=0.15,afade=t=out:st={total-0.8}:d=0.8[a]',
         '-map','0:v','-map','[a]','-c:v','copy','-c:a','aac','-b:a','192k','-ar','48000','-t',total,'-movflags','+faststart',OUT/f'{name}.mp4'])
    # Music-free alternative for adding a platform soundtrack without double music.
    run(['-i',WORK/f'{name}-silent.mp4','-c','copy','-movflags','+faststart',OUT/f'{name}_ohne_Musik.mp4'])
    run(['-ss','0.5','-i',OUT/f'{name}.mp4','-frames:v','1','-q:v','2',OUT/f'{name}_Cover.jpg'])
    return total
if __name__=='__main__':
    jobs=[(name,i,s,len(shots)) for name,shots in [('Norwegen_Reel',REEL),('Norwegen_YouTube_Short',SHORT)] for i,s in enumerate(shots)]
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:list(pool.map(shot,jobs))
    totals={}
    for name,shots,audio in [('Norwegen_Reel',REEL,410),('Norwegen_YouTube_Short',SHORT,627)]:totals[name]=finish(name,shots,audio)
    (ROOT/'Schnittplan.json').write_text(json.dumps({'source':str(SRC),'original':r'E:\eigene_movies\norwegen\norway_2018.mp4','format':'1080x1920, 24 fps, H.264 + AAC','reel':REEL,'short':SHORT,'durations':totals},ensure_ascii=False,indent=2),encoding='utf-8')
    print(totals,flush=True)
