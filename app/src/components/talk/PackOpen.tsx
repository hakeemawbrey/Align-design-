import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { TalkCard, TalkPack } from '../../data/talkCards'
import { sfx } from '../../lib/sfx'
import TalkCardFace, { TalkCardBack, TAROT_RATIO } from './TalkCardFace'

/** Tear the pack, then the cards fan out and turn over one by one. */
export default function PackOpen({ pack, cards, onDone }: { pack: TalkPack; cards: TalkCard[]; onDone: () => void }) {
  const [torn, setTorn] = useState(false)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const ts: number[] = []
    ts.push(window.setTimeout(() => { setTorn(true); sfx.release() }, 700))
    cards.forEach((c, i) => ts.push(window.setTimeout(() => {
      setShown(i + 1)
      if (c.rarity !== 'common') sfx.sparkle(); else sfx.flip()
    }, 1100 + i * 380)))
    return () => ts.forEach(clearTimeout)
  }, [cards])

  const W = 100
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'absolute', inset: 0, zIndex: 95, background: 'rgba(8,4,22,0.94)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="mono" style={{ marginTop: 92, fontSize: 9.5, letterSpacing: '0.24em', color: pack.color }}>✦ {pack.name.toUpperCase()} ✦</div>
      <div className="h-display" style={{ fontSize: 28, marginTop: 8 }}>{cards.length ? `${cards.length} new talk cards` : 'You have them all'}</div>

      {/* the pack */}
      {!torn && (
        <motion.div initial={{ scale: 0.6, rotate: -6 }} animate={{ scale: [0.6, 1.05, 1], rotate: [-6, 3, 0] }} transition={{ duration: 0.6 }}
          style={{ marginTop: 90, position: 'relative', filter: `drop-shadow(0 0 30px ${pack.color}88)` }}>
          <TalkCardBack width={150} color={pack.color} />
          <div className="serif" style={{ position: 'absolute', left: 0, right: 0, bottom: 26, textAlign: 'center', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#f2d58a' }}>{pack.name}</div>
        </motion.div>
      )}

      {/* the cards */}
      <div style={{ position: 'relative', marginTop: 24, width: 390, height: 440 }}>
        {torn && cards.map((c, i) => {
          const col = i % 3
          const row = Math.floor(i / 3)
          const rowCount = row === 0 ? Math.min(3, cards.length) : cards.length - 3
          const x = 195 - (rowCount * (W + 10) - 10) / 2 + col * (W + 10)
          return (
            <motion.div key={c.id}
              initial={{ x: 195 - W / 2, y: 60, rotate: 0, opacity: 0, scale: 0.6 }}
              animate={{ x, y: row * (W * TAROT_RATIO + 12), opacity: 1, scale: 1, rotate: (col - 1) * 2 }}
              transition={{ type: 'spring', stiffness: 160, damping: 18, delay: i * 0.08 }}
              style={{ position: 'absolute', left: 0, top: 0, perspective: 700 }}>
              <motion.div animate={{ rotateY: i < shown ? 0 : 180 }} transition={{ duration: 0.5 }} style={{ transformStyle: 'preserve-3d', position: 'relative', width: W, height: W * TAROT_RATIO }}>
                <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden' }}><TalkCardFace card={c} width={W} /></div>
                <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}><TalkCardBack width={W} color={pack.color} /></div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      <motion.button className="chrome-cta" onClick={() => { sfx.tap(); onDone() }}
        initial={{ opacity: 0 }} animate={{ opacity: shown >= cards.length && torn ? 1 : 0 }}
        style={{ position: 'absolute', bottom: 60, pointerEvents: shown >= cards.length && torn ? 'auto' : 'none' }}>
        Add to my hand <span className="spark">✦</span>
      </motion.button>
    </motion.div>
  )
}
