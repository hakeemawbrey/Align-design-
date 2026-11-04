// nhve21: THEN vs NOW: HOLIDAYS, "The holiday sweater in 2016 / 2026" (18 s, b18 #21, music: jazzy · Eb)
// Look and props: ../../nhve01/scenes/thennow.js + holkit.js.
//   0–6.71    2016 (old-phone grade, "12·17·2016"): ♈ Aries tugs a matching sweater down over ♑ Capricorn at t = 0,
//             Capricorn's arms stuck. Two identical sweaters, a timer photo; Capricorn: "itchy." Flash: Aries beams,
//             Capricorn frowns. Aries: "we look SO cute!!" ♓ Pisces, also in the sweater, crying.
//   6.71      the card cut; the year sticker flips to 2026.
//   6.71–12.8 2026: Aries hands over a hand-knitted sweater, one sleeve much longer. Capricorn puts it on, the sleeve
//             trails on the floor. Aries: "the sleeves are… different." Capricorn: "it's perfect." A twirl. Hearts.
//   12.8–15.6 THE STARS: "handmade beats *matching.*"  Last line: "One long sleeve. *All* love."
import {
  makeThenNow, drawStarChar, signStar, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs, inSprite,
  pop01, outK, r3, INK, BONE, GOLD, PINK, SW, SH, lerp, prog, ease, R, clamp,
} from '../../nhve01/scenes/thennow.js'
import { room, stringLights, sign, beanie, scarf, mark, tree, fireplace, gift, RED, GREEN, CREAM } from '../../nhve01/scenes/holkit.js'

const ARI = signStar('aries'), CAP = signStar('capricorn')

/** a sweater on a star (sprite cells): body below the face, sleeves on the side points; long: extra cells on the right sleeve */
function sweater(x, F, { col = RED, col2 = CREAM, long = 0, drop = 0, pattern = 'zig' } = {}) {
  inSprite(x, F, () => {
    const top = 25 - drop * 18
    x.fillStyle = INK; x.fillRect(8, top - 1, 20, 35 - top); x.fillRect(5, 24, 5, 8); x.fillRect(26, 24, 5, 8)
    if (long) x.fillRect(26, 24, 6, 9 + long)
    x.fillStyle = col; x.fillRect(9, top, 18, 33 - top); x.fillRect(6, 25, 3, 6); x.fillRect(27, 25, 3, 6)
    if (long) { x.fillRect(27, 25, 4, 7 + long); x.fillStyle = col2; x.fillRect(27, 30 + long, 4, 1) }
    x.fillStyle = col2
    if (pattern === 'zig') for (let i = 0; i < 9; i++) x.fillRect(9 + i * 2, top + 2 + (i % 2), 1, 1)
    else { x.fillRect(12, top + 3, 2, 2); x.fillRect(17, top + 2, 2, 2); x.fillRect(22, top + 3, 2, 2) }
    x.fillRect(9, 31, 18, 1)
  })
}
function flash(x, t, t0) { if (t > t0 && t < t0 + 0.3) { x.save(); x.globalAlpha = 1 - prog(t, t0, t0 + 0.3); R(x, '#ffffff', 0, 0, SW, SH); x.restore() } }

// ── THEN: 2016
const A = { pull: [0, 1.0], itchy: 2.2, snap: 3.4, cute: 4.0, mm: 5.0, sob: 3.6 }
function sceneA(x, t) {
  room(x, t, { now: false })
  stringLights(x, t, 24, 18)
  tree(x, t, 790, 640, 360, { now: false })
  // the camera on a tripod
  R(x, INK, 430, 560, 8, 300); R(x, INK, 380, 520, 110, 60); R(x, '#4a4652', 386, 526, 98, 48); R(x, INK, 450, 540, 30, 30)
  if (t < A.snap) { x.save(); x.globalAlpha = Math.floor(t * 4) % 2; R(x, '#ff4f4f', 394, 532, 10, 10); x.restore() }
  pisces(x, t, 760, 840, 130, t > A.sob ? 3 : 1, { mood: t > A.sob ? 'happy' : 'neutral', look: [-1, 0], seed: 6 })
  sweater(x, starFrame(760, 840, 130, t, { seed: 6 }), { col: RED })
  const pk = ease.outCubic(prog(t, ...A.pull))
  const cH = [A.pull[1], A.itchy, A.mm], aH = [0.1, A.pull[1], A.cute, A.cute + 0.3]
  const scratch = t > A.itchy && t < A.snap ? 5 * Math.sin(t * 40) : 0
  drawStarChar(x, 230 + scratch, 790, 220, t, { color: CAP.color, glyph: CAP.glyph, mood: t > A.snap ? 'neutral' : t > A.itchy ? 'squint' : 'wide', look: t > A.snap ? [1, 0] : undefined, seed: 9, hops: cH })
  const CF = starFrame(230, 790, 220, t, { hops: cH, seed: 9 })
  bangs(x, CF)
  sweater(x, CF, { col: RED, drop: 1 - pk })
  drawStarChar(x, 520 - 120 * (1 - pk), 790, 210, t, { color: ARI.color, glyph: ARI.glyph, mood: t > A.cute ? 'sparkle' : 'happy', look: t < A.pull[1] ? [-1, 0] : undefined, seed: 4, hops: aH })
  sweater(x, starFrame(520 - 120 * (1 - pk), 790, 210, t, { hops: aH, seed: 4 }), { col: RED })
  flash(x, t, A.snap)
  speech(x, t, 240, 520, A.itchy, 'itchy.', { size: 44, tail: -1, life: 1.0, col: '#fffaf0' })
  speech(x, t, 540, 520, A.cute, 'we look SO\ncute!!', { size: 42, tail: 1, life: 1.0, col: '#ffe36a' })
  speech(x, t, 240, 540, A.mm, '…mm.', { size: 44, tail: -1, life: 1.4, col: '#fffaf0' })
  if (t > A.snap + 0.2) sign(x, 450, 230, 'PHOTO: 1 SMILE, 1 FROWN', { size: 28, col: '#ffd0d8', rot: -0.04, k: pop01(t, A.snap + 0.2, 0.3) })
}

