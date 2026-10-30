/** Where Align lights, in order: Houston, then Texas, then whichever city has the most beta votes. */

export type Stage = 'first' | 'texas' | 'vote'

export interface City {
  /** sent to checkout as the vote, so it must stay stable */
  slug: string
  name: string
  state: string
}

export const HOUSTON: City = { slug: 'houston-tx', name: 'Houston', state: 'TX' }

/** locked in after Houston */
export const TEXAS: City[] = [
  { slug: 'austin-tx', name: 'Austin', state: 'TX' },
  { slug: 'dallas-fort-worth-tx', name: 'Dallas–Fort Worth', state: 'TX' },
  { slug: 'san-antonio-tx', name: 'San Antonio', state: 'TX' },
]

/** the race for what lights after Texas; anything else can be typed in */
export const VOTE_CITIES: City[] = [
  ['Atlanta', 'GA'], ['New York', 'NY'], ['Los Angeles', 'CA'], ['Chicago', 'IL'], ['Miami', 'FL'], ['New Orleans', 'LA'],
  ['Tulsa', 'OK'], ['Oklahoma City', 'OK'], ['Denver', 'CO'], ['Phoenix', 'AZ'], ['Nashville', 'TN'], ['Charlotte', 'NC'],
  ['Washington', 'DC'], ['Philadelphia', 'PA'], ['Boston', 'MA'], ['Seattle', 'WA'], ['San Francisco', 'CA'], ['San Diego', 'CA'],
  ['Las Vegas', 'NV'], ['Orlando', 'FL'], ['Tampa', 'FL'], ['Detroit', 'MI'], ['Kansas City', 'MO'], ['Memphis', 'TN'],
  ['Baltimore', 'MD'], ['Minneapolis', 'MN'], ['Portland', 'OR'], ['Raleigh', 'NC'], ['St. Louis', 'MO'], ['Columbus', 'OH'],
].map(([name, state]) => ({ slug: slugify(name, state), name, state }))

export const ALL_CITIES = [HOUSTON, ...TEXAS, ...VOTE_CITIES]

export function slugify(name: string, state = '') {
  return `${name} ${state}`.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60)
}

export function stageOf(slug: string): Stage {
  if (slug === HOUSTON.slug) return 'first'
  if (TEXAS.some((c) => c.slug === slug) || slug.endsWith('-tx')) return 'texas'
  return 'vote'
}

/** 'el-paso-tx' → El Paso, TX, for a typed-in city we don't list */
export function cityFromSlug(slug: string): City {
  const known = ALL_CITIES.find((c) => c.slug === slug)
  if (known) return known
  const parts = slug.split('-')
  const tail = parts.length > 1 && parts[parts.length - 1].length === 2 ? parts.pop()!.toUpperCase() : ''
  return { slug, name: parts.map((w) => w[0]?.toUpperCase() + w.slice(1)).join(' '), state: tail }
}

/** "Austin, TX", "austin texas", "El Paso" → a City */
export function parseCity(typed: string): City | null {
  const t = typed.trim()
  if (!t) return null
  const hit = ALL_CITIES.find((c) => `${c.name}, ${c.state}`.toLowerCase() === t.toLowerCase() || c.name.toLowerCase() === t.toLowerCase())
  if (hit) return hit
  const [name, rest = ''] = t.split(/,\s*/)
  const state = /^tex(as)?$|^tx$/i.test(rest) ? 'TX' : rest.trim().slice(0, 2).toUpperCase()
  return { slug: slugify(name, state), name: name.trim(), state }
}

export const label = (c: City) => (c.state ? `${c.name}, ${c.state}` : c.name)
