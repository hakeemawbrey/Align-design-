import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { sfx } from '../../lib/sfx'

export const CHAKRA = ['#ff4040', '#ff8a2e', '#ffd23f', '#4fd36a', '#3fc4f0', '#4f6df5', '#b05cf5']

interface Props {
  show: boolean
  /** jump straight to the final number (tap-to-skip) */
  instant?: boolean
  target?: number
  lit?: number
  pull?: string
}

/**
 * The "rarity" moment: a gold-foil pull badge, a compatibility number that
 * ticks up from 0, and seven chakra centres lighting one by one.
 */
export default function Rarity({ show, instant = false, target = 92, lit = 5, pull = 'Strong pull' }: Props) {
  const [v, setV] = useState(0)
  const [done, setDone] = useState(false)
  const raf = useRef(0)

  useEffect(() => {
    if (!show) return
    if (instant) {
      cancelAnimationFrame(raf.current)
      setV(target)
      setDone(true)
      return
    }
    const dur = 1250
    let t0 = 0
    let last = 0
    const step = (t: number) => {
      if (!t0) t0 = t
      const p = Math.min(1, (t - t0) / dur)
      const e = 1 - Math.pow(1 - p, 3)
      const n = Math.round(e * target)
      if (n !== last) {
        if (Math.floor(n / 3) !== Math.floor(last / 3)) sfx.peekTick(n / target)
        last = n
        setV(n)
      }
      if (p < 1) raf.current = requestAnimationFrame(step)
      else {
        setDone(true)
        sfx.sparkle()
      }
    }
    const d = window.setTimeout(() => { raf.current = requestAnimationFrame(step) }, 250)
    return () => { clearTimeout(d); cancelAnimationFrame(raf.current) }
  }, [show, instant, target])

  const litNow = Math.floor((v / target) * lit + 0.001)

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
      transition={{ duration: instant ? 0.25 : 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'absolute', top: 92, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}
    >
      {/* foil pull badge */}
      <motion.div
        animate={done ? { scale: [1.25, 0.96, 1], opacity: 1 } : { scale: 1, opacity: 0.75 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ padding: 1, borderRadius: 999, background: 'var(--gold-foil)', backgroundSize: '200% 100%', animation: 'rv-foil 3s linear infinite', boxShadow: done ? '0 0 22px rgba(242,199,92,0.45)' : 'none' }}
      >
        <div style={{
          height: 24, padding: '0 14px', borderRadius: 999, background: 'rgba(20,10,46,0.92)',
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--mono)', fontSize: 9.5, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--align)',
        }}>
          <span>✦</span><span>{pull} · Match № 031</span><span>✦</span>
        </div>
      </motion.div>

      {/* the number */}
      <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: 10, height: 50 }}>
        <span className="rv-foil-text" style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 52, lineHeight: 1, fontVariantNumeric: 'tabular-nums', minWidth: 54, textAlign: 'right', filter: 'drop-shadow(0 0 14px rgba(242,199,92,0.35))' }}>
          {v}
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', marginLeft: 6, marginTop: 9, gap: 3 }}>
          <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 20, lineHeight: 1, color: 'var(--align)' }}>%</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 8.5, letterSpacing: '0.22em', color: 'var(--label-3)' }}>ALIGNED</span>
        </span>
      </div>

      {/* seven centres */}
      <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
        {CHAKRA.map((c, i) => {
          const on = i < litNow
          return (
            <motion.span
              key={i}
              animate={on ? { scale: [1.8, 1], opacity: 1 } : { scale: 1, opacity: 0.35 }}
              transition={{ duration: 0.35 }}
              style={{
                width: 7, height: 7, borderRadius: '50%',
                background: on ? c : 'transparent',
                border: `1px solid ${on ? c : 'var(--label-4)'}`,
                boxShadow: on ? `0 0 8px ${c}, 0 0 14px ${c}` : 'none',
              }}
            />
          )
        })}
      </div>
    </motion.div>
  )
}
