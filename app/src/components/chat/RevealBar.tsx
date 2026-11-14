import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { REVEAL_MS, clock } from '../../lib/betaFlow'

/**
 * The bar under the chat header during the slow reveal (beta). While the card
 * is unanswered it says so; once the chat is open it counts 33:33 down to the
 * reveal. In the demo, tapping the clock jumps to its last few seconds.
 */
export function RevealBar({ waiting, revealAt, onDone, onSkip }: { waiting?: boolean; revealAt?: number; onDone?: () => void; onSkip?: () => void }) {
  const [now, setNow] = useState(() => Date.now())
  const done = useRef(false)
  useEffect(() => {
    if (waiting || !revealAt) return
    const t = window.setInterval(() => setNow(Date.now()), 250)
    return () => clearInterval(t)
  }, [waiting, revealAt])
  const left = revealAt ? revealAt - now : REVEAL_MS
  useEffect(() => {
    if (waiting || !revealAt || left > 0 || done.current) return
    done.current = true
    onDone?.()
  }, [waiting, revealAt, left, onDone])

  if (waiting) {
    return (
      <div style={{ position: 'absolute', top: 126, left: 0, right: 0, textAlign: 'center', zIndex: 5 }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: '0.26em', color: 'var(--align)' }}>✦ THE STARS ALIGNED ✦</div>
        <div className="mono" style={{ fontSize: 8.5, letterSpacing: '0.18em', color: 'var(--label-3)', marginTop: 7 }}>PHOTOS STAY VEILED UNTIL THE REVEAL</div>
      </div>
    )
  }
  const urgent = left <= 10_000
  const frac = Math.max(0, Math.min(1, left / REVEAL_MS))
  return (
    <button onClick={onSkip} aria-label={`${clock(left)} until the reveal. Demo: tap to skip ahead`}
      style={{ position: 'absolute', top: 120, left: 0, right: 0, textAlign: 'center', zIndex: 5 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8 }}>
        <motion.span key={urgent ? Math.ceil(left / 1000) : 'c'} initial={urgent ? { scale: 1.25 } : false} animate={{ scale: 1 }} className="mono"
          style={{ fontSize: 19, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--align)', fontVariantNumeric: 'tabular-nums', textShadow: '0 0 12px rgba(242,199,92,0.5)' }}>
          {clock(left)}
        </motion.span>
        <span className="mono" style={{ fontSize: 9.5, letterSpacing: '0.22em', color: 'var(--label-2)' }}>MINS TIL REVEAL</span>
      </div>
      <div style={{ margin: '7px auto 0', width: 190, height: 2, borderRadius: 1, background: 'rgba(87,75,109,0.55)', overflow: 'hidden' }}>
        <div style={{ width: `${(1 - frac) * 100}%`, height: '100%', background: 'var(--align)', boxShadow: '0 0 6px var(--align)', transition: 'width 0.3s linear' }} />
      </div>
      <div className="mono" style={{ fontSize: 7.5, letterSpacing: '0.16em', color: 'var(--label-4)', marginTop: 5 }}>DEMO · TAP TO SKIP AHEAD</div>
    </button>
  )
}
