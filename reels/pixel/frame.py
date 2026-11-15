"""Pixel zodiac reels, "frame" style: a mystic card.

A black starry sky, a symmetrical botanical frame (vines, leaves, bell flowers,
curls) that grows in from the corners, gold sparkles and little comets, and one
quote at a time in the middle in a pixel serif. The ornament has a woven
"needlepoint" mesh. Everything is generated from (sign, seed), so the frames
never repeat.

Drawn on a 270x480 grid, scaled 4x to 1080x1920.
"""
from __future__ import annotations

import math
import random
from dataclasses import dataclass
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
W, H = 270, 480
SCALE = 4
FPS = 30
CX, CY = W // 2, H // 2

SERIF = ImageFont.truetype(str(HERE / "assets/fonts/EBGaramond-Medium.ttf"), 15)
SERIF_SM = ImageFont.truetype(str(HERE / "assets/fonts/EBGaramond-Medium.ttf"), 14)
TAG = ImageFont.truetype(str(HERE / "assets/fonts/Silkscreen-Regular.ttf"), 8)

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

# ornament palettes: dark, base, light, highlight. Violet is the house colour, so
# every element can land on it; the others are its own tint.
PALETTES = {
    "violet": ["#2c2350", "#4f4291", "#7465bd", "#a497e6"],
    "rose": ["#3d1f35", "#7a3c62", "#a85f86", "#d99bb6"],
    "sage": ["#1f3326", "#3f6a4c", "#62916d", "#9cc6a2"],
    "sky": ["#1d2a4a", "#3d5a92", "#6185c0", "#9dbdea"],
    "teal": ["#16303a", "#2f6670", "#4f8f96", "#8cc5c7"],
    "plum": ["#2e1838", "#5a3270", "#7f52a0", "#b590d6"],
}
BY_ELEMENT = {
    "fire": ["violet", "rose", "rose", "plum"],
    "earth": ["violet", "sage", "sage", "plum"],
    "air": ["violet", "sky", "sky", "plum"],
    "water": ["violet", "teal", "plum", "violet"],
}

BAYER = (np.array([[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]]) + 0.5) / 16.0
BAY = np.tile(BAYER, (H // 4 + 1, W // 4 + 1))[:H, :W]


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
        a = (1 - u) ** 3
        b = 3 * (1 - u) ** 2 * u
        c = 3 * (1 - u) * u * u
        d = u ** 3
        out.append((a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0],
                    a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]))
    return out


# --------------------------------------------------------------------- ornament

@dataclass
class Prim:
    kind: str       # line | leaf | bell | bud | dot | ring
    birth: float    # 0..1, when it appears during the grow-in
    data: tuple


