/**
 * Queues a posting plan from a CSV through the app's Claude API (the app must be running).
 *
 *   npm run import -- plan.csv                       # dry run: checks every row, queues nothing
 *   npm run import -- plan.csv --commit              # queue the posts
 *   npm run import -- plan.csv --shift-days=-1 --trial=MANUAL --commit
 *
 * Columns: account, date ("Wed 4 Nov"), time ("8:30 PM"), type ("post" | "reel" | "image" | "trial reel"; a photo marked
 * "reel" is posted as a photo Reel),
 * caption, and the media in drive_link / media_url (Google Drive share links are turned into direct downloads).
 * Times are in this computer's time zone. Rows already queued (same account + media) are skipped, so re-running is safe.
 */
import fs from "node:fs";
import path from "node:path";
import { parseCsv, parsePlanTime, toDirectMediaUrl } from "../src/lib/plan";

function loadEnv(file: string) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2];
  }
}

const args = process.argv.slice(2);
const flag = (name: string) => args.find((a) => a.startsWith(`--${name}=`))?.split("=")[1];
const file = args.find((a) => !a.startsWith("--"));
const commit = args.includes("--commit");
const shiftDays = Number(flag("shift-days") ?? 0);
const trial = (flag("trial") ?? "MANUAL").toUpperCase();

async function main() {
  if (!file) throw new Error("Usage: npm run import -- <plan.csv> [--shift-days=N] [--trial=MANUAL|SS_PERFORMANCE] [--commit]");
  if (trial !== "MANUAL" && trial !== "SS_PERFORMANCE") throw new Error("--trial must be MANUAL or SS_PERFORMANCE");
  loadEnv(path.join(__dirname, "..", ".env"));
  const base = `${(process.env.STUDIO_URL || process.env.APP_URL || "http://localhost:3000").replace(/\/$/, "")}/api/agent`;
  const headers = { authorization: `Bearer ${process.env.AGENT_API_KEY ?? ""}`, "content-type": "application/json" };
  const api = async (method: string, route: string, body?: unknown) => {
    const res = await fetch(base + route, { method, headers, body: body ? JSON.stringify(body) : undefined });
    const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (!res.ok) throw new Error(String(json.error ?? `HTTP ${res.status}`));
    return json;
  };

  const accounts = ((await api("GET", "/accounts")).accounts as { username: string }[]).map((a) => a.username);
  // "star_talk" in the plan matches the connected "star_talk.md".
  const resolve = (name: string) =>
    accounts.find((u) => u.toLowerCase() === name.toLowerCase()) ??
    accounts.find((u) => u.toLowerCase().startsWith(`${name.toLowerCase()}.`));

  const existing = new Set(
    ((await api("GET", "/posts")).posts as { account: string; mediaUrl: string; status: string }[])
      .filter((p) => p.status !== "cancelled")
      .map((p) => `${p.account}|${p.mediaUrl}`),
  );

  const rows = parseCsv(fs.readFileSync(file, "utf8"));
  const now = new Date();
  const plan: { row: number; body: Record<string, unknown>; when: Date }[] = [];
  const problems: string[] = [];
  let skipped = 0;
  rows.forEach((r, i) => {
    const line = i + 2;
    const account = resolve(r.account ?? "");
    if (!account) return problems.push(`row ${line}: no connected account matches "${r.account}"`);
    const when = parsePlanTime(r.date ?? "", r.time ?? "", now, shiftDays);
    if (!when) return problems.push(`row ${line}: cannot read date/time "${r.date} ${r.time}"`);
    if (when.getTime() < now.getTime() + 2 * 60_000) return problems.push(`row ${line}: ${when.toLocaleString()} is in the past`);
    const media = toDirectMediaUrl(r.media_url || r.drive_link || "");
    if (!media) return problems.push(`row ${line}: no usable media link`);
    if (existing.has(`${account}|${media}`)) return void skipped++;
    const kind = (r.type ?? "post").trim().toLowerCase();
    // A photo with type "reel" stays a Reel: the worker turns it into a 10-second video so Reels audio can go on it.
    const isImage = kind === "image" || (!kind.includes("reel") && /\.(jpe?g)$/i.test(r.drive_file ?? r.media_url ?? ""));
    plan.push({
      row: line,
      when,
      body: {
        account,
        type: isImage ? "IMAGE" : "REELS",
        mediaUrl: media,
        caption: r.caption ?? "",
        scheduledAt: isoWithOffset(when),
        shareToFeed: true,
        trial: kind.startsWith("trial") ? trial : null,
      },
    });
  });

  const by = new Map<string, number>();
  for (const p of plan) {
    const k = `${p.body.account} ${p.body.trial ? "Trial Reel" : p.body.type === "IMAGE" ? "image" : "Reel"}`;
    by.set(k, (by.get(k) ?? 0) + 1);
  }
  plan.sort((a, b) => a.when.getTime() - b.when.getTime());
  console.log(`${rows.length} rows · ${plan.length} to queue · ${skipped} already queued · ${problems.length} problems`);
  for (const [k, n] of by) console.log(`  ${k}: ${n}`);
  if (plan.length) console.log(`  first ${plan[0].when.toLocaleString()} · last ${plan[plan.length - 1].when.toLocaleString()}`);
  for (const p of problems.slice(0, 20)) console.log(`  ! ${p}`);
  if (!commit) {
    console.log("Dry run only. Add --commit to queue.");
    return;
  }
  let ok = 0;
  for (const p of plan) {
    try {
      await api("POST", "/posts", p.body);
      ok++;
    } catch (err) {
      console.log(`  ! row ${p.row}: ${err instanceof Error ? err.message : err}`);
    }
  }
  console.log(`Queued ${ok} of ${plan.length}.`);
}

/** "2026-11-03T20:30:00-06:00" in this computer's time zone. */
function isoWithOffset(d: Date) {
  const off = -d.getTimezoneOffset();
  const pad = (n: number) => String(Math.floor(Math.abs(n))).padStart(2, "0");
  const local = new Date(d.getTime() + off * 60_000).toISOString().slice(0, 19);
  return `${local}${off >= 0 ? "+" : "-"}${pad(off / 60)}:${pad(off % 60)}`;
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
