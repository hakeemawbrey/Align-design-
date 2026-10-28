#!/usr/bin/env python3
"""
Align Gradient Reels — gradient-background text meme reel generator.

Renders 1080x1920 animated-gradient reels with big centered text and a
comealign.com watermark, from the caption banks in captions/*.json.

Usage:
  python3 render.py --mode delu --sign pisces          # one reel
  python3 render.py --mode brainrot --all-signs        # one mode, all 12
  python3 render.py --all                              # every caption in the bank
  python3 render.py --batch 21 --days 7                # week plan w/ post captions
  python3 render.py --text "custom text" --mode delu   # one-off custom text
Flags:
  --music   mux a random track from music/ (default: silent — add trending
            audio in the Instagram app instead, it performs better)
  --cta     show "the zodiac dating app - comealign.com" card in the last 2s
  --out DIR output directory (default: out/)
"""

import argparse
import glob
import json
import math
import os
import random
import shutil
import subprocess
import sys
import tempfile
import textwrap
from datetime import date

ROOT = os.path.dirname(os.path.abspath(__file__))
# prefer ffmpeg on PATH; fall back to the copy bundled with align-engine on
# Hakeem's machine so this still runs out of the box for him
FFMPEG = (shutil.which("ffmpeg")
          or "/Users/expressivespace/claude code/align-engine/bin/ffmpeg")


def first_font(*paths):
    """First font file that exists. Arial Rounded only ships with macOS, so
    anywhere else (a cloud box, Linux) fall back to the bundled Nunito Black,
    the closest open rounded face."""
    for p in paths:
        if p and os.path.isfile(p):
            return p
    return paths[-1]


BUNDLED_FONT = os.path.join(ROOT, "fonts", "Nunito-Black.ttf")
FONT = first_font(os.environ.get("REELS_FONT"),
                  "/System/Library/Fonts/Supplemental/Arial Rounded Bold.ttf",
                  BUNDLED_FONT)
FONT_WM = first_font(os.environ.get("REELS_FONT_WM"),
                     "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
                     "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
                     "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
                     BUNDLED_FONT)

W, H = 1080, 1920
WATERMARK = "comealign.com"
CTA_TEXT = "the zodiac dating app\ncomealign.com"

# mode -> list of simple 2-tone diagonal gradients, IG/FB "gradient
# background" style — always type=linear, never radial/spiral/noisy.
PALETTES = {
    "brainrot":  {"pairs": [["#7b2ff7", "#00e5a0"], ["#4e0eff", "#00c2ff"],
                            ["#7b2ff7", "#ff2fb8"], ["#0f2027", "#00e5a0"]]},
    "delu":      {"pairs": [["#ff5fa2", "#b86bff"], ["#ff8fd6", "#c9a8ff"],
                            ["#ff5fa2", "#ffb3d9"], ["#c9a8ff", "#ff8fd6"]]},
    "nonsense":  {"pairs": [["#ff8a00", "#00b3a4"], ["#ffd900", "#ff5e5e"],
                            ["#00b3a4", "#7ee8fa"], ["#ff8a00", "#ffd900"]]},
    "spiritual": {"pairs": [["#2d1b69", "#f7b32b"], ["#2d1b69", "#7b2ff7"],
                            ["#4b2e83", "#ff9d6c"], ["#0f0c29", "#7b2ff7"]]},
    "dating":    {"pairs": [["#ff2d55", "#8e2de2"], ["#ff7eb3", "#8e2de2"],
                            ["#6a3093", "#ff9a9e"], ["#ff2d55", "#ff9a9e"]]},
    "yapping":   {"pairs": [["#ff6a3d", "#ffd93d"], ["#ff3d7f", "#8b5cf6"],
                            ["#3dd6ff", "#8b5cf6"], ["#ff6a3d", "#ff3d7f"]]},
    "short":     {"pairs": [["#00c2a8", "#0072ff"], ["#ff6a88", "#f9d423"],
                            ["#6a3093", "#0072ff"], ["#00c2a8", "#f9d423"]]},
    "hater":     {"pairs": [["#8b0000", "#1a0000"], ["#6b0f1a", "#2b0b3d"],
                            ["#3a0519", "#8b0000"], ["#1a0000", "#5c0a2e"]]},
    # astros navy/orange, bayou city sunset, gulf teal
    "houston":   {"pairs": [["#002d62", "#eb6e1f"], ["#eb6e1f", "#002d62"],
                            ["#c8102e", "#ff8a00"], ["#006d75", "#ff9e3d"]]},
    "random":    {"pairs": None},
}


