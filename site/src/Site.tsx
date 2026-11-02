import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import RevealStyles from '@app/components/reveal/RevealStyles'
import AlignMark from '@app/components/intro/AlignMark'
import FlipCard, { FLIP_H, FLIP_W, type Caption } from './FlipCard'
import Nebula from './Nebula'
import { ALL_CITIES, TEXAS, cityFromSlug, label, parseCity, stageOf, type City } from './cities'
import { checkout, checkoutReady } from './votes'

/**
 * The city shown third in the launch order. Hard-coded for now; once the vote is live,
 * set it from the leader in useVotes() (votes.ts) instead.
 */
const NEXT_CITY: City = { slug: 'new-york-ny', name: 'New York City', state: 'NY' }

/** where the pixel stars twinkle over block 3: [left %, top %, delay s, size px] */
const TWINKLES: [number, number, number, number][] = [
  [8, 12, 0, 15], [84, 10, 0.7, 12], [64, 34, 1.4, 15], [92, 56, 0.3, 9], [76, 82, 1.9, 15], [44, 88, 1.1, 9],
  [18, 64, 2.3, 12], [52, 6, 2.6, 9], [32, 40, 0.9, 9], [70, 60, 2.0, 12], [94, 30, 1.6, 9], [6, 88, 2.8, 12],
]

/** what $15 gets: [icon, title, detail] */
const PERKS: [string, string, string][] = [
  ['✦', 'First access to the beta', 'when it launches in your city'],
  ['◎', 'City vote', 'what’s next'],
  ['+', 'Align+', 'for 2 years'],
  ['☾', 'Events', 'and perks'],
  ['№', 'Founder №', 'your card'],
  ['♦', 'TCG entry', 'Houston only'],
]

/** the questions, closed until tapped */
const FAQ: [string, string][] = [
  ['Why pay for a beta?', 'A deck only works when enough real people are in it. Seats tell us who’s coming, and votes tell us where.'],
  ['Why my birthday?', 'It casts your card: your sign and moon, and how you’d push, pull and align with everyone you’re dealt.'],
]

