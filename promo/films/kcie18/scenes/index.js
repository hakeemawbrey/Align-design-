// kcie18: CAUGHT IN 4K, "Libra, caught deciding all day" (long, hard cut, music: jazzy · Bb). Rows: m02.md #18
//   CATCH 1 · 8:30 AM   two identical sweaters, twenty minutes, an options wheel spinning overhead (= frame 0).
//   CATCH 2 · 12:15 PM  "where do you want to eat?" "anywhere!" "pizza?" "not there." "tacos?" "…not there either."
//   CATCH 3 · 3:00 PM   a friend fight (Gemini vs Scorpio): Libra agrees with both, head ping-ponging.
//   CATCH 4 · 7:00 PM   straightening the photo wall for symmetry with a spirit level before the date arrives.
//   CATCH 5 · 9:30 PM   the date (Taurus): "so… do you like me?" Libra, instantly: "yes." Pisces drops the popcorn, sobs.
//   tail                the stamp: DECIDED. Last line: "Took all day. Took one second." Hard cut.
import {
  makeCaught, room, furn, windowFrame, phone, star, pisces, bubble, sticker, label, box, R, sparkles, hearts, confetti,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, MINT, SKYB, INTER,
} from '../../kcie01/caughtkit.js'

const S = [0, 100, 200, 300, 400]
const LEN = [10.0, 11.0, 10.4, 10.6, 9.6]
const END = S[4] + LEN[4] + 5.0
const CLOCKS = ['08:30', '12:15', '15:00', '19:00', '21:30']
const band = w => { let i = 0; for (let k = 0; k < 5; k++) if (w >= S[k] - 1) i = k; return { i, u: w - S[i] } }
const LIB = { x: 400, y: 1250, s: 300 }

function sweater(x, cx, cy, col, rot = 0) { x.save(); x.translate(cx, cy); x.rotate(rot); box(x, -80, -70, 160, 150, col, { b: 5 }); box(x, -130, -70, 50, 110, col, { b: 5 }); box(x, 80, -70, 50, 110, col, { b: 5 }); R(x, INK, -26, -70, 52, 14); for (let i = 0; i < 3; i++) R(x, 'rgba(255,255,255,0.35)', -70, -30 + i * 34, 140, 8); x.restore() }
function wheel(x, cx, cy, r, a, labels) {
  x.save(); x.translate(cx, cy); x.rotate(a)
  const n = labels.length, cols = [GOLD, PINK, SKYB, MINT, '#c9a6ff', '#ff9a7a']
  for (let i = 0; i < n; i++) { x.fillStyle = INK; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r + 6, i / n * 6.283, (i + 1) / n * 6.283); x.fill(); x.fillStyle = cols[i % 6]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, i / n * 6.283 + 0.02, (i + 1) / n * 6.283 - 0.02); x.fill() }
  labels.forEach((l, i) => { x.save(); x.rotate((i + 0.5) / n * 6.283); label(x, l, r * 0.58, 0, { size: 22, col: INK, shadow: false, font: INTER, weight: 800 }); x.restore() })
  x.restore(); R(x, INK, cx - 10, cy - r - 30, 20, 40)
}

