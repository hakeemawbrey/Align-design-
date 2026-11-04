// nhse09: HOLIDAY SURVIVAL GUIDE No. 9, "Two Time Zones." (28 s vertical, Next 30 · b29, music: dreamy · Gb)
// The series look lives in ../../nhse01/survkit.js.
//   0.0–6.6    "Two time zones. | *One* holiday."  A split-screen video call: ♒ Aquarius waves in bright morning light
//              (8:00 AM), ♌ Leo yawns in the dark (11:00 PM). Pisces sniffles in the night half.
//   6.6–13.9   "Gift ships | *three days late.*"  Aquarius mails a parcel; it inches along a dotted line between the two
//              screens, its tag says ARRIVES: 3 DAYS AFTER. ♒: "it's the thought that… arrives later."
//   13.9       hard cut into the tip.
//   13.9–21.6  "Same dessert. | *Same minute.*"  THE STARS: "pick *one* thing you share." / "same dessert, same minute.
//              *that's a date.*" A countdown 3-2-1, and both lift a forkful of the same pie at once. Crumbs, hearts.
//   21.6–25.6  "Packed: | *a recipe card.*"  THE STARS: "Different clocks. Same pie."
import { makeSurv, R, box, ink, gift, glow, snow, drawBits, sparkles, hearts, label, shadow, bubble,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, MINT, RED, INTER } from '../../nhse01/survkit.js'

const AQU = '#7fd0ff'
const TOP = 440, BOT = 1340
function split(x, t, { dayK = 1 } = {}) {
  // day (left)
  const g = x.createLinearGradient(0, TOP, 0, BOT); g.addColorStop(0, '#9fd8f6'); g.addColorStop(1, '#ffe7c0')
  x.fillStyle = g; x.fillRect(0, TOP, 540, BOT - TOP)
  drawBits(x, ['..Y..', '.YYY.', 'YYYYY', '.YYY.', '..Y..'], { Y: '#ffd23a' }, 110, TOP + 120, 16, { outline: null })
  glow(x, 110, TOP + 120, 160, 0.5, '255,240,160')
  R(x, '#e8c89a', 0, BOT - 160, 540, 160)
  // night (right)
  R(x, '#0d1638', 540, TOP, 540, BOT - TOP)
  drawBits(x, ['.MM', 'MM.', 'M..', 'MM.', '.MM'], { M: '#fff1c8' }, 960, TOP + 120, 14, { outline: null })
  snow(x, t, { x0: 540, x1: 1080, y0: TOP, y1: BOT - 160, n: 26, alpha: 0.5 })
  R(x, '#2a2448', 540, BOT - 160, 540, 160)
  // call chrome
  R(x, INK, 534, TOP, 12, BOT - TOP); box(x, 0, TOP - 6, 1080, 6, INK, { b: 0 }); R(x, INK, 0, BOT, 1080, 8)
  box(x, 30, TOP + 20, 150, 46, '#2a2148', { b: 4 }); ink(x, '8:00 AM', 105, TOP + 43, { size: 24, col: BONE })
  box(x, 900, TOP + 20, 160, 46, '#2a2148', { b: 4 }); ink(x, '11:00 PM', 980, TOP + 43, { size: 24, col: BONE })
  R(x, RED, 30, BOT - 50, 16, 16); ink(x, 'LIVE', 80, BOT - 42, { size: 20, col: BONE })
  void dayK
}
function pie(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-44, 26); x.lineTo(44, 26); x.lineTo(0, -40); x.closePath(); x.fill()
  x.fillStyle = '#f0c070'; x.beginPath(); x.moveTo(-36, 20); x.lineTo(36, 20); x.lineTo(0, -30); x.closePath(); x.fill()
  R(x, '#a8662a', -36, 12, 72, 8)
  x.restore()
}
function fork(x, cx, cy, rot, lift) {
  x.save(); x.translate(cx, cy - lift); x.rotate(rot)
  R(x, INK, -6, 0, 12, 90); R(x, '#c8d4ee', -3, 3, 6, 84)
  for (let i = 0; i < 3; i++) { R(x, INK, -14 + i * 10, -28, 8, 30); R(x, '#c8d4ee', -12 + i * 10, -26, 4, 26) }
  if (lift > 0) { R(x, INK, -20, -50, 40, 26); R(x, '#f0c070', -17, -47, 34, 20) }
  x.restore()
}

