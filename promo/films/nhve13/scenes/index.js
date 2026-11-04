// nhve13: THEN vs NOW: HOLIDAYS, "The party invite in 2016 / 2026" (20 s, b18 #13, music: pop · G)
// Look and props: ../../nhve01/scenes/thennow.js + holkit.js.
//   0–6.71    2016 (old-phone grade, "12·09·2016"), split screen: ♉ Taurus (left) and ♎ Libra (right) both stare
//             at "u going to the party?" at t = 0. "maybe" … "maybe". Both stay home on two couches, the party's
//             lights far off in both windows. ♓ Pisces at the party, alone, crying.
//   6.71      the card cut; the year sticker flips to 2026.
//   6.71–12.8 2026: one screen. Taurus: "come with me?" Libra: "yes." They walk into the party together; the
//             room cheers. Pisces happy-sobs.
//   12.8–15.6 THE STARS: "say what you *actually* want."  Last line: "*Yes* beats maybe."
import {
  makeThenNow, drawStarChar, signStar, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs,
  pop01, outK, r3, INK, BONE, GOLD, PINK, SW, SH, lerp, prog, ease, R, clamp,
} from '../../nhve01/scenes/thennow.js'
import { room, stringLights, sign, beanie, scarf, mark, couch, phone, snowWindow, door, tree, clockFace, RED, GREEN, CREAM } from '../../nhve01/scenes/holkit.js'

const TAU = signStar('taurus'), GEM = signStar('libra')

function half(x, t, side, star, seed, msgs, couchT) {
  x.save(); x.beginPath(); x.rect(side * SW / 2, 0, SW / 2, SH); x.clip(); x.translate(side * SW / 2, 0)
  room(x, t, { now: false, wall: side ? '#3a4a7a' : '#6a3a5a', wall2: side ? '#44558a' : '#74405f' })
  // window with the party lights far away
  R(x, INK, 120, 140, 220, 200); R(x, '#1d2a5c', 126, 146, 208, 188)
  for (let i = 0; i < 8; i++) { x.save(); x.globalAlpha = 0.5 + 0.5 * Math.sin(t * 5 + i); R(x, [GOLD, PINK, '#7fd0ff'][i % 3], 150 + i * 22, 260 + (i % 2) * 10, 8, 8); x.restore() }
  R(x, '#f4f6ff', 126, 314, 208, 20)
  const ck = prog(t, couchT, couchT + 0.4)
  if (ck > 0) couch(x, 225, 1000, 300, { col: side ? '#7a5cc0' : '#c06a8a' })
  const y = lerp(720, 790, ck)
  const H = [msgs[0] + 0.05, couchT]
  drawStarChar(x, 225, y, 190, t, { color: star.color, glyph: star.glyph, mood: t > couchT + 0.6 ? 'sleepy' : t > msgs[0] ? 'squint' : 'wide', look: t > couchT ? undefined : [0, 1], seed, hops: H, zzz: false })
  bangs(x, starFrame(225, y, 190, t, { hops: H, seed }))
  if (t < couchT + 0.3) phone(x, 225, 900, { s: 0.85, text: msgs[1], rot: side ? 0.05 : -0.05 })
  else phone(x, 330, 900, { s: 0.6, rot: 1.3, screen: '#4a6a8a' })
  x.restore()
}

// ── THEN: 2016
const A = { q: 0, m1: 1.1, m2: 1.9, couch: 3.1, sigh: 4.6 }
function sceneA(x, t) {
  const tm = t < A.m1 ? 'u going to\nthe party?' : 'maybe'
  half(x, t, 0, TAU, 2, [A.m2, t < A.m2 ? tm : 'maybe'], A.couch)
  half(x, t, 1, GEM, 5, [A.m1, t < A.m1 ? 'u going to\nthe party?' : 'maybe'], A.couch + 0.15)
  R(x, INK, SW / 2 - 5, 0, 10, SH)
  // ♓ Pisces at the party, through a little inset
  const ik = pop01(t, A.couch + 0.6, 0.3)
  if (ik > 0.02) {
    x.save(); x.translate(450, 210); x.scale(ik, ik); x.rotate(0.04)
    R(x, INK, -120, -100, 240, 200); R(x, '#5a2a6a', -114, -94, 228, 188)
    for (let i = 0; i < 7; i++) R(x, [GOLD, PINK, '#7fd0ff'][i % 3], -100 + i * 32, -84, 10, 10)
    pisces(x, t, 0, 20, 110, 3, { mood: 'wide', look: [0, 0], seed: 6 })
    x.restore()
    sign(x, 450, 335, 'THE PARTY', { size: 22, col: '#fff3c8', k: ik })
  }
  clockFace(x, 450, 1000, '9:41 PM', { size: 30, col: '#ff6a3a', k: pop01(t, A.couch, 0.3) })
  sign(x, 450, 470, '“u going to the party?”', { size: 38, col: '#e9f6ff', rot: -0.03, k: outK(t, [A.m1 - 0.2, A.m1]) })
  speech(x, t, 225, 560, A.m2, 'maybe', { size: 40, tail: 0, life: 0.9, col: '#fffaf0' })
  speech(x, t, 675, 560, A.m1, 'maybe', { size: 40, tail: 0, life: 0.9, col: '#fffaf0' })
  speech(x, t, 225, 560, A.sigh, '…', { size: 44, tail: 0, life: 1.4, col: '#fffaf0' })
  speech(x, t, 675, 560, A.sigh + 0.15, '…', { size: 44, tail: 0, life: 1.3, col: '#fffaf0' })
}

