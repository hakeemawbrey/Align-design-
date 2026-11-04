// nt2e41: MAIN CHARACTER MOMENT, "First scarf day." (20 s vertical, Trends Vol. 2 ep 41, music: cinematic · D)
// Format kit: ./mckit.js (shared by nt2e41–nt2e45). Story 0–15.6, then the shared end card.
//   0.0–2.2    hook "*Main character moment:* | first scarf day." ♌ Leo mid-twirl on a snowy street, the scarf flying.
//   2.2–7.6    THE MOVIE "LEO · The Winter Arc": slow-mo wind walk, snow hanging in the air, the scarf streaming.
//   7.3        record scratch.  7.6 card cut.
//   7.6–11.0   REALITY "the scarf *will not end.*": it trails off screen, snags, Leo is yanked to a stop.
//   11.0–15.6  ♎ Libra walks in holding the other end ("found your other end."), wraps it round both; hearts.
//              THE STARS: "Two leads, *one* scarf."  Pisces cries at the pictures, then fountains.
import { makeMC, B } from './mckit.js'
const { R, box, ribbon, snow, shadow, hearts, bubble, lerp, prog, ease, clamp, INK, BONE } = B

const SCARF = '#e8344e', STRIPE = '#efe6d6', LEO = '#f39a3a'

// the street: a snowy pavement, two lamp posts, a shop-front glow
function street(x, t) {
  R(x, '#2a2350', 0, 1260, 1080, 660); R(x, '#eef0ff', 0, 1250, 1080, 22); R(x, '#cfd4f2', 0, 1272, 1080, 10)
  for (let i = 0; i < 9; i++) R(x, 'rgba(255,255,255,0.18)', i * 140 + 30, 1330 + (i % 3) * 50, 70, 8)
  for (const lx of [150, 930]) {
    R(x, INK, lx - 9, 560, 18, 700); R(x, '#4a4370', lx - 4, 560, 8, 700)
    box(x, lx - 34, 520, 68, 50, '#ffe7a6', { b: 6 })
    x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(lx, 545, 10, lx, 545, 220); g.addColorStop(0, 'rgba(255,226,150,0.35)'); g.addColorStop(1, 'rgba(255,226,150,0)'); x.fillStyle = g; x.fillRect(lx - 220, 325, 440, 440); x.restore()
  }
  void t
}
// the scarf wrapped round a star's middle, with a tail streaming back along a wave
function scarf(x, t, cx, cy, s, { len = 10, dir = -1, wind = 1, tailTo = null, wrap = true } = {}) {
  const w = s * 0.1
  const pts = []
  if (tailTo) {
    // a taut line from the star to a far point
    const n = Math.ceil(Math.hypot(tailTo[0] - cx, tailTo[1] - cy) / (w * 0.9))
    for (let i = 0; i <= n; i++) { const p = i / n; pts.push([lerp(cx + dir * s * 0.22, tailTo[0], p), lerp(cy + s * 0.22, tailTo[1], p) + Math.sin(p * 9 + t * 2) * 4]) }
  } else {
    for (let i = 0; i < len; i++) pts.push([cx + dir * (s * 0.22 + i * w * 0.95), cy + s * 0.22 + Math.sin(t * 5 * wind - i * 0.7) * i * 3.2 * wind + i * 2])
  }
  ribbon(x, pts, SCARF, w, STRIPE)
  if (wrap) { R(x, INK, cx - s * 0.36 - 5, cy + s * 0.17 - 5, s * 0.72 + 10, w + 10); R(x, SCARF, cx - s * 0.36, cy + s * 0.17, s * 0.72, w); R(x, STRIPE, cx - s * 0.06, cy + s * 0.17, s * 0.12, w) }
}

