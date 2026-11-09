// Align "Portals" reels: the scene engine. Runs in a browser page.
// setup(data) builds every scene as a cloud of dots, then frame(t) paints
// one frame at t seconds: a black sky with faint twinkling stars, glowing
// dot-matrix / LED-pixel objects that build dot by dot, sparkle as each dot
// lands, and dissolve into drifting dust between beats; a three-step tracker
// at the top, a small gold mono label under the object, karaoke captions in
// the lower third and a "+ FOLLOW" pill at the end. All art is drawn in code
// and seeded, so a script always renders the same video.

const W = 1080
const H = 1920
const CX = 540
const CY = 800
const DUST = 1.05 // seconds a dot takes to blow away
const LABEL_Y = 1395
const TRACK_Y = 176

const canvas = document.getElementById('c')
canvas.width = W
canvas.height = H
const ctx = canvas.getContext('2d')

const COL = {
  ink: '#f3ece0', white: '#ffffff', gold: '#e8c77a', goldHi: '#ffe2a6', amber: '#d9a94f',
  violet: '#8f7cf2', lilac: '#c7bcff', rose: '#f2a5b8', dim: '#6c6874',
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

// ---------- dot sprites ----------
// One pre-rendered round dot per colour: a crisp core with a soft rim.

const SPR = {}
const SR = 12 // sprite dot radius
function sprite(c) {
  if (SPR[c]) return SPR[c]
  const s = layer(SR * 2 + 8, SR * 2 + 8)
  const g = s.getContext('2d')
  const m = SR + 4
  const grd = g.createRadialGradient(m, m, 0, m, m, SR + 2)
  grd.addColorStop(0, c)
  grd.addColorStop(0.72, c)
  grd.addColorStop(0.9, rgba(c, 0.45))
  grd.addColorStop(1, rgba(c, 0))
  g.fillStyle = grd
  g.beginPath()
  g.arc(m, m, SR + 2, 0, TAU)
  g.fill()
  SPR[c] = s
  return s
}
function dot(g, x, y, r, c, a) {
  if (a <= 0.003 || r <= 0.05) return
  const s = r / SR, sz = (SR * 2 + 8) * s
  g.globalAlpha = a
  g.drawImage(sprite(c), x - sz / 2, y - sz / 2, sz, sz)
}
// A soft round glow (for cores, heads, halos).
function glow(g, x, y, r, c, a) {
  if (a <= 0) return
  const grd = g.createRadialGradient(x, y, 0, x, y, r)
  grd.addColorStop(0, rgba(c, a))
  grd.addColorStop(0.35, rgba(c, a * 0.35))
  grd.addColorStop(1, rgba(c, 0))
  g.fillStyle = grd
  g.fillRect(x - r, y - r, r * 2, r * 2)
}
// A four-point sparkle.
function sparkle(g, x, y, r, c, a, rot = 0) {
  if (a <= 0) return
  g.save()
  g.translate(x, y)
  g.rotate(rot)
  g.globalAlpha = a
  g.fillStyle = c
  g.beginPath()
  for (let i = 0; i < 8; i++) {
    const ang = (i * Math.PI) / 4
    const rr = i % 2 ? r * 0.16 : r
    g.lineTo(Math.cos(ang) * rr, Math.sin(ang) * rr)
  }
  g.closePath()
  g.fill()
  g.restore()
}

// ---------- geometry → dots ----------

// Even points along a polyline.
function resample(pts, gap, closed = false) {
  const p = closed ? [...pts, pts[0]] : pts
  const out = []
  let carry = 0
  for (let i = 1; i < p.length; i++) {
    const [x0, y0] = p[i - 1], [x1, y1] = p[i]
    const L = Math.hypot(x1 - x0, y1 - y0)
    let d = carry
    while (d <= L) {
      const k = L ? d / L : 0
      out.push([lerp(x0, x1, k), lerp(y0, y1, k)])
      d += gap
    }
    carry = d - L
  }
  return out
}
function arcPts(cx, cy, r, a0, a1, n = 120) {
  const out = []
  for (let i = 0; i <= n; i++) {
    const a = lerp(a0, a1, i / n)
    out.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r])
  }
  return out
}
const dLine = (x0, y0, x1, y1, gap) => resample([[x0, y0], [x1, y1]], gap)
const dCircle = (cx, cy, r, gap) => resample(arcPts(cx, cy, r, -Math.PI / 2, Math.PI * 1.5, 180), gap)
function rrectPts(x, y, w, h, rad = 0) {
  if (!rad) return [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]
  return [
    ...arcPts(x + w - rad, y + rad, rad, -Math.PI / 2, 0, 10),
    ...arcPts(x + w - rad, y + h - rad, rad, 0, Math.PI / 2, 10),
    ...arcPts(x + rad, y + h - rad, rad, Math.PI / 2, Math.PI, 10),
    ...arcPts(x + rad, y + rad, rad, Math.PI, Math.PI * 1.5, 10),
  ]
}
// Dotted rectangle starting at the top centre, so it can draw both ways.
function dRect(x, y, w, h, gap, rad = 0) {
  const pts = rrectPts(x, y, w, h, rad)
  // rotate so it starts at top centre
  const start = [[x + w / 2, y]]
  const idx = pts.findIndex((p) => p[0] >= x + w / 2 && p[1] <= y + rad + 0.01)
  const ring = [...start, ...pts.slice(idx < 0 ? 1 : idx), ...pts.slice(0, idx < 0 ? 1 : idx)]
  return resample(ring, gap, true)
}
function dWave(x0, x1, y, amp, wl, gap) {
  const pts = []
  for (let x = x0; x <= x1; x += 2) pts.push([x, y + Math.sin(((x - x0) / wl) * TAU) * amp])
  return resample(pts, gap)
}
function starPoly(cx, cy, ro, ri, rot = -Math.PI / 2, n = 5) {
  const out = []
  for (let i = 0; i < n * 2; i++) {
    const a = rot + (i * Math.PI) / n
    const r = i % 2 ? ri : ro
    out.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r])
  }
  return out
}
function heartPts(cx, cy, s, n = 90) {
  const out = []
  for (let i = 0; i < n; i++) {
    const t = (i / n) * TAU
    const x = 16 * Math.pow(Math.sin(t), 3)
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
    out.push([cx + (x * s) / 16, cy + (y * s) / 16])
  }
  return out
}
function inPoly(x, y, poly) {
  let ins = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) ins = !ins
  }
  return ins
}
// Grid of points inside a polygon.
function fillPoly(poly, pitch) {
  const xs = poly.map((p) => p[0]), ys = poly.map((p) => p[1])
  const out = []
  for (let y = Math.min(...ys) + pitch / 2; y < Math.max(...ys); y += pitch)
    for (let x = Math.min(...xs) + pitch / 2; x < Math.max(...xs); x += pitch) if (inPoly(x, y, poly)) out.push([x, y])
  return out
}

// ---------- text and glyphs → dots ----------

const scratch = layer(1400, 700)
const sg = scratch.getContext('2d', { willReadFrequently: true })

// Sample a filled drawing on a grid. draw(g) paints into a w×h box.
function sampleDraw(w, h, pitch, draw, thresh = 120) {
  w = Math.ceil(w); h = Math.ceil(h)
  if (scratch.width < w || scratch.height < h) { scratch.width = Math.max(w, scratch.width); scratch.height = Math.max(h, scratch.height) }
  sg.setTransform(1, 0, 0, 1, 0, 0)
  sg.clearRect(0, 0, scratch.width, scratch.height)
  sg.fillStyle = '#fff'
  draw(sg)
  const d = sg.getImageData(0, 0, w, h).data
  const out = []
  // centre the grid in the box so shapes sample symmetrically
  const ox = (w - Math.floor(w / pitch) * pitch) / 2 + pitch / 2
  const oy = (h - Math.floor(h / pitch) * pitch) / 2 + pitch / 2
  for (let y = oy; y < h; y += pitch)
    for (let x = ox; x < w; x += pitch) if (d[(Math.floor(y) * w + Math.floor(x)) * 4 + 3] > thresh) out.push([x, y])
  return out
}

// Big text as a grid of dots, its ink centred on (x, y).
function sampleText(str, { size = 300, x = CX, y = CY, pitch = 12, weight = 700, family = 'Poppins', spacing = 0, maxW = 1e9 } = {}) {
  sg.font = `${weight} ${size}px ${family}`
  sg.letterSpacing = `${spacing}px`
  let m = sg.measureText(str)
  let iw = m.actualBoundingBoxLeft + m.actualBoundingBoxRight
  if (iw > maxW) {
    size = Math.floor((size * maxW) / iw)
    sg.font = `${weight} ${size}px ${family}`
    m = sg.measureText(str)
    iw = m.actualBoundingBoxLeft + m.actualBoundingBoxRight
  }
  const ih = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent
  const pad = 6
  const pts = sampleDraw(iw + pad * 2, ih + pad * 2, pitch, (g) => {
    g.font = `${weight} ${size}px ${family}`
    g.letterSpacing = `${spacing}px`
    g.textBaseline = 'alphabetic'
    g.fillText(str, pad + m.actualBoundingBoxLeft, pad + m.actualBoundingBoxAscent)
  })
  sg.letterSpacing = '0px'
  const x0 = x - iw / 2 - pad, y0 = y - ih / 2 - pad
  const out = pts.map(([px, py]) => [x0 + px, y0 + py])
  out.w = iw
  out.h = ih
  out.size = size
  return out
}

let GLYPHS = {}
function glyphPath(ch) {
  const g = GLYPHS[ch]
  if (!g) return null
  if (!g.path) g.path = new Path2D(g.d)
  return g
}
// A glyph (zodiac, planet) as dots; size is the glyph's em in px.
function sampleGlyph(ch, { size = 400, x = CX, y = CY, pitch = 10, thicken = 0 } = {}) {
  const gl = glyphPath(ch)
  if (!gl) return sampleText(ch, { size, x, y, pitch, weight: 400, family: 'serif' })
  const s = size / 1000
  const w = gl.w * s + 40, h = gl.h * s + 40
  const pts = sampleDraw(w, h, pitch, (g) => {
    g.translate(w / 2, h / 2)
    g.scale(s, s)
    g.fill(gl.path)
    if (thicken) { g.lineWidth = thicken / s; g.strokeStyle = '#fff'; g.stroke(gl.path) }
  })
  const out = pts.map(([px, py]) => [x - w / 2 + px, y - h / 2 + py])
  out.w = gl.w * s
  out.h = gl.h * s
  return out
}
const isGlyph = (s) => [...s].length === 1 && !!GLYPHS[s]

