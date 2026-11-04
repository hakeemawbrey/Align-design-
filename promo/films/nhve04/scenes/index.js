// nhve04: THEN vs NOW: HOLIDAYS, "Cancer's holidays in 2016 / 2026" (20 s, b18 #4, music: lofi · Bb)
// Look and props: ../../nhve01/scenes/thennow.js + holkit.js.
//   0–6.71    2016 (old-phone grade, "12·24·2016"): ♋ Cancer juggles three steaming pots at t = 0 under a
//             "GUESTS: 20" sign. Plates fly out to a packed table ("so good!!"); Cancer: "how are… you all?" —
//             nobody asks back. Cancer falls asleep on the counter, spoon in hand. ♓ Pisces at the table cries
//             (the food is that good).
//   6.71      the card cut; the year sticker flips to 2026.
//   6.71–12.8 2026: ♏ Scorpio takes the spoon: "sit. I've got this." Cancer in the armchair with a mug; Scorpio:
//             "how are *you*?" Cancer tears up: "…really good." Pisces happy-sobs.
//   12.8–15.6 THE STARS: "the carer gets *cared for* too."  Last line: "Cared *for*, for once."
import {
  makeThenNow, drawStarChar, signStar, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs, inSprite, tearsCells,
  pop01, outK, r3, INK, BONE, GOLD, PINK, SW, SH, lerp, prog, ease, R, clamp,
} from '../../nhve01/scenes/thennow.js'
import { room, stringLights, snowWindow, table, sign, mug, beanie, scarf, mark, fireplace, RED, GREEN, CREAM } from '../../nhve01/scenes/holkit.js'

const CAN = signStar('cancer'), SCO = signStar('scorpio')
const GUESTS = ['#38c4ec', '#e9b24a', '#ef5c94', '#a35cf0', '#5fd38a']

function pot(x, t, cx, cy, rot = 0, col = '#5a5a7a') {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  R(x, INK, -50, -36, 100, 66); R(x, col, -44, -30, 88, 54); R(x, INK, -66, -26, 18, 12); R(x, INK, 48, -26, 18, 12)
  R(x, '#ffb04a', -40, -30, 80, 10)
  for (let i = 0; i < 3; i++) { const ph = (t * 1.1 + i / 3) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * 0.8; R(x, '#ffffff', -20 + i * 18 + 6 * Math.sin(t * 4 + i), -46 - ph * 60, 8, 12); x.globalAlpha = 1 }
  x.restore()
}
function counter(x, y) { R(x, INK, 0, y - 6, 470, 300); R(x, '#e9d3b0', 0, y, 464, 22); R(x, '#a8784c', 0, y + 22, 464, 280) }

// ── THEN: 2016
const A = { serve: 1.5, good: 2.7, ask: 3.75, silence: 4.6, sleep: 5.2 }
function sceneA(x, t) {
  room(x, t, { now: false })
  stringLights(x, t, 24, 18)
  snowWindow(x, t, 560, 100, 200, 200)
  sign(x, 220, 200, 'GUESTS: 20', { size: 34, col: '#fff3c8', rot: -0.06 })
  counter(x, 760)
  // the table of guests (right), eating
  table(x, 690, 850, 420, { now: false, cloth: '#e05a6a' })
  GUESTS.forEach((c, i) => { const gx = 520 + (i % 3) * 120 + (i > 2 ? 60 : 0), gy = i > 2 ? 760 : 700
    drawStarChar(x, gx, gy, 110, t, { color: c, mood: t > A.good ? 'happy' : 'neutral', look: t > A.ask && t < A.silence + 0.6 ? [0, 1] : [-1, 0], seed: 20 + i, hops: [A.good + i * 0.05] }) })
  pisces(x, t, 800, 620, 110, t > A.good ? 3 : 1, { mood: t > A.good ? 'wide' : 'neutral', look: [-1, 0], seed: 6 })
  for (let i = 0; i < 5; i++) { const pk = ease.outCubic(prog(t, A.serve + i * 0.12, A.serve + i * 0.12 + 0.35)); if (pk > 0) { const px = lerp(280, 540 + i * 70, pk), py = lerp(720, 840, pk) - 120 * Math.sin(Math.PI * pk); R(x, INK, px - 34, py - 8, 68, 16); R(x, '#f4f6ff', px - 30, py - 5, 60, 10); R(x, '#d9903f', px - 14, py - 14, 28, 10) } }
  // ♋ Cancer juggling (then asleep on the counter)
  const sl = ease.outCubic(prog(t, A.sleep, A.sleep + 0.4))
  const cx = 250, cy = lerp(620, 690, sl)
  const hops = [0.4, 0.95, A.serve, A.ask]
  let cm = t < A.serve ? 'wide' : 'happy', cl = t > A.serve ? [1, 0] : [0, -1]
  if (t > A.silence) { cm = 'neutral'; cl = [1, 0] }
  if (t > A.sleep) { cm = 'sleepy'; cl = undefined }
  drawStarChar(x, cx, cy, 220, t, { color: CAN.color, glyph: CAN.glyph, mood: cm, look: cl, seed: 7, hops: t < A.sleep ? hops : [], squash: sl * 0.18 })
  bangs(x, starFrame(cx, cy, 220, t, { hops: t < A.sleep ? hops : [], seed: 7, squash: sl * 0.18 }))
  // three pots in the air (before serving)
  if (t < A.serve + 0.2) for (let i = 0; i < 3; i++) { const ph = (t * 1.3 + i / 3) % 1; pot(x, t, cx - 90 + ph * 180, 470 - 150 * Math.sin(Math.PI * ph), ph * 2 - 1, ['#5a5a7a', '#7a4a6a', '#4a6a7a'][i]) }
  else pot(x, t, 120, 730, 0)
  speech(x, t, 690, 540, A.good, 'so good!!', { size: 40, tail: 0, life: 1.0, col: '#ffe36a' })
  speech(x, t, 260, 400, A.ask, 'how are…\nyou all?', { size: 38, tail: -1, life: 1.0 })
  if (t > A.silence) sign(x, 690, 560, '*chewing*', { size: 28, col: '#fffaf0', k: pop01(t, A.silence, 0.25) * outK(t, [A.sleep + 0.6, A.sleep + 0.8]), font: "'EB Garamond', Georgia, serif", weight: 600 })
}

