// r2a0486: star_advice, ADVICE SOLO (virgo), "Virgo, it's okay | *to miss them.*" (signs3kit social cut, music: lofi · D).
// Ending: card (lesson, then the last line over the Virgo + Pisces match card).
//   reread the old texts (allowed) · deep-cleaned to forget (feelings aren't dust) · pros-and-cons list (the heart didn't
//   read it) · still know their order (that's love) · sad booked for 4, came early (okay) · kept the hoodie, folded
//   perfectly · read their chart again (missing is human) · "stop missing them" isn't a task · missing means it mattered.
//   group "Sorted everything. | Except the heart."  lesson "Missing them isn't a mess. | It's a big heart."
//   last "Pisces says: | cry with me." over Virgo + Pisces.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'virgo', ACC = '#7dffb0', CREAM = '#fff4e2', RED = '#e23d4e', SLATE = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

// a phone with a short thread
function phone(x, cx, cy, k, rows) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-140, -230, 280, 460, 34); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.roundRect(-128, -218, 256, 436, 26); x.fill()
  x.fillStyle = '#140c30'; x.fillRect(-112, -190, 224, 380)
  rows.forEach(([text, me, a], i) => {
    if (a <= 0.01) return
    x.globalAlpha = a; x.font = `700 26px ${INTER}`; const w = x.measureText(text).width + 30
    const bx = me ? 100 - w : -100, by = -160 + i * 78
    x.fillStyle = me ? '#7dffb0' : LAV; x.beginPath(); x.roundRect(bx, by, w, 54, 16); x.fill()
    x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(text, bx + 15, by + 28)
  })
  x.restore()
}
// a sheet of paper: a head and rows [text, colour, k, struck?, checked?]
function sheet(x, cx, cy, k, { w = 330, h = 330, head, headCol = ACC, rows = [], rot = 0.04 }) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 62)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 33)
  x.textAlign = 'left'; x.font = `700 26px ${MONO}`
  rows.forEach(([text, col, a, struck, box], i) => {
    if (a <= 0.01) return
    const y = -h / 2 + 110 + i * 64
    x.globalAlpha = a; x.fillStyle = col || INK
    let tx = -w / 2 + 24
    if (box !== undefined) { x.fillStyle = INK; x.fillRect(tx, y - 16, 32, 32); x.fillStyle = CREAM; x.fillRect(tx + 5, y - 11, 22, 22); if (box) { x.fillStyle = '#2fc79a'; x.fillRect(tx + 8, y - 8, 16, 16) } tx += 48; x.fillStyle = col || INK }
    x.fillText(text, tx, y + 2)
    if (struck) { const tw = x.measureText(text).width; x.fillStyle = RED; x.fillRect(tx - 6, y - 2, (tw + 12) * clamp(struck), 6) }
    x.globalAlpha = 1
  })
  x.restore()
}
const SPRAY = [
  '..KKK...',
  '..KWK...',
  '.KKKKKK.',
  '..BB....',
  '.BBBB...',
  '.BSSB...',
  '.BSSB...',
  '.BSSB...',
  '.BBBB...',
]
const SPRAY_C = { K: '#6b62a8', W: CREAM, B: SKYB, S: '#ffffff' }
const CUP = [
  '.LLLLLLL..',
  'LLLLLLLLL.',
  '.CCCCCCC..',
  '.CWWWWWCHH',
  '.CWWWWWC.H',
  '.CCCCCCCHH',
  '.CCCCCCC..',
  '..CCCCC...',
]
const CUP_C = { L: '#6b62a8', C: '#e0a56a', W: CREAM, H: '#e0a56a' }
const HOODIE = [
  '....GGGG....',
  '...GGGGGG...',
  '.GGGGGGGGGG.',
  'GGGGGGGGGGGG',
  'GGGGWWWWGGGG',
  'GGGGGGGGGGGG',
  'GGGGGGGGGGGG',
  'GGPPPPPPPPGG',
]
const HOODIE_C = { G: '#9aa5c4', W: CREAM, P: '#6b7590' }
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.4 - 8, Math.sin(a) * r * 0.4 - 8, 16, 16)
  x.restore()
}
// a little framed photo of two stars
function photo(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -130, 300, 260); x.fillStyle = GOLD; x.fillRect(-142, -122, 284, 244)
  x.fillStyle = '#2a2350'; x.fillRect(-120, -100, 240, 200)
  drawBits(x, ['..Y..', '.YYY.', 'YYYYY', '.Y.Y.'], { Y: ACC }, -45, 10, 16)
  drawBits(x, ['..Y..', '.YYY.', 'YYYYY', '.Y.Y.'], { Y: PINK }, 45, 10, 16)
  x.restore()
}

