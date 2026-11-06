"""A posting schedule for the rendered reels, with long search-friendly captions.

  python3 tools/schedule.py --start 2026-11-07 --per-day 30 --out out/schedule.csv

Order: round 1 posts every line once, round 2 every line's second version, and so
on, so the same line never comes back within about a week. Inside a round the
themes take turns (love, soul, align, sky, a sign), signs rotate through the
zodiac. Then the list is cut into days of --per-day posts at evenly spaced times.

Captions come from seo/*.json: hook + body + closer + CC credits + hashtags, with
each version of a line taking a different hook, body and closer.
"""
import argparse, csv, datetime as dt, glob, json, os, re

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
THEMES = ["love", "soul", "align", "sky", "sign"]
SIGNS = ["aries", "taurus", "gemini", "cancer", "leo", "virgo",
         "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"]
FOLDER = {"love": "Themes/Love", "soul": "Themes/Soul", "align": "Themes/Alignment", "sky": "Themes/Sky"}


def credits_line(txt_path):
    """The CC BY / BY-SA credit line from a reel's sidecar (licences require it)."""
    for para in open(txt_path).read().split("\n\n"):
        if para.startswith("Image credits:"):
            return para.strip()
    return ""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--start", required=True, help="first posting day, YYYY-MM-DD")
    ap.add_argument("--per-day", type=int, default=30)
    ap.add_argument("--first", default="07:00", help="first post time, local")
    ap.add_argument("--last", default="23:00", help="last post time, local")
    ap.add_argument("--out", default=os.path.join(HERE, "out", "schedule.csv"))
    ap.add_argument("--themes", default=",".join(THEMES), help="comma list of themes to include, e.g. sign")
    a = ap.parse_args()

    lines = json.load(open(os.path.join(HERE, "lines.json")))["lines"]
    seo = {}
    for f in glob.glob(os.path.join(HERE, "seo", "*.json")):
        for s in json.load(open(f))["lines"]:
            seo[s["id"]] = s
    reels = {}
    for f in glob.glob(os.path.join(HERE, "out", "*.mp4")):
        name = os.path.basename(f)[:-4]
        m = re.match(r"(.+)-s(\d+)(-beta)?$", name)
        if m:
            reels.setdefault(m[1], []).append((int(m[2]), name))
    for v in reels.values():
        v.sort()

    keep = set(a.themes.split(","))
    by_theme = {t: [l for l in lines if l["theme"] == t and l["id"] in reels and t in keep] for t in THEMES[:4]}
    signs = {s: [l for l in lines if l.get("sign") == s and l["id"] in reels and "sign" in keep] for s in SIGNS}
    order = []
    for rnd in range(max(len(v) for v in reels.values())):
        queues = {t: [l for l in by_theme[t] if len(reels[l["id"]]) > rnd] for t in by_theme}
        sq = {s: [l for l in signs[s] if len(reels[l["id"]]) > rnd] for s in SIGNS}
        si = 0
        while any(queues.values()) or any(sq.values()):
            for t in THEMES:
                if t == "sign":
                    for _ in range(12):  # next sign that still has a line this round
                        s = SIGNS[si % 12]
                        si += 1
                        if sq[s]:
                            order.append((sq[s].pop(0), rnd))
                            break
                elif queues[t]:
                    order.append((queues[t].pop(0), rnd))

    h0, m0 = map(int, a.first.split(":"))
    h1, m1 = map(int, a.last.split(":"))
    span = (h1 * 60 + m1) - (h0 * 60 + m0)
    step = span / max(a.per_day - 1, 1)
    start = dt.date.fromisoformat(a.start)
    missing = set()
    with open(a.out, "w", newline="") as fh:
        w = csv.writer(fh)
        w.writerow(["#", "day", "date", "time", "video file", "drive folder", "on-screen line",
                    "caption", "keywords", "posted"])
        for i, (ln, rnd) in enumerate(order):
            day, slot = divmod(i, a.per_day)
            mins = h0 * 60 + m0 + round(slot * step)
            seed, name = reels[ln["id"]][rnd]
            folder = FOLDER.get(ln["theme"]) or "Signs/" + ln["sign"].title()
            s = seo.get(ln["id"])
            if s:
                k = rnd
                parts = [s["hooks"][k % len(s["hooks"])], s["bodies"][k % len(s["bodies"])],
                         s["closers"][k % len(s["closers"])]]
                cred = credits_line(os.path.join(HERE, "out", name + ".txt"))
                if cred:
                    parts.append(cred)
                parts.append(" ".join("#" + t.lstrip("#") for t in s["hashtags"][:5]))
                caption, kw = "\n\n".join(parts), ", ".join(s["keywords"])
            else:
                missing.add(ln["id"])
                caption, kw = open(os.path.join(HERE, "out", name + ".txt")).read().split("\n\n\n-----")[0], ""
            w.writerow([i + 1, day + 1, (start + dt.timedelta(days=day)).isoformat(),
                        f"{mins // 60:02d}:{mins % 60:02d}", name + ".mp4", folder, ln["text"], caption, kw, ""])
    print(f"{len(order)} posts over {day + 1} days -> {a.out}" + (f"; {len(missing)} lines without SEO captions" if missing else ""))


if __name__ == "__main__":
    main()