// A 5×7 LED font: crisp pixel lettering for labels on the objects.
const LED_SRC = {
  A: '01110 10001 10001 11111 10001 10001 10001', B: '11110 10001 10001 11110 10001 10001 11110',
  C: '01110 10001 10000 10000 10000 10001 01110', D: '11110 10001 10001 10001 10001 10001 11110',
  E: '11111 10000 10000 11110 10000 10000 11111', F: '11111 10000 10000 11110 10000 10000 10000',
  G: '01110 10001 10000 10111 10001 10001 01111', H: '10001 10001 10001 11111 10001 10001 10001',
  I: '111 010 010 010 010 010 111', J: '00111 00010 00010 00010 00010 10010 01100',
  K: '10001 10010 10100 11000 10100 10010 10001', L: '10000 10000 10000 10000 10000 10000 11111',
  M: '10001 11011 10101 10101 10001 10001 10001', N: '10001 10001 11001 10101 10011 10001 10001',
  O: '01110 10001 10001 10001 10001 10001 01110', P: '11110 10001 10001 11110 10000 10000 10000',
  Q: '01110 10001 10001 10001 10101 10010 01101', R: '11110 10001 10001 11110 10100 10010 10001',
  S: '01111 10000 10000 01110 00001 00001 11110', T: '11111 00100 00100 00100 00100 00100 00100',
  U: '10001 10001 10001 10001 10001 10001 01110', V: '10001 10001 10001 10001 10001 01010 00100',
  W: '10001 10001 10001 10101 10101 10101 01010', X: '10001 10001 01010 00100 01010 10001 10001',
  Y: '10001 10001 01010 00100 00100 00100 00100', Z: '11111 00001 00010 00100 01000 10000 11111',
  0: '01110 10001 10011 10101 11001 10001 01110', 1: '010 110 010 010 010 010 111',
  2: '01110 10001 00001 00010 00100 01000 11111', 3: '11111 00010 00100 00010 00001 10001 01110',
  4: '00010 00110 01010 10010 11111 00010 00010', 5: '11111 10000 11110 00001 00001 10001 01110',
  6: '00110 01000 10000 11110 10001 10001 01110', 7: '11111 00001 00010 00100 01000 01000 01000',
  8: '01110 10001 10001 01110 10001 10001 01110', 9: '01110 10001 10001 01111 00001 00010 01100',
  ' ': '000 000 000 000 000 000 000', '·': '000 000 000 010 000 000 000', '/': '00001 00001 00010 00100 01000 10000 10000',
  ':': '0 1 1 0 1 1 0', '-': '0000 0000 0000 1111 0000 0000 0000', '+': '00000 00100 00100 11111 00100 00100 00000',
  '.': '0 0 0 0 0 1 1', ',': '00 00 00 00 01 01 10', "'": '1 1 1 0 0 0 0', '’': '1 1 1 0 0 0 0',
  '?': '01110 10001 00001 00010 00100 00000 00100', '!': '1 1 1 1 1 0 1', '&': '01100 10010 10100 01000 10101 10010 01101',
  '→': '00000 00100 00010 11111 00010 00100 00000', '°': '010 101 010 000 000 000 000',
  '♥': '00000 01010 11111 11111 01110 00100 00000', '✦': '00100 00100 01110 11111 01110 00100 00100',
}
const LED = Object.fromEntries(Object.entries(LED_SRC).map(([k, v]) => [k, v.split(' ')]))
// sub = 2 draws every pixel as a 2×2 cluster: bolder, denser LED.
function ledText(str, cx, cy, pitch, { align = 'center', track = 1, sub = 1 } = {}) {
  const glyphs = [...String(str).toUpperCase()].map((ch) => LED[ch] ?? LED['?'])
  const cols = glyphs.reduce((a, g) => a + g[0].length + track, -track)
  const x0 = align === 'center' ? cx - (cols * pitch) / 2 : align === 'right' ? cx - cols * pitch : cx
  const y0 = cy - 3.5 * pitch
  const out = []
  let c0 = 0
  for (const gl of glyphs) {
    for (let r = 0; r < 7; r++)
      for (let c = 0; c < gl[r].length; c++) {
        if (gl[r][c] !== '1') continue
        const x = x0 + (c0 + c + 0.5) * pitch, y = y0 + (r + 0.5) * pitch
        if (sub === 2) for (const [dx, dy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) out.push([x + (dx * pitch) / 4, y + (dy * pitch) / 4])
        else out.push([x, y])
      }
    c0 += gl[0].length + track
  }
  out.w = cols * pitch
  return out
}
const ledWidth = (str, pitch, track = 1) => [...String(str).toUpperCase()].map((ch) => LED[ch] ?? LED['?']).reduce((a, g) => a + g[0].length + track, -track) * pitch

// ---------- the sketch: a scene's dots and effects ----------
// Every dot has a build time (scene-local seconds) and an optional
// dissolve time; without one it dissolves when the scene ends.

class Sketch {
  constructor(seed, env) {
    this.r = rng(seed)
    this.env = env
    this.dots = []
    this.fxs = []
    this.tf = { dx: 0, dy: 0, s: 1 }
  }
  // scene-local time of caption line `stage`, plus a delay
  T(stage = 0, delay = 0) {
    const st = this.env.stages
    return (st[clamp(stage, 0, st.length - 1)] ?? 0) + delay
  }
  P(x, y) {
    const { dx, dy, s } = this.tf
    return [CX + (x - CX) * s + dx, CY + (y - CY) * s + dy]
  }
  add(pts, o = {}) {
    const n = pts.length
    if (!n) return []
    const t0 = o.t ?? this.T(o.stage ?? 0, o.delay ?? 0)
    const dur = o.dur ?? 0.9
    const order = o.order ?? 'path'
    let ks
    if (order === 'path') ks = pts.map((_, i) => i / Math.max(1, n - 1))
    else if (order === 'both') ks = pts.map((_, i) => Math.min(i, n - i) / Math.max(1, n / 2))
    else {
      const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1])
      const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys)
      const cx = o.cx ?? (x0 + x1) / 2, cy = o.cy ?? (y0 + y1) / 2
      const rad = Math.max(1, ...pts.map((p) => Math.hypot(p[0] - cx, p[1] - cy)))
      const f = {
        sweep: (p) => (p[0] - x0) / Math.max(1, x1 - x0),
        down: (p) => (p[1] - y0) / Math.max(1, y1 - y0),
        up: (p) => (y1 - p[1]) / Math.max(1, y1 - y0),
        scan: (p) => ((p[1] - y0) / Math.max(1, y1 - y0)) * 0.6 + ((p[0] - x0) / Math.max(1, x1 - x0)) * 0.4,
        radial: (p) => Math.hypot(p[0] - cx, p[1] - cy) / rad,
        random: () => this.r(),
      }[order]
      const mix = o.mix ?? 0.35 // how much randomness: dots land one by one, not as a wipe
      ks = pts.map((p) => clamp(f(p) * (1 - mix) + this.r() * mix))
    }
    const out = []
    pts.forEach((p, i) => {
      const [x, y] = this.P(p[0], p[1])
      const d = {
        x, y, r: (p[2] ?? o.r ?? 2.4) * this.tf.s, c: p[3] ?? o.c ?? COL.ink, a: p[4] ?? o.a ?? 1,
        t: t0 + ks[i] * dur, out: o.out != null ? o.out + this.r() * (o.outSpread ?? 0.3) : null,
        tw: o.tw ?? 0.06, ph: this.r() * TAU, sp: 1.2 + this.r() * 3.5, vx: this.r() - 0.5, vy: this.r(),
        flash: o.flash ?? 1, blink: o.blink ?? 0,
      }
      this.dots.push(d)
      out.push(d)
    })
    return out
  }
  // a custom drawing: draw(g, k (0..1 build), lt (scene-local t), o (0..1 dissolve))
  fx(o, draw) {
    this.fxs.push({ t: o.t ?? this.T(o.stage ?? 0, o.delay ?? 0), dur: o.dur ?? 0.8, out: o.out ?? null, outDur: o.outDur ?? 0.7, draw, tf: { ...this.tf } })
  }
  // times for a list of phrases: when each is said in the captions, else
  // spread over the lines from `stage` on
  cues(items, stage, until = null) {
    const env = this.env
    const last = until != null ? Math.min(until - 1, env.lines.length - 1) : env.lines.length - 1
    const from = clamp(stage, 0, env.lines.length - 1)
    const norm = (w) => w.toLowerCase().replace(/[^a-z0-9']/g, '')
    const words = []
    for (let li = from; li <= Math.max(from, last); li++) for (const w of env.lines[li].words) words.push({ w: norm(w.w), s: w.s })
    const STOP = new Set(['the', 'a', 'i', 'am', 'to', 'my', 'of', 'in', 'and', 'it', 'is', 'be', 'on', 'me', 'you', 'not'])
    let cursor = 0
    const found = items.map((it) => {
      const iw = String(it).split(/\s+/).map(norm).filter(Boolean)
      for (let j = cursor; j <= words.length - iw.length; j++) {
        if (iw.every((w, q) => words[j + q].w === w)) { cursor = j + 1; return words[j].s - 0.12 }
      }
      const key = iw.filter((w) => !STOP.has(w)).sort((a, b) => b.length - a.length)[0]
      if (key) for (let j = cursor; j < words.length; j++) if (words[j].w === key) { cursor = j + 1; return words[j].s - 0.2 }
      return null
    })
    // fill the gaps: one item per line if there are lines enough, else spread
    const span0 = this.T(from), span1 = (env.spans[Math.max(from, last)] ?? [0, env.dur])[1]
    const nLines = Math.max(from, last) - from + 1
    return found.map((f, i) => {
      if (f != null) return f
      if (nLines >= items.length) return this.T(from + i, 0.05)
      return lerp(span0, span1, i / Math.max(1, items.length)) + 0.05
    })
  }
  scale(s, dx = 0, dy = 0) { this.tf = { s, dx, dy } }
}

// ---------- arts ----------

const ARTS = {}

// a dotted card, ring binders, LED month, a giant dot-matrix date
ARTS.calendar = (s, o) => {
  const w = 880, h = 640, x0 = CX - w / 2, y0 = CY - h / 2
  s.add(dRect(x0, y0, w, h, 9), { dur: 0.9, order: 'both', r: 2.4, flash: 0.6 })
  for (const bx of [CX - 270, CX + 270]) {
    s.add(dCircle(bx, y0, 21, 6.5), { delay: 0.25, dur: 0.35, r: 2 })
    s.add([...dLine(bx, y0 - 36, bx, y0 - 26, 5), ...dLine(bx, y0 + 26, bx, y0 + 36, 5), ...dLine(bx - 8, y0, bx + 8, y0, 4)], { delay: 0.4, dur: 0.2, r: 1.7 })
  }
  s.add(ledText(o.month ?? 'NOVEMBER', CX, y0 + 88, 8, { track: 3, sub: 2 }), { delay: 0.3, dur: 0.6, order: 'sweep', r: 2.1, c: COL.white })
  s.add(dLine(x0 + 14, y0 + 158, x0 + w - 14, y0 + 158, 7), { delay: 0.45, dur: 0.6, order: 'both', r: 1.7, c: COL.gold, a: 0.85 })
  const day = String(o.day ?? '11/11')
  let big = sampleText(day, { size: 300, x: CX, y: CY + 40, pitch: 12.5, maxW: w - 120 })
  // the slash pokes far above and below the digits: trim it to their height
  const digits = day.replace(/[^0-9]/g, '')
  if (digits && digits !== day) {
    sg.font = `700 ${big.size}px Poppins`
    const mf = sg.measureText(day), md = sg.measureText(digits)
    const baseline = CY + 40 - big.h / 2 + mf.actualBoundingBoxAscent
    const lo = baseline - md.actualBoundingBoxAscent, hi = baseline + md.actualBoundingBoxDescent
    const shift = CY + 40 - (lo + hi) / 2
    big = big.filter((p) => p[1] >= lo - 2 && p[1] <= hi + 2).map((p) => [p[0], p[1] + shift])
  }
  s.add(big, { delay: 0.4, dur: 1.0, order: 'sweep', r: 4.4, c: COL.white, tw: 0.08 })
  s.fx({ delay: 0.9, dur: 1.2 }, (g, k, lt) => {
    g.save()
    g.globalCompositeOperation = 'lighter'
    g.translate(CX, CY + 40)
    g.scale(1.9, 0.8)
    glow(g, 0, 0, 260, '#ffdca0', 0.2 * k * (0.9 + 0.1 * Math.sin(lt * 1.7)))
    g.restore()
  })
  if (o.sub) s.add(ledText(o.sub, CX, y0 + h - 72, 5, { track: 2, sub: 2 }), { delay: 0.85, dur: 0.6, order: 'sweep', r: 1.45, c: COL.ink })
}

// rings / rays / zodiac wheel behind a numeral or glyph
function halo(s, kind, o = {}) {
  const cy = o.cy ?? CY, base = o.base ?? CY + 200
  s.fx({ delay: 0.5, dur: 1.4 }, (g, k, lt) => {
    g.save()
    g.globalCompositeOperation = 'lighter'
    glow(g, CX, cy + 40, 300, '#ffcf80', 0.22 * k)
    glow(g, CX, cy, 70, '#fff4dc', 0.75 * k * (0.85 + 0.15 * Math.sin(lt * 2.3)))
    g.restore()
  })
  s.add(dCircle(CX, cy, 410, 8), { delay: 0.1, dur: 1.3, r: 1.6, a: 0.6, flash: 0.3 })
  s.add(dCircle(CX, cy, 340, 9), { delay: 0.25, dur: 1.2, r: 1.5, c: COL.gold, a: 0.5, flash: 0.3 })
  if (kind === 'wheel') {
    s.add(dCircle(CX, cy, 300, 9), { delay: 0.35, dur: 1.1, r: 1.4, a: 0.45 })
    const signs = '♈♉♊♋♌♍♎♏♐♑♒♓'
    ;[...signs].forEach((ch, i) => {
      const a = -Math.PI / 2 + (i + 0.5) * (TAU / 12)
      s.add(sampleGlyph(ch, { size: 46, x: CX + Math.cos(a) * 375, y: cy + Math.sin(a) * 375, pitch: 3.2 }), { delay: 0.6 + i * 0.07, dur: 0.3, order: 'random', r: 1.15, c: COL.gold, a: 0.9 })
      const b = -Math.PI / 2 + i * (TAU / 12)
      s.add(dLine(CX + Math.cos(b) * 300, cy + Math.sin(b) * 300, CX + Math.cos(b) * 410, cy + Math.sin(b) * 410, 8), { delay: 0.5 + i * 0.04, dur: 0.3, r: 1.3, a: 0.5 })
    })
  } else {
    // rays and a rising half-sun on a gold horizon
    for (let i = 0; i < 14; i++) {
      const a = Math.PI + (i / 13) * Math.PI
      s.add(dLine(CX + Math.cos(a) * 150, base + Math.sin(a) * 150, CX + Math.cos(a) * 330, base + Math.sin(a) * 330, 9), { delay: 0.6 + i * 0.03, dur: 0.4, r: 1.4, c: COL.gold, a: 0.5 })
    }
    s.add(resample(arcPts(CX, base, 150, Math.PI, TAU, 60), 7), { delay: 0.5, dur: 0.7, order: 'both', r: 1.8, c: COL.gold, a: 0.85 })
    s.add(dLine(CX - 470, base, CX + 470, base, 8), { delay: 0.3, dur: 0.9, order: 'both', r: 1.7, a: 0.7 })
  }
  // beads orbiting slowly on the outer ring
  s.fx({ delay: 0.9, dur: 0.8 }, (g, k, lt) => {
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * TAU + lt * 0.06
      const x = CX + Math.cos(a) * 410, y = cy + Math.sin(a) * 410
      g.save()
      g.globalCompositeOperation = 'lighter'
      glow(g, x, y, 26, '#fff1d6', 0.5 * k)
      g.restore()
      dot(g, x, y, 5, COL.white, k)
    }
  })
}

