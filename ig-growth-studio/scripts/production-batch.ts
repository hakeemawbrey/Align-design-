/**
 * Writes a film farm batch from ideas sent to production in the Reel Ideas Lab.
 *
 *   npm run --silent production-batch -- <ideas.json> <checkout of claude/align-promo-video>
 *
 * ideas.json: [{ docId, account, format, sign, hook, ending }] (the queued docs, read by Claude from the Ideas Lab).
 * Writes promo/posting/v3/batches/ideas-<date>-<time>.json in that checkout and prints JSON:
 * { batch, file, films: [{ docId, filmId }], skipped: [{ docId, reason }] }. It doesn't commit or push.
 */
import fs from "node:fs";
import path from "node:path";
import { type ProductionIdea, buildBatch } from "../src/lib/production";

function main() {
  const [ideasFile, repo] = process.argv.slice(2);
  if (!ideasFile || !repo) throw new Error("Usage: npm run production-batch -- <ideas.json> <checkout of claude/align-promo-video>");
  const ideas = JSON.parse(fs.readFileSync(ideasFile, "utf8")) as ProductionIdea[];
  const v3 = path.join(repo, "promo", "posting", "v3");
  const batchesDir = path.join(v3, "batches");
  if (!fs.existsSync(batchesDir)) throw new Error(`${batchesDir} not found: is that a checkout of claude/align-promo-video?`);
  const ids = new Set<string>();
  let maxSeed = 0;
  for (const f of fs.readdirSync(batchesDir).filter((f) => f.endsWith(".json"))) {
    const data = JSON.parse(fs.readFileSync(path.join(batchesDir, f), "utf8")) as { id?: string; music?: { seed?: number } }[];
    for (const item of Array.isArray(data) ? data : []) {
      if (item.id) ids.add(item.id);
      maxSeed = Math.max(maxSeed, item.music?.seed ?? 0);
    }
  }
  for (const dir of [path.join(repo, "promo", "films"), path.join(v3, "done")]) {
    if (fs.existsSync(dir)) for (const f of fs.readdirSync(dir)) ids.add(f.replace(/\.json$/, ""));
  }
  const { items, skipped } = buildBatch(ideas, ids, maxSeed);
  if (!items.length) {
    console.log(JSON.stringify({ batch: null, file: null, films: [], skipped }));
    return;
  }
  const now = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  const batch = `ideas-${now.getFullYear()}${p(now.getMonth() + 1)}${p(now.getDate())}-${p(now.getHours())}${p(now.getMinutes())}`;
  const file = path.join(batchesDir, `${batch}.json`);
  fs.writeFileSync(file, JSON.stringify(items.map(({ docId: _d, ...item }) => item), null, 1) + "\n");
  console.log(JSON.stringify({ batch, file: path.relative(repo, file), films: items.map((i) => ({ docId: i.docId, filmId: i.id })), skipped }));
}

main();
