import type { ReactNode } from "react";
import Link from "next/link";
import { ConnectPrompt } from "@/components/ConnectPrompt";
import { LocalTime } from "@/components/LocalTime";
import { BarList, ColumnChart, LineChart, SegmentedBar } from "@/components/Charts";
import { Sparkline } from "@/components/Sparkline";
import { FbPage } from "@/components/FbPage";
import { TopVideos } from "@/components/TopVideos";
import { facebookPages } from "@/lib/pages";
import { type Account, type DB, type PostRow, getAccount, getDb, listAccounts, listPosts, listSnapshots, saveSnapshot, topVideos, totalVideoViews } from "@/lib/db";
import { HOUR_LABELS, dayLabel, dayRange, postsPerDay, postsPerHour, seriesColor } from "@/lib/charts";
import { GraphClient } from "@/lib/graph";
import { hasFacebookPage } from "@/lib/posts";
import { type PostStats, type Profile, accountStats } from "@/lib/insights";

export const dynamic = "force-dynamic";

const fmt = new Intl.NumberFormat("en-US");
const pct = (r: number | null) => (r === null ? "—" : `${(r * 100).toFixed(1)}%`);
const signed = (n: number | null) => (n === null ? "—" : `${n >= 0 ? "+" : ""}${fmt.format(n)}`);
const today = () => new Date().toISOString().slice(0, 10);

/** Views, reach and interactions since local midnight, or null if Instagram won't say. */
async function todayTotals(account: Account) {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  try {
    return await new GraphClient({ token: account.token }).accountTotals(account.igUserId, midnight, now);
  } catch {
    return null;
  }
}

async function record(db: DB, account: Account, profile: Profile) {
  if (profile.followers_count === undefined) return;
  await saveSnapshot(db, account.igUserId, today(), profile.followers_count, profile.follows_count ?? null, profile.media_count ?? null);
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
  const db = await getDb();
  const accounts = await listAccounts(db);
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
    accounts.length === 1 ? accounts[0] : q.account && q.account !== "all" ? await getAccount(db, q.account) : null;

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
      {one ? <AccountDetail account={one} colorIndex={Math.max(0, accounts.findIndex((a) => a.igUserId === one.igUserId))} /> : <Overview accounts={accounts} />}
    </>
  );
}

const OVERVIEW_POSTS = 6;

