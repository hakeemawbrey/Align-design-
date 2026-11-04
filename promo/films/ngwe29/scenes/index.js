// ngwe29 · Your Star Guide: Winter · ♏ Scorpio, winter note 1 / 4: how you love in winter (25 s; story 0–20.6, then the end card)
//   0.00  "Scorpio loves like a slow fire."  Scorpio mid-knit by candlelight, a teal scarf trailing over the snow.
//   3.0   ♏ YOUR STAR: "you love in winter like a slow fire."  The candle swells, the scarf keeps growing.
//   7.4   "you remember every small thing."  Memory bubbles, three of them: "teal is their colour", "oat milk", "cold ears"
//         (the scarf sprouts ear flaps).
//  11.8   "so say the big one too."  Scorpio holds the finished scarf up: a little heart knitted in at the end. The date (♉)
//         pops in and gasps.
//  15.45  "Say it before | the snow melts."  The date wears the scarf; Scorpio blushes. Pisces: happy fountains.
import { winterGuide, scarf, drawStarChar, signStar, prog, ease, lerp, clamp, INK, GOLD, R, box, heart, heartsUp, shadow } from '../../ngwe25/scenes/gwkit.js'

const DATE = signStar('taurus'), TEAL = '#2fbfb0'
const T0 = { mem: [8.4, 9.2, 10.0], flaps: 10.3, hold: 12.9, dateIn: 13.6, gasp: 14.1 }
const MEM = ['teal is their colour', 'oat milk', 'cold ears']

function candle(x, cx, cy, t, k) {
  const fl = 1 + 0.12 * Math.sin(t * 17) + 0.08 * Math.sin(t * 29), s = 1 + 0.35 * k
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, cy - 90, 0, cx, cy - 90, 220 * s)
  g.addColorStop(0, `rgba(255,190,110,${0.45 * fl})`); g.addColorStop(1, 'rgba(255,150,60,0)')
  x.fillStyle = g; x.fillRect(cx - 240 * s, cy - 330 * s, 480 * s, 480 * s); x.restore()
  box(x, cx - 26, cy - 70, 52, 90, '#f3e6d2', { b: 5, hi: '#ffffff' })
  box(x, cx - 44, cy + 20, 88, 14, GOLD, { b: 5 })
  R(x, INK, cx - 2, cy - 82, 4, 12)
  const fh = 30 * fl * s
  R(x, '#ff9a3a', cx - 8, cy - 82 - fh, 16, fh); R(x, '#ffd34d', cx - 5, cy - 82 - fh * 0.7, 10, fh * 0.7); R(x, '#fffbea', cx - 2, cy - 82 - fh * 0.35, 4, fh * 0.35)
}

