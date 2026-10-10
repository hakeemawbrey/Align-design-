import type { SignId } from './signs'

/**
 * Align runs in seasons of about three months, equinox to solstice. Each
 * season prints its cards in fixed, numbered runs. When a run is gone it's
 * gone, so a season's cards only get rarer. Align+ ships 3 packs every season.
 */
export interface Season {
  id: string
  name: string
  label: string
  /** the three signs whose seasons fall inside it */
  signs: SignId[]
  start: string
  end: string
  /** today, in the demo's sky (Oct 5 2026) */
  day: number
  days: number
}

export const SEASON: Season = {
  id: 'fall-26', name: 'The Equinox', label: 'Fall ’26',
  signs: ['libra', 'scorpio', 'sagittarius'],
  start: 'Sep 22', end: 'Dec 21', day: 14, days: 91,
}

export const NEXT_SEASON = { label: 'Winter ’27', name: 'The Solstice', starts: 'Dec 21' }

export type Rarity = 'common' | 'rare' | 'legendary'

/** how many of each card are printed in a season, online and in real life together */
export const PRINT_RUN: Record<Rarity, number> = { common: 5000, rare: 500, legendary: 50 }

/** stable 0..1 from a string, so the numbers don't jump around between visits */
function unit(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) }
  return ((h >>> 0) % 10000) / 10000
}

/** how many of this card have been pulled so far this season (the run is two weeks in) */
export function minted(id: string, rarity: Rarity) {
  const run = PRINT_RUN[rarity]
  const share = rarity === 'legendary' ? 0.55 + unit(id) * 0.35 : rarity === 'rare' ? 0.35 + unit(id) * 0.4 : 0.15 + unit(id) * 0.35
  return Math.round(run * share)
}

export const leftOf = (id: string, rarity: Rarity) => PRINT_RUN[rarity] - minted(id, rarity)

/** your copy's number in the run, e.g. № 1,204 / 5,000 */
export function editionOf(id: string, rarity: Rarity) {
  const m = minted(id, rarity)
  return Math.max(1, Math.round(m * (0.6 + unit(`${id}:you`) * 0.4)))
}

export const fmt = (n: number) => n.toLocaleString('en-US')
