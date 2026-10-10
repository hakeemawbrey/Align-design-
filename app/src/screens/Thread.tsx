import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import TabBar from '../components/TabBar'
import { ChatHeader } from '../components/chat/ChatParts'
import { SIGNS } from '../data/signs'
import { api, useWorld, type Message } from '../api'
import { sfx } from '../lib/sfx'
import { useSession, energize } from '../lib/session'
import { Bubble, type Msg } from './Chat'
import { ME, type Profile } from '../data/profiles'
import { MATCHES, STARTER_CHATS } from '../data/matches'
import { answerMsg, cardById, parseTalk, playMsg } from '../data/talkCards'
import ChatTalkCard from '../components/talk/ChatTalkCard'
import CardsButton from '../components/talk/CardsButton'
import HandSheet from '../components/talk/HandSheet'
import { talkState, placeState } from '../components/talk/thread'
import ChatPlaceCard from '../components/talk/ChatPlaceCard'
import { checkinMsg, parsePlace, placeById, placeMsg, rsvpMsg } from '../data/places'
import { talk } from '../lib/talk'

const toMsg = (m: Message, i: number): Msg => ({ id: i + 1, from: m.from === 'me' ? 'me' : 'her', text: m.body })

/** A match from your list who isn't a real person, as a card the chat can show. */
function seeded(id: string): Profile | undefined {
  const m = MATCHES.find((x) => x.id === id)
  if (!m) return undefined
  return { id: m.id, initial: m.name, name: m.name, age: m.age, sign: m.sign, moon: m.sign, rising: m.sign, serial: m.serial, pull: 'Steady pull', photo: m.photo, alignsBack: true, reading: [], dealbreakers: '' }
}

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

/**
 * Chat with a match. With a real person both sides are real and new messages
 * arrive live; with one of your seeded matches, they reply on their own.
 */
