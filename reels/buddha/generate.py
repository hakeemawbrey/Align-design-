#!/usr/bin/env python3
"""Buddha quote reels, generated forever.

Two styles:
  painted (default)  a real Buddha sculpture photo (library/ + images/), recoloured
                     in neon tones over a painted sky, oil-paint texture, bold white
                     captions: setup line on top, punchline at the bottom.
  neon               a Buddha drawn in glowing neon lines with a serif quote.

    python3 reels/buddha/fetch_images.py            # once: download free Buddha photos
    python3 reels/buddha/generate.py                # one video
    python3 reels/buddha/generate.py --count 20     # twenty
    python3 reels/buddha/generate.py --forever      # until Ctrl-C
    python3 reels/buddha/generate.py --style neon   # the line-art style (or: mix)
    python3 reels/buddha/generate.py --stills 12    # contact sheet, no video

Needs Python 3 with Pillow + numpy, and ffmpeg on the PATH.
"""

import argparse
import json
import math
import os
import random
import subprocess
import sys
import time
import wave
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

sys.path.insert(0, str(Path(__file__).resolve().parent))
import painted  # noqa: E402

HERE = Path(__file__).resolve().parent
W, H, FPS = 1080, 1920, 30
FONT_SERIF = HERE / "fonts" / "CormorantGaramond.ttf"
FONT_CAPS = HERE / "fonts" / "Cinzel.ttf"

# ---------------------------------------------------------------- palettes --
# figure, halo, bg top, bg bottom, accent (hook + author)
PALETTES = {
    "violet-cyan":  ((190, 110, 255), (60, 230, 255), (12, 4, 30), (2, 1, 10), (120, 235, 255)),
    "magenta-gold": ((255, 70, 200), (255, 196, 80), (26, 3, 22), (6, 1, 8), (255, 210, 120)),
    "cyan-blue":    ((70, 240, 255), (70, 120, 255), (2, 14, 30), (0, 2, 10), (140, 245, 255)),
    "gold-ember":   ((255, 200, 90), (255, 110, 40), (26, 10, 2), (6, 2, 0), (255, 214, 140)),
    "rose-violet":  ((255, 120, 190), (160, 90, 255), (24, 4, 26), (5, 1, 10), (255, 170, 220)),
    "jade-teal":    ((90, 255, 170), (40, 200, 220), (2, 22, 18), (0, 6, 6), (150, 255, 210)),
    "sunset":       ((255, 140, 70), (255, 60, 150), (28, 6, 14), (6, 1, 6), (255, 190, 130)),
    "moonlight":    ((215, 230, 255), (120, 170, 255), (6, 10, 26), (1, 2, 8), (200, 220, 255)),
}
POSES = ["seated", "seated", "head", "bust"]
HALOS = ["ring", "rays", "mandala", "flower", "moon", "chakra"]
BASES = ["lotus", "water", "none"]
HOOKS = {
    "any": ["Read this slowly", "A reminder for your soul", "If this found you, it's for you",
            "Today's message", "Save this for later", "Breathe. Then read.", "Let this sink in"],
    "love": ["On love", "For the one who loves deeply", "Send this to your person"],
    "align": ["Come back to yourself", "Align with this", "For your next chapter"],
    "spiritual": ["Ancient wisdom", "For your spirit", "Words to sit with"],
    "buddha": ["The Buddha said", "Words of the Buddha"],
}
HASHTAGS = "#buddha #wisdom #quotes #spirituality #mindfulness #love #alignment #neon #meditation #philosophy"


# ------------------------------------------------------------------ helpers --
def font(path, size, weight=None):
    try:
        f = ImageFont.truetype(str(path), size)
        if weight:
            try:
                f.set_variation_by_name(weight)
            except Exception:
                pass
        return f
    except Exception:
        for fb in ["/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf", "/Library/Fonts/Georgia.ttf",
                   "C:/Windows/Fonts/georgia.ttf"]:
            if os.path.exists(fb):
                return ImageFont.truetype(fb, size)
        return ImageFont.load_default()


