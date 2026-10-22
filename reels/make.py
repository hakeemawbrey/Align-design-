"""Batch and endless production.

  python3 make.py                      # all 12 signs, seed 0
  python3 make.py --seed 3 leo virgo   # chosen signs, new variant
  python3 make.py --forever            # keep making new variants: next sign, next seed
  python3 make.py --preview            # half-res

Every (sign, seed) pair is a distinct reel: the seed picks 12 images from the
curated pool, shuffles their order and re-rolls the soundtrack's voicing.
Renders run in parallel, one process per core.
"""
import argparse
import concurrent.futures as cf
import itertools
import json
import os

import render

ORDER = ["aries", "taurus", "gemini", "cancer", "leo", "virgo",
         "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"]
STATE = os.path.join(render.HERE, "out", "state.json")


def one(args):
    sign, seed, preview = args
    return render.render(sign, seed, preview)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("signs", nargs="*")
    ap.add_argument("--seed", type=int, default=0)
    ap.add_argument("--preview", action="store_true")
    ap.add_argument("--forever", action="store_true")
    ap.add_argument("--jobs", type=int, default=max(1, (os.cpu_count() or 2) // 2))
    a = ap.parse_args()
    signs = a.signs or [s for s in ORDER if os.path.exists(os.path.join(render.HERE, "picks", f"{s}.json"))]

    if not a.forever:
        with cf.ProcessPoolExecutor(a.jobs) as ex:
            for p in ex.map(one, [(s, a.seed, a.preview) for s in signs]):
                print("done", p)
        return

    # forever: walk the zodiac, bumping the seed each full lap; resumable via state.json
    os.makedirs(os.path.dirname(STATE), exist_ok=True)
    st = json.load(open(STATE)) if os.path.exists(STATE) else {"i": 0}
    for i in itertools.count(st["i"]):
        sign, seed = signs[i % len(signs)], a.seed + 1 + i // len(signs)
        print("done", render.render(sign, seed, a.preview))
        json.dump({"i": i + 1}, open(STATE, "w"))


if __name__ == "__main__":
    main()
