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
  const tags = [item.sign, `${item.sign}season`, 'zodiac', 'astrology', topic[0], topic[1], vibe[0], vibe[1], vibe[2]]
  return `${item.caption || 'break the loop'} 👁\n-\n-\n${tags.map((t) => '#' + t).join(' ')}`
}
