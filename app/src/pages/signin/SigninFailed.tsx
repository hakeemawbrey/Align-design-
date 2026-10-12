import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { PageProps } from '../types'
import { PageShell } from '../../components/kit'
import { rise } from '../../components/onboarding/shared'
import { sfx } from '../../lib/sfx'
import { clock } from './state'

const LOCK = 180

/** G-04 Sign-in Failure — too many tries, a countdown, nothing lost. */
export default function SigninFailed({ go, back }: PageProps) {
  const [left, setLeft] = useState(LOCK)
  const until = useMemo(() => clock(LOCK * 1000), [])
  const done = left <= 0

  useEffect(() => {
    if (done) { sfx.sparkle(); return }
    const t = window.setTimeout(() => setLeft((n) => n - 1), 1000)
    return () => window.clearTimeout(t)
  }, [left, done])

  return (
    <PageShell
      onBack={back}
      align="center"
      scroll={false}
      cta={done ? { label: 'Try the code again', onClick: () => go('x/code') } : { label: 'Back to sign in', onClick: () => go('x/phone') }}
      caption={{ label: 'No account on that number? Start your chart instead.', onClick: () => go('onboarding') }}
    >
      <div style={{ paddingTop: 186 }}>
        <motion.div className="eyebrow" {...rise(0.05, 8)} style={{ color: 'var(--label-3)', letterSpacing: '0.2em' }}>
          {done ? 'Ready when you are' : 'Too many tries · Try again in'}
        </motion.div>
        <motion.div className="h-display" {...rise(0.12)}
          style={{ fontSize: 44, lineHeight: 1, marginTop: 14, fontVariantNumeric: 'tabular-nums', color: done ? 'var(--label-2)' : 'var(--label-1)' }}>
          {Math.floor(left / 60)}:{String(left % 60).padStart(2, '0')}
        </motion.div>
        <motion.h1 className="h-display" {...rise(0.2)} style={{ fontSize: 26, lineHeight: 1.15, marginTop: 18 }}>
          {done ? 'The stars are ready.' : 'The stars need a minute.'}
        </motion.h1>
        <motion.p {...rise(0.28)} style={{ margin: '12px auto 0', maxWidth: 320, fontSize: 13.5, lineHeight: 1.45, color: 'var(--label-2)' }}>
          {done ? 'Ask for a fresh code and try once more.' : <>Try again at {until}, or use a different number. Nothing on your chart has changed.</>}
        </motion.p>
      </div>
    </PageShell>
  )
}
