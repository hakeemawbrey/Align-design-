import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ScreenId, ScreenProps } from './types'
import Starfield from '../components/Starfield'
import TabBar from '../components/TabBar'
import { SIGNS } from '../data/signs'
import { sfx } from '../lib/sfx'

const TAURUS = SIGNS.taurus

interface ChartTab {
  id: 'sign' | 'traits' | 'element' | 'ruler'
  label: string
  eyebrow: string
  pips: number
  color: string
  art: 'figure' | 'aura' | 'venus'
  headline: string
  body: string
  tryLine: string
  cta: string
  to: ScreenId
}

/** Copy from Figma G-23 → G-26 (Your Chart · Taurus). */
const TABS: ChartTab[] = [
  {
    id: 'sign', label: 'Sign', eyebrow: 'Sun in Taurus', pips: 5, color: '#e3e86a', art: 'figure',
    headline: 'You do not perform at all.',
    body: 'The sun is the part of you that needs no audience — what is left when the performance stops. Yours is in Taurus: you arrive, you stay, and you outlast whoever was louder.',
    tryLine: 'Four in tonight’s deck share this placement.',
    cta: 'See today’s sky', to: 'sky',
  },
  {
    id: 'traits', label: 'Traits', eyebrow: 'How you show up', pips: 4, color: '#a6e06a', art: 'figure',
    headline: 'You lower the room to meet you.',
    body: 'You stay exactly where you sat down. People mistake it for shyness for a week, then realise you have been running the evening the whole time. You decide in ten minutes and never say so.',
    tryLine: 'Two in your deck are also fixed.',
    cta: 'See what tests this', to: 'deck',
  },
  {
    id: 'element', label: 'Element', eyebrow: 'Fixed earth', pips: 4, color: '#7fd8b0', art: 'aura',
    headline: 'Earth needs a reason to move.',
    body: 'Earth is possession. It moves toward whatever it can keep — a person, a house, a habit — and once a hand closes it does not open to check. It costs you speed and calls it loyalty. Sometimes it is.',
    tryLine: 'Air lifts earth — two in your deck.',
    cta: 'See the elements', to: 'matches',
  },
  {
    id: 'ruler', label: 'Ruler', eyebrow: 'Venus', pips: 5, color: '#f2c75c', art: 'venus',
    headline: 'Venus runs your appetite.',
    body: 'Venus is the part of the chart that wants. In Taurus it wants slowly and completely — the good chair, the long dinner, the person who stays. Juniper answers to the same planet.',
    tryLine: 'See Venus on the calendar.',
    cta: 'See today’s sky', to: 'sky',
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
          position: 'absolute', left: 36, right: 36, top: 94, height: 542, borderRadius: 24, padding: 3,
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

          <div style={{ position: 'relative', width: 150, height: 108, marginTop: 4 }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={t.art} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}
                style={{ position: 'absolute', inset: 0 }}>
                <Art kind={t.art} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="h-display" style={{ fontSize: 25, marginTop: 4 }}>Sun in Taurus.</div>
          <div style={{ fontSize: 12.5, color: 'var(--label-2)', marginTop: 6 }}>Fixed earth, ruled by Venus.</div>

          <div style={{
            marginTop: 12, width: '100%', height: 32, padding: 3, borderRadius: 999, display: 'flex',
            background: 'rgba(24,12,56,0.45)', border: '1px solid rgba(179,166,196,0.22)',
          }}>
            {TABS.map((x, i) => (
              <button key={x.id} onClick={() => pick(i)} style={{ position: 'relative', flex: 1, height: '100%' }}>
                {i === tab && (
                  <motion.div layoutId="chart-tab" transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'rgba(120,96,170,0.55)' }} />
                )}
                <span className="mono" style={{ position: 'relative', fontSize: 8.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: i === tab ? x.color : 'var(--label-2)' }}>
                  {x.label}
                </span>
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '100%', flex: 1, marginTop: 12 }}>
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
                <div className="serif italic" style={{ fontSize: 19, lineHeight: 1.2, marginTop: 8, color: 'var(--label-1)' }}>{t.headline}</div>
                <div style={{ fontSize: 12.5, lineHeight: 1.5, marginTop: 8, color: 'var(--label-1)', opacity: 0.88 }}>{t.body}</div>
                <div style={{ height: 1, background: 'rgba(222,208,246,0.18)', margin: '10px 0' }} />
                <div style={{ display: 'flex', gap: 10, fontSize: 12.5 }}>
                  <span className="mono" style={{ fontSize: 9, letterSpacing: '0.18em', color: t.color, paddingTop: 2 }}>TRY</span>
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
            <span>SUN · TAURUS 13°</span><span style={{ opacity: 0.6 }}>◇</span><span>RULED BY VENUS</span>
          </div>
          <div className="mono" style={{ fontSize: 8, letterSpacing: '0.2em', color: 'var(--label-3)', marginTop: 6 }}>ALIGN · CHART № 001/∞</div>
        </div>
      </motion.div>

      <div style={{ position: 'absolute', left: 0, right: 0, top: 652, display: 'flex', justifyContent: 'center' }}>
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
          position: 'absolute', left: 33, top: 12, width: 84, height: 84, borderRadius: '50%',
          background: 'radial-gradient(circle at 34% 28%, #fff4cf 0%, #f2d48a 25%, #c9963e 58%, #6a4416 100%)',
          boxShadow: 'inset -12px -8px 20px rgba(40,20,5,0.55), 0 0 26px rgba(242,199,92,0.45)',
        }} />
        <svg width="150" height="108" viewBox="0 0 150 108" style={{ position: 'absolute', inset: 0 }}>
          <ellipse cx="75" cy="56" rx="70" ry="15" fill="none" stroke="rgba(255,236,190,0.55)" strokeWidth="1.2" transform="rotate(-12 75 56)" />
        </svg>
      </motion.div>
    )
  }
  const src = kind === 'aura' ? TAURUS.auraImg : TAURUS.figureImg
  return (
    <motion.img src={src} alt="" animate={{ y: [0, -4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute', left: 15, top: 0, width: 120, height: 108, objectFit: 'cover', objectPosition: '50% 35%',
        mixBlendMode: 'screen',
        WebkitMaskImage: 'radial-gradient(closest-side, #000 55%, transparent 100%)', maskImage: 'radial-gradient(closest-side, #000 55%, transparent 100%)',
      }} />
  )
}
