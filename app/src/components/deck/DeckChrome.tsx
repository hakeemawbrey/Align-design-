import { useSession } from '../../lib/session'
import { UNREAD_COUNT } from '../../screens/Notifications'
import { SKY_PILL } from '../../data/sky'
import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { CARD_W, CARD_H, CARD_SCALE, CARD_TOP } from './fx'
import { HandIcon } from '../talk/CardsButton'
import { sfx } from '../../lib/sfx'

/**
 * Notifications: a four-point star, taller than it is wide, with an unread badge.
 * Pulses when you align (pulse bumps).
 */
export function NotifStar({ pulse = 0, onClick }: { pulse?: number; onClick?: () => void }) {
  const { notifsSeen } = useSession()
  const unread = notifsSeen ? 0 : UNREAD_COUNT
  return (
    <motion.button onClick={() => { sfx.tap(); onClick?.() }} aria-label={unread ? `Notifications, ${unread} new` : 'Notifications'}
      whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.06 }}
      style={{ position: 'absolute', right: 18, top: 62, width: 48, height: 48, display: 'grid', placeItems: 'center' }}>
      <motion.svg key={pulse} width="26" height="38" viewBox="0 0 20 30"
        initial={pulse ? { scale: 1.45, rotate: -18 } : false} animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 12 }}
        style={{ overflow: 'visible', filter: 'drop-shadow(0 0 6px rgba(242,199,92,0.75))' }}>
        <defs>
          <linearGradient id="notif-foil" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff4cf" />
            <stop offset="0.45" stopColor="#f2c75c" />
            <stop offset="1" stopColor="#b88a2c" />
          </linearGradient>
        </defs>
        {/* long top & bottom points, shorter sides */}
        <path d="M10 0 Q11.3 13.7 19 15 Q11.3 16.3 10 30 Q8.7 16.3 1 15 Q8.7 13.7 10 0 Z" fill="url(#notif-foil)" />
      </motion.svg>
      {unread > 0 && (
        <span className="mono" style={{
          position: 'absolute', top: 6, right: 6, minWidth: 16, height: 16, borderRadius: 8, padding: '0 4px',
          display: 'grid', placeItems: 'center', fontSize: 9, fontWeight: 700, color: '#fff',
          background: 'var(--rub)', boxShadow: '0 0 8px rgba(232,98,138,0.8)', border: '1.5px solid var(--void)',
        }}>{unread}</span>
      )}
    </motion.button>
  )
}

export function GoldStar({ pulse = 0, size = 40 }: { pulse?: number; size?: number }) {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <AnimatePresence>
        {pulse > 0 && (
          <motion.span key={pulse}
            initial={{ scale: 1, opacity: 0.9 }} animate={{ scale: 2.4, opacity: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid #f2c75c', boxShadow: '0 0 18px #f2c75c' }}
          />
        )}
      </AnimatePresence>
      <motion.div
        key={pulse}
        initial={pulse ? { scale: 1.35, rotate: -25 } : false}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 12 }}
        style={{
          width: size, height: size, borderRadius: '50%', display: 'grid', placeItems: 'center',
          background: 'radial-gradient(circle at 32% 28%, #fff4cf 0%, #f2d784 22%, #e0ac44 55%, #a9802e 100%)',
          boxShadow: '0 0 22px rgba(242,199,92,0.45), inset 0 1px 1px rgba(255,255,255,0.8), inset 0 -2px 4px rgba(90,60,10,0.35)',
        }}
      >
        <svg width={size * 0.45} height={size * 0.45} viewBox="0 0 24 24">
          <path d="M12 2c.6 4.8 2.2 7 7 8-4.8 1-6.4 3.2-7 8-.6-4.8-2.2-7-7-8 4.8-1 6.4-3.2 7-8Z" fill="#3a2a10" transform="translate(0 2)" />
        </svg>
      </motion.div>
    </div>
  )
}

