import { useEffect, useRef, useState } from 'react'
import { talk } from '../lib/talk'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import type { ScreenProps } from './types'
import Backdrop from '../components/paywall/Backdrop'
import Portal, { Sparkle4 } from '../components/paywall/Portal'
import FoundingCard from '../components/paywall/FoundingCard'
import { CheckStamp, CloseX } from '../components/paywall/bits'
import Burst from '../components/reveal/Burst'
import { ConfettiCanvas, useConfetti } from '../components/reveal/useConfetti'
import { session } from '../lib/session'
import { sfx } from '../lib/sfx'

type PlanId = 'founding' | 'monthly'
type Phase = 'offer' | 'flare' | 'claimed'

/** Launch prices from the pricing sheet: the onboarding promo, with the regular price struck through. */
const PLANS: { id: PlanId; name: string; price: string; l1: string; was: string }[] = [
  { id: 'founding', name: 'Yearly', price: '$88.88', l1: 'a year · $7.41/mo', was: '$122.22' },
  { id: 'monthly', name: 'Monthly', price: '$14.44', l1: 'a month', was: '$23.33' },
]

const STEPS = [
  { h: 'Today', s: 'Full access to Align+, nothing charged' },
  { h: 'Tomorrow', s: 'We remind you before your trial ends' },
  { h: 'In 3 days', s: 'You are charged unless you cancel before' },
]

const PERKS = ['45 cards\na night', '33 peeks\na week', '3 packs a day\n+ a box shipped\nevery season']

/** portal geometry */
const PW = 100
const PH = 138
const PX = 145
const PY = 74
const PCX = PX + PW / 2
const PCY = PY + PH / 2
/** founding card centre after it stamps down */
const CX = 195
const CY = 262

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease: [0.2, 0.8, 0.2, 1] as const },
})

