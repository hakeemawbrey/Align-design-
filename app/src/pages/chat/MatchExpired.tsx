import { motion } from 'framer-motion'
import type { PageProps } from '../types'
import Starfield from '../../components/Starfield'
import { Cta, rise } from '../../components/onboarding/shared'
import { MATCHES } from '../../data/matches'
import { DECK } from '../../data/profiles'
import { SIGNS } from '../../data/signs'
import { sfx } from '../../lib/sfx'

/** G-12 — the card closed after seven quiet days. arg: the match id (default Juniper). */
export default function MatchExpired({ go, back, arg }: PageProps) {
  const m = MATCHES.find((x) => x.id === arg) ?? DECK.find((x) => x.id === arg) ?? MATCHES[0]
  const sign = SIGNS[m.sign]
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora={null} warm={null} count={50} seed={12} />

      <motion.button aria-label="Close" whileTap={{ scale: 0.9 }} onClick={() => { sfx.tap(); back() }}
        style={{ position: 'absolute', right: 16, top: 56, width: 40, height: 40, display: 'grid', placeItems: 'center', color: 'var(--label-1)', zIndex: 5 }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M1 1l12 12M13 1 1 13" /></svg>
      </motion.button>

      {/* her card, face down again */}
      <motion.div
        initial={{ opacity: 0, rotateY: -180, scale: 0.9 }}
        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.1 }}
        style={{ position: 'absolute', left: 145, top: 190, width: 100, height: 155, transformPerspective: 800 }}
      >
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0, borderRadius: 12, overflow: 'hidden',
            border: '1px solid rgba(190,150,255,0.55)', background: '#2a1660',
            boxShadow: '0 0 30px rgba(154,123,224,0.35), 0 18px 40px rgba(0,0,0,0.45)',
          }}>
          <img src={sign.auraImg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'hue-rotate(-30deg) saturate(0.8) brightness(0.8)', opacity: 0.85 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(60,30,140,0.25), rgba(40,20,100,0.55))' }} />
        </motion.div>
      </motion.div>

      <div style={{ position: 'absolute', top: 370, left: 24, right: 24, textAlign: 'center' }}>
        <motion.div className="eyebrow" {...rise(0.3, 8)} style={{ color: 'var(--label-3)', fontSize: 9.5 }}>Face down again</motion.div>
        <motion.h1 className="h-display" {...rise(0.4)} style={{ marginTop: 8, fontSize: 31, lineHeight: 1.12 }}>
          Seven quiet days.<br />The card closed.
        </motion.h1>
        <motion.p {...rise(0.5)} style={{ margin: '8px auto 0', width: 306, fontSize: 14, lineHeight: 1.45, color: 'var(--label-2)' }}>
          {m.name} is back among strangers. That’s the deal — nobody lingers unread.
        </motion.p>
      </div>

      <Cta delay={0.6} onClick={() => { sfx.release(); go('matches') }}>Let it go</Cta>
    </div>
  )
}