/** smooth scrolling, unless the viewer asked for less motion */
const scrollBehavior = (): ScrollBehavior => (matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth')

/** card size: as big as the screen allows, never past 1.05× */
function useCardScale() {
  const fit = () => {
    const w = window.innerWidth, h = window.innerHeight
    if (w >= 900) return Math.min(1.05, (h - 200) / FLIP_H)
    // phones: headline, line, card and button all on the first screen
    return Math.max(0.42, Math.min(0.74, (w * 0.64) / FLIP_W, (h - 470) / FLIP_H))
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

  // the ballot: the city you vote for, your name, your birth date, your email
  const [voteText, setVoteText] = useState('')
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [email, setEmail] = useState('')
  const [adult, setAdult] = useState(false)
  const [dateFocus, setDateFocus] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  // their city: any city, Houston and Texas included; one beyond Texas is also a vote for what's next
  const city = useMemo(() => parseCity(voteText), [voteText])
  const stage = city ? stageOf(city.slug) : null
  const vote = city && stage === 'vote' ? city : null
  const nameRef = useRef<HTMLInputElement>(null)
  const voteRef = useRef<HTMLInputElement>(null)
  const sendingRef = useRef(false)
  // 18+, and born after 1900; the date input's own min/max say the same
  const [minDate, maxDate, today] = useMemo(() => {
    const ymd = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    const d = new Date(); d.setFullYear(d.getFullYear() - 18)
    return ['1900-01-01', ymd(d), ymd(new Date())]
  }, [])
  const dateOk = /^\d{4}-\d{2}-\d{2}$/.test(birthDate) && birthDate >= minDate && birthDate <= maxDate
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
  const ready = !!city && !!name.trim() && dateOk && emailOk && adult && agreed

  // back from Stripe on ?paid=1; the vote was remembered on the way out, if this tab still has it
  const [paid] = useState(() => {
    if (!new URLSearchParams(window.location.search).get('paid')) return null
    let slug: string | null = null
    try { slug = sessionStorage.getItem('align-vote') } catch { /* private mode */ }
    return { city: slug ? cityFromSlug(slug) : null }
  })
  useEffect(() => {
    if (!paid) return
    const u = new window.URL(window.location.href)
    u.searchParams.delete('paid')
    window.history.replaceState(null, '', u)
    try { sessionStorage.removeItem('align-vote') } catch { /* private mode */ }
    void confetti({ particleCount: 90, spread: 70, origin: { y: 0.2 }, colors: ['#f8edff', '#ddd0ff', '#c9b6f0', '#9a7be0'], disableForReducedMotion: true })
  }, [paid])

  // back from Stripe without paying: the page can come back from the cache mid-"Saving"
  useEffect(() => {
    const on = (e: PageTransitionEvent) => { if (e.persisted) { sendingRef.current = false; setSending(false) } }
    window.addEventListener('pageshow', on)
    return () => window.removeEventListener('pageshow', on)
  }, [])

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
    // at most one check a frame while scrolling
    let raf = 0
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; check() }) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { io.disconnect(); cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll) }
  }, [])

  /** the Vote button: to the beta form, ready to type a city */
  const toVote = () => {
    document.getElementById('ballot')?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
    window.setTimeout(() => voteRef.current?.focus({ preventScroll: true }), 600)
  }

  /** the Join links: scroll to the beta card in the page itself (a bare #hash can misfire in an embed) */
  const toBallotLink = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('ballot')?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
    window.setTimeout(() => voteRef.current?.focus({ preventScroll: true }), 600)
  }


  const pay = async () => {
    // a ref, so a second tap in the same frame can't save twice
    if (!city || !ready || sendingRef.current) return
    sendingRef.current = true
    setSending(true); setError('')
    try {
      const url = await checkout({ vote: city.slug, name: name.trim(), birthDate, email: email.trim() })
      if (!url) { sendingRef.current = false; setSending(false); return }
      try { sessionStorage.setItem('align-vote', city.slug) } catch { /* private mode */ }
      window.location.href = url
    } catch {
      sendingRef.current = false
      setSending(false)
      setError('We couldn’t save your seat. Check your connection and try again.')
    }
  }

  return (
    // reduced motion: framer-motion drops its movement and keeps the fades
    <MotionConfig reducedMotion="user">
      <RevealStyles />
      <Nebula />

      <AnimatePresence>
        {paid && (
          <motion.div className="thanks" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status">
            <span style={{ color: 'var(--align)' }} aria-hidden>✦</span>
            <span>{paid.city ? <>You’re in, and your vote is in for <b>{paid.city.name}</b>.</> : 'You’re in, and your vote is in.'} We’ll email you your beta invite.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="wrap">
        <nav className="nav">
          <a className="wordmark" href="#top" aria-label="Align"><AlignMark size={34} glow={0.8} dotRadius={3.2} strokeOpacity={0.7} strokeWidth={1.1} /><span>Align<sup className="tm">™</sup></span></a>
          <a className="nav-cta" href="#ballot" onClick={toBallotLink}>Beta · $15</a>
        </nav>
      </div>

      <main>
      <div className="wrap">
        <header className="hero" id="top">
          <div className="hero-copy">
            <h1>Fall for who they are.</h1>
            <p className="lede-not">Not what they look like.</p>
          </div>

          <div className="cta-block">
            <a className="chrome-cta" id="hero-cta" href="#ballot" onClick={toBallotLink}>Join the beta · $15 <span className="spark" aria-hidden>✦</span></a>
            <span className="fine">Houston first · your city next · vote now</span>
          </div>

          <HeroCard />

          <p className="lede">Align<sup className="tm">™</sup> matches you by zodiac, and photos stay hidden until you both align.</p>
        </header>
      </div>

      {/* the vote: where it lights, the race, and the ballot, in one place */}
      <section className="wrap vote" id="vote">
        <div className="vote-head">
          <span className="kicker">Voting is open now</span>
          <h2>Which city launches after Texas?</h2>
        </div>

        {/* the launch order: three blocks, no counts */}
        <ol className="order">
          <li className="ob houston">
            <span className="ob-n" aria-hidden>1</span>
            <span className="ob-city">Houston</span>
            <span className="ob-tag">Launches first</span>
          </li>
          <li className="ob">
            <span className="ob-n" aria-hidden>2</span>
            <span className="ob-city">Texas</span>
            <span className="ob-sub">{TEXAS.map((c) => c.name).join(' · ')}</span>
            <span className="ob-tag">Locked in next</span>
          </li>
          <li>
            {/* block 3: twinkling and glowing, the leader until you vote, then your vote */}
            <div className={`ob vote-next${vote ? ' voted' : ''}`} aria-live="polite">
              <span className="ob-twinkle" aria-hidden>
                {TWINKLES.map(([x, y, d, sz], i) => <i key={i} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s`, width: sz, height: sz }} />)}
              </span>
              <span className="ob-n" aria-hidden>3</span>
              <span className="ob-city">{(vote ?? NEXT_CITY).name}</span>
              <span className="ob-tag">{vote ? 'Your vote' : 'Leading the vote'}</span>
              <button type="button" className="ob-cta" onClick={toVote}>Vote</button>
            </div>
          </li>
        </ol>

        {/* the ballot: one short card, a pass into the beta with the vote inside it */}
        <form className="ballot one" id="ballot" onSubmit={(e) => { e.preventDefault(); void pay() }}>
          <span className="ballot-ribbon" aria-hidden>✦ Founding beta ✦</span>
          <span className="ob-twinkle ballot-twinkle" aria-hidden>
            {TWINKLES.slice(0, 8).map(([x, y, d, sz], i) => <i key={i} style={{ left: `${x}%`, top: `${y * 0.22}%`, animationDelay: `${d}s`, width: sz, height: sz }} />)}
          </span>
          <div className="ballot-head">
            <h3 className="ballot-title">Join the Align<sup className="tm">™</sup> beta</h3>
            <p className="price-deal"><s aria-label="Regular price $25">$25</s> <b>$15</b> <span>special price · 100 per city</span></p>
          </div>

          <label className={`field${city ? ' has-vote' : ''}`}>
            <span className="sr">Your city</span>
            <input ref={voteRef} id="vote-city" aria-describedby="vote-note" list="race" enterKeyHint="next" maxLength={80} value={voteText} onChange={(e) => setVoteText(e.target.value)}
              placeholder="Your city" autoComplete="address-level2" required />
            <datalist id="race">{ALL_CITIES.map((c) => <option key={c.slug} value={label(c)} />)}</datalist>
          </label>
          {city && (
            <p className="vote-ok" id="vote-note" aria-live="polite">
              {stage === 'first' ? '✓ Houston launches first' : stage === 'texas' ? `✓ ${city.name} is locked in next` : `✓ Your vote goes to ${city.name}`}
            </p>
          )}

          <div className="pair">
            <label className="field">
              <span className="sr">First name</span>
              <input ref={nameRef} id="name" enterKeyHint="next" maxLength={60} value={name} onChange={(e) => setName(e.target.value)} placeholder="First name" autoComplete="given-name" required />
            </label>
            <label className="field">
              <span className="sr">Birth date</span>
              {/* reads "Birth date" until tapped, then it's the date picker */}
              <input id="birth-date" type={birthDate || dateFocus ? 'date' : 'text'} placeholder="Birth date" min={minDate} max={maxDate} value={birthDate}
                onFocus={() => setDateFocus(true)} onBlur={() => setDateFocus(false)} onChange={(e) => setBirthDate(e.target.value)} required />
            </label>
          </div>
          {/* not while a year is half typed */}
          {birthDate >= '1000' && !dateOk && <p className="note" role="alert">{birthDate > maxDate && birthDate <= today ? 'Align is 18+.' : 'Check your birth date.'}</p>}

          <label className="field">
            <span className="sr">Email</span>
            <input id="email" type="email" inputMode="email" enterKeyHint="go" autoCapitalize="off" spellCheck={false} maxLength={254}
              value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" autoComplete="email" required />
          </label>

          <div className="consents">
            <label className="check">
              <input id="adult" type="checkbox" checked={adult} onChange={(e) => setAdult(e.target.checked)} required />
              <span>I’m 18 or older</span>
            </label>
            <label className="check">
              <input id="agree" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} required />
              <span>I agree to the <a href="/terms" target="_blank" rel="noopener">Terms</a> and <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a></span>
            </label>
          </div>

          <button className="chrome-cta" type="submit" aria-disabled={!ready || !checkoutReady || sending}
            aria-describedby={error ? 'pay-hint pay-error' : 'pay-hint'}>
            {sending ? 'Saving your seat…' : 'Join the beta · $15'} <span className="spark" aria-hidden>✦</span>
          </button>
          {error && <p className="note" id="pay-error" role="alert">{error}</p>}
          <span className="fine checkout" id="pay-hint">{!checkoutReady ? 'Checkout opens soon' : ready ? 'Secure checkout with Stripe' : 'Fill in every field and tick both boxes'}</span>

          {/* what $15 gets: six small tiles */}
          <div className="perks">
            <p className="perks-title">What you get</p>
            <ul className="perk-grid">
              {PERKS.map(([icon, title, sub]) => (
                <li key={title}>
                  <span className="perk-icon" aria-hidden>{icon}</span>
                  <span className="perk-t">{title}</span>
                  <span className="perk-s">{sub}</span>
                </li>
              ))}
            </ul>
          </div>
        </form>
      </section>

      <section className="wrap qa" aria-labelledby="qa-title">
        <h2 className="sr" id="qa-title">Questions</h2>
        {FAQ.map(([q, ans]) => (
          <details key={q} className="faq">
            <summary><h3>{q}</h3><span className="faq-mark" aria-hidden /></summary>
            <p>{ans}</p>
          </details>
        ))}
      </section>
      </main>

      {/* the end card from the videos */}
      <footer className="wrap end">
        <p className="end-line">No one is disposable.</p>
        <span aria-hidden style={{ display: 'contents' }}><AlignMark size={112} glow={1} dotRadius={3.6} strokeOpacity={0.75} strokeWidth={0.8} /></span>
        <span className="end-name">Align<sup className="tm">™</sup></span>
        <nav className="end-links" aria-label="Legal">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </nav>
        <span className="end-fine">© 2026 Align · 18+</span>
      </footer>

      <AnimatePresence>
        {bar && (
          <motion.div className="pay-bar" initial={{ y: 90 }} animate={{ y: 0 }} exit={{ y: 90 }} transition={{ type: 'spring', stiffness: 380, damping: 34 }}>
            <span className="pay-bar-copy">
              {city ? <>Beta for <b>{city.name}</b> · $15</> : <><b>$15</b> · beta access + a vote</>}
            </span>
            <button type="button" className="chrome-cta" onClick={() => document.getElementById('ballot')?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })}>
              {city ? 'Finish' : 'Join'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}

/** the hero card and its scene title; its own state, so each beat re-renders only this */
function HeroCard() {
  const scale = useCardScale()
  const [caption, setCaption] = useState<Caption>(['Tonight’s deck', 'Dealt by the stars.'])
  const [replay, setReplay] = useState<(() => void) | null>(null)
  // the caption changes every beat, too often to read out; screen readers hear only the turns
  const [said, setSaid] = useState('')
  const col = useRef<HTMLDivElement>(null)
  const dealAgain = () => {
    replay?.()
    setSaid('Dealing again.')
    // this button goes while the hand plays, so focus moves to the card
    requestAnimationFrame(() => col.current?.querySelector('button')?.focus())
  }
  return (
    <div className="card-col" ref={col}>
      <FlipCard scale={scale} onCaption={setCaption} onReplay={(fn) => setReplay(() => fn)}
        onFlip={(up) => setSaid(up ? 'You both aligned. Her card turns over to show her photo.' : 'Her card is face down again.')} />
      <p className="sr" role="status">{said}</p>
      <div className="scene">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={caption.join('|')} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.3 }}>
            <span className="scene-label">{caption[0]}</span>
            <span className="scene-line">{caption[1]}</span>
          </motion.div>
        </AnimatePresence>
        {replay && <button type="button" className="deal-again" onClick={dealAgain}><span aria-hidden>↻</span> Deal again</button>}
      </div>
    </div>
  )
}
