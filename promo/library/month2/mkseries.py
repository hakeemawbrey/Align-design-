# series.json — the Month 2 boost slate (promo/posting/month2-boost.md): 900 videos, no end card, no card cut.
# Each series: key, name, account, kind, prefix, count, short/long split (the LAST `long` episodes are the long ones),
# lengths, library page, and the reference series a long new episode continues (old: ...).
import json
S = []
def s(key, name, acct, kind, prefix, n, long, short_len, long_len, old=None):
    S.append(dict(key=key, name=name, account=acct, kind=kind, prefix=prefix, count=n, long=long,
                  short_len=short_len, long_len=long_len, old=old))
T, A = 'star_talk', 'star_advice'
# Part 1 — new concepts
for k, nm, p in [('dontwatch', "Don't Watch This If You're a ___", 'kdw'), ('caught', 'Caught in 4K', 'kci'),
                 ('speedrun', 'Falling in Love: Speedrun', 'ksr'), ('brainheart', 'Brain vs Heart', 'kbh'),
                 ('news', 'Breaking News: The Stars', 'kbn'), ('court', 'Zodiac Courtroom', 'kzc'),
                 ('achieve', 'Achievement Unlocked: Single Life', 'kau'), ('overthink', 'Overthinking Simulator', 'kos'),
                 ('confess', 'Zodiac Confessional', 'kcf'), ('bingo', 'First Date Bingo', 'kfb'), ('swap', 'Sign Swap', 'ksw')]:
    s(k, nm, T, 'post', p, 20, 5, '10-25 s', '60-90 s')
s('liedet', 'Zodiac Lie Detector', T, 'post', 'kld', 12, 3, '10-25 s', '60 s')
for k, nm, p in [('rescue', 'Text Rescue', 'ktr'), ('normal', 'Is This Normal?', 'kin'), ('pep', 'The 10-Second Pep Talk', 'kpt'),
                 ('healing', 'Healing Era', 'khe'), ('dateyou', 'Date Yourself', 'kdy'), ('saybetter', 'Say It Better', 'ksb'),
                 ('glitch', "Your Sign's Love Glitch", 'klg'), ('almost', 'The Almost Relationship', 'kar'),
                 ('beforeex', 'Before You Text Your Ex', 'kbx'), ('mirror', 'Mirror Talk', 'kmt'), ('onecard', 'One Card, Two People', 'koc')]:
    s(k, nm, A, 'post', p, 20, 5, '15-30 s', '60-90 s')
s('longdist', 'Long Distance Notes', A, 'post', 'kln', 12, 3, '15-30 s', '60 s')
s('deepdive', 'Deep Dive: ___ in Love', A, 'post', 'kdd', 12, 12, None, 'about 2 min')
for k, nm, p in [('thatsme', "Wait, That's Me", 'kwm'), ('whichone', 'Which One Are You?', 'kwo'), ('threesec', '3-Second Advice', 'k3s'),
                 ('thisthat', 'This or That: Love Edition', 'ktt'), ('guess', 'Guess the Sign', 'kgs'), ('fakead', 'Fake Ad', 'kfa'),
                 ('spotgreen', 'Spot the Green Flag', 'ksg'), ('fivethings', '5 Things Every ___ Needs to Hear', 'k5t'),
                 ('bio', 'Bio Glow-Up', 'kbg'), ('hotseat', 'Zodiac Hot Seat', 'khs'), ('unsent', 'The Unsent Text', 'kut'),
                 ('opener', 'Rate the Opener', 'kro')]:
    s(k, nm, A, 'trial', p, 24, 2, '6-12 s', '60 s')
s('preacts', 'Pisces Reacts', A, 'trial', 'kpr', 12, 1, '6-12 s', '60 s')
# Part 2 — long new episodes of series we've made before (all long)
for k, nm, p, n, ln, old in [('xthread', 'The Thread: Extended', 'kxth', 8, '90 s', 'thread (nthe01-32)'),
                             ('xgame', 'Star Talk Game Night: Full Games', 'kxgn', 8, '2 min', 'game (ngne01-24)'),
                             ('xremix', 'Remix Cities: Extended', 'kxrc', 8, '60 s', 'Remix (sr*) and Snow Globe Cities (nsge*)'),
                             ('xtrends', 'Trends: Extended', 'kxtr', 12, '2 min', 'Trends 1 (tr*) and Trends 2 (nt2e*)'),
                             ('xthen', 'Then vs Now: Extended', 'kxtv', 8, '60 s', 'Then vs Now (y*, nhve*)'),
                             ('xsilent', 'Silent Review: Extended', 'kxsr', 6, '60 s', 'Silent Review (trsilent*, nsre*)'),
                             ('xratedate', 'Rate My Date Idea: Extended', 'kxrd', 6, '75 s', 'Rate My Date Idea (nrde*)'),
                             ('xrank', 'Ranking the Signs: Full Countdown', 'kxrk', 6, '90 s', 'Ranking the Signs (nrke*)'),
                             ('xparty', 'Your Sign at the Party: Extended', 'kxpy', 6, '90 s', 'Your Sign at the Holiday Party (npye*)')]:
    s(k, nm, T, 'post', p, n, n, None, ln, old)
