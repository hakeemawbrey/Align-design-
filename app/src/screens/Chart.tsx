import Strength from '../components/Strength'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ScreenId, ScreenProps } from './types'
import Starfield from '../components/Starfield'
import { sfx } from '../lib/sfx'
import { goFrom } from '../components/you/origin'
import { Planet } from '../components/onboarding/shared'


interface ChartTab {
  id: 'sign' | 'moon' | 'rising' | 'traits' | 'element' | 'ruler' | 'house'
  label: string
  eyebrow: string
  pips: number
  color: string
  art: 'figure' | 'aura' | 'venus' | 'house'
  headline: string
  /** what this part of the chart is, in plain words */
  meaning: string
  /** what it means for dating and relationships */
  love: string
  /** how to align with yourself */
  self: string
  tryLine: string
  cta: string
  to: ScreenId
}

/**
 * Your chart · Taurus (G-23 → G-26, plus House). Written for someone who has
 * never read a chart: what it is, what it means in love, what to do with it.
 * Hakeem: Taurus sun, Sagittarius moon, Libra rising → sun in the 8th house.
 */
const TABS: ChartTab[] = [
  {
    id: 'sign', label: 'Sun', eyebrow: 'Your core', pips: 5, color: '#e3e86a', art: 'figure',
    headline: 'You love by showing up, again and again.',
    meaning: 'Your sun sign is your core: what you need to feel like yourself. Taurus needs steadiness, comfort and time.',
    love: 'You fall slowly and stay for real. Someone who rushes you or keeps changing plans will feel unsafe, even if they’re lovely.',
    self: 'Stop apologising for needing time. A slow yes from you is worth more than a fast one.',
    tryLine: 'Tell your match one thing you’d like to do with them more than once.',
    cta: 'See today’s sky', to: 'sky',
  },
  {
    id: 'moon', label: 'Moon', eyebrow: 'Your emotional self', pips: 4, color: '#5b8cf0', art: 'figure',
    headline: 'You need room to feel close.',
    meaning: 'Your moon is how you feel and what makes you feel safe. A Sagittarius moon needs freedom, honesty and a little adventure.',
    love: 'You open up when someone plans something new with you, not when they hold on tight. Jealousy shuts you down fast.',
    self: 'Your restlessness isn’t a flaw. Say you need space before you take it, and people won’t take it personally.',
    tryLine: 'Suggest a first date somewhere neither of you has been.',
    cta: 'Find someone in tonight’s deck', to: 'deck',
  },
  {
    id: 'rising', label: 'Rising', eyebrow: 'Your first impression', pips: 4, color: '#b18cff', art: 'figure',
    headline: 'People meet your charm first.',
    meaning: 'Your rising sign is how strangers read you before they know you. Libra rising comes across warm, easy and put-together.',
    love: 'People feel comfortable with you right away, so it can be hard to tell who likes the real you. Your Taurus core shows up later.',
    self: 'Keep the charm, but say the less polite thing sooner. The right people stay.',
    tryLine: 'In your next chat, share an opinion you’d usually smooth over.',
    cta: 'Talk to your matches', to: 'matches',
  },
  {
    id: 'traits', label: 'Traits', eyebrow: 'How you come across', pips: 4, color: '#a6e06a', art: 'figure',
    headline: 'Calm on the outside, decided on the inside.',
    meaning: 'People read you as easygoing. In truth you make up your mind quickly and quietly, then hold to it.',
    love: 'Partners can mistake your calm for not caring. Say what you feel out loud; they can’t read the stillness.',
    self: 'Notice when “I’m fine” is really stubbornness. Bending once costs less than you think.',
    tryLine: 'Ask one question you’d normally keep to yourself.',
    cta: 'Find someone in tonight’s deck', to: 'deck',
  },
  {
    id: 'element', label: 'Element', eyebrow: 'Earth', pips: 4, color: '#7fd8b0', art: 'aura',
    headline: 'You need love to be real, not just talk.',
    meaning: 'Earth signs (Taurus, Virgo, Capricorn) trust actions and routines. What someone does matters more than what they say.',
    love: 'You click easiest with earth and water signs. Air brings ideas you lack; fire brings spark but can feel like too much.',
    self: 'Your body knows first. If a date leaves you tired or tense, take that seriously.',
    tryLine: 'Plan a date you can touch: cook, walk, make something together.',
    cta: 'See your element set', to: 'matches',
  },
  {
    id: 'ruler', label: 'Ruler', eyebrow: 'Venus', pips: 5, color: '#f3a98f', art: 'venus',
    headline: 'Your planet is the planet of love.',
    meaning: 'Every sign has a ruling planet that shapes what it wants. Yours is Venus: affection, pleasure, beauty and what you value.',
    love: 'You show love through care: good food, your time, a hand on the back. Look for someone who receives that and gives it back.',
    self: 'Venus is retrograde until Nov 13. Revisit what you actually want; don’t lock anything in yet.',
    tryLine: 'Write down three things that make you feel loved.',
    cta: 'See today’s sky', to: 'sky',
  },
  {
    id: 'house', label: 'House', eyebrow: '8th house', pips: 4, color: '#e8628a', art: 'house',
    headline: 'Love, for you, means trust that goes deep.',
    meaning: 'Houses show where in life your energy goes. Your sun sits in the 8th: closeness, trust, and letting someone all the way in.',
    love: 'Casual rarely satisfies you. You want to be fully seen, and you need to know it’s safe first.',
    self: 'You can protect yourself without shutting people out. Share one real thing early and see who stays.',
    tryLine: 'Answer a match’s question more honestly than feels comfortable.',
    cta: 'Talk to your matches', to: 'matches',
  },
]

