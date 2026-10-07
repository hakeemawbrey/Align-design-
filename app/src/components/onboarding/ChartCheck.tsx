import { motion } from 'framer-motion'
import { SIGNS, type SignId } from '../../data/signs'
import { sfx } from '../../lib/sfx'
import { Caption, Cta, Header, EASE } from './shared'
import { MONTHS, type BirthDate } from './zodiac'
import { BIRTH_PLACE, timeLabel, wantLine, type BirthTime } from './readings'

/** O-08 — "Here is what the sky said about you." Six facts; tap one to fix it. */
export default function ChartCheck({ birth, time, sun, moon, rising, next, edit }: {
  birth: BirthDate; time: BirthTime; sun: SignId; moon: SignId; rising: SignId; next: () => void; edit: (what: 'date' | 'time') => void
}) {
  const rows: { k: string; v: string; fix: 'date' | 'time' }[] = [
    { k: 'Sun', v: SIGNS[sun].name, fix: 'date' },
    { k: 'Moon', v: SIGNS[moon].name, fix: 'date' },
    { k: 'Rising', v: SIGNS[rising].name + (time.exact ? '' : ' (est.)'), fix: 'time' },
    { k: 'Born', v: `${birth.day} ${MONTHS[birth.month]} ${birth.year}`, fix: 'date' },
    { k: 'Time', v: timeLabel(time), fix: 'time' },
    { k: 'Place', v: BIRTH_PLACE, fix: 'time' },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Header
        eyebrow="Chart check · Read it back"
        title={<>Here is what the<br />sky said about you.</>}
        body="Six facts. If one is wrong, tap it — the rest of the night depends on these."
        bodyStyle={{ marginTop: 8, fontSize: 15.5, lineHeight: 1.45 }}
      />
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
        style={{
          position: 'absolute', top: 262, left: 24, width: 342, borderRadius: 16, overflow: 'hidden',
          background: 'linear-gradient(180deg, rgba(48,32,92,0.75), rgba(36,22,74,0.75))', border: '1px solid rgba(154,123,224,0.35)',
        }}
      >
        {rows.map((r, i) => (
          <motion.button key={r.k} onClick={() => { sfx.tap(); edit(r.fix) }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.08 }}
            whileHover={{ backgroundColor: 'rgba(154,123,224,0.12)' }}
            style={{
              width: '100%', height: 42, display: 'flex', alignItems: 'center', padding: '0 14px 0 16px',
              borderTop: i ? '1px solid rgba(154,123,224,0.18)' : 'none', textAlign: 'left',
            }}>
            <span className="mono" style={{ fontSize: 8.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--label-3)', width: 70 }}>{r.k}</span>
            <span style={{ marginLeft: 'auto', fontSize: 15.5, color: 'var(--label-1)' }}>{r.v}</span>
            <svg width="7" height="12" viewBox="0 0 7 12" style={{ marginLeft: 10, opacity: 0.55 }}><path d="m1 1 5 5-5 5" fill="none" stroke="#efe6d6" strokeWidth="1.4" strokeLinecap="round" /></svg>
          </motion.button>
        ))}
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
        className="serif italic" style={{ position: 'absolute', top: 530, left: 40, width: 310, textAlign: 'center', fontSize: 13.5, lineHeight: 1.4, color: 'var(--label-3)' }}>
        {wantLine(sun, moon)}
      </motion.div>
      <Cta onClick={next} delay={1.0}>That’s so me</Cta>
      <Caption delay={1.2}>Only your sun ever leaves this screen.</Caption>
    </div>
  )
}
