// eightbillion half a: the Earth at night. A procedural globe: a land mask (Natural Earth 110m) and a city-lights map
// (clustered points around real metro areas, scattered towns, faint roads) baked once to equirectangular textures,
// then ray-cast per pixel onto an orthographic sphere with a thin dawn rim, moonlit land and an atmosphere glow.
import { rng, clamp } from '../../../../src/lib.js'
import { LAND } from './land.js'

// metro areas: [lat, lon, weight] (weight ≈ how big the light cluster is; no numbers are ever shown)
const CITIES = [
  // North America
  [29.76, -95.37, 7], [32.78, -96.8, 7.5], [30.27, -97.74, 2.3], [29.42, -98.49, 2.6], [29.95, -90.07, 1.3], [30.45, -91.15, 0.8],
  [33.75, -84.39, 6], [25.76, -80.19, 6], [28.54, -81.38, 2.6], [27.95, -82.46, 3.1], [30.33, -81.66, 1.6], [35.23, -80.84, 2.7],
  [36.16, -86.78, 2], [35.15, -90.05, 1.3], [39.1, -84.51, 2.2], [39.96, -83, 2.1], [41.5, -81.69, 2], [42.33, -83.05, 4.3],
  [41.88, -87.63, 9.5], [43.04, -87.91, 1.6], [44.98, -93.27, 3.7], [38.63, -90.2, 2.8], [39.1, -94.58, 2.2], [41.26, -95.93, 1],
  [39.74, -104.99, 3], [40.76, -111.89, 1.3], [33.45, -112.07, 5], [32.22, -110.97, 1], [36.17, -115.14, 2.3], [34.05, -118.24, 13],
  [32.72, -117.16, 3.3], [37.77, -122.42, 4.7], [37.34, -121.89, 2], [38.58, -121.49, 2.4], [45.52, -122.68, 2.5], [47.61, -122.33, 4],
  [40.71, -74.01, 19], [42.36, -71.06, 4.9], [39.95, -75.17, 6.2], [38.91, -77.04, 6.3], [39.29, -76.61, 2.8], [40.44, -79.99, 2.4],
  [42.89, -78.88, 1.1], [43.16, -77.61, 1], [35.47, -97.52, 1.4], [36.15, -95.99, 1], [35.08, -106.65, 0.9], [31.76, -106.49, 1],
  [37.54, -77.44, 1.3], [36.85, -76.29, 1.8], [35.78, -78.64, 1.4], [32.08, -81.09, 0.5], [32.37, -86.3, 0.4], [33.52, -86.8, 1.1],
  [38.25, -85.76, 1.3], [39.77, -86.16, 2.1], [32.3, -90.18, 0.6], [34.75, -92.29, 0.7], [37.69, -97.34, 0.6], [46.88, -96.79, 0.25],
  [43.65, -79.38, 6.2], [45.5, -73.57, 4.3], [45.42, -75.7, 1.4], [49.28, -123.12, 2.6], [51.05, -114.07, 1.5], [53.55, -113.49, 1.4],
  [49.9, -97.14, 0.8], [46.81, -71.21, 0.8],
  [19.43, -99.13, 21], [20.67, -103.35, 5], [25.69, -100.32, 5], [19.04, -98.21, 3], [21.16, -86.85, 0.9], [32.51, -117.04, 2],
  [31.69, -106.42, 1.5], [29.07, -110.96, 0.9], [20.97, -89.62, 1.1], [16.85, -99.89, 0.8], [21.88, -102.29, 1], [22.15, -100.98, 1.2],
  [14.63, -90.51, 3], [13.69, -89.22, 1.1], [14.07, -87.19, 1.2], [12.11, -86.24, 1], [9.93, -84.08, 1.4], [8.98, -79.52, 1.6],
  [23.11, -82.37, 2.1], [18.47, -69.9, 3.2], [18.47, -66.11, 2.4], [18.0, -76.79, 1.2],
  // South America
  [4.71, -74.07, 10], [6.24, -75.58, 3.7], [10.48, -66.9, 3], [10.39, -75.51, 1], [-0.18, -78.47, 2.7], [-2.17, -79.92, 3],
  [-12.05, -77.04, 10.5], [-16.5, -68.15, 1.8], [-33.45, -70.67, 7], [-34.6, -58.38, 15], [-31.42, -64.18, 1.6], [-32.95, -60.65, 1.4],
  [-34.9, -56.16, 1.8], [-25.26, -57.58, 2.2], [-23.55, -46.63, 22], [-22.91, -43.17, 13], [-19.92, -43.94, 6], [-15.79, -47.88, 4.6],
  [-25.43, -49.27, 3.6], [-30.03, -51.23, 4.3], [-12.97, -38.5, 4], [-8.05, -34.88, 4], [-3.73, -38.52, 4], [-1.46, -48.5, 2.5],
  [-3.12, -60.02, 2.2], [-16.68, -49.25, 2.6], [-20.32, -40.34, 2], [-5.79, -35.21, 1.5], [-9.67, -35.74, 1.2],
  // Europe
  [51.51, -0.13, 14], [53.48, -2.24, 3], [52.49, -1.89, 2.9], [55.95, -3.19, 1.4], [53.35, -6.26, 2], [48.86, 2.35, 12.5],
  [45.76, 4.84, 2.3], [43.3, 5.37, 1.9], [52.37, 4.9, 2.5], [50.85, 4.35, 2.1], [51.23, 6.78, 10], [52.52, 13.4, 6], [53.55, 9.99, 3.3],
  [48.14, 11.58, 3], [50.11, 8.68, 2.7], [48.21, 16.37, 2.9], [50.08, 14.44, 2.7], [47.5, 19.04, 3.3], [52.23, 21.01, 3.1],
  [40.42, -3.7, 6.7], [41.39, 2.17, 5.6], [38.72, -9.14, 2.9], [37.39, -5.98, 1.5], [39.47, -0.38, 1.6], [45.46, 9.19, 7.5],
  [41.9, 12.5, 4.3], [40.85, 14.27, 3.1], [37.98, 23.73, 3.2], [44.43, 26.1, 2.3], [42.7, 23.32, 1.6], [44.79, 20.45, 1.7],
  [59.33, 18.07, 2.4], [59.91, 10.75, 1.5], [55.68, 12.57, 2.1], [60.17, 24.94, 1.5], [55.76, 37.62, 17], [59.94, 30.31, 6],
  [50.45, 30.52, 3.5], [49.99, 36.23, 1.4], [46.48, 30.73, 1], [41.01, 28.98, 15.5], [39.93, 32.86, 5.6], [38.42, 27.14, 3],
  // Africa & the Middle East
  [30.04, 31.24, 21], [31.2, 29.92, 5.2], [33.57, -7.59, 4.3], [34.02, -6.84, 1.9], [36.75, 3.06, 3.4], [36.81, 10.18, 2.5],
  [6.52, 3.38, 15], [9.06, 7.5, 3.5], [5.6, -0.19, 2.5], [5.36, -4.01, 5], [14.69, -17.44, 3.1], [-4.32, 15.31, 14],
  [-1.29, 36.82, 4.7], [9.03, 38.74, 4.8], [-6.79, 39.21, 6.7], [0.35, 32.58, 3.3], [-26.2, 28.05, 9], [-33.92, 18.42, 4.6],
  [-29.86, 31.02, 3.4], [15.5, 32.56, 5.8], [32.09, 34.78, 4], [33.89, 35.5, 2.4], [31.95, 35.93, 2.2], [24.71, 46.68, 7.5],
  [21.49, 39.19, 4.6], [25.2, 55.27, 3.4], [25.29, 51.53, 2.4], [35.69, 51.39, 9], [33.31, 44.37, 7], [36.19, 44.01, 1.5],
  // Asia & Oceania
  [28.61, 77.21, 30], [19.08, 72.88, 21], [12.97, 77.59, 12.5], [13.08, 80.27, 11], [22.57, 88.36, 15], [17.39, 78.49, 10],
  [23.02, 72.57, 8], [18.52, 73.86, 7], [26.85, 80.95, 3.6], [26.91, 75.79, 3.9], [24.86, 67.0, 16], [31.55, 74.34, 13],
  [33.68, 73.05, 2.3], [23.81, 90.41, 22], [27.72, 85.32, 1.5], [6.93, 79.85, 2.4], [39.9, 116.4, 21], [31.23, 121.47, 27],
  [23.13, 113.26, 14], [22.54, 114.06, 13], [22.32, 114.17, 7.5], [30.57, 104.07, 10], [29.56, 106.55, 9], [30.59, 114.31, 11],
  [34.34, 108.94, 9], [39.13, 117.2, 10], [36.07, 120.38, 6], [32.06, 118.8, 9], [30.27, 120.15, 9], [41.8, 123.43, 7.5],
  [45.8, 126.53, 6], [25.03, 121.57, 7], [37.57, 126.98, 25], [35.18, 129.08, 3.4], [35.68, 139.69, 37], [34.69, 135.5, 19],
  [35.18, 136.91, 9], [43.06, 141.35, 2.6], [33.59, 130.4, 2.5], [14.6, 120.98, 13.5], [10.82, 106.63, 9], [21.03, 105.85, 8],
  [13.76, 100.5, 10.5], [3.14, 101.69, 8], [1.35, 103.82, 5.7], [-6.21, 106.85, 33], [-7.25, 112.75, 9.5], [-6.91, 107.61, 8.5],
  [16.87, 96.2, 5.4], [11.56, 104.92, 2.2], [43.24, 76.89, 2], [41.3, 69.24, 2.6], [-33.87, 151.21, 5.3], [-37.81, 144.96, 5],
  [-27.47, 153.03, 2.5], [-31.95, 115.86, 2.1], [-34.93, 138.6, 1.4], [-36.85, 174.76, 1.7], [55.03, 82.92, 1.6], [56.84, 60.61, 1.5],
]

