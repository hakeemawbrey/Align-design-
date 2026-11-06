"""The twelve sign drawings, as marker strokes on a 100 x 130 sheet (y grows down).

Each sign returns a list of (colour, points) in drawing order: the ground or water
first (it carries the low, steady part of the tune), then the subject, then the
details, and the sign's glyph last, in the top-left corner. All art is original.
"""
import math
import zlib

import numpy as np

# marker colours -> each one is an instrument in sound.py
INK, RED, VIOLET, ORANGE, BLUE, PINK, SKY, GREEN, SAND = (
    "ink", "red", "violet", "orange", "blue", "pink", "sky", "green", "sand")


# ---------- primitives ----------

def catmull(pts, per=10):
    """A smooth curve through the given points."""
    p = [np.array(q, float) for q in pts]
    if len(p) < 3:
        return [tuple(q) for q in p]
    p = [p[0]] + p + [p[-1]]
    out = []
    for i in range(1, len(p) - 2):
        p0, p1, p2, p3 = p[i - 1], p[i], p[i + 1], p[i + 2]
        for t in np.linspace(0, 1, per, endpoint=False):
            t2, t3 = t * t, t * t * t
            out.append(0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2
                              + (-p0 + 3 * p1 - 3 * p2 + p3) * t3))
    out.append(p[-2])
    return [tuple(q) for q in out]


def P(*pts):
    return catmull(pts)


def poly(*pts):
    return [tuple(map(float, q)) for q in pts]


def arc(cx, cy, rx, ry, a0, a1, n=None):
    n = n or max(8, int(abs(a1 - a0) / 6))
    return [(cx + rx * math.cos(math.radians(a)), cy + ry * math.sin(math.radians(a)))
            for a in np.linspace(a0, a1, n)]


def circle(cx, cy, r, a0=-90):
    return arc(cx, cy, r, r, a0, a0 + 360)


def spiral(cx, cy, r0, r1, a0, a1):
    n = max(12, int(abs(a1 - a0) / 5))
    return [(cx + r * math.cos(math.radians(a)), cy + r * math.sin(math.radians(a)))
            for a, r in zip(np.linspace(a0, a1, n), np.linspace(r0, r1, n))]


def wave(x0, x1, y, amp, cycles, phase=0):
    n = max(16, int((x1 - x0) * 1.5))
    return [(x, y - amp * math.sin(phase + 2 * math.pi * cycles * (x - x0) / (x1 - x0)))
            for x in np.linspace(x0, x1, n)]


def mirror(pts, axis=50):
    return [(2 * axis - x, y) for x, y in pts]


def shift(pts, dx=0, dy=0):
    return [(x + dx, y + dy) for x, y in pts]


def dot(cx, cy, r=1.1):
    return circle(cx, cy, r)


def sparkle(cx, cy, s=3):
    return [poly((cx, cy - s), (cx, cy + s)), poly((cx - s, cy), (cx + s, cy))]


def sun(cx, cy, r, rays=7, colour=ORANGE, ray_colour=None):
    out = [(INK if ray_colour is None else colour, circle(cx, cy, r))]
    for k in range(rays):
        a = math.radians(-160 + k * 360 / rays)
        out.append((ray_colour or colour, poly((cx + (r + 3) * math.cos(a), cy + (r + 3) * math.sin(a)),
                                              (cx + (r + 7) * math.cos(a), cy + (r + 7) * math.sin(a)))))
    return out


def stars(*xy, colour=VIOLET, s=2.6):
    out = []
    for x, y in xy:
        out += [(colour, q) for q in sparkle(x, y, s)]
    return out


def crescent(cx, cy, r, colour):
    outer = arc(cx, cy, r, r, 60, 300)
    # inner arc through the two tips, bulging the same way but less
    tip_top, tip_bot = outer[-1], outer[0]
    ic = (cx + r * 0.75, cy)
    ri = math.dist(ic, tip_bot)
    a_bot = math.degrees(math.atan2(tip_bot[1] - ic[1], tip_bot[0] - ic[0]))
    a_top = math.degrees(math.atan2(tip_top[1] - ic[1], tip_top[0] - ic[0])) % 360
    inner = arc(ic[0], ic[1], ri, ri, a_top, a_bot)
    return [(colour, outer + inner)]


