import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import { sfx } from '../lib/sfx'
import { session } from '../lib/session'
import { ME } from '../data/profiles'
import { BackChevron, Progress } from '../components/onboarding/shared'
import { DEFAULT_BIRTH, ageOn, sunSign, type BirthDate as BD } from '../components/onboarding/zodiac'
import { DEALBREAKERS, DEFAULT_DEALBREAKERS, DEFAULT_TIME, risingFor, timeLabel, type BirthTime as BT } from '../components/onboarding/readings'
import Arrival from '../components/onboarding/Arrival'
import BirthDate from '../components/onboarding/BirthDate'
import AgeGate from '../components/onboarding/AgeGate'
import BirthTime from '../components/onboarding/BirthTime'
import BirthSky from '../components/onboarding/BirthSky'
import SignReveal from '../components/onboarding/SignReveal'
import UserManual from '../components/onboarding/UserManual'
import BigThree from '../components/onboarding/BigThree'
import ChartCheck from '../components/onboarding/ChartCheck'
import VenusHeart from '../components/onboarding/VenusHeart'
import ElementWeather from '../components/onboarding/ElementWeather'
import CardRule from '../components/onboarding/CardRule'
import Dealbreakers, { type Pick } from '../components/onboarding/Dealbreakers'
import FaceLast from '../components/onboarding/FaceLast'
import TheField from '../components/onboarding/TheField'
import Resume from '../components/onboarding/Resume'

const STEPS = [
  'arrival', 'birth', 'time', 'sky', 'reveal', 'manual', 'three', 'check',
  'venus', 'element', 'rule', 'deal', 'photos', 'field',
] as const
type Step = typeof STEPS[number]
/** off-path screens: the 18+ gate and the "saved your place" welcome-back */
type Aside = 'age' | 'resume' | null

/** rainbow segments lit per step (arrival shows none) */
const FILLED: Record<Step, number> = {
  arrival: 0, birth: 1, time: 1, sky: 2, reveal: 2, manual: 2, three: 3, check: 3,
  venus: 3, element: 4, rule: 4, deal: 5, photos: 6, field: 6,
}
/** colour of the sky bloom at the top of each frame */
const SKY: Record<Step | 'age' | 'resume', string> = {
  arrival: '#6a35c4', birth: '#6a35c4', time: '#5a2fb0', sky: '#4f7a26', reveal: '#3f8a2a', manual: '#3a2a80',
  three: '#8a6e1c', check: '#6a35c4', venus: '#8a2a5a', element: '#4f7a26', rule: '#6a35c4', deal: '#5a2fb0',
  photos: '#6a35c4', field: '#5a2fb0', age: '#3a2a80', resume: '#6a35c4',
}

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 70, filter: 'blur(6px)' }),
  center: { opacity: 1, x: 0, filter: 'blur(0px)' },
  exit: (dir: number) => ({ opacity: 0, x: dir * -70, filter: 'blur(6px)' }),
}

const DEFAULT_PICKS: Pick[] = DEALBREAKERS.filter((d) => DEFAULT_DEALBREAKERS.includes(d.id))

