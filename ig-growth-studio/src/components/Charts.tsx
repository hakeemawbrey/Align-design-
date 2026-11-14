"use client";

import { type KeyboardEvent, type PointerEvent, useEffect, useRef, useState } from "react";

export type Unit = "count" | "percent";
export interface Series {
  name: string;
  color: string;
  values: (number | null)[];
}

const full = new Intl.NumberFormat("en-US");
const compactFmt = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });

export function formatValue(v: number | null | undefined, unit: Unit = "count") {
  if (v === null || v === undefined) return "—";
  return unit === "percent" ? `${(v * 100).toFixed(1)}%` : full.format(v);
}

function niceStep(raw: number, integer: boolean) {
  if (!(raw > 0)) return 1;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? 10 * mag;
  return integer ? Math.max(1, Math.round(step)) : step;
}

/** Clean ticks covering lo..hi. */
function scale(lo: number, hi: number, unit: Unit, zero: boolean) {
  const integer = unit === "count";
  if (zero) lo = Math.min(0, lo);
  if (hi === lo) hi = lo + (integer ? Math.max(1, Math.abs(lo) * 0.02) : 0.01);
  const step = niceStep((hi - lo) / 4, integer);
  const start = Math.floor(lo / step) * step;
  const end = Math.ceil(hi / step) * step;
  const ticks: number[] = [];
  for (let v = start; v <= end + step / 1000; v += step) ticks.push(Number(v.toFixed(10)));
  const big = Math.max(Math.abs(start), Math.abs(end)) >= 10_000;
  const fmt = (v: number) =>
    unit === "percent" ? `${(v * 100).toFixed(step * 100 < 1 ? 1 : 0)}%` : big ? compactFmt.format(v) : full.format(v);
  return { lo: start, hi: end, ticks, fmt };
}

function useWidth(fallback = 640) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(fallback);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, width };
}

/** Which x labels fit side by side; always keeps the last one. */
function visibleLabels(n: number, room: number) {
  const every = Math.max(1, Math.ceil(n / Math.max(1, Math.floor(room / 64))));
  return (i: number) => i % every === 0 || i === n - 1;
}

export function Legend({ items, line }: { items: { name: string; color: string }[]; line?: boolean }) {
  if (items.length < 2) return null;
  return (
    <div className="legend">
      {items.map((s) => (
        <span key={s.name}>
          <i className={line ? "key line" : "key"} style={{ background: s.color }} />
          {s.name}
        </span>
      ))}
    </div>
  );
}

function Tip({ x, width, title, rows }: { x: number; width: number; title: string; rows: { name: string; color: string; value: string }[] }) {
  // Right of the pointer, or left of it near the right edge.
  const left = x + 12 + 180 > width ? Math.max(0, x - 192) : x + 12;
  return (
    <div className="tip" style={{ left }}>
      <div className="tip-title">{title}</div>
      {rows.map((r) => (
        <div key={r.name} className="tip-row">
          <i className="key line" style={{ background: r.color }} />
          <strong>{r.value}</strong>
          <span>{r.name}</span>
        </div>
      ))}
    </div>
  );
}

