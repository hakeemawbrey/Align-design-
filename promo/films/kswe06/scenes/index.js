// kswe06 · SIGN SWAP · "Virgo Woke Up Feeling Everything" (16 s vertical, Month 2 boost m11 #6, cinematic · Eb, loop)
//   0.0   frame 0: the kitchen, Virgo mid-scrub of a mug (bubbles everywhere), the swap bolt mid-strike, half
//         Pisces-violet and already fountaining tears. Hook "Virgo woke up *a Pisces.*"  0.5 glitch: VIRGO.EXE.
//   2.6   the crying montage: "a dog." · "a sunset." · "'you look nice.'" (the date's text), tears every time.
//   7.6   Virgo's fix: three labelled jars, HAPPY · SAD · ???, filled tear by tear from a clipboard.
//   11.2  ♓ the real Pisces walks in, cries along: "welcome."  Both sobbing, the ??? jar overflowing.
//   13.4  last line "Labelled the tears. *Kept crying.*"  15.55–16.0 eases back into frame 0 (loop).
import { makeSwap } from '../../kswe01/scenes/swapfilm.js'
import { star, swapper, swapBolt, swapTag, phone, bubble, sticker, shadow, hearts, sparkles, mug, label, drawBits, R, box, INK, GOLD, PINK, RED, BONE, TEAR, SIGN, pop01, outK, prog, ease, clamp, lerp, r3 } from '../../kswe01/scenes/swapkit.js'

const FROM = 'virgo', TO = 'pisces'
const A = SIGN(FROM), B = SIGN(TO)

