import json,concurrent.futures,subprocess,csv
from pathlib import Path
from PIL import Image,ImageDraw
from build_videos import FF,SRC,ROOT,overlay,run
WORK=ROOT/'work/v2';OUT=ROOT/'exports';WORK.mkdir(exist_ok=True)
# source time, musical beats, crop x, headline, label, optional wide framing, playback speed
R=[
(791,4,1100,'NORWEGEN.\nVOLLES GEFÜHL.','PREIKESTOLEN','cliff',1),
(411,4,1040,'NORWEGEN.\nVOLLES GEFÜHL.','JULIE IST DABEI','dog',1),
(366,4,360,'RAUS.\nAUFS WASSER.','AURLANDSFJORD',None,1),
(468,2,600,'RAUS.\nAUFS WASSER.','PERSPEKTIVE WECHSELN',None,1.3),
(487,2,690,'RAUS.\nAUFS WASSER.','HARDANGERFJORD',None,1),
(543,2,690,'EIS.\nWASSER. WILDNIS.','NORWEGEN',None,1.3),
(545,4,640,'EIS.\nWASSER. WILDNIS.','BUARBREEN',None,1),
(550.25,4,730,'EIS.\nWASSER. WILDNIS.','ZWISCHEN DEN BERGEN',None,1),
(330,4,690,'IMMER\nWEITER RAUS.','ROADTRIP',None,1.6),
(493,2,1050,'IMMER\nWEITER RAUS.','UNTERWEGS ZU ZWEIT','selfie',1),
(935,2,580,'IMMER\nWEITER RAUS.','WASSERFALL',None,1.2),
(910,4,690,'IMMER\nWEITER RAUS.','DURCH DEN WALD',None,1.2),
(1049,4,900,'BIS\nANS MEER.','NEBEL AN DER KÜSTE',None,1),
(1055,4,300,'BIS\nANS MEER.','AM LEUCHTTURM',None,1),
(1070,4,700,'SO VIEL\nZU ENTDECKEN.','MOMENTE AM WASSER',None,1.2),
(1130,4,740,'SO VIEL\nZU ENTDECKEN.','NORWEGEN VOM WASSER AUS',None,1.2),
(1150,4,680,'SO VIEL\nZU ENTDECKEN.','NOCH EIN LETZTER BLICK',None,1.1),
(1187.5,8,460,'MEHR DAVON?\n@VanVenture','GANZER FILM AUF YOUTUBE',None,1),
]
S=[
(592,2,690,'FÜR\nDIESEN BLICK.','TROLLTUNGA · NORWEGEN',None,1),
(589,4,850,'FÜR\nDIESEN BLICK.','LOS GEHT’S','hiker',1),
(595,2,690,'FÜR\nDIESEN BLICK.','SCHRITT FÜR SCHRITT',None,1),
(596.5,4,760,'RUCKSACK AUF.\nJULIE DABEI.','UNTERWEGS IN DEN BERGEN',None,1),
(609.5,4,780,'RUCKSACK AUF.\nJULIE DABEI.','RAUS AUS DEM ALLTAG',None,1),
(621.5,4,1050,'RUCKSACK AUF.\nJULIE DABEI.','PAUSE AM WASSER',None,1),
(629.25,8,760,'DER WEG?\nSCHON EIN HIGHLIGHT.','ÜBER DEN WOLKEN',None,0.7),
(635,4,690,'DER WEG?\nSCHON EIN HIGHLIGHT.','WEITE STATT ALLTAG',None,1.1),
(639,2,650,'DER WEG?\nSCHON EIN HIGHLIGHT.','BERGSEEN',None,1),
(645,4,690,'DER WEG?\nSCHON EIN HIGHLIGHT.','WEITER NACH OBEN',None,1.2),
(655,4,450,'KURZ\nDURCHATMEN.','ZEIT FÜR EINE PAUSE','tea',1),
(662,4,430,'DA IST SIE.\nTROLLTUNGA.','DIESER MOMENT','wide',1),
(664.75,2,820,'DA IST SIE.\nTROLLTUNGA.','DIESER MOMENT','ledge',1),
(667.5,6,280,'DA IST SIE.\nTROLLTUNGA.','DIESER MOMENT',None,1),
(681.5,8,1050,'WIR BLEIBEN.\nÜBER NACHT.','ZELT, BERGE UND JULIE',None,0.85),
(687,8,780,'AUFWACHEN.\nSTAUNEN.','MORGENLICHT IN NORWEGEN',None,1.15),
(695,8,850,'DIE GANZE REISE:\n@VanVenture','AUF YOUTUBE WEITERSCHAUEN','hiker',0.9),
]
SPECIAL={'cliff':(1080,1080,840,0,420),'dog':(960,960,960,60,420),'selfie':(1920,900,0,0,520),'hiker':(1080,1080,600,0,420),'tea':(1650,880,0,20,600),'wide':(1920,880,0,30,650),'ledge':(1500,880,140,30,590)}
def plan(name,shots,analysis):
    origin=analysis['beats'][0]['peak'];cum=0;last=0;rows=[]
    for i,s in enumerate(shots):
        cum+=s[1];b=analysis['beats'][cum]
        target=b['peak'] if abs(b['peak']-b['grid'])<.035 else b['grid']
        end=round((target-origin)*24)
        frames=end-last
        rows.append(dict(index=i,source=s[0],source_end=s[0]+frames/24*s[6],frames=frames,start_frame=last,end_frame=end,beat=cum,cut_error_ms=round(((end/24+origin)-target)*1000,2),settings=s))
        last=end
    return dict(name=name,music_start=analysis['source_audio_start']+origin,bpm=analysis['bpm'],rows=rows,duration=last/24)
