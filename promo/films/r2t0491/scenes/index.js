// r2t0491: star_talk, SOLO, "Capricorns on a day off | *be like.*" (~46 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way: nine moments of a Capricorn trying (and failing) to switch off. Ending: callback.
//   0.0–3.6    "Capricorns on a day off | *be like.*"
//   3.6–37.8   alarm still set for 5 · alphabetised the spices · checked email "just once" · a nap, twenty minutes sharp
//              · watched a movie, took notes · bubble bath with the laptop · new hobby, now a business
//              · a match asks their hobbies: "productivity" · by noon, asked the boss for tasks
//  37.8        "Day off. | *Still clocked in.*"
//  41.2        callback: "Tomorrow’s day off? | Alarm’s *already set.*"  The 5 a.m. alarm clock comes back, ringing.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', DEEP = '#2a2350', PURP = '#6b62a8', SLATE = '#9aa5c4'
const ACC = '#9fb7d6'
const S = 'capricorn', ST = { x: -170 }
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

/** a pixel alarm clock with a digital face; ring 0…1 shakes it */
function clock(x, t, cx, cy, k, text, ring = 0) {
  if (k <= 0.01) return
  const sh = ring * Math.sin(t * 60) * 0.08
  x.save(); x.translate(cx, cy); x.rotate(sh); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -110, 90, 50); x.fillRect(60, -110, 90, 50)
  x.fillStyle = GOLD; x.fillRect(-142, -102, 74, 34); x.fillRect(68, -102, 74, 34)
  x.fillStyle = INK; x.fillRect(-130, 110, 30, 40); x.fillRect(100, 110, 30, 40)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -66, 312, 196)
  x.fillStyle = INK; x.fillRect(-164, -80, 328, 200)
  x.fillStyle = RED; x.fillRect(-154, -70, 308, 180)
  x.fillStyle = '#140c30'; x.fillRect(-124, -40, 248, 120)
  x.fillStyle = MINT; x.font = `700 70px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 22)
  x.restore()
  if (ring > 0.3) for (const s of [-1, 1]) {
    x.save(); x.fillStyle = GOLD; x.globalAlpha = 0.5 + 0.5 * Math.sin(t * 30)
    for (let i = 0; i < 3; i++) x.fillRect(cx + s * (190 + i * 6) * k - 4, cy - 120 * k + i * 34 * k, 22 * k, 8 * k)
    x.restore()
  }
}
/** a paper card with lines of text */
function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800, col = INK } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.5, h = lines.length * lh + 46
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 23 + lh * (i + 0.5)))
  x.restore()
}
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
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 22
    x.save(); x.translate(right ? 96 - w : -96, -62 + i * 62); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 11, 2)
    x.restore()
  })
  x.restore()
}
/** a laptop seen from the front, screen text inside */
function laptop(x, cx, cy, k, lines, { rot = 0.03, screen = '#140c30', ink = MINT } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -130, 340, 230); x.fillStyle = SLATE; x.fillRect(-162, -122, 324, 214)
  x.fillStyle = screen; x.fillRect(-148, -108, 296, 186)
  x.fillStyle = INK; x.fillRect(-200, 96, 400, 34); x.fillStyle = '#c9c9d8'; x.fillRect(-192, 100, 384, 22)
  x.fillStyle = ink; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -60 + i * 44))
  x.restore()
}
const JAR = ['.KKKK.', 'KKKKKK', 'GGGGGG', 'GWWWWG', 'GWWWWG', 'GWWWWG', 'GGGGGG']
const CANDLE = ['...F...', '..FYF..', '..FYF..', '...K...', 'CCCCCCC', 'CCCCCCC', 'CCCCCCC', 'CCCCCCC', 'CCCCCCC', 'CCCCCCC']
const CANDLE_C = { F: ORANGE, Y: '#fff1b0', K: INK, C: PINK }
const POP = ['.W.W.W.', 'WWYWWYW', 'RWRWRWR', 'RWRWRWR', '.RWRWR.', '.RWRWR.']
const POP_C = { W: CREAM, Y: GOLD, R: RED }
const BRIEF = ['..KKKK..', '..K..K..', 'BBBBBBBB', 'BBBBBBBB', 'BBBGGBBB', 'BBBBBBBB', 'BBBBBBBB']
const BRIEF_C = { K: INK, B: '#8a5a3a', G: GOLD }
/** soap bubbles drifting up */
function suds(x, t, cx, cy, { n = 9, spread = 420, rise = 260 } = {}) {
  for (let i = 0; i < n; i++) {
    const ph = ((t * 0.35 + i / n) % 1 + 1) % 1
    const bx = cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(ph * 6 + i) * 10, by = cy - ph * rise, r = 14 + (i % 3) * 8
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph)
    x.strokeStyle = '#e6f6ff'; x.lineWidth = 4; x.beginPath(); x.arc(bx, by, r, 0, Math.PI * 2); x.stroke()
    x.fillStyle = '#ffffff'; x.fillRect(bx - r * 0.5, by - r * 0.5, 5, 5)
    x.restore()
  }
}

const CAMEOS = [
  // 1 · the alarm
  { sign: S, cap: 'Day off. | Alarm still set *for 5.*', mood: lt => lt < 0.9 ? 'sleepy' : 'wide', star: ST, hops: [0.95],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      clock(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), '5:00', lt > 0.85 ? 1 : 0)
      L(x, 790, 1080, 'BRRRING', pop01(t, P.t0 + 0.9, 0.25, 2.4), GOLD, 0.05, 40)
      L(x, 380, 600, 'DAY OFF', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.05, 36)
    } },
  // 2 · the spice rack
  { sign: S, cap: 'Relaxing? | Alphabetised *the spices.*', mood: lt => lt < 1.3 ? 'squint' : 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.fillStyle = INK; x.fillRect(600, 960, 380 * k, 22); x.fillStyle = '#c98f2a'; x.fillRect(606, 964, 368 * k, 14); x.restore()
        const lab = ['A', 'B', 'C', 'D', 'E']
        lab.forEach((s, i) => {
          const kk = pop01(t, P.t0 + 0.3 + i * 0.18, 0.25, 2)
          const jx = 640 + i * 74, jy = 905
          drawBits(x, JAR, { K: INK, G: ['#ffb34a', '#e23d4e', '#5fd068', '#c97bff', '#8fe3ff'][i], W: CREAM }, jx, jy, 11 * kk)
          if (kk > 0.5) { x.save(); x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, jx, jy + 12); x.restore() }
        })
      }
      L(x, 790, 760, 'A TO Z. FINALLY.', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 34)
      sparkles(x, t, 790, 900, P.t0 + 1.4, 7, 190, 0.4)
    } },
  // 3 · email
  { sign: S, cap: 'Checked email | “*just once.*”', mood: lt => lt < 1.2 ? 'squint' : 'eyeroll', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 13)
      phone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'INBOX', headCol: SKYB, lines: [['re: re: Q3', BONE, pop01(t, P.t0 + 0.5, 0.2, 2)], ['fwd: notes', BONE, pop01(t, P.t0 + 0.7, 0.2, 2)], ['re: notes', BONE, pop01(t, P.t0 + 0.9, 0.2, 2)]] })
      L(x, 790, 1110, `CHECKS: ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2), RED, 0.04, 38, CREAM)
    } },
  // 4 · the nap
  { sign: S, cap: 'Took a nap. | *Twenty minutes,* sharp.', mood: lt => lt < 1.5 ? 'sleepy' : 'wide', star: ST, hops: [1.55],
    front(x, t, lt, P) {
      const left = Math.max(0, 20 - Math.floor(clamp((lt - 0.3) / 1.2) * 20))
      L(x, 790, 860, `NAP  00:${String(left).padStart(2, '0')}`, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.5 ? RED : LAV, -0.03, 54, lt > 1.5 ? CREAM : INK)
      bubble(x, 790, 1060, 'back to it.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  // 5 · movie night
  { sign: S, cap: 'Watched a movie. | Took *notes.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, POP, POP_C, 360, 1060, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      note(x, 790, 860, pop01(t, P.t0 + 0.3, 0.3, 2), ['NOTES', '1. pacing: slow', '2. hero: lazy', '3. 6/10'], { w: 330, bg: CREAM, size: 32, rot: 0.04, font: MONO, weight: 700 })
      L(x, 790, 610, 'FILED.', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.05, 38)
    } },
  // 6 · bubble bath
  { sign: S, cap: 'Bubble bath. | *With the laptop.*', mood: lt => lt < 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -180, y: 30 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = clamp(k)
      x.fillStyle = INK; x.fillRect(150, 990, 470, 150); x.fillStyle = '#e6f6ff'; x.fillRect(160, 1000, 450, 130)
      x.fillStyle = '#bfe6ff'; x.fillRect(160, 1000, 450, 26)
      x.restore()
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = clamp(k); x.fillStyle = '#ffffff'; for (let i = 0; i < 9; i++) { x.beginPath(); x.arc(180 + i * 52, 1000 + 8 * Math.sin(i * 1.7), 30, 0, Math.PI * 2); x.fill() } x.restore() }
      suds(x, t, 380, 980)
      laptop(x, 790, 860, pop01(t, P.t0 + 0.6, 0.3, 2) * 0.85, ['RELAXING…', '(14 tabs)'])
      L(x, 790, 1080, 'SELF-CARE?', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, 0.05, 34)
    } },
  // 7 · the hobby
  { sign: S, cap: 'New hobby? | Now it’s *a business.*', mood: lt => lt < 1.2 ? 'happy' : 'sparkle', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, CANDLE, CANDLE_C, 730, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 640, 'CANDLE CO.', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.05, 40)
      L(x, 830, 1110, 'EST. THIS MORNING', pop01(t, P.t0 + 1.4, 0.3, 2.2), BONE, 0.04, 28)
    } },
  // 8 · the match
  { sign: S, cap: 'Match asked their hobbies. | “*Productivity.*”', mood: lt => lt < 1.3 ? 'neutral' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NEW MATCH', headCol: PINK, lines: [
        ['what do you', LAV, pop01(t, P.t0 + 0.5, 0.2, 2)], ['do for fun?', LAV, pop01(t, P.t0 + 0.6, 0.2, 2)],
        ['productivity', MINT, pop01(t, P.t0 + 1.3, 0.25, 2.2), true], ['…cute?', LAV, pop01(t, P.t0 + 1.9, 0.2, 2)]] })
    } },
  // 9 · by noon
  { sign: S, cap: 'By noon? | Asked the boss *for tasks.*', mood: lt => lt < 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.8],
    front(x, t, lt, P, F) {
      drawBits(x, BRIEF, BRIEF_C, F.x + 150, F.cy + 120, 13 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 700, 'anything | for me?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 800, 960, 'it’s your | DAY OFF.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
    } },
]

const F = makeFilm({
  id: 'r2t0491', key: 'C', accent: ACC, solo: S, ending: 'callback',
  title: 'Capricorn’s day off | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Day off. | *Still clocked in.*', mood: 'squint' },
  last: {
    text: 'Tomorrow’s day off? | Alarm’s *already set.*',
    draw(x, t, lt) {
      const t0 = t - lt
      clock(x, t, 540, 1080, pop01(t, t0 + 0.6, 0.35, 2), '5:00', lt > 1.4 ? 1 : 0)
      label(x, 540, 1300, 'BRRRING', pop01(t, t0 + 1.4, 0.25, 2.4), { size: 44, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
