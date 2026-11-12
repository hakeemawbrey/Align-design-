// r2a0512: star_advice, ADVICE SOLO, "Taurus, new things | can feel like *home.*" (~45 s vertical, signs3kit, music: lofi · F)
// One sign the whole film (solo mode, 9 cards): a relatable Taurus-meets-change truth + a warm reframe, one light gag each.
// Ending: callback.
//   3.6–37.8   a new recipe, instant classic · the new sofa, give it a week · moved house, unpack the blanket first · a new route,
//              found a bakery · the new hobby: a wobbly bowl · a new playlist, old favourites welcome · a new match, slow is
//              still a yes · a braver coffee order · rearranged the room
//  37.8        "New can be | *cosy too.*"
//  41.2        callback: "Bowl forty? | *Perfectly round.*" (card 5's wobbly bowl, all grown up)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { sheet, phone, BM, RED, CREAM, ORANGE, WOOD, GREEN, PURPLE, SLATE } from './props.js'

const S = 'taurus', TCOL = '#e9b24a'
const POT = ['.S...S...S.', '..S...S...S', '.S...S...S.', 'KKKKKKKKKKK', 'KRRRRRRRRRK', 'KRRRRRRRRRK', '.KRRRRRRRK.', '..KKKKKKK..']
const POT_C = { S: '#d8dbe8', K: INK, R: RED }
const BOX = ['KKKKKKKKKK', 'KWWWTTWWWK', 'KWWWTTWWWK', 'KWWWWWWWWK', 'KWWWWWWWWK', 'KKKKKKKKKK']
const BOX_C = { K: '#8a4a2e', W: '#c98f5a', T: '#e8d0a0' }
const CROISSANT = ['....OOO....', '..OOYOOYO..', '.OYOOYOOYO.', 'OOO.....OOO', 'OO.......OO']
const CRO_C = { O: '#e8a24a', Y: '#ffd8a0' }
const BOWL_W = ['W..........W', 'WW........WW', '.WWW....WWW.', '..WWWWWWW...', '....WWWW....']   // lopsided
const BOWL_R = ['W..........W', 'WW........WW', '.WWW....WWW.', '..WWWWWWWW..', '....WWWW....']
const CLAY = { W: '#d9774a' }, GLAZE = { W: '#7fd08a' }

const CAMEOS = [
  { sign: S, cap: 'Tried a new recipe? | *Instant classic.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, POT, POT_C, 790, 930, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: 1 + 0.03 * Math.sin(t * 6) })
      label(x, 770, 700, lt > 1.3 ? 'NOW A SUNDAY ✓' : 'NEW?? hmm…', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 32, bg: lt > 1.3 ? MINT : BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'New sofa feels wrong? | *Give it a week.*', mood: lt => lt > 1.4 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -60, y: -30, s: 260 }, squash: lt => lt > 1.4 ? 0.06 : 0,
    back(x, t, lt, P) { drawBits(x, BM.COUCH, BM.COUCH_C, 480, 960, 28 * pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 800, 650, lt > 1.4 ? 'DAY 7: MELTED IN' : 'DAY 1: SUSPICIOUS', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 32, bg: lt > 1.4 ? GOLD : BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Moved house? | *Unpack the blanket first.*', mood: 'heart', look: [1, 0], star: { x: -170, y: 10 },
    front(x, t, lt, P) {
      drawBits(x, BOX, BOX_C, 760, 1000, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, BOX, BOX_C, 820, 880, 15 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.05 })
      drawBits(x, BM.BLANKET, BM.BLANKET_C, 380, 1020, 26 * pop01(t, P.t0 + 0.9, 0.3, 2))
      label(x, 790, 700, 'BOX 1: BLANKET', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: TCOL, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Took a new route? | *Found a bakery.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -180 }, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, CROISSANT, CRO_C, 790, 900, 22 * pop01(t, P.t0 + 0.8, 0.35, 2))
      label(x, 790, 700, 'DETOUR: WORTH IT', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.0, 8, 170, 0.2)
      label(x, 790, 1080, 'NEW ROUTE: FOREVER', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'New hobby feels clumsy? | *Everyone starts here.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.fillStyle = INK; x.fillRect(680, 1010, 220 * k, 30); x.fillStyle = SLATE; x.fillRect(686, 1014, 208 * k, 22)
      drawBits(x, BOWL_W, CLAY, 790, 950, 21 * k, { rot: 0.12 * Math.sin(t * 7), sx: 1 + 0.06 * Math.sin(t * 5) })
      label(x, 790, 720, 'BOWL #1', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 40, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, '(IT’S ART)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A new playlist? | *Old favourites welcome.*', mood: 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P, F) {
      notes(x, t, F.x + 40, F.cy - 100, { n: 4, cell: 7, col: TCOL, seed: 3 })
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NEW MIX', headCol: TCOL, lines: [
        ['new song', LAV, pop01(t, P.t0 + 0.5, 0.2, 2)], ['old fave ♡', GOLD, pop01(t, P.t0 + 0.8, 0.2, 2)], ['old fave ♡', GOLD, pop01(t, P.t0 + 1.1, 0.2, 2)], ['old fave ♡', GOLD, pop01(t, P.t0 + 1.4, 0.2, 2)],
      ] })
    } },
  { sign: S, cap: 'New match, taking it slow? | *Slow is still yes.*', mood: 'heart', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '♉︎ IT’S A MATCH', headCol: PINK, lines: [
        ['hi :)', BONE, pop01(t, P.t0 + 0.5, 0.2, 2)], ['hi :) (3 days later)', MINT, pop01(t, P.t0 + 1.0, 0.2, 2), true],
      ] })
      label(x, 790, 1120, 'STILL CUTE ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ordered something new? | *Brave and delicious.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BM.MUG, BM.MUG_C, 720, 950, 15 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, BM.MUG, { W: CREAM, M: '#7fd08a' }, 880, 930, 20 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 720, 1080, 'USUAL', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 880, 1080, 'MATCHA?!', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 30, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 700, 'ok… nice', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, col: TCOL, tail: 'bl' })
    } },
  { sign: S, cap: 'Moved the furniture? | *New view, same cosy.*', mood: 'happy', look: [1, 0], star: { x: -60, y: -30, s: 260 },
    back(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.4, 1.2))
      drawBits(x, BM.COUCH, BM.COUCH_C, lerp(700, 480, p), 960, 28 * pop01(t, P.t0 + 0.15, 0.3, 2))
    },
    front(x, t, lt, P) {
      label(x, 790, 650, lt > 1.2 ? 'NOW: BY THE WINDOW' : 'MOVING: 2 INCHES', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 32, bg: lt > 1.2 ? SKYB : BONE, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 540, 900, P.t0 + 1.2 * (3.1 / 2.4), 7, 220, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2a0512', key: 'F', accent: TCOL, solo: S, ending: 'callback',
  title: 'Taurus, new things | can feel like *home.*',
  cameos: CAMEOS,
  group: { cap: 'New can be | *cosy too.*', mood: 'heart' },
  last: {
    text: 'Bowl forty? | *Perfectly round.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k <= 0.01) return
      signChar(x, t, S, 380, 1020, 260, { mood: 'heart', look: [1, 0], pop: k, seed: 12, hops: [t - lt + 1.2] })
      drawBits(x, BOWL_R, GLAZE, 740, 1000, 27 * k)
      label(x, 740, 1180, 'BOWL #40 ✓', pop01(t, t - lt + 1.1, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      sparkles(x, t, 740, 1000, t - lt + 1.2, 8, 180, 0.5)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
