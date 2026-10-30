// srhtxbayou props — drawings for this film only. Pure f(args); nothing touches `document` at load.
//   starFrame / inSprite / tearsCells / sweatCells / drawBits   star-seated pixel helpers (same maths as startalk.js)
//   drawBayouScene(x, t, { a, dy, night, ... })   the original htxbayou's sunset bayou: sun, skyline, the river ribbon,
//                                    the trail and lollipop trees, in perspective (xOf / yOf / pathU place things on it)
//   qmark / ink / sparkle / tagChip  line-art helpers
import { clamp, lerp, prog, ease, rng, noise1 } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

const INK = '#1b1236'
const W = 1080
export const MONO = "'Space Mono', ui-monospace, monospace"
const G = 36, HALF = 18
const SC_Y = 19.6, SC_R = 17.6
const FOOT_ROW = SC_Y + SC_R * Math.cos(Math.PI / 5)
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const H = 1920
const BEAT = n => 0.6 + n * 0.5556
export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', SUN = '#ffb36b', VIOLET = '#c9a6ff', BLUE = '#8fd8f6'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
export const D2R = Math.PI / 180, TAU = Math.PI * 2
const h2r = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
export const rgba = (hex, a) => { const [r, g, b] = h2r(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
// ── star transform (mirrors startalk.js drawStarChar)
function hopState(t, hops) {
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
export function starFrame(x, y, size, t, { pop = 1, bob, squash = 0, hops = null, seed = 1 } = {}) {
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const S = cell * G
  const bobA = bob === undefined ? size * 0.035 : bob
  const hs = hopState(t, hops)
  const sq = squash + hs.sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09
  const base = (FOOT_ROW - HALF) * cell
  return { cell, S, cy, base, ox: Math.round(x), oy: Math.round(cy + base), sx: 1 + sq, sy: 1 - sq * 0.9 }
}
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
export const cellToWorld = (F, i, j) => [F.ox - F.S / 2 + i * F.cell, F.oy - F.S / 2 - F.base + j * F.cell]

function paintCells(ctx, cells, outline = INK) {
  const key = new Set(cells.map(([i, j]) => i + ',' + j))
  if (outline) {
    ctx.fillStyle = outline
    for (const [i, j] of cells) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!key.has((i + a) + ',' + (j + b))) ctx.fillRect(i + a, j + b, 1.02, 1.02)
  }
  for (const [i, j, c] of cells) { ctx.fillStyle = c; ctx.fillRect(i, j, 1.02, 1.02) }
}


// ── tears (cells): k 1 sniffle · 2 streams · 3 fountains
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
  const n = k >= 3 ? 9 : k >= 2 ? 5 : 2, rate = k >= 3 ? 1.9 : k >= 2 ? 1.2 : 0.7
  for (const d of [-1, 1]) {
    const ex = d < 0 ? 10.2 : 25.2
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + (d > 0 ? 0.13 : 0)) % 1 + 1) % 1
      if (k === 1 && ph > 0.75) continue
      let x, y
      if (k >= 3) { x = ex + d * 15 * ph; y = 20 - 9 * ph + 24 * ph * ph }
      else if (k === 2) { x = ex + d * 3.5 * ph; y = 20.5 + 15 * ph * ph }
      else { x = ex + d * 0.6 * ph; y = 21 + 8 * ph * ph }
      drop(Math.round(x * 2) / 2, Math.round(y * 2) / 2)
    }
    ctx.fillStyle = '#8fe3ff'; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
// sweat drop on the right temple (cells)
export function sweatCells(ctx, t) {
  const ph = (t * 1.3) % 1
  const j = 12 + ph * 6
  ctx.fillStyle = INK; ctx.fillRect(28.6, j - 1.2, 1.8, 2.6)
  ctx.fillStyle = '#8fe3ff'; ctx.fillRect(28.9, j - 0.9, 1.2, 2); ctx.fillStyle = '#fff'; ctx.fillRect(28.9, j - 0.9, 0.5, 0.5)
}

/** bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}

// stepped-corner pixel rectangle (P = pixel size), filled
function stepRect(x, X, Y, w, h, P, col) {
  x.fillStyle = col
  x.fillRect(X + 2 * P, Y, w - 4 * P, h)
  x.fillRect(X, Y + 2 * P, w, h - 4 * P)
  x.fillRect(X + P, Y + P, w - 2 * P, h - 2 * P)
}


/** fill the current path at fa, then stroke it thick with a glow */
export function ink(x, col, { w = 7, fa = 0.28, glow = 18, fill = col } = {}) {
  if (fa > 0) { x.fillStyle = rgba(fill, fa); x.fill() }
  x.lineJoin = 'round'; x.lineCap = 'round'
  x.shadowColor = col; x.shadowBlur = glow
  x.strokeStyle = col; x.lineWidth = w; x.stroke()
  x.shadowBlur = 0
}
const SPARK = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
export function sparkle(x, px, py, t, t0, { n = 10, R = 150, seed = 1, cols = SPARK, size = 28, dur = 0.75 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  const r = rng(seed)
  x.save()
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + r() * 0.5, d = R * (0.6 + 0.5 * r()), col = cols[Math.floor(r() * cols.length)], kind = Math.floor(r() * 3)
    const p = 1 - Math.pow(1 - Math.min(1, tt / (dur * 0.8)), 3)
    x.globalAlpha = Math.max(0, 1 - Math.max(0, tt - dur * 0.3) / (dur * 0.7))
    drawPixelStar(x, px + Math.cos(a) * d * p, py + Math.sin(a) * d * p, Math.max(4, Math.round(size * (1 - 0.35 * p) / 4) * 4), kind, col)
  }
  x.restore()
}

// ── the bayou: ground plane in perspective. Horizon at HZ; world depth z ≥ 1 (z = 1 is the bottom of the frame)
export const HZ = 1010, K = H - HZ, S = 760
export const yOf = z => HZ + K / z
export const xOf = (u, z) => 540 + (u * S) / z
export const riverU = z => 0.62 * Math.sin(1.05 * z + 0.2) + 0.25        // the bayou's centre line (world u)
export const RIVER_W = 0.36
export const pathU = z => riverU(z) - 0.98                                // the trail runs along the left bank
export const PATH_W = 0.27
const WALK_Z = 1.5, FAR_Z = 3.8
const walkerZ = t => WALK_Z + 0.07 * Math.min(t, 3.1) / 3.1
// lollipop trees on the banks (u offset from the river, z)
const TREES = [
  { side: 1, off: 0.8, z: 2.2, h: 1.0 }, { side: 1, off: 1.0, z: 3.4, h: 1.1 }, { side: -1, off: 1.55, z: 3.0, h: 0.95 },
  { side: 1, off: 0.75, z: 5.4, h: 1.2 }, { side: -1, off: 1.45, z: 6.5, h: 1.1 }, { side: 1, off: 1.6, z: 1.55, h: 1.05 },
  { side: -1, off: 1.7, z: 1.9, h: 1.0 }, { side: 1, off: 1.05, z: 8.5, h: 1.2 },
]
// a generic skyline on the horizon (no real tower outlines)
const TOWERS = (() => {
  const r = rng(31), out = []
  let px = 190
  while (px < 900) {
    const mid = 1 - Math.min(1, Math.abs(px - 560) / 380)
    const w = 30 + r() * 40, h = 36 + r() * 50 + mid * (50 + r() * 110)
    out.push({ x: px, w, h, top: ['flat', 'spire', 'slant', 'step', 'flat'][Math.floor(r() * 5)], seed: r() * 100 })
    px += w + 3 + r() * 12
  }
  return out
})()
function towerPath(x, b, h) {
  const l = b.x, r = b.x + b.w, y = -h, m = b.x + b.w / 2
  x.beginPath(); x.moveTo(l, 0)
  switch (b.top) {
    case 'spire': x.lineTo(l, y + 16); x.lineTo(m - 5, y + 6); x.lineTo(m, y - 34); x.lineTo(m + 5, y + 6); x.lineTo(r, y + 16); break
    case 'slant': x.lineTo(l, y + 26); x.lineTo(r, y); break
    case 'step': x.lineTo(l, y + 24); x.lineTo(l + b.w * 0.25, y + 24); x.lineTo(l + b.w * 0.25, y); x.lineTo(r - b.w * 0.25, y); x.lineTo(r - b.w * 0.25, y + 24); x.lineTo(r, y + 24); break
    default: x.lineTo(l, y); x.lineTo(r, y)
  }
  x.lineTo(r, 0); x.closePath()
}

/** a lollipop tree at screen (px, base) and scale s */
function tree(x, px, base, s, t, seed, a = 1, night = 0) {
  if (s <= 0 || a <= 0) return
  x.save(); x.translate(px, base); x.scale(s, s); x.globalAlpha *= a
  const sway = 3 * Math.sin(t * 1.4 + seed)
  x.beginPath(); x.moveTo(0, 0); x.lineTo(sway * 0.3, -110); ink(x, '#b39ce8', { w: 12, fa: 0, glow: 6 })
  x.beginPath(); x.ellipse(sway, -170, 66, 78, 0, 0, TAU)
  ink(x, night > 0.5 ? '#7fd0c0' : '#7fe0a8', { w: 9, fa: 0.3, glow: 14, fill: '#2fc79a' })
  x.restore()
}

