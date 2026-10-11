import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TAROT_RATIO } from '../talk/TalkCardFace'
import { SkyCardBack, SkyCardFace, SLOT_LABEL } from './SkyCardFace'
import { PLANET, TODAY_READING, type SkyReading } from '../../data/skyReading'
import { ME } from '../../data/profiles'
import { talk, useTalk } from '../../lib/talk'
import { sfx } from '../../lib/sfx'

const W = 104
const GAP = (342 - W * 3) / 2

/** where the reward lands, in words */
const LANDS: Record<SkyReading['reward']['kind'], string> = {
  event: 'in your hand on the deck', energy: 'added to your energy', pack: 'waiting in your binder', talk: 'in your hand in chat',
}

/**
 * Today's sky, drawn: three face-down cards (You, Love, Move) worked out from
 * the real sky against your birth chart. Turn them over one at a time; when
 * the third turns, the reading goes in your binder and its reward in your hand.
 */
export default function SkySpread({ reading = TODAY_READING }: { reading?: SkyReading }) {
  const { skyDays } = useTalk()
  const drawn = skyDays.includes(reading.date)
  const [up, setUp] = useState<boolean[]>(() => (drawn ? [true, true, true] : [false, false, false]))
  const [sel, setSel] = useState<number | null>(drawn ? 0 : null)
  const [justClaimed, setJustClaimed] = useState(false)
  const allUp = up.every(Boolean)
  const streak = talk.skyStreak(reading.date)

  const tap = (i: number) => {
    if (up[i]) { if (sel !== i) { sfx.tap(); setSel(i) } return }
    const next = up.map((u, k) => (k === i ? true : u))
    setUp(next); setSel(i); sfx.flip()
    if (next.every(Boolean) && talk.claimSky(reading)) {
      setJustClaimed(true)
      window.setTimeout(() => sfx.match(), 450)
    }
  }
  const card = sel != null ? reading.cards[sel] : null

  return (
    <div style={{ width: 342 }}>
      <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--label-2)' }}>
        TODAY’S SKY · FOR {ME.name.toUpperCase()} · № {reading.serial}
      </div>
      <div className="h-display" style={{ fontSize: 28, marginTop: 6 }}>
        {allUp ? 'Your sky today' : up.some(Boolean) ? 'Keep turning' : 'Draw your sky'}
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--label-2)', marginTop: 4 }}>
        {allUp ? 'Worked out from today’s planets and your birth chart. Tap a card to read it.' : 'Three cards from today’s real sky, read against your birth chart. Tap each one to turn it.'}
      </div>

      {/* the three cards */}
      <div style={{ display: 'flex', gap: GAP, marginTop: 14 }}>
        {reading.cards.map((c, i) => (
          <motion.div key={c.slot} onClick={() => tap(i)} whileTap={{ scale: 0.96 }}
            initial={{ y: 30, opacity: 0 }} animate={{ y: sel === i && up[i] ? -6 : 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: drawn ? 0 : i * 0.08 }}
            style={{ width: W, height: W * TAROT_RATIO, perspective: 800, cursor: 'pointer' }}>
            <motion.div animate={{ rotateY: up[i] ? 0 : 180 }} initial={false} transition={{ duration: 0.6, ease: [0.3, 1.3, 0.5, 1] }}
              style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}>
              <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden' }}><SkyCardFace card={c} width={W} active={sel === i} /></div>
              <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                <motion.div animate={up[i] ? {} : { y: [0, -3, 0] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}>
                  <SkyCardBack slot={c.slot} width={W} />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* the card you're reading */}
      <AnimatePresence mode="wait">
        {card && (
          <motion.div key={card.slot} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}
            style={{ marginTop: 14, padding: '14px 16px', borderRadius: 16, background: 'rgba(30,18,64,0.82)', border: `1px solid ${PLANET[card.planet].color}55` }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span className="mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: PLANET[card.planet].color }}>{SLOT_LABEL[card.slot].toUpperCase()}</span>
              <span className="serif italic" style={{ fontSize: 17, color: 'var(--label-1)' }}>{card.title}</span>
            </div>
            <div className="mono" style={{ fontSize: 8.5, letterSpacing: '0.12em', color: 'var(--label-3)', marginTop: 3 }}>{card.where.toUpperCase()}</div>
            <div className="serif italic" style={{ fontSize: 20, lineHeight: 1.2, color: 'var(--label-1)', marginTop: 8 }}>{card.headline}</div>
            <div style={{ fontSize: 13, lineHeight: 1.45, color: 'var(--label-2)', marginTop: 6 }}>{card.body}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10, paddingTop: 9, borderTop: '1px solid rgba(179,166,196,0.16)', fontSize: 13, lineHeight: 1.4 }}>
              <span className="mono" style={{ flexShrink: 0, fontSize: 8.5, letterSpacing: '0.18em', color: PLANET[card.planet].color, paddingTop: 2 }}>TRY</span>
              <span style={{ color: 'var(--label-1)' }}>{card.tryThis}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* the reward, once all three are turned */}
      {allUp && (
        <motion.div initial={justClaimed ? { opacity: 0, scale: 0.9 } : false} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: justClaimed ? 0.4 : 0 }}
          style={{ marginTop: 10, padding: '11px 14px', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(48,32,92,0.6)', border: '1px solid rgba(248,237,255,0.3)' }}>
          <span style={{ width: 34, height: 34, borderRadius: 17, flexShrink: 0, display: 'grid', placeItems: 'center', fontSize: 15, color: 'var(--chrome-ink)', background: 'var(--chrome)', boxShadow: '0 0 14px rgba(248,237,255,0.45)' }}>✦</span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: 'block', fontSize: 14, color: 'var(--label-1)' }}>Your sky gave you {reading.reward.label}</span>
            <span style={{ display: 'block', fontSize: 12, color: 'var(--label-2)', marginTop: 2 }}>
              {LANDS[reading.reward.kind]} · {streak > 1 ? `${streak} days in a row` : 'saved to your binder'}
            </span>
          </span>
        </motion.div>
      )}
    </div>
  )
}
