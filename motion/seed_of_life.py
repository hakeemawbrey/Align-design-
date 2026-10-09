"""Seed of Life — slow, dreamy vertical reel (1080x1920, 30fps).

python3 motion/seed_of_life.py [out.mp4] [--preview]
"""
import math, subprocess, sys, wave
from multiprocessing import Pool
import numpy as np

W, H, FPS, DUR = 1080, 1920, 30, 30.0
PREVIEW = "--preview" in sys.argv
if PREVIEW:
    W, H = 540, 960
S = W / 1080                      # scale for all pixel sizes
R = 210 * S                       # seed circle radius
CX, CY = W / 2, H / 2

# Stardust palette (linear-ish 0..1)
def hexc(h): return np.array([int(h[i:i+2], 16) / 255 for i in (1, 3, 5)], np.float32)
BG_DEEP, BG_MID = hexc("#0b0620"), hexc("#1a0f3a")
GOLD, CREAM = hexc("#f2c75c"), hexc("#fff4cf")
PINK, CYAN, VIOLET = hexc("#ff6ad5"), hexc("#6ad5ff"), hexc("#b18cff")

def ease(x):  # smooth in-out
    x = np.clip(x, 0, 1); return x * x * (3 - 2 * x)
def ease_io(x):
    x = min(max(x, 0.0), 1.0); return 0.5 - 0.5 * math.cos(math.pi * x)
def win(t, a, b): return min(max((t - a) / (b - a), 0.0), 1.0)

yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
X, Y = xx - CX, yy - CY

# --- static layers ---------------------------------------------------------
rng = np.random.default_rng(7)
def smooth_noise(scale, seed, H=H + 400, W=W + 400):
    r = np.random.default_rng(seed)
    gh, gw = int(H / scale) + 3, int(W / scale) + 3
    g = r.random((gh, gw)).astype(np.float32)
    # bicubic-ish upsample via separable interpolation
    yi = np.linspace(0, gh - 3, H); xi = np.linspace(0, gw - 3, W)
    y0 = yi.astype(int); x0 = xi.astype(int)
    fy = ease(yi - y0)[:, None]; fx = ease(xi - x0)[None, :]
    a = g[y0][:, x0]; b = g[y0][:, x0 + 1]; c = g[y0 + 1][:, x0]; d = g[y0 + 1][:, x0 + 1]
    return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy
NEB1 = smooth_noise(260 * S, 1) * 0.6 + smooth_noise(110 * S, 2) * 0.4
NEB2 = smooth_noise(300 * S, 3) * 0.6 + smooth_noise(130 * S, 4) * 0.4
RAD = np.sqrt(X**2 + Y**2) / (H * 0.6)
VIGNETTE = np.clip(1.15 - RAD**1.6 * 0.9, 0.25, 1)[..., None]

NSTARS = 260
STARS = np.column_stack([rng.random(NSTARS) * W, rng.random(NSTARS) * H,
                         rng.random(NSTARS) ** 3 * 1.6 * S + 0.6 * S,  # size
                         rng.random(NSTARS) * 6.28, rng.random(NSTARS) * 1.2 + 0.3])  # phase, speed
NDUST = 70
DUST = np.column_stack([rng.random(NDUST) * W, rng.random(NDUST) * H,
                        rng.random(NDUST) * 7 * S + 3 * S, rng.random(NDUST) * 6.28,
                        rng.random(NDUST) * 14 * S + 6 * S, rng.random(NDUST)])

def blob(img, x, y, rad, col, amp):
    r = int(rad * 4) + 2
    x0, x1 = max(int(x) - r, 0), min(int(x) + r, W)
    y0, y1 = max(int(y) - r, 0), min(int(y) + r, H)
    if x0 >= x1 or y0 >= y1: return
    d2 = (xx[y0:y1, x0:x1] - x) ** 2 + (yy[y0:y1, x0:x1] - y) ** 2
    img[y0:y1, x0:x1] += (amp * np.exp(-d2 / (2 * rad * rad)))[..., None] * col

# --- timeline --------------------------------------------------------------
T_CENTER = (1.8, 5.2)
T_PETAL0, T_PETAL_STEP, T_PETAL_LEN = 5.0, 1.9, 2.8
T_OUTER = (17.6, 21.6)
T_FADE_OUT = (28.0, 30.0)

