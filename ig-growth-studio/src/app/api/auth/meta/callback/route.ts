import { NextResponse, type NextRequest } from "next/server";
import { config } from "@/lib/config";
import { getDb, listAccounts, savePendingLogin, upsertAccounts } from "@/lib/db";
import { GraphClient } from "@/lib/graph";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const back = (q: string) => {
    const res = NextResponse.redirect(new URL(`/settings?${q}`, config.appUrl));
    res.cookies.delete("meta_oauth_state");
    return res;
  };

  if (url.searchParams.get("error")) {
    return back(`error=${encodeURIComponent(url.searchParams.get("error_description") ?? "Login cancelled")}`);
  }
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  if (!code || !state || state !== req.cookies.get("meta_oauth_state")?.value) {
    return back("error=Login+check+failed.+Try+again.");
  }

  try {
    const anon = new GraphClient();
    const short = await anon.exchangeCode(code);
    const long = await anon.exchangeLongLived(short.access_token);
    const client = new GraphClient({ token: long.access_token });
    const linked = await client.linkedInstagramAccounts();
    if (linked.length === 0) {
      return back(
        "error=" +
          encodeURIComponent(
            "No Instagram professional account found. Switch the account to Business or Creator, then link it to a Facebook Page you manage or add it to your business portfolio.",
          ),
      );
    }
    const db = await getDb();
    const expiresAt = long.expires_in ? new Date(Date.now() + long.expires_in * 1000).toISOString() : null;
    // Accounts already connected just get the fresh token. New ones wait on Settings for the owner to pick.
    const known = new Set((await listAccounts(db)).map((a) => a.igUserId));
    const refreshed = linked.filter((a) => known.has(a.igUserId));
    const found = linked.filter((a) => !known.has(a.igUserId));
    await upsertAccounts(
      db,
      refreshed.map((a) => ({ ...a, token: long.access_token, tokenExpiresAt: expiresAt })),
    );
    if (found.length === 0) return back(`refreshed=${refreshed.length}`);
    await savePendingLogin(db, { token: long.access_token, expiresAt, accounts: found });
    return back(`choose=1&refreshed=${refreshed.length}`);
  } catch (err) {
    return back(`error=${encodeURIComponent(err instanceof Error ? err.message : "Login failed")}`);
  }
}
