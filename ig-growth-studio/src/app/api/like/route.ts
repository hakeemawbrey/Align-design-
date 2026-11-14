import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { config } from "@/lib/config";
import { getAccount, getDb } from "@/lib/db";
import { GraphClient, GraphError } from "@/lib/graph";
import { likeOne, likesToday, unlikeOne } from "@/lib/likes";

const Body = z.object({
  action: z.enum(["like", "unlike"]),
  account: z.string().optional(),
  mediaId: z.string().regex(/^\d+$/).optional(),
  commentId: z.string().regex(/^\d+$/).optional(),
});

export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success || !!parsed.data.mediaId === !!parsed.data.commentId) {
    return NextResponse.json({ error: "Send exactly one of mediaId or commentId" }, { status: 400 });
  }
  const db = await getDb();
  const account = await getAccount(db, parsed.data.account);
  if (!account) return NextResponse.json({ error: "Connect an Instagram account first" }, { status: 400 });

  const client = new GraphClient({ token: account.token });
  const target = { mediaId: parsed.data.mediaId, commentId: parsed.data.commentId };
  try {
    if (parsed.data.action === "like") {
      await likeOne(db, client, account.igUserId, target, { cap: config.dailyLikeCap });
    } else {
      await unlikeOne(db, client, account.igUserId, target);
    }
    return NextResponse.json({ ok: true, likesToday: await likesToday(db, account.igUserId), cap: config.dailyLikeCap });
  } catch (err) {
    // Graph failures are upstream errors; anything else is our own cap or pacing check.
    const status = err instanceof GraphError ? 502 : 429;
    return NextResponse.json({ error: err instanceof Error ? err.message : "Request failed" }, { status });
  }
}
