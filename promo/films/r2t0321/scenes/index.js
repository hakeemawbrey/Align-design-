// r2t0321: star_talk, ROLLCALL, "The signs at | the science fair." (signs3kit social cut, music: lofi · C). Ending: group.
//   ♈ handed themself the blue ribbon · ♉ snack taste test, ate the data · ♊ two projects at once · ♋ built a hug machine
//   · ♌ trophy bigger than the project · ♍ corrected the judges · ♎ which signs match? all of them · ♏ solved the case
//   of the missing donut · ♐ "is the world round?" went to check · ♑ sold the project to investors · ♒ built a time
//   machine, back from Tuesday · ♓ participation ribbon, sobbing with joy.
//  49.2  "Nobody did | the *science.*"  RESULTS: INCONCLUSIVE
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', BLUE = '#4f8bff'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

const RIBBON = [
  '..BBBBB..',
  '.BBWBBBB.',
  'BBBBBBBBB',
  'BBBBYBBBB',
  'BBBBBBBBB',
  '.BBBBBBB.',
  '..BBBBB..',
  '..BB.BB..',
  '.BB...BB.',
  '.BB...BB.',
  'BB.....BB',
]
const BOWL = [
  'C.C..C.C.C',
  'CCCCCCCCCC',
  'WWWWWWWWWW',
  '.WWWWWWWW.',
  '..WWWWWW..',
]
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const TROPHY = [
  'YYYYYYYYYYYY',
  'YYWYYYYYYYYY',
  'YWYYYYYYYYYY',
  '.YYYYYYYYYY.',
  '..YYYYYYYY..',
  '...YYYYYY...',
  '....YYYY....',
  '.....YY.....',
  '.....YY.....',
  '....YYYY....',
  '..KKKKKKKK..',
  '..KKKKKKKK..',
]
const PLANT = ['...G.G...', '..GGGGG..', '.GG.G.GG.', '....G....', '..TTTTT..', '..TTTTT..', '...TTT...']
const DONUT = ['..PPPPP..', '.PPSPPPP.', 'PPP...PPP', 'PP.....PP', 'PPP...PPP', '.PPPPSPP.', '..DDDDD..']
const GLASS = ['..KKKK...', '.KSSSSK..', 'KSWSSSSK.', 'KSSSSSSK.', 'KSSSSSSK.', '.KSSSSK..', '..KKKKK..', '......KK.', '.......KK', '........K']
const CASE = ['...KKKK...', '...K..K...', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBYYBBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB']
const GLOBE = ['..BBBB..', '.BGGBBB.', 'BGGGBBBB', 'BBGBBGGB', 'BBBBGGGB', '.BBBBGB.', '..BBBB..', '...KK...', '.KKKKKK.']
const BRIEF = ['...KKKK...', '...K..K...', 'NNNNNNNNNN', 'NNNNNNNNNN', 'NNNNYYNNNN', 'NNNNNNNNNN', 'NNNNNNNNNN']
const TISSUE = ['...WW....', '..WWWW...', 'BBBBBBBBB', 'BPBBPBBPB', 'BBBBBBBBB', 'BPBBPBBPB', 'BBBBBBBBB']

/** a prize rosette: scalloped circle, two tails, a word in the middle */
function rosette(x, cx, cy, k, col, text, { rot = 0.08, size = 34 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-60, 40); x.lineTo(-100, 230); x.lineTo(-60, 205); x.lineTo(-30, 240); x.lineTo(0, 50); x.fill()
  x.beginPath(); x.moveTo(60, 40); x.lineTo(100, 230); x.lineTo(60, 205); x.lineTo(30, 240); x.lineTo(0, 50); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(-56, 50); x.lineTo(-90, 218); x.lineTo(-60, 196); x.lineTo(-34, 226); x.lineTo(-6, 56); x.fill()
  x.beginPath(); x.moveTo(56, 50); x.lineTo(90, 218); x.lineTo(60, 196); x.lineTo(34, 226); x.lineTo(6, 56); x.fill()
  for (const [r, c] of [[118, INK], [110, col]]) { x.fillStyle = c; x.beginPath(); for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2, rr = i % 2 ? r : r - 16; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) } x.closePath(); x.fill() }
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 74, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 68, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
/** a tri-fold poster board with a title and a few lines */
function poster(x, cx, cy, k, head, { bg = CREAM, headCol = BLUE, rot = 0, lines = 3, w = 300, h = 220 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = 'rgba(27,18,54,0.18)'; x.fillRect(-w / 6 - 2, -h / 2, 4, h); x.fillRect(w / 6 - 2, -h / 2, 4, h)
  x.fillStyle = headCol; x.fillRect(-w / 2 + 16, -h / 2 + 14, w - 32, 50)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 40)
  x.fillStyle = 'rgba(27,18,54,0.35)'
  for (let i = 0; i < lines; i++) x.fillRect(-w / 2 + 30, -h / 2 + 92 + i * 34, w - 60 - (i % 2) * 50, 12)
  x.restore()
}
/** a clipboard with ticks and red corrections */
function clipboard(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-110, -140, 236, 300)
  x.fillStyle = INK; x.fillRect(-124, -156, 248, 312)
  x.fillStyle = '#8a4a2e'; x.fillRect(-118, -150, 236, 300)
  x.fillStyle = CREAM; x.fillRect(-100, -120, 200, 256)
  x.fillStyle = '#9aa5c4'; x.fillRect(-40, -164, 80, 34)
  x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('JUDGE NOTES', 0, -92)
  for (let i = 0; i < 4; i++) {
    const y = -48 + i * 48
    x.fillStyle = 'rgba(27,18,54,0.35)'; x.fillRect(-80, y - 5, 150, 10)
    if (lt > 0.6 + i * 0.3) { x.strokeStyle = RED; x.lineWidth = 7; x.lineCap = 'round'; x.beginPath(); x.moveTo(-86, y - 14); x.lineTo(78, y + 12); x.stroke() }
  }
  x.restore()
}
/** a cardboard time machine: a box with dials and a blinking light */
function timeBox(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-124, -110, 264, 236)
  x.fillStyle = INK; x.fillRect(-136, -126, 272, 252)
  x.fillStyle = '#c9915a'; x.fillRect(-128, -118, 256, 236)
  x.fillStyle = '#a8743f'; x.fillRect(-128, -118, 256, 30)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TIME BOX', 0, -103)
  for (let i = 0; i < 3; i++) {
    const dx = -70 + i * 70
    x.fillStyle = INK; x.beginPath(); x.arc(dx, -20, 26, 0, Math.PI * 2); x.fill()
    x.fillStyle = i === 1 ? MINT : BONE; x.beginPath(); x.arc(dx, -20, 20, 0, Math.PI * 2); x.fill()
    const a = t * (2 + i) + i; x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(dx, -20); x.lineTo(dx + Math.cos(a) * 16, -20 + Math.sin(a) * 16); x.stroke()
  }
  x.fillStyle = Math.floor(t * 4) % 2 ? RED : '#6b2030'; x.fillRect(-20, 40, 40, 40)
  x.restore()
}

