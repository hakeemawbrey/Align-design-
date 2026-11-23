"""Looks for Align Signs: how a card is laid out, set and coloured.

A look is a layout + a type pairing + a colour grade + a palette. Each reel keeps one look
for all its cards (so it reads as one piece), and a batch rotates through them, so a grid of
reels looks like a feed, not a template.

  python3 looks.py               # out/looks.jpg: every layout with a sample card

Layouts
  full      the painting full-bleed, a soft dark band, the line centred over it
  lower     full-bleed, a gradient at the bottom, the line set left in the lower third
  bar       the painting on top, a solid band of its own darkest colour below with the line
  paper     a cream sheet, the painting inset like a print, ink-dark type underneath
  polaroid  a tilted instant photo over a blurred copy of the painting, the line below
  split     the painting on the left half, a coloured panel with the line on the right
  card      a plain coloured card, big type, the painting as a small round medallion
  arch      the painting in an arched window on a dark ground, the line beneath
  duotone   the painting in two colours, the line in tall condensed capitals
"""
import math
import os
import zlib

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.join(HERE, "assets", "fonts")
W = H = 1080
SIGNOFF = "COME ALIGN · JOIN THE BETA"

# ---------------------------------------------------------------- type

# (file, variation) for display (hook / call to action) and body
PAIRINGS = {
    "garamond":  {"hook": ("EBGaramond-Italic.ttf", None), "body": ("SofiaSansCondensed.ttf", None), "scale": 1.0},
    "playfair":  {"hook": ("PlayfairDisplay-Italic.ttf", "Regular"), "body": ("PlayfairDisplay.ttf", "SemiBold"), "scale": 0.86},
    "cormorant": {"hook": ("CormorantGaramond-Italic.ttf", "Medium"), "body": ("CormorantGaramond.ttf", "Medium"), "scale": 1.06},
    "dmserif":   {"hook": ("DMSerifDisplay-Italic.ttf", None), "body": ("ArchivoNarrow.ttf", "Medium"), "scale": 0.9},
    "fraunces":  {"hook": ("Fraunces-Italic.ttf", "Regular"), "body": ("Fraunces.ttf", "Regular"), "scale": 0.86},
    "lora":      {"hook": ("Lora-Italic.ttf", "Medium"), "body": ("Lora.ttf", "Regular"), "scale": 0.86},
    "typewriter": {"hook": ("CourierPrime-Regular.ttf", None), "body": ("CourierPrime-Regular.ttf", None), "scale": 0.84},
    "hand":      {"hook": ("Caveat.ttf", "Bold"), "body": ("Caveat.ttf", "Regular"), "scale": 1.12},
    "bebas":     {"hook": ("BebasNeue-Regular.ttf", None), "body": ("BebasNeue-Regular.ttf", None), "scale": 1.1, "caps": True},
}

_fcache = {}


def font(spec, px):
    name, var = spec
    key = (name, var, int(px))
    if key not in _fcache:
        f = ImageFont.truetype(os.path.join(FONTS, name), int(px))
        if var:
            try:
                f.set_variation_by_name(var)
            except Exception:
                pass
        _fcache[key] = f
    return _fcache[key]


