import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import TabBar from '../components/TabBar'
import ProfileCard from '../components/deck/ProfileCard'
import { CARD_W, CARD_H } from '../components/deck/fx'
import { myProfile } from '../components/you/myCard'
import { useAccount } from '../pages/account/store'
import { ME } from '../data/profiles'
import { SIGNS } from '../data/signs'
import { SIGN_FACTS } from '../data/signFacts'
import { sfx } from '../lib/sfx'
import { useSession } from '../lib/session'
import { openCalendarOn } from '../components/you/origin'
import SkySpread from '../components/sky/SkySpread'
import { SkyCardBack } from '../components/sky/SkyCardFace'
import { TODAY_READING } from '../data/skyReading'
import { useTalk } from '../lib/talk'
import { foil } from '../components/CardFrame'
import { Planet } from '../components/onboarding/shared'
import { PARTS } from '../components/you/parts'
import { Chevron, ResetRow, SwitchRows } from './You'

const SUN = SIGNS[ME.sign]
const FACTS = SIGN_FACTS[ME.sign]
/** your card, a little smaller than in the deck */
const SCALE = 0.6
const HW = CARD_W * SCALE
const HH = CARD_H * SCALE
/** a symbol for each part of the chart */
const SYM: Record<string, string> = { Sun: '☉', Moon: '☽', Rising: '↑', Venus: '♀', Jupiter: '♃', House: '⌂' }
/** the hand: card size and fan */
const MW = 80
const MH = 124

const PANEL: React.CSSProperties = { borderRadius: 18, background: 'rgba(30,18,64,0.72)', border: '1px solid rgba(179,166,196,0.16)' }
const LABEL: React.CSSProperties = { fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--label-3)' }
const side: React.CSSProperties = { position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }

/**
 * Your profile (beta), played like the rest of the app:
 *   your card, which you can tilt and flip (face down, and after the reveal)
 *   three round buttons: edit, aura photo, block signs
 *   the daily draw: today's horoscope, three cards to turn
 *   your hand: six cards from your birth chart, fanned. Tap one and it comes
 *   up big; swipe through the rest.
 */
