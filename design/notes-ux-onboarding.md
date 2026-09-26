# Onboarding — UX pass

Fourteen screens, Figma page `Align — Stardust (2026)`, section `932:856`.
Benchmark: Stardust's 33-screen onboarding (20 screens studied from the cache).

The visual language was already on these screens. This pass is about what each
screen asks, what it gives back, and whether you can tell where you are.

---

## 1. The beat map, before

Ten screens are the main flow. Four are branches.

| # | Screen | Beat | Asks | Gives back |
|---|---|---|---|---|
| 1 | O-01 Splash | brand | — | the mark |
| 2 | O-02 Arrival | explain | — | a promise |
| 3 | O-03 Birth Data | **ASK ×3** | date, time, place | one hint line |
| 4 | O-04 Birth Sky | compute | — | a constellation |
| 5 | O-05 Sign Reveal | **PAYOFF** | — | the sign |
| 6 | O-11 Flipped Card Rule | explain | — | — |
| 7 | O-12 Dealbreakers | ASK | chips | a card preview |
| 8 | O-13 Photo | ASK | upload | — |
| 9 | O-13b The Field | **PAYOFF** | — | 333 / 41 / 6 / 11 |
| 10 | O-14 Paywall | money | card | — |

**The dead stretch is 6–8: explain, ask, ask, with nothing returned.** Three
screens in a row after the biggest reward in the flow (Sign Reveal) that only
take. Stardust never runs more than two takers before it shows you a chart —
its screens 13, 14 and 15 are three consecutive payoffs, and only then does it
start asking again.

**Payoff before the paywall is present and it is good.** O-13b hands over four
real numbers before O-14 asks for money. That box is ticked; the problem is
that O-14 then *shrinks* the claim (see §6).

---

## 2. Progress was broken in five different ways

The seven chakra dots are the progress indicator. They were:

- **missing** on O-04, O-13b and O-14 — a third of the flow with no position;
- **maxed out early** — seven of seven lit on O-12 *and* O-13, so progress read
  "finished" with three screens to go;
- **wrong colour** on O-05, whose third dot was `#7fd8f5` (a throat blue) where
  Solar `#FFDE59` belongs;
- **contradicted by the eyebrows** — `STEP 1`, then `STEP 7`, then `STEP 9`,
  then `step 8 of 14`, numbering a flow that does not exist;
- **drawn from the design-system panel palette** (`#ff3b30`, `#c264ea`) rather
  than the shipping mark (`#FF1616`, `#CB6CE6`). `the-mark.md` says the mark
  wins.

### The scheme now

Root rises to Crown, one centre per screen. The product is named after things
lining up on a vertical axis; the progress indicator is now that axis.

| Centre | Screen |
|---|---|
| Root `#FF1616` | O-03 Birth Data |
| Sacral `#FF914D` | O-04 Birth Sky |
| Solar `#FFDE59` | O-05 Sign Reveal |
| Heart `#7ED957` | O-11 Flipped Card Rule |
| Throat `#2ACCFF` | O-12 Dealbreakers |
| Third eye `#5271FF` | O-13 Photo |
| Crown `#CB6CE6` | O-13b The Field |

O-14 carries all seven lit — the chart is finished, the offer is separate.
O-01 and O-02 carry none; they are before the ascent.

Because the column now says where you are, **every numeric step eyebrow is
deleted.** They were spec language, and two of them counted screens that were
cut.

---

## 3. The back path

