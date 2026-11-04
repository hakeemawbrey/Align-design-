// nhve11: THEN vs NOW: HOLIDAYS, "Aquarius' holidays in 2016 / 2026" (20 s, b18 #11, music: jazzy · D)
// Look and props: ../../nhve01/scenes/thennow.js + holkit.js.
//   0–6.71    2016 (old-phone grade, "12·22·2016"): ♒ Aquarius hangs one ornament on a cactus at t = 0, very proud,
//             under an "ANTI-HOLIDAY PARTY" banner. Guests: "…is that a cactus?" Aquarius: "trees are mainstream."
//             A guest pokes it: "ow." ♓ Pisces cries: "it's kind of beautiful."
//   6.71      the card cut; the year sticker flips to 2026.
//   6.71–12.8 2026: the same cactus, now with lights and two stockings. ♌ Leo puts the star on top. Aquarius:
//             "you don't think it's weird?" Leo: "I think it's ours." The lights twinkle on. Pisces happy-sobs.
//   12.8–15.6 THE STARS: "weird is better *with company.*"  Last line: "Same cactus. *Our* lights."
import {
  makeThenNow, drawStarChar, signStar, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs,
  pop01, outK, r3, INK, BONE, GOLD, PINK, SW, SH, lerp, prog, ease, R, clamp,
} from '../../nhve01/scenes/thennow.js'
import { room, stringLights, sign, beanie, scarf, mark, snowWindow, couch, RED, GREEN, CREAM, LIGHTS } from '../../nhve01/scenes/holkit.js'

const AQU = signStar('aquarius'), LEO = signStar('leo')
const CAC = [
  '....GG....', '...GGGG...', '...GLGG...', '...GGGG...', 'G..GGLG..G', 'GG.GGGG.GG', 'GL.GGGG.LG', 'GGGGGLGGGG', '.GGGGGGGG.',
  '...GGGG...', '...GLGG...', '...GGGG...', '...GGGG...', '..PPPPPP..', '..PPPPPP..', '...PPPP...',
]
function cactus(x, t, cx, by, { lights = 0, ornaments = 1, topper = 0 } = {}) {
  const cell = 26
  drawBits(x, CAC, { G: '#4fae5a', L: '#8fe39a', P: '#c8643c' }, cx, by - CAC.length * cell / 2, cell)
  // spines
  for (let i = 0; i < 10; i++) R(x, '#fff3c8', cx - 110 + (i * 53) % 220, by - 400 + (i * 71) % 260, 4, 4)
  const orn = [[cx - 100, by - 250, RED], [cx + 100, by - 260, GOLD], [cx, by - 330, '#7fd0ff']]
  orn.slice(0, ornaments).forEach(([ox, oy, c]) => { R(x, INK, ox - 2, oy - 26, 4, 16); R(x, INK, ox - 14, oy - 12, 28, 28); R(x, c, ox - 10, oy - 8, 20, 20) })
  if (lights > 0) for (let i = 0; i < 12; i++) {
    const lx = cx - 52 + (i % 4) * 34 + (Math.floor(i / 4) % 2) * 16, ly = by - 380 + Math.floor(i / 4) * 80
    x.save(); x.globalAlpha = lights * (0.6 + 0.4 * Math.sin(t * 4 + i * 1.7)); x.shadowColor = LIGHTS[i % 5]; x.shadowBlur = 14; R(x, LIGHTS[i % 5], lx - 5, ly - 5, 10, 10); x.restore()
  }
  if (topper > 0) drawBits(x, ['..Y..', '.YYY.', 'YYYYY', '.YYY.', 'Y...Y'], { Y: GOLD }, cx, by - 440 - 20 * (1 - topper), 10 * Math.min(1, topper * 1.2))
}
function stocking(x, cx, cy, col, glyph) {
  drawBits(x, ['.CCC.', '.CCC.', '.CCC.', '.CCC.', 'CCCC.', 'CCCCC', 'CCCCC'], { C: col }, cx, cy, 14)
  R(x, INK, cx - 40, cy - 64, 80, 22); R(x, CREAM, cx - 36, cy - 60, 72, 14)
}

// ── THEN: 2016
const A = { hang: [0, 0.6], arrive: 1.4, isthat: 2.0, main: 3.0, poke: 4.0, ow: 4.25, sob: 4.9 }
function sceneA(x, t) {
  room(x, t, { now: false, wall: '#5a5a3a', wall2: '#66663f' })
  sign(x, 450, 110, 'ANTI-HOLIDAY PARTY', { size: 38, col: '#fff3c8', rot: -0.03 })
  snowWindow(x, t, 60, 200, 200, 200)
  cactus(x, t, 450, 860, { ornaments: 1 })
  // guests arriving, confused
  const gk = ease.outCubic(prog(t, A.arrive, A.arrive + 0.5))
  ;[['#e9b24a', 61], ['#ef5c94', 62]].forEach(([c, s], i) => drawStarChar(x, lerp(1000, 680 + i * 130, gk), 760, 140, t, { color: c, mood: t > A.ow - 0.05 && i === 0 ? 'wide' : t > A.isthat ? 'squint' : 'neutral', look: [-1, -1], seed: s, hops: [A.isthat, i === 0 ? A.poke : A.main + 0.6] }))
  // the poke
  if (t > A.poke - 0.2 && t < A.ow + 0.4) { const pk = Math.sin(Math.PI * prog(t, A.poke - 0.2, A.ow + 0.4)); R(x, INK, 640 - 70 * pk, 760, 60, 10) }
  pisces(x, t, 830, 560, 100, t > A.sob ? 3 : 1, { mood: t > A.sob ? 'sparkle' : 'neutral', look: [-1, 1], seed: 6 })
  // ♒ Aquarius hanging the ornament, proud
  const aH = [0.6, A.main, A.main + 0.3]
  drawStarChar(x, 210, 760, 220, t, { color: AQU.color, glyph: AQU.glyph, mood: t < 0.6 ? 'squint' : 'sparkle', look: t < 0.6 ? [1, -1] : [1, 0], seed: 11, hops: aH })
  bangs(x, starFrame(210, 760, 220, t, { hops: aH, seed: 11 }))
  if (t < 0.7) { R(x, INK, 300, 600 - 40 * prog(t, 0, 0.6), 24, 24); R(x, RED, 304, 604 - 40 * prog(t, 0, 0.6), 16, 16) }
  speech(x, t, 700, 520, A.isthat, '…is that\na cactus?', { size: 38, tail: 1, life: 0.95, col: '#fffaf0' })
  speech(x, t, 230, 480, A.main, 'trees are\nmainstream.', { size: 40, tail: -1, life: 1.0, col: '#e9fff0' })
  speech(x, t, 700, 560, A.ow, 'ow.', { size: 44, tail: 1, life: 0.6, col: '#ffd0d8' })
  speech(x, t, 760, 420, A.sob, 'it’s kind of\nbeautiful', { size: 34, tail: 1, life: 1.3, col: '#e9f6ff' })
}

