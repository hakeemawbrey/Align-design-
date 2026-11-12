// r2t0463: star_talk, SOLO (aries), "Aries making plans | *be like.*" (signs3kit social cut, music: lofi · G). Ending: callback.
//   planned the trip, left an hour ago · booked the table for right now · the chat said "Saturday?", Aries "leaving now"
//   · plan B doesn't exist · matched at 7:01, date at 7:15 · the calendar says GO every day · arrived two hours early
//   · got bored waiting, made a new plan (plan #7 today) · planned a nap, ran a marathon
//   group "Zero to go. | Every time."   last "Trip's next month. | Aries left today." (the suitcase comes back)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'aries', ACC = '#ffb34a', CREAM = '#fff4e2', RED = '#e23d4e', GREY = '#9aa5c4', PURP = '#6b62a8', DEEP = '#2a2350'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

/** a phone with a header strip and chat pills: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = DEEP; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 26px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** a paper card with lines of text */
function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800, lh = 1.55 } = {}) {
  if (k <= 0.01) return
  const LH = size * lh, h = lines.length * LH + 50
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 25 + LH * (i + 0.5)))
  x.restore()
}
/** speed lines behind a moving thing */
function speed(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= k; x.fillStyle = BONE
  for (let i = 0; i < 5; i++) { const o = ((t * 3 + i * 0.37) % 1); x.fillRect(cx - 60 - o * 120, cy - 60 + i * 30, 70, 6) }
  x.restore()
}
/** a wall calendar: every day says GO */
function calendar(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -170, 336, 356)
  x.fillStyle = INK; x.fillRect(-172, -184, 344, 360)
  x.fillStyle = BONE; x.fillRect(-164, -176, 328, 344)
  x.fillStyle = RED; x.fillRect(-164, -176, 328, 62)
  x.fillStyle = CREAM; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THIS MONTH', 0, -144)
  const n = Math.floor(clamp((lt - 0.3) / 1.2) * 28)
  for (let d = 0; d < 28; d++) {
    const c = d % 7, r = Math.floor(d / 7), px = -150 + c * 44, py = -76 + r * 62
    if (d < n) { x.fillStyle = '#ffd0a0'; x.fillRect(px, py - 22, 38, 44); x.fillStyle = RED; x.font = `800 20px ${INTER}`; x.fillText('GO', px + 19, py + 1) }
    else { x.fillStyle = '#b9b0a0'; x.font = `700 20px ${MONO}`; x.fillText(String(d + 1), px + 18, py + 2) }
  }
  x.restore()
}
const SUITCASE = [
  '....KKKK....',
  '....K..K....',
  'RRRRRRRRRRRR',
  'RRYRRRRRRYRR',
  'RRYRRRRRRYRR',
  'RRRRRRRRRRRR',
  'RRWWWRRRRRRR',
  'RRRRRRRRRRRR',
  'RRYRRRRRRYRR',
  'RRRRRRRRRRRR',
  '.K........K.',
]
const SUITCASE_C = { K: GREY, R: RED, Y: GOLD, W: CREAM }
const CLOCK = ['..KKKKK..', '.KWWWWWK.', 'KWWWKWWWK', 'KWWWKWWWK', 'KWWWKKKWK', 'KWWWWWWWK', 'KWWWWWWWK', '.KWWWWWK.', '..KKKKK..']
const CLOCK_C = { K: INK, W: CREAM }
const SHOE = ['..RRR.......', '.RRWRR......', '.RRRRRRR....', 'RRRRRRRRRRR.', 'WWWWWWWWWWWW']
const SHOE_C = { R: RED, W: '#ffffff' }
const BED = ['P..........P', 'PWWW.......P', 'PWWWBBBBBBBP', 'PBBBBBBBBBBP', 'PPPPPPPPPPPP', 'P..........P']
const BED_C = { P: PURP, W: CREAM, B: LAV }

