"""Pixel zodiac reels, "frame" style: a mystic card.

A black starry sky, a symmetrical botanical frame (two crossing bands, a tall
lens, a ring, long leaves and white tulips/bells) that grows in from the
corners, gold sparkles and comets, the sign's creature under the ring, and one
quote at a time in a pixel serif. The ornament carries a woven needlepoint mesh.
Everything is generated from (sign, seed), so the frames never repeat.

Geometry is laid out in "units" on a 270x480 board. The ornament and text are
drawn on a 540x960 grid (2 px per unit), then scaled 2x to 1080x1920, where
the mesh is applied. Stars and the creature are drawn at 1 px per unit.
"""
from __future__ import annotations

import math
import random
from dataclasses import dataclass
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
UW, UH = 270, 480            # unit board
G = 2                        # grid px per unit (ornament + text)
W, H = UW * G, UH * G        # 540 x 960 grid
SCALE = 2                    # grid -> output
FPS = 30
CX, CY = UW // 2, UH // 2    # in units

FONT_PATH = str(HERE / "assets/fonts/EBGaramond-Medium.ttf")
SERIF = ImageFont.truetype(FONT_PATH, 30)
SERIF_SM = ImageFont.truetype(FONT_PATH, 27)
SERIF_BIG = ImageFont.truetype(FONT_PATH, 38)
TAG = ImageFont.truetype(str(HERE / "assets/fonts/Silkscreen-Regular.ttf"), 16)

BG = (7, 6, 13)
INK = (242, 231, 208)
GOLD = (233, 183, 124)
GOLD_HI = (255, 222, 168)
WHITE = (246, 240, 232)

ELEMENT = {
    "aries": "fire", "leo": "fire", "sagittarius": "fire",
    "taurus": "earth", "virgo": "earth", "capricorn": "earth",
    "gemini": "air", "libra": "air", "aquarius": "air",
    "cancer": "water", "scorpio": "water", "pisces": "water",
}

# ornament palettes: dark, base, light, highlight. Violet is the house colour.
PALETTES = {
    "violet": ["#2c2350", "#54479a", "#7a6bc4", "#a99ce9"],
    "lilac": ["#33264f", "#64509e", "#8b75c9", "#b8a6ec"],
    "indigo": ["#232456", "#434a9c", "#6670c6", "#9ba3ea"],
    "plum": ["#2e1838", "#5f3577", "#8656a8", "#b993dc"],
    "rose": ["#3a1d3a", "#7a3f70", "#a46396", "#d29cc3"],
    "dusk": ["#1d2a4f", "#3e5a98", "#6286c4", "#9ebeec"],
    "sea": ["#1d2d4a", "#3b5f8f", "#5d88b5", "#97bfe0"],
    "moss": ["#25304a", "#4a6286", "#6f8db0", "#a5c2d8"],
}
BY_ELEMENT = {
    "fire": ["violet", "violet", "plum", "rose", "lilac"],
    "earth": ["violet", "violet", "lilac", "plum", "moss"],
    "air": ["violet", "violet", "indigo", "dusk", "lilac"],
    "water": ["violet", "violet", "indigo", "sea", "plum"],
}

BAYER = (np.array([[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]]) + 0.5) / 16.0


def bayer(h, w):
    return np.tile(BAYER, (h // 4 + 1, w // 4 + 1))[:h, :w]


BAY_U = bayer(UH, UW)
BAY_G = np.repeat(np.repeat(BAY_U, G, 0), G, 1)   # dissolve in unit-sized cells


def hexc(s):
    s = s.lstrip("#")
    return tuple(int(s[i:i + 2], 16) for i in (0, 2, 4))


def mix(a, b, f):
    return tuple(int(round(a[i] + (b[i] - a[i]) * f)) for i in range(3))


def ease(x):
    x = min(1.0, max(0.0, x))
    return x * x * (3 - 2 * x)


def bez(p0, p1, p2, p3, n):
    out = []
    for i in range(n + 1):
        u = i / n
        a, b, c, d = (1 - u) ** 3, 3 * (1 - u) ** 2 * u, 3 * (1 - u) * u * u, u ** 3
        out.append((a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0],
                    a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]))
    return out


def g(pt):
    """unit -> grid px"""
    return (round(pt[0] * G), round(pt[1] * G))


