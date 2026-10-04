import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import TabBar from '../components/TabBar'
import { ChatHeader, ExpiryBar, InlineAlignmentCard, Receipt, TypingIndicator } from '../components/chat/ChatParts'
import { DECK } from '../data/profiles'
import { sfx } from '../lib/sfx'

type Msg = { id: number; from: 'her' | 'me' | 'card'; text: string }

const juniper = DECK.find((p) => p.id === 'j27')!
const PHOTO = juniper.photo ?? '/img/juniper.jpg'

/** Seeded conversation from S-09 — animated in on mount. */
const SCRIPT: Omit<Msg, 'id'>[] = [
  { from: 'her', text: 'You opened with a question about my dealbreakers. Bold.' },
  { from: 'me', text: 'You listed four. I read all of them twice.' },
  { from: 'her', text: 'Which one landed.' },
  { from: 'me', text: 'The one about people who need the last word.' },
  { from: 'her', text: 'That is not a dealbreaker. That is a warning.' },
  { from: 'me', text: 'Noted.' },
]

const REPLIES = [
  'Say it again on Thursday and I will believe you.',
  'Fine. Venus says you get one more question.',
  'Careful. I screenshot the good ones.',
  'That is either very Taurus or very you.',
  'Ask me in person. I answer better over wine.',
]

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

/** S-09 Chat — the payoff after the match. */
export default function Chat({ go }: ScreenProps) {
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [typing, setTyping] = useState(false)
  const [seen, setSeen] = useState(false)
  const [draft, setDraft] = useState('')
  const idRef = useRef(0)
  const replyIdx = useRef(0)
  const alive = useRef(true)
  const scroller = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const push = (m: Omit<Msg, 'id'>) => setMsgs((xs) => [...xs, { ...m, id: ++idRef.current }])

  const herTypes = async (text: string, typeMs: number, dead: () => boolean) => {
    setSeen(true)
    setTyping(true)
    await wait(typeMs)
    if (dead()) return
    setTyping(false)
    push({ from: 'her', text })
    sfx.receive()
  }

  // play the seeded conversation in
  useEffect(() => {
    alive.current = true
    let cancelled = false
    const dead = () => cancelled
    ;(async () => {
      await wait(650)
      for (const m of SCRIPT) {
        if (dead()) return
        if (m.from === 'her') {
          await herTypes(m.text, 850, dead)
        } else {
          setSeen(false)
          push(m)
          sfx.send()
        }
        await wait(m.from === 'her' ? 900 : 700)
      }
      if (dead()) return
      await wait(500)
      if (dead()) return
      setSeen(true)
      sfx.tap()
      await wait(900)
      if (dead()) return
      push({ from: 'card', text: '' })
      sfx.sparkle()
    })()
    return () => { cancelled = true; alive.current = false }
  }, [])

  // keep pinned to the latest message
  useLayoutEffect(() => {
    const el = scroller.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [msgs, typing, seen])

  const send = async () => {
    const text = draft.trim()
    if (!text) return
    setDraft('')
    setSeen(false)
    push({ from: 'me', text })
    sfx.send()
    const reply = REPLIES[replyIdx.current % REPLIES.length]
    replyIdx.current++
    await wait(900)
    if (!alive.current) return
    setSeen(true)
    await wait(600)
    if (!alive.current) return
    await herTypes(reply, 1300, () => !alive.current)
  }

  // receipt goes under my last message only while it is the latest bubble
  const bubbles = msgs.filter((m) => m.from !== 'card')
  const last = bubbles[bubbles.length - 1]
  const receiptAfter = last && last.from === 'me' ? last.id : -1

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora={null} warm={null} count={55} seed={21} />
      <div style={{ position: 'absolute', inset: 0, background: '#150b35', mixBlendMode: 'lighten', pointerEvents: 'none' }} />

      <ChatHeader onBack={() => { sfx.tap(); go('reveal') }} onSky={() => { sfx.tap(); go('alignment') }} photo={PHOTO} name={juniper.name} />
      <ExpiryBar daysLeft={6} />

      {/* thread */}
      <div
        ref={scroller}
        className="chat-scroll"
        style={{
          position: 'absolute', top: 166, left: 0, right: 0, bottom: 168, overflowY: 'auto', overflowX: 'hidden',
          padding: '8px 20px 14px', scrollbarWidth: 'none',
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0, #000 22px, #000 calc(100% - 10px), transparent 100%)',
          maskImage: 'linear-gradient(180deg, transparent 0, #000 22px, #000 calc(100% - 10px), transparent 100%)',
        }}
      >
        <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--label-3)', padding: '10px 0 14px' }}>Today</div>
        <AnimatePresence initial={false}>
          {msgs.map((m) => (
            m.from === 'card' ? (
              <InlineAlignmentCard key={m.id} onOpen={() => { sfx.tap(); go('alignment') }} />
            ) : (
              <div key={m.id}>
                <Bubble msg={m} />
                <AnimatePresence>{receiptAfter === m.id && <Receipt key="r" seen={seen} />}</AnimatePresence>
              </div>
            )
          ))}
          {typing && <TypingIndicator key="typing" name="Juniper" />}
        </AnimatePresence>
      </div>

      {/* composer */}
      <form
        onSubmit={(e) => { e.preventDefault(); void send() }}
        onClick={() => inputRef.current?.focus()}
        style={{
          position: 'absolute', left: 20, right: 20, top: 682, height: 52, borderRadius: 26,
          display: 'flex', alignItems: 'center', padding: '0 7px 0 20px', gap: 8, zIndex: 6,
          background: 'rgba(30, 18, 64, 0.85)', border: '1px solid rgba(179,166,196,0.26)',
          backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', cursor: 'text',
        }}
      >
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Say something"
          style={{
            flex: 1, minWidth: 0, background: 'none', border: 0, outline: 'none',
            fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--label-1)', caretColor: 'var(--align)',
            userSelect: 'text', WebkitUserSelect: 'text',
          }}
        />
        <motion.button
          type="submit"
          aria-label="Send"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.88 }}
          animate={{
            background: draft.trim() ? 'rgba(242, 199, 92, 0.95)' : 'rgba(52, 35, 95, 0.9)',
            boxShadow: draft.trim() ? '0 0 18px rgba(242, 199, 92, 0.55)' : '0 0 0 rgba(0,0,0,0)',
          }}
          transition={{ duration: 0.2 }}
          style={{ width: 38, height: 38, borderRadius: 19, display: 'grid', placeItems: 'center', flexShrink: 0 }}
        >
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none" stroke={draft.trim() ? '#3a2c4e' : 'var(--align)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 14V2M2 7l5-5 5 5" />
          </svg>
        </motion.button>
      </form>

      <TabBar active="matches" go={go} />
    </div>
  )
}

function Bubble({ msg }: { msg: Msg }) {
  const mine = msg.from === 'me'
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 14, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
      style={{
        display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start', marginTop: 10,
        transformOrigin: mine ? 'right bottom' : 'left bottom',
      }}
    >
      <div style={{
        maxWidth: mine ? 266 : 266, padding: '10px 16px 11px', borderRadius: 18,
        fontSize: 15, lineHeight: '21px', color: 'var(--label-1)',
        background: mine ? '#3b2a6c' : '#2a1f4e',
        boxShadow: mine ? 'inset 0 1px 0 rgba(255,255,255,0.05)' : 'inset 0 1px 0 rgba(255,255,255,0.03)',
        userSelect: 'text', WebkitUserSelect: 'text',
      }}>
        {msg.text}
      </div>
    </motion.div>
  )
}
