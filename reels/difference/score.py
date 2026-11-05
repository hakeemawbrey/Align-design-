"""An original, light, curious bed for a "What's the difference?" reel: a
plucked ostinato (soft pizzicato) and a marimba on a bright major-key
progression, a round bass and a whisper of shaker, with the reel's sound
cues on top: a bubbly pop as the question marks appear, a paper flip as the
cards turn, a marimba chime on each answer, and a two-note ding for the pill.
Everything is synthesised here, so the reel is safe to post.

    python3 score.py <cues.json> <out.wav>

cues.json: {"duration": 58.2, "seed": 123, "pops": [..], "flips": [..], "chimes": [..], "ding": 55.1}
"""
import json
import sys
import wave

import numpy as np

SR = 44100
BPM = 96
BEAT = 60 / BPM
BAR = BEAT * 4
SCALE = [0, 2, 4, 5, 7, 9, 11]
PROGS = [[0, 5, 3, 4], [0, 3, 5, 4], [0, 4, 5, 3]]  # I–vi–IV–V and friends
KEYS = [60, 62, 65, 67]  # C, D, F, G
TARGET_RMS = 0.028


def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def chord(tonic, degree):
    def pitch(d):
        return tonic + SCALE[d % 7] + 12 * (d // 7)
    return [pitch(degree), pitch(degree + 2), pitch(degree + 4)]


def pluck(m, dur, vel, bright=1.0):
    """Pizzicato-ish: a handful of harmonics, upper ones dying fast."""
    f = hz(m)
    n = int(dur * SR)
    t = np.arange(n) / SR
    out = np.zeros(n)
    for h, a in ((1, 1.0), (2, 0.5 * bright), (3, 0.22 * bright), (4, 0.1 * bright), (6, 0.04 * bright)):
        out += a * np.sin(2 * np.pi * f * h * t) * np.exp(-t * (5 + 7 * (h - 1)))
    return out * np.clip(t / 0.003, 0, 1) * vel


def marimba(m, dur, vel):
    f = hz(m)
    n = int(dur * SR)
    t = np.arange(n) / SR
    v = np.sin(2 * np.pi * f * t) * np.exp(-t * 4.2) + 0.35 * np.sin(2 * np.pi * f * 3.98 * t) * np.exp(-t * 14)
    v += 0.12 * np.sin(2 * np.pi * f * 9.9 * t) * np.exp(-t * 40)
    return v * np.clip(t / 0.002, 0, 1) * vel


def musicbox(m, dur, vel):
    f = hz(m)
    n = int(dur * SR)
    t = np.arange(n) / SR
    v = np.sin(2 * np.pi * f * t) + 0.18 * np.sin(2 * np.pi * f * 4.0 * t) * np.exp(-t * 6)
    return v * np.exp(-t * 1.8) * np.clip(t / 0.003, 0, 1) * vel


def add(buf, sig, at, pan=0.5):
    a = int(at * SR)
    if a >= buf.shape[1] or a < 0:
        return
    sig = sig[: buf.shape[1] - a]
    buf[0, a:a + len(sig)] += sig * np.sqrt(1 - pan)
    buf[1, a:a + len(sig)] += sig * np.sqrt(pan)


def noise_burst(rng, dur, lo, hi):
    """Band-limited noise via FFT masking, with a swish envelope."""
    n = int(dur * SR)
    x = rng.standard_normal(n)
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(n, 1 / SR)
    X *= ((f > lo) & (f < hi)).astype(float)
    return np.fft.irfft(X, n)


def pop(at, rng):
    """A bubbly pop: a sine that bends up, very short."""
    n = int(0.12 * SR)
    t = np.arange(n) / SR
    f = 520 + 900 * (t / 0.12) ** 0.6
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t * 34) * 0.5


def flip(rng):
    """A card turning: a short paper swish and a soft tap."""
    dur = 0.22
    n = int(dur * SR)
    t = np.arange(n) / SR
    sw = noise_burst(rng, dur, 1800, 7000)
    env = np.sin(np.pi * np.clip(t / dur, 0, 1)) ** 2
    tap = np.sin(2 * np.pi * 180 * t) * np.exp(-t * 60) * (t > dur * 0.55)
    return sw / (np.abs(sw).max() + 1e-9) * env * 0.16 + tap * 0.18


