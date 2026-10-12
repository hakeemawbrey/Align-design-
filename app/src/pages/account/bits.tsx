import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CARD_BG, CARD_LINE } from '../../components/kit'
import { sfx } from '../../lib/sfx'

/** small pencil after an editable value */
export function Pencil() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="var(--label-2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M8.6 1.9 11.1 4.4 4.3 11.2 1.4 11.6 1.8 8.7z" />
    </svg>
  )
}

/** north-east arrow for rows that open a document */
export function OutArrow() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="var(--label-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M2 8 8 2M3.5 2H8v4.5" />
    </svg>
  )
}

/** glass pill toast, centred above the CTA */
export function useToast(): [ReactNode, (t: string) => void] {
  const [text, setText] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const show = (t: string) => {
    setText(t)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setText(null), 2400)
  }
  const node = (
    <AnimatePresence>
      {text && (
        <motion.div key={text} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          style={{ position: 'absolute', left: 16, right: 16, bottom: 116, display: 'flex', justifyContent: 'center', pointerEvents: 'none', zIndex: 50 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 38, padding: '9px 18px', borderRadius: 999, fontSize: 13.5, lineHeight: 1.3, color: 'var(--label-1)', textAlign: 'center',
            background: 'rgba(40,26,78,0.9)', border: '1px solid rgba(179,166,196,0.22)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
          }}><span style={{ color: 'var(--align)' }}>✦</span>{text}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
  return [node, show]
}

/** a serif text block you can type into, with a mono footer and counter (G-27 dealbreakers, G-28 bio) */
export function TextCard({ value, onChange, max, minHeight = 64 }: { value: string; onChange: (v: string) => void; max: number; minHeight?: number }) {
  const [focus, setFocus] = useState(false)
  return (
    <label style={{ display: 'block', borderRadius: 16, background: CARD_BG, border: focus ? '1px solid rgba(239,230,214,0.4)' : CARD_LINE, padding: '14px 16px 12px', transition: 'border-color .2s' }}>
      <textarea value={value} maxLength={max} onChange={(e) => onChange(e.target.value)} onFocus={() => { sfx.tap(); setFocus(true) }} onBlur={() => setFocus(false)}
        className="serif"
        style={{ display: 'block', width: '100%', minHeight, resize: 'none', background: 'none', border: 0, outline: 'none', color: 'var(--label-1)', fontSize: 16, lineHeight: 1.45, fontFamily: 'var(--serif)', padding: 0 }} />
      <span className="mono" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 8.5, letterSpacing: '0.16em', color: 'var(--label-3)' }}>
        <span>{focus ? 'EDITING' : 'TAP TO EDIT'}</span>
        <span>{value.length} / {max}</span>
      </span>
    </label>
  )
}

/** a row value that turns into an input when tapped */
export function EditableRow({ label, value, onSave, editing, onEdit }: {
  label: string; value: string; onSave: (v: string) => void; editing: boolean; onEdit: (on: boolean) => void
}) {
  const [draft, setDraft] = useState(value)
  useEffect(() => { if (editing) setDraft(value) }, [editing, value])
  const commit = () => { const v = draft.trim(); if (v && v !== value) onSave(v); onEdit(false) }
  return (
    <div className="kit-row" style={{ width: '100%', minHeight: 48, display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px' }}
      onClick={editing ? undefined : () => { sfx.tap(); onEdit(true) }} role={editing ? undefined : 'button'}>
      <span style={{ fontSize: 15, color: 'var(--label-1)', flexShrink: 0, cursor: 'pointer' }}>{label}</span>
      {editing ? (
        <input autoFocus value={draft} onChange={(e) => setDraft(e.target.value)} onBlur={commit}
          onKeyDown={(e) => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') onEdit(false) }}
          style={{ flex: 1, minWidth: 0, textAlign: 'right', background: 'rgba(30,18,64,0.7)', border: '1px solid rgba(239,230,214,0.35)', borderRadius: 10, height: 30, padding: '0 10px', outline: 'none', color: 'var(--label-1)', fontSize: 14, fontFamily: 'inherit' }} />
      ) : (
        <span style={{ flex: 1, minWidth: 0, textAlign: 'right', fontSize: 13, color: 'var(--label-3)', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</span>
      )}
      {!editing && <Pencil />}
    </div>
  )
}

/** two-way segmented pill (pearl thumb), as on the card sheet */
export function Segment<T extends string>({ value, options, onChange, id }: { value: T; options: { id: T; label: string }[]; onChange: (v: T) => void; id: string }) {
  return (
    <div style={{ display: 'flex', width: 218, height: 34, padding: 3, borderRadius: 999, margin: '0 auto', background: 'rgba(30,18,64,0.85)', border: '1px solid rgba(179,166,196,0.2)' }}>
      {options.map((o) => (
        <button key={o.id} onClick={() => { if (o.id !== value) { sfx.flip(); onChange(o.id) } }} style={{ position: 'relative', flex: 1, borderRadius: 999 }}>
          {value === o.id && (
            <motion.div layoutId={id} transition={{ type: 'spring', stiffness: 460, damping: 34 }}
              style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'var(--chrome)', boxShadow: '0 0 14px rgba(248,237,255,0.3)' }} />
          )}
          <span className="mono" style={{ position: 'relative', fontSize: 10, letterSpacing: '0.18em', fontWeight: 700, color: value === o.id ? 'var(--chrome-ink)' : 'var(--label-2)', transition: 'color .2s' }}>{o.label}</span>
        </button>
      ))}
    </div>
  )
}
