# The core deck loop — UX pass

Five screens: `S-05 The Deck`, `S-05d Peak · Photo Open`, `S-10 Deck Spent`,
`G-19 No Cards`, `G-18 Offline`. Figma page `Align — Stardust (2026)`,
section `937:1924`.

The brief was UX, not decoration. Nothing here changes the Mystery Card's
structure, its pips, its density or its data. No colour was added to the ground,
no control was added that is not the holo button.

---

## 1. The gesture was legible as four things, not as one interaction

S-05 declared four gestures through three different mechanisms at once:

| Gesture | How it was shown |
|---|---|
| Swipe left | `← RELEASE` set as 13px-wide type rotated 90°, at the screen bezel |
| Swipe right | `ALIGN →` same, opposite bezel, **at a different height** |
| Hold | a centred hint line under the card |
| Swipe up | a second centred hint line under the first |

Three problems, in order of severity.

**The rails described a horizontal motion with vertical type.** A swipe rail has
to be read by rotating your head. Stardust's Tarot Card Picker
(`other-tabs_36_oth_2sw6q`) is the nearest real-world comparison in the corpus —
a fanned deck with one card lifted — and it teaches its gesture with a single
centred `←  Swipe  →` directly under the object, horizontal, with the arrows on
the axis the finger actually travels. One line, one gesture, at the point of
action.

**The two rails were not even at the same height** — left at y 456, right at
y 388. A binary choice rendered asymmetrically reads as two unrelated labels.

**Four affordances at equal weight is not four affordances, it is noise.** Two of
these gestures are what you do with every card. Two are rationed (3 Peaks and 1
comet a night) and most users will never use them on card one.

### What was done

The rails are gone. In their place, at `gesture legend` (`1003:1928`, now at
y 700), two tiers:

```
row 1   ←  RELEASE                              ALIGN  →
        Space Mono 11 / ls 2.6 / cream 0.92
        pinned to the card's own left and right edges (x 27 and x 363)

row 2   ◉  Hold to Peak  3 left     ↑  Send a comet  1 left
        SF Pro 11–12, row opacity 0.72, centred
```

Row 1 puts the two opposed verbs on the axis the swipe travels, at the width of
the thing being swiped, so the left/right mapping is read in one saccade instead
of two head-tilts. Row 2 keeps the rationed gestures on one line, subordinate,
each as glyph + verb + remaining count. `Comet` was changed to `Send a comet` so
both rationed items read as actions rather than one verb and one noun.

The hint copy now earns its space because there is one line of it, not two, and
because the count is the reason it exists — `Hold to Peak` without `3 left` is a
tutorial; with it, it is a resource meter.

**Total affordances on screen: still four, but in two tiers rather than three
mechanisms.** Four is the product's decision. The fix available to design was to
stop presenting them as equals.

---

## 2. The fan, pulled in

The backs had drifted to 387 × 525 at ±16°, splayed from x −66 to x 585 — far
wider than the phone, at two different heights (y 241 and y 161), and the left
rail sat directly on top of fan 1. It read as two loose cards behind the front
card, not as a deck.

Now, on both S-05 and S-05d:

```
300 × 486, radius 20, the card-back foil
fan 1   centre (160, 410)   −9°
fan 2   centre (230, 406)   +9°
opacity 0.9 on the deck, 0.62 under Peak
```

Symmetric about x 195, which is where the front card's bounding box centres once
its own 1.5° tilt is accounted for. Each back shows about 18px past the front
card's widest point and rises a few pixels above its top edge — depth, not a
second and third card. Both bottoms sit above the front card's bottom edge, so
the ground under the legend is clean.

S-05d had a *different* device again: two flat unrotated rectangles with a pink
stroke stacked behind the card. Replaced with clones of the deck's fan so the
two states are the same object.

Layer names `card · peek 1/2` → `card · fan 1/2`. `Peek` is against the brand
rule and was still in the file.

---

## 3. Peak did not sell, because the reveal was the blurrier state

This was the most serious finding.

- On **S-05** (locked), the card's artwork was **sharp**, under a line reading
  `NO PHOTO UNTIL YOU BOTH ALIGN`. The card was contradicting its own label.
- On **S-05d** (the paid reveal), the same artwork carried a `LAYER_BLUR` of
  1.8 and no label at all.

So the screen you pay for showed less than the screen you get free, and the only
difference between them was a small countdown badge. Nothing was sold because
nothing visibly changed.

Stardust's gating pattern is the fix and it was already noted in
`ia-and-screens.md`: Sleep Cycle Guide (`other-tabs_20_oth_35m03`) blurs the body
copy **in place** and puts a glowing CTA over it. The heading stays sharp so you
know exactly what is being withheld.

Applied:

| | S-05 (locked) | S-05d (Peak) |
|---|---|---|
| artwork | `LAYER_BLUR` 7 — a figure behind frosted glass | sharp, no blur |
| label, same slot | `NO PHOTO UNTIL YOU BOTH ALIGN` | `PHOTO OPEN FOR THIS PEAK ONLY` |
| countdown | — | amber arc + seconds, top-right of the artwork |
| release line | — | `Let go and the photo closes` |
| cost | `Hold to Peak · 3 left` in the legend | `2 Peaks left tonight` |

