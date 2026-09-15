# Align — IA and screen rebuild

Figma page **`Align — Stardust (2026)`**, section `✦ STARDUST — redesigned screens`.
The page is a full clone of `Align — Native Pass (2026)`; originals are untouched.

## Benchmarks used

| App | Revenue | Why |
|---|---|---|
| Stardust Period Tracker | $400K/mo · 4.76★ | The visual and structural benchmark. 88 screens walked, 19 viewed directly. |
| HoloDex — TCG Scan & Collect | $400K/mo · 4.82★ | How a trading card is presented on a phone. |
| Boo — Dating. Friends. Chat | $900K/mo · #82 Social | Dating conventions and personality-facet matching. |
| Co–Star | $400K/mo · 4.79★ | The only astrology app filed under Social Networking. |

## What Stardust actually does

- **Five tabs, depth never past 2 levels.** Tarot, Zodiac Library, Personality Quiz and the moon articles all live inside the Profile tab. The mystical surface is one tab, not four.
- **Exactly one focal 3D object per screen.** When a screen needs many objects they shrink to icon scale and become texture.
- **Colour is an ordinal scale for time, and nothing else.** All typography, all icons and all selection states are colourless; selection is a ~15-value fill lift plus a 1px lavender stroke.
- **~90–130 stars per screen** in two populations (0.3–1pt dust at ~6% opacity, plus a 2–3pt bright minority near 80%), hand-placed, never tiled, absent under text blocks.
- **Two tinted aurora glows** is the norm: one top-centre behind the headline, one warm bottom-centre behind the CTA. Blur radius ≈ the glow's own diameter.
- **No iOS blur anywhere.** Sheets darken the parent rather than frosting it.
- **Mono appears exactly once in the system** — a wide-tracked caps eyebrow naming a state. Data and prices use the sans, so the mono is a voice device, not a data device.
- **Centred by default**, including 40–70 word editorial paragraphs set centred at ~19pt serif. That is why a health utility reads as ceremonial.

## Applied to Align

**The card is the one dense object; everything around it clears.** The Mystery Card keeps all its data by decision, so the deck screen earns its density by stripping everything else: the sky strip moved to Sky, the header is one line, and the card is the only thing competing for attention.

**Gestures only, no buttons.** The two swipe rails were `hidden="true"` and both rendered an up arrow. They are now visible and correct: `← RELEASE` reading bottom-to-top on the left, `ALIGN →` top-to-bottom on the right, with centred hints for `Hold to Peak · 3 left` and `Swipe up to send a comet · 1 left`. Comet previously had no affordance anywhere in the file.

**Strength pips sit at the far right of each row**, like energy on a trading card, coloured from each row's own existing label — Spark `#7fd8f5`, Rub `#ff9ac4`, Align `#ffe066`.

**The Align+ pill is all twelve zodiac cores desaturated 62% toward `#fff6ec`** and swept horizontally. Stardust does exactly this with its own hue wheel. Because it is all twelve at once it reads as the brand rather than as any one sign, so it does not breach the rule barring sign colour from the primary CTA.

## Screens rebuilt

| Screen | State |
|---|---|
| `S-05 — The Deck` | Real card cloned from All Screens, Libra foil edge, aura bloom, pips, fanned peek stack, gesture rails |
| `S-14 — Daily Horoscope` | Orb hero, gradient insight panels, alignment meter, holo button, starfield |
| `S-11 — Align+ Paywall` | Two-light aurora, centred trial timeline with ✦ separators, lighter-selected plan card with straddling badge |
| `G-09 — Matches` | Wrapped grid, six signs, each carrying its own foil edge and aura |
| `G-05 — You` | Own foil card with grain, twelve-aura Align+ pill, settings rows |
| `O-05 — Sign Reveal` | Sign-hued background glow, drawn constellation with a vector glyph, mono eyebrow, centred serif and centred long-form prose, holo button |

## The reveal pattern

Stardust's Sun Sign Result is the template for Align's Sign Reveal, and it is the
one screen where the background is allowed to take a sign's hue, because the
reveal *is* the sign. Structure, top to bottom:

`sign-hued radial glow` → `luminous constellation with the glyph at its centre`
→ `wide-tracked mono caps eyebrow` → `centred serif title` → `centred long-form
prose, 4 to 5 lines` → `full-width glow CTA` → `quiet skip link`

Glyphs must be drawn as vectors. Typing `♎` into a text node falls back to Apple
Color Emoji and renders as a purple rounded square.

**Copy voice.** Stardust's Scorpio reads: "You feel everything, show almost
nothing, and still clock everyone in the room like it's billable hours. Intense,
private, unshakably loyal. Trust is a one-time gift, lose it, and you don't just
close the door, you lock it." Second person, present tense, specific, faintly
savage, ends on a turn. Align's Libra is written to match.

**Locked content.** Stardust gates by blurring the body text in place and putting
a glowing CTA over it, rather than hiding the section. Worth adopting for Peak
and Align+ gating.

## Known gaps

- Chat, Club, onboarding and the system states still carry the old language.
- Grain is real on the You card only; elsewhere it remains a spec note.
- `Peek` still appears in layer names on the source pages, against the brand rule.
- Deck size is quoted as 18, 15 and 15 across three screens on the source pages.

## The holo button

Align's primary action. It is called the **holo button** and it is never tinted,
never sign-coloured, and never rainbow. Because it is the same pale iridescent
surface on every screen, it is the only thing that reads unambiguously as *the*
action.

```
314 × 54 · radius 999 · no stroke
fill: linear, transform [[0.946, 0.054, 0], [-2.191, 0.940, 1.126]]
  0 → #f6edff   0.45 → #fff7ec   0.8 → #eaf4ff   1 → #ffeff7
halo: drop shadow #f6edff at 35%, radius 30, offset 0
lift: drop shadow #05000F at 45%, radius 26, spread -8, y +10
label: EB Garamond Medium Italic 19 in #3a2c4e, with an optional ✦ at 13
```

Two mistakes made and corrected during this pass, both worth not repeating:

1. **An Align+ pill built from all twelve zodiac cores swept horizontally.** It
   borrowed Stardust's device of desaturating its own hue wheel onto the upsell
   button. On Align it was simply too colourful, and it put colour on the one
   element that must stay neutral.
2. **A sign-tinted halo on the Sign Reveal CTA.** The glow under the button was
   Libra orchid rather than `#f6edff`. Even on the one screen where the
   background carries a sign, the holo button does not.

## Screens built in the parallel pass

Sixteen screens built by four agents working in separate rows of the section, then
reviewed and corrected centrally.

| Row | Screens |
|---|---|
| y=2060 | `S-07 Match` · `S-08 Veil Lifts` · `S-09 Chat` · `S-09b Chat · Alignment` |
| y=3020 | `O-01 Splash` · `O-02 Arrival` · `O-03 Birth Data` · `O-13 Photo Upload` |
| y=3980 | `S-17 Club` · `S-17b Post Detail` · `S-15 Cosmic Calendar` · `S-20 Glossary` |
| y=4940 | `S-05d Peak` · `S-10 Deck Spent` · `G-19 No Cards` · `G-18 Offline` |

## Club is your own sign only

There is no browsing other signs. Club is the room for your sign, so it is the one
place besides the Sign Reveal where a sign may own the whole screen. Members are
all the same sun sign, which would make the room monochrome, so **colour variety
comes from their moon signs**: the avatar aura and the moon label carry each
member's moon hue while the room itself stays Gemini.

This also raises the screen's light count from two to four tinted sources, which
is what Stardust does on its richer screens.

## Outline weight

Trading cards have thick borders and Align's did not. Stroke weights now scale by
element size:

| Element | Weight |
|---|---|
| Hero cards (≥250 × ≥300) | 3.5 |
| Grid cards and tiles (≥130 × ≥130) | 2.5 |
| Chips and pills (≤44 tall, radius 999) | 1.5 |
| Everything else with a stroke | 1.75 |

