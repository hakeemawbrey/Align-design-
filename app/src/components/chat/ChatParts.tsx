import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import AlignMark from '../intro/AlignMark'
import AuraPair from './AuraPair'
import { MY_READING_TITLE, READINGS } from './readings'

/* ───────────────────────── header ───────────────────────── */

export function ChatHeader({ onBack, onSky, onMore, onWho, photo, name, sub }: {
  onBack: () => void; onSky?: () => void; onMore?: () => void
  /** tap on the thumbnail + name (her card); falls back to onSky */
  onWho?: () => void
  photo: string; name: string
  /** small mono line under the name, e.g. MATCHED 2 MINUTES AGO */
  sub?: string
}) {
  const who = (
    <>
      <div style={{
        width: 30, height: 43, borderRadius: 5, padding: 2,
        border: '1.5px solid #e163d6', background: '#2a1640',
        boxShadow: '0 0 12px rgba(225, 99, 214, 0.45)',
        display: 'flex', flexDirection: 'column', gap: 2,
      }}>
        <img src={photo} alt={name} style={{ width: '100%', height: 26, objectFit: 'cover', objectPosition: '50% 25%', borderRadius: 2 }} />
        <div style={{ height: 2, width: '80%', borderRadius: 1, background: 'rgba(239,230,214,0.45)', marginLeft: 1 }} />
        <div style={{ height: 2, width: '55%', borderRadius: 1, background: 'rgba(239,230,214,0.25)', marginLeft: 1 }} />
      </div>
      <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <span className="serif italic" style={{ fontSize: 23, color: 'var(--label-1)', lineHeight: sub ? 1.05 : undefined }}>{name}</span>
        {sub && <span className="mono" style={{ fontSize: 8.5, letterSpacing: '0.2em', color: 'var(--label-3)', textTransform: 'uppercase', marginTop: 3 }}>{sub}</span>}
      </span>
    </>
  )
  const whoStyle: React.CSSProperties = { position: 'absolute', left: 60, top: 10, display: 'flex', alignItems: 'center', gap: 10 }
  return (
    <div style={{ position: 'absolute', top: 44, left: 0, right: 0, height: 64, borderBottom: '1px solid rgba(179,166,196,0.16)', zIndex: 5 }}>
      <motion.button
        onClick={onBack}
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Back"
        style={{ position: 'absolute', left: 16, top: 12, width: 40, height: 40, display: 'grid', placeItems: 'center', color: 'var(--label-1)' }}
      >
        <svg width="11" height="18" viewBox="0 0 11 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 1.5 2 9l7.5 7.5" /></svg>
      </motion.button>

      {onWho || onSky ? (
        <motion.button onClick={onWho ?? onSky} aria-label={onWho ? `${name}’s card` : undefined} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={whoStyle}>{who}</motion.button>
      ) : (
        <div style={whoStyle}>{who}</div>
      )}

      {onMore && (
        <motion.button onClick={onMore} whileTap={{ scale: 0.9 }} aria-label="Report or block"
          style={{ position: 'absolute', right: onSky ? 68 : 16, top: 12, width: 40, height: 40, display: 'grid', placeItems: 'center', color: 'var(--label-2)' }}>
          <svg width="18" height="4" viewBox="0 0 18 4" fill="currentColor"><circle cx="2" cy="2" r="1.8" /><circle cx="9" cy="2" r="1.8" /><circle cx="16" cy="2" r="1.8" /></svg>
        </motion.button>
      )}

      {onSky && (
        <motion.button
          onClick={onSky}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Cosmic alignment"
          style={{ position: 'absolute', right: 16, top: 12, width: 48, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, color: 'var(--label-3)' }}
        >
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} style={{ width: 24, height: 24 }}>
            <AlignMark size={24} dots={false} strokeOpacity={0.95} strokeWidth={2.4} />
          </motion.div>
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="m1 1 5 5-5 5" /></svg>
        </motion.button>
      )}
    </div>
  )
}

/* ───────────────────────── expiry timer ───────────────────────── */

