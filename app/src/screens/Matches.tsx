import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import TabBar from '../components/TabBar'
import TradeCard, { TradeCardBack, type TradeCardData } from '../components/binder/TradeCard'
import Burst from '../components/reveal/Burst'
import { useConfetti, ConfettiCanvas } from '../components/reveal/useConfetti'
import { MATCHES, SECTION_LABEL, TRADE_UNLOCK_DAYS, BINDER_SLOTS, type Match, type MatchSection } from '../data/matches'
import { ME } from '../data/profiles'
import { SIGNS, ELEMENT_COLOR, type Element } from '../data/signs'
import { binder, useBinder } from '../lib/binder'
import { sfx } from '../lib/sfx'

type View = 'list' | 'binder'
let lastView: View = 'list'

export const copyOf = (m: Match): TradeCardData => ({
  name: m.name, age: m.age, sign: m.sign, img: m.photo, serial: m.serial, copyFor: ME.name,
})

type SlotState = 'traded' | 'ready' | 'locked'
const slotState = (m: Match, traded: ReadonlySet<string>): SlotState =>
  traded.has(m.id) ? 'traded' : m.day >= TRADE_UNLOCK_DAYS ? 'ready' : 'locked'

const ELEMENTS: Element[] = ['fire', 'earth', 'air', 'water']

// binder page geometry (phone px)
const PAGE_TOP = 222
const PAGE_X = 16
const PAD = 12
const GAP = 10
const SLEEVE_W = 102
const SLEEVE_H = 142

