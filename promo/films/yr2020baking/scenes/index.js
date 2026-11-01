// yr2020baking: THEN vs NOW, "Date night in 2020 → 2026" (20 s vertical, STARTALK-THENNOW.md Block F #28,
// music: dreamy · F). The format's look lives in ./thennow.js (identical in all five Block F films).
//   0–7.0     THEN (2020, old phone video): a ♍ Virgo star bakes bread "for us" on a video date (a phone propped on
//             the counter shows the ♋ Cancer, baking too). Virgo's loaf: flat. Cancer's: perfect. Virgo pushes a slice
//             at the screen: BONK on the glass, "DELIVERY FAILED". So it eats the slice: "this bite's for you."
//             ♓ Pisces sobs at the kitchen window.  THE STARS: "bread *for us.* eaten by one."
//             Sub: "baking *for us.* (apart.)"
//   7.0       card cut; the year sticker flips to 2026.
//   7.0–12.5  NOW (the same kitchen, together): one dough, four hands' worth of kneading. "more flour?" "…more flour."
//             POOF: flour everywhere, both dusted white (Pisces too). DING: a lumpy heart loaf. They bite from both
//             ends and meet in the middle.  THE STARS: "flour: everywhere. bread: *shared.*"
//             Sub: "baking *together.* (messy.)"
//   12.5–15.6 payoff: THE STARS "still lumpy. still *ours.*"  Last line: "*Kneaded* you."
import {
  makeThenNow, drawStarChar, signStar, starFrame, inSprite, R, speech, hearts, sparkles, drawBits, pisces, pop01, outK, r3, tag,
  hash, INK, BONE, GOLD, PINK, HEART, clamp, lerp, prog, ease, easeOutBack,
} from './thennow.js'

const VIR = signStar('virgo'), CAN = signStar('cancer')
const BREAD = { L: '#e0a050', H: '#f6cf8a', D: '#a8662e' }
const LOAF_OK = ['..LLLLLL..', '.LLHLLHLL.', 'LLLLLLLLLL', 'LHLLLLLLHL', 'DDDDDDDDDD']
const LOAF_FLAT = ['.LL..LLL..L.', 'LLLLLLLLLLLL', 'DDDDDDDDDDDD']
const LOAF_HEART = ['.LLL.LLL.', 'LLHLLLHLL', 'LLLLLLLLL', 'LLLLLLLLL', '.LLLLLLL.', '..LLLLL..', '...LLL...', '....L....']
const SLICE = ['.DDDD.', 'DLLLLD', 'DLLLLD', 'DLLLLD', 'DDDDDD']
const SLICE_C = { D: '#c07a38', L: '#fbe3b0' }

function kitchen(x, t, now) {
  R(x, now ? '#5e7fa8' : '#55739a', 0, 0, 880, 580)
  for (let j = 0; j < 8; j++) for (let i = 0; i < 12; i++) R(x, now ? '#6d8fb8' : '#6283ad', i * 76 + (j % 2) * 38 - 20, j * 72 + 4, 70, 64)   // tiles
  // window (top right)
  R(x, INK, 600, 70, 240, 240); R(x, now ? '#ffd9a0' : '#8fc6ff', 610, 80, 220, 220); R(x, now ? '#ffe9c4' : '#b4dbff', 610, 80, 220, 70)
  // shelf with jars (left)
  R(x, INK, 40, 170, 300, 18); R(x, '#8a5a3a', 44, 172, 292, 12)
  for (const [jx, c] of [[80, '#f4e8cc'], [150, '#ffcf6b'], [220, '#e8a0b8'], [290, '#cde8b0']]) { R(x, INK, jx - 24, 92, 48, 80); R(x, c, jx - 20, 100, 40, 70); R(x, '#8a5a3a', jx - 22, 92, 44, 12) }
  // counter + cabinets + oven
  R(x, '#6b4a3a', 0, 600, 880, 280); for (let i = 0; i < 4; i++) { R(x, INK, 30 + i * 220, 630, 190, 230); R(x, '#7d5845', 36 + i * 220, 636, 178, 218); R(x, GOLD, 110 + i * 220, 660, 30, 8) }
  R(x, INK, 250, 630, 190, 230); R(x, '#3a3a48', 256, 636, 178, 218); R(x, INK, 276, 690, 138, 110); R(x, now ? '#ffb347' : '#5a3a28', 280, 694, 130, 102); R(x, '#c9c9d6', 276, 650, 138, 12)
}
function counterTop(x) { R(x, INK, 0, 568, 880, 40); R(x, '#efe6d6', 0, 572, 880, 30); R(x, '#d6ccbb', 0, 596, 880, 6) }
/** white flour dust over a star (sprite cells, fixed spots) */
function flourOn(x, F, k, seed) {
  if (k <= 0) return
  inSprite(x, F, () => {
    x.fillStyle = `rgba(255,255,255,${0.85 * k})`
    for (let i = 0; i < 26; i++) { const u = 7 + hash(i + seed) * 22, v = 5 + hash(i * 3 + seed + 1) * 26, s = 1 + Math.floor(hash(i + seed * 2) * 2); x.fillRect(Math.round(u), Math.round(v), s, s) }
  })
}

