// kcie12: CAUGHT IN 4K, "Scorpio is still mad about 2019" (short, hard cut, music: screwed · C#m). Rows: m02.md #12
// (rows said loop; built as a hard cut so the honest-talk beat lands — see the batch report)
// World time w:
//   0.0  a party. Gemini bounces up: "hey!! long time!" 1.0 Scorpio smiles… and a thought bubble opens: the ARCHIVE.
//        A drawer slides out: "2019 · didn't laugh at my joke".  2.8 = the freeze (frame 0): the widest smile, the file open.
//   3.2  Scorpio says it honestly: "you didn't laugh at my joke. in 2019."  4.6 Gemini: "WAIT. I was so nervous I forgot to!"
//   5.8  Gemini laughs now ("HA! it's still funny") → 6.4 the file shreds itself. Pisces at the snack table: "closure!!"
//   7.6  the next guest (Aries): "hi Scorpio!" A drawer marked 2021 creaks open… Scorpio pushes it shut, smiling.
//   8.8  last line: "Okay. One file closed." Hard cut 10.4.
import {
  makeCaught, room, furn, star, pisces, bubble, sticker, label, box, R, sparkles, confetti,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, LAV, INTER, MONO,
} from '../../kcie01/caughtkit.js'

const C = 2.8, END = 10.4
const SCO = { x: 320, y: 1330, s: 300 }, PIS = { x: 900, y: 1010, s: 150 }
const TB = { x: 380, y: 760 }

function cabinet(x, w, year, txt, open, shred, k) {
  if (k <= 0.01) return
  x.save(); x.translate(TB.x, TB.y); x.scale(k, k)
  // thought cloud
  x.fillStyle = INK; for (const [cx, cy, r] of [[-170, 0, 130], [0, -60, 160], [170, 0, 130], [0, 70, 150]]) { x.beginPath(); x.arc(cx, cy, r + 8, 0, Math.PI * 2); x.fill() }
  x.fillStyle = '#efe6d6'; for (const [cx, cy, r] of [[-170, 0, 130], [0, -60, 160], [170, 0, 130], [0, 70, 150]]) { x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill() }
  for (const [cx, cy, r] of [[-120, 250, 30], [-90, 320, 18]]) { x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 6, 0, Math.PI * 2); x.fill(); x.fillStyle = '#efe6d6'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill() }
  label(x, 'THE ARCHIVE', 0, -170, { size: 26, col: RED, shadow: false })
  // the cabinet
  box(x, -150, -120, 300, 260, '#7a8796', { b: 6 })
  for (let i = 0; i < 3; i++) box(x, -130, -100 + i * 82, 260, 66, '#95a2b0', { b: 4 })
  // the open drawer + file card
  const o = ease.outCubic(open)
  box(x, -130, -18 + o * 40, 260, 66, '#b5c0cc', { b: 4 }); label(x, year, 0, 15 + o * 40, { size: 30, col: INK, shadow: false, font: INTER, weight: 800 })
  if (o > 0.5 && shred <= 0) {
    x.save(); x.translate(0, -60 - 40 * o); x.rotate(-0.05)
    box(x, -200, -40, 400, 80, '#fff8ea', { b: 4 }); label(x, txt, 0, 2, { size: 28, col: INK, shadow: false, font: INTER, weight: 800, maxW: 370 })
    x.restore()
  }
  if (shred > 0) for (let i = 0; i < 10; i++) R(x, '#fff8ea', -180 + i * 38, -100 + shred * 260 + (i % 3) * 20, 22, 60 - shred * 30)
  x.restore()
}

