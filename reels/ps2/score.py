"""An original score for one PS2 reel, synthesised with numpy.

    python3 score.py <noir|sunny> <seconds> <cues json> <out.wav>

cues is the list the engine returns: [{"t": seconds, "k": kind}, ...], where
kind is "cut", "sting" (the punchline), "reveal" (the cool walk-out) or
"end" (the Align card).

noir: a low cop-show drone, a hit on the punchline, then a slow swaggering
beat for the walk-out. sunny: a soft lo-fi loop for the storytime episodes,
which drops out for a beat on the punchline.
"""
import json
import sys
import wave

import numpy as np

SR = 44100


def hz(semi, base=110.0):
    return base * 2 ** (semi / 12)


def env(n, a, r):
    e = np.ones(n)
    ai = max(1, int(a * SR))
    e[:ai] = np.linspace(0, 1, ai)
    e *= np.exp(-np.arange(n) / (r * SR))
    return e


def saw(f, t, harmonics=8):
    return sum(np.sin(2 * np.pi * f * k * t) / k for k in range(1, harmonics + 1))


def add(buf, at, sig):
    i = int(at * SR)
    if i >= len(buf):
        return
    j = min(len(buf), i + len(sig))
    buf[i:j] += sig[: j - i]


def kick(amp=0.9):
    n = int(0.35 * SR)
    t = np.arange(n) / SR
    f = 110 * np.exp(-t * 22) + 45
    return amp * np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9)


def snare(rng, amp=0.35):
    n = int(0.22 * SR)
    t = np.arange(n) / SR
    return amp * (rng.standard_normal(n) * 0.7 + np.sin(2 * np.pi * 190 * t) * 0.5) * np.exp(-t * 18)


def hat(rng, amp=0.08):
    n = int(0.05 * SR)
    x = rng.standard_normal(n)
    x = np.diff(np.concatenate([[0], x]))
    return amp * x * np.exp(-np.arange(n) / SR * 80)


def keys(freqs, dur, amp=0.12):
    n = int(dur * SR)
    t = np.arange(n) / SR
    s = sum(np.sin(2 * np.pi * f * t) + 0.3 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t * 3) for f in freqs)
    return amp * s * env(n, 0.01, dur * 0.6)


def noir(seconds, cues, rng):
    n = int(seconds * SR)
    t = np.arange(n) / SR
    L = np.zeros(n)
    reveal = next((c['t'] for c in cues if c['k'] == 'reveal'), seconds)
    end = next((c['t'] for c in cues if c['k'] == 'end'), seconds)
    # the drone: D minor, two detuned saws, slowly breathing, until the reveal
    pre = t < reveal + 0.3
    drone = (saw(hz(-7), t, 6) + saw(hz(-7) * 1.004, t, 6)) * 0.06 + np.sin(2 * np.pi * hz(-19) * t) * 0.12
    drone *= (0.7 + 0.3 * np.sin(2 * np.pi * 0.25 * t))
    fade = np.clip((reveal + 0.3 - t) / 0.3, 0, 1)
    L += drone * pre * fade * np.clip(t / 0.4, 0, 1)
    # a high tense string, a minor second rub
    L += (np.sin(2 * np.pi * hz(17) * t) + np.sin(2 * np.pi * hz(18) * t)) * 0.012 * pre * fade
    for c in cues:
        if c['k'] == 'sting':
            m = int(2.2 * SR)
            tt = np.arange(m) / SR
            boom = np.sin(2 * np.pi * np.cumsum(70 * np.exp(-tt * 3) + 30) / SR) * np.exp(-tt * 2.2) * 0.8
            stab = sum(saw(hz(s), tt, 5) for s in [-7, -4, 0, 1]) * 0.07 * np.exp(-tt * 1.8)
            add(L, c['t'], boom + stab + rng.standard_normal(m) * 0.05 * np.exp(-tt * 12))
        elif c['k'] == 'cut' and c['t'] > 0:
            m = int(0.6 * SR)
            tt = np.arange(m) / SR
            add(L, c['t'], np.sin(2 * np.pi * hz(-19) * tt) * 0.25 * np.exp(-tt * 6))
    # the walk-out: a slow, cool beat (80 bpm) with a warm Rhodes chord
    beat = 60 / 80
    k = 0
    tt0 = reveal
    while tt0 < end:
        add(L, tt0, kick(0.8) if k % 2 == 0 else snare(rng, 0.3))
        for h in range(2):
            add(L, tt0 + h * beat / 2, hat(rng))
        if k % 4 == 0:
            add(L, tt0, keys([hz(s, 220) for s in [-4, 0, 3, 7]], beat * 4, 0.07))
            add(L, tt0, np.sin(2 * np.pi * hz(-16) * np.arange(int(beat * 4 * SR)) / SR) * 0.18 * env(int(beat * 4 * SR), 0.02, 1.5))
        tt0 += beat
        k += 1
    # the end card: a soft rising chime and pad
    m = int(max(0.1, seconds - end) * SR)
    if m > 0:
        tt = np.arange(m) / SR
        pad = sum(np.sin(2 * np.pi * hz(s, 220) * tt) for s in [-4, 3, 8, 12]) * 0.035 * np.clip(tt / 0.6, 0, 1)
        add(L, end, pad)
        for i, s in enumerate([12, 15, 19, 24]):
            add(L, end + 0.15 + i * 0.12, keys([hz(s, 220)], 1.6, 0.06))
    return L


