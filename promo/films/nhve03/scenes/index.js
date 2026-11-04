// nhve03: THEN vs NOW: HOLIDAYS, "Gemini's holidays in 2016 / 2026" (20 s, b18 #3, music: pop · D)
// Look and props: ../../nhve01/scenes/thennow.js + holkit.js.
//   0–6.71    2016 (old-phone grade, "12·17·2016"): ♊ Gemini bursts through a party door at t = 0, coat half on.
//             Three parties in one night, a door-wipe between each: "hi!! bye!!" at each, the PARTIES counter
//             climbing, the clock jumping. At party three Gemini flops on the coat pile: "wait… did I talk to
//             anyone?" ♓ Pisces cries by the punch bowl (cocoa).
//   6.71      the card cut; the year sticker flips to 2026.
//   6.71–12.8 2026: one party, one couch, Gemini and ♐ Sagittarius deep in talk; the clock jumps 9:00 → 1:00 AM.
//             The host flicks the lights: "we're closing…" Both: "five more minutes!" Pisces happy-sobs.
//   12.8–15.6 THE STARS: "one real talk beats *three hellos.*"  Last line: "One party. *Whole* night."
import {
  makeThenNow, drawStarChar, signStar, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs, pop01, outK, r3,
  INK, BONE, GOLD, PINK, SW, SH, lerp, prog, ease, R, clamp,
} from '../../nhve01/scenes/thennow.js'
import { room, stringLights, door, couch, sign, clockFace, mug, beanie, scarf, partyHat, mark, tree, RED, GREEN } from '../../nhve01/scenes/holkit.js'

const GEM = signStar('gemini'), SAG = signStar('sagittarius'), LEO = signStar('leo'), CAN = signStar('cancer'), AQU = signStar('aquarius')

// ── THEN: three parties
const P = [
  { t0: -0.4, wall: '#2a4a7a', wall2: '#33558a', host: LEO, clock: '9:02 PM' },
  { t0: 2.1, wall: '#7a2a5a', wall2: '#8a3366', host: CAN, clock: '10:31 PM' },
  { t0: 4.2, wall: '#2a6a4a', wall2: '#337a55', host: AQU, clock: '11:48 PM' },
]
const A = { hi: [0.35, 2.5, 4.55], bye: [1.15, 3.25], flop: 5.15, wait: 5.45 }
function sceneA(x, t) {
  const pi = t < P[1].t0 ? 0 : t < P[2].t0 ? 1 : 2, p = P[pi]
  room(x, t, { now: false, wall: p.wall, wall2: p.wall2 })
  stringLights(x, t, 24, 20)
  door(x, 130, 640, { w: 190, h: 380, col: '#8a4a3a' })
  clockFace(x, 470, 190, p.clock, { size: 40, col: '#ff6a3a' })
  if (pi === 2) tree(x, t, 760, 640, 380, { now: false })
  // the host, waving
  const ht = p.t0 + 0.5
  drawStarChar(x, pi === 2 ? 560 : 690, 760, 190, t, { color: p.host.color, glyph: p.host.glyph, mood: t > ht ? 'happy' : 'neutral', look: [-1, 0], seed: 10 + pi, hops: [ht, ht + 0.4] })
  partyHat(x, starFrame(pi === 2 ? 560 : 690, 760, 190, t, { hops: [ht, ht + 0.4], seed: 10 + pi }), [GOLD, '#7fd0ff', PINK][pi], 0.2)
  // ♓ Pisces at party three by the cocoa
  if (pi === 2) { pisces(x, t, 800, 840, 120, 3, { mood: 'wide', look: [-1, 0], seed: 6 }); mug(x, t, 720, 930, { col: '#ff8fb1' }) }
  // ♊ Gemini: bursts in, hi, bye, out (the next door wipe)
  const lt = t - p.t0
  let gx = lerp(130, 330, ease.outCubic(clamp(lt / 0.5)))
  if (pi < 2) gx = lerp(gx, -160, ease.inCubic(clamp((t - A.bye[pi] - 0.35) / 0.4)))
  const flop = prog(t, A.flop, A.flop + 0.25)
  let gm = 'sparkle', gl = [1, 0]
  if (pi === 2 && t > A.flop) { gm = 'sleepy'; gl = undefined }
  if (t > A.wait) { gm = 'wide'; gl = [0, -1] }
  const hops = [p.t0 + 0.05, ...A.hi, ...A.bye]
  const gy = 780 + flop * 90
  if (pi === 2 && t > A.flop) { R(x, INK, 150, 860, 380, 120); for (let i = 0; i < 6; i++) R(x, ['#7a5cc0', RED, '#3fa05a', '#ffb04a', '#7fd0ff', PINK][i], 158 + i * 61, 868 + (i % 2) * 10, 58, 100) }
  drawStarChar(x, gx, gy, 220, t, { color: GEM.color, glyph: GEM.glyph, mood: gm, look: gl, seed: 5, hops, squash: flop * 0.12 })
  const F = starFrame(gx, gy, 220, t, { hops, seed: 5, squash: flop * 0.12 })
  bangs(x, F)
  // coat half on: one sleeve flapping
  R(x, INK, gx - 120, gy - 10 + 8 * Math.sin(t * 18), 60, 40); R(x, '#7a5cc0', gx - 114, gy - 4 + 8 * Math.sin(t * 18), 52, 28)
  // the PARTIES counter
  sign(x, 470, 300, `PARTIES: ${pi + 1}`, { size: 34, col: '#fff3c8', rot: -0.05 })
  // door-wipe between parties
  for (const q of [P[1], P[2]]) { const w = 1 - Math.abs(clamp((t - q.t0 + 0.18) / 0.36) * 2 - 1); if (w > 0) R(x, '#1b1236', 0, 0, SW * w, SH) }
  speech(x, t, gx + 60, 520, A.hi[pi], 'hi!!', { size: 46, tail: -1, life: 0.7, col: '#ffe36a' })
  if (pi < 2) speech(x, t, gx + 60, 520, A.bye[pi], 'bye!!', { size: 46, tail: -1, life: 0.6, col: '#fff3c8' })
  speech(x, t, 400, 520, A.wait, 'wait… did I talk\nto anyone?', { size: 34, tail: -1, life: 1.2 })
}

