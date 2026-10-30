// guidesag3 (20 s vertical Align ad, Star Talk "Your Star Guide", ♐ note 3 / 3: try this week) · story 0–15.6, then the end card.
//   0.00  "Try this week, Sagittarius."  The ♐ guide, lantern lit, sparkle-eyed, holds up a giant world map criss-crossed with
//         long dotted routes; a little plane zips along them. The pale star beside it looks a bit dizzy.
//   2.8   ♐ YOUR STAR: "plan a tiny trip. together."  Chip: the centre of our galaxy lies toward Sagittarius (a soft
//         glow in the sky gets an arrow). Sag scribbles out the long routes.
//   7.2   "even a new coffee place counts."  A YOU ARE HERE pin, a short dotted line: 2 BLOCKS → a coffee cup. The map folds
//         away; the two stars sit at a little café table, two cups steaming.
//  10.75  card flip · "Explore *together*."  At the table, Sag lifts the map again: one more short line, to a tiny tree. NEXT?
// One canvas (sky + map + café + two stars), DOM type above it. Pure f(t).
import { lerp, prog, ease, clamp } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { guideFilm, GOLD, BONE, INK, MONO, INTER } from './guidefilm.js'

const SAG = signStar('sagittarius'), COL = SAG.color, ACC = '#c9a0ff', PAL = '#ffb3c8'
const T = {
  hookOut: [2.5, 2.8], open: 2.8, l1: 3.0, fact: 3.6, scribble: [5.2, 6.4],
  l2: 7.2, pin: 7.7, dots: [8.0, 8.8], cup: 8.85, fold: [9.4, 9.8], move: [9.4, 10.0], cafe: 9.9, close: 10.6,
  cut: 10.75, last: 10.82, lastLand: 11.25, again: 12.6, next: [13.2, 13.8], out: [15.15, 15.5],
}
const LINES = [
  { t: T.l1, text: 'plan a tiny trip. *together.*' },
  { t: T.l2, text: 'even a new *coffee* place counts.' },
]
const MAP = { x: 540, y: 780, w: 600, h: 380 }
const GC = { x: 900, y: 470 }
const K_out = t => 1 - ease.inCubic(prog(t, ...T.out))

const ROUTES = [[[-230, 80], [200, -120]], [[-230, 80], [250, 120]], [[-230, 80], [-60, -140]], [[-230, 80], [120, 20]]]
function dotted(x, ax, ay, bx, by, k, col, w = 8, bow = -60) {
  const n = Math.max(2, Math.round(Math.hypot(bx - ax, by - ay) / 26))
  x.fillStyle = col
  for (let i = 0; i <= n * k; i++) {
    const u = i / n, px = lerp(ax, bx, u), py = lerp(ay, by, u) + Math.sin(Math.PI * u) * bow
    x.fillRect(px - w / 2, py - w / 2, w, w)
  }
}
const CUP = ['.WWWW..', '.WCCW..', '.WWWWWW', '.WWWW.W', '.WWWWWW', '..WW...']
const CUP_C = { W: '#f5eedf', C: '#7a4a2a' }
const TREE = ['..GG..', '.GGGG.', 'GGGGGG', '.GGGG.', '..BB..', '..BB..']
const TREE_C = { G: '#5fa06a', B: '#7a4a2a' }

