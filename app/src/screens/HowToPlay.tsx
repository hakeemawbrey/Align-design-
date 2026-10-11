import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { ScreenId, ScreenProps } from './types'
import Starfield from '../components/Starfield'
import { TalkCardBack } from '../components/talk/TalkCardFace'
import { HandIcon } from '../components/talk/CardsButton'
import ArchetypeCard from '../components/talk/ArchetypeCard'
import PullFace from '../components/talk/PullFace'
import { FREE_DRAWS, PEOPLE_PER_DRAW, PLUS_DRAWS } from '../data/draws'
import { PEEKS_PER_NIGHT, PEEKS_PER_WEEK_PLUS } from '../data/profiles'
import { TRADE_UNLOCK_DAYS } from '../data/matches'
import { EVENT_COST } from '../lib/session'
import { PRINT_RUN, fmt } from '../data/seasons'
import { binderNav } from '../lib/binderNav'
import { sfx } from '../lib/sfx'

const GOLD = '#f2d58a'
const FREE = FREE_DRAWS * PEOPLE_PER_DRAW
const PLUS = PLUS_DRAWS * PEOPLE_PER_DRAW

interface Chapter {
  id: string
  numeral: string
  title: string
  /** one line: the whole chapter in a sentence */
  gist: string
  rules: string[]
  art: React.ReactNode
  /** where "Try it" goes */
  to?: ScreenId | 'binder'
  cta?: string
}

const CHAPTERS: Chapter[] = [
  {
    id: 'deal', numeral: 'I', title: 'The nightly deal', gist: 'Every night you’re dealt a hand of people. No photos, just their sky.',
    rules: [
      `You get ${FREE} cards a night, in draws of ${PEOPLE_PER_DRAW}. Align+ gets ${PLUS}.`,
      'Swipe right to align. Swipe left to release.',
      `Hold a card to peek at the person behind it. ${PEEKS_PER_NIGHT} peeks a night, ${PEEKS_PER_WEEK_PLUS} a week with Align+.`,
      'A new deal lands at 11:11 every night.',
    ],
    art: <Fan />, to: 'deck', cta: 'Go to tonight’s deck',
  },
  {
    id: 'read', numeral: 'II', title: 'Reading a card', gist: 'Each card tells you how you two would actually work.',
    rules: [
      'Push: where you’ll rub. Pull: what draws you in. Align: where you just fit.',
      'The badge is the strength of the pull, from Slow burn to Rare pull.',
      'Their sun, moon and rising, a line about them, and their dealbreakers.',
      'Their face stays veiled until you both align.',
    ],
    art: <Words items={[['PUSH', '#e8628a'], ['PULL', '#7fd8b0'], ['ALIGN', '#f2c75c']]} />,
  },
  {
    id: 'match', numeral: 'III', title: 'When you both align', gist: 'The cards flip, you see each other, and the chat opens.',
    rules: [
      'A mutual align reveals both faces and opens a chat.',
      'Chats fade if nobody talks. Say something before the bar runs out.',
      'Every new match gives you a pack.',
    ],
    art: <Words items={[['✦ MUTUAL ALIGN ✦', GOLD]]} />, to: 'matches', cta: 'See your matches',
  },
  {
    id: 'hand', numeral: 'IV', title: 'Your hand', gist: 'The fanned-cards button holds what you can play. It’s on your deck and in every chat.',
    rules: [
      'On the deck: event cards. Mulligan, Second look, Comet, Lunar peek, Spotlight.',
      'In a chat: talk cards and place cards.',
      'An event you don’t want yet? Swipe it left to save it in your hand.',
    ],
    art: <div style={{ width: 64, height: 64, borderRadius: 32, display: 'grid', placeItems: 'center', background: 'rgba(52,35,95,0.9)', border: '1px solid rgba(248,237,255,0.35)' }}><HandIcon size={34} /></div>,
  },
  {
    id: 'talk', numeral: 'V', title: 'Talk cards', gist: 'Questions you play in chat to find out what matters: kids, money, how you fight.',
    rules: [
      'Play one to your match. You both answer.',
      'Neither answer shows until you’ve both answered, so nobody copies.',
      'A free card of the day, the same for everyone. More come in packs.',
    ],
    art: <TalkCardBack width={58} color="#b18cff" />,
  },
  {
    id: 'places', numeral: 'VI', title: 'Places and dates', gist: 'Play a place card in chat to plan the date.',
    rules: [
      'Pick a place and a night. If they say yes, it’s a date.',
      'At a partner place (✦), check in together for a card you can only get there.',
    ],
    art: <PullFace pull={{ kind: 'place', id: 'menil' }} width={58} />,
  },
  {
    id: 'energy', numeral: 'VII', title: 'Energy', gist: 'Energy is earned by actually dating. It powers your event cards.',
    rules: [
      'Send a message +2. Answer a talk card +5. Say yes to a date +5. Check in +15.',
      `Playing an event card costs ${EVENT_COST}. Energy cards in packs top you up.`,
      'Your energy is the green bar in the sky pill on your deck.',
    ],
    art: <PullFace pull={{ kind: 'energy', amount: 20 }} width={58} />,
  },
  {
    id: 'packs', numeral: 'VIII', title: 'Packs', gist: 'Twelve cards of every kind. Tear it open yourself.',
    rules: [
      'Every pack mixes sign cards, talk cards, events, places and energy. Never people.',
      'One Align pack a day free, three with Align+. A pack for every new match.',
      'Swipe across the top to tear it. The last card is always the best one.',
    ],
    art: <PackArt />, to: 'binder', cta: 'Open a pack',
  },
  {
    id: 'signs', numeral: 'IX', title: 'Sign cards', gist: '48 to collect: every sign has a Sun, Moon, Rising and Venus card.',
    rules: [
      'Each comes in Myths, Gilded (gold foil) or Mythic (holo).',
      `Every season prints a numbered run: ${fmt(PRINT_RUN.common)} Myths, ${fmt(PRINT_RUN.rare)} Gilded, ${fmt(PRINT_RUN.legendary)} Mythic. When it’s gone, it’s gone.`,
      'Tap one in your binder to read its myth, a famous one and a perfect first date.',
    ],
    art: <ArchetypeCard sign="libra" face="venus" variant="gilded" width={58} edition={false} />,
  },
  {
    id: 'binder', numeral: 'X', title: 'Your binder and trading', gist: 'Everything you collect lives in one binder.',
    rules: [
      `After ${TRADE_UNLOCK_DAYS} days aligned, you and a match can trade copies of your cards.`,
      'Trade one of every element (fire, earth, air, water) to complete the Element set.',
      'Sign cards trade any time, in the app or in person.',
    ],
    art: <Words items={[['FIRE', '#ff8a4c'], ['EARTH', '#9fd36a'], ['AIR', '#9fd8ff'], ['WATER', '#6a8cff']]} />, to: 'binder', cta: 'Open your binder',
  },
  {
    id: 'plus', numeral: 'XI', title: 'Align+', gist: 'More cards, more peeks, and real packs in the mail.',
    rules: [
      `${PLUS} cards a night, ${PEEKS_PER_WEEK_PLUS} peeks a week, 3 packs a day.`,
      'A starter box when you join, then 3 real packs shipped every season. Scan them into your binder.',
      'Block any sign. Private Align events.',
    ],
    art: <Words items={[['ALIGN+ ✦', GOLD]]} />, to: 'paywall', cta: 'See Align+',
  },
]

