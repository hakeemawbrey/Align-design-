import type { DB } from "./db";
import type { GraphClient } from "./graph";

export class LikeCapReached extends Error {
  constructor(cap: number) {
    super(`Daily like cap reached (${cap}). It resets at midnight UTC.`);
    this.name = "LikeCapReached";
  }
}

/** Minimum gap between likes, so the queue never behaves like a bot. */
export const MIN_LIKE_INTERVAL_MS = 4000;

function startOfUtcDay(now: Date) {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).toISOString();
}

export function likesToday(db: DB, now = new Date()): number {
  const row = db.prepare("SELECT COUNT(*) AS n FROM likes WHERE liked_at >= ?").get(startOfUtcDay(now)) as { n: number };
  return row.n;
}

export function likedIds(db: DB): Set<string> {
  return new Set((db.prepare("SELECT target_id FROM likes WHERE unliked_at IS NULL").all() as { target_id: string }[]).map((r) => r.target_id));
}

function lastLikeAt(db: DB): Date | null {
  const row = db.prepare("SELECT MAX(liked_at) AS t FROM likes").get() as { t: string | null };
  return row.t ? new Date(row.t) : null;
}

/**
 * Likes one post or comment for the connected account. Called once per user click;
 * enforces the daily cap and a minimum interval between likes.
 */
export async function likeOne(
  db: DB,
  client: GraphClient,
  igUserId: string,
  target: { mediaId?: string; commentId?: string },
  opts: { cap: number; now?: Date },
) {
  const now = opts.now ?? new Date();
  const id = target.mediaId ?? target.commentId!;
  if (likedIds(db).has(id)) return { alreadyLiked: true };
  if (likesToday(db, now) >= opts.cap) throw new LikeCapReached(opts.cap);
  const last = lastLikeAt(db);
  if (last && now.getTime() - last.getTime() < MIN_LIKE_INTERVAL_MS) {
    throw new Error("Slow down: wait a few seconds between likes.");
  }
  await client.like(igUserId, target);
  db.prepare("INSERT OR REPLACE INTO likes (target_id, target_type, liked_at, unliked_at) VALUES (?, ?, ?, NULL)").run(
    id,
    target.mediaId ? "media" : "comment",
    now.toISOString(),
  );
  return { alreadyLiked: false };
}

export async function unlikeOne(db: DB, client: GraphClient, igUserId: string, target: { mediaId?: string; commentId?: string }) {
  await client.unlike(igUserId, target);
  // Keep the row (marked unliked) so like/unlike cycles still count toward the daily cap.
  db.prepare("UPDATE likes SET unliked_at = ? WHERE target_id = ?").run(new Date().toISOString(), target.mediaId ?? target.commentId!);
}