# --------------------------------------------------------------------- ornament

@dataclass
class Prim:
    kind: str
    birth: float
    data: tuple


class Ornament:
    """Primitives for the top-left quadrant; mirrored to all four corners."""

    def __init__(self, sign, seed, tall=False):
        self.r = r = random.Random(f"{sign}:{seed}:ornament")
        pal = PALETTES[r.choice(BY_ELEMENT[ELEMENT[sign]])]
        self.dark, self.base, self.light, self.hi = [hexc(c) for c in pal]
        self.vine = mix(self.light, self.hi, 0.25)
        self.prims: list[Prim] = []
        self.ring_r = r.choice([70, 72, 74])
        self.ring_kind = "oval" if tall else r.choice(["circle", "circle", "circle", "oval"])
        self.ring_ry = self.ring_r * (1.28 if self.ring_kind == "oval" else 1.0)
        self.flower = r.choice(["tulip", "tulip", "bell"])
        self._skeleton()
        self._vines()
        self._flowers()
        self.prims.sort(key=lambda p: p.birth)
        yy, xx = np.mgrid[0:H, 0:W]
        rx = (self.ring_r - 6) * G
        ry = (self.ring_ry - 6) * G
        self.inside = ((xx - CX * G + 0.5) / rx) ** 2 + ((yy - CY * G + 0.5) / ry) ** 2 < 1
        self._cache = None

    def in_ring(self, x, y, pad=0):
        return ((x - CX) / (self.ring_r + pad)) ** 2 + ((y - CY) / (self.ring_ry + pad)) ** 2 < 1

    # the fixed skeleton: a tall lens, an X of bands above and below the ring, the ring
    def _skeleton(self):
        r = self.r
        R = r.randint(250, 290)
        cx = CX + (R - r.randint(114, 122))
        lens = []
        for i in range(140):
            y = CY - (i / 139) * (CY + 6)
            a = math.pi - math.asin(max(-1, min(1, (CY - y) / R)))
            lens.append((cx + R * math.cos(a), y))
        self.prims.append(Prim("line", 0.0, (lens, 2, "band")))
        if r.random() < 0.5:
            self.prims.append(Prim("line", 0.06, ([(x + 8, y) for x, y in lens], 1, "thin")))
        # the X: a long diagonal from the top edge, through the axis above the ring, to the side
        x0 = r.randint(22, 46)
        cross = bez((x0, -6), (x0 + 50, 70), (CX + 40, CY - self.ring_ry - 10), (UW + 6, CY - 6), 160)
        self.prims.append(Prim("line", 0.03, (cross, 2, "band")))
        # the ring: double, thick outer band + thin inner line
        ring = []
        for i in range(100):
            a = math.pi + (i / 99) * (math.pi / 2)
            ring.append((CX + self.ring_r * math.cos(a), CY + self.ring_ry * math.sin(a)))
        self.prims.append(Prim("line", 0.1, (ring, 2, "band")))
        inner = [(CX + (x - CX) * 0.92, CY + (y - CY) * 0.92) for x, y in ring]
        self.prims.append(Prim("line", 0.14, (inner, 1, "thin")))

    def _vines(self):
        r = self.r
        specs = [
            # start, c1, c2, end  (the first starts on the centre line, heading straight up,
            # so its mirror joins it in one smooth S)
            lambda: ((r.randint(3, 9), CY), (r.randint(4, 12), CY - r.randint(60, 90)),
                     (r.randint(20, 50), r.randint(60, 110)), (r.randint(70, 100), r.randint(14, 40))),
            lambda: ((r.randint(-4, 2), r.randint(70, 120)), (r.randint(20, 40), r.randint(40, 80)),
                     (r.randint(30, 50), r.randint(10, 30)), (r.randint(40, 70), -4)),
            lambda: ((r.randint(36, 52), CY - r.randint(30, 50)), (r.randint(40, 60), CY - r.randint(80, 110)),
                     (r.randint(60, 80), r.randint(70, 100)), (r.randint(82, 100), r.randint(40, 66))),
        ]
        n = r.randint(2, 3)
        for v in range(n):
            s, c1, c2, e = specs[v]()
            pts = bez(s, c1, c2, e, 160)
            pts = [p for p in pts if not self.in_ring(*p, pad=4)]
            if len(pts) < 30:
                continue
            t0 = 0.06 + v * 0.1
            self.prims.append(Prim("line", t0, (pts, 2 if v == 0 else 1, "vine")))
            end, before = pts[-1], pts[-8]
            self._curl(end, end[0] - before[0], end[1] - before[1], t0 + 0.6, r.choice([-1, 1]), r.randint(6, 9))
            side = r.choice([-1, 1])
            k = r.randint(10, 18)
            while k < len(pts) - 14:
                p, q = pts[k], pts[k + 3]
                ang = math.atan2(q[1] - p[1], q[0] - p[0])
                L = r.randint(22, 34) if v == 0 else r.randint(15, 24)
                if v == 0 and r.random() < 0.25:
                    L = r.randint(36, 46)
                tip = (p[0] + math.cos(ang + side * 0.7) * L, p[1] + math.sin(ang + side * 0.7) * L)
                if not self.in_ring(*tip, pad=6):
                    self.prims.append(Prim("leaf", t0 + 0.6 * k / len(pts),
                                           (p, ang + side * r.uniform(0.55, 0.85), L, L / 5.0, side)))
                side = -side
                k += r.randint(14, 22)
            # a couple of small curls off the vine
            for _ in range(r.randint(0, 2)):
                k = r.randint(20, len(pts) - 20)
                p, q = pts[k], pts[k + 2]
                self._curl(p, -(q[1] - p[1]), q[0] - p[0], t0 + 0.6 * k / len(pts) + 0.1, r.choice([-1, 1]), 5)

    def _curl(self, p, dx, dy, birth, d, R):
        a = math.atan2(dy, dx)
        c = (p[0] - R * math.cos(a - d * math.pi / 2), p[1] - R * math.sin(a - d * math.pi / 2))
        pts = []
        for i in range(48):
            u = i / 47
            rad = R * (1 - 0.8 * u)
            ang = a - d * math.pi / 2 + d * u * 5.2
            pts.append((c[0] + rad * math.cos(ang), c[1] + rad * math.sin(ang)))
        pts = [q for q in pts if not self.in_ring(*q, pad=3)]
        if len(pts) > 4:
            self.prims.append(Prim("line", birth, (pts, 1, "vine")))

    def _flowers(self):
        """White flowers in planned, symmetric slots between the ring and the lens."""
        r = self.r
        rr, ry = self.ring_r, self.ring_ry
        slots = [
            (CX - r.randint(14, 24), CY - ry - r.randint(22, 34)),        # the centre pair, top
            (CX - rr - r.randint(14, 22), CY - r.randint(30, 50)),        # beside the ring
            (CX - rr * 0.75 - r.randint(6, 12), CY - ry * 0.75 - r.randint(8, 16)),   # at 10 o'clock
            (r.randint(24, 40), r.randint(26, 60)),                       # the outer corner
        ]
        chosen = slots[:2] + r.sample(slots[2:], r.randint(1, 2))
        for i, (x, y) in enumerate(chosen):
            d = -1 if x < CX - 10 else 1
            stem = bez((x, y + 1), (x + d * 3, y + 8), (x + d * 10, y + 10), (x + d * 13, y + 5), 20)
            self.prims.append(Prim("line", 0.55 + 0.05 * i, (stem, 1, "vine")))
            self._curl(stem[-1], d * 1, -1, 0.62 + 0.05 * i, -d, 3)
            self.prims.append(Prim(self.flower, 0.62 + 0.05 * i, ((x, y), d)))

    # ---- drawing
    def render(self, grow: float, t: float) -> np.ndarray:
        """RGBA ornament layer at grid resolution."""
        done = grow >= 1.4
        if done and self._cache is not None:
            return self._cache
        q = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        d = ImageDraw.Draw(q)
        for p in self.prims:
            if p.birth > grow:
                break
            prog = min(1.0, (grow - p.birth) / 0.25)
            getattr(self, "_d_" + p.kind)(d, p.data, prog)
        a = np.asarray(q).copy()
        # fold everything into the left half, then mirror it; same for top/bottom
        hw, hh = W // 2, H // 2
        left = np.where(a[:, :hw, 3:4] > 0, a[:, :hw], a[:, ::-1][:, :hw])
        a[:, :hw] = left
        a[:, W - hw:] = left[:, ::-1]
        top = np.where(a[:hh, :, 3:4] > 0, a[:hh], a[::-1][:hh])
        a[:hh] = top
        a[H - hh:] = top[::-1]
        a[self.inside] = 0
        if hasattr(self, "pocket"):
            a[self.pocket] = 0
        if done:
            self._cache = a
        return a

    def _d_line(self, d, data, prog):
        pts, wdt, kind = data
        n = max(2, int(len(pts) * prog))
        pp = [g(p) for p in pts[:n]]
        if kind == "band":
            d.line(pp, fill=BG + (255,), width=(wdt + 3) * G)
            d.line(pp, fill=self.base + (255,), width=(wdt + 2) * G - 2)
            d.line(pp, fill=self.light + (255,), width=wdt * G)
            d.line([(x - 1, y - 1) for x, y in pp], fill=self.hi + (255,), width=G)
        elif kind == "thin":
            d.line(pp, fill=self.light + (255,), width=G)
        else:
            d.line(pp, fill=BG + (255,), width=wdt * G + 2)
            d.line(pp, fill=self.vine + (255,), width=wdt * G)

    def _d_leaf(self, d, data, prog):
        (px, py), ang, L, wd, side = data
        L = L * ease(prog)
        if L < 3:
            return
        ca, sa = math.cos(ang), math.sin(ang)
        nx, ny = -sa, ca
        left, right, mid = [], [], []
        steps = 16
        for i in range(steps + 1):
            u = i / steps
            w = wd * (math.sin(math.pi * u) ** 0.6) * (1 - 0.35 * u)
            bend = 4.0 * math.sin(math.pi * u) * side * (L / 30)
            cx_, cy_ = px + ca * L * u + nx * bend, py + sa * L * u + ny * bend
            left.append(g((cx_ + nx * w, cy_ + ny * w)))
            right.append(g((cx_ - nx * w, cy_ - ny * w)))
            mid.append(g((cx_, cy_)))
        poly = left + right[::-1]
        d.polygon(poly, fill=self.base + (255,), outline=BG + (255,))
        d.line(poly + [poly[0]], fill=BG + (255,), width=2)
        d.polygon(left + mid[::-1], fill=self.light + (255,))
        d.line(mid[1:-3], fill=BG + (255,), width=1)
        # a highlight stroke along the lit edge
        d.line(left[3:9], fill=self.hi + (255,), width=1)

    def _petals(self, d, polys, x, y):
        for pts, shade in polys:
            pp = [g((x + px_, y + py_)) for px_, py_ in pts]
            col = WHITE if not shade else mix(WHITE, self.light, 0.5)
            d.polygon(pp, fill=col + (255,), outline=BG + (255,))

    def _d_tulip(self, d, data, prog):
        (x, y), side = data
        if prog < 0.3:
            return
        s = 0.7 + 0.3 * ease((prog - 0.3) / 0.7)
        L = [(-5.5, -11), (-1.5, -5), (0, 0), (-3.5, -0.5), (-5.5, -4)]
        R = [(5.5, -11), (1.5, -5), (0, 0), (3.5, -0.5), (5.5, -4)]
        M = [(0, -13), (2.6, -7), (1.4, -0.4), (-1.4, -0.4), (-2.6, -7)]
        sc = lambda P: [(px_ * s, py_ * s) for px_, py_ in P]
        self._petals(d, [(sc(M), False), (sc(L), False), (sc(R), True)], x, y)

    def _d_bell(self, d, data, prog):
        (x, y), side = data
        if prog < 0.3:
            return
        s = 0.7 + 0.3 * ease((prog - 0.3) / 0.7)
        cup = [(-4.5, -9), (4.5, -9), (5.5, -2), (6.5, 0), (3.5, -1), (2, 1), (0, -1), (-2, 1), (-3.5, -1), (-6.5, 0), (-5.5, -2)]
        sh = [(1.5, -9), (4.5, -9), (5.5, -2), (6.5, 0), (3.5, -1), (2, 1), (1, -1)]
        sc = lambda P: [(px_ * s, py_ * s) for px_, py_ in P]
        self._petals(d, [(sc(cup), False), (sc(sh), True)], x, y + 2)
        d.line([g((x, y - 9 * s + 2)), g((x, y - 12 * s + 2))], fill=self.vine + (255,), width=G)


