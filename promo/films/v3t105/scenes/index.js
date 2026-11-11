// v3t105: THE SIGNS AS… v3, "The signs | at the grocery store." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, each the most extreme version of itself at the grocery store. Ending: callback.
//   aries: express lane, ninety items · taurus ate every free sample · gemini came for milk, left with a kayak · cancer
//   bought snacks for everyone they know · leo: the aisle is a runway · virgo checked every egg in every carton
//   · libra: two cereals, forty minutes · scorpio found the hidden clearance shelf · sagittarius rode the cart down
//   aisle nine · capricorn calculated the price per gram · aquarius bought the weirdest fruit on purpose · pisces cried
//   in the card aisle
//  49.2 "Nobody bought | what was *on the list.*"  ·  callback: "Back for milk. | Got *another kayak.*" (Gemini returns with a second kayak)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', ORANGE = '#ffb34a', GREEN = '#5fd068'

const CART = [
  'K.............',
  '.K............',
  '..KKKKKKKKKKKK',
  '..KGGGGGGGGGGK',
  '...KGGGGGGGGK.',
  '...KGGGGGGGGK.',
  '....KKKKKKKK..',
  '....K......K..',
  '....KKKKKKKK..',
  '.....O....O...',
]
const CART_C = { K: '#c9c9d8', G: '#5a5480', O: INK }
const KAYAK = [
  '..............P...........',
  '.............P............',
  '...KKK......P.......KKK...',
  '.KKYYYKKKKKBBBKKKKKYYYKK..',
  'KYYYYYYYYYKBBBBKYYYYYYYYKK',
  'KYYyYYYYYYYKBBKYYYYYYyYYYK',
  '.KKYYYYYYYYYYYYYYYYYYYYKK.',
  '...KKKKKKKKPKKKKKKKKKKK...',
  '..........P...............',
  '.........PP...............',
]
const KAYAK_C = { K: INK, Y: '#ffd23a', y: '#fff1b0', B: '#2a2350', P: '#c9c9d8' }
const MILK = ['.WW.', 'WWWW', 'WSSW', 'WSSW', 'WWWW']
const EGGS = [
  'CCCCCCCCCCCCC',
  'CEECEECEECEEC',
  'CEECEECEECEEC',
  'CCCCCCCCCCCCC',
  'CEECEECEECEEC',
  'CEECEECEECEEC',
  'CCCCCCCCCCCCC',
]
const EGGS_C = { C: '#c9b48a', E: '#fff4e2' }
const FRUIT = [
  '...G.G.G...',
  '....GGG....',
  '..PPPPPPP..',
  '.PPGPPPGPP.',
  'PPPPPWPPPPP',
  'PGPPPPPPGPP',
  'PPPPWPPPPPP',
  '.PPGPPPGPP.',
  '..PPPPPPP..',
]
const FRUIT_C = { G: GREEN, P: '#ff4fa0', W: '#fff4e2' }
const TRAY = ['..........', 'TTTTTTTTTT', '.TTTTTTTT.']

