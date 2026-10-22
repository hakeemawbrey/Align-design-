import { SIGNS, type SignId } from '../../data/signs'
import { ME } from '../../data/profiles'
import { PERSONA, type PersonaId } from '../../data/persona'
import { SIGN_FACTS } from '../../data/signFacts'
import { SUN_HOUSE, VENUS_DEGREE, ordinal } from '../../data/myBirth'

/**
 * The glossary (S-20) and the term explainer (S-16): every astro word Align
 * uses, in plain English, with what it means in your chart and in Juniper's.
 * Names, codes and facts follow your placements (ME, SIGN_FACTS, your natal
 * chart); "mine" and "hers" are written per founder (MINE below).
 * Hakeem: Taurus sun (8th house), Sagittarius moon, Libra rising, Venus in Aries.
 * Xavier: Capricorn sun (4th house), Gemini moon, Libra rising, Venus in Sagittarius.
 * Jeremy: Cancer sun (1st house), Sagittarius moon, Cancer rising, Venus in Leo.
 * Samid: Scorpio sun (7th house), Gemini moon, Taurus rising, Venus in Capricorn.
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

type Mine = Pick<Term, 'mine' | 'hers'> & Partial<Pick<Term, 'tryLine' | 'facts'>>

const HAKEEM_MOON: Mine = {
  mine: 'Sagittarius moon. You need room, honesty and something new. Holding on tight shuts you down; a plan for somewhere new opens you up.',
  hers: 'Juniper is a Gemini moon. She feels by talking it out, out loud, the same night. Your opposite moon, which can be very good.',
}
const HAKEEM_EARTH: Mine = {
  mine: 'You are earth. You click easiest with earth and water. Air brings ideas you lack; fire brings spark that can feel like too much.',
  hers: 'Juniper is air. She lives in ideas and conversation, which is why talking to her is easy and deciding with her is slow.',
}
const HAKEEM_SEVENTH: Mine = {
  mine: 'Your seventh house starts in Aries. You want a partner who keeps up and pushes back, not one who agrees with everything.',
  hers: 'Juniper’s sun sits in her seventh house. She becomes most herself with someone across the table. That is you, on Friday.',
}

/** what each term means in each founder's chart, and in Juniper's next to it */
const MINE: Record<PersonaId, Record<string, Mine>> = {
  hakeem: {
    rising: {
      mine: 'Libra rising. You come across warm, easy and put-together, so people relax around you fast. Your steadier Taurus core shows up later.',
      hers: 'Juniper is Aquarius rising: friendly but a little hard to read at first. Give it a second date before you decide what she thinks.',
    },
    sun: {
      mine: 'Taurus sun. You need steadiness, comfort and time. A slow yes from you is worth more than a fast one.',
      hers: 'Juniper is a Libra sun. Libra and Taurus share a ruling planet, Venus, so you like the same things for different reasons.',
    },
    moon: HAKEEM_MOON,
    venus: {
      mine: 'Venus in Aries. You go first and you like being chased back. Under a calm Taurus sun, that surprises people.',
      hers: 'Juniper’s Venus is in Virgo. She shows love through small, careful favours. Notice them; she will not point them out.',
    },
    earth: HAKEEM_EARTH,
    mode: {
      mine: 'Taurus is fixed. Once you decide, you hold. It makes you loyal, and slow to move when you should.',
      hers: 'Libra is cardinal: she starts things. Let her pick the plan; you will be the one who keeps it.',
    },
    'seventh-house': HAKEEM_SEVENTH,
    'eighth-house': {
      mine: 'Your sun sits in the eighth. Casual rarely satisfies you. You want to be fully seen, and you need to know it is safe first.',
      hers: 'Juniper has nothing in her eighth. She will not push for depth; you will have to offer it.',
    },
    ruler: {
      mine: 'Taurus is ruled by Venus: affection, pleasure, beauty and what you value. You show love through care, food and time.',
      hers: 'Libra is ruled by Venus too. You and Juniper answer to the same planet, so a Venus week hits you both.',
    },
    retrograde: {
      mine: 'Venus is retrograde until Nov 13, and Venus rules your sign. Old feelings come back. Look at them; do not lock anything in yet.',
      hers: 'Juniper’s sign is ruled by Venus too, so she is feeling it. A slow week to start something is fine.',
    },
    'saturn-return': {
      mine: 'Yours lands next year, at 29. Expect to get serious about what, and who, you want long term.',
      hers: 'Juniper’s is a couple of years out. She is still experimenting; you are about to stop.',
    },
    mercury: {
      mine: 'Your Mercury is in Taurus: you say it slowly and mean it. One-word texts from you are not cold; they are finished thoughts.',
      hers: 'Juniper’s Mercury is in Libra. She softens everything. Ask her what she would say if she were not being polite.',
      facts: ['Mercury · Taurus', 'Rules Gemini, Virgo'],
    },
  },
  xavier: {
    rising: {
      mine: 'Libra rising. You come across warm, easy and put-together, so people relax around you fast. Your serious Capricorn core shows up later.',
      hers: 'Juniper is Aquarius rising: friendly but a little hard to read at first. Give it a second date before you decide what she thinks.',
    },
    sun: {
      mine: 'Capricorn sun. You need a goal, respect and proof over time. You mean what you say, so you say it carefully.',
      hers: 'Juniper is a Libra sun. You are both cardinal signs, both starters. Take turns picking the plan.',
    },
    moon: {
      mine: 'Gemini moon. You need talk, questions and something new to think about. Silence shuts you down; a good conversation opens you up.',
      hers: 'Juniper is a Gemini moon too. You both feel by talking it out, the same night. You will not run out of things to say.',
      tryLine: 'Ask a match a question you really don’t know the answer to.',
    },
    venus: {
      mine: 'Venus in Sagittarius. You love with honesty and a bit of adventure. Under a careful Capricorn sun, that spark surprises people.',
      hers: 'Juniper’s Venus is in Virgo. She shows love through small, careful favours. Notice them; she will not point them out.',
      tryLine: 'Plan a date somewhere neither of you has been.',
    },
    earth: HAKEEM_EARTH,
    mode: {
      mine: 'Capricorn is cardinal. You start things and then see them through. It makes you dependable, and slow to drop a plan that is not working.',
      hers: 'Libra is cardinal too: she starts things as well. Agree on who plans the first date, and who plans the second.',
    },
    'seventh-house': HAKEEM_SEVENTH,
    'eighth-house': {
      mine: 'Saturn sits in your eighth. Trust comes slowly, and you test it before you give it. Once it is there, it holds.',
      hers: 'Juniper has nothing in her eighth. She will not push for depth; you will have to offer it.',
    },
    'sun-house': {
      mine: 'Your sun sits in the fourth. Home and family matter more than you let on. People earn the private you, and once they do, they are in.',
      hers: 'Juniper’s sun sits in her seventh: she is most herself across the table from someone. You are most yourself at home. Invite her over.',
    },
    ruler: {
      mine: 'Capricorn is ruled by Saturn: time, commitment and what lasts. You show love by showing up, every time.',
      hers: 'Libra is ruled by Venus. She wants it beautiful; you want it to last. Both are ways of caring.',
      tryLine: 'Write down what you want this to look like in a year.',
    },
    retrograde: {
      mine: 'Venus is retrograde until Nov 13. It is not your ruler, but it slows love down for everyone, and slow suits you. Do not lock anything in yet.',
      hers: 'Juniper’s sign is ruled by Venus, so she is feeling it. A slow week to start something is fine.',
    },
    'saturn-return': {
      mine: 'Yours lands in about three years, at 29, and Saturn is your ruler, so you will feel it. Expect to get very clear about what, and who, you want.',
      hers: 'Juniper’s comes a little sooner than yours. She is about to get serious; meet her there.',
    },
    mercury: {
      mine: 'Your Mercury is in Capricorn: you say less and mean all of it. Short texts from you are not cold; they are decisions.',
      hers: 'Juniper’s Mercury is in Libra. She softens everything. Ask her what she would say if she were not being polite.',
      facts: ['Mercury · Capricorn', 'Rules Gemini, Virgo'],
    },
  },
  jeremy: {
    rising: {
      mine: 'Cancer rising. You come across warm and caring, a little guarded at first. Your sun is Cancer too, so who people meet first is who you are.',
      hers: 'Juniper is Aquarius rising: friendly but a little hard to read at first. Give it a second date before you decide what she thinks.',
    },
    sun: {
      mine: 'Cancer sun. You need closeness, loyalty and somewhere that feels like home. You look after people before they ask.',
      hers: 'Juniper is a Libra sun. You lead with feeling; she leads with fairness. Neither of you likes a fight, so say the hard thing gently.',
    },
    // a Sagittarius moon, like Hakeem's
    moon: HAKEEM_MOON,
    venus: {
      mine: 'Venus in Leo. You love out loud: big gestures, birthdays done right, compliments in public. Under a soft Cancer sun, that shine surprises people.',
      hers: 'Juniper’s Venus is in Virgo. She shows love through small, careful favours. Notice them; she will not point them out.',
      tryLine: 'Plan something with a little show to it.',
    },
    earth: {
      mine: 'You are water, not earth, but earth is one of your best matches. Earth signs give your feelings somewhere solid to land.',
      hers: 'Juniper is air. She lives in ideas and conversation, which is why talking to her is easy and deciding with her is slow.',
    },
    water: {
      mine: 'You are water. You feel first and read a room fast. Earth gives you a shape; air can feel far away.',
      hers: 'Juniper is air. She thinks a feeling through before she shows it. Give her time; she is not being cold.',
    },
    mode: {
      mine: 'Cancer is cardinal. You start things: the plan, the dinner, the group chat. It makes you the host, and quick to feel it when nobody else steps up.',
      hers: 'Libra is cardinal too: she starts things as well. Agree on who plans the first date, and who plans the second.',
    },
    'seventh-house': {
      mine: 'Your seventh house starts in Capricorn. You want a partner who is steady and serious, someone who builds a life with you.',
      hers: 'Juniper’s sun sits in her seventh house. She becomes most herself with someone across the table. That is you, on Friday.',
    },
    'eighth-house': {
      mine: 'Nothing sits in your eighth. Depth comes to you through feeling, not tests. You let people in when they feel safe, not when they prove it.',
      hers: 'Juniper has nothing in her eighth either. Neither of you will push for depth; one of you has to offer it.',
    },
    'sun-house': {
      mine: 'Your sun sits in the first, right on your rising. What people see is what they get. You want the same back, and mixed signals wear you out.',
      hers: 'Juniper’s sun sits in her seventh: she becomes herself with someone across the table. You walk in already yourself. Let her catch up.',
    },
    ruler: {
      mine: 'Cancer is ruled by the Moon: feelings, home and what makes you feel safe. Your mood moves with it, so watch the phases.',
      hers: 'Libra is ruled by Venus. She wants it beautiful; you want it to feel like home. Both are ways of caring.',
      tryLine: 'Write down three things that make you feel at home.',
    },
    retrograde: {
      mine: 'Venus is retrograde until Nov 13, backing through your house of dating. Old flames come back around. Look at them; do not lock anything in yet.',
      hers: 'Juniper’s sign is ruled by Venus, so she is feeling it. A slow week to start something is fine.',
    },
    'saturn-return': {
      mine: 'Yours is five years out, at 29. Until then you get to try things. You will still want somewhere to come home to.',
      hers: 'Juniper’s is a couple of years out, sooner than yours. She is about to get serious; meet her there.',
    },
    mercury: {
      mine: 'Your Mercury is in Gemini: quick, funny, lots of questions. You text like you talk, and you notice when someone does not.',
      hers: 'Juniper’s Mercury is in Libra. She softens everything. Ask her what she would say if she were not being polite.',
      facts: ['Mercury · Gemini', 'Rules Gemini, Virgo'],
    },
  },
  samid: {
    rising: {
      mine: 'Taurus rising. You come across calm, warm and easy to be around, so people relax fast. Your intense Scorpio core shows up later.',
      hers: 'Juniper is Aquarius rising: friendly but a little hard to read at first. Give it a second date before you decide what she thinks.',
    },
    sun: {
      mine: 'Scorpio sun. You need trust, honesty and something real. You are all in or not at all, and you can tell when someone is faking it.',
      hers: 'Juniper is a Libra sun. She smooths things over; you want the real answer. Ask once, gently, then let her get there.',
    },
    moon: {
      mine: 'Gemini moon. You need talk, questions and something new to think about. A good conversation is how you get close.',
      hers: 'Juniper is a Gemini moon too. You both feel by talking it out, the same night. You will not run out of things to say.',
      tryLine: 'Ask a match a question you really don’t know the answer to.',
    },
    venus: {
      mine: 'Venus in Capricorn. You love by showing up and keeping your word. Under an intense Scorpio sun, that steadiness surprises people.',
      hers: 'Juniper’s Venus is in Virgo. She shows love through small, careful favours. You are both earth here: you love with actions.',
      tryLine: 'Plan a date and keep every detail you promised.',
    },
    earth: {
      mine: 'You are water, not earth, but your rising and Venus are both earth. Earth signs give your feelings somewhere solid to land.',
      hers: 'Juniper is air. She lives in ideas and conversation, which is why talking to her is easy and deciding with her is slow.',
    },
    water: {
      mine: 'You are water. You feel first and read people fast, especially who is being real. Earth steadies you; air can feel far away.',
      hers: 'Juniper is air. She thinks a feeling through before she shows it. Give her time; she is not being cold.',
    },
    mode: {
      mine: 'Scorpio is fixed. Once you decide, you hold. It makes you loyal, and slow to let go when you should.',
      hers: 'Libra is cardinal: she starts things. Let her pick the plan; you will be the one who keeps it.',
    },
    'seventh-house': {
      mine: 'Your sun sits in your seventh, the house of partners. You are most yourself one-on-one, and you want a real partner, not a pastime.',
      hers: 'Juniper’s sun sits in her seventh house too. You both become yourselves across the table from someone. That is a good start.',
    },
    'eighth-house': {
      mine: 'Nothing sits in your eighth, but your Scorpio sun rules it. Depth comes naturally to you; you go there whether you mean to or not.',
      hers: 'Juniper has nothing in her eighth. She will not push for depth; you will bring it. Go gently.',
    },
    'sun-house': {
      mine: 'Your sun sits in the seventh: partners. You become yourself with one person across the table, not in a crowd.',
      hers: 'Juniper’s sun sits in her seventh too. You both light up one-on-one. Skip the group hang.',
    },
    ruler: {
      mine: 'Scorpio is ruled by Pluto and Mars: depth, change and drive. Love changes you, and you want it to.',
      hers: 'Libra is ruled by Venus. She wants it beautiful; you want it real. Both are ways of caring.',
      tryLine: 'Write down one thing you want love to change in you.',
    },
    retrograde: {
      mine: 'Venus is retrograde in your seventh house, partners, and turns direct on Nov 13: your birthday. Old flames come back around until then. Do not lock anything in yet.',
      hers: 'Juniper’s sign is ruled by Venus, so she is feeling it. A slow week to start something is fine.',
    },
    'saturn-return': {
      mine: 'Yours is about four years out, at 29, and Saturn sits on your rising. You will feel it in how you show up. Until then, get to know what you want.',
      hers: 'Juniper’s comes a little sooner than yours. She is about to get serious; meet her there.',
    },
    mercury: {
      mine: 'Your Mercury is in Scorpio: you ask the question under the question. You notice what people leave out, and you remember it.',
      hers: 'Juniper’s Mercury is in Libra. She softens everything. Ask her what she would say if she were not being polite.',
      facts: ['Mercury · Scorpio', 'Rules Gemini, Virgo'],
    },
  },
}
const M = MINE[PERSONA.id]
const name = (id: SignId) => SIGNS[id].name
const SUN = SIGN_FACTS[ME.sign]
/** planet spheres for the ruler card */
const RULER_ART: Record<string, { color: string; light: string; dark: string; tint: string }> = {
  Venus: { color: '#d9867a', light: '#ffe0d2', dark: '#3a1410', tint: '#f3a98f' },
  Mercury: { color: '#6a8ab0', light: '#dfeaff', dark: '#101a2e', tint: '#9ec4ff' },
  Saturn: { color: '#a08a6a', light: '#f2e6cc', dark: '#2a2010', tint: '#d8c49a' },
  'The Moon': { color: '#9a90b0', light: '#f2eefa', dark: '#1c1830', tint: '#b3a6c4' },
  'Pluto & Mars': { color: '#9a3a52', light: '#ffd2dc', dark: '#2a0a14', tint: '#c9708a' },
}
/** 'Venus', or 'the Moon' mid-sentence */
const RULER_NAME = SUN.ruler.replace(/^The /, 'the ')
const RULER = RULER_ART[SUN.ruler] ?? RULER_ART.Venus