def circle_layer(img, cx, cy, rad, prog, start_ang, col, t, bright=1.0):
    """Glowing circle stroke drawn from start_ang over fraction prog, with a pen-tip spark."""
    if prog <= 0: return
    dx, dy = xx - cx, yy - cy
    dist = np.sqrt(dx * dx + dy * dy)
    d = np.abs(dist - rad)
    core = np.exp(-(d / (1.25 * S)) ** 2)
    glow = 0.28 / (1 + (d / (9 * S)) ** 2) + 0.10 / (1 + (d / (40 * S)) ** 2)
    a = core + glow
    if prog < 1:
        ang = (np.arctan2(dy, dx) - start_ang) % (2 * np.pi) / (2 * np.pi)
        tail = np.clip((prog - ang) / 0.05, 0, 1)            # soft trailing edge
        a = a * np.where(ang <= prog, 0.55 + 0.45 * tail, 0)
        hx = cx + rad * math.cos(start_ang + prog * 2 * math.pi)
        hy = cy + rad * math.sin(start_ang + prog * 2 * math.pi)
        blob(img, hx, hy, 5 * S, CREAM, 1.6)
        blob(img, hx, hy, 22 * S, col, 0.35)
    img += (a * bright)[..., None] * col

def frame(i):
    t = i / FPS
    img = np.zeros((H, W, 3), np.float32)

    # background: deep gradient + drifting nebula
    bg_in = ease_io(win(t, 0, 2.5))
    o1, o2 = int(t * 6 * S), int(t * 4 * S)   # slow drift, no wrap seams
    n1 = NEB1[200:200 + H, o1:o1 + W]; n2 = NEB2[o2:o2 + H, 200:200 + W]
    base = BG_DEEP + (BG_MID - BG_DEEP) * np.clip(1 - RAD, 0, 1)[..., None]
    img += base * bg_in
    img += (n1 ** 3)[..., None] * VIOLET * 0.16 * bg_in
    img += (n2 ** 3)[..., None] * PINK * 0.07 * bg_in

    for sx, sy, sz, ph, sp in STARS:
        tw = 0.55 + 0.45 * math.sin(t * sp * 2 + ph)
        blob(img, sx, (sy - t * 3 * S) % H, sz, CREAM, 0.55 * tw * bg_in)

    # pattern transform: slow rotation + breathing
    rot = 0.0
    if t > 18: rot = (t - 18) ** 1.6 * 0.006
    breathe = 1 + 0.012 * math.sin(t * 0.9) * win(t, 17, 20)
    r = R * breathe
    k_bloom = ease_io(win(t, 19, 23))
    hue = t * 0.15

    # aura behind the flower
    aura = ease_io(win(t, 3, 12)) * (0.8 + 0.2 * math.sin(t * 0.7))
    rr = np.sqrt(X * X + Y * Y)
    img += (np.exp(-(rr / (r * 1.9)) ** 2) * 0.22 * aura)[..., None] * VIOLET
    img += (np.exp(-(rr / (r * 0.8)) ** 2) * 0.12 * aura)[..., None] * GOLD

    centers = [(CX + r * math.cos(rot + k * math.pi / 3 - math.pi / 2),
                CY + r * math.sin(rot + k * math.pi / 3 - math.pi / 2)) for k in range(6)]

    # petals of the hexafoil: petal k is the lens of circles k-1 and k+1,
    # running from the centre point out to circle k's centre
    rel = [(cx - CX, cy - CY) for cx, cy in centers]
    dks = [np.sqrt((X - ox) ** 2 + (Y - oy) ** 2) - r for ox, oy in rel]
    for k in range(6):
        start = T_PETAL0 + ((k + 1) % 6) * T_PETAL_STEP
        if k == 5: start = T_PETAL0 + 5 * T_PETAL_STEP
        f = ease_io(win(t, start + T_PETAL_LEN - 0.4, start + T_PETAL_LEN + 2.4))
        if f <= 0: continue
        sd = np.maximum(dks[(k - 1) % 6], dks[(k + 1) % 6])
        inside = np.clip(-sd / (22 * S), 0, 1)
        edge = np.exp(-(sd / (5 * S)) ** 2) * 0.25
        m = 0.5 + 0.5 * math.sin(hue + k * 1.05)
        col = PINK * m + CYAN * (1 - m)
        col = col * (1 - 0.35 * k_bloom) + GOLD * 0.35 * k_bloom
        a = (inside ** 1.2 * 0.42 + edge * (sd < 0)) * f * (0.85 + 0.15 * math.sin(t * 1.3 + k))
        img += a[..., None] * col

    # centre point + centre circle
    blob(img, CX, CY, 6 * S, CREAM, ease_io(win(t, 1.2, 2.4)) * 1.3)
    blob(img, CX, CY, 26 * S, GOLD, ease_io(win(t, 1.2, 2.4)) * 0.3)
    circle_layer(img, CX, CY, r, ease_io(win(t, *T_CENTER)), -math.pi / 2 + rot, GOLD, t)

    # six circles, each drawn starting at the centre point
    for k, (cx, cy) in enumerate(centers):
        start = T_PETAL0 + k * T_PETAL_STEP
        p = ease_io(win(t, start, start + T_PETAL_LEN))
        a0 = math.atan2(CY - cy, CX - cx)
        circle_layer(img, cx, cy, r, p, a0, GOLD, t)
        blob(img, cx, cy, 4 * S, CREAM, 0.9 * ease_io(win(t, start - 0.3, start + 0.6)))

    # enclosing circle
    circle_layer(img, CX, CY, 2 * r, ease_io(win(t, *T_OUTER)), -math.pi / 2 + rot,
                 GOLD * 0.8 + CREAM * 0.2, t, bright=0.8)

    # rising dust / bokeh
    for dx_, dy_, sz, ph, sp, c in DUST:
        y = (dy_ - t * sp) % (H + 60) - 30
        x = dx_ + math.sin(t * 0.4 + ph) * 18 * S
        col = PINK if c < 0.3 else (CYAN if c < 0.55 else GOLD)
        blob(img, x, y, sz, col, 0.10 * (0.6 + 0.4 * math.sin(t + ph)) * bg_in)

    # gentle overall shimmer pulse once complete
    img *= 1 + 0.08 * k_bloom * math.sin(t * 1.1)

    # tone map, vignette, fade, grain
    img = 1 - np.exp(-img * 1.35)
    img *= VIGNETTE
    img *= 1 - ease_io(win(t, *T_FADE_OUT))
    img += (np.random.default_rng(i).random((H, W, 1), np.float32) - 0.5) * 0.018
    return (np.clip(img, 0, 1) ** (1 / 1.05) * 255).astype(np.uint8).tobytes()

