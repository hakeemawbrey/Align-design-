// trlittlehoodie: LITTLE THINGS, "You can keep the hoodie." (20 s vertical, Star Talk Trends §18.4, music: dreamy · F)
// The format's look lives in ./little.js (identical in all five tr-little films).
//   0–3.6     10:41 PM, a park bench under a street lamp. ♎ Libra shivers (brrr, little breath puffs). ♏ Scorpio
//             notices, tosses its hoodie over: Libra lands inside it, heart eyes. Scorpio, in a T-shirt, shivering:
//             "i'm not cold."  ♓ Pisces peeks from behind the bush, crying.
//   3.6–7.2   "want it back?" "keep it." The chip flips through the days: DAY 3 (asleep in it) · DAY 19 (cocoa in it)
//             · DAY 64 (hood strings tied in a bow). THE STARS: "possession is *nine-tenths* of the hoodie."
//   7.2       card cut.
//   7.2–12.2  DAY 200, same bench: now SCORPIO shivers. Libra unzips: "get in." Two faces, one hood. "warm."
//             THE STARS: "sharing it was *the upgrade.*"
//   12.2–15.6 the patch shrinks up. Last line: "*Ours* now."
import {
  makeLittle, drawStarChar, signStar, R, S, speech, sfx, hearts, sparkles, drawBits, pisces, pop01, outK, r3,
  crescent, clamp, lerp, prog, ease, INK, BONE, GOLD, PINK, HEART, CREAM,
} from './little.js'

const LIB = signStar('libra'), SCO = signStar('scorpio')

const A = { shiver: [0.7, 2.3], brrr: 1.0, notice: 1.5, toss: [2.0, 2.5], heart: 2.7, notCold: 2.95 }
const B = { back: 3.85, keep: 4.6, d3: 5.2, d19: 5.9, d64: 6.6 }
const C = { shiver: [7.3, 9.0], brrr: 7.6, notice: 8.05, getin: 8.45, merge: [8.95, 9.35], warm: 10.15 }
const LX = 540, SX = 270, Y = 470, SZ = 220

// ── the park at night
function park(x, t, cold) {
  const g = x.createLinearGradient(0, 0, 0, 600); g.addColorStop(0, '#141038'); g.addColorStop(1, cold ? '#3a3f7a' : '#33296a')
  x.fillStyle = g; x.fillRect(0, 0, S, 600)
  for (let i = 0; i < 16; i++) { x.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.7 + i * 2.1)); R(x, BONE, (i * 149) % S, 20 + (i * 67) % 340, 4, 4); x.globalAlpha = 1 }
  crescent(x, 420, 110, 7)
  // far hills + grass
  R(x, '#231c4a', 0, 470, S, 130)
  R(x, '#1d3a3a', 0, 560, S, 240); for (let i = 0; i < 20; i++) R(x, '#24504a', (i * 53) % S, 580 + (i * 37) % 200, 10, 6)
  R(x, INK, 0, 556, S, 6)
  // the street lamp (left)
  R(x, INK, 70, 150, 14, 420); R(x, INK, 40, 120, 74, 40); R(x, '#ffe2a0', 48, 128, 58, 24)
  const lg = x.createRadialGradient(77, 150, 6, 77, 300, 360); lg.addColorStop(0, 'rgba(255,214,150,0.45)'); lg.addColorStop(1, 'rgba(255,214,150,0)')
  x.fillStyle = lg; x.fillRect(0, 0, 500, S)
  // the bush (right) where Pisces hides
  // the bench back (behind the stars)
  R(x, INK, 120, 430, 560, 70)
  for (let j = 0; j < 2; j++) R(x, '#9a6a44', 126, 436 + j * 32, 548, 24)
  // cold air: drifting frost sparkles
  if (cold) for (let i = 0; i < 14; i++) { const fx = (i * 97 + t * 18) % S, fy = (i * 61 + t * 30) % 560; x.globalAlpha = 0.6; R(x, '#dff3ff', fx, fy, 6, 6); x.globalAlpha = 1 }
}
function benchFront(x) {
  R(x, INK, 100, 540, 600, 34); R(x, '#b47a52', 106, 544, 588, 24); R(x, '#c98e63', 106, 544, 588, 6)
  R(x, INK, 140, 574, 20, 80); R(x, INK, 640, 574, 20, 80)
}
function bush(x) {
  R(x, INK, 690, 470, 120, 100)
  for (let i = 0; i < 3; i++) R(x, i % 2 ? '#2f7a55' : '#3a8f63', 696 + i * 36, 476 + (i % 2) * 8, 36, 94)
}