def grass(x0, x1, y, h=5, step=4):
    pts, x, up = [], x0, False
    while x <= x1:
        pts.append((x, y - (h if up else 0)))
        x += step / 2
        up = not up
    return poly(*pts)


# ---------- glyphs (top-left box, about x 7..27, y 7..26) ----------

GLYPH = {
    "aries": [P((17, 25), (16, 15), (13, 9.5), (9, 9.5), (7.5, 13), (9.5, 16.5)),
              P((17, 25), (18, 15), (21, 9.5), (25, 9.5), (26.5, 13), (24.5, 16.5))],
    "taurus": [circle(17, 20, 5), arc(17, 8.5, 7.5, 6.5, 0, 180)],
    "gemini": [P((9, 8.5), (17, 10.5), (25, 8.5)), P((9, 25), (17, 23), (25, 25)),
               poly((13.5, 10), (13.5, 23.5)), poly((20.5, 10), (20.5, 23.5))],
    "cancer": [circle(11.5, 12.5, 3) + P((11.5, 9.5), (18, 8.3), (25.5, 11.5)),
               circle(22.5, 21, 3, 90) + P((22.5, 24), (16, 25.2), (8.5, 22))],
    "leo": [arc(11, 20, 3.2, 3.2, 90, 450) + P((11, 23.2), (12.5, 16), (12.5, 10), (17, 7), (22, 9.5),
                                              (21, 16), (19, 21.5), (21.5, 25), (25.5, 22.5))],
    "virgo": [P((7.5, 11), (9.5, 9), (10.5, 12), (10.5, 24)),
              P((10.5, 12), (13, 9), (15, 12), (15, 24)),
              P((15, 12), (17.5, 9), (19.5, 12), (19.5, 20), (23, 16.5), (24.5, 20), (21, 24.5), (17, 26))],
    "libra": [poly((7, 24.5), (27, 24.5)),
              poly((7, 19.5), (12.5, 19.5)) + arc(17, 19.5, 4.5, 6, 180, 360) + poly((21.5, 19.5), (27, 19.5))],
    "scorpio": [P((6.5, 11), (8.5, 9), (9.5, 12), (9.5, 23)),
                P((9.5, 12), (12, 9), (14, 12), (14, 23)),
                P((14, 12), (16.5, 9), (18.5, 12), (18.5, 21), (21, 24), (25, 21)),
                poly((21.5, 20.5), (25, 21), (24.5, 24.5))],
    "sagittarius": [poly((8, 25), (25, 8)), poly((17, 8), (25, 8), (25, 16)), poly((11.5, 15), (18, 21.5))],
    "capricorn": [poly((7, 9), (11, 23), (15, 9)),
                  P((15, 9), (16.5, 18), (20.5, 21.5), (24, 18.5), (21.5, 15), (18, 18.5), (16.5, 26))],
    "aquarius": [poly(*[(7 + 3.3 * i, 13 - 3 * (i % 2)) for i in range(7)]),
                 poly(*[(7 + 3.3 * i, 21 - 3 * (i % 2)) for i in range(7)])],
    "pisces": [arc(3, 17, 7, 9.5, -65, 65), arc(31, 17, 7, 9.5, 115, 245), poly((9, 17), (25, 17))],
}


# ---------- the drawings ----------

