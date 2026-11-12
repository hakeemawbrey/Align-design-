// r2t0481: star_talk, BELIKE, "Zodiacs shopping | hungry be like." (~57 s vertical, signs3kit social cut,
// music: lofi · C). Ending: callback.
//   0.0–3.6    "Zodiacs shopping | hungry *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one hungry trip per sign (3.8 s each):
//              ♈ opened the chips before the till · ♉ came for milk, left with a cheese wheel · ♊ sent their match
//              every snack · ♋ shopping for one, bought for twelve · ♌ a cake with their face on it · ♍ read every
//              label, hour two · ♎ weighed two cereals, bought neither · ♏ knows when bread goes half price
//              · ♐ snacks from nine countries · ♑ stuck to the list, ate the list · ♒ came for bread, got a cactus
//              · ♓ smelled fresh bread, wept
//  49.2        "Never shop | *hungry.*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "The cheese wheel? | *Gone by Tuesday.*"  Taurus is back with one tiny wedge.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', RED = '#e23d4e'

const CHIPS = [
  '.RRRRRRRR.',
  'RRRRRRRRRR',
  'RRYYYYYYRR',
  'RRYOOOOYRR',
  'RRYOOOOYRR',
  'RRYYYYYYRR',
  'RRRRRRRRRR',
  'RRRRRRRRRR',
  '.RRRRRRRR.',
]
const CHIPS_C = { R: RED, Y: GOLD, O: '#ffb34a' }
const CRUMB = ['YY', 'YY']
const CHEESE = [
  '....YYYYYY....',
  '..YYYYYYYYYY..',
  '.YYYoYYYYYoYY.',
  'YYYYYYYYoYYYYY',
  'YYoYYYYYYYYYYY',
  'DDDDDDDDDDDDDD',
  'DDDDDDDDDDDDDD',
  '.DDDDDDDDDDDD.',
  '..DDDDDDDDDD..',
]
const CHEESE_C = { Y: '#ffd23a', o: '#e8a830', D: '#e8a830' }
const WEDGE = [
  'Y.....',
  'YYY...',
  'YoYYY.',
  'DDDDDD',
  'DDDDDD',
]
const MILK = [
  '..WW..',
  '.WWWW.',
  'WWWWWW',
  'WSSSSW',
  'WSWWSW',
  'WSSSSW',
  'WWWWWW',
  'WWWWWW',
]
const MILK_C = { W: '#ffffff', S: SKYB }
const CAN = [
  'GGGGGG',
  'RRRRRR',
  'RWWWWR',
  'RWWWWR',
  'RRRRRR',
  'GGGGGG',
]
const CAN_C = { G: '#9aa5c4', R: '#ff9a7a', W: PAPER }
const CAKE = [
  '.....C.....',
  '.....F.....',
  '.PPPPPPPPP.',
  'PPPPPPPPPPP',
  'WWWWWWWWWWW',
  'WWWWWWWWWWW',
  'PPPPPPPPPPP',
  'WWWWWWWWWWW',
  'WWWWWWWWWWW',
]
const CAKE_C = { C: '#ffd23a', F: '#ff9a4a', P: PINK, W: PAPER }
const GLASS = [
  '.KKKK...',
  'KSSSSK..',
  'KSWSSK..',
  'KSSSSK..',
  '.KKKKK..',
  '.....KK.',
  '......KK',
]
const GLASS_C = { K: '#6b62a8', S: SKYB, W: '#ffffff' }
const BOX = [
  'KKKKKK',
  'KYYYYK',
  'KYWWYK',
  'KYWWYK',
  'KYYYYK',
  'KYYYYK',
  'KKKKKK',
]
const BREAD = [
  '..BBBBBB..',
  '.BBbBBbBB.',
  'BBBBBBBBBB',
  'BBBBBBBBBB',
  '.BBBBBBBB.',
]
const BREAD_C = { B: '#e8a24a', b: '#fff4e2' }
const BAG = [
  '..KKKK..',
  '.K....K.',
  'CCCCCCCC',
  'CCWWWWCC',
  'CCWWWWCC',
  'CCCCCCCC',
  'CCCCCCCC',
]
const CACTUS = [
  '....GG....',
  '...GGGG...',
  '.G.GGGG...',
  '.G.GGGG.G.',
  '.GGGGGG.G.',
  '...GGGGGG.',
  '...GGGG...',
  'OOOOOOOOOO',
  '.OOOOOOOO.',
  '.OOOOOOOO.',
  '..OOOOOO..',
]
const CACTUS_C = { G: '#5fd068', O: '#d8754a' }
const PHONE = [
  'KKKKKKKK',
  'KSSSSSSK',
  'KSYYYYSK',
  'KSYOOYSK',
  'KSYYYYSK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KKKGGKKK',
  'KKKKKKKK',
]
const PHONE_C = { K: '#2a2350', S: SKYB, Y: GOLD, O: RED, G: '#6b62a8' }

