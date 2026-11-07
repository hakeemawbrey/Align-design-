import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { agentAuth, resolveAccount } from "@/lib/agent";
import { getDb, saveDraft } from "@/lib/db";

export const dynamic = "force-dynamic";

const Body = z.object({
  account: z.string().optional(),
  commentId: z.string().regex(/^\d+$/, "commentId must be a numeric comment ID"),
  text: z.string().trim().min(1, "text is empty").max(2200),
});

/** Saves a draft. Claude never sends replies; the owner reviews and sends each one on the Engage page. */
export async function POST(req: NextRequest) {
  const denied = agentAuth(req);
  if (denied) return denied;
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid body" }, { status: 400 });
  const db = await getDb();
  const account = await resolveAccount(db, parsed.data.account);
  if (account instanceof NextResponse) return account;
  await saveDraft(db, { commentId: parsed.data.commentId, igUserId: account.igUserId, text: parsed.data.text });
  return NextResponse.json({ ok: true }, { status: 201 });
}
