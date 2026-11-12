"""Instagram profile pictures: a glowing four-pointed star over a graded painting.

  python3 tools/profile.py moon:2 stars:4 water:34   # pool:index pairs -> out/profile/

1080x1080 PNG. Everything that matters sits inside the circle Instagram crops to;
the star is centred and sized to read at 110 px, the size the profile shows.
"""
import json, os, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import render  # noqa: E402

S, SS = 1080, 3


def star_mask(size, r_long=0.25, r_short=0.175, pinch=4.6):
    """A four-pointed sparkle: concave sides (a stretched astroid), the vertical
    rays a little longer than the horizontal, as in a twinkling star."""
    n = size * SS
    t = np.linspace(0, 2 * np.pi, 2000)
    x = np.sign(np.cos(t)) * np.abs(np.cos(t)) ** pinch * r_short
    y = np.sign(np.sin(t)) * np.abs(np.sin(t)) ** pinch * r_long
    pts = [(n / 2 + a * n, n / 2 + b * n) for a, b in zip(x, y)]
    m = Image.new("L", (n, n), 0)
    ImageDraw.Draw(m).polygon(pts, fill=255)
    return m.resize((size, size), Image.LANCZOS)


def make(item, out):
    bg = render.grade(Image.open(render.ensure_file(item)), S, item).astype(np.float32) / 255
    # quiet the centre a touch so the star owns it, and darken the corners Instagram crops away
    y, x = np.mgrid[0:S, 0:S].astype(np.float32) / S - 0.5
    r = np.sqrt(x * x + y * y)
    bg *= (1 - 0.25 * np.clip(1 - r / 0.22, 0, 1))[..., None]
    bg *= (1 - 0.45 * np.clip((r - 0.36) / 0.2, 0, 1))[..., None]
    m = np.asarray(star_mask(S), np.float32) / 255
    glow_wide = np.asarray(Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(S / 14)), np.float32) / 255
    glow_near = np.asarray(Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(S / 60)), np.float32) / 255
    halo = np.clip(1 - r / 0.42, 0, 1) ** 2.2  # soft round bloom behind the star
    cream = np.array([0xf6, 0xef, 0xe2], np.float32) / 255
    light = np.array([0.75, 0.85, 1.0], np.float32)
    a = bg
    a = 1 - (1 - a) * (1 - (halo * 0.22)[..., None] * light)
    a = 1 - (1 - a) * (1 - (glow_wide * 0.7)[..., None] * light)
    a = 1 - (1 - a) * (1 - (glow_near * 0.9)[..., None] * cream)
    a = a * (1 - m[..., None]) + cream * m[..., None]
    Image.fromarray((np.clip(a, 0, 1) * 255 + 0.5).astype(np.uint8)).save(out)
    print(out)


if __name__ == "__main__":
    for spec in sys.argv[1:]:
        pool, i = spec.split(":")
        item = render.load_pool(pool)[int(i)]
        make(item, os.path.join(render.HERE, "out", "profile", f"align-profile-{pool}-{i}.png"))