# --- ambient pad -----------------------------------------------------------
def write_audio(path):
    sr = 44100; n = int(sr * DUR); t = np.arange(n) / sr
    out = np.zeros(n)
    # Dmaj9-ish drone, each voice with slow tremolo + detune
    for f, a in [(73.42, .30), (110.0, .22), (146.83, .18), (185.0, .12),
                 (220.0, .10), (277.18, .07), (329.63, .05), (440.0, .03)]:
        for det in (-0.25, 0.25):
            lfo = 0.6 + 0.4 * np.sin(2 * np.pi * (0.05 + f / 4000) * t + f)
            out += a * lfo * np.sin(2 * np.pi * (f + det) * t)
    # chime on each circle start
    times = [T_CENTER[0]] + [T_PETAL0 + k * T_PETAL_STEP for k in range(6)] + [T_OUTER[0]]
    notes = [587.33, 659.25, 739.99, 880.0, 987.77, 1108.73, 1174.66, 880.0]
    for st, f in zip(times, notes):
        idx = t >= st; tt = t[idx] - st
        out[idx] += 0.10 * np.exp(-tt * 0.9) * (np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(4 * np.pi * f * tt))
    # cheap reverb: feedback delays
    for d, g in [(0.113, .35), (0.171, .3), (0.257, .25), (0.389, .2)]:
        k = int(d * sr); out[k:] += g * out[:-k]
    env = np.minimum(1, t / 3) * np.clip((DUR - t) / 2.5, 0, 1)
    out = out * env; out /= np.abs(out).max() * 1.25
    pcm = (out * 32767).astype(np.int16)
    st = np.column_stack([pcm, np.roll(pcm, 400)]).ravel()
    with wave.open(path, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr); w.writeframes(st.tobytes())

if __name__ == "__main__":
    out = next((a for a in sys.argv[1:] if not a.startswith("--")), "seed_of_life.mp4")
    wav = out.rsplit(".", 1)[0] + "_pad.wav"
    write_audio(wav)
    ff = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24",
                           "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-", "-i", wav,
                           "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-pix_fmt", "yuv420p",
                           "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", out],
                          stdin=subprocess.PIPE)
    total = int(DUR * FPS)
    with Pool() as pool:
        for i, buf in enumerate(pool.imap(frame, range(total), chunksize=4)):
            ff.stdin.write(buf)
            if i % 60 == 0: print(f"frame {i}/{total}", flush=True)
    ff.stdin.close(); ff.wait()
    print("wrote", out)