// ── A: 2020, baking apart
const A = { show: [0.7, 1.0], forus: 0.85, theirs: 2.1, push: [2.85, 3.22], bonk: 3.22, fail: 3.3, bite: [4.5, 4.75], biteAt: 4.75 }
function sceneA(x, t) {
  kitchen(x, t, false)
  // ♓ Pisces at the window, moved by long-distance bread
  x.save(); x.beginPath(); x.rect(610, 80, 220, 220); x.clip()
  pisces(x, t, 720, 230, 160, t > A.biteAt ? 3 : t > A.bonk ? 2 : 1, { mood: t > A.biteAt ? 'happy' : 'wide', look: [-1, 1], hops: [A.bonk + 0.1, A.biteAt + 0.1] })
  x.restore(); R(x, INK, 716, 80, 8, 220)
  // the Virgo behind the counter
  const P0 = { x: 250, y: 440, s: 270 }
  let mood = 'happy', look = [1, 0]
  if (t > A.theirs + 0.2) mood = 'neutral'
  if (t > A.push[0]) mood = 'sparkle'
  if (t > A.bonk) mood = 'wide'
  if (t > A.bite[0]) mood = 'squint'
  if (t > A.biteAt + 0.4) mood = 'happy'
  const sq = t > A.biteAt && t < A.biteAt + 0.6 ? 0.08 * Math.sin((t - A.biteAt) * 30) : 0
  drawStarChar(x, P0.x, P0.y, P0.s, t, { color: VIR.color, glyph: VIR.glyph, mood, look, hops: [A.forus, A.push[0], A.bonk + 0.05], seed: 5, squash: sq })
  counterTop(x)
  // the flat loaf, lifted to show off
  const lift = ease.outBack(prog(t, ...A.show)) - ease.inOutCubic(prog(t, A.theirs + 0.3, A.theirs + 0.6))
  drawBits(x, LOAF_FLAT, BREAD, 420, lerp(548, 470, lift), 12)
  // the phone propped up, with the ♋ Cancer and a perfect loaf
  R(x, INK, 540, 300, 200, 280); R(x, '#26243a', 548, 308, 184, 264)
  x.save(); x.beginPath(); x.rect(558, 324, 164, 232); x.clip()
  R(x, '#ffd59a', 558, 324, 164, 232); R(x, '#f2c27e', 558, 470, 164, 86)
  drawStarChar(x, 640, 440, 120, t, { color: CAN.color, glyph: CAN.glyph, mood: t > A.bonk ? 'wide' : 'happy', look: [-1, 0], hops: [A.theirs, A.bonk + 0.05], seed: 9 })
  const up = ease.outBack(prog(t, A.theirs - 0.1, A.theirs + 0.2))
  drawBits(x, LOAF_OK, BREAD, 640, lerp(560, 500, up), 7)
  x.restore()
  R(x, '#9a9cb0', 600, 580, 80, 10)
  // the slice: pushed at the screen (BONK on the glass), then eaten
  const pu = ease.inCubic(prog(t, ...A.push)), bi = ease.inOutCubic(prog(t, ...A.bite))
  if (t > A.push[0] - 0.2 && t < A.biteAt) {
    const k = pop01(t, A.push[0] - 0.2, 0.2, 2)
    let sx = lerp(420, 625, pu), sy = lerp(450, 430, pu), sqs = 1
    if (t > A.bonk) { const b = prog(t, A.bonk, A.bonk + 0.5); sx = lerp(625, 470, ease.outCubic(b)); sy = 430 + 60 * ease.outCubic(b); sqs = 1 - 0.3 * Math.exp(-(t - A.bonk) * 8) }
    if (t > A.bite[0]) { sx = lerp(470, P0.x + 30, bi); sy = lerp(490, P0.y + 30, bi) }
    drawBits(x, SLICE, SLICE_C, sx, sy, 11 * k, { sx: sqs, sy: 2 - sqs })
  }
  if (t > A.bonk && t < A.bonk + 0.9) {
    const k = pop01(t, A.bonk, 0.2, 3) * outK(t, [A.bonk + 0.7, A.bonk + 0.9])
    x.save(); x.translate(640, 380); x.rotate(-0.1); x.scale(k, k); x.font = `800 58px Inter, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.lineWidth = 12; x.strokeStyle = INK; x.strokeText('BONK', 0, 0); x.fillStyle = GOLD; x.fillText('BONK', 0, 0); x.restore()
  }
  tag(x, t, 430, 140 + 120, A.fail, 'DELIVERY FAILED', { size: 32, life: A.bite[0] - A.fail, col: '#ff8f8f', rot: -0.04 })
  if (t > A.biteAt) for (let i = 0; i < 6; i++) { const p = prog(t, A.biteAt, A.biteAt + 0.8); if (p < 1) R(x, '#fbe3b0', P0.x + 40 + i * 10 - 30 * p, P0.y + 50 + 80 * p * p + i * 6, 8, 8) }
  // lines
  speech(x, t, 300, 210, A.forus, 'I made bread… for us!', { size: 36, tail: 0, life: 1.15 })
  speech(x, t, 650, 250, A.theirs, 'me too!', { size: 36, tail: 0, life: 0.95 })
  speech(x, t, 330, 210, A.biteAt + 0.05, 'this bite’s for you.', { size: 38, tail: 0, life: 1.9 })
}

// ── B: 2026, baking together
const B = { knead: [7.3, 9.1], more1: 8.0, more2: 8.5, poof: 9.25, ding: 10.2, loaf: 10.35, lift: [10.7, 11.0], lean: [11.2, 11.45], boop: 11.45 }
function sceneB(x, t) {
  kitchen(x, t, true)
  const dust = clamp(prog(t, B.poof, B.poof + 0.35))
  x.save(); x.beginPath(); x.rect(610, 80, 220, 220); x.clip()
  const PF = starFrame(720, 230, 160, t, { seed: 6 })
  pisces(x, t, 720, 230, 160, t > B.boop ? 3 : 2, { mood: t > B.boop ? 'happy' : t > B.poof ? 'wide' : 'sparkle', look: [-1, 1], hops: [B.poof + 0.1, B.boop + 0.1] })
  flourOn(x, PF, dust, 40)
  x.restore(); R(x, INK, 716, 80, 8, 220)
  // the two
  const ln = ease.inOutCubic(prog(t, ...B.lean))
  const V = { x: 250 + 50 * ln, y: 440 }, C = { x: 630 - 50 * ln, y: 440 }
  const kneads = Array.from({ length: 5 }, (_, i) => r3(B.knead[0] + 0.15 + i * 0.36))
  const vm = t > B.boop ? 'heart' : t > B.ding ? 'sparkle' : t > B.poof ? 'squint' : 'happy'
  const cm = t > B.boop ? 'heart' : t > B.ding ? 'sparkle' : t > B.poof ? 'wide' : 'happy'
  const vo = { color: VIR.color, glyph: VIR.glyph, mood: vm, look: [1, 0], hops: [...kneads.filter((_, i) => i % 2 === 0), B.more2, B.ding, B.boop], seed: 5, blush: t > B.lean[0] ? 1 : undefined }
  const co = { color: CAN.color, glyph: CAN.glyph, mood: cm, look: [-1, 0], hops: [...kneads.filter((_, i) => i % 2 === 1), B.more1, B.ding + 0.1, B.boop], seed: 9, blush: t > B.lean[0] ? 1 : undefined }
  drawStarChar(x, V.x, V.y, 260, t, vo); flourOn(x, starFrame(V.x, V.y, 260, t, vo), dust, 3)
  drawStarChar(x, C.x, C.y, 260, t, co); flourOn(x, starFrame(C.x, C.y, 260, t, co), dust, 17)
  counterTop(x)
  // one dough, kneaded by both (squishes on each knead), until the loaf comes out
  if (t < B.ding) {
    const kq = kneads.reduce((a, k) => a + (t > k && t < k + 0.3 ? Math.sin(Math.PI * (t - k) / 0.3) : 0), 0)
    drawBits(x, ['..DDDD..', '.DDDDDD.', 'DDDDDDDD', 'DDDDDDDD'], { D: '#f6ead0' }, 440, 548, 14, { sx: 1 + 0.15 * kq, sy: 1 - 0.15 * kq })
    kneads.forEach((k, i) => { const p = prog(t, k, k + 0.5); if (p > 0 && p < 1) for (let j = 0; j < 3; j++) R(x, `rgba(255,255,255,${0.8 * (1 - p)})`, 410 + j * 30 + (i % 2 ? 20 : -20), 520 - 50 * p - j * 8, 10, 10) })
  } else {
    const lk = pop01(t, B.loaf, 0.35, 2.2), up = ease.inOutCubic(prog(t, ...B.lift))
    drawBits(x, LOAF_HEART, BREAD, 440, lerp(520, 420, up), 13 * lk)
  }
  // POOF: the flour cloud
  if (t > B.poof && t < B.poof + 1.0) {
    const p = prog(t, B.poof, B.poof + 1.0)
    x.save(); x.globalAlpha = 0.95 * (1 - ease.inQuad(p))
    for (let i = 0; i < 14; i++) { const a = i * 0.45, r = 60 + 360 * ease.outCubic(p) * (0.5 + 0.5 * hash(i)); const s = 90 * (1 - 0.4 * p) + 40 * hash(i + 3); R(x, '#ffffff', 440 + Math.cos(a) * r - s / 2, 470 + Math.sin(a) * r * 0.7 - s / 2, s, s) }
    x.restore()
    const k = pop01(t, B.poof, 0.2, 3) * outK(t, [B.poof + 0.7, B.poof + 0.9])
    x.save(); x.translate(440, 300); x.rotate(0.08); x.scale(k, k); x.font = `800 70px Inter, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.lineWidth = 12; x.strokeStyle = INK; x.strokeText('POOF', 0, 0); x.fillStyle = '#ffffff'; x.fillText('POOF', 0, 0); x.restore()
  }
  tag(x, t, 345, 760, B.ding, 'DING!', { size: 40, life: 1.1, col: GOLD, rot: -0.05 })
  if (t > B.boop) hearts(x, t, 440, 360, B.boop, { n: 7, life: 1.6, cell: 7, spread: 260 })
  sparkles(x, t, 440, 400, B.boop, 10, 170, 1, [HEART, GOLD, BONE], 24)
  sparkles(x, t, 440, 520, B.loaf, 8, 120, 2, [GOLD, BONE], 20)
  // lines
  speech(x, t, 660, 230, B.more1, 'more flour?', { size: 38, tail: 1, life: 0.9 })
  speech(x, t, 230, 230, B.more2, '…more flour.', { size: 38, tail: -1, life: 0.8 })
}

