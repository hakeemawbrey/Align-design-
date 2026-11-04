// nhve15: THEN vs NOW: HOLIDAYS, "The holiday photo in 2016 / 2026" (18 s, b18 #15, music: chiptune · C)
// Look and props: ../../nhve01/scenes/thennow.js + holkit.js.
//   0–6.71    2016 (old-phone grade, "12·26·2016"): the group photo flashes at t = 0. ♎ Libra stands at one end, the
//             crush ♑ Capricorn three stars away at the other, half out of the viewfinder. Snap 1: cropped out.
//             Snap 2: a giant thumb over the lens. "…one more?" ♓ Pisces in the middle of the group, crying.
//   6.71      the card cut; the year sticker flips to 2026.
//   6.71–12.8 2026: a photo booth, a four-frame strip fills up: both of them in every frame, goofy faces. The strip
//             prints. Capricorn: "frame it?" Libra: "ALL of them." Pisces outside the booth, happy-sobbing.
//   12.8–15.6 THE STARS: "stand next to *who you like.*"  Last line: "*In* the picture now."
import {
  makeThenNow, drawStarChar, signStar, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs,
  pop01, outK, r3, INK, BONE, GOLD, PINK, SW, SH, lerp, prog, ease, R, clamp,
} from '../../nhve01/scenes/thennow.js'
import { room, stringLights, sign, beanie, scarf, mark, tree, partyHat, RED, GREEN, CREAM } from '../../nhve01/scenes/holkit.js'

const LIB = signStar('libra'), CAP = signStar('capricorn')
const MID = [['#e9b24a', 81], ['#38c4ec', 82]]

function flash(x, t, t0) { if (t > t0 && t < t0 + 0.3) { x.save(); x.globalAlpha = 1 - prog(t, t0, t0 + 0.3); R(x, '#ffffff', 0, 0, SW, SH); x.restore() } }
function viewfinder(x, l, tp, w, h, col = '#ffffff') {
  const c = 50
  for (const [ax, ay, sx, sy] of [[l, tp, 1, 1], [l + w, tp, -1, 1], [l, tp + h, 1, -1], [l + w, tp + h, -1, -1]]) { R(x, col, Math.min(ax, ax + sx * c), ay - (sy < 0 ? 6 : 0), c, 6); R(x, col, ax - (sx < 0 ? 6 : 0), Math.min(ay, ay + sy * c), 6, c) }
}

// ── THEN: 2016
const A = { snap1: 0.55, s1: 0.85, scoot: 1.4, snap2: 2.6, thumb: [2.3, 3.4], s2: 2.95, more: 4.2, sob: 3.6 }
function sceneA(x, t) {
  room(x, t, { now: false })
  stringLights(x, t, 24, 18)
  tree(x, t, 780, 640, 340, { now: false })
  // the lineup: Libra · two friends · Pisces · Capricorn (far right)
  const sc = ease.outCubic(prog(t, A.scoot, A.scoot + 0.5))
  const lx = lerp(130, 190, sc)
  const lH = [A.scoot, A.more]
  drawStarChar(x, lx, 740, 170, t, { color: LIB.color, glyph: LIB.glyph, mood: t > A.more ? 'squint' : t > A.s2 ? 'wide' : 'happy', look: [1, 0], seed: 3, hops: lH })
  bangs(x, starFrame(lx, 740, 170, t, { hops: lH, seed: 3 }))
  MID.forEach(([c, s], i) => { drawStarChar(x, 320 + i * 140, 740, 150, t, { color: c, mood: 'happy', seed: s, hops: [A.snap2 - 0.3 + i * 0.05] }); partyHat(x, starFrame(320 + i * 140, 740, 150, t, { seed: s, hops: [A.snap2 - 0.3 + i * 0.05] }), [GOLD, PINK][i], 0.15 * (i ? 1 : -1)) })
  pisces(x, t, 600, 740, 140, t > A.sob ? 3 : 2, { mood: 'happy', look: [0, 0], seed: 6 })
  drawStarChar(x, 790, 740, 170, t, { color: CAP.color, glyph: CAP.glyph, mood: 'happy', look: [-1, 0], seed: 9, hops: [A.s1] })
  // the viewfinder: crops Capricorn off the right edge
  viewfinder(x, 50, 560, 690, 330, t < 0.55 ? GOLD : '#ffffff')
  sign(x, 450, 480, 'SAY “HOLIDAYS”!', { size: 28, col: '#fffaf0', k: outK(t, [0.55, 0.75]) })
  // the giant thumb
  const tk = Math.sin(Math.PI * prog(t, ...A.thumb))
  if (tk > 0.01) { x.save(); x.translate(lerp(-200, 140, tk), 760); R(x, INK, -220, -170, 440, 340); R(x, '#f2a080', -210, -160, 420, 320); R(x, '#f8c0a0', 40, -140, 150, 110); x.restore() }
  flash(x, t, A.snap1); flash(x, t, A.snap2)
  sign(x, 200, 200, t < A.snap2 ? 'SNAP 1: CROPPED' : 'SNAP 2: THUMB', { size: 30, col: '#ffd0d8', rot: -0.05, k: t < A.snap2 ? pop01(t, A.s1, 0.3) : pop01(t, A.s2, 0.3) })
  speech(x, t, 230, 500, A.more, '…one more?', { size: 40, tail: -1, life: 1.6, col: '#fffaf0' })
}

