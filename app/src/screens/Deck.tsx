import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { talk } from '../lib/talk'
import {
  AnimatePresence, animate, motion, useAnimationControls, useMotionValue, useTransform,
  type AnimationPlaybackControls, type MotionValue,
} from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import TabBar from '../components/TabBar'
import { COMETS, PEEKS_PER_NIGHT, TONIGHT, type Profile } from '../data/profiles'
import { buildSeq, peopleLeft, FREE_PEOPLE, PEOPLE_PER_DRAW, type Slot } from '../data/draws'
import EventCard from '../components/deck/EventCard'
import { SIGNS } from '../data/signs'
import { sfx } from '../lib/sfx'
import { api as backend, useWorld } from '../api'
import { session, useSession } from '../lib/session'
import ProfileCard, { type PeekState } from '../components/deck/ProfileCard'
import ExpandSheet from '../components/deck/ExpandSheet'
import { DeckHeader, Counter, Unlimited, StatusText, StackBacks, SwipeLabels } from '../components/deck/DeckChrome'
import { CARD_W, CARD_H, CARD_SCALE, CARD_TOP, CARD_CY, ELEMENT_SKY, starBurst, resetBurst, pronoun } from '../components/deck/fx'

type Phase = 'idle' | 'charging' | 'open' | 'sealing'
type Dir = 1 | -1

const SW = CARD_W * CARD_SCALE
const SH = CARD_H * CARD_SCALE
const SLEFT = 195 - SW / 2
const FLY_THRESHOLD = 105
const PEEK_SECONDS = 3

const PEEK_OF: Record<Phase, PeekState> = { idle: 'none', charging: 'charging', open: 'open', sealing: 'sealing' }

interface TopHandle { fly: (dir: Dir) => void; shake: () => void }

interface TopProps {
  slot: Slot
  /** total draws tonight, or null when endless (Align+) */
  drawsOf: number | null
  dragX: MotionValue<number>
  holdP: MotionValue<number>
  phase: Phase
  ringText?: string
  first: boolean
  hidden: boolean
  locked: boolean
  onFlyStart: (dir: Dir) => void
  onSwiped: (dir: Dir) => void
  onTap: () => void
  onHoldBegin: () => void
  onHoldAbort: () => void
  onPeekEnd: () => void
}

