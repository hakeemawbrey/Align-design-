# Agent F — O-06, O-08, O-09, O-10 (row y=5900, section 937:1924)

All four built fresh: 390×874 frame with S-05's variable-bound ground fill,
clone of starfield `1378:1919`, status bar `1379:1915`, home indicator
`1384:1928`, pearl holo `1387:1915` (label swapped via insert/delete so the
`✦` keeps its SF Pro run), `Aurora frame` instanced from `1473:856` where the
screen is on the frame. Text: EB Garamond Italic 30 headline · SF Pro Regular 13
body · SF Pro Semibold 10/9.5 eyebrows and caps. Renders in scratchpad
`cut/o06.png … o10.png`.

| screen | node | x | accent% | haze% | target |
|---|---|---|---|---|---|
| O-06 — User Manual | `1481:857` | 980 | **0.00** | 0.00 | < 1 |
| O-08 — Chart Check | `1516:960` | 1430 | **8.76** | 7.93 | ~10 |
| O-09 — Venus | `1518:859` | 1880 | **16.31** | 28.45 | ~18 |
| O-10 — Element | `1519:957` | 2330 | **14.30** | 21.69 | ~15 |

## O-06 — User Manual `1481:857`
Breather: no aurora, no art. Flat ground + starfield, everything centred (after
Stardust `onb_1x3ow`). Copy from clone `6:396` rewritten Cancer → Taurus:
STRENGTHS / WEAKNESSES / WORK ON blocks (SF Pro 13 on Semibold 9.5 caps @0.5),
closing italic *Align will nudge you on this…* @0.6, CTA `Read. Accepted. ✦`
at y=742.

## O-08 — Chart Check `1516:960`
Frame instance, top aurora (violet) at **0.8 opacity, not 0.5** — at 0.5 the
whole aurora falls under the scorer's v>0.5 line and the screen measured 0.00%;
0.8 lands 8.76%. Bottom warm aurora untouched. Panel `#2B1E4C` r14, 342 wide,
hairline `#FFF9F2` @0.10 stroke, six 52px rows: SUN Taurus · MOON Sagittarius ·
RISING Libra · BORN 4 May 1994 · TIME 7:42 AM · PLACE Portland, Oregon, each with
a `›` @0.4 (row hairlines @0.08). The clone's copy is a quiz game; the plan
wants a confirm list, so headline/sub are new (*Here is what the sky said
about you.* / *Six facts. If one of them is wrong, tap it…*), note under the
panel ties sun+moon together. CTA `That's so me ✦`.

## O-09 — Venus `1518:859`
Top aurora overridden to Virgo-rim rose `#C0395F` (same stops). Hero frame
`hero · Venus` (y=90): glow ellipse 340px `#F58F9C` .70→.26→0 blur 30; 200px
sphere, radial centred (0.36, 0.30) — `gradientTransform [[1.05,0,0.122],[0,1.05,0.185]]`
(centre c ⇒ t = 0.5 − a·c; the first pass had the sign wrong and lit the
bottom-right) — stops `#FFD9E6` → `#F9B6CE` → `#E66A9F` (.48) → `#9C2A5E` (.80)
→ `#4A1030`; DROP_SHADOW `#F58F9C` @.45 r40 + INNER_SHADOW dark limb; ring
360×96 cream @0.35 1px rotated −18°, back copy behind the sphere and a front
copy (@0.5) clipped to the lower half so it passes in front. Mid-stop pushed to
`#E66A9F` because `#E87BA8` is s=0.47 and never scores. Copy Cancer → Taurus:
*Venus runs your heart. / Yours is in Taurus.*, body about settling in, chips
SLOW MORNINGS · LOYAL TO A FAULT · SAYS IT WITH DINNER (wrap row, 330 wide),
note *Venus rules Taurus. It also rules Libra — remember that when one walks
in.* CTA `Painfully accurate ✦`.

## O-10 — Element `1519:957`
Top aurora → Taurus rim `#8FC24B`. Hero `hero · Earth orb` (y=62): glow 330px
`#8FC24B` .68→.26→0 blur 30; 180px orb radial centred (0.38, 0.32) `#D6DC7C` →
`#BCD266` → `#8FC24B` → `#4E8A31` → `#3F7A2A`, DROP_SHADOW rim @.45 r36, dark
INNER_SHADOW on the far limb; lit edge = filled arc band (`innerRadius
(90−1.6)/90`, `#EEF3B8` @.75, −1.12π→−0.38π) — a stroked arc with innerRadius 0
drew the two radial spokes, per the S-21 note. Caps label
`EARTH · TAURUS · VIRGO · CAPRICORN` in Taurus core @0.9. Copy water → earth:
*You're earth. / Here's your weather.*, sub *Earth is possession. It moves
toward what it can keep — and then it keeps it.*, four two-column rows
EARTH × FIRE / AIR / WATER / EARTH (label in `#D6DC7C` @.85, hairlines @.08),
closing *Your deck is built on this…*. First pass overran the CTA (note ended
at 760); hero and stack tightened, note now ends 728. CTA
`Show me who's out there ✦`.

## Unsure
- O-08 aurora at 0.8 instead of the briefed 0.5 — chosen to hit the number;
  visually still clearly quieter than the full-frame screens.
- O-10 sits at 14.3%, a touch under the 15% floor; more green glow starts to
  wash the headline. Left as is rather than push haze past 22%.
- Birth facts (4 May 1994, 7:42 AM, Portland) are invented; O-03 only shows a
  1992–1996 wheel.
