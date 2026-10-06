# Align zodiac reel

A 31-second vertical reel (1080×1920, 30 fps, with sound), for Instagram and TikTok:
chakras + sacred geometry + the zodiac, and the word ALIGN all over it.

**Watch:** `out/final/align-hero-reel.mp4`. All launch videos (12 sign teasers, two love teasers, countdown, vortex, geometry gallery) are in `out/final/`; see `LAUNCH-PLAN.md`.

| time | scene |
| --- | --- |
| 0–3 s | Galaxy ignites, the Align mark draws, chakras light root → crown, "Come into ALIGN" |
| 3–17 s | Seven chakras, 2 s each: mantra above, ALIGN below, its planet and zodiac signs |
| 17–23 s | Zodiac wheel; the seven centres line up and ALIGN stamps at 21 s |
| 23–27 s | Beat-cut ALIGN typography and sacred-geometry montage |
| 27–31 s | End card: mark, wordmark, "Find who you align with." |

## Edit and re-render

Everything is code, so copy, colours and timing are easy to change.

```bash
cd app && npm install            # once: Playwright lives in the app's node_modules
cd ../reel
python3 -m http.server 8000      # live preview with scrubber: http://localhost:8000/?t=12
node tools/soundtrack.mjs        # re-synthesize out/soundtrack.wav (~3 s)
node tools/export.mjs --stills 4,21.1   # PNG stills to out/stills/
node tools/export.mjs --out out/align-reel-master.mp4   # full render, ~5 min
ffmpeg -i out/align-reel-master.mp4 -c:v libx264 -crf 24 -maxrate 14M -bufsize 28M -c:a aac -b:a 192k -movflags +faststart out/align-reel.mp4
```

- Timing: `lib/timeline.js`. Scenes: `scenes/*.js`. Chakra and zodiac glyphs: `lib/chakras.js`, `lib/zodiac.js`.
- Engine notes and the creative brief: `BRIEF.md`.
