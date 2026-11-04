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
export function resolveAccount(db: DB, key: string | null | undefined): Account | NextResponse {
  const account = getAccount(db, key || null);
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
      "trial?: 'MANUAL'|'SS_PERFORMANCE' (Reels only: a Trial Reel shown to non-followers first) }.",
    "DELETE /api/agent/posts/{id}": "Cancel a post that has not started publishing.",
    "GET /api/agent/stats?account=": "Followers, following, post count and reach/engagement for the 12 most recent posts.",
    "GET /api/agent/comments?account=": "Comments the account has not replied to, with any saved draft.",
    "POST /api/agent/drafts": "Save a draft reply the owner can edit and send on the Engage page. JSON: { account?, commentId, text }.",
    "DELETE /api/agent/drafts/{commentId}": "Delete a draft.",
  },
};
