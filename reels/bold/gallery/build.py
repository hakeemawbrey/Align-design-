"""Build the gallery page from reels/out/bold/*.json + captions + an assets map.
   python3 build.py [assets.json]  → reels/out/gallery/index.html (assets.json maps id → {video, poster} urls)"""
import json, os, sys, glob, html
ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../..'))
OUT = os.path.join(ROOT, 'reels/out/bold')
HERE = os.path.dirname(os.path.abspath(__file__))

assets = json.load(open(sys.argv[1])) if len(sys.argv) > 1 and os.path.exists(sys.argv[1]) else {}
ORDER = ['Scenarios', 'Relatable', 'Houston', 'Relationships', 'Align ideas', 'Zodiac', 'Fun facts']
BLURB = {
  'Scenarios': 'What would you do? Dating and texting situations with options, the healthy pick, and how each sign or element handles it.',
  'Relatable': 'That\'s-so-me moments built for sends and tags.',
  'Houston': 'Local hooks Houston will recognise, each turned into a dating truth.',
  'Relationships': 'Warm, honest relationship advice in under a minute.',
  'Align ideas': 'Align\'s ideas as themes: chart first, face last, tonight\'s deck, talk cards, dealbreakers, Push / Pull / Align.',
  'Zodiac': 'Zodiac explainers tied to love: Moon, Mars, Mercury, Rising, retrogrades, eclipses, nodes.',
  'Fun facts': 'True facts about the sky and the words it gave us, each landing on a love line.',
}
films = []
for f in sorted(glob.glob(f'{OUT}/*.json')):
    m = json.load(open(f))
    if m['id'].startswith(('zz', '000')): continue
    cap = open(f'{OUT}/{m["id"]}.caption.txt').read().strip() if os.path.exists(f'{OUT}/{m["id"]}.caption.txt') else ''
    a = assets.get(m['id'], {})
    films.append({**m, 'caption': cap, 'video': a.get('video', ''), 'poster': a.get('poster', '')})
series = [{'name': s, 'blurb': BLURB[s]} for s in ORDER if any(x['series'] == s for x in films)]
tpl = open(os.path.join(HERE, 'template.html')).read()
page = tpl.replace('/*FILMS*/[]', json.dumps(films, ensure_ascii=False)).replace('/*SERIES*/[]', json.dumps(series, ensure_ascii=False))
open(os.path.join(ROOT, 'reels/out/gallery/index.html'), 'w').write(page)
print(len(films), 'films,', sum(1 for x in films if x['video']), 'with video')
