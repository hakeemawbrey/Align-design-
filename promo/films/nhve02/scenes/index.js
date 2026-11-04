// nhve02: THEN vs NOW: HOLIDAYS, "Taurus' holidays in 2016 / 2026" (20 s, b18 #2, music: dreamy · Eb)
// Look and props: ../../nhve01/scenes/thennow.js + holkit.js.
//   0–6.71    2016 (old-phone grade, "12·19·2016"): ♉ Taurus is hugging the holiday cookie plate at t = 0, crumbs
//             flying. ♎ Libra reaches in: "can I have o—" Taurus: "MINE." A blanket goes over Taurus and the plate;
//             the lump munches (CRUNCH). ♓ Pisces cries at the empty plate.
//   6.71      the card cut; the year sticker flips to 2026.
//   6.71–12.8 2026, the kitchen: Taurus pulls a second tray from the oven, packs a box: "I made yours first."
//             Libra: "for my family?" Taurus: "and one spare. for me." Hearts. Pisces happy-sobs.
//   12.8–15.6 THE STARS: "cookies taste better *shared.*"  Last line: "Two trays. *One* heart."
import {
  makeThenNow, drawStarChar, signStar, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs, pop01, outK, r3,
  INK, BONE, GOLD, PINK, SW, lerp, prog, ease, R,
} from '../../nhve01/scenes/thennow.js'
import { room, snowWindow, tree, mug, stringLights, cookies, table, sign, beanie, scarf, mark, RED, GREEN, CREAM } from '../../nhve01/scenes/holkit.js'

const TAU = signStar('taurus'), LIB = signStar('libra')

function blanket(x, t, cx, by, k, munch) {
  // a big lumpy quilt dropped over the star; munch wobbles it
  const w = 330, h = 250 * k, wob = munch ? 10 * Math.sin(t * 22) : 0
  x.save(); x.translate(cx, by)
  R(x, INK, -w / 2 - 6, -h - 6 + wob, w + 12, h + 6)
  for (let j = 0; j < 5; j++) for (let i = 0; i < 6; i++) R(x, (i + j) % 2 ? '#c9643c' : '#f2c75c', -w / 2 + i * w / 6, -h + wob + j * h / 5, w / 6 + 1, h / 5 + 1)
  x.restore()
}
function oven(x, t, cx, by, open) {
  R(x, INK, cx - 136, by - 286, 272, 290); R(x, '#e9e2ef', cx - 130, by - 280, 260, 280)
  for (let i = 0; i < 4; i++) { R(x, INK, cx - 100 + i * 60, by - 262, 24, 24); R(x, '#b8a7d8', cx - 96 + i * 60, by - 258, 16, 16) }
  R(x, INK, cx - 110, by - 210, 220, 180); R(x, open > 0.5 ? '#ffb04a' : '#3a2a40', cx - 104, by - 204, 208, 168)
  if (open < 0.5) R(x, '#ff8a3a', cx - 80, by - 120, 160, 12)
}

// ── THEN: 2016
const A = { reach: 1.7, mine: 2.35, throw: 3.3, crunch: [4.1, 4.6, 5.1], sob: 4.0 }
function sceneA(x, t) {
  room(x, t, { now: false })
  snowWindow(x, t, 600, 110, 230, 240)
  stringLights(x, t, 24, 18)
  tree(x, t, 120, 640, 380, { now: false })
  x.save(); x.translate(0, 100)
  table(x, 450, 780, 560, { now: false, cloth: '#e05a6a' })
  // ♓ Pisces at the far end, the plate is empty to it
  pisces(x, t, 760, 690, 120, t > A.sob ? 3 : 1, { mood: t > A.sob ? 'wide' : 'neutral', look: [-1, 0], seed: 6 })
  // ♎ Libra reaches in from the left
  const rk = ease.outCubic(prog(t, A.reach - 0.3, A.reach)) * (1 - ease.inCubic(prog(t, A.mine + 0.2, A.mine + 0.6)))
  drawStarChar(x, lerp(-40, 150, rk), 640, 170, t, { color: LIB.color, glyph: LIB.glyph, mood: t > A.mine ? 'wide' : 'happy', look: [1, 0], seed: 3, hops: [A.reach] })
  // ♉ Taurus hugging the plate (then under the blanket)
  const bk = ease.outBack ? ease.outCubic(prog(t, A.throw, A.throw + 0.3)) : prog(t, A.throw, A.throw + 0.3)
  if (bk < 1) {
    const hops = [0.6, 1.4, A.mine]
    drawStarChar(x, 430, 690, 250, t, { color: TAU.color, glyph: TAU.glyph, mood: t > A.mine - 0.1 ? 'squint' : 'happy', look: t > A.reach - 0.2 ? [-1, 0] : undefined, seed: 2, hops, squash: 0.04 * Math.sin(t * 14) })
    bangs(x, starFrame(430, 690, 250, t, { hops, seed: 2, squash: 0.04 * Math.sin(t * 14) }))
    cookies(x, 430, 800, 7, { s: 1.5 })
    // crumbs
    for (let i = 0; i < 8; i++) { const ph = (t * 1.6 + i / 8) % 1; R(x, '#d9903f', 380 + i * 14 + 20 * Math.sin(i * 3), 700 + ph * 120, 8, 8) }
  }
  if (t > A.throw) blanket(x, t, 430, 790, Math.min(1, bk + 0.2), t > A.crunch[0])
  for (const c of A.crunch) if (t > c) sign(x, 430 + (A.crunch.indexOf(c) - 1) * 150, 480 - A.crunch.indexOf(c) * 20, 'CRUNCH', { size: 30, col: '#fff3c8', rot: (A.crunch.indexOf(c) - 1) * 0.15, k: pop01(t, c, 0.22, 2.6) * outK(t, [c + 0.9, c + 1.1]) })
  speech(x, t, 230, 470, A.reach, 'can I have o—', { size: 34, tail: -1, life: 0.8 })
  speech(x, t, 470, 420, A.mine, 'MINE.', { size: 56, tail: 0, life: 1.0, col: '#ffe36a', shake: 3 })
  mark(x, t, 150, 510, A.mine + 0.05, '!')
  x.restore()
}