def catmull(points, steps=14, closed=False):
    """Smooth a list of points into a dense polyline."""
    p = list(points)
    if len(p) < 3:
        return p
    if closed:
        p = [p[-1]] + p + [p[0], p[1]]
    else:
        p = [p[0]] + p + [p[-1]]
    out = []
    for i in range(1, len(p) - 2):
        p0, p1, p2, p3 = p[i - 1], p[i], p[i + 1], p[i + 2]
        for s in range(steps):
            t = s / steps
            t2, t3 = t * t, t * t * t
            out.append(tuple(0.5 * ((2 * p1[k]) + (-p0[k] + p2[k]) * t +
                                    (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 +
                                    (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3) for k in range(2)))
    out.append(p[-2])
    return out


def mirror(stroke):
    return [(1000 - x, y) for x, y in stroke]


def ellipse_pts(cx, cy, rx, ry, a0=0, a1=360, n=72):
    return [(cx + rx * math.cos(math.radians(a0 + (a1 - a0) * i / n)),
             cy + ry * math.sin(math.radians(a0 + (a1 - a0) * i / n))) for i in range(n + 1)]


def screen_into(canvas, layer, x, y):
    h, w = layer.shape[:2]
    x0, y0 = max(0, x), max(0, y)
    x1, y1 = min(W, x + w), min(H, y + h)
    if x1 <= x0 or y1 <= y0:
        return
    region = canvas[y0:y1, x0:x1]
    src = layer[y0 - y:y1 - y, x0 - x:x1 - x]
    region += src - region * src


def neon_from_mask(mask, color, core=0.85, glow=1.0):
    """L mask (PIL) -> float RGB neon layer: white-hot core, coloured bloom."""
    c = np.array(color, np.float32) / 255.0
    m = np.asarray(mask, np.float32) / 255.0
    b1 = np.asarray(mask.filter(ImageFilter.GaussianBlur(4)), np.float32) / 255.0
    b2 = np.asarray(mask.filter(ImageFilter.GaussianBlur(14)), np.float32) / 255.0
    b3 = np.asarray(mask.filter(ImageFilter.GaussianBlur(40)), np.float32) / 255.0
    bloom = (b1 * 1.4 + b2 * 1.6 + b3 * 1.3) * glow
    hot = np.clip(m * core, 0, 1)[..., None]
    col = c[None, None, :] * np.clip(bloom + m * 0.9, 0, 1.4)[..., None]
    out = col * (1 - hot) + (c * 0.35 + 0.65)[None, None, :] * hot
    return np.clip(out, 0, 1).astype(np.float32)


# ------------------------------------------------------------- the figures --
def head_strokes(curls=False):
    s = []
    s.append(catmull([(440, 262), (444, 214), (470, 186), (500, 180), (530, 186), (556, 214), (560, 262)]))  # crown
    s.append(catmull([(442, 278), (452, 318), (476, 342), (500, 348), (524, 342), (548, 318), (558, 278)]))  # jaw
    s.append(catmull([(472, 194), (476, 162), (500, 148), (524, 162), (528, 194)]))  # ushnisha
    ear = catmull([(440, 236), (424, 246), (420, 290), (424, 330), (436, 342), (444, 318), (442, 286)])
    s += [ear, mirror(ear)]
    s.append(catmull([(447, 232), (472, 222), (500, 219), (528, 222), (553, 232)]))  # hairline
    brow = catmull([(454, 252), (470, 245), (490, 250)])
    eye = catmull([(460, 268), (474, 275), (489, 269)])
    s += [brow, mirror(brow), eye, mirror(eye)]
    s.append(catmull([(498, 254), (495, 290), (500, 298), (508, 295)]))  # nose
    s.append(catmull([(484, 316), (500, 322), (516, 316)]))  # lips
    s.append(catmull([(492, 330), (500, 332), (508, 330)]))
    dots = [(500, 238, 3.5)]
    if curls:
        for row, y in enumerate(range(194, 222, 9)):
            for x in range(450, 551, 10):
                xx = x + (5 if row % 2 else 0)
                if ((xx - 500) / 62) ** 2 + ((y - 262) / 80) ** 2 < 1 and xx < 552:
                    dots.append((xx, y, 2.6))
        for y in range(160, 192, 9):
            for x in range(482, 520, 10):
                if ((x - 500) / 26) ** 2 + ((y - 176) / 28) ** 2 < 1:
                    dots.append((x, y, 2.6))
    return s, dots


def seated_strokes():
    s, dots = head_strokes()
    s.append(catmull([(478, 346), (476, 374)]))
    s.append(catmull([(522, 346), (524, 374)]))
    s.append(catmull([(482, 362), (500, 367), (518, 362)]))
    arm = catmull([(476, 374), (420, 386), (364, 410), (336, 452), (320, 520), (302, 590), (316, 632),
                   (378, 656), (440, 668)])
    s += [arm, mirror(arm)]
    under = catmull([(372, 470), (370, 560), (396, 632)])
    s += [under, mirror(under)]
    s.append(catmull([(442, 664), (468, 680), (500, 684), (532, 680), (558, 664)]))  # hands
    s.append(catmull([(452, 662), (470, 640), (500, 632), (530, 640), (548, 662)]))
    s.append(catmull([(474, 650), (500, 642), (526, 650)]))  # thumbs
    s.append(catmull([(424, 388), (470, 444), (540, 500), (628, 520)]))  # robe drape
    s.append(catmull([(452, 480), (500, 498), (548, 480)]))
    leg = catmull([(316, 632), (230, 682), (190, 728), (206, 774), (320, 798), (500, 808)])
    s += [leg, mirror(leg)]
    thigh = catmull([(232, 716), (330, 694), (430, 690)])
    s += [thigh, mirror(thigh)]
    foot = catmull([(300, 712), (330, 690), (382, 690), (396, 704), (360, 712)])
    s += [foot, mirror(foot)]
    s.append(catmull([(262, 762), (380, 778), (500, 774), (620, 778), (738, 762)]))  # robe fold
    return s, dots


def lotus_strokes():
    s = []
    for row, (y, hmul, wpet, off) in enumerate([(826, 1.0, 120, 0), (846, 0.75, 130, 65)]):
        for i in range(-4, 5):
            cx = 500 + i * (wpet * 0.78) + off * (1 if row else 0) - (off if row else 0) / 2
            if abs(cx - 500) > 430:
                continue
            h = (92 - abs(i) * 10) * hmul
            s.append(catmull([(cx - wpet / 2, y), (cx - wpet / 4, y - h * 0.6), (cx, y - h),
                              (cx + wpet / 4, y - h * 0.6), (cx + wpet / 2, y)], steps=10))
    s.append(catmull([(120, 846), (300, 880), (500, 888), (700, 880), (880, 846)]))
    return s


def water_strokes():
    s = []
    for k, y in enumerate([850, 880, 912, 948]):
        span = 380 - k * 40
        pts = [(500 - span + i * span / 8, y + 4 * math.sin(i * 1.7 + k)) for i in range(17)]
        s.append(catmull(pts, steps=6))
    return s


def draw_strokes(size, strokes, dots, xf, width):
    """Rasterise unit-space strokes into an L mask using transform xf=(ox, oy, scale)."""
    ox, oy, sc = xf
    img = Image.new("L", size, 0)
    d = ImageDraw.Draw(img)
    for st in strokes:
        pts = [(ox + x * sc, oy + y * sc) for x, y in st]
        d.line(pts, fill=255, width=width, joint="curve")
        for (x, y) in (pts[0], pts[-1]):
            r = width / 2
            d.ellipse((x - r, y - r, x + r, y + r), fill=255)
    for x, y, r in dots:
        X, Y, R = ox + x * sc, oy + y * sc, max(1.5, r * sc)
        d.ellipse((X - R, Y - R, X + R, Y + R), fill=255)
    return img


def halo_mask(kind, size, cx, cy, r, width):
    img = Image.new("L", size, 0)
    d = ImageDraw.Draw(img)

    def circ(rr, w=width, fill=None):
        d.ellipse((cx - rr, cy - rr, cx + rr, cy + rr), outline=255, width=w, fill=fill)

    if kind == "ring":
        circ(r)
        circ(r * 1.18, max(2, width // 2))
        circ(r * 1.42, max(2, width // 3))
    elif kind == "rays":
        circ(r * 0.72)
        for i in range(36):
            a = math.tau * i / 36
            r0, r1 = r * 0.82, r * (1.35 if i % 2 else 1.12)
            d.line((cx + r0 * math.cos(a), cy + r0 * math.sin(a), cx + r1 * math.cos(a), cy + r1 * math.sin(a)),
                   fill=255, width=max(2, width // 2))
    elif kind == "mandala":
        circ(r * 0.62)
        circ(r * 1.3, max(2, width // 2))
        n = 16
        for i in range(n):
            a = math.tau * i / n
            pts = []
            for t in np.linspace(-1, 1, 24):
                rr = r * (0.66 + 0.56 * (1 - t * t))
                aa = a + t * (math.pi / n)
                pts.append((cx + rr * math.cos(aa), cy + rr * math.sin(aa)))
            d.line(pts, fill=255, width=max(2, width // 2), joint="curve")
            dx, dy = cx + r * 1.3 * math.cos(a + math.pi / n), cy + r * 1.3 * math.sin(a + math.pi / n)
            d.ellipse((dx - 5, dy - 5, dx + 5, dy + 5), fill=255)
    elif kind == "flower":
        rr = r * 0.5
        circ(rr, max(2, width // 2))
        for i in range(6):
            a = math.tau * i / 6
            x, y = cx + rr * math.cos(a), cy + rr * math.sin(a)
            d.ellipse((x - rr, y - rr, x + rr, y + rr), outline=255, width=max(2, width // 2))
        circ(rr * 2, width)
    elif kind == "moon":
        circ(r * 1.25, max(2, width // 2))
    return img


# ------------------------------------------------------------------ scenes --
def build_scene(rng, palette, pose, halo, base, user_image=None):
    """Returns dict with float layers: bg, halo (+ rotating flag), figure."""
    fig_c, halo_c, top, bot, accent = PALETTES[palette]
    yy = np.linspace(0, 1, H, dtype=np.float32)[:, None, None]
    bg = (np.array(top, np.float32) * (1 - yy) + np.array(bot, np.float32) * yy) / 255.0
    bg = np.repeat(bg, W, axis=1)
    # soft nebula and stars
    neb = Image.new("L", (W // 4, H // 4), 0)
    nd = ImageDraw.Draw(neb)
    for _ in range(7):
        x, y, r = rng.uniform(0, W / 4), rng.uniform(0, H / 4), rng.uniform(40, 110)
        nd.ellipse((x - r, y - r, x + r, y + r), fill=int(rng.uniform(20, 55)))
    neb = np.asarray(neb.filter(ImageFilter.GaussianBlur(40)).resize((W, H), Image.BILINEAR), np.float32) / 255.0
    bg += neb[..., None] * (np.array(halo_c, np.float32) / 255.0) * 0.35
    for _ in range(260):
        x, y = rng.randrange(W), rng.randrange(H)
        b = rng.uniform(0.15, 0.7)
        bg[y, x] += b
        if rng.random() < 0.15 and 0 < x < W - 1 and 0 < y < H - 1:
            bg[y - 1:y + 2, x] += b * 0.4
            bg[y, x - 1:x + 2] += b * 0.4
    bg = np.clip(bg, 0, 1)

    full = (W, H)
    fig_mask = None
    if user_image is not None:
        fig_layer, head_c, r_halo = user_image_layer(user_image, fig_c)
    else:
        if pose == "seated":
            sc, ox, oy = 0.92, W / 2 - 500 * 0.92, 380
            strokes, dots = seated_strokes()
            head_c, r_halo = (W / 2, oy + 262 * sc), 150
        elif pose == "bust":
            sc = 1.75
            ox, oy = W / 2 - 500 * sc, 300
            strokes, dots = seated_strokes()
            head_c, r_halo = (W / 2, oy + 262 * sc), 250
        else:  # head close-up
            sc = 3.4
            ox, oy = W / 2 - 500 * sc, 470 - 150 * sc
            strokes, dots = head_strokes(curls=True)
            head_c, r_halo = (W / 2, oy + 250 * sc), 380
        if base != "none" and pose == "seated":
            strokes = strokes + (lotus_strokes() if base == "lotus" else water_strokes())
        width = max(4, int(5 * (sc ** 0.5)))
        fig_mask = draw_strokes(full, strokes, dots, (ox, oy, sc), width)
        if pose == "bust":  # fade out below the waist
            fade = np.clip((np.arange(H) - 1000) / 260.0, 0, 1)[:, None]
            m = np.asarray(fig_mask, np.float32) * (1 - fade)
            fig_mask = Image.fromarray(m.astype(np.uint8))
        fig_layer = neon_from_mask(fig_mask, fig_c)
        if pose == "seated" and halo == "chakra":
            fig_layer = add_chakras(fig_layer, ox, oy, sc)

    # halo / aura
    hx, hy = head_c
    rotating = halo in ("rays", "mandala", "flower")
    hsize = int(r_halo * 3.2)
    if halo == "chakra":
        hk = "ring"
    else:
        hk = halo
    hm = halo_mask(hk, (hsize, hsize), hsize / 2, hsize / 2, r_halo, 5)
    halo_layer = neon_from_mask(hm, halo_c, core=0.6, glow=0.8) * 0.85
    if halo == "moon":
        disc = Image.new("L", (hsize, hsize), 0)
        rr = r_halo * 1.2
        ImageDraw.Draw(disc).ellipse((hsize / 2 - rr, hsize / 2 - rr, hsize / 2 + rr, hsize / 2 + rr), fill=70)
        disc = np.asarray(disc.filter(ImageFilter.GaussianBlur(18)), np.float32)[..., None] / 255.0
        halo_layer = np.clip(halo_layer + disc * (np.array(halo_c, np.float32) / 255.0) * 0.8, 0, 1)
    # a big soft aura behind the whole figure
    aura = Image.new("L", (W // 4, H // 4), 0)
    ar = r_halo * 1.6 / 4
    ImageDraw.Draw(aura).ellipse((hx / 4 - ar, hy / 4 - ar * 0.8, hx / 4 + ar, hy / 4 + ar * 2.2), fill=60)
    aura = np.asarray(aura.filter(ImageFilter.GaussianBlur(30)).resize((W, H), Image.BILINEAR), np.float32) / 255.0
    bg = np.clip(bg + aura[..., None] * (np.array(fig_c, np.float32) / 255.0) * 0.5, 0, 1)

    return dict(bg=bg, fig=fig_layer, halo=halo_layer, halo_pos=(int(hx - hsize / 2), int(hy - hsize / 2)),
                rotating=rotating, accent=accent, fig_c=fig_c, halo_c=halo_c)


def add_chakras(layer, ox, oy, sc):
    colors = [(255, 40, 60), (255, 130, 30), (255, 230, 40), (60, 255, 120), (60, 170, 255), (110, 80, 255),
              (220, 110, 255)]
    ys = [740, 690, 600, 520, 365, 240, 165]
    m = Image.new("RGB", (W, H), 0)
    d = ImageDraw.Draw(m)
    for c, y in zip(colors, ys):
        X, Y, R = ox + 500 * sc, oy + y * sc, 9
        d.ellipse((X - R, Y - R, X + R, Y + R), fill=c)
    glow = np.asarray(m.filter(ImageFilter.GaussianBlur(10)), np.float32) / 255.0 * 2.5
    core = np.asarray(m, np.float32) / 255.0
    return np.clip(layer + glow + core, 0, 1)


def user_image_layer(path, color):
    """Fit a user picture into the figure area. Dark (neon) art is kept as-is, photos are traced."""
    im = Image.open(path).convert("RGB")
    im = ImageOps.contain(im, (960, 900))
    canvas = Image.new("RGB", (W, H), 0)
    x, y = (W - im.width) // 2, 1220 - im.height
    y = max(300, y)
    gray = np.asarray(im.convert("L"), np.float32)
    if gray.mean() < 70:  # already dark / neon: keep colours, vignette edges
        a = np.asarray(im, np.float32) / 255.0
        yy, xx = np.mgrid[0:im.height, 0:im.width]
        v = np.clip(1.4 - np.hypot((xx - im.width / 2) / (im.width / 2), (yy - im.height / 2) / (im.height / 2)), 0, 1)
        canvas.paste(Image.fromarray((a * v[..., None] * 255).astype(np.uint8)), (x, y))
        layer = np.asarray(canvas, np.float32) / 255.0
    else:  # photo -> neon line tracing
        e = im.convert("L").filter(ImageFilter.GaussianBlur(2)).filter(ImageFilter.FIND_EDGES)
        e = ImageOps.autocontrast(e, cutoff=2).point(lambda v: 255 if v > 90 else 0)
        mask = Image.new("L", (W, H), 0)
        mask.paste(e.filter(ImageFilter.MaxFilter(3)), (x, y))
        layer = neon_from_mask(mask, color)
    return layer, (W / 2, y + im.height * 0.3), max(160, im.width * 0.32)


# -------------------------------------------------------------------- text --
def wrap(text, f, maxw):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if f.getlength(t) <= maxw or not cur:
            cur = t
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def text_sprite(text, f, color, glow_color, spacing=0):
    """Render text -> (rgb float, alpha float) with a soft glow."""
    if spacing:
        wdt = int(sum(f.getlength(c) + spacing for c in text)) + 40
    else:
        wdt = int(f.getlength(text)) + 40
    asc, desc = f.getmetrics()
    hgt = asc + desc + 40
    pad = 30
    m = Image.new("L", (wdt + pad * 2, hgt + pad * 2), 0)
    d = ImageDraw.Draw(m)
    if spacing:
        x = pad + 20
        for c in text:
            d.text((x, pad + 20), c, font=f, fill=255)
            x += f.getlength(c) + spacing
    else:
        d.text((pad + 20, pad + 20), text, font=f, fill=255)
    a = np.asarray(m, np.float32) / 255.0
    g = np.asarray(m.filter(ImageFilter.GaussianBlur(12)), np.float32) / 255.0
    alpha = np.clip(a + g * 0.55, 0, 1)
    gc = np.array(glow_color, np.float32) / 255.0
    cc = np.array(color, np.float32) / 255.0
    rgb = (cc[None, None] * a[..., None] + gc[None, None] * (g[..., None] * 0.55)) / np.maximum(alpha[..., None], 1e-4)
    return np.clip(rgb, 0, 1), alpha


def layout_text(quote, accent, layout, hook):
    """Returns list of text items: dict(rgb, alpha, x, y, t0, dur)."""
    items = []
    q = "\u201c" + quote["text"].replace('"', "\u2033").replace("'", "\u2019") + "\u201d"
    box_w = 900
    size = 80
    while True:
        f = font(FONT_SERIF, size, "Medium")
        lines = wrap(q, f, box_w)
        lh = int(size * 1.18)
        if len(lines) * lh <= (430 if layout == "bottom" else 520) or size <= 46:
            break
        size -= 4
    block_h = len(lines) * lh
    y0 = max(1250, 1440 - block_h // 2) if layout == "bottom" else 360
    y0 = min(y0, 1700 - block_h)
    t = 1.3
    for i, ln in enumerate(lines):
        rgb, a = text_sprite(ln, f, (255, 250, 245), accent)
        x = (W - a.shape[1]) // 2
        n = len(ln.split())
        items.append(dict(rgb=rgb, alpha=a, x=x, y=y0 + i * lh - 50, t0=t, dur=0.7))
        t += max(0.75, n * 0.27)
    fa = font(FONT_CAPS, 38, "Bold")
    rgb, a = text_sprite("\u2014  " + quote["author"].upper() + "  \u2014", fa, accent, accent, spacing=4)
    items.append(dict(rgb=rgb, alpha=a, x=(W - a.shape[1]) // 2, y=y0 + block_h + 10, t0=t + 0.3, dur=0.8))
    if quote.get("source"):
        fs = font(FONT_SERIF, 30, "Regular")
        rgb, a = text_sprite(quote["source"], fs, (210, 205, 220), accent)
        items.append(dict(rgb=rgb, alpha=a * 0.8, x=(W - a.shape[1]) // 2, y=y0 + block_h + 62, t0=t + 0.6, dur=0.8))
    reveal_end = t + 0.6
    fh = font(FONT_CAPS, 40, "Regular")
    rgb, a = text_sprite(hook.upper(), fh, accent, accent, spacing=6)
    hy = 170 if layout == "bottom" else 1700
    items.append(dict(rgb=rgb, alpha=a, x=(W - a.shape[1]) // 2, y=hy, t0=0.4, dur=0.8, float=True))
    return items, reveal_end


def composite_text(canvas, it, k, dy=0):
    a = it["alpha"] * k
    h, w = a.shape
    x, y = it["x"], it["y"] + dy
    x0, y0, x1, y1 = max(0, x), max(0, y), min(W, x + w), min(H, y + h)
    if x1 <= x0 or y1 <= y0:
        return
    aa = a[y0 - y:y1 - y, x0 - x:x1 - x, None]
    canvas[y0:y1, x0:x1] = canvas[y0:y1, x0:x1] * (1 - aa) + it["rgb"][y0 - y:y1 - y, x0 - x:x1 - x] * aa


def ease(x):
    x = min(1.0, max(0.0, x))
    return x * x * (3 - 2 * x)


# ------------------------------------------------------------------- audio --
def make_score(path, dur, rng, line_times):
    sr = 44100
    n = int(sr * dur)
    t = np.arange(n) / sr
    roots = [110.0, 116.54, 123.47, 130.81, 138.59, 146.83, 98.0, 103.83]
    f0 = rng.choice(roots)
    chord = rng.choice([[1, 1.5, 2, 2.5198], [1, 1.5, 2, 2.3784], [1, 1.3348, 2, 3], [1, 1.5, 1.7818, 2.6697]])
    pad = np.zeros(n)
    for i, r in enumerate(chord):
        for det in (-0.6, 0.6):
            lfo = 0.6 + 0.4 * np.sin(2 * np.pi * (0.05 + 0.03 * i) * t + rng.uniform(0, 6))
            pad += np.sin(2 * np.pi * (f0 * r + det) * t + rng.uniform(0, 6)) * lfo / (1 + i * 0.6)
    pad /= np.max(np.abs(pad)) + 1e-9
    noise = np.random.default_rng(rng.randrange(1 << 30)).standard_normal(n)
    k = 400
    air = np.convolve(noise, np.ones(k) / k, mode="same")
    air = air / (np.max(np.abs(air)) + 1e-9) * (0.5 + 0.5 * np.sin(2 * np.pi * 0.07 * t))

    def bowl(start, base, amp):
        out = np.zeros(n)
        s = int(start * sr)
        if s >= n:
            return out
        tt = t[: n - s]
        for p, a, dk in [(1, 1, 0.35), (2.71, 0.5, 0.6), (5.1, 0.25, 1.1), (8.2, 0.12, 1.8)]:
            beat = 1 + 0.15 * np.sin(2 * np.pi * 2.2 * tt)
            out[s:] += a * np.sin(2 * np.pi * base * p * tt) * np.exp(-tt * dk) * beat
        return out * amp

    sig = pad * 0.32 + air * 0.06
    sig += bowl(0.05, f0 * 2, 0.38)
    for lt in line_times[1::2]:
        sig += bowl(lt, f0 * 4 * rng.choice([1, 1.5, 1.3348]), 0.08)
    env = np.minimum(1, t / 1.2) * np.minimum(1, (dur - t) / 1.0)
    sig *= env
    sig /= np.max(np.abs(sig)) + 1e-9
    sig *= 0.8
    left = sig
    right = np.roll(sig, int(sr * 0.012))
    st = (np.stack([left, right], 1) * 32767).astype(np.int16)
    with wave.open(str(path), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(sr)
        w.writeframes(st.tobytes())


# -------------------------------------------------------------- the render --
def plan(rng, quotes, history, images, theme=None, style="neon", library=()):
    used = set(history.get("quotes", []))
    pool = [q for q in quotes if (theme is None or q["theme"] == theme)]
    fresh = [q for q in pool if q["text"] not in used]
    if not fresh:  # every quote used: start a new cycle (visuals keep changing)
        history["quotes"] = [u for u in history.get("quotes", []) if u not in {q["text"] for q in pool}]
        fresh = pool
    quote = rng.choice(fresh)
    if style == "painted":
        look = painted.plan_look(rng, history, library)
        return dict(style="painted", quote=quote, **look)
    combos = set(history.get("combos", []))
    for _ in range(50):
        pose = rng.choice(POSES)
        halo = rng.choice(HALOS if pose == "seated" else [h for h in HALOS if h != "chakra"])
        base = rng.choice(BASES) if pose == "seated" else "none"
        palette = rng.choice(list(PALETTES))
        layout = "top" if pose == "seated" and base == "none" and rng.random() < 0.35 else "bottom"
        key = f"{pose}/{halo}/{base}/{palette}"
        if key not in combos:
            break
    user_image = None
    if images and rng.random() < 0.4:
        user_image = rng.choice(images)
        layout = "bottom"
    hooks = HOOKS["any"] + HOOKS[quote["theme"]] + (HOOKS["buddha"] if quote["author"] == "The Buddha" else [])
    return dict(style="neon", quote=quote, pose=pose, halo=halo, base=base, palette=palette, layout=layout,
                hook=rng.choice(hooks), user_image=user_image, key=key)


def render(p, out_dir, rng, stills_only=False):
    sc = build_scene(rng, p["palette"], p["pose"], p["halo"], p["base"], p["user_image"])
    if p["layout"] == "bottom":  # darken behind the quote so it always reads
        g = np.clip((np.arange(H) - 1080) / 260.0, 0, 1)[:, None, None] * 0.8
        sc["bg"] *= (1 - g)
        sc["fig"] = sc["fig"] * (1 - g * 0.85)
    else:
        g = np.clip((760 - np.arange(H)) / 350.0, 0, 1)[:, None, None] * 0.6
        sc["bg"] *= (1 - g)
    items, reveal_end = layout_text(p["quote"], sc["accent"], p["layout"], p["hook"])
    dur = float(min(24, max(9, reveal_end + 3.8 + len(p["quote"]["text"].split()) * 0.06)))
    nframes = int(dur * FPS)

    halo_img = Image.fromarray((sc["halo"] * 255).astype(np.uint8))
    hx, hy = sc["halo_pos"]
    parts = [dict(x=rng.uniform(0, W), y=rng.uniform(0, H), v=rng.uniform(15, 55), r=rng.uniform(0.4, 1.0),
                  ph=rng.uniform(0, 6.28)) for _ in range(70)]
    spr = np.exp(-((np.mgrid[-8:9, -8:9] ** 2).sum(0)) / 10.0).astype(np.float32)
    pcol = np.array(sc["halo_c"], np.float32) / 255.0
    flick = [rng.random() < 0.55 for _ in range(12)]

    def frame(i):
        t = i / FPS
        c = sc["bg"].copy()
        # halo: fades in, breathes, rotates slowly
        hk = ease((t - 0.3) / 1.4) * (0.85 + 0.15 * math.sin(t * 1.3))
        if hk > 0:
            himg = halo_img.rotate(t * 4.0, resample=Image.BILINEAR) if sc["rotating"] else halo_img
            screen_into(c, np.asarray(himg, np.float32) * (hk / 255.0), hx, hy)
        # figure: neon flicker on, then gentle pulse + float
        if t < 0.9:
            fk = 1.0 if flick[int(t / 0.075) % 12] else 0.15
            fk *= ease(t / 0.9) * 0.6 + 0.4 if fk > 0.5 else 1
        else:
            fk = 0.9 + 0.1 * math.sin(t * 2.1)
        dy = int(round(6 * math.sin(t * 0.8)))
        screen_into(c, sc["fig"] * fk, 0, dy)
        # rising particles
        for pt in parts:
            y = (pt["y"] - pt["v"] * t) % H
            x = pt["x"] + 10 * math.sin(t * 0.7 + pt["ph"])
            b = pt["r"] * (0.5 + 0.5 * math.sin(t * 2 + pt["ph"])) * 0.6 * ease(t / 1.5)
            xi, yi = int(x) - 8, int(y) - 8
            if 0 <= xi < W - 17 and 0 <= yi < H - 17:
                c[yi:yi + 17, xi:xi + 17] += spr[..., None] * pcol * b
        np.clip(c, 0, 1, out=c)
        # text
        for it in items:
            k = ease((t - it["t0"]) / it["dur"])
            if k > 0:
                rise = int((1 - k) * 24)
                composite_text(c, it, k, rise + (int(3 * math.sin(t * 1.6)) if it.get("float") else 0))
        # fade out at the end
        fo = ease((dur - t) / 0.6)
        if fo < 1:
            c *= fo
        return (c * 255).astype(np.uint8)

    stem = out_dir / time.strftime("buddha-%Y%m%d-%H%M%S")
    if stills_only:
        return frame(int(min(nframes - 1, (reveal_end + 1.5) * FPS))), stem

    wav = Path(str(stem) + ".wav")
    make_score(wav, dur, rng, [it["t0"] for it in items])
    mp4 = Path(str(stem) + ".mp4")
    cmd = ["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
           "-r", str(FPS), "-i", "-", "-i", str(wav), "-c:v", "libx264", "-preset", "medium", "-crf", "19",
           "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", str(mp4)]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    for i in range(nframes):
        proc.stdin.write(frame(i).tobytes())
    proc.stdin.close()
    if proc.wait() != 0:
        raise RuntimeError("ffmpeg failed")
    wav.unlink()
    q = p["quote"]
    cap = f"\u201c{q['text']}\u201d\n\u2014 {q['author']}" + (f", {q['source']}" if q.get("source") else "")
    Path(str(stem) + ".txt").write_text(cap + "\n\n" + HASHTAGS + "\n")
    return mp4, dur


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--count", type=int, default=1, help="how many videos to make")
    ap.add_argument("--forever", action="store_true", help="keep making videos until Ctrl-C")
    ap.add_argument("--theme", choices=["love", "align", "spiritual"], help="only quotes of this theme")
    ap.add_argument("--stills", type=int, default=0, help="make a contact sheet of N looks instead of videos")
    ap.add_argument("--out", default=str(HERE / "out"), help="output folder")
    ap.add_argument("--seed", type=int, help="random seed (repeatable output)")
    ap.add_argument("--style", choices=["painted", "neon", "mix"], default="painted", help="look (default painted)")
    ap.add_argument("--square", action="store_true", help="painted: also save a 1080x1080 picture post")
    ap.add_argument("--handle", help="painted: a small @handle watermark, e.g. @yourpage")
    ap.add_argument("--no-credit", action="store_true", help="painted: leave the author's name off the video")
    ap.add_argument("--cta", default="come align \u00b7 join the beta",
                    help="painted: the small line near the bottom (default: come align · join the beta)")
    ap.add_argument("--no-cta", action="store_true", help="painted: leave the small bottom line off")
    a = ap.parse_args()

    if not a.stills and subprocess.run(["which", "ffmpeg"], capture_output=True).returncode != 0:
        sys.exit("ffmpeg not found: install it (brew install ffmpeg / apt install ffmpeg)")
    out = Path(a.out)
    out.mkdir(parents=True, exist_ok=True)
    quotes = json.loads((HERE / "quotes.json").read_text())
    for q in quotes:
        q["text"] = q["top"].rstrip(" ,") + (", " if q["top"][-1] not in ".?!:" else " ") + q["bottom"] + \
            ("" if q["bottom"][-1] in ".?!\"" else ".")
    exts = (".png", ".jpg", ".jpeg", ".webp")
    images = sorted(p for p in (HERE / "images").glob("*") if p.suffix.lower() in exts)
    library = sorted(p for p in (HERE / "library").glob("*") if p.suffix.lower() in exts) + images
    if a.style != "neon" and not library:
        sys.exit("no Buddha photos yet: run  python3 reels/buddha/fetch_images.py  first "
                 "(or put your own in reels/buddha/images/, or use --style neon)")
    hist_path = out / "history.json"
    history = json.loads(hist_path.read_text()) if hist_path.exists() else {"quotes": [], "combos": []}
    rng = random.Random(a.seed)

    def pick():
        st = a.style if a.style != "mix" else rng.choice(["painted", "painted", "neon"])
        return plan(rng, quotes, history, images, a.theme, st, library)

    def make(p, stills_only=False):
        if p["style"] == "painted":
            return painted.render(p, out, rng, make_score, HASHTAGS, stills_only, not a.no_credit, a.handle, a.square,
                                 None if a.no_cta else a.cta)
        return render(p, out, rng, stills_only)

    if a.stills:
        thumbs = []
        for _ in range(a.stills):
            p = pick()
            history.setdefault("quotes", []).append(p["quote"]["text"])
            if p["style"] == "painted":
                history.setdefault("images", []).append(p["image"].name)
            img, _ = make(p, stills_only=True)
            thumbs.append(Image.fromarray(img).resize((270, 480)))
            print(f"  {p['key']:40s} {p['quote']['author']}")
        cols = min(6, len(thumbs))
        rows = math.ceil(len(thumbs) / cols)
        sheet = Image.new("RGB", (cols * 270, rows * 480))
        for i, th in enumerate(thumbs):
            sheet.paste(th, ((i % cols) * 270, (i // cols) * 480))
        path = out / "stills.jpg"
        sheet.save(path, quality=90)
        print(f"contact sheet -> {path}")
        return

    made = 0
    try:
        while a.forever or made < a.count:
            p = pick()
            t0 = time.time()
            mp4, dur = make(p)
            history.setdefault("quotes", []).append(p["quote"]["text"])
            if p["style"] == "painted":
                history.setdefault("images", []).append(p["image"].name)
            history.setdefault("combos", []).append(p["key"])
            hist_path.write_text(json.dumps(history, indent=1))
            made += 1
            src = p["key"] if p["style"] == "painted" or not p["user_image"] else p["user_image"].name
            print(f"[{made}] {mp4.name}  {dur:.1f}s  {src}  \u2014 {p['quote']['author']}  ({time.time() - t0:.0f}s)")
            time.sleep(1.05)  # unique timestamped filenames
    except KeyboardInterrupt:
        print(f"\nstopped after {made} video(s)")


if __name__ == "__main__":
    main()
