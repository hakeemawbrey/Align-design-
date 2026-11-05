// Align affirmation reels: the scene engine. Runs in a browser page.
// setup(data) builds every scene's line drawing, then frame(t) paints one
// frame at t seconds: indigo sky, gold-and-bone line art that draws itself
// in, captions that light up word by word with the voice, and a pearl pill
// for the comment call to action. Everything is drawn in code and seeded, so
// a script always renders the same video.

const W = 1080
const H = 1920
const CX = 540
const CY = 800
const FADE_OUT = 0.45

const canvas = document.getElementById('c')
canvas.width = W
canvas.height = H
const ctx = canvas.getContext('2d')

// Align's Stardust tokens (app/src/index.css).
const COL = {
  void: '#0b0620', canvas: '#140a2e', ink: '#efe6d6', gold: '#f2c75c', lilac: '#9a7be0',
  lilac2: '#c9b6f8', rose: '#e8628a', mint: '#7fd8b0', dim: '#7d6f94', chromeInk: '#3a2c4e',
}

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
const TAU = Math.PI * 2
function rgb(h) {
  const n = parseInt(h.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
const rgba = (h, a) => { const [r, g, b] = rgb(h); return `rgba(${r},${g},${b},${a})` }
function layer(w = W, h = H) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  return c
}

// ---------- geometry ----------

function arcPts(cx, cy, r, a0, a1, step = 7) {
  const n = Math.max(8, Math.ceil((Math.abs(a1 - a0) * r) / step))
  const out = []
  for (let i = 0; i <= n; i++) {
    const a = a0 + ((a1 - a0) * i) / n
    out.push([cx + r * Math.cos(a), cy + r * Math.sin(a)])
  }
  return out
}
function ellPts(cx, cy, rx, ry, rot = 0, a0 = 0, a1 = TAU) {
  const out = []
  const n = 120
  for (let i = 0; i <= n; i++) {
    const a = a0 + ((a1 - a0) * i) / n
    const x = rx * Math.cos(a), y = ry * Math.sin(a)
    out.push([cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)])
  }
  return out
}
function bez(p0, p1, p2, p3, n = 36) {
  const out = []
  for (let i = 0; i <= n; i++) {
    const t = i / n, u = 1 - t
    out.push([
      u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
      u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
    ])
  }
  return out
}
// Catmull-Rom through points.
function spline(pts, per = 18) {
  const out = []
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)]
    for (let j = 0; j < per; j++) {
      const t = j / per, t2 = t * t, t3 = t2 * t
      out.push([0, 1].map((d) => 0.5 * (2 * p1[d] + (-p0[d] + p2[d]) * t + (2 * p0[d] - 5 * p1[d] + 4 * p2[d] - p3[d]) * t2 + (-p0[d] + 3 * p1[d] - 3 * p2[d] + p3[d]) * t3)))
    }
  }
  out.push(pts[pts.length - 1])
  return out
}
function cumLen(p) {
  const c = [0]
  for (let i = 1; i < p.length; i++) c.push(c[i - 1] + Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]))
  return c
}
function inPoly(x, y, poly) {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}
// Smooth a closed polygon (Chaikin), for soft star points.
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
function starPoly(cx, cy, ro, ri, rot = -Math.PI / 2, pts = 5) {
  const out = []
  for (let i = 0; i < pts * 2; i++) {
    const r = i % 2 ? ri : ro
    const a = rot + (i * Math.PI) / pts
    out.push([cx + r * Math.cos(a), cy + r * Math.sin(a)])
  }
  return out
}

// ---------- halftone ----------

// Dots on a hex grid inside a shape, sized by shade(x, y) in 0..1.
function halftone(test, box, pitch, shade, order) {
  const dots = []
  const [x0, y0, x1, y1] = box
  const rowH = pitch * 0.866
  let row = 0
  for (let y = y0; y <= y1; y += rowH, row++) {
    for (let x = x0 + (row % 2 ? pitch / 2 : 0); x <= x1; x += pitch) {
      if (!test(x, y)) continue
      const s = shade(x, y)
      if (s <= 0.04) continue
      dots.push({ x, y, r: pitch * 0.48 * Math.sqrt(s), o: order(x, y) })
    }
  }
  return dots
}
function sphereDots(cx, cy, r, pitch, { light = [-0.55, -0.6], lo = 0.12, order = 'sweep' } = {}) {
  const lz = Math.sqrt(Math.max(0, 1 - light[0] ** 2 - light[1] ** 2))
  return halftone(
    (x, y) => (x - cx) ** 2 + (y - cy) ** 2 <= r * r,
    [cx - r, cy - r, cx + r, cy + r],
    pitch,
    (x, y) => {
      const nx = (x - cx) / r, ny = (y - cy) / r
      const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny))
      return lo + (1 - lo) * Math.max(0, nx * light[0] + ny * light[1] + nz * lz)
    },
    order === 'sweep'
      ? (x, y) => ((Math.atan2(y - cy, x - cx) + Math.PI * 1.5) % TAU) / TAU
      : (x, y) => Math.hypot(x - cx, y - cy) / r,
  )
}

// ---------- glyphs (zodiac and planet symbols, from DejaVu Sans) ----------

let GLYPHS = {}
function glyphPath(ch) {
  const g = GLYPHS[ch]
  if (!g) return null
  if (!g.path) g.path = new Path2D(g.d)
  return g
}

// ---------- the sketch: everything a scene draws ----------
// Items reveal on "stages": stage n starts when caption line n starts. Within
// a stage, items follow each other like a pen, each overlapping the last.

class Sketch {
  constructor(seed) {
    this.items = []
    this.stage = 0
    this.cursor = 0
    this.r = rng(seed)
    this.anchors = {}
    this.reflect = null
  }
  at(stage, delay = 0) {
    this.stage = stage
    this.cursor = delay
    return this
  }
  push(it, o) {
    it.stage = o.stage ?? this.stage
    if (o.dur != null) it.dur = o.dur
    if (o.delay != null) it.delay = o.delay
    else {
      it.delay = this.cursor
      this.cursor += o.step ?? Math.min(it.dur * 0.42, 0.32)
    }
    it.out = o.out
    it.alpha = o.alpha ?? 1
    this.items.push(it)
    return it
  }
  stroke(pts, o = {}) {
    const c = cumLen(pts)
    return this.push({
      kind: 'stroke', pts, cum: c, len: c[c.length - 1], dur: clamp(c[c.length - 1] / 1300, 0.28, 1.25),
      color: o.color ?? COL.ink, second: o.second ?? (o.color && o.color !== COL.ink ? null : COL.gold),
      w: o.w ?? 2.4, dash: o.dash, closed: o.closed,
    }, o)
  }
  line(x0, y0, x1, y1, o) { return this.stroke([[x0, y0], [x1, y1]], o) }
  circle(cx, cy, r, o = {}) { return this.stroke(arcPts(cx, cy, r, o.from ?? -Math.PI / 2, (o.from ?? -Math.PI / 2) + TAU), o) }
  dots(dots, o = {}) {
    dots.sort((a, b) => a.o - b.o)
    return this.push({ kind: 'dots', dots, color: o.color ?? COL.gold, dur: o.dur ?? 1.1 }, o)
  }
  hatch(poly, gap, o = {}) {
    // horizontal engraving lines clipped to the polygon
    const ys = poly.map((p) => p[1])
    const segs = []
    for (let y = Math.min(...ys) + gap / 2; y < Math.max(...ys); y += gap) {
      const xs = []
      for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const [xi, yi] = poly[i], [xj, yj] = poly[j]
        if (yi > y !== yj > y) xs.push(xi + ((y - yi) * (xj - xi)) / (yj - yi))
      }
      xs.sort((a, b) => a - b)
      for (let k = 0; k + 1 < xs.length; k += 2) segs.push([xs[k], y, xs[k + 1]])
    }
    return this.push({ kind: 'hatch', segs, color: o.color ?? COL.ink, w: o.w ?? 1.6, dur: o.dur ?? 0.9 }, o)
  }
  glyph(ch, x, y, size, o = {}) {
    return this.push({ kind: 'glyph', ch, x, y, size, color: o.color ?? COL.gold, fill: o.fill ?? 1, dur: o.dur ?? 0.5, glow: o.glow }, o)
  }
  text(str, x, y, o = {}) {
    return this.push({ kind: 'text', str, x, y, font: o.font, color: o.color ?? COL.ink, dur: o.dur ?? 0.7, align: o.align ?? 'center', spacing: o.spacing ?? 0 }, o)
  }
  label(str, anchor, o = {}) {
    // a mono callout with a leader line from a point on the drawing
    const { p, t, align } = anchor
    this.at(o.stage ?? 0, o.delay ?? 0.35)
    const font = '500 21px "Space Mono"'
    ctx.font = font
    ctx.letterSpacing = '4px'
    const tw = ctx.measureText(str).width
    ctx.letterSpacing = '0px'
    const uy = t[1] + 14
    const x0 = align === 'right' ? t[0] - tw : align === 'center' ? t[0] - tw / 2 : t[0]
    const ends = [x0, x0 + tw]
    const near = Math.abs(p[0] - ends[0]) <= Math.abs(p[0] - ends[1]) ? ends[0] : ends[1]
    const far = near === ends[0] ? ends[1] : ends[0]
    const pts = [p, [near, uy], [far, uy]]
    if (Math.abs(p[1] - uy) < 4) pts.splice(1, 1)
    this.stroke(pts, { color: COL.ink, second: null, w: 1.4, alpha: 0.75, stage: o.stage, step: 0.05 })
    this.push({ kind: 'dot', x: p[0], y: p[1], r: 5, color: COL.gold, dur: 0.3 }, { stage: o.stage, delay: this.cursor - 0.05, step: 0 })
    return this.push({ kind: 'text', str, x: x0, y: t[1], font, color: COL.ink, dur: 0.6, align: 'left', spacing: 4, type: true }, { stage: o.stage, alpha: 0.82, step: 0.1 })
  }
  fn(draw, o = {}) { return this.push({ kind: 'fn', draw, dur: o.dur ?? 0.8 }, o) }
}

// Prefix of a polyline by length.
function tracePrefix(g, it, k) {
  const target = it.len * k
  const p = it.pts, c = it.cum
  g.moveTo(p[0][0], p[0][1])
  for (let i = 1; i < p.length; i++) {
    if (c[i] <= target) g.lineTo(p[i][0], p[i][1])
    else {
      const f = (target - c[i - 1]) / Math.max(1e-6, c[i] - c[i - 1])
      g.lineTo(lerp(p[i - 1][0], p[i][0], f), lerp(p[i - 1][1], p[i][1], f))
      break
    }
  }
}