function sink(x, t, scrub) {
  box(x, 90, 1000, 900, 190, '#8a6a4a', { b: 6 })
  box(x, 360, 940, 360, 70, '#b8c0d0', { b: 6 }); R(x, '#7aa0c8', 372, 952, 336, 30)
  R(x, INK, 520, 820, 20, 130); R(x, '#c0c8d8', 524, 824, 12, 122); R(x, INK, 520, 820, 90, 20); R(x, '#c0c8d8', 524, 824, 82, 12)
  // bubbles
  for (let i = 0; i < 14; i++) {
    const p = ((t * 0.6 + i / 14) % 1), bx = 380 + (i * 61 % 320) + Math.sin(t * 3 + i) * 12, by = 950 - p * 300
    x.save(); x.globalAlpha = scrub * (1 - p); x.strokeStyle = '#ffffff'; x.lineWidth = 4; x.beginPath(); x.arc(bx, by, 10 + (i % 3) * 6, 0, Math.PI * 2); x.stroke(); x.restore()
  }
}
function pv(x, t, px, py, size, k, o = {}) { return swapper(x, t, px, py, size, FROM, TO, k, { tears: 3, ...o }) }
function opening(x, t) {
  sink(x, t, 1)
  swapBolt(x, t, -0.25, { x1: 560, y1: 160, x2: 540, y2: 820, colA: A.color, colB: B.color, dur: 1.1 })
  const k = clamp(0.5 + t / 0.6 * 0.5)
  pv(x, t, 540, 830, 360, k, { mood: t < 1.0 ? 'wide' : 'sparkle', look: [0, 0.6], hops: [2.0] })
  // the mug mid-scrub
  const sc = Math.sin(t * 22) * 14
  mug(x, 720 + sc, 1000, '#ffffff', 1.2)
  R(x, INK, 690 + sc * 1.6, 900, 70, 40); R(x, '#ffe14a', 694 + sc * 1.6, 904, 62, 32)
  swapTag(x, t, 540, 1380, FROM, TO, 2.0, { out: 2.6 })
}
const DOG = ['......BB.', '.....BBBB', 'B...BBBEB', 'BBBBBBBBB', 'BBBBBBBB.', 'BBBBBBB..', 'B.B..B.B.', 'B.B..B.B.']
function montage(x, t, S) {
  const u = t - 2.6, beat = u < 1.7 ? 0 : u < 3.4 ? 1 : 2
  // beat 1: a sunset tints the street
  if (beat === 1) { x.save(); x.globalCompositeOperation = 'source-over'; const g = x.createLinearGradient(0, 0, 0, 1200); g.addColorStop(0, 'rgba(255,140,90,0.55)'); g.addColorStop(1, 'rgba(255,90,140,0.25)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1200); x.fillStyle = '#ffd17a'; x.beginPath(); x.arc(540, 1150, 200, Math.PI, 0); x.fill(); x.restore() }
  shadow(x, 540, 1310, 280)
  pv(x, t, 540, 1110, 320, 1, { mood: 'sparkle', look: beat === 0 ? [1, 0.4] : beat === 1 ? [0, -0.8] : [0, 0.6], hops: [2.7, 4.4, 6.1] })
  if (beat === 0) { const dx = lerp(1200, 760, ease.outCubic(prog(t, 2.6, 3.4))); drawBits(x, DOG, { B: '#c98a4a', E: INK }, dx, 1270, 14, { rot: Math.sin(t * 14) * 0.04 }); if (t > 3.3) hearts(x, t, 3.3, dx, 1180, { n: 4 }) }
  if (beat === 2) phone(x, t, { cx: 800, cy: 1500, w: 300, h: 380, rot: -0.12, title: 'date ♡', clock: '6:58 PM', lines: [{ from: 'them', text: 'you look nice :)', at: 6.0 }], size: 26, accent: B.color })
  const caps = [['a dog.', 2.7, 4.3], ['a sunset.', 4.4, 6.0], ['“you look nice.”', 6.1, 7.5]]
  for (const [c, a, b] of caps) sticker(x, t, c, 540, 520, a, b, { size: 54, col: [GOLD, '#ffb38a', PINK][caps.findIndex(z => z[0] === c)], rot: -0.05 })
  void S
}
const JARS = [['HAPPY', '#ffe7a8'], ['SAD', '#a8c8ff'], ['???', '#e7c8ff']]
function jar(x, t, cx, cy, name, col, fill) {
  box(x, cx - 90, cy - 220, 180, 220, 'rgba(220,240,255,0.25)', { b: 6 })
  R(x, '#8fe3ff', cx - 84, cy - 6 - 208 * clamp(fill), 168, 208 * clamp(fill))
  if (fill > 1) for (let i = 0; i < 6; i++) { const p = (t * 1.4 + i / 6) % 1; R(x, '#8fe3ff', cx - 80 + i * 30, cy - 220 + p * 240, 10, 14) }
  box(x, cx - 100, cy - 250, 200, 30, '#c99a4a', { b: 5 })
  box(x, cx - 70, cy - 150, 140, 54, col, { b: 4 }); label(x, name, cx, cy - 122, { size: 30, col: INK, font: 'Inter', weight: 800 })
}
function jarShot(x, t) {
  box(x, 40, 1100, 1000, 40, '#8a6a4a', { b: 6 })
  const f = [clamp((t - 8.0) / 3), clamp((t - 8.6) / 3.4), t < 11.2 ? clamp((t - 9.2) / 2) : 1.3]
  JARS.forEach(([n, c], i) => jar(x, t, 220 + i * 320, 1100, n, c, f[i]))
  shadow(x, 330, 1560, 260)
  pv(x, t, 330, 1360, 290, 1, { mood: t < 11.2 ? 'squint' : 'sparkle', look: [1, -0.6], hops: [8.0, 8.6, 9.2, 11.4, 12.0] })
  { box(x, 470, 1300, 120, 160, '#fffbea', { b: 6 }); for (let i = 0; i < 3; i++) R(x, A.color, 490, 1330 + i * 40, 80, 10) }
  if (t > 11.2) {
    const k = ease.outCubic(prog(t, 11.2, 11.8))
    star(x, t, lerp(1250, 760, k), 1360, 300, 'pisces', { mood: 'sparkle', look: [-1, 0], tears: 3, hops: [11.9, 12.5, 13.1, 13.7, 14.3, 14.9], seed: 6 })
    bubble(x, t, 760, 1700, 11.9, 15.5, 'welcome.', { size: 50, col: '#d9d4ff', tail: null })
  }
}

const EP = makeSwap({
  duration: 16, ending: 'loop',
  hook: { text: 'Virgo woke up *a Pisces.*', out: [2.4, 2.6], top: 220 },
  caps: [{ at: 7.7, out: [11.0, 11.2], text: 'The fix: *label the tears.*', top: 230, size: 88 }],
  shots: [
    { at: 0, room: 'kitchen', cam: [1.32, 540, 900], push: 0.05, draw: opening },
    { at: 2.6, room: 'street', cam: [1.1, 540, 1080], push: 0.05, draw: montage },
    { at: 7.6, room: 'kitchen', cam: [1.12, 540, 1060], push: 0.02, draw: jarShot },
  ],
  fx: [
    { kind: 'whip', at: -0.2, from: 1.45 },
    { kind: 'glitch', at: 0.5, len: 0.9, text: 'VIRGO.EXE: feelings *overflowing*', buttons: ['CRY', 'CRY MORE'] },
    { kind: 'shake', at: 11.25, len: 0.4, amp: 14 },
  ],
  flash: [{ at: 1.95, col: B.color, a: 0.4 }, { at: 4.4, col: '#ffb38a', a: 0.35 }, { at: 6.1, col: PINK, a: 0.3 }],
  punch: [{ at: 3.3, dur: 1.0, z: 0.1, x: 600, y: 1150 }],
  last: { at: 13.4, text: 'Labelled the tears. *Kept crying.*', top: 290, size: 92 },
  cues: [
    ['glitter', 0.0, 0.5], ['pop', 2.0, 1174.66, 0.05, 0],
    ['pluck', 2.75, 659.25, 0.035, 0.5, 0.3], ['pluck', 2.9, 587.33, 0.035, 0.5, 0.3], ['pop', 3.3, 1318.51, 0.03, 0],
    ['pluck', 4.45, 659.25, 0.035, 0.5, -0.3], ['pluck', 4.6, 523.25, 0.035, 0.5, -0.3], ['pop', 6.0, 1046.5, 0.04, 0.3],
    ['pluck', 6.15, 783.99, 0.035, 0.5, 0], ['pluck', 6.3, 659.25, 0.035, 0.5, 0],
    ...[8.0, 8.6, 9.2, 9.8, 10.4].map((t, i) => ['pop', t, [523.25, 659.25, 783.99, 880, 1046.5][i], 0.03, (i % 2 ? 0.3 : -0.3)]),
    ['tick', 11.25, 0.06], ['pluck', 11.95, 659.25, 0.035, 0.5, 0.3], ['pluck', 12.1, 587.33, 0.035, 0.5, 0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
