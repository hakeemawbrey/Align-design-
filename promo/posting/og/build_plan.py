#!/usr/bin/env python3
"""Builds promo/posting/og/plan.csv (OG social cut) from done/*.json for the posting app.
Series are interleaved round-robin per account, so a day is never one format and the same series never posts twice in a row.
PER posts a day per account, every 20 min from 7:00 AM (star_talk) / 7:10 AM (star_advice).
Usage: python3 build_plan.py [YYYY-MM-DD day 1] [PER]      (held-back films in HOLD are skipped)"""
import csv, glob, json, datetime, os, sys, collections
here = os.path.dirname(os.path.abspath(__file__))
HOLD = {'og-st4texasdeck'}          # original note: post only once the Texas beta is real
day1 = datetime.date.fromisoformat(sys.argv[1]) if len(sys.argv) > 1 else datetime.date.today() + datetime.timedelta(days=1)
PER = int(sys.argv[2]) if len(sys.argv) > 2 else 50
start = {'star_talk': (7, 0), 'star_advice': (7, 10)}
done = [json.load(open(f)) for f in sorted(glob.glob(f'{here}/done/*.json'))]
rows = []
for acct in start:
    by = collections.OrderedDict()
    for d in sorted((d for d in done if d['account'] == acct and d['id'] not in HOLD), key=lambda d: (d['series'], d['id'])):
        by.setdefault(d['series'], []).append(d)
    queues = list(by.values()); order = []
    while any(queues):                      # round-robin across series
        for q in queues:
            if q: order.append(q.pop(0))
    for n, d in enumerate(order):
        day = day1 + datetime.timedelta(days=n // PER)
        h, m = start[acct]; t = datetime.datetime(2000, 1, 1, h, m) + datetime.timedelta(minutes=20 * (n % PER))
        rows.append({'account': acct, 'day': n // PER + 1, 'date': f"{day:%a} {day.day} {day:%b}", 'time': t.strftime('%I:%M %p').lstrip('0'),
                     'type': 'post', 'series': d['series'], 'title': d['title'], 'film_id': d['id'], 'drive_file': d['drive_file'],
                     'drive_link': d['drive_link'], 'caption': d['caption'], '_k': (day, t)})
rows.sort(key=lambda r: r.pop('_k'))
with open(f'{here}/plan.csv', 'w', newline='') as f:
    w = csv.DictWriter(f, fieldnames=['account', 'day', 'date', 'time', 'type', 'series', 'title', 'film_id', 'drive_file', 'drive_link', 'caption'])
    w.writeheader(); w.writerows(rows)
c = collections.Counter(r['account'] for r in rows)
print(f"{len(rows)} rows ({c['star_talk']} star_talk, {c['star_advice']} star_advice), {PER}/day/account from {day1} -> plan.csv")
