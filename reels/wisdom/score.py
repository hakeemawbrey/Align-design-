"""An original, soft chiptune bed for an Align Wisdom reel: a slow square-wave
arpeggio and a triangle bass on a gentle progression, a pulse pad, and the
reel's cues on top: a tiny blip as each word types into the dialogue box, a
page-turn chirp per page, and a coin chime when the send-off lands.

Each sign has its own key (Aries in C, Taurus in C sharp, round the wheel),
and the seed picks the progression and the arpeggio shape, so no two reels
sound the same. Everything is synthesised, so it is safe to post.

    python3 score.py <cues.json> <out.wav>

cues.json: {"duration": 24.1, "sign": 7, "seed": 3, "pages": [..], "words": [..], "coin": 22.3}
"""
import json
import sys
import wave

import numpy as np

SR = 44100
MAJOR = [0, 2, 4, 5, 7, 9, 11]
MINOR = [0, 2, 3, 5, 7, 8, 10]
PROGS = [[0, 5, 3, 4], [0, 3, 5, 4], [0, 4, 5, 3], [5, 3, 0, 4], [0, 5, 1, 4]]
SHAPES = [[0, 1, 2, 1], [0, 1, 2, 3, 2, 1], [0, 2, 1, 2], [2, 1, 0, 1, 2, 3]]
# water and earth signs lean minor and slower, fire and air brighter
ELEMENT = ['fire', 'earth', 'air', 'water'] * 3
TARGET_RMS = 0.03


def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def env(n, a=0.005, r=0.2):
    t = np.arange(n) / SR
    e = np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / max(r, 1e-4))
    return e


def square(f, n, duty=0.5):
    ph = (np.arange(n) * f / SR) % 1
    return np.where(ph < duty, 1.0, -1.0)


def tri(f, n):
    ph = (np.arange(n) * f / SR) % 1
    return 4 * np.abs(ph - 0.5) - 1


def soften(x, k=0.25):
    # a one-pole low-pass (as a short exponential kernel), so the squares are warm, not harsh
    n = int(6 / k) + 1
    ker = k * (1 - k) ** np.arange(n)
    return np.convolve(x, ker)[: len(x)]


def add(buf, sig, t):
    i = int(t * SR)
    if i >= len(buf) or i + len(sig) <= 0:
        return
    j = min(len(buf), i + len(sig))
    buf[max(0, i):j] += sig[max(0, -i):j - i]


def main():
    cues = json.load(open(sys.argv[1]))
    D = cues['duration']
    rs = np.random.default_rng(cues['sign'] * 1000 + cues['seed'])
    el = ELEMENT[cues['sign']]
    scale = MINOR if (el in ('water', 'earth') and rs.random() < 0.6) else MAJOR
    tonic = 60 + cues['sign']
    if tonic > 66:
        tonic -= 12
    bpm = {'fire': 92, 'air': 88, 'earth': 76, 'water': 72}[el] + int(rs.integers(-4, 5))
    beat = 60 / bpm
    prog = PROGS[int(rs.integers(len(PROGS)))]
    shape = SHAPES[int(rs.integers(len(SHAPES)))]

    def pitch(d, oct=0):
        return tonic + scale[d % 7] + 12 * (d // 7) + 12 * oct

    n = int((D + 1) * SR)
    L = np.zeros(n)
    Rr = np.zeros(n)
    bar = beat * 4
    t = 0.0
    k = 0
    while t < D:
        deg = prog[k % len(prog)]
        ch = [pitch(deg), pitch(deg + 2), pitch(deg + 4), pitch(deg + 7)]
        # bass: triangle on beats one and three
        for b in (0, 2):
            m = int(beat * 1.8 * SR)
            s = tri(hz(ch[0] - 24), m) * env(m, 0.01, 0.5) * 0.22
            add(L, s, t + b * beat)
            add(Rr, s, t + b * beat)
        # arpeggio: eighth notes, soft square, panned gently side to side
        steps = 8
        for i in range(steps):
            note = ch[shape[i % len(shape)]] + 12
            m = int(beat * 0.9 * SR)
            s = soften(square(hz(note), m, 0.25), 0.18) * env(m, 0.004, 0.18) * 0.07
            pan = 0.5 + 0.25 * np.sin(i * 0.8)
            add(L, s * (1 - pan) * 1.4, t + i * beat / 2)
            add(Rr, s * pan * 1.4, t + i * beat / 2)
        # pad: a quiet detuned pulse chord with a slow swell
        m = int(bar * SR)
        sw = np.sin(np.linspace(0, np.pi, m)) ** 1.5
        pad = sum(soften(square(hz(p) * det, m, 0.5), 0.05) for p in ch[:3] for det in (0.997, 1.003)) * sw * 0.012
        add(L, pad, t)
        add(Rr, pad, t)
        t += bar
        k += 1

    # cues: a blip per word, a chirp per page, a coin at the end
    for i, w in enumerate(cues['words']):
        m = int(0.05 * SR)
        f = hz(pitch([0, 2, 4, 2, 1, 4][i % 6], 2))
        s = soften(square(f, m, 0.5), 0.35) * env(m, 0.002, 0.02) * 0.05
        add(L, s, w)
        add(Rr, s, w)
    for p in cues['pages']:
        for j, d in enumerate((4, 7)):
            m = int(0.07 * SR)
            s = soften(square(hz(pitch(d, 1)), m, 0.125), 0.3) * env(m, 0.002, 0.05) * 0.07
            add(L, s, p - 0.34 + j * 0.06)
            add(Rr, s, p - 0.34 + j * 0.06)
    c = cues.get('coin')
    if c:
        for j, d in enumerate((4, 9)):
            m = int(0.5 * SR)
            s = soften(square(hz(pitch(d, 2)), m, 0.5), 0.3) * env(m, 0.002, 0.18 if j else 0.06) * 0.08
            add(L, s, c + j * 0.08)
            add(Rr, s, c + j * 0.08)

    out = np.stack([L, Rr], 1)[: int(D * SR)]
    # fade in and out
    f = int(0.4 * SR)
    out[:f] *= np.linspace(0, 1, f)[:, None]
    out[-int(1.2 * SR):] *= np.linspace(1, 0, int(1.2 * SR))[:, None]
    rms = np.sqrt(np.mean(out ** 2)) + 1e-9
    out *= TARGET_RMS / rms
    out = np.clip(out, -0.98, 0.98)
    with wave.open(sys.argv[2], 'wb') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((out * 32767).astype('<i2').tobytes())


if __name__ == '__main__':
    main()
