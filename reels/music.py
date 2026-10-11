"""Procedural soundtrack, timed to the reel's cut grid.

Shape follows the reference: a quiet swelling intro under the card, one big hit
when the montage starts, then a steady dark pad with a pulse on every cut.
Each sign gets its own root (12 signs, 12 semitones from C) and its element's mode.
The seed varies the voicing and texture, so every render sounds a little different.
"""
import numpy as np

SR = 44100
ORDER = ["aries", "taurus", "gemini", "cancer", "leo", "virgo",
         "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"]
MODES = {  # semitone sets
    "fire": [0, 1, 4, 5, 7, 8, 10],    # phrygian dominant: heat
    "earth": [0, 2, 3, 5, 7, 8, 10],   # aeolian: weight
    "air": [0, 2, 4, 6, 7, 9, 11],     # lydian: lift
    "water": [0, 2, 3, 5, 7, 9, 10],   # dorian: drift
}


def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


def env_ar(n, a, r):
    e = np.ones(n)
    ai, ri = int(a * SR), int(r * SR)
    if ai:
        e[:ai] = np.linspace(0, 1, ai)
    if ri:
        e[-ri:] *= np.linspace(1, 0, ri)
    return e


def reverb(x, seconds=3.5, mix=0.35, rng=None):
    rng = rng or np.random.default_rng(0)
    n = int(seconds * SR)
    t = np.arange(n) / SR
    ir = rng.normal(0, 1, (2, n)) * np.exp(-t * 6.9 / seconds)
    ir[:, : int(0.01 * SR)] *= np.linspace(0, 1, int(0.01 * SR))
    L = x.shape[1] + n
    nfft = 1 << (L - 1).bit_length()
    X = np.fft.rfft(x, nfft)
    wet = np.fft.irfft(X * np.fft.rfft(ir, nfft), nfft)[:, : x.shape[1]]
    wet /= np.abs(wet).max() + 1e-9
    return x * (1 - mix) + wet * mix * np.abs(x).max()


def lowpass(x, cutoff):
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = np.empty_like(x)
    acc = np.zeros(x.shape[0])
    for i in range(x.shape[1]):  # one-pole; fine for short buffers
        acc = (1 - a) * x[:, i] + a * acc
        y[:, i] = acc
    return y


def lowpass_fast(x, cutoff):
    """Brick-wall-ish FFT lowpass for long buffers."""
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(x.shape[-1], 1 / SR)
    X *= 1 / (1 + (f / cutoff) ** 4)
    return np.fft.irfft(X, x.shape[-1])


def pad(freqs, n, rng, bright=1.0):
    t = np.arange(n) / SR
    out = np.zeros((2, n))
    for f in freqs:
        for k, det in enumerate((-0.11, 0.0, 0.13)):
            ff = f * 2 ** (det / 12)
            ph = rng.uniform(0, 2 * np.pi)
            # soft saw from a few partials
            s = sum(np.sin(2 * np.pi * ff * h * t + ph * h) / h ** (1.6 / bright) for h in range(1, 7))
            pan = (k - 1) * 0.6
            out[0] += s * (1 - pan) * 0.5
            out[1] += s * (1 + pan) * 0.5
    lfo = 0.75 + 0.25 * np.sin(2 * np.pi * 0.11 * t + rng.uniform(0, 6))
    return out * lfo / (len(freqs) * 3)


def kick(n_len, f0=120, f1=38, decay=0.45):
    n = int(n_len * SR)
    t = np.arange(n) / SR
    f = f1 + (f0 - f1) * np.exp(-t * 30)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t / decay)


