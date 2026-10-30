import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import CardBack from '@app/components/deck/CardBack'
import ProfileCard from '@app/components/deck/ProfileCard'
import ProfileFace from '@app/components/reveal/ProfileFace'
import { CARD_W, CARD_H } from '@app/components/deck/fx'
import { profileById } from '@app/data/profiles'

/** the reveal card is drawn at 358 × 625; both sides share the deck card's width */
const FACE_W = 358
const FACE_S = CARD_W / FACE_W
export const FLIP_W = CARD_W
export const FLIP_H = Math.round(625 * FACE_S)
/** the deck card sits in the middle of the taller reveal card */
const CARD_TOP = (FLIP_H - CARD_H) / 2

const JUNIPER = profileById('j27')!
const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

/** the app's nightly deal (Dealing.tsx): backs land in a loose pile, then the top card */
const DEALS = [
  { x: -34, y: 30, rotate: -7, scale: 1, delay: 0.1 },
  { x: 34, y: 30, rotate: 7, scale: 1, delay: 0.35 },
  { x: 0, y: -14, rotate: 2.5, scale: 0.94, delay: 0.6 },
  { x: 0, y: 14, rotate: 0, scale: 0.93, delay: 0.85 },
]
const TOP_DELAY = 1.1
const FLIP_AT = 1.75
const SETTLE_AT = 2.15
const DEAL_SPRING = { type: 'spring', stiffness: 150, damping: 19, mass: 0.9 } as const

const face: React.CSSProperties = { position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }

/**
 * The hero, the way the app opens a night: card backs are dealt into a pile, the top one
 * lands face-down and flips to Juniper's card (no photo). Then it flips again to what a
 * match sees. It turns on its own until someone touches it, then it's theirs to flip.
 */
