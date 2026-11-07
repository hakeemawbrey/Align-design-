/**
 * Local runner: publishes due posts for every connected account each minute and records a daily follower
 * snapshot per account. In the cloud, Vercel Cron calls /api/cron instead; never run both against one database.
 */
import { getDb } from "../src/lib/db";
import { runScheduledWork } from "../src/lib/jobs";

const INTERVAL_MS = 60_000;

async function loop() {
  try {
    const result = await runScheduledWork(await getDb());
    const changed = result.published.length + result.failed.length + result.retried.length + result.snapshots.length + (result.videos ? 1 : 0) + (result.facebook ? 1 : 0);
    if (changed > 0) console.log(new Date().toISOString(), JSON.stringify(result));
  } catch (err) {
    console.error(new Date().toISOString(), "worker error:", err instanceof Error ? err.message : err);
  }
  setTimeout(loop, INTERVAL_MS);
}

console.log("Worker started. Checking for due posts every minute.");
void loop();