function drawItem(g, it, k, t, env) {
  if (it.kind === 'stroke') {
    g.lineCap = 'round'
    g.lineJoin = 'round'
    if (it.dash) g.setLineDash(it.dash)
    if (it.second) {
      // the misregistered second ink, like a two-colour print
      g.save()
      g.translate(3.2, 2.6)
      g.beginPath()
      tracePrefix(g, it, k)
      g.strokeStyle = rgba(it.second, 0.62)
      g.lineWidth = it.w * 0.85
      g.stroke()
      g.restore()
    }
    g.beginPath()
    tracePrefix(g, it, k)
    g.strokeStyle = it.color
    g.lineWidth = it.w
    g.stroke()
    g.setLineDash([])
  } else if (it.kind === 'dots') {
    const lim = k * 1.25
    g.fillStyle = it.color
    g.beginPath()
    for (const d of it.dots) {
      if (d.o > lim) break
      const s = clamp((lim - d.o) / 0.25)
      const r = d.r * easeOut(s)
      if (r < 0.3) continue
      g.moveTo(d.x + r, d.y)
      g.arc(d.x, d.y, r, 0, TAU)
    }
    g.fill()
  } else if (it.kind === 'hatch') {
    const n = it.segs.length
    g.strokeStyle = it.color
    g.lineWidth = it.w
    g.beginPath()
    for (let i = 0; i < n; i++) {
      const s = clamp((k * 1.4 - (i / n) * 1.0) / 0.4)
      if (s <= 0) continue
      const [x0, y, x1] = it.segs[i]
      g.moveTo(x0, y)
      g.lineTo(lerp(x0, x1, easeOut(s)), y)
    }
    g.stroke()
  } else if (it.kind === 'dot') {
    g.fillStyle = it.color
    g.beginPath()
    g.arc(it.x, it.y, it.r * easeOut(k), 0, TAU)
    g.fill()
  } else if (it.kind === 'glyph') {
    const gl = glyphPath(it.ch)
    if (!gl) return
    const s = it.size / 1000
    g.save()
    g.translate(it.x, it.y)
    g.scale(s * (0.85 + 0.15 * easeOut(k)), s * (0.85 + 0.15 * easeOut(k)))
    if (it.glow) {
      g.shadowColor = rgba(it.color, 0.9)
      g.shadowBlur = 30
    }
    g.globalAlpha *= easeOut(k) * it.fill
    g.fillStyle = it.color
    g.fill(gl.path)
    g.restore()
  } else if (it.kind === 'text') {
    g.save()
    g.font = it.font ?? '400 40px "EB Garamond"'
    g.letterSpacing = `${it.spacing}px`
    g.textAlign = it.align
    g.textBaseline = 'middle'
    g.fillStyle = it.color
    let str = it.str
    if (it.type) str = str.slice(0, Math.ceil(str.length * k))
    else g.globalAlpha *= easeOut(k)
    g.fillText(str, it.x, it.y)
    g.restore()
  } else if (it.kind === 'fn') {
    it.draw(g, k, t, env)
  }
}

// ---------- Stardust: Align's star-headed figure ----------

function figure(s, x, gy, h, { face = 1, ghost = false, arm = 0, stage = 0, hatch = true } = {}) {
  const head = [x + face * h * 0.015, gy - h * 0.8]
  const hr = h * 0.14
  const star = chaikin(starPoly(head[0], head[1], hr, hr * 0.5, -Math.PI / 2 + face * 0.12), 2)
  const q = (k) => h * k
  const ny = gy - q(0.665) // base of the neck
  const sy = gy - q(0.6) // shoulders
  const wy = gy - q(0.4) // waist
  const left = [
    ...bez([x - q(0.035), ny], [x - q(0.06), sy - q(0.005)], [x - q(0.13), sy - q(0.012)], [x - q(0.15), sy + q(0.03)], 10),
    ...bez([x - q(0.15), sy + q(0.03)], [x - q(0.162), sy + q(0.1)], [x - q(0.112), wy - q(0.06)], [x - q(0.11), wy], 12).slice(1),
    ...bez([x - q(0.11), wy], [x - q(0.12), wy + q(0.12)], [x - q(0.2), gy - q(0.12)], [x - q(0.22), gy - q(0.05)], 14).slice(1),
  ]
  const hem = bez([x - q(0.22), gy - q(0.05)], [x - q(0.08), gy - q(0.02)], [x + q(0.08), gy - q(0.02)], [x + q(0.22), gy - q(0.05)], 16)
  const right = left.map(([px, py]) => [2 * x - px, py]).reverse()
  const outline = [...left, ...hem.slice(1), ...right.slice(1)]
  const col = ghost ? COL.dim : COL.ink
  const dash = ghost ? [7, 9] : undefined
  const second = ghost ? null : COL.gold
  s.at(stage)
  s.stroke([...star, star[0]], { color: col, second, w: 2.6, dash, step: 0.25 })
  if (!ghost) s.dots(halftone((px, py) => inPoly(px, py, star), [head[0] - hr, head[1] - hr, head[0] + hr, head[1] + hr], 8.5,
    (px, py) => 0.35 + 0.65 * clamp(1 - Math.hypot(px - head[0] + hr * 0.25, py - head[1] + hr * 0.25) / (hr * 1.3)),
    (px, py) => Math.hypot(px - head[0], py - head[1]) / hr), { color: COL.gold, dur: 0.8, step: 0.15 })
  const chin = head[1] + hr * 0.5
  s.line(x - q(0.03), chin, x - q(0.035), ny, { color: col, second: null, w: 2.2, dash, step: 0.04 })
  s.line(x + q(0.03), chin, x + q(0.035), ny, { color: col, second: null, w: 2.2, dash, step: 0.04 })
  s.stroke(outline, { color: col, second, w: 2.4, dash, step: 0.2 })
  if (hatch && !ghost) s.hatch(outline, 9, { color: rgba(COL.ink, 0.45), w: 1.3, dur: 0.9 })
  // arms: hanging at the sides, or one reaching toward the other figure
  for (const side of [-1, 1]) {
    const sx = x + side * q(0.148), ay = sy + q(0.035)
    const reach = arm && side === face
    const pts = reach
      ? bez([sx, ay], [sx + side * q(0.08), ay + q(0.1)], [sx + side * q(0.13), ay + q(0.13)], [x + side * q(0.32), ay + q(0.1)], 24)
      : bez([sx, ay], [sx + side * q(0.03), ay + q(0.08)], [sx + side * q(0.03), ay + q(0.16)], [x + side * q(0.14), wy + q(0.06)], 24)
    s.stroke(pts, { color: col, second, w: 2.3, dash, step: 0.1 })
  }
  return { head, hr, top: [head[0], head[1] - hr] }
}

// ---------- the arts ----------
// Each art builds its drawing for a scene. n is the number of caption lines
// (stages); o is the scene's opts. They set s.anchors for labels.

const ARTS = {}

ARTS.wheel = (s, o, n) => {
  const S = (i) => Math.min(i, n - 1)
  const cy = CY + 10
  const R0 = 390, R1 = 318, R2 = 190, R3 = 66
  s.at(0)
  s.circle(CX, cy, R0, { w: 2.8, from: Math.PI })
  s.circle(CX, cy, R1, { w: 2.0, from: Math.PI })
  s.circle(CX, cy, R2, { w: 1.6, dash: [5, 9], second: null, from: Math.PI })
  // degree ticks
  s.fn((g, k) => {
    g.strokeStyle = rgba(COL.gold, 0.8)
    g.lineWidth = 1.5
    g.beginPath()
    const m = Math.floor(72 * k)
    for (let i = 0; i < m; i++) {
      const a = Math.PI + (i * TAU) / 72
      const l = i % 6 === 0 ? 18 : 9
      g.moveTo(CX + (R0 - 2) * Math.cos(a), cy + (R0 - 2) * Math.sin(a))
      g.lineTo(CX + (R0 - 2 - l) * Math.cos(a), cy + (R0 - 2 - l) * Math.sin(a))
    }
    g.stroke()
  }, { dur: 1.0, step: 0.1 })
  for (let hN = 0; hN < 12; hN++) {
    const a = Math.PI - (hN * Math.PI) / 6
    s.line(CX + R2 * Math.cos(a), cy + R2 * Math.sin(a), CX + R1 * Math.cos(a), cy + R1 * Math.sin(a), { w: 1.5, second: null, alpha: 0.7, step: 0.04 })
  }
  // house numbers
  for (let hN = 1; hN <= 12; hN++) {
    const a = Math.PI - ((hN - 0.5) * Math.PI) / 6
    s.text(String(hN), CX + (R2 - 28) * Math.cos(a), cy + (R2 - 28) * Math.sin(a), { font: '400 20px "Space Mono"', color: rgba(COL.ink, 0.55), dur: 0.3, step: 0.03 })
  }
  // the twelve signs, natural wheel (Aries on the ascendant)
  const signs = '♈♉♊♋♌♍♎♏♐♑♒♓'
  // `rising` turns the ring so that sign sits on the ascendant (house one)
  const turn = o.rising ? signIndex(o.rising) : 0
  const slot = (i) => (i - turn + 12) % 12
  for (let i = 0; i < 12; i++) {
    const a = Math.PI - ((slot(i) + 0.5) * Math.PI) / 6
    s.glyph(signs[i], CX + ((R0 + R1) / 2) * Math.cos(a), cy + ((R0 + R1) / 2) * Math.sin(a), 38, { color: COL.gold, step: 0.06 })
  }
  s.dots(sphereDots(CX, cy, R3, 8.5), { color: COL.lilac, step: 0.2 })
  s.circle(CX, cy, R3, { w: 1.8, second: null, step: 0.1 })

  const mid = (h) => Math.PI - ((h - 0.5) * Math.PI) / 6
  if (o.highlight) {
    const h = o.highlight
    const a0 = Math.PI - ((h - 1) * Math.PI) / 6, a1 = a0 - Math.PI / 6
    s.at(S(o.highlightAt ?? 1))
    const sector = [...arcPts(CX, cy, R2 + 6, a1, a0), ...arcPts(CX, cy, R1 - 6, a0, a1)]
    s.dots(halftone((x, y) => inPoly(x, y, sector), [CX - R1, cy - R1, CX + R1, cy + R1], 9,
      (x, y) => 0.35 + 0.65 * clamp((Math.hypot(x - CX, y - cy) - R2) / (R1 - R2)), (x, y) => (Math.atan2(y - cy, x - CX) - a1) / (a0 - a1)), { color: COL.rose, dur: 0.9 })
    s.stroke([...sector, sector[0]], { color: COL.rose, second: COL.ink, w: 2.4 })
    s.fn((g, k, t) => {
      // the house keeps a soft pulse once it's lit
      g.save()
      g.globalAlpha *= 0.25 + 0.15 * Math.sin(t * 2.4)
      g.fillStyle = COL.rose
      g.beginPath()
      g.moveTo(sector[0][0], sector[0][1])
      for (const p of sector) g.lineTo(p[0], p[1])
      g.fill()
      g.restore()
    }, { dur: 0.6 })
    const am = mid(h)
    const hp = [CX + (R1 - 30) * Math.cos(am), cy + (R1 - 30) * Math.sin(am)]
    s.anchors.house = s.anchors.h7 = sideLabel(hp, cy)
  }
  if (o.axis) {
    s.at(S(o.axisAt ?? 2))
    s.line(CX - R0 - 70, cy, CX + R0 + 70, cy, { color: COL.gold, second: COL.ink, w: 3 })
    for (const dir of [-1, 1]) {
      const x = CX + dir * (R0 + 70)
      s.stroke([[x - dir * 18, cy - 12], [x, cy], [x - dir * 18, cy + 12]], { color: COL.gold, second: null, w: 3, step: 0.05 })
    }
    s.text('ASC', CX - R0 - 22, cy - 34, { font: '700 22px "Space Mono"', color: COL.gold, spacing: 3 })
    s.text('DSC', CX + R0 + 22, cy - 34, { font: '700 22px "Space Mono"', color: COL.gold, spacing: 3 })
  }
  s.anchors.dsc = { p: [CX + R0 + 40, cy], t: [1010, cy + 445], align: 'right' }
  s.anchors.asc = { p: [CX - R0 - 40, cy], t: [70, cy - 455], align: 'left' }
  if (o.planet) {
    const si = slot(signIndex(o.planetSign ?? 1))
    const a = Math.PI - ((si + 0.5) * Math.PI) / 6
    const px = CX + (R2 + 64) * Math.cos(a), py = cy + (R2 + 64) * Math.sin(a)
    s.at(S(o.planetAt ?? 1), 1.2)
    s.dots(sphereDots(px, py, 40, 7), { color: COL.rose, dur: 0.6 })
    s.circle(px, py, 40, { color: COL.ink, w: 2.2 })
    s.glyph(o.planet, px, py, 46, { color: COL.ink, glow: true })
    s.fn((g, k, t) => {
      g.strokeStyle = rgba(COL.rose, 0.5 * k)
      g.lineWidth = 1.5
      for (let i = 0; i < 2; i++) {
        const f = (t * 0.45 + i / 2) % 1
        g.globalAlpha = (1 - f) * k
        g.beginPath()
        g.arc(px, py, 44 + f * 70, 0, TAU)
        g.stroke()
      }
      g.globalAlpha = 1
    }, { dur: 0.6 })
    s.anchors.planet = sideLabel([px, py], cy)
  }
  if (o.pair) {
    // two signs and the true aspect between them
    const [ia, ib] = o.pair.map(signIndex)
    const d = Math.min(Math.abs(ia - ib), 12 - Math.abs(ia - ib))
    const names = ['0° · CONJUNCTION', '30° · SEMI-SEXTILE', '60° · SEXTILE', '90° · SQUARE', '120° · TRINE', '150° · QUINCUNX', '180° · OPPOSITION']
    const pos = (i, r) => { const a = Math.PI - ((slot(i) + 0.5) * Math.PI) / 6; return [CX + r * Math.cos(a), cy + r * Math.sin(a)] }
    s.at(S(o.pairAt ?? 1), 0.6)
    for (const i of d === 0 ? [ia] : [ia, ib]) {
      const [gx, gy] = pos(i, (R0 + R1) / 2)
      s.circle(gx, gy, 34, { color: COL.rose, second: COL.ink, w: 2.6 })
    }
    let anchorP
    if (d === 0) {
      const [gx, gy] = pos(ia, (R0 + R1) / 2)
      s.circle(gx, gy, 46, { color: COL.gold, second: null, w: 2, dash: [3, 7] })
      anchorP = [gx, gy]
    } else {
      const A = pos(ia, R1 - 12), B = pos(ib, R1 - 12)
      s.line(A[0], A[1], B[0], B[1], { color: COL.rose, second: COL.ink, w: 3 })
      for (const P of [A, B]) s.push({ kind: 'dot', x: P[0], y: P[1], r: 9, color: COL.gold, dur: 0.3 }, { step: 0.05 })
      anchorP = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2]
      if (Math.hypot(anchorP[0] - CX, anchorP[1] - cy) < 80) anchorP = [anchorP[0] + 40, anchorP[1] - 60]
    }
    s.anchors.pair = sideLabel(anchorP, cy)
    s.label(names[d], s.anchors.pair, { stage: S(o.pairAt ?? 1), delay: 1.4 })
  }
}

