import { motion } from 'framer-motion'
import { SIGNS, type SignId } from '../../data/signs'
import { Caption, Cta, Header, Planet, EASE } from './shared'

const READ: Partial<Record<SignId, { body: string; chips: string[] }>> = {
  aries: {
    body: 'You don’t wait to be chosen. You decide in the first five minutes, and you say so.',
    chips: ['First move, always', 'Bored by games', 'Says it to your face'],
  },
  taurus: {
    body: 'You don’t fall. You settle in — same booth, same order, a hand that stays.',
    chips: ['Slow mornings', 'Loyal to a fault', 'Says it with dinner'],
  },
}
const FALLBACK = { body: 'Venus is how you love: what you notice first, and what keeps you there.', chips: ['Notices first', 'Stays for', 'Shows it by'] }

/** O-08b — "Venus runs your heart." */
export default function VenusHeart({ sun, venus, next }: { sun: SignId; venus: SignId; next: () => void }) {
  const r = READ[venus] ?? FALLBACK
  const ruled = sun === 'taurus' || sun === 'libra'
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Header
        eyebrow="The one that matters for dating"
        title={<>Venus runs your heart.<br />Yours is in {SIGNS[venus].name}.</>}
        body={r.body}
        bodyWidth={310}
        bodyStyle={{ marginTop: 10, fontSize: 15.5, lineHeight: 1.45 }}
      />
      <motion.div
        initial={{ scale: 0.4, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.35, type: 'spring', stiffness: 140, damping: 14 }}
        style={{ position: 'absolute', top: 300, left: 150 }}
      >
        <motion.div animate={{ y: [0, -6, 0], rotate: [0, 2, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
          <Planet size={92} color="#e8628a" light="#ffd0e0" dark="#3a0a22" ring="#f2b0c8" glow={0.7} />
        </motion.div>
      </motion.div>
      <div style={{ position: 'absolute', top: 470, left: 30, width: 330, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
        {r.chips.map((c, i) => (
          <motion.span key={c} className="mono"
            initial={{ opacity: 0, y: 8, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.14, duration: 0.45, ease: EASE }}
            style={{
              height: 26, padding: '0 12px', display: 'inline-flex', alignItems: 'center', borderRadius: 13,
              fontSize: 8.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--label-1)',
              background: 'rgba(90,30,70,0.45)', border: '1px solid rgba(232,98,138,0.45)',
            }}>{c}</motion.span>
        ))}
      </div>
      <Cta onClick={next} delay={1.1}>Painfully accurate</Cta>
      <Caption delay={1.3}>{ruled ? `Venus rules ${SIGNS[sun].name} too. Notice who walks in.` : 'Venus is how you love, not who you are.'}</Caption>
    </div>
  )
}