/** the "?" glyph: a bold rounded question mark, centred at (px, py), height ≈ 120·s */
export function qmark(x, px, py, s, col, a = 1, rot = 0) {
  if (s <= 0 || a <= 0) return
  x.save(); x.translate(px, py); x.rotate(rot); x.scale(s, s); x.globalAlpha *= a
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `900 150px ${INTER}`
  x.shadowColor = col; x.shadowBlur = 24
  x.lineWidth = 10; x.strokeStyle = 'rgba(12,8,30,0.9)'; x.lineJoin = 'round'; x.strokeText('?', 0, 0)
  x.fillStyle = col; x.fillText('?', 0, 0)
  x.restore()
}

function lerpC(a, b, k) { const A1 = h2r(a), B1 = h2r(b); return `rgb(${A1.map((v, i) => Math.round(lerp(v, B1[i], k))).join(',')})` }
export function tagChip(x, cx, cy, txt, k, col = GOLD, size = 28) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const w = x.measureText(txt).width + 32, h = size + 24, P = 5
  stepRect(x, -w / 2 - P, -h / 2 - P, w + 2 * P, h + 2 * P, P, col)
  stepRect(x, -w / 2, -h / 2, w, h, P, 'rgba(16,9,38,0.95)')
  x.fillStyle = col; x.fillText(txt, 0, 2)
  x.restore()
}


