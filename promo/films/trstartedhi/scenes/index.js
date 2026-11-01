// trstartedhi: HOW IT STARTED vs HOW IT'S GOING, "Hi. Hi." (20 s vertical, Star Talk Trends §6, music: dreamy · Db)
// The format's look lives in ./started.js (identical in all five tr-started films).
//   0–6.6     HOW IT STARTED (date one, outside the café): ♊ Gemini and ♋ Cancer meet in a doorway. "hi!" "oh— hi."
//             They step the same way (twice: "hi." "hi." … "hi…" "…hi"), then lean in to pass and BONK. "…hi."
//             ♓ Pisces watches from the café window, sniffling, then sobbing. Shutter: the awkward photo.
//   6.6       card cut.
//   6.6–12.3  HOW IT'S GOING (same doorway, string lights): the collision is now their secret handshake, ticked off a
//             little checklist: hi. · step · step · boop · hi. THE STARS: "the awkward part became *the handshake.*"
//   12.3–15.6 the two photos side by side. Last line: "Hi. *Hi.*"
import { lerp, prog, ease } from '../../../src/lib.js'
import {
  makeStarted, drawStarChar, signStar, talkHops, R, speech, hearts, sparkles, drawBits, pisces, pop01, r3,
  INK, BONE, GOLD, PINK, MONO, HEART,
} from './started.js'

const GEM = signStar('gemini'), CAN = signStar('cancer')

// ── the place: a café front at dusk (past) / with string lights (now)
function cafe(x, t, now) {
  R(x, now ? '#5c3f78' : '#3f3466', 0, 0, 820, 600)
  for (let i = 0; i < 9; i++) R(x, now ? '#664685' : '#463a70', i * 96 - 20, 0, 6, 600)          // wall boards
  R(x, now ? '#2e1f4a' : '#241c42', 0, 600, 820, 220)
  for (let i = 0; i < 6; i++) R(x, now ? '#3a2858' : '#2c2350', 0, 630 + i * 34, 820, 4)          // sidewalk lines
  R(x, INK, 0, 594, 820, 8)
  // the café window (right) with a warm room inside
  const wx = 520, wy = 120, ww = 270, wh = 330
  R(x, INK, wx - 10, wy - 10, ww + 20, wh + 20)
  R(x, now ? '#ffcf8a' : '#d9b27a', wx, wy, ww, wh)
  R(x, now ? '#ffe2b0' : '#e7c793', wx, wy, ww, 80)
  R(x, '#8a5a3a', wx + 40, wy + 250, 190, 14); R(x, '#6b4529', wx + 125, wy + 264, 18, 66)     // little table
  R(x, INK, wx + ww / 2 - 4, wy, 8, wh)                                                          // mullion
  // an awning
  for (let i = 0; i < 8; i++) R(x, i % 2 ? '#f4e8cc' : (now ? '#ff6f9c' : '#b0576f'), wx - 20 + i * 39, wy - 70, 39, 50)
  R(x, INK, wx - 20, wy - 22, 312, 8)
  // the door (left) where they meet
  R(x, INK, 70, 210, 170, 392); R(x, now ? '#7a4f9a' : '#544477', 80, 220, 150, 382); R(x, GOLD, 200, 410, 14, 14)
  if (now) {
    // string lights across the top
    for (let i = 0; i < 14; i++) {
      const lx = 20 + i * 60, ly = 40 + 18 * Math.sin((i / 13) * Math.PI)
      R(x, INK, lx - 1, ly - 30, 2, 26)
      const on = 0.7 + 0.3 * Math.sin(t * 3 + i * 1.7)
      x.save(); x.globalAlpha = on; R(x, [GOLD, PINK, '#9fe6ff'][i % 3], lx - 7, ly - 6, 14, 16); x.restore()
    }
    x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); for (let i = 0; i <= 26; i++) { const lx = i * 33, ly = 16 + 18 * Math.sin((i / 26) * Math.PI); i ? x.lineTo(lx, ly) : x.moveTo(lx, ly) } x.stroke()
  }
}

