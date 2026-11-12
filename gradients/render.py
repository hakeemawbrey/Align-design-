"""Text-on-gradient reels in the @alchemyrealm / @equolfour format.

  python3 render.py --text "i regret to announce..." --out out/test.mp4
  python3 render.py --copy copy/leo_scorpio.json --id leo-g01
  python3 render.py --copy copy/*.json --all             # every post in those files

A 3:4 frame (1080x1440, Instagram letterboxes it in the Reels player the way the
reference posts sit) filled with a soft four-corner gradient that drifts very
slowly, one centred block of white Figtree ExtraBold with a faint shadow, and a
silent audio track so schedulers accept it (add a trending sound in the app).
Also writes a still PNG and a .txt with the caption and hashtags.
"""
import argparse, glob, json, math, os, subprocess, zlib

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(HERE, "assets", "fonts", "Figtree.ttf")
# Text looks: clean (soft shadow, the reference posts), outline (white with a black stroke, the TikTok look),
# (boomer is a copy category, not a look). Text is always white.
W, H, FPS = 1080, 1440, 24

# 3x3 colour grids sampled off the reference posts (top row, middle row, bottom row)
PALETTES = {
    "classic": [["#4090f2", "#4077f2", "#733af2"],
                ["#6052f2", "#733df5", "#b325dd"],
                ["#a569f6", "#b353ec", "#c236dd"]],
    "deep":    [["#0192fa", "#2a77fb", "#7c38fa"],
                ["#6253fc", "#7b3afd", "#c404e4"],
                ["#af67ff", "#c04df3", "#d325e5"]],
    "rainbow": [["#dceb44", "#63d661", "#00a3d2"],
                ["#fe7f01", "#fa8602", "#7b5bd6"],
                ["#fc0262", "#f40274", "#9f3bd6"]],
    "magenta": [["#d63fd0", "#c33ad8", "#8e2be0"],
                ["#e86ae6", "#e04bc4", "#a332e0"],
                ["#e27ad8", "#d44fd4", "#9a2fdc"]],
    "sunset":  [["#ea6b2c", "#ee7d2c", "#f39a3a"],
                ["#ee612c", "#f07530", "#f6b44a"],
                ["#e2384d", "#e64a45", "#e8673c"]],
    "lime":    [["#80df8e", "#8cf088", "#84e89a"],
                ["#c5e86a", "#ddd062", "#d7c86a"],
                ["#ec7564", "#e8665e", "#c856a8"]],
    "aqua":    [["#4fa6e0", "#5bb3ea", "#7ab9ef"],
                ["#62c6a2", "#6ccb8a", "#8fc6c9"],
                ["#d7a63c", "#8cc955", "#70cc56"]],
}
# Stronger shadow under the white text on the lighter gradients, so it stays readable.
SHADOW = {"lime": 0.55, "sunset": 0.42, "aqua": 0.45, "rainbow": 0.38}
INK = {"light": (255, 255, 255), "dark": (17, 17, 17)}

STYLE = {
    "size": 0.075,     # starting font px / width; shrinks to fit
    "min_size": 0.052,
    "wrap": 0.86,      # max line width / width
    "lead": 1.14,      # line height / font size
    "max_h": 0.58,     # max text block height / height (keeps clear of the sign-off at 80%)
    "center": 0.47,    # text block centre, a touch above the middle
    "shadow": 0.30,
    "gap": 0.75,       # blank line between paragraphs, in line heights
    "drift": 0.06,     # how far the gradient pans over the reel (fraction of width)
}


def hex2rgb(h):
    return [int(h[i:i + 2], 16) for i in (1, 3, 5)]


def gradient(palette, w, h):
    """Smooth gradient from a 3x3 grid: bicubic up from a tiny image, then a little
    blur and noise dither so there's no banding after compression."""
    grid = np.array([[hex2rgb(c) for c in row] for row in PALETTES[palette]], np.uint8)
    small = Image.fromarray(grid, "RGB").resize((6, 6), Image.BILINEAR)
    big = small.resize((w, h), Image.BICUBIC).filter(ImageFilter.GaussianBlur(w / 40))
    a = np.asarray(big, np.float32)
    a += np.random.default_rng(0).normal(0, 1.2, a.shape)
    return np.clip(a, 0, 255)


def wrap(text, f, max_w):
    """Greedy wrap that keeps the post's own line breaks: "\n" forces a new line
    (lists), a blank line becomes a gap (None) like the reference paragraphs."""
    out = []
    for para in text.strip().split("\n"):
        if not para.strip():
            if out and out[-1] is not None:
                out.append(None)
            continue
        out += _greedy(para, f, max_w)
    return out


def _greedy(text, f, max_w):
    words, lines, cur = text.split(), [], ""
    for w_ in words:
        t = (cur + " " + w_).strip()
        if f.getlength(t) <= max_w or not cur:
            cur = t
        else:
            lines.append(cur)
            cur = w_
    lines.append(cur)
    return lines