// a giant dot-matrix numeral (or glyph), optional halo
ARTS.numeral = (s, o) => {
  const text = String(o.text ?? '1')
  const hk = o.halo === true ? 'rays' : o.halo
  const cy = hk ? CY - 20 : CY
  let pts
  if (isGlyph(text)) pts = sampleGlyph(text, { size: hk ? 420 : 520, x: CX, y: cy, pitch: 11, thicken: 6 })
  else {
    const n = text.replace(/\s/g, '').length
    const size = n <= 1 ? 560 : n === 2 ? 470 : 330
    pts = sampleText(text, { size, x: CX, y: cy, pitch: n <= 2 ? 14 : 12, maxW: 860, spacing: /\s/.test(text) ? 40 : 0 })
  }
  if (hk) halo(s, hk, { cy, base: cy + 210 })
  else {
    s.fx({ delay: 0.6, dur: 1.2 }, (g, k) => {
      g.save()
      g.globalCompositeOperation = 'lighter'
      glow(g, CX, cy, 360, '#ffe0b0', 0.1 * k)
      g.restore()
    })
  }
  s.add(pts, { delay: 0.05, dur: 1.1, order: 'up', mix: 0.45, r: isGlyph(text) ? 4.0 : 4.8, c: isGlyph(text) ? COL.goldHi : COL.white, tw: 0.08 })
}

// light pillars rising like a gate
ARTS.pillars = (s, o) => {
  const n = clamp(o.count ?? 4, 1, 8)
  const top = CY - 300, bot = CY + 300
  let xs
  if (n % 2 === 0) {
    const pairs = n / 2, pw = 70, gap = 300
    const tot = (pairs - 1) * gap
    xs = []
    for (let p = 0; p < pairs; p++) { const c = CX - tot / 2 + p * gap; xs.push(c - pw / 2, c + pw / 2) }
  } else xs = Array.from({ length: n }, (_, i) => CX + (i - (n - 1) / 2) * 130)
  s.add(dLine(CX - 470, bot + 14, CX + 470, bot + 14, 8), { dur: 0.8, order: 'both', r: 1.6, a: 0.55, flash: 0.2 })
  s.fx({ delay: 0.4, dur: 1.4 }, (g, k) => {
    g.save()
    g.globalCompositeOperation = 'lighter'
    g.translate(CX, bot + 10)
    g.scale(2.6, 0.5)
    glow(g, 0, 0, 220, '#ffc970', 0.28 * k)
    g.restore()
  })
  xs.forEach((x, i) => {
    const t0 = 0.15 + i * 0.22, dur = 1.6
    const pts = []
    const m = 330
    for (let j = 0; j < m; j++) {
      const y = bot - (j / m) * (bot - top)
      const rr = s.r()
      pts.push([x + (s.r() - 0.5) * 13, y, 1.3 + rr * 2.5, rr > 0.75 ? COL.goldHi : COL.gold])
    }
    s.add(pts, { delay: t0, dur, order: 'path', tw: 0.55, flash: 1 })
    // the bright head climbing the pillar, then resting as a soft spark on top
    s.fx({ delay: t0, dur }, (g, k, lt) => {
      const y = bot - easeOut(k) * 0 - k * (bot - top)
      g.save()
      g.globalCompositeOperation = 'lighter'
      const hot = k < 1 ? 1 : 0.35 + 0.15 * Math.sin(lt * 3 + i)
      glow(g, x, y, 60, '#fff0cc', 0.8 * hot)
      g.restore()
      dot(g, x, y, 6 * hot + 2, COL.white, 0.95)
    })
  })
}