// ── the hoodie (pixel garment): a hood with a face hole (the star's face shows through), sleeves, strings, a pocket
const HOOD = '#4b3f7a'
const HOOD1 = [
  '.......HHHHHHHH.......',
  '.....HHHHHHHHHHHH.....',
  '....HHLLLLLLLLLLHH....',
  '...HHL..........LHH...',
  '...HL............LH...',
  '..HHL............LHH..',
  '..HHL............LHH..',
  '..HHL............LHH..',
  '..HHHL..........LHHH..',
  '.HHHHHLLLLLLLLLLHHHHH.',
  'HHHHHHHHSHHHHSHHHHHHHH',
  'HHDHHHHHSHHHHSHHHHHDHH',
  'HHDHHHHHSHHHHSHHHHHDHH',
  'HHDHHHHHHHHHHHHHHHHDHH',
  'HHDHHHDDDDDDDDDDHHHDHH',
  'HHDHHHDHHHHHHHHDHHHDHH',
  '.HHHHHDDDDDDDDDDHHHHH.',
  '..HHHHHHHHHHHHHHHHHH..',
]
const HOOD2 = HOOD1.map((r, j) => j < 10 ? r.slice(0, 17) + r.slice(5) : r.slice(0, 11) + r[10].repeat(12) + r.slice(11))
const HCOL = { H: HOOD, L: '#7a6cc4', D: '#352b5e', S: BONE, P: PINK }
const withBow = bm => bm.map((r, j) => j === 10 || j === 11 ? r.replace(/S/g, 'P') : r)
/** one-face hoodie centred on a star at (cx, cy) of sprite size s; faces: 2 = the shared one (cx = midpoint, gap = face spacing) */
function hoodie(x, t, cx, cy, s, { faces = 1, bow = false, k = 1, gap = 180, rot = 0 } = {}) {
  if (k <= 0.01) return
  const bm = faces === 2 ? HOOD2 : HOOD1
  const cell = faces === 2 ? gap / 14 : s / 20
  // the face hole's centre sits 3 rows above the bitmap centre
  drawBits(x, bow ? withBow(bm) : bm, HCOL, cx, cy + 3 * cell * k, cell * k, { rot })
}
function breath(x, t, px, py, t0, t1, dir = 1) {
  if (t < t0 || t > t1) return
  for (let i = 0; i < 3; i++) {
    const ph = ((t - t0) * 1.2 + i / 3) % 1
    x.globalAlpha = 0.8 * Math.sin(Math.PI * ph)
    R(x, '#e8f6ff', px + dir * (20 + ph * 60), py - ph * 30, 14 + ph * 16, 10 + ph * 8)
    x.globalAlpha = 1
  }
}
const jitter = (t, on) => on ? 4 * Math.sin(t * 60) : 0

