import { ConnectPrompt } from "@/components/ConnectPrompt";
import { Sparkline } from "@/components/Sparkline";
import { getAccount, getDb, listSnapshots, saveSnapshot } from "@/lib/db";
import { type PostStats, type Profile, accountStats } from "@/lib/insights";

export const dynamic = "force-dynamic";

const fmt = new Intl.NumberFormat("en-US");

export default async function Dashboard() {
  const db = getDb();
  const account = getAccount(db);
  if (!account) {
    return (
      <>
        <h1>Dashboard</h1>
        <ConnectPrompt />
      </>
    );
  }

  let profile: Profile | null = null;
  let posts: PostStats[] = [];
  let avgRate: number | null = null;
  let error: string | null = null;
  try {
    ({ profile, posts, avgRate } = await accountStats(account));
    if (profile.followers_count !== undefined) {
      saveSnapshot(
        db,
        account.igUserId,
        new Date().toISOString().slice(0, 10),
        profile.followers_count,
        profile.follows_count ?? null,
        profile.media_count ?? null,
      );
    }
  } catch (err) {
    error = err instanceof Error ? err.message : "Could not load account";
  }

  const snapshots = listSnapshots(db, account.igUserId);
  const first = snapshots[0];
  const last = snapshots[snapshots.length - 1];
  const growth = first && last && snapshots.length > 1 ? last.followers - first.followers : null;
  const rows = posts.map((p) => ({ m: p.media, v: p.values, reach: p.reach, rate: p.rate, error: p.error }));

  return (
    <>
      <h1>
        Dashboard <span className="muted">@{account.username}</span>
      </h1>
      {error && <p className="error">{error}</p>}
      {profile && (
        <div className="stats">
          <Stat label="Followers" value={fmt.format(profile.followers_count ?? 0)} />
          <Stat label="Following" value={fmt.format(profile.follows_count ?? 0)} />
          <Stat label="Posts" value={fmt.format(profile.media_count ?? 0)} />
          <Stat
            label={snapshots.length > 1 ? `Change since ${first.day}` : "Follower change"}
            value={growth === null ? "—" : `${growth >= 0 ? "+" : ""}${fmt.format(growth)}`}
          />
          <Stat label="Avg engagement / reach" value={avgRate === null ? "—" : `${(avgRate * 100).toFixed(1)}%`} />
        </div>
      )}

      <h2>Followers over time</h2>
      <div className="card">
        {snapshots.length > 1 ? (
          <Sparkline values={snapshots.map((s) => s.followers)} label="Followers per day" />
        ) : (
          <p className="muted small" style={{ margin: 0 }}>
            One snapshot is saved each day you open the dashboard (or the worker runs). The chart appears after day two.
          </p>
        )}
      </div>

      <h2>Recent posts</h2>
      <div className="card scroll">
        <table>
          <thead>
            <tr>
              <th>Post</th>
              <th className="num">Reach</th>
              <th className="num">Views</th>
              <th className="num">Likes</th>
              <th className="num">Comments</th>
              <th className="num">Saves</th>
              <th className="num">Shares</th>
              <th className="num">Eng. rate</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ m, v, reach, rate, error: e }) => (
              <tr key={m.id}>
                <td>
                  <div className="row" style={{ flexWrap: "nowrap" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="thumb-sm" src={m.thumbnail_url ?? m.media_url} alt="" />
                    <div>
                      <a href={m.permalink} target="_blank" rel="noreferrer">
                        {new Date(m.timestamp).toLocaleDateString()}
                      </a>{" "}
                      <span className="muted small">{m.media_product_type ?? m.media_type}</span>
                      <div className="muted small clamp" style={{ maxWidth: 260 }}>
                        {m.caption}
                      </div>
                      {e && <div className="error small">{e}</div>}
                    </div>
                  </div>
                </td>
                <td className="num">{fmt.format(reach)}</td>
                <td className="num">{v.views !== undefined ? fmt.format(v.views) : "—"}</td>
                <td className="num">{fmt.format(m.like_count ?? 0)}</td>
                <td className="num">{fmt.format(m.comments_count ?? 0)}</td>
                <td className="num">{v.saved !== undefined ? fmt.format(v.saved) : "—"}</td>
                <td className="num">{v.shares !== undefined ? fmt.format(v.shares) : "—"}</td>
                <td className="num">{rate === null ? "—" : `${(rate * 100).toFixed(1)}%`}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="muted">
                  No posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card stat">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
  );
}
