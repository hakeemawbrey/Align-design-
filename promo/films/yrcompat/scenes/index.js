// yrcompat: THEN vs NOW, "Checking compatibility in 2016 / 2026" (20 s vertical, Star Talk Then vs Now §20, music: funk · Bb)
// Story 0–15.6, then the shared end card. The format engine is ./yrkit.js (identical in every Block D film).
//   THEN (old-phone footage, 02·13·2016): ♎ Libra on the bedroom floor with a magazine-style quiz page, "LOVE QUIZ! |
//     are you MEANT TO BE?". 1.71 Libra ticks Q1 and Q2 at speed. 3.38 erases Q3's "C" and re-circles "A" (eraser
//     crumbs fly). LIBRA: "I answered for both of us. *mostly A's*."  5.04 the result stamps on: "MOSTLY A's:
//     SOULMATES! 100%". Libra hugs the page; ♓ Pisces sobs at the result.
//   6.71 card cut → NOW: Libra and ♒ Aquarius on a couch, one phone, a reading card opens above them, row by row:
//     PUSH · plans vs. no plans (they squint at each other… then laugh) · PULL · late-night talks (hearts) · ALIGN · same
//     weird jokes (sparkle, a synchronized hop). AQUARIUS: "push is fine. we *talk* about it."  They lean in.
//     The reading card closes before the payoff (no "Align" in the last 2 s).
//   12.27 payoff: the 2016 polaroid (the quiz) drops in. THE STARS: "less score. *more us*."
//   13.38 last line: "*Read* it together."
import { makeThenNow, drawBits, bubble, label, star, pisces, heart, sparkles, R, INK, BONE, GOLD, CREAM, INTER, MONO,
  signStar, prog, ease, lerp, clamp, r3, BEAT, pop01, outK, easeOutBack } from './yrkit.js'

const LIB = signStar('libra'), AQU = signStar('aquarius')
const RD = { pull: '#8fd8f6', push: '#f59cc4', align: '#f2c75c' }
const P1 = BEAT(2), P2 = BEAT(5), P3 = BEAT(8)
const PAGE = { cx: 560, cy: 850, w: 620, h: 560, rot: -0.04 }
const QS = ['1. dream date?', '2. they text back in…', '3. your song is…']
// [question, answer index, tick time]
const TICKS = [[0, 0, P1 + 0.15], [1, 0, P1 + 0.55], [2, 2, P1 + 0.95]]
const COUCH = { y: 1150 }
const PENCIL = ['....P', '...PY', '..YY.', '.YY..', 'KY...']

