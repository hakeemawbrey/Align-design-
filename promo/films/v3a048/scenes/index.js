// v3a048: star_advice, ADVICE ROLLCALL, "Each sign's | comfort food." (~62 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, each one's comfort food with a warm, funny line and one food gag. Ending: 'lesson'.
//   0.0–3.6    "Each sign's | *comfort food.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ pizza, way too hot: WORTH IT · ♉ mac and cheese, the whole pan · ♊ a snack plate: couldn't pick, didn't
//              · ♋ mom's stew, from the recipe card · ♌ a cake with their own name on it · ♍ a bento, nothing touching
//              · ♎ a row of pastel macarons · ♏ hot sauce on everything · ♐ dumplings somewhere new
//              · ♑ leftovers, labelled and dated · ♒ cereal for dinner · ♓ cries into the hot cocoa
//  49.2        "Full. | *And cozy.*"  group photo.
//  52.4        LESSON UNLOCKED: "Feed yourself | like *someone you love.*"  COMFORT: SERVED
//  58.3        "Now go | *have a snack.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', TEAL = '#2fc79a', CHEESE = '#ffcf3a', CRUST = '#e8a24a', BROWN = '#8a4a2e', HONEY = '#ffb347'

function slab(x, cx, cy, w, h, k, { bg = BONE, rot = 0, inner = null, pad = 14 } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (inner) { x.fillStyle = inner; x.fillRect(-w / 2 + pad, -h / 2 + pad, w - 2 * pad, h - 2 * pad) }
  return true
}
const txt = (x, s, X, Y, size, col = INK, font = INTER, w = 800) => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, X, Y) }
// wavy steam lines rising from (cx, cy)
function steam(x, t, cx, cy, n = 3, h = 120, col = 'rgba(239,230,214,0.8)') {
  x.fillStyle = col
  for (let i = 0; i < n; i++) for (let j = 0; j < 8; j++) { const p = ((t * 0.8 + j / 8 + i * 0.3) % 1); x.globalAlpha = Math.sin(Math.PI * p) * 0.8; x.fillRect(cx + (i - (n - 1) / 2) * 40 + Math.sin(p * 9 + i) * 10 - 5, cy - p * h, 10, 10) }
  x.globalAlpha = 1
}

const PIZZA = ['CCCCCCCCCCC', 'CYYYYYYYYYC', '.YRYYYYRYY.', '.YYYYRYYY..', '..YYYYYY...', '..YRYYYY...', '...YYYY....', '...YYY.....', '....YY.....', '....Y......']
const PIZZA_C = { C: CRUST, Y: CHEESE, R: RED }
const PAN = ['.............KK', 'PPPPPPPPPPPPPKK', 'PYYYyYYYYyYYYP.', 'PYyYYYYyYYYYyP.', 'PYYYYyYYYYyYYP.', 'PPPPPPPPPPPPPP.']
const PAN_C = { K: INK, P: '#5a5470', Y: CHEESE, y: '#ffe48a' }
const MAC = ['.MMMM.', 'MmMMmM', 'MMMMMM', 'MmMMmM', '.MMMM.']
const MAC_C = { M: '#f2c27a', m: '#ffde9a' }
const POT = ['.KKKKKKKKK.', 'KSSSSSSSSSK', 'KSsSSSSsSSK', '.KKKKKKKKK.', '.RRRRRRRRR.', 'RRRRRRRRRRR', 'RRRRRRRRRRR', '.RRRRRRRRR.']
const POT_C = { K: INK, S: '#c96a2a', s: '#e8a24a', R: '#d24d5a' }
const CAKE = ['...F...F...', '...W...W...', 'PPPPPPPPPPP', 'PwPwPwPwPwP', 'CCCCCCCCCCC', 'CCCCCCCCCCC', 'CCCCCCCCCCC']
const CAKE_C = { F: GOLD, W: '#fff', P: '#ffd23a', w: '#fff4e2', C: '#ffb34a' }
const MACARON = ['.AAAA.', 'AAAAAA', 'FFFFFF', 'AAAAAA', '.AAAA.']
const BOTTLE = ['..KK..', '..GG..', '.RRRR.', 'RRRRRR', 'RWWWWR', 'RW..WR', 'RWWWWR', 'RRRRRR', 'RRRRRR']
const BOTTLE_C = { K: INK, G: '#5fd068', R: RED, W: '#fff4e2' }
const STEAMER = ['.WWW.WWW.WWW.', 'WWWWWWWWWWWWW', 'BBBBBBBBBBBBB', 'BbBbBbBbBbBbB', 'BBBBBBBBBBBBB']
const STEAMER_C = { W: '#fff8ec', B: '#c98f2a', b: '#a8742a' }
const BOWL = ['.O.L.O.L.O.', 'LOLOLOLOLOL', 'MMMMMMMMMMM', 'BBBBBBBBBBB', '.BBBBBBBBB.', '..BBBBBBB..']
const BOWL_C = { O: '#ff8fb1', L: '#ffd23a', M: '#fff4e2', B: '#6fc3ff' }
const MUG = ['.WW.WW..', 'MMMMMM..', 'MccccMMM', 'MccccM.M', 'MccccMMM', 'MMMMMM..', '.MMMM...']
const MUG_C = { W: '#fff', M: PINK, c: BROWN }

