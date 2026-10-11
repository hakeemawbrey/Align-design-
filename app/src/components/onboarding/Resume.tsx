import { motion } from 'framer-motion'
import { SIGNS, type SignId } from '../../data/signs'
import { sfx } from '../../lib/sfx'
import Constellation from './Constellation'
import { Caption, Cta, Header, EASE } from './shared'

const WORDS = ['None', 'One', 'Two', 'Three', 'Four', 'Five', 'Six']

/** O-15 — "The sky saved your place." Shown when you left onboarding part-way. */
export default function Resume({ sun, step, of, resume, restart }: { sun: SignId; step: number; of: number; resume: () => void; restart: () => void }) {
  const sign = SIGNS[sun]
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Header
        eyebrow="You left mid-cast"
        title={<>The sky saved<br />your place.</>}
        body={`${WORDS[step]} ${step === 1 ? 'step' : 'steps'} cast, ${WORDS[of - step].toLowerCase()} to go. Pick up exactly where you put the sky down.`}
        bodyWidth={300}
      />
      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 1, ease: EASE }}
        style={{ position: 'absolute', top: 300, left: 0, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity }}>
          <Constellation sign={sun} color={sign.light} width={110} />
        </motion.div>
        <div className="mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: sign.light }}>{sign.glyph} SUN IN {sign.name.toUpperCase()} · KEPT</div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="mono" style={{ position: 'absolute', top: 606, width: '100%', textAlign: 'center', fontSize: 8.5, letterSpacing: '0.18em', color: 'var(--label-3)' }}>
        STEP {step} OF {of} · SAVED AUTOMATICALLY
      </motion.div>
      <Cta onClick={resume} delay={0.6}>Resume my chart</Cta>
      <Caption delay={0.8} onClick={() => { sfx.tap(); restart() }}>Start my chart over</Caption>
    </div>
  )
}
