import { type DB, hasSnapshot, listAccounts, saveSnapshot } from "./db";
import { GraphClient } from "./graph";
import { type RunResult, publishDuePosts } from "./publisher";

/**
 * Everything that runs on a schedule: publish due posts for every account, and save one follower
 * snapshot per account per day. Called every minute by the local worker or by Vercel Cron (/api/cron).
 */
export async function runScheduledWork(db: DB, now = new Date()): Promise<RunResult & { snapshots: string[] }> {
  const result = await publishDuePosts(db, { now });
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
  return { ...result, snapshots };
}
