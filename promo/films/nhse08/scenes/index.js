// nhse08: HOLIDAY SURVIVAL GUIDE No. 8, "Delayed. Again." (30 s vertical, Next 30 · b29, music: lofi · Dm)
// The series look lives in ../../nhse01/survkit.js.
//   0.0–6.6    "Delayed. | *Again.*"  ♎ Libra sits on its suitcase on a snowy station platform while the departures
//              board flaps over to DELAYED. Pisces sniffles on the bench.
//   6.6–13.9   "Sorry. | *So* sorry."  Libra texts home "so sorry!!" again and again; the board flips again and Libra
//              apologises to the board. ♎: "sorry, board. not your fault either."
//   13.9       card cut.
//   13.9–21.6  "One update. | Then *rest.*"  THE STARS: "a delay isn't your *fault*." / "send one update. then *rest*."
//              One calm text: "running late, saving you a hug". Home answers with a heart; Libra snacks and naps.
//   21.6–25.6  "Packed: | *a travel pillow.*"  THE STARS: "Running late still counts as coming home."
import { makeSurv, R, box, ink, phone, snow, glow, drawBits, sparkles, hearts, label, shadow, bubble, HEART,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, MINT, RED, INTER, MONO } from '../../nhse01/survkit.js'

const LIB = '#ff8fb1'
function platform(x, t) {
  R(x, '#141a33', 0, 280, 1080, 980)
  for (let i = 0; i < 4; i++) { box(x, 60 + i * 290, 300, 40, 940, '#2a3050', { b: 5 }) }
  R(x, '#3a3f5a', 0, 1240, 1080, 680); R(x, GOLD, 0, 1250, 1080, 14); R(x, INK, 0, 1236, 1080, 10)
  for (let i = 0; i < 6; i++) { glow(x, 180 + i * 180, 300, 200, 0.12, '255,230,170'); R(x, '#fff1c8', 160 + i * 180, 292, 40, 10) }
  snow(x, t, { n: 50, y1: 1250, alpha: 0.6 })
}
function board(x, t, cx, cy, rows, flipAt = []) {
  box(x, cx - 380, cy - 130, 760, 260, '#0e0c1c', { b: 8 })
  rows.forEach(([dest, status, col], i) => {
    const y = cy - 70 + i * 74
    ink(x, dest, cx - 340, y, { size: 34, col: '#ffe9a8', align: 'left', font: MONO })
    const fl = flipAt.find(f => t > f && t < f + 0.4)
    const sc = fl !== undefined && i === 0 ? Math.abs(Math.cos((t - fl) / 0.4 * Math.PI * 3)) : 1
    x.save(); x.translate(cx + 220, y); x.scale(1, Math.max(0.08, sc))
    R(x, '#1c1830', -130, -28, 260, 56); R(x, INK, -130, -2, 260, 4)
    ink(x, status, 0, 0, { size: 34, col, font: MONO })
    x.restore()
  })
}
function suitcase(x, cx, by, col = '#3a6a8a') {
  box(x, cx - 110, by - 150, 220, 150, col, { b: 7, hi: 'rgba(255,255,255,0.18)' })
  R(x, INK, cx - 30, by - 180, 60, 34); R(x, col, cx - 20, by - 172, 40, 20)
  R(x, GOLD, cx - 110, by - 90, 220, 10)
  drawBits(x, ['.SS.', 'SSSS', 'SSSS', '.SS.'], { S: '#ffd6e4' }, cx + 60, by - 50, 6)
}
const BOARD0 = [['NORTH LINE', 'DELAYED', '#ff6b6b'], ['COAST', 'ON TIME', '#9fe6b0'], ['HOMEWARD', 'BOARDING', '#9fe6b0']]

function act0(x, t, S) {
  const { u, hero, star } = S
  platform(x, t)
  board(x, t, 540, 560, BOARD0, [0.9, 3.3])
  // bench for Pisces
  box(x, 760, 1160, 260, 26, '#6b3f2a', { b: 5 }); R(x, INK, 780, 1186, 14, 56); R(x, INK, 990, 1186, 14, 56)
  suitcase(x, 360, 1250)
  shadow(x, 360, 1258, 260)
  hero(x, t, { x: 360, y: 1000, s: 250, mood: u < 2.6 ? 'wide' : 'neutral', look: [0.6, -1], hops: [0.95, 2.6], squash: u > 0.9 && u < 1.3 ? 0.1 : 0 })
  if (u > 2.6) label(x, 'sigh.', 470, 860, { size: 30, col: BONE, alpha: Math.sin(Math.PI * prog(u, 2.6, 4.2)) })
}

