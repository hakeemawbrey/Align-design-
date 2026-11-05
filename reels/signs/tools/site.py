"""Build the Align Signs page: sample reels + the whole image catalogue.

  python3 tools/site.py                  # out/site/ (index.html, reels/*.mp4, sprites/*.jpg)
  python3 tools/site.py --reels 24       # newest 24 reels (default: all in out/)

Thumbnails are packed one sprite per pool so the page stays a few dozen files.
"""
import argparse, glob, html, json, os, subprocess, sys

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, HERE)
from PIL import Image, ImageOps
import catalog, scripts

OUT = os.path.join(HERE, "out", "site")
TW, TH, COLS = 150, 267, 12
LABELS = {"portrait-her": "portraits (her)", "portrait-him": "portraits (him)", "city-night": "city at night"}


def sprites():
    os.makedirs(os.path.join(OUT, "sprites"), exist_ok=True)
    P = catalog.pools()
    signs = scripts.ORDER
    order = [p for p in signs if p in P] + sorted(p for p in P if p not in signs)
    data, seen = [], set()
    for name in order:
        items = [it for it in P[name] if it["id"] not in seen]
        tiles = []
        for it in items:
            try:
                im = ImageOps.exif_transpose(Image.open(catalog.local_file(it))).convert("RGB")
            except Exception:
                continue
            seen.add(it["id"])
            tiles.append((it, ImageOps.fit(im, (TW, TH), Image.LANCZOS, centering=tuple(it.get("focus", (0.5, 0.42))))))
        if not tiles:
            continue
        rows = (len(tiles) + COLS - 1) // COLS
        sheet = Image.new("RGB", (COLS * TW, rows * TH))
        for i, (_, t) in enumerate(tiles):
            sheet.paste(t, ((i % COLS) * TW, (i // COLS) * TH))
        sheet.save(os.path.join(OUT, "sprites", f"{name}.jpg"), quality=78, optimize=True, progressive=True)
        kind = "sign" if name in signs else "mood"
        data.append({"pool": name, "label": LABELS.get(name, name), "kind": kind,
                     "glyph": scripts.SIGNS[name]["glyph"] + "\ufe0e" if kind == "sign" else "",
                     "rows": rows, "items": [{"t": (it.get("title") or "")[:90], "c": (it.get("creator") or "")[:70],
                                              "l": it.get("license") or "", "u": it.get("landing") or "",
                                              "s": it.get("source", "")} for it, _ in tiles]})
        print(f"  {name:14s} {len(tiles)}")
    return data


def reels(limit):
    os.makedirs(os.path.join(OUT, "reels"), exist_ok=True)
    metas = sorted(glob.glob(os.path.join(HERE, "out", "*-s*.json")), key=os.path.getmtime, reverse=True)
    metas = [m for m in metas if os.path.exists(m[:-5] + ".mp4")][: limit or None]
    out = []
    for m in metas:
        j = json.load(open(m))
        base = os.path.basename(m)[:-5]
        web = os.path.join(OUT, "reels", base + ".mp4")
        poster = os.path.join(OUT, "reels", base + ".jpg")
        if not os.path.exists(web):
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", m[:-5] + ".mp4", "-vf", "scale=540:-2", "-c:v", "libx264",
                            "-crf", "27", "-preset", "slow", "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", web], check=True)
            Image.open(m[:-5] + ".cover.jpg").resize((360, 640), Image.LANCZOS).save(poster, quality=80)
        cap = open(m[:-5] + ".txt").read().split("----- NOT FOR POSTING")[0].strip()
        s = scripts.build(j["id"]) if j["format"] != "custom" else None
        out.append({"id": base, "title": j["title"], "sign": j["sign"], "format": j["format"], "sec": j["seconds"],
                    "cards": [c["text"] for c in s["cards"]] if s else [], "caption": cap})
    out.sort(key=lambda r: (scripts.ORDER.index(r["sign"]), r["id"]))
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--reels", type=int, default=0)
    a = ap.parse_args()
    print("sprites")
    cat = sprites()
    print("reels")
    rl = reels(a.reels)
    tpl = open(os.path.join(HERE, "tools", "site.html")).read()
    blob = json.dumps({"catalog": cat, "reels": rl, "tw": TW, "th": TH, "cols": COLS,
                       "signs": {k: {"name": v["name"], "glyph": v["glyph"] + "\ufe0e"} for k, v in scripts.SIGNS.items()},
                       "scripts": len(scripts.all_ids())}, ensure_ascii=False).replace("</", "<\\/")
    open(os.path.join(OUT, "index.html"), "w").write(tpl.replace("/*DATA*/null", blob))
    n = sum(len(p["items"]) for p in cat)
    print(f"{OUT}/index.html: {len(rl)} reels, {n} images in {len(cat)} pools")


if __name__ == "__main__":
    main()