def layout_for(seed):
    """Per-post text size and side padding, so a feed of these doesn't look stamped out: some captions small with wide
    margins, some big and nearly edge to edge. Fixed per post (from the text's hash)."""
    size = 0.70 + ((seed >> 8) % 64) / 63 * 0.65     # 0.70x - 1.35x the base size
    wrap = 0.60 + ((seed >> 16) % 32) / 31 * 0.30     # line width 60% - 90% of the frame
    return size, wrap


def text_layer(text, ss=2, ink="light", style="clean", seed=0, shadow_k=None, size_k=1.0, wrap_k=None):
    px = W * STYLE["size"] * size_k
    wrap_w = wrap_k or STYLE["wrap"]
    while True:
        f = ImageFont.truetype(FONT, int(px * ss))
        f.set_variation_by_name(b"ExtraBold")
        lines = wrap(text, f, W * wrap_w * ss)
        lead = px * ss * STYLE["lead"]
        block = lead * sum(1 if l is not None else STYLE["gap"] for l in lines)
        if block <= H * STYLE["max_h"] * ss or px <= W * STYLE["min_size"] * min(1, size_k):
            break
        px *= 0.95
    img = Image.new("RGBA", (W * ss, H * ss), (0, 0, 0, 0))
    sh = Image.new("L", img.size, 0)
    d, ds = ImageDraw.Draw(img), ImageDraw.Draw(sh)
    asc, desc = f.getmetrics()
    steps = [1 if l is not None else STYLE["gap"] for l in lines]
    top = H * ss * STYLE["center"] - (lead * (sum(steps) - 1) + asc + desc) / 2
    shadow = shadow_k or STYLE["shadow"]
    stroke = 0 if style == "clean" else max(1, round(px * ss * 0.075))
    fill = (255, 255, 255)   # white text only, in every look
    y = top
    for ln, st in zip(lines, steps):
        if ln is not None:
            x = (W * ss - f.getlength(ln)) / 2
            if style == "clean":
                ds.text((x, y + px * ss * 0.05), ln, font=f, fill=int(255 * shadow))
            d.text((x, y), ln, font=f, fill=fill + (255,), stroke_width=stroke, stroke_fill=(0, 0, 0, 255))
        y += st * lead
    base = Image.new("RGBA", img.size, (0, 0, 0, 0))
    base.putalpha(sh.filter(ImageFilter.GaussianBlur(px * ss * 0.09)))
    base.alpha_composite(img)
    return np.asarray(base.resize((W, H), Image.LANCZOS), np.float32) / 255, [l for l in lines if l]


ART_DIR = os.path.join(HERE, "art")
ART = {"dim": 0.60, "vignette": 0.35, "zoom": 0.07}   # darkening for legibility; slow push-in over the reel
_art = None


def art_list():
    global _art
    if _art is None:
        p = os.path.join(ART_DIR, "art.json")
        _art = json.load(open(p)) if os.path.exists(p) else []
    return _art


def art_for(post, seed):
    arts = art_list()
    if not arts:
        raise SystemExit("No artwork: run tools/build_art.py first")
    want = post.get("art")
    if want is not None:
        for a in arts:
            if a["n"] == want or a["id"] == want:
                return a
    return arts[seed % len(arts)]


def art_background(art):
    """The artwork dimmed, with a soft vignette, at its largest zoom; frames crop into it."""
    s = 1 + ART["zoom"]
    im = Image.open(os.path.join(ART_DIR, art["file"])).convert("RGB").resize((round(W * s), round(H * s)), Image.LANCZOS)
    a = np.asarray(im, np.float32) / 255
    yy, xx = np.mgrid[0:a.shape[0], 0:a.shape[1]]
    r = np.hypot((xx / a.shape[1] - 0.5) / 0.5, (yy / a.shape[0] - 0.5) / 0.5) / math.sqrt(2)
    a = a * ART["dim"] * (1 - ART["vignette"] * r[..., None] ** 2)
    return Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8))


def art_credit(art):
    who = f" by {art['creator']}" if art.get("creator") else ""
    lic = art["license"] if art.get("credit") else "public domain"
    return f"Art: {art.get('title') or 'untitled'}{who} ({lic})"


TAG = {"size": 0.026, "y": 0.80, "alpha": 0.72}
TAGS = {"houston": "come align \u00b7 join the houston beta", "beta": "come align \u00b7 join the beta"}


def tag_for(post, seed):
    """Houston posts always say the Houston beta; the rest split about evenly between the two sign-offs."""
    if post.get("tag") in TAGS:
        return post["tag"]
    if str(post.get("id", "")).startswith("htx"):
        return "houston"
    return "houston" if (seed >> 24) % 2 else "beta"


