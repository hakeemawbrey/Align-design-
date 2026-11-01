// yraries: THEN vs NOW, "Aries dating in 2016 / 2026" (20 s vertical, Star Talk Then vs Now, Block A #1, music: pop · C)
// The format's look lives in ./thennow.js (identical in yraries, yrtaurus, yrgemini, yrcancer, yrleo).
//   0–6.71    2016, a food court on date one (old-phone grade, "08·14·2016"): ♈ Aries (side-swept bangs, a chunky phone
//             on the table) stares across the court at ♑ Capricorn, who's at the counter with a tray. Aries climbs onto
//             the chair, "HEY!!" … "I THINK I LOVE YOU!!" at full volume. Every head in the court turns, Capricorn's
//             tray (and the fries) goes flying, "it's… date one?" Aries, still beaming: "too soon?" ♓ Pisces at a
//             back table is bawling.
//   6.71      card cut; the year sticker flips to 2026.
//   6.71–12.8 2026, the same food court, all plants and string lights, both at one table. Aries' FEELINGS meter
//             slams to MAX, "I—" … pause … "can I say something big?" Capricorn: "go for it." Aries: "I REALLY like
//             you." (still a bit loud). Capricorn goes heart-eyed: "me too." Pisces sobs, happy this time.
//   12.8–15.6 the 2016 polaroid next to 2026; THE STARS: "fast is fine. *ask first.*"; last line "Still fast. *Now* kind."
import {
  makeThenNow, drawStarChar, signStar, R, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs, pop01, outK, r3,
  INK, BONE, GOLD, PINK, MONO, HEART, SW, SH, lerp, prog, ease, clamp,
} from './thennow.js'

const ARI = signStar('aries'), CAP = signStar('capricorn')
const OTHERS = ['#38c4ec', '#e9b24a', '#ef5c94', '#a35cf0']

// ── pixel icons for the counters (no names, just pictures)
const PIZZA = ['YYYYYYYYY', '.YRYYYRY.', '.YYYRYYY.', '..YYYYY..', '..YRYYY..', '...YYY...', '...YY....', '....Y....']
const CUP = ['..W.....', '..W.....', 'PPPPPPPP', '.PWWWWP.', '.PPPPPP.', '.PWWWWP.', '..PPPP..', '..PPPP..']
const BURGER = ['..BBBBB..', '.BBWBBWB.', 'BBBBBBBBB', 'GGGGGGGGG', 'MMMMMMMMM', 'BBBBBBBBB', '.BBBBBBB.']
const ICOLS = { Y: '#ffd35a', R: '#e0453a', W: '#fff4dc', P: '#ff7aa8', B: '#d9903f', G: '#5fd38a', M: '#7a3b28' }
const PLANT = ['..G.G..', '.GGLGG.', 'GGLGLGG', '.GGGGG.', '..GLG..', '.PPPPP.', '.PPPPP.', '..PPP..']
const PCOLS = { G: '#4fbf6a', L: '#8fe39a', P: '#c8643c' }
const FRY = ['Y', 'Y', 'Y', 'Y']

