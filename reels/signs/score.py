"""Music for Align Signs: eight styles, each with its own tempo, mood and instruments.

  python3 score.py piano 20 3 /tmp/x.wav      # style, seconds, seed, out path (listen to one)
  python3 score.py --all 16                   # one of every style into out/music/

Styles
  piano     felt piano: broken chords and a slow melody, room reverb (66-80 bpm)
  lofi      dusty Rhodes 7ths, swung hats, soft kick and snare, vinyl crackle (70-86 bpm)
  rnb       slow Rhodes, deep sub bass, finger snaps on 2 and 4 (62-72 bpm)
  guitar    nylon-string fingerpicking with a soft bass (78-96 bpm)
  musicbox  music-box melody over a warm pad (88-108 bpm)
  ambient   slow string swells and far-off bells, no beat (56-66 bpm)
  dream     the Visions synth: pads and a plucked arpeggio, no drums (120 bpm)
  pulse     the Visions synth with its kick, clap and hats (120 bpm)

Every style picks its key, major or minor, chord loop, melody and tone from the seed, so
no two reels match. pick(seed, salt) chooses a style when the reel doesn't name one.
"""
import os
import sys
import zlib

import numpy as np

import music
from music import SR, add, fade_end, highpass_fast, hz, lowpass_fast, reverb

MAJOR = [0, 2, 4, 5, 7, 9, 11]
MINOR = [0, 2, 3, 5, 7, 8, 10]
PROGS = {
    "major": [[0, 4, 5, 3], [0, 5, 3, 4], [3, 4, 0, 5], [0, 3, 5, 4], [5, 3, 0, 4], [0, 2, 3, 4], [3, 0, 4, 5]],
    "minor": [[0, 5, 2, 6], [0, 3, 6, 2], [0, 6, 5, 6], [5, 6, 0, 0], [0, 3, 4, 0], [0, 5, 3, 4]],
}
STYLES = {
    #            bpm range   P(major)  gain
    "piano":    ((66, 80),   0.55),
    "lofi":     ((70, 86),   0.45),
    "rnb":      ((62, 72),   0.35),
    "guitar":   ((78, 96),   0.6),
    "musicbox": ((88, 108),  0.7),
    "ambient":  ((56, 66),   0.4),
    "dream":    ((120, 120), 0.0),
    "pulse":    ((120, 120), 0.0),
}
ORDER = list(STYLES)


def pick(seed, salt):
    """A style for this reel: spread evenly, different for every (reel, seed)."""
    return ORDER[zlib.crc32(f"{salt}:{seed}".encode()) % len(ORDER)]


# ---------------------------------------------------------------- harmony

