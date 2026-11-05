// kswe05 · SIGN SWAP · "Leo Woke Up Listening" (18 s vertical, Month 2 boost m11 #5, pop · D, hard cut)
//   0.0   frame 0: Leo mid-pose with a hand mirror, the swap bolt mid-strike; the mirror already shows Virgo.
//         Hook "Leo woke up *a listener.*"  0.5 "caught" circle on the mirror: "who is THAT"
//   2.8   the café, first date (♐ Sagittarius). Virgo-Leo asks question after question; the date lights up.
//   8.0   a tiny inner Leo pops up on its shoulder, screaming "MENTION THE HAIR". Virgo-Leo: "tell me more."
//   11.6  the date: "you're so easy to talk to." ♓ Pisces the waiter cries into the menu.
//   16.4  last line "Asked *one* more question." holds, hard cut at 18.0.
import { makeSwap } from '../../kswe01/scenes/swapfilm.js'
import { star, swapper, swapBolt, swapTag, bubble, shadow, hearts, sparkles, mirror, table, mug, label, R, box, INK, GOLD, PINK, RED, BONE, SIGN, pop01, outK, prog, ease, clamp, lerp, r3 } from '../../kswe01/scenes/swapkit.js'

const FROM = 'leo', TO = 'virgo'
const A = SIGN(FROM), B = SIGN(TO)

function handMirror(x, t, cx, cy, s, inside) {
  x.save(); x.translate(cx, cy); x.rotate(-0.2)
  R(x, INK, -14 * s, 60 * s, 28 * s, 140 * s); R(x, '#c99a4a', -9 * s, 64 * s, 18 * s, 132 * s)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 92 * s, 110 * s, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c99a4a'; x.beginPath(); x.ellipse(0, 0, 84 * s, 102 * s, 0, 0, Math.PI * 2); x.fill()
  x.save(); x.beginPath(); x.ellipse(0, 0, 70 * s, 88 * s, 0, 0, Math.PI * 2); x.clip(); R(x, '#2b3a66', -80 * s, -100 * s, 160 * s, 200 * s); inside(); x.restore()
  x.restore()
}
function crownOn(x, cx, top, size) {
  const s = size / 300
  x.save(); x.translate(cx, top + 14 * s)
  const pts = [[-60, 0], [-60, -50], [-30, -20], [0, -64], [30, -20], [60, -50], [60, 0]]
  x.fillStyle = INK; x.beginPath(); pts.forEach(([a, b], i) => i ? x.lineTo(a * s * 1.15, b * s * 1.15 + 4 * s) : x.moveTo(a * s * 1.15, b * s * 1.15 + 4 * s)); x.fill()
  x.fillStyle = GOLD; x.beginPath(); pts.forEach(([a, b], i) => i ? x.lineTo(a * s, b * s) : x.moveTo(a * s, b * s)); x.fill()
  R(x, RED, -8 * s, -24 * s, 16 * s, 16 * s)
  x.restore()
}
function opening(x, t) {
  swapBolt(x, t, -0.25, { x1: 420, y1: 160, x2: 400, y2: 900, colA: A.color, colB: B.color, dur: 1.1 })
  const k = clamp(0.45 + t / 0.6 * 0.55)
  shadow(x, 400, 1195, 300)
  const r = swapper(x, t, 400, 950, 330, FROM, TO, k, { mood: t < 0.5 ? 'sparkle' : 'wide', look: [1, -0.3], squash: -0.05, hops: [2.0] })
  crownOn(x, 400, r.top, 330)
  handMirror(x, t, 760, 820, 1.3, () => star(x, t, 0, 10, 150, 'virgo', { mood: 'wide', look: [-1, 0], glyph: false, bob: 0 }))
  swapTag(x, t, 540, 1360, FROM, TO, 2.0, { out: 2.8 })
}
const QS = [
  ['so what got you into pottery?', 3.4, 'the clay just… listens to me', 4.3, 5.3],
  ['wait. your cat is called BISCUIT?', 5.4, 'yes!! nobody ever asks!', 6.3, 7.0],
  ['and how did that feel?', 7.0, null, 0, 7.9],
]
function cafeShot(x, t, S) {
  table(x, 540, 1130, 600, '#8a5a3a')
  mug(x, 430, 1130, '#e9b24a', 1, 1, t); mug(x, 660, 1130, '#c96a3a', 1, 1, t)
  // the date: Sagittarius, lighting up more with every question
  const glow = clamp((t - 3.4) / 6)
  shadow(x, 790, 1195, 240)
  star(x, t, 790, 980, 270, 'sagittarius', { mood: t < 4.3 ? 'neutral' : t < 11.6 ? 'happy' : 'heart', look: [-1, 0], glow: 0.8 + glow * 0.8, hops: [4.35, 6.35, 8.6, 11.7], seed: 3 })
  // Virgo-Leo leans in, listening
  shadow(x, 290, 1195, 250)
  const r = swapper(x, t, 290, 990, 280, FROM, TO, 1, { mood: t < 8.0 ? 'neutral' : t < 11.6 ? 'squint' : 'sparkle', look: [1, 0], squash: 0.04, hops: QS.map(q => q[1]) })
  for (const [q, at, a, at2, end] of QS) {
    bubble(x, t, 440, 700, at, a ? at2 : end, q, { size: 44, tail: -0.5, maxW: 1000 })
    if (a) bubble(x, t, 660, 780, at2, end, a, { size: 42, col: '#e7d6ff', tail: 0.5 })
  }
  // inner Leo on the shoulder
  if (t > 8.0 && t < 11.5) {
    const k = pop01(t, 8.0, 0.3, 2.6) * outK(t, [11.2, 11.5])
    const ir = star(x, t, 160, r.top - 30, 120, 'leo', { pop: k, mood: 'wide', look: [1, -0.3], hops: [8.3, 8.6, 8.9, 9.2, 9.5, 9.8], seed: 9 })
    crownOn(x, 160, ir.top, 120 * k)
    bubble(x, t, 440, 580, 8.2, 11.3, 'MENTION THE HAIR', { size: 50, col: '#ffd6a8', tail: -0.7 })
    bubble(x, t, 430, 800, 9.6, 11.4, 'tell me more.', { size: 44, tail: -0.3 })
  }
  if (t > 11.6) {
    bubble(x, t, 760, 700, 11.7, 16.2, 'you’re so easy\nto talk to.', { size: 46, col: '#e7d6ff', tail: 0.4 })
    hearts(x, t, 11.8, 790, 900, { n: 6 })
  }
  // Pisces the waiter, crying into the menu
  if (t > 12.4) {
    const pk = ease.outCubic(prog(t, 12.4, 13.0)), py = lerp(1900, 1520, pk)
    star(x, t, 540, py, 280, 'pisces', { mood: 'sparkle', look: [0, -0.5], tears: 3, hops: [13.1, 13.7, 14.3, 14.9] })
    x.save(); x.translate(540, py + 150); x.rotate(0.05); box(x, -120, -40, 240, 120, '#7a2a3a', { b: 6 }); label(x, 'MENU', 0, 20, { size: 34, col: GOLD, font: 'Inter', weight: 800 }); x.restore()
  }
  void S
}

