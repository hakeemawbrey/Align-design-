import type { CaptureShot, PageDef } from '../types'
import Waitlist from './Waitlist'
import { DeckSky, NoBirthTime, SignRevealPage } from './Pages'
import { ME } from '../../data/profiles'
import { SIGNS } from '../../data/signs'
import { SIGN_ORDER } from '../../lib/astro'

export const PAGES: Record<string, PageDef> = {
  'no-birth-time': { ref: 'O-03c — No Birth Time', Component: NoBirthTime, home: 'onboarding' },
  waitlist: { ref: 'O-03d — Waitlist', Component: Waitlist, home: 'onboarding' },
  reveal: { ref: 'O-05 — Sign Reveal', Component: SignRevealPage, home: 'onboarding' },
  'deck-sky': { ref: 'S-05x — Deck · sky', Component: DeckSky, home: 'deck' },
}

/** the reveal flips on its own, then settles under the copy: wait it out */
const REVEAL_WAIT = 8000
const reveal = (name: string, sign: string): CaptureShot => ({ name: `O-05 — Sign Reveal · ${name}`, hash: `x/reveal/${sign}`, wait: REVEAL_WAIT })

export const SHOTS: CaptureShot[] = [
  { name: 'O-03c — No Birth Time', hash: 'x/no-birth-time', wait: 2000 },
  { name: 'O-03d — Waitlist', hash: 'x/waitlist/tulsa', wait: 2000 },
  // your own sign's reveal is the onboarding default, so it is shot there
  ...SIGN_ORDER.filter((s) => s !== ME.sign).map((s) => reveal(SIGNS[s].name, s)),
  { name: 'S-05x — Deck · sky fire (Moon in Leo)', hash: 'x/deck-sky/fire', wait: 2500 },
  { name: 'S-05x — Deck · sky earth (Moon in Taurus)', hash: 'x/deck-sky/earth', wait: 2500 },
  { name: 'S-05x — Deck · sky air (Moon in Libra)', hash: 'x/deck-sky/air', wait: 2500 },
  { name: 'S-05x — Deck · sky water (Moon in Cancer)', hash: 'x/deck-sky/water', wait: 2500 },
]
