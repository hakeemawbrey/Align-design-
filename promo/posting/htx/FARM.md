# Houston Star Talk: production farm (500 videos; one batch per cloud session)

You are one worker making Houston-specific Star Talk videos. They promote the **Houston beta** and the **Houston beta
party on Jan 9**. The owner approved the first 10 (`promo/films/hst001`–`hst010`). The owner wants:
- as many styles as possible, so we can test and double down;
- relatable, fun and visually engaging videos;
- the stars **speaking directly to the person watching** ("you");
- more of the **original Star Talk storytelling and advice formats**.

Your batch is `promo/posting/htx/batches/wNN.json` (your prompt names it). It lists your ids (`hstNNN`) and the style
each one must be. Work on branch `claude/align-promo-video`.

## 0. Read first (all of it)
- `promo/films/HOUSTON-STARTALK.md`: the Houston research (neighborhoods, freeways, slang, weather, food, culture,
  dating), the **never-use list**, the hook rules and the format.
- The approved 10. Read `promo/films/htxstar/eps.js`, `eps2.js`, `eps3.js` and `kit.js` (props, `partyCard`), and
  `promo/films/starrace/ep.js` (the scene engine). Look at a few stills of them.
- The original Star Talk the owner loves:
  - `promo/films/STARTALK.md` (advice in the retro RPG dialogue box);
  - `STARTALK2.md` (stories, the season-2 cast and **★ LESSON UNLOCKED**);
  - `STARTALK9.md` "The hook rules";
  - `STARTALK13.md` (Star Talk Explains: a classroom with ✓ REAL ASTRONOMY / ✦ IN ASTROLOGY / ♥ RELATIONSHIP TIP tags);
  - `promo/films/startalk.js` (drawStarChar, dialogueBox, talkCues, talkHops).
  - Working references: `promo/films/starmercury`, `starvenus`, `stmetfirst`, `st12doubletext`,
    `stmeetfriends2/scenes/props.js` and `stexplain.js`. Approved social-cut reworks: `promo/films/og-st4anniversary`
    and `og-kzce01`.

## 1. Rules for every video
- **Hook (0–2 s):**
  - A static `HOOK` caption from frame 1: `box` style, ≤ 8 words, 2–3 short lines (' | ' breaks; no single word alone
    on a line).
  - Frame 0 is already busy with a Houston visual and motion: a hop wave, something moving, a sound sting at t=0.
  - No fade-in.
- **Speak to the viewer.** The hook or the first spoken line addresses "you"/"your sign"/"POV: you…". Advice and
  story formats look into the camera.
- **Length:** 30–60 s, with a new beat every 2–4 s.
- **Ending:** every video ends on the party ticket, `partyCard` from `promo/films/htxstar/kit.js` (~6 s), with a
  short closing line in your own words. Show the "HOU BETA · JAN 9" badge after the hook (ep.js `badge`, or draw it).
- **Party facts:** only the date (Jan 9) is known. Never invent a venue, a time, a price or an RSVP method.
- **Content:**
  - Real Houston lore from the research. Spread it across the whole city and culture; don't lean on Katy and the 610
    every time.
  - All 12 signs appear across your batch.
  - Healthy, warm advice. Kind humour, never mean about any neighborhood or group.
  - Pisces cries.
  - Never: brands, teams, the trademarked events/places on the never-use list, real people, drink/drug slang,
    disasters, statistics, sexual jokes, weapons.
  - Captions: no hashtags, no emoji.
- **Variety:**
  - Every episode has its own premise.
  - Don't reuse a hook template more than 3 times in your batch.
  - Vary the cast, the locations, the music style (lofi, pop, funk, jazzy, dreamy, chiptune, synthwave, house,
    screwed) and the colours.
- **Music** (the owner found the default too loud):
  - ep.js-based films: `music: { style, key, seed, lufs: -26, musicRel: -15, crackle: false, sections: { drop: 0, outroAt: DURATION - 2.4 } }`.
  - startalk.js-based films: `musicRel: -11` (the pipeline lowers Star Talk by another 4 dB).
- **Code:**
  - Put your scripts in **your own files**: `promo/films/htxstar/wNN.js` plus anything else under that name.
  - One folder per video: `promo/films/hstNNN/` (`scenes/index.js`, `cues.js`, `caption.txt`), as in hst001.
  - Never edit the shared files: `ep.js`, `kit.js`, `eps*.js`, `startalk.js` or other films. If you need a prop,
    write it in your own file.
  - Everything must be a pure function of t, with no `document` at module top level.

## 2. The styles (your batch says which)
OG Star Talk formats (use startalk.js dialogue boxes, or ep.js with a dialogue-style box, whichever you do best):
- **advice**: one sign's star looks at YOU and gives Houston-flavoured dating advice in the RPG box. "Hey Taurus.
  Yes, you. Stuck on 59 again?" The advice is real and healthy; the setting and jokes are Houston. Ends with a
  ★ LESSON UNLOCKED beat, then the ticket.
- **story**: STARTALK2-style stories with the season-2 cast (Aunties Cancer and Taurus in reading glasses, the Booth
  Gemini and Sagittarius, Virgo with a clipboard, crying Pisces). Each has a setup, an escalation, a turn and a
  payoff, set somewhere in Houston, and ends with ★ LESSON UNLOCKED.
