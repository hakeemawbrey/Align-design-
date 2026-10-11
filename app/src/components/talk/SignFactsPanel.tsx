import { motion } from 'framer-motion'
import { SIGNS, type SignId } from '../../data/signs'
import { FACE_GLYPH, FACE_LABEL, type Face } from '../../data/archetypes'
import { FACE_LINES, SIGN_FACTS } from '../../data/signFacts'

const GOLD = '#f2d58a'

/**
 * The back of a sign card: the basics, what this face means when you date
 * one, and a few fun facts. `full` adds the myth, a famous one and a date idea.
 */
export default function SignFactsPanel({ sign, face, full = false }: { sign: SignId; face: Face; full?: boolean }) {
  const f = SIGN_FACTS[sign]
  const z = SIGNS[sign]
  const chips = [f.dates, f.element, f.mode, `Ruled by ${f.ruler}`]
  const facts: [string, string][] = full
    ? [['The myth', f.myth], ['Famous one', f.famous], ['Most likely to', f.likely], ['Perfect first date', f.date]]
    : [['Most likely to', f.likely], ['Famous one', f.famous]]
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.15 }}
      style={{ width: '100%', padding: '12px 14px', borderRadius: 16, background: 'rgba(30,18,64,0.82)', border: `1px solid ${z.color}66`, backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {chips.map((c) => (
          <span key={c} className="mono" style={{ fontSize: 8.5, letterSpacing: '0.08em', padding: '3px 7px', borderRadius: 8, color: 'var(--label-1)', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(179,166,196,0.2)' }}>{c}</span>
        ))}
      </div>
      <div style={{ marginTop: 9, fontSize: 13.5, lineHeight: 1.35, color: 'var(--label-1)' }}>
        <span className="mono" style={{ fontSize: 9, letterSpacing: '0.14em', color: 'var(--label-2)', marginRight: 6 }}><span style={{ color: GOLD }}>{FACE_GLYPH[face]}</span> {FACE_LABEL[face].toUpperCase()}</span>
        {FACE_LINES[sign][face]}
      </div>
      {facts.map(([k, v]) => (
        <div key={k} style={{ marginTop: 6, fontSize: 12.5, lineHeight: 1.35, color: 'var(--label-2)' }}>
          <span style={{ color: 'var(--label-1)', fontWeight: 600 }}>{k}: </span>{v}
        </div>
      ))}
    </motion.div>
  )
}
