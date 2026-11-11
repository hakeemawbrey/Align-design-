import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MoonPhase from '../sky/MoonPhase'
import { PLANET, TODAY_READING, readingFor } from '../../data/skyReading'
import CardFrame, { CardOrb } from '../CardFrame'
import { SIGNS } from '../../data/signs'
import { COSMIC_COLOR, cosmicMonth, runningRetrogrades, type CosmicDay } from '../../data/cosmicMonth'
import { sfx } from '../../lib/sfx'

/** fired to open the panel from elsewhere (the beta routes "today's sky" here) */
export const OPEN_SKY_EVENT = 'align:open-sky'

const SLOT_LABEL = { you: 'You', love: 'Love', move: 'Your move' } as const
const SLOT_TINT = { you: '#f2c75c', love: '#f39ab8', move: '#7fd8b0' } as const
const WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

/**
 * The deck's sky widget: drops down from the horoscope pill. "Today" is your
 * daily horoscope, read from your chart; "Month" is the cosmic calendar.
 */
export default function SkyDropdown({ open, onClose, onFullCalendar }: { open: boolean; onClose: () => void; onFullCalendar?: () => void }) {
  const [tab, setTab] = useState<'today' | 'month'>('today')
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="dim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
            style={{ position: 'absolute', inset: 0, zIndex: 19, background: 'rgba(5,2,15,0.6)' }} />
          <motion.div key="panel" role="dialog" aria-label="Today’s sky"
            initial={{ opacity: 0, y: -14, scaleY: 0.96 }} animate={{ opacity: 1, y: 0, scaleY: 1 }} exit={{ opacity: 0, y: -10, scaleY: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
            style={{
              position: 'absolute', left: 16, right: 16, top: 154, bottom: 104, zIndex: 26, transformOrigin: 'top center',
              borderRadius: 22, background: 'linear-gradient(180deg, rgba(36,22,72,0.98), rgba(20,12,40,0.98))',
              border: '1px solid rgba(179,166,196,0.24)', boxShadow: '0 24px 60px rgba(0,0,0,0.55)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
            }}>
            <div style={{ display: 'flex', gap: 6, padding: '12px 12px 0' }}>
              {(['today', 'month'] as const).map((t) => (
                <button key={t} onClick={() => { sfx.tap(); setTab(t) }} aria-pressed={tab === t}
                  className="mono" style={{
                    flex: 1, height: 32, borderRadius: 999, fontSize: 9.5, letterSpacing: '0.18em', fontWeight: 700,
                    color: tab === t ? 'var(--chrome-ink)' : 'var(--label-2)',
                    background: tab === t ? 'var(--chrome)' : 'rgba(90,74,130,0.22)',
                  }}>
                  {t === 'today' ? 'TODAY' : 'THIS MONTH'}
                </button>
              ))}
            </div>
            <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 18px' }}>
              {tab === 'today' ? <Today /> : <Month onFullCalendar={onFullCalendar} />}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function Today() {
  const now = new Date()
  const moon = useMemo(() => cosmicMonth(now).days[now.getDate() - 1].moon, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <div className="mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--label-3)' }}>
          {now.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()} · YOUR HOROSCOPE
        </div>
        <div className="h-display" style={{ fontSize: 30, marginTop: 4 }}>{now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, fontSize: 13, color: 'var(--label-2)' }}>
          <MoonPhase size={18} lit={moon.lit} waxing={moon.waxing} />
          {moon.name} in {SIGNS[moon.sign].name} · {Math.round(moon.lit * 100)}% lit
        </div>
      </div>
      {TODAY_READING.cards.map((c, i) => (
        <CardFrame key={c.slot} tint={SLOT_TINT[c.slot]} kicker={`${SLOT_LABEL[c.slot]} · ${c.title}`} title={c.headline}
          orb={<CardOrb tint={SLOT_TINT[c.slot]}>{PLANET[c.planet].glyph}</CardOrb>}
          strip={{ label: 'Try this', text: c.tryThis }} footer={['Align · today’s sky', `${i + 1}/3`]}>
          <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.45, color: 'var(--label-2)' }}>{c.story}</p>
        </CardFrame>
      ))}
    </div>
  )
}

