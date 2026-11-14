import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AlignMark from './intro/AlignMark'
import PixelAlign, { ALIGN_AT } from './PixelAlign'
import { CardOrb, foil } from './CardFrame'
import { STARS_EVENT, betaFlow, clock, inFlight, pendingOf, useBetaFlows, type BetaFlow, type BetaStage, type Pending } from '../lib/betaFlow'
import { profileById, type Profile } from '../data/profiles'
import { SIGNS } from '../data/signs'
import { session } from '../lib/session'
import { api as backend } from '../api'
import { sfx } from '../lib/sfx'
import type { ScreenId } from '../screens/types'

/** screens the notification may take over (never the chat, the card, the flip or onboarding) */
const OVER: ScreenId[] = ['deck', 'matches', 'you', 'calendar', 'chart', 'spent']

/** which notifications have been put off with "Later" this visit; the deck's star still holds them */
const later = new Set<string>()

/** the Align mark's size and centre on the 390-wide phone; its seven dots sit 10.6/88 of its size apart */
const MARK = 236
const CX = 195
const CY = 258
const GAP = (10.6 / 88) * MARK

/** sample matches for the notification screen: two cards waiting, one ready to reveal, two counting down */
const DEMO_FLOWS: { id: string; stage: BetaStage; inMs?: number }[] = [
  { id: 'j27', stage: 'card' },
  { id: 's26', stage: 'card' },
  { id: 'm27', stage: 'chat', inMs: -1000 },
  { id: 'a29', stage: 'chat', inMs: 21 * 60_000 + 14_000 },
  { id: 'b25', stage: 'chat', inMs: 8 * 60_000 + 40_000 },
]

interface Item { flow: BetaFlow; them: Profile; pend: Pending }
const an = (word: string) => (/^[aeiou]/i.test(word) ? 'an' : 'a')

/** "a Libra", in the sign's own colour with its glyph */
function SignName({ them, article = true }: { them: Profile; article?: boolean }) {
  const s = SIGNS[them.sign]
  return <>{article ? `${an(s.name)} ` : ''}<span style={{ color: s.light, whiteSpace: 'nowrap' }}>{s.name} {s.glyph}</span></>
}

/**
 * The beta's in-app notifications.
 *
 * The moment, played big when the stars align and again when a 33:33 is up:
 * the screen goes dark, pixel stars gather, seven fly into line and burst,
 * the Align mark draws itself around them, and the words say which sign the
 * stars have aligned you with. If others are waiting too, they're listed
 * under it.
 *
 * The overview, opened from the deck's star: everyone the stars have aligned
 * you with, by sign, and what each is waiting on.
 */
