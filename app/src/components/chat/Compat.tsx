import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FEEL_TAG, chartRows, fitWith } from '../../lib/compat'
import { ME, type Profile } from '../../data/profiles'
import { SIGNS } from '../../data/signs'
import { usToday } from '../../data/skyReading'
import { sfx } from '../../lib/sfx'
import CardFrame, { CardOrb } from '../CardFrame'
import type { ChartRow } from '../../lib/compat'
import { ChartWheel, PairArt } from './GuideArt'
import { MY_READING_TITLE, READINGS } from './readings'

/** each area's card colour follows its planet (sun gold, moon blue, rising violet), not how it reads */
const AREA_TINT = { daily: '#f2c75c', feelings: '#8fb4ff', first: '#cdb0ff', understood: '#f0a8d8' } as const

/**
 * The chat's top-right widget: how the two of you fit. Words only; there is
 * no score, percentage or rating anywhere in it, on purpose.
 */
export function CompatBadge({ them, onClick }: { them: Profile; onClick: () => void }) {
  const mine = SIGNS[ME.sign], theirs = SIGNS[them.sign]
  return (
    <motion.button onClick={() => { sfx.tap(); onClick() }} whileTap={{ scale: 0.92 }} aria-label={`How you and ${them.name} fit`}
      style={{ position: 'absolute', right: 12, top: 10, width: 44, height: 44, display: 'grid', placeItems: 'center' }}>
      {/* two orbs, overlapping: your sign and theirs */}
      <span style={{ position: 'relative', width: 34, height: 24 }}>
        <span style={{ position: 'absolute', left: 0, top: 1, width: 22, height: 22, borderRadius: 11, background: `radial-gradient(circle at 35% 30%, ${mine.light}, ${mine.color} 70%)`, boxShadow: `0 0 8px ${mine.color}aa`, opacity: 0.95 }} />
        <span style={{ position: 'absolute', right: 0, top: 1, width: 22, height: 22, borderRadius: 11, background: `radial-gradient(circle at 35% 30%, ${theirs.light}, ${theirs.color} 70%)`, boxShadow: `0 0 8px ${theirs.color}aa`, opacity: 0.9, mixBlendMode: 'screen' }} />
      </span>
    </motion.button>
  )
}

/** the four parts of the guide, in the order both widgets show them */
const TABS = [
  { id: 'pull', label: 'Spark', eyebrow: 'What draws you in', color: '#8fd8f6', pill: 'rgba(120, 150, 230, 0.38)' },
  { id: 'push', label: 'Clash', eyebrow: 'Where you push back', color: '#f59cc4', pill: 'rgba(232, 98, 160, 0.38)' },
  { id: 'align', label: 'Align', eyebrow: 'Where it holds', color: '#f2c75c', pill: 'rgba(242, 199, 92, 0.42)' },
  { id: 'relationship', label: 'Relationship', eyebrow: 'The long game', color: '#dcaaf2', pill: 'rgba(200, 150, 240, 0.38)' },
  { id: 'chart', label: 'Chart', eyebrow: 'Your charts, side by side', color: '#c9bedb', pill: 'rgba(201, 190, 219, 0.3)' },
] as const
type TabId = Exclude<(typeof TABS)[number]['id'], 'chart'>

interface Part { headline: string; body?: string; tryLine?: string; card?: string }
interface Guide { title: string; line: string; parts: Record<TabId, Part> }