async function Overview({ accounts }: { accounts: Account[] }) {
  const db = await getDb();
  const now = new Date();
  const results = await Promise.all(
    accounts.map((a) =>
      accountStats(a, undefined, OVERVIEW_POSTS).then(
        async (s) => {
          await record(db, a, s.profile);
          return { ok: true as const, ...s };
        },
        (e: Error) => ({ ok: false as const, error: e.message }),
      ),
    ),
  );
  const [totals, fbPages, tracked] = await Promise.all([Promise.all(accounts.map(todayTotals)), facebookPages(accounts), totalVideoViews(db)]);
  const allPosts = await listPosts(db);
  const queued = allPosts.filter((p) => p.status === "scheduled" || p.status === "processing");
  const history = await Promise.all(accounts.map((a) => listSnapshots(db, a.igUserId, 30)));
  const rows = accounts.map((a, i) => {
    const r = results[i];
    const snapshots = history[i];
    const mine = queued.filter((p) => p.ig_user_id === a.igUserId);
    const next = mine.filter((p) => new Date(p.scheduled_at) >= now).sort((x, y) => x.scheduled_at.localeCompare(y.scheduled_at))[0];
    return {
      a,
      profile: r.ok ? r.profile : null,
      avgRate: r.ok ? r.avgRate : null,
      avgReach: r.ok && r.posts.length ? Math.round(r.posts.reduce((t, p) => t + p.reach, 0) / r.posts.length) : null,
      lastPost: r.ok ? (r.posts[0]?.media.timestamp ?? null) : null,
      error: r.ok ? null : r.error,
      snapshots,
      change: change(snapshots),
      today: totals[i],
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
        <Stat label="Views today" value={totals.some(Boolean) ? fmt.format(sum((r) => r.today?.views)) : "—"} />
        <Stat label="Total views (tracked Reels)" value={tracked.videos ? fmt.format(tracked.views) : "—"} />
        <Stat label="Reached today" value={totals.some(Boolean) ? fmt.format(sum((r) => r.today?.reach)) : "—"} />
        <Stat label="Total followers" value={fmt.format(sum((r) => r.profile?.followers_count))} />
        <Stat label="Follower change (7 days)" value={changes.length ? signed(changes.reduce((t, c) => t + c, 0)) : "—"} />
        <Stat label="Total posts" value={fmt.format(sum((r) => r.profile?.media_count))} />
        <Stat label="Queued posts" value={fmt.format(queued.length)} />
      </div>

      <OverviewCharts accounts={accounts} rows={rows} posts={allPosts} now={now} />

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
                        <div className="muted small">
                          {fbPages.get(r.a.igUserId) ? <FbPage page={fbPages.get(r.a.igUserId)!} size={18} /> : r.a.pageName}
                        </div>
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

async function AccountDetail({ account, colorIndex }: { account: Account; colorIndex: number }) {
  const db = await getDb();

  let profile: Profile | null = null;
  let posts: PostStats[] = [];
  let avgRate: number | null = null;
  let error: string | null = null;
  try {
    ({ profile, posts, avgRate } = await accountStats(account));
    await record(db, account, profile);
  } catch (err) {
    error = err instanceof Error ? err.message : "Could not load account";
  }

  const todayStats = await todayTotals(account);
  const tracked = await totalVideoViews(db, account.igUserId);
  const snapshots = await listSnapshots(db, account.igUserId);
  const first = snapshots[0];
  const last = snapshots[snapshots.length - 1];
  const growth = first && last && snapshots.length > 1 ? last.followers - first.followers : null;
  const rows = posts.map((p) => ({ m: p.media, v: p.values, reach: p.reach, rate: p.rate, error: p.error }));

  return (
    <>
      {error && <p className="error">{error}</p>}
      {profile && (
        <div className="stats">
          <Stat label="Views today" value={todayStats ? fmt.format(todayStats.views ?? 0) : "—"} />
          <Stat label="Total views (tracked Reels)" value={tracked.videos ? fmt.format(tracked.views) : "—"} />
          <Stat label="Reached today" value={todayStats ? fmt.format(todayStats.reach ?? 0) : "—"} />
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
        {snapshots.length > 0 ? (
          <LineChart
            label={`@${account.username} followers per day`}
            labels={snapshots.map((s) => dayLabel(s.day))}
            series={[{ name: "Followers", color: seriesColor(colorIndex), values: snapshots.map((s) => s.followers) }]}
          />
        ) : (
          <p className="muted small" style={{ margin: 0 }}>
            One snapshot is saved each day you open the dashboard (or the worker runs).
          </p>
        )}
        {snapshots.length === 1 && <p className="muted small">The line starts tomorrow, after the second daily snapshot.</p>}
      </div>

      <h2>Top videos, last 7 days</h2>
      <TopVideos videos={await topVideos(db, { igUserId: account.igUserId, since: new Date(Date.now() - 7 * 86_400_000) })} />

      {hasFacebookPage(account) && <FacebookSection account={account} />}

      <AccountCharts account={account} posts={posts} colorIndex={colorIndex} />

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

function ChartCard({ title, sub, children }: { title: string; sub?: string; children: ReactNode }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      {sub && <p className="sub">{sub}</p>}
      {children}
    </div>
  );
}

type OverviewRow = {
  a: Account;
  profile: Profile | null;
  avgRate: number | null;
  avgReach: number | null;
  snapshots: { day: string; followers: number }[];
  change: number | null;
  today: Record<string, number> | null;
};

async function OverviewCharts({ accounts, rows, posts, now }: { accounts: Account[]; rows: OverviewRow[]; posts: PostRow[]; now: Date }) {
  const ids = accounts.map((a) => a.igUserId);
  const color = new Map(ids.map((id, i) => [id, seriesColor(i)]));
  const days = dayRange(now, -7, 21);
  const perDay = postsPerDay(posts, days, (p) => p.ig_user_id, ids);
  const perHour = postsPerHour(posts, now, (p) => p.ig_user_id, ids);
  const scheduled = posts.filter((p) => p.status === "scheduled");
  const count = (f: (p: PostRow) => boolean, list = posts) => list.filter(f).length;

  const top = await topVideos(await getDb(), { since: new Date(now.getTime() - 7 * 86_400_000) });

  return (
    <>
      <h2>Top videos, last 7 days</h2>
      <TopVideos videos={top} usernames={new Map(accounts.map((a) => [a.igUserId, a.username]))} />

      <h2>Followers</h2>
      <div className="chart-grid">
        {rows.map((r) => (
          <ChartCard key={r.a.igUserId} title={`@${r.a.username}`}>
            <div className="headline">
              <span className="big">{r.profile ? fmt.format(r.profile.followers_count ?? 0) : "—"}</span>
              <span className={`small ${r.change !== null && r.change < 0 ? "error" : r.change ? "ok" : "muted"}`}>
                {r.change === null ? "change shows from day two" : `${signed(r.change)} in 7 days`}
              </span>
            </div>
            {r.today && (
              <p className="small muted" style={{ margin: "0 0 8px" }}>
                Today: <strong className="ink">{fmt.format(r.today.views ?? 0)}</strong> views ·{" "}
                <strong className="ink">{fmt.format(r.today.reach ?? 0)}</strong> reached ·{" "}
                <strong className="ink">{fmt.format(r.today.total_interactions ?? 0)}</strong> interactions
              </p>
            )}
            {r.snapshots.length > 0 ? (
              <LineChart
                height={140}
                label={`@${r.a.username} followers per day`}
                labels={r.snapshots.map((s) => dayLabel(s.day))}
                series={[{ name: "Followers", color: color.get(r.a.igUserId)!, values: r.snapshots.map((s) => s.followers) }]}
              />
            ) : (
              <p className="muted small">No snapshots yet.</p>
            )}
          </ChartCard>
        ))}
      </div>

      <h2>Posting</h2>
      <div className="stack">
        <ChartCard title="Posts per day" sub="Last 7 days and the next 3 weeks, by account. Published before the Today line, scheduled after it.">
          <ColumnChart
            label="Posts per day by account"
            labels={days.map(dayLabel)}
            marker={{ index: 7, label: "Today" }}
            series={accounts.map((a, i) => ({ name: `@${a.username}`, color: seriesColor(i), values: perDay[i] }))}
          />
        </ChartCard>
        <div className="chart-grid">
          <ChartCard title="Queued posts by time of day" sub="When the upcoming posts go out (this computer's time zone).">
            <ColumnChart
              height={180}
              label="Upcoming posts by hour of day"
              labels={HOUR_LABELS}
              series={accounts.map((a, i) => ({ name: `@${a.username}`, color: seriesColor(i), values: perHour[i] }))}
            />
          </ChartCard>
          <div className="stack">
            <ChartCard title="Queue mix" sub={`${fmt.format(scheduled.length)} posts waiting to publish.`}>
              <SegmentedBar
                label="Queue mix"
                parts={[
                  { name: "Reels", value: count((p) => p.type === "REELS" && !p.trial_strategy, scheduled), color: "var(--series-1)" },
                  { name: "Trial Reels", value: count((p) => !!p.trial_strategy, scheduled), color: "var(--series-2)" },
                  { name: "Images", value: count((p) => p.type === "IMAGE", scheduled), color: "var(--series-3)" },
                ]}
              />
            </ChartCard>
            {posts.some((p) => p.fb_status) && (
              <ChartCard title="Facebook cross-posts" sub="Reels also going to the linked Facebook Pages.">
                <SegmentedBar
                  label="Facebook cross-posts by status"
                  parts={[
                    { name: "Published", value: count((p) => p.fb_status === "published"), color: "var(--status-good)" },
                    { name: "Queued", value: count((p) => p.fb_status === "pending" || p.fb_status === "processing"), color: "var(--status-warning)", dark: true },
                    { name: "Failed", value: count((p) => p.fb_status === "failed"), color: "var(--status-critical)" },
                  ]}
                />
              </ChartCard>
            )}
            <ChartCard title="All posts by status">
              <SegmentedBar
                label="Posts by status"
                parts={[
                  { name: "Published", value: count((p) => p.status === "published"), color: "var(--status-good)" },
                  { name: "Scheduled", value: count((p) => p.status === "scheduled" || p.status === "processing"), color: "var(--status-warning)", dark: true },
                  { name: "Failed", value: count((p) => p.status === "failed"), color: "var(--status-critical)" },
                  { name: "Cancelled", value: count((p) => p.status === "cancelled"), color: "var(--chart-ink)" },
                ]}
              />
            </ChartCard>
          </div>
        </div>
      </div>

      <h2>Performance</h2>
      <div className="chart-grid">
        <ChartCard title="Views today" sub="All of each account's posts and Reels, since midnight.">
          <BarList items={rows.map((r) => ({ label: `@${r.a.username}`, value: r.today?.views ?? null, color: color.get(r.a.igUserId) }))} />
        </ChartCard>
        <ChartCard title="Engagement per reach" sub={`Average over each account's last ${OVERVIEW_POSTS} posts.`}>
          <BarList
            unit="percent"
            items={rows.map((r) => ({ label: `@${r.a.username}`, value: r.avgRate, color: color.get(r.a.igUserId) }))}
          />
        </ChartCard>
        <ChartCard title="Average reach per post" sub={`Accounts reached, last ${OVERVIEW_POSTS} posts.`}>
          <BarList items={rows.map((r) => ({ label: `@${r.a.username}`, value: r.avgReach, color: color.get(r.a.igUserId) }))} />
        </ChartCard>
        <ChartCard title="Followers by account">
          <BarList
            items={rows.map((r) => ({ label: `@${r.a.username}`, value: r.profile?.followers_count ?? null, color: color.get(r.a.igUserId) }))}
          />
        </ChartCard>
      </div>
    </>
  );
}

async function AccountCharts({ account, posts, colorIndex }: { account: Account; posts: PostStats[]; colorIndex: number }) {
  const db = await getDb();
  const now = new Date();
  const mine = await listPosts(db, { igUserId: account.igUserId });
  const days = dayRange(now, -7, 21);
  const [published, upcoming] = postsPerDay(mine, days, (p) => (p.status === "published" ? "published" : "queued"), ["published", "queued"]);
  const [perHour] = postsPerHour(mine, now, () => "all", ["all"]);
  const recent = [...posts].reverse(); // oldest first
  const labels = recent.map((p) => new Date(p.media.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }));
  const c = seriesColor(colorIndex);

  return (
    <>
      <h2>Posting</h2>
      <div className="stack">
        <ChartCard title="Posts per day" sub="Last 7 days and the next 3 weeks.">
          <ColumnChart
            label={`@${account.username} posts per day`}
            labels={days.map(dayLabel)}
            marker={{ index: 7, label: "Today" }}
            series={[
              { name: "Published", color: "var(--series-3)", values: published },
              { name: "Scheduled", color: "var(--series-1)", values: upcoming },
            ]}
          />
        </ChartCard>
        <ChartCard title="Queued posts by time of day" sub="This computer's time zone.">
          <ColumnChart height={180} label="Upcoming posts by hour of day" labels={HOUR_LABELS} series={[{ name: "Posts", color: c, values: perHour }]} />
        </ChartCard>
      </div>

      {recent.length > 0 && (
        <>
          <h2>Recent post performance</h2>
          <div className="chart-grid">
            <ChartCard title="Reach per post" sub={`Last ${recent.length} posts, oldest first.`}>
              <ColumnChart height={200} label="Reach per post" labels={labels} series={[{ name: "Reach", color: c, values: recent.map((p) => p.reach) }]} />
            </ChartCard>
            <ChartCard title="Engagement per reach" sub="Interactions divided by accounts reached.">
              <ColumnChart
                height={200}
                unit="percent"
                label="Engagement rate per post"
                labels={labels}
                series={[{ name: "Engagement rate", color: c, values: recent.map((p) => p.rate) }]}
              />
            </ChartCard>
          </div>
          <div className="card" style={{ marginTop: 12 }}>
            <h3>Interactions per post</h3>
            <p className="sub">Likes, comments, saves and shares.</p>
            <ColumnChart
              label="Interactions per post"
              labels={labels}
              series={[
                { name: "Likes", color: "var(--series-1)", values: recent.map((p) => p.media.like_count ?? 0) },
                { name: "Comments", color: "var(--series-2)", values: recent.map((p) => p.media.comments_count ?? 0) },
                { name: "Saves", color: "var(--series-3)", values: recent.map((p) => p.values.saved ?? 0) },
                { name: "Shares", color: "var(--series-4)", values: recent.map((p) => p.values.shares ?? 0) },
              ]}
            />
          </div>
        </>
      )}
    </>
  );
}

/** The linked Facebook Page: followers and plays of the latest cross-posted Reels. */
async function FacebookSection({ account }: { account: Account }) {
  const db = await getDb();
  const crossPosts = (await listPosts(db, { igUserId: account.igUserId })).filter((p) => p.fb_status);
  const published = crossPosts.filter((p) => p.fb_status === "published" && p.fb_video_id).slice(0, 10);
  let followers: number | null = null;
  let plays: (number | null)[] = [];
  let problem: string | null = null;
  let page: Awaited<ReturnType<GraphClient["pageForInstagram"]>> = null;
  try {
    page = await new GraphClient({ token: account.token }).pageForInstagram(account.igUserId);
    if (page) {
      const pc = new GraphClient({ token: page.token });
      followers = await pc.pageFollowers(page.id).catch(() => null);
      plays = await Promise.all(published.map((p) => pc.pageReelPlays(p.fb_video_id!).catch(() => null)));
    }
  } catch (err) {
    problem = err instanceof Error ? err.message : "Could not reach Facebook";
  }
  const n = (s: string) => crossPosts.filter((p) => p.fb_status === s).length;
  return (
    <>
      <h2 className="row">Facebook {page ? <FbPage page={page} /> : account.pageName}</h2>
      {problem && <p className="error small">{problem}</p>}
      <div className="stats">
        <Stat label="Page followers" value={followers === null ? "—" : fmt.format(followers)} />
        <Stat label="Reels posted to Facebook" value={fmt.format(n("published"))} />
        <Stat label="Queued for Facebook" value={fmt.format(n("pending") + n("processing"))} />
        <Stat label="Failed on Facebook" value={fmt.format(n("failed"))} />
      </div>
      {published.length > 0 && (
        <div className="card" style={{ marginTop: 12 }}>
          <h3>Plays on recent Facebook Reels</h3>
          <p className="sub">Latest {published.length}, newest first.</p>
          <BarList
            items={published.map((p, i) => ({
              label: `${new Date(p.scheduled_at).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}`,
              value: plays[i] ?? null,
            }))}
          />
        </div>
      )}
    </>
  );
}
