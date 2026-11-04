"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  addNiche,
  createPost,
  getAccount,
  getDb,
  getPost,
  getSetting,
  removeNiche,
  saveAccount,
  setSetting,
  updatePost,
} from "@/lib/db";
import { GraphClient } from "@/lib/graph";
import { localToUtc } from "@/lib/time";

const PostInput = z.object({
  type: z.enum(["IMAGE", "REELS"]),
  mediaUrl: z.url({ protocol: /^https$/, message: "Media URL must be a public https:// link" }),
  caption: z.string().max(2200, "Captions are limited to 2,200 characters"),
  shareToFeed: z.boolean(),
  // Local time from <input type="datetime-local"> plus the browser's offset in minutes.
  scheduledAt: z.string().min(1, "Pick a date and time"),
  tzOffset: z.coerce.number().int(),
});

export async function schedulePost(_: unknown, form: FormData): Promise<{ error?: string; ok?: boolean }> {
  const parsed = PostInput.safeParse({
    type: form.get("type"),
    mediaUrl: form.get("mediaUrl"),
    caption: String(form.get("caption") ?? ""),
    shareToFeed: form.get("shareToFeed") === "on",
    scheduledAt: form.get("scheduledAt"),
    tzOffset: form.get("tzOffset") ?? 0,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const when = localToUtc(parsed.data.scheduledAt, parsed.data.tzOffset);
  if (!when) return { error: "Invalid date" };
  const hashtags = (parsed.data.caption.match(/#\w+/g) ?? []).length;
  if (hashtags > 30) return { error: "Instagram allows at most 30 hashtags per post" };

  createPost(getDb(), {
    type: parsed.data.type,
    mediaUrl: parsed.data.mediaUrl,
    caption: parsed.data.caption,
    shareToFeed: parsed.data.shareToFeed,
    scheduledAt: when,
  });
  revalidatePath("/schedule");
  return { ok: true };
}

export async function cancelPost(form: FormData) {
  const db = getDb();
  const id = Number(form.get("id"));
  const post = getPost(db, id);
  if (post && post.status === "scheduled") updatePost(db, id, { status: "cancelled" });
  revalidatePath("/schedule");
}

export async function retryPost(form: FormData) {
  const db = getDb();
  const id = Number(form.get("id"));
  const post = getPost(db, id);
  if (post && (post.status === "failed" || post.status === "cancelled")) {
    updatePost(db, id, {
      status: "scheduled",
      container_id: null,
      error: null,
      attempts: 0,
      scheduled_at: new Date().toISOString(),
    });
  }
  revalidatePath("/schedule");
}

export async function addNicheAccount(form: FormData) {
  const username = String(form.get("username") ?? "")
    .trim()
    .replace(/^@/, "")
    .toLowerCase();
  if (/^[a-z0-9._]{1,30}$/.test(username)) addNiche(getDb(), username);
  revalidatePath("/engage");
}

export async function removeNicheAccount(form: FormData) {
  removeNiche(getDb(), String(form.get("username") ?? ""));
  revalidatePath("/engage");
}

export async function replyToComment(_: unknown, form: FormData): Promise<{ error?: string; ok?: boolean }> {
  const commentId = String(form.get("commentId") ?? "");
  const message = String(form.get("message") ?? "").trim();
  if (!/^\d+$/.test(commentId) || !message) return { error: "Write a reply first" };
  const account = getAccount(getDb());
  if (!account) return { error: "Connect an Instagram account first" };
  try {
    await new GraphClient({ token: account.token }).reply(commentId, message);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Reply failed" };
  }
  revalidatePath("/engage");
  return { ok: true };
}

export async function selectAccount(form: FormData) {
  const db = getDb();
  const igUserId = String(form.get("igUserId") ?? "");
  const linked = JSON.parse(getSetting(db, "linked_accounts") ?? "[]") as { igUserId: string; username: string }[];
  const user = JSON.parse(getSetting(db, "user_token") ?? "null") as { token: string; expiresAt: string | null } | null;
  const pick = linked.find((a) => a.igUserId === igUserId);
  if (pick && user) {
    saveAccount(db, { igUserId: pick.igUserId, username: pick.username, token: user.token, tokenExpiresAt: user.expiresAt });
  }
  revalidatePath("/", "layout");
}

export async function disconnect() {
  const db = getDb();
  saveAccount(db, null);
  setSetting(db, "user_token", null);
  setSetting(db, "linked_accounts", null);
  revalidatePath("/", "layout");
  redirect("/settings");
}
