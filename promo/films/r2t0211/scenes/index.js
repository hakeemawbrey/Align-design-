// r2t0211: star_talk, SOLO, "Cancers on a trip | be like." (~42 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards), each the most extreme homebody-on-holiday Cancer.
//   0.0–3.6    "Cancers on a trip | *be like.*"  One big Cancer pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              packed for a weekend, a whole house pops out of the suitcase · homesick at the end of the driveway
//              · snacks for the whole plane · unpacked and decorated the hotel room · called mom at every stop
//              · a nice sunset, fountains of tears · souvenirs for everyone they ever met (one for the match)
//              · made a friend at check-in, adopted them · best part of the trip: coming home
//  37.8        ending 'group': "Left the house. | *Brought the house.*"  Cancer comes back, big (pays off card one).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PEARL = '#cfe8ff', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', ORANGE = '#ffb34a'
const S = 'cancer'

// ── props
const SUITCASE = [
  '....KKKKKK....',
  '....K....K....',
  'BBBBBBBBBBBBBB',
  'BbBBBBBBBBBBbB',
  'BBBBBBBBBBBBBB',
  'BBBBBBYYBBBBBB',
  'BBBBBBBBBBBBBB',
  'BbBBBBBBBBBBbB',
  'BBBBBBBBBBBBBB',
  'BBBBBBBBBBBBBB',
  '.WW........WW.',
]
const SUITCASE_C = { K: '#2a2350', B: '#4fb3a6', b: '#2f7f75', Y: GOLD, W: '#2a2350' }
const HOUSE = [
  '.......C.....',
  '......RRR.C..',
  '.....RRRRRC..',
  '....RRRRRRR..',
  '...RRRRRRRRR.',
  '..RRRRRRRRRRR',
  '...WWWWWWWWW.',
  '...WBBWWWBBW.',
  '...WBBWWWBBW.',
  '...WWWWDDWWW.',
  '...WWWWDDWWW.',
  '...WWWWDDWWW.',
]
const HOUSE_C = { R: RED, C: '#8a8aa0', W: CREAM, B: SKYB, D: '#8a4a2e' }
const BASKET = [
  '.PP.YY.GG.RR.',
  'PPPPYYYGGGRRR',
  'KKKKKKKKKKKKK',
  'KwKwKwKwKwKwK',
  '.KwKwKwKwKwK.',
  '.KKKKKKKKKKK.',
]
const BASKET_C = { P: PINK, Y: GOLD, G: MINT, R: ORANGE, K: WOOD, w: '#8a5a1e' }
const SNACK = ['RRRR', 'RYYR', 'RYYR', 'RRRR']
const SUN = [
  '...YYYYY...',
  '.YYYYYYYYY.',
  'YYYYYYYYYYY',
  'YYYYYYYYYYY',
  'OOOOOOOOOOO',
  'OOOOOOOOOOO',
]
const SUN_C = { Y: '#ffd23a', O: ORANGE }
const BAG = ['.K..K.', 'KK..KK', 'BBBBBB', 'BBBBBB', 'BBBBBB', 'BBBBBB']
const DOOR = [
  'KKKKKKKKKK',
  'KDDDDDDDDK',
  'KDddDDddDK',
  'KDddDDddDK',
  'KDDDDDDDDK',
  'KDDDDDDYDK',
  'KDddDDddDK',
  'KDddDDddDK',
  'KDDDDDDDDK',
  'KDDDDDDDDK',
]
const DOOR_C = { K: INK, D: '#4fb3a6', d: '#2f7f75', Y: GOLD }

// the suitcase, with a whole house rising out of it (k: pop, rise 0…1)
function suitcase(x, cx, cy, k, rise, cell = 20) {
  if (k <= 0.01) return
  const c = cell * k
  if (rise > 0.01) drawBits(x, HOUSE, HOUSE_C, cx - c * 0.5, cy - c * 3 - rise * c * 6, c * 0.95, { rot: -0.06 })
  drawBits(x, SUITCASE, SUITCASE_C, cx, cy + c * 2, c, { rot: 0.03 * Math.sin(rise * 20) * (1 - rise) })
}
// a phone with a list of rows
function phone(x, cx, cy, k, { head = 'RECENT CALLS', headCol = PEARL, rows = [] } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132)
  rows.forEach(([txt, col], i) => {
    const y = -76 + i * 46
    x.fillStyle = col; x.fillRect(-100, y - 18, 200, 36)
    x.fillStyle = INK; x.font = `800 22px ${INTER}`; x.fillText(txt, 0, y + 1)
  })
  x.restore()
}
// a framed photo on the hotel wall with a little sign star inside
function photo(x, t, cx, cy, k, id, rot, seed) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-74, -84, 148, 168)
  x.fillStyle = WOOD; x.fillRect(-68, -78, 136, 156)
  x.fillStyle = '#2a2350'; x.fillRect(-54, -64, 108, 128)
  x.restore()
  if (k > 0.5) signChar(x, t, id, cx, cy + 6, 96 * k, { mood: 'happy', seed, glyph: false, glow: 0.4 })
}