function act0(x, t, S) {
  const { u, hero, star } = S
  split(x, t)
  shadow(x, 270, 1150, 220)
  hero(x, t, { x: 270, y: 1000, s: 260, mood: 'happy', look: [0, 0], hops: [0.2, 0.55, 0.9, 1.25, 2.6, 2.95], squash: 0.03 * Math.sin(t * 9) })
  // waving pixel hand-sparkles
  for (let i = 0; i < 3; i++) label(x, ')', 420 + i * 18, 860 - i * 6, { size: 44 + i * 8, col: '#3a6a8a', alpha: 0.5 + 0.5 * Math.sin(t * 9 - i) })
  const yawn = u > 1.4 && u < 3.4
  star('leo', x, t, { x: 760, y: 1000, s: 230, mood: yawn ? 'wide' : 'sleepy', look: [0, 0], seed: 8, squash: yawn ? -0.12 : 0, zzz: !yawn })
  if (yawn) label(x, 'yaaawn', 770, 820, { size: 30, col: BONE, alpha: Math.sin(Math.PI * prog(u, 1.4, 3.4)) })
  bubble(x, t, 270, 790, -1, 6.5, 'GOOD MORNING!!', { size: 32 })
  bubble(x, t, 790, 790, 3.6, 6.5, 'good… night?', { size: 28, col: '#c9d4ff' })
}

function act1(x, t, S) {
  const { u, hero, star } = S
  split(x, t)
  hero(x, t, { x: 230, y: 1040, s: 220, mood: u > 4.4 ? 'neutral' : 'happy', look: [1, 0], hops: [S.t0 + 0.4, S.t0 + 4.4], squash: u > 4.4 && u < 5 ? 0.08 : 0 })
  star('leo', x, t, { x: 850, y: 1040, s: 210, mood: u > 4.4 ? 'neutral' : 'wide', look: [-1, 0], seed: 8, hops: [S.t0 + 4.45], squash: u > 4.4 && u < 5 ? 0.08 : 0 })
  // the parcel inches along the dotted line
  x.save(); x.setLineDash([16, 14]); x.strokeStyle = BONE; x.lineWidth = 6; x.beginPath(); x.moveTo(280, 720); x.quadraticCurveTo(540, 520, 800, 720); x.stroke(); x.restore()
  const p = 0.08 + 0.3 * ease.outQuad(prog(u, 0.5, 6.5))
  const px = (1 - p) * (1 - p) * 280 + 2 * (1 - p) * p * 540 + p * p * 800, py = (1 - p) * (1 - p) * 720 + 2 * (1 - p) * p * 520 + p * p * 720
  gift(x, px, py + 40, 110, 80, '#c88a4a', { ribbon: BONE })
  box(x, px + 30, py - 120, 230, 56, BONE, { b: 5 }); ink(x, 'ARRIVES: 3 DAYS AFTER', px + 145, py - 92, { size: 15, col: RED, font: INTER, weight: 800 })
  if (u > 4.4 && u < 6.6) { label(x, 'sigh', 230, 860, { size: 30, col: INK, alpha: 0.8 }); label(x, 'sigh', 850, 860, { size: 30, col: BONE, alpha: 0.8 }) }
}

