import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ScreenId, ScreenProps } from './types'
import Starfield from '../components/Starfield'
import TabBar from '../components/TabBar'
import { SIGNS } from '../data/signs'
import { sfx } from '../lib/sfx'

const TAURUS = SIGNS.taurus

interface ChartTab {
  id: 'sign' | 'traits' | 'element' | 'ruler' | 'house'
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
    id: 'ruler', label: 'Ruler', eyebrow: 'Venus', pips: 5, color: '#f2c75c', art: 'venus',
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

      <button onClick={() => { sfx.tap(); go('you') }} className="mono"
        style={{ position: 'absolute', left: 16, top: 56, height: 36, display: 'flex', alignItems: 'center', gap: 10, fontSize: 10, letterSpacing: '0.2em', color: 'var(--label-2)', zIndex: 2 }}>
        <svg width="10" height="17" viewBox="0 0 12 20" fill="none" stroke="var(--label-1)" strokeWidth="2"><path d="M10 2 2 10l8 8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        YOUR CHART
      </button>
      <motion.div className="mono" animate={{ color: t.color }}
        style={{ position: 'absolute', right: 28, top: 68, fontSize: 10, letterSpacing: '0.2em' }}>
        TAURUS · 13°
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        style={{
          position: 'absolute', left: 30, right: 30, top: 92, height: 584, borderRadius: 24, padding: 3,
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

          <div style={{ position: 'relative', width: 150, height: 82, marginTop: 2 }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={t.art} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}
                style={{ position: 'absolute', inset: 0 }}>
                <Art kind={t.art} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="h-display" style={{ fontSize: 24, marginTop: 2 }}>Sun in Taurus.</div>
          <div style={{ fontSize: 12.5, color: 'var(--label-2)', marginTop: 6 }}>Fixed earth · ruled by Venus · 8th house</div>

          <div style={{
            marginTop: 10, width: '100%', height: 30, padding: 3, borderRadius: 999, display: 'flex',
            background: 'rgba(24,12,56,0.45)', border: '1px solid rgba(179,166,196,0.22)',
          }}>
            {TABS.map((x, i) => (
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
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} style={{ width: 6, height: 6, borderRadius: 3, background: i < t.pips ? t.color : 'rgba(179,166,196,0.25)', boxShadow: i < t.pips ? `0 0 5px ${t.color}` : 'none' }} />
                  ))}
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

          <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
            {TABS.map((x, i) => (
              <button key={x.id} onClick={() => pick(i)} aria-label={x.label} style={{ width: 6, height: 6, borderRadius: 3, background: i === tab ? t.color : 'rgba(179,166,196,0.35)' }} />
            ))}
          </div>
          <div className="mono" style={{ display: 'flex', gap: 14, alignItems: 'center', fontSize: 9, letterSpacing: '0.18em', color: 'var(--label-2)' }}>
            <span>SUN · TAURUS 13°</span><span style={{ opacity: 0.6 }}>◇</span><span>8TH HOUSE</span><span style={{ opacity: 0.6 }}>◇</span><span>VENUS</span>
          </div>
          <div className="mono" style={{ fontSize: 8, letterSpacing: '0.2em', color: 'var(--label-3)', marginTop: 6 }}>ALIGN · CHART № 001/∞</div>
        </div>
      </motion.div>

      <div style={{ position: 'absolute', left: 0, right: 0, top: 690, display: 'flex', justifyContent: 'center' }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.button key={t.cta} className="chrome-cta" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}
            onClick={() => { sfx.tap(); go(t.to) }}>
            {t.cta} <span className="spark">✦</span>
          </motion.button>
        </AnimatePresence>
      </div>

      <TabBar active="you" go={go} />
    </div>
  )
}

function Art({ kind }: { kind: ChartTab['art'] }) {
  if (kind === 'venus') {
    return (
      <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', inset: 0 }}>
        <div style={{
          position: 'absolute', left: 41, top: 6, width: 68, height: 68, borderRadius: '50%',
          background: 'radial-gradient(circle at 34% 28%, #fff4cf 0%, #f2d48a 25%, #c9963e 58%, #6a4416 100%)',
          boxShadow: 'inset -12px -8px 20px rgba(40,20,5,0.55), 0 0 26px rgba(242,199,92,0.45)',
        }} />
        <svg width="150" height="82" viewBox="0 0 150 82" style={{ position: 'absolute', inset: 0 }}>
          <ellipse cx="75" cy="41" rx="70" ry="15" fill="none" stroke="rgba(255,236,190,0.55)" strokeWidth="1.2" transform="rotate(-12 75 41)" />
        </svg>
      </motion.div>
    )
  }
  if (kind === 'house') {
    // the 12-house wheel with the 8th lit
    return (
      <motion.svg width="150" height="82" viewBox="-41 -41 82 82" animate={{ rotate: [0, 4, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', inset: 0 }}>
        <circle r="38" fill="none" stroke="rgba(222,208,246,0.35)" />
        <circle r="16" fill="none" stroke="rgba(222,208,246,0.25)" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (Math.PI / 6) * i
          return <line key={i} x1={16 * Math.cos(a)} y1={16 * Math.sin(a)} x2={38 * Math.cos(a)} y2={38 * Math.sin(a)} stroke="rgba(222,208,246,0.25)" />
        })}
        {/* 8th house wedge (houses run counter-clockwise from the ascendant on the left) */}
        <path d={(() => { const a0 = Math.PI + (Math.PI / 6) * 7, a1 = a0 + Math.PI / 6; const p = (r: number, a: number) => `${r * Math.cos(a)} ${-r * Math.sin(a)}`; return `M ${p(16, a0)} L ${p(38, a0)} A 38 38 0 0 0 ${p(38, a1)} L ${p(16, a1)} A 16 16 0 0 1 ${p(16, a0)} Z` })()}
          fill="rgba(232,98,138,0.55)" stroke="#e8628a" style={{ filter: 'drop-shadow(0 0 6px #e8628a)' }} />
        <text x="0" y="4" textAnchor="middle" fontSize="11" fill="#efe6d6" fontFamily="EB Garamond, serif" fontStyle="italic">8</text>
      </motion.svg>
    )
  }
  const src = kind === 'aura' ? TAURUS.auraImg : TAURUS.figureImg
  return (
    <motion.img src={src} alt="" animate={{ y: [0, -4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute', left: 20, top: 0, width: 110, height: 82, objectFit: 'cover', objectPosition: '50% 35%',
        mixBlendMode: 'screen',
        WebkitMaskImage: 'radial-gradient(closest-side, #000 55%, transparent 100%)', maskImage: 'radial-gradient(closest-side, #000 55%, transparent 100%)',
      }} />
  )
}