export default function FlipCard({ scale, onFlip }: { scale: number; onFlip?: (revealed: boolean) => void }) {
  // dealt: the top card has flipped face-up; settled: the pile has eased back
  const [dealt, setDealt] = useState(reduced)
  const [settled, setSettled] = useState(reduced)
  const [revealed, setRevealed] = useState(false)
  // remount the face each time it turns over, so the veil lifts again
  const [turns, setTurns] = useState(0)
  const touched = useRef(false)

  useEffect(() => {
    if (reduced) return
    const a = window.setTimeout(() => setDealt(true), FLIP_AT * 1000)
    const b = window.setTimeout(() => setSettled(true), SETTLE_AT * 1000)
    return () => { window.clearTimeout(a); window.clearTimeout(b) }
  }, [])

  const flip = (to = !revealed) => {
    setRevealed(to)
    if (to) setTurns((n) => n + 1)
    onFlip?.(to)
  }

  useEffect(() => {
    if (reduced || touched.current || !settled) return
    const t = window.setTimeout(() => { if (!touched.current) flip() }, revealed ? 5200 : turns === 0 ? 2000 : 3400)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed, settled])

  // pointer tilt so the card feels like an object
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const tiltX = useSpring(useTransform(py, [-1, 1], [7, -7]), { stiffness: 160, damping: 18 })
  const tiltY = useSpring(useTransform(px, [-1, 1], [-9, 9]), { stiffness: 160, damping: 18 })

  return (
    <div style={{ width: FLIP_W * scale, height: FLIP_H * scale, position: 'relative' }}>
      {/* the pile: backs dealt in from the lower right, easing back once the top card is up */}
      <div aria-hidden style={{ position: 'absolute', left: 0, top: 0, width: FLIP_W, height: FLIP_H, transform: `scale(${scale})`, transformOrigin: '0 0', pointerEvents: 'none' }}>
        {DEALS.map((d, i) => (
          <motion.div key={i}
            initial={reduced ? false : { x: 240 - i * 30, y: 700, rotate: 38 - i * 6, scale: 1.08, opacity: 0 }}
            animate={{ x: d.x, y: d.y, rotate: d.rotate, scale: d.scale, opacity: settled ? 0.45 : 1 }}
            transition={{ ...DEAL_SPRING, delay: d.delay, opacity: settled ? { duration: 0.6 } : { duration: 0.12, delay: d.delay } }}
            style={{ position: 'absolute', left: 0, top: CARD_TOP }}>
            <CardBack glow={i >= 2} />
          </motion.div>
        ))}
      </div>

      <button
        aria-label={!dealt ? 'Dealing' : revealed ? 'Turn the card back over' : 'Flip the card'}
        aria-pressed={revealed}
        onPointerMove={(e) => {
          if (e.pointerType !== 'mouse') return
          const r = e.currentTarget.getBoundingClientRect()
          px.set(((e.clientX - r.left) / r.width) * 2 - 1)
          py.set(((e.clientY - r.top) / r.height) * 2 - 1)
        }}
        onPointerLeave={() => { px.set(0); py.set(0) }}
        onClick={() => {
          touched.current = true
          // a tap mid-deal finishes the deal
          if (!settled) { setDealt(true); setSettled(true); return }
          flip()
        }}
        style={{
          position: 'absolute', left: 0, top: 0, width: FLIP_W, height: FLIP_H, perspective: 1600,
          transform: `scale(${scale})`, transformOrigin: '0 0', cursor: 'pointer', display: 'block', textAlign: 'left',
        }}
      >
        {/* the top card: dealt in last, face-down */}
        <motion.div
          initial={reduced ? false : { x: 120, y: 700, rotate: 18, scale: 1.08, opacity: 0 }}
          animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
          transition={{ ...DEAL_SPRING, delay: TOP_DELAY, opacity: { duration: 0.12, delay: TOP_DELAY } }}
          style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
        >
          <motion.div
            animate={reduced || !settled ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
          >
            <motion.div style={{ width: '100%', height: '100%', rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}>
              {/* the deal flip: back → her card, with the app's little lift */}
              <motion.div
                initial={false}
                animate={dealt ? { rotateY: 180, scale: reduced ? 1 : [1, 1.07, 1], y: reduced ? 0 : [0, -18, 0] } : { rotateY: 0 }}
                transition={reduced ? { duration: 0 } : { duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
                style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
              >
                <div style={{ ...face, top: CARD_TOP, bottom: 'auto', width: CARD_W, height: CARD_H }}>
                  <CardBack />
                </div>

                {/* her card, which then flips between what's dealt and what a match sees */}
                <div style={{ ...face, transform: 'rotateY(180deg)', transformStyle: 'preserve-3d', backfaceVisibility: 'visible', WebkitBackfaceVisibility: 'visible' }}>
                  <motion.div
                    animate={{ rotateY: revealed ? 180 : 0 }}
                    transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 110, damping: 15 }}
                    initial={false}
                    style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
                  >
                    <div style={{ ...face, top: CARD_TOP, bottom: 'auto', width: CARD_W, height: CARD_H }}>
                      <ProfileCard profile={JUNIPER} peek="none" />
                      {/* glint as the face lands */}
                      <AnimatePresence>
                        {dealt && !reduced && (
                          <motion.div key="glint" style={{ position: 'absolute', inset: 0, borderRadius: 20, overflow: 'hidden', pointerEvents: 'none' }}>
                            <motion.div initial={{ x: '-130%' }} animate={{ x: '130%' }} transition={{ delay: 0.5, duration: 0.8, ease: 'easeInOut' }}
                              style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 48%, rgba(255,240,210,0.28) 52%, transparent 70%)' }} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {/* turned twice it faces front while the card is still face-down, so it stays hidden until first asked for */}
                    <div style={{ ...face, transform: 'rotateY(180deg)', visibility: turns > 0 ? 'visible' : 'hidden' }}>
                      <div style={{ width: FACE_W, height: 625, transform: `scale(${FACE_S})`, transformOrigin: '0 0', position: 'relative' }}>
                        <ProfileFace key={turns} p={JUNIPER} shown={revealed} lift={revealed} revealed={revealed} />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </button>
    </div>
  )
}
