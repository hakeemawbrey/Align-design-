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
  /** How sure the result is, from resampling the group's Reels: strong, moderate or weak. */
  confidence: Confidence;
}

export type Confidence = "strong" | "moderate" | "weak";

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
  days: number;
  confidence: Confidence;
}

/** A word in Reel titles and how Reels using it did. */
export interface WordLift {
  word: string;
  count: number;
  index: number;
  hitRate: number;
  days: number;
}

/** One thing learned, with its evidence and what to do about it. */
export interface Learning {
  kind: "do" | "avoid" | "test";
  headline: string;
  evidence: string;
  action: string;
  confidence: Confidence;
  /** For sorting: how far from usual, weighted by confidence. */
  weight: number;
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
  { key: "hook", label: "Title style" },
  { key: "captionLength", label: "Caption length" },
  { key: "captionEnding", label: "Caption ending" },
  { key: "hour", label: "Hour posted" },
  { key: "gap", label: "Time since the account's last post" },
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

const SIGNS = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"];

/** The shape of a Reel's title, the first thing people read. */
export function hookOf(title: string): string {
  const t = title.trim().toLowerCase();
  if (/be like\.?$/.test(t)) return '"… be like"';
  if (/^pov\b/.test(t)) return '"POV"';
  if (/\?\s*$/.test(t)) return "A question";
  if (/^(the|all the|each|every) signs?\b|^zodiacs?\b|^each sign/.test(t)) return '"The signs …" (all twelve)';
  const firstWord = t.split(/[\s,:.!]+/)[0].replace(/s$/, "");
  if (SIGNS.includes(firstWord) || SIGNS.some((x) => t.startsWith(x))) return "Starts with a sign (\"Leo, …\")";
  if (/\bvs\.?\b|\bversus\b/.test(t)) return '"… vs …"';
  if (/^(things|\d+|5 things|three|five)/.test(t)) return "A list";
  return "A statement";
}

function captionEndingOf(caption: string): string {
  const last = caption.trim().split(/(?<=[.!?])\s+/).pop() ?? "";
  if (/^(send|tag|share)\b/i.test(last)) return "Asks to send or tag someone";
  if (/\?\s*$/.test(last)) return "Ends with a question";
  return "Ends with a statement";
}

function hourLabel(h: number) {
  const ampm = h < 12 ? "AM" : "PM";
  return `${String(h % 12 || 12).padStart(2, "0")} ${ampm}`;
}

function gapLabel(minutes: number | null) {
  if (minutes === null) return null;
  if (minutes < 15) return "Under 15 min";
  if (minutes < 25) return "15–25 min";
  if (minutes < 45) return "25–45 min";
  if (minutes < 120) return "45 min–2 h";
  return "2 h or more";
}

/** A small seeded random number generator, so the same data always gives the same confidence. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Share of resampled groups that land on the same side of `line` as the real one: how much to trust it. */
function confidenceOf(values: number[], stat: (v: number[]) => number, line: number): Confidence {
  if (values.length < 3) return "weak";
  const observed = stat(values);
  if (observed === line) return "weak";
  const above = observed > line;
  const next = rng(values.length * 7919 + Math.round(observed * 1000));
  let same = 0;
  const N = 400;
  for (let i = 0; i < N; i++) {
    const sample = values.map(() => values[Math.floor(next() * values.length)]);
    if (stat(sample) > line === above) same++;
  }
  const share = same / N;
  return share >= 0.95 ? "strong" : share >= 0.8 ? "moderate" : "weak";
}

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
  const title = (typeof m.title === "string" && m.title) || r.caption.split("\n")[0];
  if (title) f.hook = hookOf(title);
  f.captionEnding = captionEndingOf(r.caption);
  f.hour = hourLabel(local.getHours());
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
  // Minutes since the same account's previous post, among the Reels loaded.
  const previous = new Map<number, number>();
  const byAcct = new Map<string, AnalysisInput[]>();
  for (const r of rows) byAcct.set(r.account, [...(byAcct.get(r.account) ?? []), r]);
  for (const list of byAcct.values()) {
    list.sort((a, b) => Date.parse(a.postedAt) - Date.parse(b.postedAt));
    list.forEach((r, i) => {
      if (i) previous.set(r.postId, (Date.parse(r.postedAt) - Date.parse(list[i - 1].postedAt)) / 60_000);
    });
  }
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
        features: (() => {
          const f = featuresOf(r, tz);
          const gap = gapLabel(previous.get(r.postId) ?? null);
          if (gap) f.gap = gap;
          return f;
        })(),
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
        confidence: confidenceOf(
          list.map((s) => s.index),
          median,
          1,
        ),
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
      .map((g) => ({ dimension: d.label, value: g.value, count: g.count, index: g.index, hitRate: g.hitRate, days: g.days, confidence: g.confidence })),
  );
  const overallHits = scored.length ? scored.filter((s) => s.index >= HIT).length / scored.length : 0;
  // Working: a typical one beats the usual, or it lands hits much more often than average.
  const hits = (f: Finding) => Math.round(f.hitRate * f.count);
  // How sure: by the typical result when that's what stands out, else by how often it lands hits vs overall.
  // A small effect is never "strong", however many Reels it rests on.
  const byKey = new Map<string, Scored[]>();
  for (const d of dimensions) for (const g of d.groups) byKey.set(`${d.label}|${g.value}`, scored.filter((s) => s.features[d.key] === g.value));
  const rate = (v: number[]) => v.filter((x) => x >= HIT).length / Math.max(1, v.length);
  for (const f of findings) {
    const values = (byKey.get(`${f.dimension}|${f.value}`) ?? []).map((s) => s.index);
    const byMedian = Math.abs(f.index - 1) >= 0.15;
    let c = byMedian ? confidenceOf(values, median, 1) : confidenceOf(values, rate, overallHits);
    if (Math.abs(f.index - 1) < 0.1 && Math.abs(f.hitRate - overallHits) < 0.05) c = "weak";
    else if (!byMedian && c === "strong" && Math.abs(f.index - 1) < 0.1) c = "moderate";
    f.confidence = c;
  }
  const isWorking = (f: Finding) =>
    f.index >= WORKING || (f.hitRate >= Math.max(0.1, overallHits * 1.5) && hits(f) >= 3 && f.index >= 1);
  const isDragging = (f: Finding) => f.index <= DRAGGING;
  const byIndex = [...scored].sort((a, b) => b.index - a.index);
  const working = findings.filter(isWorking).sort((a, b) => b.index * (1 + b.hitRate) - a.index * (1 + a.hitRate));
  const dragging = findings.filter(isDragging).sort((a, b) => a.index * (1 + a.hitRate) - b.index * (1 + b.hitRate));
  const words = wordLifts(scored);
  return {
    reels: scored.length,
    dimensions,
    hitRate: overallHits,
    working: working.slice(0, 8),
    dragging: dragging.slice(0, 8),
    words,
    learnings: buildLearnings(scored, dimensions, working, dragging, words, overallHits),
    top: byIndex.slice(0, 10),
    bottom: byIndex.slice(-10).reverse(),
    topSaves: [...scored].sort((a, b) => b.saves - a.saves).filter((s) => s.saves > 0).slice(0, 10),
    topShares: [...scored].sort((a, b) => b.shares - a.shares).filter((s) => s.shares > 0).slice(0, 10),
  };
}