function DataTable({ labels, series, unit }: { labels: string[]; series: Series[]; unit: Unit }) {
  return (
    <details className="data-table">
      <summary>Show as table</summary>
      <div className="scroll">
        <table>
          <thead>
            <tr>
              <th />
              {series.map((s) => (
                <th key={s.name} className="num">
                  {s.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {labels.map((l, i) => (
              <tr key={`${l}-${i}`}>
                <td>{l}</td>
                {series.map((s) => (
                  <td key={s.name} className="num">
                    {formatValue(s.values[i], unit)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

/** Shared pointer/keyboard hover over x positions. */
function useHover(n: number) {
  const [hover, setHover] = useState<number | null>(null);
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") setHover((h) => Math.min(n - 1, (h ?? -1) + 1));
    else if (e.key === "ArrowLeft") setHover((h) => Math.max(0, (h ?? n) - 1));
    else if (e.key === "Escape") setHover(null);
    else return;
    e.preventDefault();
  };
  return { hover, setHover, onKeyDown };
}

const M = { l: 48, r: 14, t: 14, b: 26 };

function Axes({ width, height, ticks, y, fmt, labels, x, show }: {
  width: number;
  height: number;
  ticks: number[];
  y: (v: number) => number;
  fmt: (v: number) => string;
  labels: string[];
  x: (i: number) => number;
  show: (i: number) => boolean;
}) {
  return (
    <g className="axes">
      {ticks.map((t, k) => (
        <g key={t}>
          <line className={k === 0 ? "base" : "grid"} x1={M.l} x2={width - M.r} y1={y(t)} y2={y(t)} />
          <text x={M.l - 8} y={y(t)} dy="0.32em" textAnchor="end">
            {fmt(t)}
          </text>
        </g>
      ))}
      {labels.map((l, i) =>
        show(i) ? (
          <text key={`${l}-${i}`} x={x(i)} y={height - 6} textAnchor="middle">
            {l}
          </text>
        ) : null,
      )}
    </g>
  );
}

/** Line chart with a crosshair tooltip. Lines don't start at zero, so small changes stay visible. */
export function LineChart({ labels, series, unit = "count", height = 200, label }: {
  labels: string[];
  series: Series[];
  unit?: Unit;
  height?: number;
  label: string;
}) {
  const { ref, width } = useWidth();
  const { hover, setHover, onKeyDown } = useHover(labels.length);
  const n = labels.length;
  const iw = Math.max(40, width - M.l - M.r);
  const ih = height - M.t - M.b;
  const vals = series.flatMap((s) => s.values).filter((v): v is number => v !== null);
  const sc = scale(Math.min(...vals), Math.max(...vals), unit, false);
  const x = (i: number) => M.l + (n > 1 ? (i / (n - 1)) * iw : iw / 2);
  const y = (v: number) => M.t + ih - ((v - sc.lo) / (sc.hi - sc.lo)) * ih;
  const show = visibleLabels(n, iw);
  const move = (e: PointerEvent<SVGSVGElement>) => {
    const px = e.clientX - e.currentTarget.getBoundingClientRect().left;
    setHover(n > 1 ? Math.min(n - 1, Math.max(0, Math.round(((px - M.l) / iw) * (n - 1)))) : 0);
  };
  if (!vals.length) return <p className="muted small">No data yet.</p>;
  return (
    <div className="chart" ref={ref}>
      <Legend items={series} line />
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: "100%", height: "auto" }}
        role="img"
        aria-label={label}
        tabIndex={0}
        onPointerMove={move}
        onPointerLeave={() => setHover(null)}
        onKeyDown={onKeyDown}
        onBlur={() => setHover(null)}
      >
        <Axes width={width} height={height} ticks={sc.ticks} y={y} fmt={sc.fmt} labels={labels} x={x} show={show} />
        {hover !== null && <line className="crosshair" x1={x(hover)} x2={x(hover)} y1={M.t} y2={M.t + ih} />}
        {series.map((s) => {
          let d = "";
          let pen = false;
          s.values.forEach((v, i) => {
            if (v === null) return; // gaps are bridged: counts are saved at irregular hours
            d += `${pen ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`;
            pen = true;
          });
          const lastI = s.values.findLastIndex((v) => v !== null);
          return (
            <g key={s.name}>
              {series.length === 1 && n > 1 && (
                <path className="area" d={`${d}L${x(lastI)},${M.t + ih}L${x(s.values.findIndex((v) => v !== null))},${M.t + ih}Z`} style={{ fill: s.color }} />
              )}
              <path className="line" d={d} style={{ stroke: s.color }} />
              {lastI >= 0 && <circle className="dot" cx={x(lastI)} cy={y(s.values[lastI]!)} r={4} style={{ fill: s.color }} />}
              {hover !== null && s.values[hover] !== null && hover !== lastI && (
                <circle className="dot" cx={x(hover)} cy={y(s.values[hover]!)} r={4} style={{ fill: s.color }} />
              )}
            </g>
          );
        })}
      </svg>
      {hover !== null && (
        <Tip
          x={x(hover)}
          width={width}
          title={labels[hover]}
          rows={series.map((s) => ({ name: s.name, color: s.color, value: formatValue(s.values[hover], unit) }))}
        />
      )}
      <DataTable labels={labels} series={series} unit={unit} />
    </div>
  );
}

function topRounded(x: number, y: number, w: number, h: number, r: number) {
  r = Math.min(r, h, w / 2);
  return `M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z`;
}

/** Columns, stacked when there is more than one series. Hovering a column lists every series. */
export function ColumnChart({ labels, series, unit = "count", height = 220, label, marker, showTotal = true }: {
  labels: string[];
  series: Series[];
  unit?: Unit;
  height?: number;
  label: string;
  marker?: { index: number; label: string };
  showTotal?: boolean;
}) {
  const { ref, width } = useWidth();
  const n = labels.length;
  const { hover, setHover, onKeyDown } = useHover(n);
  const iw = Math.max(40, width - M.l - M.r);
  const ih = height - M.t - M.b;
  const totals = labels.map((_, i) => series.reduce((t, s) => t + (s.values[i] ?? 0), 0));
  const sc = scale(0, Math.max(0, ...totals), unit, true);
  const band = iw / Math.max(1, n);
  const bw = Math.max(2, Math.min(24, band * 0.7));
  const x = (i: number) => M.l + band * i + band / 2;
  const y = (v: number) => M.t + ih - ((v - sc.lo) / (sc.hi - sc.lo)) * ih;
  const show = visibleLabels(n, iw);
  const move = (e: PointerEvent<SVGSVGElement>) => {
    const px = e.clientX - e.currentTarget.getBoundingClientRect().left;
    const i = Math.floor((px - M.l) / band);
    setHover(i >= 0 && i < n ? i : null);
  };
  return (
    <div className="chart" ref={ref}>
      <Legend items={series} />
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: "100%", height: "auto" }}
        role="img"
        aria-label={label}
        tabIndex={0}
        onPointerMove={move}
        onPointerLeave={() => setHover(null)}
        onKeyDown={onKeyDown}
        onBlur={() => setHover(null)}
      >
        <Axes width={width} height={height} ticks={sc.ticks} y={y} fmt={sc.fmt} labels={labels} x={x} show={show} />
        {marker && marker.index >= 0 && marker.index < n && (
          <g className="marker">
            <line x1={M.l + band * marker.index} x2={M.l + band * marker.index} y1={M.t} y2={M.t + ih} />
            <text x={M.l + band * marker.index + 4} y={M.t + 8}>
              {marker.label}
            </text>
          </g>
        )}
        {hover !== null && <rect className="hover-band" x={M.l + band * hover} y={M.t} width={band} height={ih} />}
        {labels.map((_, i) => {
          let base = 0;
          const segs = series
            .map((s) => ({ s, v: s.values[i] ?? 0 }))
            .filter((p) => p.v > 0);
          return (
            <g key={i}>
              {segs.map(({ s, v }, k) => {
                const y0 = y(base);
                const y1 = y(base + v);
                base += v;
                const gap = k > 0 ? 2 : 0;
                const h = Math.max(0, y0 - y1 - gap);
                const top = k === segs.length - 1;
                return top ? (
                  <path key={s.name} d={topRounded(x(i) - bw / 2, y1, bw, h, 4)} style={{ fill: s.color }} />
                ) : (
                  <rect key={s.name} x={x(i) - bw / 2} y={y1} width={bw} height={h} style={{ fill: s.color }} />
                );
              })}
            </g>
          );
        })}
      </svg>
      {hover !== null && (
        <Tip
          x={x(hover)}
          width={width}
          title={labels[hover]}
          rows={[
            ...series.map((s) => ({ name: s.name, color: s.color, value: formatValue(s.values[hover] ?? 0, unit) })),
            ...(series.length > 1 && showTotal ? [{ name: "Total", color: "transparent", value: formatValue(totals[hover], unit) }] : []),
          ]}
        />
      )}
      <DataTable labels={labels} series={series} unit={unit} />
    </div>
  );
}

/** Horizontal bars, each labelled with its value; no hover needed. */
export function BarList({ items, unit = "count", color = "var(--series-1)" }: {
  items: { label: string; value: number | null; color?: string; note?: string }[];
  unit?: Unit;
  color?: string;
}) {
  const max = Math.max(0, ...items.map((i) => i.value ?? 0)) || 1;
  return (
    <div className="barlist">
      {items.map((it) => (
        <div key={it.label} className="barlist-row">
          <div className="barlist-label">{it.label}</div>
          <div className="barlist-track">
            {it.value !== null && it.value > 0 && (
              <div className="barlist-bar" style={{ width: `${(it.value / max) * 100}%`, background: it.color ?? color }} />
            )}
            <span className="barlist-value">
              {formatValue(it.value, unit)}
              {it.note && <span className="muted"> {it.note}</span>}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/** One whole split into parts (a tall segmented bar) with a legend in block order. */
export function SegmentedBar({ parts, label }: { parts: { name: string; value: number; color: string; dark?: boolean }[]; label: string }) {
  const total = parts.reduce((t, p) => t + p.value, 0);
  const shown = parts.filter((p) => p.value > 0);
  if (!total) return <p className="muted small">Nothing yet.</p>;
  return (
    <div>
      <div className="segbar" role="img" aria-label={`${label}: ${shown.map((p) => `${p.name} ${p.value}`).join(", ")}`}>
        {shown.map((p) => {
          const share = p.value / total;
          return (
            <div
              key={p.name}
              className="seg"
              title={`${p.name}: ${full.format(p.value)} (${Math.round(share * 100)}%)`}
              style={{ flexGrow: p.value, background: p.color, color: p.dark ? "#0b0b0b" : "#ffffff" }}
            >
              {share >= 0.08 && <span>{Math.round(share * 100)}%</span>}
            </div>
          );
        })}
      </div>
      <div className="legend">
        {shown.map((p) => (
          <span key={p.name}>
            <i className="key" style={{ background: p.color }} />
            {p.name} <strong>{full.format(p.value)}</strong>
          </span>
        ))}
      </div>
    </div>
  );
}