const ST = { x: -170 }
const CAMEOS = [
  // 1 · rereading old texts
  { sign: S, cap: 'Reread the old texts? | *That’s allowed.*', mood: lt => lt > 1.3 ? 'happy' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 840, 1.12 * pop01(t, P.t0 + 0.2, 0.3, 2), [['miss u', false, pop01(t, P.t0 + 0.4, 0.2, 2)], ['same', true, pop01(t, P.t0 + 0.6, 0.2, 2)], ['call later?', false, pop01(t, P.t0 + 0.8, 0.2, 2)]])
      L(x, 790, 1150, 'READ: 40 TIMES', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 32)
    } },
  // 2 · deep-cleaned to forget
  { sign: S, cap: 'Deep-cleaned to forget. | *Feelings aren’t dust.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SPRAY, SPRAY_C, 780 + Math.sin(t * 10) * 5, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.15 })
      sparkles(x, t, 780, 860, P.t0 + 0.6, 8, 190, 0.4, [SKYB, BONE])
      L(x, 790, 1130, 'HOUSE: SPOTLESS', pop01(t, P.t0 + 1.0, 0.3, 2.4), SKYB, -0.04, 32)
      L(x, 780, 620, 'HEART: STILL SOFT', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.04, 30)
    } },
  // 3 · pros and cons
  { sign: S, cap: 'Made a pros-and-cons list. | Your heart *skipped it.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'PROS | CONS', rows: [
        ['+ kind', '#2fc79a', pop01(t, P.t0 + 0.4, 0.2, 2)], ['+ funny', '#2fc79a', pop01(t, P.t0 + 0.6, 0.2, 2)], ['- left', RED, pop01(t, P.t0 + 0.8, 0.2, 2)],
      ] })
      hearts(x, t, 380, 760, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  // 4 · still know their order
  { sign: S, cap: 'Still know their order? | *That’s love.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CUP, CUP_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 650, 'OAT. EXTRA HOT.', pop01(t, P.t0 + 0.7, 0.3, 2.4), GOLD, -0.04, 32)
      L(x, 790, 1120, 'NO NOTES NEEDED', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 30)
    } },
  // 5 · sad booked for 4
  { sign: S, cap: 'Booked sad for 4pm. | It came early. *Okay.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TODAY', headCol: GOLD, rows: [
        ['9:00 tidy', INK, 1], ['12:00 lunch', INK, 1], ['4:00 be sad', RED, 1],
      ] })
      L(x, 790, 1110, 'IT’S 10:15', pop01(t, P.t0 + 0.9, 0.3, 2.4), PINK, 0.05, 36)
    } },
  // 6 · the hoodie
  { sign: S, cap: 'Kept their hoodie. | *Folded it perfectly.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, HOODIE, HOODIE_C, 790, 870, 27 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1100, 'FOLDED WITH LOVE', pop01(t, P.t0 + 1.1, 0.3, 2.4), LAV, -0.04, 32)
      sparkles(x, t, 790, 880, P.t0 + 0.8, 6, 170, 0.2)
    } },
  // 7 · Align: their chart again
  { sign: S, cap: 'Read their chart again? | *Missing is human.*', mood: lt => lt > 1.2 ? 'happy' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 830, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 790, 1060, 'THEIR MOON: STILL CUTE', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, -0.04, 26)
    } },
  // 8 · not a task
  { sign: S, cap: 'Missing them isn’t | *a task to finish.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const strike = ease.inOutCubic(prog(lt, 0.8, 1.3))
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TO DO', rows: [
        ['laundry', INK, 1, 0, true], ['stop missing', INK, 1, strike, false], ['rest', '#2fc79a', pop01(t, P.t0 + 1.4 * 1.29, 0.2, 2), 0, false],
      ] })
    } },
  // 9 · it mattered
  { sign: S, cap: 'Missing them means | *it mattered.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      photo(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2))
      hearts(x, t, 790, 740, P.t0 + 0.9, { n: 6, life: 1.8, spread: 220, cell: 8, seed: 7 })
      L(x, 790, 1080, 'IT REALLY DID', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0486', key: 'D', accent: ACC, solo: S,
  title: 'Virgo, it’s okay | *to miss them.*',
  cameos: CAMEOS,
  ending: 'card',
  card: { a: 'virgo', b: 'pisces', chip: 'ALIGNED' },
  group: { cap: 'Sorted everything. | *Except the heart.*', mood: 'heart' },
  lesson: { text: 'Missing them isn’t a mess. | It’s *a big heart.*', chip: 'HEART: TENDER' },
  last: { text: 'Pisces says: | *cry with me.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
