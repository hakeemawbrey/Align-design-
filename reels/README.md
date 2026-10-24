# Align zodiac reels

Twelve vertical reels (1080 × 1920, ~47 s), one spoken to each sign. They're
slow, dreamy space collages: drawn mountains, roads, lakes and wheat fields
under huge planets and moons, with one warm-yellow line at a time and an
ambient score. The format was inspired by surreal collage reels. Every
frame, line and note is original to Align: the art is drawn in code, the
sign art comes from the app, and the music is synthesised.

`SPEC.md` is the format, voice and script contract.

| Path | What |
| --- | --- |
| `scripts/01-aries.json … 12-pisces.json` | the twelve scripts |
| `src/engine.js` | the scene engine: paints each scene kind and composites frames in a browser canvas |
| `src/render.mjs` | script → frames (Playwright Chromium) → MP4 with ffmpeg |
| `src/score.py` | an original ambient score per sign (numpy): pad chords, air, a chime per line |
| `out/` | renders (git-ignored) |

## Render

Needs Node 18+, Python 3 with numpy, and ffmpeg. Playwright comes from the
carousel package, so run `npm install` in `carousel/` once.

```bash
node reels/src/render.mjs                    # all twelve → reels/out/<id>.mp4 (+ .web.mp4, 720p)
node reels/src/render.mjs leo scorpio        # by sign or id
node reels/src/render.mjs --stills           # quick contact sheets in reels/out/stills/
node reels/src/render.mjs --jobs 3           # reels rendered at once
```

A reel takes about 2–3 minutes. `<id>.mp4` is the full-quality file to post.
`<id>.web.mp4` is a light copy for previewing.

## Posting

Upload the `.mp4` as a reel, and use the script's `caption` and `hashtags`.
The score is original, so it's safe to post. To use a trending sound instead,
turn the reel's own audio down to 0 in Instagram's editor and add the sound
there.

## Writing a new one

Copy a script, change the `id` and lines, then pick a scene `kind` per line
(the table is in `SPEC.md`). Run `--stills` to check the look before
rendering the video.
