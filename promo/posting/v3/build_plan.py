#!/usr/bin/env python3
"""Builds promo/posting/v3/plan.csv for the posting app (npm run import -- plan.csv --commit) from done/*.json.
Each film has a FIXED slot (its place in the order below), so re-running after more films finish only adds rows.
star_talk: 10 a day, every 90 min from 8:00 AM; zodiac.advice444: 10 a day, every 90 min from 8:45 AM. Day 1 = Thu 12 Nov."""
import csv, glob, json, datetime, os
here = os.path.dirname(os.path.abspath(__file__))
done = {d['id']: d for d in (json.load(open(f)) for f in glob.glob(f'{here}/done/*.json'))}
batch = [x for f in sorted(glob.glob(f'{here}/batches/*.json')) for x in json.load(open(f))]
FIRST = ['trs3yoursign', 'trs3dating', 'trs3newmatch', 'trs3twoam', 'trs3crush', 'trs3onread', 'trs3leo', 'trs3scorpio', 'trs3pisces']
orders = {
  'star_talk': FIRST + [x['id'] for x in batch if x['account'] == 'star_talk'],
  'zodiac.advice444': [x['id'] for x in batch if x['account'] == 'zodiac.advice444'],
}
start = {'star_talk': (8, 0), 'zodiac.advice444': (8, 45)}
day1 = datetime.date(2026, 11, 12)
rows = []
for acct, ids in orders.items():
    for n, fid in enumerate(ids):
        if fid not in done: continue
        d = done[fid]; day = day1 + datetime.timedelta(days=n // 10)
        h, m = start[acct]; t = datetime.datetime(2000, 1, 1, h, m) + datetime.timedelta(minutes=90 * (n % 10))
        rows.append({'account': acct, 'day': n // 10 + 1, 'date': f"{day:%a} {day.day} {day:%b}", 'time': t.strftime('%I:%M %p').lstrip('0'),
                     'type': 'post', 'title': d['title'], 'film_id': fid, 'drive_file': d['drive_file'], 'drive_link': d['drive_link'], 'caption': d['caption'], '_k': (day, t)})
rows.sort(key=lambda r: r.pop('_k'))
with open(f'{here}/plan.csv', 'w', newline='') as f:
    w = csv.DictWriter(f, fieldnames=['account', 'day', 'date', 'time', 'type', 'title', 'film_id', 'drive_file', 'drive_link', 'caption']); w.writeheader(); w.writerows(rows)
print(f"{len(rows)} rows ({sum(r['account']=='star_talk' for r in rows)} star_talk, {sum(r['account']!='star_talk' for r in rows)} zodiac.advice444) -> plan.csv")
