// nhve01: THEN vs NOW: HOLIDAYS, "Aries' holidays in 2016 / 2026" (20 s, b18 #1, music: jazzy · C)
// The look lives in ./thennow.js and the holiday props in ./holkit.js (both shared by nhve01–nhve24).
//   0–6.71    2016, 5:02 AM, the living room (old-phone grade, "12·25·2016"): ♈ Aries is mid-rip at t = 0, a
//             wrapping-paper storm, the OPENED counter racing up. ♑ Capricorn shuffles in, sleepy, holding a mug:
//             "those were… ours." Aries, holding a tag that isn't its name: "…oops?" ♓ Pisces on the couch sobs at the mess.
//   6.71      the card cut; the year sticker flips to 2026.
//   6.71–12.8 2026, the same room, tidy: Aries hands Capricorn a gift first, then sits on its hands (the WAITING meter
//             wobbles), Capricorn opens it slowly, Aries bursts: "DO YOU LIKE IT?!" Capricorn: "I love it." Pisces
//             happy-sobs.
//   12.8–15.6 THE STARS: "excitement is a gift. *share it.*"  Last line: "*Patience*, gift-wrapped."
import {
  makeThenNow, drawStarChar, signStar, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs, pop01, outK, r3,
  INK, BONE, GOLD, PINK, HEART, MONO, SW, SH, lerp, prog, ease, clamp, R,
} from './thennow.js'
import { room, snowWindow, tree, gift, mug, stringLights, couch, sign, clockFace, beanie, scarf, mark, RED, GREEN, CREAM } from './holkit.js'

const ARI = signStar('aries'), CAP = signStar('capricorn')
const PAPER = [RED, '#3fa05a', GOLD, '#7fd0ff', '#ff8fb1']

function paperStorm(x, t, cx, cy, t0, seed) {
  const tt = t - t0
  if (tt < 0 || tt > 1.6) return
  for (let i = 0; i < 12; i++) {
    const a = -Math.PI / 2 + (i / 11 - 0.5) * 2.6 + seed, v = 420 + ((i * 37 + seed * 11) % 5) * 70
    const px = cx + Math.cos(a) * v * tt, py = Math.min(1000, cy + Math.sin(a) * v * tt + 700 * tt * tt)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 1.6); x.translate(px, py); x.rotate(tt * (5 + i))
    R(x, INK, -14, -10, 28, 20); R(x, PAPER[(i + seed) % 5], -11, -7, 22, 14); x.restore()
  }
}

