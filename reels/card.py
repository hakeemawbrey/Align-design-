"""Build a tarot-format zodiac card from a Urania's Mirror plate.

The plate (landscape, 1825, public domain) is cropped to a portrait window around
the figure, framed like a Rider-Waite card: numeral on top, name in a box below.

  python3 card.py aries                 # uses picks/aries.json "plate" + "crop"
  python3 card.py aries --plate x.jpg   # try a plate file directly
"""
import argparse
import json
import os

import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFont, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
SIGNS = json.load(open(os.path.join(HERE, "signs.json")))
FONT = os.path.join(HERE, "assets", "fonts", "IMFellEnglishSC-Regular.ttf")

W, H = 700, 1200                # card, tarot proportions (~0.58)
M = 26                          # outer white margin
ART = (M + 12, M + 12, W - M - 12, H - M - 128)   # art window
LABEL = (M + 12, H - M - 112, W - M - 12, H - M - 12)
INK = (24, 22, 20)
STOCK = (247, 243, 232)


def auto_crop(plate, aspect):
    """Portrait window centred on the figure's ink mass."""
    w, h = plate.size
    # drop the plate's own border and title band
    x0, y0, x1, y1 = int(w * 0.035), int(h * 0.075), int(w * 0.965), int(h * 0.955)
    inner = plate.crop((x0, y0, x1, y1))
    a = np.asarray(inner.resize((200, int(200 * inner.height / inner.width))), dtype=np.float32) / 255
    sat = a.max(2) - a.min(2)
    dark = 1 - a.mean(2)
    ink = np.clip(sat * 1.5 + dark - 0.35, 0, None)
    cols = ink.sum(0)
    cx = (cols * np.arange(len(cols))).sum() / max(cols.sum(), 1e-6) / len(cols)
    ih = inner.height
    cw = min(inner.width, ih * aspect)
    left = np.clip(cx * inner.width - cw / 2, 0, inner.width - cw)
    return (x0 + left, y0, x0 + left + cw, y0 + ih)


def build(sign, plate_path, crop=None):
    cfg = SIGNS[sign]
    plate = ImageOps.exif_transpose(Image.open(plate_path)).convert("RGB")
    aw, ah = ART[2] - ART[0], ART[3] - ART[1]
    if crop:
        pw, ph = plate.size
        box = (crop[0] * pw, crop[1] * ph, crop[2] * pw, crop[3] * ph)
    else:
        box = auto_crop(plate, aw / ah)
    art = ImageOps.fit(plate.crop(tuple(int(v) for v in box)), (aw, ah), Image.LANCZOS)
    # the plates are pale; give the ink and colour real weight so the ghosted
    # card reads like the reference's full-contrast Rider-Waite art
    art = ImageEnhance.Contrast(ImageOps.autocontrast(art, cutoff=1)).enhance(1.35)
    art = ImageEnhance.Color(art).enhance(1.45)

    card = Image.new("RGB", (W, H), (255, 255, 255))
    d = ImageDraw.Draw(card)
    d.rectangle([M, M, W - M, H - M], fill=STOCK, outline=INK, width=5)
    card.paste(art, ART[:2])
    d.rectangle(ART, outline=INK, width=4)

    # numeral plaque, top centre (sits over the art like RWS)
    f_num = ImageFont.truetype(FONT, 54)
    num = cfg["numeral"]
    tw = d.textlength(num, font=f_num)
    px0, px1 = W / 2 - tw / 2 - 22, W / 2 + tw / 2 + 22
    d.rectangle([px0, ART[1], px1, ART[1] + 70], fill=STOCK, outline=INK, width=4)
    d.text((W / 2, ART[1] + 37), num, font=f_num, fill=INK, anchor="mm")

    # name box
    d.rectangle(LABEL, fill=STOCK, outline=INK, width=4)
    name = cfg["name"].upper() + "."
    size = 78
    while True:
        f_name = ImageFont.truetype(FONT, size)
        if d.textlength(name, font=f_name) < (LABEL[2] - LABEL[0]) - 50 or size < 40:
            break
        size -= 2
    d.text((W / 2, (LABEL[1] + LABEL[3]) / 2 + 2), name, font=f_name, fill=INK, anchor="mm")

    # light paper grain; no blur, the card has to stay crisp as a 36% ghost
    rng = np.random.default_rng(7)
    a = np.asarray(card, dtype=np.float32)
    a += rng.normal(0, 4, a.shape[:2])[..., None]
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("sign")
    ap.add_argument("--plate")
    ap.add_argument("--crop", type=float, nargs=4, metavar=("X0", "Y0", "X1", "Y1"))
    ap.add_argument("--out")
    a = ap.parse_args()
    crop = a.crop
    plate = a.plate
    if not plate:
        picks = json.load(open(os.path.join(HERE, "picks", f"{a.sign}.json")))
        plate = os.path.join(HERE, picks["plate"]["file"])
        crop = picks["plate"].get("crop")
    out = a.out or os.path.join(HERE, "cache", a.sign, "card.png")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    build(a.sign, plate, crop).save(out)
    print(out)


if __name__ == "__main__":
    main()