function box(x, cx, cy, w, h, col, txt, rot = 0, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#fff4e2'; x.fillRect(-w / 2 + 14, -h / 2 + 20, w - 28, 54)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, -h / 2 + 48)
  x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(0, 30, 34, 0, Math.PI * 2); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Express lane. | *Ninety items.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', star: { x: -180 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      label(x, 790, 630, 'EXPRESS · 10 ITEMS', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      drawBits(x, CART, CART_C, 800, 900, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      const n = Math.floor(clamp((lt - 0.5) / 1.4) * 90)
      label(x, 800, 1110, `ITEMS: ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 38, bg: RED, color: '#fff4e2', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Free samples? | Ate *all of them.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      const left = Math.max(0, 12 - Math.floor(clamp((lt - 0.4) / 1.4) * 12))
      drawBits(x, TRAY, { T: '#c9c9d8' }, 800, 920, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < left; i++) { x.fillStyle = INK; x.fillRect(686 + (i % 6) * 40, 846 + Math.floor(i / 6) * 34, 30, 28); x.fillStyle = ORANGE; x.fillRect(690 + (i % 6) * 40, 850 + Math.floor(i / 6) * 34, 22, 20) }
      label(x, 800, 660, 'TRY ONE!', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 36, bg: BONE, rot: -0.05 })
      label(x, 800, 1100, `SAMPLES LEFT: ${left}`, pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Came for milk. | Left with *a kayak.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180, y: -90 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 650, 'just milk!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      drawBits(x, KAYAK, KAYAK_C, 560, 1050, 20 * pop01(t, P.t0 + 1.1, 0.35, 2), { rot: -0.05 })
      label(x, 820, 880, 'MILK: FORGOT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Bought snacks | for *everyone they know.*', mood: 'heart', star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, CART, CART_C, 800, 950, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const C = [ORANGE, PINK, MINT, GOLD, SKYB, LAV, RED]
      const n = Math.floor(clamp((lt - 0.4) / 1.3) * 14)
      for (let i = 0; i < n; i++) { const px = 720 + (i % 5) * 40, py = 880 - Math.floor(i / 5) * 46; x.fillStyle = INK; x.fillRect(px - 4, py - 4, 38, 46); x.fillStyle = C[i % 7]; x.fillRect(px, py, 30, 38) }
      label(x, 800, 640, 'FOR MY PEOPLE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04 })
    } },
  { sign: 'leo', cap: 'Aisle five? | It’s *a runway.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', star: { x: 0, y: -10, s: 260 }, hops: [0.7, 1.4, 2.0],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.18 * k; x.fillStyle = '#fff1b0'
      x.beginPath(); x.moveTo(260, 470); x.lineTo(470, 1150); x.lineTo(610, 1150); x.closePath(); x.fill()
      x.beginPath(); x.moveTo(820, 470); x.lineTo(470, 1150); x.lineTo(610, 1150); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      label(x, 540, 620, 'AISLE 5 · CEREAL', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 30, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      bubble(x, 800, 1100, '*twirl*', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      sparkles(x, t, 540, 860, P.t0 + 1.0, 8, 200, 0.6)
    } },
  { sign: 'virgo', cap: 'Checked every egg. | In *every carton.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, EGGS, EGGS_C, 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const c = 1 + Math.floor(clamp((lt - 0.4) / 1.7) * 30)
      label(x, 800, 660, `CARTON ${c}/31`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1090, 'ONE HAD A SMUDGE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: RED, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Two cereals. | *Forty minutes.*', mood: lt => Math.floor(lt * 1.6) % 2 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 1.6) % 2 ? 1 : -1, 0], star: { x: 0, y: 40, s: 240 },
    front(x, t, lt, P) {
      const sw = Math.floor(lt * 1.6) % 2
      box(x, 300, 840, 160, 230, '#c94a8a', 'CRUNCH', -0.06 + (sw ? 0.06 : 0), pop01(t, P.t0 + 0.2, 0.3, 2) * (sw ? 1.08 : 0.92))
      box(x, 780, 840, 160, 230, '#3aa0d8', 'CRISP', 0.06 - (sw ? 0 : 0.06), pop01(t, P.t0 + 0.35, 0.3, 2) * (sw ? 0.92 : 1.08))
      label(x, 540, 1140, '0:39:58', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Found the *hidden* | clearance shelf.', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.globalAlpha = clamp(k)
        x.fillStyle = BROWN; for (let i = 0; i < 3; i++) x.fillRect(660, 740 + i * 120, 260, 16)
        const C = [ORANGE, MINT, PINK, SKYB, GOLD]
        for (let i = 0; i < 12; i++) { x.fillStyle = INK; x.fillRect(666 + (i % 4) * 64, 672 + Math.floor(i / 4) * 120, 50, 70); x.fillStyle = C[i % 5]; x.fillRect(670 + (i % 4) * 64, 676 + Math.floor(i / 4) * 120, 42, 62) }
        x.restore()
      }
      label(x, 790, 640, 'STAFF KNOW ONLY', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, '90% OFF ✦', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: RED, color: '#fff4e2', rot: 0.05 })
    } },
  { sign: 'sagittarius', cap: 'Rode the cart | down *aisle nine.*', mood: 'sparkle', star: { x: 0, y: -40, s: 230 },
    front(x, t, lt, P, F) {
      const ride = Math.sin(lt * 2.4) * 160
      drawBits(x, CART, CART_C, 540 + ride, 1000, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: Math.cos(lt * 2.4) > 0 ? 1 : -1 })
      label(x, 540, 640, 'WHEEEE', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 44, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'capricorn', cap: 'Calculated the | *price per gram.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 880); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-120, -170, 240, 340); x.fillStyle = '#5a5480'; x.fillRect(-112, -162, 224, 324)
        x.fillStyle = '#c8f0b0'; x.fillRect(-96, -146, 192, 76)
        x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText('0.0031', 84, -108)
        for (let i = 0; i < 12; i++) { x.fillStyle = INK; x.fillRect(-96 + (i % 3) * 68, -50 + Math.floor(i / 3) * 52, 56, 40); x.fillStyle = '#c9c9d8'; x.fillRect(-92 + (i % 3) * 68, -46 + Math.floor(i / 3) * 52, 48, 32) }
        x.restore()
      }
      label(x, 800, 640, 'THE BIG BAG WINS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Bought the weirdest fruit. | *On purpose.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, FRUIT, FRUIT_C, 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 2) * 0.08 })
      label(x, 800, 640, 'WHAT IS IT?', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04 })
      bubble(x, 800, 1110, 'no idea. love it', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Read one birthday card. | *Sobbed* in aisle six.', mood: 'wide', tears: lt => lt > 1.0 ? 3 : 1, star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 880); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-130, -170, 260, 340); x.fillStyle = '#ffc2d4'; x.fillRect(-122, -162, 244, 324)
        drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: RED }, 0, -40, 22)
        x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('“you matter”', 0, 100)
        x.restore()
      }
      label(x, 800, 640, 'CARD: $4.99', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t105', key: 'G', accent: GREEN, ending: 'callback',
  title: 'The signs at | the *grocery store.*',
  cameos: CAMEOS,
  card: { a: 'gemini', b: 'sagittarius', chip: 'ALIGNED' },
  group: { cap: 'Nobody bought | what was *on the list.*' },
  last: {
    text: 'Back for milk. | Got *another kayak.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.4, 2)
      drawBits(x, KAYAK, KAYAK_C, 540, 1010, 20 * k, { rot: -0.05 })
      drawBits(x, KAYAK, { ...KAYAK_C, Y: '#ff6b5a' }, 540, 1170, 20 * pop01(t, t - lt + 1.3, 0.4, 2), { rot: 0.04 })
      const g = pop01(t, t - lt + 0.3, 0.4, 2)
      if (g > 0.01) signChar(x, t, 'gemini', 540, 820, 230 * g, { mood: lt > 1.4 ? 'wink' : 'sparkle', seed: 61, hops: [t - lt + 1.4] })
      label(x, 820, 1300, 'MILK: 0', pop01(t, t - lt + 1.8, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
