// v3t102: THE SIGNS AS… v3, SOLO film, "Tauruses in love | be like." (~43 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through: nine love situations, each the most extreme (and lovable) Taurus version. Ending: group.
//   0.0–3.6    "Tauruses in love | *be like.*"
//   3.6–37.8   nine cards: first-date gift, a whole lasagna · fell in love in month seven · shared their blanket = proposal
//              · checked compatibility, then your snack drawer · date night: staying in, forever · learned your coffee
//              order, grew the beans · one hug, hour three · matching robes, monogrammed · "breakup" not in their dictionary
//  37.8        "Slow to fall. | *Never leaves.*"  (the group beat is the ending)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#5fd068', TAN = '#e9b24a'

const LASAGNA = [
  'KKKKKKKKKKKKKKKK',
  'KRYRRYRRRYRRYRRK',
  'KYYYYYYYYYYYYYYK',
  'KRRRRRRRRRRRRRRK',
  'KWWWWWWWWWWWWWWK',
  'KRRRRRRRRRRRRRRK',
  'KYYYYYYYYYYYYYYK',
  '.KKKKKKKKKKKKKK.',
]
const LASAGNA_C = { K: '#c9c9d8', R: '#d8503a', Y: '#ffd76a', W: '#fff4e2' }
const STEAM = ['.W..W.', 'W..W..', '.W..W.', '..W..W']
const BLANKET = [
  'PPPPPPPPPPPPPP',
  'PWPPWPPWPPWPPW',
  'PPPPPPPPPPPPPP',
  'PPWPPWPPWPPWPP',
  'PPPPPPPPPPPPPP',
  'PWPPWPPWPPWPPW',
  'PPPPPPPPPPPPPP',
]
const BLANKET_C = { P: PINK, W: '#fff4e2' }
const DRAWER = [
  'BBBBBBBBBBBBBB',
  'BCCYYGGCCYYRRB',
  'BCCYYGGCCYYRRB',
  'BBBBBBBBBBBBBB',
  'BbbbbbKKbbbbbB',
  'BBBBBBBBBBBBBB',
]
const DRAWER_C = { B: BROWN, b: '#a8603e', K: INK, C: '#c98f6a', Y: '#ffd23a', G: GREEN, R: RED }
const PLANT = [
  '.L.R.L.R.',
  'LLLLLLLLL',
  '.LRLLLRL.',
  '...LLL...',
  '....L....',
  'TTTTTTTTT',
  '.TTTTTTT.',
  '.TTTTTTT.',
]
const PLANT_C = { L: GREEN, R: '#a8452e', T: '#e8865a' }
const CUP = [
  '.WWWWW..',
  'WBBBBBWW',
  'WBBBBBW.W',
  'WWWWWWWW',
  '.WWWWW..',
]
const CUP_C = { W: '#fff4e2', B: '#6b3a22' }
const ROBE = [
  '..PP..PP..',
  '.PPPPPPPP.',
  'PPPPWWPPPP',
  'PPPWPPWPPP',
  'PP.PPPP.PP',
  'PP.PPPP.PP',
  '...PPPP...',
  '...PPPP...',
  '...PPPP...',
]

// a wall calendar flipping through the months; on month seven, a heart
function months(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const m = Math.min(7, 1 + Math.floor(clamp((lt - 0.3) / 1.3) * 7))
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-120, -130, 256, 280)
  x.fillStyle = INK; x.fillRect(-132, -144, 264, 288)
  x.fillStyle = '#fff4e2'; x.fillRect(-124, -136, 248, 272)
  x.fillStyle = RED; x.fillRect(-124, -136, 248, 64)
  x.fillStyle = '#fff4e2'; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MONTH', 0, -104)
  x.fillStyle = INK; x.font = `800 120px ${INTER}`; x.fillText(String(m), 0, 20)
  if (m === 7) { x.restore(); hearts && drawHeartBig(x, cx, cy + 150 * k); return }
  x.restore()
}
function drawHeartBig(x, cx, cy) {
  drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86', W: '#fff' }, cx, cy, 9)
}
// a door with a hanger sign
function door(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-126, -236, 252, 472)
  x.fillStyle = BROWN; x.fillRect(-118, -228, 236, 464)
  x.fillStyle = '#a8603e'; x.fillRect(-96, -200, 192, 160); x.fillRect(-96, 0, 192, 200)
  x.fillStyle = GOLD; x.fillRect(80, -10, 20, 20)
  x.restore()
}

