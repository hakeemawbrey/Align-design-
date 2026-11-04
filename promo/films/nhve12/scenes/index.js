// nhve12: THEN vs NOW: HOLIDAYS, "Pisces' holidays in 2016 / 2026" (20 s, b18 #12, music: dreamy · F)
// Look and props: ../../nhve01/scenes/thennow.js + holkit.js.
//   0–6.71    2016 (old-phone grade, "12·20·2016"): ♓ Pisces writes a holiday card at t = 0, sniffling, the PAGES
//             counter racing to 10. It seals the card… and files it in a drawer full of unsent cards: "…next year."
//   6.71      the card cut; the year sticker flips to 2026.
//   6.71–12.8 2026: by the tree, Pisces reads the card out loud to ♋ Cancer: "dear you…" "you make winter feel
//             warm." Both sob. Cancer: "read it again?" Hearts.
//   12.8–15.6 THE STARS: "say it while *they're here.*"  Last line: "The card, *out loud*."
import {
  makeThenNow, drawStarChar, signStar, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs, inSprite, tearsCells,
  pop01, outK, r3, INK, BONE, GOLD, PINK, SW, SH, lerp, prog, ease, R, clamp,
} from '../../nhve01/scenes/thennow.js'
import { room, stringLights, sign, card, beanie, scarf, mark, tree, snowWindow, couch, RED, GREEN, CREAM } from '../../nhve01/scenes/holkit.js'

const PIS = signStar('pisces'), CAN = signStar('cancer')

// ── THEN: 2016
const A = { pages: [0, 3.0], seal: 3.3, drawer: [4.1, 4.6], next: 4.9, shut: 5.7 }
function sceneA(x, t) {
  room(x, t, { now: false })
  snowWindow(x, t, 560, 110, 240, 230)
  stringLights(x, t, 24, 16)
  // desk + drawer unit
  R(x, INK, 60, 780, 520, 30); R(x, '#8a5a3a', 66, 784, 508, 20)
  R(x, INK, 380, 810, 200, 240); R(x, '#7a4a2a', 386, 816, 188, 230)
  const dOpen = ease.outCubic(prog(t, ...A.drawer)) * (1 - ease.inCubic(prog(t, A.shut, A.shut + 0.25)))
  const dx = 380 + dOpen * 160
  R(x, INK, dx - 4, 830, 208, 110); R(x, '#9a6a4a', dx, 834, 200, 102); R(x, INK, dx + 80, 870, 40, 12)
  if (dOpen > 0.3) for (let i = 0; i < 6; i++) card(x, dx + 60 + i * 16, 820 - i * 6, { w: 60, h: 46, col: [RED, GREEN, '#7fd0ff'][i % 3], rot: (i - 3) * 0.08 })
  // ♓ Pisces writing
  const n = Math.min(10, 1 + Math.floor(prog(t, ...A.pages) * 9.99))
  const pH = [A.seal, A.drawer[0], A.next]
  const px = t < A.drawer[0] ? 240 : lerp(240, 430, ease.inOutCubic(prog(t, A.drawer[0] - 0.4, A.drawer[0])))
  const F = starFrame(px, 660, 230, t, { hops: pH, seed: 6 })
  drawStarChar(x, px, 660, 230, t, { color: PIS.color, glyph: PIS.glyph, mood: t > A.next ? 'sleepy' : 'wide', look: t < A.seal ? [0, 1] : [1, 1], seed: 6, hops: pH, zzz: false })
  bangs(x, F)
  inSprite(x, F, () => tearsCells(x, t, t > A.next ? 3 : 2))
  // flying pages
  if (t < A.pages[1]) for (let i = 0; i < 6; i++) { const ph = (t * 0.9 + i / 6) % 1; x.save(); x.globalAlpha = 1 - ph; x.translate(160 + ph * 240 + i * 20, 760 - ph * 380); x.rotate(ph * 3 + i); R(x, INK, -26, -32, 52, 64); R(x, CREAM, -22, -28, 44, 56); for (let k = 0; k < 4; k++) R(x, '#9a8aa8', -16, -18 + k * 12, 32, 3); x.restore() }
  if (t < A.drawer[0]) card(x, 300, 770, { w: 110, h: 70, col: RED, rot: -0.06, k: 1 })
  sign(x, 200, 260, `PAGES: ${n}`, { size: 36, col: '#fff3c8', rot: -0.05 })
  if (t > A.seal && t < A.drawer[0]) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, 300, 770, 6 * pop01(t, A.seal, 0.25, 3))
  speech(x, t, 420, 420, A.next, '…next year.', { size: 42, tail: 0, life: 1.6, col: '#e9f6ff' })
}