export default function Thread({ go }: ScreenProps) {
  const { threadWith } = useSession()
  useWorld()
  const them = api.person(threadWith) ?? seeded(threadWith)
  const bot = !!them && !them.real
  const script = STARTER_CHATS[threadWith]
  const [typing, setTyping] = useState(false)
  const alive = useRef(true)
  useEffect(() => { alive.current = true; return () => { alive.current = false } }, [])
  const [rows, setRows] = useState<Message[]>([])
  const [draft, setDraft] = useState('')
  const [hand, setHand] = useState(false)
  const seen = useRef(new Set<string>())
  const seeding = useRef(false)
  const replyIdx = useRef(0)
  const scroller = useRef<HTMLDivElement>(null)

  const add = (m: Message) => {
    if (seen.current.has(m.id)) return
    seen.current.add(m.id)
    setRows((xs) => [...xs, m])
  }

  useEffect(() => {
    if (!threadWith) return
    let off = false
    api.messages(threadWith).then(async (ms) => {
      if (off) return
      ms.forEach(add)
      // first time in a seeded chat: the conversation you already had
      if (!ms.length && script && !seeding.current) {
        seeding.current = true
        for (const o of script.opening) add(await api.send(threadWith, o.from, o.text))
      }
    }).catch((e) => console.warn('[align] could not load messages', e))
    const stop = api.onMessage(threadWith, (m) => { if (m.from === 'them') sfx.receive(); add(m) })
    return () => { off = true; stop() }
  }, [threadWith])

  useLayoutEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' })
  }, [rows])

  const post = async (text: string) => {
    if (!threadWith) return
    try { add(await api.send(threadWith, 'me', text)) } catch (e) { console.warn('[align] not sent', e); sfx.deny(); throw e }
  }
  /** a seeded match writes back after a moment (saved right away, so leaving doesn't lose it) */
  const botSays = async (text: string, ms: number) => {
    if (!threadWith) return
    await wait(ms * 0.4)
    if (alive.current) setTyping(true)
    await wait(ms * 0.6)
    const m = await api.send(threadWith, 'them', text).catch(() => null)
    if (!alive.current) return
    setTyping(false)
    if (m) { add(m); sfx.receive() }
  }
  const send = async () => {
    const text = draft.trim()
    if (!text) return
    setDraft('')
    sfx.send()
    try { await post(text) } catch { setDraft(text); return }
    energize(2)
    if (bot) {
      const pool = script?.replies ?? ['Ha, I like that.', 'Tell me more.', 'Ok, you’re fun.', 'When are you free this week?']
      void botSays(pool[replyIdx.current++ % pool.length], 2200)
    }
  }
  const playCard = async (id: string) => {
    sfx.send()
    try { await post(playMsg(id)) } catch { return }
    const card = cardById(id)
    if (bot && card) void botSays(answerMsg(id, card.sample), 3600)
  }
  const { answers } = talkState(rows.map((r) => ({ from: r.from, body: r.body })))
  const places = placeState(rows.map((r) => ({ from: r.from, body: r.body })))
  const playPlace = async (id: string, when: string) => {
    sfx.send()
    try { await post(placeMsg(id, when)) } catch { return }
    if (bot) void botSays(rsvpMsg(id, true), 2600)
  }
  const rsvp = (id: string, yes: boolean) => { if (yes) energize(5); void post(rsvpMsg(id, yes)).catch(() => {}) }
  const checkIn = (id: string) => {
    const p = placeById(id)
    energize(15)
    if (p?.partner) talk.addVenue(id)
    void post(checkinMsg(id)).catch(() => {})
  }

  if (!them) {
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
        <Starfield aurora={null} warm={null} count={40} seed={8} />
        <button className="chrome-cta" onClick={() => go('matches')} style={{ position: 'relative' }}>Back to matches</button>
      </div>
    )
  }
  const sign = SIGNS[them.sign]

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora={sign.color} warm={null} count={55} seed={33} />
      <ChatHeader onBack={() => { sfx.tap(); go('matches') }} onSky={() => {}} photo={them.photo ?? sign.auraImg} name={them.name} />

      <div ref={scroller} style={{
        position: 'absolute', top: 126, left: 0, right: 0, bottom: 168, overflowY: 'auto', padding: '8px 20px 14px', scrollbarWidth: 'none',
      }}>
        <div style={{ textAlign: 'center', padding: '10px 0 16px' }}>
          <div className="mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--align)' }}>✦ MUTUAL ALIGN ✦</div>
          <div className="serif italic" style={{ fontSize: 15, color: 'var(--label-2)', marginTop: 6 }}>
            You and {them.name} aligned. {sign.glyph} {sign.name}{them.blurb ? ` · “${them.blurb}”` : ''}
          </div>
        </div>
        <AnimatePresence initial={false}>
          {rows.map((m, i) => {
            const pl = parsePlace(m.body)
            if (pl && pl.type !== 'place') return null
            if (pl?.type === 'place') {
              const place = placeById(pl.id)
              const r = places.rsvp[pl.id] ?? {}
              const mine = m.from === 'me' ? true : r.me
              const theirs = m.from === 'them' ? true : r.them
              return place ? (
                <ChatPlaceCard key={m.id} place={place} when={pl.when} playedByMe={m.from === 'me'} mine={mine} theirs={theirs}
                  checkedIn={places.checked.has(pl.id)} them={them.name} onRsvp={(y) => rsvp(pl.id, y)} onCheckin={() => checkIn(pl.id)} />
              ) : null
            }
            const t = parseTalk(m.body)
            if (t?.type === 'answer') return null
            if (t?.type === 'play') {
              const card = cardById(t.cardId)
              return card ? (
                <ChatTalkCard key={m.id} card={card} playedByMe={m.from === 'me'}
                  mine={answers[card.id]?.me} theirs={answers[card.id]?.them}
                  names={{ me: ME.name, them: them.name }} onAnswer={(a) => { energize(5); void post(answerMsg(card.id, a)).catch(() => {}) }} />
              ) : null
            }
            return <div key={m.id}><Bubble msg={toMsg(m, i)} /></div>
          })}
        </AnimatePresence>
        {typing && <div style={{ fontSize: 13, color: 'var(--label-3)', margin: '6px 4px' }}>{them.name} is typing…</div>}
        {!rows.length && (
          <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--label-3)', marginTop: 30 }}>Say the first thing. Make it specific.</div>
        )}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); void send() }} style={{
        position: 'absolute', left: 20, right: 20, top: 682, height: 52, borderRadius: 26, display: 'flex', alignItems: 'center',
        padding: '0 7px 0 7px', gap: 8, zIndex: 6, background: 'rgba(30, 18, 64, 0.85)', border: '1px solid rgba(179,166,196,0.26)',
      }}>
        <CardsButton onClick={() => { sfx.tap(); setHand(true) }} />
        <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={`Message ${them.name}`} style={{
          flex: 1, minWidth: 0, background: 'none', border: 0, outline: 'none', fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--label-1)', caretColor: 'var(--align)',
        }} />
        <motion.button type="submit" aria-label="Send" whileTap={{ scale: 0.88 }} style={{
          width: 38, height: 38, borderRadius: 19, display: 'grid', placeItems: 'center', flexShrink: 0,
          background: draft.trim() ? 'rgba(242, 199, 92, 0.95)' : 'rgba(52, 35, 95, 0.9)',
        }}>
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none" stroke={draft.trim() ? '#3a2c4e' : 'var(--align)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 14V2M2 7l5-5 5 5" /></svg>
        </motion.button>
      </form>

      <AnimatePresence>
        {hand && <HandSheet them={them.name} onPlay={(id) => { void playCard(id) }} onPlace={(id, w) => { void playPlace(id, w) }} onClose={() => setHand(false)} onUpgrade={() => go('paywall')} />}
      </AnimatePresence>
      <TabBar active="matches" go={go} />
    </div>
  )
}
