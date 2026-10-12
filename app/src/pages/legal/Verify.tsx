import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Label, P, PageShell, TextLink } from '../../components/kit'
import { EASE, rise } from '../../components/onboarding/shared'
import { ME } from '../../data/profiles'
import { sfx } from '../../lib/sfx'
import type { PageProps } from '../types'
import { REJECTED, VERIFIED, VERIFY } from './copy'
import { CenterMessage, Pill, PillList } from './bits'

type Stage = 'idle' | 'count' | 'flash' | 'checking'

const FRAME_W = 200
const FRAME_H = 258

/** SF-01 Verify photo: a simulated selfie check. Arg 'fail' (or the demo link) ends at Photo rejected. */
export function VerifyPhoto({ go, back, arg }: PageProps) {
  const [stage, setStage] = useState<Stage>('idle')
  const [n, setN] = useState(3)
  const timers = useRef<number[]>([])
  const [pose] = useState(() => VERIFY.poses[0])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const later = (ms: number, f: () => void) => { timers.current.push(window.setTimeout(f, ms)) }

  const capture = (fail = arg === 'fail') => {
    if (stage !== 'idle') return
    setStage('count'); setN(3); sfx.peekTick(0.2)
    later(700, () => { setN(2); sfx.peekTick(0.5) })
    later(1400, () => { setN(1); sfx.peekTick(0.8) })
    later(2100, () => { setStage('flash'); sfx.flip() })
    later(2500, () => setStage('checking'))
    later(4300, () => {
      if (fail) { sfx.deny(); go('x/photo-rejected') } else { sfx.align(); go('x/verified') }
    })
  }

  const live = stage !== 'idle'

  return (
    <PageShell onBack={back} topBar={VERIFY.bar} cta={{ label: stage === 'checking' ? VERIFY.checking : VERIFY.cta, onClick: () => capture(), disabled: live }}>
      <div style={{ textAlign: 'center' }}>
        <motion.h1 className="h-display" {...rise(0.1)} style={{ fontSize: 28, lineHeight: 1.12 }}>{VERIFY.title[0]}<br />{VERIFY.title[1]}</motion.h1>
      </div>

      {/* the frame: dashed until the camera wakes, then a simulated mirror of you */}
      <motion.div {...rise(0.2)} style={{ position: 'relative', width: FRAME_W, height: FRAME_H, margin: '22px auto 0', borderRadius: 18, overflow: 'hidden' }}>
        <AnimatePresence>
          {live && (
            <motion.div key="cam" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
              style={{ position: 'absolute', inset: 0 }}>
              <img src={ME.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)', filter: 'saturate(0.7) brightness(0.85)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(40,26,78,0.25), rgba(11,6,32,0.55))' }} />
              {/* face oval guide */}
              <div style={{ position: 'absolute', left: '50%', top: 44, width: 108, height: 140, marginLeft: -54, borderRadius: '50%', border: '1.5px solid rgba(239,230,214,0.6)' }} />
            </motion.div>
          )}
        </AnimatePresence>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 18, border: `1.5px dashed ${live ? 'rgba(239,230,214,0.0)' : 'rgba(179,166,196,0.5)'}`, transition: 'border-color .3s' }} />
        {!live && (
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="rgba(179,166,196,0.45)" strokeWidth="1.4"
            style={{ position: 'absolute', left: FRAME_W / 2 - 28, top: FRAME_H / 2 - 28 }}>
            <circle cx="28" cy="22" r="10" />
            <path d="M10 50c2-10 9-15 18-15s16 5 18 15" strokeLinecap="round" />
          </svg>
        )}
        <AnimatePresence mode="popLayout">
          {stage === 'count' && (
            <motion.div key={n} initial={{ opacity: 0, scale: 1.4 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.35, ease: EASE }}
              className="h-display" style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontSize: 64, textShadow: '0 0 24px rgba(11,6,32,0.8)' }}>
              {n}
            </motion.div>
          )}
        </AnimatePresence>
        {stage === 'flash' && (
          <motion.div initial={{ opacity: 0.95 }} animate={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ position: 'absolute', inset: 0, background: '#fff7ec' }} />
        )}
        {stage === 'checking' && (
          <motion.div initial={{ top: -2 }} animate={{ top: [0, FRAME_H - 2, 0] }} transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
            style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'var(--chrome)', boxShadow: '0 0 14px rgba(248,237,255,0.8)' }} />
        )}
      </motion.div>

      <motion.div {...rise(0.26, 6)} className="mono" style={{ marginTop: 12, textAlign: 'center', fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--label-3)', textTransform: 'uppercase' }}>
        Pose · {pose}
      </motion.div>

      <Label style={{ marginTop: 30 }}>How it works</Label>
      <P style={{ fontSize: 13.5, color: 'var(--label-1)', opacity: 0.88 }}>{VERIFY.how}</P>
      {!live && arg !== 'fail' && (
        <TextLink onClick={() => capture(true)} style={{ fontSize: 12, color: 'var(--label-3)' }}>{VERIFY.demoFail}</TextLink>
      )}
    </PageShell>
  )
}

/** SF-02 Verified */
export function Verified({ go }: PageProps) {
  const home = () => go('you')
  const mark = (
    <div style={{ position: 'relative', width: 64, height: 64 }}>
      <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.1 }}
        style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(239,230,214,0.7)' }} />
      <motion.div animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
        style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(239,230,214,0.4)' }} />
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring', stiffness: 500, damping: 14 }}
        style={{ position: 'absolute', left: 29, top: 29, width: 6, height: 6, borderRadius: '50%', background: 'var(--label-1)', boxShadow: '0 0 10px #fff7ec' }} />
    </div>
  )
  return (
    <>
      <PageShell close={home} cta={{ label: VERIFIED.cta, onClick: home }} />
      <CenterMessage top={240} icon={mark} title={VERIFIED.title as [string, string]} body={VERIFIED.body} bodyWidth={342} />
    </>
  )
}

/** SF-02b Photo rejected */
export function PhotoRejected({ go, back }: PageProps) {
  return (
    <PageShell onBack={back} topBar={REJECTED.bar} title={<>{REJECTED.title[0]}<br />{REJECTED.title[1]}</>}
      body={<span style={{ fontSize: 13.5 }}>{REJECTED.body}</span>}
      cta={{ label: REJECTED.cta, onClick: () => go('x/verify-photo') }}>
      <Label style={{ marginTop: -4 }}>{REJECTED.label}</Label>
      <PillList>
        {REJECTED.reasons.map((r) => <Pill key={r}>{r}</Pill>)}
      </PillList>
      <P style={{ fontSize: 13, color: 'var(--label-3)', marginTop: 24 }}>{REJECTED.note}</P>
    </PageShell>
  )
}
