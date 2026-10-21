import { PERSONA } from './persona'
import { ME } from './profiles'
import { SIGNS, type SignId } from './signs'
import type { EventId } from './draws'
import { houseOf, natalChart, retrograde, signOf, skyChart, transitsToChart, type Birth, type Hit, type Planet, type Point } from '../lib/astro'

/**
 * The daily Sky card: three cards drawn from the real sky against your birth
 * chart. You (your mood, always the Moon, so it changes every day), Love
 * (Venus and Mars) and Move (one thing to do, with a reward for your deck).
 */

/** your birth: whichever founder is playing (see persona.ts) */
export const MY_BIRTH: Birth = PERSONA.birth

export const PLANET: Record<Planet, { name: string; glyph: string; color: string; means: string }> = {
  sun: { name: 'Sun', glyph: '☉', color: '#ffc66b', means: 'who you are' },
  moon: { name: 'Moon', glyph: '☽', color: '#d8d0ff', means: 'your mood' },
  mercury: { name: 'Mercury', glyph: '☿', color: '#9fd8ff', means: 'how you talk' },
  venus: { name: 'Venus', glyph: '♀', color: '#ff9ac4', means: 'attraction' },
  mars: { name: 'Mars', glyph: '♂', color: '#ff7a5c', means: 'desire and drive' },
  jupiter: { name: 'Jupiter', glyph: '♃', color: '#ffb36a', means: 'luck and growth' },
  saturn: { name: 'Saturn', glyph: '♄', color: '#b9a6e6', means: 'commitment' },
}
const NATAL: Record<Point, { name: string; means: string }> = {
  sun: { name: 'Sun', means: 'your core self' }, moon: { name: 'Moon', means: 'what you need to feel safe' },
  mercury: { name: 'Mercury', means: 'how you talk' }, venus: { name: 'Venus', means: 'how you love' },
  mars: { name: 'Mars', means: 'how you go after what you want' }, jupiter: { name: 'Jupiter', means: 'your luck' },
  saturn: { name: 'Saturn', means: 'your limits' }, asc: { name: 'Rising', means: 'how you come across' },
}
const VERB = { conjunct: 'meets', sextile: 'opens a door for', trine: 'flows with', square: 'presses on', opposite: 'faces' } as const
const ASPECT_GLYPH = { conjunct: '☌', sextile: '⚹', square: '□', trine: '△', opposite: '☍' } as const
const HOUSE = ['', 'you and how you look', 'what you value', 'texting and small talk', 'home and family', 'romance and fun', 'routines and health', 'partners', 'intimacy and trust', 'adventure and big ideas', 'reputation', 'friends and groups', 'rest and secrets']
/** the Moon through each house: a different mood every couple of days */
const MOON_HOUSE: { head: string; tryThis: string }[] = [
  { head: '', tryThis: '' },
  { head: 'All eyes on you. Lean into it.', tryThis: 'Refresh your card: a new line, a new photo.' },
  { head: 'You want something real, not just fun.', tryThis: 'Notice who makes you feel secure, not just excited.' },
  { head: 'Chatty and curious.', tryThis: 'Reply to three chats with a real question.' },
  { head: 'Homebody mood. Go easy.', tryThis: 'Suggest a low-key plan: takeout, a walk near home.' },
  { head: 'Flirty and playful.', tryThis: 'Send the funny message you’d usually delete.' },
  { head: 'Practical day. Tidy up your life.', tryThis: 'Clear your chats: answer or close the ones you’ve left.' },
  { head: 'All about the other person.', tryThis: 'Ask a match what their perfect weekend looks like.' },
  { head: 'Deep and a little intense.', tryThis: 'Play a talk card from The Deep End.' },
  { head: 'Restless. You want an adventure.', tryThis: 'Plan a date somewhere neither of you has been.' },
  { head: 'Ambitious. Dating takes a back seat.', tryThis: 'Keep it short tonight. One good message beats ten.' },
  { head: 'Social. Your friends are the plan.', tryThis: 'Go to a group thing. Bring the energy back to your chats.' },
  { head: 'Quiet and inward. Rest.', tryThis: 'Early night. The deck will be there at 11:11.' },
]