export function ExpiryBar({ daysLeft = 6, warn = daysLeft <= 2 }: { daysLeft?: number; warn?: boolean }) {
  if (daysLeft <= 0) return null
  const amber = '#f08a3c'
  const lit = warn ? amber : 'rgba(179,166,196,0.72)'
  return (
    <div style={{ position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center', zIndex: 5 }}>
      <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.34em', color: warn ? amber : 'var(--label-2)', textTransform: 'uppercase' }}>
        Expires in {daysLeft} {daysLeft === 1 ? 'day' : 'days'}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 9 }}>
        {Array.from({ length: 7 }, (_, i) => {
          const spent = i < 7 - daysLeft
          const next = i === 7 - daysLeft
          return (
            <div key={i} style={{ position: 'relative', width: 24, height: 2, borderRadius: 1, background: 'rgba(87,75,109,0.55)', overflow: 'hidden' }}>
              {!spent && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1, opacity: next ? [1, 0.35, 1] : 1 }}
                  transition={{
                    scaleX: { delay: 0.3 + i * 0.07, duration: 0.35, ease: 'easeOut' },
                    opacity: next ? { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 } : undefined,
                  }}
                  style={{ position: 'absolute', inset: 0, background: lit, transformOrigin: 'left', boxShadow: warn ? `0 0 6px ${amber}` : 'none' }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ───────────────────────── typing indicator ───────────────────────── */

export function TypingIndicator({ name }: { name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4, transition: { duration: 0.15 } }}
      style={{ textAlign: 'center', padding: '10px 0 6px' }}
    >
      <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--spark)', textTransform: 'uppercase', fontWeight: 700 }}>
        {name} is typing
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 7, marginTop: 8 }}>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
            style={{ width: 3.5, height: 3.5, borderRadius: 2, background: 'var(--label-2)' }}
          />
        ))}
      </div>
    </motion.div>
  )
}

/* ───────────────────────── read receipt ───────────────────────── */

export function Receipt({ seen }: { seen: boolean }) {
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      style={{ textAlign: 'center', padding: '14px 0 2px' }}
    >
      <motion.div key={seen ? 's' : 'u'} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.2em', fontWeight: 700, color: seen ? 'var(--spark)' : 'var(--label-2)' }}>
          {seen ? 'SEEN' : 'DELIVERED'}
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--label-3)', marginTop: 4 }}>
          {seen ? 'just now' : ''}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ───────────────────────── inline alignment card (S-09b) ───────────────────────── */

