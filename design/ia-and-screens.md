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
| `S-14 — Daily Horoscope` | Orb hero, gradient insight panels, alignment meter, chrome CTA, starfield |
| `S-11 — Align+ Paywall` | Two-light aurora, centred trial timeline with ✦ separators, lighter-selected plan card with straddling badge |
| `G-09 — Matches` | Wrapped grid, six signs, each carrying its own foil edge and aura |
| `G-05 — You` | Own foil card with grain, twelve-aura Align+ pill, settings rows |

## Known gaps

- Chat, Club, onboarding and the system states still carry the old language.
- Grain is real on the You card only; elsewhere it remains a spec note.
- `Peek` still appears in layer names on the source pages, against the brand rule.
- Deck size is quoted as 18, 15 and 15 across three screens on the source pages.