function court(x, t, now) {
  // back wall + three counters
  R(x, now ? '#5b4384' : '#6a3a34', 0, 0, SW, 520)
  for (let i = 0; i < 10; i++) R(x, now ? '#664c90' : '#76443c', i * 96 - 10, 0, 5, 520)
  const shops = [{ sx: 24, c: now ? '#ff7a9c' : '#c8503c', icon: PIZZA }, { sx: 318, c: now ? '#7fd0ff' : '#c98a3a', icon: CUP }, { sx: 612, c: now ? '#9fe6b0' : '#b4553f', icon: BURGER }]
  for (const s of shops) {
    R(x, INK, s.sx - 6, 104, 276, 316)
    R(x, now ? '#fff3e2' : '#e9d3b0', s.sx, 110, 264, 304)
    for (let i = 0; i < 6; i++) R(x, i % 2 ? '#fffaf0' : s.c, s.sx + i * 44, 110, 44, 52)
    R(x, INK, s.sx, 160, 264, 6)
    drawBits(x, s.icon, ICOLS, s.sx + 132, 250, 10)
    R(x, INK, s.sx - 6, 330, 276, 8); R(x, now ? '#b88a5c' : '#8a5a3a', s.sx, 338, 264, 76)
  }
  // floor tiles
  R(x, now ? '#e7d8c4' : '#c9ab84', 0, 520, SW, 540)
  for (let j = 0; j < 9; j++) for (let i = 0; i < 15; i++) if ((i + j) % 2) R(x, now ? '#d8c6b0' : '#b8966e', i * 64 - 16, 520 + j * 64, 64, 64)
  R(x, INK, 0, 514, SW, 8)
  if (now) {
    // plants + string lights
    drawBits(x, PLANT, PCOLS, 60, 470, 14); drawBits(x, PLANT, PCOLS, 840, 470, 14)
    x.strokeStyle = INK; x.lineWidth = 3; x.beginPath()
    for (let i = 0; i <= 30; i++) { const lx = i * 31, ly = 30 + 22 * Math.sin((i / 30) * Math.PI); i ? x.lineTo(lx, ly) : x.moveTo(lx, ly) }
    x.stroke()
    for (let i = 0; i < 15; i++) {
      const lx = 15 + i * 62, ly = 34 + 22 * Math.sin((lx / SW) * Math.PI)
      x.save(); x.globalAlpha = 0.75 + 0.25 * Math.sin(t * 3 + i * 1.7); R(x, [GOLD, PINK, '#9fe6ff'][i % 3], lx - 7, ly, 14, 16); x.restore()
    }
  }
}
function table(x, cx, cy, w, now) {
  R(x, INK, cx - w / 2 - 6, cy - 6, w + 12, 40); R(x, now ? '#fffaf0' : '#e0c49a', cx - w / 2, cy, w, 28)
  R(x, now ? '#e8dccb' : '#c4a578', cx - w / 2, cy + 22, w, 6)
  R(x, INK, cx - 14, cy + 34, 28, 150); R(x, now ? '#b8a7d8' : '#8a6a4a', cx - 8, cy + 34, 16, 150)
}
function oldPhone(x, cx, cy) {
  R(x, INK, cx - 30, cy - 50, 60, 100); R(x, '#4a4652', cx - 25, cy - 45, 50, 90); R(x, '#9fd8ff', cx - 19, cy - 36, 38, 58); R(x, '#2a2633', cx - 6, cy + 30, 12, 8)
}
function tray(x, cx, cy, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  R(x, INK, -70, -8, 140, 20); R(x, '#d0573f', -64, -4, 128, 12)
  R(x, INK, -40, -54, 44, 48); R(x, '#e0453a', -36, -40, 36, 34)
  for (let i = 0; i < 5; i++) R(x, '#ffd35a', -34 + i * 7, -58 + (i % 2) * 6, 5, 22)
  R(x, INK, 14, -44, 34, 38); R(x, '#fff4dc', 18, -40, 26, 30); R(x, '#7fd0ff', 18, -40, 26, 10)
  x.restore()
}

