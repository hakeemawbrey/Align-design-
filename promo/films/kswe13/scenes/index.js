// kswe13 · SIGN SWAP · "The Roommate Swap" (20 s vertical, Month 2 boost m11 #13, chiptune · G, hard cut)
//   0.0   frame 0: the flat's hallway, ♈ Aries and ♋ Cancer mid-collision, the swap bolt cracking between them, their
//         glyph badges flying. Hook "Roommates swapped. *Date night.*"  0.6 freeze: "two dates. *one flat.*"
//   2.8   Cancer (in Aries' body) sprints to the café: "40 MINUTES EARLY".
//   6.8   Aries (in Cancer's body) cries at a leftover lasagne in the kitchen.
//   10.6  two phones, the same text both ways: "how do you LIVE like this"
//   13.8  back home, both dates went great; group hug; ♓ Pisces (the third roommate) sobbing in the middle.
//   18.2  last line "Same flat. *New* chaos." holds, hard cut at 20.0.
import { makeSwap } from '../../kswe01/scenes/swapfilm.js'
import { star, swapper, swapBolt, swapTag, phone, bubble, sticker, shadow, hearts, sparkles, table, mug, clockFace, label, R, box, INK, GOLD, PINK, RED, BONE, SIGN, pop01, outK, prog, ease, clamp, lerp, r3 } from '../../kswe01/scenes/swapkit.js'

const AR = SIGN('aries'), CA = SIGN('cancer')
// "aries in cancer's body" = swapper(aries → cancer, k = 1): the Cancer-blue body with Aries' soul badge orbiting
const ariesIn = (x, t, px, py, s, k, o) => swapper(x, t, px, py, s, 'aries', 'cancer', k, o)
const cancerIn = (x, t, px, py, s, k, o) => swapper(x, t, px, py, s, 'cancer', 'aries', k, o)

function opening(x, t) {
  swapBolt(x, t, -0.25, { x1: 540, y1: 380, x2: 540, y2: 1150, colA: AR.color, colB: CA.color, dur: 1.1 })
  const k = clamp(0.45 + t / 0.6 * 0.55), bump = 1 - ease.outCubic(clamp(t / 0.8))
  shadow(x, 330, 1195, 260); shadow(x, 750, 1195, 260)
  ariesIn(x, t, 330 + bump * 60, 960, 290, k, { mood: 'wide', look: [1, 0], squash: 0.1 * bump, hops: [2.2] })
  cancerIn(x, t, 750 - bump * 60, 960, 290, k, { mood: 'wide', look: [-1, 0], squash: 0.1 * bump, hops: [2.3] })
  // glyph badges flying
  for (const [g, c, d] of [[AR.glyph, AR.color, -1], [CA.glyph, CA.color, 1]]) {
    const p = clamp(0.3 + t / 1.2)
    if (p >= 1) continue
    const gx = 540 + d * 260 * p, gy = 760 - Math.sin(Math.PI * p) * 260
    x.save(); x.globalAlpha = 1 - p; x.fillStyle = INK; x.beginPath(); x.arc(gx, gy, 44, 0, Math.PI * 2); x.fill(); x.fillStyle = c; x.beginPath(); x.arc(gx, gy, 36, 0, Math.PI * 2); x.fill()
    x.font = "700 44px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols 2'"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(g + '︎', gx, gy + 3); x.restore()
  }
  swapTag(x, t, 540, 1380, 'aries', 'cancer', 2.1, { out: 2.8, both: true })
}
function earlyShot(x, t) {
  table(x, 600, 1130, 540)
  mug(x, 720, 1130, '#e9b24a', 1, 1, t)
  const run = ease.outCubic(prog(t, 2.8, 3.6))
  shadow(x, lerp(-150, 380, run), 1195, 260)
  cancerIn(x, t, lerp(-150, 380, run), 960, 290, 1, { mood: t < 3.6 ? 'squint' : 'sparkle', look: [1, -0.4], hops: t < 3.6 ? [2.9, 3.15, 3.4] : [4.4, 5.5] })
  clockFace(x, 820, 600, t < 4.2 ? '6:20' : '6:21', { size: 70 })
  sticker(x, t, '40 MINUTES EARLY', 540, 1420, 3.9, 6.7, { col: AR.color, ink: '#fff', size: 48, rot: -0.05 })
  bubble(x, t, 400, 690, 4.6, 6.7, 'is this… calm??', { size: 42, tail: -0.2 })
}
function lasagne(x, cx, cy) {
  box(x, cx - 120, cy - 70, 240, 70, '#c96a3a', { b: 6 }); R(x, '#e8344e', cx - 108, cy - 64, 216, 20); R(x, '#ffe7a8', cx - 108, cy - 44, 216, 12); R(x, '#e8344e', cx - 108, cy - 32, 216, 14)
  box(x, cx - 70, cy - 120, 140, 34, '#fff3c8', { b: 4 }); label(x, 'from mum ♡', cx, cy - 103, { size: 20, col: INK, font: 'Inter', weight: 800 })
}
function lasagneShot(x, t) {
  box(x, 120, 1040, 840, 150, '#8a6a4a', { b: 6 })
  lasagne(x, 720, 1040)
  shadow(x, 380, 1195, 270)
  ariesIn(x, t, 380, 950, 300, 1, { mood: t < 7.6 ? 'neutral' : 'sparkle', look: [1, 0.5], tears: t < 7.6 ? 0 : 3, hops: [7.7, 8.3, 8.9, 9.5] })
  bubble(x, t, 420, 640, 7.8, 10.5, 'it’s just SO\nthoughtful', { size: 44, tail: -0.2 })
}
function textShot(x, t) {
  phone(x, t, { cx: 290, cy: 1000, w: 440, h: 640, rot: -0.05, title: 'roomie ♈', clock: '7:02 PM', lines: [{ from: 'me', text: 'how do you LIVE like this', at: 10.9 }], size: 34, accent: CA.color })
  phone(x, t, { cx: 790, cy: 1000, w: 440, h: 640, rot: 0.05, title: 'roomie ♋', clock: '7:02 PM', lines: [{ from: 'me', text: 'how do you LIVE like this', at: 11.3 }], size: 34, accent: AR.color })
  label(x, 'AS ARIES', 290, 1380, { size: 34, col: AR.color, font: 'Inter', weight: 800 }); label(x, 'AS CANCER', 790, 1380, { size: 34, col: CA.color, font: 'Inter', weight: 800 })
  cancerIn(x, t, 290, 1620, 200, 1, { mood: 'wide', look: [0, -1], hops: [10.95] }); ariesIn(x, t, 790, 1620, 200, 1, { mood: 'wide', look: [0, -1], tears: 2, hops: [11.35] })
}
function homeShot(x, t) {
  // swapped back (a soft bolt), both glowing, the group hug
  swapBolt(x, t, 13.8, { x1: 540, y1: 500, x2: 540, y2: 1150, colA: AR.color, colB: CA.color, dur: 0.6, flash: 0.5, rays: false })
  const hug = ease.inOutCubic(prog(t, 15.0, 15.8))
  shadow(x, 540, 1195, 520)
  star(x, t, lerp(260, 360, hug), 960, 280, 'aries', { mood: 'happy', look: [1, 0], hops: [14.0, 15.9, 16.5] })
  star(x, t, lerp(820, 720, hug), 960, 280, 'cancer', { mood: 'heart', look: [-1, 0], hops: [14.1, 16.0, 16.6] })
  hearts(x, t, 14.2, 260, 800, { n: 4 }); hearts(x, t, 14.3, 820, 800, { n: 4 })
  bubble(x, t, 340, 660, 14.2, 15.6, 'date went GREAT', { size: 38, tail: 0 }); bubble(x, t, 760, 560, 14.4, 15.6, 'mine too!!', { size: 38, tail: 0 })
  if (t > 15.0) {
    const pk = ease.outCubic(prog(t, 15.0, 15.6))
    star(x, t, 540, lerp(1900, 1060, pk), 260, 'pisces', { mood: 'sparkle', look: [0, -0.5], tears: 3, hops: [15.7, 16.3, 16.9, 17.5, 18.1] })
    bubble(x, t, 540, 1420, 15.9, 20.2, 'GROUP HUG', { size: 46, col: '#d9d4ff', tail: null })
  }
}

