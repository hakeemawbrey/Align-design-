import { memo, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HOUSTON, TEXAS, cityFromSlug, label, stageOf, type City } from './cities'
import { votesLive, type Tally } from './votes'


/** a stable hue per city for its aura panel */
const hue = (slug: string) => { let h = 0; for (const c of slug) h = (h * 31 + c.charCodeAt(0)) % 360; return h }

/** "12s ago", ticking */
function useAgo(at: number | null) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 5000)
    return () => window.clearInterval(id)
  }, [])
  if (!at) return ''
  const s = Math.max(0, Math.round((now - at) / 1000))
  return s < 10 ? 'just now' : s < 60 ? `${s}s ago` : `${Math.round(s / 60)}m ago`
}

/** a number that flashes gold when it changes */
function Count({ n }: { n: number }) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span key={n} initial={{ y: -10, opacity: 0, color: '#f2c75c' }} animate={{ y: 0, opacity: 1, color: 'var(--label-1)' }}
        exit={{ y: 10, opacity: 0 }} transition={{ duration: 0.35, color: { duration: 1.6 } }} style={{ display: 'inline-block' }}>
        {n.toLocaleString()}
      </motion.span>
    </AnimatePresence>
  )
}

interface Props { tally: Tally; mine: City | null; onPick: (c: City) => void }

/** The order cities light in: Houston, then Texas, then the vote, which is open now. `vote` is your pick. */
export const Track = memo(function Track({ tally, vote }: { tally: Tally; vote: City | null }) {
  // the same votes the board counts: cities beyond Texas
  const cast = Object.entries(tally.votes).reduce((n, [s, v]) => (stageOf(s) === 'vote' ? n + v : n), 0)
  return (
    <ol className="track">
      <li className="stop lit">
        <span className="when">Lights first</span>
        <span className="where">{HOUSTON.name}</span>
      </li>
      <li className="stop">
        <span className="when">Locked in next</span>
        <span className="where">Texas</span>
        <span className="tx">{TEXAS.map((c) => <span key={c.slug}>{c.name}</span>)}</span>
      </li>
      <li className={`stop open${vote ? ' on' : ''}`}>
        <span className="when">Then by vote · open now</span>
        <span className="where">{vote ? vote.name : 'Your pick?'}</span>
        <span className="seats"><Count n={cast} /> votes cast</span>
      </li>
    </ol>
  )
})

/**
 * The live race for what lights after Texas, dealt as city cards. `mine` is the city you're
 * voting for; tap a card to vote for it, or the last card to write one in.
 */
function Scoreboard({ tally, mine, onPick, onWriteIn }: Props & { onWriteIn: () => void }) {
  const { votes, live, updatedAt } = tally
  const ago = useAgo(updatedAt)

  const rows = useMemo(() => {
    const race = Object.entries(votes).filter(([s]) => stageOf(s) === 'vote').sort((a, b) => b[1] - a[1])
    const list = race.slice(0, 7)
    // your pick always shows, with your vote counted in
    if (mine && stageOf(mine.slug) === 'vote' && !list.some(([s]) => s === mine.slug)) list.push([mine.slug, votes[mine.slug] ?? 0])
    return list.map(([slug, n]) => ({ city: slug === mine?.slug ? mine : cityFromSlug(slug), n, rank: race.findIndex(([s]) => s === slug) + 1 || race.length + 1 }))
  }, [votes, mine])
  const top = Math.max(1, ...rows.map((r) => r.n))
  const [lead, second] = rows
  const picked = !!mine && rows.some((r) => r.city.slug === mine.slug)

  return (
    <div className="board">
      <div className="board-head">
        <span className={`live${live ? ' on' : ''}`}><i />{live || votesLive ? 'Live' : 'Sample numbers'}</span>
        <span className="fine">
          {live ? `Updated ${ago}` : votesLive ? 'Loading the votes…' : 'Real votes once checkout opens'}
          {lead && second && lead.n > second.n ? ` · ${lead.city.name} leads by ${lead.n - second.n}` : ''}
        </span>
      </div>

      {rows.length === 0 && (live || !votesLive) && <p className="sub" style={{ marginTop: 12 }}>No votes yet. Yours could be the first.</p>}
      <motion.ol layout className="vote-cards" aria-label="Cities in the vote">
        {rows.map(({ city, n, rank }) => {
          const isMine = city.slug === mine?.slug
          const gap = lead && city.slug !== lead.city.slug ? lead.n - n : second ? n - second.n : 0
          return (
            <motion.li layout key={city.slug} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
              <button type="button" aria-pressed={isMine}
                aria-label={`Vote for ${label(city)}, ${rank === 1 ? 'in the lead' : `number ${rank}`}, ${n} votes`}
                className={`vc${isMine ? ' mine' : ''}${rank === 1 ? ' first' : ''}`} onClick={() => onPick(city)}>
                <span className="vc-in" aria-hidden>
                  <span className="vc-head">
                    <span className="vc-name">{city.name}</span>
                    <span className="vc-orb">{city.state || '✦'}</span>
                  </span>
                  {/* the aura panel, in this city's own colour */}
                  <span className="vc-panel grain" style={{ '--h': hue(city.slug) } as React.CSSProperties}>
                    <span className="vc-badge">{isMine ? 'Your vote' : rank === 1 ? '✦ Leading' : `№ ${rank}`}</span>
                    <span className="vc-cap">The city after Texas?</span>
                  </span>
                  <span className="vc-read">
                    <span className="vc-n"><Count n={n} />{isMine && <em>+1</em>}</span>
                    <span className="vc-k">votes</span>
                    <span className="vc-gap">{rank === 1 ? (gap > 0 ? `Leads by ${gap}` : 'In the lead') : `${gap} behind`}</span>
                  </span>
                  <span className="vc-bar"><motion.i animate={{ width: `${(n / top) * 100}%` }} initial={{ width: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} /></span>
                  <span className="vc-foot"><span>Align · № {String(rank).padStart(2, '0')}/∞</span><span>City card</span></span>
                </span>
              </button>
            </motion.li>
          )
        })}
        {/* the write-in card: any city beyond Texas */}
        <li>
          <button type="button" className={`vc write-in${mine && !picked ? ' mine' : ''}`} onClick={onWriteIn}>
            <span className="vc-in">
              <span className="vc-head">
                <span className="vc-name">{mine && !picked ? mine.name : 'Your city'}</span>
                <span className="vc-orb" aria-hidden>+</span>
              </span>
              <span className="vc-panel" aria-hidden>
                <span className="vc-badge">{mine && !picked ? 'Your vote' : 'Write-in'}</span>
                <span className="vc-cap">Any city beyond Texas</span>
              </span>
              <span className="vc-read"><span className="vc-k">Not listed? Write it in</span></span>
              <span className="vc-foot" aria-hidden><span>Align · №  ?/∞</span><span>City card</span></span>
            </span>
          </button>
        </li>
      </motion.ol>
    </div>
  )
}

/** memoised: it only re-renders when the votes or your pick change, not as the page does */
export default memo(Scoreboard)
