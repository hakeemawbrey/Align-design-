import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import type { Pull } from '../../lib/talk'
import { EVENTS } from '../../data/draws'
import { SEASON } from '../../data/seasons'
import { sfx } from '../../lib/sfx'
import { TalkCardBack, TAROT_RATIO } from './TalkCardFace'
import PullFace, { PULL_KIND } from './PullFace'
import { ConfettiCanvas, useConfetti } from '../reveal/useConfetti'

/** 0 common · 1 rare · 2 the jackpot */
const tierOf = (c: Pull): 0 | 1 | 2 =>
  c.kind === 'sign' ? (c.variant === 'mythic' ? 2 : c.variant === 'gilded' ? 1 : 0)
    : c.kind === 'talk' ? (c.card.rarity === 'legendary' ? 2 : c.card.rarity === 'rare' ? 1 : 0)
      : c.kind === 'event' ? (EVENTS[c.id].rarity === 'Rare' ? 1 : 0)
        : c.kind === 'energy' && c.amount >= 30 ? 1 : 0

const TIER_WORD = ['', 'Rare', 'Mythic'] as const
const TIER_COLOR = ['#e6d8ff', '#f2d58a', '#ff9ad8'] as const

/** the colour a card throws behind it when it turns */
const glowOf = (c: Pull) =>
  c.kind === 'sign' ? (c.variant === 'mythic' ? '#ff9ad8' : c.variant === 'gilded' ? '#f2d58a' : '#b18cff')
    : c.kind === 'event' ? EVENTS[c.id].color
      : c.kind === 'place' ? '#7fd8b0'
        : c.kind === 'energy' ? '#9fe8c8'
          : '#c9b6f0'

const NOTE: Record<Pull['kind'], string> = {
  talk: 'In your hand · play it in any chat',
  sign: 'Added to your Signs set',
  event: 'Saved to your deck · play it any time',
  place: 'In your hand · play it in chat to plan a date',
  energy: 'Added to your energy',
}

type Stage = 'pack' | 'rise' | 'reveal' | 'all'

/**
 * Opening a pack, as an event. The foil pack floats in a column of light;
 * you tear it open yourself by swiping across the top. The cards rise out,
 * and you turn them one at a time. A rare card makes you wait: it shakes and
 * the light builds before it turns, then it lands with a burst. The best card
 * is always last. Then the whole pull, laid out.
 */
