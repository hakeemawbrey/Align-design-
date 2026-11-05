// kare05 — THE ALMOST RELATIONSHIP, Ep 5: "Cropped out of the photo" (16 s vertical, star_advice; synthwave · C; hard cut).
//   0.0–3.2   a giant photo of Libra + Scorpio under the lane lamps; the crop frame is mid-slide, Scorpio's half already
//             dimmed and sliced off. Glitch. Hook "Why am I always | *cropped out?*"
//   3.2–6.2   posted: a phone shows Libra… and one point of Scorpio (the "elbow"). Scorpio: "…is that my elbow?"
//   6.2–9.2   Pisces, sobbing at the phone: "the ELBOW."
//   9.2–16.0  THE STARS: "Being kept off the feed *stings.*" · "You don't need a post. You need *a straight answer.*"
//             14.9 Scorpio turns to Libra: "can I ask you something?" HARD CUT.
import { makeAlmost, drawLane, LANE, star, stars, standY, say, sparkles, prog, ease, clamp, pop01, R, box, INK, BONE, RED, label, MONO } from '../../kare01/scenes/almostkit.js'

const D = 16
const T = { crop: [-1.5, 2.4], posted: 3.2, elbow: 4.0, pis: 6.2, sob: 6.7, stars: 9.2, l1: 9.6, l2: 12.0, ask: 14.9 }
const P = { x: 140, y: 560, w: 800, h: 820 }

