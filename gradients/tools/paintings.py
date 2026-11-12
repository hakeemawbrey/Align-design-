"""200 painting posts for photo Reels: white text over a dimmed painting, saved as 1080x1440 JPEGs.
IG Growth Studio turns each into a 10-second Reel and adds trending audio when it publishes.

  python3 tools/paintings.py            # -> out/paintings/NNN-<id>.jpg, .txt captions, plan.json
"""
import glob, json, os, random, sys, zlib
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import numpy as np
from PIL import Image
import render

HERE = render.HERE
OUT = os.path.join(HERE, "out", "paintings")
SIGNS = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"]


def pick_posts():
    load = lambda f: json.load(open(os.path.join(HERE, "copy", f)))["posts"]
    signs = load("aries_cancer.json") + load("leo_scorpio.json") + load("sag_pisces.json")
    out = []
    for s in SIGNS:   # 10 per sign from the sign scenarios
        out += [p for p in signs if p.get("sign") == s][:10]
    out += load("placements.json")[:32] + load("formats.json")   # + 32 placements + 48 meme formats = 200
    return out


def main():
    os.makedirs(OUT, exist_ok=True)
    posts = pick_posts()
    arts = [a for a in render.art_list() if a.get("painting")]
    rng = random.Random(7)
    pool = arts[:]
    rng.shuffle(pool)
    by_pool = {}
    for a in pool:
        by_pool.setdefault(a["pool"], []).append(a)
    used, plan = set(), []
    for i, p in enumerate(posts):
        sign = p.get("sign") if p.get("sign") in SIGNS else None
        cands = [a for a in by_pool.get(sign, []) if a["n"] not in used] or [a for a in pool if a["n"] not in used]
        art = cands[0]
        used.add(art["n"])
        bg = render.art_background(art)   # dimmed + vignette, at the largest zoom
        frame = np.asarray(bg.resize((render.W, render.H), Image.LANCZOS), np.float32) / 255   # whole painting, no crop
        txt, _ = render.text_layer(p["text"], style=p.get("style") or "clean", seed=zlib.crc32(p["text"].encode()))
        a = txt[..., 3:4]
        img = (np.clip(frame * (1 - a) + txt[..., :3] * a, 0, 1) * 255 + 0.5).astype(np.uint8)
        name = f"{i + 1:03d}-{p['id']}"
        Image.fromarray(img).save(os.path.join(OUT, name + ".jpg"), quality=92)
        tags = " ".join("#" + t.lstrip("#") for t in p.get("hashtags", [])[:5])
        caption = f"{p.get('caption', '').strip()}\n\n{render.art_credit(art)}\n\n{tags}".strip()
        open(os.path.join(OUT, name + ".txt"), "w").write(caption + "\n")
        plan.append({"file": name + ".jpg", "id": p["id"], "sign": p.get("sign"), "art": art["n"], "caption": caption})
        print(name, flush=True)
    json.dump(plan, open(os.path.join(OUT, "plan.json"), "w"), indent=1, ensure_ascii=False)
    print(len(plan), "painting posts")


if __name__ == "__main__":
    main()
