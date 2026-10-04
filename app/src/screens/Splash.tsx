import { useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import AlignMark from '../components/intro/AlignMark'
import { sfx } from '../lib/sfx'

const START = 0.25 // s
const DOT_STEP = 0.13
const DOTS_AT = START + 0.85 * 0.9
const WORD_AT = DOTS_AT + 7 * DOT_STEP + 0.05
const LEAVE_MS = 2900

/** S-01 Open app — the mark draws itself in, chakras light root→crown, wordmark. */
export default function Splash({ go }: ScreenProps) {
  const left = useRef(false)
  const leave = useCallback(() => {
    if (left.current) return
    left.current = true
    go('welcome')
  }, [go])

  useEffect(() => {
    const timers: number[] = []
    for (let i = 0; i < 7; i++) {
      timers.push(window.setTimeout(() => sfx.peekTick(i / 6), (DOTS_AT + i * DOT_STEP) * 1000))
    }
    timers.push(window.setTimeout(() => sfx.sparkle(), WORD_AT * 1000))
    timers.push(window.setTimeout(leave, LEAVE_MS))
    return () => timers.forEach(clearTimeout)
  }, [leave])

  return (
    <div
      style={{ position: 'absolute', inset: 0, cursor: 'pointer', background: 'var(--void)' }}
      onClick={() => { sfx.tap(); leave() }}
    >
      <Starfield aurora={null} warm={null} count={60} seed={3} />
      {/* lift the void to the Figma splash indigo; 'lighten' keeps the stars */}
      <div style={{ position: 'absolute', inset: 0, background: '#150b35', mixBlendMode: 'lighten', pointerEvents: 'none' }} />
      {/* faint violet halo behind the mark, breathes in with the chakras */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: DOTS_AT, duration: 1.4, ease: 'easeOut' }}
        style={{
          position: 'absolute', left: 195 - 150, top: 340 - 150, width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(closest-side, rgba(154,123,224,0.22), rgba(91,47,184,0.08) 60%, transparent)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'absolute', left: 195 - 62, top: 340 - 62 }}>
        <AlignMark size={124} animate delay={START} dotStep={DOT_STEP} strokeOpacity={0.6} strokeWidth={0.5} />
      </div>
      <motion.div
        className="serif italic"
        initial={{ opacity: 0, y: 8, filter: 'blur(6px)', letterSpacing: '0.12em' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)', letterSpacing: '0.01em' }}
        transition={{ delay: WORD_AT, duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
        style={{
          position: 'absolute', top: 422, width: '100%', textAlign: 'center',
          fontSize: 38, color: 'var(--label-1)', textShadow: '0 0 24px rgba(239,230,214,0.25)',
        }}
      >
        Align
      </motion.div>
    </div>
  )
}
