// stfog props: small pixel drawings on canvas (Star Talk season 3, #6 "Neptune is literally fog."). Every prop is a pure
// draw call at a pixel size `px` (one art pixel = px screen px), crisp rectangles only, so they sit next to the pixel stars.
//   drawCouch(ctx, cx, seatY, p, { part })        the friends' velvet couch. part 'back' (backrest, under the stars) or
//                                                 'front' (seat lip, skirt, arms, legs, a heart pillow: over the stars)
//   drawFlag(ctx, x, y, px, t, o)                 a waving pixel red flag on a pole (x, y = pole foot). o: { pole, fw, fh,
//                                                 k (unfurl 0…1), dir (±1), wave, seed, frantic }
//   drawHeartGlasses(ctx, eyes, k)                rose-tinted heart glasses over a star's eyes (eyes from starEyes())
//   starEyes(x, y, size, t, o)                    where drawStarChar puts the two eyes this frame (mirrors startalk.js)
//   drawNeptune(ctx, x, y, size, t, o)            Neptune: a blue pixel planet with sleepy dreamy eyes and a ♆ coin
//   createFog(w, h, cell)                         pixel fog: .draw(ctx, t, { x0, y0, density, front, top, ... })
//   drawBoat / drawKite / drawCake                where the red flags hide in the fog
//   drawPolaroid(ctx, x, y, px, t, o)             "him": a polaroid (beanie, headphones), heart sticker
//   drawPhone(ctx, x, y, px, glow)                a tiny phone with a lit screen
//   drawTear / drawSweat / drawPixelHeart / drawCobweb / drawJunTag / drawAsteroid / drawTrident
import { clamp } from '../../../src/lib.js'

const OUT = '#1a1030'
export const RED = '#ff3b4f'

/** bitmap helper: rows of chars, pal maps char → colour; (x, y) = top-left */
export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } } })
}
const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)) }

// ─────────────────────────────── star geometry (mirrors startalk.js so props can sit on a star's eyes)
const G = 36, HALF = 18, FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
export function hopState(t, hops) {
  if (!hops || !hops.length) return { lift: 0, sq: 0 }
  let h = -1e9
  for (const v of hops) if (v <= t && v > h) h = v
  const dt = t - h
  if (dt > 0.6) return { lift: 0, sq: 0 }
  const AIR = 0.26
  if (dt < 0.05) return { lift: 0, sq: 0.12 * Math.sin(Math.PI * dt / 0.05) }
  if (dt < 0.05 + AIR) { const p = (dt - 0.05) / AIR; return { lift: Math.sin(Math.PI * p), sq: -0.1 * Math.sin(Math.PI * Math.min(1, p * 1.6)) } }
  const d = dt - 0.05 - AIR
  return { lift: 0, sq: 0.16 * Math.exp(-d * 11) * Math.cos(d * 26) }
}
/** the two eye centres drawStarChar paints this frame (same opts as the star) → { L: [x, y], R: [x, y], cell, sx, sy } */
export function starEyes(x, y, size, t, { squash = 0, hops = null, seed = 1, bob, pop = 1 } = {}) {
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const bobA = bob === undefined ? size * 0.035 : bob
  const hs = hopState(t, hops)
  const sq = squash + hs.sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const sx = 1 + sq, sy = 1 - sq * 0.9
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09
  const base = (FOOT_ROW - HALF) * cell
  const at = (ci, cj) => [Math.round(x) + sx * (ci - HALF) * cell, Math.round(cy + base) + sy * ((cj - HALF) * cell - base)]
  return { L: at(13, 19), R: at(23, 19), cell, sx, sy, cy }
}

