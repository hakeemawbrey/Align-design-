# Align story ads

A vertical ad (1080 × 1920, 28 s) in the "toy-figure story" format. It starts
with something you'd never rush, cuts to the thing you do rush, then has the
app fix it, and ends on a bold end card. A small 3D figure acts it out in three
sets (an open house at sunset, a bedroom at 1 am, a rooftop under the moon),
and real Align screens float in front of it.

The format comes from a viral app ad (a 3D figure, floating UI cards, rubber
stamps and a "BET ON YOURSELF"-style end card). The script, figure, sets,
cards and score here are original to Align.

**veiled** — *You'd never buy a house off one photo.*

| Beat | Line | On screen |
| --- | --- | --- |
| hook | You'd never buy a house off one photo. | figure walks past an open house; listing card |
| tour | you tour it twice. you read every page. | checklist ticks · **TOURED TWICE** stamp · *3 WEEKS* |
| person | the person you might fall for? | 1:14 am, on the bed with a phone |
| swipe | one photo. 0.8 seconds. next. | profile cards flicked away · *0.8 SEC* |
| ghost | so you match a face, not a person. | "hey" / "hey" / "wyd" · **UNMATCHED** stamp |
| fix | align fixes that. | the real Align deck pops out of the phone |
| veil | their photo stays veiled. | zoom into the veiled aura photo |
| read | you read who they are first. | pan to bio, push / pull / align, dealbreakers |
| align | align if they're for you. | gold star burst · *+1 ALIGNED* |
| mutual | when it's mutual, | the real "You both aligned" screen |
| lift | the veil lifts. | the real reveal screen, the figure smiles |
| talk | and you already know what to say. | the real chat |
| end | MEET THEM BEFORE YOU SEE THEM. | wordmark · "Get your first deck →" |

| Path | What |
| --- | --- |
| `scripts/veiled.json` | copy and beat timings |
| `engine.js` | figure, sets and overlays (three.js + canvas, in Chromium) |
| `render.mjs` | script → frames → MP4 |
| `score.py` | the original score, cut to the beats (numpy) |
| `assets/*.jpg` | screenshots of the real app (`#deck`, `#match`, `#reveal`, `#chat`) |
| `../out/ad/` | renders (git-ignored) |

## Render

Needs Node 18+, Python 3 with numpy, and ffmpeg. Run `npm install` in
`carousel/` once (Playwright, three and the fonts come from there).

```bash
node reels/ad/render.mjs --stills     # one frame per beat → reels/out/ad/stills/veiled.jpg
node reels/ad/render.mjs              # → reels/out/ad/veiled.mp4 (+ veiled.web.mp4)
```

A full render takes about 10–15 minutes on a laptop CPU (software WebGL).

## Changing it

- **Copy and timing:** edit `scripts/veiled.json`. Each beat's `t` is its
  start in seconds, `accent` is the phrase drawn in rose, and `label` is the
  big number in the top left.
- **App screens:** run the app (`cd app && npm run dev`), open
  `http://localhost:5173/#deck` (or `#match`, `#reveal`, `#chat`) at
  390 × 844 with a 3× device scale, and save over `assets/<name>.jpg`.
- **Posting:** use `caption` and `hashtags` from the script. The score is
  original, so it's safe to post. To use a trending sound instead, turn the
  reel's audio down to 0 in Instagram's editor.
