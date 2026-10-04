import { motion } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import CardBack from '../components/intro/CardBack'
import { sfx } from '../lib/sfx'

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const },
})

/** S-02 Auth — "The stars kept your seat warm." */
export default function Welcome({ go }: ScreenProps) {
  const enter = () => { sfx.align(); go('dealing') }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora="#6a35c4" warm="#8a5a3a" count={70} seed={11} />
      <div style={{ position: 'absolute', inset: 0, background: '#150b35', mixBlendMode: 'lighten', pointerEvents: 'none' }} />
      {/* top violet bloom, as in Figma */}
      <div style={{
        position: 'absolute', left: -40, top: -120, width: 470, height: 360, pointerEvents: 'none',
        background: 'radial-gradient(50% 50% at 50% 45%, rgba(120, 60, 200, 0.55) 0%, rgba(90, 40, 170, 0.15) 55%, transparent 75%)',
      }} />
      {/* warm amber bloom at the foot */}
      <div style={{
        position: 'absolute', left: 0, bottom: -110, width: 390, height: 320, pointerEvents: 'none',
        background: 'radial-gradient(50% 50% at 50% 60%, rgba(150, 100, 60, 0.45) 0%, rgba(120, 70, 60, 0.12) 50%, transparent 72%)',
      }} />

      <motion.div className="eyebrow" {...rise(0.1)}
        style={{ position: 'absolute', top: 97, width: '100%', textAlign: 'center', color: 'var(--label-2)' }}>
        Welcome back
      </motion.div>
      <motion.h1 className="h-display" {...rise(0.22)}
        style={{ position: 'absolute', top: 120, width: '100%', textAlign: 'center', fontSize: 31, lineHeight: 1.18, letterSpacing: '-0.005em' }}>
        The stars kept<br />your seat warm.
      </motion.h1>

      {/* the face-down card — bobbing, glow breathing */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 25, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        transition={{ delay: 0.35, duration: 1.0, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ position: 'absolute', left: 115, top: 232, width: 160, height: 262, perspective: 800 }}
      >
        <motion.div
          animate={{ opacity: [0.35, 0.8, 0.35], scale: [0.95, 1.06, 0.95] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: -40, borderRadius: 40, pointerEvents: 'none',
            background: 'radial-gradient(closest-side, rgba(150, 100, 240, 0.55), rgba(120, 70, 220, 0.15) 60%, transparent)',
            filter: 'blur(8px)',
          }}
        />
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [-0.6, 0.6, -0.6] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.03 }}
          onClick={() => sfx.flip()}
          style={{ cursor: 'pointer', position: 'relative', borderRadius: 12, overflow: 'hidden' }}
        >
          <CardBack />
          {/* slow sheen sweeping the card */}
          <motion.div
            animate={{ x: [-180, 200] }}
            transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 2.4, ease: 'easeInOut', delay: 1.4 }}
            style={{
              position: 'absolute', top: -20, left: 0, width: 140, height: 302, pointerEvents: 'none',
              background: 'linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0) 100%)',
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div {...rise(0.6)} style={{ position: 'absolute', top: 584, left: 38, width: 314 }}>
        <motion.button
          className="chrome-cta"
          onClick={enter}
          whileHover={{ scale: 1.02, boxShadow: '0 0 44px rgba(248, 237, 255, 0.55), inset 0 1px 0 rgba(255,255,255,0.9)' }}
          whileTap={{ scale: 0.97 }}
        >
          Continue as Hakeem <span className="spark">✦</span>
        </motion.button>
      </motion.div>
      <motion.div {...rise(0.7)} style={{ position: 'absolute', top: 650, left: 38, width: 314 }}>
        <motion.button
          onClick={enter}
          whileHover={{ backgroundColor: 'rgba(120, 100, 160, 0.28)' }}
          whileTap={{ scale: 0.97 }}
          style={{
            width: 314, height: 54, borderRadius: 999,
            background: 'rgba(90, 74, 130, 0.22)',
            border: '1px solid rgba(201, 188, 228, 0.35)',
            backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 19, color: 'var(--label-1)',
          }}
        >
          Sign in
        </motion.button>
      </motion.div>

      <motion.button {...rise(0.8)} onClick={() => { sfx.tap(); go('onboarding') }} className="serif italic"
        style={{ position: 'absolute', top: 710, left: 60, right: 60, height: 46, textAlign: 'center', fontSize: 15.5, color: 'var(--label-1)', zIndex: 5, touchAction: 'manipulation', textDecoration: 'underline', textDecorationColor: 'rgba(239,230,214,0.35)', textUnderlineOffset: 4 }}>
        New here — read my chart ›
      </motion.button>
      <motion.div {...rise(0.9)}
        style={{ position: 'absolute', top: 765, width: '100%', textAlign: 'center', pointerEvents: 'none', fontSize: 10.5, lineHeight: 1.45, color: 'var(--label-3)' }}>
        By continuing you agree to the<br />Terms and Privacy Policy.
      </motion.div>
    </div>
  )
}