function act1(x, t, S) {
  const { u, hero } = S
  platform(x, t)
  const msgs = [0.6, 1.3, 1.9, 2.4, 2.9, 3.3].map((a, i) => ({ at: S.t0 + a, side: 'R', col: '#a8566e', text: ['so sorry!!', 'SO sorry', 'sorry again', 'I’m so sorry!!', 'sorry 🙏'.replace(' 🙏', '!!!'), 'sorry'][i] }))
  phone(x, t, { cx: 720, cy: 780, w: 400, h: 560, title: 'HOME', msgs, rot: 0.05 })
  suitcase(x, 300, 1250)
  hero(x, t, { x: 300, y: 1000, s: 240, mood: u > 4.2 ? 'wide' : 'neutral', look: u > 4.2 ? [0.5, -1] : [1, -0.4], squash: 0.03 * Math.sin(t * 20), hops: [S.t0 + 0.6, S.t0 + 1.3, S.t0 + 1.9, S.t0 + 2.4, S.t0 + 2.9, S.t0 + 3.3] })
  // the board flips again (top-left)
  if (u > 3.8) { x.save(); x.translate(300, 470); x.scale(0.55, 0.55); board(x, t, 0, 0, [['NORTH LINE', u < 4.2 ? 'DELAYED' : 'DELAYED+', '#ff6b6b']], [S.t0 + 3.9]); x.restore() }
}

function act2(x, t, S) {
  const { u, hero } = S
  platform(x, t)
  const msgs = [{ at: S.t0 + 1.2, side: 'R', col: '#3fa88a', text: 'running late, saving you a hug' }, { at: S.t0 + 2.6, side: 'L', text: 'take your time ♥' }]
  phone(x, t, { cx: 720, cy: 760, w: 400, h: 520, title: 'HOME', msgs, alpha: outK(t, [S.t0 + 4.4, S.t0 + 4.7]) })
  if (u > 2.6 && u < 4.6) hearts(x, t, S.t0 + 2.7, 720, 640, { n: 5 })
  suitcase(x, 400, 1250)
  const nap = u > 4.6
  hero(x, t, { x: 400, y: nap ? 1050 : 1000, s: 240, mood: nap ? 'sleepy' : u > 2.7 ? 'happy' : 'neutral', look: nap ? undefined : [1, -0.4], squash: nap ? 0.08 : 0, hops: [S.t0 + 1.25, S.t0 + 2.7] })
  if (u > 3.4 && u < 4.8) drawBits(x, ['.CC.', 'CDDC', 'CDDC', '.CC.'], { C: '#d49a4a', D: '#6b3f2a' }, 520, 980 - 30 * Math.abs(Math.sin(t * 3)), 9)
}

function item(x, t, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  drawBits(x, ['.PPPPPP.', 'PPPPPPPP', 'PPP..PPP', 'PP....PP', 'PP....PP', 'PP....PP', 'PPP..PPP', '.PP..PP.'], { P: '#8fb0ff' }, 0, 0, 26)
  for (let i = 0; i < 4; i++) R(x, 'rgba(255,255,255,0.35)', -80 + i * 40, -86, 14, 14)
  x.restore()
}

const EP = makeSurv({
  id: 'nhse08', ep: 8, hero: 'libra', accent: LIB,
  heads: ['Delayed. | *Again.*', 'Sorry. | *So* sorry.', 'One update. | Then *rest.*', 'Packed: | *a travel pillow.*'],
  acts: [act0, act1, act2],
  line1: { t: 10.45, speaker: '♎︎ LIBRA', color: LIB, text: 'sorry, board. not your fault *either*.', close: 13.7 },
  tips: ['a delay isn’t your *fault*.', 'send one update. then *rest*.'],
  last: 'Running late still counts as *coming home.*',
  item: { label: 'A TRAVEL PILLOW', draw: item },
  pis: [{ x: 890, y: 1080, s: 120 }, { x: 960, y: 1150, s: 100, noTissues: true, look: [-1, -0.5] }, { x: 950, y: 1100, s: 100, noTissues: true, mood: 'happy', tears: 2 }],
  cues: [
    [['tick', 0.5, 0.05], ['tick', 0.6, 0.05], ['tick', 0.7, 0.05], ['tick', 0.8, 0.05], ['pluck', 0.95, 293.66, 0.04, 0.6, 0], ['whoosh', 2.6, 1.2, 0.02]],
    [...[0.6, 1.3, 1.9, 2.4, 2.9, 3.3].map((a, i) => ['pop', a, 880 + i * 60, 0.035, 0.3]), ['tick', 3.9, 0.05], ['tick', 4.0, 0.05], ['tick', 4.1, 0.05], ['pluck', 4.2, 261.63, 0.04, 0.5, -0.3]],
    [['pop', 1.2, 987.77, 0.04, 0.3], ['pop', 2.6, 1318.51, 0.045, 0.3], ['pluck', 2.7, 1567.98, 0.035, 0.5, 0.3], ['whoosh', 4.6, 0.8, 0.02]],
    [],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [sparkles, bubble, HEART, PINK, MINT, RED, INTER, lerp, clamp, ease, pop01]
