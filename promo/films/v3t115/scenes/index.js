// v3t115: THE SIGNS AS… v3, "Zodiacs on payday | be like." (~57 s vertical, signs3kit social cut, music: lofi · G)
//   0.0–3.6    "Zodiacs on payday | *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   payday per sign (3.8 s each), pushed to the extreme:
//              ♈ spent it all on the way home · ♉ booked a spa day, for a week (cucumber eyes) · ♊ forty things in the cart
//              · ♋ bought gifts for everyone else · ♌ paid the whole bill, announced it · ♍ budgeted down to the gum
//              · ♎ bought both shoes, returned both · ♏ saved it all, told no one · ♐ one-way ticket
//              · ♑ invested it before it landed · ♒ gave it all to the bees · ♓ adopted every sad stuffed animal
//  49.2        "Payday: | *gone by Friday.*"  The twelve fly up into a group photo.
//  52.6        callback: "Next payday? | *Ask Scorpio.*"  (the secret safe swings open, coins for everyone)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREEN = '#5fd068', ACC = '#7dffb0'

const WALLET = ['BBBBBBBBBB', 'BWWWWWWWWB', 'BBBBBBBBBB', 'BBBBBBBGGB', 'BBBBBBBGGB', 'BBBBBBBBBB']
const COIN = ['.GGG.', 'GGYGG', 'GYGGG', 'GGGGG', '.GGG.']
const COIN_C = { G: GOLD, Y: '#fff1b0' }
const CART = [
  'K...........',
  'KK.........',
  '.KKKKKKKKKKK',
  '.K.K.K.K.K.K',
  '.KKKKKKKKKKK',
  '..K.K.K.K.K.',
  '..KKKKKKKKK.',
  '...O....O...',
]
const GIFT = ['...R.R...', '....R....', 'BBBBRBBBB', 'BBBBRBBBB', 'RRRRRRRRR', 'BBBBRBBBB', 'BBBBRBBBB']
const SHOE = ['SS......', 'SSS.....', 'SSSSSSS.', 'SSSSSSSS', 'WWWWWWWW']
const SAFE = [
  'KKKKKKKKKKKK',
  'KGGGGGGGGGGK',
  'KGGGGGGGGGGK',
  'KGGGGWWGGGGK',
  'KGGGWKKWGGGK',
  'KGGGWKKWGGGK',
  'KGGGGWWGGGGK',
  'KGGGGGGGGGGK',
  'KKKKKKKKKKKK',
  '.K........K.',
]
const SAFE_C = { K: INK, G: '#9aa5c4', W: GOLD }
const TICKET = [
  'WWWWWWWWWWWWWW',
  'WKKKKKKW.WWWWW',
  'WWWWWWWWWWKKKW',
  'WKKKKWWW.WWWWW',
  'WWWWWWWWWWWWWW',
]
const BEE = ['..WW.WW..', '..WW.WW..', '.YKYKYKY.', 'YYKYKYKYK', '.YKYKYKY.']
const PLUSH = ['B...B', 'BBBBB', 'BKBKB', 'BBBBB', '.BBB.']

