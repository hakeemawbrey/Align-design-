"""Render one Align Signs reel: text cards spoken straight to a zodiac sign, over
public-domain paintings from the catalogue, with a soft generated score.

  python3 render.py scorpio-dear-2                # out/scorpio-dear-2-s0.mp4 + .txt (caption, tags, credits)
  python3 render.py scorpio-dear-2 --seed 4       # same words, new pictures and music
  python3 render.py scorpio-dear-2 --stills       # a contact sheet of the cards, no video (fast)
  python3 render.py --sign leo --text "Leo, this is your sign." "Rest." "You did enough."

The look: square 1080x1080. Each card is a still; cards change with a hard cut, no
transitions or motion. A reel keeps one look (layout, type pairing, colour grade, palette:
see looks.py) and a batch rotates through them. Pictures come from catalog.Allocator, which
spreads the whole catalogue across a batch. A quiet "come align · join the beta" signs off
every card, and the last card is a call to action: send it, invite them, or come align.
"""
import argparse
import json
import math
import os
import subprocess
import tempfile
import zlib

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

import catalog
import looks
import music
import score
import scripts

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.join(HERE, "assets", "fonts")
Image.MAX_IMAGE_PIXELS = 400_000_000

W, H, FPS = 1080, 1080, 30
CREAM = (246, 238, 222)
GOLD = (233, 205, 150)


# ---------------------------------------------------------------- timing

def card_len(c):
    n = len(c["text"].split())
    if c["kind"] == "hook":
        return max(2.4, 1.2 + 0.30 * n)
    if c["kind"] == "cta":
        return 3.2
    return max(2.2, 1.0 + 0.30 * n)


# ---------------------------------------------------------------- render

def plan(script, seed, plan_file=None):
    """Pictures and look for one reel: from a batch plan (make.py) when there is one,
    otherwise from the allocator and the look picker directly."""
    cards = script["cards"]
    lens = [card_len(c) for c in cards]
    if plan_file and os.path.exists(plan_file):
        pl = json.load(open(plan_file))
        idx = catalog.by_id()
        return cards, lens, [idx[i] for i in pl["images"]], looks.pick(seed, script["id"], pl.get("layout"))
    rng = np.random.default_rng([seed, zlib.crc32(script["id"].encode())])
    A = catalog.Allocator()
    items = A.choose(script, len(cards), rng)
    A.save()
    return cards, lens, items, looks.pick(seed, script["id"])