def aries():
    s = [(SAND, P((4, 118), (28, 108), (60, 111), (96, 103))),
         (INK, P((40, 50), (38.5, 66), (42.5, 83), (50, 90), (57.5, 83), (61.5, 66), (60, 50))),
         (INK, P((40, 50), (50, 45), (60, 50))),
         (ORANGE, spiral(31, 55, 11.4, 2.5, -38, -38 - 560)),
         (ORANGE, mirror(spiral(31, 55, 11.4, 2.5, -38, -38 - 560))),
         (INK, dot(45, 62, 1.4)), (INK, dot(55, 62, 1.4)),
         (INK, P((46.5, 80), (50, 82.5), (53.5, 80))),
         (GREEN, poly((14, 108), (12, 101))), (GREEN, poly((16, 108), (18, 102))),
         (GREEN, poly((82, 103), (80, 96))), (GREEN, poly((84, 103), (86, 97)))]
    s += sun(80, 24, 6.5)
    s += stars((48, 28), (20, 40), (64, 34))
    return s


def taurus():
    s = [(GREEN, grass(4, 96, 113, 5, 4)),
         (PINK, circle(16, 101, 2.4)), (PINK, circle(80, 99, 2.4)), (PINK, circle(70, 104, 2.0)),
         (GREEN, poly((16, 103.4), (16, 110))), (GREEN, poly((80, 101.4), (80, 109))),
         (INK, P((36, 52), (34, 70), (40, 88), (50, 92), (60, 88), (66, 70), (64, 52), (50, 48), (36, 52))),
         (SAND, P((37, 51), (29, 48), (24, 42), (24, 34))),
         (SAND, mirror(P((37, 51), (29, 48), (24, 42), (24, 34)))),
         (INK, P((35, 56), (26, 57), (29, 62), (35, 61))),
         (INK, mirror(P((35, 56), (26, 57), (29, 62), (35, 61)))),
         (INK, dot(43, 64, 1.4)), (INK, dot(57, 64, 1.4)),
         (RED, arc(50, 81, 9, 6, 0, 360)),
         (INK, dot(46, 81, 1)), (INK, dot(54, 81, 1)),
         (ORANGE, arc(50, 90.5, 3.6, 3.6, -60, 240))]
    s += sun(84, 20, 5)
    s += stars((44, 30), (60, 26))
    return s


def gemini():
    fig = lambda dx: [poly((29 + dx, 104), (35 + dx, 85), (41 + dx, 104)), poly((35 + dx, 55), (35 + dx, 85))]
    s = [(GREEN, P((5, 106), (50, 102.5), (95, 106)))]
    s += [(ORANGE, circle(35, 48, 7))] + [(ORANGE, q) for q in fig(0)]
    s += [(BLUE, circle(65, 48, 7))] + [(BLUE, q) for q in fig(30)]
    s += [(VIOLET, P((35, 65), (50, 71), (65, 65))),
          (ORANGE, poly((35, 65), (24, 75))), (BLUE, poly((65, 65), (76, 75))),
          (INK, arc(35, 49, 3.5, 3, 20, 160)), (INK, arc(65, 49, 3.5, 3, 20, 160)),
          (INK, dot(32.5, 46, 0.9)), (INK, dot(37.5, 46, 0.9)),
          (INK, dot(62.5, 46, 0.9)), (INK, dot(67.5, 46, 0.9)),
          (SKY, spiral(80, 26, 7, 1, 0, 600)), (SKY, spiral(60, 22, 4.5, 0.8, 180, 700))]
    s += stars((44, 28), (88, 46), (14, 44))
    return s


def cancer():
    s = [(BLUE, wave(4, 96, 109, 2.5, 4)),
         (SKY, wave(8, 42, 118, 1.6, 2)), (SKY, wave(54, 92, 121, 1.6, 2)),
         (RED, arc(50, 78, 18, 11, 0, 360)),
         (RED, P((34, 74), (27, 67), (24.5, 58))), (RED, mirror(P((34, 74), (27, 67), (24.5, 58)))),
         (RED, arc(23, 51, 6, 7, -60, 235)), (RED, mirror(arc(23, 51, 6, 7, -60, 235)))]
    for i in range(3):
        leg = P((34, 81 + i * 3), (26, 85 + i * 4), (22, 92 + i * 4))
        s += [(RED, leg), (RED, mirror(leg))]
    s += [(INK, poly((45, 68), (43, 59))), (INK, poly((55, 68), (57, 59))),
          (INK, dot(43, 57.5, 1.7)), (INK, dot(57, 57.5, 1.7)),
          (INK, arc(50, 79, 5, 3.2, 20, 160))]
    s += crescent(80, 24, 8, SAND)
    s += stars((52, 30), (36, 36), (66, 40))
    return s


