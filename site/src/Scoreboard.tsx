import { memo, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HOUSTON, TEXAS, cityFromSlug, label, stageOf, type City } from './cities'
import type { Tally } from './votes'


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
  const cast = Object.values(tally.votes).reduce((n, v) => n + v, 0)
  return (
    <ol className="track">
      <li className="stop lit">
        <span className="when">Opens first</span>
        <span className="where">{HOUSTON.name}</span>
      </li>
      <li className="stop">
        <span className="when">Locked in next</span>
        <span className="where">Texas</span>
        <span className="tx">{TEXAS.map((c) => <span key={c.slug}>{c.name}</span>)}</span>
      </li>
      <li className={`stop open${vote ? ' on' : ''}`}>
        <span className="when">Then, by vote · voting now</span>
        <span className="where">{vote ? vote.name : 'Your pick?'}</span>
        <span className="seats"><Count n={cast} /> votes cast</span>
      </li>
    </ol>
  )
})

/** The live race for what lights after Texas. `mine` is the city you're voting for; tap a row to vote for it. */
function Scoreboard({ tally, mine, onPick }: Props) {
  const { votes, live, updatedAt } = tally
  const ago = useAgo(updatedAt)

  const rows = useMemo(() => {
    const race = Object.entries(votes).filter(([s]) => stageOf(s) === 'vote').sort((a, b) => b[1] - a[1])
    const list = race.slice(0, 8)
    // your pick always shows, with your vote counted in
    if (mine && stageOf(mine.slug) === 'vote' && !list.some(([s]) => s === mine.slug)) list.push([mine.slug, votes[mine.slug] ?? 0])
    return list.map(([slug, n]) => ({ city: slug === mine?.slug ? mine : cityFromSlug(slug), n, rank: race.findIndex(([s]) => s === slug) + 1 || race.length + 1 }))
  }, [votes, mine])
  const top = Math.max(1, ...rows.map((r) => r.n))
  const [lead, second] = rows

  return (
    <div className="board">
      <div className="board-head">
        <span className={`live${live ? ' on' : ''}`}><i />{live ? 'Live' : 'Sample numbers'}</span>
        <span className="fine">
          {live ? `Updated ${ago}` : 'Real votes once checkout opens'}
        </span>
      </div>

      {rows.length === 0 && <p className="sub" style={{ marginTop: 12 }}>No votes yet. Yours could be the first.</p>}
      <motion.ol layout className="race">
        {rows.map(({ city, n, rank }) => {
          const isMine = city.slug === mine?.slug
          return (
            <motion.li layout key={city.slug} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
              <button type="button" aria-pressed={isMine} className={`board-row${isMine ? ' mine' : ''}${rank === 1 ? ' first' : ''}`} onClick={() => onPick(city)}>
                <span className="rank">{rank === 1 ? '✦' : rank}</span>
                <span className="nm">{label(city)}</span>
                <span className="ct"><Count n={n} />{isMine && <em>+1</em>}</span>
                <span className="bar"><motion.i animate={{ width: `${(n / top) * 100}%` }} initial={{ width: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} /></span>
              </button>
            </motion.li>
          )
        })}
      </motion.ol>
      <p className="fine board-foot">
        {lead && second && lead.n > second.n ? `${lead.city.name} leads by ${lead.n - second.n} · ` : ''}Not listed? Type it in.
      </p>
    </div>
  )
}

/** memoised: it only re-renders when the votes or your pick change, not as the page does */
export default memo(Scoreboard)
