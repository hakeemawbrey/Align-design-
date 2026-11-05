# Month 2 boost: build guide for cloud sessions (900 more Star Talk videos)

You are one of 48 cloud sessions building the Month 2 boost: 900 new videos that double the posting for days 26–55
(Sun 29 Nov – Mon 28 Dec). Each session owns one **batch**. Build every film, render it, put the web copy on its
library page, write its caption and record it. The main session copies everything to Google Drive and builds the
posting plan, so **you don't touch Drive and you don't publish pages**.

Repo: hakeemawbrey/align-design-, branch **claude/align-promo-video**. 48 other sessions push to the same branch.
The creative brief is **promo/posting/month2-boost.md**: read it fully first.

## 0. Setup
```bash
git fetch origin claude/align-promo-video && git checkout claude/align-promo-video && git pull
cd app && npm ci && cd ..
```

## 1. Your batch
In `promo/library/month2/series.json`, find your batch id (in your first message) under `batches`. Each part gives a
`series` key and an episode range `first`–`last`. The series entry gives the following:
- the name, the account (`star_talk` or `star_advice`), the `kind` (post or trial) and the id `prefix`;
- the library `page`;
- `long`: **the last `long` episodes of the series are long (1 min+)**, the rest are short;
- `short_len` and `long_len`;
- for the Part 2 series (key starts with `x`), `old`: the series whose characters, look and tone you continue.

**First, write your rows** in `promo/films/month2/<batch>.md`, one line per film:
- folder, title, short or long, length;
- music style and key;
- **the frame-0 visual hook and the hook line (7 words max)**;
- the beats, the ending (hard cut or loop) and the last line.

Commit and push that file before building, then stick to it.
- **Folder names:** `<prefix>e<NN>` with a two-digit episode number, e.g. `kdwe01`, `kxthe08`.
- **No reused material:** never reuse a title, topic or last line from an existing film. Grep `promo/films/*.md`,
  `promo/films/next30/*.md` and the titles in `promo/library/uploads/*.json` before settling a row. Within your
  batch, every hook and last line is different.
- **Long new episodes of old series (Part 2):** read 2–3 of the old films fully first (the `old` field names them),
  and reuse their kit modules by importing them (read-only). These are new stories, not re-edits.
- **12-sign formats:** cover every sign fairly; the joke is on the situation, never on a sign.

## 2. What's different in this batch (the owner's rules)
1. **No end card and no card transition, at all.**
   - Don't import endcard.js or cardfx.js (no `buildEndcard`, `cardCuts` or `cardFrame`).
   - No Align logo, wordmark, seed-of-life mark or CTA, and the word "Align" never appears on screen.
   - `DURATION` is the story length; nothing is added after it.
2. **Endings:**
   - **Hard cut:** the punchline lands and holds about 0.6–1.0 s, then the last frame is the last story frame. No
     fade to black.
   - **Loop:** the last 0.3–0.5 s eases back into exactly the frame-0 composition, so a replay is seamless. Use the
     kit's loop helper.
3. **Frame 0 is the thumbnail and the hook:** something is already mid-action (mid-crash, mid-zoom, mid-scream), and
   the hook line is on screen. In the first second there's a pattern break (whip zoom, record scratch, freeze frame,
   colour flash, sudden silence). By second 3 the relatable premise has landed. Trial reels must make sense to
   someone who has never seen the account.
4. **Long videos (1–2 min):**
   - The first second is as crazy as a short one.
   - A payoff is promised up front ("wait for the verdict", "the ending, though").
   - Chapter stickers (from the kit).
   - A new beat, reveal or gag every 8–10 s, and nothing static for more than 3 s.
   - A real ending that pays off the promise.
5. **Super relatable:** each film names a feeling people actually have about dating, texting, being single,
   breakups, crushes, friends or their sign.

## 3. House rules (non-negotiable)
- **Pisces cries in every film** (happy tears count).
- **Only real app features**, and only as optional story props: blind mystery cards, tonight's deck, talk cards,
  dealbreakers, Push / Pull / Align readings, the founding card. Show them as objects, never as an ad, and never
  print the brand name.
- **No season numbers on screen.** The series name is the bug (top-left, Inter 800 small caps, letter-spaced).
- **No real brands, apps, platforms, songs, shows, teams, businesses or people.** Fictional apps and products are
  fine (Fake Ad, Bio Glow-Up): invent neutral names. Cities and neighbourhoods are fine.
- **No invented statistics.** Joke scores like "10/10" are fine; survey-style numbers are not. Real astronomy only
  where it's true; astrology is framed as a lens, never science.
- **Nothing off-limits:** no disaster or flood jokes, no weapons, no explosions (use "went flying", "crashed",
  "glitched"), nothing sexual, no drinking jokes.
- **Advice is warm and healthy:** honesty, boundaries, kindness. Never controlling, testing, tracking or jealousy
  games. Hot Seat and Lie Detector questions tease, never shame.

