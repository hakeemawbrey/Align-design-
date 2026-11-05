// kare01 — THE ALMOST RELATIONSHIP, Ep 1: "Dating or just hanging out?" (22 s vertical, star_advice; lofi · F; hard cut).
//   0.0–2.4   mid-whip-zoom spit-take: Taurus mid-spray on the couch next to Gemini, the slammed hook
//             "Are we dating or just… *hanging?*"; 0.5 record scratch + freeze "yep. *that's us.*", caught circle on Taurus.
//   2.4–10.6  the evidence (whip cuts): MOVIE NIGHT #9 (TV glow) · SHARED FRIES · "YOU MET MY *PLANT*"
//  10.6–14.6  friend Pisces pops up behind the couch, crying into a tissue: "so what ARE you two??"
//             Taurus: "we're… vibing."  Gemini: "vibing."  Pisces sobs harder.
//  14.6–22.0  THE STARS: "Hanging out a lot is *lovely.*" · "If you're guessing, you're *allowed to ask.*"
//             21.0 Taurus turns to Gemini: "…so. are we?"  Gemini: hearts. HARD CUT.
import { makeAlmost, drawApartment, APT, star, stars, standY, R, box, tag, say, hearts, sparkles, stamp, prog, ease, lerp, clamp, pop01, outK, bump, BONE, INK, PINK, GOLD, RED, CYAN } from './almostkit.js'

const D = 22
const T = {
  freeze: [0, 2.4], rec: 0.6,
  ev: [[2.4, 5.1], [5.1, 7.85], [7.85, 10.6]],
  pis: 10.6, q: 11.0, vibe: 12.35, vibe2: 13.3, sob: 13.6,
  stars: 14.6, l1: 15.0, l2: 17.6, turn: 20.9, heart: 21.25,
}
const SEAT = APT.couch.seats, SY = APT.couch.seatY
const SZ = 250
const ty = standY(SZ, SY)