// ── NOW: 2026
const B = { ask: 7.1, yes: 8.05, walk: [8.9, 9.9], cheer: 10.0, dance: 10.6 }
function sceneB(x, t) {
  const inside = t > B.walk[0] + 0.5
  if (!inside) {
    room(x, t, { now: true, wall: '#2a3a6a', wall2: '#33447a' })
    snowWindow(x, t, 80, 120, 220, 220, { night: true })
    door(x, 640, 640, { w: 220, h: 420, open: ease.outCubic(prog(t, B.walk[0] - 0.2, B.walk[0] + 0.3)) })
  } else {
    room(x, t, { now: true, wall: '#5a2a6a', wall2: '#66337a' })
    stringLights(x, t, 24, 22)
    tree(x, t, 780, 640, 380, { now: true })
    ;[['#e9b24a', 71], ['#ef5c94', 72], ['#38c4ec', 73]].forEach(([c, s], i) => drawStarChar(x, 470 + i * 110, 650, 110, t, { color: c, mood: t > B.cheer ? 'happy' : 'neutral', seed: s, hops: [B.cheer + i * 0.05, B.dance + i * 0.1, B.dance + 0.6 + i * 0.1] }))
    pisces(x, t, 140, 640, 110, 3, { mood: 'happy', look: [1, 0], seed: 6, hops: [B.cheer] })
  }
  const wk = ease.inOutCubic(prog(t, ...B.walk))
  const off = inside ? lerp(-200, 0, ease.outCubic(prog(t, B.walk[0] + 0.5, B.walk[1]))) : -wk * 120
  const tH = [B.ask, B.walk[0], B.dance, B.dance + 0.5], gH = [B.yes, B.walk[0] + 0.1, B.dance + 0.25, B.dance + 0.75]
  drawStarChar(x, 260 + off, 800, 220, t, { color: TAU.color, glyph: TAU.glyph, mood: t > B.cheer ? 'happy' : t > B.yes ? 'sparkle' : 'happy', look: [1, 0], seed: 2, hops: tH })
  scarf(x, starFrame(260 + off, 800, 220, t, { hops: tH, seed: 2 }), GREEN)
  drawStarChar(x, 520 + off, 800, 220, t, { color: GEM.color, glyph: GEM.glyph, mood: t > B.cheer ? 'happy' : t > B.yes ? 'heart' : 'wide', look: [-1, 0], seed: 5, hops: gH })
  beanie(x, starFrame(520 + off, 800, 220, t, { hops: gH, seed: 5 }), RED)
  speech(x, t, 290, 520, B.ask, 'come with me?', { size: 42, tail: -1, life: 1.3, col: '#fffaf0' })
  speech(x, t, 540, 530, B.yes, 'yes.', { size: 56, tail: 1, life: 1.0, col: '#ffe36a' })
  speech(x, t, 600, 440, B.cheer, 'YOU CAME!!', { size: 44, tail: 0, life: 1.1, col: '#ffe1ec' })
  if (t > B.dance) hearts(x, t, 390, 620, B.dance, { n: 6, life: 1.4, cell: 6, spread: 260 })
  sparkles(x, t, 450, 600, B.cheer, 12, 260, 1, [GOLD, PINK, '#7fd0ff'], 24)
}

const EP = makeThenNow({
  id: 'nhve13', thing: 'The party invite in', then: '2016', stamp: '12·09·2016', accent: '#ff8fb1',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 2.5, text: 'two *maybes* make a no.' },
    { t: 7.5, text: 'in 2026: ask *the real question.*' },
    { t: 12.92, text: 'say what you *actually* want.' },
  ],
  last: '*Yes* beats | maybe.',
  cues: () => [
    ['tick', 0.2, 0.04], ['pop', A.m1, 659.25, 0.03, 0.4], ['pop', A.m2, 659.25, 0.03, -0.4],
    ['whoosh', A.couch, 0.3, 0.03], ['tom', r3(A.couch + 0.4), 120, { gain: 0.14, decay: 0.2 }], ['pop', A.couch + 0.6, 523.25, 0.03, 0], ['pop', A.sigh, 392, 0.025, -0.3],
    ['pop', B.ask, 880, 0.035, -0.3], ['pop', B.yes, 1318.51, 0.05, 0.3], ['glitter', B.yes, r3(B.yes + 0.3)],
    ['whoosh', B.walk[0], 0.4, 0.04], ['boom', B.cheer, 0.08], ['pop', B.cheer, 1174.66, 0.045, 0], ['glitter', B.cheer, r3(B.cheer + 0.5)],
    ['pluck', B.dance, 1567.98, 0.045, 0.5, 0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
