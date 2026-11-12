// r2a0515: star_advice, ADVICE ROLL CALL, "How each sign | *winds down.*" (~57 s vertical, signs3kit, music: lofi · G)
// Twelve signs in zodiac order: one warm, specific bedtime ritual each, with a light gag. Ending: callback.
//   3.6–49.2   ♈ one quick workout, then out like a light · ♉ bath, snacks, blanket, in that order · ♊ three books at once
//              · ♋ calls home, twice · ♌ a twelve-step skincare routine · ♍ lays out tomorrow's outfit · ♎ candles, lots
//              · ♏ a journal with a lock · ♐ plans the next trip from bed · ♑ writes tomorrow's list, then sleeps
//              · ♒ says goodnight to the moon · ♓ a sad film, happy tears
//  49.2        "Lights out. | *Stars on.*"
//  52.6        callback: "Gemini? | *Still on page one.*" (card 3's three books)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { sheet, phone, BM, RED, CREAM, ORANGE, WOOD, GREEN, PURPLE, SLATE } from './props.js'

const TUB = ['.B..B...B..B.', 'B.B..B.B..B.B', 'WWWWWWWWWWWWW', 'WSSSSSSSSSSSW', '.WWWWWWWWWWW.', '..K.......K..']
const TUB_C = { B: '#e8f8ff', W: '#ffffff', S: SKYB, K: '#c9c9d8' }
const BOTTLE = ['.KK.', '.KK.', 'BBBB', 'BWBB', 'BBBB', 'BBBB', 'BBBB']
const CANDLE = ['..Y..', '.YOY.', '..Y..', '.WWW.', '.WWW.', '.WWW.', 'KKKKK']
const CANDLE_C = { Y: GOLD, O: '#ff9a4a', W: CREAM, K: '#8a4a2e' }
const SHIRT = ['TT...TT', 'TTTTTTT', '.TTTTT.', '.TTTTT.', '.TTTTT.']
function books(x, cx, cy, cell, k) { const C = [{ K: '#8a4a2e', W: CREAM, L: '#9a90b8' }, { K: '#3c8a6a', W: CREAM, L: '#9a90b8' }, { K: '#6b62a8', W: CREAM, L: '#9a90b8' }]; for (let i = 0; i < 3; i++) drawBits(x, BM.BOOK, C[i], cx + (i - 1) * 40, cy - i * cell * 7, cell * k, { rot: (i - 1) * 0.08 }) }
function globe(x, t, cx, cy, k) { if (k <= 0.01) return; x.save(); x.translate(cx, cy); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 112, 0, 7); x.fill(); x.fillStyle = SKYB; x.beginPath(); x.arc(0, 0, 102, 0, 7); x.fill(); x.fillStyle = GREEN; const o = (t * 30) % 200 - 100; for (const [a, b, w, h] of [[-40, -40, 70, 50], [30, 20, 60, 70], [-70, 40, 40, 30]]) x.fillRect(a + o * 0.4, b, w, h); x.restore() }

