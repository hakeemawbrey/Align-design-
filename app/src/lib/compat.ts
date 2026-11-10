import { SIGN_ORDER } from './astro'
import { SIGNS, type SignId } from '../data/signs'
import { ME, profileById, type Profile } from '../data/profiles'

/**
 * Compatibility between you and someone else: one score, shown the same
 * everywhere (the match moment, the matches list, the chat ring, the sheet).
 * Half comes from the two charts (the angle between each pair of placements,
 * the same aspects astrologers use between whole signs); half from what their
 * card says about the two of you (Spark and Align lift it, Clash lowers it).
 * Someone with no reading on their card is scored on the charts alone.
 */

export type AspectId = 'same' | 'sextile' | 'square' | 'trine' | 'opposite' | 'adjacent' | 'quincunx'

const ASPECT: Record<AspectId, { score: number; name: string; line: string }> = {
  same: { score: 82, name: 'Same sign', line: 'Mirror images. You get each other fast, flaws included.' },
  trine: { score: 93, name: 'Trine', line: 'Same element. It flows without trying.' },
  sextile: { score: 80, name: 'Sextile', line: 'Easy to talk to, quick to laugh together.' },
  opposite: { score: 68, name: 'Opposite', line: 'Opposites that pull. You balance what the other lacks.' },
  square: { score: 52, name: 'Square', line: 'Friction that sparks. Exciting, and it takes work.' },
  adjacent: { score: 58, name: 'Neighbours', line: 'Different speeds. Curious about each other.' },
  quincunx: { score: 48, name: 'Quincunx', line: 'You’ll have to learn each other’s language.' },
}

export function aspectOf(a: SignId, b: SignId): AspectId {
  const d = (SIGN_ORDER.indexOf(b) - SIGN_ORDER.indexOf(a) + 12) % 12
  const n = Math.min(d, 12 - d)
  return (['same', 'adjacent', 'sextile', 'square', 'trine', 'quincunx', 'opposite'] as const)[n]
}

export interface Placements {
  sign: SignId; moon: SignId; rising: SignId
  /** their card's Spark (pull) / Clash (push) / Align lines, each 1–3 strong */
  reading?: { kind: 'pull' | 'push' | 'align'; strength: number }[]
}

export interface CompatPart {
  label: string
  mine: SignId
  theirs: SignId
  aspect: AspectId
  aspectName: string
  score: number
  line: string
  weight: number
}

export interface Compat {
  score: number
  label: string
  parts: CompatPart[]
  elements: string
  /** the charts-only score, and the card's reading score when there is one */
  chart: number
  card?: number
}

type Place = 'sign' | 'moon' | 'rising'
const PARTS: { label: string; mine: Place; theirs: Place; weight: number }[] = [
  { label: 'Sun · Sun', mine: 'sign', theirs: 'sign', weight: 0.3 },
  { label: 'Moon · Moon', mine: 'moon', theirs: 'moon', weight: 0.25 },
  { label: 'Your Sun · their Moon', mine: 'sign', theirs: 'moon', weight: 0.15 },
  { label: 'Your Moon · their Sun', mine: 'moon', theirs: 'sign', weight: 0.15 },
  { label: 'Rising · Rising', mine: 'rising', theirs: 'rising', weight: 0.15 },
]

const ELEMENTS: Record<string, string> = {
  'fire-fire': 'Two fires: big energy, big feelings.',
  'fire-air': 'Fire and air: they fan each other’s flame.',
  'fire-earth': 'Fire and earth: passion meets patience.',
  'fire-water': 'Fire and water: steam. Intense, sometimes too much.',
  'earth-earth': 'Two earths: steady, loyal, built to last.',
  'earth-water': 'Earth and water: a safe place for feelings to grow.',
  'earth-air': 'Earth and air: plans meet ideas. Meet in the middle.',
  'air-air': 'Two airs: you could talk all night.',
  'air-water': 'Air and water: head meets heart. Say what you feel.',
  'water-water': 'Two waters: deep, intuitive, very close.',
}

export function compatibility(me: Placements, them: Placements): Compat {
  const parts = PARTS.map((p) => {
    const aspect = aspectOf(me[p.mine], them[p.theirs])
    const a = ASPECT[aspect]
    return { label: p.label, mine: me[p.mine], theirs: them[p.theirs], aspect, aspectName: a.name, score: a.score, line: a.line, weight: p.weight }
  })
  const chart = Math.round(parts.reduce((s, p) => s + p.score * p.weight, 0))
  // the card: Spark + Align + (how little Clash), 3–9, mapped onto 45–97
  const str = (k: 'pull' | 'push' | 'align') => them.reading?.find((r) => r.kind === k)?.strength
  const spark = str('pull'), clash = str('push'), align = str('align')
  const card = spark && clash && align ? Math.round(45 + ((spark + align + (4 - clash) - 3) / 6) * 52) : undefined
  const score = Math.round(Math.max(40, Math.min(97, card == null ? chart : (chart + card) / 2)))
  const label = score >= 85 ? 'Rare alignment' : score >= 74 ? 'Strong pull' : score >= 62 ? 'Steady' : 'Slow burn'
  const ea = SIGNS[me.sign].element, eb = SIGNS[them.sign].element
  const elements = ELEMENTS[`${ea}-${eb}`] ?? ELEMENTS[`${eb}-${ea}`]
  return { score, label, parts, elements, chart, card }
}

const cache = new Map<string, Compat>()
/** you and them; `them` can be a full profile or just an id and sun sign (a seeded match) */
export function compatWith(them: Pick<Profile, 'id' | 'sign'> & Partial<Profile>): Compat {
  const hit = cache.get(them.id)
  if (hit) return hit
  const full = profileById(them.id) ?? them
  const c = compatibility(ME, { sign: full.sign, moon: full.moon ?? full.sign, rising: full.rising ?? full.sign, reading: full.reading })
  cache.set(them.id, c)
  return c
}