export const TW = 4096, TH = 2048   // lights texture
const MW = 2048, MH = 1024           // land mask
export const HOME = { lat: 29.76, lon: -95.37 }

let BAKED = null
export function bakeGlobe() {
  if (BAKED) return BAKED
  // land mask
  const mc = document.createElement('canvas'); mc.width = MW; mc.height = MH
  const mx = mc.getContext('2d')
  mx.fillStyle = '#000'; mx.fillRect(0, 0, MW, MH)
  mx.fillStyle = '#fff'
  mx.beginPath()
  for (const r of LAND) {
    // unwrap across the antimeridian, then draw the ring at −360/0/+360 so nothing smears into a band
    const lo = [], la = []
    for (let i = 0; i < r.length; i += 2) {
      let l = r[i]
      if (lo.length) { const prev = lo[lo.length - 1]; while (l - prev > 180) l -= 360; while (l - prev < -180) l += 360 }
      lo.push(l); la.push(r[i + 1])
    }
    for (const o of [-360, 0, 360]) {
      for (let i = 0; i < lo.length; i++) {
        const x = (lo[i] + o + 180) / 360 * MW, y = (90 - la[i]) / 180 * MH
        i ? mx.lineTo(x, y) : mx.moveTo(x, y)
      }
      mx.closePath()
    }
  }
  mx.fill('evenodd')
  const md = mx.getImageData(0, 0, MW, MH).data
  const land = new Uint8Array(MW * MH)
  for (let i = 0; i < MW * MH; i++) land[i] = md[i * 4]
  const isLand = (lat, lon) => { const x = Math.floor((lon + 180) / 360 * MW) & (MW - 1), y = clamp(Math.floor((90 - lat) / 180 * MH), 0, MH - 1); return land[y * MW + x] > 127 }

  // lights: splat into a float buffer
  const L = new Float32Array(TW * TH)
  const splat = (lat, lon, a, sz = 1) => {
    const fx = (lon + 180) / 360 * TW, fy = (90 - lat) / 180 * TH
    const sx = sz / Math.max(0.2, Math.cos(lat * Math.PI / 180))   // keep spots round on the sphere
    const rx = Math.ceil(sx * 1.6), ry = Math.ceil(sz * 1.6)
    const x0 = Math.floor(fx), y0 = Math.floor(fy)
    for (let y = y0 - ry; y <= y0 + ry; y++) {
      if (y < 0 || y >= TH) continue
      const dy = (y + 0.5 - fy) / sz
      for (let x = x0 - rx; x <= x0 + rx; x++) {
        const dx = (x + 0.5 - fx) / sx, d2 = dx * dx + dy * dy
        if (d2 > 2.6) continue
        L[y * TW + ((x % TW) + TW) % TW] += a * Math.exp(-d2 * 1.6)
      }
    }
  }
  const r = rng(808)
  const gauss = () => { let u = 0; for (let k = 0; k < 4; k++) u += r(); return (u - 2) * 0.866 }
  const DEG = TW / 360
  for (const [lat, lon, w] of CITIES) {
    const sig = 0.12 + 0.11 * Math.sqrt(w)          // degrees
    const n = Math.round(90 + 70 * w)
    splat(lat, lon, 0.9 + 0.12 * w, 1.6 + 0.5 * Math.sqrt(w))     // the dense core
    for (let i = 0; i < n; i++) {
      const k = Math.pow(r(), 1.7)                // most points near the core
      const la = lat + gauss() * sig * (0.3 + 1.3 * k), lo = lon + gauss() * sig * (0.3 + 1.3 * k) / Math.cos(lat * Math.PI / 180)
      if (!isLand(la, lo) && r() < 0.85) continue
      splat(la, lo, (0.18 + 0.5 * r()) * (1.1 - 0.6 * k), 0.7 + r() * 0.6)
    }
  }
  // roads: faint dotted strings between nearby cities
  for (let i = 0; i < CITIES.length; i++) for (let j = i + 1; j < CITIES.length; j++) {
    const [la1, lo1, w1] = CITIES[i], [la2, lo2, w2] = CITIES[j]
    const d = Math.hypot(la2 - la1, (lo2 - lo1) * Math.cos(la1 * Math.PI / 180))
    if (d > 9 || d < 0.6) continue
    const steps = Math.round(d * 7)
    const bend = (r() - 0.5) * 0.18 * d
    for (let s = 1; s < steps; s++) {
      const u = s / steps, b = Math.sin(Math.PI * u) * bend
      const la = la1 + (la2 - la1) * u + b * 0.5 + gauss() * 0.06, lo = lo1 + (lo2 - lo1) * u - b * 0.5 + gauss() * 0.06
      if (!isLand(la, lo)) continue
      if (r() < 0.55) splat(la, lo, 0.1 + 0.18 * r() * Math.min(1, (w1 + w2) / 8), 0.6 + r() * 0.4)
    }
  }
  // small towns: rejection-sampled over land, denser near the cities
  let placed = 0
  for (let tries = 0; tries < 900000 && placed < 52000; tries++) {
    const la = Math.asin(r() * 2 - 1) * 180 / Math.PI, lo = r() * 360 - 180
    if (la < -50 || la > 66 || !isLand(la, lo)) continue
    let dens = 0
    for (const [cl, co, w] of CITIES) {
      const dl = la - cl, dlo = (lo - co) * Math.cos(cl * Math.PI / 180)
      const d2 = dl * dl + dlo * dlo
      if (d2 < 120) dens += w * Math.exp(-d2 / 30)
    }
    if (r() > Math.min(1, 0.012 + dens * 0.035)) continue
    splat(la, lo, 0.1 + 0.32 * Math.pow(r(), 2.2), 0.55 + r() * 0.5); placed++
  }
  // tone map → bytes
  const lights = new Uint8Array(TW * TH)
  for (let i = 0; i < TW * TH; i++) { const v = L[i]; lights[i] = v > 0.004 ? Math.min(255, Math.round(255 * (1 - Math.exp(-v * 1.25)))) : 0 }
  void DEG
  BAKED = { land, lights }
  return BAKED
}

