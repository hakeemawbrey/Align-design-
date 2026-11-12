"""An original score for an Align "How you..." reel: a light, curious
plucked groove (marimba-ish arpeggio, pizzicato bass, soft shaker) in a minor
key, plus a sound effect on every cut.

    python3 score.py <duration> <out.wav> <seed> '<cues json>'

cues: [[t, "whoosh"], [t, "pop"], ...]. Kinds: whoosh, pop, boing, thud,
ding, swell, sparkle, heartbeat, tick, rewind, outro.
Everything is synthesised here with numpy; nothing is sampled.
"""
import json
import sys
import wave

import numpy as np

SR = 44100


def env(n, a=0.005, d=0.3):
    t = np.arange(n) / SR
    e = np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)
    return e


def tone(f, dur, kind='marimba', d=0.25):
    n = int(dur * SR)
    t = np.arange(n) / SR
    if kind == 'marimba':
        y = np.sin(2 * np.pi * f * t) + 0.25 * np.sin(2 * np.pi * f * 4 * t) * np.exp(-t / 0.04)
    elif kind == 'pluck':
        y = np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * f * 2 * t) + 0.2 * np.sin(2 * np.pi * f * 3 * t)
    elif kind == 'bell':
        y = sum(a * np.sin(2 * np.pi * f * m * t) * np.exp(-t / (d / (1 + m * 0.3))) for m, a in ((1, 1), (2.76, 0.5), (5.4, 0.25), (8.9, 0.1)))
        return y * np.minimum(1, t / 0.003)
    else:
        y = np.sin(2 * np.pi * f * t)
    return y * env(n, 0.004, d)


def midi(m):
    return 440 * 2 ** ((m - 69) / 12)


def add(buf, sig, t, gain=1.0, pan=0.0):
    i = int(t * SR)
    if i >= len(buf) or i + len(sig) <= 0:
        return
    s = sig[: max(0, len(buf) - i)]
    l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
    buf[i:i + len(s), 0] += s * gain * l * 1.41
    buf[i:i + len(s), 1] += s * gain * r * 1.41


def noise(n, rs):
    return rs.standard_normal(n)


def lowpass(x, k):
    # one-pole, k in (0,1): higher = brighter
    y = np.empty_like(x)
    acc = 0.0
    for i in range(len(x)):
        acc += k * (x[i] - acc)
        y[i] = acc
    return y


def sweep_noise(dur, f0, f1, rs, up=True):
    n = int(dur * SR)
    x = noise(n, rs)
    # crude band sweep: mix of filtered noise with changing brightness
    ks = np.geomspace(f0, f1, n) / SR * 2 * np.pi
    ks = np.clip(ks, 0.001, 0.99)
    y = np.empty(n)
    acc = 0.0
    for i in range(n):
        acc += ks[i] * (x[i] - acc)
        y[i] = acc
    shape = np.sin(np.linspace(0, np.pi, n)) ** (1.5 if up else 0.8)
    return y * shape


def sfx(kind, rs):
    if kind == 'whoosh':
        return sweep_noise(0.32, 400, 5000, rs) * 0.9
    if kind == 'pop':
        n = int(0.12 * SR); t = np.arange(n) / SR
        f = 900 * np.exp(-t * 18) + 380
        return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.001, 0.05) * 0.8
    if kind == 'boing':
        n = int(0.5 * SR); t = np.arange(n) / SR
        f = 180 + 260 * t / 0.5 + 40 * np.sin(2 * np.pi * 14 * t)
        return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.003, 0.25) * 0.7
    if kind == 'thud':
        n = int(0.5 * SR); t = np.arange(n) / SR
        f = 110 * np.exp(-t * 6) + 42
        body = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.001, 0.22)
        return (body + lowpass(noise(n, rs), 0.05) * env(n, 0.001, 0.05) * 0.6) * 1.1
    if kind == 'ding':
        return (tone(midi(88), 1.4, 'bell', 0.9) + 0.6 * tone(midi(95), 1.4, 'bell', 0.6)) * 0.35
    if kind == 'sparkle':
        out = np.zeros(int(1.1 * SR))
        for k in range(9):
            s = tone(midi(84 + rs.integers(0, 14)), 0.5, 'bell', 0.25) * 0.18
            i = int(k * 0.08 * SR)
            out[i:i + len(s)] += s[: len(out) - i]
        return out
    if kind == 'swell':
        n = int(1.2 * SR); t = np.arange(n) / SR
        y = sum(np.sin(2 * np.pi * midi(m) * t) for m in (57, 64, 69, 72)) / 4
        e = np.sin(np.linspace(0, np.pi, n)) ** 2
        return (y * e * 0.5 + sweep_noise(1.2, 300, 3000, rs) * 0.25) * 0.8
    if kind == 'heartbeat':
        out = np.zeros(int(1.0 * SR))
        for i0 in (0.0, 0.22, 0.75):
            n = int(0.2 * SR); t = np.arange(n) / SR
            s = np.sin(2 * np.pi * (60 * np.exp(-t * 8) + 40) * t) * env(n, 0.002, 0.07)
            i = int(i0 * SR); out[i:i + n] += s[: len(out) - i] * (1.0 if i0 != 0.22 else 0.7)
        return out * 1.2
    if kind == 'tick':
        out = np.zeros(int(1.0 * SR))
        for k in range(4):
            n = int(0.03 * SR)
            s = noise(n, rs) * env(n, 0.0005, 0.006) * 0.8
            i = int(k * 0.22 * SR); out[i:i + n] += s
        return out
    if kind == 'rewind':
        n = int(0.7 * SR); t = np.arange(n) / SR
        f = 1400 * np.exp(-t * 3) + 200
        y = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * 0.25
        return lowpass(y, 0.2) * np.sin(np.linspace(0, np.pi, n)) * 0.8
    if kind == 'cut':
        return sweep_noise(0.16, 900, 6000, rs) * 0.6
    if kind == 'hit':
        n = int(0.7 * SR); t = np.arange(n) / SR
        boom = np.sin(2 * np.pi * np.cumsum(70 * np.exp(-t * 5) + 32) / SR) * env(n, 0.001, 0.3)
        crack = lowpass(noise(n, rs), 0.35) * env(n, 0.0005, 0.03)
        return (boom * 1.2 + crack * 0.7)
    if kind == 'outro':
        return (tone(midi(81), 2.4, 'bell', 1.4) + tone(midi(76), 2.4, 'bell', 1.2) * 0.7 + tone(midi(69), 2.4, 'bell', 1.6) * 0.6) * 0.32
    return np.zeros(1)


