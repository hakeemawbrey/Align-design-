import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { PageProps } from '../types'
import { rise } from '../../components/onboarding/shared'
import { CheckStamp } from '../../components/paywall/bits'
import { Label } from '../../components/kit'
import { session } from '../../lib/session'
import { sfx } from '../../lib/sfx'
import { Cta, Eyebrow, Frame } from './ui'

/** G-16 — Restore purchases: look up the Apple ID, then say what we found. */
export default function Restore({ go, back }: PageProps) {
  const [found, setFound] = useState(false)
  useEffect(() => {
    const t = window.setTimeout(() => { setFound(true); session.patch({ alignPlus: true }); sfx.align() }, 3200)
    return () => clearTimeout(t)
  }, [])

  return (
    <Frame onBack={back} bar="Restore purchases" seed={36}>
      <div style={{ position: 'absolute', top: 100, left: 24, right: 24, textAlign: 'center' }}>
        <Eyebrow>Restore</Eyebrow>
        <motion.h1 className="h-display" {...rise(0.12)} style={{ fontSize: 28, marginTop: 8 }}>
          {found ? 'Found it. Welcome back.' : 'Looking for your membership.'}
        </motion.h1>
      </div>

      <motion.div {...rise(0.2)} style={{ position: 'absolute', top: 180, left: 24, right: 24 }}>
        <Label>{found ? 'On this Apple ID' : 'Checking your Apple ID'}</Label>
        <div style={{ height: 104, borderRadius: 16, background: 'rgba(52,35,95,0.75)', border: '1px solid rgba(179,166,196,0.16)', padding: 16, position: 'relative', overflow: 'hidden' }}>
          <AnimatePresence mode="wait" initial={false}>
            {!found ? (
              <motion.div key="skel" exit={{ opacity: 0 }} style={{ display: 'grid', gap: 10 }}>
                {[220, 290, 160].map((w, i) => (
                  <motion.div key={w} animate={{ opacity: [0.45, 0.9, 0.45] }} transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.18 }}
                    style={{ width: w, maxWidth: '100%', height: 18, borderRadius: 9, background: 'rgba(179,166,196,0.28)' }} />
                ))}
              </motion.div>
            ) : (
              <motion.div key="found" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', gap: 14, alignItems: 'center', height: '100%' }}>
                <CheckStamp delay={0.1} size={30} />
                <div>
                  <div className="serif italic" style={{ fontSize: 19, color: 'var(--label-1)' }}>Yearly Align+</div>
                  <div style={{ fontSize: 13, color: 'var(--label-2)', marginTop: 3 }}>Active until Aug 8 · founding price</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Label style={{ marginTop: 26 }}>If we find it</Label>
        <p style={{ fontSize: 13.5, lineHeight: 1.45, color: found ? 'var(--label-1)' : 'var(--label-2)' }}>Yearly Align+, active until Aug 8. Welcome back.</p>
        <Label style={{ marginTop: 20 }}>If we don’t</Label>
        <p style={{ fontSize: 13.5, lineHeight: 1.45, color: 'var(--label-2)' }}>Nothing on this Apple ID. If you paid on another account, sign into that one and try again.</p>
      </motion.div>

      <Cta top={742} onClick={() => go('deck')}>Back to my deck</Cta>
    </Frame>
  )
}