const R = { x: -160 }
const CAMEOS = [
  { sign: 'aries', cap: 'Handed themself | the *blue ribbon.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: R, hops: [0.9, 1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 640, 'JUDGING: 2 P.M.', pop01(t, P.t0 + 0.2, 0.3, 2), BONE, 0.04, 30)
      rosette(x, 790, 860, pop01(t, P.t0 + 0.7, 0.3, 2), BLUE, '1ST')
      sparkles(x, t, 790, 860, P.t0 + 0.9, 6, 140, 0.4)
      bubble(x, 790, 1130, 'it is 9 a.m.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Snack taste test. | Ate the *data.*', mood: lt => lt > 1.7 ? 'sleepy' : 'happy', star: R,
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      for (let i = 0; i < 3; i++) drawBits(x, BOWL, { C: i === 1 ? '#e8a24a' : i === 2 ? PINK : GOLD, W: CREAM }, 640 + i * 120, 1080, 14 * k, { alpha: 1 - 0.0 * i })
      poster(x, 790, 790, k, 'BEST SNACK?', { headCol: '#5fd068', lines: 3, w: 280, h: 200 })
    },
    front(x, t, lt, P) {
      L(x, 790, 960, 'RESULTS: EATEN', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.05, 32)
    } },
  { sign: 'gemini', cap: 'Presented two projects. | *At once.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: 0, y: 40, s: 260 },
    back(x, t, lt, P) {
      poster(x, 260, 760, pop01(t, P.t0 + 0.15, 0.3, 2), 'BEES', { headCol: GOLD, w: 250, h: 200, rot: -0.05 })
      poster(x, 820, 760, pop01(t, P.t0 + 0.35, 0.3, 2), 'BLACK HOLES', { headCol: LAV, w: 250, h: 200, rot: 0.05 })
    },
    front(x, t, lt, P) {
      const w = Math.floor(lt * 3) % 2 ? '—and SPACE—' : 'so bees—'
      bubble(x, 540, 1110, w, pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Built a hug machine. | *It works.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: R,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 800, 930, 180 * k, { mood: lt > 1.3 ? 'heart' : 'neutral', look: [-1, 0], seed: 11, glyph: false })
      L(x, 800, 760, 'JUDGE', pop01(t, P.t0 + 0.6, 0.3, 2), '#9aa5c4', 0.05, 32)
      L(x, 790, 1110, 'HUG MATCH ✦', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 34)
      hearts(x, t, 640, 900, P.t0 + 1.3, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Trophy bigger | than the *project.*', mood: 'sparkle', star: { x: -200, y: 30, s: 270 }, hops: [1.0],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.4, 1.8)
      drawBits(x, TROPHY, { Y: GOLD, W: '#fff6c8', K: '#8a4a2e' }, 760, 820, 34 * k)
      sparkles(x, t, 760, 760, P.t0 + 0.6, 8, 220, 0.2)
    },
    front(x, t, lt, P) {
      poster(x, 760, 1120, pop01(t, P.t0 + 1.0, 0.3, 2), 'my project', { headCol: '#ffb34a', w: 180, h: 100, lines: 0 })
      L(x, 760, 600, 'BEST: LEO', pop01(t, P.t0 + 1.5, 0.3, 2.4), '#ffb34a', 0.04, 34)
    } },
  { sign: 'virgo', cap: 'Corrected the judges. | *Politely. Twice.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: R,
    front(x, t, lt, P) {
      clipboard(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      bubble(x, 780, 600, 'small typo!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Which signs match? | Results: *all of them.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: R,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      poster(x, 790, 800, k, 'WHO MATCHES?', { headCol: PINK, lines: 0, w: 300, h: 240 })
      if (k > 0.9) {
        const n = Math.floor(clamp((lt - 0.4) / 1.0) * 12)
        for (let i = 0; i < 12; i++) {
          const cx = 790 + ((i % 4) - 1.5) * 64, cy = 830 + Math.floor(i / 4) * 52
          if (i < n) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: i % 2 ? PINK : '#ff4f86' }, cx, cy, 6)
        }
      }
      L(x, 790, 1080, 'MATCH: EVERYONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Solved the case | of the *missing donut.*', mood: lt => lt > 1.5 ? 'wink' : 'squint', look: [1, 0], star: R,
    front(x, t, lt, P, F) {
      drawBits(x, DONUT, { P: PINK, S: '#ffffff', D: '#c9915a' }, 820, 700, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: lt > 1.0 ? 0.35 : 1 })
      const g = pop01(t, P.t0 + 0.5, 0.3, 2)
      drawBits(x, GLASS, { K: INK, S: SKYB, W: '#ffffff' }, 760 + 30 * Math.sin(t * 2), 910, 20 * g)
      L(x, 800, 1100, 'CASE: CLOSED', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, -0.04, 34)
      bubble(x, 800, 560, 'it was taurus.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Is the world round? | *Went to check.*', mood: 'sparkle', star: { x: 160 }, hops: [0.5, 1.2],
    front(x, t, lt, P) {
      drawBits(x, GLOBE, { B: BLUE, G: '#5fd068', K: '#8a4a2e' }, 300, 760, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 * Math.sin(t * 2) })
      drawBits(x, CASE, { K: INK, B: '#ff9a4a', Y: GOLD }, 860, 1080, 16 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 300, 1060, 'BACK IN 6 MONTHS', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.05, 30)
    } },
  { sign: 'capricorn', cap: 'Sold the project | to *investors.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      poster(x, 300, 760, pop01(t, P.t0 + 0.15, 0.3, 2), 'POTATO BATTERY', { headCol: '#2fc79a', w: 290, h: 200 })
      drawBits(x, BRIEF, { K: INK, N: '#3a2d6b', Y: GOLD }, 300, 990, 18 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 300, 1140, 'SOLD ✦', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.05, 40)
      bubble(x, 760, 600, "let's talk | shares.", pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'aquarius', cap: 'Built a time machine. | Back *from Tuesday.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: R, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      timeBox(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      const fl = lt > 1.0 && lt < 1.2
      if (fl) { x.save(); x.globalAlpha = 0.5; x.fillStyle = MINT; x.fillRect(100, 470, 880, 760); x.restore() }
      bubble(x, 790, 640, 'spoiler: | it rains.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Participation ribbon. | *Sobbing* with joy.', mood: lt => lt < 0.8 ? 'sparkle' : 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: R,
    front(x, t, lt, P) {
      rosette(x, 790, 820, 0.85 * pop01(t, P.t0 + 0.2, 0.3, 2), '#b7a6ff', 'YAY', { rot: -0.06 })
      L(x, 790, 600, 'YOU TRIED!', pop01(t, P.t0 + 0.5, 0.3, 2), LAV, 0.04, 34)
      drawBits(x, TISSUE, { W: '#ffffff', B: SKYB, P: PINK }, 600, 1110, 16 * pop01(t, P.t0 + 1.2, 0.3, 2))
    } },
]

const F = makeFilm({
  id: 'r2t0321', key: 'C', accent: '#7dffb0', ending: 'group',
  title: 'The signs at | the *science fair.*',
  cameos: CAMEOS,
  group: {
    cap: 'Nobody did | the *science.*',
    draw(x, t, lt) { L(x, 540, 700, 'RESULTS: INCONCLUSIVE', pop01(t, t - lt + 1.6, 0.3, 2.4), GOLD, -0.04, 40) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
