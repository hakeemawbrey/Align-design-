// nhve17: THEN vs NOW: HOLIDAYS, "Meeting the family in 2016 / 2026" (20 s, b18 #17, music: dreamy · D)
// Look and props: ../../nhve01/scenes/thennow.js + holkit.js.
//   0–6.71    2016 (old-phone grade, "12·24·2016"): ♍ Virgo on the doorstep drops a fan of index cards at t = 0. The
//             door opens on the family; Virgo, scrambling: "I… like your… door." It reads a card: "…compliment the
//             soup?" The family nods, very slowly. ♓ Pisces inside, crying.
//   6.71      the card cut; the year sticker flips to 2026.
//   6.71–12.8 2026: at the table, no cards. Virgo to Grandma: "how do you make these cookies?" Grandma: "nobody
//             ever ASKS!" She writes the recipe on a card and hands it over, then a hug. Pisces happy-sobs.
//   12.8–15.6 THE STARS: "curiosity is *the best small talk.*"  Last line: "Less script, *more* you."
import {
  makeThenNow, drawStarChar, signStar, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs, inSprite,
  pop01, outK, r3, INK, BONE, GOLD, PINK, SW, SH, lerp, prog, ease, R, clamp,
} from '../../nhve01/scenes/thennow.js'
import { room, stringLights, sign, beanie, scarf, mark, door, tree, table, cookies, nightSky, snowGround, snowfall, RED, GREEN, CREAM, INTER } from '../../nhve01/scenes/holkit.js'

const VIR = signStar('virgo'), TAU = signStar('taurus')
const GRAN = '#d8c8f0'

function glasses(x, F) { inSprite(x, F, () => { x.fillStyle = INK; x.fillRect(7, 17, 9, 7); x.fillRect(20, 17, 9, 7); x.fillRect(15, 19, 6, 1.5); x.fillStyle = 'rgba(220,240,255,0.55)'; x.fillRect(8, 18, 7, 5); x.fillRect(21, 18, 7, 5) }) }
function bun(x, F) { inSprite(x, F, () => { x.fillStyle = INK; x.fillRect(14, -1, 9, 7); x.fillStyle = '#efe6f6'; x.fillRect(15, 0, 7, 5) }) }
function indexCard(x, cx, cy, rot, k = 1, text = '') {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, INK, -48, -32, 96, 64); R(x, '#fffaf0', -44, -28, 88, 56); R(x, '#e05a6a', -44, -18, 88, 3); for (let i = 0; i < 3; i++) R(x, '#c9d8ff', -40, -4 + i * 12, 80, 2)
  if (text) { x.fillStyle = INK; x.font = `800 13px ${INTER}`; x.textAlign = 'center'; x.fillText(text, 0, 8) }
  x.restore()
}

// ── THEN: 2016
const A = { drop: [0, 1.0], open: 1.2, door: 1.9, read: 3.6, nod: 5.0 }
function sceneA(x, t) {
  nightSky(x, t)
  R(x, INK, 300, 160, 600, 620); R(x, '#8a5a4a', 306, 166, 594, 614)
  R(x, INK, 760, 260, 120, 120); R(x, '#ffd88a', 766, 266, 108, 108)
  pisces(x, t, 820, 330, 90, 3, { mood: 'wide', look: [-1, 1], seed: 6 })
  door(x, 560, 780, { w: 220, h: 400, open: ease.outCubic(prog(t, A.open - 0.1, A.open + 0.2)) * 0.95 })
  snowGround(x, 780)
  // the family in the doorway
  if (t > A.open) {
    const nod = t > A.nod ? 0.25 * Math.sin((t - A.nod) * 3) : 0
    drawStarChar(x, 520, 640, 150, t, { color: GRAN, mood: t > A.nod ? 'neutral' : 'wide', look: [-1, nod > 0 ? 1 : 0], seed: 31, hops: [A.open + 0.1] })
    glasses(x, starFrame(520, 640, 150, t, { hops: [A.open + 0.1], seed: 31 })); bun(x, starFrame(520, 640, 150, t, { hops: [A.open + 0.1], seed: 31 }))
    drawStarChar(x, 640, 660, 140, t, { color: TAU.color, glyph: TAU.glyph, mood: 'wide', look: [-1, nod < 0 ? 1 : 0], seed: 2, hops: [A.open + 0.2] })
  }
  // ♍ Virgo on the step, cards flying
  const vH = [0.1, A.door, A.read]
  drawStarChar(x, 220, 700, 210, t, { color: VIR.color, glyph: VIR.glyph, mood: t > A.read ? 'squint' : 'wide', look: t > A.read ? [0, 1] : [1, -1], seed: 8, hops: vH, squash: t < 0.4 ? 0.1 : 0 })
  bangs(x, starFrame(220, 700, 210, t, { hops: vH, seed: 8 }))
  for (let i = 0; i < 7; i++) {
    const p = clamp(prog(t, A.drop[0] - 0.3 + i * 0.05, A.drop[1] + i * 0.08))
    const a = -1.8 + i * 0.5
    indexCard(x, 300 + Math.cos(a) * 260 * p, 790 + Math.sin(a) * 200 * p + 200 * p * p, p * (3 + i), 0.9)
  }
  if (t > A.read - 0.2) indexCard(x, 330, 850, -0.1, 1.5 * pop01(t, A.read - 0.2, 0.25), 'compliment the soup')
  speech(x, t, 260, 450, A.door, 'I… like your…\ndoor.', { size: 38, tail: -1, life: 1.5, col: '#fffaf0' })
  speech(x, t, 260, 450, A.read, '…compliment\nthe soup?', { size: 38, tail: -1, life: 1.3, col: '#fff3c8' })
  snowfall(x, t, { n: 18, seed: 6 })
}

