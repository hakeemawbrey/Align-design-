"""Pixel zodiac reels: plan -> frames -> MP4.

  python3 render.py aries                    # one reel for aries (seed 0)
  python3 render.py aries --seed 7           # same sign, new lines, scene and music
  python3 render.py --all                    # one for every sign (the 12-pack)
  python3 render.py --all --seed 3 --jobs 3
  python3 render.py --forever --jobs 3       # endless: every sign, then seeds go up
  python3 render.py aries --stills           # a contact sheet instead of a video
  python3 render.py aries --scene lake       # force a scene (hill window lake campfire meadow rooftop)

Output lands in reels/pixel/out/<sign>-s<seed>.mp4 with a .txt (caption + hashtags)
and a .cover.png. A reel that already exists is skipped, so --forever resumes.
"""
from __future__ import annotations

import argparse
import json
import os
import random
import subprocess
import sys
import tempfile
import time
from concurrent.futures import ProcessPoolExecutor
from pathlib import Path

import numpy as np
from PIL import Image

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import engine  # noqa: E402
import frame as framestyle  # noqa: E402

STYLES = {"frame": framestyle, "scene": engine}

OUT = HERE / "out"
SIGNS = ["aries", "taurus", "gemini", "cancer", "leo", "virgo",
         "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"]
N_LINES = 3


def load_bank():
    return json.loads((HERE / "bank.json").read_text())


def plan(sign, seed, bank, scene=None, n_lines=N_LINES):
    """Pick the words for one reel. Same (sign, seed) -> same reel, always."""
    b = bank[sign]
    r = random.Random(f"{sign}:{seed}:words")
    hook = r.choice(b["hooks"])
    # walk the advice list in a seeded order so consecutive seeds don't repeat lines
    order = list(range(len(b["advice"])))
    random.Random(f"{sign}:order").shuffle(order)
    per = n_lines
    start = (seed * per) % len(order)
    picks = [b["advice"][order[(start + i) % len(order)]] for i in range(per)]
    closer = r.choice(b["closers"])
    end = r.choice(bank["_end"]["send"]).replace("{sign}", sign)
    cards = [engine.Card("title", hook)]
    cards += [engine.Card("line", s) for s in picks]
    cards += [engine.Card("line", closer), engine.Card("end", end)]
    caption = r.choice(b["captions"])
    tags = " ".join("#" + h for h in b["hashtags"])
    return cards, caption, tags


def sprite_fns():
    try:
        import sprites
        return (lambda s, t: sprites.frame(s, t)), (lambda s: sprites.glyph(s))
    except Exception as e:  # placeholder until sprites.py exists
        print("sprites.py unavailable, using placeholder:", e, file=sys.stderr)
        ph = Image.new("RGBA", (28, 26), (0, 0, 0, 0))
        from PIL import ImageDraw
        d = ImageDraw.Draw(ph)
        d.ellipse((1, 1, 26, 25), fill=(255, 220, 200, 255), outline=(42, 31, 61, 255))
        return (lambda s, t: ph), None


def music(sign, seed, reel):
    try:
        import chip
        return chip.render(sign, seed, reel.duration, cues=reel.cues, ticks=reel.ticks), chip
    except Exception as e:
        print("chip.py unavailable, silent reel:", e, file=sys.stderr)
        return None, None


def build(sign, seed, scene=None, bank=None, style="frame"):
    bank = bank or load_bank()
    cards, caption, tags = plan(sign, seed, bank, scene)
    spr, gly = sprite_fns()
    tag = bank.get("_end", {}).get("tag", "align")
    if style == "frame":
        reel = framestyle.FrameReel(sign, cards, seed=seed, glyph_fn=gly, end_tag=tag)
    else:
        reel = engine.Reel(sign, cards, seed=seed, scene=scene, sprite_fn=spr, glyph_fn=gly, end_tag=tag)
    return reel, caption, tags


def stills(sign, seed, scene=None, style="frame"):
    mod = STYLES[style]
    reel, *_ = build(sign, seed, scene, style=style)
    times = [0.6, 1.8] if style == "scene" else [1.0, 2.2]
    for cd in reel.cards[1:]:
        times.append(cd.type_end + 0.3)
    ims = [Image.fromarray(mod.upscale(reel.frame(t))).resize((540, 960), Image.NEAREST) for t in times]
    sheet = Image.new("RGB", (540 * len(ims) + 10 * (len(ims) - 1), 960), (0, 0, 0))
    for i, im in enumerate(ims):
        sheet.paste(im, (i * 550, 0))
    OUT.mkdir(exist_ok=True, parents=True)
    p = OUT / "stills" / f"{sign}-s{seed}-{style}-{reel.scene.kind}.png"
    p.parent.mkdir(exist_ok=True)
    sheet.save(p)
    return p