// the drink: a mug in Taurus' hand, and the spray (frozen while t < freeze end)
function mug(x, cx, cy) { box(x, cx - 26, cy - 30, 52, 60, BONE, { b: 5 }); R(x, INK, cx + 26, cy - 16, 18, 32); R(x, BONE, cx + 26, cy - 10, 10, 20); R(x, '#8a5a3a', cx - 20, cy - 26, 40, 10) }
function spray(x, t, cx, cy, p) {
  for (let i = 0; i < 26; i++) {
    const a = -0.9 + (i / 26) * 1.2, v = 120 + (i * 37) % 220
    const px = cx + Math.cos(a) * v * p, py = cy + Math.sin(a) * v * p + 160 * p * p
    const s = 10 + (i % 3) * 5
    R(x, INK, px - 3, py - 3, s + 6, s + 6); R(x, i % 4 ? CYAN : '#d9f6ff', px, py, s, s)
  }
  void t
}
function tv(x, t, glow) {
  // the TV glow from off-screen bottom (we're "behind" the TV)
  if (glow <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(540, 1900, 80, 540, 1900, 1100); g.addColorStop(0, `rgba(120,170,255,${0.35 * glow * (0.85 + 0.15 * Math.sin(t * 13))})`); g.addColorStop(1, 'rgba(120,170,255,0)')
  x.fillStyle = g; x.fillRect(0, 700, 1080, 1220); x.restore()
}
function fries(x, cx, cy) {
  box(x, cx - 50, cy - 20, 100, 80, RED, { b: 5 })
  for (let i = 0; i < 6; i++) { R(x, INK, cx - 44 + i * 16, cy - 70 - (i % 3) * 10, 12, 60); R(x, GOLD, cx - 42 + i * 16, cy - 68 - (i % 3) * 10, 8, 56) }
}
function couch(x, t, o = {}) {
  drawApartment(x, t, { lamp: o.lamp ?? 1 })
  tv(x, t, o.tv || 0)
}

const shots = [
  { a: 0, b: T.ev[0][0], draw(x, t) {
    couch(x, t)
    star(x, 'gemini', SEAT[1], ty, SZ, t, { mood: 'wide', look: [-1, -0.3], squash: 0.08 })
    star(x, 'taurus', SEAT[0], ty, SZ, t, { mood: 'wide', look: [1, 0], squash: -0.12 + 0.1 * prog(t, 0, 0.5) })
    mug(x, SEAT[0] + 110, ty + 40)
    spray(x, t, SEAT[0] + 70, ty - 20, 0.42 + 0.44 * clamp(t / 0.5))
  } },
  ...T.ev.map(([a, b], i) => ({ a, b, draw(x, t, S) {
    couch(x, t, { tv: i === 0 ? 1 : 0.4, lamp: i === 0 ? 0.35 : 1 })
    const lean = i === 0 ? ease.inOutCubic(prog(S.u, 0.3, 1.0)) : 0
    star(x, 'taurus', SEAT[0] + 40 * lean, ty, SZ, t, { mood: i === 2 ? 'happy' : i === 1 ? 'happy' : 'sparkle', look: i === 2 ? [1, -0.4] : [0, 0.4], hops: i === 1 ? [a + 0.9, a + 1.4] : [a + 0.4] })
    star(x, 'gemini', SEAT[1] - 30 * lean, ty, SZ, t, { mood: i === 1 ? 'heart' : 'happy', look: i === 2 ? [1, -0.5] : [-1, 0.2], hops: i === 2 ? [a + 0.8, a + 1.2, a + 1.6] : [a + 0.6] })
    if (i === 0) { R(x, 'rgba(255,255,255,0.0)', 0, 0, 1, 1); box(x, 300, ty + 105, 480, 40, '#efe6f6', { b: 5 }) }   // a shared blanket
    if (i === 1) { fries(x, 545, ty + 70); sparkles(x, t, 545, ty, a + 0.9, 8, 120, 2) }
    if (i === 2) { sparkles(x, t, APT.plant.x - 20, APT.plant.y - 120, a + 0.7, 10, 120, 3); say(x, t, 700, 1140, a + 0.7, b, 'hi, plant!', { size: 28, tail: 'down' }) }
    tag(x, t, a + 0.25, 540, 960, ['MOVIE NIGHT #9', 'SHARED FRIES', 'YOU MET MY PLANT'][i], { n: i + 1, size: 40, rot: [-0.05, 0.04, -0.03][i] })
  } })),
  { a: T.pis, b: T.stars, draw(x, t, S) {
    couch(x, t)
    const pk = pop01(t, T.pis, 0.35, 2.2)
    star(x, 'pisces', 790, standY(200, 1180) + (1 - pk) * 200, 200, t, { tears: t > T.sob ? 3 : 2, mood: 'wide', look: [-1, 0.3], pop: 1, hops: [T.q, T.sob] })
    star(x, 'taurus', SEAT[0], ty, SZ, t, { mood: t > T.vibe ? 'squint' : 'wide', look: [1, -0.6], hops: [T.vibe] })
    star(x, 'gemini', SEAT[1] - 20, ty, SZ, t, { mood: t > T.vibe2 ? 'squint' : 'wide', look: [1, -0.6], hops: [T.vibe2] })
    say(x, t, 600, 1000, T.q, T.stars, 'so what ARE you two??', { size: 30 })
    say(x, t, 360, 1150, T.vibe, T.stars, 'we’re… vibing.', { size: 28 })
    say(x, t, 690, 1150, T.vibe2, T.stars, 'vibing.', { size: 28 })
    void S
  } },
  { a: T.stars, b: D + 1, draw(x, t) {
    couch(x, t, { lamp: 0.85 })
    const turn = t > T.turn
    star(x, 'taurus', SEAT[0], ty, 240, t, { mood: turn ? 'sparkle' : 'neutral', look: turn ? [1, 0] : [0.3, -0.8], hops: [T.turn] })
    star(x, 'gemini', SEAT[1], ty, 240, t, { mood: t > T.heart ? 'heart' : 'happy', look: turn ? [-1, 0] : [-0.3, -0.8], hops: [T.heart] })
    hearts(x, t, T.heart, SEAT[1], ty - 140, { n: 6 })
    say(x, t, 380, 1130, T.turn, D + 1, '…so. are we?', { size: 30 })
    const sk = pop01(t, T.stars, 0.38, 2.1)
    stars(x, 540, 930, 180, t, { pop: sk, mood: t > T.l2 + 1.6 ? 'happy' : 'neutral', look: [0, 0.6], hops: [T.l1, T.l1 + 0.6, T.l2, T.l2 + 0.7] })
    star(x, 'pisces', 790, standY(130, 1160), 130, t, { tears: 3, mood: 'sparkle', look: [-1, -0.4], box: false })
  } },
]

// camera: frame 0 is a punched-in, tilted freeze; whip punches on every evidence cut
function cam(t) {
  if (t < T.freeze[1]) return { z: 1.75, fx: 470, fy: 1250, rot: -0.04 }
  const hit = [...T.ev.map(e => e[0]), T.pis, T.stars].reduce((m, c) => (t >= c && t - c < 0.3 ? c : m), null)
  const k = hit === null ? 0 : 1 - ease.outCubic(prog(t, hit, hit + 0.3))
  const up = -230 * ease.inOutCubic(prog(t, T.stars, T.stars + 0.5))
  return { z: 1.42 + 0.14 * k + 0.004 * (t % 8), fx: 540, fy: 1250, dx: 60 * k * (hit % 2 ? 1 : -1), dy: up }
}
function ui(x, t) {
  if (t > T.sob) stamp(x, t, T.sob, 540, 520, 'NOT LABELLED', { size: 64, out: [T.stars - 0.2, T.stars] })
}

const E = makeAlmost({
  id: 'kare01', duration: D, ending: 'cut',
  hook: 'Are we dating | or just… *hanging?*', hookOut: [2.2, 2.4],
  shots, cam, ui,
  fx: [
    ['whipZoom', { at: 0.12, from: 1.45, blur: 14 }],
    ['recordScratch', { at: T.rec, len: 1.7, caption: 'yep. *that’s us.*', sub: 'movie night number nine', top: 1640 }],
    ['caught', { at: T.rec + 0.15, x: 350, y: 1290, r: 210, out: [2.2, 2.35], label: '', arrow: null, rec: false }],
  ],
  flash: t => [T.ev[0][0], T.ev[1][0], T.ev[2][0], T.pis, T.stars].reduce((m, c) => Math.max(m, t >= c && t < c + 0.1 ? 0.5 * (1 - (t - c) / 0.1) : 0), 0),
  lines: [
    { t: T.l1, speaker: 'THE STARS', text: 'Hanging out a lot is *lovely.*' },
    { t: T.l2, speaker: 'THE STARS', text: 'If you’re guessing, you’re *allowed to ask.*' },
  ],
  box: { y: 1460 },
  cues: [
    ...T.ev.flatMap(([a], i) => [['whoosh', a - 0.08, 0.28, 0.035], ['tick', a, 0.05], ['pop', a + 0.25, 1174.66, 0.045, 0.1], ['pop', a + 0.32, [1318.51, 1567.98, 1760][i], 0.03, -0.1]]),
    ['pop', T.pis + 0.05, 987.77, 0.04, 0.4], ['pop', T.q, 880, 0.03, 0.3], ['pop', T.vibe, 659.25, 0.03, -0.3], ['pop', T.vibe2, 587.33, 0.03, 0.3],
    ['boom', T.sob, 0.18], ['tick', T.sob, 0.06],
    ['whoosh', T.stars - 0.1, 0.3, 0.03], ['pop', T.stars + 0.1, 739.99, 0.035, 0],
    ['pop', T.turn, 880, 0.035, -0.3], ['pluck', T.heart, 1174.66, 0.04, 0.5, 0.3], ['pluck', T.heart + 0.12, 1567.98, 0.035, 0.5, 0.3],
  ],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
void [lerp, outK, bump, PINK, GOLD, RED]