const CAMEOS = [
  { sign: 'aries', cap: 'Pizza. | Eaten *way too hot.*', mood: lt => lt > 1.1 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.1, 1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PIZZA, PIZZA_C, 790, 900, 24 * k, { rot: 0.15 })
      if (k > 0.5) steam(x, t, 790, 760, 3, 140)
      label(x, 790, 1130, 'MOUTH: BURNT. WORTH IT.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Mac and cheese. | *The whole pan.*', mood: lt => lt > 1.4 ? 'sleepy' : 'heart', look: [1, 0], star: { x: -200 }, hops: [0.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PAN, PAN_C, 790, 960, 22 * k)
      drawBits(x, MAC, MAC_C, 760, 880, 12 * k * (1 - prog(lt, 1.0, 1.3)))
      label(x, 790, 700, 'SERVES: 1', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 38, bg: CHEESE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'NO REGRETS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04 })
    } },
  { sign: 'gemini', cap: 'A snack plate. | *A bite of everything.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : 0, 1], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 920); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 190, 120, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c98f2a'; x.beginPath(); x.ellipse(0, 0, 180, 110, 0, 0, Math.PI * 2); x.fill()
        const items = [[-110, -30, CHEESE], [-50, 30, RED], [0, -50, '#5fd068'], [60, 20, '#ff8fb1'], [110, -30, '#fff4e2'], [-120, 40, '#8a4a2e'], [20, 60, GOLD], [100, 60, LAV]]
        const n = Math.max(0, 8 - Math.floor(clamp((lt - 0.8) / 1.0) * 6))
        items.slice(0, n).forEach(([ix, iy, c]) => { x.fillStyle = INK; x.fillRect(ix - 26, iy - 22, 52, 44); x.fillStyle = c; x.fillRect(ix - 22, iy - 18, 44, 36) })
        x.restore()
      }
      label(x, 790, 700, "COULDN'T PICK.", pop01(t, P.t0 + 0.7, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, "DIDN'T HAVE TO.", pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Mom’s recipe. | *Tastes like home.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, POT, POT_C, 720, 1020, 18 * k)
      if (k > 0.5) steam(x, t, 720, 930, 3, 110)
      if (slab(x, 860, 700, 220, 170, pop01(t, P.t0 + 0.6, 0.3, 2), { bg: '#fff4e2', rot: 0.08 })) {
        txt(x, "MOM'S STEW", 0, -50, 26, RED, MONO, 700)
        x.fillStyle = '#b9b0a0'; for (let i = 0; i < 2; i++) x.fillRect(-80, -14 + i * 26, 160, 8)
        txt(x, 'love you x', 0, 56, 26, '#ff4f86', INTER, 800)
        x.restore()
      }
      hearts(x, t, 620, 940, P.t0 + 1.3, { n: 5, life: 1.6, spread: 100, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'A cake | with *their own name.*', mood: 'sparkle', star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CAKE, CAKE_C, 790, 930, 26 * k)
      if (k > 0.8) txt(x, 'LEO', 790, 980, 52, '#e23d4e', INTER, 800)
      if (lt > 0.4) { x.fillStyle = Math.floor(t * 8) % 2 ? GOLD : '#ffb34a'; x.fillRect(790 - 4 * 26 - 13, 930 - 3.5 * 26 - 6, 26, 26); x.fillRect(790 + 4 * 26 - 13, 930 - 3.5 * 26 - 6, 26, 26) }
      label(x, 790, 700, 'NOT MY BIRTHDAY', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.2, 8, 190, 0.4)
    } },
  { sign: 'virgo', cap: 'A bento box. | *Nothing touching.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 1], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      if (slab(x, 790, 900, 340, 260, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#2a2350', rot: 0 })) {
        const C = [[-80, -60, 140, 100, '#fff4e2'], [80, -60, 140, 100, '#5fd068'], [-80, 60, 140, 100, '#ff8a6b'], [80, 60, 140, 100, CHEESE]]
        C.forEach(([cx, cy, w, h, c]) => { x.fillStyle = INK; x.fillRect(cx - w / 2 - 4, cy - h / 2 - 4, w + 8, h + 8); x.fillStyle = c; x.fillRect(cx - w / 2, cy - h / 2, w, h) })
        x.restore()
      }
      label(x, 790, 690, 'ZERO OVERLAP', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.2, 7, 200, 0.2)
    } },
  { sign: 'libra', cap: 'Macarons. | *Pretty counts.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      const COLS = [['#ff9ccf', '#fff4e2'], ['#9fe0c8', '#fff4e2'], ['#c9a6ff', '#fff4e2'], ['#ffe08a', '#fff4e2'], ['#8fe3ff', '#fff4e2']]
      COLS.forEach(([a, f], i) => { const k = pop01(t, P.t0 + 0.3 + i * 0.15, 0.3, 2.2); drawBits(x, MACARON, { A: a, F: f }, 640 + (i % 3) * 140 + (i > 2 ? 70 : 0), 860 + (i > 2 ? 130 : 0), 16 * k) })
      label(x, 790, 680, 'AESTHETIC: FED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Hot sauce | on *everything.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 1], star: { x: -200 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), tip = ease.inOutCubic(prog(lt, 0.5, 0.9))
      drawBits(x, BOTTLE, BOTTLE_C, 830, 760, 18 * k, { rot: lerp(0, Math.PI * 0.8, tip) })
      if (tip > 0.9) for (let i = 0; i < 6; i++) { const p = ((t * 2 + i / 6) % 1); x.fillStyle = INK; x.fillRect(756, 830 + p * 160 - 2, 20, 24); x.fillStyle = RED; x.fillRect(760, 830 + p * 160, 12, 18) }
      if (k > 0.01) { x.fillStyle = INK; x.fillRect(640, 1030, 260, 30); x.fillStyle = '#fff4e2'; x.fillRect(646, 1034, 248, 20); x.fillStyle = RED; x.fillRect(690, 1020, 140 * clamp((lt - 0.9) / 0.8), 16) }
      label(x, 790, 1140, 'INTENSITY: MATCHED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Dumplings | from *somewhere new.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, STEAMER, STEAMER_C, 790, 960, 22 * k)
      if (k > 0.5) steam(x, t, 790, 880, 4, 140)
      label(x, 790, 680, 'NEW CITY. NEW SPOT.', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'ALREADY A REGULAR', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Leftovers. | *Labelled and dated.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        if (slab(x, 790, 1040 - i * 130, 280, 110, pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2), { bg: 'rgba(220,240,255,0.92)', rot: (i - 1) * 0.03 })) {
          x.fillStyle = ['#ff8a6b', '#5fd068', CHEESE][i]; x.fillRect(-120, -10, 240, 50)
          x.fillStyle = '#fff4e2'; x.fillRect(-80, -50, 160, 44); txt(x, ['MON', 'TUE', 'WED'][i], 0, -27, 32, INK, MONO, 700)
          x.restore()
        }
      }
      label(x, 790, 680, 'PREPPED: SUNDAY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Cereal | *for dinner.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BOWL, BOWL_C, 790, 960, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (slab(x, 790, 720, 220, 90, pop01(t, P.t0 + 0.7, 0.3, 2), { bg: '#2a2350', rot: -0.04 })) { txt(x, '8:00 PM', 0, 2, 40, GOLD, MONO, 700); x.restore() }
      label(x, 790, 1130, 'RULES: OPTIONAL', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Hot cocoa. | *Cried into it.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', tears: lt => lt > 1.4 ? 2 : 3, look: [1, 1], star: { x: -190 }, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, MUG, MUG_C, 790, 950, 24 * k)
      if (k > 0.5) steam(x, t, 760, 840, 3, 110)
      label(x, 790, 1130, 'STILL DELICIOUS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.03, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a048', key: 'F', accent: HONEY, ending: 'lesson',
  title: "Each sign's | *comfort food.*",
  cameos: CAMEOS,
  group: { cap: 'Full. | *And cozy.*', moods: ['sleepy', 'sleepy', 'happy', 'heart', 'sparkle', 'happy', 'heart', 'happy', 'sparkle', 'happy', 'wink', 'heart'] },
  lesson: { text: 'Feed yourself | like *someone you love.*', chip: 'COMFORT: SERVED' },
  last: {
    text: 'Now go | *have a snack.*',
    draw(x, t, lt) { sparkles(x, t, 540, 1050, t - lt + 0.6, 12, 360, 0.3, [HONEY, BONE, PINK]) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
