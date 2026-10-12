import { motion } from 'framer-motion'
import type { PageProps } from '../types'
import Backdrop from '../../components/paywall/Backdrop'
import Portal from '../../components/paywall/Portal'
import { rise } from '../../components/onboarding/shared'
import { session } from '../../lib/session'
import { sfx } from '../../lib/sfx'
import { plan } from './plans'
import { Cta, Eyebrow, Frame, Quiet } from './ui'

const PW = 140
const PH = 196

/** G-14 — Trial ending: one day left, what stays and what goes. x/trial-ending/<plan> */
export default function TrialEnding({ go, back, arg }: PageProps) {
  const p = plan(arg ?? 'founding')

  return (
    <Frame bg={<Backdrop seed={46} />} onBack={back}>
      <div style={{ position: 'absolute', top: 100, left: 20, right: 20, textAlign: 'center' }}>
        <Eyebrow>Day 2 of 3 · one day left</Eyebrow>
        <motion.h1 className="h-display" {...rise(0.12)} style={{ fontSize: 31, lineHeight: 1.18, marginTop: 10 }}>Tomorrow the stars<br />start counting again.</motion.h1>
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }}
        style={{ position: 'absolute', left: 195 - PW / 2, top: 250, width: PW, height: PH }}>
        <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
          <Portal w={PW} h={PH} />
        </motion.div>
      </motion.div>

      <motion.div {...rise(0.35)} style={{ position: 'absolute', top: 506, left: 40, right: 40, display: 'flex' }}>
        {([
          ['You keep', ['45 cards a night', '33 peeks a week', '3 packs a day'], 'var(--label-1)'],
          ['Or lose', ['15 cards a night', '3 peeks a day', '1 pack a day'], 'var(--label-2)'],
        ] as const).map(([h, items, c], i) => (
          <div key={h} style={{ flex: 1, paddingLeft: i ? 16 : 0, borderLeft: i ? '1px solid rgba(179,166,196,0.25)' : undefined }}>
            <div className="mono" style={{ fontSize: 8.5, letterSpacing: '0.2em', color: 'var(--label-3)', textTransform: 'uppercase' }}>{h}</div>
            {items.map((x) => <div key={x} style={{ marginTop: 6, fontSize: 13.5, color: c }}>{x}</div>)}
          </div>
        ))}
      </motion.div>

      <Cta top={660} onClick={() => { session.patch({ alignPlus: true }); sfx.align(); go('deck') }}>Stay for {p.price} {p.per}</Cta>
      <Quiet top={724} onClick={back}>Let it lapse — no hard feelings</Quiet>
    </Frame>
  )
}
