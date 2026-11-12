// r2a0312: star_advice, ADVICE SOLO, "Virgo, celebrate | the small wins." (~43 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way: nine tiny Virgo wins, each with a warm reframe and one light visual gag. Ending: group.
//   0.0–3.6    "Virgo, celebrate | *the small wins.*"  One big Virgo pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              the bed is made (lumpy, still counts) · drank water, gold star · sent it after one reread
//              · one dish in the sink, the world is fine · a real lunch, away from the desk · said no to one extra task
//              · asked for help · crossed off one thing, party hat · rested before earning it
//  37.8        "Tiny wins | *count double.*"  Virgo comes back, big. (ending)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const TEAL = '#2fc79a', PAPER = '#fff4e2', RED = '#e23d4e'

// ── props
const BED = [
  'KK..............',
  'KKWWWW..........',
  'KKWWWWBBBBBBBBBB',
  'KKBBBBBBBbBBBBBB',
  'KKBBBBBBBBBBBbBB',
  'KKBBBbBBBBBBBBBB',
  'KKKKKKKKKKKKKKKK',
  'KK............KK',
]
const BED_C = { K: '#8a4a2e', W: PAPER, B: '#7dc8ff', b: '#4a9bd6' }
const GLASS = [
  'W.......W',
  'W.......W',
  'WSSSSSSSW',
  'WSSWSSSSW',
  'WSSSSSSSW',
  'WSSSSSSSW',
  '.WSSSSSW.',
  '..WWWWW..',
]
const GLASS_C = { W: '#d8dbe8', S: SKYB }
const STAR = [
  '....Y....',
  '...YYY...',
  'YYYYYYYYY',
  '.YYYYYYY.',
  '..YYYYY..',
  '.YYY.YYY.',
  'YY.....YY',
]
const SINK = [
  'GGGGGGGGGGGGGG',
  'G............G',
  'G...WWWWWW...G',
  'G..WWWWWWWW..G',
  'G...WWWWWW...G',
  'GGGGGGGGGGGGGG',
]
const SINK_C = { G: '#9aa5c4', W: PAPER }
const SANDWICH = [
  '..BBBBBBBB..',
  '.BBBBBBBBBB.',
  'GGGGGGGGGGGG',
  'RRRRRRRRRRRR',
  'YYYYYYYYYYYY',
  '.BBBBBBBBBB.',
]
const SANDWICH_C = { B: '#e8a24a', G: '#5fd068', R: RED, Y: '#ffd23a' }
const CLIP = [
  '....KKKK....',
  'BBBBKKKKBBBB',
  'BWWWWWWWWWWB',
  'BWLLLLLLLLWB',
  'BWWWWWWWWWWB',
  'BWLLLLLLWWWB',
  'BWWWWWWWWWWB',
  'BWLLLLLLLLWB',
  'BWWWWWWWWWWB',
  'BBBBBBBBBBBB',
]
const CLIP_C = { K: '#9aa5c4', B: '#c98f5a', W: PAPER, L: '#b9b0a0' }
const HAT = [
  '....Y....',
  '...PPP...',
  '...PYP...',
  '..PPPPP..',
  '..PYPPP..',
  '.PPPPYPP.',
  'PPYPPPPPP',
]
const HAT_C = { Y: GOLD, P: PINK }
const PILLOW = [
  '.WWWWWWWWWWWW.',
  'WWWWWWWWWWWWWW',
  'WWWLWWWWWWLWWW',
  'WWWWWWWWWWWWWW',
  '.WWWWWWWWWWWW.',
]
const PILLOW_C = { W: '#e8e2ff', L: LAV }

