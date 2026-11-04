import { cancelPost, retryPost } from "@/app/actions";
import { ConnectPrompt } from "@/components/ConnectPrompt";
import { LocalTime } from "@/components/LocalTime";
import { ScheduleForm } from "@/components/ScheduleForm";
import { getAccount, getDb, listPosts } from "@/lib/db";
import { GraphClient } from "@/lib/graph";

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  const db = getDb();
  const account = getAccount(db);
  const posts = listPosts(db);

  let quota: string | null = null;
  if (account) {
    try {
      const q = (await new GraphClient({ token: account.token }).publishingLimit(account.igUserId)).data[0];
      if (q) quota = `${q.quota_usage} of ${q.config?.quota_total ?? "?"} API posts used in the last 24 hours`;
    } catch {
      // Quota is informational only.
    }
  }

  return (
    <>
      <h1>Schedule</h1>
      {!account && <ConnectPrompt />}
      <p className="muted small">
        Media must be at a public https URL Instagram can download. Posts are published by the worker
        (<code>npm run worker</code>) or by calling <code>/api/cron</code>.{quota && ` ${quota}.`}
      </p>
      <ScheduleForm />

      <h2>Queue</h2>
      <div className="card scroll">
        <table>
          <thead>
            <tr>
              <th>When</th>
              <th>Type</th>
              <th>Caption</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id}>
                <td style={{ whiteSpace: "nowrap" }}>
                  <LocalTime iso={p.scheduled_at} />
                </td>
                <td>{p.type === "REELS" ? "Reel" : "Image"}</td>
                <td>
                  <div className="clamp small" style={{ maxWidth: 360 }}>
                    {p.caption || <span className="muted">No caption</span>}
                  </div>
                  <a className="small" href={p.media_url} target="_blank" rel="noreferrer">
                    media
                  </a>
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
                </td>
                <td>
                  {p.status === "scheduled" && (
                    <form action={cancelPost}>
                      <input type="hidden" name="id" value={p.id} />
                      <button type="submit">Cancel</button>
                    </form>
                  )}
                  {(p.status === "failed" || p.status === "cancelled") && (
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
                <td colSpan={5} className="muted">
                  Nothing scheduled yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