def wrap(text, f, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if f.getlength(t) <= max_w or not cur:
            cur = t
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    if len(lines) > 1 and len(lines[-1].split()) == 1 and len(lines[-2].split()) > 2:
        a = lines[-2].split()
        lines[-2], lines[-1] = " ".join(a[:-1]), a[-1] + " " + lines[-1]
    return lines


def set_text(canvas, box, text, spec, size, color, align="center", valign="middle", lead=1.12,
             shadow=None, caps=False, sub=None, sub_spec=("SofiaSansCondensed.ttf", None), sub_color=None):
    """Draw text into box (x0, y0, x1, y1) on an RGBA canvas, shrinking until it fits.
    shadow: RGB of a soft shadow, or None."""
    if caps:
        text = text.upper()
    x0, y0, x1, y1 = box
    bw, bh = x1 - x0, y1 - y0
    ss = 2
    while True:
        F = font(spec, size * ss)
        lines = wrap(text, F, bw * ss)
        lh = size * lead
        sub_h = 70 if sub else 0
        th = lh * len(lines) + sub_h
        if (th <= bh and max(F.getlength(l) for l in lines) <= bw * ss) or size < 30:
            break
        size *= 0.93
    layer = Image.new("RGBA", (bw * ss, bh * ss), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    top = {"top": 0, "middle": (bh - th) / 2, "bottom": bh - th}[valign]
    for i, ln in enumerate(lines):
        lw = F.getlength(ln)
        x = {"center": (bw * ss - lw) / 2, "left": 0, "right": bw * ss - lw}[align]
        d.text((x, (top + i * lh) * ss), ln, font=F, fill=tuple(color) + (255,))
    if sub:
        SF = font(sub_spec, 30 * ss)
        st, tr = sub.upper(), 3 * ss
        tw = sum(SF.getlength(ch) + tr for ch in st) - tr
        x = {"center": (bw * ss - tw) / 2, "left": 0, "right": bw * ss - tw}[align]
        y = (top + lh * len(lines) + 26) * ss
        for ch in st:
            d.text((x, y), ch, font=SF, fill=tuple(sub_color or color) + (210,))
            x += SF.getlength(ch) + tr
    layer = layer.resize((bw, bh), Image.LANCZOS)
    if shadow is not None:
        m = layer.getchannel("A").filter(ImageFilter.GaussianBlur(12))
        sh = Image.new("RGBA", layer.size, tuple(shadow) + (0,))
        sh.putalpha(m.point(lambda v: int(min(255, v * 1.1))))
        canvas.alpha_composite(sh, (x0, y0))
    canvas.alpha_composite(layer, (x0, y0))


def signoff(canvas, y, color, alpha=150, center=W / 2, shadow=None):
    A = font(("SofiaSansCondensed.ttf", None), 28)
    tr = 4
    tw = sum(A.getlength(ch) + tr for ch in SIGNOFF) - tr
    layer = Image.new("RGBA", (W, 60), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    x = center - tw / 2
    for ch in SIGNOFF:
        d.text((x, 10), ch, font=A, fill=tuple(color) + (alpha,))
        x += A.getlength(ch) + tr
    if shadow is not None:
        m = layer.getchannel("A").filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.GaussianBlur(10))
        sh = Image.new("RGBA", layer.size, tuple(shadow) + (0,))
        sh.putalpha(m.point(lambda v: int(v * 0.8)))
        canvas.alpha_composite(sh, (0, int(y)))
    canvas.alpha_composite(layer, (0, int(y)))


# ---------------------------------------------------------------- colour

LUM = np.array([0.299, 0.587, 0.114], np.float32)


def _levels(a, target):
    l = a @ LUM
    lo, hi = np.percentile(l, [1, 99.5])
    a = np.clip((a - lo * 0.9) / max(hi - lo * 0.9, 0.2), 0, 1)
    med = float(np.median(a @ LUM))
    return a ** float(np.clip(math.log(target) / math.log(min(max(med, 0.03), 0.97)), 0.55, 2.2))


def grade(im, kind, rng, duo=None):
    """kind: dusk | film | noir | cool | natural | sepia | duotone"""
    a = np.asarray(im, np.float32) / 255
    if kind == "dusk":
        a = _levels(a, 0.36)
        l = a @ LUM
        toned = (1 - l[..., None]) * np.array([0.20, 0.14, 0.32]) + l[..., None] * np.array([1.0, 0.86, 0.74])
        a = a * 0.78 + a * toned * 1.25 * 0.22
        l = a @ LUM
        a = l[..., None] + (a - l[..., None]) * 1.12
    elif kind == "film":
        a = _levels(a, 0.42)
        a = a * np.array([1.04, 1.0, 0.9]) + np.array([0.02, 0.015, 0.0])
        a = 0.06 + a * 0.9                                   # faded blacks
        l = a @ LUM
        a = l[..., None] + (a - l[..., None]) * 0.88
        a += rng.normal(0, 0.025, a.shape[:2])[..., None]     # grain
    elif kind == "noir":
        a = _levels(a, 0.36)
        l = a @ LUM
        l = np.clip(l + 0.35 * l * (1 - l) * (2 * l - 1), 0, 1)
        a = l[..., None] * np.array([1.0, 0.96, 0.9]) + 0.02
        a += rng.normal(0, 0.02, a.shape[:2])[..., None]
    elif kind == "cool":
        a = _levels(a, 0.36)
        l = a @ LUM
        toned = (1 - l[..., None]) * np.array([0.10, 0.2, 0.3]) + l[..., None] * np.array([0.95, 0.98, 1.0])
        a = a * 0.72 + a * toned * 1.3 * 0.28
    elif kind == "natural":
        a = _levels(a, 0.42)
        l = a @ LUM
        a = l[..., None] + (a - l[..., None]) * 1.18
    elif kind == "sepia":
        a = _levels(a, 0.42)
        l = a @ LUM
        a = l[..., None] * np.array([1.07, 0.94, 0.76]) + 0.03
        a += rng.normal(0, 0.018, a.shape[:2])[..., None]
    elif kind == "duotone":
        a = _levels(a, 0.45)
        l = (a @ LUM)[..., None]
        lo, hi = np.array(duo[0]) / 255, np.array(duo[1]) / 255
        a = lo * (1 - l) + hi * l
    return Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8))


