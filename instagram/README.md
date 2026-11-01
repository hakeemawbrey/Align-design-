# Align on Instagram

Post Align reels to one or more Instagram accounts as **trial reels**, then pull
back how they did: 3-second skip rate, average watch time, views, shares and
saves. Everything goes through Meta's official Instagram API. No passwords, no
scraping, no third-party service.

The loop:

1. Render a reel (`reels/README.md`, `reels/town/README.md`).
2. `npm run post -- leo --all` posts it as a trial reel on every account.
   Trial reels are shown to non-followers first.
3. A day or two later, `npm run stats` ranks every post. The reels with the
   lowest skip rate and the longest watch time tell you which hooks to write more of.
4. If a trial does well, share it to your followers from the Instagram app,
   or post with `--trial auto` so Meta does it for you.

| Path | What |
| --- | --- |
| `src/ig.mjs` | accounts from the environment, publishing, insights |
| `src/cli.mjs` | the `accounts`, `post` and `stats` commands |
| `data/posts.json` | every post made: account, reel, link, latest stats |
| `data/stats.csv` | the same ranked best first, for a spreadsheet |

`data/` is meant to be committed. Cloud sessions start fresh, and this is how
`stats` knows what was posted.

## Setup (once per account)

Each account must be an Instagram **professional account** (Business or
Creator). Trial reels also need a public account with 200+ followers for
Business/Creator accounts, or 1,000+ for personal ones.

You need one Meta app. Every account connects to the same app.

1. At [developers.facebook.com](https://developers.facebook.com), create an app
   (type **Business**).
2. Pick one way to log in:
   - **Instagram API with Facebook Login (recommended).** Link each Instagram account
     to a Facebook Page. Generate a user token with `instagram_basic`,
     `instagram_content_publish`, `instagram_manage_insights`,
     `pages_show_list` and `pages_read_engagement`. This is the only way to
     **upload a video file straight from this repo**.
   - **Instagram API with Instagram Login.** No Facebook Page needed. Use
     `instagram_business_basic`, `instagram_business_content_publish` and
     `instagram_business_manage_insights`. Meta won't take a file upload this
     way, so each video needs a public link (`--url`).
3. Exchange the short-lived token for a **long-lived (60-day)** one, and renew
   it before it runs out.
4. In the cloud environment's settings (the environment menu in the session
   title bar → Edit), add one variable per account. **Never paste a token into
   the chat.**

```
IG_MAIN_TOKEN=EAA…          # required: the account's token; "MAIN" becomes the name "main"
IG_MAIN_USER_ID=1784…       # optional: looked up from the token if left out
IG_MAIN_LOGIN=facebook      # optional: facebook | instagram, guessed from the token

IG_SIGNS_TOKEN=EAA…         # a second account, called "signs"
IG_FOUNDER_TOKEN=IGAA…      # a third, on Instagram Login
```

The older `IG_ACCESS_TOKEN` / `IG_USER_ID` pair used by `founder/` still
works. It shows up as the account `default`.

Start a new session so it picks the variables up, then check them:

```bash
cd instagram
npm run accounts
# main: @align (1784…, facebook login, 100 of 100 posts left today)
# signs: @align.signs (1785…, facebook login, 100 of 100 posts left today)
```

## Post

A reel is named by its script id (`05-leo`), the part after the number
(`leo`, `full-moon-taurus`), a zodiac sign, or a path to any `.mp4`. Script
reels bring their own caption and hashtags.

```bash
npm run post -- leo --account main               # one reel, one account
npm run post -- leo virgo libra --all            # three reels, every account
npm run post -- full-moon-taurus --account main,signs --trial auto
npm run post -- ~/clip.mp4 --caption "dear leo," --account founder
npm run post -- leo --account founder --url https://…/05-leo.mp4   # Instagram Login
npm run post -- leo --all --dry-run              # show what would happen
```

| Flag | Does |
| --- | --- |
| `--account a,b` / `--all` | which accounts (not needed if only one is set up) |
| `--trial manual` | the default: a trial reel you share to followers from the app |
| `--trial auto` | a trial Meta shares to followers if it does well |
| `--public` | a normal reel, not a trial |
| `--caption "…"` | replace the script's caption |
| `--url https://…` | a public link to the video instead of uploading the file |
| `--cover-ms 2500` | the cover frame, in milliseconds from the start |
| `--no-feed` | Reels tab only, not the profile grid |
| `--again` | post a reel an account already has |
| `--dry-run` | check everything, post nothing |

Each post takes a minute or two while Meta processes the video. A reel an
account already has is skipped unless you pass `--again`. Before each post, the
tool checks how many API posts the account has left (Meta allows 100 in any 24 hours).

**Posting the same video to several accounts.** Instagram can treat identical
reels across accounts as unoriginal and show them to fewer people. Give each
account its own reels (for example, signs on one and town on another), or at
least a different caption and cover.

## Stats

```bash
npm run stats                    # every account
npm run stats -- --account main
```

```
account  reel         views  avg watch   skip  shares  saves
main     05-leo       4,210       8.4s  31.0%      52     88
signs    08-scorpio   2,980       6.1s  44.5%      17     40
```

Best first: lowest skip rate (the share of viewers who swipe away in the first
3 seconds), then longest average watch. Meta marks skip rate and views as
estimates still in development. If Meta hasn't turned on a metric for an
account yet, that column stays blank rather than failing. Run it again any
time; each run refreshes every post.

## Test

```bash
npm test     # no network: Meta is faked
```
