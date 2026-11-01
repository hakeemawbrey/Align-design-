// trnobodyaqua: NOBODY: · "Aquarius on a first date:" (15 s vertical, Star Talk Trends §2.4, music: chiptune · E)
// Story 0–10.6, then the shared end card. The format's look lives in ./nobody.js (identical in all five NOBODY: films).
//   0.00–2.72  "Nobody:"  the blank meme card, a blinking caret, crickets, a tumbleweed. Silence.
//   2.72       card cut → "Aquarius on a *first date:*" (drop 2.82). A café table, two mugs, ♒ Aquarius and ♐ their date.
//              Aquarius wheels in a chalkboard.
//   3.5        ♒: "the moon only shows one side. *it's shy.*" The chalk draws the moon, its one visible face… blushing,
//              looking away. (The one-side part is true; the shy part is the theory.)
//   5.4–6.9    the escalation: red string, a heart, the Earth, "CONCLUSION: IT HAS A CRUSH ON US". The date… leans IN:
//              "go on…" → "wait. does it blush?"  ♓ Pisces, peeking over the table, cries for the shy moon.
//   7.75       both beaming: "Weird is *the vibe*."
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import {
  makeNobody, T, GOLD, BONE, INK, MONO, R, r3, pop01, outK, drawBits, sparkles, hearts, speech, star, pisces,
} from './nobody.js'

const AQU = signStar('aquarius'), SAG = signStar('sagittarius')
const ASP = `${AQU.glyph}︎ AQUARIUS`
const LINES = [{ t: 3.5, speaker: ASP, color: '#9fe8ff', text: "the moon only shows one side. *it's shy.*" }]

const E = { board: [3.05, 3.4], moon: [3.65, 4.35], face: 4.55, shy: 4.95, str: [5.4, 5.9], heart: 5.75, earth: 5.95, concl: 6.35, lean: 5.6, b1: 6.15, b2: 6.85 }
const BRD = { x: 150, y: 520, w: 780, h: 400 }
const MOON = { x: 330, y: 690, r: 88 }, EARTH = { x: 770, y: 690, r: 60 }, HRT = { x: 552, y: 625 }
const CHALK = '#f1ecdf'
const AQ_P = { x: 300, y: 1095, s: 240 }, DT_P = { x: 790, y: 1095, s: 230 }
const AQ_HOPS = [T.drop + 0.1, E.board[0] + 0.1, 3.55, 4.0, 4.5, 5.0, E.heart, E.concl, T.P + 0.02, T.PLate + 0.05, T.PLate + 0.5]
const DT_HOPS = [T.drop + 0.22, E.lean, E.b1 + 0.02, E.b2 + 0.02, T.P + 0.1, T.PLate + 0.15, T.PLate + 0.6]

/** a chalk ring drawn on clockwise up to fraction f */
function chalkRing(x, cx, cy, r, f, cell = 7) {
  if (f <= 0) return
  x.fillStyle = CHALK
  const n = Math.ceil(r / cell) + 1
  for (let j = -n; j <= n; j++) for (let i = -n; i <= n; i++) {
    const d = Math.hypot(i * cell, j * cell)
    if (Math.abs(d - r) >= cell * 0.6) continue
    const a = (Math.atan2(j, i) + Math.PI * 2.5) % (Math.PI * 2)
    if (a / (Math.PI * 2) <= f) x.fillRect(Math.round(cx + i * cell - cell / 2), Math.round(cy + j * cell - cell / 2), cell, cell)
  }
}
function chalkText(x, t, t0, text, cx, cy, { size = 26, col = CHALK, dur = 0.5, align = 'center' } = {}) {
  const f = prog(t, t0, t0 + dur)
  if (f <= 0) return
  const s = text.slice(0, Math.ceil(text.length * f))
  x.font = `700 ${size}px ${MONO}`; x.fillStyle = col; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, cx, cy)
}

