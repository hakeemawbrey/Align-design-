import { useEffect, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { PageProps } from '../types'
import type { ScreenId } from '../../screens/types'
import Starfield from '../../components/Starfield'
import TabBar from '../../components/TabBar'
import { rise, EASE } from '../../components/onboarding/shared'
import { sfx } from '../../lib/sfx'

/**
 * The system states (G-17 → G-20): reusable pages any screen can send you to.
 *   x/loading[/<screen>]   skeleton deck; with a screen, goes there once loaded
 *   x/offline[/<screen>]   no connection; retries and returns to <screen> (default deck)
 *   x/no-cards[/<miles>]   nobody left to deal tonight
 *   x/update[/error]       forced update (or a generic error with ‘error’)
 */

const target = (arg: string | undefined, fallback: ScreenId): ScreenId => (arg ? (arg as ScreenId) : fallback)

/** centred art + eyebrow + title + body + one chrome CTA, optionally above the tab bar */
function SystemState({ art, eyebrow, title, body, cta, caption, tabs, go, foot, top = 420, ctaTop = 628, void: dark }: {
  art?: ReactNode; eyebrow?: ReactNode; title: ReactNode; body: ReactNode
  cta: { label: ReactNode; onClick: () => void; busy?: boolean }
  caption?: { label: ReactNode; onClick: () => void }
  tabs?: boolean; go: (id: ScreenId) => void; foot?: ReactNode; top?: number; ctaTop?: number; void?: boolean
}) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: dark ? 'var(--void)' : 'var(--canvas)' }}>
      <Starfield aurora={null} warm={null} count={70} seed={23} />
      {art}
      <div style={{ position: 'absolute', top, left: 24, right: 24, textAlign: 'center' }}>
        {eyebrow && <motion.div className="eyebrow" {...rise(0.1, 8)} style={{ color: 'var(--label-3)', letterSpacing: '0.2em', marginBottom: 12 }}>{eyebrow}</motion.div>}
        <motion.h1 className="h-display" {...rise(0.18)} style={{ fontSize: 31, lineHeight: 1.15 }}>{title}</motion.h1>
        <motion.p {...rise(0.26)} style={{ margin: '12px auto 0', maxWidth: 320, fontSize: 13.5, lineHeight: 1.45, color: 'var(--label-2)', textWrap: 'balance' }}>{body}</motion.p>
      </div>
      {foot && (
        <motion.div className="mono" {...rise(0.4, 6)}
          style={{ position: 'absolute', top: ctaTop - 46, left: 0, right: 0, textAlign: 'center', fontSize: 8.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--label-3)' }}>
          {foot}
        </motion.div>
      )}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
        style={{ position: 'absolute', top: ctaTop, left: 38, width: 314, zIndex: 20 }}>
        <motion.button className="chrome-cta" whileTap={{ scale: 0.97 }} onClick={() => { if (cta.busy) return; sfx.tap(); cta.onClick() }}
          style={{ opacity: cta.busy ? 0.75 : 1 }}>
          {cta.label} <span className="spark">✦</span>
        </motion.button>
      </motion.div>
      {caption && (
        <motion.button {...rise(0.5, 6)} onClick={() => { sfx.tap(); caption.onClick() }}
          style={{ position: 'absolute', top: ctaTop + 62, left: 40, right: 40, minHeight: 32, textAlign: 'center', fontSize: 13.5, color: 'var(--label-3)' }}>
          {caption.label}
        </motion.button>
      )}
      {tabs && <TabBar active="deck" go={go} />}
    </div>
  )
}

/* ─────────────────────────── G-17 Loading ─────────────────────────── */

function Bone({ style, delay = 0 }: { style: React.CSSProperties; delay?: number }) {
  return (
    <div style={{ position: 'absolute', overflow: 'hidden', background: 'rgba(179,166,196,0.17)', ...style }}>
      <motion.div animate={{ x: ['-100%', '160%'] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay, repeatDelay: 0.3 }}
        style={{ position: 'absolute', inset: 0, width: '70%', background: 'linear-gradient(100deg, transparent, rgba(239,230,214,0.09), transparent)' }} />
    </div>
  )
}