class Ornament:
    """One quadrant (top-left) of primitives; mirrored to all four corners."""

    def __init__(self, sign, seed, tall=False):
        self.r = r = random.Random(f"{sign}:{seed}:ornament")
        el = ELEMENT[sign]
        pal = PALETTES[r.choice(BY_ELEMENT[el])]
        self.dark, self.base, self.light, self.hi = [hexc(c) for c in pal]
        self.vine = mix(self.light, self.hi, 0.3)
        self.flower = r.choice(["bell", "tulip", "tulip", "bud", "star"])
        self.prims: list[Prim] = []
        self.ring_r = r.choice([70, 74, 78])
        self.ring_kind = r.choice(["circle", "circle", "oval", "arch"])
        if tall and self.ring_kind == "circle":
            self.ring_kind = r.choice(["oval", "arch"])
        self._frame_lines()
        self._vines()
        rx = self.ring_r * 0.93 - 2
        ry = rx * (1.25 if self.ring_kind == "oval" else 1.45 if self.ring_kind == "arch" else 1.0)
        yy, xx = np.mgrid[0:H, 0:W]
        self.inside = ((xx - CX + 0.5) / rx) ** 2 + ((yy - CY + 0.5) / ry) ** 2 < 1
        self.prims.sort(key=lambda p: p.birth)

    # big structural lines: an ogive/lens or crossing arcs, plus the centre ring
    def _frame_lines(self):
        r = self.r
        style = r.choice(["lens", "cross", "lens2"])
        if style in ("lens", "lens2"):
            # two huge circles whose overlap is a tall lens; drawn in the quadrant as an arc
            R = r.randint(250, 300)
            cx = CX + (R - r.randint(112, 124))
            pts = []
            for i in range(120):
                a = math.pi - math.asin(min(1, max(-1, (CY - (i / 119) * CY) / R)))
                pts.append((cx + R * math.cos(a), CY - (i / 119) * CY))
            self.prims.append(Prim("line", 0.0, (pts, 2, "band")))
            if style == "lens2":
                pts2 = [(x + 9, y) for x, y in pts]
                self.prims.append(Prim("line", 0.05, (pts2, 1, "thin")))
        else:
            # a long diagonal sweeping from the top edge to the side, crossing the axis
            a0 = (r.randint(30, 60), -4)
            pts = bez(a0, (a0[0] + 40, 120), (W - 20, 160), (W + 10, CY + 10), 120)
            pts = [(x, y) for x, y in pts if y <= CY]
            self.prims.append(Prim("line", 0.0, (pts, 2, "band")))
        # centre ring (one quadrant of it)
        rr = self.ring_r
        pts = []
        for i in range(90):
            a = math.pi + (i / 89) * (math.pi / 2)
            ry = rr * (1.25 if self.ring_kind == "oval" else 1.0)
            if self.ring_kind == "arch":
                ry = rr * 1.45
            pts.append((CX + rr * math.cos(a), CY + ry * math.sin(a)))
        self.prims.append(Prim("line", 0.1, (pts, 2, "band")))
        pts_in = [(CX + (x - CX) * 0.93, CY + (y - CY) * 0.93) for x, y in pts]
        self.prims.append(Prim("line", 0.15, (pts_in, 1, "thin")))

    def _vines(self):
        r = self.r
        n_vines = r.randint(2, 3)
        starts = [(r.randint(0, 10), CY - r.randint(0, 30)),
                  (r.randint(-6, 4), r.randint(60, 140)),
                  (r.randint(30, 70), CY - r.randint(40, 70))]
        ends = [(r.randint(70, 115), r.randint(18, 60)),
                (r.randint(40, 80), r.randint(-4, 20)),
                (r.randint(95, 125), r.randint(90, 130))]
        for v in range(n_vines):
            s, e = starts[v], ends[v]
            c1 = (s[0] + r.randint(30, 70), s[1] - r.randint(20, 80))
            c2 = (e[0] - r.randint(30, 70), e[1] + r.randint(20, 70))
            pts = bez(s, c1, c2, e, 140)
            t0 = 0.08 + v * 0.1
            self.prims.append(Prim("line", t0, (pts, 3 if v == 0 else 2, "vine")))
            # curl at the end
            self._curl(pts[-1], pts[-1][0] - pts[-6][0], pts[-1][1] - pts[-6][1], t0 + 0.55, r.choice([-1, 1]))
            # leaves along it
            side = 1
            k = r.randint(10, 16)
            while k < len(pts) - 12:
                p = pts[k]
                q = pts[k + 2]
                ang = math.atan2(q[1] - p[1], q[0] - p[0])
                L = r.randint(14, 24) if v == 0 else r.randint(10, 16)
                if v == 0 and r.random() < 0.3:
                    L = r.randint(28, 40)
                self.prims.append(Prim("leaf", t0 + 0.6 * k / len(pts),
                                       (p, ang + side * r.uniform(0.5, 0.95), L, max(3, int(L / 3.2)), side)))
                side = -side
                k += r.randint(7, 12)
            # flowers on short drooping stems
            for _ in range(r.randint(2, 4)):
                k = r.randint(20, len(pts) - 20)
                p = pts[k]
                d = r.choice([-1, 1])
                stem = bez(p, (p[0] + d * 6, p[1] - 8), (p[0] + d * 12, p[1] - 4), (p[0] + d * 13, p[1] + 4), 16)
                self.prims.append(Prim("line", t0 + 0.6 * k / len(pts) + 0.1, (stem, 1, "vine")))
                self.prims.append(Prim(self.flower, t0 + 0.6 * k / len(pts) + 0.2, (stem[-1], d)))
        # loose sprigs near the ring
        for _ in range(r.randint(1, 2)):
            a = math.pi + r.uniform(0.25, 1.3)
            rr = self.ring_r + 8
            p = (CX + rr * math.cos(a), CY + rr * math.sin(a))
            self.prims.append(Prim("leaf", 0.5, (p, a + math.pi / 2 * r.choice([-1, 1]) * 0.7, 9, 3, 1)))
            self.prims.append(Prim("leaf", 0.55, (p, a - 0.3, 8, 3, -1)))

    def _curl(self, p, dx, dy, birth, d):
        a = math.atan2(dy, dx)
        pts = []
        R = 7
        for i in range(40):
            u = i / 39
            rad = R * (1 - 0.75 * u)
            ang = a + d * (u * 5.0)
            if i == 0:
                cx, cy = p[0] - rad * math.cos(ang - d * math.pi / 2), p[1] - rad * math.sin(ang - d * math.pi / 2)
            pts.append((cx + rad * math.cos(ang - d * math.pi / 2), cy + rad * math.sin(ang - d * math.pi / 2)))
        self.prims.append(Prim("line", birth, (pts, 1, "vine")))

    # ---- drawing
    def render(self, grow: float, t: float) -> Image.Image:
        """Draw the quadrant prims up to `grow` (0..1+) and mirror to a full RGBA layer."""
        q = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        d = ImageDraw.Draw(q)
        for p in self.prims:
            if p.birth > grow:
                break
            prog = min(1.0, (grow - p.birth) / 0.25)
            getattr(self, "_d_" + p.kind)(d, p.data, prog, t)
        # mirror: left half -> right, top -> bottom
        a = np.asarray(q).copy()
        left = a[:, :CX]
        a[:, W - CX:] = np.where(left[:, ::-1, 3:4] > 0, left[:, ::-1], a[:, W - CX:])
        top = a[:CY]
        a[H - CY:] = np.where(top[::-1, :, 3:4] > 0, top[::-1], a[H - CY:])
        a[self.inside] = 0
        return Image.fromarray(a)

    def _d_line(self, d, data, prog, t):
        pts, wdt, kind = data
        n = max(2, int(len(pts) * prog))
        pp = [(round(x), round(y)) for x, y in pts[:n]]
        if kind == "band":
            d.line(pp, fill=self.base + (255,), width=wdt + 2)
            d.line(pp, fill=self.light + (255,), width=wdt)
            d.line([(x - 1, y - 1) for x, y in pp], fill=self.hi + (255,), width=1)
        elif kind == "thin":
            d.line(pp, fill=self.light + (255,), width=1)
        else:
            d.line(pp, fill=self.vine + (255,), width=wdt)

    def _d_leaf(self, d, data, prog, t):
        (px, py), ang, L, wd, side = data
        L = L * ease(prog)
        if L < 2:
            return
        sway = 0.06 * math.sin(t * 1.3 + px * 0.1)
        ang += sway
        ca, sa = math.cos(ang), math.sin(ang)
        nx, ny = -sa, ca
        left, right, mid = [], [], []
        for i in range(9):
            u = i / 8
            w = wd * math.sin(math.pi * u) ** 0.9
            bend = 1.5 * math.sin(math.pi * u) * side
            cx_, cy_ = px + ca * L * u + nx * bend, py + sa * L * u + ny * bend
            left.append((cx_ + nx * w, cy_ + ny * w))
            right.append((cx_ - nx * w, cy_ - ny * w))
            mid.append((cx_, cy_))
        d.polygon(left + right[::-1], fill=self.base + (255,), outline=self.dark + (255,))
        d.polygon(left + mid[::-1], fill=self.light + (255,))
        d.line([(round(x), round(y)) for x, y in mid[1:-2]], fill=self.dark + (255,), width=1)
        hx, hy = left[3]
        d.point((round(hx + nx * -0.5), round(hy)), fill=self.hi + (255,))

    def _d_bell(self, d, data, prog, t):
        (x, y), side = data
        if prog < 0.3:
            return
        bob = 1 if math.sin(t * 1.6 + x) > 0.6 else 0
        x, y = round(x), round(y) + bob
        g = ["...###...", "..#####..", ".#######.", ".#######.", "#########", "##.#.#.##", "#.......#"]
        for j, row in enumerate(g):
            for i, ch in enumerate(row):
                if ch == "#":
                    c = WHITE if i < 6 else mix(WHITE, self.light, 0.45)
                    d.point((x - 4 + i, y + j), fill=c + (255,))
        d.point((x, y - 1), fill=self.vine + (255,))

    def _d_tulip(self, d, data, prog, t):
        (x, y), side = data
        if prog < 0.3:
            return
        bob = 1 if math.sin(t * 1.4 + x) > 0.7 else 0
        x, y = round(x), round(y) - 8 + bob
        g = ["#...#...#", "##..#..##", "##.###.##", "#########", "#########", ".#######.", "..#####..", "...###..."]
        for j, row in enumerate(g):
            for i, ch in enumerate(row):
                if ch == "#":
                    c = WHITE if (i < 5 or j < 2) else mix(WHITE, self.light, 0.4)
                    d.point((x - 4 + i, y + j), fill=c + (255,))
        for j in range(8, 11):
            d.point((x, y + j), fill=self.vine + (255,))

    def _d_bud(self, d, data, prog, t):
        (x, y), side = data
        if prog < 0.3:
            return
        x, y = round(x), round(y)
        g = ["..#..", ".###.", "#####", ".###.", "..#.."]
        for j, row in enumerate(g):
            for i, ch in enumerate(row):
                if ch == "#":
                    c = mix(WHITE, (255, 190, 200), 0.35) if (i + j) % 3 else WHITE
                    d.point((x - 2 + i, y + j), fill=c + (255,))

    def _d_star(self, d, data, prog, t):
        (x, y), side = data
        if prog < 0.3:
            return
        x, y = round(x), round(y)
        for (i, j) in [(0, 0), (1, 0), (-1, 0), (0, 1), (0, -1), (2, 0), (-2, 0), (0, 2), (0, -2), (1, 1), (-1, -1), (1, -1), (-1, 1)]:
            c = GOLD_HI if (i, j) == (0, 0) else WHITE
            if abs(i) + abs(j) == 2 and i and j:
                c = mix(WHITE, self.light, 0.4)
            d.point((x + i, y + j + 2), fill=c + (255,))


