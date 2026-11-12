// v3t060: THE SIGNS AS… v3, "The signs at | holiday dinner." (~57 s vertical, signs3kit social cut, music: lofi · G)
//   0.0–3.6    "The signs at | *holiday dinner.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one holiday dinner per sign (3.8 s each), each pushed to the extreme:
//              ♈ carved the roast before anyone sat · ♉ fourth plate, took the leftovers · ♊ hosted a talk show at the kids' table
//              · ♋ cooked nine dishes, apologised for each · ♌ gave a toast with an intermission · ♍ straightened every fork
//              · ♎ three outfits, one per course · ♏ knows who brought the shop-bought pie · ♐ brought a friend they met this morning
//              · ♑ already planning next year's dinner · ♒ brought a dish nobody can name · ♓ grandma said "eat up", Pisces wept
//  49.2        "Full plates. | *Fuller hearts.*"
//  52.6        callback: "The leftovers? | *Taurus has them.*"  Taurus returns behind a tower of tubs.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', CRAN = '#ff7a5a', GREEN = '#5fd068', BROWN = '#8a4a2e'

const ROAST = [
  '...BBBBB...',
  '.BBBbBBBBB.',
  'BBbBBBBbBBB',
  'BBBBBBBBBBB',
  'SSSSSSSSSSS',
  '.SSSSSSSSS.',
]
const ROAST_C = { B: '#c97a3a', b: '#e0a050', S: '#c9c9d8' }
const PLATE = [
  '.WWWWWW.',
  'WWGGOOWW',
  'WGGBBOOW',
  'WWBBBBWW',
  '.WWWWWW.',
]
const PLATE_C = { W: '#fff4e2', G: GREEN, O: ORANGE, B: '#c97a3a' }
const TUB = [
  'LLLLLLLL',
  'TTTTTTTT',
  'TFFFFFFT',
  'TFFFFFFT',
  'TTTTTTTT',
]
const TUB_C = { L: SKYB, T: '#e8eaf6', F: '#e0a050' }
const FORK = [
  'S.S.S',
  'S.S.S',
  'SSSSS',
  '..S..',
  '..S..',
  '..S..',
  '..S..',
  '..S..',
]
const PIE = [
  '..CCCCCC..',
  '.CcCcCcCcC.',
  'CCCCCCCCCCC',
  'PPPPPPPPPPP',
  '.TTTTTTTTT.',
]
const PIE_C = { C: '#e0a050', c: '#b8742e', P: '#c24a6a', T: '#c9c9d8' }
const BLOB = [
  '...GGGG...',
  '.GGgGGPGG.',
  'GGPGGGGgGG',
  'GgGGOGGGPG',
  'SSSSSSSSSS',
]
const BLOB_C = { G: '#7ad6a0', g: '#4fb07a', P: PINK, O: ORANGE, S: '#c9c9d8' }
const DRESS = [
  '..DDD..',
  '.DDDDD.',
  '..DDD..',
  '.DDDDD.',
  'DDDDDDD',
  'DDDDDDD',
]
const MIC = [
  '.GGGG.',
  'GgGGgG',
  'GGgGGG',
  '.GGGG.',
  '..KK..',
  '..KK..',
  '..KK..',
]

