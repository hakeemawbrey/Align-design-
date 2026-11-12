"""The "painted" style: a real Buddha sculpture photo, recoloured in saturated
neon tones over a painted sky, given an oil-paint texture, with bold white
caption text (setup line on top, punchline at the bottom).

Used by generate.py (--style painted, the default).
"""
import math
import subprocess
import time
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

HERE = Path(__file__).resolve().parent
FONT_SANS = HERE / "fonts" / "TikTokSans.ttf"

# statue gradient map (dark -> light) and sky stops (top -> horizon)
PAINT_PALETTES = {
    "jade-sky":     ([(3, 16, 26), (8, 70, 74), (30, 160, 135), (160, 240, 200), (250, 255, 230)],
                     [(8, 22, 90), (18, 100, 210), (50, 200, 240), (250, 235, 70)]),
    "gold-temple":  ([(26, 8, 0), (115, 55, 8), (225, 150, 30), (255, 222, 120), (255, 250, 225)],
                     [(8, 10, 60), (30, 40, 150), (120, 60, 190), (255, 140, 80)]),
    "violet-dream": ([(14, 0, 34), (75, 18, 140), (170, 80, 235), (240, 175, 255), (255, 242, 255)],
                     [(4, 30, 60), (10, 120, 160), (60, 220, 200), (255, 230, 120)]),
    "cosmic-blue":  ([(0, 8, 30), (10, 48, 140), (40, 140, 240), (155, 222, 255), (242, 250, 255)],
                     [(30, 0, 40), (120, 20, 120), (240, 80, 140), (255, 200, 90)]),
    "rose-gold":    ([(30, 5, 15), (128, 30, 70), (232, 112, 140), (255, 202, 190), (255, 246, 236)],
                     [(5, 20, 70), (20, 90, 180), (80, 200, 230), (220, 250, 255)]),
    "emerald-fire": ([(0, 20, 10), (8, 98, 50), (60, 200, 92), (205, 255, 150), (255, 255, 230)],
                     [(40, 0, 40), (160, 20, 62), (255, 92, 40), (255, 212, 62)]),
    "ocean-sun":    ([(0, 14, 34), (0, 92, 120), (20, 190, 210), (170, 245, 250), (250, 255, 250)],
                     [(70, 10, 60), (220, 70, 70), (255, 160, 50), (255, 240, 120)]),
    "true-colour":  (None, [(10, 30, 100), (25, 110, 220), (70, 205, 240), (245, 230, 80)]),
}
FRAMINGS = ["close", "close", "medium", "full"]


# ------------------------------------------------------------- image ops --
def box(a, r):
    """Mean filter of radius r on HxW(xC) float array via integral image."""
    k = 2 * r + 1
    pad = [(r + 1, r)] + [(r + 1, r)] + [(0, 0)] * (a.ndim - 2)
    c = np.pad(a, pad, mode="edge").cumsum(0).cumsum(1)
    return (c[k:, k:] - c[:-k, k:] - c[k:, :-k] + c[:-k, :-k]) / (k * k)


def kuwahara(img, r=3):
    """Oil-paint look: each pixel takes the mean of its least-varied quadrant."""
    p = 2 * r
    return _kuwahara(np.pad(img, ((p, p), (p, p), (0, 0)), mode="reflect"), r)[p:-p, p:-p]


def _kuwahara(img, r):
    lum = img @ np.array([0.299, 0.587, 0.114], np.float32)
    m = box(img, r)
    ml = box(lum, r)
    vl = box(lum * lum, r) - ml * ml
    h, w = lum.shape
    best_v = np.full((h, w), np.inf, np.float32)
    out = np.zeros_like(img)
    for dy in (-r, r):
        for dx in (-r, r):
            v = np.roll(np.roll(vl, dy, 0), dx, 1)
            mm = np.roll(np.roll(m, dy, 0), dx, 1)
            sel = v < best_v
            best_v[sel] = v[sel]
            out[sel] = mm[sel]
    return out


def gradient_map(lum, stops):
    stops = np.array(stops, np.float32) / 255.0
    x = np.clip(lum, 0, 1) * (len(stops) - 1)
    i = np.clip(np.floor(x).astype(int), 0, len(stops) - 2)
    f = (x - i)[..., None]
    return stops[i] * (1 - f) + stops[i + 1] * f