// A label for a point on a centred drawing: put it on the near side, above or below.
function sideLabel(p, cy) {
  const right = p[0] >= CX
  const up = p[1] < cy
  return { p, t: [right ? 1010 : 70, up ? cy - 460 : cy + 440], align: right ? 'right' : 'left' }
}
const SIGN_IDS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
const SIGN_GLYPHS = '♈♉♊♋♌♍♎♏♐♑♒♓'
const signIndex = (v) => (typeof v === 'number' ? v : Math.max(0, SIGN_IDS.indexOf(v)))
const ELEMENT_OF = (i) => ['fire', 'earth', 'air', 'water'][i % 4]
const ELEMENT_COL = { fire: '#e8628a', earth: '#f2c75c', air: '#7fd8b0', water: '#c9b6f8' }
// Star figures for each sign (from the app's onboarding), in a 100 × 70 box.
const chain = (n, from = 0) => Array.from({ length: n - 1 }, (_, i) => [from + i, from + i + 1])
const CONSTELLATIONS = {
  aries: { pts: [[5, 45], [42, 22], [68, 26], [88, 42]], lines: chain(4) },
  taurus: { pts: [[33, 0], [69, 0], [27, 25], [71, 25], [21, 48], [77, 48], [15, 70], [84, 70]], lines: [[0, 2], [2, 4], [4, 6], [1, 3], [3, 5], [5, 7], [2, 3]] },
  gemini: { pts: [[28, 0], [26, 24], [22, 48], [18, 70], [66, 0], [68, 24], [71, 48], [74, 70]], lines: [...chain(4), ...chain(4, 4), [0, 4], [2, 6]] },
  cancer: { pts: [[50, 0], [48, 30], [16, 66], [82, 60], [58, 50]], lines: [[0, 1], [1, 2], [1, 4], [4, 3]] },
  leo: { pts: [[78, 14], [66, 0], [50, 6], [50, 24], [60, 34], [54, 48], [22, 52], [4, 68], [26, 36]], lines: [...chain(6), [5, 6], [6, 7], [6, 8], [8, 3]] },
  virgo: { pts: [[0, 8], [20, 20], [40, 14], [55, 30], [72, 24], [88, 44], [60, 56], [42, 70]], lines: [...chain(6), [3, 6], [6, 7]] },
  libra: { pts: [[50, 0], [18, 28], [82, 28], [24, 62], [76, 58]], lines: [[0, 1], [0, 2], [1, 2], [1, 3], [2, 4]] },
  scorpio: { pts: [[2, 6], [12, 0], [18, 16], [32, 26], [46, 36], [54, 50], [64, 62], [80, 68], [94, 56]], lines: [[0, 2], [1, 2], ...chain(7, 2)] },
  sagittarius: { pts: [[10, 36], [28, 22], [46, 28], [44, 50], [22, 54], [62, 14], [80, 6], [66, 40], [90, 60]], lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [2, 5], [5, 6], [2, 7], [7, 8]] },
  capricorn: { pts: [[0, 10], [30, 34], [56, 60], [80, 44], [96, 10], [50, 18]], lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]] },
  aquarius: { pts: [[0, 34], [16, 22], [32, 34], [48, 22], [64, 34], [80, 18], [96, 28]], lines: chain(7) },
  pisces: { pts: [[0, 12], [22, 32], [46, 64], [70, 42], [90, 22], [98, 8], [84, 6]], lines: [...chain(5), [4, 5], [5, 6], [6, 4]] },
}

// A planet: a big halftone sphere with its glyph, maybe a ring.
ARTS.planet = (s, o) => {
  const tones = { rose: COL.rose, lilac: COL.lilac2, mint: COL.mint, gold: COL.gold }
  const dflt = { '♀': 'rose', '♂': 'rose', '☽': 'lilac', '☿': 'mint', '☉': 'gold', '♃': 'gold', '♄': 'lilac' }
  const col = tones[o.tone] ?? tones[dflt[o.glyph]] ?? COL.gold
  const R = 220, cy = CY - 40
  const rot = -0.28, rx = R * 1.75, ry = R * 0.36
  s.at(0)
  if (o.ring) s.stroke(ellPts(CX, cy, rx, ry, rot, Math.PI, TAU), { color: COL.gold, second: null, w: 3, dash: [3, 9] })
  s.fn((g, k) => {
    g.save()
    g.globalAlpha *= k
    g.fillStyle = COL.canvas
    g.beginPath()
    g.arc(CX, cy, R, 0, TAU)
    g.fill()
    g.restore()
  }, { dur: 0.3, step: 0 })
  s.dots(sphereDots(CX, cy, R, 10, { light: [-0.55, -0.55] }), { color: col, dur: 1.1 })
  s.circle(CX, cy, R, { w: 3 })
  s.glyph(o.glyph ?? '✦', CX, cy, 250, { color: COL.ink, glow: true, dur: 0.7 })
  if (o.ring) s.stroke(ellPts(CX, cy, rx, ry, rot, 0, Math.PI), { color: COL.gold, second: COL.ink, w: 3 })
  s.fn((g, k, t) => {
    // small moons on slow orbits
    for (let i = 0; i < 3; i++) {
      const a = t * (0.3 + i * 0.13) + i * 2.2
      const rr = R + 70 + i * 40
      g.fillStyle = rgba([COL.gold, COL.mint, COL.lilac2][i], 0.85 * k)
      g.beginPath()
      g.arc(CX + rr * Math.cos(a), cy + rr * Math.sin(a) * 0.85, 7 + i * 2, 0, TAU)
      g.fill()
    }
  }, { dur: 0.6 })
  s.anchors.planet = { p: [CX + R * 0.7, cy - R * 0.72], t: [1010, cy - R - 120], align: 'right' }
}

// A sign: its constellation drawing itself star by star, and its glyph in a medallion.
ARTS.sign = (s, o) => {
  const i = signIndex(o.sign ?? 'aries')
  const c = CONSTELLATIONS[SIGN_IDS[i]]
  const col = ELEMENT_COL[ELEMENT_OF(i)]
  const sc = 7.4, ox = CX - 50 * sc, oy = 360
  const P = c.pts.map(([x, y]) => [ox + x * sc, oy + y * sc])
  const r = s.r
  s.at(0)
  for (let k = 0; k < 26; k++) s.push({ kind: 'dot', x: 120 + r() * 840, y: 330 + r() * 600, r: 1.6 + r() * 1.8, color: rgba(COL.ink, 0.5), dur: 0.3 }, { step: 0.015 })
  for (const [a, b] of c.lines) s.line(P[a][0], P[a][1], P[b][0], P[b][1], { color: rgba(COL.ink, 0.7), second: null, w: 1.8, dash: [3, 8], step: 0.16 })
  s.at(0, 0.2)
  for (const p of P) {
    s.push({ kind: 'dot', x: p[0], y: p[1], r: 13, color: rgba(col, 0.35), dur: 0.4 }, { step: 0 })
    s.glyph('✦', p[0], p[1], 40, { color: COL.ink, glow: true, step: 0.14 })
  }
  // the medallion
  const my = 1085, mr = 108
  s.dots(sphereDots(CX, my, mr - 6, 9, { light: [-0.5, -0.6], lo: 0.2 }), { color: col, dur: 0.8 })
  s.circle(CX, my, mr, { w: 3 })
  s.circle(CX, my, mr + 16, { w: 1.5, second: null, dash: [2, 7], color: COL.gold })
  s.glyph(SIGN_GLYPHS[i], CX, my, 120, { color: COL.ink, glow: true })
  s.text(SIGN_IDS[i].toUpperCase(), CX, my + mr + 48, { font: '700 22px "Space Mono"', color: COL.gold, spacing: 8 })
  s.anchors.sign = { p: [CX + mr * 0.75, my - mr * 0.7], t: [1010, my + 170], align: 'right' }
  s.anchors.stars = sideLabel(P[0], 600)
}

