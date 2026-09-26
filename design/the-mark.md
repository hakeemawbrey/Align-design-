# The mark, and what it dictates

Pulled from the live SVG at comealign.com. The mark did not exist anywhere in
the Figma file; it does now, on `Align — Stardust (2026)` as
`Mark · Align — seed of life + chakra column`.

## What it is

Two layers, drawn on a 356 x 356 field.

**A seed of life** — seven circles of r 86.5, six around one, plus a containing
circle of r 177:

```
centre   (178.5, 177.5)
ring     ( 87.5, 177.5)  (265.5, 177.5)
         (132.5, 101.5)  (220.5, 101.5)
         (132.5, 255.5)  (220.5, 255.5)
outer    (178, 178) r 177
```

**A chakra column** — seven discs of r 23, all at x 178, evenly spaced 47.167
apart from y 36 to y 319:

| Centre | Hex | y |
|---|---|---|
| Crown | `#CB6CE6` | 36 |
| Third eye | `#5271FF` | 83.167 |
| Throat | `#2ACCFF` | 130.333 |
| Heart | `#7ED957` | 177.5 |
| Solar | `#FFDE59` | 224.667 |
| Sacral | `#FF914D` | 271.833 |
| Root | `#FF1616` | 319 |

## Why this settles the design language

**Alignment is the vertical axis.** Seven centres stacked on one line through the
middle of a sacred-geometry figure. The product's name is a description of its
own logo. Every device in the app should be answering that: things lining up.

**The chakras are the colour source, and this was already written down.** The
design system panel says: *"Seven chakras, lit from within. This is the mark and
the source of every accent in the product. Nothing in the interface uses a colour
that is not on this wheel or derived from it."* The twelve zodiac foils must be
**derived from** these seven, not invented alongside them.

**The vesica piscis is already ours.** Two overlapping circles — the figure at
the heart of the seed of life — is the natural symbol for two charts meeting.
A dating app whose logo already contains the geometry of two-becoming-one does
not need to borrow a metaphor.

## Colour drift to resolve

The design system panel and the live mark disagree. The mark is shipping, so the
mark wins until someone decides otherwise.

| Centre | Mark (live) | Design system panel |
|---|---|---|
| Crown | `#CB6CE6` | `#C284EA` |
| Third eye | `#5271FF` | `#4E5BF0` |
| Throat | `#2ACCFF` | `#33C6F0` |
| Heart | `#7ED957` | `#77D35C` |
| Solar | `#FFDE59` | `#FFE068` |
| Sacral | `#FF914D` | `#FF9A4D` |
| Root | `#FF1616` | `#FF3B30` |

## In use so far

- **Seed of life as backdrop** — Sky, Club, Match, and behind the Alignment
  sheet. 1px cream stroke at 0.075–0.095 opacity, scaled 520–600px, centred on
  the screen's focal object. It is structure the eye half-registers, not a
  pattern.
- **Chakra pips on the Alignment sheet** — the three rows now read as centres
  rather than generic dots: SPARK takes Solar, RUB takes Root, ALIGN takes Heart.
- **The chakra column itself** is unused so far. It is the strongest unclaimed
  device in the system: two columns side by side, lit where two people's centres
  agree, is the alignment score drawn in the brand's own geometry.

## Still open

The zodiac foils need re-deriving from the seven chakras rather than sitting
beside them as a second, unrelated palette.

## The card back

The mark's two layers are also the deck's back. Built as
`Card back · Align` on the Stardust page, 322 x 528 at radius 20 — the same
proportion as the Mystery Card.

```
ground   linear foil rake across the diagonal
         #150733 · #2a1160 · #3d1a7d · #2a1160 · #150733
border   3.5px cream at 0.5 — trading cards have heavy borders
inset    a second rule 14px in, 1.25px cream at 0.22
geometry seed of life at 236px, 1px cream at 0.30
column   seven chakras at 15px down the centre axis, each lit as an aura
         with a 14px core glow and a 34px outer glow
```

This is the one place foil is allowed, because it is an actual card face.
Everywhere else the instrument is the aura.

## The fan

Stardust's Tarot Card Picker overlaps its card backs in an arc with one card
lifted. Align has a real deck, so the peek stack behind the Mystery Card does the
same thing — except the front card is 322 of 390 points wide, which leaves no
room for a fan hidden behind it.

The backs therefore **splay out past the front card's footprint** rather than
stacking under it:

```
peek 1   268 x 470, centre (128, 430), rotated -16 degrees
peek 2   268 x 470, centre (262, 424), rotated +16 degrees
fill     the card-back foil, lifted to #231049 / #3d1a7d / #5426a8
border   3px cream at 0.62 so the edge reads against the ground
shadow   0/14 blur 30 spread -6 at 60% — the cards sit above the ground
```

**Gotcha:** rotating a Figma node moves it, because rotation is applied about the
origin rather than the centre. Setting `relativeTransform` directly and solving
for the origin keeps the centre where you put it:

```js
tx = cx - (cos*w/2 - sin*h/2)
ty = cy - (sin*w/2 + cos*h/2)
```

Two earlier attempts failed silently because the backs were geometrically correct
but sat entirely behind the front card, and because their fill was too dark to
separate from the ground.
