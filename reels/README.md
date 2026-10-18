# zodiac.exe: endless zodiac advice reels

A generator for short vertical videos in the weirdcore / low-poly 3D style of
@whonagy's "Break the loop 👁". Each reel is about 7 seconds:

1. a liminal low-poly world (a cave lake, the poolrooms, a dreamcore meadow, a checker void…),
2. a holographic figure wrapped in its sign's **Align aura** (Garnet for Scorpio, Ember for Aries…),
3. four-pointed stars with eyes hovering over the scene, watching: the sky, come down to talk to you,
4. a Windows-98 popup titled `<sign>.exe` that types **one line of advice to one zodiac sign**, while one star speaks it,
5. the camera swings to the figure, the sign's glyph pops over its head, the aura surges and its name appears.

A small `align ✦` mark sits at the top (`--no-brand` leaves it out).

Every reel is generated from a seed: the world, its palette, the stars,
the figure's finish, the camera and the soundtrack (an original ambient pad,
music box, typing ticks and pops, synthesized per reel) all come from it. Lines
come from a hand-edited library of relationship and self-improvement advice,
70 per sign (10 of them carrying Align's core messages), and `npm run write` adds more with the Claude API. The same line
never looks the same twice, so the supply doesn't run out.

## Use it

```bash
cd reels
npm install
npm run dev                      # the endless player → http://localhost:5178
npm run render -- --count 12     # 12 finished MP4s + captions in out/, one per sign
npm run check                    # validate the line library
```

### The player (`index.html`)

Deals reel after reel with no end. Pick a sign or "all", relationships, self or
both. Turn the sound on, copy the caption, or record the current reel to a
video file in the browser. Arrow keys skip, space pauses.

### The exporter (`npm run render`)

Renders 1080×1920, 30 fps H.264 + AAC MP4s in headless Chromium, ready to post,
with a `.txt` caption next to each and a `manifest.jsonl` log. A ledger in
`out/ledger.json` makes sure no line repeats until a sign's whole deck is used.
About 90 seconds per reel on a laptop CPU.

| flag | |
| --- | --- |
| `--count 12` | how many reels (default 1) |
| `--forever` | keep going until Ctrl+C (finishes the current reel first) |
| `--sign leo` | only this sign (default: rotate through all 12 in order) |
| `--topic love` / `self` | only relationship or only self-improvement lines |
| `--line "Leo, …" --sign leo` | render one specific line |
| `--world cavelake` | force a world (see `engine/worlds.js` + `engine/worlds-extra.js`) |
| `--handle @you` | a small watermark |
| `--out dir`, `--fps 30`, `--internal 0.5` | output folder, frame rate, 3D render scale |

### New lines (`npm run write`)

```bash
export ANTHROPIC_API_KEY=sk-ant-...
npm run write -- --sign scorpio --n 5 --dry   # look first
npm run write -- --all --n 10                 # then add 10 per sign
```

Claude gets `CONTENT.md` plus the sign's existing lines. Every new line is checked
against the rules and de-duplicated against the whole library before it's added.

## Files

| | |
| --- | --- |
| `CONTENT.md` | the writing rules for lines |
| `ACCOUNT.md` | the account kit: name, bio, posting plan, hashtags, weekly routine |
| `content/<sign>.json` | the line library, 70 per sign (35 love, 35 self) |
| `engine/` | the browser engine: `reel.js` (timeline, camera, post), `worlds*.js`, `actors.js` (figure + aura, stars, glyph), `popup.js`, `audio.js`, `main.js` (player + render hooks) |
| `src/` | Node: `render.mjs`, `write.mjs`, `check.mjs`, `serve.mjs`, `content.mjs` |
| `vendor/`, `fonts/` | three.js r170 and the Poppins / Noto Sans Symbols subsets, vendored so it runs offline |