// Moon phases: one big moon in the phase, and all eight on an arc below.
function moonLit(f) {
  // is a point (x, y) on the unit disc lit at phase fraction f (0 new, .5 full)?
  const k = Math.cos(TAU * f)
  return (x, y) => {
    const w = Math.sqrt(Math.max(0, 1 - y * y))
    return f <= 0.5 ? x > k * w : x < -k * w
  }
}
ARTS.phases = (s, o, n) => {
  const S = (i) => Math.min(i, n - 1)
  const lit = Math.max(0, Math.min(7, o.lit ?? 4))
  const draw = (cx, cy, R, f, pitch, dur, color) => {
    const isLit = moonLit(f)
    s.fn((g, k) => {
      g.save()
      g.globalAlpha *= k
      g.fillStyle = '#0d0724'
      g.beginPath()
      g.arc(cx, cy, R, 0, TAU)
      g.fill()
      g.restore()
    }, { dur: 0.3, step: 0 })
    s.dots(halftone((x, y) => Math.hypot(x - cx, y - cy) < R - 2 && isLit((x - cx) / R, (y - cy) / R), [cx - R, cy - R, cx + R, cy + R], pitch,
      (x, y) => 0.55 + 0.45 * clamp(1 - Math.hypot(x - cx + R * 0.3, y - cy + R * 0.3) / (R * 1.6)), (x, y) => (x - cx + R) / (2 * R)), { color, dur })
    s.circle(cx, cy, R, { w: R > 100 ? 2.8 : 1.8, second: R > 100 ? COL.gold : null })
  }
  s.at(0)
  const row = Array.from({ length: 8 }, (_, i) => [150 + i * (780 / 7), 1150 - 52 * Math.sin((Math.PI * i) / 7)])
  row.forEach(([x, y], i) => draw(x, y, 36, i / 8, 6.5, 0.4, rgba(COL.ink, 0.9)))
  s.at(S(o.litAt ?? 0), 0.6)
  draw(CX, 690, 230, lit / 8, 11, 1.1, COL.lilac2)
  const [lx, ly] = row[lit]
  s.circle(lx, ly, 50, { color: COL.gold, second: null, w: 2.4 })
  s.line(lx, ly - 52, CX + (lx - CX) * 0.25, 690 + 236, { color: COL.gold, second: null, w: 1.4, dash: [2, 8] })
  s.anchors.moon = { p: [CX + 165, 690 - 165], t: [1010, 340], align: 'right' }
}

// The four elements as their old triangle symbols; one (or two) lit.
ARTS.elements = (s, o) => {
  const pos = { fire: [CX, 520], air: [870, 820], water: [CX, 1120], earth: [210, 820] }
  const on = [o.element, o.second].filter(Boolean)
  const tri = (cx, cy, size, up) => {
    const h = size * 0.866, d = up ? -1 : 1
    return [[cx, cy + d * h * 0.62], [cx - size / 2, cy - d * h * 0.38], [cx + size / 2, cy - d * h * 0.38], [cx, cy + d * h * 0.62]]
  }
  s.at(0)
  // the cross between them
  s.stroke([pos.fire, pos.water], { color: rgba(COL.ink, 0.25), second: null, w: 1.4, dash: [2, 10] })
  s.stroke([pos.earth, pos.air], { color: rgba(COL.ink, 0.25), second: null, w: 1.4, dash: [2, 10] })
  for (const [el, [x, y]] of Object.entries(pos)) {
    const hot = on.includes(el)
    const size = hot ? 230 : 150
    const up = el === 'fire' || el === 'air'
    const t = tri(x, y, size, up)
    if (hot) {
      s.dots(halftone((px, py) => inPoly(px, py, t), [x - size, y - size, x + size, y + size], 10,
        (px, py) => 0.45 + 0.55 * clamp(1 - Math.hypot(px - x, py - y) / size), (px, py) => (py - y + size) / (2 * size)), { color: ELEMENT_COL[el], dur: 0.9 })
    }
    s.stroke(t, { color: hot ? COL.ink : rgba(COL.ink, 0.45), second: hot ? COL.gold : null, w: hot ? 3.2 : 2 })
    if (el === 'air' || el === 'earth') {
      // the bar across air and earth
      const by = y + (up ? 1 : -1) * size * 0.08
      s.line(x - size * 0.42, by, x + size * 0.42, by, { color: hot ? COL.ink : rgba(COL.ink, 0.45), second: null, w: hot ? 3 : 2 })
    }
    s.text(el.toUpperCase(), x, y + (up ? 1 : 1) * size * 0.55 + 34, { font: `700 ${hot ? 24 : 20}px "Space Mono"`, color: hot ? ELEMENT_COL[el] : rgba(COL.ink, 0.5), spacing: 6 })
  }
  if (on.length === 2 && on[0] !== on[1]) {
    s.at(0, 1.6)
    s.stroke([pos[on[0]], pos[on[1]]], { color: COL.gold, second: COL.ink, w: 3 })
  }
  const [ax, ay] = pos[on[0] ?? 'fire']
  s.anchors.element = sideLabel([ax, ay], 820)
}

ARTS.figures = (s, o, n) => {
  const S = (i) => Math.min(i, n - 1)
  const gy = 1130
  const pose = o.pose ?? 'apart'
  s.reflect = gy
  // ground: a long horizon with a soft dotted under-line
  s.at(0)
  s.line(90, gy, 990, gy, { w: 2, second: COL.gold, dur: 0.9 })
  if (pose === 'apart' || pose === 'meet') {
    const dx = pose === 'apart' ? 270 : 120
    const h = pose === 'apart' ? 430 : 460
    const A = figure(s, CX - dx, gy, h, { face: 1, arm: pose === 'meet' ? 1 : 0, stage: 0 })
    const B = figure(s, CX + dx, gy, h, { face: -1, arm: pose === 'meet' ? 1 : 0, stage: 0 })
    s.at(S(o.threadAt ?? 1))
    const ax = A.head[0] + A.hr * 1.1, bx = B.head[0] - B.hr * 1.1, y = A.head[1]
    const lift = pose === 'apart' ? 190 : 120
    const arc = bez([ax, y], [ax + (bx - ax) * 0.2, y - lift], [bx - (bx - ax) * 0.2, y - lift], [bx, y], 60)
    s.stroke(arc, { color: COL.gold, second: null, w: 2.2, dash: [3, 10] })
    const apex = arc[30]
    s.glyph('✦', apex[0], apex[1] - 4, pose === 'apart' ? 46 : 70, { color: COL.ink, glow: true })
    s.fn((g, k, t) => {
      // a spark that keeps running along the thread
      const f = (t * 0.32) % 1
      const p = arc[Math.floor(f * (arc.length - 1))]
      g.fillStyle = rgba(COL.gold, 0.9 * k)
      g.beginPath()
      g.arc(p[0], p[1], 5, 0, TAU)
      g.fill()
    })
    if (pose === 'meet') {
      // the two reflections touch: a halo behind both heads
      s.at(S(1), 0.4)
      const gc = [CX, y - 30]
      s.dots(halftone((x, yy) => Math.hypot(x - gc[0], yy - gc[1]) < 250, [gc[0] - 250, gc[1] - 250, gc[0] + 250, gc[1] + 250], 13,
        (x, yy) => 0.75 * Math.pow(1 - Math.hypot(x - gc[0], yy - gc[1]) / 250, 1.6), (x, yy) => Math.hypot(x - gc[0], yy - gc[1]) / 250), { color: rgba(COL.lilac2, 0.55), dur: 1.4 })
    }
    s.anchors.thread = { p: [apex[0], apex[1] - 30], t: [CX, apex[1] - 120], align: 'center' }
    s.anchors.a = { p: A.top, t: [70, 420], align: 'left' }
    s.anchors.b = { p: B.top, t: [1010, 420], align: 'right' }
  } else if (pose === 'pass') {
    // you, walking on; a ghost of them behind, dashed and dim
    figure(s, 300, gy, 360, { face: 1, ghost: true, stage: 0 })
    const A = figure(s, 720, gy, 450, { face: 1, stage: 0 })
    s.at(S(1))
    for (let i = 0; i < 3; i++) {
      const x = 860 + i * 40
      s.stroke([[x, gy - 250], [x + 22, gy - 225], [x, gy - 200]], { color: COL.gold, second: null, w: 3, step: 0.12 })
    }
    s.at(S(o.forwardAt ?? 3))
    s.stroke(bez([140, gy + 40], [400, gy + 90], [700, gy + 90], [960, gy + 40]), { color: COL.gold, second: null, w: 2, dash: [2, 9] })
    s.text('FORWARD', 960, gy + 70, { font: '700 20px "Space Mono"', color: COL.gold, spacing: 5, align: 'right' })
    s.anchors.you = { p: A.top, t: [1010, 420], align: 'right' }
  } else if (pose === 'orbit') {
    const A = figure(s, CX, gy, 460, { face: 1, stage: 0 })
    const rx = 330, ry = 92, rot = -0.12, oy = gy - 300
    s.at(S(1))
    const orbit = ellPts(CX, oy, rx, ry, rot)
    s.stroke(orbit, { color: COL.gold, second: null, w: 2, dash: [4, 10] })
    s.fn((g, k, t) => {
      // a small star circling them, endlessly, never getting closer
      for (let i = 0; i < 14; i++) {
        const a = t * 1.25 - i * 0.07
        const x = rx * Math.cos(a), y = ry * Math.sin(a)
        const px = CX + x * Math.cos(rot) - y * Math.sin(rot), py = oy + x * Math.sin(rot) + y * Math.cos(rot)
        const behind = Math.sin(a) < 0
        if (i === 0) {
          const st = chaikin(starPoly(px, py, 30, 15, -Math.PI / 2 + a), 2)
          g.save()
          g.globalAlpha *= k * (behind ? 0.55 : 1)
          g.fillStyle = COL.gold
          g.strokeStyle = COL.ink
          g.lineWidth = 2
          g.beginPath()
          st.forEach((p, j) => (j ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])))
          g.closePath()
          g.fill()
          g.stroke()
          g.restore()
        } else {
          g.fillStyle = rgba(COL.gold, k * 0.5 * (1 - i / 14))
          g.beginPath()
          g.arc(px, py, 4.5 * (1 - i / 16), 0, TAU)
          g.fill()
        }
      }
    }, { dur: 0.6 })
    s.anchors.orbit = { p: [CX + rx * 0.9, oy - 40], t: [1010, 430], align: 'right' }
    s.anchors.you = { p: A.top, t: [70, 430], align: 'left' }
  }
}