# --------------------------------------------------------------------- sky (unit res)

def hero_star(a, x, y, size, col):
    """A concave four-point star (astroid) of radius `size` units."""
    s = math.sqrt(size)
    for dy in range(-size, size + 1):
        for dx in range(-size, size + 1):
            v = math.sqrt(abs(dx)) + math.sqrt(abs(dy))
            if v <= s + 0.15:
                xx, yy = x + dx, y + dy
                if 0 <= xx < UW and 0 <= yy < UH:
                    edge = v > s - 0.9
                    a[yy, xx] = mix(col, BG, 0.25) if (edge and (dx or dy)) else col


class Sky:
    def __init__(self, sign, seed, orn: Ornament):
        r = random.Random(f"{sign}:{seed}:sky")
        clear = orn.in_ring
        self.dust = [(r.randrange(UW), r.randrange(UH), r.random() * 6.28, r.uniform(0.5, 2.0),
                      r.choice([GOLD, INK, INK])) for _ in range(240)]
        self.sparkles = []
        while len(self.sparkles) < 18:
            x, y = r.randrange(6, UW - 6), r.randrange(6, UH - 6)
            if not clear(x, y, 10):
                self.sparkles.append((x, y, r.choice([1, 2, 2, 3]), r.random() * 6.28, r.uniform(0.6, 1.6)))
        self.heroes = []
        want = r.randint(4, 6)
        while len(self.heroes) < want:
            x = r.choice([r.randrange(10, 50), r.randrange(UW - 50, UW - 10)])
            y = r.randrange(20, UH - 20)
            if not clear(x, y, 14):
                self.heroes.append((x, y, r.choice([4, 5, 5, 6]), r.random() * 6.28))
        self.comets = []
        want = r.randint(2, 4)
        while len(self.comets) < want:
            x, y = r.randrange(30, UW - 30), r.randrange(30, UH - 30)
            if not clear(x, y, 24):
                self.comets.append((x, y, r.choice([-1, 1]), r.random() * 6.28))
        self.shooting = [(r.uniform(3, 26), r.choice([r.randrange(10, 60), r.randrange(UW - 90, UW - 40)]),
                          r.randrange(20, 140)) for _ in range(r.randint(2, 3))]

    def draw(self, a: np.ndarray, t):
        for (x, y, ph, sp, col) in self.dust:
            v = math.sin(t * sp + ph)
            if v > -0.3:
                a[y, x] = col if v > 0.45 else mix(col, BG, 0.6)
        for (x, y, s, ph, sp) in self.sparkles:
            v = 0.5 + 0.5 * math.sin(t * sp + ph)
            arm = max(1, round(s * (0.5 + 0.5 * v)))
            col = GOLD_HI if v > 0.7 else GOLD
            a[y, x] = col
            for k in range(1, arm + 1):
                c = col if k < arm else mix(col, BG, 0.45)
                for (dx, dy) in ((k, 0), (-k, 0), (0, k), (0, -k)):
                    a[y + dy, x + dx] = c
        for (x, y, s, ph) in self.heroes:
            v = 0.5 + 0.5 * math.sin(t * 0.8 + ph)
            hero_star(a, x, y, s if v > 0.35 else s - 1, GOLD_HI if v > 0.6 else GOLD)
        for (x, y, d, ph) in self.comets:
            v = 0.5 + 0.5 * math.sin(t * 1.1 + ph)
            hero_star(a, x, y, 2, GOLD_HI)
            n = 9 + int(3 * v)
            for k in range(3, n):
                xx, yy = x - d * k, y - (k * 2) // 3
                if 0 <= xx < UW and 0 <= yy < UH:
                    a[yy, xx] = mix(GOLD, BG, k / n)
        for (st, sx0, sy0) in self.shooting:
            dt = t - st
            if 0 <= dt < 0.6:
                sx, sy = sx0 + dt * 110, sy0 + dt * 55
                for k in range(14):
                    xx, yy = int(sx - k * 2), int(sy - k)
                    if 0 <= xx < UW and 0 <= yy < UH:
                        a[yy, xx] = mix(GOLD_HI, BG, k / 14)


