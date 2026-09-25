# Wave 6 — agent S · O-05 (×12), O-06, O-07

Renders: `scratchpad/w6s/` (`o05_before/v2`, `v_<sign>`, `o06_before/v2`, `o07_before/v1`, strips `strip_v1`, `strip_var1..3`).
Stardust A/B strips: `w6s/ab_o05.png`, `w6s/ab_o06_o07.png`, `w6s/sd_flow.png`.

## O-05 — Sign Reveal · Taurus `1010:1926`

- Stardust `other-tabs_25/26`: the reveal is a *results* card — hero on top, eyebrow/headline/sermon below, no chevron, no progress. Every step in Stardust's actual flow (`onboarding_09/14/15/16/19`) is text-on-top, hero in the band. Ours was built like the results card (hero at y96, headline at y459, sermon ending y660, ladder at y706, a 350×61 button at y742) and had **no status bar, no home indicator, no chevron**.
- Ours does that Stardust does not: a chakra progress ladder and a `Tell me later` secondary — kept, moved to the rhythm slots.
- Moved (element: from → to):
  - status bar: missing → clone `1379:1915` at y0
  - back chevron: missing → clone `1019:2461` at 26,68
  - eyebrow `YOUR SUN SIGN`: Space Mono 10 ls 2.4px at y432 → SF Pro Semibold 10 ls 14% cream @0.5, y104
  - headline `Sun in Taurus`: 34/40 at y459 → 33/40 cream, y120
  - sermon: EB Garamond 17.5/27 cream, 330 wide, 6 lines ending y660 → 16.5/24 `#B3A6C4`, 342 wide at x24, y178, 5 lines ending y298 (trimmed "Some of them will work that out too late" → "Some work that out too late" to kill a two-word widow). Renamed `prose · Gemini` → `sermon · Taurus`. The `sermon` frame was a VERTICAL auto-layout (its item spacing pushed the headline to y128 and the sub to y180 on the first pass) — switched to free layout, clipsContent off, children pinned at 0 / 16 / 74 so the screen y is 104 / 120 / 178 on all twelve (verified by dump).
  - hero `hero · Taurus figure` 300×251: y96 → y340 (band 340–591); `well · hero` 440×340: y52 → y296
  - ladder: y706 → y623 (steps 1–3 lit, unchanged)
  - CTA: old 350×61 `Holo button · Next, your moon` at 20,742 → fresh clone of pearl holo `1387:1915` 314×54 at 38,668, label `Next, your moon  ✦` (label run EB Garamond Medium Italic 19, `✦` keeps its SF Pro 15 run). Old `cta wrap` hidden and renamed `cta wrap (retired)`.
  - secondary `Tell me later`: SF Pro 13 `#7D6F94` @1 at y815 → 14 @0.78, y742
  - home indicator: missing → clone `1384:1928` at y858
- Hero: unchanged (feathered figure tile, SCREEN). Aurora instance unchanged, top = Taurus rim `#8FC24B`.
- accent / haze: 4.85 / 17.9 → 4.79 / 22.4 (haze rises because the green top aurora now sits behind cream text, not the tile — same metric artefact wave 3 noted).

## O-05 variants ×11 `1633:857 … 1633:2187`

Same script, identical positions (verified by node dump: sb 0 · chevron 26,68 · eyebrow 104 · headline 120 · sermon 178 · hero 45,340 · well 296 · ladder 623 · CTA 38,668 314w · secondary 742 · home 858 on all twelve). Each keeps its own figure tile, top-aurora colour and sermon text; none of the eleven sermons were trimmed (4–5 lines at 16.5/24, 342 wide). Every one screenshotted at 600 and Read: `strip_var1..3`.

| sign | accent | haze | sermon lines |
|---|---|---|---|
| Aries | 7.50 | 32.6 | 4 |
| Gemini | 4.33 | 29.5 | 5 |
| Cancer | 10.19 | 17.6 | 5 |
| Leo | 7.67 | 33.7 | 4 |
| Virgo | 5.62 | 31.6 | 4 |
| Libra | 5.54 | 12.3 | 4 |
| Scorpio | 6.27 | 32.0 | 4 |
| Sagittarius | 7.97 | 12.2 | 4 |
| Capricorn | 2.77 | 34.7 | 4 |
| Aquarius | 7.27 | 24.6 | 4 |
| Pisces | 8.43 | 12.2 | 4 |

