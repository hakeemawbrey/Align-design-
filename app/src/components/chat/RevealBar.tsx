import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { REVEAL_MS, clock } from '../../lib/betaFlow'

/**
 * The bar under the chat header during the slow reveal (beta). While the card
 * is unanswered it says so; once the chat is open it counts 33:33 down to the
 * reveal. In the demo, tapping the clock jumps to its last few seconds.
 */
export function RevealBar({ waiting, revealAt, onReveal, onSkip, name }: { waiting?: boolean; revealAt?: number; /** you chose to reveal */ onReveal?: () => void; onSkip?: () => void; name?: string }) {
  const [now, setNow] = useState(() => Date.now())
  /** the clock ran out and you chose to keep chatting for now */
  const [kept, setKept] = useState(false)
  useEffect(() => {
    if (waiting || !revealAt) return
    const t = window.setInterval(() => setNow(Date.now()), 250)
    return () => clearInterval(t)
  }, [waiting, revealAt])
  const left = revealAt ? revealAt - now : REVEAL_MS

  if (waiting) {
    return (
      <div style={{ position: 'absolute', top: 126, left: 0, right: 0, textAlign: 'center', zIndex: 5 }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: '0.26em', color: 'var(--align)' }}>✦ THE STARS ALIGNED ✦</div>
        <div className="mono" style={{ fontSize: 8.5, letterSpacing: '0.18em', color: 'var(--label-3)', marginTop: 7 }}>PHOTOS STAY VEILED UNTIL THE REVEAL</div>
      </div>
    )
  }
  // time's up: nothing happens on its own. You choose: reveal now, or keep chatting and reveal later
  if (left <= 0) {
    if (kept) {
      return (
        <button onClick={onReveal} style={{ position: 'absolute', top: 122, left: 0, right: 0, zIndex: 5, display: 'flex', justifyContent: 'center' }}>
          <span className="mono" style={{ height: 30, padding: '0 14px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 9.5, letterSpacing: '0.18em', fontWeight: 700, color: 'var(--align)', border: '1px solid rgba(242,199,92,0.5)', background: 'rgba(40,26,78,0.85)' }}>
            ✦ REVEAL WHEN YOU’RE READY ›
          </span>
        </button>
      )
    }
    return (
      <motion.div role="dialog" aria-label="The 33:33 is up" initial={{ opacity: 0, y: -10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        style={{ position: 'absolute', top: 118, left: 20, right: 20, zIndex: 7, borderRadius: 20, padding: 3, background: 'linear-gradient(160deg, #f2c75c, #fff1c9 35%, #c9a6ff 70%, #f2c75c)', boxShadow: '0 0 30px rgba(242,199,92,0.4), 0 16px 36px rgba(0,0,0,0.55)' }}>
        <div style={{ borderRadius: 17, padding: '14px 16px 14px', textAlign: 'center', background: 'linear-gradient(180deg, #24124f, #150b2c)' }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: '0.26em', fontWeight: 700, color: 'var(--align)' }}>✦ 33:33 IS UP ✦</div>
          <div className="serif italic" style={{ fontSize: 22, lineHeight: 1.2, color: 'var(--label-1)', marginTop: 6 }}>Ready to see {name ?? 'each other'}?</div>
          <div style={{ fontSize: 13, color: 'var(--label-2)', marginTop: 4 }}>Flip your cards now, or keep talking and reveal whenever you like.</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button onClick={() => setKept(true)} className="serif italic" style={{ flex: 1, height: 44, borderRadius: 999, fontSize: 16.5, color: 'var(--label-1)', border: '1px solid rgba(248,237,255,0.35)', background: 'rgba(52,35,95,0.6)' }}>Keep chatting</button>
            <button onClick={onReveal} className="chrome-cta" style={{ flex: 1, width: 'auto', height: 44, fontSize: 16.5 }}>Reveal now <span className="spark">✦</span></button>
          </div>
        </div>
      </motion.div>
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
