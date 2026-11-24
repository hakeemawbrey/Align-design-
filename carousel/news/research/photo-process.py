# Reference copy. Expects NASA originals in ./dl/<asset>.(jpg|png|tif) next to a scripts/ dir; run: python3 photo-process.py <out_dir> [asset ...]
"""Process NASA source images into clean square Align assets.

Body mode: find the main subject (largest bright connected component), centre it on a
true-black square canvas at a fixed fill ratio, mask away everything else (stars, labels,
borders, other bodies) with a feathered mask, then apply a shared subtle grade.
Bg mode: square crop of a colour field (nebula / aurora), shared grade, no masking.
"""
import json, os, sys
from collections import deque
import numpy as np
from PIL import Image, ImageFilter

Image.MAX_IMAGE_PIXELS = None
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DL = os.path.join(ROOT, 'dl')
OUT = sys.argv[1]
SIDE = 1600

# precrop: (x0,y0,x1,y1) fractions applied first.
# fill: subject bbox max-dimension as fraction of SIDE.
# thr: threshold as fraction of 99.5th-percentile luminance for subject detection.
# feather: mask dilation/blur as fraction of subject size (bigger for glows).
# center: 'bbox' (default) | 'image' (source is already centred on the body, e.g. SDO, SVS moon)
# diam: for center=image, 'v' = use vertical extent of bbox as diameter
CFG = {
 'sun':                 dict(mode='body', fill=0.80, thr=0.10, feather=0.05),
 'mercury':             dict(mode='body', fill=0.76, thr=0.06, feather=0.02),
 'mercury-color':       dict(mode='body', fill=0.76, thr=0.06, feather=0.02),
 'venus':               dict(mode='body', fill=0.76, thr=0.06, feather=0.02, precrop=(0.52, 0, 1, 1)),
 'moon-full':           dict(mode='body', fill=0.80, thr=0.06, feather=0.02),
 'moon-crescent':       dict(mode='body', fill=0.80, center='ref', ref='moon-full', feather=0.02),
 'moon-half':           dict(mode='body', fill=0.80, center='ref', ref='moon-full', feather=0.02),
 'mars':                dict(mode='body', fill=0.76, thr=0.06, feather=0.02),
 'jupiter':             dict(mode='body', fill=0.78, thr=0.06, feather=0.02),
 'saturn':              dict(mode='body', fill=0.92, thr=0.05, feather=0.02),
 'uranus':              dict(mode='body', fill=0.74, thr=0.06, feather=0.02),
 'neptune':             dict(mode='body', fill=0.74, thr=0.06, feather=0.02),
 'pluto':               dict(mode='body', fill=0.76, thr=0.06, feather=0.02),
 'eclipse-total-solar': dict(mode='body', fill=0.62, thr=0.35, feather=0.30, glow=True),
 'eclipse-diamond-ring':dict(mode='body', fill=0.62, thr=0.20, feather=0.30, glow=True),
 'eclipse-partial-sun': dict(mode='body', fill=0.70, thr=0.10, feather=0.05, center='image', diam='v', blank=[(0, 0.93, 1, 1)]),
 'blood-moon':          dict(mode='body', fill=0.72, thr=0.10, feather=0.03),
 'moon-earth-shadow':   dict(mode='body', fill=0.76, thr=0.05, feather=0.03),
 'nebula-violet':       dict(mode='bg', crop=(0.0, 0.0, 1.0, 1.0)),
 'nebula-blue':         dict(mode='bg', crop='center'),
 'nebula-gold':         dict(mode='bg', crop=(0.0, 0.0, 1.0, 1.0)),
 'nebula-cosmic-cliffs':dict(mode='bg', crop='center'),
 'aurora-green':        dict(mode='bg', crop='center'),
 'aurora-pink':         dict(mode='bg', crop='center'),
 'aurora-red':          dict(mode='bg', crop=(0.12, 0.0, None, 1.0)),
}

