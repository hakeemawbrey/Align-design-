import { motion } from 'framer-motion'
import type { Place } from '../../data/places'
import { sfx } from '../../lib/sfx'

const GOLD = '#f2d58a'

/**
 * A place played in chat: where, when, and whether you're both in. Once you
 * both say yes it's a date; at a partner place you can check in together
 * for the card you only get there.
 */
export default function ChatPlaceCard({ place, when, playedByMe, mine, theirs, checkedIn, them, onRsvp, onCheckin }: {
  place: Place; when: string; playedByMe: boolean
  mine?: boolean; theirs?: boolean; checkedIn: boolean; them: string
  onRsvp: (yes: boolean) => void; onCheckin: () => void
}) {
  const both = mine === true && theirs === true
  const no = mine === false || theirs === false
  return (
    <motion.div initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      style={{ display: 'flex', justifyContent: playedByMe ? 'flex-end' : 'flex-start', margin: '10px 0' }}>
      <div style={{
        width: 248, borderRadius: 18, overflow: 'hidden',
        background: 'linear-gradient(170deg, rgba(58,36,112,0.95), rgba(26,14,58,0.95))',
        border: `1px solid ${place.partner ? `${GOLD}88` : 'rgba(179,166,196,0.3)'}`,
        boxShadow: place.partner ? '0 0 18px rgba(242,213,138,0.15)' : undefined,
      }}>
        <div style={{ padding: '12px 14px 10px', display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, display: 'grid', placeItems: 'center', fontSize: 22, background: 'rgba(11,6,32,0.5)', border: `1px solid ${GOLD}44` }}>{place.emoji}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="mono" style={{ fontSize: 8, letterSpacing: '0.18em', color: place.partner ? GOLD : 'var(--label-3)' }}>
              {place.partner ? '✦ ALIGN PARTNER' : 'PLACE CARD'} · {place.area.toUpperCase()}
            </div>
            <div className="serif italic" style={{ fontSize: 18, lineHeight: 1.15, marginTop: 2 }}>{place.name}</div>
          </div>
        </div>
        <div style={{ padding: '0 14px 10px', fontSize: 12.5, color: 'var(--label-2)', lineHeight: 1.35 }}>
          {place.line} <span style={{ color: 'var(--label-1)' }}>{when}?</span>
          {place.perk && <div style={{ marginTop: 6, fontSize: 11.5, color: GOLD }}>{place.perk}</div>}
        </div>
        <div style={{ borderTop: '1px solid rgba(179,166,196,0.16)', padding: '9px 14px 11px' }}>
          {both ? (
            checkedIn ? (
              <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.14em', color: GOLD, textAlign: 'center' }}>✦ CHECKED IN · {place.exclusive?.toUpperCase() ?? 'DATE DONE'} ADDED ✦</div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ flex: 1, fontSize: 13 }}>It’s a date. {when}.</span>
                {place.partner && (
                  <button className="mono" onClick={() => { sfx.sparkle(); onCheckin() }}
                    style={{ height: 30, padding: '0 11px', borderRadius: 15, fontSize: 9, letterSpacing: '0.12em', fontWeight: 700, color: '#1a0f3a', background: 'var(--gold-foil)' }}>
                    CHECK IN
                  </button>
                )}
              </div>
            )
          ) : no ? (
            <div style={{ fontSize: 12.5, color: 'var(--label-3)' }}>Not this one. Try another place or night.</div>
          ) : mine === undefined ? (
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => { sfx.tap(); onRsvp(true) }} style={{ flex: 1, height: 32, borderRadius: 16, fontSize: 13, color: '#1a0f3a', background: '#f4f0dc' }}>I’m in</button>
              <button onClick={() => { sfx.tap(); onRsvp(false) }} style={{ flex: 1, height: 32, borderRadius: 16, fontSize: 13, color: 'var(--label-1)', border: '1px solid rgba(179,166,196,0.35)' }}>Another time</button>
            </div>
          ) : (
            <div style={{ fontSize: 12.5, color: 'var(--label-3)' }}>You’re in. Waiting on {them}…</div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
