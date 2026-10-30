import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import RevealStyles from '@app/components/reveal/RevealStyles'
import AlignMark from '@app/components/intro/AlignMark'
import FlipCard, { FLIP_H, FLIP_W, type Caption } from './FlipCard'
import Nebula from './Nebula'
import Scoreboard, { Track } from './Scoreboard'
import { ALL_CITIES, VOTE_CITIES, cityFromSlug, label, parseCity, stageOf, type City } from './cities'
import { checkout, checkoutReady, useVotes } from './votes'

/** the ballot's three cards */
const STEPS = ['Your vote', 'Your card', 'Beta access']
const ROMAN = ['I', 'II', 'III']
/** dealing between the cards: the next one slides in from the right, going back from the left */
const DEAL = {
  enter: (d: number) => ({ opacity: 0, x: 48 * d, rotate: 2 * d }),
  center: { opacity: 1, x: 0, rotate: 0 },
  leave: (d: number) => ({ opacity: 0, x: -48 * d, rotate: -2 * d }),
}

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
  const tally = useVotes()

  // the ballot: the city you vote for, your name, your birth details, your email
  const [voteText, setVoteText] = useState('')
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [birthPlace, setBirthPlace] = useState('')
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const picked = useMemo(() => parseCity(voteText), [voteText])
  const vote = picked && stageOf(picked.slug) === 'vote' ? picked : null
  const lockedIn = !!picked && !vote
  const nameRef = useRef<HTMLInputElement>(null)
  const voteRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const sendingRef = useRef(false)
  // 18+, and born after 1900; the date input's own min/max say the same
  const [minDate, maxDate, today] = useMemo(() => {
    const ymd = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    const d = new Date(); d.setFullYear(d.getFullYear() - 18)
    return ['1900-01-01', ymd(d), ymd(new Date())]
  }, [])
  const dateOk = /^\d{4}-\d{2}-\d{2}$/.test(birthDate) && birthDate >= minDate && birthDate <= maxDate
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
  const ready = !!vote && !!name.trim() && dateOk && !!birthPlace.trim() && emailOk

  // the ballot deck: which card is up, and which way the last deal went
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const stepOk = [!!vote, !!name.trim() && dateOk && !!birthPlace.trim(), emailOk]
  const focusStep = (i: number) => window.setTimeout(() => [voteRef, nameRef, emailRef][i].current?.focus({ preventScroll: true }), 360)
  const go = (i: number) => { setDir(i > step ? 1 : -1); setStep(i); focusStep(i) }
  const next = () => { if (stepOk[step]) go(step + 1) }

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
    void confetti({ particleCount: 90, spread: 70, origin: { y: 0.2 }, colors: ['#f2c75c', '#fff4cf', '#c9b6f0', '#9a7be0'], disableForReducedMotion: true })
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

  const toBallot = () => {
    const b = document.getElementById('ballot')
    if (!b) return
    const r = b.getBoundingClientRect()
    // desktop keeps the ballot beside the board; only scroll when it's off screen
    if (r.top < 0 || r.bottom > window.innerHeight) b.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
  }

  /** a row on the board: that's your vote (stable, so the board doesn't re-render as you type) */
  const pickVote = useCallback((c: City) => {
    setVoteText(label(c))
    toBallot()
    // the vote is in: deal the next card
    setStep((s) => { if (s === 0) { setDir(1); focusStep(1) } return s === 0 ? 1 : s })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  /** the write-in card: back to card I, typing */
  const writeIn = useCallback(() => {
    setVoteText('')
    setStep((s) => { setDir(s > 0 ? -1 : 1); return 0 })
    toBallot()
    focusStep(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pay = async () => {
    // a ref, so a second tap in the same frame can't save twice
    if (!vote || !ready || sendingRef.current) return
    sendingRef.current = true
    setSending(true); setError('')
    try {
      const url = await checkout({ vote: vote.slug, name: name.trim(), birthDate, birthPlace: birthPlace.trim(), email: email.trim() })
      if (!url) { sendingRef.current = false; setSending(false); return }
      try { sessionStorage.setItem('align-vote', vote.slug) } catch { /* private mode */ }
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
          <a className="wordmark" href="#top" aria-label="Align"><AlignMark size={34} glow={0.8} dotRadius={3.2} strokeOpacity={0.7} strokeWidth={1.1} /><span>Align</span></a>
          <a className="nav-cta" href="#vote">Beta · $15</a>
        </nav>
      </div>

      <main>
      <div className="wrap">
        <header className="hero" id="top">
          <div className="hero-copy">
            <span className="kicker">Blind by design</span>
            <h1>Fall for who they are.</h1>
            <p className="lede-not">Not what they look like.</p>
          </div>

          <div className="cta-block">
            <a className="chrome-cta" id="hero-cta" href="#vote">Join the beta · $15 <span className="spark" aria-hidden>✦</span></a>
            <span className="fine">Houston first · Texas next · vote now</span>
          </div>

          <HeroCard />

          <p className="lede">Align matches you by zodiac, and photos stay hidden until you both align.</p>
        </header>
      </div>

      {/* the vote: where it lights, the race, and the ballot, in one place */}
      <section className="wrap vote" id="vote">
        <div className="vote-head">
          <span className="kicker">Voting is open now</span>
          <h2>Which city lights after Texas?</h2>
          <p className="sub">$15 gets you into the beta and one vote, counted today. Same price everywhere.</p>
        </div>

        <Track tally={tally} vote={vote} />

        <Scoreboard tally={tally} mine={vote} onPick={pickVote} onWriteIn={writeIn} />

        {/* the ballot, dealt as three cards: your vote, your card, your seat */}
        <form className="deck" id="ballot" onSubmit={(e) => { e.preventDefault(); if (step < 2) next(); else void pay() }}>
          <ol className="deck-steps" aria-label="Three cards">
            {STEPS.map((t, i) => (
              <li key={t} className={i === step ? 'on' : i < step ? 'done' : ''}>
                <button type="button" onClick={() => go(i)} disabled={i > step && !stepOk.slice(0, i).every(Boolean)} aria-current={i === step ? 'step' : undefined}>
                  <span aria-hidden>{ROMAN[i]}</span> {t}
                </button>
              </li>
            ))}
          </ol>

          <div className="deck-stack">
            {/* the cards still to come peek out behind this one */}
            {[2, 1].filter((k) => step + k <= 2).map((k) => <div key={k} className={`deck-under u${k}`} aria-hidden />)}

            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.fieldset key={step} className="ballot" custom={dir}
                variants={DEAL} initial="enter" animate="center" exit="leave" transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}>
                <legend className="sr">{`Card ${ROMAN[step]} of III: ${STEPS[step]}`}</legend>
                <span className="card-numeral" aria-hidden>{ROMAN[step]}</span>

                {step === 0 && (<>
                  <div className="ballot-head">
                    <span className="kicker">Your vote</span>
                    <h3 className="ballot-title">The city after Texas</h3>
                  </div>
                  <label className="city-field">
                    <span className="field-label">Your vote</span>
                    <input ref={voteRef} id="vote-city" aria-describedby="vote-note" list="race" enterKeyHint="next" maxLength={80} value={voteText} onChange={(e) => setVoteText(e.target.value)}
                      placeholder="Pick a city" autoComplete="off" required />
                    <datalist id="race">{VOTE_CITIES.map((c) => <option key={c.slug} value={label(c)} />)}</datalist>
                  </label>
                  <p className="note" id="vote-note" aria-live="polite">
                    {lockedIn ? 'Houston and Texas are already locked in. Vote for a city beyond Texas.'
                      : vote ? <>One vote for <b>{vote.name}</b>, counted today.</> : 'Pick a city card above, or type one.'}
                  </p>
                </>)}

                {step === 1 && (<>
                  <div className="ballot-head">
                    <span className="kicker">Your card</span>
                    <h3 className="ballot-title">Who’s voting</h3>
                    <p className="price">Your birth details cast your card for the beta</p>
                  </div>
                  <label className="field">
                    <span>Your first name</span>
                    <input ref={nameRef} id="name" enterKeyHint="next" maxLength={60} value={name} onChange={(e) => setName(e.target.value)} placeholder="First name" autoComplete="given-name" required />
                  </label>
                  <label className="field">
                    <span>Birth date</span>
                    <input id="birth-date" type="date" min={minDate} max={maxDate} value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
                  </label>
                  {/* not while a year is half typed */}
                  {birthDate >= '1000' && !dateOk && <p className="note" role="alert">{birthDate > maxDate && birthDate <= today ? 'Align is 18+.' : 'Check your birth date.'}</p>}
                  <label className="field">
                    <span>Birthplace</span>
                    <input id="birth-place" list="places" enterKeyHint="next" maxLength={120} value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} placeholder="City you were born in" autoComplete="off" required />
                    <datalist id="places">{ALL_CITIES.map((c) => <option key={c.slug} value={label(c)} />)}</datalist>
                  </label>
                </>)}

                {step === 2 && (<>
                  {/* it's a pass into the beta first; the vote comes with it */}
                  <div className="ballot-head">
                    <span className="kicker">Beta access</span>
                    <h3 className="ballot-title">Join the Align beta</h3>
                    <p className="price"><b>$15</b> once · your vote for {vote?.name ?? 'the city after Texas'} is included</p>
                  </div>
                  <label className="field">
                    <span>Email</span>
                    <input ref={emailRef} id="email" type="email" inputMode="email" enterKeyHint="go" autoCapitalize="off" spellCheck={false} maxLength={254}
                      value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" autoComplete="email" required />
                  </label>
                  <button className="chrome-cta" type="submit" aria-disabled={!ready || !checkoutReady || sending}
                    aria-describedby={error ? 'pay-hint pay-error' : 'pay-hint'}>
                    {sending ? 'Saving your seat…' : 'Join the beta · $15'} <span className="spark" aria-hidden>✦</span>
                  </button>
                  {error && <p className="note" id="pay-error" role="alert">{error}</p>}
                  <span className="fine checkout" id="pay-hint">{!checkoutReady ? 'Checkout opens soon' : ready ? 'Secure checkout with Stripe' : 'Add your email to join'}</span>
                  <ul className="gets">
                    <li>Beta access, with your card cast from your birth details</li>
                    <li>Align+ for life</li>
                    <li>A numbered founding member card</li>
                    <li>One vote, counted today, for the city after Texas</li>
                  </ul>
                </>)}

                {step < 2 && (
                  <div className="deck-nav">
                    {step > 0 ? <button type="button" className="deck-back" onClick={() => go(step - 1)}>Back</button> : <span />}
                    <button type="submit" className="deck-next" aria-disabled={!stepOk[step]}>Next card</button>
                  </div>
                )}
                {step === 2 && <button type="button" className="deck-back solo" onClick={() => go(1)}>Back</button>}
              </motion.fieldset>
            </AnimatePresence>
          </div>
        </form>
      </section>

      <section className="wrap qa" aria-labelledby="qa-title">
        <h2 className="sr" id="qa-title">Questions</h2>
        <div>
          <h3>Why pay for a beta?</h3>
          <p>A deck only works when enough real people are in it. Seats tell us who’s coming, and votes tell us where.</p>
        </div>
        <div>
          <h3>Why my birth details?</h3>
          <p>They cast your card: your sign and moon, and how you’d push, pull and align with everyone you’re dealt.</p>
        </div>
      </section>
      </main>

      {/* the end card from the videos */}
      <footer className="wrap end">
        <p className="end-line">No one is disposable.</p>
        <span aria-hidden style={{ display: 'contents' }}><AlignMark size={112} glow={1} dotRadius={3.6} strokeOpacity={0.75} strokeWidth={0.8} /></span>
        <span className="end-name">Align</span>
        <span className="kicker" style={{ margin: 0 }}>Blind by design</span>
        <span className="end-fine">© 2026 Align · 18+</span>
      </footer>

      <AnimatePresence>
        {bar && (
          <motion.div className="pay-bar" initial={{ y: 90 }} animate={{ y: 0 }} exit={{ y: 90 }} transition={{ type: 'spring', stiffness: 380, damping: 34 }}>
            <span className="pay-bar-copy">
              {vote ? <>Beta + vote for <b>{vote.name}</b></> : <><b>$15</b> · beta access + a vote</>}
            </span>
            <button type="button" className="chrome-cta" onClick={() => document.getElementById(vote ? 'ballot' : 'vote')?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })}>
              {vote ? 'Finish' : 'Join'}
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