# --------------------------------------------------------------------- sky

class Sky:
    def __init__(self, sign, seed, ring_r):
        r = random.Random(f"{sign}:{seed}:sky")
        self.dust = [(r.randrange(W), r.randrange(H), r.random() * 6.28, r.uniform(0.5, 2.0),
                      r.choice([GOLD, INK, (170, 160, 200)])) for _ in range(260)]
        self.sparkles = []
        tries = 0
        while len(self.sparkles) < 22 and tries < 500:
            tries += 1
            x, y = r.randrange(8, W - 8), r.randrange(8, H - 8)
            if (x - CX) ** 2 + (y - CY) ** 2 < (ring_r + 6) ** 2:
                continue
            self.sparkles.append((x, y, r.choice([2, 2, 3, 3, 4, 5]), r.random() * 6.28, r.uniform(0.6, 1.6)))
        self.comets = [(r.randrange(20, W - 60), r.randrange(20, H - 40), r.choice([-1, 1]), r.random() * 6.28)
                       for _ in range(r.randint(3, 5))]
        self.shooting = sorted(r.uniform(3, 28) for _ in range(r.randint(2, 4)))

    def draw(self, a: np.ndarray, t):
        for (x, y, ph, sp, col) in self.dust:
            v = math.sin(t * sp + ph)
            if v > -0.3:
                a[y, x] = col if v > 0.4 else mix(col, BG, 0.55)
        for (x, y, s, ph, sp) in self.sparkles:
            v = 0.5 + 0.5 * math.sin(t * sp + ph)
            arm = max(1, round(s * (0.55 + 0.45 * v)))
            col = GOLD_HI if v > 0.7 else GOLD
            a[y, x] = col
            for k in range(1, arm + 1):
                c = col if k < arm else mix(col, BG, 0.4)
                for (dx, dy) in ((k, 0), (-k, 0), (0, k), (0, -k)):
                    if 0 <= x + dx < W and 0 <= y + dy < H:
                        a[y + dy, x + dx] = c
            if s >= 4:
                for (dx, dy) in ((1, 1), (-1, -1), (1, -1), (-1, 1)):
                    a[y + dy, x + dx] = mix(col, BG, 0.3)
        # little comets: a sparkle with three dashed trails
        for (x, y, d, ph) in self.comets:
            v = 0.5 + 0.5 * math.sin(t * 0.9 + ph)
            a[y, x] = GOLD_HI
            for (dx, dy) in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                a[y + dy, x + dx] = GOLD
            for lane in (-2, 0, 2):
                for k in range(3, 12, 3):
                    xx, yy = x - d * k, y - k // 2 + lane
                    if 0 <= xx < W and 0 <= yy < H and (k + int(t * 4)) % 6 < 4:
                        a[yy, xx] = mix(GOLD, BG, 0.2 + 0.05 * k * (1 - v))
        for st in self.shooting:
            dt = t - st
            if 0 <= dt < 0.6:
                sx, sy = 30 + (st * 53) % 200 + dt * 120, 30 + (st * 31) % 120 + dt * 60
                for k in range(12):
                    xx, yy = int(sx - k * 2), int(sy - k)
                    if 0 <= xx < W and 0 <= yy < H:
                        a[yy, xx] = mix(GOLD_HI, BG, k / 12)


