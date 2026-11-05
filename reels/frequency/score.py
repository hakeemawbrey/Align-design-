"""Original audio for an Align frequency reel, from the engine's cue list.

    python3 -I score.py cues.json out.wav

cues.json is {"duration": seconds, "cues": [...]}, written by render.mjs from
engine.js, so the sound shares the picture's clock. Cue kinds:

    tone    a held tone: hz, t0, t1, gain, attack, release, pan (-1 left ear
            only, 1 right ear only), harm [[multiple, amp]...], lfo [rate, depth]
    chime   a soft bell at t: hz, gain, decay, pan
    click   the little lock-in tick at t
    whoosh  air rushing past at t: dur, gain, sweep (-1 or 1, the pan direction)
    swell   rising air from t0 into a moment at t1
    bed     a quiet air bed from t0 to t1

Rendered in blocks with a carried reverb tail, so a ten-minute version
needs no more memory than a reel. Reverb is per ear with no cross-feed, so a
tone panned hard left stays in the left ear (that's what makes the
binaural reel work on headphones).
"""
import json
import sys
import wave

import numpy as np

SR = 44100
BLOCK = 1 << 20  # about 24 s


def pan_gains(p):
    a = (p + 1) * np.pi / 4
    return np.cos(a), np.sin(a)


def adsr(tt, t0, t1, attack, release):
    """Envelope at absolute times tt for a note from t0 to t1."""
    up = np.clip((tt - t0) / max(attack, 1e-3), 0, 1)
    down = np.clip((t1 + release - tt) / max(release, 1e-3), 0, 1)
    return (up * up * (3 - 2 * up)) * (down * down * (3 - 2 * down))


def shaped_noise(n, lo, hi, seed, tilt=0.0):
    """Band-limited noise of length n (circular, so it tiles cleanly)."""
    r = np.random.default_rng(seed)
    spec = np.fft.rfft(r.standard_normal(n))
    f = np.fft.rfftfreq(n, 1 / SR)
    band = np.clip((f - lo * 0.5) / (lo * 0.5 + 1e-9), 0, 1) * np.clip((hi * 1.5 - f) / (hi * 0.5), 0, 1)
    band *= (np.maximum(f, 20) / 1000.0) ** tilt
    x = np.fft.irfft(spec * band, n)
    return x / (np.std(x) + 1e-12)


def impulse(seconds, seed):
    n = int(seconds * SR)
    t = np.arange(n) / SR
    r = np.random.default_rng(seed)
    ir = r.standard_normal(n) * np.exp(-t / 0.75)
    # darker as it decays
    spec = np.fft.rfft(ir)
    f = np.fft.rfftfreq(n, 1 / SR)
    spec *= 1 / (1 + (f / 3500) ** 2)
    ir = np.fft.irfft(spec, n)
    ir[: int(0.012 * SR)] = 0  # a short pre-delay
    return ir / np.sqrt(np.sum(ir ** 2))


