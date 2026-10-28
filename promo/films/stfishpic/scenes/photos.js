// stfishpic photos: the five profile photos, painted as low-res pixel art (1 unit = 1 photo pixel) on an LW × LH canvas
// that the film scales up crisp (imageSmoothing off). Pure functions of (ctx, t, state).
//   PHOTOS[k](l, t, st)   k = 0 the fish pic · 1 a bigger fish · 2 the group photo · 3 the car selfie · 4 the sunset (st.lift 0…1)
//   paintVeil(l, t)       the veiled photo slot on the mystery card (an aura + a soft silhouette), same canvas size
import { clamp, lerp } from '../../../src/lib.js'

export const LW = 106, LH = 84
const INK = '#1b1236'

const hx = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]
const mixC = (a, b, k) => { const A = hx(a), B = hx(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], k))).join(',')})` }
const hash = (i, j) => { let h = (i * 374761393 + j * 668265263) >>> 0; h = (h ^ (h >>> 13)) * 1274126177 >>> 0; return ((h ^ (h >>> 16)) >>> 0) / 4294967296 }

function P(l) {
  const R = (x, y, w, h, c) => { l.fillStyle = c; l.fillRect(Math.round(x), Math.round(y), w, h) }
  const px = (x, y, c) => R(x, y, 1, 1, c)
  const disc = (cx, cy, r, c, keep) => { for (let j = Math.floor(cy - r); j <= Math.ceil(cy + r); j++) for (let i = Math.floor(cx - r); i <= Math.ceil(cx + r); i++) if ((i - cx) ** 2 + (j - cy) ** 2 <= r * r && (!keep || keep(i, j))) px(i, j, c) }
  const thick = (x0, y0, x1, y1, c, w = 2) => { const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0))); for (let k = 0; k <= n; k++) { const u = k / n; R(Math.round(lerp(x0, x1, u)) - (w >> 1), Math.round(lerp(y0, y1, u)) - (w >> 1), w, w, c) } }
  /** vertical gradient between colour stops [[row, hex], …] over rows y0…y1 */
  const sky = (stops, y0, y1, x0 = 0, x1 = LW) => {
    for (let j = y0; j < y1; j++) {
      let a = stops[0], b = stops[stops.length - 1]
      for (let k = 0; k < stops.length - 1; k++) if (j >= stops[k][0] && j <= stops[k + 1][0]) { a = stops[k]; b = stops[k + 1]; break }
      const u = b[0] === a[0] ? 0 : clamp((j - a[0]) / (b[0] - a[0]))
      R(x0, j, x1 - x0, 1, mixC(a[1], b[1], Math.round(u * 6) / 6))
    }
  }
  return { R, px, disc, thick, sky }
}

// ─────────────────────────────────────────────── the fish
// fish(l, cx, cy, len, { dir: 'left' | 'right' | 'up', sil: colour (silhouette), eye: 1, shades: false })
// The body runs nose (u = 0) → tail root (u = 1); the forked tail adds 0.3·len. Centred on (cx, cy) incl. the tail.
function fish(l, cx, cy, len, { dir = 'left', sil = null, eye = 1, shades = false, wink = false } = {}) {
  const { px } = P(l)
  const H = len * 0.34, total = len * 1.3
  const f = u => u < 0.28 ? 0.38 + 0.62 * Math.sqrt(u / 0.28) : 1 - 0.6 * Math.pow((u - 0.28) / 0.72, 1.3)
  // local coords: a along the fish (0 = nose … total), b across (−top … +belly) → canvas
  const put = (a, b, c) => {
    let X, Y
    if (dir === 'left') { X = cx - total / 2 + a; Y = cy + b }
    else if (dir === 'right') { X = cx + total / 2 - a; Y = cy + b }
    else { X = cx - b; Y = cy - total / 2 + a }          // 'up': nose at the top, back to the right
    px(Math.round(X), Math.round(Y), c)
  }
  const cells = []
  // body
  for (let a = 0; a <= len; a++) {
    const u = a / len, hh = H / 2 * f(u)
    for (let b = Math.round(-hh * 1.08); b <= Math.round(hh * 0.92); b++) cells.push([a, b, 'body', u, b / (hh || 1)])
  }
  // tail fin (forked)
  for (let a = len + 1; a <= total; a++) {
    const d = (a - len) / (total - len), w = H / 2 * (0.32 + 0.95 * d)
    for (let b = Math.round(-w); b <= Math.round(w); b++) {
      if (d > 0.55 && Math.abs(b) < (d - 0.55) * H * 0.9) continue
      cells.push([a, b, 'tail', d, b / (w || 1)])
    }
  }
  // dorsal fin
  for (let a = Math.round(len * 0.42); a <= Math.round(len * 0.62); a++) {
    const u = a / len, top = -H / 2 * f(u) * 1.08, k = (a - len * 0.42) / (len * 0.2)
    for (let b = Math.round(top - H * 0.22 * (1 - k)); b < Math.round(top); b++) cells.push([a, b, 'fin', 0, 0])
  }
  // pectoral fin
  for (let a = Math.round(len * 0.26); a <= Math.round(len * 0.36); a++) cells.push([a, Math.round(H * 0.28), 'fin', 0, 0], [a + 1, Math.round(H * 0.28) + 1, 'fin', 0, 0])
  const key = new Set(cells.map(([a, b]) => a + ',' + b))
  // outline
  for (const [a, b] of cells) for (const [da, db] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!key.has((a + da) + ',' + (b + db))) put(a + da, b + db, sil || INK)
  for (const [a, b, part, u, v] of cells) {
    if (sil) { put(a, b, sil); continue }
    let c
    if (part === 'tail' || part === 'fin') c = (a + b) % 3 === 0 ? '#5a8238' : '#77a24c'
    else if (v < -0.4) c = '#4c7934'
    else if (v < 0.02) c = '#8db55a'
    else if (v < 0.3) c = '#e3948f'
    else c = '#f1ebc2'
    if (part === 'body' && v < 0.1 && u > 0.3 && hash(a * 3, b * 7) < 0.13) c = '#2c4a20'
    if (part === 'body' && Math.abs(a - Math.round(len * 0.24)) < 1 && v > -0.7 && v < 0.6) c = '#3d6a2c'   // gill line
    put(a, b, c)
  }
  if (sil) return
  // eye (looking straight at the camera) + mouth
  const ea = Math.max(2, Math.round(len * 0.11)), eb = Math.round(-H * 0.18), er = len >= 60 ? 2 : len >= 30 ? 1 : 0
  for (let a = -er; a <= er; a++) for (let b = -er; b <= er; b++) if (a * a + b * b <= er * er + 0.5) put(ea + a, eb + b, '#ffffff')
  if (er === 0) put(ea, eb, INK)
  else if (wink) for (let a = -er; a <= er; a++) put(ea + a, eb, INK)
  else { put(ea, eb, INK); if (er >= 2) { put(ea + 1, eb, INK); put(ea, eb + 1, INK); put(ea + 1, eb + 1, INK) } }
  if (eye && er >= 1) put(ea - er, eb - er, INK)
  put(0, Math.round(H * 0.12), INK); put(1, Math.round(H * 0.12), '#7a3040')
  if (shades) { for (let a = ea - er - 2; a <= ea + er + 3; a++) { put(a, eb, INK); put(a, eb - 1, INK) } put(ea + 1, eb - 1, '#ffffff') }
}

// ─────────────────────────────────────────────── the human (front view, bucket hat, sunglasses, big grin)
function human(l, x, foot, { shirt = '#e8564a', shirtSh = '#b83c34', sil = null, legsBent = 0, head = true, body = true } = {}) {
  const { R, disc } = P(l)
  const SK = sil || '#e2ab84', SK2 = sil || '#c98e68', SH = sil || shirt, SH2 = sil || shirtSh, PA = sil || '#c7a36a', HAT = sil || '#7d9450', BAND = sil || '#56693a'
  if (body) {
    // legs (+ bent knees)
    const kx = Math.round(legsBent * 3)
    R(x - 4 - kx, foot - 12, 2, 6, SK); R(x - 3, foot - 6, 2, 6, SK)
    R(x + 2 + kx, foot - 12, 2, 6, SK); R(x + 1, foot - 6, 2, 6, SK)
    R(x - 4, foot - 1, 3, 1, sil || '#5a3a2a'); R(x + 1, foot - 1, 3, 1, sil || '#5a3a2a')
    // shorts
    R(x - 5, foot - 18, 10, 7, PA); R(x - 5, foot - 12, 4, 1, sil || '#a3834e'); R(x + 1, foot - 12, 4, 1, sil || '#a3834e')
    // torso
    R(x - 6, foot - 31, 12, 14, SH); R(x + 3, foot - 31, 3, 14, SH2); R(x - 6, foot - 31, 12, 1, SH2)
    R(x - 1, foot - 33, 3, 2, SK2)
  }
  if (head) {
    const hy = foot - 37.5
    disc(x + 0.5, hy, 4.7, SK)
    R(x - 2, hy + 4, 5, 1, SK2)
    // bucket hat
    R(x - 7, hy - 3, 15, 1, HAT); R(x - 6, hy - 4, 13, 1, HAT); R(x - 4, hy - 8, 9, 4, HAT); R(x - 4, hy - 5, 9, 1, BAND)
    if (!sil) {
      // sunglasses + glint
      R(x - 4, hy - 1, 4, 2, INK); R(x + 1, hy - 1, 4, 2, INK); R(x, hy - 1, 1, 1, INK)
      R(x - 3, hy - 1, 1, 1, '#9fd8ff'); R(x + 2, hy - 1, 1, 1, '#9fd8ff')
      // the grin
      R(x - 2, hy + 2, 5, 1, '#ffffff'); R(x - 3, hy + 2, 1, 1, '#7a3040'); R(x + 3, hy + 2, 1, 1, '#7a3040'); R(x - 2, hy + 3, 5, 1, '#7a3040')
    }
  }
}
const hand = (l, x, y, sil) => { const { R } = P(l); R(x - 1, y - 1, 3, 3, sil || INK); R(x - 1, y - 1, 2, 2, sil || '#e2ab84'); R(x, y, 2, 2, sil || '#e2ab84') }

// ─────────────────────────────────────────────── settings
function lakeDay(l, t) {
  const { R, sky, disc } = P(l)
  sky([[0, '#6fbbe8'], [30, '#bfe6f8']], 0, 34)
  // clouds
  for (const [cx, cy, w] of [[16, 9, 13], [78, 6, 17], [56, 15, 8]]) { const dx = (t * 1.2) % 4; R(cx - w / 2 + dx, cy, w, 2, '#ffffff'); R(cx - w / 2 + 2 + dx, cy - 1, w - 5, 1, '#ffffff'); R(cx - w / 2 + 1 + dx, cy + 2, w - 2, 1, '#e3f3fb') }
  // hills + far shore
  for (let i = 0; i < LW; i++) { const h = 5 + Math.round(3 * Math.sin(i * 0.11) + 2 * Math.sin(i * 0.31 + 1)); R(i, 37 - h, 1, h, i % 7 === 0 ? '#2d5f40' : '#3c7550') }
  R(0, 37, LW, 2, '#2d5f40')
  // the lake
  R(0, 39, LW, 27, '#3b83b6')
  for (let k = 0; k < 9; k++) { const y = 41 + k * 3, x0 = ((k * 23 + Math.floor(t * 6) * (k % 2 ? 1 : -1)) % 120 + 120) % 120 - 10; R(x0, y, 7 + (k % 3) * 3, 1, '#78b6dd') }
  disc(96, 45, 0.6, '#ffffff')
  // the dock
  R(0, 66, LW, 18, '#a8743d')
  for (let y = 66; y < LH; y += 4) R(0, y, LW, 1, '#7a5028')
  for (let x = 6; x < LW; x += 17) R(x, 66, 1, 18, '#8e5f31')
  R(0, 66, LW, 1, '#c99258')
}

/** 0 · the fish pic: proud human, huge fish, dock, sunny lake */
function photoFish(l, t) {
  lakeDay(l, t)
  human(l, 53, 81)
  fish(l, 53, 59, 54)
  hand(l, 33, 61); hand(l, 71, 58)
}
/** 1 · a BIGGER fish: it doesn't fit in the photo; the human's knees buckle */
function photoBigger(l, t) {
  lakeDay(l, t)
  const { R } = P(l)
  human(l, 53, 81, { legsBent: 1 })
  fish(l, 53, 49, 92, { eye: 1 })
  hand(l, 40, 58); hand(l, 72, 56)
  // sweat drops by the hat
  const s = Math.floor(t * 4) % 2
  R(64, 27 + s, 1, 2, '#bfefff'); R(41, 29 - s, 1, 2, '#bfefff')
}
/** 2 · the group photo: four identical humans, four fish */
function photoGroup(l, t) {
  lakeDay(l, t)
  for (const x of [16, 40, 64, 88]) { human(l, x, 81); fish(l, x, 59, 17); hand(l, x - 5, 60); hand(l, x + 4, 59) }
}
/** 3 · the car selfie: the human driving nowhere, the fish buckled into the passenger seat in matching shades */
function photoCar(l, t) {
  const { R, sky, disc, thick } = P(l)
  R(0, 0, LW, LH, '#3a3248')
  // rear window
  sky([[6, '#8fd0ee'], [28, '#d3effa']], 6, 30, 12, 94)
  for (let i = 12; i < 94; i++) { const h = 3 + Math.round(2 * Math.sin(i * 0.4) + Math.sin(i * 0.9)); R(i, 30 - h, 1, h, '#4d8a5a') }
  R(12, 6, 82, 1, '#2a2433'); R(11, 6, 1, 25, '#2a2433'); R(94, 6, 1, 25, '#2a2433')
  R(0, 0, LW, 6, '#4a4258'); R(0, 30, LW, 54, '#2f2838')
  // seats
  for (const sx of [10, 58]) { R(sx, 26, 38, 58, '#5b3f52'); R(sx + 2, 28, 34, 2, '#74526a'); R(sx + 10, 14, 18, 13, '#5b3f52'); R(sx + 11, 15, 16, 2, '#74526a') }
  // fuzzy dice
  R(52, 0, 1, 9, '#d9d0e8'); R(50, 9, 4, 4, '#ff8fb1'); R(51, 10, 1, 1, '#ffffff'); R(53, 11, 4, 4, '#fbf6ec'); R(55, 12, 1, 1, INK)
  // the human, close (selfie scale): head, shades, grin, shirt, seatbelt, the selfie arm
  const x = 29, hy = 42
  R(x - 9, 52, 20, 32, '#e8564a'); R(x + 6, 52, 5, 32, '#b83c34')
  R(x - 2, 49, 5, 4, '#c98e68')
  disc(x + 0.5, hy, 8.2, '#e2ab84')
  R(x - 11, hy - 6, 23, 2, '#7d9450'); R(x - 7, hy - 13, 15, 7, '#7d9450'); R(x - 7, hy - 8, 15, 2, '#56693a')
  R(x - 7, hy - 1, 7, 3, INK); R(x + 1, hy - 1, 7, 3, INK); R(x, hy - 1, 1, 2, INK); R(x - 6, hy - 1, 2, 1, '#9fd8ff'); R(x + 2, hy - 1, 2, 1, '#9fd8ff')
  R(x - 4, hy + 4, 9, 2, '#ffffff'); R(x - 5, hy + 4, 1, 1, '#7a3040'); R(x + 5, hy + 4, 1, 1, '#7a3040'); R(x - 4, hy + 6, 9, 1, '#7a3040'); R(x - 1, hy + 4, 1, 2, '#d8d0c8')
  thick(x + 9, 53, x - 7, 84, '#9a9aaa', 3)
  thick(x - 8, 60, 0, 84, '#e2ab84', 6)
  // the passenger: the fish, upright, buckled in, in matching shades
  fish(l, 78, 53, 34, { dir: 'up', shades: true })
  thick(88, 41, 68, 70, '#9a9aaa', 3)
  R(86, 39, 3, 3, '#c9c9d6')
}
/** 4 · the sunset (st.lift 0…1: the fish rises into the sun) */
function photoSunset(l, t, st = {}) {
  const { R, sky, disc, thick } = P(l)
  const lift = clamp(st.lift || 0)
  sky([[0, '#2b1a52'], [14, '#6a2f74'], [28, '#c2496f'], [40, '#f08a4b'], [48, '#ffc874']], 0, 49)
  // birds
  for (const [bx, by] of [[22, 12], [29, 9], [80, 16]]) { const f = Math.floor(t * 3 + bx) % 2; R(bx - 2, by + f, 2, 1, '#3a1840'); R(bx + 1, by + f, 2, 1, '#3a1840'); R(bx, by + 1, 1, 1, '#3a1840') }
  // the sun (half), its glow
  disc(53, 49, 15, '#ffd98a', (i, j) => j < 49); disc(53, 49, 12.5, '#fff1b6', (i, j) => j < 49); disc(53, 49, 9, '#fffbe2', (i, j) => j < 49)
  // the water + the sun's reflection
  R(0, 49, LW, 18, '#3d2156')
  for (let k = 0; k < 7; k++) { const y = 50 + k * 2.5, w = 22 - k * 2.6, sh = Math.round(Math.sin(t * 3 + k) * 2); R(53 - w / 2 + sh, y, w, 1, k < 3 ? '#ffd27a' : '#f08a4b') }
  for (let k = 0; k < 5; k++) R(((k * 29 + Math.floor(t * 4)) % 110) - 4, 54 + k * 3, 5, 1, '#6a3a7a')
  // the dock + the human, in silhouette
  const SIL = '#160b20'
  R(0, 67, LW, 17, SIL); for (let x = 4; x < LW; x += 15) R(x, 67, 1, 17, '#24132f')
  human(l, 53, 81, { sil: SIL })
  // the fish, raised overhead (in silhouette, framed by the sun)
  if (lift > 0) {
    const fy = lerp(72, 36, lift), e = lift
    thick(48, 52, lerp(46, 40, e), fy + 3, SIL, 2); thick(58, 52, lerp(60, 66, e), fy + 2, SIL, 2)
    fish(l, 53, fy, 40, { sil: SIL })
  }
}
export const PHOTOS = [photoFish, photoBigger, photoGroup, photoCar, photoSunset]

/** the veiled photo slot on the mystery card: an aura and a soft, unknowable silhouette */
export function paintVeil(l, t) {
  const { R, disc } = P(l)
  for (let j = 0; j < LH; j++) for (let i = 0; i < LW; i++) {
    const d = Math.hypot((i - LW / 2) / LW, (j - LH * 0.62) / LH)
    const w = 0.5 + 0.5 * Math.sin(t * 1.3 + i * 0.07 - j * 0.05)
    const c = d < 0.16 ? '#ff8fd0' : d < 0.27 ? (w > 0.5 ? '#d27ae6' : '#c46ae0') : d < 0.42 ? '#7b5ad8' : d < 0.6 ? '#3e2f8f' : '#1c1440'
    R(i, j, 1, 1, c)
  }
  disc(LW / 2, LH * 0.42, 9, 'rgba(26,14,48,0.55)')
  disc(LW / 2, LH * 0.98, 22, 'rgba(26,14,48,0.55)')
}
