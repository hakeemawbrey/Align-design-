import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import RevealStyles from '@app/components/reveal/RevealStyles'
import FlipCard, { FLIP_H, FLIP_W } from './FlipCard'
import { ALL_CITIES, HOUSTON, TEXAS, VOTE_CITIES, cityFromSlug, label, parseCity, stageOf, type City } from './cities'
import { checkoutReady, checkoutUrl, useVotes, votesLive, type Votes } from './votes'

/** card size: as big as the screen allows, never past 1.1× */
function useCardScale() {
  const fit = () => {
    const w = window.innerWidth, h = window.innerHeight
    if (w >= 900) return Math.min(1.1, (h - 150) / FLIP_H)
    // phones: headline, card and the button in one screen
    return Math.max(0.6, Math.min(1, (w - 40) / FLIP_W, (h - 330) / FLIP_H))
  }
  const [s, setS] = useState(fit)
  useEffect(() => {
    const on = () => setS(fit())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return s
}

const count = (v: Votes | null, slugs: string[]) => (v ? slugs.reduce((n, s) => n + (v[s] ?? 0), 0) : null)
const seats = (n: number | null) => (n == null ? '' : `${n.toLocaleString()} ${n === 1 ? 'seat' : 'seats'}`)

export default function Site() {
  const scale = useCardScale()
  const votes = useVotes()
  const [revealed, setRevealed] = useState(false)
  const [cityText, setCityText] = useState('')
  const [email, setEmail] = useState('')
  const city = parseCity(cityText)

  // back from Stripe on ?paid=1; the city was remembered on the way out
  const [paid] = useState(() => {
    if (!new URLSearchParams(window.location.search).get('paid')) return null
    let slug: string | null = null
    try { slug = sessionStorage.getItem('align-vote') } catch { /* private mode */ }
    return slug ? cityFromSlug(slug) : null
  })
  useEffect(() => {
    if (!paid) return
    window.history.replaceState(null, '', window.location.pathname)
    void confetti({ particleCount: 90, spread: 70, origin: { y: 0.2 }, colors: ['#f2c75c', '#fff4cf', '#c9b6f0', '#9a7be0'] })
  }, [paid])

  const pick = (c: City) => {
    setCityText(label(c))
    document.getElementById('join')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const pay = () => {
    if (!city) return
    const url = checkoutUrl(city.slug, email.trim())
    if (!url) return
    try { sessionStorage.setItem('align-vote', city.slug) } catch { /* private mode */ }
    window.location.href = url
  }

  return (
    <>
      <RevealStyles />
      <div className="stars" aria-hidden />

      <AnimatePresence>
        {paid && (
          <motion.div className="thanks" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status">
            <span style={{ color: 'var(--align)' }}>✦</span>
            <span>You’re in. One vote for <b>{label(paid)}</b>. We’ll email you the night it lights.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="wrap">
        <nav className="nav">
          <a className="wordmark" href="#top">Align <span className="spark">✦</span></a>
          <a className="nav-cta" href="#join">Beta · $15</a>
        </nav>

        {/* hero: the card does the explaining */}
        <header className="hero" id="top">
          <div className="hero-copy">
            <span className="eyebrow" style={{ marginBottom: 0 }}>A dating app played as a card game</span>
            <h1>Fall for the chart. The face comes after.</h1>
          </div>

          <div className="card-col">
            <FlipCard scale={scale} onFlip={setRevealed} />
            <div className="flip-hint" aria-live="polite">
              {revealed ? 'Once you both align · tap to turn back' : 'In your deck tonight · tap to flip'}
            </div>
          </div>

          <div className="cta-block">
            <p className="lede">Every night you’re dealt cards: sign, moon, how you’d pull and push. No photos. When you both align, the card flips.</p>
            <a className="chrome-cta" href="#join">Join the beta · $15 <span className="spark">✦</span></a>
            <span className="fine">Houston first · your $15 is your city’s vote</span>
          </div>
        </header>
      </div>

      {/* where it lights, in order */}
      <section className="wrap" id="rollout">
        <span className="eyebrow">The rollout</span>
        <h2>Houston first. Texas next.<br />Then you choose.</h2>
        <div className="road">
          <div className="stop lit">
            <span className="tag" style={{ color: 'var(--align)' }}>First</span>
            <div className="n">01</div>
            <div className="t">Houston</div>
            <div className="d">The beta opens here first.{votes && <> {seats(count(votes, [HOUSTON.slug]))} so far.</>}</div>
          </div>
          <div className="stop">
            <span className="tag" style={{ color: '#c9b6f0' }}>Locked in</span>
            <div className="n">02</div>
            <div className="t">Texas</div>
            <div className="d">{TEXAS.map((c) => c.name).join(', ')}. Lights right after Houston.</div>
          </div>
          <div className="stop">
            <span className="tag" style={{ color: 'var(--spark)' }}>Your vote</span>
            <div className="n">03</div>
            <div className="t">Your city</div>
            <div className="d">Every beta seat is one vote. The city with the most lights after Texas.</div>
          </div>
        </div>
      </section>

      {/* pay + vote */}
      <section className="wrap" id="join">
        <span className="eyebrow">The beta</span>
        <h2>One seat. One vote.</h2>
        <p className="sub">Same price everywhere. Pick your city: if it’s Houston or Texas you’re early, anywhere else your $15 pushes it up the board.</p>

        <div className="join">
          <form className="panel" onSubmit={(e) => { e.preventDefault(); pay() }}>
            <div className="price"><b>$15</b><span className="fine">once</span></div>
            <ul className="gets">
              <li>Beta access the night your city lights</li>
              <li>Align+ for life, at no extra cost</li>
              <li>A numbered founding member card</li>
              <li>One vote for your city</li>
            </ul>
            <label className="field">
              <span>Your city</span>
              <input list="cities" value={cityText} onChange={(e) => setCityText(e.target.value)} placeholder="Houston, TX" autoComplete="address-level2" required />
              <datalist id="cities">{ALL_CITIES.map((c) => <option key={c.slug} value={label(c)} />)}</datalist>
            </label>
            <label className="field">
              <span>Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" autoComplete="email" required />
            </label>
            <button className="chrome-cta" type="submit" disabled={!city || !checkoutReady} style={{ width: '100%', marginTop: 6 }}>
              {city ? `Pay $15 · vote ${city.name}` : 'Pay $15 · cast your vote'} <span className="spark">✦</span>
            </button>
            <p className="note" aria-live="polite">
              {!checkoutReady ? 'Checkout opens soon.' : city ? <StageNote city={city} /> : 'Secure checkout with Stripe.'}
            </p>
          </form>

          <Board votes={votes} mine={city} onPick={pick} />
        </div>
      </section>

      <section className="wrap" id="faq">
        <span className="eyebrow">Questions</span>
        <h2>The short version.</h2>
        <div className="faq">
          <details>
            <summary>Why pay for a beta?</summary>
            <p>A deck only works when enough people in one city are in it. Paying seats are real people who’ll show up, and they tell us where to go next.</p>
          </details>
          <details>
            <summary>My city isn’t next. Now what?</summary>
            <p>Your seat is held and your vote stays on the board until your city lights. The more people you bring, the sooner it does.</p>
          </details>
          <details>
            <summary>How does the card flip work?</summary>
            <p>Strangers see your mystery card: your chart, your reading, a line about you, no photo. Align on each other and you both see the full card, face and all.</p>
          </details>
        </div>
      </section>

      <footer className="wrap">
        <span className="serif italic" style={{ fontSize: 18, color: 'var(--label-2)' }}>Align ✦</span>
        <span>© 2026 Align · 18+</span>
      </footer>
    </>
  )
}

function StageNote({ city }: { city: City }) {
  const stage = stageOf(city.slug)
  if (stage === 'first') return <>Houston is first. <b>You’re in the opening deck.</b></>
  if (stage === 'texas') return <>{city.name} is <b>locked in next</b>, right after Houston.</>
  return <>Your $15 is <b>one vote for {city.name}</b> to light after Texas.</>
}

/** the race for after Texas */
function Board({ votes, mine, onPick }: { votes: Votes | null; mine: City | null; onPick: (c: City) => void }) {
  const rows = useMemo(() => {
    const race = new Map<string, number>()
    if (votes) for (const [slug, n] of Object.entries(votes)) if (stageOf(slug) === 'vote') race.set(slug, n)
    // with no tally yet, list the usual contenders so there's something to pick
    if (!votes) VOTE_CITIES.slice(0, 6).forEach((c) => race.set(c.slug, 0))
    const list = [...race].sort((a, b) => b[1] - a[1]).slice(0, 7)
    if (mine && stageOf(mine.slug) === 'vote' && !list.some(([s]) => s === mine.slug)) list.push([mine.slug, race.get(mine.slug) ?? 0])
    return list.map(([slug, n]) => ({ city: slug === mine?.slug ? mine : cityFromSlug(slug), n }))
  }, [votes, mine])
  const top = Math.max(1, ...rows.map((r) => r.n))

  return (
    <div className="panel">
      <span className="eyebrow">After Texas · the vote</span>
      {rows.length === 0 && <p className="sub" style={{ marginTop: 0 }}>No votes yet. Yours could be the first.</p>}
      {rows.map(({ city, n }, i) => {
        const isMine = city.slug === mine?.slug
        return (
          <button key={city.slug} type="button" className={`board-row${isMine ? ' mine' : ''}`} onClick={() => onPick(city)}>
            <span className="rank">{String(i + 1).padStart(2, '0')}</span>
            <span className="nm">{label(city)}</span>
            <span className="ct">{votesLive && votes ? `${n}${isMine ? ' + you' : ''}` : isMine ? '+ you' : ''}</span>
            {votesLive && votes && (
              <span className="bar"><motion.i initial={{ width: 0 }} whileInView={{ width: `${(n / top) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.05 }} /></span>
            )}
          </button>
        )
      })}
      <p className="fine" style={{ marginTop: 14 }}>{votesLive ? 'Live count · one paid seat, one vote' : 'Tap a city to vote for it'}</p>
    </div>
  )
}
