"""An original score for an Align story ad, cut to the script's beats: a light
bright groove for the setup, a hushed late-night stretch with clock ticks and
swipe whooshes, a riser into a warm groove when Align arrives, a shimmer on
the reveal and a big chord on the end card. Everything is synthesised.

    python3 score.py <script.json> <out.wav>
"""
import json
import sys
import wave

import numpy as np

SR = 44100
BPM = 100
SPB = 60 / BPM


def hz(semi):
    return 220.0 * 2 ** (semi / 12)


def env(n, a=0.005, d=0.3):
    t = np.arange(n) / SR
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)


class Mix:
    def __init__(self, seconds):
        self.n = int(seconds * SR)
        self.L = np.zeros(self.n)
        self.R = np.zeros(self.n)

    def add(self, t0, sig, gain=1.0, pan=0.0):
        i = int(t0 * SR)
        if i >= self.n or i + len(sig) <= 0:
            return
        sig = sig[: self.n - i] * gain
        self.L[i:i + len(sig)] += sig * (1 - max(0, pan))
        self.R[i:i + len(sig)] += sig * (1 + min(0, pan))


def kick(dur=0.35):
    n = int(dur * SR); t = np.arange(n) / SR
    f = 45 + 90 * np.exp(-t * 28)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9)


def noise(dur, rng):
    return rng.standard_normal(int(dur * SR))


def hat(rng, dur=0.06):
    s = np.diff(noise(dur + 1 / SR, rng)); return s * env(len(s), 0.001, 0.018)


def clap(rng):
    s = noise(0.2, rng); s = s - np.convolve(s, np.ones(6) / 6, 'same'); return s * env(len(s), 0.002, 0.06)


def pluck(semi, dur=0.5, bright=1.0):
    n = int(dur * SR); t = np.arange(n) / SR; f = hz(semi)
    s = sum(np.sin(2 * np.pi * f * k * t) * (bright ** (k - 1)) / k for k in range(1, 6))
    return s * env(n, 0.003, 0.16)


def pad(semis, dur, lp=1.0):
    n = int(dur * SR); t = np.arange(n) / SR
    s = np.zeros(n)
    for semi in semis:
        for det in (-0.08, 0.08):
            f = hz(semi + det)
            s += np.sin(2 * np.pi * f * t) + lp * 0.3 * np.sin(2 * np.pi * 2 * f * t)
    fade = np.minimum(1, np.minimum(t / 0.4, (dur - t) / 0.4))
    return s * fade / len(semis)


def whoosh(rng, dur=0.35, up=True):
    s = noise(dur, rng)
    # crude band sweep: mix of smoothed noise windows
    k = np.linspace(0, 1, len(s))
    lo = np.convolve(s, np.ones(24) / 24, 'same'); hi = s - lo
    shape = np.sin(np.pi * k) ** 2
    mix = (lo * (1 - k) + hi * k) if up else (lo * k + hi * (1 - k))
    return mix * shape


def thud(rng):
    return kick(0.5) * 1.2 + np.concatenate([noise(0.05, rng) * env(int(0.05 * SR), 0.001, 0.01), np.zeros(int(0.45 * SR))]) * 0.4


def chime(semi, dur=1.6):
    n = int(dur * SR); t = np.arange(n) / SR; f = hz(semi + 12)
    return (np.sin(2 * np.pi * f * t) + 0.4 * np.sin(2 * np.pi * f * 2.76 * t) * np.exp(-t * 3)) * env(n, 0.002, 0.6)


def tick(rng):
    s = np.diff(noise(0.02, rng)); return s * env(len(s), 0.0005, 0.004)