// ── THEN: 2016
const A = { stare: 0.7, climb: [2.2, 2.55], hey: 2.75, shout: 3.45, turn: 3.7, drop: 4.15, dateOne: 4.85, tooSoon: 5.6 }
const BGS = [{ x: 140, y: 610, s: 112, c: OTHERS[0], seed: 11 }, { x: 640, y: 720, s: 124, c: OTHERS[1], seed: 12 }, { x: 790, y: 860, s: 118, c: OTHERS[2], seed: 13 }]
function sceneA(x, t) {
  court(x, t, false)
  // back table: ♓ Pisces, moved to tears by the shout
  table(x, 440, 600, 170, false)
  pisces(x, t, 440, 540, 108, t > A.shout + 0.2 ? 3 : 1, { mood: t > A.shout + 0.2 ? 'sparkle' : 'neutral', look: [-1, 0], seed: 6 })
  // ♑ Capricorn at the counter with the tray
  const dropP = prog(t, A.drop, A.drop + 0.5)
  const cm = t > A.shout ? 'wide' : 'neutral', cl = t > A.shout ? [-1, 0] : [0, -1]
  drawStarChar(x, 760, 520, 150, t, { color: CAP.color, glyph: CAP.glyph, mood: cm, look: cl, seed: 9, hops: [A.shout + 0.05], squash: t > A.shout && t < A.shout + 0.3 ? 0.12 : 0 })
  if (t < A.drop) tray(x, 760, 600, 0.02 * Math.sin(t * 3))
  else tray(x, 760 - 30 * dropP, 600 + 300 * ease.inQuad(dropP), -0.9 * dropP)
  // fries fly
  if (t > A.drop) for (let i = 0; i < 9; i++) {
    const tt = t - A.drop, a = -1.9 + i * 0.4, v = 380 + (i % 3) * 70
    const fx = 740 + Math.cos(a) * v * tt, fy = Math.min(1000, 560 + Math.sin(a) * v * tt + 900 * tt * tt)
    drawBits(x, FRY, { Y: '#ffd35a' }, fx, fy, 6, { rot: tt * (6 + i) })
  }
  // the crowd: every head turns
  for (const b of BGS) {
    const turned = t > A.turn + (b.seed - 11) * 0.08
    drawStarChar(x, b.x, b.y, b.s, t, { color: b.c, mood: turned ? 'wide' : 'neutral', look: turned ? [b.x > 300 ? -1 : 1, -1] : undefined, seed: b.seed, hops: [A.turn + (b.seed - 11) * 0.08] })
    if (turned) drawBits(x, ['R', 'R', 'R', '.', 'R'], { R: '#ff4f4f' }, b.x + 40, b.y - b.s * 0.75, 7 * pop01(t, A.turn + (b.seed - 11) * 0.08, 0.25, 3))
  }
  // ♈ Aries at the front table, climbs onto the chair
  const cl2 = ease.outCubic(prog(t, ...A.climb))
  const ay = lerp(780, 650, cl2), ax2 = lerp(230, 210, cl2)
  if (cl2 > 0) { R(x, INK, ax2 - 74, ay + 84, 148, 16); R(x, '#a06a40', ax2 - 68, ay + 88, 136, 8); R(x, INK, ax2 - 64, ay + 100, 12, 300); R(x, INK, ax2 + 52, ay + 100, 12, 300) }
  let am = 'heart', al = [1, -1]
  if (t > A.climb[0]) { am = 'happy'; al = undefined }
  if (t > A.hey - 0.1) { am = 'wide'; al = [1, -1] }
  if (t > A.drop + 0.2) { am = 'happy'; al = undefined }
  if (t > A.tooSoon) { am = 'wink'; al = undefined }
  const hops = [A.climb[0], A.hey, A.shout, A.shout + 0.35, A.tooSoon]
  const big = t > A.shout && t < A.shout + 0.6 ? 0.14 * Math.sin(Math.PI * prog(t, A.shout, A.shout + 0.6)) : 0
  drawStarChar(x, ax2, ay, 230, t, { color: ARI.color, glyph: ARI.glyph, mood: am, look: al, seed: 4, hops, squash: -big })
  bangs(x, starFrame(ax2, ay, 230, t, { hops, seed: 4, squash: -big }))
  if (cl2 < 0.5) { table(x, 260, 870, 300, false); oldPhone(x, 370, 830) }
  else { table(x, 330, 900, 300, false); oldPhone(x, 250, 860) }
  if (t < A.climb[0]) hearts(x, t, 260, 620, A.stare + 0.2, { n: 3, life: 1.3, cell: 5, spread: 60 })
  // the shout
  speech(x, t, 250, 470, A.hey, 'HEY!!', { size: 48, tail: -1, life: 0.72, col: '#fff3c8' })
  speech(x, t, 420, 330, A.shout, 'I THINK I\nLOVE YOU!!', { size: 62, tail: -1, life: 2.05, col: '#ffe36a', shake: 5, rot: -0.04 })
  speech(x, t, 700, 360, A.dateOne, 'it’s… date one?', { size: 34, tail: 1, life: 1.75 })
  speech(x, t, 250, 450, A.tooSoon, 'too soon?', { size: 38, tail: -1, life: 1.2, col: '#fff3c8' })
  sparkles(x, t, 420, 330, A.shout, 10, 220, 0.3, [GOLD, '#ff4f4f', BONE], 28)
}