# --------------------------------------------------------------------- text (grid res)

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


def balanced_wrap(s, font, width):
    """Wrap, then even out line lengths so the block sits like a poem."""
    lines = wrap(s, font, width)
    if len(lines) <= 1:
        return lines
    n, lo, hi, best = len(lines), width * 0.5, width, lines
    for _ in range(14):
        mid = (lo + hi) / 2
        trial = wrap(s, font, mid)
        if len(trial) <= n:
            best, hi = trial, mid
        else:
            lo = mid
    return best


def text_block(lines, font, fill, leading):
    asc, desc = font.getmetrics()
    h = leading * (len(lines) - 1) + asc + desc + 2
    w = int(max(font.getlength(l) for l in lines)) + 4
    im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.fontmode = "1"
    for i, l in enumerate(lines):
        d.text(((w - font.getlength(l)) / 2, i * leading), l, font=font, fill=fill + (255,))
    return np.asarray(im)


# --------------------------------------------------------------------- the reel

class FrameReel:
    GROW = 2.6

    def __init__(self, sign, cards, seed=0, glyph_fn=None, end_tag="align", sprite_fn=None, **_):
        self.sign, self.seed = sign, seed
        self.sprite_fn, self.glyph_fn, self.end_tag = sprite_fn, glyph_fn, end_tag
        tall = any(len(balanced_wrap(c.text, SERIF, (72 * 2 - 48) * G)) > 4 for c in cards)
        self.orn = Ornament(sign, seed, tall)
        self.sky = Sky(sign, seed, self.orn)
        self.cards = cards
        self.ticks = []
        t = 1.4
        for cd in cards:
            cd.start = t
            n = len(cd.text)
            cd.dur = 2.6 if cd.kind == "title" else 3.6 if cd.kind == "end" else 2.3 + 0.05 * n
            cd.type_end = t + 0.6
            t += cd.dur
        self.duration = t + 0.6
        self._blocks = {}
        self.scene = type("S", (), {"kind": "frame"})()
        self.mesh_mask = None
        # the creature's spot under the ring, and a clear pocket for it
        self.sp_size = sprite_fn(sign, 0).size if sprite_fn else (0, 0)
        self.feet = int(CY + self.orn.ring_ry + 8 + self.sp_size[1])
        if sprite_fn:
            sw, sh = self.sp_size
            yy, xx = np.mgrid[0:H, 0:W]
            cy = (self.feet - sh / 2) * G
            self.orn.pocket = ((xx - CX * G) / (sw * 0.85 * G)) ** 2 + ((yy - cy) / (sh * 0.95 * G)) ** 2 < 1
        self.tag_y = self.feet + 5

    @property
    def cues(self):
        return [c.start for c in self.cards]

    def _block(self, cd):
        if cd.text not in self._blocks:
            inner = (self.orn.ring_r * 2 - 48) * G
            big = cd.kind in ("title", "end") and len(cd.text) <= 32
            font, lead = (SERIF_BIG, 42) if big else (SERIF, 34)
            lines = balanced_wrap(cd.text, font, inner)
            limit = 4 if self.orn.ring_kind == "circle" else 6
            if len(lines) > limit:
                font, lead = SERIF_SM, 31
                lines = balanced_wrap(cd.text, font, inner + 10)
            self._blocks[cd.text] = text_block(lines, font, INK, lead)
        return self._blocks[cd.text]

    def frame(self, t) -> np.ndarray:
        """The grid frame (540x960 RGB). Also keeps the ornament mask for the mesh."""
        u = np.empty((UH, UW, 3), np.uint8)
        u[:] = BG
        self.sky.draw(u, t)
        # the creature, at unit resolution
        if self.sprite_fn and t > 2.0:
            sp = np.asarray(self.sprite_fn(self.sign, t).convert("RGBA"))
            local = t - 2.0
            hop = int(round(12 * (1 - local / 0.45) ** 2)) if local < 0.45 else 0
            for cd in self.cards[1:]:
                k = t - cd.start
                if 0 <= k < 0.3:
                    hop = int(round(3 * math.sin(math.pi * k / 0.3)))
            sh, sw = sp.shape[:2]
            sx, sy = CX - sw // 2, self.feet - sh - hop
            u[max(0, sy - 2):self.feet + 3, sx - 2:sx + sw + 2] = BG
            sm = sp[..., 3] > 127
            if local < 0.25:
                sm &= BAY_U[sy:sy + sh, sx:sx + sw] < local / 0.25
            u[sy:sy + sh, sx:sx + sw][sm] = sp[..., :3][sm]
            for x in range(CX - sw // 3, CX + sw // 3, 2):
                u[self.feet + 1, x] = mix(self.orn.light, BG, 0.45)
        a = np.repeat(np.repeat(u, G, 0), G, 1)

        layer = self.orn.render(t / self.GROW * 1.3, t)
        m = layer[..., 3] > 0
        a[m] = layer[..., :3][m]
        mesh = m.copy()

        # glyph + quote, centred together inside the ring
        cd = next((c for c in self.cards if c.start <= t < c.start + c.dur), None)
        if cd is not None:
            local = t - cd.start
            lvl = min(1, local / 0.6)
            if cd is not self.cards[-1]:
                lvl = min(lvl, (cd.dur - local) / 0.5)
            blk = self._block(cd)
            bh, bw = blk.shape[:2]
            gh = 30 if self.glyph_fn else 0
            top = CY * G - (bh + gh) // 2 + 4
            if self.glyph_fn and t > 1.0:
                gl = np.asarray(self.glyph_fn(self.sign).convert("RGBA"))
                gl = np.repeat(np.repeat(gl, G, 0), G, 1)
                gy, gx = top, CX * G - gl.shape[1] // 2
                gm = gl[..., 3] > 127
                if t < 1.6:
                    gm &= BAY_G[gy:gy + gl.shape[0], gx:gx + gl.shape[1]] < (t - 1.0) / 0.6
                a[gy:gy + gl.shape[0], gx:gx + gl.shape[1]][gm] = gl[..., :3][gm]
            y0, x0 = top + gh, CX * G - bw // 2
            mm = (blk[..., 3] > 0) & (BAY_G[y0:y0 + bh, x0:x0 + bw] < lvl)
            a[y0:y0 + bh, x0:x0 + bw][mm] = blk[..., :3][mm]

        # the tag, on its own patch of sky
        if not hasattr(self, "_tag"):
            tw = int(TAG.getlength(self.end_tag)) + 2
            ti = Image.new("RGBA", (tw, 16), (0, 0, 0, 0))
            dd = ImageDraw.Draw(ti)
            dd.fontmode = "1"
            dd.text((1, 0), self.end_tag, font=TAG, fill=mix(GOLD, BG, 0.2) + (255,))
            self._tag = np.asarray(ti)
        th, tw = self._tag.shape[:2]
        ty, tx = self.tag_y * G, CX * G - tw // 2
        a[ty - 4:ty + th + 2, tx - 8:tx + tw + 8] = BG
        mesh[ty - 4:ty + th + 2, tx - 8:tx + tw + 8] = False
        tm = self._tag[..., 3] > 0
        a[ty:ty + th, tx:tx + tw][tm] = self._tag[..., :3][tm]

        if t < 0.6:
            a[BAY_G > t / 0.6] = BG
        tail = self.duration - t
        if tail < 0.5:
            a[BAY_G > tail / 0.5] = BG
        self.mesh_mask = mesh
        return a

    def upscale(self, a):
        return upscale(a, self.mesh_mask)


def upscale(a: np.ndarray, mesh_mask=None) -> np.ndarray:
    """2x nearest-neighbour to 1080x1920, then the needlepoint mesh on the
    ornament only: a dark gap row/column every 4 output px, and a lit top-left."""
    b = np.repeat(np.repeat(a, SCALE, axis=0), SCALE, axis=1)
    if mesh_mask is None:
        return b
    mm = np.repeat(np.repeat(mesh_mask, SCALE, 0), SCALE, 1)
    hh, ww = mm.shape
    gap = np.zeros((hh, ww), bool)
    gap[3::4, :] = True
    gap[:, 3::4] = True
    lit = np.zeros((hh, ww), bool)
    lit[0::4, 0::4] = True
    bright = np.repeat(np.repeat(a.astype(np.int16).sum(axis=2) > 560, SCALE, 0), SCALE, 1)
    sel = mm & gap & ~bright
    b[sel] = (b[sel].astype(np.uint16) * 9 // 20).astype(np.uint8)
    sel = mm & gap & bright
    b[sel] = (b[sel].astype(np.uint16) * 17 // 20).astype(np.uint8)
    sel = mm & lit
    b[sel] = np.minimum(255, b[sel].astype(np.uint16) * 108 // 100).astype(np.uint8)
    return b