// ─────────────────────────────── the couch
const VEL = '#7b4fc0', VEL_HI = '#a07ce0', VEL_LO = '#57339a', VEL_DK = '#3b2172', GOLDL = '#e8b64a'
/** the couch, centred on cx; seatY = the seat cushions' top. p = one art pixel. 104 cells wide. */
export function drawCouch(ctx, cx, seatY, p, { part = 'back', alpha = 1 } = {}) {
  ctx.save(); ctx.globalAlpha *= alpha
  const W0 = 104, L0 = cx - (W0 / 2) * p
  const X = c => L0 + c * p
  if (part === 'back') {
    // backrest: three tufted cushions, a rolled top
    const top = seatY - 25 * p
    R(ctx, X(7), top - p, (W0 - 14) * p, 26 * p, OUT)
    R(ctx, X(8), top, (W0 - 16) * p, 25 * p, VEL_LO)
    for (let k = 0; k < 3; k++) {
      const c0 = 9 + k * 29, cw = 28
      R(ctx, X(c0), top + p, cw * p, 23 * p, VEL)
      R(ctx, X(c0), top + p, cw * p, 2 * p, VEL_HI)
      R(ctx, X(c0), top + 3 * p, p, 20 * p, VEL_HI)
      R(ctx, X(c0 + cw - 1), top + 3 * p, p, 20 * p, VEL_LO)
      // tufting buttons
      for (const [bi, bj] of [[7, 8], [14, 6], [21, 8], [10, 15], [18, 15]]) { R(ctx, X(c0 + bi), top + bj * p, p, p, VEL_DK); R(ctx, X(c0 + bi), top + (bj - 1) * p, p, p, VEL_HI) }
    }
  } else {
    // seat lip (three cushions), skirt, legs
    R(ctx, X(7), seatY - p, (W0 - 14) * p, 10 * p, OUT)
    for (let k = 0; k < 3; k++) {
      const c0 = 8 + k * 29.4, cw = 29
      R(ctx, X(c0), seatY, cw * p, 5 * p, VEL)
      R(ctx, X(c0), seatY, cw * p, p, VEL_HI)
      R(ctx, X(c0 + cw - 1), seatY, p, 5 * p, VEL_LO)
    }
    R(ctx, X(8), seatY + 5 * p, (W0 - 16) * p, 4 * p, VEL_LO)
    R(ctx, X(8), seatY + 8 * p, (W0 - 16) * p, p, VEL_DK)
    // gold legs
    for (const c of [10, W0 - 13]) { R(ctx, X(c) - p, seatY + 9 * p, 5 * p, 4 * p, OUT); R(ctx, X(c), seatY + 9 * p, 3 * p, 3 * p, GOLDL) }
    // arms (rolled, both ends)
    for (const side of [0, 1]) {
      const c0 = side ? W0 - 12 : 0
      R(ctx, X(c0) - p, seatY - 15 * p, 13 * p, 25 * p, OUT)
      R(ctx, X(c0), seatY - 14 * p, 11 * p, 23 * p, VEL)
      R(ctx, X(c0), seatY - 14 * p, 11 * p, 3 * p, VEL_HI)
      R(ctx, X(c0 + 1), seatY - 15 * p, 9 * p, p, VEL_HI)
      R(ctx, X(c0), seatY + 5 * p, 11 * p, 4 * p, VEL_LO)
      R(ctx, X(side ? c0 : c0 + 10), seatY - 11 * p, p, 16 * p, side ? VEL_HI : VEL_LO)
    }
    // a little heart throw pillow on the left arm's side
    bitmap(ctx, ['.XX.XX.', 'XPPXPPX', 'XPWPPPX', 'XPPPPPX', '.XPPPX.', '..XPX..', '...X...'], { X: OUT, P: '#ff7aa8', W: '#ffd0e0' }, X(10), seatY - 7 * p, p)
  }
  ctx.restore()
}

