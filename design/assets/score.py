import sys, colorsys
from PIL import Image
import numpy as np

def score(path):
    im = Image.open(path).convert('RGB')
    im.thumbnail((300,600))
    a = np.asarray(im).astype(np.float32)/255.0
    r,g,b = a[...,0],a[...,1],a[...,2]
    mx = a.max(2); mn = a.min(2)
    v = mx
    s = np.where(mx>0,(mx-mn)/np.maximum(mx,1e-6),0)
    accent = ((s>0.50)&(v>0.50)).mean()*100
    # haze: dim (0.12<v<=0.5), saturated pixels whose HUE departs from the ground hue by >28 deg
    dim = (s>0.30)&(v>0.12)&(v<=0.50)
    mxi = a.argmax(2); d = np.maximum(mx-mn,1e-6)
    hue = np.where(mxi==0, ((g-b)/d)%6, np.where(mxi==1,(b-r)/d+2,(r-g)/d+4))*60
    if dim.sum()>0:
        hist = np.histogram(hue[dim], bins=36, range=(0,360))[0]; ground = (hist.argmax()+0.5)*10
        dh = np.abs((hue-ground+180)%360-180)
        haze = (dim&(dh>28)).mean()*100
    else: haze = 0.0
    light  = (v>0.85).mean()*100          # bright illustration mass
    lum = 0.2126*r+0.7152*g+0.0722*b
    rng = float(np.percentile(lum,98)-np.percentile(lum,2))
    contrast = float(lum.std())
    # hue buckets among accent pixels
    mask = (s>0.40)&(v>0.35)
    hues = np.zeros(8)
    if mask.sum()>0:
        mxi = a[mask].argmax(1); mxv=mx[mask]; mnv=mn[mask]; d=np.maximum(mxv-mnv,1e-6)
        rr,gg,bb = a[mask][:,0],a[mask][:,1],a[mask][:,2]
        h = np.where(mxi==0, ((gg-bb)/d)%6, np.where(mxi==1,(bb-rr)/d+2,(rr-gg)/d+4))*60
        for i in range(8):
            hues[i] = ((h>=i*45)&(h<(i+1)*45)).mean()
    nh = int((hues>0.06).sum())
    return dict(accent=accent, haze=haze, light=light, rng=rng, contrast=contrast, hues=nh)

if __name__=='__main__':
    rows=[]
    for p in sys.argv[1:]:
        d=score(p); rows.append((p.split('/')[-1],d))
    print(f"{'screen':34} {'accent%':>8} {'haze%':>7} {'light%':>7} {'range':>7} {'contr':>7} {'hues':>5}")
    for n,d in rows:
        print(f"{n:34} {d['accent']:8.2f} {d['haze']:7.2f} {d['light']:7.2f} {d['rng']:7.3f} {d['contrast']:7.3f} {d['hues']:5d}")
    import statistics as st
    for k in ['accent','haze','light','rng','contrast','hues']:
        print(f"  mean {k}: {st.mean(d[k] for _,d in rows):.3f}")
