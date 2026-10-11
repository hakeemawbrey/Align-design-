import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usToday } from '../../data/skyReading'
import { SIGNS, type SignId } from '../../data/signs'
import { TOPICS, cardById, type TalkTopic } from '../../data/talkCards'
import { ME } from '../../data/profiles'
import { useTalk } from '../../lib/talk'
import { sfx } from '../../lib/sfx'

/**
 * "Us today": pinned to the top of every chat. Your sign and theirs, read
 * against tonight's Moon. Tap to open it and play a talk card that suits the mood.
 */
export default function UsToday({ them, sign, onPlay }: { them: string; sign: SignId; onPlay: (topic?: TalkTopic) => void }) {
  const [open, setOpen] = useState(false)
  const { owned } = useTalk()
  const u = usToday(sign)
  // the best topic tonight that you actually hold a card in
  const held = new Set(owned.map((id) => cardById(id)?.topic).filter(Boolean))
  const topic = (u.topics.find((t) => held.has(t as TalkTopic)) as TalkTopic | undefined)
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 3, margin: '0 0 12px' }}>
      <motion.div layout onClick={() => { sfx.tap(); setOpen((o) => !o) }}
        style={{ padding: open ? '12px 14px' : '9px 14px', borderRadius: 16, cursor: 'pointer', background: 'rgba(34,20,72,0.94)', border: '1px solid rgba(159,216,255,0.32)', boxShadow: '0 6px 18px rgba(5,2,15,0.45)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
        <motion.div layout="position" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="mono" style={{ flexShrink: 0, fontSize: 8.5, letterSpacing: '0.2em', color: '#9fd8ff' }}>☽ US TODAY</span>
          {!open && <span style={{ flex: 1, minWidth: 0, fontSize: 12.5, color: 'var(--label-1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.line}</span>}
          {open && <span className="mono" style={{ flex: 1, fontSize: 8.5, letterSpacing: '0.14em', color: 'var(--label-2)' }}>{SIGNS[ME.sign].name.toUpperCase()} × {SIGNS[sign].name.toUpperCase()}</span>}
          <motion.span animate={{ rotate: open ? 90 : 0 }} style={{ color: 'var(--label-3)', fontSize: 14 }}>›</motion.span>
        </motion.div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: 13.5, lineHeight: 1.4, color: 'var(--label-1)', marginTop: 6 }}>{u.line}</div>
              <button className="mono" onClick={(e) => { e.stopPropagation(); sfx.tap(); onPlay(topic) }}
                style={{ marginTop: 10, height: 30, padding: '0 12px', borderRadius: 15, fontSize: 9.5, letterSpacing: '0.12em', fontWeight: 700, color: 'var(--chrome-ink)', background: 'var(--chrome)' }}>
                {topic ? `PLAY A ${TOPICS[topic].label.toUpperCase()} CARD` : 'PLAY A TALK CARD'} WITH {them.toUpperCase()} ›
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
