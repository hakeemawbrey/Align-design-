"""Render one Align Visions reel.

  python3 render.py love-07              # one line from lines.json, seed 0
  python3 render.py love-07 --seed 12    # same words, new pictures, order and music
  python3 render.py --text "Say it plain." --moods moon lovers
  python3 render.py love-07 --preview    # half size, fast

The format follows the @zenllov reference: a square picture window between black
bars, a hard cut every quarter second through dark, moonlit, painterly images,
one statement held in white condensed type, then the Align wordmark.
"""
import argparse
import json
import math
import os
import re
import subprocess
import tempfile
import zlib

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

import music
import sources

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.join(HERE, "assets", "fonts")
Image.MAX_IMAGE_PIXELS = 400_000_000

FPS = 24
BPM = 120
CUT = 60 / BPM / 2            # an eighth note: 0.25s, 6 frames, as in the reference
BAR = 60 / BPM * 4            # 2s

STYLE = {
    "window_y": 0.21875,      # top of the square picture window (ref: 280 of 1280)
    "text_size": 0.0861,      # font px / frame width (ref: 62px at 720)
    "text_lead": 1.10,        # line height / font size (ref line pitch 68.3px at 720 = 1.10 x 62)
    "text_wrap": 0.80,        # max line width / frame width (ref's longest line is 0.74)
    "text_stroke": 0.0042,    # black outline / frame width
    "text_y": 0.5,            # block centre / frame height
    "word_size": 0.23,       # wordmark font px / frame width
    "word_stroke": 0.011,
    # 'come align', the quiet sign-off on every frame (Align's wordmark face, app cream)
    "tag_text": "come align",
    "tag_size": 0.046,        # font px / frame width
    "tag_y": 0.752,           # centre / frame height: low in the picture window (window ends 0.781)
    "tag_alpha": 0.62,
    "tag_alpha_end": 0.9,     # a little brighter under the wordmark
    "end": 1.5,               # seconds of wordmark at the end
    # the grade (see grade()): exposure targets measured off the reference frames
    "median": 0.22,           # median luminance after levels
    "tone": 0.40,             # pull toward the moonlit blue ramp
    "saturation": 2.8,
    "vib_cap": 0.9,           # chroma above which the saturation boost fades out
    "black_lift": 0.05,
    "lift_tint": [1.0, 0.8, 1.3],  # ref shadows are violet-neutral (13,12,18), not navy
    "contrast": 0.35,
    "bloom": 0.30,
    "hold": 0.5,              # how much bright, coloured light keeps its own colour
    "knee": 0.25,             # highlight shoulder: ref p90 luminance 0.53, p99 0.87
    "knee_slope": 0.4,
    "white": 0.95,
    "guard": 0.35,            # pull highlights down behind the statement (0 = off)
    "local": 0.35,            # local contrast (large-radius unsharp on luminance)
    "chroma_cap": 0.62,       # max chroma after the boost
    "warm_cap": 0.30,         # max chroma for reds/oranges before the boost
    "vignette": 0.32,
}

# moonlight ramp: luminance -> colour (deep indigo shadows, blue mids, cold white highs)
RAMP = np.array([
    [0.00, 0.055, 0.045, 0.080],
    [0.18, 0.075, 0.120, 0.260],
    [0.40, 0.160, 0.330, 0.600],
    [0.70, 0.500, 0.690, 0.930],
    [1.00, 0.880, 0.970, 1.000],
], np.float32)


def load_lines():
    return json.load(open(os.path.join(HERE, "lines.json")))


def load_pool(name):
    p = os.path.join(HERE, "pool", f"{name}.json")
    return json.load(open(p))["images"] if os.path.exists(p) else []


def ensure_file(item):
    p = os.path.join(HERE, item["file"])
    if not os.path.exists(p):
        os.makedirs(os.path.dirname(p), exist_ok=True)
        if not sources.download(item, p):
            raise OSError(f"could not fetch {item.get('id')}")
    return p


# ---------------------------------------------------------------- the grade

def ramp(l):
    out = np.empty(l.shape + (3,), np.float32)
    for c in range(3):
        out[..., c] = np.interp(l, RAMP[:, 0], RAMP[:, c + 1])
    return out