// ─────────────────────────────── flags
/** a waving red flag. (x, y) = the pole's foot. pole = pole height (cells); fw × fh = cloth (cells); k = unfurl 0…1 */
export function drawFlag(ctx, x, y, px, t, { pole = 24, fw = 12, fh = 8, k = 1, dir = 1, wave = 1, seed = 0, frantic = 0, color = RED, alpha = 1, cobweb = 0, freq = 0.55 } = {}) {
  if (k <= 0 || alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const top = y - pole * px
  // pole + finial
  R(ctx, x - px, top - px, 3 * px, pole * px + px, OUT)
  R(ctx, x, top, px, pole * px, '#d9d2ee'); R(ctx, x - px * 0.0, top, px * 0.45, pole * px, '#ffffff')
  bitmap(ctx, ['.XX.', 'XGGX', 'XGWX', '.XX.'], { X: OUT, G: '#f2c75c', W: '#fff6c0' }, x - 1.5 * px, top - 4 * px, px)
  // cloth
  const cols = Math.max(1, Math.round(fw * clamp(k)))
  const sp = 7 + frantic * 11, amp = (1.1 + frantic * 1.4) * wave
  for (let i = 0; i < cols; i++) {
    const u = (i + 1) / fw
    const ph = t * sp - i * freq + seed
    const off = Math.round(Math.sin(ph) * amp * u * (0.6 + 0.4 * u))
    const d = Math.cos(ph)
    const col = d > 0.45 ? '#ff7383' : d < -0.45 ? '#c41f38' : color
    const cx = dir > 0 ? x + (i + 1) * px : x - (i + 1) * px
    const cy = top + off * px
    R(ctx, cx, cy - px, px, px, OUT)
    R(ctx, cx, cy, px, fh * px, col)
    R(ctx, cx, cy + fh * px, px, px, OUT)
  }
  // the free edge
  const off = Math.round(Math.sin(t * sp - (cols - 1) * freq + seed) * amp * (cols / fw) * (0.6 + 0.4 * cols / fw))
  const ex = dir > 0 ? x + (cols + 1) * px : x - (cols + 1) * px
  R(ctx, ex, top + off * px, px, fh * px, OUT)
  // a cobweb in the pole's corner (it has been there a while)
  if (cobweb > 0) {
    ctx.globalAlpha *= clamp(cobweb)
    const W = 'rgba(235,230,255,0.85)', cxx = x + (dir > 0 ? 1 : -1) * px, cyy = top + (fh + 1) * px
    for (let i = 0; i < 6; i++) { R(ctx, cxx + (dir > 0 ? i : -i - 1) * px * 0.9, cyy + i * px * 0.9, px * 0.5, px * 0.5, W) }
    for (let i = 0; i < 5; i++) { R(ctx, cxx + (dir > 0 ? 0 : -px * 0.5), cyy + i * px * 1.1, px * 0.5, px * 0.5, W); R(ctx, cxx + (dir > 0 ? i * px * 1.1 : -i * px * 1.1 - px * 0.5), cyy, px * 0.5, px * 0.5, W) }
    for (let i = 0; i < 4; i++) R(ctx, cxx + (dir > 0 ? 2 + i * 0.8 : -2 - i * 0.8 - 0.5) * px, cyy + (3.6 - i * 0.6) * px, px * 0.5, px * 0.5, W)
  }
  ctx.restore()
}
/** where the pole top is (for hanging tags) */
export const flagTop = (x, y, px, pole) => [x, y - pole * px]

// ─────────────────────────────── rose-tinted heart glasses
const LENS = ['.XXX.XXX.', 'XPPPXPPPX', 'XWWPPPPPX', 'XWPPPPPPX', 'XPPPPPPPX', '.XPPPPPX.', '..XPPPX..', '...XPX...', '....X....']
/** heart glasses centred on a star's eyes; k = pop 0…1 (scales in from the eye centres). */
export function drawHeartGlasses(ctx, eyes, k = 1, { alpha = 1 } = {}) {
  if (k <= 0 || alpha <= 0) return
  const c = eyes.cell * k
  ctx.save(); ctx.globalAlpha *= alpha
  const lens = (ex, ey) => {
    const x0 = ex - 4.5 * c, y0 = ey - 4.6 * c
    // frame
    bitmap(ctx, LENS, { X: '#9c1f5c' }, x0, y0, c)
    ctx.globalAlpha *= 0.9
    bitmap(ctx, LENS, { P: '#ff8ccb', W: '#ffe2f2' }, x0, y0, c)
    ctx.globalAlpha /= 0.9
    // a tiny heart reflection
    R(ctx, x0 + 5 * c, y0 + 3 * c, c, c, '#ffd0ea')
  }
  lens(...eyes.L); lens(...eyes.R)
  // bridge + arms
  const [lx, ly] = eyes.L, [rx, ry] = eyes.R, by = (ly + ry) / 2 - 3.6 * c
  R(ctx, lx + 4 * c, by, rx - lx - 8 * c, c, '#9c1f5c')
  R(ctx, lx - 6.5 * c, ly - 3.6 * c, 2.2 * c, c, '#9c1f5c'); R(ctx, rx + 4.3 * c, ry - 3.6 * c, 2.2 * c, c, '#9c1f5c')
  ctx.restore()
}

// ─────────────────────────────── Neptune
const NEP = { deep: '#1d3696', mid: '#2e5bd2', light: '#5d8cf2', hi: '#b4d0ff', band: '#2549b4', band2: '#4a79e6', spot: '#142a72', line: '#0b0a2e' }
let NEP_BUF = null
function nepBuffer() {
  if (NEP_BUF) return NEP_BUF
  const n = 32, c = typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(n, n) : Object.assign(document.createElement('canvas'), { width: n, height: n })
  const x = c.getContext('2d'), r0 = 14.2, cc = 16
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const dx = i + 0.5 - cc, dy = j + 0.5 - cc, d = Math.hypot(dx, dy)
    if (d > r0 + 1) continue
    if (d > r0) { x.fillStyle = NEP.line; x.fillRect(i, j, 1, 1); continue }
    const nz = Math.sqrt(Math.max(0, 1 - (d / r0) ** 2)), lit = (-dx * 0.55 - dy * 0.62) / r0 + nz * 0.6
    let col = lit > 0.85 ? NEP.light : lit > 0.35 ? NEP.mid : lit > -0.1 ? NEP.band : NEP.deep
    // soft bands
    const by = dy / r0
    if (Math.abs(by + 0.36) < 0.05 || Math.abs(by - 0.42) < 0.045) col = lit > 0.35 ? NEP.band2 : NEP.band
    if (Math.abs(by - 0.1) < 0.035 && lit > 0) col = NEP.band2
    // the dark spot
    if (((dx + 4.5) / 3.4) ** 2 + ((dy - 6.2) / 1.7) ** 2 < 1) col = NEP.spot
    if (d > r0 - 1.2 && lit < 0.2) col = NEP.deep
    x.fillStyle = col; x.fillRect(i, j, 1, 1)
  }
  // gloss
  x.fillStyle = NEP.hi; for (const [i, j] of [[9, 7], [10, 6], [11, 6], [8, 8], [8, 9]]) x.fillRect(i, j, 1, 1)
  NEP_BUF = c; return c
}
/** Neptune (x, y = centre). mood: 'dreamy' (half-lidded, blissed) · 'wide' · 'sheepish' (eyes aside + sweat). puff 0…1 squash */
export function drawNeptune(ctx, x, y, size, t, { mood = 'dreamy', look = 0, puff = 0, alpha = 1, glow = 1 } = {}) {
  if (alpha <= 0 || size <= 0) return
  const c = size / 32
  ctx.save(); ctx.globalAlpha *= alpha
  // glow
  const g = ctx.createRadialGradient(x, y, size * 0.2, x, y, size * 0.95)
  g.addColorStop(0, `rgba(90,140,255,${0.35 * glow})`); g.addColorStop(1, 'rgba(90,140,255,0)')
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, size * 0.95, 0, Math.PI * 2); ctx.fill()
  const sx = 1 + 0.08 * puff, sy = 1 - 0.07 * puff
  ctx.translate(Math.round(x), Math.round(y)); ctx.scale(sx, sy)
  const sm = ctx.imageSmoothingEnabled; ctx.imageSmoothingEnabled = false
  ctx.drawImage(nepBuffer(), -size / 2, -size / 2, size, size)
  ctx.imageSmoothingEnabled = sm
  // eyes
  const E = (i, j, w, h, col) => R(ctx, (i - 16) * c, (j - 16) * c, w * c, h * c, col)
  const ink = '#0b0a2e', lx = Math.round(look)
  if (mood === 'wide') {
    for (const ex of [10, 19]) { E(ex, 13, 4, 5, '#fffaf0'); E(ex - 0.5, 12.5, 5, 0.6, ink); E(ex + 1 + lx * 0.8, 14.5, 2, 2, ink) }
  } else if (mood === 'sheepish') {
    for (const ex of [10, 19]) { E(ex, 14, 4, 1, ink); E(ex + (lx >= 0 ? 2 : 0), 15, 2, 1.5, ink) }
    // sweat
    E(25, 9, 1.5, 2, '#bfe9ff'); E(25.5, 11, 1, 1, '#ffffff')
  } else {
    // dreamy: heavy lids, a glint, little lashes
    for (const ex of [10, 19]) { E(ex, 15, 4, 1, ink); E(ex + 0.5, 16, 3, 1, ink); E(ex - 0.6, 14.2, 1, 1, ink); E(ex + 3.6, 14.2, 1, 1, ink); E(ex + 1, 15.4, 1, 0.6, '#9fc0ff') }
  }
  // cheeks
  ctx.globalAlpha *= 0.7
  E(8, 18.5, 3, 1.4, '#ff86c4'); E(21, 18.5, 3, 1.4, '#ff86c4')
  ctx.restore()
  // the ♆ coin (lower right), drawn in pixels so it never needs a font
  ctx.save(); ctx.globalAlpha *= alpha
  const bx = x + size * 0.36, by = y + size * 0.33, br = size * 0.13
  ctx.fillStyle = NEP.line; ctx.beginPath(); ctx.arc(bx, by, br + c * 0.9, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#140c2c'; ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2); ctx.fill()
  drawTrident(ctx, bx, by, Math.max(2, br / 4.2), NEP.hi)
  ctx.restore()
}
/** a pixel ♆ (Neptune's trident) centred on (x, y) */
export function drawTrident(ctx, x, y, px, col) {
  bitmap(ctx, ['X.X.X', 'X.X.X', 'XXXXX', '..X..', '.XXX.', '..X..', '..X..'], { X: col }, x - 2.5 * px, y - 3.5 * px, px)
}

