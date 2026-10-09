import { ARCANA, TOPICS, type TalkCard, type TalkTopic } from '../../data/talkCards'
import TarotEmblem from './TarotEmblem'

export const KIND_LABEL = { ask: 'Question', pick: 'This or that', who: 'Who’s more likely' } as const

const GOLD = '#f2d58a'
/** tarot proportions */
export const TAROT_RATIO = 1.72

/** a field of tiny stars for the card's night sky */
const STARFIELD = 'radial-gradient(1px 1px at 18% 22%, #fff9 50%, transparent 51%), radial-gradient(1px 1px at 72% 14%, #fff7 50%, transparent 51%), radial-gradient(1.2px 1.2px at 84% 58%, #fff8 50%, transparent 51%), radial-gradient(1px 1px at 12% 70%, #fff6 50%, transparent 51%), radial-gradient(1px 1px at 46% 88%, #fff5 50%, transparent 51%), radial-gradient(1px 1px at 92% 86%, #fff6 50%, transparent 51%)'

/** Gilt outer edge: topic-tinted gold, full gold foil for rare, holo for legendary. */
export function Gilt({ rarity, topic, s, children, style }: { rarity: TalkCard['rarity']; topic: TalkTopic; s: number; children: React.ReactNode; style?: React.CSSProperties }) {
  const t = TOPICS[topic]
  const box: React.CSSProperties = { borderRadius: 12 * s, padding: 3 * s, flexShrink: 0, ...style }
  if (rarity === 'legendary') return <div className="holo-frame" style={{ ...box, boxShadow: '0 0 24px rgba(255,140,220,0.45)' }}>{children}</div>
  return (
    <div style={{
      ...box,
      background: rarity === 'rare' ? 'var(--gold-foil)' : `linear-gradient(155deg, #f8e7b0 0%, ${t.color} 35%, #9c7a34 62%, #f8e7b0 100%)`,
      boxShadow: `0 0 ${16 * s}px ${t.color}55, 0 ${10 * s}px ${24 * s}px rgba(0,0,0,0.5)`,
    }}>{children}</div>
  )
}

/** Small four-point stars in the inner corners. */
export function Corners({ s, color = GOLD }: { s: number; color?: string }) {
  const p = 9 * s
  const star = (st: React.CSSProperties) => (
    <svg width={7 * s} height={7 * s} viewBox="0 0 10 10" style={{ position: 'absolute', ...st }}>
      <path d="M5 0Q5.9 4.1 10 5Q5.9 5.9 5 10Q4.1 5.9 0 5Q4.1 4.1 5 0Z" fill={color} />
    </svg>
  )
  return <>{star({ left: p, top: p })}{star({ right: p, top: p })}{star({ left: p, bottom: p })}{star({ right: p, bottom: p })}</>
}

