import subprocess,json,re
from build_v2 import ROOT,OUT,FF
plans=json.loads((ROOT/'Schnittplan_v2.json').read_text(encoding='utf-8'));report=[]
for p in plans:
    cmd=[str(FF),'-hide_banner','-i',str(OUT/(p['name']+'.mp4')),'-vf',"blackdetect=d=0.08:pix_th=0.10,select='gt(scene,0.26)',showinfo",'-af','volumedetect,silencedetect=noise=-50dB:d=0.5','-f','null','NUL']
    r=subprocess.run(cmd,capture_output=True,text=True)
    (ROOT/'work/v2'/(p['name']+'-verify.log')).write_text(r.stderr,encoding='utf-8')
    changes=[float(x) for x in re.findall(r'pts_time:([0-9.]+)',r.stderr)]
    planned=[row['start_frame']/24 for row in p['rows']]
    unexpected=[t for t in changes if min(abs(t-c) for c in planned)>.06]
    report.append(dict(name=p['name'],decode_exit=r.returncode,duration=p['duration'],shots=len(p['rows']),max_beat_rounding_error_ms=max(abs(x['cut_error_ms']) for x in p['rows']),unexpected_scene_changes=unexpected,black_sections=re.findall(r'black_start:[^\r\n]*',r.stderr),silences=re.findall(r'silence_start:[^\r\n]*',r.stderr),peak_volume=re.findall(r'max_volume:[^\r\n]*',r.stderr)))
(ROOT/'Pruefung_v2.json').write_text(json.dumps(report,indent=2),encoding='utf-8');print(json.dumps(report,indent=2))
