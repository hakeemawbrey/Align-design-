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
import { SIGNS, type SignId } from '../data/signs'
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
/** your sun sign, read for yourself: what lights you up, what trips you up, what brings you back to yourself */
const SELF: Record<SignId, { spark: string; clash: string; align: string }> = {
  aries: { spark: 'A fresh start, a dare, someone who says “let’s go” back.', clash: 'Waiting. You push when you’re bored and regret it later.', align: 'Move your body first, then decide. Finish one thing you started.' },
  taurus: { spark: 'Good food, a slow morning, people who do what they said they would.', clash: 'Being rushed or surprised. You dig in instead of saying what’s wrong.', align: 'Say the uncomfortable thing early. Keep one routine that’s only yours.' },
  gemini: { spark: 'A new idea, a quick back-and-forth, two plans at once.', clash: 'Being pinned to one answer. You go quiet by changing the subject.', align: 'Pick one thing and stay with it for an hour. Write it down, then talk.' },
  cancer: { spark: 'Feeling at home with someone. Old songs, cooked meals, being remembered.', clash: 'Feeling left out. You pull back and hope they notice.', align: 'Ask for what you need in plain words. Make your space feel safe.' },
  leo: { spark: 'Being seen doing what you love. Making someone’s day bigger.', clash: 'Being ignored or taken for granted. Pride keeps you from saying it hurt.', align: 'Make something just for you. Give praise without waiting for it back.' },
  virgo: { spark: 'A problem you can fix. A plan that works. Being useful to someone you love.', clash: 'Mess, vagueness and your own inner critic.', align: 'Call it good enough once a day. Let someone help you.' },
  libra: { spark: 'Beauty, good company and a conversation that flows.', clash: 'Conflict and choosing. You say “I don’t mind” when you do.', align: 'Decide first, ask second. Spend time alone so you can hear yourself.' },
  scorpio: { spark: 'Real talk, loyalty and getting to the bottom of something.', clash: 'Half-truths and small talk. You test people instead of asking.', align: 'Say what you feel while it’s small. Let go of one thing you’re holding.' },
  sagittarius: { spark: 'A trip, a big question, a laugh that goes on too long.', clash: 'Being boxed in. You leave before it gets hard.', align: 'Stay through one hard conversation. Keep something on the calendar to look forward to.' },
  capricorn: { spark: 'A goal, a win, quiet respect from people you rate.', clash: 'Wasted time and feeling behind. You work instead of feeling it.', align: 'Rest before you’ve earned it. Tell one person how you’re really doing.' },
  aquarius: { spark: 'A strange idea, a cause, a friend who gets it.', clash: 'Being told how to feel. You go distant when things get close.', align: 'Stay in the room when it’s emotional. Share the odd thought anyway.' },
  pisces: { spark: 'Music, daydreams and people who are gentle with you.', clash: 'Harshness and too much noise. You disappear instead of saying no.', align: 'Say no once this week. Make something with your hands.' },
}
const SELF_ROWS = [
  { k: 'spark', label: 'Spark', color: '#7fe0b4', what: 'What lights you up', why: 'Notice who and what brings this out in you. That’s where your energy comes from.', glyph: '✦' },
  { k: 'clash', label: 'Clash', color: '#ff8fb1', what: 'What trips you up', why: 'Everyone has one. Knowing yours means you can name it before it runs the night.', glyph: '⚡' },
  { k: 'align', label: 'Align', color: '#f2c75c', what: 'What brings you back', why: 'Your reset. Come back to this when you feel off, with or without a match.', glyph: '◎' },
] as const