// ─────────────────────────────── pixel fog (a low-res noise field, nearest-neighbour upscaled)
const hash2 = (i, j, s) => { let h = (Math.imul(i, 374761393) + Math.imul(j, 668265263) + Math.imul(s, 1442695041)) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296 }
const sm3 = v => v * v * (3 - 2 * v)
function vnoise(x, y, s) {
  const i = Math.floor(x), j = Math.floor(y), fx = sm3(x - i), fy = sm3(y - j)
  const a = hash2(i, j, s), b = hash2(i + 1, j, s), c = hash2(i, j + 1, s), d = hash2(i + 1, j + 1, s)
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy
}
/** w × h px of world, `cell` px per fog pixel. draw(ctx, t, o): o = { x0, y0, density, front (world x: fog only left of it),
 *  frontSoft, top (world y of the bank's upper edge; above it the fog thins out over topSoft), topSoft, scale, vx, vy,
 *  color [r,g,b], seed, holes: [[x, y, r]] clear spots } */
export function createFog(w, h, cell) {
  const nw = Math.ceil(w / cell), nh = Math.ceil(h / cell)
  let cv = null, cx = null, img = null
  return {
    draw(ctx, t, { x0 = 0, y0 = 0, density = 1, front = 1e9, frontSoft = 260, back = -1e9, top = -1e9, topSoft = 200, bottom = 1e9, scale = 0.06, vx = 0.5, vy = 0.08, color = [196, 190, 238], seed = 1, alphaMax = 0.86, holes = [] } = {}) {
      if (density <= 0.001) return
      if (!cv) {
        cv = typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(nw, nh) : Object.assign(document.createElement('canvas'), { width: nw, height: nh })
        cx = cv.getContext('2d'); img = cx.createImageData(nw, nh)
      }
      const d = img.data, [cr, cg, cb] = color
      for (let j = 0; j < nh; j++) {
        const wy = y0 + (j + 0.5) * cell
        const vT = clamp((wy - top) / topSoft) * clamp((bottom - wy) / 120)
        for (let i = 0; i < nw; i++) {
          const k = (j * nw + i) * 4
          const wx = x0 + (i + 0.5) * cell
          let m = vT * clamp((front - wx) / frontSoft) * clamp((wx - back) / frontSoft)
          if (m > 0) for (const [hx, hy, hr] of holes) { const q = Math.hypot(wx - hx, wy - hy) / hr; if (q < 1.6) m *= clamp((q - 0.6) / 1.0) }
          if (m <= 0.002) { d[k + 3] = 0; continue }
          const u = wx * scale * 0.1, v = wy * scale * 0.1
          const n = 0.62 * vnoise(u - t * vx, v * 1.6 - t * vy, seed) + 0.38 * vnoise(u * 2.3 + t * vx * 0.6, v * 3.1, seed + 7)
          let a = (0.42 + 0.58 * clamp((n - 0.3) / 0.36)) * m * density
          a = Math.round(a * 4) / 4 * alphaMax            // a few hard levels: pixel-art fog
          d[k] = cr; d[k + 1] = cg; d[k + 2] = cb; d[k + 3] = Math.round(a * 255)
        }
      }
      cx.putImageData(img, 0, 0)
      const s0 = ctx.imageSmoothingEnabled; ctx.imageSmoothingEnabled = false
      ctx.drawImage(cv, x0, y0, nw * cell, nh * cell)
      ctx.imageSmoothingEnabled = s0
    },
  }
}

