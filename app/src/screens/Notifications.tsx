import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { ScreenId, ScreenProps } from './types'
import Starfield from '../components/Starfield'
import { CARD_BG, CARD_LINE } from '../components/kit'
import { rise } from '../components/onboarding/shared'
import { SIGNS, type SignId } from '../data/signs'
import { session } from '../lib/session'
import { sfx } from '../lib/sfx'
import { cameFrom, goFrom } from '../components/you/origin'
import { account, useAccount } from '../pages/account/store'

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
  { title: 'Venus turned retrograde', body: 'Old flames come back around until Nov 13.', when: 'Sat', dot: '#9a7be0', to: 'x/notif-detail/venus-retro' },
  { title: 'Your post hit 444 in Taurus only', body: 'Mireya and 12 others replied.', when: 'Thu', dot: '#9a7be0', to: 'club' },
]
/** S-19d grouped: the same week, folded into one card per day range */
const THIS_WEEK: Note[] = [
  ...EARLIER,
  { title: 'Quiet your mind, look inward', body: 'Moon in Pisces. Journal, do not swipe.', when: 'Oct 1', dot: '#9a7be0', to: 'x/notif-detail/moon-pisces' },
]

export const UNREAD_COUNT = TODAY.filter((n) => n.unread).length

const open = (go: (id: ScreenId) => void, n: Note) => {
  sfx.tap()
  if (n.to === 'sky') goFrom(go, 'sky', 'notifications'); else go(n.to)
}

function Avatar({ sign, size = 30 }: { sign: SignId; size?: number }) {
  const s = SIGNS[sign]
  return (
    <span style={{ width: size, height: size, borderRadius: size / 2, flexShrink: 0, overflow: 'hidden', boxShadow: `0 0 10px ${s.color}88` }}>
      <img src={s.auraImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%' }} />
    </span>
  )
}

function Back({ onClick }: { onClick: () => void }) {
  return (
    <button aria-label="Back" onClick={() => { sfx.tap(); onClick() }}
      style={{ position: 'absolute', left: 16, top: 56, width: 40, height: 40, display: 'grid', placeItems: 'center', color: 'var(--label-1)', zIndex: 2 }}>
      <svg width="11" height="18" viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 2 2 10l8 8" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
  )
}

const TopBar = () => (
  <div style={{ position: 'absolute', top: 66, left: 0, right: 0, textAlign: 'center', fontSize: 13, fontWeight: 600, color: 'var(--label-1)' }}>Notifications</div>
)

const Eyebrow = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--label-3)', textTransform: 'uppercase', ...style }}>{children}</div>
)

const Chevron = () => (
  <svg width="7" height="12" viewBox="0 0 7 12" fill="none" stroke="var(--label-3)" strokeWidth="1.6" strokeLinecap="round" style={{ flexShrink: 0 }}><path d="m1 1 5 5-5 5" /></svg>
)

/** S-19b · nothing new */
export function NotifsEmptyView({ go, onBack }: { go: (id: ScreenId) => void; onBack: () => void }) {
  const { morningAt, notifsCleared } = useAccount()
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora={null} warm={null} count={60} seed={101} />
      <Back onClick={onBack} />
      <TopBar />
      <div style={{ position: 'absolute', left: 24, right: 24, top: 300, textAlign: 'center' }}>
        <motion.div {...rise(0.05, 8)}><Eyebrow>Notifications · nothing new</Eyebrow></motion.div>
        <motion.h1 {...rise(0.12)} className="h-display" style={{ marginTop: 10, fontSize: 30, lineHeight: 1.18 }}>The stars have been<br />quiet for you.</motion.h1>
        <motion.p {...rise(0.2)} style={{ margin: '14px auto 0', maxWidth: 310, fontSize: 13.5, lineHeight: 1.45, color: 'var(--label-2)' }}>
          New alignments, comets sent your way, club replies, and the days the stars pick for a first date all land here. Nothing has landed yet.
        </motion.p>
      </div>
      <motion.div {...rise(0.28)} style={{ position: 'absolute', left: 24, right: 24, top: 520 }}>
        <Eyebrow style={{ marginBottom: 8 }}>Your morning reading</Eyebrow>
        <motion.button whileTap={{ scale: 0.985 }} onClick={() => { sfx.tap(); go('x/notif-settings') }}
          style={{ width: '100%', height: 46, borderRadius: 16, padding: '0 16px', display: 'flex', alignItems: 'center', background: CARD_BG, border: CARD_LINE, textAlign: 'left' }}>
          <span style={{ flex: 1, fontSize: 15, color: 'var(--label-1)' }}>Arrives every day at {morningAt}</span>
          <Chevron />
        </motion.button>
        <div style={{ margin: '10px 16px 0', fontSize: 12, color: 'var(--label-3)' }}>That one never goes quiet.</div>
      </motion.div>
      <motion.div {...rise(0.4, 16)} style={{ position: 'absolute', left: 38, width: 314, top: 652 }}>
        <motion.button className="chrome-cta" whileTap={{ scale: 0.97 }} onClick={() => { sfx.tap(); goFrom(go, 'sky', 'notifications') }}>
          Read today’s reading <span className="spark">✦</span>
        </motion.button>
      </motion.div>
      {notifsCleared && (
        <motion.button {...rise(0.5, 6)} onClick={() => { sfx.tap(); account.patch({ notifsCleared: false }) }}
          style={{ position: 'absolute', left: 0, right: 0, top: 724, height: 32, textAlign: 'center', fontSize: 13, color: 'var(--label-3)' }}>Bring back cleared notifications</motion.button>
      )}
    </div>
  )
}

