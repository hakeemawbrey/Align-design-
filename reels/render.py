"""Render one zodiac reel.

  python3 render.py aries                # picks/aries.json, seed 0
  python3 render.py aries --seed 7       # new order, new image subset, new music
  python3 render.py aries --preview      # half-res, fast

Timeline (from the reference reel): the card alone on black, stepping bigger on
three beats; a hit at 2.2s; then full-bleed motif images cut every 0.6s with the
card ghosted in the centre. Heavy film grain, vignette and flicker throughout.
"""
import argparse
import json
import os
import subprocess
import tempfile

import numpy as np
from PIL import Image, ImageFilter, ImageOps

import card as cardmod
import music
import sources

HERE = os.path.dirname(os.path.abspath(__file__))
SIGNS = json.load(open(os.path.join(HERE, "signs.json")))

FPS = 30
INTRO = 2.2
BEAT = 0.6
SHOTS = 27
TOTAL = INTRO + BEAT * SHOTS            # 18.4s, same as the reference

STYLE = {
    "card_w": 0.39,         # montage card width, fraction of frame (ref: 423px of 1080)
    "card_alpha": 0.36,     # montage card opacity (ref measures ~0.33)
    "intro_steps": [0.50, 0.73, 0.0],    # card width per intro step; 0 = fill frame height
    "intro_times": [0.0, 0.667, 1.429],  # hard cuts, as in the reference
    "zoom": 0.03,           # slow linear push-in per shot (ref is static)
    "grain": 0.085,          # grain strength (0-1 scale), a lot
    "grain_size": 1.6,      # px
    "vignette": 0.55,
    "flicker": 0.035,
    "glow": 0.35,           # highlight bloom on backgrounds
    "contrast": 1.3,
    "gamma": 1.15,
    "saturation": 0.76,
    "hit_flash": 0.12,
}


def ensure_file(item):
    p = os.path.join(HERE, item["file"])
    if not os.path.exists(p):
        os.makedirs(os.path.dirname(p), exist_ok=True)
        if not sources.download(item, p):
            raise SystemExit(f"could not fetch {item.get('id')}")
    return p


def grade(im, mult, W, H, focus=(0.5, 0.5), over=1.0 + STYLE["zoom"] + 0.02, zoom=1.0):
    """Cover-fit around a focus point (zoom > 1 crops tighter, so focus can move
    the subject vertically too), then the house grade."""
    tw, th = int(W * over), int(H * over)
    im = ImageOps.fit(im.convert("RGB"), (int(tw * zoom), int(th * zoom)), Image.LANCZOS, centering=focus)
    if zoom > 1:
        x0 = int(np.clip(focus[0] * im.width - tw / 2, 0, im.width - tw))
        y0 = int(np.clip(focus[1] * im.height - th / 2, 0, im.height - th))
        im = im.crop((x0, y0, x0 + tw, y0 + th))
    a = np.asarray(im, dtype=np.float32) / 255
    # contrast around mid grey, saturation, colour cast toward the sign
    a = (a - 0.5) * STYLE["contrast"] + 0.5
    lum = a @ np.array([0.299, 0.587, 0.114], dtype=np.float32)
    a = lum[..., None] + (a - lum[..., None]) * STYLE["saturation"]
    # half-strength sign cast, then darken the mids (the reference lives in deep blacks)
    a *= 1 + (np.array(mult, dtype=np.float32) - 1) * 0.5
    a = np.clip(a, 0, 1) ** STYLE["gamma"]
    # bloom: blurred highlights screened back in
    hi = np.clip((a - 0.6) / 0.4, 0, 1)
    blur = np.asarray(Image.fromarray((hi * 255).astype(np.uint8)).filter(
        ImageFilter.GaussianBlur(W / 40)), dtype=np.float32) / 255
    a = 1 - (1 - a) * (1 - blur * STYLE["glow"])
    # lift blacks a hair, film-like
    a = a * 0.97 + 0.01
    return (np.clip(a, 0, 1) * 255).astype(np.uint8)


def make_grain(W, H, n, rng):
    gs = STYLE["grain_size"]
    gw, gh = int(W / gs), int(H / gs)
    out = []
    for _ in range(n):
        g = rng.normal(0, 1, (gh, gw)).astype(np.float32)
        g = np.asarray(Image.fromarray(g, mode="F").resize((W, H), Image.BILINEAR))
        chroma = rng.normal(0, 0.08, (gh, gw, 3)).astype(np.float32)
        chroma = np.stack([np.asarray(Image.fromarray(chroma[..., i], mode="F").resize((W, H), Image.BILINEAR)) for i in range(3)], -1)
        out.append(((g[..., None] + chroma) * STYLE["grain"]).astype(np.float16))
    return out


def vignette(W, H):
    y, x = np.mgrid[0:H, 0:W].astype(np.float32)
    r = np.sqrt(((x - W / 2) / (W / 2)) ** 2 + ((y - H / 2) / (H / 2)) ** 2) / np.sqrt(2)
    return (1 - STYLE["vignette"] * np.clip(r - 0.25, 0, 1) ** 1.6 / 0.75 ** 1.6)[..., None].astype(np.float32)


def card_rgba(card_img, width):
    h = int(card_img.height * width / card_img.width)
    return np.asarray(card_img.resize((width, h), Image.LANCZOS).convert("RGB"), dtype=np.float32) / 255


