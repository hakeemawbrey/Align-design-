// og-kare14: og social rework (OG-REWORK.md) of kare14 'When they say "I don't know"'. Same bench at dusk, same cast and story;
// static HOOK, no series bug / slam title / record-scratch freeze / shake, crazier options and lines, the opening held 1 s
// longer under the hook, THE STARS and Pisces moved inside the safe zone. Kit: ./almostkit.js (social copy).
//   0.0–3.7   the bench at dusk: Sagittarius mid-gulp, Cancer's answer bubble "idk??" already in. Sagittarius: "okay. okay okay okay."
//   3.7–7.4   the kit's loading bar: 'processing "idk"…' → 99 % → "Error: too many meanings"
//   7.4–11.6  the options: WAIT. FOREVER? ✗ · FLEE THE COUNTRY? ✗ · SAY WHAT I NEED? ✓
//  11.6–14.2  the next bench: Pisces sobbing: "i'm crying. they're so BRAVE."
//  14.2–23.0  THE STARS: "Thank them for being *honest.*" · "'I don't know' is an answer *for now.* What do you need?"
//             21.0 Sagittarius: "I'll be honest about what I need." Cancer: "thank you. i'm crying too." HARD CUT.
import { makeAlmost, drawLane, LANE, bench, star, stars, say, tag, stamp, sparkles, prog, ease, pop01, R, INK, BONE, RED } from './almostkit.js'

const D = 23
const T = { okay: 1.8, bar: 3.7, opts: [7.4, 8.8, 10.2], pis: 11.6, brave: 12.1, stars: 14.2, l1: 14.6, l2: 16.8, need: 21.0, thx: 21.8 }
const SEAT = 1340

function benchScene(x, t, { lift = 0, moodS = 'wide', moodC = 'neutral', hopsS = [], hopsC = [] } = {}) {
  drawLane(x, t, { time: 'dusk', pan: 900, lampsAt: -5 })
  bench(x, 540, SEAT + 20 - lift, 720)
  star(x, 'sagittarius', 360, SEAT - 110 - lift, 260, t, { mood: moodS, look: [1, -0.2], hops: hopsS })
  star(x, 'cancer', 720, SEAT - 110 - lift, 260, t, { mood: moodC, look: [-1, 0.2], hops: hopsC })
}
const OPTS = [['WAIT. FOREVER?', false], ['FLEE THE COUNTRY?', false], ['SAY WHAT I NEED?', true]]
const shots = [
  { a: 0, b: T.pis, draw(x, t) {
    benchScene(x, t, { moodS: t < T.opts[0] ? 'wide' : 'neutral', moodC: 'squint', hopsC: [0.1] })
    say(x, t, 720, 980, -1, T.bar, 'idk??', { size: 50 })
    say(x, t, 330, 1000, T.okay, T.bar, 'okay. okay okay okay.', { size: 30 })
    OPTS.forEach(([s, ok], i) => {
      const a = T.opts[i]
      if (t < a) return
      tag(x, t, a, 450, 560 + i * 130, s, { size: 44, rot: [-0.04, 0.03, -0.02][i], badge: ok ? '#7dffb0' : RED, n: ok ? '✓' : '✗', out: [T.pis - 0.2, T.pis] })
      if (!ok) stamp(x, t, a + 0.5, 850, 560 + i * 130, 'NOPE', { size: 30, out: [T.pis - 0.2, T.pis] })
    })
  } },
  { a: T.pis, b: T.stars, draw(x, t) {
    drawLane(x, t, { time: 'dusk', pan: 300, lampsAt: -5 })
    bench(x, 540, SEAT + 20, 720)
    star(x, 'pisces', 540, SEAT - 130, 320, t, { tears: 3, mood: 'sparkle', look: [1, -0.2], hops: [T.brave, T.brave + 0.5] })
    say(x, t, 540, 900, T.brave, T.stars, 'i’m crying. they’re so BRAVE.', { size: 38 })
    sparkles(x, t, 540, 1150, T.brave, 10, 220, 2)
  } },
  { a: T.stars, b: D + 1, draw(x, t) {
    benchScene(x, t, { lift: 150, moodS: t > T.need ? 'happy' : 'neutral', moodC: t > T.thx ? 'sparkle' : 'neutral', hopsS: [T.need], hopsC: [T.thx] })
    say(x, t, 400, 850, T.need, D + 1, 'I’ll be honest about what I need.', { size: 30 })
    say(x, t, 720, 960, T.thx, D + 1, 'thank you. i’m crying too.', { size: 28 })
    star(x, 'pisces', 860, SEAT - 200, 110, t, { tears: 3, mood: 'sparkle', look: [-1, -0.3], box: false })
    stars(x, 540, 650, 160, t, { pop: pop01(t, T.stars, 0.38, 2.1), mood: t > T.l2 + 2 ? 'happy' : 'neutral', look: [0, 0.6], hops: [T.l1, T.l2, T.l2 + 0.8] })
  } },
]
function cam(t) {   // og social: hit punches halved
  if (t < T.bar) return { z: 1.25, fx: 560, fy: 1230 }
  const hit = [...T.opts, T.pis, T.stars].reduce((m, c) => (t >= c && t - c < 0.3 ? c : m), null)
  const k = hit === null ? 0 : 1 - ease.outCubic(prog(t, hit, hit + 0.3))
  return { z: 1.1 + 0.04 * k, fx: 540, fy: 1230, dx: 20 * k }
}
const E = makeAlmost({
  id: 'og-kare14', duration: D, ending: 'cut',
  hook: null, shots, cam,
  fx: [
    ['loadingBar', { at: T.bar, len: 3.6, label: 'processing “idk”…', stallAt: 99, error: 'Error: too many meanings', y: 640 }],
  ],
  lines: [
    { t: T.l1, speaker: 'THE STARS', text: 'Thank them for being *honest.*' },
    { t: T.l2, speaker: 'THE STARS', text: '‘I don’t know’ is an answer *for now.* What do you need?' },
  ],
  cues: [
    ['pop', T.okay, 659.25, 0.03, -0.3],
    ...T.opts.flatMap((a, i) => [['pop', a, [1174.66, 1318.51, 1567.98][i], 0.045, 0], ...(i < 2 ? [['tick', a + 0.5, 0.04]] : [['pluck', a + 0.1, 1760, 0.04, 0.5, 0]])]),
    ['pop', T.brave, 1318.51, 0.035, 0], ['glitter', T.brave, T.brave + 0.5],
    ['whoosh', T.stars - 0.1, 0.3, 0.03], ['pop', T.stars + 0.1, 739.99, 0.035, 0], ['pop', T.need, 880, 0.035, -0.3], ['pluck', T.thx, 1174.66, 0.04, 0.5, 0.3],
  ],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
void [LANE, R, INK, BONE]

// og social cut: static hook caption from frame 0 (the kit's slam title is off in ./almostkit.js, a social copy)
export const HOOK = 'You finally asked. | They said *“idk.”*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.5