# --------------------------------------------------------------------- text

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
    n = len(lines)
    if n <= 1:
        return lines
    lo, hi = width * 0.5, width
    best = lines
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
        lw = font.getlength(l)
        d.text(((w - lw) / 2, i * leading), l, font=font, fill=fill + (255,))
    return im


# --------------------------------------------------------------------- the reel

@dataclass
class Card:
    kind: str
    text: str
    start: float = 0
    dur: float = 0
    type_end: float = 0
    emote: str | None = None


class FrameReel:
    GROW = 2.6   # seconds for the frame to grow in

    def __init__(self, sign, cards, seed=0, glyph_fn=None, end_tag="align", sprite_fn=None, **_):
        self.sprite_fn = sprite_fn
        self.sign, self.seed = sign, seed
        tall = any(len(balanced_wrap(c.text, SERIF, 70 * 2 - 42)) > 4 for c in cards)
        self.orn = Ornament(sign, seed, tall)
        self.sky = Sky(sign, seed, self.orn.ring_r)
        self.glyph_fn = glyph_fn
        self.end_tag = end_tag
        self.cards = cards
        self.ticks = []
        t = 1.4
        for cd in cards:
            cd.start = t
            n = len(cd.text)
            if cd.kind == "title":
                cd.dur = 2.6
            elif cd.kind == "end":
                cd.dur = 3.6
            else:
                cd.dur = 2.3 + 0.05 * n
            cd.type_end = t + 0.6
            t += cd.dur
        self.duration = t + 0.6
        self._blocks = {}
        self._static = None
        self.scene = type("S", (), {"kind": "frame"})()

    @property
    def cues(self):
        return [c.start for c in self.cards]

    def _block(self, cd):
        if cd.text not in self._blocks:
            inner = self.orn.ring_r * 2 - 42
            lines = balanced_wrap(cd.text, SERIF, inner)
            if len(lines) <= (4 if self.orn.ring_kind == "circle" else 6):
                im = text_block(lines, SERIF, INK, 17)
            else:
                lines = balanced_wrap(cd.text, SERIF_SM, inner + 6)
                im = text_block(lines, SERIF_SM, INK, 16)
            self._blocks[cd.text] = im
        return self._blocks[cd.text]

    def _glyph_y(self, t):
        cd = next((c for c in self.cards if c.start <= t < c.start + c.dur), self.cards[0])
        ih = self._block(cd).height
        return CY - (ih + 14) // 2 - 4

    def _sky_mask(self, t):
        if not hasattr(self, "_skym"):
            self._skym = np.zeros((H, W), bool)
        return self._skym

    def _ry(self):
        k = self.orn.ring_kind
        return self.orn.ring_r * (1.45 if k == "arch" else 1.25 if k == "oval" else 1.0)

    def frame(self, t) -> np.ndarray:
        a = np.empty((H, W, 3), np.uint8)
        a[:] = BG
        self.sky.draw(a, t)
        grow = t / self.GROW * 1.25
        if grow < 1.3 or self._static is None:
            layer = self.orn.render(grow, t)
            if grow >= 1.3:
                self._static = True
        else:
            layer = self.orn.render(2.0, t)
        la = np.asarray(layer)
        m = la[..., 3] > 0
        a[m] = la[..., :3][m]

        # glyph above the text, inside the ring
        if self.glyph_fn and t > 1.0:
            g = self.glyph_fn(self.sign)
            ga = np.asarray(g.convert("RGBA"))
            gy = self._glyph_y(t) 
            gx = CX - ga.shape[1] // 2
            gm = ga[..., 3] > 127
            if t < 1.6:
                gm &= BAY[gy:gy + ga.shape[0], gx:gx + ga.shape[1]] < (t - 1.0) / 0.6
            a[gy:gy + ga.shape[0], gx:gx + ga.shape[1]][gm] = ga[..., :3][gm]

        # the card text, dissolving in and out
        for cd in self.cards:
            local = t - cd.start
            if -0.01 <= local < cd.dur:
                fade_in = min(1, local / 0.6)
                fade_out = min(1, (cd.dur - local) / 0.5) if cd is not self.cards[-1] else 1
                lvl = min(fade_in, fade_out)
                im = self._block(cd)
                ia = np.asarray(im)
                x0 = CX - ia.shape[1] // 2
                gh = 14 if self.glyph_fn else 0
                y0 = CY - (ia.shape[0] + gh) // 2 + gh
                mm = ia[..., 3] > 0
                mm &= BAY[y0:y0 + ia.shape[0], x0:x0 + ia.shape[1]] < lvl
                a[y0:y0 + ia.shape[0], x0:x0 + ia.shape[1]][mm] = ia[..., :3][mm]

        # the tag, small, under the ring
        if not hasattr(self, "_tag"):
            ti = Image.new("RGBA", (60, 10), (0, 0, 0, 0))
            dd = ImageDraw.Draw(ti)
            dd.fontmode = "1"
            tw = TAG.getlength(self.end_tag)
            dd.text(((60 - tw) / 2, 0), self.end_tag, font=TAG, fill=mix(GOLD, BG, 0.25) + (255,))
            self._tag = np.asarray(ti)
        ty = CY + int(self._ry()) + 7
        if self.sprite_fn and t > 2.0:
            sp = np.asarray(self.sprite_fn(self.sign, t).convert("RGBA"))
            local = t - 2.0
            hop = int(round(12 * (1 - local / 0.45) ** 2)) if local < 0.45 else 0
            for cd in self.cards[1:]:
                k = t - cd.start
                if 0 <= k < 0.3:
                    hop = int(round(3 * math.sin(math.pi * k / 0.3)))
            sh, sw = sp.shape[:2]
            feet = ty + 4 + sh
            # clear a soft pocket of sky behind the creature so vines don't tangle with it
            pocket = ((np.mgrid[0:H, 0:W][1] - CX) / (sw * 0.75)) ** 2 + \
                     ((np.mgrid[0:H, 0:W][0] - (feet - sh / 2)) / (sh * 0.8)) ** 2 < 1
            a[pocket & (np.abs(a.astype(int) - BG).sum(axis=2) > 0) & ~self._sky_mask(t)] = BG
            sx, sy = CX - sw // 2, feet - sh - hop
            sm = sp[..., 3] > 127
            if local < 0.25:
                sm &= BAY[sy:sy + sh, sx:sx + sw] < local / 0.25
            a[sy:sy + sh, sx:sx + sw][sm] = sp[..., :3][sm]
            for x in range(CX - sw // 3, CX + sw // 3, 2):
                a[feet + 1, x] = mix(self.orn.light, BG, 0.5)
            ty = feet + 5
        tm = self._tag[..., 3] > 0
        a[ty:ty + 10, CX - 30:CX + 30][tm] = self._tag[..., :3][tm]

        # fade in from black / out at the end
        if t < 0.6:
            a[BAY > t / 0.6] = BG
        tail = self.duration - t
        if tail < 0.5:
            a[BAY > tail / 0.5] = BG
        return a


def upscale(a: np.ndarray) -> np.ndarray:
    """4x nearest-neighbour, then a woven mesh: the last row/column of each
    pixel cell is darkened, which gives the needlepoint texture."""
    b = np.repeat(np.repeat(a, SCALE, axis=0), SCALE, axis=1)
    lum = a.astype(np.int16).sum(axis=2)
    lit = np.repeat(np.repeat(lum > 90, SCALE, axis=0), SCALE, axis=1)
    grid = np.zeros(b.shape[:2], bool)
    grid[SCALE - 1::SCALE, :] = True
    grid[:, SCALE - 1::SCALE] = True
    sel = grid & lit
    b[sel] = (b[sel].astype(np.uint16) * 3 // 4).astype(np.uint8)
    return b
