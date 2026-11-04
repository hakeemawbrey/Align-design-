import { NextResponse, type NextRequest } from "next/server";
import { config } from "@/lib/config";
import { hasCronKey } from "@/lib/cronAuth";
import { getDb } from "@/lib/db";
import { runScheduledWork } from "@/lib/jobs";

export const dynamic = "force-dynamic";
// Reels can take a while to process; a run checks each container and moves on.
export const maxDuration = 300;

/** Called every minute by Vercel Cron (or any scheduler) with "Authorization: Bearer <CRON_SECRET>". */
export async function GET(req: NextRequest) {
  if (!hasCronKey(config.cronSecret, req.headers.get("authorization"), req.nextUrl.searchParams.get("key"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const result = await runScheduledWork(await getDb(), new Date(), "cron");
  return NextResponse.json(result);
}
