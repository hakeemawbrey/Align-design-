# Align promo — creative brief

A 30-second, 1920×1080, 30fps launch reel for **Align** (a dating app: astrology +
collectible veiled cards; deal → align → match → the veil lifts → chat). It is a
remake of a reference motion-design reel by @rajzmotion (30s, for an AI image tool
called "Appara"), keeping that reel's structure, rhythm and techniques but told with
Align's brand, product and assets.

## Reference (frames at 2 fps, 15 per sheet, read left→right, top→bottom)
`promo/ref/sheet1.jpg` (0–7.5s) · `sheet2.jpg` (7.5–15s) · `sheet3.jpg` (15–22.5s) · `sheet4.jpg` (22.5–30s).
Video: `promo/out/ref.mp4` (extract more frames with ffmpeg if needed, e.g.
`ffmpeg -ss 3 -t 1 -i promo/out/ref.mp4 -vf fps=10,scale=480:-1,tile=5x2 /tmp/x.jpg`).

Reference beats: blurred gradient silhouette + word-by-word line with colour shimmer
and scanline glitch → stepped pixel wipe → light grey bracket text "{ in one place }"
with corner ticks, "{ intro▣ducing }" with image chip → pixel mound → thermal false-colour
photo resolving to real → zoom into the product: huge prompt-bar typing → "Building
Image" step list → dot-matrix → photo flipping in 3D into a long stack, "gets / better",
"you ▣ create" → bright gradient, tagline in corner ticks → UI card lands in perspective
with handles and orbiting dots → black.

## Our version (scene files in promo/src/scenes/)
| time | file | beat |
| --- | --- | --- |
| 0–3.55 | s1-imagine.js | blurred aura photo of Juniper, "Imagine if the stars swiped for you", glitch bands; stair pixel wipe (fx in s1) |
| 3.55–6.86 | s2-intro.js | "{ in your stars }" → "{ intro▣ducing }" with people chip; pixel mound (fx) |
| 6.8–10.05 | s3-veil.js | thermal Juniper → real (the veil lifts), shrinks into a gilded card, flips |
| 9.88–14.4 | s4-birth.js | halftone aura sky, giant "Align", glass pill: zoomed typing "Born May 12, 1998 · 5:00 PM · Tulsa", pointer clicks send, morphs to spinner |
| 14.05–17.6 | s5-reading.js | "Reading your sky": Sun Taurus, Moon Sagittarius, Rising Libra, Venus Aries, Dealing; dot-matrix (fx) |
| 17.55–22.75 | s6-deck.js | cards dealt into a 3D stack, "every night / a new deck", "you ▣ align" |
| 22.4–27.0 | s7-tagline.js | gradient blobs, "Dating, dealt by the stars" in ticks, app screen lands in perspective |
| 26.85–30 | s8-end.js | Align mark draws in (seed-of-life + chakra column), wordmark, fade to black |

Engine: `promo/src/main.js` (timeline + transitions), `promo/src/lib.js` (easing, TypeLine,
palette). Every frame is a pure function of time `seek(t)`.
Brand rules: `docs/BRAND-QA.md` and tokens in `app/src/index.css` (indigo surfaces, warm bone
text, pearl buttons, gold only for card finishes, EB Garamond italic display, Inter, Space Mono eyebrows).
Captured real app assets: `promo/assets/` (see MANIFEST.md there once present).

## Rendering
- Stills: `node promo/scripts/render.mjs --stills=4.2,9.1 --dir=/some/own/dir`
- Contact sheet: `node promo/scripts/render.mjs --sheet --rate=4 --from=3 --to=7 --dir=/some/own/dir`
  (→ `<dir>/sheet.jpg`). ALWAYS pass your own `--dir` so parallel agents don't collide.
- Full video: `node promo/scripts/render.mjs` → promo/out/align-promo.mp4 (only the lead runs this).
