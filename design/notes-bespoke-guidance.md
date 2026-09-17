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

## Still to build in this section

G-24 (traits), G-25 (element · Air), G-26 (ruler · Mercury), S-16 (term
explainer). S-14, S-15 and S-20 already exist in the bespoke section.

Once the section is complete, the clone copies in `Guidance` get moved to
`⌁ ARCHIVE`.