function board(x, t, k) {
  const bi = ease.outBack(prog(t, ...E.board))
  if (bi <= 0) return
  x.save(); x.globalAlpha *= clamp(k)
  const dx = (1 - bi) * -900
  x.translate(dx, 0)
  R(x, 'rgba(6,4,18,0.5)', BRD.x + 14, BRD.y + 16, BRD.w, BRD.h)
  R(x, INK, BRD.x - 18, BRD.y - 18, BRD.w + 36, BRD.h + 36); R(x, '#a0703c', BRD.x - 12, BRD.y - 12, BRD.w + 24, BRD.h + 24)
  R(x, '#1f3a32', BRD.x, BRD.y, BRD.w, BRD.h)
  R(x, 'rgba(255,255,255,0.05)', BRD.x + 40, BRD.y + 60, 300, 18); R(x, 'rgba(255,255,255,0.04)', BRD.x + 380, BRD.y + 300, 260, 14)
  R(x, INK, BRD.x + 60, BRD.y + BRD.h + 18, 14, 60); R(x, INK, BRD.x + BRD.w - 74, BRD.y + BRD.h + 18, 14, 60)
  chalkText(x, t, E.moon[0] - 0.25, 'THEORY:', BRD.x + 30, BRD.y + 38, { size: 28, align: 'left', dur: 0.25 })
  // the moon
  chalkRing(x, MOON.x, MOON.y, MOON.r, prog(t, ...E.moon))
  if (t > E.face) {
    // the one visible face, looking away… blushing
    const look = t > E.shy ? -1 : 0
    R(x, CHALK, MOON.x - 34 + look * 14, MOON.y - 18, 12, 16); R(x, CHALK, MOON.x + 18 + look * 14, MOON.y - 18, 12, 16)
    R(x, CHALK, MOON.x - 14 + look * 14, MOON.y + 26, 28, 7)
    if (t > E.shy) { const a = clamp((t - E.shy) * 4); x.globalAlpha *= a; for (const bx of [-56, 30]) for (let q = 0; q < 3; q++) R(x, '#ff8fb1', MOON.x + bx + q * 10 + look * 14, MOON.y + 6, 6, 6); x.globalAlpha /= a || 1 }
  }
  chalkText(x, t, E.face + 0.1, 'ONE SIDE ONLY', MOON.x, MOON.y + MOON.r + 38, { size: 24 })
  chalkText(x, t, E.shy + 0.05, '(SHY)', MOON.x + 110, MOON.y - MOON.r + 4, { size: 28, col: '#ff8fb1', dur: 0.2 })
  // red string, the heart, the Earth
  const sf = prog(t, ...E.str)
  if (sf > 0) {
    const pts = [[MOON.x + MOON.r, MOON.y - 20], [HRT.x, HRT.y], [EARTH.x - EARTH.r, EARTH.y - 10]]
    const n = 30
    for (let i = 0; i <= n * sf; i++) {
      const u = i / n, seg = u < 0.5 ? 0 : 1, v = u < 0.5 ? u * 2 : u * 2 - 1
      const px = lerp(pts[seg][0], pts[seg + 1][0], v), py = lerp(pts[seg][1], pts[seg + 1][1], v) + Math.sin(v * Math.PI) * 26
      R(x, '#e2394f', px - 3, py - 3, 6, 6)
    }
  }
  if (t > E.heart) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff8fb1' }, HRT.x, HRT.y, 8 * pop01(t, E.heart, 0.3, 2.6), { outline: null })
  chalkRing(x, EARTH.x, EARTH.y, EARTH.r, prog(t, E.earth, E.earth + 0.4))
  if (t > E.earth + 0.4) { R(x, '#7fd8a0', EARTH.x - 30, EARTH.y - 20, 28, 20); R(x, '#7fd8a0', EARTH.x + 6, EARTH.y + 8, 30, 18); R(x, '#7fd8a0', EARTH.x - 14, EARTH.y + 22, 14, 10) }
  chalkText(x, t, E.earth + 0.3, 'US', EARTH.x, EARTH.y + EARTH.r + 38, { size: 24, dur: 0.15 })
  chalkText(x, t, E.concl, 'CONCLUSION: IT HAS A CRUSH ON US', BRD.x + BRD.w / 2, BRD.y + BRD.h - 40, { size: 28, col: GOLD, dur: 0.55 })
  x.restore()
}

function table(x, t, k) {
  const tk = pop01(t, T.drop - 0.05, 0.36, 1.8) * k
  if (tk <= 0.01) return
  x.save(); x.translate(540, 1240); x.scale(tk, tk); x.translate(-540, -1240)
  R(x, INK, 290, 1196, 500, 40); R(x, '#b07a44', 296, 1202, 488, 28); R(x, '#d29a5c', 296, 1202, 488, 6)
  R(x, INK, 520, 1236, 40, 140); R(x, '#8a5a2b', 526, 1236, 28, 134); R(x, INK, 470, 1366, 140, 16)
  // two mugs
  for (const [mx, col] of [[420, '#9fe8ff'], [660, '#c9a6ff']]) {
    R(x, INK, mx - 34, 1130, 68, 70); R(x, col, mx - 28, 1136, 56, 60); R(x, '#5a3a2a', mx - 28, 1136, 56, 10)
    R(x, INK, mx + 30, 1146, 22, 36); R(x, col, mx + 34, 1152, 12, 24)
    for (let s = 0; s < 3; s++) { const ph = ((t * 0.8 + s / 3) % 1); x.globalAlpha = 0.5 * (1 - ph) * tk; R(x, BONE, mx - 14 + s * 12 + Math.sin(ph * 6 + s) * 6, 1110 - ph * 60, 6, 12); x.globalAlpha = 1 }
  }
  x.restore()
}

