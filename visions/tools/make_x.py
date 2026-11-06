"""Render the zodiac versions in seo/x_*.json: one reel per new line (seed 0), plus
optional second versions (seed 1) for the first N lines of each sign.

  python3 tools/make_x.py --files x_love_b --jobs 4
  python3 tools/make_x.py --second 10        # 10 second versions per sign, across all x files
"""
import argparse, concurrent.futures as cf, glob, json, os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import render  # noqa: E402


def one(job):
    ln, seed = job
    out = os.path.join(render.HERE, "out", f"{ln['id']}-s{seed}.mp4")
    if os.path.exists(out) and os.path.exists(out[:-4] + ".txt"):
        return out  # already made; re-runs are safe
    return render.render(ln, seed)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--files", nargs="*", help="x_ file stems; default all")
    ap.add_argument("--second", type=int, default=0, help="second versions per sign")
    ap.add_argument("--jobs", type=int, default=4)
    a = ap.parse_args()
    lines = {l["id"]: l for l in render.load_lines()["lines"]}
    paths = [os.path.join(render.HERE, "seo", f + ".json") for f in a.files] if a.files else \
        sorted(glob.glob(os.path.join(render.HERE, "seo", "x_*.json")))
    ids = [e["id"] for p in paths for e in json.load(open(p))["lines"]]
    jobs = [(lines[i], 0) for i in ids]
    if a.second:
        per = {}
        for i in ids:
            s = lines[i]["sign"]
            if len(per.setdefault(s, [])) < a.second:
                per[s].append(i)
        jobs = [(lines[i], 1) for v in per.values() for i in v]
    with cf.ProcessPoolExecutor(a.jobs) as ex:
        for p in ex.map(one, jobs):
            print("done", p, flush=True)


if __name__ == "__main__":
    main()
