import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { agentAuth, graphFailure, resolveAccount } from "@/lib/agent";
import { getAudioSetting, setAudioSetting } from "@/lib/audio";
import { getDb } from "@/lib/db";
import { GraphClient } from "@/lib/graph";

export const dynamic = "force-dynamic";

/** The account's Reels audio setting, plus Instagram's trending list (or a keyword search with ?q=). */
export async function GET(req: NextRequest) {
  const denied = agentAuth(req);
  if (denied) return denied;
  const db = await getDb();
  const q = req.nextUrl.searchParams;
  const account = await resolveAccount(db, q.get("account"));
  if (account instanceof NextResponse) return account;
  const type = q.get("type") === "original_sound" ? "original_sound" : "music";
  try {
    const res = await new GraphClient({ token: account.token }).searchAudio(account.igUserId, { type, query: q.get("q") ?? undefined });
    return NextResponse.json({
      setting: await getAudioSetting(db, account.igUserId),
      source: q.get("q") ? `search: ${q.get("q")}` : "trending",
      audio: (res.data ?? []).map((a) => ({
        id: a.audio_id,
        title: a.title ?? null,
        artist: a.display_artist ?? a.ig_username ?? null,
        seconds: a.duration_in_ms ? Math.round(a.duration_in_ms / 1000) : null,
        link: a.on_platform_audio_preview_link ?? null,
      })),
    });
  } catch (err) {
    return graphFailure(err);
  }
}

const Body = z.object({
  account: z.string().optional(),
  mode: z.enum(["off", "trending", "search"]),
  query: z.string().max(100).optional().nullable(),
  audioVolume: z.number().int().min(1).max(100).optional().nullable(),
  videoVolume: z.number().int().min(1).max(100).optional().nullable(),
  muteVideo: z.boolean().optional(),
});

/** Switch Reels audio for an account. Applies to every Reel that has not started publishing yet. */
export async function POST(req: NextRequest) {
  const denied = agentAuth(req);
  if (denied) return denied;
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json({ error: `${issue?.path.join(".") || "body"}: ${issue?.message ?? "invalid"}` }, { status: 400 });
  }
  const db = await getDb();
  const account = await resolveAccount(db, parsed.data.account);
  if (account instanceof NextResponse) return account;
  try {
    return NextResponse.json({ account: account.username, setting: await setAudioSetting(db, account.igUserId, parsed.data) });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Invalid setting" }, { status: 400 });
  }
}
