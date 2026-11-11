import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import { Planet } from '../components/onboarding/shared'
import TermText from '../pages/plus/TermText'
import { openCalendarOn } from '../components/you/origin'
import { ME } from '../data/profiles'
import { SIGNS } from '../data/signs'
import { SIGN_FACTS } from '../data/signFacts'
import { sfx } from '../lib/sfx'
import { TABS, type ChartTab } from './Chart'

/** the big three, said the way a friend would explain them */
const BIG3 = [
  { tab: 0, word: 'Sun', sign: ME.sign, plain: 'Who you are', size: 44, color: '#c9a032', light: '#fff1b8', dark: '#3a2a08', ring: '#e8c860', ink: '#f2d76a' },
  { tab: 1, word: 'Moon', sign: ME.moon, plain: 'How you feel', size: 36, color: '#2f6fe0', light: '#b8d4ff', dark: '#0a1640', ring: undefined, ink: '#8fb4ff' },
  { tab: 2, word: 'Rising', sign: ME.rising, plain: 'How you come across', size: 36, color: '#9a4ee0', light: '#ecd8ff', dark: '#24104a', ring: undefined, ink: '#cdb0ff' },
] as const

/** the rest of the chart, as questions */
const MORE: Record<string, { title: string; q: string }> = {
  traits: { title: 'Outside vs inside', q: 'How people read you, and what’s really going on' },
  element: { title: 'Your element', q: 'What kind of love feels right to you' },
  ruler: { title: 'Your planet', q: 'What your sign wants most' },
  house: { title: 'Your house', q: 'Where in life your energy goes' },
}

const PANEL: React.CSSProperties = { borderRadius: 18, background: 'rgba(30,18,64,0.82)', border: '1px solid rgba(179,166,196,0.16)' }
const EYEBROW: React.CSSProperties = { fontSize: 10, letterSpacing: '0.2em', color: 'var(--label-3)' }

/** the three things every page of the chart says: in love, for you, try this */
function Reading({ t, go }: { t: ChartTab; go: ScreenProps['go'] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: 'var(--label-2)' }}><TermText text={t.meaning} go={go} /></p>
      {([['In love', t.love, '♡'], ['For you', t.self, '✦']] as const).map(([k, v, icon]) => (
        <div key={k} style={{ display: 'flex', gap: 12, padding: '13px 14px', borderRadius: 14, background: 'rgba(52,35,95,0.6)', border: '1px solid rgba(179,166,196,0.14)' }}>
          <span aria-hidden style={{ width: 28, height: 28, borderRadius: 14, flexShrink: 0, display: 'grid', placeItems: 'center', fontSize: 14, color: t.color, background: 'rgba(11,6,32,0.6)', border: `1px solid ${t.color}66` }}>{icon}</span>
          <div>
            <div className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', fontWeight: 700, color: t.color }}>{k.toUpperCase()}</div>
            <div style={{ fontSize: 15.5, lineHeight: 1.45, color: 'var(--label-1)', marginTop: 4 }}><TermText text={v} go={go} /></div>
          </div>
        </div>
      ))}
      <div style={{ padding: '13px 14px', borderRadius: 14, border: '1px solid rgba(242,199,92,0.5)', background: 'rgba(242,199,92,0.08)' }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', fontWeight: 700, color: 'var(--align)' }}>TRY THIS</div>
        <div style={{ fontSize: 15.5, lineHeight: 1.45, color: 'var(--label-1)', marginTop: 4 }}>{t.tryLine}</div>
      </div>
    </div>
  )
}

/**
 * Your sign (beta): the same reading as the chart card, laid out to be read.
 * Pick Sun, Moon or Rising at the top; the rest of the chart opens below as
 * plain questions.
 */