// ── NOW: 2026
const B = { spoon: 7.2, sit: 7.65, chair: 8.4, how: 9.15, tear: 9.95, good: 10.6, hug: 11.4 }
function sceneB(x, t) {
  room(x, t, { now: true })
  stringLights(x, t, 24, 18)
  fireplace(x, t, 660, 640, { w: 260, h: 230 })
  snowWindow(x, t, 70, 120, 200, 200, { night: false })
  // the armchair
  R(x, INK, 120, 720, 300, 230); R(x, '#7a5cc0', 126, 726, 288, 218); R(x, '#8f72d4', 160, 800, 220, 60)
  // ♏ Scorpio at the stove with the spoon (right)
  pot(x, t, 690, 820, 0, '#4a6a7a')
  const sk = ease.outCubic(prog(t, B.spoon - 0.3, B.spoon + 0.2))
  const sx = lerp(980, 690, sk)
  const sH = [B.spoon, B.sit, B.how, B.hug]
  drawStarChar(x, sx, 680, 210, t, { color: SCO.color, glyph: SCO.glyph, mood: t > B.hug ? 'heart' : t > B.how ? 'sparkle' : 'happy', look: [-1, 0], seed: 9, hops: sH })
  beanie(x, starFrame(sx, 680, 210, t, { hops: sH, seed: 9 }), '#7fd0ff')
  // ♋ Cancer walks from the stove to the chair
  const ck = ease.inOutCubic(prog(t, B.sit, B.chair))
  const cx = lerp(560, 270, ck), cy = lerp(680, 770, ck)
  const cH = [B.sit + 0.2, B.chair, B.good, B.hug]
  let cm = t < B.sit ? 'wide' : 'happy'
  if (t > B.how) cm = 'sparkle'
  if (t > B.good) cm = 'happy'
  if (t > B.hug) cm = 'heart'
  const F = starFrame(cx, cy, 220, t, { hops: cH, seed: 7 })
  drawStarChar(x, cx, cy, 220, t, { color: CAN.color, glyph: CAN.glyph, mood: cm, look: t > B.chair && t < B.good ? [1, -1] : undefined, seed: 7, hops: cH })
  scarf(x, F, '#ff8fb1')
  if (t > B.tear) inSprite(x, F, () => tearsCells(x, t, t > B.good ? 2 : 1))
  if (t > B.chair) mug(x, t, cx + 80, cy + 120, { col: '#fff3c8', s: 0.8 })
  pisces(x, t, 470, 780, 100, t > B.tear ? 3 : 2, { mood: t > B.tear ? 'happy' : 'sparkle', look: [-1, 1], seed: 6 })
  speech(x, t, 640, 430, B.spoon + 0.15, 'sit. I’ve\ngot this.', { size: 40, tail: 1, life: 1.5, col: '#e9fff0' })
  speech(x, t, 620, 440, B.how, 'how are YOU?', { size: 40, tail: 1, life: 1.2, col: '#fffaf0' })
  speech(x, t, 290, 470, B.good, '…really good.', { size: 40, tail: 0, life: 1.6, col: '#ffe1ec' })
  if (t > B.hug) hearts(x, t, 450, 620, B.hug, { n: 6, life: 1.4, cell: 6, spread: 380 })
}

const EP = makeThenNow({
  id: 'nhve04', thing: 'Cancer’s holidays in', then: '2016', stamp: '12·24·2016', accent: '#9fe6ff',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: 'Cancer in 2016 fed *twenty people.*' },
    { t: 7.5, text: 'in 2026, someone else holds *the spoon.*' },
    { t: 12.92, text: 'the carer gets *cared for* too.' },
  ],
  last: 'Cared *for*, | for once.',
  cues: () => [
    ...[0.4, 0.95].map(v => ['pop', v, 659.25, 0.025, -0.3]),
    ...[0, 1, 2, 3, 4].map(i => ['whoosh', r3(A.serve + i * 0.12), 0.2, 0.02]), ['tick', r3(A.serve + 0.5), 0.05],
    ['pop', A.good, 1046.5, 0.04, 0.3], ['pop', A.ask, 587.33, 0.03, -0.3], ['tick', A.silence, 0.05],
    ['tom', A.sleep + 0.35, 140, { gain: 0.16, decay: 0.2 }],
    ['whoosh', B.spoon - 0.3, 0.3, 0.03], ['pop', r3(B.spoon + 0.15), 783.99, 0.035, 0.3],
    ['pop', B.how, 880, 0.035, 0.3], ['glitter', B.tear, r3(B.tear + 0.3)], ['pop', B.good, 698.46, 0.035, -0.3],
    ['pluck', B.hug, 1567.98, 0.045, 0.5, 0.3], ['glitter', B.hug, r3(B.hug + 0.4)],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
