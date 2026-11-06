"""Align "draw your sign" reels: a sign is drawn on graph paper, line by line, and a
playhead loops across the sheet. Every line it crosses plays a note: height is
pitch, colour is the instrument. The tune is the drawing.

    python3 render.py                 # all twelve -> ../out/draw/<nn>-<sign>.mp4
    python3 render.py leo pisces      # just these
    python3 render.py --stills        # contact sheets only, in ../out/draw/stills/
    python3 render.py --jobs 3        # reels rendered at once
"""
import argparse
import math
import os
import subprocess
import sys
from multiprocessing import Pool

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import drawings as D  # noqa: E402
import sound as S  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.join(HERE, "..", "signs", "assets", "fonts")
OUT = os.path.join(HERE, "..", "out", "draw")

W, H, FPS = 1080, 1920, 30
SS = 2                                  # supersampling for the sheet
CARD = (60, 392, 1020, 1640)            # x0 y0 x1 y1 on the frame
UNIT = (CARD[2] - CARD[0]) / 100        # px per sheet unit at 1x (9.6)
STEPS = 16                              # notes per sweep (sixteenths)

BG = (23, 20, 46)
PAPER = (251, 248, 241)
GRID_MINOR, GRID_MAJOR = (238, 232, 220), (224, 216, 200)
CREAM, LILAC, GOLD = (246, 234, 208), (184, 176, 214), (243, 200, 110)
COLOUR = {"ink": (35, 35, 39), "red": (216, 71, 58), "violet": (118, 86, 214), "orange": (238, 154, 43),
          "blue": (51, 70, 198), "pink": (223, 94, 158), "sky": (125, 185, 234), "green": (30, 154, 105),
          "sand": (235, 176, 122)}
PALETTE = ["ink", "red", "violet", "orange", "blue", "pink", "sky", "green", "sand"]

COPY = {
    "aries": ("starts first. never checks if it's in key.", "aries goes first, even in music"),
    "taurus": ("slow, warm, and it will not be rushed.", "a taurus song takes its time"),
    "gemini": ("two melodies, and both of them are true.", "gemini, in stereo"),
    "cancer": ("soft shell, the whole tide inside.", "for the cancers who feel it all"),
    "leo": ("even the quiet parts come out golden.", "leo, drawn as a song"),
    "virgo": ("every note exactly where it belongs.", "virgo would fix the timing"),
    "libra": ("it only sounds right when it's even.", "libra, perfectly balanced"),
    "scorpio": ("low, slow, and it stays with you.", "scorpio, in a minor key"),
    "sagittarius": ("aimed somewhere far. already leaving.", "sagittarius, one arrow, one song"),
    "capricorn": ("climbs one note at a time, and gets there.", "capricorn, still climbing"),
    "aquarius": ("pours out a song nobody else wrote.", "aquarius made their own genre"),
    "pisces": ("two fish, one song, no edges.", "pisces, underwater"),
}


def font(name, px):
    return ImageFont.truetype(os.path.join(FONTS, name), px)


SERIF = lambda px: font("EBGaramond-Italic.ttf", px)  # noqa: E731
SANS = lambda px: font("SofiaSansCondensed.ttf", px)  # noqa: E731


# ---------- timeline ----------

def plan(sign):
    _, _, bpm = S.KEY[sign]
    step = 60 / bpm / 4
    sweep = step * STEPS
    st = D.strokes(sign)
    total_len = sum(s["length"] for s in st)
    speed = min(70, max(28, total_len / 24))          # sheet units per second
    t = sweep * 0.75                                   # a blank sheet first, playhead already running
    for s in st:
        dur = max(0.28, s["length"] / speed)
        s["t0"], s["t1"] = t, t + dur
        t += dur + (0.22 if s["length"] > 8 else 0.12)
    end = (math.ceil(t / sweep) + 3) * sweep           # three full loops of the finished drawing
    return st, step, sweep, end