export default function PackOpen({ pack, cards, onDone }: { pack: { name: string; color: string }; cards: Pull[]; onDone: () => void }) {
  const [stage, setStage] = useState<Stage>('pack')
  const [glow, setGlow] = useState(pack.color)
  const [flash, setFlash] = useState(0)
  const { canvasRef, fire } = useConfetti()
  const shake = useAnimationControls()

  const burst = (tier: number, y = 0.42) => {
    setFlash((n) => n + 1)
    fire({ x: 0.5, y, power: tier >= 2 ? 1 : tier === 1 ? 0.7 : 0.3 })
    if (tier >= 2) void shake.start({ x: [0, -10, 9, -7, 5, -2, 0], transition: { duration: 0.5 } })
  }

  const torn = () => {
    sfx.rip()
    burst(1, 0.36)
    window.setTimeout(() => { sfx.reveal(); setStage('rise') }, 350)
    window.setTimeout(() => setStage('reveal'), 1500)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'absolute', inset: 0, zIndex: 95, overflow: 'hidden', background: '#07031a' }}>
      <motion.div animate={shake} style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Rays color={glow} strong={stage !== 'all'} />
        <Motes color={glow} />

        <div className="mono" style={{ position: 'relative', marginTop: 74, fontSize: 9.5, letterSpacing: '0.26em', color: 'var(--label-2)' }}>
          ✦ {pack.name.toUpperCase()} · {SEASON.label.toUpperCase()} ✦
        </div>

        {stage === 'pack' && <Packet pack={pack} count={cards.length} onTorn={torn} />}
        {stage === 'rise' && <Rising color={pack.color} count={cards.length} />}
        {stage === 'reveal' && <OneByOne cards={cards} color={pack.color} onGlow={setGlow} onBurst={burst} onAll={() => { setStage('all'); setGlow(pack.color) }} />}
        {stage === 'all' && <Pull12 cards={cards} onDone={onDone} />}
      </motion.div>

      {/* white bloom on every big moment */}
      <AnimatePresence>
        {flash > 0 && (
          <motion.div key={flash} initial={{ opacity: 0.85 }} animate={{ opacity: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none', background: 'radial-gradient(circle at 50% 42%, #fff 0%, rgba(255,255,255,0.6) 25%, transparent 70%)' }} />
        )}
      </AnimatePresence>
      <ConfettiCanvas canvasRef={canvasRef} z={60} />
    </motion.div>
  )
}

/** a slowly turning column of light behind everything */
function Rays({ color, strong }: { color: string; strong: boolean }) {
  return (
    <>
      <motion.div animate={{ opacity: strong ? 1 : 0.4 }} style={{
        position: 'absolute', left: '50%', top: '44%', width: 900, height: 900, borderRadius: '50%',
        transform: 'translate(-50%, -50%)', animation: 'pack-spin 40s linear infinite',
        background: `repeating-conic-gradient(from 0deg, ${color}2e 0deg 7deg, transparent 7deg 18deg)`,
        WebkitMaskImage: 'radial-gradient(circle, #000 0%, rgba(0,0,0,0.6) 30%, transparent 62%)',
        maskImage: 'radial-gradient(circle, #000 0%, rgba(0,0,0,0.6) 30%, transparent 62%)',
        transition: 'background 0.6s',
      }} />
      <div style={{
        position: 'absolute', left: '50%', top: '44%', width: 420, height: 420, borderRadius: '50%', transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, ${color}55 0%, ${color}18 40%, transparent 70%)`, transition: 'background 0.6s',
      }} />
    </>
  )
}

/** sparks drifting up through the light */
function Motes({ color }: { color: string }) {
  const motes = useRef(Array.from({ length: 22 }, (_, i) => ({ x: (i * 37) % 100, d: 5 + ((i * 13) % 7), delay: (i * 0.7) % 6, s: 2 + (i % 3) }))).current
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {motes.map((m, i) => (
        <span key={i} style={{
          position: 'absolute', left: `${m.x}%`, bottom: -10, width: m.s, height: m.s, borderRadius: '50%',
          background: i % 3 ? color : '#fff', boxShadow: `0 0 6px ${color}`,
          animation: `pack-rise ${m.d}s linear ${m.delay}s infinite`,
        }} />
      ))}
    </div>
  )
}

/** the sealed foil pack: swipe across the top to tear it */
function Packet({ pack, count, onTorn }: { pack: { name: string; color: string }; count: number; onTorn: () => void }) {
  const W = 214, H = 330, LINE = 46
  const [p, setP] = useState(0)
  const [done, setDone] = useState(false)
  const start = useRef<number | null>(null)
  const taps = useRef(0)
  const wiggle = useAnimationControls()
  const lastTick = useRef(0)

  const finish = () => { if (done) return; setDone(true); setP(1); onTorn() }
  const move = (x: number) => {
    if (start.current == null || done) return
    const v = Math.min(1, Math.abs(x - start.current) / 150)
    setP(v)
    if (v - lastTick.current > 0.12) { lastTick.current = v; sfx.peekTick(v) }
    if (v >= 0.75) finish()
  }
  const up = () => {
    if (start.current == null || done) return
    start.current = null
    if (p < 0.08) {
      // a tap: the pack bucks; three taps open it too
      taps.current += 1
      sfx.tap()
      void wiggle.start({ rotate: [0, -4, 4, -2, 0], transition: { duration: 0.35 } })
      if (taps.current >= 3) finish()
    }
    if (!done) { setP(0); lastTick.current = 0 }
  }

  const foil = `linear-gradient(115deg, #f8edff 0%, #e6d8ff 18%, ${pack.color} 34%, #fff7ec 50%, #eaf4ff 64%, ${pack.color} 80%, #ffeff7 100%)`
  const crimp = 'repeating-linear-gradient(90deg, rgba(255,255,255,0.55) 0 3px, rgba(120,90,170,0.35) 3px 6px)'

  return (
    <>
      <div className="h-display" style={{ position: 'relative', fontSize: 30, marginTop: 8 }}>{count} cards inside</div>
      <motion.div
        initial={{ y: 80, scale: 0.7, opacity: 0, rotate: -8 }} animate={{ y: [80, -6, 0], scale: [0.7, 1.06, 1], opacity: 1, rotate: [-8, 2, 0] }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        style={{ position: 'relative', marginTop: 34 }}>
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}>
          <motion.div animate={wiggle}
            onPointerDown={(e) => { start.current = e.clientX; (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId) }}
            onPointerMove={(e) => move(e.clientX)} onPointerUp={up} onPointerCancel={up}
            style={{ position: 'relative', width: W, height: H, touchAction: 'none', cursor: 'grab', filter: `drop-shadow(0 0 34px ${pack.color}aa) drop-shadow(0 20px 30px rgba(0,0,0,0.6))` }}>
            {/* body */}
            <div style={{ position: 'absolute', left: 0, right: 0, top: LINE, bottom: 0, borderRadius: '0 0 12px 12px', background: foil, backgroundSize: '220% 220%', animation: 'foil-sweep 5s linear infinite', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 16, background: crimp }} />
              <div style={{ position: 'absolute', inset: 10, borderRadius: 8, border: '1px solid rgba(58,44,78,0.35)' }} />
              <div style={{ position: 'absolute', left: 0, right: 0, top: 38, display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 92, height: 92, borderRadius: 46, display: 'grid', placeItems: 'center', background: 'radial-gradient(circle at 40% 35%, #fff, rgba(255,255,255,0.2) 60%)', border: '1.5px solid rgba(58,44,78,0.45)', boxShadow: `0 0 26px ${pack.color}` }}>
                  <span style={{ fontSize: 44, color: '#3a2c4e', lineHeight: 1 }}>✦</span>
                </div>
              </div>
              <div className="serif italic" style={{ position: 'absolute', left: 0, right: 0, top: 148, textAlign: 'center', fontSize: 26, color: '#2a1d40' }}>{pack.name}</div>
              <div className="mono" style={{ position: 'absolute', left: 0, right: 0, top: 186, textAlign: 'center', fontSize: 8.5, letterSpacing: '0.24em', color: '#3a2c4e' }}>
                {count} CARDS · {SEASON.name.toUpperCase()}
              </div>
              <div className="mono" style={{ position: 'absolute', left: 0, right: 0, bottom: 30, textAlign: 'center', fontSize: 7, letterSpacing: '0.22em', color: 'rgba(58,44,78,0.7)' }}>ALIGN · NUMBERED PRINT RUN</div>
            </div>
            {/* the strip that tears off */}
            <motion.div
              animate={done ? { y: -140, x: 70, rotate: 24, opacity: 0 } : { y: -p * 6, rotate: -p * 3 }}
              transition={done ? { duration: 0.7, ease: 'easeOut' } : { duration: 0.05 }}
              style={{ position: 'absolute', left: 0, right: 0, top: 0, height: LINE, borderRadius: '12px 12px 0 0', background: foil, backgroundSize: '220% 220%', animation: 'foil-sweep 5s linear infinite', overflow: 'hidden', transformOrigin: '0% 100%' }}>
              <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 16, background: crimp }} />
            </motion.div>
            {/* the tear line: dashed until you cut it, then light pours through */}
            <div style={{ position: 'absolute', left: 8, right: 8, top: LINE - 1, height: 2, borderTop: '2px dashed rgba(58,44,78,0.5)' }} />
            <div style={{ position: 'absolute', left: 0, top: LINE - 3, height: 6, width: `${p * 100}%`, borderRadius: 3, background: '#fff', boxShadow: `0 0 16px #fff, 0 0 30px ${pack.color}` }} />
          </motion.div>
        </motion.div>
      </motion.div>
      {/* the hint */}
      {!done && (
        <div style={{ position: 'relative', marginTop: 34, height: 40, width: 220, textAlign: 'center' }}>
          <span style={{ position: 'absolute', left: '50%', top: 0, marginLeft: -11, fontSize: 22, animation: 'pack-hint 2.2s ease-in-out infinite' }}>☝︎</span>
          <div className="mono" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, fontSize: 9, letterSpacing: '0.22em', color: 'var(--label-2)' }}>SWIPE ACROSS THE TOP TO TEAR</div>
        </div>
      )}
    </>
  )
}

