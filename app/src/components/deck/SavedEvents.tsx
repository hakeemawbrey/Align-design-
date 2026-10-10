import { motion } from 'framer-motion'
import { EVENTS, type EventId } from '../../data/draws'
import EventCard from './EventCard'
import { CARD_W, CARD_H } from './fx'
import { packInfo } from '../../lib/talk'
import { TalkCardBack } from '../talk/TalkCardFace'

const S = 0.5

/**
 * Your hand, from the deck: saved event cards to play now, packs waiting to
 * be opened, and the way into your binder. The same binder the chat's card
 * button, the You tab and the Matches pages open.
 */
export function SavedSheet({ saved, packs, onPlay, onBinder, onClose }: { saved: EventId[]; packs: string[]; onPlay: (i: number) => void; onBinder: () => void; onClose: () => void }) {
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
        style={{ position: 'absolute', inset: 0, zIndex: 80, background: 'rgba(5,2,15,0.6)' }} />
      <motion.div initial={{ y: 620 }} animate={{ y: 0 }} exit={{ y: 620 }} transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: 600, zIndex: 81, borderRadius: '26px 26px 0 0',
          background: 'linear-gradient(180deg, #24124f, #120a2a)', borderTop: '1px solid rgba(201,182,240,0.35)', padding: '12px 0 0',
        }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(201,182,240,0.4)', margin: '0 auto 12px' }} />
        <div style={{ padding: '0 20px' }}>
          <div className="h-display" style={{ fontSize: 26 }}>Your hand</div>
          <div style={{ fontSize: 13, color: 'var(--label-2)', marginTop: 4 }}>
            {saved.length ? 'Event cards you’re holding. Play one now and it takes effect right away.' : 'No event cards yet. Save one from the deck, or pull them from packs.'}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '16px 20px 14px', scrollbarWidth: 'none', minHeight: saved.length ? undefined : 0 }}>
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
                  height: 38, width: '100%', borderRadius: 19, fontSize: 14, color: 'var(--chrome-ink)',
                  background: 'var(--chrome)', boxShadow: `0 0 14px ${ev.color}55`,
                }}>Play {ev.title} ✦</motion.button>
              </motion.div>
            )
          })}
        </div>

        {/* packs, and the binder they open into */}
        <div style={{ margin: '0 20px', padding: 12, borderRadius: 16, display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(48,32,92,0.5)', border: '1px solid rgba(248,237,255,0.25)' }}>
          <div style={{ position: 'relative', width: 52, height: 56 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ position: 'absolute', left: 6 + i * 8, top: 2, transform: `rotate(${(i - 1) * 9}deg)`, transformOrigin: '50% 100%' }}>
                <TalkCardBack width={30} color={packs[i] ? packInfo(packs[i]).color : '#b18cff'} />
              </div>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <div className="serif italic" style={{ fontSize: 17 }}>{packs.length ? `${packs.length} ${packs.length === 1 ? 'pack' : 'packs'} to open` : 'Your binder'}</div>
            <div style={{ fontSize: 12, color: 'var(--label-2)', marginTop: 2 }}>Packs, signs, talk cards, places and the people you’ve traded.</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
          <button className="chrome-cta" onClick={onBinder}>{packs.length ? 'Open packs' : 'Open your binder'} <span className="spark">✦</span></button>
        </div>
      </motion.div>
    </>
  )
}