function Month({ onFullCalendar }: { onFullCalendar?: () => void }) {
  const m = useMemo(() => cosmicMonth(), [])
  const running = useMemo(() => runningRetrogrades(), [])
  const today = new Date().getDate()
  const [sel, setSel] = useState(today)
  const day = m.days[sel - 1]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div className="h-display" style={{ fontSize: 26 }}>{m.title}</div>
        <div className="mono" style={{ fontSize: 8.5, letterSpacing: '0.16em', color: 'var(--label-3)' }}>{m.events.length} EVENTS</div>
      </div>
      <MonthGrid month={m} sel={sel} today={today} onPick={(d) => { sfx.tap(); setSel(d) }} />
      <DayDetail day={day} isToday={sel === today} />
      {running.length > 0 && (
        <div style={{ fontSize: 12, color: 'var(--label-3)' }}>
          Still in effect: {running.map((r) => r.title).join(', ')}.
        </div>
      )}
      {onFullCalendar && (
        <button className="mono" onClick={() => { sfx.tap(); onFullCalendar() }}
          style={{ alignSelf: 'flex-start', fontSize: 9.5, letterSpacing: '0.16em', color: 'var(--align)' }}>
          FULL CALENDAR ›
        </button>
      )}
    </div>
  )
}

export function MonthGrid({ month, sel, today, onPick, size = 'small' }: { month: ReturnType<typeof cosmicMonth>; sel: number; today: number; onPick: (d: number) => void; size?: 'small' | 'large' }) {
  const cell = size === 'large' ? 44 : 38
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 4 }}>
        {WEEK.map((w, i) => <div key={i} className="mono" style={{ textAlign: 'center', fontSize: 8.5, color: 'var(--label-3)', letterSpacing: '0.1em' }}>{w}</div>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: 3 }}>
        {Array.from({ length: month.firstWeekday }).map((_, i) => <div key={`e${i}`} />)}
        {month.days.map((d) => {
          const on = d.day === sel, isToday = d.day === today
          return (
            <button key={d.day} onClick={() => onPick(d.day)} aria-label={`${d.day}${d.events.length ? `, ${d.events.map((e) => e.title).join(', ')}` : ''}`} aria-pressed={on}
              style={{
                height: cell, borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
                background: on ? 'rgba(242,199,92,0.16)' : 'transparent',
                border: isToday ? '1px solid var(--align)' : on ? '1px solid rgba(242,199,92,0.4)' : '1px solid transparent',
              }}>
              <span style={{ fontSize: size === 'large' ? 14 : 12.5, color: isToday ? 'var(--align)' : 'var(--label-1)', fontVariantNumeric: 'tabular-nums' }}>{d.day}</span>
              <span style={{ display: 'flex', gap: 2, height: 5 }}>
                {d.events.slice(0, 3).map((e, i) => (
                  <span key={i} style={{ width: 5, height: 5, borderRadius: 3, background: COSMIC_COLOR[e.kind], boxShadow: e.yours ? `0 0 5px ${COSMIC_COLOR[e.kind]}` : 'none' }} />
                ))}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function DayDetail({ day, isToday }: { day: CosmicDay; isToday: boolean }) {
  // that day's love reading, from your chart
  const love = useMemo(() => readingFor(day.date).cards.find((c) => c.slot === 'love'), [day])
  return (
    <CardFrame tint="#c9bedb" thick={2.5} radius={18} padding="12px 14px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <MoonPhase size={16} lit={day.moon.lit} waxing={day.moon.waxing} glow={false} />
        <span className="mono" style={{ fontSize: 9, letterSpacing: '0.16em', color: 'var(--label-2)' }}>
          {day.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase()}{isToday ? ' · TODAY' : ''} · MOON IN {SIGNS[day.moon.sign].name.toUpperCase()}
        </span>
      </div>
      {day.events.length ? day.events.map((e, i) => (
        <div key={i} style={{ display: 'flex', gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: 4, marginTop: 6, flexShrink: 0, background: COSMIC_COLOR[e.kind] }} />
          <div>
            <div className="serif italic" style={{ fontSize: 17, color: 'var(--label-1)' }}>{e.title}{e.yours && <span className="mono" style={{ fontStyle: 'normal', fontSize: 8.5, letterSpacing: '0.14em', color: 'var(--align)', marginLeft: 6 }}>YOUR SIGN</span>}</div>
            <div style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--label-2)' }}>{e.note}</div>
          </div>
        </div>
      )) : <div style={{ fontSize: 13, color: 'var(--label-3)' }}>A quiet sky. No big moves today.</div>}
      {love && (
        <div style={{ borderTop: '1px solid rgba(179,166,196,0.14)', paddingTop: 9 }}>
          <div className="mono" style={{ fontSize: 8.5, letterSpacing: '0.18em', color: 'var(--rub)' }}>LOVE THAT DAY</div>
          <div className="serif italic" style={{ fontSize: 16, marginTop: 3, color: 'var(--label-1)' }}>{love.headline}</div>
        </div>
      )}
      </div>
    </CardFrame>
  )
}
