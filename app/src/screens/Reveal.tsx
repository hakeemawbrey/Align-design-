import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import { DECK } from '../data/profiles'
import { SIGNS } from '../data/signs'
import { sfx } from '../lib/sfx'
import CardBack from '../components/reveal/CardBack'
import ProfileFace from '../components/reveal/ProfileFace'
import Burst from '../components/reveal/Burst'
import RevealStyles from '../components/reveal/RevealStyles'
import { ConfettiCanvas, useConfetti } from '../components/reveal/useConfetti'

const HER = DECK.find((p) => p.id === 'j27')!
const SIGN = SIGNS[HER.sign]

// card geometry (phone px) — matches S-08
const CARD = { x: 16, y: 90, w: 358, h: 625 }
const CENTER = { x: CARD.x + CARD.w / 2, y: CARD.y + CARD.h / 2 }
const PHOTO_CY = CARD.y + 1.5 + 54 + 108

const AUTO_FLIP_MS = 1850
const TILT = 8

const face: React.CSSProperties = {
  position: 'absolute', inset: 0,
  backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
  transformStyle: 'flat',
}

export default function Reveal({ go }: ScreenProps) {
  const [lit, setLit] = useState(0)
  const [flipping, setFlipping] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const [lift, setLift] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [burstKey, setBurstKey] = useState(0)
  const timers = useRef<number[]>([])
  const { canvasRef, fire } = useConfetti()

  // ---- holographic tilt -------------------------------------------------
  const hovering = useRef(false)
  const rxT = useMotionValue(0)
  const ryT = useMotionValue(0)
  const rx = useSpring(rxT, { stiffness: 160, damping: 18, mass: 0.6 })
  const ry = useSpring(ryT, { stiffness: 160, damping: 18, mass: 0.6 })
  const glare = useSpring(0.25, { stiffness: 120, damping: 20 })
  // highlight position follows the tilt (so idle sway moves it too)
  const mx = useTransform(ry, [-TILT, TILT], [10, 90])
  const my = useTransform(rx, [TILT, -TILT], [10, 90])
  const spec = useMotionTemplate`radial-gradient(circle at ${mx}% ${my}%, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.08) 22%, transparent 48%)`
  const foilPos = useMotionTemplate`${mx}% ${my}%`
  const foilOpacity = useTransform(glare, (g) => g * 0.55)

  useAnimationFrame((t) => {
    if (hovering.current || flipping && !flipped) return
    // gentle idle sway so a passive recording still catches the foil
    const s = t / 1000
    ryT.set(Math.sin(s * 0.7) * (flipped ? 2.5 : 5))
    rxT.set(Math.cos(s * 0.55) * (flipped ? 1.5 : 3))
  })

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width))
    const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height))
    hovering.current = true
    ryT.set((px - 0.5) * 2 * TILT)
    rxT.set((0.5 - py) * 2 * TILT)
    glare.set(1)
  }
  const onLeave = () => {
    hovering.current = false
    glare.set(0.25)
  }

  // ---- sequence ---------------------------------------------------------
  const started = useRef(false)
  const flip = useCallback(() => {
    if (started.current) return
    started.current = true
    timers.current.forEach(clearTimeout)
    timers.current = []
    setLit(7)
    setFlipping(true)
    sfx.flip()
  }, [])

  useEffect(() => {
    const T = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms))
    // chakra centres charge root → crown, then the card turns itself
    for (let i = 1; i <= 7; i++) T(380 + i * 165, () => { setLit(i); sfx.peekTick(i / 7) })
    T(AUTO_FLIP_MS, flip)
    return () => { timers.current.forEach(clearTimeout); timers.current = [] }
  }, [flip])

  const onFlipDone = () => {
    if (!flipping || flipped) return
    setFlipped(true)
    setBurstKey((k) => k + 1)
    window.setTimeout(() => { setLift(true); sfx.reveal() }, 260)
  }

  const onPeak = useCallback(() => {
    sfx.sparkle()
    fire({ x: CENTER.x / 390, y: PHOTO_CY / 844, power: 0.45 })
  }, [fire])
  const onDone = useCallback(() => setRevealed(true), [])

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }} onClick={flip}>
      <RevealStyles />
      <Starfield count={70} aurora="#3b1f86" warm="#5a2a6a" seed={23} />

      {/* light behind the card */}
      <motion.div
        animate={{ opacity: flipping && !flipped ? [0.5, 1, 0.7] : flipped ? 0.7 : 0.45, scale: flipped ? 1.05 : 0.92 }}
        transition={{ duration: 1 }}
        style={{
          position: 'absolute', left: CENTER.x - 260, top: CENTER.y - 360, width: 520, height: 720, pointerEvents: 'none',
          background: `radial-gradient(45% 45% at 50% 50%, ${flipped ? SIGN.color : '#7a4ae0'}55 0%, ${flipped ? SIGN.color : '#5b2fb8'}22 45%, transparent 72%)`,
          filter: 'blur(10px)', transition: 'background 1s ease',
        }}
      />

      {/* eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: -8, letterSpacing: '0.1em' }}
        animate={flipped ? { opacity: 1, y: 0, letterSpacing: '0.22em' } : { opacity: 0, y: -8, letterSpacing: '0.1em' }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="eyebrow"
        style={{ position: 'absolute', top: 64, left: 0, right: 0, textAlign: 'center', whiteSpace: 'nowrap', fontSize: 9.5 }}
      >
        <span style={{ color: 'var(--align)' }}>✦</span>&nbsp;&nbsp;You both aligned&nbsp;&nbsp;·&nbsp;&nbsp;Card flipped&nbsp;&nbsp;<span style={{ color: 'var(--align)' }}>✦</span>
      </motion.div>

      {/* the card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ position: 'absolute', left: CARD.x, top: CARD.y, width: CARD.w, height: CARD.h, cursor: flipping ? 'default' : 'pointer', zIndex: 5 }}
      >
        <div style={{ position: 'absolute', inset: 0, perspective: 1500 }}>
          {/* tilt + idle bob */}
          <motion.div
            animate={flipped ? { y: 0 } : { y: [0, -9, 0] }}
            transition={flipped ? { duration: 0.6 } : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0, rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
          >
            {/* flip */}
            <motion.div
              initial={{ rotateY: 0, scale: 0.9 }}
              animate={flipping ? { rotateY: 180, scale: [0.9, 1.07, 1], z: [0, 80, 0] } : { rotateY: 0, scale: 0.9, z: 0 }}
              transition={{ duration: 1.05, ease: [0.55, 0, 0.15, 1], scale: { duration: 1.05, times: [0, 0.5, 1] }, z: { duration: 1.05, times: [0, 0.5, 1] } }}
              onAnimationComplete={onFlipDone}
              style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }}
            >
              {/* back */}
              <div style={face}>
                <CardBack lit={lit} serial={HER.serial} initial={`${HER.initial}, ${HER.age}`} />
                <HoloSheen spec={spec} foilPos={foilPos} foilOpacity={foilOpacity} />
              </div>
              {/* front */}
              <div style={{ ...face, transform: 'rotateY(180deg)' }}>
                <ProfileFace p={HER} shown={flipped} lift={lift} revealed={revealed} onPeak={onPeak} onDone={onDone} />
                <HoloSheen spec={spec} foilPos={foilPos} foilOpacity={foilOpacity} soft />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <Burst x={CENTER.x} y={CENTER.y} fireKey={burstKey} power={0.55} colors={[SIGN.light, '#f2c75c', '#fff4cf', SIGN.color]} />
      <ConfettiCanvas canvasRef={canvasRef} />

      {/* tap hint (face-down) */}
      <motion.div
        animate={{ opacity: flipping ? 0 : 1, y: flipping ? 8 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ position: 'absolute', top: 740, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, pointerEvents: 'none' }}
      >
        <div className="eyebrow" style={{ animation: 'rv-hint 1.6s ease-in-out infinite', color: 'var(--label-1)' }}>
          <span style={{ color: 'var(--align)' }}>✦</span>&nbsp;&nbsp;Tap to flip&nbsp;&nbsp;<span style={{ color: 'var(--align)' }}>✦</span>
        </div>
        <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 15, color: 'var(--label-3)' }}>
          She aligned back. Her card is yours to turn.
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'absolute', top: 732, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 6, pointerEvents: revealed ? 'auto' : 'none' }}
      >
        <button className="chrome-cta rv-cta" onClick={(e) => { e.stopPropagation(); sfx.tap(); go('chat') }}>
          Say the honest thing <span className="spark">✦</span>
        </button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        style={{
          position: 'absolute', top: 798, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8,
          fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--label-3)', zIndex: 6, pointerEvents: revealed ? 'auto' : 'none',
        }}
      >
        <span>Seven days to speak</span>
        <span>·</span>
        <button className="rv-link" onClick={(e) => { e.stopPropagation(); sfx.tap(); go('deck') }} style={{ fontSize: 14, padding: '2px 0' }}>
          not yet, keep her in matches
        </button>
      </motion.div>
    </div>
  )
}

/** Specular highlight + rainbow foil that slide with the tilt. */
function HoloSheen({ spec, foilPos, foilOpacity, soft = false }: {
  spec: ReturnType<typeof useMotionTemplate>
  foilPos: ReturnType<typeof useMotionTemplate>
  foilOpacity: ReturnType<typeof useTransform<number, number>>
  soft?: boolean
}) {
  return (
    <div style={{ position: 'absolute', inset: 0, borderRadius: 24, overflow: 'hidden', pointerEvents: 'none' }}>
      <motion.div
        style={{
          position: 'absolute', inset: 0, opacity: foilOpacity,
          backgroundImage: 'linear-gradient(115deg, transparent 25%, rgba(255,90,210,0.5) 38%, rgba(90,220,255,0.5) 47%, rgba(255,235,110,0.45) 56%, rgba(180,120,255,0.45) 64%, transparent 76%)',
          backgroundSize: '260% 260%', backgroundPosition: foilPos,
          mixBlendMode: soft ? 'soft-light' : 'color-dodge',
        }}
      />
      <motion.div style={{ position: 'absolute', inset: 0, backgroundImage: spec, mixBlendMode: 'overlay', opacity: soft ? 0.8 : 1 }} />
    </div>
  )
}
