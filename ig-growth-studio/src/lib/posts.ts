import { z } from "zod";
import { type Account, type DB, type PostRow, type PostSource, createPost } from "./db";

export const MAX_CAPTION = 2200;
export const MAX_HASHTAGS = 30;

export const PostFields = z.object({
  type: z.enum(["IMAGE", "REELS"]),
  mediaUrl: z.url({ protocol: /^https$/, message: "Media URL must be a public https:// link" }),
  caption: z.string().max(MAX_CAPTION, "Captions are limited to 2,200 characters"),
  shareToFeed: z.boolean(),
  trial: z.enum(["MANUAL", "SS_PERFORMANCE"]).nullable(),
});
export type PostFields = z.infer<typeof PostFields>;

export function countHashtags(caption: string) {
  return (caption.match(/#\w+/g) ?? []).length;
}

/** Validates and queues one post for one account. Returns the new post ID or an error message. */
export function queuePost(
  db: DB,
  account: Account,
  fields: PostFields,
  scheduledAt: Date,
  source: PostSource,
): { id: number } | { error: string } {
  if (Number.isNaN(scheduledAt.getTime())) return { error: "Invalid date" };
  if (countHashtags(fields.caption) > MAX_HASHTAGS) return { error: "Instagram allows at most 30 hashtags per post" };
  if (fields.trial && fields.type !== "REELS") return { error: "Only Reels can be Trial Reels" };
  const id = createPost(db, {
    igUserId: account.igUserId,
    type: fields.type,
    mediaUrl: fields.mediaUrl,
    caption: fields.caption,
    shareToFeed: fields.shareToFeed,
    trial: fields.trial,
    scheduledAt,
    source,
  });
  return { id };
}

export const TRIAL_LABEL: Record<string, string> = {
  MANUAL: "Trial Reel (you share it with followers)",
  SS_PERFORMANCE: "Trial Reel (auto-shares if it performs well)",
};

/** Post fields that are safe to show or return over the API (no tokens). */
export function publicPost(p: PostRow, accounts: Map<string, Account>) {
  return {
    id: p.id,
    account: accounts.get(p.ig_user_id)?.username ?? null,
    type: p.type,
    trial: p.trial_strategy,
    mediaUrl: p.media_url,
    caption: p.caption,
    shareToFeed: p.share_to_feed === 1,
    scheduledAt: p.scheduled_at,
    status: p.status,
    source: p.source,
    permalink: p.permalink,
    error: p.error,
  };
}