// the photo's content (Libra + Scorpio on the lane), drawn into a rect
function photoScene(x, t, r, ft) {
  x.save(); x.beginPath(); x.rect(r.x, r.y, r.w, r.h); x.clip()
  x.translate(r.x, r.y); x.scale(r.w / 1080, r.w / 1080); x.translate(0, -560)
  drawLane(x, ft, { time: 'night', pan: 520 })
  const F = standY(330, LANE.feet)
  star(x, 'libra', 360, F, 330, ft, { mood: 'happy', look: [0, 0], bob: 0 })
  star(x, 'scorpio', 720, F, 330, ft, { mood: 'happy', look: [0, 0], bob: 0 })
  x.restore()
}
function cropFrame(x, t, cx) {
  // dim + slice the part outside the crop
  x.save(); x.fillStyle = 'rgba(8,4,20,0.68)'; x.fillRect(cx, P.y, P.x + P.w - cx, P.h); x.restore()
  x.save(); x.strokeStyle = BONE; x.lineWidth = 6; x.setLineDash([22, 14]); x.lineDashOffset = -t * 60; x.strokeRect(P.x + 8, P.y + 8, cx - P.x - 16, P.h - 16); x.restore()
  for (const [hx, hy] of [[P.x + 8, P.y + 8], [cx - 8, P.y + 8], [P.x + 8, P.y + P.h - 8], [cx - 8, P.y + P.h - 8]]) box(x, hx - 14, hy - 14, 28, 28, BONE, { b: 4 })
  R(x, INK, cx - 7, P.y - 40, 14, P.h + 80); R(x, RED, cx - 3, P.y - 40, 6, P.h + 80)
}
const shots = [
  { a: 0, b: T.posted, draw(x, t) {
    R(x, '#120a2e', 0, 0, 1080, 1920)
    for (let i = 0; i < 24; i++) R(x, i % 2 ? '#1a1040' : '#160c38', 0, i * 80, 1080, 40)
    box(x, P.x - 30, P.y - 30, P.w + 60, P.h + 140, '#fbf6ea', { b: 8 })
    photoScene(x, t, P, 0)
    const cx = lerpX(0.6 + 0.4 * ease.inOutCubic(prog(t, 0.2, T.crop[1])))
    cropFrame(x, t, cx)
    label(x, 'CROP · 1:1', 540, P.y + P.h + 62, { size: 34, col: INK, shadow: false })
  } },
  { a: T.posted, b: T.stars, draw(x, t, S) {
    R(x, '#120a2e', 0, 0, 1080, 1920)
    // the phone with the cropped post
    const k = pop01(t, T.posted, 0.35, 2)
    x.save(); x.translate(540, 900); x.scale(k, k); x.translate(-540, -900)
    box(x, 250, 380, 580, 1040, '#2a2050', { b: 10 })
    R(x, '#120c2a', 270, 440, 540, 920)
    label(x, '@libra.glows', 540, 480, { size: 26, col: BONE })
    photoScene(x, t, { x: 270, y: 520, w: 540, h: 560 }, t)
    R(x, '#120c2a', 270 + 540 * 0.56, 520, 540 * 0.44, 560)                            // Scorpio cropped away…
    x.save(); x.beginPath(); x.rect(270 + 540 * 0.5, 520, 540 * 0.06, 560); x.clip(); photoScene(x, t, { x: 270, y: 520, w: 540, h: 560 }, t); x.restore()  // …except one point
    R(x, INK, 300, 1110, 480, 14); R(x, '#5a4e80', 300, 1150, 360, 12); R(x, '#5a4e80', 300, 1180, 300, 12)
    label(x, '♡ “perfect night”', 400, 1240, { size: 28, col: BONE, align: 'left', font: MONO })
    x.restore()
    if (S.u > 0.4) {
      star(x, 'scorpio', 870, 1530, 230, t, { mood: t > T.elbow ? 'wide' : 'neutral', look: [-1, -0.6], hops: [T.elbow] })
      say(x, t, 760, 1340, T.elbow, T.stars, '…is that my elbow?', { size: 34 })
    }
    if (t > T.pis) {
      star(x, 'pisces', 230, 1520, 230, t, { tears: 3, mood: 'wide', look: [1, -0.6], hops: [T.sob, T.sob + 0.5] })
      say(x, t, 300, 1320, T.sob, T.stars, 'the ELBOW.', { size: 40 })
      sparkles(x, t, 230, 1450, T.sob, 10, 180, 2)
    }
  } },
  { a: T.stars, b: D + 1, draw(x, t) {
    drawLane(x, t, { time: 'night', pan: 520 })
    const F = standY(260, LANE.feet) - 160, ask = t > T.ask
    star(x, 'libra', 380, F, 260, t, { mood: ask ? 'wide' : 'happy', look: ask ? [1, 0] : [0, 0], hops: [T.ask + 0.5] })
    star(x, 'scorpio', 700, F, 260, t, { mood: ask ? 'neutral' : 'squint', look: ask ? [-1, 0] : [0, 0.5], hops: [T.ask] })
    star(x, 'pisces', 960, standY(130, LANE.feet) - 160, 130, t, { tears: 2, mood: 'sparkle', look: [-1, -0.5], box: false })
    say(x, t, 660, 900, T.ask, D + 1, 'can I ask you something?', { size: 32 })
    stars(x, 540, 560, 180, t, { pop: pop01(t, T.stars, 0.38, 2.1), mood: t > T.l2 + 1.6 ? 'happy' : 'neutral', look: [0, 0.6], hops: [T.l1, T.l2, T.l2 + 0.7] })
  } },
]
function lerpX(p) { return P.x + P.w - p * P.w * 0.48 - 40 * (1 - p) + 0 * clamp(p) }
function cam(t) {
  const hit = [T.posted, T.pis, T.stars].reduce((m, c) => (t >= c && t - c < 0.3 ? c : m), null)
  const k = hit === null ? 0 : 1 - ease.outCubic(prog(t, hit, hit + 0.3))
  return { z: 1 + 0.1 * k, dx: 60 * k }
}
const E = makeAlmost({
  id: 'kare05', duration: D, ending: 'cut',
  hook: 'Why am I always | *cropped out?*', hookOut: [3.0, 3.2], hookTop: 150, hookSize: 104,
  shots, cam,
  fx: [['glitch', { at: 0.25, len: 0.7, dialog: false, amp: 0.8 }], ['whipZoom', { at: T.posted, len: 0.35, from: 1.3, blur: 14 }], ['screenShake', { at: T.sob, len: 0.5, amp: 20 }], ['caught', { at: T.elbow - 0.1, x: 560, y: 875, r: 80, out: [T.pis - 0.2, T.pis], label: 'THE ELBOW', arrow: 'tl', rec: false }]],
  lines: [
    { t: T.l1, speaker: 'THE STARS', text: 'Being kept off the feed *stings.*' },
    { t: T.l2, speaker: 'THE STARS', text: 'You don’t need a post. You need *a straight answer.*' },
  ],
  cues: [
    ['riser', 0.6, 2.4, 0.012], ['tick', 2.4, 0.06], ['pop', T.posted + 0.1, 1318.51, 0.04, 0], ['pop', T.elbow, 659.25, 0.035, 0.4],
    ['pop', T.sob, 1174.66, 0.035, -0.4], ['whoosh', T.stars - 0.1, 0.3, 0.03], ['pop', T.stars + 0.1, 739.99, 0.035, 0], ['pop', T.ask, 880, 0.035, 0.3],
  ],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
