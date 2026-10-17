# Align: deck style brief (hand this to a new chat)

I'm making a **simple 4-slide deck for Align**. It must look like Align's first 30-second widescreen promo film. That film is the house style, and every slide should feel like a paused frame from it.

Use this file as the style guide. The nine `ref-*.jpg` images attached with it are real frames from that film; match them closely.

**What Align is:** an astrology blind-dating app.
- **Blind first:** you see someone's chart and words first, on a blind "mystery card" with an aura glow instead of a photo.
- **Face last:** the face is revealed only when you both align.
- **Then you talk:** you talk through tarot-like talk cards.

**Lines used in the film:**
- "What if the stars chose who you meet?"
- "{ introducing *Align* }"
- "The stars are giving you a chance."
- "The stars aligned."
- "Reading your sky"
- "every night / a new deck"
- "come *Align*"
- "Dating, dealt by the stars"
- "It's mutual. *You both aligned.*"
- "Then you talk in cards."
- End tagline: "PUT YOUR FAITH IN THE STARS"

---

## 1. The look in one paragraph
Each slide is a **soft, glowing night sky**:
- **Background:** a smooth vertical gradient from deep indigo to plum, with large blurred colour "nebula" glows (violet, rose-pink, plum, a touch of amber) melting into each other. It is calm and luminous, not busy.
- **Grain:** a light, fine film grain over everything.
- **Stars:** a scatter of tiny white stars, plus a few sparkle-shaped stars (four-point twinkles and pixel "plus" stars).
- **Type:** clean, centred and confident.
  - Statements are in **Inter, medium weight, bone white**.
  - Brand words and titles are in **EB Garamond italic**.
  - Tiny **Space Mono uppercase** labels with wide letter-spacing.
- **Moon:** moon motifs are everywhere, as in the film: a small moon-phase badge in the top-left corner, and a row of moon phases on the closing slide.

Premium, dreamy, minimal, with plenty of empty space.

## 2. Colour tokens
```css
:root{
  --void:#0b0620;  --canvas:#140a2e; --raised:#1e1240; --glass:#34235f;
  --bone:#efe6d6;               /* all main type */
  --label2:#b3a6c4; --label3:#7d6f94;
  --violet:#9a7be0; --plum:#b45cff;
  --rub:#e8628a;                /* rose pink: also the italic "Align" accent word */
  --spark:#7fd8b0; --gold:#f2c75c; --amber:#f29a4a;
}
/* chakra column (logo mark, alignment): bottom→top */
--c1:#ff2d3a; --c2:#ff7a2e; --c3:#ffd23f; --c4:#5fdc54; --c5:#2fd0e6; --c6:#4a72ff; --c7:#b45cff;
```

## 3. Background "space moods" (the exact recipe from the film)
A vertical base gradient, then 4–5 big soft radial glows blended with `mix-blend-mode: screen`. Each glow is a circle whose colour fades out from its centre: full alpha at 0%, 42% of that alpha at 45%, and 0 at 100%. Glow positions are fractions of the slide; radii are in px on a 1920×1080 slide.

| mood | base top → bottom | glows: rgb @ (x, y), radius, alpha |
|---|---|---|
| **rose** (default) | #0b0620 → #1c0d3a | 154,123,224 @ (.22,.30) r900 a.55 · 232,98,138 @ (.80,.72) r820 a.42 · 180,92,255 @ (.62,.18) r640 a.30 · 242,154,74 @ (.10,.95) r560 a.16 |
| **teal** | #080522 → #120a33 | 86,196,214 @ (.18,.78) r760 a.30 · 154,123,224 @ (.70,.28) r900 a.48 · 127,216,176 @ (.88,.85) r600 a.20 · 74,114,255 @ (.40,.10) r700 a.28 |
| **amber** | #0c0620 → #1e0e36 | 180,92,255 @ (.25,.25) r860 a.45 · 242,154,74 @ (.82,.80) r760 a.30 · 242,199,92 @ (.55,1.0) r620 a.16 · 232,98,138 @ (.92,.20) r600 a.26 |
| **aurora** | #0d0626 → #24103f | 232,98,138 @ (.55,.70) r980 a.62 · 180,92,255 @ (.20,.35) r900 a.58 · 154,123,224 @ (.85,.30) r800 a.50 · 242,154,74 @ (.18,.98) r640 a.30 · 255,143,177 @ (.78,.95) r560 a.34 |

On top of the glows:
- **Vignette:** `radial-gradient(120% 95% at 50% 50%, rgba(11,6,32,0) 55%, rgba(11,6,32,.6) 100%)`.
- **Stars:** ~160 tiny white dots, 1–2px at 30–90% opacity, plus 4–8 sparkle stars.
- **Grain:** a grey noise tile (an SVG feTurbulence works) with `mix-blend-mode: overlay` at **opacity ~0.22**. That is light, unlike the heavy grain of the later films.

Use a different mood per slide for variety; rose and aurora are the signature ones.
- **Opening slide (optional):** it may instead use a darker, grainier deep-space nebula with a thin crescent moon upper-right (see ref-1).
- **Aurora mood:** can carry a soft pink aurora band across the lower third, with thin vertical light rays (ref-7, ref-8).