interface HeaderProps {
  title: string
  right?: ReactNode
  rightKey?: string
  starPulse?: number
  hidden?: boolean
  /** open Today's Sky */
  onSky?: () => void
  /** open Notifications */
  onNotifs?: () => void
  /** your hand: saved event cards plus packs to open; the widget beside the sky pill */
  saved?: number
  onSaved?: () => void
  /** energy for event cards, shown in the sky pill */
  energy?: number
}

/** "Tonight's deck" header row + Today's Sky pill (S-05). */
export function DeckHeader({ title, right, rightKey, starPulse = 0, hidden, onSky, onNotifs, saved = 0, onSaved, energy }: HeaderProps) {
  return (
    <motion.div
      animate={{ opacity: hidden ? 0 : 1, y: hidden ? -8 : 0 }}
      transition={{ duration: 0.3 }}
      style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 150, zIndex: 20, pointerEvents: hidden ? 'none' : 'auto' }}
    >
      <div style={{ position: 'absolute', left: 24, top: 64, height: 44, width: 300 }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div key={title} className="h-display"
            initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            transition={{ duration: 0.45 }}
            style={{ position: 'absolute', left: 0, top: 0, fontSize: 36, whiteSpace: 'nowrap' }}
          >
            {title}
          </motion.div>
        </AnimatePresence>
      </div>
      <div style={{ position: 'absolute', right: 76, top: 72, height: 36, width: 132 }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={rightKey ?? 'r'}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', whiteSpace: 'nowrap' }}
          >
            {right}
          </motion.div>
        </AnimatePresence>
      </div>
      <NotifStar pulse={starPulse} onClick={onNotifs} />
      {/* Today's Sky pill */}
      <motion.button onClick={() => { sfx.tap(); onSky?.() }} aria-label="Open today's sky"
        initial={false} animate={{ right: 80 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
        position: 'absolute', left: 24, top: 108, height: 39, borderRadius: 999, overflow: 'hidden',
        background: 'linear-gradient(90deg, rgba(52,35,95,0.62), rgba(40,26,78,0.5))',
        border: '1px solid rgba(179,166,196,0.28)',
        backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        display: 'flex', alignItems: 'center', padding: '0 14px 0 11px', gap: 10,
      }}>
        <span style={{
          width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
          background: 'radial-gradient(circle at 32% 28%, #fff4cf 0%, #e8c070 30%, #9a6a2a 75%, #5a3a14 100%)',
          boxShadow: '0 0 8px rgba(242,199,92,0.4)',
        }} />
        <span className="serif italic" style={{ fontSize: 16, color: 'var(--label-1)', flex: 1, whiteSpace: 'nowrap', textAlign: 'left' }}>{SKY_PILL}</span>
        {energy != null && (
          <span className="mono" aria-label={`Energy ${energy}`} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 9.5, letterSpacing: '0.08em', fontWeight: 700, color: '#9fe8c8' }}>
            <span style={{ width: 26, height: 5, borderRadius: 3, background: 'rgba(159,232,200,0.2)', overflow: 'hidden' }}>
              <span style={{ display: 'block', width: `${energy}%`, height: '100%', background: '#9fe8c8' }} />
            </span>
            {energy}
          </span>
        )}
        <span className="mono" style={{ fontSize: 9, letterSpacing: '0.16em', color: '#f2c75c', whiteSpace: 'nowrap' }}>›</span>
      </motion.button>
      {/* your hand, next to the sky: saved events and packs, the way into your binder */}
      <motion.button key="hand" aria-label={`Your hand: ${saved}`} onClick={() => { sfx.tap(); onSaved?.() }}
        whileTap={{ scale: 0.92 }}
        style={{
          position: 'absolute', right: 24, top: 108, width: 48, height: 39, borderRadius: 999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(90deg, rgba(70,40,130,0.85), rgba(52,30,104,0.8))', border: '1px solid rgba(248,237,255,0.4)',
        }}>
        <HandIcon size={21} />
        {saved > 0 && (
          <motion.span key={saved} initial={{ scale: 1.6 }} animate={{ scale: 1 }} className="mono" style={{
            position: 'absolute', top: -6, right: -4, minWidth: 17, height: 17, padding: '0 4px', borderRadius: 9, fontSize: 9.5, fontWeight: 700,
            display: 'grid', placeItems: 'center', color: 'var(--chrome-ink)', background: 'var(--chrome)', boxShadow: '0 0 8px rgba(248,237,255,0.45)',
          }}>{saved}</motion.span>
        )}
      </motion.button>
    </motion.div>
  )
}

