import Link from "next/link";
import { ConnectPrompt } from "@/components/ConnectPrompt";
import { LocalTime } from "@/components/LocalTime";
import { Sparkline } from "@/components/Sparkline";
import { type Account, type DB, getAccount, getDb, listAccounts, listPosts, listSnapshots, saveSnapshot } from "@/lib/db";
import { type PostStats, type Profile, accountStats } from "@/lib/insights";

export const dynamic = "force-dynamic";

const fmt = new Intl.NumberFormat("en-US");
const pct = (r: number | null) => (r === null ? "—" : `${(r * 100).toFixed(1)}%`);
const signed = (n: number | null) => (n === null ? "—" : `${n >= 0 ? "+" : ""}${fmt.format(n)}`);
const today = () => new Date().toISOString().slice(0, 10);

function record(db: DB, account: Account, profile: Profile) {
  if (profile.followers_count === undefined) return;
  saveSnapshot(db, account.igUserId, today(), profile.followers_count, profile.follows_count ?? null, profile.media_count ?? null);
}

/** Follower change over the last `days` days (or since the first snapshot, if newer). */
function change(snapshots: { day: string; followers: number }[], days = 7): number | null {
  if (snapshots.length < 2) return null;
  const cutoff = new Date(Date.now() - days * 86_400_000).toISOString().slice(0, 10);
  const base = [...snapshots].reverse().find((s) => s.day <= cutoff) ?? snapshots[0];
  return snapshots[snapshots.length - 1].followers - base.followers;
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const q = await searchParams;
  const db = getDb();
  const accounts = listAccounts(db);
  if (accounts.length === 0) {
    return (
      <>
        <h1>Dashboard</h1>
        <ConnectPrompt />
      </>
    );
  }
  // More than one account: the overview is the default; ?account=<username> shows one account in detail.
  const one =
    accounts.length === 1 ? accounts[0] : q.account && q.account !== "all" ? getAccount(db, q.account) : null;

  return (
    <>
      <h1>Dashboard</h1>
      {accounts.length > 1 && (
        <div className="tabs" style={{ marginBottom: 16 }}>
          <Link className={!one ? "on" : ""} href="/">
            All accounts
          </Link>
          {accounts.map((a) => (
            <Link key={a.igUserId} className={one?.igUserId === a.igUserId ? "on" : ""} href={`/?account=${encodeURIComponent(a.username)}`}>
              @{a.username}
            </Link>
          ))}
        </div>
      )}
      {one ? <AccountDetail account={one} /> : <Overview accounts={accounts} />}
    </>
  );
}

const OVERVIEW_POSTS = 6;

