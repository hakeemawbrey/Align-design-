// r2t0680: THE SIGNS AS… v3, "The signs | online shopping." (~57 s vertical, signs3kit social cut, music: lofi · F)
// Each sign online shopping, pushed to the extreme. Ending: callback.
//   ♈ bought it instantly, no idea what it is · ♉ forty blankets in the cart · ♊ checked the mug's compatibility
//   · ♋ gifts for everyone, nothing for Cancer · ♌ filter: gold, bought the whole page · ♍ every review, for a sponge
//   · ♎ a full cart since March, still deciding · ♏ tracks the package every five minutes · ♐ bought a kayak, lives
//   in a studio · ♑ waited a year to save two dollars · ♒ one bolt, "for a project" · ♓ cried at the product description
//   group "Payday? | *Gone by noon.*"   last "The kayak | *is the couch now.*" (the kayak, paid off)
import { prog, ease } from '../../../src/lib.js'
import { makeFilm, signChar, drawBits, sparkles, hearts, bubble, label, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { phone, note, bits, ORANGE, RED, WOOD, PAPER, GREEN, SLATE } from '../props.js'

const L = { x: -170 }, CART_ACC = '#ffb34a'
const BOX = [
  'BBBBBBBBBBB',
  'BbbbbTbbbbB',
  'BBBBBTBBBBB',
  'BBBBBTBBBBB',
  'BBBBBTBBBBB',
  'BBBBBTBBBBB',
  'BBBBBBBBBBB',
]
const BOX_C = { B: '#c98f5a', b: '#a8743f', T: '#e8dcc6' }
const BLANKETS = [
  'PPPPPPPPPPPP',
  'PWPPWPPWPPWP',
  'MMMMMMMMMMMM',
  'MMYMMYMMYMMM',
  'SSSSSSSSSSSS',
  'SWSSWSSWSSWS',
  'GGGGGGGGGGGG',
  'GGYGGYGGYGGG',
  'PPPPPPPPPPPP',
]
const BLANKETS_C = { P: PINK, W: BONE, M: MINT, Y: GOLD, S: SKYB, G: '#5fd068' }
const CART = [
  'KK..........',
  '.K..........',
  '.KCCCCCCCCCK',
  '.KCPCSCMCYCK',
  '.KCCCCCCCCCK',
  '..KCPCSCMCK.',
  '..KKKKKKKKK.',
  '..K......K..',
  '..KK....KK..',
]
const CART_C = { K: '#9aa5c4', C: '#2a2350', P: PINK, S: SKYB, M: MINT, Y: GOLD }
const SPONGE = ['YYYYYYYYYY', 'YoYYYoYYoY', 'YYYoYYYYYY', 'YoYYYYoYYY', 'GGGGGGGGGG', 'GGGGGGGGGG']
const SPONGE_C = { Y: '#ffd23a', o: '#e0b020', G: '#5fd068' }
const KAYAK = [
  '......P.......................',
  '.....PP.......................',
  '....PP........................',
  'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO',
  '.OOOOOOOOOOOKKKKKKOOOOOOOOOOO.',
  '..OOOOOOOOOOOOOOOOOOOOOOOOOO..',
  '....OOOOOOOOOOOOOOOOOOOOOO....',
]
const KAYAK_C = { O: '#ff9a4a', K: INK, P: '#9aa5c4' }
const CROWN = ['Y..Y..Y', 'YY.Y.YY', 'YYYYYYY', 'YRYYYRY', 'YYYYYYY']
const BOLT = ['.GGG.', 'GGGGG', '.GGG.', '..G..', '..G..', '..G..', '..G..']

const CAMEOS = [
  { sign: 'aries', cap: 'Bought it instantly. | *No idea what it is.*', mood: lt => lt > 1.1 ? 'wide' : 'sparkle', star: L, hops: [0.4],
    front(x, t, lt, P) {
      drawBits(x, BOX, BOX_C, 790, 860, 26 * pop01(t, P.t0 + 0.9, 0.3, 2))
      label(x, 790, 660, 'BUY NOW ✓', pop01(t, P.t0 + 0.2, 0.25, 2.4), { size: 44, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1060, 'CONTENTS: ???', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: '#ff6b5a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Cart: forty blankets. | *Zero regrets.*', mood: 'sleepy', star: L,
    front(x, t, lt, P) {
      drawBits(x, BLANKETS, BLANKETS_C, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1070, 'ADD 1 MORE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: '#5fd068', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'New mug? | *Checked its compatibility.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'mug', 790, 830, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1050, 'MUG: ALIGNED ✓', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 830, P.t0 + 1.3, 7, 170, 0.4)
    } },
  { sign: 'cancer', cap: 'Gifts for everyone. | *Nothing for Cancer.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: L,
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) bits(x, 'gift', 690 + (i % 3) * 100 + (i > 2 ? 50 : 0), 960 - (i > 2 ? 110 : 0), 12 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.25, 2.2))
      label(x, 790, 680, 'FOR: EVERYONE ♡', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Filter: gold. | *Bought the whole page.*', mood: 'sparkle', star: L, hops: [1.2],
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) drawBits(x, CROWN, { Y: GOLD, R: RED }, 700 + (i % 3) * 95, 760 + Math.floor(i / 3) * 120, 11 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2.2))
      label(x, 790, 1070, 'SOLD OUT (BY LEO)', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: '#ffb34a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Read every review. | *For a sponge.*', mood: 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const n = Math.floor(prog(lt, 0.2, 1.8) * 312)
      label(x, 790, 680, `REVIEWS READ: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      drawBits(x, SPONGE, SPONGE_C, 790, 880, 22 * pop01(t, P.t0 + 0.6, 0.3, 2))
    } },
  { sign: 'libra', cap: 'Full cart since March. | *Still deciding.*', mood: lt => lt > 1.2 ? 'neutral' : 'happy', star: L,
    front(x, t, lt, P) {
      drawBits(x, CART, CART_C, 790, 850, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1070, 'CHECKOUT? …LATER', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Tracks the package. | *Every five minutes.*', mood: 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const p = ease.inOutQuad(prog(lt, 0.3, 2.2))
      phone(x, 790, 830, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: `${Math.floor(9 + p * 3)}:${String(Math.floor(p * 59)).padStart(2, '0')}`, head: 'TRACKING', msg: `refresh | #${1 + Math.floor(p * 40)}`, bg: '#c97bff' })
    } },
  { sign: 'sagittarius', cap: 'Bought a kayak. | *Lives in a studio.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: L,
    front(x, t, lt, P) {
      drawBits(x, KAYAK, KAYAK_C, 780, 850, 12 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      label(x, 790, 1050, 'FITS? NO.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 46, bg: '#ff9a4a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Waited a year | *to save two dollars.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', star: L,
    front(x, t, lt, P) {
      label(x, 790, 760, lt > 1.0 ? 'SALE: $48' : 'PRICE: $50', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 50, bg: lt > 1.0 ? MINT : BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 940, 'WORTH THE WAIT', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Ordered one bolt. | *For “a project.”*', mood: lt => lt > 1.2 ? 'wink' : 'happy', star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BOLT, { G: '#9aa5c4' }, 790, 830, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.3 })
      label(x, 790, 1060, 'PART 1 OF 400', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 40, bg: '#6fc3ff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried at the | *product description.*', mood: 'wide', look: [1, 0], star: L, tears: 3,
    front(x, t, lt, P) {
      note(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 'soft. cozy. | will hug | you back.', { head: 'DESCRIPTION', headBg: '#b7a6ff', size: 40, w: 360 })
      label(x, 790, 1070, 'ADDED TO CART', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0680', key: 'F', accent: CART_ACC, ending: 'callback',
  title: 'The signs | *online shopping.*',
  cameos: CAMEOS,
  group: { cap: 'Payday? | *Gone by noon.*' },
  last: {
    text: 'The kayak | *is the couch now.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.35, 2)
      signChar(x, t, 'sagittarius', 540, 1030, 220, { mood: 'sleepy', pop: pop01(t, t - lt + 1.0, 0.4, 1.8), seed: 9 })
      drawBits(x, KAYAK, KAYAK_C, 540, 1150, 22 * k)
      label(x, 540, 1330, 'SEATS 2 ♡', pop01(t, t - lt + 1.3, 0.3, 2.2), { size: 46, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
