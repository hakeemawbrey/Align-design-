# What-if explainers

Three Kurzgesagt-style explainers for Align (1920 × 1080, 30 fps), drawn
entirely in code:

| Video | Story | Length |
| --- | --- | --- |
| `out/stardust.mp4` | *What if the person you're meant to find was made in the same star as you?* | 52 s |
| `out/lightspeed.mp4` | *What if "I love you" had a speed limit?* | 47 s |
| `out/stars-align.mp4` | *What if two stars could align?* (the first one: microlensing) | 55 s |

The two newer ones live in `stories/<id>/` (`script.json` + `scene.js`) and
share one engine, `kit.js`, loaded by `story.html?v=<id>`. Pass the id to
every tool:

```bash
../affirm/.voice/venv/bin/python src/voice.py stardust
node src/render.mjs --story stardust --stills
node src/render.mjs --story stardust --frames --jobs 3
../affirm/.voice/venv/bin/python src/mix.py stardust
src/encode.sh stardust
```

A story's `script.json` also lists its sound effects (`sfx`), each tied to a
beat word with an offset and a level under the voice.

## The first one: what if two stars could align?

A 55-second animated explainer for Align (1920 × 1080, 30 fps). It's about
gravitational microlensing: a near star lines up with a far one, and its
gravity bends the far star's light so it brightens. The video is drawn
entirely in code, on one 2D canvas plus one WebGL canvas for the planets.
The voice, music and effects are all free to post (see below).

| Path | What |
| --- | --- |
| `script.json` | the narration, one line each, and the word in each line that fires a beat |
| `index.html` | the engine. `window.seek(t)` draws frame `t`, as a pure function of time |
| `src/voice.py` | speaks each line with Kokoro (via `../affirm/voice.py`), joins the lines with 0.24 s gaps (0.36 s before "He was wrong") and writes each beat's time to `build/timeline.json` |
| `src/render.mjs` | headless Chromium (WebGL on) seeks every frame and blends 2 subframes (shutter 0.6) for motion blur. `--stills` makes a contact sheet of every beat |
| `src/mix.py` | voice + music bed (7 dB under the voice, +5 dB under the title, final chord on the title) + one effect per event kind, peak-aligned to its frame |
| `src/encode.sh` | masters to -14 LUFS / -2.2 dBTP with gain and a limiter, then encodes `out/stars-align.mp4` (CRF 16) and `out/stars-align.web.mp4` (CRF 20) |
| `assets/` | Fredoka (OFL) and the CC0 audio, with sources in `assets/audio/SOURCES.md` |
| `contact-sheet.png` | every beat, at the final timings |

## Render

Needs Node 18+, Playwright with Chromium, ffmpeg and Python 3. The voice
uses the affirm reels' Kokoro setup, so run `../affirm/setup.sh` once first.

```bash
../affirm/.voice/venv/bin/python src/voice.py    # narration + beat times
node src/render.mjs --stills                      # build/contact.png
node src/render.mjs --frames --jobs 3             # build/frames/ (~20 min on 4 CPUs)
../affirm/.voice/venv/bin/python src/mix.py       # build/mix.wav
src/encode.sh                                     # out/*.mp4
```

To change a line, edit `script.json` and run every step again. Each beat
fires on its word, so the visuals follow the new read automatically.

## Facts on screen

- Microlensing: the near star's gravity bends the far star's light into a
  ring too small to resolve. What telescopes see is the star brightening.
- The far stars are toward the galactic centre, about 26,000 light years away.
  The lens is typically about halfway.
- Einstein, 1936: he wrote there was "no great chance" of observing it.
  The first events were seen in 1993.
- Surveys catch about 3,000 events a year, each lasting a few weeks, and some
  reach more than 1,000× brightness.
- More than 200 exoplanets have been found from blips in these light curves.
- Toward the galactic bulge, about one star in a million is being lensed at
  any given moment.
