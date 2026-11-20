"""An original ambient bed for the screenshot reels: a slow, warm pad chord,
a high shimmer that swells as the deck starts flicking, and a soft chime when
the first card turns. Everything is synthesised with numpy, so it's safe to post.

    python3 score.py cues.json out.wav
cues.json: {"duration": 12, "intro": 1.1, "seed": 123}
"""
import json
import sys
import wave

import numpy as np

SR = 44100


def env(n, a, r):
    e = np.ones(n)
    a, r = int(a * SR), int(r * SR)
    e[:a] = np.linspace(0, 1, a)
    e[-r:] = np.linspace(1, 0, r)
    return e


def tone(f, n, rng, det=0.003):
    t = np.arange(n) / SR
    out = np.zeros(n)
    for d in (-det, 0, det):
        ph = rng.random() * 2 * np.pi
        out += np.sin(2 * np.pi * f * (1 + d) * t + ph)
        out += 0.25 * np.sin(2 * np.pi * 2 * f * (1 + d) * t + ph)
    return out / 3


def main():
    cues = json.load(open(sys.argv[1]))
    dur, intro = cues["duration"], cues.get("intro", 1.1)
    rng = np.random.default_rng(cues.get("seed", 1))
    n = int(dur * SR)
    t = np.arange(n) / SR
    L = np.zeros(n)
    R = np.zeros(n)

    # pad: Dmaj9 voicing, slow breathing
    for i, f in enumerate([146.83, 220.0, 277.18, 329.63, 369.99, 440.0]):
        v = tone(f, n, rng) * (0.11 if i < 2 else 0.07)
        v *= 0.8 + 0.2 * np.sin(2 * np.pi * (0.07 + 0.02 * i) * t + rng.random() * 6)
        pan = 0.5 + 0.35 * (i % 2 * 2 - 1) * (i / 6)
        L += v * (1 - pan)
        R += v * pan
    pe = env(n, 0.6, 1.0)
    L *= pe
    R *= pe

    # shimmer: high partials that swell when the cards start
    sw = np.clip((t - intro + 0.3) / 1.2, 0, 1) * env(n, 0.01, 1.2)
    for f in [1760.0, 2217.46, 2637.02, 2959.96]:
        v = tone(f, n, rng, 0.0015) * 0.018 * (0.6 + 0.4 * np.sin(2 * np.pi * rng.uniform(3, 6) * t))
        L += v * sw * rng.uniform(0.4, 1)
        R += v * sw * rng.uniform(0.4, 1)

    # chime as the first card turns
    s = int(max(0, intro - 0.02) * SR)
    m = min(n - s, int(2.5 * SR))
    tt = np.arange(m) / SR
    ch = sum(np.sin(2 * np.pi * f * tt) * a for f, a in [(1174.66, 0.22), (1760.0, 0.12), (2349.32, 0.06)])
    ch *= np.exp(-tt * 2.4)
    L[s:s + m] += ch
    R[s:s + m] += ch * 0.9

    # a touch of air
    air = rng.standard_normal(n) * 0.004
    air = np.convolve(air, np.ones(30) / 30, mode="same")
    L += air
    R += air

    st = np.stack([L, R], 1)
    st /= max(1e-9, np.abs(st).max()) / 0.8
    with wave.open(sys.argv[2], "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((st * 32767).astype(np.int16).tobytes())


if __name__ == "__main__":
    main()
