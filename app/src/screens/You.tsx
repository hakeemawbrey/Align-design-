import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import TabBar from '../components/TabBar'
import TradeCard, { TradeCardBack } from '../components/binder/TradeCard'
import AuraFigure from '../components/you/AuraFigure'
import YourCardSheet, { type CardSide } from '../components/you/YourCardSheet'
import { ME } from '../data/profiles'
import { SIGNS } from '../data/signs'
import { sfx } from '../lib/sfx'
import { useSession } from '../lib/session'

const SUN = SIGNS[ME.sign]
const MOON = SIGNS[ME.moon]
const RISING = SIGNS[ME.rising]
/** Taurus-room chartreuse from the figure glow (G-05 / S-17 accent) */
const LIME = '#dfe36a'

const maskFor = (scrolled: boolean) => `linear-gradient(180deg, transparent ${scrolled ? 52 : 38}px, #000 ${scrolled ? 96 : 60}px, #000 calc(100% - 120px), transparent calc(100% - 44px))`

type TileId = 'sign' | 'sky' | 'calendar' | 'moon' | 'retro'

const TILES: { id: TileId; title: string; sub: string }[] = [
  { id: 'sign', title: 'Your sign', sub: SUN.name },
  { id: 'sky', title: 'Today’s sky', sub: 'Venus ℞ · Oct 5' },
  { id: 'calendar', title: 'Calendar', sub: 'October' },
  { id: 'moon', title: 'Moon phase', sub: 'Waning crescent' },
  { id: 'retro', title: 'Retrogrades', sub: 'Venus · since Sat' },
]

const APP_ROWS = [
  { label: 'Notifications', right: '3 new' },
  { label: 'Settings', right: '' },
  { label: 'Help & support', right: '' },
]

