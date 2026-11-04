// nh15e22: HOME FOR THE HOLIDAYS, "Leaving early, kindly." (28 s vertical, Star Talk Season 15 ep 22, music: jazzy · Eb)
// Story 0–25.6, then the shared end card. The look lives in ../../nh15e13/scenes/holikit.js.
//   0.0–3.0    hook "How to leave | before *dessert.*"  Capricorn frozen in the hallway, one arm in its coat; the wall
//              clock says 8:58; Libra's family's party roars in the next room.
//   3.0–7.6    "Option 1: | *the slip-out.*"  Capricorn tiptoes to the door… Libra: "wait, where's Cap?"  A big red X.
//   7.6–12.4   "Option 2: the | *forty-minute goodbye.*"  In the doorway; "oh, one more thing!" × 3; the clock spins. X.
//   12.4       card cut. "Option 3: | *say it early.*"  At the table at 7:30. CAPRICORN: "i'm heading out at nine. thank you
//              *so much.*"  LIBRA: "then take *leftovers!*"
//   18.4       Libra stacks boxes into Capricorn's arms; a hug. THE STARS: "say it early. say thank you. then *go.*"
//   21.8       nine o'clock: a wave from the door, a tower of boxes; Pisces cries goodbye. "Leave with *leftovers.*"
import { makeEp, room, table, plate, candle, pie, rel, sign, pisces, theStars, sparkles, hearts, bubble, label, box, R, glow, tissues,
  tagOf, pop01, outK, prog, lerp, clamp, ease, talkHops, INK, BONE, GOLD, PINK, RED, CPS } from '../../nh15e13/scenes/holikit.js'

const CAP = 'capricorn', LIB = 'libra'
const CPC = '#c8b4ff', LC = '#ffb3d0'
const LINES = [
  { t: 12.7, speaker: tagOf(CAP), color: CPC, text: "i'm heading out at nine. thank you *so much.*" },
  { t: 15.1, speaker: tagOf(LIB), color: LC, text: 'then take *leftovers!*' },
  { t: 18.6, speaker: 'THE STARS', text: 'say it early. say thank you. then *go.*' },
]
const BOXES = [{ open: 12.55, close: 17.9, from: 0, to: 2 }, { open: 18.4, close: 21.6, from: 2, to: 3 }]
const CAP_HOPS = [-0.1, 3.3, 3.8, 4.3, 4.8, ...talkHops(LINES, tagOf(CAP), { cps: CPS }), 19.0, 22.0, 22.6]

