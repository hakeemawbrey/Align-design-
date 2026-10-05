import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import { SIGNS, type SignId } from '../data/signs'
import { session, useSession } from '../lib/session'
import { sfx } from '../lib/sfx'

const ORDER: SignId[] = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
const WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve']
const word = (n: number) => WORDS[n] ?? String(n)

/** P-01 Block a sign + P-01b Choose signs to block (Align+). */
export default function Block({ go }: ScreenProps) {
  const { blockedSigns, blockedSince } = useSession()
  const [choosing, setChoosing] = useState(false)
  const [picked, setPicked] = useState<SignId[]>(blockedSigns)
  const [toast, setToast] = useState<string | null>(null)

  const shown = choosing ? picked : blockedSigns
  const n = shown.length

  const toggle = (id: SignId) => {
    if (!choosing) { sfx.tap(); setPicked(blockedSigns); setChoosing(true); return }
    if (!picked.includes(id) && picked.length >= 11) { sfx.deny(); return }
    sfx.tap()
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  }

  const confirm = () => {
    const changed = picked.length !== blockedSigns.length || picked.some((x) => !blockedSigns.includes(x))
    session.patch({ blockedSigns: picked, blockedSince: changed ? 'Oct 5' : blockedSince })
    sfx.align()
    setChoosing(false)
    setToast(picked.length ? `${word(picked.length)} blocked. Your deck is updated.` : 'Every sign is back in your deck.')
    window.setTimeout(() => setToast(null), 2200)
  }

  const names = blockedSigns.map((s) => SIGNS[s].name)

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora={null} warm={null} count={60} seed={91} />

      <button aria-label="Back" onClick={() => { sfx.tap(); if (choosing) setChoosing(false); else go('you') }}
        style={{ position: 'absolute', left: 16, top: 56, width: 40, height: 40, display: 'grid', placeItems: 'center', color: 'var(--label-1)', zIndex: 2 }}>
        <svg width="11" height="18" viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 2 2 10l8 8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={choosing ? 'c' : 'v'} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}
          style={{ position: 'absolute', left: 28, right: 28, top: 112 }}>
          <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--label-2)' }}>
            ALIGN+ · {choosing ? 'CHOOSE SIGNS' : 'BLOCK A SIGN'}
          </div>
          <div className="h-display" style={{ fontSize: 30, marginTop: 10, lineHeight: 1.1 }}>
            {choosing ? <>Which signs are<br />off the table?</> : <>Take a whole sign<br />off the table.</>}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* sign grid */}
      <div style={{ position: 'absolute', left: 22, right: 22, top: 222, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {ORDER.map((id) => {
          const s = SIGNS[id]
          const on = shown.includes(id)
          const dim = on && !choosing
          const sel = on && choosing
          return (
            <motion.button key={id} onClick={() => toggle(id)} whileTap={{ scale: 0.94 }}
              animate={{ opacity: dim ? 0.42 : 1, scale: sel ? 1.03 : 1 }}
              aria-pressed={on}
              style={{
                height: 36, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                fontSize: 11.5, color: dim ? 'var(--label-3)' : 'var(--label-1)',
                background: sel ? `linear-gradient(180deg, ${s.color}55, ${s.dark}aa)` : dim ? 'rgba(30,18,64,0.4)' : 'rgba(52,35,95,0.6)',
                border: `1px solid ${sel ? s.light : dim ? 'rgba(179,166,196,0.12)' : 'rgba(179,166,196,0.28)'}`,
                boxShadow: sel ? `0 0 14px ${s.color}66` : 'none',
                textDecoration: dim ? 'line-through' : 'none',
              }}>
              <span style={{ color: dim ? 'var(--label-4)' : s.color, fontSize: 13 }}>{s.glyph}&#xFE0E;</span>
              <span style={{ whiteSpace: 'nowrap' }}>{s.name}</span>
            </motion.button>
          )
        })}
      </div>

      {/* details */}
      <div style={{ position: 'absolute', left: 28, right: 28, top: 384 }}>
        <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.18em', color: 'var(--label-2)', textTransform: 'uppercase' }}>
          {choosing
            ? `${word(n)} chosen · ${word(12 - n).toLowerCase()} still dealt`
            : `${word(n)} blocked · ${word(12 - n).toLowerCase()} of twelve still dealt`}
        </div>
        {choosing ? (
          <>
            <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--label-1)', marginTop: 10 }}>
              Each sign you block is roughly eight percent of your deck. Blocking is silent on both sides, so nobody is ever told. Suns only — a blocked sign’s Moon still reaches you.
            </p>
            <p style={{ fontSize: 12.5, color: 'var(--label-3)', marginTop: 18 }}>Tap a sign to choose it. Tap again to let it back in.</p>
          </>
        ) : (
          <>
            <ul style={{ marginTop: 10, paddingLeft: 18, display: 'grid', gap: 8, fontSize: 14, lineHeight: 1.4, color: 'var(--label-1)' }}>
              <li>Silent both ways. They never see you either.</li>
              <li>Suns only. A {names[0] ?? 'Scorpio'} Moon still reaches you.</li>
              <li>Each block costs you about eight percent of the deck.</li>
            </ul>
            <div className="mono" style={{ marginTop: 18, fontSize: 9.5, letterSpacing: '0.18em', color: 'var(--label-2)' }}>CURRENTLY BLOCKED</div>
            <button onClick={() => toggle(blockedSigns[0] ?? 'aries')}
              style={{ marginTop: 8, width: '100%', height: 46, borderRadius: 12, padding: '0 16px', display: 'flex', alignItems: 'center', background: 'rgba(52,35,95,0.6)', textAlign: 'left' }}>
              <span style={{ flex: 1, fontSize: 15, color: 'var(--label-1)' }}>{names.length ? names.join(' · ') : 'Nothing blocked'}</span>
              <span style={{ fontSize: 12.5, color: 'var(--label-3)' }}>{names.length ? `since ${blockedSince} ›` : '›'}</span>
            </button>
          </>
        )}
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div key="t" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="serif italic" style={{ position: 'absolute', left: 0, right: 0, top: 618, textAlign: 'center', fontSize: 15, color: 'var(--align)' }}>
            ✦ {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ position: 'absolute', left: 0, right: 0, top: 652, display: 'flex', justifyContent: 'center' }}>
        <motion.button className="chrome-cta" whileTap={{ scale: 0.97 }} onClick={() => (choosing ? confirm() : toggle(blockedSigns[0] ?? 'aries'))}>
          {choosing ? 'Confirm' : 'Choose signs to block'} <span className="spark">✦</span>
        </motion.button>
      </div>
    </div>
  )
}