/** the aspect as a phrase a horoscope would use */
const VERB_ING = { conjunct: 'sitting right on', sextile: 'opening a door for', trine: 'flowing easily with', square: 'pushing against', opposite: 'pulling against' } as const
/** how each house reads in a sentence: "lights up …" */
const HOUSE_STORY = ['', 'how you come across', 'what you value and what makes you feel secure', 'texts, small talk and quick plans', 'home, family and how cozy you feel', 'romance, flirting and fun', 'your routines and how you take care of yourself', 'partners and the people across from you', 'intimacy, trust and what you keep close', 'adventure, travel and big ideas', 'your goals and how people see you', 'friends and groups', 'rest, dreams and what you keep to yourself']

const ord = (n: number) => `${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'}`

type Tone = Hit['tone']
const HEAD: Record<Planet, Record<Tone, string>> = {
  moon: { blend: 'Your feelings are front and center.', easy: 'Easy mood. Say yes to plans.', hard: 'Touchy day. Don’t take it personally.' },
  sun: { blend: 'You’re the main character today.', easy: 'Confident and easy to be around.', hard: 'Ego in the way. Lead with curiosity.' },
  mercury: { blend: 'Words come easy. Use them.', easy: 'A great day to text first.', hard: 'Easy to misread. Ask, don’t assume.' },
  venus: { blend: 'You’re magnetic today.', easy: 'Easy to like, easy to be liked.', hard: 'What you want and what you need don’t match.' },
  mars: { blend: 'Bold, and a little impatient.', easy: 'Make the first move.', hard: 'Short fuse. Flirt, don’t fight.' },
  jupiter: { blend: 'Say yes to more.', easy: 'Luck is on your side.', hard: 'Don’t overpromise.' },
  saturn: { blend: 'Get serious about what you want.', easy: 'Slow and steady wins.', hard: 'A test of patience. Don’t force it.' },
}
const TRY: Record<Planet, Record<Tone, string>> = {
  moon: { blend: 'Tell someone how your day actually went.', easy: 'Say yes to the first plan someone suggests.', hard: 'Wait an hour before you answer anything that stings.' },
  sun: { blend: 'Update your card. Let people see you.', easy: 'Give one specific compliment.', hard: 'Ask two questions before you talk about yourself.' },
  mercury: { blend: 'Play a talk card in your quietest chat.', easy: 'Text first. Make it a real question.', hard: 'If a message reads cold, ask what they meant.' },
  venus: { blend: 'Make the plan you’ve been circling.', easy: 'Tell a match one thing you like about them.', hard: 'Notice who you want versus who’s good for you.' },
  mars: { blend: 'Ask them out. Name the day.', easy: 'Suggest something active: a walk, bowling, a hike.', hard: 'Put the energy into a workout, not an argument.' },
  jupiter: { blend: 'Go somewhere new tonight.', easy: 'Swipe outside your usual type.', hard: 'Don’t promise more than you’ll do this week.' },
  saturn: { blend: 'Decide what you’re actually looking for.', easy: 'Follow up with the steady one.', hard: 'Let go of a chat that’s going nowhere.' },
}

/** what the Move card gives you, by the planet behind it */
export type SkyReward =
  | { kind: 'event'; id: EventId; label: string }
  | { kind: 'energy'; amount: number; label: string }
  | { kind: 'pack'; id: string; label: string }
  | { kind: 'talk'; label: string }