/** the cards lift out of the opened pack */
function Rising({ color, count }: { color: string; count: number }) {
  const W = 196
  return (
    <>
      <div className="h-display" style={{ position: 'relative', fontSize: 30, marginTop: 8 }}>{count} cards</div>
      <div style={{ position: 'relative', marginTop: 26, width: W + 30, height: W * TAROT_RATIO + 20 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div key={i} initial={{ y: 260, opacity: 0, scale: 0.8 }} animate={{ y: i * 4, opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 15, delay: 0.1 + i * 0.09 }}
            style={{ position: 'absolute', left: 15 + i * 3, top: 0 }}>
            <TalkCardBack width={W} color={color} />
          </motion.div>
        ))}
      </div>
    </>
  )
}

/** tap to turn each card; rare ones make you wait for it */
function OneByOne({ cards, color, onGlow, onBurst, onAll }: {
  cards: Pull[]; color: string; onGlow: (c: string) => void; onBurst: (tier: number) => void; onAll: () => void
}) {
  const [at, setAt] = useState(0)
  const [up, setUp] = useState(false)
  const [charging, setCharging] = useState(false)
  const timers = useRef<number[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const later = (f: () => void, ms: number) => { timers.current.push(window.setTimeout(f, ms)) }
  const W = 206
  const c = cards[at]
  const tier = tierOf(c)
  const last = at === cards.length - 1

  const turn = () => {
    setCharging(false); setUp(true); onGlow(glowOf(c))
    if (tier) { sfx.boom(tier); onBurst(tier) } else { sfx.flip(); if (c.kind === 'sign') onBurst(0) }
  }
  const tap = () => {
    if (charging) return
    if (!up) {
      if (tier) {
        // the tell: it shakes and the light builds before it turns
        setCharging(true); onGlow(TIER_COLOR[tier])
        ;[0, 1, 2, 3, 4].forEach((i) => later(() => sfx.charge(i / 4), i * 170))
        later(turn, tier >= 2 ? 1100 : 800)
      } else turn()
      return
    }
    if (last) { sfx.align(); onAll(); return }
    sfx.release(); setUp(false); onGlow(color); setAt(at + 1)
  }

  return (
    <>
      <div className="h-display" style={{ position: 'relative', fontSize: 30, marginTop: 8 }}>
        {up && tier ? <span style={{ color: TIER_COLOR[tier] }}>{TIER_WORD[tier]}!</span> : `${at + 1} of ${cards.length}`}
      </div>
      <div className="mono" style={{ position: 'relative', marginTop: 6, height: 12, fontSize: 8.5, letterSpacing: '0.16em', color: 'var(--label-2)' }}>
        {up ? `${PULL_KIND[c.kind].toUpperCase()} · ${NOTE[c.kind].toUpperCase()}`
          : charging ? 'SOMETHING’S COMING…'
            : last ? 'THE LAST CARD IS THE BEST ONE' : 'TAP TO TURN IT OVER'}
      </div>

      <div onClick={tap} style={{ position: 'relative', marginTop: 24, width: W + 30, height: W * TAROT_RATIO + 24, cursor: 'pointer' }}>
        {Array.from({ length: Math.min(3, cards.length - at - 1) }).map((_, i) => (
          <div key={i} style={{ position: 'absolute', left: 15 + (i + 1) * 4, top: (i + 1) * 5, opacity: 0.55 - i * 0.15 }}>
            <TalkCardBack width={W} color={color} />
          </div>
        ))}
        <AnimatePresence mode="popLayout">
          <motion.div key={at}
            initial={{ y: 30, opacity: 0, scale: 0.92 }} animate={{ y: 0, opacity: 1, scale: up && tier ? [1, 1.12, 1.04] : 1 }}
            exit={{ x: 320, y: -40, rotate: 24, opacity: 0, transition: { duration: 0.4, ease: 'easeIn' } }}
            transition={{ duration: 0.45 }}
            style={{ position: 'absolute', left: 15, top: 0, perspective: 1000 }}>
            <motion.div
              animate={charging ? { x: [0, -5, 5, -6, 6, -4, 4, 0], rotate: [0, -1.5, 1.5, -2, 2, -1, 1, 0] } : { x: 0, rotate: 0 }}
              transition={charging ? { duration: 0.45, repeat: Infinity } : { duration: 0.2 }}>
              <motion.div animate={{ rotateY: up ? 0 : 180 }} initial={{ rotateY: 180 }} transition={{ duration: tier ? 0.75 : 0.5, ease: [0.3, 1.4, 0.5, 1] }}
                style={{
                  transformStyle: 'preserve-3d', position: 'relative', width: W, height: W * TAROT_RATIO,
                  filter: charging ? `drop-shadow(0 0 30px ${TIER_COLOR[tier]}) brightness(1.15)` : up ? `drop-shadow(0 0 ${tier ? 34 : 16}px ${glowOf(c)})` : 'none',
                  transition: 'filter 0.4s',
                }}>
                <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden' }}><PullFace pull={c} width={W} /></div>
                <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}><TalkCardBack width={W} color={charging ? TIER_COLOR[tier] : color} /></div>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ position: 'relative', display: 'flex', gap: 5, marginTop: 18 }}>
        {cards.map((x, i) => (
          <span key={i} style={{
            width: 8, height: 8, borderRadius: 4, transition: 'background 0.3s',
            background: i < at || (i === at && up) ? (tierOf(x) ? TIER_COLOR[tierOf(x)] : 'var(--chrome)') : 'rgba(179,166,196,0.25)',
            boxShadow: (i < at || (i === at && up)) && tierOf(x) ? `0 0 8px ${TIER_COLOR[tierOf(x)]}` : 'none',
          }} />
        ))}
      </div>
      <button className="mono" onClick={() => { sfx.tap(); onAll() }}
        style={{ position: 'relative', marginTop: 16, fontSize: 9.5, letterSpacing: '0.18em', color: 'var(--label-3)' }}>
        SHOW ALL {cards.length} ›
      </button>
    </>
  )
}