// ─────────────────────────────── where the flags hide
/** a little sailboat (x, y = waterline centre) with a red flag on the mast */
export function drawBoat(ctx, x, y, px, t, { rock = 0 } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t * 2.4) * 0.06 + rock)
  // hull
  bitmap(ctx, [
    'XXXXXXXXXXXXXXXXXX',
    'XHHHHHHHHHHHHHHHHX',
    '.XBBBBBBBBBBBBBBX.',
    '..XBBBWBBBWBBBBX..',
    '...XXXXXXXXXXXX...',
  ], { X: OUT, H: '#d08a50', B: '#a8693a', W: '#fbe7c8' }, -9 * px, -px, px)
  // mast + sail
  R(ctx, -px * 0.5, -17 * px, px, 16 * px, OUT)
  bitmap(ctx, [
    '.X.......',
    '.SX......',
    '.SSX.....',
    '.SSSX....',
    '.SSSSX...',
    '.SSSSSX..',
    '.SSSSSSX.',
    '.SSSSSSSX',
    '.XXXXXXXX',
  ], { X: OUT, S: '#f6efe2' }, px * 0.5, -12 * px, px)
  ctx.restore()
  // the flag at the masthead (drawn upright)
  drawFlag(ctx, x + Math.sin(t * 2.4) * 0.06 * 17 * px, y - 15 * px, px, t, { pole: 5, fw: 7, fh: 5, dir: -1, seed: 1.3 })
}
/** a diamond kite on a string, a red flag streaming from its tail. (x, y) = kite centre */
export function drawKite(ctx, x, y, px, t, { stringTo = null } = {}) {
  if (stringTo) {
    ctx.save(); ctx.strokeStyle = 'rgba(239,230,214,0.7)'; ctx.lineWidth = Math.max(2, px * 0.5)
    ctx.beginPath(); ctx.moveTo(x, y + 6 * px); ctx.quadraticCurveTo(x + (stringTo[0] - x) * 0.3, stringTo[1] - 60, stringTo[0], stringTo[1]); ctx.stroke(); ctx.restore()
  }
  ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t * 1.9) * 0.12)
  bitmap(ctx, [
    '....X....',
    '...XYX...',
    '..XYYPX..',
    '.XYYYPPX.',
    'XXXXXXXXX',
    '.XPPPYYX.',
    '..XPPYX..',
    '...XPX...',
    '....X....',
  ], { X: OUT, Y: '#ffd23f', P: '#7c74f0' }, -4.5 * px, -4.5 * px, px)
  ctx.restore()
  // the tail: a red flag hanging off the bottom point
  drawFlag(ctx, x + Math.sin(t * 1.9) * 0.12 * 4 * px, y + 4.5 * px + 9 * px, px, t, { pole: 9, fw: 8, fh: 5, dir: 1, seed: 2.1, wave: 1.4 })
}
/** a pink two-tier cake with a red flag topper. (x, y) = bottom centre */
export function drawCake(ctx, x, y, px, t) {
  bitmap(ctx, [
    '....XXXXXXXXXX....',
    '...XIIIIIIIIIIX...',
    '...XIDIIDIIIDIX...',
    '...XPPPPPPPPPPX...',
    '...XPPPPPPPPPPX...',
    '.XXXXXXXXXXXXXXXX.',
    'XIIIIIIIIIIIIIIIIX',
    'XIIDIIIDIIDIIIDIIX',
    'XPPPPPPPPPPPPPPPPX',
    'XPPPWPPPPPWPPPPPPX',
    'XPPPPPPPPPPPPPPPPX',
    'XQQQQQQQQQQQQQQQQX',
    'XXXXXXXXXXXXXXXXXX',
  ], { X: OUT, I: '#fff3f8', D: '#ffd0e4', P: '#ff8fb8', W: '#ffd0e0', Q: '#e0628f' }, x - 9 * px, y - 13 * px, px)
  // plate
  R(ctx, x - 11 * px, y, 22 * px, px, '#d9d2ee'); R(ctx, x - 10 * px, y + px, 20 * px, px, '#8d84ab')
  drawFlag(ctx, x + px, y - 13 * px, px, t, { pole: 8, fw: 7, fh: 5, dir: 1, seed: 0.4 })
}

