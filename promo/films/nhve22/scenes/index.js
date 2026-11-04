// nhve22: THEN vs NOW: HOLIDAYS, "Holiday plans in 2016 / 2026" (title: Whose family?) (20 s, b18 #22, music: dreamy · G)
// Look and props: ../../nhve01/scenes/thennow.js + holkit.js.
//   0–6.71    2016 (old-phone grade, "12·25·2016"): ♉ Taurus and ♏ Scorpio are tugged in two directions by two family
//             tables at t = 0 (a scarf in each family's grip). They sprint to dinner one (LATE), then dinner two (LATE
//             again), two desserts each. Taurus: "we were late… twice." ♓ Pisces at one table, crying.
//   6.71      the card cut; the year sticker flips to 2026.
//   6.71–12.8 2026: one calm plan on the fridge: "LUNCH: YOURS · DINNER: MINE · WALK: US". Then the walk home in the
//             snow, side by side. Scorpio: "best part of the day?" Taurus: "this part." Hearts. Pisces on a bench.
//   12.8–15.6 THE STARS: "save a little *for just you two.*"  Last line: "Both families. *Our* walk."
import {
  makeThenNow, drawStarChar, signStar, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs,
  pop01, outK, r3, INK, BONE, GOLD, PINK, SW, SH, lerp, prog, ease, R, clamp,
} from '../../nhve01/scenes/thennow.js'
import { room, stringLights, sign, beanie, scarf, mark, table, clockFace, nightSky, snowGround, snowfall, tree, RED, GREEN, CREAM, INTER } from '../../nhve01/scenes/holkit.js'

const TAU = signStar('taurus'), SCO = signStar('scorpio')
const FAM1 = [['#e9b24a', 111], ['#38c4ec', 112]], FAM2 = [['#a35cf0', 113], ['#5fd38a', 114]]

function pie(x, cx, cy) { R(x, INK, cx - 40, cy - 16, 80, 32); R(x, '#d9903f', cx - 36, cy - 12, 72, 24); R(x, '#a8503a', cx - 30, cy - 12, 60, 8) }

