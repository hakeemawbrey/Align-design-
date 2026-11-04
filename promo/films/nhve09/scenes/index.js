// nhve09: THEN vs NOW: HOLIDAYS, "Sagittarius' holidays in 2016 / 2026" (18 s, b18 #9, music: lofi · C)
// Look and props: ../../nhve01/scenes/thennow.js + holkit.js.
//   0–6.71    2016 (old-phone grade, "12·24·2016"): ♐ Sag is mid-leap off a snowy hilltop at t = 0, backpack flapping.
//             A selfie (flash). Cut to the family table: an empty chair with a "SAG" place card, the family looking
//             at the selfie: "…again?" ♓ Pisces at the table cries. Back on the mountain: "MISS YOU!!" (echo).
//   6.71      the card cut; the year sticker flips to 2026.
//   6.71–12.8 2026: the front door bursts open, Sag in snowy boots with ♋ Cancer. The table: "SAG!!" Sag: "I brought
//             stories. and them." Cancer: "hi!" Sag sits in the chair. Hearts; Pisces happy-sobs.
//   12.8–15.6 THE STARS: "go far. *come back warm.*"  Last line: "Wandered. *Came home*."
import {
  makeThenNow, drawStarChar, signStar, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs,
  pop01, outK, r3, INK, BONE, GOLD, PINK, SW, SH, lerp, prog, ease, R, clamp,
} from '../../nhve01/scenes/thennow.js'
import { room, stringLights, table, sign, beanie, scarf, mark, tree, door, snowfall, phone, RED, GREEN, CREAM, INTER } from '../../nhve01/scenes/holkit.js'

const SAG = signStar('sagittarius'), CAN = signStar('cancer')
const FAM = [['#e9b24a', 41], ['#38c4ec', 42], ['#a35cf0', 43]]

function mountain(x, t) {
  R(x, '#9fc8ff', 0, 0, SW, SH)
  for (let j = 0; j < 5; j++) R(x, '#b4d6ff', 0, j * 120, SW, 50)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-40, 1060); x.lineTo(300, 560); x.lineTo(520, 760); x.lineTo(720, 420); x.lineTo(960, 1060); x.closePath(); x.fill()
  x.fillStyle = '#7a8ab8'; x.beginPath(); x.moveTo(-30, 1060); x.lineTo(300, 576); x.lineTo(520, 776); x.lineTo(720, 436); x.lineTo(950, 1060); x.closePath(); x.fill()
  x.fillStyle = '#f4f6ff'; x.beginPath(); x.moveTo(640, 540); x.lineTo(720, 436); x.lineTo(800, 540); x.lineTo(760, 520); x.lineTo(720, 560); x.lineTo(680, 520); x.closePath(); x.fill()
  R(x, INK, 0, 856, SW, 8); R(x, '#f4f6ff', 0, 862, SW, 200)
}
function famTable(x, t, now, emptyChair) {
  room(x, t, { now })
  stringLights(x, t, 24, 18)
  tree(x, t, 800, 640, 340, { now })
  // the chair (left)
  if (emptyChair) { R(x, INK, 120, 700, 130, 220); R(x, '#8a5a3a', 126, 706, 118, 30); R(x, '#8a5a3a', 126, 820, 118, 24); sign(x, 185, 770, 'SAG', { size: 24, col: '#fffaf0' }) }
}

// ── THEN: 2016
const A = { land: 1.1, snap: 1.9, cut: 2.9, again: 3.6, sob: 3.9, back: 4.9, miss: 5.1 }
function sceneA(x, t) {
  const home = t > A.cut && t < A.back
  if (!home) {
    mountain(x, t)
    const jp = clamp(t / A.land)
    const sx = t < A.land ? lerp(300, 560, jp) : 560, sy = t < A.land ? 560 - 260 * Math.sin(Math.PI * (0.25 + jp * 0.75)) + 300 * jp : 760
    const sH = [A.land, A.snap, A.miss]
    drawStarChar(x, sx, sy, 220, t, { color: SAG.color, glyph: SAG.glyph, mood: t < A.land ? 'sparkle' : t > A.miss ? 'happy' : 'wink', look: undefined, seed: 8, hops: sH, squash: t > A.land && t < A.land + 0.2 ? 0.15 : 0 })
    const F = starFrame(sx, sy, 220, t, { hops: sH, seed: 8 })
    bangs(x, F)
    // backpack
    R(x, INK, sx - 130, sy - 40 + 6 * Math.sin(t * 16), 64, 90); R(x, '#e05a3a', sx - 124, sy - 34 + 6 * Math.sin(t * 16), 52, 78)
    if (t > A.land) phone(x, sx + 120, sy - 80, { s: 0.6, rot: 0.2 })
    if (t > A.snap && t < A.snap + 0.25) { x.save(); x.globalAlpha = 1 - prog(t, A.snap, A.snap + 0.25); R(x, '#ffffff', 0, 0, SW, SH); x.restore() }
    if (t > A.back) for (let i = 0; i < 3; i++) { const k = pop01(t, A.miss + i * 0.35, 0.25) * outK(t, [A.miss + i * 0.35 + 0.6, A.miss + i * 0.35 + 0.8]); if (k > 0.02) { x.save(); x.globalAlpha = 1 - i * 0.3; speech(x, t, 560 + i * 90 - 220, 430 - i * 70, A.miss + i * 0.35, i ? 'miss you…' : 'MISS YOU!!', { size: 44 - i * 8, tail: 0, life: 0.9, col: i ? '#e9f6ff' : '#ffe36a' }); x.restore() } }
    snowfall(x, t, { n: 18, seed: 9 })
  } else {
    famTable(x, t, false, true)
    table(x, 520, 820, 520, { now: false, cloth: '#e05a6a' })
    FAM.forEach(([c, s], i) => drawStarChar(x, 380 + i * 140, 720, 140, t, { color: c, mood: t > A.again ? 'neutral' : 'happy', look: [0, 1], seed: s, hops: [A.again + i * 0.06] }))
    pisces(x, t, 720, 700, 120, 3, { mood: 'wide', look: [-1, 1], seed: 6 })
    // the selfie on the old phone, passed around
    phone(x, 330, 790, { s: 0.5, screen: '#9fc8ff', text: ':)', rot: 1.45 })
    speech(x, t, 520, 480, A.again, '…again?', { size: 44, tail: 0, life: 1.1, col: '#fffaf0' })
  }
}

