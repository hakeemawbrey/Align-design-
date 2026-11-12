// r2a0013: ADVICE ROLL CALL, "What each sign | never travels without." (~57 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order, one warm, specific travel essential each with a light visual gag. Ending: callback.
//   0.0–3.6    "Each sign never | *travels without.*"
//   3.6–49.2   ♈ running shoes (you always make the gate) · ♉ a snack bag (sharing is love) · ♊ three books (curiosity is a
//              carry-on) · ♋ their own pillow (home comes too) · ♌ a travel mirror (you glow anyway) · ♍ a packing cube
//              for every mood · ♎ seven outfits, two days · ♏ a journal with a lock · ♐ one backpack (freedom fits)
//              · ♑ printed backups (prepared is caring) · ♒ a star map (home is up there) · ♓ tissues for the window seat
//  49.2        "Pack light. | Bring *your heart.*"
//  52.6        CALLBACK: "Taurus’s snacks? | *Fed the whole row.*"  Taurus with the snack bag, everyone fed.
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CORAL = '#ff9a7a', BROWN = '#8a4a2e'

function card(x, cx, cy, w, h, col, k, rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.restore()
}
const SHOE = ['.......RRR..', '......RRWR..', 'RR...RRRRR..', 'RRRRRRRRRRR.', 'RRRRRRRRRRRR', 'WWWWWWWWWWWW']
const BAG = ['...KKKKK...', '..K.....K..', 'YYYYYYYYYYY', 'YYYRRRRRYYY', 'YYRWWWWWRYY', 'YYRWWWWWRYY', 'YYYRRRRRYYY', 'YYYYYYYYYYY', 'YYYYYYYYYYY']
const BAG_C = { K: INK, Y: '#ffd23a', R: RED, W: BONE }
const PILLOW = ['.LLLLLLLLLLLL.', 'LLLLLLLLLLLLLL', 'LLLWLLLLLLLLLL', 'LLLLLLLLLLLLLL', 'LLLLLLLLLLLLLL', 'LLLLLLLLLLLLLL', '.LLLLLLLLLLLL.']
const MIRROR = ['..GGGGG..', '.GSSSSSG.', 'GSSWSSSSG', 'GSSSWSSSG', 'GSSSSSSSG', '.GSSSSSG.', '..GGGGG..', '....G....', '....G....', '...GGG...']
const SUITCASE = ['...KKKKK...', '...K...K...', 'PPPPPPPPPPP', 'PWPPPPPPPWP', 'PPPPPPPPPPP', 'PPPPPPPPPPP', 'PWPPPPPPPWP', 'PPPPPPPPPPP', '.K.......K.']
const JOURNAL = ['PPPPPPPPPP', 'PPPPPPPPPW', 'PPPPPPPPPW', 'PPPGGGPPPW', 'PPPG.GPPPW', 'PPGGGGGPPW', 'PPGGKGGPPW', 'PPGGGGGPPW', 'PPPPPPPPPW', 'PPPPPPPPPP']
const PACK = ['..OOOOOO..', '.OOOOOOOO.', 'OOKKKKKKOO', 'OOOOOOOOOO', 'OOOYYYYOOO', 'OOOYYYYOOO', 'OOOOOOOOOO', '.OOOOOOOO.']
const TISSUE = ['..WW..', '.WWWW.', 'BBBBBB', 'BBBBBB', 'BBBBBB']
function books(x, cx, cy, k) {
  if (k <= 0.01) return
  const cols = [PINK, SKYB, GOLD]
  for (let i = 0; i < 3; i++) card(x, cx + (i - 1) * 20, cy - i * 60, 260 - i * 20, 50, cols[i], k, (i - 1) * 0.06)
}
function cubes(x, cx, cy, k) {
  if (k <= 0.01) return
  const L = [['SUNNY', GOLD], ['COZY', LAV], ['FANCY', PINK], ['JUST IN CASE', MINT]]
  L.forEach(([s, c], i) => { card(x, cx + (i % 2 ? 80 : -80), cy + Math.floor(i / 2) * 130 - 60, 150, 110, c, k) })
  x.save(); x.font = `700 20px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  if (k > 0.8) L.forEach(([s], i) => x.fillText(s === 'JUST IN CASE' ? 'JUST IN' : s, cx + (i % 2 ? 80 : -80), cy + Math.floor(i / 2) * 130 - 60))
  x.restore()
}
function starMap(x, cx, cy, k, t) {
  if (k <= 0.01) return
  card(x, cx, cy, 300, 300, '#1c2a5a', k, 0.04)
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  const P = [[-100, -80], [-40, -100], [20, -50], [80, -90], [60, 20], [-20, 60], [-90, 40]]
  x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 4; x.beginPath(); P.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.stroke()
  P.forEach(([a, b], i) => { const s = 9 + 3 * Math.sin(t * 4 + i); x.fillStyle = GOLD; x.fillRect(a - s / 2, b - s / 2, s, s) })
  x.restore()
}
function tickets(x, cx, cy, k) {
  if (k <= 0.01) return
  for (let i = 0; i < 3; i++) {
    card(x, cx + i * 14, cy - i * 30, 280, 130, i === 2 ? BONE : '#d8cfe6', k, -0.05 + i * 0.03)
  }
  if (k > 0.8) { x.save(); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillText('BOARDING', cx + 28, cy - 70); x.fillStyle = '#9aa5c4'; x.fillRect(cx - 80, cy - 46, 200, 10); x.fillRect(cx - 80, cy - 26, 140, 10); x.restore() }
}

const st = { x: -210 }
const CAMEOS = [
  { sign: 'aries', cap: 'Running shoes. | You *always make it.*', mood: 'sparkle', look: [1, 0], star: st, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      drawBits(x, SHOE, { R: RED, W: BONE }, 790, 940, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 720, 'GATE CLOSES: 2 MIN', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 30, bg: BONE, font: MONO, weight: 700 })
      label(x, 790, 1110, 'MADE IT', pop01(t, P.t0 + 1.5, 0.3, 2.6), { size: 40, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'A snack bag. | Sharing is *love.*', mood: 'heart', look: [1, 0], star: st,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BAG, BAG_C, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1130, 'FOR: EVERYONE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Three books. | *Curiosity* is a carry-on.', mood: 'sparkle', look: [1, 0], star: st,
    front(x, t, lt, P) {
      books(x, 790, 960, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 700, 'chapter one ×3', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: GOLD, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Their own pillow. | *Home comes too.*', mood: 'sleepy', look: [1, 0], star: { x: -60, y: 20 },
    back(x, t, lt, P) { drawBits(x, PILLOW, { L: SKYB, W: BONE }, 640, 940, 30 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 780, 660, 'HOME, PORTABLE', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: SKYB, font: MONO, weight: 700 })
      hearts(x, t, 820, 880, P.t0 + 1.3, { n: 3, life: 1.4, spread: 100, cell: 6, seed: 3 })
    } },
  { sign: 'leo', cap: 'A travel mirror. | You *glow* anyway.', mood: lt => lt > 1.1 ? 'wink' : 'sparkle', look: [1, 0], star: st,
    front(x, t, lt, P) {
      drawBits(x, MIRROR, { G: GOLD, S: '#bfe9ff', W: '#ffffff' }, 790, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 790, 820, P.t0 + 0.9, 8, 160, 0.1)
      label(x, 790, 1130, 'STILL GORGEOUS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'A packing cube | for *every mood.*', mood: 'happy', look: [1, 0], star: st,
    front(x, t, lt, P) {
      cubes(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1120, 'ORGANISED = CALM', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Seven outfits. Two days. | *Options are joy.*', mood: 'heart', look: [1, 0], star: st,
    front(x, t, lt, P) {
      drawBits(x, SUITCASE, { K: INK, P: PINK, W: BONE }, 790, 980, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const cols = [GOLD, SKYB, MINT, LAV, CORAL, BONE, RED]
      for (let i = 0; i < 7; i++) { const p = ease.outCubic(prog(lt, 0.5 + i * 0.08, 1.0 + i * 0.08)); if (p > 0) card(x, 790 + Math.cos(-Math.PI * (0.2 + i * 0.1)) * 150 * p, 960 + Math.sin(-Math.PI * (0.2 + i * 0.1)) * 200 * p, 70, 80, cols[i], p, i * 0.3) }
    } },
  { sign: 'scorpio', cap: 'A journal with a lock. | *Your story’s safe.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: st,
    front(x, t, lt, P) {
      drawBits(x, JOURNAL, { P: '#9b5bd6', W: BONE, G: GOLD, K: INK }, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 790, 1120, 'PRIVATE. PRECIOUS.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: LAV, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Just one backpack. | *Freedom fits.*', mood: 'sparkle', look: [1, 0], star: st, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      drawBits(x, PACK, { O: '#ff9a4a', K: INK, Y: GOLD }, 790, 900, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'PACKED IN 5 MIN', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: BONE, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Printed backups. | Prepared is *caring.*', mood: 'happy', look: [1, 0], star: st,
    front(x, t, lt, P) {
      tickets(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, 'COPIES: 3', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'A star map. | Home is *up there.*', mood: 'sparkle', look: [1, -1], star: st,
    front(x, t, lt, P) {
      starMap(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), t)
      label(x, 790, 1100, 'NEVER LOST', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: SKYB, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Window-seat tissues. | *Feel it all.*', mood: 'heart', tears: 2, look: [1, 0], star: st,
    front(x, t, lt, P) {
      drawBits(x, TISSUE, { W: '#fff4e2', B: SKYB }, 790, 960, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      card(x, 790, 730, 220, 170, '#8fe3ff', pop01(t, P.t0 + 0.4, 0.3, 2))
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      if (k > 0.8) { x.fillStyle = BONE; x.beginPath(); x.ellipse(760, 740, 60, 22, 0, 0, Math.PI * 2); x.fill(); x.beginPath(); x.ellipse(820, 720, 44, 18, 0, 0, Math.PI * 2); x.fill() }
      label(x, 790, 1130, 'CLOUDS: BEAUTIFUL', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: LAV, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0013', key: 'C', accent: CORAL, ending: 'callback',
  title: 'Each sign never | *travels without.*',
  cameos: CAMEOS,
  group: { cap: 'Pack light. | Bring *your heart.*' },
  last: {
    text: 'Taurus’s snacks? | *Fed the whole row.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 380, 1080, 250 * k, { mood: lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], seed: 40, hops: [t - lt + 1.2] })
      drawBits(x, BAG, BAG_C, 700, 1080, 20 * pop01(t, t - lt + 0.7, 0.35, 2))
      for (let i = 0; i < 4; i++) { const p = pop01(t, t - lt + 1.2 + i * 0.12, 0.3, 2); if (p > 0.01) signChar(x, t, ['gemini', 'leo', 'libra', 'pisces'][i], 270 + i * 180, 1350, 110 * p, { mood: 'heart', seed: 50 + i, glyph: false, tears: i === 3 ? 2 : 0 }) }
      hearts(x, t, 540, 1000, t - lt + 1.5, { n: 6, life: 1.6, spread: 400, cell: 6, seed: 9 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
