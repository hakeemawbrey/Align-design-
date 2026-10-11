import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { Caption, Cta, Planet, rise, EASE } from './shared'
import { sfx } from '../../lib/sfx'

const PLANETS = [
  { x: 40, y: 295, s: 40, c: '#35c7a0', l: '#bdf5e2', depth: 0.9, dur: 6.2 },
  { x: 112, y: 210, s: 46, c: '#f07a2a', l: '#ffd2a0', depth: 0.6, dur: 7.4 },
  { x: 187, y: 262, s: 30, c: '#2f7ff0', l: '#b6d6ff', depth: 0.35, dur: 5.6 },
  { x: 262, y: 196, s: 36, c: '#9fd83a', l: '#eaffb8', depth: 0.5, dur: 6.8 },
  { x: 322, y: 252, s: 44, c: '#a35cf0', l: '#e8d4ff', depth: 0.75, dur: 7.9 },
  { x: 352, y: 300, s: 32, c: '#ef3d2e', l: '#ffb4a2', depth: 1, dur: 5.9 },
]

const SPARKS = [
  { x: 58, y: 184, s: 12 }, { x: 133, y: 151, s: 5 }, { x: 321, y: 199, s: 7 }, { x: 330, y: 141, s: 5 }, { x: 386, y: 162, s: 4 },
]

function Floating({ p, i, mx, my }: { p: typeof PLANETS[number]; i: number; mx: MotionValue<number>; my: MotionValue<number> }) {
  const px = useTransform(mx, (v) => v * 18 * p.depth)
  const py = useTransform(my, (v) => v * 12 * p.depth)
  return (
    <motion.div style={{ position: 'absolute', left: p.x - p.s / 2, top: p.y - p.s / 2, x: px, y: py }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.3, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.15 + i * 0.09, duration: 1.1, ease: [0.2, 1.2, 0.3, 1] }}
      >
        <motion.div
          animate={{ y: [0, -7 * p.depth - 3, 0], x: [0, 3 * (i % 2 ? 1 : -1), 0] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        >
          <Planet size={p.s} color={p.c} light={p.l} glow={0.5} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/** O-02 — "The sky already wrote you down." */
export default function Arrival({ next, onHaveChart }: { next: () => void; onHaveChart: () => void }) {
  const tx = useMotionValue(0)
  const ty = useMotionValue(0)
  const mx = useSpring(tx, { stiffness: 50, damping: 16 })
  const my = useSpring(ty, { stiffness: 50, damping: 16 })
  const horizonY = useTransform(my, (v) => v * 4)

  return (
    <div
      style={{ position: 'absolute', inset: 0 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        tx.set(((e.clientX - r.left) / r.width - 0.5) * 2)
        ty.set(((e.clientY - r.top) / r.height - 0.5) * 2)
      }}
      onPointerLeave={() => { tx.set(0); ty.set(0) }}
    >
      {SPARKS.map((s, i) => (
        <motion.span key={i}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.15, 0.8] }}
          transition={{ duration: 2.4 + i * 0.6, repeat: Infinity, delay: i * 0.5 }}
          style={{ position: 'absolute', left: s.x - s.s / 2, top: s.y - s.s / 2, fontSize: s.s, lineHeight: 1, color: '#fff', textShadow: '0 0 6px #fff' }}
        >✦</motion.span>
      ))}

      {/* curved violet horizon */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: EASE }}
        style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, pointerEvents: 'none' }}
      >
        <motion.div style={{
          position: 'absolute', left: -255, top: 280, width: 900, height: 900, borderRadius: '50%', y: horizonY,
          background: 'radial-gradient(closest-side, rgba(20,10,46,0) 86%, rgba(80,40,150,0.35) 97%, rgba(150,110,230,0.6) 99.6%, rgba(150,110,230,0) 100%)',
        }} />
        <motion.div style={{
          position: 'absolute', left: -255, top: 280, width: 900, height: 900, borderRadius: '50%', y: horizonY,
          boxShadow: '0 -18px 50px -10px rgba(140,90,240,0.45), inset 0 26px 60px -20px rgba(120,70,220,0.5)',
          border: '1px solid rgba(200,170,255,0.45)',
          background: 'linear-gradient(180deg, rgba(60,30,120,0.55) 0%, rgba(20,10,46,0.2) 18%, rgba(11,6,32,0) 40%)',
        }} />
      </motion.div>

      {PLANETS.map((p, i) => <Floating key={i} p={p} i={i} mx={mx} my={my} />)}

      <motion.h1 className="h-display" {...rise(0.55)}
        style={{ position: 'absolute', top: 334, left: 30, width: 330, textAlign: 'center', fontSize: 34, lineHeight: 1.2, color: 'var(--label-1)' }}>
        The sky already<br />wrote you down.
      </motion.h1>
      <motion.p className="serif" {...rise(0.7)}
        style={{ position: 'absolute', top: 430, left: 40, width: 310, textAlign: 'center', fontSize: 16.5, lineHeight: 1.65, color: 'var(--label-2)' }}>
        Give us the minute you arrived. We will show you who you keep choosing, and why it keeps ending the same way.
      </motion.p>

      <Cta onClick={next} delay={0.9}>Begin your chart</Cta>
      <Caption delay={1.0} onClick={() => { sfx.tap(); onHaveChart() }}>I already have a chart</Caption>
      <motion.div {...rise(1.1, 6)}
        style={{ position: 'absolute', top: 747, width: '100%', textAlign: 'center', fontSize: 10.5, color: 'var(--label-4)' }}>
        By continuing you agree to the Terms and the Privacy Policy.
      </motion.div>
    </div>
  )
}