// ── the bayou scene (from htxbayou's drawBayou, minus the walkers). a: alpha, dy: camera offset (+ = scene slides
// down), night 0..1 (sunset → night), t0: when the scene opens (sun, river, skyline and trees pop from here).
export function drawBayouScene(x, t, { a = 1, dy = 0, night = 0, t0 = 0, H = 1920, sunS = 1, sunDY = 0 } = {}) {
  if (a <= 0) return
  const T = { river: t0, city: t0 + 0.1 }
  const open = ease.outCubic(prog(t, t0, t0 + 0.7))
  x.save(); x.translate(0, dy + (1 - open) * 140); x.globalAlpha = a

    // sunset glow over the nebula, rising from the horizon
    const sunK = 1 - night
    if (sunK > 0) {
      const g = x.createLinearGradient(0, HZ - 620, 0, HZ)
      g.addColorStop(0, 'rgba(255,140,90,0)'); g.addColorStop(0.55, rgba('#e8628a', 0.28 * sunK)); g.addColorStop(1, rgba(SUN, 0.62 * sunK))
      x.fillStyle = g; x.fillRect(0, HZ - 620, W, 620)
      // the sun: a big disc with retro slats, sinking slowly
      const sy = HZ - 150 + sunDY + 70 * prog(t, t0, t0 + 3.0) + 260 * ease.inQuad(night)
      const sr = 250 * sunS * pop01(t, t0 + 0.05, 0.6, 1.4)
      if (sr > 0) {
        x.save(); x.beginPath(); x.rect(0, 0, W, HZ); x.clip()
        x.globalCompositeOperation = 'lighter'
        const hg = x.createRadialGradient(540, sy, sr * 0.6, 540, sy, sr * 2.4)
        hg.addColorStop(0, rgba(SUN, 0.42 * sunK)); hg.addColorStop(1, rgba(SUN, 0))
        x.fillStyle = hg; x.beginPath(); x.arc(540, sy, sr * 2.4, 0, TAU); x.fill()
        x.globalCompositeOperation = 'source-over'
        const sg = x.createLinearGradient(0, sy - sr, 0, sy + sr)
        sg.addColorStop(0, '#ffe08a'); sg.addColorStop(0.5, '#ff9a5a'); sg.addColorStop(1, '#ff5f7e')
        x.beginPath(); x.arc(540, sy, sr, 0, TAU)
        for (let k = 0; k < 5; k++) { const yy = sy + sr * (0.12 + k * 0.17); x.rect(540 - sr - 2, yy, sr * 2 + 4, 6 + k * 3.2) }
        x.fillStyle = sg; x.globalAlpha = a * sunK; x.fill('evenodd')
        x.restore()
      }
    }

    // skyline on the horizon, springing up tower by tower
    TOWERS.forEach((b, i) => {
      const k = pop01(t, T.city + Math.abs(b.x - 540) * 0.0009 + (i % 3) * 0.03, 0.42, 1.6)
      if (k <= 0) return
      const h = b.h * k
      x.save(); x.translate(0, HZ)
      towerPath(x, b, h); x.fillStyle = '#140c2e'; x.fill()
      x.save(); x.clip()
      for (let wy = -h + 18; wy < -10; wy += 22) for (let wx = b.x + 7; wx < b.x + b.w - 9; wx += 15) {
        const lit = noise1(wx * 0.37 + wy * 0.21, 4 + b.seed)
        if (lit > 0.6 - 0.25 * night) { x.fillStyle = rgba('#ffd98a', (0.35 + 0.5 * night) * (0.7 + 0.3 * noise1(t * 0.7 + wx, wy))); x.fillRect(wx, wy, 6, 9) }
      }
      x.restore()
      towerPath(x, b, h); x.strokeStyle = rgba(night > 0.5 ? VIOLET : PINK, 0.75); x.lineWidth = 3; x.shadowColor = PINK; x.shadowBlur = 8; x.stroke(); x.shadowBlur = 0
      x.restore()
    })

    // ground below the horizon
    const gg = x.createLinearGradient(0, HZ, 0, H)
    gg.addColorStop(0, rgba('#2a1640', 1)); gg.addColorStop(1, '#0c0720')
    x.fillStyle = gg; x.fillRect(0, HZ, W, H - HZ + 900)
    x.strokeStyle = rgba(night > 0.5 ? VIOLET : SUN, 0.8); x.lineWidth = 4; x.shadowColor = SUN; x.shadowBlur = 14
    x.beginPath(); x.moveTo(0, HZ); x.lineTo(W, HZ); x.stroke(); x.shadowBlur = 0

    // the bayou ribbon: sampled polygon, drawn on from the horizon toward us at the open
    const zs = []
    for (let z = 60; z >= 0.92; z /= 1.045) zs.push(z)
    const drawn = ease.outCubic(prog(t, T.river, T.river + 0.55))
    const zMin = lerp(60, 0.92, drawn)
    const band = (cu, hw) => {
      x.beginPath()
      const zz = zs.filter(z => z >= zMin)
      zz.forEach((z, i) => { const px = xOf(cu(z) - hw, z), py = yOf(z); i ? x.lineTo(px, py) : x.moveTo(px, py) })
      for (let i = zz.length - 1; i >= 0; i--) x.lineTo(xOf(cu(zz[i]) + hw, zz[i]), yOf(zz[i]))
      x.closePath()
      return zz
    }
    if (drawn > 0) {
      // water
      band(riverU, RIVER_W)
      const wg = x.createLinearGradient(0, HZ, 0, H)
      wg.addColorStop(0, lerpC('#ff9a6a', '#7f86e0', night)); wg.addColorStop(0.35, lerpC('#b0487e', '#3a3a8a', night)); wg.addColorStop(1, '#1a1446')
      x.fillStyle = wg; x.fill()
      x.save(); x.clip()
      // shimmering reflection slats (sun gold at dusk, moon silver at night)
      for (let k = 0; k < 22; k++) {
        const z = 1 + Math.pow(k / 22, 1.6) * 13
        const py = yOf(z), cx = xOf(riverU(z), z) + 30 * Math.sin(t * 1.3 + k), w = (0.5 * S / z) * (0.4 + 0.6 * noise1(t * 1.6 + k * 0.7, k))
        x.globalAlpha = a * (0.35 + 0.4 * noise1(t * 2 + k, 7)) * clamp(1.2 - k / 30)
        x.fillStyle = night > 0.5 ? '#e3ecff' : '#ffd98a'
        x.beginPath(); x.roundRect(cx - w / 2, py, w, Math.max(2, 9 / z), 4); x.fill()
      }
      x.globalAlpha = a
      x.restore()
      band(riverU, RIVER_W); x.fillStyle = 'rgba(0,0,0,0)'; ink(x, BLUE, { w: 5, fa: 0, glow: 16 })
      // the trail: a pale walkway with paver ticks
      band(pathU, PATH_W)
      x.fillStyle = rgba('#d9b98a', 0.2); x.fill()
      ink(x, BONE, { w: 5, fa: 0, glow: 12 })
      x.save(); x.strokeStyle = rgba(BONE, 0.35)
      for (let z = 1.0; z < 30 && z >= zMin; z *= 1.16) {
        x.lineWidth = Math.max(1, 6 / z)
        x.beginPath(); x.moveTo(xOf(pathU(z) - PATH_W * 0.75, z), yOf(z)); x.lineTo(xOf(pathU(z) + PATH_W * 0.75, z), yOf(z)); x.stroke()
      }
      x.restore()
    }
    // trees, far → near
    const ts = TREES.map((tr, i) => ({ ...tr, i })).sort((p, q) => q.z - p.z)
    for (const tr of ts) {
      if (tr.z < zMin) continue
      const u = tr.side > 0 ? riverU(tr.z) + RIVER_W + tr.off : pathU(tr.z) - PATH_W - tr.off + 0.9
      const k = pop01(t, t0 + 0.35 + tr.i * 0.06, 0.4, 2.2)
      tree(x, xOf(u, tr.z), yOf(tr.z), (1.25 * tr.h / tr.z) * k, t, tr.i, 1, night)
    }
  x.restore()
}