def drawn(s, t):
    """The visible part of a stroke at time t (points), or None."""
    if t <= s["t0"]:
        return None
    p = min(1.0, (t - s["t0"]) / (s["t1"] - s["t0"]))
    p = 0.75 * p + 0.25 * (0.5 - 0.5 * math.cos(math.pi * p))
    L = p * s["length"]
    k = int(np.searchsorted(s["cum"], L))
    pts = s["pts"][: k + 1]
    if p >= 1 or k == 0 or k >= len(s["pts"]):
        return s["pts"] if p >= 1 else pts
    a, b = s["pts"][k - 1], s["pts"][k]
    seg = s["cum"][k] - s["cum"][k - 1]
    f = (L - s["cum"][k - 1]) / seg if seg else 0
    return np.vstack([s["pts"][:k], a + (b - a) * f])


def crossings(pts, x):
    if pts is None or len(pts) < 2:
        return []
    xa, xb = pts[:-1, 0] - x, pts[1:, 0] - x
    idx = np.nonzero((xa * xb <= 0) & (xa != xb))[0]
    ys = []
    for i in idx:
        f = xa[i] / (xa[i] - xb[i])
        ys.append(pts[i, 1] + (pts[i + 1, 1] - pts[i, 1]) * f)
    ys.sort()
    out = []
    for y in ys:
        if not out or y - out[-1] > 1.6:
            out.append(y)
    return out


def notes(sign, st, step, end):
    ev = []
    k = 0
    while (k + 0.5) * step < end - 0.6:
        t = (k + 0.5) * step
        x = ((k % STEPS) + 0.5) * 100 / STEPS
        hits = []
        for s in st:
            for y in crossings(drawn(s, t), x):
                hits.append((y, s["colour"]))
        seen, keep = set(), []
        for y, c in hits:
            m = S.pitch(sign, y, c)
            if (m, c) not in seen:
                seen.add((m, c))
                keep.append((y, c, m))
        if len(keep) > 6:                                   # thin a crowded column, keep its range
            keep.sort()
            keep = [keep[int(round(i))] for i in np.linspace(0, len(keep) - 1, 6)]
        for y, c, m in keep:
            ev.append((t, m, c, 0.55 / math.sqrt(max(1, len(keep))), x, y))
        k += 1
    return ev


# ---------- pictures ----------

def to_px(pts):
    return [(float(x) * UNIT * SS, float(y) * UNIT * SS) for x, y in pts]


def line(d, pts, rgb, w):
    p = to_px(pts)
    if len(p) == 1:
        p = p * 2
    d.line(p, fill=rgb, width=w, joint="curve")
    for x, y in (p[0], p[-1]):
        d.ellipse((x - w / 2 + 0.5, y - w / 2 + 0.5, x + w / 2 - 0.5, y + w / 2 - 0.5), fill=rgb)


def sheet():
    w, h = (CARD[2] - CARD[0]) * SS, (CARD[3] - CARD[1]) * SS
    im = Image.new("RGB", (w, h), PAPER)
    d = ImageDraw.Draw(im)
    g = 100 / STEPS / 2 * UNIT * SS                  # minor grid: half a step
    for i in range(int(w / g) + 2):
        d.line((i * g, 0, i * g, h), fill=GRID_MAJOR if i % 2 == 0 else GRID_MINOR, width=2)
    for j in range(int(h / g) + 2):
        d.line((0, j * g, w, j * g), fill=GRID_MINOR, width=2)
    return im


def card_mask():
    m = Image.new("L", ((CARD[2] - CARD[0]) * SS, (CARD[3] - CARD[1]) * SS), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, m.width - 1, m.height - 1), 40 * SS, fill=255)
    return m.reduce(SS)


def centred(d, y, text, f, fill):
    w = d.textlength(text, font=f)
    d.text(((W * SS - w) / 2, y), text, font=f, fill=fill)


