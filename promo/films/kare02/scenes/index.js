// kare02 — THE ALMOST RELATIONSHIP, Ep 2: 'Introduced as "my friend"' (20 s vertical, star_advice; pop · A; hard cut).
//   0.0–2.3   a party: Leo mid-presenting-gesture, Cancer mid-wave; 0.1 whip zoom, 0.6 record scratch + freeze, caught on Cancer.
//             Hook "Introduced as… my *friend*?"
//   2.3–5.2   replay: Leo: "this is my friend, Cancer!" · two guests: "hiii!" · Cancer's wave droops.
//   5.2–9.0   punch-in on Cancer's face; a loading bar over its head: "friend?? … 97%".
//   9.0–12.0  Pisces in the crowd, sobbing for Cancer, tissue up: "I felt that."
//  12.0–20.0  THE STARS: "That sting is *real information.*" · "Say how it *landed*. Then ask what they meant."
//             18.9 Cancer to Leo: "can we talk later?" Leo: "of course." HARD CUT.
import { makeAlmost, partyRoom, star, stars, standY, label, loadingBar, say, sparkles, prog, ease, clamp, pop01, BONE, RED, PINK, INTER } from '../../kare01/scenes/almostkit.js'

const D = 20
const T = { freeze: 2.3, intro: 2.45, hi: 3.5, droop: 4.2, face: 5.2, bar: [5.6, 8.2], pis: 9.0, felt: 9.6, stars: 12.0, l1: 12.4, l2: 15.0, talk: 18.6, ok: 19.2 }
const FEET = 1460, SZ = 250

