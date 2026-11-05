// kswe09 · SIGN SWAP · "Sagittarius Woke Up Sentimental" (17 s vertical, Month 2 boost m11 #9, lofi · F, hard cut)
//   0.0   frame 0: the hallway, Sag mid-sprint with a huge backpack, skidding into a hug with a houseplant, the swap
//         bolt mid-strike, half Cancer-blue. Hook "Sag woke up *attached.*"  0.6 freeze: "trip day. *leaving at 9.*"
//   2.6   can't leave: "the plant." · "the mug." · "the friend." (♓ Pisces at the door, crying already).
//   7.6   the phone: "i'll miss you this week" to the crush… typing, deleting… sent. "Then said *the thing.*"
//   10.2  "me too. text me when you land?" drops in. Hearts.
//   13.4  Sag-Cancer walks out with the backpack AND the plant; Pisces waves, sobbing.
//   15.8  last line "Packed the plant. *Said the thing.*" holds, hard cut at 17.0.
import { makeSwap } from '../../kswe01/scenes/swapfilm.js'
import { star, swapper, swapBolt, swapTag, phone, bubble, sticker, shadow, hearts, sparkles, plant, mug, label, R, box, INK, GOLD, PINK, RED, BONE, SIGN, pop01, outK, prog, ease, clamp, lerp, r3 } from '../../kswe01/scenes/swapkit.js'

const FROM = 'sagittarius', TO = 'cancer'
const A = SIGN(FROM), B = SIGN(TO)

function backpack(x, cx, cy, s = 1) {
  box(x, cx - 80 * s, cy - 120 * s, 160 * s, 230 * s, '#d8743a', { b: 6, hi: 'rgba(255,255,255,0.2)' })
  box(x, cx - 60 * s, cy + 10 * s, 120 * s, 70 * s, '#b85a2a', { b: 5 })
  R(x, INK, cx - 20 * s, cy - 150 * s, 40 * s, 34 * s); R(x, '#5a3a2a', cx - 14 * s, cy - 144 * s, 28 * s, 24 * s)
}
function sag(x, t, px, py, size, k, o = {}) {
  backpack(x, px - size * 0.42, py + size * 0.02, size / 300)
  return swapper(x, t, px, py, size, FROM, TO, k, o)
}
function opening(x, t) {
  swapBolt(x, t, -0.25, { x1: 460, y1: 160, x2: 440, y2: 900, colA: A.color, colB: B.color, dur: 1.1 })
  const k = clamp(0.45 + t / 0.6 * 0.55)
  const skid = ease.outCubic(clamp(0.4 + t / 1.0))
  const px = lerp(260, 460, skid)
  shadow(x, px, 1195, 280)
  sag(x, t, px, 960, 310, k, { mood: t < 0.6 ? 'squint' : 'sparkle', look: [1, 0.3], squash: 0.08 * (1 - skid), hops: [2.0] })
  plant(x, 700, 1190, 1.7, t)
  if (t > 1.6) hearts(x, t, 1.6, 640, 860, { n: 5 })
  swapTag(x, t, 540, 1360, FROM, TO, 2.0, { out: 2.6 })
}
const ITEMS = [['the plant.', 2.7, 4.3], ['the mug.', 4.3, 5.9], ['the friend.', 5.9, 7.5]]
function leaving(x, t) {
  const i = t < 4.3 ? 0 : t < 5.9 ? 1 : 2
  shadow(x, 380, 1195, 280)
  sag(x, t, 380, 960, 300, 1, { mood: 'sparkle', look: [1, 0.2], tears: 1, hops: [2.8, 4.4, 6.0] })
  if (i === 0) plant(x, 680, 1190, 1.6, t)
  if (i === 1) mug(x, 640, 1080, '#3fb6f0', 2.2, 1, t)
  if (i === 2) star(x, t, 760, 960, 290, 'pisces', { mood: 'sparkle', look: [-1, 0], tears: 3, hops: [6.1, 6.7, 7.2] })
  for (const [c, a, b] of ITEMS) sticker(x, t, c, 540, 560, a, b, { size: 56, col: [GOLD, '#9fe8ff', '#d9d4ff'][ITEMS.findIndex(z => z[0] === c)], rot: -0.05 })
  if (i < 2) hearts(x, t, [2.9, 4.5][i], 600, 860, { n: 5 })
}
const MSG = [{ from: 'me', text: 'i’ll miss you this week', at: 9.2 }]
function phoneShot(x, t) {
  phone(x, t, { cx: 540, cy: 900, w: 600, h: 560, title: 'them ♡', clock: '8:41 AM', lines: MSG, size: 38, accent: B.color, typing: null })
  // the draft line typing… deleting… typing
  if (t < 9.2) {
    const draft = 'i’ll miss you this week'
    const u = t - 7.8, n = u < 0.6 ? Math.floor(u / 0.6 * 9) : u < 1.0 ? Math.max(0, 9 - Math.floor((u - 0.6) / 0.4 * 9)) : Math.min(draft.length, Math.floor((u - 1.0) / 0.4 * draft.length))
    box(x, 140, 1240, 800, 110, '#ffffff', { b: 6 })
    x.font = "700 50px Inter"; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(draft.slice(0, Math.max(0, n)) + (Math.floor(t * 3) % 2 ? '|' : ''), 170, 1296)
  }
  sag(x, t, 860, 1660, 230, 1, { mood: t < 9.2 ? 'squint' : 'wide', look: [-1, -1], hops: [9.25] })
}
function exitShot(x, t) {
  // the front door at the end of the hall, open
  const go = ease.inOutCubic(prog(t, 13.4, 15.0))
  const px = lerp(400, 560, go), sz = lerp(300, 200, go)
  shadow(x, px, 1195, sz)
  sag(x, t, px, lerp(960, 900, go), sz, 1, { mood: 'happy', look: [1, -0.2], hops: [10.3, 10.7, 13.6, 14.1, 14.6] })
  plant(x, px + sz * 0.55, lerp(1190, 1100, go), sz / 190, t)
  star(x, t, 860, 1500, 280, 'pisces', { mood: 'sparkle', look: [-1, -1], tears: 3, hops: [10.4, 11.0, 11.6, 12.2, 12.8, 13.4, 14.0, 14.6, 15.2] })
  if (t > 13.4) bubble(x, t, 860, 1780, 13.5, 17.2, 'TEXT US', { size: 44, col: '#d9d4ff', tail: null })
  hearts(x, t, 10.3, px, 760, { n: 7 })
}

