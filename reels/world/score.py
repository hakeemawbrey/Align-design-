"""An original score and sound effects for one Align World reel, mixed under
the narration.

    python3 score.py <cues.json> <voice.wav> <out.wav>

The music follows the story's mood shot by shot: a bouncy marimba in the
bright parts, a slow music box when it goes quiet, a hush of bells at night,
and a warm lift with shimmer when the cards flip. Effects land on the cuts
and the moments (card pop, flips, brush strokes, scraping, the clock).
Everything is synthesised here; no samples.
"""
import json
import sys
import wave

import numpy as np

SR = 44100
rng = np.random.default_rng(7)

MOOD = {
    'intro': 'bright', 'cardBack': 'bright', 'demoFlip': 'bright', 'sister': 'bright', 'friend': 'bright',
    'alone': 'sad', 'paint': 'sneaky', 'crowd': 'bright', 'noFlip': 'sad', 'turnAway': 'sad',
    'clock': 'night', 'busStop': 'night', 'girlConfess': 'night',
    'scrape': 'warm', 'honest': 'warm', 'laugh': 'warm', 'bothFlip': 'lift',
}
BPM = 104
BEAT = 60 / BPM


def hz(semi):
    return 261.63 * 2 ** (semi / 12)


def read_wav(path):
    with wave.open(path) as w:
        n = w.getnframes()
        data = np.frombuffer(w.readframes(n), dtype=np.int16).astype(np.float32) / 32768
        if w.getnchannels() == 2:
            data = data.reshape(-1, 2).mean(1)
        sr = w.getframerate()
    if sr != SR:
        data = np.interp(np.arange(int(len(data) * SR / sr)) * sr / SR, np.arange(len(data)), data)
    return data


def env(n, a=0.004, d=0.5):
    t = np.arange(n) / SR
    return np.minimum(1, t / a) * np.exp(-t / d)


def marimba(f, dur=0.6, amp=0.3):
    n = int(dur * SR)
    t = np.arange(n) / SR
    s = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * f * 4 * t) * np.exp(-t / 0.05) + 0.12 * np.sin(2 * np.pi * f * 10 * t) * np.exp(-t / 0.015)
    return s * env(n, 0.002, dur / 4) * amp


def musicbox(f, dur=1.6, amp=0.22):
    n = int(dur * SR)
    t = np.arange(n) / SR
    s = np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * f * 2.01 * t) * np.exp(-t / 0.3) + 0.25 * np.sin(2 * np.pi * f * 5.4 * t) * np.exp(-t / 0.08)
    return s * env(n, 0.002, dur / 3.5) * amp


def bell(f, dur=2.5, amp=0.2):
    n = int(dur * SR)
    t = np.arange(n) / SR
    s = sum(a * np.sin(2 * np.pi * f * r * t) * np.exp(-t / (dur / k)) for r, a, k in [(1, 1, 2), (2.76, 0.5, 3), (5.4, 0.3, 5), (8.9, 0.15, 8)])
    return s * np.minimum(1, t / 0.003) * amp


def pad(freqs, dur, amp=0.06):
    n = int(dur * SR)
    t = np.arange(n) / SR
    s = np.zeros(n)
    for f in freqs:
        for det in (-0.15, 0.15):
            s += np.sin(2 * np.pi * f * 2 ** (det / 12) * t + rng.random() * 6)
    fade = np.minimum(1, np.minimum(t / 0.4, (dur - t) / 0.4))
    return s * np.clip(fade, 0, 1) * amp / len(freqs)


def noise(n):
    return rng.standard_normal(n)


def lowpass(x, k):
    # one-pole lowpass, k in (0,1): smaller is darker
    y = np.zeros_like(x)
    acc = 0.0
    for i in range(len(x)):
        acc += k * (x[i] - acc)
        y[i] = acc
    return y


def kick(amp=0.35):
    n = int(0.25 * SR)
    t = np.arange(n) / SR
    f = 50 + 90 * np.exp(-t / 0.03)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.09) * amp


def shaker(amp=0.05):
    n = int(0.07 * SR)
    x = noise(n) * env(n, 0.003, 0.02)
    return np.diff(x, prepend=0) * amp


