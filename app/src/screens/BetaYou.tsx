import { useMemo, useState } from 'react'
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
import { SIGN_FACTS } from '../data/signFacts'
import { MOON_NOW } from '../data/sky'
import { COSMIC_COLOR, cosmicMonth, type CosmicEvent } from '../data/cosmicMonth'
import { sfx } from '../lib/sfx'
import { openCalendarOn } from '../components/you/origin'
import { useSession } from '../lib/session'
import SkySpread from '../components/sky/SkySpread'
import MoonPhase from '../components/sky/MoonPhase'
import { TODAY_READING } from '../data/skyReading'
import { useTalk } from '../lib/talk'
import CardFrame, { foil } from '../components/CardFrame'
import { Planet } from '../components/onboarding/shared'
import { PARTS } from '../components/you/parts'
import { Chevron, ResetRow, SwitchRows } from './You'

const SUN = SIGNS[ME.sign]
const FACTS = SIGN_FACTS[ME.sign]
const SCALE = 0.58
/** the hand: card size */
const MW = 80
const MH = 124
const LABEL: React.CSSProperties = { fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--label-3)' }

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

/** Your profile (beta): your card first, then your sign, your month, the app. */
export default function BetaYou({ go }: ScreenProps) {
  const { card: edits } = useAccount()
  const me = useMemo(() => myProfile({ ...edits, facts: edits.facts.map(([k, v]) => [k, v] as [string, string]) }), [edits])
  const [sheet, setSheet] = useState<CardSide | null>(null)
  const { blockedSigns } = useSession()
  const [skyOpen, setSkyOpen] = useState(false)
  const [reader, setReader] = useState<number | null>(null)
  const skyDrawn = useTalk().skyDays.includes(TODAY_READING.date)
  const moon = useMemo(() => { const d = new Date(); return cosmicMonth(d).days[d.getDate() - 1].moon }, [])
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
            <div style={{ display: 'flex', gap: 8 }}>
              <motion.button className="chrome-cta" whileTap={{ scale: 0.96 }} onClick={() => { sfx.tap(); go('x/edit-card/down') }}
                style={{ width: 'auto', height: 38, padding: '0 18px', fontSize: 16 }}>
                Edit card
              </motion.button>
              <motion.button whileTap={{ scale: 0.96 }} onClick={() => { sfx.tap(); go('x/aura-photo') }}
                style={{ height: 38, padding: '0 14px 0 6px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--label-1)', border: '1px solid rgba(248,237,255,0.35)', background: 'rgba(52,35,95,0.55)' }}>
                <img src={ME.photo} alt="" style={{ width: 26, height: 26, borderRadius: 13, objectFit: 'cover', boxShadow: `0 0 10px ${SUN.color}` }} />
                <span className="serif italic" style={{ fontSize: 16 }}>Aura photo</span>
              </motion.button>
            </div>
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

          {/* your name, then your hand: six cards from your birth chart, fanned */}
          <div style={{ textAlign: 'center', marginTop: -8 }}>
            <div className="h-display" style={{ fontSize: 34 }}>{ME.name}, {ME.age}</div>
            <div style={{ fontSize: 12.5, color: 'var(--label-2)', marginTop: 4 }}>Six cards from your birth chart. Tap one to learn it.</div>
          </div>
          <div style={{ position: 'relative', height: MH + 40, marginTop: -8 }}>
            {PARTS.map((o, i) => {
              const k = i - (PARTS.length - 1) / 2
              return (
                <motion.button key={o.word} onClick={() => { sfx.flip(); setReader(i) }} aria-label={`${o.word} in ${o.value}`}
                  initial={{ y: 60, opacity: 0, rotate: 0 }} animate={{ y: k * k * 4, opacity: 1, rotate: k * 7 }}
                  whileHover={{ y: k * k * 4 - 18, zIndex: 10 }} whileTap={{ y: k * k * 4 - 22, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: i * 0.05 }}
                  style={{ position: 'absolute', left: '50%', top: 8, width: MW, height: MH, marginLeft: -MW / 2 + k * 45, zIndex: i, transformOrigin: '50% 120%' }}>
                  <MiniCard o={o} />
                </motion.button>
              )
            })}
          </div>

          {/* today's horoscope, kept small: one row that opens into the three cards */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="eyebrow" style={EYEBROW}>Today’s horoscope</span>
              <span className="mono" style={{ fontSize: 9.5, letterSpacing: '0.16em', color: 'var(--label-2)' }}>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase()}</span>
            </div>
            <div style={{ ...PANEL, overflow: 'hidden' }}>
              <button aria-expanded={skyOpen} onClick={() => { sfx.tap(); setSkyOpen((o) => !o) }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', textAlign: 'left' }}>
                <MoonPhase size={28} lit={moon.lit} waxing={moon.waxing} />
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span className="serif italic" style={{ display: 'block', fontSize: 17, lineHeight: 1.25, color: 'var(--label-1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {skyDrawn ? TODAY_READING.cards[0].headline : 'Three cards are waiting'}
                  </span>
                  <span style={{ display: 'block', fontSize: 12, color: 'var(--label-2)', marginTop: 2 }}>{skyDrawn ? 'Tap to read it again' : 'You · Love · Your move'}</span>
                </span>
                <motion.svg animate={{ rotate: skyOpen ? 180 : 0 }} width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="var(--label-2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m1 1.5 5 5 5-5" /></motion.svg>
              </button>
              <AnimatePresence initial={false}>
                {skyOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                    <div style={{ borderTop: '1px solid rgba(179,166,196,0.14)', padding: '14px 0 4px', display: 'flex', justifyContent: 'center' }}>
                      <div style={{ width: 342, transform: 'scale(0.96)', transformOrigin: '50% 0', marginBottom: -12 }}><SkySpread reward={false} /></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* block a sign */}
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => { sfx.tap(); go('block') }}
            style={{ width: '100%', height: 50, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: 'var(--label-1)', border: '1px solid rgba(255,138,160,0.5)', background: 'rgba(84,28,56,0.4)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff8aa0" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M5.6 5.6l12.8 12.8" /></svg>
            <span className="serif italic" style={{ fontSize: 18 }}>Block a sign</span>
            {blockedSigns.length > 0 && <span className="mono" style={{ fontSize: 9.5, letterSpacing: '0.14em', color: 'var(--label-2)' }}>· {blockedSigns.map((x) => SIGNS[x].glyph).join(' ')}</span>}
          </motion.button>

          {/* your sign */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span className="eyebrow" style={EYEBROW}>Your sign</span>
            <CardFrame tint={SUN.color} padding="0" footer={['Align · your sign', ME.serial]}>
              <button onClick={() => { sfx.tap(); go('chart') }} style={{ width: '100%', display: 'flex', gap: 14, padding: 14, textAlign: 'left', alignItems: 'center' }}>
                <img src={SUN.figureImg} alt="" style={{ width: 64, height: 64, borderRadius: 14, objectFit: 'cover', flexShrink: 0, boxShadow: `0 0 18px ${SUN.color}55` }} />
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span className="mono" style={{ display: 'block', fontSize: 9, letterSpacing: '0.16em', color: SUN.color }}>{SUN.name.toUpperCase()} {SUN.glyph} · {FACTS.dates.toUpperCase()}</span>
                  <span className="serif italic" style={{ display: 'block', fontSize: 18, lineHeight: 1.2, marginTop: 4, color: 'var(--label-1)' }}>Most likely to: {FACTS.likely.replace(/\.$/, '').toLowerCase()}.</span>
                  <span style={{ display: 'block', fontSize: 12, color: 'var(--label-2)', marginTop: 5 }}>{FACTS.element} · {FACTS.mode} · ruled by {FACTS.ruler}</span>
                </span>
              </button>
              <Link label="Learn your sign" sub="Your element, your planet and the quick facts" onClick={() => go('chart')} />
              <Link label="The language" sub="Every astro word in plain English" onClick={() => go('x/glossary')} />
            </CardFrame>
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
        {reader != null && <Reader key="reader" start={reader} onClose={() => setReader(null)} />}
        {sheet && <YourCardSheet key="card" initial={sheet} onClose={() => setSheet(null)} onEdit={(side) => go(`x/edit-card/${side}`)} />}
      </AnimatePresence>
    </div>
  )
}

/** one card in your hand */
function MiniCard({ o }: { o: (typeof PARTS)[number] }) {
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 12, padding: 3, background: foil(o.ink), boxShadow: `0 8px 18px rgba(0,0,0,0.5), 0 0 14px color-mix(in srgb, ${o.ink} 35%, transparent)` }}>
      <div style={{ width: '100%', height: '100%', borderRadius: 9, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '8px 4px 9px',
        background: `radial-gradient(90% 60% at 50% 40%, color-mix(in srgb, ${o.color} 40%, #1b112f), #120b22)` }}>
        <span className="mono" style={{ fontSize: 8, letterSpacing: '0.16em', fontWeight: 700, color: o.ink }}>{o.word.toUpperCase()}</span>
        <Planet size={Math.min(44, o.size)} color={o.color} light={o.light} dark={o.dark} ring={o.ring} glow={0.6} />
        <span className="serif italic" style={{ fontSize: 14, lineHeight: 1.05, color: 'var(--label-1)', textAlign: 'center' }}>{o.value}</span>
      </div>
    </div>
  )
}

/** a card from your hand, big: swipe or tap the arrows for the next one */
function Reader({ start, onClose }: { start: number; onClose: () => void }) {
  const [i, setI] = useState(start)
  const [dir, setDir] = useState(0)
  const o = PARTS[i]
  const to = (n: number) => { if (n < 0 || n >= PARTS.length) return; sfx.flip(); setDir(n > i ? 1 : -1); setI(n) }
  return (
    <motion.div role="dialog" aria-label={`${o.word} in ${o.value}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'rgba(5,2,15,0.86)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}>
      <div aria-hidden style={{ position: 'absolute', left: '50%', top: '42%', width: 420, height: 420, marginLeft: -210, marginTop: -210, borderRadius: '50%', filter: 'blur(50px)', background: `radial-gradient(closest-side, color-mix(in srgb, ${o.ink} 45%, transparent), transparent)`, transition: 'background 0.4s' }} />
      <div className="mono" style={{ position: 'absolute', top: 64, left: 0, right: 0, textAlign: 'center', ...LABEL, color: 'var(--label-2)' }}>YOUR HAND · {i + 1} OF {PARTS.length}</div>
      <AnimatePresence initial={true} mode="popLayout" custom={dir}>
        <motion.div key={o.word} custom={dir}
          initial={{ rotateY: dir === 0 ? 180 : dir * 70, x: dir * 120, opacity: 0, scale: 0.9 }} animate={{ rotateY: 0, x: 0, opacity: 1, scale: 1 }} exit={{ rotateY: dir * -70, x: dir * -120, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.5}
          onDragEnd={(_, d) => { if (d.offset.x < -70) to(i + 1); else if (d.offset.x > 70) to(i - 1) }}
          onClick={(e) => e.stopPropagation()}
          style={{ position: 'absolute', left: 30, right: 30, top: 96, borderRadius: 24, padding: 4, background: foil(o.ink), boxShadow: `0 0 40px color-mix(in srgb, ${o.ink} 45%, transparent), 0 24px 50px rgba(0,0,0,0.6)`, touchAction: 'pan-y' }}>
          <div style={{ borderRadius: 20, padding: '18px 20px 16px', background: 'linear-gradient(180deg, #1d1233, #120b22)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Planet size={o.size + 8} color={o.color} light={o.light} dark={o.dark} ring={o.ring} glow={0.8} />
              <div style={{ minWidth: 0 }}>
                <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.18em', fontWeight: 700, color: o.ink }}>{o.word.toUpperCase()} · {o.value.toUpperCase()}</div>
                <div style={{ fontSize: 13, color: 'var(--label-2)', marginTop: 2 }}>{o.plain}</div>
              </div>
            </div>
            <div className="serif italic" style={{ fontSize: 27, lineHeight: 1.12, color: 'var(--label-1)', marginTop: 14 }}>{o.read.headline}</div>
            <p style={{ margin: '10px 0 0', fontSize: 13.5, lineHeight: 1.45, color: 'var(--label-2)' }}>{o.read.meaning}</p>
            {([['In love', o.read.love], ['For you', o.read.self]] as const).map(([k, v]) => (
              <div key={k} style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(179,166,196,0.16)' }}>
                <div className="mono" style={{ fontSize: 9, letterSpacing: '0.18em', fontWeight: 700, color: o.ink }}>{k.toUpperCase()}</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.42, color: 'var(--label-1)', marginTop: 3 }}>{v}</div>
              </div>
            ))}
            <div style={{ marginTop: 14, borderRadius: 14, padding: '10px 12px', background: `color-mix(in srgb, ${o.ink} 14%, transparent)`, border: `1px solid color-mix(in srgb, ${o.ink} 40%, transparent)` }}>
              <span className="mono" style={{ fontSize: 9, letterSpacing: '0.18em', fontWeight: 700, color: o.ink }}>TRY THIS </span>
              <span className="serif italic" style={{ fontSize: 15.5, color: 'var(--label-1)' }}>{o.read.tryLine}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', left: 30, right: 30, bottom: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button aria-label="Previous card" onClick={() => to(i - 1)} style={{ width: 48, height: 48, borderRadius: 24, display: 'grid', placeItems: 'center', fontSize: 20, color: 'var(--label-1)', opacity: i ? 1 : 0.3, background: 'rgba(52,35,95,0.7)' }}>‹</button>
        <div style={{ display: 'flex', gap: 6 }}>
          {PARTS.map((p, n) => <button key={p.word} aria-label={p.word} onClick={() => to(n)} style={{ width: n === i ? 18 : 7, height: 7, borderRadius: 4, background: n === i ? p.ink : 'rgba(179,166,196,0.35)', transition: 'width 0.2s' }} />)}
        </div>
        <button aria-label="Next card" onClick={() => to(i + 1)} style={{ width: 48, height: 48, borderRadius: 24, display: 'grid', placeItems: 'center', fontSize: 20, color: 'var(--label-1)', opacity: i < PARTS.length - 1 ? 1 : 0.3, background: 'rgba(52,35,95,0.7)' }}>›</button>
      </div>
      <button aria-label="Close" onClick={onClose} style={{ position: 'absolute', right: 14, top: 52, width: 40, height: 40, display: 'grid', placeItems: 'center', fontSize: 22, color: 'var(--label-1)' }}>×</button>
    </motion.div>
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