def render(cues, duration, out_path):
    total = int(duration * SR)
    bed_loop = {}
    irs = [impulse(2.8, 1), impulse(2.8, 2)]
    tail = [np.zeros(0), np.zeros(0)]
    wet = 0.22
    peak_guess = None
    blocks = []

    with wave.open(out_path, 'wb') as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(SR)
        for b0 in range(0, total, BLOCK):
            n = min(BLOCK, total - b0)
            tt = (b0 + np.arange(n)) / SR
            ta, tb = tt[0], tt[-1]
            L = np.zeros(n)
            R = np.zeros(n)
            for ci, c in enumerate(cues):
                k = c['kind']
                if k == 'tone':
                    t0, t1 = c['t0'], c['t1']
                    rel = c.get('release', 1.0)
                    if tb < t0 or ta > t1 + rel:
                        continue
                    i0 = max(0, int((t0 - ta) * SR))
                    i1 = min(n, int((t1 + rel - ta) * SR) + 1)
                    x = tt[i0:i1]
                    env = adsr(x, t0, t1, c.get('attack', 0.5), rel)
                    if 'lfo' in c:
                        rate, depth = c['lfo']
                        env = env * (1 - depth * (0.5 + 0.5 * np.sin(2 * np.pi * rate * x + ci)))
                    sig = np.zeros_like(x)
                    for mult, amp in c.get('harm', [[1, 1]]):
                        sig += amp * np.sin(2 * np.pi * c['hz'] * mult * (x - t0) + ci * 0.7 * mult)
                    sig *= env * c['gain']
                    gl, gr = pan_gains(c.get('pan', 0.0))
                    L[i0:i1] += sig * gl
                    R[i0:i1] += sig * gr
                elif k == 'chime':
                    t0, dec = c['t'], c.get('decay', 2.0)
                    if tb < t0 or ta > t0 + dec * 3:
                        continue
                    i0 = max(0, int((t0 - ta) * SR))
                    i1 = min(n, int((t0 + dec * 3 - ta) * SR) + 1)
                    x = tt[i0:i1] - t0
                    att = np.clip(x / 0.004, 0, 1)
                    sig = np.zeros_like(x)
                    for mult, amp, dk in ((1, 1.0, 1.0), (2.0, 0.32, 0.55), (3.0, 0.12, 0.35), (4.16, 0.06, 0.22)):
                        sig += amp * np.sin(2 * np.pi * c['hz'] * mult * x) * np.exp(-x / (dec * dk))
                    sig *= att * c['gain']
                    gl, gr = pan_gains(c.get('pan', 0.0))
                    L[i0:i1] += sig * gl
                    R[i0:i1] += sig * gr
                elif k == 'click':
                    t0 = c['t']
                    if tb < t0 or ta > t0 + 0.3:
                        continue
                    i0 = max(0, int((t0 - ta) * SR))
                    i1 = min(n, int((t0 + 0.3 - ta) * SR) + 1)
                    x = tt[i0:i1] - t0
                    r = np.random.default_rng(ci)
                    tick = r.standard_normal(len(x)) * np.exp(-x / 0.004)
                    tick = np.diff(tick, prepend=0) * 0.5
                    thump = np.sin(2 * np.pi * 70 * x) * np.exp(-x / 0.05)
                    sig = (tick * 0.35 + thump * 0.8) * c['gain']
                    L[i0:i1] += sig * 0.7
                    R[i0:i1] += sig * 0.7
                elif k == 'whoosh':
                    t0, d = c['t'], c.get('dur', 1.2)
                    a, z = t0 - d * 0.7, t0 + d * 0.5
                    if tb < a or ta > z:
                        continue
                    i0 = max(0, int((a - ta) * SR))
                    i1 = min(n, int((z - ta) * SR) + 1)
                    x = tt[i0:i1]
                    m = len(x)
                    if m < 8:
                        continue
                    nz = shaped_noise(m, 250, 4000, ci, tilt=-0.4)
                    u = (x - a) / (z - a)
                    env = np.where(x < t0, np.clip((x - a) / (t0 - a), 0, 1) ** 2.2, np.exp(-np.maximum(x - t0, 0) / (d * 0.14)))
                    sweep = c.get('sweep', 1)
                    p = np.clip(sweep * (u * 2 - 1) * 0.85, -1, 1)
                    gl, gr = pan_gains(p)
                    sig = nz * env * c['gain'] * 0.5
                    L[i0:i1] += sig * gl
                    R[i0:i1] += sig * gr
                elif k == 'swell':
                    t0, t1 = c['t0'], c['t1']
                    if tb < t0 or ta > t1 + 0.4:
                        continue
                    i0 = max(0, int((t0 - ta) * SR))
                    i1 = min(n, int((t1 + 0.4 - ta) * SR) + 1)
                    x = tt[i0:i1]
                    m = len(x)
                    if m < 8:
                        continue
                    env = np.where(x < t1, np.clip((x - t0) / (t1 - t0), 0, 1) ** 3, np.exp(-np.maximum(x - t1, 0) / 0.06))
                    for side, arr in ((0, L), (1, R)):
                        nz = shaped_noise(m, 600, 9000, ci * 2 + side, tilt=0.2)
                        arr[i0:i1] += nz * env * c['gain'] * 0.35
                elif k == 'bed':
                    t0, t1 = c['t0'], c['t1']
                    if tb < t0 or ta > t1:
                        continue
                    if ci not in bed_loop:
                        bed_loop[ci] = [shaped_noise(BLOCK, 60, 1400, 900 + ci * 2 + s, tilt=-0.9) for s in (0, 1)]
                    i0 = max(0, int((t0 - ta) * SR))
                    i1 = min(n, int((t1 - ta) * SR) + 1)
                    x = tt[i0:i1]
                    env = adsr(x, t0, t1 - 1.5, 1.5, 1.5) * (0.8 + 0.2 * np.sin(2 * np.pi * x / 9.0))
                    idx = (b0 + np.arange(i0, i1)) % BLOCK
                    L[i0:i1] += bed_loop[ci][0][idx] * env * c['gain'] * 0.3
                    R[i0:i1] += bed_loop[ci][1][idx] * env * c['gain'] * 0.3

            L = np.nan_to_num(L)
            R = np.nan_to_num(R)
            # reverb per ear, overlap-add with the tail carried into the next block
            mixed = []
            for side, (dry, ir) in enumerate(((L, irs[0]), (R, irs[1]))):
                m = n + len(ir) - 1
                size = 1 << int(np.ceil(np.log2(m)))
                w = np.fft.irfft(np.fft.rfft(dry, size) * np.fft.rfft(ir, size), size)[:m]
                prev = tail[side]
                w[: len(prev)] += prev
                tail[side] = w[n:]
                mixed.append(dry * (1 - wet) + w[:n] * wet * 1.6)
            y = np.stack(mixed, axis=1)
            if peak_guess is None:
                # set the level from the first block and keep it, so long
                # versions don't drift in loudness
                p = np.percentile(np.abs(y), 99.95) + 1e-9
                peak_guess = 0.6 / p
            y = np.tanh(y * peak_guess * 1.15) / np.tanh(1.15)
            # fade the very start and end
            fi = np.clip((b0 + np.arange(n)) / (0.02 * SR), 0, 1)
            fo = np.clip((total - (b0 + np.arange(n))) / (0.6 * SR), 0, 1)
            y *= (fi * fo)[:, None]
            wf.writeframes((np.clip(y, -1, 1) * 32000).astype('<i2').tobytes())


def main():
    spec = json.load(open(sys.argv[1]))
    render(spec['cues'], float(spec['duration']), sys.argv[2])


if __name__ == '__main__':
    main()