export function Counter({ left, total, plus = false }: { left: number; total: number; plus?: boolean }) {
  return (
    <span className="mono" style={{ fontSize: 10.5, letterSpacing: '0.1em', color: 'var(--label-2)', display: 'inline-flex', gap: 6, alignItems: 'center' }}>
      {plus && <span style={{ color: 'var(--align)', marginRight: 2 }}>✦</span>}
      <motion.span key={left}
        initial={{ scale: 1.8, color: '#f2c75c', y: -4 }}
        animate={{ scale: 1, color: '#b3a6c4', y: 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 14, color: { duration: 0.9 } }}
        style={{ display: 'inline-block', textShadow: '0 0 8px rgba(242,199,92,0.5)' }}
      >{left}</motion.span>
      <span>/</span>
      <span>{total}</span>
    </span>
  )
}

export function StatusText({ children }: { children: ReactNode }) {
  return <span className="mono" style={{ fontSize: 8.5, letterSpacing: '0.16em', color: 'var(--label-2)', textAlign: 'right', lineHeight: 1.45, whiteSpace: 'normal', display: 'block', width: 104 }}>{children}</span>
}

/** The two tilted violet-glass cards + the one peeking over the top. */
export function StackBacks({ bump = 0 }: { bump?: number }) {
  const w = CARD_W * CARD_SCALE
  const h = CARD_H * CARD_SCALE
  const glass = {
    position: 'absolute' as const, width: w, height: h, borderRadius: 19,
    background: 'linear-gradient(160deg, rgba(92,58,170,0.75) 0%, rgba(60,32,130,0.7) 45%, rgba(38,20,90,0.75) 100%)',
    border: '1.5px solid rgba(200,180,255,0.45)',
    boxShadow: '0 0 20px rgba(154,123,224,0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
  }
  const left = 195 - w / 2
  return (
    <motion.div key={bump} initial={bump ? { scale: 0.97 } : false} animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 14 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <div style={{ ...glass, top: CARD_TOP - 12, width: w * 0.5, height: 60, left: 195 - w * 0.25, transform: 'rotate(2.5deg)', borderRadius: 16, background: 'linear-gradient(180deg, rgba(92,58,170,0.6), rgba(60,32,130,0.5))' }} />
      <div style={{ ...glass, left: left - 34, top: CARD_TOP + 26, height: h - 62, transform: 'rotate(-7deg)' }} />
      <div style={{ ...glass, left: left + 34, top: CARD_TOP + 26, height: h - 62, transform: 'rotate(7deg)' }} />
    </motion.div>
  )
}

export function SwipeLabels({ alignStyle, releaseStyle, event = false }: { alignStyle?: object; releaseStyle?: object; event?: boolean }) {
  return (
    <>
      <motion.div className="mono" style={{ position: 'absolute', left: 28, top: 678, fontSize: 10.5, letterSpacing: '0.24em', color: 'var(--label-2)', transformOrigin: 'left center', ...releaseStyle }}>
        ←&nbsp;&nbsp; {event ? 'SAVE' : 'RELEASE'}
      </motion.div>
      <motion.div className="mono" style={{ position: 'absolute', right: 28, top: 678, fontSize: 10.5, letterSpacing: '0.24em', color: 'var(--label-2)', transformOrigin: 'right center', ...alignStyle }}>
        {event ? 'PLAY' : 'ALIGN'}&nbsp;&nbsp; →
      </motion.div>
    </>
  )
}