/** what each element tends to bring: a headline (when their card has no line), a fuller read and something to try */
const BY_ELEMENT = {
  fire: {
    pull: 'They bring the heat and the plans.', push: 'They move fast. Say so if you need a minute.', align: 'You both like someone who shows up.',
    more: {
      pull: 'Fire signs say what they want and go after it, so you rarely have to guess where you stand. Dates feel like events, and their energy can pull you out of a rut.',
      push: 'Their pace can run ahead of yours, and a flash of temper passes for them faster than it does for you. They can read a pause as a no.',
      align: 'Under the speed, fire signs are loyal and direct. If you both keep your word, trust builds quickly.',
    },
    tryLine: { pull: 'Say yes to their plan once before you tweak it.', push: 'Tell them “give me a day” instead of going quiet.', align: 'Name one thing you’re both looking forward to.' },
  },
  earth: {
    pull: 'Steady, warm, and they do what they say.', push: 'Neither of you likes to budge first.', align: 'You both build slowly and mean it.',
    more: {
      pull: 'Earth signs show interest by showing up: on time, with the thing you mentioned once. It’s quiet, and it’s hard to fake.',
      push: 'They can dig in and go silent when something’s wrong, and they don’t love last-minute changes. A standoff can last longer than the problem.',
      align: 'Earth signs want something that lasts and are happy to take the slow road. Shared routines become the glue.',
    },
    tryLine: { pull: 'Notice one thing they did for you and say it.', push: 'Be the first to say “ok, what do you need?”', align: 'Make one small plan and keep it.' },
  },
  air: {
    pull: 'Easy to talk to and full of ideas.', push: 'They think out loud when you may want an answer.', align: 'You both pick a good conversation over a big gesture.',
    more: {
      pull: 'Air signs flirt with their mind. The conversation moves fast, they ask good questions, and you leave knowing something new.',
      push: 'They weigh every side and can sound undecided, or go light when you want depth. It’s thinking, not avoiding.',
      align: 'Air signs need room and a real friend in a partner. If you can talk about anything, most things get solved.',
    },
    tryLine: { pull: 'Ask what they changed their mind about lately.', push: 'Ask for a decision by a day, not right now.', align: 'Have one long talk with phones away.' },
  },
  water: {
    pull: 'They notice how you feel before you say it.', push: 'Moods run deep. Ask, don’t guess.', align: 'You both want it to be real.',
    more: {
      pull: 'Water signs read the room and remember how things felt. Being around them, you feel understood without having to explain.',
      push: 'Feelings come in waves, and they may hint instead of saying it straight. A throwaway comment can land harder than you meant.',
      align: 'Water signs want depth and honesty over a good show. When it feels safe, they give a lot.',
    },
    tryLine: { pull: 'Tell them one thing you felt today, unprompted.', push: 'Ask “did that land wrong?” when the mood shifts.', align: 'Share something you don’t usually lead with.' },
  },
} as const

/**
 * Everything the app knows about the two of you, as one guide. With Juniper
 * it's the long written reading plus what her card says; with anyone else,
 * their card's three lines. The relationship part is always the area-by-area
 * fit worked out from both charts.
 */
function guideFor(them: Profile, summary: string): Guide {
  const says = (k: 'pull' | 'push' | 'align') => them.reading?.find((x) => x.kind === k)?.text
  if (them.id === 'j27') {
    const r = (id: TabId) => READINGS.find((x) => x.id === id)!
    const part = (id: TabId): Part => ({ headline: r(id).headline, body: r(id).body, tryLine: r(id).tryLine, card: id === 'relationship' ? undefined : says(id) })
    return { title: MY_READING_TITLE.title, line: MY_READING_TITLE.line, parts: { pull: part('pull'), push: part('push'), align: part('align'), relationship: part('relationship') } }
  }
  // a match whose card has no written lines gets their element's, so no part is ever empty
  const el = BY_ELEMENT[SIGNS[them.sign].element]
  const part = (k: 'pull' | 'push' | 'align'): Part => ({ headline: says(k) ?? el[k], body: el.more[k], tryLine: el.tryLine[k] })
  return {
    title: summary,
    line: says('align') ?? el.align,
    parts: {
      pull: part('pull'),
      push: part('push'),
      align: part('align'),
      relationship: { headline: summary, body: 'Here is how your two charts meet, area by area.' },
    },
  }
}