class Key:
    def __init__(self, rng, p_major, center=(52, 60)):
        self.major = rng.random() < p_major
        self.scale = MAJOR if self.major else MINOR
        self.root = int(rng.integers(*center))
        self.prog = PROGS["major" if self.major else "minor"][int(rng.integers(len(PROGS["major" if self.major else "minor"])))]

    def note(self, d, octave=0):
        return self.root + 12 * octave + self.scale[d % 7] + 12 * (d // 7)

    def chord(self, d, seventh=False, ninth=False):
        ks = [0, 2, 4] + ([6] if seventh else []) + ([8] if ninth else [])
        return [self.note(d + k) for k in ks]


def voice(notes, lo):
    """Closest-position voicing from lo upward."""
    return sorted(lo + (n - lo) % 12 for n in notes)


# ---------------------------------------------------------------- instruments

def _env(n, a, d):
    t = np.arange(n) / SR
    return np.minimum(1, t / a) * np.exp(-t / d), t


def piano(f, dur, vel=1.0):
    n = int((dur + 1.2) * SR)
    t = np.arange(n) / SR
    s = np.zeros(n)
    B = 0.0004  # a touch of string inharmonicity
    for h, amp in enumerate((1.0, 0.55, 0.28, 0.16, 0.09, 0.05, 0.03), start=1):
        fh = f * h * np.sqrt(1 + B * h * h)
        if fh > 9000:
            break
        s += amp * np.sin(2 * np.pi * fh * t) * np.exp(-t * (1.2 + 0.9 * h) * (f / 260) ** 0.3)
    hammer = np.random.default_rng(int(f)).normal(0, 1, n) * np.exp(-t / 0.004) * 0.05
    env = np.minimum(1, t / 0.004) * np.clip((dur + 1.2 - t) / 0.3, 0, 1)
    return fade_end((s + hammer) * env * vel * 0.35, 30)


def rhodes(f, dur, vel=1.0):
    """Two-operator FM electric piano: a sine carrier with a decaying 1:1 modulator for the
    bark, and a faint 14:1 tine for the bell."""
    n = int((dur + 0.8) * SR)
    t = np.arange(n) / SR
    idx = 1.6 * vel * np.exp(-t / 0.35)
    tine = 0.12 * np.exp(-t / 0.08) * np.sin(2 * np.pi * f * 14 * t)
    s = np.sin(2 * np.pi * f * t + idx * np.sin(2 * np.pi * f * t)) + tine
    s *= 1 + 0.12 * np.sin(2 * np.pi * 4.5 * t)          # tremolo
    env = np.minimum(1, t / 0.003) * np.exp(-t / 1.6) * np.clip((dur + 0.8 - t) / 0.25, 0, 1)
    return fade_end(s * env * vel * 0.3, 30)


def nylon(f, dur, rng, bright=0.5):
    """Karplus-Strong plucked string, vectorized one period at a time."""
    n = int((dur + 1.0) * SR)
    N = max(2, int(round(SR / f)))
    y = np.zeros(n + N)
    y[:N] = lowpass_fast(rng.uniform(-1, 1, N), 1500 + 3500 * bright) if N > 16 else rng.uniform(-1, 1, N)
    damp = 0.996 ** (220 / f) if f > 0 else 0.996
    k = N
    while k < n + N:
        prev = y[k - N:k]
        e = min(k + N, n + N)
        seg = 0.5 * (prev + np.concatenate([[y[k - N - 1] if k - N - 1 >= 0 else 0.0], prev[:-1]]))
        y[k:e] = damp * seg[:e - k]
        k = e
    s = y[N:N + n]
    s *= np.clip((dur + 1.0 - np.arange(n) / SR) / 0.2, 0, 1)
    return fade_end(s * 0.5, 30)


def bell(f, dur, bright=1.0):
    """Music-box tine: inharmonic partials, fast decay on the top ones."""
    n = int((dur + 1.5) * SR)
    t = np.arange(n) / SR
    s = (np.sin(2 * np.pi * f * t) * np.exp(-t / 1.2)
         + 0.45 * bright * np.sin(2 * np.pi * f * 2.76 * t) * np.exp(-t / 0.35)
         + 0.2 * bright * np.sin(2 * np.pi * f * 5.4 * t) * np.exp(-t / 0.12))
    return fade_end(s * np.minimum(1, t / 0.002) * 0.3, 30)


def strings(freqs, dur, rng, attack=0.7):
    """Slow-bowed ensemble: detuned saws, low-passed, with vibrato and a long swell."""
    n = int((dur + 1.5) * SR)
    t = np.arange(n) / SR
    out = np.zeros((2, n))
    for f in freqs:
        for k, det in enumerate((-0.07, 0.0, 0.08)):
            vib = 1 + 0.003 * np.sin(2 * np.pi * rng.uniform(4.5, 5.8) * t + rng.uniform(0, 6))
            ph = 2 * np.pi * np.cumsum(f * 2 ** (det / 12) * vib) / SR
            s = sum(np.sin(h * ph) / h for h in range(1, 7))
            pan = (k - 1) * 0.6
            out[0] += s * (1 - pan)
            out[1] += s * (1 + pan)
    env = np.minimum(1, t / attack) * np.clip((dur + 1.5 - t) / 1.5, 0, 1)
    out = lowpass_fast(out * env, 2400)
    return out / (len(freqs) * 7)


def sub(f, dur):
    n = int((dur + 0.1) * SR)
    t = np.arange(n) / SR
    s = np.sin(2 * np.pi * f * t) + 0.3 * np.sin(4 * np.pi * f * t) * np.exp(-t / 0.3)  # warm, no buzz
    env = np.minimum(1, t / 0.01) * np.exp(-t / 1.4) * np.clip((dur + 0.1 - t) / 0.08, 0, 1)
    return fade_end(s * env, 30)


def snare_soft(rng):
    n = int(0.25 * SR)
    t = np.arange(n) / SR
    noise = highpass_fast(lowpass_fast(rng.normal(0, 1, n), 5000), 700) * np.exp(-t / 0.06)
    tone = np.sin(2 * np.pi * 190 * t) * np.exp(-t / 0.05)
    return fade_end(0.5 * noise + 0.4 * tone)


def snap(rng):
    n = int(0.12 * SR)
    t = np.arange(n) / SR
    return fade_end(highpass_fast(rng.normal(0, 1, n), 1800) * np.exp(-t / 0.018))


def crackle(n, rng):
    x = np.zeros(n)
    pops = rng.random(n) < 6 / SR
    x[pops] = rng.normal(0, 1, pops.sum())
    x = lowpass_fast(x, 4000) * 3 + lowpass_fast(rng.normal(0, 1, n), 1200) * 0.01
    return np.stack([x, np.roll(x, 37)])


# ---------------------------------------------------------------- melody

def melody_line(key, rng, bars, beat, steps_per_bar, rest=0.35, lo=2, hi=9):
    """A gentle stepwise line in scale degrees, landing on chord tones on the downbeat."""
    out, d = [], int(rng.integers(lo + 1, hi - 1))
    for b in range(bars):
        c = key.prog[b % 4]
        for s in range(steps_per_bar):
            if s == 0:
                tones = [c + k + 7 for k in (0, 2, 4)]
                d = min(tones, key=lambda x: abs(x - d))
            elif rng.random() < rest:
                continue
            else:
                d += int(rng.choice([-2, -1, -1, 1, 1, 2]))
                d = int(np.clip(d, lo + 5, hi + 7))
            out.append((b, s, d))
    return out


# ---------------------------------------------------------------- styles

def compose(style, total, seed=0, salt=""):
    if style in ("dream", "pulse"):
        return music.compose(total, seed=seed, theme="sign", sign=None, salt=salt, soft=(style == "dream"))
    rng = np.random.default_rng([seed, zlib.crc32(f"{style}:{salt}".encode())])
    (b0, b1), pmaj = STYLES[style]
    bpm = float(rng.uniform(b0, b1))
    beat = 60 / bpm
    bar = 4 * beat
    key = Key(rng, pmaj)
    n = int(total * SR)
    bars = int(np.ceil(total / bar)) + 1
    mix = np.zeros((2, n))
    send = np.zeros((2, n))
    S = lambda sec: int(sec * SR)  # noqa: E731

    if style == "piano":
        pattern = [[0, 1, 2, 1], [0, 2, 1, 2, 0, 2, 1, 2], [0, 1, 2, 3, 2, 1]][int(rng.integers(3))]
        for b in range(bars):
            c = key.prog[b % 4]
            bass = key.note(c) - 12
            add(mix, piano(hz(bass), bar), S(b * bar), 0.9, wrap=False)
            ch = voice(key.chord(c, seventh=rng.random() < 0.4), 55)
            step = bar / len(pattern)
            for i, p in enumerate(pattern):
                nt = ch[p % len(ch)]
                add(mix, piano(hz(nt), step * 2, 0.6 + 0.2 * rng.random()), S(b * bar + i * step), 0.55, pan=0.15, wrap=False)
        for b, s, d in melody_line(key, rng, bars, beat, 4, rest=0.55):
            add(mix, piano(hz(key.note(d)), beat * 1.5, 0.8), S(b * bar + s * beat), 0.7, pan=-0.1, wrap=False)
        mix = reverb(mix, 2.6, 0.32, rng, loop=False)

    elif style == "lofi":
        swing = 0.62
        for b in range(bars):
            c = key.prog[b % 4]
            ch = voice(key.chord(c, seventh=True, ninth=rng.random() < 0.5), 52)
            for k, nt in enumerate(ch):  # a lazy strum
                add(mix, rhodes(hz(nt), bar * 0.95), S(b * bar + k * 0.018), 0.45, pan=0.1 * (k - 1.5), wrap=False)
            add(mix, sub(hz(key.note(c) - 24), bar * 0.9), S(b * bar), 0.5, wrap=False)
            for q in range(4):
                t0 = b * bar + q * beat
                if q in (0,) or (q == 2 and rng.random() < 0.6):
                    add(mix, music.kick(f0=110, f1=45, decay=0.2), S(t0), 0.45, wrap=False)
                if q in (1, 3):
                    add(mix, snare_soft(rng), S(t0), 0.3, wrap=False)
                for e, off in enumerate((0, swing)):
                    add(mix, music.hat(rng), S(t0 + off * beat), 0.06 if e else 0.08, pan=0.25, wrap=False)
        for b, s, d in melody_line(key, rng, bars, beat, 4, rest=0.6):
            add(mix, rhodes(hz(key.note(d) + 12), beat), S(b * bar + s * beat), 0.25, pan=-0.2, wrap=False)
        mix = reverb(mix, 1.6, 0.2, rng, loop=False)
        mix = lowpass_fast(mix, 3800) + crackle(n, rng) * 0.05

    elif style == "rnb":
        for b in range(bars):
            c = key.prog[b % 4]
            ch = voice(key.chord(c, seventh=True, ninth=True), 53)
            for k, nt in enumerate(ch):
                add(mix, rhodes(hz(nt), bar * 0.5, 0.8), S(b * bar + k * 0.01), 0.4, pan=0.12 * (k - 2), wrap=False)
                if rng.random() < 0.5:
                    add(mix, rhodes(hz(nt), bar * 0.4, 0.6), S(b * bar + 2.5 * beat + k * 0.01), 0.3, wrap=False)
            root = key.note(c) - 24
            for pos, L in ((0, 1.5), (1.75, 0.5), (2.5, 1.2)):
                add(mix, sub(hz(root), L * beat), S(b * bar + pos * beat), 0.7, wrap=False)
            add(mix, music.kick(f0=95, f1=42, decay=0.25), S(b * bar), 0.5, wrap=False)
            add(mix, music.kick(f0=95, f1=42, decay=0.25), S(b * bar + 2.5 * beat), 0.35, wrap=False)
            for q in (1, 3):
                sn = snap(rng)
                add(mix, sn, S(b * bar + q * beat), 0.35, pan=0.2, wrap=False)
                add(send, sn, S(b * bar + q * beat), 0.35, wrap=False)
        mix = reverb(mix, 1.8, 0.22, rng, loop=False) + reverb(send, 1.2, 1.0, rng, loop=False) * 0.25

    elif style == "guitar":
        pick_pat = [[0, 2, 1, 3, 0, 2, 1, 3], [0, 3, 2, 3, 1, 3, 2, 3], [0, 1, 2, 3, 2, 1, 2, 3]][int(rng.integers(3))]
        bright = float(rng.uniform(0.3, 0.7))
        for b in range(bars):
            c = key.prog[b % 4]
            ch = voice(key.chord(c), 52) + [key.note(c) + 12]
            bass = key.note(c) - 12
            for i, p in enumerate(pick_pat):
                t0 = b * bar + i * beat / 2
                if i in (0, 4):
                    add(mix, nylon(hz(bass if i == 0 else bass + 7), beat * 2, rng, bright), S(t0), 0.5, pan=-0.1, wrap=False)
                add(mix, nylon(hz(ch[p % len(ch)] + 12 * (p == 3)), beat * 1.5, rng, bright), S(t0 + 0.006), 0.42,
                    pan=0.2, wrap=False)
        mix = reverb(mix, 1.8, 0.25, rng, loop=False)

    elif style == "musicbox":
        pad = np.zeros((2, n))
        for b in range(bars):
            c = key.prog[b % 4]
            add(pad, music.pad_note([hz(x) for x in voice(key.chord(c), 52)], S(bar + 0.4), rng, 0.7, 0.6, 0.8),
                S(b * bar), 1.0, wrap=False)
        mix += lowpass_fast(pad, 1800) * 1.2
        for b, s, d in melody_line(key, rng, bars, beat, 8, rest=0.3, lo=4, hi=12):
            add(mix, bell(hz(key.note(d) + 12), beat), S(b * bar + s * beat / 2), 0.55, pan=0.2 * np.sin(s), wrap=False)
        mix = reverb(mix, 2.2, 0.3, rng, loop=False)

    elif style == "ambient":
        for b in range(0, bars, 2):
            c = key.prog[(b // 2) % 4]
            ch = voice(key.chord(c, ninth=True), 50)
            add(mix, strings([hz(x) for x in ch], bar * 2, rng), S(b * bar), 1.0, wrap=False)
            add(mix, strings([hz(key.note(c) - 12)], bar * 2, rng, attack=1.0), S(b * bar), 0.5, wrap=False)
        for b in range(bars):
            if rng.random() < 0.6:
                d = key.prog[b % 4] + int(rng.choice([0, 2, 4])) + 14
                add(mix, bell(hz(key.note(d)), beat * 2, 0.5), S(b * bar + rng.integers(0, 4) * beat), 0.25,
                    pan=float(rng.uniform(-0.5, 0.5)), wrap=False)
        mix = reverb(mix, 3.5, 0.45, rng, loop=False)

    mix = highpass_fast(mix, 30)
    mix /= np.abs(mix).max() + 1e-9
    mix = np.tanh(mix * 1.3) / np.tanh(1.3)
    return (mix * 0.8).astype(np.float32)


if __name__ == "__main__":
    if sys.argv[1] == "--all":
        secs = float(sys.argv[2]) if len(sys.argv) > 2 else 16
        d = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out", "music")
        os.makedirs(d, exist_ok=True)
        for st in ORDER:
            p = os.path.join(d, f"{st}.wav")
            music.write_wav(p, compose(st, secs, 1, "demo"))
            print(music.master(p))
    else:
        st, secs, seed, path = sys.argv[1], float(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
        music.write_wav(path, compose(st, secs, seed, "demo"))
        print(music.master(path))
