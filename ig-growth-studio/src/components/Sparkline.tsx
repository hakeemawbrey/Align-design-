export function Sparkline({ values, label, compact }: { values: number[]; label: string; compact?: boolean }) {
  const w = 600;
  const h = 80;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const step = values.length > 1 ? w / (values.length - 1) : w;
  const d = values
    .map((v, i) => `${i === 0 ? "M" : "L"}${(i * step).toFixed(1)},${(h - 4 - ((v - min) / span) * (h - 8)).toFixed(1)}`)
    .join(" ");
  if (compact) {
    return (
      <svg className="spark mini" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" role="img" aria-label={label}>
        <path d={d} vectorEffect="non-scaling-stroke" />
      </svg>
    );
  }
  return (
    <div>
      <svg className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" role="img" aria-label={label}>
        <path d={d} vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="row muted small" style={{ justifyContent: "space-between" }}>
        <span>Low {min.toLocaleString()}</span>
        <span>High {max.toLocaleString()}</span>
      </div>
    </div>
  );
}
