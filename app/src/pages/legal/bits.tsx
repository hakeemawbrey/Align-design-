import { motion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'
import { CARD_BG, CARD_LINE } from '../../components/kit'
import { rise } from '../../components/onboarding/shared'
import { sfx } from '../../lib/sfx'

/** one 44px pill row in a stacked list (data export, rejected reasons, meet safely) */
export function Pill({ children, lead, right, onClick, style }: {
  children: ReactNode; lead?: ReactNode; right?: ReactNode; onClick?: () => void; style?: CSSProperties
}) {
  const Tag = onClick ? motion.button : motion.div
  return (
    <Tag onClick={onClick ? () => { sfx.tap(); onClick() } : undefined} whileTap={onClick ? { scale: 0.985 } : undefined}
      style={{
        width: '100%', minHeight: 44, borderRadius: 14, background: CARD_BG, border: CARD_LINE,
        display: 'flex', alignItems: 'center', gap: 14, padding: '0 16px', textAlign: 'left', ...style,
      }}>
      {lead}
      <span style={{ flex: 1, minWidth: 0, fontSize: 15, color: 'var(--label-1)' }}>{children}</span>
      {right}
    </Tag>
  )
}

export function PillList({ children }: { children: ReactNode }) {
  return <div style={{ display: 'grid', gap: 8 }}>{children}</div>
}

/** two-line italic display title */
export function Title2({ lines, size = 30, style }: { lines: [string, string]; size?: number; style?: CSSProperties }) {
  return (
    <motion.h1 className="h-display" {...rise(0.12)} style={{ fontSize: size, lineHeight: 1.12, ...style }}>
      {lines[0]}<br />{lines[1]}
    </motion.h1>
  )
}

/** centred title + body block for the result screens (verified, report sent, delete) */
export function CenterMessage({ top, icon, title, body, bodyWidth = 330 }: { top: number; icon?: ReactNode; title: [string, string]; body: ReactNode; bodyWidth?: number }) {
  return (
    <div style={{ position: 'absolute', left: 24, right: 24, top, textAlign: 'center' }}>
      {icon && <motion.div {...rise(0.05, 8)} style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>{icon}</motion.div>}
      <Title2 lines={title} size={28} />
      <motion.p {...rise(0.22)} style={{ margin: '12px auto 0', maxWidth: bodyWidth, fontSize: 13, lineHeight: 1.5, color: 'var(--label-2)' }}>{body}</motion.p>
    </div>
  )
}

/** serif italic text for a quiet caption link */
export const serifCaption: CSSProperties = { fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 17, color: 'var(--label-2)' }
