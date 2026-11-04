import { NextResponse, type NextRequest } from "next/server";
import { config } from "@/lib/config";
import { getDb, saveAccount, setSetting } from "@/lib/db";
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
            "No Instagram professional account found. Switch the account to Business or Creator and link it to a Facebook Page you manage.",
          ),
      );
    }
    const db = getDb();
    const expiresAt = long.expires_in ? new Date(Date.now() + long.expires_in * 1000).toISOString() : null;
    setSetting(db, "user_token", JSON.stringify({ token: long.access_token, expiresAt }));
    setSetting(db, "linked_accounts", JSON.stringify(linked));
    const first = linked[0];
    saveAccount(db, { igUserId: first.igUserId, username: first.username, token: long.access_token, tokenExpiresAt: expiresAt });
    return back("connected=1");
  } catch (err) {
    return back(`error=${encodeURIComponent(err instanceof Error ? err.message : "Login failed")}`);
  }
}