for k, nm, p, n, ln, old in [('xguide', 'Your Star Guide: Extended', 'kxsg', 12, '60-90 s', 'Your Star Guide (guide*, ngwe*)'),
                             ('xask', 'Ask the Stars: Extended', 'kxas', 8, '75 s', 'Ask the Stars (ask*, naske*)'),
                             ('xexplain', 'Star Talk Explains: Extended', 'kxex', 6, '2 min', 'Star Talk Explains (nx2e*, st5*)'),
                             ('xsxs', 'Sign × Sign: Extended', 'kxss', 8, '90 s', 'Sign × Sign (sx*, nsse*)'),
                             ('xmakeup', 'The Make-Up Talk: Extended', 'kxmu', 6, '90 s', 'The Make-Up Talk (nmue*)'),
                             ('xsingle', 'Single and Thriving: Extended', 'kxst', 6, '75 s', 'Single and Thriving (nste*), Holiday Survival Guide (nhse*)'),
                             ('xfriends', 'Friends First: Extended', 'kxff', 4, '60 s', 'Friends First (nffe*)'),
                             ('xlane', 'Moonlight Lane: Side Stories', 'kxml', 6, '90 s', 'Moonlight Lane (ml*, nml2e*)')]:
    s(k, nm, A, 'post', p, n, n, None, ln, old)
tot = sum(x['count'] for x in S); assert tot == 900, tot
lng = sum(x['long'] for x in S); assert lng == 277, lng
for acct, kind, n in [(T, 'post', 300), (A, 'post', 300), (A, 'trial', 300)]:
    assert sum(x['count'] for x in S if x['account'] == acct and x['kind'] == kind) == n
# batches (one cloud session each, 48)
G = [[k] for k in ['dontwatch', 'caught', 'speedrun', 'brainheart', 'news', 'court', 'achieve', 'overthink', 'confess', 'bingo', 'swap',
                   'rescue', 'normal', 'pep', 'healing', 'dateyou', 'saybetter', 'glitch', 'almost', 'beforeex', 'mirror', 'onecard']]
G += [['liedet', 'longdist']]
G += [[('deepdive', 1, 6), ('preacts', 1, 6)], [('deepdive', 7, 12), ('preacts', 7, 12)]]
G += [[k] for k in ['thatsme', 'whichone', 'threesec', 'thisthat', 'guess', 'fakead', 'spotgreen', 'fivethings', 'bio', 'hotseat', 'unsent', 'opener']]
G += [['xthread'], ['xgame'], ['xremix', 'xthen'], ['xtrends'], ['xsilent', 'xratedate'], ['xrank', 'xparty'], ['xguide'],
      ['xask', 'xfriends'], ['xexplain', 'xsxs'], ['xmakeup', 'xsingle'], ['xlane']]
ser = {x['key']: x for x in S}
B = []
for g in G:
    B.append([dict(series=p, first=1, last=ser[p]['count']) if isinstance(p, str) else dict(series=p[0], first=p[1], last=p[2]) for p in g])
assert len(B) == 48, len(B)
assert sum(p['last'] - p['first'] + 1 for b in B for p in b) == 900
# library pages 23-38: three batches per page
for i, b in enumerate(B):
    for p in b: p['page'] = 23 + i // 3
for x in S: x['page'] = min(p['page'] for b in B for p in b if p['series'] == x['key'])
json.dump({'series': S, 'batches': [{'id': f'm{i:02d}', 'parts': b} for i, b in enumerate(B, 1)]}, open('series.json', 'w'), ensure_ascii=False, indent=1)
print(len(S), 'series,', len(B), 'batches, pages', sorted({p['page'] for b in B for p in b}))
