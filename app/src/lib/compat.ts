import { SIGN_ORDER } from './astro'
import { SIGNS, type SignId } from '../data/signs'
import { ME, profileById, type Profile } from '../data/profiles'

/**
 * How two charts sit together, in words only. There is NO score, percentage,
 * rating or ranking here, on purpose: Align describes how two people's
 * placements relate and never claims to measure or predict a relationship.
 * Don't add a number.
 */

export type AspectId = 'same' | 'sextile' | 'square' | 'trine' | 'opposite' | 'adjacent' | 'quincunx'

const ASPECT: Record<AspectId, { name: string; line: string }> = {
  same: { name: 'Same sign', line: 'Mirror images. You get each other fast, flaws included.' },
  trine: { name: 'Trine', line: 'Same element. It tends to flow without trying.' },
  sextile: { name: 'Sextile', line: 'Easy to talk to, quick to laugh together.' },
  opposite: { name: 'Opposite', line: 'Opposites that pull. You balance what the other lacks.' },
  square: { name: 'Square', line: 'Friction that sparks. Exciting, and it takes work.' },
  adjacent: { name: 'Neighbours', line: 'Different speeds. Curious about each other.' },
  quincunx: { name: 'Quincunx', line: 'You’ll have to learn each other’s language.' },
}

export function aspectOf(a: SignId, b: SignId): AspectId {
  const d = (SIGN_ORDER.indexOf(b) - SIGN_ORDER.indexOf(a) + 12) % 12
  const n = Math.min(d, 12 - d)
  return (['same', 'adjacent', 'sextile', 'square', 'trine', 'quincunx', 'opposite'] as const)[n]
}

export interface Placements { sign: SignId; moon: SignId; rising: SignId }

export interface CompatPart {
  label: string
  mine: SignId
  theirs: SignId
  aspectName: string
  line: string
}

export interface Compat {
  parts: CompatPart[]
  /** how the two sun elements mix */
  elements: string
}

type Place = 'sign' | 'moon' | 'rising'
const PARTS: { label: string; mine: Place; theirs: Place }[] = [
  { label: 'Sun · Sun', mine: 'sign', theirs: 'sign' },
  { label: 'Moon · Moon', mine: 'moon', theirs: 'moon' },
  { label: 'Your Sun · their Moon', mine: 'sign', theirs: 'moon' },
  { label: 'Your Moon · their Sun', mine: 'moon', theirs: 'sign' },
  { label: 'Rising · Rising', mine: 'rising', theirs: 'rising' },
]

const ELEMENTS: Record<string, string> = {
  'fire-fire': 'Two fires: big energy, big feelings.',
  'fire-air': 'Fire and air: they fan each other’s flame.',
  'fire-earth': 'Fire and earth: passion meets patience.',
  'fire-water': 'Fire and water: steam. Intense, sometimes too much.',
  'earth-earth': 'Two earths: steady, loyal, slow to move.',
  'earth-water': 'Earth and water: a safe place for feelings to grow.',
  'earth-air': 'Earth and air: plans meet ideas. Meet in the middle.',
  'air-air': 'Two airs: you could talk all night.',
  'air-water': 'Air and water: head meets heart. Say what you feel.',
  'water-water': 'Two waters: deep, intuitive, very close.',
}

export function compatibility(me: Placements, them: Placements): Compat {
  const parts = PARTS.map((p) => {
    const a = ASPECT[aspectOf(me[p.mine], them[p.theirs])]
    return { label: p.label, mine: me[p.mine], theirs: them[p.theirs], aspectName: a.name, line: a.line }
  })
  const ea = SIGNS[me.sign].element, eb = SIGNS[them.sign].element
  return { parts, elements: ELEMENTS[`${ea}-${eb}`] ?? ELEMENTS[`${eb}-${ea}`] }
}

/** you and them; `them` can be a full profile or just an id and sun sign (a seeded match) */
export function compatWith(them: Pick<Profile, 'id' | 'sign'> & Partial<Profile>): Compat {
  const full = profileById(them.id) ?? them
  return compatibility(ME, { sign: full.sign, moon: full.moon ?? full.sign, rising: full.rising ?? full.sign })
}
