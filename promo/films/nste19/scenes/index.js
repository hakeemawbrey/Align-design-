// nste19: SINGLE AND THRIVING, Ep 19 "Know Your Yes" (25 s vertical, Next 30 b33, music: pop · C).
// Format kit: ../../nste01/singlekit.js (story 0–20.6, then the shared end card). Rows: promo/films/next30/b33.md.
//   0.0–6.8    hook "What do I want? | *No idea.*" Libra at a desk chewing a pen over a blank page titled WHAT I WANT:
//              "um…" → "…someone nice?"  Pisces sniffles.
//   6.8        card cut → THE STARS: "single time is *great* for knowing you." / "write your *dealbreakers.* and your
//              yeses."
//   13.6       the page fills with ticks: kind to everyone · texts back · laughs at my jokes; two DEALBREAKER cards stack
//              beside it (rude to strangers · never curious). Libra: "oh. I DO know."  Meter fills.
//   17.4       "Libra: *thriving.*" Last line: "Know your *yes* before you need it."
import { makeSingle, room, box, R, ink, note, shadow, sparkles, pop01, prog, lerp, ease, T, INK, BONE, MINT, RED } from '../../nste01/singlekit.js'

const STUDY = (x, t) => room(x, t, { wall: '#2b2a4e', wall2: '#262548', floor: '#34324e', win: { x: 120, y: 470, w: 240, h: 260 } })
const YES = ['kind to everyone', 'texts back', 'laughs at my jokes']
function page(x, t, u, fill) {
  x.save(); x.translate(700, 940); x.rotate(0.03)
  box(x, -230, -300, 460, 560, BONE, { b: 6 })
  ink(x, 'WHAT I WANT:', 0, -250, { size: 36 })
  for (let i = 0; i < 6; i++) R(x, '#cfc6b0', -200, -180 + i * 74, 400, 3)
  YES.forEach((s, i) => {
    const k = fill ? pop01(t, fill + i * 0.45, 0.25, 2.4) : 0
    if (k <= 0.01) return
    ink(x, '✓', -180, -200 + i * 74, { size: 40 * k, col: '#2f8a5e' })
    ink(x, s, -140, -200 + i * 74, { size: 32, align: 'left', alpha: Math.min(1, k) })
  })
  x.restore()
  void u
}
function dealCard(x, cx, cy, text, rot, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, 'rgba(6,4,18,0.45)', -110, -66, 230, 150); box(x, -120, -80, 240, 150, '#2a1f55', { b: 6 })
  R(x, RED, -120, -80, 240, 40); ink(x, 'DEALBREAKER', 0, -60, { size: 22, col: BONE, font: "'Space Mono', monospace", weight: 700 })
  const L = text.split('|'); L.forEach((l, i) => ink(x, l, 0, 0 + i * 32, { size: 26, col: BONE }))
  x.restore()
}
function pen(x, cx, cy, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); R(x, INK, -8, -70, 16, 140); R(x, '#4f7cd8', -5, -66, 10, 110); R(x, '#e8c27a', -5, 44, 10, 18); x.restore() }

function s1(x, t, S) {
  const { u, hero } = S
  STUDY(x, t)
  page(x, t, u, 0)
  box(x, 60, 1260, 960, 36, '#6b4a2f', { b: 6, hi: '#8a6440' })
  hero(x, t, { x: 260, y: 1150, s: 260, mood: u > 3.8 ? 'squint' : 'neutral', look: [0.6, -0.8], hops: [1.0, 3.85] })
  pen(x, 360, 1080 + 6 * Math.sin(u * 8), -0.6)
}
function s2(x, t, S) {
  const { hero } = S
  STUDY(x, t)
  x.fillStyle = 'rgba(5,4,12,0.55)'; x.fillRect(0, 420, 1080, 1500)
  hero(x, t, { x: 250, y: 1170, s: 200, mood: t > T.B + 1.6 ? 'happy' : 'neutral', look: [1, -1], hops: [T.A + 0.4, T.B + 1.8] })
  note(x, 790, 1170, 'your yeses|+ dealbreakers', { w: 400, h: 150, col: '#ffe27a', rot: 0.05, size: 38, k: pop01(t, T.A + 1.5, 0.3, 2.4) })
  sparkles(x, t, 790, 1170, T.B + 1.3, 8, 180, 1)
}
function s3(x, t, S) {
  const { u, hero } = S
  STUDY(x, t)
  page(x, t, u, S.t0 + 0.3)
  dealCard(x, 780, 1140, 'rude to|strangers', -0.08, pop01(t, S.t0 + 1.8, 0.3, 2.4))
  dealCard(x, 860, 1410, 'never|curious', 0.06, pop01(t, S.t0 + 2.2, 0.3, 2.4))
  box(x, 60, 1260, 960, 36, '#6b4a2f', { b: 6, hi: '#8a6440' })
  hero(x, t, { x: 260, y: 1150, s: 260, mood: u > 2.4 ? 'sparkle' : 'happy', look: [1, -0.6], hops: [0.35, 0.8, 1.25, 2.45].map(v => S.t0 + v) })
  pen(x, 380, 1060 + 10 * Math.sin(u * 10), -0.3)
  sparkles(x, t, 700, 800, S.t0 + 1.3, 10, 240, 1, [MINT, BONE])
}
function fin(x, t, S) {
  const { hero, ok, u } = S
  shadow(x, 540, 1150, 260 * ok)
  hero(x, t, { x: 540, y: 960, s: 300, pop: ok, mood: u > 1.6 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.t0 + 0.6, T.last + 1.5] })
  note(x, 790, 760, '✓ my yes', { w: 200, h: 80, col: '#9fe6b0', rot: 0.08, size: 32, k: ok })
}

const EP = makeSingle({
  id: 'nste19', sign: 'libra', name: 'Libra',
  hook: 'What do I want? | *No idea.*',
  h1: 'Now’s the *time.*', h2: 'Write it *down.*',
  lines: ['single time is *great* for knowing you.', 'write your *dealbreakers.* and your yeses.'],
  last: 'Know your *yes* before you need it.',
  bubbles: [
    { t0: 1.0, t1: 3.6, x: 280, y: 920, text: 'um…', size: 48, tail: 0 },
    { t0: 3.85, t1: 6.6, x: 300, y: 920, text: '…someone nice?', size: 44, tail: 0 },
    { t0: 16.1, t1: 17.3, x: 300, y: 930, text: 'oh. I DO know.', size: 44, tail: 0, col: '#ffe2c4' },
  ],
  pis1: { x: 960, y: 1610, s: 120 }, pis3: { x: 960, y: 1630, s: 110 },
  meter: { x: 450, y: 1620 },
  s1, s2, s3, fin,
  cues: [...[0, 1, 2].map(i => ['pop', 13.9 + i * 0.45, [987.77, 1174.66, 1318.51][i], 0.04, 0.2]), ['tick', 15.4, 0.05], ['tick', 15.8, 0.05], ['pop', 15.42, 659.25, 0.035, 0.3], ['pop', 15.82, 587.33, 0.035, 0.3]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [lerp, ease, prog]