## 4. The hook kit: `promo/films/hookkit.js`
A dedicated session builds it right now. **Write your rows first.** Then wait until `promo/films/hookkit.READY`
exists on origin before building your first film. Poll with `git pull` every 3 minutes.
- **The header** of hookkit.js documents every effect (whip zoom, record scratch / freeze, slam title, shake,
  "caught" circle, incoming call, notification drop, loading bar, countdown, news ticker, game HUD and achievement
  pop, chapter sticker, glitch, loop-back) and its sound cues.
- **The demo film** `promo/films/khookdemo` shows them all.
- **Read-only:** import it and never edit it. If you need something else, put it in a module in your first film's
  folder, e.g. `promo/films/kbne01/newskit.js`.

## 5. References and shared modules
- **Short formats:** read `sxmail1`, `st9aquawork` and `trtellleo` for how a film is built (scenes/index.js,
  cues.js, sky, grain, startalk.js characters).
- **Long and story formats:** read `mlpilot` and promo/films/STARTALK-EPISODES.md.
- **Rules and checks:** promo/films/STARTALK-BUILD.md, sections "Every episode" and "Polish loop", for accuracy,
  frame 0 and the checks. **Ignore everything there about end cards and card cuts.**
- **Shared modules are read-only:** startalk.js, lesson.js, stlore.js, st5cast.js, sky.js, the Moonlight kit,
  hookkit.js and other sessions' kits.

## 6. Build each film
Folder `promo/films/<f>/` with `scenes/index.js` and `cues.js`. Finish, check, commit and queue each film before
starting the next.

**Check:** at most two sheets per film:
```bash
node promo/scripts/render.mjs --film=<f> --vertical --sheet --rate=2 --dir=<fresh tmp dir>
```
Fix what the sheet shows, then do a final `--rate=4`. Long films: use `--rate=1` for the first sheet, plus
`--stills` for spot checks. Always check frame 0, t = 1, the last 0.1 s, and, for loops, that the last frame matches
frame 0. **Never run render.mjs with `--help`**: it starts a full render. `node promo/scripts/teaser-sound.mjs
--film=<f>` must run.

**Commit (one per film):**
```bash
git add promo/films/<f> && git commit -m "Month 2: <series name>: <title> (<len> s)" -m "<your attribution lines>"
git pull --rebase origin claude/align-promo-video && git push origin HEAD:claude/align-promo-video   # retry on rejection
```
Never force-push, and never commit another session's folders.

## 7. Render (start after your first film is committed)
```bash
bash promo/scripts/farm/setup.sh /dev/null
LINGER=7200 nohup /tmp/claude-0/workers.sh 1 3 > /dev/null 2>&1 &
flock /tmp/claude-0/queue.lock sh -c 'echo "<f> v1" >> /tmp/claude-0/queue.txt'   # after each film is committed
```
- **Output:** each film becomes `promo/out/web/<f>.mp4` and `promo/out/web/posters/<f>.jpg`, with the 1080p
  `promo/out/films/<f>/align-<f>-v1-send.mp4`.
- **Progress:** in `/tmp/claude-0/workers.log`.
- **Slots:** don't run more than 3.
- **Restarts:** if the workers exit while you're still building, start them again the same way.
- **Upload limit (20 MB):** if a web mp4 is over 19 MB (long films), re-encode it from the 1080p send file at 720p
  with a lower bitrate. Video kbps ≈ 19 × 8192 ÷ duration − 128. See `/tmp/claude-0/webenc.sh` for the settings.

## 8. Upload and record (every ~8 finished films, and at the end)
1. `Artifact` action `read` your page once (url in `promo/library/pages.json`, page number from your batch part).
2. `Artifact` publish with `url` = the page, `asset: true`, `file_paths` = the web mp4s and posters (≤ 20 per call).
   Never publish the page itself, and never delete assets.
3. Record each film in `promo/library/uploads/m2-<batch>.json` (merge, don't overwrite):
   ```json
   {"<f>": {"video": "/_blob/…", "poster": "/_blob/…", "title": "…", "len": 14, "long": false,
            "series": "<series key>", "episode": 1, "caption": "…"}}
   ```
   The caption follows **promo/posting/CAPTIONS.md** in the voice of the series' account and kind. No hashtags and
   no emoji. Make the first line of a caption as hooky as the video.
4. Delete the uploaded web mp4 and poster. Keep the 1080p send mp4s until your batch is finished, then delete them.
5. Commit only that uploads file: "Month 2 uploads: <batch> (+<k> films)", then pull --rebase and push.

If an upload says the page's storage is full, stop uploading to that page and say so in your report.

## 9. Finish
When every film in your batch is built, rendered, uploaded and recorded, report the following:
- each film's folder, title, length and last line;
- anything you changed from the brief and why;
- any film that failed.

If you hit a usage limit, resume where you left off when it resets: skip films that are already pushed and recorded.
