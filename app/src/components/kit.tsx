import { motion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'
import Starfield from './Starfield'
import { BackChevron, rise, EASE } from './onboarding/shared'
import { CloseX } from './paywall/bits'
import { sfx } from '../lib/sfx'

/**
 * The page kit: the shell and parts the G-, L-, SF-, P- and system screens share.
 * One chrome CTA per page, mono eyebrows, italic serif titles, sans body.
 */

export const CARD_BG = 'rgba(52,35,95,0.6)'
export const CARD_LINE = '1px solid rgba(179,166,196,0.16)'

export function PageShell({
  eyebrow, title, body, onBack, close, topBar, align = 'left', cta, caption, footer, children, scroll = true, titleSize = 30, aurora = null, warm = null,
}: {
  eyebrow?: ReactNode
  title?: ReactNode
  body?: ReactNode
  /** chevron top-left */
  onBack?: () => void
  /** × top-right instead of (or as well as) the chevron */
  close?: () => void
  /** small centred bar title, e.g. 'Permissions' */
  topBar?: ReactNode
  align?: 'left' | 'center'
  cta?: { label: ReactNode; onClick: () => void; disabled?: boolean }
  caption?: { label: ReactNode; onClick?: () => void }
  /** tiny mono line at the very bottom, e.g. 'NO PASSWORDS. EVER.' */
  footer?: ReactNode
  children?: ReactNode
  scroll?: boolean
  titleSize?: number
  aurora?: string | null
  warm?: string | null
}) {
  const bottom = (cta ? 92 : 0) + (caption ? 34 : 0) + (footer ? 26 : 0) + 30
  const center = align === 'center'
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora={aurora} warm={warm} count={60} seed={41} />
      {onBack && <BackChevron onClick={() => { sfx.tap(); onBack() }} />}
      {close && <CloseX side="right" onClick={() => { sfx.tap(); close() }} />}
      {topBar && (
        <div style={{ position: 'absolute', top: 66, left: 0, right: 0, textAlign: 'center', fontSize: 13, fontWeight: 600, color: 'var(--label-1)' }}>{topBar}</div>
      )}
      <div className="no-scrollbar" style={{
        position: 'absolute', left: 0, right: 0, top: 104, bottom, overflowY: scroll ? 'auto' : 'hidden', scrollbarWidth: 'none',
        padding: '0 24px 24px', textAlign: center ? 'center' : 'left',
      }}>
        {eyebrow && <motion.div className="eyebrow" {...rise(0.05, 8)} style={{ color: 'var(--label-3)', letterSpacing: '0.2em' }}>{eyebrow}</motion.div>}
        {title && (
          <motion.h1 className="h-display" {...rise(0.12)} style={{ marginTop: eyebrow ? 8 : 0, fontSize: titleSize, lineHeight: 1.12 }}>{title}</motion.h1>
        )}
        {body && (
          <motion.p {...rise(0.2)} style={{ margin: '10px 0 0', fontSize: 14.5, lineHeight: 1.45, color: 'var(--label-2)', ...(center ? { marginLeft: 'auto', marginRight: 'auto', maxWidth: 320 } : {}) }}>{body}</motion.p>
        )}
        <motion.div {...rise(0.28)} style={{ marginTop: title || body ? 22 : 0 }}>{children}</motion.div>
      </div>
      {cta && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
          style={{ position: 'absolute', left: 38, width: 314, bottom: bottom - 92 + 8, zIndex: 20 }}>
          <motion.button className="chrome-cta" onClick={() => { if (cta.disabled) { sfx.deny(); return } sfx.tap(); cta.onClick() }}
            whileTap={{ scale: 0.97 }} style={{ opacity: cta.disabled ? 0.45 : 1 }}>
            {cta.label} <span className="spark">✦</span>
          </motion.button>
        </motion.div>
      )}
      {caption && (
        <motion.button {...rise(0.5, 6)} onClick={caption.onClick ? () => { sfx.tap(); caption.onClick!() } : undefined}
          style={{ position: 'absolute', left: 0, right: 0, bottom: (footer ? 26 : 0) + 34, textAlign: 'center', fontSize: 13.5, color: caption.onClick ? 'var(--label-2)' : 'var(--label-3)', cursor: caption.onClick ? 'pointer' : 'default' }}>
          {caption.label}
        </motion.button>
      )}
      {footer && (
        <div className="mono" style={{ position: 'absolute', left: 0, right: 0, bottom: 34, textAlign: 'center', fontSize: 8.5, letterSpacing: '0.2em', color: 'var(--label-4)', textTransform: 'uppercase' }}>{footer}</div>
      )}
    </div>
  )
}