function act2(x, t, S) {
  const { u, hero, star } = S
  split(x, t)
  // countdown 3-2-1 in the middle
  const cs = [[1.8, '3'], [2.5, '2'], [3.2, '1']]
  cs.forEach(([a, n]) => { const k = pop01(t, S.t0 + a, 0.25, 3) * outK(t, [S.t0 + a + 0.5, S.t0 + a + 0.65]); if (k > 0.01) { x.save(); x.translate(540, 640); x.scale(k, k); box(x, -70, -70, 140, 140, GOLD, { b: 7 }); ink(x, n, 0, 6, { size: 96, font: INTER, weight: 800 }); x.restore() } })
  const go = u > 3.9
  const lift = go ? 90 * ease.outBack(prog(u, 3.9, 4.3)) : 0
  pie(x, 380, 1150, 1.4); pie(x, 700, 1150, 1.4)
  hero(x, t, { x: 230, y: 1000, s: 220, mood: go ? 'happy' : 'neutral', look: [1, 0], hops: [S.t0 + 3.95, S.t0 + 4.8, S.t0 + 5.6] })
  star('leo', x, t, { x: 860, y: 1000, s: 210, mood: go ? 'heart' : 'neutral', look: [-1, 0], seed: 8, hops: [S.t0 + 3.97, S.t0 + 4.85, S.t0 + 5.65] })
  fork(x, 360, 1020, -0.3, lift); fork(x, 720, 1020, 0.3, lift)
  if (go) { hearts(x, t, S.t0 + 4.3, 270, 820, { n: 5 }); hearts(x, t, S.t0 + 4.3, 820, 820, { n: 5 }); sparkles(x, t, 540, 900, S.t0 + 3.92, 12, 300, 1, [GOLD, PINK, BONE]) }
  if (go) label(x, 'SAME BITE!', 540, 640, { size: 46, col: GOLD, font: INTER, weight: 800, alpha: clamp(prog(u, 4.0, 4.2)) })
}

function item(x, t, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s); x.rotate(0.05)
  box(x, -160, -100, 320, 200, BONE, { b: 7 })
  R(x, '#c8463c', -160, -100, 320, 12)
  ink(x, 'PIE', 0, -60, { size: 40, font: INTER, weight: 800 })
  ink(x, 'for two kitchens', 0, -18, { size: 22, col: RED })
  for (let i = 0; i < 3; i++) R(x, 'rgba(27,18,54,0.3)', -120, 20 + i * 24, 240 - i * 50, 8)
  pie(x, 110, 60, 0.8)
  x.restore()
}

const EP = makeSurv({
  id: 'nhse09', ep: 9, hero: 'aquarius', accent: AQU,
  heads: ['Two time zones. | *One* holiday.', 'Gift ships | *three days late.*', 'Same dessert. | *Same minute.*', 'Packed: | *a recipe card.*'],
  headSize: [92, 96, 96, 92],
  acts: [act0, act1, act2],
  line1: { t: 9.6, speaker: '♒︎ AQUARIUS', color: AQU, text: 'it’s the thought that… *arrives later*.', close: 13.6 },
  tips: ['pick *one* thing you share.', 'same dessert, same minute. *that’s a date.*'],
  last: 'Different clocks. *Same* pie.',
  item: { label: 'A RECIPE CARD', draw: item },
  pis: [{ x: 960, y: 1180, s: 100, noTissues: true }, { x: 960, y: 560, s: 90, noTissues: true }, { x: 960, y: 640, s: 90, noTissues: true, mood: 'happy', tears: 3 }],
  cues: [
    [['pop', 0.2, 1174.66, 0.03, -0.3], ['pop', 0.55, 1318.51, 0.03, -0.3], ['pluck', 1.4, 207.65, 0.04, 0.8, 0.3], ['pop', 3.6, 739.99, 0.03, 0.3]],
    [['whoosh', 0.5, 0.5, 0.025], ['tick', 1.5, 0.03], ['tick', 2.5, 0.03], ['tick', 3.5, 0.03], ['pluck', 4.4, 233.08, 0.04, 0.8, -0.3], ['pluck', 4.45, 233.08, 0.04, 0.8, 0.3]],
    [['tick', 1.8, 0.06], ['tick', 2.5, 0.06], ['tick', 3.2, 0.06], ['bell', 3.9, 1479.98, 0.04, 1.2, 0], ['pop', 3.95, 1174.66, 0.045, -0.3], ['pop', 3.97, 1174.66, 0.045, 0.3], ['glitter', 3.92, 4.4]],
    [],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [MINT, PINK, lerp]