def crop(im, w, h, focus=(0.5, 0.42), zoom=1.0):
    fx, fy = focus
    scale = max(w / im.width, h / im.height) * zoom
    im = im.resize((max(w, round(im.width * scale)), max(h, round(im.height * scale))), Image.LANCZOS)
    x0 = int(min(max(fx * im.width - w / 2, 0), im.width - w))
    y0 = int(min(max(fy * im.height - h / 2, 0), im.height - h))
    return im.crop((x0, y0, x0 + w, y0 + h))


def deep_colour(im):
    """A deep, rich colour from the picture for bands and panels."""
    a = np.asarray(im.resize((64, 64)), np.float32) / 255
    l = a @ LUM
    sel = a[(l > np.percentile(l, 8)) & (l < np.percentile(l, 40))]
    c = np.median(sel, 0) if len(sel) else np.array([0.1, 0.08, 0.12])
    hsv_l = float(c @ LUM)
    c = c * (0.16 / max(hsv_l, 0.02))                         # pull to a deep value
    m = c.mean()
    c = m + (c - m) * 1.35
    return tuple(int(v) for v in np.clip(c * 255, 12, 120))


def darken(img, amount, region="mid"):
    a = np.asarray(img, np.float32) / 255
    h, w = a.shape[:2]
    y = np.linspace(0, 1, h, dtype=np.float32)[:, None]
    x = np.linspace(0, 1, w, dtype=np.float32)[None, :]
    l = a @ LUM
    if region == "mid":
        mid = float(l[int(h * 0.3):int(h * 0.7)].mean())
        depth = float(np.clip(amount + (mid - 0.25) * 1.6, amount, 0.75))
        band = 1 - depth * np.exp(-((y - 0.5) / 0.25) ** 2) - 0.4 * np.clip((y - 0.85) / 0.15, 0, 1)
    elif region == "low":
        low = float(l[int(h * 0.55):].mean())
        depth = float(np.clip(amount + (low - 0.25) * 1.4, amount, 0.85))
        band = 1 - depth * np.clip((y - 0.38) / 0.45, 0, 1) ** 1.3 + 0 * x
    else:
        band = np.ones((h, 1), np.float32) * (1 - amount)
    v = 1 - 0.5 * np.clip(np.sqrt((x - 0.5) ** 2 + ((y - 0.5) * 0.7) ** 2) / 0.6 - 0.3, 0, 1) ** 1.4
    a *= (band * v)[..., None]
    return Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8))


def paper(w, h, base, rng, grain=0.03):
    a = np.ones((h, w, 3), np.float32) * np.array(base, np.float32) / 255
    n = rng.normal(0, grain, (h // 4 + 1, w // 4 + 1)).astype(np.float32)
    n = np.asarray(Image.fromarray(((n + 0.5) * 255).clip(0, 255).astype(np.uint8)).resize((w, h), Image.BICUBIC),
                   np.float32) / 255 - 0.5
    a = a + n[..., None] * 0.5 + rng.normal(0, grain * 0.5, (h, w))[..., None]
    return Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8))


# ---------------------------------------------------------------- looks

