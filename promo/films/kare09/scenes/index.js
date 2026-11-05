// kare09 — THE ALMOST RELATIONSHIP, Ep 9: "Rehearsing the talk in the mirror" (24 s vertical, star_advice; dreamy · Eb; loop).
//   0.0–3.0   Cancer mid-dramatic-gesture at the bedroom mirror (its reflection mirroring it), Pisces the coach on the bed
//             with tissues. Hook "Rehearsal number *eleven* | of 'the talk.'"
//   3.0–7.0   TAKE 1: a full presentation on an easel, "WHY WE SHOULD BE: A PRESENTATION", "slide 1 of 40…"
//   7.0–10.5  TAKE 7: lights low, a whisper: "(what… are we…)"
//  10.5–13.6  TAKE 11: face-first into a pillow: "MMMMPH!!" Pisces, sobbing: "it was BEAUTIFUL."
//  13.6–24.0  THE STARS: "Simpler than you *think.*" · "*I like you. I'd like more. You?* That's the whole speech."
//             21.2 Cancer, calm, to the mirror: "I like you. I'd like more. you?" Pisces fountains.
//             The last 0.45 s blend back into frame 0.
import { makeAlmost, bedroom, mirror, star, stars, standY, say, tag, sparkles, prog, ease, pop01, R, box, INK, BONE, RED, INTER, label } from '../../kare01/scenes/almostkit.js'

const D = 24
const T = { takes: [3.0, 7.0, 10.5], slide: 3.8, whisper: 7.6, mmph: 11.1, beaut: 12.4, stars: 13.6, l1: 14.0, l2: 16.2, calm: 21.2 }
const M = { x: 780, y: 1000, w: 330, h: 560 }

function scene(x, t, { cancer = {}, refl = true, dim = 0, pis = {} } = {}) {
  bedroom(x, t, { lamp: 0.6 })
  if (dim) R(x, `rgba(6,4,20,${dim})`, 0, 0, 1080, 1920)
  mirror(x, M.x, M.y, M.w, M.h, refl ? c => { c.save(); c.translate(M.x * 2 - 40, 0); c.scale(-1, 1); star(c, 'cancer', M.x - 20 - (cancer.dx || 0) * 0.3, 1150, 220, t, { ...cancer, look: cancer.look ? [-cancer.look[0], cancer.look[1]] : [0, 0] }); c.restore() } : null)
  star(x, 'cancer', 420 + (cancer.dx || 0), standY(300, 1395), 300, t, { look: [1, -0.2], ...cancer })
  star(x, 'pisces', 290, standY(190, 1600), 190, t, { tears: 2, mood: 'sparkle', look: [1, -0.4], ...pis })
}
function easel(x, t, a) {
  const k = pop01(t, a, 0.3, 2)
  if (k <= 0.01) return
  x.save(); x.translate(800, 820); x.scale(k, k)
  R(x, INK, -140, 160, 16, 300); R(x, INK, 124, 160, 16, 300)
  box(x, -200, -200, 400, 360, BONE, { b: 7 })
  x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillStyle = INK
  x.fillText('WHY WE SHOULD BE:', 0, -140); x.fillText('A PRESENTATION', 0, -100)
  R(x, RED, -150, -60, 120, 140); R(x, '#7fd0ff', -10, -20, 60, 100); R(x, '#2f9a62', 70, -80, 60, 160)
  x.restore()
}
function pillow(x, cx, cy) { box(x, cx - 180, cy - 80, 360, 160, '#efe6f6', { b: 7, hi: '#ffffff' }) }

