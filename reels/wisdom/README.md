# Align Wisdom

An endless stream of spoken advice for one zodiac sign at a time, made in the
Star Talk pixel style. Each sign gets its own colour. A pixel night sky is
painted in that colour, Star Talk's pixel star wears it with the sign's glyph,
and a retro RPG dialogue box types the words in as the voice says them.

Every reel follows the same order: a hook ("Scorpio. The stars have something
to tell you."), three pieces of wisdom, and a send-off ("Keep this one,
Scorpio."). The reel ends on a pixel button that says COME ALIGN · JOIN THE BETA,
and the star's eyes turn to hearts. Then the next sign starts.

You can run it two ways:

| | What | Where |
| --- | --- | --- |
| **Videos** | 1080 × 1920 MP4s (about 20 s), Kokoro voice, chiptune music, ready to post | `render.mjs` |
| **Live player** | a web page that plays forever: signs in turn or one sign on repeat, the browser's voice, WebAudio chiptune | `player.html`, `build-player.mjs` |

Both use the same engine (`engine.js`) and the same words (`bank.mjs`).

## Why it never runs out

`bank.mjs` has twelve lines for each sign, eleven shared lines that fit any
sign, eight hooks and six send-offs. `compose(sign, seed)` picks two lines from
the sign's own list and one more from its remaining lines or the shared list,
then a hook and a send-off. That gives each sign more than sixty thousand
different reels before any repeat. The endless order is every sign in turn
(Aries, Taurus … Pisces), and then the seed goes up by one.

## Setup (once)

Like the other reels: Node 18+, Python 3, ffmpeg, then

```bash
(cd carousel && npm install)     # Playwright, esbuild, the Space Mono font
reels/affirm/setup.sh            # the Kokoro voice, ~120 MB, shared with affirm and difference
```

## Videos

```bash
node reels/wisdom/render.mjs                        # one reel per sign, all twelve
node reels/wisdom/render.mjs --sign scorpio         # one sign
node reels/wisdom/render.mjs --sign leo --seed 7    # a different reel for that sign
node reels/wisdom/render.mjs --count 36 --from 12   # the next 36 in the endless order
node reels/wisdom/render.mjs --forever --jobs 2     # never stops; --from N resumes where it left off
node reels/wisdom/render.mjs --marathon 12          # one long video, twelve signs back to back
node reels/wisdom/render.mjs --stills               # a contact sheet per reel (seconds, no video)
```

Options: `--voice af_heart` (any Kokoro voice), `--speed 0.94`, `--jobs 3`,
`--redo` (render again even if the MP4 exists), `--out <dir>`.

Each reel lands in `reels/out/wisdom/` (git-ignored):

- `<sign>-<seed>.mp4`: full quality, to post
- `<sign>-<seed>.web.mp4`: a light 720p copy (scaled with nearest neighbour, so the pixels stay sharp)
- `<sign>-<seed>.cover.jpg`: the grid cover, the first wisdom page fully typed
- `<sign>-<seed>.caption.txt`: caption, hashtags, and the spoken lines

A reel renders in about 35 s. The voice is cached per reel.

## Live player

```bash
node reels/wisdom/build-player.mjs     # → reels/out/wisdom/player.html, one self-contained file
```

Open that file in a browser and press **PLAY FOREVER**. The controls:

- **ALL** plays every sign in turn. Tap a glyph to stay on that sign: it keeps going with new wisdom each time.
- **PAUSE** (space bar), **NEXT ▸** (right arrow), **VOICE**, **MUSIC**, **FULL SCREEN**, and a voice picker.
- The controls fade after a few seconds, so you can screen-record or stream a clean stage.

The player speaks with the browser's own voices. When a voice reports word
boundaries (most local voices do), the typing follows the voice exactly.
Otherwise the timing is estimated. It remembers where it was in the stream,
so the next visit continues with new reels.

`player.html` in this folder is the development version. It loads the ES
modules directly, so serve `reels/` over HTTP to use it (for example
`npx serve reels`, then open `/wisdom/player.html`).

## The look

| Piece | What |
| --- | --- |
| Sky | painted at 180 × 320 and scaled up 6× with no smoothing: dithered colour bands from ink to the sign's colour, twinkling stars, a shooting star every few seconds, clouds drifting right, three layers of hills scrolling left |
| Planet | a dithered pixel planet in the sign's light colour, with the sign glyph carved into it |
| Title | the sign name in a 5 × 7 pixel font, with a pixel glyph |
| Star | Star Talk's pixel star (`../difference/vendor/films/startalk.js`) in the sign's colour with its glyph badge. It looks surprised at the hook, happy while it talks, looks down at the box while it gives advice, hops as it speaks, and gets heart eyes at the end |
| Dialogue box | a stepped pixel panel with a border in the sign's colour and a name tag (THE STARS ★ SCORPIO). Each word types in while it's said. Words marked `*like this*` get a pixel highlighter. A ▼ blinks when a page is done, and pips show which page you're on |
| Colours | the twelve aura colours from `app/src/data/signs.ts`: Aries Ember, Taurus Honey, Gemini Signal, Cancer Tide, Leo Goldleaf, Virgo Rose Quartz, Libra Orchid, Scorpio Garnet, Sagittarius Amethyst, Capricorn Jade, Aquarius Ion, Pisces Dusk |

## Sound

`score.py` writes an original chiptune bed: a soft square-wave arpeggio, a
triangle bass and a quiet pulse pad. Every sign has its own key (Aries in C,
then up a semitone round the wheel). Earth and water signs lean minor and
slower, fire and air signs are brighter. On top: a tiny blip as each word
types, a two-note chirp per page, and a coin chime on the send-off. The voice
is Kokoro (open weights), the same as the affirmation and difference reels.
Everything is synthesised, so it is safe to post.

## Words

Edit `bank.mjs`. Add a line to a sign's list and it joins the rotation.
`node reels/wisdom/bank.mjs` checks the house rules: no digits, exclamation
marks or hyphens, never "compatibility", "soulmate" or "on Align", every
`*highlight*` closed, and each line short enough to fit the box (about 96
characters with the longest sign name). It also prints the first reels in the
stream.

| Path | What |
| --- | --- |
| `bank.mjs` | the words, `compose(sign, seed)`, the endless `stream()`, `lint()` |
| `engine.js` | the frame engine (canvas), used by both the renderer and the player |
| `render.mjs` | reel → Kokoro voice → frames in Chromium → MP4 |
| `score.py` | the chiptune bed and sound cues |
| `player.js`, `player.html` | the live player |
| `build-player.mjs` | bundles the player into one HTML file |
| `glyphs.js` | the twelve sign glyphs as paths (DejaVu Sans, free licence) |