def shot(args):
    p,r=args;i=r['index'];name=p['name'];t,_,x,cap,label,mode,speed=r['settings'];n=r['frames']
    png=WORK/f'{name}-{i:02d}.png';mp4=WORK/f'{name}-{i:02d}.mp4'
    overlay(png,cap,label,i,len(p['rows']))
    base=f'[0:v]setpts=(PTS-STARTPTS)/{speed},fps=24'
    if mode:
        w,h,cx,cy,oy=SPECIAL[mode]
        vf=base+f',split[b][f];[b]crop=540:960:690:60,scale=270:480,boxblur=14:2,scale=1080:1920,eq=brightness=-0.13[bg];[f]crop={w}:{h}:{cx}:{cy},scale=1080:-2:flags=lanczos[fg];[bg][fg]overlay=0:{oy},setsar=1[v]'
    else:
        # A restrained forward move reinforces momentum without repeating a shot.
        vf=base+f',crop=540:960:{x}:60,scale=1080:1920:flags=lanczos,zoompan=z=1+0.025*on/{n}:x=iw/2-iw/zoom/2:y=ih/2-ih/zoom/2:d=1:s=1080x1920:fps=24,setsar=1[v]'
    run(['-ss',t,'-i',SRC,'-loop','1','-i',png,'-filter_complex',vf+';[v][1:v]overlay=0:0:format=auto,format=yuv420p[out]',
         '-map','[out]','-frames:v',n,'-an','-c:v','libx264','-preset','fast','-crf','19','-threads','3','-filter_complex_threads','1',mp4])
    print(f'{name} {i+1}/{len(p["rows"])}',flush=True)
def finish(p):
    name=p['name'];total=p['duration']
    txt=WORK/f'{name}.txt';txt.write_text('\n'.join(f"file '{name}-{r['index']:02d}.mp4'" for r in p['rows']))
    run(['-f','concat','-safe','0','-i',txt,'-c','copy',WORK/f'{name}-silent.mp4'])
    run(['-i',WORK/f'{name}-silent.mp4','-ss',p['music_start'],'-i',SRC,'-filter_complex',
         f'[1:a:0][1:a:1]join=inputs=2:channel_layout=stereo,atrim=duration={total},asetpts=PTS-STARTPTS,loudnorm=I=-14:TP=-1.5:LRA=9,afade=t=in:d=0.005,afade=t=out:st={total-.12}:d=0.12[a]',
         '-map','0:v','-map','[a]','-c:v','copy','-c:a','aac','-b:a','192k','-ar','48000','-t',total,'-movflags','+faststart',OUT/f'{name}.mp4'])
    run(['-i',WORK/f'{name}-silent.mp4','-c','copy','-movflags','+faststart',OUT/f'{name}_ohne_Musik.mp4'])
    run(['-ss','0.25','-i',OUT/f'{name}.mp4','-frames:v','1','-q:v','2',OUT/f'{name}_Cover.jpg'])
def checks(plans):
    for p in plans:
        name=p['name'];rows=p['rows'];sheet=Image.new('RGB',(270*6,500*((len(rows)+5)//6)),(15,20,22));d=ImageDraw.Draw(sheet)
        for r in rows:
            i=r['index'];out=WORK/f'{name}-check-{i}.jpg'
            run(['-ss',(r['start_frame']+r['frames']/2)/24,'-i',OUT/f'{name}.mp4','-frames:v','1','-vf','scale=270:480',out])
            x=i%6*270;y=i//6*500;sheet.paste(Image.open(out),(x,y));d.text((x+5,y+482),f'{i+1} | {r["frames"]/24:.2f}s | {r["source"]}',fill='white')
        sheet.save(WORK/f'{name}-check.jpg')
if __name__=='__main__':
    beats=json.loads((ROOT/'work/beats-v2.json').read_text())
    plans=[plan('Norwegen_Reel_v2',R,beats['reel']),plan('Norwegen_YouTube_Short_v2',S,beats['short'])]
    # No repeated or overlapping source footage, including across the two edits.
    intervals=sorted([(r['source'],r['source_end']) for p in plans for r in p['rows']])
    assert all(a[1]<=b[0] for a,b in zip(intervals,intervals[1:])),intervals
    (ROOT/'Schnittplan_v2.json').write_text(json.dumps(plans,ensure_ascii=False,indent=2),encoding='utf-8')
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:list(pool.map(shot,[(p,r) for p in plans for r in p['rows']]))
    for p in plans:finish(p)
    checks(plans)
    print([(p['name'],p['duration'],max(abs(r['cut_error_ms']) for r in p['rows'])) for p in plans],flush=True)