// rotation helpers (row-major 3×3)
const mul = (A, B) => { const C = new Array(9); for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) C[i * 3 + j] = A[i * 3] * B[j] + A[i * 3 + 1] * B[3 + j] + A[i * 3 + 2] * B[6 + j]; return C }
const rotX = a => { const c = Math.cos(a), s = Math.sin(a); return [1, 0, 0, 0, c, -s, 0, s, c] }
const rotY = a => { const c = Math.cos(a), s = Math.sin(a); return [c, 0, s, 0, 1, 0, -s, 0, c] }
const rotZ = a => { const c = Math.cos(a), s = Math.sin(a); return [c, -s, 0, s, c, 0, 0, 0, 1] }
/** world→view so that HOME sits `elev` radians up from the view centre (rolled by `roll`) */
export function viewMatrix(elev, roll = 0, lon = HOME.lon, lat = HOME.lat) {
  const D = Math.PI / 180
  // world: x = cos(lat) sin(lon), y = sin(lat), z = cos(lat) cos(lon)
  return mul(rotZ(roll), mul(rotX(-elev), mul(rotX(lat * D), rotY(-lon * D))))
}

/**
 * paint the globe into ctx (a canvas sized to the full frame, or a scaled buffer: pass `scale`).
 * g = { cx, cy, R, M (world→view), alpha, glow }
 */
