import type { Profile, ReadingLine } from '../data/profiles'
import { ME } from '../data/profiles'
import { SIGNS, type Element, type SignId } from '../data/signs'

/** What a card says about a real person, read against your sun. */
const PULL: Record<Element, string> = {
  fire: 'They make the first move and mean it. Hard to ignore.',
  earth: 'Steady, warm, remembers the small things.',
  air: 'Quick, curious, impossible to run out of things to say to.',
  water: 'They notice what you didn’t say. Easy to open up to.',
}
const PUSH: Record<Element, string> = {
  fire: 'They move fast; you might want a minute.',
  earth: 'Slow to change their mind, about anything.',
  air: 'Plans change. Then change again.',
  water: 'They feel it all at once; you may need to say it out loud.',
}
const ALIGN: Record<Element, Record<Element, string>> = {
  fire: { fire: 'Two fires: bright, fast, never boring.', earth: 'Fire and earth — one starts it, one makes it last.', air: 'Air feeds fire — big ideas, bigger nights.', water: 'Steam: hot, loud, worth it if you talk.' },
  earth: { fire: 'Earth and fire — you keep the flame from spreading.', earth: 'Earth on earth — build something that lasts.', air: 'Earth holds air — they dream it, you build it.', water: 'Water feeds earth — tender, slow, real.' },
  air: { fire: 'Air feeds fire — you give them room to burn.', earth: 'Air and earth — you keep it light, they keep it real.', air: 'Two radios: great signal, nobody sleeps.', water: 'Air and water — you stir it up, they go deep.' },
  water: { fire: 'Water and fire — steam, if you both stay.', earth: 'Water feeds earth — you soften, they steady.', air: 'Water and air — they lift you, you ground them.', water: 'Tide pool: deep, private, hard to leave.' },
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
