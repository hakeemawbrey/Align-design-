/** Test vs control comparison for posting experiments. */

const HOUR = 3_600_000;
/** A count this close to the 24-hour mark is accepted as the post's 24-hour number. */
const TOLERANCE_HOURS = 3;

export interface Snapshot {
  at: string;
  views: number;
  reach: number | null;
  interactions: number | null;
}

export interface ExperimentPost {
  id: number;
  account: string;
  trial: string | null;
  group: "test" | "control";
  status: string;
  postedAt: string | null;
  history: Snapshot[];
}

/** The saved count nearest the post's 24-hour mark, or null if none is close enough yet. */
export function at24Hours(postedAt: string, history: Snapshot[]): Snapshot | null {
  const target = new Date(postedAt).getTime() + 24 * HOUR;
  let best: Snapshot | null = null;
  let gap = TOLERANCE_HOURS * HOUR;
  for (const s of history) {
    const d = Math.abs(new Date(s.at).getTime() - target);
    if (d <= gap) {
      best = s;
      gap = d;
    }
  }
  return best;
}

function median(values: number[]): number | null {
  if (!values.length) return null;
  const s = [...values].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

const round = (v: number | null, digits = 1) => (v === null ? null : Number(v.toFixed(digits)));

function group(posts: ExperimentPost[]) {
  const measured = posts.flatMap((p) => {
    const s = p.postedAt ? at24Hours(p.postedAt, p.history) : null;
    return s ? [s] : [];
  });
  const views = measured.map((s) => s.views);
  const totalReach = measured.reduce((t, s) => t + (s.reach ?? 0), 0);
  const totalInteractions = measured.reduce((t, s) => t + (s.interactions ?? 0), 0);
  return {
    posts: posts.length,
    measuredAt24h: measured.length,
    medianViews: round(median(views)),
    meanViews: views.length ? round(views.reduce((t, v) => t + v, 0) / views.length) : null,
    medianReach: round(median(measured.flatMap((s) => (s.reach === null ? [] : [s.reach])))),
    engagementPerReachPct: totalReach ? round((totalInteractions / totalReach) * 100, 2) : null,
  };
}

/** Test minus control as a percentage of control; null when either side has no number. */
function lift(test: number | null, control: number | null) {
  return test === null || control === null || control === 0 ? null : round(((test - control) / control) * 100);
}

export function summarise(posts: ExperimentPost[], now: Date) {
  const test = posts.filter((p) => p.group === "test");
  const control = posts.filter((p) => p.group === "control");
  const t = group(test);
  const c = group(control);
  const slices = [...new Set(posts.map((p) => `${p.account} · ${p.trial ? "Trial Reel" : "Reel"}`))].sort().map((name) => {
    const inSlice = (p: ExperimentPost) => `${p.account} · ${p.trial ? "Trial Reel" : "Reel"}` === name;
    const st = group(test.filter(inSlice));
    const sc = group(control.filter(inSlice));
    return { slice: name, test: st, control: sc, medianViewsLiftPct: lift(st.medianViews, sc.medianViews) };
  });
  const unpublished = posts.filter((p) => p.status !== "published").map((p) => ({ id: p.id, group: p.group, status: p.status }));
  return {
    generatedAt: now.toISOString(),
    overall: { test: t, control: c, medianViewsLiftPct: lift(t.medianViews, c.medianViews), meanViewsLiftPct: lift(t.meanViews, c.meanViews) },
    slices,
    unpublished,
  };
}
