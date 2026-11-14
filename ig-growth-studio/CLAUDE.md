# IG Growth Studio: working with Claude

This app schedules Instagram posts for several accounts through Meta's official API. You (Claude) can
plan content and manage the queue through a local API. The owner reviews everything in the app.

## Rules

- **Never** like, follow, DM, or send comment replies, and never try to publish immediately. The API has no
  endpoints for these on purpose; do not work around that (no direct Graph API calls, no database edits).
- Comment replies are **drafts only**. The owner edits and sends each one on the Engage page.
- Never print, echo or commit `.env`, `AGENT_API_KEY`, the App Secret or access tokens. Use `npm run agent`,
  which reads the key itself.
- Check with the owner before queuing more than a handful of posts at once, or anything for today.
- Write captions in the account's own voice (read its recent captions from `/stats` first). At most
  30 hashtags and 2,200 characters.

## Calling the API

The web app must be running (`npm start`; publishing also needs `npm run worker`). From `ig-growth-studio/`:

```bash
npm run --silent agent -- GET /                         # endpoint list
npm run --silent agent -- GET /accounts
npm run --silent agent -- GET "/stats?account=comealign"
npm run --silent agent -- GET "/posts?account=comealign&from=2026-11-01&to=2026-12-01"
npm run --silent agent -- GET "/comments?account=comealign"
npm run --silent agent -- POST /posts '{"account":"comealign","type":"REELS","mediaUrl":"https://…/clip.mp4","caption":"…","scheduledAt":"2026-11-06T18:00:00-06:00","trial":"SS_PERFORMANCE"}'
npm run --silent agent -- POST /drafts '{"account":"comealign","commentId":"1789…","text":"Thank you!"}'
npm run --silent agent -- DELETE /posts/12
```

For long JSON, write it to a file in a temp folder and pass `@path/to/body.json`.

### Posts

| Field | Notes |
| --- | --- |
| `account` | Username or IG user ID. Omit for the account selected in the app. |
| `type` | `IMAGE` (JPEG) or `REELS` (MP4, H.264/AAC). A photo (.jpg/.png/.webp) queued as `REELS` is turned into a 10-second video at publish time, so Reels audio can add music to it. |
| `mediaUrl` | Public `https://` URL Instagram can download at publish time. You cannot upload files. |
| `scheduledAt` | ISO 8601 **with offset**, at least 2 minutes ahead. Ask the owner's time zone if unsure. |
| `trial` | Reels only. `MANUAL`: shown to non-followers; the owner shares it with followers in the Instagram app. `SS_PERFORMANCE`: same, but Instagram shares it with followers automatically if it performs well. Omit for a normal Reel. |
| `shareToFeed` | Normal Reels only (default `true`). |

### Reels audio

`GET /audio?account=…` shows the account's setting and what's trending now (`&q=lofi` to search).
`POST /audio '{"account":"…","mode":"trending","videoVolume":20}'` switches it on for every Reel not yet published
(`mode`: `off`, `trending`, or `search` with `query`; `"muteVideo":true` silences the video's own sound). It changes the whole queue, so ask the owner first.

Instagram allows about 100 API posts per account per 24 hours. Spread posts out; one to two a day per account
is a sensible default.

## Good recurring tasks

- "Each Monday, read `/stats` for every account and queue next week's posts from the links in <file>."
- "Each morning, draft replies to new comments on @comealign" (`GET /comments`, then `POST /drafts`).
- "Summarise last week: follower change and best posts by engagement per reach, per account."

## Code

Next.js 15 + SQLite. Agent routes: `src/app/api/agent/*`, auth and docs in `src/lib/agent.ts`. Run
`npm test` and `npm run typecheck` after changes.
