# Align Town reels

Vertical reels (1080 × 1920, ~30 s) set in a small 3D astrology town at
night. The camera walks a cobblestone plaza with a zodiac wheel set into the
ground. It passes lampposts, house signposts ("the 7th · partners"), framed
auras, veiled Align cards drifting overhead and a clock tower that reaches
11:11 by the end. It stops at one paper card per line. Stardust, Align's
little star-headed walker, keeps turning up beside the cards.

The format was inspired by walk-through "astrology town" reels. Every model,
card, line and note here is original to Align: the town is built in code
(three.js), the sky figures and auras come from the app, and the music is
synthesised (`reels/src/score.py`).

| Path | What |
| --- | --- |
| `scripts/*.json` | one script per reel |
| `engine.js` | the town and the camera, rendered in Chromium (three.js) |
| `render.mjs` | script → frames → MP4 with ffmpeg |
| `../out/town/` | renders (git-ignored) |

## Render

Needs Node 18+, Python 3 with numpy, and ffmpeg. Run `npm install` in
`carousel/` once (Playwright, three and the fonts come from there).

```bash
node reels/town/render.mjs --stills          # contact sheets → reels/out/town/stills/
node reels/town/render.mjs                   # every reel → reels/out/town/<id>.mp4 (+ .web.mp4)
node reels/town/render.mjs full-moon         # by id
```

## Script contract

```json
{
  "id": "01-full-moon-taurus",
  "sign": "taurus",
  "sky": "dusk",
  "moon": "full",
  "title": "…",
  "caption": "full moon in taurus. the whole town showed up to let something go",
  "hashtags": ["fullmoon", "taurus", "astrology"],
  "beats": [
    { "text": "a door left on the latch", "accent": "latch", "icon": "door", "sub": "the 7th · partners" }
  ],
  "end": "align",
  "endSub": "a new deal at 11:11"
}
```

- `sign`: the sign whose figure floats in the sky and whose glyph is gold on the wheel.
- `sky`: `dusk` | `night` | `sepia`. `moon`: `full` | `crescent` | `none`.
- **7–9 beats**, 3.4 s each. One line per card, **max 46 characters**,
  ideally 20–40. The first card is the hook and is on screen at frame one.
- `accent`: one or two words from the line, drawn in rose.
- `icon`: `full` `moon` `star` `heart` `door` `key` `eye` `card` or `glyph:<sign>`.
- `sub`: the small caps footer, e.g. a house (`the 8th · secrets`), the sign, or the ritual.
- Optional: `signposts` (pairs of house arrows), `exhibits` (`[title, "<sign> · word"]`), `ghosts` (two more sky signs).
- `caption` under 90 characters, lowercase. `hashtags` 3–6, no `#`.

## Voice

The same rules as `reels/SPEC.md`: calm, warm, honest, lowercase, second
person or a small story about the town. Astrology reads; it never decides.
No emoji, no exclamation marks, no "manifest", no soulmate promises, never
"download". Align's ideas (read the sky before the face · it has to be
mutual · say the honest thing · dealbreakers up front · release, don't haunt ·
a new deal at 11:11 · Venus runs your heart · you won't arrive alone) appear
at most twice. End on a question or a line that lands; the caption can ask it
too.

Never reuse another creator's lines, captions or footage. Only the format
(a walk through a town, one card per line) carries over.
