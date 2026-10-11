import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useAnimationControls, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Starfield from '../Starfield'
import { ME, type Profile } from '../../data/profiles'
import ProfileCard from '../deck/ProfileCard'
import ProfileFace from '../reveal/ProfileFace'
import { CARD_W as DECK_W, CARD_H as DECK_H } from '../deck/fx'
import { sfx } from '../../lib/sfx'

export type CardSide = 'down' | 'flipped'


/** Hakeem's card copy (G-05b). */
export const MY_CARD = {
  bio: 'Slow to warm, impossible to shake. I cook for people I like and say less than I mean.',
  facts: [
    ['Religion', 'Spiritual, not religious'],
    ['Looking for', 'Long term, open to slow'],
    ['Height', '5′8″'],
    ['Work', 'Sound engineer'],
  ] as const,
  interests: ['Record stores', 'Night drives', 'Tarot', 'Thrifting', 'Late diners'],
  dealbreakers: 'No ghosting. Answer the question you were asked.',
}

/** your card as a Profile, so it renders with the exact cards everyone else sees */
const MY_PROFILE: Profile = {
  id: 'me', initial: ME.name, name: ME.name, age: ME.age, sign: ME.sign, moon: ME.moon, rising: ME.rising,
  serial: ME.serial.replace('№ ', ''), pull: 'Steady pull', photo: ME.photo, alignsBack: false, blurb: ME.blurb,
  dealbreakers: MY_CARD.dealbreakers, bio: MY_CARD.bio,
  religion: MY_CARD.facts[0][1], lookingFor: MY_CARD.facts[1][1], height: MY_CARD.facts[2][1], work: MY_CARD.facts[3][1],
  interests: [...MY_CARD.interests],
  reading: [
    { kind: 'pull', text: 'Remembers your order. Plans the second date during the first.', strength: 3 },
    { kind: 'push', text: 'Slow to say how he feels. Ask him directly.', strength: 2 },
    { kind: 'align', text: 'Loyal and steady. Wants something that lasts.', strength: 3 },
  ],
}

/** the reveal card is drawn at 358 × 625; both sides share the deck card's width */
const FACE_W = 358
const FACE_H = 625
const CARD_W = DECK_W
const FACE_S = CARD_W / FACE_W
const CARD_H = Math.round(FACE_H * FACE_S)


interface Props {
  initial: CardSide
  onClose: () => void
}