/** A talk card, face up, drawn as a tarot card of Align's deck. */
export default function TalkCardFace({ card, width = 150, dim = false }: { card: TalkCard; width?: number; dim?: boolean }) {
  const t = TOPICS[card.topic]
  const a = ARCANA[card.topic]
  const s = width / 150
  return (
    <Gilt rarity={card.rarity} topic={card.topic} s={s} style={{ width, height: width * TAROT_RATIO, opacity: dim ? 0.38 : 1 }}>
      <div style={{
        position: 'relative', width: '100%', height: '100%', borderRadius: 9.5 * s, overflow: 'hidden',
        background: `${STARFIELD}, radial-gradient(90% 55% at 50% 30%, ${t.color}40 0%, transparent 70%), linear-gradient(175deg, #241252 0%, #140a33 55%, #0d0724 100%)`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', padding: `${12 * s}px ${12 * s}px ${10 * s}px`,
      }}>
        {/* engraved inner rules */}
        <div style={{ position: 'absolute', inset: 5 * s, borderRadius: 7 * s, border: `${Math.max(0.6, 1 * s)}px solid ${GOLD}aa`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 8 * s, borderRadius: 5 * s, border: `${Math.max(0.4, 0.6 * s)}px solid ${GOLD}44`, pointerEvents: 'none' }} />
        <Corners s={s} />

        {/* numeral */}
        <div className="serif" style={{ display: 'flex', alignItems: 'center', gap: 6 * s, fontSize: 11 * s, letterSpacing: '0.18em', color: GOLD, marginTop: 1 * s }}>
          <span style={{ width: 12 * s, height: 1, background: `${GOLD}99` }} />{a.numeral}<span style={{ width: 12 * s, height: 1, background: `${GOLD}99` }} />
        </div>

        {/* arched window with the emblem */}
        <div style={{
          position: 'relative', width: '78%', height: '42%', marginTop: 6 * s, borderRadius: `${60 * s}px ${60 * s}px ${6 * s}px ${6 * s}px`,
          border: `${Math.max(0.6, 1 * s)}px solid ${GOLD}cc`, display: 'grid', placeItems: 'center', overflow: 'hidden',
          background: `radial-gradient(70% 60% at 50% 45%, ${t.color}55 0%, ${t.color}18 55%, transparent 100%), linear-gradient(180deg, #1c0e44, #120930)`,
          boxShadow: `inset 0 0 ${14 * s}px ${t.color}55`,
        }}>
          <TarotEmblem topic={card.topic} size={66 * s} glow={t.color} />
        </div>

        {/* arcana banner */}
        <div className="serif" style={{
          marginTop: 7 * s, padding: `${2.5 * s}px ${8 * s}px`, fontSize: 9.5 * s, letterSpacing: '0.22em', textTransform: 'uppercase', color: GOLD,
          borderTop: `${Math.max(0.5, 0.8 * s)}px solid ${GOLD}88`, borderBottom: `${Math.max(0.5, 0.8 * s)}px solid ${GOLD}88`, whiteSpace: 'nowrap',
        }}>
          {a.name}
        </div>

        {/* the question */}
        <div className="serif italic" style={{
          flex: 1, display: 'flex', alignItems: 'center', textAlign: 'center', marginTop: 6 * s, fontSize: 12.5 * s, lineHeight: 1.22, color: 'var(--label-1)',
          overflow: 'hidden',
        }}>
          <span style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{card.q}</span>
        </div>

        {/* foot */}
        <div className="mono" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: 5.5 * s, letterSpacing: '0.16em', textTransform: 'uppercase', color: `${GOLD}aa`, padding: `0 ${9 * s}px` }}>
          <span>{t.label}</span>
          <span style={{ color: card.rarity === 'common' ? `${GOLD}aa` : '#ffe08a' }}>{card.rarity === 'common' ? KIND_LABEL[card.kind] : `✦ ${card.rarity}`}</span>
        </div>
      </div>
    </Gilt>
  )
}

/** The back of every talk card: sun, moon and star in gold. */
export function TalkCardBack({ width = 150, color = '#b18cff' }: { width?: number; color?: string }) {
  const s = width / 150
  return (
    <div style={{ width, height: width * TAROT_RATIO, borderRadius: 12 * s, padding: 3 * s, background: `linear-gradient(155deg, #f8e7b0, #b08a3a 45%, #f8e7b0)`, boxShadow: '0 10px 24px rgba(0,0,0,0.5)' }}>
      <div style={{
        position: 'relative', width: '100%', height: '100%', borderRadius: 9.5 * s, overflow: 'hidden', display: 'grid', placeItems: 'center',
        background: `${STARFIELD}, radial-gradient(60% 40% at 50% 50%, ${color}55, transparent 70%), linear-gradient(175deg, #2a1462, #120930)`,
      }}>
        <div style={{ position: 'absolute', inset: 5 * s, borderRadius: 7 * s, border: `1px solid ${GOLD}aa` }} />
        <Corners s={s} />
        <svg width={92 * s} height={92 * s} viewBox="0 0 100 100" style={{ filter: `drop-shadow(0 0 ${4 * s}px ${color})` }}>
          <circle cx="50" cy="50" r="40" fill="none" stroke={GOLD} strokeWidth="1" opacity=".6" />
          <circle cx="50" cy="50" r="30" fill="none" stroke={GOLD} strokeWidth=".8" strokeDasharray="2 3" opacity=".7" />
          <path d="M50 22 L54 46 L78 50 L54 54 L50 78 L46 54 L22 50 L46 46 Z" fill={GOLD} />
          <circle cx="50" cy="10" r="4" fill={GOLD} />
          <path d="M54 84a6 6 0 1 0 0 12a4.6 4.6 0 1 1 0-12z" fill={GOLD} transform="translate(-4 -4)" />
        </svg>
      </div>
    </div>
  )
}
