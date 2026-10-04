import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SIGNS } from '../../data/signs'
import { Caption, Cta, Header, rise } from './shared'
import Constellation from './Constellation'
import { WheelColumn, WHEEL_H, ROW } from './WheelPicker'
import { MONTHS, YEAR_MAX, YEAR_MIN, daysInMonth, sunSign, type BirthDate as BD } from './zodiac'

const YEARS = Array.from({ length: YEAR_MAX - YEAR_MIN + 1 }, (_, i) => String(YEAR_MIN + i))

/** O-03 — "When were you born?" with a live sun-sign constellation. */
export default function BirthDate({ birth, setBirth, next }: { birth: BD; setBirth: React.Dispatch<React.SetStateAction<BD>>; next: () => void }) {
  const sign = SIGNS[sunSign(birth)]
  const days = useMemo(() => Array.from({ length: daysInMonth(birth.month, birth.year) }, (_, i) => String(i + 1)), [birth.month, birth.year])

  const update = (patch: Partial<BD>) => {
    setBirth((prev) => {
      const b = { ...prev, ...patch }
      b.day = Math.min(b.day, daysInMonth(b.month, b.year))
      return b.month === prev.month && b.day === prev.day && b.year === prev.year ? prev : b
    })
  }

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Header
        eyebrow="Step 1 · Your date"
        title="When were you born?"
        body={<>Your date sets your sun. Time and place come next, and those decide everything else.</>}
      />

      {/* constellation + sign chip */}
      <motion.div {...rise(0.35)} style={{ position: 'absolute', top: 246, left: 0, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Constellation sign={sign.id} color={sign.light} width={80} />
        <div style={{ marginTop: 12, height: 26, position: 'relative', width: 200, display: 'flex', justifyContent: 'center' }}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div key={sign.id}
              className="chip"
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              style={{
                height: 26, padding: '0 14px 0 5px', gap: 8, color: 'var(--label-1)',
                borderColor: 'rgba(201,188,228,0.5)', background: 'rgba(52,35,95,0.55)', fontSize: 10, letterSpacing: '0.2em',
                boxShadow: `0 0 16px ${sign.color}33`,
              }}
            >
              <span className="dot" style={{
                display: 'grid', placeItems: 'center', fontSize: 10, color: sign.light, letterSpacing: 0,
                background: `radial-gradient(circle, ${sign.color}55, ${sign.dark}aa)`, boxShadow: `0 0 8px ${sign.color}`,
              }}>{sign.glyph}</span>
              {sign.name}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* wheel picker */}
      <motion.div {...rise(0.45, 20)} style={{
        position: 'absolute', top: 372, left: 20, width: 350, height: WHEEL_H + 6, borderRadius: 18,
        background: 'linear-gradient(180deg, rgba(40,26,78,0.75), rgba(30,18,64,0.75))',
        border: '1px solid rgba(154,123,224,0.35)',
        boxShadow: '0 20px 50px rgba(5,2,15,0.45), inset 0 1px 0 rgba(255,255,255,0.05)',
        overflow: 'hidden',
      }}>
        {/* glass selection band */}
        <div style={{
          position: 'absolute', left: 16, right: 16, top: 3 + (WHEEL_H - 44) / 2, height: 44, borderRadius: 11,
          background: 'linear-gradient(180deg, rgba(110,84,180,0.55), rgba(84,60,150,0.5))',
          border: '1px solid rgba(201,182,240,0.55)',
          boxShadow: '0 0 18px rgba(154,123,224,0.25), inset 0 1px 0 rgba(255,255,255,0.12)',
        }} />
        <div style={{
          position: 'absolute', inset: '3px 0', display: 'flex', justifyContent: 'space-between', padding: '0 34px 0 40px',
          WebkitMaskImage: `linear-gradient(180deg, transparent 0, #000 ${ROW * 1.4}px, #000 ${WHEEL_H - ROW * 1.4}px, transparent ${WHEEL_H}px)`,
          maskImage: `linear-gradient(180deg, transparent 0, #000 ${ROW * 1.4}px, #000 ${WHEEL_H - ROW * 1.4}px, transparent ${WHEEL_H}px)`,
        }}>
          <WheelColumn items={MONTHS} index={birth.month} width={118} onChange={(i) => update({ month: i })} />
          <WheelColumn items={days} index={birth.day - 1} width={60} onChange={(i) => update({ day: i + 1 })} />
          <WheelColumn items={YEARS} index={birth.year - YEAR_MIN} width={86} onChange={(i) => update({ year: YEAR_MIN + i })} />
        </div>
      </motion.div>

      <Cta onClick={next} delay={0.6}>Continue</Cta>
      <Caption delay={0.7}>Only your sun sign is ever shown to anyone.</Caption>
    </div>
  )
}
