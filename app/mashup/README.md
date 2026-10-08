# Align Mashup

Makes beat-synced picture mashup videos for Reels, TikTok and Shorts: one for
each of the twelve signs and one for each of Align's core themes.

There are two styles:

- **Flash** (default), modelled on the
  [@zenllov reel](https://www.instagram.com/reel/DUVt-A6isNa/): one line of text
  held on screen while colour-treated pictures flicker underneath every
  sixteenth note (about every 4 frames). Each cut is duotone, blueprint blue,
  red poster, xerox, inverted or posterized, with picture-in-picture panels,
  torn strips and line drawings (circle and square, the Align mark, an eye) laid
  over some of them. The cuts repeat in a loop, so the reel loops cleanly. The
  sound is a hushed first bar, then chords that pump on every beat.
- **Classic**: title card, a beat drop, shots with captions, a 3×4 collage, then
  the Align logo.

## The videos

| | |
| --- | --- |
| **Signs** | `aries` `taurus` `gemini` `cancer` `leo` `virgo` `libra` `scorpio` `sagittarius` `capricorn` `aquarius` `pisces` |
| **Themes** | `zodiac` (all twelve), `auras` (the twelve auras), `elements`, `fire` `earth` `air` `water`, `big-three` (sun, moon, rising), `weather` (element compatibility), `dealbreakers` |

Each video's line for Flash is in `QUOTES` in `mashup/content.js`, written from
the app's own copy, for example Pisces: *"Potential does not text back."* The
Classic captions come from the user manual, element and dealbreaker copy in
`src/components/onboarding/readings.ts`. Edit them in `content.js`.

## Make MP4s (command line)

Needs `ffmpeg` (`brew install ffmpeg`) and Playwright's Chromium
(`npx playwright install chromium`, once).

```bash
cd app
npm run mashup -- taurus                    # one sign  → mashup/out/align-taurus.mp4
npm run mashup -- zodiac fire big-three     # themes
npm run mashup -- signs                     # all twelve signs
npm run mashup -- all                       # everything (22 videos)
npm run mashup -- pisces --size 4:5 --quote "Potential does not text back."
npm run mashup -- leo --style classic       # → align-leo-classic.mp4
```

| Option | |
| --- | --- |
| `--style flash` | `flash` (default) or `classic` |
| `--size 9:16` | Flash: `9:16` (Reels/TikTok), `4:5` (feed), `1:1`, or `6:5` (the reference reel's shape) |
| `--seconds 8` | Flash: length. It loops, so short is fine. |
| `--quote "…"` | Flash: replace the line on screen |
| `--bpm 113` | Tempo. Set it to your song's bpm so cuts land on the beat. Defaults: 113 Flash, 120 Classic. |
| `--pace normal` | Classic: `chill` (longer shots), `normal`, or `hype` (fast cuts after the first few) |
| `--audio song.mp3` | Use your own track instead of the built-in Align beat |
| `--audio-start 32.5` | Start the song this many seconds in. The first cut comes 4 beats after the start, so begin 4 beats before the drop. |
| `--silent` | No sound (add a trending sound in the app instead) |
| `--crf 21` | Quality. Lower is sharper and bigger; 18 is near-lossless, 23 is about 9 MB for 15 s |
| `--jobs 2` | How many videos render at once |
| `--out mashup/out` | Output folder |

The MP4s are 1080 wide, 30 fps, H.264 + AAC.

## Studio (preview in the browser)

```bash
cd app
npm run mashup:studio      # → http://localhost:5180/mashup/studio.html
```

- Pick a sign or theme and a style, set the tempo (or tap it), and press play.
- Change the words, and the preview updates.
- Drop pictures on the panel to add them to the video. In Classic, drop one onto a shot to swap it.
- Load your song and pick its start point.
- **Export video** records in real time and downloads the file. The command line
  gives a cleaner, frame-perfect MP4.

## Your own pictures

Put pictures in `mashup/media/<video>/`, for example `mashup/media/scorpio/` or
`mashup/media/dealbreakers/`. They are used first, in file-name order, and the
app's art fills the rest.

Flash looks most like the reference with 15–30 sharp, busy pictures per video:
collage art, eyes, statues, skies, figures and textures. The app's aura art is
soft, so the colour treatments are doing most of the work without your own
pictures. JPG, PNG, WebP, GIF and AVIF all work. Tall (9:16) or
square pictures look best.

Only use pictures you have the rights to post.

## Files

| | |
| --- | --- |
| `content.js` | What each video says and which pictures it uses |
| `flash.js` | Draws the Flash style |
| `engine.js` | Draws the Classic style, makes the built-in beat, shared helpers |
| `render.mjs` | Command line: steps through every frame and encodes the MP4 with ffmpeg |
| `studio.html` | Browser preview and editor |
| `server.mjs` | Local server for both |
