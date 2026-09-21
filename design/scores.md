# Scores

Run `scratchpad/score.py` on the changed screens after every batch, A/B against
a named Stardust screen, record here. Axes and bands are defined in
`plan-stardust-parity.md` §5.

Measured on a 300px-wide thumbnail of each screen.
`accent%` = pixels with saturation > 0.50 and value > 0.50.
`light%` = pixels with value > 0.85 — the proxy for drawn form.

---

## 2026-09-17 — baseline, before the parity plan

**Stardust reference set**

| screen | accent% | light% | range | contrast | hues |
|---|---|---|---|---|---|
| Home Dashboard `oth_jka4o` | 1.20 | 1.23 | 0.500 | 0.121 | 5 |
| Sun Sign Result `oth_vaabh` | 19.47 | 6.34 | 0.893 | 0.264 | 2 |
| Scorpio Profile `oth_m9j2z` | 18.93 | 5.13 | 0.862 | 0.217 | 1 |
| Tarot Card Result `oth_zr0f1` | 3.20 | 2.02 | 0.448 | 0.113 | 2 |
| Pink Moon Article `oth_be945` | 1.41 | 10.08 | 0.903 | 0.275 | 2 |
| **mean** | **8.84** | **4.96** | 0.721 | **0.198** | 2.4 |

**Align, bespoke section**

| screen | accent% | light% | range | contrast | hues |
|---|---|---|---|---|---|
| S-05 The Deck | 2.03 | 0.88 | 0.569 | 0.147 | 3 |
| G-23 Your Chart | 15.37 | 6.26 | 0.901 | 0.233 | 3 |
| S-21 Alignment | 7.79 | 7.98 | 0.906 | 0.235 | 2 |
| S-09 Chat | 0.27 | 0.17 | 0.434 | 0.097 | 3 |
| G-05 You | 5.27 | 2.16 | 0.679 | 0.165 | 2 |
| **mean** | **6.15** | **3.49** | 0.698 | **0.176** | 2.6 |

### Read

Quantitatively we are close on every axis. `G-23` vs `Scorpio Profile` is the
telling pair — 15.37 / 6.26 / 0.233 against 18.93 / 5.13 / 0.217, which is a
tie, and the Scorpio screen is still plainly the better screen.

**Subject test (axis 5), scored by hand from thumbnails:**

| screen | name the subject in 3 words, no text | score |
|---|---|---|
| Scorpio Profile | "a glowing scorpion" | 5 |
| Pink Moon Article | "a big moon" | 5 |
| Sun Sign Result | "a glowing scorpion" | 5 |
| Home Dashboard | "a ring of days" | 4 |
| Tarot Card Result | "a glowing planet" | 4 |
| — | | |
| G-23 Your Chart | "a gold blur" | 1 |
| S-21 Alignment | "a purple blur" | 1 |
| S-05 The Deck | "a card, pink smudge" | 2 |
| G-05 You | "a gold blur, a list" | 1 |
| S-09 Chat | "a chat" | 3 |

Stardust 4.6, Align 1.6. **This is the entire gap**, and it is not a colour
problem — it is that nothing in our file is drawn.

## 2026-09-17 — first two screens on the founder's boards

| screen | accent% | light% | contrast | hues | vs | subject test |
|---|---|---|---|---|---|---|
| G-23 Your Chart · Taurus (figure tile) | 8.65 | 5.34 | 0.229 | 3 | Scorpio Profile 18.93 / 5.13 / 0.217 | "a green bull" — **5** (was 1) |
| S-05 The Deck (Libra aura tile on the card) | — | — | — | — | — | "a card, an aura photo" — 4 (was 2) |

Accent is under the oracle band because the founder's boards sit on black,
darker than Stardust's fields; light mass and contrast are at parity. The
subject test is the axis that moved, from 1 to 5, which is the whole point.

| G-05 You · Taurus (aura tile on your card) | — | — | — | — | Jai profile card | "a person's aura, a card" — 4 (was 1) |
| G-09 Matches (six aura tiles) | 16.56 | 9.37 | 0.176 | 6 | Your Orbit / Home 1.2 | "six glowing people" — **5** (was 2) |
| S-09 Chat (Libra avatar) | 0.48 | 0.10 | 0.092 | 3 | journal 0.28 | quiet, as it should be |

G-09 runs above the instrument band, but all of its colour is people — six
subjects, six hues, no atmosphere — which is the rule that matters more than
the band. The per-sign card strokes now agree with the auras inside them.
| O-05 Sign Reveal · Taurus (figure tile hero) | 5.43 | 6.34 | 0.246 | 2 | Sun Sign Result 19.47 / 6.34 / 0.264 | "a green bull" — **5** (was 1) |
| S-21 Alignment (Libra × Taurus aura tiles, screened) | 9.81 | 7.13 | 0.225 | 1 | Cycle Insights 0.27 | "two auras melting" — 4 (was 1) |

