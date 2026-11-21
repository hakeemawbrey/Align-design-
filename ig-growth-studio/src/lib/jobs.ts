import { type Account, type DB, getSetting, listAccountDays, saveAccountDay, hasSnapshot, listAccounts, markVideoChecked, markVideoGone, saveMediaSnapshots, saveSnapshot, setPageName, setSetting, videosDueForRefresh } from "./db";
import { saveDailyRoundIfDue } from "./analysisRounds";
import { type FbRunResult, publishFacebookDue } from "./facebook";
import { GraphClient, GraphError } from "./graph";
import { type RunResult, publishDuePosts } from "./publisher";

/**
 * Everything that runs on a schedule: publish due posts for every account, and save one follower
 * snapshot per account per day. Called every minute by the local worker or by Vercel Cron (/api/cron).
 */
export async function runScheduledWork(
  db: DB,
  now = new Date(),
  source = "worker",
): Promise<RunResult & { snapshots: string[]; videos?: number; facebook?: FbRunResult }> {
  // Shown on Settings, so it is easy to see that the scheduler is alive.
  await setSetting(db, "last_run", JSON.stringify({ at: now.toISOString(), source }));
  const result = await publishDuePosts(db, { now });
  // Facebook runs separately so a Facebook problem never holds up Instagram.
  let facebook: FbRunResult | undefined;
  try {
    const fb = await publishFacebookDue(db, { now });
    if (fb.started.length + fb.published.length + fb.failed.length) facebook = fb;
  } catch (err) {
    console.error("facebook:", err instanceof Error ? err.message : err);
  }
  const day = now.toISOString().slice(0, 10);
  const snapshots: string[] = [];
  for (const account of await listAccounts(db)) {
    if (await hasSnapshot(db, account.igUserId, day)) continue;
    try {
      const p = await new GraphClient({ token: account.token }).profile(account.igUserId);
      if (p.followers_count !== undefined) {
        await saveSnapshot(db, account.igUserId, day, p.followers_count, p.follows_count ?? null, p.media_count ?? null);
        snapshots.push(account.username);
      }
    } catch (err) {
      console.error(`snapshot @${account.username}:`, err instanceof Error ? err.message : err);
    }
  }
  await saveAccountDaysIfDue(db, now);
  try {
    await saveDailyRoundIfDue(db, now);
  } catch (err) {
    console.error("analysis round:", err instanceof Error ? err.message : err);
  }
  const videos = await snapshotVideosIfDue(db, now);
  return { ...result, snapshots, ...(videos ? { videos } : {}), ...(facebook ? { facebook } : {}) };
}

/** How far back the views-over-time chart goes, and how often the saved days are refreshed. */
export const ACCOUNT_DAYS_BACK = 30;
const ACCOUNT_DAYS_EVERY_MS = 6 * 3_600_000;
/** Instagram keeps adjusting a day's numbers for a while, so recent days are fetched again. */
const ACCOUNT_DAY_SETTLE_MS = 3 * 86_400_000;

/**
 * Every 6 hours: each account's views, reach and interactions for each finished day of the last 30 (local time),
 * fetching only days not saved yet or still settling. Today is read live on the dashboard instead.
 */
export async function saveAccountDaysIfDue(db: DB, now = new Date()): Promise<number | null> {
  const last = await getSetting(db, "account_days_at");
  const accounts = await listAccounts(db);
  // Also due right after midnight, so yesterday's bar never waits for the 6-hour timer.
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = dayKeyOf(new Date(midnight.getFullYear(), midnight.getMonth(), midnight.getDate() - 1));
  const savedYesterday = new Set((await listAccountDays(db, yesterday)).filter((d) => d.day === yesterday).map((d) => d.igUserId));
  const missing = accounts.some((a) => !savedYesterday.has(a.igUserId));
  const recent = last && now.getTime() - new Date(last).getTime() < ACCOUNT_DAYS_EVERY_MS - 30_000;
  // A missing day is retried at most every 15 minutes, so an Instagram outage doesn't mean a call every minute.
  const retriedLately = last && now.getTime() - new Date(last).getTime() < 15 * 60_000;
  if (recent && (!missing || retriedLately)) return null;
  await setSetting(db, "account_days_at", now.toISOString());
  let saved = 0;
  for (const account of accounts) {
    try {
      saved += await saveAccountDays(db, account, now);
    } catch (err) {
      console.error(`account days @${account.username}:`, err instanceof Error ? err.message : err);
    }
  }
  return saved;
}