// ── NOW: 2026
const B = { dear: 7.1, warm: 8.15, sob: 9.4, again: 10.25, hug: 11.15 }
function sceneB(x, t) {
  room(x, t, { now: true })
  stringLights(x, t, 24, 18)
  tree(x, t, 780, 640, 420, { now: true })
  snowWindow(x, t, 80, 110, 220, 220, { night: false })
  couch(x, 410, 1020, 600, { col: '#c06a8a' })
  const pH = [B.dear, B.warm, B.again + 0.3, B.hug]
  const F = starFrame(260, 800, 220, t, { hops: pH, seed: 6 })
  drawStarChar(x, 260, 800, 220, t, { color: PIS.color, glyph: PIS.glyph, mood: t > B.hug ? 'heart' : 'wide', look: t < B.again ? [0, 1] : [1, 0], seed: 6, hops: pH })
  scarf(x, F, '#ffd35a')
  inSprite(x, F, () => tearsCells(x, t, t > B.sob ? 3 : 1))
  const cH = [B.sob, B.again, B.hug]
  const C = starFrame(560, 800, 220, t, { hops: cH, seed: 7 })
  drawStarChar(x, 560, 800, 220, t, { color: CAN.color, glyph: CAN.glyph, mood: t > B.hug ? 'heart' : t > B.sob ? 'wide' : 'happy', look: [-1, 0], seed: 7, hops: cH })
  beanie(x, C, RED)
  if (t > B.sob) inSprite(x, C, () => tearsCells(x, t, 2))
  // the open card in Pisces' hands
  card(x, 410, 960, { w: 80, h: 90, open: 1, text: 'dear you,\n♡', rot: -0.04 })
  speech(x, t, 300, 520, B.dear, '“dear you…”', { size: 40, tail: -1, life: 1.0, col: '#fffaf0' })
  speech(x, t, 300, 510, B.warm, '“you make winter\nfeel warm.”', { size: 38, tail: -1, life: 1.2, col: '#fffaf0' })
  speech(x, t, 600, 520, B.again, 'read it again?', { size: 40, tail: 1, life: 1.4, col: '#ffe1ec' })
  if (t > B.hug) hearts(x, t, 410, 640, B.hug, { n: 7, life: 1.5, cell: 6, spread: 300 })
}

const EP = makeThenNow({
  id: 'nhve12', thing: 'Pisces’ holidays in', then: '2016', stamp: '12·20·2016', accent: '#c9a6ff',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: 'Pisces in 2016 wrote *ten pages*…' },
    { t: 9.0, text: 'in 2026 the card *gets read.*' },
    { t: 12.92, text: 'say it while *they’re here.*' },
  ],
  last: 'The card, | *out loud*.',
  cues: () => [
    ...Array.from({ length: 9 }, (_, i) => ['tick', r3(0.3 + i * 0.3), 0.025]), ['pop', A.seal, 1046.5, 0.035, -0.3],
    ['whoosh', A.drawer[0], 0.3, 0.03], ['pop', A.next, 523.25, 0.03, 0], ['tom', A.shut + 0.2, 140, { gain: 0.18, decay: 0.15 }],
    ['pop', B.dear, 783.99, 0.03, -0.3], ['pop', B.warm, 880, 0.03, -0.3], ['glitter', B.sob, r3(B.sob + 0.3)], ['pop', B.again, 1046.5, 0.035, 0.3],
    ['pluck', B.hug, 1567.98, 0.045, 0.5, 0.3], ['glitter', B.hug, r3(B.hug + 0.4)],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
