import { motion } from 'framer-motion'

/** gold stamp-in check, path drawn after the circle lands */
export function CheckStamp({ delay, size = 22 }: { delay: number; size?: number }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 24 24"
      initial={{ scale: 0, rotate: -40, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 520, damping: 16, delay }}
      style={{ flex: 'none', filter: 'drop-shadow(0 0 6px rgba(242,199,92,0.55))' }}>
      <defs>
        <linearGradient id="pw-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff4cf" />
          <stop offset="0.45" stopColor="#f2c75c" />
          <stop offset="1" stopColor="#b88a2c" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="11" fill="url(#pw-gold)" />
      <motion.path d="M6.8 12.4l3.4 3.3 7-7.4" fill="none" stroke="#3a2c4e" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.28, delay: delay + 0.14, ease: 'easeOut' }} />
    </motion.svg>
  )
}

/** back chevron: 40×40 at left 16 / top 56, 11×18 glyph (the app-wide back button) */
export function Chevron({ onClick }: { onClick: () => void }) {
  return (
    <motion.button whileTap={{ scale: 0.88 }} whileHover={{ x: -2 }} onClick={onClick} aria-label="Back"
      style={{ position: 'absolute', left: 16, top: 56, width: 40, height: 40, display: 'grid', placeItems: 'center', zIndex: 20 }}>
      <svg width="11" height="18" viewBox="0 0 12 20"><path d="M10 2 2 10l8 8" fill="none" stroke="#efe6d6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </motion.button>
  )
}

export function CloseX({ onClick, side = 'left' }: { onClick: () => void; side?: 'left' | 'right' }) {
  return (
    <motion.button whileTap={{ scale: 0.88 }} whileHover={{ rotate: 90 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      onClick={onClick} aria-label="Close"
      style={{ position: 'absolute', [side]: 16, top: 56, width: 40, height: 40, display: 'grid', placeItems: 'center', zIndex: 20 }}>
      <svg width="14" height="14" viewBox="0 0 14 14"><path d="M1 1l12 12M13 1 1 13" stroke="#b3a6c4" strokeWidth="1.6" strokeLinecap="round" /></svg>
    </motion.button>
  )
}
