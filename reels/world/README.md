# Align World reels

Vertical story reels (1080 × 1920, about 45 s) in the style of block-game
story Shorts: a first-person "In this world, …" story with one strange rule,
told by a blocky avatar in a little toy town, with one bold word on screen at a
time. The format comes from studying @greenbrorants
([study/playbooks/greenbrorants.md](../../study/playbooks/greenbrorants.md)).
Only the format carries over. The characters, towns, story, music and the
Align card are all original and built in code.

**The series: one sign per reel, all twelve in turn.** Each story stars one
sign as the main character, with a piece of signature gear that drives the
plot (`zodiac.js` lists all twelve). The rule escalates until something goes
wildly wrong. Then the twist turns the rule back on the hero, and the ending
lands on an Align idea.

| # | Sign | Story |
| --- | --- | --- |
| 1 | Scorpio | **If You Lie To A Scorpio, Their Tail Glows Red 🦂**. Her tail lights up at every lie on every date, until it turns the whole diner red and the fire department hoses her down. She quits and tells her mom she doesn't need anyone, and the tail goes red at *her*. On the next date she says the honest thing first. He laughs and stands up, and he has a tail too. Neither one glows all night. |
| – | Leo (pilot) | *Your Card Only Flips If It's Mutual 🃏*: the first test of the engine, kept as a reference. |

| Path | What |
| --- | --- |
| `scripts/*.json` | one story per reel: each line, its shot, its music mood and its sound effects |
| `engine.js` | the shared world: avatars with decal faces, the street, bedroom, plaza and bus stop, the cards, particles, captions, the sign tag and screen effects (three.js in Chromium) |
| `zodiac.js` | the twelve signs as characters (glyphs, colours, gear such as Scorpio's tail), the diner, props |
| `stories/<id>.js` | one story's cast and shots |
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
  "id": "02-scorpio-tail",
  "story": "02-scorpio-tail",
  "sign": "scorpio",
  "title": "If You Lie To A Scorpio, Their Tail Glows Red 🦂",
  "voice": "af_bella",
  "speed": 1.1,
  "accent": ["scorpio", "tail", "red", "honest"],
  "scenes": [{ "text": "My first date said he loves hiking.", "shot": "date1", "mood": "sneaky", "sfx": ["alarm@w3"] }],
  "end": "come align",
  "endSub": "SCORPIO · 1 OF 12"
}
```

- One line per scene, 2–4 seconds spoken. The shot cuts on every line, which
  is the pace these Shorts run at.
- `shot` names a function in the story's `SHOTS` (`stories/<story>.js`).
  Each one is a pure function of time `(t, d, endHold, T, wordTimes)`: it
  places the cast, sets the faces, moves the camera, fires the particles, and
  can ask for a red flash (`fx.tint`), a shake (`fx.shake`) or the sign tag
  (`fx.label`). `wordTimes` lets a beat land exactly on a word.
- `mood` picks the music for that line: `bright` `sneaky` `sad` `night`
  `warm` `lift` `chaos` `hit` (near silence, for a punchline).
- `sfx`: `alarm` `crash` `siren` `water` `buzz` `dun` `pop` `sparkle`
  `chime` `whoosh`. `@w3` lands on the line's 4th word, `@0.5` halfway
  through, and no suffix lands on the cut.
- Faces: `smile` `grin` `happy` `laugh` `sad` `worried` `shock` `sly` `heart`
  `blush` `shy` `determined` `curious` `down`.
- Words in `accent` show up in gold.
- `voice` is any Kokoro voice: `af_bella` for her, `am_puck` for him.

## Rules

- One sign is the hero, named in the first two lines, with its gear on
  screen in the first three seconds and its glyph on the chest.
- Escalate. Every beat makes the rule's cost bigger (a lie, a bigger lie, the
  whole room, the fire department), then the rule turns on the hero.
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
