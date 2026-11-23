/**
 * Analysis rounds: the Analyze results saved at a moment in time (daily by the worker, or on demand), so a new
 * round can say what changed since the one before. The Analyze page itself always shows live numbers.
 */
import type { Analysis, Finding } from "./analysis";
import { loadAnalysis } from "./analysisData";
import { type DB, listAccounts } from "./db";

export interface RoundBlock {
  reels: number;
  hitRate: number;
  working: Finding[];
  dragging: Finding[];
  top: { postId: number; account: string; title: string; index: number; permalink: string | null }[];
}

export interface RoundSummary {
  all: RoundBlock;
  accounts: Record<string, RoundBlock>;
}

export interface Round {
  id: number;
  at: string;
  days: number;
  source: string;
  summary: RoundSummary;
}

const block = (a: Analysis): RoundBlock => ({
  reels: a.reels,
  hitRate: a.hitRate,
  working: a.working,
  dragging: a.dragging,
  top: a.top.map((s) => ({ postId: s.postId, account: s.account, title: s.title, index: s.index, permalink: s.permalink })),
});

export async function computeRound(db: DB, days = 30, now = new Date()): Promise<RoundSummary> {
  const accounts: Record<string, RoundBlock> = {};
  for (const a of await listAccounts(db)) {
    const analysis = await loadAnalysis(db, { days, igUserId: a.igUserId, now });
    if (analysis.reels) accounts[a.username] = block(analysis);
  }
  return { all: block(await loadAnalysis(db, { days, now })), accounts };
}

export async function saveRound(db: DB, opts: { days?: number; source: "daily" | "manual"; now?: Date }): Promise<Round> {
  const now = opts.now ?? new Date();
  const days = opts.days ?? 30;
  const summary = await computeRound(db, days, now);
  const res = await db.execute({
    sql: "INSERT INTO analysis_rounds (at, days, source, summary) VALUES (?, ?, ?, ?)",
    args: [now.toISOString(), days, opts.source, JSON.stringify(summary)],
  });
  return { id: Number(res.lastInsertRowid), at: now.toISOString(), days, source: opts.source, summary };
}

export async function listRounds(db: DB, limit = 30): Promise<Round[]> {
  const rows = (await db.execute({ sql: "SELECT * FROM analysis_rounds ORDER BY at DESC LIMIT ?", args: [limit] })).rows;
  return rows.map((r) => ({
    id: Number(r.id),
    at: String(r.at),
    days: Number(r.days),
    source: String(r.source),
    summary: JSON.parse(String(r.summary)) as RoundSummary,
  }));
}

/** First worker run after 6 AM local each day saves a round. */
export async function saveDailyRoundIfDue(db: DB, now = new Date()): Promise<boolean> {
  if (now.getHours() < 6) return false;
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const last = (await db.execute("SELECT value FROM settings WHERE key = 'analysis_round_day'")).rows[0]?.value;
  if (last === today) return false;
  await db.execute({ sql: "INSERT OR REPLACE INTO settings (key, value) VALUES ('analysis_round_day', ?)", args: [today] });
  await saveRound(db, { source: "daily", now });
  return true;
}

export interface RoundChanges {
  reelsAdded: number;
  hitRateChange: number;
  nowWorking: Finding[];
  noLongerWorking: Finding[];
  nowDragging: Finding[];
  noLongerDragging: Finding[];
  newHits: RoundBlock["top"];
}

const key = (f: Finding) => `${f.dimension}|${f.value}`;

/** What one round shows that the one before didn't, and the reverse. */
export function compareRounds(prev: RoundBlock | undefined, cur: RoundBlock): RoundChanges | null {
  if (!prev) return null;
  const had = (list: Finding[]) => new Set(list.map(key));
  const pw = had(prev.working);
  const cw = had(cur.working);
  const pd = had(prev.dragging);
  const cd = had(cur.dragging);
  const prevTop = new Set(prev.top.map((t) => t.postId));
  return {
    reelsAdded: cur.reels - prev.reels,
    hitRateChange: cur.hitRate - prev.hitRate,
    nowWorking: cur.working.filter((f) => !pw.has(key(f))),
    noLongerWorking: prev.working.filter((f) => !cw.has(key(f))),
    nowDragging: cur.dragging.filter((f) => !pd.has(key(f))),
    noLongerDragging: prev.dragging.filter((f) => !cd.has(key(f))),
    newHits: cur.top.filter((t) => !prevTop.has(t.postId)),
  };
}

export const roundBlock = (r: Round, account?: string | null) => (account ? r.summary.accounts[account] : r.summary.all);