def load(name):
    for ext in ('.jpg', '.png', '.tif'):
        p = os.path.join(DL, name + ext)
        if os.path.exists(p):
            im = Image.open(p)
            if im.format == 'JPEG':
                im.draft('RGB', (4000, 4000))   # cheap downscale for 16k sources
            im = im.convert('RGB')
            if max(im.size) > 4000:
                im.thumbnail((4000, 4000), Image.LANCZOS)
            return im
    raise FileNotFoundError(name)

def lum(a):
    return a[..., 0] * 0.2126 + a[..., 1] * 0.7152 + a[..., 2] * 0.0722

def largest_component(mask):
    h, w = mask.shape
    seen = np.zeros_like(mask, bool)
    best = None; best_n = 0
    ys, xs = np.nonzero(mask)
    for y0, x0 in zip(ys, xs):
        if seen[y0, x0]:
            continue
        q = deque([(y0, x0)]); seen[y0, x0] = True; pts = []
        while q:
            y, x = q.popleft(); pts.append((y, x))
            for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
                ny, nx = y+dy, x+dx
                if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not seen[ny, nx]:
                    seen[ny, nx] = True; q.append((ny, nx))
        if len(pts) > best_n:
            best_n = len(pts); best = pts
    out = np.zeros_like(mask, bool)
    if best:
        yy, xx = zip(*best); out[list(yy), list(xx)] = True
    return out

def detect(im, thr):
    """Return (component mask at full res as PIL L, bbox in full-res px)."""
    small = im.copy(); small.thumbnail((420, 420), Image.BILINEAR)
    s = small.size[0] / im.size[0]
    a = np.asarray(small, dtype=np.float32) / 255
    L = lum(a)
    ref = np.percentile(L, 99.5)
    m = L > thr * ref
    # close small gaps (craters, terminator noise) so the body is one blob
    mi = Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MinFilter(3))
    comp = largest_component(np.asarray(mi) > 127)
    ys, xs = np.nonzero(comp)
    bbox = (xs.min() / s, ys.min() / s, (xs.max() + 1) / s, (ys.max() + 1) / s)
    compim = Image.fromarray((comp * 255).astype(np.uint8)).resize(im.size, Image.BILINEAR)
    return compim, bbox

def grade(im, bg=False):
    a = np.asarray(im, dtype=np.float32) / 255
    # black point: crush the faint noise floor to true black
    bp = 0.02 if not bg else 0.015
    a = np.clip((a - bp) / (1 - bp), 0, 1)
    # gentle S-curve (contrast ~ +6%), mid-preserving
    a = a + 0.12 * a * (1 - a) * (2 * a - 1)  # darkens below 0.5, lifts above 0.5 (max shift ~1.2%)
    a = np.clip(a, 0, 1)
    # mild saturation +4% around luminance
    L = lum(a)[..., None]
    a = np.clip(L + (a - L) * 1.04, 0, 1)
    # very slight warm toning in highlights only (consistent "Align" warmth, < 1.5%)
    hl = np.clip((L - 0.55) / 0.45, 0, 1)
    a[..., 0] = np.clip(a[..., 0] * (1 + 0.012 * hl[..., 0]), 0, 1)
    a[..., 2] = np.clip(a[..., 2] * (1 - 0.012 * hl[..., 0]), 0, 1)
    return Image.fromarray((a * 255 + 0.5).astype(np.uint8))

def save(im, path):
    for q in (88, 86, 84, 82, 80, 78):
        im.save(path, 'JPEG', quality=q, optimize=True, progressive=True, subsampling=0 if q >= 86 else 2)
        if os.path.getsize(path) <= 600 * 1024:
            return q
    return q

REF = {}

