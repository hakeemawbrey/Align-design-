// kswe02 · SIGN SWAP · "Taurus Woke Up Spontaneous" (15 s vertical, Month 2 boost m11 #2, funk · F, loop)
//   0.0   frame 0: the sofa room, Taurus mid-leap in a nightcap, the blanket flying, the swap bolt mid-strike, half
//         Sagittarius-purple. Hook "Taurus said yes. *Immediately.*"  0.7 a text drops: "wanna go out right now?"
//   2.6   the phone: the old-Taurus draft "i'm in pajamas" gets an X; "on my way." is sent.
//   6.2   the snowy street at night: Sag-Taurus sprints in fluffy slippers; the date (♋ Cancer) is ALSO in pajamas.
//         "Plot twist: *same outfit.*"  hearts.
//   10.2  ♓ Pisces walks by with cocoa and bursts into happy tears: "you MATCH"
//   12.4  last line "Said yes. *Kept the slippers.*"  14.55–15.0 eases back into frame 0 (loop).
import { makeSwap } from '../../kswe01/scenes/swapfilm.js'
import { star, swapper, swapBolt, swapTag, phone, bubble, sticker, shadow, hearts, sparkles, mug, R, box, INK, GOLD, PINK, RED, BONE, SIGN, pop01, outK, prog, ease, clamp, lerp, r3 } from '../../kswe01/scenes/swapkit.js'

const FROM = 'taurus', TO = 'sagittarius'
const A = SIGN(FROM), B = SIGN(TO)

// a pixel nightcap on a star (top = the star's upper tip) and fluffy slippers at its feet
function nightcap(x, cx, top, size, col = '#6a8cff', t = 0) {
  const s = size / 300
  x.save(); x.translate(cx, top + 30 * s); x.rotate(0.25 + Math.sin(t * 5) * 0.05)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-70 * s, 10 * s); x.lineTo(70 * s, 10 * s); x.lineTo(60 * s, -120 * s); x.closePath(); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(-60 * s, 4 * s); x.lineTo(60 * s, 4 * s); x.lineTo(56 * s, -108 * s); x.closePath(); x.fill()
  R(x, '#ffffff', -40 * s, -40 * s, 18 * s, 10 * s); R(x, '#ffffff', 20 * s, -80 * s, 14 * s, 10 * s)
  box(x, -76 * s, 0, 152 * s, 26 * s, '#f4ecdc', { b: 5 })
  x.fillStyle = INK; x.beginPath(); x.arc(60 * s, -118 * s, 24 * s, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.arc(60 * s, -118 * s, 18 * s, 0, Math.PI * 2); x.fill()
  x.restore()
}
function slippers(x, cx, foot, size, run = 0, t = 0) {
  const s = size / 300
  for (const d of [-1, 1]) {
    const lift = run ? Math.max(0, Math.sin(t * 18 + (d > 0 ? Math.PI : 0))) * 30 * s : 0
    const sx = cx + d * 70 * s, sy = foot - lift
    box(x, sx - 52 * s, sy - 26 * s, 104 * s, 40 * s, '#ffc6dc', { b: 5 })
    R(x, '#ffffff', sx - 46 * s, sy - 30 * s, 92 * s, 10 * s)
    R(x, INK, sx + 20 * s, sy - 18 * s, 8 * s, 8 * s); R(x, INK, sx + 34 * s, sy - 18 * s, 8 * s, 8 * s)
  }
}
function sofa(x, cx, cy) {
  box(x, cx - 330, cy - 200, 660, 120, '#a04a6a', { b: 6 }); box(x, cx - 360, cy - 90, 720, 110, '#b85a7a', { b: 6, hi: 'rgba(255,255,255,0.18)' })
  box(x, cx - 380, cy - 160, 60, 180, '#a04a6a', { b: 6 }); box(x, cx + 320, cy - 160, 60, 180, '#a04a6a', { b: 6 })
}

