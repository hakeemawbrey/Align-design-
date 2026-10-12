import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { PageProps } from '../types'
import { CARD_BG, CARD_LINE, Group, Label, PageShell, Row } from '../../components/kit'
import ProfileCard from '../../components/deck/ProfileCard'
import { CARD_W, CARD_H } from '../../components/deck/fx'
import { myProfile, type CardEdits } from '../../components/you/myCard'
import { ME } from '../../data/profiles'
import { SIGNS } from '../../data/signs'
import { sfx } from '../../lib/sfx'
import { account, useAccount } from './store'
import { EditableRow, Segment, TextCard, useToast } from './bits'

type Side = 'down' | 'flipped'
const PREVIEW_W = 160
const S = PREVIEW_W / CARD_W

/** G-27 / G-28 · Edit card — face down (what strangers see) and flipped (what a match sees). */
export default function EditCard({ go, back, arg }: PageProps) {
  const saved = useAccount().card
  const [side, setSide] = useState<Side>(arg === 'flipped' ? 'flipped' : 'down')
  const [draft, setDraft] = useState<CardEdits>(() => ({ ...saved, facts: saved.facts.map(([k, v]) => [k, v] as [string, string]), interests: [...saved.interests] }))
  const [editing, setEditing] = useState<string | null>(null)
  const [adding, setAdding] = useState<string | null>(null)
  const [toast, show] = useToast()
  const set = (p: Partial<CardEdits>) => setDraft((d) => ({ ...d, ...p }))
  const sun = SIGNS[ME.sign]

  const addInterest = () => {
    const v = (adding ?? '').trim()
    if (v && !draft.interests.some((i) => i.toLowerCase() === v.toLowerCase())) { sfx.sparkle(); set({ interests: [...draft.interests, v].slice(0, 8) }) }
    setAdding(null)
  }

  return (
    <>
      <PageShell onBack={back} topBar="Edit card"
        cta={{
          label: 'Save', onClick: () => {
            sfx.sparkle()
            account.patch({ card: draft })
            show(side === 'down' ? 'Saved. Strangers see this side tonight.' : 'Saved. Your matches see the new side.')
            window.setTimeout(back, 1400)
          },
        }}>
        <div style={{ paddingTop: 2 }}>
          <Segment id="edit-card-side" value={side} onChange={(s) => { setSide(s); setEditing(null) }}
            options={[{ id: 'down', label: 'FACE DOWN' }, { id: 'flipped', label: 'FLIPPED' }]} />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {side === 'down' ? (
            <motion.div key="down" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ type: 'spring', stiffness: 380, damping: 34 }}>
              <div style={{ width: PREVIEW_W, height: Math.round(CARD_H * S), margin: '14px auto 0', position: 'relative' }}>
                <div style={{ width: CARD_W, height: CARD_H, transform: `scale(${S})`, transformOrigin: '0 0', pointerEvents: 'none' }}>
                  <ProfileCard profile={myProfile(draft)} peek="none" glow={false} />
                </div>
              </div>
              <div className="mono" style={{ textAlign: 'center', marginTop: 12, fontSize: 8.5, letterSpacing: '0.18em', color: 'var(--label-3)' }}>LIVE PREVIEW · WHAT STRANGERS SEE FIRST</div>
              <Group label="Aura & sign">
                <Row label={`Aura · ${sun.name}`} value="From your chart" onClick={() => go('chart')} />
                <Row label="Verification" value="Verify your photo" onClick={() => go('x/verify-photo')} />
              </Group>
              <Label>Dealbreakers</Label>
              <TextCard value={draft.dealbreakers} max={90} minHeight={44} onChange={(v) => set({ dealbreakers: v })} />
            </motion.div>
          ) : (
            <motion.div key="flipped" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ type: 'spring', stiffness: 380, damping: 34 }}>
              <Label style={{ marginTop: 12 }}>Revealed photo</Label>
              <div style={{ borderRadius: 16, background: CARD_BG, border: CARD_LINE, overflow: 'hidden' }}>
                <Row onClick={() => go('x/verify-photo')} value="Replace"
                  icon={<span style={{ width: 40, height: 40, borderRadius: 20, overflow: 'hidden', flexShrink: 0, boxShadow: `0 0 12px ${sun.color}88` }}>
                    <img src={ME.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </span>}
                  label={<>
                    <span style={{ display: 'block' }}>Revealed photo</span>
                    <span className="mono" style={{ display: 'block', marginTop: 3, fontSize: 8, letterSpacing: '0.1em', whiteSpace: 'nowrap', color: 'var(--label-3)' }}>HIDDEN UNTIL YOU BOTH ALIGN</span>
                  </>} />
              </div>
              <Label>Full bio</Label>
              <TextCard value={draft.bio} max={240} minHeight={46} onChange={(v) => set({ bio: v })} />
              <Group label="Details">
                {draft.facts.map(([k, v], i) => (
                  <EditableRow key={k} label={k} value={v} editing={editing === k} onEdit={(on) => setEditing(on ? k : null)}
                    onSave={(nv) => set({ facts: draft.facts.map((f, j) => (j === i ? [k, nv] : f)) as [string, string][] })} />
                ))}
              </Group>
              <Label>Interests</Label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {draft.interests.map((t) => (
                  <span key={t} className="mono" style={{ height: 26, padding: '0 11px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', fontSize: 9.5, letterSpacing: '0.12em', fontWeight: 600, textTransform: 'uppercase', color: 'var(--label-1)', border: '1px solid rgba(179,166,196,0.4)' }}>{t}</span>
                ))}
                {adding != null ? (
                  <input autoFocus value={adding} onChange={(e) => setAdding(e.target.value)} onBlur={addInterest} maxLength={20} placeholder="Add one"
                    onKeyDown={(e) => { if (e.key === 'Enter') addInterest(); if (e.key === 'Escape') setAdding(null) }}
                    style={{ width: 120, height: 30, borderRadius: 999, padding: '0 12px', background: 'rgba(30,18,64,0.7)', border: '1px solid rgba(239,230,214,0.4)', outline: 'none', color: 'var(--label-1)', fontSize: 13, fontFamily: 'inherit' }} />
                ) : draft.interests.length < 8 && (
                  <motion.button whileTap={{ scale: 0.95 }} onClick={() => { sfx.tap(); setAdding('') }} className="mono"
                    style={{ height: 30, marginTop: -2, padding: '0 13px', borderRadius: 999, fontSize: 9.5, letterSpacing: '0.12em', fontWeight: 700, color: 'var(--chrome-ink)', background: 'var(--chrome)', boxShadow: '0 0 12px rgba(248,237,255,0.3)' }}>+ ADD</motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </PageShell>
      {toast}
    </>
  )
}
