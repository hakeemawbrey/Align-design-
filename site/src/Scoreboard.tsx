import { memo, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HOUSTON, TEXAS, cityFromSlug, label, stageOf, type City } from './cities'
import { votesLive, type Tally } from './votes'


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

/**
 * Where things stand: Houston and Texas locked in, then the live race for what lights after
 * Texas. `mine` is the city you're voting for; tap a row to vote for it, or the last to write one in.
 */
function Scoreboard({ tally, mine, onPick, onWriteIn }: Props & { onWriteIn: () => void }) {
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
      <ol className="vlist">
        {/* locked in: Houston, then Texas */}
        <li className="vrow locked">
          <span className="vr-rank" aria-hidden>✦</span>
          <span className="vr-city">{label(HOUSTON)}<small>Lights first</small></span>
          <span className="vr-lock">Locked in</span>
        </li>
        {TEXAS.map((c) => (
          <li key={c.slug} className="vrow locked">
            <span className="vr-rank" aria-hidden>TX</span>
            <span className="vr-city">{label(c)}<small>Locked in next</small></span>
            <span className="vr-lock">Locked in</span>
          </li>
        ))}
      </ol>

      <p className="vlist-label">After Texas · the vote</p>
      <motion.ol layout className="vlist">
        {rows.map(({ city, n, rank }) => {
          const isMine = city.slug === mine?.slug
          return (
            <motion.li layout key={city.slug} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
              <button type="button" aria-pressed={isMine}
                aria-label={`Vote for ${label(city)}, ${rank === 1 ? 'in the lead' : `number ${rank}`}, ${n} votes`}
                className={`vrow${isMine ? ' mine' : ''}${rank === 1 ? ' first' : ''}`} onClick={() => onPick(city)}>
                <span className="vr-rank" aria-hidden>{rank}</span>
                <span className="vr-city">{label(city)}{isMine && <small>Your vote</small>}</span>
                <span className="vr-n"><Count n={n} />{isMine && <em>+1</em>}<small>votes</small></span>
                <span className="vr-bar" aria-hidden><motion.i animate={{ width: `${(n / top) * 100}%` }} initial={{ width: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} /></span>
              </button>
            </motion.li>
          )
        })}
        <li>
          <button type="button" className={`vrow write-in${mine && !picked ? ' mine' : ''}`} onClick={onWriteIn}>
            <span className="vr-rank" aria-hidden>+</span>
            <span className="vr-city">{mine && !picked ? label(mine) : 'Your city'}<small>{mine && !picked ? 'Your vote' : 'Not listed? Write it in'}</small></span>
          </button>
        </li>
      </motion.ol>
    </div>
  )
}

/** memoised: it only re-renders when the votes or your pick change, not as the page does */
export default memo(Scoreboard)
