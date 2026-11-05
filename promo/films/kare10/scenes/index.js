// kare10 — THE ALMOST RELATIONSHIP, Ep 10: '"I'm not looking for anything serious." "Me neither!"' (18 s vertical,
// star_advice; screwed · Am; hard cut).
//   0.0–2.6   the lane bench: Sagittarius: "nothing serious, right?" Pisces mid-nod with a frozen smile and ONE tear.
//             Record scratch + freeze at 0.55: "*totally!* (it was not totally.)" Hook "Said 'me neither.' | Meant *'me, very much.'*"
//   2.6–6.0   Pisces: "totally! me neither!" (eye twitch, the tear grows)
//   6.0–9.6   home: Pisces sobbing in a pillow fort: "WHY DID I SAY THAT"
//   9.6–18.0  THE STARS: "Agreeing to less than you want isn't chill. It's *hiding.*" ·
//             "'Me neither' when you mean 'me, very much' *costs you.*"
//             16.3 Pisces, phone up, steady: "actually… I'd like something real." HARD CUT.
import { makeAlmost, drawLane, LANE, bench, bedroom, star, stars, standY, say, sparkles, prog, ease, pop01, R, box, INK, BONE, PINK, LAV, lockPhone } from '../../kare01/scenes/almostkit.js'

const D = 18
const T = { rec: 0.55, totally: 2.7, home: 6.0, why: 6.4, stars: 9.6, l1: 10.0, l2: 13.1, real: 16.3 }
const SEAT = 1360

function fort(x, t) {
  for (const [cx, w, c] of [[300, 360, '#7a6ab0'], [700, 420, '#9a7ad0'], [500, 300, PINK]]) {
    x.fillStyle = INK; x.beginPath(); x.moveTo(cx - w / 2 - 8, 1560); x.lineTo(cx, 1060 - 8); x.lineTo(cx + w / 2 + 8, 1560); x.fill()
    x.fillStyle = c; x.beginPath(); x.moveTo(cx - w / 2, 1560); x.lineTo(cx, 1060); x.lineTo(cx + w / 2, 1560); x.fill()
  }
  for (let i = 0; i < 5; i++) box(x, 120 + i * 180, 1500, 150, 90, '#efe6f6', { b: 5 })
  void t
}
const shots = [
  { a: 0, b: T.home, draw(x, t) {
    drawLane(x, t, { time: 'night', pan: 700 })
    bench(x, 540, SEAT + 20, 700)
    star(x, 'sagittarius', 330, SEAT - 110, 250, t, { mood: 'happy', look: [1, 0], hops: [0.2] })
    const tw = t > T.totally ? (Math.floor(t * 3) % 2 ? 0.6 : 0) : 0
    star(x, 'pisces', 740, SEAT - 110, 250, t, { tears: t > T.totally + 1 ? 2 : 1, box: false, mood: 'happy', look: [-1, 0], blink: tw, squash: 0.05 * Math.sin(t * 9), hops: [T.totally, T.totally + 0.4] })
    say(x, t, 360, 1000, -1, T.totally - 0.1, 'nothing serious, right?', { size: 34 })
    say(x, t, 740, 1000, T.totally, T.home, 'totally! me neither!', { size: 34 })
  } },
  { a: T.home, b: T.stars, draw(x, t) {
    bedroom(x, t, { lamp: 0.2 })
    fort(x, t)
    star(x, 'pisces', 500, 1380, 300, t, { tears: 3, mood: 'wide', look: [0, 0.2], hops: [T.why, T.why + 0.4, T.why + 0.8, T.why + 1.2], box: true })
    say(x, t, 520, 960, T.why, T.stars, 'WHY DID I SAY THAT', { size: 44 })
    sparkles(x, t, 500, 1300, T.why, 12, 260, 4, ['#8fe3ff', BONE, LAV])
  } },
  { a: T.stars, b: D + 1, draw(x, t) {
    drawLane(x, t, { time: 'night', pan: 700 })
    bench(x, 540, SEAT + 20 - 150, 700)
    const real = t > T.real
    star(x, 'pisces', 560, SEAT - 260, 270, t, { tears: 2, box: false, mood: real ? 'sparkle' : 'neutral', look: real ? [1, -0.3] : [0, 0.6], hops: real ? [T.real, T.real + 0.5] : [] })
    if (real) lockPhone(x, t, 820, 1060, { w: 160, h: 280, time: 'send', k: pop01(t, T.real - 0.2, 0.3, 2), glow: 0.5 })
    say(x, t, 520, 900, T.real, D + 1, 'actually… I’d like something real.', { size: 30 })
    stars(x, 540, 560, 170, t, { pop: pop01(t, T.stars, 0.38, 2.1), mood: t > T.l2 + 1.8 ? 'happy' : 'neutral', look: [0, 0.6], hops: [T.l1, T.l1 + 0.8, T.l2, T.l2 + 0.7] })
  } },
]
function cam(t) {
  if (t < T.home) return { z: 1.25, fx: 600, fy: 1250 }
  const hit = [T.home, T.stars].reduce((m, c) => (t >= c && t - c < 0.3 ? c : m), null)
  const k = hit === null ? 0 : 1 - ease.outCubic(prog(t, hit, hit + 0.3))
  return { z: 1.15 + 0.1 * k, fx: 540, fy: 1250, dx: 40 * k }
}
const E = makeAlmost({
  id: 'kare10', duration: D, ending: 'cut',
  hook: 'Said ‘me neither.’ | Meant *‘me, very much.’*', hookOut: [2.4, 2.6], hookTop: 210, hookSize: 96, hookPlate: [170, 470],
  shots, cam,
  fx: [
    ['recordScratch', { at: T.rec, len: 1.6, caption: '*totally!* (it was not totally.)', top: 1640 }],
    ['caught', { at: T.rec + 0.15, x: 775, y: 1230, r: 175, out: [2.0, 2.2], label: '', arrow: null, rec: false }],
    ['whipZoom', { at: T.home, len: 0.35, from: 1.35, blur: 14 }], ['screenShake', { at: T.why, len: 0.7, amp: 22 }],
  ],
  lines: [
    { t: T.l1, speaker: 'THE STARS', text: 'Agreeing to less than you want isn’t chill. It’s *hiding.*' },
    { t: T.l2, speaker: 'THE STARS', text: '‘Me neither’ when you mean ‘me, very much’ *costs you.*' },
  ],
  cues: [['pop', T.totally, 1318.51, 0.035, 0.3], ['tick', T.totally + 0.35, 0.05], ['tick', T.totally + 0.7, 0.05], ['boom', T.why, 0.14],
    ['whoosh', T.stars - 0.1, 0.3, 0.03], ['pop', T.stars + 0.1, 739.99, 0.035, 0], ['pluck', T.real, 1174.66, 0.04, 0.5, 0.2]],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
void [LANE, standY, R, BONE]
