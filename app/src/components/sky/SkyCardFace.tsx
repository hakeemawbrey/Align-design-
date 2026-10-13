import { motion } from 'framer-motion'
import { Corners, TAROT_RATIO, TalkCardBack } from '../talk/TalkCardFace'
import { PLANET, type SkyCard } from '../../data/skyReading'

const GOLD = '#f2d58a'
export const SLOT_LABEL = { you: 'You', love: 'Love', move: 'Move' } as const

/** One of the three daily Sky cards: the planet behind it, big, in a tarot frame. */
export function SkyCardFace({ card, width = 104, active = false }: { card: SkyCard; width?: number; active?: boolean }) {
  const s = width / 104
  const p = PLANET[card.planet]
  return (
    <div style={{
      width, height: width * TAROT_RATIO, borderRadius: 10 * s, padding: 2.5 * s,
      background: `linear-gradient(155deg, #f8edff 0%, ${p.color} 38%, #4a3a7a 66%, #f8edff 100%)`,
      boxShadow: active ? `0 0 ${22 * s}px ${p.color}aa, 0 ${8 * s}px ${20 * s}px rgba(0,0,0,0.5)` : `0 ${6 * s}px ${16 * s}px rgba(0,0,0,0.45)`,
      transition: 'box-shadow .3s',
    }}>
      <div style={{
        position: 'relative', width: '100%', height: '100%', borderRadius: 8 * s, overflow: 'hidden',
        background: `radial-gradient(90% 55% at 50% 38%, ${p.color}55 0%, transparent 70%), linear-gradient(180deg, #24124f, #0f0826)`,
      }}>
        <div style={{ position: 'absolute', inset: 4 * s, borderRadius: 6 * s, border: `${Math.max(0.6, 0.8 * s)}px solid ${GOLD}77` }} />
        <Corners s={s * 0.7} />
        <div className="mono" style={{ position: 'absolute', top: 10 * s, left: 0, right: 0, textAlign: 'center', fontSize: 7 * s, letterSpacing: '0.24em', color: 'var(--label-2)', textTransform: 'uppercase' }}>
          {SLOT_LABEL[card.slot]}
        </div>
        <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: 34 * s, left: 0, right: 0, willChange: 'transform', textAlign: 'center', fontSize: 50 * s, lineHeight: 1, color: p.color, textShadow: `0 0 ${18 * s}px ${p.color}` }}>
          {p.glyph}{'︎'}
        </motion.div>
        <div className="serif" style={{ position: 'absolute', top: 98 * s, left: 0, right: 0, textAlign: 'center', fontSize: 9 * s, letterSpacing: '0.22em', textTransform: 'uppercase', color: GOLD }}>
          {p.name}
        </div>
        <div className="serif italic" style={{ position: 'absolute', top: 116 * s, left: 8 * s, right: 8 * s, textAlign: 'center', fontSize: 10.5 * s, lineHeight: 1.2, color: 'var(--label-1)' }}>
          {card.headline}
        </div>
      </div>
    </div>
  )
}

/** the face-down card, labelled with its slot */
export function SkyCardBack({ slot, width = 104 }: { slot: SkyCard['slot']; width?: number }) {
  return (
    <div style={{ position: 'relative' }}>
      <TalkCardBack width={width} color="#9fd8ff" />
      <div className="mono" style={{ position: 'absolute', left: 0, right: 0, bottom: 16, textAlign: 'center', fontSize: 8, letterSpacing: '0.26em', color: GOLD }}>
        {SLOT_LABEL[slot].toUpperCase()}
      </div>
    </div>
  )
}