def sunny(seconds, cues, rng):
    n = int(seconds * SR)
    L = np.zeros(n)
    sting = [c['t'] for c in cues if c['k'] == 'sting']
    end = next((c['t'] for c in cues if c['k'] == 'end'), seconds)
    beat = 60 / 88
    prog = [[5, 9, 12, 16], [4, 7, 11, 14], [2, 5, 9, 12], [0, 4, 7, 11]]
    t0 = 0.0
    k = 0
    while t0 < end:
        quiet = any(s - 0.1 <= t0 < s + beat * 2 for s in sting)
        if not quiet:
            add(L, t0, kick(0.55) if k % 4 in (0, 2) else snare(rng, 0.18))
            add(L, t0 + beat / 2, hat(rng, 0.06))
        if k % 4 == 0:
            add(L, t0, keys([hz(s, 220) for s in prog[(k // 4) % 4]], beat * 4, 0.06 if not quiet else 0.03))
            add(L, t0, np.sin(2 * np.pi * hz(prog[(k // 4) % 4][0] - 12) * np.arange(int(beat * 4 * SR)) / SR) * 0.12 * env(int(beat * 4 * SR), 0.02, 1.2))
        t0 += beat
        k += 1
    for s in sting:
        m = int(0.35 * SR)
        tt = np.arange(m) / SR
        add(L, s, np.sin(2 * np.pi * np.cumsum(600 * np.exp(-tt * 9) + 180) / SR) * 0.18 * np.exp(-tt * 7))
    m = int(max(0.1, seconds - end) * SR)
    tt = np.arange(m) / SR
    add(L, end, sum(np.sin(2 * np.pi * hz(s, 220) * tt) for s in [0, 4, 7, 11]) * 0.04 * np.clip(tt / 0.5, 0, 1))
    for i, s in enumerate([12, 16, 19, 24]):
        add(L, end + 0.15 + i * 0.12, keys([hz(s, 220)], 1.6, 0.06))
    L += rng.standard_normal(n) * 0.004  # a little tape hiss
    return L


def main():
    mode, seconds, cues, out = sys.argv[1], float(sys.argv[2]), json.loads(sys.argv[3]), sys.argv[4]
    rng = np.random.default_rng(7)
    L = noir(seconds, cues, rng) if mode == 'noir' else sunny(seconds, cues, rng)
    n = len(L)
    fade = np.ones(n)
    fo = int(0.6 * SR)
    fade[-fo:] = np.linspace(1, 0, fo)
    L = np.tanh(L * 1.2) * fade
    L /= max(1e-6, np.abs(L).max()) / 0.85
    st = np.stack([L, np.roll(L, 220) * 0.96], axis=1)
    data = (st * 32767).astype('<i2').tobytes()
    with wave.open(out, 'wb') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(data)


if __name__ == '__main__':
    main()
