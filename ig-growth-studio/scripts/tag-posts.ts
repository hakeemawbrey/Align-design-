/**
 * Records what each posted video is (film id, title, format, sign, topic, ending…) so the Analyze page can compare.
 * New imports keep this automatically; this backfills posts queued before that.
 *
 *   npm run tag -- plan.csv more.csv films/            # dry run: shows how many posts match
 *   npm run tag -- plan.csv films/ --commit            # write it
 *
 * Sources: plan CSVs (drive_link or media_url, plus columns like film_id, title, drive_file, format, sign) and JSON
 * files or folders of them (objects with id and/or drive_link, plus fields like format, sign, topic, ending, duration).
 * JSON fields are joined to CSV rows by film id. Matching is by the video's Google Drive file id. Existing fields are kept.
 */
import fs from "node:fs";
import path from "node:path";
import { openDb } from "../src/lib/db";
import { parseMeta } from "../src/lib/posts";
import { parseCsv } from "../src/lib/plan";

const KEEP = ["film_id", "title", "drive_file", "format", "sign", "topic", "ending", "duration", "series", "theme"];
const driveId = (url: string | undefined) => url?.match(/(?:\/d\/|[?&]id=)([\w-]{20,})/)?.[1] ?? null;

function pick(o: Record<string, unknown>) {
  const out: Record<string, string | number> = {};
  for (const k of KEEP) {
    const v = o[k === "film_id" && o.film_id === undefined ? "id" : k];
    if (typeof v === "number" || (typeof v === "string" && v.trim())) out[k] = typeof v === "string" ? v.trim().slice(0, 300) : v;
  }
  return out;
}

function jsonFiles(p: string): string[] {
  if (fs.statSync(p).isDirectory()) return fs.readdirSync(p).flatMap((f) => jsonFiles(path.join(p, f)));
  return p.endsWith(".json") ? [p] : [];
}

async function main() {
  const args = process.argv.slice(2);
  const commit = args.includes("--commit");
  const sources = args.filter((a) => !a.startsWith("--"));
  if (!sources.length) throw new Error("Usage: npm run tag -- <plan.csv | films.json | folder>... [--commit]");

  const byFilm = new Map<string, Record<string, string | number>>();
  const byDrive = new Map<string, Record<string, string | number>>();
  const csvRows: Record<string, string>[] = [];
  for (const src of sources) {
    if (src.endsWith(".csv")) {
      csvRows.push(...(parseCsv(fs.readFileSync(src, "utf8")) as Record<string, string>[]));
      continue;
    }
    for (const f of jsonFiles(src)) {
      let data: unknown;
      try {
        data = JSON.parse(fs.readFileSync(f, "utf8"));
      } catch {
        continue;
      }
      for (const o of Array.isArray(data) ? data : [data]) {
        if (!o || typeof o !== "object") continue;
        const rec = o as Record<string, unknown>;
        const meta = pick(rec);
        const id = typeof rec.id === "string" ? rec.id : null;
        if (id) byFilm.set(id, { ...byFilm.get(id), ...meta });
        const d = driveId(typeof rec.drive_link === "string" ? rec.drive_link : undefined);
        if (d) byDrive.set(d, { ...byDrive.get(d), ...meta });
      }
    }
  }
  for (const r of csvRows) {
    const d = driveId(r.drive_link || r.media_url);
    if (!d) continue;
    const meta = pick(r);
    const film = r.film_id ? byFilm.get(r.film_id) : undefined;
    byDrive.set(d, { ...byDrive.get(d), ...meta, ...film });
  }
  // JSON entries known only by film id get their drive id through a CSV row or their own drive_link above.

  const db = await openDb(`file:${path.join(__dirname, "..", "data", "studio.db")}`);
  const posts = (await db.execute("SELECT id, media_url, meta FROM posts")).rows;
  let matched = 0;
  let changed = 0;
  const writes: { sql: string; args: (string | number)[] }[] = [];
  for (const p of posts) {
    const d = driveId(String(p.media_url));
    const meta = d ? byDrive.get(d) : undefined;
    if (!meta) continue;
    matched++;
    const old = parseMeta(p.meta === null ? null : String(p.meta));
    const merged = { ...meta, ...old };
    if (JSON.stringify(merged) === JSON.stringify(old)) continue;
    changed++;
    writes.push({ sql: "UPDATE posts SET meta = ? WHERE id = ?", args: [JSON.stringify(merged), Number(p.id)] });
  }
  console.log(`${byDrive.size} videos described · ${posts.length} posts · ${matched} match · ${changed} to update`);
  if (!commit) return console.log("Dry run only. Add --commit to write.");
  for (let i = 0; i < writes.length; i += 200) await db.batch(writes.slice(i, i + 200), "write");
  console.log(`Updated ${changed} posts.`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
