"""Builds the artwork backgrounds for art-mode posts from the visions image pools.

  python3 tools/build_art.py            # needs art/raw/<id>.jpg (downloaded from visions/pool/*.json urls)

Writes art/img/<n>.jpg (1080x1440, cropped to 3:4 on each image's focus point) and art/art.json with
title, creator, licence and whether the caption must credit it (CC BY / BY-SA). Public domain first,
then CC-licensed, up to 400.
"""
import json, os, sys
from PIL import Image

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ART = os.path.join(HERE, "art")
W, H, LIMIT = 1080, 1440, 400
Image.MAX_IMAGE_PIXELS = None


def needs_credit(lic):
    l = lic.lower()
    return not ("public domain" in l or "cc0" in l or l.strip() in ("pd", "pdm"))


def crop(im, focus):
    fx, fy = focus or (0.5, 0.5)
    w, h = im.size
    if w / h > W / H:
        nw = int(h * W / H); x = min(max(int(fx * w - nw / 2), 0), w - nw)
        im = im.crop((x, 0, x + nw, h))
    else:
        nh = int(w * H / W); y = min(max(int(fy * h - nh / 2), 0), h - nh)
        im = im.crop((0, y, w, y + nh))
    return im.resize((W, H), Image.LANCZOS)


def main():
    items = json.load(open(os.path.join(ART, "items.json")))
    have = [i for i in items if os.path.exists(os.path.join(ART, "raw", i["id"] + ".jpg"))]
    have.sort(key=lambda i: (needs_credit(i["license"]), i["pool"], i["id"]))
    have = have[:LIMIT]
    os.makedirs(os.path.join(ART, "img"), exist_ok=True)
    out = []
    for n, it in enumerate(have):
        dst = os.path.join(ART, "img", f"{n:03d}.jpg")
        im = Image.open(os.path.join(ART, "raw", it["id"] + ".jpg")).convert("RGB")
        if im.size[0] < 500 or im.size[1] < 500:
            continue
        crop(im, it.get("focus")).save(dst, quality=82, optimize=True, progressive=True)
        out.append({"n": n, "file": f"img/{n:03d}.jpg", "id": it["id"], "pool": it["pool"],
                    "title": it.get("title", ""), "creator": it.get("creator", ""), "license": it["license"],
                    "landing": it.get("landing", ""), "credit": needs_credit(it["license"])})
    json.dump(out, open(os.path.join(ART, "art.json"), "w"), indent=1, ensure_ascii=False)
    print(len(out), "images,", sum(o["credit"] for o in out), "need a credit line")


if __name__ == "__main__":
    main()