export async function saveAccountDays(db: DB, account: Account, now: Date, client = new GraphClient({ token: account.token })) {
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const day = (back: number) => new Date(midnight.getFullYear(), midnight.getMonth(), midnight.getDate() - back);
  const have = new Map((await listAccountDays(db, dayKeyOf(day(ACCOUNT_DAYS_BACK)), account.igUserId)).map((d) => [d.day, d]));
  let saved = 0;
  let firstError: unknown = null;
  // Newest first, and one bad day doesn't stop the rest.
  for (let back = 1; back <= ACCOUNT_DAYS_BACK; back++) {
    const since = day(back);
    const until = day(back - 1);
    const key = dayKeyOf(since);
    const prior = have.get(key);
    // Saved once the day had settled: keep it.
    if (prior && new Date(prior.savedAt).getTime() - until.getTime() >= ACCOUNT_DAY_SETTLE_MS) continue;
    try {
      const t = await client.accountTotals(account.igUserId, since, until);
      await saveAccountDay(db, { igUserId: account.igUserId, day: key, views: t.views ?? 0, reach: t.reach ?? null, interactions: t.total_interactions ?? null }, now);
      saved++;
    } catch (err) {
      firstError ??= err;
    }
  }
  if (firstError && !saved) throw firstError;
  if (firstError) console.error(`account days @${account.username}: some days failed:`, firstError instanceof Error ? firstError.message : firstError);
  return saved;
}

function dayKeyOf(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

const VIDEO_SNAPSHOT_EVERY_MS = 60 * 60_000;
/** Videos younger than this keep getting hourly counts. */
const VIDEO_TRACK_DAYS = 7;
/** Videos outside the hourly check are refreshed this often, at most this many per account per run. */
const OLDER_VIDEO_REFRESH_MS = 6 * 3_600_000;
const OLDER_VIDEO_BATCH = 50;
const VIDEO_METRICS = ["views", "reach", "total_interactions", "saved", "shares"];

/** Once an hour: the view count of each account's recent videos, for the "Top videos" progress charts. */
export async function snapshotVideosIfDue(db: DB, now = new Date()): Promise<number | null> {
  const last = await getSetting(db, "video_snapshot_at");
  if (last && now.getTime() - new Date(last).getTime() < VIDEO_SNAPSHOT_EVERY_MS - 30_000) return null;
  await setSetting(db, "video_snapshot_at", now.toISOString());
  let saved = 0;
  await refreshPageNames(db);
  for (const account of await listAccounts(db)) {
    try {
      saved += await snapshotAccountVideos(db, account, now);
    } catch (err) {
      console.error(`video snapshot @${account.username}:`, err instanceof Error ? err.message : err);
    }
  }
  return saved;
}

/** Records the Facebook Page now linked to each account, so Facebook cross-posting can be offered for it. */
export async function refreshPageNames(db: DB) {
  const byToken = new Map<string, Promise<Map<string, { name: string }>>>();
  for (const account of await listAccounts(db)) {
    if (!byToken.has(account.token)) byToken.set(account.token, new GraphClient({ token: account.token }).pagesByInstagram().catch(() => new Map()));
    const page = (await byToken.get(account.token)!).get(account.igUserId);
    if (page) await setPageName(db, account.igUserId, page.name);
  }
}

export async function snapshotAccountVideos(db: DB, account: Account, now: Date, client = new GraphClient({ token: account.token })) {
  const cutoff = now.getTime() - VIDEO_TRACK_DAYS * 86_400_000;
  // Up to ~30 posts a day go out, so look far enough back to cover the newest ones.
  const media = (await client.recentMedia(account.igUserId, 50)).data.filter(
    (m) => m.media_type === "VIDEO" && new Date(m.timestamp).getTime() >= cutoff,
  );
  const results = await Promise.all(
    media.map((m) =>
      client.mediaInsights(m.id, VIDEO_METRICS).then(
        (v) => ({
          mediaId: m.id,
          igUserId: account.igUserId,
          postedAt: new Date(m.timestamp).toISOString(),
          kind: m.media_product_type ?? m.media_type,
          permalink: m.permalink ?? null,
          thumbnailUrl: m.thumbnail_url ?? null,
          caption: m.caption ?? null,
          views: v.views ?? 0,
          reach: v.reach ?? null,
          interactions: v.total_interactions ?? null,
          saves: v.saved ?? null,
          shares: v.shares ?? null,
        }),
        // A video still processing has no insights yet; it is picked up next hour.
        () => null,
      ),
    ),
  );
  const rows = results.filter((r) => r !== null);
  await saveMediaSnapshots(db, now, rows);
  return rows.length + (await refreshOlderVideos(db, account, now, client));
}

/** Keeps counts moving on videos that have left the hourly check, a limited batch per run. */
async function refreshOlderVideos(db: DB, account: Account, now: Date, client: GraphClient) {
  const due = await videosDueForRefresh(db, account.igUserId, new Date(now.getTime() - OLDER_VIDEO_REFRESH_MS), OLDER_VIDEO_BATCH);
  const results = await Promise.all(
    due.map((video) =>
      client.mediaInsights(video.mediaId, VIDEO_METRICS).then(
        (v) => ({ ...video, views: v.views ?? 0, reach: v.reach ?? null, interactions: v.total_interactions ?? null, saves: v.saved ?? null, shares: v.shares ?? null }),
        async (err: unknown) => {
          if (isDeleted(err)) await markVideoGone(db, video.mediaId, now);
          else await markVideoChecked(db, video.mediaId, now);
          return null;
        },
      ),
    ),
  );
  const rows = results.filter((r) => r !== null);
  await saveMediaSnapshots(db, now, rows);
  return rows.length;
}

/** Instagram's answer for a video that no longer exists. */
function isDeleted(err: unknown) {
  return err instanceof GraphError && err.code === 100 && err.subcode === 33;
}