def noise(rng, w, h, octaves=5, base=4):
    g = np.random.default_rng(rng.randrange(1 << 30))
    out = np.zeros((h, w), np.float32)
    amp, tot = 1.0, 0.0
    for o in range(octaves):
        n = base * 2 ** o
        small = Image.fromarray((g.random((max(2, int(n * h / w)), n)) * 255).astype(np.uint8))
        out += np.asarray(small.resize((w, h), Image.BICUBIC), np.float32) / 255.0 * amp
        tot += amp
        amp *= 0.55
    return out / tot


def sky(rng, w, h, stops):
    y = np.linspace(0, 1, h, dtype=np.float32)[:, None]
    horizon = rng.uniform(0.62, 0.85)
    t = np.clip(y / horizon, 0, 1) ** 1.3
    stops_a = np.array(stops, np.float32) / 255.0
    x = t * (len(stops_a) - 1)
    i = np.clip(np.floor(x).astype(int), 0, len(stops_a) - 2)
    f = (x - i)[..., None]
    base = np.repeat(stops_a[i] * (1 - f) + stops_a[i + 1] * f, w, axis=1)
    clouds = noise(rng, w, h, base=3)
    cl = np.clip((clouds - 0.48) * 3.2, 0, 1)[..., None]
    lit = np.clip(base * 1.45 + 0.18, 0, 1)
    dark = base * 0.45
    out = base * (1 - cl) + lit * cl
    shade = np.clip((0.42 - clouds) * 3, 0, 1)[..., None] * 0.6
    return out * (1 - shade) + dark * shade


