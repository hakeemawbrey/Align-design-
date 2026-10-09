import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TOPICS, answerLabel, type TalkCard } from '../../data/talkCards'
import { sfx } from '../../lib/sfx'
import { KIND_LABEL } from './TalkCardFace'

/**
 * A talk card played in chat. Both people answer; each answer stays sealed
 * until the other person has answered too, then both turn over together.
 */
export default function ChatTalkCard({ card, mine, theirs, names, playedByMe, onAnswer }: {
  card: TalkCard
  mine?: string
  theirs?: string
  names: { me: string; them: string }
  playedByMe: boolean
  onAnswer: (answer: string) => void
}) {
  const t = TOPICS[card.topic]
  const [draft, setDraft] = useState('')
  const both = mine != null && theirs != null
  const myLabel = mine != null ? answerLabel(card, mine, 'me', names) : ''
  const theirLabel = theirs != null ? answerLabel(card, theirs, 'them', names) : ''
  const same = both && card.kind !== 'ask' && myLabel === theirLabel

  const answer = (a: string) => { if (!a.trim()) return; sfx.flip(); onAnswer(a.trim()); setDraft('') }
  const choices: [string, string][] = card.kind === 'pick' && card.opts
    ? [['0', card.opts[0]], ['1', card.opts[1]]]
    : card.kind === 'who' ? [['me', 'Me'], ['you', names.them]] : []

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, rotate: playedByMe ? 2 : -2, scale: 0.94 }} animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      style={{
        margin: '10px auto 14px', width: 300, borderRadius: 18, padding: 1.5,
        background: card.rarity === 'common' ? `linear-gradient(160deg, ${t.color}cc, ${t.color}33)` : 'var(--gold-foil)',
        boxShadow: `0 0 22px ${t.color}44, 0 12px 26px rgba(0,0,0,0.4)`,
      }}
    >
      <div style={{ borderRadius: 16.5, padding: '12px 14px 14px', background: `radial-gradient(120% 60% at 50% 0%, ${t.color}2e, transparent 60%), linear-gradient(170deg, #2a1660, #150b33)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 22, height: 22, borderRadius: 11, display: 'grid', placeItems: 'center', fontSize: 12, color: '#140a2e', background: t.color, boxShadow: `0 0 10px ${t.color}aa` }}>{t.glyph}</span>
          <span className="mono" style={{ fontSize: 8.5, letterSpacing: '0.16em', color: t.color, textTransform: 'uppercase' }}>
            Talk card · {t.label}
          </span>
          <span className="mono" style={{ marginLeft: 'auto', fontSize: 8, letterSpacing: '0.12em', color: 'var(--label-3)', textTransform: 'uppercase' }}>{KIND_LABEL[card.kind]}</span>
        </div>
        <div className="serif italic" style={{ fontSize: 19, lineHeight: 1.22, color: 'var(--label-1)', margin: '10px 0 12px' }}>{card.q}</div>

        {/* the two answers */}
        <div style={{ display: 'flex', gap: 8 }}>
          {([['me', names.me, mine, myLabel], ['them', names.them, theirs, theirLabel]] as const).map(([who, name, a, label]) => {
            const shown = both
            return (
              <div key={who} style={{
                flex: 1, minHeight: 58, borderRadius: 12, padding: '8px 10px', position: 'relative', overflow: 'hidden',
                background: 'rgba(11,6,32,0.55)', border: `1px solid ${a != null ? `${t.color}88` : 'rgba(179,166,196,0.18)'}`,
              }}>
                <div className="mono" style={{ fontSize: 7.5, letterSpacing: '0.16em', color: 'var(--label-3)', textTransform: 'uppercase' }}>{name}</div>
                <AnimatePresence mode="wait" initial={false}>
                  {a == null ? (
                    <motion.div key="wait" exit={{ opacity: 0 }} style={{ fontSize: 12.5, color: 'var(--label-3)', marginTop: 5 }}>
                      {who === 'me' ? 'Your turn' : 'Hasn’t answered yet'}
                    </motion.div>
                  ) : shown ? (
                    <motion.div key="shown" initial={{ rotateX: 90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} transition={{ duration: 0.45, delay: who === 'them' ? 0.12 : 0 }}
                      style={{ fontSize: 13.5, lineHeight: 1.3, color: 'var(--label-1)', marginTop: 4 }}>
                      {label}
                    </motion.div>
                  ) : (
                    <motion.div key="sealed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 13.5, color: 'var(--label-1)', filter: 'blur(5px)', userSelect: 'none' }}>{label || 'sealed answer'}</span>
                      <span style={{ fontSize: 11 }}>🔒</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* status / your answer */}
        <div style={{ marginTop: 10 }}>
          {both ? (
            <div className="mono" style={{ textAlign: 'center', fontSize: 8.5, letterSpacing: '0.18em', color: same ? 'var(--align)' : 'var(--label-2)', textTransform: 'uppercase' }}>
              {same ? '✦ Same answer ✦' : card.kind === 'ask' ? 'Both answered · talk about it' : 'Different answers · ask why'}
            </div>
          ) : mine != null ? (
            <div style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--label-2)' }}>
              Locked in. You’ll both see the answers when {names.them} answers.
            </div>
          ) : choices.length ? (
            <div style={{ display: 'flex', gap: 8 }}>
              {choices.map(([v, l]) => (
                <motion.button key={v} whileTap={{ scale: 0.95 }} onClick={() => answer(v)} style={{
                  flex: 1, height: 38, borderRadius: 19, fontSize: 14, color: '#1a0f3a', background: '#f4f0dc', boxShadow: `0 0 12px ${t.color}55`,
                }}>{l}</motion.button>
              ))}
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); answer(draft) }} style={{ display: 'flex', gap: 6 }}>
              <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={theirs != null ? `Answer to see ${names.them}’s` : 'Your answer'} maxLength={200}
                style={{ flex: 1, minWidth: 0, height: 38, borderRadius: 19, padding: '0 14px', fontSize: 14, color: 'var(--label-1)', outline: 'none', background: 'rgba(11,6,32,0.6)', border: '1px solid rgba(179,166,196,0.3)', fontFamily: 'inherit' }} />
              <button type="submit" style={{ height: 38, padding: '0 14px', borderRadius: 19, fontSize: 14, color: '#1a0f3a', background: draft.trim() ? '#f4f0dc' : 'rgba(244,240,220,0.35)' }}>Lock in</button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  )
}
