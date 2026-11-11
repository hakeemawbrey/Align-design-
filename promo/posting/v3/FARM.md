# v3 social cut: production farm (one batch per cloud session)

You are one worker in a farm making short vertical Instagram films for two Align accounts: **star_talk** (funny,
relatable zodiac entertainment) and **star_advice** (warm, relatable zodiac advice). Your batch is a JSON file in
`promo/posting/v3/batches/` (your prompt names it): ten films, each with `id`, `account`, `format`, `topic`, optional
`sign`, and `music: { key, seed }`. Make all ten: write, check, render, upload, record. Work on branch
`claude/align-promo-video`.

## 0. Setup (once)
```bash
cd <repo> && git fetch origin claude/align-promo-video && git checkout claude/align-promo-video && git pull --rebase
fc-list | grep -qi inter || echo 'FONTS MISSING: stop and report'   # Inter is system-installed. EB Garamond and Space Mono are NOT installed anywhere and fall back to the default serif/mono: that is expected and is exactly how the approved films look. Do not install fonts.
python3 promo/scripts/farm/gdrive.py folder "Star Talk/v3 Social Cut/<account>"   # prints the Drive folder id
```
The renderer needs `ffmpeg` and the pre-installed Chromium (no install needed). Drive credentials are environment
variables; never print them.

## 1. Write each film
Read `promo/films/SIGNS3-BUILD.md` (all of it, including "Solo films") and `promo/films/signs3kit.js`. The owner
approved these as the standard; match them: `promo/films/trs3dating`, `trs3twoam`, `trs3crush`, `trs3onread`
(twelve-sign), `trs3leo`, `trs3scorpio`, `trs3pisces` (solo). Film folder: `promo/films/<id>/` (`scenes/index.js`,
`cues.js` with your batch's music key/seed, and `caption.txt`).

Formats:
- **rollcall**: twelve signs in zodiac order (kit default). The topic is a situation; turn it into a punchy 2-line hook
  (e.g. topic "The signs at the airport" → `'The signs | *at the airport.*'` or a sharper version). Each sign's most
  EXTREME version of itself in that situation.
- **belike**: twelve signs, hook `'Zodiacs <situation> | *be like.*'` (the topic gives it; keep each line short).
- **solo**: `solo: '<sign>'`, 9 cards, the topic is the hook. Nine different relatable situations for that sign.
- **advice-solo** (star_advice): `solo: '<sign>'`, 9 cards, the topic is the hook. Each card: a relatable truth
  about that sign + a warm reframe, still with ONE visual gag and a little humour (the star is cute, the props are
  funny, the words are kind). Caption style: `'You give *everything.* | Save some for you.'` Lesson and last line warm
  and encouraging. Never controlling, never "you must", never diagnosing; astrology as gentle fun.
- **advice-rollcall** (star_advice): twelve signs, the topic is the hook; one warm, specific, relatable line per
  sign with a light visual gag.

Everything in SIGNS3-BUILD.md applies (house rules, Pisces cries whenever it appears, light Align nods, closing match
card pair that pays off a joke) EXCEPT the ending: every batch item has an `ending` (callback, lesson, group or card); use exactly that one, as SIGNS3-BUILD.md "Endings" describes. Endings must never feel salesy. Captions: ≤ 9 words, two lines, one *accent*. Never repeat a gag from the approved
films or from another film in your batch. Check the stills as the guide says (pick times inside every card and the
ending) and fix anything clipped, overlapping, tiny or unreadable before rendering.

`caption.txt` (the Instagram post caption): 2–3 short sentences naming 2–3 of the funniest/most relatable cards, then
a question or a "tag/send this to…" line. No hashtags, no emoji, no links, no invented stats, ≤ 300 characters.

## 2. Render (one at a time; you can write the next film while one renders)
```bash
OUT=/tmp/v3out; mkdir -p $OUT
node promo/scripts/teaser-sound.mjs --film=<id>
node promo/scripts/render.mjs --film=<id> --vertical --out=$OUT/<id>.mp4        # ~10–13 min; writes <id>-share.mp4 too
rm -f "$OUT/<id>.mp4"; rm -rf "promo/out/frames/<id>"                           # frames are ~1.5 GB per film: always clear
```
Check the share file: `ffprobe` duration ≈ the film's DURATION, and look at 3 frames (`ffmpeg -ss <t> -frames:v 1`).
Run long renders in the background (a command may run at most ~2 h). Never run two renders at once (disk and CPU).

## 3. Upload and record
```bash
python3 promo/scripts/farm/gdrive.py upload <folder id> $OUT/<id>-share.mp4 "<plain hook> (<id>).mp4"   # prints the share link
```
Then write `promo/posting/v3/done/<id>.json`:
`{ "id", "account", "format", "sign"?, "title": "<plain hook, no asterisks or |>", "caption": "<caption.txt>",
"drive_file": "Star Talk/v3 Social Cut/<account>/<name>", "drive_link": "<link>", "duration": <seconds> }`
and delete the local share file.

## 4. Commit after every film
`git add promo/films/<id> promo/posting/v3/done/<id>.json` (only these), commit, `git pull --rebase`, push; retry
on rejection (many workers push to this branch; never force-push, never touch other files). Commit messages end with
the attribution lines given in your session.

Do not post anything to any social account, do not contact anyone, and do not edit the kit, the guide or other
films. If something blocks you (for example a Drive error), finish what you can and say exactly what is blocked in
your final message.