const ICONS = {
  star: (x, y) => [resample(starPoly(x, y, 30, 13), 6, true)],
  heart: (x, y) => [resample(heartPts(x, y + 2, 30), 6, true)],
  house: (x, y) => [resample([[x - 26, y - 4], [x, y - 30], [x + 26, y - 4], [x + 22, y - 4], [x + 22, y + 28], [x - 22, y + 28], [x - 22, y - 4]], 6, true), resample([[x - 7, y + 28], [x - 7, y + 10], [x + 7, y + 10], [x + 7, y + 28]], 5)],
  key: (x, y) => [dCircle(x - 18, y, 13, 6), resample([[x - 5, y], [x + 32, y], [x + 32, y + 10]], 6), dLine(x + 20, y, x + 20, y + 9, 5)],
  letter: (x, y) => [resample(rrectPts(x - 32, y - 22, 64, 44), 6, true), resample([[x - 32, y - 22], [x, y + 4], [x + 32, y - 22]], 6)],
  ring: (x, y) => [dCircle(x, y + 8, 22, 6), resample([[x - 9, y - 14], [x, y - 26], [x + 9, y - 14], [x, y - 8]], 4.5, true)],
  moon: (x, y) => [resample([...arcPts(x, y, 28, -2.2, 2.2, 40), ...arcPts(x + 14, y, 22, 2.0, -2.0, 40)], 6, true)],
  spark: (x, y) => [resample(starPoly(x, y, 30, 7, -Math.PI / 2, 4), 5.5, true)],
}

// arch doorway, violet starfield inside, bright core, gold sparkle jambs
ARTS.portal = (s, o) => {
  const Ro = 215, Ri = 160, base = CY + 360, spring = CY - 130
  const archPath = (R) => [[CX - R, base], [CX - R, spring], ...arcPts(CX, spring, R, Math.PI, TAU, 80), [CX + R, base]]
  const inner = archPath(Ri)
  s.add(dLine(CX - 470, base, CX + 470, base, 8), { dur: 0.8, order: 'both', r: 1.6, a: 0.5, flash: 0.2 })
  s.fx({ delay: 0.3, dur: 1.4 }, (g, k) => {
    g.save()
    g.globalCompositeOperation = 'lighter'
    g.translate(CX, base)
    g.scale(2.2, 0.55)
    glow(g, 0, 0, 230, '#ffc56a', 0.32 * k)
    g.restore()
  })
  // inside: violet sky with a bright core
  const coreY = CY + 30
  s.fx({ delay: 0.5, dur: 1.4 }, (g, k, lt) => {
    g.save()
    g.beginPath()
    inner.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)))
    g.closePath()
    g.clip()
    const grd = g.createRadialGradient(CX, coreY, 10, CX, coreY, 560)
    grd.addColorStop(0, rgba('#d9d0ff', 0.95 * k))
    grd.addColorStop(0.25, rgba('#8f7cf2', 0.75 * k))
    grd.addColorStop(0.6, rgba('#4b3aa8', 0.6 * k))
    grd.addColorStop(1, rgba('#1d1550', 0.5 * k))
    g.fillStyle = grd
    g.fillRect(CX - Ri, spring - Ri, Ri * 2, base - spring + Ri)
    g.restore()
    if (o.inside !== 'moon' && o.inside !== 'heart') {
      g.save()
      g.globalCompositeOperation = 'lighter'
      const p = 0.9 + 0.1 * Math.sin(lt * 2.1)
      glow(g, CX, coreY, 190 * p, '#ffffff', 0.85 * k)
      glow(g, CX, coreY, 60, '#ffffff', 0.9 * k)
      g.restore()
    }
  })
  // starfield
  const stars = []
  const bb = [CX - Ri, spring - Ri, CX + Ri, base]
  for (let i = 0; i < 420; i++) {
    const x = lerp(bb[0], bb[2], s.r()), y = lerp(bb[1], bb[3], s.r())
    if (!inPoly(x, y, inner)) continue
    const rr = s.r()
    stars.push([x, y, 0.6 + rr * rr * 2.2, rr > 0.8 ? COL.white : COL.lilac, 0.5 + s.r() * 0.5])
  }
  s.add(stars, { delay: 0.6, dur: 1.1, order: 'radial', cx: CX, cy: coreY, tw: 0.6, flash: 0.6 })
  if (o.inside === 'heart') {
    s.fx({ delay: 0.9, dur: 1 }, (g, k, lt) => {
      g.save()
      g.globalCompositeOperation = 'lighter'
      glow(g, CX, coreY, 150 * (0.92 + 0.08 * Math.sin(lt * 2.4)), '#ffd6e2', 0.7 * k)
      g.restore()
    })
    s.add(fillPoly(heartPts(CX, coreY, 82), 8.5), { delay: 0.9, dur: 0.8, order: 'radial', r: 3, c: '#fff1f4', tw: 0.1 })
  } else if (o.inside === 'moon') {
    s.fx({ delay: 0.9, dur: 1 }, (g, k) => {
      g.save()
      g.globalCompositeOperation = 'lighter'
      glow(g, CX, coreY, 160, '#ffffff', 0.55 * k)
      g.restore()
    })
    const cres = fillPoly(arcPts(CX, coreY, 80, 0, TAU, 60), 8).filter(([x, y]) => Math.hypot(x - CX - 34, y - coreY + 10) > 66)
    s.add(cres, { delay: 0.9, dur: 0.8, order: 'radial', r: 3, c: COL.white })
  }
  // arch outlines: bone arcs with beads, gold sparkle jambs
  for (const [R, dl] of [[Ro, 0.1], [Ri, 0.25]]) {
    const arc = resample(arcPts(CX, spring, R, Math.PI, TAU, 90), 8)
    s.add(arc.map((p, i) => [p[0], p[1], i % 6 === 0 ? 3.4 : 2, COL.ink]), { delay: dl + 0.9, dur: 0.7, order: 'both', flash: 0.8 })
    for (const sx of [-1, 1]) {
      const x = CX + sx * R
      const pts = []
      for (let j = 0; j < 170; j++) {
        const rr = s.r()
        pts.push([x + (s.r() - 0.5) * 8, base - (j / 170) * (base - spring), 1.2 + rr * 2.2, rr > 0.7 ? COL.goldHi : COL.gold])
      }
      s.add(pts, { delay: dl, dur: 1.0, order: 'path', tw: 0.55 })
    }
  }
  // a star above the arch
  s.fx({ delay: 1.5, dur: 0.6 }, (g, k, lt) => {
    const y = spring - Ro - 58
    g.save()
    g.globalCompositeOperation = 'lighter'
    glow(g, CX, y, 46, '#fff4dc', 0.6 * k)
    g.restore()
    sparkle(g, CX, y, 22 * easeOut(k), COL.white, k, lt * 0.4)
  })
  // small line icons floating around
  // (drawn at 1.5× around their own centre)
  const spots = [[CX - 330, CY - 200], [CX + 330, CY + 130], [CX - 320, CY + 250], [CX + 320, CY - 280], [CX - 250, CY - 420], [CX + 260, CY + 430]]
  ;(o.icons ?? []).slice(0, 6).forEach((name, i) => {
    const make = ICONS[name] ?? ICONS.star
    const [x, y] = spots[i]
    for (const part of make(0, 0)) s.add(resample(part.map(([px, py]) => [x + px * 1.5, y + py * 1.5]), 7.5), { delay: 1.3 + i * 0.18, dur: 0.5, r: 2.1, a: 0.9, flash: 0.7 })
    s.fx({ delay: 1.3 + i * 0.18, dur: 0.6 }, (g, k, lt) => {
      g.save()
      g.globalCompositeOperation = 'lighter'
      glow(g, x, y, 70, '#d9d0ff', 0.12 * k * (0.8 + 0.2 * Math.sin(lt * 2 + i)))
      g.restore()
    })
  })
}

// a dotted note card; words written in; then crossed out and blown to dust
ARTS.note = (s, o) => {
  const words = o.words ?? []
  const w = 660, h = Math.max(430, 210 + words.length * 74), x0 = CX - w / 2, y0 = CY - h / 2
  s.add(dRect(x0, y0, w, h, 8), { dur: 0.9, order: 'both', r: 2.2, flash: 0.5 })
  const title = o.title ?? 'I RELEASE'
  const tp = Math.min(7, (w - 80) / Math.max(1, ledWidth(title, 1, 1)))
  s.add(ledText(title, CX, y0 + 70, tp, { sub: 2 }), { delay: 0.35, dur: 0.6, order: 'sweep', r: tp * 0.21, c: COL.white })
  s.add(dLine(x0 + 90, y0 + 118, x0 + w - 90, y0 + 118, 6), { delay: 0.55, dur: 0.5, order: 'both', r: 1.5, c: COL.gold, a: 0.9 })
  const dz = o.dissolveAt
  const outT = dz != null ? s.T(dz, 0.55) : null
  const cues = s.cues(words, o.wordsAt ?? 1, dz ?? null)
  words.forEach((wd, i) => {
    const y = y0 + 190 + i * 74
    const p = Math.min(7, (w - 90) / Math.max(1, ledWidth(wd, 1, 1)))
    s.add(ledText(wd, CX, y, p, { sub: 2 }), { t: cues[i], dur: 0.55, order: 'sweep', mix: 0.15, r: p * 0.21, c: COL.ink, out: outT, outSpread: 0.5 })
  })
  if (dz != null) {
    // the strike: a gold slash through every word, just before the tear
    const ya = y0 + 160, yb = y0 + 200 + (words.length - 1) * 74 + 20
    s.add(dLine(x0 + 70, yb, x0 + w - 70, ya, 6), { t: s.T(dz, 0.05), dur: 0.4, r: 2, c: COL.goldHi, out: outT, outSpread: 0.4 })
  }
}

