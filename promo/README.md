# Align promo reel

A 30-second, 1920×1080, 30fps launch reel for Align. It follows a reference
motion-design reel beat for beat (blurred silhouette, bracket type, thermal-to-real
reveal, zoomed typing, step list, 3D card stack, gradient tagline, end card), told
with Align's own photos, captured app screens and cards, palette and type.

## Render

From the repo root, with `app/` dependencies installed:

```bash
node promo/scripts/soundtrack.mjs          # → promo/out/soundtrack.wav (original procedural score)
node promo/scripts/render.mjs              # → promo/out/align-promo.mp4 + -share.mp4 (≈17 MB)
node promo/scripts/render.mjs --stills=4.2,9.1 --dir=/tmp/x   # stills
node promo/scripts/render.mjs --sheet --rate=4 --from=3 --to=7 --dir=/tmp/x   # contact sheet
```

A full render takes about a minute. To preview live, serve the repo root
(`npx vite . --port 8080` or any static server) and open `/promo/index.html`
(space = play/pause, ←/→ = step a frame, `?t=12.5&pause` to open at a time).

## How it's built

- `index.html` + `src/main.js`: the timeline. Every frame is a pure function of
  time, `seek(t)`, so renders are exact and repeatable.
- `src/scenes/s1…s8-*.js`: one file per beat (see `BRIEF.md` for the scene map).
- `src/cues.js`: sound cue times; `scripts/soundtrack.mjs` synthesises the score,
  with typing ticks, whooshes and chimes on those cues.
- `scripts/capture-assets.mjs`: re-captures the app screens and cards in
  `assets/` from the running app (`cd app && npx vite --port 5173`).

## Changing copy

| Beat | Line | File |
| --- | --- | --- |
| Hook | What if the stars chose who you meet? | s1-imagine.js |
| Answer | { now they do } → { introducing *Align* } | s2-intro.js |
| Veil | The veil lifts when you both align. | s3-veil.js |
| Birth | May 12, 1998 · 5:00 PM · Tulsa, OK | s4-birth.js (`BIRTH_TEXT`) |
| Reading | Reading your sky · Sun / Moon / Rising / Venus | s5-reading.js |
| Deck | every night / a new deck · come ▣ Align | s6-deck.js |
| Tagline | Dating, dealt by the stars · You both aligned. · Then you talk in cards. | s7-tagline.js |
| End | Align · Your first deck is waiting | s8-end.js |

If you change a typed line, update its text and timing in `src/cues.js` too, so the
typing sounds still line up.
