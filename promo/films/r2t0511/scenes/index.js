// r2t0511: star_talk, SOLO, "Virgos on a trip | *be like.*" (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (solo mode, 9 cards), each the most extreme Virgo-on-holiday. Ending: callback.
//   3.6–37.8   packed in March for August · the itinerary has bathroom breaks · cleaned the hotel room before unpacking
//              · laminated the snack schedule · friend said "let's wing it", Virgo fainted · compatibility check on the
//              travel group · refolded the hotel towels · lost luggage? backup suitcase inside the suitcase
//              · reviewed the trip: four stars, notes attached
//  37.8        "Not a holiday. | A *mission.*"
//  41.2        callback: "Already packed | for *next year.*" (card 1's suitcase, tagged again)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { sheet, phone, BM, RED, CREAM, ORANGE, WOOD, GREEN, PURPLE, SLATE } from './props.js'

const S = 'virgo', VGREEN = '#b6e08a'
const CASE = ['....KKKK....', '...K....K...', 'TTTTTTTTTTTT', 'TBBBBBBBBBBT', 'TBBYBBBBYBBT', 'TBBBBBBBBBBT', 'TTTTTTTTTTTT', 'TBBBBBBBBBBT', 'TBBYBBBBYBBT', 'TBBBBBBBBBBT', 'TTTTTTTTTTTT', '.K........K.']
const CASE_C = { K: INK, T: '#3c8a6a', B: VGREEN, Y: GOLD }
const CASE2_C = { K: INK, T: '#6b62a8', B: LAV, Y: GOLD }
const SPRAY = ['..KKK...', '..KWKKK.', '..KKK...', '...K....', '..BBBB..', '.BWBBBB.', '.BWBBBB.', '.BBBBBB.', '.BBBBBB.', '.BBBBBB.', '..BBBB..']
const SPRAY_C = { K: '#2a2350', W: '#ffffff', B: SKYB }
const TOWEL = ['WWWWWWWWWWWW', 'WSWWWWWWWWSW', 'WWWWWWWWWWWW']
const TOWEL_CS = [{ W: '#ffffff', S: '#d8dbe8' }, { W: PINK, S: '#ff6f9a' }, { W: SKYB, S: '#6fc8ee' }, { W: VGREEN, S: '#8fc86a' }]
function towels(x, cx, cy, n, cell, wob = 0) { for (let i = 0; i < n; i++) drawBits(x, TOWEL, TOWEL_CS[i % 4], cx + (i % 2 ? wob : -wob), cy - i * cell * 3.6, cell) }
function mist(x, t, cx, cy, t0) { for (let i = 0; i < 7; i++) { const ph = ((t - t0) * 1.4 + i / 7) % 1; if (t < t0) return; x.save(); x.globalAlpha = 0.7 * (1 - ph); x.fillStyle = '#e8f8ff'; x.fillRect(cx + ph * 130 + Math.sin(i * 3) * 18, cy + Math.sin(i * 2.1) * 30 * ph, 12, 12); x.restore() } }