function drawMap(x, t, K, { k = 1, phase = 'big' } = {}) {
  if (k <= 0.01) return
  const { w, h } = MAP
  x.save(); x.translate(MAP.x, MAP.y); x.scale(k, 1); x.rotate(-0.03 + Math.sin(t * 1.4) * 0.01)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = '#efe0b4'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = 'rgba(122,90,40,0.25)'; for (let i = 1; i < 4; i++) x.fillRect(-w / 2 + i * w / 4, -h / 2, 3, h)
  // continents
  x.fillStyle = '#9cc48a'
  for (const [cx, cy, rw, rh] of [[-200, -60, 120, 140], [-80, 90, 90, 110], [60, -90, 150, 90], [190, 40, 110, 120], [230, -130, 60, 50]]) {
    for (let j = 0; j < rh; j += 12) { const ww = rw * Math.sqrt(1 - Math.pow((j - rh / 2) / (rh / 2), 2)); x.fillRect(cx - ww / 2 + Math.sin(j) * 6, cy - rh / 2 + j, ww, 12) }
  }
  if (phase === 'big') {
    const sk = clamp(prog(t, ...T.scribble))
    const fade = 1 - 0.8 * clamp(prog(t, T.pin - 0.4, T.pin))
    for (const [a, b] of ROUTES) dotted(x, a[0], a[1], b[0], b[1], 1, `rgba(226,61,79,${(1 - 0.6 * sk) * fade})`, 8, -90)
    // the little plane zipping along the first route
    if (t < T.scribble[0]) {
      const u = (t * 0.45) % 1, [a, b] = ROUTES[(Math.floor(t * 0.45)) % ROUTES.length]
      const px = lerp(a[0], b[0], u), py = lerp(a[1], b[1], u) + Math.sin(Math.PI * u) * -90
      x.fillStyle = INK; x.fillRect(px - 18, py - 6, 36, 12); x.fillRect(px - 6, py - 18, 12, 36); x.fillStyle = '#f5eedf'; x.fillRect(px - 14, py - 3, 28, 6)
    }
    // the scribble-out (red zig-zags)
    if (sk > 0) {
      x.strokeStyle = `rgba(196,42,58,${fade})`; x.lineWidth = 9; x.lineCap = 'square'; x.beginPath()
      const n = Math.floor(sk * 14)
      for (let i = 0; i <= n; i++) { const px = -220 + i * 34, py = (i % 2 ? -60 : 60) + Math.sin(i) * 10; i ? x.lineTo(px, py) : x.moveTo(px, py) }
      x.stroke()
    }
    // the tiny trip
    if (t > T.pin) {
      const pk = K.pop01(t, T.pin, 0.3, 2.6)
      const hx = -40, hy = 70
      x.save(); x.translate(hx, hy); x.scale(pk, pk)
      x.fillStyle = INK; x.fillRect(-16, -50, 32, 32); x.fillRect(-6, -20, 12, 22); x.fillStyle = '#e23d4f'; x.fillRect(-12, -46, 24, 24)
      x.restore()
      dotted(x, hx, hy - 6, hx + 150, hy - 10, ease.outCubic(prog(t, ...T.dots)), COL, 10, -18)
      if (t > T.dots[0] + 0.3) { x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillText('2 BLOCKS', hx + 75, hy - 40) }
      if (t > T.cup) { const ck = K.pop01(t, T.cup, 0.3, 2.6); K.drawBits(CUP, CUP_C, hx + 175, hy - 20, 8 * ck) }
      x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.fillText('YOU ARE HERE', hx - 10, hy + 34)
    }
  } else {
    // at the café: one more short line, to a tree. NEXT?
    const hx = -60, hy = 40
    x.fillStyle = INK; x.fillRect(hx - 12, hy - 36, 24, 24); x.fillStyle = '#e23d4f'; x.fillRect(hx - 8, hy - 32, 16, 16)
    dotted(x, hx, hy, hx + 160, hy - 30, ease.outCubic(prog(t, ...T.next)), COL, 10, -20)
    if (t > T.next[1]) {
      K.drawBits(TREE, TREE_C, hx + 190, hy - 40, 10)
      x.fillStyle = INK; x.font = `800 30px ${MONO}`; x.textAlign = 'center'; x.fillText('NEXT?', hx + 190, hy + 50)
    }
  }
  x.restore()
}

function drawGalaxy(x, t) {
  // a soft glowing band toward the galactic centre (lower right, behind the scene)
  const a = clamp(prog(t, T.fact - 0.3, T.fact + 0.3)) * (1 - clamp(prog(t, T.l2 - 0.3, T.l2)))
  const base = 0.35 + 0.65 * a
  const g = x.createRadialGradient(GC.x, GC.y, 0, GC.x, GC.y, 260)
  g.addColorStop(0, `rgba(255,236,200,${0.35 * base})`); g.addColorStop(0.5, `rgba(200,170,255,${0.15 * base})`); g.addColorStop(1, 'rgba(200,170,255,0)')
  x.fillStyle = g; x.fillRect(GC.x - 260, GC.y - 260, 520, 520)
  if (a > 0) {
    x.save(); x.globalAlpha = a; x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.textAlign = 'right'
    x.textAlign = 'center'; x.fillText('↑ GALACTIC CENTRE', GC.x - 40, GC.y + 80); x.restore()
  }
}

function sagX(t) { return lerp(760, 690, ease.inOutCubic(prog(t, ...T.move))) }
function parX(t) { return lerp(250, 370, ease.inOutCubic(prog(t, ...T.move))) }
function sagMood(t) {
  if (t < T.l1) return { mood: 'sparkle', look: [-0.6, -1] }
  if (t < T.scribble[0]) return { mood: 'neutral', look: [-1, 0.2] }
  if (t < T.l2) return { mood: 'squint', look: [-0.6, -1] }
  if (t < T.cafe) return { mood: 'happy', look: [-0.6, -1] }
  if (t < T.again) return { mood: 'happy' }
  return { mood: 'sparkle', look: [-0.6, -1] }
}

