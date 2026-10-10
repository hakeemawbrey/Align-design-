import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import ArchetypeCard from '../components/talk/ArchetypeCard'
import PackOpen from '../components/talk/PackOpen'
import { PackRow } from '../components/talk/HandSheet'
import { ARCHETYPES, SIGN_ORDER, VARIANT_LABEL, VARIANT_RARITY, type Variant } from '../data/archetypes'
import { TALK_CARDS, PACKS } from '../data/talkCards'
import { SEASON, NEXT_SEASON, PRINT_RUN, leftOf, minted, fmt } from '../data/seasons'
import { PLACES } from '../data/places'
import { SIGNS } from '../data/signs'
import { ME } from '../data/profiles'
import { packInfo, talk, useTalk, type Pull } from '../lib/talk'
import { useSession } from '../lib/session'
import { sfx } from '../lib/sfx'

type Tab = 'packs' | 'sets' | 'season'
const GOLD = '#f2d58a'
const SHIP = `ship:${SEASON.id}`
const STARTER = 'plus-starter'

/** season pass: one tier per 3 cards collected, 10 tiers */
const TIERS = [
  { free: 'Talk card', plus: 'Season pack' },
  { free: 'Season pack', plus: 'Gilded frame' },
  { free: 'Talk card', plus: 'Season pack' },
  { free: '+20 energy', plus: 'Sign pack' },
  { free: 'Season pack', plus: 'Season pack' },
  { free: 'Talk card', plus: 'Holo card back' },
  { free: '+20 energy', plus: 'Season pack' },
  { free: 'Season pack', plus: 'Private event invite' },
  { free: 'Talk card', plus: 'Sign pack' },
  { free: 'Season badge', plus: 'Mythic Libra, guaranteed' },
]

/**
 * Your collection: packs to open, the sets you're filling, and the season's
 * print runs. Align+ adds a one-time starter box and three real packs shipped
 * every season; scanning the box adds the same packs here.
 */
