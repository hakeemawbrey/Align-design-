# Align Visions

An endless reel maker for Align. Each reel is about ten seconds: a square of
moonlit, painterly pictures between black bars, cutting every quarter second
under one line about love, spirit, alignment or the stars, then the Align
wordmark. The format follows a @zenllov reel (instagram.com/reel/DeHiS52hY0z).
Every picture is public domain or openly licensed, and the music is generated.

```sh
pip install numpy Pillow                 # and ffmpeg on PATH
python3 render.py love-01                # out/love-01-s0.mp4 + out/love-01-s0.txt (caption, tags, credits)
python3 render.py love-01 --seed 5       # same words, new pictures, order and music
python3 render.py --text "Say it plain." --moods moon lovers
python3 make.py                          # the next 12 reels in rotation
python3 make.py --theme love --count 6   # just love lines
python3 make.py --sign scorpio           # just Scorpio
python3 make.py --forever                # never stop
```

## Endless

There are 205 lines in `lines.json`: 45 love, 35 soul, 35 align, 30 sky and
five for each sign. Each `(line, seed)` is a different reel: the seed draws a
new set of ~20 pictures from the line's pools, reshuffles them and re-rolls
the music's key, chords and arpeggio. With 40-odd pictures per pool, a line
can come round again and again without looking the same.

`make.py` takes turns across the themes (love, soul, align, sky, signs), uses
the least-made line next, and bumps its seed each time it comes back. Its
progress is saved in `out/state.json`, so `--forever` picks up where it
stopped.

## How a reel is made

| Piece | File | What it does |
| --- | --- | --- |
| Words | `lines.json` | On-screen line, theme, sign, image moods, and the post caption; CTAs and hashtags per theme |
| Pictures | `pool/<mood>.json` | Eight curated pools (moon, stars, castle, knight, lovers, mystic, water, forest) plus one per sign in `pool/signs/` |
| Sourcing | `fetch.py`, `sources.py` | Searches Wikimedia Commons, the Art Institute of Chicago, the Met and NASA for open-licensed images; numbered contact sheets for curation |
| Curation | `CURATE.md`, `tools/sheet.py` | The brief, and graded contact sheets so pictures are judged the way they play |
| Grade | `render.grade` | Turns old paintings toward the reference's look: levels, local contrast, a moonlit blue ramp that spares skin and light sources, vibrance, bloom, blue-lifted blacks |
| Type | `render.text_layer`, `render.wordmark_layer`, `render.tag_layer` | Sofia Sans Condensed Bold with a black outline and soft shadow (nearly the reference's font); "Align" in the app's wordmark face, EB Garamond italic; a quiet "come align" low in the picture on every frame |
| Music | `music.py` | A 120 bpm minor loop (pads, plucked arpeggio, sub bass, kick, clap, hats on the cuts) that ends on the bar so the reel loops cleanly. `--audio song.mp3` uses your own track; `--silent` leaves it for a trending sound |
| Output | `out/` | 1080x1920, 24 fps H.264, AAC; plus a `.txt` with the line, caption, CTA, hashtags and image credits |

Timing: cuts land every eighth note at 120 bpm (6 frames). A reel lasts
4-6 bars (8-12 s), long enough to read the line twice, and the last 1.5 s
shows the wordmark.

## Adding to it

- **More lines:** add to `lines.json`. Give each 2-3 `moods`, best fit first.
- **More pictures:** `python3 fetch.py <mood> "painter subject" ...`, look at
  `python3 tools/sheet.py cand <mood>`, add picks to `pool/<mood>.json`
  following `CURATE.md`. A new mood is just a new pool file.
- **Gallery:** `python3 tools/gallery.py site --last 24` builds a phone-friendly
  page of the newest reels with web-size copies. Add `--by-sign --title "Align Visions Signs"`
  and a list of files for a page filtered by sign.

## Credits

Public-domain images need no credit. CC BY and CC BY-SA images need their
author and licence in the post caption or bio; each reel's `.txt` lists them.
Fonts: Sofia Sans Condensed and EB Garamond, SIL Open Font License
(`assets/fonts/`).
