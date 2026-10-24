"""An original ambient score for one reel: slow detuned pad chords, a soft
air bed and a quiet chime at every scene change, in a key per sign.

    python3 score.py <sign> <seconds> <scenes> <out.wav>
"""
import sys
import wave

import numpy as np

SR = 44100
SCENE = 3.4

SIGNS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
         'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
# Root note per sign (semitones above A2), walking round the circle of fifths.
ROOTS = [0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5]
# Two progressions (scale degrees as semitone chords); water/earth signs get
# the darker one.
BRIGHT = [[0, 7, 16, 23], [-3, 4, 12, 19], [5, 12, 16, 24], [2, 9, 17, 21]]
DARK = [[0, 7, 15, 22], [-4, 3, 12, 19], [5, 12, 15, 20], [-2, 5, 14, 17]]
DARK_SIGNS = {'taurus', 'cancer', 'virgo', 'scorpio', 'capricorn', 'pisces'}
PENTA = [0, 2, 4, 7, 9, 12, 14, 16, 19]


def hz(semi):
    return 110.0 * 2 ** (semi / 12)


def main():
    sign, seconds, scenes, out = sys.argv[1], float(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
    rng = np.random.default_rng(SIGNS.index(sign) + 11)
    root = ROOTS[SIGNS.index(sign)] - 12 * (ROOTS[SIGNS.index(sign)] > 6)
    prog = DARK if sign in DARK_SIGNS else BRIGHT
    n = int(seconds * SR)
    t = np.arange(n) / SR
    L = np.zeros(n)
    R = np.zeros(n)

    # Pad: each chord lasts two scenes, with long overlapping swells.
    chord_len = SCENE * 2
    for ci in range(int(seconds / chord_len) + 2):
        start = ci * chord_len - 1.5
        notes = prog[ci % len(prog)]
        a = int(max(start, 0) * SR)
        b = int(min(start + chord_len + 3.0, seconds) * SR)
        if b <= a:
            continue
        tt = t[a:b] - start
        env = np.clip(tt / 2.2, 0, 1) * np.clip((chord_len + 3.0 - tt) / 2.5, 0, 1)
        env = env ** 1.5
        for k, semi in enumerate(notes):
            f = hz(root + semi)
            for det, pan in ((-0.07, 0.25), (0.06, 0.75), (0.0, 0.5)):
                ff = f * 2 ** (det / 12)
                ph = rng.random() * 6.28
                # A few soft harmonics, like a filtered saw.
                v = sum(np.sin(2 * np.pi * ff * h * tt + ph * h) / h ** 1.8 for h in (1, 2, 3))
                v *= env * (0.05 if k else 0.065)
                L[a:b] += v * (1 - pan)
                R[a:b] += v * pan

    # Air: filtered noise that breathes slowly.
    noise = rng.standard_normal((2, n))
    freqs = np.fft.rfftfreq(n, 1 / SR)
    shape = 1 / (1 + (freqs / 280) ** 2)
    for ch in range(2):
        y = np.fft.irfft(np.fft.rfft(noise[ch]) * shape, n)
        noise[ch] = y / (np.abs(y).max() + 1e-9)
    breath = 0.5 + 0.5 * np.sin(2 * np.pi * t / 9.0)
    L += noise[0] * 0.05 * breath
    R += noise[1] * 0.05 * (1 - breath * 0.6)

    # Chimes at each scene change, from the sign's pentatonic scale.
    for i in range(scenes + 1):
        at = i * SCENE + 0.3
        a = int(at * SR)
        if a >= n:
            break
        semi = root + 24 + PENTA[rng.integers(len(PENTA))]
        f = hz(semi)
        dur = min(4.0, seconds - at)
        tt = np.arange(int(dur * SR)) / SR
        v = (np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(2 * np.pi * f * 2.01 * tt)) * np.exp(-tt * 1.4) * 0.07
        v *= np.clip(tt / 0.01, 0, 1)
        pan = 0.3 + 0.4 * rng.random()
        L[a:a + len(v)] += v * (1 - pan)
        R[a:a + len(v)] += v * pan

    # Reverb: convolve with a decaying noise tail.
    tail = int(3.2 * SR)
    ir_t = np.arange(tail) / SR
    out_lr = []
    for ch, x in enumerate((L, R)):
        ir = rng.standard_normal(tail) * np.exp(-ir_t * 2.1)
        ir[0] = 0
        ir /= np.sqrt((ir ** 2).sum())
        size = 1 << int(np.ceil(np.log2(n + tail)))
        wet = np.fft.irfft(np.fft.rfft(x, size) * np.fft.rfft(ir, size), size)[:n]
        out_lr.append(x * 0.55 + wet * 0.6)

    st = np.stack(out_lr, axis=1)
    fade = np.clip(t / 1.5, 0, 1) * np.clip((seconds - t) / 2.0, 0, 1)
    st *= fade[:, None]
    st /= np.abs(st).max() + 1e-9
    st *= 0.6
    pcm = (st * 32767).astype('<i2')
    with wave.open(out, 'wb') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


if __name__ == '__main__':
    main()
