import { disconnect, selectAccount } from "@/app/actions";
import { LocalTime } from "@/components/LocalTime";
import { config } from "@/lib/config";
import { getAccount, getDb, getSetting } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { error, connected } = await searchParams;
  const db = getDb();
  const account = getAccount(db);
  const linked = JSON.parse(getSetting(db, "linked_accounts") ?? "[]") as {
    igUserId: string;
    username: string;
    pageName: string;
  }[];
  const appReady = Boolean(config.appId && config.appSecret);
  const expiresSoon =
    account?.tokenExpiresAt && new Date(account.tokenExpiresAt).getTime() - Date.now() < 7 * 86_400_000;

  return (
    <>
      <h1>Settings</h1>
      {error === "missing_app" ? (
        <p className="error">Set META_APP_ID and META_APP_SECRET in .env, then restart.</p>
      ) : (
        error && <p className="error">{error}</p>
      )}
      {connected && <p className="ok">Instagram account connected.</p>}

      <h2>Instagram account</h2>
      <div className="card stack">
        {account ? (
          <>
            <div>
              Connected as <strong>@{account.username}</strong>
              {account.tokenExpiresAt && (
                <span className={`small ${expiresSoon ? "error" : "muted"}`}>
                  {" "}
                  · access expires <LocalTime iso={account.tokenExpiresAt} />
                  {expiresSoon && ". Reconnect to renew it."}
                </span>
              )}
            </div>
            {linked.length > 1 && (
              <form action={selectAccount} className="row">
                <select name="igUserId" defaultValue={account.igUserId} style={{ width: "auto" }}>
                  {linked.map((a) => (
                    <option key={a.igUserId} value={a.igUserId}>
                      @{a.username} ({a.pageName})
                    </option>
                  ))}
                </select>
                <button type="submit">Switch account</button>
              </form>
            )}
            <div className="row">
              <a className="button" href="/api/auth/meta/start">
                Reconnect
              </a>
              <form action={disconnect}>
                <button type="submit">Disconnect</button>
              </form>
            </div>
          </>
        ) : (
          <>
            <p style={{ margin: 0 }}>
              Sign in with the Facebook account that manages the Facebook Page linked to your Instagram Business or
              Creator account.
            </p>
            <div>
              <a className={`button primary`} href="/api/auth/meta/start" aria-disabled={!appReady}>
                Connect with Facebook
              </a>
            </div>
          </>
        )}
      </div>

      <h2>Configuration</h2>
      <div className="card scroll">
        <table>
          <tbody>
            <Row label="Meta app ID / secret" ok={appReady} value={appReady ? "Set" : "Missing"} />
            <Row label="Graph API version" ok value={config.graphVersion} />
            <Row label="OAuth redirect URI" ok value={config.redirectUri} />
            <Row label="Daily like cap" ok value={String(config.dailyLikeCap)} />
            <Row label="Cron secret" ok={Boolean(config.cronSecret)} value={config.cronSecret ? "Set" : "Not set (/api/cron disabled)"} />
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
