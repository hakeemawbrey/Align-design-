import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export const EASE = [0.2, 0.7, 0.2, 1] as const

/** fade + rise, the house entrance */
export const rise = (delay: number, y = 14) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: EASE },
})

/** y positions (844 canvas; Figma frames are 874, bottom-anchored items moved up 30) */
export const Y = {
  progress: 593,
  cta: 638,
  caption: 719,
}

/** The one chrome CTA per screen */
export function Cta({ children, onClick, delay = 0.5, show = true }: { children: ReactNode; onClick: () => void; delay?: number; show?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ delay: show ? delay : 0, duration: 0.6, ease: EASE }}
      style={{ position: 'absolute', top: Y.cta, left: 38, width: 314, pointerEvents: show ? 'auto' : 'none', zIndex: 20 }}
    >
      <motion.button
        className="chrome-cta"
        onClick={onClick}
        whileHover={{ scale: 1.02, boxShadow: '0 0 44px rgba(248, 237, 255, 0.55), inset 0 1px 0 rgba(255,255,255,0.9)' }}
        whileTap={{ scale: 0.97 }}
      >
        {children} <span className="spark">✦</span>
      </motion.button>
    </motion.div>
  )
}

export function Caption({ children, delay = 0.7, top = Y.caption, onClick }: { children: ReactNode; delay?: number; top?: number; onClick?: () => void }) {
  const Tag = onClick ? motion.button : motion.div
  return (
    <Tag
      {...rise(delay, 8)}
      onClick={onClick}
      whileHover={onClick ? { color: '#efe6d6' } : undefined}
      style={{
        position: 'absolute', top, left: 0, width: '100%', textAlign: 'center',
        fontSize: 14, color: onClick ? 'var(--label-2)' : 'var(--label-3)', zIndex: 20,
      }}
    >
      {children}
    </Tag>
  )
}

/** Eyebrow + italic display title + serif body, centred — the header block every step shares. */
export function Header({ eyebrow, title, body, top = 104, titleSize = 31, bodyWidth = 320, bodyStyle }: {
  eyebrow?: ReactNode; title: ReactNode; body?: ReactNode; top?: number; titleSize?: number; bodyWidth?: number; bodyStyle?: React.CSSProperties
}) {
  return (
    <div style={{ position: 'absolute', top, left: 0, width: '100%', textAlign: 'center' }}>
      {eyebrow && <motion.div className="eyebrow" {...rise(0.05, 8)} style={{ color: 'var(--label-3)', letterSpacing: '0.2em' }}>{eyebrow}</motion.div>}
      <motion.h1 className="h-display" {...rise(0.14)}
        style={{ marginTop: 8, fontSize: titleSize, lineHeight: 1.12, color: 'var(--label-1)' }}>
        {title}
      </motion.h1>
      {body && (
        <motion.p className="serif" {...rise(0.26)}
          style={{ margin: '14px auto 0', width: bodyWidth, fontSize: 16.5, lineHeight: 1.6, color: 'var(--label-2)', ...bodyStyle }}>
          {body}
        </motion.p>
      )}
    </div>
  )
}

/** Glossy planet sphere: specular highlight, terminator shadow, rim light and a halo. */
export function Planet({ size, color, light, dark = '#140a2e', glow = 0.55, ring, style }: {
  size: number; color: string; light: string; dark?: string; glow?: number; ring?: string; style?: React.CSSProperties
}) {
  return (
    <div style={{ position: 'relative', width: size, height: size, ...style }}>
      {/* halo */}
      <div style={{
        position: 'absolute', inset: -size * 0.45, borderRadius: '50%', pointerEvents: 'none',
        background: `radial-gradient(closest-side, ${color}${Math.round(glow * 160).toString(16).padStart(2, '0')} 0%, ${color}22 55%, transparent 100%)`,
      }} />
      {ring && (
        <div style={{
          position: 'absolute', left: -size * 0.32, right: -size * 0.32, top: size * 0.36, height: size * 0.3,
          borderRadius: '50%', border: `1.3px solid ${ring}`, transform: 'rotate(-12deg)', opacity: 0.85,
          clipPath: 'polygon(0 45%, 100% 45%, 100% 100%, 0 100%)', zIndex: 2,
        }} />
      )}
      {ring && (
        <div style={{
          position: 'absolute', left: -size * 0.32, right: -size * 0.32, top: size * 0.36, height: size * 0.3,
          borderRadius: '50%', border: `1.3px solid ${ring}`, transform: 'rotate(-12deg)', opacity: 0.6,
        }} />
      )}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%', zIndex: 1,
        background: `radial-gradient(circle at 34% 28%, #ffffff 0%, ${light} 14%, ${color} 46%, ${dark} 100%)`,
        boxShadow: `inset -${size * 0.08}px -${size * 0.1}px ${size * 0.18}px rgba(10,4,30,0.55), inset ${size * 0.03}px ${size * 0.03}px ${size * 0.06}px rgba(255,255,255,0.35), 0 0 ${size * 0.35}px ${color}88`,
      }} />
    </div>
  )
}

export const RAINBOW = ['#ff3b46', '#ff9a4a', '#ffe14a', '#5fdc54', '#3fc4f0', '#b45cff']

/** Six thin rainbow segments; `filled` of them lit. */
export function Progress({ filled }: { filled: number }) {
  return (
    <div style={{ position: 'absolute', top: Y.progress, left: 38, width: 314, display: 'flex', gap: 6, zIndex: 10 }}>
      {RAINBOW.map((c, i) => (
        <div key={i} style={{ flex: 1, height: 2, borderRadius: 1, background: 'rgba(179,166,196,0.22)', overflow: 'hidden', position: 'relative' }}>
          <motion.div
            initial={false}
            animate={{ scaleX: i < filled ? 1 : 0 }}
            transition={{ duration: 0.6, delay: i < filled ? 0.15 + Math.max(0, i - (filled - 1)) * 0.1 : 0, ease: EASE }}
            style={{ position: 'absolute', inset: 0, background: c, transformOrigin: 'left center', boxShadow: `0 0 8px ${c}` }}
          />
        </div>
      ))}
    </div>
  )
}

export function BackChevron({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      aria-label="Back"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.12, x: -2 }}
      whileTap={{ scale: 0.9 }}
      style={{ position: 'absolute', left: 14, top: 58, width: 40, height: 40, display: 'grid', placeItems: 'center', zIndex: 50 }}
    >
      <svg width="12" height="20" viewBox="0 0 12 20"><path d="M10 2 2 10l8 8" fill="none" stroke="#efe6d6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </motion.button>
  )
}