// a lined page numbered 1..count, items written in with little stars
ARTS.list = (s, o) => {
  const count = clamp(o.count ?? 11, 1, 14)
  const items = o.items ?? []
  const w = 560, h = count <= 4 ? 560 : 800, x0 = CX - w / 2, y0 = CY - h / 2
  s.add(dRect(x0, y0, w, h, 8), { dur: 0.9, order: 'both', r: 2.2, flash: 0.5 })
  let top = y0 + 60
  if (o.title) {
    const p = Math.min(5.5, (w - 70) / Math.max(1, ledWidth(o.title, 1, 1)))
    s.add(ledText(o.title, CX, y0 + 58, p, { sub: 2 }), { delay: 0.3, dur: 0.6, order: 'sweep', r: p * 0.21, c: COL.white })
    s.add(dLine(x0 + 60, y0 + 98, x0 + w - 60, y0 + 98, 6), { delay: 0.5, dur: 0.5, order: 'both', r: 1.4, c: COL.gold, a: 0.85 })
    top = y0 + 150
  }
  const rowH = (y0 + h - 50 - top) / Math.max(1, count - 1 || 1)
  const cues = s.cues(items, o.itemsAt ?? 1)
  for (let i = 0; i < count; i++) {
    const y = count === 1 ? (top + y0 + h) / 2 : top + i * rowH
    const dl = 0.45 + i * 0.07
    s.add(ledText(String(i + 1), x0 + 34, y, 2.6, { align: 'center' }), { delay: dl, dur: 0.2, r: 1.0, c: COL.ink, a: 0.65, flash: 0 })
    const star = resample(starPoly(x0 + 76, y, 13, 5.5), 4, true)
    const item = items[i]
    const it = item != null ? cues[i] : null
    s.add(star, { delay: dl + 0.05, dur: 0.25, r: 1.3, c: COL.gold, a: 0.9, out: it })
    const wave = dWave(x0 + 106, x0 + w - 36, y, 5, 48, 6.5)
    s.add(wave, { delay: dl + 0.1, dur: 0.35, r: 1.5, a: 0.75, flash: 0.3, out: it, outSpread: 0.25 })
    if (item != null) {
      const p = Math.min(4.6, (w - 150) / Math.max(1, ledWidth(item, 1, 1)))
      s.add(ledText(item, x0 + 106, y, p, { align: 'left', sub: 2 }), { t: it + 0.1, dur: 0.6, order: 'sweep', mix: 0.12, r: p * 0.22, c: COL.white })
      s.add(fillPoly(starPoly(x0 + 76, y, 15, 6.5), 3.2), { t: it, dur: 0.25, order: 'radial', r: 1.25, c: COL.goldHi, tw: 0.3 })
      s.fx({ t: it, dur: 0.5 }, (g, k, lt) => {
        g.save()
        g.globalCompositeOperation = 'lighter'
        glow(g, x0 + 76, y, 34, '#ffd98f', 0.55 * k * (0.85 + 0.15 * Math.sin(lt * 3 + i)))
        g.restore()
      })
    }
  }
}

// a dot-matrix clock, colon blinking
ARTS.clock = (s, o) => {
  const time = String(o.time ?? '11:11')
  const size = 270, pitch = 11
  const pts = sampleText(time, { size, x: CX, y: CY, pitch, maxW: 880 })
  // the colon's dots blink: find them by x
  sg.font = `700 ${pts.size}px Poppins`
  const ci = time.indexOf(':')
  let colon = []
  if (ci >= 0) {
    const full = sg.measureText(time).width
    const a = sg.measureText(time.slice(0, ci)).width, b = sg.measureText(time.slice(0, ci + 1)).width
    const left = CX - full / 2
    colon = pts.filter((p) => p[0] > left + a && p[0] < left + b)
  }
  const rest = pts.filter((p) => !colon.includes(p))
  s.add(rest, { delay: 0.1, dur: 1.0, order: 'sweep', r: 4.2, c: COL.white, tw: 0.06 })
  s.add(colon, { delay: 0.7, dur: 0.2, order: 'random', r: 4.2, c: COL.goldHi, blink: 1 })
  s.add(dLine(CX - 420, CY - 200, CX + 420, CY - 200, 8), { delay: 0.2, dur: 0.8, order: 'both', r: 1.5, c: COL.gold, a: 0.6 })
  s.add(dLine(CX - 420, CY + 200, CX + 420, CY + 200, 8), { delay: 0.3, dur: 0.8, order: 'both', r: 1.5, c: COL.gold, a: 0.6 })
  for (const sx of [-1, 1]) for (let i = 0; i < 3; i++) s.add([[CX + sx * (440 + i * 18), CY - 200], [CX + sx * (440 + i * 18), CY + 200]], { delay: 0.9, dur: 0.1, r: 1.8, c: COL.gold, a: 0.7 - i * 0.2 })
  s.fx({ delay: 0.7, dur: 1.2 }, (g, k, lt) => {
    g.save()
    g.globalCompositeOperation = 'lighter'
    g.translate(CX, CY)
    g.scale(2, 0.8)
    glow(g, 0, 0, 250, '#ffdca0', 0.16 * k)
    g.restore()
  })
}

// a dotted sphere; light(nx, ny, nz) → brightness 0..1 (≤ 0 is shadow)
function sphere(cx, cy, r, pitch, light, { lit = COL.ink, dark = '#3d3466', darkA = 0.16 } = {}) {
  const out = []
  for (let y = cy - r + pitch / 2; y < cy + r; y += pitch)
    for (let x = cx - r + pitch / 2; x < cx + r; x += pitch) {
      const nx = (x - cx) / r, ny = (y - cy) / r
      const q = nx * nx + ny * ny
      if (q > 1) continue
      const nz = Math.sqrt(1 - q)
      const b = light(nx, ny, nz)
      if (b > 0) { const bb = Math.min(1, b); out.push([x, y, pitch * (0.16 + 0.15 * bb), lit, 0.4 + 0.6 * bb]) }
      else out.push([x, y, darkA > 0.25 ? 2.1 : 1.6, dark, darkA])
    }
  return out
}

// a dot-matrix moon with its phase, a sign glyph beside
ARTS.moon = (s, o) => {
  const phase = ((o.phase ?? 0.5) % 1 + 1) % 1
  // phase 0 new, 0.5 full (also 1 = full here, as scripts use 1 for "full")
  const ph = o.phase === 1 ? 0.5 : phase
  const th = ph * TAU
  const L = [Math.sin(th), -0.08, -Math.cos(th)]
  const r = 250, cy = CY - 10
  const crater = [[-0.3, -0.25, 0.18], [0.25, 0.2, 0.22], [0.1, -0.45, 0.12], [-0.35, 0.35, 0.14], [0.45, -0.1, 0.1]]
  const pts = sphere(CX, cy, r, 10, (nx, ny, nz) => {
    let b = nx * L[0] + ny * L[1] + nz * L[2]
    if (b <= 0) return b
    for (const [x, y, rr] of crater) if (Math.hypot(nx - x, ny - y) < rr) b *= 0.62
    return 0.2 + b * 0.8
  }, { darkA: ph < 0.04 || ph > 0.96 ? 0.55 : 0.2, dark: ph < 0.04 || ph > 0.96 ? '#6f63a8' : '#3d3466' })
  s.fx({ delay: 0.4, dur: 1.4 }, (g, k) => {
    g.save()
    g.globalCompositeOperation = 'lighter'
    const lit = 0.5 - 0.5 * Math.cos(th)
    glow(g, CX, cy, 480, '#e8e0ff', (0.04 + 0.1 * lit) * k)
    if (lit < 0.1) {
      // new moon: a thin bright rim in the dark
      g.globalAlpha = k * 0.5
      g.strokeStyle = 'rgba(199,188,255,0.75)'
      g.lineWidth = 3
      g.beginPath()
      g.arc(CX, cy, r + 6, 0, TAU)
      g.stroke()
    }
    g.restore()
  })
  s.add(pts, { delay: 0.05, dur: 1.2, order: 'radial', mix: 0.4, tw: 0.04 })
  s.add(dCircle(CX, cy, r + 40, 9), { delay: 0.3, dur: 1.2, r: 1.4, c: COL.gold, a: 0.45, flash: 0.3 })
  if (o.glyph) {
    const gx = CX + 300, gy = cy - 270
    s.add(sampleGlyph(o.glyph, { size: 130, x: gx, y: gy, pitch: 5, thicken: 4 }), { delay: 1.0, dur: 0.6, order: 'random', r: 1.9, c: COL.goldHi })
    s.fx({ delay: 1.0, dur: 0.6 }, (g, k) => {
      g.save()
      g.globalCompositeOperation = 'lighter'
      glow(g, gx, gy, 90, '#ffd88a', 0.22 * k)
      g.restore()
    })
  }
}

// a planet with its glyph, optional retrograde loop trace
ARTS.planet = (s, o) => {
  const glyph = o.glyph ?? '♀'
  const sun = glyph === '☉'
  const retro = !!o.retro
  const r = sun ? 210 : 175, cy = retro ? CY - 150 : CY - 20
  const pts = sphere(CX, cy, r, 9.5, (nx, ny, nz) => (sun ? 0.75 + 0.25 * nz : -0.5 * nx - 0.55 * ny + 0.68 * nz + 0.15), { lit: sun ? COL.goldHi : '#f6e6c4' })
  s.fx({ delay: 0.3, dur: 1.4 }, (g, k, lt) => {
    g.save()
    g.globalCompositeOperation = 'lighter'
    glow(g, CX, cy, sun ? 520 : 380, sun ? '#ffc76a' : '#ffe2b0', (sun ? 0.3 : 0.14) * k * (0.92 + 0.08 * Math.sin(lt * 1.6)))
    g.restore()
  })
  s.add(pts, { delay: 0.05, dur: 1.1, order: 'radial', mix: 0.4, tw: 0.05 })
  if (sun) {
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * TAU
      s.add(dLine(CX + Math.cos(a) * (r + 40), cy + Math.sin(a) * (r + 40), CX + Math.cos(a) * (r + (i % 2 ? 90 : 140)), cy + Math.sin(a) * (r + (i % 2 ? 90 : 140)), 9), { delay: 0.7 + i * 0.02, dur: 0.3, r: 1.7, c: COL.gold, a: 0.7 })
    }
  } else {
    // a tilted dotted orbit ring, hidden where it passes behind the sphere
    const ring = []
    for (let i = 0; i < 200; i++) {
      const a = (i / 200) * TAU
      const x = Math.cos(a) * 330, y = Math.sin(a) * 74
      const rx = x * Math.cos(-0.22) - y * Math.sin(-0.22), ry = x * Math.sin(-0.22) + y * Math.cos(-0.22)
      const behind = Math.sin(a) < 0
      if (behind && Math.hypot(rx, ry) < r + 4) continue
      ring.push([CX + rx, cy + ry])
    }
    s.add(ring, { delay: 0.6, dur: 0.9, r: 1.7, c: COL.gold, a: 0.75, flash: 0.4 })
  }
  // the planet's glyph, bright, top right
  const gx = CX + (sun ? 330 : 290), gy = cy - (sun ? 300 : 250)
  s.add(sampleGlyph(glyph, { size: 140, x: gx, y: gy, pitch: 5, thicken: 4 }), { delay: 0.9, dur: 0.6, order: 'random', r: 1.9, c: COL.goldHi })
  s.fx({ delay: 0.9, dur: 0.6 }, (g, k) => {
    g.save()
    g.globalCompositeOperation = 'lighter'
    glow(g, gx, gy, 90, '#ffd88a', 0.22 * k)
    g.restore()
  })
  if (retro) {
    // prolate trochoid: the apparent loop a planet traces against the stars
    const by = CY + 340
    const path = []
    for (let u = -3.0; u <= 3.0; u += 0.02) path.push([CX + 115 * u - 175 * Math.sin(u), by + 70 * Math.cos(u) - 10])
    const dots = resample(path, 9)
    const t0 = 0.9, dur = 2.6
    s.add(dots, { delay: t0, dur, r: 2, c: COL.ink, a: 0.85, flash: 0.9 })
    s.add(dLine(CX - 470, by + 120, CX + 470, by + 120, 9), { delay: 0.4, dur: 0.8, order: 'both', r: 1.3, a: 0.4 })
    s.fx({ delay: t0, dur }, (g, k, lt) => {
      const i = Math.min(dots.length - 1, Math.floor(k * (dots.length - 1)))
      const [x, y] = dots[i]
      g.save()
      g.globalCompositeOperation = 'lighter'
      glow(g, x, y, 44, '#ffe3a8', 0.75)
      g.restore()
      dot(g, x, y, 6, COL.goldHi, 1)
    })
    for (const [txt, x] of [['DIRECT', CX - 330], ['RX', CX], ['DIRECT', CX + 330]]) s.add(ledText(txt, x, by + 150, 3, { sub: 1 }), { delay: 1.4, dur: 0.4, order: 'sweep', r: 1.1, c: COL.gold, a: 0.8 })
  }
}

