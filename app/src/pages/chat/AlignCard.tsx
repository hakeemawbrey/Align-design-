import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Starfield from '../../components/Starfield'
import TalkCardFace, { TalkCardBack, TAROT_RATIO } from '../../components/talk/TalkCardFace'
import { api } from '../../api'
import { ME, profileById } from '../../data/profiles'
import { SIGNS } from '../../data/signs'
import { answerMsg, cardById, parseTalk, playMsg } from '../../data/talkCards'
import { ALIGN_CARD, betaFlow, useBetaFlow } from '../../lib/betaFlow'
import { session } from '../../lib/session'
import { sfx } from '../../lib/sfx'
import type { PageProps } from '../types'

const W = 196
const H = W * TAROT_RATIO
/** how many cards riffle in the deck */
const DECK = 7
/** the beats, ms: shuffle, the pick lifts out, it turns over */
const AT = { pick: 2300, flip: 3300, ready: 4100 }

type Stage = 'shuffle' | 'pick' | 'flip' | 'ready'
const side: React.CSSProperties = { position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }

/**
 * The alignment card (beta): when you both said yes, the stars deal one card
 * to the two of you. The deck shuffles, one card lifts out and turns over,
 * and you answer its question here. Their answer stays sealed until yours is
 * in; then both show, and the chat opens with the 33:33 running.
 */
