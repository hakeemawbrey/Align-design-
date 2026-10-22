"""Copy renders into a folder with human labels, ready to drag into Drive.

  python3 tools/package.py DEST --versions 4     # seeds 0-3 -> "01 Aries — v1.mp4" ... "12 Pisces — v4.mp4"

Each video gets its caption/credits .txt alongside, and DEST/index.csv lists
everything (file, folder, sign, version, dates, element, ruler, caption, hashtags,
a blank Posted column). Import index.csv into Google Sheets to track posting.
Render first: python3 make.py --seed N for each N.
"""
import argparse
import csv
import json
import os
import shutil

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SIGNS = json.load(open(os.path.join(HERE, "signs.json")))
ORDER = ["aries", "taurus", "gemini", "cancer", "leo", "virgo",
         "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("dest")
    ap.add_argument("--versions", type=int, default=4)
    ap.add_argument("--subfolders", action="store_true", help="one folder per sign")
    a = ap.parse_args()
    rows = []
    for n, s in enumerate(ORDER, 1):
        c = SIGNS[s]
        folder = f"{n:02d} {c['name']}"
        for k in range(a.versions):
            src = os.path.join(HERE, "out", f"{s}-s{k}.mp4")
            if not os.path.exists(src):
                print(f"missing {src}; render it with: python3 make.py {s} --seed {k}")
                continue
            name = f"{folder} — v{k + 1}"
            d = os.path.join(a.dest, folder) if a.subfolders else a.dest
            os.makedirs(d, exist_ok=True)
            shutil.copy(src, os.path.join(d, name + ".mp4"))
            txt = open(src[:-4] + ".txt").read()
            open(os.path.join(d, name + ".txt"), "w").write(txt)
            cap, rest = txt.split("\n\n", 1)
            tags = rest.split("\n\nImagery:", 1)[0].strip()
            rows.append([name + ".mp4", folder, c["name"], f"v{k + 1}", c["dates"],
                         c["element"].title(), c["ruler"], cap, tags, ""])
    with open(os.path.join(a.dest, "index.csv"), "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["File", "Folder", "Sign", "Version", "Dates", "Element", "Ruler",
                    "Caption", "Hashtags", "Posted"])
        w.writerows(rows)
    print(f"{len(rows)} reels -> {a.dest}")


if __name__ == "__main__":
    main()
