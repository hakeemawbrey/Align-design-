import { type NextRequest, NextResponse } from "next/server";
import { agentAuth } from "@/lib/agent";
import { deleteDraft, getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ commentId: string }> }) {
  const denied = agentAuth(req);
  if (denied) return denied;
  await deleteDraft(await getDb(), (await params).commentId);
  return NextResponse.json({ ok: true });
}
