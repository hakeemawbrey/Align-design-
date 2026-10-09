import { TOPICS, type TalkCard } from '../../data/talkCards'

export const KIND_LABEL = { ask: 'Question', pick: 'This or that', who: 'Who’s more likely' } as const

/** A talk card, face up. Rare cards get a gold edge, legendary the holo frame. */
export default function TalkCardFace({ card, width = 150, dim = false }: { card: TalkCard; width?: number; dim?: boolean }) {
  const t = TOPICS[card.topic]
  const s = width / 150
  const inner = (
    <div style={{
      position: 'relative', width: '100%', height: '100%', borderRadius: 12 * s, overflow: 'hidden',
      padding: `${10 * s}px ${11 * s}px`, display: 'flex', flexDirection: 'column',
      background: `radial-gradient(120% 70% at 50% 0%, ${t.color}33 0%, transparent 60%), linear-gradient(170deg, #2a1660 0%, #170c38 70%, #120a2a 100%)`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 * s }}>
        <span style={{
          width: 20 * s, height: 20 * s, borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: 11 * s, color: '#140a2e',
          background: t.color, boxShadow: `0 0 ${8 * s}px ${t.color}aa`, flexShrink: 0,
        }}>{t.glyph}</span>
        <span className="mono" style={{ fontSize: 6.5 * s, letterSpacing: '0.16em', textTransform: 'uppercase', color: t.color, lineHeight: 1.2 }}>
          {t.label}
        </span>
      </div>
      <div className="serif italic" style={{
        flex: 1, display: 'flex', alignItems: 'center', fontSize: 15 * s, lineHeight: 1.2, color: 'var(--label-1)', marginTop: 6 * s,
      }}>
        {card.q}
      </div>
      {card.kind === 'pick' && card.opts && (
        <div className="mono" style={{ fontSize: 6.5 * s, letterSpacing: '0.12em', color: 'var(--label-2)', textTransform: 'uppercase', marginBottom: 4 * s }}>
          {card.opts[0]} · or · {card.opts[1]}
        </div>
      )}
      <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 6 * s, letterSpacing: '0.14em', color: 'var(--label-3)', textTransform: 'uppercase' }}>
        <span>{KIND_LABEL[card.kind]}</span>
        <span style={{ color: card.rarity === 'legendary' ? '#ffd36a' : card.rarity === 'rare' ? '#f2c75c' : 'var(--label-3)' }}>
          {card.rarity === 'common' ? 'Talk card' : card.rarity}
        </span>
      </div>
    </div>
  )
  const box: React.CSSProperties = { width, height: width * 1.36, borderRadius: 13 * s, opacity: dim ? 0.38 : 1, flexShrink: 0 }
  if (card.rarity === 'legendary') return <div className="holo-frame" style={{ ...box, padding: 2 * s }}>{inner}</div>
  return (
    <div style={{
      ...box, padding: 1.5 * s,
      background: card.rarity === 'rare' ? 'var(--gold-foil)' : `linear-gradient(160deg, ${t.color}cc, ${t.color}44)`,
      boxShadow: `0 0 ${14 * s}px ${t.color}44, 0 ${8 * s}px ${20 * s}px rgba(0,0,0,0.45)`,
    }}>{inner}</div>
  )
}
