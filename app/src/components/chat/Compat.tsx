import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FEEL_TAG, chartRows, fitWith } from '../../lib/compat'
import { ME, type Profile } from '../../data/profiles'
import { SIGNS } from '../../data/signs'
import { usToday } from '../../data/skyReading'
import { sfx } from '../../lib/sfx'
import { CardOrb, foil } from '../CardFrame'
import type { ChartRow } from '../../lib/compat'
import { ChartWheel, PairArt } from './GuideArt'
import { MY_READING_TITLE, READINGS } from './readings'


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

/** a drawn symbol for each part */
function PartIcon({ id, size, color }: { id: TabId; size: number; color: string }) {
  const glow = { filter: `drop-shadow(0 0 ${Math.round(size / 4)}px ${color})` }
  if (id === 'pull') return <svg width={size} height={size} viewBox="0 0 24 24" style={glow}><path d="M12 1c.6 6.6 4.4 10.4 11 11-6.6.6-10.4 4.4-11 11-.6-6.6-4.4-10.4-11-11 6.6-.6 10.4-4.4 11-11Z" fill={color} /></svg>
  if (id === 'push') return <svg width={size} height={size} viewBox="0 0 24 24" style={glow}><path d="M14 1 4 13.5h6L8 23l12-13.5h-6.5L14 1Z" fill={color} /></svg>
  if (id === 'align') {
    const pts = [[0, 0], ...Array.from({ length: 6 }, (_, k) => { const a = ((-90 + k * 60) * Math.PI) / 180; return [Math.cos(a) * 5, Math.sin(a) * 5] })]
    return <svg width={size} height={size} viewBox="-12 -12 24 24" fill="none" stroke={color} strokeWidth="0.7" style={glow}>{pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" />)}<circle r="10" /></svg>
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" style={glow}><ellipse cx="12" cy="12" rx="10.5" ry="5" transform="rotate(-20 12 12)" /><circle cx="12" cy="12" r="3" fill={color} stroke="none" /></svg>
}

/** which everyday area each chart pairing speaks to */
const AREA_OF: Partial<Record<ChartRow['id'], string>> = { sun: 'daily', moon: 'feelings', rising: 'first', home: 'understood' }

/** short names for the chart pairings, for the little cards */
const PAIR_NAME: Record<ChartRow['id'], string> = { sun: 'Sun', moon: 'Moon', rising: 'Rising', venus: 'Pull', home: 'Home' }

interface Big { key: string; tint: string; label: string; node: React.ReactNode }

/** a card, big: swipe or tap the arrows for the next one (the same reader as the You screen's cards) */
function BigCards({ cards, start, title, onClose }: { cards: Big[]; start: number; title: string; onClose: () => void }) {
  const [i, setI] = useState(start)
  const [dir, setDir] = useState(0)
  const c = cards[i]
  const to = (n: number) => { if (n < 0 || n >= cards.length) return; sfx.flip(); setDir(n > i ? 1 : -1); setI(n) }
  return (
    <motion.div role="dialog" aria-label={c.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 95, background: 'rgba(5,2,15,0.88)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}>
      <div aria-hidden style={{ position: 'absolute', left: '50%', top: '42%', width: 420, height: 420, marginLeft: -210, marginTop: -210, borderRadius: '50%', filter: 'blur(50px)', background: `radial-gradient(closest-side, color-mix(in srgb, ${c.tint} 40%, transparent), transparent)`, transition: 'background 0.4s' }} />
      <div className="mono" style={{ position: 'absolute', top: 64, left: 0, right: 0, textAlign: 'center', fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--label-2)' }}>{title.toUpperCase()} · {i + 1} OF {cards.length}</div>
      <AnimatePresence initial={true} mode="popLayout" custom={dir}>
        <motion.div key={c.key} custom={dir}
          initial={{ rotateY: dir === 0 ? 180 : dir * 70, x: dir * 120, opacity: 0, scale: 0.9 }} animate={{ rotateY: 0, x: 0, opacity: 1, scale: 1 }} exit={{ rotateY: dir * -70, x: dir * -120, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.5}
          onDragEnd={(_, d) => { if (d.offset.x < -70) to(i + 1); else if (d.offset.x > 70) to(i - 1) }}
          onClick={(e) => e.stopPropagation()}
          style={{ position: 'absolute', left: 34, right: 34, top: 110, borderRadius: 24, padding: 5, background: foil(c.tint), boxShadow: `0 0 40px color-mix(in srgb, ${c.tint} 45%, transparent), 0 24px 50px rgba(0,0,0,0.6)`, touchAction: 'pan-y' }}>
          <div className="no-scrollbar" style={{ borderRadius: 19, minHeight: 420, maxHeight: 560, overflowY: 'auto', padding: '20px 20px 18px', display: 'flex', flexDirection: 'column', background: `radial-gradient(90% 45% at 50% 16%, color-mix(in srgb, ${c.tint} 22%, #1d1233), #120b22)` }}>
            {c.node}
          </div>
        </motion.div>
      </AnimatePresence>
      <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', left: 30, right: 30, bottom: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button aria-label="Previous card" onClick={() => to(i - 1)} style={{ width: 48, height: 48, borderRadius: 24, display: 'grid', placeItems: 'center', fontSize: 20, color: 'var(--label-1)', opacity: i ? 1 : 0.3, background: 'rgba(52,35,95,0.7)' }}>‹</button>
        <div style={{ display: 'flex', gap: 6 }}>
          {cards.map((x, n) => <button key={x.key} aria-label={x.label} onClick={() => to(n)} style={{ width: n === i ? 18 : 7, height: 7, borderRadius: 4, background: n === i ? x.tint : 'rgba(179,166,196,0.35)', transition: 'width 0.2s' }} />)}
        </div>
        <button aria-label="Next card" onClick={() => to(i + 1)} style={{ width: 48, height: 48, borderRadius: 24, display: 'grid', placeItems: 'center', fontSize: 20, color: 'var(--label-1)', opacity: i < cards.length - 1 ? 1 : 0.3, background: 'rgba(52,35,95,0.7)' }}>›</button>
      </div>
      <button aria-label="Close card" onClick={onClose} style={{ position: 'absolute', right: 14, top: 52, width: 40, height: 40, display: 'grid', placeItems: 'center', fontSize: 22, color: 'var(--label-1)' }}>×</button>
    </motion.div>
  )
}

/**
 * The alignment guide, open. Built like the You screen: a row of little cards
 * (Spark, Clash, Align, and the long game when there is one) and a fanned
 * hand of your chart pairings. Tap any of them and it comes up big; swipe for
 * the rest. Words and pictures only: no score, percentage or rating.
 */
export function CompatSheet({ them, open, onClose, onPlayCard }: {
  them: Profile; open: boolean; onClose: () => void
  /** open your talk cards, to act on it */
  onPlayCard?: () => void
  startTab?: number
}) {
  const fit = useMemo(() => fitWith(them), [them])
  const guide = useMemo(() => guideFor(them, fit.summary), [them, fit])
  const chart = useMemo(() => chartRows(them), [them])
  const today = useMemo(() => usToday(them.sign), [them])
  const [big, setBig] = useState<{ set: 'parts' | 'chart'; at: number } | null>(null)
  useEffect(() => { if (!open) setBig(null) }, [open])
  const mine = SIGNS[ME.sign], theirs = SIGNS[them.sign]

  // the little cards: the long game only when someone wrote one (Juniper)
  const parts = TABS.filter((t): t is (typeof TABS)[number] & { id: TabId } => t.id !== 'chart' && (t.id !== 'relationship' || them.id === 'j27'))
  const partCards: Big[] = parts.map((t) => {
    const p = guide.parts[t.id]
    return {
      key: t.id, tint: t.color, label: t.label,
      node: (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', fontWeight: 700, color: t.color }}>{t.label.toUpperCase()}</span>
            <span className="mono" style={{ fontSize: 9, letterSpacing: '0.14em', color: 'var(--label-3)' }}>{t.eyebrow.toUpperCase()}</span>
          </div>
          <div style={{ marginTop: 12 }}><PairArt kind={t.id} mine={ME.sign} theirs={them.sign} /></div>
          <div className="serif italic" style={{ fontSize: 25, lineHeight: 1.18, color: 'var(--label-1)', textAlign: 'center', marginTop: 4 }}>{p.headline}</div>
          {p.body && <p style={{ margin: '12px 0 0', fontSize: 14, lineHeight: 1.45, color: 'var(--label-2)', textAlign: 'center' }}>{p.body}</p>}
          {p.card && <div className="serif italic" style={{ fontSize: 15.5, lineHeight: 1.3, color: 'var(--label-1)', textAlign: 'center', marginTop: 12 }}>{them.name}’s card: “{p.card}”</div>}
          <div style={{ flex: 1 }} />
          {p.tryLine && (
            <div style={{ marginTop: 16, borderRadius: 14, padding: '10px 12px', background: `color-mix(in srgb, ${t.color} 14%, transparent)`, border: `1px solid color-mix(in srgb, ${t.color} 40%, transparent)` }}>
              <span className="mono" style={{ fontSize: 9, letterSpacing: '0.18em', fontWeight: 700, color: t.color }}>TRY THIS </span>
              <span className="serif italic" style={{ fontSize: 15.5, color: 'var(--label-1)' }}>{p.tryLine}</span>
            </div>
          )}
        </>
      ),
    }
  })
  const chartCards: Big[] = chart.rows.map((row) => {
    const a = SIGNS[row.mine.sign], b = SIGNS[row.theirs.sign]
    // the everyday read of the same pairing, and one thing to try
    const area = fit.areas.find((x) => x.id === AREA_OF[row.id])
    const tryThis = area?.tryThis ?? 'Tell them one thing you like about them that isn’t your usual type.'
    return {
      key: row.id, tint: '#c9bedb', label: row.title,
      node: (
        <>
          <div className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', fontWeight: 700, color: '#c9bedb' }}>YOUR CHARTS · {PAIR_NAME[row.id].toUpperCase()}</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '18px 0 16px', margin: '14px 0 0', borderRadius: 16,
            background: `radial-gradient(60% 120% at 28% 50%, color-mix(in srgb, ${a.color} 26%, transparent), transparent 70%), radial-gradient(60% 120% at 72% 50%, color-mix(in srgb, ${b.color} 26%, transparent), transparent 70%), rgba(10,5,24,0.5)` }}>
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 110 }}>
              <CardOrb tint={a.color} size={58}>{a.glyph}</CardOrb>
              <span className="mono" style={{ fontSize: 8.5, letterSpacing: '0.14em', color: 'var(--label-3)' }}>YOUR {row.mine.planet.toUpperCase()}</span>
              <span className="serif italic" style={{ fontSize: 18, lineHeight: 1, color: 'var(--label-1)' }}>{a.name}</span>
            </span>
            <span style={{ width: 24, height: 2, marginBottom: 40, background: `linear-gradient(90deg, ${a.color}, ${b.color})` }} />
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 110 }}>
              <CardOrb tint={b.color} size={58}>{b.glyph}</CardOrb>
              <span className="mono" style={{ fontSize: 8.5, letterSpacing: '0.14em', color: 'var(--label-3)', whiteSpace: 'nowrap' }}>{them.name.toUpperCase()}’S {row.theirs.planet.toUpperCase()}</span>
              <span className="serif italic" style={{ fontSize: 18, lineHeight: 1, color: 'var(--label-1)' }}>{b.name}</span>
            </span>
          </div>
          <div className="serif italic" style={{ fontSize: 25, lineHeight: 1.18, color: 'var(--label-1)', textAlign: 'center', marginTop: 18 }}>{row.title}</div>
          <span className="mono" style={{ alignSelf: 'center', marginTop: 10, padding: '5px 11px', borderRadius: 999, fontSize: 9, letterSpacing: '0.14em', color: 'var(--label-1)', border: '1px solid rgba(201,188,228,0.4)' }}>{FEEL_TAG[row.feel].toUpperCase()}</span>
          <p style={{ margin: '12px 0 0', fontSize: 15, lineHeight: 1.45, color: 'var(--label-1)', textAlign: 'center' }}>{row.love}</p>
          {area && (
            <div style={{ marginTop: 12, paddingTop: 11, borderTop: '1px solid rgba(179,166,196,0.16)' }}>
              <div className="mono" style={{ fontSize: 9, letterSpacing: '0.18em', fontWeight: 700, color: '#c9bedb', textAlign: 'center' }}>IN REAL LIFE</div>
              <p style={{ margin: '5px 0 0', fontSize: 14, lineHeight: 1.45, color: 'var(--label-2)', textAlign: 'center' }}>{area.body}</p>
            </div>
          )}
          <div style={{ flex: 1 }} />
          <div style={{ marginTop: 14, borderRadius: 14, padding: '10px 12px', background: 'rgba(201,190,219,0.12)', border: '1px solid rgba(201,190,219,0.36)' }}>
            <span className="mono" style={{ fontSize: 9, letterSpacing: '0.18em', fontWeight: 700, color: '#c9bedb' }}>TRY THIS </span>
            <span className="serif italic" style={{ fontSize: 15.5, color: 'var(--label-1)' }}>{tryThis}</span>
          </div>
        </>
      ),
    }
  })
  const n = chart.rows.length
  const spread = n > 4 ? 52 : n > 2 ? 64 : 84

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
            <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '0 20px 40px' }}>
              {/* who */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <span style={{ display: 'flex' }}>
                  <CardOrb tint={mine.color} size={54}>{mine.glyph}</CardOrb>
                  <span style={{ marginLeft: -14 }}><CardOrb tint={theirs.color} size={54}>{theirs.glyph}</CardOrb></span>
                </span>
                <div className="h-display" style={{ fontSize: 30, lineHeight: 1.1, marginTop: 10 }}>You &amp; {them.name}</div>
                <p className="serif italic" style={{ fontSize: 17.5, lineHeight: 1.3, color: 'var(--label-2)', margin: '6px 8px 0' }}>{guide.title}</p>
              </div>

              {/* tonight, you two under this sky: always open, with a way to act on it */}
              <div style={{ marginTop: 16, borderRadius: 16, padding: '12px 14px', background: 'rgba(30,18,64,0.72)', border: '1px solid rgba(179,166,196,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CardOrb tint="#c9bedb" size={26}>☾</CardOrb>
                  <span className="mono" style={{ flex: 1, fontSize: 8.5, letterSpacing: '0.18em', color: 'var(--label-3)' }}>TONIGHT · YOU TWO, UNDER THIS SKY</span>
                </div>
                <div style={{ fontSize: 15, lineHeight: 1.45, color: 'var(--label-1)', marginTop: 9 }}>{today.line}</div>
                {onPlayCard && (
                  <button className="mono" onClick={() => { sfx.tap(); onPlayCard() }}
                    style={{ display: 'block', margin: '12px auto 0', height: 36, padding: '0 22px', borderRadius: 999, fontSize: 9.5, letterSpacing: '0.14em', fontWeight: 700, color: 'var(--chrome-ink)', background: 'var(--chrome)' }}>
                    PLAY CARD ›
                  </button>
                )}
              </div>

              {/* the little cards */}
              <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--label-3)', margin: '20px 2px 8px' }}>
                <span>YOU TWO</span><span>TAP TO READ</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${parts.length}, 1fr)`, gap: 9 }}>
                {parts.map((t, i) => (
                  <motion.button key={t.id} onClick={() => { sfx.flip(); setBig({ set: 'parts', at: i }) }} whileTap={{ scale: 0.95, y: -4 }} aria-label={`${t.label}: ${t.eyebrow}`}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.1 + i * 0.06 }}
                    style={{ borderRadius: 16, padding: 3, background: foil(t.color), boxShadow: `0 8px 18px rgba(0,0,0,0.45), 0 0 14px color-mix(in srgb, ${t.color} 30%, transparent)` }}>
                    <span style={{ height: 122, borderRadius: 13, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '10px 5px 11px',
                      background: `radial-gradient(90% 60% at 50% 36%, color-mix(in srgb, ${t.color} 26%, #1b112f), #120b22)` }}>
                      <span className="mono" style={{ fontSize: parts.length > 3 ? 8 : 9.5, letterSpacing: '0.16em', fontWeight: 700, color: t.color }}>{(t.id === 'relationship' ? 'Long game' : t.label).toUpperCase()}</span>
                      <PartIcon id={t.id} size={34} color={t.color} />
                      <span className="serif italic" style={{ fontSize: parts.length > 3 ? 12 : 13.5, lineHeight: 1.15, color: 'var(--label-1)', textAlign: 'center' }}>{t.eyebrow}</span>
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* your charts, as a hand */}
              <div style={{ textAlign: 'center', marginTop: 26 }}>
                <div className="h-display" style={{ fontSize: 24 }}>Your charts, together</div>
                <div style={{ fontSize: 13, color: 'var(--label-2)', marginTop: 3 }}>{chart.sunOnly ? `${them.name}’s card only shows a sun sign, so there are two pairings.` : 'Your birth chart and theirs, and the five places they meet.'}</div>
              </div>
              {/* both birth charts on one wheel */}
              <div style={{ marginTop: 12, borderRadius: 18, padding: '10px 0 2px', background: 'rgba(10,5,24,0.35)', border: '1px solid rgba(179,166,196,0.16)' }}>
                <ChartWheel rows={chart.rows} mine={ME.sign} theirs={them.sign} name={them.name} />
              </div>
              <div className="mono" style={{ textAlign: 'center', fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--label-3)', marginTop: 14 }}>EACH LINE IS A CARD · PULL ONE</div>
              <div style={{ position: 'relative', height: 172, marginTop: 6 }}>
                {chart.rows.map((row, i) => {
                  const k = i - (n - 1) / 2
                  const a = SIGNS[row.mine.sign], b = SIGNS[row.theirs.sign]
                  return (
                    <motion.button key={row.id} onClick={() => { sfx.flip(); setBig({ set: 'chart', at: i }) }} aria-label={row.title}
                      initial={{ y: 60, opacity: 0, rotate: 0 }} animate={{ y: k * k * 4, opacity: 1, rotate: k * 7 }}
                      whileTap={{ y: k * k * 4 - 20, scale: 1.05 }} transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.15 + i * 0.05 }}
                      style={{ position: 'absolute', left: '50%', top: 8, width: 84, height: 128, marginLeft: -42 + k * spread, zIndex: i, transformOrigin: '50% 120%', borderRadius: 13, padding: 3,
                        background: `linear-gradient(160deg, ${a.color}, ${a.light} 35%, ${b.light} 65%, ${b.color})`, boxShadow: '0 8px 18px rgba(0,0,0,0.5)' }}>
                      <span style={{ width: '100%', height: '100%', borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '9px 4px 10px', background: 'radial-gradient(90% 60% at 50% 40%, #2a1856, #120b22)' }}>
                        <span className="mono" style={{ fontSize: 8, letterSpacing: '0.16em', fontWeight: 700, color: '#d9cdf0' }}>{PAIR_NAME[row.id].toUpperCase()}</span>
                        <span style={{ display: 'flex' }}>
                          <CardOrb tint={a.color} size={30}>{a.glyph}</CardOrb>
                          <span style={{ marginLeft: -9 }}><CardOrb tint={b.color} size={30}>{b.glyph}</CardOrb></span>
                        </span>
                        <span className="serif italic" style={{ fontSize: 11.5, lineHeight: 1.1, color: 'var(--label-1)', textAlign: 'center' }}>{FEEL_TAG[row.feel]}</span>
                      </span>
                    </motion.button>
                  )
                })}
              </div>

              <p style={{ fontSize: 11.5, lineHeight: 1.4, color: 'var(--label-3)', margin: '16px 4px 0', textAlign: 'center' }}>
                Astrology, for reflection and fun. It describes how two charts meet; it doesn’t measure or predict a relationship.
              </p>
            </div>
          </motion.div>
          <AnimatePresence>
            {big && <BigCards key={big.set} cards={big.set === 'parts' ? partCards : chartCards} start={big.at} title={big.set === 'parts' ? `You & ${them.name}` : 'Your charts'} onClose={() => setBig(null)} />}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}
