"""An original, warm music bed for an affirmation reel: soft piano broken
chords in a major key, a gentle pad and bass under them, a music-box note on
each chord change, a little harp run as each drawing begins, and a two-note
"ding" when the comment pill appears. Everything sits in one key on a
familiar progression (I–V–vi–IV and friends), so it reads as calm and
hopeful, never tense.

    python3 bed.py <seconds> <out.wav> <seed> <scene starts,comma,separated> [ding time]
"""
import sys
import wave

import numpy as np

SR = 44100
BPM = 70
BEAT = 60 / BPM
BAR = BEAT * 4
CHORD = BAR * 2  # each chord lasts two bars

SCALE = [0, 2, 4, 5, 7, 9, 11]  # major
# Scale degrees (0 = I). All diatonic, all major-key staples.
PROGS = [[0, 4, 5, 3], [5, 3, 0, 4], [0, 5, 3, 4], [3, 0, 4, 5]]
KEYS = [48, 50, 53, 51, 55]  # C, D, F, Eb, G (MIDI of the tonic, octave 3)
TARGET_RMS = 0.03  # keeps the bed well under the voice (about -30 LUFS)


def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def triad(tonic, degree):
    """MIDI notes of the chord on a scale degree, root first: root, 3rd, 5th, 9th."""
    # roots above the 4th drop an octave, so every chord sits near the tonic
    base = tonic - 12 if SCALE[degree % 7] > 6 else tonic

    def pitch(d):
        return base + SCALE[d % 7] + 12 * (d // 7)
    return [pitch(degree), pitch(degree + 2), pitch(degree + 4), pitch(degree + 8)]


def piano(m, dur, vel, rng):
    """A soft felt-piano tone: few harmonics, fast attack, gentle decay."""
    f = hz(m)
    n = int(dur * SR)
    t = np.arange(n) / SR
    decay = 0.9 + (m - 48) * 0.035  # higher notes fade sooner
    out = np.zeros(n)
    for h, a in ((1, 1.0), (2, 0.42), (3, 0.16), (4, 0.07), (5, 0.03)):
        fh = f * h * np.sqrt(1 + 0.00025 * h * h)
        out += a * np.sin(2 * np.pi * fh * t + rng.random() * 0.3) * np.exp(-t * decay * (1 + 0.55 * (h - 1)))
    att = np.clip(t / 0.006, 0, 1)
    rel = np.clip((dur - t) / 0.25, 0, 1)
    return out * att * rel * vel


def musicbox(m, dur, vel):
    f = hz(m)
    n = int(dur * SR)
    t = np.arange(n) / SR
    v = np.sin(2 * np.pi * f * t) + 0.18 * np.sin(2 * np.pi * f * 4.0 * t) * np.exp(-t * 6)
    return v * np.exp(-t * 1.6) * np.clip(t / 0.003, 0, 1) * vel


def add(buf, sig, at, pan=0.5):
    a = int(at * SR)
    if a >= buf.shape[1] or a < 0:
        return
    sig = sig[: buf.shape[1] - a]
    buf[0, a:a + len(sig)] += sig * np.sqrt(1 - pan)
    buf[1, a:a + len(sig)] += sig * np.sqrt(pan)


def reverb(x, rng, seconds=2.6, wet=0.28):
    """Convolution with soft, decaying noise: a warm room, not a cave."""
    ln = int(seconds * SR)
    t = np.arange(ln) / SR
    out = np.empty_like(x)
    nfft = 1 << int(np.ceil(np.log2(x.shape[1] + ln)))
    freqs = np.fft.rfftfreq(ln, 1 / SR)
    for ch in range(2):
        ir = rng.standard_normal(ln) * np.exp(-t * 3.2 / seconds * 2.3)
        # darken the tail so it never hisses
        ir = np.fft.irfft(np.fft.rfft(ir) / (1 + (freqs / 3500) ** 2), ln)
        ir /= np.sqrt(np.sum(ir ** 2)) + 1e-9
        y = np.fft.irfft(np.fft.rfft(x[ch], nfft) * np.fft.rfft(ir, nfft), nfft)[: x.shape[1]]
        out[ch] = x[ch] * (1 - wet) + y * wet * 1.6
    return out


def main():
    seconds = float(sys.argv[1])
    out = sys.argv[2]
    seed = int(sys.argv[3])
    starts = [float(x) for x in sys.argv[4].split(',') if x]
    ding = float(sys.argv[5]) if len(sys.argv) > 5 else None
    rng = np.random.default_rng(seed)
    tonic = KEYS[seed % len(KEYS)]
    prog = PROGS[(seed // 7) % len(PROGS)]
    n = int(seconds * SR)
    buf = np.zeros((2, n))
    t = np.arange(n) / SR

    def chord_at(time):
        return triad(tonic, prog[int(max(time, 0) / CHORD) % len(prog)])

    for ci in range(int(seconds / CHORD) + 1):
        c0 = ci * CHORD
        r, third, fifth, ninth = triad(tonic, prog[ci % len(prog)])
        # pad: the triad an octave up, slow swell, a hair of chorus
        ln = CHORD + 2.5
        pt = np.arange(int(ln * SR)) / SR
        env = np.clip(pt / 1.6, 0, 1) * np.clip((ln - pt) / 2.2, 0, 1)
        for k, m in enumerate((r + 12, third + 12, fifth + 12)):
            for cents, pan in ((-3, 0.3), (3, 0.7)):
                f = hz(m) * 2 ** (cents / 1200)
                v = (np.sin(2 * np.pi * f * pt) + 0.25 * np.sin(4 * np.pi * f * pt)) * env * 0.05
                add(buf, v, c0, pan)
        # bass: the root, low and round
        bt = np.arange(int((CHORD + 0.5) * SR)) / SR
        benv = np.clip(bt / 0.35, 0, 1) * np.clip((CHORD + 0.5 - bt) / 0.8, 0, 1)
        bm = r - 12 if r - 12 >= 40 else r  # no lower than E2: warm on headphones, not a rumble
        add(buf, (np.sin(2 * np.pi * hz(bm) * bt) + 0.2 * np.sin(4 * np.pi * hz(bm) * bt)) * benv * 0.07, c0, 0.5)
        # piano: a slow broken chord, one note a beat, over two bars
        pattern = [r, fifth, r + 12, third + 12, fifth + 12, third + 12, ninth, fifth]
        for i, m in enumerate(pattern):
            at = c0 + i * BEAT + rng.normal(0, 0.008)
            vel = (0.5 if i % 4 == 0 else 0.34) * (0.9 + 0.2 * rng.random())
            add(buf, piano(m, 3.2, vel, rng), at, 0.35 + 0.3 * rng.random())
        # music box: one high chord tone as the chord changes, with an echo
        top = (third if ci % 2 else fifth) + 36
        for e, (dl, g) in enumerate(((0, 0.11), (BEAT * 1.5, 0.05), (BEAT * 3, 0.025))):
            add(buf, musicbox(top, 2.5, g), c0 + 0.02 + dl, 0.25 if e % 2 else 0.75)

    # a soft harp run up the chord as each drawing begins
    for at in starts[1:]:
        r, third, fifth, _ = chord_at(at)
        for j, m in enumerate((r + 24, third + 24, fifth + 24, r + 36)):
            add(buf, piano(m, 1.8, 0.16, rng), at + 0.05 + j * 0.075, 0.3 + 0.13 * j)

    # the pill: a two-note ding, root then fifth
    if ding is not None:
        r, _, fifth, _ = chord_at(ding)
        add(buf, musicbox(r + 36, 3.0, 0.2), ding, 0.45)
        add(buf, musicbox(fifth + 36, 3.0, 0.2), ding + 0.16, 0.55)

    buf = reverb(buf, rng)
    fade = np.clip(t / 1.0, 0, 1) * np.clip((seconds - t) / 1.6, 0, 1)
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
