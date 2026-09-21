# Wave 6 · agent T — Onboarding second pass (`1554:855`), screens O-08 → O-15

Renders (before/after) in `scratchpad/w6t/`. Scores from `score.py` (accent % / haze %).
Scoring note carried over from wave 5: the metric counts only saturated+bright pixels, so our
darker ground sits at 1–3 % even on the exemplar; numbers below are relative, every render was read.

## Shared decisions (apply to every screen below)

- **Rhythm as built.** chevron `1019:2461` clone at x26 y68 · eyebrow SF Pro Semibold 10 ls 14 %
  cream @0.5 x30 w330 **y104** · headline EB Garamond Italic 30 cream x25 w340 **y120** · sub
  EB Garamond Regular 17.5 `#B3A6C4` x44 w302 · ladder `1134:8044` clone x39 **y623** · CTA x38
  **y668** · secondary SF Pro Regular 14 `#7D6F94` @0.78 (cream @0.6 for a real action) x30 w330
  **y742**, line-height AUTO.
- **Spec conflict — 2-line headline vs sub at 178.** 120 + 2×36 = 192, so a sub at y178 overlaps the
  second headline line (it did, on the first pass). Resolved: 2-line headlines use line-height 34
  (68 tall) and the sub sits at **y196**, capped at 2 lines so it ends exactly at **y250** where the
  band starts. 1-line headlines (O-13, 33/42) keep the sub at y178. Worth folding into the spec.
- **Ladder lit count.** The ladder has 6 segments but the flow numbers steps to 9b, so "lit = step
  number" cannot be literal. Used `round(step × 6 / 9)`: O-08 step 5 → 3 · O-09/O-10 step 6 → 4 ·
  O-11 step 7 → 5 · O-12 step 8 → 5 · O-13/O-13b step 9 → 6. Lit colours taken from O-13's ladder
  (`#ff1616 #ff914d #ffde59 #7ed957 #2accff`) + crown violet `#b06cf0` for segment 6; the last lit
  segment carries the 8px self-coloured glow, unlit = `#efe6d6` @0.22. R and S should reconcile to
  the same mapping.
- Step numbers removed from eyebrows (Stardust never numbers steps; our numbering disagreed with the
  brief's anyway).
- Helper prelude used in every script: `styleText` (re-sets `textAutoResize='HEIGHT'` after
  `resize`), `ensureChevron`, `ensureLadder(lit)`. Old elements hidden, never deleted.

## O-08 — Chart Check `1516:960` · A/B `onboarding_11`

- A/B: Stardust — chevron, headline hard at the top, two tall rounded rows with trailing chevrons,
  nothing else, CTA. Ours — no chevron, headline drifting to y144, sub in SF Pro 13, a six-row panel
  and a three-line italic note, no ladder.
- Moved: chevron added (none → 26,68) · eyebrow 118 → 104 · headline 144 → 120 (lh 34) · sub 228 →
  196, SF Pro 13 → EB Garamond 17.5, copy "Six facts. If one is wrong, tap it — the rest of the night
  depends on these." (2 lines) · panel 294 → 262, rows rebuilt to **Row · list metrics** (52 → 44
  tall, value SF Pro 15 right-aligned 12px before a SF Pro 20 `›` cream @0.5 at 15px right pad,
  hairline at y43; panel 312 → 264) · note 628 → 546, tightened to 2 lines "Taurus sun, Sagittarius
  moon: you want a home and a horizon. We deal you people who offer both." · ladder added (3 lit) ·
  CTA 742 → 668 · secondary added "Only your sun ever leaves this screen."
- Hero: unchanged (the panel is the control). Aurora top left violet.
- accent/haze 0.74 / 7.9 → 0.82 / 11.8.

## O-09 — Venus `1518:859` · A/B `onboarding_04`, `onboarding_29`

- A/B: Stardust — headline first, one lit object mid-screen, short sub, CTA. Ours — planet first at
  y90, four blocks of text under it (eyebrow, headline, sub-headline, body, chips, note), no chevron,
  no ladder.
