import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import TabBar from '../components/TabBar'
import { SKY_DATE, SKY_HERO, SKY_TABS, SKY_FOOTER } from '../data/sky'
import { sfx } from '../lib/sfx'

/** S-14 Sky · today — the daily reading for your sign. */
export default function Sky({ go }: ScreenProps) {
  const [tab, setTab] = useState(0)
  const t = SKY_TABS[tab]
  const pick = (i: number) => { if (i !== tab) { sfx.tap(); setTab(i) } }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora="#4a2a9a" warm="#7a3a6a" count={70} seed={52} />

      <div className="mono" style={{ position: 'absolute', left: 28, right: 28, top: 64, display: 'flex', justifyContent: 'space-between', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
        <span style={{ color: 'var(--label-2)' }}>{SKY_DATE.season}</span>
        <button onClick={() => { sfx.tap(); go('calendar') }} className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--align)' }}>
          {SKY_DATE.label} ›
        </button>
      </div>

      {/* the reading card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        style={{
          position: 'absolute', left: 36, right: 36, top: 88, height: 548, borderRadius: 24, padding: 3,
          background: 'linear-gradient(160deg, rgba(222,208,246,0.85), rgba(150,120,210,0.5) 50%, rgba(222,208,246,0.8))',
          boxShadow: '0 0 40px rgba(120,70,220,0.35), 0 20px 50px rgba(0,0,0,0.45)',
        }}
      >
        <div style={{
          position: 'relative', height: '100%', borderRadius: 21, overflow: 'hidden', padding: '14px 18px 12px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          background: 'radial-gradient(60% 40% at 50% 22%, rgba(242,170,140,0.18), transparent 70%), radial-gradient(30% 60% at 50% 60%, rgba(150,80,255,0.4), transparent 100%), linear-gradient(180deg, #3a1d80 0%, #34187a 50%, #2c1468 100%)',
        }}>
          <div style={{ position: 'absolute', inset: 8, borderRadius: 15, border: '1px solid rgba(222,208,246,0.28)', pointerEvents: 'none' }} />
          <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.24em', color: 'var(--label-2)' }}>
            {SKY_HERO.sign.toUpperCase()} · TODAY’S SKY
          </div>

          <VenusOrb />

          <div className="h-display" style={{ fontSize: 25, marginTop: 6, textAlign: 'center' }}>{SKY_HERO.headline}</div>
          <div style={{ fontSize: 12.5, color: 'var(--label-2)', marginTop: 6, textAlign: 'center' }}>{SKY_HERO.sub}</div>

          {/* tabs */}
          <div style={{
            marginTop: 12, width: '100%', height: 32, padding: 3, borderRadius: 999, display: 'flex',
            background: 'rgba(24,12,56,0.45)', border: '1px solid rgba(179,166,196,0.22)',
          }}>
            {SKY_TABS.map((x, i) => (
              <button key={x.id} onClick={() => pick(i)} style={{ position: 'relative', flex: 1, height: '100%' }}>
                {i === tab && (
                  <motion.div layoutId="sky-tab" transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'rgba(120,96,170,0.55)' }} />
                )}
                <span className="mono" style={{ position: 'relative', fontSize: 8.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: i === tab ? x.color : 'var(--label-2)' }}>
                  {x.label}
                </span>
              </button>
            ))}
          </div>

          {/* reading */}
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
            {SKY_TABS.map((x, i) => (
              <button key={x.id} onClick={() => pick(i)} aria-label={x.label} style={{ width: 6, height: 6, borderRadius: 3, background: i === tab ? 'var(--align)' : 'rgba(179,166,196,0.35)' }} />
            ))}
          </div>
          <div className="mono" style={{ display: 'flex', gap: 14, alignItems: 'center', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--label-2)' }}>
            <span>{SKY_FOOTER.left}</span><span style={{ opacity: 0.6 }}>◇</span><span>{SKY_FOOTER.right}</span>
          </div>
          <div className="mono" style={{ fontSize: 8, letterSpacing: '0.2em', color: 'var(--label-3)', marginTop: 6 }}>ALIGN · {SKY_DATE.serial}</div>
        </div>
      </motion.div>

      <div style={{ position: 'absolute', left: 0, right: 0, top: 652, display: 'flex', justifyContent: 'center' }}>
        <motion.button className="chrome-cta" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          onClick={() => { sfx.tap(); go('deck') }}>
          Read tonight’s deck <span className="spark">✦</span>
        </motion.button>
      </div>

      <TabBar active="deck" go={go} />
    </div>
  )
}

/** Venus, rose-gold, tilted ring, with the retrograde mark. */
function VenusOrb() {
  return (
    <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'relative', width: 150, height: 100, marginTop: 6 }}>
      <div style={{ position: 'absolute', left: 37, top: 12, width: 76, height: 76, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(242,170,140,0.45), transparent)', filter: 'blur(10px)', transform: 'scale(1.6)' }} />
      <div style={{
        position: 'absolute', left: 37, top: 12, width: 76, height: 76, borderRadius: '50%',
        background: 'radial-gradient(circle at 34% 28%, #fff1e2 0%, #f3c2a2 22%, #d98a78 52%, #8a4a5a 82%, #4a2240 100%)',
        boxShadow: 'inset -10px -8px 18px rgba(40,10,40,0.55), 0 0 24px rgba(242,170,140,0.45)',
      }} />
      <svg width="150" height="100" viewBox="0 0 150 100" style={{ position: 'absolute', inset: 0 }}>
        <ellipse cx="75" cy="52" rx="70" ry="15" fill="none" stroke="rgba(255,226,206,0.55)" strokeWidth="1.2" transform="rotate(-12 75 52)" />
      </svg>
      <span className="serif italic" style={{
        position: 'absolute', right: 6, top: 2, fontSize: 15, color: '#ffd9c8',
        textShadow: '0 0 8px rgba(242,170,140,0.8)',
      }}>℞</span>
    </motion.div>
  )
}