ARTS.card = (s, o, n) => {
  const S = (i) => Math.min(i, n - 1)
  const w = 470, h = 690, x0 = CX - w / 2, y0 = CY - h / 2 + 10, r = 34
  const rr = (x, y, ww, hh, rad) => [
    ...arcPts(x + rad, y + rad, rad, Math.PI, Math.PI * 1.5), ...arcPts(x + ww - rad, y + rad, rad, -Math.PI / 2, 0),
    ...arcPts(x + ww - rad, y + hh - rad, rad, 0, Math.PI / 2), ...arcPts(x + rad, y + hh - rad, rad, Math.PI / 2, Math.PI),
  ]
  const outer = rr(x0, y0, w, h, r)
  const inner = rr(x0 + 24, y0 + 24, w - 48, h - 48, r - 14)
  const reveal = S(o.revealAt ?? 1)
  s.at(0)
  s.fn((g, k) => {
    // card stock, so the veil reads as sitting on something
    g.save()
    g.globalAlpha *= 0.85 * k
    g.fillStyle = COL.canvas
    g.beginPath()
    outer.forEach((p, i) => (i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])))
    g.closePath()
    g.fill()
    g.restore()
  }, { dur: 0.5, step: 0 })
  s.stroke([...outer, outer[0]], { color: COL.gold, second: COL.ink, w: 3.2 })
  s.stroke([...inner, inner[0]], { color: COL.gold, second: null, w: 1.6, dash: [3, 7] })
  for (const [cx, cy] of [[x0 + 50, y0 + 52], [x0 + w - 50, y0 + 52], [x0 + 50, y0 + h - 52], [x0 + w - 50, y0 + h - 52]]) {
    s.glyph('✦', cx, cy, 26, { color: COL.gold, step: 0.05 })
  }
  s.text('ALIGN', CX, y0 + 54, { font: '700 20px "Space Mono"', color: COL.gold, spacing: 8 })
  // the veil: diagonal halftone, densest at the bottom, lifts at the reveal
  const veil = halftone((x, y) => inPoly(x, y, inner), [x0, y0, x0 + w, y0 + h], 12,
    (x, y) => 0.25 + 0.75 * clamp((y - y0) / h) * (0.75 + 0.25 * Math.sin((x + y) / 26)), (x, y) => (y - y0) / h)
  const veilItem = s.dots(veil, { color: COL.lilac, dur: 1.1 })
  const big = s.glyph('✦', CX, CY + 10, 150, { color: COL.ink, glow: true })
  if (o.veiled) return
  veilItem.lift = reveal
  big.lift = reveal
  // the face: the keyword, set like a card title
  s.at(reveal, 0.15)
  s.text(o.face ?? '', CX, CY - 20, { font: 'italic 500 118px "EB Garamond"', color: COL.ink, dur: 0.8 })
  if (o.glyph) s.glyph(o.glyph, CX, CY - 190, 90, { color: COL.rose, glow: true })
  s.line(CX - 90, CY + 70, CX + 90, CY + 70, { color: COL.gold, second: null, w: 1.6 })
  s.text(o.sub ?? '', CX, CY + 112, { font: '700 19px "Space Mono"', color: COL.gold, spacing: 4, dur: 0.7 })
  s.dots(sphereDots(CX, CY + 230, 60, 9, { order: 'radial' }), { color: COL.rose, dur: 0.8 })
  s.anchors.card = { p: [x0 + w, y0 + 120], t: [1010, y0 - 40], align: 'right' }
  s.float = 7
}

ARTS.mark = (s, o) => {
  const R = o.r ?? 230
  const cy = CY
  const star = chaikin(starPoly(CX, cy, R, R * 0.5, -Math.PI / 2 + 0.1), 3)
  const rot = -0.32, rx = R * 1.75, ry = R * 0.42
  s.at(0)
  // the back half of the orbit, then the star, then the front half
  s.stroke(ellPts(CX, cy, rx, ry, rot, Math.PI, TAU), { color: COL.gold, second: null, w: 4, dash: [4, 12] })
  s.fn((g, k) => {
    g.save()
    g.globalAlpha *= k
    g.fillStyle = COL.canvas
    g.beginPath()
    star.forEach((p, i) => (i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])))
    g.closePath()
    g.fill()
    g.restore()
  }, { dur: 0.3 })
  s.dots(halftone((x, y) => inPoly(x, y, star), [CX - R, cy - R, CX + R, cy + R], o.pitch ?? 15,
    (x, y) => 0.3 + 0.7 * clamp(1 - Math.hypot(x - CX + R * 0.3, y - cy + R * 0.3) / (R * 1.5)), (x, y) => Math.hypot(x - CX, y - cy) / R), { color: COL.gold })
  s.stroke([...star, star[0]], { w: 6, second: COL.gold })
  s.stroke(ellPts(CX, cy, rx, ry, rot, 0, Math.PI), { color: COL.gold, second: null, w: 4, dash: [4, 12] })
  const a = 0.55
  const px = CX + rx * Math.cos(a) * Math.cos(rot) - ry * Math.sin(a) * Math.sin(rot)
  const py = cy + rx * Math.cos(a) * Math.sin(rot) + ry * Math.sin(a) * Math.cos(rot)
  s.dots(sphereDots(px, py, R * 0.2, 9), { color: COL.rose })
  s.circle(px, py, R * 0.2, { w: 3.5 })
  for (const [x, y, z] of [[CX - R * 1.25, cy - R * 0.95, 70], [CX + R * 1.15, cy - R * 1.05, 46], [CX - R * 0.95, cy + R * 1.1, 40]]) s.glyph('✦', x, y, z, { color: COL.ink, glow: true })
}

// Where should Align open next: a constellation of cities around your own.
ARTS.cities = (s, o, n) => {
  const S = (i) => Math.min(i, n - 1)
  const cities = o.cities ?? ['NEW YORK', 'LOS ANGELES', 'ATLANTA', 'CHICAGO', 'HOUSTON', 'MIAMI', 'DALLAS', 'LONDON']
  const cy = CY - 10
  const r = s.r
  const pts = cities.map((name, i) => {
    const a = -Math.PI / 2 + (i + 0.5) * (TAU / cities.length) + (r() - 0.5) * 0.25
    const rr = 300 + (i % 2) * 70 + r() * 30
    return { name, x: CX + rr * Math.cos(a) * 1.02, y: cy + rr * Math.sin(a) * 1.05 }
  })
  // you, in the middle: Stardust's star
  const R = 92
  const star = chaikin(starPoly(CX, cy, R, R * 0.5, -Math.PI / 2 + 0.08), 2)
  s.at(0)
  s.dots(halftone((x, y) => inPoly(x, y, star), [CX - R, cy - R, CX + R, cy + R], 9,
    (x, y) => 0.35 + 0.65 * clamp(1 - Math.hypot(x - CX + R * 0.3, y - cy + R * 0.3) / (R * 1.5)), (x, y) => Math.hypot(x - CX, y - cy) / R), { color: COL.gold, dur: 0.8 })
  s.stroke([...star, star[0]], { w: 3 })
  s.text('YOUR CITY?', CX, cy + R + 44, { font: '700 24px "Space Mono"', color: COL.gold, spacing: 6 })
  // each city: a dotted thread to you, a star, its name
  for (const p of pts) {
    const k = R + 30, d = Math.hypot(p.x - CX, p.y - cy)
    s.stroke([[CX + ((p.x - CX) / d) * k, cy + ((p.y - cy) / d) * k], [p.x - ((p.x - CX) / d) * 26, p.y - ((p.y - cy) / d) * 26]], { color: COL.gold, second: null, w: 1.6, dash: [2, 9], alpha: 0.75, step: 0.12 })
    s.glyph('✦', p.x, p.y, 36, { color: COL.ink, glow: true, step: 0.05 })
    s.text(p.name, p.x, p.y + 42, { font: '400 20px "Space Mono"', color: rgba(COL.ink, 0.85), spacing: 4, dur: 0.4, step: 0.05 })
  }
  // votes coming in: each city pings in turn once the vote is asked for
  s.at(S(o.voteAt ?? 2))
  s.fn((g, k, t) => {
    pts.forEach((p, i) => {
      const f = ((t * 0.5 + i * 0.37) % 1.6) / 1.6
      if (f > 1) return
      g.strokeStyle = rgba([COL.rose, COL.mint, COL.lilac2, COL.gold][i % 4], (1 - f) * 0.9 * k)
      g.lineWidth = 2
      g.beginPath()
      g.arc(p.x, p.y, 20 + f * 60, 0, TAU)
      g.stroke()
    })
    const f = (t * 0.6) % 1
    g.strokeStyle = rgba(COL.gold, (1 - f) * 0.8 * k)
    g.lineWidth = 2.5
    g.beginPath()
    g.arc(CX, cy, R + 20 + f * 90, 0, TAU)
    g.stroke()
  }, { dur: 0.5 })
}

