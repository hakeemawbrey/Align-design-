"""Turn a pool's picks into catalog/pools/<pool>.json.

Picks live in catalog/keep/<pool>.json, written by whoever looked at the contact sheets:
  {"keep": [0, 3, 4, 11], "focus": {"3": [0.5, 0.3]}, "pin": [3], "notes": {"3": "Vermeer, letter at window"}}
Numbers are the tile numbers on cache/<pool>/sheet-*.jpg.

  python3 tools/curate.py            # every pool that has a keep file
  python3 tools/curate.py window     # one
  python3 tools/curate.py --sheet window   # contact sheet of the curated pool (cache/<pool>/kept.jpg)
"""
import json, os, sys
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, HERE)


def curate(pool):
    keep = json.load(open(os.path.join(HERE, "catalog", "keep", pool + ".json")))
    cands = {c["n"]: c for c in json.load(open(os.path.join(HERE, "cache", pool, "candidates.json")))}
    focus, notes, pins = keep.get("focus", {}), keep.get("notes", {}), set(keep.get("pin", []))
    out = []
    for n in keep["keep"]:
        c = dict(cands[n])
        for k in ("hash", "n", "query"):
            c.pop(k, None)
        c["focus"] = focus.get(str(n), [0.5, 0.42])
        if n in pins:
            c["pin"] = True
        if str(n) in notes:
            c["note"] = notes[str(n)]
        out.append(c)
    json.dump({"images": out}, open(os.path.join(HERE, "catalog", "pools", pool + ".json"), "w"), indent=1, ensure_ascii=False)
    print(f"{pool:14s} {len(out)} kept of {len(cands)}")


def sheet(pool):
    from PIL import Image, ImageOps
    items = json.load(open(os.path.join(HERE, "catalog", "pools", pool + ".json")))["images"]
    cols, tw, th = 8, 180, 320
    rows = (len(items) + cols - 1) // cols
    im = Image.new("RGB", (cols * tw, rows * th), (0, 0, 0))
    for i, it in enumerate(items):
        p = os.path.join(HERE, "cache", pool, "cand", it["file"])
        t = ImageOps.fit(Image.open(p).convert("RGB"), (tw - 4, th - 4), centering=tuple(it["focus"]))
        im.paste(t, ((i % cols) * tw + 2, (i // cols) * th + 2))
    p = os.path.join(HERE, "cache", pool, "kept.jpg")
    im.save(p, quality=85)
    print(p)


if __name__ == "__main__":
    args = sys.argv[1:]
    if args and args[0] == "--sheet":
        sheet(args[1]); sys.exit()
    names = args or sorted(f[:-5] for f in os.listdir(os.path.join(HERE, "catalog", "keep")) if f.endswith(".json"))
    for p in names:
        curate(p)