A `Nav / Back` instance existed on the four branch screens and on none of the
ten main-flow screens. Added at x 22, y 62 (the branch screens' exact position)
to O-03, O-05, O-11, O-12, O-13 and O-14.

Not added to:
- **O-01, O-02** — nothing behind them.
- **O-04** — a two-second compute screen with no controls at all. Stardust's
  loader (`onboarding_24`) is equally bare. The chakra column is the only
  chrome it carries, and that is the point: it is the beat where you watch the
  dot move.
- **O-15** — re-entry, not a step.

---

## 4. O-03 Birth Data, judged against Stardust

Stardust's `onboarding_09` is the closest thing in the corpus: one question
(`When is your birthday?`), one reason line, **one three-column wheel picker
with a lit selection band**, and — the part worth stealing — **a constellation
above the wheel that redraws and names the sign as you spin it.** The reward
arrives during the input, not after it.

Ours asked three questions on one screen (date, time, place) as three flat
rows with no picker affordance, and answered with a static hint about the moon.

Fixed: the date becomes the one open question with a real wheel — a lit
selection band, dimmed neighbour values above and below — and the sign it lands
on is named live underneath. Time and place drop below as two quiet, closed
rows that are visibly next rather than also-now.

---

## 5. The persona was the wrong sign

The brief is Hakeem, 32, Gemini Sun, Air, Sagittarius Moon. The screens shipped
**Cancer**: `July 4, 1999` (which is also 26, not 32), `Welcome, Moonchild`,
`CANCER · THE CRAB · TRIBE OF WATER`, Altarf and Acubens (Cancer's stars), M44
the Beehive (Cancer's cluster), `MOON DRIFTING THROUGH PISCES`.

Corrected to `June 3, 1994` — Gemini, and 32 on the file's own date. Stars
become Castor, Pollux and Alhena; the cluster becomes M35; the moon goes to
Sagittarius; the tribe becomes Air.

**The city was also self-contradicting.** The happy path put Hakeem in Tulsa
while O-03d told him Tulsa has no sky yet and Houston is live. Main flow moved
to Houston; O-03d keeps Tulsa as the closed city it was written to be.

---

## 6. Copy

Killed or rewritten:

| Screen | Was | Why |
|---|---|---|
| O-04 | `Hold still — the stars are remembering you.` | instructs the user to do nothing |
| O-05 | `…never let go of a good…` | ends on an ellipsis, not a turn |
| O-12 | `STEP 7 · PICK UP TO 3 · THE UNIVERSE LOVES A BOUNDARY` | a step number, a count and a joke in one eyebrow |
| O-13 | `ALMOST DONE · YOUR PHOTO · 11:11 MAKE A WISH` | same |
| O-14 | `15 SWIPES TODAY` | the currency is cards, per `align-design-language.md` §3 |
| O-14 | `Three people are already in your orbit.` | shrinks O-13b's 41 to 3 one screen later |
| O-15 | `Progress saves after every step` **set as a button** | a control that does nothing |
| O-15 | `Resume — step 8 of 14` | 14 is the number of frames in this section |

---

## 7. What changed, screen by screen

| Screen | Change |
|---|---|
| O-01 Splash | body → `You have been reading people wrong. Start with the chart.` |
| O-02 Arrival | sub → `Nobody here has a face yet.` — sets up O-11 instead of restating the glow |
| O-03 Birth Data | date wheel built (3 columns, lit selection band, dimmed neighbours); time and place collapsed to dim upcoming rows; live Gemini constellation added under the wheel; Root dot lit; back added; CTA → `Next · birth time` |
| O-04 Birth Sky | progress row added (Sacral); Houston/1994; Castor, Pollux, M35, the Twins; Sagittarius moon; do-nothing line replaced |
| O-05 Sign Reveal | Gemini throughout; `Welcome, both of you.`; body now ends on a turn; placement chips refitted to hug `MOON · SAGITTARIUS`; Solar dot colour fixed; back added |
| O-11 Flipped Card Rule | Heart dot lit; back added. Copy left alone — it is the clearest screen in the section |
| O-12 Dealbreakers | eyebrow → `PICK UP TO THREE`; CTA → `Put these on my card` (the card is not sealed until the photo); Throat dot lit; back added |
| O-13 Photo | eyebrow → `YOUR PHOTO`; footer line now states the consequence rather than reassuring; Third-eye dot lit; back added |
| O-13b The Field | progress row added, all seven lit; step number dropped; back aligned to y 52 |
| O-14 Paywall | `15 SWIPES` → `15 CARDS`; headline → `Forty-one of them read strong with you.` so it builds on O-13b instead of shrinking it; back added |
| O-03b / O-03c / O-03d | step numbers dropped; backs aligned to y 52. O-03d keeps Tulsa as the closed city, which now reads as a branch rather than a contradiction |
| O-15 Resume | four stacked pills cut to one holo button; the statement-as-button deleted; `Start my chart over` demoted to a line; prose added; `step 8 of 14` → `five of seven` |

## 8. Verification

Screenshot after every meaningful change, plus a programmatic audit of all
fourteen frames for horizontal overflow, home-indicator collisions and spec
leakage (`step N`, `node`, screen IDs, `placeholder`, `peek`, `swipes`).

Clean. Back and progress now resolve to one rule across the flow: chevron at
x 22 y 52, chakra column at y 52.

---

## Unresolved

1. ~~**The O-05 aura is a Cancer asset.**~~ **Resolved.** The medallion was a
   198px raster with the Cancer glyph baked in, on a screen that says Gemini in
   every other respect. An earlier attempt overlaid the `Icon / Sign · Gemini`
   vector and was reverted because the 12 x 14 source did not carry its geometry
   when scaled and the baked glyph stayed visible underneath.

   Fixed three ways at once. A second fill in SIGNAL `#ffd84d` at blend mode
   **COLOR** pushes the whole orb out of Cancer's cyan and into Gemini's yellow
   while keeping the aura's luminance and form. A core bloom, 94% of the
   medallion and centred at 0.60 of its height, covers the crab — the earlier
   attempt failed because it was centred on the orb rather than on the glyph,
   which sits low. And the twins are **drawn as four rounded bars** rather than
   typed, because a zodiac character renders as Apple Color Emoji in this file.

   The screen now measures 6.74% accent and every element agrees: Gemini aura,
   twins glyph, Castor and Pollux, `SUN · GEMINI`.

2. **O-03 now promises two screens that do not exist.** Making the date the one
   live question is right, and it is what Stardust does, but the birth-time and
   birth-place steps are currently dim rows rather than frames. The section is
   the poorer for mocking one third of its own first step. Either build the two
   frames or accept that the file documents the pattern and not every state.

3. **O-14 shows three pricing cards.** Stardust shows two, and its selected
   card is *lighter* than the unselected one. Ours has three plus an
   `ONBOARDING ONLY` badge, which is a lot of arithmetic at the moment of
   payment. Left alone — pricing structure is a product decision, not a UX one.

4. **O-04 keeps a constellation drawn to Cancer's geometry.** The labels are
   Gemini's and the figure is abstract enough to carry it, but a purist would
   redraw the stick figure as the twins. Low cost if wanted.

5. **The dead stretch is narrower, not gone.** O-11 → O-12 → O-13 still runs
   explain, ask, ask. O-12 has its card preview and O-13 now states what the
   veil buys you, so neither screen is empty-handed — but Stardust would put a
   real chart between them. The structural fix is a screen, not a line.
