# Film 3 — "Rigged" (Align, 15s, 16:9 1920×1080, 30fps)

Hook: **dating is rigged and superficial.** Hidden scores decide who gets seen, faces decide in half a second.
Align un-rigs it: everyone is dealt blind, by the stars; the face comes last.
End line: **"Let the stars deal."** → Align lockup ("BLIND BY DESIGN").

15 seconds is short: every beat must read on a phone in one glance. Big type, one idea per shot, hard cuts allowed,
energy higher than films 1–2 (bpm 104). The first 1.5s must stop the scroll.

## Same film world
Watch promo/out/film2/align-flip-it-v4-share.mp4 (film 2, latest) and promo/out/align-promo-v11-share.mp4 (film 1).
Film 2 code is the best reference and you may COPY from it (do NOT import from or edit promo/film2/** or promo/src/**):
- promo/film2/scenes/f1-old.js — cold desaturated face-feed, timer, ✕/♥ stamps, grain/flicker
- promo/film2/scenes/f2-flip.js — card flip, colour flood, pixel-star burst, nebula build (buildNebula)
- promo/film2/scenes/f3-chart.js — the S1 nebula sky spine (getSky/drawSky/skyCam/drawGrain), mystery card with lock chip
- promo/film2/scenes/f4-chance.js — dealt sea of mystery cards with names + rim glow
- promo/film2/scenes/f5-stars.js — chakra column lock, moon renderer, grain helper
- promo/film2/scenes/f6-reveal.js — aura-cam colour sweep → Juniper reveal card
- promo/film2/scenes/f8-end.js — "Take a chance on the stars." typed line + Align lockup + fade
Helpers you may import: promo/src/lib.js (ease, prog, tw, lerp, rng, el, TypeLine, C), promo/src/scenes/common.js
(W, H, SERIF/SANS/MONO, A = assets path, IMG, PEOPLE…), promo/src/scenes/fx-stars.js, fx-moon.js.

Brand: dark textured space (indigo, never flat black) with heavy film grain, pixel-art stars, the moon; bone #efe6d6 type —
EB Garamond italic statements (≥ 96px for the hook lines here), Space Mono uppercase eyebrows/labels (≥ 26px), chakra colours only
for column/aura; gold only as glints. The "rigged" world is the opposite: cold, desaturated, harsh, clinical UI-ish, but generic
(never mock a real app's name, logo or UI).

## Beat map (real time; later scenes draw above earlier; overlap ~0.2s)
| file | window | beat |
|---|---|---|
| g1-rigged.js | 0–3.6 | RIGGED. Cold B&W grain. 0–1.8 **"Dating is rigged."**: a wall/feed of face cards (people photos) with hidden scores exposed — a cold ranking: each card gets a mono score tag ("SCORE 4.1", "9.6"…), the low ones are stamped "HIDDEN"/"NOT SHOWN" and shoved off, a "BOOST $" tag pumps one card to the top; it reads as a rigged machine sorting people. 1.8–3.6 **"And superficial."**: one face fills the frame, beauty-filter sliders / scan brackets snap over it, swiped away in 0.3s ("JUDGED IN 0.3s"), faces blur past faster and faster → ends on a dead-centre card at ~3.5 that the next scene breaks. |
| g2-break.js | 3.4–6.2 | THE BREAK. The rigged machine glitches: the score tags and the centre card shatter into pixel stars, the nebula floods in (colour!), the cards fall upward and turn into mystery cards (aura veils, no faces) dealt across the sky like a hand of cards by an unseen dealer. Copy: **"Align deals blind."** (eyebrow "NO SCORES · NO FACES"). |
| g3-blind.js | 6.0–11.4 | BLIND. One mystery card (Juniper's, card-profile-3 / film-2 style) centre in the nebula: chart badges, bio, lock chip "PHOTO HIDDEN UNTIL YOU BOTH ALIGN". Copy **"No scores. No filters."** (6.3) → **"Just two charts."** (7.6) — your card slides in; chakra stars lock between the two cards ~9.0 (flash, rings). Then **"Face last."** (9.6) as the veil lifts: aura-cam sweep → Juniper's real face (card-reveal / juniper.jpg) clear by ~10.4, held to 11.2. Moon present (one moon only). |
| g4-end.js | 11.2–15.0 | END. **"Let the stars deal."** types in big (by ~12.0), holds; then rises into the Align lockup (mark draws, chakras, wordmark "Align", "BLIND BY DESIGN") complete by ~13.2, held to 14.5, fade to black 14.5–15.0. |

## Contract
- Scene default-exports `async build(stage)` → `{ start, end, root, update(t), fx?(ctx,t), fadeIn?, fxStart?, fxEnd? }`
  (see promo/film3/main.js) and `export const cues = [[kind, t, ...args]]` (absolute times). Score: promo/film3/cues.js.
- Pure function of t; deterministic (rng from lib.js; frame index = Math.round(t*30)). No pops/blank frames at handoffs.
- Grain should read the same in every scene (overlay grain ≈ 0.5; compensate when the plate is dimmed).
- Captions readable ≥ 1.0s fully on. Never two moons. No doubled text in dissolves.
- Render (FRESH --dir each time, never shared): `node promo/scripts/render.mjs --film3 --sheet --rate=6 --from=X --to=Y --dir=/tmp/claude-0/f3-<you>/a`
  or `--stills=1.2,2.4 --dir=…`. Full film (lead only): `node promo/scripts/teaser-sound.mjs --film3 && node promo/scripts/render.mjs --film3`.
- Only edit your own scene file(s).
