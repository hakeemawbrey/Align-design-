// kcie01: CAUGHT IN 4K, "Virgo, voice note, take four" (short, hard cut, music: lofi · D). Rows: promo/films/month2/m02.md #1
// World time w (the story):
//   0.0   bedroom, 11 PM. The crush texts "how was your day?". Virgo jolts. Pisces (the roommate) eats cereal on a beanbag.
//   1.3   TAKE 1: record… "hiii so my day was—" VOICE CRACK. 3.3 deleted.
//   3.6   TAKE 2: "it was good, anyways, so, anyways… ANYWAYS". 5.5 deleted.
//   5.8   TAKE 3: "so today I—" a neighbour's dog: WOOF! WOOF! 7.3 deleted.
//   7.5   Virgo writes a SCRIPT ("VOICE NOTE v4 FINAL (final)"), three crumpled drafts start orbiting their head.
//   8.8   TAKE 4: reading the script, "Hi! My day was good. Thank you for asking." Pisces leans in, crying: "it was beautiful".
//  10.5   = the freeze (frame 0): mid-hold on the mic, three crumpled drafts in the air.
//  11.2   Virgo deletes it anyway… types "good! you?" … sends (13.0). Last line: "Fourteen minutes for 'good! you?'"
import {
  makeCaught, room, furn, phone, typed, star, pisces, tissues, bubble, sticker, label, box, R, drawBits, sparkles, hearts,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, MINT, INTER, MONO,
} from '../caughtkit.js'

const C = 10.5, END = 14.6
const TAKES = [[1.3, 3.3], [3.6, 5.5], [5.8, 7.3], [8.8, 11.2]]
const DELS = [3.3, 5.5, 7.3, 11.25]
const V = { x: 330, y: 1290, s: 360 }
const PH = { cx: 780, cy: 1010, w: 400, h: 700 }
const PIS = { x: 850, y: 1500, s: 180 }

const recScreen = (x, w, { sx, sy, sw, sh }) => {
  const k = TAKES.findIndex(([a, b]) => w >= a && w < b)
  const a = TAKES[k][0], el = w - a
  R(x, '#1d1640', sx, sy, sw, 84); label(x, `VOICE NOTE · TAKE ${k + 1}`, sx + sw / 2, sy + 44, { size: 24, col: BONE, shadow: false })
  // waveform
  for (let i = 0; i < 16; i++) { const h = 12 + 70 * Math.abs(Math.sin(w * 7 + i * 1.7)) * (k === 0 && w > 2.2 && w < 2.7 ? 2 : 1); R(x, '#ff6b7f', sx + 30 + i * 19, sy + 300 - h / 2, 12, h) }
  label(x, `0:${String(Math.min(59, Math.floor(el))).padStart(2, '0')}`, sx + sw / 2, sy + 420, { size: 52, col: BONE, shadow: false })
  // the mic button (held)
  const pulse = 1 + 0.06 * Math.sin(w * 8)
  x.save(); x.translate(sx + sw / 2, sy + sh - 120); x.scale(pulse, pulse)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 66, 0, Math.PI * 2); x.fill(); x.fillStyle = RED; x.beginPath(); x.arc(0, 0, 58, 0, Math.PI * 2); x.fill()
  R(x, '#fff', -12, -30, 24, 40); R(x, '#fff', -4, 14, 8, 14); R(x, '#fff', -18, 26, 36, 6)
  x.restore()
  label(x, 'HOLD TO RECORD', sx + sw / 2, sy + sh - 30, { size: 20, col: 'rgba(239,230,214,0.7)', shadow: false })
}
const MSGS = [{ w: 0.35, side: 'L', text: 'how was your day?' }, { w: 13.0, side: 'R', text: 'good! you?' }]
const CRUMPLE = ['.PPPP.', 'PPQPPP', 'PQPPQP', 'PPPQPP', '.PPPP.']

