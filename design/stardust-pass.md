# Align — the Stardust pass

A redesign pass on Align's visual language, benchmarked against Stardust Period
Tracker ($400K/mo, 4.76 stars, 88 screens) and translated for a zodiac dating app.

Figma page: **Align — Stardust (2026)**
Section: **✦ STARDUST — redesigned screens (new language)**
Variable collection: **Align · Stardust** (22 colours, 13 scale tokens, Dark mode)

The page is a full duplicate of **Align — Native Pass (2026)**. Every original
screen is cloned and untouched. Redesigned screens live in their own section.

## What was actually wrong

The Native Pass reads like a high fidelity spec document, not a shipping app.
Four causes, in order of impact:

1. **Near black canvas.** Flat black kills glow and reads cheap. Stardust never
   goes below `#12052D`.
2. **Cold white labels.** Clinical against a dark ground.
3. **Space Mono everywhere.** 892 Space Mono Regular nodes and 113 Bold across
   the file, used for `SPARK`, `RUB`, `ALIGN`, `DEALBREAKERS`, side rails. Mono
   at 8pt in all caps reads as annotation, not interface.
4. **No light source and no material.** Cards were hairline outlines on flat
   ground. Nothing had weight.

## The system

### Surfaces — indigo, never black

| Token | Hex |
|---|---|
| `surface/void` | `#0B0620` |
| `surface/canvas` | `#140A2E` |
| `surface/raised` | `#1E1240` |
| `surface/raised-alt` | `#281A4E` |
| `surface/glass` | `#34235F` |

### Labels — warm bone, never cold white

| Token | Hex |
|---|---|
| `label/primary` | `#EFE6D6` |
| `label/secondary` | `#B3A6C4` |
| `label/tertiary` | `#7D6F94` |
| `label/quaternary` | `#574B6D` |

### Reading semantics and elements

`read/spark` `#7FD8B0` · `read/rub` `#E8628A` · `read/align` `#F2C75C`
`accent/gold` `#F2C75C` · `accent/gold-deep` `#C98F2E` · `accent/ember` `#E8628A` · `accent/violet` `#9A7BE0`
`element/fire` `#F08A5D` · `element/earth` `#8FBF7F` · `element/air` `#8FC7E8` · `element/water` `#B48FE8`

### The holo button — kept from Align unchanged

Align already had this and it is better than anything gold. Lifted verbatim from
`CTA · Verify another way`.

- 314 × 54, radius 999, no stroke
- Fill: linear, transform `[[0.946, 0.054, 0], [-2.191, 0.940, 1.126]]`
  - `0 → #f6edff` · `0.45 → #fff7ec` · `0.8 → #eaf4ff` · `1 → #ffeff7`
- Halo: drop shadow `#f6edff` at 35%, radius 30, offset 0
- Lift: drop shadow `#05000F` at 45%, radius 26, spread -8, y +10
- Label: EB Garamond Medium Italic 19 in `#3a2c4e`

One holo button per screen. **Gold stays an accent, never the button.**

### Foil — the sign colour rolled through white

From the Founders Badge concept, unchanged. Seven stops so it reads as struck
metal rather than a gradient. Stop positions `0, .16, .34, .52, .7, .86, 1`.

| Foil | Ramp |
|---|---|
| Gold | `#4e3708 · #ffebb8 · #e8b54d · #fff9f2 · #e8b54d · #ffebb8 · #4e3708` |
| Libra | `#4a0f3c · #f8c4ee · #e85ac8 · #fff9f2 · #e85ac8 · #f8c4ee · #4a0f3c` |
| Aries | `#5e1b0c · #ffb08a · #ff5a3d · #fff9f2 · #ff5a3d · #ffb08a · #5e1b0c` |
| Aquarius | `#0a3e52 · #beefff · #3dc8f0 · #fff9f2 · #3dc8f0 · #beefff · #0a3e52` |

Used on the paywall medallion so it catches light like a coin.

### Type — two voices

- **EB Garamond Italic** — headlines, names, card copy, CTA labels
- **SF Pro** — every label, chip, meta line and body row
- **Space Mono** — serial numbers only (`ALIGN No. 031`)

### Light

One pooled light source per screen. Layer blur 130 to 150 at 9 to 26 percent
opacity. Glow must pool, never flood: the indigo base stays dominant.

## Screens rebuilt

| Screen | What changed |
|---|---|
| `S-05 — The Deck` | Mystery Card gets a gold foil edge, real elevation and two staggered peek cards behind it, so the feed finally reads as a deck per the TCG spec. Spark/Rub/Align become colour dots with serif sentences. |
| `S-14 — Daily Horoscope` | Glowing moon orb hero with a dotted orbit ring. Gradient insight panels. Alignment meter. Holo button. |
| `S-11 — Align+ Paywall` | Starfield, foil struck medallion, benefit rows, dual pricing cards with the Houston Founding Member at $10, holo button. |

## Verified against Stardust's real screens

After the environment's network policy was opened to `mcp.appllama.io`, the
screens were reviewed directly rather than inferred from metadata. Three
corrections followed:

1. **Stardust is dense, not restrained.** Its canvas carries ~90 small stars per
   screen. The first pass was too sparse.
2. **Colour is a full spectrum, applied systematically.** The home screen hero is
   a ring of glossy 3D moon phase orbs running purple, blue, teal, green, yellow,
   orange, red, pink. Not a single accent hue.
3. **The paywall is a trial timeline, not a benefit list.** Today, This week, In
   7 days, stacked centre, separated by ✦, over a painterly aurora with two light
   sources (warm sun left, cool moon right). The selected plan card is *lighter*
   than the unselected one and carries an overlapping free trial badge.

Stardust's own primary paywall CTA is a pale iridescent pill with dark text,
which confirms Align's existing holo button was already the right answer.

## The gap is narrower than it looks

Align already holds four of the five things that make Stardust read as premium:

| Stardust | Align already has |
|---|---|
| Pale iridescent paywall CTA | `CTA · Verify another way`, same family |
| Rainbow moon phase dial | 12 sign foil ramps, same spectrum system |
| Warm display serif | EB Garamond Italic |
| Tarot cards as hero objects | Mystery Card, TCG framing |
| Rendered 3D orbs | Aura images per sign |

What is missing is cheap:

1. **Density.** Fill the canvas with stars. Near zero cost.
2. **Deploy the foil system into the product.** The 12 sign foils exist but live
   only on the Founders Badge concept page. Stardust's entire identity is that
   spectrum, on the home screen, every day. The assets are already built.
3. **Voice.** Stardust's daily copy is chatty and specific. Align's is terse spec
   language set in mono. Align's material (Spark, Rub, Align) is stronger, it is
   just written like a table rather than like a person.

## Not done

The other ~100 cloned screens still carry the old language. The system and the
three hero screens define the pattern; rolling it across Onboarding, Chat,
Matches, Club and the system states is the next pass.

Grain was specced but not built: Figma noise fills were not applied. Add a fine
noise layer at 3 to 5 percent over `surface/canvas` at implementation.
