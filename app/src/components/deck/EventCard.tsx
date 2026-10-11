import { memo } from 'react'
import { motion } from 'framer-motion'
import type { DeckEvent } from '../../data/draws'
import { CARD_W, CARD_H } from './fx'
import MoonPhase from '../sky/MoonPhase'

interface Props {
  event: DeckEvent
  /** 1-based draw number this event closes */
  draw: number
  /** total draws tonight, or null for Align+ (endless) */
  of: number | null
  glow?: boolean
}

const foil = (c: string, l: string) =>
  `linear-gradient(160deg, ${c} 0%, ${l} 22%, #ffffff 42%, ${l} 58%, ${c} 78%, ${l} 100%)`

const RARITY_PIPS = { Common: 1, Uncommon: 2, Rare: 3 } as const

/**
 * The sixth card of every draw. Built on the person card's layout — name,
 * badge, framed aura art, kind + chips, three reading rows, a "why" line and
 * the ALIGN footer — so it belongs to the same deck, in its own colour.
 */
function EventCardImpl({ event: e, draw, of, glow = true }: Props) {
  const rows: [string, string, string][] = [
    ['What', e.what, e.light],
    ['Play', e.play, '#f2c75c'],
    ['Later', 'Not now? Swipe left to save it, then play it any time from your hand.', '#b3a6c4'],
  ]
  return (
    <div style={{
      position: 'relative', width: CARD_W, height: CARD_H, borderRadius: 20, padding: 2.5,
      background: foil(e.color, e.light), backgroundSize: '200% 200%', animation: 'foil-sweep 5s linear infinite',
      boxShadow: glow ? `0 0 26px ${e.color}77, 0 0 2px ${e.light}, 0 18px 40px rgba(5,2,15,0.6)` : '0 10px 30px rgba(5,2,15,0.5)',
    }}>
      <div style={{
        position: 'relative', width: '100%', height: '100%', borderRadius: 17.5, overflow: 'hidden',
        background: `radial-gradient(120% 60% at 50% 0%, ${e.color}33 0%, transparent 60%), linear-gradient(180deg, #160e28 0%, #100a1d 55%, #0e0919 100%)`,
      }}>
        {/* title, where the name goes */}
        <div className="serif italic" style={{ position: 'absolute', left: 36, top: 16, fontSize: 23, color: 'var(--label-1)' }}>{e.title}</div>
        {/* badge, where the moon badge goes */}
        <div style={{
          position: 'absolute', right: 26, top: 14, width: 38, height: 38, borderRadius: '50%',
          background: `radial-gradient(circle at 30% 25%, ${e.light} 0%, ${e.color} 55%, #2a1458 100%)`,
          boxShadow: `0 0 14px ${e.color}aa, inset 0 1px 1px rgba(255,255,255,0.6)`,
          display: 'grid', placeItems: 'center', fontSize: 18, color: '#1a0f2e', fontWeight: 700,
        }}>{e.glyph}&#xFE0E;</div>

        {/* art panel, same frame as the aura panel */}
        <div className="grain" style={{
          position: 'absolute', left: 22, top: 56, width: 284, height: 186, borderRadius: 10, overflow: 'hidden',
          background: '#07040f', boxShadow: `0 0 0 1.5px ${e.color}cc, 0 0 16px ${e.color}55`,
        }}>
          <img src={e.aura} alt="" draggable={false} style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%',
            transform: 'scale(1.3)', filter: 'blur(9px) saturate(1.15)', opacity: 0.85,
          }} />
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(70% 60% at 50% 45%, transparent 30%, rgba(7,4,15,0.6) 100%)` }} />
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
            <Art id={e.id} color={e.color} light={e.light} moon={e.moon} />
          </div>
          <div className="mono" style={{
            position: 'absolute', left: 8, bottom: 6, fontSize: 8, letterSpacing: '0.16em', color: 'var(--label-1)',
            textShadow: '0 1px 4px rgba(0,0,0,0.9)',
          }}>{e.caption}</div>
          <div className="mono" style={{
            position: 'absolute', right: 8, top: 8, padding: '3px 8px', borderRadius: 999, fontSize: 8, letterSpacing: '0.16em',
            color: e.light, background: 'rgba(11,6,32,0.55)', border: `1px solid ${e.color}aa`,
          }}>EVENT · DRAW {draw}{of ? `/${of}` : ''}</div>
        </div>

        {/* kind + chips, where the sign goes */}
        <div style={{ position: 'absolute', left: 32, top: 252, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="serif" style={{ fontSize: 18, letterSpacing: '0.08em', color: e.color, textTransform: 'uppercase', textShadow: `0 0 10px ${e.color}66` }}>{e.kind}</span>
          {e.chips.map((c, i) => (
            <span key={c} className="chip" style={{ height: 22, padding: '0 9px', color: i === 0 ? e.light : 'var(--label-2)', borderColor: i === 0 ? `${e.color}cc` : 'rgba(179,166,196,0.55)', background: i === 0 ? `${e.color}14` : 'transparent' }}>
              {c}
            </span>
          ))}
        </div>

        {/* what / play / pass, where spark / rub / align go */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 279, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {rows.map(([k, v, c]) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', minHeight: 37, paddingLeft: 32, paddingRight: 18 }}>
              <span className="mono" style={{ width: 44, flexShrink: 0, fontSize: 8.5, letterSpacing: '0.12em', color: c, textTransform: 'uppercase' }}>{k}</span>
              <span className="serif" style={{ flex: 1, fontSize: 15, lineHeight: 1.16, color: k === 'Later' ? 'var(--label-2)' : 'var(--label-1)' }}>{v}</span>
            </div>
          ))}
          <div style={{ margin: '2px 18px 0 16px', height: 1, background: 'linear-gradient(90deg, rgba(179,166,196,0.55), rgba(179,166,196,0.25))' }} />
          <div style={{ padding: '5px 18px 0 16px' }}>
            <div className="mono" style={{ fontSize: 8.5, letterSpacing: '0.16em', color: e.color }}>WHY TONIGHT</div>
            <div className="serif italic" style={{ marginTop: 5, fontSize: 14.5, lineHeight: 1.2, color: 'var(--label-2)' }}>{e.why}</div>
          </div>
        </div>

        {/* footer */}
        <div className="mono" style={{
          position: 'absolute', left: 14, right: 18, bottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 8.5, letterSpacing: '0.14em',
        }}>
          <span style={{ color: 'var(--label-2)' }}>ALIGN · EVENT № {String(draw).padStart(2, '0')}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#f2c75c', textTransform: 'uppercase' }}>
            {Array.from({ length: 3 }, (_, i) => (
              <span key={i} style={{ width: 5, height: 5, borderRadius: 3, background: i < RARITY_PIPS[e.rarity] ? '#f2c75c' : 'rgba(242,199,92,0.25)' }} />
            ))}
            &nbsp;{e.rarity}
          </span>
        </div>
      </div>
    </div>
  )
}

/** Overlay art for each event, drawn over its blurred aura. */
function Art({ id, color, light, moon }: { id: DeckEvent['id']; color: string; light: string; moon?: DeckEvent['moon'] }) {
  if (id === 'second-look') {
    return (
      <div style={{ position: 'relative', width: 180, height: 150 }}>
        <div style={{ position: 'absolute', left: 58, top: 43, width: 64, height: 64, borderRadius: '50%', background: 'radial-gradient(circle at 34% 28%, #fff1e2 0%, #f3c2a2 22%, #d98a78 52%, #8a4a5a 82%, #4a2240 100%)', boxShadow: `0 0 34px ${color}aa` }} />
        <motion.svg width="180" height="150" viewBox="0 0 180 150" style={{ position: 'absolute', inset: 0 }} animate={{ rotate: -360 }} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}>
          <path d="M90 18 A57 57 0 1 1 40 50" fill="none" stroke={light} strokeWidth="1.5" strokeDasharray="3 5" />
          <path d="M34 44 L40 50 L47 44" fill="none" stroke={light} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </div>
    )
  }
  if (id === 'moon-peek') {
    return (
      <div style={{ position: 'relative', width: 180, height: 150 }}>
        {/* tonight's real moon, at its real phase */}
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }}
          style={{ position: 'absolute', left: 50, top: 18, width: 80, height: 80, borderRadius: '50%', boxShadow: `0 0 40px ${color}88` }}>
          <MoonPhase size={80} lit={moon?.lit ?? 0.3} waxing={moon?.waxing ?? false} />
        </motion.div>
        <svg width="180" height="150" viewBox="0 0 180 150" style={{ position: 'absolute', inset: 0 }}>
          <path d="M62 124 Q90 102 118 124 Q90 146 62 124 Z" fill="rgba(11,6,32,0.4)" stroke={light} strokeWidth="1.5" />
          <circle cx="90" cy="124" r="6" fill={light} />
        </svg>
      </div>
    )
  }
  if (id === 'mulligan') {
    return (
      <div style={{ position: 'relative', width: 180, height: 150 }}>
        {[-1, 0, 1].map((k) => (
          <motion.div key={k}
            animate={{ rotate: [k * 14, k * -14, k * 14], x: [k * 30, k * -30, k * 30] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', left: 64, top: 18, width: 52, height: 80, borderRadius: 7,
              background: 'linear-gradient(160deg, #5b3aaa, #2c1468)', border: `1.5px solid ${color}`,
              boxShadow: `0 0 14px ${color}66`, display: 'grid', placeItems: 'center', zIndex: 2 - Math.abs(k),
            }}>
            <span style={{ color, fontSize: 14 }}>✦</span>
          </motion.div>
        ))}
        <svg width="180" height="150" viewBox="0 0 180 150" style={{ position: 'absolute', inset: 0 }}>
          <path d="M44 122 A48 18 0 0 0 136 122" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 5" />
          <path d="M130 116 L136 122 L129 127" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    )
  }
  if (id === 'comet') {
    return (
      <motion.div animate={{ x: [-6, 6, -6], y: [4, -4, 4] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'relative', width: 180, height: 150 }}>
        <div style={{ position: 'absolute', left: 28, top: 92, width: 120, height: 10, borderRadius: 6, transform: 'rotate(-28deg)', transformOrigin: 'right center', background: `linear-gradient(90deg, transparent, ${color}55 40%, ${light})`, filter: 'blur(2px)' }} />
        <div style={{ position: 'absolute', left: 120, top: 46, width: 30, height: 30, borderRadius: '50%', background: `radial-gradient(circle at 40% 35%, #ffffff, ${light} 40%, ${color} 80%)`, boxShadow: `0 0 30px ${color}, 0 0 60px ${color}88` }} />
      </motion.div>
    )
  }
  // spotlight: a beam onto a card
  return (
    <div style={{ position: 'relative', width: 180, height: 150 }}>
      <div style={{ position: 'absolute', left: 40, top: 0, width: 100, height: 150, clipPath: 'polygon(40% 0, 60% 0, 100% 100%, 0 100%)', background: `linear-gradient(180deg, ${light}cc, ${color}33 70%, transparent)`, filter: 'blur(1px)' }} />
      <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity }}
        style={{ position: 'absolute', left: 66, top: 62, width: 48, height: 72, borderRadius: 7, background: 'linear-gradient(160deg, #3a1d80, #1c0f44)', border: `1.5px solid ${light}`, boxShadow: `0 0 24px ${color}`, display: 'grid', placeItems: 'center' }}>
        <span className="serif italic" style={{ fontSize: 13, color: light }}>You</span>
      </motion.div>
    </div>
  )
}

const EventCard = memo(EventCardImpl)
export default EventCard