/** one honest line about your sun sign: what drives you, and the catch */
const INSIGHT: Record<SignId, string> = {
  aries: 'You come alive when you start things. The growth is in staying once the rush wears off.',
  taurus: 'You build trust slowly and keep it for good. Your calm is a strength, as long as it isn’t hiding what you want to say.',
  gemini: 'Your mind needs more than one answer. You feel closest to people who can keep up, and to yourself when you slow down.',
  cancer: 'You remember how everything felt. You protect people before they ask; let someone do that for you.',
  leo: 'You give warmth freely and you notice when it isn’t returned. You shine most when you stop checking who’s watching.',
  virgo: 'You show love by making things better. You’re allowed to be cared for before everything is fixed.',
  libra: 'You see every side, which makes you fair and slow to choose. What you want counts as much as keeping the peace.',
  scorpio: 'You feel everything at full depth and show a little of it. The people worth keeping are the ones you let see the rest.',
  sagittarius: 'You need room, truth and something to look forward to. Freedom feels best when someone’s glad you came back.',
  capricorn: 'You carry more than people know and rarely ask for help. You’re worth more than what you get done.',
  aquarius: 'You think for yourself and guard your space. Letting someone close doesn’t cost you who you are.',
  pisces: 'You feel what the room feels. Your softness is a gift when you remember which feelings are yours.',
}
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
  const [self, setSelf] = useState<number | null>(null)
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
              <div style={{ width: CARD_W, height: CARD_H, transform: `scale(${SCALE})`, transformOrigin: '0 0', pointerEvents: 'none', textAlign: 'left' }}>
                <ProfileCard profile={me} glow />
              </div>
            </motion.button>
            {/* each control sits on the card it changes: the pencil on your card, the camera on your photo */}
            <motion.button aria-label="Edit card" onClick={() => { sfx.tap(); go('x/edit-card/down') }} whileTap={{ scale: 0.88 }}
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.45 }}
              style={{ position: 'absolute', left: 'calc(50% - 129px)', top: 290, width: 38, height: 38, borderRadius: 19, zIndex: 3, display: 'grid', placeItems: 'center',
                color: 'var(--chrome-ink)', background: 'var(--chrome)', boxShadow: '0 0 16px rgba(248,237,255,0.45), 0 4px 10px rgba(0,0,0,0.5)' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h4L19 9l-4-4L4 16v4Z" /><path d="m13.5 6.5 4 4" /></svg>
            </motion.button>
            <motion.button aria-label="Aura photo: take a new one" onClick={() => { sfx.tap(); go('x/aura-photo') }} whileTap={{ scale: 0.88 }}
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.55 }}
              style={{ position: 'absolute', left: 'calc(50% + 97px)', top: 276, width: 38, height: 38, borderRadius: 19, zIndex: 3, display: 'grid', placeItems: 'center', color: '#fff',
                background: 'radial-gradient(circle at 50% 55%, #ffe08a 0%, #ff9a5c 26%, #ff5fa2 48%, #a45cff 70%, #4a8cff 100%)',
                border: '1.5px solid rgba(255,255,255,0.6)', boxShadow: '0 0 16px rgba(255,120,180,0.55), 0 4px 10px rgba(0,0,0,0.5)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 1px 2px rgba(40,10,60,0.6))' }}><path d="M4 8h3l1.6-2.4h6.8L17 8h3v11H4V8Z" /><circle cx="12" cy="13.2" r="3.4" /></svg>
            </motion.button>
          </div>

          {/* your name, then your hand: six cards from your birth chart, fanned */}
          <div style={{ textAlign: 'center', marginTop: -8 }}>
            <div className="h-display" style={{ fontSize: 34 }}>{ME.name}, {ME.age}</div>
            <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.16em', color: SUN.light, marginTop: 8 }}>{SUN.name.toUpperCase()} {SUN.glyph} · {FACTS.element.toUpperCase()}</div>
            <div className="serif italic" style={{ fontSize: 17, lineHeight: 1.3, color: 'var(--label-1)', margin: '6px auto 0', maxWidth: 318 }}>
              {INSIGHT[ME.sign]}
            </div>
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

          {/* you, read like a card: three little cards that open big */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="eyebrow" style={EYEBROW}>About you · {SUN.name}</span>
              <span className="mono" style={{ fontSize: 9, letterSpacing: '0.16em', color: 'var(--label-3)' }}>TAP TO READ</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 9 }}>
              {SELF_ROWS.map((row, i) => (
                <motion.button key={row.k} onClick={() => { sfx.flip(); setSelf(i) }} whileTap={{ scale: 0.95, y: -4 }} aria-label={`${row.label}: ${row.what}`}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.1 + i * 0.06 }}
                  style={{ borderRadius: 16, padding: 3, background: foil(row.color), boxShadow: `0 8px 18px rgba(0,0,0,0.45), 0 0 14px color-mix(in srgb, ${row.color} 30%, transparent)` }}>
                  <span style={{ height: 118, borderRadius: 13, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '10px 6px 11px',
                    background: `radial-gradient(90% 60% at 50% 36%, color-mix(in srgb, ${row.color} 26%, #1b112f), #120b22)` }}>
                    <span className="mono" style={{ fontSize: 9.5, letterSpacing: '0.18em', fontWeight: 700, color: row.color }}>{row.label.toUpperCase()}</span>
                    {row.k === 'align'
                      ? <SeedOfLife size={44} color={row.color} />
                      : <span style={{ fontSize: 30, lineHeight: 1, color: row.color, textShadow: `0 0 16px ${row.color}` }}>{row.glyph}{'\uFE0E'}</span>}
                    <span className="serif italic" style={{ fontSize: 13.5, lineHeight: 1.15, color: 'var(--label-1)', textAlign: 'center' }}>{row.what}</span>
                  </span>
                </motion.button>
              ))}
            </div>
          </section>

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

          {/* block a sign */}
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => { sfx.tap(); go('block') }}
            style={{ width: '100%', height: 50, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: 'var(--label-1)', border: '1px solid rgba(255,138,160,0.5)', background: 'rgba(84,28,56,0.4)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff8aa0" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M5.6 5.6l12.8 12.8" /></svg>
            <span className="serif italic" style={{ fontSize: 18 }}>Block a sign</span>
            {blockedSigns.length > 0 && <span className="mono" style={{ fontSize: 9.5, letterSpacing: '0.14em', color: 'var(--label-2)' }}>· {blockedSigns.map((x) => SIGNS[x].glyph).join(' ')}</span>}
          </motion.button>

          {/* app */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span className="eyebrow" style={EYEBROW}>App</span>
            <div style={{ ...PANEL, overflow: 'hidden' }}>
              <Link label={`All about ${SUN.name}`} sub="Your element, your planet and the quick facts" onClick={() => go('chart')} first />
              <Link label="The language" sub="Every astro word in plain English" onClick={() => go('x/glossary')} />
              <Link label="Settings" onClick={() => go('x/settings')} />
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
        {self != null && <SelfReader key="self" start={self} onClose={() => setSelf(null)} />}
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

/** the seed of life: seven circles, one in the middle and six around it, inside a ring */
function SeedOfLife({ size, color, draw }: { size: number; color: string; draw?: boolean }) {
  const R = 20
  const pts: [number, number][] = [[0, 0], ...Array.from({ length: 6 }, (_, k): [number, number] => {
    const a = (-90 + k * 60) * (Math.PI / 180)
    return [Math.cos(a) * R, Math.sin(a) * R]
  })]
  return (
    <svg width={size} height={size} viewBox="-44 -44 88 88" fill="none" stroke={color} strokeWidth={size > 60 ? 1 : 1.6} style={{ filter: `drop-shadow(0 0 ${size > 60 ? 10 : 5}px ${color})`, overflow: 'visible' }}>
      {pts.map(([x, y], k) => (
        <motion.circle key={k} cx={x} cy={y} r={R} initial={draw ? { pathLength: 0, opacity: 0 } : false} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.7, delay: 0.25 + k * 0.09, ease: 'easeOut' }} />
      ))}
      <motion.circle cx={0} cy={0} r={R * 2} initial={draw ? { pathLength: 0, opacity: 0 } : false} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.9, delay: 0.9, ease: 'easeOut' }} />
    </svg>
  )
}