// ── THEN: 2016
const A = { tug: [0, 1.5], run1: 1.6, run2: 3.0, late: [2.0, 3.4], twice: 4.6, sob: 3.7 }
function sceneA(x, t) {
  room(x, t, { now: false })
  stringLights(x, t, 24, 18)
  clockFace(x, 450, 170, t < A.run1 ? '5:58 PM' : t < A.run2 ? '6:40 PM' : '8:15 PM', { size: 38, col: '#ff6a3a' })
  // two family tables, left and right
  table(x, 160, 820, 260, { now: false, cloth: '#e05a6a' }); table(x, 740, 820, 260, { now: false, cloth: '#7fd0ff' })
  FAM1.forEach(([c, s], i) => drawStarChar(x, 90 + i * 130, 720, 110, t, { color: c, mood: t > A.late[0] && t < A.run2 ? 'eyeroll' : 'neutral', look: [1, 0], seed: s, hops: [A.late[0]] }))
  FAM2.forEach(([c, s], i) => drawStarChar(x, 680 + i * 130, 720, 110, t, { color: c, mood: t > A.late[1] ? 'eyeroll' : 'neutral', look: [-1, 0], seed: s, hops: [A.late[1]] }))
  pisces(x, t, 740, 600, 90, t > A.sob ? 3 : 1, { mood: t > A.sob ? 'wide' : 'neutral', look: [-1, 1], seed: 6 })
  pie(x, 160, 810); pie(x, 740, 810)
  // the couple: tug-of-war, then sprint left, then sprint right
  const tug = t < A.tug[1] ? Math.sin(t * 8) * 30 : 0
  let cx = 450 + tug
  if (t > A.run1) cx = lerp(450, 240, ease.inOutCubic(prog(t, A.run1, A.run1 + 0.4)))
  if (t > A.run2) cx = lerp(240, 640, ease.inOutCubic(prog(t, A.run2, A.run2 + 0.4)))
  if (t > A.twice - 0.4) cx = lerp(640, 450, ease.inOutCubic(prog(t, A.twice - 0.4, A.twice)))
  const H = [A.run1, A.run2, A.twice], stretch = t < A.tug[1] ? 0.08 * Math.sin(t * 8) : 0
  drawStarChar(x, cx - 90, 790, 170, t, { color: TAU.color, glyph: TAU.glyph, mood: t > A.twice ? 'sleepy' : 'wide', look: [-1, 0], seed: 2, hops: H, squash: -stretch, zzz: false })
  bangs(x, starFrame(cx - 90, 790, 170, t, { hops: H, seed: 2, squash: -stretch }))
  drawStarChar(x, cx + 90, 790, 170, t, { color: SCO.color, glyph: SCO.glyph, mood: t > A.twice ? 'sleepy' : 'wide', look: [1, 0], seed: 9, hops: H.map(v => v + 0.05), squash: stretch, zzz: false })
  // the tug scarves
  if (t < A.tug[1]) { x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.moveTo(220, 760); x.lineTo(cx - 160, 790); x.moveTo(cx + 160, 790); x.lineTo(680, 760); x.stroke(); x.strokeStyle = RED; x.lineWidth = 6; x.stroke() }
  A.late.forEach((v, i) => sign(x, i ? 740 : 160, 560, 'LATE', { size: 34, col: '#ffd0d8', rot: i ? 0.12 : -0.12, k: pop01(t, v, 0.25, 3) * outK(t, [v + 1.0, v + 1.2]) }))
  if (t > A.run2 + 0.6) sign(x, 450, 330, 'DESSERTS: 2', { size: 30, col: '#fff3c8', rot: 0.04, k: pop01(t, A.run2 + 0.6, 0.3) })
  speech(x, t, 450, 560, A.twice, 'we were late…\ntwice.', { size: 40, tail: 0, life: 1.7, col: '#fffaf0' })
}

