# Align: deck style brief (hand this to a new chat)

I'm making a **simple 4-slide deck for Align**. It should look like Align's promo films: grainy deep-space nebula, pixel-art stars, one crescent moon, and elegant bone-coloured serif type. Use this file as the style guide. The four `ref-*.jpg` stills that come with it are real frames from the films; match them.

**What Align is:** an astrology blind-dating app. You see someone's chart, words and dealbreakers first; their face comes last, only when you both align. The cards are tarot-like "blind cards" with an aura veil instead of a photo. Taglines used so far: "Blind by design.", "Take a chance on the stars.", "Let the stars deal.", "You deserve to be known.", "Be chosen."
**Theme of the latest films:** people are lonelier than ever, and dating made people disposable. Align answers that with care: real questions (the Talk Deck), dealbreakers said first, and both people choosing.

---

## 1. The look in one paragraph
Each slide is a **16:9 frame of night sky**:
- **Sky:** deep indigo, never flat black, with soft violet and dusty-rose nebula clouds and dark dust lanes.
- **Grain:** heavy, visible film grain over everything.
- **Stars:** scattered tiny stars, plus a few chunky 7×7 pixel-art "plus" stars.
- **Moon:** ONE thin waxing crescent, always upper-right.
- **Type:** big italic serif statements in warm bone colour, with small spaced-out monospace eyebrows above them.
- **Accents:** gold only as small glints; chakra rainbow colours only for the 7-dot column in the logo or aura glows.

Calm, cinematic, intimate. Plain warm voice, never hype.

## 2. Colour tokens
```css
:root{
  --void:   #0b0620;  /* base background */
  --canvas: #140a2e;  /* panels / phone bg */
  --raised: #1e1240;
  --glass:  #34235f;
  --bone:   #efe6d6;  /* ALL main type */
  --label2: #b3a6c4;  /* secondary text */
  --label3: #7d6f94;  /* tertiary */
  --violet: #9a7be0;  /* nebula / accents */
  --plum:   #b45cff;
  --rub:    #e8628a;  /* pink: "Rub" / nebula rose */
  --spark:  #7fd8b0;  /* mint: "Spark" */
  --gold:   #f2c75c;  /* "Align" / glints only */
  --amber:  #f29a4a;
}
/* chakra column (logo, aura, lock): red→violet */
--c1:#ff2d3a; --c2:#ff7a2e; --c3:#ffd23f; --c4:#5fdc54; --c5:#2fd0e6; --c6:#4a72ff; --c7:#b45cff;
```

## 3. Type
| Role | Font | Style | Size (on a 1920×1080 slide) |
|---|---|---|---|
| Statement / headline | **EB Garamond** | *italic* 400, colour --bone, letter-spacing -0.01em, line-height 1.05 | 96–136px |
| Body (sparingly) | EB Garamond | regular or italic, --bone at 85% | 36–48px |
| Eyebrow / label | **Space Mono** | 400, UPPERCASE, letter-spacing 0.35–0.5em, --bone at 85%, or --gold for highlights | 26–36px |
| UI-ish words (phone UI, chips) | Inter | 400–500 | 24–32px |

Google Fonts: `EB+Garamond:ital@0;1` and `Space+Mono` and `Inter`.
**Rules:**
- One statement per slide, at most 2 lines.
- An eyebrow sits ~24px above the statement.
- Lots of empty sky around the type.
- Type always sits ABOVE the grain, so it reads crisp and solid.

## 4. Background recipe (CSS approximation)
```css
.slide{ position:relative; aspect-ratio:16/9; overflow:hidden; background:var(--void); color:var(--bone); }
/* nebula clouds */
.slide::before{ content:""; position:absolute; inset:-10%;
  background:
    radial-gradient(40% 30% at 30% 25%, rgba(154,123,224,.55), transparent 70%),
    radial-gradient(35% 28% at 70% 70%, rgba(232,98,138,.35), transparent 70%),
    radial-gradient(30% 25% at 85% 20%, rgba(180,92,255,.30), transparent 70%),
    radial-gradient(50% 40% at 15% 85%, rgba(52,35,95,.70), transparent 70%),
    radial-gradient(120% 90% at 50% 50%, #1a0f3d 0%, #0b0620 70%);
  filter: blur(30px) saturate(1.1); }
/* vignette */
.vignette{ position:absolute; inset:0; background:radial-gradient(ellipse at 50% 46%, transparent 30%, rgba(11,6,32,.35) 65%, rgba(8,4,24,.85) 100%); }
/* film grain: an SVG noise tile on top, blended */
.grain{ position:absolute; inset:0; mix-blend-mode:overlay; opacity:.5; pointer-events:none;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"); }
/* text sits above .grain (z-index higher) */
```
For a richer nebula, paint it on a `<canvas>` with layered value noise (violet/rose/indigo), plus a dark dust lane running diagonally. Then scatter ~1,500 tiny 1px stars at 30–90% white and ~30 bigger soft stars.

