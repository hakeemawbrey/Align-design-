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

1080×1920, 30 fps, 12–22 s. A full-bleed painting, graded toward dusk and darkened
where the type sits, pushes in slowly; each card gets its own picture and crossfades
to the next. Up top: the sign's glyph and name and story-style progress ticks. At the
bottom: a small *align*. The hook and the call to action are EB Garamond italic; the
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

`music.py` is the Visions score engine with a `soft` mode (no kick or clap, a sparser
arpeggio): a minor pad loop with a plucked arpeggio and sub bass, keyed per sign, faded
in and out and mastered to −14 LUFS.

## Fonts

EB Garamond and Sofia Sans Condensed, SIL Open Font License (`assets/fonts/`). Sign
glyphs are from DejaVu Sans (free licence).
