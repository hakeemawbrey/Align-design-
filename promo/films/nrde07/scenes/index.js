// nrde07: RATE MY DATE IDEA, "Libra plans a candle-scent date" (16 s vertical trial reel, music: house · Bb).
// Story 0–13.6, then the short 2.4 s end card. The format lives in ../../nrde01/scenes/datekit.js.
//   0.0–2.6   hook: “We pick the scent *of us.*”  ♎ Libra sniffs a candle, a shelf of candles glowing behind.
//   2.6–5.8   THE PLAN "sniff. think. sniff. *think.*"  Libra sniffs candle after candle; each one gets a "maybe" tag.
//   5.8       jump cut (flash + zoom punch; no card transition).
//   5.8–9.3   BUT… "their date picks one in *one second.*"  The ♌ Leo date grabs PINE + COCOA instantly; Libra sniffs it…
//             eyes go soft: "…perfect."
//   9.32      THE STARS RATE IT 9/10 *smells like us*.  Pisces: 10/10.   9.8 THE STARS: "Let them pick. *Enjoy* it."
import { makeDate, R, box, bubble, shadow, hearts, card, table, sparkles, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK } from '../../nrde01/scenes/datekit.js'

const WAX = ['#ffd6e4', '#c9ecfb', '#e7ffd9', '#fff1c8', '#e8d6ff', '#ffe0c9']
function candle(x, t, cx, by, col, { h = 110, w = 76, lit = true, seed = 0, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, by); x.scale(k, k)
  box(x, -w / 2, -h, w, h, col, { b: 5, hi: 'rgba(255,255,255,0.4)' })
  R(x, INK, -w / 2 + 8, -h * 0.55, w - 16, 26); R(x, BONE, -w / 2 + 12, -h * 0.55 + 4, w - 24, 18)
  R(x, INK, -2, -h - 14, 4, 14)
  if (lit) {
    const f = 1 + 0.15 * Math.sin(t * 13 + seed * 2.1)
    x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, -h - 26, 2, 0, -h - 26, 70); g.addColorStop(0, 'rgba(255,200,110,0.6)'); g.addColorStop(1, 'rgba(255,200,110,0)'); x.fillStyle = g; x.fillRect(-70, -h - 96, 140, 140); x.restore()
    R(x, '#ffb347', -7, -h - 34 * f, 14, 22 * f); R(x, '#fff1a8', -3, -h - 26 * f, 6, 12 * f)
  }
  x.restore()
}
function shelfRow(x, t, y, n = 6) {
  R(x, INK, 70, y, 940, 22); R(x, '#7a5638', 76, y + 4, 928, 14)
  for (let i = 0; i < n; i++) candle(x, t, 150 + i * 156, y, WAX[i % 6], { h: 90 + (i % 3) * 16, seed: i })
}
function sniffLines(x, t, cx, cy) { for (let i = 0; i < 3; i++) { const p = (t * 1.6 + i / 3) % 1; x.save(); x.globalAlpha = 0.6 * (1 - p); R(x, BONE, cx - p * 60, cy - 30 + i * 22, 30, 5); x.restore() } }

const EP = makeDate({
  id: 'nrde07', sign: 'libra', date: 'leo', accent: '#ffb3d1', deep: '#b03a72',
  idea: 'We pick the scent *of us.*',
  hook(x, t, S) {
    shelfRow(x, t, 820)
    table(x, 540, 1330, 900, '#6b4a2f')
    candle(x, t, 760, 1330, WAX[0], { h: 130, w: 96 })
    sniffLines(x, t, 690, 1150)
    shadow(x, 430, 1340, 220)
    S.hero(x, t, { x: 470, y: 1120, s: 290, mood: 'sleepy', zzz: false, look: [1, 0], hops: S.HOOK_HOPS, squash: 0.03 })
  },
  beats: [
    { caption: 'sniff. think. sniff. *think.*', draw(x, t, S) {
      const { u, hero, date } = S
      table(x, 540, 1180, 1000, '#6b4a2f')
      const idx = Math.min(5, Math.floor(u / 0.5))
      WAX.forEach((c, i) => candle(x, t, 130 + i * 164, 1176, c, { h: 100, seed: i, lit: i <= idx }))
      WAX.forEach((c, i) => card(x, 130 + i * 164, 1250, 120, 46, 'maybe', { size: 24, k: pop01(t, S.t0 + i * 0.5 + 0.25, 0.25, 2.4), rot: (i % 2 ? 0.08 : -0.08) }))
      const hx = 130 + idx * 164
      shadow(x, hx, 1170, 140)
      hero(x, t, { x: hx, y: 960, s: 170, mood: (u % 0.5) < 0.25 ? 'sleepy' : 'squint', zzz: false, look: [0, 1], hops: Array.from({ length: 6 }, (_, i) => S.t0 + i * 0.5) })
      shadow(x, 900, 780, 0)
      date(x, t, { x: 930, y: 700, s: 150, mood: u > 2 ? 'sleepy' : 'neutral', zzz: true, look: [-1, 0.5] })
    }, cues: Array.from({ length: 6 }, (_, i) => ['pop', +(0.25 + i * 0.5).toFixed(2), [659.25, 739.99, 880, 987.77, 1174.66, 1318.51][i], 0.03, i % 2 ? 0.3 : -0.3]) },
    { caption: 'their date picks one in *one second.*', draw(x, t, S) {
      const { u, hero, date } = S
      table(x, 540, 1180, 1000, '#6b4a2f')
      // the date's grab: a pine-green candle swooped up
      const g = ease.outBack ? ease.outCubic(prog(u, 0.2, 0.45)) : prog(u, 0.2, 0.45)
      const cy = lerp(1176, 1040, g)
      shadow(x, 760, 1170, 170); shadow(x, 320, 1170, 170)
      date(x, t, { x: 780, y: 1000, s: 190, mood: 'happy', look: [-1, 0], hops: [S.t0 + 0.2] })
      candle(x, t, 560, cy, '#bfe3b0', { h: 120, w: 90 })
      card(x, 560, cy - 210, 270, 70, 'PINE + COCOA', { size: 30, k: pop01(t, S.t0 + 0.4, 0.25, 2.4) })
      hero(x, t, { x: 320, y: 1000, s: 200, mood: u < 1.2 ? 'wide' : u < 1.9 ? 'sleepy' : 'heart', zzz: false, look: [1, 0], hops: [S.t0 + 1.2, S.t0 + 1.95] })
      if (u > 1.2 && u < 1.9) sniffLines(x, t, 470, 960)
      bubble(x, t, 200, 790, S.t0 + 2.0, S.t1, '…perfect.', { size: 38 })
      hearts(x, t, S.t0 + 2.0, 330, 880, { n: 5, spread: 60 })
      card(x, 860, 720, 200, 70, '0:01', { size: 40, col: GOLD, k: pop01(t, S.t0 + 0.45, 0.25, 2.4), rot: 0.06 })
    }, cues: [['whoosh', 0.18, 0.3, 0.04], ['pop', 0.42, 1318.51, 0.05, 0.3], ['tick', 0.47, 0.06], ['pluck', 2.02, 1567.98, 0.04, -0.3, 0.3], ['pluck', 2.15, 1975.53, 0.03, -0.3, 0.3]] },
  ],
  score: '9/10', word: 'smells like us',
  last: 'Let them pick. *Enjoy* it.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, sparkles]
