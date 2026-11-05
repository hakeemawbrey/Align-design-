# Align affirmation reels

Vertical reels (1080 × 1920, ~37 s) of spoken love-and-zodiac affirmations.
Gold-and-bone line drawings on Align's indigo sky draw themselves in while a
calm voice speaks. The captions light up word by word as each word is said,
and every reel ends on **"Comment WORD"**, a veiled Align card that lifts to
show the word, and a pearl pill saying it's on its way.

The format (line-art explainer, karaoke captions, comment-to-DM ending) was
inspired by @innertune.affirmations. Every drawing, line and note here is
original to Align. The art is drawn in code, the voice is the open-weights
Kokoro model, and the music is synthesised. For the page that posts these
(handle, bio, profile picture, the DM replies), see [PROFILE.md](PROFILE.md).

| Path | What |
| --- | --- |
| `scripts/*.json` | one script per reel |
| `engine.js` | the drawings, captions and pill, rendered in a browser canvas |
| `voice.py` | speaks each scene with Kokoro and reports when every word is said |
| `bed.py` | an original, warm music bed: soft piano broken chords in a major key (I–V–vi–IV and friends), pad and bass, a music-box note per chord, a harp run per scene, a two-note ding for the pill |
| `render.mjs` | script → voice → frames (Playwright Chromium) → MP4 with ffmpeg |
| `glyphs.json` | zodiac and planet symbols as paths (from DejaVu Sans, free licence) |
| `profile/` | profile picture options for the page |
| `../out/affirm/` | renders, covers, captions (git-ignored) |

## Setup (once)

Needs Node 18+, Python 3 and ffmpeg. Run `npm install` in `carousel/` (it
provides Playwright and the fonts), then fetch the voice:

```bash
reels/affirm/setup.sh        # venv + Kokoro model in reels/affirm/.voice (~120 MB)
```

## Render

```bash
node reels/affirm/render.mjs --stills        # contact sheets + covers, ~15 s a reel
node reels/affirm/render.mjs                 # every reel → reels/out/affirm/<id>.mp4
node reels/affirm/render.mjs venus           # by id
node reels/affirm/render.mjs --profile       # profile pictures → reels/affirm/profile/
node reels/affirm/render.mjs --remix         # new music/voice mix onto the existing video (fast)
```

Each reel gives you:

- `<id>.mp4`: full quality, ready to post
- `<id>.web.mp4`: a light 720p copy
- `<id>.cover.jpg`: the grid cover
- `<id>.caption.txt`: the caption, comment line and hashtags

The voice is cached per script, so re-rendering after an art change doesn't
re-synthesise it.

## Script contract

```json
{
  "id": "04-venus",
  "title": "Venus runs your heart",
  "cover": "*Venus* runs your heart",
  "keyword": "VENUS",
  "caption": "your sun sign is who you are. your venus sign is how you need to be loved",
  "hashtags": ["venussign", "astrology", "zodiac", "affirmations", "lovelanguage"],
  "voice": "af_heart",
  "speed": 0.92,
  "scenes": [
    {
      "art": "venus",
      "header": "VENUS RUNS YOUR HEART",
      "opts": { "mirror": true, "mirrorAt": 1 },
      "pause": 0.3,
      "lines": ["Your *sun sign* is who you are.", "But your *Venus sign*", "is how you need to be *loved.*"],
      "labels": [{ "on": "glass", "at": 1, "text": "VENUS · PLANET OF LOVE" }]
    }
  ]
}
```

- **Lines** are what the voice says, one caption at a time (3 to 8 words).
  `*words*` are bold and glow while spoken; an ALL-CAPS word (the keyword)
  turns gold. Spell numbers as words ("seventh"), so the voice and captions match.
- **A scene** is one drawing held across several lines. Each line is a
  *stage*: options like `highlightAt: 2` reveal a part when line 2 starts.
- `header`: small mono caps at the top. `labels`: technical callouts with
  leader lines; `on` names an anchor on the drawing, `at` the line it appears on.
- `pause`: seconds of silence after each sentence (0.5 suits "say it with me").
- The last scene takes `pill` (text) and `pillAt` (the line it appears on).
- `voice`: any Kokoro voice (`af_heart`, `af_bella`, `bf_emma`, `am_michael` …).
- Aim for 90–100 words: about 37 seconds.

### Variants: same reel, different ending

A variant names its base reel and brings its own last scene, so you can test
endings without copying the script:

```json
{
  "id": "02-just-passing-beta",
  "extends": "02-just-passing",
  "cta": "the align beta is open ✦ link in bio",
  "end": [{ "art": "card", "opts": { "face": "Align", "sub": "THE BETA IS OPEN" }, "pill": "JOIN THE BETA · LINK IN BIO", "lines": ["…"] }]
}
```

`end` replaces the base's last scene. `cta` replaces the comment line in the
post caption. Anything else (`caption`, `hashtags`, `voice`) overrides the base.

### Arts

| art | what | opts |
| --- | --- | --- |
| `wheel` | a birth-chart wheel: 12 houses, sign glyphs, Earth at the centre | `highlight` (house), `highlightAt`, `axis` (ASC–DSC line), `axisAt`, `planet` (glyph), `planetSign` (0 = Aries), `planetAt` · anchors `h7` `asc` `dsc` `planet` |
| `figures` | Stardust figures (Align's star-headed people) on a reflecting horizon | `pose`: `apart` (thread between them) · `meet` (holding hands) · `pass` (walking on, a ghost behind) · `orbit` (a star circling one of them) · anchors `thread` `a` `b` `you` `orbit` |
| `card` | a veiled Align card; the veil lifts to show a word | `face`, `sub`, `glyph`, `revealAt`, `veiled` |
| `loop` | a planet tracing its retrograde loop across the stars | anchor `loop` |
| `retro` | the textbook retrograde diagram: two orbits, sight lines, the loop on the far sky | `sightAt`, `pathAt` · anchors `planet` `earth` `path` |
| `eclipse` | a total solar eclipse: the moon slides over, the corona flares | anchors `moon` `sun` |
| `syzygy` | sun, moon and earth on one line, side on | `offline` (moon out of line), `alignAt` · anchors `moon` `line` |
| `venus` | the Venus glyph, halftone rose | `mirror`, `mirrorAt` · anchors `glass` `handle` |
| `cities` | a constellation of cities around a "YOUR CITY?" star, pinging like votes coming in | `cities` (names), `voteAt` |
| `mark` | Stardust's star head in orbit (profile picture) | `r` |

## Voice and astrology rules

The same as the zodiac reels (`reels/SPEC.md`): second person, calm and
warm, astrology reads but never decides, no exclamation marks, no
"manifest", no promising a soulmate. Every fact should hold up. The 7th
house really is opposite the rising sign, retrograde really is an
illusion from two orbits passing, and an eclipse really needs all three in
line. End every reel with a keyword whose DM reply exists in PROFILE.md.

**Align in every reel, lightly.** The wordmark sits small at the top of every
frame, and each script says the name once, in a line that ties the reel's idea
to something the app really does (cards stay veiled until you match, a release
leaves your deck, a match only happens when it's mutual, Venus is read before
the first deal). Say **"the Align app"**, not just "Align": spoken, "Align"
sounds exactly like "a line", and "on Align" gets heard as "on a line".
"Align" lights gold in the captions when it's said.
