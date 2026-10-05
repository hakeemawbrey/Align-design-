import { memo } from 'react'
import { motion } from 'framer-motion'
import type { DeckEvent } from '../../data/draws'
import { CARD_W, CARD_H } from './fx'

const FOIL = 'linear-gradient(160deg, #b88a2c 0%, #f2c75c 18%, #fff4cf 34%, #f2c75c 50%, #b88a2c 66%, #f2d784 83%, #b88a2c 100%)'

interface Props {
  event: DeckEvent
  /** 1-based draw number this event closes */
  draw: number
  /** total draws tonight, or null for Align+ (endless) */
  of: number | null
  glow?: boolean
}

/**
 * The sixth card of every draw: an event. Same size and frame language as a
 * person card, in gold foil, so it reads as a different kind of card at a glance.
 */
function EventCardImpl({ event, draw, of, glow = true }: Props) {
  const c = event.color
  return (
    <div style={{
      position: 'relative', width: CARD_W, height: CARD_H, borderRadius: 20, padding: 2.5,
      background: FOIL, backgroundSize: '200% 200%', animation: 'foil-sweep 4s linear infinite',
      boxShadow: glow ? `0 0 30px rgba(242,199,92,0.45), 0 0 2px #fff4cf, 0 18px 40px rgba(5,2,15,0.6)` : '0 10px 30px rgba(5,2,15,0.5)',
    }}>
      <div className="grain" style={{
        position: 'relative', width: '100%', height: '100%', borderRadius: 17.5, overflow: 'hidden',
        background: `radial-gradient(90% 55% at 50% 30%, ${c}33 0%, transparent 65%), linear-gradient(180deg, #22144a 0%, #150b30 60%, #0e0919 100%)`,
      }}>
        <div style={{ position: 'absolute', inset: 10, borderRadius: 12, border: '1px solid rgba(242,199,92,0.35)', pointerEvents: 'none' }} />

        {/* ribbon */}
        <div style={{ position: 'absolute', top: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
          <span className="mono" style={{
            padding: '5px 14px', borderRadius: 999, fontSize: 10, letterSpacing: '0.24em', fontWeight: 700,
            color: '#2a1a05', background: 'var(--gold-foil)', boxShadow: '0 0 14px rgba(242,199,92,0.6)',
          }}>✦ EVENT · DRAW {draw}{of ? ` OF ${of}` : ''}</span>
        </div>

        {/* art */}
        <div style={{ position: 'absolute', top: 76, left: 0, right: 0, height: 170, display: 'grid', placeItems: 'center' }}>
          <EventArt id={event.id} color={c} />
        </div>

        {/* copy */}
        <div style={{ position: 'absolute', top: 262, left: 30, right: 30, textAlign: 'center' }}>
          <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: c }}>{event.eyebrow}</div>
          <div className="serif italic" style={{ fontSize: 38, lineHeight: 1.05, marginTop: 8, color: 'var(--label-1)' }}>{event.title}</div>
          <div className="serif" style={{ fontSize: 17, lineHeight: 1.35, marginTop: 12, color: 'var(--label-2)' }}>{event.body}</div>
        </div>

        {/* rule */}
        <div style={{
          position: 'absolute', left: 26, right: 26, bottom: 64, padding: '12px 14px', borderRadius: 12,
          background: 'rgba(11,6,32,0.5)', border: '1px solid rgba(242,199,92,0.3)', display: 'flex', gap: 10, alignItems: 'baseline',
        }}>
          <span className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--align)' }}>PLAY</span>
          <span style={{ fontSize: 14.5, lineHeight: 1.35, color: 'var(--label-1)' }}>{event.play}</span>
        </div>

        <div className="mono" style={{ position: 'absolute', left: 26, right: 26, bottom: 26, display: 'flex', justifyContent: 'space-between', fontSize: 10, letterSpacing: '0.18em', color: 'var(--label-3)' }}>
          <span>← PASS</span>
          <span style={{ color: 'var(--align)' }}>PLAY IT →</span>
        </div>
      </div>
    </div>
  )
}

function EventArt({ id, color }: { id: DeckEvent['id']; color: string }) {
  if (id === 'second-look') {
    // Venus, retrograde: a rose-gold orb with a looping arrow turning back
    return (
      <div style={{ position: 'relative', width: 170, height: 150 }}>
        <div style={{ position: 'absolute', left: 45, top: 35, width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle at 34% 28%, #fff1e2 0%, #f3c2a2 22%, #d98a78 52%, #8a4a5a 82%, #4a2240 100%)', boxShadow: `0 0 40px ${color}88` }} />
        <motion.svg width="170" height="150" viewBox="0 0 170 150" style={{ position: 'absolute', inset: 0 }} animate={{ rotate: -360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}>
          <path d="M85 12 A63 63 0 1 1 26 52" fill="none" stroke="#ffd9c8" strokeWidth="1.6" strokeDasharray="3 5" opacity="0.8" />
          <path d="M20 46 L26 52 L33 46" fill="none" stroke="#ffd9c8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
        <span className="serif italic" style={{ position: 'absolute', right: 18, top: 18, fontSize: 24, color: '#ffd9c8', textShadow: `0 0 12px ${color}` }}>℞</span>
      </div>
    )
  }
  if (id === 'moon-peek') {
    // a Leo-orange crescent with an eye of light
    return (
      <div style={{ position: 'relative', width: 170, height: 150 }}>
        <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 3, repeat: Infinity }}
          style={{ position: 'absolute', left: 40, top: 25, width: 92, height: 92, borderRadius: '50%', boxShadow: `inset -26px 8px 0 0 #ffd7a0, 0 0 50px ${color}88`, transform: 'rotate(-20deg)' }} />
        <svg width="170" height="150" viewBox="0 0 170 150" style={{ position: 'absolute', inset: 0 }}>
          <path d="M60 128 Q85 108 110 128 Q85 148 60 128 Z" fill="none" stroke="#ffd7a0" strokeWidth="1.6" />
          <circle cx="85" cy="128" r="5" fill="#ffd7a0" />
        </svg>
      </div>
    )
  }
  // mulligan: three card backs fanning and reshuffling
  return (
    <div style={{ position: 'relative', width: 170, height: 150 }}>
      {[-1, 0, 1].map((k) => (
        <motion.div key={k}
          animate={{ rotate: [k * 14, k * -14, k * 14], x: [k * 26, k * -26, k * 26] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: Math.abs(k) * 0.1 }}
          style={{
            position: 'absolute', left: 58, top: 12, width: 56, height: 84, borderRadius: 8,
            background: 'linear-gradient(160deg, #5b3aaa, #2c1468)', border: '1.5px solid #f2c75c',
            boxShadow: `0 0 16px ${color}55`, display: 'grid', placeItems: 'center', zIndex: 2 - Math.abs(k),
          }}>
          <span style={{ color: '#f2c75c', fontSize: 16 }}>✦</span>
        </motion.div>
      ))}
      <svg width="170" height="150" viewBox="0 0 170 150" style={{ position: 'absolute', inset: 0 }}>
        <path d="M40 120 A50 22 0 0 0 130 120" fill="none" stroke="#f2c75c" strokeWidth="1.6" strokeDasharray="3 5" />
        <path d="M124 114 L130 120 L123 125" fill="none" stroke="#f2c75c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

const EventCard = memo(EventCardImpl)
export default EventCard