def template(sign, sub, sub_fill):
    im = Image.new("RGB", (W * SS, H * SS), BG)
    d = ImageDraw.Draw(im)
    rng = np.random.default_rng(len(sign))
    for _ in range(90):
        x, y, r = rng.uniform(0, W * SS), rng.uniform(0, H * SS), rng.uniform(1, 3.2)
        a = rng.uniform(0.25, 0.8)
        d.ellipse((x - r, y - r, x + r, y + r), fill=tuple(int(BG[i] + (CREAM[i] - BG[i]) * a) for i in range(3)))
    # card shadow
    sh = Image.new("L", im.size, 0)
    ImageDraw.Draw(sh).rounded_rectangle([c * SS for c in (CARD[0], CARD[1] + 14, CARD[2], CARD[3] + 14)],
                                         40 * SS, fill=110)
    sh = sh.filter(ImageFilter.GaussianBlur(26 * SS))
    im = Image.composite(Image.new("RGB", im.size, (6, 5, 14)), im, sh)
    d = ImageDraw.Draw(im)
    centred(d, 150 * SS, f"what {sign} sounds like", SERIF(84 * SS), CREAM)
    centred(d, 282 * SS, sub, SANS(42 * SS), sub_fill)
    centred(d, 1838 * SS, "align", SERIF(48 * SS), (150, 142, 186))
    return im.reduce(SS)


def toolbar(sign, active):
    h = 96
    im = Image.new("RGB", (W * SS, h * SS), BG)
    d = ImageDraw.Draw(im)
    r, gap, x0 = 23 * SS, 72 * SS, 92 * SS
    for i, c in enumerate(PALETTE):
        cx, cy = x0 + i * gap, h * SS / 2
        if c == active:
            d.ellipse((cx - r - 9 * SS, cy - r - 9 * SS, cx + r + 9 * SS, cy + r + 9 * SS), outline=CREAM,
                      width=3 * SS)
        d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=COLOUR[c])
    bpm = f"{S.KEY[sign][2]} bpm"
    f = SANS(36 * SS)
    tw = d.textlength(bpm, font=f)
    bx1 = (CARD[2] - 6) * SS
    bx0 = bx1 - tw - 44 * SS
    d.rounded_rectangle((bx0, 22 * SS, bx1, (h - 22) * SS), 26 * SS, outline=LILAC, width=2 * SS)
    d.text((bx0 + 22 * SS, 28 * SS), bpm, font=f, fill=CREAM)
    return im.reduce(SS)


def blend(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


class Painter:
    def __init__(self, sign, st, step, sweep, end, ev):
        self.sign, self.st, self.step, self.sweep, self.end, self.ev = sign, st, step, sweep, end, ev
        self.base = sheet()
        self.done = self.base.copy()
        self.n_done = 0
        self.mask = card_mask()
        line_txt = COPY[sign][0]
        self.tpl_a = template(sign, "i drew it. the lines play themselves.", LILAC)
        self.tpl_b = template(sign, line_txt, GOLD)
        self.tools = {c: toolbar(sign, c) for c in PALETTE}
        self.ev_t = np.array([e[0] for e in ev]) if ev else np.zeros(0)
        self.text_switch = end - 2 * sweep - 0.4

    def frame(self, t):
        st = self.st
        while self.n_done < len(st) and st[self.n_done]["t1"] <= t:
            line(ImageDraw.Draw(self.done), st[self.n_done]["pts"], COLOUR[st[self.n_done]["colour"]], 19)
            self.n_done += 1
        im = self.done.copy()
        d = ImageDraw.Draw(im)
        active = st[min(self.n_done, len(st) - 1)]["colour"]
        for s in st[self.n_done:]:
            p = drawn(s, t)
            if p is None:
                break
            line(d, p, COLOUR[s["colour"]], 19)
            tip = to_px(p[-1:])[0]
            d.ellipse((tip[0] - 7, tip[1] - 7, tip[0] + 7, tip[1] + 7), fill=COLOUR[s["colour"]])
        # rings where notes just sounded
        lo, hi = np.searchsorted(self.ev_t, t - 0.45), np.searchsorted(self.ev_t, t)
        for t0, _, c, _, x, y in self.ev[lo:hi]:
            age = min(max((t - t0) / 0.45, 0), 1)
            r = (12 + 34 * age) * SS
            cx, cy = x * UNIT * SS, y * UNIT * SS
            d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=blend(COLOUR[c], PAPER, age), width=int(5 - 3 * age) * SS)
        # playhead
        x = (t / self.sweep % 1) * 100
        px = x * UNIT * SS
        d.line((px, 0, px, im.height), fill=COLOUR["ink"], width=3 * SS)
        for s in st:
            for y in crossings(drawn(s, t), x):
                cy = y * UNIT * SS
                d.ellipse((px - 10 * SS, cy - 10 * SS, px + 10 * SS, cy + 10 * SS), fill=COLOUR["ink"])
        small = im.reduce(SS)
        k = (t - self.text_switch) / 0.6
        tpl = self.tpl_a if k <= 0 else self.tpl_b if k >= 1 else Image.blend(self.tpl_a, self.tpl_b, k)
        out = tpl.copy()
        out.paste(small, (CARD[0], CARD[1]), self.mask)
        out.paste(self.tools[active], (0, CARD[3] + 28))
        return out