export default function BetaFlowPopup({ go, screen }: { go: (id: ScreenId) => void; screen: ScreenId }) {
  const flows = useBetaFlows()
  const [now, setNow] = useState(() => Date.now())
  const [, bump] = useState(0)
  const [overview, setOverview] = useState(false)
  const flying = inFlight(flows)
  const counting = flying.some((f) => f.stage === 'chat')
  useEffect(() => {
    if (!counting) return
    const t = window.setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [counting])
  useEffect(() => {
    const open = () => {
      // demo: nothing waiting yet, so fill the screen with matches at every stage
      if (inFlight(betaFlow.all()).length === 0) {
        betaFlow.seed(DEMO_FLOWS)
        DEMO_FLOWS.forEach((d) => { void backend.swipe(d.id, 'align'); later.add(`reveal:${d.id}`); later.add(`card:${d.id}`) })
      }
      setNow(Date.now()); setOverview(true)
    }
    window.addEventListener(STARS_EVENT, open)
    return () => window.removeEventListener(STARS_EVENT, open)
  }, [])
  const allowed = OVER.includes(screen)
  useEffect(() => { if (!allowed) setOverview(false) }, [allowed])

  const items: Item[] = flying.flatMap((flow) => {
    const them = profileById(flow.id), pend = pendingOf(flow, now)
    return them && pend ? [{ flow, them, pend }] : []
  })
  // the moment plays once for a fresh align, and once when a clock runs out
  const keyOf = (i: Item) => `${i.pend}:${i.flow.id}`
  const fresh = items.filter((i) => (i.pend === 'reveal' || i.flow.stage === 'aligned') && !later.has(keyOf(i)))
  const lead = allowed && !overview ? fresh.find((i) => i.pend === 'reveal') ?? fresh[0] : undefined

  const open = (i: Item) => {
    sfx.tap()
    setOverview(false)
    session.patch({ matchWith: i.flow.id })
    if (i.pend === 'reveal') { betaFlow.reveal(i.flow.id); go('match') }
    else if (i.pend === 'card') go(`x/align-card/${i.flow.id}` as ScreenId)
    else if (i.flow.id === 'j27') go('chat')
    else { session.patch({ threadWith: i.flow.id }); go('thread') }
  }
  const dismiss = () => { sfx.tap(); fresh.forEach((i) => later.add(keyOf(i))); bump((n) => n + 1) }

  return (
    <AnimatePresence>
      {lead && (
        <Moment key={keyOf(lead)} item={lead} others={items.filter((i) => i !== lead && i.pend !== 'chat')} more={items.length - 1}
          onOpen={open} onAll={() => { dismiss(); setOverview(true) }} onLater={dismiss} />
      )}
      {allowed && overview && <Overview key="overview" items={items} now={now} onOpen={open} onClose={() => { sfx.tap(); setOverview(false) }} onSky={() => { sfx.tap(); setOverview(false); go('sky') }} />}
    </AnimatePresence>
  )
}

const STATUS: Record<Pending, string> = { card: 'A card is waiting', chat: 'Chat open', reveal: 'Time to flip your cards' }
const ACTION: Record<Pending, string> = { card: 'Draw', chat: 'Chat', reveal: 'Flip' }

/** one match in a list: the sign first, the name second, then what it's waiting on */
function Row({ item, now, onOpen, compact }: { item: Item; now: number; onOpen: () => void; compact?: boolean }) {
  const s = SIGNS[item.them.sign]
  const hot = item.pend !== 'chat'
  return (
    <button onClick={onOpen} style={{ width: '100%', borderRadius: 18, padding: compact ? 2 : 3, background: foil(s.color), textAlign: 'left', display: 'block' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 12, borderRadius: compact ? 16 : 15, padding: compact ? '7px 12px 7px 9px' : '11px 14px 11px 11px', background: 'linear-gradient(180deg, #1b112f, #120b22)' }}>
        <CardOrb tint={s.color} size={compact ? 32 : 42}>{s.glyph}</CardOrb>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span className="serif italic" style={{ display: 'block', fontSize: compact ? 17 : 21, lineHeight: 1.15, color: 'var(--label-1)' }}>
            {s.name} <span style={{ fontSize: compact ? 13 : 15, color: 'var(--label-2)' }}>· {item.them.name}, {item.them.age}</span>
          </span>
          <span style={{ display: 'block', fontSize: compact ? 12 : 13.5, color: hot ? 'var(--align)' : 'var(--label-2)', marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>
            {item.pend === 'chat' && item.flow.revealAt ? `Chat open · ${clock(item.flow.revealAt - now)} until the reveal` : STATUS[item.pend]}
          </span>
        </span>
        <span className="mono" style={{ fontSize: 9.5, letterSpacing: '0.16em', fontWeight: 700, padding: '7px 10px', borderRadius: 12, whiteSpace: 'nowrap',
          color: hot ? 'var(--chrome-ink)' : 'var(--label-1)', background: hot ? 'var(--chrome)' : 'rgba(179,166,196,0.16)' }}>
          {ACTION[item.pend].toUpperCase()} ›
        </span>
      </span>
    </button>
  )
}

/** the thick foil frame both notifications sit in, like a card */
function Frame({ bright }: { bright: boolean }) {
  return (
    <motion.div aria-hidden initial={{ opacity: 0 }} animate={{ opacity: bright ? 1 : 0.35 }} transition={{ duration: 0.8 }}
      style={{ position: 'absolute', inset: 8, borderRadius: 40, padding: 3.5, pointerEvents: 'none', background: foil('#f2c75c'),
        WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)', WebkitMaskComposite: 'xor', mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
        boxShadow: '0 0 30px rgba(242,199,92,0.35)' }} />
  )
}

function Moment({ item, others, more, onOpen, onAll, onLater }: { item: Item; others: Item[]; more: number; onOpen: (i: Item) => void; onAll: () => void; onLater: () => void }) {
  const kind = item.pend === 'reveal' ? 'reveal' : 'aligned'
  const { name } = item.them
  // a beat after the swipe before the sky takes over, so the two don't collide
  const lead = kind === 'aligned' ? 0.7 : 0.1
  const [on, setOn] = useState(false)
  const [burst, setBurst] = useState(false)
  const [words, setWords] = useState(false)
  useEffect(() => {
    const ts = [
      window.setTimeout(() => { setOn(true); sfx.reveal() }, lead * 1000),
      window.setTimeout(() => setWords(true), (lead + ALIGN_AT.settle) * 1000),
    ]
    return () => ts.forEach(clearTimeout)
  }, [lead])

  const rise = (delay: number) => ({
    initial: false as const,
    animate: { opacity: words ? 1 : 0, y: words ? 0 : 18 },
    transition: { delay: words ? delay : 0, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const },
  })
  const shown = others.slice(0, 2)

  return (
    <motion.div role="dialog" aria-label={kind === 'aligned' ? 'The stars have aligned' : 'It’s time'}
      initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: lead, duration: 0.5 } }} exit={{ opacity: 0, transition: { duration: 0.25 } }}
      style={{ position: 'absolute', inset: 0, zIndex: 90, overflow: 'hidden', background: 'radial-gradient(90% 55% at 50% 30%, #2a1556 0%, #0d0620 55%, #05020f 100%)' }}>
      {/* a warm light behind the mark, swelling when the seven line up */}
      <motion.div animate={{ opacity: burst ? 0.95 : 0.25, scale: burst ? 1.25 : 0.8 }} transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ position: 'absolute', left: CX - 220, top: CY - 220, width: 440, height: 440, borderRadius: '50%', pointerEvents: 'none', filter: 'blur(26px)',
          background: `radial-gradient(closest-side, rgba(242,199,92,0.5), color-mix(in srgb, ${SIGNS[item.them.sign].color} 40%, transparent) 55%, transparent)` }} />

      {on && <PixelAlign cx={CX} cy={CY} gap={GAP} quietBelow={410} onBurst={() => { setBurst(true); sfx.match() }} />}

      {/* the Align mark draws itself around the seven once they're in line */}
      {on && (
        <motion.div animate={{ scale: burst ? [1, 1.08, 1] : 1 }} transition={{ duration: 0.7 }}
          style={{ position: 'absolute', left: CX - MARK / 2, top: CY - MARK / 2, width: MARK, height: MARK, pointerEvents: 'none' }}>
          <AlignMark size={MARK} animate delay={ALIGN_AT.aligned - 0.5} dots={false} strokeOpacity={0.9} strokeWidth={0.7} />
        </motion.div>
      )}

      {/* the flash as they line up */}
      <AnimatePresence>
        {burst && (
          <motion.div key="flash" initial={{ opacity: 0.85 }} animate={{ opacity: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(circle at ${CX}px ${CY}px, #fff 0%, rgba(255,244,207,0.7) 22%, transparent 62%)` }} />
        )}
      </AnimatePresence>

      {/* while they gather */}
      <motion.div className="mono" animate={{ opacity: words ? 0 : on ? [0.4, 1, 0.4] : 0 }} transition={{ duration: 1.4, repeat: words ? 0 : Infinity }}
        style={{ position: 'absolute', left: 0, right: 0, top: 500, textAlign: 'center', fontSize: 10, letterSpacing: '0.3em', color: 'var(--label-2)' }}>
        {kind === 'aligned' ? 'SOMETHING IS LINING UP…' : 'THE CLOCK HAS RUN OUT…'}
      </motion.div>

      {/* the words: the sign first */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: shown.length ? 414 : 424, textAlign: 'center', padding: '0 24px', pointerEvents: words ? 'auto' : 'none' }}>
        <motion.div {...rise(0)} className="mono" style={{ fontSize: 11, letterSpacing: '0.34em', fontWeight: 700, color: 'var(--align)' }}>
          ✦ {kind === 'aligned' ? 'MUTUAL ALIGN' : '33:33 IS UP'} ✦
        </motion.div>
        <motion.h1 {...rise(0.08)} className="h-display" style={{ margin: shown.length ? '9px 0 0' : '12px 0 0', fontSize: shown.length ? 34 : 39, lineHeight: 1.06, textShadow: '0 0 30px rgba(242,199,92,0.45)' }}>
          {kind === 'aligned' ? <>The stars have aligned<br />with <SignName them={item.them} />.</> : <>The veil lifts<br />on your <SignName them={item.them} article={false} />.</>}
        </motion.h1>
        <motion.div {...rise(0.2)} className="serif italic" style={{ fontSize: shown.length ? 18 : 20, lineHeight: 1.25, color: 'var(--label-1)', marginTop: shown.length ? 8 : 12 }}>
          {kind === 'aligned' ? `${name}, ${item.them.age}. You both said yes.` : `It’s time to see ${name}.`}
        </motion.div>
        {shown.length === 0 && (
          <motion.p {...rise(0.28)} style={{ margin: '8px auto 0', maxWidth: 300, fontSize: 14.5, lineHeight: 1.45, color: 'var(--label-2)' }}>
            {kind === 'aligned' ? 'No faces yet. The stars deal you both one card first.' : 'Flip your cards now, or keep chatting and reveal later.'}
          </motion.p>
        )}
      </div>

      {/* who else is waiting on your star */}
      {shown.length > 0 && (
        <motion.div {...rise(0.3)} style={{ position: 'absolute', left: 30, right: 30, top: 552, pointerEvents: words ? 'auto' : 'none' }}>
          <div className="mono" style={{ fontSize: 9, letterSpacing: '0.24em', color: 'var(--label-2)', textAlign: 'center', marginBottom: 7 }}>ALSO ON YOUR STAR</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {shown.slice(0, others.length > 2 ? 1 : 2).map((o) => <Row key={o.flow.id} item={o} now={Date.now()} onOpen={() => onOpen(o)} compact />)}
            {others.length > 2 && (
              <button onClick={onAll} className="mono" style={{ height: 40, borderRadius: 16, fontSize: 10, letterSpacing: '0.2em', color: 'var(--label-1)', background: 'rgba(179,166,196,0.14)', border: '1px solid rgba(179,166,196,0.25)' }}>
                + {others.length - 1} MORE SIGNS WAITING ›
              </button>
            )}
          </div>
        </motion.div>
      )}

      <motion.div {...rise(0.4)} style={{ position: 'absolute', left: 38, right: 38, top: 700, pointerEvents: words ? 'auto' : 'none' }}>
        <button className="chrome-cta" onClick={() => onOpen(item)} style={{ width: '100%' }}>
          {kind === 'aligned' ? 'Draw our card' : 'Flip our cards'} <span className="spark">✦</span>
        </button>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 4 }}>
          <button onClick={onLater} style={{ height: 40, padding: '0 12px', fontSize: 14, color: 'var(--label-2)' }}>{kind === 'reveal' ? 'Later · keep chatting' : 'Later · it stays on your star'}</button>
          {more > 0 && shown.length === 0 && <button onClick={onAll} style={{ height: 40, padding: '0 12px', fontSize: 14, color: 'var(--label-1)' }}>See all {more + 1} ›</button>}
        </div>
      </motion.div>

      <Frame bright={burst} />
    </motion.div>
  )
}

