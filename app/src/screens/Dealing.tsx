import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import TabBar from '../components/TabBar'
import { DECK, DECK_TOTAL, PEEKS_PER_NIGHT } from '../data/profiles'
import { SIGNS } from '../data/signs'
import { sfx } from '../lib/sfx'
import CardBack from '../components/deck/CardBack'
import ProfileCard from '../components/deck/ProfileCard'
import { DeckHeader, Counter, StatusText, SwipeLabels, StackBacks } from '../components/deck/DeckChrome'
import { CARD_W, CARD_H, CARD_SCALE, CARD_TOP, ELEMENT_SKY } from '../components/deck/fx'

const SW = CARD_W * CARD_SCALE
const SH = CARD_H * CARD_SCALE
const SLEFT = 195 - SW / 2

/** where each dealt card lands (relative to the top-card slot) */
const DEALS = [
  { x: -34, y: 30, rotate: -7, scale: 1, delay: 0.3 },
  { x: 34, y: 30, rotate: 7, scale: 1, delay: 0.55 },
  { x: 0, y: -14, rotate: 2.5, scale: 0.94, delay: 0.8 },
  { x: 0, y: 14, rotate: 0, scale: 0.93, delay: 1.05 },
]
const TOP_DELAY = 1.3
const FLIP_AT = 1.95
const SETTLE_AT = 2.35
const GO_AT = 3.25

function Scaled({ children }: { children: React.ReactNode }) {
  return <div style={{ width: CARD_W, height: CARD_H, transform: `scale(${CARD_SCALE})`, transformOrigin: 'top left' }}>{children}</div>
}

/** S-03 → S-04: the nightly deal. */
export default function Dealing({ go }: ScreenProps) {
  const [flipped, setFlipped] = useState(false)
  const [settled, setSettled] = useState(false)
  const done = useRef(false)
  const first = DECK[0]
  const sign = SIGNS[first.sign]

  const finish = () => {
    if (done.current) return
    done.current = true
    go('deck')
  }

  useEffect(() => {
    const ts: number[] = []
    const at = (s: number, fn: () => void) => ts.push(window.setTimeout(fn, s * 1000))
    ;[...DEALS.map((d) => d.delay), TOP_DELAY].forEach((d) => at(d + 0.22, () => sfx.deal()))
    at(FLIP_AT, () => { sfx.flip(); setFlipped(true) })
    at(FLIP_AT + 0.55, () => sfx.sparkle())
    at(SETTLE_AT, () => setSettled(true))
    at(GO_AT, finish)
    return () => ts.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }} onPointerDown={() => { sfx.tap(); finish() }}>
      <Starfield aurora={null} warm="#5a2a7a" count={70} seed={5} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}
        style={{
          position: 'absolute', left: 0, right: 0, top: 0, height: 420, pointerEvents: 'none',
          background: `linear-gradient(180deg, ${ELEMENT_SKY[sign.element]}cc 0%, ${ELEMENT_SKY[sign.element]}55 22%, transparent 60%)`,
        }} />
      <div style={{
        position: 'absolute', left: -40, right: -40, top: 260, height: 460, pointerEvents: 'none',
        background: `radial-gradient(50% 50% at 50% 50%, ${sign.color}26 0%, transparent 70%)`,
      }} />

      <DeckHeader
        title={settled ? 'Tonight’s deck' : 'Dealing your deck'}
        right={settled ? <Counter left={11} total={DECK_TOTAL} /> : <StatusText>CHOSEN BY THE SKY</StatusText>}
        rightKey={settled ? 'counter' : 'chosen'}
      />

      {/* glass backs fade in under the dealt cards so the hand-off to Deck is seamless */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: settled ? 1 : 0 }} transition={{ duration: 0.5 }} style={{ position: 'absolute', inset: 0 }}>
        <StackBacks />
      </motion.div>

      {DEALS.map((d, i) => (
        <motion.div key={i}
          initial={{ x: 240 - i * 30, y: 700, rotate: 38 - i * 6, scale: 1.08, opacity: 0 }}
          animate={{ x: d.x, y: d.y, rotate: d.rotate, scale: d.scale, opacity: settled && i < 3 ? 0 : 1 }}
          transition={{
            delay: d.delay, type: 'spring', stiffness: 150, damping: 19, mass: 0.9,
            opacity: settled && i < 3 ? { duration: 0.5, delay: 0 } : { duration: 0.12, delay: d.delay },
          }}
          style={{ position: 'absolute', left: SLEFT, top: CARD_TOP, width: SW, height: SH, zIndex: 2 + i }}
        >
          <Scaled>{i === 3 && settled ? <ProfileCard profile={DECK[1]} glow={false} /> : <CardBack glow={i >= 2} />}</Scaled>
          {i === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: settled ? 0.6 : 0 }}
              style={{ position: 'absolute', inset: 0, borderRadius: 19, background: '#0b0620' }} />
          )}
        </motion.div>
      ))}

      {/* top card: dealt face-down, then flips */}
      <motion.div
        initial={{ x: 120, y: 700, rotate: 18, scale: 1.08, opacity: 0 }}
        animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
        transition={{ delay: TOP_DELAY, type: 'spring', stiffness: 150, damping: 19, mass: 0.9, opacity: { duration: 0.12, delay: TOP_DELAY } }}
        style={{ position: 'absolute', left: SLEFT, top: CARD_TOP, width: SW, height: SH, zIndex: 10, perspective: 1400 }}
      >
        <motion.div
          initial={false}
          animate={flipped ? { rotateY: 180, scale: [1, 1.07, 1], y: [0, -18, 0] } : { rotateY: 0 }}
          transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
          style={{ position: 'relative', width: SW, height: SH, transformStyle: 'preserve-3d' }}
        >
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
            <Scaled><CardBack /></Scaled>
          </div>
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <Scaled><ProfileCard profile={first} /></Scaled>
          </div>
        </motion.div>
        {/* glint as the face lands */}
        <AnimatePresence>
          {flipped && (
            <motion.div key="glint" style={{ position: 'absolute', inset: 0, borderRadius: 19, overflow: 'hidden', pointerEvents: 'none' }}>
              <motion.div initial={{ x: '-130%' }} animate={{ x: '130%' }} transition={{ delay: 0.5, duration: 0.8, ease: 'easeInOut' }}
                style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 48%, rgba(255,240,210,0.28) 52%, transparent 70%)' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: settled ? 1 : 0 }} transition={{ duration: 0.5 }} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <SwipeLabels />
        <div style={{ position: 'absolute', top: 707, left: 0, right: 0, textAlign: 'center', fontSize: 13, color: 'var(--label-2)' }}>
          Hold the card to peek&nbsp; · &nbsp;{PEEKS_PER_NIGHT} left
        </div>
      </motion.div>

      <TabBar active="deck" />
    </div>
  )
}
