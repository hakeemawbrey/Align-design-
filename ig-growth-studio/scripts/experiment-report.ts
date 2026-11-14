/**
 * Compares the test and control posts of an experiment saved in data/experiments/<id>.json.
 *
 *   npm run experiment -- exp-2026-11-05-no-cta
 *
 * Views at 24 hours come from the worker's hourly video counts, so every post is compared at the same age.
 * Read-only: it changes nothing and never prints tokens.
 */
import fs from "node:fs";
import path from "node:path";
import { summarise } from "../src/lib/experiment";
import { type DB, openDb } from "../src/lib/db";

interface PlanPost {
  id: number;
  account: string;
  trial: string | null;
  group: "test" | "control";
}

async function rows(db: DB, id: number) {
  const post = (await db.execute({ sql: "SELECT status, ig_media_id, updated_at FROM posts WHERE id = ?", args: [id] })).rows[0];
  const mediaId = post?.ig_media_id ? String(post.ig_media_id) : null;
  if (!mediaId) return { status: String(post?.status ?? "missing"), postedAt: null, history: [] };
  const info = (await db.execute({ sql: "SELECT posted_at FROM media_info WHERE media_id = ?", args: [mediaId] })).rows[0];
  const history = (
    await db.execute({ sql: "SELECT at, views, reach, interactions FROM media_snapshots WHERE media_id = ? ORDER BY at", args: [mediaId] })
  ).rows.map((r) => ({
    at: String(r.at),
    views: Number(r.views),
    reach: r.reach === null ? null : Number(r.reach),
    interactions: r.interactions === null ? null : Number(r.interactions),
  }));
  return { status: String(post.status), postedAt: info ? String(info.posted_at) : null, history };
}

async function main() {
  const id = process.argv[2];
  if (!id) throw new Error("Usage: npm run experiment -- <experiment id>");
  const root = path.join(__dirname, "..", "data");
  const exp = JSON.parse(fs.readFileSync(path.join(root, "experiments", `${id}.json`), "utf8")) as { hypothesis: string; change: string; posts: PlanPost[] };
  const db = await openDb(`file:${path.join(root, "studio.db")}`);
  const posts = await Promise.all(exp.posts.map(async (p) => ({ ...p, ...(await rows(db, p.id)) })));
  console.log(JSON.stringify({ id, hypothesis: exp.hypothesis, change: exp.change, ...summarise(posts, new Date()) }, null, 2));
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
