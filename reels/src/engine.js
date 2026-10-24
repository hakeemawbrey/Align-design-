// Align reels scene engine. Runs in a browser page: setup(script, assets)
// pre-paints every scene's static layers, then frame(t) composites one frame
// at time t (seconds) onto the canvas. Everything is procedural and seeded,
// so the same script always renders the same video.

const W = 1080
const H = 1920
const FPS = 30
const SCENE = 3.4 // seconds per line
const FADE = 0.9 // crossfade between scenes
const OUTRO = 2.6 // the align mark after the last line

const canvas = document.getElementById('c')
canvas.width = W
canvas.height = H
const ctx = canvas.getContext('2d')

// ---------- small helpers ----------

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
const ease = (k) => k * k * (3 - 2 * k)
function hex(h) {
  const n = parseInt(h.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
function mix(a, b, k) {
  const A = typeof a === 'string' ? hex(a) : a
  const B = typeof b === 'string' ? hex(b) : b
  return A.map((v, i) => Math.round(lerp(v, B[i], k)))
}
const css = (c, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`
function layer(w = W, h = H) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  return c
}

// ---------- palette ----------

const SKIES = {
  night: ['#04030c', '#0b0f2e', '#1b2552'],
  dusk: ['#0e0b2a', '#4b3878', '#ec9472'],
  teal: ['#06222c', '#1c6b68', '#cfe3a2'],
  ember: ['#170610', '#6a1a24', '#ee7440'],
  dawn: ['#18284a', '#6a7aa6', '#f4cfa0'],
  violet: ['#08041c', '#3a1a6c', '#c873c4'],
}
// Ridge colours per sky, far → near. Collage-bright, like cut-out prints.
const RIDGES = {
  night: ['#2b3a72', '#1d6a78', '#123848', '#0a1a26'],
  dusk: ['#8a5a9a', '#5a3a7a', '#a8486a', '#2a1630'],
  teal: ['#7ab890', '#2f8a6e', '#c24a5a', '#0e3a34'],
  ember: ['#c8644a', '#8a2a2a', '#5a3a2a', '#1e0c0c'],
  dawn: ['#a0a8c8', '#7a8ab0', '#4a6a5a', '#1a2a2a'],
  violet: ['#7a4aa8', '#c04a8a', '#3a2a6a', '#140a24'],
}

let SIGN = '#f39a3a'
let tint = (c, k = 0.14) => mix(c, SIGN, k)

// ---------- texture ----------

let grainTiles = []
function makeGrain() {
  for (let i = 0; i < 4; i++) {
    const c = layer(512, 512)
    const g = c.getContext('2d')
    const d = g.createImageData(512, 512)
    const r = rng(77 + i)
    for (let p = 0; p < d.data.length; p += 4) {
      const v = r() * 255
      d.data[p] = d.data[p + 1] = d.data[p + 2] = v
      d.data[p + 3] = 255
    }
    g.putImageData(d, 0, 0)
    grainTiles.push(c)
  }
}
// Printed-paper texture baked into static layers: blotchy, low-frequency.
let paper
function makePaper() {
  paper = layer(W, H)
  const g = paper.getContext('2d')
  const r = rng(9)
  g.fillStyle = '#808080'
  g.fillRect(0, 0, W, H)
  for (let i = 0; i < 900; i++) {
    const x = r() * W, y = r() * H, s = 20 + r() * 140
    const grd = g.createRadialGradient(x, y, 0, x, y, s)
    const v = r() > 0.5 ? 255 : 0
    grd.addColorStop(0, `rgba(${v},${v},${v},${0.05 + r() * 0.05})`)
    grd.addColorStop(1, `rgba(${v},${v},${v},0)`)
    g.fillStyle = grd
    g.fillRect(x - s, y - s, s * 2, s * 2)
  }
  const d = g.getImageData(0, 0, W, H)
  for (let p = 0; p < d.data.length; p += 4) {
    const n = (r() - 0.5) * 46
    d.data[p] += n; d.data[p + 1] += n; d.data[p + 2] += n
  }
  g.putImageData(d, 0, 0)
}
// The paper is masked to the layer's own alpha first, so transparent areas
// stay transparent instead of turning into a grey sheet.
function texture(c, alpha = 0.5) {
  const m = layer(c.width, c.height)
  const mg = m.getContext('2d')
  mg.drawImage(paper, 0, 0, c.width, c.height)
  mg.globalCompositeOperation = 'destination-in'
  mg.drawImage(c, 0, 0)
  const g = c.getContext('2d')
  g.save()
  g.globalCompositeOperation = 'overlay'
  g.globalAlpha = alpha
  g.drawImage(m, 0, 0)
  g.restore()
}

// ---------- sky and stars ----------

function paintSky(g, sky, horizon = 0.62) {
  const [a, b, c] = SKIES[sky] ?? SKIES.night
  const grd = g.createLinearGradient(0, 0, 0, H * horizon)
  grd.addColorStop(0, css(tint(a, 0.08)))
  grd.addColorStop(0.55, css(tint(b, 0.16)))
  grd.addColorStop(1, css(tint(c, 0.12)))
  g.fillStyle = grd
  g.fillRect(0, 0, W, H)
}
function paintStars(g, seed, n, top = 0, bottom = H, maxA = 0.9) {
  const r = rng(seed)
  for (let i = 0; i < n; i++) {
    const x = r() * W, y = top + r() * (bottom - top)
    const s = r() < 0.94 ? 0.6 + r() * 1.2 : 1.8 + r() * 1.6
    g.fillStyle = `rgba(255,${235 + r() * 20},${215 + r() * 40},${0.25 + r() * (maxA - 0.25)})`
    g.beginPath()
    g.arc(x, y, s, 0, Math.PI * 2)
    g.fill()
  }
}
// A few bright stars drawn live so they twinkle.
function twinklers(seed, n, top = 0, bottom = H * 0.6) {
  const r = rng(seed)
  return Array.from({ length: n }, () => ({ x: r() * W, y: top + r() * (bottom - top), s: 1.4 + r() * 2.2, ph: r() * 6.28, sp: 0.8 + r() * 2 }))
}
function drawTwinkle(g, stars, t, alpha) {
  for (const s of stars) {
    const a = alpha * (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.sp + s.ph)))
    const grd = g.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.s * 5)
    grd.addColorStop(0, `rgba(255,248,230,${a})`)
    grd.addColorStop(1, 'rgba(255,248,230,0)')
    g.fillStyle = grd
    g.fillRect(s.x - s.s * 5, s.y - s.s * 5, s.s * 10, s.s * 10)
  }
}

// ---------- celestial bodies ----------

// Each body is painted once onto its own canvas, centred, radius r.
function makeBody(type, r, seed) {
  const pad = type === 'ringed' ? 2.3 : type === 'sun' ? 3.4 : 1.7
  const size = Math.ceil(r * 2 * pad)
  const c = layer(size, size)
  const g = c.getContext('2d')
  const cx = size / 2, cy = size / 2
  const R = rng(seed)

  const glow = (col, k, a) => {
    const grd = g.createRadialGradient(cx, cy, r * 0.9, cx, cy, r * k)
    grd.addColorStop(0, css(col, a))
    grd.addColorStop(1, css(col, 0))
    g.fillStyle = grd
    g.fillRect(0, 0, size, size)
  }
  const disc = (fill) => {
    g.save()
    g.beginPath()
    g.arc(cx, cy, r, 0, Math.PI * 2)
    g.clip()
    fill()
    g.restore()
  }
  const blotches = (n, cols, sMin, sMax, aMin, aMax) => {
    for (let i = 0; i < n; i++) {
      const a = R() * Math.PI * 2, d = Math.sqrt(R()) * r
      const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d, s = r * (sMin + R() * (sMax - sMin))
      const col = cols[Math.floor(R() * cols.length)]
      const grd = g.createRadialGradient(x, y, 0, x, y, s)
      grd.addColorStop(0, css(col, aMin + R() * (aMax - aMin)))
      grd.addColorStop(1, css(col, 0))
      g.fillStyle = grd
      g.fillRect(x - s, y - s, s * 2, s * 2)
    }
  }
  const bands = (cols, freq, wobble) => {
    const ph = R() * 10
    for (let y = -r; y < r; y += 2) {
      const k = 0.5 + 0.5 * Math.sin((y / r) * freq + ph + Math.sin((y / r) * 13 + ph) * wobble)
      const i = k * (cols.length - 1)
      const col = mix(cols[Math.floor(i)], cols[Math.min(cols.length - 1, Math.floor(i) + 1)], i % 1)
      g.fillStyle = css(col)
      g.fillRect(cx - r, cy + y, r * 2, 2.5)
    }
  }
  const shade = (dx = -0.35, dy = -0.3, dark = 0.75) => {
    const grd = g.createRadialGradient(cx + r * dx, cy + r * dy, r * 0.1, cx, cy, r * 1.05)
    grd.addColorStop(0, 'rgba(255,255,255,0.10)')
    grd.addColorStop(0.6, 'rgba(0,0,0,0)')
    grd.addColorStop(1, `rgba(0,0,10,${dark})`)
    g.fillStyle = grd
    g.fillRect(cx - r, cy - r, r * 2, r * 2)
  }

  if (type === 'moon' || type === 'crescent') {
    glow([255, 250, 235], 1.55, 0.16)
    disc(() => {
      const grd = g.createRadialGradient(cx - r * 0.2, cy - r * 0.2, 0, cx, cy, r)
      grd.addColorStop(0, '#f3f1ea')
      grd.addColorStop(1, '#b4b2b0')
      g.fillStyle = grd
      g.fillRect(cx - r, cy - r, r * 2, r * 2)
      blotches(9, [[110, 112, 125]], 0.18, 0.42, 0.25, 0.45)
      blotches(60, [[90, 90, 100], [255, 255, 255]], 0.02, 0.08, 0.15, 0.4)
      shade(-0.3, -0.3, 0.45)
    })
    if (type === 'crescent') {
      g.save()
      g.globalCompositeOperation = 'destination-out'
      g.filter = `blur(${r * 0.04}px)`
      g.beginPath()
      g.arc(cx + r * 0.42, cy - r * 0.18, r * 0.96, 0, Math.PI * 2)
      g.fill()
      g.restore()
      g.save()
      g.globalCompositeOperation = 'source-atop'
      g.fillStyle = css(tint([255, 190, 120], 0.3), 0.55)
      g.fillRect(0, 0, size, size)
      g.restore()
    }
  } else if (type === 'ringed') {
    const cols = ['#e9d6a6', '#c9a46a', '#f1e4c0', '#a9824e', '#dcc08a'].map((c) => tint(c, 0.1))
    const ring = (front) => {
      g.save()
      g.translate(cx, cy)
      g.rotate(-0.2)
      g.scale(1, 0.2)
      g.beginPath()
      if (front) g.rect(-size, 0, size * 2, size)
      else g.rect(-size, -size, size * 2, size)
      g.clip()
      for (let i = 0; i < 26; i++) {
        const rr = r * (1.28 + i * 0.033)
        g.strokeStyle = css(mix('#e8d8b0', '#8a7050', R()), 0.18 + R() * 0.5)
        g.lineWidth = r * 0.03
        g.beginPath()
        g.arc(0, 0, rr, 0, Math.PI * 2)
        g.stroke()
      }
      g.restore()
    }
    ring(false)
    disc(() => {
      bands(cols, 9, 0.3)
      shade(-0.35, -0.35, 0.7)
    })
    ring(true)
  } else if (type === 'blue') {
    glow(tint([90, 170, 255], 0.1), 1.4, 0.22)
    disc(() => {
      bands(['#2a6ad0', '#4a9ae8', '#3a80dc', '#6ab8f0'].map((c) => hex(c)), 5, 0.6)
      blotches(14, [[160, 220, 255], [20, 60, 150]], 0.1, 0.3, 0.2, 0.4)
      shade(-0.3, -0.35, 0.8)
    })
  } else if (type === 'red') {
    glow([255, 120, 70], 1.35, 0.18)
    disc(() => {
      const grd = g.createLinearGradient(0, cy - r, 0, cy + r)
      grd.addColorStop(0, '#f4a070')
      grd.addColorStop(0.5, '#e0643a')
      grd.addColorStop(1, '#a8341e')
      g.fillStyle = grd
      g.fillRect(cx - r, cy - r, r * 2, r * 2)
      blotches(40, [[150, 40, 20], [255, 200, 150], [120, 30, 30]], 0.06, 0.3, 0.2, 0.5)
      shade(-0.3, -0.4, 0.7)
    })
  } else if (type === 'sun') {
    glow(tint([255, 200, 110], 0.15), 3.2, 0.3)
    glow([255, 230, 170], 1.6, 0.5)
    disc(() => {
      const grd = g.createRadialGradient(cx, cy, 0, cx, cy, r)
      grd.addColorStop(0, '#fffbe8')
      grd.addColorStop(0.7, '#ffe6a0')
      grd.addColorStop(1, css(tint([255, 180, 90], 0.2)))
      g.fillStyle = grd
      g.fillRect(cx - r, cy - r, r * 2, r * 2)
    })
  } else if (type === 'earth') {
    glow([120, 190, 255], 1.3, 0.25)
    disc(() => {
      g.fillStyle = '#1e5aa8'
      g.fillRect(cx - r, cy - r, r * 2, r * 2)
      blotches(18, [[70, 120, 60], [140, 120, 70]], 0.12, 0.32, 0.6, 0.85)
      blotches(40, [[255, 255, 255]], 0.05, 0.2, 0.25, 0.6)
      shade(-0.4, -0.3, 0.85)
    })
  }
  texture(c, 0.35)
  return c
}

// ---------- terrain ----------

// A ridge line by midpoint displacement, returned as y per x step.
function ridgeLine(seed, base, amp, rough = 0.55, steps = 256) {
  const r = rng(seed)
  const pts = new Array(steps + 1).fill(0)
  pts[0] = (r() - 0.5) * amp
  pts[steps] = (r() - 0.5) * amp
  let step = steps, a = amp
  while (step > 1) {
    const half = step / 2
    for (let i = half; i < steps; i += step) pts[i] = (pts[i - half] + pts[i + half]) / 2 + (r() - 0.5) * a
    a *= rough
    step = half
  }
  return pts.map((v) => base - Math.abs(v) * 0.6 - v * 0.4)
}
function fillRidge(g, pts, col, opts = {}) {
  const steps = pts.length - 1
  const top = Math.min(...pts)
  g.save()
  g.beginPath()
  g.moveTo(-20, H + 20)
  pts.forEach((y, i) => g.lineTo((i / steps) * (W + 40) - 20, y))
  g.lineTo(W + 20, H + 20)
  g.closePath()
  g.clip()
  const grd = g.createLinearGradient(0, top, 0, top + (opts.depth ?? 500))
  grd.addColorStop(0, css(mix(col, '#ffffff', opts.light ?? 0.28)))
  grd.addColorStop(0.25, css(col))
  grd.addColorStop(1, css(mix(col, '#000010', 0.55)))
  g.fillStyle = grd
  g.fillRect(0, top - 10, W, H)
  // Light strokes down the slopes, like an engraved print.
  const r = rng(hash(col) + pts.length)
  g.globalAlpha = 0.09
  for (let i = 0; i < 180; i++) {
    const x = r() * W
    const yi = pts[Math.round((x + 20) / (W + 40) * steps)]
    g.strokeStyle = r() > 0.5 ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'
    g.lineWidth = 1 + r() * 2
    g.beginPath()
    g.moveTo(x, yi + r() * 8)
    g.lineTo(x + (r() - 0.5) * 50, yi + 20 + r() * 70)
    g.stroke()
  }
  g.restore()
}
// Puffy white clouds tucked between cut-out ridges, in a few clumps.
function cloudBand(g, y, seed, a = 0.85) {
  const r = rng(seed)
  const clumps = 3 + Math.floor(r() * 3)
  for (let c = 0; c < clumps; c++) {
    const cx = (c + 0.2 + r() * 0.6) * (W / clumps), cw = 140 + r() * 200
    for (let i = 0; i < 26; i++) {
      const x = cx + (r() - 0.5) * cw * 2, s = 22 + r() * 46
      const yy = y - Math.abs(Math.sin(((x - cx) / cw) * 1.4)) * -10 - r() * 34 * (1 - Math.abs(x - cx) / (cw * 1.2))
      const grd = g.createRadialGradient(x - s * 0.3, yy - s * 0.4, s * 0.1, x, yy, s)
      grd.addColorStop(0, `rgba(255,253,250,${a})`)
      grd.addColorStop(0.65, `rgba(236,236,244,${a * 0.85})`)
      grd.addColorStop(1, 'rgba(220,222,236,0)')
      g.fillStyle = grd
      g.beginPath()
      g.arc(x, yy, s, 0, Math.PI * 2)
      g.fill()
    }
  }
}
function mountains(g, sky, seed, horizon, count = 3, clouds = true) {
  const cols = (RIDGES[sky] ?? RIDGES.night).map((c) => tint(c, 0.12))
  const span = H - horizon
  for (let i = 0; i < count; i++) {
    const base = horizon + span * (i / count) * 0.55 + 40
    const amp = 340 - i * 60
    fillRidge(g, ridgeLine(seed + i * 31, base, amp, 0.52 + i * 0.03), cols[i + (4 - count)] ?? cols[i], { depth: 420 + i * 120 })
    if (clouds && i < count - 1 && i % 2 === 0) cloudBand(g, base + 60, seed + i)
  }
}
function road(g, horizon, seed, opts = {}) {
  const vx = W * (opts.vx ?? 0.5)
  const bw = W * 1.3
  const asph = tint([46, 52, 66], 0.08)
  if (opts.ground !== false) {
    // Desert verges: warm ground with scrub, denser and bigger near the camera.
    const gg = g.createLinearGradient(0, horizon, 0, H)
    gg.addColorStop(0, css(tint([92, 74, 70], 0.18)))
    gg.addColorStop(1, css(tint([38, 28, 30], 0.12)))
    g.fillStyle = gg
    g.fillRect(0, horizon, W, H - horizon)
    const r = rng(seed + 5)
    for (let i = 0; i < 1800; i++) {
      const k = Math.pow(r(), 1.8)
      const y = lerp(horizon, H, k), x = r() * W, s = lerp(1, 16, k) * (0.4 + r())
      g.fillStyle = css(mix(tint([60, 70, 50], 0.2), [20, 18, 22], r() * 0.7), 0.5 + r() * 0.4)
      g.beginPath()
      g.ellipse(x, y, s, s * 0.55, 0, 0, Math.PI * 2)
      g.fill()
    }
  }
  g.save()
  g.beginPath()
  g.moveTo(vx - 6, horizon)
  g.lineTo(vx + 6, horizon)
  g.lineTo(W / 2 + bw / 2, H)
  g.lineTo(W / 2 - bw / 2, H)
  g.closePath()
  const grd = g.createLinearGradient(0, horizon, 0, H)
  grd.addColorStop(0, css(mix(asph, '#9aa0b0', 0.4)))
  grd.addColorStop(1, css(asph))
  g.fillStyle = grd
  g.fill()
  g.clip()
  // Asphalt speckle.
  const r = rng(seed)
  for (let i = 0; i < 2600; i++) {
    const y = horizon + Math.pow(r(), 0.7) * (H - horizon)
    g.fillStyle = `rgba(${r() > 0.5 ? 255 : 0},${r() > 0.5 ? 255 : 0},${r() > 0.5 ? 255 : 0},0.06)`
    g.fillRect(r() * W, y, 2, 2)
  }
  g.restore()
  // Edge lines.
  g.strokeStyle = 'rgba(240,236,226,0.75)'
  for (const side of [-1, 1]) {
    g.lineWidth = 6
    g.beginPath()
    g.moveTo(vx + side * 4, horizon)
    g.lineTo(W / 2 + side * bw * 0.42, H)
    g.stroke()
  }
}
// Centre dashes scroll toward the viewer, so it feels like driving.
function roadDashes(g, horizon, t, vx = 0.5) {
  const x0 = W * vx
  const col = 'rgba(246,206,74,0.9)'
  for (let i = 0; i < 14; i++) {
    const k0 = ((i + t * 0.9) % 14) / 14
    const k1 = k0 + 0.022
    const p0 = Math.pow(k0, 2.4), p1 = Math.pow(k1, 2.4)
    const y0 = lerp(horizon, H, p0), y1 = lerp(horizon, H, p1)
    const w0 = lerp(1, 22, p0), w1 = lerp(1, 22, p1)
    g.fillStyle = col
    g.beginPath()
    g.moveTo(lerp(x0, W / 2, p0) - w0 / 2, y0)
    g.lineTo(lerp(x0, W / 2, p0) + w0 / 2, y0)
    g.lineTo(lerp(x0, W / 2, p1) + w1 / 2, y1)
    g.lineTo(lerp(x0, W / 2, p1) - w1 / 2, y1)
    g.fill()
  }
}
function wheat(g, horizon, seed) {
  const grd = g.createLinearGradient(0, horizon, 0, H)
  grd.addColorStop(0, css(tint([150, 120, 70], 0.08)))
  grd.addColorStop(1, css(tint([70, 48, 22], 0.08)))
  g.fillStyle = grd
  g.fillRect(0, horizon, W, H - horizon)
  const r = rng(seed)
  for (let i = 0; i < 9000; i++) {
    const k = Math.pow(r(), 1.6)
    const y = lerp(horizon, H + 40, k)
    const len = lerp(4, 90, k)
    const x = r() * W
    const c = mix('#e8c47a', '#8a5a2a', r() * 0.8)
    g.strokeStyle = css(c, 0.25 + r() * 0.55)
    g.lineWidth = lerp(0.6, 3.2, k)
    g.beginPath()
    g.moveTo(x, y)
    g.quadraticCurveTo(x + (r() - 0.3) * len * 0.3, y - len * 0.5, x + (r() - 0.2) * len * 0.4, y - len)
    g.stroke()
  }
  // Light falling across the field from the sky.
  const sh = g.createLinearGradient(0, horizon, 0, horizon + 220)
  sh.addColorStop(0, 'rgba(255,230,180,0.25)')
  sh.addColorStop(1, 'rgba(255,230,180,0)')
  g.fillStyle = sh
  g.fillRect(0, horizon, W, 220)
}

// ---------- scenes ----------

// Each builder returns { layers: [{canvas, depth}], live(g, t, p), textY }.
// depth 0 is the far sky; bigger depths push in faster (parallax).
const BUILD = {
  void(s, seed) {
    const sky = layer()
    const g = sky.getContext('2d')
    const grd = g.createRadialGradient(W / 2, H * 0.4, 0, W / 2, H * 0.45, H * 0.8)
    grd.addColorStop(0, css(tint('#141a3a', 0.15)))
    grd.addColorStop(1, css(tint('#030209', 0.05)))
    g.fillStyle = grd
    g.fillRect(0, 0, W, H)
    paintStars(g, seed, 1400)
    texture(sky, 0.25)
    const layers = [{ canvas: sky, depth: 0 }]
    const body = s.body ?? 'moon'
    if (body !== 'none') layers.push(bodyLayer(body, body === 'sun' ? 120 : 200, W / 2, H * 0.36, seed, 0.6))
    const stars = twinklers(seed + 1, 40, 0, H)
    return {
      layers,
      live: (g, t, p) => { drawTwinkle(g, stars, t, 0.9); comet(g, seed, t) },
      textY: body === 'none' ? H * 0.46 : H * 0.53,
    }
  },
  ridge(s, seed) {
    const horizon = H * 0.56
    const sky = layer(), land = layer()
    paintSky(sky.getContext('2d'), s.sky ?? 'night', 0.66)
    paintStars(sky.getContext('2d'), seed, 500, 0, horizon, 0.7)
    texture(sky, 0.3)
    mountains(land.getContext('2d'), s.sky ?? 'night', seed, horizon, 3)
    if (s.road) road(land.getContext('2d'), H * 0.78, seed)
    texture(land, 0.5)
    const layers = [{ canvas: sky, depth: 0 }]
    if ((s.body ?? 'moon') !== 'none') layers.push(bodyLayer(s.body ?? 'moon', 150, W * 0.5, H * 0.2, seed, 0.4))
    layers.push({ canvas: land, depth: 1 })
    const stars = twinklers(seed + 2, 18, 0, horizon * 0.8)
    return { layers, live: (g, t) => { drawTwinkle(g, stars, t, 0.6); if (s.road) roadDashes(g, H * 0.78, t) }, textY: H * 0.37 }
  },
  road(s, seed) {
    const horizon = H * 0.6
    const sky = layer(), land = layer()
    const sg = sky.getContext('2d')
    paintSky(sg, s.sky ?? 'dusk', 0.62)
    paintStars(sg, seed, 420, 0, horizon * 0.85, 0.6)
    texture(sky, 0.3)
    const lg = land.getContext('2d')
    const cols = (RIDGES[s.sky] ?? RIDGES.dusk).map((c) => tint(c, 0.12))
    fillRidge(lg, ridgeLine(seed + 9, horizon - 60, 520, 0.5), cols[0], { depth: 400 })
    fillRidge(lg, ridgeLine(seed, horizon + 10, 260, 0.52), cols[1], { depth: 300 })
    fillRidge(lg, ridgeLine(seed + 3, horizon + 40, 120, 0.55), cols[3], { depth: 600, light: 0.12 })
    road(lg, horizon, seed)
    texture(land, 0.5)
    const layers = [{ canvas: sky, depth: 0 }]
    if ((s.body ?? 'moon') !== 'none') layers.push(bodyLayer(s.body ?? 'moon', 120, W * 0.5, H * 0.22, seed, 0.35))
    layers.push({ canvas: land, depth: 1 })
    return { layers, live: (g, t) => roadDashes(g, horizon, t), textY: H * 0.4 }
  },
  lake(s, seed) {
    const horizon = H * 0.58
    const top = layer()
    const g = top.getContext('2d')
    paintSky(g, s.sky ?? 'night', 0.58)
    paintStars(g, seed, 500, 0, horizon, 0.7)
    const body = s.body ?? 'moon'
    if (body !== 'none') {
      const b = makeBody(body, 110, seed)
      g.drawImage(b, W * 0.62 - b.width / 2, H * 0.24 - b.height / 2)
    }
    const cols = (RIDGES[s.sky] ?? RIDGES.night).map((c) => tint(c, 0.12))
    fillRidge(g, ridgeLine(seed, horizon - 120, 620, 0.5), cols[0], { depth: 500 })
    cloudBand(g, horizon - 70, seed, 0.7)
    fillRidge(g, ridgeLine(seed + 7, horizon - 20, 300, 0.56), cols[2], { depth: 300 })
    texture(top, 0.4)
    // Mirror the top half into the water, darker and tinted.
    const full = layer()
    const f = full.getContext('2d')
    f.drawImage(top, 0, 0, W, horizon, 0, 0, W, horizon)
    f.save()
    f.translate(0, horizon * 2)
    f.scale(1, -1)
    f.globalAlpha = 0.75
    f.drawImage(top, 0, 0, W, horizon, 0, 0, W, horizon)
    f.restore()
    const wg = f.createLinearGradient(0, horizon, 0, H)
    wg.addColorStop(0, css(tint([20, 60, 90], 0.15), 0.35))
    wg.addColorStop(1, css(tint([4, 10, 24], 0.1), 0.85))
    f.fillStyle = wg
    f.fillRect(0, horizon, W, H - horizon)
    return {
      layers: [{ canvas: full, depth: 0.5 }],
      live: (g, t) => shimmer(g, horizon, t, seed),
      textY: H * 0.44,
    }
  },
  arch(s, seed) {
    const bg = layer()
    const g = bg.getContext('2d')
    g.fillStyle = css(tint('#0b0a14', 0.05))
    g.fillRect(0, 0, W, H)
    paintStars(g, seed, 160, 0, H, 0.35)
    texture(bg, 0.25)
    // The landscape inside the arch.
    const inner = layer()
    const ig = inner.getContext('2d')
    const horizon = H * 0.5
    paintSky(ig, s.sky ?? 'violet', 0.5)
    paintStars(ig, seed + 5, 300, 0, horizon, 0.7)
    if ((s.body ?? 'moon') !== 'none') {
      const b = makeBody(s.body ?? 'moon', 70, seed)
      ig.drawImage(b, W / 2 - b.width / 2, H * 0.27 - b.height / 2)
    }
    mountains(ig, s.sky ?? 'violet', seed, horizon, 3)
    texture(inner, 0.5)
    const aw = W * 0.6, ah = H * 0.44, ax = (W - aw) / 2, ay = H * 0.16
    const path = (gg, inset = 0) => {
      gg.beginPath()
      gg.moveTo(ax + inset, ay + ah - inset)
      gg.lineTo(ax + inset, ay + aw / 2)
      gg.arc(W / 2, ay + aw / 2, aw / 2 - inset, Math.PI, 0)
      gg.lineTo(ax + aw - inset, ay + ah - inset)
      gg.closePath()
    }
    return {
      layers: [{ canvas: bg, depth: 0 }],
      live: (gg, t, p) => {
        gg.save()
        gg.shadowColor = css(tint([255, 220, 180], 0.4), 0.35)
        gg.shadowBlur = 60
        path(gg)
        gg.fillStyle = '#000'
        gg.fill()
        gg.restore()
        gg.save()
        path(gg)
        gg.clip()
        const s2 = 1.05 + p * 0.08
        gg.translate(W / 2, ay + ah * 0.6)
        gg.scale(s2, s2)
        gg.translate(-W / 2, -(ay + ah * 0.6) + (H * 0.5 - (ay + ah * 0.6)) * -0.6)
        gg.drawImage(inner, 0, -H * 0.12 + p * 30)
        gg.restore()
      },
      textY: ay + ah + 150,
    }
  },
  ripple(s, seed) {
    const base = BUILD.road({ ...s, body: 'none', sky: s.sky ?? 'night' }, seed)
    const body = bodyLayer(s.body ?? 'moon', 120, W / 2, H * 0.24, seed, 0.3)
    base.layers.splice(1, 0, body)
    const roadLive = base.live
    base.live = (g, t, p) => {
      for (let i = 0; i < 6; i++) {
        const k = ((t * 0.35 + i / 6) % 1)
        g.strokeStyle = css(tint([240, 236, 220], 0.3), (1 - k) * 0.5)
        g.lineWidth = 3
        g.beginPath()
        g.arc(W / 2, H * 0.24 - p * 20, 140 + k * 360, 0, Math.PI * 2)
        g.stroke()
      }
      roadLive(g, t, p)
    }
    return base
  },
  burst(s, seed) {
    const land = layer()
    const lg = land.getContext('2d')
    mountains(lg, s.sky ?? 'teal', seed, H * 0.66, 3)
    texture(land, 0.5)
    const sky = SKIES[s.sky ?? 'teal'] ?? SKIES.teal
    const c1 = tint(sky[1], 0.2), c2 = tint(sky[2], 0.15)
    const body = bodyLayer(s.body ?? 'red', 130, W / 2, H * 0.36, seed, 0.5)
    return {
      layers: [body, { canvas: land, depth: 1 }],
      under: (g, t) => {
        g.fillStyle = css(mix(c1, '#000000', 0.5))
        g.fillRect(0, 0, W, H)
        g.save()
        g.translate(W / 2, H * 0.36)
        g.rotate(t * 0.06)
        const n = 72
        for (let i = 0; i < n; i += 2) {
          g.fillStyle = css(c2, 0.8)
          g.beginPath()
          g.moveTo(0, 0)
          g.arc(0, 0, H * 1.2, (i / n) * Math.PI * 2, ((i + 1) / n) * Math.PI * 2)
          g.fill()
        }
        // Concentric halo pulsing outward.
        for (let i = 0; i < 9; i++) {
          const k = (i / 9 + t * 0.12) % 1
          g.strokeStyle = css(mix(c1, '#000000', 0.3), 0.35 * (1 - k))
          g.lineWidth = 10 * (1 - k) + 3
          g.beginPath()
          g.arc(0, 0, 200 + k * 700, 0, Math.PI * 2)
          g.stroke()
        }
        g.restore()
        const v = g.createRadialGradient(W / 2, H * 0.36, 200, W / 2, H * 0.36, H * 0.75)
        v.addColorStop(0, 'rgba(0,0,0,0)')
        v.addColorStop(1, 'rgba(0,0,0,0.55)')
        g.fillStyle = v
        g.fillRect(0, 0, W, H)
      },
      textY: H * 0.53,
    }
  },
  rise(s, seed) {
    const sky = layer(), land = layer()
    paintSky(sky.getContext('2d'), s.sky ?? 'dusk', 0.6)
    paintStars(sky.getContext('2d'), seed, 700, 0, H * 0.6, 0.8)
    texture(sky, 0.3)
    const horizon = H * 0.66
    mountains(land.getContext('2d'), s.sky ?? 'dusk', seed, horizon, 2)
    texture(land, 0.5)
    const R = W * 0.78
    const planet = makeBody(s.body ?? 'red', R, seed)
    return {
      layers: [{ canvas: sky, depth: 0 }],
      live: (g, t, p) => {
        const y = horizon + R * 0.62 - ease(p) * 160
        g.drawImage(planet, W / 2 - planet.width / 2, y - planet.height / 2)
        const s2 = 1.02 + p * 0.07
        g.save()
        g.translate(W / 2, H)
        g.scale(s2, s2)
        g.drawImage(land, -W / 2, -H)
        g.restore()
      },
      textY: H * 0.3,
    }
  },
  figure(s, seed) {
    const sky = layer()
    const g = sky.getContext('2d')
    g.fillStyle = css(tint('#05040e', 0.06))
    g.fillRect(0, 0, W, H)
    paintStars(g, seed, 1100)
    texture(sky, 0.25)
    const img = window.ASSETS.figureSoft
    const stars = twinklers(seed, 30, 0, H)
    return {
      layers: [{ canvas: sky, depth: 0 }],
      live: (gg, t, p) => {
        drawTwinkle(gg, stars, t, 0.8)
        if (!img) return
        const w = W * (0.92 + p * 0.08)
        const h = (w * img.height) / img.width
        gg.save()
        gg.globalCompositeOperation = 'screen'
        gg.globalAlpha = 0.95
        gg.drawImage(img, W / 2 - w / 2, H * 0.36 - h / 2 + Math.sin(t * 0.8) * 10, w, h)
        gg.restore()
      },
      textY: H * 0.63,
    }
  },
  field(s, seed) {
    const horizon = H * 0.6
    const sky = layer(), land = layer()
    paintSky(sky.getContext('2d'), s.sky ?? 'dawn', 0.6)
    paintStars(sky.getContext('2d'), seed, 260, 0, horizon * 0.7, 0.5)
    texture(sky, 0.3)
    const lg = land.getContext('2d')
    const cols = (RIDGES[s.sky] ?? RIDGES.dawn).map((c) => tint(c, 0.12))
    fillRidge(lg, ridgeLine(seed, horizon, 140, 0.5), cols[0], { depth: 200, light: 0.35 })
    cloudBand(lg, horizon + 10, seed, 0.6)
    wheat(lg, horizon + 30, seed)
    if (s.road) road(lg, horizon + 30, seed)
    texture(land, 0.45)
    const layers = [{ canvas: sky, depth: 0 }]
    if ((s.body ?? 'sun') !== 'none') layers.push(bodyLayer(s.body ?? 'sun', 110, W * 0.5, H * 0.24, seed, 0.35))
    layers.push({ canvas: land, depth: 1 })
    return { layers, live: (g, t) => { if (s.road) roadDashes(g, horizon + 30, t) }, textY: H * 0.42 }
  },
}

function bodyLayer(type, r, x, y, seed, depth) {
  const b = makeBody(type, r, seed)
  const c = layer()
  c.getContext('2d').drawImage(b, x - b.width / 2, y - b.height / 2)
  return { canvas: c, depth, float: true }
}
function shimmer(g, horizon, t, seed) {
  const r = rng(seed)
  for (let i = 0; i < 70; i++) {
    const y = horizon + 8 + Math.pow(r(), 1.5) * (H - horizon)
    const x = (r() * W + t * (10 + r() * 30)) % (W + 200) - 100
    const w = 30 + r() * 160
    g.strokeStyle = `rgba(255,250,235,${0.08 + 0.12 * (0.5 + 0.5 * Math.sin(t * 2 + i))})`
    g.lineWidth = 2
    g.beginPath()
    g.moveTo(x, y)
    g.lineTo(x + w, y)
    g.stroke()
  }
}
// A shooting star crosses some void scenes once.
function comet(g, seed, t) {
  const r = rng(seed + 99)
  if (r() > 0.6) return
  const start = 0.6 + r() * 1.4, dur = 0.9
  const k = (t - start) / dur
  if (k < 0 || k > 1) return
  const x0 = W * (0.1 + r() * 0.4), y0 = H * (0.05 + r() * 0.15)
  const x = x0 + k * 700, y = y0 + k * 260
  const grd = g.createLinearGradient(x - 260, y - 97, x, y)
  grd.addColorStop(0, 'rgba(255,255,255,0)')
  grd.addColorStop(1, `rgba(255,250,235,${0.9 * Math.sin(k * Math.PI)})`)
  g.strokeStyle = grd
  g.lineWidth = 3
  g.beginPath()
  g.moveTo(x - 260, y - 97)
  g.lineTo(x, y)
  g.stroke()
}

// ---------- text ----------

const TEXT = { size: 52, color: '#f6d550', font: 'Poppins', weight: 500 }
function wrap(g, text, max) {
  const words = text.split(' ')
  const lines = []
  let cur = ''
  for (const w of words) {
    const next = cur ? cur + ' ' + w : w
    if (g.measureText(next).width > max && cur) { lines.push(cur); cur = w } else cur = next
  }
  if (cur) lines.push(cur)
  // Avoid a lonely last word.
  if (lines.length > 1 && !lines[lines.length - 1].includes(' ')) {
    const prev = lines[lines.length - 2].split(' ')
    if (prev.length > 2) {
      lines[lines.length - 1] = prev.pop() + ' ' + lines[lines.length - 1]
      lines[lines.length - 2] = prev.join(' ')
    }
  }
  return lines
}
function drawText(g, text, y, alpha, rise) {
  if (alpha <= 0) return
  g.save()
  g.font = `italic ${TEXT.weight} ${TEXT.size}px ${TEXT.font}`
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  const lines = wrap(g, text, W * 0.68)
  const lh = TEXT.size * 1.28
  const y0 = y - ((lines.length - 1) * lh) / 2 + rise
  // A soft dark pool behind the words keeps them readable on any scene.
  const tw = Math.max(...lines.map((l) => g.measureText(l).width))
  const th = lines.length * lh
  g.save()
  g.globalAlpha = alpha * 0.5
  g.translate(W / 2, y0 + (th - lh) / 2)
  g.scale(1, (th + 120) / (tw + 200))
  const pool = g.createRadialGradient(0, 0, 0, 0, 0, (tw + 200) / 2)
  pool.addColorStop(0, 'rgba(4,3,14,0.85)')
  pool.addColorStop(1, 'rgba(4,3,14,0)')
  g.fillStyle = pool
  g.beginPath()
  g.arc(0, 0, (tw + 200) / 2, 0, Math.PI * 2)
  g.fill()
  g.restore()
  g.globalAlpha = alpha
  g.shadowColor = 'rgba(0,0,8,0.85)'
  g.shadowBlur = 22
  g.fillStyle = TEXT.color
  lines.forEach((l, i) => g.fillText(l, W / 2, y0 + i * lh))
  g.shadowBlur = 6
  lines.forEach((l, i) => g.fillText(l, W / 2, y0 + i * lh))
  g.restore()
}
function drawMark(g, alpha, y = H * 0.5, size = 30) {
  if (alpha <= 0) return
  g.save()
  g.globalAlpha = alpha
  g.font = `400 ${size}px 'Space Mono'`
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.fillStyle = '#f3ead8'
  g.letterSpacing = `${size * 0.24}px`
  g.fillText('align ✦', W / 2 + size * 0.12, y)
  g.restore()
}

// ---------- timeline ----------

let SCENES = []
let SCRIPT = null
const sceneBuf = layer()
const sbg = sceneBuf.getContext('2d')

window.setup = async (script, assets) => {
  SCRIPT = script
  SIGN = assets.signColor
  window.ASSETS = {}
  if (assets.figure) {
    const img = new Image()
    img.src = assets.figure
    await img.decode()
    // Feather the art into an oval so no photo edge shows on the stars.
    const c = layer(img.width, img.height)
    const g = c.getContext('2d')
    g.drawImage(img, 0, 0)
    g.globalCompositeOperation = 'destination-in'
    const m = g.createRadialGradient(c.width / 2, c.height / 2, Math.min(c.width, c.height) * 0.22, c.width / 2, c.height / 2, Math.min(c.width, c.height) * 0.5)
    m.addColorStop(0, 'rgba(0,0,0,1)')
    m.addColorStop(1, 'rgba(0,0,0,0)')
    g.fillStyle = m
    g.fillRect(0, 0, c.width, c.height)
    window.ASSETS.figureSoft = c
  }
  for (const [name, src, style, weight] of assets.fonts) {
    const f = new FontFace(name, `url(${src})`, { style, weight })
    await f.load()
    document.fonts.add(f)
  }
  makeGrain()
  makePaper()
  const base = hash(script.id)
  SCENES = script.scenes.map((s, i) => {
    const kind = BUILD[s.kind] ? s.kind : 'void'
    const built = BUILD[kind](s, base + i * 1013)
    return { ...built, text: s.text, kind, drift: i % 2 ? 1 : -1 }
  })
  return { duration: duration(), frames: Math.ceil(duration() * FPS) }
}
function duration() {
  return SCENES.length * SCENE + OUTRO
}

function renderScene(g, sc, t, local) {
  // local: seconds since this scene's nominal start; visible from -FADE/2.
  const p = clamp((local + FADE) / (SCENE + FADE * 2))
  g.save()
  g.fillStyle = '#000'
  g.fillRect(0, 0, W, H)
  if (sc.under) sc.under(g, t)
  for (const l of sc.layers) {
    const s = 1 + (0.025 + 0.06 * l.depth) * p
    const dy = l.float ? -p * 26 : 0
    g.save()
    g.translate(W / 2 + sc.drift * p * 10 * l.depth, H * 0.5 + dy)
    g.scale(s, s)
    g.drawImage(l.canvas, -W / 2, -H * 0.5)
    g.restore()
  }
  if (sc.live) sc.live(g, t, p)
  g.restore()
}

window.frame = (t) => {
  const n = SCENES.length
  const idx = Math.min(n - 1, Math.floor(t / SCENE))
  const local = t - idx * SCENE
  renderScene(ctx, SCENES[idx], t, local)
  // Crossfade into the next scene near the end of this one.
  if (idx < n - 1 && local > SCENE - FADE / 2) {
    const k = ease((local - (SCENE - FADE / 2)) / FADE)
    renderScene(sbg, SCENES[idx + 1], t, local - SCENE)
    ctx.globalAlpha = k
    ctx.drawImage(sceneBuf, 0, 0)
    ctx.globalAlpha = 1
  } else if (idx > 0 && local < FADE / 2) {
    const k = ease((local + FADE / 2) / FADE)
    renderScene(sbg, SCENES[idx - 1], t, local + SCENE)
    ctx.globalAlpha = 1 - k
    ctx.drawImage(sceneBuf, 0, 0)
    ctx.globalAlpha = 1
  }

  // Outro: the last scene dims under the align mark.
  const outroT = t - n * SCENE
  if (outroT > 0) {
    ctx.fillStyle = `rgba(3,2,10,${ease(clamp(outroT / 1.2)) * 0.82})`
    ctx.fillRect(0, 0, W, H)
  }

  // Vignette and grain.
  const v = ctx.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 0.75)
  v.addColorStop(0, 'rgba(0,0,0,0)')
  v.addColorStop(1, 'rgba(0,0,0,0.45)')
  ctx.fillStyle = v
  ctx.fillRect(0, 0, W, H)
  ctx.save()
  ctx.globalCompositeOperation = 'overlay'
  ctx.globalAlpha = 0.16
  const tile = grainTiles[Math.floor(t * FPS) % grainTiles.length]
  const ox = (Math.floor(t * FPS) * 137) % 512, oy = (Math.floor(t * FPS) * 271) % 512
  ctx.fillStyle = ctx.createPattern(tile, 'repeat')
  ctx.translate(-ox, -oy)
  ctx.fillRect(0, 0, W + 512, H + 512)
  ctx.restore()

  // The line for this scene.
  const sc = SCENES[idx]
  const tin = 0.35, tout = idx === n - 1 ? SCENE + OUTRO : SCENE - 0.45
  let a = clamp((local - tin) / 0.6) * (1 - clamp((local - tout) / 0.4))
  if (idx === n - 1 && outroT > 0) a *= 1 - clamp(outroT / 0.9)
  drawText(ctx, sc.text, sc.textY, ease(a), (1 - ease(clamp((local - tin) / 0.9))) * 14)

  // The quiet align mark at the end.
  if (outroT > 0) drawMark(ctx, ease(clamp((outroT - 0.6) / 0.8)), H * 0.48, 34)

  return canvas.toDataURL('image/jpeg', 0.9)
}
