import { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { sfx } from '../../lib/sfx'

interface Props {
  value: number
  size?: number
  delay?: number
  duration?: number
}

/** Game-layer "92% ALIGNED" meter: arc fills with ticking, then a burst. */
export default function AlignRing({ value, size = 58, delay = 0.6, duration = 1.6 }: Props) {
  const mv = useMotionValue(0)
  const pathLength = useTransform(mv, (v) => Math.max(0.001, v / 100))
  const [n, setN] = useState(0)
  const [done, setDone] = useState(false)
  const stroke = 3
  const r = size / 2 - stroke - 1

  useEffect(() => {
    let lastTick = 0
    const ctrl = animate(mv, value, {
      delay, duration, ease: [0.25, 0.1, 0.1, 1],
      onUpdate: (v) => {
        const k = Math.round(v)
        setN(k)
        if (k - lastTick >= 6) { lastTick = k; sfx.peekTick(k / 100) }
      },
      onComplete: () => { setDone(true); sfx.sparkle() },
    })
    return () => ctrl.stop()
  }, [mv, value, delay, duration])

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {/* burst on completion */}
      {done && (
        <motion.div
          initial={{ opacity: 0.9, scale: 1 }}
          animate={{ opacity: 0, scale: 1.9 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid #f2c75c', pointerEvents: 'none' }}
        />
      )}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(closest-side, rgba(28, 14, 64, 0.92) 70%, rgba(28,14,64,0.5) 100%)',
        boxShadow: done ? '0 0 22px rgba(242, 199, 92, 0.45)' : '0 0 12px rgba(242, 199, 92, 0.15)',
        transition: 'box-shadow .6s ease',
      }} />
      <svg width={size} height={size} style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id="align-ring-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff4cf" />
            <stop offset="50%" stopColor="#f2c75c" />
            <stop offset="100%" stopColor="#e163d6" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(179,166,196,0.18)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="url(#align-ring-g)" strokeWidth={stroke} strokeLinecap="round"
          style={{ pathLength, filter: 'drop-shadow(0 0 3px rgba(242,199,92,0.7))' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="serif" style={{ fontSize: size * 0.33, lineHeight: 1, color: '#fff4cf', fontVariantNumeric: 'tabular-nums' }}>
          {n}<span style={{ fontSize: size * 0.18 }}>%</span>
        </div>
        <div className="mono" style={{ fontSize: 6, letterSpacing: '0.2em', color: 'var(--align)', marginTop: 2, fontWeight: 700 }}>ALIGNED</div>
      </div>
    </div>
  )
}