function GroupRow({ n, go, i }: { n: Note; go: (id: ScreenId) => void; i: number }) {
  return (
    <motion.button onClick={() => open(go, n)} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i }}
      whileTap={{ backgroundColor: 'rgba(52,35,95,0.9)' }} className="kit-row"
      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px 14px 14px', textAlign: 'left', backgroundColor: 'rgba(52,35,95,0)' }}>
      <span style={{ width: 6, height: 6, borderRadius: 3, flexShrink: 0, background: n.dot, boxShadow: n.unread ? `0 0 8px ${n.dot}` : 'none' }} />
      {n.sign && <Avatar sign={n.sign} />}
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: 14.5, fontWeight: 600, color: 'var(--label-1)' }}>{n.title}</span>
        <span style={{ display: 'block', fontSize: 12.5, color: 'var(--label-2)', marginTop: 2 }}>{n.body}</span>
      </span>
      <span style={{ alignSelf: 'flex-start', fontSize: 11, color: 'var(--label-3)', marginTop: 2, flexShrink: 0 }}>{n.when}</span>
    </motion.button>
  )
}

/** S-19d · grouped by day range */
export function NotifsGroupedView({ go, onBack }: { go: (id: ScreenId) => void; onBack: () => void }) {
  const unread = TODAY.filter((n) => n.unread).length
  const card = { borderRadius: 16, background: CARD_BG, border: CARD_LINE, overflow: 'hidden' } as const
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora={null} warm={null} count={60} seed={101} />
      <Back onClick={onBack} />
      <TopBar />
      <div className="no-scrollbar" style={{ position: 'absolute', left: 24, right: 24, top: 104, bottom: 0, overflowY: 'auto', scrollbarWidth: 'none', paddingBottom: 40 }}>
        <Eyebrow style={{ marginBottom: 8 }}>Today · {unread} new</Eyebrow>
        <div style={card}>{TODAY.map((n, i) => <GroupRow key={n.title} n={n} go={go} i={i} />)}</div>
        <Eyebrow style={{ margin: '22px 0 8px' }}>This week</Eyebrow>
        <div style={card}>{THIS_WEEK.map((n, i) => <GroupRow key={n.title} n={n} go={go} i={i + TODAY.length} />)}</div>
        <Eyebrow style={{ margin: '22px 0 8px' }}>Older</Eyebrow>
        <p style={{ margin: '0 16px', fontSize: 13, lineHeight: 1.45, color: 'var(--label-3)' }}>Anything older than a week clears itself. The stars do not keep score.</p>
      </div>
    </div>
  )
}

export default function Notifications({ go }: ScreenProps) {
  useEffect(() => { session.patch({ notifsSeen: true }) }, [])
  const [from] = useState(() => cameFrom('notifications', 'deck'))
  const { notifsCleared } = useAccount()

  if (notifsCleared) return <NotifsEmptyView go={go} onBack={() => go(from)} />

  const row = (n: Note, i: number) => (
    <motion.button key={n.title} onClick={() => open(go, n)}
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
      whileTap={{ scale: 0.98 }}
      style={{ width: '100%', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px 13px 12px', borderRadius: 16, background: CARD_BG, border: CARD_LINE, textAlign: 'left' }}>
      <span style={{ width: 6, height: 6, borderRadius: 3, flexShrink: 0, background: n.dot, boxShadow: n.unread ? `0 0 8px ${n.dot}` : 'none', opacity: n.unread ? 1 : 0.7 }} />
      {n.sign && <Avatar sign={n.sign} />}
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: 14.5, fontWeight: 600, color: 'var(--label-1)' }}>{n.title}</span>
        <span style={{ display: 'block', fontSize: 12.5, color: 'var(--label-2)', marginTop: 2 }}>{n.body}</span>
      </span>
      <span style={{ alignSelf: 'flex-start', fontSize: 11, color: 'var(--label-3)', marginTop: 2 }}>{n.when}</span>
    </motion.button>
  )

  const sectionHead = (label: string, link?: { text: string; onClick: () => void }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '16px 0 0', flexShrink: 0 }}>
      <Eyebrow>{label}</Eyebrow>
      {link && (
        <button className="mono" onClick={() => { sfx.tap(); link.onClick() }}
          style={{ height: 30, margin: '-8px 0', fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--label-2)' }}>{link.text}</button>
      )}
    </div>
  )

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora={null} warm={null} count={60} seed={101} />
      <Back onClick={() => go(from)} />
      <div className="h-display" style={{ position: 'absolute', left: 24, top: 100, fontSize: 32 }}>Notifications</div>
      <button className="mono" onClick={() => { sfx.tap(); account.patch({ notifsCleared: true }) }}
        style={{ position: 'absolute', right: 16, top: 106, height: 32, padding: '0 8px', fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--label-2)' }}>CLEAR ALL</button>

      <div className="no-scrollbar" style={{ position: 'absolute', left: 24, right: 24, top: 150, bottom: 0, overflowY: 'auto', scrollbarWidth: 'none', display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 40 }}>
        <div style={{ marginTop: -16 }}>{sectionHead('Today')}</div>
        {TODAY.map(row)}
        {sectionHead('Earlier', { text: 'BY WEEK ›', onClick: () => go('x/notifs-grouped') })}
        {EARLIER.map((n, i) => row(n, i + TODAY.length))}
        {sectionHead('App')}
        <motion.button whileTap={{ scale: 0.985 }} onClick={() => { sfx.tap(); go('x/notif-settings') }}
          style={{ width: '100%', height: 46, flexShrink: 0, borderRadius: 16, padding: '0 16px', display: 'flex', alignItems: 'center', background: CARD_BG, border: CARD_LINE, textAlign: 'left' }}>
          <span style={{ flex: 1, fontSize: 15, color: 'var(--label-1)' }}>Notification settings</span>
          <Chevron />
        </motion.button>
      </div>
    </div>
  )
}
