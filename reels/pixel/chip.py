#!/usr/bin/env python3
"""Procedural lo-fi chiptune scores for the pixel zodiac reels.

  python3 chip.py pisces --seed 3 --seconds 20 -o /tmp/pisces.wav

Every (sign, seed) pair gives a new, original track: the seed picks the key, the mode
(from the sign's element), a 4-chord loop, an 8-bar melody (a motif, its variations and a
cadence, mostly stepwise and landing on chord tones) and the instrument details. Nothing
here quotes an existing song; all melodies come from scales, chords and dice.

  fire  (aries, leo, sagittarius)    warm and bright, major/lydian, a little bouncy
  earth (taurus, virgo, capricorn)   grounded and mellow, major/mixolydian, steady
  air   (gemini, libra, aquarius)    light, sus chords, lots of arpeggios
  water (cancer, scorpio, pisces)    dreamy, minor/dorian, slower, more reverb

Instruments are all band-limited wavetables (harmonics stop below ~9 kHz, then a soft
low-pass roll-off), so the pulses never fizz: pulse lead with delayed vibrato, a ping-pong
echo and an optional glide; a triangle bass; a quiet detuned pulse pad; pulse arpeggios;
soft noise hats or a shaker (sometimes absent); a small stereo convolution reverb.

API (other code imports these):
  SR = 44100
  render(sign, seed, seconds, cues=(), ticks=()) -> float32 (n, 2), peak about -1 dBFS
      cues:  times (s) of new text cards  -> a soft sparkly chime arpeggio
      ticks: times (s) of typed characters -> very quiet, short "text blips"
  write_wav(path, audio)  16-bit PCM stereo
"""
import argparse
import os
import sys
import time
import wave
import zlib

import numpy as np

SR = 44100

SIGNS = ["aries", "taurus", "gemini", "cancer", "leo", "virgo",
         "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"]
ELEMENT = {s: ("fire", "earth", "air", "water")[i % 4] for i, s in enumerate(SIGNS)}

MODES = {
    "ionian":     [0, 2, 4, 5, 7, 9, 11],
    "lydian":     [0, 2, 4, 6, 7, 9, 11],
    "mixolydian": [0, 2, 4, 5, 7, 9, 10],
    "dorian":     [0, 2, 3, 5, 7, 9, 10],
    "aeolian":    [0, 2, 3, 5, 7, 8, 10],
}
# 4-chord loops as 0-based scale degrees (no diminished chords anywhere)
PROGS = {
    "ionian":     [[0, 4, 5, 3], [0, 5, 3, 4], [3, 4, 2, 5], [0, 3, 5, 4], [5, 3, 0, 4],
                   [0, 2, 3, 4], [3, 0, 4, 5], [0, 3, 0, 4]],
    "lydian":     [[0, 1, 0, 1], [0, 1, 2, 1], [0, 1, 5, 4], [0, 4, 1, 0], [0, 2, 1, 0]],
    "mixolydian": [[0, 6, 3, 0], [0, 4, 6, 3], [0, 6, 4, 3], [3, 6, 0, 0], [0, 3, 6, 3]],
    "dorian":     [[0, 3, 0, 3], [0, 2, 3, 0], [0, 6, 3, 0], [0, 1, 2, 3], [0, 4, 6, 3],
                   [0, 3, 6, 4]],
    "aeolian":    [[0, 5, 2, 6], [0, 6, 5, 6], [0, 3, 5, 6], [5, 6, 0, 0], [0, 5, 3, 6],
                   [0, 2, 6, 3]],
}

# melody rhythms: (start, length) in eighth-note slots of a 4/4 bar
RHYTHMS = {
    "A": [(0, 2), (2, 1), (3, 1), (4, 2), (6, 2)],
    "B": [(0, 1), (1, 1), (2, 2), (4, 1), (5, 1), (6, 2)],
    "C": [(0, 3), (3, 1), (4, 2), (6, 1), (7, 1)],
    "D": [(1, 1), (2, 1), (3, 1), (4, 4)],
    "E": [(0, 2), (2, 2), (4, 1), (5, 1), (6, 2)],
    "F": [(0, 2), (3, 1), (4, 2), (6, 2)],
    "G": [(0, 4), (4, 1), (5, 1), (6, 2)],
    "H": [(0, 3), (3, 3), (6, 2)],
    "I": [(0, 2), (2, 1), (3, 3), (6, 2)],
}
CADENCES = [[(0, 2), (2, 2), (4, 4)], [(0, 1), (1, 1), (2, 2), (4, 4)], [(0, 3), (3, 1), (4, 4)],
            [(0, 2), (2, 1), (3, 5)], [(0, 6)], [(2, 2), (4, 4)]]

STEPS = [-2, -1, 1, 2, 0, 3, -3]

ELEMENTS = {
    "fire": dict(modes=(["ionian", "lydian"], [0.6, 0.4]), bpm=(84, 92), swing=(0.06, 0.16),
                 rhythms="ABCFI", steps=[.14, .28, .28, .14, .06, .05, .05],
                 hats=0.85, hat_kinds=["off8", "8ths", "shaker"], arp=0.55, arp16=0.5,
                 bass=["bounce", "bounce2", "steady"], sus=0.1, sev=0.25,
                 t60=(1.3, 1.8), rev=(0.16, 0.22), lead_fc=(2600, 3200), lead_gain=1.0),
    "earth": dict(modes=(["ionian", "mixolydian"], [0.5, 0.5]), bpm=(76, 86), swing=(0.03, 0.10),
                  rhythms="AEGHF", steps=[.12, .30, .30, .12, .10, .03, .03],
                  hats=0.7, hat_kinds=["shaker", "off8", "sparse"], arp=0.35, arp16=0.2,
                  bass=["steady", "steady2", "airy"], sus=0.15, sev=0.4,
                  t60=(1.5, 2.0), rev=(0.18, 0.24), lead_fc=(2100, 2700), lead_gain=0.95),
    "air": dict(modes=(["ionian", "lydian", "mixolydian"], [0.45, 0.35, 0.2]), bpm=(80, 90),
                swing=(0.0, 0.08), rhythms="BCDEA", steps=[.15, .25, .25, .15, .04, .08, .08],
                hats=0.6, hat_kinds=["sparse", "shaker", "off8"], arp=1.0, arp16=0.8,
                bass=["airy", "airy2", "steady2"], sus=0.7, sev=0.2,
                t60=(1.8, 2.4), rev=(0.22, 0.28), lead_fc=(2400, 3000), lead_gain=0.9),
    "water": dict(modes=(["aeolian", "dorian"], [0.5, 0.5]), bpm=(72, 80), swing=(0.04, 0.12),
                  rhythms="GHDIF", steps=[.10, .32, .32, .10, .10, .03, .03],
                  hats=0.35, hat_kinds=["sparse", "shaker"], arp=0.6, arp16=0.15,
                  bass=["long", "long2", "airy2"], sus=0.2, sev=0.5,
                  t60=(2.6, 3.4), rev=(0.30, 0.36), lead_fc=(1900, 2500), lead_gain=0.9),
}

