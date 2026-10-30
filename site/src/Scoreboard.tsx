import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HOUSTON, cityFromSlug, label, stageOf, type City } from './cities'
import type { Tally } from './votes'

const sum = (v: Record<string, number>, slugs: string[]) => slugs.reduce((n, s) => n + (v[s] ?? 0), 0)

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

/** The live board: seats so far, then the race for what lights after Texas. */
export default function Scoreboard({ tally, mine, onPick }: { tally: Tally; mine: City | null; onPick: (c: City) => void }) {
  const { votes, live, updatedAt } = tally
  const ago = useAgo(updatedAt)

  const total = Object.values(votes).reduce((a, b) => a + b, 0)
  const houston = sum(votes, [HOUSTON.slug])
  const texas = Object.entries(votes).filter(([s]) => stageOf(s) === 'texas').reduce((n, [, v]) => n + v, 0)

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
        <span className={`live${live ? ' on' : ''}`}><i />{live ? 'Live' : 'Sample'}</span>
        <span className="fine">{live ? `Updated ${ago}` : 'Real numbers once checkout opens'}</span>
      </div>

      <div className="stats">
        <div><b><Count n={total} /></b><span>Seats</span></div>
        <div><b><Count n={houston} /></b><span>Houston</span></div>
        <div><b><Count n={texas} /></b><span>Texas</span></div>
      </div>

      <div className="race-head">
        <span className="eyebrow" style={{ margin: 0 }}>After Texas</span>
        {lead && second && lead.n > second.n && <span className="fine">{lead.city.name} leads by {lead.n - second.n}</span>}
      </div>

      {rows.length === 0 && <p className="sub" style={{ marginTop: 4 }}>No votes yet. Yours could be the first.</p>}
      <motion.ol layout className="race">
        {rows.map(({ city, n, rank }) => {
          const isMine = city.slug === mine?.slug
          return (
            <motion.li layout key={city.slug} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
              <button type="button" className={`board-row${isMine ? ' mine' : ''}${rank === 1 ? ' first' : ''}`} onClick={() => onPick(city)}>
                <span className="rank">{rank === 1 ? '✦' : String(rank).padStart(2, '0')}</span>
                <span className="nm">{label(city)}</span>
                <span className="ct"><Count n={n} />{isMine && <em> +1</em>}</span>
                <span className="bar"><motion.i animate={{ width: `${(n / top) * 100}%` }} initial={{ width: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} /></span>
              </button>
            </motion.li>
          )
        })}
      </motion.ol>
      <p className="fine" style={{ marginTop: 14 }}>One paid seat, one vote · tap a city to back it</p>
    </div>
  )
}
