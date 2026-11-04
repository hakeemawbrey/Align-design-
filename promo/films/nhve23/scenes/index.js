// nhve23: THEN vs NOW: HOLIDAYS, "The snow day in 2016 / 2026" (18 s, b18 #23, music: lofi · Ab)
// Look and props: ../../nhve01/scenes/thennow.js + holkit.js.
//   0–6.71    2016 (old-phone grade, "12·12·2016"): ♒ Aquarius' face pressed to a frosty window at t = 0, snow
//             pouring. A text from ♊ Gemini: "snow day!! come out?" Aquarius: "it's too cold" … "cute snow".
//             Through the window Gemini builds a snow-star alone; Aquarius under a blanket. ♓ Pisces outside, crying.
//   6.71      the card cut; the year sticker flips to 2026.
//   6.71–12.8 2026: outside, mittens on, the two of them build a lopsided snow-star. Aquarius: "it's… lopsided."
//             Gemini: "it's got character." Cocoa after, cold hands around the mugs. Pisces happy-sobs.
//   12.8–15.6 THE STARS: "say yes to *the cold stuff.*"  Last line: "Cold hands. *Warm* plan."
import {
  makeThenNow, drawStarChar, signStar, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs,
  pop01, outK, r3, INK, BONE, GOLD, PINK, SW, SH, lerp, prog, ease, R, clamp,
} from '../../nhve01/scenes/thennow.js'
import { room, stringLights, sign, beanie, scarf, mark, phone, couch, mug, nightSky, snowGround, snowfall, tree, RED, GREEN, CREAM, SNOW } from '../../nhve01/scenes/holkit.js'

const AQU = signStar('aquarius'), GEM = signStar('gemini')
const SSTAR = ['....X....', '...XXX...', 'XXXXXXXXX', '.XXXXXXX.', '..XXXXX..', '.XXX.XXX.', 'XX.....XX']
function snowStar(x, cx, by, k, lop = 0) {
  if (k <= 0) return
  const n = Math.ceil(k * SSTAR.length)
  const rows = SSTAR.slice(SSTAR.length - n)
  drawBits(x, rows, { X: '#dce6ff' }, cx, by - rows.length * 13, 26, { rot: lop })
  if (k > 0.95) { R(x, INK, cx - 24 + lop * 60, by - 130, 10, 10); R(x, INK, cx + 14 + lop * 60, by - 127, 10, 10) }
}

// ── THEN: 2016
const A = { text: 1.3, cold: 2.3, cute: 3.3, blanket: 4.3, sob: 4.6 }
function sceneA(x, t) {
  // the outside, through a big window
  R(x, '#a9c6ff', 0, 0, SW, SH)
  snowGround(x, 640)
  snowStar(x, 640, 820, prog(t, 1.0, 5.5), 0)
  drawStarChar(x, 780, 720, 130, t, { color: GEM.color, glyph: GEM.glyph, mood: 'happy', look: [-1, 0], seed: 5, hops: [2.0, 3.0, 4.0, 5.0] })
  pisces(x, t, 120, 700, 110, t > A.sob ? 3 : 2, { mood: 'wide', look: [1, 0], seed: 6 })
  snowfall(x, t, { n: 50, seed: 1, speed: 1.4, size: 8 })
  // the window frame + frost
  R(x, INK, 0, 0, SW, 30); R(x, INK, 0, 0, 30, SH); R(x, INK, SW - 30, 0, 30, SH); R(x, INK, 0, 980, SW, 80); R(x, CREAM, 6, 6, SW - 12, 18); R(x, '#e9d3b0', 0, 990, SW, 70)
  R(x, INK, SW / 2 - 8, 0, 16, 980)
  x.save(); const fg = x.createRadialGradient(SW / 2, SH / 2, SH * 0.25, SW / 2, SH / 2, SH * 0.7); fg.addColorStop(0, 'rgba(255,255,255,0)'); fg.addColorStop(1, 'rgba(240,248,255,0.65)'); x.fillStyle = fg; x.fillRect(0, 0, SW, SH); x.restore()
  // ♒ Aquarius, face on the glass (big, in the foreground), then under a blanket
  const bl = ease.outCubic(prog(t, A.blanket, A.blanket + 0.4))
  const aH = [A.text, A.cold, A.cute]
  const squash = t < A.text ? 0.14 : 0.02
  drawStarChar(x, 300, lerp(860, 900, bl), 320, t, { color: AQU.color, glyph: AQU.glyph, mood: t > A.blanket ? 'sleepy' : t > A.cold ? 'squint' : 'wide', look: t > A.cold && t < A.blanket ? [1, 1] : [1, -1], seed: 11, hops: aH, squash, zzz: false })
  bangs(x, starFrame(300, lerp(860, 900, bl), 320, t, { hops: aH, seed: 11, squash }))
  if (bl > 0) { R(x, INK, 100, 1060 - 210 * bl, 420, 220); for (let i = 0; i < 6; i++) R(x, i % 2 ? '#7a5cc0' : '#9a7ce0', 106 + i * 68, 1066 - 210 * bl, 68, 210) }
  if (t > A.text - 0.2 && t < A.blanket) phone(x, 520, 860, { s: 1.1, text: t < A.cold ? 'snow day!!\ncome out?' : t < A.cute ? 'it’s too cold' : 'cute snow', rot: -0.08 })
}

