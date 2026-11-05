// kswe12 · SIGN SWAP · "Pisces Woke Up Balanced" (17 s vertical, Month 2 boost m11 #12, dreamy · Db, hard cut)
//   0.0   frame 0: the wedding, Pisces mid-gasp, perfectly balanced scales popping into its hands, the swap bolt
//         mid-strike, half Libra-pink. Hook "Pisces woke up *not crying.*"  0.6 freeze: "single at the wedding. *table 9.*"
//   2.6   calm through the cake · the bouquet flying past · the seating chart ("TABLE 9"). A TEARS: 0 counter.
//   8.2   the vows (♉ and ♋ under the arch): "i promise to always share my fries." The lip wobbles, the scales tip.
//   10.4  the tears burst out like a fountain; the counter spins to ∞; napkins fly in from the whole table.
//   15.4  last line "Balance lasted *four* minutes." holds, hard cut at 17.0.
import { makeSwap } from '../../kswe01/scenes/swapfilm.js'
import { star, swapper, swapBolt, swapTag, bubble, sticker, shadow, hearts, sparkles, scalesProp, table, label, R, box, INK, GOLD, PINK, RED, BONE, SIGN, pop01, outK, prog, ease, clamp, lerp, r3 } from '../../kswe01/scenes/swapkit.js'

const FROM = 'pisces', TO = 'libra'
const A = SIGN(FROM), B = SIGN(TO)
const BURST = 10.4