const EP = makeMC({
  id: 'nt2e41', hero: 'leo', date: 'libra', accent: LEO, deep: '#c45a12',
  moment: 'first *scarf* day.',
  title: ['LEO', 'The Winter Arc'],
  movieCap: 'slow-mo. snow. *wind in the hair.*',
  realCap: 'the scarf *will not end.*',
  bg(x, t) { street(x, t) },
  hook(x, t, S) {
    snow(x, t, { n: 70, speed: 120, seed: 1 })
    shadow(x, 540, 1250, 260)
    const tw = Math.sin(t * 6) * 0.5
    S.hero(x, t, { x: 540, y: 1040, s: 300, mood: 'sparkle', look: [0, 0], squash: 0.05 * tw, hops: [0.6, 1.4] })
    scarf(x, t, 540, 1040, 300, { len: 12, dir: tw > 0 ? 1 : -1, wind: 1.4 })
  },
  movie(x, tm, S) {
    // slow motion: snow and the walk run on tm (slowed time)
    snow(x, tm, { n: 90, speed: 140, seed: 2, size: 10 })
    const p = prog(tm, 2.2, 2.2 + 5.4 * 0.3)
    const hx = lerp(330, 600, p)
    shadow(x, hx, 1250, 240)
    S.hero(x, tm, { x: hx, y: 1040, s: 280, mood: 'sparkle', look: [1, -0.4], hops: [2.3, 2.62, 2.94, 3.26] })
    scarf(x, tm * 0.8, hx, 1040, 280, { len: 16, dir: -1, wind: 0.8 })
  },
  real(x, t, S) {
    snow(x, t, { n: 60, speed: 130, seed: 3 })
    const u = S.u
    // walks on… the scarf pays out behind, off the right edge… then snags at 1.6 s
    const go = ease.outCubic(prog(u, 0, 1.6))
    const hx = lerp(600, 380, go) - (u > 1.6 && u < 1.9 ? 30 * Math.sin((u - 1.6) * 20) * Math.exp(-(u - 1.6) * 8) : 0)
    shadow(x, hx, 1250, 240)
    const mood = u < 1.6 ? 'sparkle' : u < 2.4 ? 'wide' : 'eyeroll'
    S.hero(x, t, { x: hx, y: 1040, s: 280, mood, look: u > 1.6 ? [1, 0] : [-1, 0], squash: u > 1.6 && u < 1.75 ? -0.12 : 0, hops: [7.6 + 1.62] })
    scarf(x, t, hx, 1040, 280, { dir: 1, tailTo: [1180, 1100] })
    if (u > 1.7) B.label(x, 'SNAG.', 900, 960, { size: 54 * clamp(prog(u, 1.7, 1.9)), col: '#ff6b7f', font: B.INTER, weight: 800, rot: 0.12 })
    if (u > 0.4 && u < 1.6) B.label(x, '…still going', 860, 1190, { size: 32, col: BONE, alpha: clamp(prog(u, 0.4, 0.6)) })
  },
  pay(x, t, S) {
    snow(x, t, { n: 50, speed: 100, seed: 4 })
    const u = S.u
    const lx = lerp(1180, 690, ease.outCubic(prog(u, 0, 0.9)))
    const hx = 380, close = ease.inOutCubic(prog(u, 1.0, 1.8))
    const ax = lerp(hx, 440, close), bx = lerp(lx, 640, close)
    shadow(x, ax, 1250, 240); shadow(x, bx, 1250, 240)
    // the scarf between them, then one wrap round both
    if (close < 1) ribbon(x, Array.from({ length: 14 }, (_, i) => [lerp(ax + 60, bx - 60, i / 13), 1080 + Math.sin(i / 13 * Math.PI) * 50 * (1 - close)]), SCARF, 24, STRIPE)
    S.hero(x, t, { x: ax, y: 1040, s: 260, mood: u > 0.9 ? 'heart' : 'wide', look: [1, 0], hops: [11.9, 12.9] })
    S.date(x, t, { x: bx, y: 1040, s: 260, mood: 'happy', look: [-1, 0], hops: [11.0 + 0.9, 13.2] })
    if (close >= 1) { R(x, INK, ax - 95, 1081, bx - ax + 190, 36); R(x, SCARF, ax - 90, 1086, bx - ax + 180, 26); R(x, STRIPE, (ax + bx) / 2 - 14, 1086, 28, 26) }
    else { R(x, INK, bx - 85, 1081, 170, 36); R(x, SCARF, bx - 80, 1086, 160, 26) }
    hearts(x, t, 12.9, (ax + bx) / 2, 880, { n: 6 })
    bubble(x, t, 700, 800, 11.25, 13.6, 'found your other end.', { size: 32, tail: 0.3 })
  },
  last: 'Two leads, *one* scarf.',
  cues: {
    hook: [['whoosh', 0.3, 0.4, 0.03], ['pluck', 0.6, 1174.66, 0.03, 0.4, 0.2], ['pluck', 1.4, 1567.98, 0.03, 0.4, -0.2]],
    movie: [['strings', 0, 0], ['glitter', 0.6, 1.2]].filter(c => c[0] !== 'strings'),
    real: [['whoosh', 0.2, 0.6, 0.025], ['tick', 1.6, 0.08], ['tom', 1.6, 110, { gain: 0.25, decay: 0.25 }], ['pop', 1.72, 659.25, 0.04, 0.4]],
    pay: [['whoosh', 0.1, 0.5, 0.03], ['pluck', 1.8, 1318.51, 0.035, 0.5, 0], ['pluck', 1.92, 1760, 0.03, 0.5, 0], ['glitter', 1.9, 2.4]],
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void box
