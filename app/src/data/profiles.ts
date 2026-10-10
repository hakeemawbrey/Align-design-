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
      { kind: 'pull', text: 'She notices the small stuff — and remembers it.', strength: 3 },
      { kind: 'push', text: 'She plans, you go with the flow. Agree on plans early.', strength: 2 },
      { kind: 'align', text: 'You both want steady. Easy to build a routine together.', strength: 2 },
    ],
    dealbreakers: 'Late replies. Loud chewing. Anyone who hates dogs.',
  },
  {
    id: 'r29', founder: 18, initial: 'Rio', name: 'Rio', age: 29, sign: 'leo', moon: 'aries', rising: 'sagittarius',
    serial: '№ 029', pull: 'Wild card', alignsBack: false,
    photo: 'img/people/p9.jpg',
    reading: [
      { kind: 'pull', text: 'Warm and funny. A date with Rio feels like an event.', strength: 3 },
      { kind: 'push', text: 'You’re both stubborn. Decide now who says sorry first.', strength: 3 },
      { kind: 'align', text: 'Works if you take turns choosing what you do.', strength: 1 },
    ],
    dealbreakers: 'Flaking on plans. Small talk forever. No sense of adventure.',
  },
  {
    id: 'j27', initial: 'Juniper', name: 'Juniper', age: 27, sign: 'libra', moon: 'gemini', rising: 'aquarius',
    serial: '№ 031', pull: 'Rare pull', alignsBack: true,
    photo: 'img/juniper.jpg',
    house: '7th house',
    reading: [
      { kind: 'pull', text: 'Easy to talk to — it flows from the very first text.', strength: 3 },
      { kind: 'push', text: 'She takes time to decide. Give her two options, not ten.', strength: 2 },
      { kind: 'align', text: 'Same taste, same values. You’d host great dinners together.', strength: 3 },
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
      { kind: 'pull', text: 'Never boring. Every date is something new.', strength: 2 },
      { kind: 'push', text: 'You like a plan; they like surprises. Trade off weekends.', strength: 2 },
      { kind: 'align', text: 'They bring the ideas, you make them happen.', strength: 2 },
    ],
    dealbreakers: 'Jealousy. Astrology skeptics. Bad playlists.',
  },
  {
    id: 's26', initial: 'Sol', name: 'Sol', age: 26, sign: 'pisces', moon: 'cancer', rising: 'scorpio',
    serial: '№ 036', pull: 'Strong pull', alignsBack: false,
    photo: 'img/people/p7.jpg',
    reading: [
      { kind: 'pull', text: 'Gentle, and easy to be quiet with.', strength: 3 },
      { kind: 'push', text: 'They feel things fast; you need time. Say when you need space.', strength: 1 },
      { kind: 'align', text: 'Calm, caring, slow to fight. Good for the long term.', strength: 3 },
    ],
    dealbreakers: 'Coldness. Rushing. Never asking how my day was.',
  },
  {
    id: 'k28', initial: 'Kai', name: 'Kai', age: 28, sign: 'capricorn', moon: 'taurus', rising: 'virgo',
    serial: '№ 038', pull: 'Steady pull', alignsBack: false,
    photo: 'img/people/p2.jpg',
    reading: [
      { kind: 'pull', text: 'Reliable. If Kai says 7, Kai is there at 7.', strength: 2 },
      { kind: 'push', text: 'Two busy planners. Put fun on the calendar or it won’t happen.', strength: 2 },
      { kind: 'align', text: 'Same goals, same pace. Built for the long run.', strength: 3 },
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
      { kind: 'pull', text: 'Great texter. Flirty, quick, keeps you laughing.', strength: 3 },
      { kind: 'push', text: 'She changes plans a lot. Lock in the ones that matter.', strength: 2 },
      { kind: 'align', text: 'She keeps things light; you keep them grounded.', strength: 2 },
    ],
    dealbreakers: 'Bad texters. Nowhere to dance. People who never ask a question back.',
  },
  {
    id: 'a29', initial: 'Amara', name: 'Amara', age: 29, sign: 'sagittarius', moon: 'leo', rising: 'aries',
    serial: '№ 044', pull: 'Strong pull', alignsBack: false, photo: 'img/people/p8.jpg',
    reading: [
      { kind: 'pull', text: 'Confident. She’ll ask you out before you ask her.', strength: 3 },
      { kind: 'push', text: 'She moves fast; you like to be sure. Say what pace works.', strength: 3 },
      { kind: 'align', text: 'She brings the adventure, you bring the home base.', strength: 2 },
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
    'Thoughtful. Remembers how you take your coffee.', 'He needs to hear it. Say how you feel, even when it’s obvious.', 'Two homebodies. Cooking in beats going out.',
    'Coldness. Flaky plans. People who never call their mum.'),
  { ...p('n27', 'Noor', 27, 'libra', 'gemini', 'img/people/p5.jpg', '№ 049', 'Slow burn',
    'Same taste in food, music and people.', 'She weighs every option; you’ve already picked. Meet halfway.', 'She brings the ideas, you bring the plan.',
    'Rudeness to waiters. One-word answers. Bad shoes.'), founder: 77 },
  p('j28', 'Jae', 28, 'sagittarius', 'aries', 'img/people/p4.jpg', '№ 052', 'Wild card',
    'Spontaneous. Makes an ordinary Tuesday memorable.', 'He wants to travel; you want to stay. Plan one trip together.', 'Works if he explores and you’re the home he comes back to.',
    'Small talk. Closed minds. Anyone who hates travel.'),
  p('b25', 'Bianca', 25, 'taurus', 'pisces', 'img/people/p10.jpg', '№ 055', 'Strong pull',
    'Same sign. You get each other without explaining.', 'Both stubborn. Pick your battles — and who picks dinner.', 'Slow, steady, loyal. Good food, little drama.',
    'Rushing. Cheap wine. Being late to dinner.'),
  { ...p('i24', 'Ivy', 24, 'pisces', 'taurus', 'img/people/p12.jpg', '№ 058', 'Steady pull',
    'Picks up on your mood before you say a word.', 'She drifts; you like to decide. Don’t steamroll her.', 'Tender and patient. A strong long-term match.',
    'Cynics. Shouting. Anyone who laughs at horoscopes.'), founder: 203 },
  p('d31', 'Dev', 31, 'leo', 'libra', 'img/people/p6.jpg', '№ 061', 'Wild card',
    'Charming and bold. Never a dull night out.', 'He likes the spotlight; you like the good seat. Let him have it.', 'He brings the energy, you bring the consistency.',
    'Being ignored. Grey outfits. Leaving early.'),
  p('r29b', 'Rosa', 29, 'gemini', 'cancer', 'img/people/p7.jpg', '№ 064', 'Slow burn',
    'Gets you talking, even on your quiet days.', 'She likes new; you like familiar. Take turns picking.', 'She keeps it moving, you keep it real.',
    'Boredom. Texting “k”. Anyone who won’t try the new place.'),
]

/** Dealt only by the Comet event: people from outside tonight's sky. */
export const COMETS: Profile[] = [
  p('e30', 'Elio', 30, 'aquarius', 'gemini', 'img/people/p2.jpg', '№ 071', 'Wild card',
    'Unpredictable in a good way. Always has a new idea.', 'He’s on his phone a lot. Agree on phone-free dates.', 'He brings what’s new, you keep what’s good.',
    'Routine for its own sake. Phones at dinner (his own rule, he breaks it).'),
  p('m27', 'Mina', 27, 'capricorn', 'scorpio', 'img/people/p3.jpg', '№ 073', 'Strong pull',
    'Direct. You’ll always know where you stand.', 'Two planners, few surprises. Someone has to be spontaneous.', 'Same goals, same work ethic. Built to last.',
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
/** Align+ peeks: a weekly allowance, not unlimited (no pay-to-win) */
export const PEEKS_PER_WEEK_PLUS = 33
