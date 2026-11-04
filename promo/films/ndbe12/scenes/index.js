// ndbe12: DEALBREAKER OR NOT? E12, "They cried at | the *trailer.*" (13 s vertical trial reel, music: dreamy · Db).
//   0.0–3.9   frame 0: a dark cinema; ♓ Pisces mid-sob in a red seat, popcorn flying, the screen glowing. On screen:
//             two pixel ducks waddle toward each other and reunite (1.4, a heart pops). Pisces fountains. 2.2 ♍ Virgo
//             hands over a tissue, deadpan… 3.0 Virgo sniffles too.
//   3.9 the vote · 6.1 the stamp: NOT A DEALBREAKER.
//   finale    both happy-crying, sharing one tissue box, the ducks waddling together on screen; hearts.
//             THE STARS: "Soft hearts are *strong* hearts."   (Pisces is the lead: it cries the whole film.)
import { makeDeal, R, box, hearts, sparkles, floor, glow, tissues, tearsCells, inSprite, drawBits, prog, lerp, ease, clamp, pop01, outK, INK, BONE, GOLD, PINK, T } from '../../ndbe01/scenes/dealkit.js'

const DUCK = ['..YY..', '.YYKY.', '.YYYYO', 'YYYYY.', 'YYYYY.', '.YYY..', '.O.O..']
function screen(x, t, u, k = 1, cy = 560) {
  x.save(); x.translate(540, cy); x.scale(k, k)
  glow(x, 0, 60, 520, 0.2, '200,220,255')
  box(x, -400, -160, 800, 320, '#0d1b3a', { b: 8 })
  R(x, '#2a4a8a', -392, 40, 784, 112)
  const meet = ease.inOutCubic(clamp(u / 1.4))
  drawBits(x, DUCK, { Y: '#ffd23a', K: INK, O: '#ff8a3a' }, lerp(-300, -46, meet), 30, 12)
  drawBits(x, DUCK, { Y: '#ffe68a', K: INK, O: '#ff8a3a' }, lerp(300, 46, meet), 30, 12, { sx: -1 })
  if (u > 1.4) drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff5c8a' }, 0, -70 - 10 * Math.sin(t * 4), 10 * pop01(u, 1.4, 0.3, 2.4))
  x.restore()
}
function seats(x) { for (let i = 0; i < 4; i++) { box(x, 120 + i * 220, 1010, 180, 140, '#b8283f', { b: 6, hi: '#d84a5f' }) } }
const DUCKS = 1.4, HAND = 2.2, SNIFF = 3.0
const EP = makeDeal({
  id: 'ndbe12', sign: 'pisces', date: 'virgo', verdict: 'not', accent: '#8fe3ff', heroIsPisces: true, voteMood: 'wide',
  hook: 'They cried at | the *trailer.*',
  last: 'Soft hearts are *strong* hearts.',
  pis: { hide: true },
  scene(x, t, S) {
    const { u, hero, date, heroF, dateF } = S
    R(x, '#0a0718', 0, 380, 1080, 1040)
    screen(x, t, u)
    seats(x)
    const ho = { x: 380, y: 920, s: 250, mood: u > DUCKS ? 'happy' : 'wide', look: [0.4, -1], hops: [0.2, DUCKS, DUCKS + 0.4] }
    hero(x, t, ho); inSprite(x, heroF(t, ho), () => tearsCells(x, t, u > DUCKS ? 3 : 2))
    const dO = { x: 740, y: 930, s: 230, mood: u > SNIFF ? 'happy' : 'neutral', look: u > HAND && u < SNIFF ? [-1, 0] : [0, -1], hops: [HAND, SNIFF] }
    date(x, t, dO); if (u > SNIFF) inSprite(x, dateF(t, dO), () => tearsCells(x, t, 1))
    // popcorn flying
    for (let i = 0; i < 10; i++) { const p = ((u + 0.6) * 0.9 + i / 10) % 1; const a = -Math.PI / 2 + (i - 5) * 0.2; R(x, '#fff1c8', 380 + Math.cos(a) * p * 260, 860 + Math.sin(a) * p * 300 + 400 * p * p, 14, 14) }
    box(x, 250, 980, 70, 80, '#e8344e', { b: 5 }); R(x, BONE, 262, 980, 12, 80); R(x, BONE, 294, 980, 12, 80)
    // the tissue hand-off
    if (u > HAND) { const p = ease.outCubic(prog(u, HAND, HAND + 0.4)); R(x, INK, lerp(660, 490, p) - 22, 820 - 22, 44, 44); R(x, '#ffffff', lerp(660, 490, p) - 18, 820 - 18, 36, 36) }
    hearts(x, t, DUCKS, 540, 500, { n: 5 })
  },
  sceneCues: [['pop', DUCKS, 1318.51, 0.045, 0], ['pluck', DUCKS + 0.05, 1567.98, 0.04, 0.6, 0], ['whoosh', HAND, 0.3, 0.025], ['pop', SNIFF, 880, 0.035, 0.3]],
  finale(x, t, S) {
    const { u, k, hero, date, heroF, dateF } = S
    R(x, '#0a0718', 0, 380, 1080, 1040 * (k > 0 ? 1 : 0))
    if (k <= 0.01) return
    screen(x, t, 2 + u, 0.7 * k, 640)
    seats(x)
    const ho = { x: 380, y: 920, s: 240, pop: k, mood: 'happy', look: [1, 0], hops: [T.stamp + 1.0, T.stamp + 2.0] }
    hero(x, t, ho); inSprite(x, heroF(t, ho), () => tearsCells(x, t, 3))
    const dO = { x: 730, y: 930, s: 230, pop: k, mood: 'happy', look: [-1, 0], hops: [T.stamp + 1.4] }
    date(x, t, dO); inSprite(x, dateF(t, dO), () => tearsCells(x, t, 2))
    tissues(x, 555, 1000, 110 * k)
    hearts(x, t, T.stamp + 1.0, 555, 850, { n: 6 })
    sparkles(x, t, 555, 960, T.stamp + 0.9, 8, 90, 1, [GOLD, PINK, BONE])
  },
  finaleCues: [['pluck', 1.0, 1174.66, 0.04, 0.5, 0], ['glitter', 0.9, 1.3]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [outK]
