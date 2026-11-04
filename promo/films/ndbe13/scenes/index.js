// ndbe13: DEALBREAKER OR NOT? E13, "They wear the | *same sweater* every date." (15 s vertical trial reel, funk · G).
//   0.0–3.9   frame 0: ♉ Taurus mid-twirl in a cosy striped sweater, a "DATE 1" stamp (café). 0.8 "DATE 2" (the park,
//             same sweater), 1.6 "DATE 3" (the snow, same sweater). 2.4 ♒ Aquarius arrives… in a matching sweater.
//             3.0 Taurus: heart eyes.
//   3.9 the vote · 6.1 the stamp: NOT A DEALBREAKER.
//   finale    the two in matching sweaters side by side, swaying, snow; hearts.
//             THE STARS: "Cozy and consistent? *Keep* them."
import { makeDeal, R, box, label, hearts, sparkles, snowfall, snowGround, floor, glow, inSprite, prog, lerp, ease, clamp, pop01, outK, INK, BONE, GOLD, PINK, T } from '../../ndbe01/scenes/dealkit.js'

export function sweater(x, F, a = '#e8344e', b = BONE) {
  inSprite(x, F, () => {
    for (let j = 0; j < 6; j++) { const w = 14 - Math.max(0, j - 3) * 2, x0 = 18 - w / 2; x.fillStyle = INK; x.fillRect(x0 - 0.4, 26.5 + j - 0.2, w + 0.8, 1.4); x.fillStyle = j % 3 === 1 ? b : a; x.fillRect(x0, 26.5 + j, w, 1) }
    x.fillStyle = INK; x.fillRect(14.6, 25.9, 6.8, 1.2); x.fillStyle = b; x.fillRect(15, 26.1, 6, 0.8)
  })
}
const DATES = [[-1, 'DATE 1', '#5a3a4f'], [0.8, 'DATE 2', '#2f4a3a'], [1.6, 'DATE 3', 'snow']], ARR = 2.4, MELT = 3.0
const EP = makeDeal({
  id: 'ndbe13', sign: 'taurus', date: 'aquarius', verdict: 'not', accent: '#ff8fa0',
  hook: 'They wear the | *same sweater* every date.',
  last: 'Cozy and consistent? *Keep* them.',
  scene(x, t, S) {
    const { u, hero, date, heroF, dateF } = S
    const di = u < 0.8 ? 0 : u < 1.6 ? 1 : 2
    const bg = DATES[di][2]
    if (bg === 'snow') { snowGround(x, 1150); snowfall(x, t, { top: 420, bottom: 1150, n: 30 }) } else { floor(x, 1150, bg); glow(x, 540, 900, 420, 0.12) }
    if (di === 1) for (const tx of [150, 930]) { R(x, INK, tx - 14, 760, 28, 390); R(x, '#5a3a28', tx - 8, 760, 16, 390); R(x, '#3fcf7a', tx - 80, 640, 160, 140) }
    if (di === 0) { box(x, 760, 980, 220, 20, '#8a5a3c', { b: 5 }); R(x, INK, 862, 1000, 16, 150) }
    const hx = u < ARR ? 540 : lerp(540, 360, ease.inOutCubic(prog(u, ARR, ARR + 0.4)))
    const ho = { x: hx, y: 930, s: 260, mood: u > MELT ? 'heart' : 'sparkle', look: u > ARR ? [1, 0] : [0, 0], squash: u < ARR ? 0.05 * Math.sin(u * 9) : 0, hops: [DATES[1][0], DATES[2][0], MELT] }
    hero(x, t, ho); sweater(x, heroF(t, ho))
    DATES.forEach(([a, s], i) => { const k = pop01(t, a, 0.2, 3) * outK(t, [(DATES[i + 1] || [ARR])[0] - 0.05, (DATES[i + 1] || [ARR])[0] + 0.05]); if (k > 0.01) label(x, s, 540, 620, { size: 72 * k, col: GOLD, font: 'Inter, sans-serif', weight: 800, rot: -0.08 }) })
    if (u > ARR) {
      const ax = lerp(1250, 760, ease.outCubic(prog(u, ARR, ARR + 0.4)))
      const dO = { x: ax, y: 935, s: 250, mood: 'happy', look: [-1, 0], hops: [ARR + 0.4, MELT + 0.1] }
      date(x, t, dO); sweater(x, dateF(t, dO))
      label(x, 'SAME!', 560, 640, { size: 64, col: PINK, font: 'Inter, sans-serif', weight: 800, alpha: clamp(prog(u, ARR + 0.45, ARR + 0.55)), rot: 0.06 })
    }
    hearts(x, t, MELT, 400, 760, { n: 5 })
  },
  sceneCues: [['pop', 0.8, 880, 0.05, 0], ['tick', 0.8, 0.06], ['pop', 1.6, 987.77, 0.05, 0], ['tick', 1.6, 0.06], ['whoosh', ARR, 0.35, 0.03], ['pop', ARR + 0.45, 1318.51, 0.05, 0.2], ['pluck', MELT, 1567.98, 0.04, 0.5, -0.3]],
  pis: { x: 960, y: 1320, s: 130 },
  finale(x, t, S) {
    const { u, k, hero, date, heroF, dateF } = S
    snowGround(x, 1150); snowfall(x, t, { top: 620, bottom: 1150, n: 30 })
    if (k <= 0.01) return
    const sway = 0.04 * Math.sin(u * 4)
    const ho = { x: 380, y: 930, s: 250, pop: k, mood: 'happy', look: [1, 0], squash: sway, hops: [T.stamp + 1.4] }
    hero(x, t, ho); sweater(x, heroF(t, ho))
    const dO = { x: 700, y: 935, s: 245, pop: k, mood: 'heart', look: [-1, 0], squash: -sway, hops: [T.stamp + 1.4] }
    date(x, t, dO); sweater(x, dateF(t, dO))
    hearts(x, t, T.stamp + 1.4, 540, 800, { n: 6 })
    sparkles(x, t, 540, 900, T.stamp + 1.4, 8, 160, 1, [GOLD, PINK, BONE])
  },
  finaleCues: [['pluck', 1.4, 1174.66, 0.04, 0.5, 0], ['glitter', 1.4, 1.8]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
