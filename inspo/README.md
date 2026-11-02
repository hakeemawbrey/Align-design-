# Align inspo

The 1,068 Instagram posts in *align-edits-inspo-serious.xlsx* (945 reels, 72
carousels, 51 posts from 841 creators), with a way to download them, go through
them one at a time, and turn your calls into a brief that a content program
(Claude Code, `founder/`, `reels/`, `carousel/`) can follow.

The loop:

1. **Download** the posts to your computer (optional, but videos play right in the review page).
2. **Review** each one: **Use it**, **Maybe** or **Skip it**; tick what to take
   from it (hook, format, look, editing, sound...), say why, and write the **Align spin**.
3. **Brief**: `npm run brief` turns your calls into `out/brief.md` and
   `out/accepted.json`, and hands your accepted reels to `founder/` for Align scripts.
4. Ask Claude Code to make content from `inspo/out/brief.md`.

## One click on a Mac

**First time:** open Terminal (Cmd+Space, type Terminal), paste this and press Enter:

```
bash -c "$(curl -fsSL https://raw.githubusercontent.com/hakeemawbrey/align-design-/HEAD/inspo/mac/install.sh)"
```

It installs what's needed (Homebrew, Node, yt-dlp, gallery-dl), puts the project in
`~/Align-design-`, adds two buttons to your Desktop and starts:

- **Align Inspo**: double-click any time. It updates itself, opens the review
  page in your browser, and downloads every post you don't have yet. You can
  review while it downloads; new videos show up in the page as they land. It keeps your
  Mac awake while it works. If Instagram pushes back, it waits 30 minutes and
  carries on by itself. Close the window to stop; double-click again to pick up where it left off.
- **Send Picks to Claude**: sends your calls to GitHub (a one-time GitHub
  sign-in the first time), so Claude can make content from them.

The first run checks you're logged into Instagram in your browser (Chrome,
Brave, Edge, Firefox or Safari, whichever you have) and opens the login page
if not. All 1,068 take a few hours and a few GB.

Nothing of theirs gets reposted. Downloads stay on your computer (`media/` is
git-ignored) as reference. Only the structure carries over to Align.

| Path | What |
| --- | --- |
| `data/inspo.json` | every post from the spreadsheet: id, creator, type, link, caption |
| `data/decisions.json` | your calls, by post id (committed, so every session has them) |
| `media/<shortcode>/` | downloaded files: `01.mp4`, or `01.jpg`, `02.jpg`… for a carousel (not committed) |
| `media/_failed.json` | posts that didn't download, and why |
| `app/dist/review.html` | the review page with all posts baked in (`npm run build` after an import) |
| `out/brief.md`, `out/accepted.json` | the brief |
| `src/download.mjs` | the downloader |
| `src/review-server.mjs` | the review page on your computer |
| `out/GENERATOR.md` | your picks as build instructions for the endless generator (rewritten on every save) |
| `src/brief.mjs` | decisions → brief |
| `src/spins.mjs` | the suggested Align spins and how they're matched to posts |
| `src/spec.mjs` | decisions → `GENERATOR.md` |
| `mac/install.sh`, `mac/run.sh` | the one-click Mac setup and the Desktop buttons |

## 1. Download

Run this on **your own computer**, not in a cloud session: 1,068 videos are a
few GB, and Instagram treats cloud servers as bots. Needs Node 22+.

```bash
git pull
cd inspo
npm run download -- --limit 20          # try 20 first
npm run download                        # then the rest; safe to stop and re-run
```

There are two ways to get the files. The script uses whichever is set up, Meta first.

### Option A: Meta's official API (what your Meta developer account is for)

Meta's Business Discovery returns direct video and image links for posts on
public **Business or Creator** accounts. It's the sanctioned route, and no
Instagram login is involved. Limits:

- Personal and private accounts can't be read.
- Meta withholds the file for some reels with licensed music.
- It pages through each creator's posts newest first, so very old posts from
  prolific accounts take longer. Meta also rate-limits: when it says so, the
  script waits 15 minutes and carries on.

Setup (once, about 15 minutes):

1. Make your Instagram a professional account (Settings → Account type → Creator or Business)
   and link it to a Facebook Page.