const F = winterGuide({
  sign: 'scorpio', note: 1, duration: 25,
  hook: '*Scorpio* loves | like a slow fire.',
  lines: [
    { t: 3.0, text: 'you love in winter like a *slow fire.*' },
    { t: 7.4, text: 'you remember every *small* thing.' },
    { t: 11.8, text: 'so say the *big* one too.' },
  ],
  fact: 'SCORPIO: FIXED WATER', factAt: 4.6, factDur: 2.4,
  last: 'Say it *before* | the snow melts.',
  tissues: false,
  pisces: (t, d) => ({ ...d, x: 985, s: 120 }),
  guide(t) {
    const knit = t < T0.hold ? 0.03 * Math.sin(t * 12) : 0
    const mood = t < T0.hold ? (t > T0.mem[0] && t < 11 ? 'sparkle' : 'squint') : t < 15.45 ? 'wide' : 'happy'
    return { x: 540, y: 1060, size: 330, mood, look: t < T0.hold ? [-1, 0.6] : [1, -0.2], squash: knit, blush: t > T0.gasp ? 0.9 : undefined, lanternSize: 76 }
  },
  drawBack(x, t, K) {
    const o = K.outAll(t)
    x.save(); x.globalAlpha *= o; x.translate(190, 1250); x.scale(1.7, 1.7); x.translate(-190, -1250); candle(x, 190, 1250, t, clamp(prog(t, 3.2, 4.2)) * (1 - prog(t, 11, 12) * 0.5)); x.restore()
  },
  drawFront(x, t, K, r) {
    const o = K.outAll(t)
    x.save(); x.globalAlpha *= o
    if (t < T0.hold) {
      // knitting: the scarf trails left over the snow, growing
      const L = 140 + 260 * prog(t, 0, T0.hold)
      scarf(x, 450, 1170, L, { w: 76, color: TEAL, stripe: '#e8fbff', rot: Math.PI / 2 })
      if (t > T0.flaps) { const k = K.pop01(t, T0.flaps, 0.3, 2.4); x.save(); x.translate(450 - L * 0.5, 1214); x.scale(k, k); box(x, -22, 0, 44, 50, TEAL, { b: 4 }); x.restore() }
      // needles
      R(x, INK, 420, 1080, 12, 130); R(x, '#d6b25a', 423, 1083, 6, 124); R(x, INK, 470, 1090, 12, 120); R(x, '#d6b25a', 473, 1093, 6, 114)
    } else if (t < 15.45) {
      const k = K.pop01(t, T0.hold, 0.4, 2)
      x.save(); x.translate(540, 980); x.scale(1, k); x.translate(-540, -980)
      scarf(x, 540, 470, 400, { w: 96, color: TEAL, stripe: '#e8fbff' })
      heart(x, 540, 830, 9, '#e23d66')
      x.restore()
    }
    x.restore()
    // memory bubbles (rule of three)
    T0.mem.forEach((m, i) => {
      const k = K.pop01(t, m, 0.3, 2.4) * (1 - ease.inCubic(prog(t, 11.4, 11.8)))
      if (t > m) K.bubble([540, 300, 790][i], [600, 780, 860][i], MEM[i], { size: 46, k, color: i === 0 ? '#0f6e66' : INK })
    })
    // the date pops in
    if (t > T0.dateIn) {
      const k = K.pop01(t, T0.dateIn, 0.4, 2.2)
      x.save(); x.globalAlpha *= o
      shadow(x, 775, 1262, 170, 0.35)
      drawStarChar(x, 775, 1150, 220, t, { color: DATE.color, glyph: DATE.glyph, seed: 9, pop: k, mood: t < 15.45 ? 'wide' : 'heart', look: [-1, -0.5], hops: [T0.dateIn + 0.3, T0.gasp, 15.7] })
      // after the flip: they're wearing the scarf
      if (t > 15.45) { const kk = K.pop01(t, 15.6, 0.3, 2.4); x.save(); x.translate(775, 1170); x.scale(kk, kk); box(x, -66, -14, 132, 30, TEAL, { b: 5 }); R(x, '#e8fbff', -20, -14, 14, 30); box(x, 26, 10, 30, 70, TEAL, { b: 5 }); heart(x, 41, 70, 3, '#e23d66'); x.restore() }
      x.restore()
      if (t > T0.gasp && t < 15.4) K.bubble(775, 960, '!!', { size: 44, k: K.pop01(t, T0.gasp, 0.25, 2.6) })
    }
    heartsUp(x, t, 660, 950, 16.3, { n: 3, c: 6, col: '#e23d66' })
  },
  cues: [
    ['tick', 0.25, 0.02], ['tick', 0.55, 0.02], ['tick', 0.85, 0.02], ['tick', 1.15, 0.02], ['tick', 1.45, 0.02], ['tick', 1.75, 0.02],
    ['whoosh', 3.2, 0.6, 0.03],
    ...T0.mem.map((m, i) => ['pop', m, [880, 987.77, 1174.66][i], 0.04, (i - 1) * 0.3]), ['pop', T0.flaps, 1318.51, 0.04, 0],
    ['whoosh', T0.hold, 0.4, 0.04], ['pluck', T0.hold + 0.3, 1174.66, 0.04, 0.8, 0],
    ['pop', T0.dateIn, 880, 0.045, 0], ['tick', T0.gasp, 0.06], ['glitter', 15.6, 16.1],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