/** houses a founder's sun sits in, besides the eighth (which every chart already gets) */
type HouseTerm = Pick<Term, 'slug' | 'name' | 'title' | 'line' | 'code' | 'headline' | 'meaning' | 'tryLine' | 'facts' | 'color'>
const HOUSE_TERMS: Partial<Record<number, HouseTerm>> = {
  1: {
    slug: 'first-house', name: 'First house', title: 'The first house.', line: 'You, walking into the room.', code: 'House I',
    headline: 'The self you lead with.',
    meaning: 'Houses are the twelve slices of the sky, each one an area of life. The first is you: your body, your style, the way you walk into a room.',
    tryLine: 'Make the first move on a match you like.', facts: ['House I', 'Ruled by Mars'], color: '#f2c75c',
  },
  4: {
    slug: 'fourth-house', name: 'Fourth house', title: 'The fourth house.', line: 'Home, roots, the private you.', code: 'House IV',
    headline: 'Where you go to be yourself.',
    meaning: 'Houses are the twelve slices of the sky, each one an area of life. The fourth is home, family and the part of you only a few people see.',
    tryLine: 'Tell a match about the place that feels most like home.', facts: ['House IV', 'Ruled by the Moon'], color: '#7fd8b0',
  },
}
const SUN_HOUSE_TERM = SUN_HOUSE !== 8 && M['sun-house'] ? HOUSE_TERMS[SUN_HOUSE] : undefined

