"""Make reels in rotation: across the twelve signs and every format, least-made first.

  python3 make.py                       # the next 12 (one per sign)
  python3 make.py --count 48 --jobs 4   # 48, four at a time
  python3 make.py --sign scorpio --count 6
  python3 make.py --format invite --count 12
  python3 make.py --forever --jobs 4    # never stop: when every script is made, seeds go up
  python3 make.py --music piano         # one music style for the whole batch

Progress is kept in out/state.json, so it picks up where it stopped.
"""
import argparse, concurrent.futures as cf, json, os, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import scripts

STATE = os.path.join(HERE, "out", "state.json")


def queue(sign=None, fmt=None):
    ids = scripts.all_ids()
    if sign:
        ids = [i for i in ids if i.split("-")[0].split("+")[0] == sign]
    if fmt:
        ids = [i for i in ids if scripts.build(i)["format"] == fmt]
    # interleave by sign so a batch covers the zodiac
    by = {}
    for i in ids:
        by.setdefault(i.split("-")[0].split("+")[0], []).append(i)
    for s, lst in by.items():          # within a sign, take turns across formats
        fm = {}
        for i in lst:
            fm.setdefault(scripts.build(i)["format"], []).append(i)
        rot = []
        while any(fm.values()):
            for f in list(fm):
                if fm[f]:
                    rot.append(fm[f].pop(0))
        # offset each sign's rotation so one batch of twelve shows several formats
        o = scripts.ORDER.index(s) % max(1, len(rot))
        by[s] = rot[o:] + rot[:o]
    out = []
    while any(by.values()):
        for s in scripts.ORDER:
            if by.get(s):
                out.append(by[s].pop(0))
    return out


MUSIC = None


def one(sid, seed, style=None):
    extra = ["--music", style] if style else []
    r = subprocess.run([sys.executable, os.path.join(HERE, "render.py"), sid, "--seed", str(seed), *extra],
                       capture_output=True, text=True)
    return sid, seed, r.returncode, (r.stdout.strip() or r.stderr.strip()[-300:])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--count", type=int, default=12)
    ap.add_argument("--jobs", type=int, default=2)
    ap.add_argument("--sign")
    ap.add_argument("--format")
    ap.add_argument("--forever", action="store_true")
    ap.add_argument("--music", help="one music style for the whole batch (default: varied)")
    a = ap.parse_args()
    os.makedirs(os.path.dirname(STATE), exist_ok=True)
    state = json.load(open(STATE)) if os.path.exists(STATE) else {}
    q = queue(a.sign, a.format)
    while True:
        q.sort(key=lambda i: state.get(i, 0))       # stable: keeps the sign interleave among equals
        batch = [(i, state.get(i, 0)) for i in q[:a.count]]
        with cf.ProcessPoolExecutor(a.jobs) as ex:
            import score
            # rotate the music styles through the batch so every style is heard evenly
            off = sum(state.values()) % len(score.ORDER)
            futs = [ex.submit(one, *b, a.music or score.ORDER[(k + off) % len(score.ORDER)]) for k, b in enumerate(batch)]
            for f in cf.as_completed(futs):
                sid, seed, rc, msg = f.result()
                print(("ok " if rc == 0 else "FAIL ") + f"{sid} s{seed}: {msg}", flush=True)
                if rc == 0:
                    state[sid] = seed + 1
                    json.dump(state, open(STATE, "w"), indent=0)
        if not a.forever:
            break


if __name__ == "__main__":
    main()
