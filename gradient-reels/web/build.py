#!/usr/bin/env python3
"""Build web/index.html, the cloud version of the review dashboard.

Genres, palettes, caption banks, hashtags and caption templates are read
from render.py and captions/*.json, and the bundled font is inlined, so the
page always matches the Python renderer. Run after editing any of those:

    python3 web/build.py
"""

import base64
import json
import os
import sys

WEB = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(WEB)
sys.path.insert(0, ROOT)
import render  # noqa: E402

bank = {}
for e in render.load_bank():
    bank.setdefault(e["mode"], []).append({"sign": e["sign"], "text": e["text"]})
# genre menu follows render.py's order; any caption file it doesn't list goes last
order = [m for m in render.PALETTES if m in bank] + [m for m in bank if m not in render.PALETTES]

config = {
    "W": render.W, "H": render.H, "SIGNS": render.SIGNS,
    "PALETTES": {m: c["pairs"] for m, c in render.PALETTES.items()},
    "DIAGONALS": render.DIAGONALS,
    "BANK": {m: bank[m] for m in order},
    "VOICES": render.load_voices(),
    "HASHTAGS_BASE": render.HASHTAGS_BASE, "HASHTAGS_MODE": render.HASHTAGS_MODE,
    "IG_CAPTION": render.IG_CAPTION, "FIRST_COMMENT": render.FIRST_COMMENT,
}
# the lines ffmpeg really draws for each diagonal (see measure_gradients.py)
with open(os.path.join(WEB, "gradient_lines.json")) as f:
    config["GRADIENT_LINES"] = json.load(f)
# </script> inside a caption would end the script tag early
config_js = json.dumps(config, ensure_ascii=False).replace("</", "<\\/")
with open(render.BUNDLED_FONT, "rb") as f:
    font = base64.b64encode(f.read()).decode()

with open(os.path.join(WEB, "template.html")) as f:
    page = f.read()
page = page.replace("__CONFIG__", config_js).replace("__FONT__", font)
with open(os.path.join(WEB, "index.html"), "w") as f:
    f.write(page)
print(f"wrote web/index.html ({len(page) // 1024} KB, {sum(map(len, bank.values()))} captions)")