def compose(sign, element, intro, beat, total, seed=0):
    rng = np.random.default_rng(seed + 1000 * ORDER.index(sign))
    n = int(total * SR)
    mode = MODES[element]
    root = 36 + ORDER.index(sign)  # C2 + offset
    deg = lambda d, octv=0: root + 12 * octv + mode[d % 7] + 12 * (d // 7)

    mix = np.zeros((2, n))
    t = np.arange(n) / SR
    hit = int(intro * SR)

    # drone under everything, opening up after the hit
    drone = pad([hz(deg(0, 1)), hz(deg(4, 1))], n, rng, bright=0.7)
    open_env = np.clip((t - intro) / 1.5, 0, 1) * 0.5 + 0.5
    mix += drone * open_env * 0.55

    # main chord after the hit: i - (VI or v) every 4 bars, voicing varies by seed
    chords = [[0, 2, 4, 7], [5, 7, 9, 12], [3, 5, 7, 10], [4, 6, 8, 11]]
    rng.shuffle(chords[1:])
    bar = beat * 4
    c_len = bar * 2
    pos = hit
    i = 0
    while pos < n:
        m = min(int(c_len * SR), n - pos)
        ch = chords[i % len(chords)]
        p = pad([hz(deg(d, 2)) for d in ch], m, rng, bright=1.1)
        p *= env_ar(m, 0.25, 0.4)
        mix[:, pos:pos + m] += p * 0.9
        pos += m
        i += 1

    # intro riser: filtered noise swelling into the hit, plus reversed shimmer
    rn = hit
    noise = rng.normal(0, 1, (2, rn))
    swell = 0.35 + 0.65 * np.linspace(0, 1, rn) ** 2   # audible from frame one
    noise = lowpass_fast(noise, 900) * swell
    mix[:, :rn] += noise * 0.35
    shimmer = pad([hz(deg(0, 4)), hz(deg(4, 4))], rn, rng, bright=1.5) * swell
    mix[:, :rn] += shimmer * 0.6

    # the hit: sub drop + noise burst + low chord stab
    k = kick(2.5, 90, 30, 0.9) * 1.0
    burst = lowpass_fast(rng.normal(0, 1, (2, int(1.2 * SR))), 3000) * np.exp(-np.arange(int(1.2 * SR)) / SR / 0.18)
    end = min(hit + len(k), n)
    mix[:, hit:end] += k[: end - hit] * 1.0
    end = min(hit + burst.shape[1], n)
    mix[:, hit:end] += burst[:, : end - hit] * 0.5

    # pulse on every cut
    pk = kick(0.5, 110, 42, 0.16)
    tick = rng.normal(0, 1, int(0.03 * SR)) * np.exp(-np.arange(int(0.03 * SR)) / SR / 0.006)
    c = intro + beat
    j = 1
    while c < total - 0.05:
        s = int(c * SR)
        e = min(s + len(pk), n)
        accent = 1.0 if j % 4 == 0 else 0.6
        mix[:, s:e] += pk[: e - s] * 0.55 * accent
        e2 = min(s + len(tick), n)
        mix[:, s:e2] += tick[: e2 - s] * 0.04
        c += beat
        j += 1

    # high arpeggio, sparse, on off-beats
    arp_deg = [0, 4, 7, 9, 11, 7, 4, 2]
    rng.shuffle(arp_deg)
    c = intro + beat / 2
    j = 0
    while c < total - 0.3:
        if rng.random() < 0.7:
            f = hz(deg(arp_deg[j % len(arp_deg)], 4))
            m = int(0.9 * SR)
            tt = np.arange(m) / SR
            note = (np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(4 * np.pi * f * tt)) * np.exp(-tt / 0.35)
            s = int(c * SR)
            e = min(s + m, n)
            pan = rng.uniform(-0.7, 0.7)
            mix[0, s:e] += note[: e - s] * 0.08 * (1 - pan)
            mix[1, s:e] += note[: e - s] * 0.08 * (1 + pan)
        c += beat / 2
        j += 1

    mix = reverb(mix, 3.8, 0.4, rng)
    # master: lots of gain into soft saturation, then normalize to ~-1 dBFS
    mix /= np.abs(mix).max() + 1e-9
    # build ~1.5 dB over the last 5s, like the reference
    mix *= 1 + 0.19 * np.clip((t - (total - 5)) / 5, 0, 1)
    mix /= np.abs(mix).max() + 1e-9
    mix = np.tanh(mix * 3.5) / np.tanh(3.5)
    # fades
    fi, fo = int(0.05 * SR), int(0.25 * SR)
    mix[:, :fi] *= np.linspace(0, 1, fi)
    mix[:, -fo:] *= np.linspace(1, 0, fo)
    return (mix * 0.89).astype(np.float32)


def write_wav(path, x):
    import wave
    pcm = (np.clip(x.T, -1, 1) * 32767).astype("<i2")
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


if __name__ == "__main__":
    import sys
    s = sys.argv[1] if len(sys.argv) > 1 else "aries"
    import json, os
    cfg = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "signs.json")))[s]
    write_wav(sys.argv[2] if len(sys.argv) > 2 else f"{s}.wav",
              compose(s, cfg["element"], 2.2, 0.6, 18.4, seed=int(sys.argv[3]) if len(sys.argv) > 3 else 0))
