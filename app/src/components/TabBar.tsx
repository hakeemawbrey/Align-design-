import { sfx } from '../lib/sfx'
import { useSession } from '../lib/session'
import type { ScreenId } from '../screens/types'

export type Tab = 'deck' | 'matches' | 'club' | 'you'

const ICONS: Record<Tab, (active: boolean) => React.ReactNode> = {
  deck: (a) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={a ? 'var(--align)' : 'none'} stroke={a ? 'var(--align)' : 'currentColor'} strokeWidth="1.5">
      <path d="M12 2c.6 4.8 2.2 7 7 8-4.8 1-6.4 3.2-7 8-.6-4.8-2.2-7-7-8 4.8-1 6.4-3.2 7-8Z" strokeLinejoin="round"/>
    </svg>
  ),
  matches: (a) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={a ? 'var(--align)' : 'none'} stroke={a ? 'var(--align)' : 'currentColor'} strokeWidth="1.5">
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" strokeLinejoin="round"/>
    </svg>
  ),
  club: (a) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={a ? 'var(--align)' : 'currentColor'} strokeWidth="1.5">
      <circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 0 0 16Z" fill={a ? 'var(--align)' : 'currentColor'}/>
    </svg>
  ),
  you: (a) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={a ? 'var(--align)' : 'currentColor'} strokeWidth="1.5">
      <circle cx="12" cy="12" r="8"/>
    </svg>
  ),
}

const LABEL: Record<Tab, string> = { deck: 'Deck', matches: 'Matches', club: 'Club', you: 'You' }

interface Props {
  active: Tab
  /** navigate — every tab goes to its screen */
  go?: (id: ScreenId) => void
  /** optional override; return true to skip the default navigation */
  onSelect?: (t: Tab) => boolean | void
}

const ROUTE: Record<Tab, ScreenId> = { deck: 'deck', matches: 'matches', club: 'club', you: 'you' }

/** Floating glass pill nav from S-05. */
export default function TabBar({ active, go, onSelect }: Props) {
  const { unseenMatch } = useSession()
  const matchBadge = unseenMatch && active !== 'matches'
  return (
    <nav style={{
      position: 'absolute', left: 32, right: 32, bottom: 22, height: 62, zIndex: 40,
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      borderRadius: 999, background: 'rgba(40, 26, 78, 0.72)',
      border: '1px solid rgba(179, 166, 196, 0.18)',
      backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
    }}>
      {(Object.keys(LABEL) as Tab[]).map((t) => {
        const a = t === active
        return (
          <button key={t} onClick={() => { sfx.tap(); if (onSelect?.(t)) return; if (t !== active) go?.(ROUTE[t]) }} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, width: 64,
            color: a ? 'var(--label-1)' : 'var(--label-3)', fontSize: 11, fontWeight: 500, position: 'relative',
          }}>
            {ICONS[t](a)}
            <span>{LABEL[t]}</span>
            {t === 'matches' && matchBadge && (
              <span style={{ position: 'absolute', top: -2, right: 14, width: 8, height: 8, borderRadius: 4, background: 'var(--rub)', boxShadow: '0 0 8px var(--rub)' }} />
            )}
          </button>
        )
      })}
    </nav>
  )
}
