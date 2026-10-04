import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useAnimationControls, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import Starfield from '../Starfield'
import { SIGNS } from '../../data/signs'
import { ME } from '../../data/profiles'
import { sfx } from '../../lib/sfx'

export type CardSide = 'down' | 'flipped'

const SUN = SIGNS[ME.sign]
const MOON = SIGNS[ME.moon]
const RISING = SIGNS[ME.rising]
const ELEMENT = SUN.element[0].toUpperCase() + SUN.element.slice(1)

/** Hakeem's card copy (G-05b). */
export const MY_CARD = {
  bio: 'Slow to warm, impossible to shake. I cook for people I like and say less than I mean.',
  facts: [
    ['Religion', 'Spiritual, not religious'],
    ['Looking for', 'Long term, open to slow'],
    ['Height', '6′1″'],
    ['Work', 'Sound engineer'],
  ] as const,
  interests: ['Record stores', 'Night drives', 'Tarot', 'Thrifting', 'Late diners'],
  dealbreakers: 'No ghosting. Answer the question you were asked.',
}

const CARD_W = 350
const CARD_H = 560

const GOLD_EDGE = 'linear-gradient(160deg, #fff4cf 0%, #c9a24a 18%, #6b4e1c 38%, #f2c75c 55%, #8a6a2a 75%, #fff0c0 100%)'

interface Props {
  initial: CardSide
  onClose: () => void
}

