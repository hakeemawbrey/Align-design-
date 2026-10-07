import { useId } from 'react'

/**
 * A moon at a given phase. `lit` is the illuminated fraction (0 new → 1 full);
 * waxing moons are lit on the right, waning on the left (northern hemisphere).
 */
export default function MoonPhase({ size, lit, waxing, glow = true }: { size: number; lit: number; waxing: boolean; glow?: boolean }) {
  const id = useId().replace(/:/g, '')
  const r = size / 2
  const k = Math.min(1, Math.max(0, lit))
  const rx = Math.abs(1 - 2 * k) * r
  const top = `${r} 0`
  const bottom = `${r} ${size}`
  // limb on the lit side, then the terminator back up
  const limbSweep = waxing ? 1 : 0
  const crescent = k < 0.5
  const termSweep = waxing ? (crescent ? 0 : 1) : (crescent ? 1 : 0)
  const d = k >= 0.999
    ? `M ${top} A ${r} ${r} 0 1 1 ${bottom} A ${r} ${r} 0 1 1 ${top} Z`
    : `M ${top} A ${r} ${r} 0 0 ${limbSweep} ${bottom} A ${rx} ${r} 0 0 ${termSweep} ${top} Z`

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible', display: 'block' }}>
      <defs>
        <radialGradient id={`lit-${id}`} cx={waxing ? '62%' : '38%'} cy="35%" r="75%">
          <stop offset="0%" stopColor="#fffdf4" />
          <stop offset="55%" stopColor="#efe6d6" />
          <stop offset="100%" stopColor="#b9aecb" />
        </radialGradient>
        <radialGradient id={`dark-${id}`} cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#2a2150" />
          <stop offset="100%" stopColor="#140e2c" />
        </radialGradient>
        <clipPath id={`clip-${id}`}><path d={d} /></clipPath>
        <filter id={`glow-${id}`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation={size * 0.08} />
        </filter>
      </defs>
      {/* the unlit disc, with a little earthshine */}
      <circle cx={r} cy={r} r={r} fill={`url(#dark-${id})`} stroke="rgba(201,188,228,0.28)" strokeWidth={Math.max(0.6, size * 0.008)} />
      {k > 0.001 && (
        <>
          {glow && <path d={d} fill="#f4ead8" opacity={0.55} filter={`url(#glow-${id})`} />}
          <path d={d} fill={`url(#lit-${id})`} />
          {/* maria, only where it's lit */}
          <g clipPath={`url(#clip-${id})`} fill="#a89cbc" opacity={0.35}>
            <circle cx={r * 0.62} cy={r * 0.7} r={r * 0.2} />
            <circle cx={r * 0.95} cy={r * 0.55} r={r * 0.13} />
            <circle cx={r * 0.78} cy={r * 1.25} r={r * 0.16} />
            <circle cx={r * 1.35} cy={r * 0.9} r={r * 0.18} />
            <circle cx={r * 1.2} cy={r * 1.45} r={r * 0.1} />
          </g>
        </>
      )}
    </svg>
  )
}