function sofaShot(x, t) {
  sofa(x, 540, 1160)
  // the blanket flying off
  const bk = clamp(0.5 + t * 0.6)
  x.save(); x.translate(lerp(560, 880, bk), lerp(1000, 640, bk)); x.rotate(bk * 1.4); box(x, -170, -40, 340, 80, '#5a8cd8', { b: 6, hi: 'rgba(255,255,255,0.2)' }); x.restore()
  swapBolt(x, t, -0.25, { x1: 440, y1: 160, x2: 420, y2: 900, colA: A.color, colB: B.color, dur: 1.1 })
  const k = clamp(0.5 + t / 0.6 * 0.5), lift = 1 - ease.outCubic(clamp(t / 1.2))
  const y = 860 - lift * 120
  shadow(x, 430, 1180, 280)
  const r = swapper(x, t, 430, y, 320, FROM, TO, k, { mood: t < 1.2 ? 'wide' : 'sparkle', look: [1, -0.4], squash: -0.14 * lift, hops: [1.5, 2.0] })
  nightcap(x, 430, r.top, 320, '#6a8cff', t)
  swapTag(x, t, 540, 1340, FROM, TO, 1.1, { out: 2.6 })
}
const THREAD = [{ from: 'them', text: 'wanna go out right now? it’s snowing!', at: -1 }, { from: 'me', text: 'on my way.', at: 5.0 }]
function phoneShot(x, t, S) {
  sofa(x, 540, 1500)
  phone(x, t, { cx: 540, cy: 960, w: 540, h: 660, title: 'the cute one ✦', clock: '10:47 PM', lines: THREAD, accent: B.color, size: 36, rot: 0.02 })
  const at = 3.3, k = pop01(t, at, 0.22, 2.6)
  if (k > 0.01 && t < 5.0) {
    bubble(x, t, 540, 1420, at, 5.0, 'i’m in pajamas', { col: '#ffe3a8', size: 46, k })
    const xk = ease.outCubic(prog(t, 4.1, 4.3))
    if (xk > 0) { x.save(); x.translate(540, 1420); for (const [w, c] of [[22, INK], [12, RED]]) { x.strokeStyle = c; x.lineWidth = w; x.beginPath(); x.moveTo(-200 * xk, -40 * xk); x.lineTo(200 * xk, 40 * xk); x.moveTo(200 * xk, -40 * xk); x.lineTo(-200 * xk, 40 * xk); x.stroke() } x.restore() }
  }
  if (t > 5.0) sparkles(x, t, 760, 1140, 5.0, 10, 120, 1)
  const r = swapper(x, t, 860, 1660, 230, FROM, TO, 1, { pop: pop01(t, S.shot.at + 0.2), mood: t < 4.1 ? 'squint' : 'sparkle', look: [-1, -1], hops: [5.05, 5.4] })
  nightcap(x, 860, r.top, 230, '#6a8cff', t)
}
function street(x, t, S) {
  const u = S.u
  // Sag-Taurus sprints in from the left
  const run = ease.outCubic(prog(t, 6.2, 7.4)), tx = lerp(-200, 380, run), runK = t < 7.4 ? 1 : 0
  shadow(x, tx, 1310, 240)
  const r = swapper(x, t, tx, 1180, 280, FROM, TO, 1, { mood: t < 7.4 ? 'squint' : t < 8.0 ? 'wide' : 'happy', look: [1, 0], squash: runK ? -0.06 : 0, hops: t < 7.4 ? [6.3, 6.55, 6.8, 7.05, 7.3] : [8.4, 9.0] })
  nightcap(x, tx, r.top, 280, '#6a8cff', t)
  slippers(x, tx, 1310, 280, runK, t)
  // the date: Cancer, also in pajamas (a striped cap) and slippers
  shadow(x, 760, 1310, 240)
  const d = star(x, t, 760, 1180, 270, 'cancer', { mood: t < 7.6 ? 'neutral' : 'happy', look: [-1, 0], hops: [7.6, 8.4], seed: 4 })
  nightcap(x, 760, d.top, 270, '#ff8fb1', t)
  slippers(x, 760, 1310, 270, 0, t)
  if (t > 7.7) bubble(x, t, 760, 880, 7.7, 10.1, 'you TOO?', { size: 44, tail: 0.1 })
  hearts(x, t, 8.4, 570, 950, { n: 7 })
  // Pisces walks by with cocoa and cries
  if (t > 10.0) {
    const pw = ease.outCubic(prog(t, 10.0, 10.7)), px = lerp(1250, 560, pw)
    star(x, t, px, 1470, 290, 'pisces', { mood: t < 10.7 ? 'neutral' : 'sparkle', look: [0, -0.6], tears: t < 10.8 ? 0 : 3, hops: [10.75, 11.3, 11.9], seed: 6 })
    mug(x, px + 150, 1560, '#c96a3a', 1, 1, t)
    bubble(x, t, 560, 1700, 10.9, 15.0, 'you MATCH', { size: 44, col: '#d9d4ff', tail: null })
  }
  void u
}

const EP = makeSwap({
  duration: 15, ending: 'loop',
  hook: { text: 'Taurus said yes. *Immediately.*', out: [2.4, 2.6], top: 230 },
  caps: [
    { at: 2.7, out: [6.0, 6.2], text: 'Old Taurus: *“no.”*', top: 230 },
    { at: 7.6, out: [12.1, 12.3], text: 'Plot twist: *same outfit.*', top: 230 },
  ],
  shots: [
    { at: 0, room: 'sofa', cam: [1.0, 540, 960], push: 0.05, draw: sofaShot },
    { at: 2.6, room: 'sofa', cam: [1.0, 540, 960], push: 0.03, draw: phoneShot },
    { at: 6.2, room: 'street', roomOpts: { snow: 1 }, cam: [1.22, 540, 1130], push: 0.05, draw: street },
  ],
  fx: [
    { kind: 'whip', at: -0.2, from: 1.45 },
    { kind: 'shake', at: 0.0, len: 0.5, amp: 24 },
    { kind: 'notify', at: 0.7, out: [2.3, 2.5], title: 'texts', body: 'the cute one: wanna go out *right now?*', glyph: '✦', color: B.color, y: 1500 },
    { kind: 'shake', at: 5.0, len: 0.35, amp: 12 },
  ],
  flash: [{ at: 5.0, col: B.color, a: 0.35 }, { at: 10.8, col: '#8fe3ff', a: 0.3 }],
  punch: [{ at: 8.4, dur: 1.4, z: 0.12, x: 570, y: 1050 }, { at: 10.85, dur: 1.4, z: 0.08, x: 560, y: 1180 }],
  last: { at: 12.4, text: 'Said yes. *Kept the slippers.*', top: 290 },
  cues: [
    ['glitter', 0.0, 0.5], ['riser', 0.7, 1.05, 0.03], ['pop', 1.1, 1174.66, 0.05, 0],
    ['pop', 3.3, 659.25, 0.04, 0], ['tick', 4.12, 0.08], ['tick', 4.18, 0.06], ['bell', 5.02, 1567.98, 0.04, 1.2, 0], ['glitter', 5.0, 5.5],
    ...[6.3, 6.55, 6.8, 7.05, 7.3].map(t => ['tick', t, 0.035]), ['pop', 7.7, 783.99, 0.04, 0], ['glitter', 8.4, 9.2],
    ['pluck', 10.85, 659.25, 0.035, 0.5, 0.3], ['pluck', 11.0, 587.33, 0.035, 0.5, 0.3], ['pop', 10.9, 1046.5, 0.035, 0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
