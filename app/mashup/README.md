# Align Mashup

Makes beat-synced 9:16 picture mashup videos for TikTok, Reels and Shorts: one
for each of the twelve signs and one for each of Align's core themes. Every cut
lands on the beat, and the videos use Align's own sign art, aura colours, foil
type and logo.

Each video runs: **title card → beat drop → shots with captions → 3×4 collage →
Align logo**. A video is 10–20 seconds at 120 bpm.

## The videos

| | |
| --- | --- |
| **Signs** | `aries` `taurus` `gemini` `cancer` `leo` `virgo` `libra` `scorpio` `sagittarius` `capricorn` `aquarius` `pisces`: strengths, weaknesses and "work on" from the user manual, the aura, and the dates |
| **Themes** | `zodiac` (all twelve), `auras` (the twelve auras), `elements`, `fire` `earth` `air` `water`, `big-three` (sun, moon, rising), `weather` (element compatibility), `dealbreakers` |

The words come from the app's own copy (`src/components/onboarding/readings.ts`
and `src/data/signs.ts`), copied into `mashup/content.js`. Edit them there.

## Make MP4s (command line)

Needs `ffmpeg` (`brew install ffmpeg`) and Playwright's Chromium
(`npx playwright install chromium`, once).

```bash
cd app
npm run mashup -- taurus                    # one sign  → mashup/out/align-taurus.mp4
npm run mashup -- zodiac fire big-three     # themes
npm run mashup -- signs                     # all twelve signs
npm run mashup -- all                       # everything (22 videos)
```

| Option | |
| --- | --- |
| `--bpm 120` | Tempo. Set it to your song's bpm so cuts land on the beat. |
| `--pace normal` | `chill` (longer shots), `normal`, or `hype` (fast cuts after the first few) |
| `--audio song.mp3` | Use your own track instead of the built-in Align beat |
| `--audio-start 32.5` | Start the song this many seconds in. The first cut comes 4 beats after the start, so begin 4 beats before the drop. |
| `--silent` | No sound (add a trending sound in the app instead) |
| `--jobs 2` | How many videos render at once |
| `--out mashup/out` | Output folder |

The MP4s are 1080×1920, 30 fps, H.264 + AAC.

## Studio (preview in the browser)

```bash
cd app
npm run mashup:studio      # → http://localhost:5180/mashup/studio.html
```

- Pick a sign or theme, set the tempo (or tap it), and press play.
- Change the title, captions and closing line, and the preview updates.
- Drop pictures on the panel to add them to the video, or onto one shot to swap it.
- Load your song and pick its start point.
- **Export video** records in real time and downloads the file. The command line
  gives a cleaner, frame-perfect MP4.

## Your own pictures

Put pictures in `mashup/media/<video>/`, for example `mashup/media/scorpio/` or
`mashup/media/dealbreakers/`. They are used first, in file-name order, and the
app's art fills the rest. JPG, PNG, WebP, GIF and AVIF all work. Tall (9:16) or
square pictures look best.

Only use pictures you have the rights to post.

## Files

| | |
| --- | --- |
| `content.js` | What each video says and which pictures it uses |
| `engine.js` | Draws the frames and makes the built-in beat |
| `render.mjs` | Command line: steps through every frame and encodes the MP4 with ffmpeg |
| `studio.html` | Browser preview and editor |
| `server.mjs` | Local server for both |
