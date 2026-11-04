// nhve14: THEN vs NOW: HOLIDAYS, "The holiday gift in 2016 / 2026" (20 s, b18 #14, music: lofi · Eb)
// Look and props: ../../nhve01/scenes/thennow.js + holkit.js.
//   0–6.71    2016 (old-phone grade, "12·23·2016"): ♊ Gemini drags a teddy bear three times its size through the
//             snow at t = 0 ("1 MONTH IN"). ♏ Scorpio opens the door; the bear jams in the doorway: "it… doesn't fit."
//             Gemini: "it's a… bear?" ♓ Pisces in the window cries at how big and soft it is.
//   6.71      the card cut; the year sticker flips to 2026.
//   6.71–12.8 2026, by the tree: a tiny box. Inside: the pen Scorpio always borrows, engraved. Scorpio: "the pen I
//             always borrow?" Gemini: "now you can stop giving it back." Hearts; Pisces happy-sobs.
//   12.8–15.6 THE STARS: "the best gifts say *I heard you.*"  Last line: "Small gift. *Big* listening."
import {
  makeThenNow, drawStarChar, signStar, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs,
  pop01, outK, r3, INK, BONE, GOLD, PINK, SW, SH, lerp, prog, ease, R, clamp,
} from '../../nhve01/scenes/thennow.js'
import { room, stringLights, sign, beanie, scarf, mark, couch, gift, tree, door, nightSky, snowGround, snowfall, RED, GREEN, CREAM } from '../../nhve01/scenes/holkit.js'

const GEM = signStar('gemini'), SCO = signStar('scorpio')
const BEAR = [
  '.BB.....BB.', 'BDDB...BDDB', 'BDBBBBBBBDB', '.BBBBBBBBB.', 'BBBWBBBWBBB', 'BBBKBBBKBBB', 'BBBBBMBBBBB', 'BBBBMKMBBBB',
  '.BBBBBBBBB.', '..BBBRBBB..', '.BBBRRRBBB.', 'BBBBBRBBBBB', 'BBDDDDDDDBB', 'BBDDDDDDDBB', 'BBBDDDDDBBB', '.BBB...BBB.',
]
const BC = { B: '#b07040', D: '#d9a070', W: '#ffffff', K: '#1b1236', M: '#f2c7a0', R: '#e0453a' }

// ── THEN: 2016
const A = { ring: 2.1, open: 2.6, jam: 3.2, fit: 3.55, bear: 4.6, sob: 4.2 }
function sceneA(x, t) {
  nightSky(x, t)
  // the house front
  R(x, INK, 420, 160, 480, 600); R(x, '#8a5a4a', 426, 166, 474, 594)
  R(x, INK, 760, 260, 120, 120); R(x, '#ffd88a', 766, 266, 108, 108)
  pisces(x, t, 820, 320, 90, t > A.sob ? 3 : 1, { mood: t > A.sob ? 'sparkle' : 'neutral', look: [-1, 1], seed: 6 })
  door(x, 700, 760, { w: 200, h: 380, open: ease.outCubic(prog(t, A.open - 0.1, A.open + 0.2)) * 0.9 })
  snowGround(x, 760)
  // ♏ Scorpio in the doorway
  // the bear: dragged, then jammed in the door
  const dk = ease.inOutCubic(prog(t, 0, 2.0)), jk = ease.outBack ? 0 : 0
  const bx = t < A.jam ? lerp(60, 380, dk) : lerp(380, 450, ease.outCubic(prog(t, A.jam, A.jam + 0.25)))
  const squish = t > A.jam ? 0.18 * Math.exp(-(t - A.jam) * 4) * Math.cos((t - A.jam) * 30) : 0
  drawBits(x, BEAR, BC, bx, 600, 36, { rot: t < A.jam ? 0.08 * Math.sin(t * 6) : 0, sx: 1 - squish, sy: 1 + squish })
  if (t > A.open) drawStarChar(x, 740, 620, 170, t, { color: SCO.color, glyph: SCO.glyph, mood: t > A.jam + 0.1 ? 'wide' : 'happy', look: [-1, 0], seed: 9, hops: [A.open + 0.1, A.fit] })
  // ♊ Gemini dragging
  const gx = t < A.jam ? bx - 230 : 150 + 0 * bx
  const gH = [0.5, 1.0, 1.5, A.ring, A.bear]
  drawStarChar(x, gx < 0 ? gx + 260 : gx + (t < A.jam ? 0 : 0), 860, 190, t, { color: GEM.color, glyph: GEM.glyph, mood: t > A.bear ? 'wink' : t > A.jam ? 'wide' : 'squint', look: [1, -1], seed: 5, hops: gH, squash: t < 2 ? 0.08 : 0 })
  bangs(x, starFrame(gx < 0 ? gx + 260 : gx, 860, 190, t, { hops: gH, seed: 5, squash: t < 2 ? 0.08 : 0 }))
  sign(x, 220, 160, '1 MONTH IN', { size: 36, col: '#fff3c8', rot: -0.05 })
  speech(x, t, 700, 400, A.fit, 'it… doesn’t fit.', { size: 36, tail: 0, life: 1.1, col: '#fffaf0' })
  speech(x, t, 240, 620, A.bear, 'it’s a… bear?', { size: 38, tail: -1, life: 1.5, col: '#ffe36a' })
  if (t > A.ring - 0.05 && t < A.ring + 0.5) sign(x, 470, 520, 'DING', { size: 28, col: '#fffaf0', k: pop01(t, A.ring, 0.2, 3) })
  snowfall(x, t, { n: 26, seed: 4 })
}

