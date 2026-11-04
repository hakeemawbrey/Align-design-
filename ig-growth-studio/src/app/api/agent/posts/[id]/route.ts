import { type NextRequest, NextResponse } from "next/server";
import { agentAuth } from "@/lib/agent";
import { getDb, getPost, updatePost } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = agentAuth(req);
  if (denied) return denied;
  const db = getDb();
  const id = Number((await params).id);
  const post = Number.isInteger(id) ? getPost(db, id) : undefined;
  if (!post) return NextResponse.json({ error: "No such post" }, { status: 404 });
  if (post.status !== "scheduled") {
    return NextResponse.json({ error: `Only scheduled posts can be cancelled (this one is ${post.status})` }, { status: 409 });
  }
  updatePost(db, id, { status: "cancelled" });
  return NextResponse.json({ ok: true });
}