ARTS.loop = (s, o, n) => {
  const S = (i) => Math.min(i, n - 1)
  // the apparent path of a planet against the stars: forward, back, forward
  const path = spline([[110, 1010], [330, 930], [560, 800], [700, 640], [640, 520], [480, 560], [450, 700], [600, 800], [820, 820], [990, 760]], 22)
  // a few fixed stars and a faint constellation behind
  const r = s.r
  s.at(0)
  const stars = Array.from({ length: 9 }, () => [140 + r() * 800, 420 + r() * 700])
  for (const [x, y] of stars) s.glyph('✦', x, y, 18 + r() * 16, { color: rgba(COL.ink, 0.7), step: 0.04 })
  s.stroke([stars[0], stars[3], stars[5], stars[1]], { color: COL.ink, second: null, w: 1.2, alpha: 0.35, dash: [2, 8] })
  const c = cumLen(path), L = c[c.length - 1]
  const at = (f) => {
    const tl = f * L
    let i = 1
    while (i < c.length - 1 && c[i] < tl) i++
    const q = (tl - c[i - 1]) / Math.max(1e-6, c[i] - c[i - 1])
    return [lerp(path[i - 1][0], path[i][0], q), lerp(path[i - 1][1], path[i][1], q)]
  }
  const planetDots = sphereDots(0, 0, 92, 8.5, { light: [-0.6, -0.5] })
  s.stroke(path, { color: rgba(COL.ink, 0.28), second: null, w: 2, dash: [2, 12], dur: 0.9 })
  s.fn((g, k, t, env) => {
    // the planet travels the loop over the scene, leaving a dotted trail
    const f = clamp(t / Math.max(2, env.dur - 0.3)) * 0.92 + 0.04
    g.save()
    g.setLineDash([3, 11])
    g.lineCap = 'round'
    g.strokeStyle = rgba(COL.gold, 0.95)
    g.lineWidth = 3
    g.beginPath()
    const tl = f * L
    g.moveTo(path[0][0], path[0][1])
    for (let i = 1; i < path.length && c[i] <= tl; i++) g.lineTo(path[i][0], path[i][1])
    g.stroke()
    g.restore()
    const [px, py] = at(f)
    g.save()
    g.translate(px, py)
    g.fillStyle = COL.lilac2
    g.beginPath()
    for (const d of planetDots) {
      g.moveTo(d.x + d.r, d.y)
      g.arc(d.x, d.y, d.r, 0, TAU)
    }
    g.globalAlpha *= easeOut(k)
    g.fill()
    g.strokeStyle = COL.ink
    g.lineWidth = 2.4
    g.beginPath()
    g.arc(0, 0, 92, 0, TAU)
    g.stroke()
    g.strokeStyle = rgba(COL.gold, 0.7)
    g.beginPath()
    g.arc(3, 2.5, 92, 0, TAU)
    g.stroke()
    g.restore()
  }, { dur: 0.8, step: 0.2 })
  // the backward stretch, marked once the line says it
  s.at(S(1), 0.2)
  const back = spline([[690, 470], [600, 420], [480, 450]], 12)
  s.stroke(back, { color: COL.rose, second: null, w: 3 })
  s.stroke([[505, 428], [480, 450], [508, 464]], { color: COL.rose, second: null, w: 3, step: 0.05 })
  s.anchors.loop = { p: [470, 640], t: [70, 1250], align: 'left' }
}

ARTS.retro = (s, o, n) => {
  const S = (i) => Math.min(i, n - 1)
  // The textbook diagram: Earth on the inside lane overtakes an outer planet;
  // the sight lines land on the far sky going forward, back, then forward.
  // Found by search: forward 325→664, back to 416, forward to 755.
  const cy = 1080, re = 140, rp = 200, band = 450
  const se = 40, sp = 16
  const E = [], P = [], X = []
  for (let i = 0; i < 7; i++) {
    const ae = ((-90 + (i - 3) * se) * Math.PI) / 180, ap = ((-90 + (i - 3) * sp) * Math.PI) / 180
    const e = [CX + re * Math.cos(ae), cy + re * Math.sin(ae)], p = [CX + rp * Math.cos(ap), cy + rp * Math.sin(ap)]
    const tt = (band - e[1]) / (p[1] - e[1])
    E.push(e); P.push(p); X.push([e[0] + (p[0] - e[0]) * tt, band])
  }
  s.at(0)
  s.dots(sphereDots(CX, cy, 34, 7), { color: COL.gold, dur: 0.5 })
  s.circle(CX, cy, re, { w: 1.8, dash: [5, 8], second: null })
  s.circle(CX, cy, rp, { w: 1.8, dash: [5, 8], second: COL.gold })
  s.line(120, band, 960, band, { w: 1.6, second: null, alpha: 0.6, dash: [2, 8] })
  s.text('THE FAR SKY', 960, band - 30, { font: '400 18px "Space Mono"', color: rgba(COL.ink, 0.6), spacing: 4, align: 'right' })
  for (let i = 0; i < 7; i++) {
    s.push({ kind: 'dot', x: E[i][0], y: E[i][1], r: 8, color: COL.mint, dur: 0.25 }, { step: 0.05 })
    s.push({ kind: 'dot', x: P[i][0], y: P[i][1], r: 8, color: COL.lilac2, dur: 0.25 }, { step: 0.05 })
  }
  s.at(S(o.sightAt ?? 1))
  for (let i = 0; i < 7; i++) {
    s.line(E[i][0], E[i][1], X[i][0], X[i][1], { w: 1.3, color: rgba(COL.ink, 0.55), second: null, step: 0.16 })
    s.push({ kind: 'dot', x: X[i][0], y: X[i][1], r: 7, color: COL.rose, dur: 0.3 }, { step: 0.02 })
    s.text(String(i + 1), X[i][0], X[i][1] - 26, { font: '700 18px "Space Mono"', color: COL.rose, dur: 0.3, step: 0.02 })
  }
  s.at(S(o.pathAt ?? 2))
  // the apparent path through the landing points, lifted into a loop
  const lift = [0, -8, -36, -80, -46, -12, 0]
  const loop = spline(X.map((p, i) => [p[0], p[1] - 66 + lift[i]]), 20)
  s.stroke(loop, { color: COL.gold, second: COL.ink, w: 3.2 })
  s.anchors.planet = { p: [P[3][0] + 12, P[3][1] - 8], t: [1010, 1300], align: 'right' }
  s.anchors.earth = { p: [E[3][0] - 10, E[3][1] + 6], t: [70, 1300], align: 'left' }
  s.anchors.path = { p: [X[3][0], X[3][1] - 150], t: [70, band - 150], align: 'left' }
}

ARTS.eclipse = (s, o, n) => {
  const R = 230
  const sun = [CX, CY]
  const corona = []
  const r = s.r
  for (let i = 0; i < 140; i++) {
    const a = (i / 140) * TAU + r() * 0.02
    const l = 30 + Math.pow(r(), 2.2) * 220
    corona.push([a, l])
  }
  s.at(0)
  s.dots(sphereDots(sun[0], sun[1], R, 10, { light: [0, 0], lo: 0.55, order: 'radial' }), { color: COL.gold, dur: 1.0 })
  s.circle(sun[0], sun[1], R, { w: 2.4, color: COL.ink })
  s.fn((g, k, t, env) => {
    // the moon slides across and covers the sun, then the corona flares
    const f = ease(clamp((t - 0.6) / Math.max(2.5, (env.stages[Math.min(2, env.stages.length - 1)] ?? 3) - 0.4)))
    const mx = lerp(CX + 640, CX, f), my = lerp(CY - 160, CY, f)
    const cov = clamp(1 - Math.hypot(mx - CX, my - CY) / (2 * R))
    if (cov > 0.9) {
      const q = easeOut(clamp((cov - 0.9) / 0.1))
      g.save()
      g.strokeStyle = rgba(COL.ink, 0.75 * q)
      g.lineWidth = 1.4
      g.beginPath()
      for (const [a, l] of corona) {
        const ll = l * (0.92 + 0.08 * Math.sin(t * 1.3 + a * 5)) * q
        g.moveTo(CX + (R + 8) * Math.cos(a), CY + (R + 8) * Math.sin(a))
        g.lineTo(CX + (R + 8 + ll) * Math.cos(a), CY + (R + 8 + ll) * Math.sin(a))
      }
      g.stroke()
      g.restore()
    }
    g.save()
    g.globalAlpha *= easeOut(k)
    g.fillStyle = '#0d0724'
    g.beginPath()
    g.arc(mx, my, R - 2, 0, TAU)
    g.fill()
    g.strokeStyle = COL.ink
    g.lineWidth = 2.4
    g.stroke()
    g.strokeStyle = rgba(COL.lilac, 0.7)
    g.beginPath()
    g.arc(mx + 3, my + 2.5, R - 2, 0, TAU)
    g.stroke()
    // earthshine: faint halftone on the moon's face
    g.fillStyle = rgba(COL.lilac, 0.32)
    g.beginPath()
    for (const d of env.moonDots) {
      g.moveTo(mx + d.x + d.r, my + d.y)
      g.arc(mx + d.x, my + d.y, d.r, 0, TAU)
    }
    g.fill()
    g.restore()
    env.moonAt = [mx, my]
  }, { dur: 0.6 })
  s.env = { moonDots: sphereDots(0, 0, R - 14, 13, { light: [0.5, 0.4], lo: 0.05 }) }
  s.anchors.moon = { p: [CX + R * 0.7, CY + R * 0.72], t: [1010, CY + 450], align: 'right' }
  s.anchors.sun = { p: [CX - R * 0.7, CY - R * 0.72], t: [70, CY - 440], align: 'left' }
}

ARTS.syzygy = (s, o, n) => {
  const S = (i) => Math.min(i, n - 1)
  const y = CY + 20
  const sun = [150, y], earth = [880, y]
  const moonX = 590
  const off = o.offline ? -190 : 0
  const alignAt = o.alignAt != null ? S(o.alignAt) : null
  s.at(0)
  // the sun, too big to fit: a halftone arc coming in from the left
  s.dots(halftone((x, yy) => Math.hypot(x - sun[0] + 120, yy - y) < 300 && x > 0, [0, y - 300, 200, y + 300], 11,
    (x, yy) => 0.5 + 0.5 * (1 - Math.hypot(x - sun[0] + 120, yy - y) / 300), (x, yy) => Math.abs(yy - y) / 300), { color: COL.gold, dur: 0.9 })
  s.stroke(arcPts(sun[0] - 120, y, 300, -1.2, 1.2), { color: COL.ink, w: 2.4 })
  s.line(40, y, 1040, y, { color: COL.gold, second: null, w: 1.8, dash: [6, 9] })
  s.dots(sphereDots(earth[0], earth[1], 92, 8.5, { light: [-0.9, -0.2] }), { color: COL.mint, dur: 0.8 })
  s.circle(earth[0], earth[1], 92, { w: 2.4 })
  s.text('SUN', 120, y - 330, { font: '700 20px "Space Mono"', color: COL.gold, spacing: 5 })
  s.text('EARTH', earth[0], y + 140, { font: '700 20px "Space Mono"', color: COL.mint, spacing: 5 })
  // the moon's empty seat on the line
  s.circle(moonX, y, 46, { w: 1.6, dash: [3, 7], second: null, color: rgba(COL.ink, 0.5) })
  const moonDots = sphereDots(0, 0, 46, 7, { light: [-0.9, -0.1] })
  s.fn((g, k, t, env) => {
    let f = 0
    if (alignAt != null) f = ease(clamp((t - env.stages[alignAt] - 0.2) / 1.6))
    else if (!o.offline) f = 1
    const my = y + off * (1 - f)
    // shadow cone to the earth once the three are in line
    if (f > 0.95) {
      const q = clamp((f - 0.95) / 0.05)
      g.save()
      g.globalAlpha *= q
      g.fillStyle = rgba(COL.void, 0.6)
      g.strokeStyle = rgba(COL.ink, 0.6)
      g.lineWidth = 1.4
      g.beginPath()
      g.moveTo(moonX, y - 46)
      g.lineTo(earth[0] - 6, y - 8)
      g.lineTo(earth[0] - 6, y + 8)
      g.lineTo(moonX, y + 46)
      g.closePath()
      g.fill()
      g.stroke()
      g.restore()
    }
    g.save()
    g.translate(moonX, my)
    g.globalAlpha *= easeOut(k)
    g.fillStyle = COL.lilac2
    g.beginPath()
    for (const d of moonDots) {
      g.moveTo(d.x + d.r, d.y)
      g.arc(d.x, d.y, d.r, 0, TAU)
    }
    g.fill()
    g.strokeStyle = COL.ink
    g.lineWidth = 2.4
    g.beginPath()
    g.arc(0, 0, 46, 0, TAU)
    g.stroke()
    g.restore()
    g.fillStyle = rgba(COL.lilac2, easeOut(k))
    g.font = '700 20px "Space Mono"'
    g.letterSpacing = '5px'
    g.textAlign = 'center'
    g.fillText('MOON', moonX, my - 70)
    g.letterSpacing = '0px'
    if (o.offline && f < 0.05) {
      // a dotted drop line showing how far out of line it is
      g.setLineDash([2, 7])
      g.strokeStyle = rgba(COL.rose, 0.8 * k)
      g.lineWidth = 2
      g.beginPath()
      g.moveTo(moonX, my + 52)
      g.lineTo(moonX, y - 52)
      g.stroke()
      g.setLineDash([])
    }
  }, { dur: 0.7 })
  s.anchors.moon = { p: [moonX + 40, y + off + 30], t: [1010, y - 420], align: 'right' }
  s.anchors.line = { p: [320, y], t: [70, y + 300], align: 'left' }
}

