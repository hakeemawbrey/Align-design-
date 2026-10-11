import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CityPicker from './CityPicker'
import { SIGNS } from '../../data/signs'
import { sfx } from '../../lib/sfx'
import { Caption, Cta, Header, rise, EASE } from './shared'
import { WheelColumn, WHEEL_H, ROW } from './WheelPicker'
import { sunSign, type BirthDate } from './zodiac'
import { DAY_PARTS, risingFor, signAfter, type BirthTime as BT, type DayPart } from './readings'

const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1))
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))
const AMPM = ['AM', 'PM']

/** arc geometry for the part-of-day sun */
const ARC = { cx: 195, cy: 402, r: 108 }
const arcPoint = (t: number) => {
  // t: 0 = east horizon, 0.5 = overhead, 1 = west horizon, >1 below
  const a = Math.PI * (1 - t)
  return { x: ARC.cx + ARC.r * Math.cos(a), y: ARC.cy - ARC.r * Math.sin(a) }
}

/** O-05 — birth time and place. "I don't know the minute" opens the part-of-day picker. */
export default function BirthTime({ birth, time, setTime, next }: {
  birth: BirthDate; time: BT; setTime: React.Dispatch<React.SetStateAction<BT>>; next: () => void
}) {
  const sun = sunSign(birth)
  const rising = SIGNS[risingFor(sun, time)]
  const part = DAY_PARTS.find((p) => p.id === time.part)!
  const pair = part.offsets.map((o) => SIGNS[signAfter(sun, o)].name)
  const dot = arcPoint(part.arc)
  const [picking, setPicking] = useState(false)

  const toggle = () => { sfx.tap(); setTime((t) => ({ ...t, exact: !t.exact })) }
  const pick = (id: DayPart) => { sfx.peekTick(DAY_PARTS.findIndex((p) => p.id === id) / 4); setTime((t) => ({ ...t, part: id })) }

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <AnimatePresence mode="wait" initial={false}>
        {time.exact ? (
          <motion.div key="exact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} style={{ position: 'absolute', inset: 0 }}>
            <Header
              eyebrow="Step 2 · Time and place"
              title="Where the sky was standing."
              body="The minute you arrived sets your Rising — the sign strangers meet first."
            />

            <motion.div {...rise(0.35, 20)} style={{
              position: 'absolute', top: 258, left: 24, width: 342, height: WHEEL_H + 6, borderRadius: 18,
              background: 'linear-gradient(180deg, rgba(40,26,78,0.75), rgba(30,18,64,0.75))',
              border: '1px solid rgba(154,123,224,0.35)', boxShadow: '0 20px 50px rgba(5,2,15,0.45)', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', left: 14, right: 14, top: 3 + (WHEEL_H - 44) / 2, height: 44, borderRadius: 11,
                background: 'linear-gradient(180deg, rgba(110,84,180,0.55), rgba(84,60,150,0.5))', border: '1px solid rgba(201,182,240,0.55)',
              }} />
              <div style={{
                position: 'absolute', inset: '3px 0', display: 'flex', justifyContent: 'center', gap: 18,
                WebkitMaskImage: `linear-gradient(180deg, transparent 0, #000 ${ROW * 1.4}px, #000 ${WHEEL_H - ROW * 1.4}px, transparent ${WHEEL_H}px)`,
                maskImage: `linear-gradient(180deg, transparent 0, #000 ${ROW * 1.4}px, #000 ${WHEEL_H - ROW * 1.4}px, transparent ${WHEEL_H}px)`,
              }}>
                <WheelColumn items={HOURS} index={time.hour - 1} width={60} onChange={(i) => setTime((t) => ({ ...t, hour: i + 1 }))} />
                <WheelColumn items={MINUTES} index={time.minute} width={60} onChange={(i) => setTime((t) => ({ ...t, minute: i }))} />
                <WheelColumn items={AMPM} index={time.pm ? 1 : 0} width={60} onChange={(i) => setTime((t) => ({ ...t, pm: i === 1 }))} />
              </div>
            </motion.div>

            {/* place: tap to change */}
            <motion.button {...rise(0.45, 12)} onClick={() => { sfx.tap(); setPicking(true) }} style={{
              position: 'absolute', top: 476, left: 24, width: 342, height: 46, borderRadius: 14, padding: '0 16px',
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'rgba(40,26,78,0.6)', border: '1px solid rgba(154,123,224,0.3)',
            }}>
              <svg width="12" height="16" viewBox="0 0 12 16" fill="none"><path d="M6 15s5-5.2 5-9A5 5 0 0 0 1 6c0 3.8 5 9 5 9Z" stroke="#c9b6f0" strokeWidth="1.3" /><circle cx="6" cy="6" r="1.8" fill="#c9b6f0" /></svg>
              <span className="mono" style={{ fontSize: 9, letterSpacing: '0.18em', color: 'var(--label-3)' }}>BORN IN</span>
              <span style={{ marginLeft: 'auto', fontSize: 15, color: 'var(--label-1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 190 }}>{time.place}</span>
              <svg width="7" height="12" viewBox="0 0 7 12" style={{ flexShrink: 0, opacity: 0.6 }}><path d="m1 1 5 5-5 5" fill="none" stroke="#efe6d6" strokeWidth="1.4" strokeLinecap="round" /></svg>
            </motion.button>

            <motion.div {...rise(0.55, 8)} style={{ position: 'absolute', top: 532, width: '100%', textAlign: 'center', fontSize: 13.5, color: 'var(--label-2)' }}>
              That puts your Rising in <span style={{ color: rising.light }}>{rising.name}</span>.
              <br />
              <button onClick={toggle} style={{ height: 30, padding: '0 8px', color: 'var(--label-1)', textDecoration: 'underline', textUnderlineOffset: 3, fontSize: 13.5 }}>I don’t know the minute</button>
            </motion.div>

            <Cta onClick={next} delay={0.6}>Cast my sky</Cta>
            <Caption delay={0.7}>Time and place never show on your card.</Caption>
          </motion.div>
        ) : (
          <motion.div key="part" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} style={{ position: 'absolute', inset: 0 }}>
            <Header
              eyebrow="Step 2 · No birth time"
              title="The minute can wait."
              body="Pick the part of the day and we place your Rising within a sign or two. Your Sun and Moon are exact either way."
              bodyWidth={318}
            />

            <motion.div {...rise(0.3, 6)} className="mono" style={{ position: 'absolute', top: 268, width: '100%', textAlign: 'center', fontSize: 8.5, letterSpacing: '0.2em', color: 'var(--label-3)' }}>
              ROUGHLY WHEN
            </motion.div>
            <svg width={390} height={844} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <motion.path
                d={`M ${ARC.cx - ARC.r} ${ARC.cy} A ${ARC.r} ${ARC.r} 0 0 1 ${ARC.cx + ARC.r} ${ARC.cy}`}
                fill="none" stroke="rgba(201,182,240,0.45)" strokeWidth={1}
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: EASE }}
              />
              <line x1={ARC.cx - ARC.r - 10} x2={ARC.cx + ARC.r + 10} y1={ARC.cy} y2={ARC.cy} stroke="rgba(201,182,240,0.2)" />
              <motion.g initial={false} animate={{ x: dot.x, y: dot.y, opacity: part.id === 'night' ? 0.45 : 1 }} transition={{ type: 'spring', stiffness: 120, damping: 16 }}>
                <circle r={14} fill={part.id === 'night' ? 'rgba(179,166,196,0.25)' : 'rgba(255,236,140,0.25)'} />
                <circle r={5} fill={part.id === 'night' ? '#d8d0e8' : '#fff1a8'} style={{ filter: 'drop-shadow(0 0 6px #ffe680)' }} />
              </motion.g>
            </svg>

            {/* segmented control */}
            <motion.div {...rise(0.4, 10)} style={{
              position: 'absolute', top: 420, left: 24, width: 342, height: 40, borderRadius: 20, padding: 3,
              display: 'flex', background: 'rgba(84,44,170,0.65)', border: '1px solid rgba(154,123,224,0.4)',
            }}>
              {DAY_PARTS.map((p) => {
                const on = p.id === time.part
                return (
                  <button key={p.id} onClick={() => pick(p.id)} className="mono" style={{
                    flex: 1, position: 'relative', borderRadius: 17, fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: on ? 'var(--chrome-ink)' : 'var(--label-1)',
                  }}>
                    {on && <motion.span layoutId="daypart" transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      style={{ position: 'absolute', inset: 0, borderRadius: 17, background: 'var(--chrome)', boxShadow: '0 0 14px rgba(248,237,255,0.45)' }} />}
                    <span style={{ position: 'relative' }}>{p.label}</span>
                  </button>
                )
              })}
            </motion.div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={part.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}
                style={{ position: 'absolute', top: 476, width: '100%', textAlign: 'center', fontSize: 13.5, color: 'var(--label-2)' }}>
                {part.label} puts your Rising in {pair[0]} or {pair[1]}.
              </motion.div>
            </AnimatePresence>
            <motion.button {...rise(0.5, 6)} onClick={toggle}
              style={{ position: 'absolute', top: 498, left: 0, width: '100%', height: 30, fontSize: 13.5, color: 'var(--label-1)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              I know the exact time
            </motion.button>
            <motion.button {...rise(0.55, 6)} onClick={() => { sfx.tap(); setPicking(true) }}
              style={{ position: 'absolute', top: 530, left: 0, width: '100%', height: 30, fontSize: 13, color: 'var(--label-2)' }}>
              Born in {time.place} · <span style={{ color: 'var(--label-1)', textDecoration: 'underline', textUnderlineOffset: 3 }}>change</span>
            </motion.button>

            <Cta onClick={next} delay={0.6}>Estimate my Rising</Cta>
            <Caption delay={0.7}>Add the exact time later and we recast you.</Caption>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {picking && <CityPicker value={time.place} onPick={(place) => setTime((t) => ({ ...t, place }))} onClose={() => setPicking(false)} />}
      </AnimatePresence>
    </div>
  )
}
