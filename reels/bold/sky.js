// The original films' night sky, vertical: the nebula plate, three star layers, bright twinkling stars,
// the vignette, film grain and the photographic moon. Vendored unchanged in look from the promo branch
// (promo/film2/scenes/f3-chart.js, promo/films/sky.js, promo/src/scenes/fx-moon.js), made self-contained
// and fixed at 1080 × 1920. Every value is a pure function of t.
export const W = 1080, H = 1920

export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))

export const lerp = (a, b, t) => a + (b - a) * t

export const prog = (t, a, b) => clamp((t - a) / (b - a))

export const ease = {
  linear: x => x,
  inQuad: x => x * x,
  outQuad: x => 1 - (1 - x) * (1 - x),
  inOutQuad: x => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2),
  outCubic: x => 1 - Math.pow(1 - x, 3),
  inCubic: x => x * x * x,
  inOutCubic: x => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
  outQuart: x => 1 - Math.pow(1 - x, 4),
  outExpo: x => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x)),
  inExpo: x => (x <= 0 ? 0 : Math.pow(2, 10 * x - 10)),
  inOutExpo: x => x <= 0 ? 0 : x >= 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2,
  outBack: x => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2) },
  /** damped spring settling at 1 (x in 0..1 of the settle time) */
  spring: (x, bounce = 0.18) => {
    if (x <= 0) return 0
    if (x >= 1) return 1
    const w = 2 * Math.PI * 1.35
    const zeta = 1 - bounce * 2.4
    const decay = Math.exp(-zeta * 6 * x)
    return 1 - decay * Math.cos(w * x * (1 - bounce * 0.4))
  },
}

export function tw(t, keys, e = ease.inOutCubic) {
  if (t <= keys[0][0]) return keys[0][1]
  for (let i = 1; i < keys.length; i++) {
    const [t1, v1] = keys[i]
    const [t0, v0] = keys[i - 1]
    if (t <= t1) {
      const fn = keys[i][2] || e
      return lerp(v0, v1, fn((t - t0) / (t1 - t0)))
    }
  }
  return keys[keys.length - 1][1]
}