const shots = [
  { a: 0, b: T.takes[0], draw(x, t) { scene(x, t, { cancer: { mood: 'sparkle', rot: -0.22, squash: -0.08, hops: [0.4, 1.1, 1.8] } }) } },
  { a: T.takes[0], b: T.takes[1], draw(x, t) {
    scene(x, t, { refl: true, cancer: { mood: 'happy', dx: -140, look: [1, -0.3], hops: [T.slide, T.slide + 0.5, T.slide + 1.0, T.slide + 1.5] } })
    easel(x, t, T.takes[0] + 0.2)
    say(x, t, 300, 980, T.slide, T.takes[1], 'slide 1 of 40…', { size: 34 })
  } },
  { a: T.takes[1], b: T.takes[2], draw(x, t) {
    scene(x, t, { dim: 0.55, cancer: { mood: 'squint', look: [1, 0.3], squash: 0.06 }, pis: { tears: 2 } })
    say(x, t, 470, 1040, T.whisper, T.takes[2], '(what… are we…)', { size: 24 })
  } },
  { a: T.takes[2], b: T.stars, draw(x, t) {
    bedroom(x, t, { lamp: 0.6 })
    mirror(x, M.x, M.y, M.w, M.h, null)
    const sq = 0.08 * Math.sin(t * 30) * (t > T.mmph && t < T.mmph + 1 ? 1 : 0)
    pillow(x, 640, 1300)
    star(x, 'cancer', 560, 1180, 300, t, { mood: 'squint', look: [0, 1], rot: 1.1, squash: sq })
    say(x, t, 560, 980, T.mmph, T.beaut + 0.6, 'MMMMPH!!', { size: 48 })
    star(x, 'pisces', 300, standY(230, 1600), 230, t, { tears: 3, mood: 'wide', look: [1, -0.4], hops: [T.beaut, T.beaut + 0.5] })
    say(x, t, 380, 1140, T.beaut, T.stars, 'it was BEAUTIFUL.', { size: 32 })
  } },
  { a: T.stars, b: D + 1, draw(x, t) {
    const calm = t > T.calm
    scene(x, t, { cancer: { mood: calm ? 'happy' : 'neutral', look: [1, -0.2], hops: calm ? [T.calm, T.calm + 0.5] : [] }, pis: { tears: calm ? 3 : 2, mood: calm ? 'sparkle' : 'wide' } })
    say(x, t, 470, 1000, T.calm, D - 0.5, 'I like you. I’d like more. you?', { size: 28 })
    sparkles(x, t, 210, 1450, T.calm + 0.4, 10, 160, 2)
    stars(x, 540, 560, 170, t, { pop: pop01(t, T.stars, 0.38, 2.1) * (1 - ease.inQuad(prog(t, D - 1.2, D - 0.6))), mood: t > T.l2 + 2.4 ? 'happy' : 'neutral', look: [0, 0.6], hops: [T.l1, T.l2, T.l2 + 0.7] })
  } },
]
function ui(x, t) {
  T.takes.forEach((a, i) => tag(x, t, a + 0.05, 540, 460, `TAKE ${[1, 7, 11][i]}`, { size: 56, rot: [-0.05, 0.04, -0.03][i], badge: RED, out: [a + 1.5, a + 1.7] }))
  void label
}
function cam(t) {
  const hit = [...T.takes, T.stars].reduce((m, c) => (t >= c && t - c < 0.3 ? c : m), null)
  const k = hit === null ? 0 : 1 - ease.outCubic(prog(t, hit, hit + 0.3))
  const up = -110 * ease.inOutCubic(prog(t, T.stars, T.stars + 0.5)) * (1 - ease.inOutCubic(prog(t, D - 1.4, D - 0.5)))
  return { z: 1.3 + 0.1 * k, fx: 540, fy: 1250, dx: 40 * k, dy: up }
}
const E = makeAlmost({
  id: 'kare09', duration: D, ending: 'loop',
  hook: 'Rehearsal number *eleven* | of ‘the talk.’', hookOut: [2.8, 3.0], hookTop: 230, hookSize: 100, hookPlate: [190, 500],
  shots, cam, ui,
  fx: [['whipZoom', { at: 0.12, from: 1.45, blur: 12 }], ['screenShake', { at: T.mmph, len: 0.8, amp: 22 }]],
  lines: [
    { t: T.l1, speaker: 'THE STARS', text: 'Simpler than you *think.*' },
    { t: T.l2, speaker: 'THE STARS', text: '*I like you. I’d like more. You?* That’s the whole speech.' },
  ],
  box: { close: D - 0.9 },
  cues: [
    ...T.takes.flatMap(a => [['tick', a, 0.08], ['pop', a + 0.05, 1174.66, 0.045, 0]]), ['pop', T.slide, 880, 0.03, -0.3],
    ['pop', T.whisper, 587.33, 0.02, 0], ['boom', T.mmph, 0.14], ['pop', T.beaut, 1318.51, 0.035, -0.4], ['glitter', T.beaut, T.beaut + 0.5],
    ['whoosh', T.stars - 0.1, 0.3, 0.03], ['pop', T.stars + 0.1, 739.99, 0.035, 0], ['pluck', T.calm, 1174.66, 0.04, 0.5, 0], ['glitter', T.calm + 0.4, T.calm + 1.0],
  ],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
