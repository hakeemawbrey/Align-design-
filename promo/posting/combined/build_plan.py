#!/usr/bin/env python3
"""Combined posting plan: the remaining v3 films (v3/plan.csv rows dated on/after day 1, i.e. not yet posted) alternated
one-for-one with the reworked OG films (og/done, series interleaved round-robin), per account. When one list runs out
the other continues alone. PER posts a day per account, every 20 min from 7:00 AM (star_talk) / 7:10 AM (star_advice).
Usage: python3 build_plan.py YYYY-MM-DD [PER]   -> combined/plan.csv"""
import csv, glob, json, datetime, os, sys, collections
here = os.path.dirname(os.path.abspath(__file__)); root = os.path.dirname(here)
day1 = datetime.date.fromisoformat(sys.argv[1]); PER = int(sys.argv[2]) if len(sys.argv) > 2 else 50
HOLD = {'og-st4texasdeck'}          # original note: post only once the Texas beta is real
start = {'star_talk': (7, 0), 'star_advice': (7, 10)}
MON = {m: i for i, m in enumerate(['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], 1)}
def v3date(s):                      # "Fri 13 Nov" (year of day1, rolling over into next year)
    _, d, m = s.split(); dt = datetime.date(day1.year, MON[m], int(d))
    return dt if dt >= day1 - datetime.timedelta(days=60) else datetime.date(day1.year + 1, MON[m], int(d))
v3 = [r for r in csv.DictReader(open(f'{root}/v3/plan.csv')) if v3date(r['date']) >= day1]
done = [json.load(open(f)) for f in sorted(glob.glob(f'{root}/og/done/*.json'))]
rows = []
for acct in start:
    a = [{'series': 'v3', **{k: r[k] for k in ('title', 'film_id', 'drive_file', 'drive_link', 'caption')}} for r in v3 if r['account'] == acct]
    by = collections.OrderedDict()
    for d in sorted((d for d in done if d['account'] == acct and d['id'] not in HOLD), key=lambda d: (d['series'], d['id'])):
        by.setdefault(d['series'], []).append(d)
    qs = list(by.values()); b = []
    while any(qs):
        for q in qs:
            if q: b.append(q.pop(0))
    b = [{'series': d['series'], 'title': d['title'], 'film_id': d['id'], 'drive_file': d['drive_file'], 'drive_link': d['drive_link'], 'caption': d['caption']} for d in b]
    order = []
    for i in range(max(len(a), len(b))):
        if i < len(a): order.append(a[i])
        if i < len(b): order.append(b[i])
    for n, x in enumerate(order):
        day = day1 + datetime.timedelta(days=n // PER)
        h, m = start[acct]; t = datetime.datetime(2000, 1, 1, h, m) + datetime.timedelta(minutes=20 * (n % PER))
        rows.append({'account': acct, 'day': n // PER + 1, 'date': f"{day:%a} {day.day} {day:%b}", 'time': t.strftime('%I:%M %p').lstrip('0'),
                     'type': 'post', **x, '_k': (day, t)})
rows.sort(key=lambda r: r.pop('_k'))
with open(f'{here}/plan.csv', 'w', newline='') as f:
    w = csv.DictWriter(f, fieldnames=['account', 'day', 'date', 'time', 'type', 'series', 'title', 'film_id', 'drive_file', 'drive_link', 'caption'])
    w.writeheader(); w.writerows(rows)
for acct in start:
    r = [x for x in rows if x['account'] == acct]
    print(f"{acct}: {len(r)} posts ({sum(x['series']=='v3' for x in r)} v3 + {sum(x['series']!='v3' for x in r)} OG), {r[0]['date']} -> {r[-1]['date']}")