export type Analysis = ReturnType<typeof analyse>;

const STOP = new Set(
  "a an the and or but of to in on at for with your you my me i it is are be like this that what when how who why your's it's its their they them our we us zodiacs zodiac signs sign each every all as by from not no so do does did vs".split(" "),
);

/** Words in Reel titles that go with doing better or worse than usual. Needs 10+ Reels across 3+ days. */
export function wordLifts(scored: Scored[], min = 10): { best: WordLift[]; worst: WordLift[] } {
  const by = new Map<string, Scored[]>();
  for (const s of scored) {
    const words = new Set(
      s.title
        .toLowerCase()
        .replace(/[’']/g, "")
        .split(/[^a-z0-9]+/)
        .filter((w) => w.length > 2 && !STOP.has(w)),
    );
    for (const w of words) by.set(w, [...(by.get(w) ?? []), s]);
  }
  const all = [...by]
    .map(([word, list]) => ({
      word,
      count: list.length,
      index: median(list.map((s) => s.index)),
      hitRate: list.filter((s) => s.index >= HIT).length / list.length,
      days: new Set(list.map((s) => s.postedAt.slice(0, 10))).size,
    }))
    .filter((w) => w.count >= min && w.days >= MIN_DAYS);
  return {
    best: all.filter((w) => w.index >= 1.1 || w.hitRate >= 0.15).sort((a, b) => b.index * (1 + b.hitRate) - a.index * (1 + a.hitRate)).slice(0, 12),
    worst: all.filter((w) => w.index <= 0.9).sort((a, b) => a.index - b.index).slice(0, 8),
  };
}

const times = (v: number) => `${v.toFixed(2)}×`;
const pct = (v: number) => `${Math.round(v * 100)}%`;
const CONF_WEIGHT: Record<Confidence, number> = { strong: 3, moderate: 2, weak: 1 };

/** The analysis as a ranked list of plain-language lessons, each with evidence and an action. */
export function buildLearnings(
  scored: Scored[],
  dimensions: Dimension[],
  working: Finding[],
  dragging: Finding[],
  words: { best: WordLift[]; worst: WordLift[] },
  overallHits: number,
): Learning[] {
  const out: Learning[] = [];
  const hitsOf = (f: { count: number; hitRate: number }) => Math.round(f.count * f.hitRate);
  for (const f of working) {
    out.push({
      kind: "do",
      headline: `${f.dimension}: ${f.value} beats your usual`,
      evidence: `A typical one gets ${times(f.index)} the usual views; ${hitsOf(f)} of ${f.count} were hits (${pct(f.hitRate)} vs ${pct(overallHits)} overall), across ${f.days} days.`,
      action: `Make more Reels with ${f.dimension.toLowerCase()} "${f.value}".`,
      confidence: f.confidence,
      weight: (f.index + f.hitRate) * CONF_WEIGHT[f.confidence],
    });
  }
  for (const f of dragging) {
    out.push({
      kind: "avoid",
      headline: `${f.dimension}: ${f.value} holds views back`,
      evidence: `A typical one gets ${times(f.index)} the usual views across ${f.count} Reels on ${f.days} days.`,
      action: `Post fewer Reels with ${f.dimension.toLowerCase()} "${f.value}", or change how they open.`,
      confidence: f.confidence,
      weight: (1 / Math.max(0.1, f.index)) * CONF_WEIGHT[f.confidence],
    });
  }
  for (const w of words.best.slice(0, 6)) {
    out.push({
      kind: "do",
      headline: `Titles with "${w.word}" do well`,
      evidence: `${w.count} Reels: typical ${times(w.index)}, ${pct(w.hitRate)} hits.`,
      action: `Use "${w.word}" (or the situation behind it) in more hooks.`,
      confidence: w.count >= 25 && w.days >= 5 ? "moderate" : "weak",
      weight: (w.index + w.hitRate) * (w.count >= 25 ? 2 : 1),
    });
  }
  for (const w of words.worst.slice(0, 3)) {
    out.push({
      kind: "avoid",
      headline: `Titles with "${w.word}" fall short`,
      evidence: `${w.count} Reels: typical ${times(w.index)}.`,
      action: `Rework hooks built around "${w.word}".`,
      confidence: w.count >= 25 && w.days >= 5 ? "moderate" : "weak",
      weight: 1 / Math.max(0.1, w.index),
    });
  }
  // What the hits have in common: features much more common among the top 10% than overall.
  const top = [...scored].sort((a, b) => b.index - a.index).slice(0, Math.max(10, Math.round(scored.length * 0.1)));
  for (const key of ["format", "hook", "ending", "length", "sign"]) {
    const share = (list: Scored[], v: string) => list.filter((s) => s.features[key] === v).length / Math.max(1, list.length);
    const values = new Set(top.map((s) => s.features[key]).filter((v) => v && !/^(Earlier film|Not described)/.test(v)));
    for (const v of values) {
      const inTop = share(top, v);
      const base = share(scored, v);
      const n = top.filter((s) => s.features[key] === v).length;
      if (n >= 6 && base > 0 && inTop / base >= 1.6) {
        out.push({
          kind: "do",
          headline: `Your biggest hits are often ${key === "hook" ? "titled" : ""} ${v}`.replace("  ", " "),
          evidence: `${pct(inTop)} of your top ${top.length} Reels vs ${pct(base)} of all Reels (${(inTop / base).toFixed(1)}× as common).`,
          action: `Lean into ${v.toLowerCase()} when you want a hit.`,
          confidence: n >= 8 ? "moderate" : "weak",
          weight: (inTop / base) * (n >= 8 ? 2 : 1),
        });
      }
    }
  }
  // Best format for saves and for shares (people bookmarking, people sending it on).
  const formats = dimensions.find((d) => d.key === "format")?.groups.filter((g) => g.count >= MIN_GROUP) ?? [];
  for (const [label, keyName] of [["saves", "savesPer1k"], ["shares", "sharesPer1k"]] as const) {
    const sorted = [...formats].sort((a, b) => b[keyName] - a[keyName]);
    const best = sorted[0];
    const avg = formats.reduce((t, g) => t + g[keyName] * g.count, 0) / Math.max(1, formats.reduce((t, g) => t + g.count, 0));
    if (best && avg > 0 && best[keyName] >= avg * 1.3) {
      out.push({
        kind: "do",
        headline: `${best.value} gets the most ${label}`,
        evidence: `${best[keyName].toFixed(1)} ${label} per 1,000 views vs ${avg.toFixed(1)} on average (${best.count} Reels).`,
        action: label === "saves" ? `Use ${best.value} for content people will want to come back to.` : `Use ${best.value} when the goal is reaching new people.`,
        confidence: best.count >= 30 ? "moderate" : "weak",
        weight: (best[keyName] / avg) * (best.count >= 30 ? 2 : 1),
      });
    }
  }
  // Something to test where the evidence is thin but promising.
  const thin = dimensions
    .flatMap((d) => d.groups.map((g) => ({ d, g })))
    .filter(({ g }) => g.count >= 3 && g.count < MIN_GROUP && g.index >= 1.5)
    .sort((a, b) => b.g.index - a.g.index)
    .slice(0, 3);
  for (const { d, g } of thin) {
    out.push({
      kind: "test",
      headline: `Worth testing: ${d.label.toLowerCase()} "${g.value}"`,
      evidence: `Only ${g.count} Reels so far, but a typical one got ${times(g.index)} the usual.`,
      action: `Post 8–10 more like this across several days to see if it holds.`,
      confidence: "weak",
      weight: g.index * 0.8,
    });
  }
  const seen = new Set<string>();
  return out
    .filter((l) => (seen.has(l.headline) ? false : (seen.add(l.headline), true)))
    .sort((a, b) => CONF_WEIGHT[b.confidence] - CONF_WEIGHT[a.confidence] || b.weight - a.weight)
    .slice(0, 20);
}