function sheet(x, cx, cy, k, title, rows, n, { rot = 0.04 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -170, 340, 340)
  x.fillStyle = '#fff4e2'; x.fillRect(-162, -162, 324, 324)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -128)
  x.font = `700 26px ${MONO}`; x.fillStyle = '#2a2350'; x.textAlign = 'left'
  rows.slice(0, n).forEach((r, i) => x.fillText(r, -136, -70 + i * 54))
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Carved the roast | *before anyone sat.*', mood: lt => lt > 1.1 ? 'sparkle' : 'squint', star: { x: -180 }, hops: [0.4, 0.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, ROAST, ROAST_C, 790, 920, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'CHAIRS: EMPTY', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 0.6, 6, 150, 0.2)
    } },
  { sign: 'taurus', cap: 'Fourth plate. | *Took the leftovers.*', mood: lt => lt > 1.4 ? 'sleepy' : 'heart', star: { x: -180 },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, PLATE, PLATE_C, 790, 1060 - i * 50, 22 * pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2))
      label(x, 790, 680, 'PLATE 4', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Hosted a talk show | at *the kids’ table.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', star: { x: -180 }, hops: [0.8],
    front(x, t, lt, P) {
      drawBits(x, MIC, { G: '#c9c9d8', g: '#8a8aa0', K: '#2a2350' }, 560, 940, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.3 })
      ;['aries', 'leo', 'pisces'].forEach((id, i) => { const k = pop01(t, P.t0 + 0.5 + i * 0.2, 0.3, 2); if (k > 0.01) signChar(x, t, id, 700 + i * 110, 1000 - (i % 2) * 40, 100 * k, { mood: id === 'pisces' ? 'wide' : 'happy', look: [-1, 0], seed: 30 + i, glyph: false, tears: id === 'pisces' ? 1 : 0 }) })
      label(x, 800, 680, '● LIVE', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 38, bg: RED, color: '#fff4e2', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Cooked nine dishes. | *Apologised for each.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) drawBits(x, PLATE, PLATE_C, 680 + (i % 3) * 110, 820 + Math.floor(i / 3) * 110, 13 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2))
      bubble(x, 790, 640, 'sorry, it’s dry', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, col: SKYB, tail: 'bl' })
      label(x, 790, 1110, 'IT WAS PERFECT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'leo', cap: 'Gave a toast. | It had *an intermission.*', mood: 'sparkle', star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      label(x, 790, 760, 'ACT ONE', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 920, 'INTERMISSION', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 840, P.t0 + 1.2, 7, 170, 0.5)
    } },
  { sign: 'virgo', cap: 'Straightened every fork. | *At every seat.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const fix = ease.outCubic(prog(lt, 0.5, 1.4))
      for (let i = 0; i < 4; i++) drawBits(x, FORK, { S: '#d8dbe8' }, 650 + i * 90, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp([0.4, -0.3, 0.25, -0.5][i], 0, fix) })
      label(x, 790, 1110, 'ALIGNED: 0.0°', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Three outfits. | *One per course.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      ;[PINK, LAV, GOLD].forEach((c, i) => drawBits(x, DRESS, { D: c }, 670 + i * 120, 880, 24 * pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2)))
      ;['SOUP', 'MAIN', 'PIE'].forEach((s, i) => label(x, 670 + i * 120, 1040, s, pop01(t, P.t0 + 0.5 + i * 0.35, 0.3, 2.2), { size: 26, bg: BONE, rot: (i - 1) * 0.06, font: MONO, weight: 700 }))
    } },
  { sign: 'scorpio', cap: 'Knows whose pie | was *shop-bought.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, PIE, PIE_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, '“HOMEMADE”', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 36, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'your secret’s safe', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, col: '#ff8a9a', tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Brought a friend. | *Met them this morning.*', mood: 'sparkle', star: { x: -180 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 810, 920, 200 * k, { mood: 'happy', look: [-1, 0], seed: 27, glyph: false })
      label(x, 810, 680, 'FRIEND (NEW)', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1130, 'met at the bus stop!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 30, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Mid-dinner. Already | planning *next year’s.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200, s: 270 },
    front(x, t, lt, P) { sheet(x, 780, 850, pop01(t, P.t0 + 0.2, 0.3, 2), 'NEXT YEAR', ['· book hall', '· bigger roast', '· seat Aries', '  far away'], 1 + Math.floor(clamp((lt - 0.3) / 1.3) * 4)) } },
  { sign: 'aquarius', cap: 'Brought a dish | *nobody can name.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, BLOB, BLOB_C, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'IT’S… ???', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 38, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'it’s a vibe', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Grandma said “eat up.” | *Pisces wept.*', mood: lt => lt < 0.9 ? 'happy' : 'heart', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 820, 920, 190 * k, { mood: 'happy', look: [-1, 0], seed: 28, glyph: false })
      label(x, 820, 690, 'GRANDMA', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1130, 'eat up, dear', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, col: PINK, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'v3t060', key: 'G', accent: CRAN, ending: 'callback',
  title: 'The signs at | *holiday dinner.*',
  cameos: CAMEOS,
  group: { cap: 'Full plates. | *Fuller hearts.*' },
  last: {
    text: 'The leftovers? | *Taurus has them.*',
    draw(x, t, lt) {
      const t0 = t - lt
      for (let i = 0; i < 5; i++) drawBits(x, TUB, TUB_C, 700, 1300 - i * 90, 34 * pop01(t, t0 + 0.4 + i * 0.2, 0.3, 2))
      const k = pop01(t, t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 380, 1130, 330 * k, { mood: lt > 1.6 ? 'heart' : 'happy', look: [1, 0], seed: 9, glyph: false, hops: [t0 + 1.6] })
      hearts(x, t, 520, 900, t0 + 1.6, { n: 5, life: 1.8, spread: 300, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