// stacked big dot-matrix words, one per beat (the recap)
ARTS.words = (s, o) => {
  const items = o.items ?? []
  const lh = 205
  const cues = s.cues(items, 0)
  items.forEach((wd, i) => {
    const y = CY + (i - (items.length - 1) / 2) * lh
    const pts = sampleText(String(wd).toUpperCase(), { size: 150, x: CX, y, pitch: 6.2, maxW: 900, spacing: 4 })
    s.add(pts, { t: Math.max(0.05, cues[i]), dur: 0.55, order: 'sweep', mix: 0.3, r: 2.55, c: COL.white, tw: 0.05 })
    s.fx({ t: Math.max(0.05, cues[i]) + 0.2, dur: 0.6 }, (g, k) => {
      g.save()
      g.globalCompositeOperation = 'lighter'
      g.translate(CX, y)
      g.scale(2.6, 0.6)
      glow(g, 0, 0, 200, '#ffe6bd', 0.12 * k)
      g.restore()
    })
  })
}

// Align's veiled card: the veil lifts to show the face
ARTS.card = (s, o) => {
  const w = 520, h = 760, x0 = CX - w / 2, y0 = CY - h / 2
  const rev = s.T(o.revealAt ?? 1, 0.1)
  s.add(dRect(x0, y0, w, h, 9, 38), { dur: 1.0, order: 'both', r: 2.4, c: COL.gold, flash: 0.6 })
  s.add(dRect(x0 + 22, y0 + 22, w - 44, h - 44, 10, 24), { delay: 0.3, dur: 0.9, order: 'both', r: 1.4, a: 0.45, flash: 0.2 })
  for (const [cx, cy] of [[x0 + 50, y0 + 50], [x0 + w - 50, y0 + 50], [x0 + 50, y0 + h - 50], [x0 + w - 50, y0 + h - 50]]) s.add(resample(starPoly(cx, cy, 10, 2.5, -Math.PI / 2, 4), 3, true), { delay: 0.8, dur: 0.2, r: 1.1, c: COL.gold })
  // the veil: a violet dot lattice with Align's star at its heart
  const veil = []
  const pr = 13
  for (let y = y0 + 50; y < y0 + h - 40; y += pr)
    for (let x = x0 + 46; x < x0 + w - 40; x += pr) {
      const row = Math.round((y - y0) / pr)
      const xx = x + (row % 2 ? pr / 2 : 0)
      if (xx > x0 + w - 44) continue
      const d = Math.hypot(xx - CX, y - CY)
      veil.push([xx, y, 2.4 + 1.2 * Math.max(0, 1 - d / 260), d < 150 ? COL.lilac : COL.violet, 0.45 + 0.4 * Math.max(0, 1 - d / 300)])
    }
  s.add(veil, { delay: 0.4, dur: 1.0, order: 'radial', cx: CX, cy: CY, tw: 0.25, out: rev, outSpread: 0.6, flash: 0.4 })
  const star = sampleGlyph('✦', { size: 190, x: CX, y: CY, pitch: 5.5 })
  s.add(star, { delay: 0.9, dur: 0.5, order: 'radial', r: 2.2, c: COL.white, out: rev, outSpread: 0.3 })
  s.fx({ delay: 0.9, dur: 0.6, out: rev }, (g, k, lt) => {
    g.save()
    g.globalCompositeOperation = 'lighter'
    glow(g, CX, CY, 160, '#d9d0ff', 0.4 * k * (0.85 + 0.15 * Math.sin(lt * 2)))
    g.restore()
  })
  // the face
  const face = String(o.face ?? 'Align')
  const fy = o.glyph ? CY + 120 : CY - 10
  if (o.glyph) s.add(sampleGlyph(o.glyph, { size: 230, x: CX, y: CY - 110, pitch: 6.5, thicken: 4 }), { t: rev + 0.4, dur: 0.6, order: 'radial', r: 2.5, c: COL.goldHi })
  s.add(sampleText(face, { size: o.glyph ? 96 : 130, x: CX, y: fy, pitch: 5.5, weight: 600, maxW: w - 110 }), { t: rev + 0.45, dur: 0.7, order: 'sweep', mix: 0.3, r: 2.25, c: COL.white })
  s.fx({ t: rev + 0.4, dur: 0.8 }, (g, k) => {
    g.save()
    g.globalCompositeOperation = 'lighter'
    glow(g, CX, fy, 240, '#ffe8c2', 0.18 * k)
    g.restore()
  })
  if (o.sub) {
    const p = Math.min(3.6, (w - 90) / Math.max(1, ledWidth(o.sub, 1, 1)))
    s.add(ledText(o.sub, CX, fy + (o.glyph ? 100 : 130), p, { sub: 2 }), { t: rev + 0.9, dur: 0.5, order: 'sweep', r: p * 0.22, c: COL.gold })
  }
  s.add(ledText('ALIGN', CX, y0 + h - 62, 3.2, { track: 2, sub: 2 }), { delay: 1.0, dur: 0.4, order: 'sweep', r: 0.8, c: COL.ink, a: 0.75 })
}

// two star-headed people (Align's Stardust figures) on a horizon
function figure(s, x, base, face, { reach = null, delay = 0 } = {}) {
  const hy = base - 330
  s.add(fillPoly(starPoly(x, hy, 36, 15, -Math.PI / 2), 4.2), { delay: delay + 0.6, dur: 0.4, order: 'radial', r: 1.6, c: COL.goldHi, tw: 0.15 })
  s.fx({ delay: delay + 0.6, dur: 0.5 }, (g, k, lt) => {
    g.save()
    g.globalCompositeOperation = 'lighter'
    glow(g, x, hy, 70, '#ffd98f', 0.45 * k * (0.9 + 0.1 * Math.sin(lt * 2.5 + x)))
    g.restore()
  })
  const body = [[x, base - 282], [x + 40, base - 252], [x + 72, base], [x - 72, base], [x - 40, base - 252]]
  s.add(resample(body, 7, true), { delay, dur: 0.8, order: 'both', r: 2, flash: 0.6 })
  s.add(fillPoly(body, 13).map((p) => [p[0], p[1], 1.4, COL.ink, 0.25]), { delay: delay + 0.3, dur: 0.7, order: 'down', r: 1.4 })
  const sh = [x + face * 42, base - 248]
  const hand = reach ?? [x + face * 70, base - 120]
  s.add(resample([sh, [lerp(sh[0], hand[0], 0.5) + face * 12, lerp(sh[1], hand[1], 0.5)], hand], 7), { delay: delay + 0.5, dur: 0.4, r: 2 })
  const sh2 = [x - face * 42, base - 248]
  s.add(resample([sh2, [x - face * 66, base - 160], [x - face * 70, base - 110]], 7), { delay: delay + 0.5, dur: 0.4, r: 2 })
  return hand
}
ARTS.figures = (s, o) => {
  const base = CY + 270
  const meet = o.pose === 'meet'
  s.add(dLine(CX - 480, base, CX + 480, base, 8), { dur: 0.8, order: 'both', r: 1.6, a: 0.6, flash: 0.2 })
  s.fx({ delay: 0.3, dur: 1.2 }, (g, k) => {
    g.save()
    g.globalCompositeOperation = 'lighter'
    g.translate(CX, base)
    g.scale(2.6, 0.45)
    glow(g, 0, 0, 200, '#c7bcff', 0.22 * k)
    g.restore()
  })
  const dx = meet ? 95 : 240
  if (meet) {
    const hands = [CX, base - 150]
    figure(s, CX - dx, base, 1, { reach: hands, delay: 0.1 })
    figure(s, CX + dx, base, -1, { reach: hands, delay: 0.3 })
    s.add(fillPoly(heartPts(CX, base - 470, 34), 4.5), { delay: 1.3, dur: 0.5, order: 'radial', r: 1.7, c: COL.rose, tw: 0.2 })
    s.fx({ delay: 1.2, dur: 0.6 }, (g, k, lt) => {
      g.save()
      g.globalCompositeOperation = 'lighter'
      glow(g, CX, base - 150, 50, '#fff0d0', 0.7 * k * (0.8 + 0.2 * Math.sin(lt * 3)))
      glow(g, CX, base - 470, 80, '#ffb7c8', 0.3 * k)
      g.restore()
    })
  } else {
    const a = figure(s, CX - dx, base, 1, { delay: 0.1 })
    const b = figure(s, CX + dx, base, -1, { delay: 0.3 })
    // a gold thread between their hands, sagging slightly
    const thread = []
    for (let i = 0; i <= 60; i++) {
      const k = i / 60
      thread.push([lerp(a[0], b[0], k), lerp(a[1], b[1], k) + Math.sin(k * Math.PI) * 40])
    }
    s.add(resample(thread, 7), { delay: 1.2, dur: 0.8, order: 'both', r: 1.8, c: COL.gold, tw: 0.5 })
  }
  // reflections: a faint copy of the stars under the horizon
  s.add(Array.from({ length: 60 }, () => [CX + (s.r() - 0.5) * 900, base + 20 + s.r() * 120, 0.8 + s.r() * 1.2, COL.lilac, 0.25 + s.r() * 0.3]), { delay: 0.5, dur: 1, order: 'random', tw: 0.6, flash: 0 })
}

