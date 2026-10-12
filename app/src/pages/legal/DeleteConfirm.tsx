import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PageShell } from '../../components/kit'
import { EASE } from '../../components/onboarding/shared'
import { RESET_EVENT } from '../../lib/demo'
import { sfx } from '../../lib/sfx'
import type { PageProps } from '../types'
import { DELETE } from './copy'
import { CenterMessage, serifCaption } from './bits'

const HOLD_MS = 1600

/** L-04 Delete account: hold the button to confirm, then the demo dissolves back to the splash. */
export function DeleteConfirm({ back }: PageProps) {
  const [p, setP] = useState(0)
  const [gone, setGone] = useState(false)
  const raf = useRef(0)
  const start = useRef(0)
  const lastTick = useRef(0)

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const down = () => {
    if (gone) return
    sfx.tap()
    start.current = performance.now()
    lastTick.current = 0
    const step = (t: number) => {
      const k = Math.min(1, (t - start.current) / HOLD_MS)
      setP(k)
      const tick = Math.floor(k * 6)
      if (tick > lastTick.current) { lastTick.current = tick; sfx.charge(k) }
      if (k >= 1) { finish(); return }
      raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
  }

  const up = () => {
    if (gone) return
    cancelAnimationFrame(raf.current)
    setP(0)
  }

  const finish = () => {
    setGone(true)
    sfx.release()
    window.setTimeout(() => window.dispatchEvent(new Event(RESET_EVENT)), 1800)
  }

  return (
    <>
      <PageShell onBack={gone ? undefined : back} topBar={DELETE.bar}
        caption={gone ? undefined : { label: <span style={serifCaption}>{DELETE.keep}</span>, onClick: back }} />

      <motion.div animate={gone ? { opacity: 0, scale: 0.94, filter: 'blur(8px)' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: EASE }} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <CenterMessage top={302} title={DELETE.title as [string, string]} body={DELETE.body} bodyWidth={318} />
      </motion.div>

      {!gone && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
          style={{ position: 'absolute', left: 38, width: 314, bottom: 72, zIndex: 20 }}>
          <motion.button className="chrome-cta" aria-label={DELETE.hold}
            onPointerDown={down} onPointerUp={up} onPointerLeave={up} onPointerCancel={up}
            onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) down() }} onKeyUp={up}
            animate={{ scale: p > 0 ? 0.98 : 1 }}
            style={{ position: 'relative', overflow: 'hidden', touchAction: 'none' }}>
            <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${p * 100}%`, background: 'linear-gradient(90deg, rgba(232,98,138,0.35), rgba(232,98,138,0.6))' }} />
            <span style={{ position: 'relative' }}>{p > 0 ? DELETE.holding : DELETE.hold}</span>
          </motion.button>
        </motion.div>
      )}

      <AnimatePresence>
        {gone && (
          <motion.div key="gone" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
            className="eyebrow" style={{ position: 'absolute', left: 0, right: 0, top: 410, textAlign: 'center', color: 'var(--label-3)', letterSpacing: '0.24em' }}>
            {DELETE.done} ✦
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