function world(x, w) {
  room(x, 'bedroom', { fy: 1480 })
  furn.windowFrame ? null : null
  // window, shelf, lamp, bed
  box(x, 70, 560, 300, 330, BONE, { b: 6 }); x.fillStyle = '#140d36'; x.fillRect(84, 574, 272, 302); for (let i = 0; i < 8; i++) R(x, i % 3 ? BONE : GOLD, 100 + (i * 61) % 250, 590 + (i * 37) % 250, 5, 5); R(x, BONE, 214, 560, 12, 330); R(x, BONE, 70, 719, 300, 12)
  furn.shelf(x, 600, 520, 300)
  furn.lamp(x, 1000, 1280, 1)
  furn.bed(x, 60, 1400, 560, '#9a7be0')
  // the dog in the neighbour's window (take 3)
  if (w > 6.2 && w < 7.4) {
    const k = pop01(w, 6.2, 0.2, 2.6) * outK(w, [7.2, 7.4])
    drawBits(x, ['..BB...BB', '.BBBBBBBB', 'BBDBBBDBB', 'BBBBNNBBB', '.BBBBBBB.', '..BB.BB..'], { B: '#c48a52', D: INK, N: '#3a2214' }, 220, 760, 14 * k)
    sticker(x, w, 230, 620, 6.35, 7.35, 'WOOF! *WOOF!*', { size: 40, col: GOLD, rot: -0.12 })
  }
  // Pisces on the beanbag
  box(x, PIS.x - 140, PIS.y + 40, 280, 120, '#3fa0a8', { b: 6, hi: '#62c2c9' })
  const pisMood = w > 9.6 ? 'sparkle' : w > 4 && w < 5.6 ? 'wide' : 'happy'
  const pisTears = w > 9.6 ? 3 : w > 8.8 ? 2 : 1
  pisces(x, w, { ...PIS, mood: pisMood, look: [-1, -0.4], tears: pisTears, hops: [9.7, 10.0, 12.95], squash: w > 9.8 && w < C ? 0.04 : 0 })
  tissues(x, PIS.x + 120, PIS.y + 10, 70)
  if (w < 8.6) { box(x, PIS.x - 120, PIS.y + 10, 70, 40, BONE, { b: 4 }); R(x, GOLD, PIS.x - 112, PIS.y + 12, 54, 10) }     // the cereal bowl
  bubble(x, w, PIS.x - 60, PIS.y - 170, 9.8, END + 1, 'it was *beautiful*'.replace(/\*/g, ''), { size: 34, col: '#bfe9ff', tail: 0.5 })
  // Virgo
  let mood = 'neutral', look = [1, -0.4], squash = 0
  if (w > 0.35 && w < 1.3) { mood = 'wide'; look = [1, -0.6] }
  if (w > 2.4 && w < 3.3) { mood = 'wide'; look = [0, 0] }
  if (w > 4.6 && w < 5.5) { mood = 'squint'; look = [0, 0] }
  if (w > 6.3 && w < 7.3) { mood = 'eyeroll'; look = undefined }
  if (w > 7.5 && w < 8.8) { mood = 'squint'; look = [0.3, 0.8] }
  if (w > 8.8 && w < C) { mood = 'happy'; look = [0.5, 0.6]; squash = 0.05 }
  if (w >= C - 0.05 && w < 11.4) { mood = 'wide'; look = [0, 0] }
  if (w > 11.4) { mood = 'squint'; look = [1, -0.5] }
  if (w > 13.05) { mood = 'happy'; look = [0, 0] }
  const hops = [0.4, 0.7, 1.35, 2.5, 3.65, 4.2, 4.8, 5.85, 6.4, 6.7, 7.6, 8.85, 9.3, 9.8, 13.1]
  star(x, w, 'virgo', { ...V, mood, look, hops, squash, seed: 3, tears: 0 })
  // the script (clipboard)
  if (w > 7.5) {
    const k = pop01(w, 7.5, 0.3, 2.2) * (w > 11.2 ? outK(w, [11.2, 11.5]) : 1)
    x.save(); x.translate(V.x + 40, V.y - 360); x.rotate(-0.08); x.scale(k, k)
    box(x, -150, -130, 300, 260, '#f6f3ea', { b: 6 }); R(x, '#8a5a32', -50, -146, 100, 30)
    label(x, 'VOICE NOTE v4', 0, -80, { size: 26, col: INK, shadow: false, font: INTER, weight: 800 })
    label(x, 'FINAL (final)', 0, -48, { size: 22, col: RED, shadow: false })
    const lines = ['1. "Hi!"', '2. day = good', '3. thank them', '4. DO NOT say', '   "anyways"']
    lines.forEach((l, i) => { const show = clamp((w - 7.7 - i * 0.2) / 0.2); if (show > 0) label(x, l.slice(0, Math.ceil(l.length * show)), -126, -10 + i * 30, { size: 20, col: INK, shadow: false, align: 'left' }) })
    x.restore()
  }
  // three crumpled drafts orbiting Virgo's head (from the script on; mid-air at the freeze)
  if (w > 7.6 && w < 11.6) for (let i = 0; i < 3; i++) {
    const k = pop01(w, 7.6 + i * 0.15, 0.3, 2) * outK(w, [11.3, 11.6]), a = w * 2.4 + i * 2.1
    drawBits(x, CRUMPLE, { P: '#f6f3ea', Q: '#c9bfa8' }, V.x + Math.cos(a) * 230, V.y - 250 + Math.sin(a) * 70, 11 * k, { rot: a })
  }
  // the phone
  const recording = TAKES.some(([a, b]) => w >= a && w < b) && !(w > 11.2)
  const draftTxt = typed('good! you?', w, 11.9, 12)
  phone(x, w, { ...PH, rot: 0.06 + 0.02 * Math.sin(w * 2), title: '♡ them', msgs: MSGS, screen: recording ? recScreen : null, draft: w > 11.5 && w < 13.0 ? { text: draftTxt } : null })
  // DELETED stamps
  DELS.forEach((d, i) => {
    if (w < d || w > d + 0.7) return
    const k = pop01(w, d, 0.15, 2.8) * outK(w, [d + 0.55, d + 0.7])
    x.save(); x.translate(PH.cx, PH.cy - 60); x.rotate(-0.15); x.scale(k, k)
    R(x, RED, -170, -48, 340, 96); R(x, '#fff', -160, -38, 320, 76); R(x, RED, -150, -30, 300, 60)
    label(x, i === 3 ? 'DELETED (4)' : 'DELETED', 0, 2, { size: 40, col: '#fff', font: INTER, weight: 800, shadow: false })
    x.restore()
  })
  // take stickers + what Virgo says
  TAKES.slice(0, 4).forEach(([a, b], i) => sticker(x, w, 560, 600, a, Math.min(b, a + 1.3), `TAKE *${i + 1}*`, { size: 52, col: BONE, rot: [-0.05, 0.04, -0.03, 0.05][i] }))
  bubble(x, w, 360, 880, 1.5, 3.25, 'hiii so my day was—', { size: 40, tail: -0.3 })
  if (w > 2.35 && w < 3.3) label(x, '*VOICE CRACK*', 330, 760, { size: 44, col: PINK, font: INTER, weight: 800, rot: -0.1, alpha: pop01(w, 2.35, 0.2, 3) })
  bubble(x, w, 360, 880, 3.8, 4.6, 'it was good, anyways', { size: 38, tail: -0.3 })
  bubble(x, w, 360, 880, 4.6, 5.45, 'so, anyways… ANYWAYS', { size: 38, tail: -0.3 })
  bubble(x, w, 360, 880, 6.0, 6.3, 'so today I—', { size: 40, tail: -0.3 })
  bubble(x, w, 340, 900, 8.95, C + 0.4, 'Hi! My day was good.|Thank you for asking.', { size: 36, tail: -0.3 })
  // the punchline clock
  if (w > 13.1) {
    const k = pop01(w, 13.15, 0.3, 2.4)
    x.save(); x.translate(470, 470); x.scale(k, k); furn.clock(x, 0, 0, 62, 11, 26); x.restore()
    label(x, '14 MIN', 470, 570, { size: 40, col: GOLD, alpha: k })
    hearts(x, w, 13.05, PIS.x, PIS.y - 120, { n: 5 })
  }
  sparkles(x, w, PH.cx, PH.cy + 200, 13.0, 10, 150, 2)
}