// ── NOW: one party, one couch
const B = { talk: [7.2, 7.9, 8.6, 9.3], jump: [8.2, 9.4, 10.3], lights: 10.45, close: 10.55, five: 11.35 }
function sceneB(x, t) {
  room(x, t, { now: true, wall: '#4a3a7a', wall2: '#55448a' })
  const dark = t > B.lights ? 0.35 : 0
  stringLights(x, t, 24, 20)
  tree(x, t, 790, 640, 400, { now: true })
  const clk = t < B.jump[0] ? '9:05 PM' : t < B.jump[1] ? '10:40 PM' : t < B.jump[2] ? '12:15 AM' : '1:02 AM'
  const jk = B.jump.reduce((m, j) => Math.max(m, pop01(t, j, 0.25, 3) * (t - j < 0.6 ? 1 : 0)), 0)
  clockFace(x, 450, 190, clk, { size: 44 + 10 * jk, col: '#ff4f6a' })
  couch(x, 400, 990, 520, { col: '#c06a8a' })
  // the host at the switch (Leo again, in a hat)
  const hk = ease.outCubic(prog(t, B.lights - 0.5, B.lights))
  if (t > B.lights - 0.5) {
    drawStarChar(x, lerp(980, 800, hk), 600, 170, t, { color: LEO.color, glyph: LEO.glyph, mood: t > B.five + 0.3 ? 'happy' : 'eyeroll', look: [-1, 1], seed: 10, hops: [B.lights] })
  }
  // Pisces on the arm of the couch
  pisces(x, t, 720, 830, 110, t > B.five ? 3 : 2, { mood: t > B.five ? 'happy' : 'sparkle', look: [-1, 0], seed: 6 })
  // Gemini and Sag deep in talk
  const ti = B.talk.filter(v => t >= v).length
  const gH = [7.0, B.talk[0], B.talk[2], B.five], sH = [B.talk[1], B.talk[3], B.five]
  drawStarChar(x, 270, 790, 220, t, { color: GEM.color, glyph: GEM.glyph, mood: t > B.close ? (t > B.five ? 'happy' : 'wide') : ti % 2 ? 'happy' : 'sparkle', look: t > B.close && t < B.five ? [1, -1] : [1, 0], seed: 5, hops: gH })
  scarf(x, starFrame(270, 790, 220, t, { hops: gH, seed: 5 }), '#ffd35a')
  drawStarChar(x, 520, 790, 220, t, { color: SAG.color, glyph: SAG.glyph, mood: t > B.close ? (t > B.five ? 'happy' : 'wide') : ti % 2 ? 'sparkle' : 'happy', look: t > B.close && t < B.five ? [1, -1] : [-1, 0], seed: 8, hops: sH })
  beanie(x, starFrame(520, 790, 220, t, { hops: sH, seed: 8 }), GREEN)
  mug(x, t, 160, 930, { col: '#9fe6ff', s: 0.8 }); mug(x, t, 640, 930, { col: '#ff8fb1', s: 0.8 })
  // little talk bubbles (no words: it's theirs)
  const icons = [['..R..', '.RRR.', 'RRRRR', '.RRR.', '..R..'], ['RR.RR', 'RRRRR', '.RRR.', '..R..'], ['R.R.R'], ['.RRR.', 'R...R', '..RR.', '.....', '..R..']]
  B.talk.forEach((v, i) => { const k = pop01(t, v, 0.24, 2.4) * outK(t, [v + 1.1, v + 1.3]); if (k > 0.02) { const bx = i % 2 ? 540 : 260; R(x, INK, bx - 56 * k, 470 - 46 * k, 112 * k, 92 * k); R(x, '#fffaf0', bx - 50 * k, 470 - 40 * k, 100 * k, 80 * k); drawBits(x, icons[i], { R: [PINK, '#ff4f86', INK, '#7a5cc0'][i] }, bx, 470, 9 * k, { outline: null }) } })
  sign(x, 170, 300, 'PARTY: 1', { size: 32, col: '#fffaf0', rot: -0.05 })
  if (dark) R(x, `rgba(10,6,30,${dark})`, 0, 0, SW, SH)
  speech(x, t, 720, 420, B.close, 'we’re closing…', { size: 36, tail: 1, life: 0.9, col: '#fff3c8' })
  speech(x, t, 400, 470, B.five, 'five more\nminutes!', { size: 46, tail: 0, life: 1.4, col: '#ffe36a' })
  if (t > B.five) hearts(x, t, 400, 640, B.five, { n: 6, life: 1.4, cell: 6, spread: 300 })
}

