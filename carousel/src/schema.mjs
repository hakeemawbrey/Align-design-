// The carousel contract from SPEC.md. Every carousel, hand-written or
// generated, goes through validate() before it's rendered or saved.

export const SIGNS = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
]

export const ELEMENT = {
  aries: 'fire', leo: 'fire', sagittarius: 'fire',
  taurus: 'earth', virgo: 'earth', capricorn: 'earth',
  gemini: 'air', libra: 'air', aquarius: 'air',
  cancer: 'water', scorpio: 'water', pisces: 'water',
}

// Each sign's colour from the app (app/src/data/signs.ts): `color` is the
// sign itself, `light` its highlight, `dark` its shadow.
export const SIGN_COLORS = {
  aries: { color: '#f0603a', light: '#ffb39a', dark: '#5a1c10' },
  taurus: { color: '#e9b24a', light: '#ffe1a0', dark: '#4e3510' },
  gemini: { color: '#f2cf4a', light: '#fff0a8', dark: '#4f4210' },
  cancer: { color: '#3fb6f0', light: '#a8e4ff', dark: '#0f3550' },
  leo: { color: '#f39a3a', light: '#ffd09a', dark: '#55300f' },
  virgo: { color: '#ef5c94', light: '#ffb6d2', dark: '#561a33' },
  libra: { color: '#e163d6', light: '#ffbdf6', dark: '#4d1a49' },
  scorpio: { color: '#e23d66', light: '#ff9fb7', dark: '#55102a' },
  sagittarius: { color: '#a35cf0', light: '#dcbcff', dark: '#36165a' },
  capricorn: { color: '#2fc79a', light: '#a6f0d6', dark: '#0e4636' },
  aquarius: { color: '#38c4ec', light: '#b2ecff', dark: '#0e3d4e' },
  pisces: { color: '#7c74f0', light: '#c6c1ff', dark: '#25205a' },
}

// `type`: text only, in the sign's colour. `photo`: text over each slide's bg.
export const STYLES = ['type', 'photo']

export const CORE = ['face-last', 'mutual', 'honest', 'dealbreakers', 'release', '1111', 'venus', 'not-alone']

export const BG_KINDS = ['figure', 'aura', 'veil', 'sky', 'neon']

export const TINTS = {
  violet: '#9a7be0',
  rub: '#e8628a',
  ember: '#f0603a',
  gold: '#f2c75c',
  tide: '#3fb6f0',
  spark: '#7fd8b0',
}

export const LIMITS = {
  minSlides: 6,
  maxSlides: 9,
  maxWords: 6,
  maxChars: 32,
  maxCaption: 60,
  minTags: 3,
  maxTags: 6,
}

const isTint = (t) => typeof t === 'string' && (t in TINTS || /^#[0-9a-f]{6}$/i.test(t))

/** Returns a list of problems; an empty list means the carousel is valid. */
export function validate(c) {
  const errs = []
  const err = (m) => errs.push(m)
  if (!c || typeof c !== 'object') return ['not an object']

  if (!/^[a-z0-9][a-z0-9-]*$/.test(c.id ?? '')) err('id: lowercase letters, digits and dashes')
  if (typeof c.title !== 'string' || !c.title.trim()) err('title: required')
  if (!Array.isArray(c.signs) || c.signs.some((s) => !SIGNS.includes(s))) err('signs: list of sign ids')
  if (!Array.isArray(c.core) || !c.core.length || c.core.some((k) => !CORE.includes(k))) err(`core: 1+ of ${CORE.join(', ')}`)
  if (typeof c.caption !== 'string' || !c.caption.trim()) err('caption: required')
  else {
    if (c.caption.length > LIMITS.maxCaption) err(`caption: over ${LIMITS.maxCaption} characters`)
    if (c.caption !== c.caption.toLowerCase()) err('caption: lowercase')
    if (c.caption.includes('#')) err('caption: no hashtags')
  }
  if (!Array.isArray(c.hashtags) || c.hashtags.length < LIMITS.minTags || c.hashtags.length > LIMITS.maxTags) {
    err(`hashtags: ${LIMITS.minTags}–${LIMITS.maxTags}`)
  } else if (c.hashtags.some((h) => !/^[a-z0-9_]+$/.test(h))) err('hashtags: lowercase, no #')

  if (c.style !== undefined && !STYLES.includes(c.style)) err(`style: one of ${STYLES.join(', ')}`)

  const slides = c.slides
  if (!Array.isArray(slides) || slides.length < LIMITS.minSlides || slides.length > LIMITS.maxSlides) {
    err(`slides: ${LIMITS.minSlides}–${LIMITS.maxSlides}`)
    return errs
  }
  slides.forEach((s, i) => {
    const at = `slides[${i}]`
    const text = s?.text
    if (typeof text !== 'string' || !text.trim()) return err(`${at}.text: required`)
    const flat = text.replace(/\n/g, ' ').trim()
    const words = flat.split(/\s+/).length
    if (words > LIMITS.maxWords) err(`${at}.text: ${words} words (max ${LIMITS.maxWords})`)
    if (flat.length > LIMITS.maxChars) err(`${at}.text: ${flat.length} chars (max ${LIMITS.maxChars})`)
    if (text !== text.toLowerCase()) err(`${at}.text: lowercase`)
    if (/[!#]/.test(text)) err(`${at}.text: no ! or #`)
    if (/\p{Extended_Pictographic}/u.test(text)) err(`${at}.text: no emoji`)
    if (s.size && !['s', 'm', 'l'].includes(s.size)) err(`${at}.size: s, m or l`)

    const bg = s.bg
    if (!bg || !BG_KINDS.includes(bg.kind)) return err(`${at}.bg.kind: one of ${BG_KINDS.join(', ')}`)
    if ((bg.kind === 'figure' || bg.kind === 'aura') && !SIGNS.includes(bg.sign)) err(`${at}.bg.sign: required for ${bg.kind}`)
    if (bg.kind === 'veil' && !(Number.isInteger(bg.person) && bg.person >= 1 && bg.person <= 12)) err(`${at}.bg.person: 1–12`)
    if ((bg.kind === 'sky' || bg.kind === 'neon') && bg.tint !== undefined && !isTint(bg.tint)) err(`${at}.bg.tint: named tint or #hex`)
    if (bg.kind === 'neon' && bg.tint === undefined) err(`${at}.bg.tint: required for neon`)
    if (bg.moon !== undefined && !(bg.moon >= 0 && bg.moon <= 1)) err(`${at}.bg.moon: 0–1`)
    if (bg.zoom !== undefined && !(bg.zoom >= 1 && bg.zoom <= 1.6)) err(`${at}.bg.zoom: 1–1.6`)
    if (bg.focus !== undefined && !/^\d{1,3}% \d{1,3}%$/.test(bg.focus)) err(`${at}.bg.focus: "x% y%"`)
  })
  return errs
}
