/** Loads posted Reels with their saved view counts for the Analyze page and the Claude export. */
import { type AnalysisInput, analyse, scoreReels } from "./analysis";
import { type DB, listAccounts } from "./db";
import { parseMeta } from "./posts";

/** Reels posted in the last `days` days (default 30), for one account or all. */
export async function loadAnalysisInputs(db: DB, opts: { days?: number; igUserId?: string; now?: Date } = {}): Promise<AnalysisInput[]> {
  const now = opts.now ?? new Date();
  const since = new Date(now.getTime() - (opts.days ?? 30) * 86_400_000).toISOString();
  const names = new Map((await listAccounts(db)).map((a) => [a.igUserId, a.username]));
  const args: string[] = [since];
  if (opts.igUserId) args.push(opts.igUserId);
  const posts = (
    await db.execute({
      sql: `SELECT p.id, p.ig_user_id, p.trial_strategy, p.caption, p.permalink, p.audio_id, p.meta, p.ig_media_id, i.posted_at
            FROM posts p JOIN media_info i ON i.media_id = p.ig_media_id
            WHERE p.status = 'published' AND p.type = 'REELS' AND i.posted_at >= ?${opts.igUserId ? " AND p.ig_user_id = ?" : ""}`,
      args,
    })
  ).rows;
  if (!posts.length) return [];
  const snaps = (
    await db.execute({
      sql: `SELECT s.media_id, s.at, s.views, s.reach, s.interactions, s.saves, s.shares FROM media_snapshots s
            JOIN media_info i ON i.media_id = s.media_id WHERE i.posted_at >= ? ORDER BY s.at`,
      args: [since],
    })
  ).rows;
  const history = new Map<string, AnalysisInput["history"]>();
  for (const s of snaps) {
    const list = history.get(String(s.media_id)) ?? [];
    list.push({
      at: String(s.at),
      views: Number(s.views),
      reach: s.reach === null ? null : Number(s.reach),
      interactions: s.interactions === null ? null : Number(s.interactions),
      saves: s.saves === null ? null : Number(s.saves),
      shares: s.shares === null ? null : Number(s.shares),
    });
    history.set(String(s.media_id), list);
  }
  return posts.map((p) => ({
    postId: Number(p.id),
    account: names.get(String(p.ig_user_id)) ?? "removed account",
    postedAt: String(p.posted_at),
    trial: p.trial_strategy === null ? null : String(p.trial_strategy),
    caption: String(p.caption ?? ""),
    permalink: p.permalink === null ? null : String(p.permalink),
    audio: p.audio_id !== null,
    meta: parseMeta(p.meta === null ? null : String(p.meta)),
    history: history.get(String(p.ig_media_id)) ?? [],
  }));
}

export async function loadAnalysis(db: DB, opts: { days?: number; igUserId?: string; now?: Date; tz?: string } = {}) {
  return analyse(scoreReels(await loadAnalysisInputs(db, opts), opts.tz));
}
