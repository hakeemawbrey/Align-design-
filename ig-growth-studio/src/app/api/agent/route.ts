import { type NextRequest, NextResponse } from "next/server";
import { AGENT_DOCS, agentAuth } from "@/lib/agent";
import { config } from "@/lib/config";
import { getDb, getSetting } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const denied = agentAuth(req);
  if (denied) return denied;
  const lastRun = JSON.parse((await getSetting(await getDb(), "last_run")) ?? "null");
  const env = Object.keys(process.env).filter((k) => /TURSO|DATABASE|LIBSQL/i.test(k)).sort();
  return NextResponse.json({ ...AGENT_DOCS, scheduler: { lastRun }, storage: { kind: config.databaseUrl.split(":")[0], envNames: env } });
}
