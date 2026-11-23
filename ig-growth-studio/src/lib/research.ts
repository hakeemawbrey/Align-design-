/**
 * Creator research: the "packs" the study tool (../study) makes for an Instagram or Facebook page, one folder per
 * handle with posts.json, report.md and contact sheets. Packs hold other creators' words and stills, so they live
 * only on this Mac (study/pack/, git-ignored) and in the owner's private align-study repo (a local clone under
 * data/research/align-study, also git-ignored). Never in this public repo.
 */
import fs from "node:fs";
import path from "node:path";

export interface StudyPost {
  shortcode: string;
  url: string | null;
  type: "reel" | "photo" | "carousel" | string;
  date: string | null;
  pinned?: boolean;
  views: number | null;
  likes: number | null;
  comments: number | null;
  duration: number | null;
  slides?: number | null;
  caption: string | null;
  hashtags?: string[];
  transcript?: string | null;
  segments?: { start: number; end: number; text: string }[];
  /** Every line read off the screen (the study writes a list; older packs a single string). */
  onScreen?: string | string[] | null;
  hook?: { screen?: string | null; spoken?: string | null; caption?: string | null } | null;
  topics?: string[];
  formats?: string[];
  ctas?: string[];
  /** Which number "lift" compares: views, or likes when views are missing. */
  metric?: string | null;
  /** This post's number ÷ the creator's typical post of the same type. */
  lift: number | null;
  sheet?: string | null;
}

export interface Creator {
  handle: string;
  site: "instagram" | "facebook";
  name: string | null;
  bio: string | null;
  followers: number | null;
  postCount: number;
  madeAt: string | null;
  /** "study" (run on this Mac) or "private repo". */
  source: "study" | "private repo";
  dir: string;
}

const STUDY_DIR = () => path.resolve(process.env.STUDY_DIR || path.join(process.cwd(), "..", "study"));
export const studyDir = STUDY_DIR;
/** Where the study tool writes packs (study/src/paths.mjs honours the same STUDY_PACK_DIR). */
export const packDir = () => path.resolve(process.env.STUDY_PACK_DIR || path.join(STUDY_DIR(), "pack"));
const roots = () => [
  { dir: packDir(), source: "study" as const },
  { dir: path.join(path.resolve(process.env.RESEARCH_DIR || path.join(process.cwd(), "data", "research")), "align-study"), source: "private repo" as const },
];

const HANDLE = /^(fb-[a-z0-9.-]{1,44}|[a-z0-9._]{1,30})$/;
export const validHandle = (h: string) => HANDLE.test(h) && /[a-z0-9]/.test(h) && !h.includes("..");

interface PackFile {
  handle?: string;
  profile?: { username?: string; name?: string | null; bio?: string | null; followers?: number | null; site?: string };
  madeAt?: string | null;
  count?: number;
  posts?: StudyPost[];
}

const cache = new Map<string, { mtime: number; data: PackFile }>();
function readPack(file: string): PackFile | null {
  try {
    const mtime = fs.statSync(file).mtimeMs;
    const hit = cache.get(file);
    if (hit && hit.mtime === mtime) return hit.data;
    const data = JSON.parse(fs.readFileSync(file, "utf8")) as PackFile;
    cache.set(file, { mtime, data });
    return data;
  } catch {
    return null;
  }
}

/** Every creator with a pack. A handle in both places uses the newer pack. */
export function listCreators(): Creator[] {
  const by = new Map<string, Creator>();
  for (const root of roots()) {
    if (!fs.existsSync(root.dir)) continue;
    for (const handle of fs.readdirSync(root.dir)) {
      if (!validHandle(handle)) continue;
      const dir = path.join(root.dir, handle);
      const pack = readPack(path.join(dir, "posts.json"));
      if (!pack) continue;
      const c: Creator = {
        handle,
        site: handle.startsWith("fb-") || pack.profile?.site === "facebook" ? "facebook" : "instagram",
        name: pack.profile?.name && pack.profile.name !== "Facebook" ? pack.profile.name : null,
        bio: pack.profile?.bio ?? null,
        followers: pack.profile?.followers ?? null,
        postCount: pack.posts?.length ?? pack.count ?? 0,
        madeAt: pack.madeAt ?? null,
        source: root.source,
        dir,
      };
      const prev = by.get(handle);
      if (!prev || String(c.madeAt ?? "") > String(prev.madeAt ?? "")) by.set(handle, c);
    }
  }
  return [...by.values()].sort((a, b) => a.handle.localeCompare(b.handle));
}

export function getCreator(handle: string): { creator: Creator; posts: StudyPost[]; report: string | null } | null {
  if (!validHandle(handle)) return null;
  const creator = listCreators().find((c) => c.handle === handle);
  if (!creator) return null;
  const pack = readPack(path.join(creator.dir, "posts.json"));
  let report: string | null = null;
  try {
    report = fs.readFileSync(path.join(creator.dir, "report.md"), "utf8");
  } catch {
    // no report yet
  }
  return { creator, posts: pack?.posts ?? [], report };
}

