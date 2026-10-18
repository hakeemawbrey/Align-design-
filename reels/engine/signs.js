// The twelve signs: glyph, element and the colours their creatures come in.

export const SIGNS = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
]

export const GLYPH = {
  aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋', leo: '♌', virgo: '♍',
  libra: '♎', scorpio: '♏', sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓',
}

export const ELEMENT = {
  aries: 'fire', leo: 'fire', sagittarius: 'fire',
  taurus: 'earth', virgo: 'earth', capricorn: 'earth',
  gemini: 'air', libra: 'air', aquarius: 'air',
  cancer: 'water', scorpio: 'water', pisces: 'water',
}

// Align's twelve auras ("Kit · The twelve auras" in app/src/data/signs.ts):
// the name, the saturated outer colour and the light inner edge.
export const AURA = {
  aries: { name: 'Ember', color: '#f0603a', light: '#ffb39a' },
  taurus: { name: 'Honey', color: '#e9b24a', light: '#ffe1a0' },
  gemini: { name: 'Signal', color: '#f2cf4a', light: '#fff0a8' },
  cancer: { name: 'Tide', color: '#3fb6f0', light: '#a8e4ff' },
  leo: { name: 'Goldleaf', color: '#f39a3a', light: '#ffd09a' },
  virgo: { name: 'Rose Quartz', color: '#ef5c94', light: '#ffb6d2' },
  libra: { name: 'Orchid', color: '#e163d6', light: '#ffbdf6' },
  scorpio: { name: 'Garnet', color: '#e23d66', light: '#ff9fb7' },
  sagittarius: { name: 'Amethyst', color: '#a35cf0', light: '#dcbcff' },
  capricorn: { name: 'Jade', color: '#2fc79a', light: '#a6f0d6' },
  aquarius: { name: 'Ion', color: '#38c4ec', light: '#b2ecff' },
  pisces: { name: 'Dusk', color: '#7c74f0', light: '#c6c1ff' },
}

// Creature body colours per sign. The first is the sign's own; the rest are
// what the seed can wander to so not every Scorpio reel looks the same.
export const BLOB_COLORS = {
  aries: ['#ff3b2f', '#ff7a1a', '#ff2d6f'],
  taurus: ['#3fbf5a', '#9ad14b', '#d6a35c'],
  gemini: ['#ffd23f', '#9d7bff', '#ff9ee5'],
  cancer: ['#c9d6ff', '#7fb2ff', '#e9e3ff'],
  leo: ['#ffb000', '#ff6a00', '#ffd84a'],
  virgo: ['#7bd88f', '#c4e86b', '#e6d7b8'],
  libra: ['#ff8fc7', '#b9a3ff', '#8fe3ff'],
  scorpio: ['#1f4fff', '#7a1fff', '#c4002f'],
  sagittarius: ['#a24bff', '#ff5470', '#ff9c3a'],
  capricorn: ['#6b7a8f', '#3c6e57', '#9b8b6e'],
  aquarius: ['#26d4ff', '#4f7bff', '#9cf0ff'],
  pisces: ['#7d5cff', '#3bd1c6', '#ff9ad5'],
}

export const TAGS = {
  love: ['relationshipadvice', 'datingadvice', 'love'],
  self: ['selfimprovement', 'mindset', 'growth'],
  vibe: ['weirdcore', 'lowpoly3d', 'liminalspace', 'dreamcore'],
}

export function captionFor(item) {
  const vibe = TAGS.vibe
  const topic = TAGS[item.topic] || TAGS.self
  const tags = [item.sign, `${item.sign}season`, 'zodiac', 'astrology', 'aura', topic[0], topic[1], vibe[0], vibe[1]]
  const aura = AURA[item.sign]
  return `${item.caption || 'break the loop'} 👁\n${item.sign} · ${aura.name.toLowerCase()} aura ✦\n-\n${tags.map((t) => '#' + t).join(' ')}`
}