// ── NOW: 2026
const B = { burst: 7.05, cheer: 7.6, stories: 8.55, hi: 9.85, sit: [10.5, 11.0], hug: 11.3 }
function sceneB(x, t) {
  famTable(x, t, true, false)
  door(x, 160, 640, { w: 200, h: 400, open: ease.outCubic(prog(t, B.burst - 0.2, B.burst + 0.1)) * 0.9 })
  table(x, 600, 820, 440, { now: true })
  FAM.forEach(([c, s], i) => drawStarChar(x, 530 + i * 120, 700, 125, t, { color: c, mood: t > B.cheer ? 'happy' : 'neutral', look: [-1, 0], seed: s, hops: [B.cheer + i * 0.05, B.hug] }))
  pisces(x, t, 830, 760, 110, t > B.hug ? 3 : 2, { mood: t > B.hug ? 'happy' : 'sparkle', look: [-1, 0], seed: 6 })
  // Sag + Cancer come in through the door
  const ek = ease.outCubic(prog(t, B.burst, B.burst + 0.6))
  const sk = ease.inOutCubic(prog(t, ...B.sit))
  const sx = lerp(lerp(120, 250, ek), 340, sk), sy = lerp(790, 760, sk)
  const sH = [B.burst + 0.1, B.stories, B.sit[1], B.hug]
  drawStarChar(x, sx, sy, 210, t, { color: SAG.color, glyph: SAG.glyph, mood: t > B.hug ? 'heart' : 'sparkle', look: [1, 0], seed: 8, hops: sH })
  beanie(x, starFrame(sx, sy, 210, t, { hops: sH, seed: 8 }), RED)
  // snowy boots
  R(x, INK, sx - 50, sy + 90, 40, 26); R(x, '#f4f6ff', sx - 46, sy + 86, 32, 10); R(x, INK, sx + 10, sy + 90, 40, 26); R(x, '#f4f6ff', sx + 14, sy + 86, 32, 10)
  const cx = lerp(-80, 130, ease.outCubic(prog(t, B.burst + 0.3, B.burst + 0.9)))
  const cH = [B.hi, B.hug]
  drawStarChar(x, cx, 820, 180, t, { color: CAN.color, glyph: CAN.glyph, mood: t > B.hug ? 'heart' : t > B.hi ? 'happy' : 'neutral', look: [1, 0], seed: 7, hops: cH, blush: t > B.hi })
  scarf(x, starFrame(cx, 820, 180, t, { hops: cH, seed: 7 }), '#ff8fb1')
  speech(x, t, 590, 480, B.cheer, 'SAG!!', { size: 52, tail: 0, life: 0.85, col: '#ffe36a' })
  speech(x, t, 340, 470, B.stories, 'I brought stories.\nand them.', { size: 38, tail: -1, life: 1.3, col: '#fffaf0' })
  speech(x, t, 170, 560, B.hi, 'hi!', { size: 40, tail: -1, life: 0.9, col: '#ffe1ec' })
  if (t > B.hug) hearts(x, t, 450, 620, B.hug, { n: 7, life: 1.4, cell: 6, spread: 360 })
  sparkles(x, t, 200, 600, B.burst, 10, 160, 1, [GOLD, '#f4f6ff', BONE], 24)
}

const EP = makeThenNow({
  id: 'nhve09', thing: 'Sag’s holidays in', then: '2016', stamp: '12·24·2016', accent: '#c9a6ff',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: 'Sag in 2016 spent the holidays *on a summit.*' },
    { t: 8.2, text: 'in 2026 the adventure is *coming home.*' },
    { t: 12.92, text: 'go far. *come back warm.*' },
  ],
  last: 'Wandered. | *Came home*.',
  cues: () => [
    ['whoosh', 0.02, 0.5, 0.04], ['tom', A.land, 130, { gain: 0.2, decay: 0.2 }], ['tick', A.snap, 0.08], ['pop', r3(A.snap + 0.02), 2093, 0.03, 0.3],
    ['whoosh', r3(A.cut - 0.1), 0.25, 0.03], ['pop', A.again, 587.33, 0.03, 0], ['whoosh', r3(A.back - 0.1), 0.25, 0.03],
    ...[0, 1, 2].map(i => ['pop', r3(A.miss + i * 0.35), 1046.5 - i * 120, 0.045 - i * 0.012, 0]),
    ['tom', B.burst, 110, { gain: 0.2, decay: 0.2 }], ['glitter', B.burst, r3(B.burst + 0.4)], ['pop', B.cheer, 1318.51, 0.045, 0.3],
    ['pop', B.stories, 880, 0.035, -0.3], ['pop', B.hi, 1046.5, 0.03, -0.4], ['tick', B.sit[1], 0.05],
    ['pluck', B.hug, 1567.98, 0.045, 0.5, 0.3], ['glitter', B.hug, r3(B.hug + 0.4)],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
