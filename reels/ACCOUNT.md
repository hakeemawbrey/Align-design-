# zodiac.exe — account kit

Instagram + TikTok account for short weirdcore low-poly 3D reels. One reel =
one liminal world, one Win98 popup titled `<sign>.exe` typing one line of
love or self advice to that sign, then the glyph pops over the shiny figure.
Voice and line rules live in `CONTENT.md`. This file is everything around the
lines: name, profile, posting, captions, engagement, workflow, guardrails.

Format reference: @whonagy, "Break the loop 👁" ("The cycle ends when the
pattern changes."). We borrow the format, not their lines or name.

---

## 1. Name

Lead pick: **zodiac.exe** (it is already the popup title in the player and
the project name).

Alternatives, same spirit:

| Handle | Why |
|---|---|
| `astro.exe` | shortest, same joke |
| `zodiac.sys` | system-file feel, reads as "the core file" |
| `natal.exe` | a little more insider, astrology people get it instantly |
| `12signs.exe` | says the premise in the name |
| `zodiacloop` | ties to "break the loop", no punctuation, easy to type |

Fallback spellings if the lead is gone: `zodiac.exe_`, `the.zodiac.exe`,
`zodiacexe`. Both platforms allow periods in usernames (not at the very end).

Availability is not verified. Check every candidate by hand on Instagram and
TikTok before committing, and grab the same handle on both. If you can only
get it on one, use the closest fallback on the other and keep the display
name `zodiac.exe` on both.

## 2. Bio and profile picture

Display name: `zodiac.exe`. Bio options (all under 150 chars):

1. `a message from the simulation for all 12 signs. find yours. it repeats until you listen 👁` (89)
2. `zodiac.exe has stopped responding to your excuses. love and self advice for every sign 👁` (88)
3. `12 signs. one popup each. not a forecast, just a pattern you can change 👁` (73)

Option 3 doubles as a guardrail (it says out loud that this is not a
prediction). Lowercase, no hashtags, one 👁 to match the captions.

Profile picture. It shows as a ~110px circle, so it needs one shape that
reads small:

- First choice: the shiny figure, centered, mid-frame, before the popup
  appears (the first second of any reel). Bright worlds read best at tiny
  size: `cloudtops`, `snow`, `poolrooms`. Avoid `nightsea`/`cavelake` (go
  muddy in a circle).
- Alternative: a tight crop of an empty Win98 popup with the title bar
  `zodiac.exe` (the player's own window chrome shows this title).
- No glyph in the avatar. It would make the account look like it belongs to
  one sign.

How to grab it: run `npm run render -- --count 1 --world cloudtops`, then pull
a clean full-res frame from the start of the MP4:

```
ffmpeg -ss 0.5 -i out/<file>.mp4 -frames:v 1 pfp.png
```

Crop square around the figure. Use the same image on both platforms.

## 3. Pinned posts (first 3)

Pin these at launch, then swap in real winners after two weeks of data.

| Pin | What | Why |
|---|---|---|
| 1 | A "loop" line, closest to the reference. E.g. `Scorpio, the loop breaks when you stop replaying the worst night.` (`break the loop`) | It is the account's thesis in one reel. New visitors see what the format is in 7 seconds. |
| 2 | Strongest love line from a high-volume sign. E.g. `Pisces, you fell for who they could be. Meet who they are.` | Love lines get shared to a specific person. That is the main growth mechanic. |
| 3 | "Find your sign" index: all 12 signs stitched into one reel (one line each, ~85–100s), caption `find yours`, pinned comment listing the order with timestamps | Lets every visitor find their sign without scrolling, and drives saves. It is the one post that serves all 12 signs at once. |

Stitching pin 3: render with `npm run render -- --count 12` (rotation gives
one per sign), then concatenate in zodiac order with ffmpeg's concat demuxer.
Sound is per-reel, so the cuts land cleanly.

After two weeks, replace pins 1 and 2 with your best reels by shares + saves
(not views). Keep pin 3.

## 4. Posting plan

### Cadence

| Phase | Per platform per day | Per week | Notes |
|---|---|---|---|
| Weeks 1–2 | 2 | 14 | 12 rotation + 2 encore slots |
| Week 3+ (if 3s hold rate holds) | 3 | 21 | 12 rotation + 9: top 3 signs get a second and third post |

Post the same file to both platforms. Spread the slots, e.g. ~12:00 and
~20:00 in your audience's main time zone (add ~08:00 when you go to 3/day).
After two weeks, move slots to whatever the native analytics show.

### 12-sign rotation (2/day week)

Zodiac order, which is exactly what `npm run render` deals if you don't pass
`--sign` (it picks up after the last sign it rendered, saved in
`out/ledger.json`).

| Day | Slot A | Slot B |
|---|---|---|
| Mon | aries | taurus |
| Tue | gemini | cancer |
| Wed | leo | virgo |
| Thu | libra | scorpio |
| Fri | sagittarius | capricorn |
| Sat | aquarius | pisces |
| Sun | encore: current season's sign | encore: last week's top sign |

Every sign gets at least one post a week. Sunday slots go to the sign whose
season it is (Libra until Oct 22, then Scorpio until Nov 21, and so on) and
to whichever sign won the previous week.

### Reel best practice for 6–9 second reels

What the generator already does: the popup appears at 1.0s, types at ~34
chars/sec, holds 1.7–3s, closes, the glyph pops, then 1.3s tail. Total
length by line length:

| Line length | Typed by | Total |
|---|---|---|
| 40 chars | ~2.4s | ~6.2s |
| 60 chars | ~3.0s | ~7.0s |
| 95 chars | ~4.0s | ~9.1s |

- **First-second hook.** The sign's name is always the first word, so the
  viewer reads "Scorpio," at ~1.3s. That is the hook. Do not add intros,
  title cards, or text overlays before it. (Optional test: pull `tPopup` in
  `engine/reel.js` `timelineFor()` from `1.0` to `0.6`.)
- **Loop-friendliness.** Do not add end cards or "follow for more" frames.
  The tail after the glyph flows back into the world-only opening, so the
  replay feels seamless and people rewatch to reread. Replays count as
  watch time on both platforms.
- **Safe zones** (1080×1920). Keep important text out of roughly the bottom
  ~420px (caption, audio row, TikTok's bar), the right ~140px (like/comment/
  share buttons) and the top ~200px. Spot-check the popup on a phone in both
  apps the first week. The `--handle` watermark sits top-left at ~115px from
  the top, which can fall under TikTok's top UI. That's fine for a
  watermark (it's there so reposts carry the handle); drop `--handle` if it
  bothers you.
- **Sound.** Every MP4 ships with its own original soundtrack (typing clicks,
  popup sound, glyph hit). Post with it on. Many people watch muted, but the
  line is fully readable without sound, so muted views lose nothing.
- **Cover.** Choose a cover frame where the popup is fully typed, so the
  profile grid reads as a wall of messages.

### A/B ideas

Test one variable at a time, over at least 6 posts per arm, judged on 3s
hold rate, average watch %, shares and saves.

| Test | Arm A | Arm B | How |
|---|---|---|---|
| Topic | love | self | `--topic love` vs `--topic self`, same signs |
| World | bright (`cloudtops`, `poolrooms`, `snow`) | dark (`nightsea`, `cavelake`, `dunes`) | `--world <name>` |
| Line length | under 60 chars | 75–95 chars | pick lines with `--line`, or filter `content/` by length |
| Hook timing | popup at 1.0s | popup at 0.6s | edit `tPopup` in `engine/reel.js` |
| Caption | the line's own caption | `type your sign` CTA caption | edit the .txt before posting |
| Post time | midday | evening | same sign, same topic |

Log results in a sheet keyed by the `file` field in `out/manifest.jsonl`
(it already records sign, topic, text, world, seed and duration).

## 5. Captions and hashtags

The renderer writes a `.txt` next to each MP4 (built by `captionFor()` in
`engine/signs.js`):

```
put the magnifying glass down 👁
-
-
#scorpio #scorpioseason #zodiac #astrology #relationshipadvice #datingadvice #weirdcore #lowpoly3d #liminalspace
```

Rationale:

- **Caption line**: 2–6 lowercase words from the line's JSON, offhand, a
  reaction to the line rather than a repeat of it. The 👁 is the account's
  signature (and nods to the reference).
- **`-` `-` spacer**: pushes the tags below the "more" fold so the visible
  caption stays clean.
- **9 tags, 3 jobs**: 2 for the sign (`#<sign>`, `#<sign>season`), 2 broad
  astrology (`#zodiac`, `#astrology`), 2 for the topic (love:
  `#relationshipadvice #datingadvice`; self: `#selfimprovement #mindset`),
  3 for the aesthetic (`#weirdcore #lowpoly3d #liminalspace`). Sign + topic
  reach the people the line is for; aesthetic reaches people who like the
  look and don't care about astrology.

When to swap:

- **`#<sign>season`**: accurate only during that sign's season. Outside it,
  swap for `#<sign>zodiac` or `#<sign>facts`, or just delete it. Inside the
  season, the season tag is the best one you have.
- **Hashtag caps**: Instagram has been moving toward a small hashtag limit
  (around 5). If the app rejects or trims 9, keep `#<sign> #zodiac
  #<topic tag 1> #weirdcore #liminalspace`. TikTok takes all 9.
- **Spare tags**: `TAGS` in `engine/signs.js` already has `#love`,
  `#growth` and `#dreamcore` unused. Rotate them in every few weeks, or
  when one tag's reach drops off in insights.
- **Edit tags in code, not by hand**: change `TAGS` or `captionFor()` once,
  and every future render picks it up.

## 6. Engagement

### Comment prompts

Pin one of these as the first comment on each reel (rotate them):

- `type your sign and i'll send yours next`
- `send this to the scorpio who needs it`
- `which sign gets this one next?`
- `rate how hard this hit, 1 to 12`

Reply to early comments in the first hour, in voice (lowercase, short,
calm). For a reply-with-video, use the commenter's sign:
`npm run render -- --sign <sign> --count 1`.

### Story ideas (Instagram stories, TikTok stories/photo posts)

- **Poll**: "which sign gets the next popup?" with 2 signs, the winner goes
  in Sunday's encore slot.
- **Quiz sticker**: show a line with the sign name blurred, "which sign is
  this for?" Reveal next story.
- **Slider**: "how called out do you feel" under a reshared reel.
- **Question box**: "what loop are you stuck in?" Answers feed new lines
  (see below).
- **Season change**: on each season start, a story with the new glyph and
  "your season, your popups".

### Series ideas

All of these are just renders with `--sign`/`--topic` plus a shared caption.

- **the 12 signs as ...**: as unread texts, as closing tabs, as error
  messages (12 reels, one per sign, posted over one week, same caption
  prefix).
- **[sign] season pack**: 5 lines for the season's sign over its first week.
- **love.exe week / self.exe week**: one topic for a whole rotation
  (`--topic love`).
- **element days**: fire / earth / air / water signs back to back.
- **one world week**: the whole rotation in one world (`--world poolrooms`)
  so the grid looks like a set.

### Turning top comments into lines

1. Each week, pull the 10 most-liked comments and the question-box answers.
2. Keep the ones that name a real pattern ("i reread old texts at 2am").
3. Rewrite to the rules in `CONTENT.md`: sign name first, 40–95 chars, one
   idea, no jargon. E.g. a Cancer comment about rereading becomes
   `Cancer, the old messages say the same thing every time you open them.`
4. Add it to `content/<sign>.json` with a caption, run `npm run check`.
5. Or render it once without adding it:
   `npm run render -- --sign cancer --topic love --line "Cancer, ..."`
   (lines rendered with `--line` don't touch the ledger and get the caption
   `break the loop`; edit the .txt if you want another).

Never quote a commenter by name or put a private story in a line.

## 7. Workflow

### Tools

| Command | What it does |
|---|---|
| `npm run dev` | Endless player at http://localhost:5178. Pick signs and topic, Back/Next (arrow keys), Pause (space), set a handle, copy the caption, "Record this reel" for a quick take. Use it to preview lines and worlds. |
| `npm run render -- --count 12` | Batch-exports 1080×1920 MP4s with sound plus a caption `.txt` each into `out/`. Rotates signs in zodiac order and never repeats a line until a sign's deck is used up. |
| `npm run write -- --sign leo --n 20` | Writes 20 fresh Leo lines with the Claude API. Needs `ANTHROPIC_API_KEY` in the environment. |
| `npm run check` | Validates every line in `content/` against `CONTENT.md` and prints love/self counts per sign. Run after any edit. |

Render flags (full list in the header of `src/render.mjs`):

| Flag | Use |
|---|---|
| `--count N` | how many reels (default 1) |
| `--sign scorpio` | only this sign |
| `--topic love\|self` | only this topic |
| `--forever` | keep rendering until Ctrl+C (finishes the current reel first) |
| `--world cavelake` | force a world: cavelake poolrooms meadow checker dunes nightsea snow cloudtops |
| `--handle @zodiac.exe` | small watermark, top-left |
| `--line "<text>"` | render one exact line (needs `--sign`) |
| `--fps 30 --internal 0.5 --out out/` | output frame rate, internal render scale, output folder |

Files in `out/`: `<stamp>-<nnn>-<sign>-<id>.mp4` + matching `.txt`,
`manifest.jsonl` (one row per reel) and `ledger.json` (which lines are used
and the last sign). Do not delete `ledger.json`, or lines will start
repeating. Each sign has 60 lines now (720 total), so at 2/day a sign's deck
lasts about a year. Top up a sign before it runs out (the renderer warns
when it reshuffles).

### Weekly routine (one sitting, ~1 hour plus render time)

1. **Review (10 min).** Last week's analytics: top 3 reels by shares and
   saves, worst 3 by 3s hold. Note which signs, topics, worlds won.
2. **Write (10 min).** Top up the signs that won or are running low:
   `npm run write -- --sign <sign> --n 20`. Add comment-derived lines by
   hand. Then `npm run check` until it says `all good`.
3. **Preview (5 min).** `npm run dev`, skim new lines in the player. Delete
   any that don't land in one read.
4. **Render (unattended).**
   - Rotation: `npm run render -- --count 12 --handle @zodiac.exe`
   - Encores: `npm run render -- --sign <season sign> --count 1` and
     `npm run render -- --sign <top sign> --count 1`
   - A/B arm this week, if any: add `--topic` or `--world` to one of the
     above.
5. **Fix captions (10 min).** Open the `.txt` files. Swap `#<sign>season`
   where it's out of season, trim tags for Instagram if needed.
6. **Schedule (20 min).** Load all 14 into Meta Business Suite (Instagram)
   and TikTok's scheduler in the rotation order above. Choose cover frames.
   Queue the first-comment prompts.
7. **Log.** Copy this week's rows from `out/manifest.jsonl` into the
   tracking sheet.

## 8. Guardrails

- **Astrology is flavor, not fate.** Lines never say the sign decides
  anything, predict events, or promise a soulmate. The sign is the way in,
  and the advice has to be true for anyone. No "this week Mercury...",
  no compatibility verdicts ("never date a Gemini").
- **No punching down.** Teasing a sign's trait is fine. Insulting the sign or
  the reader is not. Nothing about looks, bodies, money status, mental
  illness, or groups of people. No "your ex is crazy" lines.
- **No therapy jargon.** No attachment style, trauma bond, narcissist,
  toxic, gaslighting, boundaries as a buzzword, healing journey. Plain
  words only. Do not present lines as therapy or diagnosis. If a comment
  mentions self-harm or abuse, don't make content from it. Reply kindly
  and point to local support resources.
- **Music.** Every reel has an original soundtrack generated by the engine
  (no samples, no licensed tracks), so it is safe to post as is on both
  platforms, including if the account goes business/creator. Trending audio
  is optional and your call. If you use it, add it in-app from the
  platform's licensed library (business accounts on Instagram get a smaller
  commercial library) and keep the original audio low or off. Never mux
  outside music into the MP4 yourself.
- **Credit the format, not the content.** The format is inspired by
  @whonagy. Don't reuse their lines, names or visuals, and don't tag them
  for reach.
- **Disclosure.** If a platform asks whether content is AI-generated (lines
  from `npm run write` are), answer honestly and use the AI label where it
  applies.