// ── NOW: 2026
const B = { f: [7.15, 7.75, 8.35, 8.95], print: [9.4, 10.0], frame: 10.2, all: 10.95 }
const FACES = [['wink', 'happy'], ['heart', 'heart'], ['wide', 'wide'], ['happy', 'sparkle']]
function sceneB(x, t) {
  room(x, t, { now: true, wall: '#5a2a6a', wall2: '#66337a' })
  stringLights(x, t, 24, 18)
  // the booth
  R(x, INK, 40, 120, 470, 860); R(x, '#e05a6a', 46, 126, 458, 848); R(x, '#c94a5a', 46, 126, 458, 60)
  sign(x, 275, 160, 'PHOTO BOOTH', { size: 30, col: '#fff3c8' })
  R(x, INK, 70, 210, 410, 560); R(x, '#2a2050', 76, 216, 398, 548)
  const fi = B.f.filter(v => t >= v).length
  const cur = FACES[Math.max(0, fi - 1)]
  const bH = [...B.f, B.all]
  drawStarChar(x, 190, 560, 190, t, { color: LIB.color, glyph: LIB.glyph, mood: t > B.all ? 'heart' : cur[0], look: fi === 3 ? [1, 0] : undefined, seed: 3, hops: bH })
  scarf(x, starFrame(190, 560, 190, t, { hops: bH, seed: 3 }), '#9fe6b0')
  drawStarChar(x, 360, 560, 190, t, { color: CAP.color, glyph: CAP.glyph, mood: t > B.all ? 'heart' : cur[1], look: fi === 3 ? [-1, 0] : undefined, seed: 9, hops: bH.map(v => v + 0.05) })
  beanie(x, starFrame(360, 560, 190, t, { hops: bH.map(v => v + 0.05), seed: 9 }), RED)
  B.f.forEach(v => flash(x, t, v))
  // the strip: four frames filling (right side), then printed
  const pk = ease.outCubic(prog(t, ...B.print))
  x.save(); x.translate(700, lerp(560, 600, pk)); x.rotate(lerp(0, 0.06, pk))
  R(x, INK, -110, -400, 220, 800); R(x, '#fffaf0', -104, -394, 208, 788)
  for (let i = 0; i < 4; i++) {
    const y = -380 + i * 192
    R(x, '#2a2050', -92, y, 184, 176)
    if (fi > i) {
      const k = pop01(t, B.f[i] + 0.15, 0.25)
      x.save(); x.globalAlpha = k
      drawStarChar(x, -42, y + 96, 90, B.f[i] + 0.2, { color: LIB.color, mood: FACES[i][0], seed: 3 })
      drawStarChar(x, 42, y + 96, 90, B.f[i] + 0.2, { color: CAP.color, mood: FACES[i][1], seed: 9 })
      x.restore()
    }
  }
  x.restore()
  pisces(x, t, 560, 900, 110, t > B.all ? 3 : 2, { mood: t > B.all ? 'happy' : 'sparkle', look: [-1, -1], seed: 6 })
  speech(x, t, 360, 360, B.frame, 'frame it?', { size: 40, tail: 1, life: 0.9, col: '#fffaf0' })
  speech(x, t, 200, 360, B.all, 'ALL of them.', { size: 42, tail: -1, life: 1.3, col: '#ffe36a' })
  if (t > B.all) hearts(x, t, 275, 480, B.all, { n: 6, life: 1.4, cell: 6, spread: 240 })
  sparkles(x, t, 700, 600, B.print[1], 10, 200, 1, [GOLD, PINK, BONE], 24)
}

const EP = makeThenNow({
  id: 'nhve15', thing: 'The holiday photo in', then: '2016', stamp: '12·26·2016', accent: '#ffb0f0',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: '2016: the crush was *technically* there.' },
    { t: 7.5, text: '2026: *both* in every frame.' },
    { t: 12.92, text: 'stand next to *who you like.*' },
  ],
  last: '*In* the picture | now.',
  cues: () => [
    ['tick', A.snap1, 0.08], ['pop', r3(A.snap1 + 0.02), 2093, 0.03, 0], ['tick', A.s1, 0.05], ['whoosh', A.scoot, 0.25, 0.025],
    ['whoosh', A.thumb[0], 0.3, 0.03], ['tick', A.snap2, 0.08], ['pop', r3(A.snap2 + 0.02), 2093, 0.03, 0], ['tom', A.s2, 120, { gain: 0.12, decay: 0.15 }],
    ['pop', A.more, 659.25, 0.03, -0.3],
    ...B.f.flatMap((v, i) => [['tick', v, 0.07], ['pop', r3(v + 0.02), 1567.98 + i * 100, 0.03, 0.3]]),
    ['whoosh', B.print[0], 0.4, 0.03], ['glitter', B.print[1], r3(B.print[1] + 0.4)],
    ['pop', B.frame, 880, 0.035, 0.3], ['pop', B.all, 1174.66, 0.045, -0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
