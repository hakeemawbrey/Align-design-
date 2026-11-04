// nhve24: THEN vs NOW: HOLIDAYS, "The holiday wish in 2016 / 2026" (20 s, b18 #24, the finale, music: pop · Bb)
// Look and props: ../../nhve01/scenes/thennow.js + holkit.js.
//   0–6.71    2016 (old-phone grade, "12·24·2016"): ♓ Pisces at the window at t = 0, tears already going, wishing on
//             the brightest star: "I wish… for someone to spend this with." Behind it, a table set for one ("TABLE
//             FOR 1"). The star outside twinkles back.
//   6.71      the card cut; the year sticker flips to 2026.
//   6.71–12.8 2026: a full table: ♋ Cancer, ♌ Leo, ♈ Aries, ♊ Gemini, mugs up: "to us!" Pisces glances at the
//             window: the same star winks. Pisces, sobbing happily: "it heard me." Cancer hugs it. Hearts.
//   12.8–15.6 THE STARS: "some wishes just *take a while.*"  Last line: "Wished alone. *Now* together."
import {
  makeThenNow, drawStarChar, signStar, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs, drawPixelStar,
  pop01, outK, r3, INK, BONE, GOLD, PINK, SW, SH, lerp, prog, ease, R, clamp,
} from '../../nhve01/scenes/thennow.js'
import { room, stringLights, sign, beanie, scarf, mark, table, mug, tree, snowWindow, partyHat, RED, GREEN, CREAM } from '../../nhve01/scenes/holkit.js'

const CAN = signStar('cancer'), FRIENDS = [['leo', 4], ['aries', 14], ['gemini', 5]].map(([s, seed]) => ({ ...signStar(s), seed }))

function wishWindow(x, t, l, tp, w, h, wink) {
  R(x, INK, l - 12, tp - 12, w + 24, h + 24); R(x, CREAM, l - 6, tp - 6, w + 12, h + 12); R(x, '#1d2a5c', l, tp, w, h)
  for (let i = 0; i < 10; i++) R(x, '#fff6c8', l + ((i * 97) % w), tp + ((i * 53) % (h * 0.7)), 4, 4)
  const s = 40 + 14 * Math.sin(t * 3) + wink * 40
  x.save(); x.shadowColor = '#fff3a0'; x.shadowBlur = 30 + wink * 30; drawBits(x, ['..Y..', '.YYY.', 'YYYYY', '.YYY.', 'Y...Y'], { Y: '#fff3a0' }, l + w * 0.68, tp + h * 0.32, s / 4, { outline: null }); x.restore()
  R(x, CREAM, l + w / 2 - 4, tp, 8, h); R(x, CREAM, l, tp + h / 2 - 4, w, 8)
}

// ── THEN: 2016
const A = { wish: 1.0, some: 2.2, table: 3.4, twinkle: 5.2 }
function sceneA(x, t) {
  room(x, t, { now: false, wall: '#3a3a6a', wall2: '#44447a' })
  wishWindow(x, t, 360, 120, 440, 420, Math.sin(Math.PI * prog(t, A.twinkle, A.twinkle + 0.6)))
  // the table for one
  table(x, 200, 860, 260, { now: false, cloth: '#e05a6a' })
  mug(x, t, 200, 860, { col: '#ff8fb1', s: 0.9 })
  sign(x, 200, 680, 'TABLE FOR 1', { size: 28, col: '#fff3c8', rot: -0.06, k: pop01(t, A.table, 0.3) })
  // ♓ Pisces at the window, wishing
  const pH = [A.wish, A.some, A.twinkle + 0.2]
  pisces(x, t, 560, 800, 260, 3, { mood: t > A.twinkle + 0.1 ? 'sparkle' : t > A.wish ? 'sleepy' : 'wide', look: [1, -1], seed: 6, hops: pH, glyph: true })
  bangs(x, starFrame(560, 800, 260, t, { hops: pH, seed: 6 }))
  speech(x, t, 560, 600, A.wish, 'I wish…', { size: 42, tail: 0, life: 1.1, col: '#e9f6ff' })
  speech(x, t, 560, 600, A.some, 'for someone to\nspend this with.', { size: 38, tail: 0, life: 2.1, col: '#e9f6ff' })
  sparkles(x, t, 660, 255, A.twinkle, 10, 90, 1, ['#fff3a0', BONE, PINK], 18)
}

