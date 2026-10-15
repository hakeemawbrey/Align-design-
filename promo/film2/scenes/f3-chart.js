// ─────────────────────────────────────────────── F3 · CHART FIRST, FACE LAST (6.5–10.7)
// Juniper's veiled mystery card (card-profile-3.png) in the grainy deep-space nebula (S1's look, 16:9).
// Starts on f2's end frame: card body 520px wide centred at (960, 470). The camera pushes in on the chart:
// Sun / element / Moon badges glow in (the right column reads them out: Sun Libra · Moon Gemini · Rising Aquarius),
// the bio line catches the light, the dealbreakers re-type themselves. Then the camera tilts up to the photo window,
// which stays a breathing aura veil — never a face. "Chart first." / "Face last." Pulls back to the f4 handoff:
// card body 322px wide (scale 0.62) centred at (960, 540) at 10.5.
// The sky (nebula, star layers, bright stars, moon, grain) is exported for f4 so the cut is seamless.
import { clamp, lerp, prog, ease, tw, rng, noise1, el, C, PIXEL_PALETTE, TypeLine } from '../../src/lib.js'
import { W, H, A, SERIF, MONO, SANS, fill, img } from '../../src/scenes/common.js'
import { drawMoon } from '../../src/scenes/fx-moon.js'

export const F3 = { start: 6.5, end: 10.7 }
// ── card geometry (card-profile-*.png px). Body box [120,114,1374,2116] → centre (747,1115), width 1254.
export const PNG = { w: 1496, h: 2238, cx: 747, cy: 1115, bw: 1254 }
export const S0 = 520 / PNG.bw          // on-screen px per PNG px at camera scale 1 (f2 handoff size)
const WIN = [218, 342, 1292, 914]       // photo window (aura veil)
// camera keys: [t, cx, cy, scale, yawDeg]
const CAM = [
  [6.5, 960, 470, 1.0, 0],
  [6.72, 960, 470, 1.015, 0],
  [7.5, 640, 398, 1.45, 5],
  [8.95, 616, 384, 1.53, 4],
  [9.55, 640, 770, 1.6, 2],
  [10.0, 652, 776, 1.64, 1.5],
  [10.5, 960, 540, 0.62, 0],
]
export const HANDOFF = { t: 10.5, cx: 960, cy: 540, scale: 0.62 }   // f4 starts here (body 322×515)
function camAt(t) {
  if (t <= CAM[0][0]) return CAM[0].slice(1)
  for (let i = 1; i < CAM.length; i++) {
    if (t <= CAM[i][0]) {
      const a = CAM[i - 1], b = CAM[i], k = ease.inOutCubic((t - a[0]) / (b[0] - a[0]))
      return [1, 2, 3, 4].map(j => lerp(a[j], b[j], k))
    }
  }
  return CAM[CAM.length - 1].slice(1)
}
// beats
const B = {
  eyebrow: 7.12, chart: 7.28,
  sun: 7.5, air: 7.64, moon: 7.8, rising: 7.98,
  bio: 8.05, dbLabel: 8.22, dbType: 8.3,
  rowsOut: 8.92, face: 9.2, noPhoto: 9.5,
  textOut: 10.12,
}
const DB_TEXT = 'One-word texts. Refusing to talk it out the same night.\nHating my group chats.'
const DB_PER = 0.0095

// ─────────────────────────────────────────────── shared sky (copied from S1, 16:9)
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