Stroke opacities below 0.35 were lifted to 0.5 so the outline actually reads.

**Gotcha:** setting `strokeWeight` overrides per-side weights. A single-sided
divider silently becomes a full box. The DEALBREAKERS rule on the card was hit by
this and restored with `strokeTopWeight` only.

## The mono rule, enforced

A mono eyebrow names **a state**. It is never a sentence and never a count.
Corrections made: the O-13 sentence eyebrow was deleted (the body copy already
said it), and two counts moved to the sans. Legitimate survivors are chips
(`AIR`, `GEMINI MOON`), states (`STRONG PULL`, `EXPIRES IN 6 DAYS`,
`PEAK · 6 SECONDS LEFT`, `MUTUAL ALIGN`) and the card serial.

## Stars never sit under copy

Stardust's field is placed, not tiled, and is near-absent under text blocks. 490
stars whose centres fell inside a text bounding box were cleared across the
section.

**Gotcha:** a selector matching `/starfield|atmosphere/` hit a wrapper frame whose
children were the auroras, deleting light sources instead of stars on two screens.
Target the inner star frame, never the wrapper.

## The dial and the strip are one object, not two

Verified against four Stardust screens (`oth_jka4o` Home Dashboard, `oth_vthko`
Daily Guidance, `oth_kac57` Daily Body Insights, `oth_hata8` Daily Forecast
Detail).

The Home Dashboard shows the full phase dial — a ~330pt ring carrying the entire
hue wheel — and nothing else on the screen is saturated. Scroll one notch and the
ring is **gone**. In its place a ~40pt horizontal strip is pinned to the top,
carrying the same markers flattened. Every other screen in that tab shows the
strip and none of them shows the ring.

So it is a single component at two scroll positions. Showing both at once, as the
first pass of `S-14` did, is redundant — and the explanatory caption under it
("The whole wheel turns. You are here.") is the kind of label Stardust never
writes. Both removed.

**Applied to Align:**

- `S-14 — Sky · today` keeps the twelve-sign wheel as the sole dial state.
- The flattened strip becomes the pinned header on the *other* screens in that
  tab, where there is no wheel to duplicate.
- The strip is thin, full-bleed and unlabelled. It is not a feature; it is a
  position indicator.

## The colour budget is per screen, not per element

On a strip screen the strip **is** the colour, plus at most one further event —
illustrated cards each owning a single hue family, or the desaturated
spectrum-sweep CTA. Everything else is cream serif on flat `#12052D`. No coloured
type, no coloured icons, no coloured tab bar, no coloured selection states.

### Audit of our own section

Counting distinct saturated hues per screen (saturation > 0.45, value > 0.45):

| Distinct hues | Screens |
|---|---|
| 2 | You, Sign Reveal, Splash, Arrival, Glossary, Birth Data, No Cards |
| 3 | Post Detail, Cosmic Calendar, Veil Lifts, Chat, Photo Upload, Deck Spent, Offline |
| 4–5 | Match, Paywall, Alignment |
| 6–7 | Club, Matches |
| 8–9 | Deck, Peak, Sky |

On **12 of 22 screens the only two hues present are 30° and 270°** — amber and
violet, which are the two aurora glows and nothing else. The screens are not
merely under-coloured; they are all coloured *identically*. That, not the number
of glows, is why the section reads monochrome.

Coloured text was also found on 13 screens (Matches 7 runs, Deck 8, Club 5),
which the Stardust evidence says should not exist outside chips.

## The colour law, measured

Derived from all 85 Stardust stills, measured as **accent area** — the share of
pixels with saturation > 0.50 and value > 0.50, which excludes the baseline
violets (`#2A1D4E` is S 0.62 but only V 0.31, so ground never counts as ink).

### Stardust's distribution is bimodal

20 of 50 product screens sit under 2%. Eleven sit above 12%. Almost nothing lies
in between, and **every screen above 12% spends it on exactly one element.**

