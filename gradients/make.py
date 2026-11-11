"""Render every post in copy/*.json in parallel (skips ones already made).

  python3 make.py                 # all files
  python3 make.py copy/placements.json --jobs 4
  python3 make.py copy/formats.json --bg art       # artwork backgrounds (art/, see tools/build_art.py)
"""
import concurrent.futures as cf, glob, json, os, sys

import render

BG = sys.argv[sys.argv.index("--bg") + 1] if "--bg" in sys.argv else None


def one(p):
    out = os.path.join(render.HERE, "out", p["id"] + ("-art" if BG == "art" else "") + ".mp4")
    if os.path.exists(out) and os.path.exists(out[:-4] + ".txt"):
        return out
    return render.render(p, out, bg_mode=BG)

if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--") and a not in ("art", "gradient")]
    jobs = int(sys.argv[sys.argv.index("--jobs") + 1]) if "--jobs" in sys.argv else 4
    files = [a for a in args if a.endswith(".json")] or sorted(glob.glob(os.path.join(render.HERE, "copy", "*.json")))
    posts = []
    for f in files:
        try:
            posts += json.load(open(f))["posts"]
        except (OSError, ValueError):
            print("skip (still being written):", f)
    with cf.ProcessPoolExecutor(jobs) as ex:
        for o in ex.map(one, posts):
            print("done", o, flush=True)