/** the four parts, as a row of tabs */
function GuideTabs({ tab, onTab }: { tab: number; onTab: (i: number) => void }) {
  return (
    <div role="tablist" style={{ display: 'flex', padding: 3, borderRadius: 999, background: 'rgba(20, 10, 46, 0.55)', border: '1px solid rgba(179,166,196,0.18)' }}>
      {TABS.map((x, i) => (
        <button key={x.id} role="tab" aria-selected={i === tab} onClick={() => { if (i !== tab) { sfx.tap(); onTab(i) } }}
          style={{ position: 'relative', flex: x.id === 'relationship' ? 1.75 : 1, height: 34, display: 'grid', placeItems: 'center' }}>
          {i === tab && <motion.div layoutId="guide-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} style={{ position: 'absolute', inset: 0, borderRadius: 999, background: x.pill }} />}
          <span className="mono" style={{ position: 'relative', fontSize: 8.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: i === tab ? x.color : 'var(--label-3)', fontWeight: 700 }}>{x.label}</span>
        </button>
      ))}
    </div>
  )
}

/**
 * The guide in the chat: one quiet row in the card frame. Your two signs, the
 * line that sums you up, and an arrow. Everything else is in the sheet.
 */
export function AlignGuideCard({ them, onOpen }: { them: Profile; onOpen: (tab: number) => void }) {
  const fit = useMemo(() => fitWith(them), [them])
  const guide = useMemo(() => guideFor(them, fit.summary), [them, fit])
  const mine = SIGNS[ME.sign], theirs = SIGNS[them.sign]
  return (
    <motion.button onClick={() => { sfx.tap(); onOpen(0) }} aria-label={`Alignment guide: you and ${them.name}`}
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }} whileTap={{ scale: 0.98 }}
      style={{ display: 'block', width: '100%', margin: '4px 0 16px', borderRadius: 18, padding: 3, textAlign: 'left',
        background: `linear-gradient(120deg, ${mine.color}, ${mine.light} 30%, ${theirs.light} 70%, ${theirs.color})`,
        boxShadow: `0 0 18px color-mix(in srgb, ${theirs.color} 28%, transparent)` }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 12, borderRadius: 15, padding: '11px 14px 11px 12px', background: 'linear-gradient(180deg, #1b112f, #120b22)' }}>
        <span style={{ display: 'flex', flexShrink: 0 }}>
          <CardOrb tint={mine.color} size={32}>{mine.glyph}</CardOrb>
          <span style={{ marginLeft: -9 }}><CardOrb tint={theirs.color} size={32}>{theirs.glyph}</CardOrb></span>
        </span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span className="mono" style={{ display: 'block', fontSize: 8.5, letterSpacing: '0.2em', color: 'var(--label-3)' }}>YOU &amp; {them.name.toUpperCase()} · ALIGNMENT GUIDE</span>
          <span className="serif italic" style={{ display: 'block', fontSize: 18, lineHeight: 1.2, color: 'var(--label-1)', marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{guide.title}</span>
        </span>
        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" stroke="var(--label-2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="m1 1 5 5-5 5" /></svg>
      </span>
    </motion.button>
  )
}

/** every section card in a rail is the same size, so the row reads as a deck */
const CARD: React.CSSProperties = { width: '100%', minHeight: 330, display: 'flex', flexDirection: 'column' }

/** section cards side by side: swipe through them, dots show where you are */
function Rail({ children, tint }: { children: React.ReactNode[]; tint: string }) {
  const cards = children.filter(Boolean)
  const ref = useRef<HTMLDivElement>(null)
  const [at, setAt] = useState(0)
  const W = 296, GAP = 12
  const onScroll = () => { const el = ref.current; if (el) setAt(Math.max(0, Math.min(cards.length - 1, Math.round(el.scrollLeft / (W + GAP))))) }
  return (
    <div>
      <div ref={ref} onScroll={onScroll} className="no-scrollbar"
        style={{ display: 'flex', gap: GAP, overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', margin: '0 -20px', padding: '4px 20px 8px', scrollPaddingLeft: 20 }}>
        {cards.map((c, i) => <div key={i} style={{ flex: `0 0 ${W}px`, scrollSnapAlign: 'start', display: 'flex' }}>{c}</div>)}
      </div>
      {cards.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 4 }}>
          {cards.map((_, i) => (
            <button key={i} aria-label={`Card ${i + 1} of ${cards.length}`} onClick={() => { sfx.tap(); ref.current?.scrollTo({ left: i * (W + GAP), behavior: 'smooth' }) }}
              style={{ width: i === at ? 18 : 7, height: 7, borderRadius: 4, background: i === at ? tint : 'rgba(179,166,196,0.35)', transition: 'width 0.2s' }} />
          ))}
          <span className="mono" style={{ fontSize: 8.5, letterSpacing: '0.16em', color: 'var(--label-3)', marginLeft: 8 }}>SWIPE · {at + 1}/{cards.length}</span>
        </div>
      )}
    </div>
  )
}