export default function BetaYou({ go }: ScreenProps) {
  const { card: edits } = useAccount()
  const me = useMemo(() => myProfile({ ...edits, facts: edits.facts.map(([k, v]) => [k, v] as [string, string]) }), [edits])
  const { blockedSigns } = useSession()
  const [flipped, setFlipped] = useState(false)
  const [reader, setReader] = useState<number | null>(null)
  const [draw, setDraw] = useState(false)
  const drawn = useTalk().skyDays.includes(TODAY_READING.date)

  // tilt: the card leans toward your finger and the foil catches the light
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 })
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 })
  const shine = useTransform(ry, [-14, 14], ['0% 0%', '100% 100%'])
  const tilt = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 24)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 18)
  }
  const still = () => { rx.set(0); ry.set(0) }
  const flip = () => { sfx.flip(); setFlipped((f) => !f) }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora={SUN.color} warm="#4a2470" count={80} seed={44} />
      <div className="no-scrollbar"
        style={{
          position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none',
          maskImage: 'linear-gradient(to bottom, transparent 0, transparent 40px, #000 64px, #000 calc(100% - 118px), transparent calc(100% - 84px))',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0, transparent 40px, #000 64px, #000 calc(100% - 118px), transparent calc(100% - 84px))',
        }}>
        <div style={{ position: 'relative', padding: '56px 24px 124px', display: 'flex', flexDirection: 'column' }}>

          {/* header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 40 }}>
            <span className="mono" style={{ ...LABEL, color: SUN.light }}>ALIGN · {ME.serial}</span>
            <button aria-label="Settings" onClick={() => { sfx.tap(); go('x/settings') }} style={{ width: 40, height: 40, marginRight: -8, display: 'grid', placeItems: 'center', color: 'var(--label-2)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
              </svg>
            </button>
          </div>

          {/* your card: tilt it, tap to flip */}
          <div style={{ position: 'relative', height: HH + 20, marginTop: 4, display: 'grid', placeItems: 'center' }}>
            <div aria-hidden style={{ position: 'absolute', width: HW * 1.5, height: HH * 0.9, borderRadius: '50%', filter: 'blur(40px)', background: `radial-gradient(closest-side, ${SUN.color}88, transparent)` }} />
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ perspective: 900 }}>
              <motion.div role="button" aria-label={flipped ? 'Your card, revealed. Tap to turn face down' : 'Your card, face down. Tap to flip'}
                onClick={flip} onPointerMove={tilt} onPointerLeave={still} whileTap={{ scale: 0.97 }}
                style={{ width: HW, height: HH, rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', cursor: 'pointer' }}>
                <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.7, ease: [0.3, 1.25, 0.5, 1] }}
                  style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}>
                  <div style={side}>
                    <div style={{ width: CARD_W, height: CARD_H, transform: `scale(${SCALE})`, transformOrigin: '0 0', pointerEvents: 'none' }}>
                      <ProfileCard profile={me} glow />
                    </div>
                  </div>
                  <div style={{ ...side, transform: 'rotateY(180deg)' }}><PhotoFace /></div>
                  {/* the foil catching the light */}
                  <motion.div aria-hidden style={{ ...side, borderRadius: 18, pointerEvents: 'none', mixBlendMode: 'color-dodge', opacity: 0.35,
                    backgroundImage: 'linear-gradient(115deg, transparent 30%, rgba(255,240,200,0.9) 45%, rgba(190,160,255,0.8) 52%, transparent 66%)', backgroundSize: '250% 250%', backgroundPosition: shine }} />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* which side you're looking at */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
            <div style={{ display: 'flex', padding: 3, borderRadius: 999, background: 'rgba(20,12,40,0.7)', border: '1px solid rgba(179,166,196,0.2)' }}>
              {(['Face down', 'Revealed'] as const).map((l, i) => {
                const on = (i === 1) === flipped
                return (
                  <button key={l} onClick={() => { if (!on) flip() }} className="mono"
                    style={{ height: 28, padding: '0 14px', borderRadius: 999, fontSize: 9.5, letterSpacing: '0.16em', fontWeight: 700,
                      color: on ? 'var(--chrome-ink)' : 'var(--label-2)', background: on ? 'var(--chrome)' : 'transparent', transition: 'background 0.2s, color 0.2s' }}>
                    {l.toUpperCase()}
                  </button>
                )
              })}
            </div>
          </div>
          <div style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--label-2)', marginTop: 8, minHeight: 17 }}>
            {flipped ? 'What a match sees when your 33:33 runs out.' : 'What strangers see in the deck tonight.'}
          </div>

          {/* name and the six, in one line of little tags */}
          <div className="h-display" style={{ textAlign: 'center', fontSize: 36, lineHeight: 1.05, marginTop: 16 }}>{ME.name}, {ME.age}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 5, marginTop: 10 }}>
            {PARTS.map((o, i) => (
              <button key={o.word} onClick={() => { sfx.flip(); setReader(i) }} aria-label={`${o.word} in ${o.value}`}
                style={{ height: 26, padding: '0 10px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: 'var(--label-1)',
                  border: `1px solid color-mix(in srgb, ${o.ink} 50%, transparent)`, background: `color-mix(in srgb, ${o.ink} 14%, transparent)` }}>
                <span style={{ color: o.ink, fontSize: 12 }}>{SYM[o.word]}{'\uFE0E'}</span>{o.value}
              </button>
            ))}
          </div>

          {/* three round buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 26, marginTop: 22 }}>
            <Round label="Edit card" glow="#f8edff" onClick={() => go('x/edit-card/down')}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h4L19 9l-4-4L4 16v4Z" /><path d="m13.5 6.5 4 4" /></svg>
            </Round>
            <Round label="Aura photo" glow={SUN.color} onClick={() => go('x/aura-photo')}>
              <img src={ME.photo} alt="" style={{ width: 54, height: 54, borderRadius: 27, objectFit: 'cover' }} />
            </Round>
            <Round label={blockedSigns.length ? `Blocked · ${blockedSigns.length}` : 'Block signs'} glow="#ff8aa0" onClick={() => go('block')}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff8aa0" strokeWidth="1.9" strokeLinecap="round"><circle cx="12" cy="12" r="8.5" /><path d="M6 6l12 12" /></svg>
            </Round>
          </div>

          {/* the daily draw */}
          <motion.button whileTap={{ scale: 0.98 }} onClick={() => { sfx.flip(); setDraw(true) }}
            style={{ marginTop: 28, borderRadius: 22, padding: 3, background: foil('#c9a6ff'), textAlign: 'left', boxShadow: drawn ? 'none' : '0 0 26px rgba(201,166,255,0.35)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 14, borderRadius: 19, padding: '14px 16px 14px 14px', background: 'linear-gradient(135deg, #2a1556, #150b2c)' }}>
              <span style={{ position: 'relative', width: 104, height: 74, flexShrink: 0 }}>
                {TODAY_READING.cards.map((c, i) => (
                  <motion.span key={c.slot} animate={drawn ? {} : { y: [0, -4, 0] }} transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.25 }}
                    style={{ position: 'absolute', left: i * 32, top: 4, transform: `rotate(${(i - 1) * 9}deg)`, transformOrigin: '50% 100%', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))' }}>
                    <SkyCardBack slot={c.slot} width={40} />
                  </motion.span>
                ))}
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span className="mono" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 9, letterSpacing: '0.2em', fontWeight: 700, color: '#c9a6ff' }}>
                  DAILY DRAW {!drawn && <span style={{ padding: '2px 6px', borderRadius: 6, fontSize: 8, color: '#1a0f2e', background: 'var(--align)' }}>NEW</span>}
                </span>
                <span className="serif italic" style={{ display: 'block', fontSize: 20, lineHeight: 1.15, color: 'var(--label-1)', marginTop: 4 }}>
                  {drawn ? TODAY_READING.cards[0].headline : 'Turn today’s three cards'}
                </span>
                <span style={{ display: 'block', fontSize: 12, color: 'var(--label-2)', marginTop: 4 }}>{drawn ? 'Read your horoscope again' : 'You · Love · Your move'}</span>
              </span>
            </span>
          </motion.button>

          {/* your hand: six cards from your birth chart */}
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <div className="h-display" style={{ fontSize: 26 }}>Your hand</div>
            <div style={{ fontSize: 13, color: 'var(--label-2)', marginTop: 4 }}>Six cards from your birth chart. Pull one to learn it.</div>
          </div>
          <div style={{ position: 'relative', height: MH + 46, marginTop: 14 }}>
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

          {/* everything else */}
          <div style={{ ...PANEL, overflow: 'hidden', marginTop: 18 }}>
            <Link label={`All about ${SUN.name}`} sub={`${FACTS.element} · ${FACTS.mode} · ruled by ${FACTS.ruler}`} onClick={() => go('chart')} first />
            <Link label="Cosmic calendar" sub="Your whole month in the sky" onClick={() => openCalendarOn(go, 'you')} />
            <Link label="The language" sub="Every astro word in plain English" onClick={() => go('x/glossary')} />
            <Link label="Settings" onClick={() => go('x/settings')} />
            <Link label="Help & support" onClick={() => go('x/help')} />
          </div>

          <div className="mono" style={{ ...LABEL, marginTop: 24, marginBottom: 8 }}>DEMO</div>
          <div style={{ ...PANEL, overflow: 'hidden' }}>
            <SwitchRows />
            <ResetRow />
          </div>
          <div className="mono" style={{ textAlign: 'center', fontSize: 8.5, letterSpacing: '0.2em', color: 'var(--label-4)', marginTop: 20 }}>ALIGN · {ME.serial} · BETA</div>
        </div>
      </div>

      <TabBar active="you" go={go} />

      <AnimatePresence>
        {reader != null && <Reader key="reader" start={reader} onClose={() => setReader(null)} />}
        {draw && <DailyDraw key="draw" onClose={() => setDraw(false)} onMonth={() => openCalendarOn(go, 'you')} />}
      </AnimatePresence>
    </div>
  )
}

