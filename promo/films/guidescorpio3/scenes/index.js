// guidescorpio3 (20 s vertical Align ad, Star Talk "Your Star Guide", ♏ note 3 / 3: try this week) · story 0–15.6, then the end card.
//   0.00  "Try this week, Scorpio."  The ♏ guide, lantern lit, squints on guard beside a tiny steel vault, spinning its dial
//         shut. A pale star across the way peeks: "?"  High in the sky, one red star pulses.
//   2.8   ♏ YOUR STAR: "share one small secret first."  The dial clicks round. Chip: Antares, the red heart of the Scorpion
//         (the red star gets a little label).
//   5.8   The door swings open a crack; gold light spills out.
//   7.2   "small. like 'i love bad movies.'"  POP: a striped popcorn bucket bounces out: I ♥ BAD MOVIES. The other star:
//         "me too!!"  Popcorn arcs across.
//  10.75  card flip · "Let them *in.* A little."  The vault left ajar, both stars munching, the red star still pulsing.
// One canvas (sky + vault + two stars), DOM type above it. Pure f(t).
import { lerp, prog, ease, clamp } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { drawPixelStar } from '../../sky.js'
import { guideFilm, GOLD, BONE, INK, MONO, INTER, GLYPH } from './guidefilm.js'

const SCO = signStar('scorpio'), COL = SCO.color, ACC = '#ff7d9a', PAL = '#9fd8ff'
const T = {
  hookOut: [2.5, 2.8], open: 2.8, l1: 3.0, spin: [3.2, 5.0], fact: 3.7, crack: [5.7, 6.2],
  l2: 7.2, pop: 8.3, metoo: 8.9, share: [9.4, 10.3], close: 10.6,
  cut: 10.75, last: 10.82, lastLand: 11.3, munch: 12.6, out: [15.15, 15.5],
}
const LINES = [
  { t: T.l1, text: 'share one small *secret* first.' },
  { t: T.l2, text: "small. like 'i love *bad* movies.'" },
]
const HX = 330, HY = 1130, HS = 300
const VX = 650, VY = 1150
const PX = 900, PY = 1170
const ANT = { x: 860, y: 560 }
const K_out = t => 1 - ease.inCubic(prog(t, ...T.out))

const BUCKET = [
  '.YYWYYWYY.',
  'YWYYYYWYYY',
  'YYYWYYYYWY',
  'RRWWRRWWRR',
  'RRWWRRWWRR',
  '.RWWRRWWR.',
  '.RWWRRWWR.',
  '..WWRRWW..',
  '..WWRRWW..',
]
const BUCKET_C = { Y: '#fff1b8', W: '#f5eedf', R: '#e23d4f' }

function drawAntares(x, t) {
  const pulse = 0.75 + 0.25 * Math.sin(t * 3.4)
  const g = x.createRadialGradient(ANT.x, ANT.y, 0, ANT.x, ANT.y, 70 * pulse)
  g.addColorStop(0, 'rgba(255,90,70,0.65)'); g.addColorStop(1, 'rgba(255,90,70,0)')
  x.fillStyle = g; x.fillRect(ANT.x - 80, ANT.y - 80, 160, 160)
  drawPixelStar(x, ANT.x, ANT.y, 34 * pulse, 2, '#ff6a50')
  const k = clamp(prog(t, T.fact, T.fact + 0.3)) * (1 - clamp(prog(t, T.l2, T.l2 + 0.3)))
  if (k > 0) { x.save(); x.globalAlpha = k; x.fillStyle = '#ffb0a0'; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillText('ANTARES', ANT.x, ANT.y + 62); x.restore() }
}