/** a checklist with n rows; `done` rows get ticks (one ticks live at tick ∈ 0…1) */
function checklist(x, cx, cy, k, tick) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -150, 296, 320)
  x.fillStyle = INK; x.fillRect(-152, -162, 304, 324); x.fillStyle = PAPER; x.fillRect(-144, -154, 288, 308)
  const ROWS = ['reply to mom', 'laundry', 'taxes', 'fix shelf', 'learn piano']
  x.font = `700 26px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  ROWS.forEach((s, i) => {
    const y = -114 + i * 56
    x.fillStyle = INK; x.fillRect(-122, y - 14, 28, 28); x.fillStyle = PAPER; x.fillRect(-118, y - 10, 20, 20)
    if (i === 0 && tick > 0) { x.fillStyle = TEAL; x.fillRect(-118, y - 10, 20, 20 * Math.min(1, tick * 1.5)) }
    x.fillStyle = INK; x.fillText(s, -80, y)
    if (i === 0 && tick > 0.6) { x.fillStyle = INK; x.fillRect(-80, y - 2, 170 * Math.min(1, (tick - 0.6) / 0.4), 4) }
  })
  x.restore()
}

const CAMEOS = [
  { sign: 'virgo', cap: 'The bed’s a bit lumpy. | *Still counts.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 1], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, BED, BED_C, 790, 990, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 720, 'MADE: YES', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 44, bg: TEAL, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 820, 'PERFECT: NO', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 980, P.t0 + 1.4, 6, 150, 0.4)
    } },
  { sign: 'virgo', cap: 'Drank water today? | *Gold star.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, GLASS, GLASS_C, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, STAR, { Y: GOLD }, 880, 760, 14 * pop01(t, P.t0 + 1.1, 0.3, 2.6), { rot: 0.2 })
      sparkles(x, t, 880, 760, P.t0 + 1.2, 6, 110, 0.2)
      label(x, 790, 1130, 'HYDRATED HERO', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.03 })
    } },
  { sign: 'virgo', cap: 'Sent it after | *one reread.* Huge.', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'sounds good!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, col: SKYB, tail: 'br' })
      label(x, 790, 860, 'REREADS: 1', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 46, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1000, 'USUAL: 9', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 28, bg: '#3a2e55', color: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'SENT!', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: TEAL, rot: -0.05 })
    } },
  { sign: 'virgo', cap: 'One dish in the sink. | *The world’s fine.*', mood: lt => lt < 1.3 ? 'wide' : 'happy', look: lt => lt < 1.3 ? [1, 1] : [0, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, SINK, SINK_C, 790, 1010, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 720, lt < 1.3 ? 'ALERT: 1 DISH' : 'WORLD: STILL FINE', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: lt < 1.3 ? RED : TEAL, color: lt < 1.3 ? '#fff4e2' : INK, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.3) bubble(x, 790, 860, 'it can wait', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'A real lunch break. | *Away from the desk.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SANDWICH, SANDWICH_C, 790, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 790, 720, 'DESK: 40 FT AWAY', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1130, 'BREAK: TAKEN', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'virgo', cap: 'Said no | to *one extra task.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const away = ease.inOutCubic(prog(lt, 1.0, 1.7))
      drawBits(x, CLIP, CLIP_C, lerp(800, 1060, away), 950, 17 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(0.05, 0.6, away), alpha: 1 - prog(lt, 1.5, 1.75) })
      label(x, 800, 720, 'ONE MORE THING?', pop01(t, P.t0 + 0.3, 0.3, 2) * (1 - prog(lt, 1.0, 1.2)), { size: 30, bg: BONE, rot: -0.04 })
      bubble(x, 760, 760, 'not today!', pop01(t, P.t0 + 1.2, 0.25, 2.4), { size: 46, col: MINT, tail: 'bl' })
      if (lt > 1.6) sparkles(x, t, 760, 760, P.t0 + 1.6, 6, 150, 0.3)
    } },
  { sign: 'virgo', cap: 'Asked for help? | *That’s strength.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -180 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 560, 620, 'could you help?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bc' })
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 940, 230 * k, { mood: 'sparkle', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.2] })
      bubble(x, 820, 700, 'of course!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bc' })
      hearts(x, t, 680, 900, P.t0 + 1.5, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 6 })
    } },
  { sign: 'virgo', cap: 'Crossed off one thing. | *Throw a party.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3, 1.9],
    front(x, t, lt, P, F) {
      checklist(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), prog(lt, 0.6, 1.1))
      if (lt > 1.2) drawBits(x, HAT, HAT_C, F.x + 6, F.top - 48, 14 * pop01(t, P.t0 + 1.2, 0.3, 2.4), { rot: -0.15 })
      sparkles(x, t, F.x, F.top, P.t0 + 1.25, 8, 140, 0.4, [GOLD, PINK, MINT])
      label(x, 800, 1110, '1 OF 5: PARTY TIME', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04 })
    } },
  { sign: 'virgo', cap: 'Rested before | *earning it.* Allowed.', mood: lt => lt > 1.0 ? 'sleepy' : 'neutral', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PILLOW, PILLOW_C, 790, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 740, 'NO RECEIPT NEEDED', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04 })
      label(x, 790, 840, 'REST: APPROVED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: TEAL, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0312', key: 'F', accent: TEAL, solo: 'virgo', ending: 'group',
  title: 'Virgo, celebrate | *the small wins.*',
  cameos: CAMEOS,
  group: { cap: 'Tiny wins | *count double.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