/** The draggable top card. Owns its own motion values so the next card mounts clean. */
const TopCard = forwardRef<TopHandle, TopProps>(function TopCard(p, ref) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-320, 0, 320], [-20, 0, 20])
  const alignO = useTransform(x, [16, FLY_THRESHOLD], [0, 1])
  const releaseO = useTransform(x, [-FLY_THRESHOLD, -16], [1, 0])
  const alignTint = useTransform(alignO, (v) => v * 0.5)
  const releaseDim = useTransform(releaseO, (v) => v * 0.5)
  const alignStampScale = useTransform(alignO, [0, 1], [1.6, 1])
  const releaseStampScale = useTransform(releaseO, [0, 1], [1.6, 1])
  const shake = useAnimationControls()
  const flying = useRef(false)
  const g = useRef({ down: false, sx: 0, sy: 0, t: 0, moved: false, scale: 1, holdStarted: false, timer: 0, samples: [] as { x: number; t: number }[] })

  const { dragX } = p
  useEffect(() => x.on('change', (v) => dragX.set(v)), [x, dragX])

  const fly = useCallback((dir: Dir, fast = false) => {
    if (flying.current) return
    flying.current = true
    p.onFlyStart(dir)
    const d = fast ? 0.3 : 0.42
    animate(y, y.get() + (dir > 0 ? -70 : 30), { duration: d, ease: 'easeOut' })
    animate(x, dir * 560, { duration: d, ease: [0.25, 0.6, 0.35, 1], onComplete: () => p.onSwiped(dir) })
  }, [p, x, y])

  useImperativeHandle(ref, () => ({
    fly: (dir: Dir) => fly(dir),
    shake: () => { void shake.start({ x: [0, -14, 12, -9, 6, -3, 0], transition: { duration: 0.45 } }) },
  }), [fly, shake])

  const onPointerDown = (e: React.PointerEvent) => {
    if (flying.current || p.locked) return
    e.currentTarget.setPointerCapture(e.pointerId)
    const phone = document.getElementById('phone')
    const scale = phone ? phone.getBoundingClientRect().width / 390 : 1
    window.clearTimeout(g.current.timer)
    g.current = { down: true, sx: e.clientX, sy: e.clientY, t: performance.now(), moved: false, scale, holdStarted: false, timer: 0, samples: [] }
    g.current.timer = window.setTimeout(() => {
      if (g.current.down && !g.current.moved) { g.current.holdStarted = true; p.onHoldBegin() }
    }, 170)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const s = g.current
    if (!s.down || flying.current) return
    const dx = (e.clientX - s.sx) / s.scale
    const dy = (e.clientY - s.sy) / s.scale
    if (!s.moved) {
      if (Math.hypot(dx, dy) < 9) return
      if (p.phase === 'open' || p.phase === 'sealing') return
      s.moved = true
      window.clearTimeout(s.timer)
      if (s.holdStarted) { s.holdStarted = false; p.onHoldAbort() }
    }
    x.set(dx)
    y.set(dy * 0.35)
    const t = performance.now()
    s.samples.push({ x: dx, t })
    while (s.samples.length > 2 && t - s.samples[0].t > 90) s.samples.shift()
  }

  const finish = (allowTap: boolean) => {
    const s = g.current
    if (!s.down) return
    s.down = false
    window.clearTimeout(s.timer)
    if (s.moved) {
      const a = s.samples[0]
      const b = s.samples[s.samples.length - 1]
      const vx = a && b && b.t > a.t ? (b.x - a.x) / (b.t - a.t) : 0 // px/ms
      const cx = x.get()
      if (cx > FLY_THRESHOLD || (vx > 0.55 && cx > 30)) fly(1, vx > 0.9)
      else if (cx < -FLY_THRESHOLD || (vx < -0.55 && cx < -30)) fly(-1, vx < -0.9)
      else {
        animate(x, 0, { type: 'spring', stiffness: 520, damping: 26 })
        animate(y, 0, { type: 'spring', stiffness: 520, damping: 26 })
      }
      return
    }
    if (p.phase === 'open') p.onPeekEnd()
    else if (p.phase === 'charging') p.onHoldAbort()
    else if (allowTap && !s.holdStarted && performance.now() - s.t < 260) p.onTap()
  }

  return (
    <motion.div
      initial={p.first ? false : { scale: 0.965, y: 9, rotate: -1.2 }}
      animate={{ scale: 1, y: 0, rotate: 0, opacity: p.hidden ? 0 : 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 17, opacity: { duration: 0.15 } }}
      style={{ position: 'absolute', left: SLEFT, top: CARD_TOP, width: SW, height: SH, zIndex: 10 }}
    >
      <motion.div animate={shake} style={{ width: '100%', height: '100%' }}>
        <motion.div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={() => finish(true)}
          onPointerCancel={() => finish(false)}
          animate={{ scale: p.phase === 'charging' ? 0.97 : p.phase === 'open' ? 1.02 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          style={{ x, y, rotate, width: '100%', height: '100%', cursor: 'grab', touchAction: 'none', position: 'relative', willChange: 'transform' }}
        >
          {/* gold aura behind the card when leaning toward ALIGN */}
          <motion.div style={{
            position: 'absolute', inset: -4, borderRadius: 24, opacity: alignO,
            boxShadow: '0 0 40px 8px rgba(242,199,92,0.55), 0 0 90px 20px rgba(242,199,92,0.25)',
          }} />
          <div style={{ width: CARD_W, height: CARD_H, transform: `scale(${CARD_SCALE})`, transformOrigin: 'top left' }}>
            {p.slot.kind === 'person'
              ? <ProfileCard profile={p.slot.profile} peek={PEEK_OF[p.phase]} ring={p.holdP} ringText={p.ringText} />
              : <EventCard event={p.slot.event} draw={p.slot.draw + 1} of={p.drawsOf} />}
          </div>
          {/* tints */}
          <motion.div style={{
            position: 'absolute', inset: 0, borderRadius: 19, pointerEvents: 'none', opacity: alignTint, mixBlendMode: 'screen',
            background: 'radial-gradient(90% 70% at 70% 35%, rgba(255,228,150,0.9), rgba(242,199,92,0.35) 50%, rgba(242,199,92,0.1) 100%)',
          }} />
          <motion.div style={{ position: 'absolute', inset: 0, borderRadius: 19, pointerEvents: 'none', opacity: releaseDim, background: '#0b0620' }} />
          {/* arrival sheen */}
          {!p.first && (
            <div style={{ position: 'absolute', inset: 0, borderRadius: 19, overflow: 'hidden', pointerEvents: 'none' }}>
              <motion.div initial={{ x: '-130%' }} animate={{ x: '130%' }} transition={{ duration: 0.9, delay: 0.1, ease: 'easeInOut' }}
                style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.16) 48%, rgba(255,240,210,0.22) 52%, transparent 70%)' }} />
            </div>
          )}
          {/* stamps */}
          <motion.div style={{
            position: 'absolute', left: 22, top: 84, rotate: -14, opacity: alignO, scale: alignStampScale, pointerEvents: 'none',
            padding: '2px 16px 4px', borderRadius: 12, border: '3px solid #f2c75c',
            boxShadow: '0 0 24px rgba(242,199,92,0.7), inset 0 0 14px rgba(242,199,92,0.4)', background: 'rgba(20,10,46,0.35)',
          }}>
            <span className="serif italic" style={{
              fontSize: 50, fontWeight: 600, lineHeight: 1, letterSpacing: '0.02em',
              background: 'var(--gold-foil)', backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
              animation: 'foil-sweep 2.4s linear infinite', display: 'inline-block',
            }}>{p.slot.kind === 'event' ? 'Play ✦' : 'Align ✦'}</span>
          </motion.div>
          <motion.div style={{
            position: 'absolute', right: 22, top: 84, rotate: 14, opacity: releaseO, scale: releaseStampScale, pointerEvents: 'none',
            padding: '4px 14px', borderRadius: 12, border: '2.5px solid #b3a6c4', background: 'rgba(11,6,32,0.45)',
          }}>
            <span className="mono" style={{ fontSize: p.slot.kind === 'event' ? 19 : 26, letterSpacing: '0.16em', color: '#d8cfe6', fontWeight: 700, whiteSpace: 'nowrap' }}>{p.slot.kind === 'event' ? 'BACK TO DECK' : 'RELEASE'}</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
})

