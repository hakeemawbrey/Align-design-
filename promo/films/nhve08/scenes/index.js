// nhve08: THEN vs NOW: HOLIDAYS, "Scorpio's holidays in 2016 / 2026" (18 s, b18 #8, music: pop · E)
// Look and props: ../../nhve01/scenes/thennow.js + holkit.js.
//   0–6.71    2016 (old-phone grade, "12·16·2016"): ♏ Scorpio squints at a red-string board at t = 0. The secret gift
//             swap starts; Scorpio points, deadpan, and names every secret giver ("you. you. and you."); the room:
//             "HOW?!" Scorpio: "the wrapping." ♓ Pisces sobs: it was meant to be a surprise.
//   6.71      the card cut; the year sticker flips to 2026.
//   6.71–12.8 2026: Scorpio is the secret giver. ♐ Sagittarius opens a mug with a little mountain on it:
//             "you remembered THAT?" Scorpio: "you said it once. in spring." Hearts. Pisces happy-sobs.
//   12.8–15.6 THE STARS: "use the noticing *for love.*"  Last line: "Noticed *everything*. Kindly."
import {
  makeThenNow, drawStarChar, signStar, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs,
  pop01, outK, r3, INK, BONE, GOLD, PINK, SW, SH, lerp, prog, ease, R, clamp,
} from '../../nhve01/scenes/thennow.js'
import { room, stringLights, gift, sign, mug, beanie, scarf, mark, tree, fireplace, couch, RED, GREEN, CREAM } from '../../nhve01/scenes/holkit.js'

const SCO = signStar('scorpio'), SAG = signStar('sagittarius')
const GUESTS = [[signStar('gemini'), 21], [signStar('cancer'), 22], [signStar('leo'), 23]]

function board(x, t) {
  R(x, INK, 60, 150, 380, 300); R(x, '#c9935a', 66, 156, 368, 288)
  const pins = [[130, 220], [370, 210], [250, 300], [120, 390], [380, 380]]
  x.strokeStyle = '#e0453a'; x.lineWidth = 4; x.beginPath()
  for (const [a, b] of [[0, 2], [1, 2], [2, 3], [2, 4], [0, 1]]) { x.moveTo(...pins[a]); x.lineTo(...pins[b]) }
  x.stroke()
  pins.forEach(([px, py], i) => { R(x, INK, px - 34, py - 30, 68, 60); R(x, '#fffaf0', px - 30, py - 26, 60, 52); drawBits(x, ['..X..', '.XXX.', 'XXXXX', '.XXX.', 'X...X'], { X: ['#e9b24a', '#ef5c94', '#38c4ec', '#5fd38a', '#a35cf0'][i] }, px, py, 7); R(x, RED, px - 4, py - 34, 8, 8) })
}

// ── THEN: 2016
const A = { point: [1.7, 2.25, 2.8], how: 3.7, wrap: 4.5, sob: 5.1 }
function sceneA(x, t) {
  room(x, t, { now: false })
  stringLights(x, t, 24, 18)
  board(x, t)
  tree(x, t, 780, 640, 360, { now: false })
  // the three secret givers holding gifts
  GUESTS.forEach(([s, seed], i) => {
    const gx = 470 + i * 150, gy = 760, caught = t > A.point[i]
    drawStarChar(x, gx, gy, 150, t, { color: s.color, glyph: s.glyph, mood: caught ? 'wide' : 'happy', look: caught ? [-1, 0] : undefined, seed, hops: [A.point[i], A.how] })
    gift(x, gx, gy + 140, 80, 60, { col: [RED, GREEN, '#7fd0ff'][i], rib: GOLD })
    if (caught) sign(x, gx, gy - 130, 'CAUGHT', { size: 22, col: '#ffd0d8', rot: (i - 1) * 0.12, k: pop01(t, A.point[i], 0.25, 3) })
  })
  pisces(x, t, 820, 560, 100, t > A.sob ? 3 : 1, { mood: t > A.sob ? 'wide' : 'neutral', look: [-1, 1], seed: 6 })
  // ♏ Scorpio
  const pi = A.point.filter(v => t > v).length
  const sH = [...A.point, A.wrap]
  const sx = 220, sy = 720
  drawStarChar(x, sx, sy, 230, t, { color: SCO.color, glyph: SCO.glyph, mood: t < A.point[0] ? 'squint' : t > A.wrap ? 'eyeroll' : 'squint', look: t < A.point[0] ? [-1, -1] : [1, 0], seed: 9, hops: sH })
  bangs(x, starFrame(sx, sy, 230, t, { hops: sH, seed: 9 }))
  // the pointing arm toward the current suspect
  if (pi > 0 && t < A.how) { const tx = 470 + (pi - 1) * 150; x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.moveTo(sx + 100, sy); x.lineTo(lerp(sx + 100, tx - 70, 0.7), sy - 20); x.stroke(); x.strokeStyle = SCO.color; x.lineWidth = 5; x.stroke() }
  const names = ['you.', 'you.', 'and you.']
  A.point.forEach((v, i) => speech(x, t, 260, 470, v, names[i], { size: 42, tail: -1, life: 0.5, col: '#fffaf0' }))
  speech(x, t, 620, 470, A.how, 'HOW?!', { size: 52, tail: 0, life: 0.85, col: '#ffe36a', shake: 3 })
  speech(x, t, 260, 470, A.wrap, 'the wrapping.', { size: 40, tail: -1, life: 1.6, col: '#fffaf0' })
}

