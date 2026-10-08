import type { Profile, ReadingLine } from '../data/profiles'
import { ME } from '../data/profiles'
import { SIGNS, type Element, type SignId } from '../data/signs'

/** What a card says about a real person, read against your sun — in plain, practical terms. */
const PULL: Record<Element, string> = {
  fire: 'Confident and fun. They’ll make the first move.',
  earth: 'Reliable and warm. They remember the small things.',
  air: 'Easy to talk to. You won’t run out of things to say.',
  water: 'Caring and perceptive. Easy to open up to.',
}
const PUSH: Record<Element, string> = {
  fire: 'They move fast. Say what pace works for you.',
  earth: 'Slow to change their mind. Don’t rush big decisions.',
  air: 'Plans change a lot. Lock in the ones that matter.',
  water: 'They feel things deeply. Check in instead of guessing.',
}
const ALIGN: Record<Element, Record<Element, string>> = {
  fire: { fire: 'Lots of energy. Plan active dates, not quiet ones.', earth: 'One starts things, the other makes them last.', air: 'Big ideas, bigger nights. Never boring.', water: 'Intense. Works if you talk things through.' },
  earth: { fire: 'They bring excitement, you bring stability.', earth: 'Same pace, same goals. Built for the long run.', air: 'They dream it up, you make it happen.', water: 'Gentle and steady. A strong long-term fit.' },
  air: { fire: 'You give them room; they bring the spark.', earth: 'You keep it light, they keep it grounded.', air: 'Endless conversation. Make sure you also make plans.', water: 'You lighten the mood; they bring depth.' },
  water: { fire: 'Passionate. Works if you both stay honest.', earth: 'You soften, they steady. Feels safe fast.', air: 'They lift you up; you ground them.', water: 'Deep and private. Easy to fall for each other.' },
}

export function readingFor(theirSun: SignId, mySun: SignId = ME.sign): ReadingLine[] {
  const t = SIGNS[theirSun].element
  const m = SIGNS[mySun].element
  return [
    { kind: 'push', text: PUSH[t], strength: 2 },
    { kind: 'pull', text: PULL[t], strength: 3 },
    { kind: 'align', text: ALIGN[m][t], strength: t === m ? 3 : 2 },
  ]
}

/** A profiles row (seeded or real) as the card the app draws. */
export interface ProfileRow {
  id: string
  owner: string | null
  name: string
  age: number
  sun: SignId
  moon: SignId
  rising: SignId
  photo: string | null
  aligns_back: boolean
  founder: number | null
  blurb: string | null
  deal_order: number | null
  comet: boolean
  card: Partial<Profile> | null
}

export function rowToProfile(r: ProfileRow): Profile {
  const card = r.card ?? {}
  return {
    ...card,
    id: r.id,
    initial: r.name,
    name: r.name,
    age: r.age,
    sign: r.sun,
    moon: r.moon,
    rising: r.rising,
    photo: r.photo ?? undefined,
    alignsBack: r.aligns_back,
    founder: r.founder ?? undefined,
    blurb: r.blurb ?? card.blurb,
    serial: card.serial ?? `№ ${r.id.slice(-3).toUpperCase()}`,
    pull: card.pull ?? 'Steady pull',
    reading: card.reading?.length ? card.reading : readingFor(r.sun),
    dealbreakers: card.dealbreakers || 'Still deciding.',
    real: r.owner != null,
    comet: r.comet,
  }
}