## 4. Type
| Role | Font | Style | Size on 1920×1080 |
|---|---|---|---|
| Statement / hook | **Inter** | 500, bone, centred, sentence case | 68–84px |
| Light statement / supporting words | Inter | 200, bone | 56px |
| Titles and brand words | **EB Garamond** | *italic* 400, bone. The brand word *Align* inside a sans line is italic Garamond in **--rub pink** | 78–108px |
| Eyebrow / label / status | **Space Mono** | 400, UPPERCASE, letter-spacing 0.3–0.5em, bone at ~70% | 26–30px |
| Big input or UI text | Inter | 400, bone | 84px+ |

Google Fonts: `Inter:wght@200;400;500`, `EB+Garamond:ital@0;1`, `Space+Mono`.

## 5. Signature devices (use 1–2 per slide)
- **Corner-tick box:** four tiny solid squares (~10px, bone) marking the corners of an invisible box around a centred statement. Add faint thin arrows ← → on either side for a "slider" feel (ref-2).
- **Curly-bracket line:** `{ introducing Align }`. The brackets and words are Inter; "Align" is pink italic Garamond.
- **Moon-phase badge, top-left:** a small moon glyph plus a two-line Space Mono label, e.g. "FIRST QUARTER / DAY 1 OF 7", ~16px, at ~60% opacity. Change the phase on each slide (new → crescent → quarter → gibbous → full), so the deck "waxes" from slide 1 to slide 4.
- **Moon-phase row:** 9 small circles going from new to full under the tagline on the last slide (ref-9).
- **Mystery card:** a tall rounded card (ratio ~0.63, radius ~22px).
  - Dark glass, with a thin glowing rim in the aura colour.
  - The photo window is a soft glowing aura arch (pink/violet) instead of a face.
  - Text: a Garamond italic name ("Juniper, 27"), a coloured sign word ("LIBRA"), and small mono chips.
  - Often in front of a large pale full moon (ref-3).
- **Chakra lock:** 7 glowing dots in a vertical column (red bottom → violet top), with concentric thin rings and light rays behind. Used for "The stars aligned."
- **Pill input bar:** a huge rounded glass pill with Inter text and a blinking caret. Halftone dot-grid bands sit above and below (ref-4); good for "Your chart starts here".
- **Checklist:** a Garamond italic title, then rows of small coloured square icons with Inter "Sun — Taurus" entries (ref-5).
- **Card stack in perspective:** a receding 3D row of cards with lowercase Inter words placed around it, e.g. "every night" upper-right and "a new deck" lower-right (ref-6).
- **Constellation of portraits:** small round glowing portrait dots joined by thin bone lines, framing a centred statement (ref-7).
- **Phone:** a dark phone showing app UI, beside a mono eyebrow and a Garamond italic line ("IT'S MUTUAL / *You both aligned.*", ref-8).
- **Lockup:**
  - The seed-of-life mark with the chakra column, above "*Align*" in Garamond italic.
  - "PUT YOUR FAITH IN THE STARS" in Space Mono, widely spaced.
  - The moon-phase row underneath.
  - Faint round aura portraits scattered dimly around the edges (ref-9).

## 6. Layout rules
- Centre-weighted compositions, with lots of empty sky.
- At most one statement and one visual per slide.
- Margins of at least 8% on the sides and at least 10% top and bottom.
- Statements are sentence case with no full stop for the sans hooks ("Dating, dealt by the stars"). Italic Garamond lines end with a full stop ("The stars aligned.").
- No flat black, no hard white boxes, no heavy drop shadows. Gold is only a glint.
- Never invent statistics.
- Text must read on a phone screen.

## 7. Suggested 4-slide shape (edit to the real content)
1. **Hook:** rose or deep-nebula mood, crescent moon, one centred Inter line, e.g. "What if the stars chose who you meet?"
2. **Introduce or explain:** `{ introducing Align }` with corner ticks, or the mystery card in front of the moon with "*The stars aligned.*"
3. **How it works:** the checklist ("*Reading your sky*": Sun / Moon / Rising / Dealing) or the card stack ("every night / a new deck"). Alternatively, the phone with "IT'S MUTUAL / *You both aligned.*".
4. **Close:** the lockup with "PUT YOUR FAITH IN THE STARS" and the moon-phase row, plus an optional small mono CTA.

Moon badge progression across the 4 slides: new → first quarter → waxing gibbous → full.

## 8. Reference frames (attach all nine with this file)
| file | shows |
|---|---|
| `ref-1-hook-question.jpg` | the hook over a grainy nebula with the crescent moon |
| `ref-2-bracket-intro.jpg` | `{ introducing Align }`, corner ticks and arrows on the rose mood |
| `ref-3-mystery-card-moon.jpg` | the mystery card and chakra lock, with "*The stars aligned.*" |
| `ref-4-birth-pill.jpg` | the giant pill input, halftone bands and the moon badge |
| `ref-5-reading-checklist.jpg` | the "*Reading your sky*" checklist and a card |
| `ref-6-deck-stack.jpg` | the perspective card stack, "every night / a new deck" |
| `ref-7-dealt-by-the-stars.jpg` | the constellation of portraits, the aurora, and the hook line |
| `ref-8-phone-mutual.jpg` | the phone with "IT'S MUTUAL / *You both aligned.*" |
| `ref-9-end-lockup.jpg` | the mark, *Align*, the tagline and the moon-phase row |