function draw(x, t) {
  const after = t >= 7.2
  park(x, t, after)
  // ♓ Pisces behind the bush
  pisces(x, t, 750, 440, 130, after ? (t > C.merge[1] ? 3 : 2) : t > A.heart ? 3 : 1, { mood: (after && t > C.merge[1]) || (!after && t > A.heart) ? 'happy' : 'wide', look: [-1, 0], seed: 6 })
  bush(x)
  if (!after) {
    // Libra: shivering, then in the hoodie
    const lsh = t > A.shiver[0] && t < A.toss[1]
    const inH = t > A.toss[1]
    let lm = 'wide', ll = [0, 0]
    if (t > A.notice) ll = [-1, 0]
    if (t > A.heart) { lm = 'heart'; ll = undefined }
    if (t > B.back - 0.1) { lm = 'happy' }
    if (t > B.d3) lm = 'sleepy'
    if (t > B.d19) lm = 'sparkle'
    if (t > B.d64) lm = 'happy'
    const lHops = [A.brrr, A.toss[1], A.heart, B.back, B.d3, B.d19, B.d64]
    const lx = LX + jitter(t, lsh)
    drawStarChar(x, lx, Y, SZ, t, { color: LIB.color, glyph: inH ? null : LIB.glyph, mood: lm, look: ll, hops: lHops, seed: 7, glow: 1.1, blink: lm === 'wide' ? false : undefined })
    if (inH) hoodie(x, t, lx, Y, SZ, { k: pop01(t, A.toss[1], 0.3, 2.4), bow: t > B.d64 })
    breath(x, t, lx + 30, Y + 10, A.shiver[0], A.toss[1], 1)
    // the cocoa (day 19)
    if (t > B.d19 && t < B.d64) drawBits(x, ['.S.S..', '..S.S.', 'MMMMM.', 'MCCCMM', 'MMMMM.M', '.MMM...'].map(r => r.padEnd(7, '.')), { M: '#e57ea2', C: '#7a4a30', S: '#ffffff' }, lx + 120, Y + 30, 9)
    // Scorpio: tosses its hoodie, then shivers in a T-shirt, "not cold"
    const tossed = t > A.toss[0]
    const ssh = t > A.notCold - 0.2 && t < B.back
    let sm = 'neutral', sl = [1, 0]
    if (t > A.notice) { sm = 'wide'; sl = [1, 0] }
    if (t > A.toss[0]) sm = 'happy'
    if (t > A.notCold - 0.2) { sm = 'squint'; sl = [-1, -1] }
    if (t > B.keep - 0.1) { sm = 'wink'; sl = [1, 0] }
    if (t > B.d3) { sm = 'happy' }
    const sx = SX + jitter(t, ssh)
    drawStarChar(x, sx, Y, SZ, t, { color: SCO.color, glyph: tossed ? SCO.glyph : null, mood: sm, look: sl, hops: [A.notice, A.toss[0], B.keep], seed: 4, glow: 1.1 })
    if (!tossed) hoodie(x, t, sx, Y, SZ)
    breath(x, t, sx - 30, Y + 10, A.notCold, B.back, -1)
    // the hoodie in the air
    if (t > A.toss[0] && t < A.toss[1]) {
      const p = prog(t, ...A.toss)
      hoodie(x, t, lerp(SX, LX, p), Y - Math.sin(Math.PI * p) * 220, SZ * 0.7, { rot: p * 5 })
    }
    sfx(x, t, LX + 60, 280, A.brrr, 'brrr', { size: 44, life: 0.9, col: '#cfeeff', rot: 0.12 })
    sfx(x, t, 400, 250, A.toss[0] + 0.1, 'whoosh', { size: 36, life: 0.5, col: BONE })
    speech(x, t, 250, 270, A.notCold, "i'm not cold.", { size: 32, tail: -1, life: 0.95, col: '#e9dcff' })
    speech(x, t, 560, 270, B.back, 'want it back?', { size: 32, tail: 1, life: 0.7, col: '#ffe1ec' })
    speech(x, t, 260, 270, B.keep, 'keep it.', { size: 34, tail: -1, life: 0.6, col: '#e9dcff' })
    if (t > A.heart) hearts(x, t, LX, 320, A.heart, { n: 4, life: 1.2, cell: 6, spread: 100 })
    sparkles(x, t, LX, Y, A.toss[1], 10, 140, 1, [PINK, BONE, GOLD], 22)
  } else {
    // DAY 200: Scorpio shivers; Libra makes room
    const m = ease.inOutCubic(prog(t, ...C.merge))
    const together = t > C.merge[0] + 0.15
    const ssh = t > C.shiver[0] && t < C.merge[0]
    let sm = 'wide', sl = [0, 0]
    if (t > C.getin) { sm = 'sparkle'; sl = [1, 0] }
    if (together) { sm = 'heart'; sl = undefined }
    const sx = lerp(SX, 410, m) + jitter(t, ssh), lx = lerp(LX, 520, m)
    let lm = 'happy', ll = [0, 0]
    if (t > C.notice) { lm = 'wide'; ll = [-1, 0] }
    if (t > C.getin - 0.1) { lm = 'happy'; ll = [-1, 0] }
    if (together) lm = 'heart'
    if (t > C.warm) { lm = 'happy'; sm = 'happy' }
    const sz = together ? 205 : SZ
    drawStarChar(x, together ? 415 : sx, Y + (together ? 10 : 0), sz, t, { color: SCO.color, glyph: together ? null : SCO.glyph, mood: sm, look: sl, hops: [C.brrr, C.getin + 0.3, C.merge[1], C.warm], seed: 4, glow: 1.1, blink: sm === 'wide' ? false : undefined })
    drawStarChar(x, together ? 605 : lx, Y + (together ? 10 : 0), sz, t, { color: LIB.color, mood: lm, look: ll, hops: [C.notice, C.getin, C.merge[1], C.warm], seed: 7, glow: 1.1 })
    if (!together) hoodie(x, t, lx, Y, SZ, { bow: true })
    else hoodie(x, t, 503, Y - 2, 205, { faces: 2, bow: true, gap: 190, k: pop01(t, C.merge[0] + 0.15, 0.35, 2.4) })
    breath(x, t, sx - 30, Y + 10, C.shiver[0], C.merge[0], -1)
    sfx(x, t, 230, 290, C.brrr, 'brrr', { size: 44, life: 0.9, col: '#cfeeff', rot: -0.12 })
    speech(x, t, 560, 270, C.getin, 'get in.', { size: 36, tail: 1, life: 0.85, col: '#ffe1ec' })
    speech(x, t, 250, 250, C.warm, 'warm.', { size: 36, tail: -1, life: 1.2, col: '#e9dcff' })
    sparkles(x, t, 510, Y, C.merge[1], 12, 190, 2, [PINK, BONE, GOLD], 24)
    if (together) hearts(x, t, 560, 320, C.merge[1], { n: 6, life: 1.6, cell: 6, spread: 220 })
  }
  benchFront(x)
}

