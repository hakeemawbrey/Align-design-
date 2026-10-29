# Star Talk build guide for cloud sessions (seasons 8 and 9)

You are building Star Talk episodes: short vertical (1080×1920) pixel-art films rendered from code. The repo is hakeemawbrey/align-design- and the branch is **claude/align-promo-video**; check it out and pull it. Ten other cloud sessions are building other episodes on the same branch at the same time.

## Setup
- git fetch origin claude/align-promo-video && git checkout claude/align-promo-video && git pull
- cd app && npm ci

## Your episodes
Your prompt lists your episodes (folders and numerals).

## Read first
- promo/films/STARTALK9.md (season 8) or STARTALK10.md (season 9), whichever your prompt names: your season's brief, with its format, hook rules, accuracy rules and your episode rows.
- promo/films/STARTALK9.md, section "The hook rules": all seven apply to you.
- promo/films/STARTALK.md and STARTALK3.md: the look and the contract.
- STARTALK5.md and STARTALK6.md: the canon.
- Shared modules (never edit): startalk.js, lesson.js, stlore.js, st5cast.js (drawOphiuchus, drawPluto, drawTwin, drawSaturn and more; read its header), cardfx.js, endcard.js, sky.js.
- Model films: promo/films/st5thirteenth (the most polished structure), st7claws (dialogue), st6aries (a profile), st4venusretro and stghost.

## Shared module
Your prompt says whether you own a shared module (st8cast.js or st9day.js) or must wait for one.

## Every episode
- Folder promo/films/<folder>/ with scenes/index.js, cues.js and lore.json. Copy the structure of the model films.
- Follow its row exactly: length (includes the 4.4 s end card), music, hook, beats, fact and the last line (kept exactly).
- End card: buildEndcard with cta: 'SIGN UP TO VOTE YOUR CITY'.
- Easter eggs:
  - cardFrame({ numeral });
  - drawSeedConstellation(ctx, t, 100), faint, top left;
  - one drawGhostCameo in a new spot, never behind type, recorded in lore.json;
  - plus the season's own egg, if its brief names one.
- **Frame 0 is the thumbnail.** The hook caption and a character mid-action are on screen at t = 0, with no fade from black. Check frame 0 before anything else.
- Accuracy is strict: myths attributed, real astronomy, correct rulers, no invented numbers, no compatibility verdicts. If you are unsure of a fact, leave it out.
- Box lines ≤ 70 characters, each readable ≥ 1.5 s after it finishes typing.
- Pure f(t), with no `document` at module top level. Never say "Align" just before the end card.
- Funny, warm, never mean. The advice is healthy.
- Music: your own key and seed. cues.js sections need a drop and outroAt: DURATION - 4.4.

## Polish loop (at least two passes per episode)
1. node promo/scripts/render.mjs --film=<f> --vertical --sheet --rate=4 --dir=<fresh tmp dir>. Use --rate=2 at 45 s or more.
2. Read sheet.jpg critically and check that:
   - frame 0 works as a thumbnail;
   - there's a pattern interrupt every 3–5 s;
   - no text overflows;
   - every line stays readable;
   - the genre parody or vlog chrome reads at a glance;
   - it's always clear who is talking;
   - the end rhymes with the start;
   - the end card is intact.
3. Fix and render again. Then node promo/scripts/teaser-sound.mjs --film=<f> must run.

## Commit (one per episode)
git add promo/films/<f> && git commit -m "<f>: <one-line summary> (<numeral>, <len> s)" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01WS8NKVEYbYWhwDrzk3ApyU"
then git pull --rebase origin claude/align-promo-video && git push origin HEAD:claude/align-promo-video, retrying on rejection. Never force-push, and commit only your own folders. Don't open a PR.

## Final renders and gallery (after all your episodes are pushed)
For each episode:
- node promo/scripts/render.mjs --film=<f> --vertical --out=promo/out/films/<f>/<f>-m.mp4
- ffmpeg -y -i promo/out/films/<f>/<f>-m.mp4 -c:v libx264 -preset slow -crf 26 -maxrate 3.2M -bufsize 6.4M -vf scale=720:1280 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart <web>/<f>.mp4
  - If the file is over 19.5 MB, re-encode it two-pass with a bitrate that lands it near 18.5 MB.
- ffmpeg -y -ss 3.0 -i <master> -frames:v 1 -vf scale=540:960 -q:v 4 <web>/<f>.jpg
  - Use a frame that shows the hook if 3.0 s doesn't.
- Delete the master and the frames to save disk.

Then publish one private gallery Artifact titled the name your prompt gives:
- declare the `assets` capability;
- upload every mp4 and jpg to its asset store;
- show a 9:16 poster grid that plays each film, with its numeral, title, length and last line.

## Report back (your final message)
For each episode give:
- numeral, folder, length and last line;
- the commit hash;
- the gallery URL and each film's mp4 and jpg asset ids;
- anything you changed from the brief and why, especially any fact you dropped or reworded.

If you hit a usage limit, resume where you left off when it resets: skip finished, pushed episodes.
