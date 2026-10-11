import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import { CAL_MONTH, CAL_MARKS, CAL_KIND_COLOR, CAL_EVENTS, CAL_TONIGHT, SKY_DATE, type CalEvent } from '../data/sky'
import { sfx } from '../lib/sfx'
import { cameFrom, goFrom, skyTrail } from '../components/you/origin'

/** What each marked day means, shown when you tap it. */
const DAY_NOTE: Record<number, string> = {
  3: 'Venus turns retrograde in Scorpio · last quarter moon',
  5: 'Today · Moon in Leo, Sun opposite Saturn',
  10: 'New moon in Libra · 10:50 AM',
  18: 'First quarter moon in Capricorn',
  23: 'Sun enters Scorpio · Scorpio season begins',
  24: 'Mercury turns retrograde in Scorpio',
  25: 'Full moon in Taurus · 11:12 PM · your sign',
}

/** S-15 Cosmic calendar — October 2026. */
export default function Calendar({ go }: ScreenProps) {
  const [picked, setPicked] = useState<number>(CAL_MONTH.today)
  const [from] = useState(() => cameFrom('calendar', 'sky'))
  const toSky = () => { sfx.tap(); goFrom(go, 'sky', from === 'you' ? 'you' : skyTrail.from) }
  const cells: (number | null)[] = [
    ...Array.from({ length: CAL_MONTH.firstWeekday }, () => null),
    ...Array.from({ length: CAL_MONTH.days }, (_, i) => i + 1),
  ]
  while (cells.length % 7) cells.push(null)

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora="#3a1d80" warm={null} count={60} seed={61} />

      <button onClick={() => { if (from === 'you') { sfx.tap(); go('you') } else toSky() }} aria-label="Back"
        style={{ position: 'absolute', left: 16, top: 56, width: 40, height: 40, display: 'grid', placeItems: 'center', color: 'var(--label-1)', zIndex: 2 }}>
        <svg width="11" height="18" viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 2 2 10l8 8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div className="mono" style={{ position: 'absolute', left: 24, right: 24, top: 100, fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--label-2)', whiteSpace: 'nowrap' }}>
        {CAL_MONTH.title} · {SKY_DATE.city} · <span style={{ color: '#f39a3a' }}>{CAL_MONTH.moonNow}</span> · <span style={{ color: 'var(--violet)' }}>{CAL_MONTH.phaseNow}</span>
      </div>
      <div className="h-display" style={{ position: 'absolute', left: 24, top: 120, fontSize: 32, lineHeight: 1.1 }}>Cosmic calendar</div>

      {/* month grid */}
      <div className="eyebrow" style={{ position: 'absolute', left: 24, top: 178, fontSize: 9, color: 'var(--label-3)' }}>The month</div>
      <div style={{
        position: 'absolute', left: 24, right: 24, top: 194, padding: '8px 8px 6px', borderRadius: 18,
        background: 'rgba(40,26,78,0.6)', border: '1px solid rgba(179,166,196,0.16)',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 2 }}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="mono" style={{ textAlign: 'center', fontSize: 9, color: 'var(--label-3)', padding: '4px 0' }}>{d}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: 2 }}>
          {cells.map((d, i) => {
            if (!d) return <div key={i} />
            const mark = CAL_MARKS[d]
            const isToday = d === CAL_MONTH.today
            const isPicked = d === picked
            return (
              <button key={i} onClick={() => { sfx.tap(); setPicked(d) }}
                style={{ position: 'relative', height: 36, display: 'grid', placeItems: 'center' }}>
                {isPicked && (
                  <motion.div layoutId="cal-pick" transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    style={{ position: 'absolute', inset: '2px 6px', borderRadius: 10, background: isToday ? 'rgba(154,123,224,0.55)' : 'rgba(120,96,170,0.35)' }} />
                )}
                {isToday && <div style={{ position: 'absolute', inset: '2px 6px', borderRadius: 10, boxShadow: 'inset 0 0 0 1.5px rgba(222,208,246,0.7)' }} />}
                <span style={{ position: 'relative', fontSize: 14, fontWeight: isToday ? 600 : 400, color: d < CAL_MONTH.today ? 'var(--label-3)' : 'var(--label-1)', fontVariantNumeric: 'tabular-nums' }}>{d}</span>
                {mark && <span style={{ position: 'absolute', bottom: 3, width: 4, height: 4, borderRadius: 2, background: CAL_KIND_COLOR[mark], boxShadow: `0 0 6px ${CAL_KIND_COLOR[mark]}` }} />}
              </button>
            )
          })}
        </div>
        <div style={{ height: 30, display: 'grid', placeItems: 'center', borderTop: '1px solid rgba(179,166,196,0.12)', marginTop: 4 }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={picked} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.18 }}
              className="serif italic" style={{ fontSize: 13.5, color: DAY_NOTE[picked] ? 'var(--label-1)' : 'var(--label-3)' }}>
              {DAY_NOTE[picked] ?? `October ${picked} · a quiet sky`}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* this month */}
      <div style={{ position: 'absolute', left: 24, right: 24, top: 478, display: 'flex', justifyContent: 'space-between' }}>
        <span className="eyebrow" style={{ fontSize: 9, color: 'var(--label-3)' }}>This month</span>
        <span className="mono" style={{ fontSize: 8.5, letterSpacing: '0.18em', color: 'var(--label-3)' }}>SCROLL FOR MORE →</span>
      </div>
      <div className="no-scrollbar" style={{ position: 'absolute', left: 0, right: 0, top: 496, display: 'flex', gap: 10, overflowX: 'auto', padding: '0 24px', scrollbarWidth: 'none' }}>
        {CAL_EVENTS.map((e, i) => <EventTile key={e.title} e={e} first={i === 0} />)}
      </div>

      {/* tonight */}
      <div className="eyebrow" style={{ position: 'absolute', left: 24, top: 610, fontSize: 9, color: 'var(--label-3)' }}>Tonight</div>
      <div style={{ position: 'absolute', left: 24, right: 24, top: 626, borderRadius: 16, overflow: 'hidden', background: 'rgba(40,26,78,0.6)', border: '1px solid rgba(179,166,196,0.16)' }}>
        {CAL_TONIGHT.map((r, i) => (
          <button key={r.text} onClick={toSky}
            style={{ width: '100%', display: 'flex', alignItems: 'center', padding: '10px 14px', borderTop: i ? '1px solid rgba(179,166,196,0.12)' : 'none', textAlign: 'left' }}>
            <span style={{ flex: 1, fontSize: 14, color: 'var(--label-1)' }}>{r.text}</span>
            <span style={{ fontSize: 11.5, color: 'var(--label-3)' }}>{r.note} ›</span>
          </button>
        ))}
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 34, display: 'flex', justifyContent: 'center' }}>
        <button className="chrome-cta" onClick={toSky}>
          Open the day in full <span className="spark">✦</span>
        </button>
      </div>
    </div>
  )
}

