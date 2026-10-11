import { motion } from 'framer-motion'
import { SIGNS, type SignId } from '../../data/signs'
import { Caption, Cta, Header, Planet, EASE } from './shared'
import { ELEMENT_ESSENCE, ELEMENT_ORB, signsOf, weatherTiles } from './readings'

/** O-09 — "You're earth. Here's your weather." Your element against the four. */
export default function ElementWeather({ sun, next }: { sun: SignId; next: () => void }) {
  const el = SIGNS[sun].element
  const orb = ELEMENT_ORB[el]
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Header
        eyebrow="Last lesson · The four elements"
        title={<>You’re {el}.<br />Here’s your weather.</>}
        body={ELEMENT_ESSENCE[el]}
        bodyWidth={310}
      />
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 140, damping: 14 }}
        style={{ position: 'absolute', top: 272, left: 160 }}
      >
        <Planet size={70} color={orb.color} light={orb.light} dark={orb.dark} ring={orb.light} glow={0.7} />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="mono" style={{ position: 'absolute', top: 366, width: '100%', textAlign: 'center', fontSize: 8.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: orb.light }}>
        {[el, ...signsOf(el)].join(' · ')}
      </motion.div>
      <div style={{ position: 'absolute', top: 390, left: 24, width: 342, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {weatherTiles(el).map((t, i) => (
          <motion.div key={t.other}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.12, duration: 0.5, ease: EASE }}
            style={{ padding: '9px 11px', borderRadius: 12, background: 'rgba(48,32,92,0.65)', border: '1px solid rgba(154,123,224,0.3)', minHeight: 86 }}>
            <div className="mono" style={{ fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: ELEMENT_ORB[t.other].light }}>{el} × {t.other}</div>
            <div style={{ marginTop: 5, fontSize: 12.5, lineHeight: 1.35, color: 'var(--label-1)' }}>{t.text}</div>
          </motion.div>
        ))}
      </div>
      <Cta onClick={next} delay={1.2}>Know my weather</Cta>
      <Caption delay={1.4}>Every card in your deck shows this weather.</Caption>
    </div>
  )
}
