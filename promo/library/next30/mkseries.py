# series.json — the 900-video slate for days 26-55 (see promo/posting/next-30-days.md): who posts it, id prefix, count,
# length, library page, and the build batches (one cloud session each).
import json
S = []  # key, name, account, kind, prefix, count, length, page
def s(key, name, acct, kind, prefix, n, length, page, splits): S.append(dict(key=key, name=name, account=acct, kind=kind, prefix=prefix, count=n, length=length, page=page, splits=splits))
T, A = 'star_talk', 'star_advice'
s('c14', 'Season 14: Cuffing Season', T, 'post', 'nc14', 24, '30-45 s', 11, [12, 12])
s('h15', 'Season 15: Home for the Holidays', T, 'post', 'nh15', 24, '30-45 s', 11, [12, 12])
s('thread', 'The Thread', T, 'post', 'nth', 32, '20-30 s', 12, [16, 16])
s('game', 'Star Talk Game Night', T, 'post', 'ngn', 24, '30-40 s', 12, [12, 12])
s('green', '24 Days of Green Flags', T, 'post', 'ngf', 24, '15-20 s', 13, [24])
s('sagtk', 'Sag Season Takeover', T, 'post', 'nsag', 12, '20-30 s', 13, [12])
s('captk', 'Capricorn Season Takeover', T, 'post', 'ncap', 8, '20-30 s', 13, [8])
s('trends2', 'Trends, Volume 2', T, 'post', 'nt2', 100, '15-30 s', 14, [20, 20, 20, 20, 20])
s('snow', 'Remix: Snow Globe Cities', T, 'post', 'nsg', 28, '30 s', 15, [14, 14])
s('hol', 'Then vs Now: Holidays 2016 vs 2026', T, 'post', 'nhv', 24, '20 s', 15, [24])
s('ml2', 'Moonlight Lane, Season 2: Winter on the Lane', A, 'post', 'nml2', 10, '2 min', 16, [5, 5])
s('f16', 'Season 16: Meet the Family', A, 'post', 'nf16', 24, '30-45 s', 16, [12, 12])
s('gw', 'Your Star Guide: Winter', A, 'post', 'ngw', 48, '20-30 s', 17, [24, 24])
s('ask2', 'Ask the Stars, Volume 2', A, 'post', 'nask', 36, '20 s', 17, [18, 18])
s('x2', 'Star Talk Explains, Volume 2', A, 'post', 'nx2', 30, '45-60 s', 18, [15, 15])
s('surv', 'Holiday Survival Guide', A, 'post', 'nhs', 24, '30 s', 18, [12, 12])
s('makeup', 'The Make-Up Talk', A, 'post', 'nmu', 24, '30 s', 18, [12, 12])
s('single', 'Single and Thriving', A, 'post', 'nst', 24, '20-30 s', 19, [24])
s('friends', 'Friends First', A, 'post', 'nff', 24, '20-30 s', 19, [24])
s('sxs2', 'Sign × Sign, Volume 2', A, 'post', 'nss', 32, '30 s', 19, [16, 16])
s('newyear', 'New Year, Same Heart', A, 'post', 'nny', 12, '20 s', 19, [12])
s('three', 'The First Three Dates', A, 'post', 'nfd', 12, '30 s', 19, [12])
s('party', 'Your Sign at the Holiday Party', A, 'trial', 'npy', 12, '10-20 s', 20, [12])
s('gifts', 'The Signs as Winter Gifts', A, 'trial', 'ngi', 12, '10-20 s', 20, [12])
s('rank', 'Ranking the Signs', A, 'trial', 'nrk', 24, '15-20 s', 20, [24])
s('am3', '3 AM in Winter', A, 'trial', 'n3a', 12, '15-20 s', 20, [12])
s('deal', 'Dealbreaker or Not?', A, 'trial', 'ndb', 24, '10-20 s', 20, [24])
s('oneline', 'One-Line Advice for Your Sign', A, 'trial', 'nol', 24, '10-15 s', 21, [24])
s('pov', "POV: You're Dating a ___", A, 'trial', 'npv', 24, '15-20 s', 21, [24])
s('hotcold', 'Hot Take, Cold Take', A, 'trial', 'nhc', 24, '10-20 s', 21, [24])
s('ratedate', 'Rate My Date Idea', A, 'trial', 'nrd', 24, '15-20 s', 21, [24])
s('starter', 'Winter Starter Pack', A, 'trial', 'nwp', 12, '10-15 s', 22, [12])
s('versus', 'Sign vs Sign', A, 'trial', 'nvs', 24, '15-20 s', 22, [24])
s('wait2', 'Wait for It, Volume 2', A, 'trial', 'nwf', 12, '15-20 s', 22, [12])
s('silent2', 'Silent Review, Volume 2', A, 'trial', 'nsr', 12, '15-20 s', 22, [12])
s('pcries', 'Pisces Cries About…', A, 'trial', 'npc', 12, '10-15 s', 22, [12])
s('mltease', 'Moonlight Lane S2 teasers', A, 'trial', 'nmt', 30, '15-25 s', 22, [15, 15])
s('holq', 'Holidays Then vs Now (quick cuts)', A, 'trial', 'nhq', 18, '10-15 s', 22, [18])
tot = sum(x['count'] for x in S); assert tot == 900, tot
assert all(sum(x['splits']) == x['count'] for x in S)
# batches: one per split; small trial sets are paired so each session has ~20-30 short films
B = []
for x in S:
    a = 1
    for n in x['splits']: B.append([dict(series=x['key'], first=a, last=a + n - 1)]); a += n
def merge(*keys):
    idx = [i for i, b in enumerate(B) if len(b) == 1 and b[0]['series'] in keys]
    B[idx[0]] = [b[0] for i, b in enumerate(B) if i in idx]
    for i in reversed(idx[1:]): B.pop(i)
merge('sagtk', 'captk'); merge('newyear', 'three'); merge('party', 'gifts'); merge('am3', 'starter'); merge('wait2', 'silent2'); merge('pcries', 'holq')
# Moonlight teasers are cut by the session that builds those episodes
for b in B:
    if b[0]['series'] == 'ml2':
        part = 1 if b[0]['first'] == 1 else 2
        b.append(dict(series='mltease', first=1 if part == 1 else 16, last=15 if part == 1 else 30))
B = [b for b in B if b[0]['series'] != 'mltease']
for i, b in enumerate(B, 1):
    for p in b: p['batch'] = f'b{i:02d}'
json.dump({'series': S, 'batches': [{'id': f'b{i:02d}', 'parts': b} for i, b in enumerate(B, 1)]}, open('series.json', 'w'), ensure_ascii=False, indent=1)
print(len(B), 'batches'); print(sum(p['last'] - p['first'] + 1 for b in B for p in b))
