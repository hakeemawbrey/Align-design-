import type { CSSProperties, ReactNode } from 'react'

/**
 * The card frame the beta's widgets share, so "how you fit", your sign and the
 * sky all read as cards from the same deck as the people: a thick foil border
 * in the card's colour, a dark face with a wash of that colour at the top, a
 * title bar with an orb, an optional "try" strip and a footer line.
 */

/** the foil: the tint, its lighter self, a white glint, and back, like the deck cards */
export const foil = (tint: string) => {
  const light = `color-mix(in srgb, ${tint} 55%, white)`
  return `linear-gradient(160deg, ${tint} 0%, ${light} 22%, #fff 42%, ${light} 58%, ${tint} 78%, ${light} 100%)`
}

interface Props {
  /** the card's colour: its border, glow and labels */
  tint: string
  children?: ReactNode
  /** small mono line over the title */
  kicker?: ReactNode
  title?: ReactNode
  /** top-right, like the element orb on a person's card */
  orb?: ReactNode
  /** the strip at the foot of the face, e.g. something to try */
  strip?: { label: string; text: ReactNode }
  /** mono footer, left and right, e.g. ['ALIGN · HOW YOU FIT', '1/4'] */
  footer?: [ReactNode, ReactNode?]
  /** border thickness */
  thick?: number
  radius?: number
  /** dimmer border and no glow, for a card that isn't the selected one */
  quiet?: boolean
  glow?: boolean
  padding?: CSSProperties['padding']
  style?: CSSProperties
}

export default function CardFrame({ tint, children, kicker, title, orb, strip, footer, thick = 3, radius = 20, quiet = false, glow = true, padding = '14px 16px', style }: Props) {
  return (
    <div style={{
      borderRadius: radius, padding: thick,
      background: quiet ? `color-mix(in srgb, ${tint} 38%, #2a1c50)` : foil(tint),
      boxShadow: glow && !quiet ? `0 0 22px color-mix(in srgb, ${tint} 35%, transparent), 0 10px 26px rgba(5,2,15,0.5)` : '0 8px 20px rgba(5,2,15,0.4)',
      ...style,
    }}>
      <div style={{
        position: 'relative', height: '100%', borderRadius: radius - thick, overflow: 'hidden',
        background: `radial-gradient(120% 70px at 50% 0%, color-mix(in srgb, ${tint} 26%, transparent) 0%, transparent 100%), linear-gradient(180deg, #1b112f 0%, #130c22 60%, #100a1c 100%)`,
      }}>
        <div style={{ padding }}>
          {(title || kicker || orb) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: children ? 10 : 0 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                {kicker && <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.18em', fontWeight: 700, color: tint, textTransform: 'uppercase' }}>{kicker}</div>}
                {title && <div className="serif italic" style={{ fontSize: 21, lineHeight: 1.15, color: 'var(--label-1)', marginTop: kicker ? 3 : 0 }}>{title}</div>}
              </div>
              {orb}
            </div>
          )}
          {children}
        </div>
        {strip && (
          <div style={{ margin: '0 12px', padding: '10px 4px 12px', borderTop: `1px solid color-mix(in srgb, ${tint} 40%, transparent)` }}>
            <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.18em', fontWeight: 700, color: tint }}>{strip.label.toUpperCase()}</div>
            <div className="serif italic" style={{ fontSize: 16.5, lineHeight: 1.3, color: 'var(--label-1)', marginTop: 4 }}>{strip.text}</div>
          </div>
        )}
        {footer && (
          <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', gap: 8, padding: '0 16px 10px', fontSize: 8, letterSpacing: '0.16em', color: 'var(--label-3)', textTransform: 'uppercase' }}>
            <span>{footer[0]}</span><span>{footer[1]}</span>
          </div>
        )}
      </div>
    </div>
  )
}

/** the round badge in a card's corner: a glyph on the card's colour */
export function CardOrb({ tint, children, size = 36 }: { tint: string; children: ReactNode; size?: number }) {
  return (
    <span aria-hidden style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0, display: 'grid', placeItems: 'center', fontSize: size * 0.46, color: '#1a0f2e',
      background: `radial-gradient(circle at 32% 28%, color-mix(in srgb, ${tint} 35%, white) 0%, ${tint} 55%, color-mix(in srgb, ${tint} 60%, #1a0f2e) 100%)`,
      boxShadow: `0 0 ${Math.round(size * 0.4)}px color-mix(in srgb, ${tint} 60%, transparent), inset 0 1px 1px rgba(255,255,255,0.6)`,
    }}>{children}</span>
  )
}