const EP = makeThenNow({
  id: 'nhve03', thing: 'Gemini’s holidays in', then: '2016', stamp: '12·17·2016', accent: '#ffd35a',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: 'Gemini in 2016: three parties, *zero talks.*' },
    { t: 7.5, text: 'Gemini in 2026: one couch. *all night.*' },
    { t: 12.92, text: 'one real talk beats *three hellos.*' },
  ],
  last: 'One party. | *Whole* night.',
  cues: () => [
    ['whoosh', 0.02, 0.25, 0.03],
    ...A.hi.map((v, i) => ['pop', v, 1046.5 + i * 120, 0.04, -0.3]), ...A.bye.map(v => ['pop', v, 783.99, 0.035, -0.3]),
    ...[P[1].t0, P[2].t0].flatMap(v => [['whoosh', r3(v - 0.2), 0.3, 0.04], ['tick', v, 0.06]]),
    ['tom', A.flop, 140, { gain: 0.2, decay: 0.2 }], ['pop', A.wait, 587.33, 0.03, -0.3],
    ...B.talk.map((v, i) => ['pop', v, 880 + (i % 2) * 220, 0.03, i % 2 ? 0.3 : -0.3]),
    ...B.jump.map(v => ['tick', v, 0.06]),
    ['tick', B.lights, 0.08], ['pop', B.close, 659.25, 0.03, 0.4], ['pop', B.five, 1174.66, 0.05, 0], ['glitter', B.five, r3(B.five + 0.4)],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
