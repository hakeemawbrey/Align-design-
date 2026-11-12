// r2t0489: star_talk, SOLO (leo), "Leos as your boss | *be like.*" (signs3kit social cut, music: lofi · D).
// Ending: lesson (LESSON UNLOCKED, then the last line). No match card.
//   every meeting starts with applause · your performance review is about them · the office has forty portraits of
//   them · employee of the month: also them · a one-hour pep talk · asked your sign in the job interview · the bonus came
//   gold-wrapped · the company retreat is their birthday · defends the team like a lion.
//   group "Dramatic. Loud. | Weirdly the best."  lesson "Cheer your Leo boss. | They'll cheer you louder."
//   last "Meeting adjourned. | Applause, please."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'leo', ACC = '#ffb34a', CREAM = '#fff4e2', RED = '#e23d4e', SLATE = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

// clapping hands
const HAND = ['.YY.YY.', 'YYYYYYY', 'YYYYYYY', '.YYYYY.', '..YYY..']
function clap(x, t, cx, cy, cell, k) {
  if (k <= 0.01) return
  const g = Math.abs(Math.sin(t * 9)) * 18
  drawBits(x, HAND, { Y: '#ffd9a8' }, cx - 30 - g, cy, cell * k, { rot: 0.3 })
  drawBits(x, HAND, { Y: '#ffd9a8' }, cx + 30 + g, cy, cell * k, { rot: -0.3 })
}
// a sheet with a head and rows
function sheet(x, cx, cy, k, { w = 330, h = 330, head, headCol = ACC, rows = [], rot = 0.04 }) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 62)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 33)
  x.textAlign = 'left'; x.font = `700 26px ${MONO}`
  rows.forEach(([text, col, a], i) => { if (a <= 0.01) return; x.globalAlpha = a; x.fillStyle = col || INK; x.fillText(text, -w / 2 + 24, -h / 2 + 110 + i * 64); x.globalAlpha = 1 })
  x.restore()
}
// a tiny framed portrait of a Leo star
function portrait(x, cx, cy, s, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * s, k * s)
  x.fillStyle = INK; x.fillRect(-56, -66, 112, 132); x.fillStyle = GOLD; x.fillRect(-50, -60, 100, 120)
  x.fillStyle = '#2a2350'; x.fillRect(-38, -48, 76, 96)
  drawBits(x, ['..Y..', '.YYY.', 'YYYYY', '.Y.Y.'], { Y: ACC }, 0, 0, 12)
  x.restore()
}
const PLAQUE = ['GGGGGGGGGG', 'GWWWWWWWWG', 'GWWWWWWWWG', 'GWWWWWWWWG', 'GGGGGGGGGG']
const GIFT = [
  '...R..R...',
  '....RR....',
  'GGGGRRGGGG',
  'GGGGRRGGGG',
  'GGGGRRGGGG',
  'GGGGRRGGGG',
  'GGGGRRGGGG',
]
const GIFT_C = { R: RED, G: GOLD }
const CAKE = [
  '..F...F...F..',
  '..C...C...C..',
  '.WWWWWWWWWWW.',
  '.PPPPPPPPPPP.',
  'WWWWWWWWWWWWW',
  'PPPPPPPPPPPPP',
  'PPPPPPPPPPPPP',
]
const CAKE_C = { F: GOLD, C: SKYB, W: CREAM, P: PINK }

const ST = { x: -170 }
const CAMEOS = [
  // 1 · applause
  { sign: S, cap: 'Every meeting | *starts with applause.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      clap(x, t, 790, 900, 20, pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 790, 680, 'AGENDA: 1. CLAP', pop01(t, P.t0 + 0.2, 0.3, 2.4), GOLD, -0.04, 34)
      sparkles(x, t, 790, 900, P.t0 + 0.9, 8, 180, 0.3)
    } },
  // 2 · your review is about them
  { sign: S, cap: 'Your performance review? | *About them.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'YOUR REVIEW', rows: [
        ['you: fine', INK, pop01(t, P.t0 + 0.5, 0.2, 2)], ['ME: ICONIC', RED, pop01(t, P.t0 + 0.8, 0.2, 2)], ['ME: SO HUMBLE', RED, pop01(t, P.t0 + 1.1, 0.2, 2)],
      ] })
    } },
  // 3 · the office portraits
  { sign: S, cap: 'Office decor: | *forty of their portraits.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const spots = [[680, 600], [800, 610], [920, 600], [700, 760], [830, 770], [940, 760], [690, 920], [820, 930], [930, 920]]
      spots.forEach(([px, py], i) => portrait(x, px, py, 0.95, pop01(t, P.t0 + 0.2 + i * 0.12, 0.2, 2), ((i * 7) % 5 - 2) * 0.04))
      L(x, 790, 1110, 'AND 31 MORE', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 34)
    } },
  // 4 · employee of the month
  { sign: S, cap: 'Employee of the month? | *Also them.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PLAQUE, { G: GOLD, W: '#2a2350' }, 790, 830, 30 * k, { outline: INK })
      if (k > 0.6) { x.save(); x.fillStyle = GOLD; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.globalAlpha = clamp((k - 0.6) * 3); x.fillText('BOSS OF', 790, 812); x.fillText('THE MONTH', 790, 852); x.restore() }
      L(x, 790, 1060, '12 MONTHS RUNNING', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 32)
    } },
  // 5 · the pep talk
  { sign: S, cap: 'A quick pep talk. | *It lasted an hour.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 770, 690, 'you are all stars. | like ME.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bl' })
      const n = Math.round(lerp(1, 60, ease.inCubic(prog(lt, 0.5, 2.0))))
      L(x, 790, 990, `MINUTE ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2.4), SKYB, 0.04, 40)
    } },
  // 6 · Align: your sign in the interview
  { sign: S, cap: 'Job interview: | *“What’s your sign?”*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 770, 680, 'and your rising?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 790, 900, 'SAGITTARIUS?', pop01(t, P.t0 + 0.9, 0.3, 2.4), LAV, -0.04, 38)
      L(x, 790, 1060, 'HIRED. SO HIRED.', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 34)
    } },
  // 7 · the bonus came gold-wrapped
  { sign: S, cap: 'Your bonus came | *gift-wrapped in gold.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, GIFT, GIFT_C, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 * Math.sin(t * 3) })
      sparkles(x, t, 790, 880, P.t0 + 0.7, 8, 200, 0.3)
      L(x, 790, 1100, 'CARD: SIGNED BY ME', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 30)
    } },
  // 8 · the retreat is their birthday
  { sign: S, cap: 'Company retreat? | *It’s their birthday.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 930, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 680, 'ATTENDANCE: REQUIRED', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  // 9 · defends the team
  { sign: S, cap: 'But they defend the team | *like a lion.*', mood: lt => lt > 0.9 ? 'squint' : 'happy', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      bubble(x, 770, 700, 'NOBODY talks | to MY team', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, col: GOLD, tail: 'bl' })
      L(x, 790, 990, 'ROAR: DEPLOYED', pop01(t, P.t0 + 1.3, 0.3, 2.4), RED, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0489', key: 'D', accent: ACC, solo: S,
  title: 'Leos as your boss | *be like.*',
  cameos: CAMEOS,
  ending: 'lesson',
  group: { cap: 'Dramatic. Loud. | *Weirdly the best.*', mood: 'sparkle' },
  lesson: { text: 'Cheer your Leo boss. | They’ll *cheer louder.*', chip: 'TEAM: GOLDEN' },
  last: { text: 'Meeting adjourned. | *Applause, please.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
