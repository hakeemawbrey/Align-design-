// khee04: HEALING ERA, Ep 4 "Dinner for two, by habit" (22 s vertical, Month 2 boost m15, star_advice post, jazzy · Eb).
// Engine: ../../khee01/healkit.js (sets: ../../khee01/healset.js). Rows: promo/films/month2/m15.md. Hard cut.
//   0.0    frame 0: Cancer mid-ladle at the stove, steam flying, two plates already out on the counter, DAY 5 on the wall.
//          Hook: "Day 5. I made dinner for *two.*"
//   0.6    record scratch + freeze (the music cuts out: sudden silence): "force of *habit.*"  The second plate glows.
//          Cancer hugs the pot: "oh." / "i'll eat both. it's fine."  Pisces sniffles with tissues.
//   6.4    THE STARS: "your care didn't leave with *them.*" / "so feed *you* first. then text a friend."
//   13.9   Cancer lights a candle by one plate and texts "i made too much. come over?"  Virgo and Pisces arrive with
//          bowls; Pisces cries happy tears into its soup. The calendar tears to DAY 7.
//   19.7   Last line: "Set the table for *you.*"  (accent lands at 21.05, holds to the last frame)
import { makeHeal, lerp, prog, ease, shadow, pop01, R, INK, BONE, GOLD, glow } from '../../khee01/healkit.js'
import { kitchen, plate, bigPhone } from '../../khee01/healset.js'

const FLOOR = 1420, fy = s => FLOOR - 0.44 * s

function steam(x, t, cx, cy, n = 4, h = 110) { for (let i = 0; i < n; i++) { const p = ((t * 0.8 + i / n) % 1); x.save(); x.globalAlpha = 0.55 * Math.sin(Math.PI * p); R(x, BONE, cx - 40 + i * 26 + 8 * Math.sin(t * 3 + i), cy - p * h, 10, 24); x.restore() } }
function ladle(x, X0, Y0, X1, Y1) { x.save(); x.lineCap = 'square'; x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.moveTo(X0, Y0); x.lineTo(X1, Y1); x.stroke(); x.strokeStyle = '#c9d0e4'; x.lineWidth = 8; x.stroke(); x.restore(); R(x, INK, X1 - 22, Y1 - 6, 44, 30); R(x, '#c9d0e4', X1 - 18, Y1 - 2, 36, 22) }
function bowl(x, cx, cy, s = 1) { R(x, INK, cx - 50 * s, cy - 30 * s, 100 * s, 44 * s); R(x, '#ffb36b', cx - 46 * s, cy - 26 * s, 92 * s, 36 * s); R(x, '#e88a3a', cx - 40 * s, cy - 26 * s, 80 * s, 8 * s) }
function candle(x, t, cx, cy, k = 1) {
  if (k <= 0.01) return
  R(x, INK, cx - 14, cy - 70 * k, 28, 70 * k); R(x, BONE, cx - 10, cy - 66 * k, 20, 66 * k)
  const fl = 1 + 0.15 * Math.sin(t * 17)
  R(x, INK, cx - 10, cy - 70 * k - 34 * fl, 20, 32 * fl); R(x, GOLD, cx - 6, cy - 70 * k - 30 * fl, 12, 26 * fl)
  x.save(); x.globalCompositeOperation = 'lighter'; glow(x, cx, cy - 90, 160, 0.35 * k, '255,214,150'); x.restore()
}

