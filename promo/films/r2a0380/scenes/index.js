// r2a0380: star_advice ADVICE-ROLLCALL, "Each sign’s summer | *adventure.*" (~57 s vertical, signs3kit social cut, lofi · G)
// Twelve signs in zodiac order, one warm summer adventure each, with a light visual gag:
//   ♈ jumps in the lake first · ♉ a picnic on the good blanket · ♊ a new hobby every week · ♋ beach day with the whole
//   family · ♌ golden hour, every photo · ♍ a garden, every seed labelled · ♎ an outdoor art class, paints the sky
//   · ♏ a mystery novel by the pool · ♐ says yes to every invite · ♑ takes a real week off · ♒ names a new
//   constellation · ♓ cries at the first firefly
//  49.2   "Sun’s out. | *Hearts open.*"  group photo
//  52.6   callback: "Capricorn’s week off? | *Now it’s two.*"  Capricorn in a beach chair, the OUT OF OFFICE sign again.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, signChar,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffd27a'
const BASKET = ['...KKKK...', '..K....K..', 'BBBBBBBBBB', 'BbBbBbBbBB', 'BBBBBBBBBB', 'BbBbBbBbBB', '.BBBBBBBB.']
const BASKET_C = { K: '#a8743f', B: '#d9a05b', b: '#a8743f' }
const UMBRELLA = ['...RRWRR...', '.RRWWRRWWR.', 'RWWRRWRRWWR', '.....K.....', '.....K.....', '.....K.....', '.....K.....', '.....K.....']
const UMBRELLA_C = { R: '#ff6b5a', W: '#fff4e2', K: INK }
const CAMERA = ['..KKK.....', 'KKKKKKKKKK', 'KGGGGGGGGK', 'KGGWWWGGGK', 'KGWBBBWGGK', 'KGWBBBWGGK', 'KGGWWWGGGK', 'KKKKKKKKKK']
const CAMERA_C = { K: INK, G: '#9aa5c4', W: '#fff4e2', B: '#2a2350' }
const SPROUT = ['.G..G.', 'GGGGGG', '..GG..', '..GG..', 'TTTTTT', '.TTTT.']
const SPROUT_C = { G: '#5fd07a', T: '#c96a3f' }
const EASEL = ['KKKKKKKKKK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KOOOOOOOOK', 'KPPPPPPPPK', 'KKKKKKKKKK', '.K......K.', 'K........K']
const EASEL_C = { K: '#a8743f', S: '#8fe3ff', O: '#ffb34a', P: '#ff8fb1' }
const BOOK = ['RRRRRRRRR', 'RWWWWWWWR', 'RWKKKKKWR', 'RWWWWWWWR', 'RWKKKKWWR', 'RWWWWWWWR', 'RRRRRRRRR']
const BOOK_C = { R: '#6b62a8', W: '#fff4e2', K: '#9aa5c4' }
const CHAIR = ['WRWRWRWRW', 'WRWRWRWRW', '.WRWRWRW.', '.WRWRWRW.', '.K.....K.', 'K.......K']
const CHAIR_C = { W: '#fff4e2', R: '#ff8fb1', K: '#a8743f' }
function splash(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  x.fillStyle = '#6fc3ff'; x.fillRect(cx - 200, cy, 400, 90)
  x.fillStyle = '#c4f0ff'
  for (let i = 0; i < 9; i++) { const a = -Math.PI * (0.15 + 0.7 * i / 8), r = 40 + 120 * ease.outCubic(prog(lt, 0.6, 1.3)); x.fillRect(cx + Math.cos(a) * r - 10, cy + Math.sin(a) * r * 1.4 - 10, 20, 20) }
  x.restore()
}
function constellation(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const pts = [[-140, 40], [-70, -60], [0, -20], [70, -90], [140, -10], [60, 80]]
  const n = Math.min(pts.length, Math.floor(clamp((lt - 0.3) / 1.2) * pts.length) + 1)
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = 'rgba(239,230,214,0.7)'; x.lineWidth = 4; x.beginPath()
  for (let i = 0; i < n; i++) i ? x.lineTo(...pts[i]) : x.moveTo(...pts[i])
  x.stroke()
  for (let i = 0; i < n; i++) { x.fillStyle = INK; x.fillRect(pts[i][0] - 12, pts[i][1] - 12, 24, 24); x.fillStyle = '#fff1b0'; x.fillRect(pts[i][0] - 8, pts[i][1] - 8, 16, 16) }
  x.restore()
}
function fireflies(x, t, cx, cy, n = 7) {
  for (let i = 0; i < n; i++) {
    const px = cx + Math.sin(t * 0.9 + i * 2.1) * 140, py = cy + Math.cos(t * 0.7 + i * 1.3) * 110
    const a = 0.5 + 0.5 * Math.sin(t * 4 + i * 1.7)
    x.save(); x.globalAlpha = a; x.shadowColor = '#e9ff7a'; x.shadowBlur = 20; x.fillStyle = '#e9ff7a'; x.fillRect(px - 7, py - 7, 14, 14); x.restore()
  }
}