const EP = makeSwap({
  duration: 18, ending: 'cut',
  hook: { text: 'Leo woke up *a listener.*', out: [2.6, 2.8], top: 220 },
  caps: [
    { at: 2.9, out: [7.8, 8.0], text: 'First date. *Question #14.*', top: 230, size: 86 },
    { at: 8.05, out: [11.4, 11.6], text: 'Inner Leo: *screaming.*', top: 230 },
  ],
  shots: [
    { at: 0, room: 'bed', cam: [1.0, 540, 960], push: 0.05, draw: opening },
    { at: 2.8, room: 'cafe', cam: [1.15, 540, 1010], push: 0.06, draw: cafeShot },
  ],
  fx: [
    { kind: 'whip', at: -0.2, from: 1.45 },
    { kind: 'shake', at: 0.0, len: 0.4, amp: 20 },
    { kind: 'caught', at: 0.5, x: 760, y: 820, r: 170, out: [2.3, 2.45], label: 'who is THAT', arrow: 'bl', rec: false },
    { kind: 'shake', at: 8.0, len: 0.4, amp: 16 },
  ],
  flash: [{ at: 1.95, col: B.color, a: 0.4 }],
  punch: [{ at: 8.05, dur: 1.4, z: 0.1, x: 420, y: 860 }, { at: 11.7, dur: 1.4, z: 0.1, x: 660, y: 900 }],
  last: { at: 16.4, text: 'Asked *one* more question.', top: 290 },
  cues: [
    ['glitter', 0.0, 0.5], ['pop', 2.0, 1174.66, 0.05, 0],
    ...QS.flatMap(([, at, a, at2]) => [['pop', r3(at), 880, 0.035, -0.3], ...(a ? [['pop', r3(at2), 1046.5, 0.035, 0.3]] : [])]),
    ['tom', 8.05, 110, { gain: 0.2, decay: 0.15 }], ...[8.3, 8.6, 8.9, 9.2].map(t => ['pop', t, 1318.51, 0.025, -0.4]), ['pop', 9.6, 783.99, 0.03, 0],
    ['glitter', 11.75, 12.4], ['pluck', 13.1, 659.25, 0.035, 0.5, 0.3], ['pluck', 13.25, 587.33, 0.035, 0.5, 0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
