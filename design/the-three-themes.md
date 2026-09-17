# Zodiac, cards, auras

Align has three motifs and nothing else. Every screen should be built from
them. Anything that is not one of the three is furniture, and furniture should
be quiet.

---

## 1. Cards

**The card is the object.** Align deals a deck; the card is what the product
literally is, so any surface that holds a reading is a card, not a panel.

### The foil

A palindromic linear gradient — dark at both edges, bright at the centre. That
is what makes it read as foil rather than as a tinted box. It comes from the
deck card itself (`card · fan 1`) and is used at two depths:

```
hero    #231049 → #31156a → #3d1a7d → #31156a → #231049
        the full sheen. For a card that carries art, not paragraphs.

reading #150830 → #1e0e45 → #251156 → #1e0e45 → #150830
        the same curve, four stops darker. For a card that carries body copy.
```

**The hero foil is too bright to read on.** The first pass put paragraphs on
it and the copy lost contrast. A card that holds text uses the deeper ramp.

### The edge

```
stroke   #fff9f2 @ 0.62  w3      hero card
         #fff9f2 @ 0.38  w1.75   reading card
         #fff9f2 @ 0.26  w1.25   rows, segmented tracks, tab bar
keyline  #fff9f2 @ 0.18–0.22  w1–1.25, inset 8–14px, radius 11–12
shadow   DROP_SHADOW r24–30  #05000f @ 0.50–0.60
radius   20 hero · 18 reading · 14 row
```

The cream edge is the single most recognisable thing about an Align surface.
It belongs on the card, on the read rows, on the segmented track and on the tab
bar — so a screen reads as one object family rather than a card floating among
unrelated shapes.

### The serial

Every card is numbered: `ALIGN · № 031/∞`, SF Pro Semibold 9, `#fff9f2` at
38–50%, letterspaced 14%, at the foot of the card. It is what makes a surface
feel dealt rather than rendered.

---

## 2. Auras

**The aura is the colour instrument.** Colour enters a screen through an aura
or it does not enter at all.

```
lobe    a radial that holds the sign's core colour out to ~0.58,
        then falls to deep and to nothing
        light 0.88 · core 0.97 · core 0.93 · deep 0.50 · 0
blur    LAYER_BLUR 15–22
```

### Two auras melt

When a screen is about two charts, the two lobes are **rotated ellipses of
different sizes**, never matched circles, and both are set to `SCREEN` so the
overlap brightens into a third colour. A small warm core sits at the
intersection to give the melt a centre.

### An aura needs a well

**Screening a warm colour over violet foil destroys it.** Gold `#ffd84d`
screened over the card's `#5426a8` centre lands near `(1, 0.87, 0.76)` —
saturation 0.24, which measures as white. A Gemini lobe on a bare foil card
registered **zero** amber.

So an aura on a card sits in a **well**: a dark radial, `#0d0520` at 0.90
falling to 0, blurred ~22. On a card the aura is a window, not a sticker.
With the well, the sign colour survives.

---

## 3. Zodiac

**A sign is named by its glyph, and the glyph is drawn.**

Typing `♊` renders as Apple Color Emoji in this file, which is why every
attempt to set one as text has failed. Glyphs are built from rounded
rectangles and arc-data ellipses:

```
Gemini ♊   two uprights + two caps, 4 bars
Libra  ♎   two rules + a half-dome (arcData π→2π, innerRadius 0.70)
```

Each glyph glows in **its own sign's colour** — `DROP_SHADOW r12` at 0.75 —
so the mark and the aura agree.

The twelve sign colours live in `zodiac-colour-system.md` and are the only
source of hue in the app. A screen's light comes from whichever sign the
screen is about.

---

## How the three combine

| The screen is about | Card | Aura | Zodiac |
|---|---|---|---|
| one chart | reading card, serial | one lobe in the sign's colour, in a well | that sign's glyph on the lobe |
| two charts | hero card, serial | two lobes melting on SCREEN | both glyphs, one per lobe |
| a concept | reading card | one lobe, abstract | no glyph — a concept is not a sign |
| settings, legal | no card, no aura, no glyph | — | — |

The last row matters as much as the others. Stardust keeps 40% of its screens
under 2% accent and spends nothing on settings and legal. So do we.
