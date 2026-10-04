import { memo } from 'react'
import { SIGNS } from '../../data/signs'
import type { ArtistCard } from '../../data/matches'
import { TC_W, TC_H } from './TradeCard'

const HOLO = 'conic-gradient(from var(--holo-a, 0deg), #ff6ad5, #ffd36a, #7affc4, #6ad5ff, #b18cff, #ff6ad5)'

/**
 * Rare-series card (verified artist): animated rainbow holo frame, gold ribbon,
 * verified mark, edition number. Designed at 200×280 like TradeCard.
 */
function LegendaryCardImpl({ card, width = TC_W, glow = true }: { card: ArtistCard; width?: number; glow?: boolean }) {
  const s = SIGNS[card.sign]
  const k = width / TC_W
  return (
    <div style={{ width, height: TC_H * k, position: 'relative' }}>
      <style>{`
        @property --holo-a { syntax: '<angle>'; inherits: true; initial-value: 0deg; }
        @keyframes holo-spin { to { --holo-a: 360deg; } }
        @keyframes holo-sheen { 0% { transform: translateX(-120%) rotate(18deg); } 60%, 100% { transform: translateX(220%) rotate(18deg); } }
      `}</style>
      <div style={{
        position: 'absolute', left: 0, top: 0, width: TC_W, height: TC_H, transform: `scale(${k})`, transformOrigin: 'top left',
        borderRadius: 16, padding: 3, background: HOLO, animation: 'holo-spin 4s linear infinite',
        boxShadow: glow ? '0 0 26px rgba(255,140,220,0.45), 0 0 50px rgba(120,200,255,0.25), 0 10px 26px rgba(5,2,15,0.55)' : '0 6px 16px rgba(5,2,15,0.5)',
      }}>
        <div style={{
          position: 'relative', width: '100%', height: '100%', borderRadius: 13, overflow: 'hidden',
          background: 'radial-gradient(120% 50% at 50% 0%, rgba(255,211,106,0.18), transparent 60%), linear-gradient(180deg, #1a0f30, #0e0919)',
        }}>
          <div className="grain" style={{ position: 'absolute', left: 8, right: 8, top: 8, height: 164, borderRadius: 9, overflow: 'hidden', boxShadow: '0 0 0 1px rgba(255,236,180,0.7)' }}>
            <img src={card.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 25%' }} />
            {/* holo wash over the photo */}
            <div style={{ position: 'absolute', inset: 0, background: HOLO, mixBlendMode: 'color-dodge', opacity: 0.22, animation: 'holo-spin 4s linear infinite' }} />
            <div style={{ position: 'absolute', top: 0, bottom: 0, width: '45%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)', animation: 'holo-sheen 3.2s ease-in-out infinite' }} />
            <div className="mono" style={{
              position: 'absolute', left: 8, top: 8, padding: '3px 7px', borderRadius: 999, fontSize: 6.5, letterSpacing: '0.18em', fontWeight: 700,
              color: '#2a1a05', background: 'var(--gold-foil)', boxShadow: '0 0 10px rgba(242,199,92,0.7)',
            }}>✦ RARE</div>
          </div>
          <div style={{
            position: 'absolute', top: 14, right: 14, width: 26, height: 26, borderRadius: 13, display: 'grid', placeItems: 'center', fontSize: 14, color: '#fff',
            background: `radial-gradient(circle at 35% 30%, ${s.light}, ${s.color} 60%, ${s.dark})`, boxShadow: `0 0 10px ${s.color}`,
          }}>{s.glyph}&#xFE0E;</div>

          <div style={{ position: 'absolute', left: 12, top: 178, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="serif italic" style={{ fontSize: 22, color: 'var(--label-1)', letterSpacing: '0.04em' }}>{card.name}</span>
            {/* verified */}
            <svg width="15" height="15" viewBox="0 0 24 24"><path fill="#6ad5ff" d="m12 1 2.6 2.2 3.4-.4.9 3.3 3 1.7-1.2 3.2 1.2 3.2-3 1.7-.9 3.3-3.4-.4L12 23l-2.6-2.2-3.4.4-.9-3.3-3-1.7L3.3 12 2.1 8.8l3-1.7.9-3.3 3.4.4Z"/><path d="m8 12.5 2.6 2.5L16 9.5" fill="none" stroke="#0b0620" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div style={{ position: 'absolute', left: 12, top: 207, fontSize: 10.5, color: 'var(--label-2)' }}>
            <span style={{ color: s.color }}>{s.name}</span> · {card.title}
          </div>
          <div style={{ position: 'absolute', left: 12, right: 12, top: 230, height: 1, background: 'linear-gradient(90deg, #ff6ad5, #ffd36a, #6ad5ff)', opacity: 0.5 }} />
          <div className="mono" style={{ position: 'absolute', left: 12, right: 12, top: 240, display: 'flex', justifyContent: 'space-between', fontSize: 7.5, letterSpacing: '0.16em', color: 'var(--label-3)' }}>
            <span>RARE SERIES</span>
            <span style={{ color: 'var(--align)' }}>№ {String(card.edition).padStart(3, '0')} / {card.of}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const LegendaryCard = memo(LegendaryCardImpl)
export default LegendaryCard
