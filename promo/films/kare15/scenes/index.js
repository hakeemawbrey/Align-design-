// kare15 — THE ALMOST RELATIONSHIP, Ep 15: 'Hearing "just friends" with grace' (22 s vertical, star_advice; cinematic · Bb; loop).
//   0.0–2.6   a snowy step on the lane: Aries mid-ask ("do you… like me, like me?"), Capricorn mid-wince. Record scratch +
//             freeze at 0.4: the snow hangs in the air. Hook "Asked. Heard *'just friends.'* | Now what?"
//   2.6–6.0   Capricorn, kindly: "I see you as a friend. a really good one." Aries' face crumbles.
//   6.0–9.2   Aries, steady: "thank you for telling me." Capricorn: "thank you for asking."
//   9.2–12.0  behind the lamp post, Pisces sobbing (proud): "SO MATURE."
//  12.0–22.0  THE STARS: "It's okay if that *hurts.*" · "A kind 'no' is still a *clear* one. That's a gift."
//             19.6 "still on for game night?" "obviously." The last 0.45 s blend back into frame 0.
import { makeAlmost, drawLane, LANE, standY, snow, star, stars, say, sparkles, prog, ease, pop01, R, INK } from '../../kare01/scenes/almostkit.js'

const D = 22
const T = { rec: 0.4, kind: 2.8, crumble: 4.4, thank: 6.0, thank2: 7.4, pis: 9.2, mature: 9.7, stars: 12.0, l1: 12.4, l2: 14.6, game: 19.4, obv: 20.2 }
const FEET = LANE.feet, SZ = 270

function step(x, t, { lift = 0, a = {}, c = {} } = {}) {
  drawLane(x, t, { time: 'night', pan: 1300 })
  R(x, 'rgba(230,236,255,0.10)', 0, 0, 1080, 1920)
  R(x, INK, 120, FEET - 14 - lift, 840, 26); R(x, '#b9b4d8', 128, FEET - 10 - lift, 824, 16)     // the snowy step
  star(x, 'aries', 380, standY(SZ, FEET - 10 - lift), SZ, t, { look: [1, -0.2], ...a })
  star(x, 'capricorn', 720, standY(SZ, FEET - 10 - lift), SZ, t, { look: [-1, -0.1], ...c })
  snow(x, t, { n: 80, a: 0.95 })
}
const shots = [
  { a: 0, b: T.pis, draw(x, t) {
    const crumb = t > T.crumble && t < T.thank
    step(x, t, {
      a: { mood: t < T.kind ? 'sparkle' : crumb ? 'squint' : t > T.thank ? 'neutral' : 'wide', squash: crumb ? 0.06 + 0.02 * Math.sin(t * 30) : 0, hops: [T.thank] },
      c: { mood: t < T.kind ? 'wide' : t > T.thank2 ? 'happy' : 'neutral', rot: t < T.kind ? 0.1 : 0, hops: [T.kind, T.thank2] },
    })
    say(x, t, 400, 1020, -1, T.kind, 'do you… like me, like me?', { size: 32 })
    say(x, t, 680, 960, T.kind, T.thank, 'I see you as a friend. a really good one.', { size: 26 })
    say(x, t, 380, 1020, T.thank, T.pis, 'thank you for telling me.', { size: 30 })
    say(x, t, 720, 900, T.thank2, T.pis, 'thank you for asking.', { size: 30 })
  } },
  { a: T.pis, b: T.stars, draw(x, t) {
    drawLane(x, t, { time: 'night', pan: 1100 })
    R(x, 'rgba(230,236,255,0.10)', 0, 0, 1080, 1920)
    // the lamp post Pisces hides behind
    R(x, INK, 616, 520, 44, 920); R(x, '#4a4466', 624, 520, 28, 920)
    star(x, 'pisces', 540, standY(300, FEET), 300, t, { tears: 3, mood: 'sparkle', look: [1, -0.2], hops: [T.mature, T.mature + 0.5] })
    snow(x, t, { n: 80, a: 0.95 })
    say(x, t, 560, 960, T.mature, T.stars, 'SO MATURE.', { size: 48 })
    sparkles(x, t, 540, 1200, T.mature, 12, 240, 3)
  } },
  { a: T.stars, b: D + 1, draw(x, t) {
    const back = ease.inOutCubic(prog(t, D - 1.2, D - 0.5))
    step(x, t, { lift: 170 * (1 - back), a: { mood: t > T.obv ? 'happy' : 'neutral', hops: [T.game] }, c: { mood: t > T.obv ? 'happy' : 'neutral', hops: [T.obv] } })
    say(x, t, 400, 860 + 170 * back, T.game, D - 0.6, 'still on for game night?', { size: 30 })
    say(x, t, 720, 960 + 170 * back, T.obv, D - 0.6, 'obviously.', { size: 30 })
    star(x, 'pisces', 980, standY(120, FEET - 180), 120, t, { tears: 2, mood: 'sparkle', look: [-1, -0.3], box: false, alpha: 1 - back })
    stars(x, 540, 560, 170, t, { pop: pop01(t, T.stars, 0.38, 2.1) * (1 - back), mood: t > T.l2 + 2 ? 'happy' : 'neutral', look: [0, 0.6], hops: [T.l1, T.l2, T.l2 + 0.8] })
  } },
]
function cam(t) {
  const hit = [T.kind, T.thank, T.pis, T.stars].reduce((m, c) => (t >= c && t - c < 0.3 ? c : m), null)
  const k = hit === null ? 0 : 1 - ease.outCubic(prog(t, hit, hit + 0.3))
  const pre = t < T.pis ? 1.22 : 1.1
  return { z: pre + 0.08 * k, fx: 540, fy: 1260, dx: 40 * k }
}
const E = makeAlmost({
  id: 'kare15', duration: D, ending: 'loop',
  hook: 'Asked. Heard *‘just friends.’* | Now what?', hookOut: [2.4, 2.6], hookTop: 220, hookSize: 96, hookPlate: [180, 480],
  shots, cam,
  fx: [['recordScratch', { at: T.rec, len: 2.0, caption: 'time: *frozen.* heart: also frozen.', top: 1640 }], ['screenShake', { at: T.crumble, len: 0.5, amp: 14 }], ['screenShake', { at: T.mature, len: 0.5, amp: 18 }]],
  lines: [
    { t: T.l1, speaker: 'THE STARS', text: 'It’s okay if that *hurts.*' },
    { t: T.l2, speaker: 'THE STARS', text: 'A kind ‘no’ is still a *clear* one. That’s a gift.' },
  ],
  box: { close: D - 1.0 },
  cues: [['pop', T.kind, 659.25, 0.035, 0.3], ['tom', T.crumble, 98, { gain: 0.2, decay: 0.3 }], ['pop', T.thank, 880, 0.035, -0.3], ['pop', T.thank2, 987.77, 0.035, 0.3],
    ['pop', T.mature, 1318.51, 0.04, 0], ['glitter', T.mature, T.mature + 0.5], ['whoosh', T.stars - 0.1, 0.3, 0.03], ['pop', T.stars + 0.1, 739.99, 0.035, 0],
    ['pop', T.game, 880, 0.035, -0.3], ['pluck', T.obv, 1174.66, 0.04, 0.5, 0.3]],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
