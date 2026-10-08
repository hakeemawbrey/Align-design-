import type { SignId } from './signs'

/** Days two people must stay aligned before they can trade copies of their cards. */
export const TRADE_UNLOCK_DAYS = 3

export type MatchSection = 'your-turn' | 'waiting' | 'quiet'

export interface Match {
  id: string
  name: string
  age: number
  sign: SignId
  photo: string
  serial: string
  pronoun: 'he' | 'she' | 'they'
  /** days aligned so far (0 = tonight) */
  day: number
  section: MatchSection
  /** status line under the name in the list (G-09) */
  status: string
  /** timestamp at right in the list */
  when: string
  /** already traded copies before the demo starts */
  traded: boolean
  /** where tapping the row goes */
  opens: 'chat' | 'trade' | 'card'
  /** a real person (opens their live chat) */
  real?: boolean
}

/** Your matches, in G-09 order. Tobias is the scripted trade (day 3, ready). */
export const MATCHES: Match[] = [
  { id: 'j27', name: 'Juniper', age: 27, sign: 'libra', photo: 'img/juniper.jpg', serial: '№ 031', pronoun: 'she', day: 0, section: 'your-turn', status: 'Veil lifting', when: '4H', traded: false, opens: 'chat' },
  { id: 't24', name: 'Tobias', age: 24, sign: 'sagittarius', photo: 'img/people/p2.jpg', serial: '№ 018', pronoun: 'he', day: 3, section: 'your-turn', status: 'Your turn', when: '1D', traded: false, opens: 'trade' },
  { id: 'a31', name: 'Anselm', age: 31, sign: 'capricorn', photo: 'img/people/p11.jpg', serial: '№ 009', pronoun: 'he', day: 4, section: 'waiting', status: 'Waiting on him', when: 'TUE', traded: true, opens: 'card' },
  { id: 'z26', name: 'Zena', age: 26, sign: 'aquarius', photo: 'img/people/p5.jpg', serial: '№ 014', pronoun: 'she', day: 4, section: 'waiting', status: 'Waiting on her', when: 'MON', traded: true, opens: 'card' },
  { id: 'm29', name: 'Mira', age: 29, sign: 'leo', photo: 'img/people/p12.jpg', serial: '№ 022', pronoun: 'she', day: 5, section: 'quiet', status: '2 days left', when: 'SAT', traded: false, opens: 'trade' },
  { id: 's29', name: 'Sunny', age: 29, sign: 'scorpio', photo: 'img/people/p10.jpg', serial: '№ 006', pronoun: 'she', day: 6, section: 'quiet', status: '18 hours left', when: 'FRI', traded: true, opens: 'card' },
]

export const SECTION_LABEL: Record<MatchSection, string> = {
  'your-turn': 'Your turn',
  waiting: 'Waiting on them',
  quiet: 'Going quiet',
}

export const BINDER_SLOTS = 9

/**
 * Rare series — a future vision: verified famous people get limited-edition
 * rare cards that fans collect and trade. NOVA is a fictional idol.
 */
export interface ArtistCard {
  id: string
  name: string
  age: number
  sign: SignId
  photo: string
  title: string
  edition: number
  of: number
  /** how it got into your binder */
  provenance: string
  /** demand stats for the showcase */
  wants: number
  tradedThisWeek: number
}

export const ARTIST_CARDS: ArtistCard[] = [
  {
    id: 'nova', name: 'NOVA', age: 26, sign: 'leo', photo: 'img/people/p4.jpg', title: 'Verified · K-pop',
    edition: 1, of: 500, provenance: 'Traded from a collector in Seoul', wants: 41, tradedThisWeek: 3,
  },
]