// a paper shopping list with ticks; `bitten` 0…1 eats it from the bottom corner
function list(x, cx, cy, k, bitten = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-116, -156, 232, 312)
  x.fillStyle = PAPER; x.fillRect(-108, -148, 216, 296)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THE LIST', 0, -112)
  x.font = `700 22px ${MONO}`; x.textAlign = 'left'
  ;['oats', 'rice', 'eggs', 'beans'].forEach((w, i) => { x.fillStyle = '#2fc79a'; x.fillRect(-84, -66 + i * 52, 18, 18); x.fillStyle = INK; x.fillText(w, -54, -56 + i * 52) })
  if (bitten > 0) {   // bite marks: round chunks out of the corner
    x.fillStyle = '#140c30'
    const n = Math.ceil(bitten * 5)
    for (let i = 0; i < n; i++) { x.beginPath(); x.arc(108 - i * 34, 148 - (i % 2) * 18, 34, 0, Math.PI * 2); x.fill() }
  }
  x.restore()
}
// a balance scale with a box on each pan
function scale(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const tilt = 0.18 * Math.sin(lt * 3.2)
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -10, 28, 230); x.fillRect(-90, 210, 180, 24)
  x.fillStyle = GOLD; x.fillRect(-8, -4, 16, 218); x.fillRect(-84, 214, 168, 14)
  x.save(); x.rotate(tilt)
  x.fillStyle = INK; x.fillRect(-170, -12, 340, 20); x.fillStyle = GOLD; x.fillRect(-166, -8, 332, 12)
  for (const s of [-1, 1]) {
    x.save(); x.translate(s * 150, 0); x.rotate(-tilt)
    x.fillStyle = GOLD; x.fillRect(-4, 0, 8, 60); x.fillStyle = INK; x.fillRect(-64, 56, 128, 14)
    drawBits(x, BOX, { K: INK, Y: s < 0 ? '#ffb34a' : '#8fe3ff', W: PAPER }, 0, 10, 12)
    x.restore()
  }
  x.restore(); x.restore()
}