# bass bars: (start beat, length in beats, tone) tone 0 = root, 4 = fifth, 7 = octave
BASS = {
    "bounce":  [(0, .5, 0), (.5, .5, 7), (1, .5, 0), (1.5, .5, 7), (2, .5, 0), (2.5, .5, 7),
                (3, .5, 4), (3.5, .5, 7)],
    "bounce2": [(0, 1, 0), (1.5, .5, 0), (2, 1, 4), (3, .5, 7), (3.5, .5, 4)],
    "steady":  [(0, 1, 0), (1, 1, 4), (2, 1, 0), (3, 1, 4)],
    "steady2": [(0, 1.5, 0), (1.5, .5, 0), (2, 2, 4)],
    "airy":    [(0, 2, 0), (2, 1.5, 4), (3.5, .5, 7)],
    "airy2":   [(0, 3, 0), (3, 1, 4)],
    "long":    [(0, 4, 0)],
    "long2":   [(0, 2.5, 0), (2.5, 1.5, 4)],
}

TABLE_N = 2048
_TABLES = {}


# ------------------------------------------------------------------ oscillators

def _table(amps):
    spec = np.zeros(TABLE_N // 2 + 1, complex)
    spec[1:len(amps) + 1] = -0.5j * TABLE_N * np.asarray(amps)
    t = np.fft.irfft(spec, TABLE_N)
    t /= np.sqrt(np.mean(t * t)) * 2.0          # every table at the same RMS (0.5)
    return np.append(t, t[0])


def _pulse_tab(f0, duty, fc, cap=8500.0, order=2):
    key = ("p", round(f0, 1), duty, int(fc), order)
    if key not in _TABLES:
        K = int(max(1, min(64, cap // f0)))
        k = np.arange(1, K + 1)
        a = 2 / (np.pi * k) * np.sin(np.pi * k * duty) / np.sqrt(1 + (k * f0 / fc) ** (2 * order))
        _TABLES[key] = _table(a)
    return _TABLES[key]


def _tri_tab(f0, fc=1400.0, cap=6000.0):
    key = ("t", round(f0, 1), int(fc))
    if key not in _TABLES:
        K = int(max(1, min(31, cap // f0)))
        k = np.arange(1, K + 1)
        a = np.where(k % 2 == 1, (-1.0) ** ((k - 1) // 2) / k ** 2, 0.0)
        a = a / np.sqrt(1 + (k * f0 / fc) ** 4)
        _TABLES[key] = _table(a)
    return _TABLES[key]


def _bell_tab(f0):
    K = int(max(1, min(4, 6500 // f0)))
    key = ("bell", K)
    if key not in _TABLES:
        _TABLES[key] = _table([1.0, 0.22, 0.07, 0.025][:K])
    return _TABLES[key]


def _blip_tab():
    if "blip" not in _TABLES:
        _TABLES["blip"] = _table([1.0, 0.0, 0.16, 0.0, 0.05])
    return _TABLES["blip"]


def _osc(tab, freq, n, phase0=0.0):
    if np.ndim(freq) == 0:
        ph = phase0 + np.arange(n) * (freq / SR)
    else:
        ph = phase0 + np.cumsum(freq) / SR
    p = (ph % 1.0) * TABLE_N
    i = p.astype(np.int32)
    fr = p - i
    return tab[i] + (tab[i + 1] - tab[i]) * fr


def _env(n_gate, n_rel, att, dec, sus):
    n_gate = max(1, n_gate)
    t = np.arange(n_gate + n_rel) / SR
    a = max(att, 1e-4)
    e = np.where(t < a, np.sin(0.5 * np.pi * np.clip(t / a, 0, 1)) ** 2,
                 sus + (1 - sus) * np.exp(-np.maximum(t - a, 0) / max(dec, 1e-4)))
    if n_rel > 0:
        g = e[n_gate - 1]
        x = np.arange(n_rel) / n_rel
        e[n_gate:] = g * 0.5 * (1 + np.cos(np.pi * x))
    return e


def _note(tab, f0, gate, rel, att, dec, sus, vib=None, glide_from=None, phase0=0.0):
    ng, nr = int(gate * SR), int(rel * SR)
    n = max(1, ng) + nr
    if vib is None and glide_from is None:
        y = _osc(tab, f0, n, phase0)
    else:
        t = np.arange(n) / SR
        f = np.full(n, float(f0))
        if vib is not None:
            depth, rate, delay, vph = vib
            ramp = np.clip((t - delay) / 0.25, 0, 1)
            f *= 2 ** (depth / 1200 * np.sin(2 * np.pi * rate * t + vph) * ramp)
        if glide_from is not None:
            f *= (glide_from / f0) ** np.exp(-t / 0.035)
        y = _osc(tab, f, n, phase0)
    return y * _env(ng, nr, att, dec, sus)


def _add(buf, i0, sig, gain=1.0):
    if i0 >= len(buf):
        return
    if i0 < 0:
        sig = sig[-i0:]
        i0 = 0
    i1 = min(len(buf), i0 + len(sig))
    buf[i0:i1] += gain * sig[:i1 - i0]


def _hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def _pan(p):
    a = (p + 1) * np.pi / 4
    return np.cos(a), np.sin(a)


# ------------------------------------------------------------------ filters (FFT, zero phase)

def _nfft(n):
    return 1 << int(np.ceil(np.log2(max(2, n))))


def _spectral(x, gain_fn):
    n = len(x)
    nf = _nfft(n)
    f = np.fft.rfftfreq(nf, 1 / SR)
    g = gain_fn(f)
    return np.fft.irfft(np.fft.rfft(x, nf, axis=0) * (g[:, None] if x.ndim == 2 else g),
                        nf, axis=0)[:n]


def _lp(f, fc, order=2):
    return 1 / np.sqrt(1 + (f / fc) ** (2 * order))


def _hp(f, fc, order=2):
    r = (f / fc) ** (2 * order)
    return np.sqrt(r / (1 + r))


def _noise(rng, n, lo, hi, env=None):
    """Band-limited noise; with env, the envelope is applied before filtering (no clicks)."""
    x = rng.standard_normal(n)
    if env is not None:
        x = x * env
    nf = _nfft(2 * n)
    f = np.fft.rfftfreq(nf, 1 / SR)
    y = np.fft.irfft(np.fft.rfft(x, nf) * _hp(f, lo, 2) * _lp(f, hi, 4), nf)[:n]
    return y / (np.sqrt(np.mean(y * y)) + 1e-12)


def _echo(x, d, fb, taps=5):
    """Ping-pong echo, each repeat a little darker."""
    out = np.zeros((len(x), 2))
    cur = x
    k5 = np.array([1, 4, 6, 4, 1]) / 16.0
    for k in range(1, taps + 1):
        cur = np.convolve(cur, k5, mode="same") * fb
        s = k * d
        if s >= len(x):
            break
        ch = (k + 1) % 2              # first repeat right, then left, ...
        out[s:, ch] += cur[:len(x) - s] * 0.85
        out[s:, 1 - ch] += cur[:len(x) - s] * 0.25
    return out


def _reverb_ir(rng, t60, predelay, damp):
    n = int(min(t60 * 1.15, 6.0) * SR)
    t = np.arange(n) / SR
    ir = np.zeros((n, 2))
    for c in range(2):
        bright = _noise(rng, n, 180, damp) * np.exp(-6.9 * t / (0.55 * t60))
        dark = _noise(rng, n, 150, damp * 0.35) * np.exp(-6.9 * t / t60)
        ir[:, c] = (0.6 * bright + 0.8 * dark) * (1 - np.exp(-t / 0.012))
        ir[:, c] /= np.sqrt(np.sum(ir[:, c] ** 2))
    pd = int(predelay * SR)
    return np.vstack([np.zeros((pd, 2)), ir])


def _convolve(x, ir):
    n = len(x)
    nf = _nfft(n + len(ir))
    X = np.fft.rfft(x, nf)
    return np.stack([np.fft.irfft(X * np.fft.rfft(ir[:, c], nf), nf)[:n] for c in range(2)], 1)


def _kweight_ms(x):
    """Mean square after an approximate K-weighting with BS.1770-style gating."""
    m = x.mean(1) if x.ndim == 2 else x
    if len(m) < SR // 2:
        return float(np.mean(m * m)) + 1e-12
    y = _spectral(m, lambda f: _hp(f, 38, 1) * 10 ** (4 / 20 * (f ** 2 / (f ** 2 + 1500 ** 2))))
    b = int(0.1 * SR)
    sub = np.mean(y[:len(y) // b * b].reshape(-1, b) ** 2, 1)
    blk = np.convolve(sub, np.ones(4) / 4, mode="valid")
    blk = blk[blk > 10 ** (-70 / 10)]
    if len(blk) == 0:
        return 1e-12
    blk = blk[blk > np.mean(blk) * 0.1]
    return float(np.mean(blk))


def _limit(x, thresh):
    """Smooth peak limiter: gain envelope from a min-filter, then a short smoothing."""
    a = np.abs(x).max(1)
    need = np.minimum(1.0, thresh / np.maximum(a, 1e-9))
    if need.min() >= 1.0:
        return x
    b = 64
    n = len(need)
    pad = (-n) % b
    blocks = np.concatenate([need, np.ones(pad)]).reshape(-1, b).min(1)
    w = 8                                         # ~12 ms look-around
    padded = np.concatenate([np.ones(w), blocks, np.ones(w)])
    mins = np.min(np.stack([padded[i:i + len(blocks)] for i in range(2 * w + 1)]), 0)
    g = np.repeat(mins, b)[:n]
    k = np.hanning(2 * w * b // 2 + 1)
    k /= k.sum()
    g = np.convolve(np.concatenate([np.ones(len(k)), g, np.ones(len(k))]), k, mode="same")
    g = g[len(k):len(k) + n]
    y = x * g[:, None]
    # safety: gentle knee for anything that still sneaks over
    return np.clip(y, -thresh, thresh)


# ------------------------------------------------------------------ the plan (all seed choices)

class _Plan:
    pass


def _chord_shape(mode, d, kind):
    """Scale-step offsets for a chord on degree d, falling back to a triad if it would sour."""
    iv = MODES[mode]

    def semis(o):
        s = d + o
        return iv[s % 7] + 12 * (s // 7) - iv[d]

    if semis(4) != 7:
        return (0, 2, 4)
    if kind == "sus2" and semis(1) == 2:
        return (0, 1, 4)
    if kind == "sus4" and semis(3) == 5:
        return (0, 3, 4)
    if kind == "add9" and semis(1) == 2:
        return (0, 2, 4, 8)
    if kind == "7":
        return (0, 2, 4, 6)
    return (0, 2, 4)


def _plan(sign, rng, over=None):
    P = _Plan()
    el = ELEMENT[sign]
    E = dict(ELEMENTS[el], **(over or {}))
    P.el = el
    names, probs = E["modes"]
    P.mode = str(rng.choice(names, p=probs))
    P.iv = MODES[P.mode]
    P.root_pc = int(rng.integers(12))
    P.bpm = float(rng.uniform(*E["bpm"]))
    P.beat = 60.0 / P.bpm
    P.bar = 4 * P.beat
    P.eighth = P.beat / 2
    P.swing = float(rng.uniform(*E["swing"]))
    progs = PROGS[P.mode]
    P.prog = progs[int(rng.integers(len(progs)))]

    # chord colours, fixed per position in the loop so the loop is consistent
    P.shapes = []
    for d in P.prog:
        r = rng.random()
        if r < E["sus"]:
            kind = str(rng.choice(["sus2", "sus4", "add9"], p=[0.45, 0.3, 0.25]))
        elif r < E["sus"] + E["sev"] * (1 - E["sus"]):
            kind = "7"
        else:
            kind = "triad"
        P.shapes.append(_chord_shape(P.mode, d, kind))

    # registers
    P.lead_root = 62 + (P.root_pc - 62) % 12            # tonic in [62, 74)
    P.bass_root = 36 + (P.root_pc - 36) % 12            # [36, 48)

    # instruments
    P.lead_duty = float(rng.choice([0.5, 0.25, 0.125, 0.375], p=[0.35, 0.37, 0.06, 0.22]))
    P.lead_fc = float(rng.uniform(*E["lead_fc"]))
    P.lead_tri = rng.random() < 0.15                    # sometimes a soft triangle lead
    P.vib = (float(rng.uniform(10, 22)), float(rng.uniform(4.6, 5.8)), float(rng.uniform(0.12, 0.22)))
    P.lead_att = float(rng.uniform(0.012, 0.028))
    P.legato = float(rng.uniform(0.82, 0.95)) if el != "water" else float(rng.uniform(0.9, 0.98))
    P.glide = rng.random() < (0.5 if el == "water" else 0.35)
    P.lead_pan = float(rng.uniform(-0.15, 0.15))
    P.lead_gain = E["lead_gain"]
    P.intro = int(rng.random() < E.get("intro", 0.45))
    P.delay = float(rng.choice([0.75, 0.5, 1.0, 1.5], p=[0.45, 0.25, 0.2, 0.1])) * P.beat
    P.fb = float(rng.uniform(0.32, 0.45)) if el == "water" else float(rng.uniform(0.25, 0.38))
    P.echo_wet = float(rng.uniform(0.22, 0.32))

    P.bass_pat = str(rng.choice(E["bass"]))
    P.bass_fc = float(rng.uniform(900, 1500))

    P.pad_duty = float(rng.choice([0.5, 0.3, 0.2]))
    P.pad_fc = float(rng.uniform(900, 1400))
    P.pad_detune = float(rng.uniform(5, 10))
    P.pad_gain = float(rng.uniform(0.8, 1.15))

    P.arp_on = rng.random() < E["arp"]
    P.arp16 = rng.random() < E["arp16"]
    P.arp_pat = [[0, 1, 2, 3], [0, 1, 2, 3, 2, 1], [0, 2, 1, 3], [3, 2, 1, 0], [0, 1, 2, 1]][
        int(rng.integers(5))]
    P.arp_oct = 12 if (el == "water" and rng.random() < 0.5) else 0
    P.arp_duty = float(rng.choice([0.125, 0.25]))
    P.arp_bell = el == "water" and rng.random() < 0.6
    P.arp_start = int(rng.integers(0, 2)) if el != "air" else 0
    P.arp_gain = 1.0 if el == "air" else 0.75

    P.hats_on = rng.random() < E["hats"]
    P.hat_kind = str(rng.choice(E["hat_kinds"]))
    P.hat_start = int(rng.choice([0, 1, 2], p=[0.4, 0.3, 0.3]))

    P.t60 = float(rng.uniform(*E["t60"]))
    P.rev = float(rng.uniform(*E["rev"]))

    P.melody = _melody(P, rng, E)
    return P


def _snap(s, cts, rng, prefer=0):
    best = None
    for dlt in sorted(range(-3, 4), key=lambda v: (abs(v), -prefer * v)):
        if (s + dlt) % 7 in cts:
            best = s + dlt
            break
    return s if best is None else best


def _melody(P, rng, E):
    """8 bars: motif, variation, sequence, half cadence, motif, variation, lift, cadence."""
    lo, hi = -2, 8
    chords = [P.prog[(j + P.intro) % 4] for j in range(4)]
    shapes = [P.shapes[(j + P.intro) % 4] for j in range(4)]
    cts = [set((d + o) % 7 for o in sh) for d, sh in zip(chords, shapes)]
    pool = list(E["rhythms"])
    Rm = RHYTHMS[pool[int(rng.integers(len(pool)))]]
    Ra = RHYTHMS[pool[int(rng.integers(len(pool)))]]
    Rc1 = CADENCES[int(rng.integers(len(CADENCES)))]
    Rc2 = CADENCES[int(rng.integers(len(CADENCES)))]
    sp = np.array(E["steps"]) / np.sum(E["steps"])

    def steps(n):
        out = []
        while len(out) < n:
            v = int(rng.choice(STEPS, p=sp))
            if v == 0 and (0 in out):          # at most one repeated note per motif
                continue
            out.append(v)
        return out

    Sm = steps(len(Rm) - 1)

    def mutate(S):
        S = list(S)
        for i in range(min(len(S), int(rng.integers(1, 3)))):
            S[-1 - i] = int(rng.choice(STEPS[:4], p=sp[:4] / sp[:4].sum()))
        return S

    def fit(S, n):
        return [S[i % len(S)] for i in range(n - 1)] if S else [1] * (n - 1)

    def phrase_bar(R, S, start, ct):
        out = []
        p = _snap(start, ct, rng)
        p = min(hi, max(lo, p))
        prev2 = None
        for i, (slot, ln) in enumerate(R):
            if i > 0:
                st = S[i - 1]
                q = p + st
                if q > hi or q < lo:
                    q = p - st
                if q == p == prev2:
                    q = p + (1 if p < 3 else -1)
                if slot in (0, 4) or ln >= 3:
                    q = _snap(q, ct, rng, prefer=int(np.sign(st)))
                if q == p == prev2:
                    q = _snap(p + (2 if p < 4 else -2), ct, rng)
                prev2, p = p, q
            out.append((slot, ln, p))
        return out

    def cadence_bar(R, prev, target):
        n = len(R)
        dirn = 1 if prev > target else -1
        if rng.random() < 0.3:
            dirn = -dirn
        ps = [target + dirn * (n - 1 - i) for i in range(n)]
        ps = [min(hi + 1, max(lo, v)) for v in ps]
        return [(s, ln, v) for (s, ln), v in zip(R, ps)]

    bars = []
    start0 = int(rng.choice([2, 3, 4, 5, 0, 7], p=[.25, .15, .25, .1, .1, .15]))
    b0 = phrase_bar(Rm, Sm, start0, cts[0])
    bars.append(b0)
    Sv = mutate(Sm)
    bars.append(phrase_bar(Rm, Sv, bars[-1][-1][2], cts[1]))
    shift = int(rng.choice([2, -2, 1, 3]))
    bars.append(phrase_bar(Ra, fit(Sm, len(Ra)), b0[0][2] + shift, cts[2]))
    # half cadence onto the 3rd or 5th of chord 4
    d3 = chords[3]
    half = _snap(bars[-1][-1][2], {(d3 + 2) % 7, (d3 + 4) % 7}, rng)
    bars.append(cadence_bar(Rc1, bars[-1][-1][2], half))
    bars.append(list(b0))
    bars.append(phrase_bar(Rm, mutate(Sm), bars[-1][-1][2], cts[1]))
    lift = int(rng.choice([2, 4, 3]))
    bars.append(phrase_bar(Ra, fit(mutate(Sm), len(Ra)), b0[0][2] + lift, cts[2]))
    # final cadence: tonic if the last chord holds it, else the chord root
    last = bars[-1][-1][2]
    goal = 0 if 0 in cts[3] else chords[3]
    target = min([goal - 7, goal, goal + 7], key=lambda v: (abs(v - last), v < lo or v > hi))
    bars.append(cadence_bar(Rc2, last, target))
    return bars


def _chord_at(P, b):
    i = b % 4
    return P.prog[i], P.shapes[i]


def _chord_pcs(P, b):
    d, sh = _chord_at(P, b)
    return [(P.root_pc + P.iv[(d + o) % 7]) % 12 for o in sh]


def _midi(P, base, s):
    return base + 12 * (s // 7) + P.iv[s % 7]


# ------------------------------------------------------------------ render

STYLES = ("dream", "chip")


def render(sign: str, seed: int, seconds: float, cues=(), ticks=(), style: str = "dream") -> np.ndarray:
    """Stereo float32 (round(seconds*SR), 2), peak about -1 dBFS, about -16 LUFS.

    style="dream" (default): slow, ethereal music-box/celesta over warm pads, for the
    mystic quote-card reels. style="chip": the cozy lo-fi chiptune for the pixel game reels.
    """
    sign = str(sign).strip().lower()
    if sign not in ELEMENT:
        raise ValueError(f"unknown sign {sign!r}; one of {', '.join(SIGNS)}")
    style = str(style).strip().lower()
    if style not in STYLES:
        raise ValueError(f"unknown style {style!r}; one of {', '.join(STYLES)}")
    N = int(round(seconds * SR))
    if N <= 0:
        return np.zeros((0, 2), np.float32)
    if style == "chip":
        mix, P = _chip(sign, seed, seconds, N, cues)
    else:
        mix, P = _dream(sign, seed, seconds, N, cues)
    return _master(mix, N, P, sign, seed, ticks)


def _chip(sign, seed, seconds, N, cues):
    rng = np.random.default_rng(zlib.crc32(f"chip|{sign}|{int(seed)}".encode()))
    P = _plan(sign, rng)
    L = N + int(4.0 * SR)
    nbars = int(np.ceil(seconds / P.bar)) + 1

    dry = np.zeros((L, 2))
    rev_send = np.zeros(L)
    lead = np.zeros(L)
    arps = np.zeros(L)
    hum = lambda: float(rng.uniform(-0.004, 0.004))

    def put_st(mono, i0, sig, pan, gain, rsend):
        l, r = _pan(pan)
        i1 = min(L, i0 + len(sig))
        if i0 >= L or i1 <= max(i0, 0):
            return
        s = sig[:i1 - i0] * gain
        if i0 < 0:
            s = s[-i0:]
            i0 = 0
        dry[i0:i1, 0] += s * l
        dry[i0:i1, 1] += s * r
        rev_send[i0:i1] += s * rsend

    def swing_t(slot, unit):
        return slot * unit + (P.swing * unit if slot % 2 else 0.0)

    # ---- pad: detuned pulses, merged across repeated chords
    b = 0
    while b < nbars:
        pcs = _chord_pcs(P, b)
        span = 1
        while b + span < nbars and _chord_pcs(P, b + span) == pcs and span < 2:
            span += 1
        t0 = b * P.bar
        for pc in pcs:
            m = 55 + (pc - 55) % 12
            for dt, pan in ((-P.pad_detune, -0.55), (P.pad_detune, 0.55)):
                f = _hz(m) * 2 ** (dt / 1200)
                sig = _note(_pulse_tab(f, P.pad_duty, P.pad_fc), f, span * P.bar, 0.7,
                            0.45, 1.2, 0.75, phase0=float(rng.random()))
                put_st(None, int(t0 * SR), sig, pan, 0.045 * P.pad_gain, 0.9)
        b += span

    # ---- bass: triangle
    pat = BASS[P.bass_pat]
    for b in range(nbars):
        d, sh = _chord_at(P, b)
        root = P.bass_root + P.iv[d]
        if root > 47:
            root -= 12
        for (sb, ln, tone) in pat:
            if tone == 0:
                m = root
            elif tone == 7:
                m = root + 12
            else:
                m = root + (P.iv[(d + 4) % 7] + 12 * ((d + 4) // 7) - P.iv[d])
            f = _hz(m)
            t = b * P.bar + sb * P.beat + (P.swing * P.eighth if (sb * 2) % 2 == 1 else 0) + hum()
            gate = ln * P.beat * 0.86
            sig = _note(_tri_tab(f, P.bass_fc), f, gate, 0.08, 0.008, 0.35, 0.7)
            vel = 1.0 if sb == 0 else 0.85
            put_st(None, int(t * SR), sig, 0.0, 0.30 * vel, 0.12)

    # ---- lead
    prev_end, prev_f = -1.0, None
    for b in range(P.intro, nbars):
        j = (b - P.intro) % 8
        for (slot, ln, s) in P.melody[j]:
            m = _midi(P, P.lead_root, s)
            f = _hz(m)
            t = b * P.bar + swing_t(slot, P.eighth) + hum()
            gate = ln * P.eighth * P.legato
            glide = prev_f if (P.glide and prev_f and abs(t - prev_end) < 0.06 and prev_f != f) else None
            tab = _tri_tab(f, 2400, 7000) if P.lead_tri else _pulse_tab(f, P.lead_duty, P.lead_fc, order=3)
            vib = (P.vib[0], P.vib[1], P.vib[2], float(rng.uniform(0, 6.28)))
            sig = _note(tab, f, gate, 0.13, P.lead_att, 0.5, 0.72, vib=vib, glide_from=glide)
            vel = float(rng.uniform(0.86, 1.0)) * (1.0 if slot in (0, 4) else 0.9)
            _add(lead, int(t * SR), sig, 0.16 * P.lead_gain * vel)
            prev_end, prev_f = t + ln * P.eighth, f

    # ---- arpeggios
    if P.arp_on:
        unit = P.beat / 4 if P.arp16 else P.beat / 2
        steps_per_bar = 16 if P.arp16 else 8
        low = P.lead_root - 7 + P.arp_oct
        for b in range(P.arp_start, nbars):
            pcs = _chord_pcs(P, b)
            tones = sorted(low + (pc - low) % 12 for pc in pcs[:3])
            tones.append(tones[0] + 12)
            for k in range(steps_per_bar):
                idx = P.arp_pat[(b * steps_per_bar + k) % len(P.arp_pat)]
                m = tones[idx % len(tones)]
                f = _hz(m)
                t = b * P.bar + swing_t(k, unit) + hum()
                if P.arp_bell:
                    sig = _note(_bell_tab(f), f, unit * 0.9, 0.12, 0.003, 0.22, 0.0)
                else:
                    sig = _note(_pulse_tab(f, P.arp_duty, 2200), f, unit * 0.8, 0.06, 0.003, 0.11, 0.08)
                acc = 1.0 if k % (steps_per_bar // 4) == 0 else 0.72
                _add(arps, int(t * SR), sig, 0.07 * P.arp_gain * acc * float(rng.uniform(0.85, 1)))

    # ---- hats / shaker
    if P.hats_on:
        hrng = np.random.default_rng(int(rng.integers(1 << 30)))
        if P.hat_kind == "shaker":
            tt = np.arange(int(0.09 * SR)) / SR
            env = (1 - np.exp(-tt / 0.008)) * np.exp(-tt / 0.03)
            kit = [_noise(hrng, len(tt), 3200, 6500, env) * env.max() for _ in range(4)]
            vels = [0.55, 0.25, 0.8, 0.3] * 4
            slots = range(16)
            unit, gain = P.beat / 4, 0.022
        else:
            tt = np.arange(int(0.06 * SR)) / SR
            env = (1 - np.exp(-tt / 0.0025)) * np.exp(-tt / 0.018)
            kit = [_noise(hrng, len(tt), 4000, 7000, env) * env.max() for _ in range(4)]
            unit, gain = P.beat / 4, 0.03
            if P.hat_kind == "off8":
                slots, vels = [2, 6, 10, 14], {2: 1, 6: 1, 10: 1, 14: 1}
            elif P.hat_kind == "8ths":
                slots, vels = range(0, 16, 2), {s: (0.5 if s % 4 == 0 else 1.0) for s in range(16)}
            else:
                slots, vels = [6, 14], {6: 1, 14: 1}
        for b in range(P.hat_start, nbars):
            for s in slots:
                t = b * P.bar + s * unit + (P.swing * 2 * unit if (s // 2) % 2 == 1 else 0) + hum()
                sig = kit[int(hrng.integers(4))] * 0.35
                put_st(None, int(t * SR), sig, 0.3, gain * vels[s] * float(hrng.uniform(0.8, 1)), 0.15)

    # ---- cue chimes: a quick rising arpeggio from the chord under the cue
    chime = np.zeros(L)
    chime_st = np.zeros((L, 2))
    crng = np.random.default_rng(zlib.crc32(f"cue|{sign}|{int(seed)}".encode()))
    for ci, tc in enumerate(cues):
        if not (0 <= tc < seconds):
            continue
        b = int(tc // P.bar)
        pcs = _chord_pcs(P, b)
        base = 79
        tones = sorted(base + (pc - base) % 12 for pc in pcs[:3])
        seq = tones + [tones[0] + 12, tones[1] + 12]
        if crng.random() < 0.4:
            seq = tones + [tones[0] + 12, tones[2], tones[0] + 12]
        n = int(crng.choice([4, 5, 5, 6]))
        seq = seq[:n] if n <= len(seq) else seq + [seq[-1] + 12]
        gap = float(crng.uniform(0.05, 0.07))
        for k, m in enumerate(seq):
            f = _hz(m) * 2 ** (float(crng.uniform(-4, 4)) / 1200)
            last = k == len(seq) - 1
            sig = _note(_bell_tab(f), f, 0.02, 0.9 if last else 0.5, 0.002, 0.5 if last else 0.25, 0.0)
            vel = (0.55 + 0.45 * k / max(1, len(seq) - 1)) * 0.8
            pan = -0.45 + 0.9 * k / max(1, len(seq) - 1)
            i0 = int((tc + 0.01 + k * gap) * SR)
            _add(chime, i0, sig, 0.11 * vel)
            cl, cr = _pan(pan)
            _add(chime_st[:, 0], i0, sig, 0.11 * vel * cl)
            _add(chime_st[:, 1], i0, sig, 0.11 * vel * cr)
        # a hushed sparkle on top
        f = _hz(min(seq[-1] + 12, 98))
        sig = _note(_bell_tab(f), f, 0.02, 0.6, 0.004, 0.18, 0.0)
        i0 = int((tc + 0.01 + len(seq) * gap) * SR)
        _add(chime, i0, sig, 0.035)
        _add(chime_st[:, 0], i0, sig, 0.025)
        _add(chime_st[:, 1], i0, sig, 0.025)

    # ---- effects
    lead_st = np.array(_pan(P.lead_pan))[None, :] * lead[:, None]
    arp_st = np.array(_pan(-0.35 if P.lead_pan >= 0 else 0.35))[None, :] * arps[:, None]
    d = int(P.delay * SR)
    echo = _echo(lead * P.echo_wet + arps * 0.12 + chime * 0.35, d, P.fb)
    rev_send += lead * 0.5 + arps * 0.6 + chime * 1.0
    ir = _reverb_ir(np.random.default_rng(int(rng.integers(1 << 30))), P.t60,
                    0.018 + 0.01 * (P.el == "water"), 5200 if P.el != "water" else 4200)
    wet = _convolve(rev_send, ir) * P.rev * 1.6
    mix = dry + lead_st + arp_st + chime_st + echo + wet + _convolve(echo.mean(1) * 0.4, ir) * P.rev
    return mix, P


# ------------------------------------------------------------------ dream style

DREAM = {
    #        bpm        reverb T60   wet           bell octave up  FM index    pad cutoff     arps
    "fire":  dict(bpm=(66, 72), t60=(3.0, 3.8), rev=(0.30, 0.36), up=0.7, fm=(1.0, 1.5),
                  pad_fc=(1300, 1800), arp_rate=(0.5, 0.6), arp_bars=0.75, intro=0.6),
    "earth": dict(bpm=(62, 68), t60=(3.2, 4.0), rev=(0.30, 0.36), up=0.4, fm=(0.7, 1.1),
                  pad_fc=(900, 1300), arp_rate=(1.0, 0.5), arp_bars=0.5, intro=0.7),
    "air":   dict(bpm=(64, 70), t60=(3.6, 4.4), rev=(0.33, 0.38), up=0.6, fm=(0.9, 1.3),
                  pad_fc=(1100, 1500), arp_rate=(0.5, 0.9), arp_bars=1.0, intro=0.6),
    "water": dict(bpm=(60, 65), t60=(4.4, 5.4), rev=(0.38, 0.44), up=0.5, fm=(0.7, 1.1),
                  pad_fc=(800, 1200), arp_rate=(1.0, 0.6), arp_bars=0.5, intro=0.8),
}


def _saw_tab(f0, fc, cap=6000.0):
    key = ("s", round(f0, 1), int(fc))
    if key not in _TABLES:
        K = int(max(1, min(48, cap // f0)))
        k = np.arange(1, K + 1)
        _TABLES[key] = _table((1.0 / k) / np.sqrt(1 + (k * f0 / fc) ** 4))
    return _TABLES[key]


def _fm_bell(f, tau, index, ratio, att=0.003, length=None):
    """Sine with a little FM: bright strike that mellows into a pure ring (celesta/music box)."""
    n = int((length if length else min(6.0, 5.0 * tau)) * SR)
    t = np.arange(n) / SR
    idx = index * min(1.0, 650.0 / f)                     # high notes get less FM: never harsh
    I = idx * (0.15 + 0.85 * np.exp(-t / 0.18))
    y = np.sin(2 * np.pi * f * t + I * np.sin(2 * np.pi * f * ratio * t))
    y += 0.12 * np.sin(4 * np.pi * f * t) * np.exp(-t / (0.35 * tau))   # glassy 2nd partial
    env = np.sin(0.5 * np.pi * np.clip(t / att, 0, 1)) ** 2 * np.exp(-t / tau)
    fade = min(n, int(0.08 * SR))
    env[n - fade:] *= np.linspace(1, 0, fade)
    return y * env


def _dream(sign, seed, seconds, N, cues):
    rng = np.random.default_rng(zlib.crc32(f"dream|{sign}|{int(seed)}".encode()))
    el = ELEMENT[sign]
    D = DREAM[el]
    P = _plan(sign, rng, over=dict(bpm=D["bpm"], intro=D["intro"]))
    P.style = "dream"
    P.t60 = float(rng.uniform(*D["t60"]))
    P.rev = float(rng.uniform(*D["rev"]))
    P.up = 12 if rng.random() < D["up"] else 0
    P.fm = float(rng.uniform(*D["fm"]))
    P.ratio = float(rng.choice([2.0, 3.0, 4.0], p=[0.45, 0.3, 0.25]))
    P.tau = float(rng.uniform(0.9, 1.4)) * (1.2 if el == "water" else 1.0)
    P.pad_kind = str(rng.choice(["strings", "glass"], p=[0.65, 0.35]))
    P.pad_fc = float(rng.uniform(*D["pad_fc"]))
    P.arp_unit = float(rng.choice([0.5, 1.0], p=[D["arp_rate"][1], 1 - D["arp_rate"][1]]))
    P.arp_mask = [rng.random() < D["arp_bars"] for _ in range(4)]
    P.arp_mask[int(rng.integers(4))] = True
    P.twinkle = rng.random() < (0.75 if el in ("water", "air") else 0.45)
    P.delay = float(rng.choice([1.0, 0.75, 1.5], p=[0.5, 0.3, 0.2])) * P.beat
    P.fb = float(rng.uniform(0.3, 0.42))
    P.drift = float(rng.uniform(0.015, 0.035))           # rubato: the beat breathes a little
    P.lead_pan = float(rng.uniform(-0.12, 0.12))

    L = N + int(6.0 * SR)
    nbars = int(np.ceil(seconds / P.bar)) + 1
    dry = np.zeros((L, 2))
    rev_send = np.zeros(L)
    lead = np.zeros(L)
    arps = np.zeros(L)
    sparkle = np.zeros((L, 2))

    def warp(t):
        return t + P.drift * np.sin(2 * np.pi * t / (2 * P.bar)) + float(rng.uniform(-0.008, 0.008))

    def put(i0, sig, pan, gain, rsend):
        if i0 >= L:
            return
        l, r = _pan(pan)
        i1 = min(L, i0 + len(sig))
        s = sig[:i1 - i0] * gain
        dry[i0:i1, 0] += s * l
        dry[i0:i1, 1] += s * r
        rev_send[i0:i1] += s * rsend

    # ---- pad: slow string-like swells (detuned saws) or a glassy soft-square pad
    b = 0
    while b < nbars:
        pcs = _chord_pcs(P, b)
        span = 1
        while b + span < nbars and _chord_pcs(P, b + span) == pcs and span < 2:
            span += 1
        t0 = b * P.bar - 0.25                            # swell in just ahead of the bar
        for pc in pcs:
            m = 53 + (pc - 53) % 12
            for dt, pan in ((-9.0, -0.6), (0.0, 0.0), (9.0, 0.6)):
                f = _hz(m) * 2 ** (dt / 1200)
                tab = _saw_tab(f, P.pad_fc) if P.pad_kind == "strings" else _pulse_tab(f, 0.5, P.pad_fc * 0.8)
                sig = _note(tab, f, span * P.bar + 0.25, 1.8, 1.3, 2.5, 0.8,
                            vib=(5.0, float(rng.uniform(0.15, 0.35)), 0.0, float(rng.uniform(0, 6.3))),
                            phase0=float(rng.random()))
                put(int(max(0, t0) * SR), sig, pan, 0.034, 0.8)
        b += span

    # ---- soft sub: one long note per chord
    for b in range(nbars):
        d, _ = _chord_at(P, b)
        m = P.bass_root + P.iv[d]
        if m > 45:
            m -= 12
        f = _hz(m)
        sig = _note(_tri_tab(f, 180, 600), f, P.bar * 0.95, 0.9, 0.25, 2.0, 0.6)
        put(int(b * P.bar * SR), sig, 0.0, 0.26, 0.1)

    # ---- music-box / celesta lead
    for b in range(P.intro, nbars):
        j = (b - P.intro) % 8
        for (slot, ln, s) in P.melody[j]:
            m = _midi(P, P.lead_root + P.up, s)
            while m > 93:
                m -= 12
            f = _hz(m)
            t = warp(b * P.bar + slot * P.eighth)
            sig = _fm_bell(f, P.tau * (1.3 if ln >= 3 else 1.0), P.fm, P.ratio)
            vel = float(rng.uniform(0.8, 1.0)) * (1.0 if slot in (0, 4) else 0.85)
            _add(lead, int(t * SR), sig, 0.15 * vel)

    # ---- slow arpeggios that drift up and settle back
    pats = [[0, 1, 2, 3, 2, 1, 0, 1], [0, 2, 1, 3, 2, 1, 2, 0], [0, 1, 2, 3, 4, 3, 2, 1]]
    pat = pats[int(rng.integers(len(pats)))]
    low = P.lead_root - 5
    for b in range(nbars):
        if not P.arp_mask[b % 4]:
            continue
        pcs = _chord_pcs(P, b)
        tones = sorted(low + (pc - low) % 12 for pc in pcs[:3])
        tones += [tones[0] + 12, tones[1] + 12]
        steps = int(round(4 / P.arp_unit))
        for k in range(steps):
            m = tones[pat[k % len(pat)] % len(tones)]
            f = _hz(m)
            t = warp(b * P.bar + k * P.arp_unit * P.beat)
            sig = _fm_bell(f, 0.8, 0.35, 2.0, att=0.006)
            acc = 1.0 if k == 0 else 0.75
            _add(arps, int(t * SR), sig, 0.05 * acc * float(rng.uniform(0.8, 1.0)))

    # ---- faint shimmer: rare, very quiet high bell twinkles from the chord
    if P.twinkle:
        for b in range(nbars):
            pcs = _chord_pcs(P, b)
            for beat in range(4):
                if rng.random() < 0.22:
                    m = 86 + (pcs[int(rng.integers(len(pcs)))] - 86) % 12
                    f = _hz(m)
                    sig = _fm_bell(f, 0.7, 0.2, 2.0, att=0.004)
                    i0 = int(warp(b * P.bar + (beat + float(rng.uniform(0, 0.5))) * P.beat) * SR)
                    pan = float(rng.uniform(-0.7, 0.7))
                    l, r = _pan(pan)
                    _add(sparkle[:, 0], i0, sig, 0.018 * l)
                    _add(sparkle[:, 1], i0, sig, 0.018 * r)

    # ---- cue: a gentle glissando of high bells over the current chord
    chime = np.zeros(L)
    chime_st = np.zeros((L, 2))
    crng = np.random.default_rng(zlib.crc32(f"dcue|{sign}|{int(seed)}".encode()))
    for tc in cues:
        if not (0 <= tc < seconds):
            continue
        pcs = _chord_pcs(P, int(tc // P.bar))
        base = 79
        tones = sorted(base + (pc - base) % 12 for pc in pcs[:3])
        seq = tones + [x + 12 for x in tones]
        seq = [m for m in seq if m <= 98][:int(crng.choice([5, 6, 7]))]
        gap = float(crng.uniform(0.055, 0.08))
        for k, m in enumerate(seq):
            f = _hz(m) * 2 ** (float(crng.uniform(-3, 3)) / 1200)
            last = k == len(seq) - 1
            sig = _fm_bell(f, 1.2 if last else 0.6, 0.3, 2.0, att=0.003)
            vel = (0.5 + 0.5 * k / max(1, len(seq) - 1)) * 0.75
            pan = -0.5 + 1.0 * k / max(1, len(seq) - 1)
            i0 = int((tc + 0.02 + k * gap) * SR)
            l, r = _pan(pan)
            _add(chime, i0, sig, 0.1 * vel)
            _add(chime_st[:, 0], i0, sig, 0.1 * vel * l)
            _add(chime_st[:, 1], i0, sig, 0.1 * vel * r)

    # ---- effects: echo on the bells, a long soft hall
    lead_st = np.array(_pan(P.lead_pan))[None, :] * lead[:, None]
    arp_st = np.array(_pan(-0.3 if P.lead_pan >= 0 else 0.3))[None, :] * arps[:, None]
    echo = _echo(lead * 0.28 + arps * 0.15 + chime * 0.35, int(P.delay * SR), P.fb, taps=6)
    rev_send += lead * 0.7 + arps * 0.8 + chime * 1.1 + sparkle.mean(1) * 1.5
    ir = _reverb_ir(np.random.default_rng(int(rng.integers(1 << 30))), P.t60, 0.03, 4200)
    wet = _convolve(rev_send + echo.mean(1) * 0.5, ir) * P.rev * 1.8
    mix = dry + lead_st + arp_st + chime_st + sparkle + echo + wet
    return mix, P


def _master(mix, N, P, sign, seed, ticks):
    """Clean lows, soft top, loudness, ticks, limiter, fades."""
    mix = _spectral(mix, lambda f: _hp(f, 32, 2) * _lp(f, 8000, 4))[:N]
    target = 10 ** (-16.0 / 10)
    ms = _kweight_ms(mix)
    mix *= np.sqrt(target / ms)

    if len(ticks):
        tk = _ticks(P, sign, seed, ticks, N)
        tms = _kweight_ms_raw(tk, ticks)
        if tms > 0:
            mix += tk * np.sqrt(target * 10 ** (-15 / 10) / tms)

    fin = min(N, int(0.3 * SR))
    fout = min(N, int(1.2 * SR))
    if fin:
        mix[:fin] *= (np.sin(0.5 * np.pi * np.arange(fin) / fin) ** 2)[:, None]
    if fout:
        mix[N - fout:] *= (np.cos(0.5 * np.pi * np.arange(fout) / fout) ** 2)[:, None]

    ceil = 10 ** (-1.0 / 20)
    mix = _limit(mix, ceil * 0.995)
    pk = np.abs(mix).max()
    if pk > 0:
        mix *= min(ceil / pk, 10 ** (2.0 / 20))       # raise at most 2 dB to reach -1 dBFS
    return np.nan_to_num(mix).astype(np.float32)


def _ticks(P, sign, seed, ticks, N):
    """RPG text blips: soft, 35 ms, pitch from the key's pentatonic with tiny wobble."""
    out = np.zeros((N, 2))
    trng = np.random.default_rng(zlib.crc32(f"tick|{sign}|{int(seed)}".encode()))
    penta = [0, 2, 4, 7, 9] if P.iv[2] == 4 else [0, 3, 5, 7, 10]
    base = 76 + (P.root_pc - 76) % 12
    choices = [base + penta[0], base + penta[1], base + penta[3], base + penta[2]]
    n = int(0.035 * SR)
    t = np.arange(n) / SR
    env = np.sin(0.5 * np.pi * np.clip(t / 0.002, 0, 1)) ** 2 * np.exp(-t / 0.011)
    env *= 0.5 * (1 + np.cos(np.pi * t / t[-1]))
    tab = _blip_tab()
    last = choices[0]
    for k, tt in enumerate(sorted(ticks)):
        i0 = int(round(tt * SR))
        if not (0 <= i0 < N):
            continue
        m = last if trng.random() < 0.45 else choices[int(trng.integers(len(choices)))]
        last = m
        f = _hz(m) * 2 ** (float(trng.uniform(-18, 18)) / 1200)
        fcurve = f * (1 + 0.03 * np.exp(-t / 0.006))          # tiny downward "bip"
        sig = _osc(tab, fcurve, n) * env * float(trng.uniform(0.75, 1.0))
        pan = float(trng.uniform(-0.12, 0.12))
        l, r = _pan(pan)
        i1 = min(N, i0 + n)
        out[i0:i1, 0] += sig[:i1 - i0] * l
        out[i0:i1, 1] += sig[:i1 - i0] * r
    return out


def _kweight_ms_raw(tk, ticks):
    """Mean square of the blip track while typing (each tick owns ~1/14 s)."""
    m = tk.mean(1)
    y = _spectral(m, lambda f: _hp(f, 38, 1) * 10 ** (4 / 20 * (f ** 2 / (f ** 2 + 1500 ** 2))))
    ts = np.sort(np.asarray(ticks, float))
    if len(ts) == 0:
        return 0.0
    gaps = np.diff(ts)
    slot = float(np.clip(np.median(gaps), 1 / 30, 0.25)) if len(gaps) else 1 / 14
    return float(np.sum(y * y) / (len(ts) * slot * SR))


def write_wav(path, audio):
    a = np.asarray(audio, np.float32)
    if a.ndim == 1:
        a = np.stack([a, a], 1)
    pcm = (np.clip(np.nan_to_num(a), -1, 1) * 32767).round().astype("<i2")
    d = os.path.dirname(os.path.abspath(path))
    os.makedirs(d, exist_ok=True)
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


def describe(sign, seed, style="dream"):
    """Human-readable summary of what a (sign, seed, style) picks."""
    sign = sign.lower()
    if style == "dream":
        rng = np.random.default_rng(zlib.crc32(f"dream|{sign}|{int(seed)}".encode()))
        D = DREAM[ELEMENT[sign]]
        P = _plan(sign, rng, over=dict(bpm=D["bpm"], intro=D["intro"]))
    else:
        P = _plan(sign, np.random.default_rng(zlib.crc32(f"chip|{sign}|{int(seed)}".encode())))
    names = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"]
    roman = ["I", "II", "III", "IV", "V", "VI", "VII"]
    prog = "-".join(roman[d] + ("" if s == (0, 2, 4) else {(0, 1, 4): "sus2", (0, 3, 4): "sus4",
                                (0, 2, 4, 8): "add9", (0, 2, 4, 6): "7"}[s])
                    for d, s in zip(P.prog, P.shapes))
    if style == "dream":
        # replay the dream-only choices in the same order _dream draws them
        t60 = float(rng.uniform(*D["t60"])); rng.uniform(*D["rev"])
        up = 12 if rng.random() < D["up"] else 0
        fm = float(rng.uniform(*D["fm"]))
        ratio = float(rng.choice([2.0, 3.0, 4.0], p=[0.45, 0.3, 0.25]))
        rng.uniform(0.9, 1.4)
        pad = str(rng.choice(["strings", "glass"], p=[0.65, 0.35]))
        rng.uniform(*D["pad_fc"])
        unit = float(rng.choice([0.5, 1.0], p=[D["arp_rate"][1], 1 - D["arp_rate"][1]]))
        return (f"{sign}/{seed} dream: {P.el} {names[P.root_pc]} {P.mode} {P.bpm:.0f}bpm {prog} "
                f"bell=FM{ratio:.0f}:1 idx{fm:.1f}{' +8va' if up else ''} pad={pad} "
                f"arps={'8ths' if unit == 0.5 else 'quarters'} intro={P.intro} t60={t60:.1f}")
    lead = "tri" if P.lead_tri else f"pulse{int(P.lead_duty * 100)}%"
    return (f"{sign}/{seed}: {P.el} {names[P.root_pc]} {P.mode} {P.bpm:.0f}bpm {prog} lead={lead} "
            f"bass={P.bass_pat} arp={'16th' if P.arp16 else '8th' if P.arp_on else 'off'}"
            f"{'(bell)' if P.arp_on and P.arp_bell else ''} hats={P.hat_kind if P.hats_on else 'off'}"
            f" swing={P.swing:.2f} t60={P.t60:.1f}")


def demo_events(seconds, cue_times=(0, 4, 8, 12), rate=14.0, seed=0):
    r = np.random.default_rng(seed)
    cues = [c for c in cue_times if c < seconds]
    ticks = []
    for c in cues:
        t = c + 0.15
        while t < c + 2.15 and t < seconds:
            ticks.append(round(t, 4))
            t += (1 / rate) * float(r.uniform(0.8, 1.25))
    return cues, ticks


def main(argv=None):
    ap = argparse.ArgumentParser(description="procedural lo-fi chiptune for pixel zodiac reels")
    ap.add_argument("sign", choices=SIGNS)
    ap.add_argument("--seed", type=int, default=0)
    ap.add_argument("--seconds", type=float, default=20.0)
    ap.add_argument("--style", choices=STYLES, default="dream")
    ap.add_argument("-o", "--out", default=None)
    a = ap.parse_args(argv)
    out = a.out or os.path.join(os.path.dirname(os.path.abspath(__file__)), "out",
                                f"{a.style}-{a.sign}-{a.seed}.wav")
    cues, ticks = demo_events(a.seconds)
    if a.style == "dream":
        ticks = []                       # the quote-card reels type nothing
    t0 = time.time()
    audio = render(a.sign, a.seed, a.seconds, cues, ticks, style=a.style)
    dt = time.time() - t0
    write_wav(out, audio)
    pk = 20 * np.log10(np.abs(audio).max() + 1e-12)
    rms = 20 * np.log10(np.sqrt(np.mean(audio.astype(np.float64) ** 2)) + 1e-12)
    print(describe(a.sign, a.seed, a.style))
    print(f"{out}  {len(audio) / SR:.2f}s  peak {pk:.2f} dBFS  rms {rms:.2f} dBFS  render {dt:.2f}s")


if __name__ == "__main__":
    main()
