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
import { MOON_NOW } from '../data/sky'
import { COSMIC_COLOR, cosmicMonth, type CosmicEvent } from '../data/cosmicMonth'
import { sfx } from '../lib/sfx'
import { useSession } from '../lib/session'
import { openCalendarOn } from '../components/you/origin'
import SkySpread from '../components/sky/SkySpread'
import { SkyCardBack } from '../components/sky/SkyCardFace'
import { TODAY_READING } from '../data/skyReading'
import { useTalk } from '../lib/talk'
import CardFrame, { CardOrb } from '../components/CardFrame'
import { PARTS } from '../components/you/parts'
import { Chevron, ResetRow, SwitchRows } from './You'

const SUN = SIGNS[ME.sign]
const SCALE = 0.58
/** width of one reading card in the swipe rail */
const RAIL_W = 268

const PANEL: React.CSSProperties = { borderRadius: 18, background: 'rgba(30,18,64,0.82)', border: '1px solid rgba(179,166,196,0.16)' }
const EYEBROW: React.CSSProperties = { fontSize: 9.5, color: 'var(--label-3)', letterSpacing: '0.2em' }

/** the next few sky events from today, running into next month if this one is nearly over */
function upcoming(n: number): (CosmicEvent & { date: Date })[] {
  const now = new Date()
  const months = [cosmicMonth(now), cosmicMonth(new Date(now.getFullYear(), now.getMonth() + 1, 1))]
  return months.flatMap((m) => m.events.map((e) => ({ ...e, date: new Date(m.year, m.month, e.day) })))
    .filter((e) => e.date >= new Date(now.getFullYear(), now.getMonth(), now.getDate()))
    .slice(0, n)
}