const CAMEOS = [
  // 1 · the trip
  { sign: S, cap: 'Planned the trip. | *Left an hour ago.*', mood: 'sparkle', star: ST, hops: [0.5, 0.9],
    front(x, t, lt, P) {
      const d = ease.inOutCubic(prog(lt, 0.4, 1.4))
      speed(x, lerp(760, 860, d), 940, d > 0.05 && d < 0.95 ? 1 : 0, t)
      drawBits(x, SUITCASE, SUITCASE_C, lerp(760, 860, d), 940, 18 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.08 * Math.sin(t * 10) * (d < 1 ? 1 : 0) })
      L(x, 790, 650, 'TRIP: NEXT MONTH', pop01(t, P.t0 + 0.6, 0.3, 2.2), BONE, -0.04, 32)
      L(x, 790, 1150, 'BOARDING', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 38)
    } },
  // 2 · the reservation
  { sign: S, cap: 'Booked a table. | For *right now.*', mood: lt => lt < 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CLOCK, CLOCK_C, 790, 880, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      L(x, 790, 640, 'TABLE FOR 2', pop01(t, P.t0 + 0.5, 0.3, 2.2), GOLD, -0.04, 36)
      L(x, 790, 1120, 'IN 4 MINUTES', pop01(t, P.t0 + 1.2, 0.3, 2.2), RED, 0.04, 36, CREAM)
    } },
  // 3 · the group chat
  { sign: S, cap: '“Saturday, maybe?” | Aries: *“leaving now.”*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 790, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'GROUP · 6', headCol: GOLD, lines: [['saturday maybe?', LAV, pop01(t, P.t0 + 0.4, 0.2, 2), false], ['leaving now', '#ff8a5a', pop01(t, P.t0 + 1.0, 0.2, 2), true], ['it’s tuesday', LAV, pop01(t, P.t0 + 1.5, 0.2, 2), false]] })
    } },
  // 4 · plan B
  { sign: S, cap: 'Plan B? | *Doesn’t exist.*', mood: lt => lt < 1.1 ? 'happy' : 'squint', star: ST,
    front(x, t, lt, P) {
      note(x, 790, 880, pop01(t, P.t0 + 0.15, 0.3, 2), ['PLAN A: GO', 'PLAN B: GO', 'PLAN C: GO', 'HARDER'], { w: 330, size: 40, rot: 0.05 })
      sparkles(x, t, 790, 880, P.t0 + 1.2, 6, 200, 0.2)
    } },
  // 5 · Align nod: the match
  { sign: S, cap: 'Matched at 7:01. | *Date at 7:15.*', mood: lt => lt < 1.0 ? 'sparkle' : 'heart', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'NEW MATCH ♡', headCol: PINK, lines: [['dinner at 7:15?', '#ff8a5a', pop01(t, P.t0 + 0.4, 0.2, 2), true], ['it’s 7:02', LAV, pop01(t, P.t0 + 1.0, 0.2, 2), false], ['i’m outside', '#ff8a5a', pop01(t, P.t0 + 1.5, 0.2, 2), true]] })
    } },
  // 6 · the calendar
  { sign: S, cap: 'Their whole calendar? | *Just “GO.”*', mood: 'sparkle', star: ST,
    front(x, t, lt, P) { calendar(x, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2) * 0.95, lt) } },
  // 7 · arriving early
  { sign: S, cap: 'Arrived first. | *Two hours early.*', mood: lt => lt < 1.2 ? 'sparkle' : 'squint', look: [1, -1], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      L(x, 790, 700, 'DOORS OPEN 9 PM', pop01(t, P.t0 + 0.2, 0.3, 2), BONE, -0.04, 34)
      L(x, 790, 820, 'NOW: 7 PM', pop01(t, P.t0 + 0.7, 0.3, 2.2), RED, 0.04, 40, CREAM)
      bubble(x, 790, 1040, 'is it time yet?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  // 8 · bored waiting
  { sign: S, cap: 'Got bored waiting. | Made *a new plan.*', mood: lt => lt < 0.9 ? 'squint' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.4) * 6)
      L(x, 790, 860, `PLAN #${n} TODAY`, pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, -0.04, 44)
      sparkles(x, t, 790, 860, P.t0 + 1.9, 7, 220, 0.6)
      bubble(x, 790, 660, 'new idea!!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  // 9 · the nap
  { sign: S, cap: 'Planned a nap. | Ran *a marathon.*', mood: lt => lt < 0.9 ? 'sleepy' : 'sparkle', star: { x: -170, y: -30 }, hops: [1.0, 1.3, 1.6, 1.9],
    back(x, t, lt, P) { if (lt < 1.0) drawBits(x, BED, BED_C, 470, 1080, 34 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      if (lt >= 1.0) { drawBits(x, SHOE, SHOE_C, 320, 1090, 12); drawBits(x, SHOE, SHOE_C, 430, 1100, 12) }
      L(x, 790, 760, 'NAP: 2:00 PM', pop01(t, P.t0 + 0.3, 0.3, 2), LAV, -0.04, 34)
      L(x, 790, 900, '26.2 MILES ✓', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, 0.04, 40)
    } },
]

const F = makeFilm({
  id: 'r2t0463', key: 'G', accent: ACC, solo: S, ending: 'callback',
  title: 'Aries making plans | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Zero to go. | *Every time.*', mood: 'sparkle' },
  last: {
    text: 'Trip’s next month. | Aries *left today.*',
    draw(x, t, lt) {
      drawBits(x, SUITCASE, SUITCASE_C, 540, 1080, 24 * pop01(t, t - lt + 0.6, 0.4, 2), { rot: 0.06 })
      label(x, 540, 1330, 'CHECKED IN ✓', pop01(t, t - lt + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
