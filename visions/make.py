"""Batch and endless production.

  python3 make.py                        # the next 12 reels in rotation
  python3 make.py --count 40             # the next 40
  python3 make.py --theme love --count 6 # only love lines
  python3 make.py --sign scorpio         # only Scorpio's lines
  python3 make.py --forever              # never stop: every line, then every line again with new pictures
  python3 make.py --preview              # half size, fast

Rotation: themes take turns (love, soul, align, sky, signs), and inside a theme the
least-used line goes next. Each time a line comes round again its seed goes up,
so it gets a new draw of pictures, a new order and a new soundtrack. Every
(line, seed) is a different reel, so the run is endless. Progress is kept in
out/state.json, so a stopped run picks up where it left off.
"""
import argparse
import concurrent.futures as cf
import itertools
import json
import os

import render

STATE = os.path.join(render.HERE, "out", "state.json")
THEMES = ["love", "soul", "align", "sky", "sign"]


def load_state():
    return json.load(open(STATE)) if os.path.exists(STATE) else {"uses": {}, "turn": 0, "made": []}


def save_state(st):
    os.makedirs(os.path.dirname(STATE), exist_ok=True)
    tmp = STATE + ".tmp"
    json.dump(st, open(tmp, "w"), indent=1)
    os.replace(tmp, STATE)


def queue(lines, st, theme=None, sign=None):
    """Yield (line, seed) forever, updating st as it goes."""
    by_theme = {}
    for ln in lines:
        if theme and ln.get("theme") != theme:
            continue
        if sign and ln.get("sign") != sign:
            continue
        by_theme.setdefault(ln.get("theme"), []).append(ln)
    order = [t for t in THEMES if t in by_theme] + [t for t in by_theme if t not in THEMES]
    if not order:
        raise SystemExit("no lines match")
    while True:
        t = order[st["turn"] % len(order)]
        st["turn"] += 1
        pool = by_theme[t]
        # least used first; ties broken by position so the run walks the list in order
        ln = min(pool, key=lambda x: (st["uses"].get(x["id"], 0), pool.index(x)))
        seed = st["uses"].get(ln["id"], 0)
        st["uses"][ln["id"]] = seed + 1
        yield ln, seed


def one(job):
    ln, seed, preview = job
    return render.render(ln, seed, preview)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--count", type=int, default=12)
    ap.add_argument("--theme", choices=THEMES)
    ap.add_argument("--sign")
    ap.add_argument("--forever", action="store_true")
    ap.add_argument("--preview", action="store_true")
    ap.add_argument("--jobs", type=int, default=max(1, (os.cpu_count() or 2) // 2))
    a = ap.parse_args()
    lines = render.load_lines()["lines"]
    st = load_state()
    q = queue(lines, st, a.theme, a.sign)
    total = None if a.forever else a.count
    with cf.ProcessPoolExecutor(a.jobs) as ex:
        for batch_start in itertools.count(0, a.jobs * 2):
            if total is not None and batch_start >= total:
                break
            n = a.jobs * 2 if total is None else min(a.jobs * 2, total - batch_start)
            jobs = [(ln, seed, a.preview) for ln, seed in itertools.islice(q, n)]
            for (ln, seed, _), path in zip(jobs, ex.map(one, jobs)):
                st["made"].append({"id": ln["id"], "seed": seed, "file": os.path.relpath(path, render.HERE)})
                print("done", path)
            save_state(st)


if __name__ == "__main__":
    main()
