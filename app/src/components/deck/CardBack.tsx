import { memo } from 'react'
import { CARD_W, CARD_H } from './fx'

const CHAKRAS = ['#b06cff', '#5b6cff', '#3fb6f0', '#4fd27a', '#f2cf4a', '#f39a3a', '#f0383a']

/** Face-down card (Kit): indigo/violet glass, seed-of-life linework, chakra column. */
function CardBackImpl({ glow = true }: { glow?: boolean }) {
  const cx = CARD_W / 2
  const cy = CARD_H / 2 - 10
  const r = 46
  const petals = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
  })
  return (
    <div style={{
      width: CARD_W, height: CARD_H, borderRadius: 20, padding: 1.5,
      background: 'linear-gradient(160deg, #c8b4ff 0%, #6b4bd0 30%, #f2d784 52%, #6b4bd0 72%, #c8b4ff 100%)',
      boxShadow: glow ? '0 0 24px rgba(154,123,224,0.45), 0 18px 40px rgba(5,2,15,0.6)' : '0 10px 30px rgba(5,2,15,0.5)',
    }}>
      <svg width={CARD_W - 3} height={CARD_H - 3} viewBox={`0 0 ${CARD_W} ${CARD_H}`} style={{ display: 'block', borderRadius: 18.5 }}>
        <defs>
          <linearGradient id="cb-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2a1260" />
            <stop offset="0.45" stopColor="#3c1a8a" />
            <stop offset="1" stopColor="#170a3e" />
          </linearGradient>
          <radialGradient id="cb-bloom" cx="0.5" cy="0.47" r="0.55">
            <stop offset="0" stopColor="#8a5cf0" stopOpacity="0.55" />
            <stop offset="1" stopColor="#8a5cf0" stopOpacity="0" />
          </radialGradient>
          <filter id="cb-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3.2" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <rect width={CARD_W} height={CARD_H} fill="url(#cb-bg)" />
        <rect width={CARD_W} height={CARD_H} fill="url(#cb-bloom)" />
        <rect x="12" y="12" width={CARD_W - 24} height={CARD_H - 24} rx="12" fill="none" stroke="#c8b4ff" strokeOpacity="0.28" />
        <g fill="none" stroke="#d9c9ff" strokeOpacity="0.5" strokeWidth="1">
          <circle cx={cx} cy={cy} r={r * 2} strokeOpacity="0.35" />
          <circle cx={cx} cy={cy} r={r * 2 + 6} strokeOpacity="0.18" />
          <circle cx={cx} cy={cy} r={r} />
          {petals.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={r} />)}
        </g>
        <line x1={cx} y1={cy - r * 2} x2={cx} y2={cy + r * 2} stroke="#d9c9ff" strokeOpacity="0.25" />
        <g filter="url(#cb-glow)">
          {CHAKRAS.map((c, i) => (
            <circle key={i} cx={cx} cy={cy - r * 1.5 + i * (r / 2)} r={4.2} fill={c} />
          ))}
        </g>
        {CHAKRAS.map((_, i) => (
          <circle key={i} cx={cx - 1.2} cy={cy - r * 1.5 + i * (r / 2) - 1.2} r={1.3} fill="#fff" opacity="0.8" />
        ))}
        <text x={cx} y={CARD_H - 30} textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="9" letterSpacing="3" fill="#c8b4ff" fillOpacity="0.55">ALIGN · ✦ · TONIGHT</text>
      </svg>
    </div>
  )
}

const CardBack = memo(CardBackImpl)
export default CardBack
