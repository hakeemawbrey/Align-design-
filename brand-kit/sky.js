/* ---------- sky: ported from comealign.com ---------- */
const SKY_RAMP = [[0, [16, 9, 36]], [.38, [30, 16, 60]], [.58, [62, 34, 112]], [.74, [104, 64, 168]], [.88, [150, 98, 196]], [1, [196, 150, 222]]]
const SKY_PINK = [178, 92, 150], NEB_W = 128, NEB_MAX = 1600, M31 = 2147483647
function ramp(e) { for (let t = 1; t < SKY_RAMP.length; t++) { const [n, r] = SKY_RAMP[t], [i, a] = SKY_RAMP[t - 1]; if (e <= n) { const k = (e - i) / (n - i); return [a[0] + (r[0] - a[0]) * k, a[1] + (r[1] - a[1]) * k, a[2] + (r[2] - a[2]) * k] } } return SKY_RAMP[SKY_RAMP.length - 1][1] }
function noise(seed) {
  const p = Array.from({ length: 256 }, (_, i) => i); let n = seed
  for (let e = 255; e > 0; e--) { n = n * 16807 % M31; const r = n % (e + 1); [p[e], p[r]] = [p[r], p[e]] }
  const perm = new Uint8Array(512); for (let e = 0; e < 512; e++) perm[e] = p[e & 255]
  const val = Float32Array.from({ length: 256 }, (_, t) => perm[t] / 255), sm = (e) => e * e * (3 - 2 * e), h = (x, y) => val[perm[perm[x & 255] + y & 255]]
  return (x, y) => { const xi = Math.floor(x), yi = Math.floor(y), u = sm(x - xi), v = sm(y - yi), a = h(xi, yi), b = h(xi + 1, yi), c = h(xi, yi + 1), d = h(xi + 1, yi + 1); return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v }
}
function fbm(f, x, y) { let r = 0, a = .5, s = 1; for (let o = 0; o < 4; o++) { r += a * f(x * s, y * s); s *= 2.03; a *= .5 } return r }
function drawNebula(cv) {
  const H = Math.round(NEB_W * (innerHeight / innerWidth)), off = document.createElement('canvas'); off.width = NEB_W; off.height = H
  const o = off.getContext('2d'), c = cv.getContext('2d'); if (!o || !c) return
  const img = o.createImageData(NEB_W, H), n1 = noise(7), n2 = noise(29), k = 3.2 / NEB_W
  for (let y = 0; y < H; y++) for (let x = 0; x < NEB_W; x++) {
    const X = x * k, Y = y * k, q = fbm(n1, X + 1.7, Y + 9.2), r = fbm(n1, X + 8.3, Y + 2.8)
    let d = fbm(n1, X + 2.2 * q, Y + 2.2 * r); d = Math.min(1, Math.max(0, (d - .32) * 1.9))
    const fx = x / NEB_W - .5, fy = y / H - .42; d *= 1 - .55 * Math.exp(-(fx * fx * 3.2 + fy * fy * 1.6))
    const [R, G, B] = ramp(d), m = Math.max(0, fbm(n2, X * 1.3, Y * 1.3) - .48) * 2.4 * d, i = (y * NEB_W + x) * 4
    img.data[i] = R + (SKY_PINK[0] - R) * m; img.data[i + 1] = G + (SKY_PINK[1] - G) * m; img.data[i + 2] = B + (SKY_PINK[2] - B) * m; img.data[i + 3] = 255
  }
  o.putImageData(img, 0, 0)
  const w = Math.min(NEB_MAX, Math.round(innerWidth * .75)), h = Math.round(H / NEB_W * w); cv.width = w; cv.height = h
  c.filter = `blur(${Math.round(w / 120)}px) saturate(1.1)`; c.drawImage(off, -w * .02, -h * .02, w * 1.04, h * 1.04); c.filter = 'none'
  const px = c.getImageData(0, 0, w, h); let s = 99
  for (let e = 0; e < px.data.length; e += 4) { s = s * 16807 % M31; const t = ((s & 255) - 128) * .11; px.data[e] += t; px.data[e + 1] += t; px.data[e + 2] += t }
  c.putImageData(px, 0, 0); cv.classList.add('on')
}
/* pixel moon: dithered, with craters (same as the site) */
const MOON_LIT = ['#b9aecb', '#d6cde2', '#ebe3ef', '#f8f2f6'], MOON_CRATER = ['#9f94b4', '#bdb2cc'], MOON_DARK = ['#1d1438', '#2a1f4c'], MOON_GLOW = 'rgba(232,222,255,'
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((e) => (e + .5) / 16)
const CRATERS = [[-.32, -.3, .2], [.28, -.42, .12], [.38, .22, .22], [-.18, .4, .14], [.05, .02, .09], [-.5, .12, .1]]
function pixelMoon({ size, grid = 22, lit, waxing = true, glow = true, darkAlpha = 1 }) {
  const pad = glow ? Math.round(grid * .25) : 0, N = grid + pad * 2, css = size * N / grid
  const cv = document.createElement('canvas'); cv.width = N; cv.height = N; cv.setAttribute('aria-hidden', 'true')
  cv.style.cssText = `width:${css}px;height:${css}px;margin:${-(css - size) / 2}px;image-rendering:pixelated;display:block`
  const c = cv.getContext('2d'), L = Math.min(1, Math.max(0, lit)), R = grid / 2, C = N / 2
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const a = (x + .5 - C) / R, b = (y + .5 - C) / R, u = Math.hypot(a, b), d = BAYER[y % 4 * 4 + x % 4]
    if (u > 1) { if (glow && u < 1.45) { const r = (1 - (u - 1) / .45) * .55; if (r > d * .6) { c.fillStyle = `${MOON_GLOW}${(r * .5).toFixed(2)})`; c.fillRect(x, y, 1, 1) } } continue }
    const f = (1 - 2 * L) * Math.sqrt(1 - b * b)
    if (!(waxing ? a > f : a < -f)) { c.globalAlpha = darkAlpha; c.fillStyle = MOON_DARK[+(d > .5)]; c.fillRect(x, y, 1, 1); c.globalAlpha = 1; continue }
    let p = MOON_LIT[Math.min(3, Math.max(0, Math.floor((1 - u * u) * 3.2 + d * .9)))]
    for (const [cx, cy, cr] of CRATERS) { const r = Math.hypot(a - cx, b - cy); if (r < cr) { p = MOON_CRATER[+(r > cr * .6)]; break } }
    c.fillStyle = p; c.fillRect(x, y, 1, 1)
  }
  return cv
}
function moonTonight(e = new Date()) {
  const day = 864e5, P = 29.530588853, ref = Date.UTC(2000, 0, 6, 18, 14) / day
  const t = ((new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23).getTime() / day - ref) % P + P) % P
  const names = ['New moon', 'Waxing crescent', 'First quarter', 'Waxing gibbous', 'Full moon', 'Waning gibbous', 'Last quarter', 'Waning crescent']
  return { name: names[Math.round(t / P * 8) % 8], lit: (1 - Math.cos(2 * Math.PI * t / P)) / 2, waxing: t < P / 2 }
}
