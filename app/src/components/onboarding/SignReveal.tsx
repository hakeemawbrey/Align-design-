import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useAnimationFrame, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { SIGNS } from '../../data/signs'
import { ME } from '../../data/profiles'
import { sfx } from '../../lib/sfx'
import CardBack from '../intro/CardBack'
import Burst from '../reveal/Burst'
import { ConfettiCanvas, useConfetti } from '../reveal/useConfetti'
import { Caption, Cta, EASE, rise } from './shared'
import { ART_GLOW, SIGN_READING, modality, sunSign, type BirthDate } from './zodiac'

const W = 200
const H = 300
/** card centre while charging, and after it settles under the copy */
const CHARGE_C = { x: 195, y: 392 }
const SETTLE_C = { x: 195, y: 462 }
const SETTLE_SCALE = 0.79

const CHARGE_MS = 1600
const AUTO_FLIP_MS = 1900
const FLIP_S = 0.8

type Phase = 'charging' | 'flipping' | 'revealed' | 'settled'

function rng(seed: number) {
  let s = seed
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646 }
}

const face: React.CSSProperties = {
  position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
}

/** O-05 — your sun sign, pulled like a legendary card. */
export default function SignReveal({ birth, next, skip, primaryRef }: {
  birth: BirthDate; next: () => void; skip: () => void; primaryRef: React.MutableRefObject<(() => void) | null>
}) {
  const sign = SIGNS[sunSign(birth)]
  const glow = ART_GLOW[sign.id] ?? sign.color
  const reading = SIGN_READING[sign.id] ?? `${sign.name}. The sky has opinions about you, and most of them are flattering. The rest we will get to over the next few cards.`
  const [phase, setPhase] = useState<Phase>('charging')
  const [burstKey, setBurstKey] = useState(0)
  const { canvasRef, fire } = useConfetti()
  const timers = useRef<number[]>([])
  const phaseRef = useRef(phase)
  phaseRef.current = phase

  // ---- charge ------------------------------------------------------------
  const charge = useMotionValue(0)
  const glowOpacity = useTransform(charge, [0, 1], [0.15, 1])
  const glowScale = useTransform(charge, [0, 1], [0.7, 1.25])
  const tint = useTransform(charge, [0, 1], [0, 0.55])
  const shadow = useTransform(charge, (c) => `0 0 ${8 + c * 40}px ${glow}${Math.round(40 + c * 170).toString(16).padStart(2, '0')}, 0 20px 50px rgba(10,4,30,0.6)`)
  const shake = useMotionValue(0)
  const shakeR = useMotionValue(0)

  // ---- holo tilt ---------------------------------------------------------
  const hovering = useRef(false)
  const rxT = useMotionValue(0)
  const ryT = useMotionValue(0)
  const rx = useSpring(rxT, { stiffness: 150, damping: 18 })
  const ry = useSpring(ryT, { stiffness: 150, damping: 18 })
  const hx = useTransform(ry, [-12, 12], [15, 85])
  const hy = useTransform(rx, [12, -12], [15, 85])
  const spec = useMotionTemplate`radial-gradient(circle at ${hx}% ${hy}%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 25%, transparent 50%)`
  const holo = useMotionTemplate`${hx}% ${hy}%`

  useAnimationFrame((t) => {
    const p = phaseRef.current
    if (p === 'charging') {
      const c = charge.get()
      shake.set((Math.random() - 0.5) * c * c * 5)
      shakeR.set((Math.random() - 0.5) * c * c * 2.2)
    } else if (shake.get() !== 0) { shake.set(0); shakeR.set(0) }
    if (hovering.current) return
    const s = t / 1000
    ryT.set(Math.sin(s * 0.8) * (p === 'charging' ? 3 : 7))
    rxT.set(Math.cos(s * 0.6) * (p === 'charging' ? 2 : 4))
  })

  const flip = () => {
    if (phaseRef.current !== 'charging') return
    timers.current.forEach(clearTimeout)
    timers.current = []
    charge.stop()
    charge.set(1)
    setPhase('flipping')
    sfx.flip()
    sfx.reveal()
    const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms))
    at(FLIP_S * 450, () => {
      setBurstKey((k) => k + 1)
      fire({ x: CHARGE_C.x / 390, y: CHARGE_C.y / 844, power: 1 })
      sfx.match()
    })
    at(FLIP_S * 1000 + 50, () => setPhase('revealed'))
    at(FLIP_S * 1000 + 1250, () => { setPhase('settled'); sfx.sparkle() })
  }

  useEffect(() => {
    const ctl = animate(charge, 1, { duration: CHARGE_MS / 1000, ease: [0.5, 0, 0.75, 0.6], delay: 0.45 })
    const tick = window.setInterval(() => {
      if (phaseRef.current === 'charging' && charge.get() > 0.02) sfx.peekTick(charge.get())
    }, 95)
    timers.current.push(window.setTimeout(flip, AUTO_FLIP_MS + 450))
    return () => { ctl.stop(); clearInterval(tick); timers.current.forEach(clearTimeout) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    primaryRef.current = () => {
      if (phaseRef.current === 'charging') flip()
      else if (phaseRef.current === 'settled') next()
    }
    return () => { primaryRef.current = null }
  })

  const particles = useMemo(() => {
    const r = rng(77)
    return Array.from({ length: 26 }, (_, i) => {
      const a = r() * Math.PI * 2
      const d = 150 + r() * 90
      return { x: Math.cos(a) * d, y: Math.sin(a) * d, s: 2 + r() * 4, delay: r() * 1.4, dur: 0.9 + r() * 0.6, gold: i % 3 === 0 }
    })
  }, [])

  const flipped = phase !== 'charging'
  const settled = phase === 'settled'

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* pre-flip copy */}
      <AnimatePresence>
        {!settled && (
          <motion.div key="pre" exit={{ opacity: 0, y: -10, transition: { duration: 0.35 } }}
            style={{ position: 'absolute', top: 104, width: '100%', textAlign: 'center' }}>
            <motion.div className="eyebrow" {...rise(0.05, 8)} style={{ color: 'var(--label-3)' }}>Your first pull</motion.div>
            <motion.h1 className="h-display" {...rise(0.15)} style={{ marginTop: 8, fontSize: 31 }}>One card has your name.</motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* post-flip copy, per Figma */}
      {settled && (
        <div style={{ position: 'absolute', top: 104, width: '100%', textAlign: 'center' }}>
          <motion.div className="eyebrow" {...rise(0, 8)} style={{ color: 'var(--label-3)' }}>Your sun sign</motion.div>
          <motion.h1 className="h-display" {...rise(0.08)} style={{ marginTop: 8, fontSize: 33 }}>Sun in {sign.name}</motion.h1>
          <motion.p className="serif" {...rise(0.2)}
            style={{ margin: '12px auto 0', width: 344, fontSize: 16, lineHeight: 1.6, color: 'var(--label-2)' }}>
            {reading}
          </motion.p>
        </div>
      )}

      {/* the card rig */}
      <motion.div
        initial={{ x: CHARGE_C.x - W / 2, y: CHARGE_C.y - H / 2 + 260, rotate: -8, scale: 0.8, opacity: 0 }}
        animate={settled
          ? { x: SETTLE_C.x - W / 2, y: SETTLE_C.y - H / 2, rotate: 0, scale: SETTLE_SCALE, opacity: 1 }
          : { x: CHARGE_C.x - W / 2, y: CHARGE_C.y - H / 2, rotate: 0, scale: 1, opacity: 1 }}
        transition={settled ? { duration: 0.9, ease: EASE } : { type: 'spring', stiffness: 120, damping: 15, delay: 0.1 }}
        style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, zIndex: 5 }}
      >
        {/* god rays */}
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={flipped ? { opacity: settled ? 0.35 : 0.9, scale: settled ? 1.25 : 1.6 } : { opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{ position: 'absolute', left: W / 2 - 260, top: H / 2 - 260, width: 520, height: 520, pointerEvents: 'none' }}
        >
          <motion.div
            animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{
              width: '100%', height: '100%', borderRadius: '50%',
              background: `repeating-conic-gradient(from 0deg, ${glow}55 0deg 5deg, transparent 5deg 18deg)`,
              WebkitMaskImage: 'radial-gradient(closest-side, #000 15%, transparent 100%)',
              maskImage: 'radial-gradient(closest-side, #000 15%, transparent 100%)',
            }}
          />
        </motion.div>

        {/* charge aura */}
        <motion.div style={{
          position: 'absolute', inset: -70, borderRadius: '50%', pointerEvents: 'none', opacity: glowOpacity, scale: glowScale,
          background: `radial-gradient(closest-side, ${glow}cc 0%, ${glow}44 45%, transparent 100%)`, filter: 'blur(10px)',
        }} />
        {!flipped && (
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.96, 1.04, 0.96] }}
            transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: -14, borderRadius: 22, border: `1.5px solid ${glow}`, boxShadow: `0 0 24px ${glow}, inset 0 0 18px ${glow}88`, pointerEvents: 'none' }}
          />
        )}

        {/* gathering particles */}
        {!flipped && particles.map((p, i) => (
          <motion.span key={i}
            initial={{ x: p.x, y: p.y, opacity: 0, scale: 1 }}
            animate={{ x: [p.x, 0], y: [p.y, 0], opacity: [0, 1, 0], scale: [1, 0.3] }}
            transition={{ duration: p.dur, delay: p.delay * 0.6, repeat: Infinity, ease: 'easeIn' }}
            style={{
              position: 'absolute', left: W / 2 - p.s / 2, top: H / 2 - p.s / 2, width: p.s, height: p.s, borderRadius: '50%',
              background: p.gold ? '#fff4cf' : glow, boxShadow: `0 0 ${p.s * 3}px ${p.gold ? '#f2c75c' : glow}`, pointerEvents: 'none',
            }}
          />
        ))}

        {/* tilt + flip */}
        <motion.div
          onPointerMove={(e) => {
            hovering.current = true
            const r = e.currentTarget.getBoundingClientRect()
            ryT.set(((e.clientX - r.left) / r.width - 0.5) * 24)
            rxT.set(-((e.clientY - r.top) / r.height - 0.5) * 24)
          }}
          onPointerLeave={() => { hovering.current = false }}
          onClick={flip}
          whileHover={!flipped ? { scale: 1.03 } : undefined}
          style={{ position: 'absolute', inset: 0, perspective: 900, cursor: flipped ? 'default' : 'pointer', x: shake, rotate: shakeR }}
        >
          <motion.div style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d', rotateX: rx, rotateY: ry }}>
            <motion.div
              animate={flipped ? { rotateY: 180, scale: [1, 1.18, 1], y: [0, -24, 0] } : { rotateY: 0 }}
              transition={{ duration: FLIP_S, ease: [0.5, 0, 0.2, 1] }}
              style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }}
            >
              {/* back */}
              <motion.div style={{ ...face, borderRadius: 12, boxShadow: shadow }}>
                <CardBack width={W} height={H} />
                <motion.div style={{
                  position: 'absolute', inset: 0, borderRadius: 12, opacity: tint, mixBlendMode: 'screen',
                  background: `radial-gradient(70% 55% at 50% 50%, ${glow} 0%, ${glow}55 50%, transparent 85%)`,
                }} />
              </motion.div>
              {/* face */}
              <div style={{ ...face, transform: 'rotateY(180deg)' }}>
                <SignFace signId={sign.id} glow={glow} spec={spec} holo={holo} />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* legendary stamp */}
        <AnimatePresence>
          {flipped && (
            <motion.div
              initial={{ opacity: 0, scale: 2.4, rotate: -14 }}
              animate={{ opacity: 1, scale: 1, rotate: -6 }}
              transition={{ delay: FLIP_S * 0.8, type: 'spring', stiffness: 320, damping: 14 }}
              className="mono"
              style={{
                position: 'absolute', right: -18, top: -12, zIndex: 6, padding: '5px 10px', borderRadius: 6,
                background: 'var(--gold-foil)', backgroundSize: '200% 100%', animation: 'foil-sweep 3s linear infinite',
                color: '#3a2a08', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.2em',
                boxShadow: '0 0 18px rgba(242,199,92,0.7), 0 4px 10px rgba(0,0,0,0.4)',
              }}
            >
              ✦ LEGENDARY
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* prompt under the charging card */}
      <AnimatePresence>
        {!flipped && (
          <motion.div key="tap" className="mono"
            initial={{ opacity: 0 }} animate={{ opacity: [0.4, 1, 0.4] }} exit={{ opacity: 0 }}
            transition={{ duration: 1.2, repeat: Infinity }}
            style={{ position: 'absolute', top: CHARGE_C.y + H / 2 + 36, width: '100%', textAlign: 'center', fontSize: 10, letterSpacing: '0.26em', color: glow }}>
            TAP TO REVEAL
          </motion.div>
        )}
      </AnimatePresence>

      <Burst x={CHARGE_C.x} y={CHARGE_C.y} fireKey={burstKey} power={1} colors={[glow, '#fff4cf', '#f2c75c', '#efe6d6']} />
      <ConfettiCanvas canvasRef={canvasRef} />

      <Cta onClick={next} show={settled} delay={0.5}>Next, your moon</Cta>
      {settled && <Caption delay={0.7} onClick={() => { sfx.tap(); skip() }}>Tell me later</Caption>}
    </div>
  )
}