def segment(im):
    """Mask (float HxW, 1 = statue) for museum photos shot on a plain or graded backdrop, else None."""
    a = np.asarray(im, np.float32)
    h, w = a.shape[:2]
    # fit a smooth (quadratic) backdrop to the border pixels, so grey gradients and vignettes count as backdrop
    yy, xx = np.mgrid[0:h, 0:w]
    bw = max(4, min(h, w) // 60)
    edge = np.zeros((h, w), bool)
    edge[:bw] = edge[-bw:] = True
    edge[:, :bw] = edge[:, -bw:] = True
    X, Y = xx / w - 0.5, yy / h - 0.5
    basis = lambda X, Y: np.stack([np.ones_like(X), X, Y, X * X, Y * Y, X * Y], -1)
    A = basis(X[edge], Y[edge])
    coef, *_ = np.linalg.lstsq(A, a[edge], rcond=None)
    fit = basis(X, Y) @ coef
    resid = np.abs(a - fit).sum(2)
    spread = np.median(resid[edge])
    if spread > 24:
        return None
    t = max(30.0, spread * 4.5)
    bgish = Image.fromarray(np.where(resid < t, 255, 0).astype(np.uint8)).filter(ImageFilter.MaxFilter(3))
    for x in range(0, w, 12):
        for y in (0, h - 1):
            if bgish.getpixel((x, y)) == 255:
                ImageDraw.floodfill(bgish, (x, y), 128)
    for y in range(0, h, 12):
        for x in (0, w - 1):
            if bgish.getpixel((x, y)) == 255:
                ImageDraw.floodfill(bgish, (x, y), 128)
    m = (np.asarray(bgish) != 128).astype(np.uint8) * 255
    mi = Image.fromarray(m).filter(ImageFilter.MinFilter(5)).filter(ImageFilter.MaxFilter(3))
    mf = np.asarray(mi.filter(ImageFilter.GaussianBlur(2)), np.float32) / 255.0
    frac = mf.mean()
    if frac < 0.05 or frac > 0.85:
        return None
    return mf


def head_box(mask):
    """Approximate the head: the top of the statue's silhouette."""
    rows = np.where(mask.max(1) > 0.5)[0]
    cols = np.where(mask.max(0) > 0.5)[0]
    top, bot = rows[0], rows[-1]
    bh = bot - top
    band = mask[top + int(bh * 0.06): top + int(bh * 0.16)] > 0.5
    widths = band.sum(1)
    hw = float(np.median(widths)) if len(widths) else (cols[-1] - cols[0]) * 0.4
    xs = np.where(band.any(0))[0]
    cx = float(xs.mean()) if len(xs) else (cols[0] + cols[-1]) / 2
    return dict(top=top, bot=bot, left=cols[0], right=cols[-1], cx=cx, hw=max(hw, 20))


# ----------------------------------------------------------- composition --
def compose(rng, path, palette, framing, size):
    """The painted still (float RGB) at `size` (w, h)."""
    w, h = size
    statue_stops, sky_stops = PAINT_PALETTES[palette]
    cut = HERE / "library" / "cut" / f"{Path(path).stem}.png"
    if cut.exists():  # a clean cut-out made by fetch_images.py (rembg)
        ci = Image.open(cut).convert("RGBA")
        ci.thumbnail((1400, 1400))
        im = ci.convert("RGB")
        mask = np.asarray(ci.getchannel("A"), np.float32) / 255.0
        if mask.mean() < 0.03:
            mask = None
    else:
        im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
        im.thumbnail((1400, 1400))
        mask = segment(im)
    canvas = sky(rng, w, h, sky_stops)
    if mask is not None:
        hb = head_box(mask)
        if framing == "close":
            s = 0.66 * w / hb["hw"]
            ty = 0.12 * h
        elif framing == "medium":
            s = 0.42 * w / hb["hw"]
            ty = 0.14 * h
        else:
            s = min(0.86 * h / (hb["bot"] - hb["top"]), 0.92 * w / (hb["right"] - hb["left"]))
            ty = 0.10 * h
        bh = hb["bot"] - hb["top"]
        bw = hb["right"] - hb["left"]
        compact = bh < 1.7 * bw  # a head or bust: always show all of it
        if framing != "full":  # never tighter than about waist-up / a whole head
            s = min(s, 0.92 * h / ((0.95 if compact else 0.62) * bh), 1.05 * w / (hb["right"] - hb["left"]) * (1.9 if framing == "close" else 1.2))
        s = max(s, 0.3)
        nw, nh = int(im.width * s), int(im.height * s)
        ox = int(w / 2 - hb["cx"] * s + rng.uniform(-0.04, 0.04) * w)
        oy = int(ty - hb["top"] * s)
        big = np.asarray(im.resize((nw, nh), Image.LANCZOS), np.float32) / 255.0
        bm = np.asarray(Image.fromarray((mask * 255).astype(np.uint8)).resize((nw, nh), Image.BILINEAR),
                        np.float32) / 255.0
        photo = np.zeros((h, w, 3), np.float32)
        alpha = np.zeros((h, w), np.float32)
        x0, y0, x1, y1 = max(0, ox), max(0, oy), min(w, ox + nw), min(h, oy + nh)
        photo[y0:y1, x0:x1] = big[y0 - oy:y1 - oy, x0 - ox:x1 - ox]
        alpha[y0:y1, x0:x1] = bm[y0 - oy:y1 - oy, x0 - ox:x1 - ox]
        if (oy + nh) < h and framing != "full":  # statue cut off above the bottom: let it run off-frame
            alpha[y1:] = 0
    else:  # busy background: use the whole photo, cover-cropped
        s = max(w / im.width, h / im.height) * (1.25 if framing == "close" else 1.05)
        nw, nh = int(im.width * s), int(im.height * s)
        big = im.resize((nw, nh), Image.LANCZOS)
        ox, oy = (nw - w) // 2, int((nh - h) * 0.3)
        photo = np.asarray(big.crop((ox, oy, ox + w, oy + h)), np.float32) / 255.0
        alpha = np.ones((h, w), np.float32)

    # recolour the statue
    lum = photo @ np.array([0.299, 0.587, 0.114], np.float32)
    sel = alpha > 0.5
    if sel.sum() > 100:
        lo, hi = np.percentile(lum[sel], [2, 98])
        lum = np.clip((lum - lo) / max(1e-3, hi - lo), 0, 1)
    lum = lum ** 1.05
    if statue_stops is None:  # keep the photo's own colours, but push them
        grey = lum[..., None]
        statue = np.clip(grey + (photo - photo.mean(2, keepdims=True)) * 2.6, 0, 1)
    else:
        statue = gradient_map(lum, statue_stops)
        statue = np.clip(statue + (photo - photo.mean(2, keepdims=True)) * 0.6, 0, 1)
    a3 = alpha[..., None]
    # a soft glow around the statue so it sits in the sky
    glow = np.asarray(Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(w * 0.03)),
                      np.float32)[..., None] / 255.0
    glow_c = np.array(sky_stops[-1], np.float32) / 255.0
    canvas = np.clip(canvas + glow * (1 - a3) * glow_c * 0.55, 0, 1)
    out = canvas * (1 - a3) + statue * a3

    # paint it: oil-paint at half size, then a brush-relief texture and crisp edges
    p = kuwahara(out, 4)
    up = Image.fromarray((np.clip(p, 0, 1) * 255).astype(np.uint8))
    up = up.filter(ImageFilter.UnsharpMask(radius=2, percent=120, threshold=2))
    pa = np.asarray(up, np.float32) / 255.0
    relief = np.asarray(up.convert("L").filter(ImageFilter.EMBOSS), np.float32) / 255.0 - 0.5
    grain = noise(rng, w, h, octaves=2, base=int(w / 3)) - 0.5
    pa = np.clip(pa + relief[..., None] * 0.30 + grain[..., None] * 0.04, 0, 1)
    # saturation + contrast push
    m = pa.mean(2, keepdims=True)
    pa = np.clip(m + (pa - m) * 1.35, 0, 1)
    pa = np.clip((pa - 0.5) * 1.08 + 0.5, 0, 1)
    return pa.astype(np.float32)


