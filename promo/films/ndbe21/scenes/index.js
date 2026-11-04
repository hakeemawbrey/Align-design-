// ndbe21: DEALBREAKER OR NOT? E21, "They laugh | *really* loud." (15 s vertical trial reel, music: pop · F).
//   0.0–3.9   frame 0: a hushed little café; ♐ Sagittarius mid-cackle, giant HA HA HA letters bursting out, cups
//             rattling on the table. 1.2 two other customers turn around. 1.8 ♍ Virgo shrinks in its seat ("shh…")…
//             2.7 Virgo starts laughing at Sag laughing; 3.2 the customers smile too.
//   3.9 the vote · 6.1 the stamp: NOT A DEALBREAKER.
//   finale    the whole café laughing together, HA letters in four colours; hearts.
//             THE STARS: "A big laugh is a *big* welcome."
import { makeDeal, R, box, bubble, label, hearts, table, floor, glow, drawStarChar, prog, lerp, ease, clamp, pop01, outK, INK, BONE, GOLD, PINK, SKYB, T } from '../../ndbe01/scenes/dealkit.js'
import { mug } from '../../ndbe01/scenes/index.js'

function haBurst(x, t, t0, cx, cy, col, n = 3, big = 1) {
  for (let i = 0; i < n; i++) {
    const a = t0 + i * 0.22, k = pop01(t, a, 0.2, 3)
    if (k <= 0.01) continue
    const ph = ((t - a) % 0.66) / 0.66
    label(x, 'HA', cx + Math.cos(i * 2.1) * 120 * big, cy - i * 70 * big - 20 * ph, { size: (60 + 10 * i) * big * k, col, font: 'Inter, sans-serif', weight: 800, rot: 0.25 * Math.sin(i * 3 + t * 6) })
  }
}
const TURN = 1.2, SHH = 1.8, JOIN = 2.7, SMILE = 3.2
const EP = makeDeal({
  id: 'ndbe21', sign: 'sagittarius', date: 'virgo', verdict: 'not', accent: '#c9a6ff',
  hook: 'They laugh | *really* loud.',
  last: 'A big laugh is a *big* welcome.',
  scene(x, t, S) {
    const { u, hero, date } = S
    floor(x, 1150, '#30234a'); glow(x, 540, 880, 420, 0.12)
    for (const [px, c, s] of [[130, '#7a6aa0', 1], [960, '#6a8ab0', 2]]) drawStarChar(x, px, 700, 140, t, { color: c, seed: 60 + s, glow: 0.4, mood: u > SMILE ? 'happy' : u > TURN ? 'wide' : 'neutral', look: u > TURN ? [px < 540 ? 1 : -1, 0.5] : [px < 540 ? -1 : 1, 0], hops: [TURN, SMILE] })
    const shake = 0.06 * Math.abs(Math.sin(t * 22))
    hero(x, t, { x: 320, y: 900, s: 260, mood: 'happy', look: [0, -1], squash: shake, hops: [0.3, 0.75, 1.2, 1.65, 2.1, 2.55, 3.0, 3.45] })
    const shrink = u > SHH && u < JOIN ? 0.75 : 1
    date(x, t, { x: 780, y: 920 + (1 - shrink) * 80, s: 240 * shrink, mood: u > JOIN ? 'happy' : u > SHH ? 'squint' : 'wide', look: u > JOIN ? [-1, 0] : [-1, 0], squash: u > JOIN ? shake : 0, hops: [SHH, JOIN, JOIN + 0.35] })
    table(x, 540, 1010, 720, { cloth: '#4a6a8a' })
    const rat = 4 * Math.sin(t * 40)
    mug(x, t, 430 + rat, 990, 1.1); mug(x, t, 660 - rat, 990, 1.1)
    haBurst(x, t, -0.8, 330, 730, GOLD, 4)
    bubble(x, t, 790, 640, SHH, JOIN, 'shh…', { size: 36, tail: 0 })
    if (u > JOIN) haBurst(x, t, JOIN, 790, 680, '#9fe6b0', 3, 0.8)
  },
  sceneCues: [...[0.0, 0.22, 0.44, 0.66].map((v, i) => ['pop', v + 0.01, [1174.66, 1318.51, 1567.98, 1760][i], 0.04, -0.3]), ['tick', TURN, 0.05], ['pop', SHH, 523.25, 0.035, 0.3], ...[JOIN, JOIN + 0.22, JOIN + 0.44].map((v, i) => ['pop', v, [1318.51, 1567.98, 1760][i], 0.04, 0.3]), ['pluck', SMILE, 1174.66, 0.035, 0.5, 0]],
  pis: { x: 960, y: 1320, s: 130 },
  finale(x, t, S) {
    const { u, k, hero, date } = S
    floor(x, 1150, '#30234a')
    if (k <= 0.01) return
    glow(x, 540, 880, 460, 0.2 * k)
    const shake = 0.06 * Math.abs(Math.sin(t * 22))
    for (const [px, c, s] of [[130, '#7a6aa0', 1], [960, '#6a8ab0', 2]]) drawStarChar(x, px, 720, 140, t, { color: c, seed: 60 + s, glow: 0.4, pop: k, mood: 'happy', squash: shake, look: [px < 540 ? 1 : -1, 0.5] })
    hero(x, t, { x: 330, y: 900, s: 250, pop: k, mood: 'happy', squash: shake, look: [1, 0], hops: [T.stamp + 0.6, T.stamp + 1.4, T.stamp + 2.2] })
    date(x, t, { x: 760, y: 910, s: 240, pop: k, mood: 'happy', squash: shake, look: [-1, 0], hops: [T.stamp + 1.0, T.stamp + 1.8] })
    table(x, 540, 1010, 720, { cloth: '#4a6a8a' })
    haBurst(x, t, T.stamp + 0.5, 330, 680, GOLD, 2, 0.8)
    haBurst(x, t, T.stamp + 0.8, 760, 690, '#9fe6b0', 2, 0.8)
    hearts(x, t, T.stamp + 1.5, 540, 800, { n: 5 })
    void [PINK, SKYB]
  },
  finaleCues: [['pop', 0.5, 1318.51, 0.04, -0.3], ['pop', 0.8, 1567.98, 0.04, 0.3], ['pluck', 1.5, 1174.66, 0.04, 0.5, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [box, lerp, ease, clamp, outK]