def reverb(x, rng, seconds=1.6, wet=0.2):
    ln = int(seconds * SR)
    t = np.arange(ln) / SR
    out = np.empty_like(x)
    nfft = 1 << int(np.ceil(np.log2(x.shape[1] + ln)))
    freqs = np.fft.rfftfreq(ln, 1 / SR)
    for ch in range(2):
        ir = rng.standard_normal(ln) * np.exp(-t * 4.0 / seconds * 2.0)
        ir = np.fft.irfft(np.fft.rfft(ir) / (1 + (freqs / 4000) ** 2), ln)
        ir /= np.sqrt(np.sum(ir ** 2)) + 1e-9
        y = np.fft.irfft(np.fft.rfft(x[ch], nfft) * np.fft.rfft(ir, nfft), nfft)[: x.shape[1]]
        out[ch] = x[ch] * (1 - wet) + y * wet * 1.5
    return out


def main():
    cues = json.load(open(sys.argv[1]))
    out = sys.argv[2]
    seconds = float(cues['duration'])
    seed = int(cues['seed'])
    rng = np.random.default_rng(seed)
    tonic = KEYS[seed % len(KEYS)]
    prog = PROGS[(seed // 5) % len(PROGS)]
    n = int(seconds * SR)
    music = np.zeros((2, n))
    sfx = np.zeros((2, n))
    t = np.arange(n) / SR

    bars = int(seconds / BAR) + 1
    for bi in range(bars):
        b0 = bi * BAR
        r, third, fifth = chord(tonic, prog[bi % len(prog)])
        # bass: root on 1, fifth on the "and" of 3
        for at, m, v in ((0, r - 24, 0.24), (BEAT * 2.5, fifth - 24, 0.16)):
            ln = BEAT * 1.4
            bt = np.arange(int(ln * SR)) / SR
            env = np.clip(bt / 0.01, 0, 1) * np.exp(-bt * 3.2)
            add(music, (np.sin(2 * np.pi * hz(m) * bt) + 0.25 * np.sin(4 * np.pi * hz(m) * bt)) * env * v, b0 + at, 0.5)
        # plucked ostinato: eighth notes, a little skip in it
        pattern = [r, fifth, r + 12, fifth, third + 12, fifth, r + 12, third + 12]
        for i, m in enumerate(pattern):
            if i == 5 and bi % 2:
                continue
            at = b0 + i * BEAT / 2 + rng.normal(0, 0.004)
            vel = (0.2 if i % 2 == 0 else 0.13) * (0.9 + 0.2 * rng.random())
            add(music, pluck(m, 0.9, vel), at, 0.3 + 0.4 * (i % 2))
        # marimba: a tiny two-note answer every other bar
        if bi % 2 == 1:
            for j, m in enumerate((fifth + 12, third + 12)):
                add(music, marimba(m, 1.2, 0.13), b0 + BEAT * (2 + j * 0.5), 0.65)
        # shaker: very soft on the off-beats
        for i in range(4):
            at = b0 + i * BEAT + BEAT / 2
            sh = noise_burst(rng, 0.06, 5000, 12000)
            sh = sh / (np.abs(sh).max() + 1e-9) * np.exp(-np.arange(len(sh)) / SR * 70) * 0.03
            add(music, sh, at, 0.6)

    # a soft pad under everything, so the gaps never feel empty
    for bi in range(bars):
        r, third, fifth = chord(tonic, prog[bi % len(prog)])
        ln = BAR + 1.2
        pt = np.arange(int(ln * SR)) / SR
        env = np.clip(pt / 0.6, 0, 1) * np.clip((ln - pt) / 0.9, 0, 1)
        for m in (r, third, fifth):
            add(music, np.sin(2 * np.pi * hz(m) * pt) * env * 0.018, bi * BAR, 0.5)

    def chord_at(time):
        return chord(tonic, prog[int(max(time, 0) / BAR) % len(prog)])

    for at in cues.get('pops', []):
        add(sfx, pop(at, rng), at, 0.35 + 0.3 * rng.random())
    for at in cues.get('flips', []):
        add(sfx, flip(rng), at, 0.3 + 0.4 * rng.random())
    for at in cues.get('chimes', []):
        r, third, fifth = chord_at(at)
        for j, m in enumerate((r + 12, third + 12, fifth + 12)):
            add(sfx, marimba(m, 1.4, 0.2), at + j * 0.07, 0.4 + 0.1 * j)
    if cues.get('ding') is not None:
        at = cues['ding']
        r, _, fifth = chord_at(at)
        add(sfx, musicbox(r + 24, 2.6, 0.24), at, 0.45)
        add(sfx, musicbox(fifth + 24, 2.6, 0.24), at + 0.15, 0.55)

    music = reverb(music, rng)
    fade = np.clip(t / 0.4, 0, 1) * np.clip((seconds - t) / 1.4, 0, 1)
    music *= fade
    rms = np.sqrt(np.mean(music ** 2)) + 1e-9
    music *= TARGET_RMS / rms
    # cues sit on top of the music, at a fixed level relative to it
    buf = music + sfx * (TARGET_RMS / 0.028) * 0.55
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
