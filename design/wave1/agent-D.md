# Agent D — club + S-02 + S-06

File `tj4UC3bpikhe8u1TL0kA35`, section `937:1924`. Scores via `scratchpad/score.py` on 390×874 renders in `scratchpad/cut/`.

## Part 1 — quiet the Club

| screen | node | before | after | target |
|---|---|---|---|---|
| S-17 Club · Taurus room | `1034:1928` | 8.64% | **1.26%** | ≤6% |
| S-17b Post Detail | `1017:2265` | 0.85% | **0.85%** | ~1% |

**S-17** — hidden (`visible=false`, not deleted): `aurora · taurus` 1034:1929, `aurora · violet` 1034:1930, `aurora · jade` 1034:1931, `aurora · ember` 1034:1932, `seed of life` 1101:1937, `geometry · vesica` 1123:1962. `hero glow · Taurus` 1057:1929 opacity 1 → 0.25 (kept — at 0.25 it is a faint halo behind the orb, does not dominate). Kept sparkles, starfield, orb (IMAGE) and the three member avatars (IMAGE). Render: flat near-black ground, colour only from the orb, avatars and moon-sign labels.

**S-17b** — hidden `aurora · violet` 1017:2266 and `aurora · ember warm` 1017:2267 (the only screen-level glows; no geometry present; nothing glow/geometry-named nested inside the post/reply frames). Accent unchanged at 0.85% — the two auroras were near-invisible against the ground; colour on this screen is the avatars and moon-sign chips, which stay.

## Part 2 — new Core Flow screens

Both 390×874, fill = S-05's fills array (SOLID bound to `VariableID:935:857`). Starfield, status bar, home indicator and pearl holo button cloned from S-21 (`1378:1919`, `1379:1915`, `1384:1928`, `1387:1915`); button label rewritten with `characters=` then `setRangeFontName` (EB Garamond Medium Italic 19 on the words, SF Pro Regular 15 on the final `✦`). No ambient glow, no geometry on either.

**S-02 — Auth Decision** — `1464:952`, at x=4580 y=140 (between S-21 and S-03). Accent **0.05%** (target ≤2%; Stardust login 0.09%). Eyebrow `WELCOME BACK` / headline `The stars kept / your seat warm.` / `Card back · Align` clone (1118:1928) rescaled 0.5 → 161×264 centred at y=232, opacity 0.55 / holo `Continue as Hakeem  ✦` @ y=612 / secondary pill `Sign in` @ y=678 / link `New here — read my chart` @ y=750 / two-line legal @ y=792.

**S-06 — Expand Card** — `1465:859`, at x=6260 y=140 (between S-05c and S-05b). Accent **1.40%** (target ~4%; Stardust Tarot Card Detail 3.2%) — below target because the reading card is deep violet foil and the only colour is the aura tile on the re-presented card, which is the intended read. Top row: `×` close at x=340 + eyebrow `HER CARD  ·  № 031/∞`. Card: `Mystery Card · Libra` clone (998:1925, IMAGE-filled aura panel untouched) rescaled 0.56 → 180×296 at y=100, bottom 396. Reading card `1465:997` x=28 y=420 334×257 (palindromic horizontal foil gradient, r18, keyline inset 8 r11, three rows, serial at foot), bottom 677. Footnote at y=693, holo `Align — flip the card  ✦` at y=712, `Release this card` at y=784. No overlaps.

## Notes / unsure

- S-06: the scaled card's lower rows (SPARK/RUB/ALIGN, dealbreakers, serial) render at ~7px — legible only as texture, but they do not collide with the reading card, so I left the card structure intact rather than hiding rows. Easy to hide the clone's `div` rows if the reviewer prefers a cleaner top half.
- S-06 body 2 runs three lines (51px); card still ends 16px above the footnote so copy was not shortened.
- `resize()` on a text node resets `textAutoResize` to NONE — set `HEIGHT` again after resizing (bit me on the S-06 bodies, fixed).
- `insertCharacters` third arg is `'BEFORE'|'AFTER'`, not a font — use `characters=` + `setRangeFontName` for the sparkle label.
- The S-21 status bar's signal dashes render green in the clone; that is how the source node is — not changed.