/** O-02 → O-13: new-user onboarding, one screen with internal steps. */
export default function Onboarding({ go }: ScreenProps) {
  const saved = session.get().obStep
  const [i, setI] = useState(0)
  const [aside, setAside] = useState<Aside>(saved >= 2 && saved < STEPS.length ? 'resume' : null)
  const [dir, setDir] = useState(1)
  const [birth, setBirth] = useState<BD>(DEFAULT_BIRTH)
  const [time, setTime] = useState<BT>(DEFAULT_TIME)
  const [picks, setPicks] = useState<Pick[]>(DEFAULT_PICKS)
  /** editing a fact from the chart check: the next Continue goes straight back to it */
  const [fixing, setFixing] = useState(false)
  // one slot per step, so an exiting step can't clobber the entering one's handler
  const primary = useMemo(() => Object.fromEntries(STEPS.map((s) => [s, { current: null }])) as Record<Step, { current: (() => void) | null }>, [])
  const lock = useRef(0)
  const step = STEPS[i]
  const view: Step | 'age' | 'resume' = aside ?? step

  const sun = sunSign(birth)
  const moon = ME.moon
  const rising = risingFor(sun, time)

  // remember where the presenter left off, for the "saved your place" screen
  useEffect(() => { if (!aside) session.patch({ obStep: i }) }, [i, aside])

  const to = useCallback((n: number) => {
    const now = performance.now()
    if (now - lock.current < 380) return
    lock.current = now
    setDir(n > i ? 1 : -1)
    setAside(null)
    setI(n)
  }, [i])

  const next = useCallback(() => {
    if (step === 'birth' && ageOn(birth) < 18) { sfx.release(); setDir(1); setAside('age'); return }
    if (fixing && (step === 'birth' || step === 'time')) { sfx.align(); setFixing(false); to(STEPS.indexOf('check')); return }
    if (i >= STEPS.length - 1) { sfx.align(); session.patch({ obStep: 0 }); go('founding'); return }
    sfx.align()
    to(i + 1)
  }, [i, go, to, step, birth, fixing])

  const back = useCallback(() => {
    sfx.tap()
    if (aside === 'age') { setDir(-1); setAside(null); return }
    if (aside === 'resume' || i === 0) go('welcome')
    else to(i - 1)
  }, [i, go, to, aside])

  const resume = useCallback(() => { sfx.align(); setDir(1); setAside(null); setI(saved) }, [saved])
  const restart = useCallback(() => { setDir(-1); setAside(null); setI(0); session.patch({ obStep: 0 }) }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === 'Enter' || e.key === 'ArrowRight') {
        e.preventDefault()
        if (aside === 'resume') return resume()
        if (aside === 'age') return back()
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
  }, [next, back, resume, primary, i, aside])

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora={null} warm={null} count={80} seed={5} />
      {/* top sky bloom, tinted per step */}
      <motion.div
        initial={false}
        animate={{ backgroundColor: SKY[view] }}
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
          key={view}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.3, 0.7, 0.2, 1] }}
          style={{ position: 'absolute', inset: 0 }}
        >
          {view === 'resume' && <Resume sun={sun} step={FILLED[STEPS[saved]] ?? 1} of={6} resume={resume} restart={restart} />}
          {view === 'age' && <AgeGate back={back} />}
          {view === 'arrival' && <Arrival next={next} onHaveChart={() => go('welcome')} />}
          {view === 'birth' && <BirthDate birth={birth} setBirth={setBirth} next={next} />}
          {view === 'time' && <BirthTime birth={birth} time={time} setTime={setTime} next={next} />}
          {view === 'sky' && <BirthSky birth={birth} time={timeLabel(time)} next={next} primaryRef={primary.sky} />}
          {view === 'reveal' && <SignReveal birth={birth} next={next} skip={() => to(STEPS.indexOf('rule'))} primaryRef={primary.reveal} />}
          {view === 'manual' && <UserManual sun={sun} next={next} />}
          {view === 'three' && <BigThree birth={birth} rising={rising} next={next} />}
          {view === 'check' && <ChartCheck birth={birth} time={time} sun={sun} moon={moon} rising={rising} next={next}
            edit={(what) => { setFixing(true); to(STEPS.indexOf(what === 'date' ? 'birth' : 'time')) }} />}
          {view === 'venus' && <VenusHeart sun={sun} venus={ME.venus} next={next} />}
          {view === 'element' && <ElementWeather sun={sun} next={next} />}
          {view === 'rule' && <CardRule next={next} />}
          {view === 'deal' && <Dealbreakers picked={picks} setPicked={setPicks} next={next} />}
          {view === 'photos' && <FaceLast sun={sun} moon={moon} rising={rising} dealbreakers={picks.map((p) => p.card).join('. ') + (picks.length ? '.' : '')} next={next} />}
          {view === 'field' && <TheField next={next} />}
        </motion.div>
      </AnimatePresence>

      {view !== 'arrival' && view !== 'age' && <Progress filled={view === 'resume' ? FILLED[STEPS[saved]] ?? 1 : FILLED[view]} />}
      <BackChevron onClick={back} />
    </div>
  )
}
