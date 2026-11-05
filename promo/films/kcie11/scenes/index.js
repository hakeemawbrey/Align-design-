// kcie11: CAUGHT IN 4K, "Pisces cried at their own birthday text" (short, hard cut, music: dreamy · Ab). Rows: m02.md #11
// World time w:
//   0.0  the kitchen table at midnight. Pisces types "happy birthday to my favourite person"… sniffles (1.6).
//   2.3  adds "you make every room warmer" → streams.  3.9 reads it out loud to the plant → happy-tear fountains.
//   5.0  = the freeze (frame 0): mid-sob, tears flying sideways, the text on the phone.
//   5.6  sends it. 6.2 the friend (Cancer) replies "I'M CRYING" (split panel: also crying). 7.0 Pisces cries harder;
//        both phones drip sparkles. Last line 7.6: "Now we're both crying. Perfect." Hard cut 9.2.
import {
  makeCaught, room, furn, phone, star, pisces, bubble, sticker, label, box, R, sparkles, hearts,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, SKYB, INTER,
} from '../../kcie01/caughtkit.js'

const C = 5.0, END = 9.2
const P = { x: 330, y: 1250, s: 330 }, PH = { cx: 790, cy: 880, w: 420, h: 700 }
const L1 = 'happy birthday to my favourite person', L2 = ' you make every room warmer'

function screen(x, w, { sx, sy, sw, sh }) {
  R(x, '#1d1640', sx, sy, sw, 84); label(x, '♡ bestie', sx + sw / 2, sy + 44, { size: 30, col: BONE, font: INTER, weight: 800, shadow: false })
  const sent = w > 5.6
  const txt = L1.slice(0, Math.floor(clamp((w - 0.3) / 1.6) * L1.length)) + (w > 2.3 ? L2.slice(0, Math.floor(clamp((w - 2.3) / 1.4) * L2.length)) : '')
  // the message being written (big, in the draft area / sent bubble)
  x.font = `700 32px ${INTER}`
  const words = txt.split(' '); const lines = []; let cur = ''
  for (const wd of words) { const tt = cur ? cur + ' ' + wd : wd; if (x.measureText(tt).width > sw - 120 && cur) { lines.push(cur); cur = wd } else cur = tt }
  if (cur) lines.push(cur)
  const bh = lines.length * 40 + 30, by = sent ? sy + 110 : sy + sh - bh - 30
  box(x, sx + (sent ? 70 : 16), by, sw - 86, bh, sent ? '#3d7cf0' : '#f6f3ea', { b: 4 })
  x.fillStyle = sent ? '#fff' : INK; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l + (!sent && i === lines.length - 1 && Math.floor(w * 3) % 2 ? '|' : ''), sx + (sent ? 90 : 36), by + 30 + i * 40))
  if (w > 6.2) { const k = pop01(w, 6.2, 0.25, 2.2); x.save(); x.translate(sx + 150, by + bh + 70); x.scale(k, k); box(x, -130, -32, 260, 64, '#efe6d6', { b: 4 }); label(x, 'I’M CRYING', 0, 2, { size: 32, col: INK, font: INTER, weight: 800, shadow: false }); x.restore() }
  // tear drops on the screen
  if (w > 3.9) for (let i = 0; i < 6; i++) { const ph = ((w * 0.8 + i * 0.37) % 1); R(x, '#8fe3ff', sx + 30 + i * 60, sy + 100 + ph * (sh - 120), 10, 16) }
}