/** one pairing from the two charts, as a card: both signs big, what it's about, what it means for love */
function PairCard({ row, tint, kicker, name }: { row: ChartRow; tint: string; kicker: string; name: string }) {
  const a = SIGNS[row.mine.sign], b = SIGNS[row.theirs.sign]
  return (
    <CardFrame tint={tint} kicker={kicker} title={row.title} style={CARD}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px 0 14px', margin: '2px 0 12px', borderRadius: 14,
        background: `radial-gradient(60% 120% at 28% 50%, color-mix(in srgb, ${a.color} 24%, transparent), transparent 70%), radial-gradient(60% 120% at 72% 50%, color-mix(in srgb, ${b.color} 24%, transparent), transparent 70%), rgba(10,5,24,0.5)` }}>
        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, width: 104 }}>
          <CardOrb tint={a.color} size={44}>{a.glyph}</CardOrb>
          <span className="mono" style={{ fontSize: 8, letterSpacing: '0.14em', color: 'var(--label-3)' }}>YOUR {row.mine.planet.toUpperCase()}</span>
          <span className="serif italic" style={{ fontSize: 16, lineHeight: 1, color: 'var(--label-1)' }}>{a.name}</span>
        </span>
        <span style={{ width: 26, height: 2, marginBottom: 34, background: `linear-gradient(90deg, ${a.color}, ${b.color})` }} />
        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, width: 104 }}>
          <CardOrb tint={b.color} size={44}>{b.glyph}</CardOrb>
          <span className="mono" style={{ fontSize: 8, letterSpacing: '0.14em', color: 'var(--label-3)', whiteSpace: 'nowrap' }}>{name.toUpperCase()}’S {row.theirs.planet.toUpperCase()}</span>
          <span className="serif italic" style={{ fontSize: 16, lineHeight: 1, color: 'var(--label-1)' }}>{b.name}</span>
        </span>
      </div>
      <span className="mono" style={{ alignSelf: 'flex-start', padding: '4px 9px', borderRadius: 999, fontSize: 8.5, letterSpacing: '0.12em', color: 'var(--label-1)', border: '1px solid rgba(201,188,228,0.4)' }}>{FEEL_TAG[row.feel].toUpperCase()}</span>
      <p style={{ margin: '10px 0 0', fontSize: 15, lineHeight: 1.45, color: 'var(--label-1)' }}>{row.love}</p>
    </CardFrame>
  )
}

/**
 * The alignment guide, open: the same header as the card in the chat, then
 * the part you picked. Spark, Clash and Align are one card each; Relationship
 * is the long game plus the four areas (day to day, feelings, first
 * impressions, feeling understood). The astrology sits under a "why" toggle.
 * Words only: no score, percentage or rating, on purpose.
 */