def soft(x, radius):
    """Wide blur of a float map: down-sample, blur, up-sample (fast, smooth enough)."""
    h, w = x.shape
    k = max(1, int(radius / 2))
    small = Image.fromarray((np.clip(x, 0, 1) * 65535).astype(np.uint16)).convert("I").resize(
        (max(1, w // k), max(1, h // k)), Image.BOX)
    sm = np.asarray(small, np.float32) / 65535
    sm = np.asarray(Image.fromarray((sm * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2)), np.float32) / 255 \
        if min(sm.shape) > 6 else sm
    return np.asarray(Image.fromarray(sm, "F").resize((w, h), Image.BILINEAR), np.float32)


def fit_square(im, S, focus=(0.5, 0.5), zoom=1.0):
    im = ImageOps.exif_transpose(im).convert("RGB")
    side = min(im.size) / zoom
    fx, fy = focus[0] * im.width, focus[1] * im.height
    x0 = min(max(fx - side / 2, 0), im.width - side)
    y0 = min(max(fy - side / 2, 0), im.height - side)
    return im.resize((S, S), Image.LANCZOS, box=(x0, y0, x0 + side, y0 + side))


def grade(im, S, item=None):
    """Turn an old painting or photo into the reference's look: night-blue, saturated,
    mid-dark with bright light sources, lifted blue blacks and a bloom on highlights.
    Per image: "tone" (0-1) overrides how much of the blue ramp it gets, "exposure"
    nudges brightness (e.g. 1.15 or 0.85)."""
    item = item or {}
    im = fit_square(im, S, tuple(item.get("focus", (0.5, 0.5))), item.get("zoom", 1.0))
    a = np.asarray(im, np.float32) / 255
    W = np.array([0.299, 0.587, 0.114], np.float32)
    l = a @ W
    day = float(np.median(l))  # bright daylight pictures need pushing further into night
    lo, hi = np.percentile(l, [1.5, 99.3])
    bp = lo * (0.85 + 0.15 * np.clip((0.55 - (hi - lo)) / 0.25, 0, 1))  # hazy pictures get the full stretch
    a = np.clip((a - bp) / max(hi - bp, 0.2), 0, 1)
    med = float(np.median(a @ W))
    g = math.log(STYLE["median"] * item.get("exposure", 1.0)) / math.log(min(max(med, 0.03), 0.97))
    a = a ** float(np.clip(g, 0.55, 2.4))
    # local contrast: dark, muddy paintings get their forms back instead of going to blue sludge
    l = a @ W
    lb = soft(l, S / 18)
    a = np.clip(a + (STYLE["local"] * (l - lb))[..., None], 0, 1)
    l = a @ W
    mx, mn = a.max(2), a.min(2)
    chroma = mx - mn
    # tame hot reds, oranges and yellows before anything boosts them (they block up into flat red)
    warm = np.clip((np.maximum(a[..., 0], a[..., 1]) - a[..., 2]) / (chroma + 1e-4), 0, 1)
    over = np.clip(chroma - STYLE["warm_cap"], 0, None) * warm
    a = a - over[..., None] * (a - l[..., None]) / (chroma[..., None] + 1e-4) * 0.8
    # skin and candlelit faces keep more of their own colour (and don't go chalky)
    r, gg, bb = a[..., 0], a[..., 1], a[..., 2]
    skin = ((r > gg) & (gg > bb) & (r - bb > 0.06) & (r - bb < 0.5) & (l > 0.25) & (l < 0.9)).astype(np.float32)
    skin = soft(skin, 4)
    # pull toward the blue ramp; images that are already cool need less, daylight needs more
    cool = float((a[..., 2] - a[..., 0]).mean())
    auto = STYLE["tone"] - cool * 1.6 + 0.2 * np.clip((day - 0.42) / 0.25, 0, 1)
    k = item.get("tone", float(np.clip(auto, 0.18, 0.66)))
    # the ramp works on shadows and mids; light sources (lamps, moons, skin in candlelight)
    # keep some of their own colour, the way the reference keeps its orange skies
    chroma = a.max(2) - a.min(2)
    spare = 0.55 * np.clip((l - 0.55) / 0.45, 0, 1) * np.clip((chroma - 0.12) / 0.2, 0, 1)
    kk = k * (1 - STYLE.get("hold", 1.0) * spare) * (1 - 0.35 * skin)
    a = a * (1 - kk[..., None]) + ramp(l) * kk[..., None]
    # daylight skies: a bright, cool top of frame reads as day; pull it down toward night
    if day > 0.42:
        rows = np.linspace(1, 0, S, dtype=np.float32)[:, None] ** 1.5
        sky = np.clip((l - 0.45) / 0.4, 0, 1) * np.clip((a[..., 2] - a[..., 0] + 0.05) / 0.2, 0, 1) * rows
        a *= (1 - 0.45 * np.clip((day - 0.42) / 0.2, 0, 1) * sky)[..., None]
    # S-curve for punch
    a = np.clip(a, 0, 1)
    a = a + STYLE["contrast"] * a * (1 - a) * (2 * a - 1)
    # vibrance: muted colours get the boost, already-loud ones (cyan skies, reds) barely move
    l = a @ W
    chroma = a.max(2) - a.min(2)
    sat = 1 + (STYLE["saturation"] - 1) * np.clip(1 - chroma / STYLE.get("vib_cap", 0.42), 0, 1)
    a = l[..., None] + (a - l[..., None]) * sat[..., None]
    # cap chroma: no neon greens, acid limes or hard royal blues
    chroma = a.max(2) - a.min(2)
    cap = np.minimum(1, STYLE["chroma_cap"] / (chroma + 1e-4))
    a = l[..., None] + (a - l[..., None]) * cap[..., None]
    a = np.clip(a, 0, 1)
    # bloom: blurred highlights screened back
    hl = np.clip((a - 0.62) / 0.38, 0, 1)
    hl *= (1 - 0.5 * skin)[..., None]  # faces don't bloom to chalk
    hl *= float(np.clip(1 - (hl.mean() - 0.04) * 6, 0.35, 1))  # big bright areas (floodlit walls) barely bloom
    blur = np.asarray(Image.fromarray((hl * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(S / 45)),
                      np.float32) / 255
    a = 1 - (1 - a) * (1 - blur * STYLE["bloom"])
    if STYLE.get("knee"):
        kn, wp, m = STYLE["knee"], STYLE.get("white", 1.0), STYLE.get("knee_slope", 0.5)
        l = a @ W
        x = np.clip((l - kn) / (1 - kn), 0, 1)
        nl = np.where(l > kn, kn + (wp - kn) * (m * x + (1 - m) * x * x), l)
        a = np.clip(a * (nl / np.maximum(l, 1e-4))[..., None], 0, 1)
    # lifted, blue-violet blacks (the reference never sits at true black)
    lift = STYLE["black_lift"] * np.array(STYLE.get("lift_tint", [0.6, 0.85, 1.7]), np.float32)
    a = a * (1 - lift) + lift
    # gentle vignette
    y, x = np.mgrid[0:S, 0:S].astype(np.float32) / S - 0.5
    v = 1 - STYLE["vignette"] * np.clip(np.sqrt(x * x + y * y) / 0.707 - 0.35, 0, 1) ** 1.5
    a *= v[..., None]
    return (np.clip(a, 0, 1) * 255).astype(np.uint8)


# ---------------------------------------------------------------- type

def font(name, px, var=None):
    f = ImageFont.truetype(os.path.join(FONTS, name), px)
    if var:
        f.set_variation_by_name(var)
    return f


def wrap(text, f, max_w):
    """Wrap into as few lines as greedy wrapping uses, choosing the breaks that read best:
    lines of even length, a break after a sentence or clause where possible, and no lone
    short word on the last line."""
    words = text.split()
    n_lines = len(_greedy(text, f, max_w))
    if n_lines == 1:
        return [text]
    width = [[0.0] * (len(words) + 1) for _ in words]
    for i in range(len(words)):
        for j in range(i + 1, len(words) + 1):
            width[i][j] = f.getlength(" ".join(words[i:j]))

    def cost(i, j, last):
        w = width[i][j]
        if w > max_w:
            return math.inf
        c = 0.0 if last else ((max_w - w) / max_w) ** 2
        if last and w < max_w * 0.33:
            c += 0.25                                   # a stub of a last line
        if not last:
            end = words[j - 1][-1]
            c -= 0.14 if end in ".?!" else 0.05 if end in ",;:" else 0
            if words[j - 1].lower() in ("a", "an", "the", "to", "of", "and", "your", "you", "is", "in"):
                c += 0.04                               # don't end a line on a little word
        return c

    from functools import lru_cache

    @lru_cache(None)
    def best(i, k):
        if i == len(words):
            return (0.0, ()) if k == 0 else (math.inf, ())
        if k == 0:
            return (math.inf, ())
        out = (math.inf, ())
        for j in range(i + 1, len(words) + 1):
            c = cost(i, j, j == len(words))
            if c == math.inf:
                break
            sub = best(j, k - 1)
            if c + sub[0] < out[0]:
                out = (c + sub[0], (j,) + sub[1])
        return out

    total, breaks = best(0, n_lines)
    if total == math.inf:
        return _greedy(text, f, max_w)
    lines, i = [], 0
    for j in breaks:
        lines.append(" ".join(words[i:j]))
        i = j
    return lines


def _greedy(text, f, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if f.getlength(t) <= max_w or not cur:
            cur = t
        else:
            lines.append(cur)
            cur = w
    lines.append(cur)
    return lines


def text_layer(text, W, H, ss=2):
    """The statement as an RGBA float layer: white, black outline, soft drop shadow."""
    px = int(W * STYLE["text_size"] * ss)
    f = font("SofiaSansCondensed.ttf", px, b"Bold")
    text = re.sub(r"(\w)'(\w)", "\\1\u2019\\2", text).replace("'", "\u2019")  # typographic apostrophes
    lines = wrap(text, f, W * STYLE["text_wrap"] * ss)
    lead = px * STYLE["text_lead"]
    stroke = max(1, round(W * STYLE["text_stroke"] * ss))
    asc, desc = f.getmetrics()
    block_h = lead * (len(lines) - 1) + asc + desc
    top = H * STYLE["text_y"] * ss - block_h / 2
    img = Image.new("RGBA", (W * ss, H * ss), (0, 0, 0, 0))
    shadow = Image.new("L", (W * ss, H * ss), 0)
    d, ds = ImageDraw.Draw(img), ImageDraw.Draw(shadow)
    for i, ln in enumerate(lines):
        x = (W * ss - f.getlength(ln)) / 2
        y = top + i * lead
        ds.text((x, y + stroke), ln, font=f, fill=150, stroke_width=stroke * 2)
        d.text((x, y), ln, font=f, fill=(255, 255, 255, 255), stroke_width=stroke, stroke_fill=(0, 0, 0, 255))
    shadow = shadow.filter(ImageFilter.GaussianBlur(stroke * 3))
    base = Image.new("RGBA", img.size, (0, 0, 0, 0))
    base.putalpha(shadow)
    base.alpha_composite(img)
    base = base.resize((W, H), Image.LANCZOS)
    return np.asarray(base, np.float32) / 255, lines


def tag_layer(W, H, ss=2):
    """'come align', small, in the wordmark face and the app's cream, with a soft dark halo
    so it reads over bright pictures. It sits low in the picture window, inside
    Instagram's safe zone (clear of the caption and buttons)."""
    px = int(W * STYLE["tag_size"] * ss)
    f = font("EBGaramond-Italic.ttf", px, b"Medium Italic")
    text = STYLE["tag_text"]
    box = f.getbbox(text)
    x = (W * ss - (box[2] - box[0])) / 2 - box[0]
    y = H * STYLE["tag_y"] * ss - (box[3] + box[1]) / 2
    m = Image.new("L", (W * ss, H * ss), 0)
    ImageDraw.Draw(m).text((x, y), text, font=f, fill=255)
    halo = m.filter(ImageFilter.GaussianBlur(px * 0.35))
    halo = np.clip(np.asarray(halo, np.float32) / 255 * 2.4, 0, 1) * 0.5
    core = np.asarray(m, np.float32) / 255
    alpha = np.maximum(core, halo)
    rgb = np.zeros(core.shape + (3,), np.float32)
    rgb[:] = core[..., None] * (np.array([0xef, 0xe6, 0xd6], np.float32) / 255) / np.maximum(alpha, 1e-4)[..., None]
    out = np.dstack([rgb, alpha])
    img = Image.fromarray((out * 255).astype(np.uint8), "RGBA").resize((W, H), Image.LANCZOS)
    return np.asarray(img, np.float32) / 255


def wordmark_layer(W, H, ss=2):
    """'Align' in the app's wordmark face (EB Garamond italic), white with a heavy
    black outline, the way the reference stamps its name over the last cuts."""
    px = int(W * STYLE["word_size"] * ss)
    f = font("EBGaramond-Italic.ttf", px, b"ExtraBold Italic")
    stroke = round(W * STYLE["word_stroke"] * ss)
    text = "Align"
    box = f.getbbox(text, stroke_width=stroke)
    img = Image.new("RGBA", (W * ss, H * ss), (0, 0, 0, 0))
    x = (W * ss - (box[2] - box[0])) / 2 - box[0]
    y = H * STYLE["text_y"] * ss - (box[3] + box[1]) / 2
    shadow = Image.new("L", img.size, 0)
    ImageDraw.Draw(shadow).text((x + stroke * 0.5, y + stroke * 1.2), text, font=f, fill=235, stroke_width=stroke)
    ImageDraw.Draw(img).text((x, y), text, font=f, fill=(255, 255, 255, 255), stroke_width=stroke,
                             stroke_fill=(0, 0, 0, 255))
    base = Image.new("RGBA", img.size, (0, 0, 0, 0))
    base.putalpha(shadow.filter(ImageFilter.GaussianBlur(max(1, stroke * 0.3))))
    base.alpha_composite(img)
    return np.asarray(base.resize((W, H), Image.LANCZOS), np.float32) / 255


# ---------------------------------------------------------------- picking

def plan_length(text):
    """Whole bars, so the music loops clean: enough time to read the line twice."""
    words = len(text.split())
    need = max(5.5, 1.6 + words * 0.42) + STYLE["end"]
    return max(4, math.ceil(need / BAR)) * BAR


def choose_images(moods, sign, n, rng):
    """Draw n distinct images across the line's mood pools (first mood weighs most),
    plus the sign's own pool for sign lines. A few of each pool's pins lead."""
    weights = [0.5, 0.3, 0.2][: len(moods)]
    pools = [(m, load_pool(m)) for m in moods]
    if sign:
        pools.insert(0, (sign, load_pool(f"signs/{sign}")))
        weights = [0.25] + [w * 0.75 for w in weights]  # sign pools are mostly photos; keep them a minority
    pools = [(m, p, w) for (m, p), w in zip(pools, weights) if p]
    if not pools:
        raise SystemExit(f"no images in pools {moods}")
    tot = sum(w for _, _, w in pools)
    want = {m: max(1, round(n * w / tot)) for m, _, w in pools}
    picked, seen = [], set()
    for m, p, _ in pools:
        order = [int(i) for i in rng.permutation(len(p))]
        pins = [i for i in order if p[i].get("pin")][: max(1, want[m] // 3)]  # a few pins, not all of them
        order = pins + [i for i in order if i not in pins]
        k = 0
        for i in order:
            if k >= want[m]:
                break
            if p[i]["id"] in seen:
                continue
            seen.add(p[i]["id"])
            picked.append(p[i])
            k += 1
    rng.shuffle(picked)
    return picked[:n]


def render(line, seed=0, preview=False, out=None, audio=None, audio_start=0.0, silent=False, n_imgs=12):
    W, H = (540, 960) if preview else (1080, 1920)
    rng = np.random.default_rng([seed, zlib.crc32(line["id"].encode())])
    total = plan_length(line["text"])
    n_shots = int(round(total / CUT))
    fpc = int(round(CUT * FPS))
    S = W
    y0 = int(round(H * STYLE["window_y"]))

    items = choose_images(line.get("moods") or ["moon", "stars"], line.get("sign"), n_imgs, rng)
    shots, used = [], []
    for it in items:
        try:
            shots.append(grade(Image.open(ensure_file(it)), S, it))
            used.append(it)
        except OSError as e:
            print(f"  skip {it.get('id')}: {e}")
    first = next((j for j, it in enumerate(used) if it.get("pin")), 0)
    shots.insert(0, shots.pop(first)); used.insert(0, used.pop(first))  # open on a pinned picture
    seq = [k % len(shots) for k in range(n_shots)]  # the reference loops one fixed order

    txt, lines = text_layer(line["text"], W, H)
    mark = wordmark_layer(W, H)
    tag = tag_layer(W, H)
    end_shot = n_shots - int(round(STYLE["end"] / CUT))
    a_txt = txt[y0:y0 + S, :, 3].max(1)
    rows = np.where(a_txt > 0.5)[0]
    c, half = (rows.min() + rows.max()) / 2, (rows.max() - rows.min()) / 2 + S * 0.04
    guard = STYLE.get("guard", 0) * np.clip(1 - (np.abs(np.arange(S) - c) - half) / (S * 0.08), 0, 1) ** 2

    out = out or os.path.join(HERE, "out", f"{line['id']}-s{seed}{'-preview' if preview else ''}.mp4")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    wav = None
    if not silent:
        wav = tempfile.mktemp(suffix=".wav")
        if audio:
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(audio_start), "-t", str(total), "-i", audio,
                            "-af", f"afade=t=out:st={total - 0.4}:d=0.4,loudnorm=I=-14:TP=-1.5",
                            "-ar", "44100", "-ac", "2", wav], check=True)
        else:
            music.write_wav(wav, music.compose(total, seed, line.get("theme"), line.get("sign"), salt=line["id"]))
            wav = music.master(wav, -14.0)

    cmd = ["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
           "-r", str(FPS), "-i", "-"]
    cmd += ["-i", wav] if wav else []
    cmd += ["-c:v", "libx264", "-preset", "medium", "-crf", "19", "-pix_fmt", "yuv420p",
            "-profile:v", "high", "-level", "4.1", "-x264-params", "keyint=48",
            "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-color_range", "tv"]
    cmd += ["-c:a", "aac", "-b:a", "192k", "-shortest"] if wav else []
    cmd += ["-movflags", "+faststart", out]
    ff = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    for k in range(n_shots):
        frame = np.zeros((H, W, 3), np.float32)
        frame[y0:y0 + S] = shots[seq[k]].astype(np.float32) / 255
        if k < end_shot and STYLE.get("guard"):  # highlights only: dark pictures are untouched
            win = frame[y0:y0 + S]
            lum = win @ np.array([0.299, 0.587, 0.114], np.float32)
            win *= (1 - guard[:, None] * np.clip((lum - 0.40) / 0.45, 0, 1))[..., None]
        layer = mark if k >= end_shot else txt
        a = layer[..., 3:4]
        frame = frame * (1 - a) + layer[..., :3] * a
        ta = tag[..., 3:4] * (STYLE["tag_alpha_end"] if k >= end_shot else STYLE["tag_alpha"])
        frame = frame * (1 - ta) + tag[..., :3] * ta
        buf = (np.clip(frame, 0, 1) * 255 + 0.5).astype(np.uint8).tobytes()
        for _ in range(fpc):
            ff.stdin.write(buf)
    ff.stdin.close()
    ff.wait()
    if wav:
        os.remove(wav)

    write_caption(out.replace(".mp4", ".txt"), line, used, rng)
    print(out)
    return out


CAPTION_MAX = 2200     # Instagram's caption limit, in characters
TAG_LIMIT = 5          # Instagram cut posts to 5 hashtags in Dec 2025 (it was 30); set to 30 if that changes
CUT_LINE = "----- NOT FOR POSTING: full image sources (for the records / a credits page) -----"


def _licence(it):
    """'CC BY-SA 4.0' style name, or None when the image needs no credit (PD / CC0)."""
    lic = re.sub(r"\s+", " ", (it.get("license") or "")).strip()
    low = lic.lower()
    if not lic or "public domain" in low or "cc0" in low or low in ("pdm", "pd"):
        return None
    if not low.startswith("cc"):
        lic = "CC " + lic
    return re.sub(r"^cc ", "CC ", lic, flags=re.I).replace("by-sa", "BY-SA").replace("by ", "BY ")


def _clean(text, n):
    text = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", text or "")).strip()
    return text if len(text) <= n else text[:n - 1].rstrip(" ,;-") + "\u2026"


def write_caption(path, line, used, rng):
    """The sidecar: a postable caption (always <= CAPTION_MAX chars, <= TAG_LIMIT tags),
    then a cut line and the full source list, which is not meant to be posted.

    Only CC BY / BY-SA pictures need a credit, so the posted part carries one compact
    line for those; public-domain and CC0 pictures are listed below the cut."""
    data = load_lines() if os.path.exists(os.path.join(HERE, "lines.json")) else {"themes": {}, "signs": {}}
    th = data["themes"].get(line.get("theme"), {})
    cta = th.get("cta") or ["Come align. Link in bio."]
    # hashtags: the sign's own tag first, then the theme's, the brand tag always last
    brand = "comealign"
    sign_tags = data.get("signs", {}).get(line.get("sign") or "", {}).get("tags", [])[:1]
    tags = []
    for t in sign_tags + list(th.get("tags", [])):
        t = t.replace(" ", "").lstrip("#").lower()
        if t and t != brand and t not in tags:
            tags.append(t)
    tags = tags[:TAG_LIMIT - 1] + [brand]
    credits = []
    for it in used:
        lic = _licence(it)
        if lic:
            # "Name (1817 - 1900) - painter", "Name (Wikipedia:User:...)", "Name You are free to use..." -> Name
            who = re.split(r"\s+(?:\(|you are free|[\u2013\u2014]|-\s*\d)", _clean(it.get("creator"), 200), flags=re.I)[0]
            title = re.sub(r"^file:|\.(jpe?g|png|tiff?|webp)$", "", _clean(it.get("title"), 200), flags=re.I).strip()
            credits.append(f"{_clean(who, 40) or 'unknown author'}, \u201c{_clean(title, 40)}\u201d ({lic})")
    parts = [line["text"]]
    if line.get("caption"):
        parts.append(line["caption"].strip())
    parts.append(cta[int(rng.integers(len(cta)))])
    if credits:
        parts.append("Image credits: " + "; ".join(credits) + ". Other images public domain.")
    parts.append(" ".join("#" + t for t in tags))
    post = "\n\n".join(parts)
    if len(post) > CAPTION_MAX and credits:  # creators and licences only
        short = "Image credits: " + "; ".join(c.split(", \u201c")[0] + " (" + c.rsplit("(", 1)[1] for c in credits)
        parts[-2] = short + ". Other images public domain."
        post = "\n\n".join(parts)
    if len(post) > CAPTION_MAX:
        print(f"  warning: caption for {line['id']} is {len(post)} chars (max {CAPTION_MAX})")
    with open(path, "w") as fh:
        fh.write(post + "\n\n\n" + CUT_LINE + "\n")
        for it in used:
            fh.write(f"- {_clean(it.get('title'), 120)} / {_clean(it.get('creator'), 80)} / "
                     f"{it.get('license', '')} / {it.get('landing', '')}\n")


def find_line(key):
    for ln in load_lines()["lines"]:
        if ln["id"] == key:
            return ln
    raise SystemExit(f"no line {key!r} in lines.json")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("line", nargs="?", help="an id from lines.json")
    ap.add_argument("--text", help="your own words instead of a line id")
    ap.add_argument("--moods", nargs="*", default=["moon", "stars", "castle"])
    ap.add_argument("--sign")
    ap.add_argument("--seed", type=int, default=0)
    ap.add_argument("--preview", action="store_true")
    ap.add_argument("--out")
    ap.add_argument("--audio", help="your own track (mp3/wav/m4a)")
    ap.add_argument("--audio-start", type=float, default=0.0)
    ap.add_argument("--silent", action="store_true", help="no sound; add a trending one in the app")
    a = ap.parse_args()
    if a.text:
        ln = {"id": "custom-" + re.sub(r"[^a-z0-9]+", "-", a.text.lower())[:32].strip("-"), "text": a.text,
              "moods": a.moods, "sign": a.sign, "theme": "sign" if a.sign else "align"}
    elif a.line:
        ln = find_line(a.line)
    else:
        raise SystemExit("give a line id or --text")
    render(ln, a.seed, a.preview, a.out, a.audio, a.audio_start, a.silent)