def leo():
    mane = [(50 + (24 + 3 * math.sin(10 * a)) * math.cos(a), 62 + (24 + 3 * math.sin(10 * a)) * math.sin(a))
            for a in np.linspace(-math.pi / 2, 1.5 * math.pi, 140)]
    s = [(SAND, P((4, 113), (50, 104), (96, 113))),
         (GREEN, poly((14, 108), (12, 101))), (GREEN, poly((16, 108), (18, 102))),
         (GREEN, poly((84, 108), (82, 101))), (GREEN, poly((86, 108), (88, 102))),
         (ORANGE, mane),
         (SAND, circle(50, 64, 15)),
         (SAND, arc(39, 51, 4, 4, 160, 380)), (SAND, arc(61, 51, 4, 4, 160, 380)),
         (INK, dot(44, 60, 1.4)), (INK, dot(56, 60, 1.4)),
         (INK, poly((46.5, 66.5), (53.5, 66.5), (50, 70.5), (46.5, 66.5))),
         (INK, poly((50, 70.5), (50, 73.5))),
         (INK, P((44.5, 73), (47.5, 76), (50, 73.5), (52.5, 76), (55.5, 73)))]
    s += stars((84, 30), (50, 28), (20, 44), colour=ORANGE)
    return s


def virgo():
    s = [(GREEN, P((4, 112), (50, 109), (96, 112))),
         (SAND, wave(6, 94, 120, 1.2, 5))]
    stalks = [((38, 110), (40, 80), (34, 50)), ((50, 110), (50, 78), (50, 42)), ((62, 110), (60, 80), (66, 50))]
    for st in stalks:
        s.append((GREEN, P(*st)))
    for (x0, y0), (x1, y1), (x2, y2) in stalks:
        for k in range(5):
            t = k / 5
            x, y = x2 + (x1 - x2) * t * 0.7, y2 + (y1 - y2) * t * 0.7
            s.append((SAND, poly((x - 3.5, y - 3.5), (x, y), (x + 3.5, y - 3.5))))
    s += [(GREEN, P((50, 92), (58, 86), (65, 84.5))), (GREEN, P((41, 97), (35, 91), (29, 89.5)))]
    s += sun(80, 24, 6)
    s += stars((24, 46), (70, 40))
    return s


def libra():
    pan = arc(22, 70, 9, 5, 180, 0)
    s = [(GREEN, P((5, 110), (50, 107), (95, 110))),
         (INK, poly((50, 40), (50, 100))), (INK, P((37, 104), (50, 100), (63, 104))),
         (INK, P((22, 44), (50, 40), (78, 44))), (INK, circle(50, 37, 2.4)),
         (INK, poly((14, 70), (22, 44), (30, 70))), (INK, mirror(poly((14, 70), (22, 44), (30, 70)))),
         (ORANGE, poly((13, 70)) + pan[::-1]), (BLUE, mirror(poly((13, 70)) + pan[::-1])),
         (PINK, P((22, 67), (19, 63), (20, 60.5), (22, 62), (24, 60.5), (25, 63), (22, 67))),
         (PINK, mirror(P((22, 67), (19, 63), (20, 60.5), (22, 62), (24, 60.5), (25, 63), (22, 67))))]
    cloud = arc(68, 24, 4, 4, 180, 360) + arc(75, 21, 5, 5, 180, 360) + arc(83, 24, 4, 4, 180, 360) \
        + poly((87, 24), (64, 24))
    s += [(SKY, cloud), (SKY, shift(cloud, -30, 6))]
    s += stars((88, 40), (14, 40))
    return s