// ── NOW: 2026, the kitchen
const B = { oven: 7.15, tray: 7.6, pack: 8.3, first: 8.5, fam: 9.75, spare: 10.6, hug: 11.4 }
function sceneB(x, t) {
  room(x, t, { now: true, wall: '#4f6a8a', wall2: '#58759a' })
  stringLights(x, t, 24, 18)
  snowWindow(x, t, 330, 110, 230, 240, { night: false })
  x.save(); x.translate(0, 90)
  const op = prog(t, B.oven - 0.2, B.oven + 0.1)
  oven(x, t, 150, 900, op)
  table(x, 600, 800, 480, { now: true })
  // Pisces by the window, happy tears
  pisces(x, t, 760, 520, 110, t > B.hug ? 3 : 2, { mood: t > B.hug ? 'happy' : 'sparkle', look: [-1, 1], seed: 6 })
  // the box for Libra's family, filling up
  const n = Math.min(8, Math.floor(prog(t, B.pack, B.pack + 0.8) * 8))
  R(x, INK, 640, 718, 190, 88); R(x, '#fff3e2', 646, 724, 178, 76); R(x, RED, 730, 724, 12, 76)
  cookies(x, 735, 700, n, { s: 0.9 })
  // ♉ Taurus with the tray, oven mitts
  const tk = ease.outCubic(prog(t, B.tray - 0.2, B.tray + 0.3))
  const hops = [B.tray, B.first, B.spare, B.hug]
  drawStarChar(x, 330, 690, 230, t, { color: TAU.color, glyph: TAU.glyph, mood: t > B.hug ? 'heart' : t > B.spare ? 'wink' : 'happy', look: [1, 0], seed: 2, hops })
  scarf(x, starFrame(330, 690, 230, t, { hops, seed: 2 }), GREEN)
  if (t > B.tray - 0.2 && t < B.pack + 0.9) { R(x, INK, lerp(150, 330, tk) - 96, 780, 192, 18); R(x, '#b8a7d8', lerp(150, 330, tk) - 90, 784, 180, 10); cookies(x, lerp(150, 330, tk), 776, 6, { s: 0.85 }) }
  // ♎ Libra
  drawStarChar(x, 560, 590, 190, t, { color: LIB.color, glyph: LIB.glyph, mood: t > B.hug ? 'heart' : t > B.first + 0.3 ? 'sparkle' : 'happy', look: [-1, 0], seed: 3, hops: [B.fam, B.hug] })
  beanie(x, starFrame(560, 590, 190, t, { hops: [B.fam, B.hug], seed: 3 }), '#7fd0ff')
  sign(x, 735, 650, 'FOR YOUR FAMILY', { size: 18, col: '#fffaf0', k: pop01(t, B.pack + 0.6, 0.3) })
  speech(x, t, 330, 420, B.first, 'I made yours\nfirst.', { size: 40, tail: 0, life: 1.6, col: '#fffaf0' })
  speech(x, t, 600, 380, B.fam, 'for my family?', { size: 38, tail: 0, life: 1.0, col: '#e9fff0' })
  speech(x, t, 300, 420, B.spare, 'and one spare.\nfor me.', { size: 38, tail: 0, life: 1.6, col: '#fff3c8' })
  if (t > B.hug) hearts(x, t, 450, 520, B.hug, { n: 7, life: 1.5, cell: 6, spread: 300, seed: 2 })
  sparkles(x, t, 330, 760, B.tray, 8, 120, 1, [GOLD, PINK, BONE], 22)
  x.restore()
}

const EP = makeThenNow({
  id: 'nhve02', thing: 'Taurus’ holidays in', then: '2016', stamp: '12·19·2016', accent: '#7fd36a',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: 'Taurus in 2016: cookies were *not* shared.' },
    { t: 7.4, text: 'Taurus in 2026 bakes a *second tray.*' },
    { t: 12.92, text: 'cookies taste better *shared.*' },
  ],
  last: 'Two trays. | *One* heart.',
  cues: () => [
    ['pop', 0.6, 784, 0.03, -0.2], ['pop', 1.4, 880, 0.03, -0.2],
    ['pop', A.reach, 659.25, 0.03, -0.4], ['pop', A.mine, 523.25, 0.05, 0], ['tom', r3(A.mine + 0.02), 150, { gain: 0.18, decay: 0.15 }],
    ['whoosh', A.throw, 0.35, 0.04], ['tom', r3(A.throw + 0.3), 120, { gain: 0.2, decay: 0.2 }],
    ...A.crunch.flatMap(c => [['tick', c, 0.07], ['tick', r3(c + 0.06), 0.05]]),
    ['tick', B.oven, 0.05], ['whoosh', B.tray - 0.2, 0.3, 0.03], ['glitter', B.tray, r3(B.tray + 0.3)],
    ...[0, 1, 2, 3].map(i => ['pop', r3(B.pack + i * 0.2), 880 + i * 110, 0.025, 0.3]),
    ['pop', B.first, 783.99, 0.035, -0.2], ['pop', B.fam, 987.77, 0.03, 0.3], ['pop', B.spare, 698.46, 0.035, -0.2],
    ['pluck', B.hug, 1567.98, 0.045, 0.5, 0.3], ['glitter', B.hug, r3(B.hug + 0.4)],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