export default function Collection({ go }: ScreenProps) {
  const t = useTalk()
  const { alignPlus } = useSession()
  const [tab, setTab] = useState<Tab>('packs')
  const [opening, setOpening] = useState<{ pack: string; cards: Pull[] } | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const flash = (m: string) => { setToast(m); window.setTimeout(() => setToast(null), 2200) }
  const open = (id: string) => { sfx.sparkle(); setOpening({ pack: id, cards: talk.openPack(id) }) }
  const total = t.owned.length + t.signs.length + t.venues.length
  const tier = Math.min(TIERS.length, Math.floor(total / 3))

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora="#3a2390" warm="#4a2470" count={60} seed={37} />

      <button aria-label="Back" onClick={() => { sfx.tap(); go('you') }}
        style={{ position: 'absolute', left: 16, top: 56, width: 40, height: 40, display: 'grid', placeItems: 'center', color: 'var(--label-1)', zIndex: 2 }}>
        <svg width="11" height="18" viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 2 2 10l8 8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      <div style={{ position: 'absolute', left: 24, right: 24, top: 100 }}>
        <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--label-2)' }}>
          {SEASON.label.toUpperCase()} · {SEASON.name.toUpperCase()} · DAY {SEASON.day} OF {SEASON.days}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 8 }}>
          <div className="h-display" style={{ fontSize: 32, flex: 1 }}>Collection</div>
          <span className="mono" style={{ fontSize: 9, letterSpacing: '0.16em', color: GOLD }}>{total} CARDS</span>
        </div>
        <div style={{ marginTop: 12, height: 34, padding: 3, borderRadius: 999, display: 'flex', background: 'rgba(11,6,32,0.5)', border: '1px solid rgba(179,166,196,0.2)' }}>
          {([['packs', `Packs${t.packs.length ? ` · ${t.packs.length}` : ''}`], ['sets', 'Sets'], ['season', 'Season']] as const).map(([id, label]) => (
            <button key={id} onClick={() => { sfx.tap(); setTab(id) }} style={{ position: 'relative', flex: 1, fontSize: 13, color: tab === id ? '#1a0f3a' : 'var(--label-2)' }}>
              {tab === id && <motion.span layoutId="col-tab" style={{ position: 'absolute', inset: 0, borderRadius: 999, background: '#f4f0dc' }} />}
              <span style={{ position: 'relative' }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, top: 236, bottom: 0, overflowY: 'auto', padding: '4px 24px 60px', scrollbarWidth: 'none' }}>
        {tab === 'packs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* today's drop */}
            <Panel color={GOLD}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div className="serif italic" style={{ fontSize: 18 }}>Today’s pack drop</div>
                  <div style={{ fontSize: 12.5, color: 'var(--label-2)', marginTop: 2 }}>
                    {alignPlus ? 'Three season packs a day with Align+.' : 'One season pack a day. Align+ gets three.'}
                  </div>
                </div>
                <button className="mono" disabled={!talk.dailyPackAvailable()}
                  onClick={() => { if (talk.claimDailyPack(alignPlus)) { sfx.sparkle(); flash(alignPlus ? '3 packs added' : 'Pack added') } }}
                  style={{ height: 34, padding: '0 14px', borderRadius: 17, fontSize: 10, letterSpacing: '0.14em', fontWeight: 700, color: '#1a0f3a', background: talk.dailyPackAvailable() ? 'var(--gold-foil)' : 'rgba(179,166,196,0.35)' }}>
                  {talk.dailyPackAvailable() ? 'CLAIM' : 'CLAIMED'}
                </button>
              </div>
            </Panel>

            {/* Align+ boxes */}
            {alignPlus ? (
              <Panel color="#9fd8ff">
                <div className="mono" style={{ fontSize: 8.5, letterSpacing: '0.18em', color: '#9fd8ff' }}>ALIGN+ · IN REAL LIFE</div>
                <BoxLine title="Starter box" sub={`Your ${SIGNS[ME.sign].name} pack, the Starter talk deck and a season pack. Once, when you join.`}
                  done={talk.granted(STARTER)} cta="Scan box"
                  onClick={() => { if (talk.grantOnce(STARTER, [`sign:${ME.sign}`, 'starter', 'season'])) { sfx.sparkle(); flash('Starter box scanned · 3 packs') } }} />
                <BoxLine title={`${SEASON.label} box`} sub={`3 packs shipped this season. Delivered Oct 3. Scan the cards to add them here.`}
                  done={talk.granted(SHIP)} cta="Scan cards"
                  onClick={() => { if (talk.grantOnce(SHIP, ['season', 'season', `sign:${SEASON.signs[0]}`])) { sfx.sparkle(); flash('Season box scanned · 3 packs') } }} />
                <div style={{ fontSize: 11.5, color: 'var(--label-3)', marginTop: 8 }}>Next box ships with {NEXT_SEASON.name}, {NEXT_SEASON.starts}.</div>
              </Panel>
            ) : (
              <PackRow color="#9fd8ff" name="Real packs, shipped" action="Align+" locked
                blurb="Align+ ships a starter box when you join, then 3 packs every season. Every card scans in."
                onClick={() => { sfx.tap(); go('paywall') }} />
            )}

            <div className="eyebrow" style={{ fontSize: 9.5, color: 'var(--label-3)', margin: '8px 0 0' }}>Ready to open</div>
            {t.packs.map((id, i) => {
              const p = packInfo(id)
              return <PackRow key={`${id}-${i}`} color={p.color} name={p.name} blurb={p.blurb} action="Open" onClick={() => open(id)} />
            })}
            {!t.packs.length && <div style={{ fontSize: 13, color: 'var(--label-3)', textAlign: 'center', padding: 14 }}>No packs waiting. New matches and the daily drop bring more.</div>}
            {!alignPlus && (
              <PackRow color={PACKS.afterdark.color} name={PACKS.afterdark.name} blurb={`${PACKS.afterdark.blurb}. With Align+.`} action="Align+" locked
                onClick={() => { sfx.tap(); go('paywall') }} />
            )}
          </div>
        )}

        {tab === 'sets' && (
          <>
            <SetHead title="Signs · Myths" got={talk.signSet().length} of={12} note="One archetype for each sign. Print it, trade it, frame it." />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, justifyItems: 'center' }}>
              {SIGN_ORDER.map((s) => {
                const mine = t.signs.filter((o) => o.sign === s)
                const best = (['mythic', 'gilded', 'base'] as Variant[]).find((v) => mine.some((o) => o.variant === v))
                return (
                  <div key={s} style={{ position: 'relative' }}>
                    <ArchetypeCard sign={s} variant={best ?? 'base'} width={74} dim={!best} edition={false} />
                    {mine.length > 1 && <span className="mono" style={{ position: 'absolute', top: -5, right: -5, minWidth: 18, height: 18, borderRadius: 9, fontSize: 9, fontWeight: 700, display: 'grid', placeItems: 'center', background: GOLD, color: '#1a0f3a' }}>×{mine.length}</span>}
                  </div>
                )
              })}
            </div>
            <SetHead title="Talk cards" got={t.owned.length} of={TALK_CARDS.length} note="Play them in chat. Both answer, neither shows until you both have." />
            <Bar v={t.owned.length / TALK_CARDS.length} color="#b18cff" />
            <SetHead title="Places · Houston" got={t.venues.length} of={PLACES.filter((p) => p.partner).length} note="Check in at a partner place on a date for its card. Only there." />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {PLACES.filter((p) => p.partner).map((p) => (
                <span key={p.id} style={{ fontSize: 12, padding: '5px 10px', borderRadius: 12, color: t.venues.includes(p.id) ? '#1a0f3a' : 'var(--label-2)', background: t.venues.includes(p.id) ? GOLD : 'rgba(48,32,92,0.6)', border: '1px solid rgba(242,213,138,0.3)' }}>
                  {p.emoji} {p.name}
                </span>
              ))}
            </div>
          </>
        )}

        {tab === 'season' && (
          <>
            <Panel color="#9fd8ff">
              <div className="serif italic" style={{ fontSize: 20 }}>{SEASON.name}</div>
              <div style={{ fontSize: 12.5, color: 'var(--label-2)', marginTop: 3, lineHeight: 1.4 }}>
                {SEASON.start} to {SEASON.end}. Each card is printed in a numbered run, online and in real life together. When a run is gone it’s gone. Trade any time.
              </div>
              <div style={{ marginTop: 10 }}><Bar v={SEASON.day / SEASON.days} color="#9fd8ff" /></div>
              <div className="mono" style={{ marginTop: 6, fontSize: 8.5, letterSpacing: '0.14em', color: 'var(--label-3)' }}>{SEASON.days - SEASON.day} DAYS LEFT · THEN {NEXT_SEASON.name.toUpperCase()}</div>
            </Panel>

            <div className="eyebrow" style={{ fontSize: 9.5, color: 'var(--label-3)', margin: '16px 0 8px' }}>Print runs · left this season</div>
            {SEASON.signs.map((s) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderTop: '1px solid rgba(179,166,196,0.12)' }}>
                <ArchetypeCard sign={s} width={40} edition={false} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14 }}>{SIGNS[s].name} · <span className="serif italic">{ARCHETYPES[s].title}</span></div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                    {(['base', 'gilded', 'mythic'] as Variant[]).map((v) => {
                      const r = VARIANT_RARITY[v]; const id = `${s}:${v}:${SEASON.id}`
                      return (
                        <span key={v} className="mono" style={{ fontSize: 8.5, letterSpacing: '0.08em', color: v === 'mythic' ? '#ff9ad8' : v === 'gilded' ? GOLD : 'var(--label-2)' }}>
                          {VARIANT_LABEL[v].toUpperCase()} {fmt(leftOf(id, r))}/{fmt(PRINT_RUN[r])}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
            <div style={{ fontSize: 11.5, color: 'var(--label-3)', marginTop: 6 }}>
              {fmt(minted(`libra:mythic:${SEASON.id}`, 'legendary'))} of 50 Mythic Libras are already out.
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', margin: '18px 0 8px' }}>
              <span className="eyebrow" style={{ fontSize: 9.5, color: 'var(--label-3)', flex: 1 }}>Season pass · tier {tier} of {TIERS.length}</span>
              <span className="mono" style={{ fontSize: 8.5, color: 'var(--label-3)', letterSpacing: '0.12em' }}>1 TIER PER 3 CARDS</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '34px 1fr 1fr', gap: 6, fontSize: 12 }}>
              <span />
              <span className="mono" style={{ fontSize: 8.5, letterSpacing: '0.14em', color: 'var(--label-2)' }}>FREE</span>
              <span className="mono" style={{ fontSize: 8.5, letterSpacing: '0.14em', color: GOLD }}>ALIGN+ ✦</span>
              {TIERS.map((r, i) => {
                const got = i < tier
                return [
                  <span key={`n${i}`} className="mono" style={{ fontSize: 10, color: got ? GOLD : 'var(--label-4)', alignSelf: 'center' }}>{i + 1}</span>,
                  <Cell key={`f${i}`} got={got}>{r.free}</Cell>,
                  <Cell key={`p${i}`} got={got && alignPlus} locked={!alignPlus} gold>{r.plus}</Cell>,
                ]
              })}
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ position: 'absolute', left: 0, right: 0, bottom: 48, display: 'flex', justifyContent: 'center', zIndex: 90, pointerEvents: 'none' }}>
            <div style={{ padding: '10px 16px', borderRadius: 999, fontSize: 13.5, background: 'rgba(36,20,76,0.95)', border: `1px solid ${GOLD}66` }}>{toast}</div>
          </motion.div>
        )}
        {opening && <PackOpen pack={packInfo(opening.pack)} cards={opening.cards} onDone={() => { setOpening(null); setTab('sets') }} />}
      </AnimatePresence>
    </div>
  )
}

