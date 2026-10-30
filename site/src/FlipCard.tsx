import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationControls, useMotionValue, useSpring, useTransform } from 'framer-motion'
import confetti from 'canvas-confetti'
import CardBack from '@app/components/deck/CardBack'
import ProfileCard from '@app/components/deck/ProfileCard'
import ProfileFace from '@app/components/reveal/ProfileFace'
import { CARD_W, CARD_H } from '@app/components/deck/fx'
import { profileById, type Profile } from '@app/data/profiles'

/** the reveal card is drawn at 358 × 625; both sides share the deck card's width */
const FACE_W = 358
const FACE_S = CARD_W / FACE_W
export const FLIP_W = CARD_W
export const FLIP_H = Math.round(625 * FACE_S)
/** the deck card sits in the middle of the taller reveal card */
const CARD_TOP = (FLIP_H - CARD_H) / 2

const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

/** tonight's hand: release Maya, align on Rio (no match), align on Juniper (it's mutual) */
const HAND: { p: Profile; dir: -1 | 1 }[] = [
  { p: profileById('m24')!, dir: -1 },
  { p: profileById('r29')!, dir: 1 },
  { p: profileById('j27')!, dir: 1 },
]
const JUNIPER = HAND.length - 1

/** the app's nightly deal (Dealing.tsx): backs land in a loose pile, then the top card */
const DEALS = [
  { x: -34, y: 30, rotate: -7, scale: 1, delay: 0.1 },
  { x: 34, y: 30, rotate: 7, scale: 1, delay: 0.35 },
  { x: 0, y: -14, rotate: 2.5, scale: 0.94, delay: 0.6 },
  { x: 0, y: 14, rotate: 0, scale: 0.93, delay: 0.85 },
]
const TOP_DELAY = 1.1
const DEAL_SPRING = { type: 'spring', stiffness: 150, damping: 19, mass: 0.9 } as const

/** where the night is: Juniper ends on mutual → shake → revealed */
type Beat =
  | { at: 'deal' } | { at: 'up' }
  | { at: 'lean'; i: number } | { at: 'gone'; i: number }
  | { at: 'mutual' } | { at: 'shake' } | { at: 'revealed' }

/** the script, in ms from the start */
const SCRIPT: [number, Beat][] = [
  [1750, { at: 'up' }],
  [2900, { at: 'lean', i: 0 }], [3450, { at: 'gone', i: 0 }],
  [4500, { at: 'lean', i: 1 }], [5050, { at: 'gone', i: 1 }],
  [6100, { at: 'lean', i: 2 }], [6800, { at: 'mutual' }],
  [7500, { at: 'shake' }], [8400, { at: 'revealed' }],
]

/** a line for under the card at each beat */
const CAPTION: Record<Beat['at'], string> = {
  deal: 'Dealing tonight’s deck',
  up: 'No photos. Just who they are.',
  lean: 'Release or align',
  gone: 'Release or align',
  mutual: 'It’s mutual ✦',
  shake: 'It’s mutual ✦',
  revealed: 'It’s a match ✦',
}

const face: React.CSSProperties = { position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }

/** the app's swipe stamps (Deck.tsx) */
function Stamp({ kind, on }: { kind: 'align' | 'release'; on: boolean }) {
  const align = kind === 'align'
  return (
    <motion.div initial={false} animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 1.4 }} transition={{ type: 'spring', stiffness: 420, damping: 22 }}
      style={{
        position: 'absolute', top: 84, [align ? 'left' : 'right']: 22, rotate: align ? -14 : 14, pointerEvents: 'none', borderRadius: 12,
        ...(align
          ? { padding: '2px 16px 4px', border: '3px solid #f2c75c', boxShadow: '0 0 24px rgba(242,199,92,0.7), inset 0 0 14px rgba(242,199,92,0.4)', background: 'rgba(20,10,46,0.35)' }
          : { padding: '4px 14px', border: '2.5px solid #b3a6c4', background: 'rgba(11,6,32,0.45)' }),
      }}>
      {align
        ? <span className="serif italic" style={{ fontSize: 50, fontWeight: 600, lineHeight: 1, background: 'var(--gold-foil)', backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', backgroundPosition: '30% 50%', display: 'inline-block' }}>Align ✦</span>
        : <span className="mono" style={{ fontSize: 26, letterSpacing: '0.16em', color: '#d8cfe6', fontWeight: 700 }}>RELEASE</span>}
    </motion.div>
  )
}

/**
 * The hero, the way a night goes in the app: the deck is dealt, you release one person,
 * align on another, then align on Juniper. It's mutual: her card shakes and turns over
 * to show her. After that it's yours to flip.
 */
