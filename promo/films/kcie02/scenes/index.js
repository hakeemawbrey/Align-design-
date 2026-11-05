// kcie02: CAUGHT IN 4K, "Gemini typed LMAO with a straight face" (short, loop, music: pop · F). Rows: promo/films/month2/m02.md #2
// World time w:
//   0.0  the night bus. The crush texts "my cat sneezed and scared herself off the couch". Gemini LOSES IT out loud:
//        HA! HA! HAAA!, the whole bus turns round. Pisces in the next seat is crying-laughing.
//   3.2  Gemini composes themself (*ahem*).
//   4.0  a friend: "I tried to catch fog yesterday." "mist." Thumbs: "HAHAHA STOP". Face: nothing. FACE 0% · THUMBS 100%.
//   6.1  the friend: "what do clouds wear?" "thunderwear". Gemini types "LMAOOOO IM DEAD", face perfectly blank.
//   8.3  = the freeze (frame 0). Last line during the final freeze: "Dead inside. Thumbs: thriving." → loops.
import {
  makeCaught, room, phone, typed, star, pisces, bubble, sticker, label, box, R, sparkles, confetti,
  pop01, outK, prog, clamp, INK, BONE, GOLD, PINK, RED, MINT, INTER,
} from '../../kcie01/caughtkit.js'

const C = 8.3
const GEM = { x: 330, y: 1290, s: 340 }
const PH = { cx: 790, cy: 960, w: 400, h: 700 }
const PIS = { x: 860, y: 1520, s: 180 }
const MSGS = [
  { w: 0.3, side: 'L', text: 'my cat sneezed and scared herself off the couch', col: '#ffd6e6' },
  { w: 4.0, side: 'L', text: 'I tried to catch fog yesterday' },
  { w: 4.5, side: 'L', text: 'mist.' },
  { w: 5.7, side: 'R', text: 'HAHAHA STOP' },
  { w: 6.1, side: 'L', text: 'what do clouds wear?' },
  { w: 6.6, side: 'L', text: 'thunderwear' },
  { w: 8.0, side: 'R', text: 'LMAOOOO IM DEAD' },
]
const LAUGH = [[0.9, 'HA!', -0.2, 180, 760], [1.25, 'HA!', 0.15, 470, 700], [1.6, 'HAAA!', -0.1, 250, 640], [2.0, 'HA HA!', 0.2, 520, 820]]

function bus(x, w) {
  room(x, 'bus', { fy: 1460 })
  // the long window strip with the city sliding past
  box(x, 30, 470, 1020, 420, '#0e0a26', { b: 8 })
  for (let i = 0; i < 18; i++) {
    const px = ((i * 151 - w * 260) % 1400 + 1400) % 1400 - 160, h = 120 + (i * 53) % 200
    R(x, '#251c52', px, 890 - h, 110, h); for (let j = 0; j < 4; j++) R(x, (i + j) % 3 ? GOLD : '#fff3c4', px + 18 + (j % 2) * 44, 890 - h + 24 + Math.floor(j / 2) * 46, 22, 22)
  }
  for (const px of [290, 560, 830]) R(x, '#3a4a6c', px, 470, 14, 420)
  R(x, '#c9c2d6', 0, 390, 1080, 16)
  for (const px of [150, 930]) { R(x, '#c9c2d6', px, 400, 18, 1060) }
  // seats
  for (const [X, col] of [[40, '#d0566e'], [600, '#d0566e']]) { box(x, X, 1230, 440, 90, col, { b: 6, hi: '#e57a8f' }); box(x, X, 1000, 440, 230, col, { b: 6, hi: '#e57a8f' }) }
}

