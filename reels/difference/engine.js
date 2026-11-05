// Align "What's the difference?" reels: the frame engine. Runs as an ES module
// in a browser page. setup(data) lays out the reel, frame(t) paints one frame:
// warm paper, two framed art cards (glowing line art on Align's indigo sky),
// a label over each, a VS coin between them, captions that light up word by
// word with the voice, and Star Talk's pixel star below, shrugging with two
// question marks until the answer lands. Between pairs the cards flip like
// Align cards. Everything is drawn in code and seeded.

import { drawStarChar, STAR } from './vendor/films/startalk.js'

const W = 1080
const H = 1920
const CX = 540
const canvas = document.getElementById('c')
canvas.width = W
canvas.height = H
const ctx = canvas.getContext('2d')

const COL = {
  paper: '#f7f3ec', ink: '#1b1236', soft: '#6a5f82', gold: '#f2c75c', goldDeep: '#d9a32b', rose: '#e8628a',
  lilac: '#9a7be0', lilac2: '#c9b6f8', mint: '#7fd8b0', bone: '#efe6d6', glow: '#fff6dc',
  venus: '#ffa3c2', mars: '#ff6a4d', blue: '#8cc4ff',
}

const L = {
  label: 316, top: 370, cw: 432, ch: 540, ax: 282, bx: 798, inset: 10,
  cap: { y: 1046, size: 64, lh: 84, maxW: 960 },
  star: { x: 540, y: 1446, size: 384 }, q: { y: 1290, dx: 235 },
  pill: 1172, handle: { x: 60, y: 1600 }, mark: 146, dots: 206,
}
const AW = L.cw - L.inset * 2
const AH = L.ch - L.inset * 2

// ---------- helpers ----------

function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
function hash(s) {
  let h = 2166136261
  for (const ch of String(s)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619)
  return h >>> 0
}
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v))
const lerp = (a, b, k) => a + (b - a) * k
const ease = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2)
const easeOut = (k) => 1 - Math.pow(1 - k, 3)
const backOut = (k, s = 2.2) => { k = clamp(k); const c = s + 1; return 1 + c * Math.pow(k - 1, 3) + s * Math.pow(k - 1, 2) }
const TAU = Math.PI * 2
function rgb(h) {
  const n = parseInt(h.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
const rgba = (h, a) => { const [r, g, b] = rgb(h); return `rgba(${r},${g},${b},${clamp(a)})` }
function layer(w, h) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  return c
}
function bez(p0, p1, p2, p3, n = 24) {
  const out = []
  for (let i = 0; i <= n; i++) {
    const k = i / n, u = 1 - k
    out.push([u * u * u * p0[0] + 3 * u * u * k * p1[0] + 3 * u * k * k * p2[0] + k * k * k * p3[0],
      u * u * u * p0[1] + 3 * u * u * k * p1[1] + 3 * u * k * k * p2[1] + k * k * k * p3[1]])
  }
  return out
}
function chaikin(poly, n = 2) {
  let p = poly
  for (let k = 0; k < n; k++) {
    const q = []
    for (let i = 0; i < p.length; i++) {
      const a = p[i], b = p[(i + 1) % p.length]
      q.push([a[0] * 0.75 + b[0] * 0.25, a[1] * 0.75 + b[1] * 0.25], [a[0] * 0.25 + b[0] * 0.75, a[1] * 0.25 + b[1] * 0.75])
    }
    p = q
  }
  return p
}
function starPts(cx, cy, ro, ri, rot = -Math.PI / 2, n = 5) {
  const out = []
  for (let i = 0; i < n * 2; i++) {
    const a = rot + (i * Math.PI) / n, r = i % 2 ? ri : ro
    out.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r])
  }
  return out
}
function poly(pts, close = true) {
  const p = new Path2D()
  p.moveTo(pts[0][0], pts[0][1])
  for (let i = 1; i < pts.length; i++) p.lineTo(pts[i][0], pts[i][1])
  if (close) p.closePath()
  return p
}

let GLYPHS = {}
function glyph(g, ch, x, y, size, color, { glow = 0, alpha = 1 } = {}) {
  const gl = GLYPHS[ch]
  if (!gl) return
  if (!gl.path) gl.path = new Path2D(gl.d)
  g.save()
  g.globalAlpha *= alpha
  g.translate(x, y)
  g.scale(size / 1000, size / 1000)
  if (glow) {
    g.shadowColor = color
    g.shadowBlur = glow
  }
  g.fillStyle = color
  g.fill(gl.path)
  g.restore()
}

// ---------- the art kit: glowing Stardust on an indigo sky ----------

// Stardust, Align's star-headed figure, as a silhouette: star head + gown.
function figShape(x, gy, h) {
  const q = (k) => h * k
  const head = [x, gy - q(0.8)]
  const hr = q(0.14)
  const star = chaikin(starPts(head[0], head[1], hr, hr * 0.5), 2)
  const ny = gy - q(0.665), sy = gy - q(0.6), wy = gy - q(0.4)
  const left = [
    ...bez([x - q(0.035), ny], [x - q(0.06), sy - q(0.005)], [x - q(0.13), sy - q(0.012)], [x - q(0.15), sy + q(0.03)], 10),
    ...bez([x - q(0.15), sy + q(0.03)], [x - q(0.162), sy + q(0.1)], [x - q(0.112), wy - q(0.06)], [x - q(0.11), wy], 12).slice(1),
    ...bez([x - q(0.11), wy], [x - q(0.12), wy + q(0.12)], [x - q(0.2), gy - q(0.12)], [x - q(0.22), gy - q(0.05)], 14).slice(1),
  ]
  const hem = bez([x - q(0.22), gy - q(0.05)], [x - q(0.08), gy - q(0.02)], [x + q(0.08), gy - q(0.02)], [x + q(0.22), gy - q(0.05)], 16)
  const right = left.map(([px, py]) => [2 * x - px, py]).reverse()
  const body = [...left, ...hem.slice(1), ...right.slice(1)]
  const neck = [[x - q(0.03), head[1] + hr * 0.5], [x + q(0.03), head[1] + hr * 0.5], [x + q(0.035), ny], [x - q(0.035), ny]]
  return { head, hr, star, body, neck, sy, wy, q }
}

// arm: 'down', or reach toward a side (−1 / 1), optional target point
function armPts(f, x, side, reach, target) {
  const { q, sy, wy } = f
  const sx = x + side * q(0.148), ay = sy + q(0.035)
  if (!reach) return bez([sx, ay], [sx + side * q(0.03), ay + q(0.08)], [sx + side * q(0.03), ay + q(0.16)], [x + side * q(0.14), wy + q(0.06)], 18)
  const end = target ?? [x + side * q(0.34), ay + q(0.09)]
  return bez([sx, ay], [sx + side * q(0.08), ay + q(0.1)], [lerp(sx, end[0], 0.7), end[1] + q(0.03)], end, 18)
}

