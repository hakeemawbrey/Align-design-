"""Turns note events into a stereo mix. Every colour is an instrument, all synthesised here.

A note is (time_s, midi, colour, velocity). Notes come from the drawing itself (see
render.py): where the playhead crosses a line, that line sounds. Height is pitch.
"""
import wave

import numpy as np

SR = 44100

# sign -> (root midi, scale, bpm). Fire is bright major pentatonic, earth warm,
# air lydian-ish and open, water minor pentatonic.
MAJ = [0, 2, 4, 7, 9]
MIN = [0, 3, 5, 7, 10]
LYD = [0, 2, 4, 6, 7, 9, 11]
EARTH = [0, 2, 4, 5, 7, 9]
KEY = {
    "aries": (62, MAJ, 104), "leo": (60, MAJ, 96), "sagittarius": (64, MAJ, 108),
    "taurus": (57, EARTH, 84), "virgo": (59, EARTH, 92), "capricorn": (55, EARTH, 88),
    "gemini": (62, LYD, 100), "libra": (60, LYD, 90), "aquarius": (63, LYD, 98),
    "cancer": (57, MIN, 86), "scorpio": (52, MIN, 80), "pisces": (58, MIN, 84),
}

# colour -> (instrument, octave shift, pan)
VOICE = {
    "ink": ("bass", -12, 0.0), "green": ("marimba", 0, -0.25), "orange": ("pluck", 0, 0.25),
    "sand": ("pluck", -12, 0.1), "blue": ("bell", 0, -0.15), "sky": ("flute", 12, 0.3),
    "red": ("piano", 0, -0.3), "pink": ("glass", 12, 0.35), "violet": ("chime", 12, 0.0),
}


def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def pitch(sign, y, colour, height=130.0):
    """Sheet height (0 top .. 130 bottom) -> a midi note in the sign's scale."""
    root, scale, _ = KEY[sign]
    deg = int(round((1 - y / height) * (len(scale) * 2.6))) - 2
    octv, i = divmod(deg, len(scale))
    return root + 12 * octv + scale[i] + VOICE[colour][1]


def tone(inst, f, dur):
    t = np.arange(int(dur * SR)) / SR
    att = np.minimum(1, t / 0.004)
    if inst == "marimba":
        y = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * 3.93 * f * t) * np.exp(-t * 40)
        env = np.exp(-t * 6)
    elif inst == "pluck":
        y = sum(np.sin(2 * np.pi * f * k * t) / k * np.exp(-t * (2.5 + 2.2 * k)) for k in range(1, 9))
        env = np.ones_like(t)
    elif inst == "bell":
        y = np.sin(2 * np.pi * f * t + 1.8 * np.exp(-t * 5) * np.sin(2 * np.pi * 1.41 * f * t))
        env = np.exp(-t * 2.6)
    elif inst == "bass":
        y = np.tanh(1.5 * (np.sin(2 * np.pi * f * t) + 0.25 * np.sin(4 * np.pi * f * t)))
        env = np.exp(-t * 4.5)
    elif inst == "piano":
        y = sum(np.sin(2 * np.pi * f * k * 1.0008 ** k * t) / k ** 1.3 * np.exp(-t * (1.8 + 1.5 * k))
                for k in range(1, 7))
        env = np.ones_like(t)
    elif inst == "glass":
        y = np.sin(2 * np.pi * f * t) + 0.4 * np.sin(2 * np.pi * 2.76 * f * t) * np.exp(-t * 6)
        env = np.exp(-t * 3.5)
    elif inst == "flute":
        y = np.sin(2 * np.pi * f * t + 0.02 * np.sin(2 * np.pi * 5 * t) * f / 50) \
            + 0.15 * np.sin(4 * np.pi * f * t)
        att = np.minimum(1, t / 0.03)
        env = np.exp(-t * 4)
    else:  # chime
        y = np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * 2.0 * f * t) * np.exp(-t * 4) \
            + 0.25 * np.sin(2 * np.pi * 5.4 * f * t) * np.exp(-t * 12)
        env = np.exp(-t * 2.2)
    return (y * env * att).astype(np.float32)


def reverb(x, secs=2.0, seed=7):
    rng = np.random.default_rng(seed)
    n = int(secs * SR)
    t = np.arange(n) / SR
    out = np.zeros_like(x)
    for ch in range(2):
        ir = rng.standard_normal(n) * np.exp(-t * 3.2)
        ir[: int(0.012 * SR)] = 0
        m = len(x) + n
        L = 1 << (m - 1).bit_length()
        out[:, ch] = np.fft.irfft(np.fft.rfft(x[:, ch], L) * np.fft.rfft(ir, L), L)[: len(x)]
    return out / np.max(np.abs(out) + 1e-9) * np.max(np.abs(x) + 1e-9)


def mix(sign, notes, total):
    out = np.zeros((int(total * SR) + SR, 2), np.float32)
    cache = {}
    for t0, m, colour, vel in notes:
        inst, _, pan = VOICE[colour]
        key = (inst, m)
        if key not in cache:
            cache[key] = tone(inst, hz(m), 1.6 if inst in ("bell", "chime", "piano", "pluck") else 1.0)
        y = cache[key] * vel * (1.3 if inst == "bass" else 1.0)
        i = int(t0 * SR)
        j = min(len(out), i + len(y))
        out[i:j, 0] += y[: j - i] * np.sqrt((1 - pan) / 2)
        out[i:j, 1] += y[: j - i] * np.sqrt((1 + pan) / 2)
    # a very quiet drone on the root, so the blank sheet isn't dead air
    root = KEY[sign][0] - 24
    t = np.arange(len(out)) / SR
    drone = (np.sin(2 * np.pi * hz(root) * t) + 0.5 * np.sin(2 * np.pi * hz(root + 7) * t)) \
        * (0.5 + 0.5 * np.sin(2 * np.pi * t / 7)) * 0.025
    out += drone[:, None]
    out = 0.78 * out + 0.32 * reverb(out)
    out = out[: int(total * SR)]
    fade = int(1.2 * SR)
    out[-fade:] *= np.linspace(1, 0, fade)[:, None]
    out /= max(1e-6, np.max(np.abs(out))) / 0.89
    return out


def write_wav(path, x):
    pcm = (np.clip(x, -1, 1) * 32767).astype("<i2")
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())
