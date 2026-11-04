// ndbe15: DEALBREAKER OR NOT? E15, "They make fun of | what *you* love." (13 s vertical trial reel, music: screwed · Gm).
//   0.0–3.9   frame 0: ♋ Cancer mid-hug of a tiny knitted frog it made, beaming, knitting needles in a basket.
//             1.0 the grey date (no sign): "you KNIT?? that's so lame." 1.6 HA HA HA. 2.4 the frog droops; Cancer's
//             smile fades.
//   3.9 the vote · 6.1 the stamp: DEALBREAKER. + "ADDED TO MY DEALBREAKERS".
//   finale    Cancer with ♉ Taurus and ♍ Virgo, who hold up the frog: "why frogs?" — Cancer: "they look so happy!" —
//             everyone grins, the frog perks back up. THE STARS: "Find someone who asks *why* you love it."
import { makeDeal, R, box, bubble, label, hearts, sparkles, floor, glow, drawBits, drawStarChar, signStar, prog, lerp, ease, clamp, pop01, outK, INK, BONE, GOLD, PINK, T } from '../../ndbe01/scenes/dealkit.js'

function frog(x, cx, cy, cell, droop = 0) {
  drawBits(x, ['.WK.KW.', 'GGGGGGG', 'GGPPPGG', 'GGGGGGG', '.GG.GG.'], { G: '#5fd38a', W: '#ffffff', K: INK, P: '#ff8fb1' }, cx, cy + droop * 10, cell, { rot: droop * 0.5, sy: 1 - droop * 0.25 })
}
function basket(x, cx, cy) { box(x, cx - 80, cy - 50, 160, 70, '#c49a5a', { b: 5 }); for (let i = 0; i < 4; i++) R(x, '#a07a40', cx - 70 + i * 40, cy - 46, 8, 62); R(x, '#ff8fb1', cx - 40, cy - 80, 50, 40); R(x, INK, cx + 10, cy - 130, 8, 90); R(x, INK, cx + 30, cy - 120, 8, 80) }
const SAY = 1.0, LAUGH = [1.6, 1.85, 2.1], DROOP = 2.4
const EP = makeDeal({
  id: 'ndbe15', sign: 'cancer', date: 'grey', verdict: 'deal', accent: '#9fe6b0', voteMood: 'neutral',
  hook: 'They make fun of | what *you* love.',
  last: 'Find someone who asks *why* you love it.',
  scene(x, t, S) {
    const { u, hero, date } = S
    floor(x, 1150, '#30234a'); glow(x, 380, 900, 360, 0.16 * (1 - 0.6 * prog(u, DROOP, DROOP + 0.3)))
    hero(x, t, { x: 360, y: 900, s: 260, mood: u > DROOP ? 'neutral' : 'happy', look: u > SAY ? [1, 0] : [0, 0.5], squash: u < SAY ? 0.04 * Math.sin(u * 6) : 0, hops: [0.4, DROOP] })
    frog(x, 380, 1010, 14, clamp(prog(u, DROOP, DROOP + 0.4)))
    basket(x, 160, 1140)
    date(x, t, { x: 800, y: 910, s: 240, mood: u > LAUGH[0] && u < 3.3 ? 'happy' : 'squint', look: [-1, 0.3], hops: [SAY, ...LAUGH] })
    bubble(x, t, 760, 650, SAY, 3.85, "you KNIT?? that's so lame.", { size: 32, tail: 0.2 })
    LAUGH.forEach((l, i) => { const k = pop01(t, l, 0.2, 3) * outK(t, [3.3, 3.5]); if (k > 0.01) label(x, 'HA', 860 + i * 55, 780 - i * 45, { size: 46 * k, col: '#cfc8e8', font: 'Inter, sans-serif', weight: 800, rot: (i - 1) * 0.2 }) })
    label(x, '…oh.', 360, 660, { size: 46, col: BONE, alpha: prog(u, DROOP + 0.3, DROOP + 0.5) })
  },
  sceneCues: [['pop', SAY, 659.25, 0.045, 0.3], ...LAUGH.map((l, i) => ['pop', l, [523.25, 587.33, 523.25][i], 0.04, 0.4]), ['pluck', DROOP, 293.66, 0.04, 0.8, -0.3]],
  pis: { x: 960, y: 1320, s: 130 },
  finale(x, t, S) {
    const { u, k, hero } = S
    floor(x, 1150, '#30234a')
    if (k <= 0.01) return
    glow(x, 540, 900, 460, 0.2 * k)
    drawStarChar(x, 200, 930, 210, t, { ...signStar('taurus'), pop: k, mood: u > 1.8 ? 'happy' : 'sparkle', look: [1, 0], seed: 41, hops: [T.stamp + 0.7] })
    hero(x, t, { x: 520, y: 910, s: 240, pop: k, mood: u > 1.4 ? 'sparkle' : 'happy', look: [0, 0], hops: [T.stamp + 1.4, T.stamp + 1.8] })
    drawStarChar(x, 850, 930, 210, t, { ...signStar('virgo'), pop: k, mood: 'happy', look: [-1, 0], seed: 42, hops: [T.stamp + 1.9] })
    frog(x, 540, lerp(1020, 800, ease.outCubic(prog(u, 0.4, 0.8))), 14 * k, 0)
    bubble(x, t, 230, 690, T.stamp + 0.7, T.out[0], 'why frogs?', { size: 34, tail: 0.1 })
    bubble(x, t, 780, 700, T.stamp + 1.4, T.out[0], 'they look so happy!', { size: 32, tail: -0.3 })
    hearts(x, t, T.stamp + 1.9, 540, 700, { n: 5 })
    sparkles(x, t, 540, 760, T.stamp + 0.8, 8, 100, 1, ['#5fd38a', GOLD, BONE])
  },
  finaleCues: [['pop', 0.7, 880, 0.04, -0.3], ['pop', 1.4, 1174.66, 0.04, 0.3], ['pluck', 1.9, 1567.98, 0.04, 0.5, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK]
