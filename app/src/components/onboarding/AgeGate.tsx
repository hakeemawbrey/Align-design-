import { motion } from 'framer-motion'
import { sfx } from '../../lib/sfx'
import { Header, EASE } from './shared'

/** O-03b — under 18: a dead end with one way back. */
export default function AgeGate({ back }: { back: () => void }) {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Header
        eyebrow="Age check · Align is 18+"
        title="Come back at eighteen."
        body="Align matches adults. If the year you typed is wrong, that is the usual culprit."
      />
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
        style={{ position: 'absolute', top: 638, left: 38, width: 314 }}
      >
        <motion.button
          onClick={() => { sfx.tap(); back() }}
          whileTap={{ scale: 0.97 }}
          className="serif italic"
          style={{
            width: '100%', height: 52, borderRadius: 26, fontSize: 18, color: 'var(--label-1)',
            background: 'rgba(40,26,78,0.7)', border: '1px solid rgba(154,123,224,0.45)',
          }}
        >
          Check my birth date
        </motion.button>
      </motion.div>
    </div>
  )
}