const EP = makeThenNow({
  id: 'yr2020baking', accent: GOLD, thing: 'Date night', year: '2020',
  A: { draw: sceneA, date: '04·18·2020', sub: 'baking *for us.* (apart.)' },
  B: { draw: sceneB, sub: 'baking *together.* (messy.)' },
  lines: [{ t: 3.1, text: 'bread *for us.* eaten by one.' }, { t: 7.75, text: 'flour: everywhere. bread: *shared.*' }, { t: 12.5, text: 'still lumpy. still *ours.*' }],
  last: '*Kneaded* you.', late: 1,
  cues: () => [
    ['whoosh', A.show[0], 0.3, 0.025], ['pop', A.forus, 880, 0.035, -0.2], ['pop', A.theirs, 1174.66, 0.035, 0.3], ['glitter', A.theirs, A.theirs + 0.3],
    ['whoosh', A.push[0], 0.35, 0.03], ['tom', A.bonk, 150, { gain: 0.22, decay: 0.18 }], ['tick', A.bonk, 0.07], ['pluck', A.fail, 440, 0.03, 0.4, 0],
    ['tick', A.biteAt, 0.06], ['tick', A.biteAt + 0.12, 0.05], ['tick', A.biteAt + 0.24, 0.04], ['pop', A.biteAt + 0.05, 659.25, 0.03, -0.2],
    ...Array.from({ length: 5 }, (_, i) => ['tom', r3(B.knead[0] + 0.15 + i * 0.36), 120 + (i % 2) * 20, { gain: 0.08, decay: 0.1 }]),
    ['pop', B.more1, 987.77, 0.035, 0.3], ['pop', B.more2, 880, 0.035, -0.3],
    ['boom', B.poof, 0.18], ['whoosh', B.poof, 0.6, 0.05], ['glitter', B.poof, B.poof + 0.5],
    ['bell', B.ding, 2093, 0.04, 1.0, -0.2], ['bell', B.ding + 0.02, 2637, 0.025, 0.8, -0.2], ['pop', B.loaf, 1174.66, 0.04, 0],
    ['whoosh', B.lean[0], 0.25, 0.025], ['pluck', B.boop, 1567.98, 0.045, 0.6, 0], ['glitter', B.boop, B.boop + 0.5],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
