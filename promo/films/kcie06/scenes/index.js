// kcie06: CAUGHT IN 4K, "Taurus said 'on my way' from bed" (short, loop, music: lofi · Bb). Rows: m02.md #6
// World time w:
//   0.0  bed, blanket, a bowl of popcorn. The friend: "you coming?? we're all here". 1.0 Taurus types "on my way!!" (sent 1.8).
//   2.4  LEAVING IN 5… 3.6 LEAVING IN 10… 4.8 LEAVING IN 15… Taurus sinks deeper; 5.6 the lamp clicks down to a night light.
//   6.4  the friend sends a PHOTO: Pisces, also in bed, under a blanket, crying-laughing. "lol same."
//   7.4  Taurus laughs, snuggles in.  8.6 = the freeze (frame 0). Last line: "Two blankets. Zero people on the way." Loops.
import {
  makeCaught, room, furn, phone, star, pisces, bubble, sticker, label, box, R, drawBits, sparkles, hearts,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, MINT, INTER,
} from '../../kcie01/caughtkit.js'

const C = 8.6
const TAU = { x: 330, y: 1210, s: 330 }, PH = { cx: 790, cy: 900, w: 420, h: 720 }
const LEAVE = [[2.4, 5], [3.6, 10], [4.8, 15]]

function chat(x, w, { sx, sy, sw, sh }) {
  R(x, '#1d1640', sx, sy, sw, 84); label(x, 'the group', sx + sw / 2, sy + 44, { size: 30, col: BONE, font: INTER, weight: 800, shadow: false })
  const b = (bx, by, bw, txt, col, ink, w0) => { if (w < w0) return; const k = pop01(w, w0, 0.2, 2.2); x.save(); x.translate(bx + bw / 2, by + 30); x.scale(k, k); box(x, -bw / 2, -30, bw, 60, col, { b: 4 }); label(x, txt, 0, 2, { size: 30, col: ink, font: INTER, weight: 700, shadow: false }); x.restore() }
  const up = w > 6.4 ? 1 : 0
  b(sx + 20, sy + 110 - up * 120, 330, 'you coming??', '#efe6d6', INK, 0.3)
  b(sx + 20, sy + 190 - up * 120, 330, 'we’re all here', '#efe6d6', INK, 0.55)
  b(sx + sw - 270, sy + 280 - up * 120, 250, 'on my way!!', '#3d7cf0', '#fff', 1.8)
  // the photo: Pisces in bed
  if (w > 6.4) {
    const k = pop01(w, 6.4, 0.3, 2)
    x.save(); x.translate(sx + 20 + 150, sy + 440); x.scale(k, k)
    box(x, -150, -150, 300, 300, '#2f2a5c', { b: 5 })
    pisces(x, w, { x: 0, y: 10, s: 170, mood: 'happy', tears: 3, shadow: false, hops: [6.6, 7.0, 7.4] })
    box(x, -140, 60, 280, 80, '#ff8fb1', { b: 4, hi: '#ffb3c9' })
    x.restore()
    b(sx + 20, sy + 620, 220, 'lol same', '#efe6d6', INK, 6.8)
  }
  // draft
  if (w > 0.95 && w < 1.8) { R(x, '#1d1640', sx, sy + sh - 80, sw, 80); box(x, sx + 14, sy + sh - 66, sw - 28, 52, '#f6f3ea', { b: 3 }); label(x, 'on my way!!'.slice(0, Math.floor((w - 1.0) * 16)) + '|', sx + 26, sy + sh - 40, { size: 26, col: INK, align: 'left', font: INTER, shadow: false }) }
}