ARTS.venus = (s, o, n) => {
  const S = (i) => Math.min(i, n - 1)
  const r = 205, cy = CY - 120
  const bot = cy + r
  s.at(0)
  s.circle(CX, cy, r, { w: 3.4, from: Math.PI / 2 })
  s.line(CX, bot, CX, bot + 300, { w: 3.4 })
  s.line(CX - 120, bot + 150, CX + 120, bot + 150, { w: 3.4 })
  s.dots(halftone((x, y) => Math.hypot(x - CX, y - cy) < r - 10, [CX - r, cy - r, CX + r, cy + r], 10,
    (x, y) => 0.2 + 0.8 * clamp(1 - Math.hypot(x - CX + 70, y - cy + 80) / (r * 1.6)), (x, y) => Math.hypot(x - CX + 70, y - cy + 80) / (r * 1.8)), { color: COL.rose, dur: 1.2 })
  // small orbiting motes, like planets on a dial
  s.fn((g, k, t) => {
    for (let i = 0; i < 3; i++) {
      const a = t * (0.35 + i * 0.12) + i * 2.1
      const rr = r + 70 + i * 34
      const px = CX + rr * Math.cos(a), py = cy + rr * Math.sin(a) * 0.9
      g.fillStyle = rgba([COL.gold, COL.lilac2, COL.mint][i], 0.85 * k)
      g.beginPath()
      g.arc(px, py, 7 + i * 2, 0, TAU)
      g.fill()
    }
  }, { dur: 0.6 })
  if (o.mirror) {
    s.at(S(o.mirrorAt ?? 1))
    // glass sheen: three diagonal strokes clipped to the circle
    for (const [d, w] of [[-90, 3], [-40, 1.8], [10, 1.2]]) {
      const pts = []
      for (let i = 0; i <= 20; i++) {
        const x = CX - r + (i / 20) * 2 * r
        const y = cy + (x - CX) * -1 + d
        if (Math.hypot(x - CX, y - cy) < r - 22) pts.push([x, y])
      }
      if (pts.length > 1) s.stroke(pts, { color: COL.ink, second: null, w, alpha: 0.8, step: 0.15 })
    }
    s.glyph('✦', CX + 70, cy + 60, 64, { color: COL.ink, glow: true })
    s.stroke(arcPts(CX, cy, r + 22, Math.PI * 0.9, Math.PI * 1.6), { color: COL.gold, second: null, w: 2, dash: [3, 8] })
  }
  s.anchors.glass = { p: [CX + r * 0.72, cy - r * 0.7], t: [1010, cy - r - 90], align: 'right' }
  s.anchors.handle = { p: [CX + 120, bot + 150], t: [1010, bot + 330], align: 'right' }
}

// ---------- background, motes, grain ----------

let bg, grainTiles = [], twinkles = [], motes = []
function makeBackground() {
  bg = layer()
  const g = bg.getContext('2d')
  const grd = g.createRadialGradient(CX, CY, 60, CX, CY, 1250)
  grd.addColorStop(0, '#1c1040')
  grd.addColorStop(0.45, '#120a2c')
  grd.addColorStop(1, '#06031a')
  g.fillStyle = grd
  g.fillRect(0, 0, W, H)
  const r = rng(5)
  // faint lilac and rose haze
  for (let i = 0; i < 7; i++) {
    const x = r() * W, y = 200 + r() * 1400, s = 250 + r() * 380
    const h = g.createRadialGradient(x, y, 0, x, y, s)
    h.addColorStop(0, rgba(i % 3 ? COL.lilac : COL.rose, 0.05))
    h.addColorStop(1, rgba(COL.lilac, 0))
    g.fillStyle = h
    g.fillRect(x - s, y - s, s * 2, s * 2)
  }
  for (let i = 0; i < 420; i++) {
    g.fillStyle = rgba(COL.ink, 0.08 + r() * 0.3)
    g.beginPath()
    g.arc(r() * W, r() * H, 0.6 + r() * 1.3, 0, TAU)
    g.fill()
  }
  // vignette
  const v = g.createRadialGradient(CX, H * 0.45, 500, CX, H * 0.45, 1300)
  v.addColorStop(0, 'rgba(0,0,0,0)')
  v.addColorStop(1, 'rgba(3,1,12,0.55)')
  g.fillStyle = v
  g.fillRect(0, 0, W, H)

  for (let i = 0; i < 4; i++) {
    const c = layer(256, 256)
    const cg = c.getContext('2d')
    const d = cg.createImageData(256, 256)
    const rr = rng(31 + i)
    for (let p = 0; p < d.data.length; p += 4) {
      const val = rr() * 255
      d.data[p] = d.data[p + 1] = d.data[p + 2] = val
      d.data[p + 3] = 255
    }
    cg.putImageData(d, 0, 0)
    grainTiles.push(c)
  }
  for (let i = 0; i < 46; i++) twinkles.push({ x: r() * W, y: r() * 1500 + 80, s: 1 + r() * 2.4, ph: r() * TAU, sp: 0.6 + r() * 1.6 })
  // drifting grid motes in Align's reading colours
  const cols = [COL.gold, COL.lilac2, COL.mint, COL.rose]
  for (let i = 0; i < 10; i++) motes.push({ x: r() * W, y: 260 + r() * 1100, r: 11 + r() * 8, c: cols[i % 4], vx: (r() - 0.5) * 9, vy: (r() - 0.5) * 7, ph: r() * TAU })
}

function drawMotes(g, t, a) {
  for (const m of motes) {
    const x = m.x + m.vx * t + Math.sin(t * 0.5 + m.ph) * 10
    const y = m.y + m.vy * t + Math.cos(t * 0.4 + m.ph) * 10
    // skip anything drifting into the caption band
    if (y > 1300 || x < -20 || x > W + 20) continue
    g.save()
    g.globalAlpha = a * 0.55
    g.beginPath()
    g.arc(x, y, m.r, 0, TAU)
    g.fillStyle = rgba(m.c, 0.25)
    g.fill()
    g.clip()
    g.strokeStyle = m.c
    g.lineWidth = 1.6
    g.beginPath()
    for (let d = -m.r; d <= m.r; d += 5.5) {
      g.moveTo(x - m.r, y + d)
      g.lineTo(x + m.r, y + d)
      g.moveTo(x + d, y - m.r)
      g.lineTo(x + d, y + m.r)
    }
    g.stroke()
    g.restore()
  }
}

// ---------- captions ----------

const CAP = { size: 60, lh: 80, maxW: 860, y: 1405 }
const PILL_Y = 1590
let lines = [] // {start, end, words: [{w, em, s, e, x, y, width}], scene}
function layoutCaptions(tl) {
  lines = tl.lines.map((ln) => {
    const words = ln.words.map((w) => ({ ...w }))
    // measure, then wrap greedily and balance into rows
    for (const w of words) {
      ctx.font = `${w.em ? 700 : 400} ${CAP.size}px Poppins`
      w.width = ctx.measureText(w.w).width
    }
    ctx.font = `400 ${CAP.size}px Poppins`
    const space = ctx.measureText(' ').width
    const total = words.reduce((a, w) => a + w.width, 0) + space * (words.length - 1)
    const rowsN = Math.max(1, Math.ceil(total / CAP.maxW))
    const target = total / rowsN
    const rows = [[]]
    let acc = 0
    for (const w of words) {
      const row = rows[rows.length - 1]
      const add = (row.length ? space : 0) + w.width
      if (row.length && (acc + add > CAP.maxW || (acc + add / 2 > target * 1.02 && rows.length < rowsN))) {
        rows.push([w])
        acc = w.width
      } else {
        row.push(w)
        acc += add
      }
    }
    const y0 = CAP.y - ((rows.length - 1) * CAP.lh) / 2
    rows.forEach((row, ri) => {
      const rw = row.reduce((a, w) => a + w.width, 0) + space * (row.length - 1)
      let x = CX - rw / 2
      for (const w of row) {
        w.x = x
        w.y = y0 + ri * CAP.lh
        x += w.width + space
      }
    })
    return { ...ln, words }
  })
}

