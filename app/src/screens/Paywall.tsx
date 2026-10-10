import { useEffect, useRef, useState } from 'react'
import { talk } from '../lib/talk'
import { AnimatePresence, motion } from 'framer-motion'
import type { ScreenProps } from './types'
import Backdrop from '../components/paywall/Backdrop'
import Portal from '../components/paywall/Portal'
import { CheckStamp, Chevron, CloseX } from '../components/paywall/bits'
import Burst from '../components/reveal/Burst'
import { ConfettiCanvas, useConfetti } from '../components/reveal/useConfetti'
import { session } from '../lib/session'
import { sfx } from '../lib/sfx'

type PlanId = 'yearly' | 'monthly'
type Phase = 'offer' | 'flare' | 'active'

const PLANS: { id: PlanId; label: string; price: string; per: string; note: string; then: string; word: string }[] = [
  // regular prices (the pricing sheet); the launch promo is offered once, at the end of onboarding
  { id: 'yearly', label: 'Yearly', price: '$122.22', per: '/yr', note: 'save 56% · best', then: 'then $122.22 / yr', word: 'a year' },
  { id: 'monthly', label: 'Monthly', price: '$23.33', per: '/mo', note: 'cancel any time', then: 'then $23.33 / mo', word: 'a month' },
]

const RAINBOW = ['#e8463c', '#ef8f56', '#f2d45c', '#7fd36a', '#4fb3ef', '#a77de9']

const BENEFITS = [
  { t: '45 cards a night', s: 'free stops at fifteen · next deal at 11:11' },
  { t: '33 peeks a week', s: 'free is three a day' },
  { t: '3 packs a day + 3 real packs a season', s: 'a starter box when you join · shipped 4× a year' },
  { t: 'Block any sign · private Align events', s: 'gone from every deck, for good' },
]

/** portal geometry */
const PW = 100
const PH = 136
const PX = 145
const PY = 268
const PCX = PX + PW / 2
const PCY = PY + PH / 2
const ACTIVE_Y = -128
const ACTIVE_S = 1.18

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease: [0.2, 0.8, 0.2, 1] as const },
})