The before/after pair sits in the same 290px slot at the same type size, so the
two states are legible as one toggle. The photo is now the thing that is bought,
and the blur is what you are buying your way out of.

`Let go to seal it` was replaced because it never said what ends — "seal" could
mean commit to the align or end the peek. `Let go and the photo closes` states
the consequence. `2 Peaks left tonight` continues the deck screen's `3 left`, so
the resource visibly decrements across the two screens.

A **bottom scrim** was added inside the artwork on both states — a 62px linear
gradient to `#0a0320` at 0.72 — because the photo-status line was washing out
against the bright part of the bloom. This is a caption scrim inside the art, not
a change to the card.

> Caveat worth the founder's eye: the blur on S-05 is a change to how the hero
> card looks on the hero screen. It is reversible in one property
> (`998:1964.effects = []`). The argument for keeping it is that without it the
> card asserts there is no photo while showing one, and Peak has nothing to sell.

---

## 4. Empty states now teach

All three were built to the same skeleton, which none of them had before:

```
mono eyebrow      the state, and when it resolves
serif headline    what happened
prose             why, when it lifts, and what changes it
holo button       the one thing to do
quiet sans line   what to do meanwhile
```

**S-10 Deck Spent.** Already the strongest of the three — it had the eyebrow and
the refill time. Two problems: the time `11:11` appeared three times in four
elements, and the secondary action was `Wait for 11:11`, which is an instruction
to do nothing dressed as a link.

- prose → `Fifteen cards, gone in one sitting. Fifteen more land at 11:11.
  Align+ opens the deck again tonight.`
- `Wait for 11:11` → `Talk to your matches`

**G-19 No Cards.** Had no eyebrow and never said when it resolves — it only
offered the lever.

- new eyebrow `RANGE · 25 MILES`, which names the state and the lever in one line
- prose → `Everyone within 25 miles has crossed this deck tonight. New people
  join every day — stretch the range a few miles and meet the ones sitting just
  outside it.` ("New people join every day" is the when.)
- new meanwhile line `Talk to your matches`

**G-18 Offline.** Three problems. No eyebrow. No reassurance that swipes
survived. And `Try again` was a **bare underlined text link** — not the holo
button, in a product where the holo button is the only permitted control.

- new eyebrow `NO CONNECTION`
- prose → `Something between you and the sky stopped answering. Nothing you
  swiped was lost. Reconnect and the deck picks up where it stopped.`
- `Try again` promoted from text link to the holo button at x 38, y 664
- new line `Your matches and chats are still here`

Ornaments were moved on all three. `geometry · seed` (S-10), `constellation`
(G-19) and `geometry · concentric` (G-18) were all sitting inside a text or
button bounding box, against the placement rule in `align-design-language.md`
§5. Moved to clear quadrants at y 88–98.

---

## 5. Deck count

Verified across the five screens in scope. The number is **15** everywhere:

| Screen | Copy |
|---|---|
| S-05 | `11 of 15 cards left tonight` |
| S-10 | `Fifteen cards, gone in one sitting. Fifteen more land at 11:11.` |

The header previously read `11 of 15 **swipes** left tonight`. Changed to
`cards` — the currency in this product is cards, per
`align-design-language.md` §3 ("Align's currency is **cards**").

The `18` quoted in `ia-and-screens.md` under Known gaps is on screens outside
this pass. 15 is the value to standardise on; it is now the only value in the
deck loop.

---

## 6. Spec leakage

Audited every text node on all five screens against
`/S-\d|G-\d|O-\d|node|lorem|TODO|placeholder|peek|\(\d+\)/i`. **Clean** — no
node numbers, no bracketed counts, no `Peek`.

Layer names were also audited. Two were renamed (`card · peek 1/2` → `fan`).
`Sign badge · Libra / Air / Gemini Moon → S-16 Term Explainer` was left alone —
it is a navigation annotation on a layer, not shipped copy.

---

## 7. Verification

`get_screenshot` after every meaningful change. Final programmatic audit across
all five screens found nothing under the tab bar (y 792–854 within x 32–358),
nothing outside the 390px frame, and nothing below y 874.

---

## Unresolved

1. **The gold `✦` Align+ disc in the S-05 header.** A circular, gold-filled
   control in a product whose only permitted control is the pearlescent holo
   button. It predates this pass and is shared with other screens being worked
   concurrently, so it was not touched. It is either a documented exception or a
   rule violation; it should not be ambiguous.
2. **Peak still reveals an abstract aura bloom, not a photograph.** Sharp-versus-
   blurred now carries the whole difference. It works, but the screen will only
   truly sell once there is a real portrait behind the blur.
3. **Four gestures is still four gestures.** Tiering them is the design fix. The
   product fix — if first-run testing shows it is needed — is to withhold the
   comet until the user has aligned once, so card one teaches two gestures and
   the third arrives when it means something.
4. **`RANGE · 25 MILES` invents a number.** It reads as the account's current
   radius; it needs to match whatever the range setting actually defaults to.