function world(x, w) {
  room(x, 'bedroom', { fy: 1460 })
  const lampOn = 1 - 0.65 * ease.inOutCubic(prog(w, 5.6, 5.8))
  box(x, 70, 470, 300, 330, BONE, { b: 6 }); x.fillStyle = '#140d36'; x.fillRect(84, 484, 272, 302); for (let i = 0; i < 8; i++) R(x, i % 3 ? BONE : GOLD, 100 + (i * 61) % 250, 500 + (i * 37) % 250, 5, 5); R(x, BONE, 214, 470, 12, 330); R(x, BONE, 70, 629, 300, 12)
  furn.lamp(x, 990, 1290, lampOn)
  if (w > 5.6 && w < 6.2) label(x, '*click*', 990, 1150, { size: 36, col: BONE, font: INTER, weight: 800, alpha: pop01(w, 5.6, 0.15, 2.6) * outK(w, [6.0, 6.2]) })
  furn.bed(x, 40, 1400, 640, '#5fb36a')
  // Taurus sinks into the bed by the minute
  const sink = 40 * clamp(prog(w, 2.4, 6.0))
  let mood = 'happy', look = [1, -0.3]
  if (w > 0.3 && w < 1.0) { mood = 'squint'; look = [1, -0.4] }
  if (w > 2.4 && w < 5.6) { mood = 'sleepy'; look = undefined }
  if (w > 5.6 && w < 6.4) { mood = 'sleepy' }
  if (w > 6.4 && w < 7.4) { mood = 'wide'; look = [1, -0.4] }
  if (w > 7.4) { mood = 'happy'; look = [1, -0.2] }
  star(x, w, 'taurus', { ...TAU, y: TAU.y + sink, mood, look, hops: [1.85, 7.45, 7.7, 8.0], seed: 9, zzz: false })
  box(x, 40, 1390, 640, 100, '#8fd09a', { b: 6, hi: '#b5e6bd' })     // the blanket
  // the popcorn bowl on the blanket
  box(x, 470, 1330, 150, 60, '#e8634a', { b: 5 }); for (let i = 0; i < 7; i++) R(x, '#fff3c4', 480 + i * 19, 1310 - (i % 2) * 12, 18, 18)
  // the phone
  phone(x, w, { ...PH, rot: -0.05 + 0.015 * Math.sin(w * 2), screen: chat })
  // leaving in…
  LEAVE.forEach(([a, n], i) => sticker(x, w, 380, 560 + i * 0, a, a + 1.1, `leaving in *${n}*`, { size: 52, col: GOLD, rot: [-0.05, 0.04, -0.03][i] }))
  if (w > 7.4) hearts(x, w, 7.45, TAU.x, TAU.y - 140, { n: 5 })
  sparkles(x, w, PH.cx - 100, PH.cy + 50, 6.45, 10, 160, 2)
}

const EP = makeCaught({
  id: 'kcie06', sign: 'taurus', name: 'Taurus',
  hook: 'Texted *‘on my way.’* | Still in bed.', hookColor: '#9fe6b0',
  earlier: '22 MINUTES EARLIER', clock0: '20:31', clockScale: 150,
  catches: [{ s: 0, c: C, circle: () => ({ x: TAU.x, y: TAU.y + 10, rx: 215, ry: 210, lx: 60, ly: 1010, labelSide: 1 }) }],
  frame: { z: 1.08, fx: 540, fy: 1000 },
  ending: 'loop', last: 'Two blankets. | *Zero* people on the way.', lastColor: '#9fe6b0',
  world,
  cues: [
    ['pop', 0.3, 987.77, 0.05, 0.3], ['pop', 0.55, 880, 0.045, 0.3],
    ...Array.from({ length: 11 }, (_, i) => ['tick', +(1.0 + i * 0.0625).toFixed(3), 0.02]), ['pop', 1.8, 1174.66, 0.05, 0.3], ['pop', 1.88, 1567.98, 0.04, 0.3],
    ...LEAVE.flatMap(([a], i) => [['tom', a, 150 - i * 20, { gain: 0.22, decay: 0.2 }], ['pop', a + 0.05, [659.25, 587.33, 523.25][i], 0.04, -0.2]]),
    ['tick', 5.6, 0.09], ['pop', 5.62, 330, 0.04, 0.4],
    ['pop', 6.4, 987.77, 0.05, 0.3], ['glitter', 6.45, 6.9], ['pop', 6.8, 880, 0.04, 0.3], ['pluck', 7.45, 1174.66, 0.04, 0.5, -0.3], ['pluck', 7.6, 1567.98, 0.035, 0.5, -0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, RED, MINT, drawBits, bubble, lerp]
