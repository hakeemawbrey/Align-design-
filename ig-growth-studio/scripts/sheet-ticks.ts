/**
 * Lists the "posted" cells still to fill in the schedule Sheets, as JSON, for whoever has Sheets access to write.
 *
 *   npm run --silent ticks -- zodiac.advice444          # prints the writes and saves them as pending
 *   npm run --silent ticks -- zodiac.advice444 --mark   # after writing: records the pending ones as done
 *
 * Reads data/schedules/<account>.json. Changes nothing on Instagram or in the Sheets.
 */
import fs from "node:fs";
import path from "node:path";
import { listAccounts, openDb } from "../src/lib/db";
import { rowRuns } from "../src/lib/report";

interface SchedulePost {
  postId: number;
  file: string;
  sheet: string;
  row: number;
}
interface Schedule {
  sheets: Record<string, { id: string; tab: string; column: string }>;
  posts: SchedulePost[];
  ticked?: number[];
}

const stamp = (at: string) => {
  const d = new Date(at);
  const p = (v: number) => String(v).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
};

async function main() {
  const username = process.argv[2];
  if (!username) throw new Error("Usage: npm run ticks -- <account> [--mark]");
  const root = path.join(__dirname, "..", "data", "schedules");
  const file = path.join(root, `${username}.json`);
  const pendingFile = path.join(root, `${username}-pending.json`);
  const schedule = JSON.parse(fs.readFileSync(file, "utf8")) as Schedule;

  if (process.argv[3] === "--mark") {
    const pending = JSON.parse(fs.readFileSync(pendingFile, "utf8")) as number[];
    schedule.ticked = [...new Set([...(schedule.ticked ?? []), ...pending])];
    fs.writeFileSync(file, JSON.stringify(schedule));
    fs.rmSync(pendingFile);
    console.log(JSON.stringify({ marked: pending.length, ticked: schedule.ticked.length }));
    return;
  }

  const db = await openDb(`file:${path.join(__dirname, "..", "data", "studio.db")}`);
  const account = (await listAccounts(db)).find((a) => a.username === username);
  if (!account) throw new Error(`@${username} is not connected`);
  const rows = (
    await db.execute({ sql: "SELECT id, updated_at FROM posts WHERE ig_user_id = ? AND status = 'published'", args: [account.igUserId] })
  ).rows;
  const postedAt = new Map(rows.map((r) => [Number(r.id), String(r.updated_at)]));
  const done = new Set(schedule.ticked ?? []);
  const due = schedule.posts.filter((p) => postedAt.has(p.postId) && !done.has(p.postId));

  const writes = Object.entries(schedule.sheets).flatMap(([key, sheet]) =>
    rowRuns(due.filter((p) => p.sheet === key).map((p) => ({ row: p.row, value: stamp(postedAt.get(p.postId)!) }))).map((run) => ({
      spreadsheetId: sheet.id,
      range: `'${sheet.tab}'!${sheet.column}${run.start}:${sheet.column}${run.start + run.values.length - 1}`,
      values: run.values.map((v) => [v]),
    })),
  );
  fs.writeFileSync(pendingFile, JSON.stringify(due.map((p) => p.postId)));
  console.log(JSON.stringify({ cells: due.length, writes }, null, 1));
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