function glowFigure(g, x, gy, h, color, o = {}) {
  const { a = 1, ghost = false, reach = 0, reach2 = 0, target, target2, core = 1 } = o
  const f = figShape(x, gy, h)
  const bodyP = poly(f.body), starP = poly(f.star), neckP = poly(f.neck)
  g.save()
  g.globalAlpha *= a
  g.globalCompositeOperation = 'lighter'
  g.lineCap = 'round'
  g.lineJoin = 'round'
  if (!ghost) {
    // the aura: a wide soft fill
    g.shadowColor = rgba(color, 0.9)
    g.shadowBlur = h * 0.14
    g.fillStyle = rgba(color, 0.28)
    g.fill(bodyP)
    g.fill(starP)
    g.shadowBlur = 0
    // a hot core down the middle of the body
    const gr = g.createRadialGradient(x, gy - h * 0.42, 0, x, gy - h * 0.42, h * 0.5)
    gr.addColorStop(0, rgba(COL.glow, 0.75 * core))
    gr.addColorStop(0.45, rgba(color, 0.45 * core))
    gr.addColorStop(1, rgba(color, 0.06))
    g.fillStyle = gr
    g.fill(bodyP)
    g.fill(neckP)
    const hg = g.createRadialGradient(f.head[0], f.head[1], 0, f.head[0], f.head[1], f.hr * 1.1)
    hg.addColorStop(0, rgba('#ffffff', 0.95 * core))
    hg.addColorStop(0.6, rgba(color, 0.7))
    hg.addColorStop(1, rgba(color, 0.2))
    g.fillStyle = hg
    g.fill(starP)
  }
  // rim light
  g.setLineDash(ghost ? [5, 7] : [])
  g.strokeStyle = rgba(ghost ? color : COL.glow, ghost ? 0.55 : 0.85)
  g.lineWidth = ghost ? 1.6 : 1.8
  g.stroke(bodyP)
  g.stroke(starP)
  // arms
  for (const side of [-1, 1]) {
    const r = side === -1 ? reach2 : reach
    const tg = side === -1 ? target2 : target
    const pts = armPts(f, x, side, r, tg)
    const ap = poly(pts, false)
    if (!ghost) {
      g.shadowColor = rgba(color, 0.9)
      g.shadowBlur = 14
      g.strokeStyle = rgba(color, 0.7)
      g.lineWidth = h * 0.026
      g.stroke(ap)
      g.shadowBlur = 0
    }
    g.strokeStyle = rgba(ghost ? color : COL.glow, ghost ? 0.5 : 0.9)
    g.lineWidth = ghost ? 1.5 : h * 0.01
    g.stroke(ap)
    f[side === 1 ? 'handR' : 'handL'] = pts[pts.length - 1]
  }
  g.setLineDash([])
  g.restore()
  return f
}

function orb(g, x, y, r, color, { a = 1, core = '#ffffff', halo = 1.9 } = {}) {
  g.save()
  g.globalAlpha *= a
  g.globalCompositeOperation = 'lighter'
  const h = g.createRadialGradient(x, y, 0, x, y, r * halo * 1.6)
  h.addColorStop(0, rgba(color, 0.55))
  h.addColorStop(0.35, rgba(color, 0.18))
  h.addColorStop(1, rgba(color, 0))
  g.fillStyle = h
  g.beginPath()
  g.arc(x, y, r * halo * 1.6, 0, TAU)
  g.fill()
  const b = g.createRadialGradient(x - r * 0.3, y - r * 0.35, 0, x, y, r)
  b.addColorStop(0, rgba(core, 0.95))
  b.addColorStop(0.55, rgba(color, 0.85))
  b.addColorStop(1, rgba(color, 0.35))
  g.fillStyle = b
  g.beginPath()
  g.arc(x, y, r, 0, TAU)
  g.fill()
  g.restore()
}

function floorGlow(g, x, y, rx, color, a = 1) {
  g.save()
  g.globalCompositeOperation = 'lighter'
  g.translate(x, y)
  g.scale(1, 0.18)
  const gr = g.createRadialGradient(0, 0, 0, 0, 0, rx)
  gr.addColorStop(0, rgba(color, 0.6 * a))
  gr.addColorStop(0.5, rgba(color, 0.18 * a))
  gr.addColorStop(1, rgba(color, 0))
  g.fillStyle = gr
  g.beginPath()
  g.arc(0, 0, rx, 0, TAU)
  g.fill()
  g.restore()
}

function glowLine(g, pts, color, { w = 2, blur = 16, a = 1, dash } = {}) {
  g.save()
  g.globalAlpha *= a
  g.globalCompositeOperation = 'lighter'
  g.lineCap = 'round'
  g.lineJoin = 'round'
  if (dash) g.setLineDash(dash)
  const p = poly(pts, false)
  g.shadowColor = color
  g.shadowBlur = blur
  g.strokeStyle = rgba(color, 0.75)
  g.lineWidth = w * 2.2
  g.stroke(p)
  g.shadowBlur = 0
  g.strokeStyle = rgba(COL.glow, 0.95)
  g.lineWidth = w
  g.stroke(p)
  g.restore()
}

// floating dust that drifts upward and twinkles
function dust(g, seed, n, color, t, { y0 = 0, y1 = AH, speed = 8, size = 1.6 } = {}) {
  const r = rng(seed)
  g.save()
  g.globalCompositeOperation = 'lighter'
  for (let i = 0; i < n; i++) {
    const x = r() * AW, yy = y0 + r() * (y1 - y0), ph = r() * TAU, s = size * (0.4 + r())
    const y = y0 + ((yy - y0 - t * speed * (0.5 + r())) % (y1 - y0) + (y1 - y0)) % (y1 - y0)
    const a = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * (1 + r() * 2) + ph))
    g.fillStyle = rgba(color, a * 0.85)
    g.beginPath()
    g.arc(x + Math.sin(t * 0.6 + ph) * 3, y, s, 0, TAU)
    g.fill()
  }
  g.restore()
}

function mono(g, str, x, y, { size = 17, color = COL.bone, a = 0.75, align = 'center', spacing = 4 } = {}) {
  g.save()
  g.globalAlpha *= a
  g.font = `700 ${size}px "Space Mono"`
  g.letterSpacing = `${spacing}px`
  g.textAlign = align
  g.textBaseline = 'middle'
  g.fillStyle = color
  g.fillText(str, x, y)
  g.restore()
}

// the sky behind every card, cached per art
const SKIES = {}
function sky(key, tint) {
  if (SKIES[key]) return SKIES[key]
  const c = layer(AW, AH)
  const g = c.getContext('2d')
  const r = rng(hash(key))
  const gr = g.createRadialGradient(AW * 0.5, AH * 0.42, 20, AW * 0.5, AH * 0.5, AH * 0.8)
  gr.addColorStop(0, '#1e1550')
  gr.addColorStop(0.55, '#110b33')
  gr.addColorStop(1, '#070420')
  g.fillStyle = gr
  g.fillRect(0, 0, AW, AH)
  for (let i = 0; i < 4; i++) {
    const x = r() * AW, y = r() * AH, s = 120 + r() * 160
    const h = g.createRadialGradient(x, y, 0, x, y, s)
    h.addColorStop(0, rgba(tint, 0.1))
    h.addColorStop(1, rgba(tint, 0))
    g.fillStyle = h
    g.fillRect(0, 0, AW, AH)
  }
  for (let i = 0; i < 140; i++) {
    g.fillStyle = rgba(COL.bone, 0.08 + r() * 0.4)
    g.beginPath()
    g.arc(r() * AW, r() * AH, 0.4 + r() * 1.1, 0, TAU)
    g.fill()
  }
  // fine grain, so the glow reads like a print
  const d = g.getImageData(0, 0, AW, AH)
  for (let p = 0; p < d.data.length; p += 4) {
    const n = (r() - 0.5) * 14
    d.data[p] += n
    d.data[p + 1] += n
    d.data[p + 2] += n
  }
  g.putImageData(d, 0, 0)
  return (SKIES[key] = c)
}

// ---------- the arts: one per word ----------
// Each draws into a card-sized canvas (AW × AH) at time t.

const ARTS = {}
const cx = AW / 2

