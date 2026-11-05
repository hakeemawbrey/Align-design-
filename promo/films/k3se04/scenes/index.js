// k3se04: 3-SECOND ADVICE · "Are We Dating?" (6.9 s vertical trial reel, music: jazzy · Bb). Format: k3se01/threekit.js.
//   0.00  frame 0: ♋ Cancer on a couch, mid-squeeze of a giant pixel "?", hearts spurting out of it.
//         Hook: "Are we dating? | *Nobody* knows."  Pisces sniffles in the corner.
//   0.50  record scratch: freeze frame ("ok. 3 seconds.").   0.95–2.45  3 · 2 · 1.
//   2.45  THE STARS: "Ask. A clear answer | beats *a year of maybe.*"  The "?" pops into a speech bubble: "can we talk
//         about us?"; ♑ the date slides onto the couch.
//   5.70  the date: "yes. I’d really like that."  Cancer melts, hearts. Hard cut at 6.9.
import { makeThree, R, box, bubble, shadow, drawBits, heartLoop, hearts, sparkles, lerp, prog, ease, clamp, INK, BONE, LAV, PINK } from '../../k3se01/threekit.js'

const Q = ['.XXXXX.', 'XXXXXXX', 'XX...XX', '.....XX', '...XXXX', '...XXX.', '...XX..', '.......', '...XX..', '...XX..']
function couch(x) {
  R(x, '#211a3a', 0, 1150, 1080, 120); R(x, '#2e2650', 0, 1150, 1080, 10)
  box(x, 150, 900, 780, 150, '#8a4f7a', { b: 7, hi: '#a8689a' })
  box(x, 130, 1020, 820, 110, '#9c5a8a', { b: 7, hi: '#b8709f' })
  box(x, 110, 960, 70, 170, '#7a4068', { b: 7 }); box(x, 900, 960, 70, 170, '#7a4068', { b: 7 })
  R(x, INK, 170, 1130, 20, 24); R(x, INK, 890, 1130, 20, 24)
}
function qmark(x, t, cx, cy, k, squeeze) {
  if (k <= 0.01) return
  const sq = squeeze ? 0.12 * Math.sin(t * 30) : 0
  drawBits(x, Q, { X: LAV }, cx, cy, 44 * k, { sx: 1 + sq, sy: 1 - sq, rot: squeeze ? 0.08 * Math.sin(t * 15) : 0 })
}

function scene(x, t, S) {
  const { phase, u, hero, star } = S
  couch(x)
  if (phase === 'hook') {
    qmark(x, t, 710, 760, 1, true)
    heartLoop(x, t, 690, 700, { n: 7, rate: 1.4, spread: 360, rise: 300, cell: 7 })
    hero(x, t, { x: 400, y: 920, s: 330, mood: 'heart', look: [1, -0.3], squash: 0.1 + 0.06 * Math.sin(t * 30) })
    return
  }
  const qk = 1 - clamp(prog(u, 0.15, 0.4))
  qmark(x, t, 710, 760, qk * (1 + 0.15 * Math.sin(u * 30) * (1 - prog(u, 0, 0.15))), false)
  sparkles(x, t, 690, 820, 2.45 + 0.38, 10, 200, 1, [LAV, BONE, PINK])
  // the date slides onto the couch
  const dk = ease.outCubic(prog(u, 1.2, 1.7))
  if (dk > 0) {
    shadow(x, lerp(1200, 760, dk), 1150, 220)
    star(x, t, 'capricorn', { x: lerp(1200, 760, dk), y: 940, s: 250, mood: u < 3.2 ? 'neutral' : 'happy', look: [-1, 0], seed: 7, hops: [2.45 + 1.7, 2.45 + 3.25] })
  }
  const melt = u > 3.4
  hero(x, t, { x: 380, y: 930, s: 280, mood: melt ? 'heart' : u < 0.5 ? 'wide' : 'neutral', look: [1, 0], blush: u > 0.5 ? 1 : 0, hops: [2.45 + 0.5, 2.45 + 3.4], squash: melt ? 0.06 : 0 })
  bubble(x, t, 430, 650, 2.45 + 0.5, 2.45 + 3.1, 'can we talk about us?', { size: 38, tail: -0.3 })
  bubble(x, t, 660, 650, 2.45 + 3.2, 99, 'yes. I’d really like that.', { size: 38, tail: 0.4, col: '#ffe2ec' })
  if (melt) hearts(x, t, 2.45 + 3.4, 380, 760, { n: 6, cell: 7 })
}

const EP = makeThree({
  id: 'k3se04', sign: 'cancer', dur: 6.9, brk: 'freeze', ending: 'cut', focus: [600, 830],
  hook: 'Are we dating? | *Nobody* knows.', accent: '#ff9fc4',
  advice: 'Ask. A clear answer | beats *a year of maybe.*',
  scene,
  cues: [
    ['pop', 2.8, 1567.98, 0.04, 0], ['glitter', 2.82, 3.2], ['pop', 2.97, 880, 0.035, -0.3], ['whoosh', 3.6, 0.45, 0.03], ['tom', 4.15, 110, { gain: 0.18, decay: 0.2 }],
    ['pop', 5.65, 1174.66, 0.04, 0.3], ['pluck', 5.85, 1318.51, 0.035, -0.2, 0.4], ['pluck', 5.97, 1567.98, 0.035, -0.2, 0.4], ['glitter', 5.85, 6.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
