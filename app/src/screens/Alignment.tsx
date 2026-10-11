import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ScreenProps } from './types'
import Strength from '../components/Strength'
import Starfield from '../components/Starfield'
import TabBar from '../components/TabBar'
import AuraPair from '../components/chat/AuraPair'
import { READINGS } from '../components/chat/readings'
import { sfx } from '../lib/sfx'

const CARD = { left: 24, top: 104, width: 342, height: 555 }

/** S-21 Cosmic alignment — Pull / Push / Align / Relationship. */
export default function Alignment({ go }: ScreenProps) {
  const [[tab, dir], setTab] = useState<[number, number]>([0, 1])
  const r = READINGS[tab]

  const select = (i: number) => {
    if (i === tab || i < 0 || i >= READINGS.length) return
    sfx.flip()
    setTab([i, i > tab ? 1 : -1])
  }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora="#5b2fb8" warm="#4a2a8a" count={60} seed={31} />
      <div style={{ position: 'absolute', inset: 0, background: '#150b35', mixBlendMode: 'lighten', pointerEvents: 'none' }} />

      <motion.button
        onClick={() => { sfx.tap(); go('chat') }}
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Back"
        style={{ position: 'absolute', left: 16, top: 56, width: 40, height: 40, display: 'grid', placeItems: 'center', color: 'var(--label-1)', zIndex: 5 }}
      >
        <svg width="11" height="18" viewBox="0 0 11 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 1.5 2 9l7.5 7.5" /></svg>
      </motion.button>
      <motion.div
        className="mono"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ position: 'absolute', top: 69, width: '100%', textAlign: 'center', fontSize: 11, letterSpacing: '0.24em', color: 'var(--label-1)', fontWeight: 700 }}
      >
        COSMIC ALIGNMENT
      </motion.div>

      {/* the reading card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.94, rotateX: 12 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ position: 'absolute', ...CARD, perspective: 1000 }}
      >
        <motion.div
          className="grain"
          animate={{ boxShadow: `0 0 46px ${r.color}38, 0 24px 60px rgba(8, 3, 26, 0.6)` }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'absolute', inset: 0, borderRadius: 24, overflow: 'hidden',
            border: '3px solid rgba(222, 208, 246, 0.78)',
            background:
              'radial-gradient(28% 62% at 50% 52%, rgba(150, 80, 255, 0.55) 0%, rgba(120, 60, 230, 0.18) 55%, transparent 100%),' +
              'radial-gradient(70% 40% at 50% 0%, rgba(120, 70, 220, 0.4), transparent 70%),' +
              'linear-gradient(180deg, #3a1d80 0%, #34187a 50%, #2c1468 100%)',
          }}
        >
          <div style={{ position: 'absolute', inset: 10, borderRadius: 15, border: '1px solid rgba(222, 208, 246, 0.32)', pointerEvents: 'none' }} />

          <div className="mono" style={{ position: 'absolute', top: 15, width: '100%', textAlign: 'center', fontSize: 10, letterSpacing: '0.3em', color: 'var(--label-2)' }}>
            JUNIPER × YOU
          </div>

          <div style={{ position: 'absolute', top: 34, left: 0, right: 0 }}>
            <AuraPair size={84} gap={52} animate />
          </div>

          <div className="h-display" style={{ position: 'absolute', top: 140, width: '100%', textAlign: 'center', fontSize: 25 }}>
            Venus rules you both.
          </div>
          <div style={{ position: 'absolute', top: 174, width: '100%', textAlign: 'center', fontSize: 13.5, color: 'var(--label-2)' }}>
            She balances the room; you keep it.
          </div>

          {/* segmented tabs */}
          <div style={{
            position: 'absolute', top: 199, left: 21, right: 21, height: 34, padding: 3, borderRadius: 999,
            display: 'flex', background: 'rgba(24, 12, 56, 0.45)', border: '1px solid rgba(179,166,196,0.22)',
          }}>
            {READINGS.map((x, i) => (
              <motion.button
                key={x.id}
                onClick={() => select(i)}
                whileHover={{ scale: i === tab ? 1 : 1.05 }}
                whileTap={{ scale: 0.94 }}
                style={{ position: 'relative', flex: x.id === 'relationship' ? 1.75 : 1, height: '100%', display: 'grid', placeItems: 'center' }}
              >
                {i === tab && (
                  <motion.div layoutId="align-tab-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    style={{ position: 'absolute', inset: 0, borderRadius: 999, background: x.pill, boxShadow: `0 0 14px ${x.color}33` }} />
                )}
                <span className="mono" style={{
                  position: 'relative', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700,
                  color: i === tab ? x.color : 'var(--label-3)', transition: 'color .25s',
                }}>
                  {x.label}
                </span>
              </motion.button>
            ))}
          </div>

          {/* reading — crossfades per tab, swipeable */}
          <motion.div
            onPanEnd={(_, info) => {
              if (info.offset.x < -40) select(tab + 1)
              else if (info.offset.x > 40) select(tab - 1)
            }}
            style={{ position: 'absolute', top: 246, left: 21, right: 21, height: 226, touchAction: 'pan-y', cursor: 'grab' }}
          >
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={r.id}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 22, filter: 'blur(4px)' }),
                  center: { opacity: 1, x: 0, filter: 'blur(0px)' },
                  exit: (d: number) => ({ opacity: 0, x: d * -22, filter: 'blur(4px)' }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32, ease: [0.3, 0.6, 0.2, 1] }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: r.color, fontWeight: 700 }}>
                    {r.label} <span style={{ opacity: 0.7, margin: '0 5px' }}>·</span> {r.eyebrow}
                  </div>
                  <Strength n={r.pips} of={5} color={r.color} />
                </div>
                <div className="serif italic" style={{ fontSize: 19.5, lineHeight: '23px', marginTop: 8, color: 'var(--label-1)' }}>
                  {r.headline}
                </div>
                <p style={{ fontSize: 13, lineHeight: '18px', marginTop: 7, color: 'rgba(239, 230, 214, 0.86)' }}>
                  {r.body}
                </p>
                <div style={{ height: 1, background: 'rgba(179,166,196,0.22)', margin: '9px 0 8px' }} />
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span className="mono" style={{ fontSize: 9.5, letterSpacing: '0.14em', color: r.color, fontWeight: 700, paddingTop: 2 }}>TRY</span>
                  <span style={{ fontSize: 13, lineHeight: '18px', color: 'var(--label-1)' }}>{r.tryLine}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* page dots */}
          <div style={{ position: 'absolute', top: 476, width: '100%', display: 'flex', justifyContent: 'center', gap: 8 }}>
            {READINGS.map((x, i) => (
              <button key={x.id} onClick={() => select(i)} aria-label={x.label} style={{ padding: 2 }}>
                <motion.span
                  animate={{ background: i === tab ? r.color : 'rgba(179,166,196,0.35)', scale: i === tab ? 1.15 : 1 }}
                  style={{ display: 'block', width: 6, height: 6, borderRadius: 3 }}
                />
              </button>
            ))}
          </div>

          <div className="mono" style={{
            position: 'absolute', top: 496, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20,
            fontSize: 10, letterSpacing: '0.12em', color: 'var(--label-2)',
          }}>
            <span>LIBRA · AIR</span>
            <span style={{ fontSize: 13, color: 'var(--label-1)' }}>◇</span>
            <span>TAURUS · EARTH</span>
          </div>
          <div className="mono" style={{ position: 'absolute', top: 518, width: '100%', textAlign: 'center', fontSize: 9, letterSpacing: '0.22em', color: 'var(--label-3)' }}>
            ALIGN <span style={{ margin: '0 6px' }}>·</span> № 031/∞
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        style={{ position: 'absolute', top: 686, left: 38, width: 314 }}
      >
        <motion.button
          className="chrome-cta"
          onClick={() => { sfx.tap(); go('chat') }}
          whileHover={{ scale: 1.02, boxShadow: '0 0 44px rgba(248, 237, 255, 0.55), inset 0 1px 0 rgba(255,255,255,0.9)' }}
          whileTap={{ scale: 0.97 }}
        >
          Say something <span className="spark">✦</span>
        </motion.button>
      </motion.div>

      <TabBar active="matches" go={go} onSelect={(t) => { if (t === 'matches') { go('matches'); return true } }} />
    </div>
  )
}
