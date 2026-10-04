export type Element = 'fire' | 'earth' | 'air' | 'water'

export type SignId =
  | 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo'
  | 'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces'

export interface Sign {
  id: SignId
  name: string
  glyph: string
  element: Element
  /** aura name from "Kit · The twelve auras" */
  aura: string
  /** core sign colour — card edge, chip, bloom */
  color: string
  light: string
  dark: string
  /** foil: the sign colour rolled through white, so it reads as metal */
  foil: string
  /** AuraCam silhouette (face-down card art) */
  auraImg: string
  /** Illustrated constellation figure */
  figureImg: string
}

const foil = (c: string, l: string) =>
  `linear-gradient(90deg, ${c} 0%, ${l} 22%, #ffffff 42%, ${l} 58%, ${c} 78%, ${l} 100%)`

const mk = (id: SignId, name: string, glyph: string, element: Element, aura: string, color: string, light: string, dark: string): Sign => ({
  id, name, glyph, element, aura, color, light, dark,
  foil: foil(color, light),
  auraImg: `/img/aura/${id}.jpg`,
  figureImg: `/img/figure/${id}.jpg`,
})

export const SIGNS: Record<SignId, Sign> = {
  aries: mk('aries', 'Aries', '♈', 'fire', 'Ember', '#f0603a', '#ffb39a', '#5a1c10'),
  taurus: mk('taurus', 'Taurus', '♉', 'earth', 'Honey', '#e9b24a', '#ffe1a0', '#4e3510'),
  gemini: mk('gemini', 'Gemini', '♊', 'air', 'Signal', '#f2cf4a', '#fff0a8', '#4f4210'),
  cancer: mk('cancer', 'Cancer', '♋', 'water', 'Tide', '#3fb6f0', '#a8e4ff', '#0f3550'),
  leo: mk('leo', 'Leo', '♌', 'fire', 'Goldleaf', '#f39a3a', '#ffd09a', '#55300f'),
  virgo: mk('virgo', 'Virgo', '♍', 'earth', 'Rose Quartz', '#ef5c94', '#ffb6d2', '#561a33'),
  libra: mk('libra', 'Libra', '♎', 'air', 'Orchid', '#e163d6', '#ffbdf6', '#4d1a49'),
  scorpio: mk('scorpio', 'Scorpio', '♏', 'water', 'Garnet', '#e23d66', '#ff9fb7', '#55102a'),
  sagittarius: mk('sagittarius', 'Sagittarius', '♐', 'fire', 'Amethyst', '#a35cf0', '#dcbcff', '#36165a'),
  capricorn: mk('capricorn', 'Capricorn', '♑', 'earth', 'Jade', '#2fc79a', '#a6f0d6', '#0e4636'),
  aquarius: mk('aquarius', 'Aquarius', '♒', 'air', 'Ion', '#38c4ec', '#b2ecff', '#0e3d4e'),
  pisces: mk('pisces', 'Pisces', '♓', 'water', 'Dusk', '#7c74f0', '#c6c1ff', '#25205a'),
}

export const ELEMENT_COLOR: Record<Element, string> = {
  fire: '#f0603a',
  earth: '#e9b24a',
  air: '#7fd0f0',
  water: '#3f7cf0',
}