/** O-14 — end of onboarding: the founding member offer. */
export default function Founding({ go }: ScreenProps) {
  const [plan, setPlan] = useState<PlanId>('founding')
  const [phase, setPhase] = useState<Phase>('offer')
  const [burst, setBurst] = useState({ k: 0, x: PCX, y: PCY, p: 0.6 })
  const { canvasRef, fire } = useConfetti()
  const shake = useAnimationControls()
  const timers = useRef<number[]>([])

  useEffect(() => {
    const t = window.setTimeout(() => sfx.sparkle(), 450)
    const ts = timers.current
    return () => { clearTimeout(t); ts.forEach(clearTimeout) }
  }, [])

  const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)) }

  const claim = () => {
    if (phase !== 'offer') return
    sfx.tap()
    sfx.reveal()
    setPhase('flare')
    session.patch({ alignPlus: true })
    talk.grantOnce('alignplus', 'afterdark')
    later(() => setBurst((b) => ({ k: b.k + 1, x: PCX, y: PCY, p: 0.55 })), 120)
    later(() => setPhase('claimed'), 650)
    // the card lands ~0.95s in
    later(() => {
      sfx.match()
      setBurst((b) => ({ k: b.k + 1, x: CX, y: CY, p: 1 }))
      fire({ x: CX / 390, y: CY / 844, power: 1 })
      void shake.start({ x: [0, -7, 6, -4, 3, 0], y: [0, 5, -4, 2, -1, 0], transition: { duration: 0.42, ease: 'easeOut' } })
    }, 960)
    PERKS.forEach((_, i) => later(() => sfx.peekTick(0.3 + i * 0.3), 1700 + i * 180))
  }

  const pick = (id: PlanId) => {
    if (id === plan) return
    sfx.tap()
    setPlan(id)
  }

  const founding = plan === 'founding'

  return (
    <motion.div animate={shake} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Backdrop seed={58} />

      {/* the portal — flares open, then hands the light to the card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 10 }}
        animate={phase === 'offer'
          ? { opacity: 1, scale: 1, y: 0 }
          : phase === 'flare'
            ? { opacity: 1, scale: 1.5, y: 40 }
            : { opacity: 0, scale: 2.2, y: 120 }}
        transition={phase === 'offer'
          ? { delay: 0.2, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }
          : phase === 'flare'
            ? { type: 'spring', stiffness: 240, damping: 14 }
            : { duration: 0.45, ease: 'easeIn' }}
        style={{ position: 'absolute', left: PX, top: PY, width: PW, height: PH, zIndex: 2 }}>
        <motion.div animate={phase === 'offer' ? { y: [0, -4, 0] } : { y: 0 }}
          transition={phase === 'offer' ? { duration: 5, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}>
          <Portal w={PW} h={PH} flare={phase !== 'offer'} sparkles={false} />
        </motion.div>
      </motion.div>
      {phase === 'offer' && (
        <>
          <Sparkle4 x={138} y={84} s={13} d={0} />
          <Sparkle4 x={252} y={116} s={8} d={1} />
          <Sparkle4 x={144} y={194} s={6} d={0.4} />
          <Sparkle4 x={236} y={196} s={7} d={1.6} />
        </>
      )}

      <AnimatePresence>
        {phase === 'offer' && (
          <motion.div key="offer" style={{ position: 'absolute', inset: 0, zIndex: 3 }}
            exit={{ opacity: 0, y: 12, transition: { duration: 0.35, ease: 'easeIn' } }}>
            <CloseX side="left" onClick={() => { sfx.tap(); go('dealing') }} />

            <motion.div {...fade(0.15)} style={{ position: 'absolute', top: 226, left: 0, right: 0, textAlign: 'center', fontSize: 12, letterSpacing: '0.34em', color: 'var(--label-1)', paddingLeft: '0.34em' }}>
              ALIGN+
            </motion.div>
            <motion.h1 {...fade(0.22)} className="h-display" style={{ position: 'absolute', top: 246, left: 0, right: 0, textAlign: 'center', fontSize: 34, whiteSpace: 'nowrap' }}>
              Stop rationing the stars.
            </motion.h1>
            <motion.p {...fade(0.3)} style={{ position: 'absolute', top: 294, left: 30, right: 30, textAlign: 'center', fontSize: 15, lineHeight: 1.45, color: 'var(--label-2)' }}>
              45 cards a night, 33 peeks a week, three packs a day, and a box of real cards shipped every season.
            </motion.p>

            {/* timeline */}
            <div style={{ position: 'absolute', top: 376, left: 0, right: 0, textAlign: 'center' }}>
              {STEPS.map((st, i) => (
                <div key={st.h}>
                  {i > 0 && (
                    <motion.div initial={{ opacity: 0, scale: 0, rotate: -90 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 16, delay: 0.45 + i * 0.16 }}
                      style={{ height: 22, lineHeight: '22px', margin: '3px 0', fontSize: 13, color: i === 1 ? '#f2c75c' : 'var(--label-2)' }}>✦</motion.div>
                  )}
                  <motion.div {...fade(0.4 + i * 0.16)}>
                    <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--label-1)' }}>{st.h}</div>
                    <div style={{ marginTop: 5, fontSize: 13.5, color: 'var(--label-2)' }}>{st.s}</div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* plans */}
            <div style={{ position: 'absolute', top: 592, left: 20, right: 20, display: 'flex', gap: 22 }}>
              {PLANS.map((pl, i) => {
                const sel = pl.id === plan
                return (
                  <motion.button key={pl.id}
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: sel ? -3 : 0, scale: sel ? 1 : 0.985 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 22, delay: 0.85 + i * 0.08 }}
                    whileHover={{ y: sel ? -5 : -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => pick(pl.id)}
                    style={{
                      position: 'relative', flex: 1, height: 116, borderRadius: 16, textAlign: 'left', padding: '16px 16px 0',
                      background: sel ? 'linear-gradient(170deg, #45337a 0%, #34245f 100%)' : 'rgba(30,18,64,0.45)',
                      border: '1px solid rgba(179,166,196,0.28)', transition: 'background .25s',
                    }}>
                    {sel && (
                      <motion.div layoutId="fd-ring" transition={{ type: 'spring', stiffness: 520, damping: 30 }}
                        style={{
                          position: 'absolute', inset: -1, borderRadius: 16, pointerEvents: 'none',
                          border: '2px solid #efe6d6',
                          boxShadow: '0 0 22px rgba(239,230,214,0.25), inset 0 0 18px rgba(239,230,214,0.08)',
                        }} />
                    )}
                    {pl.id === 'founding' && (
                      <motion.div
                        initial={{ scale: 0, rotate: -12 }} animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 14, delay: 1.15 }}
                        style={{
                          position: 'absolute', top: -13, left: 12, height: 24, padding: '0 10px', borderRadius: 999,
                          display: 'grid', placeItems: 'center', background: '#e6f0d6', color: '#1e1240',
                          fontSize: 11.5, fontWeight: 600, boxShadow: '0 0 14px rgba(127,216,176,0.35)',
                        }}>3 days free</motion.div>
                    )}
                    <div style={{ opacity: sel ? 1 : 0.55, transition: 'opacity .25s' }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--label-1)' }}>{pl.name}</div>
                      <div className="serif italic" style={{ fontSize: 25, marginTop: 4, lineHeight: 1.1, color: 'var(--label-1)' }}>{pl.price}</div>
                      <div style={{ fontSize: 12.5, marginTop: 6, color: 'var(--label-1)' }}>{pl.l1}</div>
                      <div style={{ fontSize: 11, marginTop: 5, color: 'var(--label-2)' }}>Regular <s>{pl.was}</s></div>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* scrim behind the CTA, like the Figma */}
            <div style={{ position: 'absolute', left: 0, right: 0, top: 716, bottom: 0, background: 'linear-gradient(180deg, rgba(11,6,32,0) 0%, rgba(11,6,32,0.55) 30%)', pointerEvents: 'none' }} />

            <motion.button className="chrome-cta" {...fade(1)}
              whileHover={{ scale: 1.015, boxShadow: '0 0 44px rgba(248,237,255,0.55), inset 0 1px 0 rgba(255,255,255,0.9)' }}
              whileTap={{ scale: 0.95 }}
              onClick={claim}
              style={{ position: 'absolute', left: 20, top: 724, width: 350, height: 58, fontSize: 20, overflow: 'hidden' }}>
              <motion.span aria-hidden
                animate={{ x: [-200, 400] }} transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.6, ease: 'easeInOut', delay: 1.8 }}
                style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 70, background: 'linear-gradient(100deg, transparent, rgba(255,255,255,0.85), transparent)', pointerEvents: 'none' }} />
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={plan} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.16 }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  {founding ? 'Lock in $88.88 a year' : 'Start 3 days free'} <span className="spark">✦</span>
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <motion.div {...fade(1.1)} style={{ position: 'absolute', top: 796, left: 0, right: 0, textAlign: 'center', fontSize: 11.5, color: 'var(--label-3)' }}>
              {founding ? '3 days free, then $88.88 a year.' : '3 days free, then $14.44 a month.'} Restore purchases · Terms
            </motion.div>
          </motion.div>
        )}

        {phase === 'claimed' && (
          <motion.div key="claimed" style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
            <motion.div {...fade(1.2)} className="eyebrow" style={{ position: 'absolute', top: 76, left: 0, right: 0, textAlign: 'center', color: '#f2c75c' }}>
              Welcome to Align+
            </motion.div>

            {/* the card stamps down */}
            <motion.div
              initial={{ opacity: 0, scale: 2.3, rotate: -14, y: -40 }}
              animate={{ opacity: 1, scale: 1, rotate: -3, y: 0 }}
              transition={{
                opacity: { duration: 0.12, delay: 0.1 },
                default: { type: 'spring', stiffness: 520, damping: 22, mass: 0.9, delay: 0.1 },
              }}
              style={{ position: 'absolute', left: CX - 118, top: CY - 158, width: 236, height: 316 }}>
              <motion.div animate={{ y: [0, -6, 0], rotate: [0, 1.4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}>
                <FoundingCard title={founding ? 'Founding member' : 'Align+ member'} />
              </motion.div>
            </motion.div>

            <motion.h1 {...fade(1.0)} className="h-display" style={{ position: 'absolute', top: 452, left: 0, right: 0, textAlign: 'center', fontSize: 36 }}>
              The stars, unrationed.
            </motion.h1>
            <motion.p {...fade(1.1)} style={{ position: 'absolute', top: 500, left: 34, right: 34, textAlign: 'center', fontSize: 15, lineHeight: 1.45, color: 'var(--label-2)' }}>
              {founding
                ? 'Three days free, then $88.88 a year — the launch price, locked for as long as you stay.'
                : 'Three days free, then $14.44 a month. Cancel any time — your chart stays yours.'}
            </motion.p>

            <div style={{ position: 'absolute', top: 584, left: 24, right: 24, display: 'flex', justifyContent: 'space-between' }}>
              {PERKS.map((pk, i) => (
                <motion.div key={pk} {...fade(1.25 + i * 0.18)}
                  style={{ width: 106, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9 }}>
                  <CheckStamp delay={1.35 + i * 0.18} size={24} />
                  <span style={{ fontSize: 12.5, lineHeight: 1.3, color: 'var(--label-1)', textAlign: 'center', whiteSpace: 'pre-line' }}>{pk}</span>
                </motion.div>
              ))}
            </div>

            <motion.button className="chrome-cta" {...fade(1.8)}
              whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.95 }}
              onClick={() => { sfx.align(); go('dealing') }}
              style={{ position: 'absolute', left: 20, top: 712, width: 350, height: 58, fontSize: 20 }}>
              Deal my first deck <span className="spark">✦</span>
            </motion.button>
            <motion.div {...fade(1.9)} style={{ position: 'absolute', top: 788, left: 0, right: 0, textAlign: 'center', fontSize: 11.5, color: 'var(--label-3)' }}>
              Your launch price is locked while you stay · Your chart stays yours
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Burst x={burst.x} y={burst.y} fireKey={burst.k} power={burst.p} />
      <ConfettiCanvas canvasRef={canvasRef} />
    </motion.div>
  )
}