def scorpio():
    s = [(SAND, P((4, 114), (30, 104), (56, 112), (80, 104), (96, 110))),
         (RED, arc(36, 84, 10, 6, 0, 360)),
         (RED, P((46, 84), (56, 80), (63, 70), (65, 58), (61, 48), (54, 44), (50, 47))),
         (INK, poly((51.5, 44.5), (47, 48), (49.5, 52))),
         (RED, poly((27, 81), (19, 76))), (RED, arc(15, 72, 4.5, 5, -30, 250)),
         (RED, poly((27, 87), (19, 92))), (RED, arc(15, 96, 4.5, 5, -250, 30))]
    for x in (31, 35, 39, 43):
        s.append((INK, poly((x, 89.5), (x - 2 + (x - 37) * 0.3, 97))))
    for x, y in ((58, 77), (62.5, 68), (64, 59), (61, 50)):
        s.append((INK, poly((x - 2, y - 1), (x + 2, y + 1))))
    s += [(INK, dot(30, 82, 1)), (INK, dot(30, 86, 1))]
    s += crescent(80, 26, 8, VIOLET)
    s += stars((46, 30), (88, 48), (30, 46), colour=SKY)
    return s


def sagittarius():
    s = [(INK, poly((4, 112), (20, 92), (30, 102), (46, 80), (62, 104), (74, 90), (96, 112))),
         (SKY, poly((41, 86), (44, 84), (46, 87), (48.5, 84), (51, 87))),
         (SKY, poly((16.5, 96), (18.5, 95), (20, 97), (21.5, 95), (23.5, 96.5))),
         (ORANGE, arc(30, 58, 16, 26, -80, 80)),
         (INK, poly((32.8, 32.4), (24, 58), (32.8, 83.6))),
         (RED, poly((24, 58), (80, 40))),
         (RED, poly((73.5, 37.5), (80, 40), (75.5, 45.5))),
         (GREEN, poly((24.5, 57.8), (19.5, 53.5))), (GREEN, poly((27.5, 56.9), (22.5, 52.5))),
         (VIOLET, circle(88, 34, 3.5))]
    s += stars((88, 34), colour=VIOLET, s=6.5)
    s += stars((56, 24), (40, 30), (70, 60), colour=ORANGE)
    return s


def capricorn():
    goat_horn = P((65, 44.5), (62.5, 40.5), (59, 40), (57.5, 42.5))
    s = [(INK, poly((4, 112), (26, 82), (38, 94), (47.5, 61), (65.5, 61), (78, 92), (86, 85), (96, 100))),
         (SKY, poly((44, 70), (47.5, 67), (51, 70.5), (55, 66.5), (59, 70.5), (63, 66.5), (67.5, 70))),
         (SKY, poly((21.5, 88), (24, 86), (26, 89), (28.5, 86.5), (30.5, 88.5)))]
    for k in range(6):
        t0, t1 = k / 6, k / 6 + 0.09
        a, b = (14, 108), (44, 70)
        s.append((RED, poly((a[0] + (b[0] - a[0]) * t0 + 4 * (k % 2), a[1] + (b[1] - a[1]) * t0),
                            (a[0] + (b[0] - a[0]) * t1 + 4 * (k % 2), a[1] + (b[1] - a[1]) * t1))))
    goat = [(SAND, arc(56, 52.5, 7.5, 4.2, 0, 360)),
            (SAND, P((62, 50), (64.5, 46), (66.5, 45.5), (67.5, 48))),
            (INK, poly((50.5, 55), (50, 60))), (INK, poly((53.5, 56.5), (53.5, 60))),
            (INK, poly((58.5, 56.5), (58.5, 60))), (INK, poly((61.5, 55), (62, 60))),
            (ORANGE, goat_horn),
            (INK, poly((49, 51), (46, 54))), (INK, dot(65.5, 46.3, 0.5))]
    s += [(c, [(56 + (x - 56) * 1.7, 60 + (y - 60) * 1.7) for x, y in q]) for c, q in goat]
    s += sun(24, 46, 5)
    s += stars((44, 26), (88, 40), (84, 60))
    return s