def main():
    dur = float(sys.argv[1])
    out = sys.argv[2]
    seed = int(sys.argv[3])
    cues = json.loads(sys.argv[4])
    rs = np.random.default_rng(seed)
    n = int((dur + 0.5) * SR)
    buf = np.zeros((n, 2))
    # a minor-key groove; the key moves with the seed so reels differ
    root = 57 + int(seed % 5) - 2
    prog = [[0, 3, 7, 10], [-4, 0, 3, 7], [-7, -3, 0, 5], [-2, 2, 5, 9]]
    bpm = 104
    beat = 60 / bpm
    step = beat / 2
    stop = cues[-1][0] if cues else dur
    t, k = 0.0, 0
    pattern = [0, 2, 1, 3, 2, 1, 3, 2]
    while t < stop:
        bar = int(k // 16)
        chord = prog[bar % 4]
        i = k % 8
        m = root + 12 + chord[pattern[i] % 4] + (12 if i in (3, 7) and rs.random() < 0.5 else 0)
        add(buf, tone(midi(m), 0.5, 'marimba', 0.18), t, 0.16, pan=0.35 if i % 2 else -0.35)
        if k % 4 == 0:
            add(buf, tone(midi(root - 12 + chord[0]), 0.6, 'pluck', 0.22), t, 0.3)
        if k % 4 == 2 and rs.random() < 0.6:
            add(buf, tone(midi(root - 12 + chord[2]), 0.4, 'pluck', 0.14), t, 0.18)
        # shaker on the off-beats
        sh = noise(int(0.05 * SR), rs) * env(int(0.05 * SR), 0.002, 0.015)
        add(buf, np.diff(sh, prepend=0), t + step * 0.5, 0.05 if k % 2 else 0.03, pan=0.2)
        if k % 8 == 4:
            sn = np.diff(noise(int(0.12 * SR), rs) * env(int(0.12 * SR), 0.001, 0.04), prepend=0)
            add(buf, sn, t, 0.05)
        t += step
        k += 1
    # a soft pad under it all
    tt = np.arange(int(stop * SR)) / SR
    pad = np.zeros_like(tt)
    for m in (root - 12, root - 5, root):
        pad += np.sin(2 * np.pi * midi(m) * tt + np.sin(2 * np.pi * 0.2 * tt) * 0.3)
    fade = np.minimum(1, tt / 1.0) * np.minimum(1, (stop - tt) / 0.4)
    buf[: len(tt), 0] += pad * fade * 0.025
    buf[: len(tt), 1] += pad * fade * 0.025
    for t0, kind in cues:
        s = sfx(kind, rs)
        g = {'whoosh': 0.35, 'pop': 0.5, 'boing': 0.45, 'thud': 0.7, 'ding': 0.5, 'swell': 0.45, 'sparkle': 0.5,
             'heartbeat': 0.8, 'tick': 0.6, 'rewind': 0.45, 'outro': 0.7, 'cut': 0.3, 'hit': 0.75}.get(kind, 0.4)
        add(buf, s, max(0, t0 - (0.12 if kind == 'whoosh' else 0.06 if kind == 'cut' else 0)), g)
    peak = np.abs(buf).max() or 1
    buf = buf / peak * 0.8
    buf = buf[: int(dur * SR)]
    with wave.open(out, 'wb') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((np.clip(buf, -1, 1) * 32767).astype('<i2').tobytes())


if __name__ == '__main__':
    main()