/** A contact sheet's file path, only if it is inside that creator's pack. */
export function sheetFile(handle: string, rel: string): string | null {
  const c = validHandle(handle) ? listCreators().find((x) => x.handle === handle) : null;
  if (!c || !/^sheets\/[\w.-]+\.(jpg|jpeg|png|webp)$/i.test(rel)) return null;
  const p = path.resolve(c.dir, rel);
  return p.startsWith(c.dir + path.sep) && fs.existsSync(p) ? p : null;
}

const median = (v: number[]) => {
  if (!v.length) return null;
  const s = [...v].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

export interface CreatorSummary {
  byType: { type: string; count: number; typicalViews: number | null; typicalLikes: number | null }[];
  formats: { value: string; count: number; lift: number | null; hits: number }[];
  topics: { value: string; count: number; lift: number | null; hits: number }[];
  ctas: { value: string; count: number }[];
  /** Posts at 2× their typical or more. */
  hits: number;
  measured: number;
}

/** What works for this creator, by their own typical post (lift 1.0 = typical for that post type). */
export function summarise(posts: StudyPost[]): CreatorSummary {
  const types = [...new Set(posts.map((p) => p.type))];
  const byType = types.map((type) => {
    const list = posts.filter((p) => p.type === type);
    return {
      type,
      count: list.length,
      typicalViews: median(list.map((p) => p.views).filter((v): v is number => typeof v === "number")),
      typicalLikes: median(list.map((p) => p.likes).filter((v): v is number => typeof v === "number")),
    };
  });
  const tally = (key: "formats" | "topics") => {
    const m = new Map<string, StudyPost[]>();
    for (const p of posts) for (const v of p[key] ?? []) m.set(v, [...(m.get(v) ?? []), p]);
    return [...m]
      .map(([value, list]) => {
        const lifts = list.map((p) => p.lift).filter((v): v is number => typeof v === "number");
        return { value, count: list.length, lift: median(lifts), hits: lifts.filter((l) => l >= 2).length };
      })
      .sort((a, b) => (b.lift ?? 0) - (a.lift ?? 0) || b.count - a.count);
  };
  const ctas = new Map<string, number>();
  for (const p of posts) for (const c of p.ctas ?? []) ctas.set(c, (ctas.get(c) ?? 0) + 1);
  const lifts = posts.map((p) => p.lift).filter((v): v is number => typeof v === "number");
  return {
    byType,
    formats: tally("formats"),
    topics: tally("topics"),
    ctas: [...ctas].map(([value, count]) => ({ value, count })).sort((a, b) => b.count - a.count),
    hits: lifts.filter((l) => l >= 2).length,
    measured: lifts.length,
  };
}

/** The first line people see on a creator's post: on-screen hook, else what's said, else the caption's start. */
export function postHeadline(p: StudyPost) {
  const h = p.hook?.screen || p.hook?.spoken || p.hook?.caption || p.caption || "";
  return h.replace(/\s*\/\s*/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * A post's structure without its words, for writing Align's own version: type, length, pacing, hook style, formats,
 * topics and calls to action. Never carries the creator's lines.
 */
export function postStructure(p: StudyPost, hookStyle: (headline: string) => string) {
  const words = (p.transcript ?? "").split(/\s+/).filter(Boolean).length;
  const headline = postHeadline(p);
  return {
    type: p.type,
    seconds: p.duration ? Math.round(p.duration) : null,
    slides: p.slides ?? null,
    beats: p.segments?.length ?? 0,
    wordsPerSecond: p.duration && words ? Number((words / p.duration).toFixed(1)) : null,
    talking: words > 0,
    hookOnScreen: Boolean(p.hook?.screen),
    hookSpoken: Boolean(p.hook?.spoken),
    hookStyle: headline ? hookStyle(headline) : null,
    hookWords: headline ? headline.split(/\s+/).length : 0,
    formats: p.formats ?? [],
    topics: p.topics ?? [],
    ctas: p.ctas ?? [],
    timesTheirUsual: p.lift == null ? null : Number(p.lift.toFixed(2)),
  };
}

/** The posts the script maker offers for a creator: their 20 best vs their own usual, in a fixed order. */
export function topForScripts(posts: StudyPost[]) {
  // Ranked by result vs their usual; pages without that (some Facebook pages only have comments) by the best number there is.
  const key = (["lift", "views", "likes", "comments"] as const).find((k) => posts.some((p) => p[k] != null)) ?? "lift";
  const score = (p: StudyPost) => p[key] ?? -1;
  return [...posts].filter((p) => score(p) >= 0).sort((a, b) => score(b) - score(a) || a.shortcode.localeCompare(b.shortcode)).slice(0, 20);
}

/** A link-safe key (letters and digits only) for a handle or post id, for links into the script maker. */
export const linkKey = (s: string) => Buffer.from(s, "utf8").toString("hex");
