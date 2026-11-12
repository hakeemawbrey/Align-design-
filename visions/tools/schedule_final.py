"""The zodiac-first schedule: new zodiac reels in sign rotation, with relationship
reels mixed in, then the remaining general reels.

  python3 tools/schedule_final.py --start 2026-11-14 --per-day 30 --mix 250 \\
      --out "out/handoff/zodiac.advice444 schedule - zodiac first.csv"

- Zodiac stream: every reel named <sign>-x-... (the zodiac versions), seed 0 first,
  then the second versions; signs take turns (Aries, Taurus, ...).
- Mixed in: --mix general reels, love lines first, then soul lines whose moods include
  lovers, then other soul lines; about one general reel per four zodiac reels.
- Tail: every other general reel not yet used (skip with --no-tail).
Reels already in the signs-first schedule (the original sign lines) are left out.
"""
import argparse, csv, datetime as dt, glob, json, os, re, sys

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, HERE)
import render  # noqa: E402
from tools.schedule import credits_line, SIGNS, FOLDER  # noqa: E402


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--start", required=True)
    ap.add_argument("--per-day", type=int, default=30)
    ap.add_argument("--mix", type=int, default=250)
    ap.add_argument("--no-tail", action="store_true")
    ap.add_argument("--first", default="07:00")
    ap.add_argument("--last", default="23:00")
    ap.add_argument("--out", required=True)
    a = ap.parse_args()

    lines = {l["id"]: l for l in render.load_lines()["lines"]}
    seo = {}
    for f in glob.glob(os.path.join(HERE, "seo", "*.json")):
        for s in json.load(open(f))["lines"]:
            seo[s["id"]] = s
    reels = []
    for f in glob.glob(os.path.join(HERE, "out", "*.mp4")):
        name = os.path.basename(f)[:-4]
        m = re.match(r"(.+)-s(\d+)(-beta)?$", name)
        if m and m[1] in lines and os.path.exists(f[:-4] + ".txt"):
            reels.append((m[1], int(m[2]), name))

    # zodiac stream: seed order, then sign rotation
    def topic_rotation(rs):
        """Within a sign: first versions first, and the source topics (love, soul,
        align, sky) take turns, so a sign never runs one topic for days."""
        out = []
        for seed in sorted({r[1] for r in rs}):
            by = {}
            for r in sorted(r for r in rs if r[1] == seed):
                by.setdefault(lines[r[0]].get("source", "").split("-")[0], []).append(r)
            while any(by.values()):
                for t in ("love", "soul", "align", "sky"):
                    if by.get(t):
                        out.append(by[t].pop(0))
        return out
    z = {s: topic_rotation([r for r in reels if "-x-" in r[0] and lines[r[0]]["sign"] == s]) for s in SIGNS}
    zodiac = []
    while any(z.values()):
        for s in SIGNS:
            if z[s]:
                zodiac.append(z[s].pop(0))

    general = [r for r in reels if lines[r[0]]["theme"] in ("love", "soul", "align", "sky")]
    general.sort(key=lambda r: (r[1], r[0]))   # first versions first, spreads repeats

    def rank(r):
        l = lines[r[0]]
        if l["theme"] == "love":
            return 0
        if l["theme"] == "soul" and "lovers" in l.get("moods", []):
            return 1
        return 2 if l["theme"] == "soul" else 3
    pool = sorted(general, key=rank)
    mix, rest = pool[:a.mix], pool[a.mix:]
    mix.sort(key=lambda r: (r[1], r[0]))

    order, gi, acc = [], 0, 0.0
    ratio = len(mix) / max(len(zodiac), 1)   # general reels per zodiac reel, spread evenly
    for r in zodiac:
        order.append(r)
        acc += ratio
        if acc >= 1 and gi < len(mix):
            order.append(mix[gi])
            gi += 1
            acc -= 1
    order += mix[gi:]
    if not a.no_tail:
        order += rest

    h0, m0 = map(int, a.first.split(":"))
    h1, m1 = map(int, a.last.split(":"))
    stepm = ((h1 * 60 + m1) - (h0 * 60 + m0)) / max(a.per_day - 1, 1)
    start = dt.date.fromisoformat(a.start)
    with open(a.out, "w", newline="") as fh:
        w = csv.writer(fh)
        w.writerow(["#", "day", "date", "time", "video file", "drive folder", "on-screen line",
                    "caption", "keywords", "posted"])
        for i, (lid, seed, name) in enumerate(order):
            day, slot = divmod(i, a.per_day)
            mins = h0 * 60 + m0 + round(slot * stepm)
            l = lines[lid]
            folder = FOLDER.get(l["theme"]) or "Signs/" + l["sign"].title()
            s = seo[lid]
            parts = [s["hooks"][seed % len(s["hooks"])], s["bodies"][seed % len(s["bodies"])],
                     s["closers"][seed % len(s["closers"])]]
            cred = credits_line(os.path.join(HERE, "out", name + ".txt"))
            if cred:
                parts.append(cred)
            parts.append(" ".join("#" + t.lstrip("#") for t in s["hashtags"][:5]))
            w.writerow([i + 1, day + 1, (start + dt.timedelta(days=day)).isoformat(),
                        f"{mins // 60:02d}:{mins % 60:02d}", name + ".mp4", folder, l["text"],
                        "\n\n".join(parts), ", ".join(s["keywords"]), ""])
    n_z = len(zodiac)
    print(f"{len(order)} posts over {day + 1} days ({n_z} zodiac, {min(a.mix, len(mix))} mixed in, "
          f"{0 if a.no_tail else len(rest)} tail) -> {a.out}")


if __name__ == "__main__":
    main()
