// r2t0341: star_talk, ROLLCALL, "The signs | at a pie contest." (~56 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order, each the most extreme version of itself at a pie-baking contest.
//   0.0–3.6    "The signs at | a *pie contest.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one card per sign (3.8 s each):
//              ♈ done in four minutes, still frozen · ♉ judged their own pie, ate the evidence · ♊ one pie, six flavours
//              · ♋ wrote "home" in the crust · ♌ put their own face on the pie · ♍ cut the slices with a protractor
//              · ♎ the prettiest lattice ever, forgot the filling · ♏ the secret ingredient is in a locked box
//              · ♐ got bored mid-bake, gone hiking · ♑ sold forty slices before judging · ♒ the pie is square
//              · ♓ second place, sobbing with joy
//  49.2        "Twelve pies. | *Zero slices left.*"  The twelve fly up into a group photo.
//  52.6        callback: "Taurus judged | *the other pies too.*" (the empty tin, paid off: now a stack of them).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CRUST = '#e8a24a', CRUST_L = '#ffd38a', TIN = '#9aa5c4', PAPER = '#fff4e2', WOOD = '#8a4a2e'

// ── props
const PIE = [
  '.....CCCCC.....',
  '...CCLCCCLCC...',
  '.CCFCCLCLCCFCC.',
  'CCLCCFCCCFCCLCC',
  'TTTTTTTTTTTTTTT',
  '.TTTTTTTTTTTTT.',
  '..TTTTTTTTTTT..',
]
const pieC = (fill, crust = CRUST) => ({ C: crust, L: CRUST_L, F: fill, T: TIN })
const TINE = [                          // an empty pie tin with a few crumbs
  '...............',
  '...............',
  '.....c...c.....',
  'TT..c..c....cTT',
  'TTTTTTTTTTTTTTT',
  '.TTTTTTTTTTTTT.',
  '..TTTTTTTTTTT..',
]
const TINE_C = { T: TIN, c: CRUST }
const LOCKBOX = [
  '....KKKKK....',
  '...KK...KK...',
  '...K.....K...',
  '...K.....K...',
  'WWWWWWWWWWWWW',
  'WBBBBBBBBBBBW',
  'WBBBBYYYBBBBW',
  'WBBBBYKYBBBBW',
  'WBBBBBYBBBBBW',
  'WBBBBBBBBBBBW',
  'WWWWWWWWWWWWW',
]
const LOCKBOX_C = { K: '#c9c2e6', W: INK, B: WOOD, Y: GOLD }
const BOOT = [
  '..BBBB....',
  '..BBBB....',
  '..BBBB....',
  '..BBBBB...',
  '.BBBBBBBB.',
  'BBBBBBBBBB',
  'KKKKKKKKKK',
]
const BOOT_C = { B: WOOD, K: INK }
const RIBBON = [
  '..RRRRRRR..',
  '.RRRRRRRRR.',
  'RRRWWWWWRRR',
  'RRWWWWWWWRR',
  'RRWWWWWWWRR',
  'RRRWWWWWRRR',
  '.RRRRRRRRR.',
  '..RRRRRRR..',
  '...RR.RR...',
  '..RRR.RRR..',
  '..RR...RR..',
]
const RIBBON_C = { R: '#6fc3ff', W: PAPER }

