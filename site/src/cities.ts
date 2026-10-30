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

/** "St. Louis" → st-louis, "Montréal" → montreal, "D.C." → dc */
function key(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[.'’]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function slugify(name: string, state = '') {
  // the db allows 2 to 60 of [a-z0-9-]
  return key(`${name} ${state}`).slice(0, 60).replace(/-$/, '')
}

/** state names and codes, so "Atlanta, Georgia" and "Atlanta GA" both mean Atlanta, GA */
const STATES: Record<string, string> = Object.fromEntries((
  'AL alabama,AK alaska,AZ arizona,AR arkansas,CA california,CO colorado,CT connecticut,DE delaware,DC district of columbia,' +
  'FL florida,GA georgia,HI hawaii,ID idaho,IL illinois,IN indiana,IA iowa,KS kansas,KY kentucky,LA louisiana,ME maine,' +
  'MD maryland,MA massachusetts,MI michigan,MN minnesota,MS mississippi,MO missouri,MT montana,NE nebraska,NV nevada,' +
  'NH new hampshire,NJ new jersey,NM new mexico,NY new york,NC north carolina,ND north dakota,OH ohio,OK oklahoma,OR oregon,' +
  'PA pennsylvania,RI rhode island,SC south carolina,SD south dakota,TN tennessee,TX texas,UT utah,VT vermont,VA virginia,' +
  'WA washington,WV west virginia,WI wisconsin,WY wyoming'
).split(',').flatMap((e) => { const [code, ...n] = e.split(' '); return [[key(n.join(' ')), code], [code.toLowerCase(), code]] }))

/** what people actually type for the cities we list */
const ALIASES: Record<string, string> = {
  'h-town': 'houston-tx', htx: 'houston-tx', atx: 'austin-tx', satx: 'san-antonio-tx', 'san-antone': 'san-antonio-tx',
  dallas: 'dallas-fort-worth-tx', 'fort-worth': 'dallas-fort-worth-tx', 'ft-worth': 'dallas-fort-worth-tx', dfw: 'dallas-fort-worth-tx',
  'dallas-ft-worth': 'dallas-fort-worth-tx', 'the-metroplex': 'dallas-fort-worth-tx',
  atl: 'atlanta-ga', nyc: 'new-york-ny', 'new-york-city': 'new-york-ny', ny: 'new-york-ny', la: 'los-angeles-ca',
  nola: 'new-orleans-la', okc: 'oklahoma-city-ok', dc: 'washington-dc', 'washington-dc': 'washington-dc', philly: 'philadelphia-pa',
  sf: 'san-francisco-ca', 'san-fran': 'san-francisco-ca', vegas: 'las-vegas-nv', kc: 'kansas-city-mo', 'saint-louis': 'st-louis-mo',
  stl: 'st-louis-mo', chi: 'chicago-il', 'chi-town': 'chicago-il', nash: 'nashville-tn',
}

/** Texas cities people type without the state; they're Texas, so not a vote */
const TEXAS_TOWNS = new Set(['el-paso', 'plano', 'frisco', 'irving', 'garland', 'mckinney', 'denton', 'corpus-christi', 'lubbock',
  'laredo', 'amarillo', 'brownsville', 'mcallen', 'waco', 'galveston', 'sugar-land', 'katy', 'the-woodlands', 'round-rock',
  'killeen', 'college-station', 'midland', 'odessa', 'beaumont', 'tyler', 'pearland', 'conroe'])

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

/** a listed city by its name's key (or an alias), if the state fits */
function known(k: string, state: string) {
  const c = ALIASES[k] ? ALL_CITIES.find((x) => x.slug === ALIASES[k]) : ALL_CITIES.find((x) => key(x.name) === k)
  return c && (!state || c.state === state) ? c : null
}

/** "Austin, TX", "austin texas", "Atlanta, Georgia", "ATL", "El Paso" → a City; null when there's nothing to go on */
export function parseCity(typed: string): City | null {
  const t = typed.trim().replace(/\s+/g, ' ')
  const k = key(t)
  if (k.length < 2) return null
  // the whole state is locked in too
  if (k === 'texas' || k === 'tx') return { slug: 'texas-tx', name: 'Texas', state: 'TX' }
  const whole = known(k, '')
  if (whole) return whole

  // a trailing US state, in words or as a code: ", Georgia", " GA", ", D.C."
  const segs = k.split('-')
  let nk = k, state = '', drop = 0
  for (const n of [3, 2, 1]) {
    const code = segs.length > n ? STATES[segs.slice(-n).join('-')] : undefined
    if (code) { nk = segs.slice(0, -n).join('-'); state = code; drop = n; break }
  }
  const hit = known(nk, state)
  if (hit) return hit

  // the name as typed, without the state
  const parts = t.split(/([\s,]+)/)
  let name = drop ? parts.slice(0, Math.max(0, parts.length - drop * 2)).join('').replace(/[\s,]+$/, '') || t : t
  // another country's region code: "Toronto, ON"
  const m = !state && name.match(/^(.+?),\s*([a-z]{2})$/i)
  if (m) { name = m[1]; state = m[2].toUpperCase() }
  if (!state && TEXAS_TOWNS.has(key(name))) state = 'TX'
  if (name === name.toLowerCase() || name === name.toUpperCase()) name = name.toLowerCase().replace(/(^|[\s-])(\S)/g, (_, a, b) => a + b.toUpperCase())
  const slug = slugify(name, state)
  return slug.length >= 2 ? { slug, name, state } : null
}

export const label = (c: City) => (c.state ? `${c.name}, ${c.state}` : c.name)
