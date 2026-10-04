import { motion } from 'framer-motion'
import { CHAKRA } from './Rarity'

interface Props {
  /** how many chakra centres are lit (0–7), bottom (red) up */
  lit: number
  serial: string
  initial: string
}

/** Seed-of-life linework: 7 circles + outer ring + vesica petals ring. */
function SeedOfLife({ r = 46 }: { r?: number }) {
  const c = 130
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (i * Math.PI) / 3 - Math.PI / 2
    return [c + Math.cos(a) * r, c + Math.sin(a) * r]
  })
  const outer = Array.from({ length: 6 }, (_, i) => {
    const a = (i * Math.PI) / 3 - Math.PI / 2 + Math.PI / 6
    return [c + Math.cos(a) * r * Math.sqrt(3), c + Math.sin(a) * r * Math.sqrt(3)]
  })
  return (
    <svg viewBox="0 0 260 260" width="100%" height="100%" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="sol-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3dcff" />
          <stop offset="0.5" stopColor="#c7a6ff" />
          <stop offset="1" stopColor="#ffd9f6" />
        </linearGradient>
        <filter id="sol-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g fill="none" stroke="url(#sol-stroke)" strokeWidth="0.9" opacity="0.62" filter="url(#sol-glow)">
        <circle cx={c} cy={c} r={r * 2} strokeWidth="1.2" />
        <circle cx={c} cy={c} r={r * 2 + 6} strokeWidth="0.5" opacity="0.6" />
        <circle cx={c} cy={c} r={r} />
        {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={r} />)}
        {outer.map(([x, y], i) => <circle key={`o${i}`} cx={x} cy={y} r={r} opacity="0.28" />)}
      </g>
    </svg>
  )
}

export default function CardBack({ lit, serial, initial }: Props) {
  // dots run violet (top) → red (bottom); light from the root up
  const dots = [...CHAKRA].reverse()
  return (
    <div style={{
      position: 'absolute', inset: 0, borderRadius: 24, padding: 1.5,
      background: 'linear-gradient(90deg, #7a5ad0 0%, #dcbcff 22%, #ffffff 42%, #dcbcff 58%, #9a7be0 78%, #e9d6ff 100%)',
      backgroundSize: '200% 100%', animation: 'rv-foil 5s linear infinite',
      boxShadow: '0 0 40px rgba(154,123,224,0.45), 0 30px 60px rgba(0,0,0,0.5)',
    }}>
      <div className="grain" style={{
        position: 'relative', width: '100%', height: '100%', borderRadius: 22.5, overflow: 'hidden',
        background: 'radial-gradient(70% 55% at 50% 42%, #5b2bc4 0%, #3a1690 45%, #210a5a 80%, #170741 100%)',
      }}>
        {/* corner violet blooms like the kit */}
        <div style={{ position: 'absolute', right: -60, bottom: -60, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(163,92,240,0.55), transparent 70%)', filter: 'blur(10px)' }} />
        <div style={{ position: 'absolute', left: -50, top: -50, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,116,240,0.35), transparent 70%)', filter: 'blur(10px)' }} />
        {/* inner hairline frame */}
        <div style={{ position: 'absolute', inset: 10, borderRadius: 16, border: '1px solid rgba(220,188,255,0.22)' }} />

        <div style={{ position: 'absolute', top: 26, left: 0, right: 0, textAlign: 'center', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 20, color: 'rgba(239,230,214,0.75)' }}>
          {initial}
        </div>

        {/* seed of life */}
        <div style={{ position: 'absolute', left: '50%', top: '46%', width: 300, height: 300, transform: 'translate(-50%,-50%)' }}>
          <SeedOfLife />
        </div>

        {/* chakra column */}
        <div style={{ position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', gap: 15 }}>
          {dots.map((c, i) => {
            const on = 6 - i < lit
            return (
              <motion.span
                key={i}
                animate={on ? { scale: [1.9, 1], opacity: 1 } : { scale: 1, opacity: 0.5 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                style={{
                  width: 11, height: 11, borderRadius: '50%',
                  background: `radial-gradient(circle at 40% 35%, #fff 0%, ${c} 45%, ${c} 100%)`,
                  boxShadow: on ? `0 0 8px ${c}, 0 0 20px ${c}, 0 0 34px ${c}` : `0 0 6px ${c}88`,
                  filter: on ? 'none' : 'saturate(0.6) brightness(0.75)',
                }}
              />
            )
          })}
        </div>

        <div style={{ position: 'absolute', bottom: 26, left: 0, right: 0, textAlign: 'center' }} className="eyebrow">
          <span style={{ color: 'rgba(220,188,255,0.7)', fontSize: 9 }}>Align · {serial}/∞</span>
        </div>

        {/* holographic shimmer sweep */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'inherit', pointerEvents: 'none', mixBlendMode: 'screen' }}>
          <div style={{
            position: 'absolute', top: '-10%', bottom: '-10%', left: 0, width: '70%',
            background: 'linear-gradient(100deg, transparent 0%, rgba(255,189,246,0.0) 20%, rgba(255,189,246,0.22) 38%, rgba(255,255,255,0.38) 50%, rgba(160,220,255,0.22) 62%, transparent 80%)',
            animation: 'rv-shimmer 3.2s cubic-bezier(.4,0,.2,1) infinite',
          }} />
        </div>
      </div>
    </div>
  )
}
