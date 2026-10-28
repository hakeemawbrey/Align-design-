# Align Gradient Reels

Gradient-background text meme posts (boomer-Facebook-post style) for promoting
the Align waitlist (comealign.com) on Instagram. Output is 1080x1920 **still
PNGs by default** — post as a reel/story/photo and add trending audio in the
IG app. Pass `--video` for animated-gradient mp4s instead. Images are clean
(text only) — the comealign.com promo lives in the caption + pinned first
comment. Pass `--watermark` / `--cta` if you want it on the image.

## Quick start

```bash
cd reels        # from the root of this repo

python3 render.py --all --cta                  # the full 72-caption library
python3 render.py --batch 21 --days 7 --cta    # a week: 3 posts/day + post plans
python3 render.py --mode delu --sign pisces    # one specific post
python3 render.py --mode brainrot --all-signs  # one mode, all 12 signs
python3 render.py --text "your custom line" --mode dating
python3 render.py --mode delu --sign leo --video   # mp4 instead of png

python3 review/server.py                       # approval GUI → localhost:4319
```

## Running it in the cloud

Nothing here needs your Mac anymore. It runs anywhere with Python 3 and ffmpeg.

- **Fonts:** it uses Arial Rounded Bold when the Mac has it, and otherwise the
  bundled `fonts/Nunito-Black.ttf`, the closest free rounded font (SIL Open
  Font License, see `fonts/OFL.txt`). Set `REELS_FONT` to use another file.
- **Captions by Claude:** Generate (with one sign picked), More like this and
  Inspo use **Claude Opus 5.5**. With `ANTHROPIC_API_KEY` set, the dashboard
  calls the API (`pip install -r requirements.txt` first). Without it, it uses
  the `claude` command like before, which works on a signed-in Mac and in a
  Claude Code cloud session. `REELS_MODEL` picks a different model.
- **In a Claude Code cloud session:** just ask, e.g. "render a week batch in
  reels/ and send me the images". The session has ffmpeg and `claude` already.
- **As a hosted dashboard you open from your phone:** deploy the `Dockerfile`
  to a container host such as Render, Railway or Fly.io, with:
  - a persistent disk mounted at `/data`, where renders and approvals are saved
  - `REVIEW_PASSWORD`, so the dashboard asks for a password (any username)
  - `ANTHROPIC_API_KEY`, for Claude-written captions

| Setting | Default | What it does |
|---|---|---|
| `HOST` / `PORT` | `127.0.0.1` / `4319` | where the dashboard listens (Docker uses `0.0.0.0`) |
| `REVIEW_PASSWORD` | none | require a password for the dashboard |
| `REELS_DATA` | this folder | where `out/`, `approved/` and the review state live |
| `ANTHROPIC_API_KEY` | none | write captions through the API instead of the `claude` CLI |
| `REELS_MODEL` | `claude-opus-5-5` | model for captions |
| `REELS_FONT`, `REELS_FONT_WM` | Arial Rounded, else Nunito | font files for the post text and the watermark |

## Review / approval GUI

`review/server.py` serves a dashboard on **http://localhost:4319**: pick a
genre in the header and hit **⚡ Generate 12** to render that mode's captions
(clicking again makes fresh variants with new gradients). Every render in
`out/` shows as a card with an editable IG caption and Approve / Reject
buttons. Approving copies the file + a caption/first-comment `.txt` sidecar
into `approved/` — that folder is the upload queue. Decisions persist in
`review-state.json`; Undo available on the approved/rejected tabs.

Batch output lands in `out/batch_<date>/day1..7/`, each day with its reels plus
`post_plan.txt` containing the paste-ready IG caption, hashtags, and the pinned
first comment (that's where the comealign.com link goes).

## The modes

| mode | vibe | gradient |
|---|---|---|
| brainrot | unhinged gen-alpha absurdity | acid purple/green/cyan |
| delu | delusional first-person confidence | hot pink/lilac |
| nonsense | surreal deadpan "facts" | orange/teal/yellow |
| spiritual | cosmic woo-woo affirmations | deep purple/gold |
| dating | love advice / crying for help as a sign | red/rose/violet |
| houston | oddly Houston-specific callouts (610, Katy, H-E-B, the rodeo, the humidity) | Astros navy/orange, Gulf teal |
| random | general zodiac chaos, not sign-specific | random palette |

Caption banks live in `captions/*.json` — edit freely, or ask Claude:
"write 20 more brainrot captions" / "make a villain-era mode".

## Music

Default renders are **silent on purpose**: add a trending sound inside the
Instagram app when posting — reels with trending audio get pushed far harder
than reels with baked-in files. If you want baked-in audio anyway, drop mp3s
into `music/` and pass `--music`.

## Learning from examples (inspo/)

Drop screen-recordings or screenshots of gradient reels you like into `inspo/`
and tell Claude: "study inspo/ and make Align versions." For reels you only
have a URL for, use `/remix <url>` — it downloads, transcribes, and scripts a
zodiac version.

## Posting strategy (read this, it matters)

- **Pace: 2–4 reels/day, spaced hours apart.** Instagram throttles accounts
  that dump posts; 3/day for a week beats 10/day for two days.
- **Link discipline:** captions aren't clickable. comealign.com goes in your
  bio, the watermark, and the pinned first comment (`post_plan.txt` has it).
- **Trending audio in-app**, always.
- **Auto-posting:** Instagram only allows scheduled/API posting via a
  Business/Creator account — easiest paths are Meta Business Suite (free,
  schedules a week ahead) or Later/Buffer/Metricool. Upload a day-folder,
  paste from `post_plan.txt`, schedule, done — ~10 min per week.
- **Daily fresh batch:** ask Claude Code to "schedule a daily task that renders
  3 fresh reels every morning" and it'll be waiting in `out/` each day.
