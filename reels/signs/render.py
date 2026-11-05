"""Render one Align Signs reel: text cards spoken straight to a zodiac sign, over
public-domain paintings from the catalogue, with a soft generated score.

  python3 render.py scorpio-dear-2                # out/scorpio-dear-2-s0.mp4 + .txt (caption, tags, credits)
  python3 render.py scorpio-dear-2 --seed 4       # same words, new pictures and music
  python3 render.py scorpio-dear-2 --stills       # a contact sheet of the cards, no video (fast)
  python3 render.py --sign leo --text "Leo, this is your sign." "Rest." "You did enough."

The look: a full-bleed painting (graded toward dusk, darkened where the type sits) pushing
in slowly, one card at a time. The sign's glyph and name sit up top, story-style
progress ticks under them, and a small "align" at the bottom. Cards fade up word-line by line.
The last card is always a call to action: send it, invite them, or come align.
"""
import argparse
import json
import math
import os
import subprocess
import tempfile
import zlib

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

import catalog
import music
import scripts

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.join(HERE, "assets", "fonts")
Image.MAX_IMAGE_PIXELS = 400_000_000

W, H, FPS = 1080, 1920, 30
CREAM = (246, 238, 222)
GOLD = (233, 205, 150)
XF = 0.45                                   # crossfade between cards, seconds


# ---------------------------------------------------------------- timing

def card_len(c):
    n = len(c["text"].split())
    if c["kind"] == "hook":
        return max(2.4, 1.2 + 0.30 * n)
    if c["kind"] == "cta":
        return 3.2
    return max(2.2, 1.0 + 0.30 * n)


# ---------------------------------------------------------------- type

def font(name, px):
    path = os.path.join(FONTS, name) if not name.startswith("DejaVu") else name
    return ImageFont.truetype(path, px)


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
    # balance: avoid a lonely last word
    if len(lines) > 1 and len(lines[-1].split()) == 1 and len(lines[-2].split()) > 2:
        a = lines[-2].split()
        lines[-2], lines[-1] = " ".join(a[:-1]), a[-1] + " " + lines[-1]
    return lines


def text_block(card, ss=2):
    """RGBA layer for one card, plus per-line boxes for the line-by-line fade."""
    kind = card["kind"]
    if kind == "hook":
        f, size, lead, col = "EBGaramond-Italic.ttf", 120, 1.1, CREAM
    elif kind == "cta":
        f, size, lead, col = "EBGaramond-Italic.ttf", 112, 1.1, GOLD
    else:
        f, size, lead, col = "SofiaSansCondensed.ttf", 100, 1.14, CREAM
    n = len(card["text"].split())
    if n > 11:
        size = int(size * 0.86)
    F = font(f, size * ss)
    lines = wrap(card["text"], F, W * 0.80 * ss)
    lh = size * lead * ss
    sub = card.get("sub")
    SF = font("SofiaSansCondensed.ttf", 40 * ss)
    block_h = lh * len(lines) + (90 * ss if sub else 0)
    layer = Image.new("RGBA", (W * ss, H * ss), (0, 0, 0, 0))
    shadow = Image.new("L", (W * ss, H * ss), 0)
    d, ds = ImageDraw.Draw(layer), ImageDraw.Draw(shadow)
    cy = H * ss * 0.52
    y0 = cy - block_h / 2
    rows = []
    for i, ln in enumerate(lines):
        y = y0 + i * lh
        x = (W * ss - F.getlength(ln)) / 2
        ds.text((x, y), ln, font=F, fill=255)
        d.text((x, y), ln, font=F, fill=col + (255,))
        rows.append((int(y / ss) - 10, int((y + lh) / ss) + 10))
    if sub:
        st = sub.upper()
        tr = 3 * ss  # letter spacing
        tw = sum(SF.getlength(ch) + tr for ch in st) - tr
        x, y = (W * ss - tw) / 2, y0 + lh * len(lines) + 34 * ss
        for ch in st:
            ds.text((x, y), ch, font=SF, fill=255)
            d.text((x, y), ch, font=SF, fill=CREAM + (215,))
            x += SF.getlength(ch) + tr
        rows.append((int(y / ss) - 10, int((y + 60 * ss) / ss)))
    shadow = shadow.filter(ImageFilter.GaussianBlur(14 * ss))
    sh = Image.new("RGBA", layer.size, (8, 4, 18, 0))
    sh.putalpha(shadow.point(lambda v: int(v * 0.85)))
    out = Image.alpha_composite(sh, layer).resize((W, H), Image.LANCZOS)
    return np.asarray(out, np.float32) / 255, rows


