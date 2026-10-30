// guidescorpio2 (15 s vertical Align ad, Star Talk "Your Star Guide", ♏ note 2 / 3: what you need) · story 0–10.6, then the end card.
//   0.00  "What you need, Scorpio."  Just under the surface, the ♏ guide (lantern lit) and a pale star, both in brass diving
//         helmets, start to sink. A depth gauge on the right reads SMALL TALK.
//   2.6   ♏ YOUR STAR: "someone who goes deep and doesn't flinch."  They sink past the light; the gauge slides to REAL TALK.
//         An anglerfish flicks its lure on right beside them: Scorpio jumps; the other star just waves. Chip: the 8th house.
//   5.7   "loyal. the real kind."  A lifeline ties them together; the bubbles rise as a heart.
//   8.2   card flip · "Deep *and* safe."  Side by side at the bottom, holding the line, the lantern lighting the deep.
// One canvas (water + gauge + two divers), DOM type above it. Pure f(t).
import { lerp, prog, ease, clamp } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { guideFilm, GOLD, BONE, INK, MONO } from './guidefilm.js'

const SCO = signStar('scorpio'), COL = SCO.color, ACC = '#ff7d9a', PAL = '#9fd8ff'
const T = {
  hookOut: [2.15, 2.45], open: 2.4, l1: 2.6, sink: [1.6, 5.4], fact: 3.3, fish: 4.55, jump: 4.62,
  l2: 5.7, rope: 6.0, heart: 6.7, close: 8.05,
  cut: 8.2, last: 8.28, lastLand: 8.62, out: [10.15, 10.45],
}
const LINES = [
  { t: T.l1, text: "someone who goes deep and doesn't *flinch.*" },
  { t: T.l2, text: 'loyal. the *real* kind.' },
]
const GX = 400, PX = 690, Y0 = 1040
const K_out = t => 1 - ease.inCubic(prog(t, ...T.out))
const depth = t => ease.inOutCubic(prog(t, ...T.sink))

const FISH = [
  '..........L.',
  '.........L..',
  '...BBBBB.L..',
  '..BBBBBBBL..',
  '.BBWBBBBBB.T',
  'BBBBBBBBBBTT',
  'BTBTBTBBBBTT',
  '.BBBBBBBBB.T',
  '..BBBBBBB...',
]
const FISH_C = { B: '#3a4a7a', W: '#ffffff', T: '#e8f0ff', L: '#6a7aa8' }

function drawWater(x, t) {
  const D = depth(t)
  // water body: teal near the top, ink deep down; the sky band above the surface scrolls away
  const sy = 700 - D * 900
  const g = x.createLinearGradient(0, sy, 0, 1920)
  g.addColorStop(0, `rgba(40,150,170,${0.75 - 0.35 * D})`); g.addColorStop(0.45, 'rgba(18,40,92,0.85)'); g.addColorStop(1, 'rgba(6,6,24,0.95)')
  x.fillStyle = g; x.fillRect(0, Math.max(0, sy), 1080, 1920)
  if (sy > -40) {
    // the surface: a bright wavy pixel line
    x.fillStyle = 'rgba(200,245,255,0.85)'
    for (let i = 0; i < 54; i++) x.fillRect(i * 20, sy + Math.round(Math.sin(i * 0.7 + t * 3) * 4), 20, 6)
    // light shafts
    x.save(); x.globalAlpha = 0.12 * (1 - D)
    x.fillStyle = '#c8f5ff'
    for (let k = 0; k < 4; k++) { x.beginPath(); const bx = 160 + k * 260 + Math.sin(t * 0.7 + k) * 20; x.moveTo(bx, sy); x.lineTo(bx + 70, sy); x.lineTo(bx + 230, sy + 900); x.lineTo(bx + 90, sy + 900); x.fill() }
    x.restore()
  }
  // floaty specks drift up (they move faster the deeper the sink: the camera is falling)
  x.fillStyle = 'rgba(200,245,255,0.35)'
  for (let i = 0; i < 26; i++) {
    const px = (i * 173) % 1080, py = ((i * 311 - t * 40 - D * 900) % 1400 + 1400) % 1400 + 520
    x.fillRect(px, py, 5, 5)
  }
  // the sea floor rises into view at the end of the sink
  const fy = 1330 + (1 - D) * 700
  if (fy < 1920) {
    x.fillStyle = '#1b1236'; x.fillRect(0, fy, 1080, 600)
    x.fillStyle = '#2a2050'; for (let i = 0; i < 27; i++) x.fillRect(i * 40, fy - (i % 3) * 8, 40, 12 + (i % 3) * 8)
  }
}

