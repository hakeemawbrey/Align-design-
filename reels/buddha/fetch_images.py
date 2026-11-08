#!/usr/bin/env python3
"""Build a library of public-domain Buddha sculpture photos from The Met's Open Access collection.

    python3 reels/buddha/fetch_images.py            # about 120 images into reels/buddha/library/
    python3 reels/buddha/fetch_images.py --max 300  # more

Only objects The Met marks as public domain (CC0) are downloaded, so they are
free to post. Credits are written to library/credits.json. Already-downloaded
objects are skipped, so it is safe to run again.

With `pip install rembg onnxruntime`, each statue is also cut out of its
museum backdrop (library/cut/*.png) so it can sit in a painted sky. The first
run downloads the cut-out model (about 180 MB). Without rembg a simpler
colour-based cut-out is used when the video is made.
"""
import argparse
from concurrent.futures import ThreadPoolExecutor
import json
import time
import urllib.parse
import urllib.request
from io import BytesIO
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
LIB = HERE / "library"
UA = "AlignBuddha/0.1 (align reels; github.com/hakeemawbrey)"
API = "https://collectionapi.metmuseum.org/public/collection"
QUERIES = ["head of buddha", "buddha head", "seated buddha", "buddha", "bodhisattva", "buddha shakyamuni",
           "amitabha", "guanyin", "standing buddha", "maitreya", "buddha statue"]
KEEP_CLASSES = ("sculpture", "metalwork", "stone", "bronze", "wood", "jade")
SKIP_WORDS = ("stele", "relief", "fragment", "votive", "painting", "scroll", "manuscript", "textile", "seal",
              "coin", "plaque", "mold", "rubbing", "print", "book", "folio", "attend", "birth", "death",
              "parinirvana", "sermon", "scene", "life of", "miracle", "departure", "worship", "temptation",
              "fasting", "assault", "visit", "offering", "panel", "frieze", "shrine", "triad", "with attendants",
              "footprint", "hand of", "foot of", "lamp", "bell", "reliquary", "stupa", "plate", "tile", "banner", "jataka", "story", "legend", "conversion", "great")


def get(url, raw=False, tries=4):
    for i in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60) as r:
                b = r.read()
                return b if raw else json.loads(b)
        except Exception:
            if i == tries - 1:
                raise
            time.sleep(2 * (i + 1))


def cutouts(paths=None):
    """Cut each statue out of its backdrop (needs rembg). Cached in library/cut/."""
    try:
        from rembg import new_session, remove
    except ImportError:
        print("(rembg not installed: skipping cut-outs; pip install rembg onnxruntime for cleaner results)")
        return
    cut = LIB / "cut"
    cut.mkdir(exist_ok=True)
    paths = paths or sorted(LIB.glob("*.jpg")) + sorted((HERE / "images").glob("*"))
    session = None
    for p in paths:
        if p.suffix.lower() not in (".jpg", ".jpeg", ".png", ".webp") or (cut / f"{p.stem}.png").exists():
            continue
        session = session or new_session("isnet-general-use")
        im = Image.open(p).convert("RGB")
        im.thumbnail((1600, 1600))
        remove(im, session=session).save(cut / f"{p.stem}.png")
        print(f"cut out {p.name}", flush=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--max", type=int, default=120)
    a = ap.parse_args()
    LIB.mkdir(exist_ok=True)
    cred_path = LIB / "credits.json"
    credits = json.loads(cred_path.read_text()) if cred_path.exists() else {}
    for k in [k for k, v in credits.items() if any(w in (v["title"] or "").lower() for w in SKIP_WORDS)]:
        for f in (LIB / credits[k]["file"], LIB / "cut" / f"met-{k}.png"):
            f.unlink(missing_ok=True)
        del credits[k]  # filtered out by a newer skip list
    seen, ids = set(), []
    for q in QUERIES:
        d = get(f"{API}/v1.1/search?" + urllib.parse.urlencode({"q": q, "hasImages": "true", "limit": 200}))
        for i in d.get("objectIDs") or []:
            if i not in seen:
                seen.add(i)
                ids.append(i)
    print(f"{len(ids)} candidates")
    todo = [i for i in ids if str(i) not in credits]

    def one(oid):
        try:
            o = get(f"{API}/v1/objects/{oid}")
        except Exception:
            return None
        title = (o.get("title") or "").lower()
        cls = (o.get("classification") or "").lower()
        if not o.get("isPublicDomain") or not o.get("primaryImage"):
            return None
        if not any(k in title for k in ("buddha", "bodhisattva", "guanyin", "maitreya", "amitabha")):
            return None
        if not any(k in cls for k in KEEP_CLASSES) or any(w in title for w in SKIP_WORDS):
            return None
        for url in (o["primaryImage"],):
            try:
                im = Image.open(BytesIO(get(url, raw=True, tries=2))).convert("RGB")
                break
            except Exception:
                im = None
        if im is None or min(im.size) < 600:
            return None
        im.thumbnail((2000, 2000))
        im.save(LIB / f"met-{oid}.jpg", quality=92)
        return str(oid), {"file": f"met-{oid}.jpg", "title": o.get("title"), "date": o.get("objectDate"),
                          "culture": o.get("culture"), "link": o.get("objectURL"),
                          "license": "Public domain (The Met Open Access, CC0)"}

    got = len(credits)
    with ThreadPoolExecutor(6) as ex:
        for start in range(0, len(todo), 24):
            if got >= a.max:
                break
            for res in ex.map(one, todo[start:start + 24]):
                if res and got < a.max:
                    credits[res[0]] = res[1]
                    got += 1
                    print(f"[{got}] {res[1]['title']} ({res[1]['culture'] or res[1]['date']})", flush=True)
            cred_path.write_text(json.dumps(credits, indent=1, ensure_ascii=False))
    cutouts()
    print(f"library: {got} images in {LIB}")


if __name__ == "__main__":
    main()
