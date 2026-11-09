# Align Study

Point it at any Instagram page (first up: **@tylerinthemaking**) and it
downloads every post, works out what's in each one on your own Mac, and packs
it up so Claude can study the page and tell you how to make Align posts like
it.

For each post the pack has:

- **Numbers:** views, likes and comments, and how the post did against the page's typical post
- **What's said:** a transcript with timings (whisper.cpp, runs offline on your Mac)
- **What's on screen:** the words in the first seconds and across the video, or on every carousel slide (macOS's built-in text recognition)
- **What it looks like:** one contact sheet per post, with three stills from the first 2.5 seconds (the hook) and three across the rest, or a carousel's slides side by side
- **The caption, hashtags, date and length**, plus a `report.md` that adds it all up: formats, top and bottom posts, hooks, topics, openers they reuse, calls to action, length and posting times

## One click on a Mac

**First time:** open Terminal (Cmd+Space, type Terminal), paste this and press Enter:

```
bash -c "$(curl -fsSL https://raw.githubusercontent.com/hakeemawbrey/align-design-/HEAD/study/mac/install.sh)"
```

It installs what's needed (Homebrew, Node, gallery-dl, yt-dlp, ffmpeg,
whisper.cpp, GitHub's `gh`), puts the project in `~/Align-design-` (or
updates it if Align Inspo already put it there), adds two buttons to your
Desktop and starts:

- **Study Instagram Page:** asks which page (press Enter for the last one),
  checks you're logged into Instagram in your browser, then:
  1. downloads every post on the grid,
  2. reads views and comments for each, a few seconds apart,
  3. transcribes, reads on-screen text and makes stills, all on your Mac,
  4. packs it up, opens the folder, and asks whether to send it to Claude.

  If Instagram pushes back it waits 30 minutes and carries on by itself, and
  it keeps your Mac awake while it works. Close the window any time; double-click again to pick up
  where it left off. A page with a few hundred posts takes an hour or two,
  most of it waiting politely between requests. The speech model (about
  470 MB) downloads the first time.
- **Send Study to Claude:** pushes the pack to a **private** repo on your
  GitHub, `<you>/align-study`, which it makes the first time (a one-time
  GitHub sign-in). It refuses to send if that repo is ever public.

Then tell Claude: **"Study @tylerinthemaking from hakeemawbrey/align-study"**.

### Why a separate private repo

The pack holds someone else's videos' words and stills. This repo is public,
so the pack never goes here: `study/pack/` and `study/media/` are git-ignored,
and only your private repo gets it. Downloads stay on your Mac in
`study/media/`. Nothing is reposted; it's reference for working out the
structure, the same as `inspo/`.

## Facebook pages

The same study for a Facebook page's **reels and videos** (first up: **Astriva**).

**On a Mac that already has Align Study:** double-click **Study Facebook Page**
on your Desktop and paste the page's link. A share link like
`facebook.com/share/…` is fine. If you only have the older two buttons, run
the install line once more to get it.

**First time on this Mac:** paste this into Terminal:

```
bash -c "$(curl -fsSL https://raw.githubusercontent.com/hakeemawbrey/align-design-/HEAD/study/mac/install.sh)" _ facebook "https://www.facebook.com/share/1KezBxmTFj/"
```

What happens:

1. A Chrome window opens. It's a separate window with its own profile in
   `~/.align-study/facebook-browser`, so it never touches your everyday Chrome.
   The first time, you **log into Facebook in it**. It remembers you after that.
2. It opens the page's Reels and Videos tabs and scrolls them slowly,
   noting every link. Then the window closes.
3. yt-dlp downloads each video with that login, 4–9 seconds apart, along with
   its caption, date, views, reactions and comments.
4. The rest is the same as Instagram: transcripts, on-screen text, contact
   sheets, `report.md`, and an offer to send the pack to your private repo.

The page is saved as `fb-<page>`, for example `fb-astriva`. Then tell Claude:
**"Study fb-astriva from hakeemawbrey/align-study"**.

In Terminal: `npm install`, then `npm run facebook -- "<link>" --limit 12` to
try a few. Without `--limit` it gets everything, and you can re-run it to
resume. Then run `npm run process -- fb-astriva` and
`npm run report -- fb-astriva`. Add `--links-only` to only list what's there.
If Facebook asks for a break, it exits with 75 and the Mac button waits 30
minutes, the same as for Instagram. Scripted downloading is against Facebook's
terms too, so it's your call, the same as for Instagram.

## YouTube channels

The same study for a whole **YouTube channel**: every long video and Short,
small (480p), with its thumbnail and YouTube's own captions. The captions mean
even a 40-minute video gets its full transcript in seconds, with no whisper.

**On a Mac:** double-click **Study YouTube Channel** and paste the channel's
link, or a link to any video on it. If you only have the older buttons, run the
install line once more. It uses your browser's YouTube login so YouTube doesn't
take it for a bot. If YouTube asks for a break, it waits 30 minutes and carries on.
The channel is saved as `yt-<channel>`. Then tell Claude: **"Study yt-<channel> from
hakeemawbrey/align-study"**.

In Terminal: `npm run youtube -- "<link>" --cookies-from-browser chrome --limit 20`
to try the newest 20 of each tab, then without `--limit` for everything (re-run
to resume). Then `npm run process -- yt-<channel>` and `npm run report -- yt-<channel>`.
The report adds long videos vs Shorts and the best and weakest titles of each, and
the pack adds `thumbs/`.

