import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CardFrame, { CardOrb } from './CardFrame'
import { betaFlow, useBetaFlow } from '../lib/betaFlow'
import { profileById } from '../data/profiles'
import { session } from '../lib/session'
import { sfx } from '../lib/sfx'
import type { ScreenId } from '../screens/types'

/** screens the pop-up may appear over (never the chat, the card, the flip or onboarding) */
const OVER: ScreenId[] = ['deck', 'matches', 'you', 'calendar', 'chart', 'spent']

/** which notifications have been put off with "Later" this visit; the deck's star still holds them */
const later = new Set<string>()

/**
 * The beta's in-app notification: a pop-up in the middle of the screen when
 * the stars align, and again when the 33:33 is up. "Later" closes it and
 * leaves the deck's star lit.
 */
export default function BetaFlowPopup({ go, screen }: { go: (id: ScreenId) => void; screen: ScreenId }) {
  const flow = useBetaFlow()
  const them = flow.with ? profileById(flow.with) : undefined
  const [due, setDue] = useState(false)
  const [, bump] = useState(0)
  useEffect(() => {
    if (flow.stage !== 'chat' || !flow.revealAt) { setDue(false); return }
    const tick = () => setDue(Date.now() >= (flow.revealAt ?? 0))
    tick()
    const t = window.setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [flow.stage, flow.revealAt])

  const kind = !them || !OVER.includes(screen) ? null : flow.stage === 'aligned' ? 'aligned' : due ? 'reveal' : null
  const key = kind && them ? `${kind}:${them.id}` : null
  const show = !!key && !later.has(key)
  useEffect(() => { if (show) sfx.match() }, [show])

  const open = () => {
    if (!them || !kind) return
    sfx.tap()
    session.patch({ matchWith: them.id })
    if (kind === 'reveal') { betaFlow.reveal(); go('match') } else go('x/align-card')
  }
  const dismiss = () => { if (key) { sfx.tap(); later.add(key); bump((n) => n + 1) } }

  return (
    <AnimatePresence>
      {show && them && kind && (
        <motion.div key={key} role="dialog" aria-label={kind === 'aligned' ? 'The stars align' : 'It’s time'}
          initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: kind === 'aligned' ? 0.8 : 0 } }} exit={{ opacity: 0, transition: { duration: 0.18 } }}
          onClick={dismiss}
          style={{ position: 'absolute', inset: 0, zIndex: 90, display: 'grid', placeItems: 'center', padding: 28, background: 'rgba(5,2,15,0.72)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}>
          <motion.div onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, y: 30, rotate: -3 }} animate={{ scale: 1, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 20, delay: kind === 'aligned' ? 0.85 : 0.05 } }}
            exit={{ scale: 0.92, y: 16, opacity: 0, transition: { duration: 0.18 } }}
            style={{ width: '100%', maxWidth: 320 }}>
            <CardFrame tint="#f2c75c" thick={3.5} radius={24} padding="22px 20px 18px" footer={['Align · notification', kind === 'aligned' ? 'Just now' : '33:33']}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <motion.div animate={{ rotate: [0, 14, 0], scale: [1, 1.12, 1] }} transition={{ duration: 2.6, repeat: Infinity }}>
                  <CardOrb tint="#f2c75c" size={58}>✦</CardOrb>
                </motion.div>
                <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.26em', fontWeight: 700, color: 'var(--align)', marginTop: 16 }}>
                  {kind === 'aligned' ? 'THE STARS ALIGN' : 'IT’S TIME'}
                </div>
                <div className="h-display" style={{ fontSize: 29, lineHeight: 1.15, marginTop: 8 }}>
                  {kind === 'aligned' ? <>You and {them.name}<br />both said yes.</> : <>The veil lifts<br />on {them.name}.</>}
                </div>
                <p style={{ margin: '10px 0 0', fontSize: 14.5, lineHeight: 1.45, color: 'var(--label-2)' }}>
                  {kind === 'aligned'
                    ? 'No faces yet. The stars deal you both one card first. Answer it to open the chat.'
                    : 'Your 33:33 is up. Flip your cards and see each other.'}
                </p>
                <button className="chrome-cta" onClick={open} style={{ width: '100%', marginTop: 18 }}>
                  {kind === 'aligned' ? 'Draw our card' : 'Flip our cards'} <span className="spark">✦</span>
                </button>
                <button onClick={dismiss} style={{ marginTop: 6, height: 40, padding: '0 16px', fontSize: 14, color: 'var(--label-2)' }}>
                  Later · it stays on your star
                </button>
              </div>
            </CardFrame>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
