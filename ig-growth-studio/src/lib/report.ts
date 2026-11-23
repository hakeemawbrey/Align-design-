/** Weekly numbers for one account, from the saved per-video counts. */

export interface ReelCount {
  at: string;
  views: number;
  reach: number | null;
  saves: number | null;
  shares: number | null;
}

export interface ReelHistory {
  name: string;
  permalink: string | null;
  history: ReelCount[];
}

export interface ReelWeek {
  name: string;
  permalink: string | null;
  views: number;
  saves: number;
  shares: number;
}

/** Each reel's gain since `since`. A count missing before tracking began counts as 0. */
export function reelWeeks(reels: ReelHistory[], since: Date): ReelWeek[] {
  const cutoff = since.getTime();
  return reels.flatMap((r) => {
    const latest = r.history[r.history.length - 1];
    if (!latest) return [];
    const before = [...r.history].reverse().find((h) => new Date(h.at).getTime() < cutoff);
    const gain = (now: number | null, then: number | null | undefined) => Math.max(0, (now ?? 0) - (then ?? 0));
    return [
      {
        name: r.name,
        permalink: r.permalink,
        views: gain(latest.views, before?.views),
        saves: gain(latest.saves, before?.saves),
        shares: gain(latest.shares, before?.shares),
      },
    ];
  });
}

/** Sum of each reel's latest count. */
export function cumulative(reels: ReelHistory[]) {
  const total = { reels: 0, views: 0, saves: 0, shares: 0 };
  for (const r of reels) {
    const latest = r.history[r.history.length - 1];
    if (!latest) continue;
    total.reels += 1;
    total.views += latest.views;
    total.saves += latest.saves ?? 0;
    total.shares += latest.shares ?? 0;
  }
  return total;
}

export function topBy(weeks: ReelWeek[], key: "saves" | "shares", limit = 10) {
  return weeks
    .filter((w) => w[key] > 0)
    .sort((a, b) => b[key] - a[key] || b.views - a.views)
    .slice(0, limit);
}

/** Groups sheet rows into runs of consecutive rows, so each run is one write. */
export function rowRuns<T extends { row: number; value: string }>(rows: T[]) {
  const runs: { start: number; values: string[] }[] = [];
  for (const r of [...rows].sort((a, b) => a.row - b.row)) {
    const last = runs[runs.length - 1];
    if (last && last.start + last.values.length === r.row) last.values.push(r.value);
    else runs.push({ start: r.row, values: [r.value] });
  }
  return runs;
}