export const TERMS: Term[] = [
  {
    slug: 'rising', kind: 'sign', name: 'Rising sign', yours: name(ME.rising), free: true,
    title: 'Your rising sign.', line: 'The face you lead with.', code: `Rising · ${name(ME.rising)}`,
    headline: 'First impressions, before anyone asks.',
    meaning: 'Your rising sign is the sign that was coming up over the horizon when you were born. It is how strangers read you in the first five minutes, before they know anything else.',
    ...M.rising,
    tryLine: M.rising.tryLine ?? 'Ask a match how they think they come across.',
    facts: ['Needs a birth time', 'Changes every 2 hours'],
    art: { kind: 'aura', sign: ME.rising }, color: '#c9a8ff',
  },
  {
    slug: 'sun', kind: 'sign', name: 'Sun sign', yours: name(ME.sign), free: true,
    title: 'Your sun sign.', line: 'Who you are, once the room clears.', code: `Sun · ${name(ME.sign)}`,
    headline: 'The thing you are, under everything.',
    meaning: 'Your sun sign is where the sun was on the day you were born. It is the sign people mean when they ask “what are you?”: your core, and what you need to feel like yourself.',
    ...M.sun,
    tryLine: M.sun.tryLine ?? 'Tell a match one thing you would happily do every week.',
    facts: ['Changes every month', `Ruled by ${RULER_NAME}`],
    art: { kind: 'aura', sign: ME.sign }, color: '#e3e86a',
  },
  {
    slug: 'moon', kind: 'sign', name: 'Moon sign', yours: name(ME.moon), free: true,
    title: 'Your moon sign.', line: 'What you need at 2am.', code: `Moon · ${name(ME.moon)}`,
    headline: 'What you need and will not admit.',
    meaning: 'Your moon sign is where the moon was when you were born. It covers feelings: what makes you feel safe, and how you act when you do not.',
    ...M.moon,
    tryLine: M.moon.tryLine ?? 'Suggest a first date somewhere neither of you has been.',
    facts: ['Changes every 2.5 days', 'Read with the sun'],
    art: { kind: 'aura', sign: ME.moon }, color: '#7fa6ff',
  },
  {
    slug: 'venus', kind: 'sign', name: 'Venus sign', yours: name(ME.venus), free: true,
    title: 'Your Venus sign.', line: 'How you love, and how you stall.', code: `Venus · ${name(ME.venus)}`,
    headline: 'How you love, out loud.',
    meaning: 'Venus is the planet of love and taste. The sign it was in when you were born shows how you flirt, what you find beautiful and how you show you care.',
    ...M.venus,
    tryLine: M.venus.tryLine ?? 'Make the first plan instead of waiting to be asked.',
    facts: [`Venus · ${VENUS_DEGREE}° ${name(ME.venus)}`, 'Read with your sun'],
    art: { kind: 'aura', sign: ME.venus }, color: '#f3a98f',
  },
  {
    slug: 'earth', kind: 'element', name: 'Earth', yours: SIGNS[ME.sign].element === 'earth' ? 'your element' : undefined,
    title: 'The earth element.', line: 'Love you can touch.', code: 'Element · Earth',
    headline: 'Actions over words.',
    meaning: 'Every sign belongs to one of four elements: fire, earth, air or water. Earth signs (Taurus, Virgo, Capricorn) trust what people do more than what they say.',
    ...M.earth,
    tryLine: M.earth.tryLine ?? 'Plan a date where you make something together.',
    facts: ['Taurus · Virgo · Capricorn', 'Steady, practical'],
    art: { kind: 'planet', color: '#3f9a6a', light: '#c9f0c8', dark: '#0c2a1c' }, color: '#7fd8b0',
  },
  // your element, when it isn't earth
  ...(SIGNS[ME.sign].element === 'water' ? [{
    slug: 'water', kind: 'element', name: 'Water', yours: 'your element',
    title: 'The water element.', line: 'Love you can feel.', code: 'Element · Water',
    headline: 'Feelings first.',
    meaning: 'Every sign belongs to one of four elements: fire, earth, air or water. Water signs (Cancer, Scorpio, Pisces) feel first and think second. How someone makes them feel matters most.',
    ...M.water,
    tryLine: M.water.tryLine ?? 'Plan a date that feels cosy: cook in, a long walk, somewhere quiet.',
    facts: ['Cancer · Scorpio · Pisces', 'Deep, intuitive'],
    art: { kind: 'planet', color: '#3f7cf0', light: '#b8d4ff', dark: '#0a1640' }, color: '#7fb8f0',
  } satisfies Term] : []),
  {
    slug: 'mode', kind: 'element', name: 'Mode', yours: SUN.mode.toLowerCase(),
    title: 'Fixed, cardinal, mutable.', line: 'How a sign handles change.', code: `Mode · ${SUN.mode}`,
    headline: 'Starters, keepers and shifters.',
    meaning: 'Each sign has a mode. Cardinal signs start things, fixed signs keep them going, mutable signs adapt. It explains a lot of arguments.',
    ...M.mode,
    tryLine: M.mode.tryLine ?? 'Notice who starts plans in your chats, and who keeps them.',
    facts: ['Cardinal · Fixed · Mutable', 'Four signs each'],
    art: { kind: 'planet', color: '#7b5fd0', light: '#e2d6ff', dark: '#1a0f3a' }, color: '#b18cff',
  },
  {
    slug: 'seventh-house', kind: 'house', name: 'Seventh house',
    title: 'The seventh house.', line: 'The person opposite you.', code: 'House VII',
    headline: 'Partners, rivals, equals.',
    meaning: 'The seventh house is the part of the chart about the person opposite you — partners, close rivals, anyone you meet as an equal rather than manage. A planet here only switches on in company, which is why Align reads this house before it reads a face.',
    ...M['seventh-house'],
    tryLine: M['seventh-house'].tryLine ?? 'It is lit in your chart — see where.',
    facts: ['House VII', 'Ruled by Venus'],
    art: { kind: 'wheel', house: 7 }, color: '#e8a6d6',
  },
  {
    slug: 'eighth-house', kind: 'house', name: 'Eighth house', yours: SUN_HOUSE === 8 ? 'your sun' : undefined,
    title: 'The eighth house.', line: 'Trust that goes all the way down.', code: 'House VIII',
    headline: 'Letting someone all the way in.',
    meaning: 'Houses are the twelve slices of the sky, each one an area of life. The eighth is closeness, shared things and trust: what you only show once it is safe.',
    ...M['eighth-house'],
    tryLine: M['eighth-house'].tryLine ?? 'Answer a question more honestly than feels comfortable.',
    facts: ['House VIII', 'Ruled by Pluto'],
    art: { kind: 'wheel', house: 8 }, color: '#e8628a',
  },
  // the house your sun sits in, when it is not the eighth (Xavier: the fourth, Jeremy: the first)
  ...(SUN_HOUSE_TERM ? [{
    ...SUN_HOUSE_TERM, kind: 'house', yours: 'your sun',
    ...M['sun-house'],
    tryLine: M['sun-house'].tryLine ?? SUN_HOUSE_TERM.tryLine,
    art: { kind: 'wheel', house: SUN_HOUSE },
  } satisfies Term] : []),
  {
    slug: 'ruler', kind: 'planet', name: 'Ruling planet', yours: SUN.ruler,
    title: 'Your ruling planet.', line: 'The planet your sign answers to.', code: `Ruler · ${SUN.ruler}`,
    headline: 'Every sign has a boss.',
    meaning: 'Each sign is ruled by a planet that shapes what it wants. When that planet moves, the whole sign feels it, which is why Align watches yours.',
    ...M.ruler,
    tryLine: M.ruler.tryLine ?? 'Write down three things that make you feel loved.',
    facts: [`${name(ME.sign)} → ${SUN.ruler}`, 'Libra → Venus'],
    art: { kind: 'planet', color: RULER.color, light: RULER.light, dark: RULER.dark }, color: RULER.tint,
  },
  {
    slug: 'retrograde', kind: 'planet', name: 'Retrograde',
    title: 'Retrograde.', line: 'A planet that seems to walk backwards.', code: 'Motion · Retrograde',
    headline: 'Go back over it. Do not sign it yet.',
    meaning: 'From Earth, a planet sometimes looks like it is moving backwards. It is not really, but astrologers read it as a time to revisit, not to start. Venus retrograde is about love; Mercury retrograde is about talk.',
    ...M.retrograde,
    tryLine: M.retrograde.tryLine ?? 'Revisit what you actually want before you ask for it.',
    facts: ['Venus Rx · to Nov 13', 'A few times a year'],
    art: { kind: 'planet', color: '#c9a032', light: '#fff1b8', dark: '#3a2a08', ring: '#e8c860' }, color: '#e3c86a',
  },
  {
    slug: 'saturn-return', kind: 'planet', name: 'Saturn return',
    title: 'Saturn return.', line: 'The bill the sky sends at twenty-nine.', code: 'Planet · Saturn',
    headline: 'The grown-up check-in.',
    meaning: 'Saturn takes about 29 years to go round the sun. When it gets back to where it was when you were born, life tends to ask what you are really building.',
    ...M['saturn-return'],
    tryLine: M['saturn-return'].tryLine ?? 'Say what you are looking for in your first three messages.',
    facts: ['Every 29 years', 'Ruled by Saturn'],
    art: { kind: 'planet', color: '#a08a6a', light: '#f2e6cc', dark: '#2a2010', ring: '#d8c49a' }, color: '#d8c49a',
  },
  {
    slug: 'mercury', kind: 'planet', name: 'Mercury',
    title: 'Mercury.', line: 'The planet of talk.', code: 'Planet · Mercury',
    headline: 'How you text, argue and make up.',
    meaning: 'Mercury rules talking, thinking and messages. Its sign shows how you say things, and how you like to be spoken to.',
    ...M.mercury,
    tryLine: M.mercury.tryLine ?? 'Send one message you did not edit three times.',
    facts: M.mercury.facts ?? ['Mercury · Taurus', 'Rules Gemini, Virgo'],
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
  ['water signs', 'water'],
  // the house your sun sits in, linked to its own card
  ...(SUN_HOUSE_TERM ? [[`${ordinal(SUN_HOUSE)} house`, SUN_HOUSE_TERM.slug], [`the ${ordinal(SUN_HOUSE)}`, SUN_HOUSE_TERM.slug]] : []),
].map(([w, slug]) => [w, w === 'houses' && SUN_HOUSE_TERM ? SUN_HOUSE_TERM.slug : slug] as [string, string])
  .filter(([, slug]) => slug in TERM)

/** stamped by the glossary when it opens a term, so the explainer's CTA can step back to it */
export const termFrom = { at: 0 }