/** G-23 Your chart — reached from the You tab's "Your sign" tile. */
export default function Chart({ go }: ScreenProps) {
  const [tab, setTab] = useState(0)
  const t = TABS[tab]
  const pick = (i: number) => { if (i !== tab) { sfx.tap(); setTab(i) } }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora="#3a1d80" warm="#4a2a5a" count={70} seed={73} />

      <button aria-label="Back" onClick={() => { sfx.tap(); go('you') }}
        style={{ position: 'absolute', left: 16, top: 56, width: 40, height: 40, display: 'grid', placeItems: 'center', color: 'var(--label-1)', zIndex: 2 }}>
        <svg width="11" height="18" viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 2 2 10l8 8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div className="mono" style={{ position: 'absolute', left: 0, right: 0, top: 56, height: 40, display: 'grid', placeItems: 'center', fontSize: 10, letterSpacing: '0.2em', color: 'var(--label-2)', pointerEvents: 'none' }}>
        YOUR CHART
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        style={{
          position: 'absolute', left: 24, right: 24, top: 104, height: 600, borderRadius: 24, padding: 3,
          background: 'linear-gradient(160deg, rgba(222,208,246,0.85), rgba(150,120,210,0.5) 50%, rgba(222,208,246,0.8))',
          boxShadow: '0 0 40px rgba(120,70,220,0.35), 0 20px 50px rgba(0,0,0,0.45)',
        }}
      >
        <div style={{
          position: 'relative', height: '100%', borderRadius: 21, overflow: 'hidden', padding: '14px 18px 12px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          background: 'radial-gradient(30% 60% at 50% 60%, rgba(150,80,255,0.4), transparent 100%), linear-gradient(180deg, #3a1d80 0%, #34187a 50%, #2c1468 100%)',
        }}>
          <div style={{ position: 'absolute', inset: 8, borderRadius: 15, border: '1px solid rgba(222,208,246,0.28)', pointerEvents: 'none' }} />
          <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.24em', color: 'var(--label-2)' }}>YOUR SIGN · TAURUS</div>

          {/* the big three, from onboarding: tap one to read it */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 26, marginTop: 10, height: 84 }}>
            {BIG3.map((o, i) => {
              const on = tab === i
              return (
                <motion.button key={o.id} onClick={() => pick(i)} whileTap={{ scale: 0.92 }}
                  animate={{ y: on ? -3 : 0, opacity: tab < 3 && !on ? 0.65 : 1 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9 }}>
                  <div style={{ height: 50, display: 'grid', placeItems: 'center' }}>
                    <Planet size={o.size} color={o.color} light={o.light} dark={o.dark} ring={o.ring} glow={on ? 0.75 : 0.45} />
                  </div>
                  <span className="mono" style={{ fontSize: 7.5, letterSpacing: '0.14em', color: on ? o.text : 'var(--label-2)', whiteSpace: 'nowrap', borderBottom: on ? `1px solid ${o.text}` : '1px solid transparent', paddingBottom: 2 }}>
                    {o.label}
                  </span>
                </motion.button>
              )
            })}
          </div>

          <div className="h-display" style={{ fontSize: 23, marginTop: 8 }}>{TITLE[t.id] ?? 'Sun in Taurus.'}</div>
          <div style={{ fontSize: 12, color: 'var(--label-2)', marginTop: 4 }}>{SUBTITLE[t.id] ?? 'Fixed earth · ruled by Venus · 8th house'}</div>

          <div style={{
            marginTop: 10, width: '100%', height: 36, padding: 3, borderRadius: 999, display: 'flex',
            // while a planet page shows, these read as plain tabs, not an unselected control
            background: tab < 3 ? 'transparent' : 'rgba(24,12,56,0.45)', border: tab < 3 ? '1px solid transparent' : '1px solid rgba(179,166,196,0.22)',
            transition: 'background 0.2s, border-color 0.2s',
          }}>
            {TABS.map((x, i) => i < 3 ? null : (
              <button key={x.id} onClick={() => pick(i)} style={{ position: 'relative', flex: 1, height: '100%' }}>
                {i === tab && (
                  <motion.div layoutId="chart-tab" transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'rgba(120,96,170,0.55)' }} />
                )}
                <span className="mono" style={{ position: 'relative', fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: i === tab ? x.color : 'var(--label-2)' }}>
                  {x.label}
                </span>
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '100%', flex: 1, marginTop: 10 }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={t.id}
                initial={{ opacity: 0, x: 14, filter: 'blur(4px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, x: -14, filter: 'blur(4px)' }}
                transition={{ duration: 0.25 }}
                style={{ position: 'absolute', inset: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="mono" style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: t.color }}>
                    {t.label} · {t.eyebrow}
                  </span>
                  <span style={{ flex: 1 }} />
                  <Strength n={t.pips} of={5} color={t.color} />
                </div>
                <div className="serif italic" style={{ fontSize: 18, lineHeight: 1.2, marginTop: 6, color: 'var(--label-1)' }}>{t.headline}</div>
                <div style={{ fontSize: 11.5, lineHeight: 1.42, marginTop: 6, color: 'var(--label-2)' }}>{t.meaning}</div>
                {([['In love', t.love], ['For you', t.self]] as const).map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', gap: 8, marginTop: 7 }}>
                    <span className="mono" style={{ flex: '0 0 50px', fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.color, paddingTop: 2 }}>{k}</span>
                    <span style={{ fontSize: 11.5, lineHeight: 1.42, color: 'var(--label-1)' }}>{v}</span>
                  </div>
                ))}
                <div style={{ height: 1, background: 'rgba(222,208,246,0.18)', margin: '8px 0' }} />
                <div style={{ display: 'flex', gap: 8, fontSize: 11.5, lineHeight: 1.42 }}>
                  <span className="mono" style={{ flex: '0 0 50px', fontSize: 8, letterSpacing: '0.14em', color: t.color, paddingTop: 2 }}>TRY</span>
                  <span style={{ color: 'var(--label-1)' }}>{t.tryLine}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div style={{ display: 'flex', marginBottom: 3 }}>
            {TABS.map((x, i) => (
              // 6px dot, 12 × 20 tap area
              <button key={x.id} onClick={() => pick(i)} aria-label={x.label} style={{ width: 12, height: 20, display: 'grid', placeItems: 'center' }}>
                <span style={{ width: 6, height: 6, borderRadius: 3, background: i === tab ? t.color : 'rgba(179,166,196,0.35)' }} />
              </button>
            ))}
          </div>
          <div className="mono" style={{ display: 'flex', gap: 14, alignItems: 'center', fontSize: 9, letterSpacing: '0.18em', color: 'var(--label-2)' }}>
            <span>SUN · TAURUS 22°</span><span style={{ opacity: 0.6 }}>◇</span><span>8TH HOUSE</span><span style={{ opacity: 0.6 }}>◇</span><span>VENUS</span>
          </div>
          <div className="mono" style={{ fontSize: 8, letterSpacing: '0.2em', color: 'var(--label-3)', marginTop: 6 }}>ALIGN · CHART № 001/∞</div>
        </div>
      </motion.div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 34, display: 'flex', justifyContent: 'center' }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.button key={t.cta} className="chrome-cta" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}
            onClick={() => { sfx.tap(); if (t.to === 'sky') goFrom(go, 'sky', 'chart'); else go(t.to) }}>
            {t.cta} <span className="spark">✦</span>
          </motion.button>
        </AnimatePresence>
      </div>
    </div>
  )
}

const BIG3: { id: string; label: string; size: number; color: string; light: string; dark: string; ring?: string; text: string }[] = [
  { id: 'sun', label: 'SUN · TAURUS', size: 48, color: '#c9a032', light: '#fff1b8', dark: '#3a2a08', ring: '#e8c860', text: '#e3e86a' },
  { id: 'moon', label: 'MOON · SAGITTARIUS', size: 36, color: '#2f6fe0', light: '#b8d4ff', dark: '#0a1640', text: '#7fa6ff' },
  { id: 'rising', label: 'RISING · LIBRA', size: 36, color: '#9a4ee0', light: '#ecd8ff', dark: '#24104a', text: '#c9a8ff' },
]

const TITLE: Partial<Record<ChartTab['id'], string>> = {
  moon: 'Moon in Sagittarius.',
  rising: 'Libra rising.',
}
const SUBTITLE: Partial<Record<ChartTab['id'], string>> = {
  moon: 'How you feel · mutable fire',
  rising: 'How you come across · cardinal air',
}