# corner-to-corner lines only (matches IG/FB's classic diagonal swatches) —
# leaving x0/y0/x1/y1 at -1 lets the filter place a short random line that
# can render as a soft off-center blob instead of a clean diagonal.
DIAGONALS = [
    (0, 0, W, H), (W, 0, 0, H), (0, H, W, 0), (W, H, 0, 0),
    (0, 0, W, H // 2), (W, 0, 0, H // 2),
]


def pick_palette(mode):
    """Pick a simple two-tone diagonal gradient for this render."""
    conf = PALETTES.get(mode, PALETTES["random"])
    pairs = conf["pairs"]
    if pairs is None:
        pairs = random.choice([c["pairs"] for c in PALETTES.values()
                                if c["pairs"]])
    colors = list(random.choice(pairs))
    line = random.choice(DIAGONALS)
    return colors, 0, 0.02, line

SIGNS = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra",
         "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"]

HASHTAGS_BASE = "#zodiac #astrology #zodiacsigns #zodiacmemes #astrologymemes #horoscope"
HASHTAGS_MODE = {
    "brainrot": "#relatable #memes #fyp",
    "delu": "#delulu #relatable #datingmemes",
    "nonsense": "#memes #funny #relatable",
    "spiritual": "#spiritualawakening #manifestation #astrologypost",
    "dating": "#datingmemes #situationship #relationshipmemes",
    "yapping": "#storytime #relatable #overshare",
    "short": "#relatable #memes #zodiacmemes",
    "hater": "#shade #tea #datingmemes #exmemes",
    "houston": "#houston #htx #houstontx #houstonmemes #htown",
    "random": "#relatable #memes #fyp",
}

IG_CAPTION = {
    "brainrot": "tag a {sign} and say nothing \U0001f480",
    "delu": "the delulu is the solulu ✨ {sign} energy is undefeated",
    "nonsense": "no notes. just {sign} facts.",
    "spiritual": "the universe asked us to pass this along to every {sign} \U0001f52e",
    "dating": "dating a {sign}? drop your survival tips below \U0001f447",
    "yapping": "{sign}s will turn a 2 word update into a whole podcast episode \U0001f3a4",
    "short": "{sign} said what they said",
    "hater": "the tea on dating a {sign} ☕ spill yours below",
    "houston": "tag the houston {sign} who needs to see this \U0001f920",
    "random": "which sign is guilty of this \U0001f440 wrong answers only",
}

FIRST_COMMENT = (
    "we're building align — dating based on your chart, not your camera roll ✨ "
    "waitlist is open → comealign.com"
)


def wrap_text(text):
    """Wrap into balanced lines for a 1080px-wide canvas."""
    n = len(text)
    if n <= 60:
        width = 16
    elif n <= 110:
        width = 20
    else:
        width = 24
    lines = []
    for para in text.split("\n"):
        lines.extend(textwrap.wrap(para, width=width) or [""])
    return lines


def font_size(lines):
    maxlen = max(len(l) for l in lines)
    fs_w = (W * 0.86) / (maxlen * 0.58)
    fs_h = (H * 0.55) / (len(lines) * 1.4)
    return int(max(44, min(fs_w, fs_h, 104)))


def duration_for(text):
    words = len(text.split())
    return round(min(11.0, max(6.0, 3.5 + 0.34 * words)), 1)


def esc(path):
    """Escape a path for use inside an ffmpeg filter option."""
    return path.replace("\\", "\\\\").replace(":", "\\:").replace("'", "\\'")