// ── THEN: 2016, 5:02 AM
const A = { rips: [0, 0.75, 1.5, 2.25, 2.95], cap: 3.35, ours: 3.95, oops: 5.25, sob: 4.2 }
function sceneA(x, t) {
  room(x, t, { now: false })
  snowWindow(x, t, 70, 120, 230, 260, { night: true })
  clockFace(x, 470, 170, '5:02 AM', { size: 40, col: '#ff6a3a' })
  tree(x, t, 720, 640, 470, { now: false })
  // the shredded pile of paper on the floor grows
  const opened = A.rips.filter(r => t >= r + 0.1).length
  for (let i = 0; i < opened * 6; i++) { const h = Math.sin(i * 7.7) * 999; const r = h - Math.floor(h); R(x, INK, 120 + r * 560 - 2, 900 + ((i * 53) % 110) - 2, 34, 24); R(x, PAPER[i % 5], 120 + r * 560, 900 + ((i * 53) % 110), 30, 20) }
  // unopened gifts left under the tree
  const left = [[640, 700, 90, 70, RED], [760, 700, 70, 90, GREEN], [830, 690, 60, 60, '#7fd0ff'], [700, 760, 110, 60, '#ff8fb1'], [580, 750, 70, 50, GOLD]]
  left.forEach((g, i) => { if (i >= opened) gift(x, g[0], g[1] + 30, g[2], g[3], { col: g[4], rib: i % 2 ? RED : GOLD }) })
  // ♓ Pisces on the couch, crying at the carnage
  couch(x, 180, 690, 230, { col: '#9a5a8a' })
  pisces(x, t, 180, 550, 130, t > A.sob ? 3 : 1, { mood: t > A.sob ? 'wide' : 'sleepy', look: [1, 1], seed: 6 })
  // ♑ Capricorn in the doorway, sleepy, with a mug
  if (t > A.cap - 0.3) {
    const k = ease.outCubic(prog(t, A.cap - 0.3, A.cap + 0.2))
    const cx = lerp(980, 820, k)
    drawStarChar(x, cx, 480, 170, t, { color: CAP.color, glyph: CAP.glyph, mood: t > A.ours + 1.2 ? 'eyeroll' : 'sleepy', look: [-1, 1], seed: 9, hops: [A.ours], zzz: t < A.ours })
    mug(x, t, cx - 70, 560, { col: '#9fe6b0' })
  }
  // ♈ Aries, mid-rip, in a beanie
  const ri = A.rips.findLast(r => t >= r) ?? 0
  const rp = prog(t, ri, ri + 0.35)
  const ripping = t < A.rips[4] + 0.6
  let am = ripping ? (rp < 0.5 ? 'wide' : 'happy') : 'happy', al = ripping ? [1, 1] : undefined
  if (t > A.ours + 0.1) { am = 'wide'; al = [1, -1] }
  if (t > A.oops) { am = 'wink'; al = undefined }
  const hops = [...A.rips, A.ours + 0.15, A.oops]
  const ax = 380, ay = 780
  drawStarChar(x, ax, ay, 230, t, { color: ARI.color, glyph: ARI.glyph, mood: am, look: al, seed: 4, hops, squash: ripping ? 0.08 * Math.sin(t * 30) : 0 })
  const F = starFrame(ax, ay, 230, t, { hops, seed: 4 })
  bangs(x, F)
  // the gift being ripped (in front)
  if (ripping) {
    const cols = left.map(g => g[4])
    const gi = Math.min(4, A.rips.indexOf(ri))
    gift(x, ax + 40, 960, 150, 110, { col: cols[gi], rib: gi % 2 ? RED : GOLD, open: ease.outCubic(rp), rot: 0.06 * Math.sin(t * 20) })
  }
  for (const r of A.rips) paperStorm(x, t, ax + 40, 860, r, A.rips.indexOf(r))
  // the OPENED counter
  sign(x, 470, 270, `OPENED: ${opened}`, { size: 34, col: '#fff3c8', rot: -0.05, k: pop01(t, -0.4, 0.3) })
  // the tag that isn't Aries'
  if (t > A.oops - 0.2) sign(x, ax + 150, 650, 'TO: CAP', { size: 26, col: '#fffaf0', rot: 0.12, k: pop01(t, A.oops - 0.2, 0.3) })
  speech(x, t, 230, 400, 0.3, 'MINE!!', { size: 48, tail: 1, life: 1.0, col: '#ffe36a', shake: 3 })
  speech(x, t, 690, 350, A.ours, 'those were…\nours.', { size: 36, tail: 1, life: 1.6 })
  speech(x, t, 260, 440, A.oops, '…oops?', { size: 42, tail: 1, life: 1.3, col: '#fff3c8' })
  mark(x, t, 820, 350, A.cap + 0.1, '!', { col: '#ff4f4f' })
}