let SKY = null
/** pre-rendered sky layers, built once and shared by f3 + f4 */
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
/** the sky camera: one continuous slow dolly over f3 + f4 (zoom, drift) */
export function skyCam(t) {
  // continues f2's sky camera exactly at 6.5 (cam 1.0134, drift −6.1, 2.05) and keeps its direction of travel
  const k = prog(t, 6.5, 15.2)
  const zoom = 1.0134 + 0.06 * ease.inOutQuad(prog(t, 6.5, 10.0)) - 0.05 * ease.inOutQuad(prog(t, 10.2, 15.2))
  return { zoom, dx: lerp(-6.1, -64, k), dy: lerp(2.05, 32, k) }
}
/** paint the sky onto ctx (opaque). opts.dim scales the plate; opts.moon draws the crescent */
export function drawSky(bx, t, { pan = [0, 0], moon = 1 } = {}) {
  const S = getSky()
  const { zoom, dx: dX, dy: dY } = skyCam(t)
  const driftX = dX + pan[0], driftY = dY + pan[1]
  const layer = (im, s, ox, oy) => { const w = BGW * s, h = BGH * s; bx.drawImage(im, W / 2 - w / 2 + ox, H / 2 - h / 2 + oy, w, h) }
  const flick = 1 + (noise1(t * 14, 3) - 0.5) * 0.05
  bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
  bx.fillStyle = C.void; bx.fillRect(0, 0, W, H)
  bx.globalAlpha = flick
  layer(S.neb, zoom, driftX * 0.5, driftY * 0.5)
  bx.globalCompositeOperation = 'lighter'
  bx.globalAlpha = 0.9; layer(S.far, zoom, driftX * 0.7, driftY * 0.7)
  bx.globalAlpha = 1
  layer(S.mid, zoom * 1.01, driftX, driftY)
  layer(S.near, zoom * 1.03, driftX * 1.6, driftY * 1.6)
  for (const b of S.bright) {
    const s = zoom * (1.02 + 0.03 * b.depth)
    const x = W / 2 + (b.x - W / 2) * s + driftX * (1 + b.depth * 0.6)
    const y = H / 2 + (b.y - H / 2) * s + driftY * (1 + b.depth * 0.6)
    const tw2 = 0.55 + 0.45 * noise1(t * b.sp, b.seed) + 0.25 * Math.max(0, noise1(t * b.sp * 3.1, b.seed + 9) - 0.6)
    const sz = b.size * (0.85 + 0.25 * tw2)
    bx.globalAlpha = clamp(tw2)
    bx.drawImage(b.spike ? S.spriteS : S.spriteG, x - sz / 2, y - sz / 2, sz, sz)
  }
  bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
  if (moon > 0) {
    // the waxing crescent rides upper-right, as in S1 (a touch fuller: the story has moved on)
    // starts on f2's moon (1575, 262, r64·cam, phase .09); the camera move carries it up-right, clear of the copy
    const mv = ease.inOutCubic(prog(t, 6.62, 7.5))
    const mx = lerp(1575, 1716, mv), my = lerp(262, 122, mv), mr = lerp(64, 52, mv) * zoom
    drawMoon(bx, mx + driftX * 1.3, my + driftY * 1.3, mr, lerp(0.09, 0.14, prog(t, 6.5, 15.2)),
      { alpha: moon, glow: 3, earthshine: 1, darkAlpha: 0.62 })
  }
  bx.drawImage(S.vig, 0, 0)
}
/** a fresh grain frame on the overlay canvas */
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