const F = guideFilm({
  duration: 20, speaker: '♐ YOUR STAR', color: COL, accent: ACC, glyph: SAG.glyph,
  chip: { sign: 'SAGITTARIUS', glyph: '♐', n: 3, of: 3 },
  hook: { text: 'Try this week, | *Sagittarius.*', out: T.hookOut, size: 96 },
  lines: LINES, open: T.open, close: T.close,
  fact: { text: 'THE CENTRE OF OUR GALAXY LIES|IN THE DIRECTION OF SAGITTARIUS', at: T.fact, dur: T.l2 - T.fact - 0.2, x: 540, y: 1356, size: 27 },
  heads: [{ text: 'Explore | *together.*', at: T.last, out: T.out, top: 196, size: 124, accentSize: 180, accentColor: ACC, late: 1, lateAt: T.lastLand }],
  guide(t) {
    const scrib = t > T.scribble[0] && t < T.scribble[1] ? 0.05 * Math.sin(t * 30) : 0
    return { x: sagX(t), y: 1140, size: 280, ...sagMood(t), squash: scrib, pop: K_out(t), side: 1 }
  },
  drawBack(x, t, K) {
    const ko = K_out(t)
    x.save(); x.globalAlpha = ko
    drawGalaxy(x, t)
    x.fillStyle = 'rgba(239,230,214,0.18)'; x.fillRect(60, 1300, 960, 6)
    // the café table + a striped awning, once they sit
    const ck = K.pop01(t, T.cafe, 0.4, 1.8)
    if (ck > 0.01) {
      x.save(); x.translate(530, 1250); x.scale(ck, ck)
      x.fillStyle = INK; x.fillRect(-120, -14, 240, 28); x.fillRect(-12, 10, 24, 60); x.fillRect(-60, 62, 120, 14)
      x.fillStyle = '#f5eedf'; x.fillRect(-114, -8, 228, 16)
      x.restore()
    }
    x.restore()
    // the map (big at first; it folds away; it comes back small at the café)
    const fk = 1 - ease.inCubic(prog(t, ...T.fold))
    if (t < T.fold[1]) drawMap(x, t, K, { k: fk * ko })
    const ak = K.pop01(t, T.again, 0.4, 2.0) * ko
    if (ak > 0.01) { x.save(); x.translate(0, -40); drawMap(x, t, K, { k: ak, phase: 'small' }); x.restore() }
  },
  drawFront(x, t, K) {
    const ko = K_out(t)
    if (ko <= 0.01) return
    const pm = t < T.scribble[0] ? { mood: 'squint', look: [1, -1] } : t < T.pin ? { mood: 'neutral', look: [1, -1] } : t < T.cafe ? { mood: 'sparkle', look: [1, -1] } : t < T.again ? { mood: 'happy' } : { mood: 'sparkle', look: [1, -1] }
    const dizzy = t < T.scribble[0] ? 0.06 * Math.sin(t * 5) : 0
    K.star({ x: parX(t), y: 1160, size: 200, t, color: PAL, glyph: null, ...pm, seed: 9, hops: [], squash: dizzy, pop: ko })
    // dizzy swirl over its head, while the routes are huge
    if (t < T.scribble[1]) {
      const a = 1 - prog(t, T.scribble[0], T.scribble[1])
      x.save(); x.globalAlpha = a * ko; x.fillStyle = GOLD
      for (let i = 0; i < 3; i++) { const an = t * 4 + i * 2.1; x.fillRect(parX(t) + Math.cos(an) * 60 - 6, 1020 + Math.sin(an) * 18 - 6, 12, 12) }
      x.restore()
    }
    // the two cups on the café table
    const cups = K.pop01(t, T.cafe + 0.25, 0.3, 2.4) * ko
    if (cups > 0.01) {
      for (const cx of [470, 590]) {
        K.drawBits(CUP, CUP_C, cx, 1214, 8 * cups)
        x.save(); x.fillStyle = 'rgba(239,230,214,0.6)'
        for (let i = 0; i < 3; i++) { const ph = (t * 0.9 + i * 0.33 + cx) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * cups; x.fillRect(cx - 16 + i * 12, 1180 - ph * 50, 6, 6) }
        x.restore()
      }
    }
  },
  cues: [
    ...[0.2, 0.65, 1.1, 1.55, 2.0].map((v, i) => ['whoosh', v, 0.18, 0.015 * (i % 2 ? 0.6 : 1)]),
    ...Array.from({ length: 10 }, (_, i) => ['tick', +(T.scribble[0] + i * 0.12).toFixed(2), 0.03]),
    ['pop', T.pin, 1174.66, 0.045, 0], ...Array.from({ length: 6 }, (_, i) => ['pop', +(T.dots[0] + i * 0.13).toFixed(2), 880 + i * 60, 0.018, 0.2]),
    ['pluck', T.cup, 1567.98, 0.04, 0.6, 0.2], ['whoosh', T.fold[0], 0.4, 0.03], ['pop', T.cafe + 0.25, 987.77, 0.035, -0.2], ['pop', T.cafe + 0.35, 1174.66, 0.035, 0.2],
    ['whoosh', T.again, 0.35, 0.03], ['pop', T.next[1], 1318.51, 0.04, 0], ['bell', T.next[1] + 0.1, 1760, 0.02, 1.0, 0],
    ['whoosh', T.out[0], 0.35, 0.03],
  ],
  cuts: [{ t: T.cut, kind: 'flip' }],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