const CAMEOS = [
  { sign: 'taurus', cap: 'First date gift: | a *whole lasagna.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      drawBits(x, LASAGNA, LASAGNA_C, 790, 920, 20 * k)
      bubble(x, 790, 640, 'made it | for us', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1110, 'SERVES: 12', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Fell in love. | In *month seven.*', mood: lt => lt > 1.6 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -180 }, hops: [1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      months(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1130, 'NO RUSH ✦', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04 })
      hearts(x, t, 360, 760, P.t0 + 2.0, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 5 })
    } },
  { sign: 'taurus', cap: 'Shared their blanket. | That’s *a proposal.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -40, y: -80 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, BLANKET, BLANKET_C, 540, 1060, 30 * k, { rot: -0.03 })
      label(x, 770, 630, 'BASICALLY ENGAGED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.05 })
      sparkles(x, t, 500, 840, P.t0 + 1.2, 7, 200, 0.3)
    } },
  { sign: 'taurus', cap: 'Checked compatibility. | Then *your snack drawer.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      label(x, 790, 650, '♉︎ + YOU: ✓', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
      drawBits(x, DRAWER, DRAWER_C, 790, 880, 22 * pop01(t, P.t0 + 0.8, 0.35, 2))
      label(x, 790, 1080, 'DRAWER: APPROVED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04 })
    } },
  { sign: 'taurus', cap: 'Date night idea: | staying in. *Forever.*', mood: 'sleepy', star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      door(x, 790, 880, k)
      label(x, 790, 760, 'DO NOT | DISTURB'.replace(' | ', ' '), pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.08, font: MONO, weight: 700 })
      label(x, 790, 1000, 'UNTIL 2031', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: RED, color: '#fff4e2', rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Learned your coffee order. | *Grew the beans.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const g = ease.outBack(prog(lt, 0.3, 1.1))
      drawBits(x, PLANT, PLANT_C, 820, 920 - 40 * g, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: 0.6 + 0.4 * g })
      drawBits(x, CUP, CUP_C, 640, 1080, 14 * pop01(t, P.t0 + 1.2, 0.3, 2))
      label(x, 800, 640, 'HARVEST: DAY 300', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 860, 1110, 'oat milk?', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'You hugged them once. | *Still going.*', mood: 'heart', star: { x: -150 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 760, 900, 260 * k, { mood: lt > 1.3 ? 'sleepy' : 'happy', look: [-1, 0], seed: 19, glyph: false })
      x.save(); x.globalAlpha = clamp(k); x.fillStyle = TAN; x.fillRect(470, 910, 240, 30); x.fillStyle = INK; x.fillRect(470, 906, 240, 6); x.restore()
      const h = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 2.99)
      label(x, 560, 620, `HUG: HOUR ${h}`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 1150, P.t0 + 0.7, { n: 6, life: 2.0, spread: 260, cell: 7, seed: 8 })
    } },
  { sign: 'taurus', cap: 'Bought matching robes. | *Monogrammed.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, ROBE, { P: PINK, W: '#fff4e2' }, 690, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.06 })
      drawBits(x, ROBE, { P: '#8fe3ff', W: '#fff4e2' }, 860, 900, 20 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.06 })
      label(x, 790, 640, 'HIS · HERS · OURS', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'EST. DATE TWO', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'taurus', cap: '“Breakup”? | Not in *their dictionary.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.03); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -190, 340, 380)
        x.fillStyle = '#fff4e2'; x.fillRect(-162, -182, 160, 364); x.fillRect(2, -182, 160, 364)
        x.fillStyle = INK; x.font = `800 22px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
        const L = ['brunch', 'bubble', 'bud', 'buddy'], R = ['bunny', 'burrito', 'butter', 'buttons']
        L.forEach((w, i) => { x.fillText(w, -146, -140 + i * 74); x.fillStyle = '#c9c9d8'; x.fillRect(-146, -116 + i * 74, 120, 8); x.fillStyle = INK })
        R.forEach((w, i) => { x.fillText(w, 18, -140 + i * 74); x.fillStyle = '#c9c9d8'; x.fillRect(18, -116 + i * 74, 120, 8); x.fillStyle = INK })
        x.restore()
      }
      label(x, 790, 1110, 'BREAKUP: NOT FOUND', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: RED, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 380, 760, P.t0 + 1.5, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'v3t102', key: 'D', accent: TAN, solo: 'taurus', ending: 'group',
  title: 'Tauruses in love | *be like.*',
  cameos: CAMEOS,
  card: { a: 'taurus', b: 'aquarius', chip: 'ALIGNED' },
  group: { cap: 'Slow to fall. | *Never leaves.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
