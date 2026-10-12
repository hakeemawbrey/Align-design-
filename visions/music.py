"""Procedural soundtrack for Align Visions: a dreamy, dark synth loop at 120 bpm.

Every picture cut is an eighth note (0.25s), so the hats tick on the cuts. The
reference runs on a dense mid-range song from the first frame, no intro, so this
starts full: a minor four-chord loop on pads, a plucked arpeggio, sub bass, a soft
kick on the beat and a clap on 2 and 4, washed in reverb. It ends on the bar line
so Instagram's auto-loop is seamless. The seed picks the key, progression, arp
pattern and tone, so every render sounds a little different.
"""
import os
import re
import subprocess
import wave

import numpy as np

SR = 44100
BPM = 120
BEAT = 60 / BPM

# minor-key loops, as scale degrees of natural minor (0 = i)
PROGRESSIONS = [
    [0, 5, 2, 6],   # i  VI III VII  (the dream-pop loop)
    [0, 6, 5, 6],   # i  VII VI VII
    [0, 3, 5, 4],   # i  iv VI v
    [5, 6, 0, 0],   # VI VII i  i
    [0, 5, 3, 4],   # i  VI iv v
    [0, 2, 5, 6],   # i  III VI VII
]
MINOR = [0, 2, 3, 5, 7, 8, 10]
ARPS = [[0, 2, 4, 7, 4, 2], [0, 4, 7, 9, 7, 4], [7, 4, 2, 0, 2, 4], [0, 7, 4, 9, 2, 7], [0, 2, 4, 2, 7, 4, 9, 4]]
# a key per theme / sign keeps a series coherent; the seed moves it around a little
KEYS = {"love": 57, "soul": 62, "align": 59, "sky": 55, "sign": 60}
SIGNS = ["aries", "taurus", "gemini", "cancer", "leo", "virgo",
         "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"]


def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def deg(root, d, octave=0):
    return root + 12 * octave + MINOR[d % 7] + 12 * (d // 7)


def lowpass_fast(x, cutoff, order=4):
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(x.shape[-1], 1 / SR)
    X *= 1 / (1 + (f / cutoff) ** order)
    return np.fft.irfft(X, x.shape[-1])


def highpass_fast(x, cutoff):
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(x.shape[-1], 1 / SR)
    X *= 1 - 1 / (1 + (f / cutoff) ** 4)
    return np.fft.irfft(X, x.shape[-1])


def reverb(x, seconds, mix, rng, loop=True):
    """Noise-tail convolution. With loop=True the tail wraps round to the start, so the
    loop point has the same wash as everywhere else."""
    n = int(seconds * SR)
    t = np.arange(n) / SR
    ir = rng.normal(0, 1, (2, n)) * np.exp(-t * 6.9 / seconds)
    ir[:, :int(0.012 * SR)] = 0  # pre-delay
    L = x.shape[1]
    if loop:
        nfft = L
        wet = np.fft.irfft(np.fft.rfft(x, nfft) * np.fft.rfft(np.pad(ir, ((0, 0), (0, max(0, L - n))))[:, :L], nfft), nfft)
    else:
        nfft = 1 << (L + n - 1).bit_length()
        wet = np.fft.irfft(np.fft.rfft(x, nfft) * np.fft.rfft(ir, nfft), nfft)[:, :L]
    wet *= np.abs(x).max() / (np.abs(wet).max() + 1e-9)
    return x * (1 - mix) + wet * mix


def saw(f, t, ph, bright):
    return sum(np.sin(2 * np.pi * f * h * t + ph * h) / h ** (1.5 / bright) for h in range(1, 9))


def pad_note(freqs, n, rng, bright=1.0, attack=0.35, release=0.5):
    t = np.arange(n) / SR
    out = np.zeros((2, n))
    for f in freqs:
        for k, det in enumerate((-0.09, 0.0, 0.11)):
            s = saw(f * 2 ** (det / 12), t, rng.uniform(0, 6.28), bright)
            pan = (k - 1) * 0.7
            out[0] += s * (1 - pan)
            out[1] += s * (1 + pan)
    env = np.minimum(1, t / attack) * np.minimum(1, (n / SR - t) / release + 0.15)
    return out * np.clip(env, 0, 1) / (len(freqs) * 6)


def pluck(f, dur, rng, decay=0.28, tone=0.5):
    n = int(dur * SR)
    t = np.arange(n) / SR
    s = (np.sin(2 * np.pi * f * t) + tone * np.sin(4 * np.pi * f * t + 0.5) * np.exp(-t * 9)
         + 0.25 * np.sin(6 * np.pi * f * t) * np.exp(-t * 18))
    return s * np.exp(-t / decay) * np.minimum(1, t / 0.003)


def kick(n_len=0.5, f0=140, f1=42, decay=0.22):
    n = int(n_len * SR)
    t = np.arange(n) / SR
    f = f1 + (f0 - f1) * np.exp(-t * 35)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / decay)


def clap(rng):
    n = int(0.35 * SR)
    t = np.arange(n) / SR
    env = np.exp(-t / 0.09)
    for d in (0.008, 0.016):  # the clap's flams
        i = int(d * SR)
        env[i:] += np.exp(-t[:n - i] / 0.01) * 0.6
    return np.stack([highpass_fast(lowpass_fast(rng.normal(0, 1, n) * env, 3500), 900) for _ in range(2)])


