import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import TabBar from '../components/TabBar'
import ReportSheet from '../components/chat/ReportSheet'
import { ChatHeader, ExpiryBar, InlineAlignmentCard, Receipt, ThreadNote, TypingIndicator } from '../components/chat/ChatParts'
import EmptyThread from '../components/chat/EmptyThread'
import HerCardSheet from '../components/chat/HerCardSheet'
import { DECK } from '../data/profiles'
import { sfx } from '../lib/sfx'
import { session, energize } from '../lib/session'
import { api, type Message } from '../api'
import { ME } from '../data/profiles'
import { PERSONA, type PersonaId } from '../data/persona'
import { answerMsg, cardById, parseTalk, playMsg } from '../data/talkCards'
import ChatTalkCard from '../components/talk/ChatTalkCard'
import CardsButton from '../components/talk/CardsButton'
import HandSheet from '../components/talk/HandSheet'
import UsToday from '../components/sky/UsToday'
import type { TalkTopic } from '../data/talkCards'
import { binderNav } from '../lib/binderNav'
import { talkState, placeState } from '../components/talk/thread'
import ChatPlaceCard from '../components/talk/ChatPlaceCard'
import { checkinMsg, parsePlace, placeById, placeMsg, rsvpMsg } from '../data/places'
import { talk } from '../lib/talk'

export type Msg = { id: number; from: 'her' | 'me' | 'card'; text: string }

const juniper = DECK.find((p) => p.id === 'j27')!
const PHOTO = juniper.photo ?? 'img/juniper.jpg'

/**
 * Seeded conversation, animated in on mount. Written like two people who just
 * matched: it starts from something on her card and ends with a real plan.
 * Her card: assistant curator, books by colour, vinyl. The second half picks
 * up something on yours, so it's written per founder:
 * Hakeem — sound engineer, record stores. Xavier — film cameras, late-night tacos.
 * Jeremy — karaoke, cooking. Samid — live music, photo booths.
 */
const OPENING: Omit<Msg, 'id'>[] = [
  { from: 'me', text: 'Ok I have to ask. Do you actually organise your books by colour?' },
  { from: 'her', text: 'Every single one. It looks great and I can never find anything' },
  { from: 'me', text: 'That’s the most Libra thing I’ve heard all week' },
]
const SCRIPTS: Record<PersonaId, Omit<Msg, 'id'>[]> = {
  hakeem: [
    ...OPENING,
    { from: 'her', text: 'I’ll allow it. Your card says sound engineer — studio or live?' },
    { from: 'me', text: 'Mostly studio. I’m the guy nobody notices until the mic cuts out' },
    { from: 'her', text: 'Ha. You also put record stores. Cactus or somewhere else?' },
    { from: 'me', text: 'Cactus. Want to go this week and see who walks out with too many?' },
    { from: 'her', text: 'Oh you’re on. Thursday after work?' },
    { from: 'me', text: 'Thursday works' },
  ],
  xavier: [
    ...OPENING,
    { from: 'her', text: 'I’ll allow it. Your card says film cameras — what do you shoot on?' },
    { from: 'me', text: 'An old Pentax. Half my rolls are just friends waiting for food' },
    { from: 'her', text: 'Ha. You also put late-night tacos. Best spot after midnight, go.' },
    { from: 'me', text: 'The truck on Airline. Want to go this week and I’ll bring the camera?' },
    { from: 'her', text: 'Oh you’re on. Thursday after work?' },
    { from: 'me', text: 'Thursday works' },
  ],
  jeremy: [
    ...OPENING,
    { from: 'her', text: 'I’ll allow it. Your card says karaoke — what’s your song?' },
    { from: 'me', text: 'Anything old R&B. I do a Luther that clears the room, in a good way' },
    { from: 'her', text: 'Ha. You also put cooking. What’s the dish you show off with?' },
    { from: 'me', text: 'Oxtail. Want to come over this week and judge it?' },
    { from: 'her', text: 'Oh you’re on. Thursday after work?' },
    { from: 'me', text: 'Thursday works' },
  ],
  samid: [
    ...OPENING,
    { from: 'her', text: 'I’ll allow it. Your card says live music — who was the last show?' },
    { from: 'me', text: 'A tiny jazz night in the Heights. Twelve people, best show all year' },
    { from: 'her', text: 'Ha. You also put photo booths. Explain yourself.' },
    { from: 'me', text: 'Every one I see, I go in. Want to find one this week and see how bad we look?' },
    { from: 'her', text: 'Oh you’re on. Thursday after work?' },
    { from: 'me', text: 'Thursday works' },
  ],
}
const SCRIPT = SCRIPTS[PERSONA.id]

