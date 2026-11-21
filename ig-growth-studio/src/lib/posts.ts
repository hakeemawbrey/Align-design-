import { z } from "zod";
import { type Account, type DB, type PostRow, type PostSource, createPost } from "./db";
import { toDirectMediaUrl } from "./plan";

export const MAX_CAPTION = 2200;
export const MAX_HASHTAGS = 30;

export const PostFields = z.object({
  type: z.enum(["IMAGE", "REELS"]),
  mediaUrl: z.url({ protocol: /^https$/, message: "Media URL must be a public https:// link" }),
  caption: z.string().max(MAX_CAPTION, "Captions are limited to 2,200 characters"),
  shareToFeed: z.boolean(),
  trial: z.enum(["MANUAL", "SS_PERFORMANCE"]).nullable(),
  /** Reels: cover frame, in ms from the start of the video. */
  coverOffsetMs: z.number().int().min(0).max(15 * 60_000).nullable().optional(),
  /** Reels: also post to the Facebook Page linked to the account. */
  facebook: z.boolean().optional(),
  /** What the video is (film id, title, format, sign, topic…), so the Analyze page can compare. Up to 20 short fields. */
  meta: z
    .record(z.string().max(40), z.union([z.string().max(300), z.number()]))
    .refine((m) => Object.keys(m).length <= 20, "meta: at most 20 fields")
    .nullable()
    .optional(),
});
export type PostFields = z.infer<typeof PostFields>;

export function countHashtags(caption: string) {
  return (caption.match(/#\w+/g) ?? []).length;
}

/** Validates and queues one post for one account. Returns the new post ID or an error message. */
export async function queuePost(
  db: DB,
  account: Account,
  fields: PostFields,
  scheduledAt: Date,
  source: PostSource,
): Promise<{ id: number } | { error: string }> {
  if (Number.isNaN(scheduledAt.getTime())) return { error: "Invalid date" };
  if (countHashtags(fields.caption) > MAX_HASHTAGS) return { error: "Instagram allows at most 30 hashtags per post" };
  if (fields.trial && fields.type !== "REELS") return { error: "Only Reels can be Trial Reels" };
  if (fields.facebook && fields.type !== "REELS") return { error: "Only Reels can be cross-posted to Facebook" };
  if (fields.facebook && !hasFacebookPage(account)) return { error: `@${account.username} has no Facebook Page linked` };
  const id = await createPost(db, {
    igUserId: account.igUserId,
    type: fields.type,
    // Google Drive share links are turned into direct downloads Instagram can fetch.
    mediaUrl: toDirectMediaUrl(fields.mediaUrl) ?? fields.mediaUrl,
    caption: fields.caption,
    shareToFeed: fields.shareToFeed,
    trial: fields.trial,
    coverOffsetMs: fields.coverOffsetMs ?? null,
    facebook: fields.facebook ?? false,
    meta: fields.meta ?? null,
    scheduledAt,
    source,
  });
  return { id };
}

/** Accounts connected through a business portfolio have no Facebook Page to post to. */
export function hasFacebookPage(account: Account) {
  return !account.pageName.endsWith("(business portfolio)");
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
    coverOffsetMs: p.cover_offset_ms,
    audio: p.audio_id || p.audio_error ? { id: p.audio_id, title: p.audio_title, note: p.audio_error } : null,
    mediaUrl: p.media_url,
    caption: p.caption,
    shareToFeed: p.share_to_feed === 1,
    scheduledAt: p.scheduled_at,
    status: p.status,
    source: p.source,
    permalink: p.permalink,
    error: p.error,
    facebook: p.fb_status ? { status: p.fb_status, permalink: p.fb_permalink, error: p.fb_error } : null,
    meta: parseMeta(p.meta),
  };
}

/** A post's meta JSON as an object; empty when missing or unreadable. */
export function parseMeta(raw: string | null | undefined): Record<string, string | number> {
  if (!raw) return {};
  try {
    const v = JSON.parse(raw);
    return v && typeof v === "object" && !Array.isArray(v) ? v : {};
  } catch {
    return {};
  }
}
