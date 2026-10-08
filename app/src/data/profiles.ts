import type { SignId } from './signs'

export interface ReadingLine {
  /** push: where you rub against each other · pull: what draws you in · align: where it holds */
  kind: 'push' | 'pull' | 'align'
  text: string
  /** 1–3 strength pips */
  strength: 1 | 2 | 3
}

export interface Profile {
  id: string
  /** first name shown with age on the card, e.g. "Juniper, 27" */
  initial: string
  name: string
  age: number
  sign: SignId
  moon: SignId
  rising: SignId
  serial: string
  /** how hard this card pulls on yours — shown as a badge on the card. Rare pull is the rarest. */
  pull: 'Rare pull' | 'Strong pull' | 'Steady pull' | 'Slow burn' | 'Wild card'
  /** one line on the card, in their words */
  blurb?: string
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
  /** which pass through the deck this card is from (Align+ keeps dealing) */
  deal?: number
  /** founders card serial — founder cards get a holo border in the deck */
  founder?: number
  /** a real person (published from their phone), not a seeded profile */
  real?: boolean
  /** dealt only by the Comet event */
  comet?: boolean
}

/** The viewer of the demo. */
export const ME = {
  name: 'Hakeem',
  age: 28,
  sign: 'taurus' as SignId,
  moon: 'sagittarius' as SignId,
  rising: 'libra' as SignId,
  /** Venus at 10° Aries (May 12 1998, 5 PM, Tulsa) */
  venus: 'aries' as SignId,
  serial: '№ 012',
  /** shown on the flipped side of your card and on copies you trade */
  photo: 'img/hakeem.jpg',
  blurb: 'Sound engineer. Record stores on Sundays. Cooks too much.',
}

/**
 * Tonight's deck, in deal order. Juniper is the scripted match — keep her
 * third so the demo shows a release, an align-without-match, then the match.
 */