def chrome_layer(sign, n_cards, idx, prog):
    """Sign label, progress ticks, and the align wordmark. prog: 0-1 through card idx."""
    d = scripts.SIGNS[sign]
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    dr = ImageDraw.Draw(im)
    G = font("DejaVuSans.ttf", 50)
    L = font("SofiaSansCondensed.ttf", 44)
    label = d["name"].upper()
    tr = 7
    lw = sum(L.getlength(ch) + tr for ch in label) - tr
    gw = G.getlength(d["glyph"])
    total = gw + 22 + lw
    x = (W - total) / 2
    y = 196
    dr.text((x, y - 4), d["glyph"], font=G, fill=GOLD + (240,))
    x += gw + 22
    for ch in label:
        dr.text((x, y), ch, font=L, fill=CREAM + (235,))
        x += L.getlength(ch) + tr
    # story ticks
    gap, tw = 10, 70
    tx = (W - (n_cards * tw + (n_cards - 1) * gap)) / 2
    for i in range(n_cards):
        x0 = tx + i * (tw + gap)
        dr.rounded_rectangle([x0, 150, x0 + tw, 156], 3, fill=(255, 255, 255, 70))
        fill = 1 if i < idx else (prog if i == idx else 0)
        if fill > 0:
            dr.rounded_rectangle([x0, 150, x0 + tw * fill, 156], 3, fill=CREAM + (230,))
    # wordmark
    A = font("EBGaramond-Italic.ttf", 70)
    t = "align"
    dr.text(((W - A.getlength(t)) / 2, H - 250), t, font=A, fill=CREAM + (225,))
    # soft shadow under everything so it holds on bright skies
    m = im.getchannel("A").filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(12))
    sh = Image.new("RGBA", im.size, (6, 3, 14, 0))
    sh.putalpha(m.point(lambda v: int(v * 0.7)))
    return Image.alpha_composite(sh, im)


TY0, TY1 = 144, 162


def ticks(n_cards, idx, prog):
    im = Image.new("RGBA", (W, TY1 - TY0), (0, 0, 0, 0))
    dr = ImageDraw.Draw(im)
    gap, tw = 10, 70
    tx = (W - (n_cards * tw + (n_cards - 1) * gap)) / 2
    for i in range(n_cards):
        x0 = tx + i * (tw + gap)
        dr.rounded_rectangle([x0, 6, x0 + tw, 12], 3, fill=(255, 255, 255, 70))
        fill = 1 if i < idx else (prog if i == idx else 0)
        if fill > 0:
            dr.rounded_rectangle([x0, 6, x0 + max(tw * fill, 6), 12], 3, fill=CREAM + (230,))
    return np.asarray(im, np.float32) / 255


# ---------------------------------------------------------------- pictures

def grade(im, item=None):
    """Dusk grade: levels, a gentle rose-and-violet split tone, darker where the type sits,
    and a vignette. Keeps the painting's own colour (unlike Visions' moonlit blue)."""
    item = item or {}
    a = np.asarray(im, np.float32) / 255
    Wt = np.array([0.299, 0.587, 0.114], np.float32)
    l = a @ Wt
    lo, hi = np.percentile(l, [1, 99.5])
    a = np.clip((a - lo * 0.9) / max(hi - lo * 0.9, 0.2), 0, 1)
    med = float(np.median(a @ Wt))
    target = 0.34 * item.get("exposure", 1.0)
    a = a ** float(np.clip(math.log(target) / math.log(min(max(med, 0.03), 0.97)), 0.6, 2.2))
    l = a @ Wt
    # split tone: shadows toward violet, highlights toward warm rose-gold
    sh = np.array([0.20, 0.14, 0.32], np.float32)
    hl = np.array([1.0, 0.86, 0.74], np.float32)
    k = 0.22
    toned = (1 - l[..., None]) * sh + l[..., None] * hl
    a = a * (1 - k) + (a * toned * 1.25) * k
    # soft saturation lift
    l = a @ Wt
    a = l[..., None] + (a - l[..., None]) * 1.12
    h, w = l.shape
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    y /= h
    x /= w
    # darken the middle band where text sits, and top/bottom for the chrome
    l = a @ Wt
    mid = float(l[int(h * 0.36):int(h * 0.68)].mean())
    depth = float(np.clip(0.42 + (mid - 0.25) * 1.6, 0.42, 0.72))   # bright pictures get a deeper band
    band = 1 - depth * np.exp(-((y - 0.52) / 0.22) ** 2) - 0.35 * np.clip((0.14 - y) / 0.14, 0, 1) \
        - 0.4 * np.clip((y - 0.82) / 0.18, 0, 1)
    v = 1 - 0.55 * np.clip(np.sqrt((x - 0.5) ** 2 + ((y - 0.5) * 0.7) ** 2) / 0.6 - 0.3, 0, 1) ** 1.4
    a *= (band * v)[..., None]
    a = a * 0.96 + np.array([0.035, 0.02, 0.05], np.float32)  # lifted, violet blacks
    return Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8))