// ── NOW: 2026
const B = { ask: 7.15, asks: 8.5, write: [9.4, 10.0], give: 10.1, hug: 10.85 }
function sceneB(x, t) {
  room(x, t, { now: true })
  stringLights(x, t, 24, 18)
  tree(x, t, 790, 640, 380, { now: true })
  table(x, 450, 860, 560, { now: true })
  cookies(x, 450, 860, 8, { s: 1.1 })
  pisces(x, t, 830, 900, 90, t > B.hug ? 3 : 2, { mood: t > B.hug ? 'happy' : 'sparkle', look: [-1, 0], seed: 6 })
  drawStarChar(x, 450, 640, 140, t, { color: TAU.color, glyph: TAU.glyph, mood: t > B.asks ? 'happy' : 'sparkle', look: [0, 1], seed: 2, hops: [B.asks + 0.2, B.hug] })
  const hk = Math.sin(Math.PI * prog(t, B.hug, B.hug + 1.4))
  const vH = [B.ask, B.give + 0.1, B.hug], gH = [B.asks, B.asks + 0.3, B.give, B.hug]
  drawStarChar(x, 220 + 40 * hk, 760, 210, t, { color: VIR.color, glyph: VIR.glyph, mood: t > B.hug ? 'heart' : t > B.give ? 'sparkle' : 'happy', look: [1, 0], seed: 8, hops: vH })
  scarf(x, starFrame(220 + 40 * hk, 760, 210, t, { hops: vH, seed: 8 }), '#7fd0ff')
  const gx = 660 - 60 * hk
  drawStarChar(x, gx, 760, 200, t, { color: GRAN, mood: t > B.hug ? 'heart' : t > B.asks - 0.05 ? 'sparkle' : 'happy', look: t > B.write[0] && t < B.give ? [0, 1] : [-1, 0], seed: 31, hops: gH })
  const GF = starFrame(gx, 760, 200, t, { hops: gH, seed: 31 }); glasses(x, GF); bun(x, GF)
  // the recipe card: written, then handed over
  if (t > B.write[0]) {
    const n = Math.floor(prog(t, ...B.write) * 6)
    const k = ease.inOutCubic(prog(t, B.give, B.give + 0.4))
    indexCard(x, lerp(600, 330, k), lerp(900, 860, k), lerp(0.1, -0.08, k), 1.6, 'GRAN’S COOKIES'.slice(0, 2 + n * 2))
  }
  speech(x, t, 260, 500, B.ask, 'how do you make\nthese cookies?', { size: 36, tail: -1, life: 1.3, col: '#fffaf0' })
  speech(x, t, 640, 480, B.asks, 'nobody ever\nASKS!', { size: 44, tail: 1, life: 1.2, col: '#ffe36a' })
  if (t > B.hug) hearts(x, t, 440, 600, B.hug, { n: 7, life: 1.5, cell: 6, spread: 300 })
  sparkles(x, t, 330, 860, B.give + 0.4, 8, 100, 1, [GOLD, PINK, BONE], 20)
}

const EP = makeThenNow({
  id: 'nhve17', thing: 'Meeting the family in', then: '2016', stamp: '12·24·2016', accent: '#9fe6b0',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: '2016: meeting the family *with notes.*' },
    { t: 7.6, text: '2026: no script. *just curious.*' },
    { t: 12.92, text: 'curiosity is *the best small talk.*' },
  ],
  last: 'Less script, | *more* you.',
  cues: () => [
    ['whoosh', 0.02, 0.4, 0.04], ...Array.from({ length: 5 }, (_, i) => ['tick', r3(0.2 + i * 0.12), 0.03]),
    ['bell', A.open - 0.2, 1318.51, 0.025, 0.8, 0.2], ['tick', A.open, 0.05], ['pop', A.door, 659.25, 0.03, -0.3], ['pop', A.read, 587.33, 0.03, -0.3],
    ...[0, 1, 2].map(i => ['tick', r3(A.nod + i * 0.5), 0.03]),
    ['pop', B.ask, 880, 0.03, -0.3], ['pop', B.asks, 1318.51, 0.045, 0.3], ['glitter', B.asks, r3(B.asks + 0.3)],
    ...Array.from({ length: 5 }, (_, i) => ['tick', r3(B.write[0] + i * 0.12), 0.025]), ['whoosh', B.give, 0.3, 0.025],
    ['pluck', B.hug, 1567.98, 0.045, 0.5, 0.3], ['glitter', B.hug, r3(B.hug + 0.4)],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
