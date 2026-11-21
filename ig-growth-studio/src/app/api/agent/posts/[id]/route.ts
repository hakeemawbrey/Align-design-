import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { agentAuth } from "@/lib/agent";
import { editQueuedPost, getAccount, getDb, getPost, listAccounts, updatePost } from "@/lib/db";
import { isLocalMedia, localMediaPath } from "@/lib/media";
import { toDirectMediaUrl } from "@/lib/plan";
import { MAX_HASHTAGS, PostFields, countHashtags, hasFacebookPage, publicPost } from "@/lib/posts";

export const dynamic = "force-dynamic";

const MIN_LEAD_MS = 2 * 60_000;

const Patch = z
  .object({
    caption: PostFields.shape.caption.optional(),
    coverOffsetMs: PostFields.shape.coverOffsetMs,
    facebook: z.boolean().optional(),
    /** A public https URL, or "local:<file>" for a video in the app's data/media folder (Reels only). */
    mediaUrl: z.string().min(1).optional(),
    scheduledAt: z.iso.datetime({ offset: true, message: "scheduledAt must be ISO 8601 with a time zone" }).optional(),
  })
  .refine((b) => b.caption !== undefined || b.scheduledAt !== undefined || b.coverOffsetMs !== undefined || b.facebook !== undefined || b.mediaUrl !== undefined, {
    message: "Send caption, scheduledAt, coverOffsetMs, facebook and/or mediaUrl",
  });

async function load(req: NextRequest, params: Promise<{ id: string }>) {
  const denied = agentAuth(req);
  if (denied) return { denied };
  const db = await getDb();
  const id = Number((await params).id);
  const post = Number.isInteger(id) ? await getPost(db, id) : undefined;
  if (!post) return { denied: NextResponse.json({ error: "No such post" }, { status: 404 }) };
  return { db, id, post };
}

/** Change a queued post's caption or time. Sending scheduledAt also puts a failed or cancelled post back in the queue. */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const r = await load(req, params);
  if (r.denied) return r.denied;
  const { db, id, post } = r;
  const parsed = Patch.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json({ error: `${issue?.path.join(".") || "body"}: ${issue?.message ?? "invalid"}` }, { status: 400 });
  }
  const { caption, scheduledAt, coverOffsetMs, facebook } = parsed.data;
  let mediaUrl = parsed.data.mediaUrl;
  if (mediaUrl !== undefined) {
    if (isLocalMedia(mediaUrl)) {
      if (post.type !== "REELS") return NextResponse.json({ error: "Only Reels can use a video file from this computer" }, { status: 400 });
      if (!localMediaPath(mediaUrl)) return NextResponse.json({ error: `No such file in the media folder: ${mediaUrl}` }, { status: 400 });
    } else {
      const ok = PostFields.shape.mediaUrl.safeParse(mediaUrl);
      if (!ok.success) return NextResponse.json({ error: "mediaUrl must be a public https:// link or local:<file>" }, { status: 400 });
      mediaUrl = toDirectMediaUrl(mediaUrl) ?? mediaUrl;
    }
  }
  if (facebook && post.type !== "REELS") {
    return NextResponse.json({ error: "Only Reels can be cross-posted to Facebook" }, { status: 400 });
  }
  if (facebook) {
    const acct = await getAccount(db, post.ig_user_id);
    if (acct && !hasFacebookPage(acct)) return NextResponse.json({ error: `@${acct.username} has no Facebook Page linked` }, { status: 400 });
  }
  if (coverOffsetMs != null && post.type !== "REELS") {
    return NextResponse.json({ error: "Only Reels have a cover frame" }, { status: 400 });
  }
  if (caption !== undefined && countHashtags(caption) > MAX_HASHTAGS) {
    return NextResponse.json({ error: "Instagram allows at most 30 hashtags per post" }, { status: 400 });
  }
  const when = scheduledAt ? new Date(scheduledAt) : undefined;
  if (when && when.getTime() < Date.now() + MIN_LEAD_MS) {
    return NextResponse.json({ error: "scheduledAt must be at least 2 minutes in the future" }, { status: 400 });
  }
  if (when && !(await getAccount(db, post.ig_user_id))) {
    return NextResponse.json({ error: "This post's account is no longer connected" }, { status: 409 });
  }
  if (!(await editQueuedPost(db, id, { caption, scheduledAt: when, coverOffsetMs, facebook, mediaUrl }, new Date()))) {
    const allowed = when ? "scheduled, failed or cancelled" : "scheduled";
    return NextResponse.json({ error: `Only ${allowed} posts can be changed (this one is ${post.status})` }, { status: 409 });
  }
  const accounts = new Map((await listAccounts(db)).map((a) => [a.igUserId, a]));
  return NextResponse.json({ post: publicPost((await getPost(db, id))!, accounts) });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const r = await load(req, params);
  if (r.denied) return r.denied;
  const { db, id, post } = r;
  if (post.status !== "scheduled") {
    return NextResponse.json({ error: `Only scheduled posts can be cancelled (this one is ${post.status})` }, { status: 409 });
  }
  await updatePost(db, id, { status: "cancelled" });
  return NextResponse.json({ ok: true });
}
