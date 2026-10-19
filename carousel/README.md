# Align carousels

Instagram carousels about dating through the zodiac, in the format of
@indig0.lin's "what a life" post: one sentence told a few words at a time in
huge heavy italic lowercase. By default the slides are just text, in the
sign's own colour on near-black; `--style photo` puts warm-white text over
moody glowing art instead, like the reference. The advice
is blunt; Align's ideas (read the sky before the face, it has to be mutual,
say the honest thing, release don't ghost, a new deal at 11:11) are slipped
in, never sold.

`SPEC.md` is the house format: voice, slide rules, backgrounds and the JSON
contract. Read it before writing or changing anything here.

## What's here

| Path | What |
| --- | --- |
| `content/01…12-*.json` | 12 hand-written carousels, one per sign |
| `examples/<id>/` | those 12 rendered: `01.jpg…` slides (1080 × 1350), `caption.txt`, `contact.jpg` |
| `content/generated/` | machine-made carousels and `calendar.csv`, a 30-day posting plan |
| `src/render.mjs` | JSON → slides, caption, contact sheet, and an `index.html` review gallery |
| `src/generate.mjs` | makes new carousels in bulk (two engines, below) |
| `src/check.mjs` | validates every carousel against the spec |

## Carousel Studio (the app)

`app/` is a one-page web app for making carousels without a terminal: pick a
sign and a theme, press **Remix** (the phrase bank, instant and free) or
**Write with Claude** (fresh copy on the viewer's Claude account), edit any
line, choose bottom or centred text and sign colour or white, then download
the slides as a .zip and copy the caption. It is published as an artifact at
https://claude.ai/artifact/1GYehk8ubUTPWRAuz1HrAC (private until shared from
the page's Share menu).

`npm run studio` rebuilds `app/dist/studio.html` from `app/studio.template.html`,
baking in the current phrase bank and the 12 examples. Rebuild and republish
after changing the bank or the examples.

## Set up

```bash
cd carousel
npm install
```

Rendering uses Playwright's Chromium. If Playwright can't find its own build,
`render.mjs` falls back to any `chromium-*` under `PLAYWRIGHT_BROWSERS_PATH`
(or run `npx playwright install chromium` once on your machine).

## Render

```bash
node src/render.mjs                         # everything in content/ (and content/generated/)
node src/render.mjs content/03-aries-chase.json
node src/render.mjs --only 12-pisces-face-last --format png
node src/render.mjs --style photo           # text over art instead of text only
```

Output goes to `out/` (git-ignored). Open `out/index.html` to review every
carousel at once, then upload `out/<id>/01.jpg…` in order and paste
`caption.txt`.

## Generate in bulk

Two engines behind one command. Every carousel either engine makes passes
`validate()`, gets backgrounds picked by the spec's rules (the sign's own art
held for a few slides with a slow push-in, neon in the sign's element colour at
the turn, a veiled face when the words are about looks, a moonlit sky for
11:11 and night lines), and is saved to `content/generated/`.

**The bank engine (offline, free, default).** Remixes a hand-written phrase
bank: true traits for each sign, ~22 themes (chasing, ghosting, situationships,
testing, over-explaining, the ex, love-bombing…), sentence shapes and subtle
Align closers. Deterministic: the same seed always gives the same carousel.

```bash
node src/generate.mjs --list-themes
node src/generate.mjs --sign all --count 12 --render      # one per sign, rendered
node src/generate.mjs --sign scorpio --theme ghosting --seed 42
node src/generate.mjs --calendar 30 --render              # a month, no sign/theme repeats
```

**The AI engine (Claude).** Writes fresh copy with Claude, using `SPEC.md` and
the 12 hand-written carousels as its brief and examples, then checks the result
and asks for one repair if anything breaks the rules.

```bash
export ANTHROPIC_API_KEY=sk-ant-...
node src/generate.mjs --engine ai --sign leo --count 3 --render
node src/generate.mjs --engine ai --calendar 30           # a month of fresh copy
node src/generate.mjs --engine ai --model claude-opus-5-5 # cheaper model
```

The default model is the most capable Claude model; set `--model` or
`ALIGN_MODEL` to change it.

Always read generated copy before posting. The bank is safe but can repeat
itself over months; the AI engine is fresher but should be edited like any
first draft. When a generated carousel is good, move it into `content/` and
give it a number.

## Writing one by hand

Copy any file in `content/`, change the `id` (and filename), write the
sentence across 6–9 slides of 1–6 words, then:

```bash
node src/check.mjs && node src/render.mjs --only <id>
```