/** the back of your card, after the reveal: your photo, full bleed, in your sign's foil */
function PhotoFace() {
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 18, padding: 4, background: foil(SUN.color), boxShadow: `0 0 30px ${SUN.color}77` }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 14, overflow: 'hidden', background: '#07040f' }}>
        <img src={ME.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '40px 14px 12px', background: 'linear-gradient(transparent, rgba(7,4,15,0.92))' }}>
          <div className="serif italic" style={{ fontSize: 24, color: '#fff' }}>{ME.name}, {ME.age}</div>
          <div className="mono" style={{ fontSize: 9, letterSpacing: '0.16em', color: SUN.light, marginTop: 2 }}>{SUN.name.toUpperCase()} {SUN.glyph} · REVEALED</div>
        </div>
      </div>
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

/** today's horoscope, full screen: three cards to turn */
function DailyDraw({ onClose, onMonth }: { onClose: () => void; onMonth: () => void }) {
  return (
    <motion.div role="dialog" aria-label="Daily draw" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'radial-gradient(90% 50% at 50% 20%, #2a1556, #0d0620 60%, #05020f)' }}>
      <div className="no-scrollbar" style={{ position: 'absolute', inset: 0, overflowY: 'auto', padding: '96px 24px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <SkySpread reward={false} />
        <button className="mono" onClick={() => { sfx.tap(); onMonth() }} style={{ height: 40, marginTop: 6, fontSize: 9.5, letterSpacing: '0.16em', color: 'var(--align)' }}>SEE YOUR WHOLE MONTH ›</button>
      </div>
      <div className="mono" style={{ position: 'absolute', top: 64, left: 0, right: 0, textAlign: 'center', ...LABEL, color: 'var(--label-2)' }}>DAILY DRAW</div>
      <button aria-label="Close" onClick={() => { sfx.tap(); onClose() }} style={{ position: 'absolute', right: 14, top: 52, width: 40, height: 40, display: 'grid', placeItems: 'center', fontSize: 22, color: 'var(--label-1)' }}>×</button>
    </motion.div>
  )
}

/** a round button with a soft glow and its name underneath */
function Round({ label, glow, onClick, children }: { label: string; glow: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <motion.button whileTap={{ scale: 0.9 }} onClick={() => { sfx.tap(); onClick() }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, width: 76 }}>
      <span style={{ width: 60, height: 60, borderRadius: 30, display: 'grid', placeItems: 'center', color: 'var(--label-1)', overflow: 'hidden',
        background: 'radial-gradient(circle at 35% 30%, rgba(90,70,150,0.9), rgba(30,18,64,0.95))', border: `1.5px solid color-mix(in srgb, ${glow} 70%, transparent)`,
        boxShadow: `0 0 18px color-mix(in srgb, ${glow} 40%, transparent)` }}>
        {children}
      </span>
      <span style={{ fontSize: 12.5, color: 'var(--label-1)', whiteSpace: 'nowrap' }}>{label}</span>
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
