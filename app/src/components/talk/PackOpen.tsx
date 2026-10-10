import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Pull } from '../../lib/talk'
import { EVENTS } from '../../data/draws'
import { sfx } from '../../lib/sfx'
import { TalkCardBack, TAROT_RATIO } from './TalkCardFace'
import PullFace, { PULL_KIND } from './PullFace'

const isRare = (c: Pull) =>
  c.kind === 'sign' ? c.variant !== 'base'
    : c.kind === 'talk' ? c.card.rarity !== 'common'
      : c.kind === 'event' ? EVENTS[c.id].rarity === 'Rare'
        : c.kind === 'energy' && c.amount >= 30

const keyOf = (c: Pull, i: number) => `${c.kind}-${i}`

/** where each card goes once you have it */
const NOTE: Record<Pull['kind'], string> = {
  talk: 'In your hand · play it in any chat',
  sign: 'Added to your Signs set',
  event: 'Saved to your deck · play it any time',
  place: 'In your hand · play it in chat to plan a date',
  energy: 'Added to your energy',
}

/**
 * Tear the pack open. Small packs fan out and turn over together; a full
 * 12-card pack is flipped one card at a time, like the real thing, with the
 * best card last. Then you see the whole pull.
 */
export default function PackOpen({ pack, cards, onDone }: { pack: { name: string; color: string }; cards: Pull[]; onDone: () => void }) {
  const [torn, setTorn] = useState(false)
  useEffect(() => {
    const t = window.setTimeout(() => { setTorn(true); sfx.release() }, 700)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'absolute', inset: 0, zIndex: 95, background: '#0a0520', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="mono" style={{ marginTop: 84, fontSize: 9.5, letterSpacing: '0.24em', color: pack.color }}>✦ {pack.name.toUpperCase()} ✦</div>

      {!torn && (
        <>
          <div className="h-display" style={{ fontSize: 28, marginTop: 8 }}>{cards.length} cards</div>
          <motion.div initial={{ scale: 0.6, rotate: -6 }} animate={{ scale: [0.6, 1.05, 1], rotate: [-6, 3, 0] }} transition={{ duration: 0.6 }}
            style={{ marginTop: 80, position: 'relative', filter: `drop-shadow(0 0 30px ${pack.color}88)` }}>
            <TalkCardBack width={150} color={pack.color} />
            <div className="serif" style={{ position: 'absolute', left: 0, right: 0, bottom: 26, textAlign: 'center', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#f2d58a' }}>{pack.name}</div>
          </motion.div>
        </>
      )}

      {torn && (cards.length > 6 ? <OneByOne cards={cards} color={pack.color} onDone={onDone} /> : <Fan cards={cards} color={pack.color} onDone={onDone} />)}
    </motion.div>
  )
}

/** up to six cards: fan out, turn over one after another */
function Fan({ cards, color, onDone }: { cards: Pull[]; color: string; onDone: () => void }) {
  const [shown, setShown] = useState(0)
  useEffect(() => {
    const ts = cards.map((c, i) => window.setTimeout(() => { setShown(i + 1); if (isRare(c)) sfx.sparkle(); else sfx.flip() }, 400 + i * 380))
    return () => ts.forEach(clearTimeout)
  }, [cards])
  const W = 100
  return (
    <>
      <div className="h-display" style={{ fontSize: 28, marginTop: 8 }}>{cards.length ? `${cards.length} new cards` : 'You have them all'}</div>
      <div style={{ position: 'relative', marginTop: 24, width: 390, height: 440 }}>
        {cards.map((c, i) => {
          const col = i % 3
          const row = Math.floor(i / 3)
          const rowCount = row === 0 ? Math.min(3, cards.length) : cards.length - 3
          const x = 195 - (rowCount * (W + 10) - 10) / 2 + col * (W + 10)
          return (
            <motion.div key={keyOf(c, i)}
              initial={{ x: 195 - W / 2, y: 60, rotate: 0, opacity: 0, scale: 0.6 }}
              animate={{ x, y: row * (W * TAROT_RATIO + 12), opacity: 1, scale: 1, rotate: (col - 1) * 2 }}
              transition={{ type: 'spring', stiffness: 160, damping: 18, delay: i * 0.08 }}
              style={{ position: 'absolute', left: 0, top: 0, perspective: 700 }}>
              <Flip up={i < shown} width={W} color={color}><PullFace pull={c} width={W} /></Flip>
            </motion.div>
          )
        })}
      </div>
      <Keep show={shown >= cards.length} onDone={onDone} />
    </>
  )
}

/** a full pack: tap to turn the top card, tap again for the next */
function OneByOne({ cards, color, onDone }: { cards: Pull[]; color: string; onDone: () => void }) {
  const [at, setAt] = useState(0)
  const [up, setUp] = useState(false)
  const [all, setAll] = useState(false)
  const W = 196
  const c = cards[at]

  const tap = () => {
    if (all) return
    if (!up) { setUp(true); if (isRare(c)) sfx.sparkle(); else sfx.flip(); return }
    if (at + 1 >= cards.length) { setAll(true); sfx.align(); return }
    sfx.tap(); setUp(false); setAt(at + 1)
  }

  if (all) {
    const tally = (Object.keys(PULL_KIND) as Pull['kind'][])
      .map((k) => [k, cards.filter((x) => x.kind === k).length] as const).filter(([, n]) => n)
    const SW = 74
    return (
      <>
        <div className="h-display" style={{ fontSize: 28, marginTop: 8 }}>Your pull</div>
        <div className="mono" style={{ marginTop: 6, fontSize: 8.5, letterSpacing: '0.14em', color: 'var(--label-2)' }}>
          {tally.map(([k, n]) => `${n} ${PULL_KIND[k].toUpperCase()}`).join(' · ')}
        </div>
        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: `repeat(4, ${SW}px)`, gap: 10 }}>
          {cards.map((x, i) => (
            <motion.div key={keyOf(x, i)} initial={{ opacity: 0, y: 14, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: i * 0.04 }}>
              <PullFace pull={x} width={SW} />
            </motion.div>
          ))}
        </div>
        <Keep show onDone={onDone} />
      </>
    )
  }

  return (
    <>
      <div className="h-display" style={{ fontSize: 28, marginTop: 8 }}>{at + 1} of {cards.length}</div>
      <div className="mono" style={{ marginTop: 6, height: 12, fontSize: 8.5, letterSpacing: '0.16em', color: 'var(--label-2)' }}>
        {up ? `${PULL_KIND[c.kind].toUpperCase()} · ${NOTE[c.kind].toUpperCase()}` : at === cards.length - 1 ? 'THE LAST CARD IS THE BEST ONE' : 'TAP TO TURN IT OVER'}
      </div>

      <div onClick={tap} style={{ position: 'relative', marginTop: 26, width: W + 24, height: W * TAROT_RATIO + 20, cursor: 'pointer' }}>
        {/* the rest of the pack, under the top card */}
        {Array.from({ length: Math.min(3, cards.length - at - 1) }).map((_, i) => (
          <div key={i} style={{ position: 'absolute', left: 12 + (i + 1) * 4, top: (i + 1) * 5, opacity: 0.6 - i * 0.15 }}>
            <TalkCardBack width={W} color={color} />
          </div>
        ))}
        <AnimatePresence mode="popLayout">
          <motion.div key={at}
            initial={{ x: 0, opacity: 1 }} exit={{ x: -260, rotate: -14, opacity: 0, transition: { duration: 0.35 } }}
            style={{ position: 'absolute', left: 12, top: 0, perspective: 900 }}>
            <Flip up={up} width={W} color={color} glow={up && isRare(c)}><PullFace pull={c} width={W} /></Flip>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* progress pips */}
      <div style={{ display: 'flex', gap: 5, marginTop: 22 }}>
        {cards.map((_, i) => (
          <span key={i} style={{ width: 8, height: 8, borderRadius: 4, background: i < at || (i === at && up) ? 'var(--chrome)' : 'rgba(179,166,196,0.25)' }} />
        ))}
      </div>
      <button className="mono" onClick={() => { sfx.tap(); setAll(true) }}
        style={{ marginTop: 18, fontSize: 9.5, letterSpacing: '0.18em', color: 'var(--label-3)' }}>
        SHOW ALL {cards.length} ›
      </button>
    </>
  )
}

function Flip({ up, width, color, glow, children }: { up: boolean; width: number; color: string; glow?: boolean; children: React.ReactNode }) {
  return (
    <motion.div animate={{ rotateY: up ? 0 : 180 }} initial={{ rotateY: 180 }} transition={{ duration: 0.5 }}
      style={{ transformStyle: 'preserve-3d', position: 'relative', width, height: width * TAROT_RATIO, filter: glow ? 'drop-shadow(0 0 22px rgba(248,237,255,0.6))' : undefined }}>
      <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden' }}>{children}</div>
      <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}><TalkCardBack width={width} color={color} /></div>
    </motion.div>
  )
}

function Keep({ show, onDone }: { show: boolean; onDone: () => void }) {
  return (
    <motion.button className="chrome-cta" onClick={() => { sfx.tap(); onDone() }}
      initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }}
      style={{ position: 'absolute', bottom: 60, pointerEvents: show ? 'auto' : 'none' }}>
      Keep them <span className="spark">✦</span>
    </motion.button>
  )
}
