# Planet Talk: 10 planets × 12 signs = 120 videos (Month 2 add-on). Same rules as the Month 2 boost (no end card, no card cut).
# Each planet is one series of 12 episodes in zodiac order (e01 Aries … e12 Pisces). The planet's "home" sign episodes
# (the signs it rules in astrology) are long (60–90 s); the rest are short (20–35 s).
# Odd episodes (Aries, Gemini, Leo, Libra, Sagittarius, Aquarius) post on star_talk; even ones on star_advice.
import json
SIGNS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
P = [('sun', 'The Sun', 'kpsu', ['leo']), ('moon', 'The Moon', 'kpmo', ['cancer']), ('mercury', 'Mercury', 'kpme', ['gemini', 'virgo']),
     ('venus', 'Venus', 'kpve', ['taurus', 'libra']), ('mars', 'Mars', 'kpma', ['aries']), ('jupiter', 'Jupiter', 'kpju', ['sagittarius']),
     ('saturn', 'Saturn', 'kpsa', ['capricorn']), ('uranus', 'Uranus', 'kpur', ['aquarius']), ('neptune', 'Neptune', 'kpne', ['pisces']),
     ('pluto', 'Pluto', 'kppl', ['scorpio'])]
S, B = [], []
for i, (k, nm, pre, home) in enumerate(P):
    eps = [{'episode': j + 1, 'sign': sg, 'long': sg in home, 'account': 'star_talk' if j % 2 == 0 else 'star_advice'} for j, sg in enumerate(SIGNS)]
    S.append({'key': 'p' + k, 'planet': k, 'name': f'Planet Talk: {nm}', 'prefix': pre, 'count': 12, 'kind': 'post', 'account': 'both',
              'home': home, 'short_len': '20-35 s', 'long_len': '60-90 s', 'page': 39 if i < 5 else 40, 'episodes': eps})
    B.append({'id': f'p{i+1:02d}', 'parts': [{'series': 'p' + k, 'first': 1, 'last': 12, 'page': 39 if i < 5 else 40}]})
assert sum(s['count'] for s in S) == 120
json.dump({'series': S, 'batches': B}, open('series.json', 'w'), ensure_ascii=False, indent=1)
print(len(S), 'series,', sum(e['long'] for s in S for e in s['episodes']), 'long')
