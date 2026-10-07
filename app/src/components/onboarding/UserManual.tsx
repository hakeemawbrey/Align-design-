import { motion } from 'framer-motion'
import { SIGNS, type SignId } from '../../data/signs'
import { Cta, Header, EASE } from './shared'
import { MANUAL } from './readings'

/** O-06b — "Taurus, the user manual." Strengths, weaknesses, the work. */
export default function UserManual({ sun, next }: { sun: SignId; next: () => void }) {
  const sign = SIGNS[sun]
  const m = MANUAL[sun]
  const parts = [
    { h: 'Strengths', t: m.strengths },
    { h: 'Weaknesses', t: m.weaknesses },
    { h: 'Work on', t: m.workOn },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Header eyebrow="Know yourself first" title={<>{sign.name}, the<br />user manual.</>} />
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.3, 1] }} transition={{ duration: 2.4, repeat: Infinity }}
        style={{ position: 'absolute', top: 232, left: 192, width: 6, height: 6, borderRadius: '50%', background: sign.light, boxShadow: `0 0 10px ${sign.color}` }}
      />
      <div style={{ position: 'absolute', top: 270, left: 40, width: 310, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 22 }}>
        {parts.map((p, i) => (
          <motion.div key={p.h} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.22, duration: 0.6, ease: EASE }}>
            <div className="mono" style={{ fontSize: 8.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--label-3)' }}>{p.h}</div>
            <div style={{ marginTop: 7, fontSize: 14, lineHeight: 1.45, color: 'var(--label-1)' }}>{p.t}</div>
          </motion.div>
        ))}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}
          className="serif italic" style={{ fontSize: 14, lineHeight: 1.45, color: 'var(--label-3)', padding: '0 20px' }}>
          Align will nudge you on this — gently, and only when the moon agrees.
        </motion.div>
      </div>
      <Cta onClick={next} delay={1.3}>Read. Accepted.</Cta>
    </div>
  )
}