# ---------- output ----------

def render(sign, stills=False):
    os.makedirs(OUT, exist_ok=True)
    nn = D.SIGNS.index(sign) + 1
    name = f"{nn:02d}-{sign}"
    st, step, sweep, end = plan(sign)
    ev = notes(sign, st, step, end)
    pt = Painter(sign, st, step, sweep, end, ev)
    if stills:
        os.makedirs(os.path.join(OUT, "stills"), exist_ok=True)
        ts = [round(end * f * FPS) / FPS for f in (0.08, 0.3, 0.55, 0.97)]
        frames = []
        for i in range(int(ts[-1] * FPS) + 1):
            t = i / FPS
            if any(abs(t - u) < 0.5 / FPS for u in ts):
                frames.append(pt.frame(t).resize((W // 2, H // 2)))
            elif pt.n_done < len(st) and st[pt.n_done]["t1"] <= t:
                pt.frame(t)
        sheet_im = Image.new("RGB", (W // 2 * len(frames), H // 2))
        for i, f in enumerate(frames):
            sheet_im.paste(f, (i * W // 2, 0))
        path = os.path.join(OUT, "stills", name + ".jpg")
        sheet_im.save(path, quality=88)
        return path
    wav = os.path.join(OUT, name + ".wav")
    S.write_wav(wav, S.mix(sign, [e[:4] for e in ev], end))
    mp4 = os.path.join(OUT, name + ".mp4")
    ff = subprocess.Popen(
        ["ffmpeg", "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS),
         "-i", "-", "-i", wav, "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
         "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", mp4], stdin=subprocess.PIPE)
    for i in range(int(end * FPS)):
        ff.stdin.write(pt.frame(i / FPS).tobytes())
    ff.stdin.close()
    ff.wait()
    os.remove(wav)
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", mp4, "-vf", "scale=720:-2", "-c:v", "libx264", "-crf", "26",
                    "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", mp4[:-4] + ".web.mp4"], check=True)
    pt.frame(end - 0.05).save(mp4[:-4] + ".cover.jpg", quality=90)
    with open(mp4[:-4] + ".txt", "w") as f:
        f.write(f"{COPY[sign][1]}\n\n#{sign} #zodiac #astrology #{sign}season #drawing #music\n")
    return f"{mp4}  ({end:.1f}s, {len(ev)} notes)"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("signs", nargs="*")
    ap.add_argument("--stills", action="store_true")
    ap.add_argument("--jobs", type=int, default=max(1, (os.cpu_count() or 2) - 1))
    a = ap.parse_args()
    signs = [s.split("-")[-1].lower() for s in a.signs] or D.SIGNS
    for s in signs:
        if s not in D.SIGNS:
            sys.exit(f"unknown sign: {s}")
    with Pool(min(a.jobs, len(signs))) as pool:
        for r in pool.starmap(render, [(s, a.stills) for s in signs]):
            print(r)


if __name__ == "__main__":
    main()
