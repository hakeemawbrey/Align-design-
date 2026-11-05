// kare14 — THE ALMOST RELATIONSHIP, Ep 14: 'When they say "I don't know"' (22 s vertical, star_advice; lofi · Ab; hard cut).
//   0.0–2.6   the bench at dusk: Sagittarius mid-gulp, Cancer's answer bubble "idk??" already slammed in. Record scratch at 0.5:
//             "*'idk.'* okay. okay okay okay." Hook "You finally asked. | They said *'idk.'*"
//   2.6–6.4   the kit's loading bar: 'processing "idk"…' → 99 % → "Error: answer unclear"
//   6.4–10.6  the options: WAIT FOREVER? ✗ · PANIC? ✗ · SAY WHAT I NEED? ✓
//  10.6–13.2  the next bench: Pisces sobbing: "they're both so BRAVE."
//  13.2–22.0  THE STARS: "Thank them for being *honest.*" · "'I don't know' is an answer *for now.* What do you need?"
//             20.0 Sagittarius: "I'll be honest about what I need." Cancer: "thank you." HARD CUT.
import { makeAlmost, drawLane, LANE, bench, star, stars, say, tag, stamp, sparkles, prog, ease, pop01, R, INK, BONE, RED } from '../../kare01/scenes/almostkit.js'

const D = 22
const T = { rec: 0.5, bar: 2.7, opts: [6.4, 7.8, 9.2], pis: 10.6, brave: 11.1, stars: 13.2, l1: 13.6, l2: 15.8, need: 20.0, thx: 20.8 }
const SEAT = 1340

function benchScene(x, t, { lift = 0, moodS = 'wide', moodC = 'neutral', hopsS = [], hopsC = [] } = {}) {
  drawLane(x, t, { time: 'dusk', pan: 900, lampsAt: -5 })
  bench(x, 540, SEAT + 20 - lift, 720)
  star(x, 'sagittarius', 360, SEAT - 110 - lift, 260, t, { mood: moodS, look: [1, -0.2], hops: hopsS })
  star(x, 'cancer', 720, SEAT - 110 - lift, 260, t, { mood: moodC, look: [-1, 0.2], hops: hopsC })
}
const OPTS = [['WAIT FOREVER?', false], ['PANIC?', false], ['SAY WHAT I NEED?', true]]
const shots = [
  { a: 0, b: T.pis, draw(x, t) {
    benchScene(x, t, { moodS: t < T.opts[0] ? 'wide' : 'neutral', moodC: 'squint', hopsC: [0.1] })
    say(x, t, 720, 980, -1, T.bar, 'idk??', { size: 50 })
    OPTS.forEach(([s, ok], i) => {
      const a = T.opts[i]
      if (t < a) return
      tag(x, t, a, 470, 560 + i * 130, s, { size: 46, rot: [-0.04, 0.03, -0.02][i], badge: ok ? '#7dffb0' : RED, n: ok ? '✓' : '✗', out: [T.pis - 0.2, T.pis] })
      if (!ok) stamp(x, t, a + 0.5, 930, 560 + i * 130, 'NOPE', { size: 30, out: [T.pis - 0.2, T.pis] })
    })
  } },
  { a: T.pis, b: T.stars, draw(x, t) {
    drawLane(x, t, { time: 'dusk', pan: 300, lampsAt: -5 })
    bench(x, 540, SEAT + 20, 720)
    star(x, 'pisces', 540, SEAT - 130, 320, t, { tears: 3, mood: 'sparkle', look: [1, -0.2], hops: [T.brave, T.brave + 0.5] })
    say(x, t, 540, 900, T.brave, T.stars, 'they’re both so BRAVE.', { size: 40 })
    sparkles(x, t, 540, 1150, T.brave, 10, 220, 2)
  } },
  { a: T.stars, b: D + 1, draw(x, t) {
    benchScene(x, t, { lift: 150, moodS: t > T.need ? 'happy' : 'neutral', moodC: t > T.thx ? 'sparkle' : 'neutral', hopsS: [T.need], hopsC: [T.thx] })
    say(x, t, 400, 850, T.need, D + 1, 'I’ll be honest about what I need.', { size: 30 })
    say(x, t, 760, 960, T.thx, D + 1, 'thank you.', { size: 30 })
    star(x, 'pisces', 960, SEAT - 200, 120, t, { tears: 2, mood: 'sparkle', look: [-1, -0.3], box: false })
    stars(x, 540, 560, 170, t, { pop: pop01(t, T.stars, 0.38, 2.1), mood: t > T.l2 + 2 ? 'happy' : 'neutral', look: [0, 0.6], hops: [T.l1, T.l2, T.l2 + 0.8] })
  } },
]
function cam(t) {
  if (t < T.bar) return { z: 1.25, fx: 560, fy: 1230 }
  const hit = [...T.opts, T.pis, T.stars].reduce((m, c) => (t >= c && t - c < 0.3 ? c : m), null)
  const k = hit === null ? 0 : 1 - ease.outCubic(prog(t, hit, hit + 0.3))
  return { z: 1.1 + 0.08 * k, fx: 540, fy: 1230, dx: 40 * k }
}
const E = makeAlmost({
  id: 'kare14', duration: D, ending: 'cut',
  hook: 'You finally asked. | They said *‘idk.’*', hookOut: [2.4, 2.6], hookTop: 220, hookSize: 100, hookPlate: [180, 480],
  shots, cam,
  fx: [
    ['recordScratch', { at: T.rec, len: 1.7, caption: '*‘idk.’* okay. okay okay okay.', top: 1640 }],
    ['loadingBar', { at: T.bar, len: 3.6, label: 'processing “idk”…', stallAt: 99, error: 'Error: answer unclear', y: 600 }],
    ['screenShake', { at: T.brave, len: 0.5, amp: 18 }],
  ],
  lines: [
    { t: T.l1, speaker: 'THE STARS', text: 'Thank them for being *honest.*' },
    { t: T.l2, speaker: 'THE STARS', text: '‘I don’t know’ is an answer *for now.* What do you need?' },
  ],
  cues: [
    ...T.opts.flatMap((a, i) => [['pop', a, [1174.66, 1318.51, 1567.98][i], 0.045, 0], ...(i < 2 ? [['boom', a + 0.5, 0.1], ['tick', a + 0.5, 0.05]] : [['pluck', a + 0.1, 1760, 0.04, 0.5, 0]])]),
    ['pop', T.brave, 1318.51, 0.035, 0], ['glitter', T.brave, T.brave + 0.5],
    ['whoosh', T.stars - 0.1, 0.3, 0.03], ['pop', T.stars + 0.1, 739.99, 0.035, 0], ['pop', T.need, 880, 0.035, -0.3], ['pluck', T.thx, 1174.66, 0.04, 0.5, 0.3],
  ],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
void [LANE, R, INK, BONE]
