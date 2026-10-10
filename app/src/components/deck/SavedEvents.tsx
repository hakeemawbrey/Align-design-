import { motion } from 'framer-motion'
import { EVENTS, type EventId } from '../../data/draws'
import EventCard from './EventCard'
import { CARD_W, CARD_H } from './fx'

const S = 0.5

/** Your saved event cards: play any of them now. */
export function SavedSheet({ saved, onPlay, onClose }: { saved: EventId[]; onPlay: (i: number) => void; onClose: () => void }) {
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
        style={{ position: 'absolute', inset: 0, zIndex: 80, background: 'rgba(5,2,15,0.6)' }} />
      <motion.div initial={{ y: 520 }} animate={{ y: 0 }} exit={{ y: 520 }} transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: 500, zIndex: 81, borderRadius: '26px 26px 0 0',
          background: 'linear-gradient(180deg, #24124f, #120a2a)', borderTop: '1px solid rgba(201,182,240,0.35)', padding: '12px 0 0',
        }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(201,182,240,0.4)', margin: '0 auto 12px' }} />
        <div style={{ padding: '0 20px' }}>
          <div className="h-display" style={{ fontSize: 26 }}>Saved events</div>
          <div style={{ fontSize: 13, color: 'var(--label-2)', marginTop: 4 }}>Event cards you saved for later. Play one now and it takes effect right away.</div>
        </div>
        <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '18px 20px 30px', scrollbarWidth: 'none' }}>
          {saved.map((id, i) => {
            const ev = EVENTS[id]
            return (
              <motion.div key={`${id}-${i}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                style={{ flexShrink: 0, width: CARD_W * S, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <div style={{ width: CARD_W * S, height: CARD_H * S }}>
                  <div style={{ transform: `scale(${S})`, transformOrigin: '0 0', width: CARD_W }}>
                    <EventCard event={ev} draw={1} of={null} />
                  </div>
                </div>
                <motion.button whileTap={{ scale: 0.95 }} onClick={() => onPlay(i)} style={{
                  height: 38, width: '100%', borderRadius: 19, fontSize: 14, color: '#1a0f3a',
                  background: 'linear-gradient(180deg, #fbf3d6, #e9d49a)', boxShadow: `0 0 14px ${ev.color}55`,
                }}>Play {ev.title} ✦</motion.button>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </>
  )
}
