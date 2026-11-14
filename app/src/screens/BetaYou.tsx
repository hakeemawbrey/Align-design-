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
import { MOON_NOW } from '../data/sky'
import { COSMIC_COLOR, cosmicMonth, type CosmicEvent } from '../data/cosmicMonth'
import { sfx } from '../lib/sfx'
import { openCalendarOn } from '../components/you/origin'
import CardFrame, { CardOrb } from '../components/CardFrame'
import { Planet } from '../components/onboarding/shared'
import { PARTS, Reading } from '../components/you/parts'
import { Chevron, ResetRow, SwitchRows } from './You'

const SUN = SIGNS[ME.sign]
const SCALE = 0.4

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
  const [sheet, setSheet] = useState<CardSide | null>(null)
  const [part, setPart] = useState(0)
  const sel = PARTS[part]
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

          {/* you: your card, your name, the two things you do here */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: -4 }}>
            <motion.button aria-label="Your card, as others see it" onClick={() => open('down')} whileTap={{ scale: 0.97 }}
              initial={{ rotate: 0 }} animate={{ rotate: -3 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{ width: CARD_W * SCALE, height: CARD_H * SCALE, flexShrink: 0 }}>
              <div style={{ width: CARD_W, height: CARD_H, transform: `scale(${SCALE})`, transformOrigin: '0 0', pointerEvents: 'none' }}>
                <ProfileCard profile={me} glow />
              </div>
            </motion.button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="h-display" style={{ fontSize: 32, lineHeight: 1.05 }}>{ME.name}, {ME.age}</div>
              <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.16em', color: SUN.light, marginTop: 6 }}>{SUN.name.toUpperCase()} {SUN.glyph} · {ME.serial}</div>
              <div style={{ fontSize: 12.5, lineHeight: 1.35, color: 'var(--label-2)', marginTop: 6 }}>This is the card people see in the deck. Tap it to look.</div>
              <motion.button className="chrome-cta" whileTap={{ scale: 0.97 }} onClick={() => { sfx.tap(); go('x/edit-card/down') }}
                style={{ width: '100%', height: 44, fontSize: 17, marginTop: 12 }}>
                Edit card
              </motion.button>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => { sfx.tap(); go('x/aura-photo') }}
                style={{ width: '100%', height: 44, marginTop: 8, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, color: 'var(--label-1)', border: '1px solid rgba(248,237,255,0.35)', background: 'rgba(52,35,95,0.55)' }}>
                <img src={ME.photo} alt="" style={{ width: 24, height: 24, borderRadius: 12, objectFit: 'cover', boxShadow: `0 0 10px ${SUN.color}` }} />
                <span className="serif italic" style={{ fontSize: 17 }}>Aura photo</span>
              </motion.button>
            </div>
          </div>

          {/* learn about yourself: six parts of your chart, one card at a time */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <span className="eyebrow" style={EYEBROW}>Learn about yourself</span>
              <div className="h-display" style={{ fontSize: 26, lineHeight: 1.1, marginTop: 6 }}>You’re more than one sign.</div>
            </div>
            <div role="tablist" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {PARTS.map((o, i) => {
                const on = i === part
                return (
                  <motion.button key={o.word} role="tab" aria-selected={on} onClick={() => { if (!on) { sfx.tap(); setPart(i) } }} whileTap={{ scale: 0.96 }}>
                    <CardFrame tint={o.ink} quiet={!on} thick={on ? 3 : 2} radius={14} padding="8px 4px 9px" style={{ height: '100%' }}>
                      <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <span style={{ height: 30, display: 'grid', placeItems: 'center', opacity: on ? 1 : 0.7 }}>
                          <Planet size={o.size * 0.6} color={o.color} light={o.light} dark={o.dark} ring={o.ring} glow={on ? 0.75 : 0.3} />
                        </span>
                        <span className="mono" style={{ fontSize: 9, letterSpacing: '0.16em', fontWeight: 700, color: on ? o.ink : 'var(--label-2)' }}>{o.word.toUpperCase()}</span>
                        <span className="serif italic" style={{ fontSize: 16, lineHeight: 1.1, color: 'var(--label-1)' }}>{o.value}</span>
                      </span>
                    </CardFrame>
                  </motion.button>
                )
              })}
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={sel.word} role="tabpanel" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
                <CardFrame tint={sel.ink} kicker={`${sel.word === 'House' ? `${sel.value} house` : `${sel.word} in ${sel.value}`} · ${sel.plain}`} title={sel.read.headline}
                  orb={<CardOrb tint={sel.ink}>{sel.glyph}</CardOrb>}
                  strip={{ label: 'Try this', text: sel.read.tryLine }} footer={['Align · your chart', `${sel.word} · ${part + 1}/${PARTS.length}`]}>
                  <Reading t={sel.read} go={go} />
                </CardFrame>
              </motion.div>
            </AnimatePresence>
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
