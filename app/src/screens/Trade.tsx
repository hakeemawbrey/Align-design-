import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import TradeCard, { TradeCardBack, TC_H, type TradeCardData } from '../components/binder/TradeCard'
import Burst from '../components/reveal/Burst'
import { useConfetti, ConfettiCanvas } from '../components/reveal/useConfetti'
import { MATCHES, TRADE_UNLOCK_DAYS } from '../data/matches'
import { ME } from '../data/profiles'
import { SIGNS } from '../data/signs'
import { binder, useBinder } from '../lib/binder'
import { sfx } from '../lib/sfx'
import { copyOf } from './Matches'

type Phase = 'idle' | 'swap' | 'flip' | 'done'

const THEIR_W = 150
const THEIR_TOP = 200
const MY_W = 168
const MY_TOP = 456

const POSS = { he: 'his', she: 'her', they: 'their' } as const

export default function Trade({ go }: ScreenProps) {
  const { tradingWith } = useBinder()
  const them = MATCHES.find((m) => m.id === tradingWith) ?? MATCHES[1]
  const sign = SIGNS[them.sign]
  const poss = POSS[them.pronoun]
  const [phase, setPhase] = useState<Phase>('idle')
  const [flash, setFlash] = useState(0)
  const timers = useRef<number[]>([])
  const { canvasRef, fire } = useConfetti()

  const mine: TradeCardData = {
    name: ME.name, age: ME.age, sign: ME.sign, img: ME.photo, serial: ME.serial,
    copyFor: them.name, moon: ME.moon,
  }

  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)) }

  const trade = () => {
    if (phase !== 'idle') return
    setPhase('swap')
    sfx.release()
    later(() => { setFlash((f) => f + 1); sfx.sparkle() }, 330)
    later(() => { setPhase('flip'); sfx.flip() }, 900)
    later(() => {
      sfx.reveal()
      fire({ x: 0.5, y: 0.4, power: 0.9 })
      binder.completeTrade(them.id)
    }, 1500)
    later(() => setPhase('done'), 1900)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (phase === 'idle') trade(); else if (phase === 'done') go('matches') }
      if (e.key === 'Escape') go('matches')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const swapped = phase !== 'idle'
  const flipped = phase === 'flip' || phase === 'done'
  const done = phase === 'done'

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora={sign.color} warm={SIGNS[ME.sign].color} count={70} seed={44} />

      <button onClick={() => { sfx.tap(); go('matches') }} style={{ position: 'absolute', left: 18, top: 58, width: 36, height: 36, zIndex: 20, display: 'grid', placeItems: 'center', color: 'var(--label-1)' }}>
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 2 2 10l8 8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      {/* copy */}
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div key="before" exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} style={{ position: 'absolute', top: 64, left: 0, right: 0, textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, letterSpacing: '0.1em' }} animate={{ opacity: 1, letterSpacing: '0.26em' }} transition={{ duration: 0.8 }}
              className="mono" style={{ fontSize: 10, color: 'var(--align)' }}>
              ✦ DAY {them.day} · TRADE UNLOCKED ✦
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="h-display" style={{ fontSize: 32, marginTop: 14 }}>
              Trade cards with {them.name}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="serif" style={{ fontSize: 15.5, color: 'var(--label-2)', marginTop: 8, padding: '0 44px', lineHeight: 1.35 }}>
              {TRADE_UNLOCK_DAYS} days aligned. Swap a copy of your card, and each one lives in the other’s binder.
            </motion.div>
          </motion.div>
        ) : (
          <motion.div key="after" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ position: 'absolute', top: 64, left: 0, right: 0, textAlign: 'center' }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: '0.26em', color: 'var(--align)' }}>✦ TRADED · DAY {them.day} ✦</div>
            <div className="h-display" style={{ fontSize: 32, marginTop: 14 }}>{them.name} is in your binder.</div>
            <div className="serif" style={{ fontSize: 15.5, color: 'var(--label-2)', marginTop: 8 }}>And you’re in {poss}.</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* their copy: arrives face-down, crosses yours, flips face-up */}
      <motion.div
        initial={{ y: -40, opacity: 0, rotate: -4 }}
        animate={
          !swapped ? { y: [0, -6, 0], opacity: 1, rotate: -2, scale: 1 }
            : { y: 96, opacity: 1, rotate: 0, scale: 1.42 }
        }
        transition={!swapped
          ? { y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 0.5 }, rotate: { duration: 0.5 } }
          : { type: 'spring', stiffness: 120, damping: 16 }}
        style={{ position: 'absolute', left: 195 - THEIR_W / 2, top: THEIR_TOP, width: THEIR_W, height: TC_H * (THEIR_W / 200), zIndex: 5, perspective: 900 }}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.3, 0.9, 0.3, 1] }}
          style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
        >
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
            <TradeCardBack width={THEIR_W} label={them.name} />
          </div>
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <TradeCard card={copyOf(them)} width={THEIR_W} />
            <AnimatePresence>
              {done && (
                <motion.div initial={{ scale: 2.4, opacity: 0, rotate: -24 }} animate={{ scale: 1, opacity: 1, rotate: -12 }} transition={{ type: 'spring', stiffness: 380, damping: 16 }}
                  className="mono" style={{
                    position: 'absolute', right: -14, top: 92, padding: '4px 8px', borderRadius: 6, fontSize: 8, letterSpacing: '0.2em', fontWeight: 700,
                    color: 'var(--chrome-ink)', background: 'var(--chrome)', boxShadow: '0 0 16px rgba(248,237,255,0.6)',
                  }}>
                  TRADED ✦
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>

      {!swapped && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="serif italic" style={{ position: 'absolute', top: THEIR_TOP + TC_H * (THEIR_W / 200) + 12, width: '100%', textAlign: 'center', fontSize: 14.5, color: 'var(--label-2)' }}>
          {them.name} already sent {poss} copy.
        </motion.div>
      )}

      {/* your copy: drag it up to send */}
      <AnimatePresence>
        {phase !== 'flip' && phase !== 'done' && (
          <motion.div
            key="mine"
            drag={phase === 'idle' ? 'y' : false}
            dragConstraints={{ top: -260, bottom: 0 }}
            dragElastic={0.25}
            dragSnapToOrigin
            onDragEnd={(_, info) => { if (info.offset.y < -110 || info.velocity.y < -500) trade() }}
            onTap={() => { if (phase === 'idle') sfx.tap() }}
            initial={{ y: 140, opacity: 0 }}
            animate={phase === 'swap' ? { y: -420, scale: 0.5, rotate: -8, opacity: 0.2 } : { y: 0, opacity: 1, scale: 1, rotate: 1.5 }}
            exit={{ opacity: 0 }}
            transition={phase === 'swap' ? { duration: 0.75, ease: [0.5, 0, 0.3, 1] } : { type: 'spring', stiffness: 160, damping: 18, delay: 0.2 }}
            whileDrag={{ scale: 1.05, rotate: 0 }}
            style={{ position: 'absolute', left: 195 - MY_W / 2, top: MY_TOP, zIndex: 8, cursor: phase === 'idle' ? 'grab' : 'default', touchAction: 'none' }}
          >
            <TradeCard card={mine} width={MY_W} />
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 9 }}>
        {flash > 0 && <Burst x={195} y={360} fireKey={flash} power={0.8} />}
      </div>

      {/* bottom */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 34, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, zIndex: 12 }}>
        <AnimatePresence mode="wait">
          {phase === 'idle' && (
            <motion.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: [0.5, 1, 0.5], y: [0, -3, 0] }} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ duration: 1.8, repeat: Infinity }}
              className="mono" style={{ fontSize: 9.5, letterSpacing: '0.22em', color: 'var(--label-2)' }}>
              ↑ DRAG YOUR CARD UP TO SEND IT
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {phase === 'idle' && (
            <motion.button key="trade" className="chrome-cta" onClick={trade} exit={{ opacity: 0, y: 10 }}>
              Trade copies <span className="spark">✦</span>
            </motion.button>
          )}
          {done && (
            <motion.button key="binder" className="chrome-cta" onClick={() => { sfx.tap(); go('matches') }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              Put it in your binder <span className="spark">✦</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <ConfettiCanvas canvasRef={canvasRef} z={30} />
    </div>
  )
}