def prepared(item, rng):
    """Graded picture at 1.18x frame size, cropped to 9:16 around its focus, for the push-in."""
    im = ImageOps.exif_transpose(Image.open(catalog.local_file(item))).convert("RGB")
    S = 1.18
    tw, th = int(W * S), int(H * S)
    fx, fy = item.get("focus", (0.5, 0.42))
    scale = max(tw / im.width, th / im.height) * item.get("zoom", 1.0)
    im = im.resize((max(tw, round(im.width * scale)), max(th, round(im.height * scale))), Image.LANCZOS)
    x0 = int(min(max(fx * im.width - tw / 2, 0), im.width - tw))
    y0 = int(min(max(fy * im.height - th / 2, 0), im.height - th))
    im = im.crop((x0, y0, x0 + tw, y0 + th))
    return grade(im, item)


def kenburns(im, t, seed):
    """t 0-1 through the shot. Slow push in (or out), with a little drift."""
    r = np.random.default_rng(seed)
    z0, z1 = (1.0, 1.1) if r.random() < 0.75 else (1.1, 1.0)
    dx, dy = r.uniform(-0.03, 0.03, 2)
    e = t  # linear reads calmer than eased for long holds
    z = z0 + (z1 - z0) * e
    w, h = im.width / z, im.height / z
    cx = im.width / 2 + dx * im.width * (e - 0.5)
    cy = im.height / 2 + dy * im.height * (e - 0.5)
    cx = min(max(cx, w / 2), im.width - w / 2)
    cy = min(max(cy, h / 2), im.height - h / 2)
    box = (cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2)
    return np.asarray(im.resize((W, H), Image.BILINEAR, box=box), np.float32) / 255


# ---------------------------------------------------------------- render

def plan(script, seed):
    cards = script["cards"]
    lens = [card_len(c) for c in cards]
    rng = np.random.default_rng([seed, zlib.crc32(script["id"].encode())])
    items = catalog.choose(script["moods"], script["sign"], len(cards), rng)
    return cards, lens, items