function scene(x, t, Tm, k) {
  if (k <= 0) return
  board(x, t, k)
  // ♒ Aquarius
  const ap = pop01(t, Tm.drop, 0.36, 2.1) * k
  let am = 'sparkle', al = [-0.4, -1]
  if (t > 3.5) { am = 'happy'; al = undefined }
  if (t > E.str[0]) { am = 'wide'; al = [0.5, -1] }
  if (t > E.b1 + 0.2) { am = 'sparkle'; al = [1, 0] }
  if (t > Tm.PLate) { am = 'happy'; al = undefined }
  star(x, t, { ...AQ_P, pop: ap }, { color: AQU.color, glyph: AQU.glyph, mood: am, look: al, hops: AQ_HOPS, seed: 2, glow: 1.1 })
  // ♐ the date: neutral → leaning in
  const dp = pop01(t, Tm.drop + 0.12, 0.36, 2.1) * k
  const lean = ease.inOutCubic(prog(t, E.lean, E.lean + 0.5))
  let dm = 'neutral', dl = [-1, -0.6]
  if (t > E.moon[1]) { dm = 'squint'; dl = [-1, -1] }
  if (t > E.lean) { dm = 'wide'; dl = [-1, -1] }
  if (t > E.b1) { dm = 'sparkle'; dl = [-1, -0.6] }
  if (t > Tm.PLate) { dm = 'happy'; dl = undefined }
  star(x, t, { x: lerp(DT_P.x, 735, lean), y: lerp(DT_P.y, 1080, lean), s: DT_P.s, pop: dp }, { color: SAG.color, glyph: SAG.glyph, mood: dm, look: dl, hops: DT_HOPS, seed: 8, squash: -0.06 * lean })
  // ♓ Pisces, peeking over the table, crying for the shy moon (the table hides its lower half)
  const pp = ease.outBack(prog(t, E.shy, E.shy + 0.4))
  if (pp > 0.01) pisces(x, t, { x: 540, y: lerp(1300, 1175, pp), s: 130, alpha: k }, t > Tm.PLate ? 3 : 2, 'sparkle', [-1, -1])
  table(x, t, k)
  // the date's bubbles
  const bOut = Tm.P - 0.15
  speech(x, t, E.b1, 820, 952, 'go on…', { until: E.b2 - 0.05, tail: -30 })
  speech(x, t, E.b2, 805, 952, 'does it blush??', { until: bOut, tail: -20, size: 28 })
  sparkles(x, t, 540, 1000, Tm.PLate, 12, 260, 1, ['#9fe8ff', GOLD, '#c9a6ff'])
  if (t > Tm.PLate) { hearts(x, t, 300, 960, Tm.PLate + 0.1, 3, 1); hearts(x, t, 760, 960, Tm.PLate + 0.2, 3, 4) }
}

const EP = makeNobody({
  caption: 'Aquarius on a *first date:*', capAccent: '#1a8fb8',
  last: 'Weird is *the vibe*.', lastAccent: '#9fe8ff',
  lines: LINES,
  scene,
  cues: Tm => [
    ['pop', r3(Tm.drop + 0.02), 739.99, 0.04, -0.3], ['pop', r3(Tm.drop + 0.14), 587.33, 0.035, 0.3],
    ['whoosh', E.board[0], 0.35, 0.035], ['tick', E.board[1], 0.06],
    // chalk scratches
    ...[[E.moon[0] - 0.25, 0.25], [E.moon[0], 0.7], [E.face + 0.1, 0.5], [E.earth, 0.4], [E.concl, 0.55]].flatMap(([a, d]) => Array.from({ length: Math.floor(d / 0.07) }, (_, i) => ['tick', r3(a + i * 0.07 + (i % 3) * 0.01), 0.01 + 0.004 * (i % 2)])),
    ['pluck', E.shy, 1318.51, 0.035, 0.5, -0.3], ['pluck', r3(E.shy + 0.1), 1567.98, 0.03, 0.5, -0.3],
    ['riser', E.str[0], E.str[1], 0.025], ['pop', E.heart, 1174.66, 0.04, 0], ['pop', r3(E.earth + 0.4), 880, 0.03, 0.3],
    ['bell', r3(E.concl + 0.55), 1760, 0.03, 0.9, 0],
    ['pop', E.shy, 987.77, 0.025, 0], ['pop', E.b1, 659.25, 0.04, 0.35], ['pop', E.b2, 880, 0.045, 0.35], ['pop', r3(E.b2 + 0.08), 1174.66, 0.03, 0.35],
  ],
})
void outK; void BONE

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
