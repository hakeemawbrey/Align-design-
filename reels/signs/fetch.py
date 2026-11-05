"""Fetch candidate imagery for one image pool and build numbered contact sheets.

  python3 fetch.py moon "moonlight painting" "full moon night lake"
  python3 fetch.py lovers "Paolo and Francesca" --sources commons,aic,met

Writes cache/<pool>/cand/*.jpg, cache/<pool>/candidates.json and
cache/<pool>/sheet-N.jpg (square, numbered tiles, the way the reel crops them).
Re-running adds to what is already there; duplicates are skipped by id and by look.
"""
import argparse
import concurrent.futures as cf
import json
import os
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageOps

import sources

HERE = os.path.dirname(os.path.abspath(__file__))
Image.MAX_IMAGE_PIXELS = 400_000_000
PER = {"commons": 10, "aic": 8, "met": 4, "openverse": 8, "nasa": 6}


def ahash(im):
    g = ImageOps.grayscale(im).resize((12, 12))
    px = list(g.tobytes())
    m = sum(px) / len(px)
    return "".join("1" if p > m else "0" for p in px)


def looks_weak(im):
    """Sketches, faded prints and objects on white don't read in a quarter second."""
    g = np.asarray(ImageOps.grayscale(im).resize((96, 96)), dtype=np.float32) / 255
    border = np.concatenate([g[:6].ravel(), g[-6:].ravel(), g[:, :6].ravel(), g[:, -6:].ravel()])
    if border.mean() > 0.82 and border.std() < 0.06:
        return "object on white"
    if g.mean() > 0.7 and g.std() < 0.17:
        return "faded / sketch"
    if g.std() < 0.08:
        return "flat"
    rgb = np.asarray(im.resize((64, 64)), dtype=np.float32)
    if np.abs(rgb - rgb.mean(2, keepdims=True)).mean() < 4:
        return "greyscale"  # engravings and b/w photos: the look is colour
    return None


def normalize(path, min_short=640, max_long=2400):
    try:
        im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    except Exception:
        return None, "unreadable"
    w, h = im.size
    if min(w, h) < min_short:
        return None, "small"
    if max(w, h) / min(w, h) > 2.2:
        return None, "too long"
    why = looks_weak(im)
    if why:
        return None, why
    s = max_long / max(w, h)
    if s < 1:
        im = im.resize((round(w * s), round(h * s)), Image.LANCZOS)
    im.save(path, "JPEG", quality=90)
    return im, None


def contact_sheets(pool_dir, cands, per=48, cols=8, tw=240):
    font = ImageFont.truetype("DejaVuSans-Bold.ttf", 22)
    sheets = []
    for s in range(0, len(cands), per):
        chunk = cands[s:s + per]
        rows = (len(chunk) + cols - 1) // cols
        sheet = Image.new("RGB", (cols * tw, rows * tw), (20, 20, 20))
        for i, c in enumerate(chunk):
            im = ImageOps.fit(Image.open(os.path.join(pool_dir, "cand", c["file"])), (tw - 6, tw - 6), Image.LANCZOS)
            x, y = (i % cols) * tw + 3, (i // cols) * tw + 3
            sheet.paste(im, (x, y))
            d = ImageDraw.Draw(sheet)
            d.rectangle([x, y, x + 58, y + 28], fill=(0, 0, 0))
            d.text((x + 4, y + 2), str(c["n"]), fill=(255, 220, 80), font=font)
        p = os.path.join(pool_dir, f"sheet-{s // per + 1}.jpg")
        sheet.save(p, quality=85)
        sheets.append(p)
    return sheets


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pool")
    ap.add_argument("queries", nargs="+")
    ap.add_argument("--sources", default="commons,aic,met",
                    help="comma list; openverse is capped at 200 searches a day for the machine")
    ap.add_argument("-n", type=int, help="results per query per source")
    a = ap.parse_args()
    pool_dir = os.path.join(HERE, "cache", a.pool)
    os.makedirs(os.path.join(pool_dir, "cand"), exist_ok=True)
    cpath = os.path.join(pool_dir, "candidates.json")
    old = json.load(open(cpath)) if os.path.exists(cpath) else []
    seen = {c["id"] for c in old}
    hashes = {c["hash"] for c in old}

    found = []
    for q in a.queries:
        for src in a.sources.split(","):
            try:
                res = sources.SOURCES[src](q, a.n or PER[src])
            except Exception as e:
                print(f"  ! {src} {q!r}: {e}", file=sys.stderr)
                continue
            for r in res:
                r["query"] = q
            found += [r for r in res if r["id"] not in seen]
            print(f"  {src:9s} {q!r}: {len(res)}")
    uniq = list({c["id"]: c for c in found}.values())

    def grab(c):
        fn = c["id"].replace("/", "_")[:80] + ".jpg"
        p = os.path.join(pool_dir, "cand", fn)
        if not sources.download(c, p):
            return None
        im, why = normalize(p)
        if im is None:
            os.remove(p)
            return None
        c["file"], c["w"], c["h"], c["hash"] = fn, im.size[0], im.size[1], ahash(im)
        return c

    print(f"[{a.pool}] downloading {len(uniq)}")
    new = []
    with cf.ThreadPoolExecutor(6) as ex:
        for c in ex.map(grab, uniq):
            if c and c["hash"] not in hashes:
                hashes.add(c["hash"])
                new.append(c)
    cands = old + new
    for i, c in enumerate(cands):
        c["n"] = i
    json.dump(cands, open(cpath, "w"), indent=1)
    sheets = contact_sheets(pool_dir, cands)
    print(f"[{a.pool}] +{len(new)} new, {len(cands)} candidates; sheets: {', '.join(sheets)}")


if __name__ == "__main__":
    main()