/** The rulebook: how to play Align, one chapter at a time. */
export default function HowToPlay({ go }: ScreenProps) {
  const [open, setOpen] = useState<string | null>('deal')
  const refs = useRef<Record<string, HTMLDivElement | null>>({})
  const jump = (id: string) => {
    sfx.tap(); setOpen(id)
    window.setTimeout(() => refs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
  }
  const tryIt = (c: Chapter) => {
    sfx.tap()
    if (c.to === 'binder') binderNav.open(go, 'howto')
    else if (c.to) go(c.to)
  }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora="#3a2390" warm="#4a2470" count={60} seed={17} />
      <button aria-label="Back" onClick={() => { sfx.tap(); go('you') }}
        style={{ position: 'absolute', left: 16, top: 56, width: 40, height: 40, display: 'grid', placeItems: 'center', color: 'var(--label-1)', zIndex: 2 }}>
        <svg width="11" height="18" viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 2 2 10l8 8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      <div style={{ position: 'absolute', inset: 0, top: 96, overflowY: 'auto', padding: '8px 24px 120px', scrollbarWidth: 'none' }}>
        <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--label-2)' }}>THE RULEBOOK</div>
        <div className="h-display" style={{ fontSize: 32, marginTop: 8, lineHeight: 1.1 }}>How to play Align</div>
        <div style={{ fontSize: 14, color: 'var(--label-2)', marginTop: 8, lineHeight: 1.4 }}>
          Align is a dating app played like a card game. Meet people by their sky, talk with cards, and collect the deck as you go.
        </div>

        {/* chapter index */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
          {CHAPTERS.map((c) => (
            <button key={c.id} onClick={() => jump(c.id)} style={{
              height: 28, padding: '0 10px', borderRadius: 14, fontSize: 12,
              color: open === c.id ? 'var(--chrome-ink)' : 'var(--label-1)',
              background: open === c.id ? 'var(--chrome)' : 'rgba(48,32,92,0.6)', border: '1px solid rgba(179,166,196,0.25)',
            }}>
              <span className="serif" style={{ marginRight: 5, opacity: 0.7 }}>{c.numeral}</span>{c.title}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
          {CHAPTERS.map((c) => {
            const isOpen = open === c.id
            return (
              <div key={c.id} ref={(el) => { refs.current[c.id] = el }} style={{
                borderRadius: 18, overflow: 'hidden', scrollMarginTop: 12,
                background: isOpen ? 'linear-gradient(170deg, rgba(64,40,124,0.92), rgba(30,18,64,0.92))' : 'rgba(36,22,74,0.75)',
                border: `1px solid ${isOpen ? 'rgba(242,213,138,0.55)' : 'rgba(179,166,196,0.18)'}`,
              }}>
                <button onClick={() => { sfx.tap(); setOpen(isOpen ? null : c.id) }}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', textAlign: 'left' }}>
                  <span className="serif" style={{ width: 34, fontSize: 18, color: GOLD, textAlign: 'center' }}>{c.numeral}</span>
                  <span style={{ flex: 1 }}>
                    <span className="serif italic" style={{ display: 'block', fontSize: 19, color: 'var(--label-1)' }}>{c.title}</span>
                    <span style={{ display: 'block', fontSize: 12.5, color: 'var(--label-2)', marginTop: 2, lineHeight: 1.35 }}>{c.gist}</span>
                  </span>
                  <motion.span animate={{ rotate: isOpen ? 90 : 0 }} style={{ color: 'var(--label-3)', fontSize: 16 }}>›</motion.span>
                </button>
                {isOpen && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
                    style={{ padding: '0 16px 16px', display: 'flex', gap: 14 }}>
                    <div style={{ width: 70, display: 'flex', justifyContent: 'center', paddingTop: 4 }}>{c.art}</div>
                    <div style={{ flex: 1 }}>
                      {c.rules.map((r, i) => (
                        <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13.5, lineHeight: 1.4, color: 'var(--label-1)', marginTop: i ? 8 : 0 }}>
                          <span style={{ color: GOLD }}>✦</span><span>{r}</span>
                        </div>
                      ))}
                      {c.cta && (
                        <button className="mono" onClick={() => tryIt(c)}
                          style={{ marginTop: 14, height: 30, padding: '0 12px', borderRadius: 15, fontSize: 9.5, letterSpacing: '0.14em', fontWeight: 700, color: 'var(--chrome-ink)', background: 'var(--chrome)' }}>
                          {c.cta.toUpperCase()} ›
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
        <div className="serif italic" style={{ textAlign: 'center', fontSize: 15, color: 'var(--label-3)', marginTop: 26 }}>That’s the whole game. The stars do the rest.</div>
      </div>
    </div>
  )
}

function Fan() {
  return (
    <div style={{ position: 'relative', width: 70, height: 70 }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: 'absolute', left: 8 + i * 12, top: 2, transform: `rotate(${(i - 1) * 12}deg)`, transformOrigin: '50% 100%' }}>
          <TalkCardBack width={34} color={['#e8628a', '#f2c75c', '#7fd8b0'][i]} />
        </div>
      ))}
    </div>
  )
}

function PackArt() {
  return (
    <div style={{
      width: 50, height: 76, borderRadius: 6, background: 'var(--chrome)', boxShadow: '0 0 14px rgba(248,237,255,0.4)',
      display: 'grid', placeItems: 'center', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 7, background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.6) 0 2px, rgba(120,90,170,0.35) 2px 4px)' }} />
      <span style={{ fontSize: 20, color: 'var(--chrome-ink)' }}>✦</span>
    </div>
  )
}

function Words({ items }: { items: [string, string][] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center' }}>
      {items.map(([t, c]) => (
        <span key={t} className="mono" style={{ fontSize: 8.5, letterSpacing: '0.14em', fontWeight: 700, color: c, whiteSpace: 'nowrap' }}>{t}</span>
      ))}
    </div>
  )
}
