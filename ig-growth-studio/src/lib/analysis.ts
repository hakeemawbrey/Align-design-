/**
 * What makes a Reel do well: compares each posted video with its own account's usual result, grouped by what the
 * video is (format, sign, topic, ending, length) and how it went out (time, weekday, Trial or not).
 *
 * The score is views at 24 hours (so old and new posts are compared at the same age) divided by the median for the
 * same account's Reels posted within 3½ days either side. 1.0 is a usual Reel for that account at that time; 2.0 is
 * twice the usual. Comparing with nearby days keeps an account's growth from making every recent format look better,
 * and scoring accounts separately keeps a big account from drowning out a small one.
 */
import { type Snapshot, at24Hours } from "./experiment";

export interface AnalysisInput {
  postId: number;
  account: string;
  postedAt: string;
  trial: string | null;
  caption: string;
  permalink: string | null;
  audio: boolean;
  meta: Record<string, string | number>;
  history: (Snapshot & { saves: number | null; shares: number | null })[];
}

export interface Scored {
  postId: number;
  account: string;
  title: string;
  permalink: string | null;
  postedAt: string;
  views24: number;
  /** views24 ÷ the median views24 of the same account's Reels from nearby days. */
  index: number;
  views: number;
  saves: number;
  shares: number;
  features: Record<string, string>;
}

export interface Group {
  value: string;
  count: number;
  /** Median of each Reel's score: 1.0 = usual for its account. */
  index: number;
  /** Share of these Reels that got at least twice the usual views. */
  hitRate: number;
  /** How many different days these Reels went out on: one bad or good day can't make a pattern. */
  days: number;
  medianViews24: number;
  savesPer1k: number;
  sharesPer1k: number;
}

export interface Dimension {
  key: string;
  label: string;
  groups: Group[];
}

export interface Finding {
  dimension: string;
  value: string;
  count: number;
  index: number;
  hitRate: number;
}

/** Which questions the page answers, in order. */
export const DIMENSIONS: { key: string; label: string }[] = [
  { key: "format", label: "Format" },
  { key: "series", label: "Series or folder" },
  { key: "theme", label: "Theme" },
  { key: "sign", label: "Sign" },
  { key: "ending", label: "Ending" },
  { key: "length", label: "Length" },
  { key: "reelType", label: "Reel type" },
  { key: "timeOfDay", label: "Time posted" },
  { key: "weekday", label: "Day posted" },
  { key: "captionLength", label: "Caption length" },
  { key: "music", label: "Instagram music" },
];

