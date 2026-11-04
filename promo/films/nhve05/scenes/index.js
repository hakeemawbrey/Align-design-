// nhve05: THEN vs NOW: HOLIDAYS, "Leo's holidays in 2016 / 2026" (18 s, b18 #5, music: chiptune · G)
// Look and props: ../../nhve01/scenes/thennow.js + holkit.js.
//   0–6.71    2016 (old-phone grade, "12·10·2016"): ♌ Leo on a ladder flings up the last string of lights at t = 0.
//             The house blazes "LEO" in bulbs; the whole street squints from its windows ("it's so… bright");
//             Leo: "you're welcome!!" ♓ Pisces in the snow, sobbing at the beauty.
//   6.71      the card cut; the year sticker flips to 2026.
//   6.71–12.8 2026: softer lights spell "US". Leo on the doorstep with ♍ Virgo turns a little spotlight onto
//             Virgo: "tonight's star: you." Virgo: "stop…" Leo: "never." Hearts. Pisces happy-sobs.
//   12.8–15.6 THE STARS: "the best glow is *shared.*"  Last line: "Bright, *for two*."
import {
  makeThenNow, drawStarChar, signStar, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs,
  pop01, outK, r3, INK, BONE, GOLD, PINK, SW, SH, lerp, prog, ease, R, clamp,
} from '../../nhve01/scenes/thennow.js'
import { nightSky, snowGround, snowfall, door, sign, beanie, scarf, mark, RED, GREEN, LIGHTS } from '../../nhve01/scenes/holkit.js'

const LEO = signStar('leo'), VIR = signStar('virgo')
const FONT = {
  L: ['X....', 'X....', 'X....', 'X....', 'X....', 'X....', 'XXXXX'], E: ['XXXXX', 'X....', 'X....', 'XXXX.', 'X....', 'X....', 'XXXXX'],
  O: ['.XXX.', 'X...X', 'X...X', 'X...X', 'X...X', 'X...X', '.XXX.'], U: ['X...X', 'X...X', 'X...X', 'X...X', 'X...X', 'X...X', '.XXX.'],
  S: ['.XXXX', 'X....', 'X....', '.XXX.', '....X', '....X', 'XXXX.'],
}
function bulbWord(x, t, word, cx, cy, cell, on, { glow = 1, cols = [GOLD] } = {}) {
  const w = word.length * 6 * cell - cell
  let k = 0
  for (const [n, ch] of [...word].entries()) {
    const bm = FONT[ch]
    for (let j = 0; j < 7; j++) for (let i = 0; i < 5; i++) if (bm[j][i] === 'X') {
      const bx = cx - w / 2 + n * 6 * cell + i * cell, by = cy - 3.5 * cell + j * cell
      const lit = on > (k++ % 17) / 17
      R(x, INK, bx - cell * 0.45, by - cell * 0.45, cell * 0.9, cell * 0.9)
      if (lit) {
        const c = cols[(i + j + n) % cols.length]
        x.save(); x.shadowColor = c; x.shadowBlur = 24 * glow; R(x, c, bx - cell * 0.36, by - cell * 0.36, cell * 0.72, cell * 0.72); x.restore()
      } else R(x, '#55505a', bx - cell * 0.3, by - cell * 0.3, cell * 0.6, cell * 0.6)
    }
  }
}
function house(x, now) {
  R(x, INK, 140, 300, 620, 420); R(x, now ? '#c98a5a' : '#a86a4a', 146, 306, 608, 414)
  x.fillStyle = INK; x.beginPath(); x.moveTo(110, 312); x.lineTo(450, 140); x.lineTo(790, 312); x.closePath(); x.fill()
  x.fillStyle = now ? '#7a3a4a' : '#5a2a3a'; x.beginPath(); x.moveTo(130, 304); x.lineTo(450, 154); x.lineTo(770, 304); x.closePath(); x.fill()
  R(x, '#f4f6ff', 150, 296, 600, 12)
  for (const wx of [190, 610]) { R(x, INK, wx - 6, 520, 112, 112); R(x, '#ffd88a', wx, 526, 100, 100); R(x, INK, wx + 46, 526, 8, 100) }
}