function counter(x, t) {
  // a soft dark band at the top so the white arch never fights the captions
  const g = x.createLinearGradient(0, 120, 0, 520); g.addColorStop(0, 'rgba(10,6,30,0.7)'); g.addColorStop(0.7, 'rgba(10,6,30,0.45)'); g.addColorStop(1, 'rgba(10,6,30,0)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 520)
  if (t < 2.7) return
  const k = pop01(t, 2.7, 0.3, 2.4)
  const txt = t < BURST ? 'TEARS: 0' : t < BURST + 0.6 ? `TEARS: ${Math.floor((t - BURST) * 400)}` : 'TEARS: ∞'
  x.save(); x.translate(880, 470); x.rotate(0.04); x.scale(k, k)
  x.font = "700 40px 'Space Mono'"; const w = x.measureText(txt).width + 40
  R(x, INK, -w / 2 - 6, -36, w + 12, 72); R(x, t < BURST ? '#2fc79a' : '#8fe3ff', -w / 2, -30, w, 60)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 3)
  x.restore()
}
function me(x, t, px, py, size, o = {}) {
  const back = t > BURST ? 1 - 0.5 * ease.outCubic(prog(t, BURST, BURST + 0.6)) : 1
  const k = t < 0.6 ? clamp(0.45 + t / 0.6 * 0.55) : back
  const r = swapper(x, t, px, py, size, FROM, TO, k, o)
  const tilt = t < 8.6 ? Math.sin(t * 1.3) * 0.03 : t < BURST ? Math.sin(t * 14) * 0.12 : 0.5
  if (t > -0.3) scalesProp(x, px + size * 0.62, py + size * 0.42, tilt, size / 420 * pop01(t, -0.4, 0.4))
  return r
}
function opening(x, t) {
  swapBolt(x, t, -0.25, { x1: 440, y1: 200, x2: 420, y2: 920, colA: A.color, colB: B.color, dur: 1.1 })
  shadow(x, 420, 1195, 300)
  me(x, t, 420, 960, 330, { mood: 'wide', look: [0, 0], hops: [2.0] })
  swapTag(x, t, 540, 1380, FROM, TO, 2.0, { out: 2.6 })
}
const BEATS = [['the cake.', 2.7, 4.3], ['the bouquet.', 4.4, 6.1], ['the seating chart.', 6.2, 8.1]]
function calmShot(x, t) {
  table(x, 540, 1130, 700, '#e8dcc6', '#f4ecdc')
  const b = t < 4.4 ? 0 : t < 6.2 ? 1 : 2
  if (b === 0) { box(x, 640, 920, 200, 90, '#fff3f8', { b: 6 }); box(x, 670, 850, 140, 70, '#fff3f8', { b: 6 }); box(x, 700, 800, 80, 50, '#fff3f8', { b: 6 }); heart(x, 740, 770, 6) }
  if (b === 1) { const p = prog(t, 4.5, 5.6); const bx = lerp(-100, 1200, p), by = 700 - Math.sin(Math.PI * p) * 260; for (let i = 0; i < 5; i++) heart(x, bx + (i - 2) * 22, by + (i % 2) * 18, 6, i % 2 ? PINK : '#fff0f6') }
  if (b === 2) { box(x, 620, 760, 300, 360, '#f4ecdc', { b: 6 }); label(x, 'TABLE 9', 770, 810, { size: 36, col: INK, font: 'Inter', weight: 800 }); for (let i = 0; i < 4; i++) R(x, '#c9c2b0', 660, 860 + i * 56, 220, 18) }
  shadow(x, 360, 1195, 280)
  me(x, t, 360, 960, 300, { mood: 'happy', look: [1, 0], hops: [2.8, 4.5, 6.3] })
  for (const [c, a, e] of BEATS) sticker(x, t, c, 540, 640, a, e, { size: 50, col: [GOLD, PINK, '#c9f2d4'][BEATS.findIndex(z => z[0] === c)], rot: -0.05 })
}
function heart(x, cx, cy, cell, col = PINK) { const HB = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']; for (let j = 0; j < HB.length; j++) for (let i = 0; i < 7; i++) if (HB[j][i] === 'H') { R(x, col, cx - 3.5 * cell + i * cell, cy - 3 * cell + j * cell, cell, cell) } }
function vowShot(x, t) {
  // the couple under the arch, at the back
  star(x, t, 430, 1000, 200, 'taurus', { mood: 'heart', look: [1, 0], seed: 3 })
  star(x, t, 650, 1000, 200, 'cancer', { mood: t > 9.4 ? 'heart' : 'happy', look: [-1, 0], seed: 4, hops: [9.5] })
  bubble(x, t, 540, 760, 8.4, 10.3, 'i promise to always\nshare my fries.', { size: 40, tail: -0.2 })
  // Libra-Pisces in front, wobbling… then the fountain
  const wob = t > 8.6 && t < BURST ? Math.sin(t * 40) * 5 : 0
  shadow(x, 540 + wob, 1640, 320)
  me(x, t, 540 + wob, 1420, 340, { mood: t < 8.6 ? 'happy' : t < BURST ? 'wide' : 'sparkle', look: [0, -0.8], tears: t < BURST ? (t > 9.6 ? 1 : 0) : 3, blink: t > 8.6 && t < BURST ? false : undefined, hops: [BURST, BURST + 0.6, BURST + 1.2, BURST + 1.8, BURST + 2.4, BURST + 3.0] })
  // napkins fly in from the table
  for (let i = 0; i < 6; i++) {
    const at = BURST + 0.8 + i * 0.35, p = ease.outCubic(prog(t, at, at + 0.5))
    if (p <= 0) continue
    const fromX = i % 2 ? 1200 : -120, nx = lerp(fromX, 420 + (i % 3) * 120, p), ny = lerp(1700, 1580 + (i % 2) * 60, p)
    x.save(); x.translate(nx, ny); x.rotate((1 - p) * 3 + i); box(x, -40, -30, 80, 60, '#ffffff', { b: 4 }); x.restore()
  }
}

const EP = makeSwap({
  duration: 17, ending: 'cut',
  hook: { text: 'Pisces woke up *not crying.*', out: [2.4, 2.6], top: 220 },
  caps: [
    { at: 2.7, out: [8.0, 8.2], text: 'Calm through *everything.*', top: 230 },
    { at: 8.3, out: [10.2, 10.4], text: 'Then: *the vows.*', top: 230 },
  ],
  shots: [
    { at: 0, room: 'wedding', cam: [1.0, 540, 960], push: 0.05, draw: opening },
    { at: 2.6, room: 'wedding', roomOpts: { warm: 0.4 }, cam: [1.1, 540, 1000], push: 0.04, draw: calmShot },
    { at: 8.2, room: 'wedding', roomOpts: { warm: 0.6 }, cam: [1.08, 540, 1000], push: 0.06, draw: vowShot },
  ],
  fx: [
    { kind: 'whip', at: -0.2, from: 1.45 },
    { kind: 'rec', at: 0.6, len: 1.2, caption: 'single at the wedding. *table 9.*', top: 1560 },
    { kind: 'shake', at: BURST, len: 0.6, amp: 26 },
  ],
  flash: [{ at: 1.95, col: B.color, a: 0.4 }, { at: BURST, col: '#8fe3ff', a: 0.5 }],
  overlay: counter,
  last: { at: 15.4, text: 'Balance lasted *four* minutes.', top: 300 },
  cues: [
    ['glitter', 0.0, 0.5], ['pop', 2.0, 1174.66, 0.05, 0],
    ...BEATS.map(([, a], i) => ['pop', r3(a), [783.99, 880, 987.77][i], 0.04, 0]),
    ['pop', 8.4, 659.25, 0.03, 0], ...[9.0, 9.3, 9.6, 9.9, 10.1].map(t => ['tick', t, 0.03]),
    ['glitter', BURST, BURST + 1.0], ['pluck', BURST + 0.05, 783.99, 0.04, 0.6, 0], ['pluck', BURST + 0.2, 659.25, 0.04, 0.6, 0], ['pluck', BURST + 0.35, 587.33, 0.035, 0.6, 0],
    ...[0, 1, 2, 3, 4, 5].map(i => ['whoosh', r3(BURST + 0.8 + i * 0.35), 0.2, 0.02]),
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