// Chemistry: two figures reaching, a spark crackling between their hands
ARTS.spark = (g, t) => {
  g.drawImage(sky('spark', COL.rose), 0, 0)
  dust(g, 3, 40, COL.gold, t, { speed: 10 })
  floorGlow(g, 112, 438, 120, COL.gold)
  floorGlow(g, 300, 438, 120, COL.rose)
  const a = glowFigure(g, 112, 440, 300, COL.gold, { reach: 1, target: [176, 300] })
  const b = glowFigure(g, 300, 440, 300, COL.rose, { reach2: 1, target2: [236, 300] })
  const p0 = a.handR, p1 = b.handL
  // the bolt: re-jagged twelve times a second
  const r = rng(Math.floor(t * 12) + 7)
  for (let k = 0; k < 2; k++) {
    const pts = [p0]
    const n = 7
    for (let i = 1; i < n; i++) pts.push([lerp(p0[0], p1[0], i / n), lerp(p0[1], p1[1], i / n) + (r() - 0.5) * 34])
    pts.push(p1)
    glowLine(g, pts, k ? COL.gold : COL.rose, { w: k ? 1.2 : 2.4, blur: 22, a: k ? 0.7 : 1 })
  }
  orb(g, (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2, 9 + 3 * Math.sin(t * 17), '#ffd0e0', { halo: 3 })
  // sparks flying out
  g.save()
  g.globalCompositeOperation = 'lighter'
  const rs = rng(11)
  for (let i = 0; i < 18; i++) {
    const ph = (t * (0.9 + rs()) + rs()) % 1
    const ang = rs() * TAU, sp = 40 + rs() * 70
    const x = (p0[0] + p1[0]) / 2 + Math.cos(ang) * sp * ph, y = (p0[1] + p1[1]) / 2 + Math.sin(ang) * sp * ph + ph * ph * 30
    g.fillStyle = rgba(i % 2 ? COL.gold : '#ffd0e0', (1 - ph) * 0.9)
    g.beginPath()
    g.arc(x, y, 2.2 * (1 - ph) + 0.5, 0, TAU)
    g.fill()
  }
  g.restore()
}

// Compatibility: two figures hand in hand on a long road toward the dawn
ARTS.road = (g, t) => {
  g.drawImage(sky('road', COL.gold), 0, 0)
  const hy = 268
  // dawn
  g.save()
  g.globalCompositeOperation = 'lighter'
  const dg = g.createRadialGradient(cx, hy, 0, cx, hy, 260)
  dg.addColorStop(0, rgba(COL.gold, 0.55 + 0.05 * Math.sin(t * 1.3)))
  dg.addColorStop(0.3, rgba(COL.rose, 0.2))
  dg.addColorStop(1, rgba(COL.rose, 0))
  g.fillStyle = dg
  g.fillRect(0, 0, AW, AH)
  g.restore()
  orb(g, cx, hy, 30, COL.gold, { halo: 2.4 })
  // the land below the horizon
  g.fillStyle = '#0a0624'
  g.fillRect(0, hy, AW, AH - hy)
  glowLine(g, [[0, hy], [AW, hy]], COL.gold, { w: 1.4, blur: 12 })
  // hills
  g.save()
  g.fillStyle = '#0c0829'
  g.beginPath()
  g.moveTo(0, hy)
  for (let x = 0; x <= AW; x += 8) g.lineTo(x, hy - 18 - 14 * Math.sin(x / 47) - 9 * Math.sin(x / 19 + 1))
  g.lineTo(AW, hy)
  g.closePath()
  g.fill()
  g.restore()
  // the road, with a dashed centre line running toward you
  glowLine(g, [[cx - 6, hy], [-30, AH]], COL.gold, { w: 1.6, blur: 10, a: 0.9 })
  glowLine(g, [[cx + 6, hy], [AW + 30, AH]], COL.gold, { w: 1.6, blur: 10, a: 0.9 })
  g.save()
  g.globalCompositeOperation = 'lighter'
  for (let i = 0; i < 9; i++) {
    const k = ((i / 9 + t * 0.08) % 1)
    const kk = k * k
    const y = hy + (AH - hy) * kk, len = 4 + 34 * kk
    g.strokeStyle = rgba(COL.glow, 0.25 + 0.6 * k)
    g.lineWidth = 1 + 3 * kk
    g.beginPath()
    g.moveTo(cx, y)
    g.lineTo(cx, Math.min(AH, y + len))
    g.stroke()
  }
  g.restore()
  // the two of them, small, holding hands
  floorGlow(g, cx, 452, 110, COL.gold, 0.8)
  glowFigure(g, cx - 34, 455, 190, COL.gold, { reach: 1, target: [cx, 352] })
  glowFigure(g, cx + 34, 455, 190, '#ffc98a', { reach2: 1, target2: [cx, 352] })
  dust(g, 5, 24, COL.gold, t, { y0: 0, y1: hy, speed: 3 })
}

// Love: two figures close, one steady halo around both
ARTS.halo = (g, t) => {
  g.drawImage(sky('halo', COL.gold), 0, 0)
  dust(g, 8, 46, COL.gold, t, { speed: 6 })
  const br = 0.5 + 0.5 * Math.sin(t * 1.2)
  g.save()
  g.globalCompositeOperation = 'lighter'
  const hg = g.createRadialGradient(cx, 290, 120, cx, 290, 215)
  hg.addColorStop(0, rgba(COL.gold, 0))
  hg.addColorStop(0.78, rgba(COL.gold, 0.16 + 0.08 * br))
  hg.addColorStop(0.86, rgba(COL.glow, 0.5 + 0.15 * br))
  hg.addColorStop(0.94, rgba(COL.gold, 0.14))
  hg.addColorStop(1, rgba(COL.gold, 0))
  g.fillStyle = hg
  g.fillRect(0, 0, AW, AH)
  g.restore()
  floorGlow(g, cx, 450, 160, COL.gold)
  glowFigure(g, cx - 52, 452, 290, COL.gold, { reach: 1, target: [cx, 312] })
  glowFigure(g, cx + 52, 452, 290, '#ffd98a', { reach2: 1, target2: [cx, 312] })
  orb(g, cx, 312, 5, COL.glow, { halo: 3 })
}

// Limerence: one figure lit by a phone, thoughts spinning round its head,
// the other person far off and faint
ARTS.limerence = (g, t) => {
  g.drawImage(sky('limerence', COL.lilac), 0, 0)
  dust(g, 12, 26, COL.lilac2, t, { speed: 5 })
  // the one they're thinking about: distant, dashed
  glowFigure(g, 330, 214, 104, COL.lilac2, { ghost: true, a: 0.55 + 0.25 * Math.sin(t * 2.3) })
  floorGlow(g, 150, 462, 130, COL.lilac)
  const f = glowFigure(g, 150, 464, 320, COL.lilac, { reach: 1, reach2: 1, target: [168, 330], target2: [132, 330], core: 0.8 })
  // the phone: a bright little screen, a thread to the far figure that flickers
  const ph = [150, 322]
  g.save()
  g.globalCompositeOperation = 'lighter'
  g.shadowColor = COL.blue
  g.shadowBlur = 26
  g.fillStyle = rgba('#e8f2ff', 0.95)
  g.beginPath()
  g.roundRect(ph[0] - 14, ph[1] - 22, 28, 40, 5)
  g.fill()
  g.restore()
  const fl = 0.35 + 0.5 * Math.abs(Math.sin(t * 3.1)) * (Math.sin(t * 11) > -0.4 ? 1 : 0.2)
  glowLine(g, bez(ph, [220, 260], [270, 150], [322, 158], 24), COL.lilac2, { w: 1.2, blur: 10, a: fl, dash: [4, 9] })
  // thoughts circling the head, fast
  const [hx, hy] = f.head
  g.save()
  g.globalCompositeOperation = 'lighter'
  for (let i = 0; i < 14; i++) {
    const ang = t * 2.6 + (i / 14) * TAU
    const x = hx + Math.cos(ang) * 78, y = hy - 10 + Math.sin(ang) * 26
    const front = Math.sin(ang) > 0
    g.fillStyle = rgba(i % 3 ? COL.lilac2 : COL.rose, front ? 0.95 : 0.4)
    g.beginPath()
    g.arc(x, y, front ? 3.4 : 2, 0, TAU)
    g.fill()
  }
  g.restore()
  mono(g, 'TYPING...', 150, 494, { size: 16, color: COL.lilac2, a: 0.5 + 0.4 * Math.sin(t * 4) })
}

// Your type: three figures that look exactly alike
ARTS.lineup = (g, t) => {
  g.drawImage(sky('lineup', COL.rose), 0, 0)
  dust(g, 14, 30, COL.rose, t, { speed: 6 })
  const xs = [76, cx, AW - 76]
  for (const [i, x] of xs.entries()) {
    const a = 0.8 + 0.2 * Math.sin(t * 1.5 + i * 2.1)
    floorGlow(g, x, 430, 90, COL.rose, a)
    glowFigure(g, x, 432, 250, '#ff8fb1', { a })
    // the same little heart over every head
    heart(g, x, 432 - 250 * 0.8 - 64 - 4 * Math.sin(t * 3 + i), 11, COL.rose, a)
  }
  // a dashed bracket under them: same, same, same
  glowLine(g, [[40, 468], [40, 478], [AW - 40, 478], [AW - 40, 468]], COL.rose, { w: 1.2, blur: 8, dash: [5, 7], a: 0.7 })
  mono(g, 'SAME · SAME · SAME', cx, 500, { size: 16, color: '#ffc2d4' })
}

function heart(g, x, y, s, color, a = 1) {
  g.save()
  g.globalAlpha *= a
  g.globalCompositeOperation = 'lighter'
  g.translate(x, y)
  g.shadowColor = color
  g.shadowBlur = 14
  g.fillStyle = rgba('#ffd6e3', 0.95)
  g.beginPath()
  g.moveTo(0, s * 0.9)
  g.bezierCurveTo(-s * 1.6, -s * 0.1, -s * 0.7, -s * 1.3, 0, -s * 0.45)
  g.bezierCurveTo(s * 0.7, -s * 1.3, s * 1.6, -s * 0.1, 0, s * 0.9)
  g.fill()
  g.restore()
}

// Your pattern: a path that keeps looping back on itself, a light running it
ARTS.loop = (g, t) => {
  g.drawImage(sky('loop', COL.mint), 0, 0)
  dust(g, 15, 24, COL.mint, t, { speed: 5 })
  // a prolate cycloid: three loops left to right
  const P = (u) => {
    const a = 17.5, b = 50
    return [36 + a * u - b * Math.sin(u), 200 - b * Math.cos(u) * 0.95]
  }
  const U = 6 * Math.PI
  const pts = []
  for (let i = 0; i <= 240; i++) pts.push(P((i / 240) * U))
  // shift so it's centred
  const xs = pts.map((p) => p[0])
  const off = (AW - (Math.max(...xs) + Math.min(...xs))) / 2
  const sp = pts.map(([x, y]) => [x + off, y])
  glowLine(g, sp, COL.mint, { w: 1.4, blur: 10, a: 0.55, dash: [6, 8] })
  // the runner and its trail
  const k = (t * 0.16) % 1
  const n = sp.length - 1
  const head = Math.floor(k * n)
  const trail = sp.slice(Math.max(0, head - 34), head + 1)
  if (trail.length > 1) glowLine(g, trail, COL.mint, { w: 2.6, blur: 18 })
  orb(g, sp[head][0], sp[head][1], 7, '#c9ffe9', { halo: 2.6 })
  // the loop counter
  const loopN = Math.min(3, Math.floor(k * 3) + 1)
  mono(g, `AGAIN · ${['ONE', 'TWO', 'THREE'][loopN - 1]}`, cx, 314, { size: 17, color: COL.mint })
  floorGlow(g, cx, 470, 120, COL.mint, 0.7)
  glowFigure(g, cx, 472, 130, COL.mint, { a: 0.9 })
}

// Attraction: light pours from one figure toward the other, who doesn't turn
ARTS.beam = (g, t) => {
  g.drawImage(sky('beam', COL.gold), 0, 0)
  dust(g, 16, 22, COL.gold, t, { speed: 5 })
  floorGlow(g, 104, 440, 120, COL.gold)
  const a = glowFigure(g, 104, 442, 300, COL.gold, { reach: 1, target: [196, 300] })
  glowFigure(g, 316, 442, 270, COL.lilac2, { ghost: true, a: 0.7 })
  // a stream of hearts and motes, one way only
  const from = a.handR, to = [300, 232]
  for (let i = 0; i < 9; i++) {
    const k = ((t * 0.45 + i / 9) % 1)
    const x = lerp(from[0], to[0], k), y = lerp(from[1], to[1], k) - Math.sin(k * Math.PI) * 30
    if (i % 3 === 0) heart(g, x, y, 7 * (1 - k * 0.5), COL.gold, 1 - k * 0.8)
    else orb(g, x, y, 3, COL.gold, { a: 1 - k * 0.7, halo: 2 })
  }
  mono(g, '→  ONE WAY', 206, 494, { size: 17, color: COL.gold })
}

// Alignment: two figures, both lit, their star heads on one straight line
ARTS.align = (g, t) => {
  g.drawImage(sky('align', COL.gold), 0, 0)
  dust(g, 17, 36, COL.gold, t, { speed: 5 })
  const hy = 442 - 280 * 0.8
  const pulse = 0.65 + 0.35 * Math.sin(t * 2.2)
  glowLine(g, [[-10, hy], [AW + 10, hy]], COL.gold, { w: 1.6, blur: 18, a: pulse })
  floorGlow(g, 104, 440, 120, COL.gold)
  floorGlow(g, 308, 440, 120, COL.gold)
  glowFigure(g, 104, 442, 280, COL.gold)
  glowFigure(g, 308, 442, 280, COL.gold)
  // the line passes through a sun, a planet and a moon, all in a row
  orb(g, cx, hy, 13, '#ffe7a8', { halo: 3 })
  orb(g, 30, hy, 6, COL.bone, { halo: 2 })
  orb(g, AW - 30, hy, 6, COL.bone, { halo: 2 })
  // a flare crossing the line now and then
  const fk = (t * 0.35) % 1
  orb(g, lerp(-20, AW + 20, fk), hy, 4, COL.glow, { halo: 4, a: Math.sin(fk * Math.PI) })
  mono(g, 'BOTH · AT ONCE', cx, 494, { size: 17, color: COL.gold })
}

// Sun sign: a big sun, a figure standing in its light
ARTS.sun = (g, t) => {
  g.drawImage(sky('sun', COL.gold), 0, 0)
  const s = [cx, 168]
  g.save()
  g.globalCompositeOperation = 'lighter'
  // the light cone
  const cg = g.createLinearGradient(0, s[1], 0, 470)
  cg.addColorStop(0, rgba(COL.gold, 0.3))
  cg.addColorStop(1, rgba(COL.gold, 0.02))
  g.fillStyle = cg
  g.beginPath()
  g.moveTo(s[0] - 40, s[1])
  g.lineTo(s[0] + 40, s[1])
  g.lineTo(s[0] + 150, 470)
  g.lineTo(s[0] - 150, 470)
  g.closePath()
  g.fill()
  // rays, turning slowly
  for (let i = 0; i < 24; i++) {
    const ang = (i / 24) * TAU + t * 0.12
    const r0 = 92, r1 = 92 + (i % 2 ? 26 : 46)
    g.strokeStyle = rgba(COL.gold, 0.55)
    g.lineWidth = 2.4
    g.beginPath()
    g.moveTo(s[0] + Math.cos(ang) * r0, s[1] + Math.sin(ang) * r0)
    g.lineTo(s[0] + Math.cos(ang) * r1, s[1] + Math.sin(ang) * r1)
    g.stroke()
  }
  g.restore()
  orb(g, s[0], s[1], 74, '#ffc94a', { core: '#fffbe8', halo: 1.7 })
  glyph(g, '☉', s[0], s[1] + 34, 96, rgba('#7a4a00', 0.55))
  dust(g, 18, 30, COL.gold, t, { speed: 4, y0: 260 })
  floorGlow(g, cx, 466, 150, COL.gold)
  glowFigure(g, cx, 468, 220, COL.gold)
}

// Rising sign: a sign coming up over the eastern horizon
ARTS.rising = (g, t) => {
  g.drawImage(sky('rising', COL.rose), 0, 0)
  const hy = 356
  const rise = 40 + 26 * ((t * 0.08) % 1)
  // dawn on the east (left) edge
  g.save()
  g.globalCompositeOperation = 'lighter'
  const dg = g.createRadialGradient(70, hy, 0, 70, hy, 300)
  dg.addColorStop(0, rgba(COL.rose, 0.5))
  dg.addColorStop(0.4, rgba(COL.lilac, 0.2))
  dg.addColorStop(1, rgba(COL.lilac, 0))
  g.fillStyle = dg
  g.fillRect(0, 0, AW, AH)
  g.restore()
  // the rising sign
  g.save()
  g.beginPath()
  g.rect(0, 0, AW, hy)
  g.clip()
  orb(g, 84, hy - rise, 44, '#ff9fc0', { halo: 2 })
  glyph(g, '♌', 84, hy - rise + 20, 60, rgba('#5a1030', 0.6))
  // an arc showing it climbing
  glowLine(g, bez([60, hy + 40], [70, hy - 60], [120, hy - 160], [210, hy - 220], 30), COL.rose, { w: 1.2, blur: 8, dash: [4, 8], a: 0.7 })
  g.restore()
  // the earth's curve
  g.fillStyle = '#0a0624'
  g.beginPath()
  g.moveTo(0, AH)
  g.lineTo(0, hy)
  g.quadraticCurveTo(cx, hy - 26, AW, hy)
  g.lineTo(AW, AH)
  g.closePath()
  g.fill()
  glowLine(g, bez([0, hy], [cx * 0.66, hy - 17], [cx * 1.33, hy - 17], [AW, hy], 30), COL.rose, { w: 1.4, blur: 12 })
  floorGlow(g, 280, hy - 12, 70, COL.rose, 0.7)
  glowFigure(g, 280, hy - 10, 150, '#ffb3cc')
  mono(g, '← EAST', 60, hy + 40, { size: 15, color: '#ffc2d4', align: 'left' })
  mono(g, 'THE MINUTE YOU WERE BORN', cx, 470, { size: 14, color: '#ffc2d4', a: 0.6, spacing: 3 })
  dust(g, 19, 22, COL.rose, t, { speed: 3, y1: hy })
}

// halftone shading over a planet
function halftone(g, x, y, r, color, light = [-0.5, -0.55]) {
  g.save()
  g.globalCompositeOperation = 'lighter'
  g.fillStyle = color
  const pitch = 7.5
  for (let yy = -r; yy <= r; yy += pitch) for (let xx = -r; xx <= r; xx += pitch) {
    const d = Math.hypot(xx, yy) / r
    if (d > 1) continue
    const lit = clamp(0.55 - (xx / r) * light[0] * 0.9 - (yy / r) * light[1] * 0.9 - d * 0.3)
    const rr = pitch * 0.48 * lit
    if (rr < 0.4) continue
    g.beginPath()
    g.arc(x + xx, y + yy, rr, 0, TAU)
    g.fill()
  }
  g.restore()
}

function planet(g, t, key, color, ch, moons = 0) {
  g.drawImage(sky(key, color), 0, 0)
  dust(g, hash(key), 30, color, t, { speed: 4 })
  const p = [cx, 196], r = 104
  orb(g, p[0], p[1], r, color, { core: '#fff3ec', halo: 1.5, a: 0.55 })
  halftone(g, p[0], p[1], r, rgba(COL.glow, 0.9))
  glowLine(g, Array.from({ length: 61 }, (_, i) => [p[0] + Math.cos((i / 60) * TAU) * r, p[1] + Math.sin((i / 60) * TAU) * r]), color, { w: 1.4, blur: 14 })
  for (let m = 0; m < moons; m++) {
    const ang = t * (1.4 - m * 0.6) + m * 2
    const rx = r + 34 + m * 26
    const mx = p[0] + Math.cos(ang) * rx, my = p[1] + Math.sin(ang) * rx * 0.32
    orb(g, mx, my, 5 - m, COL.bone, { halo: 2, a: Math.sin(ang) > -0.2 || Math.abs(Math.cos(ang)) > 0.9 ? 1 : 0.25 })
  }
  const gy = 418 + 4 * Math.sin(t * 1.6)
  glyph(g, ch, cx, gy, 132, color, { glow: 30 })
  glyph(g, ch, cx, gy, 132, rgba(COL.glow, 0.92))
}
ARTS.venus = (g, t) => planet(g, t, 'venus', COL.venus, '♀')
ARTS.mars = (g, t) => planet(g, t, 'mars', COL.mars, '♂', 2)

const SIGN_GLYPHS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']

// Horoscope: twelve rows of the same short text, one sign lit
ARTS.horoscope = (g, t) => {
  g.drawImage(sky('horoscope', COL.lilac2), 0, 0)
  mono(g, 'DAILY HOROSCOPE', cx, 42, { size: 15, color: COL.bone, a: 0.85 })
  glowLine(g, [[40, 62], [AW - 40, 62]], COL.lilac2, { w: 1, blur: 6, a: 0.6 })
  const lit = Math.floor(t / 1.1) % 12
  for (let i = 0; i < 12; i++) {
    const y = 92 + i * 34.5
    const on = i === lit
    const col = on ? COL.gold : COL.lilac2
    glyph(g, SIGN_GLYPHS[i], 56, y + 9, 26, rgba(col, on ? 1 : 0.7), { glow: on ? 16 : 0 })
    g.save()
    g.globalCompositeOperation = 'lighter'
    g.fillStyle = rgba(col, on ? 0.85 : 0.32)
    // the same three bars on every row
    g.beginPath()
    g.roundRect(84, y - 6, 210, 7, 3.5)
    g.roundRect(84, y + 6, 150, 7, 3.5)
    g.roundRect(240, y + 6, 70, 7, 3.5)
    g.fill()
    g.restore()
  }
  mono(g, '1 IN 12 GET THIS ONE', cx, 500, { size: 15, color: COL.lilac2, a: 0.65, spacing: 3 })
}

// Birth chart: a full wheel, planets in their places, the lines between them
ARTS.chart = (g, t) => {
  g.drawImage(sky('chart', COL.gold), 0, 0)
  dust(g, 21, 20, COL.gold, t, { speed: 3 })
  const c = [cx, 250], R = 178, r1 = 140, r2 = 64
  const ring = (r, a = 1, w = 1.4) => glowLine(g, Array.from({ length: 97 }, (_, i) => [c[0] + Math.cos((i / 96) * TAU) * r, c[1] + Math.sin((i / 96) * TAU) * r]), COL.gold, { w, blur: 10, a })
  ring(R)
  ring(r1, 0.8)
  ring(r2, 0.5, 1)
  const asc = 0.35
  for (let i = 0; i < 12; i++) {
    const a = Math.PI + asc - (i / 12) * TAU
    glowLine(g, [[c[0] + Math.cos(a) * r2, c[1] + Math.sin(a) * r2], [c[0] + Math.cos(a) * R, c[1] + Math.sin(a) * R]], COL.gold, { w: i % 3 ? 0.8 : 1.4, blur: 6, a: i % 3 ? 0.4 : 0.8 })
    const m = a - TAU / 24
    glyph(g, SIGN_GLYPHS[i], c[0] + Math.cos(m) * (R + r1) / 2, c[1] + Math.sin(m) * (R + r1) / 2 + 8, 22, rgba(COL.bone, 0.8))
  }
  // planets (fixed: one sky, one minute)
  const PL = [['☉', 0.6, COL.gold], ['☽', 2.2, COL.bone], ['♀', 1.0, COL.venus], ['♂', 3.9, COL.mars], ['☿', 0.35, COL.mint], ['♃', 4.9, COL.lilac2], ['♄', 5.6, COL.blue]]
  const pos = PL.map(([, a]) => [c[0] + Math.cos(a) * 108, c[1] + Math.sin(a) * 108])
  // aspect lines
  for (const [i, j, col] of [[0, 3, COL.rose], [2, 5, COL.mint], [1, 6, COL.lilac2], [0, 5, COL.gold], [3, 6, COL.rose]]) {
    glowLine(g, [[c[0] + Math.cos(PL[i][1]) * r2, c[1] + Math.sin(PL[i][1]) * r2], [c[0] + Math.cos(PL[j][1]) * r2, c[1] + Math.sin(PL[j][1]) * r2]], col, { w: 1, blur: 8, a: 0.55 + 0.3 * Math.sin(t * 1.4 + i) })
  }
  for (const [k, [ch, , col]] of PL.entries()) {
    orb(g, pos[k][0], pos[k][1], 11, col, { halo: 1.8, a: 0.7 })
    glyph(g, ch, pos[k][0], pos[k][1] + 7, 20, rgba('#140a2e', 0.85))
  }
  mono(g, 'ASC', c[0] + Math.cos(Math.PI + asc) * (r2 + 26), c[1] + Math.sin(Math.PI + asc) * (r2 + 26) - 12, { size: 13, color: COL.gold, spacing: 2 })
  mono(g, 'YOUR EXACT MINUTE + PLACE', cx, 486, { size: 14, color: COL.gold, a: 0.7, spacing: 3 })
}

// Sign: twelve equal slices of the year, the sun moving round
ARTS.slices = (g, t) => {
  g.drawImage(sky('slices', COL.mint), 0, 0)
  const c = [cx, 244], R = 180
  for (let i = 0; i < 12; i++) {
    const a0 = -Math.PI / 2 + (i / 12) * TAU, a1 = a0 + TAU / 12
    g.save()
    g.globalCompositeOperation = 'lighter'
    g.fillStyle = rgba(i % 2 ? COL.mint : COL.lilac2, 0.1)
    g.beginPath()
    g.moveTo(c[0], c[1])
    g.arc(c[0], c[1], R, a0, a1)
    g.closePath()
    g.fill()
    g.restore()
    glowLine(g, [c, [c[0] + Math.cos(a0) * R, c[1] + Math.sin(a0) * R]], COL.mint, { w: 1.1, blur: 8, a: 0.8 })
    const m = (a0 + a1) / 2
    glyph(g, SIGN_GLYPHS[i], c[0] + Math.cos(m) * 132, c[1] + Math.sin(m) * 132 + 9, 26, rgba(COL.bone, 0.85))
  }
  glowLine(g, Array.from({ length: 97 }, (_, i) => [c[0] + Math.cos((i / 96) * TAU) * R, c[1] + Math.sin((i / 96) * TAU) * R]), COL.mint, { w: 1.6, blur: 12 })
  // one slice marked 30°
  const a0 = -Math.PI / 2
  glowLine(g, Array.from({ length: 13 }, (_, i) => [c[0] + Math.cos(a0 + (i / 12) * (TAU / 12)) * 58, c[1] + Math.sin(a0 + (i / 12) * (TAU / 12)) * 58]), COL.gold, { w: 1.4, blur: 8 })
  mono(g, '30°', c[0] + 52, c[1] - 74, { size: 14, color: COL.gold })
  // the sun travelling the year
  const sa = -Math.PI / 2 + t * 0.3
  orb(g, c[0] + Math.cos(sa) * (R + 2), c[1] + Math.sin(sa) * (R + 2), 10, COL.gold, { halo: 2.6 })
  orb(g, c[0], c[1], 6, COL.bone, { halo: 2 })
  mono(g, '12 × 30° · FROM THE EQUINOX', cx, 470, { size: 15, color: COL.mint, a: 0.8, spacing: 2 })
}

// Constellation: real star patterns, all different sizes, on the sun's path
ARTS.constellation = (g, t) => {
  g.drawImage(sky('constellation', COL.blue), 0, 0)
  const path = (x) => 250 + Math.sin(x / 70) * 40
  glowLine(g, Array.from({ length: 60 }, (_, i) => [(i / 59) * AW, path((i / 59) * AW)]), COL.gold, { w: 1, blur: 6, a: 0.55, dash: [3, 8] })
  const groups = [
    // small and tight
    [[40, 196], [62, 178], [80, 192], [70, 214]],
    // big and sprawling, with a hooked tail
    [[120, 230], [150, 196], [184, 214], [206, 262], [236, 300], [268, 316], [296, 304], [306, 276]],
    // medium
    [[318, 182], [348, 160], [380, 186], [360, 222]],
  ]
  groups.forEach((gp, k) => {
    glowLine(g, gp, COL.blue, { w: 1.1, blur: 8, a: 0.75 })
    gp.forEach(([x, y], i) => {
      const tw = 0.6 + 0.4 * Math.sin(t * (1.6 + i * 0.3) + k + i)
      orb(g, x, y, (i % 3 === 0 ? 4.5 : 2.8) * (0.8 + 0.3 * tw), '#dcecff', { halo: 2.4, a: tw })
    })
  })
  // the sun on its path
  const sx = ((t * 22) % (AW + 60)) - 30
  orb(g, sx, path(sx), 9, COL.gold, { halo: 2.6 })
  // the 13 crossings as ticks
  for (let i = 0; i < 13; i++) {
    const x = 18 + (i / 12) * (AW - 36)
    glowLine(g, [[x, 410], [x, 424]], i === 6 ? COL.gold : COL.blue, { w: 1.2, blur: 6, a: 0.8 })
  }
  mono(g, '13 ON THE SUN\'S PATH', cx, 452, { size: 16, color: '#cfe4ff' })
  dust(g, 23, 20, COL.blue, t, { speed: 3 })
}

// The back of an Align card: indigo, a gold border, Stardust's star
ARTS.back = (g, t) => {
  g.drawImage(sky('back', COL.lilac), 0, 0)
  g.save()
  g.strokeStyle = rgba(COL.gold, 0.8)
  g.lineWidth = 2
  g.beginPath()
  g.roundRect(16, 16, AW - 32, AH - 32, 12)
  g.stroke()
  g.strokeStyle = rgba(COL.gold, 0.35)
  g.lineWidth = 1
  g.beginPath()
  g.roundRect(26, 26, AW - 52, AH - 52, 8)
  g.stroke()
  g.restore()
  const c = [cx, 236]
  const st = chaikin(starPts(c[0], c[1], 92, 46), 2)
  g.save()
  g.globalCompositeOperation = 'lighter'
  g.shadowColor = COL.gold
  g.shadowBlur = 40 + 10 * Math.sin(t * 2)
  g.fillStyle = rgba(COL.gold, 0.35)
  g.fill(poly(st))
  g.shadowBlur = 0
  g.restore()
  halftoneStar(g, c, st)
  glowLine(g, [...st, st[0]], COL.gold, { w: 1.8, blur: 14 })
  g.save()
  g.font = 'italic 500 58px "EB Garamond"'
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.fillStyle = COL.bone
  g.shadowColor = rgba(COL.bone, 0.5)
  g.shadowBlur = 16
  g.fillText('Align', cx, 410)
  g.restore()
  mono(g, 'FLIPS WHEN IT\'S MUTUAL', cx, 458, { size: 14, color: COL.gold, a: 0.8, spacing: 3 })
  dust(g, 29, 24, COL.gold, t, { speed: 3 })
}
function halftoneStar(g, c, st) {
  const p = poly(st)
  g.save()
  g.clip(p)
  g.globalCompositeOperation = 'lighter'
  g.fillStyle = rgba('#ffe7a8', 0.9)
  for (let y = c[1] - 100; y < c[1] + 100; y += 8) for (let x = c[0] - 100; x < c[0] + 100; x += 8) {
    const d = Math.hypot(x - c[0] + 24, y - c[1] + 24) / 130
    const rr = 3.6 * clamp(1 - d)
    if (rr < 0.4) continue
    g.beginPath()
    g.arc(x, y, rr, 0, TAU)
    g.fill()
  }
  g.restore()
}

// ---------- paper ----------

let paper
function makePaper() {
  paper = layer(W, H)
  const g = paper.getContext('2d')
  g.fillStyle = COL.paper
  g.fillRect(0, 0, W, H)
  const r = rng(9)
  // the faintest lilac and gold in the corners
  for (const [x, y, c] of [[0, 0, COL.lilac2], [W, 260, '#ffe3a3'], [0, H, '#ffd0de'], [W, H, COL.lilac2]]) {
    const s = 700
    const h = g.createRadialGradient(x, y, 0, x, y, s)
    h.addColorStop(0, rgba(c, 0.22))
    h.addColorStop(1, rgba(c, 0))
    g.fillStyle = h
    g.fillRect(0, 0, W, H)
  }
  const d = g.getImageData(0, 0, W, H)
  for (let p = 0; p < d.data.length; p += 4) {
    const n = (r() - 0.5) * 6
    d.data[p] += n
    d.data[p + 1] += n
    d.data[p + 2] += n
  }
  g.putImageData(d, 0, 0)
}

// ---------- the reel's timeline ----------

let BEATS = [] // {kind, pair, start, at, end, lines}
let LINES = [] // {beat, start, end, words: [{w, em, s, e}], rows}
let PAIRS = []
let HOPS = []
let DURATION = 0
let HANDLE = ''
let PILL = null
const cards = [layer(AW, AH), layer(AW, AH)]

function beatAt(t) {
  for (let i = BEATS.length - 1; i >= 0; i--) if (t >= BEATS[i].start) return i
  return 0
}

const CAP_FONT = (size) => `700 ${size}px Poppins`
function layoutCaptions() {
  const { size, lh, maxW, y } = L.cap
  ctx.font = CAP_FONT(size)
  const space = ctx.measureText(' ').width
  // greedy wrap at a width; then shrink the width as far as it goes without
  // adding a row, so two-row captions come out balanced (no orphan words)
  const wrap = (words, mw) => {
    const rows = [[]]
    let w = 0
    for (const wd of words) {
      const need = (rows[rows.length - 1].length ? space : 0) + wd.width
      if (w + need > mw && rows[rows.length - 1].length) {
        rows.push([])
        w = 0
      }
      rows[rows.length - 1].push(wd)
      w += (rows[rows.length - 1].length > 1 ? space : 0) + wd.width
    }
    return rows
  }
  for (const ln of LINES) {
    for (const wd of ln.words) wd.width = ctx.measureText(wd.w).width
    let rows = wrap(ln.words, maxW)
    if (rows.length > 1) {
      let lo = 200, hi = maxW
      while (hi - lo > 4) {
        const mid = (lo + hi) / 2
        if (wrap(ln.words, mid).length > rows.length) lo = mid
        else hi = mid
      }
      rows = wrap(ln.words, hi)
    }
    const top = y - ((rows.length - 1) * lh) / 2
    rows.forEach((row, ri) => {
      const rw = row.reduce((s, wd) => s + wd.width, 0) + space * (row.length - 1)
      let x = CX - rw / 2
      for (const wd of row) {
        wd.x = x
        wd.y = top + ri * lh
        x += wd.width + space
      }
    })
  }
}

// ---------- painting ----------

function focusAt(t) {
  // −1: card A in focus, +1: card B, 0: both
  const target = (b) => (b.kind === 'a' ? -1 : b.kind === 'b' ? 1 : 0)
  const i = beatAt(t)
  const b = BEATS[i]
  const prev = i > 0 ? target(BEATS[i - 1]) : 0
  return lerp(prev, target(b), ease(clamp((t - b.start) / 0.42)))
}

// Which art each card shows, and how far through a flip it is.
function cardState(t, side) {
  const delay = side * 0.1
  let pair = 0
  let flip = null
  for (const b of BEATS) {
    const swap = b.kind === 'end' ? 'back' : b.kind === 'ask' && b.pair > 0 ? b.pair : null
    if (swap === null) continue
    const t0 = b.start + delay
    if (t >= t0 + 0.62) pair = swap
    else if (t >= t0) {
      const k = (t - t0) / 0.62
      flip = { k, from: pair, to: swap }
      break
    } else break
  }
  if (flip) return { art: flip.k < 0.5 ? flip.from : flip.to, sx: Math.abs(Math.cos(Math.PI * ease(flip.k))), k: flip.k }
  return { art: pair, sx: 1, k: null }
}

function drawCard(t, side) {
  const st = cardState(t, side)
  const f = focusAt(t)
  const me = side ? 1 : -1
  const focus = f * me // 1 = this card in focus, −1 = the other one is
  const scale = 1 + 0.045 * Math.max(0, focus) - 0.04 * Math.max(0, -focus)
  const dim = 0.36 * Math.max(0, -focus)
  const art = st.art === 'back' ? 'back' : PAIRS[st.art][side ? 'b' : 'a'].art
  const g = cards[side].getContext('2d')
  g.save()
  g.clearRect(0, 0, AW, AH)
  ARTS[art](g, t + side * 3.7)
  g.restore()
  const x = side ? L.bx : L.ax, y = L.top + L.ch / 2
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(scale * st.sx, scale)
  // the white frame, with a soft shadow
  ctx.shadowColor = 'rgba(27,18,54,0.16)'
  ctx.shadowBlur = 34
  ctx.shadowOffsetY = 12
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.roundRect(-L.cw / 2, -L.ch / 2, L.cw, L.ch, 22)
  ctx.fill()
  ctx.shadowColor = 'transparent'
  ctx.strokeStyle = 'rgba(27,18,54,0.08)'
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.save()
  ctx.beginPath()
  ctx.roundRect(-AW / 2, -AH / 2, AW, AH, 14)
  ctx.clip()
  ctx.drawImage(cards[side], -AW / 2, -AH / 2)
  if (dim > 0) {
    ctx.fillStyle = rgba(COL.paper, dim)
    ctx.fillRect(-AW / 2, -AH / 2, AW, AH)
  }
  ctx.restore()
  // a gold ring on the card being explained
  if (focus > 0.02) {
    ctx.strokeStyle = rgba(COL.goldDeep, 0.9 * focus)
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.roundRect(-L.cw / 2 - 9, -L.ch / 2 - 9, L.cw + 18, L.ch + 18, 28)
    ctx.stroke()
  }
  ctx.restore()

  // the label above, swapping as the card turns edge-on
  if (st.art !== 'back') {
    const text = PAIRS[st.art][side ? 'b' : 'a'].label
    const a = (st.k === null ? 1 : Math.abs(Math.cos(Math.PI * st.k))) * (1 - 0.6 * Math.max(0, -focus))
    let size = 66
    ctx.font = `700 ${size}px Poppins`
    while (ctx.measureText(text).width > 412 && size > 40) ctx.font = `700 ${--size}px Poppins`
    ctx.save()
    ctx.globalAlpha = a
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = COL.ink
    ctx.fillText(text, x, L.label - 10 * (1 - a) - 6 * Math.max(0, focus))
    ctx.restore()
  }
}

function drawCoin(t) {
  const b = BEATS[beatAt(t)]
  const diffK = b.kind === 'diff' ? ease(clamp((t - b.start) / 0.35)) : 0
  const endK = b.kind === 'end' ? ease(clamp((t - b.start) / 0.4)) : 0
  if (endK >= 1) return
  const x = CX, y = L.top + L.ch / 2
  const pulse = 1 + 0.06 * diffK * Math.sin(t * 6)
  ctx.save()
  ctx.globalAlpha = 1 - endK
  ctx.translate(x, y)
  ctx.scale(pulse, pulse)
  ctx.fillStyle = COL.ink
  ctx.strokeStyle = COL.paper
  ctx.lineWidth = 7
  ctx.beginPath()
  ctx.arc(0, 0, 44, 0, TAU)
  ctx.fill()
  ctx.stroke()
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.globalAlpha = (1 - endK) * (1 - diffK)
  ctx.font = '800 30px Poppins'
  ctx.fillStyle = COL.gold
  ctx.fillText('VS', 0, 2)
  // in the answer, VS becomes ≠
  ctx.globalAlpha = (1 - endK) * diffK
  ctx.strokeStyle = COL.gold
  ctx.lineWidth = 5.5
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(-15, -7)
  ctx.lineTo(15, -7)
  ctx.moveTo(-15, 8)
  ctx.lineTo(15, 8)
  ctx.moveTo(8, -19)
  ctx.lineTo(-8, 20)
  ctx.stroke()
  ctx.restore()
}

function currentLine(t) {
  for (let i = 0; i < LINES.length; i++) {
    const ln = LINES[i]
    const nx = LINES[i + 1]
    const b = BEATS[ln.beat]
    const until = nx && nx.beat === ln.beat ? nx.start - 0.06 : b.end - 0.05
    if (t >= ln.start - 0.14 && t < until) return ln
  }
  return null
}

function drawCaptions(t) {
  const ln = currentLine(t)
  const b = BEATS[beatAt(t)]
  if (!ln) {
    // gaps in a question beat show the format's question
    if (b.kind === 'ask') headline(t, 'What\'s the difference?', clamp((t - b.start) / 0.3))
    return
  }
  const { size } = L.cap
  ctx.save()
  ctx.font = CAP_FONT(size)
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'left'
  const pop = clamp((t - (ln.start - 0.14)) / 0.18)
  for (const wd of ln.words) {
    const said = t >= wd.s
    const k = clamp((t - wd.s) / 0.16)
    if (wd.em || wd.align) {
      // a gold highlighter swipe as the word is said
      const hk = easeOut(clamp((t - wd.s) / 0.28))
      if (hk > 0) {
        ctx.fillStyle = rgba(COL.gold, 0.7)
        ctx.beginPath()
        ctx.roundRect(wd.x - 8, wd.y - size * 0.06, (wd.width + 16) * hk, size * 0.52, 8)
        ctx.fill()
      }
    }
    ctx.globalAlpha = (said ? lerp(0.24, 1, k) : 0.24) * pop
    ctx.fillStyle = COL.ink
    ctx.fillText(wd.w, wd.x, wd.y - (said ? 0 : 0) + (1 - pop) * 10)
  }
  ctx.restore()
}

function headline(t, text, a) {
  ctx.save()
  ctx.globalAlpha = easeOut(a)
  ctx.font = '700 70px Poppins'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = COL.ink
  ctx.fillText(text, CX, L.cap.y)
  ctx.restore()
}

// pixel "?" and "!" for the mascot
const QM = ['.XXXX.', 'XX..XX', '....XX', '...XX.', '..XX..', '......', '..XX..']
const EX = ['..XX..', '..XX..', '..XX..', '..XX..', '..XX..', '......', '..XX..']
function pixelMark(bm, x, y, cell, color, a, rot = 0) {
  if (a <= 0) return
  ctx.save()
  ctx.globalAlpha = a
  ctx.translate(x, y)
  ctx.rotate(rot)
  const w = bm[0].length * cell, h = bm.length * cell
  const p = new Path2D()
  bm.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X') p.rect(-w / 2 + i * cell - 0.5, -h / 2 + j * cell - 0.5, cell + 1, cell + 1) }))
  ctx.save()
  ctx.translate(5, 5)
  ctx.fillStyle = 'rgba(27,18,54,0.85)'
  ctx.fill(p)
  ctx.restore()
  ctx.fillStyle = color
  ctx.fill(p)
  ctx.restore()
}

function drawMascot(t) {
  const bi = beatAt(t)
  const b = BEATS[bi]
  const { x, y, size } = L.star
  let mood = 'neutral', look = [0, 0]
  let tilt = 0
  if (b.kind === 'ask') {
    // the shrug: glancing from one card to the other, head tilting
    const side = Math.sin(t * 2.2) > 0 ? -1 : 1
    look = [side, -1]
    tilt = 0.13 * Math.sin(t * 2.2) * clamp((t - b.start) / 0.4)
  }
  else if (b.kind === 'a') look = [-1, -1]
  else if (b.kind === 'b') look = [1, -1]
  else if (b.kind === 'diff') mood = 'happy'
  else if (b.kind === 'end') mood = t > b.at + 1.2 ? 'heart' : 'happy'
  // a soft shadow on the paper
  ctx.save()
  ctx.fillStyle = 'rgba(27,18,54,0.10)'
  ctx.beginPath()
  ctx.ellipse(x, y + size * 0.47, size * 0.3, 16, 0, 0, TAU)
  ctx.fill()
  ctx.restore()
  ctx.save()
  ctx.translate(x, y + size * 0.4)
  ctx.rotate(tilt)
  ctx.translate(-x, -y - size * 0.4)
  drawStarChar(ctx, x, y, size, t, { color: STAR.sky, mood, look, hops: HOPS, seed: 3, glow: 0.35 })
  ctx.restore()
  // the shrug: a question mark either side, popping in with each question
  const qa = b.kind === 'ask' ? backOut(clamp((t - b.start - 0.1) / 0.35)) : 0
  const ea = b.kind === 'diff' ? backOut(clamp((t - b.start - 0.1) / 0.35)) : 0
  for (const s of [-1, 1]) {
    const bob = Math.sin(t * 4 + s) * 9
    const px = x + s * L.q.dx, py = L.q.y + bob
    if (qa > 0) pixelMark(QM, px, py, 11, COL.rose, clamp(qa), s * 0.16 + Math.sin(t * 3 + s) * 0.06)
    if (ea > 0) pixelMark(EX, px, py, 11, COL.goldDeep, clamp(ea), s * 0.12)
  }
}

function drawHeader(t) {
  ctx.save()
  ctx.font = 'italic 500 52px "EB Garamond"'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = rgba(COL.ink, 0.78)
  ctx.fillText('Align', CX, L.mark)
  ctx.restore()
  // progress: one dash per pair
  const b = BEATS[beatAt(t)]
  const cur = b.kind === 'end' ? PAIRS.length : b.pair
  const n = PAIRS.length, w = 58, gap = 14
  const x0 = CX - (n * w + (n - 1) * gap) / 2
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = i < cur ? rgba(COL.ink, 0.75) : i === cur ? COL.goldDeep : rgba(COL.ink, 0.13)
    ctx.beginPath()
    ctx.roundRect(x0 + i * (w + gap), L.dots - 5, w, 10, 5)
    ctx.fill()
  }
}

