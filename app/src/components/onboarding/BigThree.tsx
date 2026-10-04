import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { SIGNS } from '../../data/signs'
import { ME } from '../../data/profiles'
import { sfx } from '../../lib/sfx'
import { Caption, Cta, Header, Planet, EASE } from './shared'
import { MONTHS, sunSign, type BirthDate } from './zodiac'

/** O-07 — "One sky. Three yous." */
export default function BigThree({ birth, next }: { birth: BirthDate; next: () => void }) {
  const sun = SIGNS[sunSign(birth)]
  const moon = SIGNS[ME.moon]
  const rising = SIGNS[ME.rising]

  const orbs = [
    { label: `Sun · ${sun.name}`, x: 82, size: 96, color: '#c9a032', light: '#fff1b8', dark: '#3a2a08', ring: '#e8c860', dot: '#e9b24a',
      text: 'Who you are at brunch. Orders for the table, pays without looking.' },
    { label: `Moon · ${moon.name}`, x: 195, size: 64, color: '#2f6fe0', light: '#b8d4ff', dark: '#0a1640', dot: '#3f7cf0',
      text: 'Who you are at 2am. Plans the trip you will not book. Feels it all, tells no one.' },
    { label: `Rising · ${rising.name}`, x: 308, size: 64, color: '#9a4ee0', light: '#ecd8ff', dark: '#24104a', dot: '#a35cf0',
      text: 'Who strangers meet first. Charming. Suspiciously good lighting.' },
  ]

  useEffect(() => {
    const ts = orbs.map((_, i) => window.setTimeout(() => sfx.deal(), 450 + i * 280))
    const s = window.setTimeout(() => sfx.sparkle(), 450 + 3 * 280 + 100)
    return () => { ts.forEach(clearTimeout); clearTimeout(s) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Header
        eyebrow="Astrology, minus the homework"
        title="One sky. Three yous."
        body={<>Three of you were born on {MONTHS[birth.month]} {birth.day}, {birth.year}.<br />Only one of them talks at parties.</>}
      />

      {orbs.map((o, i) => (
        <div key={i} style={{ position: 'absolute', left: o.x - 70, top: 340 - o.size / 2, width: 140, height: o.size + 40, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.45 + i * 0.28, type: 'spring', stiffness: 260, damping: 13 }}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: 1.2 + i * 0.3 }}
              whileHover={{ scale: 1.08 }}
              onHoverStart={() => sfx.tap()}
            >
              <Planet size={o.size} color={o.color} light={o.light} dark={o.dark} ring={o.ring} glow={0.6} />
            </motion.div>
          </motion.div>
        </div>
      ))}
      {orbs.map((o, i) => (
        <motion.div key={i} className="mono"
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 + i * 0.28, duration: 0.5, ease: EASE }}
          style={{ position: 'absolute', top: 403, left: o.x - 70, width: 140, textAlign: 'center', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--label-1)' }}>
          {o.label}
        </motion.div>
      ))}
      {/* the star by the rising orb, as in Figma */}
      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.2, repeat: Infinity }}
        style={{ position: 'absolute', left: 346, top: 316, width: 7, height: 7, borderRadius: '50%', background: '#fff', boxShadow: '0 0 8px #fff' }} />

      <div style={{ position: 'absolute', top: 456, left: 36, width: 318, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {orbs.map((o, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.35 + i * 0.18, duration: 0.55, ease: EASE }}
            style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, lineHeight: 1.45, color: 'var(--label-1)' }}>
            <span style={{ marginTop: 6, width: 8, height: 8, borderRadius: '50%', flexShrink: 0, background: o.dot, boxShadow: `0 0 8px ${o.dot}` }} />
            {o.text}
          </motion.div>
        ))}
      </div>

      <Cta onClick={next} delay={1.7}>Three of me. Got it</Cta>
      <Caption delay={1.9}>You fall for your moon sign, not your sun.</Caption>
    </div>
  )
}
