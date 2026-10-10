import type { Pull } from '../../lib/talk'
import { EVENTS } from '../../data/draws'
import { placeById } from '../../data/places'
import TalkCardFace, { Corners, TAROT_RATIO } from './TalkCardFace'
import ArchetypeCard from './ArchetypeCard'

const GOLD = '#f2d58a'

/** what a pull is, in one word, for tallies and captions */
export const PULL_KIND = { talk: 'Talk', sign: 'Sign', event: 'Event', place: 'Place', energy: 'Energy' } as const

/**
 * Any card out of a pack, at tarot size. Talk and sign cards have their own
 * faces; events, places and energy share this one, each in its own colour.
 */
export default function PullFace({ pull, width = 150 }: { pull: Pull; width?: number }) {
  if (pull.kind === 'talk') return <TalkCardFace card={pull.card} width={width} />
  if (pull.kind === 'sign') return <ArchetypeCard sign={pull.sign} variant={pull.variant} width={width} />
  if (pull.kind === 'event') {
    const e = EVENTS[pull.id]
    return <Face width={width} color={e.color} light={e.light} eyebrow={`Event · ${e.kind}`} glyph={e.glyph} title={e.title} line={e.what} foot={e.rarity} art={e.aura} />
  }
  if (pull.kind === 'place') {
    const p = placeById(pull.id)
    return <Face width={width} color="#7fd8b0" light="#d2f5e4" eyebrow={`Place · ${p?.area ?? ''}`} glyph={p?.emoji ?? '⌂'} title={p?.name ?? 'A place'} line={p?.line ?? ''} foot="Play in chat" />
  }
  return <Face width={width} color="#9fe8c8" light="#e3fff2" eyebrow="Energy" glyph="☽" title={`+${pull.amount} energy`} line="Spend it on event cards in your deck." foot={pull.amount >= 30 ? 'Full moon' : pull.amount >= 20 ? 'Half moon' : 'New moon'} />
}

function Face({ width, color, light, eyebrow, glyph, title, line, foot, art }: {
  width: number; color: string; light: string; eyebrow: string; glyph: string; title: string; line: string; foot: string; art?: string
}) {
  const s = width / 150
  return (
    <div style={{
      width, height: width * TAROT_RATIO, borderRadius: 12 * s, padding: 3 * s, flexShrink: 0,
      background: `linear-gradient(155deg, ${light} 0%, ${color} 35%, #4a3a6a 62%, ${light} 100%)`,
      boxShadow: `0 0 ${14 * s}px ${color}55, 0 ${8 * s}px ${20 * s}px rgba(0,0,0,0.5)`,
    }}>
      <div style={{
        position: 'relative', width: '100%', height: '100%', borderRadius: 9.5 * s, overflow: 'hidden',
        background: `radial-gradient(110% 55% at 50% 30%, ${color}44 0%, transparent 65%), linear-gradient(180deg, #1a0f38, #0d0822)`,
      }}>
        {art && <img src={art} alt="" draggable={false} style={{ position: 'absolute', left: '14%', top: '11%', width: '72%', height: '34%', objectFit: 'cover', borderRadius: '50% 50% 8px 8px', opacity: 0.55 }} />}
        <div style={{ position: 'absolute', inset: 5 * s, borderRadius: 7 * s, border: `${Math.max(0.6, s)}px solid ${GOLD}88`, pointerEvents: 'none' }} />
        <Corners s={s} />
        <div className="mono" style={{ position: 'absolute', top: 13 * s, left: 0, right: 0, textAlign: 'center', fontSize: 6.5 * s, letterSpacing: '0.2em', textTransform: 'uppercase', color: light }}>{eyebrow}</div>
        <div style={{ position: 'absolute', top: 56 * s, left: 0, right: 0, textAlign: 'center', fontSize: 40 * s, lineHeight: 1, color: light, textShadow: `0 0 ${14 * s}px ${color}` }}>{glyph}</div>
        <div style={{ position: 'absolute', left: 12 * s, right: 12 * s, top: 142 * s, textAlign: 'center' }}>
          <div className="serif italic" style={{ fontSize: 17 * s, lineHeight: 1.1, color: 'var(--label-1)' }}>{title}</div>
          <div className="serif" style={{ marginTop: 6 * s, fontSize: 10.5 * s, lineHeight: 1.3, color: 'var(--label-2)' }}>{line}</div>
        </div>
        <div className="mono" style={{ position: 'absolute', bottom: 13 * s, left: 0, right: 0, textAlign: 'center', fontSize: 6 * s, letterSpacing: '0.18em', textTransform: 'uppercase', color: `${GOLD}cc` }}>{foot}</div>
      </div>
    </div>
  )
}
