"""Original score for the star pause challenge (numpy only).
A low pad, a ticking pulse that speeds up each round, a riser into each round and a
soft hit when a round starts. Nothing marks the aligned frame: the ear can't help you.
usage: python3 score.py reel.json out.wav"""
import json, sys, wave
import numpy as np

SR = 48000
cfg = json.load(open(sys.argv[1]))
starts, t = [], cfg["intro"]
for rd in cfg["rounds"]:
    starts.append(t); t += rd["dur"]
outro = t; total = t + cfg["outro"]
n = int(total * SR); ts = np.arange(n) / SR
mix = np.zeros((n, 2))

def add(sig, at, pan=0.0):
    i = int(at * SR); j = min(n, i + len(sig))
    if j <= i: return
    mix[i:j, 0] += sig[: j - i] * (1 - pan) ** 0.5 * 0.9
    mix[i:j, 1] += sig[: j - i] * (1 + pan) ** 0.5 * 0.9

hz = lambda m: 440 * 2 ** ((m - 69) / 12)
rng = np.random.default_rng(3)

# pad: Dmaj9-ish → Bm9 → Gmaj7 → A, slow detuned saws, low-passed by averaging
chords = [[50, 57, 62, 64, 69], [47, 54, 62, 66, 69], [43, 50, 59, 62, 66], [45, 52, 61, 64, 69]]
seg = total / len(chords)
for k, ch in enumerate(chords):
    L = int(seg * SR) + SR; tt = np.arange(L) / SR
    env = np.minimum(1, tt / 1.2) * np.minimum(1, np.maximum(0, (L / SR - tt) / 1.2))
    s = np.zeros(L)
    for m in ch:
        for d in (-0.08, 0.08):
            f = hz(m) * 2 ** (d / 12)
            s += np.sin(2 * np.pi * f * tt) + 0.25 * np.sin(4 * np.pi * f * tt)
    add(s * env * 0.022, k * seg - 0.5 if k else 0)

# tick: a short high click on the beat, tempo rising each round
def click(f=3200, dec=0.03, amp=0.25):
    tt = np.arange(int(0.08 * SR)) / SR
    return np.sin(2 * np.pi * f * tt) * np.exp(-tt / dec) * amp

for i, (st, rd) in enumerate(zip(starts, cfg["rounds"])):
    bpm = [120, 140, 160][i % 3]; step = 60 / bpm / 2
    b, k = st, 0
    while b < st + rd["dur"] - 0.05:
        add(click(3600 if k % 4 == 0 else 2800, amp=0.22 if k % 2 == 0 else 0.12), b, 0.3 if k % 2 else -0.3)
        b += step; k += 1
    # kick on every beat
    kt = np.arange(int(0.35 * SR)) / SR
    kick = np.sin(2 * np.pi * (45 + 110 * np.exp(-kt / 0.04)) * kt) * np.exp(-kt / 0.16) * 0.55
    b = st
    while b < st + rd["dur"] - 0.05:
        add(kick, b); b += 60 / bpm

# riser (filtered noise swell) into each round and the outro
for at in starts + [outro]:
    L = int(1.1 * SR); tt = np.arange(L) / SR
    nz = rng.standard_normal(L); nz = np.convolve(nz, np.ones(6) / 6, "same")
    sw = np.sin(2 * np.pi * (300 + 900 * tt) * tt) * 0.3
    add((nz * 0.5 + sw) * (tt / 1.1) ** 2.2 * 0.18, at - 1.1)
    # impact
    L = int(1.6 * SR); tt = np.arange(L) / SR
    boom = np.sin(2 * np.pi * (38 + 60 * np.exp(-tt / 0.08)) * tt) * np.exp(-tt / 0.5) * 0.6
    shimmer = sum(np.sin(2 * np.pi * hz(m) * tt) for m in (74, 78, 81, 86)) * np.exp(-tt / 0.7) * 0.05
    add(boom + shimmer, at)

# outro: a held chord with bell partials
L = int(cfg["outro"] * SR); tt = np.arange(L) / SR
bell = sum(np.sin(2 * np.pi * hz(m) * tt) * np.exp(-tt / 1.6) for m in (62, 66, 69, 74, 78)) * 0.06
add(bell, outro + 0.05)

mix[-int(0.4 * SR):] *= np.linspace(1, 0, int(0.4 * SR))[:, None]
mix /= max(1e-9, np.abs(mix).max()) / 0.89
pcm = (mix * 32767).astype("<i2")
with wave.open(sys.argv[2], "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