function drawGauge(x, t) {
  const D = depth(t)
  const gx = 1000, y0 = 560, y1 = 1240
  x.fillStyle = INK; x.fillRect(gx - 22, y0 - 12, 44, y1 - y0 + 24)
  const g = x.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, '#5fd8e8'); g.addColorStop(1, '#2a1f6a')
  x.fillStyle = g; x.fillRect(gx - 14, y0 - 4, 28, y1 - y0 + 8)
  const my = lerp(y0, y1, D)
  x.fillStyle = INK; x.fillRect(gx - 40, my - 14, 30, 28); x.fillStyle = GOLD; x.fillRect(gx - 36, my - 10, 22, 20)
  x.save(); x.textAlign = 'right'; x.textBaseline = 'middle'; x.font = `700 24px ${MONO}`
  x.fillStyle = D < 0.5 ? BONE : 'rgba(239,230,214,0.45)'; x.fillText('SMALL TALK', gx - 50, y0 + 6)
  x.fillStyle = D > 0.5 ? GOLD : 'rgba(239,230,214,0.45)'; x.fillText('REAL TALK', gx - 50, y1 - 6)
  x.restore()
}

/** a brass diving helmet around a star's face (r = drawStarChar's return) */
function helmet(x, cx, cy, size, t) {
  const R = size * 0.34, c = Math.max(4, Math.round(size / 40))
  x.save()
  x.fillStyle = 'rgba(160,230,255,0.16)'; x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2); x.fill()
  x.lineWidth = c * 2.6; x.strokeStyle = INK; x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2); x.stroke()
  x.lineWidth = c * 1.6; x.strokeStyle = '#d6a24a'; x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; x.fillStyle = INK; x.fillRect(cx + Math.cos(a) * R - c, cy + Math.sin(a) * R - c, c * 2, c * 2); x.fillStyle = '#ffe9a8'; x.fillRect(cx + Math.cos(a) * R - c / 2, cy + Math.sin(a) * R - c / 2, c, c) }
  // glass glint
  x.fillStyle = 'rgba(255,255,255,0.55)'; x.fillRect(cx - R * 0.55, cy - R * 0.6, c * 1.4, c * 4); x.fillRect(cx - R * 0.42, cy - R * 0.72, c * 3, c * 1.4)
  // the air hose valve on top
  x.fillStyle = INK; x.fillRect(cx - c * 2, cy - R - c * 4, c * 4, c * 3.5); x.fillStyle = '#d6a24a'; x.fillRect(cx - c * 1.2, cy - R - c * 3.2, c * 2.4, c * 2)
  x.restore()
}

function bubbles(x, t, cx, cy, seed) {
  x.fillStyle = 'rgba(220,250,255,0.7)'
  for (let i = 0; i < 5; i++) {
    const ph = (t * 0.8 + i * 0.21 + seed * 0.37) % 1
    const s = 6 + (i % 3) * 4
    x.fillRect(cx + Math.sin(ph * 9 + i) * 14 - s / 2, cy - ph * 260, s, s)
  }
}

const sinkBob = (t, k) => Math.sin(t * 1.6 + k) * 10

