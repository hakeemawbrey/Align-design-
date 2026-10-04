import type { Sign } from '../../data/signs'

interface Props {
  sign: Sign
  /** 0–1 extra glow (charge before the collision) */
  charge?: number
  phase?: number
}

/**
 * A blurred AuraCam silhouette, feathered into the void, with the sign glyph
 * glowing on its chest. Meant to sit inside a `mix-blend-mode: screen` parent
 * so two orbs add light where they overlap.
 */
export default function AuraOrb({ sign, charge = 0, phase = 0 }: Props) {
  const mask = 'radial-gradient(50% 50% at 50% 50%, #000 42%, rgba(0,0,0,0.6) 62%, transparent 100%)'
  return (
    <div style={{ position: 'absolute', inset: 0, animation: `rv-breathe 3.6s ease-in-out ${phase}s infinite` }}>
      {/* coloured bloom */}
      <div style={{
        position: 'absolute', inset: '-14%', borderRadius: '50%',
        background: `radial-gradient(50% 50% at 50% 55%, ${sign.color}cc 0%, ${sign.color}55 40%, transparent 72%)`,
        filter: 'blur(18px)',
        opacity: 0.45 + 0.55 * charge,
        transition: 'opacity .5s ease',
      }} />
      <img
        src={sign.auraImg}
        alt=""
        draggable={false}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          WebkitMaskImage: mask, maskImage: mask,
          filter: `blur(3px) saturate(1.5) brightness(${1.15 + 0.45 * charge})`,
          transition: 'filter .5s ease',
        }}
      />
      {/* crisp glyph with neon glow over the soft one */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '62%', textAlign: 'center',
        fontSize: 40, lineHeight: 1, color: sign.light,
        textShadow: `0 0 6px ${sign.light}, 0 0 16px ${sign.color}, 0 0 30px ${sign.color}`,
        opacity: 0.85,
        fontFamily: 'system-ui, "Segoe UI Symbol", "Apple Symbols", sans-serif',
        fontVariantEmoji: 'text',
      } as React.CSSProperties}>
        {sign.glyph}{'︎'}
      </div>
    </div>
  )
}