def put(buf, x, t):
    i = int(t * SR)
    if i >= len(buf):
        return
    x = x[: len(buf) - i]
    buf[i: i + len(x)] += x


# Progressions (semitones from C4): bright I–V–vi–IV, sad vi–IV–I–V slow,
# night in A minor with suspended colour, lift goes up to the IV and home.
CHORDS = {
    'bright': [[0, 4, 7], [7, 11, 14], [9, 12, 16], [5, 9, 12]],
    'sneaky': [[2, 5, 9], [0, 3, 7], [2, 5, 9], [-1, 2, 7]],
    'sad': [[-3, 0, 4], [-7, -3, 0], [-12, -8, -5], [-5, -1, 2]],
    'night': [[-3, 2, 7], [-7, -2, 4], [-3, 0, 7], [-8, -1, 4]],
    'warm': [[-7, -3, 0], [-5, -1, 2], [-3, 0, 4], [-12, -5, 4]],
    'lift': [[-7, -3, 0, 4], [-5, -1, 2, 7], [-3, 0, 4, 7], [0, 4, 7, 12]],
    'chaos': [[-3, 0, 4], [-4, -1, 3], [-3, 0, 4], [-1, 2, 6]],
    'hit': [[-3, 0, 4]],
}


def main():
    cues = json.load(open(sys.argv[1]))
    voice = read_wav(sys.argv[2])
    dur = cues['duration']
    n = int(dur * SR) + SR
    music = np.zeros(n)
    fx = np.zeros(n)
    scenes = cues['scenes']

    # ---- music, bar by bar, the mood taken from whichever shot is playing
    def mood_at(t):
        for s in scenes:
            if s['start'] <= t < s['end']:
                return s.get('mood') or MOOD.get(s['shot'], 'bright')
        return 'lift'

    step = BEAT / 2
    t = 0.0
    i = 0
    bar_chord = None
    while t < dur:
        m = mood_at(t)
        prog = CHORDS[m]
        bar = int(t / (BEAT * 4))
        chord = prog[bar % len(prog)]
        if i % 8 == 0 and (bar_chord != (m, bar)):
            bar_chord = (m, bar)
            put(music, pad([hz(c - 12) for c in chord], BEAT * 4 + 0.4, 0.05 if m in ('bright', 'sneaky') else 0.075), t)
            if m in ('bright', 'lift', 'warm'):
                put(music, marimba(hz(chord[0] - 24), 0.9, 0.22), t)
        if m == 'bright':
            pat = [0, 2, 1, 2, 0, 2, 1, 3]
            f = hz(chord[pat[i % 8] % len(chord)] + (12 if i % 8 in (3, 7) else 0))
            put(music, marimba(f, 0.45, 0.13 if i % 2 else 0.17), t)
            if i % 4 == 0:
                put(music, kick(0.22), t)
            put(music, shaker(0.035 if i % 2 else 0.02), t)
        elif m == 'sneaky':
            if i % 2 == 0:
                f = hz(chord[(i // 2) % len(chord)] - 12 + (12 if i % 8 == 6 else 0))
                put(music, marimba(f, 0.3, 0.16), t)
            if i % 4 == 2:
                put(music, shaker(0.05), t)
        elif m == 'sad':
            if i % 2 == 0:
                f = hz(chord[(i // 2) % len(chord)] + 12)
                put(music, musicbox(f, 1.8, 0.11), t)
        elif m == 'night':
            if i % 4 == 0:
                f = hz(chord[(i // 4) % len(chord)] + 12)
                put(music, bell(f, 3.0, 0.07), t)
        elif m == 'warm':
            if i % 2 == 0:
                f = hz(chord[(i // 2) % len(chord)] + 12)
                put(music, musicbox(f, 1.6, 0.1), t)
            if i % 8 == 0:
                put(music, kick(0.12), t)
        elif m == 'chaos':
            f = hz(chord[i % len(chord)] + (12 if i % 2 else 0))
            put(music, marimba(f, 0.25, 0.16), t)
            put(music, marimba(f * 2, 0.2, 0.06), t + step / 2)
            if i % 2 == 0:
                put(music, kick(0.26), t)
            put(music, shaker(0.05), t)
            put(music, shaker(0.03), t + step / 2)
        elif m == 'hit':
            pass
        elif m == 'lift':
            pat = [0, 1, 2, 3, 2, 1, 2, 3]
            f = hz(chord[pat[i % 8] % len(chord)] + 12)
            put(music, musicbox(f, 1.4, 0.12), t)
            put(music, marimba(f / 2, 0.5, 0.08), t)
            if i % 4 == 0:
                put(music, kick(0.2), t)
            put(music, shaker(0.03), t)
        t += step
        i += 1

    # ---- effects
    def whoosh(t, amp=0.06, d=0.28):
        k = int(d * SR)
        x = noise(k)
        e = np.sin(np.linspace(0, np.pi, k)) ** 2
        x = lowpass(x, 0.08) * e * amp * 6
        put(fx, x, max(0, t - d * 0.6))

    def pop(t, amp=0.25):
        k = int(0.12 * SR)
        tt = np.arange(k) / SR
        f = 500 + 900 * np.exp(-tt / 0.02)
        put(fx, np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt / 0.04) * amp, t)

    def sparkle(t, amp=0.07, up=True, n=14):
        notes = [0, 4, 7, 11, 12, 16, 19, 23, 24, 28, 31, 35, 36, 40]
        for j in range(n):
            f = hz(notes[j if up else n - 1 - j] + 12)
            put(fx, bell(f, 1.2, amp), t + j * 0.035)

    def brush(t, d, amp=0.05):
        k = int(d * SR)
        x = lowpass(noise(k), 0.25)
        tt = np.arange(k) / SR
        put(fx, x * (0.5 + 0.5 * np.abs(np.sin(tt * 9 * np.pi / 2))) * amp * np.minimum(1, np.minimum(tt / 0.1, (d - tt) / 0.1)), t)

    def scrape(t, d, amp=0.05):
        k = int(d * SR)
        tt = np.arange(k) / SR
        x = noise(k)
        x = x - lowpass(x, 0.3)
        put(fx, x * (0.4 + 0.6 * np.abs(np.sin(tt * 14 * np.pi / 2))) * amp * np.minimum(1, np.minimum(tt / 0.1, (d - tt) / 0.2)), t)

    def alarm(t, amp=0.12):
        k = int(0.5 * SR)
        tt = np.arange(k) / SR
        x = np.sign(np.sin(2 * np.pi * 220 * tt)) * 0.5 + np.sin(2 * np.pi * 440 * tt)
        put(fx, lowpass(x, 0.3) * np.exp(-tt / 0.25) * amp, t)
        put(fx, kick(0.35), t)

    def crash(t, amp=0.1):
        for q in range(5):
            k = int(0.3 * SR)
            tt = np.arange(k) / SR
            x = noise(k) - lowpass(noise(k), 0.2)
            put(fx, x * np.exp(-tt / (0.05 + 0.03 * q)) * amp, t + q * 0.09 + rng.random() * 0.05)
            put(fx, bell(hz(24 + rng.integers(0, 12)), 0.4, 0.03), t + q * 0.09)

    def siren(t, d=1.6, amp=0.05):
        k = int(d * SR)
        tt = np.arange(k) / SR
        f = 700 + 250 * np.sin(2 * np.pi * 1.4 * tt)
        x = np.sin(2 * np.pi * np.cumsum(f) / SR)
        put(fx, x * np.minimum(1, np.minimum(tt / 0.2, (d - tt) / 0.4)) * amp, t)

    def water(t, d=1.8, amp=0.07):
        k = int(d * SR)
        tt = np.arange(k) / SR
        put(fx, lowpass(noise(k), 0.5) * np.minimum(1, np.minimum(tt / 0.1, (d - tt) / 0.3)) * amp, t)

    def buzz(t, d=0.9, amp=0.06):
        k = int(d * SR)
        tt = np.arange(k) / SR
        x = np.sin(2 * np.pi * 150 * tt) * (np.sin(2 * np.pi * 6 * tt) > 0)
        put(fx, x * amp, t)

    def dun(t, amp=0.3):
        for q, f in enumerate([55, 52]):
            k = int(1.2 * SR)
            tt = np.arange(k) / SR
            put(fx, (np.sin(2 * np.pi * f * tt) + 0.4 * np.sin(2 * np.pi * f * 2 * tt)) * np.exp(-tt / 0.5) * amp, t + q * 0.42)

    SFX = {'alarm': alarm, 'crash': crash, 'siren': siren, 'water': water, 'buzz': buzz, 'dun': dun, 'pop': pop,
           'sparkle': lambda t: sparkle(t, 0.06), 'chime': lambda t: put(fx, bell(hz(12), 2.5, 0.12), t), 'whoosh': lambda t: whoosh(t, 0.06, 0.4)}

    for j, s in enumerate(scenes):
        a, b = s['start'], s['end']
        d = b - a
        if j > 0:
            whoosh(a, 0.035)
        for cue in s.get('sfx') or []:
            name, _, at = cue.partition('@')
            # '@w3' = on the scene's 4th word, '@0.5' = halfway through, none = at the cut
            if at.startswith('w'):
                when = a + s['wt'][min(int(at[1:]), len(s['wt']) - 1)]
            elif at:
                when = a + d * float(at)
            else:
                when = a
            SFX[name](when)
        shot = s['shot']
        if shot == 'intro':
            pop(a + d * 0.62, 0.3)
            sparkle(a + d * 0.62, 0.035, n=8)
        if shot == 'demoFlip':
            sparkle(a + d * 0.74, 0.06)
        if shot == 'sister':
            pop(a + 0.05, 0.25)
            sparkle(a + 0.1, 0.04, n=8)
        if shot == 'crowd':
            for q in range(6):
                pop(a + 0.15 + q * 0.16, 0.12)
        if shot == 'noFlip':
            for q in range(2):
                k = int(0.18 * SR)
                tt = np.arange(k) / SR
                put(fx, np.sin(2 * np.pi * (300 - 200 * tt / 0.18) * tt) * np.exp(-tt / 0.08) * 0.12, a + 0.25 + q * 0.9)
        if shot == 'paint':
            brush(a + 0.2, d * 0.8)
        if shot == 'clock':
            for q in range(2):
                put(fx, bell(hz(-12 - q * 5), 3.5, 0.16), a + 0.15 + q * 0.9)
        if shot == 'scrape':
            scrape(a + 0.2, d * 0.75)
        if shot == 'honest':
            sparkle(a + d * 0.55, 0.03, n=10)
        if shot == 'bothFlip':
            fT = a + d * 0.4
            whoosh(fT + 0.15, 0.06, 0.5)
            sparkle(fT + 0.2, 0.09)
            sparkle(fT + 0.55, 0.05, up=False)
            put(fx, kick(0.3), fT + 0.2)
            put(fx, bell(hz(0), 4, 0.12) + 0, fT + 0.2)

    # ---- mix: duck the music under the voice
    voice = np.pad(voice, (0, max(0, n - len(voice))))[:n]
    win = int(0.05 * SR)
    lvl = np.sqrt(np.convolve(voice ** 2, np.ones(win) / win, mode='same'))
    duck = np.clip(lvl / 0.04, 0, 1)
    duck = np.convolve(duck, np.ones(int(0.25 * SR)) / int(0.25 * SR), mode='same')
    gain = 1 - 0.45 * np.clip(duck, 0, 1)
    tt = np.arange(n) / SR
    fade = np.clip((dur - tt) / 1.2, 0, 1)
    mix = voice * 1.0 + music * gain * 0.85 * fade + fx * 0.9
    mix = mix[: int(dur * SR)]
    peak = np.abs(mix).max()
    if peak > 0.95:
        mix *= 0.95 / peak
    # soft stereo: music a touch wide via a tiny delay, voice centred
    L = mix
    R = mix.copy()
    with wave.open(sys.argv[3], 'w') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((np.stack([L, R], 1) * 32767).astype(np.int16).tobytes())


if __name__ == '__main__':
    main()
