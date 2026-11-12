#!/usr/bin/env python3
"""Builds promo/posting/v3/plan.csv for the posting app (npm run import -- plan.csv --commit) from done/*.json.
Each film has a FIXED slot (its place in the order below), so re-running after more films finish only adds rows.
50 a day per account, every 20 min from 7:00 AM (star_talk) / 7:10 AM (star_advice). Day 1 = START (python3 build_plan.py 2026-11-14)."""
import csv, glob, json, datetime, os
here = os.path.dirname(os.path.abspath(__file__))
done = {d['id']: d for d in (json.load(open(f)) for f in glob.glob(f'{here}/done/*.json'))}
batch = [x for f in sorted(glob.glob(f'{here}/batches/*.json')) for x in json.load(open(f))]
FIRST = ['trs3yoursign', 'trs3dating', 'trs3newmatch', 'trs3twoam', 'trs3crush', 'trs3onread', 'trs3leo', 'trs3scorpio', 'trs3pisces']
orders = {
  'star_talk': FIRST + [x['id'] for x in batch if x['account'] == 'star_talk'],
  'star_advice': [x['id'] for x in batch if x['account'] == 'star_advice'],
}
import sys
PER = 50
start = {'star_talk': (7, 0), 'star_advice': (7, 10)}
day1 = datetime.date.fromisoformat(sys.argv[1]) if len(sys.argv) > 1 else datetime.date(2026, 11, 13)
rows = []
for acct, ids in orders.items():
    for n, fid in enumerate(ids):
        if fid not in done: continue
        d = done[fid]; day = day1 + datetime.timedelta(days=n // PER)
        h, m = start[acct]; t = datetime.datetime(2000, 1, 1, h, m) + datetime.timedelta(minutes=20 * (n % PER))
        rows.append({'account': acct, 'day': n // PER + 1, 'date': f"{day:%a} {day.day} {day:%b}", 'time': t.strftime('%I:%M %p').lstrip('0'),
                     'type': 'post', 'title': d['title'], 'film_id': fid, 'drive_file': d['drive_file'], 'drive_link': d['drive_link'], 'caption': d['caption'], '_k': (day, t)})
rows.sort(key=lambda r: r.pop('_k'))
with open(f'{here}/plan.csv', 'w', newline='') as f:
    w = csv.DictWriter(f, fieldnames=['account', 'day', 'date', 'time', 'type', 'title', 'film_id', 'drive_file', 'drive_link', 'caption']); w.writeheader(); w.writerows(rows)
print(f"{len(rows)} rows ({sum(r['account']=='star_talk' for r in rows)} star_talk, {sum(r['account']!='star_talk' for r in rows)} star_advice) -> plan.csv")