const CAMEOS = [
  { sign: 'aries', cap: 'One quick workout. | *Then out like a light.*', mood: lt => lt > 1.3 ? 'sleepy' : 'sparkle', star: { x: -170 }, hops: [0.3, 0.6, 0.9],
    front(x, t, lt, P) {
      label(x, 790, 760, lt > 1.3 ? 'ZZZ: 9:01' : 'PUSH-UPS: 50', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 40, bg: lt > 1.3 ? LAV : '#f0603a', color: lt > 1.3 ? INK : CREAM, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1000, 'BEDTIME: 9:00', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Bath, snacks, blanket. | *In that order.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TUB, TUB_C, 790, 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, BM.CHEESE, BM.CHEESE_C, 720, 760, 14 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 860, 760, 'STEP 2', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: '#e9b24a', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Reads three books | *at once.*', mood: 'happy', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      books(x, 790, 980, 12, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'PAGE 1, 1 AND 1', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: '#f2cf4a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Calls home. | *Then calls home again.*', mood: 'heart', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'CALLS', headCol: '#3fb6f0', lines: [
        ['home ♡ 9:00', BONE, pop01(t, P.t0 + 0.4, 0.2, 2)], ['home ♡ 9:20', BONE, pop01(t, P.t0 + 0.9, 0.2, 2)], ['“one more thing”', PINK, pop01(t, P.t0 + 1.4, 0.2, 2), true],
      ] })
    } },
  { sign: 'leo', cap: 'Skincare routine. | *Twelve steps.*', mood: 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.5) * 11.99)
      const C = [PINK, MINT, LAV, SKYB, GOLD, '#f39a3a']
      for (let i = 0; i < Math.min(12, n); i++) drawBits(x, BOTTLE, { K: INK, B: C[i % 6], W: '#ffffff' }, 640 + (i % 6) * 60, 1000 - Math.floor(i / 6) * 120, 9)
      label(x, 790, 700, `STEP ${Math.min(12, n)}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 44, bg: '#f39a3a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Lays out | *tomorrow’s outfit.*', mood: 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, SHIRT, { T: MINT }, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'SOCKS: IRONED', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'TUESDAY: READY ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: '#ef5c94', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Candles. | *Lots of candles.*', mood: 'heart', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.4) * 8.99)
      for (let i = 0; i < Math.min(9, n); i++) drawBits(x, CANDLE, CANDLE_C, 640 + (i % 3) * 100, 1040 - Math.floor(i / 3) * 150, 11, { sy: 1 + 0.04 * Math.sin(t * 9 + i) })
      label(x, 790, 640, 'MOOD: SET', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: '#e163d6', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Journals in | *a locked notebook.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, BM.BOOK, { K: INK, W: '#2a2350', L: '#e23d66' }, 790, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, BM.LOCK, BM.LOCK_C, 790, 900, 9 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 790, 1090, 'PAGES: 600', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: '#e23d66', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Plans the next trip | *from bed.*', mood: 'sparkle', star: { x: 150 }, hops: [1.2],
    front(x, t, lt, P) {
      globe(x, t, 330, 880, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 330, 1100, 'TABS OPEN: 23', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: '#a35cf0', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Writes tomorrow’s list. | *Then sleeps.*', mood: lt => lt > 1.5 ? 'sleepy' : 'neutral', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      sheet(x, 330, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 360, head: 'TOMORROW', headCol: '#2fc79a', size: 28, rows: [
        ['6:00 rise', INK, pop01(t, P.t0 + 0.4, 0.2, 2)], ['7:00 conquer', INK, pop01(t, P.t0 + 0.7, 0.2, 2)], ['9:00 rest ♡', GREEN, pop01(t, P.t0 + 1.1, 0.2, 2)],
      ] })
    } },
  { sign: 'aquarius', cap: 'Says goodnight | *to the moon.*', mood: 'happy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'night, moon!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, col: '#38c4ec', tail: 'bl' })
      label(x, 790, 1000, 'MOON: WAVED BACK', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.6, 7, 160, 0.4)
    } },
  { sign: 'pisces', cap: 'A sad film. | *Happy tears.*', mood: 'heart', tears: 3, star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 720, 'THE END', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 48, bg: CREAM, rot: -0.03, font: MONO, weight: 700 })
      hearts(x, t, 790, 980, P.t0 + 0.9, { n: 6, life: 1.8, spread: 200, cell: 8, seed: 3 })
      label(x, 790, 1100, 'BEST NIGHT EVER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: '#7c74f0', color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0515', key: 'G', accent: LAV, ending: 'callback',
  title: 'How each sign | *winds down.*',
  cameos: CAMEOS,
  group: { cap: 'Lights out. | *Stars on.*' },
  last: {
    text: 'Gemini? | *Still on page one.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k <= 0.01) return
      signChar(x, t, 'gemini', 380, 1010, 270, { mood: lt > 1.8 ? 'sleepy' : 'happy', look: [1, 0], pop: k, seed: 12, hops: [t - lt + 1.0] })
      books(x, 730, 1060, 13, k)
      label(x, 730, 1230, 'PAGE 1 ×3', pop01(t, t - lt + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