export function drawGlobe(ctx, g, scale = 1) {
  const { land, lights } = bakeGlobe()
  const Wc = ctx.canvas.width, Hc = ctx.canvas.height
  const R = g.R * scale, cx = g.cx * scale, cy = g.cy * scale
  const atm = clamp(R * 0.022, 3 * scale, 70 * scale)          // atmosphere thickness, px
  const x0 = Math.max(0, Math.floor(cx - R - atm)), x1 = Math.min(Wc, Math.ceil(cx + R + atm))
  const y0 = Math.max(0, Math.floor(cy - R - atm)), y1 = Math.min(Hc, Math.ceil(cy + R + atm))
  if (x1 <= x0 || y1 <= y0) return
  const bw = x1 - x0, bh = y1 - y0
  const img = ctx.createImageData(bw, bh), p = img.data
  const M = g.M   // world→view; view→world = transpose
  // sun behind the Earth, up-left: a thin dawn crescent on the left limb. moon up-right: faint blue sheen.
  const sun = norm([-0.72, -0.06, -0.7]), moon = norm([0.55, 0.6, 0.58])
  const A = g.alpha ?? 1, ext = 1 + atm / R
  const lightGain = g.lights ?? 1
  const limbK = clamp(1.25 - Math.log10(Math.max(R / scale, 1)) * 0.25, 0.12, 1)   // ≈1 at R 420, ≈0.15 at R 30000
  for (let j = 0; j < bh; j++) {
    const vy = -((y0 + j + 0.5) - cy) / R
    for (let i = 0; i < bw; i++) {
      const vx = ((x0 + i + 0.5) - cx) / R
      const d2 = vx * vx + vy * vy
      const k = (j * bw + i) * 4
      if (d2 >= 1) {
        // atmosphere outside the limb
        const d = Math.sqrt(d2)
        if (d >= ext) continue
        const u = (d - 1) / (ext - 1)
        const side = clamp(0.35 + 0.65 * (-(vx / d) * 0.9 + (vy / d) * 0.3))
        const a = Math.pow(1 - u, 2.2) * (0.28 + 0.6 * side) * A
        p[k] = 70; p[k + 1] = 120; p[k + 2] = 235; p[k + 3] = Math.round(255 * clamp(a))
        continue
      }
      const vz = Math.sqrt(1 - d2)
      // view → world
      const wx = M[0] * vx + M[3] * vy + M[6] * vz
      const wy = M[1] * vx + M[4] * vy + M[7] * vz
      const wz = M[2] * vx + M[5] * vy + M[8] * vz
      const lat = Math.asin(clamp(wy, -1, 1)), lon = Math.atan2(wx, wz)
      const fu = (lon / (2 * Math.PI) + 0.5) * TW - 0.5, fv = (0.5 - lat / Math.PI) * TH - 0.5
      const iu = Math.floor(fu), iv = Math.floor(fv), au = fu - iu, av = fv - iv
      const u0 = ((iu % TW) + TW) % TW, u1 = (u0 + 1) % TW, v0 = clamp(iv, 0, TH - 1), v1 = clamp(iv + 1, 0, TH - 1)
      const li = ((lights[v0 * TW + u0] * (1 - au) + lights[v0 * TW + u1] * au) * (1 - av) + (lights[v1 * TW + u0] * (1 - au) + lights[v1 * TW + u1] * au) * av) / 255
      const mu = Math.floor((lon / (2 * Math.PI) + 0.5) * MW) & (MW - 1), mv = clamp(Math.floor((0.5 - lat / Math.PI) * MH), 0, MH - 1)
      const isL = land[mv * MW + mu] / 255
      const sd = vx * sun[0] + vy * sun[1] + vz * sun[2]
      const day = clamp((sd + 0.02) / 0.22)
      const md = Math.max(0, vx * moon[0] + vy * moon[1] + vz * moon[2])
      const limb = Math.pow(1 - vz, 3)
      // night surface: ocean ink, land a touch lifted, both catching faint moonlight
      let r = 5 + isL * 9, gg = 8 + isL * 10, b = 20 + isL * 12
      const ml = 0.35 + 0.9 * md
      r *= ml; gg *= ml; b *= ml
      // dawn crescent
      r += day * (28 + isL * 34); gg += day * (52 + isL * 38); b += day * (110 + isL * 10)
      // atmosphere scattering toward the limb
      r += limb * 40 * limbK; gg += limb * 72 * limbK; b += limb * 150 * limbK
      // city lights (sodium warm, white cores)
      const L = li * lightGain * (1 - day * 0.9) * (0.55 + 0.45 * vz)
      r += L * 255; gg += L * (170 + 70 * L); b += L * (95 + 120 * L * L)
      p[k] = r > 255 ? 255 : r; p[k + 1] = gg > 255 ? 255 : gg; p[k + 2] = b > 255 ? 255 : b
      // soft edge (anti-aliased limb)
      const edge = clamp((1 - Math.sqrt(d2)) * R * 1.2)
      p[k + 3] = Math.round(255 * A * edge)
    }
  }
  const tmp = scratch(bw, bh)
  tmp.getContext('2d').putImageData(img, 0, 0)
  ctx.drawImage(tmp, 0, 0, bw, bh, x0, y0, bw, bh)
}
function norm(v) { const l = Math.hypot(...v); return v.map(x => x / l) }
let SCR = null
function scratch(w, h) {
  if (!SCR) SCR = document.createElement('canvas')
  if (SCR.width < w || SCR.height < h) { SCR.width = Math.max(SCR.width, w); SCR.height = Math.max(SCR.height, h) }
  SCR.getContext('2d').clearRect(0, 0, w, h)
  return SCR
}
/** where a world lat/lon lands on screen for globe g (and whether it faces us) */
export function project(g, lat, lon) {
  const D = Math.PI / 180, w = [Math.cos(lat * D) * Math.sin(lon * D), Math.sin(lat * D), Math.cos(lat * D) * Math.cos(lon * D)]
  const M = g.M
  const vx = M[0] * w[0] + M[1] * w[1] + M[2] * w[2], vy = M[3] * w[0] + M[4] * w[1] + M[5] * w[2], vz = M[6] * w[0] + M[7] * w[1] + M[8] * w[2]
  return { x: g.cx + vx * g.R, y: g.cy - vy * g.R, z: vz }
}
