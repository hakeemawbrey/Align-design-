// nhve10: THEN vs NOW: HOLIDAYS, "Capricorn's holidays in 2016 / 2026" (20 s, b18 #10, music: chiptune · A)
// Look and props: ../../nhve01/scenes/thennow.js + holkit.js.
//   0–6.71    2016 (old-phone grade, "12·18·2016"): ♑ Capricorn types at a laptop in the corner of the holiday party,
//             party hat on sideways, at t = 0. "Cap! dance!" — "after this email." The clock jumps; "after THIS
//             email." The lights go off, the party's gone: "…where'd everyone go?" ♓ Pisces cries at the door.
//   6.71      the card cut; the year sticker flips to 2026.
//   6.71–12.8 2026: the laptop slams shut, an "OUT OF OFFICE" sign taped on top. Capricorn dances, badly, with
//             ♊ Gemini: "you're… dancing?" Capricorn: "badly. on purpose." Hearts. Pisces dances and cries.
//   12.8–15.6 THE STARS: "rest is *part of the plan.*"  Last line: "*Out of office*. In love."
import {
  makeThenNow, drawStarChar, signStar, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs,
  pop01, outK, r3, INK, BONE, GOLD, PINK, SW, SH, lerp, prog, ease, R, clamp,
} from '../../nhve01/scenes/thennow.js'
import { room, stringLights, sign, clockFace, partyHat, beanie, scarf, mark, tree, door, RED, GREEN, CREAM } from '../../nhve01/scenes/holkit.js'

const CAP = signStar('capricorn'), GEM = signStar('gemini')
const CROWD = [['#e9b24a', 51], ['#ef5c94', 52], ['#38c4ec', 53]]

function laptop(x, cx, by, open, glow) {
  R(x, INK, cx - 130, by - 20, 260, 24); R(x, '#b8b8c8', cx - 124, by - 16, 248, 14)
  if (open > 0.02) {
    const h = 170 * open
    R(x, INK, cx - 116, by - 20 - h, 232, h); R(x, '#d0d0e0', cx - 110, by - 16 - h, 220, h - 2)
    if (open > 0.9) { R(x, glow ? '#e9f6ff' : '#9fb8d8', cx - 98, by - 168, 196, 132); for (let i = 0; i < 6; i++) R(x, '#7a8ab8', cx - 86, by - 150 + i * 18, 80 + (i * 37) % 90, 6) }
  }
}
function deskLamp(x, t, dark) { if (dark) { x.save(); x.globalAlpha = 0.7; x.fillStyle = '#05040c'; x.fillRect(0, 0, SW, SH); x.restore() } }

// ── THEN: 2016
const A = { call: 1.2, after1: 1.85, after2: 3.0, dark: 4.4, where: 5.0 }
function sceneA(x, t) {
  room(x, t, { now: false, wall: '#3a4a7a', wall2: '#44558a' })
  stringLights(x, t, 24, 18)
  tree(x, t, 790, 640, 340, { now: false })
  door(x, 560, 640, { w: 170, h: 360, open: 0.85, wreath: false })
  clockFace(x, 350, 190, t < A.after2 ? '10:12 PM' : t < A.dark ? '11:47 PM' : '1:30 AM', { size: 40, col: '#ff6a3a' })
  // the crowd dancing (gone after the lights go)
  const leave = prog(t, A.dark - 0.8, A.dark)
  if (leave < 1) CROWD.forEach(([c, s], i) => drawStarChar(x, lerp(460 + i * 120, 560, leave), 720 + (i % 2) * 40, 120, t, { color: c, mood: 'happy', seed: s, alpha: 1 - leave, hops: Array.from({ length: 10 }, (_, k) => k * 0.5 + i * 0.15) }))
  pisces(x, t, 620, 780, 110, t > A.dark - 1 ? 3 : 1, { mood: t > A.dark - 1 ? 'wide' : 'happy', look: [-1, 0], seed: 6 })
  // the desk in the corner + ♑ Capricorn
  R(x, INK, 40, 820, 400, 30); R(x, '#8a5a3a', 46, 824, 388, 20); R(x, INK, 70, 850, 20, 180); R(x, INK, 390, 850, 20, 180)
  const cH = [A.after1, A.after2, A.where]
  const typing = t < A.where
  drawStarChar(x, 160 + (typing ? 2 * Math.sin(t * 40) : 0), 690, 210, t, { color: CAP.color, glyph: CAP.glyph, mood: t > A.where ? 'wide' : 'squint', look: t > A.where ? [1, -1] : [1, 1], seed: 9, hops: cH })
  const F = starFrame(160, 690, 210, t, { hops: cH, seed: 9 })
  bangs(x, F); partyHat(x, F, '#ff8fb1', 0.9)
  laptop(x, 330, 830, 1, true)
  deskLamp(x, t, t > A.dark)
  if (t > A.dark) { x.save(); x.globalAlpha = 0.5; x.fillStyle = '#e9f6ff'; x.beginPath(); x.ellipse(250, 720, 220, 160, 0, 0, Math.PI * 2); x.fill(); x.restore(); drawStarChar(x, 160, 690, 210, t, { color: CAP.color, glyph: CAP.glyph, mood: t > A.where ? 'wide' : 'squint', look: [1, -1], seed: 9, hops: cH }); bangs(x, F); partyHat(x, F, '#ff8fb1', 0.9); laptop(x, 330, 830, 1, true) }
  speech(x, t, 580, 470, A.call, 'Cap! dance!', { size: 40, tail: 1, life: 0.9, col: '#ffe36a' })
  speech(x, t, 270, 450, A.after1, 'after this email.', { size: 36, tail: -1, life: 1.0, col: '#fffaf0' })
  speech(x, t, 280, 450, A.after2, 'after THIS email.', { size: 38, tail: -1, life: 1.1, col: '#fffaf0' })
  speech(x, t, 300, 450, A.where, '…where’d\neveryone go?', { size: 38, tail: -1, life: 1.5, col: '#fff3c8' })
}

