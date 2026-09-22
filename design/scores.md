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

## Wave 5 — the visual re-pass (2026-09-21)

Five agents (M–Q, N re-run after a rate limit), 123 screens, every one
screenshotted and read, not linted. Brief: `design/wave5/BRIEF.md`; notes
`design/wave5/agent-*.md`. What the founder's phone review had caught on five
screens turned up on 31 more:

| failure | screens rebuilt |
|---|---|
| vector clip-art standing in for an object | golden door ×2, key, coin medallion (S-11), camera glyph (SF-01), checkmark medal (SF-02), dim sun (G-15), tray illustration (S-19b), grey card box (G-12), aura-coin discs (G-24/25/26), six foil match cards (G-09) |
| blurred blob as hero or planet | Mercury (S-15), Venus (O-09, G-26), Element orb (O-10), six sign lights (O-02), waitlist lobe (O-03d), Sagittarius bloom (G-19), S-16 wall + blob, pink "photo" (S-08, S-05d), Mireya's avatar (S-17b), S-14 insight cards |
| aurora wall | component top ellipse reshaped (27 instances); old atmosphere ellipses hidden under the instance on O-03, O-13, S-11; green walls on the four Guidance chart screens; three stacked glows on every Sign Reveal |
| oracle screen with no hero | S-14 Sky, O-04 Birth Sky, G-09b No Matches |
| hard-edged tile (ellipse image node under a blurred mask renders unfeathered) | S-21, S-08, S-07 — tiles rebuilt as rectangles |
| card aura panel blurred (7px layer blur + image filters on the founder's tile) | all 13 deck-card screens — blur and filters stripped, the mystery aura is crisp again |

Section medians after the wave (scored on 300px tiles cut from the section renders):

- **Onboarding** median accent 1.63%, median haze 12.4% (29 screens)
- **Core Flow** median accent 2.85%, median haze 1.2% (25 screens)
- **Guidance** median accent 1.28%, median haze 3.1% (8 screens)
- **Club** median accent 0.11%, median haze 0.1% (7 screens)
- **Limits & Align+** median accent 0.05%, median haze 1.1% (7 screens)
- **Auth** median accent 0.00%, median haze 0.0% (8 screens)
- **Account** median accent 0.21%, median haze 0.1% (8 screens)
- **Matches & Safety** median accent 1.95%, median haze 0.2% (5 screens)
- **Subscription** median accent 0.00%, median haze 0.0% (4 screens)
- **System States** median accent 0.01%, median haze 0.0% (4 screens)
- **Legal, Safety & About** median accent 0.00%, median haze 0.0% (13 screens)
- **Notifications** median accent 0.07%, median haze 0.0% (5 screens)

The accent metric barely registers the founder's soft tiles and the gold
frame, so the onboarding band (15–25%) is not reachable on this ground with
this scorer; the wave was judged on the render and the subject test, and the
numbers are recorded for the trend only. Haze on Onboarding is the aurora
frame, intended. Full per-screen table: `design/wave5/scores.md`. Contact
sheets rebuilt: `design/assets/all-screens-1.png` (Onboarding, Core Flow,
Guidance, Club) and `all-screens-2.png` (the rest).

Left as-is on purpose (flagged by the agents): the shared card back's seed
of life (the mark, on G-27/S-02/S-01); skeleton blocks panel-violet not grey
(G-16/G-17); sign glyphs baked into tiles wherever the tile stands for a
sign (reveals, cards, avatars); the S-05x sky washes (fire haze 19.5% is the
lever if the founder still finds it heavy: wash top stop 0.78 → 0.6).

### S-09b Chat · Alignment — rebuilt (2026-09-21, founder note)

The chat's Alignment sheet was the old seven-chakra device ("five of seven
centres agree"), which reads as nothing. It is now the same guide as S-21,
pulled up from the chat: eyebrow `ALIGNMENT · TAURUS × LIBRA`, the two
auras melting (cloned from S-21's card), the one-line Venus reading, then
three stacked sections **SPARK · where it lights / RUB · where it catches /
ALIGN · where it holds**, two reads each, and a `Read the full alignment ›`
link to S-21. The chat header's `›` now navigates to it in the prototype.

### S-21 Alignment · Juniper × You — the full guide (2026-09-21, founder note)

The full alignment page showed the card, a Spark/Rub/Align tab strip with
only the Spark reads, and the button. Now: the card tightened (auras at 0.8,
302 tall), the three sections stacked in full under `THE GUIDE · SPARK, RUB,
ALIGN` (same reads as the chat sheet S-09b), and a `Star charts · both,
overlaid — COMING SOON` row above the CTA. The tab strip, spark-only list
and pagination dots are hidden, not deleted.

### S-21 — one guide card with tabs (2026-09-21, founder note)

After a three-frame long read, a hand of seven read cards, and a loose
card + meters + pills were each rejected ("too much reading", "too
complicated, make it fun", "no introduction, everything feels out of
place"), the founder settled the direction: **one guide card, the section
titles as tabs, more text per section.**

S-21 `1378:1915` is one card, 326×555, in the deck card's language:
eyebrow `JUNIPER × YOU`, the two auras melting, the introduction (*Venus
rules you both.* / She balances the room; you keep it.), then a tab strip
`SPARK · RUB · ALIGN · RELATIONSHIP` and one section at a time — caps label
with the five-dot meter (deck-card colours `#7FD8F5` `#FF9AC4` `#FFE066`
`#D695DE`), an italic headline, a four-line paragraph, a `TRY` line, a
pager — and the card footer `LIBRA · AIR ◇ TAURUS · EARTH`, `ALIGN · №
031/∞`. The three other tab states are frames `1754:855` (Rub),
`1754:1085` (Align), `1754:1315` (Relationship) in Core Flow row 6; the
tabs navigate between them with smart-animate. The chat sheet S-09b links
to S-21.

## Wave 6 — onboarding, the second pass (2026-09-21)

Three agents (R, S, T), 29 screens, brief `design/wave6/BRIEF.md`, notes
`design/wave6/agent-*.md`. The founder: "it's almost there." What was left
was **rhythm**: Stardust's onboarding puts the chevron, headline, sub, hero
band and button at the same height on every screen; ours moved the headline
between y 118 and y 330, showed the chevron on some steps and the progress
ladder on two of twelve. The wave measured Stardust's rhythm, transposed it
to 390×874 (chevron 26/68 · eyebrow 104 · headline 120 · sub 178 · hero
band 250–600 · ladder 623 · CTA 668 · secondary 742) and moved every step
screen onto it. The ladder is now six phases lit monotonically (birth 1 ·
sun 2 · big three 3 · Venus and element 4 · rules 5 · photo 6).

| screen | what changed | accent% | haze% |
|---|---|---|---|
| O-01 Splash | eyebrow to SF Pro, kit status bar, home indicator | 0.00 | 8.8 |
| O-02 Arrival | welcome pattern kept (hero on top); headline/sub/legal to spec | 1.61 | 1.7 |
| O-03 Birth Data | exemplar; missing eyebrow and home indicator added | 0.71 | 12.1 |
| O-04 Birth Sky | chevron, real sub, wheel in the band, ladder, glyph tucked under the readout | 1.47 | 19.3 |
| O-05 Sign Reveal ×12 | rebuilt text-on-top / figure-in-band like every other step; status bar, chevron, ladder, pearl CTA; twelve variants pixel-consistent | 4.78 | 22.3 |
| O-06 User Manual | nine-line wall → three two-line items, one rim-coloured dot | 0.01 | 0.0 |
| O-07 Big Three | chevron, sub, spheres in the band, bullets ≤ 2 lines, ladder | 2.95 | 24.8 |
| O-08 Chart Check | rows to list-component metrics, ladder, CTA 742 → 668 | 0.87 | 11.6 |
| O-09 Venus | sphere in the band, headline merged, chips, one-line secondary | 1.30 | 28.0 |
| O-10 Element | four long weather lines → 2×2 tile grid | 1.41 | 17.5 |
| O-11 Flipped Card Rule | diagram → card back flipping into Juniper's card | 1.76 | 12.3 |
| O-12 Dealbreakers | header to spec, selected chips Taurus-tinted | 0.86 | 11.7 |
| O-13 Photo Upload | eyebrow, sub ≤ 2 lines, card in the band | 2.67 | 13.6 |
| O-13b The Field | header to spec, fan/333 in the band | 1.22 | 11.8 |
| O-03b/c/d, O-15 | utility branches and the breather on the same header; O-03c gained a hairline day-arc hero | ≤ 0.20 | ≤ 11.6 |

Flow strip in step order: `design/assets/onboarding-flow.png`.

### O-14 — Paywall · seven days (2026-09-21, founder note)

The original onboarding ended with `O-14 — Paywall` after The Field (route
map: O-13b → O-14 → S-12 trial → the deck); the redesign had never carried
it over. Built in the new language as `1795:2256` in Onboarding row 6, on
the Wave 6 rhythm: chevron + `Not now`, eyebrow `YOUR DECK IS DEALT`,
headline *Three people are already in your orbit.*, Garamond sub, the
golden door hero from S-12 scaled into the band, three price cards
(weekly $5.55 · **yearly $88.88, 7 days free, save $84** · monthly $14.44 —
the G-13 prices), the caps terms line, ladder with all six phases lit,
`Start seven days free ✦`, `Maybe later — deal me in free`, legal.
Prototype: O-13b → O-14; CTA → S-12 Trial Active; skip and secondary → the
deck.

The Figma file was restored from version history (3:54) after the desktop
app dropped the Stardust section during an MCP reconnect; the audit showed
everything through the ladder normalisation survived, and O-14 was rebuilt.

### The deck's horoscope strip is back (2026-09-21, founder note)

v1's deck carried a strip under the header — *Venus enters Leo tonight — be
bolder.* / `TODAY'S SKY · TAP FOR YOUR FULL READING` — that the redesign
dropped. A small count-line teaser was tried first ("needs to be more
prominent"), so it is now the full strip: `sky strip` 342×40 at y 106, panel
`#2B1E4C` with a gold hairline, a 20px gold moon sphere, *Venus enters Leo
— be bolder.* and `TODAY'S SKY ›` in gold; it navigates to S-14. The count
(`11 / 15`) or the state line moved into the title row's right slot beside
the gold ✦. Applied to S-03, S-04, S-05, S-05b, S-05c, S-05d, S-05e; the
four S-05x sky states keep their own readout.

### S-09b carries the guide card (2026-09-21, founder note)

"S-09b is still not right like we agreed on earlier." The chat sheet now
holds a clone of the final S-21 guide card (auras, introduction, the
Spark / Rub / Align / Relationship tabs, one section at a time, footer)
instead of the earlier stacked list; the sheet grew to 634 (y 240) to fit
it, with the grabber and `PULL DOWN TO CLOSE` kept above the card.

### Deck spacing and instructions (2026-09-21, founder note)

With the sky strip under the title the card sat 4px beneath it. Header
bottom padding +24 on every face-down state (S-03, S-04, S-05, S-05b/c/e)
so the card starts at y 174; the gesture legend moved to y 712 and was
simplified from two rows of four items to one row (`← RELEASE` / `ALIGN →`)
and one line (*Hold the card to peak · 3 left*); the comet count now lives
only on the gold ✦. The Peak state (S-05d) keeps its countdown header and
no strip.

### G-05 — You · Home, the hub (2026-09-22, founder note)

The You tab landed on the card screen with a list under it; there was no
hub. A first cut (avatar strip, four flat tiles, five rows) was "bland and
not as cohesive as Stardust", so `G-05 — You · Home` (`1809:2258`, Account
row 2) is built as an **oracle screen**: a Taurus-rim spotlight, the
feathered `Figure · Taurus` tile as the hero at the top, a dark well under
*Hakeem, 32* / `TAURUS SUN · SAGITTARIUS MOON · LIBRA RISING` / Tulsa ·
reading from Houston; then **six mini cards** in the card language (panel,
Taurus keyline, each with its own visual): Your card (card back) → G-05a,
Your sign (Taurus aura) → G-23, Cheat sheet (twelve-dot ring) → S-20,
Today's sky (gold sphere) → S-14, Cosmic calendar (moon) → S-15,
Notifications (lit dot) → S-19; then three rows, Blocked signs (2 · Scorpio,
Aries) → P-01, Settings → G-07 and Help & support → G-29; tiles 92 tall so
the three rows clear the tab bar. The `ALIGN+ · FOUNDING` pill top right opens G-13. The old
G-05 is renamed `G-05a — Your Card · Face Down`; all 34 You-tab reactions
point at the hub.

### G-05 hub — pearl pass reverted, spacing fixed (2026-09-22, founder note)

A pearl-holo pass (pearl rims, keylines, sheens, row strokes, pill and name
in the four-stop gradient) was tried and rejected ("looks weird, go back").
The hub is back to the Taurus-keyline version. Spacing: eyebrow `YOUR SKY ·
TAURUS` left-aligned at x 24 so it clears the Align+ pill; tiles from y 332
at 92 tall with an 8px gap; rows 12px below the tiles with 6px between,
the last row ending 12px above the tab bar.

### G-05 hub — the Stardust settings pattern (2026-09-22, founder note)

"Use Appllama and look at Stardust and make this screen better." Fetched
Stardust's own hub, *Your Settings* (`oth_zgx1n` Profile Settings,
`oth_qh0ga` General Settings, `oth_pc4wa` Personal Details; 3 credits). It
does four things ours didn't: caps section headers with a *scroll for more*
hint, a horizontal carousel of illustrated feature cards, one glowing
rainbow CTA between sections, and grouped list panels with hairline
dividers rather than separate pill rows. The hub now follows it under the
figure hero: `YOUR SKY` + a card carousel (Your sign · Today's sky ·
Calendar · Cheat sheet, the fourth peeking off the edge), the pearl holo
`Align+ · Founding member ✦` as the one glowing element, `YOUR CARD` panel
(Your card · Edit card · Blocked signs) and `APP` panel (Notifications ·
Settings · Help & support), rows 40 tall, ending 8px above the tab bar.

### G-05 hub — the Your card preview (2026-09-22, founder note)

"Need a better Your card section." The `YOUR CARD` text panel is now a
preview panel: the face-down back and the flipped face as two mini cards
(tilted −6° / +4°, a Taurus glow behind them), *Hakeem, 32 · Taurus*, the
veil line (*Face down to strangers. It flips the night you both align.*),
and two caps actions, `EDIT CARD ›` (→ G-27) and `BLOCKED SIGNS · 2 ›`
(→ P-01). The whole panel opens G-05a.

Order on the hub, founder note: the pearl `Align+ · Founding member ✦` sits
**below** the Your card preview (carousel 308–416 · YOUR CARD 428 / preview
446–566 · CTA 578–632 · APP 644 / panel 662–782).

### S-14 Sky · today and S-15 Cosmic Calendar rebuilt (2026-09-22, founder note)

"Out of place, don't use our updated design." Both were first-batch
Guidance screens: S-14 was a wheel of dots plus headline, S-15 a spine, a
grid and a blob-turned-sphere. Now:

- **S-14** is a *sky card* cloned from the S-21 guide card: eyebrow
  `TAURUS · TODAY'S SKY`, Venus sphere + ring hero under a gold glow, intro
  (*Say the quiet thing.* / Venus trines your sun until Thursday.), tabs
  `TODAY · TONIGHT · WEEK · MOON`, the section (`TODAY · VENUS TRINE SUN`
  4/5, headline, paragraph, `TRY` Text the one you left on read.), pager,
  footer `MOON · PISCES ◇ VENUS → LEO` / `ALIGN · SKY № 265/365`; above
  it `LIBRA SEASON · DAY 7` / `SEPT 22`; below, `Read tonight's deck ✦` →
  the deck. The old wheel/headline/insight content is hidden.
- **S-15** is on the hub pattern: title *Cosmic calendar*, `SEPTEMBER 2026 ·
  HOUSTON` / `MOON IN PISCES · WAXING`, `THE MONTH` with the existing grid
  in a grouped panel, `THIS MONTH` carousel (Mercury direct 23rd · New
  moon 21st · Venus → Leo tonight · Libra season day 7, each with its
  visual), `TONIGHT` panel (two rows → S-14), `Open the day in full ✦` →
  S-14. The spine, blob and old copy are hidden.

### The rest of the first batch (2026-09-22, founder note)

"What other early screens didn't get the full updates? Do those as well."
Reviewed Guidance, Club, Matches & Safety and the celebrations against the
current language (guide card for oracle screens, hub pattern for hubs).
Club, Matches and the celebrations held (all Wave 5 rebuilds). Three
groups still predated it:

- **G-23 / G-24 / G-25 / G-26** (Your sign): hero-outside, tab strip,
  text card below. Now one *chart card* cloned from the S-21 guide card,
  tabs `SIGN · TRAITS · ELEMENT · RULER`, one section per state (Sign =
  Taurus figure, Traits = figure, Element = Taurus aura, Ruler = Venus
  sphere + ring), each with meter, headline, paragraph and `TRY`; footer
  `SUN · TAURUS 13° ◇ RULED BY VENUS` / `ALIGN · CHART № 001/∞`; header
  `‹ YOUR CHART` / `TAURUS · 13°`; tabs navigate between the four frames.
  Old content, glows and wells hidden. CTAs to 668.
- **S-20 Glossary** (the cheat sheet): old avatar list, button over the last
  row. Now the hub pattern: `‹ The language` / `CHEAT SHEET · 4 OF 12
  UNLOCKED`, segmented `SIGNS · ELEMENTS · HOUSES · PLANETS`, `YOUR
  PLACEMENTS` panel (Rising · Libra, Sun · Taurus, Moon · Sagittarius,
  Venus · Taurus, each with its aura tile, → S-16), `LOCKED · ALIGN+`
  panel (Saturn return, Seventh house, ✦ → paywall), CTA at 668.
- **S-16 Term Explainer**: now a *term card* — hairline house wheel with
  house VII lit, `The seventh house.` / The person opposite you., tabs
  `MEANING · YOUR CHART · JUNIPER'S`, the reading, `TRY` It is lit in your
  chart — see where., footer `HOUSE VII ◇ RULED BY VENUS`.

### Club updated (2026-09-22, founder note)

- **S-17 Club · Taurus room** on the hub pattern: `CLUB · TAURUS ONLY` /
  `HOUSTON`, Taurus spotlight + feathered `Figure · Taurus` hero, *The
  Taurus room* on a dark well, stat line `1,204 IN THE ROOM · 41 SAID
  SOMETHING TONIGHT`, `TONIGHT'S PROMPT` card (lit dot · *Mercury goes
  direct tomorrow. Who has an opinion?* · Say the first thing ›), `THE
  ROOM` grouped panel of three posts (moon-sign aura avatar, italic name,
  caps meta, two-line body, ♡ / ✦ counts, → S-17b), pearl `Say it to the
  room ✦` → S-18. The old content frame and glow are hidden.
- **S-17b Post Detail**: the post is a panel card with a Scorpio rim; the
  three replies sit in one grouped panel with dividers under a caps `3
  REPLIES` header; the thread rail is hidden; the reply input at 690.
- S-17c/S-17d/S-18/S-18b/S-18c were Wave 4–5 utility builds and hold.

## Card theme · more ideas board (not applied)

Board `1839:2262` "✦ Card theme · more ideas" (3700×1100) below the
"everywhere" board, eight 390×874 mocks: the cast (onboarding), the week
(sky), the set (chart), the binder deeper (You), the foil (status), the cut
(block a sign), the deal (notifications), the share (growth). Fix after
render: screen 6's lifted Scorpio cards were over the headline; moved down
52 (scaled 0.9), stack +30, count and caption +34. Render saved to
`design/assets/card-more-ideas.png`; §5 of `design/card-research.md` has
the eight ideas and a written long list of ~45 more grouped by area.
S-05 untouched; nothing applied app-wide pending Hakeem's pick of card
style (A/B/C) and ideas.

## Card theme · screen by screen board (not applied)

Board `1849:2264` "✦ Card theme · screen by screen" (5560×2360) below the
more-ideas board. Twelve today → card-idea pairs, each the existing screen
cloned next to a new 390×874 mock: S-07 the meet, S-08 the turn, G-09 the
binder page, G-12 back to the deck, S-13 the discard pile, G-19 the empty
slot, G-18 the tapped card, S-12 the open sleeve, P-02 top of the stack,
G-08 sleeved or torn, G-03 three asks, L-01 the rules card. Fix after
first render: pair 4 stack shrunk to 124 wide and everything raised.
Render `design/assets/card-screen-by-screen.png`; full audit of all 123
screens in `design/card-research.md` §6. S-05 untouched.

## Card theme · beyond the screens board (not applied)

Board `1854:2279` "✦ Card theme · beyond the screens" (4580×1120) below
the screen-by-screen board: play a card, the mulligan, rarity, the joint
card, your year in cards, the widget, the physical card, the season, the
trade, the reversed card. Fix after render: eyebrows on ideas 2 and 4
shortened to clear the close button. Render
`design/assets/card-beyond-the-screens.png`; §7 of
`design/card-research.md` holds the ten plus ~25 written. S-05 untouched.

## Card ideas reorganised into their own Figma page

New page `1862:2279` "Align — card theme ideas (proposals · not applied)"
after the v2 page. Sections: `1862:2280` 00 Start here (cover with how to
read, the three decisions, index, legend) · `1862:2333` 01 Card style
(explorations board moved intact) · `1862:2334` 02 Onboarding & auth (2) ·
`1862:2340` 03 Matches & the stack (6) · `1862:2350` 04 Chat & alignment
(3) · `1862:2357` 05 Sky & guidance (5) · `1862:2366` 06 You & the binder
(4) · `1862:2374` 07 Align+, limits & status (7) · `1862:2385` 08 System
states, safety & legal (4) · `1862:2393` 09 Growth & outside the app (5).
Each idea is a wrapper frame "idea NN.i · name" holding its label (renamed
to the NN.i code), the mock, the note, and for pairs the TODAY / CARD IDEA
tags and the cloned current screen. The five per-session boards
(`1836:2258`, `1838:2258`, `1839:2262`, `1849:2264`, `1854:2279`) were
emptied and removed from the Stardust section. All 36 mocks moved, none
recreated. S-05 untouched.

## Card ideas · the game batch

Ten more built straight into the organised page (02.3 practice hand, 03.7
card conditions, 04.4 truth card, 05.6 spread of three, 06.5 binder cover,
07.8 peak tokens, 09.6 blank card, new section 10 Club `1872:1080` with
10.1 table card and 10.2 draft night, new section 11 The game `1872:1308`
with twelve rule cards). Cover index updated with 10 and 11 and refreshed
counts; sections re-spaced. CTA clones now use the uniform-font copy
`1839:3143` (the kit holo button has mixed fonts). Renders:
`design/assets/card-rulebook.png`, `card-club.png`, `card-ideas-cover.png`.
§8 of `design/card-research.md` has the ten plus ~40 written by feature.
S-05 untouched.

## Card ideas · event cards (section 12)

New section `1874:876` "12 · Event cards — 8 ideas" on the card-ideas
page: 12.1 anatomy, 12.2 event on the stack, 12.3 the sky's hand, 12.4
shared event in chat, 12.5 combo, 12.6 solar return, 12.7 dealer's cards,
12.8 events page. Landscape event card helper with hero / short / compact
variants and five family colours. Fixes after render: 12.3 rebuilt with
the short variant (first pass squashed full cards), 12.5's small event
rebuilt at 206×110. Cover: row 12, decisions text updated, height 900,
sections re-spaced. Renders `design/assets/card-event-cards.png`,
`card-ideas-cover.png`. §9 of `design/card-research.md`. S-05 untouched.

## Card ideas · event card designs (section 13)

Section `1879:876` "13 · Event card designs — nine portrait layouts" on
the card-ideas page: arcana, phase, reversed, eclipse foil, ticket,
instant, seal, fusion, full art, plus a legend card on how to tell an
event from a person. First pass was landscape; rebuilt portrait
(240×394) at Hakeem's request. Fixes: legend person line shortened,
arcana rarity dots moved off the corner star. Cover row 13 reads "9
portrait layouts". Render `design/assets/card-event-designs.png`. §10 of
`design/card-research.md`. S-05 untouched.

## Card ideas · rulebook visual versions

Section `1872:1308` grown to 1700×1980: the original twelve rule cards
untouched; a second block "Visual versions" below with twelve portrait
cards (`rule N · visual`), each with an `art · concept (placeholder for
illustration)` frame of line-art built from rects, lines, arcs and
vectors in the rule's colour. Fixes: mulligan badge/label and season
count moved off overlaps. Render `design/assets/card-rulebook-visual.png`.
§11 of `design/card-research.md`. S-05 untouched.
