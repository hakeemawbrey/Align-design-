# Align World reels

Vertical story reels (1080 × 1920, about 45 s) in the style of block-game
story Shorts: a first-person "In this world, …" story with one strange rule,
told by a blocky avatar in a little toy town, with one bold word on screen at a
time. The format comes from studying @greenbrorants
([study/playbooks/greenbrorants.md](../../study/playbooks/greenbrorants.md)).
Only the format carries over. The characters, towns, story, music and the
Align card are all original and built in code.

The first reel, **Your Card Only Flips If It's Mutual 🃏**: everyone gets a
card at eighteen, face down, and it only flips when it's mutual. He paints a
fake face on his. Everyone aligns with the paint, and nothing flips. At 11:11
he meets a girl at a bus stop whose card is face down too. He scrapes off the
paint, tells her the honest thing, and both cards flip at once.

| Path | What |
| --- | --- |
| `scripts/*.json` | one story per reel: the lines and the shot for each |
| `engine.js` | the world: avatars with decal faces, the street, bedroom, plaza and bus stop, the cards, the shots and the captions (three.js in Chromium) |
| `render.mjs` | script → narration → frames → score → MP4 |
| `score.py` | the original score and effects, mood by mood, ducked under the voice |
| `../out/world/` | renders (git-ignored) |

## Render

Needs Node 18+, Python 3 with numpy, and ffmpeg. One-time setup:
`npm install` in `carousel/` (Playwright, three and the fonts) and
`bash reels/affirm/setup.sh` (the Kokoro voice).

```bash
node reels/world/render.mjs --stills              # one frame per shot → reels/out/world/<id>-stills.jpg
node reels/world/render.mjs                       # every reel → reels/out/world/<id>.mp4 (+ .web.mp4)
node reels/world/render.mjs card-flips --from 20 --to 26   # a slice, for checking one moment
```

A full reel takes about half an hour on a laptop CPU (no GPU needed).

## Script contract

```json
{
  "id": "01-card-flips",
  "title": "Your Card Only Flips If It's Mutual 🃏",
  "caption": "…",
  "voice": "am_puck",
  "speed": 1.08,
  "scenes": [{ "text": "In this world, when you turn eighteen, you get a card.", "shot": "intro" }],
  "end": "come align"
}
```

- One line per scene, 2–4 seconds spoken. The shot cuts on every line, which
  is the pace these Shorts run at.
- `shot` names a function in `SHOTS` in `engine.js` (`intro`, `cardBack`,
  `demoFlip`, `sister`, `friend`, `alone`, `paint`, `crowd`, `noFlip`,
  `turnAway`, `clock`, `busStop`, `girlConfess`, `scrape`, `honest`, `laugh`,
  `bothFlip`). A new story needs new shots. Each one is a pure function of
  time: it places the cast, sets the faces, moves the camera and fires the
  particles.
- Faces: `smile` `grin` `happy` `laugh` `sad` `worried` `shock` `sly` `heart`
  `blush` `shy` `determined` `curious` `down`.
- Words in `ACCENT` (card, flips, align, honest, stars…) show up in gold.
- `voice` is any Kokoro voice; `am_puck` sounds the most like a storyteller.

## Rules

- Title: a stated rule beats a bare noun ("Your Card Only Flips If It's
  Mutual" over "The Card"), with one emoji. The hook is the first line,
  spoken, at frame one.
- Stories are about adults. Align is 18+, so no kid romance, whatever the
  format usually does.
- The Align voice still applies (see `reels/town/README.md`): honest, warm,
  no soulmate promises, no exclamation marks. Astrology reads; it never
  decides.
- Never reuse another creator's characters, lines, avatar look or recurring
  villains. The hero here wears a star beanie, not anything borrowed.