// ---------- background ----------

let bg, grainTiles = [], twinkles = [], motes = []
function makeBackground() {
  bg = layer()
  const g = bg.getContext('2d')
  g.fillStyle = '#060608'
  g.fillRect(0, 0, W, H)
  const grd = g.createRadialGradient(CX, CY, 40, CX, CY, 1200)
  grd.addColorStop(0, '#16141d')
  grd.addColorStop(0.5, '#0d0c12')
  grd.addColorStop(1, '#050507')
  g.fillStyle = grd
  g.fillRect(0, 0, W, H)
  const r = rng(11)
  // a faint violet haze, very low
  for (let i = 0; i < 4; i++) {
    const x = r() * W, y = 300 + r() * 1200, s = 300 + r() * 400
    const h = g.createRadialGradient(x, y, 0, x, y, s)
    h.addColorStop(0, 'rgba(120,100,200,0.035)')
    h.addColorStop(1, 'rgba(120,100,200,0)')
    g.fillStyle = h
    g.fillRect(x - s, y - s, s * 2, s * 2)
  }
  for (let i = 0; i < 520; i++) {
    g.fillStyle = `rgba(235,230,225,${0.05 + r() * r() * 0.4})`
    g.beginPath()
    g.arc(r() * W, r() * H, 0.5 + r() * 1.1, 0, TAU)
    g.fill()
  }
  for (let i = 0; i < 4; i++) {
    const c = layer(256, 256)
    const cg = c.getContext('2d')
    const d = cg.createImageData(256, 256)
    const rr = rng(31 + i)
    for (let p = 0; p < d.data.length; p += 4) {
      d.data[p] = d.data[p + 1] = d.data[p + 2] = rr() * 255
      d.data[p + 3] = 255
    }
    cg.putImageData(d, 0, 0)
    grainTiles.push(c)
  }
  for (let i = 0; i < 70; i++) twinkles.push({ x: r() * W, y: r() * H, s: 0.9 + r() * 1.6, ph: r() * TAU, sp: 0.5 + r() * 1.8 })
  for (let i = 0; i < 26; i++) motes.push({ x: r() * W, y: r() * H, s: 0.8 + r() * 1.4, vy: 6 + r() * 14, ph: r() * TAU })
}

// ---------- tracker, labels, wordmark ----------

let STEPS = [] // {t, step}
let STEP_NAMES = []
function stepAt(t) {
  let cur = -1, since = -99
  for (const s of STEPS) if (t >= s.t && s.step > cur) { cur = s.step; since = s.t }
  return { cur, since }
}
function drawTracker(g, t) {
  if (!STEPS.length || !STEP_NAMES.length) return
  const first = STEPS[0].t
  if (t < first) return
  const vis = easeOut(clamp((t - first) / 0.5)) * (1 - clamp((t - (DURATION - 0.5)) / 0.5))
  const { cur, since } = stepAt(t)
  const n = STEP_NAMES.length
  const gap = 210
  const xs = STEP_NAMES.map((_, i) => CX + (i - (n - 1) / 2) * gap)
  g.save()
  g.globalAlpha = vis
  // dotted connectors
  for (let i = 0; i + 1 < n; i++) {
    for (let x = xs[i] + 26; x < xs[i + 1] - 22; x += 7) dot(g, x, TRACK_Y, 1.25, i < cur ? COL.gold : COL.ink, vis * (i < cur ? 0.7 : 0.32))
  }
  xs.forEach((x, i) => {
    const on = i <= cur
    const k = on ? (i === cur ? easeOut(clamp((t - since) / 0.6)) : 1) : 0
    g.globalAlpha = vis
    if (k > 0) {
      g.save()
      g.globalCompositeOperation = 'lighter'
      glow(g, x, TRACK_Y, 44 + (i === cur ? 10 * Math.sin(t * 2.2) : 0), '#ffcf7a', 0.55 * k)
      if (i === cur && t - since < 0.8) sparkle(g, x, TRACK_Y, 40 * (1 - (t - since) / 0.8), '#ffffff', 1 - (t - since) / 0.8, t)
      g.restore()
    }
    g.globalAlpha = vis
    g.lineWidth = 2.2
    g.strokeStyle = on ? rgba(COL.gold, 0.6 + 0.4 * k) : 'rgba(243,236,224,0.65)'
    g.beginPath()
    g.arc(x, TRACK_Y, 11, 0, TAU)
    g.stroke()
    if (k > 0) dot(g, x, TRACK_Y, 5.5 * k, COL.goldHi, vis)
    g.globalAlpha = vis
    g.font = '700 17px "Space Mono"'
    g.letterSpacing = '3px'
    g.textAlign = 'center'
    g.textBaseline = 'middle'
    g.fillStyle = on ? rgba(COL.gold, 0.7 + 0.3 * k) : 'rgba(150,146,158,0.8)'
    g.fillText(STEP_NAMES[i], x + 1.5, TRACK_Y + 36)
  })
  g.restore()
}

let LABELS = [] // {t0, t1, text}
function drawLabels(g, t) {
  for (const L of LABELS) {
    if (t < L.t0 || t > L.t1 + 0.4) continue
    const k = clamp((t - L.t0) / 0.6)
    const out = clamp((t - L.t1) / 0.4)
    const chars = [...L.text]
    const n = Math.ceil(chars.length * k)
    g.save()
    g.globalAlpha = (1 - out) * 0.95
    g.font = '700 25px "Space Mono"'
    g.letterSpacing = '7px'
    g.textAlign = 'center'
    g.textBaseline = 'middle'
    g.fillStyle = COL.gold
    g.shadowColor = 'rgba(232,199,122,0.45)'
    g.shadowBlur = 14
    // lay out the full string so typing doesn't shift it
    const full = g.measureText(L.text).width
    g.textAlign = 'left'
    g.fillText(chars.slice(0, n).join(''), CX - full / 2 + 3.5, LABEL_Y)
    g.restore()
  }
}

function drawWordmark(g, a = 0.42, y = 80) {
  g.save()
  g.globalAlpha = a
  g.font = 'italic 500 40px "EB Garamond"'
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.shadowColor = 'rgba(243,236,224,0.3)'
  g.shadowBlur = 14
  g.fillStyle = COL.ink
  g.fillText('Align', CX, y)
  g.restore()
}

// ---------- captions ----------