function world(x, w) {
  bus(x, w)
  // the passengers in the back turn round when Gemini laughs
  const stare = w > 1.0 && w < 3.4
  star(x, w, 'taurus', { x: 160, y: 900, s: 120, mood: stare ? 'wide' : 'sleepy', look: stare ? [1, 0.3] : undefined, seed: 8, glyph: false, shadow: false })
  star(x, w, 'capricorn', { x: 470, y: 905, s: 110, mood: stare ? 'squint' : 'neutral', look: stare ? [-1, 0.3] : [1, 0], seed: 9, glyph: false, shadow: false })
  if (stare) { label(x, '?!', 160, 800, { size: 46, col: GOLD, alpha: pop01(w, 1.1, 0.2, 2.6) }); label(x, '…', 470, 810, { size: 46, col: BONE, alpha: pop01(w, 1.3, 0.2, 2.6) }) }
  // Gemini
  let mood = 'neutral', look = [1, -0.3], squash = 0, blink
  if (w > 0.35 && w < 0.85) { mood = 'wide'; look = [1, -0.4] }
  if (w > 0.85 && w < 3.2) { mood = 'happy'; look = undefined; squash = 0.08 * Math.abs(Math.sin(w * 14)) }
  if (w > 3.2 && w < 4.0) { mood = 'squint'; look = [0, 0] }
  if (w > 4.0) { mood = 'neutral'; look = [0, 0]; blink = false }
  const hops = [0.9, 1.15, 1.4, 1.65, 1.9, 2.15, 2.4, 3.25]
  star(x, w, 'gemini', { ...GEM, mood, look, hops, squash, blink, seed: 4 })
  LAUGH.forEach(([a, txt, rot, lx, ly]) => { if (w > a && w < 3.2) label(x, txt, lx, ly - 60 * prog(w, a, a + 1.5), { size: 74, col: GOLD, font: INTER, weight: 800, rot, alpha: pop01(w, a, 0.2, 2.8) * outK(w, [2.9, 3.2]) }) })
  if (w > 3.2 && w < 4.0) label(x, '*ahem*', 330, 900, { size: 50, col: BONE, font: INTER, weight: 800, alpha: pop01(w, 3.25, 0.2, 2.4) * outK(w, [3.8, 4.0]) })
  // the FACE / THUMBS meters
  if (w > 4.6) {
    const k = pop01(w, 4.6, 0.3, 2.2)
    x.save(); x.translate(330, 830); x.scale(k, k)
    box(x, -230, -70, 460, 140, 'rgba(16,9,38,0.92)', { b: 6 })
    label(x, 'FACE', -205, -30, { size: 30, col: BONE, align: 'left' }); label(x, 'THUMBS', -205, 30, { size: 30, col: BONE, align: 'left' })
    for (let i = 0; i < 5; i++) { R(x, '#3a3060', -40 + i * 50, -48, 40, 36); R(x, '#3a3060', -40 + i * 50, 12, 40, 36) }
    const th = clamp((w - 4.7) / 0.6)
    for (let i = 0; i < 5; i++) if (th > i / 5) R(x, MINT, -40 + i * 50, 12, 40, 36)
    label(x, '0%', 225, -30, { size: 26, col: RED, align: 'right' }); label(x, `${Math.round(th * 100)}%`, 225, 30, { size: 26, col: MINT, align: 'right' })
    x.restore()
  }
  // the phone
  const d1 = typed('HAHAHA STOP', w, 4.95, 16), d2 = typed('LMAOOOO IM DEAD', w, 7.0, 16)
  const draft = w > 4.9 && w < 5.7 ? { text: d1 } : w > 6.95 && w < 8.0 ? { text: d2 } : null
  phone(x, w, { ...PH, rot: 0.05 + 0.015 * Math.sin(w * 2.3), title: w < 4 ? '♡ them' : 'bestie', msgs: w < 4 ? MSGS.slice(0, 1) : MSGS.slice(1), draft, fs: 30 })
  if (w > 8.0) sparkles(x, w, PH.cx + 80, PH.cy + 200, 8.0, 8, 120, 3, [GOLD, MINT, BONE])
  // Pisces: crying-laughing, then crying at the jokes too
  const pm = w > 0.9 && w < 3.4 ? 'happy' : w > 6.6 ? 'happy' : 'sparkle'
  pisces(x, w, { ...PIS, mood: pm, look: [-1, -0.5], tears: w > 0.9 && w < 3.4 ? 3 : w > 6.6 ? 3 : 2, hops: [1.0, 1.3, 1.6, 1.9, 6.7, 7.0] })
  bubble(x, w, PIS.x - 10, PIS.y - 190, 1.3, 3.3, 'I CAN’T BREATHE', { size: 32, col: '#bfe9ff', tail: 0.3 })
  bubble(x, w, PIS.x - 30, PIS.y - 190, 6.7, C + 3, 'thunderwear!!', { size: 32, col: '#bfe9ff', tail: 0.3 })
  confetti(x, w, 0.9, 330, 1000, { n: 16, spread: 300, life: 1.6 })
}

const EP = makeCaught({
  id: 'kcie02', sign: 'gemini', name: 'Gemini',
  hook: 'Typed LMAO. | Face did *not* move.', hookColor: '#ffd23a',
  earlier: '9 MINUTES EARLIER', clock0: '22:31', clockScale: 60,
  catches: [{ s: 0, c: C, circle: () => ({ x: GEM.x, y: GEM.y - 20, rx: 225, ry: 235, lx: 64, ly: 1015, labelSide: 1 }) }],
  ending: 'loop', last: 'Dead inside. | *Thumbs: thriving.*', lastColor: '#ffd23a',
  world,
  cues: [
    ['pop', 0.3, 987.77, 0.05, 0.3], ['pop', 0.4, 1318.51, 0.04, 0.3],
    ...LAUGH.flatMap(([a], i) => [['pop', a, [523.25, 587.33, 659.25, 783.99][i], 0.06, i % 2 ? 0.3 : -0.3], ['tom', a, 160 + i * 20, { gain: 0.18, decay: 0.15 }]]),
    ['glitter', 0.9, 1.4], ['pluck', 1.1, 1567.98, 0.03, 0.4, -0.5],
    ['pop', 3.25, 440, 0.04, 0], ['pop', 4.0, 880, 0.04, 0.3], ['pop', 4.5, 987.77, 0.04, 0.3],
    ...Array.from({ length: 11 }, (_, i) => ['tick', +(4.95 + i * 0.0625).toFixed(3), 0.02]), ['pop', 5.7, 1174.66, 0.045, 0.2],
    ['riser', 4.65, 5.3, 0.02], ['bell', 5.3, 1760, 0.02, 0.6, -0.3],
    ['pop', 6.1, 880, 0.04, 0.3], ['pop', 6.6, 987.77, 0.04, 0.3], ['pluck', 6.7, 1318.51, 0.03, 0.4, 0.5],
    ...Array.from({ length: 15 }, (_, i) => ['tick', +(7.0 + i * 0.0625).toFixed(3), 0.02]), ['pop', 8.0, 1174.66, 0.05, 0.2], ['pop', 8.08, 1567.98, 0.04, 0.2],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, sticker]