function world(x, w) {
  room(x, 'kitchen', { fy: 1430 })
  // kitchen bits: window, cupboards, fridge
  box(x, 60, 360, 380, 300, BONE, { b: 6 }); x.fillStyle = '#140d36'; x.fillRect(74, 374, 352, 272); R(x, '#f4e8cc', 330, 410, 36, 36); R(x, BONE, 244, 360, 12, 300)
  for (let i = 0; i < 2; i++) box(x, 560 + i * 230, 300, 210, 180, '#d9cdb4', { b: 6, hi: '#efe6d6' })
  // the table + the plant (the audience)
  furn.table(x, 420, 1300, 760, '#8a5a32')
  const droop = w > 3.9 && w < 5.6 ? 0.25 * Math.sin(w * 6) : 0
  x.save(); x.translate(120, 1300); x.rotate(droop); x.translate(-120, -1300); furn.plant(x, 120, 1300, 1.3); x.restore()
  if (w > 3.9 && w < 5.6) label(x, '?', 120, 1040, { size: 60, col: BONE, font: INTER, weight: 800 })
  // Pisces
  const tears = w < 1.6 ? 0 : w < 2.3 ? 1 : w < 3.9 ? 2 : 3
  let mood = 'happy', look = [1, -0.4]
  if (w > 1.6) { mood = 'sparkle' }
  if (w > 3.9 && w < 5.6) { mood = 'sparkle'; look = [-1, -0.2] }
  if (w > 6.2) { mood = 'wide'; look = [1, -0.5] }
  if (w > 7.0) { mood = 'sparkle' }
  const sob = w > 3.9 ? 0.06 * Math.abs(Math.sin(w * 11)) : 0
  pisces(x, w, { ...P, mood, look, tears, squash: sob, hops: [1.65, 2.35, 3.95, 4.3, 4.65, 5.65, 6.25, 7.05, 7.35], seed: 6, glyph: true, tips: true })
  // sideways tear fountains (extra, from 3.9)
  if (w > 3.9) for (let i = 0; i < 14; i++) { const ph = (w * 1.6 + i / 14) % 1, d = i % 2 ? 1 : -1; R(x, '#8fe3ff', P.x + d * (60 + 300 * ph), P.y - 60 - 160 * ph + 420 * ph * ph, 14, 20) }
  if (w > 3.9) sparkles(x, w, P.x, P.y - 60, 3.95, 12, 260, 1, ['#8fe3ff', BONE, PINK])
  bubble(x, w, P.x + 10, P.y - 280, 3.95, 5.5, '“…you make every|room warmer…”', { size: 34, tail: 0.1 })
  sticker(x, w, 330, 800, 4.0, 5.0, 'reading it *to the plant*', { size: 40, col: GOLD, rot: -0.04 })
  // the phone
  phone(x, w, { ...PH, rot: 0.05 + 0.015 * Math.sin(w * 2), screen })
  if (w > 5.6 && w < 6.0) sparkles(x, w, PH.cx, PH.cy, 5.6, 10, 200, 2)
  // the friend's panel: Cancer, also crying
  if (w > 6.2) {
    const k = pop01(w, 6.2, 0.35, 2)
    x.save(); x.translate(800, 1450); x.scale(k, k)
    box(x, -200, -170, 400, 340, '#2a1f4e', { b: 8 })
    star(x, w, 'cancer', { x: 0, y: 30, s: 220, mood: 'sparkle', tears: 3, look: [-1, 0], hops: [6.4, 6.8, 7.2], seed: 5, shadow: false })
    label(x, 'MEANWHILE', 0, -135, { size: 26, col: GOLD })
    x.restore()
  }
  if (w > 7.0) hearts(x, w, 7.05, 540, 1150, { n: 7, spread: 400 })
}

const EP = makeCaught({
  id: 'kcie11', sign: 'pisces', name: 'Pisces',
  hook: 'Crying at *my own text.* | Again.', hookColor: '#8fe3ff',
  earlier: '4 MINUTES EARLIER', clock0: '23:56', clockScale: 48,
  catches: [{ s: 0, c: C, circle: () => ({ x: P.x, y: P.y - 20, rx: 230, ry: 225, lx: 50, ly: 1560, labelSide: 1 }) }],
  frame: { z: 1.1, fx: 540, fy: 1010 },
  ending: 'cut', wEnd: END, lastAt: 7.6,
  last: 'Now we’re both crying. | *Perfect.*', lastColor: '#8fe3ff',
  world,
  cues: [
    ...Array.from({ length: 20 }, (_, i) => ['tick', +(0.3 + i * 0.08).toFixed(3), 0.02]),
    ['pluck', 1.65, 1174.66, 0.03, 0.6, -0.3], ...Array.from({ length: 14 }, (_, i) => ['tick', +(2.3 + i * 0.1).toFixed(3), 0.02]), ['pluck', 2.4, 1318.51, 0.035, 0.6, -0.3],
    ['glitter', 3.95, 4.6], ['pluck', 3.95, 1567.98, 0.04, 0.8, 0], ['pluck', 4.3, 1760, 0.035, 0.8, 0], ['riser', 3.9, 4.9, 0.03],
    ['whoosh', 5.6, 0.3, 0.05], ['pop', 5.62, 1174.66, 0.05, 0.3], ['pop', 6.2, 987.77, 0.05, 0.3], ['whoosh', 6.2, 0.3, 0.04],
    ['glitter', 7.0, 7.6], ['bell', 7.05, 1760, 0.03, 1.2, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [RED, SKYB, lerp, ease, outK]