/** Your profile (beta): you and your card, then six tabs that teach you about yourself, your month, the app. */
export default function BetaYou({ go }: ScreenProps) {
  const { card: edits } = useAccount()
  const me = useMemo(() => myProfile({ ...edits, facts: edits.facts.map(([k, v]) => [k, v] as [string, string]) }), [edits])
  const { blockedSigns } = useSession()
  const [sheet, setSheet] = useState<CardSide | null>(null)
  const [part, setPart] = useState(0)
  const [skyOpen, setSkyOpen] = useState(false)
  const skyDrawn = useTalk().skyDays.includes(TODAY_READING.date)
  const rail = useRef<HTMLDivElement>(null)
  const toPart = (i: number) => { setPart(i); rail.current?.scrollTo({ left: i * (RAIL_W + 12), behavior: 'smooth' }) }
  const onRail = () => { const el = rail.current; if (el) setPart(Math.max(0, Math.min(PARTS.length - 1, Math.round(el.scrollLeft / (RAIL_W + 12))))) }
  const events = useMemo(() => upcoming(3), [])
  const open = (side: CardSide) => { sfx.flip(); setSheet(side) }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora="#3a2390" warm="#4a2470" count={70} seed={44} />
      <motion.div className="no-scrollbar" animate={{ x: sheet ? -90 : 0, opacity: sheet ? 0.35 : 1 }} transition={{ type: 'spring', stiffness: 320, damping: 36 }}
        style={{
          position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none',
          // fade under the status bar and above the tab bar instead of a hard cut
          maskImage: 'linear-gradient(to bottom, transparent 0, transparent 40px, #000 64px, #000 calc(100% - 118px), transparent calc(100% - 84px))',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0, transparent 40px, #000 64px, #000 calc(100% - 118px), transparent calc(100% - 84px))',
        }}>
        <div style={{ position: 'relative', padding: '58px 24px 120px', display: 'flex', flexDirection: 'column', gap: 22 }}>

          {/* header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="eyebrow" style={EYEBROW}>Your profile</span>
            <button aria-label="Settings" onClick={() => { sfx.tap(); go('x/settings') }} style={{ width: 40, height: 40, margin: '-8px -8px -8px 0', display: 'grid', placeItems: 'center', color: 'var(--label-2)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
              </svg>
            </button>
          </div>

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

          {/* name, then the three things you do here */}
          <div style={{ textAlign: 'center', marginTop: -8 }}>
            <div className="h-display" style={{ fontSize: 34 }}>{ME.name}, {ME.age}</div>
            <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.16em', color: SUN.light, marginTop: 6 }}>{SUN.name.toUpperCase()} {SUN.glyph} · {ME.serial}</div>
            <div style={{ fontSize: 12.5, color: 'var(--label-2)', marginTop: 6 }}>Tap a card: face down is what strangers see, flipped is after the reveal.</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <motion.button className="chrome-cta" whileTap={{ scale: 0.97 }} onClick={() => { sfx.tap(); go('x/edit-card/down') }}
                style={{ flex: 1, width: 'auto', height: 50, fontSize: 18 }}>
                Edit card
              </motion.button>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => { sfx.tap(); go('x/aura-photo') }}
                style={{ flex: 1, height: 50, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, color: 'var(--label-1)', border: '1px solid rgba(248,237,255,0.35)', background: 'rgba(52,35,95,0.55)' }}>
                <img src={ME.photo} alt="" style={{ width: 26, height: 26, borderRadius: 13, objectFit: 'cover', boxShadow: `0 0 10px ${SUN.color}` }} />
                <span className="serif italic" style={{ fontSize: 18 }}>Aura photo</span>
              </motion.button>
            </div>
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => { sfx.tap(); go('block') }}
              style={{ width: '100%', height: 50, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: 'var(--label-1)', border: '1px solid rgba(255,138,160,0.55)', background: 'rgba(84,28,56,0.45)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff8aa0" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M5.6 5.6l12.8 12.8" /></svg>
              <span className="serif italic" style={{ fontSize: 18 }}>Block a sign</span>
              <span className="mono" style={{ fontSize: 9.5, letterSpacing: '0.14em', color: 'var(--label-2)' }}>
                {blockedSigns.length ? `· ${blockedSigns.map((x) => SIGNS[x].glyph).join(' ')}` : '· NONE BLOCKED'}
              </span>
            </motion.button>
          </div>

          {/* today's horoscope, kept small: one row that opens into the three cards */}
          <CardFrame tint="#c9bedb" quiet={!skyOpen} padding="0" radius={18}>
            <button aria-expanded={skyOpen} onClick={() => { sfx.tap(); setSkyOpen((o) => !o) }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px 10px 12px', textAlign: 'left' }}>
              <span style={{ display: 'flex', flexShrink: 0 }}>
                {TODAY_READING.cards.map((c, i) => (
                  <span key={c.slot} style={{ marginLeft: i ? -10 : 0, transform: `rotate(${(i - 1) * 7}deg)`, borderRadius: 4, boxShadow: '0 2px 6px rgba(0,0,0,0.5)' }}><SkyCardBack slot={c.slot} width={26} /></span>
                ))}
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span className="mono" style={{ display: 'block', fontSize: 9, letterSpacing: '0.18em', color: 'var(--label-3)' }}>TODAY’S HOROSCOPE</span>
                <span className="serif italic" style={{ display: 'block', fontSize: 17, lineHeight: 1.2, color: 'var(--label-1)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {skyDrawn ? TODAY_READING.cards[0].headline : 'Draw your three cards'}
                </span>
              </span>
              <motion.svg animate={{ rotate: skyOpen ? 180 : 0 }} width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="var(--align)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m1 1.5 5 5 5-5" /></motion.svg>
            </button>
            <AnimatePresence initial={false}>
              {skyOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                  <div style={{ padding: '8px 0 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, borderTop: '1px solid rgba(179,166,196,0.14)' }}>
                    <div style={{ width: 342, transform: 'scale(0.94)', transformOrigin: '50% 0', marginBottom: -24 }}><SkySpread reward={false} /></div>
                    <button className="mono" onClick={() => { sfx.tap(); openCalendarOn(go, 'you') }} style={{ height: 32, fontSize: 9.5, letterSpacing: '0.16em', color: 'var(--align)' }}>SEE THIS MONTH ›</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardFrame>

          {/* learn about yourself: six parts of your chart, one card at a time */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <span className="eyebrow" style={EYEBROW}>Learn about yourself</span>
              <div className="h-display" style={{ fontSize: 26, lineHeight: 1.1, marginTop: 6 }}>You’re more than one sign.</div>
            </div>
            {/* the six, as little tags: tap one to jump to its card */}
            <div role="tablist" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {PARTS.map((o, i) => {
                const on = i === part
                return (
                  <button key={o.word} role="tab" aria-selected={on} onClick={() => { sfx.tap(); toPart(i) }} className="chip"
                    style={{ height: 30, padding: '0 11px', gap: 6, fontSize: 12.5, color: on ? '#1a0f2e' : 'var(--label-1)', borderColor: on ? o.ink : `color-mix(in srgb, ${o.ink} 55%, transparent)`, background: on ? o.ink : `color-mix(in srgb, ${o.ink} 12%, transparent)`, transition: 'background 0.2s, color 0.2s' }}>
                    <span className="mono" style={{ fontSize: 9, letterSpacing: '0.12em', fontWeight: 700, color: on ? '#1a0f2e' : o.ink }}>{o.word.toUpperCase()}</span>
                    {o.value}
                  </button>
                )
              })}
            </div>
            {/* the readings, as little cards you swipe through */}
            <div ref={rail} role="tabpanel" className="no-scrollbar" onScroll={onRail}
              style={{ display: 'flex', gap: 12, overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', margin: '0 -24px', padding: '4px 24px 8px', scrollPaddingLeft: 24, WebkitOverflowScrolling: 'touch' }}>
              {PARTS.map((o, i) => (
                <div key={o.word} style={{ flex: `0 0 ${RAIL_W}px`, scrollSnapAlign: 'start', display: 'flex' }}>
                  <CardFrame tint={o.ink} quiet={i !== part} kicker={`${o.word === 'House' ? `${o.value} house` : `${o.word} in ${o.value}`} · ${o.plain}`} title={o.read.headline}
                    orb={<CardOrb tint={o.ink} size={30}>{o.glyph}</CardOrb>} padding="12px 14px 12px"
                    strip={{ label: 'Try this', text: o.read.tryLine }} footer={['Align · your chart', `${i + 1}/${PARTS.length}`]} style={{ width: '100%' }}>
                    <div className="mono" style={{ fontSize: 9, letterSpacing: '0.18em', fontWeight: 700, color: o.ink }}>IN LOVE</div>
                    <div style={{ fontSize: 14, lineHeight: 1.4, color: 'var(--label-1)', marginTop: 3 }}>{o.read.love}</div>
                    <div className="mono" style={{ fontSize: 9, letterSpacing: '0.18em', fontWeight: 700, color: o.ink, marginTop: 10 }}>FOR YOU</div>
                    <div style={{ fontSize: 14, lineHeight: 1.4, color: 'var(--label-2)', marginTop: 3 }}>{o.read.self}</div>
                  </CardFrame>
                </div>
              ))}
            </div>
            <div aria-hidden style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: -4 }}>
              {PARTS.map((o, i) => <span key={o.word} style={{ width: i === part ? 16 : 6, height: 6, borderRadius: 3, background: i === part ? o.ink : 'rgba(179,166,196,0.3)', transition: 'width 0.2s' }} />)}
            </div>
            <div style={{ ...PANEL, overflow: 'hidden' }}>
              <Link label={`More about ${SUN.name}`} sub="Your element, your planet, the quick facts" onClick={() => go('chart')} first />
              <Link label="The language" sub="Every astro word in plain English" onClick={() => go('x/glossary')} />
            </div>
          </section>

          {/* your month */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="eyebrow" style={EYEBROW}>Your sky this month</span>
              <button className="mono" onClick={() => { sfx.tap(); openCalendarOn(go, 'you') }} style={{ fontSize: 9, letterSpacing: '0.16em', color: 'var(--align)' }}>OPEN CALENDAR ›</button>
            </div>
            <CardFrame tint="#c9bedb" padding="0" footer={['Align · cosmic calendar', new Date().toLocaleDateString('en-US', { month: 'long' })]}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', fontSize: 13, color: 'var(--label-2)' }}>
                <span className="mono" style={{ fontSize: 8.5, letterSpacing: '0.16em', color: 'var(--label-3)' }}>TONIGHT</span>
                {MOON_NOW.phase} in {MOON_NOW.sign} {MOON_NOW.glyph}
              </div>
              {events.map((e, i) => (
                <button key={i} onClick={() => { sfx.tap(); openCalendarOn(go, 'you', e.date) }}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', textAlign: 'left', borderTop: '1px solid rgba(179,166,196,0.12)' }}>
                  <span style={{ width: 38, flexShrink: 0, textAlign: 'center' }}>
                    <span className="mono" style={{ display: 'block', fontSize: 8, letterSpacing: '0.12em', color: 'var(--label-3)' }}>{e.date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}</span>
                    <span className="serif" style={{ display: 'block', fontSize: 20, lineHeight: 1.1, color: 'var(--label-1)' }}>{e.date.getDate()}</span>
                  </span>
                  <span style={{ width: 8, height: 8, borderRadius: 4, flexShrink: 0, background: COSMIC_COLOR[e.kind], boxShadow: `0 0 6px ${COSMIC_COLOR[e.kind]}` }} />
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span className="serif italic" style={{ display: 'block', fontSize: 16, color: 'var(--label-1)' }}>
                      {e.title}{e.yours && <span className="mono" style={{ fontStyle: 'normal', fontSize: 8, letterSpacing: '0.14em', color: 'var(--align)', marginLeft: 6 }}>YOURS</span>}
                    </span>
                    <span style={{ display: 'block', fontSize: 12, lineHeight: 1.35, color: 'var(--label-2)', marginTop: 2 }}>{e.note}</span>
                  </span>
                </button>
              ))}
            </CardFrame>
          </section>

          {/* app */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span className="eyebrow" style={EYEBROW}>App</span>
            <div style={{ ...PANEL, overflow: 'hidden' }}>
              <Link label="Settings" onClick={() => go('x/settings')} first />
              <Link label="Help & support" onClick={() => go('x/help')} />
            </div>
          </section>

          {/* demo tools: play as another founder, start over */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span className="eyebrow" style={EYEBROW}>Demo</span>
            <div style={{ ...PANEL, overflow: 'hidden' }}>
              <SwitchRows />
              <ResetRow />
            </div>
          </section>

          <div className="mono" style={{ textAlign: 'center', fontSize: 8.5, letterSpacing: '0.2em', color: 'var(--label-4)' }}>ALIGN · {ME.serial} · BETA</div>
        </div>
      </motion.div>

      <TabBar active="you" go={go} />

      <AnimatePresence>
        {sheet && <YourCardSheet key="card" initial={sheet} onClose={() => setSheet(null)} onEdit={(side) => go(`x/edit-card/${side}`)} />}
      </AnimatePresence>
    </div>
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
