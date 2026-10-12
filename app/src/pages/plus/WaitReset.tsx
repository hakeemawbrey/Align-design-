import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { PageProps } from '../types'
import { rise } from '../../components/onboarding/shared'
import { SIGNS } from '../../data/signs'
import { ME } from '../../data/profiles'
import { sfx } from '../../lib/sfx'
import { Cta, Eyebrow, Frame, PillToast, Quiet, useToast } from './ui'

/** time left until the next 11:11 (the nightly deal) */
function untilDeal(now = new Date()) {
  const next = new Date(now)
  next.setHours(23, 11, 0, 0)
  if (next <= now) next.setDate(next.getDate() + 1)
  const m = Math.ceil((next.getTime() - now.getTime()) / 60000)
  return { h: Math.floor(m / 60), m: m % 60 }
}

const CX = 195
const CY = 290

/** S-13 — Wait for reset: the deck is spent, the free path is to wait for 11:11. */
export default function WaitReset({ go, back }: PageProps) {
  const [left, setLeft] = useState(untilDeal)
  const [asked, setAsked] = useState(false)
  const [toast, show] = useToast()
  useEffect(() => { const t = window.setInterval(() => setLeft(untilDeal()), 15000); return () => clearInterval(t) }, [])
  const aura = SIGNS[ME.sign]

  return (
    <Frame onClose={back} aurora="#2a1666" seed={21}>
      <div style={{ position: 'absolute', top: 104, left: 0, right: 0, textAlign: 'center' }}>
        <Eyebrow>The deck · empty until 11:11</Eyebrow>
      </div>

      {/* the waiting orb: your aura, dimmed, inside the clock rings */}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
        style={{ position: 'absolute', left: CX - 128, top: CY - 128, width: 256, height: 256, borderRadius: '50%', border: '1px dashed rgba(179,166,196,0.3)' }} />
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', left: CX - 128, top: CY - 128, width: 256, height: 256 }}>
        <span style={{ position: 'absolute', left: 126, top: -2, width: 4, height: 4, borderRadius: 2, background: 'var(--label-1)', boxShadow: '0 0 8px rgba(239,230,214,0.9)' }} />
      </motion.div>
      <motion.div animate={{ opacity: [0.55, 0.75, 0.55], scale: [1, 1.04, 1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', left: CX - 96, top: CY - 108, width: 192, height: 192, borderRadius: '50%', overflow: 'hidden', filter: 'blur(6px)' }}>
        <img src={aura.auraImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.2)' }} />
      </motion.div>
      <div style={{ position: 'absolute', left: CX - 96, top: CY - 96, width: 192, height: 192, borderRadius: '50%', border: '1px solid rgba(239,230,214,0.35)', background: 'radial-gradient(circle, rgba(20,10,46,0.35) 0%, rgba(20,10,46,0) 70%)' }} />
      <div style={{ position: 'absolute', left: CX - 42, top: CY - 10, width: 84, height: 84, borderRadius: '50%', border: '1px solid rgba(239,230,214,0.18)' }} />

      <div style={{ position: 'absolute', top: CY - 34, left: 0, right: 0, textAlign: 'center' }}>
        <motion.div className="h-display" {...rise(0.2)} style={{ fontSize: 44, textShadow: '0 2px 18px rgba(11,6,32,0.8)' }}>
          {left.h}h {String(left.m).padStart(2, '0')}m
        </motion.div>
        <div className="mono" style={{ marginTop: 6, fontSize: 8.5, letterSpacing: '0.2em', color: 'var(--label-2)' }}>UNTIL THE DECK REFILLS</div>
      </div>

      <div style={{ position: 'absolute', top: 470, left: 24, right: 24, textAlign: 'center' }}>
        <motion.h1 className="h-display" {...rise(0.3)} style={{ fontSize: 28, lineHeight: 1.2 }}>Rest. The good ones are<br />worth a night’s wait.</motion.h1>
        <motion.p {...rise(0.4)} style={{ margin: '12px auto 0', maxWidth: 320, fontSize: 13.5, lineHeight: 1.45, color: 'var(--label-2)' }}>
          Fifteen fresh cards at 11:11, dealt from tonight’s sky. Nobody you have already seen comes back.
        </motion.p>
      </div>

      <PillToast text={toast} />
      <Cta onClick={() => { if (asked) { show('Already set. See you at 11:11.'); return } setAsked(true); sfx.align(); show('We will nudge you at 11:11.') }}>
        {asked ? 'We will nudge you' : 'Notify me at 11:11'}
      </Cta>
      <Quiet top={706} underline onClick={() => go('paywall')}>or skip the wait with Align+</Quiet>
    </Frame>
  )
}