// ── NOW: 2026
const B = { meter: [7.25, 7.85], max: 7.85, i: 8.2, pause: 8.42, ask: 8.75, go: 9.85, big: 10.55, glance: 10.7, heart: 11.45, meToo: 11.5 }
const BGB = [{ x: 140, y: 600, s: 104, c: OTHERS[3], seed: 21 }, { x: 760, y: 600, s: 104, c: OTHERS[0], seed: 22 }]
function sceneB(x, t) {
  court(x, t, true)
  // back: Pisces + two others
  table(x, 450, 640, 160, true)
  pisces(x, t, 450, 580, 104, t > B.heart ? 3 : 1, { mood: t > B.heart ? 'happy' : 'sparkle', look: [0, 1], seed: 6 })
  for (const b of BGB) {
    const g = t > B.glance && t < B.glance + 1.4
    drawStarChar(x, b.x, b.y, b.s, t, { color: b.c, mood: g ? 'happy' : 'neutral', look: g ? [b.x > 450 ? -1 : 1, 1] : undefined, seed: b.seed, hops: [B.glance + (b.seed - 21) * 0.1] })
  }
  // the two at one table
  const shake = t > B.meter[0] && t < B.i ? 4 * Math.sin(t * 70) : 0
  let am = 'happy', al
  if (t > B.meter[0] && t < B.i) { am = 'wide'; al = [1, 0] }
  if (t > B.i && t < B.ask) { am = 'squint'; al = [1, 0] }
  if (t > B.ask) { am = 'sparkle'; al = [1, 0] }
  if (t > B.big) { am = 'happy'; al = undefined }
  if (t > B.heart) am = 'heart'
  const aH = [B.i, B.ask, B.ask + 0.5, B.big, B.big + 0.3, B.heart + 0.1]
  drawStarChar(x, 250 + shake, 810, 250, t, { color: ARI.color, glyph: ARI.glyph, mood: am, look: al, seed: 4, hops: aH, squash: t > B.pause && t < B.ask ? 0.1 : 0 })
  let cm = 'happy', cl = [-1, 0]
  if (t > B.i && t < B.go) { cm = 'neutral'; cl = [-1, 0] }
  if (t > B.big && t < B.heart) { cm = 'wide'; cl = [-1, 0] }
  if (t > B.heart) { cm = 'heart'; cl = undefined }
  drawStarChar(x, 650, 810, 250, t, { color: CAP.color, glyph: CAP.glyph, mood: cm, look: cl, seed: 9, hops: [B.go, B.meToo, B.meToo + 0.3] })
  table(x, 450, 935, 580, true)
  // two drinks
  for (const [cx, c] of [[350, '#ff8fb1'], [550, '#9fe6b0']]) { R(x, INK, cx - 22, 875, 44, 62); R(x, c, cx - 17, 881, 34, 52); R(x, INK, cx + 4, 845, 6, 34) }
  // the FEELINGS meter slams to MAX
  const mk = pop01(t, B.meter[0] - 0.1, 0.25, 2) * outK(t, [B.i + 0.1, B.i + 0.3])
  if (mk > 0.01) {
    x.save(); x.translate(250, 470); x.scale(mk, mk)
    x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.fillStyle = BONE; x.strokeStyle = INK; x.lineWidth = 6
    x.strokeText('FEELINGS', 0, -40); x.fillText('FEELINGS', 0, -40)
    R(x, INK, -130, -26, 260, 46); R(x, '#2a1f55', -124, -20, 248, 34)
    const f = ease.inQuad(prog(t, ...B.meter))
    for (let i = 0; i < 12; i++) if ((i + 1) / 12 <= f + 0.001) R(x, i > 8 ? '#ff4f4f' : i > 5 ? '#ffb04a' : '#ffd35a', -122 + i * 20.5, -17, 17, 28)
    if (t > B.max) { const bl = Math.floor(t * 8) % 2; x.font = `800 34px Inter, sans-serif`; x.fillStyle = bl ? '#ff4f4f' : GOLD; x.strokeText('MAX', 168, 8); x.fillText('MAX', 168, 8) }
    x.restore()
  }
  sparkles(x, t, 370, 470, B.max, 8, 90, 1, ['#ff4f4f', GOLD, BONE], 22)
  speech(x, t, 270, 520, B.i, 'I—', { size: 46, tail: -1, life: 0.55, col: '#fff3c8' })
  // the pause icon
  if (t > B.pause && t < B.ask) { const k = pop01(t, B.pause, 0.2, 3); drawBits(x, ['WW.WW', 'WW.WW', 'WW.WW', 'WW.WW', 'WW.WW'], { W: BONE }, 250, 540, 12 * k) }
  speech(x, t, 300, 520, B.ask, 'can I say\nsomething big?', { size: 38, tail: -1, life: 1.75, col: '#fffaf0' })
  speech(x, t, 640, 520, B.go, 'go for it.', { size: 40, tail: 1, life: 1.3, col: '#e9fff0' })
  speech(x, t, 290, 500, B.big, 'I REALLY\nlike you.', { size: 52, tail: -1, life: 1.9, col: '#ffe36a', shake: 1.5 })
  speech(x, t, 650, 540, B.meToo, 'me too.', { size: 44, tail: 1, life: 1.25, col: '#ffe1ec' })
  if (t > B.heart) hearts(x, t, 450, 640, B.heart, { n: 8, life: 1.8, cell: 6, spread: 360, seed: 2 })
  sparkles(x, t, 450, 640, B.heart, 10, 160, 2, [HEART, GOLD, BONE], 24)
}

