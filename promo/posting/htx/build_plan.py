#!/usr/bin/env python3
"""Houston Star Talk posting plan → promo/posting/htx/plan.csv (from done/*.json).
- Countdown videos ("N days until Jan 9", "Day N…", "Two weeks out…") post exactly N days before the party (Jan 9),
  at 12:00 PM. N comes from the record's countdown_days, else from the hook.
- Everything else is spread evenly from START to Jan 8, styles interleaved round-robin so the same style never
  posts twice in a row, at 2-hour-ish slots from 8:00 AM.
- account is left blank (the owner decides later).
Usage: python3 build_plan.py [YYYY-MM-DD start, default tomorrow]"""
import csv, glob, json, os, re, sys, datetime, collections, math
here = os.path.dirname(os.path.abspath(__file__))
PARTY = datetime.date(2027, 1, 9)
start = datetime.date.fromisoformat(sys.argv[1]) if len(sys.argv) > 1 else datetime.date.today() + datetime.timedelta(days=1)
recs = [json.load(open(f)) for f in sorted(glob.glob(f'{here}/done/*.json'))]
WORDS = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10}
def days_out(r):
    if r.get('countdown_days'): return int(r['countdown_days'])
    if r['style'] != 'countdown': return None
    h = r['hook'].lower()
    if 'tomorrow' in h: return 1
    m = re.search(r'(\d+)\s*(more\s+)?(days?|sleeps?)', h)
    if m: return int(m.group(1))
    m = re.search(r'(\d+)\s*(days?|day)', h) or re.search(r'day\s*(\d+)', h)
    if m: return int(m.group(1))
    m = re.search(r'(one|two|three)\s+weeks?', h)
    if m:
        extra = re.search(r'weeks?,?\s+(?:and\s+)?(' + '|'.join(WORDS) + r')\s+days?', h)   # "one week, one day"
        return 7 * WORDS[m.group(1)] + (WORDS[extra.group(1)] if extra else 0)
    m = re.search(r'\b(' + '|'.join(WORDS) + r')\s+days?', h)
    if m: return WORDS[m.group(1)]
    num = int(r['id'][3:])
    if 405 <= num <= 428: return 24 - (num - 405)          # w17 numbered its countdown batch in order: 24 days … 1 day
    return None
rows, fixed, rest = [], [], []
for r in recs:
    n = days_out(r)
    (fixed if n else rest).append((r, n))
# round-robin across styles for the rest
by = collections.OrderedDict()
for r, _ in sorted(rest, key=lambda q: (q[0]['style'], q[0]['id'])): by.setdefault(r['style'], []).append(r)
order, last = [], None
while any(by.values()):
    for st in list(by):
        if by[st] and st != last: order.append(by[st].pop(0)); last = st
    if sum(map(len, by.values())) and all((not v) or k == last for k, v in by.items()): order.append(by[last].pop(0))   # only one style left
days = max(1, (PARTY - start).days)               # through Jan 8
per = math.ceil(len(order) / days)
for k, r in enumerate(order):
    d = start + datetime.timedelta(days=k // per); slot = k % per
    t = datetime.datetime(2000, 1, 1, 8, 0) + datetime.timedelta(minutes=int(slot * (14 * 60 / per)))
    rows.append((d, t, r, ''))
for r, n in fixed:
    d = PARTY - datetime.timedelta(days=n)
    rows.append((d, datetime.datetime(2000, 1, 1, 12, 0), r, f'countdown: {n} days before Jan 9' + (' (date already passed: post as soon as possible)' if d < start else '')))
rows.sort(key=lambda q: (q[0], q[1]))
with open(f'{here}/plan.csv', 'w', newline='') as f:
    w = csv.writer(f); w.writerow(['date', 'time', 'account', 'id', 'style', 'hook', 'drive_link', 'caption', 'note'])
    for d, t, r, note in rows: w.writerow([f"{d:%a} {d.day} {d:%b}", t.strftime('%I:%M %p').lstrip('0'), '', r['id'], r['style'], r['hook'], r['drive_link'], r['caption'], note])
c = collections.Counter(r['style'] for r in recs)
print(f"{len(rows)} posts, {start} → {max(q[0] for q in rows)}; {per}/day plus {len(fixed)} countdown posts on fixed dates")
print(', '.join(f'{k} {v}' for k, v in sorted(c.items(), key=lambda q: -q[1])))
