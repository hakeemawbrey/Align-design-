"""Graded contact sheets, so curators judge pictures the way the reel shows them.

  python3 tools/sheet.py cand moon            # every candidate in cache/moon, graded, numbered
  python3 tools/sheet.py pool moon            # the curated pool/moon.json, graded, numbered by index
  python3 tools/sheet.py cand moon --raw      # side by side: raw | graded

Writes cache/<pool>/graded-N.jpg (cand) or cache/<pool>/pool-N.jpg (pool).
"""
import argparse
import json
import os
import sys

from PIL import Image, ImageDraw, ImageFont

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import render  # noqa: E402

T = 240


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("kind", choices=["cand", "pool"])
    ap.add_argument("pool")
    ap.add_argument("--raw", action="store_true")
    a = ap.parse_args()
    d = os.path.join(render.HERE, "cache", a.pool)
    os.makedirs(d, exist_ok=True)
    if a.kind == "cand":
        items = json.load(open(os.path.join(d, "candidates.json")))
        for c in items:
            c["file"] = f"cache/{a.pool}/cand/{c['file']}"
        labels = [str(c["n"]) for c in items]
    else:
        items = render.load_pool(a.pool)
        labels = [str(i) + ("*" if c.get("pin") else "") for i, c in enumerate(items)]
    font = ImageFont.truetype("DejaVuSans-Bold.ttf", 22)
    cols, per = (4, 24) if a.raw else (8, 48)
    tw = T * 2 if a.raw else T
    out = []
    for s in range(0, len(items), per):
        chunk = items[s:s + per]
        rows = (len(chunk) + cols - 1) // cols
        sheet = Image.new("RGB", (cols * tw, rows * T), (0, 0, 0))
        for i, c in enumerate(chunk):
            x, y = (i % cols) * tw, (i // cols) * T
            try:
                im = Image.open(render.ensure_file(c))
            except OSError:
                continue
            g = Image.fromarray(render.grade(im, T - 4, c))
            if a.raw:
                sheet.paste(render.fit_square(im, T - 4, tuple(c.get("focus", (0.5, 0.5))), c.get("zoom", 1.0)), (x + 2, y + 2))
                sheet.paste(g, (x + T + 2, y + 2))
            else:
                sheet.paste(g, (x + 2, y + 2))
            dr = ImageDraw.Draw(sheet)
            dr.rectangle([x + 2, y + 2, x + 62, y + 30], fill=(0, 0, 0))
            dr.text((x + 6, y + 4), labels[s + i], fill=(255, 220, 80), font=font)
        p = os.path.join(d, f"{'graded' if a.kind == 'cand' else 'pool'}{'-raw' if a.raw else ''}-{s // per + 1}.jpg")
        sheet.save(p, quality=85)
        out.append(p)
    print("\n".join(out))


if __name__ == "__main__":
    main()