// ── NOW: 2026
const B = { hand: 7.1, open: [7.8, 8.4], pen: 8.55, back: 9.75, hug: 11.0 }
function sceneB(x, t) {
  room(x, t, { now: true })
  stringLights(x, t, 24, 18)
  tree(x, t, 760, 640, 420, { now: true })
  couch(x, 400, 1020, 560, { col: '#7a5cc0' })
  pisces(x, t, 820, 860, 110, t > B.hug ? 3 : 2, { mood: t > B.hug ? 'happy' : 'sparkle', look: [-1, 0], seed: 6 })
  const gH = [B.hand, B.back, B.hug], sH = [B.pen, B.hug]
  drawStarChar(x, 250, 800, 220, t, { color: GEM.color, glyph: GEM.glyph, mood: t > B.hug ? 'heart' : t > B.back ? 'wink' : 'happy', look: [1, 0], seed: 5, hops: gH })
  scarf(x, starFrame(250, 800, 220, t, { hops: gH, seed: 5 }), '#7fd0ff')
  drawStarChar(x, 540, 800, 220, t, { color: SCO.color, glyph: SCO.glyph, mood: t > B.hug ? 'heart' : t > B.pen ? 'wide' : 'happy', look: t > B.open[0] && t < B.back ? [-1, 1] : [-1, 0], seed: 9, hops: sH })
  beanie(x, starFrame(540, 800, 220, t, { hops: sH, seed: 9 }), GREEN)
  const hk = ease.inOutCubic(prog(t, B.hand, B.hand + 0.5))
  gift(x, lerp(330, 420, hk), 950, 70, 50, { col: '#a35cf0', rib: GOLD, open: ease.outCubic(prog(t, ...B.open)), alpha: 1 - prog(t, B.open[1] + 0.3, B.open[1] + 0.6) })
  if (t > B.open[1]) {
    // the pen, engraved with a tiny star
    const k = pop01(t, B.open[1], 0.3, 2.5)
    x.save(); x.translate(400, 960); x.rotate(-0.3); x.scale(k * 1.4, k * 1.4)
    R(x, INK, -70, -10, 140, 20); R(x, '#2a2a5a', -66, -6, 120, 12); R(x, GOLD, 50, -6, 12, 12); R(x, INK, 62, -4, 12, 8); R(x, GOLD, -40, -4, 8, 8)
    x.restore()
    sparkles(x, t, 400, 940, B.open[1], 10, 110, 1, [GOLD, PINK, BONE], 22)
  }
  speech(x, t, 560, 520, B.pen, 'the pen I\nalways borrow?', { size: 38, tail: 1, life: 1.1, col: '#fffaf0' })
  speech(x, t, 280, 520, B.back, 'now you can stop\ngiving it back.', { size: 36, tail: -1, life: 1.2, col: '#ffe36a' })
  if (t > B.hug) hearts(x, t, 400, 640, B.hug, { n: 7, life: 1.4, cell: 6, spread: 300 })
}

const EP = makeThenNow({
  id: 'nhve14', thing: 'The holiday gift in', then: '2016', stamp: '12·23·2016', accent: '#ffd35a',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: '2016: one month in. *gift panic.*' },
    { t: 7.5, text: '2026: someone *paid attention.*' },
    { t: 12.92, text: 'the best gifts say *I heard you.*' },
  ],
  last: 'Small gift. | *Big* listening.',
  cues: () => [
    ...[0.5, 1.0, 1.5].map(v => ['tom', v, 110, { gain: 0.12, decay: 0.15 }]),
    ['bell', A.ring, 1567.98, 0.03, 0.8, 0.2], ['tick', A.open, 0.05], ['tom', A.jam, 90, { gain: 0.22, decay: 0.25 }], ['pop', A.fit, 587.33, 0.03, 0.3], ['pop', A.bear, 783.99, 0.035, -0.3],
    ['pop', B.hand, 880, 0.03, -0.3], ['tick', B.open[0], 0.05], ['glitter', B.open[1], r3(B.open[1] + 0.4)], ['pop', B.open[1], 1318.51, 0.04, 0],
    ['pop', B.pen, 1046.5, 0.035, 0.3], ['pop', B.back, 880, 0.035, -0.3], ['pluck', B.hug, 1567.98, 0.045, 0.5, 0.3], ['glitter', B.hug, r3(B.hug + 0.4)],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
