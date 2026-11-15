"""Pixel zodiac reels: the scene engine.

Everything is drawn at a native 135x240 canvas and scaled 8x (nearest
neighbour) to 1080x1920, so every element sits on the same pixel grid.

A reel is a list of cards (title, advice lines, closer, end). `Reel.frame(t)`
returns the native RGB frame at time t; render.py scales and encodes it.
"""
from __future__ import annotations

import math
import random
from dataclasses import dataclass, field
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
W, H = 135, 240
SCALE = 8
FPS = 30

FONT = ImageFont.truetype(str(HERE / "assets/fonts/PixelifySans-Regular.ttf"), 10)
FONT_B = ImageFont.truetype(str(HERE / "assets/fonts/PixelifySans-Bold.ttf"), 10)
FONT_S = ImageFont.truetype(str(HERE / "assets/fonts/Silkscreen-Regular.ttf"), 8)

# layout (native px). Instagram covers roughly the top 28 and bottom 42 rows.
FEET_Y = 133          # bottom row of the sprite
BOX = (5, 145, 130, 197)   # x0, y0, x1, y1 of the dialogue box
TEXT_PAD = 6
LEADING = 11
CPS = 24              # characters typed per second

OUTLINE = (42, 31, 61)
CREAM = (255, 233, 184)
INK = (255, 244, 222)

BAYER = (np.array([[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]]) + 0.5) / 16.0


def hexc(s: str) -> tuple:
    s = s.lstrip("#")
    return tuple(int(s[i:i + 2], 16) for i in (0, 2, 4))


def mix(a, b, f):
    return tuple(int(round(a[i] + (b[i] - a[i]) * f)) for i in range(3))