const F = guideFilm({
  duration: 15, speaker: '♏ YOUR STAR', color: COL, accent: ACC, glyph: SCO.glyph,
  chip: { sign: 'SCORPIO', glyph: '♏', n: 2, of: 3 },
  hook: { text: 'What you *need,* | Scorpio.', out: T.hookOut },
  lines: LINES, open: T.open, close: T.close,
  fact: { text: 'SCORPIO RULES THE 8TH HOUSE|(INTIMACY, TRANSFORMATION)', at: T.fact, dur: T.close - T.fact - 0.15, x: 540, y: 1360 },
  heads: [{ text: 'Deep | *and* safe.', at: T.last, out: T.out, top: 200, size: 130, accentSize: 190, accentColor: ACC, late: 2, lateAt: T.lastLand }],
  guide(t) {
    const jumpK = t > T.jump && t < T.jump + 0.5 ? Math.sin(Math.PI * prog(t, T.jump, T.jump + 0.5)) : 0
    const mood = t < T.l1 ? { mood: 'squint', look: [1, -1] } : t < T.fish ? { mood: 'neutral', look: [1, 0.3] } : t < T.l2 ? { mood: 'wide', look: [-1, 0.3], blink: false } : t < T.heart ? { mood: 'happy', look: [1, 0] } : { mood: 'heart' }
    return { x: GX, y: Y0 + sinkBob(t, 0) - jumpK * 70, size: 270, ...mood, squash: -0.12 * jumpK, pop: K_out(t), side: -1, lanternGlow: lerp(0.8, 1.5, depth(t)), hops: [] }
  },
  drawBack(x, t, K) {
    x.save(); x.globalAlpha = clamp(K_out(t) * 1.3)
    drawWater(x, t)
    drawGauge(x, t)
    // the anglerfish (lure flicks on beside them)
    const fk = K.pop01(t, T.fish - 0.25, 0.4, 1.8)
    if (fk > 0.01) {
      const fx = 150 + (1 - fk) * -260, fy = 1180 + Math.sin(t * 2) * 8
      K.drawBits(FISH, FISH_C, fx, fy, 16)
      const on = t > T.fish
      if (on) {
        const lx = fx + 4 * 16 - 6, ly = fy - 6 * 16
        const gr = x.createRadialGradient(lx, ly, 0, lx, ly, 90); gr.addColorStop(0, 'rgba(255,240,150,0.85)'); gr.addColorStop(1, 'rgba(255,240,150,0)')
        x.fillStyle = gr; x.fillRect(lx - 90, ly - 90, 180, 180)
        x.fillStyle = '#fff6b0'; x.fillRect(lx - 8, ly - 8, 16, 16)
      }
    }
    x.restore()
  },
  drawFront(x, t, K, r) {
    const ko = K_out(t)
    if (ko <= 0.01) return
    const D = depth(t)
    // the lifeline between them (a little gold heart knot in the middle)
    const rp = ease.outCubic(prog(t, T.rope, T.rope + 0.6))
    const py = Y0 + 20 + sinkBob(t, 1.3)
    if (r) {
      // the other diver (waves at the fish: doesn't flinch)
      const wave = t > T.fish + 0.1 && t < T.l2 ? 0.06 * Math.sin((t - T.fish) * 14) : 0
      const pm = t < T.fish ? { mood: 'neutral', look: [-0.6, 0.4] } : t < T.l2 ? { mood: 'happy', look: [-1, 0.4] } : t < T.heart ? { mood: 'happy' } : { mood: 'heart' }
      const pr = K.star({ x: PX, y: py, size: 240, t, color: PAL, glyph: null, ...pm, seed: 9, hops: [], squash: wave, pop: ko })
      helmet(x, r.x, r.y + 12, 270 * ko, t)
      helmet(x, pr.x, pr.y + 12, 240 * ko, t)
      bubbles(x, t, r.x, r.y - 120, 1); bubbles(x, t, pr.x, pr.y - 110, 2)
      if (rp > 0) {
        const ax = r.x + 100, ay = r.y + 70, bx = pr.x - 90, by = pr.y + 70
        const ex = lerp(ax, bx, rp)
        x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.moveTo(ax, ay); x.quadraticCurveTo((ax + ex) / 2, ay + 60, ex, lerp(ay, by, rp)); x.stroke()
        x.strokeStyle = GOLD; x.lineWidth = 6; x.stroke()
        if (rp >= 1) K.drawBits(['.H.H.', 'HHHHH', 'HHHHH', '.HHH.', '..H..'], { H: ACC }, (ax + bx) / 2, ay + 32, 7)
      }
      // the bubbles rise as a heart
      if (t > T.heart && t < T.heart + 1.8) {
        const p = prog(t, T.heart, T.heart + 1.8)
        x.save(); x.globalAlpha = Math.sin(Math.PI * p); x.fillStyle = 'rgba(220,250,255,0.9)'
        const hx = (r.x + pr.x) / 2, hy = 780 - p * 140, c = 12
        for (const [i, j] of [[1, 0], [2, 0], [4, 0], [5, 0], [0, 1], [3, 1], [6, 1], [0, 2], [6, 2], [1, 3], [5, 3], [2, 4], [4, 4], [3, 5]]) x.fillRect(hx + (i - 3.5) * c * 1.6, hy + j * c * 1.6, c, c)
        x.restore()
      }
    }
    K.burst(GX - 60, 820, 80, t, T.jump, { word: 'EEP', size: 40, color: '#ffd34d' })
    void D
  },
  cues: [
    ['whoosh', 0.05, 0.5, 0.03], ['pop', 0.4, 1318.51, 0.02, -0.2], ['pop', 0.9, 1567.98, 0.02, 0.2], ['pop', 1.3, 1174.66, 0.02, 0],
    ['riser', T.sink[0], T.sink[1], 0.025],
    ['pop', T.fish, 1760, 0.04, -0.5], ['boom', T.jump, 0.1], ['tick', T.jump, 0.05],
    ['whoosh', T.rope, 0.5, 0.03], ['pluck', T.rope + 0.6, 1318.51, 0.04, 0.6, 0], ['bell', T.heart, 1567.98, 0.03, 1.2, 0], ['glitter', T.heart, T.heart + 0.6],
    ['whoosh', T.out[0], 0.35, 0.03],
  ],
  cuts: [{ t: T.cut, kind: 'flip' }],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