function world(x, w) {
  room(x, 'party', { fy: 1440 })
  furn.lights(x, w, 150)
  // the snack table with Pisces
  box(x, 760, 1080, 300, 30, BONE, { b: 5 }); R(x, INK, 780, 1110, 14, 330); R(x, INK, 1030, 1110, 14, 330)
  box(x, 790, 1040, 70, 40, GOLD, { b: 4 }); box(x, 960, 1040, 70, 40, PINK, { b: 4 })
  pisces(x, w, { ...PIS, mood: 'sparkle', look: [-1, 0.3], tears: w > 6.4 ? 3 : 1, hops: [6.45, 6.75, 7.05] })
  bubble(x, w, PIS.x - 30, PIS.y - 160, 6.5, 8.2, 'closure!!', { size: 32, col: '#bfe9ff', tail: 0.2 })
  // Gemini (until 7.4), then Aries arrives
  const gx = w < 7.4 ? 760 : lerp(760, 1300, prog(w, 7.4, 7.8))
  const gm = w > 4.6 && w < 5.8 ? 'wide' : w > 5.8 ? 'happy' : 'happy'
  star(x, w, 'gemini', { x: gx, y: 1330, s: 260, mood: gm, look: [-1, 0], hops: [0.1, 0.4, 0.7, 4.65, 5.85, 6.1, 6.35, 7.45], seed: 4 })
  if (w > 7.6) { const p = ease.outCubic(prog(w, 7.6, 8.0)); star(x, w, 'aries', { x: lerp(1250, 780, p), y: 1340, s: 240, mood: 'happy', look: [-1, 0], hops: [7.7, 8.0, 8.9], seed: 2 }) }
  bubble(x, w, 760, 1040, 0.15, 1.0, 'hey!! long time!', { size: 38, tail: 0.1 })
  bubble(x, w, 760, 1050, 4.65, 5.75, 'WAIT. I was so nervous|I forgot to laugh!', { size: 34, tail: 0.1 })
  if (w > 5.8 && w < 6.6) label(x, 'HA! HA!', gx, 1050, { size: 64, col: GOLD, font: INTER, weight: 800, rot: 0.08, alpha: pop01(w, 5.8, 0.2, 3) })
  bubble(x, w, 760, 1060, 7.8, END + 1, 'hi Scorpio!', { size: 38, tail: 0.2 })
  // Scorpio
  let mood = 'happy', look = [1, 0], squash = 0
  if (w > 1.0 && w < 3.2) { mood = 'happy'; squash = 0.06 + 0.04 * prog(w, 1.0, 2.8) }
  if (w > 3.2 && w < 4.6) { mood = 'neutral'; look = [1, 0] }
  if (w > 4.6 && w < 5.8) { mood = 'wide'; look = [1, 0] }
  if (w > 5.8) { mood = 'happy'; look = [1, 0] }
  if (w > 8.0 && w < 8.4) { mood = 'squint' }
  star(x, w, 'scorpio', { ...SCO, mood, look, squash, hops: [1.05, 3.25, 3.7, 4.1, 5.9, 6.45, 8.4], seed: 13, blink: w > 1 && w < 3.2 ? false : undefined })
  bubble(x, w, SCO.x + 60, SCO.y - 230, 3.25, 4.55, 'you didn’t laugh at my|joke. in 2019.', { size: 34, tail: -0.1 })
  // the archive thought bubble: 2019 (until it shreds at 6.4), then 2021 peeks open at 8.0 and gets pushed shut
  const k1 = pop01(w, 1.0, 0.35, 2) * outK(w, [6.9, 7.2])
  if (w < 7.2) cabinet(x, w, '2019', 'didn’t laugh at my joke', clamp(prog(w, 1.4, 1.9)), clamp(prog(w, 6.4, 6.9)), k1)
  if (w > 7.95) { const k2 = pop01(w, 7.95, 0.3, 2) * outK(w, [9.6, 9.9]); cabinet(x, w, '2021', '', clamp(prog(w, 8.05, 8.25)) * (1 - clamp(prog(w, 8.35, 8.45))), 0, k2); if (w > 8.35 && w < 9.0) label(x, '*SLAM*', TB.x + 160, TB.y + 160, { size: 46, col: RED, font: INTER, weight: 800, rot: -0.1 }) }
  if (w > 6.4) { confetti(x, w, 6.45, TB.x, TB.y, { n: 24, spread: 360, cols: ['#fff8ea', BONE, GOLD] }); sparkles(x, w, TB.x, TB.y, 6.45, 12, 260, 2) }
  void LAV
}

const EP = makeCaught({
  id: 'kcie12', sign: 'scorpio', name: 'Scorpio',
  hook: 'Smiling. | Still mad about *2019.*', hookColor: '#ff6b7f',
  earlier: '30 SECONDS EARLIER', clock0: '22:47', clockScale: 10,
  catches: [{ s: 0, c: C, circle: () => ({ x: SCO.x, y: SCO.y - 10, rx: 195, ry: 200, lx: 50, ly: 1590, labelSide: 1 }) }],
  frame: { z: 1.08, fx: 540, fy: 1010 },
  ending: 'cut', wEnd: END, lastAt: 8.8,
  last: 'Okay. | *One file closed.*', lastColor: '#ff6b7f',
  world,
  cues: [
    ['pop', 0.15, 880, 0.045, 0.3], ['pop', 0.3, 1174.66, 0.04, 0.3], ['whoosh', 1.0, 0.3, 0.04], ['pop', 1.05, 523.25, 0.04, -0.3],
    ['tick', 1.45, 0.06], ['whoosh', 1.45, 0.2, 0.04], ['tick', 1.85, 0.08], ['tom', 1.9, 110, { gain: 0.2, decay: 0.2 }],
    ['pop', 3.25, 659.25, 0.03, -0.3], ['pop', 4.65, 880, 0.05, 0.3], ['pop', 4.75, 1174.66, 0.04, 0.3],
    ['pop', 5.8, 1318.51, 0.05, 0.3], ['pop', 6.0, 1567.98, 0.04, 0.3], ...Array.from({ length: 8 }, (_, i) => ['tick', +(6.4 + i * 0.06).toFixed(2), 0.04]), ['glitter', 6.45, 7.0], ['pluck', 6.5, 1318.51, 0.035, 0.6, 0.5],
    ['pop', 7.8, 987.77, 0.045, 0.3], ['tick', 8.05, 0.06], ['tom', 8.4, 90, { gain: 0.3, decay: 0.25 }], ['tick', 8.4, 0.09],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [MONO]
