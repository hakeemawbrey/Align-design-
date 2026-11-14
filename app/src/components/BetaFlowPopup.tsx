import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AlignMark from './intro/AlignMark'
import PixelAlign, { ALIGN_AT } from './PixelAlign'
import { foil } from './CardFrame'
import { betaFlow, useBetaFlow } from '../lib/betaFlow'
import { profileById } from '../data/profiles'
import { session } from '../lib/session'
import { sfx } from '../lib/sfx'
import type { ScreenId } from '../screens/types'

/** screens the notification may take over (never the chat, the card, the flip or onboarding) */
const OVER: ScreenId[] = ['deck', 'matches', 'you', 'calendar', 'chart', 'spent']

/** which notifications have been put off with "Later" this visit; the deck's star still holds them */
const later = new Set<string>()

/** the Align mark's size and centre on the 390-wide phone; its seven dots sit 10.6/88 of its size apart */
const MARK = 236
const CX = 195
const CY = 258
const GAP = (10.6 / 88) * MARK

/**
 * The beta's in-app notification, played big: the screen goes dark, pixel
 * stars gather, seven of them fly into line and burst, the Align mark draws
 * itself around them, and then the words arrive. Shown when the stars align
 * and again when the 33:33 is up. "Later" closes it and leaves the deck's
 * star lit.
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

  const open = () => {
    if (!them || !kind) return
    sfx.tap()
    session.patch({ matchWith: them.id })
    if (kind === 'reveal') { betaFlow.reveal(); go('match') } else go('x/align-card')
  }
  const dismiss = () => { if (key) { sfx.tap(); later.add(key); bump((n) => n + 1) } }

  return (
    <AnimatePresence>
      {show && them && kind && <Moment key={key} kind={kind} name={them.name} onOpen={open} onLater={dismiss} />}
    </AnimatePresence>
  )
}

function Moment({ kind, name, onOpen, onLater }: { kind: 'aligned' | 'reveal'; name: string; onOpen: () => void; onLater: () => void }) {
  // a beat after the swipe before the sky takes over, so the two don't collide
  const lead = kind === 'aligned' ? 0.7 : 0.1
  const [on, setOn] = useState(false)
  const [burst, setBurst] = useState(false)
  const [words, setWords] = useState(false)
  useEffect(() => {
    const ts = [
      window.setTimeout(() => { setOn(true); sfx.reveal() }, lead * 1000),
      window.setTimeout(() => setWords(true), (lead + ALIGN_AT.settle) * 1000),
    ]
    return () => ts.forEach(clearTimeout)
  }, [lead])

  const rise = (delay: number) => ({
    initial: false as const,
    animate: { opacity: words ? 1 : 0, y: words ? 0 : 18 },
    transition: { delay: words ? delay : 0, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const },
  })

  return (
    <motion.div role="dialog" aria-label={kind === 'aligned' ? 'The stars align' : 'It’s time'}
      initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: lead, duration: 0.5 } }} exit={{ opacity: 0, transition: { duration: 0.25 } }}
      style={{ position: 'absolute', inset: 0, zIndex: 90, overflow: 'hidden', background: 'radial-gradient(90% 55% at 50% 30%, #2a1556 0%, #0d0620 55%, #05020f 100%)' }}>
      {/* a warm light behind the mark, swelling when the seven line up */}
      <motion.div animate={{ opacity: burst ? 0.95 : 0.25, scale: burst ? 1.25 : 0.8 }} transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ position: 'absolute', left: CX - 220, top: CY - 220, width: 440, height: 440, borderRadius: '50%', pointerEvents: 'none', filter: 'blur(26px)',
          background: 'radial-gradient(closest-side, rgba(242,199,92,0.5), rgba(180,92,255,0.28) 55%, transparent)' }} />

      {on && <PixelAlign cx={CX} cy={CY} gap={GAP} quietBelow={410} onBurst={() => { setBurst(true); sfx.match() }} />}

      {/* the Align mark draws itself around the seven once they're in line */}
      {on && (
        <motion.div animate={{ scale: burst ? [1, 1.08, 1] : 1 }} transition={{ duration: 0.7 }}
          style={{ position: 'absolute', left: CX - MARK / 2, top: CY - MARK / 2, width: MARK, height: MARK, pointerEvents: 'none' }}>
          <AlignMark size={MARK} animate delay={ALIGN_AT.aligned - 0.5} dots={false} strokeOpacity={0.9} strokeWidth={0.7} />
        </motion.div>
      )}

      {/* the flash as they line up */}
      <AnimatePresence>
        {burst && (
          <motion.div key="flash" initial={{ opacity: 0.85 }} animate={{ opacity: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(circle at ${CX}px ${CY}px, #fff 0%, rgba(255,244,207,0.7) 22%, transparent 62%)` }} />
        )}
      </AnimatePresence>

      {/* while they gather */}
      <motion.div className="mono" animate={{ opacity: words ? 0 : on ? [0.4, 1, 0.4] : 0 }} transition={{ duration: 1.4, repeat: words ? 0 : Infinity }}
        style={{ position: 'absolute', left: 0, right: 0, top: 500, textAlign: 'center', fontSize: 10, letterSpacing: '0.3em', color: 'var(--label-2)' }}>
        {kind === 'aligned' ? 'SOMETHING IS LINING UP…' : 'THE CLOCK HAS RUN OUT…'}
      </motion.div>

      {/* the words */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 438, textAlign: 'center', padding: '0 26px', pointerEvents: words ? 'auto' : 'none' }}>
        <motion.div {...rise(0)} className="mono" style={{ fontSize: 11, letterSpacing: '0.34em', fontWeight: 700, color: 'var(--align)' }}>
          ✦ {kind === 'aligned' ? 'MUTUAL ALIGN' : '33:33 IS UP'} ✦
        </motion.div>
        <motion.h1 {...rise(0.08)} className="h-display" style={{ margin: '12px 0 0', fontSize: 50, lineHeight: 1.02, textShadow: '0 0 30px rgba(242,199,92,0.45)' }}>
          {kind === 'aligned' ? <>The stars<br />align.</> : <>The veil<br />lifts.</>}
        </motion.h1>
        <motion.div {...rise(0.2)} className="serif italic" style={{ fontSize: 21, lineHeight: 1.25, color: 'var(--label-1)', marginTop: 14 }}>
          {kind === 'aligned' ? `You and ${name} both said yes.` : `It’s time to see ${name}.`}
        </motion.div>
        <motion.p {...rise(0.28)} style={{ margin: '8px auto 0', maxWidth: 300, fontSize: 14.5, lineHeight: 1.45, color: 'var(--label-2)' }}>
          {kind === 'aligned' ? 'No faces yet. The stars deal you both one card first.' : 'Flip your cards and see each other.'}
        </motion.p>
      </div>

      <motion.div {...rise(0.4)} style={{ position: 'absolute', left: 38, right: 38, top: 694, pointerEvents: words ? 'auto' : 'none' }}>
        <button className="chrome-cta" onClick={onOpen} style={{ width: '100%' }}>
          {kind === 'aligned' ? 'Draw our card' : 'Flip our cards'} <span className="spark">✦</span>
        </button>
        <button onClick={onLater} style={{ display: 'block', margin: '6px auto 0', height: 40, padding: '0 16px', fontSize: 14, color: 'var(--label-2)' }}>
          Later · it stays on your star
        </button>
      </motion.div>

      {/* the whole moment sits in a thick foil frame, like a card */}
      <motion.div aria-hidden initial={{ opacity: 0 }} animate={{ opacity: burst ? 1 : 0.35 }} transition={{ duration: 0.8 }}
        style={{ position: 'absolute', inset: 8, borderRadius: 40, padding: 3.5, pointerEvents: 'none', background: foil('#f2c75c'),
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)', WebkitMaskComposite: 'xor', mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
          boxShadow: '0 0 30px rgba(242,199,92,0.35)' }} />
    </motion.div>
  )
}
