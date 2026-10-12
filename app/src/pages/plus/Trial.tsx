import { useEffect } from 'react'
import { motion } from 'framer-motion'
import type { PageProps } from '../types'
import Backdrop from '../../components/paywall/Backdrop'
import Portal from '../../components/paywall/Portal'
import { rise } from '../../components/onboarding/shared'
import { sfx } from '../../lib/sfx'
import { plan } from './plans'
import { Cta, Eyebrow, Frame, Quiet } from './ui'

const PW = 140
const PH = 196

/** S-12 — Trial active: three days on us, and exactly what happens next. x/trial/<plan> */
export default function Trial({ go, arg }: PageProps) {
  const p = plan(arg)
  useEffect(() => { const t = window.setTimeout(() => sfx.sparkle(), 350); return () => clearTimeout(t) }, [])

  const steps: [string, string][] = [['Today', 'Align+ opens'], ['Tomorrow', 'we nudge you'], ['In 3 days', `${p.price} renews`]]

  return (
    <Frame bg={<Backdrop seed={44} />} onClose={() => go('deck')}>
      <div style={{ position: 'absolute', top: 104, left: 0, right: 0, textAlign: 'center' }}>
        <Eyebrow>Align+ is lit</Eyebrow>
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.85, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 140, damping: 16, delay: 0.1 }}
        style={{ position: 'absolute', left: 195 - PW / 2, top: 150, width: PW, height: PH }}>
        <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
          <Portal w={PW} h={PH} />
        </motion.div>
      </motion.div>

      <motion.h1 className="h-display" {...rise(0.3)} style={{ position: 'absolute', top: 392, left: 20, right: 20, textAlign: 'center', fontSize: 32, lineHeight: 1.18 }}>
        Three days on us.<br />Then {p.price} {p.word}.
      </motion.h1>

      {/* what happens when */}
      <motion.div {...rise(0.45)} style={{ position: 'absolute', top: 494, left: 24, right: 24 }}>
        <div style={{ position: 'absolute', top: 5, left: 46, right: 46, height: 1, background: 'rgba(179,166,196,0.35)' }} />
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 0.12 }} transition={{ delay: 0.9, duration: 0.6 }}
          style={{ position: 'absolute', top: 5, left: 46, right: 46, height: 1, background: 'var(--label-1)', transformOrigin: 'left' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {steps.map(([h, s], i) => (
            <div key={h} style={{ width: 96, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <motion.span
                animate={i === 0 ? { boxShadow: ['0 0 0px rgba(248,237,255,0.9)', '0 0 12px rgba(248,237,255,0.9)', '0 0 0px rgba(248,237,255,0.9)'] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 11, height: 11, borderRadius: '50%', background: i === 0 ? 'var(--chrome)' : 'var(--void)', border: i === 0 ? 'none' : '1.2px solid var(--label-2)' }} />
              <span className="mono" style={{ marginTop: 10, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: i === 0 ? 'var(--label-1)' : 'var(--label-2)', fontWeight: i === 0 ? 700 : 400 }}>{h}</span>
              <span style={{ marginTop: 4, fontSize: 12.5, color: 'var(--label-2)' }}>{s}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.p {...rise(0.55)} style={{ position: 'absolute', top: 584, left: 24, right: 24, textAlign: 'center', fontSize: 13.5, color: 'var(--label-1)', opacity: 0.9 }}>
        We nudge you the day before it renews. No ambush.
      </motion.p>

      <Cta onClick={() => { sfx.align(); go('deck') }}>Back to my deck</Cta>
      <Quiet top={706} onClick={() => go('x/manage-plus')} style={{ fontSize: 12.5 }}>Cancel any time in Settings · Align+</Quiet>
    </Frame>
  )
}
