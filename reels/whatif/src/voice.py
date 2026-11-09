"""Narration for the explainer: speak each line with Kokoro (via the affirm
reel's voice.py), join the lines with the script's gaps, and turn each beat
word into an absolute event time.

    .voice/venv/bin/python src/voice.py [story-id] [voice] [speed]

Writes build/[story-id/]voice.wav (24 kHz mono) and build/timeline.json:
    {"dur": 54.2, "words": [{"w": "What", "t0": .., "t1": .., "line": 0}],
     "lines": [{"t0": .., "t1": .., "text": ..}], "events": {"align": 1.42, ...}}
"""
import json, os, re, subprocess, sys
import numpy as np
import soundfile as sf

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
AFFIRM = os.path.join(ROOT, '..', 'affirm')
# usage: voice.py [story-id] [voice] [speed]; with no story id it reads the
# original stars-align script.json at the top of reels/whatif
args = sys.argv[1:]
story = args.pop(0) if args and os.path.isdir(os.path.join(ROOT, 'stories', args[0])) else None
BUILD = os.path.join(ROOT, 'build', story) if story else os.path.join(ROOT, 'build')
os.makedirs(BUILD, exist_ok=True)

script = json.load(open(os.path.join(ROOT, 'stories', story, 'script.json') if story else os.path.join(ROOT, 'script.json')))
voice = args[0] if len(args) > 0 else script['voice']
speed = float(args[1]) if len(args) > 1 else script['speed']
lines = script['lines']
req = {'voice': voice, 'speed': speed,
       'scenes': [{'text': l['text'], 'words': l['text'].split(), 'pause': 0.2} for l in lines]}
tmp = os.path.join(BUILD, 'kokoro')
os.makedirs(tmp, exist_ok=True)
json.dump(req, open(os.path.join(tmp, 'req.json'), 'w'))
subprocess.run([sys.executable, os.path.join(AFFIRM, 'voice.py'), os.path.join(tmp, 'req.json'), tmp], check=True)
res = json.load(open(os.path.join(tmp, 'voice.json')))['scenes']

LEAD = 0.55  # silence before the first word
SR = 24000
out, words, lout, events = [], [], [], {}
t = LEAD
out.append(np.zeros(int(LEAD * SR), np.float32))
for i, (l, sc) in enumerate(zip(lines, res)):
    a, sr = sf.read(os.path.join(tmp, sc['wav']), dtype='float32')
    assert sr == SR
    # trim the clip to its speech so the gaps are exactly the script's
    s0 = max(0.0, sc['words'][0][0] - 0.04)
    s1 = min(len(a) / sr, sc['words'][-1][1] + 0.12)
    a = a[int(s0 * sr):int(s1 * sr)]
    f = int(0.01 * sr)
    a[:f] *= np.linspace(0, 1, f); a[-f:] *= np.linspace(1, 0, f)
    ws = l['text'].split()
    for w, (w0, w1) in zip(ws, sc['words']):
        bare = re.sub(r"[^\w'-]", '', w)
        words.append({'w': bare, 't0': round(t + w0 - s0, 3), 't1': round(t + w1 - s0, 3), 'line': i})
        key = bare
        if key in l.get('beats', {}) and l['beats'][key] not in events:
            events[l['beats'][key]] = round(t + w0 - s0, 3)
    for k in l.get('beats', {}):
        if l['beats'][k] not in events:
            raise SystemExit(f'beat word {k!r} not found in line {i}: {l["text"]}')
    lout.append({'t0': round(t, 3), 't1': round(t + len(a) / sr, 3), 'text': l['text']})
    out.append(a)
    t += len(a) / sr
    if i < len(lines) - 1:
        g = l.get('gapAfter', script['gap'])
        out.append(np.zeros(int(g * SR), np.float32)); t += g
audio = np.concatenate(out)
sf.write(os.path.join(BUILD, 'voice.wav'), audio, SR)
tl = {'voice': voice, 'speed': speed, 'dur': round(t, 3), 'words': words, 'lines': lout, 'events': events}
json.dump(tl, open(os.path.join(BUILD, 'timeline.json'), 'w'), indent=1)
wc = len(words)
print(f'voice {voice} x{speed}: {t:.2f}s, {wc} words, {wc / (t - LEAD) * 60:.0f} wpm')
for k, v in sorted(events.items(), key=lambda kv: kv[1]):
    print(f'  {v:6.2f}  {k}')