const EP = makeSwap({
  duration: 17, ending: 'cut',
  hook: { text: 'Sag woke up *attached.*', out: [2.4, 2.6], top: 220 },
  caps: [
    { at: 2.7, out: [7.4, 7.6], text: 'Can’t leave: *anything.*', top: 230 },
    { at: 7.7, out: [10.0, 10.2], text: 'Then said *the thing.*', top: 230 },
  ],
  shots: [
    { at: 0, room: 'hall', cam: [1.3, 540, 960], push: 0.05, draw: opening },
    { at: 2.6, room: 'hall', cam: [1.3, 540, 960], push: 0.04, draw: leaving },
    { at: 7.6, room: 'hall', roomOpts: { dark: 0.3 }, cam: [1.0, 540, 960], push: 0.03, draw: phoneShot },
    { at: 10.2, room: 'hall', cam: [1.08, 540, 1060], push: 0.04, draw: exitShot },
  ],
  fx: [
    { kind: 'whip', at: -0.2, from: 1.45 },
    { kind: 'shake', at: 0.0, len: 0.45, amp: 20 },
    { kind: 'rec', at: 0.6, len: 1.2, caption: 'trip day. *leaving at 9.*', top: 1540 },
    { kind: 'notify', at: 10.2, out: [13.2, 13.4], title: 'texts', body: 'them: me too. *text me when you land?*', glyph: '♡', color: B.color, y: 140 },
    { kind: 'shake', at: 9.25, len: 0.3, amp: 12 },
  ],
  flash: [{ at: 1.95, col: B.color, a: 0.4 }],
  punch: [{ at: 6.0, dur: 1.4, z: 0.06, x: 580, y: 960 }],
  last: { at: 15.8, text: 'Packed the plant. *Said the thing.*', top: 300, size: 92 },
  cues: [
    ['glitter', 0.0, 0.5], ['pop', 2.0, 1174.66, 0.05, 0],
    ...ITEMS.map(([, a], i) => ['pop', r3(a), [783.99, 880, 987.77][i], 0.04, 0]),
    ['pluck', 6.1, 659.25, 0.035, 0.5, 0.3], ['pluck', 6.25, 587.33, 0.035, 0.5, 0.3],
    ...[7.9, 8.0, 8.1, 8.2, 8.5, 8.6, 8.9, 9.0].map(t => ['tick', t, 0.025]), ['pop', 9.2, 1046.5, 0.045, 0.3],
    ['glitter', 10.3, 11.0], ['pluck', 13.5, 659.25, 0.035, 0.5, 0.3], ['pluck', 13.65, 587.33, 0.035, 0.5, 0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