- Moved: chevron added · eyebrow 372 → 104 · headline 398 → 120, sub-headline `1518:942` hidden and
  folded into line 2 ("Venus runs your heart. / Yours is in Taurus.") · body → Sub, SF Pro 13 →
  EB Garamond 17.5 at 196, 2 lines "You don't fall. You settle in — same booth, same order, a hand
  that stays." · hero frame 90 → 236 (sphere centre y386, halo 256–516) · chips 576 → 528 (two rows,
  ends 590) · note 660 → secondary at 742, one line "Venus rules Libra too. Notice who walks in." ·
  ladder added (4 lit) · CTA 742 → 668.
- Hero: sharp 128px Venus sphere + hairline ring kept as wave 5 built it. Aurora top already Venus
  rose `#c0395f`.
- accent/haze 1.16 / 25.7 → 1.23 / 28.3 (haze up because the halo now sits over darker ground).

## O-10 — Element `1519:957` · A/B `other-tabs_42`

- A/B: Stardust — element cluster on top, headline under it, one sub, CTA; nothing tabular. Ours —
  sphere at y62 with the caps line, then four label+sentence rows with hairlines (a table) pushing
  the CTA to 742.
- Moved: chevron added · eyebrow 322 → 104 · headline 346 → 120 · sub 428 → 196, SF Pro 13 →
  EB Garamond 17.5 (2 lines) · hero frame 62 → 250 with the sphere re-seated inside (sphere 285–405,
  halo 220–470, caps label at 422) · **Weather rows hidden, rebuilt as `Weather · 2×2` `1768:858`**
  at x30 y446: four 161×68 tiles (`#2B1E4C` @0.55, 1px `#FFF9F2` @0.14, r12), Taurus caps label +
  SF Pro 12.5 body, each ≤ 2 lines: "Kiln. They light you up; you keep the heat." / "They talk you
  out. You talk them into staying." / "Rain on a field. Slowly, then all at once." / "Two gardens,
  one fence. Nobody hurries." · note 688 → secondary at 742 "Every card in your deck shows this
  weather." · ladder added (4 lit) · CTA 742 → 668.
- Hero: unchanged sphere (Taurus tones). Aurora top already Taurus rim `#8fc24b`.
- accent/haze 1.28 / 13.8 → 1.35 / 17.7.

## O-11 — Flipped Card Rule `1481:1039` · A/B `onboarding_16`

- A/B: Stardust — headline, three big notification cards stacked in the band, nothing under them.
  Ours — two 90×148 cards with a callout pill and an arrow that read as a diagram, then three steps,
  no sub, no ladder.