// ── NOW: 2026
const B = { slam: 7.05, tape: 7.4, dance: 7.9, you: 9.0, bad: 9.85, dip: 10.9 }
function sceneB(x, t) {
  room(x, t, { now: true, wall: '#4a3a7a', wall2: '#55448a' })
  stringLights(x, t, 24, 18)
  tree(x, t, 800, 640, 360, { now: true })
  R(x, INK, 40, 820, 300, 30); R(x, '#8a5a3a', 46, 824, 288, 20); R(x, INK, 70, 850, 20, 180); R(x, INK, 300, 850, 20, 180)
  laptop(x, 190, 830, 1 - ease.inCubic(prog(t, B.slam - 0.25, B.slam)), false)
  sign(x, 190, 780, 'OUT OF\nOFFICE', { size: 26, col: '#fff3c8', rot: -0.08, k: pop01(t, B.tape, 0.3, 2.6) })
  // dancing, badly: robotic steps on the beat
  const beat = Math.floor((t - B.dance) / 0.28)
  const dancing = t > B.dance
  const cx = dancing ? 430 + (beat % 2 ? 20 : -20) : 430
  const cH = dancing ? Array.from({ length: 18 }, (_, k) => B.dance + k * 0.28) : [B.slam]
  drawStarChar(x, cx, 790, 220, t, { color: CAP.color, glyph: CAP.glyph, mood: t > B.dip ? 'heart' : t > B.bad ? 'wink' : dancing ? 'squint' : 'happy', look: [1, 0], seed: 9, hops: cH, squash: dancing ? (beat % 2 ? 0.08 : -0.06) : 0 })
  scarf(x, starFrame(cx, 790, 220, t, { hops: cH, seed: 9 }), RED)
  const gH = dancing ? Array.from({ length: 14 }, (_, k) => B.dance + 0.14 + k * 0.36) : []
  drawStarChar(x, 680, 790, 210, t, { color: GEM.color, glyph: GEM.glyph, mood: t > B.dip ? 'heart' : t > B.you - 0.1 && t < B.bad + 0.6 ? 'wide' : 'happy', look: [-1, 0], seed: 5, hops: gH })
  beanie(x, starFrame(680, 790, 210, t, { hops: gH, seed: 5 }), '#7fd0ff')
  pisces(x, t, 850, 880, 100, t > B.dance ? 3 : 2, { mood: 'happy', look: [-1, 0], seed: 6, hops: dancing ? Array.from({ length: 12 }, (_, k) => B.dance + 0.2 + k * 0.4) : [] })
  // little music notes
  if (dancing) for (let i = 0; i < 4; i++) { const ph = (t * 0.7 + i / 4) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph); drawBits(x, ['..XX', '..X.', '..X.', 'XXX.', 'XXX.'], { X: [GOLD, PINK, '#7fd0ff', '#9fe6b0'][i] }, 300 + i * 140, 560 - ph * 160, 6); x.restore() }
  speech(x, t, 650, 500, B.you, 'you’re…\ndancing?', { size: 40, tail: 1, life: 1.0, col: '#e9fff0' })
  speech(x, t, 420, 490, B.bad, 'badly.\non purpose.', { size: 42, tail: 0, life: 1.4, col: '#ffe36a' })
  if (t > B.dip) hearts(x, t, 560, 620, B.dip, { n: 7, life: 1.5, cell: 6, spread: 300 })
}

const EP = makeThenNow({
  id: 'nhve10', thing: 'Capricorn’s holidays in', then: '2016', stamp: '12·18·2016', accent: '#9fe6b0',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: 'Capricorn in 2016: *one more email.*' },
    { t: 7.6, text: 'in 2026 the laptop gets *a holiday* too.' },
    { t: 12.92, text: 'rest is *part of the plan.*' },
  ],
  last: '*Out of office*. | In love.',
  cues: () => [
    ...Array.from({ length: 10 }, (_, i) => ['tick', r3(0.05 + i * 0.13), 0.02]),
    ['pop', A.call, 1046.5, 0.035, 0.4], ['pop', A.after1, 587.33, 0.03, -0.3], ['tick', A.after2 - 0.05, 0.05], ['pop', A.after2, 659.25, 0.03, -0.3],
    ['tick', A.dark, 0.08], ['tom', r3(A.dark + 0.02), 100, { gain: 0.18, decay: 0.3 }], ['pop', A.where, 523.25, 0.03, -0.3],
    ['tom', B.slam, 160, { gain: 0.22, decay: 0.15 }], ['tick', B.slam, 0.08], ['pop', B.tape, 1174.66, 0.04, -0.3], ['glitter', B.tape, r3(B.tape + 0.3)],
    ...Array.from({ length: 8 }, (_, i) => ['tick', r3(B.dance + i * 0.28), 0.03]),
    ['pop', B.you, 880, 0.035, 0.3], ['pop', B.bad, 1046.5, 0.04, 0], ['pluck', B.dip, 1567.98, 0.045, 0.5, 0.3], ['glitter', B.dip, r3(B.dip + 0.4)],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
