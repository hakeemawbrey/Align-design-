# Align "How you…" reels

Vertical reels (1080 × 1920, 33–40 s) that tell a short story about *you*
in 3D to explain one love idea through astrology. Each one opens with "This
is how you…" or "This is what happens when…", follows clay characters through
a bedroom, a cafe, a street, a phone screen, an x-ray lab or open space, and
lands on one of Align's ideas.

The format comes from 3D story-explainer shorts (Zack D. Films' style, and
@theoddtilt's *"How you invented the trampoline!"*). It keeps the structure
that makes them work and nothing else:

- **A second-person hook on frame one.** "This is how you found out about your Venus sign."
- **A deadpan narrator, one sentence per shot,** with a hard cut and a whoosh between shots.
- **A small, funny, specific story** (a four-minute voice note answered with "haha"), then the turn to the idea.
- **Cutaways that show the invisible:** an x-ray brain flooding with dopamine, Mercury's backwards loop, the chart wheel with the 7th house lit.
- **Big word-by-word captions:** white with a heavy black outline, the word being said in gold, Align words in pink.

### Version 2: what we borrowed from the Zack D Director skill

The community skill [Anil-matcha/zack-d-films-ai-video-generator](https://github.com/Anil-matcha/zack-d-films-ai-video-generator)
makes these shorts with paid AI image and video models (MuAPI, Veo 3.1). We
didn't use the models. These reels took its craft rules instead:

- **Curiosity loops.** Every line opens a question the next line closes ("So which planet does?" → "*Venus.*").
- **Two shots per sentence:** the scene, then a cutaway or reaction, so no shot runs much past 4 s.
- **Impact beats.** On the key line the camera slams in, shakes and flashes, with a low hit in the score.
- **The look:** glossy polymer-clay materials (clearcoat and sheen), studio reflections, shallow depth of field, and dark studio cutaways for big organs and planets.

No footage, characters, narration, music or look is reused. The characters,
sets and effects are built in code (three.js), the voice is the open-weights
Kokoro model (shared with `../affirm`), and the score and sound effects are
synthesised (`score.py`).

| Reel | Love idea | Zodiac idea | Ends on |
| --- | --- | --- | --- |
| `01-venus-sign` | how you love isn't how they love | Venus sign | read the sky before the face |
| `02-brain-in-love` | the rush (dopamine, heart rate, judgement going quiet) fades | Mars is the spark, Venus is how you want to be loved | it has to be mutual |
| `03-rising-sign` | the first date meets your mask | rising sign vs sun sign | say the honest thing |
| `04-mercury-retrograde` | the text you sent to the wrong person | Mercury retrograde (and why it only *looks* backwards) | say the honest thing |
| `05-your-type` | dating the same person five times | the 7th house | dealbreakers up front |
| `06-moon-sign` | they fix, you hide, nobody feels loved | moon sign = what you need | it has to be mutual |

| Path | What |
| --- | --- |
| `scripts/*.json` | one script per reel |
| `engine.js` | characters, sets, effects, camera and captions (three.js, run in Chromium) |
| `render.mjs` | script → voice → timeline → frames → MP4, plus score and voice mix |
| `score.py` | an original plucked groove in a minor key, and a sound effect on every cut |
| `../out/howyou/` | renders, covers, captions (git-ignored) |

## Setup (once)

Node 18+, Python 3 with numpy, and ffmpeg, then

```bash
(cd carousel && npm ci)      # Playwright, three and the fonts
reels/affirm/setup.sh        # the Kokoro voice, ~120 MB, shared
```

## Render

```bash
node reels/howyou/render.mjs --stills        # one frame per shot as a contact sheet, ~20 s a reel
node reels/howyou/render.mjs                 # every reel → reels/out/howyou/<id>.mp4
node reels/howyou/render.mjs venus moon      # by id
node reels/howyou/render.mjs --jobs 3        # reels rendered at once
```

A reel takes about 15–20 minutes on a CPU (WebGL in software; depth of field and the glossy materials roughly double v1's time). Each gives:

- `<id>.mp4`: full quality, ready to post
- `<id>.web.mp4`: a light 720p copy
- `<id>.cover.jpg`: the frame-one hook
- `<id>.caption.txt`: caption, comment line and hashtags

## Writing one

The script is one sentence per scene. Keep each to about 14 words, so a
shot lasts 2–4 s.

```json
{
  "id": "01-venus-sign",
  "title": "How you found out about your Venus sign",
  "caption": "your sun sign was never the one doing the loving",
  "cta": "comment VENUS and we'll send you yours",
  "hashtags": ["venussign", "astrology"],
  "voice": "am_michael", "speed": 1.08,
  "cast": {
    "you": { "skin": "#e0a77f", "shirt": "#f2b43a", "pants": "#3b3f6b", "hair": "#2a1a14", "style": "short", "sign": "leo" }
  },
  "scenes": [
    { "text": "This is how you found out about your *Venus sign.*", "set": "room", "shot": "push", "focus": "you",
      "cast": [{ "who": "you", "mark": "bed", "pose": "phone", "expr": "smile" }], "fx": ["hearts"], "tag": "venus = how you love", "sfx": "whoosh" }
  ],
  "end": "read the sky before the face"
}
```

`*stars*` mark Align words (shown pink). Add `"b": { … }` to give a sentence a
second shot from word `cut` on (0-based; by default the first word after a
full stop or comma). `b` takes the same fields as a scene and inherits the
set, cast and focus unless it names a new set. `"impact": true` on a scene or
on its `b` makes that shot an impact beat. `tag` is an optional pill at the top.
`end` is the line under the wordmark on the closing card.

| Field | Options |
| --- | --- |
| `set` | `room` · `cafe` · `street` · `space` · `lab` · `phone` · `studio` (dark sweep for cutaways) |
| `mark` | room: `bed` `bedR` `center` `left` `right` `door` · cafe: `seatL` `seatR` · street: `center` `left` `right` `line1`–`line5` · space: `center` `left` `right` · lab: `center` |
| `pose` | `stand` `sit` `phone` `shrug` `wave` `point` `shock` `heart` `think` `float` |
| `expr` | `neutral` `smile` `grin` `shock` `sad` `worried` `smitten` `smug` |
| cast extras | `look: "<who>"` (turn toward them), `xray: "brain" \| "heart" \| "dim"` (lab), `blanket: true` |
| `style` (hair) | `short` `curly` `long` `bun` `bald` |
| `shot` | `wide` `medium` `close` `push` `pull` `orbit` `low` `top` `snap` `slow` (`phone` for the phone set) |
| `focus` | a cast id, `both`, `line`, `center`, `clock`, `horizon` |
| `fx` | `glyph:<sign>[@who]` `planet:<venus\|mars\|moon\|mercury\|sun\|earth>` `hearts` `sparks` `sweat` `tears` `zzz` `question` `exclaim` `wheel` `house7` `retro` `orbits` `rise:<sign>` `clock` `rain` `slowmo` `moonrun` `link` `pull` · studio: `organ:brain` `organ:brain-dim` `organ:heart` `big:<planet>` |
| `screen` (phone) | `{ "name": "Jordan", "msgs": [["me", "text"], ["them", "text"], ["me", "~4:02"]] }`. `~` makes a voice note. The last message pops in. |
| `sfx` | `whoosh` `pop` `boing` `thud` `ding` `swell` `sparkle` `heartbeat` `tick` `rewind` `cut` (b shots' default) |

## Rules for the words

The same as the other Align reels:

- Say **alignment** or **aligned**, never "compatibility".
- Astrology "says" or "reads". It never decides or promises anyone.
- Facts must be true: Mercury only looks like it's going backwards (Earth is
  overtaking it). The moon changes sign about every 2.5 days. A rising sign
  changes about every two hours. Early love really does raise dopamine and
  heart rate, and quiet the brain's judging areas.
- End on one of Align's ideas, said plainly. Never "download".
