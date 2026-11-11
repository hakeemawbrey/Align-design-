# Align pause challenge (3D star)

A 20 s vertical reel (1080 × 1920, 30 fps) in the "pause challenge" format: a glossy 3D star tumbles through
space past a glowing star outline, and on **exactly one frame per round** it fits the outline perfectly. Three
rounds (red, blue, gold), each spinning faster than the last, then "Only 1% pause all three. Comment ALIGN."

Everything is original: the star and scene are three.js, the score is synthesised with numpy. Nothing in the
audio marks the aligned frame.

| Path | What |
| --- | --- |
| `reel.json` | copy, colours, round timing (`at` = seconds into the round where it fits), spin and flight path |
| `scene.js` | the three.js scene; `renderFrame(f)` is deterministic, aligned frames are snapped to the frame grid |
| `page.html` | text overlay (Inter, EB Garamond italic, Space Mono) |
| `score.py` | the original score |
| `render.mjs` | frames in headless Chromium → MP4 with ffmpeg |

## Render

Needs Node 18+, Python 3 with numpy, ffmpeg and Playwright's Chromium.

```bash
(cd reels/pause && npm install)
node reels/pause/render.mjs --stills   # cover + each round's fit frame and the frames either side, seconds
node reels/pause/render.mjs            # full reel, ~4 min
```

Output goes to `reels/out/pause/`: `<id>.mp4` (post this), `<id>.web.mp4` (720p preview), `<id>.cover.jpg`,
`<id>.caption.txt` and `<id>.answers.txt` (the exact aligned time of each round).

Harder: raise `spin` and `path.vz` in `reel.json`. More rounds: add entries to `rounds` (the pips assume three).