function quizPage(x, t) {
  x.save(); x.translate(PAGE.cx, PAGE.cy); x.rotate(PAGE.rot)
  const { w, h } = PAGE
  R(x, 'rgba(4,2,12,0.5)', -w / 2 + 14, -h / 2 + 18, w, h)
  R(x, '#fff4f8', -w / 2, -h / 2, w, h)
  // masthead
  R(x, '#ff5fa2', -w / 2, -h / 2, w, 120)
  x.font = `800 64px ${INTER}`; x.fillStyle = '#fff4f8'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('LOVE QUIZ!', -w / 2 + 28, -h / 2 + 52)
  x.font = `700 24px ${MONO}`; x.fillText('are you MEANT TO BE?', -w / 2 + 30, -h / 2 + 98)
  // starburst
  x.save(); x.translate(w / 2 - 70, -h / 2 + 64); x.rotate(t * 0.6)
  x.fillStyle = '#ffe36a'; x.beginPath(); for (let i = 0; i < 24; i++) { const a = i * Math.PI / 12, r = i % 2 ? 40 : 58; x.lineTo(Math.cos(a) * r, Math.sin(a) * r) } x.closePath(); x.fill()
  x.restore(); x.font = `800 22px ${INTER}`; x.fillStyle = '#ff2f7a'; x.textAlign = 'center'; x.fillText('100%!', w / 2 - 70, -h / 2 + 66)
  // questions with A B C bubbles
  QS.forEach((q, i) => {
    const y = -h / 2 + 180 + i * 108
    x.font = `800 30px ${INTER}`; x.fillStyle = '#3a1d4a'; x.textAlign = 'left'; x.fillText(q, -w / 2 + 34, y)
    ;['A', 'B', 'C'].forEach((c, j) => {
      const cx = -w / 2 + 70 + j * 120, cy = y + 46
      x.strokeStyle = '#c98aa8'; x.lineWidth = 3; x.beginPath(); x.arc(cx, cy, 18, 0, Math.PI * 2); x.stroke()
      x.font = `700 20px ${MONO}`; x.fillStyle = '#c98aa8'; x.textAlign = 'center'; x.fillText(c, cx, cy + 1)
    })
  })
  // pencil circles (Q3: C first, erased at P2, A re-circled)
  const circ = (qi, ai, p, alpha = 1) => {
    if (p <= 0 || alpha <= 0) return
    const cx = -w / 2 + 70 + ai * 120, cy = -h / 2 + 226 + qi * 108
    x.save(); x.globalAlpha *= alpha; x.strokeStyle = '#3a2a5a'; x.lineWidth = 5; x.beginPath(); x.ellipse(cx, cy, 30, 24, -0.2, -0.5, -0.5 + Math.PI * 2.1 * p); x.stroke(); x.restore()
  }
  TICKS.forEach(([qi, ai, at]) => circ(qi, ai, prog(t, at, at + 0.25), qi === 2 ? 1 - prog(t, P2 + 0.1, P2 + 0.6) : 1))
  circ(2, 0, prog(t, P2 + 0.7, P2 + 0.95))
  // eraser crumbs
  if (t > P2 + 0.05 && t < P2 + 1.2) for (let i = 0; i < 8; i++) { const ph = clamp((t - P2 - 0.05) / 1.1), a = i * 0.8; R(x, '#e8a0b8', -w / 2 + 310 + Math.cos(a) * 80 * ph, -h / 2 + 440 + Math.sin(a) * 30 * ph + 120 * ph * ph, 7, 7) }
  // the result stamp
  const sk = prog(t, P3, P3 + 0.18)
  if (sk > 0) {
    x.save(); x.translate(60, h / 2 - 64); x.rotate(-0.08); const s = lerp(1.8, 1, ease.outCubic(sk)); x.scale(s, s); x.globalAlpha *= clamp(sk * 3)
    R(x, '#ff2f7a', -250, -40, 500, 80); R(x, '#fff4f8', -244, -34, 488, 68); R(x, '#ff2f7a', -238, -28, 476, 56)
    x.font = `800 30px ${INTER}`; x.fillStyle = '#fff4f8'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText("MOSTLY A's: SOULMATES!", 0, 2)
    x.restore()
  }
  x.restore()
}

