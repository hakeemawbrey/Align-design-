import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { PageProps } from '../types'
import TabBar from '../../components/TabBar'
import { Planet } from '../../components/onboarding/shared'
import { SIGNS } from '../../data/signs'
import { sfx } from '../../lib/sfx'
import { TERM, TERMS, termFrom, type Term as TermT } from './terms'
import { Cta, Frame } from './ui'

const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
const PAGES = ['Meaning', 'Your chart', 'Juniper’s'] as const


/** the house wheel: twelve cusps, the axis through the lit house */
function Wheel({ house, color }: { house: number; color: string }) {
  const c = 50
  const at = (n: number, r: number) => {
    const a = Math.PI + (n - 1) * (Math.PI / 6)
    return [c + r * Math.cos(a), c - r * Math.sin(a)] as const
  }
  const [hx, hy] = at(house, 46)
  const [ox, oy] = at(((house + 5) % 12) + 1, 46)
  const [lx, ly] = at(house, 34)
  return (
    <svg width="112" height="112" viewBox="-6 -6 112 112" style={{ overflow: 'visible' }}>
      <circle cx={c} cy={c} r={46} fill="none" stroke="rgba(222,208,246,0.45)" strokeWidth="1" />
      <circle cx={c} cy={c} r={24} fill="none" stroke="rgba(222,208,246,0.3)" strokeWidth="1" />
      {Array.from({ length: 12 }, (_, i) => {
        const [x, y] = at(i + 1, 46)
        return <circle key={i} cx={x} cy={y} r={1.8} fill="rgba(222,208,246,0.75)" />
      })}
      <line x1={ox} y1={oy} x2={hx} y2={hy} stroke="rgba(222,208,246,0.55)" strokeWidth="1" />
      <text x={lx} y={ly - 3} textAnchor="middle" fontFamily="var(--mono)" fontSize="6.5" fill="rgba(222,208,246,0.8)">{ROMAN[house]}</text>
      <motion.circle cx={hx} cy={hy} r={3.6} fill={color} animate={{ r: [3.6, 4.6, 3.6], opacity: [1, 0.8, 1] }} transition={{ duration: 2.4, repeat: Infinity }}
        style={{ filter: `drop-shadow(0 0 5px ${color})` }} />
    </svg>
  )
}

function Art({ t }: { t: TermT }) {
  if (t.art.kind === 'wheel') return <Wheel house={t.art.house} color={t.color} />
  if (t.art.kind === 'planet') return <Planet size={52} color={t.art.color} light={t.art.light} dark={t.art.dark} ring={t.art.ring} glow={0.6} />
  const s = SIGNS[t.art.sign]
  return (
    <div style={{ width: 84, height: 84, borderRadius: 42, overflow: 'hidden', background: '#0b0620', boxShadow: `0 0 30px ${s.color}88, inset 0 0 0 1px ${s.color}66` }}>
      <img src={s.auraImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.3)' }} />
    </div>
  )
}

