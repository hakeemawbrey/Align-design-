// r2t0726: star_talk, ROLLCALL, "The signs at a | *cheese tasting.*" (signs3kit social cut, lofi · C). Ending: callback.
//   ♈ sampled the whole wheel · ♉ moved in next to the brie · ♊ loved it, hated it, same cheese · ♋ packed some for grandma
//   · ♌ got a cheese named after them · ♍ cubes cut to exactly 1 cm · ♎ matched every cheese by star sign
//   · ♏ guessed the cheese and the cow's name · ♐ followed the goat home · ♑ bought the shop by dessert
//   · ♒ brought homemade cheese, it glows · ♓ cried at "aged 3 years"
//   group "Twelve signs. | *Zero cheese left.*" · last (callback to Taurus) "Taurus never | *went home.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, zzz, B, C, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a'
Object.assign(B, {
  WHEEL: ['...YYYYYYYY...', '.YYYYYYYYYYYY.', 'YYYYYYYYYYYYYY', 'RRRRRRRRRRRRRR', 'YYYOYYYYYOYYYY', 'YYYYYYOYYYYYYY', 'YOYYYYYYYYYOYY', 'RRRRRRRRRRRRRR', '.YYYYYYYYYYYY.'],
  WEDGE: ['..........WW', '........WWCC', '......WWCCCC', '....WWCCOCCC', '..WWCCCCCCCC', 'WWCCOCCCCOCC', 'CCCCCCCCCCCC', 'CCCOCCCCCCCC'],
  BRIE: ['......RRRR..', '....RRWWWWR.', '..RRWWWWWWWR', 'RRWWWWWWWWWR', 'RWWWWWWWWWWR', 'RRRRRRRRRRRR'],
  CUBE: ['YYYY', 'YYYY', 'YYYY', 'OOOO'],
  TUPPER: ['.LLLLLLLLLL.', 'LLLLLLLLLLLL', 'WWWWWWWWWWWW', 'WYYYWWYYYYWW', 'WYYYWWYYYYWW', 'WWWWWWWWWWWW'],
  CROWN: ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY'],
  RULER: ['YYYYYYYYYYYYYYYYYY', 'KYKYKYKYKYKYKYKYKY', 'KYYYKYYYKYYYKYYYKY', 'YYYYYYYYYYYYYYYYYY'],
  GOAT: ['H.........H.', '.H.......H..', '..WWW...WWW.', '..WKWWWWWKW.', '...WWWWWWW..', '....WWPWW...', '.....WWW....', '......D.....'],
  GOATB: ['..WWWWWWWWWW..', '.WWWWWWWWWWWWW', '.WWWWWWWWWWWWW', '..WWWWWWWWWWW.', '..KK.KK..KK.KK', '..KK.KK..KK.KK'],
  SIGN: ['KKKKKKKKKKKK', 'KRRRRRRRRRRK', 'KRRRRRRRRRRK', 'KRRRRRRRRRRK', 'KKKKKKKKKKKK', '.....KK.....', '.....KK.....', '.....KK.....'],
  CRACKER: ['DDDDDDDD', 'DBDBDBDD', 'DDDDDDDD', 'DBDBDBDD', 'DDDDDDDD'],
})
Object.assign(C, {
  WHEEL: { Y: '#ffd23a', R: '#e8a24a', O: '#e8b33a' },
  WEDGE: { W: '#ffe9a0', C: '#ffd23a', O: '#e8a83a' },
  BRIE: { R: '#f4ead2', W: '#fff7e0' },
  CUBE: { Y: '#ffd23a', O: '#e8a24a' },
  TUPPER: { L: SKYB, W: '#e6f4ff', Y: '#ffd23a' },
  CROWN: { Y: GOLD, R: RED, B: SKYB },
  RULER: { Y: '#ffe27a', K: INK },
  GOAT: { H: STEEL, W: '#f4f0e6', K: INK, P: PINK, D: STEEL },
  GOATB: { W: '#f4f0e6', K: STEEL },
  CRACKER: { D: '#e0a56a', B: '#a8703a' },
  SIGN: { K: WOOD, R: '#2fa86a' },
})
const NEON = ['..........GG', '........GGLL', '......GGLLLL', '....GGLLOLLL', '..GGLLLLLLLL', 'GGLLOLLLLOLL', 'LLLLLLLLLLLL', 'LLLOLLLLLLLL']

