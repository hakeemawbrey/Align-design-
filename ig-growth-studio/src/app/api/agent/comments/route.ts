import { type NextRequest, NextResponse } from "next/server";
import { agentAuth, graphFailure, resolveAccount } from "@/lib/agent";
import { getDb, listDrafts } from "@/lib/db";
import { unansweredComments } from "@/lib/insights";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const denied = agentAuth(req);
  if (denied) return denied;
  const db = await getDb();
  const account = await resolveAccount(db, req.nextUrl.searchParams.get("account"));
  if (account instanceof NextResponse) return account;
  try {
    const drafts = await listDrafts(db, account.igUserId);
    const list = await unansweredComments(account);
    return NextResponse.json({
      account: account.username,
      comments: list.map(({ media, comment }) => ({
        commentId: comment.id,
        from: comment.username ?? null,
        text: comment.text,
        at: comment.timestamp,
        post: { id: media.id, permalink: media.permalink, caption: media.caption ?? "" },
        draft: drafts.get(comment.id) ?? null,
      })),
    });
  } catch (err) {
    return graphFailure(err);
  }
}