/** G-05b · Your card — FACE DOWN / FLIPPED, a 3D flip between what strangers and matches see. */
export default function YourCardSheet({ initial, onClose }: Props) {
  const [side, setSide] = useState<CardSide>(initial)
  const [toast, setToast] = useState(false)
  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(false), 2200)
    return () => window.clearTimeout(t)
  }, [toast])
  const nudge = useAnimationControls()
  const flipped = side === 'flipped'

  const set = (s: CardSide) => {
    if (s === side) return
    sfx.flip()
    setSide(s)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { sfx.tap(); onClose() }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        sfx.flip()
        setSide((s) => (s === 'down' ? 'flipped' : 'down'))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // subtle pointer tilt so the card feels like an object
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const tiltX = useSpring(useTransform(py, [-1, 1], [5, -5]), { stiffness: 160, damping: 18 })
  const tiltY = useSpring(useTransform(px, [-1, 1], [-7, 7]), { stiffness: 160, damping: 18 })

  return (
    <motion.div
      initial={{ x: 390 }}
      animate={{ x: 0 }}
      exit={{ x: 390 }}
      transition={{ type: 'spring', stiffness: 320, damping: 36 }}
      style={{ position: 'absolute', inset: 0, zIndex: 45 /* over the tab bar, under the status bar */, overflow: 'hidden', boxShadow: '-20px 0 40px rgba(0,0,0,0.5)' }}
    >
      <Starfield aurora="#3d2390" warm="#4a2470" count={60} seed={12} />

      {/* header */}
      <motion.button
        aria-label="Back"
        onClick={() => { sfx.tap(); onClose() }}
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.9 }}
        style={{ position: 'absolute', left: 16, top: 56, width: 40, height: 40, display: 'grid', placeItems: 'center', zIndex: 3 }}
      >
        <svg width="11" height="18" viewBox="0 0 12 20" fill="none" stroke="var(--label-1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 2 2 10l8 8" />
        </svg>
      </motion.button>
      <div className="mono" style={{ position: 'absolute', left: 0, right: 0, top: 56, height: 40, display: 'grid', placeItems: 'center', fontSize: 10, letterSpacing: '0.2em', color: 'var(--label-2)', pointerEvents: 'none' }}>YOUR CARD</div>

      {/* segmented toggle */}
      <div style={{
        position: 'absolute', left: 86, width: 218, top: 98, height: 34, padding: 3, borderRadius: 999, display: 'flex',
        background: 'rgba(30,18,64,0.85)', border: '1px solid rgba(179,166,196,0.2)',
      }}>
        {(['down', 'flipped'] as CardSide[]).map((s) => (
          <button key={s} onClick={() => set(s)} style={{ position: 'relative', flex: 1, borderRadius: 999 }}>
            {side === s && (
              <motion.div layoutId="yc-toggle" transition={{ type: 'spring', stiffness: 460, damping: 34 }}
                style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'var(--chrome)', boxShadow: '0 0 14px rgba(248,237,255,0.3)' }} />
            )}
            <span className="mono" style={{
              position: 'relative', fontSize: 10, letterSpacing: '0.18em', fontWeight: 700,
              color: side === s ? 'var(--chrome-ink)' : 'var(--label-2)', transition: 'color .2s',
            }}>{s === 'down' ? 'MYSTERY' : 'REVEALED'}</span>
          </button>
        ))}
      </div>
      <div style={{ position: 'absolute', top: 141, width: '100%', height: 14, overflow: 'hidden' }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={side} className="mono"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
            style={{ textAlign: 'center', fontSize: 9, letterSpacing: '0.2em', color: 'var(--label-3)' }}>
            {flipped ? 'WHAT A MATCH SEES ONCE YOU BOTH ALIGN' : 'WHAT OTHERS SEE IN THEIR DECK TONIGHT'}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* the card */}
      <div
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          px.set(((e.clientX - r.left) / r.width) * 2 - 1)
          py.set(((e.clientY - r.top) / r.height) * 2 - 1)
        }}
        onPointerLeave={() => { px.set(0); py.set(0) }}
        onClick={() => set(flipped ? 'down' : 'flipped')}
        style={{ position: 'absolute', left: (390 - CARD_W) / 2, top: 162, width: CARD_W, height: CARD_H, perspective: 1600, cursor: 'pointer' }}
      >
        <motion.div animate={nudge} style={{ width: '100%', height: '100%', rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}>
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
            initial={false}
            style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
          >
            {/* front: the mystery card, exactly as it's dealt into other people's decks */}
            <div style={{ position: 'absolute', left: 0, top: (CARD_H - DECK_H) / 2, width: DECK_W, height: DECK_H, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
              <ProfileCard profile={MY_PROFILE} peek="none" />
            </div>
            {/* back: the full reveal card a match sees */}
            <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              <div style={{ width: FACE_W, height: FACE_H, transform: `scale(${FACE_S})`, transformOrigin: '0 0' }}>
                <ProfileFace p={MY_PROFILE} shown lift revealed />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div key="t" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            style={{ position: 'absolute', left: 0, right: 0, bottom: 120, display: 'flex', justifyContent: 'center', pointerEvents: 'none', zIndex: 5 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, height: 38, padding: '0 18px', borderRadius: 999, fontSize: 13.5, color: 'var(--label-1)',
              background: 'rgba(40,26,78,0.88)', border: '1px solid rgba(179,166,196,0.22)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
            }}><span style={{ color: 'var(--align)' }}>✦</span>Card editing is coming soon.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* edit */}
      <motion.button
        onClick={() => { sfx.sparkle(); setToast(true); void nudge.start({ scale: [1, 1.025, 1], transition: { duration: 0.45 } }) }}
        whileHover={{ scale: 1.02, borderColor: 'rgba(239,230,214,0.55)' }}
        whileTap={{ scale: 0.97 }}
        className="serif italic"
        style={{
          position: 'absolute', left: 38, top: 754, width: 314, height: 52, borderRadius: 999,
          border: '1px solid rgba(239,230,214,0.32)', background: 'rgba(40,26,78,0.55)',
          backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          fontSize: 19, color: 'var(--label-1)',
        }}
      >
        Edit this side
      </motion.button>
    </motion.div>
  )
}
