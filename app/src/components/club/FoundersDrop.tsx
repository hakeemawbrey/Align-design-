import { motion } from 'framer-motion'
import FoundingCard from '../paywall/FoundingCard'

/** Serialized founders card edition — Houston launch. */
export const FOUNDERS_EDITION = { serial: 112, of: 1111, claimed: 1047 }

const pad = (n: number) => String(n).padStart(4, '0')

interface Props {
  /** you already hold one (Align+ founding member) */
  owned: boolean
  onClaim: () => void
}

/** Pinned post at the top of the room: the serialized founders card drop. */
export default function FoundersDrop({ owned, onClaim }: Props) {
  const { serial, of, claimed } = FOUNDERS_EDITION
  const left = of - claimed
  return (
    <div style={{
      position: 'relative', padding: '14px 16px 16px', overflow: 'hidden',
      background: 'radial-gradient(80% 70% at 20% 40%, rgba(242,199,92,0.16), transparent 70%), rgba(40,24,76,0.6)',
      borderBottom: '1px solid rgba(242,199,92,0.28)',
    }}>
      <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 8.5, letterSpacing: '0.2em', color: 'var(--align)' }}>
        <span>✦ PINNED · ALIGN FOUNDERS</span>
        <span style={{ color: 'var(--label-3)' }}>HOUSTON</span>
      </div>

      <div style={{ display: 'flex', gap: 14, marginTop: 12, alignItems: 'center' }}>
        {/* the card, scaled from 236×316 */}
        <motion.div whileHover={{ rotate: -2, y: -3 }} onClick={onClaim}
          style={{ width: 118, height: 158, flexShrink: 0, cursor: 'pointer', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, transform: 'scale(0.5)', transformOrigin: 'top left' }}>
            <FoundingCard title="Founders card" serial={`№ ${pad(serial)}`} />
          </div>
        </motion.div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="serif italic" style={{ fontSize: 20, lineHeight: 1.1, color: 'var(--label-1)' }}>The founders card.</div>
          <div style={{ fontSize: 12, lineHeight: 1.4, color: 'var(--label-2)', marginTop: 6 }}>
            Serialized for the first {of.toLocaleString('en-US')} in Houston. Never reissued, and it trades like any card.
          </div>
          <div className="mono" style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 8.5, letterSpacing: '0.14em', color: 'var(--label-3)' }}>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{claimed.toLocaleString('en-US')} CLAIMED</span>
            <span style={{ color: 'var(--rub)' }}>{left} LEFT</span>
          </div>
          <div style={{ height: 4, borderRadius: 2, marginTop: 5, background: 'rgba(179,166,196,0.18)', overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${(claimed / of) * 100}%` }} transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              style={{ height: '100%', borderRadius: 2, background: 'var(--gold-foil)' }} />
          </div>
          <motion.button onClick={onClaim} whileTap={{ scale: 0.96 }} className="mono"
            style={{
              marginTop: 12, padding: '7px 12px', borderRadius: 999, fontSize: 9, letterSpacing: '0.16em', fontWeight: 700,
              color: owned ? 'var(--align)' : '#2a1a05',
              background: owned ? 'rgba(242,199,92,0.12)' : 'var(--gold-foil)',
              border: owned ? '1px solid rgba(242,199,92,0.5)' : 'none',
            }}>
            {owned ? `✦ YOURS · № ${pad(serial)} / ${of.toLocaleString('en-US')}` : 'CLAIM YOURS ›'}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
