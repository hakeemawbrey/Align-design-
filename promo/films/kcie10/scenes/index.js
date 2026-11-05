// kcie10: CAUGHT IN 4K, "Aquarius took a fake call in aisle five" (short, loop, music: synthwave · F#m). Rows: m02.md #10
// World time w:
//   0.0  the supermarket, aisle 5. Aquarius pushes a trolley.  0.8 THE EX appears at the end of the aisle.
//   1.4  Aquarius ducks behind the cereal pyramid, phone to ear: "yes. hello. the… space station. yes."
//   3.8  the phone RINGS for real, mid-fake-call. 4.8 the ex walks up and waves, kindly. 5.4 Aquarius waves back… with a melon.
//   6.3  the ex wanders back down the aisle. Aquarius raises the phone again (upside down). Pisces at the checkout cries for
//        both of them.  7.6 = the freeze (frame 0). Last line: "Hello? Yes. Still hiding." Loops.
import {
  makeCaught, room, furn, star, pisces, bubble, sticker, label, box, R, drawBits, sparkles,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, MINT, SKYB, INTER,
} from '../../kcie01/caughtkit.js'

const C = 7.6
const AQ = w => ({ x: w < 1.4 ? lerp(700, 470, prog(w, 0, 1.4)) : 470, y: w < 1.4 ? 1320 : 1235, s: 280 })
const EX = w => {
  if (w < 4.6) return { x: 600, y: 900, s: 130 }
  if (w < 6.3) { const p = ease.inOutCubic(prog(w, 4.6, 5.0)); return { x: lerp(600, 760, p), y: lerp(900, 1180, p), s: lerp(130, 220, p) } }
  const p = ease.inOutCubic(prog(w, 6.3, 6.9)); return { x: lerp(760, 600, p), y: lerp(1180, 900, p), s: lerp(220, 130, p) }
}
const PIS = { x: 940, y: 1590, s: 170 }

function aisle(x, w) {
  room(x, 'aisle', { fy: 980 })
  // perspective shelves on both sides, vanishing to the end of the aisle
  furn.shelfUnit(x, -10, 380, 300, 760, 1); furn.shelfUnit(x, 790, 380, 300, 760, 4)
  furn.shelfUnit(x, 300, 620, 160, 360, 2); furn.shelfUnit(x, 620, 620, 160, 360, 5)
  R(x, '#cfc6ae', 460, 620, 160, 360)
  // the aisle sign
  R(x, INK, 538, 300, 4, 120); box(x, 420, 410, 240, 90, '#3d7cf0', { b: 6 }); label(x, 'AISLE 5', 540, 456, { size: 40, col: '#fff', font: INTER, weight: 800, shadow: false })
  // floor perspective lines
  x.save(); x.globalAlpha = 0.15; for (let i = -4; i <= 4; i++) { x.strokeStyle = '#000'; x.lineWidth = 6; x.beginPath(); x.moveTo(540 + i * 30, 980); x.lineTo(540 + i * 300, 1920); x.stroke() } x.restore()
}