def render(script, seed=0, out=None, stills=False, silent=False):
    cards, lens, items = plan(script, seed)
    out = out or os.path.join(HERE, "out", f"{script['id']}-s{seed}")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    rng = np.random.default_rng(seed)
    pics = [prepared(it, rng) for it in items]
    texts = [text_block(c) for c in cards]
    starts = np.concatenate([[0], np.cumsum(lens)[:-1]])
    full = np.asarray(chrome_layer(script["sign"], 0, 0, 0), np.float32) / 255
    chrome_static = [(y0, y1, full[y0:y1]) for y0, y1 in ((165, 290), (H - 275, H - 135))]
    total = float(sum(lens)) + 0.6
    nfr = int(total * FPS)

    def frame(fi):
        t = fi / FPS
        i = int(np.searchsorted(starts, t, side="right") - 1)
        i = max(0, min(i, len(cards) - 1))
        lt = t - starts[i]
        p = min(lt / lens[i], 1)
        span = lens[i] + XF
        base = kenburns(pics[i], min((lt + XF) / (span + XF), 1), seed * 100 + i)
        if i > 0 and lt < XF:                                    # crossfade from the last card
            prev = kenburns(pics[i - 1], 1.0, seed * 100 + i - 1)
            k = lt / XF
            k = k * k * (3 - 2 * k)
            base = prev * (1 - k) + base * k
        img = base

        def put(img, ti, alpha_rows):
            arr, rows = texts[ti]
            for (y0, y1), al in zip(rows, alpha_rows):
                y0, y1 = max(y0, 0), min(y1, H)
                if al <= 0 or y1 <= y0:
                    continue
                a = arr[y0:y1, :, 3:4] * al
                img[y0:y1] = img[y0:y1] * (1 - a) + arr[y0:y1, :, :3] * a
            return img
        if i > 0 and lt < XF * 0.8:
            img = put(img, i - 1, [1 - lt / (XF * 0.8)] * len(texts[i - 1][1]))
        rows = texts[i][1]
        al = [float(np.clip((lt - (0.25 + 0.22 * r)) / 0.45, 0, 1)) for r in range(len(rows))]
        if i == len(cards) - 1 and t > total - 0.5:
            al = [a * max(0, (total - t) / 0.5) for a in al]
        img = put(img, i, al)
        for y0, y1, arr in chrome_static:
            a = arr[..., 3:4]
            img[y0:y1] = img[y0:y1] * (1 - a) + arr[..., :3] * a
        tk = ticks(len(cards), i, p)
        a = tk[..., 3:4]
        img[TY0:TY1] = img[TY0:TY1] * (1 - a) + tk[..., :3] * a
        if t < 0.25:
            img *= t / 0.25 * 0.6 + 0.4
        return (np.clip(img, 0, 1) * 255).astype(np.uint8)

    if stills:
        mids = [int((s + l * 0.8) * FPS) for s, l in zip(starts, lens)]
        ims = [Image.fromarray(frame(f)).resize((360, 640), Image.LANCZOS) for f in mids]
        sheet = Image.new("RGB", (360 * len(ims) + 10 * (len(ims) - 1), 640), (0, 0, 0))
        for k, im in enumerate(ims):
            sheet.paste(im, (k * 370, 0))
        sheet.save(out + ".sheet.jpg", quality=88)
        return out + ".sheet.jpg"

    with tempfile.TemporaryDirectory() as td:
        wav = os.path.join(td, "m.wav")
        if not silent:
            x = music.compose(total + 0.5, seed=seed, theme="sign", sign=script["sign"], salt=script["id"], soft=True)
            n = int(total * music.SR)
            x = x[:, :n]
            fi, fo = int(0.6 * music.SR), int(1.4 * music.SR)
            x[:, :fi] *= np.linspace(0, 1, fi)
            x[:, -fo:] *= np.linspace(1, 0, fo)
            music.write_wav(wav, x)
            wav = music.master(wav)
        cmd = ["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
               "-r", str(FPS), "-i", "-"]
        cmd += [] if silent else ["-i", wav]
        cmd += ["-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p", "-movflags", "+faststart"]
        cmd += [] if silent else ["-c:a", "aac", "-b:a", "192k", "-shortest"]
        cmd += [out + ".mp4"]
        p = subprocess.Popen(cmd, stdin=subprocess.PIPE)
        for f in range(nfr):
            p.stdin.write(frame(f).tobytes())
        p.stdin.close()
        p.wait()
        Image.fromarray(frame(int((starts[0] + lens[0] * 0.85) * FPS))).save(out + ".cover.jpg", quality=90)
    write_caption(out + ".txt", script, items)
    json.dump({"id": script["id"], "seed": seed, "title": script["title"], "sign": script["sign"],
               "format": script["format"], "seconds": round(total, 1),
               "images": [it["id"] for it in items]}, open(out + ".json", "w"), indent=1)
    return out + ".mp4"


def write_caption(path, s, items):
    tags = " ".join("#" + t for t in s["hashtags"][:5])
    lines = [s["caption"], "", tags, "", "Art: " + "; ".join(catalog.credit(it) for it in items if catalog.needs_credit(it))]
    if lines[-1] == "Art: ":
        lines[-1] = "Art: public-domain paintings (no credit required)."
    lines += ["", "----- NOT FOR POSTING: image sources -----"]
    lines += [f"{it['id']}  {it.get('title', '')[:80]} · {it.get('creator', '')[:60]} · {it.get('license')} · {it.get('landing')}"
              for it in items]
    open(path, "w").write("\n".join(lines) + "\n")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("id", nargs="?")
    ap.add_argument("--seed", type=int, default=0)
    ap.add_argument("--stills", action="store_true")
    ap.add_argument("--silent", action="store_true")
    ap.add_argument("--sign")
    ap.add_argument("--text", nargs="+", help="custom cards: the first is the hook, the rest the body")
    a = ap.parse_args()
    if a.text:
        sign = a.sign or "scorpio"
        S = scripts.SIGNS[sign]["name"]
        s = {"id": f"{sign}-custom-{zlib.crc32(' '.join(a.text).encode()) % 10000}", "sign": sign, "format": "custom",
             "title": a.text[0], "moods": scripts.SIGNS[sign]["moods"] + ["moon"], "hashtags": ["zodiac", "astrology", "align", S.lower()],
             "caption": f"{a.text[0]}\n\nGet your full chart free in the Align app, link in bio.",
             "cards": [{"text": a.text[0], "kind": "hook"}] + [{"text": t, "kind": "body"} for t in a.text[1:]] +
                      [{"text": f"send this to your {S}", "kind": "cta", "sub": "find who you align with · link in bio"}]}
    else:
        s = scripts.build(a.id)
    print(render(s, a.seed, stills=a.stills, silent=a.silent))


if __name__ == "__main__":
    main()