// ── NOW: 2026
const B = { give: 7.1, open: [7.9, 8.6], that: 8.85, spring: 9.95, gasp: 11.0, hug: 11.4 }
function sceneB(x, t) {
  room(x, t, { now: true })
  stringLights(x, t, 24, 18)
  fireplace(x, t, 450, 640, { w: 280, h: 240 })
  tree(x, t, 800, 640, 360, { now: true })
  couch(x, 450, 1000, 600, { col: '#7a5cc0' })
  pisces(x, t, 110, 820, 110, t > B.gasp ? 3 : 2, { mood: t > B.gasp ? 'happy' : 'sparkle', look: [1, 0], seed: 6 })
  const sH = [B.give, B.spring, B.hug], gH = [B.open[1], B.that, B.gasp]
  drawStarChar(x, 300, 790, 220, t, { color: SCO.color, glyph: SCO.glyph, mood: t > B.hug ? 'heart' : t > B.spring ? 'wink' : 'happy', look: [1, 0], seed: 9, hops: sH })
  scarf(x, starFrame(300, 790, 220, t, { hops: sH, seed: 9 }), RED)
  drawStarChar(x, 600, 790, 220, t, { color: SAG.color, glyph: SAG.glyph, mood: t > B.hug ? 'heart' : t > B.that - 0.1 ? 'wide' : 'happy', look: [-1, 0], seed: 8, hops: gH })
  beanie(x, starFrame(600, 790, 220, t, { hops: gH, seed: 8 }), GREEN)
  const op = ease.outCubic(prog(t, ...B.open))
  if (t < B.open[1] + 0.5) gift(x, lerp(420, 560, ease.inOutCubic(prog(t, B.give, B.give + 0.5))), 960, 120, 90, { col: '#a35cf0', rib: GOLD, open: op, alpha: 1 - prog(t, B.open[1] + 0.2, B.open[1] + 0.5) })
  if (t < B.open[0]) sign(x, 500, 850, 'FROM: ???', { size: 20, col: '#fffaf0', rot: 0.1 })
  if (t > B.open[1]) {
    // the mug with a little pixel mountain
    const k = pop01(t, B.open[1], 0.3, 2.4)
    x.save(); x.translate(455, 945); x.scale(1.35 * k, 1.35 * k); mug(x, t, 0, 0, { col: '#fffaf0', steam: false })
    drawBits(x, ['...W...', '..WGW..', '.GGGGG.', 'GGGGGGG'], { W: '#ffffff', G: '#5a8a6a' }, 0, -28, 4, { outline: null }); x.restore()
    sparkles(x, t, 455, 890, B.open[1], 10, 120, 1, [GOLD, PINK, BONE], 22)
  }
  speech(x, t, 600, 490, B.that, 'you remembered\nTHAT?', { size: 40, tail: 1, life: 1.0, col: '#ffe36a' })
  speech(x, t, 320, 480, B.spring, 'you said it once.\nin spring.', { size: 36, tail: -1, life: 1.4, col: '#fffaf0' })
  if (t > B.hug) hearts(x, t, 450, 640, B.hug, { n: 7, life: 1.4, cell: 6, spread: 320 })
  mark(x, t, 640, 560, B.gasp, '!', { col: '#ff4f86' })
}

const EP = makeThenNow({
  id: 'nhve08', thing: 'Scorpio’s holidays in', then: '2016', stamp: '12·16·2016', accent: '#ff5c7a',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: 'Scorpio in 2016 *solved* the gift swap.' },
    { t: 7.4, text: 'same detective. *new case.*' },
    { t: 12.92, text: 'use the noticing *for love.*' },
  ],
  last: 'Noticed *everything*. | Kindly.',
  cues: () => [
    ['tick', 0.3, 0.04], ['tick', 0.9, 0.04],
    ...A.point.map((v, i) => ['pop', v, 659.25 + i * 110, 0.04, 0.2]), ...A.point.map(v => ['tick', r3(v + 0.05), 0.05]),
    ['boom', A.how, 0.1], ['pop', A.how, 1318.51, 0.05, 0], ['pop', A.wrap, 523.25, 0.035, -0.3],
    ['whoosh', B.give, 0.3, 0.03], ['tick', B.open[0], 0.05], ['glitter', B.open[1], r3(B.open[1] + 0.4)], ['pop', B.open[1], 1174.66, 0.04, 0.3],
    ['pop', B.that, 1046.5, 0.04, 0.3], ['pop', B.spring, 783.99, 0.035, -0.3], ['pluck', B.hug, 1567.98, 0.045, 0.5, 0.3], ['glitter', B.hug, r3(B.hug + 0.4)],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
