// nhve06: THEN vs NOW: HOLIDAYS, "Virgo's holidays in 2016 / 2026" (18 s, b18 #6, music: jazzy · F)
// Look and props: ../../nhve01/scenes/thennow.js + holkit.js.
//   0–6.71    2016 (old-phone grade, "12·23·2016"): ♍ Virgo scrubs a plate at the sink at t = 0, bubbles everywhere,
//             while the holiday party happens behind it. ♈ Aries: "come dance!" Virgo: "one sec!" The stack grows;
//             a sign flips to "GIFT SWAP: DONE". Virgo: "wait, what?" ♓ Pisces cries on the dance floor.
//   6.71      the card cut; the year sticker flips to 2026.
//   6.71–12.8 2026: the same tower of dishes. ♉ Taurus: "want a hand?" Virgo's eye twitches at the stack… then:
//             "…they can wait." Virgo sits by the fire with Taurus. Taurus: "who ARE you?" Virgo: "off duty."
//   12.8–15.6 THE STARS: "the mess will keep. *the night won't.*"  Last line: "Left the dishes. *Kept* the night."
import {
  makeThenNow, drawStarChar, signStar, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs,
  pop01, outK, r3, INK, BONE, GOLD, PINK, SW, SH, lerp, prog, ease, R, clamp,
} from '../../nhve01/scenes/thennow.js'
import { room, stringLights, fireplace, couch, sign, mug, beanie, scarf, mark, tree, RED, GREEN, CREAM } from '../../nhve01/scenes/holkit.js'

const VIR = signStar('virgo'), TAU = signStar('taurus'), ARI = signStar('aries')
const DANCERS = [['#e9b24a', 31], ['#ef5c94', 32], ['#38c4ec', 33]]

function sink(x, t, cx, by, scrub) {
  R(x, INK, cx - 200, by - 6, 400, 260); R(x, '#d8dce8', cx - 194, by, 388, 22); R(x, '#a8b0c8', cx - 194, by + 22, 388, 232)
  R(x, INK, cx + 150, by - 90, 16, 90); R(x, INK, cx + 100, by - 96, 66, 16)
  // bubbles
  for (let i = 0; i < 14; i++) { const ph = (t * (0.6 + (i % 4) * 0.2) + i / 14) % 1; const bx = cx - 150 + (i * 23) % 300 + 10 * Math.sin(t * 3 + i), by2 = by - 10 - ph * 220; x.save(); x.globalAlpha = (1 - ph) * scrub; R(x, INK, bx - 9, by2 - 9, 18, 18); R(x, '#e9f6ff', bx - 6, by2 - 6, 12, 12); R(x, '#ffffff', bx - 4, by2 - 4, 4, 4); x.restore() }
}
function plates(x, cx, by, n) { for (let i = 0; i < n; i++) { R(x, INK, cx - 56, by - 14 - i * 16, 112, 16); R(x, '#f4f6ff', cx - 52, by - 11 - i * 16, 104, 10) } }

// ── THEN: 2016
const A = { dance: 1.9, sec: 2.6, swap: 4.0, what: 4.6 }
function sceneA(x, t) {
  room(x, t, { now: false })
  stringLights(x, t, 24, 18)
  tree(x, t, 760, 640, 380, { now: false })
  // the party behind: dancers bouncing to the beat
  DANCERS.forEach(([c, s], i) => drawStarChar(x, 470 + i * 120, 600 + (i % 2) * 30, 110, t, { color: c, mood: 'happy', seed: s, hops: Array.from({ length: 14 }, (_, k) => k * 0.5 + i * 0.12) }))
  pisces(x, t, 800, 760, 120, t > 3.0 ? 3 : 2, { mood: 'happy', look: [-1, 0], seed: 6, hops: Array.from({ length: 12 }, (_, k) => k * 0.55 + 0.2) })
  // ♈ Aries comes over to ask
  const ak = ease.outCubic(prog(t, A.dance - 0.4, A.dance)) * (1 - ease.inCubic(prog(t, A.sec + 0.4, A.sec + 0.8)))
  drawStarChar(x, lerp(980, 640, ak), 760, 170, t, { color: ARI.color, glyph: ARI.glyph, mood: 'sparkle', look: [-1, 0], seed: 4, hops: [A.dance] })
  // the GIFT SWAP sign
  sign(x, 560, 300, t < A.swap ? 'GIFT SWAP: 11 PM' : 'GIFT SWAP: DONE', { size: 30, col: t < A.swap ? '#fff3c8' : '#ffd0d8', rot: 0.04, k: t > A.swap && t < A.swap + 0.3 ? pop01(t, A.swap, 0.3, 3) : 1 })
  // ♍ Virgo at the sink, scrubbing
  const vH = [A.sec, A.what]
  const vx = 230, vy = 700
  const scrubbing = t < A.what - 0.1
  drawStarChar(x, vx + (scrubbing ? 8 * Math.sin(t * 24) : 0), vy, 220, t, { color: VIR.color, glyph: VIR.glyph, mood: t > A.what ? 'wide' : t > A.sec ? 'happy' : 'squint', look: t > A.what ? [1, -1] : [0, 1], seed: 8, hops: vH })
  bangs(x, starFrame(vx, vy, 220, t, { hops: vH, seed: 8 }))
  sink(x, t, vx, 830, 1)
  plates(x, 400, 830, 3 + Math.floor(t * 1.4))
  // the plate being scrubbed
  if (scrubbing) { R(x, INK, vx + 40 + 30 * Math.sin(t * 24), 770, 90, 18); R(x, '#f4f6ff', vx + 44 + 30 * Math.sin(t * 24), 773, 82, 12) }
  speech(x, t, 640, 520, A.dance, 'come dance!', { size: 38, tail: 1, life: 1.0, col: '#ffe36a' })
  speech(x, t, 260, 470, A.sec, 'one sec!', { size: 40, tail: -1, life: 1.0, col: '#fffaf0' })
  speech(x, t, 260, 470, A.what, 'wait, what?', { size: 44, tail: -1, life: 1.6, col: '#fff3c8' })
  mark(x, t, 230, 540, A.swap + 0.1, '!', { col: '#ff4f4f' })
}