const EP = makeSwap({
  duration: 20, ending: 'cut',
  hook: { text: 'Roommates swapped. *Date night.*', out: [2.6, 2.8], top: 220 },
  caps: [
    { at: 2.9, out: [6.6, 6.8], text: 'Cancer, as Aries: *early.*', top: 230, size: 86 },
    { at: 6.9, out: [10.4, 10.6], text: 'Aries, as Cancer: *crying.*', top: 230, size: 86 },
    { at: 10.7, out: [13.6, 13.8], text: 'Both, at 7:02 PM:', top: 230, size: 86 },
  ],
  shots: [
    { at: 0, room: 'hall', cam: [1.15, 540, 980], push: 0.05, draw: opening },
    { at: 2.8, room: 'cafe', cam: [1.15, 540, 1000], push: 0.04, draw: earlyShot },
    { at: 6.8, room: 'kitchen', cam: [1.15, 540, 980], push: 0.05, draw: lasagneShot },
    { at: 10.6, room: 'hall', roomOpts: { dark: 0.5 }, cam: [1.0, 540, 960], push: 0.02, draw: textShot },
    { at: 13.8, room: 'hall', roomOpts: { warm: 0.4 }, cam: [1.12, 540, 1000], push: 0.05, draw: homeShot },
  ],
  fx: [
    { kind: 'whip', at: -0.2, from: 1.45 },
    { kind: 'shake', at: 0.0, len: 0.5, amp: 26 },
    { kind: 'rec', at: 0.6, len: 1.3, caption: 'two dates. *one flat.*', top: 1560 },
    { kind: 'shake', at: 11.3, len: 0.3, amp: 12 },
  ],
  flash: [{ at: 2.05, col: GOLD, a: 0.35 }],
  punch: [{ at: 7.7, dur: 1.4, z: 0.08, x: 420, y: 900 }, { at: 15.7, dur: 1.4, z: 0.06, x: 540, y: 980 }],
  last: { at: 18.2, text: 'Same flat. *New* chaos.', top: 300 },
  cues: [
    ['glitter', 0.0, 0.5], ['tom', 0.05, 90, { gain: 0.25, decay: 0.2 }], ['pop', 2.1, 1174.66, 0.05, 0],
    ...[2.9, 3.15, 3.4].map(t => ['tick', t, 0.04]), ['tick', 4.2, 0.05], ['pop', 3.9, 987.77, 0.04, 0], ['pop', 4.6, 783.99, 0.03, 0],
    ['pluck', 7.7, 659.25, 0.035, 0.5, 0.3], ['pluck', 7.85, 587.33, 0.035, 0.5, 0.3],
    ['pop', 10.9, 1046.5, 0.045, -0.4], ['pop', 11.3, 1046.5, 0.045, 0.4],
    ['glitter', 13.8, 14.4], ['pop', 14.2, 880, 0.03, -0.3], ['pop', 14.4, 987.77, 0.03, 0.3],
    ['pluck', 15.7, 659.25, 0.035, 0.5, 0], ['pluck', 15.85, 587.33, 0.035, 0.5, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
