"""An original music bed for a Portals reel: a slow, glassy ambient pad
(open major-seventh / add9 voicings that swell and breathe, a soft low
drone, a faint airy shimmer), a single glass note as each object builds,
a soft three-note chime as each step lights on the tracker, and a two-note
chime when the follow pill appears. One key per reel, no drums, no melody
to fight the voice: it should feel like the sky, not a song.

    python3 bed.py <seconds> <out.wav> <seed> <scene starts,comma,sep> <step times,comma,sep> [pill time]
"""
import sys
import wave

import numpy as np

SR = 44100
CHORD = 8.0  # seconds per chord: slow
# Chords as semitones over the tonic: Imaj9, IVmaj7(#11), vi9, IVadd9 – all soft and open.
PROGS = [
    [[0, 7, 11, 14, 19], [5, 12, 16, 21, 23], [9, 16, 19, 23, 26], [5, 12, 17, 19, 24]],
    [[0, 7, 14, 16, 23], [-3, 4, 11, 12, 19], [5, 12, 16, 19, 26], [7, 14, 18, 21, 26]],
]
KEYS = [50, 52, 53, 55, 48]  # D, E, F, G, C (MIDI tonic, octave 3)
TARGET_RMS = 0.026  # well under the voice


def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def add(buf, sig, at, pan=0.5):
    a = int(at * SR)
    if a >= buf.shape[1] or a < 0:
        return
    sig = sig[: buf.shape[1] - a]
    buf[0, a:a + len(sig)] += sig * np.sqrt(1 - pan)
    buf[1, a:a + len(sig)] += sig * np.sqrt(pan)


def glass(m, dur, vel):
    """A glass / celesta-like tone: a pure partial plus soft inharmonic ones that fade fast."""
    f = hz(m)
    n = int(dur * SR)
    t = np.arange(n) / SR
    v = np.sin(2 * np.pi * f * t) * np.exp(-t * 1.1)
    v += 0.35 * np.sin(2 * np.pi * f * 2.0 * t) * np.exp(-t * 2.2)
    v += 0.14 * np.sin(2 * np.pi * f * 3.01 * t) * np.exp(-t * 4.0)
    v += 0.06 * np.sin(2 * np.pi * f * 5.43 * t) * np.exp(-t * 7.0)
    att = np.clip(t / 0.004, 0, 1)
    rel = np.clip((dur - t) / 0.4, 0, 1)
    return v * att * rel * vel


def pad_voice(m, ln, rng):
    """One pad note: detuned sines with a slow breathing swell."""
    n = int(ln * SR)
    t = np.arange(n) / SR
    out = np.zeros(n)
    for cents in (-6, 0, 6):
        f = hz(m) * 2 ** (cents / 1200)
        ph = rng.random() * 2 * np.pi
        out += np.sin(2 * np.pi * f * t + ph) + 0.12 * np.sin(4 * np.pi * f * t + ph)
    lfo = 0.75 + 0.25 * np.sin(2 * np.pi * t / (5 + 3 * rng.random()) + rng.random() * 6)
    env = np.clip(t / 2.8, 0, 1) ** 1.5 * np.clip((ln - t) / 3.0, 0, 1)
    return out * lfo * env / 3


def reverb(x, rng, seconds=4.5, wet=0.45):
    ln = int(seconds * SR)
    t = np.arange(ln) / SR
    out = np.empty_like(x)
    nfft = 1 << int(np.ceil(np.log2(x.shape[1] + ln)))
    freqs = np.fft.rfftfreq(ln, 1 / SR)
    for ch in range(2):
        ir = rng.standard_normal(ln) * np.exp(-t * 5.5 / seconds)
        ir = np.fft.irfft(np.fft.rfft(ir) / (1 + (freqs / 5000) ** 2), ln)
        ir /= np.sqrt(np.sum(ir ** 2)) + 1e-9
        y = np.fft.irfft(np.fft.rfft(x[ch], nfft) * np.fft.rfft(ir, nfft), nfft)[: x.shape[1]]
        out[ch] = x[ch] * (1 - wet) + y * wet * 1.7
    return out