// ─────────────────────────────────────────────── scene
export default function build(stage) {
  const root = fill(stage, { background: C.void })
  const bgC = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  bgC.width = W; bgC.height = H
  const bx = bgC.getContext('2d')
  getSky()

  // ── the card (PNG-px coordinate space, transformed as one 3D plane)
  const card = el('div', { position: 'absolute', left: 0, top: 0, width: PNG.w + 'px', height: PNG.h + 'px', transformOrigin: '0 0' }, root)
  img(card, A + 'card-profile-3.png', { left: 0, top: 0, width: PNG.w + 'px', height: PNG.h + 'px' })
  // breathing aura veil: additive light that drifts and swells inside the photo window (the arch stays an aura)
  const win = el('div', { position: 'absolute', left: WIN[0] + 'px', top: WIN[1] + 'px', width: (WIN[2] - WIN[0]) + 'px', height: (WIN[3] - WIN[1]) + 'px', borderRadius: '40px', overflow: 'hidden', mixBlendMode: 'screen' }, card)
  const blobs = [
    ['232,98,138', 520, 0.0], ['154,123,224', 600, 2.1], ['180,92,255', 460, 4.2], ['120,140,255', 420, 1.1],
  ].map(([c, s, ph]) => ({ ph, s, e: el('div', { position: 'absolute', left: 0, top: 0, width: s + 'px', height: s + 'px', borderRadius: '50%', background: `radial-gradient(closest-side, rgba(${c},0.55), rgba(${c},0.18) 55%, rgba(${c},0) 100%)` }, win) }))
  const arch = el('div', { position: 'absolute', left: '50%', top: '18%', width: '560px', height: '760px', marginLeft: '-280px', borderRadius: '280px 280px 0 0', background: 'radial-gradient(60% 55% at 50% 40%, rgba(255,226,250,0.28), rgba(200,150,255,0.12) 55%, rgba(200,150,255,0) 80%)', transformOrigin: '50% 100%' }, win)
  // "NO PHOTO UNTIL YOU BOTH ALIGN": a light sweep along the printed line
  const noPh = el('div', { position: 'absolute', left: (WIN[0] + 10) + 'px', top: '852px', width: '760px', height: '44px', overflow: 'hidden', mixBlendMode: 'screen', opacity: 0 }, card)
  const noPhBand = el('div', { position: 'absolute', top: 0, left: 0, width: '260px', height: '100%', background: 'linear-gradient(90deg, rgba(242,199,92,0), rgba(255,236,205,0.85), rgba(242,199,92,0))' }, noPh)

  // badges: glow rings over LIBRA · AIR · GEMINI MOON (row 946–1030)
  const BADGES = [
    { at: B.sun, x0: 240, x1: 490, round: '10px', col: '232,122,190' },
    { at: B.air, x0: 512, x1: 735, round: '44px', col: '127,216,240' },
    { at: B.moon, x0: 759, x1: 1203, round: '44px', col: '170,150,255' },
  ].map(b => ({ ...b,
    ring: el('div', { position: 'absolute', left: b.x0 + 'px', top: '940px', width: (b.x1 - b.x0) + 'px', height: '96px', borderRadius: b.round, boxShadow: `0 0 0 3px rgba(${b.col},0.95), 0 0 34px 8px rgba(${b.col},0.55), inset 0 0 26px rgba(${b.col},0.4)`, opacity: 0, transformOrigin: '50% 50%' }, card),
  }))
  // bio: a warm light sweep across the two printed lines
  const bio = el('div', { position: 'absolute', left: '236px', top: '1058px', width: '990px', height: '144px', overflow: 'hidden', mixBlendMode: 'screen', opacity: 0 }, card)
  const bioBand = el('div', { position: 'absolute', top: 0, left: 0, width: '420px', height: '100%', background: 'linear-gradient(90deg, rgba(242,199,92,0), rgba(255,226,236,0.55) 50%, rgba(242,199,92,0))' }, bio)
  const bioBar = el('div', { position: 'absolute', left: '214px', top: '1072px', width: '6px', height: '116px', borderRadius: '3px', background: C.gold, boxShadow: '0 0 14px rgba(242,199,92,0.8)', transformOrigin: '50% 0', transform: 'scaleY(0)' }, card)
  // dealbreakers: the printed text is covered with the card's own ink colour, then typed back in
  const dbLabelGlow = el('div', { position: 'absolute', left: '180px', top: '1748px', width: '320px', height: '46px', borderRadius: '8px', background: 'radial-gradient(closest-side, rgba(232,122,160,0.55), rgba(232,122,160,0))', mixBlendMode: 'screen', opacity: 0 }, card)
  const dbCover = el('div', { position: 'absolute', left: '180px', top: '1815px', width: '1130px', height: '146px', background: 'rgb(14,9,26)', opacity: 0 }, card)
  const dbType = new TypeLine(card, DB_TEXT, { left: '189px', top: '1808px', fontFamily: SERIF, fontStyle: 'italic', fontSize: '53.4px', lineHeight: '64px', color: 'rgb(179,166,196)', letterSpacing: '0.002em' },
    { perChar: DB_PER, fade: 0.2, final: 'rgb(179,166,196)', accent: [C.rub, C.gold, C.violet] })
  const caret = el('div', { position: 'absolute', width: '4px', height: '56px', background: C.gold, boxShadow: '0 0 10px rgba(242,199,92,0.9)', opacity: 0 }, card)

  // ── right column copy
  const COLX = 1150
  const pocket = el('div', { position: 'absolute', left: (COLX - 180) + 'px', top: '120px', width: '1000px', height: '760px', background: 'radial-gradient(50% 50% at 50% 50%, rgba(11,6,32,0.55), rgba(11,6,32,0.25) 60%, rgba(11,6,32,0) 100%)', opacity: 0 }, root)
  const eyebrow = el('div', { position: 'absolute', left: COLX + 'px', top: '236px', fontFamily: MONO, fontSize: '26px', letterSpacing: '0.28em', color: 'rgba(239,230,214,0.92)', textShadow: '0 1px 12px rgba(11,6,32,0.8)', whiteSpace: 'nowrap', opacity: 0 }, root, '✦&nbsp;&nbsp;BLIND BY DESIGN')
  const stmtStyle = { left: (COLX - 6) + 'px', fontFamily: SERIF, fontStyle: 'italic', fontSize: '132px', lineHeight: '1', letterSpacing: '-0.01em', color: C.bone, textShadow: '0 2px 30px rgba(11,6,32,0.85), -0.6px 0 0 rgba(232,98,138,0.3), 0.6px 0 0 rgba(140,170,255,0.25)' }
  const chart = new TypeLine(root, 'Chart first.', { ...stmtStyle, top: '290px' }, { perChar: 0.035, fade: 0.32, accent: [C.rub, C.gold, C.violet] })
  const face = new TypeLine(root, 'Face last.', { ...stmtStyle, top: '448px' }, { perChar: 0.04, fade: 0.34, accent: [C.violet, C.plum, C.rub] })
  // the big three, read out
  const ICON = {
    sun: '<svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="14" fill="none" stroke="#f2c75c" stroke-width="2.4"/><circle cx="20" cy="20" r="3.6" fill="#f2c75c"/></svg>',
    moon: '<svg width="40" height="40" viewBox="0 0 40 40"><path d="M25 6a14 14 0 1 0 9 22A12 12 0 0 1 25 6z" fill="none" stroke="#c9a6ff" stroke-width="2.4" stroke-linejoin="round"/></svg>',
    rising: '<svg width="40" height="40" viewBox="0 0 40 40"><path d="M6 30h28" stroke="#ff8fb1" stroke-width="2.4" stroke-linecap="round"/><path d="M20 25V9M13 16l7-7 7 7" fill="none" stroke="#ff8fb1" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  }
  const ROWS = [['sun', 'SUN', 'Libra', B.sun], ['moon', 'MOON', 'Gemini', B.moon], ['rising', 'RISING', 'Aquarius', B.rising]]
  const rows = ROWS.map(([k, lab, val, at], i) => {
    const r = el('div', { position: 'absolute', left: COLX + 'px', top: (480 + i * 82) + 'px', height: '64px', display: 'flex', alignItems: 'center', gap: '22px', whiteSpace: 'nowrap', opacity: 0 }, root)
    el('div', { width: '40px', height: '40px' }, r, ICON[k])
    el('div', { fontFamily: MONO, fontSize: '26px', letterSpacing: '0.2em', color: 'rgba(179,166,196,0.95)', width: '150px' }, r, lab)
    el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: '60px', color: C.bone, textShadow: '0 2px 18px rgba(11,6,32,0.8)' }, r, val)
    return { r, at }
  })

  // grain on top of everything in the scene
  const grainC = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', mixBlendMode: 'overlay', opacity: 0.62, pointerEvents: 'none' }, root)
  grainC.width = W; grainC.height = H
  const gx = grainC.getContext('2d')

  /** PNG-px point → screen px (ignores the small yaw) */
  let cam = camAt(6.5)
  const toScreen = (px, py) => [cam[0] + (px - PNG.cx) * S0 * cam[2], cam[1] + (py - PNG.cy) * S0 * cam[2]]

  return {
    start: F3.start, end: F3.end, root, fadeIn: 0.16,
    update(t) {
      cam = camAt(t)
      const [cx, cy, s, yaw] = cam
      // sky: counter-pan a little against the card move (parallax)
      drawSky(bx, t, { pan: [(cx - 960) * -0.04, (cy - 470) * -0.03] })
      const pitch = Math.sin(t * 0.9) * 1.2 + (cy - 470) * -0.004
      const bob = Math.sin(t * 1.3) * 3
      card.style.transform = `translate(${cx}px, ${cy + bob}px) perspective(2600px) rotateY(${yaw}deg) rotateX(${pitch}deg) scale(${s * S0}) translate(${-PNG.cx}px, ${-PNG.cy}px)`

      // veil breath: always alive, deeper while the camera holds on the window
      const deep = 0.55 + 0.45 * ease.inOutQuad(prog(t, 8.9, 9.6)) * (1 - ease.inOutQuad(prog(t, 10.0, 10.42)))
      const outro = 1 - prog(t, 10.1, 10.42)
      const breath = 0.5 + 0.5 * Math.sin((t - 6.5) * 2.4 - 1.2)
      blobs.forEach((b, i) => {
        const a = t * (0.5 + i * 0.13) + b.ph
        const x = 537 + Math.cos(a) * 300 - b.s / 2, y = 290 + Math.sin(a * 1.3) * 150 - b.s / 2
        b.e.style.transform = `translate(${x}px, ${y}px) scale(${0.9 + 0.25 * breath})`
        b.e.style.opacity = String((0.25 + 0.4 * breath) * deep * outro)
      })
      arch.style.transform = `scale(${0.94 + 0.1 * breath}, ${0.92 + 0.12 * breath})`
      arch.style.opacity = String((0.35 + 0.65 * breath) * deep * outro)
      const np = prog(t, B.noPhoto, B.noPhoto + 0.7)
      noPh.style.opacity = String(np > 0 && np < 1 ? 1 : 0)
      noPhBand.style.transform = `translateX(${lerp(-280, 780, ease.inOutQuad(np))}px)`

      // badges pop: flash ring, settle to a soft glow, release before the pull-back
      BADGES.forEach(b => {
        const p = prog(t, b.at, b.at + 0.5)
        const pop = 1 + 0.16 * (1 - ease.outCubic(p)) * (p > 0 ? 1 : 0)
        const flash = p > 0 ? lerp(1, 0.45, ease.outQuad(p)) : 0
        const off = 1 - prog(t, 9.7, 10.2)
        b.ring.style.opacity = String(flash * ease.outQuad(prog(t, b.at, b.at + 0.08)) * off)
        b.ring.style.transform = `scale(${pop})`
      })
      // bio
      const bp = prog(t, B.bio, B.bio + 0.62)
      bio.style.opacity = String(bp > 0 && bp < 1 ? 1 : 0)
      bioBand.style.transform = `translateX(${lerp(-440, 1000, ease.inOutQuad(bp))}px)`
      const bar = ease.outCubic(prog(t, B.bio, B.bio + 0.35)) * (1 - prog(t, 9.6, 10.1))
      bioBar.style.transform = `scaleY(${bar})`; bioBar.style.opacity = String(bar)
      // dealbreakers
      const lp = prog(t, B.dbLabel, B.dbLabel + 0.6)
      dbLabelGlow.style.opacity = String(lp > 0 ? Math.sin(Math.PI * lp) : 0)
      dbCover.style.opacity = String(ease.inOutQuad(prog(t, 6.75, 7.2)))   // the printed dealbreakers dissolve during the push, then re-type
      dbType.root.style.display = t >= B.dbType - 0.04 ? 'block' : 'none'
      dbType.update(t - B.dbType)
      // caret rides the last typed character
      const n = DB_TEXT.length, ci = Math.floor((t - B.dbType) / DB_PER)
      if (t >= B.dbType && ci <= n + 6 && t < B.dbType + n * DB_PER + 0.35) {
        const span = dbType.chars[Math.min(n - 1, Math.max(0, ci))]
        caret.style.opacity = (Math.round(t * 30) % 4 < 3) ? '1' : '0.2'
        caret.style.left = (189 + span.offsetLeft + span.offsetWidth + 4) + 'px'
        caret.style.top = (1808 + span.offsetTop + 6) + 'px'
      } else caret.style.opacity = '0'

      // copy
      const out = 1 - ease.inQuad(prog(t, B.textOut, B.textOut + 0.3))
      pocket.style.opacity = String(ease.outQuad(prog(t, 7.0, 7.5)) * out)
      eyebrow.style.opacity = String(ease.outQuad(prog(t, B.eyebrow, B.eyebrow + 0.25)) * out)
      eyebrow.style.transform = `translateY(${(1 - ease.outCubic(prog(t, B.eyebrow, B.eyebrow + 0.4))) * 10}px)`
      chart.update(t - B.chart)
      chart.root.style.opacity = String(out)
      face.update(t - B.face)
      face.root.style.opacity = String(out)
      const drift = ease.outCubic(prog(t, B.textOut, B.textOut + 0.35)) * -14
      chart.root.style.transform = face.root.style.transform = `translateY(${drift}px)`
      rows.forEach(({ r, at }, i) => {
        const a = ease.outCubic(prog(t, at, at + 0.35))
        const o = 1 - ease.inQuad(prog(t, B.rowsOut + i * 0.04, B.rowsOut + 0.22 + i * 0.04))
        r.style.opacity = String(a * o)
        r.style.transform = `translate(${(1 - a) * 26 + (1 - o) * 0}px, ${(1 - o) * 16}px)`
      })

      drawGrain(gx, t)
    },
    // pixel-star pops at each badge + on the typed dealbreakers (fx canvas, above the scene)
    fx(ctx, t) {
      ctx.save(); ctx.imageSmoothingEnabled = false
      const pops = [[B.rising, -1170, -(480 + 164 + 32)], [B.sun, 365, 988], [B.air, 623, 988], [B.moon, 981, 988], [B.bio, 240, 1074], [B.dbLabel, 486, 1771]]
      pops.forEach(([at, px, py], j) => {
        const p = prog(t, at, at + 0.55)
        if (p <= 0 || p >= 1) return
        const [sx, sy] = px < 0 ? [-px, -py] : toScreen(px, py)
        const r = rng(j * 31 + 7)
        for (let i = 0; i < 7; i++) {
          const a = r() * Math.PI * 2, d = (20 + r() * 70) * ease.outCubic(p) * cam[2] * 0.8
          const col = PIXEL_PALETTE[Math.floor(r() * PIXEL_PALETTE.length)]
          const blink = (Math.round(t * 30) + i) & 1
          ctx.globalAlpha = 1 - ease.inQuad(p)
          drawPixelStar(ctx, sx + Math.cos(a) * d, sy + Math.sin(a) * d, 14 + r() * 10, blink ? (i % 2 ? 2 : 3) : 1, col)
        }
      })
      ctx.restore()
    },
    fxStart: 7.4, fxEnd: 9.0,
  }
}

