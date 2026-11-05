// kswe04 · SIGN SWAP · "Cancer Woke Up Chill" (17 s vertical, Month 2 boost m11 #4, dreamy · Ab, hard cut)
//   0.0   frame 0: the bedroom, Cancer mid-sob over an old photo, a big tear frozen mid-air, the swap bolt mid-strike,
//         half Aquarius-blue. Hook "Cancer's ex texted. *Cancer's fine?*"  0.6 the text drops: "hey stranger :)"
//   2.6   Aquarius-Cancer reads it, calm: a loading bar "feeling things…" stalls at 2%: "no big feelings found."
//   5.8   the phone: a kind reply "glad you're well. take care ♡" is sent, then the chat slides into ARCHIVED.
//   9.6   a second bolt: the swap wears off. Cancer again, every feeling at once. ♓ Pisces runs in with tissues,
//         both crying, sharing the box.
//   15.6  last line "Missed my *feelings*, honestly." holds, hard cut at 17.0.
import { drawAquaHeadphones } from '../../st9aquahome.js'
import { makeSwap } from '../../kswe01/scenes/swapfilm.js'
import { star, swapper, swapBolt, swapTag, phone, bubble, sticker, shadow, hearts, sparkles, tissues, label, bed, R, box, INK, GOLD, PINK, RED, BONE, TEAR, SIGN, pop01, outK, prog, ease, clamp, lerp, r3 } from '../../kswe01/scenes/swapkit.js'

const FROM = 'cancer', TO = 'aquarius'
const A = SIGN(FROM), B = SIGN(TO)
// Cancer and Aquarius are both blue, so swapped Cancer wears Aquarius' pink headphones (st9aquahome.js, read-only)
function aq(x, t, px, py, size, k, o = {}) {
  const r = swapper(x, t, px, py, size, FROM, TO, k, o)
  if (k > 0.55 && (o.pop ?? 1) > 0.3) drawAquaHeadphones(x, r, size, { k: 0 })
  return r
}

function photo(x, cx, cy, s = 1, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -80, -100, 160, 200, '#c99a4a', { b: 6 }); R(x, '#3a4a7a', -64, -84, 128, 140)
  // two tiny stars in the photo
  for (const [dx, c] of [[-26, A.color], [26, '#e9b24a']]) { x.fillStyle = INK; x.beginPath(); x.arc(dx, -10, 24, 0, Math.PI * 2); x.fill(); x.fillStyle = c; x.beginPath(); x.arc(dx, -10, 19, 0, Math.PI * 2); x.fill() }
  R(x, '#f4ecdc', -64, 62, 128, 22)
  x.restore()
}
function bigTear(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.moveTo(0, -46); x.quadraticCurveTo(34, 0, 0, 34); x.quadraticCurveTo(-34, 0, 0, -46); x.fill()
  x.fillStyle = TEAR; x.beginPath(); x.moveTo(0, -36); x.quadraticCurveTo(26, 0, 0, 26); x.quadraticCurveTo(-26, 0, 0, -36); x.fill()
  R(x, '#ffffff', -10, -6, 8, 10); x.restore()
}
function opening(x, t) {
  bed(x, 540, 1180, { col: '#3f7cc8', k: 0 })
  swapBolt(x, t, -0.25, { x1: 520, y1: 160, x2: 500, y2: 900, colA: A.color, colB: B.color, dur: 1.1 })
  const k = clamp(0.45 + t / 0.6 * 0.55)
  const r = aq(x, t, 500, 930, 330, k, { mood: t < 0.7 ? 'wide' : 'neutral', look: [0.4, 0.5], tears: t < 0.6 ? 2 : 0, hops: [1.9] })
  photo(x, 720, 1040, 1, 0.2)
  // the frozen tear, then it falls
  const fall = ease.inQuad(prog(t, 0.8, 1.3))
  if (fall < 1) bigTear(x, 400, lerp(840, 1180, fall), 1.4 - fall * 0.4)
  swapTag(x, t, 540, 1340, FROM, TO, 1.9, { out: 2.6 })
  void r
}
function calmShot(x, t) {
  shadow(x, 540, 1195, 300)
  aq(x, t, 540, 960, 330, 1, { mood: t < 4.8 ? 'neutral' : 'happy', look: [0.6, 0.6], hops: [5.1] })
  phone(x, t, { cx: 820, cy: 1180, w: 260, h: 400, rot: -0.15, title: 'the ex', clock: '9:12 PM', lines: [{ from: 'them', text: 'hey stranger :)', at: -1 }], size: 22, accent: B.color })
  photo(x, 230, 1110, 0.9, -0.15)
}
const THREAD = [{ from: 'them', text: 'hey stranger :)', at: -1 }, { from: 'me', text: 'hey! glad you’re well. take care ♡', at: 6.9 }]
function phoneShot(x, t) {
  const arch = ease.inOutCubic(prog(t, 8.2, 8.8))
  phone(x, t, { cx: 540 + arch * 900, cy: 1040, w: 600, h: 760, rot: arch * 0.3, title: 'the ex', clock: '9:13 PM', lines: THREAD, size: 38, accent: B.color, typing: null })
  if (t > 8.5) {
    const k = pop01(t, 8.6, 0.3, 2.6)
    x.save(); x.translate(540, 1040); x.rotate(-0.12); x.scale(k, k)
    x.font = "800 96px Inter"; x.textAlign = 'center'; x.textBaseline = 'middle'
    const w = x.measureText('ARCHIVED').width + 60
    R(x, B.color, -w / 2 - 8, -70, w + 16, 140); R(x, INK, -w / 2, -62, w, 124); x.fillStyle = B.color; x.fillText('ARCHIVED', 0, 4)
    x.restore()
  }
  aq(x, t, 860, 1640, 230, 1, { mood: t < 6.9 ? 'squint' : 'happy', look: [-1, -1], hops: [6.95, 8.7] })
}
function feelShot(x, t) {
  bed(x, 540, 1180, { col: '#3f7cc8', k: 0 })
  swapBolt(x, t, 9.6, { x1: 400, y1: 180, x2: 380, y2: 900, colA: B.color, colB: A.color, dur: 0.8 })
  const k = 1 - clamp((t - 9.6) / 0.5)
  shadow(x, 380, 1195, 280)
  aq(x, t, 380, 950, 310, k, { soul: false, mood: t < 10.3 ? 'wide' : 'sparkle', look: [0, 0], tears: t < 10.1 ? 0 : 3, hops: [10.2, 10.8, 11.4, 12.0, 12.6] })
  // Pisces rushes in with tissues
  if (t > 11.3) {
    const pk = ease.outCubic(prog(t, 11.3, 11.9)), px = lerp(1250, 760, pk)
    star(x, t, px, 960, 280, 'pisces', { mood: 'sparkle', look: [-1, 0], tears: 3, hops: [11.95, 12.5, 13.1, 13.7, 14.3] })
    tissues(x, lerp(px, 570, ease.inOutCubic(prog(t, 12.4, 12.9))), 1230, 1.1)
  }
  if (t > 10.2) bubble(x, t, 500, 660, 10.3, 15.4, 'i feel EVERYTHING', { size: 46, tail: 0 })
  if (t > 12.6) bubble(x, t, 760, 1330, 12.7, 17.2, 'welcome back ♡', { size: 42, col: '#d9d4ff', tail: null })
}