// ─────────────────────────────── "him": a polaroid
export function drawPolaroid(ctx, x, y, px, t, { rot = -0.08, alpha = 1, glint = 0 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot)
  const w = 26, h = 31, ox = -w / 2 * px, oy = -h / 2 * px
  R(ctx, ox + px, oy + 2 * px, w * px, h * px, 'rgba(6,3,18,0.45)')
  R(ctx, ox - px, oy - px, (w + 2) * px, (h + 2) * px, OUT)
  R(ctx, ox, oy, w * px, h * px, '#fbf6ec')
  // the photo: a sunset gradient + the silhouette
  const ix = ox + 2 * px, iy = oy + 2 * px, iw = (w - 4) * px, ih = 22 * px
  const g = ctx.createLinearGradient(0, iy, 0, iy + ih); g.addColorStop(0, '#ff9ec4'); g.addColorStop(0.6, '#c27ad8'); g.addColorStop(1, '#6b4fb8')
  ctx.fillStyle = g; ctx.fillRect(Math.round(ix), Math.round(iy), Math.round(iw), Math.round(ih))
  const S = '#2a1846', S2 = '#3d2766'
  const cx = 0, by = iy + ih
  // shoulders
  for (let j = 0; j < 6; j++) R(ctx, cx - (6 + j) * px, by - (6 - j) * px, (12 + 2 * j) * px, px, S)
  // neck + head
  R(ctx, cx - 1.5 * px, by - 9 * px, 3 * px, 3 * px, S)
  for (let j = 0; j < 7; j++) { const hw = [3, 4, 4, 4, 4, 3, 2][j]; R(ctx, cx - hw * px, by - (16 - j) * px, 2 * hw * px, px, S) }
  // beanie
  R(ctx, cx - 4 * px, by - 18 * px, 8 * px, 3 * px, '#e8455e'); R(ctx, cx - 4.5 * px, by - 16 * px, 9 * px, px, '#b02a44'); R(ctx, cx - px, by - 19 * px, 2 * px, px, '#ffd0d8')
  // big DJ headphones over the beanie
  const HP = '#c9b6ff', HD = '#6a55b0'
  R(ctx, cx - 5 * px, by - 20 * px, 10 * px, px, HD); R(ctx, cx - 6 * px, by - 19 * px, px, 3 * px, HD); R(ctx, cx + 5 * px, by - 19 * px, px, 3 * px, HD)
  R(ctx, cx - 7 * px, by - 16 * px, 3 * px, 5 * px, HP); R(ctx, cx + 4 * px, by - 16 * px, 3 * px, 5 * px, HP)
  R(ctx, cx - 7 * px, by - 16 * px, px, 5 * px, HD); R(ctx, cx + 6 * px, by - 16 * px, px, 5 * px, HD)
  if (glint > 0) { ctx.globalAlpha *= clamp(glint); R(ctx, cx - 6 * px, by - 15 * px, px, 2 * px, '#ffffff'); R(ctx, cx + 5 * px, by - 15 * px, px, 2 * px, '#ffffff'); ctx.globalAlpha /= clamp(glint) || 1 }
  // caption scribble + a heart sticker
  R(ctx, ox + 5 * px, oy + 26 * px, 11 * px, px, '#7c74f0'); R(ctx, ox + 17 * px, oy + 26 * px, 4 * px, px, '#7c74f0')
  ctx.restore()
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot)
  drawPixelHeart(ctx, (w / 2 - 1) * px, (-h / 2 + 1) * px, px * 1.1, '#ff4f7e')
  ctx.restore()
}

