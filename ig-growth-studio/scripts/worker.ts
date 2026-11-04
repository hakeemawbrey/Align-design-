/**
 * Publishes due posts every minute and records a daily follower snapshot.
 * Run alongside the web app: `npm run worker`.
 */
import { getAccount, getDb, saveSnapshot } from "../src/lib/db";
import { GraphClient } from "../src/lib/graph";
import { publishDuePosts } from "../src/lib/publisher";

const INTERVAL_MS = 60_000;
let lastSnapshotDay = "";

async function tick() {
  const db = getDb();
  const result = await publishDuePosts(db);
  const changed = result.published.length + result.failed.length + result.retried.length;
  if (changed > 0) console.log(new Date().toISOString(), JSON.stringify(result));

  const day = new Date().toISOString().slice(0, 10);
  const account = getAccount(db);
  if (account && day !== lastSnapshotDay) {
    const p = await new GraphClient({ token: account.token }).profile(account.igUserId);
    if (p.followers_count !== undefined) saveSnapshot(db, day, p.followers_count, p.follows_count ?? null, p.media_count ?? null);
    lastSnapshotDay = day;
  }
}

async function loop() {
  try {
    await tick();
  } catch (err) {
    console.error(new Date().toISOString(), "worker error:", err instanceof Error ? err.message : err);
  }
  setTimeout(loop, INTERVAL_MS);
}

console.log("Worker started. Checking for due posts every minute.");
void loop();