/** mono section label above a group of rows */
export function Label({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--label-3)', textTransform: 'uppercase', margin: '18px 0 8px', ...style }}>{children}</div>
}

/** rounded card of rows with hairline dividers */
export function Group({ label, children, style }: { label?: ReactNode; children: ReactNode; style?: CSSProperties }) {
  return (
    <>
      {label && <Label>{label}</Label>}
      <div style={{ borderRadius: 16, background: CARD_BG, border: CARD_LINE, overflow: 'hidden', ...style }}>{children}</div>
    </>
  )
}

export function Row({ label, value, sub, onClick, chevron = !!onClick, danger, right, icon }: {
  label: ReactNode; value?: ReactNode; sub?: ReactNode; onClick?: () => void; chevron?: boolean; danger?: boolean; right?: ReactNode; icon?: ReactNode
}) {
  const Tag = onClick ? motion.button : motion.div
  return (
    <Tag onClick={onClick ? () => { sfx.tap(); onClick() } : undefined} whileTap={onClick ? { scale: 0.985 } : undefined}
      style={{ width: '100%', minHeight: 48, display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', textAlign: 'left' }}
      className="kit-row">
      {icon}
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: 15, color: danger ? '#ff8a8a' : 'var(--label-1)' }}>{label}</span>
        {sub && <span style={{ display: 'block', fontSize: 12.5, color: 'var(--label-3)', marginTop: 2, lineHeight: 1.35 }}>{sub}</span>}
      </span>
      {value != null && <span style={{ fontSize: 13, color: 'var(--label-3)', textAlign: 'right' }}>{value}</span>}
      {right}
      {chevron && <svg width="7" height="12" viewBox="0 0 7 12" fill="none" stroke="var(--label-3)" strokeWidth="1.6" strokeLinecap="round" style={{ flexShrink: 0 }}><path d="m1 1 5 5-5 5" /></svg>}
    </Tag>
  )
}

export function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button role="switch" aria-checked={on} onClick={(e) => { e.stopPropagation(); sfx.tap(); onChange(!on) }}
      style={{ width: 46, height: 28, borderRadius: 14, flexShrink: 0, position: 'relative', background: on ? 'var(--chrome)' : 'rgba(179,166,196,0.22)', transition: 'background .2s' }}>
      <motion.span animate={{ x: on ? 20 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 34 }}
        style={{ position: 'absolute', top: 2, left: 0, width: 24, height: 24, borderRadius: 12, background: on ? '#2a1a4a' : '#efe6d6' }} />
    </button>
  )
}

export function Field({ label, value, onChange, placeholder, prefix, type = 'text', autoFocus }: {
  label?: ReactNode; value: string; onChange: (v: string) => void; placeholder?: string; prefix?: ReactNode; type?: string; autoFocus?: boolean
}) {
  return (
    <label style={{ display: 'block' }}>
      {label && <Label style={{ marginTop: 0 }}>{label}</Label>}
      <span style={{ display: 'flex', alignItems: 'center', gap: 10, height: 50, padding: '0 16px', borderRadius: 14, background: CARD_BG, border: CARD_LINE }}>
        {prefix && <span style={{ fontSize: 15, color: 'var(--label-1)' }}>{prefix}</span>}
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} type={type} autoFocus={autoFocus}
          style={{ flex: 1, minWidth: 0, background: 'none', border: 0, outline: 'none', color: 'var(--label-1)', fontSize: 15, fontFamily: 'inherit' }} />
      </span>
    </label>
  )
}

/** a plain paragraph in the page's body voice */
export function P({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <p style={{ margin: '0 0 12px', fontSize: 14, lineHeight: 1.5, color: 'var(--label-2)', ...style }}>{children}</p>
}

/** a quiet text link in the house style */
export function TextLink({ children, onClick, style }: { children: ReactNode; onClick: () => void; style?: CSSProperties }) {
  return <button onClick={() => { sfx.tap(); onClick() }} style={{ fontSize: 13.5, color: 'var(--label-2)', textDecoration: 'underline', textUnderlineOffset: 3, ...style }}>{children}</button>
}

/** a small toast that floats above the CTA */
export function Toast({ text }: { text: string | null }) {
  return text ? (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      style={{ position: 'absolute', left: 24, right: 24, bottom: 150, zIndex: 40, padding: '11px 14px', borderRadius: 14, background: 'rgba(30,18,58,0.95)', border: CARD_LINE, fontSize: 13, color: 'var(--label-1)', textAlign: 'center' }}>
      {text}
    </motion.div>
  ) : null
}
