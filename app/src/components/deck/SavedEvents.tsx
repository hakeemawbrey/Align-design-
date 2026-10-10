import { AnimatePresence, motion } from 'framer-motion'
import { EVENTS, type EventId } from '../../data/draws'
import { sfx } from '../../lib/sfx'
import EventCard from './EventCard'
import { CARD_W, CARD_H } from './fx'

const S = 0.5

/** The saved-events button on the deck screen: a little stack of cards and a count. */
export function SavedButton({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.button key="saved" onClick={() => { sfx.tap(); onClick() }}
          initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
          whileTap={{ scale: 0.92 }}
          style={{
            position: 'absolute', right: 12, top: 694, zIndex: 30, height: 30, padding: '0 10px 0 7px', borderRadius: 15,
            display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(36,20,80,0.92)', border: '1px solid rgba(242,199,92,0.6)',
            boxShadow: '0 0 14px rgba(242,199,92,0.35)',
          }}>
          <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
            <rect x="1.5" y="3" width="8" height="11" rx="1.6" transform="rotate(-12 5.5 8.5)" stroke="#c9b6f0" strokeWidth="1.1" fill="#2a1660" />
            <rect x="6.5" y="1.5" width="8" height="11" rx="1.6" stroke="#f2c75c" strokeWidth="1.2" fill="#3a1d78" />
            <path d="M10.5 4.5c.2 1.3.7 1.8 1.9 2-1.2.2-1.7.7-1.9 2-.2-1.3-.7-1.8-1.9-2 1.2-.2 1.7-.7 1.9-2Z" fill="#f2c75c" />
          </svg>
          <span className="mono" style={{ fontSize: 10, letterSpacing: '0.08em', color: '#f2c75c' }} aria-label={`Saved events: ${count}`}>{count}</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

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
