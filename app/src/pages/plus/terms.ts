import type { SignId } from '../../data/signs'

/**
 * The glossary (S-20) and the term explainer (S-16): every astro word Align
 * uses, in plain English, with what it means in your chart and in Juniper's.
 * Hakeem: Taurus sun (8th house), Sagittarius moon, Libra rising, Venus in Aries.
 * Juniper: Libra sun (7th house), Gemini moon, Aquarius rising.
 */

export type TermKind = 'sign' | 'element' | 'house' | 'planet'

export interface Term {
  slug: string
  kind: TermKind
  /** row title in the glossary, e.g. 'Rising sign' */
  name: string
  /** your placement, shown after a dot in the glossary row: 'Libra' */
  yours?: string
  /** big title on the explainer card */
  title: string
  /** one line under it: what the word means in five words */
  line: string
  /** eyebrow on the card's first page, e.g. 'House VII' */
  code: string
  headline: string
  meaning: string
  mine: string
  hers: string
  tryLine: string
  /** the two facts on the card's footer */
  facts: [string, string]
  /** art: a sign aura, a planet sphere or the house wheel */
  art: { kind: 'aura'; sign: SignId } | { kind: 'planet'; color: string; light: string; dark: string; ring?: string } | { kind: 'wheel'; house: number }
  /** card tint */
  color: string
  /** free for everyone; the rest unlock with Align+ */
  free?: boolean
}

