import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { SIGNS } from '../../data/signs'
import { ME } from '../../data/profiles'
import { sfx } from '../../lib/sfx'
import { Caption, Cta, Header, Planet, EASE } from './shared'
import { ART_GLOW, MONTH_SHORT, beast, modality, sunDegree, sunSign, type BirthDate } from './zodiac'

const C = { x: 195, y: 384 }
const R = 116

/** clockwise from 12 o'clock; index 1 is your sun */
const BODIES = [
  { c: '#e0452e', l: '#ffb09a', s: 24 },
  { c: '#8fd13a', l: '#efffc4', s: 38, sun: true },
  { c: '#d8a04a', l: '#ffe7b8', s: 23 },
  { c: '#2f8af0', l: '#bfe0ff', s: 24 },
  { c: '#f07a1e', l: '#ffd0a0', s: 24 },
  { c: '#e45a78', l: '#ffc0cf', s: 23 },
  { c: '#a35cf0', l: '#e8d4ff', s: 23 },
  { c: '#d42e5e', l: '#ff9ab8', s: 24 },
  { c: '#9a4ee0', l: '#e2c8ff', s: 24 },
  { c: '#2fc79a', l: '#c4fbe6', s: 24 },
  { c: '#2f8ae0', l: '#b8dcff', s: 23 },
  { c: '#7d3de0', l: '#d8c0ff', s: 24 },
]

const slot = (i: number) => {
  const a = (-90 + i * 30) * (Math.PI / 180)
  return { x: Math.cos(a) * R, y: Math.sin(a) * R }
}

const STEP_MS = 190
const T_RING = 500
const T_CENTER = T_RING + BODIES.length * STEP_MS + 250
const T_LINES = T_CENTER + 650
const LINE_GAP = 520
const T_DONE = T_LINES + LINE_GAP * 3