const EP = makeLittle({
  id: 'trlittlehoodie', accent: '#c9a6ff',
  tag: '“You can keep *the hoodie.*”',
  draw,
  clock: [{ at: 0.7, text: '10:41 PM' }, { at: B.d3, text: 'DAY 3' }, { at: B.d19, text: 'DAY 19' }, { at: B.d64, text: 'DAY 64' }, { at: 7.25, text: 'DAY 200' }],
  lines: [{ t: 5.15, text: 'possession is *nine-tenths* of the hoodie.' }, { t: 9.65, text: 'sharing it was *the upgrade.*' }],
  last: '*Ours* now.',
  cues: () => [
    ...[0, 0.06, 0.12, 0.18].map(d => ['tom', r3(A.brrr + d), 120, { gain: 0.06, decay: 0.04 }]), ['pop', A.brrr, 1318.51, 0.025, 0.3],
    ['pop', A.notice, 1174.66, 0.03, -0.3], ['whoosh', A.toss[0], 0.45, 0.035], ['tick', A.toss[1], 0.05],
    ['pluck', A.heart, 1318.51, 0.04, 0.5, 0.3], ['pluck', A.heart + 0.12, 1567.98, 0.035, 0.5, 0.3], ['glitter', A.toss[1], A.toss[1] + 0.4],
    ['pop', A.notCold, 783.99, 0.03, -0.3], ['pop', B.back, 1046.5, 0.03, 0.3], ['pop', B.keep, 880, 0.035, -0.3],
    ['whoosh', B.d3 - 0.05, 0.2, 0.02], ['whoosh', B.d19 - 0.05, 0.2, 0.02], ['whoosh', B.d64 - 0.05, 0.2, 0.02],
    ...[0, 0.06, 0.12, 0.18].map(d => ['tom', r3(C.brrr + d), 120, { gain: 0.06, decay: 0.04 }]), ['pop', C.brrr, 1174.66, 0.025, -0.3],
    ['pop', C.notice, 1318.51, 0.03, 0.3], ['pop', C.getin, 1046.5, 0.035, 0.3],
    ['whoosh', C.merge[0], 0.35, 0.03], ['bell', C.merge[1], 2093, 0.03, 1.1, 0], ['glitter', C.merge[1], C.merge[1] + 0.5],
    ['pluck', C.warm, 1318.51, 0.035, 0.6, -0.2],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