const CAMEOS = [
  { sign: S, cap: 'Packed for a weekend. | Brought *the whole house.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      suitcase(x, 790, 880, pop01(t, P.t0 + 0.15, 0.35, 2), ease.outBack ? clamp(ease.outCubic(prog(lt, 0.9, 1.5))) : prog(lt, 0.9, 1.5))
      label(x, 790, 1140, 'CARRY-ON (?)', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 770, 700, P.t0 + 1.5, 7, 170, 0.2)
    } },
  { sign: S, cap: 'Homesick by | *the driveway.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], tears: lt => lt > 1.3 ? 2 : 0, star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      x.fillStyle = '#3a3360'; x.globalAlpha = clamp(k); x.fillRect(330, 1080, 560, 26); x.globalAlpha = 1
      drawBits(x, HOUSE, HOUSE_C, 800, 930, 18 * k)
      bubble(x, 420, 620, 'I miss | home.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: LAV, tail: 'bc' })
      label(x, 610, 1160, 'DISTANCE: 4 FT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: PEARL, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Brought snacks | for *the whole plane.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [0.9, 1.7],
    front(x, t, lt, P, F) {
      drawBits(x, BASKET, BASKET_C, F.x + 150, F.cy + 90, 15 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 8; i++) {
        const k = pop01(t, P.t0 + 0.7 + i * 0.12, 0.25, 2.2)
        drawBits(x, SNACK, { R: [PINK, ORANGE, MINT, SKYB][i % 4], Y: CREAM }, 650 + (i % 4) * 85, 690 + Math.floor(i / 4) * 110, 13 * k, { rot: Math.sin(i * 2.1) * 0.2 })
      }
      label(x, 780, 1110, 'ROWS 1–40: FED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Hotel room? | Unpacked. *Decorated.*', mood: lt => lt > 1.5 ? 'sparkle' : 'happy', star: { x: -200, y: 40 }, hops: [1.6],
    front(x, t, lt, P) {
      photo(x, t, 640, 650, pop01(t, P.t0 + 0.3, 0.3, 2), 'cancer', -0.06, 31)
      photo(x, t, 820, 640, pop01(t, P.t0 + 0.6, 0.3, 2), 'taurus', 0.05, 32)
      photo(x, t, 730, 850, pop01(t, P.t0 + 0.9, 0.3, 2), 'capricorn', -0.03, 33)
      const r = pop01(t, P.t0 + 1.2, 0.3, 2)
      if (r > 0.01) { x.fillStyle = INK; x.fillRect(610 - 4, 1040 - 4, 340 * r + 8, 56); x.fillStyle = PINK; x.fillRect(610, 1040, 340 * r, 48); x.fillStyle = CREAM; for (let i = 0; i < 6; i++) x.fillRect(624 + i * 54, 1056, 26 * r, 16) }
      label(x, 780, 1160, 'HOME NOW', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Called mom | at *every stop.*', mood: lt => Math.floor(lt * 2) % 2 ? 'happy' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const n = Math.max(1, Math.min(5, Math.floor((lt - 0.3) / 0.3) + 1))
      phone(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), { rows: Array.from({ length: n }, (_, i) => [i === n - 1 ? 'MOM  ·  now' : `MOM  ·  ${(n - 1 - i) * 20}m ago`, i % 2 ? PINK : BONE]) })
      label(x, 790, 1110, `CALLS: ${Math.round(clamp((lt - 0.3) / 1.6) * 31)}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 40, bg: PEARL, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A nice sunset? | *Full sobbing.*', mood: lt => lt > 1 ? 'squint' : 'wide', look: [1, 0], tears: lt => lt > 1.1 ? 3 : 0, star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      const sink = ease.inOutCubic(prog(lt, 0.3, 2.2))
      x.save(); x.beginPath(); x.rect(560, 560, 420, 470); x.clip()
      drawBits(x, SUN, SUN_C, 790, 880 + sink * 60, 26 * k)
      x.restore()
      x.fillStyle = '#2a5a8a'; x.globalAlpha = clamp(k); x.fillRect(560, 1010, 420, 40); x.globalAlpha = 1
      bubble(x, 790, 640, 'it’s just | so pretty', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Souvenirs for | *everyone they’ve met.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 1.4) * 12)
      const COLS = [PINK, MINT, SKYB, GOLD, LAV, ORANGE]
      for (let i = 0; i < n; i++) drawBits(x, BAG, { K: INK, B: COLS[i % 6] }, 650 + (i % 4) * 90, 1060 - Math.floor(i / 4) * 105 + (i % 2) * 8, 14, { rot: Math.sin(i * 1.9) * 0.08 })
      label(x, 800, 650, `GIFTS: ${Math.round(clamp((lt - 0.2) / 1.6) * 63)}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 440, 1150, 'one for: my match', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: PINK, rot: -0.05 })
    } },
  { sign: S, cap: 'Made a friend at check-in. | *Adopted them.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -200, y: 30, s: 260 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const Fs = k > 0.01 ? signChar(x, t, 'sagittarius', 790, 900, 300 * k, { mood: lt > 1.4 ? 'wide' : 'happy', look: [-1, 0], seed: 44, glyph: false, hops: [P.t0 + 1.5] }) : null
      bubble(x, 560, 620, 'what’s | your sign?', pop01(t, P.t0 + 0.5, 0.25, 2.2) * (1 - prog(lt, 1.3, 1.45)), { size: 34, tail: 'bl' })
      if (Fs) label(x, 790, Fs.cy + 150, 'FAMILY NOW', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: PEARL, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 680, 820, P.t0 + 1.5, { n: 5, life: 1.5, spread: 200, cell: 6, seed: 7 })
    } },
  { sign: S, cap: 'Best part of the trip? | *Coming home.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      drawBits(x, DOOR, DOOR_C, 790, 840, 30 * k)
      if (k > 0.01) { x.save(); x.globalAlpha = clamp(k); x.fillStyle = INK; x.fillRect(650, 1006, 280, 52); x.fillStyle = WOOD; x.fillRect(656, 1012, 268, 40); x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HOME', 790, 1033); x.restore() }
      label(x, 790, 1140, 'FINALLY. HOME.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 480, 820, P.t0 + 1.2, { n: 6, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2t0211', key: 'C', accent: PEARL, solo: S, ending: 'group',
  title: 'Cancers on a trip | *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Left the house. | *Brought the house.*', mood: 'sparkle',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
