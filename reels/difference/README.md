# Align "What's the difference?" reels

Vertical reels (1080 × 1920, about 60 s) that take two words people mix up
and tell them apart: love words (chemistry vs alignment, love vs
limerence, your type vs your pattern, a crush vs a match) and chart words
(sun vs rising, Venus vs Mars, horoscope vs birth chart, sign vs
constellation).

The format was inspired by @drdifference_ (108K followers, a page of "X vs Y,
what's the difference?" reels). Their frame is warm paper, a bold label over
each of two framed art cards, "What's the difference?" in big type, and a
cartoon mascot shrugging between two red question marks. A voice then
explains each word and the difference. The Align version keeps that frame and
makes everything else its own:

- **The cards are Align cards.** Glowing Stardust figures, planets and chart
  wheels on Align's indigo sky, drawn in code. Between pairs both cards flip
  like a deal, and at the end they turn face down to show the Align card back.
- **The mascot is Star Talk's pixel star** (`vendor/`, from
  `promo/films/startalk.js` on the `claude/align-promo-video` branch). It
  glances from card to card with a tilt and pink question marks while the
  question is asked, looks at each card as it's explained, and smiles with two
  gold exclamation marks when the difference lands. It hops as the voice talks.
- **The answer has its own beat.** The VS coin between the cards turns into ≠,
  a marimba chime plays, and the caption says the one-line difference.
- **Captions light up word by word** with the voice. Key words get a gold
  highlighter swipe as they're said.
- **Progress dashes** under the Align wordmark show which of the four pairs
  you're on, so people stay for the last one, which is always the strongest.

Every drawing, line and note is original. The voice is the open-weights
Kokoro model (shared with `../affirm`), and the score is synthesised.

| Path | What |
| --- | --- |
| `scripts/*.json` | one script per reel |
| `engine.js` | the frame engine (an ES module, run in Chromium) |
| `vendor/` | Star Talk's pixel star and its two helpers, copied unchanged from the promo branch |
| `render.mjs` | script → voice → frames → MP4 with ffmpeg |
| `score.py` | the music and sound cues: plucks and marimba in a major key, a pop for the question marks, a paper flip per card turn, a chime per answer, a ding for the pill |
| `PROFILE.md` | the page that posts these: handle, bio, how Align shows up |
| `../out/difference/` | renders, covers, captions (git-ignored) |

## Setup (once)

The same as the affirmation reels: Node 18+, Python 3, ffmpeg, then

```bash
(cd carousel && npm install)     # Playwright and the fonts
reels/affirm/setup.sh            # the Kokoro voice, ~120 MB, shared
```

## Render

```bash
node reels/difference/render.mjs --stills   # contact sheet + cover per reel, ~20 s
node reels/difference/render.mjs            # every reel → reels/out/difference/<id>.mp4
node reels/difference/render.mjs love       # by id
```