const EP = makeThenNow({
  id: 'yraries', thing: 'Aries dating in', then: '2016', stamp: '08·14·2016', accent: '#ff6a4a',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: 'Aries in 2016 had one volume: *loud.*' },
    { t: 9.0, text: 'same speed. now with a *pause button.*' },
    { t: 12.92, text: 'fast is fine. *ask first.*' },
  ],
  last: 'Still fast. | *Now* kind.',
  cues: () => [
    ['pop', A.stare + 0.2, 1046.5, 0.025, -0.3],
    ['whoosh', A.climb[0], 0.25, 0.03], ['tick', A.climb[1], 0.05],
    ['pop', A.hey, 880, 0.045, -0.3], ['pop', A.hey + 0.1, 1046.5, 0.04, -0.3],
    ['boom', A.shout, 0.18], ['pop', A.shout, 1318.51, 0.06, -0.2], ['pop', A.shout + 0.08, 1567.98, 0.05, -0.2], ['pop', A.shout + 0.16, 2093, 0.04, -0.2],
    ...[0, 1, 2].map(i => ['pop', r3(A.turn + i * 0.08), 1174.66 + i * 120, 0.03, 0.3]),
    ['whoosh', A.drop, 0.3, 0.04], ['tom', r3(A.drop + 0.45), 180, { gain: 0.22, decay: 0.15 }], ['tick', r3(A.drop + 0.46), 0.07], ['tick', r3(A.drop + 0.55), 0.05],
    ['pop', A.dateOne, 659.25, 0.03, 0.4], ['pop', A.tooSoon, 783.99, 0.035, -0.3], ['pop', r3(A.tooSoon + 0.12), 880, 0.03, -0.3],
    ['riser', B.meter[0], B.max, 0.035], ['pop', B.max, 1567.98, 0.05, -0.3], ['glitter', B.max, r3(B.max + 0.3)],
    ['pop', B.i, 880, 0.04, -0.3], ['tick', B.pause, 0.05],
    ['pop', B.ask, 783.99, 0.03, -0.3], ['pop', r3(B.ask + 0.12), 880, 0.03, -0.3],
    ['pop', B.go, 1046.5, 0.035, 0.3],
    ['pop', B.big, 1174.66, 0.045, -0.3], ['pop', r3(B.big + 0.1), 1318.51, 0.04, -0.3],
    ['pluck', B.meToo, 1567.98, 0.045, 0.5, 0.3], ['glitter', B.heart, r3(B.heart + 0.4)],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