def render(text, mode, outfile, music=None, cta=False, seed=None, still=True,
           watermark=False, colors=None, gtype=None, line=None):
    lines = wrap_text(text)
    fs = font_size(lines)
    dur = duration_for(text)
    picked_colors, picked_type, speed, picked_line = pick_palette(mode)
    if colors is None:
        colors = picked_colors
    if gtype is None:
        gtype = picked_type
    if line is None:
        line = picked_line
    seed = seed if seed is not None else random.randint(0, 99999)

    tf = tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False)
    tf.write("\n".join(lines))
    tf.close()

    cN = ":".join(f"c{i}={c}" for i, c in enumerate(colors))
    x0, y0, x1, y1 = line
    gdur = 1 if still else dur
    src = (f"gradients=s={W}x{H}:{cN}:nb_colors={len(colors)}:type={gtype}"
           f":x0={x0}:y0={y0}:x1={x1}:y1={y1}"
           f":speed={speed}:seed={seed}:rate=30:duration={gdur}")

    main_txt = (
        f"drawtext=fontfile='{esc(FONT)}':textfile='{esc(tf.name)}'"
        f":fontcolor=white:fontsize={fs}:line_spacing={int(fs*0.38)}"
        f":text_align=C:x=(w-text_w)/2:y=(h-text_h)/2-40"
        f":shadowcolor=black@0.30:shadowx=4:shadowy=5"
    )
    wm_txt = (
        f"drawtext=fontfile='{esc(FONT_WM)}':text='{WATERMARK}'"
        f":fontcolor=white@0.85:fontsize=38:x=(w-text_w)/2:y=h-150"
        f":shadowcolor=black@0.25:shadowx=2:shadowy=2"
    )
    filters = [main_txt] + ([wm_txt] if watermark else [])
    if cta:
        cta_file = tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False)
        cta_file.write(CTA_TEXT)
        cta_file.close()
        enable = "" if still else f":enable='gte(t,{dur-2})'"
        filters.append(
            f"drawtext=fontfile='{esc(FONT)}':textfile='{esc(cta_file.name)}'"
            f":fontcolor=white:fontsize=52:line_spacing=18:text_align=C"
            f":x=(w-text_w)/2:y=h-420:shadowcolor=black@0.3:shadowx=3:shadowy=3"
            f"{enable}"
        )

    cmd = [FFMPEG, "-y", "-hide_banner", "-loglevel", "error",
           "-f", "lavfi", "-i", src]
    if still:
        cmd += ["-vf", ",".join(filters), "-frames:v", "1", outfile]
    else:
        filters.append("format=yuv420p")
        if music:
            cmd += ["-i", music]
        cmd += ["-vf", ",".join(filters), "-c:v", "libx264", "-preset",
                "medium", "-crf", "20", "-r", "30", "-t", str(dur)]
        if music:
            cmd += ["-c:a", "aac", "-b:a", "192k",
                    "-af", f"afade=t=out:st={dur-1.2}:d=1.2", "-shortest"]
        cmd += [outfile]

    subprocess.run(cmd, check=True)
    os.unlink(tf.name)
    return outfile, (None if still else dur)


def load_voices():
    """Optional "voice" line per caption file, telling Claude what a genre is
    about when its name alone isn't enough (e.g. houston)."""
    voices = {}
    for path in glob.glob(os.path.join(ROOT, "captions", "*.json")):
        data = json.load(open(path))
        if data.get("voice"):
            voices[data["mode"]] = data["voice"]
    return voices


def load_bank():
    bank = []
    for path in sorted(glob.glob(os.path.join(ROOT, "captions", "*.json"))):
        data = json.load(open(path))
        for e in data["entries"]:
            bank.append({"mode": data["mode"], "sign": e["sign"], "text": e["text"]})
    return bank


def pick_music(enabled):
    if not enabled:
        return None
    tracks = [f for f in glob.glob(os.path.join(ROOT, "music", "*"))
              if f.lower().endswith((".mp3", ".m4a", ".wav", ".aac"))]
    if not tracks:
        print("note: music/ is empty, rendering silent")
        return None
    return random.choice(tracks)


