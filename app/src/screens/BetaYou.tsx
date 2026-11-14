import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import TabBar from '../components/TabBar'
import ProfileCard from '../components/deck/ProfileCard'
import { CARD_W, CARD_H } from '../components/deck/fx'
import YourCardSheet, { type CardSide } from '../components/you/YourCardSheet'
import { myProfile } from '../components/you/myCard'
import { useAccount } from '../pages/account/store'
import { ME } from '../data/profiles'
import { SIGNS } from '../data/signs'
import { cosmicMonth } from '../data/cosmicMonth'
import { sfx } from '../lib/sfx'
import { useSession } from '../lib/session'
import { openCalendarOn } from '../components/you/origin'
import SkySpread from '../components/sky/SkySpread'
import MoonPhase from '../components/sky/MoonPhase'
import { TODAY_READING } from '../data/skyReading'
import { useTalk } from '../lib/talk'
import CardFrame from '../components/CardFrame'
import { PARTS } from '../components/you/parts'
import { Chevron, ResetRow, SwitchRows } from './You'

const SUN = SIGNS[ME.sign]
const SCALE = 0.52
/** width of one reading card in the swipe rail, and the gap between cards */
const RAIL_W = 262
const RAIL_GAP = 10

/** one surface for every panel on this screen */
const PANEL: React.CSSProperties = { borderRadius: 18, background: 'rgba(30,18,64,0.72)', border: '1px solid rgba(179,166,196,0.16)' }
const LABEL: React.CSSProperties = { fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--label-3)' }

/**
 * Your profile (beta), top to bottom:
 *   your card (both sides) · name · the six parts of your chart as tags
 *   three actions: edit card, aura photo, block signs
 *   today's horoscope, one row that opens into the three cards
 *   your chart, as small cards you swipe through
 *   one list for everything else
 */
