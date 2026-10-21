import { memo } from 'react'
import { SIGNS, type SignId } from '../../data/signs'

/** Designed at 200×280; pass `width` to scale. */
export const TC_W = 200
export const TC_H = 280

export interface TradeCardData {
  name: string
  age: number
  sign: SignId
  /** photo, or an aura image for your own card (G-05a shows your aura, not a face) */
  img: string
  serial: string
  /** "For Hakeem" — whose binder this copy lives in */
  copyFor?: string
  /** small caption over the image, e.g. "AURA · HONEY" */
  caption?: string
  moon?: SignId
}

interface Props {
  card: TradeCardData
  width?: number
  glow?: boolean
}

/** A traded copy: the revealed card shrunk to collectible size, with sign foil. */
function TradeCardImpl({ card, width = TC_W, glow = true }: Props) {
  const s = SIGNS[card.sign]
  const k = width / TC_W
  return (
    <div style={{ width, height: TC_H * k, position: 'relative' }}>
      <div style={{
        position: 'absolute', left: 0, top: 0, width: TC_W, height: TC_H,
        transform: `scale(${k})`, transformOrigin: 'top left',
        borderRadius: 16, padding: 2.5,
        background: s.foil.replace('90deg', '155deg'),
        backgroundSize: '200% 200%',
        boxShadow: glow ? `0 0 20px ${s.color}55, 0 10px 26px rgba(5,2,15,0.55)` : '0 6px 16px rgba(5,2,15,0.5)',
      }}>
        <div style={{
          position: 'relative', width: '100%', height: '100%', borderRadius: 13.5, overflow: 'hidden',
          background: `radial-gradient(120% 50% at 50% 0%, ${s.dark}66, transparent 60%), linear-gradient(180deg, #170e2c, #0e0919)`,
        }}>
          <div className="grain" style={{ position: 'absolute', left: 8, right: 8, top: 8, height: 164, borderRadius: 9, overflow: 'hidden', border: `1px solid ${s.color}88` }}>
            <img src={card.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 25%' }} />
            {card.caption && (
              <div className="mono" style={{ position: 'absolute', left: 8, bottom: 6, fontSize: 7, letterSpacing: '0.18em', color: 'var(--label-1)', textShadow: '0 1px 4px #000' }}>
                {card.caption}
              </div>
            )}
          </div>
          <div style={{
            position: 'absolute', top: 14, right: 14, width: 26, height: 26, borderRadius: 13,
            display: 'grid', placeItems: 'center', fontSize: 14, color: '#fff',
            background: `radial-gradient(circle at 35% 30%, ${s.light}, ${s.color} 60%, ${s.dark})`,
            boxShadow: `0 0 10px ${s.color}`,
          }}>{s.glyph}&#xFE0E;</div>

          <div className="serif italic" style={{ position: 'absolute', left: 12, top: 178, fontSize: 21, color: 'var(--label-1)', whiteSpace: 'nowrap' }}>
            {card.name}, {card.age}
          </div>
          <div style={{ position: 'absolute', left: 12, top: 206, fontSize: 10.5, color: 'var(--label-2)' }}>
            <span style={{ color: s.color }}>{s.name}</span> · {s.element[0].toUpperCase() + s.element.slice(1)}
            {card.moon && <> · {SIGNS[card.moon].name} moon</>}
          </div>
          <div style={{ position: 'absolute', left: 12, right: 12, top: 230, height: 1, background: 'rgba(179,166,196,0.18)' }} />
          <div className="mono" style={{ position: 'absolute', left: 12, right: 12, top: 240, display: 'flex', justifyContent: 'space-between', fontSize: 7.5, letterSpacing: '0.16em', color: 'var(--label-3)' }}>
            <span>ALIGN · {card.serial}</span>
            {card.copyFor && <span style={{ color: 'var(--align)' }}>✦ FOR {card.copyFor.toUpperCase()}</span>}
          </div>
          {/* sleeve gloss */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.10) 42%, transparent 52%)', pointerEvents: 'none' }} />
        </div>
      </div>
    </div>
  )
}

const TradeCard = memo(TradeCardImpl)
export default TradeCard

/** Face-down copy in transit: violet back with the mark, scaled like TradeCard. */
export function TradeCardBack({ width = TC_W, label }: { width?: number; label?: string }) {
  const k = width / TC_W
  const dots = ['#b06cff', '#5b6cff', '#3fb6f0', '#4fd27a', '#f2cf4a', '#f39a3a', '#f0383a']
  return (
    <div style={{ width, height: TC_H * k, position: 'relative' }}>
      <div style={{
        position: 'absolute', left: 0, top: 0, width: TC_W, height: TC_H, transform: `scale(${k})`, transformOrigin: 'top left',
        borderRadius: 16, padding: 1.5,
        background: 'linear-gradient(160deg, #c8b4ff 0%, #6b4bd0 30%, #f2d784 52%, #6b4bd0 72%, #c8b4ff 100%)',
        boxShadow: '0 0 22px rgba(154,123,224,0.45), 0 10px 26px rgba(5,2,15,0.55)',
      }}>
        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 14.5, overflow: 'hidden', background: 'radial-gradient(60% 45% at 50% 47%, rgba(138,92,240,0.55), transparent 70%), linear-gradient(160deg, #2a1260, #3c1a8a 45%, #170a3e)' }}>
          <svg width="200" height="280" viewBox="0 0 200 280" style={{ position: 'absolute', inset: 0 }}>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
              const a = (Math.PI / 3) * i - Math.PI / 2
              const cx = i === 6 ? 100 : 100 + 28 * Math.cos(a)
              const cy = i === 6 ? 135 : 135 + 28 * Math.sin(a)
              return <circle key={i} cx={cx} cy={cy} r={28} fill="none" stroke="rgba(214,196,255,0.32)" strokeWidth="0.8" />
            })}
            <circle cx="100" cy="135" r="56" fill="none" stroke="rgba(214,196,255,0.22)" strokeWidth="0.8" />
            {dots.map((c, i) => (
              <g key={c}>
                <circle cx="100" cy={99 + i * 12} r="5" fill={c} opacity="0.35" />
                <circle cx="100" cy={99 + i * 12} r="2.6" fill={c} />
              </g>
            ))}
          </svg>
          {label && (
            <div className="serif italic" style={{ position: 'absolute', top: 16, width: '100%', textAlign: 'center', fontSize: 16, color: 'var(--label-2)' }}>{label}</div>
          )}
          <div className="mono" style={{ position: 'absolute', bottom: 16, width: '100%', textAlign: 'center', fontSize: 7.5, letterSpacing: '0.2em', color: 'rgba(214,196,255,0.5)' }}>ALIGN · COPY</div>
        </div>
      </div>
    </div>
  )
}