const CAP = { size: 58, lh: 78, maxW: 900, y: 1585 }
const PILL_Y = 1750
let lines = []
function layoutCaptions(tl) {
  lines = tl.lines.map((ln) => {
    const words = ln.words.map((w) => ({ ...w }))
    for (const w of words) {
      ctx.font = `${w.em ? 600 : 400} ${CAP.size}px Poppins`
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

function drawCaptions(g, t, all = false) {
  const handover = (a, b) => Math.max(a.end, b.start - 0.22)
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i]
    const prev = lines[i - 1], next = lines[i + 1]
    const samePrev = prev && prev.scene === ln.scene
    const sameNext = next && next.scene === ln.scene
    const show = i === 0 ? -1 : samePrev ? handover(prev, ln) : ln.start - 0.2
    const fadeIn = i === 0 ? 1 : clamp((t - show) / 0.12)
    const fadeOut = sameNext ? clamp((handover(ln, next) - t) / 0.12) : 1 - clamp((t - ln.hideAt) / 0.18)
    if (!all && (t < show || fadeOut <= 0)) continue
    const a = all ? 1 : Math.min(fadeIn, fadeOut)
    const lift = i === 0 || all ? 0 : (1 - easeOut(clamp((t - show) / 0.25))) * 12
    g.save()
    g.globalAlpha = a
    g.textBaseline = 'middle'
    for (const w of ln.words) {
      const spoken = all ? 1 : clamp((t - w.s + 0.04) / 0.1)
      const active = !all && t >= w.s - 0.04 && t < w.e + 0.1
      g.font = `${w.em ? 600 : 400} ${CAP.size}px Poppins`
      g.shadowColor = 'rgba(0,0,0,0)'
      g.shadowBlur = 0
      const brand = /^Align[.,]?$/.test(w.w)
      const dim = [92, 90, 100]
      const lit = brand ? [232, 199, 122] : active ? [255, 255, 255] : [214, 210, 204]
      const c = dim.map((v, j) => Math.round(lerp(v, lit[j], spoken)))
      g.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`
      if (active && spoken > 0) {
        // a soft halo behind the word being said, then the crisp word on top
        g.save()
        g.globalAlpha = a * spoken * (w.em ? 0.9 : 0.6)
        g.shadowColor = brand ? 'rgba(232,199,122,0.9)' : 'rgba(255,255,255,0.75)'
        g.shadowBlur = w.em ? 22 : 14
        g.fillText(w.w, w.x, w.y + lift)
        g.restore()
      }
      g.fillText(w.w, w.x, w.y + lift)
    }
    g.restore()
  }
}

// ---------- the follow pill ----------

function drawPill(g, t, pill) {
  if (!pill || t < pill.at) return
  const k = clamp((t - pill.at) / 0.5)
  const sc = 0.6 + 0.4 * easeOut(k) + Math.sin(k * Math.PI) * 0.06
  g.save()
  g.font = '600 32px Poppins'
  g.letterSpacing = '3px'
  const tw = g.measureText(pill.text).width
  const w = tw + 130, h = 92, x = CX - w / 2, y = PILL_Y - h / 2
  g.translate(CX, PILL_Y)
  g.scale(sc, sc)
  g.translate(-CX, -PILL_Y)
  g.globalAlpha = easeOut(k)
  g.shadowColor = 'rgba(255,255,255,0.4)'
  g.shadowBlur = 40
  const grd = g.createLinearGradient(x, y, x, y + h)
  grd.addColorStop(0, '#f2f1f4')
  grd.addColorStop(1, '#b9b7c0')
  g.fillStyle = grd
  g.beginPath()
  g.roundRect(x, y, w, h, h / 2)
  g.fill()
  g.shadowBlur = 0
  g.strokeStyle = 'rgba(255,255,255,0.8)'
  g.lineWidth = 2
  g.stroke()
  // a sheen that sweeps across now and then
  const sx = x - 200 + (((t - pill.at) * 700) % (w + 900))
  const sh = g.createLinearGradient(sx, 0, sx + 160, 0)
  sh.addColorStop(0, 'rgba(255,255,255,0)')
  sh.addColorStop(0.5, 'rgba(255,255,255,0.75)')
  sh.addColorStop(1, 'rgba(255,255,255,0)')
  g.save()
  g.clip()
  g.fillStyle = sh
  g.fillRect(x, y, w, h)
  g.restore()
  g.fillStyle = '#1b1a22'
  g.textBaseline = 'middle'
  g.textAlign = 'center'
  g.fillText(pill.text, CX + 1.5, PILL_Y + 2)
  g.restore()
}

// ---------- scenes ----------

let SC = []
let PILL = null
let DURATION = 0
let artLayer, glowA, glowB

function build(script, tl) {
  DURATION = tl.duration
  STEP_NAMES = script.steps ?? ['RELEASE', 'WRITE', 'RECEIVE']
  STEPS = []
  LABELS = []
  SC = script.scenes.map((sc, i) => {
    const t = tl.scenes[i]
    const last = i === script.scenes.length - 1
    const stages = t.lines.map((ln) => ln.start - t.start - 0.1)
    stages[0] = i === 0 ? -0.55 : 0.0
    const env = {
      stages, dur: t.end - t.start,
      spans: t.lines.map((ln) => [ln.start - t.start, ln.end - t.start]),
      lines: t.lines.map((ln) => ({ words: ln.words.map((w) => ({ w: w.w, s: w.s - t.start })) })),
    }
    const s = new Sketch(hash(script.id + i), env)
    const art = ARTS[sc.art] ?? ARTS.numeral
    const o = sc.opts ?? {}
    if (o.scale || o.y) s.scale(o.scale ?? 1, 0, o.y ?? 0)
    art(s, o, sc.lines.length)
    for (const extra of sc.with ?? []) {
      const eo = extra.opts ?? {}
      s.scale(eo.scale ?? 0.5, eo.x ?? 0, eo.y ?? 0)
      ;(ARTS[extra.art] ?? ARTS.numeral)(s, eo, sc.lines.length)
    }
    // the scene dissolves into dust as the next one builds
    const outAt = last ? env.dur - 0.95 : env.dur - 0.12
    if (sc.step != null) STEPS.push({ t: t.start + 0.15, step: sc.step })
    const labs = []
    if (sc.label) labs.push({ at: 0, text: sc.label })
    for (const lb of sc.labels ?? []) labs.push({ at: lb.at ?? 0, text: lb.text })
    labs.sort((a, b) => a.at - b.at)
    labs.forEach((lb, j) => {
      const t0 = t.start + (lb.at === 0 ? (i === 0 ? 0 : 0.55) : stages[Math.min(lb.at, stages.length - 1)])
      const nx = labs[j + 1]
      const t1 = nx ? t.start + stages[Math.min(nx.at, stages.length - 1)] - 0.35 : t.start + outAt + 0.2
      LABELS.push({ t0, t1, text: lb.text })
    })
    return { start: t.start, end: t.end, s, env, outAt }
  })
  const last = script.scenes[script.scenes.length - 1]
  const lt = tl.scenes[tl.scenes.length - 1]
  if (last.pill) PILL = { text: last.pill, at: lt.lines[Math.min(last.pillAt ?? 1, lt.lines.length - 1)].end + 0.2 }
}

function drawScene(g, sc, t, full = false) {
  const lt = t - sc.start
  if (!full && (lt < -1 || lt > sc.outAt + DUST + 0.7)) return
  const T = full ? 30 : lt
  for (const f of sc.s.fxs) {
    if (!full && lt < f.t) continue
    const k = full ? 1 : ease(clamp((lt - f.t) / f.dur))
    const oT = f.out ?? sc.outAt
    const ok = full ? 0 : clamp((lt - oT) / f.outDur)
    if (ok >= 1) continue
    g.save()
    g.globalAlpha = 1 - ok
    const { s, dx, dy } = f.tf
    if (s !== 1 || dx || dy) {
      g.translate(CX + dx, CY + dy)
      g.scale(s, s)
      g.translate(-CX, -CY)
    }
    f.draw(g, k, T, ok)
    g.restore()
  }
  g.save()
  for (const d of sc.s.dots) {
    let a = d.a, x = d.x, y = d.y, r = d.r, c = d.c
    let flash = 0
    if (!full) {
      if (lt < d.t) continue
      const age = lt - d.t
      a *= clamp(age / 0.08)
      flash = d.flash * clamp(1 - age / 0.4)
      const oT = d.out ?? sc.outAt + (d.ph / TAU) * 0.4
      if (lt > oT) {
        const q = (lt - oT) / DUST
        if (q >= 1) continue
        const e = easeOut(q)
        x += (x - CX) * 0.22 * e + d.vx * 200 * e + Math.sin(d.ph + q * 5) * 12 * q
        y += (y - CY) * 0.12 * e - (30 + d.vy * 150) * e
        a *= Math.pow(1 - q, 1.3) * (0.55 + 0.45 * Math.sin(q * 22 + d.ph))
        r *= 1 - 0.45 * q
        if (q < 0.25) flash = Math.max(flash, (0.25 - q) * 2.4 * (d.vy > 0.6 ? 1 : 0))
      }
    }
    if (d.tw) a *= 1 - d.tw * (0.5 + 0.5 * Math.sin(T * d.sp + d.ph))
    if (d.blink) a *= 0.3 + 0.7 * clamp(0.5 + 2 * Math.sin(T * Math.PI))
    dot(g, x, y, r, c, a)
    if (flash > 0) dot(g, x, y, r * (1 + flash * 1.1), COL.white, flash * 0.85)
  }
  g.restore()
}

function paint(t, { cover = false } = {}) {
  ctx.globalAlpha = 1
  ctx.drawImage(bg, 0, 0)
  for (const s of twinkles) {
    const a = 0.15 + 0.55 * (0.5 + 0.5 * Math.sin(t * s.sp + s.ph))
    dot(ctx, s.x, s.y, s.s, COL.ink, a * 0.75)
  }
  for (const m of motes) {
    const y = ((m.y - m.vy * t) % H + H) % H
    dot(ctx, m.x + Math.sin(t * 0.4 + m.ph) * 14, y, m.s, COL.goldHi, 0.18 + 0.15 * Math.sin(t * 1.3 + m.ph))
  }
  ctx.globalAlpha = 1
  const ag = artLayer.getContext('2d')
  ag.globalAlpha = 1
  ag.clearRect(0, 0, W, H)
  if (cover) drawScene(ag, SC[0], 0, true)
  else for (const sc of SC) drawScene(ag, sc, t)
  ag.globalAlpha = 1
  // bloom: a tight glow and a wide one
  const a = glowA.getContext('2d')
  a.clearRect(0, 0, glowA.width, glowA.height)
  a.filter = 'blur(4px)'
  a.drawImage(artLayer, 0, 0, glowA.width, glowA.height)
  a.filter = 'none'
  const b = glowB.getContext('2d')
  b.clearRect(0, 0, glowB.width, glowB.height)
  b.filter = 'blur(10px)'
  b.drawImage(artLayer, 0, 0, glowB.width, glowB.height)
  b.filter = 'none'
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  ctx.globalAlpha = 0.75
  ctx.drawImage(glowB, 0, 0, W, H)
  ctx.globalAlpha = 0.7
  ctx.drawImage(glowA, 0, 0, W, H)
  ctx.restore()
  ctx.drawImage(artLayer, 0, 0)
  drawWordmark(ctx, cover ? 0.7 : 0.42, cover ? 120 : 80)
  if (!cover) {
    drawTracker(ctx, t)
    drawLabels(ctx, t)
    drawCaptions(ctx, t)
    drawPill(ctx, t, PILL)
  }
  ctx.save()
  ctx.globalCompositeOperation = 'overlay'
  ctx.globalAlpha = 0.05
  const tile = grainTiles[Math.floor(t * 24) % grainTiles.length]
  for (let y = 0; y < H; y += 256) for (let x = 0; x < W; x += 256) ctx.drawImage(tile, x, y)
  ctx.restore()
  const edge = cover ? 1 : clamp((DURATION - t) / 0.5)
  if (edge < 1) {
    ctx.fillStyle = `rgba(4,4,6,${1 - edge})`
    ctx.fillRect(0, 0, W, H)
  }
}

// the cover: the first object, fully built, and the hook, fully lit
function paintCoverText(text) {
  const words = text.split(/\s+/).map((w) => ({ w: w.replace(/\*/g, ''), em: /\*/.test(w), s: -1, e: -1 }))
  const saved = lines
  const savedCap = { ...CAP }
  Object.assign(CAP, { size: 70, lh: 92, y: 1500, maxW: 860 })
  layoutCaptions({ lines: [{ start: 0, end: 0, words, scene: 0, hideAt: 1e9 }] })
  ctx.save()
  ctx.shadowColor = 'rgba(0,0,0,0.6)'
  for (const ln of lines) for (const w of ln.words) {
    ctx.font = `${w.em ? 700 : 600} ${CAP.size}px Poppins`
    ctx.textBaseline = 'middle'
    ctx.fillStyle = w.em ? COL.gold : '#f4f1ec'
    ctx.shadowColor = w.em ? 'rgba(232,199,122,0.6)' : 'rgba(255,255,255,0.25)'
    ctx.shadowBlur = w.em ? 26 : 10
    ctx.fillText(w.w, w.x, w.y)
  }
  ctx.restore()
  Object.assign(CAP, savedCap)
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
  glowA = layer(W / 2, H / 2)
  glowB = layer(W / 6, H / 6)
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
  paint(0, { cover: true })
  paintCoverText(text)
  return canvas.toDataURL('image/jpeg', q)
}