function drawHandle() {
  if (!HANDLE) return
  ctx.save()
  ctx.font = '500 28px Poppins'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = rgba(COL.ink, 0.38)
  ctx.fillText(HANDLE, L.handle.x, L.handle.y)
  ctx.restore()
}

function drawPill(t) {
  if (!PILL || t < PILL.at) return
  const k = clamp((t - PILL.at) / 0.5)
  const sc = backOut(k, 2.4)
  ctx.save()
  ctx.font = '700 30px Poppins'
  ctx.letterSpacing = '3px'
  const tw = ctx.measureText(PILL.text).width
  const w = tw + 130, h = 88, y = L.pill
  ctx.translate(CX, y)
  ctx.scale(sc, sc)
  ctx.globalAlpha = clamp(k * 2)
  ctx.shadowColor = 'rgba(27,18,54,0.25)'
  ctx.shadowBlur = 24
  ctx.shadowOffsetY = 8
  ctx.fillStyle = COL.ink
  ctx.beginPath()
  ctx.roundRect(-w / 2, -h / 2, w, h, h / 2)
  ctx.fill()
  ctx.shadowColor = 'transparent'
  // sheen
  ctx.save()
  ctx.clip()
  const sx = -w / 2 + (((t - PILL.at) * 700) % (w * 2.5)) - w * 0.3
  const sh = ctx.createLinearGradient(sx, 0, sx + 140, 0)
  sh.addColorStop(0, 'rgba(255,255,255,0)')
  sh.addColorStop(0.5, 'rgba(255,255,255,0.18)')
  sh.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = sh
  ctx.fillRect(-w / 2, -h / 2, w, h)
  ctx.restore()
  glyph(ctx, '✦', -w / 2 + 52, 11, 30, COL.gold)
  ctx.fillStyle = COL.bone
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillText(PILL.text, -w / 2 + 84, 2)
  ctx.restore()
}

