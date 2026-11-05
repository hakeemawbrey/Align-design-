# Align bold reels (the pre–Star Talk look, 100 at a time)

Vertical reels (1080 × 1920, 15–60 s) in the style of the original films: the purple nebula sky with the crescent
moon, Inter 800 headlines that pop in word by word with one EB Garamond italic accent, and a big glowing line-art
visual in every beat. Some are voiced (Kokoro, shared with `../affirm`), all have an original score from the original
films' music engine. **There is no end card or logo animation**: the last beat carries one quiet mono line about the
Houston beta and voting for your city.

Unlike the promo films (one hand-coded folder per film), every reel here is a JSON script rendered by one engine, so
a new reel is a new file in `scripts/`.

| Path | What |
| --- | --- |
| `SPEC.md` | the script format, copy rules and every visual kind with its params |
| `scripts/NNN-slug.json` | one script per reel (`series`: Scenarios, Relationships, Align ideas, Zodiac, Fun facts, Relatable, Houston) |
| `engine.js` | the frame engine (Chromium): sky, type, beats, chained visuals, footer, SFX cues |
| `kit.js` | the drawing kit: neon ink, pictogram people, glyphs, labels, pills, bubbles, cards, sparkles |
| `vis/*.js` | the visuals: `core` (people, phones, Align's features, quizzes), `astro`, `houston`, `explain` |
| `sky.js` | the original films' sky, moon and grain, vendored from the promo branch |
| `score.mjs`, `synth.mjs` | the original films' score arranger and synth, vendored |
| `render.mjs` | script → voice → timeline → score + voice mix → frames → MP4 |
| `lint.mjs` | checks scripts against SPEC.md and estimates lengths |

## Setup (once)

Node 18+, Python 3, ffmpeg, then

```bash
(cd app && npm ci) && (cd carousel && npm ci)   # Playwright + Inter, EB Garamond, Space Mono
reels/affirm/setup.sh                           # the Kokoro voice, ~120 MB (only voiced reels need it)
```

## Render

```bash
node reels/bold/lint.mjs                        # 0 errors before rendering
node reels/bold/render.mjs --stills 012         # contact sheet + cover, seconds
node reels/bold/render.mjs --jobs 3             # everything → reels/out/bold/
node reels/bold/render.mjs --jobs 3 --skip-existing
```

Each reel gives `<id>.mp4` (to post), `<id>.web.mp4` (720p), `<id>.cover.jpg` (frame-0 hook), `<id>.caption.txt` and
`<id>.json` (title, series, length, voice). A 30 s reel takes about a minute and a half on one core.
