// ndbe14: DEALBREAKER OR NOT? E14, "They never ask | *one* question about you." (13 s vertical trial reel, cinematic · Em).
//   0.0–3.9   frame 0: a café table; ♊ Gemini mid-nod, the grey date (no sign) mid-paragraph. The date's bubbles stack:
//             "and THEN I…" · "anyway, MY week…" · "so I told my boss…". Gemini's "and me? I—" pops at 1.1, 1.9, 2.7 and
//             gets squashed each time. 3.2 Gemini's cocoa has gone cold (a sad little ice cube).
//   3.9 the vote · 6.1 the stamp: DEALBREAKER. + "ADDED TO MY DEALBREAKERS".
//   finale    the same table with ♎ Libra, chin on hand: "wait, how was YOUR week?" Gemini lights up, talking with its
//             hands. THE STARS: "Curiosity is how *care* sounds."
import { makeDeal, R, box, bubble, hearts, sparkles, table, floor, glow, drawStarChar, signStar, prog, lerp, ease, clamp, pop01, outK, INK, BONE, GOLD, PINK, T } from '../../ndbe01/scenes/dealkit.js'
import { mug } from '../../ndbe01/scenes/index.js'

const TALK = [[-1, 'and THEN I…', 720, 560], [0.6, 'anyway, MY week…', 760, 660], [1.5, 'so I told my boss…', 700, 460], [2.3, 'and ANOTHER thing…', 740, 760]]
const CUT = [1.1, 1.9, 2.7], COLD = 3.2
function squashed(x, t, cx, cy, t0, t1) {
  const k = pop01(t, t0, 0.2, 2.4), sq = ease.inCubic(prog(t, t0 + 0.4, t0 + 0.55))
  if (k <= 0.01 || t > t1) return
  x.save(); x.translate(cx, cy); x.scale(k * (1 + sq * 0.6), k * (1 - sq * 0.85)); x.globalAlpha *= 1 - prog(t, t0 + 0.55, t0 + 0.75)
  bubble(x, t, 0, 0, t0 - 1, t0 + 5, 'and me? I—', { size: 32, col: '#c9f2d4' })
  x.restore()
}
const EP = makeDeal({
  id: 'ndbe14', sign: 'gemini', date: 'grey', verdict: 'deal', accent: '#ffd23a', voteMood: 'neutral',
  hook: 'They never ask | *one* question about you.',
  last: 'Curiosity is how *care* sounds.',
  scene(x, t, S) {
    const { u, hero, date } = S
    floor(x, 1150, '#2c2244'); glow(x, 540, 880, 420, 0.12)
    hero(x, t, { x: 290, y: 870, s: 250, mood: u > COLD ? 'neutral' : u > CUT[0] ? 'squint' : 'happy', look: [1, 0], squash: u < CUT[0] ? 0.04 * Math.sin(u * 8) : 0, hops: CUT })
    date(x, t, { x: 790, y: 880, s: 240, mood: 'sparkle', look: [0.4, -0.6], hops: [-0.5, 0.2, 0.6, 1.0, 1.5, 1.9, 2.3, 2.7, 3.1] })
    table(x, 540, 1010, 720, { cloth: '#3a6a8a' })
    mug(x, t, 380, 990, 1.1, '#e8f0ff')
    if (u > COLD) { R(x, INK, 362, 940, 30, 30); R(x, '#cfe8ff', 366, 944, 22, 22); x.fillStyle = '#ffffff'; x.fillRect(368, 946, 8, 8) }
    TALK.forEach(([a, s, bx, by], i) => bubble(x, t, bx, by, a, 3.85, s, { size: 32, tail: 0.2 + 0.05 * i }))
    CUT.forEach(c => squashed(x, t, 300, 640, c, 3.85))
  },
  sceneCues: [...TALK.filter(a => a[0] >= 0).map((a, i) => ['pop', a[0], [523.25, 587.33, 523.25][i], 0.045, 0.3]), ...CUT.flatMap(c => [['pop', c, 1174.66, 0.04, -0.3], ['tick', c + 0.45, 0.06]]), ['pluck', COLD, 2093, 0.03, 0.4, -0.3]],
  pis: { x: 960, y: 1320, s: 130 },
  finale(x, t, S) {
    const { u, k, hero } = S
    floor(x, 1150, '#2c2244')
    if (k <= 0.01) return
    glow(x, 540, 880, 420, 0.18 * k)
    const lit = u > 1.4
    hero(x, t, { x: 300, y: 870, s: 250, pop: k, mood: lit ? 'sparkle' : 'neutral', look: [1, 0], squash: lit ? 0.05 * Math.sin(u * 10) : 0, hops: lit ? [T.stamp + 1.4, T.stamp + 1.8, T.stamp + 2.2, T.stamp + 2.6] : [] })
    drawStarChar(x, 780, 880, 230, t, { ...signStar('libra'), pop: k, mood: 'happy', look: [-1, 0], seed: 31, hops: [T.stamp + 0.7] })
    table(x, 540, 1010, 720, { cloth: '#3a6a8a' })
    mug(x, t, 380, 990, 1.1 * k); mug(x, t, 700, 990, 1.1 * k)
    bubble(x, t, 760, 640, T.stamp + 0.6, T.out[0], 'wait, how was YOUR week?', { size: 30, tail: 0.2 })
    sparkles(x, t, 300, 860, T.stamp + 1.4, 10, 160, 1, [GOLD, PINK, BONE])
    hearts(x, t, T.stamp + 1.6, 300, 760, { n: 4 })
  },
  finaleCues: [['pop', 0.6, 880, 0.04, 0.3], ['glitter', 1.4, 1.8], ['pluck', 1.45, 1318.51, 0.04, 0.5, -0.3]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [box, lerp, clamp, outK]
