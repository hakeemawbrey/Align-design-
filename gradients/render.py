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
}

STYLE = {
    "size": 0.075,     # starting font px / width; shrinks to fit
    "min_size": 0.052,
    "wrap": 0.86,      # max line width / width
    "lead": 1.14,      # line height / font size
    "max_h": 0.62,     # max text block height / height
    "shadow": 0.30,
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
    words, lines, cur = text.split(), [], ""
    for w_ in words:
        t = (cur + " " + w_).strip()
        if f.getlength(t) <= max_w or not cur:
            cur = t
        else:
            lines.append(cur)
            cur = w_
    lines.append(cur)
    return lines  # greedy, like the reference posts (a short last line is part of the look)


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


def text_layer(text, ss=2):
    px = W * STYLE["size"]
    while True:
        f = ImageFont.truetype(FONT, int(px * ss))
        f.set_variation_by_name(b"ExtraBold")
        lines = wrap(text, f, W * STYLE["wrap"] * ss)
        lead = px * ss * STYLE["lead"]
        block = lead * len(lines)
        if block <= H * STYLE["max_h"] * ss or px <= W * STYLE["min_size"]:
            break
        px *= 0.95
    img = Image.new("RGBA", (W * ss, H * ss), (0, 0, 0, 0))
    sh = Image.new("L", img.size, 0)
    d, ds = ImageDraw.Draw(img), ImageDraw.Draw(sh)
    asc, desc = f.getmetrics()
    top = (H * ss - (lead * (len(lines) - 1) + asc + desc)) / 2
    for i, ln in enumerate(lines):
        x = (W * ss - f.getlength(ln)) / 2
        y = top + i * lead
        ds.text((x, y + px * ss * 0.05), ln, font=f, fill=int(255 * STYLE["shadow"]))
        d.text((x, y), ln, font=f, fill=(255, 255, 255, 255))
    base = Image.new("RGBA", img.size, (0, 0, 0, 0))
    base.putalpha(sh.filter(ImageFilter.GaussianBlur(px * ss * 0.09)))
    base.alpha_composite(img)
    return np.asarray(base.resize((W, H), Image.LANCZOS), np.float32) / 255, lines


def seconds_for(text):
    words = len(text.split())
    return round(min(14, max(6, 3 + words * 0.3)), 1)


def render(post, out, palette=None):
    os.makedirs(os.path.dirname(out) or ".", exist_ok=True)
    seed = zlib.crc32(post["text"].encode())
    palette = palette or post.get("palette") or ["classic", "classic", "deep"][seed % 3]
    margin = int(W * STYLE["drift"])
    bg = gradient(palette, W + margin, H + margin)
    txt, lines = text_layer(post["text"])
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
        ox = int(margin * (0.5 + 0.5 * math.sin(math.pi * (t - 0.5))))   # slow ease across the reel
        oy = int(margin * 0.5 * (1 - math.cos(math.pi * t)) / 2)
        frame = bg[oy:oy + H, ox:ox + W] / 255
        frame = frame * (1 - a) + txt[..., :3] * a
        buf = (np.clip(frame, 0, 1) * 255 + 0.5).astype(np.uint8)
        if i == 0:
            still = buf
        ff.stdin.write(buf.tobytes())
    ff.stdin.close()
    ff.wait()
    Image.fromarray(still).save(out[:-4] + ".png")
    with open(out[:-4] + ".txt", "w") as fh:
        fh.write(post.get("caption", "").strip() + "\n\n")
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
    ap.add_argument("--out")
    a = ap.parse_args()
    if a.text:
        render({"text": a.text}, a.out or os.path.join(HERE, "out", "test.mp4"), a.palette)
    else:
        posts = [p for f in a.copy for p in json.load(open(f))["posts"]]
        for p in posts:
            if a.all or p["id"] == a.id:
                render(p, a.out if a.id and a.out else os.path.join(HERE, "out", p["id"] + ".mp4"), a.palette)
