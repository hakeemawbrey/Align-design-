// trexpectoutfit (20 s vertical, Star Talk Trends · EXPECTATION vs REALITY · 5) "Matching, technically." · lofi Em.
// The format's shared look lives in ./evr.js (identical in all five trexpect films). Story 0–15.6, then the end card.
//   EXPECTATION  "Expectation: | the *sleek* date fit."  A red carpet between velvet ropes, flashbulbs popping.
//                ♎ LIBRA in a gold bow tie, ♏ SCORPIO in dark shades. They strike a pose (flash burst). Heart eyes.
//   REALITY      "Reality: | *comfy* won."  Libra's front door, 7:02 PM. Three stickers:
//                COMFY SWEATER (the door opens: Libra in a big mustard knit) · SAME SWEATER (Scorpio slides in… in the
//                exact same sweater) · SAME SOCKS (striped socks pop onto both). A hush: they look each other up and
//                down… crack up.
//   card cut     at the laugh.
//   TURN         "Fit check: | *twinning.*"  Reality fills the frame: a coat rack on the left with three more of the same
//                sweater, and on the right ♓ Pisces, ALSO in the sweater, sobbing happy tears. Box (LIBRA):
//                "honestly? *balanced.*"
//   LAST         "*Matching,* technically."  A stamp THUNKs on: 10/10.
import { makeEVR, BEAT, r3, INK, BONE, GOLD, PINK, HOT, clamp, lerp, prog, ease, drawPixelStar } from './evr.js'

const ROPE_POST = ['GG', 'GG', 'gg', 'gg', 'gg', 'gg', 'gg', 'gg', 'GG']
const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const SWEATER_C = ['#e9a93a', '#d08a22']

// sprite-cell accessories (drawn inside the star's sprite, 0…36 cells)
function cellRect(x, i, j, w, h, c) { x.fillStyle = c; x.fillRect(i, j, w, h) }
function sweater(x, k = 1) {
  if (k <= 0) return
  x.save(); x.globalAlpha *= clamp(k)
  const [A, B] = SWEATER_C
  // sleeves: stepped blocks up to both arm tips (ink first, then knit)
  const SL = [[5, 18.5, 5, 4], [2.5, 15.5, 5, 4], [0.5, 12.5, 4.5, 4]]
  for (const pass of [0, 1]) for (const [i, j, w, h] of SL) for (const m of [1, -1]) {
    const X = m > 0 ? i : 36 - i - w
    if (!pass) cellRect(x, X - 0.8, j - 0.8, w + 1.6, h + 1.6, INK)
    else { cellRect(x, X, j, w, h, A); cellRect(x, X, j + h - 1, w, 0.8, B) }
  }
  // body: shoulders at row 20.5, ribbed hem at 29–30.5
  cellRect(x, 6, 20, 24, 11.3, INK); cellRect(x, 6.8, 20.8, 22.4, 9.7, A)
  for (let j = 22; j < 28.5; j += 2) for (let i = 7; i < 29; i += 2) cellRect(x, i + (j % 4 === 0 ? 1 : 0), j, 1, 1, B)
  for (let i = 7; i < 29; i += 1.5) cellRect(x, i, 28.8, 0.7, 1.7, B)
  cellRect(x, 6.8, 20.8, 22.4, 1, '#f6c862')
  // collar + a little heart patch
  cellRect(x, 14, 20, 8, 1.6, B)
  cellRect(x, 15.5, 23.5, 2, 2, HOT); cellRect(x, 18.5, 23.5, 2, 2, HOT); cellRect(x, 16, 25, 4, 1.5, HOT); cellRect(x, 17, 26.5, 2, 1, HOT)
  x.restore()
}
function socks(x, k = 1) {
  if (k <= 0) return
  x.save(); x.globalAlpha *= clamp(k)
  for (const i0 of [5.6, 26.4]) {
    cellRect(x, i0 - 0.6, 30.4, 5.2, 4.6, INK)
    for (let j = 0; j < 4; j++) cellRect(x, i0, 31 + j, 4, 1, j % 2 ? '#ffffff' : '#ff6f91')
  }
  x.restore()
}
function bowtie(x) {
  cellRect(x, 12, 23, 12, 5, INK); cellRect(x, 13, 24, 4, 3, GOLD); cellRect(x, 19, 24, 4, 3, GOLD); cellRect(x, 17, 24.5, 2, 2, '#fff1a0')
}
function shades(x) {
  cellRect(x, 7.5, 15.5, 21, 1.2, INK); cellRect(x, 7.5, 15.5, 9, 6, INK); cellRect(x, 19.5, 15.5, 9, 6, INK)
  cellRect(x, 8.5, 16.5, 7, 4, '#2b2140'); cellRect(x, 20.5, 16.5, 7, 4, '#2b2140'); cellRect(x, 9.5, 16.8, 2, 1, '#ffffffaa'); cellRect(x, 21.5, 16.8, 2, 1, '#ffffffaa')
}

