import Link from "next/link";
import { notFound } from "next/navigation";
import { hookOf } from "@/lib/analysis";
import { loadAnalysis } from "@/lib/analysisData";
import { getDb, getSetting } from "@/lib/db";
import { type StudyPost, getCreator, linkKey, listCreators, postHeadline, summarise, topForScripts } from "@/lib/research";

export const dynamic = "force-dynamic";

const fmt = new Intl.NumberFormat("en-US");
const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });
const times = (v: number | null | undefined) => (v == null ? "—" : `${v.toFixed(v >= 10 ? 0 : v >= 3 ? 1 : 2)}×`);
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const SORTS = { lift: "Best vs typical", date: "Newest", views: "Most views" } as const;

const headline = (p: StudyPost) => postHeadline(p).slice(0, 110) || p.shortcode;
const med = (v: number[]) => {
  if (!v.length) return null;
  const s = [...v].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

export default async function CreatorPage({
  params,
  searchParams,
}: {
  params: Promise<{ handle: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { handle: raw } = await params;
  const q = await searchParams;
  const handle = decodeURIComponent(raw);
  const data = getCreator(handle);
  if (!data) notFound();
  const { creator, posts } = data;
  const creators = listCreators();
  const summary = summarise(posts);
  const types = [...new Set(posts.map((p) => p.type))];
  const type = q.type && types.includes(q.type) ? q.type : null;
  const format = q.format ?? null;
  const sort = (q.sort && q.sort in SORTS ? q.sort : "lift") as keyof typeof SORTS;
  const shown = posts
    .filter((p) => (!type || p.type === type) && (!format || (p.formats ?? []).includes(format)))
    .sort((a, b) =>
      sort === "date" ? String(b.date ?? "").localeCompare(String(a.date ?? "")) : sort === "views" ? (b.views ?? -1) - (a.views ?? -1) : (b.lift ?? -1) - (a.lift ?? -1),
    );
  const post = posts.find((p) => p.shortcode === q.post) ?? shown[0] ?? null;
  const typical = post ? summary.byType.find((t) => t.type === post.type) : null;
  const link = (o: Record<string, string | null | undefined>) => {
    const sp = new URLSearchParams();
    const merged = { type, format, sort: sort === "lift" ? null : sort, post: post?.shortcode, ...o };
    for (const [k, v] of Object.entries(merged)) if (v) sp.set(k, v);
    return `/research/${encodeURIComponent(handle)}?${sp.toString()}`;
  };
  const name = creator.site === "facebook" ? creator.name || handle : `@${handle}`;

  // Their title styles next to yours: the same "title style" the Analyze page uses for your Reels.
  const theirs = new Map<string, number[]>();
  for (const p of posts) {
    const h = postHeadline(p);
    if (!h || p.lift == null) continue;
    const k = hookOf(h);
    theirs.set(k, [...(theirs.get(k) ?? []), p.lift]);
  }
  const mine = await loadAnalysis(await getDb(), { days: 30 });
  const yourHooks = new Map((mine.dimensions.find((d) => d.key === "hook")?.groups ?? []).map((g) => [g.value, g]));
  const compare = [...theirs]
    .map(([style, lifts]) => ({ style, count: lifts.length, lift: med(lifts), hits: lifts.filter((l) => l >= 2).length, you: yourHooks.get(style) ?? null }))
    .sort((a, b) => (b.lift ?? 0) - (a.lift ?? 0));
  // Links into the Reel Ideas Lab's script maker: #script-<creator>-<post>, in the same order its data was built.
  const ideasUrl = await getSetting(await getDb(), "ideas_artifact_url");
  // Keys, not positions: the ideas page's creator list is a snapshot and may be in a different order.
  const inScripts = post ? topForScripts(posts).some((p) => p.shortcode === post.shortcode) : false;
  const scriptHash = `#script-${linkKey(handle)}${post && inScripts ? `-${linkKey(post.shortcode)}` : ""}`;
  const untried = compare.filter((c) => c.count >= 3 && (c.lift ?? 0) >= 1.3 && (!c.you || c.you.count < 3));

  return (
    <>
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 8 }}>
        <div>
          <Link href="/research" className="small">
            ← Research
          </Link>
          <h1 style={{ margin: "4px 0" }}>{name}</h1>
          <div className="small muted">
            {creator.site === "facebook" ? "Facebook" : "Instagram"} · {fmt.format(posts.length)} posts
            {creator.followers != null && ` · ${fmt.format(creator.followers)} followers`} ·{" "}
            {creator.source === "study" ? "studied on this Mac" : "from your private repo"}
          </div>
        </div>
        <div className="row">
          <span className="small muted">Creator</span>
          <nav className="tabs" aria-label="Creators">
            {creators.map((c) => (
              <Link key={c.handle} href={`/research/${encodeURIComponent(c.handle)}`} className={c.handle === handle ? "on" : ""}>
                {c.site === "facebook" ? c.name || c.handle : `@${c.handle}`}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="chart-grid" style={{ marginBottom: 12 }}>
        <div className="card">
          <h3>Typical post</h3>
          <table>
            <tbody>
              {summary.byType.map((t) => (
                <tr key={t.type}>
                  <td>{t.type}</td>
                  <td className="num">{t.count}</td>
                  <td className="num">{t.typicalViews != null ? `${compact.format(t.typicalViews)} views` : t.typicalLikes != null ? `${compact.format(t.typicalLikes)} likes` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="sub" style={{ marginTop: 6 }}>
            {summary.hits} of {summary.measured} posts did 2× their typical or better.
          </p>
        </div>
        <div className="card">
          <h3>What works for them</h3>
          <p className="sub">Formats by typical result vs their own usual (needs 3+ posts).</p>
          <ul className="small" style={{ margin: 0 }}>
            {summary.formats
              .filter((f) => f.count >= 3)
              .slice(0, 6)
              .map((f) => (
                <li key={f.value}>
                  <Link href={link({ format: f.value, post: null })}>{f.value}</Link>: {times(f.lift)} typical, {f.hits} hits of {f.count}
                </li>
              ))}
          </ul>
        </div>
        <div className="card">
          <h3>Topics</h3>
          <ul className="small" style={{ margin: 0 }}>
            {summary.topics
              .filter((t) => t.count >= 2)
              .slice(0, 6)
              .map((t) => (
                <li key={t.value}>
                  {t.value}: {times(t.lift)} typical, {t.count} posts
                </li>
              ))}
          </ul>
          {summary.ctas.length > 0 && <p className="sub" style={{ marginTop: 6 }}>Calls to action: {summary.ctas.map((c) => `${c.value} (${c.count})`).join(", ")}</p>}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 12 }}>
        <h3>Compared with your accounts</h3>
        <p className="sub">
          Title styles: theirs vs their own usual post, yours vs your usual Reel (last 30 days, from the Analyze page).
        </p>
        <div className="scroll">
          <table>
            <thead>
              <tr>
                <th>Title style</th>
                <th className="num">Their posts</th>
                <th className="num">Them, typical</th>
                <th className="num">Their hits</th>
                <th className="num">Your Reels</th>
                <th className="num">You, typical</th>
              </tr>
            </thead>
            <tbody>
              {compare.map((c) => (
                <tr key={c.style}>
                  <td>{c.style}</td>
                  <td className="num">{c.count}</td>
                  <td className="num">{times(c.lift)}</td>
                  <td className="num">{c.hits}</td>
                  <td className="num">{c.you ? c.you.count : 0}</td>
                  <td className="num">{c.you ? times(c.you.index) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {untried.length > 0 && (
          <p className="small" style={{ marginTop: 8 }}>
            <strong>Worth trying:</strong> {untried.map((u) => `${u.style} (${times(u.lift)} for them, ${u.you ? u.you.count : 0} of yours)`).join("; ")}. Make your own
            version: copy the structure, never their words.
          </p>
        )}
      </div>

      <div className="row" style={{ marginBottom: 8 }}>
        <div className="tabs">
          <Link href={link({ type: null, post: null })} className={type ? "" : "on"}>
            All
          </Link>
          {types.map((t) => (
            <Link key={t} href={link({ type: t, post: null })} className={type === t ? "on" : ""}>
              {t}s
            </Link>
          ))}
        </div>
        <div className="tabs">
          {Object.entries(SORTS).map(([k, label]) => (
            <Link key={k} href={link({ sort: k === "lift" ? null : k })} className={sort === k ? "on" : ""}>
              {label}
            </Link>
          ))}
        </div>
        {format && (
          <span className="small">
            Format: {format} · <Link href={link({ format: null, post: null })}>clear</Link>
          </span>
        )}
      </div>

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))", alignItems: "start" }}>
        <div className="card" style={{ maxHeight: "78vh", overflow: "auto", padding: 8 }}>
          {shown.length ? (
            shown.map((p) => (
              <Link
                key={p.shortcode}
                href={link({ post: p.shortcode })}
                style={{
                  display: "grid",
                  gridTemplateColumns: "52px 1fr",
                  gap: 8,
                  padding: 8,
                  borderRadius: 8,
                  textDecoration: "none",
                  color: "inherit",
                  background: post?.shortcode === p.shortcode ? "var(--hover, rgba(127,127,127,.12))" : undefined,
                }}
              >
                <strong style={{ fontVariantNumeric: "tabular-nums" }}>{times(p.lift)}</strong>
                <span>
                  <span style={{ display: "block" }}>{headline(p)}</span>
                  <span className="small muted">
                    {p.type}
                    {p.date && ` · ${p.date.slice(0, 10)}`}
                    {p.views != null && ` · ${compact.format(p.views)} views`}
                    {p.likes != null && ` · ${compact.format(p.likes)} likes`}
                  </span>
                </span>
              </Link>
            ))
          ) : (
            <p className="muted small">No posts match.</p>
          )}
        </div>

        {post ? (
          <div className="card stack">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <h3 style={{ margin: 0 }}>{headline(post)}</h3>
              <span className="row small">
                {ideasUrl && (
                  <a href={`${ideasUrl}${scriptHash}`} target="_blank" rel="noreferrer">
                    {inScripts ? "Write an Align script from this ↗" : "Open the script maker ↗"}
                  </a>
                )}
                {post.url && (
                  <a href={post.url} target="_blank" rel="noreferrer">
                    Open the post ↗
                  </a>
                )}
              </span>
            </div>
            <div className="small muted">
              {post.type}
              {post.duration ? ` · ${Math.round(post.duration)} s` : ""}
              {post.date && ` · ${post.date.slice(0, 10)}`} · {post.views != null ? `${fmt.format(post.views)} views · ` : ""}
              {post.likes != null ? `${fmt.format(post.likes)} likes · ` : ""}
              {post.comments != null ? `${fmt.format(post.comments)} comments · ` : ""}
              <strong className="ink">{times(post.lift)}</strong> their typical {post.type}
              {typical && (typical.typicalViews != null || typical.typicalLikes != null) && (
                <> ({typical.typicalViews != null ? `${compact.format(typical.typicalViews)} views` : `${compact.format(typical.typicalLikes!)} likes`})</>
              )}
            </div>
            {post.sheet && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`/api/research/sheet?handle=${encodeURIComponent(handle)}&file=${encodeURIComponent(post.sheet)}`}
                alt={`Stills from ${headline(post)}`}
                style={{ width: "100%", borderRadius: 8 }}
              />
            )}
            <div>
              <h3>Hook</h3>
              <ul className="small" style={{ margin: 0 }}>
                {post.hook?.screen && <li>On screen: {post.hook.screen.replace(/\s*\/\s*/g, " / ")}</li>}
                {post.hook?.spoken && <li>Said: {post.hook.spoken}</li>}
                {post.hook?.caption && <li>Caption opens: {post.hook.caption}</li>}
                {!post.hook?.screen && !post.hook?.spoken && !post.hook?.caption && <li className="muted">No hook found.</li>}
              </ul>
            </div>
            <div className="row small">
              {(post.formats ?? []).map((f) => (
                <span key={f} className="badge">
                  {f}
                </span>
              ))}
              {(post.topics ?? []).map((t) => (
                <span key={t} className="badge scheduled">
                  {t}
                </span>
              ))}
              {(post.ctas ?? []).map((c) => (
                <span key={c} className="badge failed">
                  CTA: {c}
                </span>
              ))}
            </div>
            {post.segments && post.segments.length > 0 ? (
              <div>
                <h3>Transcript</h3>
                <div className="small" style={{ maxHeight: 280, overflow: "auto" }}>
                  {post.segments.map((s, i) => (
                    <div key={i}>
                      <span className="muted" style={{ fontVariantNumeric: "tabular-nums" }}>
                        {mmss(s.start)}
                      </span>{" "}
                      {s.text}
                    </div>
                  ))}
                </div>
              </div>
            ) : post.transcript ? (
              <div>
                <h3>Transcript</h3>
                <p className="small">{post.transcript}</p>
              </div>
            ) : null}
            {(Array.isArray(post.onScreen) ? post.onScreen.length > 0 : Boolean(post.onScreen)) && (
              <details className="data-table">
                <summary>All on-screen text</summary>
                <p className="small" style={{ whiteSpace: "pre-wrap" }}>
                  {Array.isArray(post.onScreen) ? post.onScreen.join("\n") : post.onScreen}
                </p>
              </details>
            )}
            {post.caption && (
              <details className="data-table">
                <summary>Caption</summary>
                <p className="small" style={{ whiteSpace: "pre-wrap" }}>
                  {post.caption}
                </p>
              </details>
            )}
          </div>
        ) : (
          <div className="card muted">Pick a post.</div>
        )}
      </div>
    </>
  );
}