function drawCaptions(g, t) {
  // Lines within a scene hand over at one moment: the old line fades out
  // just before it, the new one fades in just after, never both at once.
  const handover = (a, b) => Math.max(a.end, b.start - 0.25)
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i]
    const prev = lines[i - 1], next = lines[i + 1]
    const samePrev = prev && prev.scene === ln.scene
    const sameNext = next && next.scene === ln.scene
    const show = i === 0 ? -1 : samePrev ? handover(prev, ln) : ln.start - 0.22
    const fadeIn = i === 0 ? 1 : clamp((t - show) / 0.12)
    const fadeOut = sameNext ? clamp((handover(ln, next) - t) / 0.12) : 1 - clamp((t - ln.hideAt) / 0.18)
    if (t < show || fadeOut <= 0) continue
    const a = Math.min(fadeIn, fadeOut)
    const lift = i === 0 ? 0 : (1 - easeOut(clamp((t - show) / 0.25))) * 14
    g.save()
    g.globalAlpha = a
    g.textBaseline = 'middle'
    for (const w of ln.words) {
      const spoken = clamp((t - w.s + 0.04) / 0.12)
      const active = t >= w.s - 0.04 && t < w.e + 0.12
      g.font = `${w.em ? 700 : 400} ${CAP.size}px Poppins`
      g.shadowColor = 'rgba(0,0,0,0)'
      g.shadowBlur = 0
      if (w.em && spoken > 0) {
        g.shadowColor = active ? 'rgba(255,236,200,0.95)' : 'rgba(242,199,92,0.45)'
        g.shadowBlur = active ? 30 : 16
      }
      const dim = [125, 111, 148], lit = /^([A-Z]{3,}|Align)[.,]?$/.test(w.w) ? [242, 199, 92] : [239, 230, 214]
      const c = dim.map((v, j) => Math.round(lerp(v, lit[j], spoken)))
      g.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${lerp(0.62, 1, spoken)})`
      g.fillText(w.w, w.x, w.y + lift)
      if (w.em && active) g.fillText(w.w, w.x, w.y + lift)
    }
    g.restore()
  }
}

// ---------- the pill ----------

function drawPill(g, t, pill) {
  if (!pill || t < pill.at) return
  const k = clamp((t - pill.at) / 0.55)
  // a little spring overshoot
  const sc = 1 + Math.sin(k * Math.PI) * 0.08 * (1 - k) + (1 - easeOut(k)) * -0.4
  g.save()
  g.font = '600 30px Poppins'
  g.letterSpacing = '3px'
  const tw = g.measureText(pill.text).width
  const w = tw + 150, h = 96, x = CX - w / 2, y = PILL_Y - h / 2
  g.translate(CX, PILL_Y)
  g.scale(sc, sc)
  g.translate(-CX, -PILL_Y)
  g.globalAlpha = easeOut(k)
  g.shadowColor = 'rgba(255,240,250,0.55)'
  g.shadowBlur = 50
  const grd = g.createLinearGradient(x, y, x + w, y + h)
  grd.addColorStop(0, '#f8edff')
  grd.addColorStop(0.38, '#fff7ec')
  grd.addColorStop(0.72, '#eaf4ff')
  grd.addColorStop(1, '#ffeff7')
  g.fillStyle = grd
  g.beginPath()
  g.roundRect(x, y, w, h, h / 2)
  g.fill()
  g.shadowBlur = 0
  // a sheen that sweeps across once
  const sx = x + ((t - pill.at) * 900) % (w * 3) - w
  const sh = g.createLinearGradient(sx, 0, sx + 160, 0)
  sh.addColorStop(0, 'rgba(255,255,255,0)')
  sh.addColorStop(0.5, 'rgba(255,255,255,0.7)')
  sh.addColorStop(1, 'rgba(255,255,255,0)')
  g.save()
  g.clip()
  g.fillStyle = sh
  g.fillRect(x, y, w, h)
  g.restore()
  g.fillStyle = COL.chromeInk
  g.textBaseline = 'middle'
  g.textAlign = 'left'
  const gl = glyphPath('✦')
  g.save()
  g.translate(x + 62, y + h / 2)
  g.scale(0.03, 0.03)
  g.fill(gl.path)
  g.restore()
  g.fillText(pill.text, x + 98, y + h / 2 + 2)
  g.restore()
}

// ---------- scenes ----------

let SC = [] // {start, end, sketch, stages (scene-local line starts), header}
let PILL = null
let DURATION = 0
let artLayer, glowLayer

function build(script, tl) {
  SC = script.scenes.map((sc, i) => {
    const t = tl.scenes[i]
    const s = new Sketch(hash(script.id + i))
    const n = sc.lines.length
    ARTS[sc.art](s, sc.opts ?? {}, n)
    for (const [li, lb] of (sc.labels ?? []).entries()) {
      const anchor = s.anchors[lb.on] ?? Object.values(s.anchors)[li]
      if (anchor) s.label(lb.text, anchor, { stage: Math.min(lb.at ?? li, n - 1) })
    }
    const stages = t.lines.map((ln) => ln.start - t.start)
    stages[0] = i === 0 ? -1.1 : 0
    return { start: t.start, end: t.end, s, stages, header: sc.header, env: { ...(s.env ?? {}), stages, dur: t.end - t.start } }
  })
  const last = script.scenes[script.scenes.length - 1]
  const lt = tl.scenes[tl.scenes.length - 1]
  if (last.pill) PILL = { text: last.pill, at: lt.lines[Math.min(last.pillAt ?? 1, lt.lines.length - 1)].start + 0.25 }
  DURATION = tl.duration
}

function drawScene(g, sc, t, full = false) {
  const lt = t - sc.start
  const outK = full ? 0 : clamp((t - sc.end) / FADE_OUT)
  if (outK >= 1 || lt < 0) return
  g.save()
  g.globalAlpha = 1 - easeOut(outK)
  const fl = sc.s.float ? Math.sin(lt * 1.1) * sc.s.float : 0
  const sc2 = 1 + outK * 0.02
  g.translate(CX, CY)
  g.scale(sc2, sc2)
  g.translate(-CX, -CY + fl)
  const passes = sc.s.reflect != null ? [false, true] : [false]
  for (const refl of passes) {
    g.save()
    if (refl) {
      g.translate(0, sc.s.reflect * 2 + 8)
      g.scale(1, -1)
      g.globalAlpha *= 0.16
      g.beginPath()
      g.rect(0, sc.s.reflect - 210, W, 210)
      g.clip()
    }
    for (const it of sc.s.items) {
      const st = sc.stages[it.stage] ?? 0
      let k = full ? 1 : ease(clamp((lt - st - it.delay) / it.dur))
      if (k <= 0) continue
      g.save()
      g.globalAlpha *= it.alpha
      if (it.lift != null && !full) {
        const lk = clamp((lt - (sc.stages[it.lift] ?? 99)) / 0.9)
        if (lk >= 1) { g.restore(); continue }
        g.globalAlpha *= 1 - easeOut(lk)
        g.translate(0, -lk * 70)
      } else if (it.lift != null && full) { g.restore(); continue }
      drawItem(g, it, k, full ? 8 : lt, sc.env)
      g.restore()
    }
    g.restore()
  }
  g.restore()
}

function drawHeader(g, sc, t, y = 250) {
  if (!sc.header) return
  const lt = t - sc.start
  const outK = clamp((t - sc.end) / FADE_OUT)
  if (lt < 0 || outK >= 1) return
  const k = clamp((lt - 0.2) / 0.8)
  const str = sc.header.slice(0, Math.ceil(sc.header.length * k))
  g.save()
  g.globalAlpha = (1 - outK) * 0.8
  g.font = '400 23px "Space Mono"'
  g.letterSpacing = '7px'
  g.textAlign = 'center'
  g.fillStyle = COL.ink
  g.fillText(str, CX, y)
  g.restore()
}

// Align's wordmark as the app sets it on the splash: serif italic, bone, a soft glow.
function drawWordmark(g, y, a = 0.6) {
  g.save()
  g.globalAlpha = a
  g.font = 'italic 500 46px "EB Garamond"'
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.shadowColor = 'rgba(239,230,214,0.35)'
  g.shadowBlur = 18
  g.fillStyle = COL.ink
  g.fillText('Align', CX, y)
  g.restore()
}

function paint(t, { cover = false } = {}) {
  ctx.drawImage(bg, 0, 0)
  // twinkles
  for (const s of twinkles) {
    const a = 0.25 + 0.6 * (0.5 + 0.5 * Math.sin(t * s.sp + s.ph))
    ctx.fillStyle = rgba(COL.ink, a * 0.8)
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.s, 0, TAU)
    ctx.fill()
  }
  drawMotes(ctx, t, 1)
  // line art on its own layer so it can glow
  const ag = artLayer.getContext('2d')
  ag.clearRect(0, 0, W, H)
  if (cover) drawScene(ag, SC[0], SC[0].end - 0.01, true)
  else for (const sc of SC) drawScene(ag, sc, t)
  const gg = glowLayer.getContext('2d')
  gg.clearRect(0, 0, glowLayer.width, glowLayer.height)
  gg.filter = 'blur(7px)'
  gg.drawImage(artLayer, 0, 0, glowLayer.width, glowLayer.height)
  gg.filter = 'none'
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  ctx.globalAlpha = 0.55
  ctx.drawImage(glowLayer, 0, 0, W, H)
  ctx.restore()
  ctx.drawImage(artLayer, 0, 0)
  drawWordmark(ctx, cover ? 262 : 184)
  if (cover) {
    drawHeader(ctx, { ...SC[0], end: 1e9 }, 99, 318)
  } else {
    for (const sc of SC) drawHeader(ctx, sc, t)
    drawCaptions(ctx, t)
    drawPill(ctx, t, PILL)
  }
  // grain
  ctx.save()
  ctx.globalCompositeOperation = 'overlay'
  ctx.globalAlpha = 0.07
  const tile = grainTiles[Math.floor(t * 24) % grainTiles.length]
  for (let y = 0; y < H; y += 256) for (let x = 0; x < W; x += 256) ctx.drawImage(tile, x, y)
  ctx.restore()
  // open from and close to the sky
  const edge = cover ? 1 : clamp((DURATION - t) / 0.6)
  if (edge < 1) {
    ctx.fillStyle = `rgba(6,3,20,${1 - edge})`
    ctx.fillRect(0, 0, W, H)
  }
}

// cover text: the hook, fully lit, in the caption position
function paintCoverText(text) {
  const words = text.split(/\s+/).map((w) => ({ w: w.replace(/\*/g, ''), em: /\*/.test(w), s: -1, e: -1 }))
  const saved = lines
  layoutCaptions({ lines: [{ start: 0, end: 0, words, scene: 0, hideAt: 1e9 }] })
  drawCaptions(ctx, 50)
  lines = saved
}

window.setup = async (data) => {
  GLYPHS = data.glyphs
  for (const [family, src, style, weight] of data.fonts) {
    const f = new FontFace(family, `url(${src})`, { style, weight })
    await f.load()
    document.fonts.add(f)
  }
  await document.fonts.ready
  artLayer = layer()
  glowLayer = layer(W / 2, H / 2)
  makeBackground()
  build(data.script, data.timeline)
  layoutCaptions(data.timeline)
  return { duration: DURATION }
}

window.frame = (t, q = 0.9) => {
  paint(t)
  return canvas.toDataURL('image/jpeg', q)
}

window.cover = (text, q = 0.92) => {
  paint(99, { cover: true })
  paintCoverText(text)
  return canvas.toDataURL('image/jpeg', q)
}

// A square still of one scene, fully drawn, without words: profile pictures.
window.still = (sceneIndex, { zoom = 1, cy = CY, header = false } = {}) => {
  const sc = SC[sceneIndex]
  ctx.drawImage(bg, 0, 0)
  drawMotes(ctx, 3, 0.8)
  const ag = artLayer.getContext('2d')
  ag.clearRect(0, 0, W, H)
  ag.save()
  ag.translate(CX, cy)
  ag.scale(zoom, zoom)
  ag.translate(-CX, -cy)
  drawScene(ag, { ...sc, end: 1e9 }, sc.start + 8)
  ag.restore()
  const gg = glowLayer.getContext('2d')
  gg.clearRect(0, 0, glowLayer.width, glowLayer.height)
  gg.filter = 'blur(7px)'
  gg.drawImage(artLayer, 0, 0, glowLayer.width, glowLayer.height)
  gg.filter = 'none'
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  ctx.globalAlpha = 0.55
  ctx.drawImage(glowLayer, 0, 0, W, H)
  ctx.restore()
  ctx.drawImage(artLayer, 0, 0)
  if (header) drawHeader(ctx, { ...sc, end: 1e9 }, sc.start + 9)
  return canvas.toDataURL('image/png')
}