def aquarius():
    s = [(BLUE, wave(28, 96, 100, 2, 3)), (SKY, wave(14, 90, 110, 1.6, 3)), (SKY, wave(40, 96, 119, 1.5, 2)),
         (ORANGE, arc(32, 60, 13, 15, -55, 235)),
         (ORANGE, P((24.5, 47.5), (26, 40), (36, 37), (39.5, 47.5))),
         (ORANGE, poly((36, 37.2), (44, 35.5), (40, 41))),
         (ORANGE, arc(18, 58, 5, 8, 90, 270)),
         (BLUE, P((44, 37), (53, 42), (59, 53), (62, 66), (64, 80), (66, 96))),
         (SKY, P((43, 40), (51, 48), (56, 60), (58, 76), (60, 96))),
         (RED, wave(22, 42, 64, 1.4, 2))]
    s += [(SKY, spiral(82, 26, 6, 1, 0, 600))]
    s += stars((56, 24), (70, 44), (16, 44))
    return s


def pisces():
    body = P((30, 48), (42, 40), (56, 43.5), (62, 50), (56, 56.5), (42, 60), (30, 52))
    tail = poly((62, 50), (70, 42.5), (68, 50), (70, 57.5), (62, 50))
    flip = lambda pts: shift(mirror(pts), 0, 36)
    s = [(SAND, P((4, 121), (50, 116), (96, 121))),
         (GREEN, P((14, 118), (12, 108), (16, 100), (13, 92))), (GREEN, P((86, 118), (88, 106), (84, 98), (87, 90))),
         (BLUE, body), (BLUE, tail), (INK, dot(35.5, 48, 1.1)),
         (PINK, flip(body)), (PINK, flip(tail)), (INK, dot(64.5, 84, 1.1)),
         (VIOLET, P((29.5, 51), (22, 62), (32, 71), (60, 74), (70.5, 85))),
         (SKY, circle(25, 40, 1.6)), (SKY, circle(21, 33, 2.2)),
         (SKY, circle(77, 75, 1.6)), (SKY, circle(81, 68, 2.2))]
    s += crescent(80, 24, 7, SAND)
    s += stars((52, 26), (40, 104))
    return s


SIGNS = ["aries", "taurus", "gemini", "cancer", "leo", "virgo",
         "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"]
DRAW = {n: globals()[n] for n in SIGNS}


def strokes(sign, seed=0):
    """Resampled, hand-wobbled strokes for a sign: list of dicts {colour, pts (N,2), cum, length}."""
    rng = np.random.default_rng(zlib.crc32(sign.encode()) + seed)
    out = []
    for colour, pts in DRAW[sign]() + [(VIOLET, g) for g in GLYPH[sign]]:
        p = resample(np.array(pts, float), 0.5)
        if len(p) > 3:
            seg = np.r_[0, np.cumsum(np.hypot(*np.diff(p, axis=0).T))]
            L = seg[-1]
            n = np.gradient(p, axis=0)[:, ::-1] * [1, -1]
            n /= np.maximum(np.hypot(*n.T), 1e-6)[:, None]
            w = sum(a * np.sin(seg / l + ph) for a, l, ph in
                    zip(rng.uniform(0.12, 0.3, 2), rng.uniform(3, 9, 2), rng.uniform(0, 6.3, 2)))
            p = p + n * w[:, None]
        seg = np.r_[0, np.cumsum(np.hypot(*np.diff(p, axis=0).T))]
        out.append({"colour": colour, "pts": p, "cum": seg, "length": max(seg[-1], 0.5)})
    return out


def resample(p, step):
    if len(p) < 2:
        return p
    d = np.r_[0, np.cumsum(np.hypot(*np.diff(p, axis=0).T))]
    if d[-1] == 0:
        return p[:1]
    t = np.linspace(0, d[-1], max(2, int(d[-1] / step) + 1))
    return np.c_[np.interp(t, d, p[:, 0]), np.interp(t, d, p[:, 1])]
