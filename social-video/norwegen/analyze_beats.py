import subprocess,json
import numpy as np
from build_videos import FF,SRC,WORK
def analyze(start,duration=50):
    sr=22050; hop=128;nfft=1024
    raw=subprocess.check_output([str(FF),'-v','error','-ss',str(start),'-i',str(SRC),'-t',str(duration),'-map','0:a:0','-ac','1','-ar',str(sr),'-f','f32le','pipe:1'])
    x=np.frombuffer(raw,dtype='<f4')
    frames=np.lib.stride_tricks.sliding_window_view(x,nfft)[::hop]
    spec=np.abs(np.fft.rfft(frames*np.hanning(nfft),axis=1))
    diff=np.maximum(0,np.diff(np.log1p(spec*10),axis=0))
    freq=np.fft.rfftfreq(nfft,1/sr)
    onset=diff[:,(freq>45)&(freq<8000)].mean(axis=1)
    onset=np.maximum(0,onset-np.convolve(onset,np.ones(71)/71,mode='same'))
    tt=(np.arange(len(onset))*hop+nfft/2+hop)/sr
    best=None
    for bpm in np.arange(140,190,.1):
        period=60/bpm
        for phase in np.arange(0,period,.006):
            grid=np.arange(phase,duration-.1,period)
            vals=np.interp(grid,tt,onset)
            score=np.mean(vals)
            if best is None or score>best[0]:best=(float(score),float(bpm),float(phase))
    score,bpm,phase=best;period=60/bpm
    beats=[]
    for t in np.arange(phase,duration-.1,period):
        idx=np.where(abs(tt-t)<.045)[0]
        peak=idx[np.argmax(onset[idx])]
        beats.append({'grid':float(t),'peak':float(tt[peak]),'strength':float(onset[peak])})
    result=dict(source_audio_start=start,bpm=bpm,phase=phase,score=score,beats=beats)
    print(json.dumps({k:v for k,v in result.items() if k!='beats'}),flush=True)
    return result
if __name__=='__main__':
    result={name:analyze(start) for name,start in [('reel',410),('short',627)]}
    (WORK/'beats-v2.json').write_text(json.dumps(result,indent=2))