// ── NOW: 2026, same room, tidy
const B = { hand: 7.2, sit: 7.95, open: [8.7, 10.1], burst: 10.25, love: 11.15 }
function sceneB(x, t) {
  room(x, t, { now: true })
  stringLights(x, t, 24, 26)
  snowWindow(x, t, 70, 120, 230, 260, { night: false })
  tree(x, t, 720, 640, 470, { now: true })
  gift(x, 620, 720, 80, 60, { col: '#7fd0ff' }); gift(x, 820, 720, 70, 80, { col: GREEN, rib: RED })
  couch(x, 450, 1000, 640, { col: '#7a5cc0' })
  // Pisces on the arm of the couch, happy tears
  pisces(x, t, 780, 820, 110, t > B.love ? 3 : 2, { mood: t > B.love ? 'happy' : 'sparkle', look: [-1, 0], seed: 6 })
  // the gift: Aries hands it over, Capricorn opens it
  const hk = ease.inOutCubic(prog(t, B.hand, B.hand + 0.6))
  const gx = lerp(300, 440, hk), gy = lerp(900, 950, hk)
  const op = ease.outCubic(prog(t, ...B.open))
  // Aries sits on its hands; the WAITING meter wobbles
  const waiting = t > B.sit && t < B.burst
  let am = t < B.sit ? 'happy' : 'squint', al = t < B.sit ? [1, 0] : [1, 0]
  if (waiting && t > 9.2) am = 'wide'
  if (t > B.burst) { am = 'sparkle'; al = [1, 0] }
  if (t > B.love) { am = 'heart'; al = undefined }
  const hopsA = [B.hand, B.sit, B.burst, B.burst + 0.3, B.love + 0.1]
  drawStarChar(x, 270 + (waiting ? 3 * Math.sin(t * 50) : 0), 780, 230, t, { color: ARI.color, glyph: ARI.glyph, mood: am, look: al, seed: 4, hops: hopsA, squash: waiting ? 0.06 : 0 })
  beanie(x, starFrame(270, 780, 230, t, { hops: hopsA, seed: 4, squash: waiting ? 0.06 : 0 }), RED)
  let cm = 'happy', cl = [-1, 0]
  if (t > B.open[0] && t < B.open[1]) { cm = 'neutral'; cl = [0, 1] }
  if (t > B.open[1]) { cm = 'sparkle'; cl = [0, 1] }
  if (t > B.love) { cm = 'heart'; cl = undefined }
  drawStarChar(x, 600, 780, 230, t, { color: CAP.color, glyph: CAP.glyph, mood: cm, look: cl, seed: 9, hops: [B.hand + 0.6, B.open[1], B.love] })
  scarf(x, starFrame(600, 780, 230, t, { hops: [B.hand + 0.6, B.open[1], B.love], seed: 9 }), '#9fe6b0')
  gift(x, gx, gy + 60, 130, 100, { col: RED, rib: GOLD, open: op })
  if (t > B.open[1]) {
    // what's inside: a knitted pixel mug cosy with a little goat on it
    const k = pop01(t, B.open[1], 0.3, 2.5)
    drawBits(x, ['.GGGGG.', 'GWGGGWG', 'GGWWWGG', 'GGWWWGG', 'GGGWGGG', '.GGGGG.'], { G: '#9fe6b0', W: CREAM }, gx, gy - 70, 12 * k)
    sparkles(x, t, gx, gy - 70, B.open[1], 10, 120, 1, [GOLD, PINK, BONE], 22)
  }
  // the WAITING meter
  const mk = pop01(t, B.sit, 0.25, 2) * outK(t, [B.burst - 0.05, B.burst + 0.15])
  if (mk > 0.01) {
    x.save(); x.translate(270, 460); x.scale(mk, mk); x.rotate(0.05 * Math.sin(t * 9))
    x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillStyle = BONE; x.strokeStyle = INK; x.lineWidth = 6
    x.strokeText('WAITING…', 0, -36); x.fillText('WAITING…', 0, -36)
    R(x, INK, -120, -24, 240, 40); R(x, '#2a1f55', -114, -18, 228, 28)
    const f = prog(t, B.sit, B.burst)
    for (let i = 0; i < 10; i++) if ((i + 1) / 10 <= f + 0.02) R(x, i > 7 ? '#ff4f4f' : i > 4 ? '#ffb04a' : '#ffd35a', -112 + i * 22.6, -15, 19, 22)
    x.restore()
  }
  speech(x, t, 330, 520, B.hand + 0.1, 'you first!', { size: 38, tail: -1, life: 1.2, col: '#fffaf0' })
  speech(x, t, 300, 470, B.burst, 'DO YOU\nLIKE IT?!', { size: 50, tail: -1, life: 1.5, col: '#ffe36a', shake: 2 })
  speech(x, t, 620, 520, B.love, 'I love it.', { size: 42, tail: 1, life: 1.5, col: '#ffe1ec' })
  if (t > B.love) hearts(x, t, 440, 620, B.love, { n: 7, life: 1.6, cell: 6, spread: 340, seed: 3 })
}

const EP = makeThenNow({
  id: 'nhve01', thing: 'Aries’ holidays in', then: '2016', stamp: '12·25·2016', accent: '#ff6a4a',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: 'Aries in 2016 opened *everything.*' },
    { t: 8.0, text: 'same excitement. now it *waits its turn.*' },
    { t: 12.92, text: 'excitement is a gift. *share it.*' },
  ],
  last: '*Patience*, | gift-wrapped.',
  cues: () => [
    ...A.rips.flatMap((r, i) => [['whoosh', r3(r + 0.02), 0.22, 0.035], ['tick', r3(r + 0.12), 0.06], ['pop', r3(r + 0.18), 880 + i * 110, 0.035, -0.3]]),
    ['pop', 0.3, 1046.5, 0.04, -0.3],
    ['pluck', A.cap, 392, 0.03, 0.4, 0.5], ['pop', A.ours, 659.25, 0.03, 0.4], ['pop', r3(A.ours + 0.14), 587.33, 0.03, 0.4],
    ['pop', A.oops, 783.99, 0.035, -0.3], ['pop', r3(A.oops + 0.12), 698.46, 0.03, -0.3],
    ['pop', r3(B.hand + 0.1), 880, 0.035, -0.3], ['whoosh', B.hand, 0.3, 0.03],
    ['riser', B.sit, B.burst, 0.03], ['tick', B.open[0], 0.05],
    ['glitter', B.open[1], r3(B.open[1] + 0.4)], ['pop', B.open[1], 1318.51, 0.04, 0.3],
    ['pop', B.burst, 1174.66, 0.05, -0.3], ['pop', r3(B.burst + 0.1), 1396.91, 0.04, -0.3],
    ['pluck', B.love, 1567.98, 0.045, 0.5, 0.3], ['glitter', B.love, r3(B.love + 0.4)],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