CREAM, GOLD, INK = (246, 238, 222), (233, 205, 150), (38, 30, 44)
ACCENTS_DARK = [(233, 205, 150), (240, 190, 180), (200, 222, 200), (205, 215, 240), (246, 238, 222)]
PAPERS = [((241, 233, 218), (38, 30, 44), (138, 58, 58)), ((236, 231, 224), (30, 34, 48), (70, 90, 130)),
          ((244, 236, 226), (52, 34, 30), (150, 90, 40)), ((232, 226, 214), (36, 40, 34), (84, 110, 74))]
CARDS = [(25, 22, 38), (40, 24, 32), (20, 34, 38), (34, 30, 24), (241, 233, 218), (225, 214, 236), (220, 232, 226)]
DUOS = [((30, 18, 50), (250, 205, 160)), ((10, 30, 46), (180, 230, 220)), ((48, 14, 24), (250, 200, 190)),
        ((26, 26, 26), (240, 230, 200)), ((22, 30, 70), (240, 180, 210))]

LAYOUTS = ["full", "lower", "bar", "paper", "polaroid", "split", "card", "arch", "duotone"]
# which type pairings and grades suit each layout
FIT = {
    "full":     (["garamond", "playfair", "cormorant", "fraunces", "lora", "dmserif"], ["dusk", "film", "cool", "natural", "noir"]),
    "lower":    (["playfair", "fraunces", "dmserif", "lora", "garamond", "bebas"], ["dusk", "film", "natural", "cool"]),
    "bar":      (["dmserif", "playfair", "fraunces", "lora", "garamond", "typewriter"], ["natural", "film", "dusk", "sepia"]),
    "paper":    (["cormorant", "lora", "typewriter", "playfair", "hand", "garamond"], ["natural", "sepia", "film", "noir"]),
    "polaroid": (["hand", "typewriter", "lora", "fraunces"], ["film", "natural", "sepia"]),
    "split":    (["playfair", "dmserif", "fraunces", "cormorant", "bebas", "lora"], ["natural", "film", "dusk", "noir"]),
    "card":     (["playfair", "cormorant", "fraunces", "dmserif", "typewriter", "hand"], ["natural", "film", "dusk"]),
    "arch":     (["cormorant", "garamond", "playfair", "lora"], ["dusk", "natural", "film", "cool"]),
    "duotone":  (["bebas", "dmserif", "playfair"], ["duotone"]),
}


def arch_mask(w, h):
    m = Image.new("L", (w * 2, h * 2), 0)
    d = ImageDraw.Draw(m)
    d.ellipse([0, 0, w * 2 - 1, w * 2 - 1], fill=255)
    d.rectangle([0, w, w * 2 - 1, h * 2 - 1], fill=255)
    return m.resize((w, h), Image.LANCZOS)


def pick(seed, salt, layout=None):
    """A look for one reel, stable for (reel, seed)."""
    rng = np.random.default_rng([seed, zlib.crc32(f"look:{salt}".encode())])
    layout = layout or LAYOUTS[int(rng.integers(len(LAYOUTS)))]
    pairs, grades = FIT[layout]
    return {"layout": layout, "type": pairs[int(rng.integers(len(pairs)))], "grade": grades[int(rng.integers(len(grades)))],
            "accent": ACCENTS_DARK[int(rng.integers(len(ACCENTS_DARK)))], "paper": PAPERS[int(rng.integers(len(PAPERS)))],
            "card": CARDS[int(rng.integers(len(CARDS)))], "duo": DUOS[int(rng.integers(len(DUOS)))],
            "tilt": float(rng.uniform(-4, 4)), "side": int(rng.integers(2)), "seed": int(rng.integers(1 << 30))}


def _sizes(look, kind, n_words):
    P = PAIRINGS[look["type"]]
    base = {"hook": 108, "cta": 96, "body": 90}[kind] * P["scale"]
    if n_words > 11:
        base *= 0.88
    return base


def _spec(look, kind):
    P = PAIRINGS[look["type"]]
    return P["hook"] if kind in ("hook", "cta") else P["body"]


