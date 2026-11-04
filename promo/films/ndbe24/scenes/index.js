// ndbe24: DEALBREAKER OR NOT? E24, "They already bought | *matching mittens.*" (13 s vertical trial reel, dreamy · F).
//   0.0–3.9   frame 0: snow falling; ♓ Pisces mid-reveal, holding up two pairs of mittens (pink, and red with a little ♈
//             stitch), already teary. ♈ Aries freezes (1.0, "…already?"). 1.8 Aries pulls on a mitten. 2.6 Aries takes
//             Pisces' hand. 3.0 Pisces happy-sobs (fountains).
//   3.9 the vote · 6.1 the stamp: NOT A DEALBREAKER.
//   finale    the two walking hand in hand through the snow, mittens on, Pisces still crying happily; hearts.
//             THE STARS: "Warm hands, *warm* heart. Wear them."   (Pisces is the lead: it cries the whole film.)
import { makeDeal, R, box, bubble, label, hearts, sparkles, snowfall, snowGround, inSprite, tearsCells, drawBits, prog, lerp, ease, clamp, pop01, outK, INK, BONE, GOLD, PINK, T } from '../../ndbe01/scenes/dealkit.js'

const MITT = ['.MMM..', 'MMMM.M', 'MMMMMM', 'MMMMM.', 'MMMM..', 'CCCC..']
function mitten(x, cx, cy, col, cell = 9, rot = 0, glyph = false) {
  drawBits(x, MITT, { M: col, C: BONE }, cx, cy, cell, { rot })
  if (glyph) { x.save(); x.translate(cx, cy); x.rotate(rot); x.font = `700 ${cell * 2.4}px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD; x.fillText('♈︎', -cell * 0.6, -cell * 0.4); x.restore() }
}
const FREEZE = 1.0, ON = 1.8, HOLD = 2.6, SOB = 3.0
const EP = makeDeal({
  id: 'ndbe24', sign: 'pisces', date: 'aries', verdict: 'not', accent: '#ff8fb1', heroIsPisces: true,
  hook: 'They already bought | *matching mittens.*',
  last: 'Warm hands, *warm* heart. Wear them.',
  pis: { hide: true },
  scene(x, t, S) {
    const { u, hero, date, heroF } = S
    snowGround(x, 1150)
    const close = ease.inOutCubic(prog(u, HOLD - 0.3, HOLD))
    const px = lerp(330, 420, close), ax = lerp(780, 660, close)
    const ho = { x: px, y: 920, s: 250, mood: u > SOB ? 'happy' : 'sparkle', look: [1, 0], hops: [-0.2, 0.4, SOB, SOB + 0.4] }
    hero(x, t, ho); inSprite(x, heroF(t, ho), () => tearsCells(x, t, u > SOB ? 3 : 1))
    date(x, t, { x: ax, y: 930, s: 240, mood: u > HOLD ? 'happy' : u > FREEZE ? 'wide' : 'neutral', look: [-1, 0], hops: [ON, HOLD] })
    // held up: two pairs (pink pair stays with Pisces, the red ♈ pair goes to Aries)
    const lift = 8 * Math.sin(t * 5)
    mitten(x, px - 150, 760 + lift, '#ff8fb1', 9, -0.2); mitten(x, px - 90, 760 + lift, '#ff8fb1', 9, 0.1)
    const go = ease.inOutCubic(prog(u, ON - 0.4, ON))
    mitten(x, lerp(px + 110, ax + 120, go), lerp(740 + lift, 990, go), '#e8344e', 9, lerp(-0.1, 0.3, go), true)
    mitten(x, lerp(px + 170, ax - 130, go), lerp(740 + lift, 990, go), '#e8344e', 9, lerp(0.2, -0.3, go), true)
    bubble(x, t, 780, 680, FREEZE, ON + 0.3, '…already?', { size: 38, tail: 0 })
    if (u > HOLD) { const k = pop01(t, HOLD, 0.3, 2.4); drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff5c8a' }, 540, 990, 10 * k) }
    snowfall(x, t, { top: 380, bottom: 1150, n: 40 })
    hearts(x, t, SOB, 540, 760, { n: 6 })
    sparkles(x, t, 540, 990, HOLD, 10, 120, 1, [GOLD, PINK, BONE])
  },
  sceneCues: [['pop', 0.02, 1318.51, 0.03, -0.3], ['pop', FREEZE, 659.25, 0.045, 0.3], ['whoosh', ON - 0.4, 0.4, 0.025], ['pop', ON, 987.77, 0.04, 0.3], ['pluck', HOLD, 1174.66, 0.045, 0.6, 0], ['glitter', HOLD, HOLD + 0.4], ['pluck', SOB, 1567.98, 0.04, 0.5, -0.3]],
  finale(x, t, S) {
    const { u, k, hero, date, heroF } = S
    snowGround(x, 1150)
    snowfall(x, t, { top: 620, bottom: 1150, n: 34 })
    if (k <= 0.01) return
    const walk = 40 * Math.sin(u * 1.2)
    const hops = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5].map(v => v + T.stamp)
    const ho = { x: 400 + walk, y: 930, s: 240, pop: k, mood: 'happy', look: [1, 0], hops }
    hero(x, t, ho); inSprite(x, heroF(t, ho), () => tearsCells(x, t, 3))
    date(x, t, { x: 680 + walk, y: 935, s: 235, pop: k, mood: u > 1.2 ? 'heart' : 'happy', look: [-1, 0], hops: hops.map(h => h + 0.12) })
    mitten(x, 540 + walk, 1000, '#ff8fb1', 9 * k, 0.2); mitten(x, 560 + walk, 1010, '#e8344e', 9 * k, -0.2, true)
    hearts(x, t, T.stamp + 1.2, 540 + walk, 820, { n: 6 })
    void [box, label, clamp, outK, R]
  },
  finaleCues: [['pluck', 1.2, 1174.66, 0.04, 0.5, 0], ['pluck', 1.32, 1567.98, 0.035, 0.5, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
