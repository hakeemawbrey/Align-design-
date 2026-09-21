# Wave 6 · agent R — Onboarding O-01 → O-04 (`1554:855`)

Renders (before / v1 / v2 / v3 / crops) in `scratchpad/w6r/`. Scores via
`scratchpad/score.py`; the metric counts only saturated+bright pixels so
numbers are relative (see agent-M's wave 5 note). Every render was read.
Furniture note: the three oldest screens (O-01, O-02, O-03) carried a 54px
"Status bar" frame with the icons at x 300; each now has a `1379:1915` clone
(icons at x 289, same as O-04 and the utility screens) and the old one is
hidden, not deleted. Home indicators are `1384:1928` clones at y 858.

## O-01 — Splash `1017:1926` (breather, mark only)
- A/B (welcome-screen_02 splash): Stardust is a glowing logo on a flat purple
  ground; ours is the wordmark plus a loading rail on the same ground. Nothing
  else on either.
- Moved: nothing. Eyebrow `READING THE SKY` was Space Mono 10 `#7D6F94` → SF
  Pro Semibold 10, ls 14%, cream @0.5 (the only off-system font in the flow).
  Status bar swapped for the kit clone; home indicator added.
- Hero: none (mark). Accent/haze 0.00 / 8.8 → 0.00 / 8.8.

## O-02 — Arrival `1017:2035` (welcome exception)
- A/B (onboarding_02): Stardust puts the headline at the top and the dark
  planet + orbs under it with two stacked pills on the planet; ours keeps the
  brief's variant — orbs and horizon on top, headline on the planet. Stardust's
  legal is one line; ours was two.
- Moved: headline 380 → **330** (render 339–404), sub 480 → 430 (ends 509),
  horizon ellipse 318 → 278 and `lights · six signs` 200 → 160 (both −40 so
  the rim clears the first headline line by ~30px at the text edges), link 740
  → **742** (13 `#A395B7` → 14 cream @0.6, a real action), legal 790 → **770**
  (11.5 two lines → 11 one line, x 30 w 330, `#B3A6C4` @0.5). Headline
  `#EFE6D6` → `#F5EFE2`. Kit status bar; home indicator added.
- Hero: unchanged (six sharp mini spheres over the dark-planet rim, from wave 5).
- Accent/haze 1.63 / 1.7 → 1.62 / 1.7.

## O-03 — Birth Data `1019:2354` (the rhythm exemplar)
- A/B (onboarding_09): Stardust = chevron, headline, sub, constellation +
  sign label, date wheel, CTA. Ours is the same skeleton; Stardust has no
  eyebrow, no ladder, no home indicator; ours had no eyebrow or home indicator.
- Verified on spec: chevron 26/68, headline top 120 (33px, one line), sub 178
  ends 230, readout 250, chip 336, picker 382–582, ladder 39/623 step 1 lit,
  CTA 38/668, reassurance 742 (14 `#7D6F94` @0.78).
- Drift fixed: added the **eyebrow** `STEP 1 · YOUR DATE` at y 104 (clone of
  O-03c's, cream @0.5); headline `#EFE6D6` → `#F5EFE2`; status bar → kit
  clone; **home indicator added** (was missing). The old Atmosphere aurora
  ellipses agent M flagged were already hidden — nothing to do.
- Accent/haze 0.71 / 12.4 → 0.71 / 12.2.

## O-03b — Age Blocked `1478:855` (utility)
- A/B (onboarding_03 login): Stardust's headline sits at the top with the
  form under it; ours had the whole block floating at y 288–454 mid-screen.
- Moved: eyebrow 288 → **104**, headline 312 → **120**, sub 400 → **178**.
  Added back chevron (clone of `1019:2461`) at 26/68 — the CTA is "check my
  birth date", so back is a real path.
- Copy: headline `The stars will / still be here.` (2 lines) → `Come back at
  eighteen.` (1 line); sub → EB Garamond 17.5 `#B3A6C4`: `Align matches
  adults. If the year you typed is wrong, that is the usual culprit.` (2 lines,
  ends 230).
- Hero: none, frame off (utility). Accent/haze 0.00 / 0.0 → 0.00 / 0.0.

## O-03c — No Birth Time `1481:944` (utility, control as hero-band element)
- A/B (onboarding_11, other-tabs_23): Stardust stacks headline, then the
  option rows/field with room around them, then the CTA; ours had the control
  jammed directly under a 4-line sub at y 344 and the lower half empty.
- Moved: eyebrow 112 → **104** (`STEP 3 · IF YOU DO NOT KNOW` → `STEP 1 · NO
  BIRTH TIME`, the old step number was stale), headline 134 → **120** (2 lines
  → 1: `The minute can wait.`), sub 224 → **178** (SF Pro 13 → EB Garamond
  17.5 `#B3A6C4`, trimmed to 3 lines, ends 257), `ROUGHLY WHEN` 322 → 278,
  control 344 → **420**, readout 400 → 482 (12 → 13), `I don't know` 438 →
  516, **ladder added** at 39/623 (step 1 lit — this is a branch of step 1),
  reassurance 742 (13 → 14 `#7D6F94` @0.78, `Add the exact time later and we
  recast you.` one line).
- Hero strengthened: new `horizon · day arc` (`1775:857`, x 85 y 296,
  220×112) — hairline semicircle cream @0.22 over a hairline horizon @0.14,
  3px ticks at afternoon/evening, and a 7px Taurus-core sun with a 30px halo
  at the morning position, lit to match the selected segment. Hairline
  geometry, no clip-art; the band now reads as one instrument (label, sun
  path, control, readout).
- Aurora instance stays at 0.35 (utility). Accent/haze 0.14 / 11.6 → 0.17 / 11.8.

## O-03d — Waitlist `1515:855` (utility, hairline rings)
- A/B (onboarding_29 partner orbit): Stardust = chevron, headline top, orbit
  art mid, CTA; ours had the rings at the top and the whole text block below
  them at y 450–640.
- Moved: eyebrow 450 → **104**, headline 472 → **120** (2 lines → 1: `Tulsa
  has no sky yet.`), sub 560 → **178** (SF Pro 13 → EB Garamond 17.5
  `#B3A6C4`, trimmed: `A deck needs enough charts, so we light cities one at a
  time. Yours is cast and saved; when Tulsa lights, you deal first.`, 3 lines,
  ends 257), `rings · waiting` 170 → **295** (centred at y 425 in the band),
  halo 272 → 397, dot 297 → 422, `YOU ARE NUMBER 344 …` 632 → **620** (it sits
  on the ladder row as this screen's progress), reassurance 742 (13 → 14
  `#7D6F94` @0.78, one line `Houston is live. Your card works there today.`).
  Back chevron added at 26/68 (you can go back and change the city).
- Hero: unchanged (one unlit point in three hairline rings). No aurora.
- Accent/haze 0.00 / 0.0 → 0.00 / 0.0.

## O-04 — Birth Sky `1518:1126` (step 2)
- A/B (onboarding_14): Stardust = chevron, headline, one-line sub, the
  rainbow ring with the day label in its centre, CTA — the ring sits at
  y ~300–560. Ours had no chevron, no ladder, the sub parked under the wheel at
  y 592, and the readout overrunning the band.
- Moved: **back chevron added** 26/68; eyebrow 96 → **104**; headline 118 →
  **120**; sub: the caption `Hold still — the stars are remembering you.` (SF
  Pro 13 at y 592) became the real sub at **178** in EB Garamond 17.5
  `#B3A6C4`: `Hold still. The sky is remembering where everything was. It
  never forgets.` (2 lines, ends 230); wheel 190 → **250** (250–550);
  readout 506 → 556 (4 lines → 3: dropped `READING YOUR HORIZON ···`, line
  height 15, ends 601, clear of the ladder); **ladder added** at 39/623 with
  steps 1+2 lit (step 2 = `#FF914D` @0.95, the value every O-05 ladder uses);
  reassurance 12 cream @0.5 → 14 `#7D6F94` @0.78 at 742.
- Hero: aura tile 169 → 198 and the readout well enlarged 150×100 @0.5 → 170×120
  @0.6 (blur 22) at 110/340, so the tile's baked-in ♉ falls under the
  `Taurus` readout and the well instead of hanging below it (agent M's note).
  Tried a shorter mask first (270×196) — it killed the glow (accent 0.93);
  restored the full 270×247 feathered mask. Top aurora already Taurus rim.
- Subject test: "a glowing bull wheel" (4) before and after.
- Accent/haze 1.63 / 19.5 → 1.52 / 19.7.

## Left alone on purpose
- O-02 keeps the brief's variant (hero on top, headline ~330) rather than
  Stardust's literal order (headline at ~163). The 160px of dark planet under
  the sub is the same empty planet Stardust has under its own CTAs.
- O-02's single holo + text link vs Stardust's two pills — the spec's
  secondary is a text link.
- O-03c and O-03d subs run 3 lines and end at 257, past the spec's 240; the
  hero-band content starts at 278/295 so nothing collides, and cutting more
  copy lost information (Sun/Moon exact; cast-and-saved).
- No ladder on O-03b or O-03d (dead ends, not steps); O-03c gets one because
  it continues the flow.
- O-01's two faint Atmosphere washes (breather, accent 0.00) and its loading
  rail untouched.
- O-04's baked-in ♉ is still faintly there behind the word `Taurus` under the
  well; it is the sign the screen is about and drawn, not typed. Cropping it
  out of the image itself needs a new asset upload.
- Old 54px status bars on O-01/O-02/O-03 hidden and renamed `(old, hidden)`,
  not deleted. No Appllama credits spent; the cache answered everything.
