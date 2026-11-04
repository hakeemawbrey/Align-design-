// nhve18: THEN vs NOW: HOLIDAYS, "The holiday party dance in 2016 / 2026" (20 s, b18 #18, music: pop · A)
// Look and props: ../../nhve01/scenes/thennow.js + holkit.js.
//   0–6.71    2016 (old-phone grade, "12·16·2016"): ♎ Libra pressed flat against the party wall at t = 0, a mug of
//             cocoa held up like a shield. It slides away from the dance floor, dances alone by the coat pile, and
//             freezes when someone walks in: "…just finding my coat." ♓ Pisces on the dance floor, crying.
//   6.71      the card cut; the year sticker flips to 2026.
//   6.71–12.8 2026: Libra walks up to ♈ Aries: "dance with me? I'm bad at it." Aries: "PERFECT." Both dance terribly,
//             both laughing. Pisces dances and cries.
//   12.8–15.6 THE STARS: "no one remembers the steps. *just you.*"  Last line: "Bad dancers. *Good* night."
import {
  makeThenNow, drawStarChar, signStar, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs,
  pop01, outK, r3, INK, BONE, GOLD, PINK, SW, SH, lerp, prog, ease, R, clamp,
} from '../../nhve01/scenes/thennow.js'
import { room, stringLights, sign, beanie, scarf, mark, mug, tree, partyHat, RED, GREEN, CREAM, LIGHTS } from '../../nhve01/scenes/holkit.js'

const LIB = signStar('libra'), ARI = signStar('aries')
const CROWD = [['#e9b24a', 91], ['#38c4ec', 92], ['#5fd38a', 93]]

function discoFloor(x, t, y0) {
  for (let j = 0; j < 4; j++) for (let i = 0; i < 9; i++) { x.save(); x.globalAlpha = 0.25 + 0.2 * Math.sin(t * 6 + i * 1.3 + j * 2.1); R(x, LIGHTS[(i + j) % 5], i * 100, y0 + j * 100, 100, 100); x.restore() }
}
function coatPile(x, cx, by) { R(x, INK, cx - 130, by - 110, 260, 116); [['#7a5cc0', -110], [RED, -50], ['#3fa05a', 10], ['#ffb04a', 60]].forEach(([c, o], i) => R(x, c, cx + o, by - 100 + (i % 2) * 14, 60, 96)) }

// ── THEN: 2016
const A = { slide: [1.3, 2.2], solo: [2.5, 3.9], walkin: 3.95, coat: 4.25, sob: 4.6 }
function sceneA(x, t) {
  room(x, t, { now: false, wall: '#5a2a5a', wall2: '#66336a' })
  stringLights(x, t, 24, 20)
  discoFloor(x, t, 640)
  coatPile(x, 760, 900)
  CROWD.forEach(([c, s], i) => { drawStarChar(x, 330 + i * 130, 760 + (i % 2) * 40, 130, t, { color: c, mood: 'happy', seed: s, hops: Array.from({ length: 14 }, (_, k) => k * 0.46 + i * 0.12) }); partyHat(x, starFrame(330 + i * 130, 760 + (i % 2) * 40, 130, t, { seed: s, hops: Array.from({ length: 14 }, (_, k) => k * 0.46 + i * 0.12) }), [GOLD, PINK, '#7fd0ff'][i], 0.2) })
  pisces(x, t, 560, 940, 120, t > A.sob ? 3 : 2, { mood: 'happy', seed: 6, look: [0, 0], hops: Array.from({ length: 12 }, (_, k) => k * 0.5 + 0.2) })
  // ♎ Libra: flat on the wall, slides to the coats, solo shuffle, freeze
  const sl = ease.inOutCubic(prog(t, ...A.slide))
  const lx = lerp(150, 640, sl), ly = lerp(500, 800, sl)
  const solo = t > A.solo[0] && t < A.walkin
  const lH = solo ? Array.from({ length: 6 }, (_, k) => A.solo[0] + k * 0.25) : [A.walkin, A.coat]
  drawStarChar(x, lx + (solo ? 14 * Math.sin(t * 12) : 0), ly, 240, t, { color: LIB.color, glyph: LIB.glyph, mood: t > A.walkin ? 'wide' : solo ? 'happy' : 'squint', look: t < A.slide[0] ? [1, 0] : t > A.walkin ? [-1, 0] : undefined, seed: 3, hops: lH, squash: t < A.slide[0] ? -0.06 : 0 })
  bangs(x, starFrame(lx, ly, 240, t, { hops: lH, seed: 3 }))
  if (t < A.solo[0]) mug(x, t, lx + 50, ly + 150, { col: '#ff8fb1', s: 1.5 })
  // someone walks in on the solo
  if (t > A.walkin - 0.4) drawStarChar(x, lerp(1000, 850, ease.outCubic(prog(t, A.walkin - 0.4, A.walkin))), 700, 130, t, { color: '#a35cf0', mood: 'neutral', look: [-1, 0], seed: 94 })
  speech(x, t, 600, 560, A.coat, '…just finding\nmy coat.', { size: 38, tail: 0, life: 1.8, col: '#fffaf0' })
}

