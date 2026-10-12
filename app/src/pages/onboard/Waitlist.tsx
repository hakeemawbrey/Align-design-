import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { PageProps } from '../types'
import Starfield from '../../components/Starfield'
import { BackChevron, Caption, Cta, EASE, Header, Y, rise } from '../../components/onboarding/shared'
import { sfx } from '../../lib/sfx'

/** 'tulsa' → 'Tulsa', 'oklahoma-city' → 'Oklahoma City' */
const cityName = (slug?: string) =>
  (slug || 'tulsa').split('-').filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(' ')

/** a stable place in line per city, so the number doesn't change between visits */
function placeInLine(city: string) {
  let h = 0
  for (const c of city.toLowerCase()) h = (h * 31 + c.charCodeAt(0)) % 9973
  return city.toLowerCase() === 'tulsa' ? 344 : 120 + (h % 380)
}

const NUMBER = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN', 'TWELVE']

const C = { x: 195, y: 402 }
const RINGS = [130, 95, 60]

/** O-03d — your city isn't open yet. Houston first; everyone else is cast, saved and in line. */
export default function Waitlist({ back, go, arg }: PageProps) {
  const city = cityName(arg)
  const n = placeInLine(city)
  const more = 11
  const [on, setOn] = useState(false)

  const notify = () => {
    if (on) { sfx.tap(); return }
    sfx.align()
    setOn(true)
  }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora={null} warm={null} count={80} seed={11} />
      <BackChevron onClick={() => { sfx.tap(); back() }} />

      <Header
        eyebrow="Your city · Not lit yet"
        title={`${city} has no sky yet.`}
        body={`A deck needs enough charts, so we light cities one at a time. Yours is cast and saved; when ${city} lights, you deal first.`}
        bodyWidth={320}
      />

      {/* the city: a dim star inside rings that haven't filled yet */}
      <svg width={390} height={600} style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}>
        {RINGS.map((r, i) => (
          <motion.circle key={r} cx={C.x} cy={C.y} r={r} fill="none" stroke="rgba(201,182,240,0.22)" strokeWidth={1}
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 + i * 0.12, duration: 0.9, ease: EASE }}
            style={{ transformOrigin: `${C.x}px ${C.y}px` }} />
        ))}
        {/* a few charts already cast nearby */}
        {[[-88, -40], [70, 62], [-40, 96], [104, -70], [22, -112]].map(([dx, dy], i) => (
          <motion.circle key={i} cx={C.x + dx} cy={C.y + dy} r={1.4} fill="#d8d0e8"
            initial={{ opacity: 0 }} animate={{ opacity: [0.25, 0.8, 0.25] }}
            transition={{ delay: 0.8 + i * 0.2, duration: 3 + i * 0.4, repeat: Infinity }} />
        ))}
      </svg>
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', left: C.x - 34, top: C.y - 34, width: 68, height: 68, borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(closest-side, rgba(255,236,140,0.42) 0%, rgba(255,236,140,0.12) 55%, transparent 100%)',
        }} />
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 14 }}
        style={{ position: 'absolute', left: C.x - 3.5, top: C.y - 3.5, width: 7, height: 7, borderRadius: '50%', background: '#fff1a8', boxShadow: '0 0 10px #ffe680' }} />
      {/* rings fill as people join */}
      <AnimatePresence>
        {on && (
          <motion.div key="pulse" initial={{ scale: 0.1, opacity: 0.9 }} animate={{ scale: 1, opacity: 0 }} transition={{ duration: 1.4, ease: 'easeOut' }}
            style={{ position: 'absolute', left: C.x - 130, top: C.y - 130, width: 260, height: 260, borderRadius: '50%', border: '1.5px solid rgba(255,241,168,0.8)', pointerEvents: 'none' }} />
        )}
      </AnimatePresence>

      <motion.div key={on ? 'on' : 'off'} {...rise(on ? 0 : 0.6, 6)} className="mono" style={{
        position: 'absolute', top: Y.progress - 4, left: 24, right: 24, textAlign: 'center',
        fontSize: 8.5, letterSpacing: '0.12em', color: 'var(--label-3)', textTransform: 'uppercase', whiteSpace: 'nowrap',
      }}>
        {on ? `On the list · we tell you the night ${city} lights` : `You are number ${n} · ${NUMBER[more] ?? more} more and we look again`}
      </motion.div>

      <Cta onClick={notify} delay={0.6}>{on ? 'You are on the list' : 'Tell me when it opens'}</Cta>
      <Caption delay={0.75} onClick={() => { sfx.tap(); go('x/change-city') }}>Houston is live. Your card works there today.</Caption>
    </div>
  )
}
