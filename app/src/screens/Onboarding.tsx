import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import { sfx } from '../lib/sfx'
import { BackChevron, Progress } from '../components/onboarding/shared'
import { DEFAULT_BIRTH, type BirthDate as BD } from '../components/onboarding/zodiac'
import Arrival from '../components/onboarding/Arrival'
import BirthDate from '../components/onboarding/BirthDate'
import BirthSky from '../components/onboarding/BirthSky'
import SignReveal from '../components/onboarding/SignReveal'
import BigThree from '../components/onboarding/BigThree'
import CardRule from '../components/onboarding/CardRule'

const STEPS = ['arrival', 'birth', 'sky', 'reveal', 'three', 'rule'] as const
type Step = typeof STEPS[number]

/** rainbow segments lit per step (O-02 shows none) */
const FILLED: Record<Step, number> = { arrival: 0, birth: 1, sky: 2, reveal: 3, three: 4, rule: 5 }
/** colour of the sky bloom at the top of each frame */
const SKY: Record<Step, string> = {
  arrival: '#6a35c4', birth: '#6a35c4', sky: '#4f7a26', reveal: '#3f8a2a', three: '#8a6e1c', rule: '#6a35c4',
}

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 70, filter: 'blur(6px)' }),
  center: { opacity: 1, x: 0, filter: 'blur(0px)' },
  exit: (dir: number) => ({ opacity: 0, x: dir * -70, filter: 'blur(6px)' }),
}

/** O-02 → O-11: new-user onboarding, one screen with internal steps. */
export default function Onboarding({ go }: ScreenProps) {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const [birth, setBirth] = useState<BD>(DEFAULT_BIRTH)
  // one slot per step, so an exiting step can't clobber the entering one's handler
  const primary = useMemo(() => Object.fromEntries(STEPS.map((s) => [s, { current: null }])) as Record<Step, { current: (() => void) | null }>, [])
  const lock = useRef(0)
  const step = STEPS[i]

  const to = useCallback((n: number) => {
    const now = performance.now()
    if (now - lock.current < 380) return
    lock.current = now
    setDir(n > i ? 1 : -1)
    setI(n)
  }, [i])

  const next = useCallback(() => {
    if (i >= STEPS.length - 1) { sfx.align(); go('founding'); return }
    sfx.align()
    to(i + 1)
  }, [i, go, to])

  const back = useCallback(() => {
    sfx.tap()
    if (i === 0) go('welcome')
    else to(i - 1)
  }, [i, go, to])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === 'Enter' || e.key === 'ArrowRight') {
        e.preventDefault()
        const fn = primary[STEPS[i]].current
        if (fn) fn()
        else next()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        back()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, back, primary, i])

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora={null} warm={null} count={80} seed={5} />
      {/* top sky bloom, tinted per step */}
      <motion.div
        initial={false}
        animate={{ backgroundColor: SKY[step] }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        style={{
          position: 'absolute', left: -60, top: -170, width: 510, height: 400, pointerEvents: 'none', opacity: 0.85,
          WebkitMaskImage: 'radial-gradient(50% 50% at 50% 50%, #000 0%, rgba(0,0,0,0.35) 55%, transparent 100%)',
          maskImage: 'radial-gradient(50% 50% at 50% 50%, #000 0%, rgba(0,0,0,0.35) 55%, transparent 100%)',
        }}
      />
      {/* warm amber bloom at the foot */}
      <div style={{
        position: 'absolute', left: 0, bottom: -110, width: 390, height: 320, pointerEvents: 'none',
        background: 'radial-gradient(50% 50% at 50% 60%, rgba(150, 100, 60, 0.42) 0%, rgba(120, 70, 60, 0.1) 50%, transparent 72%)',
      }} />

      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={step}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.3, 0.7, 0.2, 1] }}
          style={{ position: 'absolute', inset: 0 }}
        >
          {step === 'arrival' && <Arrival next={next} onHaveChart={() => go('welcome')} />}
          {step === 'birth' && <BirthDate birth={birth} setBirth={setBirth} next={next} />}
          {step === 'sky' && <BirthSky birth={birth} next={next} primaryRef={primary.sky} />}
          {step === 'reveal' && <SignReveal birth={birth} next={next} skip={() => to(STEPS.indexOf('rule'))} primaryRef={primary.reveal} />}
          {step === 'three' && <BigThree birth={birth} next={next} />}
          {step === 'rule' && <CardRule next={next} />}
        </motion.div>
      </AnimatePresence>

      {step !== 'arrival' && <Progress filled={FILLED[step]} />}
      <BackChevron onClick={back} />
    </div>
  )
}
