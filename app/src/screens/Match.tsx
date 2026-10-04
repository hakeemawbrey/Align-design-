import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, type Transition } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import { SIGNS } from '../data/signs'
import { DECK, ME } from '../data/profiles'
import { sfx } from '../lib/sfx'
import { session } from '../lib/session'
import AuraOrb from '../components/reveal/AuraOrb'
import Burst from '../components/reveal/Burst'
import Rarity from '../components/reveal/Rarity'
import RevealStyles from '../components/reveal/RevealStyles'
import { ConfettiCanvas, useConfetti } from '../components/reveal/useConfetti'

const HER = DECK.find((p) => p.id === 'j27')!
const MINE = SIGNS[ME.sign]
const HERS = SIGNS[HER.sign]

/** collision point, phone px */
const CX = 195
const CY = 336
const ORB_W = 196
const ORB_H = 214

/**
 * Stages
 * 0 enter   — orbs drift in from the sides
 * 1 charge  — they hover, brighten, lean in
 * 2 slam    — accelerate into each other
 * 3 burst   — flash, shockwave, confetti, sfx.match; orbs spring apart to rest
 * 4 settled — copy + CTA
 */
const OFFSET = [118, 96, 20, 60, 60]
const ORB_T: Transition[] = [
  { duration: 1.45, ease: [0.16, 1, 0.3, 1] },
  { duration: 0.55, ease: 'easeInOut' },
  { duration: 0.24, ease: [0.55, 0, 1, 0.45] },
  { type: 'spring', stiffness: 130, damping: 12 },
  { type: 'spring', stiffness: 130, damping: 12 },
]
const AT = { charge: 1450, slam: 2000, burst: 2240, settle: 2600 }