async function Overview({ accounts }: { accounts: Account[] }) {
  const db = getDb();
  const now = new Date();
  const results = await Promise.all(
    accounts.map((a) =>
      accountStats(a, undefined, OVERVIEW_POSTS).then(
        (s) => {
          record(db, a, s.profile);
          return { ok: true as const, ...s };
        },
        (e: Error) => ({ ok: false as const, error: e.message }),
      ),
    ),
  );
  const queued = listPosts(db).filter((p) => p.status === "scheduled" || p.status === "processing");
  const rows = accounts.map((a, i) => {
    const r = results[i];
    const snapshots = listSnapshots(db, a.igUserId, 30);
    const mine = queued.filter((p) => p.ig_user_id === a.igUserId);
    const next = mine.filter((p) => new Date(p.scheduled_at) >= now).sort((x, y) => x.scheduled_at.localeCompare(y.scheduled_at))[0];
    return {
      a,
      profile: r.ok ? r.profile : null,
      avgRate: r.ok ? r.avgRate : null,
      lastPost: r.ok ? (r.posts[0]?.media.timestamp ?? null) : null,
      error: r.ok ? null : r.error,
      snapshots,
      change: change(snapshots),
      queued: mine.length,
      next: next?.scheduled_at ?? null,
    };
  });
  const sum = (f: (r: (typeof rows)[number]) => number | null | undefined) =>
    rows.reduce((t, r) => t + (f(r) ?? 0), 0);
  const changes = rows.map((r) => r.change).filter((c): c is number => c !== null);

  return (
    <>
      <div className="stats">
        <Stat label="Accounts" value={String(accounts.length)} />
        <Stat label="Total followers" value={fmt.format(sum((r) => r.profile?.followers_count))} />
        <Stat label="Follower change (7 days)" value={changes.length ? signed(changes.reduce((t, c) => t + c, 0)) : "—"} />
        <Stat label="Total posts" value={fmt.format(sum((r) => r.profile?.media_count))} />
        <Stat label="Queued posts" value={fmt.format(queued.length)} />
      </div>

      <h2>Accounts</h2>
      <div className="card scroll">
        <table>
          <thead>
            <tr>
              <th>Account</th>
              <th className="num">Followers</th>
              <th className="num">7-day change</th>
              <th className="num">Following</th>
              <th className="num">Posts</th>
              <th className="num" title={`Average over the last ${OVERVIEW_POSTS} posts`}>
                Eng. / reach
              </th>
              <th>Last post</th>
              <th>Next scheduled</th>
              <th style={{ width: 110 }}>Trend</th>
            </tr>
          </thead>
          <tbody>
            {rows
              .slice()
              .sort((x, y) => (y.profile?.followers_count ?? -1) - (x.profile?.followers_count ?? -1))
              .map((r) => (
                <tr key={r.a.igUserId}>
                  <td>
                    <div className="row" style={{ flexWrap: "nowrap" }}>
                      {r.profile?.profile_picture_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img className="avatar" src={r.profile.profile_picture_url} alt="" />
                      ) : (
                        <span className="avatar" />
                      )}
                      <div>
                        <Link href={`/?account=${encodeURIComponent(r.a.username)}`}>@{r.a.username}</Link>
                        <div className="muted small">{r.a.pageName}</div>
                        {r.error && <div className="error small">{r.error}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="num">{r.profile ? fmt.format(r.profile.followers_count ?? 0) : "—"}</td>
                  <td className={`num ${r.change !== null && r.change < 0 ? "error" : r.change ? "ok" : ""}`}>{signed(r.change)}</td>
                  <td className="num">{r.profile ? fmt.format(r.profile.follows_count ?? 0) : "—"}</td>
                  <td className="num">{r.profile ? fmt.format(r.profile.media_count ?? 0) : "—"}</td>
                  <td className="num">{pct(r.avgRate)}</td>
                  <td className="small" style={{ whiteSpace: "nowrap" }}>
                    {r.lastPost ? <LocalTime iso={r.lastPost} /> : <span className="muted">None yet</span>}
                  </td>
                  <td className="small" style={{ whiteSpace: "nowrap" }}>
                    {r.next ? (
                      <Link href={`/schedule?account=${encodeURIComponent(r.a.username)}`}>
                        <LocalTime iso={r.next} />
                      </Link>
                    ) : (
                      <span className="muted">Nothing queued</span>
                    )}
                    {r.queued > 1 && <div className="muted">{r.queued} queued</div>}
                  </td>
                  <td>
                    {r.snapshots.length > 1 ? (
                      <Sparkline compact values={r.snapshots.map((s) => s.followers)} label={`@${r.a.username} followers`} />
                    ) : (
                      <span className="muted small">From tomorrow</span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <p className="muted small">
        Follower history is saved once a day per account (by the worker, or when you open the Dashboard). Click an account
        for its posts and insights.
      </p>
    </>
  );
}

async function AccountDetail({ account }: { account: Account }) {
  const db = getDb();

  let profile: Profile | null = null;
  let posts: PostStats[] = [];
  let avgRate: number | null = null;
  let error: string | null = null;
  try {
    ({ profile, posts, avgRate } = await accountStats(account));
    record(db, account, profile);
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