# ------------------------------------------------------------------ text --
def tfont(size, weight="Bold"):
    f = ImageFont.truetype(str(FONT_SANS), size)
    try:
        f.set_variation_by_name(weight)
    except Exception:
        pass
    return f


def wrap(text, f, maxw):
    words, lines, cur = text.split(), [], ""
    for wd in words:
        t = (cur + " " + wd).strip()
        if f.getlength(t) <= maxw or not cur:
            cur = t
        else:
            lines.append(cur)
            cur = wd
    if cur:
        lines.append(cur)
    return lines


def caption_sprite(text, width, size, maxw, weight="Bold", max_lines=3):
    """White text with a black outline and soft shadow -> (rgb, alpha) float arrays, full width."""
    while True:
        f = tfont(size, weight)
        lines = wrap(text, f, maxw)
        if len(lines) <= max_lines or size < 40:
            break
        size -= 4
    stroke = max(3, size // 11)
    lh = int(size * 1.16)
    hh = lh * len(lines) + stroke * 4 + 30
    fill = Image.new("L", (width, hh), 0)
    edge = Image.new("L", (width, hh), 0)
    df, de = ImageDraw.Draw(fill), ImageDraw.Draw(edge)
    for i, ln in enumerate(lines):
        x = (width - f.getlength(ln)) / 2
        y = 12 + i * lh
        de.text((x, y), ln, font=f, fill=255, stroke_width=stroke, stroke_fill=255)
        df.text((x, y), ln, font=f, fill=255)
    shadow = edge.filter(ImageFilter.GaussianBlur(stroke * 2.2))
    fa = np.asarray(fill, np.float32) / 255.0
    ea = np.asarray(edge, np.float32) / 255.0
    sa = np.asarray(shadow, np.float32) / 255.0 * 0.55
    alpha = np.clip(np.maximum(ea, sa), 0, 1)
    rgb = np.clip(fa / np.maximum(alpha, 1e-4), 0, 1)[..., None].repeat(3, 2)
    return rgb, alpha


def paste(canvas, rgb, alpha, y, k=1.0, scale=1.0):
    if scale != 1.0:
        hh, ww = alpha.shape
        nw, nh = max(1, int(ww * scale)), max(1, int(hh * scale))
        rgb = np.asarray(Image.fromarray((rgb * 255).astype(np.uint8)).resize((nw, nh), Image.BILINEAR),
                         np.float32) / 255.0
        alpha = np.asarray(Image.fromarray((alpha * 255).astype(np.uint8)).resize((nw, nh), Image.BILINEAR),
                           np.float32) / 255.0
        x = (canvas.shape[1] - nw) // 2
        y = y + (hh - nh) // 2
    else:
        x = 0
    h, w = alpha.shape
    H, W = canvas.shape[:2]
    x0, y0, x1, y1 = max(0, x), max(0, y), min(W, x + w), min(H, y + h)
    if x1 <= x0 or y1 <= y0:
        return
    a = alpha[y0 - y:y1 - y, x0 - x:x1 - x, None] * k
    canvas[y0:y1, x0:x1] = canvas[y0:y1, x0:x1] * (1 - a) + rgb[y0 - y:y1 - y, x0 - x:x1 - x] * a


def text_items(p, w, h, credit=True, handle=None, cta=None):
    q = p["quote"]
    sq = abs(w - h) < 10
    items = []
    top = q["top"]
    bottom = q["bottom"]
    size = int(w * 0.082)
    t_rgb, t_a = caption_sprite(top, w, size, w * 0.88)
    b_rgb, b_a = caption_sprite(bottom, w, size, w * 0.88)
    ty = int(h * (0.20 if sq else 0.22))
    by = int(h * (0.80 if sq else 0.70)) - b_a.shape[0] // 2
    t0 = 0.6
    t1 = t0 + 1.0 + len(top.split()) * 0.28
    items.append(dict(rgb=t_rgb, a=t_a, y=ty, t=t0))
    items.append(dict(rgb=b_rgb, a=b_a, y=by, t=t1))
    end = t1 + 1.2 + len(bottom.split()) * 0.3
    if credit:
        c_rgb, c_a = caption_sprite("— " + q["author"], w, int(w * 0.036), w * 0.9, "SemiBold", 1)
        items.append(dict(rgb=c_rgb, a=c_a, y=by + b_a.shape[0] - 6, t=end - 0.6))
    if handle:
        hr, ha = caption_sprite(handle, w, int(w * 0.03), w * 0.9, "SemiBold", 1)
        items.append(dict(rgb=hr, a=ha * 0.85, y=int(h * (0.93 if sq else 0.06)), t=0.0, static=True))
    if cta:  # a quiet line near the bottom, above where Instagram puts its buttons on a reel
        cr, ca = caption_sprite(cta, w, int(w * 0.03), w * 0.9, "Medium", 1)
        items.append(dict(rgb=cr, a=ca * 0.72, y=int(h * (0.925 if sq else 0.835)), t=0.0, static=True))
    return items, end


def draw_text(c, items):
    """All text, plain and still: no pop-in, no fades."""
    for it in items:
        paste(c, it["rgb"], it["a"], it["y"])


# ---------------------------------------------------------------- render --
def plan_look(rng, history, library):
    used = history.get("images", [])
    fresh = [p for p in library if p.name not in used] or library
    if len(fresh) == len(library) and used:
        history["images"] = []
    img = rng.choice(fresh)
    palette = rng.choice(list(PAINT_PALETTES))
    framing = rng.choice(FRAMINGS)
    return dict(image=img, palette=palette, framing=framing, key=f"{img.stem}/{palette}/{framing}")


def render(p, out_dir, rng, make_score, hashtags, stills_only=False, credit=True, handle=None, square=False,
           cta=None):
    """A still picture held for the length of the reel: no motion, no text effects."""
    W, H = 1080, 1920
    img = compose(rng, p["image"], p["palette"], p["framing"], (W, H))
    items, end = text_items(p, W, H, credit, handle, cta)
    draw_text(img, items)
    still = (np.clip(img, 0, 1) * 255).astype(np.uint8)
    dur = float(min(16, max(7.5, end + 2.8)))
    stem = out_dir / time.strftime("buddha-%Y%m%d-%H%M%S")
    if stills_only:
        return still, stem
    jpg = Path(str(stem) + ".jpg")
    Image.fromarray(still).save(jpg, quality=95)
    if square:
        sq = compose(rng, p["image"], p["palette"], p["framing"], (1080, 1080))
        draw_text(sq, text_items(p, 1080, 1080, credit, handle, cta)[0])
        Image.fromarray((np.clip(sq, 0, 1) * 255).astype(np.uint8)).save(str(stem) + "-square.jpg", quality=95)

    wav = Path(str(stem) + ".wav")
    make_score(wav, dur, rng, [])
    mp4 = Path(str(stem) + ".mp4")
    cmd = ["ffmpeg", "-y", "-loglevel", "error", "-loop", "1", "-framerate", "30", "-i", str(jpg), "-i", str(wav),
           "-t", f"{dur:.2f}", "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-tune", "stillimage",
           "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", str(mp4)]
    if subprocess.run(cmd).returncode != 0:
        raise RuntimeError("ffmpeg failed")
    wav.unlink()
    q = p["quote"]
    cap = f"{q['top']}\n{q['bottom']}\n\n\u2014 {q['author']}" + (f", {q['source']}" if q.get("source") else "")
    if cta:
        cap += f"\n\n{cta}"
    Path(str(stem) + ".txt").write_text(cap + "\n\n" + hashtags + "\n")
    return mp4, dur
