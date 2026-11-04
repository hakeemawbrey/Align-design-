import { NextResponse, type NextRequest } from "next/server";
import { config } from "@/lib/config";
import { getDb } from "@/lib/db";
import { publishDuePosts } from "@/lib/publisher";

export const dynamic = "force-dynamic";

/** For an external scheduler. Send "Authorization: Bearer <CRON_SECRET>". */
export async function GET(req: NextRequest) {
  if (!config.cronSecret || req.headers.get("authorization") !== `Bearer ${config.cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const result = await publishDuePosts(getDb());
  return NextResponse.json(result);
}
