import type { Account } from "./db";
import { type FacebookPage, GraphClient } from "./graph";

/** The Facebook Page (name, picture) linked to each account, looked up live. Accounts without one are left out. */
export async function facebookPages(accounts: Account[]): Promise<Map<string, Omit<FacebookPage, "token">>> {
  const byToken = new Map<string, Promise<Map<string, FacebookPage>>>();
  const out = new Map<string, Omit<FacebookPage, "token">>();
  for (const a of accounts) {
    if (!byToken.has(a.token)) byToken.set(a.token, new GraphClient({ token: a.token }).pagesByInstagram().catch(() => new Map()));
    const p = (await byToken.get(a.token)!).get(a.igUserId);
    if (p) out.set(a.igUserId, { id: p.id, name: p.name, picture: p.picture });
  }
  return out;
}