**Quick read, anywhere:** `npm run quick -- "<link>"` needs only yt-dlp. It
downloads no videos and needs no login, so Claude can run it in the cloud the
moment you send a link. It ranks every upload against the channel's typical one,
compares title shapes and lengths between the top and bottom quarters, and makes
contact sheets of the best and weakest thumbnails (`pack/yt-<channel>/quick.md`).

What Claude learns from both goes into **Video Lab**, the playbook portal: see
[kb/README.md](kb/README.md).

## X (Twitter) accounts

The same study for an **X account**: every post on its Media tab (its own posts
with a video or photos, no reposts), with views, likes, reposts and replies.

**On a Mac:** double-click **Study Any Link** (or **Study X Account**) and paste
the account's link, or a link to any post from it. X only shows timelines to
logged-in people, so it uses your browser's X login, the same way the Instagram
study does. The account is saved as `x-<account>`.

In Terminal: `npm run twitter -- "https://x.com/<account>" --cookies-from-browser chrome --limit 40`,
then `npm run process -- x-<account>` and `npm run report -- x-<account>`.
Scripted downloading is against X's terms too, so it's your call, the same as for Instagram.

**One post, anywhere:** `npm run quick -- "https://x.com/<account>/status/<id>"`
reads a single post without a login (text, views, likes, replies, length,
thumbnail). Claude can do this in the cloud the moment you send an X link.

## One button for all four

**Study Any Link** takes a YouTube, Instagram, X or Facebook link and runs the
right study. The single-platform buttons still work.

## Step by step (Terminal)

Needs Node 22+, ffmpeg and gallery-dl; yt-dlp for views; whisper.cpp for speech.

```bash
cd study
npm run download -- tylerinthemaking --cookies-from-browser chrome --limit 12   # try a few first
npm run download -- tylerinthemaking --cookies-from-browser chrome              # then everything (re-run to resume)
npm run numbers  -- tylerinthemaking --cookies-from-browser chrome
npm run process  -- tylerinthemaking            # --model base.en for a smaller, faster speech model
npm run report   -- tylerinthemaking            # --tz America/Chicago (the default) for posting times
npm test
```

Options worth knowing:

- `download --reels-tab` also gets reels that were never shared to the grid. It costs one extra request per reel, so it's off by default.
- `numbers` uses **Meta's official API** instead of yt-dlp when `IG_ACCESS_TOKEN` and `IG_USER_ID` are set (the same two as `founder/` and `inspo/`). It's one request per 50 posts, and the numbers are exact. It only works if the page is a Business or Creator account. Without it, yt-dlp may not get reel views (Instagram reports reel plays in a field yt-dlp doesn't read). Reels are then ranked by likes, and the report says how many reels have views.
- `process` skips whatever it can't do (no whisper.cpp, not a Mac) and fills it in on a later run once it can.

Scripted downloading isn't Meta's API and is against Instagram's terms of
use, so it's your call (see `inspo/README.md`, Option B). It uses your own
logged-in browser and goes slowly. Private accounts only work if the
logged-in account follows them.

## What's in a pack

`study/pack/<handle>/`, and the same in `<you>/align-study/<handle>/`:

| File | What |
| --- | --- |
| `report.md` | the numbers: mix, top 25, bottom 10, top quarter vs bottom quarter, length, topics, reused openers, CTAs, hashtags, posting days and times |
| `posts.json` | every post: numbers, `lift` (× typical), caption, `hook` {screen, spoken, caption}, transcript with timings, on-screen text per still, topics, shapes, CTAs |
| `posts.csv` | the same as a spreadsheet |
| `sheets/<shortcode>.jpg` | the contact sheet for each post |

## What Claude does with it

1. Reads `report.md` for the shape of the page, then `posts.json` end to end: every hook, transcript and caption.
2. Looks at the contact sheets of the top and bottom posts for framing, text style, pacing and setting.
3. Writes the playbook for Align in this repo (`study/playbooks/<handle>.md`): what the page does and why it works, the formats and hooks to borrow, and Align versions of the best posts about relationship topics. It quotes the source only in short pieces, the same rule as `founder/`.
4. Turns the playbook into posts with the makers already here: `carousel/`, `reels/` and `founder/` (talking-head scripts).

## Files

| Path | What |
| --- | --- |
| `src/download.mjs` | gallery-dl over the whole profile, resumable, plus the profile's bio, links and counts |
| `src/youtube.mjs` | a whole YouTube channel: lists Videos and Shorts, yt-dlp downloads each small with captions and thumbnail |
| `src/twitter.mjs` | an X account's Media tab with gallery-dl and your browser login, reshaped like the Instagram downloads |
| `src/quick.mjs` | a quick read of a YouTube channel from its lists alone, or of one X post (no downloads; works in the cloud) |
| `kb/` | Video Lab: the portal's source and how Claude keeps the playbook |
| `src/facebook.mjs` | a Facebook page: its own Chrome window collects the reel and video links, yt-dlp downloads each with its numbers |
| `src/numbers.mjs` | views, comments and length per post (yt-dlp, or Meta's API) |
| `src/process.mjs` | stills, contact sheets, on-screen text, transcripts |
| `src/ocr.swift` | the on-screen text reader (macOS Vision), compiled once to `~/.align-study/bin` |
| `src/posts.mjs` | gallery-dl's files and details → one record per post |
| `src/report.mjs` | records → `report.md`, `posts.json`, `posts.csv`, `sheets/` |
| `mac/install.sh`, `mac/run.sh` | the one-time setup and the two Desktop buttons |
