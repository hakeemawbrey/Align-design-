import crypto from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { config } from "@/lib/config";
import { getDb } from "@/lib/db";
import { type Dump, importDump } from "@/lib/dump";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * One-time move of the local database into the cloud database (scripts/copy-to-cloud.ts).
 * Protected by CRON_SECRET; refuses to overwrite a non-empty database unless asked.
 */
export async function POST(req: NextRequest) {
  const given = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  const key = config.cronSecret;
  const ok =
    key.length > 0 &&
    crypto.timingSafeEqual(crypto.createHash("sha256").update(key).digest(), crypto.createHash("sha256").update(given).digest());
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => null)) as { dump?: Dump; replace?: boolean; dryRun?: boolean } | null;
  if (!body?.dump?.tables) return NextResponse.json({ error: "Send { dump, replace?, dryRun? }" }, { status: 400 });
  try {
    const result = await importDump(await getDb(), body.dump, { replace: body.replace, dryRun: body.dryRun });
    return NextResponse.json(result, { status: result.ok ? 200 : 409 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Restore failed" }, { status: 500 });
  }
}
