"""An original, quiet music bed for an affirmation reel: warm pad chords that
breathe slowly, a soft air layer, a shimmer as each drawing starts, and one
bell when the comment pill appears.

    python3 bed.py <seconds> <out.wav> <seed> <scene starts,comma,separated> [bell time]
"""
import sys
import wave

import numpy as np

SR = 44100
# Lydian-ish, open voicings: dreamy without being sad. Semitones above A2.
PROGS = [
    [[3, 10, 14, 19, 26], [-2, 5, 12, 17, 21], [0, 7, 14, 16, 23], [-4, 3, 10, 15, 22]],
    [[0, 7, 11, 16, 23], [5, 12, 16, 19, 26], [-3, 4, 11, 16, 19], [2, 9, 14, 18, 25]],
]


def hz(semi):
    return 110.0 * 2 ** (semi / 12)


def main():
    seconds = float(sys.argv[1])
    out = sys.argv[2]
    seed = int(sys.argv[3])
    starts = [float(x) for x in sys.argv[4].split(',') if x]
    bell = float(sys.argv[5]) if len(sys.argv) > 5 else None
    rng = np.random.default_rng(seed)
    prog = PROGS[seed % len(PROGS)]
    root = [0, 2, -2, 5][seed % 4]
    n = int(seconds * SR)
    t = np.arange(n) / SR
    L = np.zeros(n)
    R = np.zeros(n)

    # Pad: one chord every 8 s, long overlapping swells.
    chord = 8.0
    for ci in range(int(seconds / chord) + 2):
        start = ci * chord - 2.0
        a = int(max(start, 0) * SR)
        b = int(min(start + chord + 4.0, seconds) * SR)
        if b <= a:
            continue
        tt = t[a:b] - start
        env = (np.clip(tt / 3.0, 0, 1) * np.clip((chord + 4.0 - tt) / 3.5, 0, 1)) ** 1.6
        for k, semi in enumerate(prog[ci % len(prog)]):
            f = hz(root + semi)
            for det, pan in ((-0.06, 0.2), (0.05, 0.8), (0.0, 0.5)):
                ff = f * 2 ** (det / 12)
                ph = rng.random() * 6.28
                vib = 1 + 0.0015 * np.sin(2 * np.pi * (0.2 + 0.1 * k) * tt)
                v = sum(np.sin(2 * np.pi * ff * h * tt * vib + ph * h) / h ** 2.2 for h in (1, 2, 3))
                v *= env * (0.034 if k else 0.045)
                L[a:b] += v * (1 - pan)
                R[a:b] += v * pan

    # Air: low-passed noise that breathes.
    noise = rng.standard_normal((2, n))
    freqs = np.fft.rfftfreq(n, 1 / SR)
    shape = 1 / (1 + (freqs / 900) ** 2) * (freqs > 60)
    for ch in range(2):
        y = np.fft.irfft(np.fft.rfft(noise[ch]) * shape, n)
        noise[ch] = y / (np.abs(y).max() + 1e-9)
    breath = 0.55 + 0.45 * np.sin(2 * np.pi * t / 11.0)
    L += noise[0] * 0.022 * breath
    R += noise[1] * 0.022 * (1.1 - breath * 0.5)

    # Shimmer: a soft run of high partials as each drawing begins.
    scale = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24]
    for si, at in enumerate(starts):
        for j in range(5):
            semi = root + 36 + scale[(si * 2 + j * 2) % len(scale)]
            on = at + 0.08 + j * 0.11
            a = int(on * SR)
            if a >= n:
                continue
            ln = min(n - a, int(2.6 * SR))
            tt = np.arange(ln) / SR
            env = np.exp(-tt * 2.2) * np.clip(tt / 0.01, 0, 1)
            v = (np.sin(2 * np.pi * hz(semi) * tt) + 0.25 * np.sin(2 * np.pi * hz(semi) * 2.01 * tt)) * env * 0.012
            pan = 0.2 + 0.6 * ((j + si) % 5) / 4
            L[a:a + ln] += v * (1 - pan)
            R[a:a + ln] += v * pan

    # Bell for the pill.
    if bell is not None:
        a = int(bell * SR)
        ln = min(n - a, int(4 * SR))
        if ln > 0:
            tt = np.arange(ln) / SR
            f = hz(root + 31)
            v = sum(np.sin(2 * np.pi * f * m * tt) * np.exp(-tt * d) * g
                    for m, d, g in ((1, 1.4, 1), (2.76, 2.6, 0.35), (5.4, 4.0, 0.15)))
            v *= np.clip(tt / 0.004, 0, 1) * 0.05
            L[a:a + ln] += v
            R[a:a + ln] += v

    # Fade in and out, then write.
    fade = np.clip(t / 1.2, 0, 1) * np.clip((seconds - t) / 1.5, 0, 1)
    L *= fade
    R *= fade
    peak = max(np.abs(L).max(), np.abs(R).max(), 1e-9)
    gain = min(1.0, 0.5 / peak)
    data = (np.stack([L, R], 1) * gain * 32767).astype(np.int16)
    with wave.open(out, 'wb') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(data.tobytes())


if __name__ == '__main__':
    main()