def tag_layer(text, ss=2):
    """The small sign-off low on every reel: white, semi-transparent, soft shadow, inside Instagram's safe zone."""
    px = int(W * TAG["size"] * ss)
    f = ImageFont.truetype(FONT, px)
    f.set_variation_by_name(b"SemiBold")
    box = f.getbbox(text)
    x = (W * ss - (box[2] - box[0])) / 2 - box[0]
    y = H * TAG["y"] * ss - (box[3] + box[1]) / 2
    core = Image.new("L", (W * ss, H * ss), 0)
    ImageDraw.Draw(core).text((x, y), text, font=f, fill=255)
    sh = core.filter(ImageFilter.GaussianBlur(px * 0.25))
    c = np.asarray(core.resize((W, H), Image.LANCZOS), np.float32) / 255 * TAG["alpha"]
    s = np.asarray(sh.resize((W, H), Image.LANCZOS), np.float32) / 255 * 0.35
    alpha = c + s * (1 - c)
    rgb = np.where(alpha[..., None] > 0, (c / np.maximum(alpha, 1e-4))[..., None], 0) * np.ones(3, np.float32)
    return np.dstack([rgb, alpha])


_tags = {}


def with_tag(frame, which="houston"):
    if which not in _tags:
        _tags[which] = tag_layer(TAGS[which])
    t = _tags[which]
    a = t[..., 3:4]
    return frame * (1 - a) + t[..., :3] * a


def seconds_for(text):
    words = len(text.split())
    return round(min(14, max(6, 3 + words * 0.3)), 1)


def render(post, out, palette=None, bg_mode=None):
    """bg_mode: "gradient" (default) or "art" (a dimmed artwork from art/art.json with a slow push-in)."""
    os.makedirs(os.path.dirname(out) or ".", exist_ok=True)
    seed = zlib.crc32(post["text"].encode())
    bg_mode = bg_mode or post.get("bg") or "gradient"
    art = art_for(post, seed) if bg_mode == "art" else None
    palette = palette or post.get("palette") or ["classic", "magenta", "deep", "rainbow", "classic", "magenta", "aqua"][seed % 7]
    ink = "light"   # white text only
    style = post.get("style") or "clean"
    margin = int(W * STYLE["drift"])
    if art:
        art_img = art_background(art)
    else:
        bg = gradient(palette, W + margin, H + margin)
    size_k, wrap_k = (1.0, None) if art else layout_for(seed)
    tag = tag_for(post, seed)
    txt, lines = text_layer(post["text"], ink=ink, style=style, seed=seed, shadow_k=None if art else SHADOW.get(palette),
                            size_k=size_k, wrap_k=wrap_k)
    a = txt[..., 3:4]
    dur = seconds_for(post["text"])
    n = int(dur * FPS)
    cmd = ["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS),
           "-i", "-", "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo",
           "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", "-profile:v", "high",
           "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709",
           "-c:a", "aac", "-b:a", "96k", "-shortest", "-movflags", "+faststart", out]
    ff = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    still = None
    for i in range(n):
        t = i / max(n - 1, 1)
        if art:
            # push in from 1.0 to 1+zoom, eased, centred
            z = 1 + ART["zoom"] * (0.5 - 0.5 * math.cos(math.pi * t))
            cw, ch = W * (1 + ART["zoom"]) / z, H * (1 + ART["zoom"]) / z
            x0, y0 = (art_img.width - cw) / 2, (art_img.height - ch) / 2
            frame = np.asarray(art_img.resize((W, H), Image.BILINEAR, box=(x0, y0, x0 + cw, y0 + ch)), np.float32) / 255
        else:
            ox = int(margin * (0.5 + 0.5 * math.sin(math.pi * (t - 0.5))))   # slow ease across the reel
            oy = int(margin * 0.5 * (1 - math.cos(math.pi * t)) / 2)
            frame = bg[oy:oy + H, ox:ox + W] / 255
        frame = with_tag(frame * (1 - a) + txt[..., :3] * a, tag)
        buf = (np.clip(frame, 0, 1) * 255 + 0.5).astype(np.uint8)
        if i == 0:
            still = buf
        ff.stdin.write(buf.tobytes())
    ff.stdin.close()
    ff.wait()
    Image.fromarray(still).save(out[:-4] + ".png")
    with open(out[:-4] + ".txt", "w") as fh:
        fh.write(post.get("caption", "").strip() + "\n\n")
        if art:
            fh.write(art_credit(art) + "\n\n")
        tags = post.get("hashtags", [])[:5]
        if tags:
            fh.write(" ".join("#" + t.lstrip("#") for t in tags) + "\n")
        fh.write("\n----- on screen -----\n" + post["text"] + "\n")
    print(out)
    return out


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--text")
    ap.add_argument("--copy", nargs="*")
    ap.add_argument("--id")
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--palette", choices=list(PALETTES))
    ap.add_argument("--ink", choices=list(INK))
    ap.add_argument("--bg", choices=["gradient", "art"])
    ap.add_argument("--style", choices=["clean", "outline"])
    ap.add_argument("--out")
    a = ap.parse_args()
    if a.text:
        render({"text": a.text.replace("\\n", "\n"), "ink": a.ink, "style": a.style}, a.out or os.path.join(HERE, "out", "test.mp4"), a.palette, a.bg)
    else:
        posts = [p for f in a.copy for p in json.load(open(f))["posts"]]
        for p in posts:
            if a.all or p["id"] == a.id:
                name = p["id"] + ("-art" if a.bg == "art" else "")
                render(p, a.out if a.id and a.out else os.path.join(HERE, "out", name + ".mp4"), a.palette, a.bg)