const CAMEOS = [
  { sign: 'aries', cap: 'Spent it all | *on the way home.*', mood: 'sparkle', star: { x: -170 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, WALLET, { B: BROWN, W: '#c98a5a', G: GOLD }, 790, 900, 22 * k)
      for (let i = 0; i < 6; i++) { const p = prog(lt, 0.4 + i * 0.2, 1.0 + i * 0.2); if (p > 0 && p < 1) drawBits(x, COIN, COIN_C, 790 + (i - 2.5) * 50 * p, 860 - 300 * p, 9, { alpha: 1 - p }) }
      label(x, 790, 1080, 'BALANCE: 0.00', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: RED, color: '#fff4e2', rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 640, 'worth it', pop01(t, P.t0 + 1.9, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Booked a spa day. | *For a week.*', mood: 'sleepy', star: { x: -150 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      if (k > 0.01) inEyes(x, F, k)
      label(x, 790, 720, 'DO NOT DISTURB', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 900, 'DAY 6 OF 7', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 40, bg: GREEN, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Added forty things | *to the cart.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const n = Math.min(40, Math.floor(Math.max(0, lt - 0.3) * 22) + 1)
      const COLS = [PINK, SKYB, MINT, GOLD, LAV, ORANGE]
      for (let i = 0; i < Math.min(12, Math.ceil(n / 3)); i++) drawBits(x, ['XX', 'XX'], { X: COLS[i % 6] }, 720 + (i % 6) * 26, 860 - Math.floor(i / 6) * 30, 12)
      drawBits(x, CART, { K: '#c9c9d8', O: INK }, 790, 920, 20 * k)
      label(x, 790, 700, `CART: ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1110, 'CHECKED OUT: 0', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Bought gifts | *for everyone else.*', mood: 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      const TAGS = ['MOM', 'MY MATCH', 'NEIGHBOUR']
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.3, 0.3, 2)
        drawBits(x, GIFT, { B: [PINK, SKYB, MINT][i], R: [GOLD, RED, LAV][i] }, 790, 660 + i * 170, 12 * k)
        label(x, 790, 720 + i * 170, TAGS[i], k, { size: 24, bg: BONE, rot: i % 2 ? 0.06 : -0.06, font: MONO, weight: 700 })
      }
      label(x, 790, 1170, 'FOR ME: 0', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Paid the whole bill. | *Announced it.*', mood: 'sparkle', star: { x: -170 }, hops: [0.6],
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'IT’S ON ME!!', pop01(t, P.t0 + 0.4, 0.25, 2.4), { size: 52, tail: 'bl' })
      label(x, 790, 880, 'TABLE OF 30', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 38, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1060, 'applause, please', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      sparkles(x, t, 790, 700, P.t0 + 0.6, 7, 200, 0.3)
    } },
  { sign: 'virgo', cap: 'Budgeted every cent. | *Down to gum.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 820); x.scale(k, k); x.rotate(t * 0.15)
        const C = [GREEN, SKYB, PINK, GOLD, LAV], A = [0.35, 0.25, 0.2, 0.15, 0.05]
        let a0 = 0; x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
        A.forEach((v, i) => { x.fillStyle = C[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 130, a0, a0 + v * Math.PI * 2 * clamp((lt - 0.3) / 1.0)); x.closePath(); x.fill(); a0 += v * Math.PI * 2 })
        x.restore()
      }
      label(x, 790, 1080, 'GUM: 1 PIECE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Bought both shoes. | *Returned both.*', mood: lt => lt > 1.4 ? 'squint' : 'heart', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const back = ease.inCubic(prog(lt, 1.3, 1.9))
      drawBits(x, SHOE, { S: PINK, W: '#fff4e2' }, 720, 900 - back * 400, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: 1 - back })
      drawBits(x, SHOE, { S: SKYB, W: '#fff4e2' }, 870, 900 - back * 400, 18 * pop01(t, P.t0 + 0.4, 0.3, 2), { alpha: 1 - back })
      label(x, 790, 1080, 'REFUND: PENDING', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 680, 'but which one?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Saved it all. | *Told no one.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SAFE, SAFE_C, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 660, 'SAVINGS: CLASSIFIED', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 28, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1150, 'not even | my match', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Payday? | *One-way ticket.*', mood: 'sparkle', star: { x: 150 }, hops: [0.5, 1.2],
    front(x, t, lt, P) {
      drawBits(x, TICKET, { W: '#fff4e2', K: '#b9b0a0' }, 330, 860, 22 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: -0.08 })
      label(x, 330, 1020, 'RETURN: ???', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 330, 640, 'bye, rent!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Invested it | *before it landed.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.globalAlpha = k
        x.fillStyle = INK; x.fillRect(620, 640, 340, 340); x.fillStyle = '#140c30'; x.fillRect(630, 650, 320, 320)
        const pts = [[650, 940], [710, 900], [770, 920], [830, 820], [890, 760], [935, 680]]
        const n = clamp((lt - 0.3) / 1.2) * (pts.length - 1)
        x.strokeStyle = GREEN; x.lineWidth = 10; x.beginPath(); x.moveTo(...pts[0])
        for (let i = 1; i <= Math.floor(n); i++) x.lineTo(...pts[i])
        const f = n - Math.floor(n), a = pts[Math.floor(n)], b = pts[Math.min(pts.length - 1, Math.floor(n) + 1)]
        x.lineTo(lerp(a[0], b[0], f), lerp(a[1], b[1], f)); x.stroke(); x.restore()
      }
      label(x, 790, 1080, 'MONEY: WORKING', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Gave it all | *to the bees.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2)
        drawBits(x, BEE, { W: '#e8ecf6', Y: GOLD, K: INK }, 700 + (i % 3) * 90 + 12 * Math.sin(t * 5 + i), 700 + Math.floor(i / 3) * 140 + 10 * Math.cos(t * 4 + i), 10 * k)
      }
      label(x, 790, 1060, 'DONOR OF THE YEAR', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 390, 600, 'bzz bzz', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Adopted every sad | *stuffed animal.*', mood: lt => lt < 1.0 ? 'wide' : 'heart', tears: lt => lt < 1.0 ? 2 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      const COLS = [PINK, SKYB, MINT, GOLD, LAV, ORANGE, '#c97bff']
      for (let i = 0; i < 7; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.18, 0.3, 2.2)
        drawBits(x, PLUSH, { B: COLS[i], K: INK }, 680 + (i % 3) * 110 + (Math.floor(i / 3) % 2) * 50, 1080 - Math.floor(i / 3) * 110, 15 * k)
      }
      label(x, 790, 660, 'THEY LOOKED LONELY', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
    } },
]

// cucumber slices over the eyes (in the star's sprite cells)
function inEyes(x, F, k) {
  for (const ex of [-7.5, 7.5]) {
    const cx = F.x + ex * F.cell, cy = F.cy + 2.5 * F.cell
    x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, 5.2 * F.cell * k, 0, Math.PI * 2); x.fill()
    x.fillStyle = GREEN; x.beginPath(); x.arc(cx, cy, 4.6 * F.cell * k, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#d6f5c4'; x.beginPath(); x.arc(cx, cy, 3.4 * F.cell * k, 0, Math.PI * 2); x.fill()
  }
}

const F = makeFilm({
  id: 'v3t115', key: 'G', accent: ACC, ending: 'callback',
  title: 'Zodiacs on payday | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Payday: | *gone by Friday.*' },
  last: {
    text: 'Next payday? | *Ask Scorpio.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 2)
      const open = lt > 1.4
      if (k > 0.01) drawBits(x, SAFE, open ? { ...SAFE_C, G: '#6b6890' } : SAFE_C, 540, 1020, 30 * k)
      if (open) for (let i = 0; i < 14; i++) { const p = ((lt - 1.4) * 0.8 + i / 14) % 1; drawBits(x, COIN, COIN_C, 540 + Math.sin(i * 2.3) * 360 * p, 960 - 380 * Math.sin(Math.PI * p) + 200 * p, 10, { alpha: 1 - p }) }
      const s = pop01(t, t - lt + 1.0, 0.4, 2)
      if (s > 0.01) signChar(x, t, 'scorpio', 800, 1240, 200 * s, { mood: open ? 'wink' : 'neutral', look: [-1, 0], seed: 9 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