/** Face-up sign card: figure art, foil frame, holo + specular that follow the tilt. */
function SignFace({ signId, glow, spec, holo }: { signId: keyof typeof SIGNS; glow: string; spec: ReturnType<typeof useMotionTemplate>; holo: ReturnType<typeof useMotionTemplate> }) {
  const sign = SIGNS[signId]
  return (
    <div style={{
      position: 'absolute', inset: 0, borderRadius: 14, padding: 3,
      background: sign.foil, backgroundSize: '200% 100%', animation: 'foil-sweep 4s linear infinite',
      boxShadow: `0 0 34px ${glow}aa, 0 0 2px ${sign.light}, 0 24px 50px rgba(5,2,15,0.7)`,
    }}>
      <div className="grain" style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 11, overflow: 'hidden', background: '#050a04' }}>
        <img src={sign.figureImg} alt="" draggable={false} style={{
          position: 'absolute', left: 0, top: 0, width: '100%', height: '78%', objectFit: 'cover', objectPosition: 'center 40%',
        }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', bottom: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(5,10,4,0.85) 45%, #070b06 70%)' }} />
        {/* inner rule */}
        <div style={{ position: 'absolute', inset: 6, borderRadius: 7, border: `1px solid ${sign.light}55`, pointerEvents: 'none' }} />
        {/* glyph + serial */}
        <div style={{
          position: 'absolute', left: 12, top: 12, width: 26, height: 26, borderRadius: '50%', display: 'grid', placeItems: 'center',
          background: 'rgba(5,10,4,0.55)', border: `1px solid ${sign.light}88`, color: sign.light, fontSize: 14, boxShadow: `0 0 10px ${glow}88`,
        }}>{sign.glyph}</div>
        <div className="mono" style={{ position: 'absolute', right: 13, top: 19, fontSize: 8.5, color: 'rgba(239,230,214,0.75)' }}>{ME.serial}</div>
        {/* nameplate */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 18, textAlign: 'center' }}>
          <div className="serif" style={{
            fontSize: 30, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500,
            background: sign.foil, backgroundSize: '200% 100%', animation: 'foil-sweep 4s linear infinite',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            filter: `drop-shadow(0 0 8px ${glow}66)`,
          }}>{sign.name}</div>
          <div className="mono" style={{ marginTop: 3, fontSize: 8, letterSpacing: '0.2em', color: 'var(--label-2)' }}>
            {sign.aura.toUpperCase()} · {modality(sign.id)}
          </div>
          <div style={{ marginTop: 7, display: 'flex', justifyContent: 'center', gap: 4 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} style={{ fontSize: 9, color: '#f2c75c', textShadow: '0 0 6px #f2c75c' }}>★</span>
            ))}
          </div>
        </div>
        {/* holographic foil wash */}
        <motion.div style={{
          position: 'absolute', inset: 0, mixBlendMode: 'color-dodge', opacity: 0.32, pointerEvents: 'none',
          background: 'linear-gradient(115deg, transparent 20%, #ff9adf 35%, #9ae8ff 45%, #f6ff9a 55%, #ffb38a 65%, transparent 80%)',
          backgroundSize: '260% 260%', backgroundPosition: holo,
        }} />
        <motion.div style={{ position: 'absolute', inset: 0, background: spec, mixBlendMode: 'overlay', pointerEvents: 'none' }} />
      </div>
    </div>
  )
}
