# OG social cut: production farm (one batch per cloud session)

You are one worker reworking the ORIGINAL Star Talk / Star Advice films for Instagram. The owner loves these stories:
keep each film's own characters, sets, art and story. Your batch is a JSON file in `promo/posting/og/batches/` (your
prompt names it): ten films, each with `id`, `account` (star_talk or star_advice), `series`, `title`, `old_caption`.
Work on branch `claude/align-promo-video`.

## 0. Setup (once)
```bash
cd <repo> && git fetch origin claude/align-promo-video && git checkout claude/align-promo-video && git pull --rebase
fc-list | grep -qi inter || echo 'FONTS MISSING: stop and report'   # EB Garamond / Space Mono are not installed anywhere; that is expected. Do not install fonts.
python3 promo/scripts/farm/gdrive.py folder "Star Talk/OG Social Cut/<account>"   # prints the Drive folder id (one per account)
```
Drive credentials are environment variables; never print them.

## 1. Rework each film
Read `promo/films/OG-REWORK.md` (all of it) and follow it exactly. Look at the approved reworks first:
`promo/films/og-kzce01`, `og-st4anniversary`, `og-guideair`, `og-sr01blind`, `og-nthe01`, `og-kpjue01`, `og-trtellleo`,
`og-ngwe01`, `og-kfae01` (diff each against its original to see exactly what changed). In short: `cp -r` the film to
`promo/films/og-<id>/`; add a static HOOK (alternate `outline` / `box` through your batch); remove the film's own
animated title, series header labels, corner logos, episode/season/part numbers and in-scene CTAs; push every sign's
personality to the extreme; keep the story and its last beat. Never edit the original folder or shared kits.
Check stills as OG-REWORK.md says (frame 0, 1.5, 4–5 story times, last second) and fix anything before rendering.

`caption.txt`: start from `old_caption`, tighten it to match the new hook: 2–3 short sentences, then a question or a
"send this to…" line. No hashtags, no emoji, no links, no invented stats, ≤ 300 characters.

## 2. Render (one at a time; write the next film while one renders)
```bash
OUT=/tmp/ogout; mkdir -p $OUT
node promo/scripts/teaser-sound.mjs --film=og-<id> --social --calm
node promo/scripts/render.mjs --film=og-<id> --vertical --social --calm --out=$OUT/og-<id>.mp4   # writes og-<id>-share.mp4 too
rm -f "$OUT/og-<id>.mp4"; rm -rf "promo/out/frames/og-<id>"          # frames are ~1.5 GB per film: always clear
```
Check the share file: `ffprobe` duration is sane (not 0, not cut mid-story), and look at 3 frames
(`ffmpeg -ss <t> -frames:v 1`): hook on frame 0, story mid-way, a story beat at the end. Run long renders in the
background. Never run two renders at once.

## 3. Upload and record
```bash
python3 promo/scripts/farm/gdrive.py upload <folder id> $OUT/og-<id>-share.mp4 "<plain hook> (og-<id>).mp4"   # prints the share link
```
Write `promo/posting/og/done/og-<id>.json`:
`{ "id": "og-<id>", "orig": "<id>", "account", "series", "title": "<plain hook, no asterisks or |>", "caption": "<caption.txt>",
"drive_file": "Star Talk/OG Social Cut/<account>/<name>", "drive_link": "<link>", "duration": <seconds> }`
then delete the local share file.

## 4. Commit after every film
`git add promo/films/og-<id> promo/posting/og/done/og-<id>.json` (only these), commit, `git pull --rebase`, push;
retry on rejection (many workers push to this branch; never force-push, never touch other files). Commit messages end
with the attribution lines given in your session.

Do not post anything to any social account, do not contact anyone, do not edit the guides, kits or other films. If a
film cannot be reworked (missing folder, render crash you can't fix), skip it and say so in your final message with the
reason. If something blocks you (for example a Drive error), finish what you can and say exactly what is blocked.