export function CompatSheet({ them, open, onClose, onPlayCard, startTab = 0 }: {
  them: Profile; open: boolean; onClose: () => void
  /** open your talk cards, to act on it */
  onPlayCard?: () => void
  /** which part to open on (the card in the chat passes the one it was showing) */
  startTab?: number
}) {
  const fit = useMemo(() => fitWith(them), [them])
  const guide = useMemo(() => guideFor(them, fit.summary), [them, fit])
  const today = useMemo(() => usToday(them.sign), [them])
  const [tab, setTab] = useState(startTab)
  useEffect(() => { if (open) setTab(startTab) }, [open, startTab])
  const t = TABS[tab]
  const part = t.id === 'chart' ? null : guide.parts[t.id]
  const chart = useMemo(() => chartRows(them), [them])
  // which pairings back up each part: attraction for Spark, the ones that take work for Clash, the easy ones for Align
  const partRows: ChartRow[] = useMemo(() => {
    const core = chart.rows.filter((x) => x.id === 'sun' || x.id === 'moon' || x.id === 'home')
    const smooth = (x: ChartRow) => x.feel === 'alike' || x.feel === 'easy'
    if (t.id === 'pull') return chart.rows.filter((x) => x.id === 'venus' || x.id === 'rising')
    if (t.id === 'push') return core.filter((x) => !smooth(x)).slice(0, 2)
    if (t.id === 'align') return core.filter(smooth).slice(0, 2)
    return []
  }, [chart, t.id])
  const [tonight, setTonight] = useState(false)
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="dim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
            style={{ position: 'absolute', inset: 0, zIndex: 80, background: 'rgba(5,2,15,0.6)' }} />
          <motion.div key="sheet" role="dialog" aria-label={`Alignment guide: you and ${them.name}`}
            initial={{ y: 720 }} animate={{ y: 0 }} exit={{ y: 720 }} transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            style={{
              position: 'absolute', left: 0, right: 0, bottom: 0, height: 720, zIndex: 81, borderRadius: '26px 26px 0 0',
              background: 'linear-gradient(180deg, #2a1856 0%, #160c30 100%)', borderTop: '1px solid rgba(179,166,196,0.25)',
              display: 'flex', flexDirection: 'column',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '8px 10px 0 24px' }}>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', paddingLeft: 30 }}>
                <span style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(179,166,196,0.4)' }} />
              </div>
              <button aria-label="Close" onClick={() => { sfx.tap(); onClose() }} style={{ width: 40, height: 40, display: 'grid', placeItems: 'center', color: 'var(--label-2)' }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 3l10 10M13 3 3 13" /></svg>
              </button>
            </div>
            <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '0 20px 40px' }}>
              {/* the same who-and-what as the row in the chat, then the four parts */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '0 4px' }}>
                <span style={{ display: 'flex', flexShrink: 0 }}>
                  <CardOrb tint={SIGNS[ME.sign].color} size={42}>{SIGNS[ME.sign].glyph}</CardOrb>
                  <span style={{ marginLeft: -12 }}><CardOrb tint={SIGNS[them.sign].color} size={42}>{SIGNS[them.sign].glyph}</CardOrb></span>
                </span>
                <div style={{ minWidth: 0 }}>
                  <div className="mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--label-3)' }}>ALIGNMENT GUIDE</div>
                  <div className="h-display" style={{ fontSize: 28, lineHeight: 1.1, marginTop: 3 }}>You &amp; {them.name}</div>
                </div>
              </div>
              <p className="serif italic" style={{ fontSize: 19, lineHeight: 1.3, color: 'var(--label-1)', margin: '14px 4px 0' }}>
                {guide.title}{guide.line ? <span style={{ color: 'var(--label-2)' }}> {guide.line}</span> : null}
              </p>
              <div style={{ marginTop: 14 }}><GuideTabs tab={tab} onTab={setTab} /></div>

              {/* the part, as section cards to swipe through */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={t.id} role="tabpanel" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} style={{ marginTop: 16 }}>
                  <Rail tint={t.color}>
                    {[
                      // 1. the read: the picture, the headline, the paragraph
                      part && (
                        <CardFrame key="read" tint={t.color} kicker={`${t.label} · ${t.eyebrow}`} title={part.headline} style={CARD}>
                          <PairArt kind={t.id as 'pull' | 'push' | 'align' | 'relationship'} mine={ME.sign} theirs={them.sign} />
                          {part.body && <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.48, color: 'var(--label-1)' }}>{part.body}</p>}
                          {!part.body && <p style={{ margin: 0, fontSize: 13, lineHeight: 1.4, color: 'var(--label-3)' }}>From {them.name}’s sign: {SIGNS[them.sign].name}, {SIGNS[them.sign].element}.</p>}
                        </CardFrame>
                      ),
                      // 2. what their card says
                      part?.card && (
                        <CardFrame key="card" tint={SIGNS[them.sign].color} kicker={`${t.label} · on ${them.name}’s card`} title="In their words" orb={<CardOrb tint={SIGNS[them.sign].color}>{SIGNS[them.sign].glyph}</CardOrb>} style={CARD}>
                          <div style={{ flex: 1, display: 'grid', placeItems: 'center', padding: '10px 4px' }}>
                            <div className="serif italic" style={{ fontSize: 24, lineHeight: 1.25, color: 'var(--label-1)', textAlign: 'center' }}>“{part.card}”</div>
                          </div>
                        </CardFrame>
                      ),
                      // 3. the pairings in your charts behind it, one card each
                      ...partRows.map((row) => <PairCard key={row.id} row={row} tint={t.color} kicker={`${t.label} · in your charts`} name={them.name} />),
                      // the chart tab: the wheel, then every pairing
                      t.id === 'chart' && (
                        <CardFrame key="wheel" tint={t.color} kicker="Chart · both of you" title="Your charts on one wheel" style={CARD}>
                          <ChartWheel rows={chart.rows} mine={ME.sign} theirs={them.sign} name={them.name} />
                          {chart.sunOnly && <div style={{ fontSize: 12, lineHeight: 1.4, color: 'var(--label-3)', textAlign: 'center' }}>{them.name}’s card only shows a sun sign. Their moon and rising need a birth time.</div>}
                        </CardFrame>
                      ),
                      ...(t.id === 'chart' ? chart.rows.map((row) => <PairCard key={row.id} row={row} tint={t.color} kicker="Chart · for love" name={them.name} />) : []),
                      // the relationship tab: the four areas
                      ...(t.id === 'relationship' ? fit.areas.map((a) => (
                        <CardFrame key={a.id} tint={AREA_TINT[a.id]} kicker={a.sub} title={a.title} orb={<CardOrb tint={AREA_TINT[a.id]}>{a.glyph}</CardOrb>}
                          strip={{ label: 'Try this', text: a.tryThis }} style={CARD}>
                          <span className="mono" style={{ alignSelf: 'flex-start', display: 'inline-block', padding: '4px 9px', borderRadius: 999, fontSize: 8.5, letterSpacing: '0.12em', color: 'var(--label-1)', border: '1px solid rgba(201,188,228,0.4)' }}>{FEEL_TAG[a.feel].toUpperCase()}</span>
                          <p style={{ margin: '10px 0 0', fontSize: 14.5, lineHeight: 1.45, color: 'var(--label-1)' }}>{a.body}</p>
                          <div className="mono" style={{ fontSize: 8, letterSpacing: '0.1em', color: 'var(--label-3)', marginTop: 10 }}>{a.from.toUpperCase()}</div>
                        </CardFrame>
                      )) : []),
                      // last: something to do about it
                      part?.tryLine && (
                        <CardFrame key="try" tint={t.color} kicker={`${t.label} · try this`} title="One thing to do" style={CARD}>
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, padding: '6px 4px' }}>
                            <span style={{ fontSize: 34, lineHeight: 1, color: t.color, textShadow: `0 0 18px ${t.color}` }}>✦</span>
                            <div className="serif italic" style={{ fontSize: 23, lineHeight: 1.25, color: 'var(--label-1)', textAlign: 'center' }}>{part.tryLine}</div>
                          </div>
                        </CardFrame>
                      ),
                    ]}
                  </Rail>
                  {t.id === 'relationship' && fit.sunOnly && (
                    <p style={{ fontSize: 12.5, lineHeight: 1.4, color: 'var(--label-3)', margin: '8px 4px 0' }}>{them.name}’s card only shows a sun sign. Feelings and first impressions need a birth time.</p>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* tonight: one small row that opens */}
              <div style={{ marginTop: 14, borderRadius: 16, overflow: 'hidden', background: 'rgba(30,18,64,0.72)', border: '1px solid rgba(179,166,196,0.2)' }}>
                <button aria-expanded={tonight} onClick={() => { sfx.tap(); setTonight((o) => !o) }}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', textAlign: 'left' }}>
                  <CardOrb tint="#c9bedb" size={26}>☾</CardOrb>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span className="mono" style={{ display: 'block', fontSize: 8.5, letterSpacing: '0.18em', color: 'var(--label-3)' }}>TONIGHT · YOU TWO, UNDER THIS SKY</span>
                    {!tonight && <span style={{ display: 'block', fontSize: 13.5, color: 'var(--label-2)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{today.line}</span>}
                  </span>
                  <motion.svg animate={{ rotate: tonight ? 180 : 0 }} width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="var(--label-2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="m1 1.5 5 5 5-5" /></motion.svg>
                </button>
                <AnimatePresence initial={false}>
                  {tonight && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: 'hidden' }}>
                      <div style={{ padding: '2px 14px 14px' }}>
                        <div style={{ fontSize: 15, lineHeight: 1.45, color: 'var(--label-1)' }}>{today.line}</div>
                        {onPlayCard && (
                          <button className="mono" onClick={() => { sfx.tap(); onPlayCard() }}
                            style={{ marginTop: 12, height: 34, padding: '0 14px', borderRadius: 999, fontSize: 9.5, letterSpacing: '0.14em', fontWeight: 700, color: 'var(--chrome-ink)', background: 'var(--chrome)' }}>
                            PLAY A TALK CARD WITH {them.name.toUpperCase()} ›
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <p style={{ fontSize: 11.5, lineHeight: 1.4, color: 'var(--label-3)', margin: '18px 4px 0' }}>
                Astrology, for reflection and fun. It describes how two charts meet; it doesn’t measure or predict a relationship.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
