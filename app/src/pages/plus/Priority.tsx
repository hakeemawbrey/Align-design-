import { motion } from 'framer-motion'
import type { PageProps } from '../types'
import { rise } from '../../components/onboarding/shared'
import { Label } from '../../components/kit'
import { SIGNS, type SignId } from '../../data/signs'
import { ME } from '../../data/profiles'
import { useSession } from '../../lib/session'
import { Cta, Eyebrow, Frame, PillToast, useToast } from './ui'

/** the other cards in tonight's orbit, left to right; you sit in the middle */
const ORBIT: { sign: SignId; x: number; y: number; s: number }[] = [
  { sign: 'aquarius', x: 46, y: 270, s: 36 },
  { sign: 'leo', x: 106, y: 296, s: 40 },
  { sign: 'scorpio', x: 284, y: 296, s: 40 },
  { sign: 'pisces', x: 344, y: 270, s: 36 },
]

function Orb({ sign, size, glow }: { sign: SignId; size: number; glow?: boolean }) {
  const s = SIGNS[sign]
  return (
    <div style={{
      width: size, height: size, borderRadius: size / 2, overflow: 'hidden', background: '#0b0620',
      boxShadow: glow
        ? `0 0 0 2px ${s.light}, 0 0 30px ${s.color}aa, 0 0 70px ${s.color}55`
        : `0 0 14px ${s.color}66, inset 0 0 0 1px ${s.color}66`,
      opacity: glow ? 1 : 0.85,
    }}>
      <img src={s.auraImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.35)' }} />
    </div>
  )
}

/** P-02 — Priority queue (Align+): your card enters decks earlier in the night. */
export default function Priority({ go, back }: PageProps) {
  const { alignPlus } = useSession()
  const [toast, show] = useToast()

  return (
    <Frame onBack={back} aurora="#2a1666" seed={33}>
      <div style={{ position: 'absolute', top: 100, left: 24, right: 24 }}>
        <Eyebrow>Align+ · Priority</Eyebrow>
        <motion.h1 className="h-display" {...rise(0.12)} style={{ fontSize: 30, lineHeight: 1.12, marginTop: 8 }}>Your card lands<br />nearer the top.</motion.h1>
      </div>

      {/* tonight's orbit */}
      <motion.svg {...rise(0.2, 0)} width="390" height="140" style={{ position: 'absolute', left: 0, top: 196, overflow: 'visible' }}>
        <ellipse cx="195" cy="64" rx="166" ry="56" fill="none" stroke="rgba(179,166,196,0.35)" strokeWidth="1" />
      </motion.svg>
      {ORBIT.map((o, i) => (
        <motion.div key={o.sign} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1, y: [0, -3, 0] }}
          transition={{ opacity: { delay: 0.25 + i * 0.08 }, scale: { type: 'spring', stiffness: 260, damping: 18, delay: 0.25 + i * 0.08 }, y: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' } }}
          style={{ position: 'absolute', left: o.x - o.s / 2, top: o.y - o.s / 2 }}>
          <Orb sign={o.sign} size={o.s} />
        </motion.div>
      ))}
      <motion.div initial={{ opacity: 0, scale: 0.5, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.5 }}
        style={{ position: 'absolute', left: 195 - 34, top: 300 - 34 }}>
        <Orb sign={ME.sign} size={68} glow />
      </motion.div>
      <motion.div {...rise(0.6, 6)} className="mono" style={{ position: 'absolute', top: 346, left: 0, right: 0, textAlign: 'center', fontSize: 9, letterSpacing: '0.2em', color: 'var(--label-2)' }}>
        YOU · CARD 3 OF 41
      </motion.div>

      <motion.div {...rise(0.4)} style={{ position: 'absolute', top: 360, left: 24, right: 24 }}>
        {[
          ['What it does', 'Your card enters other decks earlier in the night, while people still have swipes left and attention to spend.'],
          ['It is not a cheat', 'Alignment still decides who sees you. Priority only decides when. A weak read stays a weak read.'],
          ['This week', 'You landed in 41 decks, 28 of them in the first five cards. It resets at 11:11, so a quiet Tuesday does not bank into Friday.'],
        ].map(([h, b]) => (
          <div key={h}>
            <Label style={{ margin: '14px 0 5px' }}>{h}</Label>
            <p style={{ fontSize: 13, lineHeight: 1.42, color: 'var(--label-1)', opacity: 0.9 }}>{b}</p>
          </div>
        ))}
      </motion.div>

      <PillToast text={toast} />
      <Cta onClick={() => (alignPlus ? show('Priority is on. Your card goes out early tonight.') : go('paywall'))}>
        {alignPlus ? 'Priority is on' : 'Skip the queue'}
      </Cta>
    </Frame>
  )
}
