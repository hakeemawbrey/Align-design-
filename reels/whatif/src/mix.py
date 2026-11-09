"""Mix the soundtrack: voice, a CC0 music bed whose natural ending lands on
the title, and one CC0 sound effect per event kind, each peak-aligned to its
frame. Mastering (gain + limiter to -14 LUFS, -2.2 dBTP) is done in encode.sh.

    .voice/venv/bin/python src/mix.py      → build/mix.wav (48 kHz stereo float)
"""
import json, os, subprocess
import numpy as np
import soundfile as sf

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
B = os.path.join(ROOT, 'build')
A = os.path.join(ROOT, 'assets', 'audio')
SR = 48000
tl = json.load(open(os.path.join(B, 'timeline.json')))
E = tl['events']
L = [l['t0'] for l in tl['lines']]

# the page's own timing constants (index.html)
FLASH_AFTER, RWD = .55, .8
TITLE, RW = E['title'], E['rewind']
A0 = min(E['align'] - .6, E['align'] + FLASH_AFTER - (TITLE - .12 - RW - RWD))
FLASH2 = RW + RWD + (E['align'] + FLASH_AFTER - A0)
TOTAL = TITLE + 3.2
N = int(TOTAL * SR)

def load(path):
    a, sr = sf.read(path, dtype='float32', always_2d=True)
    if sr != SR:
        tmp = os.path.join(B, '_rs.wav')
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', path, '-ar', str(SR), tmp], check=True)
        a, _ = sf.read(tmp, dtype='float32', always_2d=True)
    if a.shape[1] == 1: a = np.repeat(a, 2, 1)
    return a

def db(x): return 10 ** (x / 20)
def rms(a):
    v = a[np.abs(a).max(1) > 1e-3]
    return float(np.sqrt(np.mean(v ** 2))) if len(v) else 1e-9

out = np.zeros((N, 2), np.float32)

# voice
voice = load(os.path.join(B, 'voice.wav'))
vr = rms(voice[np.abs(voice).max(1) > .02])
out[:min(N, len(voice))] += voice[:N]

# music: the final chord (≈68.0 s into the track) lands on the title
music = load(os.path.join(A, 'music.wav'))
CHORD = 68.0
off = int((CHORD - TITLE) * SR)
seg = music[off:off + N]
seg = np.pad(seg, ((0, N - len(seg)), (0, 0)))
t = np.arange(N) / SR
env = np.clip(t / 1.6, 0, 1)                                  # fade in from mid-track
env *= db(-7) * vr / rms(music[off:off + int(TITLE * SR)])   # 7 dB under the voice
swell = np.clip((t - (TITLE - .4)) / .9, 0, 1)
env *= db(5 * swell)                                          # +5 dB under the title
env *= np.clip((TOTAL - t) / .6, 0, 1)
out += seg * env[:, None]

# effects: (file, event time, dB under the voice); placed so the file's peak hits the time
def ticks(t0, n, span):
    return [('tick', t0 + span * (1 - (1 - i / n) ** 2), -10) for i in range(n)]
FX = [
    ('collapse', E['align'] + .5, -5), ('impact', E['align'] + FLASH_AFTER, -4),
    ('whoosh', E['pullback'] + .35, -7),
    ('tick', E['ruler'], -5), *ticks(E['ruler'] + .1, 9, 1.4),
    ('click', E['halfway'], -8),
    ('dive', E['dive'] + .65, -6), ('frost', E['ring'] + .25, -8),
    ('pin', E['pin'] + .12, -5), ('hit', E['brighten'], -7), ('photon', E['photon'], -6),
    ('whoosh', E['pullout'] + .7, -6), ('click', E['dotted'], -7), ('reveal', E['reveal'], -5),
    ('tick', E['counter'], -6), *ticks(E['counter'] + .1, 14, 2.2),
    ('hit', E['meter'] + .2, -6), ('click', E['shades'] + .16, -4),
    ('pin', E['blip'], -6), ('photon', E['planet'] + .05, -6),
    ('whoosh', E['zoomout'] + .6, -7), ('reveal', E['million'], -6),
    ('rewind', RW + .45, -5), ('impact', FLASH2, -6), ('reveal', TITLE + .1, -5),
]
cache = {}
for name, at, gain in FX:
    if name not in cache:
        a = load(os.path.join(A, f'sfx_{name}.wav'))
        cache[name] = (a, int(np.argmax(np.abs(a).max(1))), rms(a))
    a, pk, r = cache[name]
    start = int(at * SR) - pk
    a = a * (db(gain) * vr / r)
    if start < 0: a, start = a[-start:], 0
    end = min(N, start + len(a))
    out[start:end] += a[:end - start]

sf.write(os.path.join(B, 'mix.wav'), out, SR, subtype='FLOAT')
print(f'mix: {TOTAL:.2f} s, music from {CHORD - TITLE:.2f} s into the track, {len(FX)} effects')