const STAR_Y = 1070, STAR_S = 176, LIB_X = 410, SCO_X = 668
const G1 = BEAT(9), G2 = BEAT(11), G3 = BEAT(13)
const T2 = { pose: BEAT(3), hearts: BEAT(5), door: [G1 - 0.3, G1 + 0.05], slide: [G2 - 0.35, G2] }

const EVR = makeEVR({
  id: 'trexpectoutfit', pair: ['libra', 'scorpio'],
  heads: {
    expect: 'Expectation: | the *sleek* date fit.',
    reality: 'Reality: | *comfy* won.',
    turn: 'Fit check: | *twinning.*',
    last: '*Matching,* technically.',
  },
  accents: { expect: '#ff8fb1', reality: '#f6c862', turn: '#ff6f91', last: '#f6c862' },
  stickers: [{ text: 'COMFY SWEATER', x: -60, y: 606, rot: -0.06 }, { text: 'SAME SWEATER', x: 40, y: 680, rot: 0.05 }, { text: 'SAME SOCKS', x: -30, y: 756, rot: -0.04 }],
  stamp: '10/10', stampAt: { y: 690 },
  clock: { expect: '7:00 PM', reality: '7:02 PM' },
  line: { who: 0, text: 'honestly? *balanced.*' },
  lineColor: '#f6c862',
  gloss: ['#2a1240', '#b0406e'],
  real: ['#6e6a80', '#3e3a4e'],

  glossy(x, t, W) {
    const { px, bits } = W
    // the backdrop wall of little lights + flashbulbs
    for (let j = 0; j < 7; j++) for (let i = 0; i < 9; i++) { const X = 290 + i * 62 + (j % 2) * 31, Y = 380 + j * 80; px(X, Y, 6, 6, `rgba(255,220,240,${0.25 + 0.2 * Math.sin(t * 2 + i + j)})`) }
    for (let n = 0; n < 10; n++) {
      const s0 = 0.9 + n * 0.37 + (n % 3) * 0.05, q = prog(t, s0, s0 + 0.25)
      if (q <= 0 || q >= 1) continue
      const X = 300 + ((n * 173) % 480), Y = 420 + ((n * 97) % 360)
      x.save(); x.globalAlpha = 1 - q; drawPixelStar(x, X, Y, 46 * (1 - 0.3 * q), 1, '#ffffff'); x.restore()
    }
    // the pose flash: a whole-world white blink
    const fq = prog(t, T2.pose, T2.pose + 0.35)
    if (fq > 0 && fq < 1) { x.fillStyle = `rgba(255,255,255,${0.55 * (1 - fq)})`; x.fillRect(0, 300, 1080, 1100) }
    // the red carpet (receding) + velvet ropes
    x.fillStyle = INK; x.beginPath(); x.moveTo(470, 980); x.lineTo(610, 980); x.lineTo(820, 1400); x.lineTo(260, 1400); x.fill()
    x.fillStyle = '#c8283c'; x.beginPath(); x.moveTo(476, 986); x.lineTo(604, 986); x.lineTo(808, 1400); x.lineTo(272, 1400); x.fill()
    x.fillStyle = '#e8475a'; x.fillRect(470, 986, 140, 6)
    for (const s of [-1, 1]) {
      bits(ROPE_POST, { G: GOLD, g: '#c8963a' }, 540 + s * 220, 1110, 10); bits(ROPE_POST, { G: GOLD, g: '#c8963a' }, 540 + s * 300, 1250, 12)
      x.strokeStyle = '#8a1a3a'; x.lineWidth = 10; x.beginPath(); x.moveTo(540 + s * 220, 1080); x.quadraticCurveTo(540 + s * 260, 1180, 540 + s * 300, 1215); x.stroke()
    }
    // the stars, dressed up
    const mood = t > T2.hearts - 0.2 ? 'heart' : 'sparkle'
    W.star(0, LIB_X, STAR_Y, STAR_S, { mood, look: [1, 0], hops: [1.0, T2.pose], pop: W.pop01(t, 0.7, 0.35, 2), prop: () => bowtie(x) })
    W.star(1, SCO_X, STAR_Y, STAR_S, { mood: 'neutral', look: [-1, 0], hops: [1.15, T2.pose + 0.06], pop: W.pop01(t, 0.82, 0.35, 2), prop: () => shades(x) })
    W.sparkles(t, 540, 1000, T2.pose, 10, 120, 1, [GOLD, '#fff', PINK])
    for (let i = 0; i < 5; i++) {
      const b = T2.hearts + i * 0.32, q = prog(t, b, b + 2.2)
      if (q <= 0 || q >= 1) continue
      bits(HEART, { H: i % 2 ? HOT : PINK }, 540 + (i - 2) * 60 + 18 * Math.sin(t * 3 + i), 930 - q * 360, 5, { alpha: Math.sin(Math.PI * q) })
    }
  },

  scrappy(x, t, W) {
    const { px, bits, T } = W
    // a hallway wall, the floor, a doormat
    for (let X = 0; X < 1080; X += 54) px(X, 320, 2, 860, 'rgba(255,255,255,0.05)')
    px(0, 1180, 1080, 220, '#5a4a48'); for (let X = 0; X < 1080; X += 72) px(X, 1180, 3, 220, '#4a3c3a')
    // the door (left of centre): frame, the swinging panel, a warm room behind
    px(300, 760, 230, 430, INK); px(310, 770, 210, 420, '#ffcf8a')
    const op = ease.inOutCubic(prog(t, ...T2.door))
    // the couple (Libra stands in the doorway; Scorpio slides in from the right)
    const hush = t > T.hush[0] && t < T.laugh
    let lm = 'happy', sm = 'happy', ll = [1, 0], sl = [-1, 0]
    if (t > G2) { lm = 'wide'; sm = 'wide'; ll = [1, 0]; sl = [-1, 0] }
    if (t > G2 + 0.6) { ll = [1, 1]; sl = [-1, 1]; lm = 'squint'; sm = 'squint' }
    if (t > G3) { lm = 'wide'; sm = 'wide'; ll = [0, 1]; sl = [0, 1] }
    if (hush) { lm = 'neutral'; sm = 'neutral'; ll = [1, 0]; sl = [-1, 0] }
    if (t > T.laugh) { lm = 'happy'; sm = 'happy'; ll = sl = undefined }
    if (t > T.line + 1.0) sm = 'heart'
    const tears = t > T.laugh + 0.5 ? 2 : 0
    const sq = t > T.laugh && t < T.laugh + 1.8 ? 0.06 * Math.sin((t - T.laugh) * 30) : 0
    const sockK = W.pop01(t, G3, 0.3, 2.5)
    const lib = { X: LIB_X + 10, Y: STAR_Y }
    if (op > 0.02) W.star(0, lib.X, lib.Y, STAR_S, { mood: lm, look: ll, tears, squash: sq, hops: [G1 + 0.1, G3 + 0.05, ...W.laughHops], prop: () => { sweater(x); socks(x, sockK) } })
    // the door panel swings open (narrows toward the hinge on the left)
    const dw = 210 * (1 - 0.82 * op)
    px(310, 770, dw, 420, '#8a5a3a'); px(310 + dw - 6, 770, 6, 420, '#6b4428')
    if (dw > 60) { px(310 + 20, 800, dw - 40, 150, '#9a6a48'); px(310 + 20, 990, dw - 40, 170, '#9a6a48'); px(310 + dw - 34, 980, 14, 14, GOLD) }
    // Scorpio slides in
    const sl0 = ease.outBack(prog(t, ...T2.slide), 1.2)
    if (sl0 > 0.01) W.star(1, lerp(980, SCO_X, sl0), STAR_Y, STAR_S, { mood: sm, look: sl, tears, squash: -sq, hops: [G2 + 0.02, G3 + 0.1, ...W.laughHops.map(h => r3(h + 0.12)), T.line + 0.6], prop: () => { sweater(x); socks(x, sockK) } })
    // the coat rack with three more of the same sweater (revealed by the widen)
    px(126, 760, 10, 420, INK); px(70, 1170, 122, 12, INK); px(40, 760, 196, 10, INK)
    for (let i = 0; i < 3; i++) {
      const X = 50 + i * 76, sw = 3 * Math.sin(t * 1.5 + i)
      px(X - 14 + sw, 790, 72, 34, INK); px(X - 10 + sw, 794, 64, 26, SWEATER_C[0])
      px(X - 4 + sw, 790, 52, 92, INK); px(X + sw, 794, 44, 84, SWEATER_C[0]); px(X + sw, 794, 44, 6, '#f6c862')
      for (let j = 0; j < 4; j++) px(X + sw, 810 + j * 18, 44, 4, SWEATER_C[1])
      px(X + 18 + sw, 830, 8, 8, HOT)
    }
    // Pisces, also in the sweater, sobbing (revealed by the widen)
    W.pisces(925, 1100, 150, t > T.laugh ? 3 : 2, t > T.laugh ? 'happy' : 'sparkle', { look: [-1, 0], hops: [T.widen[1] + 0.05, T.widen[1] + 0.5], prop: () => { sweater(x); socks(x) } })
  },

  cues(T) {
    return [
      // glossy: flash pops + the pose burst + hearts
      ...Array.from({ length: 10 }, (_, n) => ['tick', r3(0.9 + n * 0.37 + (n % 3) * 0.05), 0.02]),
      ['pop', r3(T2.pose), 1975.53, 0.04, 0], ['bell', r3(T2.pose + 0.05), 2349.32, 0.03, 1.4, 0], ['glitter', T2.pose, r3(T2.pose + 0.45)],
      ...Array.from({ length: 5 }, (_, i) => ['pluck', r3(T2.hearts + i * 0.32), [880, 987.77, 1174.66, 1318.51, 1567.98][i], 0.022, 0.4, (i - 2) * 0.2]),
      // the door creaks open, Scorpio slides in, the socks pop
      ['tick', r3(T2.door[0]), 0.05], ['pluck', r3(T2.door[0] + 0.05), 233.08, 0.03, 0.6, -0.3], ['pluck', r3(T2.door[0] + 0.2), 246.94, 0.025, 0.6, -0.3],
      ['whoosh', r3(T2.slide[0]), 0.35, 0.04], ['pop', r3(G2 + 0.6), 1318.51, 0.03, 0], ['pop', r3(G2 + 0.68), 1318.51, 0.03, 0],
      ['pop', r3(G3), 1567.98, 0.04, -0.2], ['pop', r3(G3 + 0.06), 1567.98, 0.04, 0.2],
    ]
  },
})

export const { DURATION, T, SCENES, CUES, CUTS, MUSIC } = EVR