/** G-17 Loading — the deck's shape, waiting for its cards. */
export function Loading({ go, arg }: PageProps) {
  useEffect(() => {
    if (!arg) return
    const t = window.setTimeout(() => go(target(arg, 'deck')), 2200)
    return () => window.clearTimeout(t)
  }, [arg, go])

  return (
    <div aria-busy="true" aria-label="Loading" style={{ position: 'absolute', inset: 0, background: 'var(--canvas)' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0.75, 1, 0.75] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0 }}>
        <Bone style={{ left: 20, right: 20, top: 104, height: 40, borderRadius: 14 }} />
        <Bone style={{ left: 34, right: 34, top: 168, height: 420, borderRadius: 22 }} delay={0.1} />
        <Bone style={{ left: 45, right: 45, top: 620, height: 14, borderRadius: 7 }} delay={0.2} />
        <Bone style={{ left: 45, right: 45, top: 644, height: 14, borderRadius: 7 }} delay={0.25} />
        <Bone style={{ left: 45, right: 45, top: 668, height: 14, borderRadius: 7 }} delay={0.3} />
      </motion.div>
    </div>
  )
}

/* ─────────────────────────── G-18 Offline ─────────────────────────── */

function BrokenRing({ spin }: { spin: boolean }) {
  return (
    <motion.svg width="200" height="200" viewBox="0 0 200 200"
      animate={{ rotate: 360 }} transition={{ duration: spin ? 1.4 : 24, repeat: Infinity, ease: 'linear' }}
      style={{ position: 'absolute', left: 95, top: 190 }}>
      <defs>
        <linearGradient id="ring-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b2a7a" /><stop offset="0.6" stopColor="#6c5bb0" /><stop offset="1" stopColor="#b3a6c4" />
        </linearGradient>
      </defs>
      {/* three arcs with gaps: the signal, broken */}
      <circle cx="100" cy="100" r="90" fill="none" stroke="url(#ring-g)" strokeWidth="3.5" strokeLinecap="round"
        strokeDasharray="250 34 150 30 70 31" />
      <circle cx="152" cy="62" r="2.6" fill="#b3a6c4" />
      <circle cx="12" cy="108" r="1.8" fill="#b3a6c4" opacity="0.8" />
    </motion.svg>
  )
}

/** G-18 Offline — the signal went quiet. Try again goes back to where you were. */
export function Offline({ go, arg }: PageProps) {
  const [busy, setBusy] = useState(false)
  const [quiet, setQuiet] = useState(false)
  const to = target(arg, 'deck')

  useEffect(() => {
    const on = () => { sfx.align(); go(to) }
    window.addEventListener('online', on)
    return () => window.removeEventListener('online', on)
  }, [go, to])

  const retry = () => {
    setBusy(true)
    setQuiet(false)
    window.setTimeout(() => {
      setBusy(false)
      if (navigator.onLine) { sfx.align(); go(to) } else { sfx.deny(); setQuiet(true) }
    }, 1300)
  }

  return (
    <>
      <SystemState go={go} tabs void
        art={<BrokenRing spin={busy} />}
        eyebrow="No connection"
        title="The signal went quiet"
        body="Something between you and the sky stopped answering. Nothing you swiped was lost. Reconnect and the deck picks up where it stopped."
        top={430}
        cta={{ label: busy ? 'Listening…' : 'Try again', onClick: retry, busy }}
        caption={{ label: quiet ? 'Still quiet. Check Wi-Fi or mobile data.' : 'Your matches and chats are still here', onClick: () => go('matches') }}
      />
    </>
  )
}

/* ─────────────────────────── G-19 No Cards ─────────────────────────── */

const PENTA = [[178, 254], [141, 282], [157, 342], [203, 338], [217, 287]] as const