def compose(look, im, card, rng):
    """One card as an RGB 1080x1080 image. im: the source picture (PIL RGB, uncropped);
    card: {"text", "kind", "sub"?}; focus/zoom come from im.info."""
    L, kind, text = look["layout"], card["kind"], card["text"]
    focus, zoom = im.info.get("focus", (0.5, 0.42)), im.info.get("zoom", 1.0)
    P = PAIRINGS[look["type"]]
    caps = P.get("caps", False)
    size = _sizes(look, kind, len(text.split()))
    spec = _spec(look, kind)
    sub = card.get("sub")
    acc = look["accent"]
    g = lambda pic: grade(pic, look["grade"], rng, look["duo"])   # noqa: E731

    if L in ("full", "duotone"):
        pic = g(crop(im, W, H, focus, zoom))
        pic = darken(pic, 0.45 if L == "full" else 0.3, "mid")
        cv = pic.convert("RGBA")
        col = acc if kind == "cta" else CREAM
        if L == "duotone":
            col = look["duo"][1] if kind != "cta" else CREAM
            size *= 1.15
        set_text(cv, (110, 200, W - 110, H - 200), text, spec, size, col, shadow=(8, 4, 18), caps=caps or L == "duotone",
                 sub=sub, sub_color=CREAM)
        signoff(cv, H - 92, CREAM, 140, shadow=(6, 3, 14))

    elif L == "lower":
        pic = darken(g(crop(im, W, H, focus, zoom)), 0.7, "low")
        cv = pic.convert("RGBA")
        col = acc if kind == "cta" else CREAM
        set_text(cv, (90, int(H * 0.5), W - 120, H - 140), text, spec, size * 0.95, col, align="left", valign="bottom",
                 shadow=(8, 4, 18), caps=caps, sub=sub, sub_color=CREAM)
        signoff(cv, H - 92, CREAM, 130, center=90 + 245)

    elif L == "bar":
        ph = 640
        pic = g(crop(im, W, ph, focus, zoom))
        band = deep_colour(pic)
        cv = Image.new("RGBA", (W, H), band + (255,))
        cv.paste(pic, (0, 0))
        col = acc if kind == "cta" else CREAM
        set_text(cv, (80, ph + 40, W - 80, H - 110), text, spec, size * 0.92, col, caps=caps, sub=sub, sub_color=CREAM)
        signoff(cv, H - 80, CREAM, 120)

    elif L == "paper":
        bg, ink, accent = look["paper"]
        cv = paper(W, H, bg, rng).convert("RGBA")
        pw, ph = 800, 520
        pic = g(crop(im, pw, ph, focus, zoom))
        x, y = (W - pw) // 2, 90
        sh = Image.new("RGBA", (pw + 40, ph + 40), (0, 0, 0, 0))
        ImageDraw.Draw(sh).rectangle([20, 24, pw + 20, ph + 24], fill=(40, 30, 20, 90))
        cv.alpha_composite(sh.filter(ImageFilter.GaussianBlur(12)), (x - 20, y - 20))
        cv.paste(pic, (x, y))
        ImageDraw.Draw(cv).rectangle([x - 1, y - 1, x + pw, y + ph], outline=ink + (60,), width=2)
        col = accent if kind == "cta" else ink
        set_text(cv, (110, y + ph + 50, W - 110, H - 110), text, spec, size * 0.92, col, caps=caps, sub=sub, sub_color=ink)
        signoff(cv, H - 82, ink, 120)

    elif L == "polaroid":
        bgpic = g(crop(im, W, H, focus, zoom)).filter(ImageFilter.GaussianBlur(28))
        cv = darken(bgpic, 0.55, "flat").convert("RGBA")
        pw = 560
        frame = Image.new("RGBA", (pw + 48, pw + 120), (246, 243, 236, 255))
        frame.paste(g(crop(im, pw, pw, focus, zoom)), (24, 24))
        frame = frame.rotate(look["tilt"], resample=Image.BICUBIC, expand=True)
        shadow = Image.new("RGBA", frame.size, (0, 0, 0, 0))
        shadow.putalpha(frame.getchannel("A").point(lambda v: int(v * 0.55)))
        shadow = shadow.filter(ImageFilter.GaussianBlur(18))
        fx, fy = (W - frame.width) // 2, 40
        cv.alpha_composite(shadow, (fx + 8, fy + 16))
        cv.alpha_composite(frame, (fx, fy))
        col = acc if kind == "cta" else CREAM
        set_text(cv, (100, fy + frame.height + 14, W - 100, H - 100), text, spec, size * 0.9, col, shadow=(8, 4, 18),
                 caps=caps, sub=sub, sub_color=CREAM)
        signoff(cv, H - 82, CREAM, 130)

    elif L == "split":
        left = look["side"] == 0
        pic = g(crop(im, W // 2, H, focus, zoom))
        panel = deep_colour(pic)
        cv = Image.new("RGBA", (W, H), panel + (255,))
        cv.paste(pic, (0 if left else W // 2, 0))
        tx0 = W // 2 + 60 if left else 60
        col = acc if kind == "cta" else CREAM
        set_text(cv, (tx0, 140, tx0 + W // 2 - 120, H - 150), text, spec, size * 0.9, col, align="left", caps=caps,
                 sub=sub, sub_color=CREAM)
        signoff(cv, H - 82, CREAM, 120, center=(W * 3 // 4) if left else (W // 4))

    elif L == "card":
        bg = look["card"]
        light = sum(bg) > 500
        ink = (38, 30, 44) if light else CREAM
        cv = (paper(W, H, bg, rng, 0.02) if light else Image.new("RGB", (W, H), bg)).convert("RGBA")
        d = 300
        med = g(crop(im, d, d, focus, zoom)).convert("RGBA")
        mask = Image.new("L", (d * 2, d * 2), 0)
        ImageDraw.Draw(mask).ellipse([0, 0, d * 2 - 1, d * 2 - 1], fill=255)
        med.putalpha(mask.resize((d, d), Image.LANCZOS))
        cv.alpha_composite(med, ((W - d) // 2, 110))
        col = ((138, 58, 58) if light else acc) if kind == "cta" else ink
        set_text(cv, (110, 450, W - 110, H - 130), text, spec, size * 0.95, col, caps=caps, sub=sub, sub_color=ink)
        signoff(cv, H - 86, ink, 120)

    elif L == "arch":
        bgc = (18, 14, 26)
        cv = Image.new("RGBA", (W, H), bgc + (255,))
        aw, ah = 560, 620
        pic = g(crop(im, aw, ah, focus, zoom)).convert("RGBA")
        pic.putalpha(arch_mask(aw, ah))
        x, y = (W - aw) // 2, 60
        cv.alpha_composite(pic, (x, y))
        ring = arch_mask(aw + 14, ah + 14)
        ring.paste(0, (7, 7), arch_mask(aw, ah))
        ring = ring.point(lambda v: v // 2)
        cv.alpha_composite(Image.merge("RGBA", (*Image.new("RGB", ring.size, acc).split(), ring)), (x - 7, y - 7))
        col = acc if kind == "cta" else CREAM
        set_text(cv, (100, y + ah + 30, W - 100, H - 110), text, spec, size * 0.9, col, caps=caps, sub=sub, sub_color=CREAM)
        signoff(cv, H - 82, CREAM, 120)

    return cv.convert("RGB")


if __name__ == "__main__":
    import catalog
    rng = np.random.default_rng(1)
    items = catalog.choose(["couple", "moon", "garden"], "pisces", len(LAYOUTS), rng)
    tiles = []
    for i, L in enumerate(LAYOUTS):
        it = items[i]
        im = Image.open(catalog.local_file(it)).convert("RGB")
        im.info["focus"] = tuple(it.get("focus", (0.5, 0.42)))
        lk = pick(i, "demo", L)
        card = {"text": "You don't have to earn rest. You just have to let it in.", "kind": "body"}
        t = compose(lk, im, card, rng).resize((360, 360), Image.LANCZOS)
        ImageDraw.Draw(t).text((8, 6), f"{L} · {lk['type']} · {lk['grade']}", fill=(255, 80, 80))
        tiles.append(t)
    sheet = Image.new("RGB", (370 * 3, 370 * 3), (0, 0, 0))
    for i, t in enumerate(tiles):
        sheet.paste(t, ((i % 3) * 370, (i // 3) * 370))
    os.makedirs(os.path.join(HERE, "out"), exist_ok=True)
    sheet.save(os.path.join(HERE, "out", "looks.jpg"), quality=88)
    print(os.path.join(HERE, "out", "looks.jpg"))
