import { motion } from 'framer-motion'
import type { PageProps } from '../types'
import { rise } from '../../components/onboarding/shared'
import { Cta, Eyebrow, Frame, PillToast, Quiet, useToast } from './ui'

/** G-15 — Payment failed: Align+ dims, nothing is lost. */
export default function PaymentFailed({ go, back }: PageProps) {
  const [toast, show] = useToast()

  return (
    <Frame onClose={back} seed={29}>
      {/* the dimmed ring: the portal with its light out */}
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: [0.6, 1, 0.6], scale: 1 }}
        transition={{ opacity: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }, scale: { duration: 0.8 } }}
        style={{ position: 'absolute', left: 195 - 20, top: 236, width: 40, height: 40, borderRadius: 20, border: '1px solid rgba(239,230,214,0.55)', boxShadow: '0 0 18px rgba(239,230,214,0.08)' }} />

      <div style={{ position: 'absolute', top: 306, left: 32, right: 32, textAlign: 'center' }}>
        <Eyebrow>Align+ · Payment</Eyebrow>
        <motion.h1 className="h-display" {...rise(0.12)} style={{ fontSize: 30, marginTop: 10 }}>Your Align+ dimmed.</motion.h1>
        <motion.p {...rise(0.2)} style={{ margin: '12px auto 0', fontSize: 13.5, lineHeight: 1.45, color: 'var(--label-1)', opacity: 0.9 }}>
          The card on file didn’t go through. Nothing’s lost — your chart, cards and matches are all still here.
        </motion.p>
        <motion.p {...rise(0.28)} style={{ margin: '18px auto 0', fontSize: 13, lineHeight: 1.45, color: 'var(--label-3)' }}>
          Until it’s fixed: 15 cards a night and 3 peeks a day.
        </motion.p>
      </div>

      <PillToast text={toast} />
      <Cta top={660} onClick={() => show('Opening your App Store payment settings.')}>Update payment</Cta>
      <Quiet top={724} onClick={() => go('deck')}>Continue free for now</Quiet>
    </Frame>
  )
}