def bayer(h, w):
    return np.tile(BAYER, (h // 4 + 1, w // 4 + 1))[:h, :w]


# --------------------------------------------------------------------- palettes

ELEMENT = {
    "aries": "fire", "leo": "fire", "sagittarius": "fire",
    "taurus": "earth", "virgo": "earth", "capricorn": "earth",
    "gemini": "air", "libra": "air", "aquarius": "air",
    "cancer": "water", "scorpio": "water", "pisces": "water",
}

# sky gradients, top -> horizon. Several per element; the seed picks one.
SKIES = {
    "fire": [
        ["#120f2b", "#2b1d4f", "#5b2f66", "#a8506b", "#e58f6f"],
        ["#14112e", "#30214f", "#6a3460", "#c06566", "#f2b07a"],
        ["#0f0d26", "#231a45", "#3e2759", "#7a3b63", "#c2606a"],
    ],
    "earth": [
        ["#101a2b", "#1d2d45", "#33455c", "#5d6a6e", "#a69a7c"],
        ["#121428", "#22264a", "#3c3f66", "#6e6a80", "#c5a985"],
        ["#0e1626", "#1b2a3f", "#2e4357", "#4f6a6d", "#8fa087"],
    ],
    "air": [
        ["#121836", "#1f2b5a", "#334a85", "#5f7cb0", "#a9c0dc"],
        ["#151436", "#262a62", "#3d4a8f", "#7a7fc2", "#cdb9e6"],
        ["#0f1531", "#1b2753", "#2c4479", "#4f73a3", "#8fb2cf"],
    ],
    "water": [
        ["#0b1026", "#141c40", "#1f2d5c", "#2f4a7a", "#4f7a9c"],
        ["#100d29", "#1d1847", "#2e2566", "#4a3a85", "#7a63a8"],
        ["#0a1224", "#122440", "#1b3a5c", "#285678", "#3f7f95"],
    ],
}

# ground / hill colours per element: far hill, near hill, ground, ground dark, grass light
LAND = {
    "fire": ["#3b2347", "#4a2c4a", "#5a3348", "#3a2036", "#7d4a52"],
    "earth": ["#22333d", "#2d4040", "#3a4f3e", "#24342c", "#5a7350"],
    "air": ["#26305a", "#2e3b63", "#3a4a6b", "#252f4d", "#5a6e8e"],
    "water": ["#1a2546", "#1f2f52", "#253a58", "#17233b", "#3d5a74"],
}

ACCENTS = ["#ff8fa3", "#ffd27a", "#9fe0c6", "#b9a6ff", "#ffb38a", "#8fd3ff"]


# --------------------------------------------------------------------- canvas helpers

class Canvas:
    def __init__(self, arr: np.ndarray):
        self.a = arr

    def px(self, x, y, c):
        x, y = int(x), int(y)
        if 0 <= x < W and 0 <= y < H:
            self.a[y, x] = c

    def rect(self, x0, y0, x1, y1, c):
        x0, y0 = max(0, int(x0)), max(0, int(y0))
        x1, y1 = min(W, int(x1)), min(H, int(y1))
        if x1 > x0 and y1 > y0:
            self.a[y0:y1, x0:x1] = c

    def disk_mask(self, cx, cy, r):
        yy, xx = np.mgrid[0:H, 0:W]
        return (xx - cx + 0.5) ** 2 + (yy - cy + 0.5) ** 2 <= r * r

    def fill(self, mask, c):
        self.a[mask] = c

    def blit(self, img: Image.Image, x, y):
        """Alpha-blit an RGBA PIL image (binary alpha) at native coords."""
        src = np.asarray(img.convert("RGBA"))
        h, w = src.shape[:2]
        x, y = int(x), int(y)
        sx0, sy0 = max(0, -x), max(0, -y)
        dx0, dy0 = max(0, x), max(0, y)
        dx1, dy1 = min(W, x + w), min(H, y + h)
        if dx1 <= dx0 or dy1 <= dy0:
            return
        s = src[sy0:sy0 + dy1 - dy0, sx0:sx0 + dx1 - dx0]
        m = s[..., 3] > 127
        self.a[dy0:dy1, dx0:dx1][m] = s[..., :3][m]


def dither_mask(mask, level, h0=0):
    """Thin a boolean mask to `level` (0..1) coverage with ordered dithering."""
    return mask & (bayer(H, W) < level)


def gradient(stops, y0, y1, sharp=3.0):
    """A dithered banded vertical gradient covering rows y0..y1 (full width)."""
    cols = [np.array(hexc(s) if isinstance(s, str) else s, float) for s in stops]
    n = len(cols) - 1
    rows = y1 - y0
    out = np.zeros((rows, W, 3), np.uint8)
    b = bayer(rows, W)
    for r in range(rows):
        p = (r / max(1, rows - 1)) * n
        i = min(int(p), n - 1)
        f = p - i
        f = np.clip((f - 0.5) * sharp + 0.5, 0, 1)
        pick = b[r] < f
        out[r] = np.where(pick[:, None], cols[i + 1], cols[i]).astype(np.uint8)
    return out


def text_img(s, font, fill, shadow=None):
    """Render text with hard pixels (no antialiasing) into a tight RGBA image."""
    l, t, r, b = font.getbbox(s)
    im = Image.new("RGBA", (r - l + 2, b - t + 2), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.fontmode = "1"
    if shadow:
        d.text((-l + 1, -t + 1), s, font=font, fill=shadow)
    d.text((-l, -t), s, font=font, fill=fill)
    return im


def wrap(s, font, width):
    words, lines, cur = s.split(), [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if font.getlength(trial) <= width or not cur:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


# --------------------------------------------------------------------- little pixel things

EMOTES = {
    "heart": ["..##.##..", ".#..#..#.", ".#.....#.", "..#...#..", "...#.#...", "....#...."],
    "star": ["....#....", "...###...", "#########", "..#####..", ".##...##.", "#.......#"],
    "note": ["...####", "...#..#", "...#..#", ".###.##", "####.##", ".##...."],
    "sparkle": ["...#...", "...#...", ".#.#.#.", "###.###", ".#.#.#.", "...#...", "...#..."],
    "dots": [".......", ".......", "#.#.#..", "......."],
    "moon": ["..###..", ".##....", "##.....", "##.....", ".##....", "..###.."],
}
EMOTE_COL = {"heart": "#ff7a93", "star": "#ffd27a", "note": "#9fb8ff",
             "sparkle": "#fff1c9", "dots": "#2a1f3d", "moon": "#ffd27a"}


def emote_img(kind):
    g = EMOTES[kind]
    gw, gh = max(len(r) for r in g), len(g)
    bw, bh = gw + 6, gh + 6
    im = Image.new("RGBA", (bw, bh + 3), (0, 0, 0, 0))
    p = im.load()
    white, ol = (255, 248, 236, 255), OUTLINE + (255,)
    for y in range(bh):
        for x in range(bw):
            corner = (x in (0, bw - 1)) and (y in (0, bh - 1))
            if corner:
                continue
            edge = x == 0 or y == 0 or x == bw - 1 or y == bh - 1 or \
                (x in (1, bw - 2) and y in (1, bh - 2))
            p[x, y] = ol if edge and not ((x in (1, bw - 2)) and (y in (1, bh - 2)) and False) else white
            if (x in (1, bw - 2)) and (y in (1, bh - 2)):
                p[x, y] = ol
    # rounded: knock out the inner corner pixels' outside
    for (x, y) in [(1, 0), (0, 1), (bw - 2, 0), (bw - 1, 1), (0, bh - 2), (1, bh - 1), (bw - 1, bh - 2), (bw - 2, bh - 1)]:
        p[x, y] = (0, 0, 0, 0)
    for (x, y) in [(1, 1), (bw - 2, 1), (1, bh - 2), (bw - 2, bh - 2)]:
        p[x, y] = ol
    for x in range(2, bw - 2):
        p[x, 0] = ol
        p[x, bh - 1] = ol
    for y in range(2, bh - 2):
        p[0, y] = ol
        p[bw - 1, y] = ol
    # tail
    tx = bw // 2 - 1
    p[tx, bh - 1] = white
    p[tx + 1, bh - 1] = white
    p[tx, bh] = white
    p[tx - 1, bh - 1] = ol
    p[tx + 2, bh - 1] = ol
    p[tx - 1, bh] = ol
    p[tx + 1, bh] = ol
    p[tx, bh + 1] = ol
    c = hexc(EMOTE_COL[kind]) + (255,)
    ox, oy = 3, 3
    for y, row in enumerate(g):
        for x, ch in enumerate(row):
            if ch == "#":
                p[ox + x, oy + y] = c
    return im


def tuft(c: Canvas, x, y, col, light):
    c.px(x, y, col)
    c.px(x + 1, y - 1, light)
    c.px(x + 2, y, col)
    c.px(x - 1, y - 1, col)


def flower(c: Canvas, x, y, petal, stem):
    c.px(x, y, stem)
    c.px(x, y - 1, stem)
    c.px(x, y - 2, (255, 240, 200))
    c.px(x - 1, y - 2, petal)
    c.px(x + 1, y - 2, petal)
    c.px(x, y - 3, petal)


def pine(c: Canvas, x, base, h, col, light):
    for i in range(h):
        half = int((i % 5) * 0.8 + i * 0.28) + 1
        y = base - h + i
        c.rect(x - half, y, x + half + 1, y + 1, col)
        c.px(x - half, y, light)
    c.rect(x, base, x + 1, base + 2, (40, 28, 30))


def round_tree(c: Canvas, x, base, col, dark, light):
    c.rect(x - 1, base - 10, x + 2, base + 1, (58, 38, 44))
    for (dx, dy, r) in [(0, -18, 7), (-5, -14, 5), (5, -14, 5), (0, -12, 6)]:
        m = c.disk_mask(x + dx, base + dy, r)
        c.fill(m, col)
    for (dx, dy, r) in [(3, -11, 4), (-2, -10, 3)]:
        m = c.disk_mask(x + dx, base + dy, r)
        c.fill(dither_mask(m, 0.5), dark)
    for (dx, dy) in [(-4, -21), (-3, -22), (-7, -17), (-2, -23), (-8, -16)]:
        c.px(x + dx, base + dy, light)


# --------------------------------------------------------------------- the scene

@dataclass
class Scene:
    sign: str
    seed: int
    kind: str = "hill"
    rng: random.Random = field(init=False)

    KINDS = ("hill", "window", "lake", "campfire", "meadow", "rooftop")

    def __post_init__(self):
        self.rng = random.Random(f"{self.sign}:{self.seed}:scene")
        r = self.rng
        el = ELEMENT[self.sign]
        self.el = el
        self.sky = r.choice(SKIES[el])
        self.land = [hexc(s) for s in LAND[el]]
        self.accent = hexc(r.choice(ACCENTS))
        self.moon_phase = r.choice(["full", "crescent", "crescent", "gibbous"])
        self.moon = (r.choice([r.randint(14, 30), r.randint(105, 121)]), r.randint(64, 86), r.choice([7, 8, 9]))
        if self.kind == "window":
            self.moon = (r.choice([r.randint(48, 58), r.randint(77, 87)]), r.randint(76, 90), 7)
        n = r.randint(55, 85)
        self.stars = [(r.randrange(W), r.randrange(0, 118), r.random() * 6.28, r.random() < 0.12,
                       0.6 + r.random() * 2.2) for _ in range(n)]
        self.clouds = [(r.uniform(0, W), r.randint(62, 98), r.uniform(1.0, 2.6), r.randint(14, 26))
                       for _ in range(r.randint(1, 3))]
        self.shooting = sorted(r.uniform(2.5, 30) for _ in range(r.randint(1, 3)))
        self.flies = [(r.uniform(5, W - 5), r.uniform(100, 140), r.random() * 6.28, r.uniform(0.3, 0.8))
                      for _ in range(r.randint(5, 9))]
        self.static = self._paint_static()
        bg = np.zeros((H, W, 3), np.uint8)
        bg[0:150] = gradient(self.sky, 0, 150)
        self._sky_px = np.all(self.static == bg, axis=2)

    # ---- the parts that never move
    def _paint_static(self):
        a = np.zeros((H, W, 3), np.uint8)
        c = Canvas(a)
        a[0:150] = gradient(self.sky, 0, 150)
        a[150:] = np.array(hexc(self.sky[0]), np.uint8)
        getattr(self, "_static_" + self.kind)(c)
        return a

    def _hills(self, c: Canvas, horizon, far_amp=10, near_amp=6):
        r = random.Random(f"{self.sign}:{self.seed}:hills")
        far, near, ground, gdark, glight = self.land
        p1, p2, p3 = r.random() * 6, r.random() * 6, r.random() * 6
        for x in range(W):
            hf = horizon - 6 - far_amp * (0.5 + 0.5 * math.sin(x / 19 + p1)) - 3 * math.sin(x / 7 + p2)
            c.rect(x, hf, x + 1, H, far)
            c.px(x, hf, mix(far, hexc(self.sky[-1]), 0.35))
            hn = horizon - near_amp * (0.5 + 0.5 * math.sin(x / 31 + p3))
            c.rect(x, hn, x + 1, H, near)
            c.px(x, hn, mix(near, hexc(self.sky[-1]), 0.3))

    def _foreground(self, c: Canvas, top, flowers=True):
        """A rounded grassy mound the sprite stands on."""
        far, near, ground, gdark, glight = self.land
        r = random.Random(f"{self.sign}:{self.seed}:fg")
        for x in range(W):
            d = (x - W / 2) / (W / 2)
            y = int(top + 10 * d * d)
            c.rect(x, y, x + 1, H, ground)
            c.px(x, y, glight)
        # darker band at the bottom (behind the box)
        m = np.zeros((H, W), bool)
        m[top + 22:, :] = True
        c.fill(dither_mask(m, 0.5), gdark)
        m2 = np.zeros((H, W), bool)
        m2[top + 32:, :] = True
        c.fill(m2, gdark)
        for _ in range(16):
            x = r.randrange(3, W - 3)
            d = (x - W / 2) / (W / 2)
            y = int(top + 10 * d * d) + r.randint(2, 9)
            if abs(x - W / 2) < 18 and y < FEET_Y + 3:
                continue
            tuft(c, x, y, mix(ground, glight, 0.5), glight)
        if flowers:
            cols = [self.accent, hexc("#fff1c9"), hexc("#ff9fb2"), hexc("#b9a6ff")]
            for _ in range(r.randint(5, 9)):
                x = r.randrange(4, W - 4)
                if abs(x - W / 2) < 20:
                    continue
                d = (x - W / 2) / (W / 2)
                y = int(top + 10 * d * d) + r.randint(4, 10)
                flower(c, x, y, r.choice(cols), mix(ground, glight, 0.6))

    def _static_hill(self, c):
        self._hills(c, 124)
        r = random.Random(f"{self.sign}:{self.seed}:tree")
        far, near, ground, gdark, glight = self.land
        side = r.choice([-1, 1])
        round_tree(c, W // 2 + side * r.randint(34, 46), 132, mix(near, ground, 0.4), gdark, glight)
        self._foreground(c, FEET_Y - 1)

    def _static_meadow(self, c):
        self._hills(c, 120, far_amp=6, near_amp=4)
        self._foreground(c, FEET_Y - 1)
        r = random.Random(f"{self.sign}:{self.seed}:meadow")
        cols = [self.accent, hexc("#fff1c9"), hexc("#ff9fb2"), hexc("#b9a6ff"), hexc("#ffd27a")]
        far, near, ground, gdark, glight = self.land
        for _ in range(26):
            x = r.randrange(2, W - 2)
            y = r.randint(FEET_Y + 4, FEET_Y + 26)
            if abs(x - W / 2) < 16 and y < FEET_Y + 6:
                continue
            flower(c, x, y, r.choice(cols), mix(ground, glight, 0.6))

    def _static_lake(self, c):
        horizon = 112
        far, near, ground, gdark, glight = self.land
        r = random.Random(f"{self.sign}:{self.seed}:lake")
        p = r.random() * 6
        # mountains
        for x in range(W):
            hm = horizon - 4 - 22 * max(0, math.sin(x / 23 + p)) ** 1.4 - 6 * max(0, math.sin(x / 9 + p * 2))
            c.rect(x, hm, x + 1, horizon, far)
            c.px(x, hm, mix(far, hexc(self.sky[-1]), 0.4))
        self.lake_top = horizon
        self.lake_bot = FEET_Y - 8
        # water is drawn per frame (reflection); shore:
        for x in range(W):
            d = (x - W / 2) / (W / 2)
            y = int(FEET_Y - 4 + 8 * d * d)
            c.rect(x, y, x + 1, H, ground)
            c.px(x, y, glight)
        m = np.zeros((H, W), bool)
        m[FEET_Y + 18:, :] = True
        c.fill(dither_mask(m, 0.5), gdark)
        m[FEET_Y + 28:, :] = True
        c.fill(m, gdark)
        for _ in range(8):
            x = r.randrange(3, W - 3)
            if abs(x - W / 2) < 18:
                continue
            tuft(c, x, FEET_Y + r.randint(4, 12), mix(ground, glight, 0.5), glight)
        # reeds
        for x in [r.randint(6, 20), r.randint(112, 128)]:
            for k in range(3):
                hh = r.randint(7, 12)
                c.rect(x + k * 2, FEET_Y - hh, x + k * 2 + 1, FEET_Y, mix(ground, glight, 0.4))
                c.rect(x + k * 2, FEET_Y - hh - 3, x + k * 2 + 1, FEET_Y - hh, (120, 80, 60))

    def _static_campfire(self, c):
        self._hills(c, 122, far_amp=5, near_amp=3)
        far, near, ground, gdark, glight = self.land
        r = random.Random(f"{self.sign}:{self.seed}:pines")
        tree = mix(far, (10, 12, 24), 0.35)
        for x in list(range(-2, 34, 9)) + list(range(104, 140, 9)):
            pine(c, x + r.randint(-2, 2), 128 + r.randint(-2, 2), r.randint(22, 34), tree, mix(tree, glight, 0.35))
        self._foreground(c, FEET_Y - 1, flowers=False)
        self.fire_x = W // 2 + 24 * r.choice([-1, 1])
        # logs
        fx = self.fire_x
        c.rect(fx - 5, FEET_Y - 1, fx + 6, FEET_Y + 1, (92, 58, 48))
        c.rect(fx - 4, FEET_Y - 2, fx + 5, FEET_Y - 1, (120, 76, 58))
        for k in range(-6, 7, 3):
            c.px(fx + k, FEET_Y + 1, (110, 110, 120))

    def _static_window(self, c):
        """Inside a cozy room, looking out through a big round-top window."""
        r = random.Random(f"{self.sign}:{self.seed}:room")
        wall = mix(hexc(self.sky[1]), (70, 48, 62), 0.55)
        wall_d = mix(wall, (0, 0, 0), 0.25)
        floor = (86, 58, 60)
        floor_d = (66, 44, 50)
        sky = c.a.copy()
        c.a[:] = wall
        # wallpaper dots
        for y in range(4, FEET_Y - 10, 8):
            for x in range((y // 8) % 2 * 4 + 2, W, 8):
                c.px(x, y, mix(wall, (255, 230, 200), 0.12))
        # window opening
        x0, x1, y0, y1 = 32, 103, 64, 116
        self.win = (x0, x1, y0, y1)
        mask = np.zeros((H, W), bool)
        mask[y0 + 20:y1, x0:x1] = True
        mask |= c.disk_mask((x0 + x1) / 2, y0 + 20, (x1 - x0) / 2) & (np.mgrid[0:H, 0:W][0] < y0 + 21)
        self.win_mask = mask
        c.a[mask] = sky[mask]
        # frame
        frame = (150, 104, 84)
        frame_l = (190, 140, 110)
        edge = mask ^ (np.roll(mask, 1, 0) & np.roll(mask, -1, 0) & np.roll(mask, 1, 1) & np.roll(mask, -1, 1))
        grow = edge | np.roll(edge, -1, 1) | np.roll(edge, 1, 1) | np.roll(edge, -1, 0)
        c.a[grow] = frame
        c.a[edge & ~mask] = frame_l
        cx = (x0 + x1) // 2
        self.mullion = (cx, y0, y1)
        c.rect(x0 - 4, y1, x1 + 4, y1 + 3, frame_l)       # sill
        c.rect(x0 - 3, y1 + 3, x1 + 3, y1 + 4, frame)
        # curtains
        cur = mix(self.accent, (80, 50, 70), 0.45)
        cur_d = mix(cur, (0, 0, 0), 0.3)
        for (a0, a1) in [(x0 - 8, x0 + 4), (x1 - 4, x1 + 8)]:
            c.rect(a0, y0 - 6, a1, y1 + 10, cur)
            for xx in range(a0 + 1, a1, 3):
                c.rect(xx, y0 - 6, xx + 1, y1 + 10, cur_d)
        c.rect(x0 - 12, y0 - 8, x1 + 12, y0 - 6, (120, 84, 70))  # rod
        # floor
        c.rect(0, FEET_Y - 2, W, H, floor)
        for y in range(FEET_Y + 2, H, 6):
            c.rect(0, y, W, y + 1, floor_d)
        c.rect(0, FEET_Y - 3, W, FEET_Y - 2, wall_d)
        # rug
        rug = mix(self.accent, (90, 60, 80), 0.3)
        for y in range(FEET_Y - 1, FEET_Y + 6):
            w = 34 + (y - FEET_Y) * 2
            c.rect(W // 2 - w, y, W // 2 + w, y + 1, rug)
        c.rect(W // 2 - 30, FEET_Y + 1, W // 2 + 30, FEET_Y + 2, mix(rug, (255, 240, 220), 0.3))
        # plant on the sill and a lamp
        px_ = x1 - 10
        c.rect(px_ - 3, y1 - 5, px_ + 4, y1, (176, 98, 78))
        for (dx, dy) in [(-3, -8), (-2, -10), (0, -12), (2, -10), (3, -8), (1, -9), (-1, -9), (0, -7), (-4, -6), (4, -6)]:
            c.px(px_ + dx, y1 - 5 + dy + 3, (110, 160, 110))
        self.lamp = (r.choice([10, 125]), FEET_Y - 2)
        lx, ly = self.lamp
        c.rect(lx, ly - 22, lx + 1, ly, (60, 40, 50))
        c.rect(lx - 3, ly, lx + 4, ly + 1, (60, 40, 50))
        c.rect(lx - 5, ly - 28, lx + 6, ly - 22, (255, 210, 150))
        c.rect(lx - 4, ly - 29, lx + 5, ly - 28, (255, 210, 150))
        c.rect(lx - 5, ly - 28, lx + 6, ly - 22, (255, 214, 156))
        c.rect(lx - 4, ly - 29, lx + 5, ly - 28, (255, 214, 156))
        c.rect(lx - 5, ly - 23, lx + 6, ly - 22, (226, 170, 120))
        # bottom darkening behind the box
        m = np.zeros((H, W), bool)
        m[FEET_Y + 18:, :] = True
        c.fill(dither_mask(m, 0.5), floor_d)
        m[FEET_Y + 26:, :] = True
        c.fill(m, (54, 36, 44))

    def _static_rooftop(self, c):
        r = random.Random(f"{self.sign}:{self.seed}:city")
        far, near, ground, gdark, glight = self.land
        horizon = 122
        bcol = mix(far, (12, 12, 28), 0.3)
        self.windows = []
        x = -2
        while x < W:
            bw = r.randint(9, 18)
            bh = r.randint(14, 44)
            c.rect(x, horizon - bh, x + bw, horizon + 4, bcol)
            c.rect(x, horizon - bh, x + bw, horizon - bh + 1, mix(bcol, hexc(self.sky[-1]), 0.3))
            for wy in range(horizon - bh + 3, horizon, 4):
                for wx in range(x + 2, x + bw - 1, 3):
                    if r.random() < 0.3:
                        self.windows.append((wx, wy, r.random() * 6.28, r.random() < 0.15))
            x += bw + r.randint(0, 2)
        # the roof the sprite sits on
        roof = mix(ground, (40, 30, 50), 0.3)
        c.rect(0, FEET_Y, W, H, roof)
        c.rect(0, FEET_Y, W, FEET_Y + 1, mix(roof, (255, 230, 200), 0.25))
        c.rect(0, FEET_Y + 3, W, FEET_Y + 4, mix(roof, (0, 0, 0), 0.25))
        # chimney + string lights
        cxp = r.choice([18, 112])
        c.rect(cxp - 5, FEET_Y - 18, cxp + 6, FEET_Y, (120, 70, 66))
        c.rect(cxp - 6, FEET_Y - 20, cxp + 7, FEET_Y - 18, (140, 86, 76))
        for yy in range(FEET_Y - 16, FEET_Y, 3):
            c.rect(cxp - 5, yy, cxp + 6, yy + 1, (100, 58, 56))
        self.lights = []
        for i in range(0, W, 7):
            sag = int(5 * math.sin(math.pi * (i % 63) / 63))
            self.lights.append((i, FEET_Y - 34 + sag, i // 7))
        m = np.zeros((H, W), bool)
        m[FEET_Y + 18:, :] = True
        c.fill(dither_mask(m, 0.5), mix(roof, (0, 0, 0), 0.35))
        m[FEET_Y + 26:, :] = True
        c.fill(m, mix(roof, (0, 0, 0), 0.4))

    # ---- moving parts
    def _sky_layer(self, c: Canvas, t, clip=None):
        """Stars, moon, clouds, shooting stars, drawn onto c (optionally clipped)."""
        layer = c.a.copy()
        L = Canvas(layer)
        horizon = 118
        for (x, y, ph, big, sp) in self.stars:
            tw = math.sin(t * sp + ph)
            if tw < -0.75:
                continue
            col = (255, 248, 225) if tw > 0.3 else (190, 180, 210)
            if big and tw > -0.2:
                L.px(x, y, (255, 250, 235))
                for (dx, dy) in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                    L.px(x + dx, y + dy, (200, 190, 220) if tw < 0.6 else (255, 240, 200))
            else:
                L.px(x, y, col)
        mx, my, mr = self.moon
        halo = L.disk_mask(mx, my, mr + 6) & ~L.disk_mask(mx, my, mr + 1)
        sky_l = mix(hexc(self.sky[2]), (255, 240, 210), 0.22)
        L.fill(dither_mask(halo, 0.35), sky_l)
        halo2 = L.disk_mask(mx, my, mr + 2) & ~L.disk_mask(mx, my, mr)
        L.fill(dither_mask(halo2, 0.6), sky_l)
        disk = L.disk_mask(mx, my, mr)
        L.fill(disk, (255, 241, 201))
        shade = disk & ~L.disk_mask(mx - 1, my - 1, mr - 1)
        L.fill(shade, (232, 206, 150))
        for (dx, dy, rr) in [(-3, -2, 1.6), (3, 2, 2.2), (-1, 4, 1.2), (4, -4, 1.0)]:
            if rr < mr / 3:
                L.fill(L.disk_mask(mx + dx, my + dy, rr) & disk, (236, 214, 164))
        if self.moon_phase in ("crescent", "gibbous"):
            off = mr * (0.9 if self.moon_phase == "crescent" else 1.5)
            cut = L.disk_mask(mx + off, my - mr * 0.3, mr) & disk
            L.a[cut] = c.a[cut]
        # clouds
        for (x0, y, sp, wdt) in self.clouds:
            x = (x0 + t * sp) % (W + 40) - 20
            cm = np.zeros((H, W), bool)
            for k in range(0, wdt, 5):
                rr = 3 + 2 * math.sin(k * 1.7 + x0)
                cm |= L.disk_mask(x + k, y - (1 if k % 10 else 2), max(2.5, rr))
            cm[int(y) + 2:, :] = False
            ccol = mix(hexc(self.sky[2]), (230, 220, 255), 0.25)
            L.fill(cm, ccol)
            top = cm & ~np.roll(cm, 1, 0)
            L.fill(top, mix(ccol, (255, 245, 230), 0.35))
        # shooting stars
        for st in self.shooting:
            dt = t - st
            if 0 <= dt < 0.7:
                sx = 20 + (st * 37) % 90 + dt * 70
                sy = 14 + (st * 13) % 30 + dt * 30
                for k in range(7):
                    f = 1 - k / 7
                    L.px(sx - k * 2.3, sy - k, mix(hexc(self.sky[1]), (255, 250, 230), f))
                    L.px(sx - k * 2.3 - 1, sy - k, mix(hexc(self.sky[1]), (255, 250, 230), f * 0.6))
        sky_rows = np.zeros((H, W), bool)
        sky_rows[:horizon] = True
        if clip is not None:
            sky_rows &= clip
        # only replace pixels still showing the original sky
        keep = self._sky_px & sky_rows
        c.a[keep] = layer[keep]

    def draw(self, t) -> np.ndarray:
        a = self.static.copy()
        c = Canvas(a)
        clip = self.win_mask if self.kind == "window" else None
        self._sky_layer(c, t, clip)
        if self.kind == "window":
            x0, x1, y0, y1 = self.win
            cx = self.mullion[0]
            c.rect(cx - 1, y0, cx + 1, y1, (150, 104, 84))
            c.rect(x0, y0 + 30, x1, y0 + 32, (150, 104, 84))
        if self.kind == "lake":
            self._water(c, t)
        if self.kind == "campfire":
            self._fire(c, t)
        if self.kind == "rooftop":
            for (wx, wy, ph, warm) in self.windows:
                on = math.sin(t * 0.4 + ph * 3) > -0.6
                col = (255, 214, 140) if warm else (255, 236, 170)
                if on:
                    c.px(wx, wy, col)
            for (lx, ly, i) in self.lights:
                c.px(lx, ly - 1, (60, 46, 60))
                col = [(255, 140, 160), (255, 220, 130), (150, 220, 200), (170, 160, 255)][i % 4]
                if math.sin(t * 3 + i) > -0.5:
                    c.px(lx, ly, col)
                else:
                    c.px(lx, ly, mix(col, (40, 30, 50), 0.6))
            for i in range(W):
                if (i % 7) and 0 <= i < W:
                    sag = 5 * math.sin(math.pi * (i % 63) / 63)
                    y = int(FEET_Y - 35 + sag)
                    if c.a[y, i].sum() < 400:
                        pass
        if self.kind in ("hill", "meadow", "lake", "campfire"):
            for (fx, fy, ph, sp) in self.flies:
                x = fx + 6 * math.sin(t * sp + ph)
                y = fy + 4 * math.sin(t * sp * 1.3 + ph * 2)
                if math.sin(t * 2.2 + ph * 5) > 0.1:
                    c.px(x, y, (255, 236, 140))
                    if math.sin(t * 2.2 + ph * 5) > 0.8:
                        for (dx, dy) in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                            c.px(x + dx, y + dy, mix(tuple(c.a[int(min(H - 1, max(0, y))), int(min(W - 1, max(0, x)))]), (255, 236, 140), 0.4))
        return a

    def _water(self, c: Canvas, t):
        top, bot = self.lake_top, self.lake_bot
        base = mix(hexc(self.sky[2]), (10, 14, 30), 0.35)
        for y in range(top, bot + 6):
            if y >= H:
                break
            src_y = top - (y - top) * 1.6 - 2
            row = c.a[int(max(0, src_y))].copy() if src_y >= 0 else c.a[0].copy()
            shift = int(2 * math.sin(t * 2 + y * 0.9))
            row = np.roll(row, shift, axis=0)
            dark = (row.astype(int) * 0.55 + np.array(base) * 0.45).astype(np.uint8)
            mask_row = np.ones(W, bool)
            # don't paint over the shore
            shore = c.a[y].copy()
            orig_shore = self.static[y]
            is_ground = np.any(orig_shore != self.static[min(H - 1, 149)], axis=1) & (y > bot - 6)
            for x in range(W):
                d = (x - W / 2) / (W / 2)
                if y >= int(FEET_Y - 4 + 8 * d * d):
                    mask_row[x] = False
            c.a[y][mask_row] = dark[mask_row]
            if (y + int(t * 3)) % 5 == 0:
                for x in range(W):
                    if mask_row[x] and ((x + y * 7 + int(t * 6)) % 23) < 3:
                        c.a[y, x] = mix(tuple(int(v) for v in dark[x]), (255, 245, 220), 0.35)
        # moon path
        mx, my, mr = self.moon
        for y in range(top + 1, bot):
            w = 1 + (y - top) // 6
            if ((y + int(t * 4)) % 3) == 0:
                for x in range(mx - w, mx + w):
                    d = (x - W / 2) / (W / 2)
                    if 0 <= x < W and y < int(FEET_Y - 4 + 8 * d * d):
                        c.a[y, x] = (255, 236, 190)

    def _fire(self, c: Canvas, t):
        fx = self.fire_x
        base = FEET_Y - 2
        for rad, k in ((17 + math.sin(t * 7), 0.10), (10 + math.sin(t * 9), 0.14)):
            g = c.disk_mask(fx, base - 4, rad)
            c.a[g] = (c.a[g].astype(float) * (1 - k) + np.array([255, 170, 110]) * k).astype(np.uint8)
        fr = int(t * 8) % 3
        shapes = [
            ["...#...", "..##...", "..###..", ".####..", ".#####.", "#######", "#######"],
            ["....#..", "...##..", "..###..", "..####.", ".#####.", "#######", "#######"],
            ["..#....", "..##...", ".###...", ".####..", ".#####.", "#######", "#######"],
        ]
        inner = [".......", ".......", ".......", "...#...", "..###..", ".#####.", "..###.."]
        sh = shapes[fr]
        for y, row in enumerate(sh):
            for x, ch in enumerate(row):
                if ch == "#":
                    c.px(fx - 3 + x, base - 7 + y, (255, 120, 80))
        for y, row in enumerate(inner):
            for x, ch in enumerate(row):
                if ch == "#":
                    c.px(fx - 3 + x, base - 7 + y, (255, 214, 120))
        rr = random.Random(int(t * 10))
        for k in range(3):
            ph = (t * 0.9 + k * 0.33) % 1
            c.px(fx + int(3 * math.sin(k * 2 + t * 3)), base - 9 - ph * 22, (255, 200, 120) if ph < 0.6 else (220, 130, 90))


# --------------------------------------------------------------------- the reel

@dataclass
class Card:
    kind: str          # title | line | end
    text: str
    start: float = 0
    dur: float = 0
    type_end: float = 0
    emote: str | None = None


class Reel:
    def __init__(self, sign, cards, seed=0, scene=None, sprite_fn=None, glyph_fn=None, end_tag="align"):
        self.sign = sign
        self.seed = seed
        r = random.Random(f"{sign}:{seed}:reel")
        self.scene = Scene(sign, seed, scene or r.choice(Scene.KINDS))
        self.sprite_fn = sprite_fn
        self.glyph_fn = glyph_fn
        self.end_tag = end_tag
        self.cards = cards
        self.ticks = []
        t = 0.0
        for cd in cards:
            cd.start = t
            if cd.kind == "title":
                cd.dur = 2.6
                cd.type_end = t + 0.9
            else:
                n = len(cd.text)
                type_s = n / CPS
                hold = 1.5 + 0.022 * n if cd.kind == "line" else 1.4
                if cd.kind == "end":
                    hold = 2.2
                cd.type_end = t + 0.25 + type_s
                cd.dur = 0.25 + type_s + hold
                for i, ch in enumerate(cd.text):
                    if ch not in " ,.'" and i % 2 == 0:
                        self.ticks.append(t + 0.25 + i / CPS)
            t += cd.dur
        self.duration = t + 0.4
        emo = ["heart", "star", "sparkle", "note", "moon", "dots"]
        r.shuffle(emo)
        for i, cd in enumerate(c for c in cards if c.kind == "line"):
            cd.emote = emo[i % len(emo)]
        self._emote_cache = {}
        self._text_cache = {}
        self.name_tab = text_img(sign.upper(), FONT_S, CREAM)

    @property
    def cues(self):
        return [c.start for c in self.cards]

    def card_at(self, t):
        for cd in self.cards:
            if cd.start <= t < cd.start + cd.dur:
                return cd
        return self.cards[-1]

    def _text_lines(self, s):
        if s not in self._text_cache:
            self._text_cache[s] = wrap(s, FONT, BOX[2] - BOX[0] - TEXT_PAD * 2)
        return self._text_cache[s]

    def frame(self, t) -> np.ndarray:
        a = self.scene.draw(t)
        c = Canvas(a)
        cd = self.card_at(t)
        local = t - cd.start

        # sprite
        if self.sprite_fn:
            sp = self.sprite_fn(self.sign, t)
            hop = 0
            # a little hop when a new card lands
            if cd.kind != "title" and 0 <= local < 0.3:
                hop = int(round(3 * math.sin(math.pi * local / 0.3)))
            if cd.kind == "title" and local < 0.5:
                hop = int(round(10 * (1 - local / 0.5) ** 2))
            c.blit(sp, W // 2 - sp.width // 2, FEET_Y + 1 - sp.height - hop)
            # shadow
            sw = sp.width // 2
            for x in range(W // 2 - sw // 2 - hop // 2, W // 2 + sw // 2 + hop // 2):
                if 0 <= x < W and (x % 2 == 0):
                    c.a[FEET_Y + 1, x] = mix(tuple(int(v) for v in c.a[FEET_Y + 1, x]), (0, 0, 0), 0.35)
            # emote
            if cd.emote and 0.15 < local < 2.2:
                if cd.emote not in self._emote_cache:
                    self._emote_cache[cd.emote] = emote_img(cd.emote)
                e = self._emote_cache[cd.emote]
                bob = 0 if (local * 3) % 2 < 1 else 1
                pop = min(1, (local - 0.15) / 0.12)
                if pop >= 1:
                    c.blit(e, W // 2 + sp.width // 2 - 6, FEET_Y - sp.height - e.height - 2 + bob)

        if cd.kind == "title":
            self._title(c, cd, local)
        else:
            self._box(c, cd, t, local)

        # the quiet tag
        tag = self._text_cache.setdefault("__tag", text_img(self.end_tag, FONT_S, mix(CREAM, (60, 50, 80), 0.45)))
        c.blit(tag, W // 2 - tag.width // 2, 203)

        # dissolve in at the start, out at the very end
        if t < 0.5:
            m = bayer(H, W) > (t / 0.5)
            a[m] = (12, 10, 24)
        tail = self.duration - t
        if tail < 0.4:
            m = bayer(H, W) > (tail / 0.4)
            a[m] = (12, 10, 24)
        return a

    def _title(self, c: Canvas, cd, local):
        # big title in the sky: bold 10px text scaled 2x, wrapped to fit, typed in
        lines = wrap(cd.text, FONT_B, (W - 10) // 2)
        n_chars = sum(len(l) for l in lines)
        shown = int(min(n_chars, max(0, local - 0.2) * 28))
        y = 33
        used = 0
        for line in lines:
            part = line[:max(0, shown - used)]
            used += len(line)
            full = self._big(line)
            if part:
                c.blit(self._big(part), W // 2 - full.width // 2, y)
            y += full.height + 2

    def _big(self, s):
        key = ("T", s)
        if key not in self._text_cache:
            im = text_img(s, FONT_B, INK)
            im = im.resize((im.width * 2, im.height * 2), Image.NEAREST)
            m = np.asarray(im)[..., 3] > 0
            h, w = m.shape
            o = np.zeros((h + 3, w + 2), bool)          # 1px outline + 1px drop below
            for dy in range(4):
                for dx in range(3):
                    o[dy:dy + h, dx:dx + w] |= m
            arr = np.zeros((h + 3, w + 2, 4), np.uint8)
            arr[o] = OUTLINE + (255,)
            src = np.asarray(im)
            arr[1:1 + h, 1:1 + w][m] = src[m]
            self._text_cache[key] = Image.fromarray(arr)
        return self._text_cache[key]

    def _box(self, c: Canvas, cd, t, local):
        x0, y0, x1, y1 = BOX
        # box slides up on the first line
        first = cd is next(k for k in self.cards if k.kind != "title")
        if first and local < 0.2:
            y_off = int((1 - local / 0.2) * 40)
            y0 += y_off
            y1 += y_off
        fill = (24, 19, 44)
        c.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, fill)
        # double border, rounded corners
        b1, b2 = CREAM, (150, 120, 170)
        c.rect(x0 + 2, y0, x1 - 2, y0 + 1, b1)
        c.rect(x0 + 2, y1 - 1, x1 - 2, y1, b1)
        c.rect(x0, y0 + 2, x0 + 1, y1 - 2, b1)
        c.rect(x1 - 1, y0 + 2, x1, y1 - 2, b1)
        for (px_, py_) in [(x0 + 1, y0 + 1), (x1 - 2, y0 + 1), (x0 + 1, y1 - 2), (x1 - 2, y1 - 2)]:
            c.px(px_, py_, b1)
        c.rect(x0 + 3, y0 + 2, x1 - 3, y0 + 3, b2)
        c.rect(x0 + 3, y1 - 3, x1 - 3, y1 - 2, b2)
        c.rect(x0 + 2, y0 + 3, x0 + 3, y1 - 3, b2)
        c.rect(x1 - 3, y0 + 3, x1 - 2, y1 - 3, b2)
        # name tab
        tab = self.name_tab
        gw = 0
        g = self.glyph_fn(self.sign) if self.glyph_fn else None
        if g is not None:
            gw = g.width + 2
        tx0, ty0 = x0 + 6, y0 - 9
        tx1 = tx0 + tab.width + gw + 7
        c.rect(tx0 + 1, ty0, tx1 - 1, y0 + 1, b1)
        c.rect(tx0, ty0 + 1, tx1, y0, b1)
        c.rect(tx0 + 1, ty0 + 1, tx1 - 1, y0 + 1, fill)
        if g is not None:
            c.blit(g, tx0 + 3, ty0 + 1 + max(0, (8 - g.height) // 2))
        c.blit(tab, tx0 + 3 + gw, ty0 + 2)
        # text, typed
        lines = self._text_lines(cd.text)
        shown = int(max(0, local - 0.25) * CPS)
        col = INK if cd.kind != "end" else CREAM
        used = 0
        ty = y0 + TEXT_PAD + 1
        for line in lines:
            part = line[:max(0, shown - used)]
            used += len(line) + 1
            if part:
                key = ("B", part, col)
                if key not in self._text_cache:
                    self._text_cache[key] = text_img(part, FONT, col, shadow=(10, 8, 22))
                c.blit(self._text_cache[key], x0 + TEXT_PAD + 1, ty)
            ty += LEADING
        # the "next" arrow once typing is done
        if t > cd.type_end and int(t * 2.5) % 2 == 0:
            ax, ay = x1 - 10, y1 - 7
            for i, w in enumerate([5, 3, 1]):
                c.rect(ax - w // 2, ay + i, ax + w // 2 + 1, ay + i + 1, CREAM)


def upscale(a: np.ndarray) -> np.ndarray:
    return np.repeat(np.repeat(a, SCALE, axis=0), SCALE, axis=1)
