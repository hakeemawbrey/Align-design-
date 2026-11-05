import { addChosenAccounts, disconnect, removeAccountAction, selectAccount, skipPendingAccounts } from "@/app/actions";
import { ChooseAccounts } from "@/components/ChooseAccounts";
import { LocalTime } from "@/components/LocalTime";
import { config } from "@/lib/config";
import { getAccount, getDb, getPendingLogin, getSetting, listAccounts } from "@/lib/db";
import { GraphClient } from "@/lib/graph";
import { hasFacebookPage } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { error, connected, refreshed } = await searchParams;
  const db = await getDb();
  const accounts = await listAccounts(db);
  const active = await getAccount(db);
  const pending = await getPendingLogin(db);
  const lastRun = JSON.parse((await getSetting(db, "last_run")) ?? "null") as { at: string; source: string } | null;
  const lastRunAgoMin = lastRun ? Math.round((Date.now() - new Date(lastRun.at).getTime()) / 60_000) : null;
  const appReady = Boolean(config.appId && config.appSecret);
  // Facebook Page posting needs two extra permissions; older logins don't have them until reconnected.
  let fbAllowed: boolean | null = null;
  if (active) {
    try {
      const granted = await new GraphClient({ token: active.token }).grantedPermissions();
      fbAllowed = granted.has("pages_manage_posts") && granted.has("read_insights");
    } catch {
      fbAllowed = null;
    }
  }
  const soon = (iso: string | null) => iso !== null && new Date(iso).getTime() - Date.now() < 7 * 86_400_000;

  return (
    <>
      <h1>Settings</h1>
      {error === "missing_app" ? (
        <p className="error">Set META_APP_ID and META_APP_SECRET in .env, then restart.</p>
      ) : (
        error && <p className="error">{error}</p>
      )}
      {connected && (
        <p className="ok">
          Connected: {connected.split(",").filter(Boolean).map((u) => `@${u}`).join(", ") || "Instagram account"}.
        </p>
      )}

      {refreshed && Number(refreshed) > 0 && !pending && (
        <p className="ok">
          Renewed access for {refreshed} connected account{refreshed === "1" ? "" : "s"}. No new accounts found.
        </p>
      )}

      {pending && (
        <>
          <h2>Choose accounts to add</h2>
          <div className="card stack">
            <p style={{ margin: 0 }}>
              Facebook gave access to {pending.accounts.length} account{pending.accounts.length === 1 ? "" : "s"} you
              haven&apos;t added yet. Tick the ones you want.
              {refreshed && Number(refreshed) > 0 && ` Access was renewed for the ${refreshed} you already have.`}
            </p>
            <ChooseAccounts
              accounts={pending.accounts}
              defaultChecked={accounts.length === 0}
              addAction={addChosenAccounts}
              skipAction={skipPendingAccounts}
            />
          </div>
        </>
      )}

      <h2>Instagram accounts</h2>
      <div className="card stack">
        {accounts.length > 0 ? (
          <div className="scroll">
            <table>
              <thead>
                <tr>
                  <th>Account</th>
                  <th>Linked via</th>
                  <th>Access expires</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {accounts.map((a) => (
                  <tr key={a.igUserId}>
                    <td>
                      <a href={`https://www.instagram.com/${a.username}/`} target="_blank" rel="noreferrer">
                        @{a.username}
                      </a>
                      {a.igUserId === active?.igUserId && (
                        <>
                          {" "}
                          <span className="badge published">Selected</span>
                        </>
                      )}
                    </td>
                    <td className="muted">{a.pageName || "—"}</td>
                    <td className={soon(a.tokenExpiresAt) ? "error small" : "muted small"}>
                      {a.tokenExpiresAt ? <LocalTime iso={a.tokenExpiresAt} /> : "—"}
                      {soon(a.tokenExpiresAt) && " · reconnect to renew"}
                    </td>
                    <td>
                      <div className="row" style={{ justifyContent: "flex-end", flexWrap: "nowrap" }}>
                        {a.igUserId !== active?.igUserId && (
                          <form action={selectAccount}>
                            <input type="hidden" name="igUserId" value={a.igUserId} />
                            <button type="submit">Select</button>
                          </form>
                        )}
                        <form action={removeAccountAction}>
                          <input type="hidden" name="igUserId" value={a.igUserId} />
                          <button type="submit" title="Removes the account and cancels its queued posts">
                            Remove
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ margin: 0 }}>
            Sign in with the Facebook account that manages the Facebook Page linked to your Instagram Business or
            Creator account.
          </p>
        )}
        <p className="muted small" style={{ margin: 0 }}>
          To add accounts, click below. On Facebook, choose <strong>Edit settings</strong> and tick every Page and
          Instagram account you want, or <strong>Log into another account</strong> to add accounts from a different
          Facebook login. You then choose which new accounts to add; accounts you already added stay connected. Each Instagram account must be Business or Creator,
          and either linked to a Facebook Page you manage or added to one of your business portfolios.
        </p>
        <div className="row">
          <a className="button primary" href="/api/auth/meta/start" aria-disabled={!appReady}>
            {accounts.length ? "Add or refresh accounts" : "Connect with Facebook"}
          </a>
          {accounts.length > 0 && (
            <form action={disconnect}>
              <button type="submit">Remove all</button>
            </form>
          )}
        </div>
      </div>

      <h2>Facebook Pages</h2>
      <div className="card stack">
        <p className="small" style={{ margin: 0 }}>
          {fbAllowed === null ? (
            <span className="muted">Could not check Facebook permissions right now.</span>
          ) : fbAllowed ? (
            <span className="ok">Posting Reels to your Facebook Pages is allowed.</span>
          ) : (
            <span className="error">
              Facebook posting isn&apos;t allowed yet. Click &ldquo;Add or refresh accounts&rdquo; above and accept the new
              permissions (manage posts and read insights). Your accounts and queue stay as they are.
            </span>
          )}
        </p>
        <table>
          <tbody>
            {accounts.map((a) => (
              <tr key={a.igUserId}>
                <td>@{a.username}</td>
                <td className="small">{hasFacebookPage(a) ? a.pageName : <span className="muted">No Facebook Page linked</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="muted small" style={{ margin: 0 }}>
          Tick &ldquo;Also post to the Facebook Page&rdquo; on a Reel to post it there at the same time. Facebook takes
          videos of 3 to 90 seconds and allows 30 Reels per Page in any 24 hours.
        </p>
      </div>

      <h2>Claude automation</h2>
      <div className="card stack">
        {config.agentApiKey ? (
          <>
            <p style={{ margin: 0 }}>
              <span className="ok">On.</span> Claude can queue posts and Trial Reels for any account, read stats and
              comments, and save draft replies for you to send from Engage. It cannot like, follow, DM, send replies or
              publish immediately.
            </p>
            <p className="muted small" style={{ margin: 0 }}>
              In Claude Code, open the <code>ig-growth-studio</code> folder and ask, for example: &ldquo;Plan next week
              for @comealign and queue three Trial Reels from these links&rdquo;. Claude uses <code>npm run agent</code>,
              which reads the key from <code>.env</code>. Instructions are in <code>CLAUDE.md</code>.
            </p>
          </>
        ) : (
          <p style={{ margin: 0 }}>
            Off. Set <code>AGENT_API_KEY</code> in <code>.env</code> and restart to let Claude plan and queue posts.
          </p>
        )}
      </div>

      <h2>Configuration</h2>
      <div className="card scroll">
        <table>
          <tbody>
            <Row label="Meta app ID / secret" ok={appReady} value={appReady ? "Set" : "Missing"} />
            <Row
              label="Publisher last ran"
              ok={lastRunAgoMin !== null && lastRunAgoMin <= 10}
              value={
                lastRun
                  ? `${lastRunAgoMin === 0 ? "under a minute" : `${lastRunAgoMin} min`} ago (${lastRun.source === "cron" ? "cloud scheduler" : "local worker"})`
                  : "Never. Posts will not publish until the scheduler runs."
              }
            />
            <Row label="Graph API version" ok value={config.graphVersion} />
            <Row label="OAuth redirect URI" ok value={config.redirectUri} />
            <Row label="Daily like cap (per account)" ok value={String(config.dailyLikeCap)} />
            <Row label="Cron secret" ok={Boolean(config.cronSecret)} value={config.cronSecret ? "Set" : "Not set (/api/cron disabled)"} />
            <Row label="Claude API key" ok={Boolean(config.agentApiKey)} value={config.agentApiKey ? "Set" : "Not set (/api/agent disabled)"} />
          </tbody>
        </table>
      </div>
    </>
  );
}

function Row({ label, value, ok }: { label: string; value: string; ok: boolean }) {
  return (
    <tr>
      <th style={{ width: 220 }}>{label}</th>
      <td className={ok ? "" : "error"}>
        <code>{value}</code>
      </td>
    </tr>
  );
}
