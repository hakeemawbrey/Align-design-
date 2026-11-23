import Link from "next/link";
import { resumeStudyAction, stopStudyAction } from "@/app/actions";
import { LocalTime } from "@/components/LocalTime";
import { SendStudyButton, StartStudyForm } from "@/components/ResearchForms";
import { getDb } from "@/lib/db";
import { listCreators } from "@/lib/research";
import { STEPS, listJobs, logTail } from "@/lib/researchJobs";

export const dynamic = "force-dynamic";

const fmt = new Intl.NumberFormat("en-US");
const STATUS: Record<string, string> = {
  queued: "Waiting its turn",
  running: "Running",
  waiting: "Taking a break",
  needs_login: "Needs you to log in",
  done: "Done",
  failed: "Stopped with a problem",
  stopped: "Stopped",
};

export default async function ResearchPage() {
  const db = await getDb();
  const jobs = await listJobs(db, 20);
  const creators = listCreators();
  return (
    <>
      <h1>Research</h1>
      <p className="muted">
        Study any Instagram or Facebook page: every post downloaded, transcribed and read on this Mac, then compared with
        that creator&apos;s typical post. Packs hold other creators&apos; words and stills, so they stay on this Mac and in
        your private align-study repo, never the public one. Downloading this way is against Instagram&apos;s and
        Facebook&apos;s terms; it goes slowly, using your own logged-in Chrome.
      </p>

      <div className="card" style={{ margin: "12px 0" }}>
        <h3 style={{ marginTop: 0 }}>Study a page</h3>
        <StartStudyForm />
        <p className="sub" style={{ marginTop: 8 }}>
          The first time, a small Chrome window of the study&apos;s own opens on Instagram: log in there yourself and the
          study carries on (it remembers the login; your everyday Chrome isn&apos;t touched). A page with a few hundred posts takes an hour or two, most of it
          waiting politely between requests. The publishing worker runs it, so it keeps going if you close this page.
        </p>
      </div>

      {jobs.length > 0 && (
        <>
          <h2>Studies</h2>
          <div className="stack">
            {jobs.map((j) => {
              const steps = STEPS[j.site];
              const label = j.status === "done" ? "All steps done" : `Step ${Math.min(j.step + 1, steps.length)} of ${steps.length}: ${steps[Math.min(j.step, steps.length - 1)].label}`;
              const tail = logTail(j.id, 30);
              return (
                <div key={j.id} className="card">
                  <div className="row" style={{ justifyContent: "space-between" }}>
                    <div>
                      <strong>{j.handle ? `@${j.handle}` : j.target}</strong>{" "}
                      <span className="badge">{j.site === "facebook" ? "Facebook" : "Instagram"}</span>{" "}
                      {j.limit_posts ? <span className="badge">newest {j.limit_posts}</span> : null}{" "}
                      <span className={`badge ${j.status === "done" ? "published" : j.status === "failed" ? "failed" : "scheduled"}`}>{STATUS[j.status] ?? j.status}</span>
                      <div className="small muted">
                        {label} · started <LocalTime iso={j.created_at} />
                        {j.status === "waiting" && j.next_at && (
                          <>
                            {" "}
                            · carries on at <LocalTime iso={j.next_at} />
                          </>
                        )}
                      </div>
                      {j.message && <div className="small">{j.message}</div>}
                    </div>
                    <div className="row">
                      {["queued", "running", "waiting", "needs_login"].includes(j.status) && (
                        <form action={stopStudyAction}>
                          <input type="hidden" name="id" value={j.id} />
                          <button type="submit">Stop</button>
                        </form>
                      )}
                      {["stopped", "failed", "needs_login", "waiting"].includes(j.status) && (
                        <form action={resumeStudyAction}>
                          <input type="hidden" name="id" value={j.id} />
                          <button type="submit">{j.status === "waiting" ? "Carry on now" : "Resume"}</button>
                        </form>
                      )}
                      {j.status === "done" && j.handle && <SendStudyButton handle={j.handle} />}
                      {j.status === "done" && j.handle && <Link href={`/research/${encodeURIComponent(j.handle)}`}>Open →</Link>}
                    </div>
                  </div>
                  {tail && (
                    <details className="data-table">
                      <summary>Log</summary>
                      <pre className="small" style={{ whiteSpace: "pre-wrap", maxHeight: 260, overflow: "auto" }}>
                        {tail}
                      </pre>
                    </details>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      <h2>Creators</h2>
      {creators.length ? (
        <div className="chart-grid">
          {creators.map((c) => (
            <Link key={c.handle} href={`/research/${encodeURIComponent(c.handle)}`} className="card" style={{ textDecoration: "none", color: "inherit" }}>
              <strong>{c.site === "facebook" ? c.name || c.handle : `@${c.handle}`}</strong>
              {c.name && c.site !== "facebook" && <span className="muted"> · {c.name}</span>}
              <div className="small muted">
                {c.site === "facebook" ? "Facebook" : "Instagram"} · {fmt.format(c.postCount)} posts
                {c.followers != null && ` · ${fmt.format(c.followers)} followers`}
              </div>
              <div className="small muted">
                {c.source === "study" ? "Studied on this Mac" : "From your private repo"}
                {c.madeAt && (
                  <>
                    {" "}
                    · <LocalTime iso={c.madeAt} />
                  </>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="muted">No studies yet. Study a page above.</p>
      )}
    </>
  );
}