// ── THEN: 2016
const A = { fling: [0, 0.6], on: 1.0, full: 1.8, squint: 2.4, bright: 3.0, welcome: 4.1, sob: 4.6 }
function sceneA(x, t) {
  nightSky(x, t)
  house(x, false)
  snowGround(x, 720)
  door(x, 450, 720, { w: 140, h: 200, wreath: false })
  const on = clamp((t - A.on) / (A.full - A.on))
  bulbWord(x, t, 'LEO', 450, 420, 32, on, { glow: 1.6, cols: [GOLD, '#fff3a0', '#ffb04a'] })
  // the blaze washes over everything
  if (t > A.full) { x.save(); x.globalAlpha = 0.08 + 0.04 * Math.sin(t * 12); x.fillStyle = '#fff3a0'; x.fillRect(0, 0, SW, SH); x.restore() }
  // neighbours in their windows, squinting (sunglasses on the second)
  for (const [nx, c, sg] of [[70, '#38c4ec', false], [830, '#ef5c94', true]]) {
    R(x, INK, nx - 66, 420, 132, 150); R(x, '#2a2633', nx - 60, 426, 120, 138)
    drawStarChar(x, nx, 500, 100, t, { color: c, mood: t > A.squint ? 'squint' : 'sleepy', look: [nx < 450 ? 1 : -1, 0], seed: nx, hops: [A.squint], zzz: false })
    if (sg && t > A.squint + 0.3) { R(x, INK, nx - 34, 488, 68, 16); R(x, INK, nx - 30, 488, 24, 20); R(x, INK, nx + 6, 488, 24, 20) }
  }
  // ♓ Pisces in the snow
  pisces(x, t, 760, 850, 130, t > A.sob ? 3 : 1, { mood: t > A.sob ? 'sparkle' : 'wide', look: [-1, -1], seed: 6 })
  // the ladder + ♌ Leo
  R(x, INK, 200, 600, 14, 330); R(x, INK, 300, 600, 14, 330); for (let i = 0; i < 6; i++) R(x, INK, 200, 620 + i * 54, 114, 10)
  const lH = [0.05, A.on, A.full, A.welcome]
  const lx = 255, ly = 560
  drawStarChar(x, lx, ly, 200, t, { color: LEO.color, glyph: LEO.glyph, mood: t > A.welcome ? 'wink' : t > A.full ? 'sparkle' : 'wide', look: t < A.on ? [1, -1] : undefined, seed: 4, hops: lH })
  bangs(x, starFrame(lx, ly, 200, t, { hops: lH, seed: 4 }))
  // the flung string
  const fp = ease.outCubic(prog(t, ...A.fling))
  if (fp < 1) { x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(lx + 60, ly - 40); x.quadraticCurveTo(lx + 200, ly - 300 * fp, lx + 140 + 200 * fp, ly - 160 * fp); x.stroke() }
  speech(x, t, 450, 640, A.bright, 'it’s so… bright', { size: 34, tail: 0, life: 1.0, col: '#fffaf0' })
  speech(x, t, 330, 380, A.welcome, 'you’re\nwelcome!!', { size: 44, tail: -1, life: 1.5, col: '#ffe36a' })
  snowfall(x, t, { n: 24, seed: 3 })
}

