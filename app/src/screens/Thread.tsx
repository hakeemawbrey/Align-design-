import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import TabBar from '../components/TabBar'
import { ChatHeader } from '../components/chat/ChatParts'
import { SIGNS } from '../data/signs'
import { api, useWorld, type Message } from '../api'
import { sfx } from '../lib/sfx'
import { useSession } from '../lib/session'
import { Bubble, type Msg } from './Chat'

const toMsg = (m: Message, i: number): Msg => ({ id: i + 1, from: m.from === 'me' ? 'me' : 'her', text: m.body })

/** Chat with a real person you matched with. Both sides are real; new messages arrive live. */
export default function Thread({ go }: ScreenProps) {
  const { threadWith } = useSession()
  useWorld()
  const them = api.person(threadWith)
  const [rows, setRows] = useState<Message[]>([])
  const [draft, setDraft] = useState('')
  const seen = useRef(new Set<string>())
  const scroller = useRef<HTMLDivElement>(null)

  const add = (m: Message) => {
    if (seen.current.has(m.id)) return
    seen.current.add(m.id)
    setRows((xs) => [...xs, m])
  }

  useEffect(() => {
    if (!threadWith) return
    let off = false
    api.messages(threadWith).then((ms) => { if (!off) ms.forEach(add) }).catch((e) => console.warn('[align] could not load messages', e))
    const stop = api.onMessage(threadWith, (m) => { if (m.from === 'them') sfx.receive(); add(m) })
    return () => { off = true; stop() }
  }, [threadWith])

  useLayoutEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' })
  }, [rows])

  const send = async () => {
    const text = draft.trim()
    if (!text || !threadWith) return
    setDraft('')
    sfx.send()
    try { add(await api.send(threadWith, 'me', text)) } catch (e) { console.warn('[align] not sent', e); sfx.deny(); setDraft(text) }
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
            You and {them.name} both aligned. {sign.glyph} {sign.name}{them.blurb ? ` · “${them.blurb}”` : ''}
          </div>
        </div>
        <AnimatePresence initial={false}>
          {rows.map((m, i) => <div key={m.id}><Bubble msg={toMsg(m, i)} /></div>)}
        </AnimatePresence>
        {!rows.length && (
          <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--label-3)', marginTop: 30 }}>Say the first thing. Make it specific.</div>
        )}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); void send() }} style={{
        position: 'absolute', left: 20, right: 20, top: 682, height: 52, borderRadius: 26, display: 'flex', alignItems: 'center',
        padding: '0 7px 0 20px', gap: 8, zIndex: 6, background: 'rgba(30, 18, 64, 0.85)', border: '1px solid rgba(179,166,196,0.26)',
      }}>
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

      <TabBar active="matches" go={go} />
    </div>
  )
}