function paint(t) {
  ctx.drawImage(paper, 0, 0)
  drawHeader(t)
  drawCard(t, 0)
  drawCard(t, 1)
  drawCoin(t)
  drawCaptions(t)
  drawMascot(t)
  drawPill(t)
  drawHandle()
}

// ---------- API ----------

window.setup = async (data) => {
  GLYPHS = data.glyphs
  for (const [family, src, style, weight] of data.fonts) {
    const f = new FontFace(family, `url(${src})`, { style, weight })
    await f.load()
    document.fonts.add(f)
  }
  await document.fonts.ready
  makePaper()
  const { script, timeline } = data
  PAIRS = script.pairs
  HANDLE = script.handle ?? ''
  BEATS = timeline.beats
  LINES = timeline.lines
  DURATION = timeline.duration
  // the star hops along as it talks: roughly every other word
  let last = -1e9, n = 0
  for (const ln of LINES) for (const wd of ln.words) {
    if (n++ % 2 === 0 && wd.s - last >= 0.34) { HOPS.push(wd.s); last = wd.s }
  }
  const end = BEATS[BEATS.length - 1]
  if (script.end?.pill) {
    const el = LINES.filter((l) => l.beat === BEATS.length - 1)
    PILL = { text: script.end.pill, at: el[el.length - 1].start + 0.2 }
  }
  void end
  layoutCaptions()
  return { duration: DURATION }
}

window.frame = (t, q = 0.9) => {
  paint(t)
  return canvas.toDataURL('image/jpeg', q)
}

// The grid cover: the first pair, the question, the shrug, the way the
// format's thumbnails look.
window.cover = (text, q = 0.92) => {
  const t = 2.2
  ctx.drawImage(paper, 0, 0)
  drawHeader(0)
  const saved = BEATS
  BEATS = [{ kind: 'ask', pair: 0, start: -10, at: -9, end: 1e9 }]
  drawCard(t, 0)
  drawCard(t, 1)
  drawCoin(t)
  headline(t, text, 1)
  drawMascot(t)
  drawHandle()
  BEATS = saved
  return canvas.toDataURL('image/jpeg', q)
}