export default function BetaChart({ go }: ScreenProps) {
  const [tab, setTab] = useState(0)
  const [open, setOpen] = useState<string | null>(null)
  const sel = BIG3[tab]
  const t = TABS[tab]
  const facts = SIGN_FACTS[ME.sign]

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora="#3a1d80" warm="#4a2a5a" count={70} seed={73} />
      <div className="no-scrollbar" style={{
        position: 'absolute', inset: 0, overflowY: 'auto', scrollbarWidth: 'none',
        maskImage: 'linear-gradient(to bottom, transparent 0, transparent 40px, #000 64px, #000 calc(100% - 30px), transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0, transparent 40px, #000 64px, #000 calc(100% - 30px), transparent)',
      }}>
        <div style={{ padding: '52px 20px 60px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* header */}
          <div style={{ display: 'flex', alignItems: 'center', height: 44 }}>
            <button aria-label="Back" onClick={() => { sfx.tap(); go('you') }} style={{ width: 40, height: 40, marginLeft: -8, display: 'grid', placeItems: 'center', color: 'var(--label-1)' }}>
              <svg width="11" height="18" viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 2 2 10l8 8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <span className="mono" style={{ ...EYEBROW, flex: 1, textAlign: 'center', color: 'var(--label-2)' }}>YOUR SIGN</span>
            <button className="mono" onClick={() => { sfx.tap(); go('x/glossary') }} style={{ height: 40, fontSize: 10, letterSpacing: '0.14em', color: 'var(--label-2)' }}>WORDS ›</button>
          </div>

          <div style={{ marginTop: -8 }}>
            <div className="h-display" style={{ fontSize: 32, lineHeight: 1.1 }}>You’re three signs,<br />not one.</div>
            <p style={{ margin: '8px 0 0', fontSize: 14.5, lineHeight: 1.45, color: 'var(--label-2)' }}>
              Most people only know their Sun sign. Your Moon and Rising matter just as much in love. Tap each one.
            </p>
          </div>

          {/* the big three */}
          <div role="tablist" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {BIG3.map((o) => {
              const on = o.tab === tab
              return (
                <motion.button key={o.word} role="tab" aria-selected={on} onClick={() => { if (!on) { sfx.tap(); setTab(o.tab) } }} whileTap={{ scale: 0.96 }}
                  style={{
                    ...PANEL, padding: '12px 6px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    background: on ? 'rgba(74,46,140,0.9)' : 'rgba(30,18,64,0.6)', border: on ? `1.5px solid ${o.ink}` : '1px solid rgba(179,166,196,0.16)',
                    boxShadow: on ? `0 0 22px ${o.color}55` : 'none',
                  }}>
                  <span style={{ height: 48, display: 'grid', placeItems: 'center', opacity: on ? 1 : 0.75 }}>
                    <Planet size={o.size} color={o.color} light={o.light} dark={o.dark} ring={o.ring} glow={on ? 0.75 : 0.35} />
                  </span>
                  <span className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', fontWeight: 700, color: on ? o.ink : 'var(--label-2)' }}>{o.word.toUpperCase()}</span>
                  <span className="serif italic" style={{ fontSize: 18, lineHeight: 1.1, color: 'var(--label-1)' }}>{SIGNS[o.sign].name}</span>
                  <span style={{ fontSize: 11.5, lineHeight: 1.25, color: 'var(--label-2)', textAlign: 'center' }}>{o.plain}</span>
                </motion.button>
              )
            })}
          </div>

          {/* the one you picked */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.section key={t.id} role="tabpanel" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', fontWeight: 700, color: sel.ink }}>
                  {sel.word.toUpperCase()} IN {SIGNS[sel.sign].name.toUpperCase()} {SIGNS[sel.sign].glyph} · {sel.plain.toUpperCase()}
                </div>
                <div className="serif italic" style={{ fontSize: 25, lineHeight: 1.2, color: 'var(--label-1)', marginTop: 6 }}>{t.headline}</div>
              </div>
              <Reading t={t} go={go} />
            </motion.section>
          </AnimatePresence>

          {/* the rest of the chart, as questions */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
            <span className="mono" style={EYEBROW}>MORE ABOUT {SIGNS[ME.sign].name.toUpperCase()}</span>
            <div style={{ ...PANEL, overflow: 'hidden' }}>
              {TABS.slice(3).map((x, i) => {
                const m = MORE[x.id], on = open === x.id
                return (
                  <div key={x.id} style={{ borderTop: i ? '1px solid rgba(179,166,196,0.12)' : undefined }}>
                    <button aria-expanded={on} onClick={() => { sfx.tap(); setOpen(on ? null : x.id) }}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 14px 14px 16px', textAlign: 'left' }}>
                      <span style={{ width: 10, height: 10, borderRadius: 5, flexShrink: 0, background: x.color, boxShadow: `0 0 8px ${x.color}` }} />
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ display: 'block', fontSize: 16, color: 'var(--label-1)' }}>
                          {m.title}{x.id !== 'traits' && <span style={{ color: x.color }}> · {x.eyebrow}</span>}
                        </span>
                        <span style={{ display: 'block', fontSize: 13, color: 'var(--label-2)', marginTop: 2 }}>{m.q}</span>
                      </span>
                      <motion.svg animate={{ rotate: on ? 180 : 0 }} width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="var(--label-2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m1 1.5 5 5 5-5" /></motion.svg>
                    </button>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: 'hidden' }}>
                          <div style={{ padding: '0 14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <div className="serif italic" style={{ fontSize: 21, lineHeight: 1.2, color: 'var(--label-1)' }}>{x.headline}</div>
                            <Reading t={x} go={go} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </section>

          {/* quick facts, then where to go next */}
          <div style={{ ...PANEL, padding: '4px 16px' }}>
            {([['Dates', facts.dates], ['Element', facts.element], ['Style', facts.mode], ['Ruled by', facts.ruler], ['Famous one', facts.famous]] as const).map(([k, v], i) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '11px 0', borderTop: i ? '1px solid rgba(179,166,196,0.12)' : undefined, fontSize: 14.5 }}>
                <span style={{ color: 'var(--label-2)' }}>{k}</span><span style={{ color: 'var(--label-1)', textAlign: 'right' }}>{v}</span>
              </div>
            ))}
          </div>
          <motion.button className="chrome-cta" whileTap={{ scale: 0.97 }} onClick={() => { sfx.tap(); openCalendarOn(go, 'chart') }} style={{ width: '100%' }}>
            See your month in the sky <span className="spark">✦</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
