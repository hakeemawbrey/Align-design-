# Zodiac reels

Eighteen-second vertical reels, one per sign, made in the format of a viral
tarot reel. The sign's card sits alone on black and steps bigger on two hard
cuts. A hit lands at 2.2s, then full-bleed motif images cut every 0.6s with
the card ghosted over them. All of it is drawn from open and public-domain
imagery, with a procedural soundtrack.

```sh
pip install -r requirements.txt          # numpy, Pillow; ffmpeg must be on PATH
python3 render.py leo                    # out/leo-s0.mp4 + out/leo-s0.txt (caption, tags, credits)
python3 render.py leo --seed 7           # a different reel from the same pool
python3 make.py                          # all 12, in parallel
python3 make.py --forever                # walk the zodiac endlessly, a new seed each lap
```

## How a reel is made

| Piece | File | What it does |
| --- | --- | --- |
| Signs | `signs.json` | Name, numeral, element, ruler, colour cast, motif search terms, caption |
| Imagery | `fetch.py`, `sources.py` | Searches Openverse (Wikimedia, Flickr CC), the Art Institute of Chicago, the Met and NASA; filters out sketches and objects on white; writes numbered contact sheets |
| Curation | `picks/<sign>.json`, `CURATE.md` | 14-16 hand-checked images per sign, each with a focus point, zoom and credit |
| Card | `card.py`, `assets/plates/` | A Rider-Waite-style card made from the sign's plate in *Urania's Mirror* (1824) |
| Score | `music.py` | A root note per sign (12 signs, 12 semitones), a mode and texture per element, and a two-pass master to -11 LUFS |
| Render | `render.py` | Grade, bloom, grain, vignette, cut timing, encode |

Each `(sign, seed)` is a distinct reel. Seed 0 plays the curator's pinned and
top-ordered images; other seeds sample the rest of the pool, reshuffle the order
and re-roll the score's voicing. So a 15-image pool gives hundreds of distinct
reels per sign. To go further, curate more images into the pools.

## Automation

`.github/workflows/zodiac-reels.yml` renders one new reel a day, the next sign
in rotation and a new seed each lap, and attaches the mp4 and caption to the
run. Run it by hand from the Actions tab with a chosen sign and seed. Posting
to Instagram automatically would need a Meta Graph API token for a business
account, which is not set up here.

## How the look was tuned

Three rounds of agent review compared renders frame by frame with the
reference. They checked the intro step sizes and timing, card opacity, hit
behaviour, loudness and envelope, and the strength of every shot at phone
scale, and the code and picks were changed after each round. The house rules
that came out of it are in `CURATE.md` and the `STYLE` dict in `render.py`.

Credits for every image in a reel are written to its `.txt` sidecar; keep them
in the post caption or bio where a licence (CC BY / BY-SA) asks for
attribution.