def hat(rng, open_=False):
    n = int((0.22 if open_ else 0.05) * SR)
    t = np.arange(n) / SR
    return highpass_fast(rng.normal(0, 1, n), 7000) * np.exp(-t / (0.07 if open_ else 0.012))


def add(mix, x, start, gain=1.0, pan=0.0, wrap=True):
    """Mix x in at sample `start`; with wrap the tail runs round to the top (seamless loop)."""
    n = mix.shape[1]
    x = np.atleast_2d(x)
    if x.shape[0] == 1:
        x = np.vstack([x[0] * (1 - pan), x[0] * (1 + pan)])
    m = x.shape[1]
    start %= n
    e = min(start + m, n)
    mix[:, start:e] += x[:, :e - start] * gain
    if wrap and start + m > n:
        r = min(start + m - n, n)
        mix[:, :r] += x[:, n - start:n - start + r] * gain


def compose(total, seed=0, theme=None, sign=None):
    rng = np.random.default_rng([seed, SIGNS.index(sign) + 100 if sign in SIGNS else hash_theme(theme)])
    n = int(round(total * SR))
    mix = np.zeros((2, n))
    root = (KEYS.get(theme, 57) if sign not in SIGNS else 55 + SIGNS.index(sign) % 7) + int(rng.integers(-2, 3))
    root -= 12  # pads around the octave below middle C
    prog = PROGRESSIONS[int(rng.integers(len(PROGRESSIONS)))]
    arp = ARPS[int(rng.integers(len(ARPS)))]
    bright = float(rng.uniform(0.8, 1.3))
    bar = BEAT * 4
    bars = int(round(total / bar))

    for b in range(bars):
        d = prog[b % 4]
        s = int(b * bar * SR)
        m = int(bar * SR)
        # pad: a triad plus the 7th or 9th, voiced around the root
        chord = [deg(root, d), deg(root, d + 2), deg(root, d + 4), deg(root, d + (6 if rng.random() < 0.5 else 8))]
        add(mix, pad_note([hz(c) for c in chord], m + int(0.4 * SR), rng, bright), s, 0.8)
        # sub bass: root on 1, a push on the and of 2
        for pos, L in ((0, 1.4), (1.5, 0.45), (2.5, 1.4)):
            bs = pluck(hz(deg(root, d, -1)), L * BEAT + 0.2, rng, decay=0.5, tone=0.15)
            add(mix, lowpass_fast(bs, 300), s + int(pos * BEAT * SR), 0.55)
        # arpeggio on sixteenths, into a dotted-eighth echo
        for k in range(16):
            if rng.random() < 0.18:
                continue
            note = deg(root, d + arp[k % len(arp)], 2)
            p = pluck(hz(note), 0.5, rng, decay=0.16, tone=0.6)
            pan = 0.35 * np.sin(k * 1.3)
            st = s + int(k * BEAT / 4 * SR)
            add(mix, p, st, 0.11, pan)
            add(mix, p, st + int(0.75 * BEAT * SR), 0.045, -pan)
        # drums
        for q in range(4):
            qs = s + int(q * BEAT * SR)
            add(mix, kick(), qs, 0.75)
            if q in (1, 3):
                add(mix, clap(rng), qs, 0.22)
            for e in range(2):
                add(mix, hat(rng, open_=(e == 1 and q == 3)), qs + int(e * BEAT / 2 * SR), 0.05 if e else 0.035, 0.2)

    # sidechain pump: everything but the kick ducks a little on each beat (the drums are mixed in already,
    # so the pump is gentle and mostly heard on the pads)
    t = np.arange(n) / SR
    ph = (t % BEAT) / BEAT
    duck = 1 - 0.28 * np.exp(-ph * 9)
    mix *= duck
    mix = reverb(mix, 2.4, 0.28, rng)
    mix = lowpass_fast(mix, 9000, 2)
    mix /= np.abs(mix).max() + 1e-9
    mix = np.tanh(mix * 1.6) / np.tanh(1.6)
    return (mix * 0.8).astype(np.float32)


def hash_theme(theme):
    return sum(map(ord, theme or "align"))


def _lufs(path):
    meas = subprocess.run(["ffmpeg", "-hide_banner", "-i", path, "-af", "ebur128", "-f", "null", "-"],
                          capture_output=True, text=True).stderr
    return float(re.findall(r"I:\s+(-?[\d.]+) LUFS", meas)[-1])


def master(wav, target_lufs=-14.0, ceiling_db=-2.0):
    """Bring the loop to target loudness (Instagram normalises near -14) and limit the
    sample peak at -2 dB so the true peak stays under -1 dBTP after AAC."""
    gain = target_lufs - _lufs(wav)
    out = wav.replace(".wav", "-m.wav")
    lim = 10 ** (ceiling_db / 20)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", wav, "-af",
                    f"volume={gain:.2f}dB,alimiter=limit={lim:.3f}:attack=1:release=60:level=false",
                    "-ar", str(SR), out], check=True)
    os.remove(wav)
    return out


def write_wav(path, x):
    pcm = (np.clip(x.T, -1, 1) * 32767).astype("<i2")
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


if __name__ == "__main__":
    import sys
    seed = int(sys.argv[1]) if len(sys.argv) > 1 else 0
    write_wav(sys.argv[2] if len(sys.argv) > 2 else f"visions-{seed}.wav", compose(10.0, seed, "love"))
