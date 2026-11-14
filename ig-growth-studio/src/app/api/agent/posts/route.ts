import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { agentAuth, resolveAccount } from "@/lib/agent";
import { getDb, listAccounts, listPosts } from "@/lib/db";
import { PostFields, publicPost, queuePost } from "@/lib/posts";

export const dynamic = "force-dynamic";

const MIN_LEAD_MS = 2 * 60_000;

const Body = PostFields.extend({
  account: z.string().optional(),
  caption: z.string().default(""),
  shareToFeed: z.boolean().default(true),
  trial: PostFields.shape.trial.default(null),
  // Require an explicit offset so "6pm" never lands in the wrong time zone.
  scheduledAt: z.iso.datetime({ offset: true, message: "scheduledAt must be ISO 8601 with a time zone, e.g. 2026-11-05T18:00:00-06:00" }),
});

export async function GET(req: NextRequest) {
  const denied = agentAuth(req);
  if (denied) return denied;
  const db = await getDb();
  const q = req.nextUrl.searchParams;
  let igUserId: string | undefined;
  if (q.get("account")) {
    const account = await resolveAccount(db, q.get("account"));
    if (account instanceof NextResponse) return account;
    igUserId = account.igUserId;
  }
  const date = (v: string | null) => (v && !Number.isNaN(Date.parse(v)) ? new Date(v) : undefined);
  const accounts = new Map((await listAccounts(db)).map((a) => [a.igUserId, a]));
  const posts = await listPosts(db, { igUserId, from: date(q.get("from")), to: date(q.get("to")) });
  return NextResponse.json({ posts: posts.map((p) => publicPost(p, accounts)) });
}

export async function POST(req: NextRequest) {
  const denied = agentAuth(req);
  if (denied) return denied;
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json({ error: `${issue?.path.join(".") || "body"}: ${issue?.message ?? "invalid"}` }, { status: 400 });
  }
  const db = await getDb();
  const account = await resolveAccount(db, parsed.data.account);
  if (account instanceof NextResponse) return account;
  const when = new Date(parsed.data.scheduledAt);
  if (when.getTime() < Date.now() + MIN_LEAD_MS) {
    return NextResponse.json({ error: "scheduledAt must be at least 2 minutes in the future" }, { status: 400 });
  }
  const res = await queuePost(db, account, parsed.data, when, "claude");
  if ("error" in res) return NextResponse.json(res, { status: 400 });
  const post = (await listPosts(db, { igUserId: account.igUserId })).find((p) => p.id === res.id)!;
  return NextResponse.json({ post: publicPost(post, new Map([[account.igUserId, account]])) }, { status: 201 });
}