export default function AlignCard({ go, back }: PageProps) {
  const flow = useBetaFlow()
  const them = useMemo(() => profileById(flow.with ?? 'j27') ?? profileById('j27')!, [flow.with])
  const card = cardById(ALIGN_CARD)!
  const theirs = SIGNS[them.sign]
  const [stage, setStage] = useState<Stage>('shuffle')
  const [draft, setDraft] = useState('')
  const [mine, setMine] = useState<string | null>(null)
  const [hers, setHers] = useState<string | null>(null)
  /** their answer has arrived (sealed) */
  const [herIn, setHerIn] = useState(false)
  const setup = useRef(false)
  const input = useRef<HTMLInputElement>(null)

  // nothing to answer: not in the flow, or the chat is already open
  useEffect(() => {
    if (flow.stage === 'none') go('deck')
    else if (flow.stage === 'chat' || flow.stage === 'revealed') go(them.id === 'j27' ? 'chat' : 'thread')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // the card and their answer are written to the chat once, so they're there when it opens
  useEffect(() => {
    if (setup.current) return
    setup.current = true
    betaFlow.openCard()
    void api.messages(them.id).then(async (rows) => {
      const talk = rows.map((r) => ({ from: r.from, t: parseTalk(r.body) })).filter((x) => x.t && x.t.cardId === ALIGN_CARD)
      if (!talk.some((x) => x.t!.type === 'play')) await api.send(them.id, 'them', playMsg(ALIGN_CARD))
      const theirA = talk.find((x) => x.t!.type === 'answer' && x.from !== 'me')
      if (!theirA) await api.send(them.id, 'them', answerMsg(ALIGN_CARD, card.sample))
      setHers(theirA && theirA.t!.type === 'answer' ? theirA.t!.answer : card.sample)
      const myA = talk.find((x) => x.t!.type === 'answer' && x.from === 'me')
      if (myA && myA.t!.type === 'answer') { setMine(myA.t!.answer); setHerIn(true); setStage('ready') }
    }).catch((e) => { console.warn('[align] alignment card not saved', e); setHers(card.sample) })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // the reading: shuffle → pick → flip → your turn
  useEffect(() => {
    sfx.reveal()
    const ts = [
      window.setTimeout(() => { setStage((s) => (s === 'shuffle' ? 'pick' : s)); sfx.flip() }, AT.pick),
      window.setTimeout(() => { setStage((s) => (s === 'pick' ? 'flip' : s)); sfx.sparkle() }, AT.flip),
      window.setTimeout(() => { setStage((s) => (s === 'flip' ? 'ready' : s)) }, AT.ready),
      // they answer a little after the card turns
      window.setTimeout(() => { setHerIn(true); sfx.receive() }, AT.ready + 2600),
    ]
    return () => ts.forEach(clearTimeout)
  }, [])

  const seal = () => {
    const a = draft.trim()
    if (!a || mine != null) return
    sfx.send()
    setMine(a)
    setHerIn(true)
    void api.send(them.id, 'me', answerMsg(ALIGN_CARD, a))
    window.setTimeout(() => sfx.match(), 500)
  }
  const openChat = () => {
    sfx.tap()
    betaFlow.openChat()
    session.patch({ matchWith: them.id })
    if (them.id === 'j27') go('chat'); else { session.patch({ threadWith: them.id }); go('thread') }
  }

  const picked = stage !== 'shuffle'
  const turned = stage === 'flip' || stage === 'ready'
  const ready = stage === 'ready'
  const both = mine != null

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora="#4a2a9a" warm="#6a4a2a" count={80} seed={33} />
      <button aria-label="Back" onClick={() => { sfx.tap(); back() }} style={{ position: 'absolute', left: 16, top: 52, width: 40, height: 40, display: 'grid', placeItems: 'center', color: 'var(--label-1)', zIndex: 5 }}>
        <svg width="11" height="18" viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 2 2 10l8 8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      <div style={{ position: 'absolute', top: 62, left: 0, right: 0, textAlign: 'center' }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: '0.26em', color: 'var(--align)' }}>✦ THE STARS ALIGN ✦</div>
        <div className="h-display" style={{ fontSize: 27, lineHeight: 1.15, marginTop: 8, padding: '0 30px' }}>
          {both ? 'You both answered.' : `You and ${them.name} both said yes.`}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={both ? 'b' : ready ? 'r' : turned ? 't' : picked ? 'p' : 's'} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            style={{ fontSize: 13.5, color: 'var(--label-2)', marginTop: 6 }}>
            {both ? 'Read them, then open the chat.' : ready ? 'Answer it. Yours stays sealed until you both have.' : turned ? 'Here it is.' : picked ? 'This one is yours.' : 'The deck is choosing a card for you two…'}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* the deck, and the card it picks */}
      <motion.div animate={{ y: both ? 8 : 0, scale: both ? 0.7 : 1 }} transition={{ type: 'spring', stiffness: 160, damping: 20 }}
        style={{ position: 'absolute', left: '50%', top: 172, width: W, height: H, marginLeft: -W / 2, transformOrigin: '50% 0%' }}>
        {/* glow in their colour behind the pick */}
        <motion.div animate={{ opacity: turned ? 0.9 : 0.3, scale: turned ? 1.15 : 0.9 }} transition={{ duration: 0.8 }}
          style={{ position: 'absolute', inset: -60, borderRadius: '50%', background: `radial-gradient(closest-side, ${theirs.color}66, rgba(242,199,92,0.25) 55%, transparent)`, filter: 'blur(18px)', pointerEvents: 'none' }} />
        {Array.from({ length: DECK - 1 }, (_, i) => {
          const dir = i % 2 ? 1 : -1
          return (
            <motion.div key={i}
              animate={picked
                ? { x: dir * (60 + i * 6), y: 70 + i * 3, rotate: dir * (14 + i * 2), opacity: 0, scale: 0.8 }
                : { x: [0, dir * (70 + i * 5), 0, dir * -(40 + i * 4), 0], y: [i * -2, i * -2 - 8, i * -2, i * -2 - 4, i * -2], rotate: [dir * i * 0.8, dir * 9, 0, dir * -6, dir * i * 0.8] }}
              transition={picked ? { duration: 0.55, ease: 'easeIn' } : { duration: 1.1, repeat: Infinity, delay: i * 0.07, ease: 'easeInOut' }}
              style={{ position: 'absolute', inset: 0, zIndex: i }}>
              <TalkCardBack width={W} color={i % 2 ? '#f2c75c' : '#b18cff'} />
            </motion.div>
          )
        })}
        {/* the chosen card: lifts out, then turns over */}
        <motion.div animate={picked ? { y: -10, scale: 1.08 } : { y: -(DECK * 2), scale: 1 }} transition={{ type: 'spring', stiffness: 170, damping: 18 }}
          style={{ position: 'absolute', inset: 0, zIndex: DECK, perspective: 1000 }}>
          <motion.div animate={{ rotateY: turned ? 180 : 0 }} transition={{ duration: 0.75, ease: [0.3, 0.7, 0.2, 1] }}
            style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}>
            <div style={side}><TalkCardBack width={W} color="#f2c75c" /></div>
            <div style={{ ...side, transform: 'rotateY(180deg)' }}><TalkCardFace card={card} width={W} /></div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* your turn */}
      <AnimatePresence>
        {ready && !both && (
          <motion.div key="answer" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.4 }}
            style={{ position: 'absolute', left: 24, right: 24, top: 552 }}>
            <div className="serif italic" style={{ textAlign: 'center', fontSize: 20, lineHeight: 1.25, color: 'var(--label-1)' }}>{card.q}</div>
            <form onSubmit={(e) => { e.preventDefault(); seal() }} style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <input ref={input} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Your answer" maxLength={140} aria-label="Your answer"
                style={{ flex: 1, minWidth: 0, height: 50, padding: '0 16px', borderRadius: 25, fontSize: 16, color: 'var(--label-1)', background: 'rgba(30,18,64,0.85)', border: '1px solid rgba(242,199,92,0.5)', outline: 'none', fontFamily: 'inherit' }} />
              <button type="submit" className="serif italic" disabled={!draft.trim()}
                style={{ height: 50, padding: '0 20px', borderRadius: 25, fontSize: 18, color: 'var(--chrome-ink)', background: 'var(--chrome)', opacity: draft.trim() ? 1 : 0.45, boxShadow: draft.trim() ? '0 0 20px rgba(248,237,255,0.4)' : 'none' }}>
                Seal it
              </button>
            </form>
            <div className="mono" style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 14, fontSize: 9, letterSpacing: '0.16em' }}>
              <span style={{ color: 'var(--label-1)' }}>YOU · YOUR TURN</span>
              <span style={{ color: herIn ? 'var(--align)' : 'var(--label-3)' }}>{them.name.toUpperCase()} · {herIn ? 'SEALED ✦' : 'THINKING…'}</span>
            </div>
          </motion.div>
        )}

        {/* both in: the answers, then the chat */}
        {both && (
          <motion.div key="both" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
            style={{ position: 'absolute', left: 20, right: 20, top: 452, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {([[ME.name, mine, SIGNS[ME.sign].color], [them.name, hers ?? card.sample, theirs.color]] as const).map(([who, a, tint]) => (
              <div key={who} style={{ borderRadius: 16, padding: 2.5, background: `linear-gradient(160deg, ${tint}, color-mix(in srgb, ${tint} 55%, white) 40%, ${tint})` }}>
                <div style={{ borderRadius: 13.5, padding: '10px 14px 12px', background: 'linear-gradient(180deg, #1b112f, #120b22)' }}>
                  <div className="mono" style={{ fontSize: 9, letterSpacing: '0.18em', fontWeight: 700, color: tint }}>{who.toUpperCase()}</div>
                  <div className="serif italic" style={{ fontSize: 17, lineHeight: 1.3, color: 'var(--label-1)', marginTop: 3 }}>{a}</div>
                </div>
              </div>
            ))}
            <button className="chrome-cta" onClick={openChat} style={{ width: '100%', marginTop: 8 }}>
              Open the chat <span className="spark">✦</span>
            </button>
            <div className="mono" style={{ textAlign: 'center', fontSize: 9, letterSpacing: '0.18em', color: 'var(--label-2)' }}>
              33:33 UNTIL YOUR CARDS FLIP · PHOTOS STAY VEILED TILL THEN
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