| Screen | Accent | Shape |
|---|---|---|
| Moon Sign Result | 28.0% | 17.0% + 10.5% in two adjacent buckets — one blue glow |
| Sun Sign Result | 19.5% | 18.8% in one bucket — one gold glow |
| Zodiac Library | 18.9% | 18.4% in one bucket — one violet glow |
| Daily Guidance | 1.9% | five buckets, 0.2–0.7% each |
| Home Dashboard | 1.2% | five buckets, 0.1–0.3% each |

**Object count does not predict colour area.** The 16-icon symptom grid measures
2.50%; one glow measures 28.03%.

### The rule that follows

A screen earns the 15–28% hero glow **only when its top half is artwork.** Birth
Chart, Zodiac Library and Sign Reveal have a large monochrome subject for the
glow to sit behind. Content and list screens carry text up there, and a hero glow
simply erases it — confirmed by building it wrong first: Chat at 18.9% lost its
`EXPIRES IN 6 DAYS` header, Glossary at 14.4% lost its eyebrow.

Content screens instead take **many distinct hues in small objects**. This is the
counter-intuitive half: Glossary at **1.42% across five hue buckets reads far more
colourful** than the same screen did at 14.4% in one violet wash. Stardust's Home
Dashboard is the proof — 1.2%, and nobody calls it drab.

So the failure was never "not enough colour". It was **two hues repeated on every
screen**. The fix is variety of hue, not quantity of ink.

### Hero glow recipe

```
radial gradient, stops  0: a .95 · 0.45: a .84 · 0.72: a .42 · 1: a 0
colour = mix(sign.core, sign.deep, 0.20)      // NOT toward deep — a dark tint
                                              // never clears V > 0.50
ellipse ~520x520, centred x, centre y ~190    // top ~55%, prose stays on dark
LAYER_BLUR 100
```
A 0.45-deep mix at alpha 0.70 composites to V 0.46 over `#12052D` and measures
**0.54%** — invisible to the metric and nearly invisible to the eye. The same
glow at a 0.20 mix and alpha 0.95 measures **21.09%**.

### Which hue a screen takes

| Screen kind | Hue source | Precedent |
|---|---|---|
| Sign Reveal | the revealed sign | Sun gold `#9F8C38` vs Moon blue `#4B5CBD`, consecutive screens, same cycle phase |
| You, Club | your own sign | — |
| Match, Veil Lifts | the pair, two blooms meeting | — |
| Chat | the person you matched with | — |
| Calendar, Glossary, Post | held constant, decorative | Zodiac Library holds violet `#442590` across three different signs |
| Deck | none — the card carries it | the founder decision that the card is the one dense object |
| Sky | the wheel is the colour | Home Dashboard, 1.2% |

### Corrections to earlier rules in this document

- **"Neighbours never repeat a hue" — deleted.** Invented, and false. On the Mood
  picker, Mood swings (319°) and Headache (332°) are layout neighbours in one hue
  family; the symptom grid runs green x3 and blue x3 among 16 icons.
- **Ordered hue sweeps are reserved for time.** The wheel is legitimate because it
  encodes Libra season, day 7 of 30. Nothing else may sweep.
- **Selection is not a ~15-value lift.** There are three tiers: stroke-only
  (calendar date), +15 fill lift with a 1px lavender stroke (chips, tags), and
  **+65–80 onto cream `#E6EED6`** (segmented controls, icon discs) — whose
  container is itself a saturated violet `#31167A`, well above the ground.
- **Colour does mark status and destruction.** The `PERIOD` chip is `#F11D05` at
  S 0.98; Delete Your Account is a fully saturated sweep. It still never touches
  typography, tab bars, charts or page dots — the tab bar is a 0.44 value lift
  with zero hue on every screen measured.
- **The CTA does not desaturate because the page is colourful.** Sweep-CTA screens
  average 10.5% accent versus 2.5% for flat-CTA screens — the correlation runs the
  other way. It desaturates for *commercial register*: the paywall is the lowest
  of all 37 onboarding screens at −45%. Our holo button therefore stays as it is
  everywhere except the paywall.