/** spark, clash, align about your own sign, big: swipe or tap the arrows for the next one */
function SelfReader({ start, onClose }: { start: number; onClose: () => void }) {
  const [i, setI] = useState(start)
  const [dir, setDir] = useState(0)
  const row = SELF_ROWS[i]
  const to = (n: number) => { if (n < 0 || n >= SELF_ROWS.length) return; sfx.flip(); setDir(n > i ? 1 : -1); setI(n) }
  return (
    <motion.div role="dialog" aria-label={`${row.label}: ${row.what}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'rgba(5,2,15,0.86)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}>
      <div aria-hidden style={{ position: 'absolute', left: '50%', top: '42%', width: 420, height: 420, marginLeft: -210, marginTop: -210, borderRadius: '50%', filter: 'blur(50px)', background: `radial-gradient(closest-side, color-mix(in srgb, ${row.color} 40%, transparent), transparent)`, transition: 'background 0.4s' }} />
      <div className="mono" style={{ position: 'absolute', top: 64, left: 0, right: 0, textAlign: 'center', ...LABEL, color: 'var(--label-2)' }}>ABOUT YOU · {i + 1} OF {SELF_ROWS.length}</div>
      <AnimatePresence initial={true} mode="popLayout" custom={dir}>
        <motion.div key={row.k} custom={dir}
          initial={{ rotateY: dir === 0 ? 180 : dir * 70, x: dir * 120, opacity: 0, scale: 0.9 }} animate={{ rotateY: 0, x: 0, opacity: 1, scale: 1 }} exit={{ rotateY: dir * -70, x: dir * -120, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.5}
          onDragEnd={(_, d) => { if (d.offset.x < -70) to(i + 1); else if (d.offset.x > 70) to(i - 1) }}
          onClick={(e) => e.stopPropagation()}
          style={{ position: 'absolute', left: 36, right: 36, top: 150, borderRadius: 24, padding: 4, background: foil(row.color), boxShadow: `0 0 40px color-mix(in srgb, ${row.color} 45%, transparent), 0 24px 50px rgba(0,0,0,0.6)`, touchAction: 'pan-y' }}>
          <div style={{ borderRadius: 20, minHeight: 400, padding: '22px 22px 20px', display: 'flex', flexDirection: 'column', background: `radial-gradient(90% 45% at 50% 18%, color-mix(in srgb, ${row.color} 22%, #1d1233), #120b22)` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', fontWeight: 700, color: row.color }}>{row.label.toUpperCase()}</span>
              <span className="mono" style={{ fontSize: 9, letterSpacing: '0.16em', color: 'var(--label-3)' }}>{SUN.name.toUpperCase()} {SUN.glyph}</span>
            </div>
            {row.k === 'align'
              ? <div style={{ display: 'grid', placeItems: 'center', margin: '12px 0 10px' }}><SeedOfLife size={108} color={row.color} draw /></div>
              : <div style={{ textAlign: 'center', fontSize: 64, lineHeight: 1, color: row.color, textShadow: `0 0 30px ${row.color}`, margin: '26px 0 22px' }}>{row.glyph}{'\uFE0E'}</div>}
            <div className="mono" style={{ textAlign: 'center', fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--label-2)' }}>{row.what.toUpperCase()}</div>
            <div className="serif italic" style={{ textAlign: 'center', fontSize: 25, lineHeight: 1.2, color: 'var(--label-1)', marginTop: 10, flex: 1 }}>{SELF[ME.sign][row.k]}</div>
            <div style={{ marginTop: 18, paddingTop: 12, borderTop: '1px solid rgba(179,166,196,0.18)', fontSize: 13.5, lineHeight: 1.45, color: 'var(--label-2)', textAlign: 'center' }}>{row.why}</div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', left: 30, right: 30, bottom: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button aria-label="Previous card" onClick={() => to(i - 1)} style={{ width: 48, height: 48, borderRadius: 24, display: 'grid', placeItems: 'center', fontSize: 20, color: 'var(--label-1)', opacity: i ? 1 : 0.3, background: 'rgba(52,35,95,0.7)' }}>‹</button>
        <div style={{ display: 'flex', gap: 6 }}>
          {SELF_ROWS.map((p, n) => <button key={p.k} aria-label={p.label} onClick={() => to(n)} style={{ width: n === i ? 18 : 7, height: 7, borderRadius: 4, background: n === i ? p.color : 'rgba(179,166,196,0.35)', transition: 'width 0.2s' }} />)}
        </div>
        <button aria-label="Next card" onClick={() => to(i + 1)} style={{ width: 48, height: 48, borderRadius: 24, display: 'grid', placeItems: 'center', fontSize: 20, color: 'var(--label-1)', opacity: i < SELF_ROWS.length - 1 ? 1 : 0.3, background: 'rgba(52,35,95,0.7)' }}>›</button>
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
