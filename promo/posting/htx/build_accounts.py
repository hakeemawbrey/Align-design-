#!/usr/bin/env python3
"""Houston Star Talk across both IG accounts -> promo/posting/htx/accounts_plan.csv
- 20 Houston posts a day per account (star_talk, star_advice), each video posted once.
  advice-style videos go to star_advice, story-style to star_talk, the rest balance the two.
- The 24 countdown videos post on their exact date (N days before Jan 9) on BOTH accounts.
- Slots never collide with the existing 50/day queue (combined/plan.csv): that queue uses star_talk
  :00/:20/:40 and star_advice :10/:30/:50 from 7:00/7:10 AM every 20 min. Houston uses
  star_talk 7:10 AM + every 40 min (:10/:30/:50) and star_advice 7:20 AM + every 40 min (:00/:20/:40).
  Countdowns: star_talk 12:10 PM, star_advice 12:20 PM.
Columns match combined/plan.csv so the posting app can import it the same way.
Usage: python3 build_accounts.py YYYY-MM-DD [PER]"""
import csv, glob, json, os, sys, datetime, collections
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
here = os.path.dirname(os.path.abspath(__file__))
day1 = datetime.date.fromisoformat(sys.argv[1]); PER = int(sys.argv[2]) if len(sys.argv) > 2 else 20
PARTY = datetime.date(2027, 1, 9)
plan = list(csv.DictReader(open(f'{here}/plan.csv')))             # style-interleaved order from build_plan.py
recs = {json.load(open(f))['id']: json.load(open(f)) for f in glob.glob(f'{here}/done/*.json')}
first = {'star_talk': (7, 10), 'star_advice': (7, 20)}
cd_time = {'star_talk': (12, 10), 'star_advice': (12, 20)}
queues = {'star_talk': [], 'star_advice': []}; countdown = []
for p in plan:
    r = recs[p['id']]
    if p['note'].startswith('countdown'):
        countdown.append((r, int(p['note'].split(':')[1].split()[0]))); continue
    acct = 'star_advice' if r['style'] == 'advice' else 'star_talk' if r['style'] == 'story' else min(queues, key=lambda a: len(queues[a]))
    queues[acct].append(r)
def row(acct, d, h, m, r, day):
    return {'account': acct, 'day': day, 'date': f"{d:%a} {d.day} {d:%b}", 'time': datetime.time(h, m).strftime('%I:%M %p').lstrip('0'),
            'type': 'post', 'series': 'houston', 'title': r['hook'], 'film_id': r['id'], 'drive_file': r['drive_file'],
            'drive_link': r['drive_link'], 'caption': r['caption'], '_k': (d, h, m, acct)}
rows = []
for acct, q in queues.items():
    for n, r in enumerate(q):
        d = day1 + datetime.timedelta(days=n // PER)
        t = datetime.datetime(2000, 1, 1, *first[acct]) + datetime.timedelta(minutes=40 * (n % PER))
        rows.append(row(acct, d, t.hour, t.minute, r, n // PER + 1))
for r, n in countdown:
    d = PARTY - datetime.timedelta(days=n)
    for acct in queues: rows.append(row(acct, d, *cd_time[acct], r, (d - day1).days + 1))
rows.sort(key=lambda x: x.pop('_k'))
with open(f'{here}/accounts_plan.csv', 'w', newline='') as f:
    w = csv.DictWriter(f, fieldnames=['account', 'day', 'date', 'time', 'type', 'series', 'title', 'film_id', 'drive_file', 'drive_link', 'caption'])
    w.writeheader(); w.writerows(rows)
for acct, q in queues.items():
    last = day1 + datetime.timedelta(days=(len(q) - 1) // PER)
    print(f"{acct}: {len(q)} Houston videos, {PER}/day, {day1:%a %d %b} -> {last:%a %d %b}; styles: {dict(collections.Counter(r['style'] for r in q).most_common(4))}")
print(f"countdowns: {len(countdown)} videos x 2 accounts, {min(PARTY - datetime.timedelta(days=n) for _, n in countdown):%a %d %b} -> {max(PARTY - datetime.timedelta(days=n) for _, n in countdown):%a %d %b}")
print(len(rows), 'rows')
