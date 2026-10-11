import { useEffect, useState } from 'react'
import { animate, motion } from 'framer-motion'
import { sfx } from '../../lib/sfx'
import CardBack from '../intro/CardBack'
import { Caption, Cta, Header, EASE } from './shared'

const FAN = [-2, -1, 1, 2, 0]
const CW = 110
const CH = 170

/** O-13b — "You are not arriving alone." The deck waiting for you, and a count. */
export default function TheField({ next }: { next: () => void }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const c = animate(0, 333, {
      delay: 0.9, duration: 1.6, ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => sfx.sparkle(),
    })
    const ts = FAN.map((_, i) => window.setTimeout(() => sfx.deal(), 300 + i * 110))
    return () => { c.stop(); ts.forEach(clearTimeout) }
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Header
        eyebrow="The field · Who is already here"
        title={<>You are not<br />arriving alone.</>}
        body="Your deck refreshes at 11:11. Face down, ranked, no photos until you both align."
        bodyWidth={318}
        bodyStyle={{ marginTop: 10, fontSize: 15.5, lineHeight: 1.45 }}
      />
      {FAN.map((k, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 80, rotate: 0, x: 0 }}
          animate={{ opacity: 1, y: Math.abs(k) * 12, rotate: k * 8, x: k * 40 }}
          transition={{ delay: 0.3 + i * 0.11, type: 'spring', stiffness: 160, damping: 18 }}
          style={{ position: 'absolute', top: 268, left: 195 - CW / 2, width: CW, height: CH, transformOrigin: '50% 120%', zIndex: k === 0 ? 5 : 3 - Math.abs(k) }}
        >
          <CardBack width={CW} height={CH} />
        </motion.div>
      ))}
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, duration: 0.6, ease: EASE }}
        className="h-display" style={{ position: 'absolute', top: 446, width: '100%', textAlign: 'center', fontSize: 72, lineHeight: 1, zIndex: 8, textShadow: '0 0 30px rgba(201,182,240,0.6)', fontVariantNumeric: 'tabular-nums' }}>
        {n}
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} style={{ position: 'absolute', top: 536, width: '100%', textAlign: 'center' }}>
        <div className="mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--label-1)' }}>CHARTS CAST WITHIN 25 MILES OF YOU</div>
        <div className="mono" style={{ marginTop: 8, fontSize: 8.5, letterSpacing: '0.12em', color: 'var(--label-3)' }}>41 READ STRONG · 6 SHARE YOUR MOON · 11 ARE COMETS</div>
      </motion.div>
      <Cta onClick={next} delay={1.9}>Show me who is out there</Cta>
      <Caption delay={2.1}>Fifteen cards land tonight.</Caption>
    </div>
  )
}
