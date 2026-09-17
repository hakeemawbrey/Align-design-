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

### The alignment graphic, second pass

The first version was a donut ring with two uniform circles inside it. Read as
two identical dots rather than two people, and the ring was a borrowed Stardust
form sitting on a screen that had nothing else of Stardust in it.

Rebuilt so **the card is the object**, since the card is what Align is:

```
card   326 x 366  r20
       fill   palindromic foil, #231049 → #5426a8 at centre → #231049
       stroke #fff9f2 @0.62  w3
       inset  keyline #fff9f2 @0.22  w1.25  r12
       fx     DROP_SHADOW r30 #05000f @0.60
well   a dark radial behind the pair
auras  two irregular lobes, rotated, blendMode SCREEN, LAYER_BLUR 15
melt   a warm core where they overlap, SCREEN
glyphs ♎ and ♊ drawn as bars and an arc, each glowing in its own sign colour
text   the reading, the two charts, and ALIGN · № 031/∞
```

The two auras are **rotated ellipses of different sizes**, not matched circles,
and they are set to `SCREEN` so the overlap genuinely brightens into a third
colour rather than one sitting on top of the other. A small warm core sits at
the intersection to give the melt a centre.

The foil, the cream edge and the keyline then carry down into the segmented
control, the read rows and the tab bar, so the whole screen is one object
family rather than a card floating on unrelated furniture.

**Screening a warm colour over violet foil destroys it.** Gold `#ffd84d`
screened over the card's `#5426a8` centre lands at roughly `(1, 0.87, 0.76)` —
saturation 0.24, which reads as near-white. The Gemini lobe measured **zero**
amber. The fix is a dark well behind the pair, which is also the truer idea:
on a card the aura is a window, not a sticker. With the well, amber returns at
0.72% and the hue count goes 2 → 3.

```
                        accent   hues
Stardust Sun Sign       19.22%    4
Align S-21 (card)        7.78%    3
Stardust Moon Insight    3.26%    5
Stardust Home Dashboard  1.13%    6
```

Above Stardust's content screens, because it is no longer a content screen —
it is a card screen, and Align's own card screens run around 20%.

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

## The deck states

Five built from S-05 by cloning. **The card is untouched** — only the header,
the state and the dealt person change.

| Screen | Header | State |
|---|---|---|
| S-03 Dealing | `Dealing your deck` / *Fifteen cards, chosen by tonight's sky* | the fan, before you look |
| S-04 Your Stack | `Tonight's deck` / *15 of 15 cards left tonight* | nothing seen yet |
| S-05 The Deck | `Tonight's deck` / *11 of 15 cards left tonight* | the working state |
| S-05b next card | *10 of 15 cards left tonight* | a second person dealt |
| S-05c Reading | *Reading the stars…* | cards at 0.45 / 0.62, bloom at 0.35, no gesture legend |
| S-05e Peek sealing | *The photo is closing* | `SEALING BACK · THE VEIL RETURNS`, bloom up to 0.9 |

**S-05b deals a real second person**, not a recolour: M., 24, Virgo, Earth,
Taurus moon, with copy that follows from the chart — *Mars on your Venus*,
*her fixed streak stalls plans*, *Earth grounds air, you keep a steady pace* —
and № 032/∞, `SLOW BURN` rather than `STRONG PULL`. The element chip is
re-dressed from the air blue to the earth cream, since Virgo is an earth sign.
This is the same error the clone version carried and it is not repeated here.

**The deck had no geometry.** Per the rule, the deck is *the many*, so it now
carries a **flower of life** — nineteen hairline circles, three rings, cropped
off the top-right corner at 18% opacity.

### A wrap to watch

The sign name is a fixed-width text node sized for `LIBRA`. `VIRGO` is two
pixels wider and wrapped to `VIRG / O`. Any sign swap on a card needs
`textAutoResize = 'WIDTH_AND_HEIGHT'`, or the longer names break the row.

## The chat states

Five built from S-09 by cloning. The thread, the rail and the input bar are
the same object on all five — only the **status strip** and the dimming change.

A chat is **two people meeting**, so the screen carries a **vesica**: two
192px hairline circles overlapping, 288 x 192 at x52 / y372, `#fff9f2 @ 0.20`
on a group at 0.14 opacity. One geometry, behind the thread, never under the
body copy.

| Screen | Strip | Colour |
|---|---|---|
| S-09c sent | `SENT · NOT READ YET` / *She has seven days to answer.* | `#b3a6c4` |
| S-09d typing | `JUNIPER IS TYPING` / *. . .* | `#7ED957` |
| S-09e failed | `/\ NOT SENT · TAP TO RETRY` / *No connection...* | `#ff5a3d` |
| S-09f expiring | `FALLS OFF ALIGNMENT IN 2 DAYS` / *Five quiet days...* | `#ff914d` |
| S-09g closed | `THIS CONNECTION CLOSED` / *Juniper let the card go.* | `#7b7bf5` |

The strip is SF Pro Semibold 9 at 12% letterspacing over SF Pro Regular 11 in
`#efe6d6 @ 0.58`. The label carries the state colour; the sentence underneath
never does — same discipline as the deck, where only the eyebrow is allowed to
run hot.

**S-09f also moves the frame around it**: the expiry eyebrow becomes
`EXPIRES IN 2 DAYS` in `#ff914d` and the rail shortens to 66px, so the countdown
reads in three places at once without three different colours.

**S-09g closes the screen down** rather than putting a banner on it: eyebrow and
rail hidden, thread to 0.48, input bar to 0.40, placeholder rewritten to
`This channel is closed`. Nothing is removed — the conversation stays readable,
it just stops being live.

### The strip has to clear the thread

First pass seated the strips at y=674 while the thread ran to y=694, so every
strip sat on top of the last bubble. The fix is not to move the strip further
down (the input bar is at 720) but to **hide the tail bubble** and seat the
strip at y=637 in the space it leaves. A status strip is a turn in the
conversation, so it should occupy a turn's worth of room.

## Still to build

S-02 Auth and S-06 Expand.