const EP = makeCaught({
  id: 'kcie01', sign: 'virgo', name: 'Virgo',
  hook: 'Take four. | Still sounds *weird.*', hookColor: '#9fe6b0',
  earlier: '14 MINUTES EARLIER',
  clock0: '23:02', clockScale: 70,
  catches: [{ s: 0, c: C, circle: () => ({ x: V.x, y: V.y - 30, rx: 235, ry: 240, lx: 70, ly: 1000, labelSide: 1 }) }],
  ending: 'cut', wEnd: END, lastAt: 13.1,
  last: 'Fourteen minutes for | *“good! you?”*', lastColor: '#9fe6b0',
  world,
  cues: [
    ['pop', 0.35, 880, 0.05, 0.3], ['pop', 0.45, 1174.66, 0.04, 0.3], ['tick', 0.36, 0.05],
    ...TAKES.map(([a]) => ['pluck', a, 1318.51, 0.04, 0.3, 0.2]), ...TAKES.map(([a]) => ['pop', a + 0.05, 1760, 0.03, 0]),
    ['pop', 2.38, 1975.53, 0.05, -0.2], ['pop', 2.46, 1567.98, 0.04, -0.2], ['pop', 2.54, 2349.32, 0.04, -0.2],
    ...[3.9, 4.25, 4.65, 5.0].map((t, i) => ['pop', t, 659.25 + i * 110, 0.025, -0.3]),
    ['tom', 6.35, 140, { gain: 0.25, decay: 0.2 }], ['tom', 6.75, 130, { gain: 0.25, decay: 0.2 }], ['tom', 7.0, 150, { gain: 0.2, decay: 0.2 }],
    ...DELS.flatMap(d => [['whoosh', d, 0.25, 0.04], ['tick', d + 0.02, 0.08], ['pop', d + 0.05, 330, 0.04, 0]]),
    ['whoosh', 7.5, 0.3, 0.03], ...Array.from({ length: 10 }, (_, i) => ['tick', +(7.7 + i * 0.1).toFixed(2), 0.015]),
    ['glitter', 9.8, 10.3], ['pluck', 9.85, 1174.66, 0.03, 0.6, 0.5],
    ...Array.from({ length: 10 }, (_, i) => ['tick', +(11.9 + i * 0.083).toFixed(3), 0.02]),
    ['pop', 13.0, 1174.66, 0.05, 0.2], ['pop', 13.08, 1567.98, 0.04, 0.2], ['bell', 13.15, 1760, 0.03, 1.0, 0], ['glitter', 13.1, 13.5],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [MINT, MONO, ease, lerp, prog]
