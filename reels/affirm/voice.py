"""Speak an affirmation reel with Kokoro (open-weights TTS) and report when
every word is said, so the captions can light up word by word.

    python3 voice.py <request.json> <out dir>

request.json:
    {"voice": "af_heart", "speed": 0.92,
     "scenes": [{"text": "...", "words": ["There's", "a", ...], "pause": 0.3}]}

Writes <out dir>/scene-<n>.wav (24 kHz mono) and <out dir>/voice.json:
    {"scenes": [{"wav": "scene-0.wav", "dur": 6.2, "words": [[0.08, 0.27], ...]}]}

The model is the timestamped Kokoro export, which reports how long each
phoneme lasts. Run setup.sh once to fetch it into .voice/.
"""
import json
import os
import re
import sys

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

HERE = os.path.dirname(os.path.abspath(__file__))
VOICE_DIR = os.environ.get('ALIGN_VOICE_DIR', os.path.join(HERE, '.voice'))
MODEL = os.path.join(VOICE_DIR, 'kokoro-timestamped.onnx')
VOICES = os.path.join(VOICE_DIR, 'voices-v1.0.bin')
PUNCT = set(',.!?;:—–-…"“”()\'')


def word_groups(timings):
    """Group phoneme timings into spoken words, split on the space phoneme.
    A group that is only punctuation belongs to the word before it."""
    groups, cur = [], []
    for tm in timings:
        if tm.phoneme == ' ':
            if cur:
                groups.append(cur)
            cur = []
            continue
        cur.append(tm)
    if cur:
        groups.append(cur)
    out = []
    for g in groups:
        voiced = [tm for tm in g if tm.phoneme not in PUNCT and tm.phoneme not in 'ˈˌː']
        if not voiced:
            continue
        out.append([voiced[0].start, voiced[-1].end, len(strip(''.join(tm.phoneme for tm in voiced)))])
    return out


def strip(ph):
    return ''.join(c for c in ph if c not in PUNCT and c not in 'ˈˌː ')


def align(groups, words, k):
    """Match spoken groups to caption words. The phonemizer sometimes runs two
    small words together ("of a" → əvə, "to be" → təbi), so one group may
    cover up to three words; a merged group's time is shared by each word's
    own phoneme count. Returns None when no sensible alignment exists."""
    lens = [max(1, len(strip(k.tokenizer.phonemize(w, 'en-us')))) for w in words]
    G, N = len(groups), len(words)
    INF = float('inf')
    cost = [[INF] * (N + 1) for _ in range(G + 1)]
    back = [[0] * (N + 1) for _ in range(G + 1)]
    cost[0][0] = 0
    for i in range(1, G + 1):
        gl = max(1, groups[i - 1][2])
        for j in range(1, N + 1):
            for m in (1, 2, 3):
                if j - m < 0 or cost[i - 1][j - m] == INF:
                    continue
                c = cost[i - 1][j - m] + abs(gl - sum(lens[j - m:j])) / gl + (m - 1) * 0.35
                if c < cost[i][j]:
                    cost[i][j] = c
                    back[i][j] = m
    if cost[G][N] == INF:
        return None
    spans = [None] * N
    i, j = G, N
    while i > 0:
        m = back[i][j]
        s, e = groups[i - 1][0], groups[i - 1][1]
        part = lens[j - m:j]
        t = s
        for q, ln in enumerate(part):
            d = (e - s) * ln / sum(part)
            spans[j - m + q] = [t, t + d]
            t += d
        i, j = i - 1, j - m
    return spans


def spread(words, start, end):
    """Fallback: share [start, end] between words by their length."""
    weights = [max(1, len(re.sub(r'[^A-Za-z]', '', w))) + 1.5 for w in words]
    total = sum(weights)
    out, t = [], start
    for w in weights:
        d = (end - start) * w / total
        out.append([t, t + d * 0.92])
        t += d
    return out


def main():
    req = json.load(open(sys.argv[1]))
    out_dir = sys.argv[2]
    os.makedirs(out_dir, exist_ok=True)
    k = Kokoro(MODEL, VOICES)
    # This export names its timing output "durations"; the outputs come back
    # in the same order the library expects, so it can use them as is.
    k.has_timings = True
    voice = req.get('voice', 'af_heart')
    speed = float(req.get('speed', 0.92))
    res = []
    for i, sc in enumerate(req['scenes']):
        audio, sr, timings = k.create_timed(
            sc['text'], voice, speed=speed, lang='en-us',
            sentence_pause=float(sc.get('pause', 0.3)), clause_pause=0.12)
        # a short fade at both ends so joins never click
        f = int(0.012 * sr)
        audio = audio.astype(np.float32)
        audio[:f] *= np.linspace(0, 1, f)
        audio[-f:] *= np.linspace(1, 0, f)
        wav = f'scene-{i}.wav'
        sf.write(os.path.join(out_dir, wav), audio, sr)
        groups = word_groups(timings)
        words = sc['words']
        spans = [g[:2] for g in groups] if len(groups) == len(words) else align(groups, words, k)
        if spans is None:
            print(f'voice: scene {i}: {len(groups)} spoken words for {len(words)} caption words, spreading evenly',
                  file=sys.stderr)
            spans = spread(words, groups[0][0] if groups else 0.05, groups[-1][1] if groups else len(audio) / sr)
        res.append({'wav': wav, 'dur': len(audio) / sr, 'words': [[round(a, 3), round(b, 3)] for a, b in spans]})
    json.dump({'scenes': res}, open(os.path.join(out_dir, 'voice.json'), 'w'))


if __name__ == '__main__':
    main()
