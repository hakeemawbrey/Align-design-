# IG Growth Studio

A small self-hosted app for growing a new Instagram account the way Instagram allows, using only
Meta's official **Instagram API with Facebook Login** (Graph API v26.0).

| Page | What it does |
| --- | --- |
| **Dashboard** | Followers, following and post counts; a daily follower history; reach, views, likes, comments, saves, shares and engagement rate for your 12 most recent posts. |
| **Schedule** | Queue image posts, Reels and **Trial Reels** for any connected account. See the queue on a **calendar** or as a list. A worker publishes each post to its account, waits for Reels to finish processing, retries on rate limits and records errors. |
| **Engage** | Comments on your posts that still need a reply (reply inline, or send a reply Claude drafted), plus recent posts from accounts in your niche with a one-click Like. |
| **Settings** | Add, select or remove Instagram accounts; check configuration. |

### Several accounts

Connect as many Instagram accounts as you manage. **Settings → Add or refresh accounts** keeps the accounts you
already have; on Facebook choose *Edit settings* to tick more Pages, or log into another Facebook account. The
header dropdown picks which account the Dashboard and Engage pages show. Posts, likes (and the daily cap), niche
lists, follower history and drafts are kept per account.

### Trial Reels

When scheduling a Reel, choose a Trial Reel to show it to non-followers first. Pick whether you share it with
followers yourself in the Instagram app, or let Instagram share it automatically if it performs well.

### Claude automation

Set `AGENT_API_KEY` in `.env` and Claude (in Claude Code, or a recurring scheduled task) can plan content, queue
posts and Trial Reels, read stats and comments, and draft comment replies through `/api/agent`. It cannot like,
follow, DM, send replies or publish immediately. See [CLAUDE.md](CLAUDE.md); `npm run agent` calls the API with the
key from `.env`.

## What it deliberately does not do

No auto-liking, auto-following, mass DMs or scraping. Every like and reply is a click by you.
Likes are capped per day (`DAILY_LIKE_CAP`, default 30) and spaced at least 4 seconds apart.
Meta's own limit is 50 like requests in 5 seconds, after which the account is locked out of the
endpoint for an hour. Meta's Platform Terms forbid inauthentic engagement, so keep it human.

## Requirements

- An Instagram **Business or Creator** account linked to a **Facebook Page** you manage.
- A Meta app at [developers.facebook.com](https://developers.facebook.com/apps) with the
  *Instagram API with Facebook Login* use case.
- Node.js 20+.

### Permissions the app requests

`instagram_basic`, `instagram_content_publish`, `instagram_manage_comments`, `instagram_manage_insights`,
`instagram_manage_engagement` (likes), `pages_show_list`, `pages_read_engagement`, `business_management`.

In development mode these work for people who have a role on the Meta app. Using them for anyone
else's account requires Meta's App Review.

## Setup

```bash
npm install
cp .env.example .env   # then fill it in
npm run build
npm start              # web app on http://localhost:3000
npm run worker         # in a second terminal: publishes scheduled posts every minute
```

1. In the Meta app, add `${APP_URL}/api/auth/meta/callback` as a valid OAuth redirect URI.
   If the app uses **Facebook Login for Business**, create a configuration (user access token,
   with the permissions below) and put its ID in `META_LOGIN_CONFIG_ID`.
2. Open the app, sign in with `APP_PASSWORD`, then go to **Settings → Connect with Facebook**.
3. Facebook issues a long-lived token (about 60 days). Settings shows when it expires; click
   **Reconnect** before then.

### Running without a long-running worker

Set `CRON_SECRET` and call this endpoint every minute or so:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" https://your-app.example.com/api/cron
```

Data is stored in SQLite (`DATABASE_PATH`), so host it somewhere with a persistent disk (a VPS,
Fly.io, Railway, Render with a disk, and so on). Serverless platforms with a read-only file system
need a different database.

## Posting notes

- Media must be at a **public https URL** Instagram can download: JPEG for images, MP4 (H.264/AAC)
  for Reels. Instagram fetches the file at publish time, so keep it online until then.
- Captions: up to 2,200 characters and 30 hashtags.
- The API limits how many posts can be published per 24 hours; the Schedule page shows current usage.

## Development

```bash
npm test          # vitest: publisher, likes, sessions, API client
npm run typecheck
npm run dev
```

## Possible next steps

- Carousel posts, Stories, partnership labels, Reels audio and the AI-content disclosure flag
  (all supported by recent API versions).
- Upload media to your own storage instead of pasting a URL.
- Best-time-to-post suggestions from audience insights.
