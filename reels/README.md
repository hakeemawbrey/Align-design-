# Align Gradient Reels

Gradient-background zodiac meme posts (boomer-Facebook-post style) for the
Align waitlist (comealign.com) on Instagram, 1080×1920.

This replaces the local `align-gradient-reels` folder (`render.py`, ffmpeg and a
`localhost:4319` review server that only ran on one Mac). Everything now runs in
the browser, so it works from any computer or phone:

- **Published page:** https://claude.ai/artifact/NhdFZcLbWcY586Du52KdVB
  (private until you share it from the page's Share menu)
- **Source:** `reels/index.html`, one self-contained file

## What it does

| | Before (local) | Now (cloud) |
| --- | --- | --- |
| Rendering | ffmpeg on the Mac | canvas in the browser, same palettes and diagonals |
| Review queue | `review-state.json` on disk | shared cloud queue, live on every device |
| New captions | headless `claude -p` if installed | Claude Opus 5.5, streamed in as cards |
| Inspo | copied colors, `claude -p` read the file | upload a screenshot; Claude copies its voice, the page copies its colors |
| Output | PNG, or mp4 via `--video` | PNG download, or an animated video recorded in the browser (MP4 where the browser supports it, WebM elsewhere) |
| Week plan | `post_plan.txt` per day folder | Week plan tab: 3 approved posts a day for 7 days, copy buttons, and `post_plan.txt` download |

Also new: edit the on-image text and caption in place, pick or flip the
gradient, toggle Instagram's safe zones to keep text clear of the UI overlay,
keyboard review in the full-size view (A approve, R reject, ← →), a Posted tab,
and your own custom lines.

## Editing the caption library

The built-in library (9 genres × 12 lines) is the JSON in
`<script type="application/json" id="bank">` inside `index.html`, keyed by
genre as `[sign, text]` pairs. Genre voices, palettes and Instagram caption
templates are in the `MODES` table in the script.

## Opening the file directly

Opened outside claude.ai (say, double-clicked from the repo), the page still
renders, reviews and downloads. The queue is then saved in that browser only, and
Claude writing is off, because both come from the claude.ai viewer.

## Posting strategy

- 2–4 posts a day, hours apart. Instagram throttles accounts that dump posts.
- Captions aren't clickable: comealign.com goes in the bio, the pinned first
  comment (copy button on every post), and optionally the image (CTA and
  watermark toggles).
- Add a trending sound in the Instagram app. It performs better than baked-in audio.