function s1(x, t, S) {
  const { u, hero } = S
  const glowK = u > 0.7 ? 0.6 + 0.4 * Math.sin(t * 5) : 0
  kitchen(x, t, { cal: { day: 5 }, stoveClock: '7:30', pot: true })
  plate(x, 470, 1050, { s: 0.9 }); plate(x, 620, 1050, { s: 0.9, glowK })
  steam(x, t, 895, 950, 5, 150)
  shadow(x, 760, FLOOR + 4, 300)
  const hug = u > 3.4
  hero(x, t, { x: hug ? 790 : 720, y: fy(300), s: 300, mood: u < 0.6 ? 'happy' : u < 3.4 ? 'wide' : 'sparkle', look: u < 0.6 ? [1, -1] : [-1, -1], blink: u < 3.4 ? false : undefined, squash: hug ? 0.08 * Math.sin(u * 8) : 0, hops: u < 0.6 ? [-0.1] : undefined })
  if (!hug) ladle(x, 800, 1210, lerp(880, 870, Math.sin(t * 9) * 0.5 + 0.5), 1000 + 20 * Math.sin(t * 9) * (u < 0.6 ? 1 : 0))
  // flying soup drops at frame 0 (the ladle mid-flick)
  if (u < 0.6) for (let i = 0; i < 6; i++) { const p = (u + 0.25 + i * 0.05) * 1.6; const px = 880 - i * 30 - p * 160, py = 980 - 200 * p + 260 * p * p; R(x, INK, px - 3, py - 3, 20, 20); R(x, '#ffb36b', px, py, 14, 14) }
}
function s2(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 5 }, stoveClock: '7:36', pot: true, dim: 0.5 })
  plate(x, 470, 1050, { s: 0.9 }); plate(x, 620, 1050, { s: 0.9, glowK: 0.3 })
  shadow(x, 540, 1300, 260)
  hero(x, t, { x: 540, y: 1185, s: 260, mood: u > 4 ? 'sparkle' : 'neutral', look: [0, -1] })
}
function s3(x, t, S) {
  const { u, hero, star, crier } = S
  kitchen(x, t, { cal: { day: 7 }, stoveClock: '7:52', pot: true, morning: 0.15 })
  plate(x, 470, 1050, { s: 0.9, food: true }); candle(x, t, 580, 1050, pop01(t, S.t0 + 0.2, 0.3, 2))
  steam(x, t, 895, 950, 4, 110)
  shadow(x, 330, FLOOR + 4, 280)
  hero(x, t, { x: 330, y: fy(280), s: 280, mood: u < 2.4 ? 'neutral' : 'happy', look: [1, -0.2], hops: [S.t0 + 2.5, S.t0 + 2.9] })
  if (u < 2.3) bigPhone(x, t, 470, 1180, { w: 130, h: 220, rot: 0.1, mode: 'chat', scroll: 200 })
  const vk = pop01(t, S.t0 + 2.4, 0.35, 2.2), pk = pop01(t, S.t0 + 2.7, 0.35, 2.2)
  if (vk > 0.01) { shadow(x, 640, FLOOR + 4, 230); star(x, t, 'virgo', { x: 640, y: fy(230), s: 230, pop: vk, mood: 'happy', look: [-1, 0], seed: 11 }); bowl(x, 700, 1350, vk) }
  if (pk > 0.01) { shadow(x, 900, FLOOR + 4, 200); crier(x, t, 'pisces', { x: 900, y: fy(200), s: 200, pop: pk, mood: 'sparkle', look: [-1, 0] }, 3); bowl(x, 860, 1360, pk * 0.9) }
}
function fin(x, t, S) {
  const { u, hero, star, crier } = S
  kitchen(x, t, { cal: { day: 7 }, stoveClock: '8:05', pot: true, dim: 0.3, morning: 0.15 })
  candle(x, t, 580, 1050, 1)
  shadow(x, 420, 1290, 280); shadow(x, 680, 1300, 220); shadow(x, 900, 1310, 190)
  hero(x, t, { x: 420, y: 1160, s: 300, mood: u > 1 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.T.lastAt + 0.05] })
  star(x, t, 'virgo', { x: 680, y: 1200, s: 220, mood: 'happy', look: [-1, 0], seed: 11 }); bowl(x, 735, 1265, 0.9)
  crier(x, t, 'pisces', { x: 900, y: 1225, s: 190, mood: 'happy', look: [-1, 0], hops: [S.T.lastAt + 0.1] }, 3); bowl(x, 860, 1285, 0.8)
}

const EP = makeHeal({
  id: 'khee04', sign: 'cancer', name: 'Cancer', len: 22, ending: 'cut',
  hook: 'Day 5. I made | dinner for *two.*',
  brk: { kind: 'scratch', at: 0.6, len: 1.4, text: 'force of *habit.*' },
  whip: { x: 760, y: 1100 },
  h1: 'That care is *yours.*', h2: 'One plate. *Plus* friends.',
  lines: ['your care didn’t leave with *them.*', 'so feed *you* first. then text a friend.'],
  last: 'Set the table | for *you.*', day: 5, dayTo: 7, noFinPisces: true,
  bubbles: [
    { t0: 2.2, t1: 3.4, x: 700, y: 950, text: 'oh.', size: 46, tail: 0.1 },
    { t0: 3.6, t1: 6.2, x: 640, y: 950, text: 'i’ll eat both. it’s fine.', size: 40, tail: 0.3 },
    { t0: 14.2, t1: 16.2, x: 420, y: 930, text: 'i made too much. come over?', size: 36, tail: -0.4 },
    { t0: 16.4, t1: 18.4, x: 720, y: 900, text: 'we brought bowls!!', size: 40, tail: 0.1, col: '#ffe2c4' },
  ],
  pis1: { x: 180, y: 1350, s: 150 },
  s1, s2, s3, fin,
  cues: [['pop', 0.1, 523.25, 0.03, 0.3], ['bell', 0.85, 1760, 0.02, 1.4, 0.3], ['pop', 2.2, 330, 0.05, 0], ['pop', 14.1, 659.25, 0.04, 0], ['pluck', 14.15, 987.77, 0.03, 0.4, 0], ['bell', 16.3, 1318.51, 0.03, 0.8, 0.3], ['pop', 16.35, 880, 0.04, 0.3], ['pop', 16.6, 1046.5, 0.04, 0.5]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
