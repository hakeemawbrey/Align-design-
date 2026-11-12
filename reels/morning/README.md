# Align Morning reels

Vertical reels (1080 × 1920, ~38 s) in the style of 3D-CG "every type on a
winter morning" ranking reels. The twelve signs live in a snowy dollhouse
apartment, one room each, as little round sign-children: Align's star-headed
walker, coloured by element, with the sign's glyph on its belly. The reel opens
on the whole building with the question. Then the camera flies room to room,
counting down from the last sign out of bed (#12) to the first (#1). Each room
gets a rank pill, a big outlined line and a smaller follow-up line. It ends by
pulling back to the building with a "send this to…" card and
COME ALIGN · JOIN THE BETA.

Every model, line and note is original to Align. The building and characters
are built in code (three.js), and the music is synthesized by the Signs score
generator (`reels/signs/score.py`, music-box style by default).

| Path | What |
| --- | --- |
| `scripts/*.json` | one script per reel |
| `engine.js` | the building, rooms, poses, camera and text (three.js in Chromium) |
| `render.mjs` | script → frames → MP4 with ffmpeg, plus `.web.mp4` and a caption `.txt` |
| `../out/morning/` | renders (git-ignored) |

## Render

Needs Node 18+, Python 3 with numpy, and ffmpeg. Run `npm install` in
`carousel/` once (Playwright, three and the fonts come from there).

```bash
node reels/morning/render.mjs --stills     # contact sheet → reels/out/morning/stills/  (~20 s)
node reels/morning/render.mjs              # every reel → reels/out/morning/<id>.mp4
node reels/morning/render.mjs winter       # by id
```

## Script contract

```json
{
  "id": "01-winter-morning",
  "title": ["winter morning.", "which sign gets out of bed first?"],
  "music": "musicbox",
  "seed": 4,
  "caption": "…", "hashtags": ["zodiac", "astrology"],
  "beats": [
    { "sign": "taurus", "pose": "burrito", "line": "the duvet is load-bearing.", "sub": "not moving. not discussing it." }
  ],
  "end": ["send this to your", "five-more-minutes friend"],
  "endSub": "come align · join the beta"
}
```

- **12 beats**, last place first. Beat 1 gets #12 and the top-left room; the
  camera snakes down the building, so #1 is on the ground floor.
- `pose` sets the room and the animation:

| Pose | What happens |
| --- | --- |
| `burrito` | rolled up in the duvet, wiggling, zzz |
| `hide` | a breathing duvet lump with the star poking out and a dream bubble |
| `peek` | dark room, only two eyes under the covers, looking around |
| `snooze` | alarm clock rings, an arm reaches out, back to sleep |
| `phone` | lying down, phone glowing above their face |
| `mirror` | up, at the standing mirror, fixing their hair |
| `sit` | sitting up half-asleep, thought bubble with two odd socks |
| `window` | standing at the window with a mug, watching the snow |
| `jump` | bouncing in the middle of the room, calendar says SAT |
| `make` | bed already made, fluffing the pillow, sparkles |
| `desk` | headset on, at the laptop |
| `wake` | someone else is asleep; they bring tea, the sleeper wakes, hearts |

- `line` max ~28 characters (it shrinks to fit), `sub` max ~45.
- `music`: any style from `reels/signs/score.py` (`musicbox`, `lofi`, `piano`, …).
  `seed` picks the key and melody.