function Panel({ color, children }: { color: string; children: React.ReactNode }) {
  return <div style={{ padding: 14, borderRadius: 16, background: 'rgba(40,26,78,0.75)', border: `1px solid ${color}55` }}>{children}</div>
}

function BoxLine({ title, sub, done, cta, onClick }: { title: string; sub: string; done: boolean; cta: string; onClick: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14.5 }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--label-2)', marginTop: 2, lineHeight: 1.35 }}>{sub}</div>
      </div>
      <button className="mono" disabled={done} onClick={onClick}
        style={{ height: 32, padding: '0 12px', borderRadius: 16, fontSize: 9.5, letterSpacing: '0.12em', fontWeight: 700, whiteSpace: 'nowrap', color: done ? 'var(--label-2)' : '#1a0f3a', background: done ? 'rgba(179,166,196,0.2)' : '#9fd8ff' }}>
        {done ? 'ADDED ✓' : cta.toUpperCase()}
      </button>
    </div>
  )
}

function SetHead({ title, got, of, note }: { title: string; got: number; of: number; note: string }) {
  return (
    <div style={{ margin: '18px 0 10px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <span className="serif italic" style={{ fontSize: 19, flex: 1 }}>{title}</span>
        <span className="mono" style={{ fontSize: 9, letterSpacing: '0.14em', color: GOLD }}>{Math.min(got, of)} / {of}</span>
      </div>
      <div style={{ fontSize: 12, color: 'var(--label-3)', marginTop: 2 }}>{note}</div>
    </div>
  )
}

function Bar({ v, color }: { v: number; color: string }) {
  return (
    <div style={{ height: 6, borderRadius: 3, background: 'rgba(179,166,196,0.18)', overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(1, v) * 100}%`, height: '100%', background: color, borderRadius: 3 }} />
    </div>
  )
}

function Cell({ got, locked, gold, children }: { got: boolean; locked?: boolean; gold?: boolean; children: React.ReactNode }) {
  return (
    <div style={{
      padding: '7px 9px', borderRadius: 10, fontSize: 11.5, lineHeight: 1.25,
      color: got ? '#1a0f3a' : locked ? 'var(--label-3)' : 'var(--label-1)',
      background: got ? (gold ? 'var(--gold-foil)' : '#f4f0dc') : 'rgba(48,32,92,0.55)',
      border: `1px solid ${gold ? 'rgba(242,213,138,0.3)' : 'rgba(179,166,196,0.18)'}`,
    }}>{got ? '✓ ' : locked ? '🔒 ' : ''}{children}</div>
  )
}