/** the pie as a disc seen from above, cut into n coloured slices (gemini) or n ruled slices (virgo) */
function topPie(x, cx, cy, r, k, cols, { lines = false, t = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 10, 0, Math.PI * 2); x.fill()
  x.fillStyle = CRUST; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  const n = cols.length
  for (let i = 0; i < n; i++) {
    x.fillStyle = cols[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r * 0.82, (i / n) * Math.PI * 2, ((i + 1) / n) * Math.PI * 2); x.closePath(); x.fill()
  }
  if (lines) {
    x.strokeStyle = INK; x.lineWidth = 5
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * r, Math.sin(a) * r); x.stroke() }
  }
  x.restore()
}
/** a protractor: a bone half-disc with ticks */
function protractor(x, cx, cy, r, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 6, Math.PI, 0); x.closePath(); x.fill()
  x.fillStyle = 'rgba(143,227,255,0.85)'; x.beginPath(); x.arc(0, 0, r, Math.PI, 0); x.closePath(); x.fill()
  x.strokeStyle = INK; x.lineWidth = 3
  for (let i = 0; i <= 12; i++) { const a = Math.PI + (i / 12) * Math.PI; x.beginPath(); x.moveTo(Math.cos(a) * r, Math.sin(a) * r); x.lineTo(Math.cos(a) * r * (i % 3 ? 0.88 : 0.78), Math.sin(a) * r * (i % 3 ? 0.88 : 0.78)); x.stroke() }
  x.restore()
}
/** a lattice pie cut open: one slice lifted out shows it's hollow */
function hollowPie(x, cx, cy, cell, k, lift) {
  if (k <= 0.01) return
  const LAT = [
    '.....CCCCC.....',
    '...CLCLCLCLC...',
    '.CLCLCLCLC.....',
    'CLCLCLCLCL.....',
    'TTTTTTTTTT.....',
    '.TTTTTTTTT.....',
    '..TTTTTTTT.....',
  ]
  drawBits(x, LAT, { C: CRUST, L: CRUST_L, T: TIN }, cx, cy, cell * k)
  // the gap where the slice was: dark and empty
  const SL = ['CLC', 'LCL', 'CLC', 'TTT']
  drawBits(x, SL, { C: CRUST, L: CRUST_L, T: TIN }, cx + cell * 5.5 * k + 30, cy - lift * 170 - 10, cell * k * 1.1, { rot: 0.25 * lift })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Done in four minutes. | Still *frozen.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: { x: -160 }, hops: [0.4, 0.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      drawBits(x, PIE, pieC('#bfe9ff', '#dff4ff'), 780, 1010, 22 * k)
      if (lt > 1.0) { x.save(); x.globalAlpha = 0.7 * clamp((lt - 1.0) / 0.3); for (let i = 0; i < 4; i++) drawBits(x, ['.W.', 'WWW', '.W.'], { W: '#ffffff' }, 640 + i * 90, 920 - 20 * Math.sin(t * 3 + i), 8, { outline: null }); x.restore() }
      label(x, 790, 820, 'DONE! (FROZEN)', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.05 })
      bubble(x, 780, 640, 'first!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 52, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Judged their own pie. | Ate *the evidence.*', mood: lt => lt > 1.6 ? 'sleepy' : 'happy', star: { x: -160 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (lt < 1.2) drawBits(x, PIE, pieC('#7a2c4a'), 790, 1040, 22 * k)
      else drawBits(x, TINE, TINE_C, 790, 1040, 22)
    },
    front(x, t, lt, P) {
      label(x, 790, 860, 'JUDGE: ME', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 40, bg: GOLD, rot: -0.05 })
      label(x, 790, 660, 'SCORE: 10/10', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Entered one pie. | It’s *six flavours.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      topPie(x, 790, 860, 150, pop01(t, P.t0 + 0.25, 0.35, 2), ['#e23d4e', '#5fd068', '#ffd23a', '#c97bff', '#ff8fb1', '#6fc3ff'])
      bubble(x, 790, 640, 'can’t pick!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Wrote “home” | *in the crust.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      drawBits(x, PIE, pieC('#e23d4e'), 790, 940, 26 * k)
      if (k > 0.9) { x.save(); x.fillStyle = INK; x.font = `800 54px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.globalAlpha = clamp((lt - 0.7) / 0.3); x.fillText('HOME', 790, 900); x.restore() }
      hearts(x, t, 790, 860, P.t0 + 1.3, { n: 5, life: 1.8, spread: 180, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Put their own face | *on the pie.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      drawBits(x, PIE, pieC('#ffb34a'), 790, 1060, 24 * k)
      const f = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (f > 0.01) signChar(x, t, 'leo', 790, 960, 150 * f, { mood: 'sparkle', seed: 31, glyph: false })
      label(x, 790, 660, 'BEST PIE: ME', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.05 })
    } },
  { sign: 'virgo', cap: 'Cut the slices | with *a protractor.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      topPie(x, 790, 900, 140, pop01(t, P.t0 + 0.2, 0.35, 2), ['#e23d4e', '#e23d4e', '#e23d4e', '#e23d4e', '#e23d4e', '#e23d4e', '#e23d4e', '#e23d4e'], { lines: lt > 1.0 })
      protractor(x, 790, 780, 120, pop01(t, P.t0 + 0.6, 0.3, 2), -0.1 + 0.08 * Math.sin(t * 2))
      label(x, 790, 1110, 'EACH: 45.000°', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Gorgeous lattice. | *Forgot the filling.*', mood: lt => lt > 1.5 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      hollowPie(x, 730, 1010, 26, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 0.9, 1.3)))
      bubble(x, 760, 680, 'oh no. | it’s empty.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Secret ingredient? | *Locked away.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, LOCKBOX, LOCKBOX_C, 790, 960, 20 * pop01(t, P.t0 + 0.25, 0.3, 2))
      bubble(x, 790, 680, 'nice try.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 52, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Got bored mid-bake. | *Went hiking.*', mood: 'sparkle', star: { x: 160 }, hops: [0.6, 1.3],
    back(x, t, lt, P) {
      drawBits(x, PIE, pieC('#e23d4e'), 300, 1080, 16 * pop01(t, P.t0 + 0.15, 0.3, 2))
    },
    front(x, t, lt, P) {
      drawBits(x, BOOT, BOOT_C, 760, 1110, 16 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 320, 700, 'BACK IN 3 DAYS', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.06 })
      bubble(x, 300, 900, 'pie can wait!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Sold forty slices | *before judging.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      drawBits(x, PIE, pieC('#8a4a2e'), 310, 1050, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const n = Math.min(40, Math.max(0, Math.floor((lt - 0.4) * 30)))
      label(x, 310, 860, `SOLD: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 44, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      label(x, 320, 680, '$4 A SLICE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'aquarius', cap: 'Baked a pie. | It’s *square.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 920); x.rotate(0.06); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-140, -140, 280, 280)
        x.fillStyle = CRUST; x.fillRect(-130, -130, 260, 260)
        x.fillStyle = '#6fc3ff'; x.fillRect(-100, -100, 200, 200)
        x.fillStyle = CRUST_L; for (let i = 0; i < 4; i++) { x.fillRect(-100 + i * 56, -100, 18, 200); x.fillRect(-100, -100 + i * 56, 200, 18) }
        x.restore()
      }
      bubble(x, 790, 640, 'pies were | too round.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Second place. | *Sobbing* with joy.', mood: lt => lt < 0.9 ? 'sparkle' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      drawBits(x, RIBBON, RIBBON_C, 800, 940, 28 * k)
      if (k > 0.5) { x.save(); x.fillStyle = INK; x.font = `800 52px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('2ND', 800, 884); x.restore() }
      hearts(x, t, 800, 760, P.t0 + 1.0, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2t0341', key: 'C', accent: CRUST, ending: 'callback',
  title: 'The signs at | a *pie contest.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve pies. | *Zero slices left.*' },
  last: {
    text: 'Taurus judged | *the other pies too.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 420, 1130, 300 * k, { mood: lt > 1.5 ? 'sleepy' : 'happy', look: [1, 0], seed: 12, hops: [t - lt + 1.3] })
      for (let i = 0; i < 5; i++) drawBits(x, TINE, TINE_C, 700 + (i % 2 ? 14 : -14), 1240 - i * 64, 18 * pop01(t, t - lt + 0.6 + i * 0.15, 0.3, 2), { rot: 0.04 * (i % 2 ? 1 : -1) })
      label(x, 700, 880, 'ALL: 10/10', pop01(t, t - lt + 1.6, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