const CAMEOS = [
  { sign: S, cap: 'Packed in March. | Trip’s in *August.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, CASE, CASE_C, 790, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 690, 'PACKED: MARCH 3', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1150, 'DEPARTS: AUGUST', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The itinerary has | *bathroom breaks.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      sheet(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 360, h: 420, head: 'DAY 1 PLAN', headCol: VGREEN, size: 30, rows: [
        ['9:00 coffee', INK, pop01(t, P.t0 + 0.4, 0.2, 2)], ['9:12 bathroom', RED, pop01(t, P.t0 + 0.7, 0.2, 2)], ['9:14 view (2 min)', INK, pop01(t, P.t0 + 1.0, 0.2, 2)], ['9:16 bathroom', RED, pop01(t, P.t0 + 1.3, 0.2, 2)], ['9:17 fun ✓', GREEN, pop01(t, P.t0 + 1.6, 0.2, 2)],
      ] })
    } },
  { sign: S, cap: 'Cleaned the hotel room | *before unpacking.*', mood: 'squint', look: [1, 0], star: { x: -170 }, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SPRAY, SPRAY_C, 700, 900, 16 * k, { rot: -0.2 + 0.08 * Math.sin(t * 12) })
      if (lt > 0.5) mist(x, t, 760, 800, P.t0 + 0.5)
      label(x, 820, 1090, 'SANITISED ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 820, 900, P.t0 + 1.5, 8, 170, 0.4, [BONE, SKYB, '#ffffff'])
    } },
  { sign: S, cap: 'The snack schedule? | *Laminated.*', mood: 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      sheet(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 380, head: 'SNACKS', headCol: GOLD, size: 30, rows: [
        ['10:00 apple', GREEN], ['13:00 crackers', ORANGE], ['16:00 apple', GREEN], ['20:00 nope', RED],
      ] })
      x.save(); x.globalAlpha = 0.25 + 0.2 * Math.sin(t * 5); x.fillStyle = '#ffffff'; x.fillRect(640, 680, 40, 360); x.restore()
      label(x, 800, 1110, 'WATERPROOF', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Friend said “let’s wing it.” | Virgo *fainted.*', mood: lt => lt > 1.2 ? 'wide' : 'neutral', look: [1, 0], star: { x: -180 }, squash: lt => lt > 1.2 ? 0.08 : 0,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 800, 940, 230 * k, { mood: 'sparkle', look: [-1, 0], seed: 19, glyph: false, hops: [P.t0 + 0.6] })
      bubble(x, 800, 680, 'let’s wing it!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, col: ORANGE, tail: 'bc' })
      label(x, 380, 640, 'PLAN B, C, D…', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ran a compatibility check | on *the travel group.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TRIP GROUP', headCol: VGREEN, lines: [
        ['♍︎ + ♐︎: chaos', ORANGE, pop01(t, P.t0 + 0.5, 0.2, 2)], ['♍︎ + ♊︎: lost', LAV, pop01(t, P.t0 + 0.9, 0.2, 2)], ['♍︎ + ♍︎: bliss', MINT, pop01(t, P.t0 + 1.3, 0.2, 2), true],
      ] })
    } },
  { sign: S, cap: 'Refolded the hotel towels. | *Better.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.2) * 3.99)
      towels(x, 790, 1060, Math.min(4, n), 22, 0)
      label(x, 790, 690, lt > 1.5 ? 'STAFF: SHOOK' : 'FOLD 1 OF 4', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 38, bg: lt > 1.5 ? PINK : BONE, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.55 * (3.1 / 2.4), 7, 170, 0.6)
    } },
  { sign: S, cap: 'Lost luggage? | Brought a *backup suitcase.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const open = ease.outCubic(prog(lt, 0.7, 1.2))
      drawBits(x, CASE, CASE_C, 790, 960, 20 * k)
      if (lt > 0.7) drawBits(x, CASE, CASE2_C, 790, lerp(960, 760, open), 12)
      label(x, 790, 1150, 'SUITCASE: SPARE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Rated the trip | *four stars. Notes attached.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      sheet(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 360, h: 400, head: 'TRIP REVIEW', headCol: GOLD, size: 30, rows: [
        ['★★★★☆', GOLD, pop01(t, P.t0 + 0.4, 0.2, 2)], ['1. too random', INK, pop01(t, P.t0 + 0.8, 0.2, 2)], ['2. sand: rude', INK, pop01(t, P.t0 + 1.1, 0.2, 2)], ['see page 2 →', RED, pop01(t, P.t0 + 1.5, 0.2, 2)],
      ] })
    } },
]

const F = makeFilm({
  id: 'r2t0511', key: 'C', accent: VGREEN, solo: S, ending: 'callback',
  title: 'Virgos on a trip | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Not a holiday. | A *mission.*', mood: 'sparkle' },
  last: {
    text: 'Already packed | for *next year.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k <= 0.01) return
      signChar(x, t, S, 400, 1010, 280, { mood: 'sparkle', look: [1, 0], pop: k, seed: 12, hops: [t - lt + 0.9, t - lt + 2.0] })
      drawBits(x, CASE, CASE_C, 720, 1030, 20 * k)
      label(x, 720, 1250, 'PACKED: TODAY', pop01(t, t - lt + 1.2, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      sparkles(x, t, 720, 1030, t - lt + 1.3, 8, 190, 0.5)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