// ── NOW: 2026
const B = { on: 7.0, spot: 7.9, star: 8.35, stop: 9.7, never: 10.45, hug: 11.2 }
function sceneB(x, t) {
  nightSky(x, t, { col: '#24306a', col2: '#2c3878' })
  house(x, true)
  snowGround(x, 720)
  door(x, 450, 720, { w: 140, h: 200, open: 0.0 })
  bulbWord(x, t, 'US', 450, 420, 32, clamp((t - B.on) / 0.6), { glow: 0.8, cols: LIGHTS })
  // a snow-star by the path
  pisces(x, t, 120, 860, 120, t > B.hug ? 3 : 2, { mood: t > B.hug ? 'happy' : 'sparkle', look: [1, -1], seed: 6 })
  // the spotlight cone onto Virgo
  const sp = ease.outCubic(prog(t, B.spot, B.spot + 0.4))
  if (sp > 0) {
    x.save(); x.globalAlpha = 0.35 * sp; x.fillStyle = '#fff3a0'
    x.beginPath(); x.moveTo(380, 760); x.lineTo(560 - 40, 660); x.lineTo(700, 980); x.closePath(); x.fill(); x.restore()
    x.save(); x.globalAlpha = 0.25 * sp; x.fillStyle = '#fff3a0'; x.beginPath(); x.ellipse(600, 820, 140 * sp, 170 * sp, 0, 0, Math.PI * 2); x.fill(); x.restore()
  }
  const lH = [B.spot, B.star, B.never, B.hug], vH = [B.star + 0.3, B.stop, B.hug]
  drawStarChar(x, 320, 820, 210, t, { color: LEO.color, glyph: LEO.glyph, mood: t > B.hug ? 'heart' : t > B.never ? 'wink' : 'sparkle', look: [1, 0], seed: 4, hops: lH })
  scarf(x, starFrame(320, 820, 210, t, { hops: lH, seed: 4 }), RED)
  // the little torch
  R(x, INK, 380, 790, 50, 30); R(x, '#d0d0e0', 384, 794, 42, 22); R(x, '#fff3a0', 422, 794, 8, 22)
  drawStarChar(x, 600, 820, 210, t, { color: VIR.color, glyph: VIR.glyph, mood: t > B.hug ? 'heart' : t > B.star + 0.3 ? 'happy' : 'neutral', look: [-1, 0], seed: 8, hops: vH, blush: t > B.star + 0.3 ? 1 : undefined })
  beanie(x, starFrame(600, 820, 210, t, { hops: vH, seed: 8 }), '#9fe6b0')
  speech(x, t, 330, 560, B.star, 'tonight’s star:\nyou.', { size: 40, tail: -1, life: 1.6, col: '#fff3c8' })
  speech(x, t, 620, 580, B.stop, 'stop…', { size: 42, tail: 1, life: 0.9, col: '#e9fff0' })
  speech(x, t, 330, 580, B.never, 'never.', { size: 44, tail: -1, life: 1.2, col: '#ffe36a' })
  if (t > B.hug) hearts(x, t, 460, 680, B.hug, { n: 7, life: 1.5, cell: 6, spread: 300 })
  sparkles(x, t, 600, 700, B.spot + 0.3, 8, 120, 1, [GOLD, PINK, BONE], 22)
  snowfall(x, t, { n: 20, seed: 5 })
}

const EP = makeThenNow({
  id: 'nhve05', thing: 'Leo’s holidays in', then: '2016', stamp: '12·10·2016', accent: '#ffb84a',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: 'Leo in 2016 lit up *the whole street.*' },
    { t: 7.4, text: 'in 2026, the spotlight *turns around.*' },
    { t: 12.92, text: 'the best glow is *shared.*' },
  ],
  last: 'Bright, | *for two*.',
  cues: () => [
    ['whoosh', 0.02, 0.35, 0.04],
    ...Array.from({ length: 8 }, (_, i) => ['tick', r3(A.on + i * 0.1), 0.04]), ['boom', A.full, 0.12], ['glitter', A.full, r3(A.full + 0.5)],
    ['pop', A.squint, 587.33, 0.03, 0.4], ['pop', A.bright, 659.25, 0.03, 0], ['pop', A.welcome, 1046.5, 0.045, -0.3], ['pop', r3(A.welcome + 0.12), 1318.51, 0.04, -0.3],
    ...Array.from({ length: 5 }, (_, i) => ['tick', r3(B.on + i * 0.12), 0.03]),
    ['tick', B.spot, 0.06], ['glitter', B.spot + 0.3, r3(B.spot + 0.6)], ['pop', B.star, 880, 0.035, -0.3],
    ['pop', B.stop, 698.46, 0.03, 0.3], ['pop', B.never, 1046.5, 0.04, -0.3],
    ['pluck', B.hug, 1567.98, 0.045, 0.5, 0.3], ['glitter', B.hug, r3(B.hug + 0.4)],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
