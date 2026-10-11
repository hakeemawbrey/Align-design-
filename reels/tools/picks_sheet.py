"""Preview a picks file the way the reel will show it: each image graded, cropped
9:16 at its focus point, with the ghosted card on top. Plus the card itself.

  python3 tools/picks_sheet.py aries [out.jpg]
"""
import json
import os
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFont

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import card as cardmod  # noqa: E402
import render  # noqa: E402

sign = sys.argv[1]
out = sys.argv[2] if len(sys.argv) > 2 else os.path.join(render.HERE, "cache", sign, "picks-sheet.jpg")
picks = json.load(open(os.path.join(render.HERE, "picks", f"{sign}.json")))
cfg = render.SIGNS[sign]
W, H = 270, 480
card_img = cardmod.build(sign, render.ensure_file(picks["plate"]), picks["plate"].get("crop"))
cm = render.card_rgba(card_img, int(W * render.STYLE["card_w"]))
tiles = [np.asarray(card_img.resize((W, int(card_img.height * W / card_img.width))).crop((0, 0, W, H)))]
for it in picks["images"]:
    bg = render.grade(Image.open(render.ensure_file(it)), cfg["grade"], W, H,
                      tuple(it.get("focus", (0.5, 0.5))), over=1.0)
    f = bg.astype(np.float32) / 255
    render.paste(f, cm, W / 2, H / 2, render.STYLE["card_alpha"])
    tiles.append((np.clip(f, 0, 1) * 255).astype(np.uint8))
cols = 7
rows = (len(tiles) + cols - 1) // cols
sheet = Image.new("RGB", (cols * (W + 6), rows * (H + 6)), (15, 15, 15))
font = ImageFont.truetype("DejaVuSans-Bold.ttf", 18)
d = ImageDraw.Draw(sheet)
for i, t in enumerate(tiles):
    x, y = (i % cols) * (W + 6) + 3, (i // cols) * (H + 6) + 3
    sheet.paste(Image.fromarray(t), (x, y))
    d.rectangle([x, y, x + 40, y + 24], fill=(0, 0, 0))
    d.text((x + 4, y + 2), "card" if i == 0 else str(i - 1), fill=(255, 220, 80), font=font)
os.makedirs(os.path.dirname(out), exist_ok=True)
sheet.save(out, quality=85)
print(out)