/** G-05b · Your card — FACE DOWN / FLIPPED, a 3D flip between what strangers and matches see. */
export default function YourCardSheet({ initial, onClose }: Props) {
  const [side, setSide] = useState<CardSide>(initial)
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
  const sheenX = useTransform(px, [-1, 1], ['-30%', '30%'])

  return (
    <motion.div
      initial={{ x: 390 }}
      animate={{ x: 0 }}
      exit={{ x: 390 }}
      transition={{ type: 'spring', stiffness: 320, damping: 36 }}
      style={{ position: 'absolute', inset: 0, zIndex: 60, overflow: 'hidden', boxShadow: '-20px 0 40px rgba(0,0,0,0.5)' }}
    >
      <Starfield aurora="#3d2390" warm="#4a2470" count={60} seed={12} />

      {/* header */}
      <motion.button
        aria-label="Back"
        onClick={() => { sfx.tap(); onClose() }}
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.9 }}
        style={{ position: 'absolute', left: 10, top: 52, width: 44, height: 44, display: 'grid', placeItems: 'center', zIndex: 3 }}
      >
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none" stroke="var(--label-1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 2 2 10l8 8" />
        </svg>
      </motion.button>
      <div style={{ position: 'absolute', top: 64, width: '100%', textAlign: 'center', fontSize: 15, fontWeight: 500, color: 'var(--label-1)' }}>Your card</div>

      {/* segmented toggle */}
      <div style={{
        position: 'absolute', left: 86, width: 218, top: 98, height: 34, padding: 3, borderRadius: 999, display: 'flex',
        background: 'rgba(30,18,64,0.85)', border: '1px solid rgba(179,166,196,0.2)',
      }}>
        {(['down', 'flipped'] as CardSide[]).map((s) => (
          <button key={s} onClick={() => set(s)} style={{ position: 'relative', flex: 1, borderRadius: 999 }}>
            {side === s && (
              <motion.div layoutId="yc-toggle" transition={{ type: 'spring', stiffness: 460, damping: 34 }}
                style={{ position: 'absolute', inset: 0, borderRadius: 999, background: '#f3ebdc', boxShadow: '0 0 14px rgba(243,235,220,0.25)' }} />
            )}
            <span className="mono" style={{
              position: 'relative', fontSize: 10, letterSpacing: '0.18em', fontWeight: 700,
              color: side === s ? '#2a1d48' : 'var(--label-2)', transition: 'color .2s',
            }}>{s === 'down' ? 'FACE DOWN' : 'FLIPPED'}</span>
          </button>
        ))}
      </div>
      <div style={{ position: 'absolute', top: 141, width: '100%', height: 14, overflow: 'hidden' }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={side} className="mono"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
            style={{ textAlign: 'center', fontSize: 9, letterSpacing: '0.2em', color: 'var(--label-3)' }}>
            {flipped ? 'ONLY VISIBLE AFTER YOU BOTH ALIGN' : 'WHAT EVERY DECK SEES TONIGHT'}
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
        style={{ position: 'absolute', left: 20, top: 162, width: CARD_W, height: CARD_H, perspective: 1600, cursor: 'pointer' }}
      >
        <motion.div animate={nudge} style={{ width: '100%', height: '100%', rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}>
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
            initial={false}
            style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
          >
            <Face>
              <FrontFace sheenX={sheenX} />
            </Face>
            <Face back>
              <BackFace sheenX={sheenX} />
            </Face>
          </motion.div>
        </motion.div>
      </div>

      {/* edit */}
      <motion.button
        onClick={() => { sfx.sparkle(); void nudge.start({ scale: [1, 1.025, 1], transition: { duration: 0.45 } }) }}
        whileHover={{ scale: 1.02, borderColor: 'rgba(239,230,214,0.55)' }}
        whileTap={{ scale: 0.97 }}
        className="serif italic"
        style={{
          position: 'absolute', left: 38, top: 740, width: 314, height: 52, borderRadius: 999,
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

function Face({ back, children }: { back?: boolean; children: React.ReactNode }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, borderRadius: 20, padding: 1.5,
      background: GOLD_EDGE,
      boxShadow: '0 0 28px rgba(242,199,92,0.28), 0 24px 50px rgba(5,2,15,0.6)',
      backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
      transform: back ? 'rotateY(180deg)' : undefined,
    }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 18.5, overflow: 'hidden', background: '#1f1446' }}>
        {children}
      </div>
    </div>
  )
}

function Sheen({ x }: { x: MotionValue<string> }) {
  return (
    <motion.div style={{
      position: 'absolute', inset: '-20%', x, pointerEvents: 'none', mixBlendMode: 'screen',
      background: 'linear-gradient(115deg, transparent 38%, rgba(255,244,214,0.10) 46%, rgba(220,200,255,0.12) 50%, transparent 58%)',
    }} />
  )
}

function AuraImg({ height }: { height: number }) {
  const tall = height > 300
  return (
    <div className="grain" style={{ position: 'absolute', left: 0, right: 0, top: 0, height, overflow: 'hidden' }}>
      <img src={SUN.auraImg} alt="" style={{
        width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%',
        // the source plate has a dark band along its top edge — crop past it on the tall face
        transform: tall ? 'scale(1.14)' : undefined, transformOrigin: '50% 85%',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 70%, rgba(31,20,70,0.55) 100%)' }} />
      <div className="mono" style={{ position: 'absolute', left: 16, bottom: 14, fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--label-1)', textShadow: '0 1px 6px #000' }}>
        AURA · {SUN.aura.toUpperCase()}
      </div>
    </div>
  )
}

function FrontFace({ sheenX }: { sheenX: MotionValue<string> }) {
  return (
    <>
      <AuraImg height={410} />
      <div style={{ position: 'absolute', left: 18, right: 18, top: 426 }}>
        <div className="serif italic" style={{ fontSize: 30, color: 'var(--label-1)' }}>{ME.name}, {ME.age}</div>
        <div style={{ marginTop: 4, fontSize: 13.5, color: 'var(--label-2)' }}>{SUN.name} · {ELEMENT} · {MOON.name} moon</div>
        <div style={{ height: 1, background: 'rgba(179,166,196,0.18)', margin: '18px 0 12px' }} />
        <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, letterSpacing: '0.18em', color: 'var(--label-3)' }}>
          <span>ALIGN · {ME.serial}</span>
          <span style={{ color: 'var(--align)' }}>✦ FACE DOWN</span>
        </div>
      </div>
      <Sheen x={sheenX} />
    </>
  )
}

const label: React.CSSProperties = { fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', color: 'var(--label-3)', textTransform: 'uppercase' }
const value: React.CSSProperties = { fontFamily: 'var(--serif)', fontSize: 15.5, lineHeight: '20px', color: 'var(--label-1)', marginTop: 3 }

function BackFace({ sheenX }: { sheenX: MotionValue<string> }) {
  return (
    <>
      <AuraImg height={176} />
      <div className="mono" style={{
        position: 'absolute', right: 12, top: 144, height: 22, padding: '0 10px', borderRadius: 999, display: 'flex', alignItems: 'center',
        fontSize: 8.5, letterSpacing: '0.16em', color: 'var(--label-1)', background: 'rgba(20,10,46,0.7)', border: '1px solid rgba(239,230,214,0.35)',
      }}>MATCHES ONLY</div>
      <div style={{ position: 'absolute', left: 18, right: 18, top: 186 }}>
        <div className="serif italic" style={{ fontSize: 27, lineHeight: '32px', color: 'var(--label-1)' }}>{ME.name}, {ME.age}</div>
        <div style={{ marginTop: 2, fontSize: 13, color: 'var(--label-2)' }}>
          {SUN.name} · {ELEMENT} · {MOON.name} moon · {RISING.name} rising
        </div>
        <div style={{ height: 1, background: 'rgba(179,166,196,0.18)', margin: '9px 0 9px' }} />
        <div style={label}>Full bio</div>
        <div style={{ ...value, fontSize: 16, lineHeight: '21px' }}>{MY_CARD.bio}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 12, rowGap: 8, marginTop: 12 }}>
          {MY_CARD.facts.map(([k, v]) => (
            <div key={k}>
              <div style={label}>{k}</div>
              <div style={{ ...value, fontStyle: k === 'Height' ? 'italic' : undefined }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ ...label, marginTop: 12 }}>Interests</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
          {MY_CARD.interests.map((t) => (
            <span key={t} className="mono" style={{
              height: 22, padding: '0 10px', borderRadius: 999, display: 'inline-flex', alignItems: 'center',
              fontSize: 8.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--label-1)',
              background: 'rgba(52,35,95,0.55)', border: '1px solid rgba(179,166,196,0.32)',
            }}>{t}</span>
          ))}
        </div>
        <div style={{ ...label, marginTop: 12 }}>Dealbreakers</div>
        <div style={value}>{MY_CARD.dealbreakers}</div>
      </div>
      <Sheen x={sheenX} />
    </>
  )
}