Placement note for two tiles on a foil card: the screen blend has to sit on
the image nodes themselves, not on a wrapper frame with a mask inside — a
masked wrapper composites normally and the tile rims show. No well under
screened tiles on a bright foil; it reads as a dark ring.
| S-17 Club · Taurus room (orb + 3 moon-sign avatars) | 8.64 | 0.31 | 0.163 | 3 | Your Orbit | "a room of people" — 4 (was 2) |
| S-07 Match (Taurus × Libra cards) | 2.51 | 6.91 | 0.212 | 2 | Invite your partner | "two cards, two auras" — 4 |
| S-08 Veil Lifts (Libra aura over the veiled portrait) | 2.88 | 5.18 | 0.209 | 2 | — | "an aura lifting off a face" — 4 |

## 2026-09-18 — Wave 1 closed: the instrument zone, quieted

Four agents in parallel, disjoint screen sets, every screen-level ambient
glow and geometry figure hidden (never deleted). A `haze%` column was added
to the scorer mid-wave — dim saturated pixels whose hue departs from the
ground's — because `accent%` (value > 0.5) never saw the washes at all.

| screen | accent% | haze% | note |
|---|---|---|---|
| S-05 The Deck | 5.80 | 2.68 | card's aura tile is the whole number |
| S-05b / c / d / e | 2.1 / 1.4 / 1.2 / 2.1 | — | clones unified to FILL; S-05b takes Virgo |
| S-03 / S-04 / S-10 | 2.1 / 2.1 / 0.03 | — | |
| S-09 chat ×7 | 0.21 mean | **0.29 mean** (was 12–17) | Juniper's ember bubbles → neutral `#2B1E4C`, keyline off |
| G-09 Matches | 15.34 | 7.1 | six people; content, not atmosphere |
| S-07 / S-08 | 2.5 / 2.9 | 0.26 / 0.00 | celebrations keep their blooms |
| S-21 Alignment | 9.81 | 0.04 | card holds on flat ground |
| S-17 Club / S-17b | 1.26 / 0.85 | 1.5 / — | from 8.64 |
| **S-02 Auth** (new) | 0.05 | 0.04 | Stardust login 0.09 |
| **S-06 Expand** (new) | 1.40 | 1.19 | Tarot Card Detail 3.2 |

Stardust product screens on the same scorer: haze 0.05–1.5%, accent median
2.03%. Ours after the wave: see the printed medians in the commit message.
G-09 and S-05 sit above the band on purpose — the number is the founder's
art, which is the subject.

## 2026-09-18 — Wave 3 closed: onboarding on the aurora frame

Four agents, 16 screens (13 new). Every framed screen instances the same
component (`1473:856`); breathers and the three utility beats opt out.

Framed screens: **16.50% median over 13 framed screens; breathers 0.00%**. Stardust onboarding median 19.94%.

| screen | accent% | hero |
|---|---|---|
| O-02 Arrival | 18.18 | six discrete orbs on a dark horizon |
| O-03 Birth Data | 18.44 | constellation over the wheel |
| O-03b Age Blocked | 0.00 | — (utility) |
| O-03c No Birth Time | 0.14 | segmented time-of-day |
| O-03d Waitlist | 0.00 | rings around one dim lobe |
| O-04 Birth Sky | 17.02 | 12-orb wheel, Taurus lit |
| O-05 Sign Reveal | 5.43 | the bull (figure tile) |
| O-06 User Manual | 0.00 | — (breather) |
| O-07 Big Three | 16.92 | sun, moon, rising as spheres |
| O-08 Chart Check | 8.76 | flat confirm rows |
| O-09 Venus | 16.31 | Venus as a ringed sphere |
| O-10 Element | 14.30 | the Earth orb |
| O-11 Flipped Card Rule | 11.56 | card-back to card-face diagram |
| O-12 Dealbreakers | 7.93 | chip grid |
| O-13 Photo Upload | 16.50 | the mystery-aura card, large |
| O-13b The Field | 16.72 | five card backs fanned |
| O-15 Resume | 0.12 | — (breather) |
| S-11 Paywall | 18.87 | teal field, timeline |

Findings from the agents, kept: the aurora's opacity is nonlinear against
the accent metric (0.7 ≈ 3%, 0.86 ≈ 12%, 1.0 ≈ 17%) because it sits at the
value threshold — tune by measurement, not by alpha; the haze band misreads
screens whose top aurora is not violet, so it is an instrument-zone measure
only. Invented birth facts unified to Tulsa, OK · May 4 1994 · 3:52 PM, a
time that actually gives a Libra rising for a Taurus sun.
| O-05 Sign Reveal, now framed | 12.72 | the bull on a Taurus aurora (was 5.43 unframed) |

## 2026-09-18 — the re-pass: all 106 screens, one style