export const DECK: Profile[] = [
  {
    id: 'm24', initial: 'Maya', name: 'Maya', age: 24, sign: 'virgo', moon: 'scorpio', rising: 'cancer',
    serial: '№ 027', pull: 'Slow burn', alignsBack: false,
    photo: 'img/people/p3.jpg',
    reading: [
      { kind: 'pull', text: 'Mars in your Moon, she notices everything.', strength: 3 },
      { kind: 'push', text: 'Her lists meet your naps. Somebody bends.', strength: 2 },
      { kind: 'align', text: 'Earth to earth — steady ground, slow bloom.', strength: 2 },
    ],
    dealbreakers: 'Late replies. Loud chewing. Anyone who hates dogs.',
  },
  {
    id: 'r29', founder: 18, initial: 'Rio', name: 'Rio', age: 29, sign: 'leo', moon: 'aries', rising: 'sagittarius',
    serial: '№ 029', pull: 'Wild card', alignsBack: false,
    photo: 'img/people/p9.jpg',
    reading: [
      { kind: 'pull', text: 'Sun on your Moon — instant warmth, big laughs.', strength: 3 },
      { kind: 'push', text: 'Two fixed signs. Nobody backs down first.', strength: 3 },
      { kind: 'align', text: 'Fire lights earth; you keep the flame from spreading.', strength: 1 },
    ],
    dealbreakers: 'Flaking on plans. Small talk forever. No sense of adventure.',
  },
  {
    id: 'j27', initial: 'Juniper', name: 'Juniper', age: 27, sign: 'libra', moon: 'gemini', rising: 'aquarius',
    serial: '№ 031', pull: 'Rare pull', alignsBack: true,
    photo: 'img/juniper.jpg',
    house: '7th house',
    reading: [
      { kind: 'pull', text: 'Mercury on your Moon, she gets it first try.', strength: 3 },
      { kind: 'push', text: 'Her scales stall your schedule, decisions take two.', strength: 2 },
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
    id: 'a31', initial: 'Ari', name: 'Ari', age: 31, sign: 'aquarius', moon: 'libra', rising: 'gemini',
    serial: '№ 033', pull: 'Steady pull', alignsBack: false,
    photo: 'img/people/p6.jpg',
    reading: [
      { kind: 'pull', text: 'Uranus wakes your Venus — nothing about this is routine.', strength: 2 },
      { kind: 'push', text: 'You want a plan; they want a surprise.', strength: 2 },
      { kind: 'align', text: 'Air and earth — they dream it, you build it.', strength: 2 },
    ],
    dealbreakers: 'Jealousy. Astrology skeptics. Bad playlists.',
  },
  {
    id: 's26', initial: 'Sol', name: 'Sol', age: 26, sign: 'pisces', moon: 'cancer', rising: 'scorpio',
    serial: '№ 036', pull: 'Strong pull', alignsBack: false,
    photo: 'img/people/p7.jpg',
    reading: [
      { kind: 'pull', text: 'Neptune softens your edges. Easy silence.', strength: 3 },
      { kind: 'push', text: 'They feel it all at once; you take a week.', strength: 1 },
      { kind: 'align', text: 'Water feeds earth — tender, slow, real.', strength: 3 },
    ],
    dealbreakers: 'Coldness. Rushing. Never asking how my day was.',
  },
  {
    id: 'k28', initial: 'Kai', name: 'Kai', age: 28, sign: 'capricorn', moon: 'taurus', rising: 'virgo',
    serial: '№ 038', pull: 'Steady pull', alignsBack: false,
    photo: 'img/people/p2.jpg',
    reading: [
      { kind: 'pull', text: 'Saturn on your Sun — you both mean what you say.', strength: 2 },
      { kind: 'push', text: 'Two calendars, zero spontaneity.', strength: 2 },
      { kind: 'align', text: 'Earth on earth — build something that lasts.', strength: 3 },
    ],
    dealbreakers: 'Being late. Not having goals. Chaos for fun.',
  },
]

/** More of tonight's sky, dealt only to Align+ once the free fifteen run out. */
export const BONUS: Profile[] = [
  {
    id: 'l26', initial: 'Lena', name: 'Lena', age: 26, sign: 'gemini', moon: 'aquarius', rising: 'leo',
    serial: '№ 041', pull: 'Wild card', alignsBack: false, photo: 'img/people/p1.jpg',
    reading: [
      { kind: 'pull', text: 'Mercury meets your Venus — she flirts in full sentences.', strength: 3 },
      { kind: 'push', text: 'She wants three plans; you want the one you made.', strength: 2 },
      { kind: 'align', text: 'Air and earth — she keeps it light, you keep it real.', strength: 2 },
    ],
    dealbreakers: 'Bad texters. Nowhere to dance. People who never ask a question back.',
  },
  {
    id: 'a29', initial: 'Amara', name: 'Amara', age: 29, sign: 'sagittarius', moon: 'leo', rising: 'aries',
    serial: '№ 044', pull: 'Strong pull', alignsBack: false, photo: 'img/people/p8.jpg',
    reading: [
      { kind: 'pull', text: 'Mars on your Moon — she makes the first move, every time.', strength: 3 },
      { kind: 'push', text: 'She moves fast; you move once and for good.', strength: 3 },
      { kind: 'align', text: 'Fire warms earth — she starts it, you make it last.', strength: 2 },
    ],
    dealbreakers: 'Indecision. Cancelled plans. Anyone who can’t laugh at themselves.',
  },
]

const p = (
  id: string, name: string, age: number, sign: SignId, moon: SignId, photo: string, serial: string,
  pull: Profile['pull'], attract: string, friction: string, align: string, dealbreakers: string,
): Profile => ({
  id, initial: name, name, age, sign, moon, rising: moon, serial, pull, alignsBack: false, photo,
  reading: [
    { kind: 'pull', text: attract, strength: 3 },
    { kind: 'push', text: friction, strength: 2 },
    { kind: 'align', text: align, strength: 2 },
  ],
  dealbreakers,
})

/** The rest of tonight's fifteen (draws two and three). */
export const MORE: Profile[] = [
  p('t30', 'Theo', 30, 'cancer', 'virgo', 'img/people/p11.jpg', '№ 047', 'Steady pull',
    'Moon on your Venus — he remembers how you take your coffee.', 'He needs reassurance; you assume it’s obvious.', 'Water softens earth — home is where you both land.',
    'Coldness. Flaky plans. People who never call their mum.'),
  { ...p('n27', 'Noor', 27, 'libra', 'gemini', 'img/people/p5.jpg', '№ 049', 'Slow burn',
    'Venus rules you both — easy taste, easy laughs.', 'She weighs every option; you picked an hour ago.', 'Air lifts earth — she brings the ideas, you bring the plan.',
    'Rudeness to waiters. One-word answers. Bad shoes.'), founder: 77 },
  p('j28', 'Jae', 28, 'sagittarius', 'aries', 'img/people/p4.jpg', '№ 052', 'Wild card',
    'Jupiter on your Sun — he makes the night bigger.', 'He wants a passport; you want a porch.', 'Fire and earth — he finds the road, you find the way home.',
    'Small talk. Closed minds. Anyone who hates travel.'),
  p('b25', 'Bianca', 25, 'taurus', 'pisces', 'img/people/p10.jpg', '№ 055', 'Strong pull',
    'Same sun — you already know each other’s silences.', 'Two bulls, one remote. Nobody gives it up.', 'Earth on earth — slow, sure, and very well fed.',
    'Rushing. Cheap wine. Being late to dinner.'),
  { ...p('i24', 'Ivy', 24, 'pisces', 'taurus', 'img/people/p12.jpg', '№ 058', 'Steady pull',
    'Her Moon is your sun — she feels you before you speak.', 'She drifts; you anchor. Sometimes too hard.', 'Water feeds earth — tender, slow, real.',
    'Cynics. Shouting. Anyone who laughs at horoscopes.'), founder: 203 },
  p('d31', 'Dev', 31, 'leo', 'libra', 'img/people/p6.jpg', '№ 061', 'Wild card',
    'Sun square Sun — instant heat, instant opinions.', 'He wants the spotlight; you want the good seat.', 'Fire warms earth — he lights it, you keep it going.',
    'Being ignored. Grey outfits. Leaving early.'),
  p('r29b', 'Rosa', 29, 'gemini', 'cancer', 'img/people/p7.jpg', '№ 064', 'Slow burn',
    'Mercury on your Moon — she talks you out of your shell.', 'She changes plans; you change nothing.', 'Air and earth — she keeps it moving, you keep it real.',
    'Boredom. Texting “k”. Anyone who won’t try the new place.'),
]

/** Dealt only by the Comet event: people from outside tonight's sky. */
export const COMETS: Profile[] = [
  p('e30', 'Elio', 30, 'aquarius', 'gemini', 'img/people/p2.jpg', '№ 071', 'Wild card',
    'Uranus crosses your Venus — nothing about him is predictable.', 'He lives online; you live in the room.', 'Air and earth — he brings the new, you keep what’s good.',
    'Routine for its own sake. Phones at dinner (his own rule, he breaks it).'),
  p('m27', 'Mina', 27, 'capricorn', 'scorpio', 'img/people/p3.jpg', '№ 073', 'Strong pull',
    'Saturn on your Sun — she means what she says.', 'Two planners, zero surprises.', 'Earth on earth — build something that lasts.',
    'Vagueness. Being late. People who won’t say what they want.'),
]

/** The one-line bio on each card. */
const BLURBS: Record<string, string> = {
  m24: 'ER nurse on nights. Alphabetised spice rack. Soft for dogs.',
  r29: 'Chef at a supper club. I’ll feed you before I flirt.',
  j27: 'Assistant curator. Playlist archivist. Cries at planetariums.',
  a31: 'Builds synths. Will explain them if you ask once.',
  s26: 'Ceramicist. Bad at texting, great at long walks.',
  k28: 'Architect. Plans the whole trip, forgets the charger.',
  l26: 'Podcast producer. Three new hobbies a month, one keeper.',
  a29: 'Flight attendant. Home for the weekend, maybe yours.',
  t30: 'Teacher. Brings you soup when you’re sick, unasked.',
  n27: 'Interior designer. Will judge your couch, kindly.',
  j28: 'Photographer. Passport is always in the bag.',
  b25: 'Pastry chef. Up at 4am, asleep by 9, worth it.',
  i24: 'Music therapist. Sings in the car, badly, on purpose.',
  d31: 'Stand-up on Thursdays. Fintech the rest of the week.',
  r29b: 'Journalist. Asks one question too many. Sorry.',
  e30: 'Game designer. Thinks in levels, texts in memes.',
  m27: 'Lawyer. Reads the fine print. Reads you too.',
}
for (const p of [...DECK, ...BONUS, ...MORE, ...COMETS]) p.blurb ??= BLURBS[p.id]

/** Tonight's fifteen people, in deal order: three draws of five. */
export const TONIGHT: Profile[] = [...DECK, ...BONUS, ...MORE]

/**
 * The card at position i tonight. Free: the deal (fifteen a night, ends).
 * Align+: after the deal, keep going through bonus cards, then cycle — never
 * repeating the scripted match.
 */
export function cardAt(deal: Profile[], i: number, unlimited: boolean): Profile | undefined {
  if (i < deal.length) return deal[i]
  if (!unlimited) return undefined
  const pool = [...BONUS, ...deal.filter((p) => !p.alignsBack)]
  const j = i - deal.length
  const p = pool[j % pool.length]
  return { ...p, deal: 1 + Math.floor(j / pool.length) }
}

export const DECK_TOTAL = 15
export const PEEKS_PER_NIGHT = 3