def main():
    script = json.load(open(sys.argv[1]))
    out = sys.argv[2]
    T = script['duration']
    beat = {b['id']: b['t'] for b in script['beats']}
    rng = np.random.default_rng(7)
    m = Mix(T)

    # chords (semitones above A3): bright major for the setup and the fix, darker for 1 am
    BRIGHT = [[0, 4, 7, 11], [5, 9, 12, 16], [-3, 0, 4, 7], [7, 11, 14, 17]]
    DARK = [[-3, 0, 3, 7], [-7, -3, 0, 5]]
    bar = SPB * 4

    def groove(t0, t1, prog, full=True):
        t = t0; i = 0
        while t < t1 - 0.01:
            b = int(round((t - t0) / SPB))
            if b % 2 == 0 or full:
                m.add(t, kick(), 0.55 if b % 2 == 0 else 0.3)
            if b % 4 in (1, 3):
                m.add(t, clap(rng), 0.18)
            m.add(t + SPB / 2, hat(rng), 0.12, 0.3)
            ch = prog[(b // 4) % len(prog)]
            if b % 4 == 0:
                m.add(t, pad(ch, min(bar, t1 - t)), 0.06)
            # an arpeggio pluck on the eighths
            for e in range(2):
                note = ch[(b * 2 + e) % len(ch)] + 12
                m.add(t + e * SPB / 2, pluck(note, 0.4), 0.09, -0.25 if e else 0.25)
            t += SPB; i += 1

    # 1. setup: bright groove
    groove(0, beat['person'], BRIGHT)
    m.add(beat['tour'] + 1.3, thud(rng), 0.5)                     # TOURED TWICE stamp
    for i in range(5):
        m.add(beat['tour'] + i / 2.4 + 0.2, pluck(19 + [0, 2, 4, 7, 9][i], 0.25, 0.4), 0.08)  # ticks of the checklist

    # 2. 1 am: hushed pad, clock ticks, swipe whooshes, the unmatch
    late = beat['fix'] - beat['person']
    m.add(beat['person'], pad(DARK[0], late / 2 + 0.4, 0.3), 0.08)
    m.add(beat['person'] + late / 2, pad(DARK[1], late / 2, 0.3), 0.08)
    t = beat['person']
    while t < beat['fix']:
        m.add(t, tick(rng), 0.25, 0.4); t += SPB
    for i in range(6):
        m.add(beat['swipe'] + i * 0.34 + 0.15, whoosh(rng, 0.3, i % 2 == 0), 0.16, 0.6 if i % 2 else -0.6)
    m.add(beat['ghost'] + 1.0, thud(rng), 0.55)                    # UNMATCHED stamp
    # riser into the fix
    r = whoosh(rng, 1.2, True) * np.linspace(0, 1, int(1.2 * SR)) ** 2
    m.add(beat['fix'] - 1.2, r, 0.35)

    # 3. align fixes that: warm groove to the end card
    m.add(beat['fix'], chime(7), 0.18)
    groove(beat['fix'], beat['end'], BRIGHT)
    m.add(beat['align'] + 0.75, chime(12, 1.2), 0.16, 0.3)          # the align burst
    m.add(beat['align'] + 0.85, chime(16, 1.2), 0.12, -0.3)
    m.add(beat['mutual'], whoosh(rng, 0.6, True), 0.2)
    for i, s in enumerate([0, 4, 7, 11, 12, 16]):                   # the veil lifting
        m.add(beat['lift'] + 0.3 + i * 0.09, chime(s, 1.4), 0.07, (i % 2) * 0.6 - 0.3)

    # 4. end card: a big chord and a hit, then let it ring
    m.add(beat['end'], kick(0.6), 0.7)
    m.add(beat['end'], pad([0, 7, 12, 16, 19], T - beat['end']), 0.12)
    for i, s in enumerate([12, 16, 19, 24]):
        m.add(beat['end'] + 0.4 + i * 0.18, chime(s, 2.4), 0.08)

    L, R = m.L, m.R
    # gentle bus compression and fades
    peak = max(np.abs(L).max(), np.abs(R).max(), 1e-6)
    L, R = np.tanh(L / peak * 1.4) * 0.85, np.tanh(R / peak * 1.4) * 0.85
    tt = np.arange(len(L)) / SR
    fade = np.minimum(1, np.minimum(tt / 0.05, (T - tt) / 1.2))
    L, R = L * fade, R * fade
    pcm = (np.stack([L, R], 1) * 32767).astype('<i2')
    with wave.open(out, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())


if __name__ == '__main__':
    main()
