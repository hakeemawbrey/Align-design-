import { type DB, activeLikeIds, countLikesSince, lastLikeTime, recordLike, recordUnlike } from "./db";
import type { GraphClient } from "./graph";

export class LikeCapReached extends Error {
  constructor(cap: number) {
    super(`Daily like cap reached (${cap}). It resets at midnight UTC.`);
    this.name = "LikeCapReached";
  }
}

/** Minimum gap between likes, so the queue never behaves like a bot. */
export const MIN_LIKE_INTERVAL_MS = 4000;

/** Likes sent today by one account. The cap and spacing apply per Instagram account. */
export function likesToday(db: DB, igUserId: string, now = new Date()): Promise<number> {
  return countLikesSince(db, igUserId, now);
}

export function likedIds(db: DB, igUserId: string): Promise<Set<string>> {
  return activeLikeIds(db, igUserId);
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
  if ((await likedIds(db, igUserId)).has(id)) return { alreadyLiked: true };
  if ((await likesToday(db, igUserId, now)) >= opts.cap) throw new LikeCapReached(opts.cap);
  const last = await lastLikeTime(db, igUserId);
  if (last && now.getTime() - last.getTime() < MIN_LIKE_INTERVAL_MS) {
    throw new Error("Slow down: wait a few seconds between likes.");
  }
  await client.like(igUserId, target);
  await recordLike(db, igUserId, id, target.mediaId ? "media" : "comment", now);
  return { alreadyLiked: false };
}

export async function unlikeOne(db: DB, client: GraphClient, igUserId: string, target: { mediaId?: string; commentId?: string }) {
  await client.unlike(igUserId, target);
  // Keep the row (marked unliked) so like/unlike cycles still count toward the daily cap.
  await recordUnlike(db, igUserId, target.mediaId ?? target.commentId!, new Date());
}