/** G-05 · You — home. */
export default function You({ go }: ScreenProps) {
  const { alignPlus } = useSession()
  const [card, setCard] = useState<CardSide | null>(null)
  const [tile, setTile] = useState<TileId>('sign')
  const [scrolled, setScrolled] = useState(false)
  const rowRef = useRef<HTMLDivElement>(null)

  const openCard = (side: CardSide) => { sfx.flip(); setCard(side) }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora="#3a2390" warm="#4a2470" count={70} seed={44} />
      <style>{`.you-scroll::-webkit-scrollbar{display:none}`}</style>

      <motion.div
        className="you-scroll"
        animate={{ x: card ? -90 : 0, opacity: card ? 0.35 : 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 36 }}
        style={{
          position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none',
          WebkitMaskImage: maskFor(scrolled),
          maskImage: maskFor(scrolled),
        }}
        onScroll={(e) => { const s = e.currentTarget.scrollTop > 6; if (s !== scrolled) setScrolled(s) }}
      >
        <div style={{ position: 'relative', paddingBottom: 112 }}>
          {/* hero */}
          <div style={{ position: 'relative', height: 278 }}>
            <div className="eyebrow" style={{ position: 'absolute', left: 24, top: 64, color: 'var(--label-2)' }}>You · {SUN.name} sun</div>
            <AuraFigure src={SUN.figureImg} width={236} height={198} style={{ left: 77, top: 72 }} />
            <motion.div className="h-display" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}
              style={{ position: 'absolute', top: 226, width: '100%', textAlign: 'center', fontSize: 32, textShadow: '0 2px 18px rgba(11,6,32,0.9)' }}>
              {ME.name}, {ME.age}
            </motion.div>
            <div className="mono" style={{ position: 'absolute', top: 264, width: '100%', textAlign: 'center', fontSize: 9, letterSpacing: '0.1em', fontWeight: 700, color: LIME }}>
              {SUN.name.toUpperCase()} SUN · {MOON.name.toUpperCase()} MOON · {RISING.name.toUpperCase()} RISING
            </div>
          </div>

          {/* your sky */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '18px 24px 8px' }}>
            <span className="eyebrow" style={{ fontSize: 9.5, color: 'var(--label-3)' }}>Your sky</span>
            <button className="eyebrow" onClick={() => { sfx.tap(); rowRef.current?.scrollBy({ left: 230, behavior: 'smooth' }) }}
              style={{ fontSize: 9.5, color: 'var(--label-3)' }}>Scroll for more →</button>
          </div>
          <SkyRow rowRef={rowRef} tile={tile} onTile={(t) => { sfx.tap(); setTile(t); if (t === 'sky' || t === 'moon' || t === 'retro') go('sky'); if (t === 'calendar') go('calendar'); if (t === 'sign') go('chart') }} />

          {/* your card */}
          <div className="eyebrow" style={{ fontSize: 9.5, color: 'var(--label-3)', margin: '18px 24px 8px' }}>Your card</div>
          <motion.div
            role="button"
            onClick={() => openCard('down')}
            initial="rest" animate="rest" whileHover="hover" whileTap="tap"
            variants={{ rest: { y: 0, borderColor: 'rgba(223,227,106,0.35)' }, hover: { y: -2, borderColor: 'rgba(223,227,106,0.7)' }, tap: { scale: 0.98 } }}
            style={{
              position: 'relative', margin: '0 24px', height: 120, borderRadius: 16, cursor: 'pointer',
              background: 'linear-gradient(180deg, rgba(40,26,78,0.85), rgba(30,18,64,0.85))',
              border: '1px solid rgba(223,227,106,0.35)', boxShadow: '0 0 24px rgba(223,227,106,0.06)',
            }}
          >
            <motion.div variants={{ rest: { rotate: -8, x: 0 }, hover: { rotate: -12, x: -3 } }}
              style={{ position: 'absolute', left: 12, top: 12, transformOrigin: '50% 100%' }}>
              <TradeCardBack width={68} />
            </motion.div>
            <motion.div variants={{ rest: { rotate: 3, x: 0, y: 0 }, hover: { rotate: 6, x: 4, y: -2 } }}
              style={{ position: 'absolute', left: 74, top: 8, transformOrigin: '50% 100%' }}>
              <TradeCard width={60} card={{ name: ME.name, age: ME.age, sign: ME.sign, img: SUN.auraImg, serial: ME.serial }} />
            </motion.div>
            <div style={{ position: 'absolute', left: 150, right: 14, top: 14 }}>
              <div className="serif italic" style={{ fontSize: 17, color: 'var(--label-1)', whiteSpace: 'nowrap' }}>
                {ME.name}, {ME.age}&nbsp; · &nbsp;{SUN.name}
              </div>
              <div style={{ marginTop: 4, fontSize: 12, lineHeight: '17px', color: 'var(--label-2)' }}>
                Face down to strangers. It flips the night you both align.
              </div>
            </div>
            <div className="mono" style={{ position: 'absolute', left: 150, right: 12, bottom: 12, display: 'flex', justifyContent: 'space-between', fontSize: 9, letterSpacing: '0.16em', fontWeight: 700 }}>
              <button onClick={(e) => { e.stopPropagation(); openCard('flipped') }} style={{ color: LIME, letterSpacing: 'inherit' }}>EDIT CARD ›</button>
              <button onClick={(e) => { e.stopPropagation(); sfx.tap() }} style={{ color: 'var(--label-3)', letterSpacing: 'inherit' }}>BLOCKED · 2 ›</button>
            </div>
          </motion.div>

          {/* Align+ */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '22px 0 0' }}>
            {alignPlus ? (
              <motion.button className="chrome-cta" whileHover={{ scale: 1.02 }} onClick={() => sfx.sparkle()}>
                <span style={{
                  width: 22, height: 22, borderRadius: 11, display: 'grid', placeItems: 'center',
                  background: 'var(--gold-foil)', boxShadow: '0 0 10px rgba(242,199,92,0.7)',
                }}>
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none" stroke="#3a2a08" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1.5 5.2 4.5 8 10.5 1.8" /></svg>
                </span>
                Align+ · Active <span className="spark">✦</span>
              </motion.button>
            ) : (
              <motion.button className="chrome-cta" whileHover={{ scale: 1.02 }} onClick={() => { sfx.tap(); go('paywall') }}>
                Align+ · Founding member <span className="spark">✦</span>
              </motion.button>
            )}
          </div>

          {/* app */}
          <div className="eyebrow" style={{ fontSize: 9.5, color: 'var(--label-3)', margin: '24px 24px 8px' }}>App</div>
          <div style={{
            margin: '0 24px', borderRadius: 16, overflow: 'hidden',
            background: 'rgba(30,18,64,0.82)', border: '1px solid rgba(179,166,196,0.16)',
          }}>
            {APP_ROWS.map((r, i) => (
              <motion.button key={r.label} onClick={() => sfx.tap()}
                whileHover={{ backgroundColor: 'rgba(52,35,95,0.6)' }} whileTap={{ backgroundColor: 'rgba(52,35,95,0.9)' }}
                style={{
                  width: '100%', height: 46, display: 'flex', alignItems: 'center', padding: '0 14px 0 16px', textAlign: 'left',
                  borderTop: i ? '1px solid rgba(179,166,196,0.12)' : undefined, backgroundColor: 'rgba(52,35,95,0)',
                }}>
                <span style={{ flex: 1, fontSize: 15, color: 'var(--label-1)' }}>{r.label}</span>
                {r.right && <span style={{ fontSize: 13, color: 'var(--label-2)', marginRight: 10 }}>{r.right}</span>}
                <Chevron />
              </motion.button>
            ))}
          </div>
          <div className="mono" style={{ textAlign: 'center', margin: '18px 0 0', fontSize: 8.5, letterSpacing: '0.2em', color: 'var(--label-4)' }}>
            ALIGN · {ME.serial} · FOUNDING DECK
          </div>
        </div>
      </motion.div>

      <TabBar active="you" go={go} />

      <AnimatePresence>
        {card && <YourCardSheet key="card" initial={card} onClose={() => setCard(null)} />}
      </AnimatePresence>
    </div>
  )
}

