import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SIGNS, type SignId } from '../../data/signs'

/** Small sign-aura avatar — the moon sign's AuraCam glow in a circle. */
export function AuraAvatar({ sign, size = 40 }: { sign: SignId; size?: number }) {
  const s = SIGNS[sign]
  return (
    <div style={{
      width: size, height: size, borderRadius: size / 2, overflow: 'hidden', flexShrink: 0, position: 'relative',
      background: '#0b0620', boxShadow: `0 0 14px ${s.color}66, inset 0 0 0 1px ${s.color}55`,
    }}>
      <img src={s.auraImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 45%', transform: 'scale(1.35)' }} />
    </div>
  )
}

/** A count that pops whenever it changes. */
export function PopCount({ n, color }: { n: number; color?: string }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', minWidth: 14 }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={n}
          initial={{ y: -8, opacity: 0, scale: 1.4 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 520, damping: 26 }}
          style={{ display: 'inline-block', color }}>
          {n}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const BURST = [0, 60, 120, 180, 240, 300]

/** ♡ toggle with a pop and a little ring of sparks when liked. */
export function LikeButton({ liked, count, onToggle, size = 12 }: { liked: boolean; count: number; onToggle: () => void; size?: number }) {
  const [bursts, setBursts] = useState(0)
  return (
    <motion.button
      onClick={(e) => { e.stopPropagation(); if (!liked) setBursts((b) => b + 1); onToggle() }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.85 }}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: size, color: liked ? 'var(--rub)' : 'var(--label-2)', position: 'relative', padding: '4px 2px' }}
    >
      <span style={{ position: 'relative', display: 'inline-grid', placeItems: 'center' }}>
        <motion.svg key={liked ? 'on' : 'off'} width={size + 1} height={size + 1} viewBox="0 0 24 24"
          initial={liked ? { scale: 0.3 } : false} animate={{ scale: [liked ? 0.3 : 1, liked ? 1.45 : 1, 1] }}
          transition={{ duration: 0.38, times: [0, 0.55, 1] }}
          fill={liked ? 'var(--rub)' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinejoin="round"
          style={{ filter: liked ? 'drop-shadow(0 0 5px rgba(232,98,138,0.8))' : undefined }}>
          <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
        </motion.svg>
        <AnimatePresence>
          {liked && bursts > 0 && BURST.map((a) => (
            <motion.span key={`${bursts}-${a}`}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: Math.cos((a * Math.PI) / 180) * 13, y: Math.sin((a * Math.PI) / 180) * 13, opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ position: 'absolute', width: 3, height: 3, borderRadius: 2, background: a % 120 ? '#f2c75c' : 'var(--rub)', pointerEvents: 'none' }} />
          ))}
        </AnimatePresence>
      </span>
      <PopCount n={count} />
    </motion.button>
  )
}

export function SparkCount({ n, size = 12, onClick }: { n: number; size?: number; onClick?: () => void }) {
  return (
    <button onClick={(e) => { e.stopPropagation(); onClick?.() }}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: size, color: 'var(--label-2)', padding: '4px 2px' }}>
      <span style={{ fontSize: size + 1 }}>✦</span>
      <PopCount n={n} />
    </button>
  )
}
