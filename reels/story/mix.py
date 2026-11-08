"""Mix a story reel's soundtrack: the narrator's lines placed at each shot's
start, over an original light music bed (a soft plucked arpeggio and pad)
that ducks under the voice, plus a small pop on every cut.

    python mix.py <voice dir> <timeline.json> <out.wav>

timeline.json: {"duration": 58.2, "shots": [{"start": 0, "dur": 3.4}, ...], "seed": 3}
"""
import json
import os
import sys

import numpy as np
import soundfile as sf

SR = 44100


def hz(semi):
    return 220.0 * 2 ** (semi / 12)


def pluck(f, dur, amp):
    t = np.arange(int(dur * SR)) / SR
    env = np.exp(-t * 6.5) * (1 - np.exp(-t * 400))
    s = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t * 9) + 0.12 * np.sin(2 * np.pi * 3 * f * t) * np.exp(-t * 14)
    return s * env * amp


def main():
    vdir, tl_path, out = sys.argv[1], sys.argv[2], sys.argv[3]
    tl = json.load(open(tl_path))
    dur = tl['duration']
    n = int(dur * SR) + SR
    rng = np.random.default_rng(tl.get('seed', 1))
    music = np.zeros(n)
    # I – vi – IV – V in a bright key, two bars each, 104 bpm eighths
    key = int(rng.integers(-3, 3))
    prog = [[0, 4, 7, 12], [-3, 0, 4, 9], [-7, -3, 0, 5], [-5, -1, 2, 7]]
    step = 60 / 104 / 2
    pattern = [0, 2, 1, 3, 2, 1, 3, 2]
    i = 0
    t = 0.0
    while t < dur:
        chord = prog[(i // 16) % 4]
        note = chord[pattern[i % 8]] + key + (12 if (i % 16) >= 8 and pattern[i % 8] == 3 else 0)
        p = pluck(hz(note), 0.9, 0.16 if i % 2 == 0 else 0.11)
        a = int(t * SR)
        music[a:a + len(p)] += p[:max(0, n - a)]
        if i % 16 == 0:
            # soft pad under each chord
            tt = np.arange(int(step * 16 * SR)) / SR
            pad = sum(np.sin(2 * np.pi * hz(c + key - 12) * tt * (1 + d)) for c in chord[:3] for d in (-0.002, 0.002))
            env = np.minimum(1, tt / 0.4) * np.minimum(1, (tt[-1] - tt) / 0.4)
            pad = pad * env * 0.03
            music[a:a + len(pad)] += pad[:max(0, n - a)]
        # light shaker on the off-beats
        if i % 2 == 1:
            nz = rng.standard_normal(int(0.04 * SR)) * np.exp(-np.arange(int(0.04 * SR)) / SR * 90) * 0.035
            music[a:a + len(nz)] += nz[:max(0, n - a)]
        i += 1
        t += step

    voice = np.zeros(n)
    vj = json.load(open(os.path.join(vdir, 'voice.json')))
    for sc, sh in zip(vj['scenes'], tl['shots']):
        v, sr = sf.read(os.path.join(vdir, sc['wav']))
        if v.ndim > 1:
            v = v.mean(axis=1)
        if sr != SR:
            idx = np.arange(0, len(v), sr / SR)
            v = np.interp(idx, np.arange(len(v)), v)
        a = int(sh['start'] * SR)
        voice[a:a + len(v)] += v[:max(0, n - a)]
    # cut pops
    for sh in tl['shots'][1:]:
        a = int(sh['start'] * SR)
        tt = np.arange(int(0.08 * SR)) / SR
        pop = np.sin(2 * np.pi * (900 - 5000 * tt) * tt) * np.exp(-tt * 60) * 0.05
        music[a:a + len(pop)] += pop[:max(0, n - a)]
    # duck the music under the voice
    envv = np.convolve(np.abs(voice), np.ones(4410) / 4410, mode='same')
    duck = 1 - 0.55 * np.clip(envv / 0.04, 0, 1)
    mix = voice * 1.0 + music * duck * 0.9
    fade = int(1.2 * SR)
    end = int(dur * SR)
    mix = mix[:end]
    mix[-fade:] *= np.linspace(1, 0, fade)
    peak = np.abs(mix).max()
    if peak > 0.98:
        mix *= 0.98 / peak
    sf.write(out, np.stack([mix, mix], axis=1), SR)


if __name__ == '__main__':
    main()