- Moved: eyebrow 112 → 104 · headline 132 → 120 · **sub added** (clone of O-03's) at 196 "Everyone
  arrives as a veiled card. Align each other and both cards flip." · hero 232 → 258, resized 390×205 ·
  steps 452 → 474, gap 14 → 10 (128 tall, ends 602; all three already ≤ 2 lines) · ladder added
  (5 lit) · reassurance restyled to the secondary spec.
- **Hero rebuilt:** old small cards, callout pill and both captions hidden; new `card back · large`
  (clone of `1118:1928`, `rescale(0.38)` → 122×201) at x30 and `card face · Juniper · large` (clone
  of `998:1925`, same scale, keeps the IMAGE aura panel) at x238, the hairline dotted arrow moved
  between them at y96 with a two-line caps caption "IF YOU / BOTH ALIGN" in the gap. Reads "card
  back flips to her card". Aurora top left violet (Juniper is Libra).
- accent/haze 1.19 / 12.1 → 1.68 / 12.6.

## O-12 — Dealbreakers `1518:954` · A/B `onboarding_19`, `onboarding_23`

- A/B: Stardust — headline, a picker filling the band (tile grid or checkbox rows), CTA; selection
  is unmistakable. Ours — chips fine as the control, but the selected state was a slightly lighter
  violet on violet, header at 112/132/216, no ladder.
- Moved: eyebrow 112 → 104, "STEP 7 · PICK UP TO 3" → "DEALBREAKERS · PICK UP TO 3" · headline
  132 → 120 · sub 216 → 196, SF Pro 13 → EB Garamond 17.5 (2 lines) · chips stay at 282 (ends 505)
  · preview label 539 → 525, preview 559 → 545 · ladder added (5 lit) · reassurance restyled.
- Selected chips: fill `#3A2A6A` / stroke cream @0.5 → **Taurus tint** fill `#D6DC7C` @0.16, stroke
  `#D6DC7C` @0.85 (the account's colour; reads as chosen from the thumbnail). Chip size 37 tall /
  SF Pro 13 left as is. Aurora top left violet.
- accent/haze 0.74 / 11.8 → 0.86 / 12.0.

## O-13 — Photo Upload `1019:2462` · A/B `onboarding_04`

- A/B: Stardust — headline, one lit object, sub under it, consent row, CTA. Ours — already on the
  spec for headline/sub/CTA; missing the eyebrow, sub ran to 3 lines, ladder at 627.
- Moved: eyebrow added at 104 "PHOTOS · THE LAST THING ANYONE SEES" · headline kept at 120 (33/42,
  one line; fill set to cream `#F5EFE2`) · sub kept at 178, tightened to 2 lines "Photos stay veiled
  until you both align. Until then, people read your sky — not your face." · hero card 270 → 262
  (200×327, ends 589) · ladder 627 → 623, 6 lit · reassurance restyled.
- Hero check: the card's aura panel uses the **same imageHash as Juniper's canonical card
  `998:1925`** (`43b8eac6…`), no blur effect on the panel or the card — it is the crisp mystery aura.
  Left as is. Old `Atmosphere` auroras remain hidden; one frame instance.
- accent/haze 2.64 / 13.7 → 2.56 / 13.7.

## O-13b — The Field `1518:1040` · A/B `onboarding_29`, `other-tabs_36`

- A/B: Stardust — one artwork centred in the band (orbit / fanned deck), headline above, nothing
  competing below. Ours — fan + 333 + two caps lines stacked from 256 to 612, header at 112/132/216.
- Moved: eyebrow 112 → 104, "STEP 9 · …" → "THE FIELD · WHO IS ALREADY HERE" · headline 132 → 120 ·
  sub 216 → 196, SF Pro 13 → EB Garamond 17.5 (2 lines) · fan 256 → 246 · 333 492 → 462 · count
  label 578 → 562 · stat strip 602 → 582 (ends 592) · ladder added (6 lit) · reassurance restyled.
- Hero check: the five fan cards are the card back (gradient, inset hairline, seed of life, chakra
  column) at 109×180 — matches `1118:1928`. Left as is. Aurora top left violet.
- accent/haze 0.99 / 11.9 → 1.13 / 12.0.

## O-15 — Resume Onboarding `1516:855` · A/B `onboarding_07`

- A/B: Stardust's breather centres its copy mid-screen; the wave 6 brief overrides that for ours
  (headline at 120). Ours had the copy at 288–430 and the ladder at 470.
- Moved: eyebrow 288 → 104 · headline 312 → 120 · sub 400 → 196, SF Pro 13 → EB Garamond 17.5
  (2 lines) · ladder 470 → 623 (3 lit, unchanged = the saved step) · its caption 486 → 636, "STEP 4
  OF 6 · SAVED AFTER EVERY STEP" · CTA 668 ✓ · "Start my chart over" restyled SF Pro 14 cream @0.6
  (real action). No aurora, no hero.
- accent/haze 0.12 / 0.4 → 0.11 / 0.4.

## Left alone on purpose

- O-13's aura panel: same image as the canonical Juniper card, so not "de-blurred" — nothing to fix.
- O-09's 260px halo and O-10's 250px halo: unblurred radial ellipses @0.34 from wave 5, not blobs.
- O-08's panel rows are rebuilt to `Row · list` metrics rather than swapped for instances: the
  component has no value slot, and instance children cannot be repositioned.
- O-12 chip size and copy; O-11 step copy (already ≤ 2 lines); O-13b's fan cards.
- The ladder caption on O-15 (not in the breather spec, but it is what tells the user the step is
  saved).
- No Appllama credits spent; the cache answered every A/B.
