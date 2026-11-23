import fs from "node:fs";
import { type NextRequest, NextResponse } from "next/server";
import { sheetFile } from "@/lib/research";

export const dynamic = "force-dynamic";

/** A creator post's contact sheet, from that creator's pack on this Mac (signed-in only; see middleware). */
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  const file = sheetFile(q.get("handle") ?? "", q.get("file") ?? "");
  if (!file) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const type = file.endsWith(".png") ? "image/png" : file.endsWith(".webp") ? "image/webp" : "image/jpeg";
  return new NextResponse(new Uint8Array(fs.readFileSync(file)), { headers: { "content-type": type, "cache-control": "private, max-age=3600" } });
}