function c1(x, w, u) {
  room(x, 'bedroom', { fy: 1440 })
  wheel(x, 540, 640, 170, u * 4 + 0.3, ['BLUE', 'BLUE', 'BLUE', 'BLUE'])
  label(x, '(they are both blue)', 540, 850, { size: 28, col: BONE, alpha: u > 4 ? 1 : 0 })
  const lift = [Math.sin(u * 3) > 0 ? 1 : 0.4, Math.sin(u * 3) > 0 ? 0.4 : 1]
  sweater(x, 190, 1080 - 60 * lift[0], '#5a8ad0', -0.1); sweater(x, 640, 1080 - 60 * lift[1], '#5a8ad0', 0.1)
  star(x, w, 'libra', { ...LIB, mood: u > 6 ? 'squint' : 'neutral', look: [Math.sin(u * 3) > 0 ? -1 : 1, -0.4], hops: Array.from({ length: 10 }, (_, i) => S[0] + 0.5 + i * 1.05), seed: 1 })
  const mins = Math.min(20, Math.floor(u * 2))
  sticker(x, w, 540, 940, S[0] + 0.4, S[0] + LEN[0] + 1, `minutes deciding: *${mins}*`, { size: 42, col: GOLD })
  pisces(x, w, { x: 920, y: 1340, s: 150, mood: 'sparkle', look: [-1, -0.6], tears: 1, hops: [S[0] + 6.5] })
  bubble(x, w, 880, 1150, S[0] + 6.4, S[0] + 9.6, 'they’re the|same sweater', { size: 30, col: '#bfe9ff', tail: 0.4 })
}
function c2(x, w, u) {
  room(x, 'street', { fy: 1440 })
  for (let i = 0; i < 3; i++) { const bx = 60 + i * 340; box(x, bx, 640, 300, 800, ['#43357a', '#3a2f6e', '#2f2766'][i], { b: 6 }); box(x, bx + 30, 680, 240, 70, [RED, GOLD, MINT][i], { b: 4 }); label(x, ['PIZZA', 'TACOS', 'NOODLES'][i], bx + 150, 716, { size: 30, col: INK, shadow: false, font: INTER, weight: 800 }) }
  const ask = Math.min(2, Math.floor(prog(u, 2.0, 9.0) * 3))
  star(x, w, 'aries', { x: 800, y: 1250, s: 270, mood: u > 7 ? 'squint' : 'happy', look: [-1, 0], hops: [0.4, 2.2, 4.6, 7.0], seed: 2 })
  star(x, w, 'libra', { ...LIB, x: 320, mood: u > 2.2 ? 'squint' : 'happy', look: [[-1, 0.4, 1][ask], -0.5], squash: u > 8 ? 0.04 * Math.sin(u * 30) : 0, hops: [1.0, 3.4, 5.8, 8.3], seed: 1 })
  bubble(x, w, 800, 900, S[1] + 0.3, S[1] + 1.0, 'where do you want to eat?', { size: 34, tail: 0.2 })
  bubble(x, w, 320, 900, S[1] + 1.0, S[1] + 2.1, 'anywhere!', { size: 42 })
  bubble(x, w, 800, 900, S[1] + 2.2, S[1] + 3.3, 'pizza?', { size: 42, tail: 0.2 })
  bubble(x, w, 320, 900, S[1] + 3.4, S[1] + 4.5, 'mm… not there.', { size: 40 })
  bubble(x, w, 800, 900, S[1] + 4.6, S[1] + 5.7, 'tacos?', { size: 42, tail: 0.2 })
  bubble(x, w, 320, 900, S[1] + 5.8, S[1] + 6.9, 'ooh. hmm. no?', { size: 40 })
  bubble(x, w, 800, 900, S[1] + 7.0, S[1] + 8.2, 'noodles??', { size: 42, tail: 0.2 })
  bubble(x, w, 320, 900, S[1] + 8.3, S[1] + 11.5, 'not there either.', { size: 40, col: GOLD })
  pisces(x, w, { x: 960, y: 1560, s: 140, mood: 'sparkle', look: [-1, -1], tears: 2, hops: [S[1] + 8.4] })
}
function c3(x, w, u) {
  room(x, 'living', { fy: 1440 })
  furn.couch(x, 260, 1400, 560, '#9a7be0')
  const turn = Math.sin(u * 2.6) > 0 ? -1 : 1
  star(x, w, 'gemini', { x: 170, y: 1250, s: 250, mood: 'squint', look: [1, 0], hops: Array.from({ length: 8 }, (_, i) => S[2] + 0.5 + i * 1.2), seed: 4 })
  star(x, w, 'scorpio', { x: 910, y: 1250, s: 250, mood: 'squint', look: [-1, 0], hops: Array.from({ length: 8 }, (_, i) => S[2] + 1.1 + i * 1.2), seed: 13 })
  star(x, w, 'libra', { x: 540, y: 1180, s: 270, mood: 'happy', look: [turn, 0], hops: Array.from({ length: 16 }, (_, i) => S[2] + 0.4 + i * 0.6), seed: 1 })
  bubble(x, w, 200, 880, S[2] + 0.5, S[2] + 2.4, 'they were RUDE', { size: 36 })
  bubble(x, w, 880, 880, S[2] + 1.6, S[2] + 3.4, 'no, YOU were', { size: 36, tail: 0.2 })
  bubble(x, w, 540, 760, S[2] + 3.6, S[2] + 5.4, 'you’re right!', { size: 40, col: GOLD })
  bubble(x, w, 540, 760, S[2] + 5.6, S[2] + 7.4, 'and you’re ALSO right!', { size: 38, col: GOLD })
  bubble(x, w, 540, 760, S[2] + 7.6, S[2] + 11.0, 'everyone is right!!', { size: 40, col: GOLD })
  label(x, '↔', 540, 980, { size: 80, col: BONE, alpha: u > 3.6 ? 1 : 0 })
  pisces(x, w, { x: 960, y: 1570, s: 150, mood: 'wide', look: [-1, -0.4], tears: 2, hops: [S[2] + 7.7] })
}
function c4(x, w, u) {
  room(x, 'living', { fy: 1440 })
  // the photo wall: frames slide into a perfect grid
  const g = ease.inOutCubic(prog(u, 1.0, 7.5))
  for (let i = 0; i < 6; i++) {
    const tx = 240 + (i % 3) * 300, ty = 520 + Math.floor(i / 3) * 260
    const ox = tx + (1 - g) * (Math.sin(i * 7.1) * 90), oy = ty + (1 - g) * (Math.cos(i * 3.3) * 60), rot = (1 - g) * Math.sin(i * 5) * 0.3
    x.save(); x.translate(ox, oy); x.rotate(rot); furn.frame(x, 0, 0, 200, 200, ['#ffd6e6', '#cfe8f6', '#fff3c4', '#d8f5e0', '#e8dcff', '#ffe0cc'][i]); x.restore()
  }
  // the spirit level in Libra's "hand"
  const lv = (x2, y2) => { box(x, x2 - 130, y2 - 18, 260, 36, '#ffd23a', { b: 4 }); box(x, x2 - 26, y2 - 12, 52, 24, '#9fe6b0', { b: 3 }); R(x, INK, x2 - 6 + 12 * Math.sin(u * 3) * (1 - g), y2 - 8, 12, 16) }
  lv(560, 1020)
  star(x, w, 'libra', { ...LIB, mood: g > 0.95 ? 'sparkle' : 'squint', look: [0.4, -1], hops: Array.from({ length: 8 }, (_, i) => S[3] + 1 + i * 0.9), seed: 1 })
  if (u > 8.6) { label(x, 'DING DONG', 830, 1100, { size: 40, col: GOLD, font: INTER, weight: 800, alpha: Math.floor(u * 5) % 2 ? 1 : 0.5 }) }
  pisces(x, w, { x: 930, y: 1560, s: 150, mood: 'sparkle', look: [-1, -1], tears: 2, hops: [S[3] + 8.7] })
  bubble(x, w, 900, 1380, S[3] + 6.0, S[3] + 8.4, 'it’s so even', { size: 30, col: '#bfe9ff', tail: 0.4 })
}
function c5(x, w, u) {
  room(x, 'living', { fy: 1440 })
  windowFrame(x, 640, 380, 360, 320, { seed: 4 })
  furn.couch(x, 120, 1400, 520, '#d0566e')
  star(x, w, 'taurus', { x: 790, y: 1240, s: 280, mood: u > LEN[4] + 0.6 ? 'heart' : u > 6 ? 'sparkle' : 'happy', look: [-1, 0], hops: [0.5, 6.1, LEN[4] + 0.7, LEN[4] + 1.0], seed: 9, blush: u > 6 })
  star(x, w, 'libra', { x: 360, y: 1210, s: 290, mood: u > LEN[4] - 0.4 ? 'sparkle' : 'happy', look: [1, 0], hops: [0.6, 3.0, LEN[4] - 0.2, LEN[4] + 0.4], seed: 1, blush: u > 8 })
  bubble(x, w, 790, 900, S[4] + 1.0, S[4] + 3.0, 'nice photo wall', { size: 36, tail: 0.2 })
  bubble(x, w, 790, 900, S[4] + 6.0, S[4] + 9.2, 'so… do you like me?', { size: 38, tail: 0.2, col: '#ffe0a8' })
  bubble(x, w, 360, 880, S[4] + LEN[4] - 0.4, END + 1, 'yes.', { size: 70, col: GOLD })
  // Pisces on the far end of the couch with popcorn → drops it, sobs
  const drop = clamp(prog(u, LEN[4] - 0.2, LEN[4] + 0.3))
  pisces(x, w, { x: 960, y: 1560, s: 170, mood: u > LEN[4] - 0.3 ? 'sparkle' : 'happy', look: [-1, -1], tears: u > LEN[4] - 0.3 ? 3 : 1, hops: [S[4] + LEN[4] - 0.25] })
  box(x, 860, 1460 + 200 * drop, 80, 60, '#e8634a', { b: 4 }); for (let i = 0; i < 6; i++) R(x, '#fff3c4', 850 + i * 18, 1440 + drop * (120 + i * 30), 16, 16)
  // the DECIDED stamp
  if (u > LEN[4] + 0.9) { const k = clamp(prog(u, LEN[4] + 0.9, LEN[4] + 1.05)); x.save(); x.translate(540, 600); x.rotate(-0.1); x.scale(lerp(1.4, 1, k), lerp(1.4, 1, k)); x.globalAlpha = k; R(x, RED, -300, -80, 600, 160); R(x, '#fff8ea', -284, -64, 568, 128); label(x, 'DECIDED.', 0, 4, { size: 90, col: RED, font: INTER, weight: 800, shadow: false }); x.restore(); confetti(x, w, S[4] + LEN[4] + 1.0, 540, 900, { n: 30 }) }
}