/** A group needs this many Reels, from at least MIN_DAYS different days, before it is listed as working or not. */
export const MIN_GROUP = 8;
export const MIN_DAYS = 3;
/** A "hit" is a Reel with at least this many times the usual views. */
export const HIT = 2;
const WORKING = 1.15;
const DRAGGING = 1 / 1.15;
/** Days either side whose Reels set the usual level for a Reel. */
const NEARBY_DAYS = 3.5;

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function median(values: number[]) {
  if (!values.length) return 0;
  const s = [...values].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

const titleCase = (s: string) => s.replace(/(^|[\s-])([a-z])/g, (_, a, b) => a + b.toUpperCase());

/** "08 Trends/Cute, Not an Ick" → "Trends › Cute, Not an Ick"; "Signs/Leo" → "Signs › Leo". */
function seriesOf(meta: Record<string, string | number>): string | null {
  if (typeof meta.series === "string") return meta.series.replace("/", " › ");
  if (typeof meta.drive_file !== "string") return null;
  const parts = meta.drive_file.split("/").slice(0, -1).filter((p) => p !== "Star Talk");
  if (!parts.length) return null;
  const clean = parts.map((p) => p.replace(/^\d+\s+/, "")).filter((p) => !/^v\d+ social cut$/i.test(p) && !/^(star_talk|star_advice)$/.test(p));
  return clean.length ? clean.slice(-2).join(" › ") : null;
}

function lengthOf(seconds: number | null): string | null {
  if (seconds === null || !Number.isFinite(seconds)) return null;
  if (seconds < 15) return "Under 15 s";
  if (seconds < 30) return "15–30 s";
  if (seconds < 45) return "30–45 s";
  if (seconds < 60) return "45–60 s";
  return "60 s or more";
}

function timeOfDay(h: number) {
  if (h >= 6 && h < 11) return "Morning (6–11 AM)";
  if (h >= 11 && h < 15) return "Midday (11 AM–3 PM)";
  if (h >= 15 && h < 19) return "Afternoon (3–7 PM)";
  if (h >= 19 && h < 23) return "Evening (7–11 PM)";
  return "Late night (11 PM–6 AM)";
}

const FORMAT_NAMES: Record<string, string> = {
  solo: "One sign (solo)",
  rollcall: "All the signs (roll call)",
  belike: '"Be like"',
  "advice-solo": "Advice to one sign",
  "advice-rollcall": "Advice to all the signs",
  theme: "Theme line",
  sign: "Sign line",
  "sign x theme": "Sign + theme line",
};

/** What each Reel is and how it went out, as readable labels. Missing facts are left out. */
export function featuresOf(r: AnalysisInput, tz?: string): Record<string, string> {
  const f: Record<string, string> = {};
  const m = r.meta;
  const str = (k: string) => (typeof m[k] === "string" && (m[k] as string).trim() ? (m[k] as string).trim() : null);
  const format = str("format");
  f.format = format ? (FORMAT_NAMES[format] ?? titleCase(format)) : m.film_id ? "Earlier film (no format)" : "Not described";
  const series = seriesOf(m);
  if (series) f.series = series;
  const theme = str("theme");
  if (theme) f.theme = theme === "align" ? "Alignment" : titleCase(theme);
  const sign = str("sign");
  if (sign) f.sign = titleCase(sign);
  const ending = str("ending");
  if (ending) f.ending = titleCase(ending);
  const len = lengthOf(typeof m.duration === "number" ? m.duration : m.duration ? Number(m.duration) : null);
  if (len) f.length = len;
  f.reelType = r.trial ? "Trial Reel" : "Reel";
  const d = new Date(r.postedAt);
  const local = tz ? new Date(d.toLocaleString("en-US", { timeZone: tz })) : d;
  f.timeOfDay = timeOfDay(local.getHours());
  f.weekday = WEEKDAYS[local.getDay()];
  const words = r.caption.split(/\s+/).filter(Boolean).length;
  f.captionLength = words < 25 ? "Short (under 25 words)" : words < 60 ? "Medium (25–60 words)" : "Long (60+ words)";
  f.music = r.audio ? "Instagram music" : "Own sound";
  return f;
}

/** Scores every Reel that has a 24-hour count. Accounts with fewer than 3 such Reels are left out. */
export function scoreReels(rows: AnalysisInput[], tz?: string): Scored[] {
  const with24 = rows.flatMap((r) => {
    const s = at24Hours(r.postedAt, r.history);
    if (!s) return [];
    const latest = r.history[r.history.length - 1];
    return [{ r, views24: s.views, latest }];
  });
  const byAccount = new Map<string, { t: number; v: number }[]>();
  for (const x of with24) byAccount.set(x.r.account, [...(byAccount.get(x.r.account) ?? []), { t: Date.parse(x.r.postedAt), v: x.views24 }]);
  const window = NEARBY_DAYS * 86_400_000;
  // The usual level near a Reel's own time; the whole period's median when too few Reels are nearby.
  const usualAt = (account: string, t: number) => {
    const all = byAccount.get(account) ?? [];
    if (all.length < 3) return null;
    const near = all.filter((x) => Math.abs(x.t - t) <= window).map((x) => x.v);
    return Math.max(1, median(near.length >= 5 ? near : all.map((x) => x.v)));
  };
  return with24.flatMap(({ r, views24, latest }) => {
    const base = usualAt(r.account, Date.parse(r.postedAt));
    if (!base) return [];
    const title = (typeof r.meta.title === "string" && r.meta.title) || r.caption.split("\n")[0].slice(0, 90) || `Post ${r.postId}`;
    return [
      {
        postId: r.postId,
        account: r.account,
        title,
        permalink: r.permalink,
        postedAt: r.postedAt,
        views24,
        index: views24 / base,
        views: latest.views,
        saves: latest.saves ?? 0,
        shares: latest.shares ?? 0,
        features: featuresOf(r, tz),
      },
    ];
  });
}

export function groupBy(scored: Scored[], key: string): Group[] {
  const groups = new Map<string, Scored[]>();
  for (const s of scored) {
    const v = s.features[key];
    if (v) groups.set(v, [...(groups.get(v) ?? []), s]);
  }
  return [...groups]
    .map(([value, list]) => {
      const views = list.reduce((t, s) => t + s.views, 0);
      return {
        value,
        count: list.length,
        index: median(list.map((s) => s.index)),
        hitRate: list.filter((s) => s.index >= HIT).length / list.length,
        days: new Set(list.map((s) => s.postedAt.slice(0, 10))).size,
        medianViews24: median(list.map((s) => s.views24)),
        savesPer1k: views ? (list.reduce((t, s) => t + s.saves, 0) / views) * 1000 : 0,
        sharesPer1k: views ? (list.reduce((t, s) => t + s.shares, 0) / views) * 1000 : 0,
      };
    })
    .sort((a, b) => b.index - a.index || b.count - a.count);
}

export function analyse(scored: Scored[]) {
  const dimensions: Dimension[] = DIMENSIONS.map((d) => ({ ...d, groups: groupBy(scored, d.key) })).filter(
    // A question only helps when there is something to compare.
    (d) => d.groups.filter((g) => g.count >= MIN_GROUP).length >= 2,
  );
  const findings: Finding[] = dimensions.flatMap((d) =>
    d.groups
      .filter((g) => g.count >= MIN_GROUP && g.days >= MIN_DAYS)
      .map((g) => ({ dimension: d.label, value: g.value, count: g.count, index: g.index, hitRate: g.hitRate })),
  );
  const overallHits = scored.length ? scored.filter((s) => s.index >= HIT).length / scored.length : 0;
  // Working: a typical one beats the usual, or it lands hits much more often than average.
  const hits = (f: Finding) => Math.round(f.hitRate * f.count);
  const isWorking = (f: Finding) =>
    f.index >= WORKING || (f.hitRate >= Math.max(0.1, overallHits * 1.5) && hits(f) >= 3 && f.index >= 1);
  const isDragging = (f: Finding) => f.index <= DRAGGING;
  const byIndex = [...scored].sort((a, b) => b.index - a.index);
  return {
    reels: scored.length,
    dimensions,
    hitRate: overallHits,
    working: findings.filter(isWorking).sort((a, b) => b.index * (1 + b.hitRate) - a.index * (1 + a.hitRate)).slice(0, 8),
    dragging: findings.filter(isDragging).sort((a, b) => a.index * (1 + a.hitRate) - b.index * (1 + b.hitRate)).slice(0, 8),
    top: byIndex.slice(0, 10),
    bottom: byIndex.slice(-10).reverse(),
    topSaves: [...scored].sort((a, b) => b.saves - a.saves).filter((s) => s.saves > 0).slice(0, 10),
    topShares: [...scored].sort((a, b) => b.shares - a.shares).filter((s) => s.shares > 0).slice(0, 10),
  };
}

export type Analysis = ReturnType<typeof analyse>;