// ── NOW: 2026
const B = { hand: 7.15, twitch: [8.0, 8.9], wait: 9.0, walk: [9.6, 10.2], who: 10.45, off: 11.2 }
function sceneB(x, t) {
  room(x, t, { now: true })
  stringLights(x, t, 24, 18)
  fireplace(x, t, 660, 640, { w: 260, h: 230 })
  couch(x, 640, 1000, 400, { col: '#c06a8a' })
  sink(x, t, 220, 830, 0)
  plates(x, 330, 830, 13)
  pisces(x, t, 870, 760, 100, t > B.off ? 3 : 2, { mood: t > B.off ? 'happy' : 'sparkle', look: [-1, 0], seed: 6 })
  // ♉ Taurus on the couch
  const tH = [B.hand, B.who, B.off + 0.2]
  drawStarChar(x, 720, 800, 200, t, { color: TAU.color, glyph: TAU.glyph, mood: t > B.off ? 'heart' : t > B.who - 0.1 ? 'wide' : 'happy', look: [-1, 0], seed: 2, hops: tH })
  beanie(x, starFrame(720, 800, 200, t, { hops: tH, seed: 2 }), GREEN)
  mug(x, t, 840, 930, { col: '#ffd35a', s: 0.8 })
  // ♍ Virgo: twitch at the stack, then walks to the couch
  const wk = ease.inOutCubic(prog(t, ...B.walk))
  const vx = lerp(220, 520, wk), vy = lerp(700, 800, wk)
  const tw = t > B.twitch[0] && t < B.twitch[1] ? 6 * Math.sin(t * 60) : 0
  const vH = [B.wait, B.walk[0] + 0.1, B.walk[1], B.off]
  let vm = 'happy', vl = [0, 1]
  if (t > B.twitch[0]) { vm = 'wide'; vl = [1, 1] }
  if (t > B.wait) { vm = 'squint'; vl = [1, 0] }
  if (t > B.walk[0]) { vm = 'happy'; vl = undefined }
  if (t > B.off) vm = 'wink'
  drawStarChar(x, vx + tw, vy, 210, t, { color: VIR.color, glyph: VIR.glyph, mood: vm, look: vl, seed: 8, hops: vH })
  scarf(x, starFrame(vx, vy, 210, t, { hops: vH, seed: 8 }), '#7fd0ff')
  if (t > B.twitch[0] && t < B.twitch[1]) mark(x, t, vx + 40, 520, B.twitch[0], '…', { col: INK, life: 0.9, cell: 9 })
  speech(x, t, 660, 520, B.hand, 'want a hand?', { size: 38, tail: 1, life: 1.2, col: '#e9fff0' })
  speech(x, t, 280, 470, B.wait, '…they can wait.', { size: 40, tail: -1, life: 1.4, col: '#fff3c8' })
  speech(x, t, 700, 520, B.who, 'who ARE you?', { size: 40, tail: 1, life: 0.9, col: '#fffaf0' })
  speech(x, t, 480, 540, B.off, 'off duty.', { size: 44, tail: 0, life: 1.3, col: '#ffe36a' })
  if (t > B.off) hearts(x, t, 620, 680, B.off, { n: 6, life: 1.4, cell: 6, spread: 240 })
}

const EP = makeThenNow({
  id: 'nhve06', thing: 'Virgo’s holidays in', then: '2016', stamp: '12·23·2016', accent: '#9fe6b0',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: 'Virgo in 2016 cleaned *through the party.*' },
    { t: 7.5, text: 'in 2026 the dishes are *still there.*' },
    { t: 12.92, text: 'the mess will keep. *the night won’t.*' },
  ],
  last: 'Left the dishes. | *Kept* the night.',
  cues: () => [
    ...Array.from({ length: 8 }, (_, i) => ['tick', r3(0.1 + i * 0.4), 0.025]),
    ['pop', A.dance, 1046.5, 0.035, 0.4], ['pop', A.sec, 783.99, 0.03, -0.3], ['tick', A.swap, 0.06], ['pop', r3(A.swap + 0.05), 523.25, 0.04, 0.2], ['pop', A.what, 659.25, 0.04, -0.3],
    ['pop', B.hand, 880, 0.03, 0.3], ['tick', B.twitch[0], 0.05], ['tick', r3(B.twitch[0] + 0.3), 0.05], ['pop', B.wait, 587.33, 0.035, -0.3],
    ['whoosh', B.walk[0], 0.4, 0.03], ['pop', B.who, 1046.5, 0.035, 0.3], ['pop', B.off, 1318.51, 0.045, 0], ['glitter', B.off, r3(B.off + 0.4)],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
