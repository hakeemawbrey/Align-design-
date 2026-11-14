import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { betaFlow, useBetaFlow } from '../lib/betaFlow'
import { profileById } from '../data/profiles'
import { session } from '../lib/session'
import { sfx } from '../lib/sfx'
import type { ScreenId } from '../screens/types'

/** screens the notification may drop over (never the chat itself, the match moment or onboarding) */
const OVER: ScreenId[] = ['deck', 'matches', 'you', 'calendar', 'chart', 'spent']

/**
 * The beta's notifications for the slow reveal: "the stars align" when you
 * both said yes, and "it's time" when the countdown ends while you're
 * somewhere else. Each stays until you tap it.
 */
export default function BetaFlowBanner({ go, screen }: { go: (id: ScreenId) => void; screen: ScreenId }) {
  const flow = useBetaFlow()
  const them = flow.with ? profileById(flow.with) : undefined
  // the reveal is due: checked once a second while the clock runs
  const [due, setDue] = useState(false)
  useEffect(() => {
    if (flow.stage !== 'chat' || !flow.revealAt) { setDue(false); return }
    const tick = () => setDue(Date.now() >= (flow.revealAt ?? 0))
    tick()
    const t = window.setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [flow.stage, flow.revealAt])

  const kind = !them || !OVER.includes(screen) ? null : flow.stage === 'aligned' ? 'aligned' : due ? 'reveal' : null
  useEffect(() => { if (kind) sfx.match() }, [kind])

  const open = () => {
    if (!them) return
    sfx.tap()
    session.patch({ matchWith: them.id })
    if (kind === 'reveal') { betaFlow.reveal(); go('match'); return }
    betaFlow.openCard()
    if (them.id === 'j27') go('chat'); else { session.patch({ threadWith: them.id }); go('thread') }
  }

  return (
    <AnimatePresence>
      {kind && them && (
        <motion.button key={kind} onClick={open}
          initial={{ y: -110, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -110, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26, delay: kind === 'aligned' ? 0.9 : 0 }}
          style={{
            position: 'absolute', left: 12, right: 12, top: 50, zIndex: 90, padding: 3, borderRadius: 22, textAlign: 'left',
            background: 'linear-gradient(160deg, #f2c75c 0%, #ffe9b0 22%, #fff 42%, #ffe9b0 58%, #f2c75c 78%, #ffe9b0 100%)',
            boxShadow: '0 0 34px rgba(242,199,92,0.45), 0 14px 34px rgba(0,0,0,0.55)',
          }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', borderRadius: 19, background: 'linear-gradient(180deg, #24163f, #150d28)' }}>
            <motion.span animate={{ rotate: [0, 18, 0], scale: [1, 1.2, 1] }} transition={{ duration: 2.4, repeat: Infinity }} style={{ fontSize: 24, color: '#f2c75c', lineHeight: 1 }}>✦</motion.span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span className="mono" style={{ display: 'block', fontSize: 9.5, letterSpacing: '0.2em', fontWeight: 700, color: '#f2c75c' }}>
                {kind === 'aligned' ? 'THE STARS ALIGN' : 'IT’S TIME'}
              </span>
              <span className="serif italic" style={{ display: 'block', fontSize: 19, lineHeight: 1.2, color: 'var(--label-1)', marginTop: 3 }}>
                {kind === 'aligned' ? `You and ${them.name} both said yes.` : `The veil lifts on ${them.name}.`}
              </span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: 1.35, color: 'var(--label-2)', marginTop: 3 }}>
                {kind === 'aligned' ? 'A card is waiting for you two. Answer it to open the chat.' : 'Your 33:33 is up. Tap to flip your cards.'}
              </span>
            </span>
            <span className="mono" style={{ fontSize: 9.5, letterSpacing: '0.14em', fontWeight: 700, color: 'var(--chrome-ink)', background: 'var(--chrome)', padding: '8px 11px', borderRadius: 999, flexShrink: 0 }}>
              {kind === 'aligned' ? 'OPEN' : 'REVEAL'}
            </span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