export const TERMS: Term[] = [
  {
    slug: 'rising', kind: 'sign', name: 'Rising sign', yours: 'Libra', free: true,
    title: 'Your rising sign.', line: 'The face you lead with.', code: 'Rising · Libra',
    headline: 'First impressions, before anyone asks.',
    meaning: 'Your rising sign is the sign that was coming up over the horizon when you were born. It is how strangers read you in the first five minutes, before they know anything else.',
    mine: 'Libra rising. You come across warm, easy and put-together, so people relax around you fast. Your steadier Taurus core shows up later.',
    hers: 'Juniper is Aquarius rising: friendly but a little hard to read at first. Give it a second date before you decide what she thinks.',
    tryLine: 'Ask a match how they think they come across.',
    facts: ['Needs a birth time', 'Changes every 2 hours'],
    art: { kind: 'aura', sign: 'libra' }, color: '#c9a8ff',
  },
  {
    slug: 'sun', kind: 'sign', name: 'Sun sign', yours: 'Taurus', free: true,
    title: 'Your sun sign.', line: 'Who you are, once the room clears.', code: 'Sun · Taurus',
    headline: 'The thing you are, under everything.',
    meaning: 'Your sun sign is where the sun was on the day you were born. It is the sign people mean when they ask “what are you?”: your core, and what you need to feel like yourself.',
    mine: 'Taurus sun. You need steadiness, comfort and time. A slow yes from you is worth more than a fast one.',
    hers: 'Juniper is a Libra sun. Libra and Taurus share a ruling planet, Venus, so you like the same things for different reasons.',
    tryLine: 'Tell a match one thing you would happily do every week.',
    facts: ['Changes every month', 'Ruled by Venus'],
    art: { kind: 'aura', sign: 'taurus' }, color: '#e3e86a',
  },
  {
    slug: 'moon', kind: 'sign', name: 'Moon sign', yours: 'Sagittarius', free: true,
    title: 'Your moon sign.', line: 'What you need at 2am.', code: 'Moon · Sagittarius',
    headline: 'What you need and will not admit.',
    meaning: 'Your moon sign is where the moon was when you were born. It covers feelings: what makes you feel safe, and how you act when you do not.',
    mine: 'Sagittarius moon. You need room, honesty and something new. Holding on tight shuts you down; a plan for somewhere new opens you up.',
    hers: 'Juniper is a Gemini moon. She feels by talking it out, out loud, the same night. Your opposite moon, which can be very good.',
    tryLine: 'Suggest a first date somewhere neither of you has been.',
    facts: ['Changes every 2.5 days', 'Read with the sun'],
    art: { kind: 'aura', sign: 'sagittarius' }, color: '#7fa6ff',
  },
  {
    slug: 'venus', kind: 'sign', name: 'Venus sign', yours: 'Aries', free: true,
    title: 'Your Venus sign.', line: 'How you love, and how you stall.', code: 'Venus · Aries',
    headline: 'How you love, out loud.',
    meaning: 'Venus is the planet of love and taste. The sign it was in when you were born shows how you flirt, what you find beautiful and how you show you care.',
    mine: 'Venus in Aries. You go first and you like being chased back. Under a calm Taurus sun, that surprises people.',
    hers: 'Juniper’s Venus is in Virgo. She shows love through small, careful favours. Notice them; she will not point them out.',
    tryLine: 'Make the first plan instead of waiting to be asked.',
    facts: ['Venus · 10° Aries', 'Read with your sun'],
    art: { kind: 'aura', sign: 'aries' }, color: '#f3a98f',
  },
  {
    slug: 'earth', kind: 'element', name: 'Earth', yours: 'your element',
    title: 'The earth element.', line: 'Love you can touch.', code: 'Element · Earth',
    headline: 'Actions over words.',
    meaning: 'Every sign belongs to one of four elements: fire, earth, air or water. Earth signs (Taurus, Virgo, Capricorn) trust what people do more than what they say.',
    mine: 'You are earth. You click easiest with earth and water. Air brings ideas you lack; fire brings spark that can feel like too much.',
    hers: 'Juniper is air. She lives in ideas and conversation, which is why talking to her is easy and deciding with her is slow.',
    tryLine: 'Plan a date where you make something together.',
    facts: ['Taurus · Virgo · Capricorn', 'Steady, practical'],
    art: { kind: 'planet', color: '#3f9a6a', light: '#c9f0c8', dark: '#0c2a1c' }, color: '#7fd8b0',
  },
  {
    slug: 'mode', kind: 'element', name: 'Mode', yours: 'fixed',
    title: 'Fixed, cardinal, mutable.', line: 'How a sign handles change.', code: 'Mode · Fixed',
    headline: 'Starters, keepers and shifters.',
    meaning: 'Each sign has a mode. Cardinal signs start things, fixed signs keep them going, mutable signs adapt. It explains a lot of arguments.',
    mine: 'Taurus is fixed. Once you decide, you hold. It makes you loyal, and slow to move when you should.',
    hers: 'Libra is cardinal: she starts things. Let her pick the plan; you will be the one who keeps it.',
    tryLine: 'Notice who starts plans in your chats, and who keeps them.',
    facts: ['Cardinal · Fixed · Mutable', 'Four signs each'],
    art: { kind: 'planet', color: '#7b5fd0', light: '#e2d6ff', dark: '#1a0f3a' }, color: '#b18cff',
  },
  {
    slug: 'seventh-house', kind: 'house', name: 'Seventh house',
    title: 'The seventh house.', line: 'The person opposite you.', code: 'House VII',
    headline: 'Partners, rivals, equals.',
    meaning: 'The seventh house is the part of the chart about the person opposite you — partners, close rivals, anyone you meet as an equal rather than manage. A planet here only switches on in company, which is why Align reads this house before it reads a face.',
    mine: 'Your seventh house starts in Aries. You want a partner who keeps up and pushes back, not one who agrees with everything.',
    hers: 'Juniper’s sun sits in her seventh house. She becomes most herself with someone across the table. That is you, on Friday.',
    tryLine: 'It is lit in your chart — see where.',
    facts: ['House VII', 'Ruled by Venus'],
    art: { kind: 'wheel', house: 7 }, color: '#e8a6d6',
  },
  {
    slug: 'eighth-house', kind: 'house', name: 'Eighth house', yours: 'your sun',
    title: 'The eighth house.', line: 'Trust that goes all the way down.', code: 'House VIII',
    headline: 'Letting someone all the way in.',
    meaning: 'Houses are the twelve slices of the sky, each one an area of life. The eighth is closeness, shared things and trust: what you only show once it is safe.',
    mine: 'Your sun sits in the eighth. Casual rarely satisfies you. You want to be fully seen, and you need to know it is safe first.',
    hers: 'Juniper has nothing in her eighth. She will not push for depth; you will have to offer it.',
    tryLine: 'Answer a question more honestly than feels comfortable.',
    facts: ['House VIII', 'Ruled by Pluto'],
    art: { kind: 'wheel', house: 8 }, color: '#e8628a',
  },
  {
    slug: 'ruler', kind: 'planet', name: 'Ruling planet', yours: 'Venus',
    title: 'Your ruling planet.', line: 'The planet your sign answers to.', code: 'Ruler · Venus',
    headline: 'Every sign has a boss.',
    meaning: 'Each sign is ruled by a planet that shapes what it wants. When that planet moves, the whole sign feels it, which is why Align watches yours.',
    mine: 'Taurus is ruled by Venus: affection, pleasure, beauty and what you value. You show love through care, food and time.',
    hers: 'Libra is ruled by Venus too. You and Juniper answer to the same planet, so a Venus week hits you both.',
    tryLine: 'Write down three things that make you feel loved.',
    facts: ['Taurus → Venus', 'Libra → Venus'],
    art: { kind: 'planet', color: '#d9867a', light: '#ffe0d2', dark: '#3a1410' }, color: '#f3a98f',
  },
  {
    slug: 'retrograde', kind: 'planet', name: 'Retrograde',
    title: 'Retrograde.', line: 'A planet that seems to walk backwards.', code: 'Motion · Retrograde',
    headline: 'Go back over it. Do not sign it yet.',
    meaning: 'From Earth, a planet sometimes looks like it is moving backwards. It is not really, but astrologers read it as a time to revisit, not to start. Venus retrograde is about love; Mercury retrograde is about talk.',
    mine: 'Venus is retrograde until Nov 13, and Venus rules your sign. Old feelings come back. Look at them; do not lock anything in yet.',
    hers: 'Juniper’s sign is ruled by Venus too, so she is feeling it. A slow week to start something is fine.',
    tryLine: 'Revisit what you actually want before you ask for it.',
    facts: ['Venus Rx · to Nov 13', 'A few times a year'],
    art: { kind: 'planet', color: '#c9a032', light: '#fff1b8', dark: '#3a2a08', ring: '#e8c860' }, color: '#e3c86a',
  },
  {
    slug: 'saturn-return', kind: 'planet', name: 'Saturn return',
    title: 'Saturn return.', line: 'The bill the sky sends at twenty-nine.', code: 'Planet · Saturn',
    headline: 'The grown-up check-in.',
    meaning: 'Saturn takes about 29 years to go round the sun. When it gets back to where it was when you were born, life tends to ask what you are really building.',
    mine: 'Yours lands next year, at 29. Expect to get serious about what, and who, you want long term.',
    hers: 'Juniper’s is a couple of years out. She is still experimenting; you are about to stop.',
    tryLine: 'Say what you are looking for in your first three messages.',
    facts: ['Every 29 years', 'Ruled by Saturn'],
    art: { kind: 'planet', color: '#a08a6a', light: '#f2e6cc', dark: '#2a2010', ring: '#d8c49a' }, color: '#d8c49a',
  },
  {
    slug: 'mercury', kind: 'planet', name: 'Mercury',
    title: 'Mercury.', line: 'The planet of talk.', code: 'Planet · Mercury',
    headline: 'How you text, argue and make up.',
    meaning: 'Mercury rules talking, thinking and messages. Its sign shows how you say things, and how you like to be spoken to.',
    mine: 'Your Mercury is in Taurus: you say it slowly and mean it. One-word texts from you are not cold; they are finished thoughts.',
    hers: 'Juniper’s Mercury is in Libra. She softens everything. Ask her what she would say if she were not being polite.',
    tryLine: 'Send one message you did not edit three times.',
    facts: ['Mercury · Taurus', 'Rules Gemini, Virgo'],
    art: { kind: 'planet', color: '#6a8ab0', light: '#dfeaff', dark: '#101a2e' }, color: '#9ec4ff',
  },
]

export const TERM = Object.fromEntries(TERMS.map((t) => [t.slug, t])) as Record<string, Term>

export const KIND_LABEL: Record<TermKind, string> = { sign: 'Signs', element: 'Elements', house: 'Houses', planet: 'Planets' }

/** words in reading copy that open a term, matched case-insensitively, longest first */
export const TERM_WORDS: [string, string][] = [
  ['rising sign', 'rising'], ['sun sign', 'sun'], ['moon sign', 'moon'], ['ruling planet', 'ruler'],
  ['retrograde', 'retrograde'], ['earth signs', 'earth'], ['8th house', 'eighth-house'], ['the 8th', 'eighth-house'],
  ['7th house', 'seventh-house'], ['rising', 'rising'], ['your moon', 'moon'], ['venus', 'venus'], ['houses', 'eighth-house'],
]

/** stamped by the glossary when it opens a term, so the explainer's CTA can step back to it */
export const termFrom = { at: 0 }