// ── NOW: 2026
const B = { ask: 7.1, perfect: 8.65, dance: 9.2, laugh: [10.0, 10.5, 11.0] }
function sceneB(x, t) {
  room(x, t, { now: true, wall: '#4a2a6a', wall2: '#55337a' })
  stringLights(x, t, 24, 20)
  tree(x, t, 800, 640, 360, { now: true })
  discoFloor(x, t, 640)
  pisces(x, t, 800, 880, 110, 3, { mood: 'happy', seed: 6, look: [-1, 0], hops: t > B.dance ? Array.from({ length: 10 }, (_, k) => B.dance + k * 0.4) : [] })
  const dancing = t > B.dance
  const flail = dancing ? Math.sin((t - B.dance) * 9) : 0
  const lH = dancing ? Array.from({ length: 12 }, (_, k) => B.dance + k * 0.3) : [B.ask], aH = dancing ? Array.from({ length: 10 }, (_, k) => B.dance + 0.15 + k * 0.36) : [B.perfect]
  const lx = 280 + flail * 30, ax = 560 - flail * 26
  drawStarChar(x, lx, 790, 220, t, { color: LIB.color, glyph: LIB.glyph, mood: dancing ? (Math.floor(t * 3) % 2 ? 'happy' : 'squint') : 'sparkle', look: [1, 0], seed: 3, hops: lH, squash: 0.08 * flail })
  scarf(x, starFrame(lx, 790, 220, t, { hops: lH, seed: 3, squash: 0.08 * flail }), '#9fe6b0')
  drawStarChar(x, ax, 790, 220, t, { color: ARI.color, glyph: ARI.glyph, mood: dancing ? (Math.floor(t * 3) % 2 ? 'squint' : 'happy') : t > B.perfect ? 'sparkle' : 'happy', look: [-1, 0], seed: 4, hops: aH, squash: -0.08 * flail })
  beanie(x, starFrame(ax, 790, 220, t, { hops: aH, seed: 4, squash: -0.08 * flail }), '#7fd0ff')
  // little flailing arms
  if (dancing) for (const [cx, d] of [[lx, -1], [ax, 1]]) { x.save(); x.translate(cx + d * 120, 760); x.rotate(flail * d * 0.8); R(x, INK, -8, -60, 16, 70); x.restore() }
  speech(x, t, 300, 500, B.ask, 'dance with me?\nI’m bad at it.', { size: 38, tail: -1, life: 1.45, col: '#fffaf0' })
  speech(x, t, 560, 500, B.perfect, 'PERFECT.', { size: 52, tail: 1, life: 0.9, col: '#ffe36a' })
  B.laugh.forEach((v, i) => sign(x, 300 + i * 160, 520 - (i % 2) * 40, 'HA', { size: 36, col: '#ffe1ec', rot: (i - 1) * 0.2, k: pop01(t, v, 0.2, 3) * outK(t, [v + 0.6, v + 0.8]) }))
  if (t > B.laugh[2]) hearts(x, t, 420, 640, B.laugh[2], { n: 6, life: 1.4, cell: 6, spread: 260 })
}

const EP = makeThenNow({
  id: 'nhve18', thing: 'The party dance in', then: '2016', stamp: '12·16·2016', accent: '#ffb0f0',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: '2016: Libra and the wall, *very close.*' },
    { t: 9.4, text: '2026: bad moves, *great company.*' },
    { t: 12.92, text: 'no one remembers the steps. *just you.*' },
  ],
  last: 'Bad dancers. | *Good* night.',
  cues: () => [
    ['whoosh', A.slide[0], 0.5, 0.03], ...Array.from({ length: 5 }, (_, i) => ['tick', r3(A.solo[0] + i * 0.25), 0.03]),
    ['tick', A.walkin, 0.08], ['pop', r3(A.walkin + 0.05), 523.25, 0.04, 0.3], ['pop', A.coat, 659.25, 0.03, 0],
    ['pop', B.ask, 880, 0.03, -0.3], ['pop', B.perfect, 1318.51, 0.05, 0.3], ['glitter', B.perfect, r3(B.perfect + 0.3)],
    ...Array.from({ length: 6 }, (_, i) => ['tom', r3(B.dance + i * 0.3), 130 + (i % 2) * 40, { gain: 0.1, decay: 0.1 }]),
    ...B.laugh.map((v, i) => ['pop', v, 1046.5 + i * 130, 0.035, (i % 2 ? 0.3 : -0.3)]),
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