/** Her replies to whatever the presenter types, in order. Kept general so they fit most messages. */
const REPLIES = [
  'Ha ok, I like that',
  'Wait, what are you listening to right now?',
  'You’re funnier than your card let on',
  { hakeem: 'Deal. Whoever buys more gets tacos after', xavier: 'Deal. If the photos come out, you owe me prints', jeremy: 'Deal. I’m bringing dessert, you’re picking the song', samid: 'Deal. Loser of the photo booth buys the drinks' }[PERSONA.id],
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

/**
 * Design states of this chat, opened by address (x/chat-state/<state>) for review
 * and capture. Each one is the same screen under a real condition: a send that
 * failed, days left on the card, nothing said yet, her card opened.
 */
export type ChatDemo = 'unread' | 'failed' | 'expiring' | 'closed' | 'card' | 'empty'
export const CHAT_DEMOS: ChatDemo[] = ['unread', 'failed', 'expiring', 'closed', 'card', 'empty']

/** days left on Juniper's card (she matched tonight) */
const DAYS_LEFT = 6

/** Openers for a chat with nothing in it yet (G-10). */
const OPENERS = ['Being honest first: your playlist made me miss my stop.', 'The cards said we’re dangerous. Verify?']

/** S-09 Chat — the payoff after the match. Messages are saved to the backend. */

export default function Chat({ go, demo }: ScreenProps & { demo?: ChatDemo }) {
  const [report, setReport] = useState(false)
  const [cardOpen, setCardOpen] = useState(demo === 'card')
  const daysLeft = demo === 'expiring' ? 2 : demo === 'closed' ? 0 : DAYS_LEFT
  const closed = daysLeft <= 0
  /** my messages that didn't reach the server: tap to retry */
  const [failed, setFailed] = useState<Set<number>>(() => new Set(demo === 'failed' ? [SCRIPT.length] : []))
  /** nothing said yet: the composer stays tucked away until you choose to write */
  const [composing, setComposing] = useState(false)
  const [picked, setPicked] = useState<number | null>(null)
  const [loaded, setLoaded] = useState(!!demo)
  const [hand, setHand] = useState(false)
  const [handTopic, setHandTopic] = useState<TalkTopic | undefined>(undefined)
  // the scripted intro plays once per demo run; afterwards the thread is just there
  const [replay] = useState(() => !demo && !session.get().chatPlayed)
  const [msgs, setMsgs] = useState<Msg[]>(() =>
    demo && demo !== 'empty' ? SCRIPT.map((m, i) => ({ ...m, id: i + 1 })) : [])
  const [typing, setTyping] = useState(false)
  const [seen, setSeen] = useState(!replay && demo !== 'unread')
  const [draft, setDraft] = useState('')
  const idRef = useRef(demo && demo !== 'empty' ? SCRIPT.length : 0)
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
  /** resolves false when the message didn't make it (offline, server error) */
  const record = (from: 'me' | 'her', text: string): Promise<boolean> => {
    // review states don't write to the backend
    if (demo) return Promise.resolve(true)
    pending.current.push(key(from, text))
    // one at a time, so the saved order matches the order on screen
    const sent = queue.current.then(() => {
      if (typeof navigator !== 'undefined' && navigator.onLine === false) throw new Error('offline')
      return api.send(MATCH, from === 'me' ? 'me' : 'them', text)
    }).then(() => true, (e) => {
      console.warn('[align] message not saved', e)
      const i = pending.current.indexOf(key(from, text))
      if (i >= 0) pending.current.splice(i, 1)
      return false
    })
    queue.current = sent
    return sent
  }
  /** a message of mine: shown at once, marked "not sent" if the save fails */
  const sendMine = (text: string) => {
    const id = ++idRef.current
    setMsgs((xs) => [...xs, { from: 'me', text, id }])
    return record('me', text).then((ok) => {
      if (!ok) { setFailed((f) => new Set(f).add(id)); sfx.deny() }
      return ok
    })
  }
  const retry = (id: number) => {
    const m = msgs.find((x) => x.id === id)
    if (!m) return
    sfx.tap()
    setFailed((f) => { const n = new Set(f); n.delete(id); return n })
    void record('me', m.text).then((ok) => {
      if (!ok) { setFailed((f) => new Set(f).add(id)); sfx.deny(); return }
      sfx.send()
      setSeen(false)
    })
  }
  const push = (m: Omit<Msg, 'id'>) => {
    if (m.from === 'me') { void sendMine(m.text); return }
    show(m)
    if (m.from !== 'card') void record(m.from, m.text)
  }

  // return visits: load the saved thread
  useEffect(() => {
    if (replay || demo) return
    let off = false
    api.messages(MATCH).then((rows) => {
      if (off) return
      setLoaded(true)
      const t = threadFrom(rows)
      idRef.current = t.length
      replyIdx.current = Math.max(0, rows.filter((r) => r.from === 'them').length - SCRIPT.filter((m) => m.from === 'her').length)
      setMsgs(t.map((m, i) => ({ ...m, id: i + 1 })))
    }).catch((e) => console.warn('[align] could not load messages', e))
    return () => { off = true }
  }, [replay])

  // live: messages written elsewhere (another device, another tab)
  useEffect(() => demo ? undefined : api.onMessage(MATCH, (m) => {
    const from = m.from === 'me' ? 'me' : 'her'
    const i = pending.current.indexOf(key(from, m.body))
    if (i >= 0) { pending.current.splice(i, 1); return }
    show({ from, text: m.body })
    if (from === 'her') sfx.receive()
  }), [demo])

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
      SCRIPT.forEach((m) => { void record(m.from === 'me' ? 'me' : 'her', m.text) })
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

  const send = async (said?: string) => {
    if (closed) return
    const text = (said ?? draft).trim()
    if (!text) return
    setDraft('')
    setPicked(null)
    setComposing(true)
    setSeen(false)
    sfx.send()
    const ok = await sendMine(text)
    if (!ok || !alive.current) return
    energize(2)
    // the review states stay as they are: nobody writes back
    if (demo && demo !== 'empty') return
    const reply = REPLIES[replyIdx.current % REPLIES.length]
    replyIdx.current++
    // her reply is saved right away, so it's there even if you leave before she "types" it
    void record('her', reply)
    await wait(900)
    if (!alive.current) return
    setSeen(true)
    await wait(600)
    if (!alive.current) return
    await herTypes(reply, 1300, () => !alive.current)
  }

  /* ---------- talk cards ---------- */
  const talkRows = msgs.filter((m) => m.from !== 'card').map((m) => ({ from: m.from === 'me' ? 'me' as const : 'them' as const, body: m.text }))
  const { answers } = talkState(talkRows)
  const playCard = (cardId: string) => {
    push({ from: 'me', text: playMsg(cardId) })
    sfx.send()
    // Juniper answers hers after a moment; it stays sealed until you answer yours
    const card = cardById(cardId)
    if (!card) return
    window.setTimeout(() => {
      if (!alive.current) { void record('her', answerMsg(cardId, card.sample)); return }
      push({ from: 'her', text: answerMsg(cardId, card.sample) })
      sfx.receive()
    }, 3200 + Math.random() * 1500)
  }
  const answerCard = (cardId: string, a: string) => { energize(5); push({ from: 'me', text: answerMsg(cardId, a) }) }
  const places = placeState(talkRows)
  const playPlace = (id: string, when: string) => {
    push({ from: 'me', text: placeMsg(id, when) })
    sfx.send()
    window.setTimeout(() => {
      if (!alive.current) { void record('her', rsvpMsg(id, true)); return }
      push({ from: 'her', text: rsvpMsg(id, true) })
      sfx.receive()
    }, 2400)
  }
  const rsvp = (id: string, yes: boolean) => { if (yes) energize(5); push({ from: 'me', text: rsvpMsg(id, yes) }) }
  const checkIn = (id: string) => {
    energize(15)
    if (placeById(id)?.partner) talk.addVenue(id)
    push({ from: 'me', text: checkinMsg(id) })
  }

  // receipt goes under my last message only while it is the latest bubble
  const bubbles = msgs.filter((m) => m.from !== 'card' && !parseTalk(m.text) && !parsePlace(m.text))
  const last = bubbles[bubbles.length - 1]
  const receiptAfter = last && last.from === 'me' ? last.id : -1
  const expiring = !closed && daysLeft <= 2
  const empty = !replay && loaded && msgs.length === 0 && !typing
  const showComposer = !empty || composing
  const backTo = () => { sfx.tap(); go(demo ? 'matches' : 'reveal') }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora={null} warm={null} count={55} seed={21} />
      <div style={{ position: 'absolute', inset: 0, background: '#150b35', mixBlendMode: 'lighten', pointerEvents: 'none' }} />

      <ChatHeader onBack={backTo} onMore={() => { sfx.tap(); setReport(true) }} onSky={() => { sfx.tap(); go('alignment') }}
        onWho={() => { sfx.flip(); setCardOpen(true) }} photo={PHOTO} name={juniper.name}
        sub={empty ? 'Matched 2 minutes ago' : undefined} />
      {!empty && <ExpiryBar daysLeft={daysLeft} />}

      {empty && !composing && (
        <EmptyThread sign={juniper.sign} openers={OPENERS} picked={picked}
          onPick={(i) => { setPicked(i); setDraft(OPENERS[i]) }}
          onSay={() => { if (picked != null) void send(OPENERS[picked]); else { setComposing(true); window.setTimeout(() => inputRef.current?.focus(), 50) } }}
          onOwn={() => { setPicked(null); setDraft(''); setComposing(true); window.setTimeout(() => inputRef.current?.focus(), 50) }} />
      )}

      {/* thread */}
      <div
        ref={scroller}
        className="chat-scroll"
        style={{
          position: 'absolute', top: closed ? 126 : 166, left: 0, right: 0, bottom: 168, overflowY: 'auto', overflowX: 'hidden',
          display: empty ? 'none' : undefined,
          padding: '8px 24px 14px', scrollbarWidth: 'none',
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0, #000 22px, #000 calc(100% - 10px), transparent 100%)',
          maskImage: 'linear-gradient(180deg, transparent 0, #000 22px, #000 calc(100% - 10px), transparent 100%)',
        }}
      >
        <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--label-3)', padding: '10px 0 14px' }}>Today</div>
        <div style={{ opacity: closed ? 0.5 : 1 }}>
        <UsToday them={juniper.name} sign={juniper.sign} onPlay={(t) => { setHandTopic(t); setHand(true) }} />
        <AnimatePresence initial={false}>
          {msgs.map((m) => {
            const pl = m.from === 'card' ? null : parsePlace(m.text)
            if (pl && pl.type !== 'place') return null
            if (pl?.type === 'place') {
              const place = placeById(pl.id)
              const r = places.rsvp[pl.id] ?? {}
              return place ? (
                <ChatPlaceCard key={m.id} place={place} when={pl.when} playedByMe={m.from === 'me'}
                  mine={m.from === 'me' ? true : r.me} theirs={m.from === 'her' ? true : r.them}
                  checkedIn={places.checked.has(pl.id)} them={juniper.name} onRsvp={(y) => rsvp(pl.id, y)} onCheckin={() => checkIn(pl.id)} />
              ) : null
            }
            const t = m.from === 'card' ? null : parseTalk(m.text)
            if (t?.type === 'answer') return null
            if (t?.type === 'play') {
              const card = cardById(t.cardId)
              return card ? (
                <ChatTalkCard key={m.id} card={card} playedByMe={m.from === 'me'}
                  mine={answers[card.id]?.me} theirs={answers[card.id]?.them}
                  names={{ me: ME.name, them: juniper.name }} onAnswer={(a) => answerCard(card.id, a)} />
              ) : null
            }
            return m.from === 'card' ? (
              <InlineAlignmentCard key={m.id} onOpen={() => { sfx.tap(); go('alignment') }} />
            ) : (
              <div key={m.id}>
                <Bubble msg={m} />
                <AnimatePresence>
                  {failed.has(m.id)
                    ? <ThreadNote key="f" kind="failed" name={juniper.name} onTap={() => retry(m.id)} />
                    : receiptAfter === m.id && !closed && !expiring && (seen
                      ? <Receipt key="r" seen />
                      : <ThreadNote key="u" kind="unread" name={juniper.name} daysLeft={daysLeft} />)}
                </AnimatePresence>
              </div>
            )
          })}
          {typing && <TypingIndicator key="typing" name="Juniper" />}
          {expiring && msgs.length > 0 && <ThreadNote key="expiring" kind="expiring" name={juniper.name} daysLeft={daysLeft} />}
        </AnimatePresence>
        </div>
        {/* outside the dimmed thread so it reads at full strength */}
        {closed && <ThreadNote kind="closed" name={juniper.name} onTap={() => { sfx.tap(); go(`x/match-expired/${MATCH}`) }} />}
      </div>

      {/* composer */}
      <form
        onSubmit={(e) => { e.preventDefault(); void send() }}
        onClick={() => inputRef.current?.focus()}
        style={{
          display: showComposer ? 'flex' : 'none', opacity: closed ? 0.5 : 1, pointerEvents: closed ? 'none' : undefined,
          position: 'absolute', left: 24, right: 24, top: 682, height: 52, borderRadius: 26,
          alignItems: 'center', padding: '0 7px 0 7px', gap: 8, zIndex: 6,
          background: 'rgba(30, 18, 64, 0.85)', border: '1px solid rgba(179,166,196,0.26)',
          backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', cursor: 'text',
        }}
      >
        {!closed && <CardsButton onClick={() => { sfx.tap(); setHand(true) }} />}
        <input
          ref={inputRef}
          value={draft}
          disabled={closed}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={closed ? 'This channel is closed' : 'Say something'}
          style={{
            flex: 1, minWidth: 0, background: 'none', border: 0, outline: 'none', paddingLeft: closed ? 12 : 0,
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
            background: draft.trim() ? 'rgba(248, 237, 255, 0.95)' : 'rgba(52, 35, 95, 0.9)',
            boxShadow: draft.trim() ? '0 0 18px rgba(248, 237, 255, 0.5)' : '0 0 0 rgba(0,0,0,0)',
          }}
          transition={{ duration: 0.2 }}
          style={{ width: 38, height: 38, borderRadius: 19, display: 'grid', placeItems: 'center', flexShrink: 0 }}
        >
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none" stroke={draft.trim() ? '#3a2c4e' : 'var(--label-2)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 14V2M2 7l5-5 5 5" />
          </svg>
        </motion.button>
      </form>

      <AnimatePresence>
        {hand && <HandSheet onBinder={() => binderNav.open(go, 'chat')} them={juniper.name} onPlace={playPlace} onPlay={playCard} onClose={() => { setHand(false); setHandTopic(undefined) }} startTopic={handTopic} onUpgrade={() => go('paywall')} />}
      </AnimatePresence>
      <AnimatePresence>
        {cardOpen && (
          <HerCardSheet key="card" p={juniper} onClose={() => setCardOpen(false)} onAlignment={() => go('alignment')} />
        )}
      </AnimatePresence>
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

export function Bubble({ msg }: { msg: Msg }) {
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
        maxWidth: 266, padding: '10px 16px 11px', borderRadius: 18,
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