/** S-16 — Term explainer: any astro word, in plain English. x/term/<slug> */
export default function Term({ go, back, arg }: PageProps) {
  const t = TERM[arg ?? ''] ?? TERM['seventh-house']
  const [page, setPage] = useState(0)
  const [fromGlossary] = useState(() => Date.now() - termFrom.at < 1500)
  const pick = (i: number) => { if (i !== page) { sfx.tap(); setPage(i) } }
  const n = TERMS.indexOf(t) + 1
  const kindWord = t.kind === 'sign' ? 'Placement' : t.kind === 'element' ? 'Element' : t.kind === 'house' ? 'House' : 'Planet'
  const right = t.art.kind === 'wheel' ? `House · ${ROMAN[t.art.house]}` : t.code
  const body = page === 0 ? t.meaning : page === 1 ? t.mine : t.hers
  const sub = page === 0 ? t.headline : page === 1 ? 'In your chart.' : 'In Juniper’s chart.'

  return (
    <Frame onBack={back} aurora="#3a1d80" warm="#4a2a5a" seed={73}>
      <div className="mono" style={{ position: 'absolute', left: 58, top: 56, height: 40, display: 'flex', alignItems: 'center', fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--label-2)', textTransform: 'uppercase' }}>In plain English</div>
      <div className="mono" style={{ position: 'absolute', right: 24, top: 56, height: 40, display: 'flex', alignItems: 'center', fontSize: 9.5, letterSpacing: '0.2em', color: t.color, textTransform: 'uppercase', fontWeight: 700 }}>{right}</div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        style={{
          position: 'absolute', left: 24, right: 24, top: 100, height: 522, borderRadius: 24, padding: 3,
          background: 'linear-gradient(160deg, rgba(222,208,246,0.85), rgba(150,120,210,0.5) 50%, rgba(222,208,246,0.8))',
          boxShadow: '0 0 40px rgba(120,70,220,0.35), 0 20px 50px rgba(0,0,0,0.45)',
        }}>
        <div style={{
          position: 'relative', height: '100%', borderRadius: 21, overflow: 'hidden', padding: '16px 20px 12px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          background: `radial-gradient(40% 30% at 50% 22%, ${t.color}33, transparent 100%), linear-gradient(180deg, #3a1d80 0%, #34187a 50%, #2c1468 100%)`,
        }}>
          <div style={{ position: 'absolute', inset: 8, borderRadius: 15, border: '1px solid rgba(222,208,246,0.28)', pointerEvents: 'none' }} />
          <div className="mono" style={{ fontSize: 8.5, letterSpacing: '0.22em', color: 'var(--label-2)', textTransform: 'uppercase' }}>{kindWord} · appears in your chart</div>
          <div style={{ height: 104, display: 'grid', placeItems: 'center', marginTop: 4 }}><Art t={t} /></div>
          <div className="h-display" style={{ fontSize: 26, marginTop: 2, textAlign: 'center' }}>{t.title}</div>
          <div style={{ fontSize: 13, color: 'var(--label-2)', marginTop: 4 }}>{t.line}</div>

          {/* meaning · your chart · Juniper's */}
          <div style={{ marginTop: 12, width: '100%', height: 34, padding: 3, borderRadius: 999, display: 'flex', background: 'rgba(24,12,56,0.45)', border: '1px solid rgba(179,166,196,0.22)' }}>
            {PAGES.map((p, i) => (
              <button key={p} onClick={() => pick(i)} style={{ position: 'relative', flex: 1, height: '100%' }}>
                {i === page && (
                  <motion.div layoutId="term-tab" transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'rgba(120,96,170,0.55)' }} />
                )}
                <span className="mono" style={{ position: 'relative', fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: i === page ? 'var(--label-1)' : 'var(--label-2)' }}>{p}</span>
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '100%', flex: 1, marginTop: 12 }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={page}
                initial={{ opacity: 0, x: 14, filter: 'blur(4px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, x: -14, filter: 'blur(4px)' }}
                transition={{ duration: 0.22 }}
                drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2}
                onDragEnd={(_, i) => { if (i.offset.x < -40 && page < 2) pick(page + 1); else if (i.offset.x > 40 && page > 0) pick(page - 1) }}
                style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
                <span className="mono" style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: t.color, fontWeight: 700 }}>
                  {PAGES[page]} · {t.code}
                </span>
                <div className="serif italic" style={{ fontSize: 20, lineHeight: 1.2, marginTop: 6, color: 'var(--label-1)' }}>{sub}</div>
                <div style={{ fontSize: 13, lineHeight: 1.45, marginTop: 6, color: 'var(--label-1)', opacity: 0.92 }}>{body}</div>
                <div style={{ flex: 1 }} />
                <div style={{ height: 1, background: 'rgba(222,208,246,0.18)', margin: '8px 0' }} />
                <div style={{ display: 'flex', gap: 10, fontSize: 13, lineHeight: 1.4 }}>
                  <span className="mono" style={{ flex: '0 0 auto', fontSize: 9, letterSpacing: '0.16em', color: t.color, paddingTop: 2, fontWeight: 700 }}>TRY</span>
                  <span style={{ color: 'var(--label-1)' }}>{t.tryLine}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div style={{ display: 'flex', margin: '6px 0 2px' }}>
            {PAGES.map((p, i) => (
              <button key={p} onClick={() => pick(i)} aria-label={p} style={{ width: 14, height: 20, display: 'grid', placeItems: 'center' }}>
                <span style={{ width: 6, height: 6, borderRadius: 3, background: i === page ? t.color : 'rgba(179,166,196,0.35)' }} />
              </button>
            ))}
          </div>
          <div className="mono" style={{ display: 'flex', gap: 14, alignItems: 'center', fontSize: 9, letterSpacing: '0.16em', color: 'var(--label-2)', textTransform: 'uppercase' }}>
            <span>{t.facts[0]}</span><span style={{ opacity: 0.6 }}>◇</span><span>{t.facts[1]}</span>
          </div>
          <div className="mono" style={{ fontSize: 8, letterSpacing: '0.2em', color: 'var(--label-3)', marginTop: 6 }}>ALIGN · TERM № {String(n).padStart(3, '0')}/∞</div>
        </div>
      </motion.div>

      <Cta onClick={() => (fromGlossary ? back() : go('x/glossary'))}>
        {fromGlossary ? 'Back to the glossary' : 'See the whole glossary'}
      </Cta>
      <TabBar active="you" go={go} />
    </Frame>
  )
}
