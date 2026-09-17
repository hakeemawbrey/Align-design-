# Core Flow, rebuilt in the bespoke section

Nineteen screens. The bespoke section already held S-05, S-05d, S-07, S-08,
S-09 and S-09b, so thirteen are being built: S-02, S-03, S-04, S-05b, S-05c,
S-05e, S-06, S-21, and the five chat states S-09c..S-09g.

**The card design is not changing.** Deck-state screens clone S-05's card
rather than redraw it.

---

## S-21 Alignment

The screen where the app says what two charts are worth to each other.

### Where the structure came from, and where it didn't

The Pattern's `Bond Insight Dashboard` is the closest thing in the catalogue —
avatar pair, editable "who" dropdowns, and a verdict. Its verdict is one loud
word, `EXTRAORDINARY`, in a blue-to-purple gradient pill filling the width.

**Built that first and it was wrong for Align.** A shouted adjective in a
full-width badge is The Pattern's voice, not ours, and it fought the serif
register the rest of the file speaks in.

Stardust's own `Cycle Community Result` (`oth_iqlqb`) answers the same question
— *how strong is this?* — and answers it very differently:

```
CYCLE INSIGHTS                 mono eyebrow
      ╭───────╮
      │  17%  │                a donut, one coloured arc on a dark track
      ╰───────╯
You are a pink moon cycler,    the verdict AS A SERIF SENTENCE
like 17% of the Stardust
community.
      • ○ ○                    pagination
────────────────────────────   a hairline rule
PAST CYCLES                    mono eyebrow
( Past 6 months ) ( All time ) a cream lozenge on a dark track
```

Flat ground. A starfield. **No hero glow at all** — the ring carries the
colour. And the verdict is a *sentence*, not a badge.

### What S-21 became

Stardust's structure, Align's content:

- the donut is **Align's two charts**: a dark track with an arc swept to the
  strength of the read, graded orchid → gold, Libra into Gemini
- the two auras sit inside it, overlapping — the vesica, which is the match
- the verdict is a serif sentence: *"Air feeds air. You make each other
  quicker, and slower to decide."*
- `LIBRA · AIR  ◇  GEMINI · AIR`, pagination, a rule
- `WHERE IT SHOWS` over a cream-lozenge segmented control, `SPARK | RUB | ALIGN`
- three read rows, each dotted in the colour of the sign that drives it

```
                        accent   hues
Stardust Moon Insight    3.26%    5
Align S-21               2.28%    3
Stardust Home Dashboard  1.13%    6
Stardust Community       0.29%    1
```

Inside Stardust's content-screen band.

### Two build notes

**The arc must be a filled band, not a stroked pie.** `arcData` with
`innerRadius: 0` on a stroked ellipse draws the two radial edges as well, so a
line runs from the centre out to the arc. Fill the node instead and set
`innerRadius = (R - strokeWeight) / R`.

**An auto-layout frame resized to a fixed height collapses its children.**
`resize(334, 10)` on the read-row stack hid all three rows; they only appear
once `layoutSizingVertical = 'HUG'` is set after appending.

---

## The pearl holo button

Align's primary CTA, and it is not a generic light gradient. Lifted verbatim
from O-02, O-05 and S-07:

```
314 x 54        cornerRadius 999
fill  GRADIENT_LINEAR on a rotated axis
      gradientTransform [[0.9462487, 0.05375128, 0],
                         [-2.1914625, 0.93969262, 1.12588489]]
      0.00  #f6edff      violet cream
      0.45  #fff7ec      warm cream
      0.80  #eaf4ff      cool cream
      1.00  #ffeff7      pink cream
fx    DROP_SHADOW  r30  #f6edff @ 0.35    the pearl bloom
      DROP_SHADOW  r26  #05000f @ 0.45    the drop
text  EB Garamond Medium Italic 19  #3a2c4e
```

Four stops cycling through the whole pearl, on a tilted axis so the sheen runs
corner to corner. The five Guidance screens had been built with a **three-stop
approximation** (`#fdf3e0 → #f3e2f6 → #dfe6fb`) and a gold-tinted shadow, which
is flatter and warmer than the real thing. All six new screens now carry the
canonical fill.

**The sparkle needs its own font run.** `✦` is not in EB Garamond, so a
single-font label silently drops it — which is why the bespoke buttons report
`fontName: mixed`. Set the label in EB Garamond, then `setRangeFontName` the
final character to SF Pro Regular at 15.

---

## Still to build

S-02 Auth, S-03 Dealing, S-04 Your Stack, S-05b next card, S-05c loading,
S-05e sealing, S-06 Expand, and S-09c..S-09g. The deck states clone S-05; the
chat states clone S-09b.