// ── NOW: 2026
const B = { cheers: 7.2, toast: 7.9, glance: 9.1, wink: 9.6, heard: 10.2, hug: 11.0 }
function sceneB(x, t) {
  room(x, t, { now: true })
  stringLights(x, t, 24, 20)
  wishWindow(x, t, 520, 110, 320, 300, Math.sin(Math.PI * prog(t, B.wink, B.wink + 0.6)))
  tree(x, t, 120, 640, 420, { now: true })
  table(x, 450, 880, 760, { now: true, cloth: '#fff3e2' })
  // friends behind the table
  FRIENDS.forEach((f, i) => {
    const fx = 250 + i * 200, H = [B.cheers + i * 0.06, B.toast + i * 0.05, B.hug + i * 0.1]
    drawStarChar(x, fx, 720, 150, t, { color: f.color, glyph: f.glyph, mood: t > B.hug ? 'heart' : 'happy', look: t > B.glance && t < B.hug ? [1, -1] : undefined, seed: f.seed, hops: H })
    partyHat(x, starFrame(fx, 720, 150, t, { hops: H, seed: f.seed }), [GOLD, '#7fd0ff', PINK][i], 0.2)
    mug(x, t, fx + 40, t > B.toast && t < B.toast + 0.8 ? 790 : 860, { col: [GOLD, '#9fe6ff', '#ff8fb1'][i], s: 0.7, steam: false })
  })
  // ♋ Cancer and ♓ Pisces in front
  const hk = Math.sin(Math.PI * prog(t, B.hug, B.hug + 1.5))
  const cH = [B.toast, B.hug]
  drawStarChar(x, 300 + 40 * hk, 900, 220, t, { color: CAN.color, glyph: CAN.glyph, mood: t > B.hug ? 'heart' : 'happy', look: [1, 0], seed: 7, hops: cH })
  scarf(x, starFrame(300 + 40 * hk, 900, 220, t, { hops: cH, seed: 7 }), RED)
  const pH = [B.toast, B.glance, B.heard, B.hug]
  pisces(x, t, 590 - 30 * hk, 900, 230, t > B.wink ? 3 : 2, { mood: t > B.hug ? 'heart' : t > B.wink ? 'sparkle' : 'happy', look: t > B.glance && t < B.hug ? [1, -1] : [-1, 0], seed: 6, hops: pH, glyph: true })
  beanie(x, starFrame(590 - 30 * hk, 900, 230, t, { hops: pH, seed: 6 }), '#ffd35a')
  speech(x, t, 450, 520, B.cheers, 'to us!', { size: 52, tail: 0, life: 1.3, col: '#ffe36a' })
  speech(x, t, 590, 640, B.heard, 'it heard me.', { size: 42, tail: 0, life: 1.6, col: '#e9f6ff' })
  sparkles(x, t, 738, 206, B.wink, 10, 90, 1, ['#fff3a0', BONE, PINK], 18)
  if (t > B.hug) hearts(x, t, 450, 700, B.hug, { n: 9, life: 1.6, cell: 6, spread: 500 })
}

const EP = makeThenNow({
  id: 'nhve24', thing: 'The holiday wish in', then: '2016', stamp: '12·24·2016', accent: '#c9a6ff',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 3.0, text: '2016: one wish, *one cup.*' },
    { t: 7.5, text: '2026: *a full table.*' },
    { t: 12.92, text: 'some wishes just *take a while.*' },
  ],
  last: 'Wished alone. | *Now* together.',
  cues: () => [
    ['bell', 0.1, 1567.98, 0.02, 1.0, 0.3], ['pop', A.wish, 659.25, 0.03, 0], ['pop', A.some, 587.33, 0.03, 0], ['tick', A.table, 0.04],
    ['bell', A.twinkle, 2093, 0.03, 1.2, 0.4], ['glitter', A.twinkle, r3(A.twinkle + 0.5)],
    ['pop', B.cheers, 1318.51, 0.045, 0], ...[0, 1, 2].map(i => ['tick', r3(B.toast + i * 0.05), 0.04]),
    ['bell', B.wink, 2093, 0.03, 1.2, 0.4], ['glitter', B.wink, r3(B.wink + 0.5)], ['pop', B.heard, 880, 0.035, 0],
    ['pluck', B.hug, 1567.98, 0.045, 0.5, 0.3], ['glitter', B.hug, r3(B.hug + 0.5)],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
