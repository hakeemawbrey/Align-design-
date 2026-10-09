import { useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ARCANA, TOPICS, answerLabel, type TalkCard } from '../../data/talkCards'
import { sfx } from '../../lib/sfx'
import TalkCardFace, { Corners, Gilt, KIND_LABEL } from './TalkCardFace'
import TarotEmblem from './TarotEmblem'

const GOLD = '#f2d58a'

/**
 * A talk card played in chat. Both people answer; each answer stays sealed
 * until the other person has answered too, then both turn over together.
 */
/** The full tarot card: answer it here and watch both cards turn over. */
function TalkCardFull({ card, mine, theirs, names, onAnswer }: {
  card: TalkCard
  mine?: string
  theirs?: string
  names: { me: string; them: string }
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

  const a = ARCANA[card.topic]
  return (
    <div style={{ width: 304 }}>
      <Gilt rarity={card.rarity} topic={card.topic} s={1.4}>
        <div style={{
          position: 'relative', borderRadius: 14, overflow: 'hidden', padding: '16px 16px 16px',
          background: `radial-gradient(1px 1px at 14% 18%, #fff9 50%, transparent 51%), radial-gradient(1px 1px at 86% 12%, #fff7 50%, transparent 51%), radial-gradient(1.2px 1.2px at 90% 64%, #fff8 50%, transparent 51%), radial-gradient(1px 1px at 8% 72%, #fff6 50%, transparent 51%), radial-gradient(90% 45% at 50% 22%, ${t.color}3a 0%, transparent 70%), linear-gradient(175deg, #241252, #120930 70%)`,
        }}>
          <div style={{ position: 'absolute', inset: 6, borderRadius: 10, border: `1px solid ${GOLD}99`, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: 9, borderRadius: 8, border: `0.6px solid ${GOLD}40`, pointerEvents: 'none' }} />
          <Corners s={1.3} />

          {/* arcana head */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="mono" style={{ fontSize: 7.5, letterSpacing: '0.22em', color: `${GOLD}bb`, textTransform: 'uppercase' }}>Talk card · {t.label} · {KIND_LABEL[card.kind]}</div>
            <div style={{
              marginTop: 8, width: 116, height: 92, borderRadius: '60px 60px 6px 6px', border: `1px solid ${GOLD}cc`, display: 'grid', placeItems: 'center',
              background: `radial-gradient(70% 60% at 50% 45%, ${t.color}55, ${t.color}14 60%, transparent), linear-gradient(180deg, #1c0e44, #120930)`,
              boxShadow: `inset 0 0 16px ${t.color}55, 0 0 18px ${t.color}33`,
            }}>
              <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                <TarotEmblem topic={card.topic} size={70} glow={t.color} />
              </motion.div>
            </div>
            <div className="serif" style={{ marginTop: 8, padding: '3px 12px', fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: GOLD, borderTop: `0.8px solid ${GOLD}88`, borderBottom: `0.8px solid ${GOLD}88` }}>
              {a.numeral} · {a.name}
            </div>
            <div className="serif italic" style={{ fontSize: 20, lineHeight: 1.22, color: 'var(--label-1)', textAlign: 'center', margin: '12px 6px 14px' }}>{card.q}</div>
          </div>

          {/* the two answers: face-down cards that turn over together */}
          <div style={{ display: 'flex', gap: 10 }}>
            {([['me', names.me, mine, myLabel], ['them', names.them, theirs, theirLabel]] as const).map(([who, name, ans, label]) => (
              <div key={who} style={{ flex: 1, height: 84, perspective: 600 }}>
                <motion.div animate={{ rotateY: both ? 0 : 180 }} initial={false} transition={{ duration: 0.6, delay: both && who === 'them' ? 0.15 : 0 }}
                  style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}>
                  {/* face: the answer */}
                  <div style={{
                    position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: 10, padding: '7px 10px', overflow: 'hidden',
                    background: 'linear-gradient(170deg, #2a1660, #170c38)', border: `1px solid ${GOLD}aa`, boxShadow: `0 0 12px ${t.color}33`,
                  }}>
                    <div className="mono" style={{ fontSize: 7, letterSpacing: '0.18em', color: `${GOLD}cc`, textTransform: 'uppercase' }}>{name}</div>
                    <div className="serif italic" style={{ marginTop: 4, fontSize: 14.5, lineHeight: 1.2, color: 'var(--label-1)' }}>{label}</div>
                  </div>
                  {/* back: sealed until both have answered */}
                  <div style={{
                    position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', borderRadius: 10, overflow: 'hidden',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
                    background: `radial-gradient(60% 60% at 50% 45%, ${t.color}44, transparent 70%), linear-gradient(175deg, #2a1462, #120930)`,
                    border: `1px solid ${ans != null ? GOLD : `${GOLD}44`}`, opacity: ans != null ? 1 : 0.6,
                  }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 14, display: 'grid', placeItems: 'center', fontSize: 13,
                      background: ans != null ? `radial-gradient(circle at 35% 30%, #ffd9a0, ${t.color} 60%, #6a2a40)` : 'transparent',
                      border: ans != null ? 'none' : `1px dashed ${GOLD}66`, color: ans != null ? '#2a0f1a' : `${GOLD}88`,
                      boxShadow: ans != null ? `0 0 10px ${t.color}` : 'none',
                    }}>✦</div>
                    <div className="mono" style={{ fontSize: 7, letterSpacing: '0.16em', color: `${GOLD}cc`, textTransform: 'uppercase' }}>
                      {ans != null ? `${name} · sealed` : who === 'me' ? 'Your turn' : `Waiting on ${name}`}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* status / your answer */}
          <div style={{ marginTop: 12 }}>
            {both ? (
              <div className="serif italic" style={{ textAlign: 'center', fontSize: 14, color: same ? GOLD : 'var(--label-2)' }}>
                {same ? '✦ The cards agree ✦' : card.kind === 'ask' ? 'Both revealed. Talk about it.' : 'The cards differ. Ask why.'}
              </div>
            ) : mine != null ? (
              <div style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--label-2)' }}>
                Your card is sealed. Both turn over when {names.them} answers.
              </div>
            ) : choices.length ? (
              <div style={{ display: 'flex', gap: 8 }}>
                {choices.map(([v, l]) => (
                  <motion.button key={v} whileTap={{ scale: 0.95 }} onClick={() => answer(v)} className="serif italic" style={{
                    flex: 1, height: 40, borderRadius: 20, fontSize: 16, color: '#1a0f3a', background: 'linear-gradient(180deg, #fbf3d6, #e9d49a)', boxShadow: `0 0 14px ${GOLD}55`,
                  }}>{l}</motion.button>
                ))}
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); answer(draft) }} style={{ display: 'flex', gap: 6 }}>
                <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={theirs != null ? `Answer to turn over ${names.them}’s` : 'Your answer'} maxLength={200}
                  style={{ flex: 1, minWidth: 0, height: 40, borderRadius: 20, padding: '0 14px', fontSize: 14, color: 'var(--label-1)', outline: 'none', background: 'rgba(11,6,32,0.6)', border: `1px solid ${GOLD}55`, fontFamily: 'inherit' }} />
                <button type="submit" className="serif italic" style={{ height: 40, padding: '0 14px', borderRadius: 20, fontSize: 15, color: '#1a0f3a', background: draft.trim() ? 'linear-gradient(180deg, #fbf3d6, #e9d49a)' : 'rgba(244,240,220,0.35)' }}>Seal it</button>
              </form>
            )}
          </div>
        </div>
      </Gilt>
    </div>
  )
}

