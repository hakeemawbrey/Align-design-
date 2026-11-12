// r2t0422: star_talk, SOLO, "Libras at a party | *be like.*" (~51 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way: nine party Libra moments, each pushed to the extreme. Ending: lesson.
//   0.0–3.6    "Libras at a party | *be like.*"
//   3.6–37.8   two hours late, looked perfect · complimented the lamp · one photo, redid the lighting (take 41)
//              · knew nobody at nine, fourteen best friends by ten · said hi politely, three crushes
//              · asked the host's dog its sign · sorted the snacks by colour · two parties, attended both
//              · said goodbye at midnight, left at three
//  37.8        "Charming everyone. | *Even the lamp.*"
//  41.0        LESSON: "Love a Libra. | They make rooms *glow.*"  VIBE: LOVELY
//  46.9        "Goodbye number 28? | *One more hug.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', GREY = '#9aa5c4', PURP = '#6b62a8', DEEP = '#2a2350'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const B = (x, cx, cy, text, k, o = {}) => bubble(x, cx, cy, text, k, { size: 44, ...o })
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
/** soft pixel puffs rising from (cx, cy) after t0 (steam, sighs, dust) */
function puffs(x, t, cx, cy, t0, { n = 5, col = '#e6e1f2', cell = 14, rise = 200, spread = 90, seed = 0 } = {}) {
  if (t < t0) return
  for (let i = 0; i < n; i++) {
    const ph = (((t - t0) * 0.9 + i / n) % 1 + 1) % 1
    const px = cx + Math.sin(i * 2.1 + seed) * spread * 0.5 + Math.sin(ph * 5 + i) * 12, py = cy - ph * rise, r = cell * (0.8 + ph * 1.4)
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.9
    x.fillStyle = INK; x.fillRect(px - r - 4, py - r * 0.7 - 4, 2 * r + 8, 1.4 * r + 8)
    x.fillStyle = col; x.fillRect(px - r, py - r * 0.7, 2 * r, 1.4 * r)
    x.restore()
  }
}
/** a sticky note / paper card with lines of text */
function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800 } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.55, h = lines.length * lh + 50
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 25 + lh * (i + 0.5)))
  x.restore()
}
/** a birth-chart wheel */
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.4 - 8, Math.sin(a) * r * 0.4 - 8, 16, 16)
  x.restore()
}
/** a little anger mark (four red corner ticks) */
function vein(x, cx, cy, k, t) {
  if (k <= 0.01) return
  const s = 9 * k * (1 + 0.15 * Math.sin(t * 14))
  x.save(); x.translate(cx, cy)
  for (const [dx, dy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { x.fillStyle = INK; x.fillRect(dx * s * 1.6 - s * 0.9, dy * s * 1.6 - s * 0.9, s * 1.8, s * 1.8); x.fillStyle = RED; x.fillRect(dx * s * 1.6 - s * 0.6, dy * s * 1.6 - s * 0.6, s * 1.2, s * 1.2) }
  x.restore()
}
const ACC = '#ff8fb1'
const LAMP = ['..YYYYYY..', '.YYYYYYYY.', 'YYYYYYYYYY', '....GG....', '....GG....', '....GG....', '....GG....', '..GGGGGG..']
const LAMP_C = { Y: '#ffe27a', G: GREY }
const DOG = ['DD.....DD.', 'DDDDDDDDD.', 'DWKDDDKWD.', 'DDDDNNDDD.', '.DDDDDDDD.', '..DTTTTD..']
const DOG_C = { D: '#e8b07a', W: '#ffffff', K: INK, N: '#2a2350', T: PINK }
const BOWL = ['.X.XX.X.', 'XXXXXXXX', 'KKKKKKKK', 'KBBBBBBK', '.KBBBBK.', '..KKKK..']
const HOUSE = ['....RR....', '...RRRR...', '..RRRRRR..', '.RRRRRRRR.', 'RRRRRRRRRR', '.WWWWWWWW.', '.WYYWWYYW.', '.WYYWWYYW.', '.WWWDDWWW.', '.WWWDDWWW.']

function ring(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.lineWidth = 34; x.strokeStyle = INK; x.beginPath(); x.arc(0, 0, r, 0, 7); x.stroke()
  x.lineWidth = 22; x.strokeStyle = '#fff8e0'; x.shadowColor = '#fff1b0'; x.shadowBlur = 40 + 10 * Math.sin(t * 6); x.beginPath(); x.arc(0, 0, r, 0, 7); x.stroke()
  x.shadowBlur = 0; x.fillStyle = INK; x.fillRect(-8, r + 10, 16, 200); x.fillStyle = GREY; x.fillRect(-4, r + 12, 8, 196)
  x.restore()
}

const CAMEOS = [
  // 1 · arriving
  { sign: 'libra', cap: 'Two hours late. | Looked *perfect.*', mood: lt => lt < 1.0 ? 'happy' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      L(x, 790, 640, 'PARTY: 9PM', pop01(t, P.t0 + 0.15, 0.3, 2), BONE, -0.04, 40)
      L(x, 790, 760, 'ARRIVED: 11PM', pop01(t, P.t0 + 0.6, 0.3, 2), PINK, 0.05, 40)
      bubble(x, 790, 980, 'wow. | WOW.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 50, col: LAV, tail: 'bl' })
      sparkles(x, t, 370, 880, P.t0 + 1.1, 8, 190, 0.2)
    } },
  // 2 · the lamp
  { sign: 'libra', cap: 'Complimented everyone. | *Including the lamp.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, LAMP, LAMP_C, 800, 990, 24 * pop01(t, P.t0 + 0.15, 0.3, 2))
      x.save(); x.globalAlpha = 0.25 + 0.1 * Math.sin(t * 4); x.fillStyle = '#ffe27a'; x.beginPath(); x.ellipse(800, 920, 170, 90, 0, 0, 7); x.fill(); x.restore()
      bubble(x, 760, 650, 'love your | glow!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 48, tail: 'bl' })
      L(x, 800, 1170, 'LAMP: FLATTERED', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  // 3 · the photo
  { sign: 'libra', cap: 'One quick photo. | Redid *the lighting.*', mood: 'sparkle', star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      ring(x, 790, 820, 120, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 790, 820, `TAKE ${Math.min(41, 1 + Math.floor(Math.max(0, lt - 0.4) * 30))}`, pop01(t, P.t0 + 0.4, 0.3, 2), BONE, 0.04, 40)
      L(x, 470, 600, 'ANGLES: STUDIED', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, -0.05, 32)
    } },
  // 4 · strangers to best friends
  { sign: 'libra', cap: 'Knew nobody at nine. | *Fourteen besties* by ten.', mood: 'heart', star: { x: 0, y: -90, s: 280 },
    front(x, t, lt, P) {
      const ids = ['aries', 'gemini', 'leo', 'scorpio', 'sagittarius', 'aquarius']
      ids.forEach((id, i) => { const k = pop01(t, P.t0 + 0.3 + i * 0.14, 0.3, 2); if (k > 0.01) signChar(x, t, id, 215 + i * 130, 1060, 120 * k, { mood: 'happy', look: [i < 3 ? 1 : -1, -1], seed: 30 + i, glyph: false }) })
      hearts(x, t, 540, 700, P.t0 + 1.2, { n: 6, life: 1.8, spread: 360, cell: 7, seed: 8 })
      L(x, 540, 560, 'NEW BESTIES: 14', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.03, 38)
    } },
  // 5 · polite = flirting
  { sign: 'libra', cap: 'Just said hi. | Now *three crushes.*', mood: lt => lt < 1.0 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 470, 590, 'hi!', pop01(t, P.t0 + 0.2, 0.25, 2.4), { size: 52, tail: 'bc' })
      for (let i = 0; i < 3; i++) label(x, 800 + (i - 1) * 30, 720 + i * 150, ['CRUSH #1 ♡', 'CRUSH #2 ♡', 'CRUSH #3 ♡'][i], pop01(t, P.t0 + 0.7 + i * 0.3, 0.3, 2.2), { size: 34, bg: [PINK, LAV, '#ff6b5a'][i], rot: (i - 1) * 0.06, font: MONO, weight: 700 })
      hearts(x, t, 370, 800, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 1 })
    } },
  // 6 · Align: what's your sign? (the dog)
  { sign: 'libra', cap: 'Asked the host’s dog | *its sign.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, DOG, DOG_C, 790, 970, 26 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.04 * Math.sin(t * 5) })
      bubble(x, 600, 640, 'what’s your | sign, cutie?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 760, 1160, '✦ DOG: LEO', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.03, 38)
    } },
  // 7 · the snack table
  { sign: 'libra', cap: 'Sorted the snacks | by *colour.*', mood: lt => lt < 1.2 ? 'squint' : 'sparkle', star: { x: 0, y: -110, s: 260 },
    front(x, t, lt, P) {
      const cols = ['#ff6b5a', ORANGE, '#ffe27a', '#5fd068', SKYB, LAV]
      const sorted = lt > 1.1
      const order = sorted ? [0, 1, 2, 3, 4, 5] : [3, 0, 5, 2, 4, 1]
      for (let i = 0; i < 6; i++) drawBits(x, BOWL, { X: cols[order[i]], K: INK, B: GREY }, 202 + i * 135, 1020, 15 * pop01(t, P.t0 + 0.15 + i * 0.06, 0.3, 2))
      L(x, 540, 1160, sorted ? 'RAINBOW ACHIEVED' : 'CHAOS', pop01(t, P.t0 + (sorted ? 1.1 : 0.4), 0.3, 2.2), sorted ? MINT : RED, -0.03, 36, sorted ? INK : CREAM)
      if (sorted) sparkles(x, t, 540, 1060, P.t0 + 1.15, 8, 280, 0.2)
    } },
  // 8 · two parties
  { sign: 'libra', cap: 'Two parties, same night? | *Attended both.*', mood: 'happy', star: { x: 0, y: 40, s: 240 },
    front(x, t, lt, P) {
      const H = { R: '#ff6b5a', W: CREAM, Y: '#ffe27a', D: '#8a4a2e' }, H2 = { ...H, R: SKYB }
      drawBits(x, HOUSE, H, 260, 930, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      drawBits(x, HOUSE, H2, 820, 930, 22 * pop01(t, P.t0 + 0.25, 0.3, 2))
      L(x, 260, 1140, 'PARTY A', pop01(t, P.t0 + 0.4, 0.3, 2), PINK, -0.05, 32)
      L(x, 820, 1140, 'PARTY B', pop01(t, P.t0 + 0.5, 0.3, 2), SKYB, 0.05, 32)
      notes(x, t, 260, 760, { n: 3, cell: 6, col: PINK, alpha: clamp(lt), seed: 1 }); notes(x, t, 820, 760, { n: 3, cell: 6, col: SKYB, alpha: clamp(lt), seed: 4 })
      L(x, 540, 620, 'STAYED: BOTH', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.03, 38)
    } },
  // 9 · leaving
  { sign: 'libra', cap: 'Said goodbye at midnight. | Left *at three.*', mood: lt => lt < 1.2 ? 'heart' : 'sleepy', star: ST,
    keyCue: t0 => ['pluck', t0 + 1.5, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 640, `GOODBYE #${Math.min(27, 1 + Math.floor(Math.max(0, lt - 0.3) * 22))}`, pop01(t, P.t0 + 0.2, 0.3, 2), PINK, -0.04, 44)
      bubble(x, 790, 860, 'ok one more | hug!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 46, tail: 'bl' })
      L(x, 790, 1100, '3:02 AM', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, 0.05, 40)
    } },
]

const F = makeFilm({
  id: 'r2t0422', key: 'E', accent: ACC, solo: 'libra', ending: 'lesson',
  title: 'Libras at a party | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Charming everyone. | *Even the lamp.*', mood: 'heart' },
  lesson: { text: 'Love a Libra. | They make rooms *glow.*', chip: 'VIBE: LOVELY' },
  last: {
    text: 'Goodbye number 28? | *One more hug.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 600, cell: 8, seed: 6 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