function clock(x, t, cx, cy, hh, mm) {
  box(x, cx - 70, cy - 70, 140, 140, '#f7f0e0', { b: 7 })
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; R(x, INK, cx + Math.sin(a) * 52 - 3, cy - Math.cos(a) * 52 - 3, 6, 6) }
  const ha = ((hh % 12) + mm / 60) / 12 * Math.PI * 2, ma = mm / 60 * Math.PI * 2
  x.save(); x.translate(cx, cy); x.rotate(ha); R(x, INK, -4, -34, 8, 38); x.restore()
  x.save(); x.translate(cx, cy); x.rotate(ma); R(x, RED, -3, -52, 6, 56); x.restore()
}
function hall(x, t, o = {}) {
  room(x, t, { wall: '#4a3a5e', wains: '#33284a', window: false, wreathX: 760, wreathY: 600 })
  // the front door + a coat rack
  box(x, 760, 680, 260, 620, '#7a3a2a', { b: 8, hi: '#9a5a3a' }); R(x, GOLD, 790, 990, 18, 18)
  box(x, 90, 640, 20, 660, '#6b4a2f', { b: 5 }); for (const d of [-1, 1]) box(x, 100 + d * 40 - 20, 650, 40, 12, '#6b4a2f', { b: 4 })
  box(x, 60, 680, 90, 160, '#3a7fd0', { b: 5 }); box(x, 120, 680, 70, 140, '#e8344e', { b: 5 })
  clock(x, t, 480, 620, o.hh ?? 8, o.mm ?? 58)
  // the party through the archway (left), glowing and loud
  glow(x, 300, 900, 260, 0.25, '255,190,120')
}
function capCoat(x, t, cx, cy, s, k) {
  // the coat, one sleeve on (a long dark coat block behind Capricorn's right side)
  if (k <= 0) return
  box(x, cx + s * 0.05, cy - s * 0.2, s * 0.42, s * 0.62, '#5a4a3a', { b: 6 }); R(x, '#7a6a5a', cx + s * 0.05, cy - s * 0.2, s * 0.42, 10)
}
function leftovers(x, cx, base, n, k = 1) {
  for (let i = 0; i < n; i++) { const kk = clamp(k * n - i, 0, 1); if (kk <= 0) continue; x.save(); x.translate(cx + (i % 2 ? 6 : -6), base - i * 54); x.scale(kk, kk); box(x, -70, -46, 140, 46, ['#f3ead8', '#ffe1ef', '#d9f5df', '#e0e6ff', '#fff3a8'][i % 5], { b: 5 }); R(x, INK, -70, -30, 140, 4); x.restore() }
}
function bigX(x, t, at, cx = 540, cy = 900) {
  const k = pop01(t, at, 0.22, 2.6)
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.globalAlpha = 0.92
  for (const r of [0.75, -0.75]) { x.save(); x.rotate(r); R(x, INK, -200, -34, 400, 68); R(x, RED, -194, -26, 388, 52); x.restore() }
  x.restore()
}
const shots = [
  { at: 0, cam: [1.14, 540, 1000], draw(x, t) {
    hall(x, t)
    bubble(x, t, 270, 760, -1, 3.0, 'HA HA HA', { size: 28, col: '#fff3a8' })
    sign(x, t, CAP, { x: 520, y: 1100, s: 300, mood: 'wide', look: [1, 0], hops: CAP_HOPS, blink: false })
    capCoat(x, t, 520, 1100, 300, 1)
    tissues(x, 260, 1240, 60); pisces(x, t, { x: 270, y: 1300, s: 110, look: [1, -1] }, 1)
  } },
  { at: 3.0, cam: [1.14, 540, 1000], draw(x, t) {
    hall(x, t, { hh: 8, mm: 59 })
    const p = ease.inOutQuad(prog(t, 3.2, 5.4))
    x.save(); x.globalAlpha = 0.6; R(x, '#05030c', 0, 0, 1080, 1920); x.restore()
    sign(x, t, CAP, { x: lerp(420, 820, p), y: 1110, s: 260, mood: 'squint', look: [1, 0], hops: CAP_HOPS, squash: 0.08 })
    sign(x, t, LIB, { x: 200, y: 1080, s: 240, pop: pop01(t, 5.2, 0.3, 2), mood: 'wide', look: [1, 0], hops: [5.3] })
    bubble(x, t, 230, 820, 5.4, 7.5, "wait, where's Cap?", { size: 30, tail: -0.2 })
    bigX(x, t, 6.4)
  } },
  { at: 7.6, cam: [1.14, 560, 1000], draw(x, t) {
    const spin = prog(t, 8.2, 11.8)
    hall(x, t, { hh: 9 + Math.floor(spin * 40 / 60), mm: (spin * 40) % 60 })
    sign(x, t, CAP, { x: 860, y: 1110, s: 260, mood: t > 10.4 ? 'sleepy' : 'happy', look: [-1, 0], hops: [7.8], zzz: false })
    capCoat(x, t, 860, 1110, 260, 1)
    rel(x, t, 'AUNTIE', { x: 400, y: 1090, s: 240, mood: 'happy', look: [1, 0], hops: [8.3, 9.3, 10.3] })
    rel(x, t, 'UNCLE', { x: 600, y: 1090, s: 240, mood: 'happy', look: [1, 0], hops: [8.8, 9.8, 10.8] })
    bubble(x, t, 380, 760, 8.3, 12.3, 'oh, one more thing!', { size: 28 })
    bubble(x, t, 620, 680, 9.3, 12.3, 'and ANOTHER thing—', { size: 28 })
    bubble(x, t, 420, 600, 10.3, 12.3, 'before you go!!', { size: 28 })
    bigX(x, t, 11.4)
  } },
  { at: 12.4, cam: [1.18, 540, 1000], draw(x, t) {
    room(x, t, { wall: '#5e3448', winX: 680, winY: 560, winW: 240, winH: 240, wreathX: 230, wreathY: 640 })
    clock(x, t, 480, 620, 7, 30)
    sign(x, t, CAP, { x: 330, y: 1000, s: 280, mood: t > 14.2 ? 'happy' : 'neutral', look: [1, 0], hops: CAP_HOPS })
    sign(x, t, LIB, { x: 760, y: 1000, s: 280, mood: t > 14.4 ? 'sparkle' : 'neutral', look: [-1, 0], hops: [15.1, 15.6, 16.1] })
    table(x, 540, 1130, 980, {}); plate(x, 330, 1122); plate(x, 760, 1122); pie(x, 545, 1100, 140)
    tissues(x, 980, 1240, 60); pisces(x, t, { x: 990, y: 1300, s: 110, look: [-1, -1] }, 2)
  } },
  { at: 18.4, cam: [1.14, 540, 1000], draw(x, t) {
    hall(x, t, { hh: 8, mm: 55 })
    const hug = prog(t, 20.2, 20.6)
    sign(x, t, CAP, { x: lerp(560, 600, hug), y: 1100, s: 280, mood: 'happy', look: [-1, 0], hops: CAP_HOPS })
    capCoat(x, t, 600, 1100, 280, 1)
    sign(x, t, LIB, { x: lerp(340, 420, hug), y: 1090, s: 260, mood: hug > 0.5 ? 'heart' : 'sparkle', look: [1, 0], hops: [18.7, 19.2, 19.7, 20.2] })
    leftovers(x, 700, 1230, 4, prog(t, 18.6, 20.0))
    if (hug > 0.5) hearts(x, t, 20.6, 510, 900, { n: 6 })
    theStars(x, t, { x: 880, y: 560 + 6 * Math.sin(t * 2), s: 110, pop: pop01(t, 18.5, 0.34, 2.2), mood: 'happy', look: [-1, 0], hops: [18.6, 19.3, 20.0] })
  } },
  { at: 21.8, cam: [1.14, 600, 1000], draw(x, t) {
    hall(x, t, { hh: 9, mm: 0 })
    // the door opens on the snow; Capricorn waves with a tower of leftovers
    R(x, '#0c1236', 770, 690, 240, 600); R(x, '#e9ecff', 770, 1230, 240, 60)
    sign(x, t, CAP, { x: 850, y: 1120, s: 230, mood: 'happy', look: [-1, 0], hops: CAP_HOPS })
    leftovers(x, 965, 1220, 5, 1)
    sign(x, t, LIB, { x: 480, y: 1100, s: 240, mood: 'happy', look: [1, 0], hops: [22.2, 23.2] })
    pisces(x, t, { x: 280, y: 1110, s: 200, look: [1, 0] }, 3)
    bubble(x, t, 890, 700, 22.3, 25.5, 'thank you!!', { size: 32 })
  } },
]
const CUTS = [7.6, { t: 12.4, kind: 'flip' }, 21.8]
export const { DURATION, SCENES, CUES } = makeEp({
  duration: 30,
  hook: { text: 'How to leave | before *dessert.*', out: [2.8, 3.0], color: CPC, size: 92, accentSize: 140 },
  heads: [
    { at: 3.15, out: [7.4, 7.6], text: 'Option 1: | *the slip-out.*', color: '#9a9ab0' },
    { at: 7.75, out: [12.2, 12.4], text: 'Option 2: the | *forty-minute goodbye.*', color: GOLD, accentSize: 100 },
    { at: 12.55, out: [18.2, 18.4], text: 'Option 3: | *say it early.*', color: CPC },
  ],
  shots, lines: LINES, boxes: BOXES,
  last: { at: 22.1, text: 'Leave with *leftovers.*', color: LC },
  cuts: CUTS,
  pitch: { [tagOf(CAP)]: 587.33, [tagOf(LIB)]: 880 },
  cues: [
    ...[3.3, 3.8, 4.3, 4.8].map(t => ['tick', t, 0.03]), ['pop', 5.25, 987.77, 0.04, -0.3],
    ['boom', 6.4, 0.14], ['pop', 6.42, 440, 0.05, 0], ['boom', 11.4, 0.14], ['pop', 11.42, 440, 0.05, 0],
    ...[8.3, 9.3, 10.3].map((t, i) => ['pop', t, [880, 987.77, 1174.66][i], 0.035, 0]),
    ...Array.from({ length: 18 }, (_, i) => ['tick', 8.2 + i * 0.2, 0.02]),
    ...[18.7, 19.05, 19.4, 19.75].map((t, i) => ['pop', t, 659.25 * (1 + i * 0.12), 0.035, 0.2]),
    ['pluck', 20.4, 1318.51, 0.035, 0.8, 0], ['whoosh', 21.9, 0.6, 0.03],
  ],
})