def render_one(sign, seed, scene=None, force=False, style="frame", web=True):
    mod = STYLES[style]
    OUT.mkdir(parents=True, exist_ok=True)
    name = f"{sign}-s{seed}" + ("-scene" if style == "scene" else "") + (f"-{scene}" if scene else "")
    mp4 = OUT / f"{name}.mp4"
    if mp4.exists() and not force:
        return f"skip {mp4.name}"
    t0 = time.time()
    reel, caption, tags = build(sign, seed, scene, style=style)
    nframes = int(round(reel.duration * engine.FPS))
    with tempfile.TemporaryDirectory() as td:
        wav = Path(td) / "a.wav"
        audio, chip = music(sign, seed, reel)
        cmd = ["ffmpeg", "-y", "-loglevel", "error",
               "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{mod.W * mod.SCALE}x{mod.H * mod.SCALE}",
               "-r", str(engine.FPS), "-i", "-"]
        if audio is not None:
            chip.write_wav(str(wav), audio)
            cmd += ["-i", str(wav), "-c:a", "aac", "-b:a", "192k", "-shortest"]
        # crisp pixels: no chroma subsampling blur would be ideal, but IG needs yuv420p.
        cmd += ["-c:v", "libx264", "-preset", "medium", "-crf", "16", "-tune", "animation",
                "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(mp4)]
        p = subprocess.Popen(cmd, stdin=subprocess.PIPE)
        cover = None
        for i in range(nframes):
            t = i / engine.FPS
            f = reel.frame(t)
            if cover is None and t >= reel.cards[0].start + 1.0:
                cover = f
            p.stdin.write(mod.upscale(f).tobytes())
        p.stdin.close()
        if p.wait() != 0:
            raise RuntimeError(f"ffmpeg failed for {name}")
    Image.fromarray(mod.upscale(cover)).save(OUT / f"{name}.cover.png")
    lines = [c.text for c in reel.cards]
    (OUT / f"{name}.txt").write_text(f"{caption}\n\n{tags}\n\n---\nscene: {reel.scene.kind}\n" +
                                     "\n".join(lines) + "\n")
    if web:
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(mp4), "-vf", "scale=540:960:flags=neighbor",
                        "-c:v", "libx264", "-crf", "24", "-preset", "fast", "-pix_fmt", "yuv420p",
                        "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart",
                        str(OUT / f"{name}.web.mp4")], check=True)
    return f"made {mp4.name} ({reel.duration:.1f}s, {reel.scene.kind}) in {time.time() - t0:.0f}s"


def _job(args):
    try:
        return render_one(*args)
    except Exception as e:  # keep the batch going
        return f"FAILED {args[:2]}: {e!r}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("signs", nargs="*")
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--seed", type=int, default=0)
    ap.add_argument("--scene", choices=engine.Scene.KINDS)
    ap.add_argument("--stills", action="store_true")
    ap.add_argument("--style", choices=list(STYLES), default="frame",
                    help="frame: the mystic card (default). scene: the little RPG night scene")
    ap.add_argument("--forever", action="store_true", help="every sign at seed N, then N+1, ... until stopped")
    ap.add_argument("--count", type=int, help="with --forever: stop after this many new reels")
    ap.add_argument("--jobs", type=int, default=max(1, (os.cpu_count() or 2) // 2))
    ap.add_argument("--force", action="store_true")
    a = ap.parse_args()

    signs = SIGNS if (a.all or a.forever or not a.signs) else a.signs
    for s in signs:
        if s not in SIGNS:
            sys.exit(f"unknown sign {s}")

    if a.stills:
        for s in signs:
            print(stills(s, a.seed, a.scene, a.style))
        return

    def jobs():
        seed = a.seed
        while True:
            for s in signs:
                yield (s, seed, a.scene, a.force, a.style)
            if not a.forever:
                return
            seed += 1

    made = 0
    with ProcessPoolExecutor(a.jobs) as ex:
        it = jobs()
        pending = set()
        from concurrent.futures import wait, FIRST_COMPLETED
        for _ in range(a.jobs * 2):
            j = next(it, None)
            if j:
                pending.add(ex.submit(_job, j))
        while pending:
            done, pending = wait(pending, return_when=FIRST_COMPLETED)
            for d in done:
                msg = d.result()
                print(msg, flush=True)
                if msg.startswith("made"):
                    made += 1
                if a.count and made >= a.count:
                    for p in pending:
                        p.cancel()
                    return
                j = next(it, None)
                if j:
                    pending.add(ex.submit(_job, j))


if __name__ == "__main__":
    main()
