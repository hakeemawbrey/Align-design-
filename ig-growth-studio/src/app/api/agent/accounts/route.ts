import { type NextRequest, NextResponse } from "next/server";
import { agentAuth } from "@/lib/agent";
import { getAccount, getDb, listAccounts } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const denied = agentAuth(req);
  if (denied) return denied;
  const db = await getDb();
  const active = (await getAccount(db))?.igUserId;
  return NextResponse.json({
    accounts: (await listAccounts(db)).map((a) => ({
      igUserId: a.igUserId,
      username: a.username,
      page: a.pageName,
      selectedInApp: a.igUserId === active,
      accessExpiresAt: a.tokenExpiresAt,
    })),
  });
}
