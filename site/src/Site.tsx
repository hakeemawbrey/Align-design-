import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import RevealStyles from '@app/components/reveal/RevealStyles'
import FlipCard, { FLIP_H, FLIP_W } from './FlipCard'
import Scoreboard, { Track } from './Scoreboard'
import { ALL_CITIES, cityFromSlug, label, parseCity, stageOf, type City } from './cities'
import { checkoutReady, checkoutUrl, useVotes } from './votes'

/** card size: as big as the screen allows, never past 1.1× */
function useCardScale() {
  const fit = () => {
    const w = window.innerWidth, h = window.innerHeight
    if (w >= 900) return Math.min(1.1, (h - 150) / FLIP_H)
    // phones: headline, line, card and button all on the first screen
    return Math.max(0.55, Math.min(0.8, (w * 0.68) / FLIP_W, (h - 360) / FLIP_H))
  }
  const [s, setS] = useState(fit)
  useEffect(() => {
    const on = () => setS(fit())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return s
}

export default function Site() {
  const scale = useCardScale()
  const tally = useVotes()
  const [, setRevealed] = useState(false)
  const [caption, setCaption] = useState('Dealing tonight’s deck')
  const [replay, setReplay] = useState<(() => void) | null>(null)
  const [cityText, setCityText] = useState('')
  const [email, setEmail] = useState('')
  const city = parseCity(cityText)
  const emailRef = useRef<HTMLInputElement>(null)

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

  // phones: a pay bar rides along once the hero button is gone, until the ballot is on screen
  const [bar, setBar] = useState(false)
  useEffect(() => {
    const hero = document.getElementById('hero-cta')
    const ballot = document.getElementById('ballot')
    if (!hero || !ballot) return
    const check = () => {
      const h = hero.getBoundingClientRect(), b = ballot.getBoundingClientRect()
      setBar(h.bottom < 0 && (b.top > window.innerHeight - 80 || b.bottom < 0))
    }
    const io = new IntersectionObserver(check, { threshold: [0, 0.25, 1] })
    io.observe(hero)
    io.observe(ballot)
    window.addEventListener('scroll', check, { passive: true })
    return () => { io.disconnect(); window.removeEventListener('scroll', check) }
  }, [])

  const toBallot = () => {
    const b = document.getElementById('ballot')
    if (!b) return
    const r = b.getBoundingClientRect()
    // desktop keeps the ballot beside the board; only scroll when it's off screen
    if (r.top < 0 || r.bottom > window.innerHeight) b.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const pick = (c: City) => {
    setCityText(label(c))
    toBallot()
    if (!email) window.setTimeout(() => emailRef.current?.focus({ preventScroll: true }), 450)
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
          <a className="nav-cta" href="#vote">Beta · $15</a>
        </nav>

        <header className="hero" id="top">
          <div className="hero-copy">
            <h1>Fall for who they are, not what they look like.</h1>
            <p className="lede">Align matches you by zodiac. Photos stay hidden until you both align.</p>
          </div>

          <div className="card-col">
            <FlipCard scale={scale} onFlip={setRevealed} onCaption={setCaption} onReplay={(fn) => setReplay(() => fn)} />
            <div className="flip-hint" aria-live="polite">
              {caption}
              {replay && <button type="button" className="deal-again" onClick={replay}>↻ Deal again</button>}
            </div>
          </div>

          <div className="cta-block">
            <a className="chrome-cta" id="hero-cta" href="#vote">Get your seat · $15 <span className="spark">✦</span></a>
            <span className="fine">Houston first · Texas next · then you vote</span>
          </div>
        </header>
      </div>

      {/* the vote: where it lights, the race, and the ballot, in one place */}
      <section className="wrap vote" id="vote">
        <div className="vote-head">
          <span className="eyebrow">The beta is the vote</span>
          <h2>Which city lights after Texas?</h2>
          <p className="sub">$15 buys one seat, and one seat is one vote for your city. Same price everywhere.</p>
        </div>

        <Track tally={tally} mine={city} onPick={pick} />

        <div className="vote-grid">
          <Scoreboard tally={tally} mine={city} onPick={pick} />

          <form className="ballot" id="ballot" onSubmit={(e) => { e.preventDefault(); pay() }}>
            <div className="ballot-top">
              <span className="eyebrow" style={{ margin: 0 }}>Your seat</span>
              <span className="price"><b>$15</b> once</span>
            </div>

            <label className="city-field">
              <span className="sr">Your city</span>
              <input id="city" list="cities" enterKeyHint="next" value={cityText} onChange={(e) => setCityText(e.target.value)}
                placeholder="Your city" autoComplete="address-level2" required />
              <datalist id="cities">{ALL_CITIES.map((c) => <option key={c.slug} value={label(c)} />)}</datalist>
            </label>
            <p className="note" aria-live="polite">{city ? <StageNote city={city} /> : 'Tap a city on the board, or type yours.'}</p>

            <label className="field">
              <span>Email</span>
              <input ref={emailRef} id="email" type="email" inputMode="email" enterKeyHint="go" autoCapitalize="off" spellCheck={false}
                value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" autoComplete="email" required />
            </label>

            <button className="chrome-cta" type="submit" disabled={!city || !checkoutReady}>
              {city ? `Pay $15 · vote ${city.name}` : 'Pay $15 · cast your vote'} <span className="spark">✦</span>
            </button>
            <span className="fine checkout">{checkoutReady ? 'Secure checkout with Stripe' : 'Checkout opens soon'}</span>

            <ul className="gets">
              <li>Beta access the night your city lights</li>
              <li>Align+ for life</li>
              <li>A numbered founding member card</li>
              <li>One vote for your city</li>
            </ul>
          </form>
        </div>
      </section>

      <section className="wrap qa">
        <div>
          <h3>Why pay for a beta?</h3>
          <p>A deck only works when enough real people in one city are in it. Seats tell us where they are.</p>
        </div>
        <div>
          <h3>My city isn’t next?</h3>
          <p>Your seat and your vote stay put until it lights. Bring friends and it lights sooner.</p>
        </div>
      </section>

      <AnimatePresence>
        {bar && (
          <motion.div className="pay-bar" initial={{ y: 90 }} animate={{ y: 0 }} exit={{ y: 90 }} transition={{ type: 'spring', stiffness: 380, damping: 34 }}>
            <span className="pay-bar-copy">
              {city ? <><b>{city.name}</b> · $15</> : <><b>$15</b> · one seat, one vote</>}
            </span>
            <button type="button" className="chrome-cta" onClick={() => city
              ? document.getElementById('ballot')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              : document.getElementById('vote')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
              {city ? 'Finish vote' : 'Vote'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="wrap">
        <span className="serif italic" style={{ fontSize: 18, color: 'var(--label-2)' }}>Align ✦</span>
        <span>© 2026 Align · 18+</span>
      </footer>
    </>
  )
}

function StageNote({ city }: { city: City }) {
  const stage = stageOf(city.slug)
  if (stage === 'first') return <>Houston opens first. <b>You’re in the opening deck.</b></>
  if (stage === 'texas') return <>{city.name} is <b>locked in next</b>, right after Houston.</>
  return <>Your $15 is <b>one vote for {city.name}</b>.</>
}
