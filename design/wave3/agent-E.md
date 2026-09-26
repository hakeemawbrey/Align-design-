# Agent E — wave 3 notes

Section `937:1924`, file `tj4UC3bpikhe8u1TL0kA35`. Renders in scratchpad `cut/O02-*.png`, `cut/O04-*.png`, `cut/O07-*.png`.

## Scores (score.py, 300px thumb)

| screen | node | accent before → after | haze | hues | gate |
|---|---|---|---|---|---|
| O-02 Arrival | `1017:2035` | 22.35 → **18.18** | 3.14 → 1.70 | 1 → 2 | 18–25 ✓ |
| O-04 Birth Sky (new) | `1518:1126` | — → **17.02** | 28.3 | 2 | 15–25 ✓ (target ~20) |
| O-07 Big Three (new) | `1519:855` | — → **16.92** | 27.8 | 1 | 15–25 ✓ (target ~15) |

Haze on O-04/O-07 is a metric artefact: score.py picks the dominant dim hue as "ground", and a green or gold top aurora over the violet ground makes the *violet* count as off-hue. O-02 (violet aurora) reads 1.7%.

## O-02 — Arrival `1017:2035`

- Hidden (not deleted): `1075:1928` hero glow, `1017:2037` Aurora violet, `1042:2029` Aurora warm, `1136:1928` Focal — seed of life + chakra column. There is no card back on this screen; kept headline `1025:1928`, sub `1025:1929`, holo `1025:1930`, link `1138:1930`, legal `1025:1938`, status bar.
- Aurora frame instance `1515:8233` inserted directly above `Atmosphere` (starfield lives inside it), default violet/warm, no override.
- Horizon `1515:8236` — 760px dark disc, top at y318, x−185; radial `#07030F`→`#120826`, 1px cream stroke @0.22, INNER_SHADOW `#8B4CB8` @0.55 r70 y26 (lit rim), DROP_SHADOW `#8B4CB8` @0.35 r40 y−6. Headline at y380 sits below the arc (arc max y372 at the edges).
- Lights `1515:8237` (six spheres 30–46px, radial mix(core,0.62)→core@0.30→rim@0.70→rim α0, LAYER_BLUR 5, DROP_SHADOW core @0.55 r16; each with a 2.4× bloom ellipse rim @0.55→0, blur 14): Capricorn `1515:8238` (40,336) 40px · Leo `1515:8239` (112,250) 46 · Cancer `1515:8240` (188,302) 30 · Taurus `1515:8241` (262,236) 36 · Libra `1515:8242` (322,292) 44 · Aries `1515:8243` (352,340) 32. Blooms `1516:950`–`1516:955`.
- Sparkles cloned from O-03: `1516:956`, `1516:959`.
- v1 (blur 8, no bloom, Aries at x368) measured 17.94 — cores read as fog and Aries was lost at the edge; blur 5 + bloom + move in → 18.18.

## O-04 — Birth Sky `1518:1126` (x80 y5900)

- Copy from clone `6:200`; Cancer/July 4 corrected to Taurus: eyebrow `TULSA, OK · MAY 4 1999 · 9:14 PM`, headline `This was your sky.`, readout `SUN IN THE BULL ✓ / MOON DRIFTING THROUGH SAGITTARIUS ✓ / 444 STARS ACCOUNTED FOR ✓ / READING YOUR HORIZON ⋯`, sub `Hold still — the stars are remembering you.`, reassurance from O-03. CTA `Read my sky ✦` (`1518:1230`, cloned holo, ✦ kept as its own SF Pro Regular 15 run).
- Aurora frame `1518:1198`, top aurora overridden to Taurus rim `#8FC24B` (same stops/alphas). Spotlight `1523:855` behind the wheel: 440×400 `#8FC24B` 0.62→0.28→0, blur 70 — added to lift 15.5 → 17.0; sits directly above the frame instance.
- Wheel `1518:1203` at y190: orbit 236 @0.4 + inner 150 @0.18; twelve 24px orbs Aries at top clockwise (S-14 orb recipe, radial gt [[.82,0,.09],[0,.82,.05]]), each with a 56px rim bloom; Taurus 40px, cream stroke 1.5, DROP_SHADOW core @0.9 r28, 150px bloom. Moon glyph `1518:1219` beside Taurus: 18px cream disc + 15px ground `#140A2E` disc offset (7,−4). Centre: `YOUR SUN` / *Taurus* / `13° · FIXED EARTH` in Taurus core.
- Undershoot vs ~20% target: the twelve orbs are small by design; pushing further would need a bigger wash. Left at 17.0 inside the gate.

## O-07 — Big Three `1519:855` (x530 y5900)

- Copy from clone `6:472`; Cancer/Pisces → Taurus/Sagittarius. Eyebrow `ASTROLOGY, MINUS THE HOMEWORK`, headline `One sky. Three yous.`, bodies rewritten for the corrected signs (Sun: brunch/orders for the table; Moon: 2am/the trip you will not book; Rising: unchanged Libra line), tip `Dating tip: you fall for people with your moon, not your sun.`, CTA `Three of me. Got it ✦` (`1519:954`).
- Aurora frame `1519:927`, top aurora `#D4AF37` at **0.88× the canonical alphas** (0.836/0.739/0.370/0). Full alpha measured 20.5%, 0.72× fell to 8.5% (gold drops under the V threshold quickly) — 0.88× gives 16.9.
- Hero `1519:932` at y196: Sun 96px (82,88), Moon 64px (195,88), Rising 64px (308,88). Sphere recipe: radial gt [[.64,0,.276],[0,.64,.295]] (light centre upper-left), mix(col,.72)→col@.28→col×.45@.72→col×.12; 1px inside stroke mix(col,.5)@.35; DROP_SHADOW col @0.6 r30 s2; INNER_SHADOW `#07030F` @0.7 from lower-right; 2.2× bloom blur 18. Sun has a 150×38 ring at −16° (1.25 stroke), Rising a 7px cream orbiting moon. Caps labels `SUN · TAURUS` / `MOON · SAGITTARIUS` / `RISING · LIBRA` at y+56.
- Copy blocks at y416/472/528 (8px coloured dot + SF Pro 13 lh18, w296 at x56), tip at 586. First pass overlapped because `text.height` reads stale (10px) inside the script before layout — ys are now explicit.

## Gotchas hit

- `figma.mixed` in a template string throws "cannot convert symbol to string" — guard before stringifying.
- Text height is not updated within the same script after `resize` + `textAutoResize='HEIGHT'`; do not stack blocks off `t.height`.
- Section children coordinates are section-relative (O-02 is at x530 y3020); new frames at (80,5900) and (530,5900) land in the row with O-03b.