function UnderCard({ slot, drawsOf, dragX }: { slot: Slot; drawsOf: number | null; dragX: MotionValue<number> }) {
  const mag = useTransform(dragX, (v) => Math.min(Math.abs(v) / 200, 1))
  const scale = useTransform(mag, [0, 1], [0.93, 0.97])
  const y = useTransform(mag, [0, 1], [14, 6])
  const dim = useTransform(mag, [0, 1], [0.6, 0.15])
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
      style={{ position: 'absolute', left: SLEFT, top: CARD_TOP, width: SW, height: SH, scale, y, zIndex: 5, pointerEvents: 'none' }}>
      <div style={{ width: CARD_W, height: CARD_H, transform: `scale(${CARD_SCALE})`, transformOrigin: 'top left' }}>
        {slot.kind === 'person' ? <ProfileCard profile={slot.profile} glow={false} /> : <EventCard event={slot.event} draw={slot.draw + 1} of={drawsOf} glow={false} />}
      </div>
      <motion.div style={{ position: 'absolute', inset: 0, borderRadius: 19, background: '#0b0620', opacity: dim }} />
    </motion.div>
  )
}

/** how many cards later an event you put back comes around again */
const BACK_IN = 3

interface Pop { id: number; kind: 'align' | 'release' | 'deny'; streak: number }

/** tonight's deal, minus any sun signs blocked under Align+ */
const dealt = (): Profile[] => TONIGHT.filter((p) => !session.get().blockedSigns.includes(p.sign))

