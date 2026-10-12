import { motion } from 'framer-motion'
import type { PageProps } from '../types'
import { rise } from '../../components/onboarding/shared'
import { CARD_BG, CARD_LINE, Label } from '../../components/kit'
import { sfx } from '../../lib/sfx'
import { Eyebrow, Frame, PillToast, Quiet, useToast } from './ui'

const RENEWS = 'Aug 8'

/** G-13 — Manage Align+: your plan, the other plans, cancel. Opened from Settings. */
export default function ManagePlus({ go, back }: PageProps) {
  const [toast, show] = useToast(2600)

  const planRow = (label: string, right: React.ReactNode, onClick?: () => void) => {
    const Tag = onClick ? motion.button : motion.div
    return (
      <Tag whileTap={onClick ? { scale: 0.985 } : undefined} onClick={onClick ? () => { sfx.tap(); onClick() } : undefined}
        style={{ width: '100%', height: 44, borderRadius: 14, padding: '0 16px', display: 'flex', alignItems: 'center', textAlign: 'left', background: CARD_BG, border: CARD_LINE }}>
        <span style={{ flex: 1, fontSize: 15, color: 'var(--label-1)' }}>{label}</span>
        {right}
      </Tag>
    )
  }
  const chev = <svg width="7" height="12" viewBox="0 0 7 12" fill="none" stroke="var(--label-3)" strokeWidth="1.6" strokeLinecap="round" style={{ marginLeft: 10 }}><path d="m1 1 5 5-5 5" /></svg>

  return (
    <Frame onBack={back} bar="Manage Align+" seed={47}>
      <div style={{ position: 'absolute', top: 100, left: 24, right: 24, textAlign: 'center' }}>
        <Eyebrow>Your membership</Eyebrow>
        <motion.h1 className="h-display" {...rise(0.12)} style={{ fontSize: 27, lineHeight: 1.15, marginTop: 8 }}>Align+, yearly. Renews {RENEWS}.</motion.h1>
      </div>

      <motion.div {...rise(0.2)} style={{ position: 'absolute', top: 166, left: 24, right: 24 }}>
        <Label>Your plan</Label>
        {planRow('Yearly · $88.88', <span style={{ fontSize: 13, color: 'var(--label-3)' }}>Current</span>)}
        <div style={{ fontSize: 12.5, color: 'var(--label-3)', margin: '8px 16px 0' }}>Founding price · works out to $7.41 a month.</div>

        <Label style={{ marginTop: 22 }}>Other plans</Label>
        <div style={{ display: 'grid', gap: 8 }}>
          {planRow('Monthly · $14.44', <><span style={{ fontSize: 13, color: 'var(--label-3)' }}>Switch</span>{chev}</>,
            () => show(`Switches to monthly when this year ends, ${RENEWS}.`))}
          {planRow('Restore purchases', chev, () => go('x/restore'))}
        </div>

        <Label style={{ marginTop: 22 }}>Included</Label>
        <p style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--label-1)', opacity: 0.9 }}>
          45 cards a night · 33 peeks a week · 3 packs a day · real packs every season · block any sign · priority in tonight’s decks.
        </p>
      </motion.div>

      <PillToast text={toast} bottom={170} />
      <div className="mono" style={{ position: 'absolute', top: 686, left: 0, right: 0, textAlign: 'center', fontSize: 8.5, lineHeight: 1.9, letterSpacing: '0.18em', color: 'var(--label-3)' }}>
        CANCEL ANYTIME · KEEPS WORKING TILL {RENEWS.toUpperCase()}<br />MANAGED THROUGH THE APP STORE
      </div>
      <Quiet top={738} onClick={() => show(`Cancel in the App Store. Align+ keeps working till ${RENEWS}.`)} style={{ color: 'var(--label-1)', fontSize: 14 }}>Cancel Align+</Quiet>
    </Frame>
  )
}
