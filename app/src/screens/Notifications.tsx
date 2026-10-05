import { useEffect } from 'react'
import { motion } from 'framer-motion'
import type { ScreenId, ScreenProps } from './types'
import Starfield from '../components/Starfield'
import { SIGNS, type SignId } from '../data/signs'
import { session } from '../lib/session'
import { sfx } from '../lib/sfx'

interface Note {
  title: string
  body: string
  when: string
  dot: string
  sign?: SignId
  to: ScreenId
  unread?: boolean
}

/** S-19 Notifications — written for Monday, October 5, 2026. */
const TODAY: Note[] = [
  { title: 'You align with Juniper', body: 'The card flipped. Go see who it was.', when: 'now', dot: '#7fd8b0', sign: 'libra', to: 'reveal', unread: true },
  { title: 'Your deck refilled', body: 'Three draws, fifteen people. Venus is retrograde — look twice.', when: '11:11', dot: '#7fd8b0', to: 'deck', unread: true },
  { title: 'Tobias sent you his card', body: 'Day 3 — trading is open. Send yours back.', when: '1h', dot: '#f2c75c', sign: 'sagittarius', to: 'trade', unread: true },
  { title: 'Mira’s card closes Wednesday', body: 'Two days left to say something.', when: '2h', dot: '#f39a3a', sign: 'leo', to: 'matches' },
]
const EARLIER: Note[] = [
  { title: 'Venus turned retrograde', body: 'Old attractions come back around until Nov 13.', when: 'Sat', dot: '#9a7be0', to: 'sky' },
  { title: 'Your post hit 444 in Taurus only', body: 'Mireya and 12 others replied.', when: 'Thu', dot: '#9a7be0', to: 'club' },
]

export const UNREAD_COUNT = TODAY.filter((n) => n.unread).length

export default function Notifications({ go }: ScreenProps) {
  useEffect(() => { session.patch({ notifsSeen: true }) }, [])

  const row = (n: Note, i: number) => {
    const s = n.sign ? SIGNS[n.sign] : null
    return (
      <motion.button key={n.title} onClick={() => { sfx.tap(); go(n.to) }}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
        whileTap={{ scale: 0.98 }}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px 13px 12px', borderRadius: 14, background: 'rgba(52,35,95,0.6)', textAlign: 'left' }}>
        <span style={{ width: 6, height: 6, borderRadius: 3, flexShrink: 0, background: n.dot, boxShadow: n.unread ? `0 0 8px ${n.dot}` : 'none', opacity: n.unread ? 1 : 0.7 }} />
        {s && (
          <span style={{ width: 30, height: 30, borderRadius: 15, flexShrink: 0, overflow: 'hidden', boxShadow: `0 0 10px ${s.color}88` }}>
            <img src={s.auraImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%' }} />
          </span>
        )}
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: 'block', fontSize: 14.5, fontWeight: 600, color: 'var(--label-1)' }}>{n.title}</span>
          <span style={{ display: 'block', fontSize: 12.5, color: 'var(--label-2)', marginTop: 2 }}>{n.body}</span>
        </span>
        <span style={{ alignSelf: 'flex-start', fontSize: 11, color: 'var(--label-3)', marginTop: 2 }}>{n.when}</span>
      </motion.button>
    )
  }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora={null} warm={null} count={60} seed={101} />
      <button aria-label="Back" onClick={() => { sfx.tap(); go('deck') }}
        style={{ position: 'absolute', left: 16, top: 54, width: 40, height: 40, display: 'grid', placeItems: 'center', color: 'var(--label-1)' }}>
        <svg width="11" height="18" viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 2 2 10l8 8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div style={{ position: 'absolute', top: 64, left: 0, right: 0, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>Notifications</div>

      <div style={{ position: 'absolute', left: 20, right: 20, top: 104, bottom: 40, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--label-3)', margin: '6px 4px 2px' }}>TODAY</div>
        {TODAY.map(row)}
        <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--label-3)', margin: '14px 4px 2px' }}>EARLIER</div>
        {EARLIER.map((n, i) => row(n, i + TODAY.length))}
        <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--label-3)', margin: '14px 4px 2px' }}>APP</div>
        <button onClick={() => sfx.tap()} style={{ width: '100%', height: 46, borderRadius: 14, padding: '0 16px', display: 'flex', alignItems: 'center', background: 'rgba(52,35,95,0.6)', textAlign: 'left' }}>
          <span style={{ flex: 1, fontSize: 15, color: 'var(--label-1)' }}>Notification settings</span>
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none" stroke="var(--label-3)" strokeWidth="1.6" strokeLinecap="round"><path d="m1 1 5 5-5 5" /></svg>
        </button>
      </div>
    </div>
  )
}