/** Everyone the stars have aligned you with, by sign. Opened from the deck's star. */
/** a plain reminder row */
function Note({ glyph, title, sub, action, onClick, last }: { glyph: string; title: string; sub: string; action?: string; onClick?: () => void; last?: boolean }) {
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag onClick={onClick} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', textAlign: 'left', borderBottom: last ? 'none' : '1px solid rgba(179,166,196,0.12)' }}>
      <span style={{ width: 30, height: 30, borderRadius: 15, flexShrink: 0, display: 'grid', placeItems: 'center', fontSize: 14, color: 'var(--align)', background: 'rgba(242,199,92,0.12)', border: '1px solid rgba(242,199,92,0.35)' }}>{glyph}{'\uFE0E'}</span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: 14.5, color: 'var(--label-1)' }}>{title}</span>
        <span style={{ display: 'block', fontSize: 12, color: 'var(--label-2)', marginTop: 1 }}>{sub}</span>
      </span>
      {action && <span className="mono" style={{ fontSize: 9.5, letterSpacing: '0.16em', color: 'var(--align)' }}>{action.toUpperCase()} ›</span>}
    </Tag>
  )
}

function Overview({ items, now, onOpen, onClose, onSky }: { items: Item[]; now: number; onOpen: (i: Item) => void; onClose: () => void; onSky: () => void }) {
  const waiting = items.filter((i) => i.pend !== 'chat')
  const talking = items.filter((i) => i.pend === 'chat')
  const signs = [...new Set(items.map((i) => i.them.sign))]
  const section = (label: string, list: Item[]) => list.length > 0 && (
    <div style={{ marginTop: 18 }}>
      <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.24em', fontWeight: 700, color: 'var(--label-2)', marginBottom: 8 }}>{label} · {list.length}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {list.map((i) => <Row key={i.flow.id} item={i} now={now} onOpen={() => onOpen(i)} />)}
      </div>
    </div>
  )
  return (
    <motion.div role="dialog" aria-label="Your star" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
      style={{ position: 'absolute', inset: 0, zIndex: 90, overflow: 'hidden', background: 'radial-gradient(90% 45% at 50% 16%, #2a1556 0%, #0d0620 55%, #05020f 100%)' }}>
      <div style={{ position: 'absolute', left: CX - 120, top: 8, width: 240, height: 240, borderRadius: '50%', pointerEvents: 'none', filter: 'blur(24px)', background: 'radial-gradient(closest-side, rgba(242,199,92,0.4), rgba(180,92,255,0.22) 55%, transparent)' }} />
      <div style={{ position: 'absolute', left: CX - 52, top: 76, width: 104, height: 104, pointerEvents: 'none' }}>
        <AlignMark size={104} strokeOpacity={0.9} strokeWidth={0.8} />
      </div>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 206, bottom: 104, overflowY: 'auto', scrollbarWidth: 'none', padding: '0 28px 16px' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.32em', fontWeight: 700, color: 'var(--align)' }}>✦ YOUR STAR ✦</div>
          <h1 className="h-display" style={{ margin: '10px 0 0', fontSize: 31, lineHeight: 1.1 }}>
            {items.length === 1
              ? <>The stars have aligned<br />with <SignName them={items[0].them} />.</>
              : <>The stars have aligned<br />with {signs.length === 1 ? `${items.length} ${SIGNS[signs[0]].name}s` : `${signs.length} signs`}.</>}
          </h1>
          {items.length > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
              {items.map((i) => <CardOrb key={i.flow.id} tint={SIGNS[i.them.sign].color} size={30}>{SIGNS[i.them.sign].glyph}</CardOrb>)}
            </div>
          )}
          <div style={{ fontSize: 14, lineHeight: 1.4, color: 'var(--label-2)', marginTop: 10 }}>
            {waiting.length ? `${waiting.length} waiting on you. ` : ''}Photos stay veiled until each 33:33 is up.
          </div>
        </div>
        {section('WAITING ON YOU', waiting)}
        {section('COUNTING DOWN', talking)}
        {/* the day's other reminders */}
        <div style={{ marginTop: 18 }}>
          <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.24em', fontWeight: 700, color: 'var(--label-2)', marginBottom: 8 }}>TODAY</div>
          <div style={{ borderRadius: 18, overflow: 'hidden', background: 'rgba(30,18,64,0.72)', border: '1px solid rgba(179,166,196,0.18)' }}>
            <Note glyph="☾" title="Your horoscope is ready" sub="Three cards from today’s sky" action="Read" onClick={onSky} />
            <Note glyph="✦" title="Three new cards in every chat" sub="Today’s three reset at 11:11 PM" />
            <Note glyph="◎" title="Tonight’s deck resets at 11:11" sub="Fifteen new people, dealt by the stars" last />
          </div>
        </div>
      </motion.div>
      <div style={{ position: 'absolute', left: 38, right: 38, bottom: 34 }}>
        <button className="chrome-cta" onClick={onClose} style={{ width: '100%' }}>Back to the deck</button>
      </div>
      <Frame bright />
    </motion.div>
  )
}
