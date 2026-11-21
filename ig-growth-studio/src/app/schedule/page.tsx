import Link from "next/link";
import { cancelPost, retryPost } from "@/app/actions";
import { ConnectPrompt } from "@/components/ConnectPrompt";
import { LocalTime } from "@/components/LocalTime";
import { ScheduleCalendar } from "@/components/ScheduleCalendar";
import { ScheduleForm } from "@/components/ScheduleForm";
import { getAccount, getDb, listAccounts, listPosts } from "@/lib/db";
import { GraphClient } from "@/lib/graph";
import { TRIAL_LABEL, hasFacebookPage } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const q = await searchParams;
  const view = q.view === "list" ? "list" : "calendar";
  const date = q.date && /^\d{4}-\d{2}-\d{2}$/.test(q.date) ? q.date : undefined;
  const db = await getDb();
  const active = await getAccount(db);
  const accounts = await listAccounts(db);
  const byId = new Map(accounts.map((a) => [a.igUserId, a]));
  // "all" shows every account; otherwise one account (default: the selected one when there is only one).
  const filter = q.account === "all" || (!q.account && accounts.length > 1) ? null : await getAccount(db, q.account ?? null);
  const posts = await listPosts(db, { igUserId: filter?.igUserId });
  const name = (id: string) => byId.get(id)?.username ?? "removed account";

  let quota: string | null = null;
  if (active) {
    try {
      const qu = (await new GraphClient({ token: active.token }).publishingLimit(active.igUserId)).data[0];
      if (qu) quota = `@${active.username}: ${qu.quota_usage} of ${qu.config?.quota_total ?? "?"} API posts used in the last 24 hours`;
    } catch {
      // Quota is informational only.
    }
  }

  const link = (params: Record<string, string | undefined>) => {
    const u = new URLSearchParams();
    const merged = { view, account: q.account, ...params };
    for (const [k, v] of Object.entries(merged)) if (v) u.set(k, v);
    return `/schedule?${u}`;
  };

  return (
    <>
      <h1>Schedule</h1>
      {!active && <ConnectPrompt />}
      {active && (
        <>
          <p className="muted small">
            Media must be at a public https URL Instagram can download. The worker (<code>npm run worker</code>)
            publishes each post to its account.{quota && ` ${quota}.`}
          </p>
          <ScheduleForm
            accounts={accounts.map((a) => ({ igUserId: a.igUserId, username: a.username, facebookPage: hasFacebookPage(a) ? a.pageName : null }))}
            defaultAccount={active.igUserId}
            defaultDate={date}
          />
        </>
      )}

      <div className="row" style={{ justifyContent: "space-between", marginTop: 28, marginBottom: 12 }}>
        <div className="tabs">
          <Link className={view === "calendar" ? "on" : ""} href={link({ view: "calendar" })}>
            Calendar
          </Link>
          <Link className={view === "list" ? "on" : ""} href={link({ view: "list" })}>
            List
          </Link>
        </div>
        {accounts.length > 1 && (
          <div className="tabs">
            <Link className={!filter ? "on" : ""} href={link({ account: "all" })}>
              All accounts
            </Link>
            {accounts.map((a) => (
              <Link key={a.igUserId} className={filter?.igUserId === a.igUserId ? "on" : ""} href={link({ account: a.username })}>
                @{a.username}
              </Link>
            ))}
          </div>
        )}
      </div>

      {view === "calendar" ? (
        <ScheduleCalendar
          showAccount={!filter}
          posts={posts.map((p) => ({
            id: p.id,
            scheduledAt: p.scheduled_at,
            type: p.type,
            trial: p.trial_strategy,
            status: p.status,
            username: name(p.ig_user_id),
            caption: p.caption,
            source: p.source,
            permalink: p.permalink,
          }))}
        />
      ) : (
        <div className="card scroll">
          <table>
            <thead>
              <tr>
                <th>When</th>
                {!filter && <th>Account</th>}
                <th>Type</th>
                <th>Caption</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} id={`post-${p.id}`}>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <LocalTime iso={p.scheduled_at} />
                  </td>
                  {!filter && <td>@{name(p.ig_user_id)}</td>}
                  <td>
                    {p.type === "REELS" ? (p.trial_strategy ? "Trial Reel" : "Reel") : "Image"}
                    {p.trial_strategy && <div className="muted small">{TRIAL_LABEL[p.trial_strategy]}</div>}
                  </td>
                  <td>
                    <div className="clamp small" style={{ maxWidth: 360 }}>
                      {p.caption || <span className="muted">No caption</span>}
                    </div>
                    <a className="small" href={p.media_url} target="_blank" rel="noreferrer">
                      media
                    </a>
                    {p.source === "claude" && (
                      <>
                        {" "}
                        <span className="badge claude">Queued by Claude</span>
                      </>
                    )}
                    {p.error && <div className="error small">{p.error}</div>}
                  </td>
                  <td>
                    <span className={`badge ${p.status}`}>{p.status}</span>
                    {p.permalink && (
                      <div className="small">
                        <a href={p.permalink} target="_blank" rel="noreferrer">
                          View
                        </a>
                      </div>
                    )}
                    {p.fb_status && (
                      <div className="small" style={{ marginTop: 4 }}>
                        <span className={`badge ${p.fb_status === "pending" ? "scheduled" : p.fb_status}`} title={p.fb_error ?? undefined}>
                          Facebook: {p.fb_status}
                        </span>
                        {p.fb_permalink && (
                          <>
                            {" "}
                            <a href={p.fb_permalink} target="_blank" rel="noreferrer">
                              View
                            </a>
                          </>
                        )}
                        {p.fb_error && p.fb_status !== "published" && <div className="muted">{p.fb_error}</div>}
                      </div>
                    )}
                  </td>
                  <td>
                    {p.status === "scheduled" && (
                      <form action={cancelPost}>
                        <input type="hidden" name="id" value={p.id} />
                        <button type="submit">Cancel</button>
                      </form>
                    )}
                    {(p.status === "failed" || p.status === "cancelled") && byId.has(p.ig_user_id) && (
                      <form action={retryPost}>
                        <input type="hidden" name="id" value={p.id} />
                        <button type="submit">Publish now</button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={6} className="muted">
                    Nothing scheduled yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
