"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  addFromPendingLogin,
  addNiche,
  clearPendingLogin,
  deleteDraft,
  getAccount,
  getDb,
  getPost,
  removeAccount,
  removeAllAccounts,
  removeNiche,
  setActiveAccount,
  updatePost,
} from "@/lib/db";
import { setAudioSetting } from "@/lib/audio";
import { GraphClient } from "@/lib/graph";
import { PostFields, queuePost } from "@/lib/posts";
import { localToUtc } from "@/lib/time";

const When = z.object({
  // Local time from <input type="datetime-local"> plus the browser's offset in minutes.
  scheduledAt: z.string().min(1, "Pick a date and time"),
  tzOffset: z.coerce.number().int(),
});

export async function schedulePost(_: unknown, form: FormData): Promise<{ error?: string; ok?: boolean }> {
  const type = form.get("type");
  const trial = form.get("trial");
  const fields = PostFields.safeParse({
    type,
    mediaUrl: form.get("mediaUrl"),
    caption: String(form.get("caption") ?? ""),
    shareToFeed: form.get("shareToFeed") === "on",
    trial: type === "REELS" && (trial === "MANUAL" || trial === "SS_PERFORMANCE") ? trial : null,
    facebook: type === "REELS" && form.get("facebook") === "on",
  });
  if (!fields.success) return { error: fields.error.issues[0]?.message ?? "Invalid input" };
  const when = When.safeParse({ scheduledAt: form.get("scheduledAt"), tzOffset: form.get("tzOffset") ?? 0 });
  if (!when.success) return { error: when.error.issues[0]?.message ?? "Invalid date" };
  const at = localToUtc(when.data.scheduledAt, when.data.tzOffset);
  if (!at) return { error: "Invalid date" };

  const db = await getDb();
  const account = await getAccount(db, String(form.get("account") ?? "") || null);
  if (!account) return { error: "Connect an Instagram account first" };
  const res = await queuePost(db, account, fields.data, at, "you");
  if ("error" in res) return { error: res.error };
  revalidatePath("/schedule");
  return { ok: true };
}

export async function cancelPost(form: FormData) {
  const db = await getDb();
  const id = Number(form.get("id"));
  const post = await getPost(db, id);
  if (post && post.status === "scheduled") await updatePost(db, id, { status: "cancelled" });
  revalidatePath("/schedule");
}

export async function retryPost(form: FormData) {
  const db = await getDb();
  const id = Number(form.get("id"));
  const post = await getPost(db, id);
  if (post && (post.status === "failed" || post.status === "cancelled") && await getAccount(db, post.ig_user_id)) {
    await updatePost(db, id, {
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
  const account = await getAccount(await getDb());
  if (account && /^[a-z0-9._]{1,30}$/.test(username)) await addNiche(await getDb(), account.igUserId, username);
  revalidatePath("/engage");
}

export async function removeNicheAccount(form: FormData) {
  const account = await getAccount(await getDb());
  if (account) await removeNiche(await getDb(), account.igUserId, String(form.get("username") ?? ""));
  revalidatePath("/engage");
}

export async function replyToComment(_: unknown, form: FormData): Promise<{ error?: string; ok?: boolean }> {
  const commentId = String(form.get("commentId") ?? "");
  const message = String(form.get("message") ?? "").trim();
  if (!/^\d+$/.test(commentId) || !message) return { error: "Write a reply first" };
  const db = await getDb();
  const account = await getAccount(db, String(form.get("account") ?? "") || null);
  if (!account) return { error: "Connect an Instagram account first" };
  try {
    await new GraphClient({ token: account.token }).reply(commentId, message);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Reply failed" };
  }
  await deleteDraft(db, commentId);
  revalidatePath("/engage");
  return { ok: true };
}

export async function discardDraft(form: FormData) {
  await deleteDraft(await getDb(), String(form.get("commentId") ?? ""));
  revalidatePath("/engage");
}

export async function selectAccount(form: FormData) {
  await setActiveAccount(await getDb(), String(form.get("igUserId") ?? ""));
  revalidatePath("/", "layout");
}

export async function removeAccountAction(form: FormData) {
  await removeAccount(await getDb(), String(form.get("igUserId") ?? ""));
  revalidatePath("/", "layout");
}

export async function disconnect() {
  await removeAllAccounts(await getDb());
  revalidatePath("/", "layout");
  redirect("/settings");
}

export async function addChosenAccounts(form: FormData) {
  const added = await addFromPendingLogin(await getDb(), form.getAll("igUserId").map(String));
  revalidatePath("/", "layout");
  redirect(added.length ? `/settings?connected=${encodeURIComponent(added.join(","))}` : "/settings");
}

export async function skipPendingAccounts() {
  await clearPendingLogin(await getDb());
  revalidatePath("/settings");
}

export async function setReelAudio(form: FormData) {
  const mode = String(form.get("mode") ?? "off");
  const vol = (k: string) => (String(form.get(k) ?? "").trim() ? Number(form.get(k)) : null);
  if (mode !== "off" && mode !== "trending" && mode !== "search") return;
  const igUserId = String(form.get("igUserId") ?? "");
  const db = await getDb();
  if (!(await getAccount(db, igUserId))) return;
  try {
    await setAudioSetting(db, igUserId, { mode, query: String(form.get("query") ?? ""), videoVolume: vol("videoVolume"), muteVideo: form.get("muteVideo") === "on" });
  } catch {
    // Search mode without a term: leave the setting as it was.
  }
  revalidatePath("/settings");
}
