import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import Starfield from '../../components/Starfield'
import { BackChevron, EASE, rise } from '../../components/onboarding/shared'
import { CloseX } from '../../components/paywall/bits'
import { CARD_BG, CARD_LINE } from '../../components/kit'
import { sfx } from '../../lib/sfx'

/** Figma frames are 874 tall; bottom-anchored items sit 30px higher on the 844 canvas */
export const CTA_TOP = 638

/** the full-screen frame every plus page sits in: starfield, back / close, a small bar title */
export function Frame({ children, onBack, onClose, bar, aurora = null, warm = null, seed = 41, bg }: {
  children?: ReactNode; onBack?: () => void; onClose?: () => void; bar?: ReactNode
  aurora?: string | null; warm?: string | null; seed?: number; bg?: ReactNode
}) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {bg ?? <Starfield aurora={aurora} warm={warm} count={60} seed={seed} />}
      {onBack && <BackChevron onClick={() => { sfx.tap(); onBack() }} />}
      {onClose && <CloseX side="right" onClick={() => { sfx.tap(); onClose() }} />}
      {bar && (
        <div style={{ position: 'absolute', top: 56, height: 40, left: 64, right: 64, display: 'grid', placeItems: 'center', fontSize: 13.5, fontWeight: 600, color: 'var(--label-1)', zIndex: 10 }}>{bar}</div>
      )}
      {children}
    </div>
  )
}

/** the one pearl CTA */
export function Cta({ children, onClick, top = CTA_TOP, delay = 0.4, disabled }: { children: ReactNode; onClick: () => void; top?: number; delay?: number; disabled?: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.6, ease: EASE }}
      style={{ position: 'absolute', top, left: 38, width: 314, zIndex: 20 }}>
      <motion.button className="chrome-cta" whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.015, boxShadow: '0 0 44px rgba(248,237,255,0.55), inset 0 1px 0 rgba(255,255,255,0.9)' }}
        onClick={() => { if (disabled) { sfx.deny(); return } sfx.tap(); onClick() }}
        style={{ opacity: disabled ? 0.5 : 1 }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={typeof children === 'string' ? children : 'cta'} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.16 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            {children} <span className="spark">✦</span>
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </motion.div>
  )
}

/** quiet secondary: glass with a hairline, serif italic like the CTA */
export function GhostCta({ children, onClick, top = CTA_TOP }: { children: ReactNode; onClick: () => void; top?: number }) {
  return (
    <motion.button {...rise(0.45, 12)} whileTap={{ scale: 0.97 }} onClick={() => { sfx.tap(); onClick() }}
      style={{
        position: 'absolute', top, left: 38, width: 314, height: 54, borderRadius: 999, zIndex: 20,
        background: 'rgba(52,35,95,0.45)', border: '1px solid rgba(179,166,196,0.35)',
        fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 19, color: 'var(--label-1)',
      }}>
      {children}
    </motion.button>
  )
}

/** a quiet text action under the CTA */
export function Quiet({ children, onClick, top = CTA_TOP + 70, underline, style }: { children: ReactNode; onClick?: () => void; top?: number; underline?: boolean; style?: CSSProperties }) {
  return (
    <motion.button {...rise(0.55, 6)} onClick={onClick ? () => { sfx.tap(); onClick() } : undefined}
      style={{
        position: 'absolute', top, left: 40, right: 40, height: 36, textAlign: 'center', fontSize: 13.5, zIndex: 20,
        color: onClick ? 'var(--label-2)' : 'var(--label-3)', cursor: onClick ? 'pointer' : 'default',
        textDecoration: underline ? 'underline' : 'none', textUnderlineOffset: 3, ...style,
      }}>
      {children}
    </motion.button>
  )
}

/** mono eyebrow */
export function Eyebrow({ children, style, delay = 0.05 }: { children: ReactNode; style?: CSSProperties; delay?: number }) {
  return <motion.div className="eyebrow" {...rise(delay, 8)} style={{ fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--label-3)', ...style }}>{children}</motion.div>
}

/** a hairline panel */
export function Panel({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div style={{ borderRadius: 16, background: CARD_BG, border: CARD_LINE, ...style }}>{children}</div>
}

/** glass pill toast, centred above the CTA */
export function PillToast({ text, bottom = 222 }: { text: string | null; bottom?: number }) {
  return (
    <AnimatePresence>
      {text && (
        <motion.div key={text} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          style={{ position: 'absolute', left: 0, right: 0, bottom, display: 'flex', justifyContent: 'center', pointerEvents: 'none', zIndex: 40 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, maxWidth: 342, minHeight: 38, padding: '9px 18px', borderRadius: 999, fontSize: 13.5, lineHeight: 1.35, color: 'var(--label-1)', textAlign: 'center',
            background: 'rgba(40,26,78,0.9)', border: '1px solid rgba(179,166,196,0.22)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
          }}><span style={{ color: 'var(--align)' }}>✦</span>{text}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** a toast that clears itself */
export function useToast(ms = 2400) {
  const [text, setText] = useState<string | null>(null)
  const t = useRef(0)
  useEffect(() => () => window.clearTimeout(t.current), [])
  const show = (s: string) => {
    setText(s)
    window.clearTimeout(t.current)
    t.current = window.setTimeout(() => setText(null), ms)
  }
  return [text, show] as const
}
