import { FACE_GLYPH, FACE_LABEL, VARIANT_LABEL, VARIANT_RARITY, faceTitle, type Face, type Variant } from '../../data/archetypes'
import { SIGNS, type SignId } from '../../data/signs'
import { SEASON, PRINT_RUN, editionOf, fmt } from '../../data/seasons'
import { Corners, TAROT_RATIO } from './TalkCardFace'

const GOLD = '#f2d58a'

/**
 * A sign archetype card: full-art, the printable stand-in for a person.
 * Base cards have a sign-coloured gilt edge, Gilded is gold foil, Mythic holo.
 * Every copy is numbered against the season's print run. Each sign has four
 * faces (Sun, Moon, Rising, Venus), each with its own art treatment.
 */
const FACE_ART: Record<Face, { aura: boolean; pos: string; scale: number; flip: boolean; tint: string }> = {
  sun: { aura: false, pos: 'center 35%', scale: 1, flip: false, tint: 'transparent' },
  moon: { aura: true, pos: 'center 40%', scale: 1.1, flip: false, tint: 'linear-gradient(180deg, rgba(90,140,255,0.38), rgba(30,40,120,0.25))' },
  rising: { aura: false, pos: 'center 15%', scale: 1.6, flip: true, tint: 'linear-gradient(180deg, rgba(255,190,120,0.22), transparent 60%)' },
  venus: { aura: true, pos: 'center 55%', scale: 1.3, flip: true, tint: 'linear-gradient(180deg, rgba(255,110,180,0.38), rgba(140,30,110,0.25))' },
}

export default function ArchetypeCard({ sign, face = 'sun', variant = 'base', width = 150, dim = false, edition = true }: { sign: SignId; face?: Face; variant?: Variant; width?: number; dim?: boolean; edition?: boolean }) {
  const s = width / 150
  const z = SIGNS[sign]
  const art = FACE_ART[face]
  const rarity = VARIANT_RARITY[variant]
  const id = `${sign}:${face}:${variant}:${SEASON.id}`
  const inner = (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 9.5 * s, overflow: 'hidden', background: '#0b0620' }}>
      <img src={art.aura ? z.auraImg : z.figureImg} alt="" draggable={false} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: art.pos,
        transform: `scale(${art.flip ? -art.scale : art.scale}, ${art.scale})`,
        filter: variant === 'mythic' ? 'saturate(1.35) hue-rotate(-12deg)' : variant === 'gilded' ? 'sepia(0.35) saturate(1.3)' : 'none',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: art.tint, mixBlendMode: 'screen' }} />
      {/* top and bottom shade for the type */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,4,24,0.75) 0%, transparent 22%, transparent 55%, rgba(8,4,24,0.92) 82%)' }} />
      <div style={{ position: 'absolute', inset: 5 * s, borderRadius: 7 * s, border: `${Math.max(0.6, s)}px solid ${GOLD}aa`, pointerEvents: 'none' }} />
      <Corners s={s} />
      <div className="serif" style={{ position: 'absolute', top: 10 * s, left: 0, right: 0, textAlign: 'center', fontSize: 15 * s, color: GOLD, textShadow: '0 0 8px #000' }}>{z.glyph}{'\uFE0E'}<span style={{ fontSize: 11 * s, marginLeft: 5 * s }}>{FACE_GLYPH[face]}</span></div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 11 * s, textAlign: 'center', padding: `0 ${10 * s}px` }}>
        <div className="serif" style={{ fontSize: 9.5 * s, letterSpacing: '0.12em', whiteSpace: 'nowrap', textTransform: 'uppercase', color: GOLD }}>{z.name} · {FACE_LABEL[face]}</div>
        <div className="serif italic" style={{ fontSize: 14 * s, lineHeight: 1.1, color: 'var(--label-1)', marginTop: 1 * s, textShadow: '0 1px 6px #000' }}>{faceTitle(sign, face)}</div>
        {edition && (
          <div className="mono" style={{ marginTop: 4 * s, fontSize: 5.5 * s, letterSpacing: '0.14em', color: `${GOLD}cc`, textTransform: 'uppercase' }}>
            {VARIANT_LABEL[variant]} · № {fmt(editionOf(id, rarity))} / {fmt(PRINT_RUN[rarity])}
          </div>
        )}
      </div>
    </div>
  )
  const box: React.CSSProperties = { width, height: width * TAROT_RATIO, borderRadius: 12 * s, padding: 3 * s, flexShrink: 0, opacity: dim ? 0.35 : 1 }
  if (variant === 'mythic') return <div className="holo-frame" style={{ ...box, boxShadow: '0 0 24px rgba(255,140,220,0.5)' }}>{inner}</div>
  return (
    <div style={{
      ...box,
      background: variant === 'gilded' ? 'var(--gold-foil)' : `linear-gradient(155deg, #f8e7b0 0%, ${z.color} 35%, #9c7a34 62%, #f8e7b0 100%)`,
      boxShadow: `0 0 ${16 * s}px ${z.color}66, 0 ${10 * s}px ${24 * s}px rgba(0,0,0,0.5)`,
    }}>{inner}</div>
  )
}
