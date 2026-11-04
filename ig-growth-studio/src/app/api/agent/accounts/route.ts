import { type NextRequest, NextResponse } from "next/server";
import { agentAuth } from "@/lib/agent";
import { getAccount, getDb, listAccounts } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const denied = agentAuth(req);
  if (denied) return denied;
  const db = getDb();
  const active = getAccount(db)?.igUserId;
  return NextResponse.json({
    accounts: listAccounts(db).map((a) => ({
      igUserId: a.igUserId,
      username: a.username,
      page: a.pageName,
      selectedInApp: a.igUserId === active,
      accessExpiresAt: a.tokenExpiresAt,
    })),
  });
}
