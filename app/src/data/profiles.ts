import type { SignId } from './signs'

export interface ReadingLine {
  kind: 'spark' | 'rub' | 'align'
  text: string
  /** 1–3 strength pips */
  strength: 1 | 2 | 3
}

export interface Profile {
  id: string
  /** initial + age shown face-down, e.g. "J., 27" */
  initial: string
  name: string
  age: number
  sign: SignId
  moon: SignId
  rising: SignId
  serial: string
  pull: 'Strong pull' | 'Steady pull' | 'Slow burn' | 'Wild card'
  reading: ReadingLine[]
  dealbreakers: string
  /** demo script: does this person align back? */
  alignsBack: boolean
  photo?: string
  bio?: string
  religion?: string
  lookingFor?: string
  height?: string
  work?: string
  interests?: string[]
  house?: string
}

/** The viewer of the demo. */
export const ME = {
  name: 'Hakeem',
  sign: 'taurus' as SignId,
  moon: 'leo' as SignId,
  rising: 'libra' as SignId,
}

/**
 * Tonight's deck, in deal order. Juniper is the scripted match — keep her
 * third so the demo shows a release, an align-without-match, then the match.
 */
export const DECK: Profile[] = [
  {
    id: 'm24', initial: 'M.', name: 'Maya', age: 24, sign: 'virgo', moon: 'scorpio', rising: 'cancer',
    serial: '№ 027', pull: 'Slow burn', alignsBack: false,
    reading: [
      { kind: 'spark', text: 'Mars in your Moon, she notices everything.', strength: 3 },
      { kind: 'rub', text: 'Her lists meet your naps. Somebody bends.', strength: 2 },
      { kind: 'align', text: 'Earth to earth — steady ground, slow bloom.', strength: 2 },
    ],
    dealbreakers: 'Late replies. Loud chewing. Anyone who hates dogs.',
  },
  {
    id: 'r29', initial: 'R.', name: 'Rio', age: 29, sign: 'leo', moon: 'aries', rising: 'sagittarius',
    serial: '№ 029', pull: 'Wild card', alignsBack: false,
    reading: [
      { kind: 'spark', text: 'Sun on your Moon — instant warmth, big laughs.', strength: 3 },
      { kind: 'rub', text: 'Two fixed signs. Nobody backs down first.', strength: 3 },
      { kind: 'align', text: 'Fire lights earth; you keep the flame from spreading.', strength: 1 },
    ],
    dealbreakers: 'Flaking on plans. Small talk forever. No sense of adventure.',
  },
  {
    id: 'j27', initial: 'J.', name: 'Juniper', age: 27, sign: 'libra', moon: 'gemini', rising: 'aquarius',
    serial: '№ 031', pull: 'Strong pull', alignsBack: true,
    photo: '/img/juniper.jpg',
    house: '7th house',
    reading: [
      { kind: 'spark', text: 'Mercury on your Moon, she gets it first try.', strength: 3 },
      { kind: 'rub', text: 'Her scales stall your schedule, decisions take two.', strength: 2 },
      { kind: 'align', text: 'Earth holds air — she moves, you make it last. Venus rules you both.', strength: 3 },
    ],
    dealbreakers: 'One-word texts. Refusing to talk it out the same night. Hating my group chats.',
    bio: 'Gallery girl by day, playlist archivist by night. I read last pages first, cry at planetarium shows, and will absolutely rearrange your bookshelf by colour. Looking for someone who argues gently and means it.',
    religion: 'Spiritual, not religious',
    lookingFor: 'Long-term, open to slow',
    height: '5′6″',
    work: 'Assistant curator',
    interests: ['Film photography', 'Vinyl', 'Planetariums', 'Ceramics', 'Wine bars'],
  },
  {
    id: 'a31', initial: 'A.', name: 'Ari', age: 31, sign: 'aquarius', moon: 'libra', rising: 'gemini',
    serial: '№ 033', pull: 'Steady pull', alignsBack: false,
    reading: [
      { kind: 'spark', text: 'Uranus wakes your Venus — nothing about this is routine.', strength: 2 },
      { kind: 'rub', text: 'You want a plan; they want a surprise.', strength: 2 },
      { kind: 'align', text: 'Air and earth — they dream it, you build it.', strength: 2 },
    ],
    dealbreakers: 'Jealousy. Astrology skeptics. Bad playlists.',
  },
  {
    id: 's26', initial: 'S.', name: 'Sol', age: 26, sign: 'pisces', moon: 'cancer', rising: 'scorpio',
    serial: '№ 036', pull: 'Strong pull', alignsBack: false,
    reading: [
      { kind: 'spark', text: 'Neptune softens your edges. Easy silence.', strength: 3 },
      { kind: 'rub', text: 'They feel it all at once; you take a week.', strength: 1 },
      { kind: 'align', text: 'Water feeds earth — tender, slow, real.', strength: 3 },
    ],
    dealbreakers: 'Coldness. Rushing. Never asking how my day was.',
  },
  {
    id: 'k28', initial: 'K.', name: 'Kai', age: 28, sign: 'capricorn', moon: 'taurus', rising: 'virgo',
    serial: '№ 038', pull: 'Steady pull', alignsBack: false,
    reading: [
      { kind: 'spark', text: 'Saturn on your Sun — you both mean what you say.', strength: 2 },
      { kind: 'rub', text: 'Two calendars, zero spontaneity.', strength: 2 },
      { kind: 'align', text: 'Earth on earth — build something that lasts.', strength: 3 },
    ],
    dealbreakers: 'Being late. Not having goals. Chaos for fun.',
  },
]

export const DECK_TOTAL = 15
export const PEEKS_PER_NIGHT = 3
