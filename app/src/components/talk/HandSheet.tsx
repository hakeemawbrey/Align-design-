import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PACKS, TALK_CARDS, TOPICS, cardById, cardOfTheDay, type TalkCard, type TalkTopic } from '../../data/talkCards'
import { packInfo, type Pull } from '../../lib/talk'
import { talk, useTalk } from '../../lib/talk'
import { useSession } from '../../lib/session'
import { sfx } from '../../lib/sfx'
import TalkCardFace, { TalkCardBack } from './TalkCardFace'
import PackOpen from './PackOpen'
import { PLACES, WHENS } from '../../data/places'

type Tab = 'today' | 'hand' | 'places' | 'packs'

/**
 * Your talk cards, opened from a chat: today's free card, the cards you hold
 * (tap one to play it to your match), and packs to open.
 */
export default function HandSheet({ them, onPlay, onPlace, onBinder, onClose, onUpgrade }: {
  them: string
  onPlay: (cardId: string) => void
  /** play a place card: plan a date there */
  onPlace?: (placeId: string, when: string) => void
  onClose: () => void
  onUpgrade: () => void
  /** open the full binder: packs, sets, season */
  onBinder?: () => void
}) {
  const { owned, packs, places: talkPlaces } = useTalk()
  const { alignPlus } = useSession()
  const [tab, setTab] = useState<Tab>(talk.dailyAvailable() ? 'today' : 'hand')
  const [topic, setTopic] = useState<TalkTopic | 'all'>('all')
  const [opening, setOpening] = useState<{ pack: string; cards: Pull[] } | null>(null)
  const [when, setWhen] = useState(WHENS[0])
  const daily = cardOfTheDay()
  const dailyOpen = talk.dailyAvailable()

  const hand = useMemo(() => owned.map(cardById).filter((c): c is TalkCard => !!c && (topic === 'all' || c.topic === topic)), [owned, topic])
  const play = (id: string) => { sfx.align(); onPlay(id); onClose() }

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
        style={{ position: 'absolute', inset: 0, zIndex: 80, background: 'rgba(5,2,15,0.55)' }} />
      <motion.div
        initial={{ y: 640 }} animate={{ y: 0 }} exit={{ y: 640 }} transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: 640, zIndex: 81, borderRadius: '26px 26px 0 0',
          background: 'linear-gradient(180deg, #24124f, #120a2a)', borderTop: '1px solid rgba(201,182,240,0.35)',
          padding: '12px 24px 0', display: 'flex', flexDirection: 'column',
        }}
      >
        <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(201,182,240,0.4)', margin: '0 auto 12px' }} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="h-display" style={{ fontSize: 26, flex: 1 }}>Your hand</div>
          {onBinder ? (
            <button className="mono" onClick={() => { sfx.tap(); onBinder() }} style={{ height: 30, fontSize: 9, letterSpacing: '0.16em', fontWeight: 700, color: 'var(--chrome-ink)', background: 'var(--chrome)', padding: '0 12px', borderRadius: 999 }}>YOUR BINDER ›</button>
          ) : (
            <span className="mono" style={{ fontSize: 9, letterSpacing: '0.16em', color: 'var(--label-3)' }}>{owned.length} / {TALK_CARDS.length} COLLECTED</span>
          )}
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--label-2)', marginTop: 8 }}>
          Play one to {them}. You both answer, and neither answer shows until you both have.
        </div>

        {/* tabs */}
        <div style={{ marginTop: 14, height: 36, padding: 3, borderRadius: 999, display: 'flex', background: 'rgba(11,6,32,0.5)', border: '1px solid rgba(179,166,196,0.2)' }}>
          {([['today', 'Today'], ['hand', 'Your cards'], ...(onPlace ? [['places', 'Places']] as const : []), ['packs', `Packs${packs.length ? ` · ${packs.length}` : ''}`]] as const).map(([id, label]) => (
            <button key={id} onClick={() => { sfx.tap(); setTab(id) }} style={{ position: 'relative', flex: 1, fontSize: 13, color: tab === id ? 'var(--chrome-ink)' : 'var(--label-2)' }}>
              {tab === id && <motion.span layoutId="hand-tab" transition={{ type: 'spring', stiffness: 420, damping: 34 }} style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'var(--chrome)' }} />}
              <span style={{ position: 'relative' }}>{label}</span>
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: 'auto', marginTop: 14, paddingBottom: 30, scrollbarWidth: 'none' }}>
          {tab === 'today' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <div className="mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--align)' }}>✦ CARD OF THE DAY · FREE ✦</div>
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                <TalkCardFace card={daily} width={164} />
              </motion.div>
              <div style={{ fontSize: 13, color: 'var(--label-2)', textAlign: 'center', padding: '0 20px' }}>
                Everyone on Align gets the same card today. A new one lands at midnight.
              </div>
              <button className="chrome-cta" onClick={() => { if (dailyOpen) talk.claimDaily(); play(daily.id) }}>
                Play it to {them} <span className="spark">✦</span>
              </button>
            </div>
          )}

          {tab === 'hand' && (
            <>
              <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 10, scrollbarWidth: 'none' }}>
                {(['all', ...Object.keys(TOPICS)] as (TalkTopic | 'all')[]).map((k) => (
                  <button key={k} onClick={() => { sfx.tap(); setTopic(k) }} style={{
                    flexShrink: 0, height: 30, padding: '0 12px', borderRadius: 999, fontSize: 12, whiteSpace: 'nowrap',
                    color: topic === k ? 'var(--chrome-ink)' : 'var(--label-1)',
                    background: topic === k ? 'var(--chrome)' : 'rgba(48,32,92,0.6)',
                    border: `1px solid ${k === 'all' ? 'rgba(179,166,196,0.3)' : `${TOPICS[k].color}66`}`,
                  }}>{k === 'all' ? 'All' : `${TOPICS[k].glyph} ${TOPICS[k].label}`}</button>
                ))}
              </div>
              {hand.length ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, justifyItems: 'center' }}>
                  {hand.map((c) => (
                    <motion.button key={c.id} whileTap={{ scale: 0.95 }} whileHover={{ y: -3 }} onClick={() => play(c.id)}>
                      <TalkCardFace card={c} width={102} />
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--label-3)', fontSize: 13, marginTop: 30 }}>No cards here yet. Open a pack.</div>
              )}
            </>
          )}

          {tab === 'places' && onPlace && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {WHENS.map((w) => (
                  <button key={w} onClick={() => { sfx.tap(); setWhen(w) }} style={{
                    flex: 1, height: 30, borderRadius: 999, fontSize: 12, whiteSpace: 'nowrap',
                    color: when === w ? 'var(--chrome-ink)' : 'var(--label-1)', background: when === w ? 'var(--chrome)' : 'rgba(48,32,92,0.6)', border: '1px solid rgba(179,166,196,0.25)',
                  }}>{w}</button>
                ))}
              </div>
              {PLACES.map((p) => (
                <motion.button key={p.id} whileTap={{ scale: 0.98 }} onClick={() => { sfx.align(); onPlace(p.id, when); onClose() }} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 14, textAlign: 'left',
                  background: 'rgba(48,32,92,0.5)', border: `1px solid ${p.partner ? 'rgba(248,237,255,0.4)' : 'rgba(179,166,196,0.2)'}`,
                }}>
                  <span style={{ fontSize: 22, width: 30, textAlign: 'center' }}>{p.emoji}</span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: 14.5, color: 'var(--label-1)' }}>{p.name} <span style={{ fontSize: 11.5, color: 'var(--label-3)' }}>· {p.area}</span></span>
                    <span style={{ display: 'block', fontSize: 12, color: p.partner ? 'var(--label-1)' : 'var(--label-2)', marginTop: 2 }}>
                      {(p.partner || talkPlaces.includes(p.id)) && <span style={{ color: 'var(--align)' }}>✦ </span>}
                      {p.partner ? `Partner · check in for “${p.exclusive}”` : talkPlaces.includes(p.id) ? `Yours · ${p.line}` : p.line}
                    </span>
                  </span>
                </motion.button>
              ))}
            </div>
          )}

          {tab === 'packs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {packs.map((id, i) => {
                const p = packInfo(id)
                return (
                  <PackRow key={`${id}-${i}`} color={p.color} name={p.name} blurb={p.blurb} action="Open"
                    onClick={() => { sfx.sparkle(); setOpening({ pack: id, cards: talk.openPack(id) }) }} />
                )
              })}
              {!alignPlus && (
                <PackRow color={PACKS.afterdark.color} name={PACKS.afterdark.name} blurb={`${PACKS.afterdark.blurb}. With Align+.`} action="Align+" locked
                  onClick={() => { sfx.tap(); onUpgrade() }} />
              )}
              <div style={{ fontSize: 12.5, color: 'var(--label-3)', textAlign: 'center', marginTop: 8, lineHeight: 1.4 }}>
                You get a pack with every new match, and a free card every day. Everything you hold lives in your binder.
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {opening && <PackOpen pack={packInfo(opening.pack)} cards={opening.cards} onDone={() => { setOpening(null); setTab('hand'); setTopic('all') }} />}
      </AnimatePresence>
    </>
  )
}

export function PackRow({ color, name, blurb, action, locked, onClick }: { color: string; name: string; blurb: string; action: string; locked?: boolean; onClick: () => void }) {
  return (
    <motion.button whileTap={{ scale: 0.98 }} onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 14, padding: 12, borderRadius: 16, textAlign: 'left',
      background: 'rgba(48,32,92,0.5)', border: `1px solid ${color}55`, opacity: locked ? 0.8 : 1,
    }}>
      <div style={{ position: 'relative', flexShrink: 0, filter: `drop-shadow(0 0 10px ${color}88)`, opacity: locked ? 0.7 : 1 }}>
        <TalkCardBack width={46} color={color} />
      </div>
      <div style={{ flex: 1 }}>
        <div className="serif italic" style={{ fontSize: 18, color: 'var(--label-1)' }}>{name}</div>
        <div style={{ fontSize: 12.5, color: 'var(--label-2)', marginTop: 2 }}>{blurb}</div>
      </div>
      <span style={{ padding: '7px 14px', borderRadius: 16, fontSize: 13, color: 'var(--chrome-ink)', background: 'var(--chrome)', boxShadow: '0 0 12px rgba(248,237,255,0.45)' }}>{action}</span>
    </motion.button>
  )
}