/** two rewards per planet, alternating by day */
const REWARD: Record<Planet, [SkyReward, SkyReward]> = {
  moon: [{ kind: 'energy', amount: 15, label: '+15 energy' }, { kind: 'talk', label: 'a new talk card' }],
  sun: [{ kind: 'event', id: 'mulligan', label: 'a Mulligan card' }, { kind: 'event', id: 'spotlight', label: 'a Spotlight card' }],
  mercury: [{ kind: 'talk', label: 'a new talk card' }, { kind: 'energy', amount: 10, label: '+10 energy' }],
  venus: [{ kind: 'event', id: 'spotlight', label: 'a Spotlight card' }, { kind: 'pack', id: 'general', label: 'an Align pack' }],
  mars: [{ kind: 'event', id: 'comet', label: 'a Comet card' }, { kind: 'energy', amount: 20, label: '+20 energy' }],
  jupiter: [{ kind: 'pack', id: 'general', label: 'an Align pack' }, { kind: 'event', id: 'comet', label: 'a Comet card' }],
  saturn: [{ kind: 'event', id: 'second-look', label: 'a Second look card' }, { kind: 'event', id: 'mulligan', label: 'a Mulligan card' }],
}

export interface SkyCard {
  slot: 'you' | 'love' | 'move'
  planet: Planet
  /** e.g. "Venus △ your Moon" */
  title: string
  /** where that planet is right now, e.g. "Venus in Scorpio ℞ · your 2nd house" */
  where: string
  headline: string
  body: string
  tryThis: string
  /** the same reading written as a horoscope paragraph, plain words, no symbols */
  story: string
}

export interface SkyReading {
  date: string
  /** № of the day in the year, for the collectible */
  serial: number
  cards: [SkyCard, SkyCard, SkyCard]
  reward: SkyReward
  /** the one-liner for the deck's sky pill */
  pill: string
}

const dayKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export function readingFor(date = new Date(), birth: Birth = MY_BIRTH): SkyReading {
  const natal = natalChart(birth)
  const sky = skyChart(date)
  const hits = transitsToChart(sky, natal)
  const where = (p: Planet) => `${PLANET[p].name} in ${SIGNS[signOf(sky[p])].name}${retrograde(p, date) ? ' ℞' : ''} · your ${ord(houseOf(sky[p], natal.asc))} house`
  const placed = (p: Planet) => {
    const house = houseOf(sky[p], natal.asc)
    const retro = retrograde(p, date) ? ', moving backwards (retrograde)' : ''
    const the = p === 'moon' || p === 'sun' ? 'The ' : ''
    return `${the}${PLANET[p].name} is in ${SIGNS[signOf(sky[p])].name}${retro}, lighting up your ${ord(house)} house: ${HOUSE_STORY[house]}.`
  }
  const natalWord = (n: Point) => (n === 'asc' ? 'rising sign' : NATAL[n].name)
  const fromHit = (slot: SkyCard['slot'], h: Hit): SkyCard => ({
    slot, planet: h.transit,
    story: `${placed(h.transit)} It’s ${VERB_ING[h.aspect]} your ${natalWord(h.natal)}, ${NATAL[h.natal].means}.`,
    title: `${PLANET[h.transit].name} ${ASPECT_GLYPH[h.aspect]} your ${NATAL[h.natal].name}`,
    where: where(h.transit),
    headline: HEAD[h.transit][h.tone],
    body: `${PLANET[h.transit].name} (${PLANET[h.transit].means}) ${VERB[h.aspect]} your ${NATAL[h.natal].name.toLowerCase() === 'rising' ? 'rising sign' : NATAL[h.natal].name} (${NATAL[h.natal].means}). It’s moving through your ${ord(houseOf(sky[h.transit], natal.asc))} house: ${HOUSE[houseOf(sky[h.transit], natal.asc)]}.`,
    tryThis: TRY[h.transit][h.tone],
  })
  const fromHouse = (slot: SkyCard['slot'], p: Planet): SkyCard => {
    const house = houseOf(sky[p], natal.asc)
    const sign = SIGNS[signOf(sky[p])].name
    return {
      slot, planet: p, title: `${PLANET[p].name} in your ${ord(house)} house`, where: where(p),
      story: placed(p),
      headline: p === 'moon' ? MOON_HOUSE[house].head : HEAD[p].blend,
      body: `${PLANET[p].name} (${PLANET[p].means}) is in ${sign}, your ${ord(house)} house of ${HOUSE[house]}. That’s where ${PLANET[p].means} shows up for you today.`,
      tryThis: p === 'moon' ? MOON_HOUSE[house].tryThis : TRY[p].blend,
    }
  }

  // You: always the Moon, so it changes every day
  const moonHit = hits.find((h) => h.transit === 'moon')
  const you = moonHit ? fromHit('you', moonHit) : fromHouse('you', 'moon')
  // Love: moving Venus or Mars first; then anything touching your Venus or Mars; the slow planets last
  const fast = (h: Hit) => h.transit === 'sun' || h.transit === 'mercury' || h.transit === 'venus' || h.transit === 'mars'
  const loveHit = hits.find((h) => h.transit === 'venus' || h.transit === 'mars')
    ?? hits.find((h) => fast(h) && (h.natal === 'venus' || h.natal === 'mars'))
  const love = loveHit ? fromHit('love', loveHit) : fromHouse('love', 'venus')
  // Move: the strongest fast-planet aspect left; the slow planets only when nothing else is happening
  // a different planet from the Love card, rotating day to day between the top two so it doesn't repeat
  const day = Math.floor(new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() / 86400000)
  const pool = hits.filter((h) => h.transit !== 'moon' && h.transit !== loveHit?.transit)
  const fastPool = pool.filter(fast)
  const picks = fastPool.length ? fastPool : pool
  const moveHit = picks.length ? picks[day % Math.min(2, picks.length)] : undefined
  const move = moveHit ? fromHit('move', moveHit) : fromHouse('move', day % 2 ? 'mercury' : 'sun')

  const start = new Date(date.getFullYear(), 0, 0)
  const serial = Math.floor((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - start.getTime()) / 86400000)
  return { date: dayKey(date), serial, cards: [you, love, move], reward: REWARD[move.planet][day % 2], pill: love.headline }
}

