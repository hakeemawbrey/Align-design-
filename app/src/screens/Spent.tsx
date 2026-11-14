import { useEffect } from 'react'
import { motion } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import TabBar from '../components/TabBar'
import CardBack from '../components/intro/CardBack'
import { BETA } from '../lib/beta'
import { sfx } from '../lib/sfx'

const OUTLINES = [
  { x: 56, y: 205, w: 172, h: 238, r: -9, op: 0.45, dur: 7, delay: 0 },
  { x: 136, y: 168, w: 172, h: 238, r: 8, op: 0.5, dur: 8, delay: 0.6 },
  { x: 108, y: 196, w: 176, h: 244, r: 0, op: 1, dur: 6, delay: 0.3 },
]

/** the beta's resting deck: three card backs, the top one square to you */
const BW = 170
const BH = 266
const STACK = [
  { x: -44, y: 22, r: -11, float: -5 },
  { x: 44, y: 14, r: 10, float: -7 },
  { x: 0, y: 8, r: -1.5, float: -9 },
]

function Sparkle({ x, y, s, d }: { x: number; y: number; s: number; d: number }) {
  return (
    <motion.svg width={s} height={s} viewBox="0 0 24 24"
      animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.1, 0.85] }}
      transition={{ duration: 3, repeat: Infinity, delay: d, ease: 'easeInOut' }}
      style={{ position: 'absolute', left: x, top: y }}>
      <path d="M12 0c.5 7 4.5 11.5 12 12-7.5.5-11.5 5-12 12-.5-7-4.5-11.5-12-12 7.5-.5 11.5-5 12-12Z" fill="#efe6d6" />
    </motion.svg>
  )
}

/** S-10 — the deck is spent. */
export default function Spent({ go }: ScreenProps) {
  useEffect(() => { const t = window.setTimeout(() => sfx.sparkle(), 300); return () => clearTimeout(t) }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora="#2a1666" warm={null} count={80} seed={21} />
      <Sparkle x={18} y={136} s={14} d={0} />
      <Sparkle x={346} y={316} s={12} d={1.2} />
      <Sparkle x={352} y={176} s={8} d={0.6} />
      <Sparkle x={20} y={404} s={7} d={2} />

      {BETA ? (
        /* beta: tomorrow's deck, face down and waiting. Real card backs, not empty outlines */
        <div style={{ position: 'absolute', left: 0, right: 0, top: 150, height: 300 }}>
          <motion.div aria-hidden animate={{ opacity: [0.55, 0.9, 0.55], scale: [0.95, 1.05, 0.95] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', left: '50%', top: 30, width: 300, height: 260, marginLeft: -150, borderRadius: '50%', filter: 'blur(34px)', background: 'radial-gradient(closest-side, rgba(154,123,224,0.6), rgba(242,199,92,0.18) 60%, transparent)' }} />
          {STACK.map((c, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: -60, rotate: c.r * 3, scale: 0.9 }}
              animate={{ opacity: 1, y: [0, c.float, 0], rotate: c.r, scale: 1 }}
              transition={{
                opacity: { duration: 0.5, delay: 0.1 + i * 0.12 },
                rotate: { type: 'spring', stiffness: 90, damping: 13, delay: 0.1 + i * 0.12 },
                scale: { type: 'spring', stiffness: 90, damping: 13, delay: 0.1 + i * 0.12 },
                y: { duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 },
              }}
              style={{ position: 'absolute', left: '50%', top: c.y, marginLeft: -BW / 2 + c.x, zIndex: i, filter: i < STACK.length - 1 ? 'brightness(0.72)' : 'none' }}>
              <CardBack width={BW} height={BH} style={{ borderRadius: 16 }} />
            </motion.div>
          ))}
        </div>
      ) : (<>
      {/* empty card outlines, floating */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="sp-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5a6bd0" />
            <stop offset="0.45" stopColor="#3fb6c8" />
            <stop offset="0.7" stopColor="#c8b4ff" />
            <stop offset="1" stopColor="#2e5a9a" />
          </linearGradient>
        </defs>
      </svg>
      {OUTLINES.map((o, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 40, rotate: o.r * 2, scale: 0.9 }}
          animate={{ opacity: o.op, y: [0, -8, 0], rotate: o.r, scale: 1 }}
          transition={{
            opacity: { duration: 0.8, delay: 0.1 + i * 0.15 },
            rotate: { type: 'spring', stiffness: 80, damping: 14, delay: 0.1 + i * 0.15 },
            scale: { type: 'spring', stiffness: 80, damping: 14, delay: 0.1 + i * 0.15 },
            y: { duration: o.dur, repeat: Infinity, ease: 'easeInOut', delay: o.delay },
          }}
          style={{ position: 'absolute', left: o.x, top: o.y, width: o.w, height: o.h }}
        >
          <svg width={o.w} height={o.h} style={{ overflow: 'visible' }}>
            <rect x="1" y="1" width={o.w - 2} height={o.h - 2} rx="14" fill={i === 2 ? 'rgba(20,10,46,0.55)' : 'rgba(20,10,46,0.25)'}
              stroke="url(#sp-stroke)" strokeWidth={i === 2 ? 2 : 1.6}
              style={{ filter: i === 2 ? 'drop-shadow(0 0 6px rgba(63,182,200,0.35))' : 'none' }} />
          </svg>
        </motion.div>
      ))}

      </>)}

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
        className="mono" style={{ position: 'absolute', top: 466, left: 0, right: 0, textAlign: 'center', fontSize: 10.5, letterSpacing: '0.24em', color: 'var(--label-3)' }}>
        <span style={{ color: 'var(--align)' }}>✦</span> RESETS AT 11:11 <span style={{ color: 'var(--align)' }}>✦</span>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
        className="h-display" style={{ position: 'absolute', top: 488, left: 0, right: 0, textAlign: 'center', fontSize: 34 }}>
        Your deck is spent
      </motion.div>
      <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
        style={{ position: 'absolute', top: 542, left: 40, right: 40, textAlign: 'center', fontSize: 15, lineHeight: 1.45, color: 'var(--label-2)' }}>
        {BETA ? 'Fifteen people, gone in one sitting. A new deal lands at 11:11. Until then, talk to who you aligned with.' : 'Fifteen people and three events, gone in one sitting. A new deal lands at 11:11. Align+ deals you 45 a night.'}
      </motion.p>

      <motion.button className="chrome-cta"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.6 }}
        whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.015 }}
        onClick={() => { sfx.tap(); go(BETA ? 'matches' : 'paywall') }}
        style={{ position: 'absolute', left: 38, top: 648, fontSize: 20 }}>
        {BETA ? 'Talk to your matches' : '45 a night with Align+'} <span className="spark">✦</span>
      </motion.button>
      {!BETA && <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
        onClick={() => { sfx.tap(); go('x/wait-reset') }}
        style={{ position: 'absolute', top: 710, left: 80, right: 80, height: 40, textAlign: 'center', fontSize: 15, color: 'var(--label-2)' }}>
        Wait for the 11:11 deal
      </motion.button>}

      <TabBar active="deck" go={go} />
    </div>
  )
}