export default function Deck({ go }: ScreenProps) {
  const [people] = useState(dealt)
  // resume where the presenter left the deck (session survives tab hops; reset on demo restart)
  const [index, setIndex] = useState(() => session.get().deckIndex)
  const [peeks, setPeeks] = useState(() => Math.max(0, PEEKS_PER_NIGHT + session.get().bonusPeeks - session.get().peeksUsed))
  const { alignPlus, inserts } = useSession()
  const seq = useMemo(() => buildSeq(people, alignPlus, inserts), [people, alignPlus, inserts])
  const seqRef = useRef(seq)
  seqRef.current = seq
  const drawsOf = alignPlus ? null : Math.ceil(Math.min(people.length, FREE_PEOPLE) / PEOPLE_PER_DRAW)
  const [phase, setPhaseState] = useState<Phase>('idle')
  const [secs, setSecs] = useState(PEEK_SECONDS)
  const [expanded, setExpanded] = useState(false)
  const [pops, setPops] = useState<Pop[]>([])
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null)
  const [starPulse, setStarPulse] = useState(0)
  const [status, setStatus] = useState<string | null>(null)
  const [flash, setFlash] = useState(false)
  const [first, setFirst] = useState(true)
  const [busy, setBusy] = useState(false)
  const [matching, setMatching] = useState(false)
  const [upsell, setUpsell] = useState(false)

  const phaseRef = useRef<Phase>('idle')
  const streakRef = useRef(0)
  const holdAnim = useRef<AnimationPlaybackControls | null>(null)
  const timers = useRef<number[]>([])
  const peekInterval = useRef(0)
  const topRef = useRef<TopHandle>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dragX = useMotionValue(0)
  const holdP = useMotionValue(0)

  // real people (published from their own phones) go first; swiping them
  // doesn't move tonight's deal, so the saved deck position stays valid
  const world = useWorld()
  const { blockedSigns, blockedPeople } = useSession()
  const realQueue = world.people.filter((p) => p.real && !world.swipes[p.id] && !world.matches.includes(p.id)
    && !blockedSigns.includes(p.sign) && !blockedPeople.includes(p.id))
  const asSlot = (p: Profile | undefined, at: Slot | undefined): Slot | undefined =>
    p && { kind: 'person', profile: p, draw: at?.draw ?? 0, pos: at?.kind === 'person' ? at.pos : 0, key: `real-${p.id}` }
  const realSlot = asSlot(realQueue[0], seq[index])
  const slot: Slot | undefined = realSlot ?? seq[index]
  const nextSlot: Slot | undefined = realSlot ? (asSlot(realQueue[1], seq[index]) ?? seq[index]) : seq[index + 1]
  const profile: Profile | undefined = slot?.kind === 'person' ? slot.profile : undefined
  const cardsLeft = peopleLeft(seq, index)
  const sign = profile ? SIGNS[profile.sign] : SIGNS.leo

  const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)) }
  const setPhase = (ph: Phase) => { phaseRef.current = ph; setPhaseState(ph) }

  // deck already played through this session → straight to the spent screen
  useEffect(() => { if (!seqRef.current[session.get().deckIndex] && !realQueue.length) go('spent') }, [go]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => {
    timers.current.forEach(clearTimeout)
    window.clearInterval(peekInterval.current)
    holdAnim.current?.stop()
    resetBurst()
  }, [])

  // swipe label reactions
  const alignLabelScale = useTransform(dragX, [0, 140], [1, 1.4], { clamp: true })
  const alignLabelColor = useTransform(dragX, [0, 120], ['#b3a6c4', '#f2c75c'])
  const releaseLabelScale = useTransform(dragX, [-140, 0], [1.4, 1], { clamp: true })
  const releaseLabelColor = useTransform(dragX, [-120, 0], ['#efe6d6', '#b3a6c4'])
  const alignGlow = useTransform(dragX, [0, 120], ['0 0 0px rgba(242,199,92,0)', '0 0 12px rgba(242,199,92,0.9)'])

  const showToast = (text: string, ms = 1800) => {
    const id = Date.now()
    setToast({ id, text })
    later(() => setToast((t) => (t && t.id === id ? null : t)), ms)
  }
  const pop = (kind: Pop['kind'], streak = 0) => {
    const id = Date.now() + Math.random()
    setPops((ps) => [...ps, { id, kind, streak }])
    later(() => setPops((ps) => ps.filter((x) => x.id !== id)), 1400)
  }

  /* ---------- peek ---------- */
  const endPeek = () => {
    if (phaseRef.current !== 'open' && phaseRef.current !== 'charging') return
    window.clearInterval(peekInterval.current)
    holdAnim.current?.stop()
    animate(holdP, 0, { duration: 0.3 })
    setPhase('sealing')
    setStatus('THE PHOTO IS CLOSING')
    sfx.flip()
    later(() => { if (phaseRef.current === 'sealing') { setPhase('idle'); setStatus(null) } }, 1150)
  }

  const openPeek = () => {
    if (phaseRef.current !== 'charging') return
    setPhase('open')
    if (!alignPlus) {
      setPeeks((n) => n - 1)
      session.patch({ peeksUsed: session.get().peeksUsed + 1 })
    }
    setSecs(PEEK_SECONDS)
    sfx.sparkle()
    holdP.set(1)
    holdAnim.current = animate(holdP, 0, { duration: PEEK_SECONDS, ease: 'linear' })
    let s = PEEK_SECONDS
    window.clearInterval(peekInterval.current)
    peekInterval.current = window.setInterval(() => {
      s -= 1
      if (s <= 0) { window.clearInterval(peekInterval.current); endPeek(); return }
      setSecs(s)
      sfx.peekTick(1 - s / PEEK_SECONDS)
    }, 1000)
  }

  const beginHold = () => {
    if (phaseRef.current !== 'idle' || busy || expanded || !profile) return
    if (peeks <= 0 && !alignPlus) {
      sfx.deny()
      topRef.current?.shake()
      if (!session.get().peekUpsellSeen) { session.patch({ peekUpsellSeen: true }); later(() => setUpsell(true), 380); return }
      showToast('No peeks left tonight · more at 11:11', 1600)
      return
    }
    setPhase('charging')
    holdP.set(0)
    let last = -1
    holdAnim.current?.stop()
    holdAnim.current = animate(holdP, 1, {
      duration: 0.6, ease: 'linear',
      onUpdate: (v) => { if (v - last >= 0.15) { last = v; sfx.peekTick(v) } },
      onComplete: openPeek,
    })
  }

  const abortHold = () => {
    if (phaseRef.current !== 'charging') return
    holdAnim.current?.stop()
    animate(holdP, 0, { duration: 0.2 })
    setPhase('idle')
  }

  /* ---------- swipe ---------- */
  const nameOf = (id: string) => [...TONIGHT, ...COMETS].find((x) => x.id === id)?.name ?? 'They'

  /** play the event card at the current index */
  const playEvent = (ev: Extract<Slot, { kind: 'event' }>) => {
    const s = session.get()
    const reinserted = new Set(s.inserts.flatMap((i) => i.ids))
    const released = [...new Set(s.released)].filter((id) => !reinserted.has(id))
    starBurst(canvasRef.current, 195, CARD_CY - 40, 1.2)
    sfx.sparkle()
    if (ev.event.id === 'second-look') {
      const back = released[released.length - 1]
      if (back) {
        session.patch({ inserts: [...s.inserts, { after: index, ids: [back] }] })
        later(() => showToast(`${nameOf(back)} is back for a second look`, 2200), 250)
      } else later(() => showToast('Nobody to bring back yet — you kept everyone', 2200), 250)
    } else if (ev.event.id === 'moon-peek') {
      if (alignPlus) later(() => showToast('Peeks are already unlimited · Align+', 2000), 250)
      else {
        session.patch({ bonusPeeks: s.bonusPeeks + 1 })
        setPeeks((n) => n + 1)
        later(() => showToast('+1 peek tonight', 1800), 250)
      }
    } else if (ev.event.id === 'comet') {
      const dealtIds = new Set(s.inserts.flatMap((i) => i.ids))
      const c = COMETS.find((x) => !dealtIds.has(x.id) && !s.blockedSigns.includes(x.sign))
      if (c) {
        session.patch({ inserts: [...s.inserts, { after: index, ids: [c.id] }] })
        later(() => showToast(`A comet crosses: ${c.name}, ${c.age}`, 2200), 250)
      } else later(() => showToast('The comet passed quietly tonight', 1800), 250)
    } else if (ev.event.id === 'spotlight') {
      later(() => showToast('Your card moves to the top of three decks tonight', 2400), 250)
    } else {
      const pool = [...released]
      for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]] }
      const ids = pool.slice(0, PEOPLE_PER_DRAW)
      if (ids.length) {
        sfx.match()
        session.patch({ inserts: [...s.inserts, { after: index, ids }] })
        later(() => showToast(`Mulligan · ${ids.length} ${ids.length === 1 ? 'card' : 'cards'} shuffled back in`, 2200), 250)
      } else later(() => showToast('Clean hand — nothing to redraw', 2000), 250)
    }
  }

  const onFlyStart = (dir: Dir) => {
    if (slot?.kind === 'event') {
      setBusy(true)
      session.patch({ deckIndex: index + 1 })
      if (dir > 0) playEvent(slot)
      else {
        // back to the deck: it comes around again a few cards from now
        const s = session.get()
        const live = seqRef.current
        const after = Math.min(index + BACK_IN, live.length - 1)
        session.patch({ inserts: [...s.inserts, { after, ids: [`event:${slot.event.id}`] }] })
        sfx.flip()
        const gap = after - index
        later(() => showToast(gap > 0 ? `${slot.event.title} is back in the deck · it returns in ${gap} ${gap === 1 ? 'card' : 'cards'}` : `${slot.event.title} is back in the deck`, 2200), 200)
      }
      return
    }
    if (!profile) return
    setBusy(true)
    if (profile.real) {
      // a real person: the match is only known once the server answers (see onSwiped)
      if (dir > 0) { sfx.align(); setStarPulse((n) => n + 1); starBurst(canvasRef.current, 310, CARD_CY - 30, 1); pop('align', ++streakRef.current) }
      else { sfx.release(); streakRef.current = 0; pop('release') }
      return
    }
    session.patch({ deckIndex: index + 1 })
    // the match animation can't wait on the network: the card data says who aligns back,
    // and the backend records the swipe (and, on Supabase, decides the match itself)
    void backend.swipe(profile.id, dir > 0 ? 'align' : 'release')
    if (dir > 0) {
      sfx.align()
      setStarPulse((n) => n + 1)
      if (profile.alignsBack) {
        setMatching(true)
        starBurst(canvasRef.current, 300, CARD_CY - 40, 1.8)
        later(() => starBurst(canvasRef.current, 195, 380, 1.4), 160)
        later(() => { setFlash(true); sfx.sparkle() }, 140)
        later(() => go('match'), 760)
        return
      }
      streakRef.current += 1
      starBurst(canvasRef.current, 310, CARD_CY - 30, 1)
      pop('align', streakRef.current)
      later(() => showToast(`Aligned — ${pronoun(profile).subj}’ll see your card tonight`), 250)
    } else {
      sfx.release()
      streakRef.current = 0
      pop('release')
      session.patch({ released: [...session.get().released, profile.id] })
    }
  }

  const onSwiped = (dir: Dir) => {
    if (dir > 0 && profile?.alignsBack) return
    dragX.set(0)
    if (profile?.real) {
      const who = profile
      setBusy(false)
      void backend.swipe(who.id, dir > 0 ? 'align' : 'release').then(({ matched }) => {
        if (matched) {
          sfx.sparkle()
          session.patch({ unseenMatch: true })
          talk.grantOnce(`match:${who.id}`, 'starter')
          showToast(`It’s mutual — you and ${who.name} aligned. Say hi in Matches.`, 3200)
        } else if (dir > 0) {
          showToast(`Aligned — ${who.name} sees your card next`)
        }
      })
      return
    }
    // read the live sequence: an event may have just added cards after this one
    if (!seqRef.current[index + 1]) {
      setIndex((i) => i + 1)
      later(() => go('spent'), 450)
      return
    }
    setFirst(false)
    setIndex((i) => i + 1)
    setBusy(false)
    setStatus('READING THE STARS…')
    later(() => setStatus((s) => (s === 'READING THE STARS…' ? null : s)), 1000)
  }

  const openExpand = () => {
    if (busy || phaseRef.current !== 'idle') return
    if (slot?.kind === 'event') { topRef.current?.fly(1); return }
    sfx.tap()
    setExpanded(true)
  }
  const fromExpand = (dir: Dir) => {
    setExpanded(false)
    later(() => topRef.current?.fly(dir), 320)
  }

  // keyboard (for clean screen recordings)
  const api = useRef({ beginHold, abortHold, endPeek, openExpand, fromExpand, expanded })
  api.current = { beginHold, abortHold, endPeek, openExpand, fromExpand, expanded }
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const a = api.current
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const dir: Dir = e.key === 'ArrowRight' ? 1 : -1
        if (a.expanded) a.fromExpand(dir)
        else if (phaseRef.current === 'idle') topRef.current?.fly(dir)
      } else if (e.key === ' ') {
        e.preventDefault()
        if (!e.repeat) a.beginHold()
      } else if (e.key === 'Enter' || e.key === 'ArrowUp') {
        if (!a.expanded) a.openExpand()
      } else if (e.key === 'Escape' || e.key === 'ArrowDown') {
        if (a.expanded) { sfx.tap(); setExpanded(false) }
      }
    }
    const up = (e: KeyboardEvent) => {
      if (e.key !== ' ') return
      if (phaseRef.current === 'charging') api.current.abortHold()
      else if (phaseRef.current === 'open') api.current.endPeek()
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
  }, [])

  const peekOpen = phase === 'open'
  const peekUI = phase === 'open' || phase === 'sealing'

  let right: React.ReactNode = alignPlus ? <Unlimited /> : <Counter left={cardsLeft} total={FREE_PEOPLE} />
  let rightKey = 'counter'
  if (status) { right = <StatusText>{status}</StatusText>; rightKey = status }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora={null} warm="#5a2a7a" count={70} seed={5} />
      {/* element sky tint (S-05x) */}
      <AnimatePresence initial={false}>
        <motion.div key={sign.element}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9 }}
          style={{
            position: 'absolute', left: 0, right: 0, top: 0, height: 420, pointerEvents: 'none',
            background: `linear-gradient(180deg, ${ELEMENT_SKY[sign.element]}cc 0%, ${ELEMENT_SKY[sign.element]}55 22%, transparent 60%)`,
          }} />
      </AnimatePresence>
      <div style={{
        position: 'absolute', left: -40, right: -40, top: 260, height: 460, pointerEvents: 'none',
        background: `radial-gradient(50% 50% at 50% 50%, ${sign.color}26 0%, transparent 70%)`, transition: 'background 0.8s',
      }} />

      <DeckHeader onSky={() => go('sky')} onNotifs={() => go('notifications')} title="Tonight’s deck" right={right} rightKey={rightKey} starPulse={starPulse} hidden={peekOpen} />

      {/* peek header */}
      <AnimatePresence>
        {peekOpen && (
          <motion.div className="mono" key="peekhdr"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            style={{ position: 'absolute', top: 80, left: 0, right: 0, textAlign: 'center', fontSize: 11, letterSpacing: '0.24em', color: '#f2c75c', zIndex: 21, textShadow: '0 0 12px rgba(242,199,92,0.5)' }}>
            PEEK&nbsp; · &nbsp;<motion.span key={secs} initial={{ scale: 1.5, display: 'inline-block' }} animate={{ scale: 1 }} style={{ display: 'inline-block' }}>{secs}</motion.span> SECOND{secs === 1 ? '' : 'S'} LEFT
          </motion.div>
        )}
      </AnimatePresence>

      {/* the stack */}
      <motion.div animate={{ y: peekOpen ? -22 : 0 }} transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        style={{ position: 'absolute', inset: 0 }}>
        <motion.div animate={{ opacity: matching ? 0 : 1, scale: matching ? 0.92 : 1 }} transition={{ duration: 0.35 }} style={{ position: 'absolute', inset: 0 }}>
          <StackBacks bump={index} />
        </motion.div>
        {nextSlot && (
          <motion.div animate={{ opacity: matching ? 0 : 1, scale: matching ? 0.9 : 1 }} transition={{ duration: 0.3 }} style={{ position: 'absolute', inset: 0 }}>
            <UnderCard key={nextSlot.key} slot={nextSlot} drawsOf={drawsOf} dragX={dragX} />
          </motion.div>
        )}
        {slot && (
          <TopCard
            key={slot.key}
            ref={topRef}
            slot={slot}
            drawsOf={drawsOf}
            dragX={dragX}
            holdP={holdP}
            phase={phase}
            ringText={phase === 'open' ? String(secs) : '✦'}
            first={first}
            hidden={expanded}
            locked={busy || expanded}
            onFlyStart={onFlyStart}
            onSwiped={onSwiped}
            onTap={openExpand}
            onHoldBegin={beginHold}
            onHoldAbort={abortHold}
            onPeekEnd={endPeek}
          />
        )}
        {/* +1 aligned pops */}
        <AnimatePresence>
          {pops.map((pp) => (
            <motion.div key={pp.id}
              initial={{ opacity: 0, y: 0, scale: 0.6 }}
              animate={{ opacity: [0, 1, 1, 0], y: -120, scale: [0.6, 1.15, 1, 1] }}
              transition={{ duration: 1.3, times: [0, 0.15, 0.7, 1], ease: 'easeOut' }}
              style={{
                position: 'absolute', top: 380, zIndex: 30, pointerEvents: 'none', textAlign: 'center',
                ...(pp.kind === 'align' ? { right: 26 } : { left: 26 }),
              }}>
              {pp.kind === 'align' ? (
                <>
                  <div className="serif italic" style={{ fontSize: 34, fontWeight: 500, color: '#f2c75c', textShadow: '0 0 18px rgba(242,199,92,0.8), 0 2px 6px rgba(0,0,0,0.6)' }}>+1 aligned</div>
                  {pp.streak >= 2 && (
                    <div className="mono" style={{ marginTop: 4, display: 'inline-block', fontSize: 10, letterSpacing: '0.2em', color: '#2a1a08', background: 'var(--gold-foil)', padding: '4px 10px', borderRadius: 999, boxShadow: '0 0 14px rgba(242,199,92,0.6)' }}>
                      ✦ STREAK ×{pp.streak}
                    </div>
                  )}
                </>
              ) : (
                <div className="serif italic" style={{ fontSize: 28, color: 'var(--label-2)', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>released</div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* below-card controls */}
      <motion.div animate={{ opacity: peekUI ? 0 : 1 }} transition={{ duration: 0.25 }} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <SwipeLabels
          alignStyle={{ scale: alignLabelScale, color: alignLabelColor, textShadow: alignGlow }}
          releaseStyle={{ scale: releaseLabelScale, color: releaseLabelColor }}
          event={slot?.kind === 'event'}
        />
        {slot && <DrawTracker slot={slot} drawsOf={drawsOf} />}
        <AnimatePresence mode="wait" initial={false}>
          {toast ? (
            <motion.div key={toast.id}
              initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6 }}
              transition={{ type: 'spring', stiffness: 420, damping: 24 }}
              style={{ position: 'absolute', top: 718, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, height: 32, padding: '0 16px', borderRadius: 999,
                background: 'rgba(52,35,95,0.8)', border: '1px solid rgba(242,199,92,0.45)', boxShadow: '0 0 18px rgba(242,199,92,0.2)',
                fontSize: 13, color: 'var(--label-1)', backdropFilter: 'blur(10px)',
              }}>
                <span style={{ color: '#f2c75c' }}>✦</span>{toast.text}
              </span>
            </motion.div>
          ) : (
            <motion.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', top: 726, left: 0, right: 0, textAlign: 'center', fontSize: 12.5, color: 'var(--label-2)' }}>
              {slot?.kind === 'event' ? <>Every sixth card is an event&nbsp; · &nbsp;<span style={{ color: 'var(--align)' }}>right to play</span>&nbsp; · &nbsp;left to save it</>
                : alignPlus ? <>Hold the card to peek&nbsp; · &nbsp;<span style={{ color: 'var(--align)' }}>∞</span></>
                : peeks > 0 ? <>Hold the card to peek&nbsp; · &nbsp;{peeks} left</> : <>No peeks left tonight&nbsp; · &nbsp;more at 11:11</>}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {peekUI && (
          <motion.div key="peekcap" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ position: 'absolute', top: 664, left: 0, right: 0, textAlign: 'center', pointerEvents: 'none' }}>
            <div className="serif italic" style={{ fontSize: 18, color: 'var(--label-2)' }}>Let go and the photo closes</div>
            <div style={{ marginTop: 8, fontSize: 13, color: 'var(--label-2)' }}>{alignPlus ? <>Unlimited peeks&nbsp; · &nbsp;<span style={{ color: 'var(--align)' }}>Align+ ✦</span></> : <>{peeks} {peeks === 1 ? 'peek' : 'peeks'} left tonight</>}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <TabBar active="deck" go={go} />

      <canvas ref={canvasRef} width={390} height={844}
        style={{ position: 'absolute', inset: 0, width: 390, height: 844, zIndex: 45, pointerEvents: 'none' }} />

      {/* the big beat: she aligns back */}
      <AnimatePresence>
        {flash && (
          <motion.div key="flash" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.95, 0.6] }} transition={{ duration: 0.6, times: [0, 0.25, 1] }}
            style={{
              position: 'absolute', inset: 0, zIndex: 55, pointerEvents: 'none',
              background: 'radial-gradient(60% 45% at 50% 45%, rgba(255,247,220,0.95) 0%, rgba(242,199,92,0.55) 40%, rgba(154,123,224,0.35) 75%, rgba(11,6,32,0.2) 100%)',
            }}>
            <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 0.7, ease: 'easeInOut' }}
              style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.8) 50%, transparent 70%)' }} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {upsell && <PeekUpsell onClose={() => setUpsell(false)} onUpgrade={() => go('paywall')} />}
      </AnimatePresence>

      <AnimatePresence>
        {expanded && profile && (
          <ExpandSheet
            key="sheet"
            profile={profile}
            onClose={() => setExpanded(false)}
            onAlign={() => fromExpand(1)}
            onRelease={() => fromExpand(-1)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

/** "Draw 1 of 3" + six slots: five people, then the event (✦). */
function DrawTracker({ slot, drawsOf }: { slot: Slot; drawsOf: number | null }) {
  const pos = slot.kind === 'event' ? PEOPLE_PER_DRAW : slot.redraw ? PEOPLE_PER_DRAW + 1 : slot.pos
  const label = slot.kind === 'person' && slot.profile.real ? 'NEW · NEAR YOU'
    : slot.kind === 'person' && slot.redraw ? 'REDRAW' : `DRAW ${slot.draw + 1}${drawsOf ? `/${drawsOf}` : ''}`
  return (
    <div style={{ position: 'absolute', top: 703, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 7, pointerEvents: 'none' }}>
      <span className="mono" style={{ fontSize: 8.5, letterSpacing: '0.16em', color: 'var(--label-2)', marginRight: 2 }}>{label}</span>
      {Array.from({ length: PEOPLE_PER_DRAW }, (_, i) => (
        <motion.span key={i} animate={{ scale: i === pos ? 1.25 : 1 }}
          style={{
            width: 7, height: 10, borderRadius: 2,
            background: i < pos ? 'rgba(239,230,214,0.75)' : i === pos ? '#efe6d6' : 'transparent',
            border: '1px solid rgba(239,230,214,0.55)', boxShadow: i === pos ? '0 0 8px rgba(239,230,214,0.8)' : 'none',
          }} />
      ))}
      <motion.span animate={{ scale: pos === PEOPLE_PER_DRAW ? [1, 1.35, 1] : 1 }} transition={{ duration: 1.2, repeat: pos === PEOPLE_PER_DRAW ? Infinity : 0 }}
        style={{ fontSize: 12, lineHeight: 1, color: pos >= PEOPLE_PER_DRAW ? '#f2c75c' : 'rgba(242,199,92,0.45)', textShadow: pos >= PEOPLE_PER_DRAW ? '0 0 10px #f2c75c' : 'none' }}>✦</motion.span>
    </div>
  )
}

/** First time you run out of peeks: offer Align+ (after that, just a toast). */
function PeekUpsell({ onClose, onUpgrade }: { onClose: () => void; onUpgrade: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
      style={{ position: 'absolute', inset: 0, zIndex: 70, background: 'rgba(8,4,24,0.72)', backdropFilter: 'blur(6px)' }}>
      <motion.div onClick={(e) => e.stopPropagation()}
        initial={{ y: 340 }} animate={{ y: 0 }} exit={{ y: 360 }} transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, padding: '22px 24px 40px', borderRadius: '26px 26px 0 0', textAlign: 'center',
          background: 'radial-gradient(80% 60% at 50% 0%, rgba(242,199,92,0.18), transparent 70%), linear-gradient(180deg, #2a1a5a, #160b36)',
          borderTop: '1px solid rgba(242,199,92,0.45)', boxShadow: '0 -20px 50px rgba(0,0,0,0.5)',
        }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(179,166,196,0.4)', margin: '0 auto 18px' }} />
        <div style={{ position: 'relative', width: 64, height: 64, margin: '0 auto' }}>
          <svg width="64" height="64" viewBox="0 0 64 64" style={{ position: 'absolute', inset: 0 }}>
            <circle cx="32" cy="32" r="27" fill="rgba(11,6,32,0.6)" stroke="rgba(242,199,92,0.3)" strokeWidth="3" />
          </svg>
          <div className="serif italic" style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontSize: 30, color: '#f2c75c', textShadow: '0 0 12px rgba(242,199,92,0.7)' }}>0</div>
        </div>
        <div className="mono" style={{ marginTop: 14, fontSize: 10, letterSpacing: '0.24em', color: 'var(--align)' }}>OUT OF PEEKS TONIGHT</div>
        <div className="h-display" style={{ fontSize: 28, marginTop: 8 }}>Keep looking with Align+.</div>
        <div className="serif" style={{ fontSize: 16, lineHeight: 1.4, color: 'var(--label-2)', marginTop: 8 }}>
          Free nights come with three peeks. Align+ gives you unlimited peeks and unlimited cards.
        </div>
        <button className="chrome-cta" style={{ marginTop: 22 }} onClick={() => { sfx.tap(); onUpgrade() }}>
          Start seven days free <span className="spark">✦</span>
        </button>
        <button onClick={() => { sfx.tap(); onClose() }} style={{ display: 'block', margin: '14px auto 0', fontSize: 14, color: 'var(--label-2)' }}>
          Not now — 3 more at 11:11
        </button>
      </motion.div>
    </motion.div>
  )
}
