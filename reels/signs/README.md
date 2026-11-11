# Align Signs

A reel generator that talks straight to each zodiac sign: letters ("Dear Scorpio,"),
relationship advice, what they won't say out loud, how they love, relatable lines,
what alignment feels like, sign pairs, and invites ("Send this to the Leo who…").
Every reel is painted with **free art only** (public domain, CC0, CC BY, CC BY-SA)
from a large curated catalogue, scored with generated music, and ends on a share,
invite or "come align" card.

```sh
pip install numpy Pillow            # and ffmpeg on PATH
python3 scripts.py                  # every script id (348 today)
python3 render.py scorpio-dear-2    # out/scorpio-dear-2-s0.mp4 (+ .txt caption/credits, .cover.jpg, .json)
python3 render.py scorpio-dear-2 --seed 3      # same words, new pictures and music
python3 render.py scorpio-dear-2 --stills      # a contact sheet of the cards, seconds
python3 render.py --sign leo --text "Leo, this is your sign." "Rest." "You did enough."
python3 make.py --count 48 --jobs 3            # the next 48 in rotation (every sign, every format)
python3 make.py --sign pisces --format invite  # just these
python3 make.py --forever --jobs 3             # endless: when every script is made, seeds go up
python3 tools/site.py                          # out/site/: the reels + the whole catalogue as one page
```

The published page (samples + catalogue): https://claude.ai/artifact/HNVXezdgMLDNdQTtQDwK2t

## The reel

Square 1080×1080, 30 fps, 10–20 s. Each card is a still: one painting, graded toward
dusk and darkened where the type sits, with the line on top. Cards change with a hard
cut, no transitions, motion, progress bar or header. At the bottom, small and quiet: COME ALIGN · JOIN THE BETA. The hook and the call to action are EB Garamond italic; the
body is Sofia Sans Condensed.

| Format | Hook | Ends on |
| --- | --- | --- |
| `dear` | Dear Scorpio, | send this to your Scorpio |
| `loves` | How a Taurus loves you | invite your Taurus to align |
| `wontsay` | Things a Cancer won't say out loud | tag the Cancer who needs this |
| `needs` | Dating a Leo? They need… | invite them |
| `relatable` | Signs you're dating a Gemini | send this |
| `advice` | Virgo, a little relationship advice | send this |
| `reminder` | Libra, this is your reminder: | send this |
| `align` | What alignment feels like for an Aquarius | find who you align with |
| `invite` | Send this to the Sagittarius who has a passport and no plan. | invite them to align |
| `pair` | Scorpio + Cancer | invite them |

## Words

All copy is in `copy/signs.json`, per sign: `dear` (letters), `loves`, `wontsay`, `needs`,
`relatable`, `advice`, `align`, `pairs`, `invite` hooks, and the image `moods` the sign
draws from. `scripts.py` turns it into scripts and holds the CTAs, captions and hashtags.
Add a line to any list and new scripts appear. `python3 scripts.py --lint` checks the
house rules (alignment not "compatibility", never "on Align", no soulmate promises, no
brands, no alcohol).

## Pictures

| Piece | What |
| --- | --- |
| `catalog/visions/` | the 440 pictures already curated for Align Visions (moon, stars, castle, knight, lovers, mystic, water, forest, plus one pool per sign) |
| `catalog/plan.json` | search plan for the Signs pools: letters, window, garden, dance, sunset, couples, portraits, beach, flowers, cupid, city at night, clouds, café, music, mirror, rain, boats, space, and one myth pool per sign |
| `catalog/keep/<pool>.json` | which candidates were kept, their crop focus, and the pinned favourites |
| `catalog/pools/<pool>.json` | the curated pool (`tools/curate.py` writes it from the keep file) |
| `sources.py`, `fetch.py` | search Wikimedia Commons, the Art Institute of Chicago, the Met and NASA; keep only open licences; drop sketches, b/w and objects on white; numbered contact sheets |

To grow the catalogue: add queries to `catalog/plan.json`, run
`python3 tools/fetch_all.py --again <pool>`, look at `cache/<pool>/sheet-*.jpg`, add the
tile numbers you like to `catalog/keep/<pool>.json`, and run `python3 tools/curate.py <pool>`.
What makes a good picture (adapted from the Visions brief for a tall 9:16 crop): one
clear subject that reads in two seconds, colour, romantic or moody; no nudity as the
focus, violence, crowds, text, frames, sculpture on plain backgrounds, or near-duplicates.

Pictures download on first use into `cache/` (not committed). Public-domain and CC0 images
need no credit; CC BY / BY-SA ones are credited in the caption `.txt` automatically. The
lines below "NOT FOR POSTING" list every image's source for your records.

## Music

`score.py` has eight styles, and a batch rotates through them so they're heard evenly:

| Style | Sound | Tempo |
| --- | --- | --- |
| `piano` | felt piano, broken chords and a slow melody | 66–80 |
| `lofi` | dusty Rhodes 7ths, swung hats, soft kick and snare, vinyl crackle | 70–86 |
| `rnb` | slow Rhodes 9ths, deep sub bass, finger snaps on 2 and 4 | 62–72 |
| `guitar` | nylon-string fingerpicking with a soft bass | 78–96 |
| `musicbox` | music-box melody over a warm pad | 88–108 |
| `ambient` | slow string swells and far-off bells, no beat | 56–66 |
| `dream` | the Visions synth: pads and plucked arpeggio, no drums | 120 |
| `pulse` | the Visions synth with kick, clap and hats | 120 |

The seed picks the key, major or minor, chord loop, melody, tempo and tone, so no two reels
sound alike. `--music piano` on `render.py` or `make.py` fixes the style;
`python3 score.py --all` writes a 16-second demo of each to `out/music/`. Everything is
synthesized, so there's nothing to license. Mastered to −14 LUFS.

## Fonts

EB Garamond and Sofia Sans Condensed, SIL Open Font License (`assets/fonts/`). Sign
glyphs are from DejaVu Sans (free licence).