- **explains**: Star Talk Explains (STARTALK13) with Houston questions. "Why can't you see stars in Houston?" (city
  glow: ✓ REAL ASTRONOMY), "What's Mercury retrograde doing to your 610 commute?", "What's a rising sign, explained
  with feeder roads". Keep the tags honest.

Direct address:
- **pov**: "POV: you're a Houston [sign]". The day, the habits, the dating life, through that sign's eyes.
- **dates**: "Your perfect Houston date, by sign": real public places and generic activities (paddle boats, the
  bayou trail, free museum Thursday, a Bellaire food crawl, the Waugh bridge bats at sunset).
- **flags**: green flags and red flags of Houston dating, by sign. Kind, never cruel.
- **texts**: "Your star just texted you" (a generic phone and chat, no app UI). The star texts about your Houston
  life.
- **forecast**: "Your Houston love forecast": a weather-forecast parody per sign or element.

Parodies (the approved hst004–hst010 show the grammar; copy it exactly and push it further):
- **news**: STAR NEWS (desk, LIVE bug, chyron, ticker, field reporters).
- **weather**: the weather-map segment as its own show.
- **court**: courtroom (judge, witnesses, exhibits, a verdict).
- **doc**: nature documentary (Latin lower-thirds, narration subtitles).
- **mission**: mission control ("Houston, we have a…").
- **trailer**: a movie trailer ("THIS JANUARY…" title cards, ratings card, release date JAN 9).
- **gameshow**: a quiz show with a money ladder or buzzers; the viewer is asked to comment an answer.
- **realityshow**: a dating show with confessional cut-ins and a rose-style ceremony (generic, no show names).
- **sports**: play-by-play and color commentary of a date or a parking attempt (no teams or leagues).
- **cooking**: a cooking show ("today we make the perfect breakfast taco for a Libra").

Lists and interactive:
- **assigns**: "Houston X as zodiac signs": neighborhoods were done, so do freeways, foods, weather days, kolache
  fillings, parks, H-Town phrases.
- **tier**: tier lists and rankings ("ranking the signs as Houston drivers").
- **tellme**: "Tell me you're a Houston [sign] without telling me".
- **starterpack**: "Houston [sign] starter pack".
- **whichone**: "Which one are you?" Pick-one choices with a comment prompt.

Party and skits:
- **countdown**: "N days until Jan 9: [sign] is getting ready". Each is a different sign or prep gag. Number them
  from your id order, counting down. Never claim a weekday.
- **partyprep**: what each sign wears, brings or does for the party. Outfit for 80° in January, the group chat, the
  ride share.
- **traffic** / **weatherskit** / **food**: short story skits in those worlds, each with a twist.
- **romcom**: mini love stories across Houston (two sides of town, run-club meet-cute, the halfway coffee shop) that
  end at the party.

## 3. Check, render, upload, record (one video at a time; write the next while one renders)
```bash
# stills check: frame 0, 1.5 s, 4 mid-story times, the last second
node promo/scripts/render.mjs --film=hstNNN --vertical --social --calm=1 --stills=0.05,1.5,8,16,24,<end-1> --dir=/tmp/hstNNN-chk
OUT=/tmp/htxout; mkdir -p $OUT
node promo/scripts/teaser-sound.mjs --film=hstNNN --social --calm=1
node promo/scripts/render.mjs --film=hstNNN --vertical --social --calm=1 --out=$OUT/hstNNN.mp4    # also writes hstNNN-share.mp4
rm -f "$OUT/hstNNN.mp4"; rm -rf "promo/out/frames/hstNNN" /tmp/hstNNN-chk                       # always clear frames
```
- Fix anything in the stills before rendering:
  - a hook that wraps a single word;
  - overlaps between bubbles, signs, stickers and the hook;
  - a missing `import` (a ReferenceError shows as "frame N failed").
- Then check the share file:
  - `ffprobe` duration matches your DURATION;
  - 3 frames with `ffmpeg -ss <t> -frames:v 1`.
- Never run two renders at once.

```bash
python3 promo/scripts/farm/gdrive.py folder "Star Talk/Houston/<style>"            # once per style: prints the folder id
python3 promo/scripts/farm/gdrive.py upload <folder id> $OUT/hstNNN-share.mp4 "<plain hook> (hstNNN).mp4"
```
- Write `promo/posting/htx/done/hstNNN.json`:
  `{ "id", "style", "hook": "<plain hook>", "caption": "<caption.txt>", "drive_file": "Star Talk/Houston/<style>/<name>", "drive_link", "duration" }`
- Then delete the local share file.
- `caption.txt`:
  - Its first line is `Houston beta party: Jan 9.`
  - Then 1–2 short sentences, then a question or a "send this to…" line.
  - ≤ 300 characters, no hashtags, emoji or links.
- Drive credentials are environment variables; never print them.

## 4. Commit after every video
- `git add promo/films/hstNNN promo/films/htxstar/wNN* promo/posting/htx/done/hstNNN.json` (only these), commit,
  `git pull --rebase`, push. Retry on rejection.
- Never force-push and never touch other files.
- Commit messages end with the attribution lines given in your session.
- Do not post anything to any social account and do not contact anyone.
- If a video can't be made, skip it and say why in your final message. Finish what you can and say exactly what is
  blocked.
- Do not stop to ask questions: decide, note the decision in your final message, and keep going.
