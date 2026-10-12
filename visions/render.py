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
    "text_lead": 1.07,        # line height / font size
    "text_wrap": 0.80,        # max line width / frame width (ref's longest line is 0.74)
    "text_stroke": 0.0042,    # black outline / frame width
    "text_y": 0.5,            # block centre / frame height
    "word_size": 0.19,       # wordmark font px / frame width
    "word_stroke": 0.011,
    "end": 1.5,               # seconds of wordmark at the end
    # the grade (see grade()): exposure targets measured off the reference frames
    "median": 0.23,           # median luminance after levels
    "tone": 0.50,             # pull toward the moonlit blue ramp
    "saturation": 1.5,
    "black_lift": 0.035,
    "contrast": 0.55,
    "bloom": 0.42,
    "local": 0.35,            # local contrast (large-radius unsharp on luminance)
    "warm_cap": 0.38,         # max chroma for reds/oranges before the boost
    "vignette": 0.32,
}

# moonlight ramp: luminance -> colour (deep indigo shadows, blue mids, cold white highs)
RAMP = np.array([
    [0.00, 0.020, 0.035, 0.100],
    [0.18, 0.060, 0.120, 0.300],
    [0.40, 0.170, 0.320, 0.640],
    [0.70, 0.540, 0.720, 0.950],
    [1.00, 1.000, 1.000, 1.000],
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
    a = np.clip((a - lo * 0.85) / max(hi - lo * 0.85, 0.2), 0, 1)
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
    # tame hot reds and oranges before anything boosts them (they block up into flat red)
    warm = np.clip((a[..., 0] - a[..., 2]) / (chroma + 1e-4), 0, 1) * (a[..., 0] >= a[..., 1])
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
    kk = k * (1 - 0.55 * np.clip((l - 0.55) / 0.45, 0, 1)) * (1 - 0.35 * skin)
    a = a * (1 - kk[..., None]) + ramp(l) * kk[..., None]
    # S-curve for punch
    a = np.clip(a, 0, 1)
    a = a + STYLE["contrast"] * a * (1 - a) * (2 * a - 1)
    # vibrance: muted colours get the boost, already-loud ones (cyan skies, reds) barely move
    l = a @ W
    chroma = a.max(2) - a.min(2)
    sat = 1 + (STYLE["saturation"] - 1) * np.clip(1 - chroma / 0.42, 0, 1)
    a = l[..., None] + (a - l[..., None]) * sat[..., None]
    a = np.clip(a, 0, 1)
    # bloom: blurred highlights screened back
    hl = np.clip((a - 0.62) / 0.38, 0, 1)
    hl *= (1 - 0.5 * skin)[..., None]  # faces don't bloom to chalk
    blur = np.asarray(Image.fromarray((hl * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(S / 45)),
                      np.float32) / 255
    a = 1 - (1 - a) * (1 - blur * STYLE["bloom"])
    # lifted, blue-violet blacks (the reference never sits at true black)
    lift = STYLE["black_lift"] * np.array([0.6, 0.85, 1.7], np.float32)
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
    ImageDraw.Draw(shadow).text((x, y + stroke), text, font=f, fill=170, stroke_width=stroke * 2)
    ImageDraw.Draw(img).text((x, y), text, font=f, fill=(255, 255, 255, 255), stroke_width=stroke,
                             stroke_fill=(0, 0, 0, 255))
    base = Image.new("RGBA", img.size, (0, 0, 0, 0))
    base.putalpha(shadow.filter(ImageFilter.GaussianBlur(stroke * 2)))
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
    plus the sign's own pool for sign lines. Pins in a pool always come first."""
    weights = [0.5, 0.3, 0.2][: len(moods)]
    pools = [(m, load_pool(m)) for m in moods]
    if sign:
        pools.insert(0, (sign, load_pool(f"signs/{sign}")))
        weights = [0.4] + [w * 0.6 for w in weights]
    pools = [(m, p, w) for (m, p), w in zip(pools, weights) if p]
    if not pools:
        raise SystemExit(f"no images in pools {moods}")
    tot = sum(w for _, _, w in pools)
    want = {m: max(1, round(n * w / tot)) for m, _, w in pools}
    picked, seen = [], set()
    for m, p, _ in pools:
        order = [i for i in rng.permutation(len(p))]
        order = sorted(order, key=lambda i: not p[i].get("pin"))  # stable: pins first
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


def sequence(n_imgs, n_shots, rng):
    """One shuffled pass through the images, repeated, never the same image twice in a row."""
    order = list(range(n_imgs))
    seq = []
    while len(seq) < n_shots:
        seq += order
    return seq[:n_shots]


# ---------------------------------------------------------------- render

def render(line, seed=0, preview=False, out=None, audio=None, audio_start=0.0, silent=False, n_imgs=20):
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
    seq = sequence(len(shots), n_shots, rng)

    txt, lines = text_layer(line["text"], W, H)
    mark = wordmark_layer(W, H)
    end_shot = n_shots - int(round(STYLE["end"] / CUT))

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
            music.write_wav(wav, music.compose(total, seed, line.get("theme"), line.get("sign")))
            wav = music.master(wav, -14.0)

    cmd = ["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
           "-r", str(FPS), "-i", "-"]
    cmd += ["-i", wav] if wav else []
    cmd += ["-c:v", "libx264", "-preset", "medium", "-crf", "19", "-pix_fmt", "yuv420p",
            "-x264-params", "keyint=48"]
    cmd += ["-c:a", "aac", "-b:a", "192k", "-shortest"] if wav else []
    cmd += ["-movflags", "+faststart", out]
    ff = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    for k in range(n_shots):
        frame = np.zeros((H, W, 3), np.float32)
        frame[y0:y0 + S] = shots[seq[k]].astype(np.float32) / 255
        layer = mark if k >= end_shot else txt
        a = layer[..., 3:4]
        frame = frame * (1 - a) + layer[..., :3] * a
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


def write_caption(path, line, used, rng):
    data = load_lines() if os.path.exists(os.path.join(HERE, "lines.json")) else {"themes": {}, "signs": {}}
    th = data["themes"].get(line.get("theme"), {})
    tags = list(th.get("tags", []))
    if line.get("sign"):
        tags = data.get("signs", {}).get(line["sign"], {}).get("tags", []) + tags
    cta = th.get("cta") or ["Come align. Link in bio."]
    with open(path, "w") as fh:
        fh.write(line["text"] + "\n\n")
        if line.get("caption"):
            fh.write(line["caption"].strip() + "\n\n")
        fh.write(cta[int(rng.integers(len(cta)))] + "\n\n")
        fh.write(" ".join("#" + t.replace(" ", "").lstrip("#") for t in dict.fromkeys(tags)) + "\n\n")
        fh.write("Images (public domain or open licence; credit CC BY / BY-SA in the caption or bio):\n")
        for it in used:
            title = re.sub(r"<[^>]+>", "", it.get("title", "")).strip()
            fh.write(f"- {title[:80]} / {it.get('creator', '')[:50]} / {it.get('license', '')} / {it.get('landing', '')}\n")


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