function EventTile({ e, first }: { e: CalEvent; first: boolean }) {
  const c = CAL_KIND_COLOR[e.kind]
  return (
    <div style={{
      flex: '0 0 112px', height: 96, borderRadius: 14, padding: '10px 8px 8px', textAlign: 'center',
      background: 'rgba(40,26,78,0.7)', border: `1px solid ${first ? 'rgba(248,237,255,0.45)' : 'rgba(179,166,196,0.16)'}`,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div style={{ width: 38, height: 38, borderRadius: 10, display: 'grid', placeItems: 'center', background: 'rgba(11,6,32,0.5)' }}>
        <Orb kind={e.orb} />
      </div>
      <div className="serif italic" style={{ fontSize: 13.5, color: 'var(--label-1)', marginTop: 6, lineHeight: 1.1 }}>{e.title}</div>
      <div style={{ fontSize: 10, color: c, marginTop: 3 }}>{e.when}</div>
    </div>
  )
}

function Orb({ kind }: { kind: CalEvent['orb'] }) {
  const ball = (bg: string, glow: string) => ({ width: 24, height: 24, borderRadius: 12, background: bg, boxShadow: `0 0 10px ${glow}` })
  if (kind === 'venus') return <div style={ball('radial-gradient(circle at 34% 28%, #fff1e2, #f3c2a2 25%, #d98a78 55%, #6a3048)', 'rgba(242,170,140,0.6)')} />
  if (kind === 'newmoon') return <div style={{ ...ball('#1a1236', 'rgba(239,230,214,0.25)'), boxShadow: 'inset 0 0 0 1px rgba(239,230,214,0.35), 0 0 8px rgba(239,230,214,0.2)' }} />
  if (kind === 'fullmoon') return <div style={ball('radial-gradient(circle at 40% 35%, #fffaf0, #efe6d6 50%, #b8a98f)', 'rgba(239,230,214,0.7)')} />
  if (kind === 'sun') return <div style={ball('radial-gradient(circle at 35% 30%, #fff1c4, #f2c75c 40%, #c0622f 80%)', 'rgba(242,160,92,0.6)')} />
  return <div style={ball('radial-gradient(circle at 35% 30%, #e8fff4, #7fd8b0 45%, #2f7a5c)', 'rgba(127,216,176,0.6)')} />
}
