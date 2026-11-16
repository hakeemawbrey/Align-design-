import Link from "next/link";
import { ConnectPrompt } from "@/components/ConnectPrompt";
import { LocalTime } from "@/components/LocalTime";
import { type Finding, type Scored, HIT, MIN_DAYS, MIN_GROUP } from "@/lib/analysis";
import { loadAnalysis } from "@/lib/analysisData";
import { getDb, getSetting, listAccounts } from "@/lib/db";

export const dynamic = "force-dynamic";

const fmt = new Intl.NumberFormat("en-US");
const times = (v: number) => `${v.toFixed(v >= 10 ? 0 : v >= 3 ? 1 : 2)}×`;
const pct = (v: number) => `${Math.round(v * 100)}%`;
const PERIODS = [14, 30];

/** One line a person can act on, from a finding. */
function sentence(f: Finding, good: boolean) {
  const hits = Math.round(f.hitRate * f.count);
  const what = `${f.dimension.toLowerCase()}: ${f.value}`;
  return good
    ? `${what}. A typical one gets ${times(f.index)} the usual views, and ${hits} of ${f.count} were hits.`
    : `${what}. A typical one gets ${times(f.index)} the usual views across ${f.count} Reels.`;
}

function Chips({ s }: { s: Scored }) {
  const keys = ["format", "sign", "theme", "ending", "length", "series"];
  return (
    <span className="small muted">
      {keys
        .map((k) => s.features[k])
        .filter(Boolean)
        .join(" · ")}
    </span>
  );
}