def paste(frame, c, cx, cy, alpha):
    """Alpha-paste c centred at (cx, cy), clipped to the frame."""
    H, W = frame.shape[:2]
    h, w = c.shape[:2]
    x0, y0 = int(cx - w / 2), int(cy - h / 2)
    fx0, fy0, fx1, fy1 = max(x0, 0), max(y0, 0), min(x0 + w, W), min(y0 + h, H)
    src = c[fy0 - y0:fy1 - y0, fx0 - x0:fx1 - x0]
    region = frame[fy0:fy1, fx0:fx1]
    region[:] = region * (1 - alpha) + src * alpha


def ease_out(t):
    return 1 - (1 - t) ** 3


def schedule(n_imgs, rng):
    """Image order for the 27 shots: one shuffled pass, repeated, like the reference."""
    perm = list(rng.permutation(n_imgs))
    seq = (perm * (SHOTS // n_imgs + 2))[:SHOTS]
    return seq


def render(sign, seed=0, preview=False, out=None, max_imgs=12, picks_path=None):
    cfg = SIGNS[sign]
    picks = json.load(open(picks_path or os.path.join(HERE, "picks", f"{sign}.json")))
    W, H = (540, 960) if preview else (1080, 1920)
    rng = np.random.default_rng(seed)

    pool = picks["images"]
    if len(pool) > max_imgs:
        idx = sorted(rng.choice(len(pool), max_imgs, replace=False))
        pool = [pool[i] for i in idx]
    print(f"[{sign}] seed {seed}: {len(pool)} images")
    bgs = []
    for it in pool:
        im = Image.open(ensure_file(it))
        bgs.append(grade(im, cfg["grade"], W, H, tuple(it.get("focus", (0.5, 0.5))), zoom=it.get("zoom", 1.0)))
    seq = schedule(len(bgs), rng)

    plate = ensure_file(picks["plate"])
    card_img = cardmod.build(sign, plate, picks["plate"].get("crop"))
    card_m = card_rgba(card_img, int(W * STYLE["card_w"]))
    card_steps = [card_rgba(card_img, int(W * s) if s else int(H * 0.996 * card_img.width / card_img.height))
                  for s in STYLE["intro_steps"]]
    grain = make_grain(W, H, 10, rng)
    vig = vignette(W, H)

    out = out or os.path.join(HERE, "out", f"{sign}-s{seed}{'-preview' if preview else ''}.mp4")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    wav = tempfile.mktemp(suffix=".wav")
    music.write_wav(wav, music.compose(sign, cfg["element"], INTRO, BEAT, TOTAL, seed))

    ff = subprocess.Popen([
        "ffmpeg", "-v", "error", "-y",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
        "-i", wav,
        "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-maxrate", "7M", "-bufsize", "14M",
        "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-shortest",
        "-movflags", "+faststart", out], stdin=subprocess.PIPE)

    n_frames = int(round(TOTAL * FPS))
    for f in range(n_frames):
        t = f / FPS
        if t < INTRO:
            frame = np.zeros((H, W, 3), np.float32)
            k = sum(t >= s for s in STYLE["intro_times"]) - 1
            paste(frame, card_steps[k], W / 2, H / 2, 1.0)
        else:
            shot = min(int((t - INTRO) / BEAT), SHOTS - 1)
            lt = (t - INTRO - shot * BEAT) / BEAT
            bg = bgs[seq[shot]]
            z = 1 + STYLE["zoom"] * lt
            # the bg is oversized; a shrinking window reads as a push-in
            bh, bw = bg.shape[:2]
            win_w, win_h = int(bw / z), int(bh / z)
            x0, y0 = (bw - win_w) // 2, (bh - win_h) // 2
            crop = Image.fromarray(bg[y0:y0 + win_h, x0:x0 + win_w]).resize((W, H), Image.BILINEAR)
            frame = np.asarray(crop, dtype=np.float32) / 255
            paste(frame, card_m, W / 2, H / 2, STYLE["card_alpha"])
            # flash on the hit, small exposure kick on every cut
            if shot == 0:
                frame += STYLE["hit_flash"] * (f - int(INTRO * FPS) < 2)
            else:
                frame *= 1 + 0.12 * np.exp(-lt * BEAT * 18)
        frame *= vig
        frame *= 1 + rng.uniform(-STYLE["flicker"], STYLE["flicker"])
        g = grain[rng.integers(len(grain))]
        # grain peaks in the mids; deep blacks stay black instead of going grey
        lum = np.clip(frame.mean(2, keepdims=True), 0, 1)
        floor = 0.35 if t >= INTRO else 0.0   # intro black stays pure black, like the ref
        frame += g.astype(np.float32) * (floor + 2.6 * lum * (1 - lum))
        ff.stdin.write((np.clip(frame, 0, 1) * 255).astype(np.uint8).tobytes())
    ff.stdin.close()
    ff.wait()
    os.remove(wav)

    # sidecar: caption + credits, ready to post
    with open(out.replace(".mp4", ".txt"), "w") as fh:
        fh.write(cfg["caption"] + "\n\n" + " ".join("#" + t.replace(" ", "") for t in cfg["tags"]) + "\n\n")
        fh.write("Imagery:\n")
        for it in [picks["plate"]] + pool:
            fh.write(f"- {it.get('title','')[:80]} / {it.get('creator','')[:40]} / {it.get('license','')} / {it.get('landing','')}\n")
    print(out)
    return out


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("sign")
    ap.add_argument("--seed", type=int, default=0)
    ap.add_argument("--preview", action="store_true")
    ap.add_argument("--out")
    ap.add_argument("--picks", help="alternate picks file")
    a = ap.parse_args()
    render(a.sign, a.seed, a.preview, a.out, picks_path=a.picks)