type Props = {
  card: TalkCard
  mine?: string
  theirs?: string
  names: { me: string; them: string }
  playedByMe: boolean
  onAnswer: (answer: string) => void
}

/**
 * A talk card in the chat: a compact bubble with a tarot thumbnail and where
 * things stand. Tap it to open the full card, where you answer.
 */
export default function ChatTalkCard(props: Props) {
  const { card, mine, theirs, names, playedByMe } = props
  const t = TOPICS[card.topic]
  const a = ARCANA[card.topic]
  const [open, setOpen] = useState(false)
  const both = mine != null && theirs != null
  const same = both && card.kind !== 'ask' && answerLabel(card, mine!, 'me', names) === answerLabel(card, theirs!, 'them', names)
  const status = both
    ? (same ? '✦ The cards agree' : 'Both revealed · tap to read')
    : mine != null ? `Sealed · waiting on ${names.them}`
      : theirs != null ? `${names.them} sealed theirs · your turn` : 'Your turn · tap to answer'
  const phone = typeof document !== 'undefined' ? document.getElementById('phone') : null

  return (
    <>
      <motion.button
        onClick={() => { sfx.flip(); setOpen(true) }}
        initial={{ opacity: 0, y: 12, rotate: playedByMe ? 2 : -2, scale: 0.94 }} animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        style={{ display: 'block', margin: playedByMe ? '8px 0 10px auto' : '8px auto 10px 0', width: 262, textAlign: 'left' }}
      >
        <Gilt rarity={card.rarity} topic={card.topic} s={0.8}>
          <div style={{
            position: 'relative', borderRadius: 8, padding: '8px 10px 8px 8px', display: 'flex', gap: 10, alignItems: 'center',
            background: `radial-gradient(80% 90% at 15% 50%, ${t.color}30, transparent 70%), linear-gradient(175deg, #241252, #120930)`,
          }}>
            <TalkCardFace card={card} width={52} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="serif" style={{ fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD }}>{a.numeral} · {a.name}</div>
              <div className="serif italic" style={{
                marginTop: 4, fontSize: 15, lineHeight: 1.2, color: 'var(--label-1)',
                display: '-webkit-box', WebkitLineClamp: both ? 2 : 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>{card.q}</div>
              {both && (
                <div style={{ marginTop: 4, fontSize: 12, lineHeight: 1.3, color: 'var(--label-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <span style={{ color: GOLD }}>{names.me}:</span> {answerLabel(card, mine!, 'me', names)} · <span style={{ color: GOLD }}>{names.them}:</span> {answerLabel(card, theirs!, 'them', names)}
                </div>
              )}
              <div className="mono" style={{ marginTop: 6, fontSize: 7.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: both ? GOLD : mine == null ? '#f4f0dc' : 'var(--label-3)' }}>
                {status}
              </div>
            </div>
          </div>
        </Gilt>
      </motion.button>

      {phone && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div key="full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{ position: 'absolute', inset: 0, zIndex: 90, background: 'rgba(5,2,15,0.78)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', display: 'grid', placeItems: 'center' }}>
              <motion.div onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.6, rotateY: 90, opacity: 0 }} animate={{ scale: 1, rotateY: 0, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                style={{ position: 'relative', perspective: 900 }}>
                <TalkCardFull {...props} />
                <button aria-label="Close" onClick={() => { sfx.tap(); setOpen(false) }} style={{
                  position: 'absolute', top: -46, right: 0, width: 36, height: 36, borderRadius: 18, display: 'grid', placeItems: 'center',
                  color: 'var(--label-1)', fontSize: 18, background: 'rgba(48,32,92,0.8)', border: '1px solid rgba(201,182,240,0.35)',
                }}>✕</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        phone,
      )}
    </>
  )
}
