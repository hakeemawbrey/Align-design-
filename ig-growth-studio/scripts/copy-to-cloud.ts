/**
 * Moves everything from the local SQLite file into the cloud app's database: accounts, the post queue and
 * history, niche lists, likes, follower history, drafts and settings.
 *
 *   STUDIO_URL=https://ig-growth-studio.vercel.app npm run copy-to-cloud              # dry run: counts only
 *   STUDIO_URL=https://ig-growth-studio.vercel.app npm run copy-to-cloud -- --commit
 *
 * Stop the local worker first: only one database may publish. Uses CRON_SECRET from .env.
 * Refuses if the cloud already has accounts or posts (add --replace to overwrite).
 */
import fs from "node:fs";
import path from "node:path";
import { openDb } from "../src/lib/db";
import { exportDump } from "../src/lib/dump";

function loadEnv(file: string) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2];
  }
}

async function main() {
  loadEnv(path.join(__dirname, "..", ".env"));
  const url = process.env.STUDIO_URL;
  if (!url?.startsWith("https://")) throw new Error("Set STUDIO_URL to the cloud app, e.g. https://ig-growth-studio.vercel.app");
  const local = await openDb(`file:${path.resolve(process.env.DATABASE_PATH || path.join(__dirname, "..", "data", "studio.db"))}`);
  const dump = await exportDump(local);
  const posts = dump.tables.posts;
  const statusIdx = posts.columns.indexOf("status");
  const scheduled = posts.rows.filter((r) => r[statusIdx] === "scheduled").length;
  console.log(`local: ${dump.tables.accounts.rows.length} accounts, ${posts.rows.length} posts (${scheduled} still scheduled)`);
  const res = await fetch(`${url.replace(/\/$/, "")}/api/admin/restore`, {
    method: "POST",
    headers: { authorization: `Bearer ${process.env.CRON_SECRET ?? ""}`, "content-type": "application/json" },
    body: JSON.stringify({ dump, replace: process.argv.includes("--replace"), dryRun: !process.argv.includes("--commit") }),
  });
  const out = await res.json();
  console.log(JSON.stringify(out, null, 2));
  if (!res.ok) process.exit(1);
  if (!process.argv.includes("--commit")) console.log("Dry run only. Add --commit to copy.");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