export function rng(seed) {
  let a = seed >>> 0
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function noise1(x, seed = 1) {
  const i = Math.floor(x), f = x - i
  const h = n => { const r = rng(seed * 9973 + n * 7919); r(); return r() }
  const u = f * f * (3 - 2 * f)
  return lerp(h(i), h(i + 1), u)
}

export function hexToRgb(h) {
  const n = parseInt(h.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export function mix(a, b, t) {
  const A = hexToRgb(a), B = hexToRgb(b)
  return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], clamp(t)))).join(',')})`
}

export const C = {
  void: '#0b0620',
  canvas: '#140a2e',
  raised: '#1e1240',
  glass: '#34235f',
  bone: '#efe6d6',
  paper: '#ebe5dc',
  ink: '#1a1033',
  label2: '#b3a6c4',
  label3: '#7d6f94',
  violet: '#9a7be0',
  rub: '#e8628a',
  spark: '#7fd8b0',
  gold: '#f2c75c',
  amber: '#f29a4a',
  plum: '#b45cff',
}

export const PIXEL_PALETTE = ['#e8628a', '#f2c75c', '#9a7be0', '#f29a4a', '#ff8fb1', '#c9a6ff', '#ffd98a']

const BGW = 2304, BGH = 1296, NEB_RES = 2, GRAIN_N = 6, GRAIN_TILE = 512, BAND_A = -0.42
function hash2(x, y, seed) {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(seed, 982451653)
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296
}
function vnoise(x, y, seed) {
  const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy)
  const a = hash2(ix, iy, seed), b = hash2(ix + 1, iy, seed), c = hash2(ix, iy + 1, seed), d = hash2(ix + 1, iy + 1, seed)
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy
}
function fbm(x, y, seed, oct = 5) {
  let v = 0, amp = 0.5, f = 1, norm = 0
  for (let o = 0; o < oct; o++) { v += amp * vnoise(x * f, y * f, seed + o * 17); norm += amp; amp *= 0.5; f *= 2.03 }
  return v / norm
}
const smooth = (a, b, x) => { const k = clamp((x - a) / (b - a)); return k * k * (3 - 2 * k) }
export const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }
const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]

function buildNebula() {
  const w = Math.ceil(BGW / NEB_RES), h = Math.ceil(BGH / NEB_RES)
  const lo = canvas(w, h), lx = lo.getContext('2d')
  const id = lx.createImageData(w, h), px = id.data
  const top = hex('#0b0620'), bot = hex('#140a2e')
  const pal = [hex('#9a7be0'), hex('#b45cff'), hex('#e8628a'), hex('#f29a4a')]
  const palAt = (c) => {
    const x = clamp(c) * (pal.length - 1), i = Math.min(pal.length - 2, Math.floor(x)), f = x - i
    return [0, 1, 2].map(k => pal[i][k] + (pal[i + 1][k] - pal[i][k]) * f)
  }
  for (let y = 0; y < h; y++) {
    const v = y / h
    for (let x = 0; x < w; x++) {
      const u = x / w
      const nx = u * 4.6, ny = v * 2.6
      const wx = fbm(nx + 1.7, ny + 9.2, 11, 4), wy = fbm(nx + 8.3, ny + 2.8, 23, 4)
      const qx = nx + 2.4 * wx, qy = ny + 2.4 * wy
      const d = fbm(qx, qy, 37, 6)
      const arc = Math.exp(-Math.pow((v - (0.18 + 0.75 * u * u * 0.9)) / 0.32, 2))
      const lowR = Math.exp(-(Math.pow((u - 0.78) / 0.28, 2) + Math.pow((v - 0.82) / 0.26, 2)))
      const upL = Math.exp(-(Math.pow((u - 0.2) / 0.3, 2) + Math.pow((v - 0.16) / 0.24, 2)))
      const mask = clamp(0.08 + 0.85 * arc + 1.1 * lowR + 0.8 * upL, 0, 1.7)
      const fr = 1 - Math.abs(fbm(qx * 2.1 + 5.5, qy * 2.1 + 0.7, 89, 5) - 0.5) * 2
      const cloud = smooth(0.4, 0.82, d)
      let e = mask * (0.55 * cloud * cloud + 0.75 * Math.pow(fr, 7) * smooth(0.3, 0.7, d) + 0.06 * smooth(0.25, 0.6, d))
      e = 1 - Math.exp(-e * 1.8)
      const cn = fbm(qx * 0.7 + 4.1, qy * 0.7 + 1.3, 53, 3)
      const col = palAt(clamp(0.05 + 0.6 * u + 0.45 * v + (cn - 0.5) * 1.2) * 0.9)
      const dn = fbm(qx * 1.6 + 3.3, qy * 1.6 + 7.7, 71, 5)
      const ridge = 1 - Math.abs(dn - 0.5) * 2
      const dust = smooth(0.66, 0.95, ridge) * 0.95
      const k = (1 - dust)
      const o = (y * w + x) * 4
      for (let c = 0; c < 3; c++) {
        const base = top[c] + (bot[c] - top[c]) * v
        px[o + c] = clamp((base * (1 - dust * 0.35) + col[c] * e * 0.78 * k) / 255) * 255
      }
      px[o + 3] = 255
    }
  }
  lx.putImageData(id, 0, 0)
  const neb = canvas(BGW, BGH), nx = neb.getContext('2d')
  nx.imageSmoothingQuality = 'high'
  nx.filter = 'blur(1.2px)'; nx.drawImage(lo, 0, 0, BGW, BGH); nx.filter = 'none'
  const bl = canvas(BGW / 4, BGH / 4), blx = bl.getContext('2d')
  blx.filter = 'blur(10px)'; blx.drawImage(neb, 0, 0, BGW / 4, BGH / 4)
  nx.globalCompositeOperation = 'screen'; nx.globalAlpha = 0.42
  nx.drawImage(bl, 0, 0, BGW, BGH)
  nx.globalAlpha = 1
  const glow = (x, y, r, rgba) => {
    const g = nx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, rgba); g.addColorStop(1, rgba.replace(/[\d.]+\)$/, '0)'))
    nx.fillStyle = g; nx.fillRect(x - r, y - r, 2 * r, 2 * r)
  }
  glow(BGW * 0.80, BGH * 0.84, 520, 'rgba(232,98,138,0.26)')
  glow(BGW * 0.86, BGH * 0.90, 260, 'rgba(242,154,74,0.2)')
  glow(BGW * 0.18, BGH * 0.14, 560, 'rgba(154,123,224,0.20)')
  glow(BGW * 0.30, BGH * 0.22, 300, 'rgba(180,92,255,0.12)')
  glow(BGW * 0.62, BGH * 0.12, 380, 'rgba(154,123,224,0.08)')
  const GL = Math.max(BGW, BGH)
  nx.save(); nx.translate(BGW * 0.5, BGH * 0.5); nx.rotate(BAND_A); nx.scale(1, 0.14)
  const gb = nx.createRadialGradient(0, 0, 0, 0, 0, GL * 0.62)
  gb.addColorStop(0, 'rgba(201,166,255,0.09)'); gb.addColorStop(0.6, 'rgba(154,123,224,0.04)'); gb.addColorStop(1, 'rgba(154,123,224,0)')
  nx.fillStyle = gb; nx.fillRect(-GL, -GL, GL * 2, GL * 2); nx.restore()
  nx.globalCompositeOperation = 'source-over'
  return neb
}
function buildStars(n, seed, { rMin, rMax, aMin, aMax, band = 0 }) {
  const c = canvas(BGW, BGH), x = c.getContext('2d')
  const r = rng(seed)
  const tints = ['255,247,236', '239,230,214', '214,222,255', '255,226,236', '255,236,205']
  for (let i = 0; i < n; i++) {
    let sx = r() * BGW, sy = r() * BGH
    if (band && r() < band) {
      const t = r() * 2 - 1, off = (r() + r() + r() - 1.5) * 90
      const GL = Math.max(BGW, BGH)
      sx = BGW * 0.5 + t * GL * 0.6 * Math.cos(BAND_A) - off * Math.sin(BAND_A)
      sy = BGH * 0.5 + t * GL * 0.6 * Math.sin(BAND_A) + off * Math.cos(BAND_A)
    }
    const s = rMin + Math.pow(r(), 2.2) * (rMax - rMin)
    x.fillStyle = `rgba(${tints[Math.floor(r() * tints.length)]},${aMin + r() * (aMax - aMin)})`
    x.beginPath(); x.arc(sx, sy, s, 0, Math.PI * 2); x.fill()
  }
  return c
}
export function buildStarSprite(spikes) {
  const S = 160, c = canvas(S, S), x = c.getContext('2d'), m = S / 2
  const g = x.createRadialGradient(m, m, 0, m, m, m)
  g.addColorStop(0, 'rgba(255,250,240,1)'); g.addColorStop(0.04, 'rgba(255,246,232,0.95)')
  g.addColorStop(0.12, 'rgba(226,206,255,0.35)'); g.addColorStop(0.35, 'rgba(180,140,255,0.08)'); g.addColorStop(1, 'rgba(180,140,255,0)')
  x.fillStyle = g; x.fillRect(0, 0, S, S)
  if (spikes) {
    x.globalCompositeOperation = 'lighter'
    for (const [dx, dy, len] of [[1, 0, 1], [0, 1, 1], [0.707, 0.707, 0.35], [0.707, -0.707, 0.35]]) {
      const L = m * len
      const lg = x.createLinearGradient(m - dx * L, m - dy * L, m + dx * L, m + dy * L)
      lg.addColorStop(0, 'rgba(255,240,230,0)'); lg.addColorStop(0.5, `rgba(255,244,236,${len > 0.5 ? 0.7 : 0.3})`); lg.addColorStop(1, 'rgba(255,240,230,0)')
      x.strokeStyle = lg; x.lineWidth = len > 0.5 ? 1.6 : 1
      x.beginPath(); x.moveTo(m - dx * L, m - dy * L); x.lineTo(m + dx * L, m + dy * L); x.stroke()
    }
  }
  return c
}
function buildGrain() {
  const noiseTile = (S, seed, mean, amp) => {
    const c = canvas(S, S), x = c.getContext('2d'), id = x.createImageData(S, S), p = id.data, r = rng(seed)
    for (let i = 0; i < p.length; i += 4) {
      const g = (r() + r() + r() + r() - 2) * 0.5
      p[i] = p[i + 1] = p[i + 2] = clamp(mean + g * amp) * 255; p[i + 3] = 255
    }
    x.putImageData(id, 0, 0); return c
  }
  const wrapDraw = (dst, src, filter, alpha = 1) => {
    const T = GRAIN_TILE, big = canvas(T * 3, T * 3), bx = big.getContext('2d')
    bx.imageSmoothingQuality = 'high'
    for (let i = 0; i < 9; i++) bx.drawImage(src, (i % 3) * T, Math.floor(i / 3) * T, T, T)
    const dx = dst.getContext('2d'); dx.filter = filter; dx.globalAlpha = alpha
    dx.drawImage(big, -T, -T); dx.filter = 'none'; dx.globalAlpha = 1
  }
  return Array.from({ length: GRAIN_N }, (_, n) => {
    const out = canvas(GRAIN_TILE, GRAIN_TILE)
    wrapDraw(out, noiseTile(GRAIN_TILE / 2, 9001 + n * 131, 0.46, 1.3), 'blur(0.5px) contrast(1.5)')
    wrapDraw(out, noiseTile(GRAIN_TILE, 7001 + n * 97, 0.46, 1.0), 'blur(0.35px)', 0.4)
    return out
  })
}

/** pre-rendered sky layers, built once and shared by f3–f8 */
let SKY = null
export function getSky() {
  if (SKY) return SKY
  const neb = buildNebula()
  const far = buildStars(7000, 101, { rMin: 0.45, rMax: 1.0, aMin: 0.3, aMax: 0.8, band: 0.45 })
  const mid = buildStars(1600, 202, { rMin: 0.7, rMax: 1.5, aMin: 0.5, aMax: 1 })
  const near = buildStars(160, 303, { rMin: 1.1, rMax: 2.2, aMin: 0.75, aMax: 1 })
  const spriteS = buildStarSprite(true), spriteG = buildStarSprite(false)
  const rb = rng(404), bright = []
  while (bright.length < 30) {           // same field as f2's sky (seamless cut)
    const x = rb() * W, y = rb() * H
    if (x > 620 && x < 1300) continue
    bright.push({ x, y, size: 26 + Math.pow(rb(), 2.5) * 110, spike: bright.length < 7, seed: 500 + bright.length, sp: 1.6 + rb() * 3, depth: rb() })
  }
  const vig = canvas(W, H), vx = vig.getContext('2d')
  const vg = vx.createRadialGradient(W / 2, H * 0.46, H * 0.3, W / 2, H * 0.5, H * 1.08)
  vg.addColorStop(0, 'rgba(11,6,32,0)'); vg.addColorStop(0.65, 'rgba(11,6,32,0.35)'); vg.addColorStop(1, 'rgba(8,4,24,0.85)')
  vx.fillStyle = vg; vx.fillRect(0, 0, W, H)
  SKY = { neb, far, mid, near, spriteS, spriteG, bright, vig, grain: buildGrain() }
  return SKY
}
export function drawGrain(gx, t) {
  const S = getSky()
  const frame = Math.round(t * 30)
  const gr = rng(frame * 7919 + 17)
  const pat = (S.pats ||= new Map())
  const key = gx.canvas
  let p = pat.get(key)
  if (!p) { p = S.grain.map(c => gx.createPattern(c, 'repeat')); pat.set(key, p) }
  const ox = Math.floor(gr() * GRAIN_TILE), oy = Math.floor(gr() * GRAIN_TILE)
  gx.setTransform(1, 0, 0, 1, -ox, -oy)
  gx.fillStyle = p[frame % GRAIN_N]
  gx.fillRect(ox, oy, W, H)
  gx.setTransform(1, 0, 0, 1, 0, 0)
}

// pixel-art star sprites (from S1)
const STAR_SPRITES = [
  ['...X...', '...X...', '..XXX..', 'XXXCXXX', '..XXX..', '...X...', '...X...'],
  ['.......', '...X...', '..XXX..', '.XXCXX.', '..XXX..', '...X...', '.......'],
  ['.......', '.......', '...X...', '..XCX..', '...X...', '.......', '.......'],
  ['.......', '.X...X.', '...X...', '..XCX..', '...X...', '.X...X.', '.......'],
].map(rowsS => rowsS.flatMap((row, y) => [...row].map((ch, x) => ch === '.' ? null : [x, y, ch === 'C'])).filter(Boolean))
export function drawPixelStar(ctx, cx, cy, size, kind, color, centre = '#fff3e0') {
  const px = Math.max(1, Math.round(size / 7)), x0 = Math.round(cx - px * 3.5), y0 = Math.round(cy - px * 3.5)
  for (const [x, y, c] of STAR_SPRITES[kind]) {
    ctx.fillStyle = c ? centre : color
    ctx.fillRect(x0 + x * px, y0 + y * px, px, px)
  }
}

export const litOf = (p) => (1 - Math.cos(2 * Math.PI * p)) / 2
const frac = (p) => ((p % 1) + 1) % 1
export function phaseName(p) {
  p = frac(p)
  const k = litOf(p), wax = p < 0.5
  if (k < 0.015) return 'NEW MOON'
  if (k > 0.985) return 'FULL MOON'
  if (Math.abs(k - 0.5) < 0.035) return wax ? 'FIRST QUARTER' : 'LAST QUARTER'
  return (wax ? 'WAXING ' : 'WANING ') + (k < 0.5 ? 'CRESCENT' : 'GIBBOUS')
}

// ── deterministic 2D value noise (local)
function mhash2(x, y, s) {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(s, 982451653)
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296
}
function mvnoise(x, y, s) {
  const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy)
  const a = mhash2(ix, iy, s), b = mhash2(ix + 1, iy, s), c = mhash2(ix, iy + 1, s), d = mhash2(ix + 1, iy + 1, s)
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy
}
function mfbm(x, y, s, oct = 4) {
  let v = 0, amp = 0.5, f = 1, n = 0
  for (let o = 0; o < oct; o++) { v += amp * mvnoise(x * f, y * f, s + o * 31); n += amp; amp *= 0.5; f *= 2.07 }
  return v / n
}
const sstep = (a, b, x) => { const k = clamp((x - a) / (b - a)); return k * k * (3 - 2 * k) }

// maria, roughly where they sit on the real near side (disc coords, x right, y down, radius 1)
const MARIA = [
  [-0.38, -0.36, 0.3, 0.26], [0.19, -0.3, 0.17, 0.16], [0.33, -0.02, 0.22, 0.2], [0.7, -0.24, 0.1, 0.12],
  [0.55, 0.2, 0.12, 0.17], [0.32, 0.33, 0.09, 0.09], [-0.62, 0.06, 0.28, 0.46], [-0.2, 0.38, 0.18, 0.13],
  [-0.5, 0.46, 0.1, 0.1], [-0.3, -0.66, 0.22, 0.07], [0.12, -0.63, 0.2, 0.06], [-0.02, 0.05, 0.12, 0.1],
]
const CRATERS = (() => {
  const r = rng(4242), out = [[-0.12, 0.72, 0.055, 1.6], [-0.3, -0.12, 0.05, 1.2], [-0.62, -0.34, 0.035, 1]]   // Tycho, Copernicus, Aristarchus-ish
  for (let i = 0; i < 46; i++) {
    const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 0.93
    out.push([Math.cos(a) * d, Math.sin(a) * d, 0.012 + Math.pow(r(), 2.2) * 0.05, 0.5 + r() * 0.5])
  }
  return out
})()
/** albedo 0..1 at disc point (x, y) */
function albedo(x, y) {
  // domain-warped placement → organic, merged mare edges instead of blobs
  const wx = x + 0.16 * (mfbm(x * 3.1 + 5, y * 3.1 + 1, 41) - 0.5), wy = y + 0.16 * (mfbm(x * 3.1 + 9, y * 3.1 + 4, 43) - 0.5)
  let m = 0
  for (const [mx, my, rx, ry] of MARIA) m += Math.exp(-(((wx - mx) / rx) ** 2 + ((wy - my) / ry) ** 2) * 1.4)
  const edge = mfbm(x * 6 + 3, y * 6 + 7, 17)
  m = sstep(0.22, 0.95, m * (0.7 + 0.6 * edge))
  const mott = mfbm(x * 9 + 1, y * 9 + 5, 61, 3)
  let a = 0.88 + 0.1 * (mfbm(x * 3 + 11, y * 3 + 2, 5) - 0.5) - m * (0.2 + 0.08 * mott)
  a += 0.06 * (mfbm(x * 16, y * 16, 29, 3) - 0.5)
  for (const [cx, cy, cr, s] of CRATERS) {
    const d = Math.hypot(x - cx, y - cy) / cr
    if (d > 1.6) continue
    a += s * (0.035 * Math.exp(-(((d - 1) / 0.3) ** 2)) - 0.03 * sstep(1, 0.6, d)) * (1 - 0.5 * m)
  }
  // faint Tycho rays
  const tx = x + 0.12, ty = y - 0.72, td = Math.hypot(tx, ty)
  if (td > 0.07 && td < 0.9) {
    const ang = Math.atan2(ty, tx)
    a += 0.035 * Math.pow(Math.max(0, Math.sin(ang * 7 + 1.3) * Math.sin(ang * 11 + 0.4)), 6) * (1 - td / 0.9)
  }
  return clamp(a)
}
const albCache = new Map()
function albedoGrid(R) {
  let g = albCache.get(R)
  if (g) return g
  const S = 2 * R + 2
  g = new Float32Array(S * S)
  for (let j = 0; j < S; j++) for (let i = 0; i < S; i++) g[j * S + i] = albedo((i + 0.5 - S / 2) / R, (j + 0.5 - S / 2) / R)
  albCache.set(R, g)
  return g
}

const PEARL = [255, 251, 240], BONE = [239, 230, 214], MARE = [176, 168, 194], RIM = [201, 188, 228]
const DARK = [20, 14, 44], EARTH = [46, 38, 88]
const cvs = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }
const tiles = new Map()

/** realistic moon disc as a canvas (cached per radius/phase/options) */
export function moonCanvas(R, p, { earthshine = 0.6, darkAlpha = 0.92 } = {}) {
  R = Math.max(4, Math.round(R))
  const key = `${R}|${p.toFixed(4)}|${earthshine}|${darkAlpha}`
  let c = tiles.get(key)
  if (c) return c
  if (tiles.size > 64) tiles.clear()
  const S = 2 * R + 2
  c = cvs(S, S)
  const x2 = c.getContext('2d'), id = x2.createImageData(S, S), px = id.data
  const alb = albedoGrid(R)
  const e = 2 * Math.PI * frac(p), k = litOf(p)
  // sun direction: viewer looks down −z; slight tilt so the terminator is never a perfectly vertical line
  const Lx = Math.sin(e), Ly = -0.12 * Math.sin(e), Lz = -Math.cos(e)
  for (let j = 0; j < S; j++) for (let i = 0; i < S; i++) {
    const x = (i + 0.5 - S / 2) / R, y = (j + 0.5 - S / 2) / R, rr = Math.hypot(x, y)
    const edgeA = clamp((1 - rr) * R + 0.5)
    const o = (j * S + i) * 4
    if (edgeA <= 0) { px[o + 3] = 0; continue }
    const nz = Math.sqrt(Math.max(0, 1 - rr * rr))
    const a = alb[j * S + i]
    // rough terminator: albedo/relief nudges where light starts
    const d = x * Lx + y * Ly + nz * Lz + (a - 0.75) * 0.05
    const term = sstep(-0.015, 0.04, d)
    const ls = Math.min(1.15, (2 * Math.max(d, 0)) / (Math.max(d, 0) + nz + 0.02))  // Lommel–Seeliger: flat full disc, dark terminator
    const shade = term * (0.3 + 0.7 * Math.min(1, ls * 1.05)) * (0.86 + 0.14 * Math.sqrt(nz))
    const rim = sstep(0.78, 1, rr) * 0.45
    let lit = [0, 1, 2].map(k => {
      const base = lerp(MARE[k], lerp(BONE[k], PEARL[k], sstep(0.8, 0.95, a)), sstep(0.55, 0.9, a))
      return lerp(base, RIM[k], rim)
    })
    const es = earthshine * (1 - k) ** 2 * (0.55 + 0.45 * a)
    const dark = [0, 1, 2].map(k => lerp(DARK[k], EARTH[k], es) + RIM[k] * 0.12 * sstep(0.9, 1, rr) * earthshine)
    const al = lerp(darkAlpha, 1, term)
    for (let k = 0; k < 3; k++) px[o + k] = clamp((lit[k] * shade + dark[k] * (1 - term)) / 255) * 255
    px[o + 3] = al * edgeA * 255
  }
  x2.putImageData(id, 0, 0)
  tiles.set(key, c)
  return c
}

/** realistic moon with halo. opts: alpha, glow (0..1+), earthshine, darkAlpha */
export function drawMoon(ctx, cx, cy, R, p, { alpha = 1, glow = 1, earthshine = 0.6, darkAlpha = 0.92 } = {}) {
  if (alpha <= 0.002) return
  const k = litOf(p), e = 2 * Math.PI * frac(p)
  ctx.save()
  ctx.globalAlpha = alpha
  if (glow > 0) {
    // halo biased toward the lit limb; grows with illumination
    const ox = cx + Math.sin(e) * R * 0.45 * (1 - k), gR = R * (2 + 1.1 * k)
    const g = ctx.createRadialGradient(ox, cy, R * 0.6, ox, cy, gR)
    const a0 = glow * (0.08 + 0.22 * k)
    g.addColorStop(0, `rgba(244,234,216,${a0})`); g.addColorStop(0.35, `rgba(214,200,240,${a0 * 0.45})`); g.addColorStop(1, 'rgba(201,188,228,0)')
    ctx.globalCompositeOperation = 'lighter'
    ctx.fillStyle = g; ctx.fillRect(ox - gR, cy - gR, gR * 2, gR * 2)
    ctx.globalCompositeOperation = 'source-over'
  }
  const c = moonCanvas(R, p, { earthshine, darkAlpha })
  ctx.drawImage(c, cx - c.width / 2, cy - c.height / 2)
  ctx.restore()
}

/** lit-region path for a glyph (MoonPhase.tsx geometry) */
function litPath(ctx, cx, cy, r, p) {
  const k = litOf(p), wax = frac(p) < 0.5
  ctx.save(); ctx.translate(cx, cy); if (!wax) ctx.scale(-1, 1)
  ctx.beginPath()
  if (k >= 0.995) ctx.arc(0, 0, r, 0, Math.PI * 2)
  else {
    ctx.arc(0, 0, r, -Math.PI / 2, Math.PI / 2, false)
    ctx.ellipse(0, 0, Math.abs(1 - 2 * k) * r, r, 0, Math.PI / 2, -Math.PI / 2, k < 0.5)
    ctx.closePath()
  }
  ctx.restore()
}

// ── the vertical films' sky camera (promo/films/sky.js), with the settings every pre–Star Talk vertical used
export const SKY_V = { zoom: 1.5, dx: 0, dy: 0, dim: 0.56, moon: { x: 930, y: 150, r: 44, phase: 0.12, alpha: 1 } }
export const GRAIN_V = 0.4
export function drawSky(bx, t, { zoom = 1, dx = 0, dy = 0, dim = 1, moon = null, stars = 1 } = {}) {
  const S = getSky()
  const layer = (im, s, ox, oy) => { const w = BGW * s, h = BGH * s; bx.drawImage(im, W / 2 - w / 2 + ox, H / 2 - h / 2 + oy, w, h) }
  const flick = 1 + (noise1(t * 14, 3) - 0.5) * 0.05
  bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
  bx.fillStyle = C.void; bx.fillRect(0, 0, W, H)
  bx.globalAlpha = flick * clamp(dim)
  layer(S.neb, zoom, dx * 0.5, dy * 0.5)
  bx.globalCompositeOperation = 'lighter'
  bx.globalAlpha = 0.9 * stars; layer(S.far, zoom, dx * 0.7, dy * 0.7)
  bx.globalAlpha = stars
  layer(S.mid, zoom * 1.01, dx, dy)
  layer(S.near, zoom * 1.03, dx * 1.6, dy * 1.6)
  for (const b of S.bright) {
    const s = zoom * (1.02 + 0.03 * b.depth)
    const x = W / 2 + (b.x - W / 2) * s + dx * (1 + b.depth * 0.6)
    const y = H / 2 + (b.y - H / 2) * s + dy * (1 + b.depth * 0.6)
    const tw2 = 0.55 + 0.45 * noise1(t * b.sp, b.seed) + 0.25 * Math.max(0, noise1(t * b.sp * 3.1, b.seed + 9) - 0.6)
    const sz = b.size * (0.85 + 0.25 * tw2)
    bx.globalAlpha = clamp(tw2) * stars
    bx.drawImage(b.spike ? S.spriteS : S.spriteG, x - sz / 2, y - sz / 2, sz, sz)
  }
  bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
  if (moon && moon.alpha > 0) drawMoon(bx, moon.x, moon.y, moon.r, moon.phase, { alpha: moon.alpha, glow: 3, earthshine: 1, darkAlpha: 0.62 })
  bx.drawImage(S.vig, 0, 0)
}

// ── fast path for long batches: the nebula + three star layers composited once (at SKY_V's zoom and dim) onto a plate a
// little bigger than the frame; each frame draws that plate at the drift offset, then the twinkling bright stars, the
// moon and the vignette live. Same look as drawSky(…SKY_V) with a uniform (not per-layer) parallax.
let PLATE = null
const PAD = 160
function plate(o) {
  if (PLATE) return PLATE
  const S = getSky(), c = canvas(W + 2 * PAD, H + 2 * PAD), bx = c.getContext('2d')
  bx.translate(PAD, PAD)
  const layer = (im, s) => { const w = BGW * s, h = BGH * s; bx.drawImage(im, W / 2 - w / 2, H / 2 - h / 2, w, h) }
  bx.fillStyle = C.void; bx.fillRect(-PAD, -PAD, W + 2 * PAD, H + 2 * PAD)
  bx.globalAlpha = o.dim; layer(S.neb, o.zoom)
  bx.globalCompositeOperation = 'lighter'
  bx.globalAlpha = 0.9; layer(S.far, o.zoom)
  bx.globalAlpha = 1; layer(S.mid, o.zoom * 1.01); layer(S.near, o.zoom * 1.03)
  PLATE = c
  return c
}
export function drawSkyFast(bx, t, { dx = 0, dy = 0 } = {}) {
  const o = SKY_V, S = getSky(), P = plate(o)
  const flick = 1 + (noise1(t * 14, 3) - 0.5) * 0.03
  bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
  bx.fillStyle = C.void; bx.fillRect(0, 0, W, H)
  bx.globalAlpha = flick
  bx.drawImage(P, -PAD + clamp(dx, -PAD, PAD), -PAD + clamp(dy, -PAD, PAD))
  bx.globalCompositeOperation = 'lighter'
  for (const b of S.bright) {
    const s = o.zoom * (1.02 + 0.03 * b.depth)
    const x = W / 2 + (b.x - W / 2) * s + dx * (1 + b.depth * 0.6)
    const y = H / 2 + (b.y - H / 2) * s + dy * (1 + b.depth * 0.6)
    if (x < -100 || x > W + 100 || y < -100 || y > H + 100) continue
    const tw2 = 0.55 + 0.45 * noise1(t * b.sp, b.seed) + 0.25 * Math.max(0, noise1(t * b.sp * 3.1, b.seed + 9) - 0.6)
    const sz = b.size * (0.85 + 0.25 * tw2)
    bx.globalAlpha = clamp(tw2)
    bx.drawImage(b.spike ? S.spriteS : S.spriteG, x - sz / 2, y - sz / 2, sz, sz)
  }
  bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
  const m = o.moon
  drawMoon(bx, m.x, m.y, m.r, m.phase, { alpha: m.alpha, glow: 3, earthshine: 1, darkAlpha: 0.62 })
  bx.drawImage(S.vig, 0, 0)
}
