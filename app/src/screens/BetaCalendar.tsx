import { useMemo, useState } from 'react'
import { PageShell } from '../components/kit'
import { DayDetail, MonthGrid } from '../components/deck/SkyDropdown'
import { COSMIC_COLOR, cosmicMonth } from '../data/cosmicMonth'
import { sfx } from '../lib/sfx'
import type { ScreenProps } from './types'

/** The cosmic calendar (beta): any month's real sky events, from your profile. */
export default function BetaCalendar({ go }: ScreenProps) {
  const now = new Date()
  const [offset, setOffset] = useState(0)
  const base = new Date(now.getFullYear(), now.getMonth() + offset, 1)
  const m = useMemo(() => cosmicMonth(base), [offset]) // eslint-disable-line react-hooks/exhaustive-deps
  const today = offset === 0 ? now.getDate() : -1
  const [sel, setSel] = useState(now.getDate())
  const pick = Math.min(sel, m.days.length)
  const step = (d: number) => { sfx.tap(); setOffset((o) => o + d); setSel(1) }

  return (
    <PageShell onBack={() => go('you')} eyebrow="COSMIC CALENDAR" title={m.title} titleSize={32}
      body="Every moon phase, retrograde and new season this month, and what it means for dating.">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <button className="mono" onClick={() => step(-1)} style={{ fontSize: 9.5, letterSpacing: '0.16em', color: 'var(--label-2)' }}>‹ PREV</button>
        {offset !== 0 && <button className="mono" onClick={() => { sfx.tap(); setOffset(0); setSel(now.getDate()) }} style={{ fontSize: 9.5, letterSpacing: '0.16em', color: 'var(--align)' }}>TODAY</button>}
        <button className="mono" onClick={() => step(1)} style={{ fontSize: 9.5, letterSpacing: '0.16em', color: 'var(--label-2)' }}>NEXT ›</button>
      </div>
      <MonthGrid month={m} sel={pick} today={today} onPick={(d) => { sfx.tap(); setSel(d) }} size="large" />
      <div style={{ marginTop: 14 }}>
        <DayDetail day={m.days[pick - 1]} isToday={pick === today} />
      </div>
      <div className="mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--label-3)', margin: '20px 0 8px' }}>THIS MONTH</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {m.events.map((e, i) => (
          <button key={i} onClick={() => { sfx.tap(); setSel(e.day) }} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 2px', textAlign: 'left' }}>
            <span className="mono" style={{ width: 26, fontSize: 12, color: 'var(--label-2)', fontVariantNumeric: 'tabular-nums' }}>{e.day}</span>
            <span style={{ width: 8, height: 8, borderRadius: 4, background: COSMIC_COLOR[e.kind], flexShrink: 0 }} />
            <span className="serif italic" style={{ fontSize: 16, color: 'var(--label-1)', flex: 1 }}>{e.title}</span>
            {e.yours && <span className="mono" style={{ fontSize: 8, letterSpacing: '0.14em', color: 'var(--align)' }}>YOURS</span>}
          </button>
        ))}
        {!m.events.length && <div style={{ fontSize: 13, color: 'var(--label-3)' }}>A quiet month.</div>}
      </div>
    </PageShell>
  )
}
