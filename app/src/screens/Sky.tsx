import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ScreenId, ScreenProps } from './types'
import Strength from '../components/Strength'
import Starfield from '../components/Starfield'
import { SKY_DATE, SKY_HERO, SKY_TABS, SKY_FOOTER, MOON_NOW, MOON_STRIP, WEEK_STRIP, type SkyTab } from '../data/sky'
import MoonPhase from '../components/sky/MoonPhase'
import { sfx } from '../lib/sfx'
import { cameFrom, goFrom, skyTrail } from '../components/you/origin'

/** brand: no gold pills — today's Venus reading reads in Venus rose instead of the data's gold */
const tone = (x: SkyTab): SkyTab => (x.color.toLowerCase() === '#f2c75c' ? { ...x, color: '#f3a98f' } : x)

/** S-14 Sky · today — the daily reading for your sign. */
export default function Sky({ go }: ScreenProps) {
  const [tab, setTab] = useState(0)
  const t = tone(SKY_TABS[tab])
  // opened from the deck's sky pill, the You tab or a notification; the calendar hands the original back
  const [from] = useState<ScreenId>(() => {
    skyTrail.from = cameFrom('sky', 'deck')
    return skyTrail.from
  })
  const pick = (i: number) => { if (i !== tab) { sfx.tap(); setTab(i) } }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora="#4a2a9a" warm="#7a3a6a" count={70} seed={52} />

      <button aria-label="Back" onClick={() => { sfx.tap(); go(from) }}
        style={{ position: 'absolute', left: 16, top: 56, width: 40, height: 40, display: 'grid', placeItems: 'center', color: 'var(--label-1)', zIndex: 2 }}>
        <svg width="11" height="18" viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 2 2 10l8 8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div className="mono" style={{ position: 'absolute', left: 0, right: 0, top: 56, height: 40, display: 'grid', placeItems: 'center', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--label-2)', pointerEvents: 'none' }}>
        {SKY_DATE.season}
      </div>
      <button onClick={() => { sfx.tap(); goFrom(go, 'calendar', 'sky') }} className="mono"
        style={{ position: 'absolute', right: 16, top: 56, height: 40, padding: '0 8px', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--label-2)', zIndex: 2 }}>
        {SKY_DATE.label} ›
      </button>

      {/* the reading card */}
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
          background: 'radial-gradient(60% 40% at 50% 22%, rgba(242,170,140,0.18), transparent 70%), radial-gradient(30% 60% at 50% 60%, rgba(150,80,255,0.4), transparent 100%), linear-gradient(180deg, #3a1d80 0%, #34187a 50%, #2c1468 100%)',
        }}>
          <div style={{ position: 'absolute', inset: 8, borderRadius: 15, border: '1px solid rgba(222,208,246,0.28)', pointerEvents: 'none' }} />
          <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.24em', color: 'var(--label-2)' }}>
            {SKY_HERO.sign.toUpperCase()} · TODAY’S SKY
          </div>

          {/* the picture changes with the tab */}
          <div style={{ position: 'relative', width: '100%', height: 98, marginTop: 4 }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={t.id}
                initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25 }}
                style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Hero id={t.id} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* tabs */}
          <div style={{
            marginTop: 12, width: '100%', height: 36, padding: 3, borderRadius: 999, display: 'flex',
            background: 'rgba(24,12,56,0.45)', border: '1px solid rgba(179,166,196,0.22)',
          }}>
            {SKY_TABS.map((x, i) => (
              <button key={x.id} onClick={() => pick(i)} style={{ position: 'relative', flex: 1, height: '100%' }}>
                {i === tab && (
                  <motion.div layoutId="sky-tab" transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'rgba(120,96,170,0.55)' }} />
                )}
                <span className="mono" style={{ position: 'relative', fontSize: 8.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: i === tab ? tone(x).color : 'var(--label-2)' }}>
                  {x.label}
                </span>
              </button>
            ))}
          </div>

          {/* reading */}
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
                <Reading t={t} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mono" style={{ display: 'flex', gap: 14, alignItems: 'center', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--label-2)' }}>
            <span>{SKY_FOOTER.left}</span><span style={{ opacity: 0.6 }}>◇</span><span>{SKY_FOOTER.right}</span>
          </div>
          <div className="mono" style={{ fontSize: 8, letterSpacing: '0.2em', color: 'var(--label-3)', marginTop: 6 }}>ALIGN · {SKY_DATE.serial}</div>
        </div>
      </motion.div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 34, display: 'flex', justifyContent: 'center' }}>
        <motion.button className="chrome-cta" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          onClick={() => { sfx.tap(); go('deck') }}>
          Read tonight’s deck <span className="spark">✦</span>
        </motion.button>
      </div>

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

