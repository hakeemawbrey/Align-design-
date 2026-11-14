import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import TradeCard, { TradeCardBack, TC_H, TC_W } from '../components/binder/TradeCard'
import RevealStyles from '../components/reveal/RevealStyles'
import { ConfettiCanvas, useConfetti } from '../components/reveal/useConfetti'
import { SIGNS } from '../data/signs'
import { ME, profileById } from '../data/profiles'
import { pronoun } from '../components/deck/fx'
import { session } from '../lib/session'
import { sfx } from '../lib/sfx'
import { betaFlow } from '../lib/betaFlow'

const W = 164
const H = (TC_H / TC_W) * W
/** when each beat lands, ms: the cards lean in, flip, then the words arrive */
const AT = { lean: 1100, flip: 1750, settle: 2700 }

const side: React.CSSProperties = { position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }

/**
 * The match moment (beta): your card and theirs arrive face down, side by
 * side, and flip together. Then what their card says you align on. No badge,
 * no lights, no number: just the two cards.
 */
export default function BetaMatch({ go }: ScreenProps) {
  // whoever aligned back last (Juniper in the scripted demo)
  const [them] = useState(() => profileById(session.get().matchWith) ?? profileById('j27')!)
  const theirs = SIGNS[them.sign], mine = SIGNS[ME.sign]
  const pr = pronoun(them)
  const align = them.reading.find((r) => r.kind === 'align')?.text
  // arriving here from the slow reveal's countdown, the words are about the reveal
  const [afterClock] = useState(() => betaFlow.get().with === them.id && betaFlow.get().stage === 'revealed')
  const [stage, setStage] = useState(0) // 0 arrive · 1 lean · 2 flipped · 3 settled
  const timers = useRef<number[]>([])
  const fired = useRef(false)
  const { canvasRef, fire } = useConfetti()

  useEffect(() => { session.patch({ unseenMatch: true }) }, [])

  const flip = useCallback(() => {
    if (fired.current) return
    fired.current = true
    setStage(2)
    sfx.match()
    fire({ x: 0.5, y: 0.36, power: 1 })
  }, [fire])

  useEffect(() => {
    sfx.reveal()
    const t = timers.current
    t.push(window.setTimeout(() => setStage((s) => Math.max(s, 1)), AT.lean))
    t.push(window.setTimeout(flip, AT.flip))
    t.push(window.setTimeout(() => setStage(3), AT.settle))
    return () => t.forEach(clearTimeout)
  }, [flip])

  /** tap anywhere to skip to the end */
  const skip = () => { if (stage < 3) { timers.current.forEach(clearTimeout); flip(); setStage(3) } }
  const toChat = () => { sfx.tap(); if (them.id === 'j27') go('chat'); else { session.patch({ threadWith: them.id }); go('thread') } }

  const flipped = stage >= 2
  const settled = stage >= 3
  const rise = (delay: number) => ({
    initial: false as const,
    animate: { opacity: settled ? 1 : 0, y: settled ? 0 : 14 },
    transition: { delay: settled ? delay : 0, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const },
  })

  const card = (who: 'me' | 'them') => {
    const left = who === 'me'
    const data = left
      ? { name: ME.name, age: ME.age, sign: ME.sign, img: ME.photo, serial: ME.serial, moon: ME.moon }
      : { name: them.name, age: them.age, sign: them.sign, img: them.photo ?? theirs.auraImg, serial: them.serial, moon: them.moon }
    const dir = left ? -1 : 1
    return (
      <motion.div
        initial={{ x: dir * 260, rotate: dir * 18, opacity: 0 }}
        animate={{ x: dir * (stage === 1 ? 74 : 88), rotate: dir * (stage === 1 ? 2 : 5), opacity: 1, y: flipped ? 0 : [0, -6, 0] }}
        transition={{ x: { type: 'spring', stiffness: 120, damping: 16 }, rotate: { type: 'spring', stiffness: 120, damping: 16 }, y: flipped ? { duration: 0.3 } : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 0.4 } }}
        style={{ position: 'absolute', left: '50%', top: 0, width: W, height: H, marginLeft: -W / 2, perspective: 900 }}>
        <motion.div animate={{ rotateY: flipped ? 180 : 0, scale: flipped ? [1, 1.08, 1] : 1 }} transition={{ duration: 0.7, ease: [0.3, 0.7, 0.2, 1] }}
          style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}>
          <div style={side}><TradeCardBack width={W} /></div>
          <div style={{ ...side, transform: 'rotateY(180deg)' }}><TradeCard card={data} width={W} /></div>
        </motion.div>
        <div className="mono" style={{ position: 'absolute', left: 0, right: 0, top: H + 12, textAlign: 'center', fontSize: 9.5, letterSpacing: '0.2em', color: left ? mine.light : theirs.light }}>
          {left ? 'YOU' : them.name.toUpperCase()}
        </div>
      </motion.div>
    )
  }

  return (
    <div onClick={skip} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora="#4a2a9a" warm="#5a2a6a" count={80} seed={21} />
      <RevealStyles />
      {/* the two signs' colours meet behind the cards */}
      <motion.div animate={{ opacity: flipped ? 0.9 : 0.35 }} transition={{ duration: 0.8 }} style={{
        position: 'absolute', left: -40, right: -40, top: 150, height: 360, pointerEvents: 'none', filter: 'blur(40px)',
        background: `radial-gradient(40% 50% at 30% 50%, ${mine.color}88, transparent 70%), radial-gradient(40% 50% at 70% 50%, ${theirs.color}88, transparent 70%)`,
      }} />

      <motion.div className="mono" animate={{ opacity: flipped ? 0 : 1 }}
        style={{ position: 'absolute', top: 104, left: 0, right: 0, textAlign: 'center', fontSize: 10, letterSpacing: '0.24em', color: 'var(--label-2)' }}>
        {afterClock ? '33:33 IS UP · TWO CARDS, FACE DOWN' : 'TWO CARDS · BOTH SAID YES'}
      </motion.div>
      <motion.div {...rise(0)} className="mono" style={{ position: 'absolute', top: 86, left: 0, right: 0, textAlign: 'center', fontSize: 10, letterSpacing: '0.24em', color: 'var(--align)' }}>
        {afterClock ? '✦ THE REVEAL ✦' : '✦ MUTUAL ALIGN ✦'}
      </motion.div>
      <motion.h1 {...rise(0.05)} className="h-display" style={{ position: 'absolute', top: 106, left: 0, right: 0, textAlign: 'center', fontSize: 38, margin: 0 }}>
        {afterClock ? 'The veil lifts.' : 'You both aligned.'}
      </motion.h1>

      {/* the cards */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 184, height: H + 30 }}>
        {card('me')}
        {card('them')}
      </div>

      {/* what you align on, from their card */}
      {align && (
        <motion.div {...rise(0.15)} style={{ position: 'absolute', left: 30, right: 30, top: 470, textAlign: 'center' }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', fontWeight: 700, color: 'var(--align)' }}>WHERE YOU ALIGN</div>
          <div className="serif italic" style={{ fontSize: 21, lineHeight: 1.3, color: 'var(--label-1)', marginTop: 8 }}>{align}</div>
          <div style={{ fontSize: 13.5, color: 'var(--label-2)', marginTop: 10 }}>
            You can see each other’s photos now.
          </div>
        </motion.div>
      )}

      <motion.div {...rise(0.3)} style={{ position: 'absolute', top: 640, left: 0, right: 0, display: 'flex', justifyContent: 'center', pointerEvents: settled ? 'auto' : 'none' }}>
        <button className="chrome-cta rv-cta" onClick={(e) => { e.stopPropagation(); sfx.tap(); go('reveal') }}>
          See {them.name}’s card <span className="spark">✦</span>
        </button>
      </motion.div>
      <motion.div {...rise(0.4)} style={{ position: 'absolute', top: 712, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, pointerEvents: settled ? 'auto' : 'none' }}>
        <button className="rv-link" onClick={(e) => { e.stopPropagation(); toChat() }} style={{ fontSize: 14.5, padding: '8px 10px', color: 'var(--label-1)' }}>
          {afterClock ? 'Back to the chat ›' : 'Say something ›'}
        </button>
        <button className="rv-link" onClick={(e) => { e.stopPropagation(); sfx.tap(); go('deck') }} style={{ fontSize: 14, padding: '8px 10px' }}>
          Keep dealing — {pr.subj} {pr.subj === 'they' ? 'wait' : 'waits'} in matches
        </button>
      </motion.div>

      <ConfettiCanvas canvasRef={canvasRef} />
    </div>
  )
}