export default function Matches({ go }: ScreenProps) {
  const { traded, justTraded } = useBinder()
  const [view, setView] = useState<View>(justTraded ? 'binder' : lastView)
  const [zoom, setZoom] = useState<Match | null>(null)
  const [landed, setLanded] = useState(false)
  const [setComplete, setSetComplete] = useState(false)
  const { canvasRef, fire } = useConfetti()

  useEffect(() => { lastView = view }, [view])

  const elementsHeld = useMemo(() => {
    const held = new Set<Element>()
    // the card still flying into its sleeve doesn't count until it lands
    MATCHES.forEach((m) => { if (traded.has(m.id) && !(m.id === justTraded && !landed)) held.add(SIGNS[m.sign].element) })
    return held
  }, [traded, justTraded, landed])

  const openRow = (m: Match) => {
    sfx.tap()
    const st = slotState(m, traded)
    if (st === 'ready') { binder.startTrade(m.id); go('trade') }
    else if (st === 'traded') { setView('binder'); setZoom(m) }
    else go('chat')
  }

  // the card that just arrived from a trade drops into its sleeve
  const onLanded = (m: Match, i: number) => {
    setLanded(true)
    sfx.align()
    const { x, y } = sleevePos(i)
    const cx = (x + SLEEVE_W / 2) / 390
    const cy = (y + SLEEVE_H / 2) / 844
    fire({ x: cx, y: cy, power: 0.5 })
    const after = new Set(elementsHeld).add(SIGNS[m.sign].element)
    if (elementsHeld.size < ELEMENTS.length && after.size === ELEMENTS.length) {
      window.setTimeout(() => {
        setSetComplete(true)
        sfx.match()
        fire({ x: 0.5, y: 0.2, power: 1 })
      }, 650)
    }
    window.setTimeout(() => binder.clearJustTraded(), 400)
  }

  const summary = `${MATCHES.length} aligned · 2 waiting on you · 2 going quiet`

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora={null} warm={null} count={60} seed={33} />

      <div className="h-display" style={{ position: 'absolute', left: 28, top: 62, fontSize: 34 }}>Your matches</div>
      <div style={{ position: 'absolute', left: 28, top: 106, fontSize: 13.5, color: 'var(--label-2)' }}>{summary}</div>

      {/* List / Binder toggle */}
      <div style={{
        position: 'absolute', left: 24, right: 24, top: 138, height: 38, padding: 3, borderRadius: 999,
        display: 'flex', background: 'rgba(30,18,64,0.7)', border: '1px solid rgba(179,166,196,0.18)',
      }}>
        {(['list', 'binder'] as View[]).map((v) => (
          <button key={v} onClick={() => { sfx.tap(); setView(v) }} style={{ position: 'relative', flex: 1, height: '100%', borderRadius: 999 }}>
            {view === v && (
              <motion.div layoutId="mt-toggle" transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'rgba(52,35,95,0.95)', boxShadow: 'inset 0 0 0 1px rgba(179,166,196,0.28)' }} />
            )}
            <span className="mono" style={{ position: 'relative', fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: view === v ? 'var(--label-1)' : 'var(--label-3)' }}>
              {v === 'list' ? 'Matches' : <>Binder <span style={{ color: 'var(--align)' }}>✦</span> {traded.size}</>}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {view === 'list' ? (
          <motion.div key="list" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
            style={{ position: 'absolute', left: 0, right: 0, top: 186, bottom: 96, overflowY: 'auto', padding: '0 28px' }}>
            {(['your-turn', 'waiting', 'quiet'] as MatchSection[]).map((sec) => {
              const rows = MATCHES.filter((m) => m.section === sec)
              return (
                <div key={sec} style={{ marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '8px 0 4px' }}>
                    <span className="eyebrow" style={{ fontSize: 9.5, color: 'var(--label-3)' }}>{SECTION_LABEL[sec]} · {rows.length}</span>
                    <span style={{ flex: 1, height: 1, background: 'rgba(179,166,196,0.16)' }} />
                  </div>
                  {rows.map((m, i) => (
                    <Row key={m.id} m={m} st={slotState(m, traded)} last={i === rows.length - 1} onClick={() => openRow(m)} />
                  ))}
                </div>
              )
            })}
          </motion.div>
        ) : (
          <motion.div key="binder" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.25 }}
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {/* element set */}
            <div style={{ position: 'absolute', left: 28, right: 28, top: 190, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="eyebrow" style={{ fontSize: 9, color: 'var(--label-3)' }}>Element set</span>
              <span style={{ flex: 1 }} />
              {ELEMENTS.map((el) => {
                const on = elementsHeld.has(el)
                return (
                  <motion.span key={el} animate={on ? { scale: [1.4, 1] } : { scale: 1 }} transition={{ duration: 0.4 }}
                    className="mono" style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: on ? 'var(--label-1)' : 'var(--label-4)' }}>
                    <span style={{
                      width: 8, height: 8, borderRadius: 4,
                      background: on ? ELEMENT_COLOR[el] : 'transparent', border: `1px solid ${on ? ELEMENT_COLOR[el] : 'var(--label-4)'}`,
                      boxShadow: on ? `0 0 8px ${ELEMENT_COLOR[el]}` : 'none',
                    }} />
                    {el}
                  </motion.span>
                )
              })}
            </div>

            {/* binder page */}
            <div style={{
              position: 'absolute', left: PAGE_X, right: PAGE_X, top: PAGE_TOP, height: PAD * 2 + SLEEVE_H * 3 + GAP * 2,
              borderRadius: 20, pointerEvents: 'auto',
              background: 'linear-gradient(180deg, rgba(40,26,78,0.85), rgba(30,18,64,0.9))',
              border: '1px solid rgba(179,166,196,0.16)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 50px rgba(0,0,0,0.4)',
            }}>
              {/* binder rings */}
              {[0.2, 0.5, 0.8].map((t) => (
                <span key={t} style={{ position: 'absolute', left: -6, top: `${t * 100}%`, width: 12, height: 22, marginTop: -11, borderRadius: 6, background: 'linear-gradient(90deg, #8a7aa8, #e6ddf5 45%, #6f6290)', boxShadow: '0 2px 6px rgba(0,0,0,0.5)' }} />
              ))}
            </div>
            {Array.from({ length: BINDER_SLOTS }, (_, i) => {
              const m = MATCHES[i]
              const { x, y } = sleevePos(i)
              return (
                <div key={i} style={{ position: 'absolute', left: x, top: y, width: SLEEVE_W, height: SLEEVE_H, pointerEvents: 'auto' }}>
                  <Sleeve
                    m={m}
                    st={m ? slotState(m, traded) : null}
                    arriving={!!m && m.id === justTraded && !landed}
                    onLanded={() => m && onLanded(m, i)}
                    onOpen={() => m && openRow(m)}
                  />
                </div>
              )
            })}
            <div style={{ position: 'absolute', top: PAGE_TOP + PAD * 2 + SLEEVE_H * 3 + GAP * 2 + 12, width: '100%', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 8 }}>
                <span style={{ width: 16, height: 4, borderRadius: 2, background: 'var(--label-1)' }} />
                <span style={{ width: 4, height: 4, borderRadius: 2, background: 'var(--label-4)' }} />
              </div>
              <div className="serif italic" style={{ fontSize: 14, color: 'var(--label-2)' }}>
                Three days aligned, and you can trade copies.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* element set complete */}
      <AnimatePresence>
        {setComplete && (
          <motion.div key="set" onClick={() => setSetComplete(false)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'absolute', inset: 0, zIndex: 45, display: 'grid', placeItems: 'center', background: 'rgba(11,6,32,0.72)', backdropFilter: 'blur(6px)', cursor: 'pointer' }}>
            <motion.div initial={{ scale: 0.6, y: 30 }} animate={{ scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              style={{ textAlign: 'center', padding: '0 30px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginBottom: 22 }}>
                {ELEMENTS.map((el, i) => (
                  <motion.div key={el} initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.15 + i * 0.12, type: 'spring', stiffness: 380, damping: 14 }}
                    style={{ width: 46, height: 46, borderRadius: 23, display: 'grid', placeItems: 'center', background: `radial-gradient(circle at 35% 30%, #fff8, ${ELEMENT_COLOR[el]} 55%, #0b0620)`, boxShadow: `0 0 22px ${ELEMENT_COLOR[el]}` }}>
                    <span className="mono" style={{ fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', textShadow: '0 1px 3px #000' }}>{el}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.26em', color: 'var(--align)' }}>✦ SET COMPLETE ✦</div>
              <div className="h-display" style={{ fontSize: 34, marginTop: 10 }}>All four elements.</div>
              <div className="serif" style={{ fontSize: 16, color: 'var(--label-2)', marginTop: 10, lineHeight: 1.4 }}>
                Fire, earth, air and water, each one traded hand to hand. Your binder holds the whole sky now.
              </div>
              <div className="mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--label-3)', marginTop: 22 }}>TAP TO CLOSE</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* zoomed card */}
      <AnimatePresence>
        {zoom && (
          <motion.div key="zoom" onClick={() => setZoom(null)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'absolute', inset: 0, zIndex: 44, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(11,6,32,0.78)', backdropFilter: 'blur(8px)', cursor: 'pointer' }}>
            <motion.div initial={{ scale: 0.4, rotateY: -30 }} animate={{ scale: 1, rotateY: 0 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ type: 'spring', stiffness: 240, damping: 20 }}
              style={{ perspective: 800 }}>
              <TiltCard m={zoom} />
            </motion.div>
            <div className="mono" style={{ marginTop: 22, fontSize: 9.5, letterSpacing: '0.22em', color: 'var(--align)' }}>
              ✦ TRADED ON DAY {Math.min(zoom.day, TRADE_UNLOCK_DAYS)} ✦
            </div>
            <div className="serif italic" style={{ marginTop: 8, fontSize: 16, color: 'var(--label-2)', textAlign: 'center', padding: '0 40px' }}>
              Your copy lives in {zoom.name}’s binder too.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfettiCanvas canvasRef={canvasRef} z={46} />
      <TabBar active="matches" onSelect={(t) => { if (t === 'deck') go('deck') }} />
    </div>
  )
}

function sleevePos(i: number) {
  const c = i % 3
  const r = Math.floor(i / 3)
  return { x: PAGE_X + PAD + c * (SLEEVE_W + GAP) + 1, y: PAGE_TOP + PAD + r * (SLEEVE_H + GAP) }
}

function Row({ m, st, last, onClick }: { m: Match; st: SlotState; last: boolean; onClick: () => void }) {
  const s = SIGNS[m.sign]
  return (
    <button onClick={onClick} style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '11px 0', textAlign: 'left',
      borderBottom: last ? 'none' : '1px solid rgba(179,166,196,0.12)',
    }}>
      <div style={{ position: 'relative', width: 48, height: 48, flexShrink: 0 }}>
        <div style={{ position: 'absolute', inset: -6, borderRadius: '50%', background: `radial-gradient(closest-side, ${s.color}55, transparent)` }} />
        <img src={s.auraImg} alt="" style={{
          position: 'absolute', inset: 0, width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', objectPosition: '50% 30%',
          WebkitMaskImage: 'radial-gradient(closest-side, #000 60%, transparent)', maskImage: 'radial-gradient(closest-side, #000 60%, transparent)',
        }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="serif italic" style={{ fontSize: 20, color: 'var(--label-1)' }}>{m.name}, {m.age}</div>
        <div style={{ fontSize: 13, color: 'var(--label-2)', marginTop: 1 }}>{s.name} · {m.status}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
        <span className="mono" style={{ fontSize: 8.5, color: 'var(--label-3)' }}>{m.when} ›</span>
        <TradeTag st={st} day={m.day} />
      </div>
    </button>
  )
}

function TradeTag({ st, day }: { st: SlotState; day: number }) {
  if (st === 'ready') {
    return (
      <motion.span animate={{ boxShadow: ['0 0 0px rgba(242,199,92,0)', '0 0 12px rgba(242,199,92,0.7)', '0 0 0px rgba(242,199,92,0)'] }} transition={{ duration: 1.8, repeat: Infinity }}
        className="mono" style={{ fontSize: 8, letterSpacing: '0.16em', padding: '3px 8px', borderRadius: 999, color: '#2a1a05', background: 'var(--gold-foil)', fontWeight: 700 }}>
        ✦ TRADE
      </motion.span>
    )
  }
  if (st === 'traded') {
    return <span className="mono" style={{ fontSize: 8, letterSpacing: '0.16em', color: 'var(--align)' }}>IN BINDER</span>
  }
  const left = TRADE_UNLOCK_DAYS - day
  return <span className="mono" style={{ fontSize: 8, letterSpacing: '0.16em', color: 'var(--label-3)' }}>TRADE IN {left}D</span>
}

function Sleeve({ m, st, arriving, onLanded, onOpen }: { m?: Match; st: SlotState | null; arriving: boolean; onLanded: () => void; onOpen: () => void }) {
  const base: React.CSSProperties = {
    position: 'absolute', inset: 0, borderRadius: 12,
    background: 'rgba(11,6,32,0.45)', boxShadow: 'inset 0 0 0 1px rgba(179,166,196,0.14), inset 0 8px 16px rgba(0,0,0,0.35)',
  }
  if (!m || !st) {
    return (
      <div style={{ ...base, display: 'grid', placeItems: 'center', border: '1px dashed rgba(179,166,196,0.16)', boxShadow: 'none' }}>
        <span style={{ color: 'var(--label-4)', fontSize: 14 }}>✦</span>
      </div>
    )
  }
  const s = SIGNS[m.sign]
  const cardW = SLEEVE_W - 8

  if (st === 'traded') {
    return (
      <div style={base}>
        <motion.button onClick={onOpen}
          initial={arriving ? { y: -360, scale: 2.4, rotate: -10, opacity: 0 } : false}
          animate={{ y: 0, scale: 1, rotate: 0, opacity: 1 }}
          transition={arriving ? { type: 'spring', stiffness: 120, damping: 15, delay: 0.6 } : undefined}
          onAnimationComplete={arriving ? onLanded : undefined}
          whileHover={{ y: -3, rotate: -1 }}
          style={{ position: 'absolute', left: 4, top: 4, zIndex: arriving ? 30 : 1 }}>
          <TradeCard card={copyOf(m)} width={cardW} glow={false} />
        </motion.button>
        {arriving && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <Burst x={SLEEVE_W / 2} y={SLEEVE_H / 2} fireKey={1} power={0.35} />
          </div>
        )}
      </div>
    )
  }

  if (st === 'ready') {
    return (
      <motion.button onClick={onOpen} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
        style={{ ...base, display: 'block', width: '100%' }}>
        <motion.div animate={{ opacity: [0.45, 1, 0.45] }} transition={{ duration: 1.8, repeat: Infinity }}
          style={{ position: 'absolute', inset: -3, borderRadius: 14, boxShadow: '0 0 0 1.5px #f2c75c, 0 0 18px rgba(242,199,92,0.65)' }} />
        <div style={{ position: 'absolute', left: 4, top: 4 }}>
          <TradeCardBack width={cardW} label={m.name} />
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 10, display: 'flex', justifyContent: 'center' }}>
          <span className="mono" style={{ fontSize: 7.5, letterSpacing: '0.16em', padding: '4px 8px', borderRadius: 999, color: '#2a1a05', background: 'var(--gold-foil)', fontWeight: 700 }}>
            ✦ READY TO TRADE
          </span>
        </div>
      </motion.button>
    )
  }

  // locked: aligned fewer than three days
  const p = m.day / TRADE_UNLOCK_DAYS
  const left = TRADE_UNLOCK_DAYS - m.day
  const R = 17
  const C = 2 * Math.PI * R
  return (
    <button onClick={onOpen} style={{ ...base, display: 'block', width: '100%', overflow: 'hidden' }}>
      <img src={s.auraImg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, filter: 'blur(3px) saturate(0.8)' }} />
      <div className="serif italic" style={{ position: 'absolute', top: 10, width: '100%', textAlign: 'center', fontSize: 14, color: 'var(--label-2)' }}>{m.name}</div>
      <svg width="44" height="44" viewBox="0 0 44 44" style={{ position: 'absolute', left: SLEEVE_W / 2 - 22, top: SLEEVE_H / 2 - 26 }}>
        <circle cx="22" cy="22" r={R} fill="rgba(11,6,32,0.6)" stroke="rgba(179,166,196,0.25)" strokeWidth="2.5" />
        <circle cx="22" cy="22" r={R} fill="none" stroke="var(--align)" strokeWidth="2.5" strokeLinecap="round"
          strokeDasharray={`${C * Math.max(p, 0.04)} ${C}`} transform="rotate(-90 22 22)" />
        <path d="M17.5 21v-2.5a4.5 4.5 0 0 1 9 0V21" fill="none" stroke="var(--label-2)" strokeWidth="1.4" />
        <rect x="16" y="21" width="12" height="8.5" rx="2" fill="var(--label-2)" />
      </svg>
      <div className="mono" style={{ position: 'absolute', bottom: 26, width: '100%', textAlign: 'center', fontSize: 8, letterSpacing: '0.16em', color: 'var(--label-1)' }}>
        DAY {m.day} / {TRADE_UNLOCK_DAYS}
      </div>
      <div style={{ position: 'absolute', bottom: 10, width: '100%', textAlign: 'center', fontSize: 9.5, color: 'var(--label-3)' }}>
        Trade in {left} day{left === 1 ? '' : 's'}
      </div>
    </button>
  )
}

function TiltCard({ m }: { m: Match }) {
  const [t, setT] = useState({ x: 0, y: 0 })
  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        setT({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 })
      }}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      style={{ transform: `rotateY(${t.x * 16}deg) rotateX(${-t.y * 16}deg)`, transition: 'transform 0.12s ease-out', position: 'relative' }}
    >
      <TradeCard card={copyOf(m)} width={260} />
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 21, pointerEvents: 'none', mixBlendMode: 'screen',
        background: `radial-gradient(60% 40% at ${50 + t.x * 80}% ${50 + t.y * 80}%, rgba(255,255,255,0.28), transparent 70%)`,
      }} />
    </div>
  )
}
