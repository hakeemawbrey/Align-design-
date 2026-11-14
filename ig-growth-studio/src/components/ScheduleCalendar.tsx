"use client";

import { useEffect, useMemo, useState } from "react";

export interface CalendarPost {
  id: number;
  scheduledAt: string;
  type: "IMAGE" | "REELS";
  trial: string | null;
  status: string;
  username: string;
  caption: string;
  source: string;
  permalink: string | null;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const dayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Month grid of queued and published posts, in the viewer's local time zone. */
export function ScheduleCalendar({ posts, showAccount }: { posts: CalendarPost[]; showAccount: boolean }) {
  // Rendered on the client only, so dates use the browser's time zone.
  const [month, setMonth] = useState<Date | null>(null);
  useEffect(() => {
    const now = new Date();
    setMonth(new Date(now.getFullYear(), now.getMonth(), 1));
  }, []);

  const byDay = useMemo(() => {
    const map = new Map<string, CalendarPost[]>();
    for (const p of [...posts].sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt))) {
      const k = dayKey(new Date(p.scheduledAt));
      map.set(k, [...(map.get(k) ?? []), p]);
    }
    return map;
  }, [posts]);

  if (!month) return <div className="card muted small">Loading calendar…</div>;

  const start = new Date(month);
  start.setDate(1 - month.getDay());
  const weeks = Math.ceil((month.getDay() + new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()) / 7);
  const days = Array.from({ length: weeks * 7 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
  const today = dayKey(new Date());
  const shift = (n: number) => setMonth(new Date(month.getFullYear(), month.getMonth() + n, 1));
  const inMonth = posts.filter((p) => {
    const d = new Date(p.scheduledAt);
    return d.getFullYear() === month.getFullYear() && d.getMonth() === month.getMonth();
  }).length;

  return (
    <div className="card stack" style={{ gap: 10 }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div className="row">
          <button type="button" onClick={() => shift(-1)} aria-label="Previous month">
            ‹
          </button>
          <button type="button" onClick={() => setMonth(new Date(new Date().getFullYear(), new Date().getMonth(), 1))}>
            Today
          </button>
          <button type="button" onClick={() => shift(1)} aria-label="Next month">
            ›
          </button>
          <strong style={{ marginLeft: 6 }}>{month.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</strong>
        </div>
        <span className="muted small">
          {inMonth} post{inMonth === 1 ? "" : "s"} this month
        </span>
      </div>
      <div className="cal" role="grid">
        {WEEKDAYS.map((w) => (
          <div key={w} className="cal-head" role="columnheader">
            {w}
          </div>
        ))}
        {days.map((d) => {
          const k = dayKey(d);
          const list = byDay.get(k) ?? [];
          const past = k < today;
          return (
            <div
              key={k}
              role="gridcell"
              className={`cal-day${d.getMonth() !== month.getMonth() ? " out" : ""}${k === today ? " today" : ""}`}
            >
              <div className="row" style={{ justifyContent: "space-between" }}>
                <span className="cal-num">{d.getDate()}</span>
                {!past && (
                  <a className="cal-add" href={`/schedule?view=calendar&date=${k}#new`} title="Schedule a post on this day">
                    +
                  </a>
                )}
              </div>
              {list.map((p) => {
                const time = new Date(p.scheduledAt).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
                const label = `${p.type === "REELS" ? (p.trial ? "Trial Reel" : "Reel") : "Image"}`;
                const chip = (
                  <>
                    <span className="cal-time">{time}</span> {label}
                    {showAccount && <span className="cal-user"> @{p.username}</span>}
                    {p.source === "claude" && <span title="Queued by Claude"> ✦</span>}
                  </>
                );
                const title = `${time} · ${label} · @${p.username} · ${p.status}${p.source === "claude" ? " · queued by Claude" : ""}\n${p.caption}`;
                return p.permalink ? (
                  <a key={p.id} className={`cal-post ${p.status}`} href={p.permalink} target="_blank" rel="noreferrer" title={title}>
                    {chip}
                  </a>
                ) : (
                  <a key={p.id} className={`cal-post ${p.status}`} href={`/schedule?view=list#post-${p.id}`} title={title}>
                    {chip}
                  </a>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="row small muted">
        <span className="cal-post scheduled legend">Scheduled</span>
        <span className="cal-post published legend">Published</span>
        <span className="cal-post failed legend">Failed</span>
        <span className="cal-post cancelled legend">Cancelled</span>
        <span>✦ queued by Claude</span>
      </div>
    </div>
  );
}
