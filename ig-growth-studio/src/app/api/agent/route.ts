import { type NextRequest, NextResponse } from "next/server";
import { AGENT_DOCS, agentAuth } from "@/lib/agent";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  return agentAuth(req) ?? NextResponse.json(AGENT_DOCS);
}