/** the whole pull, dealt out from the middle, the best card leading */
function Pull12({ cards, onDone }: { cards: Pull[]; onDone: () => void }) {
  const tally = (Object.keys(PULL_KIND) as Pull['kind'][])
    .map((k) => [k, cards.filter((x) => x.kind === k).length] as const).filter(([, n]) => n)
  const best = Math.max(...cards.map(tierOf))
  const SW = 74
  return (
    <>
      <div className="h-display" style={{ position: 'relative', fontSize: 30, marginTop: 8 }}>{best ? `A ${TIER_WORD[best].toLowerCase()} pull` : 'Your pull'}</div>
      <div className="mono" style={{ position: 'relative', marginTop: 6, fontSize: 8.5, letterSpacing: '0.14em', color: 'var(--label-2)' }}>
        {tally.map(([k, n]) => `${n} ${PULL_KIND[k].toUpperCase()}`).join(' · ')}
      </div>
      <div style={{ position: 'relative', marginTop: 18, display: 'grid', gridTemplateColumns: `repeat(4, ${SW}px)`, gap: 10 }}>
        {cards.map((x, i) => {
          const t = tierOf(x)
          return (
            <motion.div key={`${x.kind}-${i}`}
              initial={{ opacity: 0, scale: 0.3, x: (1.5 - (i % 4)) * 84, y: 160 - Math.floor(i / 4) * 140, rotate: (i % 2 ? 1 : -1) * 20 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 170, damping: 17, delay: 0.05 + i * 0.05 }}
              style={{ filter: t ? `drop-shadow(0 0 10px ${TIER_COLOR[t]})` : undefined }}>
              <PullFace pull={x} width={SW} />
            </motion.div>
          )
        })}
      </div>
      <motion.button className="chrome-cta" onClick={() => { sfx.tap(); onDone() }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
        style={{ position: 'absolute', bottom: 60 }}>
        Keep them <span className="spark">✦</span>
      </motion.button>
    </>
  )
}
