#!/usr/bin/env python3
"""Measure the gradient lines ffmpeg really draws, for web/build.py.

render.py hands ffmpeg's `gradients` source a corner-to-corner line plus a
random seed, and the seed swings the blend's angle and length on every
render. This renders a black-to-white gradient for each of render.py's
DIAGONALS at many random seeds, fits the brightness to a straight ramp, and
saves the real start and end points to gradient_lines.json, so the web
page's gradients vary exactly the way the Python renders do.

    python3 web/measure_gradients.py      # needs ffmpeg; ~1 minute
"""

import json
import os
import random
import subprocess
import sys

WEB = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(WEB))
import render  # noqa: E402

SEEDS_PER_LINE = 24
W, H = render.W, render.H


def measured_line(line, seed):
    x0, y0, x1, y1 = line
    src = (f"gradients=s={W}x{H}:c0=#000000:c1=#ffffff:nb_colors=2:type=0"
           f":x0={x0}:y0={y0}:x1={x1}:y1={y1}"
           f":speed=0.02:seed={seed}:rate=30:duration=1")
    raw = subprocess.run([render.FFMPEG, "-v", "error", "-f", "lavfi", "-i", src,
                          "-frames:v", "1", "-f", "rawvideo", "-pix_fmt", "gray", "-"],
                         capture_output=True, check=True).stdout
    # least-squares fit of brightness = a*x + b*y + c over the unclamped pixels
    s = [[0.0] * 3 for _ in range(3)]
    r = [0.0] * 3
    n = 0
    for y in range(0, H, 24):
        for x in range(0, W, 24):
            v = raw[y * W + x]
            if 3 < v < 252:
                n += 1
                f = (x, y, 1)
                for i in range(3):
                    r[i] += f[i] * v / 255
                    for j in range(3):
                        s[i][j] += f[i] * f[j]
    if n < 50:
        return None  # a ramp too short to fit; the caller picks another seed
    for i in range(3):
        for j in range(i + 1, 3):
            k = s[j][i] / s[i][i]
            s[j] = [s[j][n] - k * s[i][n] for n in range(3)]
            r[j] -= k * r[i]
    sol = [0.0] * 3
    for i in (2, 1, 0):
        sol[i] = (r[i] - sum(s[i][n] * sol[n] for n in range(i + 1, 3))) / s[i][i]
    a, b, c = sol
    q = a * a + b * b
    sx, sy = -c * a / q, -c * b / q
    return [round(sx, 1), round(sy, 1), round(sx + a / q, 1), round(sy + b / q, 1)]


def main():
    out = []
    for line in render.DIAGONALS:
        lines = []
        while len(lines) < SEEDS_PER_LINE:
            fit = measured_line(line, random.randrange(100000))
            if fit:
                lines.append(fit)
        out.append(lines)
        print(f"measured {line}")
    with open(os.path.join(WEB, "gradient_lines.json"), "w") as f:
        json.dump(out, f)
    print("wrote web/gradient_lines.json")


if __name__ == "__main__":
    main()
