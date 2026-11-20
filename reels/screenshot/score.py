"""Original score for the screenshot reel: a slow pad that swells with the
breath, a soft tick per card during the flash, a chime as the deck stops.

  python3 score.py timeline.json out.wav
"""
import json, sys, wave
import numpy as np

SR = 44100
tl = json.load(open(sys.argv[1]))
T = tl['duration']
n = int(SR * T)
t = np.arange(n) / SR
out = np.zeros(n)

def env(a, d, length):
    e = np.ones(length)
    ai, di = int(a * SR), int(d * SR)
    e[:ai] = np.linspace(0, 1, ai) if ai else 1
    if di: e[-di:] *= np.linspace(1, 0, di)
    return e

def hz(m): return 440 * 2 ** ((m - 69) / 12)

# pad: D major add9 voicing, slowly detuned sines with a gentle tremolo
chords = [[50, 57, 62, 66, 69, 76], [47, 54, 62, 66, 71, 73]]  # D(add9), Bm(add9)
half = n // 2
for ci, ch in enumerate(chords):
    s0, s1 = (0, half + SR) if ci == 0 else (half - SR, n)
    seg = t[s0:s1]
    tone = np.zeros(len(seg))
    for m in ch:
        f = hz(m)
        tone += np.sin(2 * np.pi * f * seg) + .5 * np.sin(2 * np.pi * f * 1.003 * seg)
    tone *= (.85 + .15 * np.sin(2 * np.pi * .23 * seg)) / len(ch)
    out[s0:s1] += .16 * tone * env(2.0, 2.0, len(seg))

# breath: filtered noise swelling in and out
scene = {s['id']: s for s in tl['scenes']}
b = scene['breath']
bi, bo = int(b['start'] * SR), int(b['end'] * SR)
rng = np.random.default_rng(3)
noise = np.convolve(rng.standard_normal(bo - bi), np.ones(60) / 60, 'same')
out[bi:bo] += .5 * noise * np.sin(np.pi * np.linspace(0, 1, bo - bi)) ** 2

def bell(at, midi, amp, dec=1.6):
    i = int(at * SR)
    L = min(n - i, int(SR * dec * 2))
    if L <= 0: return
    x = np.arange(L) / SR
    f = hz(midi)
    v = np.sin(2 * np.pi * f * x) + .35 * np.sin(2 * np.pi * f * 2.76 * x) + .2 * np.sin(2 * np.pi * f * 5.4 * x)
    out[i:i + L] += amp * v * np.exp(-x / dec * 3)

# ticks per card: a short high pluck, notes walking a pentatonic
f = scene['flash']
pent = [74, 76, 78, 81, 83, 86]
k = 0
at = f['start']
while at < f['end'] - 1e-6:
    bell(at, pent[k % len(pent)], .05, .18)
    k += 1
    at += tl['card_sec']

# chimes on scene changes
bell(scene['stop']['start'] + .05, 81, .14, 2.0)
bell(scene['ready']['start'], 78, .10, 2.0)
bell(f['start'], 86, .10, 1.2)
bell(scene['reveal']['start'], 74, .16, 2.4); bell(scene['reveal']['start'] + .12, 81, .10, 2.4)
bell(scene['comment']['start'], 78, .12, 2.0)
bell(scene['end']['start'], 74, .14, 3.0); bell(scene['end']['start'] + .18, 78, .10, 3.0); bell(scene['end']['start'] + .36, 81, .10, 3.0)

out *= env(.05, 1.2, n)
out = out / max(1e-9, np.abs(out).max()) * .85
stereo = np.stack([out, np.roll(out, 220)], 1)
pcm = (stereo * 32767).astype('<i2')
with wave.open(sys.argv[2], 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