Run as a lint, not a look (`repass-plan.md`). One script over every screen
returned 46 with violations; five rule-scripts fixed them; the re-lint
returned 0. Then one screenshot per sub-section, cropped and scored.

| section | n | median accent | median haze | max accent | Stardust zone |
|---|---|---|---|---|---|
| Onboarding | 18 | 11.94 | 11.03 | 17.02 | onboarding 19.9 |
| Core Flow | 20 | 1.31 | 0.54 | 9.31 | product 2.03 |
| Guidance | 8 | 9.70 | 15.23 | 14.92 | oracle 12–28 |
| Club | 6 | 0.66 | 0.16 | 4.33 | product |
| Limits & Align+ | 7 | 0.04 | 0.06 | 19.96 (Trial) | utility / paywall |
| Auth | 8 | 0.00 | 0.00 | 0.20 | utility <1 |
| Account | 8 | 0.27 | 0.16 | 5.85 | utility |
| Matches & Safety | 5 | 0.10 | 0.00 | 14.17 (G-09) | product |
| Subscription | 4 | 0.00 | 0.00 | 22.59 (Trial) | utility / paywall |
| System States | 4 | 0.04 | 0.07 | 0.04 | utility |
| Legal, Safety & About | 13 | 0.00 | 0.00 | 4.15 (red pill) | utility |
| Notifications | 5 | 0.05 | 0.00 | 0.18 | utility |

What the lint fixed: second glows and geometry on the five Guidance chart
screens (the single hero spotlight stays); every ambient glow and figure on
Sky, Calendar, Glossary, You, Splash, Offline, No Cards; Post Detail's three
avatars to aura tiles by moon sign; the `✦` range on three early holo
buttons. Contact sheets: `design/assets/all-screens-1.png`, `-2.png`.

Whole re-pass: three `use_figma` calls, twelve screenshots, two image reads.

## 2026-09-18 — the last four steps

1. **Onboarding louder.** Every framed screen's top aurora to full opacity
   with lifted inner stops (O-03c, a form, kept at 0.35). Framed median
   11.94 → **16.96%** (Stardust 19.9).
2. **The twelve figures.** Eleven `O-05 — Sign Reveal · <sign>` variants
   cloned from Taurus: figure tile, sign-coloured spotlight and aurora, a
   sermon per sign in the file's voice. Every sign a new user could be now
   has its reveal.
3. **Stateful hue.** Four `S-05x — Deck · sky <element>` variants: the deck
   with the ground washed by the moon's element (fire / earth / air / water)
   and a caps readout `TONIGHT · MOON IN LEO · FIRE SKY`. This is Stardust's
   phase-driven ground, ours by the sky.
4. **Prototype.** 156 tap reactions: every holo button and back chevron
   through S-01 → onboarding → deck → match → chat, every tab bar to its
   root. Flow starting point `Align · full flow` at S-01. Present it from
   the Figma file to tap through on a phone.

Also built here: S-01 Open App and S-18c Post Removed, the two the restarted
agent never reached. All 109 planned screens plus 15 variants exist.
Strip of the new rows: `design/assets/reveals-and-sky-states.png`.

## Fix pass — founder phone review (2026-09-19)

Hakeem flagged five screens as "still weird" and asked about the horoscope screens. Changes, one script each:

| Screen | Problem | Fix | accent% | haze% |
|---|---|---|---|---|
| O-03 Birth Data (and all 27 aurora instances) | full-opacity aurora became a flat violet wall over ~60% of the screen | `aurora · top` reshaped in the component: 520×380 at y −170, stops 0.82/0.42/0.10/0, blur 80. Fades before the headline sub. | 0.8 | 15.1 |
| S-15 Cosmic Calendar | Mercury was the old blurred blob | 88px sphere, offset-centre radial `#FFF4DC → #F0CC8C → #C48F46 → #3A2560`, inner shadow, one gold drop shadow, tilted hairline ring | 1.0 | 3.1 |
| S-12 Trial Active / G-14 Trial Ending | vector clip-art door + key | arch mask (150×220, 75 radius) over the gold Gemini aura tile, cropped so the glyph is below the sill; hairline gold rim; sill light; door glow at 0.42 | 2.2 / 7.4 | 25 / 37 |
| P-02 Priority Queue | sparse dots on a thin ellipse | orbit 330×124 hairline with 14 slot ticks; avatars 36/40/66 on the arc; you = green rim + Taurus aura bloom behind | 0.9 | 1.8 |
| S-13 Wait for Reset | dim vector lobe + rings | Taurus aura tile (SCREEN, feathered) inside three cream hairline rings, dark well under the countdown | 0.0 | 1.2 |
| S-14 Sky · today (the horoscope) | never got a hero | Taurus aura tile behind the twelve-sign wheel with a dark well under the season readout | 3.1 | 7.7 |

Haze on S-12/G-14 is the gold aurora frame plus the door glow: paywall zone, intended.
Render strip: `design/assets/fix-pass-strip.png`.