def body(name, c):
    im = load(name)
    if 'precrop' in c:
        x0, y0, x1, y1 = c['precrop']; W, H = im.size
        im = im.crop((int(x0 * W), int(y0 * H), int(x1 * W), int(y1 * H)))
    W, H = im.size
    for bx0, by0, bx1, by1 in c.get('blank', []):   # wipe burned-in labels/timestamps
        im.paste((0, 0, 0), (int(bx0 * W), int(by0 * H), int(bx1 * W), int(by1 * H)))
    if c.get('center') == 'ref':
        cx, cy, d = REF[c['ref']]           # same SVS framing as reference frame
        cx *= W; cy *= H; d *= W
        comp = Image.new('L', im.size, 0)
        from PIL import ImageDraw
        ImageDraw.Draw(comp).ellipse((cx - d/2, cy - d/2, cx + d/2, cy + d/2), fill=255)
    else:
        comp, (x0, y0, x1, y1) = detect(im, c['thr'])
        if c.get('center') == 'image':
            d = (y1 - y0) if c.get('diam') == 'v' else max(x1 - x0, y1 - y0)
            cx, cy = W / 2, (y0 + y1) / 2
        else:
            cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
            d = max(x1 - x0, y1 - y0)
        REF[name] = (cx / W, cy / H, d / W)
    # feathered keep-mask
    f = max(2, int(c['feather'] * d))
    small = comp.copy(); sc = 600 / max(comp.size); small = small.resize((max(1, int(comp.size[0]*sc)), max(1, int(comp.size[1]*sc))), Image.BILINEAR)
    k = max(3, int(f * sc) * 2 + 1)
    small = small.filter(ImageFilter.MaxFilter(min(k, 31))).filter(ImageFilter.GaussianBlur(max(1, f * sc / 2)))
    mask = small.resize(im.size, Image.BILINEAR)
    black = Image.new('RGB', im.size, 0)
    im = Image.composite(im, black, mask)
    # place on square canvas
    scale = (c['fill'] * SIDE) / d
    nw, nh = max(1, round(W * scale)), max(1, round(H * scale))
    up = scale > 1
    im = im.resize((nw, nh), Image.LANCZOS)
    if up:
        im = im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=35, threshold=2))
    canvas = Image.new('RGB', (SIDE, SIDE), 0)
    ox = round(SIDE / 2 - cx * scale); oy = round(SIDE / 2 - cy * scale)
    canvas.paste(im, (ox, oy))
    return grade(canvas), dict(subject_diameter_src_px=round(d), scale=round(scale, 3), fill=c['fill'])

def bg(name, c):
    im = load(name); W, H = im.size
    cr = c['crop']
    if cr == 'center':
        s = min(W, H); box = ((W - s) // 2, (H - s) // 2, (W - s) // 2 + s, (H - s) // 2 + s)
    else:
        x0, y0, x1, y1 = cr
        s = min(W, H)
        if x1 is None:
            box = (int(x0 * W), 0, int(x0 * W) + s, s)
        else:
            box = (int(x0 * W), int(y0 * H), int(x1 * W), int(y1 * H))
    im = im.crop(box)
    s = im.size[0]
    scale = SIDE / s
    im = im.resize((SIDE, SIDE), Image.LANCZOS)
    if scale > 1:
        im = im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=30, threshold=2))
    return grade(im, bg=True), dict(crop_box_src_px=box, scale=round(scale, 3))

if __name__ == '__main__':
    only = sys.argv[2:] or list(CFG)
    order = ['moon-full'] + [k for k in CFG if k != 'moon-full']
    notes = {}
    os.makedirs(OUT, exist_ok=True)
    for name in order:
        if name not in only and not (name == 'moon-full' and any(CFG[o].get('ref') == 'moon-full' for o in only)):
            continue
        c = CFG[name]
        im, info = (body if c['mode'] == 'body' else bg)(name, c)
        q = save(im, os.path.join(OUT, name + '.jpg'))
        info['jpeg_quality'] = q
        info['kb'] = os.path.getsize(os.path.join(OUT, name + '.jpg')) // 1024
        notes[name] = info
        print(name, info)
    json.dump(notes, open(os.path.join(ROOT, 'proc_notes.json'), 'w'), indent=1)
