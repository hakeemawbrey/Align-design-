import { type Account, type DB, getSetting, hasSnapshot, listAccounts, markVideoChecked, markVideoGone, saveMediaSnapshots, saveSnapshot, setPageName, setSetting, videosDueForRefresh } from "./db";
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
  const videos = await snapshotVideosIfDue(db, now);
  return { ...result, snapshots, ...(videos ? { videos } : {}), ...(facebook ? { facebook } : {}) };
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