## O-06 — User Manual `1481:857`

- Stardust `onboarding_07`: a chevron, one headline and one two-line sub centred mid-screen, CTA at the common height, nothing else. Ours had the headline at y176, a nine-line STRENGTHS/WEAKNESSES/WORK ON wall (3 lines each at 13px), the CTA at y742 and no chevron.
- Ours does that Stardust does not: the three-part manual — kept, cut to two lines each.
- Moved: chevron added at 26,68 · eyebrow y150 → 104 · headline y176 → 120 (30/36, 2 lines, unchanged copy) · anchor: new 6px `#8FC24B` dot with a 10px rim glow at 192,236 (the one visual anchor) · items: label y292/394/496 → 284/368/452 (SF Pro Semibold 9.5 ls 8% cream @0.5), body 13/auto 290w → 14/20 `#EFE6D6` @0.92, 310w centred, y+17, each 2 lines · note (italic) y585 → 540 · CTA `Read. Accepted. ✦` y742 → 668.
- Copy: STRENGTHS "Steady to the bone. Builds a home anywhere. Still knows how you take your coffee." · WEAKNESSES "Digs in and calls it patience. Keeps the wrong thing rather than risk the right one." · WORK ON "Letting go before your hands are forced. Nothing held that tightly is still a choice."
- No aurora, no hero, no ladder (breather). accent / haze: 0.00 / 0.0 → 0.01 / 0.0.

## O-07 — Big Three `1519:855`

- Stardust `onboarding_15` / `other-tabs_22`: chevron, headline at the top, a three-line sub, then the hero (symptom tiles / the sign figures) in the band, CTA at the common height. Ours had no chevron, no sub, no ladder; the spheres at y196, three 13px bullets, and a Garamond tip at y586.
- Ours does that Stardust does not: the three spheres are already sharp per the sphere recipe (inner shadow, rim drop shadow, Sun ring, orbiting moon) — kept.
- Moved: chevron added at 26,68 · eyebrow y96 → 104 · headline y118 → 120 (auto NONE → HEIGHT) · new `Sub` EB Garamond Regular 17.5/24 `#B3A6C4` 302w at 44,178, 2 lines: "Three of you were born on May 4, 1994. Only one of them talks at parties." · `The big three` frame y196 → 262 (spheres 302–398, labels at 406; band 262–452) · bullets 13/18 at y416/472/528 → 14/19 at y470/516/562, dots at x38 y+6, each ≤ 2 lines · tip: EB Garamond Italic 15 @0.8 at y586 → secondary slot y742, SF Pro Regular 14 `#7D6F94` @0.78, "You fall for your moon sign, not your sun." · ladder: missing → clone of `1134:8044` at 39,623 with steps 1–4 lit (step colours taken from the lit steps already in the section; step 4 green with the same 8px glow) · CTA already at 38,668 314×54.
- Copy: Sun "Who you are at brunch. Orders for the table, pays without looking." · Moon "Who you are at 2am. Plans the trip you will not book. Feels it all, tells no one." · Rising unchanged.
- accent / haze: 2.82 / 25.5 → 2.97 / 25.3 (gold top aurora vs violet ground — the known haze artefact).

## Left alone on purpose

- O-05 accent sits at 3–10% rather than the 15–25% onboarding gate: the figure tiles are mostly black by construction and wave 5 already accepted this range; I did not add glow ellipses (aurora-wall rule) or scale the tile past the band.
- Hidden retired nodes (`hero glow`, `sign glow`, `glow · floor`, `constellation · Gemini (retired)`, now `cta wrap (retired)`) left hidden, not deleted, on all twelve.
- O-06 has no progress ladder and no aurora (breather exception); it does get the chevron because Stardust's breather has one.
- O-07's bullets stay left-aligned at x56 under a centred sub — the dot + line rows read as a list, and centring them broke the dot alignment.
- The sphere recipe on O-07 was not rebuilt (already sharp; wave 5 checked).
- No Appllama credits spent; the cache answered every A/B.