function readingCard(x, t, rows, k) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 712); x.scale(k, k)
  const w = 720, h = 330
  R(x, 'rgba(4,2,12,0.5)', -w / 2 + 12, -h / 2 + 14, w, h)
  R(x, INK, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12); R(x, '#1d1640', -w / 2, -h / 2, w, h)
  R(x, 'rgba(242,199,92,0.5)', -w / 2 + 10, -h / 2 + 10, w - 20, 2)
  x.font = `700 22px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.6)'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('YOUR READING · TOGETHER', 0, -h / 2 + 34)
  rows.forEach(([lab, txt, col, at], i) => {
    const rk = easeOutBack(prog(t, at, at + 0.3), 2)
    if (rk <= 0) return
    const y = -h / 2 + 100 + i * 82
    x.save(); x.translate(-w / 2 + 40, y); x.scale(rk, rk)
    R(x, col, 0, -26, 150, 52); x.font = `800 28px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText(lab, 75, 2)
    x.font = `800 32px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.fillText(txt, 176, 2)
    x.restore()
  })
  x.restore()
}

const EP = makeThenNow({
  thing: 'Checking compatibility', thenYear: '2016', stamp: '02·13·2016', clock: 'PM 9:05',
  thenBack(x, t) {
    const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#3c2050'); g.addColorStop(1, '#1e1030')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
    // a shaggy rug
    R(x, '#2a1638', 0, 1160, 1080, 800); for (let i = 0; i < 40; i++) R(x, '#4a2a5a', (i * 97) % 1080, 1180 + (i * 53) % 220, 30, 8)
    void t
  },
  then(x, t) {
    quizPage(x, t)
    // ♓ Pisces on the rug, overwhelmed by the result
    pisces(x, t, 930, 1240, 150, { tears: t > P3 ? 3 : 1, mood: t > P3 ? 'happy' : 'sparkle', look: [-1, -1], hops: [P3 + 0.2] })
    // Libra with a pencil
    const hug = t > P3 + 0.3
    const F = star(x, 220, 1220, 250, t, { color: LIB.color, glyph: LIB.glyph, mood: hug ? 'heart' : t > P2 && t < P2 + 1 ? 'squint' : 'sparkle', look: [1, -1], seed: 3, glow: 1, hops: [0.5, P1, P1 + 0.55, P2 + 0.7, P3 + 0.25] })
    const wig = TICKS.some(([, , at]) => t > at && t < at + 0.25) || (t > P2 && t < P2 + 0.95) ? Math.sin(t * 40) * 0.25 : 0
    drawBits(x, PENCIL, { P: '#ff8fb1', Y: '#ffd36a', K: INK }, 360, F.cy - 70, 12, { rot: wig })
    if (t > P2 + 1.0 && t < P3) bubble(x, 300, 1040, 'they\'d say A. probably.', { k: pop01(t, P2 + 1.0, 0.25, 2.2), size: 28, tail: -1 })
    if (hug) for (let i = 0; i < 3; i++) { const ph = ((t - P3) * 0.7 + i / 3) % 1; heart(x, 200 + i * 60, 1080 - ph * 160, 4, { alpha: Math.sin(Math.PI * ph) }) }
    sparkles(x, t, 600, 1030, P3 + 0.1, 12, 280, 0.3, ['#ff8fb1', '#ffe36a', BONE])
  },
  snap: { at: 5.9, cx: 560, cy: 880, size: 780 },
  now(x, t, lt, P) {
    const T = EP.T
    const rows = [['PUSH', 'plans vs. no plans', RD.push, r3(T.cut + 0.6)], ['PULL', 'late-night talks', RD.pull, r3(T.cut + 1.45)], ['ALIGN', 'same weird jokes', RD.align, r3(T.cut + 2.3)]]
    const pu = rows[0][3], pl = rows[1][3], al = rows[2][3], lean = 10.6
    // couch
    R(x, INK, 70, COUCH.y - 150, 940, 260); R(x, '#5a4e9a', 76, COUCH.y - 144, 928, 248); R(x, '#6f63b0', 76, COUCH.y - 144, 928, 16)
    R(x, INK, 40, COUCH.y - 60, 90, 180); R(x, '#4a3f88', 46, COUCH.y - 54, 78, 168); R(x, INK, 950, COUCH.y - 60, 90, 180); R(x, '#4a3f88', 956, COUCH.y - 54, 78, 168)
    // ♓ Pisces peeking over the couch back, happy tears
    pisces(x, t, 900, 960, 120, { tears: t > al ? 3 : 2, mood: 'happy', pop: pop01(t, T.cut + 0.4, 0.3, 2) })
    // the two of them
    const lx = lerp(370, 430, ease.inOutCubic(prog(t, lean, lean + 0.4))), ax = lerp(710, 650, ease.inOutCubic(prog(t, lean, lean + 0.4)))
    const pushFace = t > pu + 0.3 && t < pu + 0.75
    const md = t > lean ? 'heart' : t > al ? 'sparkle' : t > pl ? 'heart' : pushFace ? 'squint' : 'happy'
    const sync = [al + 0.1, al + 0.5]
    star(x, lx, 1040, 260, t, { color: LIB.color, glyph: LIB.glyph, mood: md, look: pushFace ? [1, 0] : undefined, seed: 3, glow: 1, hops: [T.cut + 0.2, pu + 0.8, ...sync, lean] })
    star(x, ax, 1040, 260, t, { color: AQU.color, glyph: AQU.glyph, mood: md === 'squint' ? 'squint' : md, look: pushFace ? [-1, 0] : undefined, seed: 8, glow: 1, hops: [T.cut + 0.25, pu + 0.8, ...sync, 9.15, lean] })
    // the phone between them
    R(x, INK, 512, 1000, 56, 92); R(x, '#2a2550', 516, 1004, 48, 84); R(x, RD.align, 522, 1012, 36, 6); R(x, RD.push, 522, 1024, 30, 6); R(x, RD.pull, 522, 1036, 34, 6)
    if (t > pu + 0.75 && t < pu + 1.3) bubble(x, 540, 870, 'ha!', { k: pop01(t, pu + 0.75, 0.2, 2.4), size: 32 })
    // the reading card (closes before the payoff)
    readingCard(x, t, rows, pop01(t, T.cut + 0.2, 0.35, 1.8) * outK(t, [T.pay - 0.35, T.pay - 0.05]))
    sparkles(x, t, 540, 1000, al + 0.05, 12, 240, 0.6, [RD.align, RD.pull, RD.push])
    if (t > T.pay) for (let i = 0; i < 3; i++) { const ph = ((t - T.pay) * 0.6 + i / 3) % 1; heart(x, 480 + i * 60, 880 - ph * 200, 4, { alpha: Math.sin(Math.PI * ph) }) }
    void lt; void P; void CREAM; void label; void GOLD
  },
  lines: [
    { t: 2.6, speaker: `${LIB.glyph}︎ LIBRA`, color: '#ffb0f0', text: "I answered for both of us. *mostly A's*." },
    { t: 9.15, speaker: `${AQU.glyph}︎ AQUARIUS`, color: '#9fe6ff', text: 'push is fine. we *talk* about it.' },
  ],
  starsLine: 'less score. *more us*.',
  last: '*Read* it together.', lastAccent: RD.pull,
  cues: T => [
    // pencil scribbles, the eraser, the stamp
    ...TICKS.flatMap(([, , at]) => Array.from({ length: 4 }, (_, i) => ['tick', r3(at + i * 0.06), 0.02])),
    ...Array.from({ length: 8 }, (_, i) => ['tick', r3(P2 + 0.1 + i * 0.06), 0.015]), ['whoosh', r3(P2 + 0.55), 0.2, 0.015],
    ...Array.from({ length: 4 }, (_, i) => ['tick', r3(P2 + 0.7 + i * 0.06), 0.02]),
    ['boom', r3(P3 + 0.05), 0.18], ['tom', r3(P3 + 0.05), 100, { gain: 0.22, decay: 0.2 }], ['bell', r3(P3 + 0.15), 1760, 0.03, 1.0, 0], ['glitter', r3(P3 + 0.1), r3(P3 + 0.6)],
    // NOW: the three rows, the laugh, the synchronized hop, the lean
    ...[0.6, 1.45, 2.3].map((d, i) => ['pop', r3(T.cut + d), [987.77, 1174.66, 1567.98][i], 0.04, (i - 1) * 0.3]),
    ['pop', r3(T.cut + 1.35), 1318.51, 0.03, 0], ['bell', r3(T.cut + 2.35), 2093, 0.025, 1.0, 0], ['glitter', r3(T.cut + 2.3), r3(T.cut + 2.8)],
    ['pluck', 10.6, 783.99, 0.035, 0.6, 0], ['pluck', 10.75, 987.77, 0.03, 0.6, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const TIMES = EP.T
