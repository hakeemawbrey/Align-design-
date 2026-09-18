# Agent C — G-09 Matches, S-07 Match, S-08 Veil Lifts, S-21 Alignment

File `tj4UC3bpikhe8u1TL0kA35`, section `937:1924`. All edits are `visible = false` on
screen-level nodes; nothing deleted, nothing inside a card or any IMAGE-filled node touched.
Renders in `scratchpad/cut/{G09,S07,S08,S21}-{before,after,pair}.png`.

| screen | node | hidden | before → after accent | verdict |
|---|---|---|---|---|
| G-09 Matches | 1005:1926 | `glow` 1005:1927 (ambient ellipse, op 0.20) | 15.34% → 15.34% | flat ground; all six IMAGE aura tiles untouched, colour is now tile-only |
| S-07 Match | 1019:1926 | `seed of life` 1101:1946, `glow · violet` 1019:1927, `glow · gold` 1019:1928 | 2.51% → 2.51% | celebration reads; `bloom · Taurus` 1020:2136 + `bloom · Libra` 1020:2140 kept, both foil cards kept |
| S-08 Veil Lifts | 1019:2033 | `glow · violet` 1019:2034, `glow · gold` 1019:2035 | 2.88% → 2.88% | `bloom · Libra` 1023:8065, six sparkles and card kept |
| S-21 Alignment | 1378:1915 | `glow · Libra (Juniper)` 1378:1916, `glow · Taurus (you)` 1378:1917, `glow · floor` 1378:1918, `geometry · vesica` 1378:1990 | 9.81% → 9.81% | card 1390:1915 untouched; sits fine on flat ground, no glow restored |

## Notes / unsure

- The accent number did not move on any screen. `score.py` counts pixels with sat > 0.5 AND
  value > 0.5; the ambient glows and geometry are dim (v < 0.5) so they were never counted.
  The number was always the aura tiles and cards. The visual change is real (see the `-pair`
  PNGs): the violet wash in G-09's top-left, the seed-of-life rings and gold/violet halos
  behind S-07's cards, the halos on S-08, and the green/violet halos + vesica on S-21 are gone.
- S-21 remains at 9.8% against the ~3% target. What's left is the card's two IMAGE aura frames
  and its gradient fill — all on the do-not-touch list. If 3% is a hard target it needs a
  decision about the card itself, not the background.
- S-21: hiding both glows did not make the card look pasted-on (its own gradient + pearl keyline
  ground it), so I did not restore either glow at 0.15.
- Did not touch: pearl holo buttons, starfields, status/tab bars, home indicators, any copy.