def main():
    seconds = float(sys.argv[1])
    out = sys.argv[2]
    seed = int(sys.argv[3])
    starts = [float(x) for x in sys.argv[4].split(',') if x]
    steps = [float(x) for x in sys.argv[5].split(',') if x] if len(sys.argv) > 5 else []
    pill = float(sys.argv[6]) if len(sys.argv) > 6 else None
    rng = np.random.default_rng(seed)
    tonic = KEYS[seed % len(KEYS)]
    prog = PROGS[(seed // 5) % len(PROGS)]
    n = int(seconds * SR)
    buf = np.zeros((2, n))
    t = np.arange(n) / SR

    def chord_at(time):
        return prog[int(max(time, 0) / CHORD) % len(prog)]

    for ci in range(int(seconds / CHORD) + 1):
        c0 = ci * CHORD - 1.0
        ch = prog[ci % len(prog)]
        ln = CHORD + 4.5
        for k, iv in enumerate(ch):
            add(buf, pad_voice(tonic + iv, ln, rng) * (0.06 if k else 0.05), c0, 0.2 + 0.6 * (k / (len(ch) - 1)))
        # low drone on the chord root
        bt = np.arange(int(ln * SR)) / SR
        benv = np.clip(bt / 3, 0, 1) * np.clip((ln - bt) / 3, 0, 1)
        root = tonic + ch[0] - 12
        while root < 38:
            root += 12
        add(buf, np.sin(2 * np.pi * hz(root) * bt) * benv * 0.05, c0, 0.5)
        # a few slow, random glass notes high in the chord: the stars
        for _ in range(2):
            m = tonic + 24 + ch[rng.integers(1, len(ch))]
            add(buf, glass(m, 4.0, 0.035 + 0.02 * rng.random()), c0 + 1.5 + rng.random() * (CHORD - 2), rng.random())

    # a faint airy shimmer: band-limited noise, slowly swelling
    noise = rng.standard_normal((2, n))
    spec = np.fft.rfft(noise, axis=1)
    fr = np.fft.rfftfreq(n, 1 / SR)
    spec *= np.exp(-((fr - 6500) / 2500) ** 2)
    air = np.fft.irfft(spec, n, axis=1)
    air /= np.abs(air).max() + 1e-9
    air *= (0.5 + 0.5 * np.sin(2 * np.pi * t / 11.0)) * 0.012
    buf += air

    # a single soft glass note as each object builds
    for i, at in enumerate(starts[1:]):
        ch = chord_at(at)
        m = tonic + 24 + ch[(i * 2 + 1) % len(ch)]
        add(buf, glass(m, 3.0, 0.06), at + 0.04, 0.3 + 0.4 * ((i % 3) / 2))

    # the tracker: a soft rising three-note chime as each step lights
    for si, at in enumerate(steps):
        ch = chord_at(at)
        notes = [tonic + 24 + ch[0], tonic + 24 + ch[1], tonic + 36 + ch[0]]
        for j, m in enumerate(notes):
            add(buf, glass(m + (2 if si == 1 and j == 2 else 0), 3.5, 0.11 - j * 0.015), at + j * 0.11, 0.35 + 0.15 * j)

    if pill is not None:
        ch = chord_at(pill)
        add(buf, glass(tonic + 36 + ch[0], 4.0, 0.14), pill, 0.45)
        add(buf, glass(tonic + 36 + ch[1], 4.0, 0.12), pill + 0.17, 0.55)

    buf = reverb(buf, rng)
    fade = np.clip(t / 1.2, 0, 1) * np.clip((seconds - t) / 1.8, 0, 1)
    buf *= fade
    rms = np.sqrt(np.mean(buf ** 2)) + 1e-9
    buf *= TARGET_RMS / rms
    peak = np.abs(buf).max()
    if peak > 0.95:
        buf *= 0.95 / peak
    data = (buf.T * 32767).astype(np.int16)
    with wave.open(out, 'wb') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(data.tobytes())


if __name__ == '__main__':
    main()
