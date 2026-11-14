import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FEEL_TAG, fitWith } from '../../lib/compat'
import { ME, type Profile } from '../../data/profiles'
import { SIGNS } from '../../data/signs'
import { usToday } from '../../data/skyReading'
import { sfx } from '../../lib/sfx'
import CardFrame, { CardOrb } from '../CardFrame'
import AuraPair from './AuraPair'
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
] as const
type TabId = (typeof TABS)[number]['id']

interface Part { headline: string; body?: string; tryLine?: string; card?: string }
interface Guide { title: string; line: string; parts: Record<TabId, Part> }

/** what each element tends to bring, for matches whose card doesn't say */
const BY_ELEMENT = {
  fire: { pull: 'They bring the heat and the plans.', push: 'They move fast. Say so if you need a minute.', align: 'You both like someone who shows up.' },
  earth: { pull: 'Steady, warm, and they do what they say.', push: 'Neither of you likes to budge first.', align: 'You both build slowly and mean it.' },
  air: { pull: 'Easy to talk to and full of ideas.', push: 'They think out loud when you may want an answer.', align: 'You both pick a good conversation over a big gesture.' },
  water: { pull: 'They notice how you feel before you say it.', push: 'Moods run deep. Ask, don’t guess.', align: 'You both want it to be real.' },
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
  const part = (k: 'pull' | 'push' | 'align'): Part => ({ headline: says(k) ?? el[k] })
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

/** the header both widgets share: who, the title, and the four tabs */
function GuideHead({ them, guide, tab, onTab, big }: { them: Profile; guide: Guide; tab: number; onTab?: (i: number) => void; big?: boolean }) {
  return (
    <>
      <div className="mono" style={{ fontSize: big ? 9.5 : 8.5, letterSpacing: '0.26em', color: 'var(--label-2)' }}>
        {them.name.toUpperCase()} × YOU · ALIGNMENT GUIDE
      </div>
      <div style={{ marginTop: big ? 10 : 6 }}>
        <AuraPair left={them.sign} size={big ? 58 : 46} gap={big ? 48 : 38} />
      </div>
      <div className="serif italic" style={{ fontSize: big ? 26 : 21, lineHeight: 1.15, marginTop: big ? 10 : 6, color: 'var(--label-1)' }}>{guide.title}</div>
      {guide.line && <div style={{ fontSize: big ? 14 : 12.5, lineHeight: 1.35, color: 'var(--label-2)', marginTop: 3 }}>{guide.line}</div>}
      <div role={onTab ? 'tablist' : undefined} style={{
        display: 'flex', justifyContent: 'space-between', marginTop: big ? 14 : 10, padding: 3, borderRadius: 999,
        background: 'rgba(20, 10, 46, 0.45)', border: '1px solid rgba(179,166,196,0.18)', position: 'relative',
      }}>
        {TABS.map((x, i) => {
          const inner = (
            <>
              {i === tab && (
                <motion.div layoutId={big ? 'guide-pill-sheet' : `guide-pill-${them.id}`} transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  style={{ position: 'absolute', inset: 0, borderRadius: 999, background: x.pill }} />
              )}
              <span className="mono" style={{ position: 'relative', fontSize: big ? 9 : 7.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: i === tab ? x.color : 'var(--label-3)', fontWeight: 700 }}>{x.label}</span>
            </>
          )
          const st: React.CSSProperties = { position: 'relative', flex: x.id === 'relationship' ? 1.7 : 1, height: big ? 32 : 20, display: 'grid', placeItems: 'center' }
          return onTab
            ? <button key={x.id} role="tab" aria-selected={i === tab} onClick={() => { if (i !== tab) { sfx.tap(); onTab(i) } }} style={st}>{inner}</button>
            : <div key={x.id} style={st}>{inner}</div>
        })}
      </div>
    </>
  )
}

const SURFACE = 'radial-gradient(60% 80% at 50% 0%, rgba(150, 90, 240, 0.45), transparent 70%), linear-gradient(180deg, rgba(64, 34, 132, 0.92), rgba(44, 22, 96, 0.92))'

/**
 * The guide as a card in the chat: the same header as the sheet, its tabs
 * turning over on their own. Tap it and the sheet opens on the tab showing.
 */
export function AlignGuideCard({ them, onOpen, top = 12 }: { them: Profile; onOpen: (tab: number) => void; /** room above it (the "Us today" strip floats over the top of some chats) */ top?: number }) {
  const fit = useMemo(() => fitWith(them), [them])
  const guide = useMemo(() => guideFor(them, fit.summary), [them, fit])
  const [tab, setTab] = useState(0)
  useEffect(() => {
    const t = window.setInterval(() => setTab((x) => (x + 1) % TABS.length), 1600)
    return () => clearInterval(t)
  }, [])
  return (
    <motion.button onClick={() => { sfx.tap(); onOpen(tab) }} aria-label={`Alignment guide: you and ${them.name}`}
      initial={{ opacity: 0, y: 14, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }} whileTap={{ scale: 0.98 }}
      style={{ position: 'relative', display: 'block', width: 300, margin: `${top}px auto 14px`, padding: '14px 14px 12px', borderRadius: 18, textAlign: 'center', overflow: 'hidden',
        background: SURFACE, border: '1.5px solid rgba(214, 196, 245, 0.5)', boxShadow: '0 0 30px rgba(154, 123, 224, 0.28), inset 0 1px 0 rgba(255,255,255,0.12)' }}>
      <GuideHead them={them} guide={guide} tab={tab} />
      <div className="mono" style={{ marginTop: 9, fontSize: 8.5, letterSpacing: '0.2em', color: TABS[tab].color, transition: 'color .3s' }}>TAP TO READ ›</div>
    </motion.button>
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
  const [why, setWhy] = useState(false)
  const [tab, setTab] = useState(startTab)
  useEffect(() => { if (open) setTab(startTab) }, [open, startTab])
  const t = TABS[tab], part = guide.parts[t.id]
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
              {/* the same header as the card in the chat */}
              <div style={{ borderRadius: 20, padding: '16px 14px 12px', textAlign: 'center', background: SURFACE, border: '1.5px solid rgba(214, 196, 245, 0.5)', boxShadow: '0 0 30px rgba(154, 123, 224, 0.28), inset 0 1px 0 rgba(255,255,255,0.12)' }}>
                <GuideHead them={them} guide={guide} tab={tab} onTab={setTab} big />
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={t.id} role="tabpanel" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
                  {/* the part itself */}
                  <CardFrame tint={t.color} kicker={`${t.label} · ${t.eyebrow}`} title={part.headline}
                    strip={part.tryLine ? { label: 'Try this', text: part.tryLine } : undefined}
                    footer={['Align · alignment guide', `${tab + 1}/${TABS.length}`]}>
                    {part.body && <p style={{ margin: '0 0 2px', fontSize: 15, lineHeight: 1.5, color: 'var(--label-1)' }}>{part.body}</p>}
                    {part.card && (
                      <div style={{ marginTop: 12, paddingTop: 11, borderTop: '1px solid rgba(179,166,196,0.16)' }}>
                        <div className="mono" style={{ fontSize: 9, letterSpacing: '0.16em', fontWeight: 700, color: t.color }}>ON {them.name.toUpperCase()}’S CARD</div>
                        <div className="serif italic" style={{ fontSize: 16.5, lineHeight: 1.3, color: 'var(--label-1)', marginTop: 4 }}>{part.card}</div>
                      </div>
                    )}
                    {!part.body && !part.card && t.id !== 'relationship' && (
                      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.4, color: 'var(--label-3)' }}>{them.reading?.length ? `From ${them.name}’s card.` : `From ${them.name}’s sign: ${SIGNS[them.sign].name}, ${SIGNS[them.sign].element}.`}</p>
                    )}
                  </CardFrame>

                  {/* the relationship, area by area */}
                  {t.id === 'relationship' && (
                    <>
                      {fit.areas.map((a, i) => (
                        <CardFrame key={a.id} tint={AREA_TINT[a.id]} kicker={a.sub} title={a.title}
                          orb={<CardOrb tint={AREA_TINT[a.id]}>{a.glyph}</CardOrb>}
                          strip={{ label: 'Try this', text: a.tryThis }}
                          footer={[why ? a.from : 'Align · alignment guide', `${i + 1}/${fit.areas.length}`]}>
                          <span className="mono" style={{ display: 'inline-block', padding: '4px 9px', borderRadius: 999, fontSize: 8.5, letterSpacing: '0.12em', color: 'var(--label-1)', border: '1px solid rgba(201,188,228,0.4)' }}>{FEEL_TAG[a.feel].toUpperCase()}</span>
                          <p style={{ margin: '10px 0 2px', fontSize: 15, lineHeight: 1.45, color: 'var(--label-1)' }}>{a.body}</p>
                        </CardFrame>
                      ))}
                      {fit.sunOnly ? (
                        <p style={{ fontSize: 12.5, lineHeight: 1.4, color: 'var(--label-3)', margin: '-2px 4px 0' }}>
                          {them.name}’s card only shows a sun sign. Feelings and first impressions need a birth time.
                        </p>
                      ) : (
                        <button className="mono" onClick={() => { sfx.tap(); setWhy((w) => !w) }} aria-expanded={why}
                          style={{ alignSelf: 'flex-start', margin: '-4px 4px 0', height: 30, fontSize: 9, letterSpacing: '0.16em', color: 'var(--label-2)' }}>
                          {why ? 'HIDE THE ASTROLOGY ‹' : 'WHY? SHOW THE ASTROLOGY ›'}
                        </button>
                      )}
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* tonight, and something to do about it */}
              <CardFrame tint="#c9bedb" kicker="Tonight" title="You two, under this sky" orb={<CardOrb tint="#c9bedb">☾</CardOrb>} style={{ marginTop: 16 }}>
                <div style={{ fontSize: 15, lineHeight: 1.45, color: 'var(--label-1)' }}>{today.line}</div>
                {onPlayCard && (
                  <button className="mono" onClick={() => { sfx.tap(); onPlayCard() }}
                    style={{ margin: '12px 0 4px', height: 34, padding: '0 14px', borderRadius: 999, fontSize: 9.5, letterSpacing: '0.14em', fontWeight: 700, color: 'var(--chrome-ink)', background: 'var(--chrome)' }}>
                    PLAY A TALK CARD WITH {them.name.toUpperCase()} ›
                  </button>
                )}
              </CardFrame>

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
