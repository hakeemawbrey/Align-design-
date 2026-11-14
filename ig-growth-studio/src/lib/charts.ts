/** Data shaping for the dashboard charts. Days and hours are in this computer's time zone. */
import type { PostRow } from "./db";

const pad = (n: number) => String(n).padStart(2, "0");

/** "2026-11-04" for a date in local time. */
export function dayKey(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** "Nov 4" for a "2026-11-04" key. */
export function dayLabel(key: string): string {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/** Consecutive local day keys from `start` days after today through `end` days after today (negative = past). */
export function dayRange(now: Date, start: number, end: number): string[] {
  const out: string[] = [];
  for (let i = start; i <= end; i++) out.push(dayKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() + i)));
  return out;
}

const COUNTED = new Set(["published", "scheduled", "processing"]);

/** Posts per day for each group (e.g. account or status). Failed and cancelled posts are left out. */
export function postsPerDay(posts: PostRow[], days: string[], groupOf: (p: PostRow) => string, groups: string[]) {
  const index = new Map(days.map((d, i) => [d, i]));
  const counts = new Map(groups.map((g) => [g, days.map(() => 0)]));
  for (const p of posts) {
    if (!COUNTED.has(p.status)) continue;
    const i = index.get(dayKey(new Date(p.scheduled_at)));
    const row = counts.get(groupOf(p));
    if (i !== undefined && row) row[i]++;
  }
  return groups.map((g) => counts.get(g)!);
}

/** Upcoming scheduled posts per hour of the day (0–23) for each group. */
export function postsPerHour(posts: PostRow[], now: Date, groupOf: (p: PostRow) => string, groups: string[]) {
  const counts = new Map(groups.map((g) => [g, Array.from({ length: 24 }, () => 0)]));
  for (const p of posts) {
    const at = new Date(p.scheduled_at);
    if (p.status !== "scheduled" || at < now) continue;
    const row = counts.get(groupOf(p));
    if (row) row[at.getHours()]++;
  }
  return groups.map((g) => counts.get(g)!);
}

export const HOUR_LABELS = Array.from({ length: 24 }, (_, h) => `${h % 12 || 12} ${h < 12 ? "AM" : "PM"}`);

/** Categorical colours in fixed order; colour follows the account, not its rank. */
export const seriesColor = (i: number) => `var(--series-${(i % 8) + 1})`;