function ReelTable({ rows, show }: { rows: Scored[]; show: "index" | "saves" | "shares" }) {
  if (!rows.length) return <p className="muted small">None yet.</p>;
  return (
    <div className="scroll">
      <table>
        <thead>
          <tr>
            <th>Reel</th>
            <th>Account</th>
            <th className="num">Views at 24 h</th>
            <th className="num">{show === "index" ? "× usual" : show === "saves" ? "Saves" : "Shares"}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.postId}>
              <td>
                {r.permalink ? (
                  <a href={r.permalink} target="_blank" rel="noreferrer">
                    {r.title}
                  </a>
                ) : (
                  r.title
                )}
                <br />
                <Chips s={r} />
              </td>
              <td className="small">
                @{r.account}
                <br />
                <span className="muted">
                  <LocalTime iso={r.postedAt} />
                </span>
              </td>
              <td className="num">{fmt.format(r.views24)}</td>
              <td className="num">
                {show === "index" ? times(r.index) : fmt.format(show === "saves" ? r.saves : r.shares)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function AnalyzePage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const q = await searchParams;
  const db = await getDb();
  const accounts = await listAccounts(db);
  if (!accounts.length) return <ConnectPrompt />;
  const chosen = accounts.find((a) => a.username === q.account) ?? null;
  const days = PERIODS.includes(Number(q.days)) ? Number(q.days) : 30;
  const a = await loadAnalysis(db, { days, igUserId: chosen?.igUserId });
  const ideasUrl = await getSetting(db, "ideas_artifact_url");
  const link = (p: { account?: string | null; days?: number }) => {
    const sp = new URLSearchParams();
    const acc = p.account === undefined ? chosen?.username : p.account;
    if (acc) sp.set("account", acc);
    const d = p.days ?? days;
    if (d !== 30) sp.set("days", String(d));
    const s = sp.toString();
    return s ? `/analyze?${s}` : "/analyze";
  };

  return (
    <>
      <h1>Analyze</h1>
      <p className="muted">
        What your best Reels have in common. Each Reel is compared at 24 hours old with the same account&apos;s Reels from
        nearby days, so <strong className="ink">1.0×</strong> is a usual Reel and <strong className="ink">2.0×</strong> is
        twice the usual. A <strong className="ink">hit</strong> got at least {HIT}× the usual views.
      </p>
      <div className="row" style={{ gap: 12, flexWrap: "wrap", margin: "12px 0" }}>
        <div className="tabs">
          <Link href={link({ account: null })} className={chosen ? "" : "on"}>
            All accounts
          </Link>
          {accounts.map((acc) => (
            <Link key={acc.igUserId} href={link({ account: acc.username })} className={chosen?.igUserId === acc.igUserId ? "on" : ""}>
              @{acc.username}
            </Link>
          ))}
        </div>
        <div className="tabs">
          {PERIODS.map((d) => (
            <Link key={d} href={link({ days: d })} className={d === days ? "on" : ""}>
              Last {d} days
            </Link>
          ))}
        </div>
      </div>

      {a.reels === 0 ? (
        <div className="card">
          <p className="muted">No Reels to compare yet. A Reel is counted once it is 24 hours old.</p>
        </div>
      ) : (
        <>
          <div className="stats">
            <div className="card stat">
              <div className="label">Reels compared</div>
              <div className="value">{fmt.format(a.reels)}</div>
            </div>
            <div className="card stat">
              <div className="label">Hits ({HIT}× usual or more)</div>
              <div className="value">{pct(a.hitRate)}</div>
            </div>
            <div className="card stat">
              <div className="label">Best Reel</div>
              <div className="value">{a.top[0] ? times(a.top[0].index) : "—"}</div>
            </div>
          </div>

          <div className="chart-grid" style={{ marginTop: 12 }}>
            <div className="card">
              <h3>What&apos;s working</h3>
              <p className="sub">
                Beats the usual, or lands hits far more often than average. Needs {MIN_GROUP}+ Reels from {MIN_DAYS}+ days.
              </p>
              {a.working.length ? (
                <ul className="small">
                  {a.working.map((f) => (
                    <li key={f.dimension + f.value}>{sentence(f, true)}</li>
                  ))}
                </ul>
              ) : (
                <p className="muted small">Nothing stands clearly above the usual yet. Most wins are single hits; see the list below.</p>
              )}
            </div>
            <div className="card">
              <h3>What&apos;s holding views back</h3>
              <p className="sub">A typical one gets clearly fewer views than usual.</p>
              {a.dragging.length ? (
                <ul className="small">
                  {a.dragging.map((f) => (
                    <li key={f.dimension + f.value}>{sentence(f, false)}</li>
                  ))}
                </ul>
              ) : (
                <p className="muted small">Nothing stands clearly below the usual.</p>
              )}
            </div>
            <div className="card">
              <h3>Ideas from Claude</h3>
              <p className="sub">New formats and hooks to try, from your top and bottom Reels. Runs on your Claude plan.</p>
              {ideasUrl ? (
                <p>
                  <a href={ideasUrl} target="_blank" rel="noreferrer">
                    Open the ideas page →
                  </a>
                </p>
              ) : (
                <p className="muted small">Not set up yet.</p>
              )}
            </div>
          </div>

          <h2>Biggest hits</h2>
          <div className="card">
            <ReelTable rows={a.top} show="index" />
          </div>

          <div className="chart-grid" style={{ marginTop: 12 }}>
            <div className="card">
              <h3>Most saved</h3>
              <p className="sub">Saves usually mean people want to come back to it.</p>
              <ReelTable rows={a.topSaves} show="saves" />
            </div>
            <div className="card">
              <h3>Most shared</h3>
              <p className="sub">Shares bring in people who don&apos;t follow you yet.</p>
              <ReelTable rows={a.topShares} show="shares" />
            </div>
          </div>

          <h2>By what the Reel is and how it went out</h2>
          <div className="chart-grid">
            {a.dimensions.map((d) => (
              <div key={d.key} className="card">
                <h3>{d.label}</h3>
                <div className="scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>{d.label}</th>
                        <th className="num">Reels</th>
                        <th className="num">Typical</th>
                        <th className="num">Hits</th>
                        <th className="num">Saves / 1k</th>
                        <th className="num">Shares / 1k</th>
                      </tr>
                    </thead>
                    <tbody>
                      {d.groups.slice(0, 15).map((g) => (
                        <tr key={g.value} className={g.count < MIN_GROUP ? "muted" : undefined}>
                          <td>{g.value}</td>
                          <td className="num">{g.count}</td>
                          <td className="num">{times(g.index)}</td>
                          <td className="num">{pct(g.hitRate)}</td>
                          <td className="num">{g.savesPer1k.toFixed(1)}</td>
                          <td className="num">{g.sharesPer1k.toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {d.groups.length > 15 && <p className="muted small">{d.groups.length - 15} more not shown.</p>}
              </div>
            ))}
          </div>

          <h2>Furthest below usual</h2>
          <div className="card">
            <ReelTable rows={a.bottom} show="index" />
          </div>
          <p className="muted small">
            Greyed rows have fewer than {MIN_GROUP} Reels. Saves and shares come from the worker&apos;s hourly checks and only
            started on Nov 6.
          </p>
        </>
      )}
    </>
  );
}
