// trwaitscorpio: WAIT FOR IT, "Noticed." (20 s vertical, Star Talk Trends §12.3, music: screwed · Gbm)
// Story 0–15.6, then the shared end card. The format look and timing live in ./wait.js (identical in all five episodes).
//   0.0–3.8   "Scorpio is | *staring.*"  + "wait for it…". A little café: ♏ Scorpio at a table on the left; across the
//             room ♊ Gemini, the date, orders at the counter ("oat milk, extra hot, one sugar!").
//   3.95–9.3  "Intensely. | *Unblinking.*"  A dotted stare-beam locks onto Gemini, who starts to sweat. Stickers:
//             "minute one: *staring*" · "minute five: *still staring*" · "…now it's *taking notes?!*" Scorpio scribbles
//             in a notebook without looking down. The bar stalls at 99%.
//   9.45      card cut.
//   9.5–13.4  "Order: | *memorized.*"  On the drop the notebook flips round, big: THEIR ORDER: oat milk ✓ extra hot ✓
//             one sugar ✓ (+ a doodled heart), and a fresh cup slides across to Gemini, heart in the foam.
//             ♊ GEMINI: "wait… that's *exactly* my order."
//   13.45–15.5 "*Noticed*."  Gemini goes heart-eyed, hearts float up, Pisces fountains.
import { makeEpisode, R, INK, GOLD, BONE, PINK, MONO, INTER, SERIF, HEART, drawBits, pop01, outK, popOut, r3, plate } from './wait.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const ORDER = { at: 1.55, out: [7.2, 7.5] }
const TABLE = { x: 440, y: 1150 }
const SCRIB = [7.7, 8.0, 8.3, 8.6]
const NB = { x: 540, y: 720 }
const CUP = { t: [10.15, 10.75], from: [450, 1112], to: [705, 1105] }

function cup(x, cx, cy, s, t, heart = true) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  R(x, INK, -34, -40, 68, 66); R(x, '#f4ecdc', -30, -36, 60, 58); R(x, '#d9cfbd', -30, 8, 60, 14)
  R(x, INK, 26, -26, 22, 30); R(x, '#f4ecdc', 30, -22, 12, 22); R(x, INK, 34, -18, 4, 14)
  R(x, '#c58a5a', -26, -36, 52, 10)
  if (heart) drawBits(x, ['H.H', 'HHH', '.H.'], { H: BONE }, 0, -31, 3, { outline: null })
  R(x, INK, -44, 22, 88, 10); R(x, '#d9cfbd', -40, 24, 80, 6)
  for (let i = 0; i < 3; i++) { const ph = (t * 0.9 + i / 3) % 1; x.save(); x.globalAlpha *= Math.sin(Math.PI * ph) * 0.8; R(x, BONE, -14 + i * 12 + Math.sin(t * 4 + i) * 5, -52 - ph * 50, 6, 10); x.restore() }
  x.restore()
}