// ── NOW: 2026
const B = { plan: [7.0, 8.4], point: 8.6, walk: 9.35, best: 10.0, this: 10.8, hug: 11.4 }
function sceneB(x, t) {
  if (t < B.walk) {
    room(x, t, { now: true })
    stringLights(x, t, 24, 18)
    // the fridge with the plan
    R(x, INK, 470, 150, 340, 700); R(x, '#e9f2ff', 476, 156, 328, 688); R(x, INK, 476, 400, 328, 6); R(x, INK, 760, 260, 14, 80); R(x, INK, 760, 470, 14, 120)
    x.save(); x.translate(620, 560); x.rotate(-0.03)
    R(x, INK, -140, -120, 280, 240); R(x, '#fff3a0', -134, -114, 268, 228); R(x, RED, -10, -126, 20, 20)
    const rows = ['LUNCH: YOURS', 'DINNER: MINE', 'WALK: US ♡']
    const n = prog(t, ...B.plan) * 3
    x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
    rows.forEach((r, i) => { const k = clamp(n - i); if (k > 0) x.fillText(r.slice(0, Math.ceil(r.length * k)), -118, -60 + i * 64) })
    x.restore()
    const H = [B.plan[0], B.point]
    drawStarChar(x, 160, 780, 200, t, { color: TAU.color, glyph: TAU.glyph, mood: 'happy', look: [1, 0], seed: 2, hops: H })
    scarf(x, starFrame(160, 780, 200, t, { hops: H, seed: 2 }), GREEN)
    drawStarChar(x, 360, 800, 190, t, { color: SCO.color, glyph: SCO.glyph, mood: t > B.point ? 'sparkle' : 'happy', look: [1, -1], seed: 9, hops: H.map(v => v + 0.1) })
    beanie(x, starFrame(360, 800, 190, t, { hops: H.map(v => v + 0.1), seed: 9 }), RED)
  } else {
    nightSky(x, t, { col: '#24306a', col2: '#2c3878' })
    tree(x, t, 150, 700, 300, { now: true }); tree(x, t, 780, 700, 340, { now: true })
    snowGround(x, 700)
    // lamp post
    R(x, INK, 600, 300, 14, 420); R(x, INK, 576, 280, 62, 40); R(x, '#ffe9a0', 582, 286, 50, 28)
    x.save(); x.globalAlpha = 0.18; x.fillStyle = '#ffe9a0'; x.beginPath(); x.moveTo(607, 310); x.lineTo(470, 720); x.lineTo(744, 720); x.closePath(); x.fill(); x.restore()
    R(x, INK, 700, 860, 180, 20); R(x, '#9a5f38', 704, 864, 172, 12)
    pisces(x, t, 790, 800, 100, 3, { mood: t > B.this ? 'happy' : 'sparkle', look: [-1, 0], seed: 6 })
    const wk = ease.outCubic(prog(t, B.walk, B.walk + 1.2))
    const tx = lerp(-60, 300, wk), sx = tx + 180
    const tH = [B.this, B.hug], sH = [B.best, B.hug]
    drawStarChar(x, tx, 820, 200, t, { color: TAU.color, glyph: TAU.glyph, mood: t > B.hug ? 'heart' : 'happy', look: [1, 0], seed: 2, hops: tH })
    scarf(x, starFrame(tx, 820, 200, t, { hops: tH, seed: 2 }), GREEN)
    drawStarChar(x, sx, 820, 190, t, { color: SCO.color, glyph: SCO.glyph, mood: t > B.hug ? 'heart' : 'happy', look: [-1, 0], seed: 9, hops: sH })
    beanie(x, starFrame(sx, 820, 190, t, { hops: sH, seed: 9 }), RED)
    speech(x, t, sx + 20, 560, B.best, 'best part\nof the day?', { size: 36, tail: 1, life: 0.9, col: '#e9fff0' })
    speech(x, t, tx, 560, B.this, 'this part.', { size: 44, tail: -1, life: 1.4, col: '#ffe36a' })
    if (t > B.hug) hearts(x, t, (tx + sx) / 2, 660, B.hug, { n: 7, life: 1.4, cell: 6, spread: 240 })
    snowfall(x, t, { n: 24, seed: 3 })
  }
}

const EP = makeThenNow({
  id: 'nhve22', thing: 'Holiday plans in', then: '2016', stamp: '12·25·2016', accent: '#ff8fb1',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: '2016: two dinners, *both late.*' },
    { t: 7.5, text: '2026: one plan, *made together.*' },
    { t: 12.92, text: 'save a little *for just you two.*' },
  ],
  last: 'Both families. | *Our* walk.',
  cues: () => [
    ...Array.from({ length: 6 }, (_, i) => ['tom', r3(0.1 + i * 0.25), 110 + (i % 2) * 30, { gain: 0.1, decay: 0.1 }]),
    ['whoosh', A.run1, 0.4, 0.03], ['pop', A.late[0], 523.25, 0.035, -0.3], ['whoosh', A.run2, 0.4, 0.03], ['pop', A.late[1], 493.88, 0.035, 0.3],
    ['pop', A.run2 + 0.6, 783.99, 0.025, 0], ['pop', A.twice, 440, 0.03, 0],
    ...Array.from({ length: 6 }, (_, i) => ['tick', r3(B.plan[0] + i * 0.22), 0.025]), ['pop', B.point, 1046.5, 0.035, 0.3],
    ['whoosh', B.walk - 0.05, 0.4, 0.03], ['bell', B.walk + 0.1, 1567.98, 0.02, 1.0, 0], ['pop', B.best, 880, 0.03, 0.3], ['pop', B.this, 1174.66, 0.045, -0.3],
    ['pluck', B.hug, 1567.98, 0.045, 0.5, 0.3], ['glitter', B.hug, r3(B.hug + 0.4)],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