function crowd(x, t, f) {
  star(x, 'aries', 150, standY(170, FEET - 60), 170, f, { mood: 'happy', look: [1, 0], seed: 21, hops: [T.hi] })
  star(x, 'sagittarius', 950, standY(170, FEET - 60), 170, f, { mood: 'happy', look: [-1, 0], seed: 22, hops: [T.hi + 0.1] })
}
const shots = [
  { a: 0, b: T.face, draw(x, t) {
    const f = t
    partyRoom(x, f)
    crowd(x, t, f)
    star(x, 'leo', 380, standY(SZ, FEET), SZ, f, { mood: 'happy', look: [1, 0], squash: -0.08 * (1 - prog(t, 0, 0.6)), hops: [T.intro, T.intro + 0.5, T.intro + 1.0] })
    const droop = ease.inOutCubic(prog(t, T.droop, T.droop + 0.6))
    star(x, 'cancer', 700, standY(SZ, FEET), SZ, f, { mood: t > T.droop ? 'wide' : 'happy', look: [-1, 0], rot: -0.18 * (1 - droop) + 0.06 * droop })
    say(x, t, 420, 1000, T.intro, T.face, 'this is my friend, Cancer!', { size: 32 })
    say(x, t, 250, 1130, T.hi, T.face, 'hiii!', { size: 26 })
  } },
  { a: T.face, b: T.pis, draw(x, t, S) {
    partyRoom(x, t, { lights: 0.4 })
    star(x, 'cancer', 540, 1150, 520, t, { mood: S.u > 1.2 ? 'squint' : 'wide', look: [0, 0], blink: false, squash: 0.04 * Math.sin(S.u * 30) * Math.exp(-S.u * 2) })
  } },
  { a: T.pis, b: T.stars, draw(x, t) {
    partyRoom(x, t)
    star(x, 'taurus', 200, standY(200, FEET - 20), 200, t, { mood: 'happy', look: [1, 0] })
    star(x, 'pisces', 560, standY(300, FEET), 300, t, { tears: 3, mood: 'wide', look: [0, 0], hops: [T.pis + 0.1, T.felt, T.felt + 0.6] })
    star(x, 'gemini', 900, standY(200, FEET - 20), 200, t, { mood: 'wide', look: [-1, 0] })
    say(x, t, 560, 900, T.felt, T.stars, 'I felt that.', { size: 40 })
    sparkles(x, t, 560, 1200, T.felt, 10, 220, 4)
  } },
  { a: T.stars, b: D + 1, draw(x, t) {
    partyRoom(x, t, { lights: 0.7 })
    const talk = t > T.talk
    star(x, 'leo', 380, standY(SZ, FEET), SZ, t, { mood: t > T.ok ? 'happy' : talk ? 'wide' : 'happy', look: talk ? [1, 0] : [-1, 0], hops: [T.ok] })
    star(x, 'cancer', 700, standY(SZ, FEET), SZ, t, { mood: talk ? 'neutral' : 'squint', look: [-1, talk ? 0 : 0.4], hops: [T.talk] })
    star(x, 'pisces', 960, standY(140, FEET - 40), 140, t, { tears: 2, mood: 'sparkle', look: [-1, 0], box: false })
    say(x, t, 760, 1000, T.talk, D + 1, 'can we talk later?', { size: 30 })
    say(x, t, 340, 1060, T.ok, D + 1, 'of course.', { size: 30 })
    const sk = pop01(t, T.stars, 0.38, 2.1)
    stars(x, 540, 820, 180, t, { pop: sk, mood: t > T.l2 + 1.8 ? 'happy' : 'neutral', look: [0, 0.6], hops: [T.l1, T.l2, T.l2 + 0.7] })
  } },
]
function cam(t) {
  if (t < T.freeze) return { z: 1.55, fx: 560, fy: 1230, rot: 0.03 }
  const hit = [T.freeze, T.face, T.pis, T.stars].reduce((m, c) => (t >= c && t - c < 0.3 ? c : m), null)
  const k = hit === null ? 0 : 1 - ease.outCubic(prog(t, hit, hit + 0.3))
  if (t >= T.face && t < T.pis) return { z: 1.0 + 0.06 * (t - T.face) + 0.2 * k, fx: 540, fy: 1100 }
  const up = -230 * ease.inOutCubic(prog(t, T.stars, T.stars + 0.5))
  return { z: 1.38 + 0.14 * k, fx: 540, fy: 1260, dx: 50 * k, dy: up }
}
function ui(x, t) {
  if (t >= T.bar[0] && t < T.pis) {
    const p = ease.outCubic(prog(t, T.bar[0], T.bar[1])) * 0.97
    loadingBar(x, 540, 470, 760, p, 'processing "friend"…', { k: pop01(t, T.bar[0], 0.3, 2), sub: `${Math.round(p * 100)}%`, col: PINK })
  }
}
const E = makeAlmost({
  id: 'kare02', duration: D, ending: 'cut',
  hook: 'Introduced as… | my *friend*?', hookOut: [T.freeze - 0.2, T.freeze],
  shots, cam, ui,
  fx: [
    ['whipZoom', { at: 0.1, from: 1.45, blur: 14 }],
    ['recordScratch', { at: 0.6, len: 1.6, caption: 'the *“friend.”* hi.', sub: 'you’re probably wondering how I got here', top: 1640 }],
    ['caught', { at: 0.75, x: 775, y: 1410, r: 190, out: [2.1, 2.25], label: '', arrow: null, rec: false }],
  ],
  flash: t => [T.freeze, T.face, T.pis, T.stars].reduce((m, c) => Math.max(m, t >= c && t < c + 0.1 ? 0.5 * (1 - (t - c) / 0.1) : 0), 0),
  lines: [
    { t: T.l1, speaker: 'THE STARS', text: 'That sting is *real information.*' },
    { t: T.l2, speaker: 'THE STARS', text: 'Say how it *landed*. Then ask what they meant.' },
  ],
  cues: [
    ['whoosh', T.freeze - 0.1, 0.3, 0.03], ['pop', T.intro, 880, 0.035, -0.3], ['pop', T.hi, 1318.51, 0.03, 0.4], ['tick', T.droop, 0.05],
    ['whoosh', T.face - 0.08, 0.3, 0.035], ['boom', T.face, 0.15],
    ...Array.from({ length: 10 }, (_, i) => ['tick', T.bar[0] + i * 0.26, 0.03]), ['pop', T.bar[1], 1760, 0.04, 0],
    ['whoosh', T.pis - 0.08, 0.3, 0.035], ['pop', T.felt, 659.25, 0.035, 0], ['glitter', T.felt, T.felt + 0.5],
    ['whoosh', T.stars - 0.1, 0.3, 0.03], ['pop', T.stars + 0.1, 739.99, 0.035, 0],
    ['pop', T.talk, 880, 0.035, 0.3], ['pluck', T.ok, 1174.66, 0.04, 0.5, -0.3],
  ],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
