import { LineChart } from "@/components/Charts";
import { LocalTime } from "@/components/LocalTime";
import { seriesColor } from "@/lib/charts";
import type { TopVideo } from "@/lib/db";

const fmt = new Intl.NumberFormat("en-US");
const HOUR = 3_600_000;
const CHARTED = 5;

const ageLabel = (h: number) => (h < 48 ? `${h}h` : `${Math.floor(h / 24)}d ${h % 24}h`);

/** Views gained over roughly the last hour, from the two newest counts. */
function lastHour(v: TopVideo): number | null {
  const h = v.history;
  if (h.length < 2) return null;
  const a = h[h.length - 2];
  const b = h[h.length - 1];
  const gap = new Date(b.at).getTime() - new Date(a.at).getTime();
  if (gap <= 0 || gap > 3 * HOUR) return null;
  return Math.round(((b.views - a.views) * HOUR) / gap);
}

function name(v: TopVideo, rank: number) {
  const words = (v.caption ?? "").split(/\s+/).slice(0, 5).join(" ");
  return `#${rank} ${words || "Untitled"}`;
}

/** Leaderboard of the most-viewed recent videos, plus how the top few grew hour by hour since posting. */
export function TopVideos({ videos, usernames }: { videos: TopVideo[]; usernames?: Map<string, string> }) {
  if (!videos.length) {
    return (
      <div className="card">
        <p className="muted small" style={{ margin: 0 }}>
          The worker saves every recent video&apos;s views once an hour. The first numbers show up here within the hour.
        </p>
      </div>
    );
  }
  const charted = videos.slice(0, CHARTED);
  // x = hours since posting, so videos posted at different times are compared like for like. Every video starts at 0.
  const ages = charted.map((v) => v.history.map((h) => Math.max(0, Math.round((new Date(h.at).getTime() - new Date(v.postedAt).getTime()) / HOUR))));
  const maxAge = Math.max(1, ...ages.flat());
  const labels = Array.from({ length: maxAge + 1 }, (_, h) => ageLabel(h));
  const series = charted.map((v, i) => {
    const values: (number | null)[] = labels.map(() => null);
    values[0] = 0;
    v.history.forEach((h, k) => (values[ages[i][k]] = Math.max(values[ages[i][k]] ?? 0, h.views)));
    return { name: name(v, i + 1), color: seriesColor(i), values };
  });
  const enoughHistory = videos.some((v) => v.history.length > 1);

  return (
    <div className="stack">
      <div className="card">
        <h3>Views since posting: top {charted.length}</h3>
        <p className="sub">
          Hours after each video went out. Counts are saved hourly
          {enoughHistory ? "." : ", so the lines fill in over the next few hours."}
        </p>
        <LineChart label="Views since posting for the top videos" labels={labels} series={series} height={240} />
      </div>
      <div className="card scroll">
        <table>
          <thead>
            <tr>
              <th>Video</th>
              {usernames && <th>Account</th>}
              <th>Posted</th>
              <th className="num">Views</th>
              <th className="num" title="Views gained in the last hour">Last hour</th>
              <th className="num" title="Average views per hour since posting">Per hour</th>
              <th className="num">Reach</th>
              <th className="num">Eng. / reach</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((v, i) => {
              const hours = Math.max(1, (Date.now() - new Date(v.postedAt).getTime()) / HOUR);
              const gained = lastHour(v);
              return (
                <tr key={v.mediaId}>
                  <td>
                    <div className="row" style={{ flexWrap: "nowrap" }}>
                      <span className="rank">
                        {i < CHARTED && <i className="key line" style={{ background: seriesColor(i) }} />}
                        {i + 1}
                      </span>
                      {v.thumbnailUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img className="thumb-sm" src={v.thumbnailUrl} alt="" />
                      ) : (
                        <span className="thumb-sm" />
                      )}
                      <div className="small clamp" style={{ maxWidth: 240 }}>
                        {v.permalink ? (
                          <a href={v.permalink} target="_blank" rel="noreferrer">
                            {v.caption?.split("\n")[0] || "View on Instagram"}
                          </a>
                        ) : (
                          v.caption?.split("\n")[0]
                        )}
                      </div>
                    </div>
                  </td>
                  {usernames && <td className="small">@{usernames.get(v.igUserId) ?? "removed"}</td>}
                  <td className="small" style={{ whiteSpace: "nowrap" }}>
                    <LocalTime iso={v.postedAt} />
                  </td>
                  <td className="num">
                    <strong>{fmt.format(v.views)}</strong>
                  </td>
                  <td className={`num ${gained ? "ok" : "muted"}`}>{gained === null ? "—" : `+${fmt.format(gained)}`}</td>
                  <td className="num">{fmt.format(Math.round(v.views / hours))}</td>
                  <td className="num">{v.reach === null ? "—" : fmt.format(v.reach)}</td>
                  <td className="num">
                    {v.reach && v.interactions !== null ? `${((v.interactions / v.reach) * 100).toFixed(1)}%` : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