**Pixel-art stars:** chunky 7×7 sprites drawn as squares (X = colour, C = brighter centre). Scatter 6–12 per slide in bone, gold, pink or violet, at 14–40px.
```
...X...    .......    .......
...X...    ...X...    .X...X.
..XXX..    ..XXX..    ...X...
XXXCXXX    .XXCXX.    ..XCX..
..XXX..    ..XXX..    ...X...
...X...    ...X...    .X...X.
...X...    .......    .......
```
**Moon:**
- ONE thin waxing crescent, upper-right (about x 89%, y 11%), radius ~2.7% of slide width.
- Pale bone limb with a soft glow; the dark side is faintly visible (earthshine).
- Never two moons.

## 5. Motifs you can use
- **Blind card:** a tall rounded card (radius ~22px, ratio ~0.63).
  - Body: dark glass with a thin glowing rim; the colour comes from the aura.
  - An "aura veil" photo window: a soft glowing arch of colour instead of a face.
  - A serif italic name, e.g. "Juniper, 27".
  - Small mono chips, e.g. "LIBRA", "AIR", "PHOTO HIDDEN UNTIL YOU BOTH ALIGN".
- **Chakra column:** 7 glowing dots stacked vertically (colours c1→c7, red at the bottom), joined by a thin line. Used for "alignment".
- **Constellation lines:** thin 1–2px bone lines at ~35% opacity joining pixel stars.
- **Phone:** a dark rounded phone showing app UI. Bubbles have a gold rim and Inter text; mono labels such as "BOTH ANSWERED".
- **Logo lockup:**
  - The mark: seed-of-life circles with the chakra column inside.
  - The wordmark "Align" in EB Garamond italic.
  - "BLIND BY DESIGN" in Space Mono, widely spaced, small.
  - Centred on the last slide.

## 6. Layout rules
- Generous margins: at least 8% left and right, 10% top and bottom.
- Statement either centred, or left-aligned at about x 10%, with a visual on the other side.
- One idea per slide, with nothing extra.
- Readable on a phone screen: big statements, few words.
- No stock-photo look, no flat black, no bright white boxes, no drop-shadowed UI clutter, no gradients outside the palette.
- Gold is a glint, not a fill.
- Never invent statistics. If a number appears, it is a character's own phone UI (e.g. "214 MATCHES · 0 CONVERSATIONS").

## 7. Suggested 4-slide shape (edit freely)
1. **Hook:** eyebrow + one big statement over the sky, e.g. eyebrow "11:48 PM", statement "We've never been more connected. Or more alone."
2. **The problem / the flip:** e.g. "Dating made people disposable." with a faded, desaturated row of swiped cards, or "What if we flipped it?"
3. **How Align helps:** blind cards and the chakra lock, or the Talk Deck phone. Eyebrow = feature name ("THE TALK DECK", "DEALBREAKERS FIRST", "BLIND BY DESIGN"); statement = the benefit ("Chart first. Face last." / "Real questions." / "Nobody gets picked alone.").
4. **Close:** "Take a chance on the stars." (or "Be chosen.") over the Align lockup, plus a small CTA in Space Mono if needed.

## 8. Reference frames (attach these with this file)
- `ref-1-statement-over-sky.jpg`: big statement over the sky, with the city and the crescent moon.
- `ref-2-cards-and-caption.jpg`: blind cards, chakra column and caption.
- `ref-3-phone-and-eyebrow.jpg`: the phone UI next to an eyebrow and statement.
- `ref-4-end-lockup.jpg`: the end line and Align lockup.