// ─────────────────────────────── small things
export function drawPhone(ctx, x, y, px, glow = 1, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  if (glow > 0) {
    const g = ctx.createRadialGradient(0, -px * 6, 0, 0, -px * 6, px * 18)
    g.addColorStop(0, `rgba(170,220,255,${0.28 * glow})`); g.addColorStop(1, 'rgba(170,220,255,0)')
    ctx.fillStyle = g; ctx.fillRect(-px * 18, -px * 24, px * 36, px * 36)
  }
  R(ctx, -3.5 * px, -6 * px, 7 * px, 12 * px, OUT)
  R(ctx, -2.5 * px, -5 * px, 5 * px, 10 * px, glow > 0 ? '#bfe6ff' : '#3a3060')
  if (glow > 0) { R(ctx, -1.5 * px, -3.5 * px, 3 * px, px, '#6aa8e0'); R(ctx, -1.5 * px, -1.5 * px, 2 * px, px, '#6aa8e0'); R(ctx, -1.5 * px, 0.5 * px, 3 * px, px, '#6aa8e0') }
  ctx.restore()
}
export function drawPixelHeart(ctx, x, y, px, col = '#ff4f7e') {
  bitmap(ctx, ['.XX.XX.', 'XWXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'], { X: col, W: '#ffd0dc' }, x - 3.5 * px, y - 3 * px, px)
}
export function drawTear(ctx, x, y, px) {
  bitmap(ctx, ['.T.', 'TWT', 'TTT', '.T.'], { T: '#6fd3ff', W: '#e6f8ff' }, x - 1.5 * px, y - 2 * px, px)
}
export function drawSweat(ctx, x, y, px) {
  bitmap(ctx, ['.S.', '.S.', 'SWS', 'SSS', '.S.'], { S: '#9fdcff', W: '#ffffff' }, x - 1.5 * px, y - 2.5 * px, px)
}
/** a little rock to plant a flag on (x, y = top centre) */
export function drawAsteroid(ctx, x, y, px) {
  bitmap(ctx, [
    '...XXXXXXX...',
    '.XXRRRRRRRXX.',
    'XRRLRRRDRRRRX',
    'XRRRRRRRRRDRX',
    '.XRRDRRRRRRX.',
    '..XXXXXXXXX..',
  ], { X: OUT, R: '#6c5a8e', L: '#9a88bc', D: '#4a3c68' }, x - 6.5 * px, y - px, px)
}
/** a tear-off calendar page "JUN" hanging from a string at (x, y) */
export function drawJunTag(ctx, x, y, px, t, k = 1) {
  if (k <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t * 2.2) * 0.08); ctx.scale(k, k)
  R(ctx, -px * 0.25, 0, px * 0.5, 4 * px, 'rgba(239,230,214,0.8)')
  R(ctx, -7 * px, 4 * px, 14 * px, 12 * px, OUT)
  R(ctx, -6 * px, 5 * px, 12 * px, 10 * px, '#fbf6ec')
  R(ctx, -6 * px, 5 * px, 12 * px, 3 * px, RED)
  R(ctx, -4 * px, 4.5 * px, px, px, OUT); R(ctx, 3 * px, 4.5 * px, px, px, OUT)
  ctx.fillStyle = '#2a1846'; ctx.font = `700 ${Math.round(5.6 * px)}px 'Space Mono', ui-monospace, monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText('JUN', 0, 11.6 * px)
  ctx.restore()
}