// ── A: date one
const A = {
  enter: [0.62, 1.3], hi1: 1.45, hi2: 1.95,
  d1: [2.55, 2.8], hiD1: 2.85, d2: [3.45, 3.7], hiD2: 3.78,
  lean: [4.3, 4.52], bonk: 4.52, back: [4.52, 4.95], hiEnd: 5.3,
}
function sceneA(x, t) {
  cafe(x, t, false)
  // ♓ Pisces inside the café window, crying at the awkwardness
  x.save(); x.beginPath(); x.rect(520, 120, 270, 330); x.clip()
  pisces(x, t, 655, 330, 150, t > A.bonk ? 3 : t > A.hiD1 ? 2 : 1, { mood: 'wide', look: [-1, 1], seed: 6 })
  x.restore()
  R(x, INK, 520 + 135 - 4, 120, 8, 330)
  // the two
  const en = ease.outCubic(prog(t, ...A.enter))
  const d1 = ease.inOutCubic(prog(t, ...A.d1)), d2 = ease.inOutCubic(prog(t, ...A.d2))
  const sh = -90 * d1 + 180 * d2
  const lean = ease.inQuad(prog(t, ...A.lean)), back = ease.outCubic(prog(t, ...A.back))
  const close = 62 * lean - 92 * back
  const gx = lerp(-160, 290, en) + sh + close, cx = lerp(980, 540, en) + sh - close
  const y = 500
  let gm = 'happy', cm = 'wide', gl = [1, 0], cl = [-1, 0]
  if (t > A.hi2) cm = 'happy'
  if (t > A.d1[0]) { gm = 'wide'; cm = 'wide' }
  if (t > A.hiD1 + 0.3) { gm = 'squint'; cm = 'squint' }
  if (t > A.d2[0]) { gm = 'wide'; cm = 'wide' }
  if (t > A.bonk) { gm = 'wide'; cm = 'wide'; gl = [0, -1]; cl = [0, -1] }
  if (t > A.hiEnd - 0.2) { gm = 'squint'; cm = 'happy'; gl = [1, 1]; cl = [-1, 1] }
  const gH = [A.hi1, A.hiD1, A.hiEnd], cH = [A.hi2, A.hiD1, A.hiEnd]
  const sq = t > A.bonk && t < A.bonk + 0.25 ? 0.18 * Math.sin(Math.PI * (t - A.bonk) / 0.25) : 0
  drawStarChar(x, gx, y, 230, t, { color: GEM.color, glyph: GEM.glyph, mood: gm, look: gl, hops: gH, seed: 4, squash: sq, blush: t > A.hiEnd - 0.2 ? 1 : undefined })
  drawStarChar(x, cx, y, 230, t, { color: CAN.color, glyph: CAN.glyph, mood: cm, look: cl, hops: cH, seed: 9, squash: sq, blush: t > A.hiEnd - 0.2 ? 1 : undefined })
  // the hi's
  speech(x, t, gx - 10, 290, A.hi1, 'hi!', { size: 46, tail: -1, life: 1.05 })
  speech(x, t, cx + 10, 270, A.hi2, 'oh— hi.', { size: 40, tail: 1, life: 0.9 })
  speech(x, t, gx, 290, A.hiD1, 'hi.', { size: 40, tail: -1, life: 0.7 })
  speech(x, t, cx, 290, A.hiD1 + 0.08, 'hi.', { size: 40, tail: 1, life: 0.62 })
  speech(x, t, gx, 300, A.hiD2, 'hi…', { size: 32, tail: -1, life: 0.6 })
  speech(x, t, cx, 300, A.hiD2 + 0.1, '…hi', { size: 32, tail: 1, life: 0.5 })
  speech(x, t, gx - 30, 300, A.hiEnd, '…hi.', { size: 28, tail: -1, life: 1.4 })
  speech(x, t, cx + 30, 300, A.hiEnd + 0.12, '…hi.', { size: 28, tail: 1, life: 1.3 })
  // BONK
  if (t > A.bonk && t < A.bonk + 1.4) {
    const mx = (gx + cx) / 2, k = pop01(t, A.bonk, 0.2, 3)
    x.save(); x.translate(mx, 300); x.rotate(-0.12); x.scale(k, k)
    x.font = `800 60px Inter, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.lineWidth = 12; x.strokeStyle = INK; x.strokeText('BONK', 0, 0); x.fillStyle = GOLD; x.fillText('BONK', 0, 0)
    x.restore()
    for (let i = 0; i < 4; i++) {
      const a = (t - A.bonk) * 5 + i * Math.PI / 2
      drawBits(x, ['..G..', '.GGG.', 'GGGGG', '.GGG.', '..G..'], { G: i % 2 ? GOLD : BONE }, mx + Math.cos(a) * 110, 380 + Math.sin(a) * 26, 6)
    }
  }
  sparkles(x, t, (gx + cx) / 2, 400, A.bonk, 8, 70, 2, [GOLD, BONE], 22)
}

// ── B: now
const B = {
  hi1: 7.25, hi2: 7.62, s1: [8.1, 8.3], s2: [8.6, 8.8], boop: [9.05, 9.25], boopAt: 9.25, unboop: [9.6, 9.85], hiTogether: 9.95,
  encore: [10.95, 11.15, 11.55, 11.75], spin: 11.6,
}
const LIST = [
  { label: 'hi.', at: B.hi2 + 0.2 }, { label: 'step', at: B.s1[1] }, { label: 'step', at: B.s2[1] }, { label: 'boop', at: B.boopAt }, { label: 'hi. hi.', at: B.hiTogether + 0.2 },
]
function checklist(x, t) {
  const k = pop01(t, 6.95, 0.35, 2)
  if (k <= 0.01) return
  x.save(); x.translate(660, 150); x.rotate(0.04); x.scale(k, k)
  R(x, INK, -136, -112, 272, 268); R(x, '#fffaf0', -130, -106, 260, 256)
  x.font = `700 21px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = '#7a5cc4'
  x.fillText('OUR HANDSHAKE', -112, -80)
  x.font = `700 28px ${MONO}`
  LIST.forEach((it, i) => {
    const y = -36 + i * 40
    R(x, INK, -112, y - 13, 26, 26); R(x, '#fffaf0', -108, y - 9, 18, 18)
    if (t > it.at) {
      const p = pop01(t, it.at, 0.2, 3)
      x.save(); x.translate(-99, y); x.scale(p, p); drawBits(x, ['.....G', '....GG', 'G..GG.', 'GGGG..', '.GG...'], { G: '#e0457b' }, 0, 0, 5, { outline: null }); x.restore()
    }
    x.fillStyle = INK; x.fillText(it.label, -70, y + 1)
  })
  x.restore()
}
function sceneB(x, t) {
  cafe(x, t, true)
  // ♓ Pisces still at the window, now happy-sobbing with a heart
  x.save(); x.beginPath(); x.rect(520, 120, 270, 330); x.clip()
  pisces(x, t, 655, 330, 150, t > B.boopAt ? 3 : 2, { mood: t > B.boopAt ? 'happy' : 'sparkle', look: [-1, 1], seed: 6 })
  x.restore()
  R(x, INK, 520 + 135 - 4, 120, 8, 330)
  checklist(x, t)
  const s1 = ease.inOutCubic(prog(t, ...B.s1)), s2 = ease.inOutCubic(prog(t, ...B.s2))
  const e1 = ease.inOutCubic(prog(t, B.encore[0], B.encore[1])), e2 = ease.inOutCubic(prog(t, B.encore[2], B.encore[3]))
  const sh = -80 * s1 + 80 * s2 - 60 * e1 + 60 * e2
  const bp = ease.inOutCubic(prog(t, ...B.boop)) - ease.inOutCubic(prog(t, ...B.unboop))
  const gx = 270 + sh + 64 * bp, cx = 510 + sh - 64 * bp, y = 500
  const gH = [B.hi1, B.s1[0], B.s2[0], B.hiTogether, B.encore[0], B.encore[2], B.spin]
  const cH = [B.hi2, B.s1[0], B.s2[0], B.hiTogether, B.encore[0], B.encore[2], B.spin]
  const mood = t > B.boopAt - 0.1 && t < B.unboop[1] ? 'heart' : t > B.hiTogether ? 'sparkle' : 'happy'
  drawStarChar(x, gx, y, 230, t, { color: GEM.color, glyph: GEM.glyph, mood, look: [1, 0], hops: gH, seed: 4, glow: 1.2 })
  drawStarChar(x, cx, y, 230, t, { color: CAN.color, glyph: CAN.glyph, mood, look: [-1, 0], hops: cH, seed: 9, glow: 1.2 })
  speech(x, t, gx - 20, 290, B.hi1, 'hi.', { size: 42, tail: -1, life: 0.9, col: '#fffaf0' })
  speech(x, t, cx + 20, 290, B.hi2, 'hi.', { size: 42, tail: 1, life: 0.9, col: '#fffaf0' })
  speech(x, t, (gx + cx) / 2, 270, B.hiTogether, 'hi. hi.', { size: 44, tail: 0, life: 1.1, col: '#ffe1ec' })
  // step marks on the floor
  for (const [a, dir] of [[B.s1[0], -1], [B.s2[0], 1]]) {
    const k = Math.sin(Math.PI * prog(t, a, a + 0.6))
    if (k > 0.01) { x.save(); x.globalAlpha = k; x.font = `700 30px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.fillText(dir < 0 ? '« step' : 'step »', 400 + dir * 40, 700); x.restore() }
  }
  // the boop: hearts instead of BONK
  if (t > B.boopAt) hearts(x, t, (gx + cx) / 2, 330, B.boopAt, { n: 6, life: 1.6, cell: 7, spread: 160 })
  sparkles(x, t, (gx + cx) / 2, 400, B.boopAt, 8, 80, 1, [HEART, GOLD, BONE], 22)
  if (t > B.boopAt) {
    const k = pop01(t, B.boopAt, 0.2, 3) * (1 - prog(t, B.boopAt + 0.9, B.boopAt + 1.1))
    if (k > 0.01) {
      x.save(); x.translate((gx + cx) / 2, 230); x.rotate(0.1); x.scale(k, k)
      x.font = `800 52px Inter, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.lineWidth = 12; x.strokeStyle = INK; x.strokeText('boop', 0, 0); x.fillStyle = PINK; x.fillText('boop', 0, 0)
      x.restore()
    }
  }
  if (t > B.hiTogether) hearts(x, t, (gx + cx) / 2, 330, B.hiTogether + 1.2, { n: 8, life: 1.8, cell: 6, spread: 300, seed: 3 })
}

const EP = makeStarted({
  id: 'trstartedhi', accent: PINK,
  A: { draw: sceneA, stamp: 'DATE 1', sub: 'one doorway. three hi’s.' },
  B: { draw: sceneB, stamp: 'TODAY', sub: 'it’s a ritual now.' },
  lines: [{ t: 2.95, text: 'they both stepped *the same way.*' }, { t: 9.15, text: 'the awkward part became *the handshake.*' }],
  last: 'Hi. *Hi.*',
  cues: () => [
    ['whoosh', A.enter[0], 0.4, 0.03],
    ['pop', A.hi1, 880, 0.04, -0.3], ['pop', A.hi2, 740, 0.035, 0.3],
    ['whoosh', A.d1[0], 0.2, 0.025], ['pop', A.hiD1, 880, 0.03, -0.3], ['pop', A.hiD1 + 0.08, 740, 0.03, 0.3],
    ['whoosh', A.d2[0], 0.2, 0.025], ['pop', A.hiD2, 784, 0.022, -0.3], ['pop', A.hiD2 + 0.1, 660, 0.022, 0.3],
    ['tom', A.bonk, 140, { gain: 0.25, decay: 0.2 }], ['tick', A.bonk, 0.07], ['pluck', A.bonk + 0.1, 1318.51, 0.03, 0.4, 0], ['pluck', A.bonk + 0.2, 1174.66, 0.025, 0.4, 0],
    ['pop', A.hiEnd, 660, 0.018, -0.3], ['pop', A.hiEnd + 0.12, 587, 0.018, 0.3],
    ['pop', B.hi1, 880, 0.035, -0.3], ['pop', B.hi2, 1046.5, 0.035, 0.3],
    ...LIST.map((it, i) => ['pop', r3(it.at), [1046.5, 1174.66, 1318.51, 1396.91, 1567.98][i], 0.03, 0.4]),
    ['whoosh', B.s1[0], 0.2, 0.025], ['whoosh', B.s2[0], 0.2, 0.025],
    ['pluck', B.boopAt, 1567.98, 0.04, 0.5, 0], ['glitter', B.boopAt, B.boopAt + 0.4],
    ['pop', B.hiTogether, 1046.5, 0.04, 0], ['pop', B.hiTogether + 0.05, 1318.51, 0.035, 0],
    ['whoosh', B.encore[0], 0.18, 0.02], ['whoosh', B.encore[2], 0.18, 0.02],
  ],
})
void talkHops

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
