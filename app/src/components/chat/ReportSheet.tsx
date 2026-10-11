import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { sfx } from '../../lib/sfx'

type Action = 'report' | 'unmatch' | 'block'
const REASONS = ['Harassment', 'Fake chart', 'Underage', 'Something else']

interface Props {
  name: string
  pronoun?: 'her' | 'him' | 'them'
  onClose: () => void
  /** called once the action is confirmed and its confirmation has shown */
  onDone: (a: Action) => void
}

/** G-11 Report / Block. Reporting also blocks, automatically. */
export default function ReportSheet({ name, pronoun = 'her', onClose, onDone }: Props) {
  const [done, setDone] = useState<{ a: Action; reason?: string } | null>(null)

  const finish = (a: Action, reason?: string) => {
    sfx.deny()
    setDone({ a, reason })
    window.setTimeout(() => onDone(a), 1700)
  }

  const row = (label: string, onClick: () => void, note?: string) => (
    <motion.button key={label} onClick={onClick} whileTap={{ scale: 0.98 }}
      style={{ width: '100%', height: 48, borderRadius: 16, padding: '0 16px', display: 'flex', alignItems: 'center', background: 'rgba(52,35,95,0.65)', border: '1px solid rgba(179,166,196,0.18)', textAlign: 'left' }}>
      <span style={{ flex: 1, fontSize: 15, color: 'var(--label-1)' }}>{label}</span>
      {note && <span style={{ fontSize: 12.5, color: 'var(--label-3)', marginRight: 10 }}>{note}</span>}
      <svg width="7" height="12" viewBox="0 0 7 12" fill="none" stroke="var(--label-3)" strokeWidth="1.6" strokeLinecap="round"><path d="m1 1 5 5-5 5" /></svg>
    </motion.button>
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'rgba(11,6,32,0.97)' }}>
      <div style={{ position: 'absolute', top: 66, left: 0, right: 0, textAlign: 'center', fontSize: 14, fontWeight: 600, color: 'var(--label-1)' }}>{name}</div>
      <button aria-label="Close" onClick={() => { sfx.tap(); onClose() }}
        style={{ position: 'absolute', right: 16, top: 56, width: 40, height: 40, display: 'grid', placeItems: 'center', color: 'var(--label-1)' }}>
        <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M1 1l12 12M13 1 1 13" /></svg>
      </button>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div key="menu" exit={{ opacity: 0, y: -10 }} style={{ position: 'absolute', left: 24, right: 24, top: 108 }}>
            <div className="h-display" style={{ fontSize: 26 }}>Something off?</div>
            <div style={{ fontSize: 13.5, lineHeight: 1.4, color: 'var(--label-2)', marginTop: 8 }}>They are never told, whichever you pick.</div>

            <div className="mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--label-3)', margin: '22px 0 8px' }}>REPORT · REVIEWED WITHIN 24H</div>
            <div style={{ display: 'grid', gap: 6 }}>
              {REASONS.map((r) => row(r, () => finish('report', r)))}
            </div>

            <div className="mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--label-3)', margin: '22px 0 8px' }}>OR JUST LEAVE</div>
            <div style={{ display: 'grid', gap: 6 }}>
              {row('Unmatch', () => finish('unmatch'), 'The card closes')}
              {row('Block', () => finish('block'), 'Permanent')}
            </div>
          </motion.div>
        ) : (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
            style={{ position: 'absolute', left: 24, right: 24, top: 270, textAlign: 'center' }}>
            <div style={{ width: 54, height: 54, borderRadius: 27, margin: '0 auto', display: 'grid', placeItems: 'center', background: 'rgba(232,98,138,0.15)', boxShadow: 'inset 0 0 0 1px rgba(232,98,138,0.5)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e8628a" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M5.6 5.6l12.8 12.8" /></svg>
            </div>
            <div className="h-display" style={{ fontSize: 26, marginTop: 16 }}>
              {done.a === 'unmatch' ? `${name}’s card is closed.` : `${name} is blocked.`}
            </div>
            <div style={{ fontSize: 13.5, lineHeight: 1.45, color: 'var(--label-2)', marginTop: 8, textWrap: 'balance' }}>
              {done.a === 'report'
                ? `Thanks. We’ll review “${done.reason}” within 24 hours. You won’t see ${pronoun} again, and ${pronoun === 'them' ? 'they’re' : pronoun === 'him' ? 'he’s' : 'she’s'} never told.`
                : done.a === 'unmatch'
                  ? 'The chat is gone for both of you. Nobody is told why.'
                  : `You won’t see ${pronoun} again, anywhere in Align. Nobody is told.`}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!done && (
        <div style={{ position: 'absolute', left: 0, right: 0, top: 650, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <motion.button className="chrome-cta" whileTap={{ scale: 0.97 }} onClick={() => finish('block')}>
            Block {name}
          </motion.button>
          <div className="mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--label-3)' }}>REPORTING ALSO BLOCKS, AUTOMATICALLY</div>
          <button onClick={() => { sfx.tap(); onClose() }} style={{ fontSize: 14, color: 'var(--label-2)', height: 36, padding: '0 14px' }}>Never mind</button>
        </div>
      )}
    </motion.div>
  )
}