def render(script, seed=0, out=None, stills=False, silent=False, style=None, plan_file=None, layout=None):
    style = style or script.get("music") or score.pick(seed, script["id"])
    cards, lens, items, look = plan(script, seed, plan_file)
    if layout:
        look = looks.pick(seed, script["id"], layout)
    out = out or os.path.join(HERE, "out", f"{script['id']}-s{seed}")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    rng = np.random.default_rng(look["seed"])
    starts = np.concatenate([[0], np.cumsum(lens)[:-1]])
    total = float(sum(lens))
    nfr = int(round(total * FPS))

    def still(i):
        """Card i as one frame in the reel's look. No motion, no fades."""
        im = Image.open(catalog.local_file(items[i % len(items)]))
        im = ImageOps.exif_transpose(im).convert("RGB")
        it = items[i % len(items)]
        im.info["focus"], im.info["zoom"] = tuple(it.get("focus", (0.5, 0.42))), it.get("zoom", 1.0)
        return np.asarray(looks.compose(look, im, cards[i], rng))
    frames = [still(i) for i in range(len(cards))]
    cuts = [int(round(st * FPS)) for st in starts]

    def frame(fi):
        i = max(0, int(np.searchsorted(cuts, fi, side="right") - 1))
        return frames[min(i, len(cards) - 1)]

    if stills:
        ims = [Image.fromarray(f).resize((360, 360), Image.LANCZOS) for f in frames]
        sheet = Image.new("RGB", (360 * len(ims) + 10 * (len(ims) - 1), 360), (0, 0, 0))
        for k, im in enumerate(ims):
            sheet.paste(im, (k * 370, 0))
        sheet.save(out + ".sheet.jpg", quality=88)
        return out + ".sheet.jpg"

    with tempfile.TemporaryDirectory() as td:
        wav = os.path.join(td, "m.wav")
        if not silent:
            x = score.compose(style, total + 0.5, seed=seed, salt=script["id"])
            n = int(total * music.SR)
            x = x[:, :n]
            fi, fo = int(0.6 * music.SR), int(1.4 * music.SR)
            x[:, :fi] *= np.linspace(0, 1, fi)
            x[:, -fo:] *= np.linspace(1, 0, fo)
            music.write_wav(wav, x)
            wav = music.master(wav)
        cmd = ["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
               "-r", str(FPS), "-i", "-"]
        cmd += [] if silent else ["-i", wav]
        cmd += ["-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p", "-movflags", "+faststart"]
        cmd += [] if silent else ["-c:a", "aac", "-b:a", "192k", "-shortest"]
        cmd += [out + ".mp4"]
        p = subprocess.Popen(cmd, stdin=subprocess.PIPE)
        for f in range(nfr):
            p.stdin.write(frame(f).tobytes())
        p.stdin.close()
        p.wait()
        Image.fromarray(frames[0]).save(out + ".cover.jpg", quality=90)
    write_caption(out + ".txt", script, items)
    json.dump({"id": script["id"], "seed": seed, "title": script["title"], "sign": script["sign"],
               "format": script["format"], "seconds": round(total, 1), "music": None if silent else style,
               "look": {k: look[k] for k in ("layout", "type", "grade")},
               "images": [it["id"] for it in items]}, open(out + ".json", "w"), indent=1)
    return out + ".mp4"


def write_caption(path, s, items):
    tags = " ".join("#" + t for t in s["hashtags"][:5])
    lines = [s["caption"], "", tags, "", "Art: " + "; ".join(catalog.credit(it) for it in items if catalog.needs_credit(it))]
    if lines[-1] == "Art: ":
        lines[-1] = "Art: public-domain paintings (no credit required)."
    lines += ["", "----- NOT FOR POSTING: image sources -----"]
    lines += [f"{it['id']}  {it.get('title', '')[:80]} · {it.get('creator', '')[:60]} · {it.get('license')} · {it.get('landing')}"
              for it in items]
    open(path, "w").write("\n".join(lines) + "\n")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("id", nargs="?")
    ap.add_argument("--seed", type=int, default=0)
    ap.add_argument("--stills", action="store_true")
    ap.add_argument("--silent", action="store_true")
    ap.add_argument("--music", choices=score.ORDER, help="music style (default: picked per reel and seed)")
    ap.add_argument("--layout", choices=looks.LAYOUTS, help="layout (default: picked per reel and seed)")
    ap.add_argument("--plan", help="batch plan file from make.py (pictures and layout)")
    ap.add_argument("--sign")
    ap.add_argument("--text", nargs="+", help="custom cards: the first is the hook, the rest the body")
    a = ap.parse_args()
    if a.text:
        sign = a.sign or "scorpio"
        S = scripts.SIGNS[sign]["name"]
        s = {"id": f"{sign}-custom-{zlib.crc32(' '.join(a.text).encode()) % 10000}", "sign": sign, "format": "custom",
             "title": a.text[0], "moods": scripts.SIGNS[sign]["moods"] + ["moon"], "hashtags": ["zodiac", "astrology", "align", S.lower()],
             "caption": f"{a.text[0]}\n\nGet your full chart free in the Align app, link in bio.",
             "cards": [{"text": a.text[0], "kind": "hook"}] + [{"text": t, "kind": "body"} for t in a.text[1:]] +
                      [{"text": f"send this to your {S}", "kind": "cta", "sub": "find who you align with · link in bio"}]}
    else:
        s = scripts.build(a.id)
    print(render(s, a.seed, stills=a.stills, silent=a.silent, style=a.music, plan_file=a.plan, layout=a.layout))


if __name__ == "__main__":
    main()