/** O-04 — "This was your sky." Planets place themselves; the sun blooms; the checklist ticks in. */
export default function BirthSky({ birth, time = '5:00 PM', next, primaryRef }: { birth: BirthDate; time?: string; next: () => void; primaryRef: React.MutableRefObject<(() => void) | null> }) {
  const sign = SIGNS[sunSign(birth)]
  const moon = SIGNS[ME.moon]
  const glow = ART_GLOW[sign.id] ?? sign.color
  const [placed, setPlaced] = useState(0)
  const [center, setCenter] = useState(false)
  const [lines, setLines] = useState(0)
  const [done, setDone] = useState(false)
  const timers = useRef<number[]>([])

  const finish = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setPlaced(BODIES.length); setCenter(true); setLines(3); setDone(true)
  }

  useEffect(() => {
    const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms))
    BODIES.forEach((_, i) => at(T_RING + i * STEP_MS, () => { setPlaced(i + 1); sfx.peekTick(i / BODIES.length) }))
    at(T_CENTER, () => { setCenter(true); sfx.sparkle() })
    for (let k = 0; k < 3; k++) at(T_LINES + k * LINE_GAP, () => { setLines(k + 1); sfx.tap() })
    at(T_DONE, () => { setDone(true); sfx.align() })
    return () => timers.current.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    primaryRef.current = () => { if (done) next(); else finish() }
    return () => { primaryRef.current = null }
  })

  const checklist = [
    `Sun in ${beast(sign.id).replace('THE ', 'the ')}`,
    `Moon drifting through ${moon.name}`,
    '444 stars accounted for',
  ]

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Header
        eyebrow={`Tulsa, OK · ${MONTH_SHORT[birth.month]} ${birth.day} ${birth.year} · ${time}`}
        title="This was your sky."
        body="Hold still. The sky is remembering where everything was. It never forgets."
        bodyWidth={300}
      />

      {/* aura bloom */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        animate={center ? { opacity: 1, scale: 1 } : { opacity: 0.25, scale: 0.55 }}
        transition={{ duration: center ? 1.6 : 2.4, ease: EASE }}
        style={{ position: 'absolute', left: C.x - 150, top: C.y - 150, width: 300, height: 300, pointerEvents: 'none' }}
      >
        <motion.img
          src={sign.auraImg} alt="" draggable={false}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', opacity: 0.9,
            WebkitMaskImage: 'radial-gradient(closest-side, #000 40%, rgba(0,0,0,0.6) 70%, transparent 100%)',
            maskImage: 'radial-gradient(closest-side, #000 40%, rgba(0,0,0,0.6) 70%, transparent 100%)',
            filter: 'saturate(1.2)',
          }}
        />
      </motion.div>

      {/* ring */}
      <svg width={390} height={300} viewBox={`0 ${C.y - 150} 390 300`} style={{ position: 'absolute', left: 0, top: C.y - 150, overflow: 'visible', pointerEvents: 'none' }}>
        <motion.circle cx={C.x} cy={C.y} r={R} fill="none" stroke="rgba(239,230,214,0.4)" strokeWidth={1}
          initial={{ pathLength: 0, rotate: -90 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease: [0.45, 0, 0.2, 1] }}
          style={{ transformOrigin: `${C.x}px ${C.y}px` }} />
        <motion.circle cx={C.x} cy={C.y} r={76} fill="rgba(11,6,32,0.55)" stroke="rgba(239,230,214,0.18)" strokeWidth={1}
          initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
          style={{ transformOrigin: `${C.x}px ${C.y}px` }} />
      </svg>

      {/* bodies, slowly turning once placed */}
      <motion.div
        animate={done ? { rotate: 360 } : { rotate: 0 }}
        transition={done ? { duration: 140, repeat: Infinity, ease: 'linear' } : { duration: 0 }}
        style={{ position: 'absolute', left: C.x, top: C.y, width: 0, height: 0 }}
      >
        {BODIES.map((b, i) => {
          const p = slot(i)
          const from = { x: p.x * 2.6 + (i % 2 ? 40 : -40), y: p.y * 2.6 - 60 }
          const on = i < placed
          return (
            <motion.div key={i}
              initial={{ x: from.x, y: from.y, opacity: 0, scale: 0.2 }}
              animate={on ? { x: p.x, y: p.y, opacity: 1, scale: 1 } : { x: from.x, y: from.y, opacity: 0, scale: 0.2 }}
              transition={{ type: 'spring', stiffness: 170, damping: 17 }}
              style={{ position: 'absolute', left: -b.s / 2, top: -b.s / 2 }}
            >
              {/* counter-rotate so highlights stay lit from the top-left */}
              <motion.div animate={done ? { rotate: -360 } : { rotate: 0 }}
                transition={done ? { duration: 140, repeat: Infinity, ease: 'linear' } : { duration: 0 }}>
                {b.sun && center && (
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0.2, 0.7] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: `1.5px solid ${glow}`, boxShadow: `0 0 16px ${glow}` }}
                  />
                )}
                <Planet size={b.s} color={b.sun ? glow : b.c} light={b.l} glow={b.sun ? 0.9 : 0.45} />
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* moon, outside the ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={placed >= 6 ? { opacity: 1, scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 200, damping: 14 }}
        style={{ position: 'absolute', left: 300, top: 244, width: 20, height: 20, borderRadius: '50%', background: '#f4efe4', boxShadow: '0 0 12px rgba(255,250,235,0.8)', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', left: 6, top: -4, width: 20, height: 20, borderRadius: '50%', background: '#130a2c' }} />
      </motion.div>

      {/* centre: your sun */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={center ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
        style={{ position: 'absolute', left: C.x - 75, top: C.y - 42, width: 150, textAlign: 'center' }}
      >
        <div className="eyebrow" style={{ fontSize: 9, color: 'var(--label-2)' }}>Your sun</div>
        <div className="h-display" style={{ fontSize: 30, marginTop: 6, textShadow: `0 0 20px ${glow}88` }}>{sign.name}</div>
        <div className="mono" style={{ fontSize: 9, marginTop: 6, color: glow, letterSpacing: '0.14em' }}>
          {sunDegree(birth)}° · {modality(sign.id)}
        </div>
      </motion.div>

      {/* checklist */}
      <div style={{ position: 'absolute', top: 524, left: 0, width: '100%', textAlign: 'center' }}>
        {checklist.map((t, i) => (
          <motion.div key={i} className="mono"
            initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
            animate={i < lines ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.45, ease: EASE }}
            style={{ fontSize: 9.5, lineHeight: '15px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--label-2)' }}
          >
            {t}{' '}
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={i < lines ? { scale: [0, 1.6, 1], opacity: 1 } : {}}
              transition={{ delay: 0.25, duration: 0.4 }}
              style={{ display: 'inline-block', color: 'var(--spark)' }}
            >✓</motion.span>
          </motion.div>
        ))}
      </div>

      <Cta onClick={next} show={done} delay={0.1}>Read my sky</Cta>
      {!done && (
        <motion.div className="mono" animate={{ opacity: [0.35, 0.8, 0.35] }} transition={{ duration: 1.6, repeat: Infinity }}
          style={{ position: 'absolute', top: Y_READING, width: '100%', textAlign: 'center', fontSize: 9.5, letterSpacing: '0.22em', color: 'var(--label-3)' }}>
          READING YOUR SKY…
        </motion.div>
      )}
      <Caption delay={0.7}>Only your sun sign is ever shown to anyone.</Caption>
    </div>
  )
}

const Y_READING = 660
