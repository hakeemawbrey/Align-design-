"""Render one Align Signs reel: text cards spoken straight to a zodiac sign, over
public-domain paintings from the catalogue, with a soft generated score.

  python3 render.py scorpio-dear-2                # out/scorpio-dear-2-s0.mp4 + .txt (caption, tags, credits)
  python3 render.py scorpio-dear-2 --seed 4       # same words, new pictures and music
  python3 render.py scorpio-dear-2 --stills       # a contact sheet of the cards, no video (fast)
  python3 render.py --sign leo --text "Leo, this is your sign." "Rest." "You did enough."

The look: square 1080x1080. Each card is one still: a painting (graded toward dusk,
darkened where the type sits) with the line on top and a quiet "come align · join the beta" below. Cards change with a hard cut, no transitions or motion.
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
import score
import scripts

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.join(HERE, "assets", "fonts")
Image.MAX_IMAGE_PIXELS = 400_000_000

W, H, FPS = 1080, 1080, 30
CREAM = (246, 238, 222)
GOLD = (233, 205, 150)


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
        f, size, lead, col = "EBGaramond-Italic.ttf", 104, 1.1, CREAM
    elif kind == "cta":
        f, size, lead, col = "EBGaramond-Italic.ttf", 96, 1.1, GOLD
    else:
        f, size, lead, col = "SofiaSansCondensed.ttf", 86, 1.14, CREAM
    n = len(card["text"].split())
    if n > 11:
        size = int(size * 0.86)
    F = font(f, size * ss)
    lines = wrap(card["text"], F, W * 0.80 * ss)
    lh = size * lead * ss
    sub = card.get("sub")
    SF = font("SofiaSansCondensed.ttf", 34 * ss)
    block_h = lh * len(lines) + (90 * ss if sub else 0)
    layer = Image.new("RGBA", (W * ss, H * ss), (0, 0, 0, 0))
    shadow = Image.new("L", (W * ss, H * ss), 0)
    d, ds = ImageDraw.Draw(layer), ImageDraw.Draw(shadow)
    cy = H * ss * 0.5
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
    """A quiet "come align · join the beta" at the bottom."""
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    dr = ImageDraw.Draw(im)
    # sign-off: quiet, small, spaced caps
    A = font("SofiaSansCondensed.ttf", 30)
    t, tr = "COME ALIGN \u00b7 JOIN THE BETA", 4
    x = (W - (sum(A.getlength(ch) + tr for ch in t) - tr)) / 2
    for ch in t:
        dr.text((x, H - 78), ch, font=A, fill=CREAM + (150,))
        x += A.getlength(ch) + tr
    # soft shadow under everything so it holds on bright skies
    m = im.getchannel("A").filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(12))
    sh = Image.new("RGBA", im.size, (6, 3, 14, 0))
    sh.putalpha(m.point(lambda v: int(v * 0.7)))
    return Image.alpha_composite(sh, im)


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
    mid = float(l[int(h * 0.32):int(h * 0.68)].mean())
    depth = float(np.clip(0.42 + (mid - 0.25) * 1.6, 0.42, 0.72))   # bright pictures get a deeper band
    band = 1 - depth * np.exp(-((y - 0.5) / 0.24) ** 2) - 0.15 * np.clip((0.14 - y) / 0.14, 0, 1) \
        - 0.4 * np.clip((y - 0.82) / 0.18, 0, 1)
    v = 1 - 0.55 * np.clip(np.sqrt((x - 0.5) ** 2 + ((y - 0.5) * 0.7) ** 2) / 0.6 - 0.3, 0, 1) ** 1.4
    a *= (band * v)[..., None]
    a = a * 0.96 + np.array([0.035, 0.02, 0.05], np.float32)  # lifted, violet blacks
    return Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8))


def prepared(item, rng):
    """Graded picture at frame size, cropped square around its focus."""
    im = ImageOps.exif_transpose(Image.open(catalog.local_file(item))).convert("RGB")
    S = 1.0
    tw, th = int(W * S), int(H * S)
    fx, fy = item.get("focus", (0.5, 0.42))
    scale = max(tw / im.width, th / im.height) * item.get("zoom", 1.0)
    im = im.resize((max(tw, round(im.width * scale)), max(th, round(im.height * scale))), Image.LANCZOS)
    x0 = int(min(max(fx * im.width - tw / 2, 0), im.width - tw))
    y0 = int(min(max(fy * im.height - th / 2, 0), im.height - th))
    im = im.crop((x0, y0, x0 + tw, y0 + th))
    return grade(im, item)


# ---------------------------------------------------------------- render

def plan(script, seed):
    cards = script["cards"]
    lens = [card_len(c) for c in cards]
    rng = np.random.default_rng([seed, zlib.crc32(script["id"].encode())])
    items = catalog.choose(script["moods"], script["sign"], len(cards), rng)
    return cards, lens, items


def render(script, seed=0, out=None, stills=False, silent=False, style=None):
    style = style or script.get("music") or score.pick(seed, script["id"])
    cards, lens, items = plan(script, seed)
    out = out or os.path.join(HERE, "out", f"{script['id']}-s{seed}")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    rng = np.random.default_rng(seed)
    pics = [prepared(it, rng) for it in items]
    texts = [text_block(c) for c in cards]
    starts = np.concatenate([[0], np.cumsum(lens)[:-1]])
    chrome = np.asarray(chrome_layer(script["sign"], 0, 0, 0), np.float32) / 255
    total = float(sum(lens))
    nfr = int(round(total * FPS))

    def still(i):
        """Card i as one frame: picture, text, sign label and wordmark. No motion, no fades."""
        img = np.asarray(pics[i], np.float32) / 255
        for arr in (texts[i][0], chrome):
            a = arr[..., 3:4]
            img = img * (1 - a) + arr[..., :3] * a
        return (np.clip(img, 0, 1) * 255).astype(np.uint8)
    frames = [still(i) for i in range(len(cards))]
    cuts = [int(round(st * FPS)) for st in starts]

    def frame(fi):
        i = max(0, int(np.searchsorted(cuts, fi, side="right") - 1))
        return frames[min(i, len(cards) - 1)]

    if stills:
        ims = [Image.fromarray(f).resize((360, 360), Image.LANCZOS) for f in frames]
        sheet = Image.new("RGB", (360 * len(ims) + 10 * (len(ims) - 1), 360), (0, 0, 0))
        for k, im in enumerate(ims):
            sheet.paste(im, (k * 370, 0))
        sheet.save(out + ".sheet.jpg", quality=88)
        return out + ".sheet.jpg"

    with tempfile.TemporaryDirectory() as td:
        wav = os.path.join(td, "m.wav")
        if not silent:
            x = score.compose(style, total + 0.5, seed=seed, salt=script["id"])
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
        Image.fromarray(frames[0]).save(out + ".cover.jpg", quality=90)
    write_caption(out + ".txt", script, items)
    json.dump({"id": script["id"], "seed": seed, "title": script["title"], "sign": script["sign"],
               "format": script["format"], "seconds": round(total, 1), "music": None if silent else style,
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
    ap.add_argument("--music", choices=score.ORDER, help="music style (default: picked per reel and seed)")
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
    print(render(s, a.seed, stills=a.stills, silent=a.silent, style=a.music))


if __name__ == "__main__":
    main()