function EmptySky() {
  return (
    <>
      {/* a small constellation drifting top-right */}
      <svg width="90" height="70" viewBox="0 0 90 70" style={{ position: 'absolute', left: 286, top: 96, opacity: 0.85 }}>
        <path d="M6 44 26 26 48 34 66 6M48 34 58 60" fill="none" stroke="rgba(239,230,214,0.45)" strokeWidth="1" />
        {[[6, 44], [26, 26], [48, 34], [66, 6], [58, 60]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="2" fill="#efe6d6" />)}
      </svg>
      <motion.svg width="240" height="240" viewBox="75 178 240 240" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        style={{ position: 'absolute', left: 75, top: 178 }}>
        <defs>
          <radialGradient id="nc-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0.75" stopColor="#6a35c4" stopOpacity="0" /><stop offset="1" stopColor="#6a35c4" stopOpacity="0.18" />
          </radialGradient>
        </defs>
        <circle cx="195" cy="298" r="114" fill="url(#nc-glow)" stroke="rgba(176,140,240,0.55)" strokeWidth="1.2" />
        <motion.g animate={{ rotate: [0, 4, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}>
          <path d={`M${PENTA.map((p) => p.join(' ')).join(' L')} Z M217 287 L248 320`} fill="none" stroke="rgba(200,180,240,0.7)" strokeWidth="1.4" />
          {[...PENTA, [248, 320] as const].map(([x, y], i) => (
            <motion.circle key={i} cx={x} cy={y} r={i === 0 ? 3.4 : 2.4} fill={i === 0 ? '#c9a8ff' : '#b3a6c4'}
              animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4 }} />
          ))}
        </motion.g>
      </motion.svg>
    </>
  )
}

/** G-19 No Cards — nobody left to deal tonight. `x/no-cards/<miles>` */
export function NoCards({ go, arg }: PageProps) {
  const [miles, setMiles] = useState(() => Number(arg) || 25)
  const [busy, setBusy] = useState(false)

  const widen = () => {
    const m = miles + 10
    setMiles(m)
    setBusy(true)
    sfx.sparkle()
    window.setTimeout(() => go('dealing'), 1500)
  }

  return (
    <>
      <SystemState go={go} tabs
        art={<EmptySky />}
        eyebrow={`Range · ${miles} miles`}
        title="Your city is out of cards"
        body={`Everyone within ${miles} miles has crossed this deck tonight. New people join every day — stretch the range a few miles and meet the ones sitting just outside it.`}
        top={428}
        cta={{ label: busy ? `Dealing ${miles} miles…` : 'Widen your range', onClick: widen, busy }}
        caption={{ label: 'Talk to your matches', onClick: () => go('matches') }}
      />
    </>
  )
}

/* ─────────────────────────── G-20 Error / Update ─────────────────────────── */

/** G-20 Error / Update — forced update; `x/update/error` is the generic “something slipped” state. */
export function Update({ go, back, arg }: PageProps) {
  const error = arg === 'error'
  const [progress, setProgress] = useState<number | null>(null)

  useEffect(() => {
    if (progress === null) return
    if (progress >= 1) { sfx.align(); const t = window.setTimeout(() => go('splash'), 400); return () => window.clearTimeout(t) }
    const t = window.setTimeout(() => setProgress((p) => Math.min(1, (p ?? 0) + 0.06 + Math.random() * 0.08)), 110)
    return () => window.clearTimeout(t)
  }, [progress, go])

  const busy = progress !== null

  return (
    <SystemState go={go}
      title={error ? <>Something slipped<br />out of orbit.</> : <>Mercury’s fault,<br />not yours.</>}
      body={error
        ? 'That one is on us. Try again — nothing you did was lost.'
        : 'This version of Align can’t read the current sky. Update to keep going — nothing you did was lost.'}
      top={318}
      ctaTop={692}
      foot={busy
        ? <span style={{ display: 'inline-block', width: 160, height: 3, borderRadius: 2, background: 'rgba(179,166,196,0.2)', overflow: 'hidden', verticalAlign: 'middle' }}>
            <span style={{ display: 'block', height: '100%', width: `${Math.round((progress ?? 0) * 100)}%`, background: 'var(--chrome)', transition: 'width .1s' }} />
          </span>
        : error ? 'ERR 0X500 · Lost signal' : 'ERR 0X444 · Mercury retrograde'}
      cta={error
        ? { label: 'Try again', onClick: back }
        : { label: busy ? 'Updating…' : 'Update Align', onClick: () => setProgress(0), busy }}
    />
  )
}