function drawVault(x, t, K) {
  const w = 250, h = 250, x0 = VX - w / 2, y0 = VY - h / 2
  const door = ease.outBack(prog(t, ...T.crack)) * 0.32 + (t > T.pop ? 0.38 * ease.outBack(prog(t, T.pop - 0.15, T.pop + 0.2)) : 0)
  // body
  x.fillStyle = INK; x.fillRect(x0 - 10, y0 - 10, w + 20, h + 20)
  x.fillStyle = '#6a7090'; x.fillRect(x0, y0, w, h)
  // the inside (gold light when open)
  x.fillStyle = '#1b1236'; x.fillRect(x0 + 18, y0 + 18, w - 36, h - 36)
  if (door > 0.02) {
    const gl = x.createRadialGradient(VX, VY, 10, VX, VY, 180); gl.addColorStop(0, `rgba(255,214,120,${0.8 * Math.min(1, door * 2)})`); gl.addColorStop(1, 'rgba(255,214,120,0)')
    x.fillStyle = gl; x.fillRect(x0 + 18, y0 + 18, w - 36, h - 36)
    // rays out of the crack
    x.save(); x.globalAlpha = 0.25 * Math.min(1, door * 2); x.fillStyle = '#ffe9a8'
    x.beginPath(); x.moveTo(x0 + w - 18, y0 + 30); x.lineTo(x0 + w + 260, y0 - 120); x.lineTo(x0 + w + 260, y0 + h + 60); x.lineTo(x0 + w - 18, y0 + h - 30); x.fill(); x.restore()
  }
  // the door, hinged on the left: it narrows as it swings toward you
  const dw = (w - 36) * Math.cos(door * Math.PI / 2 * 1.1)
  if (dw > 2) {
    x.fillStyle = INK; x.fillRect(x0 + 14, y0 + 14, dw + 8, h - 28)
    x.fillStyle = '#8a90b0'; x.fillRect(x0 + 18, y0 + 18, dw, h - 36)
    x.fillStyle = '#a8aecb'; x.fillRect(x0 + 18, y0 + 18, dw, 8)
    // the dial
    const dx = x0 + 18 + dw / 2, dy = VY, R = 54 * (dw / (w - 36))
    if (R > 6) {
      const spin = t < T.spin[0] ? t * 1.5 : t < T.spin[1] ? t * 1.5 + Math.sin((t - T.spin[0]) * 3) * 2.4 : T.spin[1] * 1.5
      x.fillStyle = INK; x.beginPath(); x.ellipse(dx, dy, R + 6, R + 6, 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#d6dae8'; x.beginPath(); x.ellipse(dx, dy, R, R, 0, 0, Math.PI * 2); x.fill()
      x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(dx, dy); x.lineTo(dx + Math.cos(spin) * R * 0.8, dy + Math.sin(spin) * R * 0.8); x.stroke()
      for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillStyle = INK; x.fillRect(dx + Math.cos(a) * R * 0.85 - 3, dy + Math.sin(a) * R * 0.85 - 3, 6, 6) }
    }
  }
  // hinges + feet
  x.fillStyle = INK; x.fillRect(x0 - 16, y0 + 40, 16, 34); x.fillRect(x0 - 16, y0 + h - 74, 16, 34)
  x.fillRect(x0 + 10, y0 + h + 8, 40, 20); x.fillRect(x0 + w - 50, y0 + h + 8, 40, 20)
  // a tiny ♏ plate
  x.fillStyle = GOLD; x.fillRect(VX - 30, y0 - 50, 60, 36); x.fillStyle = INK; x.font = `700 32px ${GLYPH}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♏\uFE0E', VX, y0 - 30)
}

function bucketAt(t) {
  if (t < T.pop) return null
  const p = prog(t, T.pop, T.pop + 0.6)
  const bx = lerp(VX + 20, VX + 40, p), by = lerp(VY, VY - 230, ease.outBack(p, 2.4))
  return { x: bx, y: by, k: K_bounce(t) }
}
const K_bounce = t => 1 + 0.15 * Math.exp(-(t - T.pop) * 4) * Math.sin((t - T.pop) * 18)

function scoMood(t) {
  if (t < T.l1) return { mood: 'squint', look: [1, 0], blink: false }
  if (t < T.crack[0]) return { mood: 'neutral', look: [1, 0.3] }
  if (t < T.l2) return { mood: 'wide', look: [1, 0.2] }
  if (t < T.pop) return { mood: 'neutral', look: [0, 0] }
  if (t < T.metoo) return { mood: 'wide', look: [1, -1], blink: false }
  return { mood: 'happy' }
}

const F = guideFilm({
  duration: 20, speaker: '♏ YOUR STAR', color: COL, accent: ACC, glyph: SCO.glyph,
  chip: { sign: 'SCORPIO', glyph: '♏', n: 3, of: 3 },
  hook: { text: 'Try this week, | *Scorpio.*', out: T.hookOut },
  lines: LINES, open: T.open, close: T.close,
  fact: { text: 'ANTARES: THE RED HEART|OF THE SCORPION', at: T.fact, dur: T.l2 - T.fact - 0.2, x: 520, y: 720 },
  heads: [{ text: 'Let them *in.* | A little.', at: T.last, out: T.out, top: 196, size: 120, accentSize: 180, accentColor: ACC, late: 2, lateAt: T.lastLand }],
  guide(t) {
    const munch = t > T.munch ? 0.04 * Math.abs(Math.sin(t * 8)) : 0
    return { x: HX, y: HY, size: HS, ...scoMood(t), squash: munch, pop: K_out(t), side: -1 }
  },
  drawBack(x, t, K) {
    const ko = K_out(t)
    x.save(); x.globalAlpha = ko
    drawAntares(x, t)
    x.fillStyle = 'rgba(239,230,214,0.18)'; x.fillRect(60, 1300, 960, 6)
    drawVault(x, t, K)
    x.restore()
  },
  drawFront(x, t, K) {
    const ko = K_out(t)
    if (ko <= 0.01) return
    // the other star
    const pm = t < T.pop ? { mood: 'neutral', look: [-1, -0.2] } : t < T.metoo ? { mood: 'wide', look: [-1, -0.5] } : t < T.munch ? { mood: 'sparkle', look: [-1, 0] } : { mood: 'happy' }
    const munch = t > T.munch ? 0.04 * Math.abs(Math.sin(t * 8 + 1)) : 0
    K.star({ x: PX, y: PY, size: 200, t, color: PAL, glyph: null, ...pm, seed: 9, hops: [], squash: munch, pop: ko })
    const q = (1 - ease.inCubic(prog(t, 2.4, 2.7))) * ko
    if (q > 0.01) { x.save(); x.globalAlpha = q; x.fillStyle = BONE; x.font = `800 80px ${INTER}`; x.textAlign = 'center'; x.fillText('?', PX + 70 + Math.sin(t * 4) * 4, PY - 120); x.restore() }
    // the bucket
    const b = bucketAt(t)
    if (b) {
      K.drawBits(BUCKET, BUCKET_C, b.x, b.y, 13 * b.k * ko)
      const kl = K.pop01(t, T.pop + 0.35, 0.3, 2.4) * (1 - ease.inCubic(prog(t, T.close - 0.2, T.close + 0.1)))
      if (kl > 0.01) {
        x.save(); x.translate(b.x, b.y - 120); x.scale(kl, kl); x.rotate(-0.05)
        x.fillStyle = INK; x.fillRect(-150, -26, 300, 52); x.fillStyle = '#ffe9a8'; x.fillRect(-145, -21, 290, 42)
        x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('I ♥ BAD MOVIES', 0, 2); x.restore()
      }
      // kernels pop up on landing, then arc over to the other star
      for (let i = 0; i < 8; i++) {
        const t0 = T.pop + i * 0.05, p = prog(t, t0, t0 + 0.8)
        if (p > 0 && p < 1) { x.fillStyle = '#fff6d0'; x.fillRect(b.x + Math.cos(i * 1.7) * 140 * p - 7, b.y - 60 - Math.sin(Math.PI * p) * (120 + i * 12), 14, 14) }
      }
      for (let i = 0; i < 5; i++) {
        const t0 = T.share[0] + i * 0.16, p = prog(t, t0, t0 + 0.55)
        if (p > 0 && p < 1) { x.fillStyle = '#fff6d0'; x.fillRect(lerp(b.x + 30, PX, p) - 7, lerp(b.y - 60, PY - 30, p) - Math.sin(Math.PI * p) * 120, 14, 14) }
      }
      if (t > T.munch) for (let i = 0; i < 3; i++) {
        const ph = (t * 1.3 + i / 3) % 1, src = i % 2 ? PX : HX
        x.fillStyle = '#fff6d0'; x.fillRect(lerp(b.x, src, ph) - 6, lerp(b.y - 60, (i % 2 ? PY : HY) - 20, ph) - Math.sin(Math.PI * ph) * 80, 12, 12)
      }
    }
    K.burst(VX + 60, VY - 330, 90, t, T.pop, { word: 'POP!', size: 46, color: '#ffd34d' })
    const km = K.pop01(t, T.metoo, 0.3, 2.4) * (1 - ease.inCubic(prog(t, T.close - 0.2, T.close + 0.1)))
    if (km > 0.01) K.bubble(PX - 20, PY - 190, 'me too!!', { size: 46, k: km, color: '#1e5a8a' })
    K.sparkles(t, VX, VY, T.crack[1], 10, 200, 0.2, [GOLD, BONE, ACC])
  },
  cues: [
    ...Array.from({ length: 14 }, (_, i) => ['tick', +(T.spin[0] + i * 0.13).toFixed(2), 0.03 * (i % 3 ? 0.6 : 1)]),
    ['pop', 0.3, 659.25, 0.02, 0.4], ['pop', 2.2, 987.77, 0.025, 0.5],
    ['boom', T.crack[0], 0.08], ['whoosh', T.crack[0], 0.4, 0.03], ['bell', T.crack[1], 1318.51, 0.03, 1.4, 0], ['glitter', T.crack[1], T.crack[1] + 0.5],
    ['boom', T.pop, 0.14], ['pop', T.pop, 1567.98, 0.05, 0.1], ...Array.from({ length: 6 }, (_, i) => ['pop', +(T.pop + 0.05 + i * 0.06).toFixed(2), 1760 - i * 90, 0.02, (i % 2 ? 0.3 : -0.3)]),
    ['pop', T.metoo, 1318.51, 0.045, 0.4], ['pluck', T.metoo + 0.15, 1567.98, 0.035, 0.6, 0.4],
    ...[0, 1, 2, 3, 4].map(i => ['pop', +(T.share[0] + i * 0.16 + 0.5).toFixed(2), 1174.66 + i * 60, 0.015, 0.4]),
    ['whoosh', T.out[0], 0.35, 0.03],
  ],
  cuts: [{ t: T.cut, kind: 'flip' }],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
