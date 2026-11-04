# Next 30 days: build guide for cloud sessions (900 new Star Talk videos)

You are one of 48 cloud sessions building the content for posting days 26–55 (Sun 29 Nov – Mon 28 Dec). Each session
owns one **batch**: a few series' episodes. Build every film, render it at 1080p, put the web copy on its library page,
write its caption, and record it. The main session copies everything to Google Drive and builds the posting plan,
so **you don't touch Drive and you don't publish pages**.

Repo: hakeemawbrey/align-design-, branch **claude/align-promo-video**. 47 other sessions push to the same branch.

## ⚠ CHANGE (4 Nov, from the owner): no card transition, short end card — applies to EVERY film in this batch
1. **No Align card transition.** Remove `cardCuts(CUTS)` from SCENES and `...cardCutCues(CUTS)` from CUES (keep the
   film's own beat transitions and sounds; `cardFrame`, the quiet border, may stay). Nothing else should play a card-back cut.
2. **Short end card (2.4 s instead of 4.4 s).** Import `ENDCARD_SHORT_LEN` from endcard.js and use it wherever you used
   `ENDCARD_LEN`; call `buildEndcard(stage, { start: STORY_END, short: true })` and
   `...endcardCues(STORY_END, { short: true })`. Same "come Align" card, faster bloom, fades to black at 2.4 s.
3. **Lengths:** keep each story exactly as written; the film gets **2.0 s shorter** (a 30 s slate film is now 28 s,
   a 22 s one 20 s). Record the real length in `len`. If your series uses a kit (most do), make the change once in the kit.
4. **Films you already built, rendered or uploaded:** retrofit them the same way (kit edit + `len` − 2), one stills
   check (`--stills=<STORY_END-0.2>,<STORY_END+0.6>,<STORY_END+1.6>,<DURATION-0.05>`) and teaser-sound per film, commit,
   then queue them again as `<f> v2` (`flock /tmp/claude-0/queue.lock sh -c 'echo "<f> v2" >> /tmp/claude-0/queue.txt'`).
   Upload the new web mp4 + poster and **overwrite** that film's entry in your uploads file (new video/poster/len).
   Never delete the old page assets. Do the new films first if you like, but every film must end up in the new style.
5. Also grep your films and kit for hard-coded end-card timings (e.g. `outroAt: DURATION - 4.4`, music outros, Pisces/last-line
   timings written as `DURATION - 4.4`) and change them to `- ENDCARD_SHORT_LEN` (2.4).

## 0. Setup
```bash
git fetch origin claude/align-promo-video && git checkout claude/align-promo-video && git pull
cd app && npm ci && cd ..
```

## 1. Your batch
`promo/library/next30/series.json`: find your batch id (in your first message) under `batches`. Each part gives a
`series` key and the episode range `first`–`last`. The series entry (same file, `series`) gives the name, the account
it posts on (`star_talk` or `star_advice`), whether it's a `post` or a `trial` reel, the id `prefix`, the length and the
library `page`.

The creative brief for every series is in **promo/posting/next-30-days.md**: the premise, the episode titles where
they're already written, and the tone. Where episodes aren't listed, you write them.

**First, write your rows** in `promo/films/next30/<batch>.md` (one line per film: folder, title, length, music
style + key, hook at t = 0, beats, last line). Commit and push that file before building, then stick to it.
- Folder names: `<prefix>e<NN>` with a two-digit episode number, e.g. `nc14e01`, `nt2e17`, `ngwe48`. For Trends Vol. 2
  the 20 formats run in the order the slate lists them, 5 episodes each (episodes 1–5 are format 1, and so on).
- Never reuse a title, topic or last line from an existing film: grep `promo/films/*.md` and
  `promo/library/lib.json` titles before settling a row. Within your batch, every hook and last line is different.
- Keep the arc of your series straight across batches: if you own episodes 13–24, read the other batch's rows file
  when it's pushed (`git pull`) and continue the story; if it isn't there yet, follow the slate.

## 2. Read first
- **promo/films/STARTALK-TRENDS.md, sections "Read first" and "What's different in this batch".** Every rule there
  applies to you, except: commit with plain git (below) and queue renders on your own machine (below).
- promo/films/STARTALK-BUILD.md, sections "Every episode" and "Polish loop", for accuracy, frame 0 and the checks.
- Reference films to read fully before you start: `sxmail1`, `st9aquawork`, `trtellleo` (short formats);
  `st5thirteenth` (explainers); `mlpilot` and promo/films/STARTALK-EPISODES.md (Moonlight Lane; read these if you
  own `ml2`).
- Shared modules are read-only: startalk.js, lesson.js, stlore.js, st5cast.js, cardfx.js, endcard.js, sky.js and the
  Moonlight kit. If your series needs its own helpers (a game-show set, a group-chat UI, a snow globe), put them in a
  module inside your first film's folder, e.g. `promo/films/ngne01/gamekit.js`, and import it from your other films.

## 3. The house rules (non-negotiable)
- **Card first. *Face* last.** **Pisces cries in every film** (happy tears count). Never "Align" in the last 2 s.
- Only real app features: blind mystery cards, tonight's deck, talk cards, dealbreakers, Push / Pull / Align
  readings, the founding card. Ties-ins are light and optional.
- No season numbers on screen. The series name is the bug (top-left, Inter 800 small caps, letter-spaced).
- No real brands, apps, platforms, songs, shows, teams, businesses or people. Cities and neighbourhoods are fine.
- No invented statistics. Real astronomy only where it's true; astrology is framed as a lens, never science. Check
  any sky date (season changes, the solstice) against an ephemeris or leave the date off.
- No disaster or flood jokes, no weapons, no explosions, nothing sexual, no drinking jokes.
- Advice is warm and healthy: honesty, boundaries, kindness. Never controlling, testing, tracking or jealousy games.
  The joke is on the situation, never on a sign.
- Lengths include the **2.4 s short** end card (endcard.js `short: true`, default CTA; see the CHANGE section). Frame 0 is the thumbnail: hook caption and a
  character mid-action at t = 0.
- **Trial reels** are shown to people who don't follow yet: the first second must make sense on its own.

## 4. Build each film
Folder `promo/films/<f>/` with `scenes/index.js`, `cues.js` (and `lore.json` if your reference uses one). Build order:
finish, check, commit and queue each film before starting the next.

**Check:** at most two sheets per film: `node promo/scripts/render.mjs --film=<f> --vertical --sheet --rate=2
--dir=<fresh tmp dir>`, fix, then a final `--rate=4`. Use `--stills=<t1>,<t2>` for spot checks. **Never run
render.mjs with `--help`**: it starts a full render. `node promo/scripts/teaser-sound.mjs --film=<f>` must run.

**Commit (one per film):**
```bash
git add promo/films/<f> && git commit -m "Next 30: <series name>: <title> (<len> s)" -m "<your attribution lines>"
git pull --rebase origin claude/align-promo-video && git push origin HEAD:claude/align-promo-video   # retry on rejection
```
Never force-push, never commit another session's folders.

## 5. Render (start after your first film is committed)
```bash
bash promo/scripts/farm/setup.sh /dev/null                     # installs the pipeline, empty queue
LINGER=7200 nohup /tmp/claude-0/workers.sh 1 3 > /dev/null 2>&1 &
# after each film is committed:
flock /tmp/claude-0/queue.lock sh -c 'echo "<f> v1" >> /tmp/claude-0/queue.txt'
```
Each film becomes `promo/out/web/<f>.mp4` (720p web copy) and `promo/out/web/posters/<f>.jpg`, with the 1080p
`promo/out/films/<f>/align-<f>-v1-send.mp4`. Progress is in `/tmp/claude-0/workers.log`. Don't run more than 3 slots.
If the workers exit (the 7200 s linger runs out while you're still building), start them again the same way.

**Moonlight Lane teasers (`ml2` batches only):** for each of your 5 episodes, cut 3 teasers of 15–25 s from the
1080p send mp4 (a hook moment, a turn, the question before THE STARS' advice; never the ending) and add the episode's
last 2.4 s (short) end card. Name them `nmte<NN>` in episode order (batch 1: 01–15, batch 2: 16–30), make the web copy and
poster the same way the worker does (`/tmp/claude-0/webenc.sh` shows the ffmpeg settings), and treat them as films
for the upload step.

## 6. Upload and record (every ~8 finished films, and at the end)
1. `Artifact` action `read` your page once (url in `promo/library/pages.json`, page number from series.json).
2. `Artifact` publish with `url` = the page, `asset: true`, `file_paths` = the web mp4s and posters (≤ 20 per call).
   Never publish the page itself, never delete assets.
3. Record each film in `promo/library/uploads/n30-<batch>.json` (merge, don't overwrite):
   ```json
   {"<f>": {"video": "/_blob/…", "poster": "/_blob/…", "title": "…", "len": 30, "series": "<series key>",
            "episode": 1, "caption": "…"}}
   ```
   The caption follows **promo/posting/CAPTIONS.md** in the voice of your series' account and kind (star_talk post,
   star_advice post or star_advice trial). No hashtags, no emoji.
4. Delete the uploaded web mp4 and poster to save disk. **Keep the 1080p send mp4s** until the end of your batch,
   then delete them too (the main session copies the web copies to Drive).
5. Commit only that uploads file: `git add promo/library/uploads/n30-<batch>.json`, commit
   "Next 30 uploads: <batch> (+<k> films)", pull --rebase, push.

If an upload says the page's storage is full, stop uploading to that page and say so in your report.

## 7. Finish
When every film in your batch is built, rendered, uploaded and recorded, report: each film's folder, title, length
and last line; anything you changed from the slate and why (especially facts you dropped); and any film that failed.
If you hit a usage limit, resume where you left off when it resets: skip films that are already pushed and recorded.