function Chevron() {
  return (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" stroke="var(--label-3)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="m1 1 5 5-5 5" />
    </svg>
  )
}

/** Horizontal tile row — scrolls with trackpad, mouse drag, or the "Scroll for more" link. */
function SkyRow({ rowRef, tile, onTile }: { rowRef: React.RefObject<HTMLDivElement | null>; tile: TileId; onTile: (t: TileId) => void }) {
  const drag = useRef({ down: false, x: 0, left: 0, moved: false })
  return (
    <div
      ref={rowRef}
      className="you-scroll"
      onPointerDown={(e) => { drag.current = { down: true, x: e.clientX, left: rowRef.current?.scrollLeft ?? 0, moved: false } }}
      onPointerMove={(e) => {
        const d = drag.current
        if (!d.down || !rowRef.current) return
        const dx = e.clientX - d.x
        if (Math.abs(dx) > 4) d.moved = true
        if (d.moved) rowRef.current.scrollLeft = d.left - dx
      }}
      onPointerUp={() => { drag.current.down = false }}
      onPointerLeave={() => { drag.current.down = false }}
      onClickCapture={(e) => { if (drag.current.moved) { e.stopPropagation(); drag.current.moved = false } }}
      style={{ display: 'flex', gap: 10, overflowX: 'auto', scrollbarWidth: 'none', padding: '2px 24px 4px', overscrollBehaviorX: 'contain' }}
    >
      {TILES.map((t) => {
        const on = t.id === tile
        return (
          <motion.button key={t.id} onClick={() => onTile(t.id)}
            whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}
            animate={{ borderColor: on ? 'rgba(223,227,106,0.75)' : 'rgba(179,166,196,0.18)', backgroundColor: on ? 'rgba(52,35,95,0.9)' : 'rgba(30,18,64,0.82)' }}
            style={{
              flex: '0 0 104px', height: 108, borderRadius: 14, border: '1px solid', display: 'flex', flexDirection: 'column', alignItems: 'center',
              boxShadow: on ? '0 0 18px rgba(223,227,106,0.12)' : 'none',
            }}>
            <div style={{ marginTop: 10, width: 46, height: 46 }}><TileArt id={t.id} /></div>
            <div className="serif italic" style={{ marginTop: 8, fontSize: 15, color: 'var(--label-1)' }}>{t.title}</div>
            <div style={{ marginTop: 2, fontSize: 10.5, color: 'var(--label-2)', whiteSpace: 'nowrap' }}>{t.sub}</div>
          </motion.button>
        )
      })}
    </div>
  )
}

function TileArt({ id }: { id: TileId }) {
  const box: React.CSSProperties = { width: 46, height: 46, borderRadius: 11, overflow: 'hidden', position: 'relative', background: '#120a2a', display: 'grid', placeItems: 'center' }
  if (id === 'sign') {
    return (
      <div style={box}>
        <img src={SUN.auraImg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <span style={{ position: 'relative', top: 6, fontSize: 15, color: '#f6efa0', textShadow: '0 0 8px #e9e36a' }}>{SUN.glyph}&#xFE0E;</span>
      </div>
    )
  }
  if (id === 'sky') {
    return (
      <div style={box}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} style={{
          width: 32, height: 32, borderRadius: 16,
          background: 'radial-gradient(circle at 35% 30%, #fff1c4 0%, #f2c75c 35%, #a0661f 75%, #4a2a10 100%)',
          boxShadow: '0 0 14px rgba(242,199,92,0.55)',
        }} />
      </div>
    )
  }
  if (id === 'calendar') {
    return (
      <div style={box}>
        <div style={{ width: 28, height: 28, borderRadius: 14, boxShadow: 'inset -8px 3px 0 0 #efe6d6', transform: 'rotate(-20deg)', filter: 'drop-shadow(0 0 6px rgba(239,230,214,0.6))' }} />
      </div>
    )
  }
  if (id === 'moon') {
    return (
      <div style={box}>
        <div style={{ width: 28, height: 28, borderRadius: 14, background: 'radial-gradient(circle at 60% 45%, #efe6d6 0 55%, #3a2c58 56%)', boxShadow: '0 0 12px rgba(239,230,214,0.35)' }} />
      </div>
    )
  }
  return (
    <div style={box}>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <circle cx="15" cy="15" r="11" stroke="rgba(127,216,176,0.5)" strokeDasharray="2 3" />
        <circle cx="15" cy="15" r="4" fill="#7fd8b0" style={{ filter: 'drop-shadow(0 0 4px #7fd8b0)' }} />
        <path d="M24 9a11 11 0 0 1 1 9" stroke="#7fd8b0" strokeWidth="1.5" strokeLinecap="round" />
        <path d="m25.5 17.5-.5 2-1.8-1" stroke="#7fd8b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
