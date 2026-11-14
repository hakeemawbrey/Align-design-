/**
 * Weekly report for one account: writes data/reports/<account>-<date>.md and prints it.
 *
 *   npm run report -- zodiac.advice444
 *
 * Read-only on Instagram. File names come from data/schedules/<account>.json when present. Never prints tokens.
 */
import fs from "node:fs";
import path from "node:path";
import { listAccounts, listSnapshots, openDb } from "../src/lib/db";
import { GraphClient } from "../src/lib/graph";
import { type ReelHistory, type ReelWeek, cumulative, reelWeeks, topBy } from "../src/lib/report";

const DAY = 86_400_000;
const fmt = new Intl.NumberFormat("en-US");
const n = (v: number | null | undefined) => (v === null || v === undefined ? "not available" : fmt.format(v));

async function main() {
  const username = process.argv[2];
  if (!username) throw new Error("Usage: npm run report -- <account>");
  const root = path.join(__dirname, "..", "data");
  const db = await openDb(`file:${path.join(root, "studio.db")}`);
  const account = (await listAccounts(db)).find((a) => a.username === username);
  if (!account) throw new Error(`@${username} is not connected`);

  const now = new Date();
  const since = new Date(now.getTime() - 7 * DAY);
  const scheduleFile = path.join(root, "schedules", `${username}.json`);
  const schedule = fs.existsSync(scheduleFile)
    ? (JSON.parse(fs.readFileSync(scheduleFile, "utf8")) as { posts: { postId: number; file: string }[] })
    : { posts: [] };
  const fileByPost = new Map(schedule.posts.map((p) => [p.postId, p.file]));

  const posts = (
    await db.execute({ sql: "SELECT id, status, ig_media_id, error, scheduled_at, updated_at FROM posts WHERE ig_user_id = ?", args: [account.igUserId] })
  ).rows;
  const inWeek = (at: unknown) => new Date(String(at)).getTime() >= since.getTime() && new Date(String(at)).getTime() <= now.getTime();
  const published = posts.filter((p) => p.status === "published");
  const publishedWeek = published.filter((p) => inWeek(p.updated_at));
  const failedWeek = posts.filter((p) => p.status === "failed" && inWeek(p.scheduled_at));
  const nameByMedia = new Map(published.map((p) => [String(p.ig_media_id), fileByPost.get(Number(p.id))]));

  const info = (await db.execute({ sql: "SELECT media_id, permalink FROM media_info WHERE ig_user_id = ?", args: [account.igUserId] })).rows;
  const snaps = (
    await db.execute({
      sql: `SELECT s.media_id, s.at, s.views, s.reach, s.saves, s.shares FROM media_snapshots s
            JOIN media_info i ON i.media_id = s.media_id WHERE i.ig_user_id = ? ORDER BY s.at`,
      args: [account.igUserId],
    })
  ).rows;
  const reels: ReelHistory[] = info.map((i) => ({
    name: nameByMedia.get(String(i.media_id)) ?? String(i.permalink ?? i.media_id),
    permalink: i.permalink === null ? null : String(i.permalink),
    history: snaps
      .filter((s) => s.media_id === i.media_id)
      .map((s) => ({
        at: String(s.at),
        views: Number(s.views),
        reach: s.reach === null ? null : Number(s.reach),
        saves: s.saves === null ? null : Number(s.saves),
        shares: s.shares === null ? null : Number(s.shares),
      })),
  }));
  const weeks = reelWeeks(reels, since);
  const total = cumulative(reels);
  const sum = (key: keyof Pick<ReelWeek, "views" | "saves" | "shares">) => weeks.reduce((t, w) => t + w[key], 0);

  const client = new GraphClient({ token: account.token });
  const week = await client.accountTotals(account.igUserId, since, now, ["views", "reach"]).catch(() => null);
  const previous = await client.accountTotals(account.igUserId, new Date(since.getTime() - 7 * DAY), since, ["views", "reach"]).catch(() => null);
  const followers = await listSnapshots(db, account.igUserId, 400);
  const latestFollowers = followers[followers.length - 1]?.followers ?? null;
  const weekDay = since.toISOString().slice(0, 10);
  const baseFollowers = [...followers].reverse().find((f) => f.day <= weekDay)?.followers ?? followers[0]?.followers ?? null;

  const table = (rows: ReelWeek[], key: "saves" | "shares") =>
    rows.length
      ? rows.map((r, i) => `${i + 1}. ${r.permalink ? `[${r.name}](${r.permalink})` : r.name}: ${fmt.format(r[key])} ${key}, ${fmt.format(r.views)} plays`).join("\n")
      : "None yet.";
  const reachDrop = week?.reach !== undefined && previous?.reach ? Math.round(((week.reach - previous.reach) / previous.reach) * 100) : null;

  const lines = [
    `# Weekly report: @${username}`,
    "",
    `${since.toLocaleDateString()} to ${now.toLocaleDateString()}, generated ${now.toLocaleString()}`,
    "",
    "## Posts",
    `- Published this week: ${fmt.format(publishedWeek.length)} (all time: ${fmt.format(published.length)})`,
    `- Failed or skipped this week: ${fmt.format(failedWeek.length)}`,
    ...failedWeek.map((p) => `  - ${fileByPost.get(Number(p.id)) ?? `Post ${p.id}`}: ${String(p.error ?? "no reason recorded")}`),
    `- Still queued: ${fmt.format(posts.filter((p) => p.status === "scheduled").length)}`,
    "",
    "## Numbers",
    "| | This week | Cumulative |",
    "| --- | --- | --- |",
    `| Followers | ${latestFollowers !== null && baseFollowers !== null ? `${latestFollowers - baseFollowers >= 0 ? "+" : ""}${fmt.format(latestFollowers - baseFollowers)}` : "not available"} | ${n(latestFollowers)} |`,
    `| Account reach | ${n(week?.reach)} | not available (reach can't be added across weeks) |`,
    `| Plays (tracked Reels) | ${fmt.format(sum("views"))} | ${fmt.format(total.views)} |`,
    `| Saves (tracked Reels) | ${fmt.format(sum("saves"))} | ${fmt.format(total.saves)} |`,
    `| Shares (tracked Reels) | ${fmt.format(sum("shares"))} | ${fmt.format(total.shares)} |`,
    "",
    "## Top 10 by saves this week",
    table(topBy(weeks, "saves"), "saves"),
    "",
    "## Top 10 by shares this week",
    table(topBy(weeks, "shares"), "shares"),
    "",
    "## Account warnings",
    "Instagram's API doesn't report warnings or action blocks, so check Account Status in the Instagram app.",
    reachDrop === null ? "Reach compared with last week: not available." : `Reach compared with last week: ${reachDrop >= 0 ? "+" : ""}${reachDrop}%.`,
    "",
  ];
  const out = lines.join("\n");
  const dir = path.join(root, "reports");
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${username}-${now.toISOString().slice(0, 10)}.md`);
  fs.writeFileSync(file, out);
  console.log(out);
  console.log(`Saved to ${file}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
