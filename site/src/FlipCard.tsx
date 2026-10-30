import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import ProfileCard from '@app/components/deck/ProfileCard'
import ProfileFace from '@app/components/reveal/ProfileFace'
import { CARD_W, CARD_H } from '@app/components/deck/fx'
import { profileById } from '@app/data/profiles'

/** the reveal card is drawn at 358 × 625; both sides share the deck card's width */
const FACE_W = 358
const FACE_S = CARD_W / FACE_W
export const FLIP_W = CARD_W
export const FLIP_H = Math.round(625 * FACE_S)

const JUNIPER = profileById('j27')!
/** the rest of tonight's hand, fanned behind her: [profile, angle] */
const HAND = ([['m24', -14], ['r29', -7], ['a31', 7], ['s26', 14]] as const).map(([id, deg]) => ({ p: profileById(id)!, deg }))
/** deal → fanned → played; then the card flips */
type Phase = 'deal' | 'fan' | 'played'
const FAN_ORIGIN = '50% 135%'
const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * The hero: tonight's hand deals in fanned out, Juniper's card is played from the middle,
 * then it flips from what's dealt (no photo) to what a match sees.
 * It turns on its own until someone touches it, then it's theirs to flip.
 */
export default function FlipCard({ scale, onFlip }: { scale: number; onFlip?: (revealed: boolean) => void }) {
  const [revealed, setRevealed] = useState(false)
  // remount the face each time it turns over, so the veil lifts again
  const [turns, setTurns] = useState(0)
  const touched = useRef(false)
  const [phase, setPhase] = useState<Phase>(reduced ? 'played' : 'deal')
  useEffect(() => {
    if (reduced) return
    const a = window.setTimeout(() => setPhase('fan'), 900)
    const b = window.setTimeout(() => setPhase('played'), 2300)
    return () => { window.clearTimeout(a); window.clearTimeout(b) }
  }, [])
  const played = phase === 'played'

  const flip = (to = !revealed) => {
    setRevealed(to)
    if (to) setTurns((n) => n + 1)
    onFlip?.(to)
  }

  useEffect(() => {
    if (reduced || touched.current || !played) return
    const t = window.setTimeout(() => { if (!touched.current) flip() }, revealed ? 5200 : turns === 0 ? 900 : 3400)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed, played])

  // pointer tilt so the card feels like an object
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const tiltX = useSpring(useTransform(py, [-1, 1], [7, -7]), { stiffness: 160, damping: 18 })
  const tiltY = useSpring(useTransform(px, [-1, 1], [-9, 9]), { stiffness: 160, damping: 18 })

  return (
    <div style={{ width: FLIP_W * scale, height: FLIP_H * scale, position: 'relative' }}>
      {/* the rest of the hand: deals in, fans out, then sinks back once her card is played */}
      <div aria-hidden style={{ position: 'absolute', left: 0, top: 0, width: FLIP_W, height: FLIP_H, transform: `scale(${scale})`, transformOrigin: '0 0', pointerEvents: 'none' }}>
        {HAND.map(({ p, deg }, i) => (
          <motion.div key={p.id}
            initial={reduced ? false : { y: 520, rotate: 0, opacity: 0 }}
            animate={phase === 'deal'
              ? { y: 24, rotate: deg * 0.4, opacity: 1, scale: 0.84 }
              : phase === 'fan'
                ? { y: 24, rotate: deg, opacity: 1, scale: 0.84 }
                : { y: 20, rotate: deg * 1.2, opacity: 0.3, scale: 0.78 }}
            transition={phase === 'deal'
              ? { type: 'spring', stiffness: 170, damping: 22, delay: 0.1 + i * 0.09 }
              : { type: 'spring', stiffness: 140, damping: 20 }}
            style={{ position: 'absolute', left: 0, top: (FLIP_H - CARD_H) / 2, transformOrigin: FAN_ORIGIN, filter: played ? 'saturate(0.7)' : undefined }}>
            <ProfileCard profile={p} peek="none" glow={false} />
          </motion.div>
        ))}
      </div>
      <button
        aria-label={revealed ? 'Turn the card back over' : 'Flip the card'}
        aria-pressed={revealed}
        onPointerMove={(e) => {
          if (e.pointerType !== 'mouse') return
          const r = e.currentTarget.getBoundingClientRect()
          px.set(((e.clientX - r.left) / r.width) * 2 - 1)
          py.set(((e.clientY - r.top) / r.height) * 2 - 1)
        }}
        onPointerLeave={() => { px.set(0); py.set(0) }}
        onClick={() => { touched.current = true; if (!played) { setPhase('played'); return } flip() }}
        style={{
          position: 'absolute', left: 0, top: 0, width: FLIP_W, height: FLIP_H, perspective: 1600,
          transform: `scale(${scale})`, transformOrigin: '0 0', cursor: 'pointer', display: 'block',
        }}
      >
        {/* her card: dealt into the middle of the hand, then played up and out of it */}
        <motion.div
          initial={reduced ? false : { y: 520, scale: 0.86, opacity: 0 }}
          animate={played ? { y: 0, scale: 1, opacity: 1 } : { y: 24, scale: 0.84, opacity: 1 }}
          transition={played ? { type: 'spring', stiffness: 120, damping: 16 } : { type: 'spring', stiffness: 170, damping: 22, delay: 0.1 + 2 * 0.09 }}
          style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d', transformOrigin: FAN_ORIGIN }}
        >
        <motion.div
          animate={reduced || !played ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
        >
          <motion.div style={{ width: '100%', height: '100%', rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}>
            <motion.div
              animate={{ rotateY: revealed ? 180 : 0 }}
              transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 110, damping: 15 }}
              initial={false}
              style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
            >
              {/* front: the mystery card, exactly as it's dealt into your deck */}
              <div style={{ position: 'absolute', left: 0, top: (FLIP_H - CARD_H) / 2, width: CARD_W, height: CARD_H, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', textAlign: 'left' }}>
                <ProfileCard profile={JUNIPER} peek="none" />
              </div>
              {/* back: the full card a match sees */}
              <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', textAlign: 'left' }}>
                <div style={{ width: FACE_W, height: 625, transform: `scale(${FACE_S})`, transformOrigin: '0 0', position: 'relative' }}>
                  <ProfileFace key={turns} p={JUNIPER} shown={revealed} lift={revealed} revealed={revealed} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        </motion.div>
      </button>
    </div>
  )
}
