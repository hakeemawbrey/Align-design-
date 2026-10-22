"""Fetch candidate imagery for a sign and build numbered contact sheets for curation.

  python3 fetch.py aries            # motifs from signs.json
  python3 fetch.py aries --extra "ram skull" "red nebula"

Writes cache/<sign>/cand/*.jpg, cache/<sign>/candidates.json and
cache/<sign>/sheet-N.jpg (numbered tiles, for picking by eye or by an agent).
Plate candidates (Urania's Mirror) land in cache/<sign>/plate/.
"""
import argparse
import concurrent.futures as cf
import json
import os
import sys

from PIL import Image, ImageDraw, ImageFont, ImageOps

import sources

HERE = os.path.dirname(os.path.abspath(__file__))
SIGNS = json.load(open(os.path.join(HERE, "signs.json")))
Image.MAX_IMAGE_PIXELS = 400_000_000


def ahash(im):
    g = ImageOps.grayscale(im).resize((12, 12))
    px = list(g.tobytes())
    m = sum(px) / len(px)
    return "".join("1" if p > m else "0" for p in px)


def looks_weak(im):
    """Sketches, faded prints and objects shot on white don't read at 0.6s a cut."""
    import numpy as np
    g = np.asarray(ImageOps.grayscale(im).resize((96, 96)), dtype=np.float32) / 255
    border = np.concatenate([g[:6].ravel(), g[-6:].ravel(), g[:, :6].ravel(), g[:, -6:].ravel()])
    if border.mean() > 0.82 and border.std() < 0.06:
        return "object on white"
    if g.mean() > 0.7 and g.std() < 0.17:
        return "faded / sketch"
    if g.std() < 0.08:
        return "flat"
    return None


def normalize(path, min_short=700, max_long=2600, gate=True):
    try:
        im = Image.open(path)
        im = ImageOps.exif_transpose(im).convert("RGB")
    except Exception:
        return None
    w, h = im.size
    if min(w, h) < min_short or max(w, h) / min(w, h) > 2.4:
        return None
    if gate and looks_weak(im):
        return None
    s = max_long / max(w, h)
    if s < 1:
        im = im.resize((round(w * s), round(h * s)), Image.LANCZOS)
    im.save(path, "JPEG", quality=90)
    return im


def search_all(sign, extra, only_extra=False, srcs=("aic", "met", "openverse")):
    cfg = SIGNS[sign]
    per = {"aic": 6, "met": 3, "openverse": 8, "nasa": 8}
    jobs = []
    for m in ([] if only_extra else cfg["motifs"]) + extra:
        jobs += [(s, m, per[s]) for s in srcs]
    if not only_extra:
        ruler = cfg["ruler"].replace("the ", "")
        jobs += [("nasa", ruler, 8), ("nasa", f"{cfg['name']} constellation", 6), ("nasa", "nebula", 6)]
    found = []
    for src, q, n in jobs:
        try:
            res = sources.SOURCES[src](q, n)
        except Exception as e:
            print(f"  ! {src} '{q}': {e}", file=sys.stderr)
            continue
        for r in res:
            r["query"] = q
        found += res
        print(f"  {src:9s} {q!r}: {len(res)}")
    return found


def contact_sheets(sign_dir, cands, per=48, cols=8, tw=220, th=330):
    font = ImageFont.truetype("DejaVuSans-Bold.ttf", 22)
    sheets = []
    for s in range(0, len(cands), per):
        chunk = cands[s:s + per]
        rows = (len(chunk) + cols - 1) // cols
        sheet = Image.new("RGB", (cols * tw, rows * th), (20, 20, 20))
        for i, c in enumerate(chunk):
            im = Image.open(os.path.join(sign_dir, "cand", c["file"]))
            im = ImageOps.fit(im, (tw - 6, th - 6), Image.LANCZOS)
            x, y = (i % cols) * tw + 3, (i // cols) * th + 3
            sheet.paste(im, (x, y))
            d = ImageDraw.Draw(sheet)
            d.rectangle([x, y, x + 52, y + 28], fill=(0, 0, 0))
            d.text((x + 4, y + 2), str(c["n"]), fill=(255, 220, 80), font=font)
        p = os.path.join(sign_dir, f"sheet-{s // per + 1}.jpg")
        sheet.save(p, quality=85)
        sheets.append(p)
    return sheets


def fetch_plates(sign, sign_dir):
    os.makedirs(os.path.join(sign_dir, "plate"), exist_ok=True)
    res = sources.openverse(SIGNS[sign]["plate"], 10)
    keep = []
    for i, c in enumerate(res):
        p = os.path.join(sign_dir, "plate", f"{i}.jpg")
        if sources.download(c, p) and normalize(p, min_short=500, max_long=3000, gate=False):
            c["file"] = f"{i}.jpg"
            keep.append(c)
    json.dump(keep, open(os.path.join(sign_dir, "plate", "plates.json"), "w"), indent=1)
    print(f"  plates: {len(keep)}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("sign")
    ap.add_argument("--extra", nargs="*", default=[])
    ap.add_argument("--no-plate", action="store_true")
    ap.add_argument("--only-extra", action="store_true", help="search just the --extra queries")
    ap.add_argument("--sources", default="aic,met,openverse",
                    help="comma list for motif queries; openverse is capped at 200 searches/day, "
                         "aic/met/nasa are not")
    a = ap.parse_args()
    sign_dir = os.path.join(HERE, "cache", a.sign)
    os.makedirs(os.path.join(sign_dir, "cand"), exist_ok=True)
    cpath = os.path.join(sign_dir, "candidates.json")
    old = json.load(open(cpath)) if os.path.exists(cpath) else []
    seen = {c["id"] for c in old}
    hashes = {c["hash"] for c in old}

    print(f"[{a.sign}] searching")
    found = [c for c in search_all(a.sign, a.extra, a.only_extra, a.sources.split(","))
             if c["id"] not in seen]
    uniq = {c["id"]: c for c in found}.values()

    def grab(c):
        fn = c["id"].replace("/", "_")[:80] + ".jpg"
        p = os.path.join(sign_dir, "cand", fn)
        if not sources.download(c, p):
            return None
        im = normalize(p)
        if im is None:
            os.remove(p)
            return None
        c["file"], c["w"], c["h"], c["hash"] = fn, im.size[0], im.size[1], ahash(im)
        return c

    print(f"[{a.sign}] downloading {len(uniq)}")
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
    sheets = contact_sheets(sign_dir, cands)
    if not a.no_plate and not os.path.exists(os.path.join(sign_dir, "plate", "plates.json")):
        fetch_plates(a.sign, sign_dir)
    print(f"[{a.sign}] {len(cands)} candidates, sheets: {', '.join(sheets)}")


if __name__ == "__main__":
    main()