Each reel gives you `<id>.mp4` (to post), `<id>.web.mp4` (a light 720p
copy), `<id>.cover.jpg` (the grid cover: the first pair, the question and the
shrug, the way the format's thumbnails look) and `<id>.caption.txt`.

## The batch: 100 single-pair reels

`batch.mjs` holds a bank of 100 pairs (69 love and dating, 31 astrology),
one pair per reel, about 25 s each, like most of the format's own posts. It
writes `scripts/batch/NNN-a-vs-b.json` and refuses any spoken line with
"compatibility", an exclamation mark, a digit or a hyphen.

```bash
node reels/difference/batch.mjs                                  # write the 100 scripts
node reels/difference/render.mjs --dir batch --stills --jobs 3   # covers + contact sheets, ~9 min
node reels/difference/render.mjs --dir batch --jobs 3 --skip     # the videos, ~45 min; --skip resumes
```

Renders land in `reels/out/difference/batch/`. Batch pairs pick their art
from the kit: `solo:<motif>:<colour>` (heart, flame, butterflies, knot,
alone, crowd, door, wall, storm, mask, star, chain, phone, seed, mirror,
clock, thoughts, shield, flag), `duo:<pose>:<colour>:<colour>` (close,
apart, away, ghost, three, wall, lead), `planet:<glyph>:<colour>:<moons>`,
`sign:<glyph>:<colour>`, `wheels:overlay|merge`,
`aspect:conjunction|opposition|trine|square|sextile`,
`moon:new|full|waxing|waning`, `eclipse:solar|lunar`,
`glyphs:<glyphs>:<colour>` and `orbs:<LABELS>:<colours>`, alongside the
named arts below.

## Script contract

```json
{
  "id": "01-love-words",
  "voice": "af_heart",
  "speed": 1.15,
  "caption": "…", "cta": "…", "hashtags": ["…"],
  "pairs": [
    {
      "a": { "label": "Chemistry", "art": "spark" },
      "b": { "label": "Alignment", "art": "road" },
      "ask": ["Eight words people use about love.", "Almost nobody can tell them apart.", "*Chemistry* versus *alignment.*"],
      "explainA": ["*Chemistry* is how it feels.", "The pull, the nerves, the spark."],
      "explainB": ["*Alignment* is how it works.", "Your values, your days, how you fight."],
      "diff": ["Chemistry gets you a *second date.*", "Alignment gets you a *second year.*"]
    }
  ],
  "end": { "lines": ["Send this to the friend", "who calls everything *chemistry.*"], "pill": "SEND THIS TO SOMEONE" }
}
```

- Each pair plays four beats: **ask** (both cards, the shrug), **explainA**
  (card A in focus, gold ring), **explainB**, and **diff** (both cards, ≠).
  Every string is one caption, spoken.
- The first pair's `ask` carries the hook. Make the last pair the strongest
  and say so in its `ask` ("And the one that matters most.").
- `*words*` get the gold highlighter. "Align" does too, automatically.
- Spell numbers as words, so the voice and the captions match.
- Four pairs come out at about 60 s.

### Arts

| art | for | what |
| --- | --- | --- |
| `spark` | chemistry | two figures reaching, a bolt crackling between their hands |
| `road` | alignment | two figures hand in hand on a long road toward the dawn |
| `halo` | love | two figures close inside one steady halo |
| `limerence` | limerence | one figure lit by a phone, thoughts circling its head, the other person far off and dashed |
| `lineup` | your type | three figures that look exactly alike |
| `loop` | your pattern | a path that loops back on itself, a light running it |
| `beam` | a crush | hearts streaming from one figure to another who doesn't turn |
| `align` | a match | two figures, their star heads on one straight line through a sun and two moons |
| `sun` | sun sign | a big sun, a figure standing in its light |
| `rising` | rising sign | a sign coming up over the eastern horizon |
| `venus`, `mars` | planets | a halftone planet and its glyph (Mars has its two moons) |
| `horoscope` | horoscope | twelve rows of the same text, one sign lit |
| `chart` | birth chart | a full wheel, planets in place, aspect lines |
| `slices` | sign | twelve equal 30° slices, the sun moving round |
| `constellation` | constellation | star patterns of every size on the sun's path, 13 crossings |
| `back` | (the end) | the Align card back |

## Voice and fact rules

The same as the other reels (`../SPEC.md`, `../affirm/README.md`): second
person, calm and clear, no exclamation marks, astrology reads but never
decides. Every fact has to hold up:

- **limerence**: Dorothy Tennov's word (*Love and Limerence*, 1979), and it
  really does feed on uncertainty.
- **rising sign**: the sign on the eastern horizon at birth. It changes about
  every two hours, which is why it needs a birth time.
- **sign vs constellation**: tropical signs are twelve equal 30° slices counted
  from the March equinox. The sun's path crosses thirteen IAU constellations
  (Ophiuchus is the thirteenth), and precession has moved the stars about 28°
  (almost a whole sign) in two thousand years.

Never say "compatibility" or "compatible": Align's word is **alignment**.

Say **"the Align app"**, never "on Align": spoken, "Align" sounds like
"a line". Tie the line to something the app really does (cards flip only when
both people align; You shows your big three).