const EP = makeEpisode({
  id: 'trwaitscorpio', key: 'Gbm', seed: 1203,
  hero: { sign: 'scorpio', lineColor: '#ff9db0' },
  date: { sign: 'gemini', lineColor: '#ffe27a' },
  h0: 'Scorpio is | *staring.*', h0Accent: '#ff8fa8',
  h1: 'Intensely. | *Unblinking.*',
  h2: 'Order: | *memorized.*', h2Accent: PINK,
  last: '*Noticed*.', lastAccent: GOLD,
  stickers: ['minute one: *staring*', 'minute five: *still staring*', '…now it’s *taking notes?!*'],
  line: { who: 'date', text: "wait… that's *exactly* my order." },
  focus: { x: 560, y: 1000 },
  glow: { x: NB.x, y: NB.y + 30 },
  moods(ph, t, T) {
    if (ph === 'hook') return { mood: 'neutral', look: [1, -0.2], squash: 0 }
    if (ph === 'build') return { mood: 'squint', look: [1, -0.2], blink: false }
    if (ph === 'reveal' && t < T.line) return { mood: 'happy' }
    if (ph === 'reveal') return { mood: 'sparkle', look: [1, 0] }
    return null
  },
  dateMoods(ph, t, T) {
    if (ph === 'hook') return { mood: 'happy', look: [1, -0.4] }
    if (ph === 'build') return t > T.stk[0] ? { mood: 'wide', look: [-1, 0], squash: t > T.stk[2] ? 0.03 * Math.sin(t * 28) : 0 } : { mood: 'neutral', look: [1, -0.4] }
    if (ph === 'reveal') return t < T.lineDone ? { mood: 'wide', look: [-1, 0.4] } : { mood: 'heart', look: [-1, 0] }
    return null
  },
  back(x, t, T, ctx) {
    const k = clamp(popOut(t, T.out)) * clamp(prog(t, 0.2, 0.9))
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    // menu board
    R(x, INK, 600, 470, 420, 190); R(x, '#2b3a2e', 610, 480, 400, 170); R(x, '#8a5a3a', 600, 470, 420, 12)
    x.font = `700 26px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'
    ;[['COFFEE', '♥'], ['TEA', '♥'], ['COCOA', '♥']].forEach(([w], i) => { x.fillText(w, 640, 520 + i * 44); R(x, '#5f7a62', 790, 518 + i * 44, 180, 3) })
    // the counter behind the date
    R(x, INK, 610, 820, 470, 120); R(x, '#a06a42', 610, 826, 470, 18); R(x, '#6e4329', 610, 844, 470, 90)
    // the coffee machine
    R(x, INK, 940, 700, 110, 126); R(x, '#c9c2d8', 946, 706, 98, 114); R(x, '#8a83a0', 956, 760, 78, 30); R(x, '#ff6f9a', 1020, 716, 12, 12)
    x.restore()
  },
  mid(x, t, T, ctx) {
    // the order bubble over Gemini during the hook (where Scorpio learns it)
    const ok = pop01(t, ORDER.at, 0.3, 2.2) * outK(t, ORDER.out)
    if (ok > 0.01) {
      const bx = 815, by = 880
      x.save(); x.translate(bx, by); x.scale(ok, ok)
      x.font = `700 26px ${INTER}`
      const lines = ['oat milk, extra hot,', 'one sugar please!']
      const w = 300, h = 86
      R(x, INK, -w / 2 - 4, -h / 2 - 4, w + 8, h + 8); R(x, BONE, -w / 2, -h / 2, w, h)
      R(x, INK, 30, h / 2 + 4, 14, 14); R(x, BONE, 34, h / 2, 8, 12)
      x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
      lines.forEach((l, i) => x.fillText(l, 0, -16 + i * 32))
      x.restore()
    }
    // the café table + the notebook (front of Scorpio)
    const k = clamp(popOut(t, T.out)) * ease.outCubic(prog(t, 0.2, 0.8))
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    const { x: tx, y: ty } = TABLE
    R(x, INK, tx - 14, ty, 28, 150); R(x, '#5a3622', tx - 8, ty, 16, 150); R(x, INK, tx - 70, ty + 140, 140, 16)
    R(x, INK, tx - 140, ty - 18, 280, 30); R(x, '#a06a42', tx - 134, ty - 14, 268, 20)
    const flip = prog(t, T.reveal, T.reveal + 0.5)
    if (flip <= 0) {
      // the small notebook on the table, scribbles piling up
      R(x, INK, tx - 74, ty - 66, 148, 52); R(x, '#f4ecdc', tx - 70, ty - 62, 140, 44)
      R(x, '#c9c2d8', tx - 2, ty - 62, 4, 44)
      SCRIB.forEach((s, i) => { const p = prog(t, s, s + 0.25); if (p > 0) R(x, '#3b2a63', tx + 8, ty - 56 + i * 10, 56 * p, 4) })
      // the pencil (wiggles while it writes)
      if (t > SCRIB[0] - 0.2) { const wig = t < SCRIB[3] + 0.3 ? Math.sin(t * 30) * 6 : 0; x.save(); x.translate(tx + 50 + wig, ty - 60); x.rotate(0.6); R(x, INK, -5, -40, 10, 46); R(x, '#ffd23a', -3, -38, 6, 34); R(x, '#ff9db0', -3, -42, 6, 6); x.restore() }
    }
    // the cup Scorpio sends across
    const cp = ease.inOutCubic(prog(t, ...CUP.t))
    if (t > CUP.t[0] - 0.2) {
      const ck = pop01(t, CUP.t[0] - 0.2, 0.25, 2)
      cup(x, lerp(CUP.from[0], CUP.to[0], cp), lerp(CUP.from[1], CUP.to[1], cp) - 40 * Math.sin(Math.PI * cp), 1.1 * ck, t)
    }
    x.restore()
  },
  front(x, t, T, ctx) {
    // the stare-beam
    if (ctx.hero && ctx.date && t > T.build + 0.3 && t < T.reveal) {
      const a = pop01(t, T.build + 0.3, 0.4, 1.4) * (0.55 + 0.25 * Math.sin(t * 6))
      const y0 = ctx.hero.F.oy - ctx.hero.F.S * 0.5, y1 = ctx.date.F.oy - ctx.date.F.S * 0.5
      x.save(); x.globalAlpha = Math.min(1, a)
      for (let px = ctx.hero.x + 100; px < ctx.date.x - 90; px += 30) { const f = (px - ctx.hero.x) / (ctx.date.x - ctx.hero.x); R(x, '#ff6f9a', px, lerp(y0, y1, f) + Math.sin(px * 0.05 - t * 8) * 3, 16, 6) }
      x.restore()
    }
    // Gemini's nervous sweat drop
    if (ctx.date && t > T.stk[0] + 0.2 && t < T.reveal) {
      const D = ctx.date, ph = (t * 0.8) % 1
      drawBits(x, ['.B.', 'BBB', 'BWB', '.B.'], { B: '#8fe3ff', W: '#ffffff' }, D.x + 70, D.y - 110 + ph * 40, 6, { alpha: pop01(t, T.stk[0] + 0.2, 0.3, 2) })
    }
    // the notebook, flipped round and big
    const fk = ease.outBack(prog(t, T.reveal, T.reveal + 0.45)) * outK(t, T.out)
    if (fk > 0.01) {
      const sx = Math.abs(Math.cos(Math.PI * (1 - clamp(prog(t, T.reveal, T.reveal + 0.35))) * 0.5))
      x.save(); x.translate(NB.x, NB.y); x.rotate(-0.04); x.scale(fk * Math.max(0.1, sx), fk)
      const w = 540, h = 330
      R(x, 'rgba(6,4,18,0.45)', -w / 2 + 14, -h / 2 + 16, w, h)
      R(x, INK, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12); R(x, '#f4ecdc', -w / 2, -h / 2, w, h)
      for (let i = 0; i < 5; i++) R(x, '#cfe0f0', -w / 2 + 20, -h / 2 + 88 + i * 58, w - 40, 2)
      R(x, '#ff9db0', -w / 2 + 60, -h / 2, 3, h)
      x.font = `800 36px ${INTER}`; x.fillStyle = '#3b2a63'; x.textAlign = 'left'; x.textBaseline = 'middle'
      x.fillText('THEIR ORDER:', -w / 2 + 80, -h / 2 + 52)
      x.font = `italic 500 50px ${SERIF}`
      ;['oat milk', 'extra hot', 'one sugar'].forEach((s, i) => {
        const at = T.reveal + 0.45 + i * 0.22
        if (t < at) return
        x.fillStyle = INK; x.fillText(s, -w / 2 + 84, -h / 2 + 118 + i * 58)
        drawBits(x, ['.....G', '....GG', 'G..GG.', 'GGGG..', '.GG...'], { G: '#3fae5f' }, w / 2 - 80, -h / 2 + 116 + i * 58, 5 * pop01(t, at, 0.2, 2.6))
      })
      if (t > T.reveal + 1.2) drawBits(x, HEART, { H: '#ff4f86' }, w / 2 - 80, -h / 2 + 50, 6 * pop01(t, T.reveal + 1.2, 0.3, 2.6))
      x.restore()
    }
  },
  cues: T => [
    ['pop', ORDER.at, 987.77, 0.03, 0.4], ['pop', r3(ORDER.at + 0.12), 1174.66, 0.025, 0.4],
    ...SCRIB.flatMap(s => Array.from({ length: 3 }, (_, i) => ['tick', r3(s + i * 0.08), 0.02])),
    ['whoosh', r3(T.reveal + 0.02), 0.35, 0.035],
    ...[0, 1, 2].map(i => ['pop', r3(T.reveal + 0.45 + i * 0.22), [1046.5, 1174.66, 1318.51][i], 0.035, 0.1]),
    ['whoosh', CUP.t[0], 0.5, 0.03], ['tick', CUP.t[1], 0.04], ['pluck', r3(CUP.t[1] + 0.02), 1567.98, 0.03, 0.5, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