2. At [developers.facebook.com](https://developers.facebook.com), create an app (type **Business**)
   and add **Instagram API with Facebook Login**.
3. In the Graph API Explorer, generate a user token with `instagram_basic`,
   `pages_show_list` and `business_management`, then exchange it for a
   long-lived (60-day) token.
4. Find your Instagram account's numeric id: in the Explorer, run
   `me/accounts?fields=instagram_business_account`.
5. Set them in your terminal (don't paste the token into a chat):

```bash
export IG_ACCESS_TOKEN=EAA…
export IG_USER_ID=1784…
npm run download -- --via meta
```

These are the same two variables `founder/` uses, so if you've set those up already, you're done.

### Option B: yt-dlp and gallery-dl (what the Mac buttons use)

[yt-dlp](https://github.com/yt-dlp/yt-dlp) (reels) and [gallery-dl](https://github.com/mikf/gallery-dl) (image posts and carousels) download public posts from any account,
including the ones Meta won't give. It isn't Meta's API, and scripted
downloading is against Instagram's terms of use, so it's your call. Keep it to
personal reference, go slowly, and use your own logged-in browser:

```bash
brew install yt-dlp gallery-dl   # or: pip install -U yt-dlp gallery-dl
npm run download -- --via ytdlp --cookies-from-browser chrome   # or safari / firefox
npm run download -- --via both  # Meta first, yt-dlp for what Meta couldn't give
```

It waits 3 seconds between posts (`--sleep 5` to go slower). After 8 failures in a row it
stops (exit code 75) rather than marking everything failed; run it again later.

### Options

| Flag | Does |
| --- | --- |
| `--via meta / ytdlp / both` | which downloader (default: both if both are set up) |
| `--limit 50` | only the next 50 |
| `--only i0001-i0200` | a range of ids (the `#` column of the spreadsheet) |
| `--creator kevbuildsapps` | one creator |
| `--type reel` / `carousel` / `post` | one kind |
| `--retry-failed` | try the posts in `media/_failed.json` again |
| `--cookies-from-browser chrome` | yt-dlp uses your browser's Instagram login |

## 2. Review

### On your computer (plays the downloads)

```bash
npm run review         # open http://localhost:4545
```

Downloaded posts play in the page (carousels page through with ‹ ›).
Posts you haven't downloaded use Instagram's own player. Every call is saved
straight to `data/decisions.json`.

### On your phone (claude.ai)

The same page is published at **https://claude.ai/artifact/3aW7pfUXRZhF8FbET5P9r6** (private
until you share it). Calls are saved to your Claude account, so they follow you between
phone and laptop. Videos can't play inside claude.ai, so each post opens
on Instagram; read the caption, tap **Watch on Instagram**, come back, decide.
**Draft a spin with Claude** writes an Align spin from the caption and your
notes, in Align's voice. Edit it before you keep it.

To bring phone calls into the repo, ask Claude Code: *"sync my inspo decisions
from the artifact into inspo/data/decisions.json and run the brief."* Or press
**Save decisions** on the page and run `npm run brief -- --merge ~/Downloads/decisions.json`.
The newer edit of each post wins.

### Suggested spins

Under **Align spin**, every post shows three suggested spins, picked from its
caption (a "comment X" post gets *Comment your sign*, a zodiac post gets *Dear
[sign]*, a Claude pipeline gets *Built with Claude Code*...). Tap one (or press
`Q`, `W`, `E`) to drop it into your spin, tick its uses, and mark the post
**Use it**. Edit it from there. There are 27 in `src/spins.mjs`; add your own
the same way.

### Instructions for Claude (the endless generator)

Every pick and every line of feedback is written into **`out/GENERATOR.md`**
a second or two after you save (on your computer), or shown under **Instructions for
Claude** at the top of the page (press `G`; copy or save it from there). It's a build
brief addressed to Claude Code for a program that never runs out of Align
content:

- each post you keep becomes a **recipe** (format, what to take, your feedback, your spin), weighted 3 for Use it and 1 for Maybe;
- recipes are crossed with things that change (the 12 signs, tonight's real sky, Align's features, story angles, talk cards), so there are thousands of combinations;
- your feedback becomes **taste rules** for every piece, and your skip reasons become **avoid** rules;
- it never repeats itself, writes scripts in the shapes `reels/`, `carousel/` and `founder/` already render, and reweights recipes from your trial-reel results.

When you're ready, send your picks and tell Claude: *"build the generator from my inspo."*

### Keys

| Key | Does |
| --- | --- |
| `A` / `M` / `R` | Use it / Maybe / Skip it (skip moves to the next post) |
| `1`–`9`, `0` | tick what to take: Hook, Format, Look, Editing, On-screen text, Sound, Caption/CTA, Carousel, Series, Automation |
| `J` `→` / `K` `←` | next / previous |
| `Q` / `W` / `E` | use suggested spin 1, 2 or 3 |
| `G` | instructions for Claude |
| `F` / `S` | write feedback / the Align spin; `Esc` to leave the box, `Ctrl+Enter` to save and go to the next post |
| `O` | open on Instagram |

The list on the left filters by status (start on **To review**), type, what
you ticked, or text (creator, caption, or your own notes).

## 3. Brief

```bash
npm run brief
```

- `out/brief.md`: your accepted posts grouped by what to take from them, each with
  your feedback and Align spin; then the maybes; then what you skipped and why, as a list of things to avoid.
  The top tells a content program how to use it: carry the structure over, never their words or footage, follow your spin,
  write in Align's voice (`founder/data/align-brief.json`).
- `out/accepted.json`: the same as data, with paths to the downloaded files.
- `founder/data/imports/inspo.csv`: accepted reels, filed under the creator `inspo`.
  `cd ../founder && npm run crunch` scores them and writes an Align
  talking-head script for each, which you can open in the Founder Studio.

Then, in Claude Code: *"Read inspo/out/brief.md and make the first five Align
reels from it with reels/."*

## Add more posts

Add rows to the spreadsheet (same columns: `#`, Creator, Type, Link, What it's about) and:

```bash
npm run import -- ~/Downloads/align-edits-inspo-serious.xlsx    # .csv works too
npm run build
```

Posts already on the list keep their id and your calls.

## Test

```bash
npm test     # no network: Meta is faked
```
