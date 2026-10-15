# Film 2 — "Flip it" (Align, 30s, 16:9 1920×1080, 30fps)

Concept: dating apps make us judge faces in half a second. Align FLIPS dating: the blind card comes first —
your chart, your words, your dealbreakers — and the face comes last, only when you both align. Everyone gets a chance.
End line: "Take a chance on the stars."

It must feel like the SAME FILM WORLD as Align's first feature film — watch promo/out/align-promo-final-share.mp4
(16:9; the latest 16:9 render is promo/out/align-promo-v11-share.mp4) and read its scenes in promo/src/scenes/:
s1-imagine.js (grainy deep-space nebula w/ dust lanes, crescent moon, heavy animated grain, glitch), s2-intro.js
(pixel-star wipes/mosaic, bracket text with corner ticks), s3-veil.js (mystery card in space, waxing moon, chakra stars
aligning into the column + lock flash, veil lift, aura-cam colour sweep, reveal card + foil, flip/push), s5-reading.js,
s6-deck.js (3D card stack, real cards), s7-tagline.js (aurora sky, constellation of aura portraits, phone beats with captions),
s8-end.js (Align mark draws, chakras light, wordmark, moon row), fx-stars.js (pixel-star sprites), fx-moon.js (moon).
Shared helpers: promo/src/scenes/common.js (W/H, fill, img, spaceBackdrop, makeStars, SERIF/SANS/MONO, A=assets path, IMG, PEOPLE),
promo/src/lib.js (ease, prog, lerp, rng, el, TypeLine, C palette). You may COPY code from those files into your scene; do not edit
promo/src/** (the first film must not change).

Brand: dark textured space (indigo, never flat black), heavy film grain, pixel-art stars, the moon, chakra colours only for the
column/aura, bone #efe6d6 type: EB Garamond italic statements, Space Mono uppercase eyebrows, Inter for UI-ish words. Plain warm
voice, no hype. Gold only as card finishes/glints. Text readable on a phone (≥ ~56px statements, ≥ 26px eyebrows at 1080p).

Assets: promo/assets/ (MANIFEST.md): card-profile-1..6 (veiled mystery cards), card-reveal (Juniper revealed), card-back,
card-event, card-talk-1..6, card-talk-daily, card-sign*, screen-*.png (match, chat-cards, alignment, deck…). People photos:
app/public/img/people/p1..p12.jpg, juniper.jpg, hakeem.jpg; aura veils app/public/img/aura/<sign>.jpg.

## Beat map (real time; scenes may overlap ~0.2s for transitions; later scenes draw above earlier)
| file | window | beat |
|---|---|---|
| f1-old.js | 0–4.2 | THE OLD WAY. Cold, desaturated, faster: a dating-app-style feed of real faces (people photos) getting swiped away in fractions of a second (cards flying off left/right, a judge-timer "0.4s" ticking, faces blurring by). Copy: "We swipe on faces." → "in half a second." Grain heavy, colour drained — this is what Align is against (don't mock a real app's UI/brand; generic). |
| f2-flip.js | 4.0–6.7 | THE FLIP (the hook payoff): the last face card stops dead centre, then FLIPS over in 3D — its back is an Align MYSTERY CARD (aura veil, the blind card). On the flip, colour/nebula floods in, pixel-star burst. Copy: "What if we flipped it?" |
| f3-chart.js | 6.5–10.7 | CHART FIRST, FACE LAST: the blind card centre in the grainy nebula; its content assembles: Sun/Moon/Rising badges, a bio line, dealbreakers typing in, while the photo window stays an aura veil. Copy: "Chart first." … "Face last." (eyebrow "BLIND BY DESIGN"). |
| f4-chance.js | 10.5–15.2 | EVERYONE GETS A CHANCE: the deck deals out a sea of mystery cards across the sky (no faces anywhere), constellation lines link them like stars. Copy: "No snap judgements." → "Everyone gets a chance." |
| f5-stars.js | 15.0–20.2 | READ THE STARS: two charts meet — two aura orbs/cards; Spark / Rub / Align readings flash (#7fd8b0 / #e8628a / #f2c75c), the seven chakra stars glide into the column and LOCK (flash, rings, rays). Copy at lock: "The stars aligned." |
| f6-reveal.js | 20.0–24.2 | THE FACE, LAST: the veil lifts (aura-cam colour sweep → real photo: Juniper), card-reveal with foil; then the match phone A+'screen-match.png' "You both aligned." |
| f7-talk.js | 24.0–27.2 | THEN YOU TALK: a talk card plays into the chat (A+'screen-chat-cards.png' or card-talk-*); caption "Then you talk in cards." |
| f8-end.js | 27.0–30.0 | END: "Take a chance on the stars." then Align lockup (mark draws, chakras, wordmark), fade to black by 30.0. |

## Contract
- Scene file default-exports `build(stage)` → `{ start, end, root, update(t), fx?(ctx, t), fadeIn? }` (see film2/main.js) and
  `export const cues = [[kind, t, ...args], …]` (absolute times) — kinds: tick (t, gain) · whoosh (t, len, gain) ·
  bell (t, hz, gain, decay, pan) · boom (t, gain) · glitter (t0, t1) · riser (t0, t1, gain). Score is in film2/cues.js.
- Pure function of t; deterministic (rng from lib.js; frame index = Math.round(t*30)). Handoffs: check the frames where your
  window meets the neighbouring scenes — no pops, no blank frames.
- Render: stills/sheets `node promo/scripts/render.mjs --film2 --stills=4.5,5 --dir=/tmp/claude-0/f2-<you>/a` or `--sheet --rate=6 --from=X --to=Y --dir=…` (FRESH dir each time). Full film: `node promo/scripts/teaser-sound.mjs --film2 && node promo/scripts/render.mjs --film2` (lead does full renders; you may for verification near the end).
- Only edit your own scene files. Don't commit.
