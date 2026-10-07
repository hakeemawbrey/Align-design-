import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import TabBar from '../components/TabBar'
import ReportSheet from '../components/chat/ReportSheet'
import { ChatHeader, ExpiryBar, InlineAlignmentCard, Receipt, TypingIndicator } from '../components/chat/ChatParts'
import { DECK } from '../data/profiles'
import { sfx } from '../lib/sfx'
import { session } from '../lib/session'
import { api, type Message } from '../api'

type Msg = { id: number; from: 'her' | 'me' | 'card'; text: string }

const juniper = DECK.find((p) => p.id === 'j27')!
const PHOTO = juniper.photo ?? 'img/juniper.jpg'

/**
 * Seeded conversation, animated in on mount. Written like two people who just
 * matched: it starts from something on her card and ends with a real plan.
 * (Her card: assistant curator, books by colour, vinyl. His: sound engineer, record stores.)
 */
const SCRIPT: Omit<Msg, 'id'>[] = [
  { from: 'me', text: 'Ok I have to ask. Do you actually organise your books by colour?' },
  { from: 'her', text: 'Every single one. It looks great and I can never find anything' },
  { from: 'me', text: 'That’s the most Libra thing I’ve heard all week' },
  { from: 'her', text: 'I’ll allow it. Your card says sound engineer — studio or live?' },
  { from: 'me', text: 'Mostly studio. I’m the guy nobody notices until the mic cuts out' },
  { from: 'her', text: 'Ha. You also put record stores. Cactus or somewhere else?' },
  { from: 'me', text: 'Cactus. Want to go this week and see who walks out with too many?' },
  { from: 'her', text: 'Oh you’re on. Thursday after work?' },
  { from: 'me', text: 'Thursday works' },
]

/** Her replies to whatever the presenter types, in order. Kept general so they fit most messages. */
const REPLIES = [
  'Ha ok, I like that',
  'Wait, what are you listening to right now?',
  'You’re funnier than your card let on',
  'Deal. Whoever buys more gets tacos after',
  'Ok I have to get back to work but I’m looking forward to Thursday',
]

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

const MATCH = juniper.id
const key = (from: Msg['from'], text: string) => `${from}|${text}`

/** Saved messages → thread, with the alignment card after the opening script. */
function threadFrom(rows: Message[]): Omit<Msg, 'id'>[] {
  const out: Omit<Msg, 'id'>[] = rows.map((r) => ({ from: r.from === 'me' ? 'me' : 'her', text: r.body }))
  if (out.length >= SCRIPT.length) out.splice(SCRIPT.length, 0, { from: 'card', text: '' })
  return out
}

/** S-09 Chat — the payoff after the match. Messages are saved to the backend. */

export default function Chat({ go }: ScreenProps) {
  const [report, setReport] = useState(false)
  // the scripted intro plays once per demo run; afterwards the thread is just there
  const [replay] = useState(() => !session.get().chatPlayed)
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [typing, setTyping] = useState(false)
  const [seen, setSeen] = useState(!replay)
  const [draft, setDraft] = useState('')
  const idRef = useRef(0)
  const replyIdx = useRef(0)
  /** messages this screen wrote, so the live feed doesn't show them twice */
  const pending = useRef<string[]>([])
  const scriptSaved = useRef(false)
  const firstScroll = useRef(true)
  const alive = useRef(true)
  const scroller = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const show = (m: Omit<Msg, 'id'>) => setMsgs((xs) => [...xs, { ...m, id: ++idRef.current }])
  /** save a message to the backend (works even after you leave the screen) */
  const queue = useRef<Promise<unknown>>(Promise.resolve())
  const record = (from: 'me' | 'her', text: string) => {
    pending.current.push(key(from, text))
    // one at a time, so the saved order matches the order on screen
    queue.current = queue.current.then(() => api.send(MATCH, from === 'me' ? 'me' : 'them', text))
      .catch((e) => console.warn('[align] message not saved', e))
  }
  const push = (m: Omit<Msg, 'id'>) => {
    show(m)
    if (m.from !== 'card') record(m.from, m.text)
  }

  // return visits: load the saved thread
  useEffect(() => {
    if (replay) return
    let off = false
    api.messages(MATCH).then((rows) => {
      if (off) return
      const t = threadFrom(rows)
      idRef.current = t.length
      replyIdx.current = Math.max(0, rows.filter((r) => r.from === 'them').length - SCRIPT.filter((m) => m.from === 'her').length)
      setMsgs(t.map((m, i) => ({ ...m, id: i + 1 })))
    }).catch((e) => console.warn('[align] could not load messages', e))
    return () => { off = true }
  }, [replay])

  // live: messages written elsewhere (another device, another tab)
  useEffect(() => api.onMessage(MATCH, (m) => {
    const from = m.from === 'me' ? 'me' : 'her'
    const i = pending.current.indexOf(key(from, m.body))
    if (i >= 0) { pending.current.splice(i, 1); return }
    show({ from, text: m.body })
    if (from === 'her') sfx.receive()
  }), [])

  const herTypes = async (text: string, typeMs: number, dead: () => boolean) => {
    setSeen(true)
    setTyping(true)
    await wait(typeMs)
    if (dead()) return
    setTyping(false)
    show({ from: 'her', text })
    sfx.receive()
  }

  // play the seeded conversation in
  useEffect(() => {
    alive.current = true
    let cancelled = false
    const dead = () => cancelled
    if (!replay) return () => { alive.current = false }
    // save the whole opening now, so leaving halfway never replays or duplicates it
    if (!scriptSaved.current) {
      scriptSaved.current = true // effects run twice in dev; save once
      session.patch({ chatPlayed: true })
      SCRIPT.forEach((m) => record(m.from === 'me' ? 'me' : 'her', m.text))
    }
    ;(async () => {
      await wait(650)
      for (const m of SCRIPT) {
        if (dead()) return
        if (m.from === 'her') {
          await herTypes(m.text, 850, dead)
        } else {
          setSeen(false)
          show(m)
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
      show({ from: 'card', text: '' })
      sfx.sparkle()
    })()
    return () => { cancelled = true; alive.current = false }
  }, [replay])

  // keep pinned to the latest message
  useLayoutEffect(() => {
    const el = scroller.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: firstScroll.current ? 'auto' : 'smooth' })
    firstScroll.current = false
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
    // her reply is saved right away, so it's there even if you leave before she "types" it
    record('her', reply)
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

      <ChatHeader onBack={() => { sfx.tap(); go('reveal') }} onMore={() => { sfx.tap(); setReport(true) }} onSky={() => { sfx.tap(); go('alignment') }} photo={PHOTO} name={juniper.name} />
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

      <AnimatePresence>
        {report && (
          <ReportSheet name={juniper.name} pronoun="her" onClose={() => setReport(false)}
            onDone={() => { session.patch({ blockedPeople: [...session.get().blockedPeople, juniper.id] }); go('matches') }} />
        )}
      </AnimatePresence>
      <TabBar active="matches" go={go} onSelect={(t) => { if (t === 'matches') { go('matches'); return true } }} />
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
