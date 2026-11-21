import crypto from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { config } from "./config";
import { type Account, type DB, getAccount } from "./db";
import { GraphError } from "./graph";

/**
 * Auth for /api/agent: "Authorization: Bearer <AGENT_API_KEY>".
 * Returns an error response, or null when the request may proceed.
 */
export function agentAuth(req: NextRequest): NextResponse | null {
  const key = config.agentApiKey;
  if (!key) return NextResponse.json({ error: "Claude API is off. Set AGENT_API_KEY in .env and restart." }, { status: 503 });
  const given = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  const a = crypto.createHash("sha256").update(key).digest();
  const b = crypto.createHash("sha256").update(given).digest();
  if (!crypto.timingSafeEqual(a, b)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

/** `?account=` / body.account: username, @username or Instagram user ID. Defaults to the active account. */
export async function resolveAccount(db: DB, key: string | null | undefined): Promise<Account | NextResponse> {
  const account = await getAccount(db, key || null);
  if (account) return account;
  return NextResponse.json(
    { error: key ? `No connected account "${key}". GET /api/agent/accounts lists them.` : "No Instagram account connected" },
    { status: 404 },
  );
}

export function graphFailure(err: unknown) {
  const msg = err instanceof Error ? err.message : "Request failed";
  return NextResponse.json({ error: msg }, { status: err instanceof GraphError ? 502 : 500 });
}

export const AGENT_DOCS = {
  about:
    "IG Growth Studio API for Claude. Queue posts and Trial Reels, read stats and comments, and draft comment replies. " +
    "You cannot like, follow, DM, send replies or publish immediately: drafts and the queue are reviewed by the owner in the app.",
  auth: "Authorization: Bearer <AGENT_API_KEY>",
  account: "Most endpoints take `account` (username or IG user ID). Omit it to use the account selected in the app.",
  endpoints: {
    "GET /api/agent/accounts": "Connected accounts.",
    "GET /api/agent/posts?account=&from=&to=": "Queue and history. from/to are ISO dates. Omit account for all accounts.",
    "POST /api/agent/posts":
      "Queue a post. JSON: { account?, type: 'IMAGE'|'REELS', mediaUrl: public https URL (JPEG or MP4), caption?, " +
      "scheduledAt: ISO time with offset (e.g. 2026-11-05T18:00:00-06:00, at least 2 minutes ahead), shareToFeed?: boolean, " +
      "trial?: 'MANUAL'|'SS_PERFORMANCE' (Reels only: a Trial Reel shown to non-followers first), " +
      "coverOffsetMs?: number (Reels only: cover frame in ms from the start), " +
      "facebook?: boolean (Reels only: also post to the account's linked Facebook Page at the same time; 3–90 s videos, 30 per Page per 24 h) }.",
    "PATCH /api/agent/posts/{id}":
      "Change a queued post. JSON: { caption?, scheduledAt?, coverOffsetMs?, facebook?, mediaUrl? }. mediaUrl: a public https link, or local:<file> for a Reel video saved in the app's data/media folder (uploaded straight to Instagram/Facebook; needs the worker on this computer). facebook switches Facebook cross-posting on or off until its upload starts. coverOffsetMs (Reels): the video frame, in ms, used as the cover; " +
      "null for Instagram's default. Sending scheduledAt also puts a failed or cancelled post back in the queue.",
    "DELETE /api/agent/posts/{id}": "Cancel a post that has not started publishing.",
    "GET /api/agent/audio?account=&q=&type=":
      "Reels audio: the account's setting and Instagram's trending music right now (or a keyword search with q; type=original_sound for original sounds).",
    "POST /api/agent/audio":
      "Set Reels audio for an account. JSON: { account?, mode: 'off'|'trending'|'search', query? (search mode), audioVolume?: 1-100, videoVolume?: 1-100 (the video's own sound), muteVideo?: boolean (silence the video's own sound under the music) }. " +
      "Applies to every Reel not yet published: each gets a track at publish time, rotating through the list. Ask the owner first.",
    "GET /api/agent/stats?account=": "Followers, following, post count, today's account-wide views/reach/interactions (since local midnight) and reach/engagement for the 12 most recent posts.",
    "GET /api/agent/comments?account=": "Comments the account has not replied to, with any saved draft.",
    "POST /api/agent/drafts": "Save a draft reply the owner can edit and send on the Engage page. JSON: { account?, commentId, text }.",
    "DELETE /api/agent/drafts/{commentId}": "Delete a draft.",
  },
};
