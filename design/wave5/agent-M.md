# Wave 5 · agent M — Onboarding (`1554:855`)

Scoring note: `score.py` as it stands today counts only saturated+bright pixels
(s>0.5, v>0.5), so the exemplar O-03 itself scores 0.80% and the whole fixed
strip averages 1.1%. Stardust's onboarding scores ~20% only because its ground
is a saturated violet. The 15–25% onboarding target is therefore not reachable
on our darker ground with this metric; numbers below are relative, and every
render was read by eye. Screenshots + crops in `scratchpad/w5m/`.

| screen | node | subject test before → after | what changed | accent / haze before → after | Stardust still |
|---|---|---|---|---|---|
| O-01 Splash | `1017:1926` | wordmark on dark → same | nothing (breather; two faint atmosphere washes @0.22/0.14, accent 0) | 0.00 / 8.8 → same | welcome-screen_02 splash |
| O-02 Arrival | `1017:2035` | "smudged coloured dots over a hill" (2) → "planets rising over a dark horizon" (4) | six `light · <sign>` ellipses were blurred (LB5) radial dots fading to transparent = mini blobs; rebuilt as sharp mini spheres (hard edge, offset-centre radial to a deep rim, inner shadow, rim drop shadow); `bloom · *` set to 0.55. Dark-planet horizon (hairline rim) kept; old Atmosphere auroras already hidden; one Aurora frame instance | 2.17 / 2.5 → 1.63 / 1.7 | onboarding_02 welcome — same composition (dark planet + orbs); ours now has the same hard-edged orbs |
| O-03 Birth Data | `1019:2354` | "constellation + picker" (4) — verify only | untouched. Note: its `Atmosphere` still carries the old `Aurora violet` @0.21 and `Aurora warm` @0.13 on top of the instance; left as-is since it is the exemplar | 0.80 / 15.2 | onboarding_09 birthday |
| O-03b Age Blocked | `1478:855` | none (utility) | nothing | 0.00 / 0.0 | onboarding_03 login |
| O-03c No Birth Time | `1481:944` | none (utility) | nothing; aurora instance at 0.35 as intended | 0.14 / 11.6 | other-tabs_23 birth time |
| O-03d Waitlist | `1515:855` | "green smudge in rings" (1) → "one unlit point in rings" (utility, no subject) | hid `aura lobe · Taurus (dim)` (120px radial, LB30 = blob); added a 6px cream dot + 56px unblurred halo @0.30 at the ring centre | 0.00 / 0.2 → 0.00 / 0.0 | onboarding_29 partner orbit (rings) |
| O-04 Birth Sky | `1518:1126` | "wheel of blurry dots" (2) → "glowing bull wheel" (4) | inserted `hero · aura photo · Taurus` (Aura photo tile `1426:857`, 300w, SCREEN, feathered ellipse mask LB34) behind the wheel + `well · readout` (#12052D @0.5, LB20, 150×100) under the centre text; hid the screen-level `spotlight · wheel (Taurus)` (LB70) so the instance is the only screen-level aurora; the 12 `orb · *` recoloured to sharp mini spheres (offset-centre radial ending in a deep tone, inner shadow, rim shadow); blooms to 0.45 (Taurus 0.7) | 1.02 / 23.6 → 1.49 / 19.6 | other-tabs_22 astrology intro, S-14 exemplar |
| O-05 Sign Reveal · Taurus | `1010:1926` | "green blur" (3) → "a glowing bull" (5) | hid three screen-level glow ellipses: `hero glow · Taurus` (radial LB100), `sign glow · Taurus` (LB150), `glow · floor` (LB130). Kept `well · hero` + figure tile + Aurora frame (top already Taurus rim) | 5.94 / 23.0 → 4.85 / 17.9 | other-tabs_25 Sun in Scorpio |
| O-05 variants ×11 | `1633:857…2187` | each reads as its own figure (ram, twins, crab, lion…) | same three glows hidden on every variant; hero frame renamed `hero · <Sign> figure`; each keeps its own Figure tile and rim-coloured top aurora (checked: Aries #c9352b … Pisces #653dbf) | accent 2.9–10.1, mean 6.7 | other-tabs_25/26 sign results |
| O-06 User Manual | `1481:857` | none (breather) | nothing | 0.00 / 0.0 | other-tabs_38 profile text |
| O-07 Big Three | `1519:855` | "three planets" (4) | nothing — spheres already sharp (inner shadow + drop shadow + Sun ring), blooms LB18 < 30 | 2.82 / 25.5 | paywall_01 planet+moon |
| O-08 Chart Check | `1516:960` | panel (instrument-style) | nothing | 0.74 / 7.9 | other-tabs_49 personal details |
| O-09 Venus | `1518:859` | "big pink soft ball" (2) → "a pink ringed planet" (5) | rebuilt `hero · Venus`: 200px soft sphere + 340px LB30 glow @0.70 → 128px sharp sphere per S-15 recipe (offset-centre radial core-light→core→rim→deep, INNER_SHADOW ground @0.55 (-6,-6) r14, DROP_SHADOW rim @0.45 (0,10) r34), hairline ring split back @0.22 / front @0.42 (clipped to lower half), 260px unblurred halo @0.34. Added missing **status bar + home indicator** (cloned from O-08) | 3.40 / 31.2 → 1.16 / 25.7 | onboarding_25 trial planet |
| O-10 Element | `1519:957` | "green ball cut off at top, no status bar" (2) → "a green ringed planet" (5) | rebuilt `hero · Earth orb`: 180px orb + LB30 glow + solid `lit edge` overlay → 120px sharp sphere (same recipe, Taurus tones ending #1f3f16), hairline ring @0.28 −18°, 250px halo @0.34; caps label kept. Added missing **status bar + home indicator** | 4.17 / 17.0 → 1.28 / 13.8 | onboarding_25 |
| O-11 Flipped Card Rule | `1481:1039` | "two cards, an arrow" (4) | nothing — card back + Juniper card, hairline arrow | 1.18 / 12.2 | onboarding_16 cards |
| O-12 Dealbreakers | `1518:954` | chips (instrument-style) | nothing | 0.74 / 11.8 | onboarding_23 checklist |
| O-13 Photo Upload | `1019:2462` | "a veiled card" (4) | hid the old `Atmosphere > Aurora violet` @0.20 and `Aurora warm` @0.15 (aurora-wall rule: instance only). Card with the blurred IMAGE aura panel kept | 2.76 / 16.8 → 2.59 / 13.8 | other-tabs_37 tarot card |
| O-13b The Field | `1518:1040` | "fanned cards, 333" (4) | nothing | 0.99 / 11.9 | other-tabs_36 fanned deck |
| O-15 Resume | `1516:855` | none (breather) | nothing | 0.12 / 0.4 | onboarding_07 intro copy |

Appllama: 1 credit spent (semantic search "birth chart wheel…"); looked at
Astroscope Birth Chart Intro and MoonX Core Personality — both use flat
glyph rings, nothing to borrow; the cached Stardust welcome (`onboarding_02`)
was the decisive A/B for O-02 and confirmed hard-edged orbs over a dark
horizon.

## Left alone / unsure
- O-03 exemplar still has its old Atmosphere aurora ellipses visible under the
  instance (0.21 / 0.13). Not touched — it is the reference; flag for whoever
  owns the exemplars.
- O-04: the Aura photo tile shows the founder's baked-in ♉ glyph just below
  the readout. Kept — this is the sign the screen is about and the glyph is
  drawn, not typed — but if it reads as clutter, shift the tile up ~30px.
- O-01's two faint washes (breather, accent 0.00) left in place.
- O-07 blooms (LB18) left — below the blob threshold and the spheres are sharp.
- Hidden nodes were hidden, not deleted, everywhere.