/** S-11 — Align+ paywall, then S-12 trial active. */
export default function Paywall({ go }: ScreenProps) {
  const [plan, setPlan] = useState<PlanId>('yearly')
  const [phase, setPhase] = useState<Phase>('offer')
  const [burst, setBurst] = useState(0)
  const { canvasRef, fire } = useConfetti()
  const timers = useRef<number[]>([])
  const p = PLANS.find((x) => x.id === plan)!

  useEffect(() => {
    const t = window.setTimeout(() => sfx.sparkle(), 450)
    const ts = timers.current
    return () => { clearTimeout(t); ts.forEach(clearTimeout) }
  }, [])

  const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)) }

  const start = () => {
    if (phase !== 'offer') return
    sfx.tap()
    setPhase('flare')
    session.patch({ alignPlus: true })
    talk.grantOnce('alignplus', 'afterdark')
    later(() => {
      sfx.match()
      setBurst((k) => k + 1)
      fire({ x: PCX / 390, y: PCY / 844, power: 1 })
    }, 260)
    later(() => setPhase('active'), 1150)
    later(() => {
      BENEFITS.forEach((_, i) => later(() => sfx.peekTick(0.25 + i * 0.22), i * 170))
      later(() => sfx.sparkle(), BENEFITS.length * 170 + 120)
    }, 1150 + 650)
  }

  const pick = (id: PlanId) => {
    if (id === plan) return
    sfx.tap()
    setPlan(id)
  }

  const leave = () => { sfx.tap(); go('deck') }

  const portalAnim =
    phase === 'offer' ? { y: 0, scale: 1 }
      : phase === 'flare' ? { y: -6, scale: 1.42 }
        : { y: ACTIVE_Y, scale: ACTIVE_S }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Backdrop seed={44} />

      {/* the portal — shared between offer and trial states */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 10 }}
        animate={{ opacity: 1, ...portalAnim }}
        transition={phase === 'flare'
          ? { type: 'spring', stiffness: 260, damping: 13 }
          : phase === 'active'
            ? { type: 'spring', stiffness: 120, damping: 18 }
            : { delay: 0.35, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ position: 'absolute', left: PX, top: PY, width: PW, height: PH, zIndex: 2 }}>
        <motion.div animate={phase === 'offer' ? { y: [0, -4, 0] } : { y: 0 }}
          transition={phase === 'offer' ? { duration: 5, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}>
          <Portal w={PW} h={PH} flare={phase === 'flare'} lit={phase === 'active'} />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {phase === 'offer' && (
          <motion.div key="offer" style={{ position: 'absolute', inset: 0, zIndex: 3 }}
            exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.35, ease: 'easeIn' } }}>
            <Chevron onClick={leave} />
            <motion.button {...fade(0.05)} onClick={leave} whileHover={{ color: '#efe6d6' }}
              style={{ position: 'absolute', right: 14, top: 58, height: 36, padding: '0 12px', fontSize: 15, color: 'var(--label-2)' }}>
              Not now
            </motion.button>

            <motion.div {...fade(0.1)} className="eyebrow" style={{ position: 'absolute', top: 104, left: 0, right: 0, textAlign: 'center', letterSpacing: '0.2em', color: 'var(--label-3)' }}>
              Your deck is dealt
            </motion.div>
            <motion.h1 {...fade(0.18)} className="h-display" style={{ position: 'absolute', top: 120, left: 20, right: 20, textAlign: 'center', fontSize: 34, lineHeight: 1.08 }}>
              Three people are already<br />in your orbit.
            </motion.h1>
            <motion.p {...fade(0.26)} className="serif" style={{ position: 'absolute', top: 196, left: 36, right: 36, textAlign: 'center', fontSize: 18, lineHeight: 1.4, color: 'var(--label-2)' }}>
              Free is fifteen cards a night. Align+ deals you forty-five.
            </motion.p>

            {/* plans */}
            <div style={{ position: 'absolute', top: 440, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 10 }}>
              {PLANS.map((pl, i) => {
                const sel = pl.id === plan
                const best = pl.id === 'yearly'
                return (
                  <motion.button key={pl.id}
                    initial={{ opacity: 0, y: 26, scale: 0.92 }}
                    animate={{ opacity: 1, y: sel ? -4 : 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 20, delay: 0.5 + i * 0.07 }}
                    whileHover={{ y: sel ? -6 : -3 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => pick(pl.id)}
                    style={{
                      position: 'relative', width: 140, height: 98, borderRadius: 14,
                      background: sel ? 'linear-gradient(180deg, #33245f 0%, #241848 100%)' : 'rgba(30,18,64,0.72)',
                      border: '1px solid rgba(179,166,196,0.22)',
                      transition: 'background .25s',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 15, lineHeight: 1,
                    }}>
                    {sel && (
                      <motion.div layoutId="pw-ring" transition={{ type: 'spring', stiffness: 520, damping: 30 }}
                        style={{
                          position: 'absolute', inset: -1, borderRadius: 14, pointerEvents: 'none',
                          border: '1.5px solid #f2c75c',
                          boxShadow: '0 0 18px rgba(242,199,92,0.35), inset 0 0 14px rgba(242,199,92,0.12)',
                        }} />
                    )}
                    {best && (
                      <div className="mono" style={{
                        position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap',
                        height: 18, padding: '0 9px', borderRadius: 999, display: 'grid', placeItems: 'center',
                        background: 'linear-gradient(90deg, #c99a3c 0%, #f2c75c 25%, #fff1c4 50%, #f2c75c 75%, #c99a3c 100%)', backgroundSize: '200% 100%', animation: 'foil-sweep 3s linear infinite',
                        color: '#3a2c10', fontSize: 7.5, fontWeight: 700, letterSpacing: '0.14em',
                        boxShadow: '0 0 12px rgba(242,199,92,0.5)',
                      }}>3 DAYS FREE</div>
                    )}
                    <span className="mono" style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: sel ? '#f2c75c' : 'var(--label-3)' }}>{pl.label}</span>
                    <span className="serif" style={{ fontSize: 23, marginTop: 6, lineHeight: 1, color: 'var(--label-1)' }}>{pl.price}</span>
                    <span className="serif" style={{ fontSize: 13, marginTop: 4, color: 'var(--label-2)' }}>{pl.per}</span>
                    <span className="mono" style={{ fontSize: 7.5, letterSpacing: '0.04em', marginTop: 9, color: best ? '#f2c75c' : 'var(--label-3)', fontWeight: best ? 700 : 400 }}>{pl.note}</span>
                  </motion.button>
                )
              })}
            </div>

            <motion.div {...fade(0.75)} className="mono" style={{ position: 'absolute', top: 556, left: 0, right: 0, textAlign: 'center', fontSize: 7.5, letterSpacing: '0.1em', color: 'var(--label-3)' }}>
              3 DAYS FREE · CANCEL ANY TIME · YOUR CHART STAYS YOURS
            </motion.div>

            {/* rainbow progress */}
            <div style={{ position: 'absolute', top: 594, left: 38, width: 314, display: 'flex', gap: 7 }}>
              {RAINBOW.map((c, i) => (
                <motion.div key={c}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: [0.75, 1, 0.75] }}
                  transition={{
                    scaleX: { delay: 0.8 + i * 0.08, duration: 0.4, ease: 'easeOut' },
                    opacity: { delay: 1.3 + i * 0.18, duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  style={{ flex: 1, height: 3, borderRadius: 2, background: c, boxShadow: `0 0 8px ${c}aa`, transformOrigin: 'left' }} />
              ))}
            </div>

            <motion.button className="chrome-cta" {...fade(0.85)}
              whileHover={{ scale: 1.02, boxShadow: '0 0 44px rgba(248,237,255,0.55), inset 0 1px 0 rgba(255,255,255,0.9)' }}
              whileTap={{ scale: 0.95 }}
              onClick={start}
              style={{ position: 'absolute', left: 38, top: 630, fontSize: 20, overflow: 'hidden' }}>
              <motion.span aria-hidden
                animate={{ x: [-200, 360] }} transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.6, ease: 'easeInOut', delay: 1.6 }}
                style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 70, background: 'linear-gradient(100deg, transparent, rgba(255,255,255,0.85), transparent)', pointerEvents: 'none' }} />
              Start 3 days free <span className="spark">✦</span>
            </motion.button>

            <motion.button {...fade(0.95)} onClick={leave} whileHover={{ color: '#efe6d6' }}
              style={{ position: 'absolute', top: 704, left: 0, right: 0, margin: '0 auto', width: 260, height: 32, fontSize: 15, color: 'var(--label-2)' }}>
              Maybe later — deal me in free
            </motion.button>
            <motion.div {...fade(1)} style={{ position: 'absolute', top: 744, left: 0, right: 0, textAlign: 'center', fontSize: 11, color: 'var(--label-4)' }}>
              <AnimatePresence mode="wait">
                <motion.span key={p.then} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.18 }}
                  style={{ display: 'inline-block' }}>{p.then}</motion.span>
              </AnimatePresence>
              <span style={{ margin: '0 7px' }}>·</span>Restore purchase<span style={{ margin: '0 7px' }}>·</span>Terms
            </motion.div>
          </motion.div>
        )}

        {phase === 'active' && (
          <motion.div key="active" style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
            <CloseX side="right" onClick={leave} />
            <motion.div {...fade(0.15)} className="eyebrow" style={{ position: 'absolute', top: 100, left: 0, right: 0, textAlign: 'center', color: '#f2c75c' }}>
              Align+ is lit · Day 1 of 7
            </motion.div>

            <motion.h1 {...fade(0.3)} className="h-display" style={{ position: 'absolute', top: 318, left: 20, right: 20, textAlign: 'center', fontSize: 36 }}>
              The whole sky is yours.
            </motion.h1>
            <motion.p {...fade(0.4)} className="serif" style={{ position: 'absolute', top: 362, left: 30, right: 30, textAlign: 'center', fontSize: 18, color: 'var(--label-2)' }}>
              Three days on us. Then {p.price} {p.word}.
            </motion.p>

            <motion.div {...fade(0.5)} style={{
              position: 'absolute', top: 404, left: 28, right: 28, borderRadius: 18, padding: '6px 16px',
              background: 'rgba(30,18,64,0.6)', border: '1px solid rgba(242,199,92,0.18)',
            }}>
              {BENEFITS.map((b, i) => (
                <motion.div key={b.t}
                  initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.65 + i * 0.17, duration: 0.4, ease: 'easeOut' }}
                  style={{ display: 'flex', alignItems: 'center', gap: 13, height: 46, borderTop: i ? '1px solid rgba(179,166,196,0.1)' : 'none' }}>
                  <CheckStamp delay={0.65 + i * 0.17} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontSize: 15, color: 'var(--label-1)', fontWeight: 500 }}>{b.t}</span>
                    <span style={{ fontSize: 11.5, color: 'var(--label-3)' }}>{b.s}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* trial timeline */}
            <motion.div {...fade(1.3)} style={{ position: 'absolute', top: 618, left: 30, right: 30 }}>
              <div style={{ position: 'absolute', top: 5, left: 46, right: 46, height: 1, background: 'rgba(179,166,196,0.35)' }} />
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 0.14 }} transition={{ delay: 1.6, duration: 0.6 }}
                style={{ position: 'absolute', top: 5, left: 46, right: 46, height: 1, background: '#f2c75c', transformOrigin: 'left' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {[
                  ['Today', 'Align+ opens'],
                  ['Tomorrow', 'we remind you'],
                  ['In 3 days', `${p.price} renews`],
                ].map(([h, s], i) => (
                  <div key={h} style={{ width: 92, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <motion.span
                      animate={i === 0 ? { scale: [1, 1.35, 1], boxShadow: ['0 0 0px #f2c75c', '0 0 12px #f2c75c', '0 0 0px #f2c75c'] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        width: 11, height: 11, borderRadius: '50%', position: 'relative',
                        background: i === 0 ? '#f2c75c' : 'var(--void)', border: i === 0 ? 'none' : '1.2px solid var(--label-2)',
                      }} />
                    <span className="mono" style={{ marginTop: 10, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: i === 0 ? 'var(--label-1)' : 'var(--label-2)', fontWeight: i === 0 ? 700 : 400 }}>{h}</span>
                    <span style={{ marginTop: 4, fontSize: 12.5, color: 'var(--label-2)' }}>{s}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.button className="chrome-cta" {...fade(1.5)}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}
              onClick={() => { sfx.align(); go('deck') }}
              style={{ position: 'absolute', left: 38, top: 706, fontSize: 20 }}>
              Deal me in <span className="spark">✦</span>
            </motion.button>
            <motion.div {...fade(1.6)} style={{ position: 'absolute', top: 774, left: 0, right: 0, textAlign: 'center', fontSize: 12, color: 'var(--label-3)' }}>
              We nudge you the day before it renews. No ambush.
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Burst x={PCX} y={PCY} fireKey={burst} />
      <ConfettiCanvas canvasRef={canvasRef} />
    </div>
  )
}