// ── NOW: 2026
const B = { build: [6.9, 9.4], lop: 9.6, char: 10.35, cocoa: 11.0 }
function sceneB(x, t) {
  R(x, '#bcd6ff', 0, 0, SW, SH)
  for (let j = 0; j < 5; j++) R(x, '#c8deff', 0, j * 120, SW, 50)
  tree(x, t, 110, 640, 300, { now: true }); tree(x, t, 820, 640, 340, { now: true })
  snowGround(x, 640)
  const bk = prog(t, ...B.build)
  const lop = t > B.lop ? 0.18 : 0.18 * bk
  snowStar(x, 450, 900, bk, lop)
  pisces(x, t, 800, 900, 100, t > B.char ? 3 : 2, { mood: t > B.char ? 'happy' : 'sparkle', look: [-1, -1], seed: 6 })
  const building = t < B.build[1]
  const aH = building ? Array.from({ length: 6 }, (_, k) => B.build[0] + k * 0.42) : [B.lop, B.cocoa]
  const gH = building ? Array.from({ length: 6 }, (_, k) => B.build[0] + 0.2 + k * 0.42) : [B.char, B.cocoa]
  const shiver = t > B.cocoa - 0.3 ? 3 * Math.sin(t * 50) : 0
  drawStarChar(x, 200 + shiver, 800, 200, t, { color: AQU.color, glyph: AQU.glyph, mood: t > B.cocoa ? 'happy' : t > B.lop ? 'squint' : 'sparkle', look: [1, 0], seed: 11, hops: aH })
  beanie(x, starFrame(200, 800, 200, t, { hops: aH, seed: 11 }), '#ff8fb1'); scarf(x, starFrame(200, 800, 200, t, { hops: aH, seed: 11 }), '#ffd35a')
  drawStarChar(x, 680 - shiver, 800, 190, t, { color: GEM.color, glyph: GEM.glyph, mood: t > B.cocoa ? 'heart' : t > B.char ? 'wink' : 'happy', look: [-1, 0], seed: 5, hops: gH })
  beanie(x, starFrame(680, 800, 190, t, { hops: gH, seed: 5 }), '#7fd0ff')
  if (t > B.cocoa) { mug(x, t, 280, 900, { col: '#ff8fb1', s: 0.9 }); mug(x, t, 600, 900, { col: '#9fe6ff', s: 0.9 }); hearts(x, t, 450, 560, B.cocoa + 0.2, { n: 6, life: 1.4, cell: 6, spread: 300 }) }
  speech(x, t, 230, 520, B.lop, 'it’s…\nlopsided.', { size: 40, tail: -1, life: 1.0, col: '#fffaf0' })
  speech(x, t, 660, 520, B.char, 'it’s got\ncharacter.', { size: 40, tail: 1, life: 1.4, col: '#ffe36a' })
  snowfall(x, t, { n: 28, seed: 4, speed: 0.7 })
}

const EP = makeThenNow({
  id: 'nhve23', thing: 'The snow day in', then: '2016', stamp: '12·12·2016', accent: '#7fd0ff',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: '2016: snow day, *seen from inside.*' },
    { t: 7.4, text: '2026: *mittens on.* going out.' },
    { t: 12.92, text: 'say yes to *the cold stuff.*' },
  ],
  last: 'Cold hands. | *Warm* plan.',
  cues: () => [
    ['tom', 0.05, 120, { gain: 0.12, decay: 0.1 }], ['tom', A.text - 0.1, 80, { gain: 0.12, decay: 0.08 }], ['pop', A.text, 1046.5, 0.035, 0.3],
    ...Array.from({ length: 5 }, (_, i) => ['tick', r3(A.cold - 0.5 + i * 0.1), 0.02]), ['pop', A.cold, 587.33, 0.03, -0.3], ['pop', A.cute, 659.25, 0.03, -0.3],
    ['whoosh', A.blanket, 0.4, 0.03],
    ...Array.from({ length: 6 }, (_, i) => ['tom', r3(B.build[0] + i * 0.42), 150 + i * 15, { gain: 0.08, decay: 0.1 }]),
    ['pop', B.lop, 659.25, 0.03, -0.3], ['pop', B.char, 1046.5, 0.04, 0.3], ['pluck', B.cocoa, 1567.98, 0.045, 0.5, 0.3], ['glitter', B.cocoa, r3(B.cocoa + 0.4)],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
