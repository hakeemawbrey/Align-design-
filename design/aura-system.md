# The aura system

Source: two reference boards supplied by the founder — the twelve **mystery
auras** (a person as a glowing silhouette, glyph on the chest) and the twelve
**figures** (each sign's creature, edge-lit in its own hue inside a shaft of
light). Colours below were measured from those pixels, not chosen.

This supersedes the single-hue table in `zodiac-colour-system.md` and the
aura recipe in `the-three-themes.md` §2.

---

## 1. Every sign is three bands, two hues

Measured per tile: **core** = pixels above V 0.80 (the luminous edge), **rim** =
V 0.55–0.80 (the body of the glow), **bloom** = V 0.22–0.55 (the fall-off).
The second hue is not a separate token — it is the shift from core to bloom.

| sign | core | rim | bloom | the shift |
|---|---|---|---|---|
| Aries | `#F5A070` | `#C9352B` | `#7A1D18` | apricot → red |
| **Taurus** | `#D6DC7C` | `#8FC24B` | `#3F7A2A` | yellow → green |
| Gemini | `#F0CC8C` | `#C48F46` | `#7A542B` | cream → gold |
| Cancer | `#6AAEE6` | `#2868C4` | `#12317A` | sky → blue |
| Leo | `#F8AC55` | `#C4491F` | `#7A2E14` | gold → orange |
| Virgo | `#F58F9C` | `#C0395F` | `#78233F` | pink → rose |
| **Libra** | `#D695DE` | `#8B4CB8` | `#4A2C78` | pink → violet |
| Scorpio | `#EA4680` | `#BC2758` | `#78163C` | pink → crimson |
| Sagittarius | `#D479DA` | `#903ABF` | `#47197A` | pink → purple |
| Capricorn | `#86D4B6` | `#44BEA2` | `#1E7866` | mint → teal |
| Aquarius | `#70C6E4` | `#1E7BBF` | `#0E4178` | cyan → blue |
| Pisces | `#B681E2` | `#653DBF` | `#2C1E7A` | lilac → indigo |

Ground under every aura is near-black `#07030F`, not the app's violet. The
aura supplies all the colour; the ground supplies none.

---

## 2. The mystery aura — the veil

This is the answer to "no photo until you both align". A person, before they are
revealed, **is** their aura.

```
silhouette   head and shoulders, centred, ~62% of frame width at the shoulders
edge light   the brightest thing is the EDGE of the silhouette — core colour,
             8–14px wide, soft
interior     near-dark: bloom at 0.35 over the ground, so the body reads as a
             dark shape inside its own light
glow         outward from the edge: rim (blur ~28) then bloom (blur ~70),
             the bloom reaching ~1.6× the silhouette's width
glyph        the sign's glyph on the chest, core colour, with a core-coloured
             glow r12 — the one drawn element
grain        film grain over the whole frame, ~18% — it is what makes the light
             read as a photograph rather than a gradient
```

What it is **not**: a blurred ellipse. The old auras were washes with no edge.
An aura photo has a *subject*, and the light is brightest where the subject
ends. That edge is the whole difference.

### Where it goes

- the veiled state of **every card in the deck** — the silhouette where the
  photo would be, glyph on the chest, the card foil unchanged around it
- the **Matches** list — each match a small mystery aura in their hue
- the **Club** — members as mystery auras, hue by moon sign
- the **chat header** avatar
- `O-13 Photo Upload` — where the veil is explained, shown large

---

## 3. The figure — the oracle hero

```
composition  a vertical SHAFT of light: widest at the base, narrowing upward,
             the creature centred inside it. the shaft is rim → bloom → black.
creature     drawn, but MONOCHROME IN THE SIGN'S HUE — no cream body. it is
             edge-lit: core on the contours facing the light, rim on the
             planes, bloom in the recesses. the interior stays dark.
glow         the creature's silhouette carries an outer glow in core, r40–60
grain        same film grain, whole frame
below        NAME in letterspaced caps in the core colour · dates in mono,
             muted · the glyph small, in core
```

The Taurus vectors built for the Stardust-style figure keep their geometry;
only the dressing changes — fills go from cream to a dark body with core-lit
contours, and the gold rims on the horns become the core colour of the sign.

---

## 4. Applying it to the app's existing auras

Every aura ellipse currently in the file is a single-hue wash. Each becomes:

```
old   one ellipse · sign.core · opacity 0.22–0.32 · LAYER_BLUR 120–150
new   three ellipses, stacked, same centre:
        bloom   1.60× · bloom colour · 0.55 · blur 70
        rim     1.10× · rim colour   · 0.70 · blur 28
        core    0.85× · core colour  · 0.85 · blur 10, then a dark interior
                disc at 0.72× in ground colour at 0.6 to hollow it
      + grain overlay on the screen
```

The two-tone shift is automatic — core and bloom are different hues by
construction. Two auras meeting (S-07, S-21) are two of these with their blooms
overlapping on SCREEN; the overlap brightens into a third hue because the blooms
are different colours, which is what the old two-lobe melt was trying to fake.

---

## 5. Grain

Figma's noise fill is not exposed through the plugin API in this file. Grain is
an image fill instead: a 120px tileable gaussian-noise PNG set as a `TILE`
image fill on a full-frame rectangle, `OVERLAY` blend at 18%. One tile, reused
by every screen. Generated at `scratchpad/aura/grain120.png`.

---

## 6. The art is the founder's boards, not vectors

A vector rebuild of the mystery aura was tried and rejected — an edge-lit
silhouette drawn from paths reads as a flat icon next to the real thing. The
boards themselves are the asset.

Pipeline (`scratchpad/cut/`): each board is cut into its 12 tiles; the
auras' baked-in labels are removed by mirroring the symmetric right-hand band
over the label box with a feathered mask; the figures are cropped above their
caption block; everything is upscaled 3× (Lanczos + light unsharp — a real
super-resolution pass would be better and is worth doing before ship). The
24 PNGs are uploaded through the Figma MCP `upload_assets` as fills on named
rectangles:

```
Kit · Aura photos   1426:855   Aura photo · <Sign>   1122 × 1026 source
Kit · Figures       1426:868   Figure · <Sign>       1038 × 870 source
```

Use them as image fills (`FILL`) on the aura panel of a card, the avatar disc,
the hero of an oracle screen. The vector Taurus in `Kit · The twelve figures`
stays as a record of the attempt only.

Contact sheets: `design/assets/aura-photos-contact.png`,
`design/assets/figures-contact.png`.

## 7. Placing a tile on a screen — the recipe that works

Tried on `G-23`, in this order, and only the last one holds:

1. **Bare image fill** — the tile's black ground shows as a hard rectangle on
   the violet screen.
2. **Vignette overlay** — no good: the black is the whole tile, not the rim.
3. **Screen blend** — black disappears, but the tile carries a faint grain haze
   across its full area, which brightens the rectangle uniformly.
4. **Screen blend + feathered mask + well** — holds.

```
hero frame        clipsContent OFF
  mask · feather  ellipse ~88% of the frame, LAYER_BLUR 26, isMask
  Figure · <sign> image fill FILL, blendMode SCREEN
well · hero       ellipse 1.6× the hero, at SCREEN level behind the content,
                  #07030F radial 0.92 → 0.6 → 0, LAYER_BLUR 40
hero glow         the sign's rim colour, opacity ~0.7, the existing spotlight
```

The blurred ellipse as a mask is what gives the feather — Figma masks honour
the mask layer's blur. On a card panel (S-05) the tile is clipped by the panel
anyway, so a plain `FILL` image fill is enough there.