function world(x, w) { const { i, u } = band(w); [c1, c2, c3, c4, c5][i](x, w, u) }
const AT = [() => ({ x: 400, y: 1250 }), () => ({ x: 320, y: 1250 }), () => ({ x: 540, y: 1180 }), () => ({ x: 400, y: 1250 }), () => ({ x: 360, y: 1210 })]
const TITLES = ['8:30 AM · TWO SWEATERS', '12:15 PM · “ANYWHERE!”', '3:00 PM · BOTH SIDES', '7:00 PM · THE PHOTO WALL', '9:30 PM · THE VERDICT']

const EP = makeCaught({
  id: 'kcie18', sign: 'libra', name: 'Libra',
  hook: 'Five catches. | The *verdict* is at the end.', hookColor: '#ffb3d1',
  earlier: null,
  clockAt: w => { const { i, u } = band(w); const [h, m] = CLOCKS[i].split(':').map(Number); const s = Math.floor(u * (i === 0 ? 120 : 6)); return `${String(h).padStart(2, '0')}:${String(m + Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}` },
  catches: S.map((s, i) => ({ s, c: s + LEN[i], sticker: TITLES[i], hold: 1.2, circle: w => { const p = AT[i](w - s); return { x: p.x, y: p.y - 10, rx: 195, ry: 200, lx: 60, ly: p.y + 255, labelSide: 1 } } })),
  ending: 'cut', wEnd: END, lastAt: S[4] + LEN[4] + 2.4,
  last: 'Took all day. | Took *one second.*', lastColor: '#ffb3d1',
  world,
  cues: [
    ...Array.from({ length: 20 }, (_, i) => ['tick', +(0.2 + i * 0.25).toFixed(2), 0.025]), ['pop', S[0] + 6.4, 987.77, 0.035, 0.4],
    ...[0.3, 1.0, 2.2, 3.4, 4.6, 5.8, 7.0, 8.3].map((t, i) => ['pop', S[1] + t, i % 2 ? 523.25 : 783.99, 0.04, i % 2 ? -0.3 : 0.3]),
    ...Array.from({ length: 16 }, (_, i) => ['tick', +(S[2] + 0.4 + i * 0.6).toFixed(2), 0.03]), ...[3.6, 5.6, 7.6].map(t => ['pop', S[2] + t, 1174.66, 0.045, 0]),
    ...Array.from({ length: 12 }, (_, i) => ['tick', +(S[3] + 1 + i * 0.55).toFixed(2), 0.025]), ['bell', S[3] + 7.6, 1760, 0.03, 1.0, 0], ['bell', S[3] + 8.6, 1318.51, 0.05, 0.6, 0.4], ['bell', S[3] + 8.9, 1046.5, 0.05, 0.8, 0.4],
    ['pop', S[4] + 1.0, 880, 0.04, 0.3], ['pop', S[4] + 6.0, 659.25, 0.04, 0.3], ['riser', S[4] + 7.0, S[4] + LEN[4] - 0.4, 0.03], ['pop', S[4] + LEN[4] - 0.4, 1174.66, 0.06, -0.3],
    ...Array.from({ length: 6 }, (_, i) => ['pop', +(S[4] + LEN[4] + i * 0.05).toFixed(2), 2093 - i * 100, 0.02, 0.5]),
    ['boom', S[4] + LEN[4] + 1.0, 0.3], ['tom', S[4] + LEN[4] + 1.0, 90, { gain: 0.3, decay: 0.3 }], ['glitter', S[4] + LEN[4] + 1.0, S[4] + LEN[4] + 1.6],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, phone, sparkles, hearts, outK, pop01]