/** today's reading, worked out once */
export const TODAY_READING = readingFor()
export const todayKey = () => dayKey(new Date())

/** "Us today": a line for you and a match, from the Moon tonight and your two sun signs */
const ELEMENT_PAIR: Record<string, string> = {
  'fire-fire': 'Two fires: fun, fast, a little competitive.', 'fire-air': 'Air feeds fire: easy banter, big plans.', 'fire-earth': 'Fire meets earth: one rushes, one waits.', 'fire-water': 'Fire and water: steamy, but mind the feelings.',
  'earth-earth': 'Two earths: steady and real.', 'earth-air': 'Earth and air: practical meets curious.', 'earth-water': 'Earth and water: grounded and close.', 'air-air': 'Two airs: you could talk all night.',
  'air-water': 'Air and water: head meets heart.', 'water-water': 'Two waters: deep, quick to feel.',
}
const MOON_TOPIC: Record<string, { line: string; topics: string[] }> = {
  fire: { line: 'a fire Moon tonight, so be playful', topics: ['fun', 'romance', 'everyday'] },
  earth: { line: 'an earth Moon tonight, so keep it simple and real', topics: ['everyday', 'food', 'money', 'fun'] },
  air: { line: 'an air Moon tonight, so ask the big questions', topics: ['future', 'fun', 'everyday'] },
  water: { line: 'a water Moon tonight, so talk about feelings', topics: ['romance', 'family', 'intimacy', 'everyday'] },
}
/** the topics that suit tonight's Moon, best first */
export function usToday(theirSign: SignId, mySign: SignId = ME.sign, date = new Date()): { line: string; topics: string[] } {
  const a = SIGNS[mySign].element, b = SIGNS[theirSign].element
  const pair = ELEMENT_PAIR[`${a}-${b}`] ?? ELEMENT_PAIR[`${b}-${a}`]
  const moon = SIGNS[signOf(skyChart(date).moon)]
  const m = MOON_TOPIC[moon.element]
  return { line: `${pair} It’s ${m.line}.`, topics: m.topics }
}
