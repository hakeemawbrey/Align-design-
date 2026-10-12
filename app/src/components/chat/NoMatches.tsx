import { useState } from 'react'
import { motion } from 'framer-motion'
import { Caption, Cta, rise } from '../onboarding/shared'
import { ME } from '../../data/profiles'
import { SIGNS } from '../../data/signs'
import { sfx } from '../../lib/sfx'

const CX = 195
const CY = 306

/** G-09b — the Matches tab before anyone has aligned back: your aura, waiting in its rings. */
export default function NoMatches({ onDeal }: { onDeal: () => void }) {
  const [notify, setNotify] = useState(false)
  const me = SIGNS[ME.sign]
  return (
    <>
      {[278, 198, 118].map((d, i) => (
        <motion.div key={d}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: [1, 1.025, 1] }}
          transition={{ opacity: { delay: 0.1 + i * 0.1, duration: 0.6 }, scale: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 } }}
          style={{ position: 'absolute', left: CX - d / 2, top: CY - d / 2, width: d, height: d, borderRadius: '50%', border: '1px solid rgba(179,166,196,0.3)' }} />
      ))}
      <motion.div {...rise(0.2, 6)} style={{ position: 'absolute', left: CX - 55, top: CY - 55, width: 110, height: 110 }}>
        <motion.div animate={{ opacity: [0.55, 0.9, 0.55] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: -16, borderRadius: '50%', background: `radial-gradient(closest-side, ${me.color}55, transparent)` }} />
        <img src={me.auraImg} alt="" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%', borderRadius: '50%',
          WebkitMaskImage: 'radial-gradient(closest-side, #000 60%, transparent 100%)', maskImage: 'radial-gradient(closest-side, #000 60%, transparent 100%)',
        }} />
      </motion.div>

      <div style={{ position: 'absolute', top: 470, left: 24, right: 24, textAlign: 'center' }}>
        <motion.div className="eyebrow" {...rise(0.3, 8)} style={{ fontSize: 9.5, color: 'var(--label-3)' }}>No auras overlap yet</motion.div>
        <motion.h1 className="h-display" {...rise(0.4)} style={{ marginTop: 8, fontSize: 30, lineHeight: 1.12 }}>
          Your card is out there.<br />Nobody has flipped it yet.
        </motion.h1>
        <motion.p {...rise(0.5)} style={{ marginTop: 8, fontSize: 14, lineHeight: 1.4, color: 'var(--label-2)' }}>
          Matches land here the moment you both align.
        </motion.p>
      </div>

      <Cta delay={0.6} onClick={() => { sfx.tap(); onDeal() }}>Deal tonight’s deck</Cta>
      <Caption delay={0.7} top={708} onClick={notify ? undefined : () => { sfx.tap(); setNotify(true) }}>
        {notify ? 'You’ll hear the moment it happens.' : 'Notify me when it happens'}
      </Caption>
    </>
  )
}