function Reading({ t }: { t: SkyTab }) {
  return (
    <>
      <div className="serif italic" style={{ fontSize: 19, lineHeight: 1.2, marginTop: 6, color: 'var(--label-1)' }}>{t.headline}</div>
      <div style={{ fontSize: 12, lineHeight: 1.45, marginTop: 6, color: 'var(--label-1)', opacity: 0.86 }}>{t.body}</div>
      <div className="mono" style={{ fontSize: 8.5, letterSpacing: '0.2em', color: t.color, marginTop: 10 }}>TRY THIS</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 5 }}>
        {t.tries.map((x, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, fontSize: 12, lineHeight: 1.35, color: 'var(--label-1)' }}>
            <span style={{
              flexShrink: 0, width: 15, height: 15, borderRadius: 8, marginTop: 0.5, display: 'grid', placeItems: 'center',
              fontSize: 8.5, fontFamily: 'var(--mono)', color: '#1a0f3a', background: t.color,
            }}>{i + 1}</span>
            {x}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8, paddingTop: 7, borderTop: '1px solid rgba(222,208,246,0.16)', fontSize: 12, lineHeight: 1.35 }}>
        <span className="mono" style={{ flexShrink: 0, fontSize: 8.5, letterSpacing: '0.2em', color: 'var(--label-3)', paddingTop: 2 }}>SKIP</span>
        <span style={{ color: 'var(--label-2)' }}>{t.skip}</span>
      </div>
    </>
  )
}

function Hero({ id }: { id: SkyTab['id'] }) {
  if (id === 'today') return <VenusOrb />
  if (id === 'tonight') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
          <MoonPhase size={78} lit={MOON_NOW.lit} waxing={MOON_NOW.waxing} />
        </motion.div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <span className="mono" style={{ fontSize: 9, letterSpacing: '0.18em', color: '#f39a3a' }}>☾ IN {MOON_NOW.glyph} {MOON_NOW.sign.toUpperCase()}</span>
          <span className="mono" style={{ fontSize: 8.5, letterSpacing: '0.16em', color: 'var(--label-2)' }}>{MOON_NOW.phase.toUpperCase()}</span>
          <span className="mono" style={{ fontSize: 8.5, letterSpacing: '0.16em', color: 'var(--label-2)' }}>{Math.round(MOON_NOW.lit * 100)}% LIT · SHRINKING</span>
          <span className="mono" style={{ fontSize: 8.5, letterSpacing: '0.16em', color: '#e8705a' }}>♂ MARS BESIDE IT</span>
        </div>
      </div>
    )
  }
  if (id === 'moon') {
    return (
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 18, right: 18, top: 17, height: 1, background: 'linear-gradient(90deg, rgba(179,166,196,0.1), rgba(179,166,196,0.4), rgba(179,166,196,0.1))' }} />
        {MOON_STRIP.map((m) => (
          <div key={m.label} style={{ position: 'relative', width: 54, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              padding: 3, borderRadius: '50%',
              boxShadow: m.today ? '0 0 0 1.5px rgba(248,237,255,0.85), 0 0 14px rgba(248,237,255,0.4)' : 'none',
              background: m.today ? 'rgba(20,10,46,0.9)' : 'transparent',
            }}>
              <MoonPhase size={m.today ? 34 : 28} lit={m.lit} waxing={m.waxing} glow={m.today} />
            </div>
            <span className="mono" style={{ fontSize: 7.5, letterSpacing: '0.1em', textAlign: 'center', lineHeight: 1.3, textTransform: 'uppercase', color: m.today ? 'var(--label-1)' : 'var(--label-2)' }}>
              {m.label}<br /><span style={{ color: 'var(--label-3)' }}>{m.date}</span>
            </span>
          </div>
        ))}
      </div>
    )
  }
  // week
  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
      {WEEK_STRIP.map((w, i) => {
        const today = i === 0
        return (
          <div key={i} style={{ width: 38, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <span className="mono" style={{ fontSize: 8.5, letterSpacing: '0.12em', color: 'var(--label-3)' }}>{w.d}</span>
            <div style={{
              width: 32, height: 32, borderRadius: 16, display: 'grid', placeItems: 'center', fontSize: 13,
              color: today ? 'var(--chrome-ink)' : 'var(--label-1)',
              background: today ? 'var(--chrome)' : w.mark ? 'rgba(154,123,224,0.35)' : 'rgba(24,12,56,0.45)',
              border: w.mark && !today ? '1px solid #9a7be0' : '1px solid rgba(179,166,196,0.2)',
              boxShadow: today ? '0 0 14px rgba(248,237,255,0.45)' : 'none',
            }}>{w.n}</div>
            <div style={{ height: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              {w.mark === 'New moon' && <MoonPhase size={12} lit={0} waxing glow={false} />}
              {w.mark && <span className="mono" style={{ fontSize: 7.5, letterSpacing: '0.04em', textAlign: 'center', lineHeight: 1.2, color: today ? 'var(--label-1)' : '#c9b6f0', textTransform: 'uppercase' }}>{w.mark}</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