export default function BetaYou({ go }: ScreenProps) {
  const { card: edits } = useAccount()
  const me = useMemo(() => myProfile({ ...edits, facts: edits.facts.map(([k, v]) => [k, v] as [string, string]) }), [edits])
  const { blockedSigns } = useSession()
  const [sheet, setSheet] = useState<CardSide | null>(null)
  const [part, setPart] = useState(0)
  const [skyOpen, setSkyOpen] = useState(false)
  const skyDrawn = useTalk().skyDays.includes(TODAY_READING.date)
  const moon = useMemo(() => { const d = new Date(); return cosmicMonth(d).days[d.getDate() - 1].moon }, [])
  const rail = useRef<HTMLDivElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const toPart = (i: number, scrollPage = false) => {
    setPart(i)
    rail.current?.scrollTo({ left: i * (RAIL_W + RAIL_GAP), behavior: 'smooth' })
    if (scrollPage) chartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  const onRail = () => { const el = rail.current; if (el) setPart(Math.max(0, Math.min(PARTS.length - 1, Math.round(el.scrollLeft / (RAIL_W + RAIL_GAP))))) }
  const open = (side: CardSide) => { sfx.flip(); setSheet(side) }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora="#3a2390" warm="#4a2470" count={70} seed={44} />
      <motion.div className="no-scrollbar" animate={{ x: sheet ? -90 : 0, opacity: sheet ? 0.35 : 1 }} transition={{ type: 'spring', stiffness: 320, damping: 36 }}
        style={{
          position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none',
          maskImage: 'linear-gradient(to bottom, transparent 0, transparent 40px, #000 64px, #000 calc(100% - 118px), transparent calc(100% - 84px))',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0, transparent 40px, #000 64px, #000 calc(100% - 118px), transparent calc(100% - 84px))',
        }}>
        <div style={{ position: 'relative', padding: '56px 24px 124px', display: 'flex', flexDirection: 'column' }}>

          {/* header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 40 }}>
            <span className="h-display" style={{ fontSize: 28 }}>You</span>
            <button aria-label="Settings" onClick={() => { sfx.tap(); go('x/settings') }} style={{ width: 40, height: 40, marginRight: -8, display: 'grid', placeItems: 'center', color: 'var(--label-2)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
              </svg>
            </button>
          </div>

          <div style={{ marginTop: 10 }}>
          {/* your card: face down as strangers see it, your aura photo tucked behind */}
          <div style={{ position: 'relative', height: CARD_H * SCALE + 14, marginTop: -6 }}>
            <motion.button aria-label="Your photo, flipped side" onClick={() => open('flipped')} whileTap={{ scale: 0.97 }}
              initial={{ rotate: 10, x: 40 }} animate={{ rotate: 9, x: 70 }} transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.15 }}
              style={{ position: 'absolute', left: '50%', top: 12, marginLeft: -(CARD_W * SCALE) / 2, width: CARD_W * SCALE * 0.86, height: CARD_H * SCALE * 0.9, borderRadius: 14, overflow: 'hidden',
                border: `2px solid ${SUN.color}`, boxShadow: `0 0 24px ${SUN.color}66, 0 16px 30px rgba(0,0,0,0.5)`, background: '#07040f' }}>
              <img src={ME.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%' }} />
            </motion.button>
            <motion.button aria-label="Your card, face down" onClick={() => open('down')} whileTap={{ scale: 0.97 }}
              initial={{ rotate: -2, x: 0 }} animate={{ rotate: -4, x: -26 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{ position: 'absolute', left: '50%', top: 0, marginLeft: -(CARD_W * SCALE) / 2, width: CARD_W * SCALE, height: CARD_H * SCALE }}>
              <div style={{ width: CARD_W, height: CARD_H, transform: `scale(${SCALE})`, transformOrigin: '0 0', pointerEvents: 'none' }}>
                <ProfileCard profile={me} glow />
              </div>
            </motion.button>
          </div>

          </div>
          <div className="mono" style={{ ...LABEL, fontSize: 8.5, textAlign: 'center', marginTop: 8 }}>TAP · FACE DOWN AND AFTER THE REVEAL</div>

          {/* name and the six parts of you */}
          <div style={{ textAlign: 'center', marginTop: 14 }}>
            <div className="h-display" style={{ fontSize: 34, lineHeight: 1.05 }}>{ME.name}, {ME.age}</div>
          </div>
          <div role="tablist" aria-label="Your chart" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginTop: 14 }}>
            {PARTS.map((o, i) => {
              const on = i === part
              return (
                <button key={o.word} role="tab" aria-selected={on} onClick={() => { sfx.tap(); toPart(i, true) }}
                  style={{ height: 44, borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1,
                    border: `1px solid color-mix(in srgb, ${o.ink} ${on ? 80 : 35}%, transparent)`, background: `color-mix(in srgb, ${o.ink} ${on ? 22 : 8}%, rgba(20,12,40,0.6))`, transition: 'background 0.2s, border-color 0.2s' }}>
                  <span className="mono" style={{ fontSize: 8, letterSpacing: '0.16em', fontWeight: 700, color: o.ink }}>{o.word.toUpperCase()}</span>
                  <span style={{ fontSize: 13.5, color: 'var(--label-1)', whiteSpace: 'nowrap' }}>{o.value}</span>
                </button>
              )
            })}
          </div>

          {/* the three things you do with your card */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 18 }}>
            <Action label="Edit card" primary onClick={() => go('x/edit-card/down')}
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h4L19 9l-4-4L4 16v4Z" /><path d="m13.5 6.5 4 4" /></svg>} />
            <Action label="Aura photo" onClick={() => go('x/aura-photo')}
              icon={<img src={ME.photo} alt="" style={{ width: 22, height: 22, borderRadius: 11, objectFit: 'cover', boxShadow: `0 0 8px ${SUN.color}` }} />} />
            <Action label={blockedSigns.length ? `Blocked · ${blockedSigns.length}` : 'Block signs'} onClick={() => go('block')}
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff8aa0" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="8.5" /><path d="M6 6l12 12" /></svg>} />
          </div>

          {/* today's horoscope: one row, opens into the three cards */}
          <div style={{ ...PANEL, marginTop: 22, overflow: 'hidden' }}>
            <button aria-expanded={skyOpen} onClick={() => { sfx.tap(); setSkyOpen((o) => !o) }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', textAlign: 'left' }}>
              <MoonPhase size={30} lit={moon.lit} waxing={moon.waxing} />
              <span style={{ flex: 1, minWidth: 0 }}>
                <span className="mono" style={{ ...LABEL, display: 'block', fontSize: 8.5 }}>TODAY’S HOROSCOPE · {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}</span>
                <span className="serif italic" style={{ display: 'block', fontSize: 17, lineHeight: 1.25, color: 'var(--label-1)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {skyDrawn ? TODAY_READING.cards[0].headline : 'Three cards are waiting'}
                </span>
              </span>
              <motion.svg animate={{ rotate: skyOpen ? 180 : 0 }} width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="var(--label-2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m1 1.5 5 5 5-5" /></motion.svg>
            </button>
            <AnimatePresence initial={false}>
              {skyOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                  <div style={{ borderTop: '1px solid rgba(179,166,196,0.14)', padding: '14px 0 6px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 342, transform: 'scale(0.96)', transformOrigin: '50% 0', marginBottom: -12 }}><SkySpread reward={false} /></div>
                    <button className="mono" onClick={() => { sfx.tap(); openCalendarOn(go, 'you') }} style={{ height: 36, fontSize: 9.5, letterSpacing: '0.16em', color: 'var(--align)' }}>SEE YOUR MONTH ›</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* your chart, as small cards */}
          <div ref={chartRef} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 28 }}>
            <span className="h-display" style={{ fontSize: 24 }}>Your chart</span>
            <span className="mono" style={{ ...LABEL, fontSize: 9 }}>SWIPE · {part + 1}/{PARTS.length}</span>
          </div>
          <div ref={rail} className="no-scrollbar" onScroll={onRail}
            style={{ display: 'flex', gap: RAIL_GAP, overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', margin: '10px -24px 0', padding: '4px 24px 6px', scrollPaddingLeft: 24 }}>
            {PARTS.map((o, i) => (
              <button key={o.word} onClick={() => { if (i !== part) { sfx.tap(); toPart(i) } }}
                style={{ flex: `0 0 ${RAIL_W}px`, scrollSnapAlign: 'start', textAlign: 'left', display: 'flex' }}>
                <CardFrame tint={o.ink} quiet={i !== part} radius={18} padding="14px 16px 14px" style={{ width: '100%', height: 262 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div className="mono" style={{ fontSize: 9, letterSpacing: '0.18em', fontWeight: 700, color: o.ink, whiteSpace: 'nowrap' }}>{o.word.toUpperCase()} · {o.value.toUpperCase()}</div>
                    <div style={{ fontSize: 12, color: 'var(--label-3)', marginTop: 2 }}>{o.plain}</div>
                    <div className="serif italic" style={{ fontSize: 21, lineHeight: 1.15, color: 'var(--label-1)', marginTop: 8 }}>{o.read.headline}</div>
                    <div style={{ fontSize: 13.5, lineHeight: 1.42, color: 'var(--label-2)', marginTop: 8, flex: 1, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{o.read.love}</div>
                    <div style={{ borderTop: '1px solid rgba(179,166,196,0.16)', paddingTop: 9, marginTop: 8 }}>
                      <span className="mono" style={{ fontSize: 8.5, letterSpacing: '0.18em', fontWeight: 700, color: o.ink }}>TRY </span>
                      <span className="serif italic" style={{ fontSize: 14.5, color: 'var(--label-1)' }}>{o.read.tryLine}</span>
                    </div>
                  </div>
                </CardFrame>
              </button>
            ))}
          </div>
          <div aria-hidden style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 8 }}>
            {PARTS.map((o, i) => <span key={o.word} style={{ width: i === part ? 16 : 6, height: 6, borderRadius: 3, background: i === part ? o.ink : 'rgba(179,166,196,0.3)', transition: 'width 0.2s' }} />)}
          </div>

          {/* everything else, in one list */}
          <div style={{ ...PANEL, overflow: 'hidden', marginTop: 24 }}>
            <Link label={`More about ${SUN.name}`} sub="Element, planet and the quick facts" onClick={() => go('chart')} first />
            <Link label="Cosmic calendar" sub="Your whole month in the sky" onClick={() => openCalendarOn(go, 'you')} />
            <Link label="The language" sub="Every astro word in plain English" onClick={() => go('x/glossary')} />
            <Link label="Settings" onClick={() => go('x/settings')} />
            <Link label="Help & support" onClick={() => go('x/help')} />
          </div>

          {/* demo tools: play as another founder, start over */}
          <div className="mono" style={{ ...LABEL, marginTop: 24, marginBottom: 8 }}>DEMO</div>
          <div style={{ ...PANEL, overflow: 'hidden' }}>
            <SwitchRows />
            <ResetRow />
          </div>

          <div className="mono" style={{ textAlign: 'center', fontSize: 8.5, letterSpacing: '0.2em', color: 'var(--label-4)', marginTop: 20 }}>ALIGN · {ME.serial} · BETA</div>
        </div>
      </motion.div>

      <TabBar active="you" go={go} />

      <AnimatePresence>
        {sheet && <YourCardSheet key="card" initial={sheet} onClose={() => setSheet(null)} onEdit={(side) => go(`x/edit-card/${side}`)} />}
      </AnimatePresence>
    </div>
  )
}

/** one of the three actions under your name: same size, icon over label */
function Action({ label, icon, onClick, primary }: { label: string; icon: React.ReactNode; onClick: () => void; primary?: boolean }) {
  return (
    <motion.button whileTap={{ scale: 0.96 }} onClick={() => { sfx.tap(); onClick() }}
      style={{ height: 68, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
        color: primary ? 'var(--chrome-ink)' : 'var(--label-1)',
        background: primary ? 'var(--chrome)' : 'rgba(30,18,64,0.72)',
        border: primary ? 'none' : '1px solid rgba(179,166,196,0.22)',
        boxShadow: primary ? '0 0 18px rgba(248,237,255,0.25)' : 'none' }}>
      {icon}
      <span style={{ fontSize: 13, fontWeight: 500 }}>{label}</span>
    </motion.button>
  )
}

function Link({ label, sub, onClick, first }: { label: string; sub?: string; onClick: () => void; first?: boolean }) {
  return (
    <motion.button onClick={() => { sfx.tap(); onClick() }} whileTap={{ backgroundColor: 'rgba(52,35,95,0.9)' }}
      style={{ width: '100%', minHeight: 48, display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px 10px 16px', textAlign: 'left', borderTop: first ? undefined : '1px solid rgba(179,166,196,0.12)' }}>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: 15, color: 'var(--label-1)' }}>{label}</span>
        {sub && <span style={{ display: 'block', fontSize: 12, color: 'var(--label-2)', marginTop: 2 }}>{sub}</span>}
      </span>
      <Chevron />
    </motion.button>
  )
}