_slug_counts = {}


def slug(e):
    s = f"{e['mode']}_{e['sign']}"
    n = _slug_counts.get(s, 0)
    _slug_counts[s] = n + 1
    return f"{s}_{n+1}" if n else s


def ig_caption(e):
    tmpl = IG_CAPTION.get(e["mode"], "which {sign} needs to see this \U0001f440")
    cap = tmpl.format(sign=e["sign"] if e["sign"] != "all" else "toxic person")
    tags = f"{HASHTAGS_BASE} {HASHTAGS_MODE.get(e['mode'], '#relatable #memes')}"
    if e["sign"] != "all":
        tags += f" #{e['sign']} #{e['sign']}memes"
    return f"{cap}\n\nwaitlist → comealign.com (link in bio)\n\n{tags}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--mode", choices=list(PALETTES.keys()))
    ap.add_argument("--sign", choices=SIGNS + ["all"])
    ap.add_argument("--text")
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--all-signs", action="store_true")
    ap.add_argument("--batch", type=int)
    ap.add_argument("--days", type=int, default=7)
    ap.add_argument("--music", action="store_true")
    ap.add_argument("--cta", action="store_true")
    ap.add_argument("--video", action="store_true",
                    help="render mp4 video instead of still png (default: still)")
    ap.add_argument("--watermark", action="store_true",
                    help="add comealign.com watermark (default: clean image)")
    ap.add_argument("--out", default=os.path.join(ROOT, "out"))
    args = ap.parse_args()

    os.makedirs(args.out, exist_ok=True)
    bank = load_bank()
    still = not args.video
    ext = ".mp4" if args.video else ".png"

    if args.text:
        mode = args.mode or "random"
        out = os.path.join(args.out, f"custom_{mode}{ext}")
        render(args.text, mode, out, pick_music(args.music and args.video),
               args.cta, still=still, watermark=args.watermark)
        print(f"rendered {out}")
        return

    if args.batch:
        pool = bank[:]
        random.shuffle(pool)
        pool = pool[:args.batch]
        batch_dir = os.path.join(args.out, f"batch_{date.today().isoformat()}")
        per_day = math.ceil(len(pool) / args.days)
        for d in range(args.days):
            todays = pool[d * per_day:(d + 1) * per_day]
            if not todays:
                break
            day_dir = os.path.join(batch_dir, f"day{d+1}")
            os.makedirs(day_dir, exist_ok=True)
            plan_lines = [f"# Day {d+1} post plan\n"]
            for e in todays:
                name = slug(e) + ext
                render(e["text"], e["mode"], os.path.join(day_dir, name),
                       pick_music(args.music and args.video), args.cta,
                       still=still, watermark=args.watermark)
                plan_lines += [
                    f"## {name}",
                    f"on-video text: {e['text']}",
                    "", "PASTE AS CAPTION:", ig_caption(e),
                    "", "PIN AS FIRST COMMENT:", FIRST_COMMENT,
                    "", "reminder: add a trending sound in the IG app before posting",
                    "-" * 60, "",
                ]
                print(f"day{d+1}: {name}")
            with open(os.path.join(day_dir, "post_plan.txt"), "w") as f:
                f.write("\n".join(plan_lines))
        print(f"\nbatch ready: {batch_dir}")
        return

    selected = bank
    if args.mode:
        selected = [e for e in selected if e["mode"] == args.mode]
    if args.sign and not args.all_signs:
        selected = [e for e in selected if e["sign"] == args.sign]
    if not (args.all or args.all_signs or (args.mode and args.sign)):
        ap.error("pick --mode+--sign, --all, --all-signs, --batch N, or --text")

    for e in selected:
        out = os.path.join(args.out, slug(e) + ext)
        _, dur = render(e["text"], e["mode"], out,
                        pick_music(args.music and args.video), args.cta,
                        still=still, watermark=args.watermark)
        print(f"rendered {out}" + (f" ({dur}s)" if dur else ""))


if __name__ == "__main__":
    main()