export function InlineAlignmentCard({ onOpen }: { onOpen: () => void }) {
  const [tab, setTab] = useState(0)
  useEffect(() => {
    const t = window.setInterval(() => setTab((x) => (x + 1) % READINGS.length), 1400)
    return () => clearInterval(t)
  }, [])
  const r = READINGS[tab]

  return (
    <motion.button
      onClick={onOpen}
      initial={{ opacity: 0, y: 20, scale: 0.94, rotateX: 18 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      style={{
        position: 'relative', display: 'block', width: 300, margin: '18px auto 4px', padding: '14px 14px 12px',
        borderRadius: 18, textAlign: 'center', overflow: 'hidden',
        background:
          'radial-gradient(60% 80% at 50% 0%, rgba(150, 90, 240, 0.45), transparent 70%),' +
          'linear-gradient(180deg, rgba(64, 34, 132, 0.92), rgba(44, 22, 96, 0.92))',
        border: '1.5px solid rgba(214, 196, 245, 0.5)',
        boxShadow: '0 0 30px rgba(154, 123, 224, 0.28), inset 0 1px 0 rgba(255,255,255,0.12)',
      }}
    >
      <div className="mono" style={{ fontSize: 8.5, letterSpacing: '0.26em', color: 'var(--label-2)' }}>
        JUNIPER × YOU · TONIGHT&apos;S READING
      </div>
      <div style={{ marginTop: 6 }}>
        <AuraPair size={46} gap={38} />
      </div>
      <div className="serif italic" style={{ fontSize: 21, marginTop: 6, color: 'var(--label-1)' }}>{MY_READING_TITLE.title}</div>
      <div style={{ fontSize: 12.5, color: 'var(--label-2)', marginTop: 2 }}>{MY_READING_TITLE.line}</div>

      <div style={{
        display: 'flex', justifyContent: 'space-between', marginTop: 10, padding: 3, borderRadius: 999,
        background: 'rgba(20, 10, 46, 0.45)', border: '1px solid rgba(179,166,196,0.18)', position: 'relative',
      }}>
        {READINGS.map((x, i) => (
          <div key={x.id} style={{ position: 'relative', flex: x.id === 'relationship' ? 1.7 : 1, height: 20, display: 'grid', placeItems: 'center' }}>
            {i === tab && (
              <motion.div layoutId="inline-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                style={{ position: 'absolute', inset: 0, borderRadius: 999, background: x.pill }} />
            )}
            <span className="mono" style={{ position: 'relative', fontSize: 7.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: i === tab ? x.color : 'var(--label-3)', fontWeight: 700 }}>
              {x.label}
            </span>
          </div>
        ))}
      </div>
      <div className="mono" style={{ marginTop: 9, fontSize: 8.5, letterSpacing: '0.2em', color: r.color, transition: 'color .3s' }}>
        TAP TO READ ›
      </div>
    </motion.button>
  )
}

/* ───────────────────────── thread notes (S-09c / e / f / g) ───────────────────────── */

export const AMBER = '#f08a3c'
const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven']
/** 2 → 'two', 9 → '9' */
export const inWords = (n: number) => WORDS[n] ?? String(n)
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

type NoteKind = 'unread' | 'failed' | 'expiring' | 'closed'

/**
 * The small centred line under the thread: a status for your last message
 * (sent but unread, not sent) or for the card itself (closing soon, closed).
 */
export function ThreadNote({ kind, name, pronoun = 'she', daysLeft = 0, onTap }: {
  kind: NoteKind
  name: string
  pronoun?: 'he' | 'she' | 'they'
  daysLeft?: number
  /** failed: retry · closed: what this means */
  onTap?: () => void
}) {
  const they = cap(pronoun)
  const has = pronoun === 'they' ? 'have' : 'has'
  const quiet = Math.max(0, 7 - daysLeft)
  const days = `${inWords(daysLeft)} ${daysLeft === 1 ? 'day' : 'days'}`
  const copy: Record<NoteKind, { head: React.ReactNode; body: string; color: string }> = {
    unread: { head: 'SENT · NOT READ YET', body: `${they} ${has} ${days} to answer.`, color: 'var(--label-2)' },
    failed: {
      head: (<><svg width="9" height="8" viewBox="0 0 9 8" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" style={{ marginRight: 7, verticalAlign: '-0.5px' }}><path d="M4.5 0.8 8.3 7.3H0.7z" /></svg>NOT SENT · TAP TO RETRY</>),
      body: 'No connection. Your message is saved.', color: 'var(--rub)',
    },
    expiring: {
      head: `FALLS OFF ALIGNMENT IN ${daysLeft} ${daysLeft === 1 ? 'DAY' : 'DAYS'}`,
      body: `${cap(inWords(quiet))} quiet days. Say something before the card goes back.`, color: AMBER,
    },
    closed: { head: 'THIS CONNECTION CLOSED', body: `${name} let the card go.`, color: 'var(--label-2)' },
  }
  const c = copy[kind]
  const inner = (
    <>
      <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.2em', fontWeight: 700, color: c.color }}>{c.head}</div>
      <div style={{ fontSize: 11.5, color: 'var(--label-3)', marginTop: 5, lineHeight: 1.35 }}>{c.body}</div>
      {kind === 'closed' && onTap && (
        <div className="mono" style={{ fontSize: 8.5, letterSpacing: '0.2em', color: 'var(--label-2)', marginTop: 10 }}>WHAT THIS MEANS ›</div>
      )}
    </>
  )
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.3 }}
      style={{ textAlign: 'center', padding: '16px 0 4px' }}
    >
      {onTap ? (
        <motion.button whileTap={{ scale: 0.96 }} onClick={onTap} style={{ display: 'block', margin: '0 auto', padding: '4px 12px', minHeight: 38, textAlign: 'center' }}>
          {inner}
        </motion.button>
      ) : inner}
    </motion.div>
  )
}
