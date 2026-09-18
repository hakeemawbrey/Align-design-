# Agent G — O-11, O-12, O-13, O-13b

Section `937:1924`. New screens on row y=5900. Frame instance = `1473:856`;
starfield `1378:1919`, status bar `1379:1915`, home indicator `1384:1928`,
holo button `1387:1915` (label swapped, `✦` kept as its own SF Pro Regular 15
range), back chevron cloned from O-03 `1019:2461`, screen fill bound to
`VariableID:935:857` (S-05's fill) via `setBoundVariableForPaint`.

| screen | node | x | top aurora | accent | haze | hues | target |
|---|---|---|---|---|---|---|---|
| O-11 — Flipped Card Rule | `1481:1039` | 2780 | violet, op **0.86** | **11.56%** | 12.1 | 3 | ~10 |
| O-12 — Dealbreakers | `1518:954` | 3230 | violet, op **0.78** | **7.93%** | 11.8 | 3 | 3–8 |
| O-13 — Photo Upload (existing) | `1019:2462` | 1430 (y=3020) | Libra `#8B4CB8` (= frame default), op **0.88** | 0.39% → **16.50%** | 16.8 | 3 | ~15 |
| O-13b — The Field | `1518:1040` | 3680 | violet, op **1.0** | **16.72%** | 11.9 | 2 | ~15 |

Renders: `scratchpad/cut/O11-v3.png`, `O12-v1.png`, `O13-v2.png`, `O13b-v1.png`
(`O13-before.png` is the baseline).

## The one finding that matters

**The top aurora's opacity is not linear against score.py.** The metric
thresholds at v > 0.5, and the aurora sits right on that edge on the S-05
ground: O-11 measured 3.19% at 0.7, 11.56% at 0.86, 16.75% at 1.0. The
brief's "0.7" / "0.4" alphas would land at ~3% / ~0%, so I tuned by
measurement instead: 0.78 ≈ 8%, 0.86 ≈ 11–12%, 0.88 ≈ 16% (with O-13's own
Atmosphere ellipse still on), 1.0 ≈ 17%. Other agents: expect the same curve.

## Per screen

**O-11** — hero `1515:943` (y=232, 390×210): card back clone at 0.28 (x62),
Juniper's card clone at 0.28 with rotation reset to 0 (x238, carries the IMAGE
panel), quadratic arc `M0 36 Q37 -16 72 34` drawn twice — hairline cream @0.5
w1 under a w3 dotted pass (`dashPattern [0.01, 8]`, ROUND caps → 3px dots) —
plus a two-line arrowhead along the end tangent, kept 4px clear of the card
edge. Callout `IF YOU BOTH ALIGN` is a pill (fill `#2B1E4C`, stroke cream
@0.26) at y=32 so it sits above the arc's apex. Captions `HER CHART &
DEALBREAKERS` / `THE CARD FLIPS` under the cards. Steps stack `1515:1030`
(y=452, three rows, `01/02/03` in Libra core `#D695DE`, body SF Pro 13) — had
to set `layoutSizingVertical='HUG'` after appending or it collapsed to 10px.
CTA `I’m in ✦`. Reassurance rewritten to *No photo is shown until you both
align.* because the source's line duplicated step 03 verbatim.

**O-12** — chip grid `1519:1057` (wrap auto-layout, 334 wide, gap 10/10,
centred): pills r999, padding 9/14, fill `#2B1E4C`, stroke `#FFF9F2` @0.26
w1.25 inside, SF Pro Regular 13 cream. Nine chips: six from the source clone,
`Refusing to talk it out` lifted from Juniper's card dealbreakers, `Reads, no
reply` added to fill the grid, `Write my own…` as a dashed no-fill chip.
Selected (`✓` prefix, fill `#3A2A6A`, stroke @0.5): `One-word texts`, `Hates
my group chats` — matches the source preview line, kept below as `PREVIEW ·
YOUR CARD READS` + EB Garamond Italic 17. The long source eyebrow split:
`STEP 7 · PICK UP TO 3` up top, *The universe loves a boundary.* as the
reassurance under `Seal my card ✦`. No hero, top aurora 0.78.

**O-13** — instance `1519:8377` inserted at index 1 (directly above
`Atmosphere`, whose own violet/warm ellipses I left on, as the O-03 prototype
does). Upload tiles `1028:8045` hidden, not deleted. Hero = Juniper's card
clone `1519:8380`, rotation 0, rescale 0.62 → 200×327, centred at y=270..597;
the IMAGE aura panel sits at the screen's optical centre. Grid hint
`1145:1928` hidden — *Six is the whole story* refers to the hidden tiles and
it collided with the ladder and a sparkle; every other line of source copy is
untouched (Continue, sub, reassurance). Card keeps Libra / Gemini Moon — that
is Juniper's own chart, allowed by the brief.

**O-13b** — hero `1519:1080` (y=256): five card-back clones at 0.34
(109×180), rotations +14/+7/0/−7/−14 (Figma CCW-positive, so the outer cards'
tops lean outward), centres at x = 195 + i·44, y = 118 + 5·i² with the centre
card lifted to y=106; paint order −2, +2, −1, +1, 0 so the centre is on top.
Positioned via `absoluteBoundingBox` after rotating (rotation is about the
node origin). Below: `333` EB Garamond Italic 76, `CHARTS CAST WITHIN 25 MILES
OF YOU`, and the three source stats folded into one caps strip
`41 READ STRONG · 6 SHARE YOUR MOON · 11 ARE COMETS` (the source's four
paragraphs would not fit under a fan). Its "Gemini moons" sentence was dropped
rather than re-signed. Sub = the source's `15 LAND TONIGHT` line. CTA `Show me
who is out there ✦`.

## Unsure

- No chakra progress ladder on the three new screens — it is not in the
  brief's furniture list and O-03 carries it; easy to add if the flow wants it.
- O-13 keeps its 33px EB Garamond headline / 17.5 Garamond sub from the
  prototype era rather than the brief's 30 / SF Pro 13 — I did not retype an
  existing screen's copy nodes.
- The scaffold placed `Sub` before the headline had laid out (height read as
  10); moved to y=216 by hand on O-12/O-13b. Any reuse of that pattern should
  read heights in a second script.
