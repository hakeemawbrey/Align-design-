import { motion } from 'framer-motion'
import { PageShell, P } from '../../components/kit'
import { rise } from '../../components/onboarding/shared'
import type { PageProps } from '../types'
import { ABOUT, ABOUT_CITY } from './copy'
import { Title2 } from './bits'

const CHAKRA = ['#b45cff', '#5b6cff', '#3fc4f0', '#5fdc54', '#ffe14a', '#ff9a4a', '#ff3b46']

/** flower-of-life ring with the seven chakra lights down its spine */
function Emblem({ size = 180 }: { size?: number }) {
  const R = 44
  const ring = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i + Math.PI / 2
    return [Math.cos(a) * R, Math.sin(a) * R] as const
  })
  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <svg width={size} height={size} viewBox="-90 -90 180 180" style={{ position: 'absolute', inset: 0 }}>
        <g fill="none" stroke="rgba(239,230,214,0.55)" strokeWidth="0.9">
          <circle r={88} />
          <circle r={R} />
          {ring.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={R} />)}
        </g>
      </svg>
      {CHAKRA.map((c, i) => (
        <motion.span key={c}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: [1, 1.12, 1] }}
          transition={{ opacity: { delay: 0.3 + (6 - i) * 0.08 }, scale: { delay: 1 + i * 0.25, duration: 3.2, repeat: Infinity, ease: 'easeInOut' } }}
          style={{
            position: 'absolute', left: size / 2 - 12, top: size / 2 - 12 + (i - 3) * 24 * (size / 180), width: 24, height: 24, borderRadius: '50%',
            background: `radial-gradient(circle at 50% 50%, #fff 0%, ${c} 38%, ${c}cc 62%, ${c}00 100%)`,
            boxShadow: `0 0 14px ${c}, 0 0 4px ${c}`,
          }} />
      ))}
    </div>
  )
}

/** A-01 About Align — why this exists */
export function About({ go, back }: PageProps) {
  return (
    <PageShell onBack={back} topBar="About Align" align="center" footer={ABOUT.footer}
      cta={{ label: 'Keep reading', onClick: () => go('x/about-city') }}>
      <div style={{ paddingTop: 8 }}>
        <motion.div {...rise(0.05, 10)}><Emblem /></motion.div>
        <motion.div className="eyebrow" {...rise(0.1, 8)} style={{ marginTop: 26, color: 'var(--label-3)', letterSpacing: '0.2em' }}>{ABOUT.eyebrow}</motion.div>
        <Title2 lines={ABOUT.title as [string, string]} style={{ marginTop: 8 }} />
        <div style={{ marginTop: 14 }}>
          {ABOUT.body.map((t) => <P key={t} style={{ fontSize: 13.5, lineHeight: 1.5, marginBottom: 10 }}>{t}</P>)}
        </div>
      </div>
    </PageShell>
  )
}

/** A-02 About Align · Space City — what we built, Houston first */
export function AboutCity({ back }: PageProps) {
  return (
    <PageShell onBack={back} topBar="About Align" align="center" cta={{ label: 'Done', onClick: back }}>
      <motion.div className="eyebrow" {...rise(0.05, 8)} style={{ color: 'var(--label-3)', letterSpacing: '0.2em', marginTop: 6 }}>{ABOUT_CITY.eyebrow}</motion.div>
      <Title2 lines={ABOUT_CITY.title as [string, string]} style={{ marginTop: 8 }} />
      <div style={{ marginTop: 22 }}>
        {ABOUT_CITY.body.map((t) => <P key={t} style={{ fontSize: 13.5, lineHeight: 1.5, marginBottom: 12 }}>{t}</P>)}
      </div>
      <motion.div {...rise(0.3, 8)} className="eyebrow" style={{ marginTop: 26, color: 'var(--label-3)', letterSpacing: '0.2em' }}>
        <span style={{ color: '#f2d58a' }}>✦</span> {ABOUT_CITY.cityLabel} <span style={{ color: '#f2d58a' }}>✦</span>
      </motion.div>
      <P style={{ fontSize: 13.5, lineHeight: 1.5, marginTop: 8 }}>{ABOUT_CITY.city}</P>
      <motion.p {...rise(0.45, 8)} style={{ margin: '20px auto 0', maxWidth: 300, fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 17, lineHeight: 1.4, color: 'var(--label-1)' }}>
        {ABOUT_CITY.quote}
      </motion.p>
    </PageShell>
  )
}