const L = { x: -160 }, R = { x: 150 }
const CAMEOS = [
  { sign: 'aries', cap: 'Opened the chips | *before the till.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', star: L, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      drawBits(x, CHIPS, CHIPS_C, 790, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.12 })
      for (let i = 0; i < 6; i++) { const ph = prog(lt, 0.6 + i * 0.12, 1.4 + i * 0.12); if (ph > 0 && ph < 1) drawBits(x, CRUMB, { Y: GOLD }, 760 + (i - 2.5) * 40, 820 - 120 * Math.sin(Math.PI * ph), 10) }
      label(x, 790, 1110, 'PAID: NOT YET', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Came for milk. | Left with *a cheese wheel.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: L, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, MILK, MILK_C, 700, 720, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: 1 - prog(lt, 0.8, 1.1) })
      drawBits(x, CHEESE, CHEESE_C, 790, 960, 24 * pop01(t, P.t0 + 0.9, 0.4, 2))
      label(x, 790, 1130, 'MILK: FORGOT', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Sent their match | *every single snack.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 790, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      const n = Math.min(37, Math.floor(clamp((lt - 0.4) / 1.4) * 37) + 1)
      label(x, 790, 700, `PHOTOS SENT: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1130, 'match: …hungry?', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Shopping for one. | *Bought for twelve.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: L, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) drawBits(x, CAN, CAN_C, 700 + (i % 3) * 90, 1080 - Math.floor(i / 3) * 90 - (i >= 3 ? 0 : 0), 13 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2))
      for (let i = 0; i < 3; i++) drawBits(x, CAN, CAN_C, 745 + i * 90 - (i === 2 ? 45 : 0) - 0, 900, 13 * pop01(t, P.t0 + 1.0 + i * 0.12, 0.3, 2))
      label(x, 790, 720, 'SERVES: 12', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Bought a cake | *with their face on it.*', mood: 'sparkle', star: L, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, CAKE, CAKE_C, 790, 980, 24 * k)
      if (k > 0.5) signChar(x, t, 'leo', 790, 980, 120 * k, { mood: 'sparkle', glyph: false, seed: 31, glow: 0.4 })
      label(x, 790, 760, 'FOR: ME', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 40, bg: '#ffb34a', rot: -0.05 })
      sparkles(x, t, 790, 960, P.t0 + 1.1, 6, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'Read every label. | *Hour two.*', mood: lt => lt > 1.5 ? 'sleepy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, BOX, { K: INK, Y: MINT, W: PAPER }, 820, 1000, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, GLASS, GLASS_C, 760 + 30 * Math.sin(lt * 4), 940, 22 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 790, 720, 'AISLE 3 · HOUR 2', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Weighed two cereals. | *Bought neither.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: lt => [Math.sin(lt * 3.2) > 0 ? 1 : -1, 0], star: L,
    front(x, t, lt, P) {
      scale(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1150, 'CART: EMPTY', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Knows when bread | goes *half price.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, BREAD, BREAD_C, 790, 980, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const mins = Math.min(59, 55 + Math.floor(lt * 2))
      label(x, 790, 760, `7:${mins} PM`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 44, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1140, '−50% · CALLED IT', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'sagittarius', cap: 'Snacks from | *nine countries.*', mood: 'sparkle', star: R, hops: [0.5, 1.3],
    front(x, t, lt, P) {
      const COLS = ['#ff9a4a', MINT, SKYB, PINK, GOLD, LAV]
      for (let i = 0; i < 6; i++) drawBits(x, BAG, { K: INK, C: COLS[i], W: PAPER }, 220 + (i % 3) * 110, 1060 - Math.floor(i / 3) * 120, 12 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), { rot: (i % 2 ? 0.08 : -0.08) })
      label(x, 330, 720, 'WORLD AISLE: EMPTY', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Stuck to the list. | *Ate the list.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      list(x, 320, 900, pop01(t, P.t0 + 0.2, 0.35, 2), clamp((lt - 1.0) / 0.9))
      label(x, 320, 1130, 'BUDGET: KEPT', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Came for bread. | Got *a cactus.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, -1], star: L, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, CACTUS, CACTUS_C, 790, 950, 22 * pop01(t, P.t0 + 0.4, 0.35, 2))
      bubble(x, 790, 680, 'his name | is greg', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
      label(x, 790, 1140, 'COMPATIBLE: YES', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Smelled fresh bread. | *Wept.*', mood: lt => lt < 0.9 ? 'sparkle' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BREAD, BREAD_C, 790, 980, 22 * k)
      x.save(); x.fillStyle = 'rgba(239,230,214,0.6)'
      for (let i = 0; i < 4; i++) { const ph = (t * 0.7 + i / 4) % 1; if (k > 0.5) x.fillRect(730 + i * 40 + Math.sin(ph * 6 + i) * 10, 900 - ph * 160, 12, 26) }
      x.restore()
      label(x, 790, 720, 'STILL WARM', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: '#ff9a4a', rot: -0.05 })
    } },
]

const F = makeFilm({
  id: 'r2t0481', key: 'C', accent: '#ffd23a', ending: 'callback',
  title: 'Zodiacs shopping | hungry *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Never shop | *hungry.*' },
  last: {
    text: 'The cheese wheel? | *Gone by Tuesday.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 400, 1110, 260 * k, { mood: lt > 1.3 ? 'sleepy' : 'heart', look: [1, 0], seed: 12, hops: [t - lt + 1.3] })
      const big = 1 - ease.inOutCubic(prog(lt, 0.8, 1.6))
      drawBits(x, CHEESE, CHEESE_C, 730, 1110, 22 * pop01(t, t - lt + 0.5, 0.35, 2) * big)
      drawBits(x, WEDGE, CHEESE_C, 730, 1120, 30 * pop01(t, t - lt + 1.5, 0.3, 2))
      label(x, 730, 1270, 'LEFT: ONE BITE', pop01(t, t - lt + 1.8, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
