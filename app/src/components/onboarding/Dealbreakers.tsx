import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { sfx } from '../../lib/sfx'
import { Caption, Cta, Header, EASE } from './shared'
import { DEALBREAKERS, MAX_DEALBREAKERS } from './readings'

export interface Pick { id: string; chip: string; card: string }

/** O-12 — "What ends it before it starts?" Pick up to three; they go on your card. */
export default function Dealbreakers({ picked, setPicked, next }: { picked: Pick[]; setPicked: (p: Pick[]) => void; next: () => void }) {
  const [custom, setCustom] = useState<Pick[]>(() => picked.filter((p) => p.id.startsWith('own-')))
  const [writing, setWriting] = useState(false)
  const [draft, setDraft] = useState('')
  const [shake, setShake] = useState(0)
  const all: Pick[] = [...DEALBREAKERS, ...custom]
  const on = (id: string) => picked.some((p) => p.id === id)

  const toggle = (p: Pick) => {
    if (on(p.id)) { sfx.tap(); setPicked(picked.filter((x) => x.id !== p.id)); return }
    if (picked.length >= MAX_DEALBREAKERS) { sfx.release(); setShake((s) => s + 1); return }
    sfx.peekTick(picked.length / 3)
    setPicked([...picked, p])
  }
  const commit = () => {
    const t = draft.trim()
    setWriting(false); setDraft('')
    if (!t) return
    const p = { id: `own-${Date.now()}`, chip: t, card: t }
    setCustom((c) => [...c, p])
    if (picked.length < MAX_DEALBREAKERS) { sfx.peekTick(picked.length / 3); setPicked([...picked, p]) }
  }

  const preview = picked.length ? picked.map((p) => p.card).join('. ') + '.' : 'Nothing yet. Brave.'

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Header
        eyebrow="Dealbreakers · Pick up to 3"
        title={<>What ends it<br />before it starts?</>}
        body="These go on your card. People choose you blind — give them the truth."
        bodyWidth={300}
        bodyStyle={{ marginTop: 10, fontSize: 15.5, lineHeight: 1.45 }}
      />
      <motion.div
        key={shake}
        animate={shake ? { x: [0, -6, 6, -4, 4, 0] } : undefined}
        transition={{ duration: 0.35 }}
        style={{ position: 'absolute', top: 262, left: 22, width: 346, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}
      >
        {all.map((p, i) => {
          const sel = on(p.id)
          return (
            <motion.button key={p.id} onClick={() => toggle(p)}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05, duration: 0.4, ease: EASE }}
              whileTap={{ scale: 0.94 }}
              style={{
                height: 34, padding: '0 14px', borderRadius: 17, fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 5,
                color: 'var(--label-1)',
                background: sel ? 'rgba(90,80,30,0.45)' : 'rgba(48,32,92,0.65)',
                border: sel ? '1.3px solid #d8c860' : '1px solid rgba(154,123,224,0.4)',
                boxShadow: sel ? '0 0 14px rgba(216,200,96,0.35)' : 'none',
                transition: 'background .2s, border-color .2s, box-shadow .2s',
              }}>
              {sel && <span style={{ color: '#f2e48a' }}>✓</span>}{p.chip}
            </motion.button>
          )
        })}
        {writing ? (
          <input
            autoFocus value={draft} maxLength={32}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') { setWriting(false); setDraft('') } }}
            onBlur={commit}
            placeholder="Type it…"
            style={{
              height: 34, width: 170, padding: '0 14px', borderRadius: 17, fontSize: 13, color: 'var(--label-1)', outline: 'none',
              background: 'rgba(48,32,92,0.8)', border: '1px solid #c9b6f0', fontFamily: 'inherit',
            }}
          />
        ) : (
          <motion.button onClick={() => { sfx.tap(); setWriting(true) }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
            style={{ height: 34, padding: '0 14px', borderRadius: 17, fontSize: 13, color: 'var(--label-2)', border: '1px dashed rgba(201,182,240,0.55)' }}>
            Write my own…
          </motion.button>
        )}
      </motion.div>

      <div style={{ position: 'absolute', top: 500, left: 30, width: 330, textAlign: 'center' }}>
        <div className="mono" style={{ fontSize: 8.5, letterSpacing: '0.2em', color: 'var(--label-3)' }}>PREVIEW · YOUR CARD READS</div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={preview} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}
            className="serif italic" style={{ marginTop: 8, fontSize: 16, lineHeight: 1.35, color: 'var(--label-1)' }}>
            “{preview}”
          </motion.div>
        </AnimatePresence>
      </div>

      <Cta onClick={next} delay={0.8}>Seal my card</Cta>
      <Caption delay={1}>The universe loves a boundary.</Caption>
    </div>
  )
}
