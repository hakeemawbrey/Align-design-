import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import { Planet } from '../components/onboarding/shared'
import { openCalendarOn } from '../components/you/origin'
import { ME } from '../data/profiles'
import { SIGNS } from '../data/signs'
import { SIGN_FACTS } from '../data/signFacts'
import { sfx } from '../lib/sfx'
import { TABS } from './Chart'
import { PARTS, Reading } from '../components/you/parts'
import CardFrame, { CardOrb } from '../components/CardFrame'

/** the rest of the chart, as questions */
const MORE: Record<string, { title: string; q: string }> = {
  traits: { title: 'Outside vs inside', q: 'How people read you, and what’s really going on' },
  element: { title: 'Your element', q: 'What kind of love feels right to you' },
  ruler: { title: 'Your planet', q: 'What your sign wants most' },
}

const EYEBROW: React.CSSProperties = { fontSize: 10, letterSpacing: '0.2em', color: 'var(--label-3)' }

/**
 * Your sign (beta): the same reading as the chart card, laid out to be read.
 * Six tabs at the top (Sun, Moon, Rising, Venus, Jupiter, House), each with
 * what it teaches you about yourself; the rest opens below as plain questions.
 */
export default function BetaChart({ go }: ScreenProps) {
  const [tab, setTab] = useState(0)
  const [open, setOpen] = useState<string | null>(null)
  const sel = PARTS[tab]
  const t = sel.read
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
            <div className="h-display" style={{ fontSize: 32, lineHeight: 1.1 }}>You’re more than<br />one sign.</div>
            <p style={{ margin: '8px 0 0', fontSize: 14.5, lineHeight: 1.45, color: 'var(--label-2)' }}>
              Most people only know their Sun sign. Each of these says something different about you. Tap one to learn it.
            </p>
          </div>

          {/* the big three */}
          <div role="tablist" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {PARTS.map((o, i) => {
              const on = i === tab
              return (
                <motion.button key={o.word} role="tab" aria-selected={on} onClick={() => { if (!on) { sfx.tap(); setTab(i) } }} whileTap={{ scale: 0.96 }} animate={{ y: on ? -4 : 0 }}>
                  <CardFrame tint={o.ink} quiet={!on} radius={16} padding="12px 4px 12px" style={{ height: '100%' }}>
                    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <span style={{ height: 48, display: 'grid', placeItems: 'center', opacity: on ? 1 : 0.75 }}>
                        <Planet size={o.size} color={o.color} light={o.light} dark={o.dark} ring={o.ring} glow={on ? 0.75 : 0.35} />
                      </span>
                      <span className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', fontWeight: 700, color: on ? o.ink : 'var(--label-2)' }}>{o.word.toUpperCase()}</span>
                      <span className="serif italic" style={{ fontSize: 18, lineHeight: 1.1, color: 'var(--label-1)' }}>{o.value}</span>
                      <span style={{ fontSize: 11.5, lineHeight: 1.25, color: 'var(--label-2)', textAlign: 'center' }}>{o.plain}</span>
                    </span>
                  </CardFrame>
                </motion.button>
              )
            })}
          </div>

          {/* the one you picked */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.section key={t.id} role="tabpanel" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
              <CardFrame tint={sel.ink} kicker={`${sel.word === 'House' ? `${sel.value} house` : `${sel.word} in ${sel.value}`} · ${sel.plain}`} title={t.headline}
                orb={<CardOrb tint={sel.ink}>{sel.glyph}</CardOrb>}
                strip={{ label: 'Try this', text: t.tryLine }} footer={['Align · your chart', `${sel.word} · ${tab + 1}/${PARTS.length}`]}>
                <Reading t={t} go={go} />
              </CardFrame>
            </motion.section>
          </AnimatePresence>

          {/* the rest of the chart, as questions */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
            <span className="mono" style={EYEBROW}>MORE ABOUT {SIGNS[ME.sign].name.toUpperCase()}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {TABS.slice(3).filter((x) => MORE[x.id]).map((x) => {
                const m = MORE[x.id], on = open === x.id
                return (
                  <CardFrame key={x.id} tint={x.color} quiet={!on} padding="0" strip={on ? { label: 'Try this', text: x.tryLine } : undefined} footer={on ? ['Align · your chart', m.title] : undefined}>
                    <button aria-expanded={on} onClick={() => { sfx.tap(); setOpen(on ? null : x.id) }}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 14px 14px 16px', textAlign: 'left' }}>
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span className="serif italic" style={{ display: 'block', fontSize: 19, lineHeight: 1.15, color: 'var(--label-1)' }}>
                          {m.title}{x.id !== 'traits' && <span style={{ color: x.color }}> · {x.eyebrow}</span>}
                        </span>
                        <span style={{ display: 'block', fontSize: 13, color: 'var(--label-2)', marginTop: 3 }}>{m.q}</span>
                      </span>
                      <motion.svg animate={{ rotate: on ? 180 : 0 }} width="12" height="8" viewBox="0 0 12 8" fill="none" stroke={x.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m1 1.5 5 5 5-5" /></motion.svg>
                    </button>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: 'hidden' }}>
                          <div style={{ padding: '0 16px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <div className="serif italic" style={{ fontSize: 21, lineHeight: 1.2, color: 'var(--label-1)' }}>{x.headline}</div>
                            <Reading t={x} go={go} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardFrame>
                )
              })}
            </div>
          </section>

          {/* quick facts, then where to go next */}
          <CardFrame tint={SIGNS[ME.sign].color} kicker={`${SIGNS[ME.sign].name} at a glance`} title="The quick facts" orb={<CardOrb tint={SIGNS[ME.sign].color}>{SIGNS[ME.sign].glyph}</CardOrb>} footer={['Align · your chart', 'Facts']}>
            {([['Dates', facts.dates], ['Element', facts.element], ['Style', facts.mode], ['Ruled by', facts.ruler], ['Famous one', facts.famous]] as const).map(([k, v], i) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '10px 0', borderTop: i ? '1px solid rgba(179,166,196,0.12)' : undefined, fontSize: 14.5 }}>
                <span style={{ color: 'var(--label-2)' }}>{k}</span><span style={{ color: 'var(--label-1)', textAlign: 'right' }}>{v}</span>
              </div>
            ))}
          </CardFrame>
          <motion.button className="chrome-cta" whileTap={{ scale: 0.97 }} onClick={() => { sfx.tap(); openCalendarOn(go, 'chart') }} style={{ width: '100%' }}>
            See your month in the sky <span className="spark">✦</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
