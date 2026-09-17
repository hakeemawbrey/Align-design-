# Guidance, rebuilt in the bespoke section

The 93 screens in the original sections are HTML-import clones: div soup, a
different component set, an opaque full-bleed background div. Retrofitting
atmospheres behind them was the wrong approach — it produced clones with
backgrounds, not screens in the design language. Per the decision taken, the
remaining screens are **built fresh inside `✦ STARDUST`** and the clones they
supersede get archived.

## The bespoke anatomy

Every screen in that section is a 390 x 874 frame, `layoutMode: NONE`,
`clipsContent: true`, fill `#140a2e`, composed as:

```
hero glow · <Sign>      560 x 440   peak alpha 0.95   LAYER_BLUR 110
glow · <second light>   420 x 320   peak alpha 0.72   LAYER_BLUR 150
starfield               390 x 874   ~72 dots, #fff9f2 at 0.10–0.70
geometry · seed         150 px      seed of life, 1px #fff9f2 at 0.26
content                 VERTICAL auto-layout — the actual UI
tab bar                 326 x 62 at (32, 792)   r999
home indicator          134 x 5  at (128, 858)
```

**A correction to an earlier conclusion.** I had decided that a gradient
ramping to zero plus `LAYER_BLUR 110` cannot register. The bespoke screens use
exactly that blur and read strongly. The variable was never the blur — it was
peak alpha. The clone generator used **0.50**; the bespoke screens use
**0.95**. Same blur, entirely different result.

## Tokens

```
canvas   #140a2e        card  #1e1240 r20      row  #1e1240 @0.70
hero     EB Garamond Italic 27   #efe6d6
eyebrow  SF Pro Semibold 10      #fff9f2   ls 1.2
label    SF Pro Semibold 10      #efe6d6 @0.44   ls 1.4
body     SF Pro Regular 13       #b3a6c4  /  #efe6d6 @0.88
chevron  SF Pro Regular 17       #7d6f94
tab bar  #251746 @0.86   stroke #6b5a94 @0.48 w1.75   r999
```

## G-23 — Your Chart · Gemini

The clone version put a 108px thumbnail of the sign on a screen whose entire
subject is that sign, and routed three tiles to three dead ends you had to back
out of. It measured **0.20% accent across two hue buckets**.

Rebuilt with Co–Star's structure (see `benchmarks-astrology.md`) in Align's
language:

- the sign's own light as the field — Gemini SIGNAL deepened to `#c4a535`
- a 156px aura orb with the twins **drawn as four bars**, never typed, because
  a zodiac character renders as Apple Color Emoji in this file
- `Sun in Gemini` in EB Garamond Italic, and Co–Star's compression of a chart
  identity to one line: `☉ Gemini  ☽ Sagittarius  ↑ Libra`
- **pagination dots** — four placements swiped, replacing the tile grid
- a **hairline** reading card, `#6b5a94` at 42%, not a filled plate, carrying
  two paragraphs of real copy
- the social hook, which is where Align beats its reference: Co–Star ends a
  reading with *"Add friends to see who's similar."* Align is a dating app, so
  the reading ends with **"Four in tonight's deck share this placement"** and
  goes to the deck. The read stops being a cul-de-sac.

```
                        accent    hues
Stardust sun sign       19.22%    amber 18.69
Align G-23 new          15.27%    amber 15.27
Align G-23 old clone     0.20%    2
Co–Star sun placement    0.00%    monochrome
```

Same mode, same hue family, comparable area to the Stardust benchmark.

## Two corrections from Stardust's own profile screen

`other-tabs_38` (Scorpio Profile) does this exact job, and it disagreed with
Co–Star on two points. Stardust wins both, being closer to Align's language:

1. **A labelled switch, not dots.** Stardust runs a segmented pill —
   `SUN | MOON | RISING` — so you know what you are switching between. Co–Star's
   pagination dots make you guess. G-23's dots were replaced with
   `SIGN | TRAITS | ELEMENT | RULER`, Align's own four facets in Stardust's device.
2. **A profile closes with an action.** Stardust ends with a full-width glow
   CTA (*See today's horoscope*). G-23 had no CTA at all; it now ends on
   `See today's sky ✦` into S-14.

## The five screens

| Screen | Primary light | Figure | Switch |
|---|---|---|---|
| G-23 Your Chart | Gemini SIGNAL `#c4a535` | twins, drawn | SIGN |
| G-24 How You Show Up | SIGNAL + jade | twins | TRAITS |
| G-25 Your Element · Air | ion `#3dc8f0` + amethyst | twins | ELEMENT |
| G-26 Your Ruler · Mercury | quicksilver `#9ecfe0` + gold | twins | RULER |
| S-16 Term Explainer | amethyst `#a855f7` + ion | none — a concept is not a sign | (none) |

S-16 drops the switch and the sign glyph, because it explains a term rather
than a facet of one chart.

## The chakra ladder moved to the lower half

The `Progress · 6 steps` rails sat at y 75, at the very top. They are now in
the gap between the copy and the CTA, and they are **actually the chakra ladder**
— they had been six identical cream segments. Each step now carries its own
centre, root through third eye, lit up to the current step with a glow on the
step you are on.

One thing worth recording: the first placement measured against the lowest
block on the screen and landed the rail *under the body copy*, because the
"lowest block" it found was a `glow · floor`. Measure against content, never
against atmosphere.

## Measured against Stardust

```
align  S-16 Term Explainer      30.00%   3 hues
STAR   Moon Sign Result         27.54%   3
align  G-25 Element · Air       25.43%   1
STAR   Pisces Profile           20.77%   1
STAR   Sun Sign Result          19.22%   4
STAR   Capricorn Profile        19.09%   1
STAR   Scorpio Profile          18.52%   2
align  G-23 Your Chart          15.27%   1

Align mean 23.57%          Stardust mean 21.03%
```

All eight sit in the 12%+ band — the same mode, the same band. S-16 at 30% is
the one that runs hotter than anything Stardust ships for this screen type; it
is within reach but worth a look if the section ever feels loud.

## Archived

All eight Guidance clones moved to `⌁ ARCHIVE`, each renamed
`[superseded · rebuilt in ✦ STARDUST] …`. Every one had a bespoke replacement
first — the move checks for one and skips anything unmatched. The `Guidance`
section is now empty.