export default function FlipCard({ scale, onFlip, onCaption, onReplay }: {
  scale: number
  onFlip?: (revealed: boolean) => void
  onCaption?: (text: string) => void
  /** once the match is revealed, a way to deal again (null while it plays) */
  onReplay?: (again: (() => void) | null) => void
}) {
  const [beat, setBeat] = useState<Beat>(reduced ? { at: 'revealed' } : { at: 'deal' })
  const [run, setRun] = useState(0)
  // after the script, a tap turns Juniper's card back and forth
  const [revealed, setRevealed] = useState(reduced)
  // remount her face each time it turns over, so the veil lifts again
  const [turns, setTurns] = useState(reduced ? 1 : 0)
  const shake = useAnimationControls()
  const flash = useAnimationControls()
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced) return
    const ts = SCRIPT.map(([ms, b]) => window.setTimeout(() => setBeat(b), ms))
    return () => ts.forEach(window.clearTimeout)
  }, [run])

  // the beats that are more than a pose
  useEffect(() => {
    onCaption?.(CAPTION[beat.at])
    if (beat.at === 'shake') {
      void shake.start({
        x: [0, -5, 6, -8, 9, -11, 12, -10, 8, -4, 0], rotate: [0, -1, 1.2, -1.8, 2, -2.4, 2.6, -2, 1.4, -0.6, 0],
        transition: { duration: 0.85, ease: 'easeInOut' },
      })
    }
    if (beat.at === 'revealed' && !reduced) {
      setRevealed(true); setTurns((n) => n + 1); onFlip?.(true)
      void flash.start({ opacity: [0, 1, 0], scale: [0.6, 1.4, 1.8], transition: { duration: 1.2, ease: 'easeOut' } })
      const r = box.current?.getBoundingClientRect()
      if (r) {
        const origin = { x: (r.left + r.width / 2) / window.innerWidth, y: (r.top + r.height * 0.4) / window.innerHeight }
        const colors = ['#f2c75c', '#fff4cf', '#f8edff', '#c9b6f0', '#ff9fd8']
        window.setTimeout(() => {
          void confetti({ particleCount: 70, spread: 75, startVelocity: 38, origin, colors, scalar: 0.9, disableForReducedMotion: true })
          void confetti({ particleCount: 36, spread: 120, startVelocity: 24, origin, colors, shapes: ['star'], scalar: 1.1, disableForReducedMotion: true })
        }, 300)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beat])

  const done = beat.at === 'revealed'
  const cur = beat.at === 'deal' || beat.at === 'up' ? 0
    : beat.at === 'lean' ? beat.i
      : beat.at === 'gone' ? beat.i + 1
        : JUNIPER
  const leaning = beat.at === 'lean' ? beat.i : -1
  const mutual = beat.at === 'mutual' || beat.at === 'shake'

  const tap = () => {
    if (!done) { setBeat({ at: 'revealed' }); return }
    const to = !revealed
    setRevealed(to)
    if (to) setTurns((n) => n + 1)
    onFlip?.(to)
    onCaption?.(to ? CAPTION.revealed : 'How strangers see her')
  }
  const again = () => {
    setRevealed(false); onFlip?.(false); setBeat({ at: 'deal' }); setRun((n) => n + 1)
  }

  useEffect(() => {
    onReplay?.(done && !reduced ? again : null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done])

  // pointer tilt so the card feels like an object
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const tiltX = useSpring(useTransform(py, [-1, 1], [7, -7]), { stiffness: 160, damping: 18 })
  const tiltY = useSpring(useTransform(px, [-1, 1], [-9, 9]), { stiffness: 160, damping: 18 })

  const scaled: React.CSSProperties = { position: 'absolute', left: 0, top: 0, width: FLIP_W, height: FLIP_H, transform: `scale(${scale})`, transformOrigin: '0 0' }

  return (
    <div ref={box} style={{ width: FLIP_W * scale, height: FLIP_H * scale, position: 'relative' }}>
      {/* the pile: backs dealt in from the lower right, easing back once the deck is up */}
      <div aria-hidden key={`pile${run}`} style={{ ...scaled, pointerEvents: 'none' }}>
        {DEALS.map((d, i) => (
          <motion.div key={i}
            initial={reduced ? false : { x: 240 - i * 30, y: 700, rotate: 38 - i * 6, scale: 1.08, opacity: 0 }}
            animate={{ x: d.x, y: d.y, rotate: d.rotate, scale: d.scale, opacity: beat.at === 'deal' ? 1 : mutual || done ? 0.22 : 0.45 }}
            transition={{ ...DEAL_SPRING, delay: beat.at === 'deal' ? d.delay : 0, opacity: { duration: 0.6 } }}
            style={{ position: 'absolute', left: 0, top: CARD_TOP }}>
            <CardBack glow={i >= 2} />
          </motion.div>
        ))}
      </div>

      {/* gold bloom behind the card at the reveal */}
      <motion.div aria-hidden initial={{ opacity: 0 }} animate={flash}
        style={{ position: 'absolute', inset: '-15%', borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(closest-side, rgba(255,236,170,0.8), rgba(242,199,92,0.35) 45%, transparent 75%)', mixBlendMode: 'screen' }} />

      <button
        key={`hand${run}`}
        aria-label={done ? (revealed ? 'Turn her card back over' : 'Turn her card over') : 'Skip to the match'}
        onPointerMove={(e) => {
          if (e.pointerType !== 'mouse') return
          const r = e.currentTarget.getBoundingClientRect()
          px.set(((e.clientX - r.left) / r.width) * 2 - 1)
          py.set(((e.clientY - r.top) / r.height) * 2 - 1)
        }}
        onPointerLeave={() => { px.set(0); py.set(0) }}
        onClick={tap}
        style={{ ...scaled, perspective: 1600, cursor: 'pointer', display: 'block', textAlign: 'left' }}
      >
        {/* last in the hand is drawn first, so the top card paints over the rest */}
        {HAND.map(({ p, dir }, i) => ({ p, dir, i })).reverse().map(({ p, dir, i }) => {
          const gone = i < cur
          const top = i === cur
          const under = i === cur + 1
          const lean = i === leaning
          const isJ = i === JUNIPER
          return (
            <motion.div key={p.id}
              initial={reduced ? false : i === 0 ? { x: 120, y: 700, rotate: 18, scale: 1.08, opacity: 0 } : { x: 0, y: 14, rotate: 0, scale: 0.93, opacity: 0 }}
              animate={gone
                ? { x: dir * 560, y: dir > 0 ? -70 : 30, rotate: dir * 20, scale: 1, opacity: 0 }
                : top
                  ? { x: lean ? dir * 46 : 0, y: 0, rotate: lean ? dir * 5 : 0, scale: 1, opacity: 1 }
                  : { x: 0, y: 14, rotate: 0, scale: 0.93, opacity: under && beat.at !== 'deal' ? 1 : 0 }}
              transition={gone
                ? { duration: 0.42, ease: [0.25, 0.6, 0.35, 1], opacity: { duration: 0.2, delay: 0.24 } }
                : i === 0 && beat.at === 'deal' ? { ...DEAL_SPRING, delay: TOP_DELAY, opacity: { duration: 0.12, delay: TOP_DELAY } }
                  : { type: 'spring', stiffness: 260, damping: 24 }}
              style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }}
            >
              <motion.div animate={isJ ? shake : undefined} style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d' }}>
                <motion.div style={{ width: '100%', height: '100%', rotateX: isJ ? tiltX : 0, rotateY: isJ ? tiltY : 0, transformStyle: 'preserve-3d' }}>
                  {/* the first card arrives face-down and turns over, like the deal in the app */}
                  <motion.div
                    initial={false}
                    animate={i > 0 || beat.at !== 'deal' ? { rotateY: 180 } : { rotateY: 0 }}
                    transition={reduced || i > 0 ? { duration: 0 } : { duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
                    style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
                  >
                    {i === 0 && (
                      <div style={{ ...face, top: CARD_TOP, bottom: 'auto', width: CARD_W, height: CARD_H }}><CardBack /></div>
                    )}
                    <div style={{ ...face, transform: 'rotateY(180deg)', transformStyle: 'preserve-3d', backfaceVisibility: 'visible', WebkitBackfaceVisibility: 'visible' }}>
                      {/* Juniper's card turns once more, to what a match sees */}
                      <motion.div
                        initial={false}
                        animate={isJ && revealed ? { rotateY: 180, scale: reduced ? 1 : [1, 1.12, 1], y: reduced ? 0 : [0, -26, 0] } : { rotateY: 0, scale: 1, y: 0 }}
                        transition={reduced ? { duration: 0 } : { duration: 0.9, ease: [0.3, 1.2, 0.4, 1] }}
                        style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
                      >
                        <div style={{ ...face, top: CARD_TOP, bottom: 'auto', width: CARD_W, height: CARD_H }}>
                          <ProfileCard profile={p} peek="none" glow={top} />
                          {/* gold wash as it turns mutual */}
                          {isJ && (
                            <motion.div initial={false} animate={{ opacity: mutual ? 1 : 0 }} transition={{ duration: 0.4 }}
                              style={{ position: 'absolute', inset: 0, borderRadius: 20, pointerEvents: 'none', boxShadow: '0 0 50px rgba(242,199,92,0.85), 0 0 110px rgba(242,199,92,0.4)', background: 'radial-gradient(90% 70% at 50% 40%, rgba(255,228,150,0.22), transparent 70%)' }} />
                          )}
                          {top && <Stamp kind="align" on={(lean && dir > 0) || (isJ && mutual)} />}
                          {top && <Stamp kind="release" on={lean && dir < 0} />}
                        </div>
                        {isJ && (
                          <div style={{ ...face, transform: 'rotateY(180deg)', visibility: turns > 0 ? 'visible' : 'hidden' }}>
                            <div style={{ width: FACE_W, height: 625, transform: `scale(${FACE_S})`, transformOrigin: '0 0', position: 'relative' }}>
                              <ProfileFace key={turns} p={p} shown={revealed} lift={revealed} revealed={revealed} />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )
        })}
      </button>

    </div>
  )
}