const CAMEOS = [
  { sign: 'aries', cap: 'Sampled the wheel. | The *whole* wheel.', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -160 }, hops: [0.6],
    front(x, t, lt, P) {
      const eat = ease.inCubic(clamp((lt - 0.8) / 0.9))
      if (eat < 1) bits(x, 'WHEEL', 790, 950, 26 * (1 - eat) * pop01(t, P.t0 + 0.15, 0.3, 2))
      L(x, 790, 680, '1 SAMPLE PER GUEST', pop01(t, P.t0 + 0.35, 0.3, 2.2), CREAM, -0.04, 30)
      if (lt > 1.6) bubble(x, 790, 900, 'seconds?', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 46, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Moved in. | Next to the *brie.*', mood: lt => lt > 1.2 ? 'sleepy' : 'heart', star: { x: -150, y: 20 },
    back(x, t, lt, P) {
      bits(x, 'PILLOW', 330, 1040, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
    },
    front(x, t, lt, P) {
      bits(x, 'BRIE', 790, 960, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 700, 'NEW ADDRESS', pop01(t, P.t0 + 0.9, 0.3, 2.2), MINT, 0.04, 36)
      if (lt > 1.3) zzz(x, t, 400, 700, { alpha: clamp((lt - 1.3) / 0.3), size: 46 })
    } },
  { sign: 'gemini', cap: 'Loved it. Hated it. | *Same cheese.*', mood: lt => Math.floor(lt * 1.6) % 2 ? 'squint' : 'heart', look: lt => [Math.floor(lt * 1.6) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      bits(x, 'WEDGE', 790, 990, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const bad = Math.floor(lt * 1.6) % 2
      bubble(x, 790, 700, bad ? 'ew.' : 'obsessed!', pop01(t, P.t0 + 0.35, 0.25, 2.2), { size: 50, col: bad ? STEEL : BONE, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Packed leftovers. | For *grandma.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'TUPPER', 790, 1080 - i * 110, 20 * pop01(t, P.t0 + 0.25 + i * 0.3, 0.3, 2))
      L(x, 790, 690, 'FOR NANA ♡', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, -0.05, 38)
    } },
  { sign: 'leo', cap: 'Got a cheese | named *after them.*', mood: 'sparkle', look: [1, 0], star: { x: -160 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      bits(x, 'CROWN', F.x, F.top - 30, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'WHEEL', 790, 1000, 20 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 790, 760, 'AGED LEO', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, -0.05, 44)
      sparkles(x, t, 790, 900, P.t0 + 1.1, 7, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'Cut every cube. | Exactly *1 cm.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 1], star: { x: -160 },
    front(x, t, lt, P) {
      const n = Math.min(6, Math.floor(clamp((lt - 0.3) / 1.2) * 6))
      for (let i = 0; i < n; i++) bits(x, 'CUBE', 660 + (i % 3) * 120, 960 + Math.floor(i / 3) * 100, 16)
      bits(x, 'RULER', 780, 820, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1150, 'MEASURED TWICE', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Matched every cheese | by *star sign.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      bits(x, 'BRIE', 680, 970, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'CRACKER', 900, 980, 20 * pop01(t, P.t0 + 0.35, 0.3, 2))
      L(x, 690, 790, 'BRIE ♉︎', pop01(t, P.t0 + 0.5, 0.3, 2.2), CREAM, -0.05, 36)
      L(x, 870, 870, 'CRACKER ♑︎', pop01(t, P.t0 + 0.7, 0.3, 2.2), CREAM, 0.05, 34)
      L(x, 790, 1110, '✦ ALIGNED ✦', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.03, 40)
      hearts(x, t, 790, 960, P.t0 + 1.5, { n: 4, life: 1.4, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: 'scorpio', cap: 'Guessed the cheese. | And the *cow\'s name.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      bits(x, 'WEDGE', 790, 1020, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 690, 'gouda. 2 years.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      L(x, 790, 860, 'COW: DAISY', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.05, 38)
    } },
  { sign: 'sagittarius', cap: 'Followed the goat home. | *Lives there now.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const gx = lerp(760, 830, ease.inOutCubic(clamp(lt / 2)))
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'GOATB', gx + 20, 1020, 14 * k)
      bits(x, 'GOAT', gx - 70, 940, 14 * k)
      L(x, 790, 700, 'NEW HOME: A FARM', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, -0.04, 32)
      bubble(x, 600, 820, 'baa!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Bought the shop. | *By dessert.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'SIGN', 790, 880, 22 * k)
      if (k > 0.01) { x.save(); x.fillStyle = CREAM; x.font = `800 ${Math.round(46 * k)}px Inter, Arial, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(lt > 1.0 ? 'SOLD' : 'CHEESE', 790, 838); x.restore() }
      bits(x, 'KEY', 790, 1100, 14 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
      L(x, 790, 660, 'OWNER: CAPRICORN', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Brought homemade cheese. | It *glows.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      if (k > 0.01 && lt > 0.8) { x.save(); x.globalAlpha = 0.35 + 0.15 * Math.sin(t * 6); x.shadowColor = MINT; x.shadowBlur = 60; x.fillStyle = 'rgba(125,255,176,0.35)'; x.beginPath(); x.arc(790, 940, 150, 0, Math.PI * 2); x.fill(); x.restore() }
      drawBits(x, NEON, { G: '#d9ffe8', L: MINT, O: '#3fdc8a' }, 790, 940, 22 * k)
      L(x, 790, 700, 'RECIPE: CLASSIFIED', pop01(t, P.t0 + 1.0, 0.3, 2.2), LAV, -0.04, 30)
      bubble(x, 790, 1130, 'try it!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, col: MINT, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Cried at "aged 3 years." | It *waited so long.*', mood: lt => lt > 0.9 ? 'wide' : 'happy', tears: lt => lt > 0.9 ? 3 : 2, look: [1, 0], star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'WHEEL', 790, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 790, 'AGED 3 YEARS', pop01(t, P.t0 + 0.5, 0.3, 2.2), CREAM, -0.05, 36)
      bits(x, 'TISSUE', 870, 1140, 12 * pop01(t, P.t0 + 1.3, 0.3, 2.2))
      bubble(x, 790, 640, 'so patient...', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
    } },
]

import { signChar } from '../../signs3kit.js'
function signCharSafe(x, t, cx, cy, k) { if (k > 0.01) signChar(x, t, 'taurus', cx, cy, 260 * k, { mood: 'sleepy', seed: 12 }) }

const F = makeFilm({
  id: 'r2t0726', key: 'C', accent: ACC, ending: 'callback',
  title: 'The signs at a | *cheese tasting.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Zero cheese left.*' },
  last: {
    text: 'Taurus never | *went home.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 2)
      bits(x, 'PILLOW', 380, 1180, 22 * k)
      bits(x, 'BRIE', 720, 1170, 26 * k)
      x.save(); x.globalAlpha = clamp(k)
      signCharSafe(x, t, 380, 1060, k)
      x.restore()
      if (lt > 1.2) zzz(x, t, 460, 900, { alpha: clamp((lt - 1.2) / 0.3), size: 52 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