function world(x, w) {
  aisle(x, w)
  // the ex (Scorpio)
  const E = EX(w)
  const em = w > 4.7 && w < 6.3 ? 'happy' : 'neutral'
  star(x, w, 'scorpio', { ...E, mood: em, look: w > 4.6 && w < 6.3 ? [-1, 0] : [1, 0], hops: [4.65, 5.0, 5.3, 5.6, 6.35], seed: 13, glyph: E.s > 150 })
  if (w > 0.8 && w < 2.0) sticker(x, w, 600, 760, 0.85, 2.0, 'THE *EX.*', { size: 50, col: GOLD, rot: -0.04 })
  bubble(x, w, E.x + 20, E.y - E.s * 0.8, 5.0, 5.9, 'oh hey!! :)', { size: 36, tail: 0.1 })
  // the trolley
  const A = AQ(w)
  box(x, A.x + 120, A.y - 40, 220, 130, 'rgba(200,210,230,0.5)', { b: 6 }); R(x, INK, A.x + 120, A.y + 100, 220, 8); R(x, INK, A.x + 140, A.y + 108, 16, 30); R(x, INK, A.x + 300, A.y + 108, 16, 30)
  box(x, A.x + 150, A.y - 20, 70, 70, '#5fb36a', { b: 4, hi: '#8fd09a' })       // the melon in the trolley
  // Aquarius
  let mood = 'neutral', look = [0.4, -0.6]
  if (w > 0.8 && w < 1.4) { mood = 'wide'; look = [0.5, -1] }
  if (w > 1.4 && w < 3.8) { mood = 'squint'; look = [1, -0.4] }
  if (w > 3.8 && w < 4.7) { mood = 'wide'; look = [0, 0] }
  if (w > 4.7 && w < 6.3) { mood = 'happy'; look = [1, 0] }
  if (w > 6.3) { mood = 'squint'; look = [0.6, -0.9] }
  star(x, w, 'aquarius', { ...A, mood, look, hops: [0.2, 0.6, 1.0, 1.45, 3.85, 4.0, 5.45, 5.7, 6.4], seed: 7 })
  // the cereal pyramid Aquarius hides behind
  const boxes = [[0, 0], [1, 0], [2, 0], [3, 0], [0.5, 1], [1.5, 1], [2.5, 1]]
  boxes.forEach(([i, j], n) => box(x, 230 + i * 110, 1430 - j * 120, 96, 120, ['#e8634a', '#f2c75c', '#e8634a', '#f29a4a'][n % 4], { b: 5, hi: '#ffffff55' }))
  label(x, 'CRUNCH-O’S', 430, 1590, { size: 26, col: INK, shadow: false, font: INTER, weight: 800 })
  // the phone at Aquarius' ear (upside down), ringing at 3.8
  const onEar = (w > 1.5 && w < 4.7) || w > 6.4
  if (onEar) {
    const ring = w > 3.8 && w < 4.7, bz = ring ? 5 * Math.sin(w * 80) : 0
    x.save(); x.translate(A.x + 120 + bz, A.y - 70); x.rotate(Math.PI - 0.2)
    box(x, -36, -66, 72, 132, '#2a2148', { b: 5 }); R(x, ring ? '#7fd0ff' : '#0a0718', -28, -56, 56, 112)
    x.restore()
    if (ring) { label(x, 'RING RING', A.x + 180, A.y - 230, { size: 44, col: GOLD, font: INTER, weight: 800, rot: 0.1, alpha: Math.floor(w * 8) % 2 ? 1 : 0.4 }); sticker(x, w, 540, 1690, 3.85, 4.7, 'it’s ringing *for real*', { size: 42, col: BONE }) }
  }
  bubble(x, w, A.x - 40, A.y - 270, 1.7, 3.7, 'yes. hello. the…|space station. yes.', { size: 34, tail: -0.1 })
  bubble(x, w, A.x - 40, A.y - 270, 6.6, C + 3, 'hello? yes.', { size: 36, tail: -0.1 })
  // waving with a melon
  if (w > 5.3 && w < 6.4) { const k = pop01(w, 5.3, 0.25, 2.4); x.save(); x.translate(A.x - 170, A.y - 200 + 12 * Math.sin(w * 14)); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 66, 0, Math.PI * 2); x.fill(); x.fillStyle = '#5fb36a'; x.beginPath(); x.arc(0, 0, 58, 0, Math.PI * 2); x.fill(); for (let i = -2; i <= 2; i++) R(x, '#3a8a48', i * 22 - 4, -54, 8, 108); x.restore(); label(x, '*waves with melon*', A.x - 120, A.y - 310, { size: 30, col: BONE, font: INTER, weight: 800, alpha: k }) }
  // Pisces at the checkout
  box(x, 780, 1640, 320, 120, '#4a4f5c', { b: 6 }); R(x, '#2a2d36', 790, 1650, 300, 30)
  pisces(x, w, { ...PIS, mood: 'sparkle', look: [-1, -0.8], tears: w > 4.7 ? 3 : 2, hops: [3.9, 5.4, 6.4] })
  const tg = x.createLinearGradient(0, 0, 0, 260); tg.addColorStop(0, 'rgba(10,6,24,0.75)'); tg.addColorStop(1, 'rgba(10,6,24,0)'); x.fillStyle = tg; x.fillRect(-100, -100, 1280, 360)
  bubble(x, w, PIS.x - 90, PIS.y - 180, 5.4, C + 3, 'they waved!!', { size: 30, col: '#bfe9ff', tail: 0.4 })
}

const EP = makeCaught({
  id: 'kcie10', sign: 'aquarius', name: 'Aquarius',
  hook: 'Fake phone call. | Ex in *aisle five.*', hookColor: '#7fd0ff',
  earlier: '2 MINUTES EARLIER', clock0: '18:20', clockScale: 16,
  catches: [{ s: 0, c: C, circle: w => { const A = AQ(w); return { x: A.x + 40, y: A.y - 30, rx: 220, ry: 210, lx: 40, ly: A.y - 300, labelSide: 1 } } }],
  ending: 'loop', last: 'Hello? Yes. | *Still hiding.*', lastColor: '#7fd0ff',
  world,
  cues: [
    ['pop', 0.85, 311.13, 0.05, 0], ['tom', 0.9, 80, { gain: 0.25, decay: 0.3 }], ['whoosh', 1.4, 0.25, 0.05],
    ...[1.7, 2.1, 2.6, 3.0].map((t, i) => ['pop', t, 523.25 + i * 50, 0.025, -0.3]),
    ...Array.from({ length: 4 }, (_, i) => ['bell', +(3.8 + i * 0.22).toFixed(2), i % 2 ? 1318.51 : 1567.98, 0.04, 0.25, 0.2]),
    ['whoosh', 4.6, 0.4, 0.04], ['pop', 5.0, 987.77, 0.045, 0.3], ['pop', 5.3, 523.25, 0.05, -0.3], ['tom', 5.3, 140, { gain: 0.2, decay: 0.2 }],
    ['pluck', 5.45, 1174.66, 0.035, 0.5, 0.5], ['whoosh', 6.3, 0.4, 0.03], ['pop', 6.6, 659.25, 0.03, -0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, RED, MINT, SKYB, drawBits, sparkles, clamp, outK]
