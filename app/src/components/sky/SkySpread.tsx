import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TAROT_RATIO } from '../talk/TalkCardFace'
import { SkyCardBack, SkyCardFace, SLOT_LABEL } from './SkyCardFace'
import { PLANET, TODAY_READING, type SkyReading } from '../../data/skyReading'
import { ME } from '../../data/profiles'
import { SIGNS } from '../../data/signs'
import { talk, useTalk } from '../../lib/talk'
import { sfx } from '../../lib/sfx'

const W = 104

/** how each card's part of the horoscope is headed */
const SECTION = { you: 'Your mood', love: 'Love', move: 'Your move' } as const
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

  return (
    <div style={{ width: 342 }}>
      <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--label-2)', textAlign: 'center' }}>
        {SIGNS[ME.sign].glyph}{'︎'} {SIGNS[ME.sign].name.toUpperCase()} · TODAY’S SKY · № {reading.serial}
      </div>
      <div className="h-display" style={{ fontSize: 32, marginTop: 8, textAlign: 'center' }}>
        {allUp ? 'Your horoscope' : up.some(Boolean) ? 'Keep drawing' : 'Draw your horoscope'}
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--label-2)', marginTop: 6, textAlign: 'center' }}>
        {allUp ? 'Today’s real sky, read against your birth chart.' : 'Three cards from today’s sky. Tap each one to turn it.'}
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
                <motion.div animate={up[i] ? {} : { y: [0, -3, 0] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }} style={{ willChange: 'transform' }}>
                  <SkyCardBack slot={c.slot} width={W} />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* the horoscope: each card you turn writes its paragraph */}
      <div style={{ marginTop: 18 }}>
        {reading.cards.map((c, i) => {
          const pl = PLANET[c.planet]
          return (
            <div key={c.slot} onClick={() => tap(i)}
              style={{ padding: '14px 0', borderTop: i ? '1px solid rgba(179,166,196,0.14)' : 'none', cursor: up[i] ? 'default' : 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span className="mono" style={{ fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: up[i] ? pl.color : 'var(--label-3)' }}>{SECTION[c.slot]}</span>
                {up[i] && <span className="mono" style={{ fontSize: 9, letterSpacing: '0.14em', color: 'var(--label-3)' }}>{pl.glyph}{'︎'} {pl.name.toUpperCase()}</span>}
              </div>
              <AnimatePresence mode="wait" initial={false}>
                {up[i] ? (
                  <motion.div key="read" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                    <div className="serif italic" style={{ fontSize: 22, lineHeight: 1.2, color: 'var(--label-1)', marginTop: 6 }}>{c.headline}</div>
                    <p style={{ margin: '8px 0 0', fontSize: 14.5, lineHeight: 1.55, color: 'var(--label-2)' }}>{c.story}</p>
                    <div style={{ display: 'flex', gap: 10, marginTop: 8, fontSize: 14.5, lineHeight: 1.45 }}>
                      <span className="mono" style={{ flexShrink: 0, fontSize: 9, letterSpacing: '0.2em', color: pl.color, paddingTop: 4 }}>TRY</span>
                      <span style={{ color: 'var(--label-1)' }}>{c.tryThis}</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="wait" exit={{ opacity: 0 }} style={{ fontSize: 13.5, color: 'var(--label-3)', marginTop: 6 }}>
                    Turn the {SLOT_LABEL[c.slot]} card to read this.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

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
