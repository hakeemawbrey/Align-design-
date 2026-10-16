# Align reel: creative brief and engine contract

## The piece
A 31-second vertical (1080×1920, 30 fps) Instagram reel for **Align**, a zodiac dating app.
The mood comes from a reference reel: a grainy halftone galaxy swirling on near-black, with
bold flat chakra mandalas in front, mantra words above and below, hard cuts on the beat, and a
risograph/print feel. We are making an **original** piece with those motifs (do not copy the
reference's artwork, copy or footage). Our additions: **the zodiac** (12 signs) and **the word ALIGN,
many times**.

Theme line: the seven chakras line up, the twelve signs line up, you line up → **ALIGN**.

Tone: mystical, confident, premium. Not cheesy. Type is EB Garamond (serif, widely letter-spaced
caps, italic for soft lines) and Space Mono (small caps labels, ring text).

## Palette (ALIGN.C and ALIGN.CHAKRA_COLORS in lib/core.js)
Stardust indigo surfaces (never pure black in UI, but the reel's paper is #07040f), warm bone
#efe6d6 text, gold #f2c75c, violet #9a7be0, rub pink #e8628a, coral #f07a76 (the mandala ink).
Chakra column root→crown: #ff2d3a #ff7a2e #ffd23f #5fdc54 #2fd0e6 #4a72ff #b45cff.

## Timeline (lib/timeline.js, ALIGN.TL) — 120 bpm, a beat every 0.5 s
| time | scene | file |
| --- | --- | --- |
| 0–3 | Intro: from dark, galaxy ignites, ALIGN mark draws | scenes/01-intro.js |
| 3–17 | Seven chakras, 2 s each, root → crown, each paired with its zodiac signs | scenes/02-chakras.js |
| 17–23 | Zodiac wheel: 12 signs, rings of ALIGN text, planets/chakras line up | scenes/03-zodiac.js |
| 23–27 | Montage: fast beat-cut flashes of ALIGN type + sacred geometry | scenes/04-montage.js |
| 27–31 | Outro: Align mark, wordmark, tagline, end card | scenes/05-outro.js |

Chakra ↔ planet ↔ sign (the classical planetary correspondence):
1 Root (Muladhara) · LAM · Saturn · Capricorn, Aquarius
2 Sacral (Svadhisthana) · VAM · Jupiter · Sagittarius, Pisces
3 Solar plexus (Manipura) · RAM · Mars · Aries, Scorpio
4 Heart (Anahata) · YAM · Venus · Taurus, Libra
5 Throat (Vishuddha) · HAM · Mercury · Gemini, Virgo
6 Third eye (Ajna) · OM (AUM) · Sun & Moon · Leo, Cancer
7 Crown (Sahasrara) · silence (no bija; use "ALIGN") · beyond the planets · all twelve

## Engine contract
- Open `index.html` in a browser for a live preview with scrubber (`?t=12.5` to start at a time).
- Scene files are plain scripts that call
  `ALIGN.registerScene({ id, start, duration, draw(env) })`.
  `env = { bg, fg, t, p, T, frame, W, H, dur }`; `t` is seconds into the scene, `p` is 0..1, `T` is global seconds.
- **bg** context is drawn then pushed through a **halftone screen** (dots coloured by the source). Put
  galaxies, glows, big soft colour fields here. **fg** stays crisp (with a slight riso misregistration
  and film grain added by the compositor). Put glyphs, mandalas, line geometry and type here.
- Per-frame global FX you may set during draw: `ALIGN.fx.flash` (0..1 full-frame flash),
  `ALIGN.fx.flashColor`, `ALIGN.fx.shake` (px), `ALIGN.fx.halftoneCell` (default 9; bigger = chunkier),
  `ALIGN.fx.halftone = false` to skip the screen for that frame. They reset every frame.
- **Drawing must be a pure function of time.** No state carried between frames, no Math.random
  (use `ALIGN.rng(seed)` or `ALIGN.hash(n)`), no Date. Frames are rendered out of order.
- Helpers in lib/core.js: `seg(t,a,b)`, `ease.*`, `lerp`, `clamp`, `rgba(hex,a)`, `mixHex`, `text(ctx,str,x,y,{size,font:'serif'|'mono',weight,italic,color,spacing,align,alpha,stroke,strokeOnly})`,
  `textOnCircle`, `ringOfWords(ctx,'ALIGN',cx,cy,r,{size,spacing,color,sep,font})`, `galaxy(ctx,t,{cx,cy,scale,rot,tilt,tiltAngle,alpha,tint,tintAmt,density})`,
  `stars`, `flowerOfLife(ctx,cx,cy,r,{rings,outer,lw,color,progress,alpha})`, `metatron(ctx,cx,cy,r,{rot,progress,lw,color,alpha})`,
  `alignMark(ctx,cx,cy,size,{lit,progress,glow,alpha})` (the brand mark: seed of life + 7 chakra dots).
- Shared glyph libraries (owned by the agents below; other scenes may call them, guarded with `if (ALIGN.chakra)`):
  - `ALIGN.chakra.draw(ctx, i, x, y, r, { color, lw, progress /*0..1 draw-in*/, rot, alpha, fill /*bool, flat filled print style*/ })` for i = 0..6
  - `ALIGN.chakra.INFO[i] = { name, sanskrit, bija, planet, signs: [signIndex…], color }`
  - `ALIGN.zodiac.glyph(ctx, i, x, y, size, { color, lw, progress, alpha })` for i = 0..11 in order Aries … Pisces
  - `ALIGN.zodiac.SIGNS[i] = { id, name, element, symbol /*unicode*/, dates }`
  - `ALIGN.zodiac.constellation(ctx, i, x, y, size, { color, alpha, progress })` optional, star-and-line figure

**Do not edit** lib/core.js, lib/render.js, lib/timeline.js or index.html. If you need something
from them, write the helper inside your own file and mention it in your report.

## Testing
`node tools/export.mjs --stills 4,5.5,7` writes PNGs of those timestamps to out/stills/ (about 1 s each) and
prints page errors. Look at the PNGs with your image-reading tool. `node tools/export.mjs --from 3 --to 7 --out out/clip-chakras.mp4`
renders a clip. Always check your stills before you finish. Render a few frames on the beat, between beats and at scene edges.

## The word ALIGN
The brief is "put the word align in the video a bunch of times". Every scene must show ALIGN at least
once, often several: ring text, stamped type, the bottom mantra line, grids, outlines, echoes.
Spell it in caps as a design word; "Align" in sentence copy.