const EP = makeSwap({
  duration: 17, ending: 'cut',
  hook: { text: 'Cancer’s ex texted. *Cancer’s fine?*', out: [2.4, 2.6], top: 220, size: 96 },
  caps: [
    { at: 5.9, out: [9.4, 9.6], text: 'Kind reply. *Archived.*', top: 230 },
    { at: 9.75, out: [15.3, 15.5], text: 'The swap *wore off.*', top: 230 },
  ],
  shots: [
    { at: 0, room: 'bed', cam: [1.0, 540, 960], push: 0.05, draw: opening },
    { at: 2.6, room: 'bed', roomOpts: { dark: 0.2 }, cam: [1.3, 540, 1000], push: 0.04, draw: calmShot },
    { at: 5.8, room: 'sofa', cam: [1.0, 540, 960], push: 0.03, draw: phoneShot },
    { at: 9.6, room: 'bed', cam: [1.22, 540, 1010], push: 0.05, draw: feelShot, noBlink: true },
  ],
  fx: [
    { kind: 'whip', at: -0.2, from: 1.45 },
    { kind: 'notify', at: 0.6, out: [2.3, 2.5], title: 'texts', body: 'the ex: hey *stranger* :)', glyph: '♡', color: '#8a8498', y: 1500 },
    { kind: 'shake', at: 0.62, len: 0.4, amp: 16 },
    { kind: 'load', at: 2.8, len: 2.8, label: 'feeling things…', stallAt: 2, error: 'no big feelings found.', y: 520 },
    { kind: 'shake', at: 9.6, len: 0.5, amp: 24 },
  ],
  flash: [{ at: 1.85, col: B.color, a: 0.4 }],
  punch: [{ at: 10.3, dur: 1.2, z: 0.14, x: 380, y: 880 }, { at: 12.5, dur: 1.4, z: 0.1, x: 570, y: 1050 }],
  last: { at: 15.6, text: 'Missed my *feelings*, honestly.', top: 290 },
  cues: [
    ['glitter', 0.0, 0.5], ['pop', 1.9, 1174.66, 0.05, 0], ['pluck', 1.25, 1567.98, 0.03, 0.4, 0],
    ['pop', 6.9, 1046.5, 0.04, 0.3], ['whoosh', 8.3, 0.4, 0.04], ['tom', 8.65, 80, { gain: 0.22, decay: 0.2 }],
    ['glitter', 9.6, 10.2], ['riser', 9.7, 10.25, 0.05],
    ['pluck', 10.4, 659.25, 0.035, 0.5, 0.3], ['pluck', 10.55, 587.33, 0.035, 0.5, 0.3], ['pluck', 12.0, 523.25, 0.03, 0.5, -0.3], ['pop', 12.7, 880, 0.03, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