export default function Match({ go }: ScreenProps) {
  useEffect(() => { session.patch({ unseenMatch: true }) }, [])
  const [stage, setStage] = useState(0)
  const [skipped, setSkipped] = useState(false)
  const [burstKey, setBurstKey] = useState(0)
  const fired = useRef(false)
  const timers = useRef<number[]>([])
  const { canvasRef, fire } = useConfetti()

  const boom = useCallback(() => {
    if (fired.current) return
    fired.current = true
    setBurstKey((k) => k + 1)
    sfx.match()
    fire({ x: CX / 390, y: CY / 844, power: 1 })
  }, [fire])

  useEffect(() => {
    const T = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms))
    T(AT.charge, () => setStage(1))
    T(AT.slam, () => setStage(2))
    T(AT.burst, () => { setStage(3); boom() })
    T(AT.settle, () => setStage(4))
    return () => { timers.current.forEach(clearTimeout); timers.current = [] }
  }, [boom])

  const skip = () => {
    if (stage >= 4) return
    timers.current.forEach(clearTimeout)
    timers.current = []
    setSkipped(true)
    setStage(4)
    boom()
  }

  const settled = stage >= 4
  const orbT: Transition = skipped ? { type: 'spring', stiffness: 160, damping: 16 } : ORB_T[stage]
  const charge = stage === 1 ? 0.6 : stage === 2 ? 1 : stage === 3 ? 0.8 : 0.25

  // copy reveal helper
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: settled ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { duration: 0.7, delay: skipped ? delay * 0.3 : delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }} onClick={skip}>
      <RevealStyles />
      <Starfield count={80} aurora="#3b1f86" warm="#4a2a6a" seed={17} />

      {/* the void deepens until the collision, then the room lights up */}
      <motion.div
        initial={{ opacity: 0.85 }}
        animate={{ opacity: stage >= 3 ? 0 : 0.6 }}
        transition={{ duration: 1.2 }}
        style={{ position: 'absolute', inset: 0, background: 'var(--void)', pointerEvents: 'none' }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 3 ? 1 : 0 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        style={{
          position: 'absolute', left: -40, right: -40, top: CY - 260, height: 520, pointerEvents: 'none',
          background: `radial-gradient(45% 45% at 50% 50%, rgba(154,123,224,0.22) 0%, rgba(225,99,214,0.08) 45%, transparent 75%)`,
        }}
      />

      {/* orbs */}
      {[{ sign: MINE, dir: -1, ph: 0 }, { sign: HERS, dir: 1, ph: 1.1 }].map(({ sign, dir, ph }) => (
        <motion.div
          key={sign.id}
          initial={{ x: dir * 330, opacity: 0, scale: 0.78 }}
          animate={{
            x: dir * OFFSET[stage],
            opacity: 1,
            scale: stage === 2 ? 1.06 : stage === 3 && !skipped ? [1.2, 1] : 1,
            rotate: stage === 1 ? dir * -3 : 0,
          }}
          transition={{ ...orbT, opacity: { duration: 1 }, scale: { duration: stage === 3 ? 0.8 : 0.4, ease: 'easeOut' }, rotate: { duration: 0.6 } }}
          style={{
            position: 'absolute', left: CX - ORB_W / 2, top: CY - ORB_H / 2, width: ORB_W, height: ORB_H,
            mixBlendMode: 'screen', zIndex: 2, willChange: 'transform',
          }}
        >
          <AuraOrb sign={sign} charge={charge} phase={ph} />
        </motion.div>
      ))}

      {/* tether of light while they charge */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={stage === 1 || stage === 2 ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: stage >= 3 ? 1.6 : 0 }}
        transition={{ duration: stage >= 3 ? 0.25 : 0.6 }}
        style={{
          position: 'absolute', left: CX - 110, top: CY - 1, width: 220, height: 2, zIndex: 3, pointerEvents: 'none',
          background: `linear-gradient(90deg, transparent, ${MINE.light}, #fff, ${HERS.light}, transparent)`,
          filter: 'blur(1px)', boxShadow: '0 0 12px #fff4cf',
        }}
      />

      <Burst x={CX} y={CY} fireKey={burstKey} />
      <ConfettiCanvas canvasRef={canvasRef} />

      {/* game layer */}
      <Rarity show={stage >= 3} instant={skipped} pull={HER.pull} />

      {/* labels under orbs */}
      <motion.div {...rise(0)} style={{ position: 'absolute', top: 464, left: 0, right: 0, height: 14, zIndex: 5 }}>
        <span className="eyebrow" style={{ position: 'absolute', left: CX - 60, transform: 'translateX(-50%)', fontSize: 9, color: 'var(--label-3)' }}>You</span>
        <span className="eyebrow" style={{ position: 'absolute', left: CX + 60, transform: 'translateX(-50%)', fontSize: 9, color: 'var(--label-3)' }}>{HER.name}</span>
      </motion.div>

      <motion.div {...rise(0.1)} className="eyebrow" style={{ position: 'absolute', top: 501, left: 0, right: 0, textAlign: 'center', zIndex: 5, fontSize: 9.5 }}>
        Mutual align · five of seven centres
      </motion.div>

      <motion.h1 {...rise(0.22)} className="h-display" style={{ position: 'absolute', top: 526, left: 0, right: 0, textAlign: 'center', fontSize: 34, zIndex: 5 }}>
        You both aligned.
      </motion.h1>

      <motion.p
        {...rise(0.38)}
        style={{
          position: 'absolute', top: 582, left: 44, right: 44, textAlign: 'center', zIndex: 5,
          fontFamily: 'var(--serif)', fontSize: 17.5, lineHeight: '27px', color: 'var(--label-2)',
        }}
      >
        You have both been ruthless all week. The ruthlessness is over now, and one of you has to speak first.
      </motion.p>

      <motion.div {...rise(0.55)} style={{ position: 'absolute', top: 700, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 6, pointerEvents: settled ? 'auto' : 'none' }}>
        <button
          className="chrome-cta rv-cta"
          onClick={(e) => { e.stopPropagation(); sfx.tap(); go('reveal') }}
        >
          Say something <span className="spark">✦</span>
        </button>
      </motion.div>

      <motion.div {...rise(0.7)} style={{ position: 'absolute', top: 782, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 6, pointerEvents: settled ? 'auto' : 'none' }}>
        <button
          className="rv-link"
          onClick={(e) => { e.stopPropagation(); sfx.tap(); go('deck') }}
          style={{ fontFamily: 'var(--sans)', fontSize: 14.5, padding: '4px 10px' }}
        >
          Keep dealing — she waits in matches
        </button>
      </motion.div>
    </div>
  )
}
