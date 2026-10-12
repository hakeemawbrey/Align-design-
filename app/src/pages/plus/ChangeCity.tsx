import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { PageProps } from '../types'
import { rise } from '../../components/onboarding/shared'
import { CARD_BG, CARD_LINE, Label } from '../../components/kit'
import { useSession } from '../../lib/session'
import { sfx } from '../../lib/sfx'
import { Cta, Frame, PillToast, useToast } from './ui'

const LIVE = ['Houston', 'Austin', 'Dallas']
const HOME = 'Houston'

/** P-03 — Change city (Align+): read another live city's deck, once a week. */
export default function ChangeCity({ go, back }: PageProps) {
  const { alignPlus } = useSession()
  const [q, setQ] = useState('')
  const [pick, setPick] = useState<string | null>(null)
  const [toast, show] = useToast(1800)
  const shown = LIVE.filter((c) => c.toLowerCase().includes(q.trim().toLowerCase()))

  const confirm = () => {
    if (!pick || pick === HOME) { sfx.deny(); show('Pick a city other than home.'); return }
    if (!alignPlus) { go('paywall'); return }
    sfx.align()
    show(`Tonight’s deal reads from ${pick}.`)
    window.setTimeout(back, 1500)
  }

  return (
    <Frame onBack={back} bar="Change city" seed={58}>
      <motion.div {...rise(0.1)} style={{ position: 'absolute', top: 100, left: 24, right: 24 }}>
        <Label style={{ marginTop: 0 }}>Reading from</Label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, height: 44, padding: '0 16px', borderRadius: 14, background: 'rgba(52,35,95,0.6)', border: '1px solid rgba(179,166,196,0.3)' }}>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="var(--label-2)" strokeWidth="1.7" strokeLinecap="round"><circle cx="7" cy="7" r="5.2" /><path d="m11 11 3.6 3.6" /></svg>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a live city"
            style={{ flex: 1, minWidth: 0, background: 'none', border: 0, outline: 'none', color: 'var(--label-1)', fontSize: 15, fontFamily: 'inherit' }} />
        </label>

        <Label style={{ marginTop: 20 }}>Live cities</Label>
        <div style={{ display: 'grid', gap: 8 }}>
          <AnimatePresence initial={false}>
            {shown.map((c) => {
              const on = pick === c
              return (
                <motion.button key={c} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 44 }} exit={{ opacity: 0, height: 0 }}
                  whileTap={{ scale: 0.985 }} onClick={() => { sfx.tap(); setPick(c) }}
                  style={{
                    borderRadius: 14, padding: '0 16px', display: 'flex', alignItems: 'center', textAlign: 'left', overflow: 'hidden',
                    background: on ? 'rgba(64,44,112,0.85)' : CARD_BG, border: on ? '1px solid rgba(248,237,255,0.55)' : CARD_LINE,
                  }}>
                  <span style={{ flex: 1, fontSize: 15, color: 'var(--label-1)' }}>{c}</span>
                  {c === HOME && <span style={{ fontSize: 13, color: 'var(--label-3)', marginRight: 10 }}>Current · home</span>}
                  <svg width="7" height="12" viewBox="0 0 7 12" fill="none" stroke="var(--label-3)" strokeWidth="1.6" strokeLinecap="round"><path d="m1 1 5 5-5 5" /></svg>
                </motion.button>
              )
            })}
          </AnimatePresence>
          {!shown.length && <div style={{ fontSize: 13.5, color: 'var(--label-3)', padding: '10px 2px' }}>Not live there yet. We open city by city.</div>}
        </div>

        <Label style={{ marginTop: 22 }}>One change a week</Label>
        <p style={{ fontSize: 13.5, lineHeight: 1.45, color: 'var(--label-2)' }}>
          City changes are weekly on Align+. Free accounts stay put, because a deck that jumps cities nightly is nobody’s deck.
        </p>
        <Label style={{ marginTop: 18 }}>They are told</Label>
        <p style={{ fontSize: 13.5, lineHeight: 1.45, color: 'var(--label-2)' }}>
          Your card shows the city you are reading, so nobody thinks you are around the corner when you are not. {HOME} stays your default; nothing overwrites it.
        </p>
      </motion.div>

      <PillToast text={toast} />
      <Cta onClick={confirm}>{pick && pick !== HOME ? `Read from ${pick}` : 'Pick a city'}</Cta>
    </Frame>
  )
}