const DB_TICKS = []
for (let i = 0; i < DB_TEXT.length; i += 3) if (DB_TEXT[i] !== ' ' && DB_TEXT[i] !== '\n') DB_TICKS.push(['tick', +(B.dbType + i * DB_PER).toFixed(3), 0.035])
export const cues = [
  ['whoosh', 6.68, 0.8, 0.08],                         // the push-in
  ['tick', B.chart, 0.05],
  ...[...'Chart first.'].map((c, i) => c === ' ' ? null : ['tick', +(B.chart + i * 0.035).toFixed(3), 0.03]).filter(Boolean),
  ['bell', B.sun, 880, 0.05, 1.2, -0.25],              // Libra (sun)
  ['bell', B.air, 1108.73, 0.035, 1.0, 0],             // air
  ['bell', B.moon, 1318.51, 0.045, 1.2, 0.2],          // Gemini moon
  ['bell', B.rising, 1479.98, 0.04, 1.4, 0.35],        // Aquarius rising
  ['glitter', B.sun, B.rising + 0.3],
  ['whoosh', B.bio, 0.5, 0.04],                        // bio light sweep
  ['bell', B.dbLabel, 739.99, 0.03, 0.8, -0.3],
  ...DB_TICKS,
  ['whoosh', 8.95, 0.7, 0.07],                         // tilt up to the veil
  ['bell', B.face, 587.33, 0.05, 2.2, 0],              // "Face last."
  ['bell', B.face + 0.08, 880, 0.03, 2.0, 0.15],
  ['glitter', B.noPhoto, B.noPhoto + 0.6],
  ['whoosh', 10.05, 0.55, 0.08],                       // pull back into the deck
]