// ── NOW: 2026
const B = { top: [7.2, 7.75], weird: 8.25, ours: 9.55, glow: 10.45, hug: 11.05 }
function sceneB(x, t) {
  room(x, t, { now: true })
  stringLights(x, t, 24, 18)
  couch(x, 450, 1050, 640, { col: '#7a5cc0' })
  // the mantel shelf with two stockings
  R(x, INK, 80, 300, 300, 22); R(x, '#e9d3b0', 86, 304, 288, 14)
  stocking(x, 160, 380, RED, ''); stocking(x, 300, 380, GREEN, '')
  cactus(x, t, 560, 860, { ornaments: 3, lights: clamp((t - B.glow) / 0.4) * 0.8 + 0.2, topper: ease.outCubic(prog(t, ...B.top)) })
  pisces(x, t, 100, 900, 110, t > B.hug ? 3 : 2, { mood: t > B.hug ? 'happy' : 'sparkle', look: [1, -1], seed: 6 })
  const lk = ease.outCubic(prog(t, B.top[0] - 0.3, B.top[0]))
  const lx = 760, ly = lerp(820, 640, Math.sin(Math.PI * prog(t, B.top[0] - 0.1, B.top[1] + 0.2)))
  const lH = [B.top[1], B.ours, B.hug]
  drawStarChar(x, lx, ly, 200, t, { color: LEO.color, glyph: LEO.glyph, mood: t > B.hug ? 'heart' : t > B.ours ? 'wink' : 'happy', look: [-1, t < B.top[1] ? -1 : 0], seed: 4, hops: lH })
  scarf(x, starFrame(lx, ly, 200, t, { hops: lH, seed: 4 }), '#ffd35a')
  const aH = [B.weird, B.glow, B.hug]
  drawStarChar(x, 260, 820, 220, t, { color: AQU.color, glyph: AQU.glyph, mood: t > B.hug ? 'heart' : t > B.ours + 0.2 ? 'sparkle' : t > B.weird ? 'neutral' : 'happy', look: [1, 0], seed: 11, hops: aH })
  beanie(x, starFrame(260, 820, 220, t, { hops: aH, seed: 11 }), '#ff8fb1')
  speech(x, t, 280, 560, B.weird, 'you don’t think\nit’s weird?', { size: 36, tail: -1, life: 1.2, col: '#fffaf0' })
  speech(x, t, 700, 480, B.ours, 'I think\nit’s ours.', { size: 42, tail: 1, life: 1.5, col: '#ffe36a' })
  sparkles(x, t, 560, 420, B.top[1], 10, 120, 1, [GOLD, PINK, BONE], 24)
  sparkles(x, t, 560, 640, B.glow, 12, 200, 2, LIGHTS, 22)
  if (t > B.hug) hearts(x, t, 450, 620, B.hug, { n: 7, life: 1.5, cell: 6, spread: 320 })
}

const EP = makeThenNow({
  id: 'nhve11', thing: 'Aquarius’ holidays in', then: '2016', stamp: '12·22·2016', accent: '#7fd0ff',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: 'Aquarius in 2016: an *anti*-holiday party.' },
    { t: 7.6, text: 'still the cactus. *new guest list.*' },
    { t: 12.92, text: 'weird is better *with company.*' },
  ],
  last: 'Same cactus. | *Our* lights.',
  cues: () => [
    ['tick', 0.6, 0.06], ['pop', 0.65, 1046.5, 0.03, -0.3], ['whoosh', A.arrive, 0.3, 0.03], ['pop', A.isthat, 659.25, 0.03, 0.4],
    ['pop', A.main, 783.99, 0.035, -0.3], ['tick', A.poke, 0.06], ['pop', A.ow, 1318.51, 0.04, 0.4], ['pop', A.sob, 587.33, 0.03, 0.4],
    ['whoosh', B.top[0], 0.3, 0.03], ['glitter', B.top[1], r3(B.top[1] + 0.4)], ['pop', B.top[1], 1174.66, 0.04, 0],
    ['pop', B.weird, 659.25, 0.03, -0.3], ['pop', B.ours, 1046.5, 0.04, 0.3],
    ...Array.from({ length: 6 }, (_, i) => ['pop', r3(B.glow + i * 0.07), 1318.51 + i * 110, 0.02, (i % 2 ? 0.3 : -0.3)]),
    ['pluck', B.hug, 1567.98, 0.045, 0.5, 0.3], ['glitter', B.hug, r3(B.hug + 0.4)],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
