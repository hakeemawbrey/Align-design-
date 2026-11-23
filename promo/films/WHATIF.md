# "What if you could see…" — zodiac love explainers

Picks up the explainer thread from before Star Talk (EXPLAINERS-V2.md, SERIES3.md, `venus`), in the faceless short format
the user pointed at (ponderingyoutv-style: one "what if" premise, a gold headline on screen the whole time, round
faceless-ish characters, glowing number bubbles, multi-part cliffhangers). We borrow the format, not the look of any
account: our own characters, room, palette and zodiac content.

## Kit: `promo/films/whatif/kit.js`
- `makeRoom(seed)`: dark lounge, warm bokeh, a string of bulbs, floor glow, vignette.
- `person(x, {cx, cy, s, body, rim, hair, hairCol, expr, look, blink, blush, wave, waveT})`: black round head with a
  glowing rim in the sign colour, white eyes, simple mouth. expr: flat, meh, smile, grin, soft, o, shock.
  hair: tuft, swoop, long, bun, curls, spikes, cap.
- `bubble(x, {cx, tipY, glyph, text, color, k, size, pulse})` + `countUp(t, t0, n, d)` (n = null scrambles).
- `makeHeadline([{text}, {text, big: true}, {text}], {small, big, top})`: stays on screen all film (it is the thumbnail).
- `makeCaptions([{t0, t1, text, hl}])`: word-by-word, `*word*` highlighted, `|` line break. `captionWordTimes` for pop cues.
- `orb`, `link`, `makeBurst`/`drawBurst`, `partTag(x, t, t0, 'PART 2', 'follow for the answer')`.

## Rules
- Vertical 1080×1920, 30 fps, 20–30 s. The hook is the headline, readable from frame 0.2.
- Captions low (y≈1600), ≤ 2 lines, ≥ 1.8 s each. One gold (or pink, for Venus) highlight per caption.
- Every episode teaches one real astrology fact (rulerships, elements, modalities, aspects, Venus/Mars, houses).
  Match numbers are story devices, not statistics; never present them as data.
- No app pitch, no lockup. End on the cliffhanger tag.
- Sound: a `music.style` score in cues.js plus cues. `bell` needs a pitch; `glitter` and `riser` need an end time.

## Episodes
| folder | part | premise | fact | status |
|---|---|---|---|---|
| wifmatch | 1 | Everyone has a love-match number. Leo 12, Libra 97. Then Libra sees yours… | Taurus and Libra are both ruled by Venus | done |
| (next) | 2 | Libra can see yours too: it's 61. Why lower? | Taurus–Libra are 150° apart (a quincunx): same ruler, awkward angle | idea |
| (next) | 3 | A stranger's number is 100 | Same Sun sign isn't 100: what makes a trine (same element) | idea |

More premises: "What if you could see your ex's Venus sign?" · "…who's texting you back (Mercury)?" ·
"…your crush's Moon sign?" · "…how long a Leo can go without attention?"

## Render
```
node promo/scripts/teaser-sound.mjs --film=wifmatch
node promo/scripts/render.mjs --film=wifmatch --vertical      # → promo/out/films/wifmatch/align-wifmatch-share.mp4
```