const ST = { x: -170 }
const HOBBY = ['KAYAKING!', 'POTTERY!', 'SALSA!', 'BIRDWATCHING!', 'ALL OF THEM!']
const CAMEOS = [
  { sign: 'aries', cap: 'Jumps in the lake | *first.* Every time.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5],
    front(x, t, lt, P) {
      splash(x, t, 790, 1020, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 720, 'CANNONBALL!', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 46, bg: '#ff6b5a', color: '#fff4e2', rot: -0.05 })
    } },
  { sign: 'taurus', cap: 'A picnic. | *The good blanket.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      x.save(); x.globalAlpha = clamp(k)
      for (let j = 0; j < 3; j++) for (let i = 0; i < 8; i++) { x.fillStyle = (i + j) % 2 ? '#ff6b5a' : '#fff4e2'; x.fillRect(220 + i * 80, 1060 + j * 40, 80, 40) }
      x.restore()
    },
    front(x, t, lt, P) {
      drawBits(x, BASKET, BASKET_C, 800, 920, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 800, 700, 'SNACKS: PLENTY', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'A new hobby | *every single week.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 790, 860, HOBBY[Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.38))], pop01(t, P.t0 + 0.2, 0.3, 2), { size: 46, bg: '#ffe36a', rot: 0.04 })
      label(x, 790, 1060, 'WEEK ' + (1 + Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.38))), pop01(t, P.t0 + 0.4, 0.3, 2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Beach day | *with the whole family.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, UMBRELLA, UMBRELLA_C, 800, 820, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const FAM = ['taurus', 'virgo', 'pisces']
      FAM.forEach((id, i) => { const k = pop01(t, P.t0 + 0.6 + i * 0.2, 0.3, 2); if (k > 0.01) signChar(x, t, id, 680 + i * 120, 1080, 110 * k, { mood: 'happy', seed: 50 + i, glyph: false, tears: id === 'pisces' ? 1 : 0 }) })
    } },
  { sign: 'leo', cap: 'Golden hour. | *Every. Single. Photo.*', mood: 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CAMERA, CAMERA_C, 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.floor(clamp((lt - 0.3) / 1.6) * 300)
      label(x, 800, 1060, `PHOTOS: ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      if (Math.floor(lt * 4) % 3 === 0) { x.save(); x.globalAlpha = 0.25; x.fillStyle = '#fff'; x.fillRect(110, 480, 860, 740); x.restore() }
    } },
  { sign: 'virgo', cap: 'Starts a garden. | *Labels every seed.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const L = ['BASIL', 'MINT', 'TOMATO']
      L.forEach((l, i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2)
        drawBits(x, SPROUT, SPROUT_C, 680 + i * 110, 960, 14 * k)
        label(x, 680 + i * 110, 1060, l, k, { size: 22, bg: BONE, rot: 0, font: MONO, weight: 700 })
      })
      label(x, 790, 720, 'LABELLED: 3/3', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Outdoor art class. | *Paints the sky.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, EASEL, EASEL_C, 800, 870, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1110, 'MASTERPIECE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'A mystery novel | *by the pool.*', mood: 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 800, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      x.save(); x.globalAlpha = pop01(t, P.t0 + 0.2, 0.3, 2); x.fillStyle = '#6fc3ff'; x.fillRect(620, 1080, 360, 70); x.restore()
      bubble(x, 800, 660, 'called it. page 4.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Says yes | *to every invite.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.1, 1.6],
    front(x, t, lt, P) {
      ;[[720, 700], [880, 860], [740, 1040]].forEach(([lx, ly], i) => label(x, lx, ly, 'YES!', pop01(t, P.t0 + 0.4 + i * 0.45, 0.3, 2.4), { size: 52, bg: ['#c97bff', GOLD, MINT][i], color: i ? INK : '#fff4e2', rot: (i - 1) * 0.08 }))
    } },
  { sign: 'capricorn', cap: 'Takes a real | *week off.* Finally.', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 820, 'OUT OF OFFICE', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 42, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 980, 'BACK IN 7 DAYS', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'Stargazing. | *Names a new constellation.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      constellation(x, t, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1060, '“THE SNACK”', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: SKYB, rot: -0.04 })
    } },
  { sign: 'pisces', cap: 'Cries at | *the first firefly.*', mood: 'heart', tears: 3, look: [1, -1], star: ST,
    front(x, t, lt, P) {
      if (lt > 0.3) fireflies(x, t, 790, 860, Math.min(7, 1 + Math.floor((lt - 0.3) * 4)))
      label(x, 790, 1100, 'IT’S SO TINY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: PINK, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2a0380', key: 'G', accent: ACC, ending: 'callback',
  title: 'Each sign’s summer | *adventure.*',
  cameos: CAMEOS,
  group: { cap: 'Sun’s out. | *Hearts open.*' },
  last: {
    text: 'Capricorn’s week off? | *Now it’s two.*',
    draw(x, t, lt) {
      const k = pop01(lt, 0.3, 0.4, 2)
      drawBits(x, UMBRELLA, UMBRELLA_C, 600, 960, 36 * k)
      drawBits(x, CHAIR, CHAIR_C, 520, 1250, 40 * k)
      if (k > 0.01) signChar(x, t, 'capricorn', 520, 1120, 280 * k, { mood: 'sleepy', seed: 85, glyph: false })
      label(x, 780, 1400, 'BACK IN 14 DAYS', pop01(lt, 1.1, 0.3, 2.4), { size: 46, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