// ── NOW: 2026
const B = { hand: 7.1, on: [7.8, 8.5], diff: 9.0, perfect: 10.0, twirl: [10.7, 11.3] }
function sceneB(x, t) {
  room(x, t, { now: true })
  stringLights(x, t, 24, 18)
  fireplace(x, t, 680, 640, { w: 260, h: 220 })
  pisces(x, t, 830, 880, 100, t > B.perfect ? 3 : 2, { mood: t > B.perfect ? 'happy' : 'sparkle', look: [-1, 0], seed: 6 })
  const on = ease.outCubic(prog(t, ...B.on))
  const tw = Math.sin(Math.PI * prog(t, ...B.twirl))
  const cH = [B.on[1], B.perfect, B.twirl[0]], aH = [B.hand, B.diff, B.twirl[1]]
  const cx = 280
  drawStarChar(x, cx, 780, 230, t, { color: CAP.color, glyph: CAP.glyph, mood: t > B.twirl[0] ? 'heart' : t > B.perfect ? 'happy' : t > B.on[1] ? 'sparkle' : 'happy', look: [1, 0], seed: 9, hops: cH, squash: -0.1 * tw })
  const CF = starFrame(cx, 780, 230, t, { hops: cH, seed: 9, squash: -0.1 * tw })
  if (on > 0) sweater(x, CF, { col: '#3fa05a', col2: CREAM, long: Math.round(on * 14 + 4 * tw), drop: 1 - on, pattern: 'dots' })
  // the folded sweater before it goes on
  if (t < B.on[0]) { const hk = ease.inOutCubic(prog(t, B.hand, B.hand + 0.5)); R(x, INK, lerp(520, 380, hk) - 64, 870, 128, 60); R(x, '#3fa05a', lerp(520, 380, hk) - 58, 876, 116, 48); R(x, CREAM, lerp(520, 380, hk) - 40, 890, 80, 6) }
  drawStarChar(x, 560, 790, 210, t, { color: ARI.color, glyph: ARI.glyph, mood: t > B.twirl[0] ? 'heart' : t > B.diff && t < B.perfect ? 'squint' : 'happy', look: [-1, 0], seed: 4, hops: aH })
  beanie(x, starFrame(560, 790, 210, t, { hops: aH, seed: 4 }), '#ffd35a')
  speech(x, t, 560, 520, B.diff, 'the sleeves are…\ndifferent.', { size: 36, tail: 1, life: 0.95, col: '#fffaf0' })
  speech(x, t, 300, 520, B.perfect, 'it’s perfect.', { size: 46, tail: -1, life: 1.5, col: '#ffe36a' })
  if (t > B.twirl[0]) hearts(x, t, 420, 640, B.twirl[0], { n: 7, life: 1.4, cell: 6, spread: 300 })
  sparkles(x, t, cx, 780, B.on[1], 10, 150, 1, [GOLD, PINK, BONE], 22)
}

const EP = makeThenNow({
  id: 'nhve21', thing: 'The holiday sweater in', then: '2016', stamp: '12·17·2016', accent: '#7fd36a',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: '2016: matching, *itchy*, mandatory.' },
    { t: 7.5, text: '2026: made by hand. *one size: love.*' },
    { t: 12.92, text: 'handmade beats *matching.*' },
  ],
  last: 'One long sleeve. | *All* love.',
  cues: () => [
    ['whoosh', 0.02, 0.6, 0.04], ['tom', A.pull[1], 140, { gain: 0.15, decay: 0.15 }], ['pop', A.itchy, 587.33, 0.03, -0.3],
    ...Array.from({ length: 4 }, (_, i) => ['tick', r3(A.itchy + 0.2 + i * 0.2), 0.03]),
    ['tick', A.snap, 0.08], ['pop', r3(A.snap + 0.02), 2093, 0.03, 0], ['pop', A.cute, 1046.5, 0.04, 0.3], ['pop', A.mm, 440, 0.03, -0.3],
    ['pop', B.hand, 880, 0.03, 0.3], ['whoosh', B.on[0], 0.5, 0.03], ['glitter', B.on[1], r3(B.on[1] + 0.3)],
    ['pop', B.diff, 783.99, 0.03, 0.3], ['pop', B.perfect, 1174.66, 0.045, -0.3], ['whoosh', B.twirl[0], 0.5, 0.03], ['pluck', B.twirl[1], 1567.98, 0.045, 0.5, 0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
