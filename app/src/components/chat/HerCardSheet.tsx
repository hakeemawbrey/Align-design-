import { motion } from 'framer-motion'
import ProfileFace from '../reveal/ProfileFace'
import RevealStyles from '../reveal/RevealStyles'
import type { Profile } from '../../data/profiles'
import { sfx } from '../../lib/sfx'

/**
 * S-09h — their full card, flipped, opened from the chat header.
 * A bottom sheet over the thread: tap outside (or drag down) to close.
 */
export default function HerCardSheet({ p, pronoun = 'she', onClose, onAlignment }: {
  p: Profile
  pronoun?: 'he' | 'she' | 'they'
  onClose: () => void
  onAlignment: () => void
}) {
  const whose = pronoun === 'he' ? 'His' : pronoun === 'they' ? 'Their' : 'Her'
  const close = () => { sfx.tap(); onClose() }
  return (
    <>
      <RevealStyles />
      <motion.div
        key="bd"
        onClick={close}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{ position: 'absolute', inset: 0, zIndex: 40, background: 'rgba(5,2,15,0.6)' }}
      />
      <motion.div
        key="sheet"
        initial={{ y: 760 }} animate={{ y: 0 }} exit={{ y: 760 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={(_, i) => { if (i.offset.y > 120 || i.velocity.y > 600) close() }}
        style={{
          position: 'absolute', left: 0, right: 0, top: 60, bottom: 0, zIndex: 41, borderRadius: '26px 26px 0 0',
          background: 'linear-gradient(180deg, #281a4e, #150b35)',
          borderTop: '1px solid rgba(179,166,196,0.22)', boxShadow: '0 -20px 50px rgba(0,0,0,0.45)',
        }}
      >
        <div style={{ position: 'absolute', top: 12, left: '50%', marginLeft: -20, width: 40, height: 4, borderRadius: 2, background: 'rgba(179,166,196,0.45)' }} />
        <div className="mono" style={{ position: 'absolute', top: 26, left: 0, right: 0, textAlign: 'center', fontSize: 8.5, letterSpacing: '0.22em', color: 'var(--label-3)', textTransform: 'uppercase' }}>
          {whose} card · flipped · tap outside to close
        </div>

        <div style={{ position: 'absolute', top: 46, left: 16, width: 358, height: 625 }}>
          <ProfileFace p={p} shown lift revealed />
        </div>

        <div style={{ position: 'absolute', top: 685, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
          <motion.button className="chrome-cta" whileTap={{ scale: 0.97 }} onClick={() => { sfx.tap(); onAlignment() }} style={{ height: 50 }}>
            Your alignment <span style={{ fontStyle: 'normal', fontSize: 15 }}>›</span>
          </motion.button>
        </div>
        <div style={{ position: 'absolute', top: 744, left: 0, right: 0, textAlign: 'center', fontSize: 12, color: 'var(--label-3)' }}>
          Spark · Rub · Align · how you two fit
        </div>
      </motion.div>
    </>
  )
}
