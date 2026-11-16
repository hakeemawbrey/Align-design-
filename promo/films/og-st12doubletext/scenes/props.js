// Star Talk season 2 extra — the cast kit (promo/films/STARTALK12.md, "Season 2 extra"). STARTALK2.md asks for props to be
// shared helpers inside the film's own folder, so each film carries this copy. Pieces are copied unchanged from the season 2
// models: staunties (auntie glasses, tears, hearts, sweat, fan, pixel panel, spark burst), stlive5th (sprite transform,
// headset, cell tears, tissue, mic, desk, confetti) and stintervention (whistle, clipboard, crown). Plus a few cues helpers.
// Every helper is a pure function of its arguments (and t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { drawStarChar } from '../../startalk.js'

const G = 36, HALF = 18
const FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

/** the same hop curve startalk uses (copied so the glasses can follow the exact squash) */
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

// glasses on the 36-cell sprite grid: two 9×9 lens rings around the eyes (eyes: cols 10–15 / 20–25, rows 15–22)
const LENS = [[8, 14], [19, 14]], LW = 9, LH = 9
function ringCells(x0, y0) {
  const out = []
  for (let j = 0; j < LH; j++) for (let i = 0; i < LW; i++) {
    const edge = i === 0 || j === 0 || i === LW - 1 || j === LH - 1
    const corner = (i === 0 || i === LW - 1) && (j === 0 || j === LH - 1)
    if (edge && !corner) out.push([x0 + i, y0 + j])
  }
  // round the corners inward
  for (const [i, j] of [[1, 1], [LW - 2, 1], [1, LH - 2], [LW - 2, LH - 2]]) out.push([x0 + i, y0 + j])
  return out
}

/** a star character wearing tiny pixel reading glasses (they squash, hop and bob with the sprite) */
export function auntie(ctx, x, y, size, t, o = {}) {
  const pop = o.pop ?? 1, seed = o.seed ?? 1, alpha = o.alpha ?? 1
  const hs = hopState(t, o.hops)
  const sq0 = (o.squash || 0) + hs.sq
  const r = drawStarChar(ctx, x, y - hs.lift * size * 0.09, size, t, { ...o, hops: null, squash: sq0 })
  const g = o.glasses
  if (!g || pop <= 0 || alpha <= 0) return r
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const sq = sq0 + 0.018 * Math.sin(t * 3.1 + seed * 1.7), sx = 1 + sq, sy = 1 - sq * 0.9
  const base = (FOOT_ROW - HALF) * cell
  const dy = Math.round((g.down || 0) * 5)
  ctx.save()
  ctx.globalAlpha *= alpha
  ctx.translate(Math.round(x), Math.round(r.y + base)); ctx.scale(sx, sy)
  const px = (i, j, c, w = 1, h = 1) => { ctx.fillStyle = c; ctx.fillRect((i - HALF) * cell, (j - HALF) * cell - base, cell * w, cell * h) }
  const frame = g.frame || '#7a1f3d', hi = g.hi || '#ffd98a'
  for (const [lx, ly0] of LENS) {
    const ly = ly0 + dy
    // lens tint + fog
    ctx.fillStyle = rgba('#bfefff', 0.16 + 0.6 * clamp(g.fog || 0))
    ctx.fillRect((lx + 1 - HALF) * cell, (ly + 1 - HALF) * cell - base, (LW - 2) * cell, (LH - 2) * cell)
    if (g.fog > 0.05) {          // fog blobs, a little uneven
      ctx.fillStyle = rgba('#ffffff', 0.55 * clamp(g.fog))
      for (const [a, b] of [[2, 2], [3, 2], [5, 3], [2, 5], [6, 6], [4, 6], [3, 4]]) px(lx + a, ly + b, ctx.fillStyle)
    }
    for (const [i, j] of ringCells(lx, ly)) px(i, j, frame)
    // glint
    px(lx + 2, ly + 1, hi); px(lx + 1, ly + 2, hi)
    px(lx + LW - 3, ly + LH - 3, rgba('#ffffff', 0.85))
  }
  // bridge + temples
  px(17, 16 + dy, frame, 2, 1)
  px(6, 16 + dy, frame, 2, 1); px(28, 16 + dy, frame, 2, 1)
  // a beaded chain swinging under the chin (Cancer)
  if (g.chain) {
    const sw = Math.sin(t * 2.4) * 1.2
    for (let k = 0; k <= 12; k++) {
      const u = k / 12, ci = lerp(6, 29, u), cj = 17 + dy + Math.sin(u * Math.PI) * 9 + sw * Math.sin(u * Math.PI)
      if (k % 2 === 0) px(Math.round(ci), Math.round(cj), k % 4 === 0 ? hi : '#fff3dc')
    }
  }
  ctx.restore()
  return { ...r, cell, sx, sy, base, eyeY: r.y + base + ((19.2 - HALF) * cell - base) * sy, eyeDX: 4.6 * cell * sx }
}

/** char bitmap, top-left at x, y */
export function bmp(ctx, rows, x, y, px, pal, alpha = 1) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (!c) continue; ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } })
  ctx.restore()
}
const BM = s => s.trim().split(/\s+/)

/** a round lace doily, rendered at low resolution so it reads as pixel art; returns a canvas (call inside build) */
export function makeDoily(doc, R = 64) {
  const c = doc.createElement('canvas'); c.width = c.height = R * 2 + 4
  const x = c.getContext('2d'), cx = R + 2, cy = R + 2
  const LACE = '#fbf3e4', SHADE = '#d9c9b4', HOLE = 'rgba(0,0,0,0)'
  const pix = (i, j, col) => { x.fillStyle = col; x.fillRect(i, j, 1, 1) }
  for (let j = 0; j < c.height; j++) for (let i = 0; i < c.width; i++) {
    const dx = i + 0.5 - cx, dy = j + 0.5 - cy, d = Math.hypot(dx, dy), a = Math.atan2(dy, dx)
    const scallop = R - 3 + 3 * Math.cos(a * 24)
    if (d > scallop) continue
    let col = LACE
    // rings of holes, a petal band, a solid centre
    if (d > R - 9 && d < R - 5 && Math.cos(a * 48) > 0.35) col = HOLE
    else if (d > R - 18 && d < R - 12) { if (Math.cos(a * 32) > 0.55) col = HOLE }
    else if (d > R - 30 && d < R - 20) { const pet = Math.abs(Math.cos(a * 8)); if (d - (R - 30) < pet * 9 && d - (R - 30) > pet * 9 - 2.2) col = SHADE; else if (Math.cos(a * 16) > 0.86) col = HOLE }
    else if (d > R - 36 && d < R - 33 && Math.cos(a * 20) > 0.2) col = HOLE
    else if (d < 10 && Math.cos(a * 6) * 4 + 6 > d && d > 6) col = SHADE
    if (d > scallop - 1.2 && col !== HOLE) col = SHADE
    pix(i, j, col)
  }
  return c
}
/** draw the doily canvas as a flattened ellipse (pixel-crisp) */
export function drawDoily(ctx, img, cx, cy, rx, ry, alpha = 1) {
  if (!img || alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const sm = ctx.imageSmoothingEnabled; ctx.imageSmoothingEnabled = false
  // soft shadow/glow under it
  const g = ctx.createRadialGradient(cx, cy + ry * 0.4, 0, cx, cy + ry * 0.4, rx * 1.1)
  g.addColorStop(0, 'rgba(255,220,170,0.22)'); g.addColorStop(1, 'rgba(255,220,170,0)')
  ctx.fillStyle = g; ctx.save(); ctx.translate(cx, cy + ry * 0.4); ctx.scale(1, ry / rx); ctx.beginPath(); ctx.arc(0, 0, rx * 1.1, 0, Math.PI * 2); ctx.fill(); ctx.restore()
  ctx.drawImage(img, cx - rx, cy - ry, rx * 2, ry * 2)
  ctx.imageSmoothingEnabled = sm
  ctx.restore()
}

/** a parchment scroll hanging from a top roller; `len` px unrolled; items = [{ text, check (time or null) }] */
export function drawScroll(ctx, t, cx, top, w, len, items, { font = "italic 600 46px 'EB Garamond', serif", alpha = 1, rowH = 74, roller2 = true } = {}) {
  if (alpha <= 0 || len <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const x0 = cx - w / 2
  // paper
  const g = ctx.createLinearGradient(x0, 0, x0 + w, 0)
  g.addColorStop(0, '#e6cf9f'); g.addColorStop(0.12, '#f7ead0'); g.addColorStop(0.88, '#f7ead0'); g.addColorStop(1, '#dcc290')
  ctx.fillStyle = g; ctx.fillRect(x0, top, w, len)
  // pixel edge notches
  ctx.fillStyle = '#c9a76a'
  for (let yy = top; yy < top + len; yy += 24) { ctx.fillRect(x0, yy, 6, 12); ctx.fillRect(x0 + w - 6, yy + 12, 6, 12) }
  // items (clipped to the paper)
  ctx.save(); ctx.beginPath(); ctx.rect(x0, top, w, len); ctx.clip()
  ctx.textBaseline = 'middle'; ctx.textAlign = 'left'
  items.forEach((it, i) => {
    const y = top + 70 + i * rowH * (it.scale || 1) + (it.dy || 0)
    if (y > top + len + 40) return
    const sc = it.scale || 1
    ctx.font = it.font || font
    ctx.fillStyle = it.dim ? 'rgba(74,40,20,0.55)' : '#4a2814'
    // checkbox
    const bx = x0 + 34, bs = Math.round(30 * sc)
    ctx.lineWidth = 4 * sc; ctx.strokeStyle = it.dim ? 'rgba(74,40,20,0.45)' : '#6b3a1e'; ctx.strokeRect(bx, y - bs / 2, bs, bs)
    ctx.save(); ctx.translate(bx + bs + 20 * sc, y); ctx.scale(sc, sc); ctx.fillText(it.text, 0, 0); ctx.restore()
    if (it.check != null && t >= it.check) {
      const k = easeOutBackLocal(prog(t, it.check, it.check + 0.22))
      ctx.save(); ctx.translate(bx + bs / 2, y); ctx.scale(k * sc, k * sc); ctx.strokeStyle = '#d23a5a'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
      ctx.beginPath(); ctx.moveTo(-14, -2); ctx.lineTo(-3, 12); ctx.lineTo(20, -22); ctx.stroke(); ctx.restore()
    }
  })
  ctx.restore()
  // rollers
  const roller = (y, k = 1) => {
    ctx.fillStyle = '#8a5a2b'; ctx.fillRect(x0 - 26, y - 16, w + 52, 32)
    ctx.fillStyle = '#b37a3c'; ctx.fillRect(x0 - 26, y - 16, w + 52, 10)
    ctx.fillStyle = '#5b3517'; ctx.fillRect(x0 - 26, y + 10, w + 52, 6)
    ctx.fillStyle = '#f2c75c'; ctx.fillRect(x0 - 40, y - 20, 18, 40); ctx.fillRect(x0 + w + 22, y - 20, 18, 40)
    void k
  }
  roller(top)
  if (roller2) roller(top + len)
  ctx.restore()
}
function easeOutBackLocal(x, s = 2.2) { x = clamp(x); const c = s + 1; return 1 + c * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2) }

/** a pixel folding fan (pink), pivot at x, y; ang in radians; size = radius px */
export function drawFan(ctx, x, y, size, ang, alpha = 1) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(ang)
  const N = 9, a0 = -Math.PI * 0.85, a1 = -Math.PI * 0.15
  for (let i = 0; i < N; i++) {
    const u0 = lerp(a0, a1, i / N), u1 = lerp(a0, a1, (i + 1) / N)
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, size, u0, u1); ctx.closePath()
    ctx.fillStyle = i % 2 ? '#ff8fb1' : '#ffc2d6'; ctx.fill()
  }
  // lace edge + ribs
  ctx.strokeStyle = '#7a1f3d'; ctx.lineWidth = Math.max(3, size * 0.035)
  ctx.beginPath(); ctx.arc(0, 0, size, a0, a1); ctx.stroke()
  for (let i = 0; i <= N; i++) { const u = lerp(a0, a1, i / N); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(u) * size, Math.sin(u) * size); ctx.stroke() }
  ctx.fillStyle = '#fff3dc'
  for (let i = 0; i < 18; i++) { const u = lerp(a0, a1, (i + 0.5) / 18); ctx.fillRect(Math.cos(u) * (size + 6) - 4, Math.sin(u) * (size + 6) - 4, 8, 8) }
  ctx.fillStyle = '#f2c75c'; ctx.fillRect(-9, -9, 18, 18)
  ctx.restore()
}

// the crockpot (16 × 13), lid separate so it can rattle
const POT = BM(`
....DDDDDDDD....
..DDBBBBBBBBDD..
.DBBLLBBBBBBBBD.
DDBLLBBBBBBBBBDD
HDBBBBBBBBBBBBDH
HDBBBBhhhhBBBBDH
.DBBBBhRRhBBBBD.
.DBBBBhhhhBBBBD.
.DBBBBBBBBBBBBD.
..DBBBBBBBBBBD..
...DDDDDDDDDD...
...FF......FF...`)
const LID = BM(`
......KK......
.....KKKK.....
..LLLLLLLLLL..
.LTTTTTTTTTTL.
LTTTTTTTTTTTTL`)
const POT_PAL = { D: '#5a1f2c', B: '#d8543f', L: '#ff9a7a', H: '#3b1420', h: '#2a1018', R: '#ff3d3d', F: '#3b1420' }
const LID_PAL = { K: '#3b1420', L: '#5a1f2c', T: '#f2e4cf' }
/** crockpot centred at x, bottom at y; px = pixel size; lid bounce/steam by t */
export function drawCrockpot(ctx, t, x, y, px, { alpha = 1, rattle = 0, steam = 1 } = {}) {
  if (alpha <= 0) return
  const w = 16 * px, h = POT.length * px
  const x0 = x - w / 2, y0 = y - h
  bmp(ctx, POT, x0, y0, px, POT_PAL, alpha)
  const lift = rattle * Math.abs(Math.sin(t * 22)) * px * 1.2, tilt = rattle * Math.sin(t * 17) * 0.08
  ctx.save(); ctx.translate(x, y0 + px * 0.5 - lift); ctx.rotate(tilt)
  bmp(ctx, LID, -7 * px, -LID.length * px + px, px, LID_PAL, alpha)
  ctx.restore()
  // steam: three wavy pixel columns drifting up
  if (steam > 0) for (let k = 0; k < 3; k++) {
    const ph = (t * 0.7 + k / 3) % 1
    const sx = x + (k - 1) * px * 3.6 + Math.sin(ph * 7 + k) * px
    const sy = y0 - LID.length * px - ph * px * 12
    ctx.save(); ctx.globalAlpha *= alpha * steam * Math.sin(Math.PI * ph) * 0.8; ctx.fillStyle = '#fff6ea'
    ctx.fillRect(Math.round(sx), Math.round(sy), px, px * 2); ctx.fillRect(Math.round(sx + px), Math.round(sy - px * 2), px, px * 2)
    ctx.restore()
  }
}

/** happy tears: two little arcs of pixel drops springing sideways from the eyes (geometry from auntie()/eyesOf) */
export function drawTears(ctx, t, ex, ey, dx, px, { amount = 1, seed = 1, fountain = true } = {}) {
  if (amount <= 0) return
  const r = rng(seed * 991)
  const N = fountain ? 7 : 4
  for (const side of [-1, 1]) {
    for (let k = 0; k < N; k++) {
      const ph = ((t * (fountain ? 1.5 : 0.8)) + k / N + r() * 0.05) % 1
      const vx = fountain ? (60 + 30 * ((k * 7) % 3)) : 10, vy = fountain ? -120 : 0
      const gx = ex + side * dx + side * vx * ph * px / 8
      const gy = ey + px * 2 + vy * ph * px / 8 + 380 * ph * ph * px / 8
      ctx.save(); ctx.globalAlpha *= amount * (1 - ph * 0.7)
      ctx.fillStyle = '#9fe4ff'; ctx.fillRect(Math.round(gx - px / 2), Math.round(gy - px), px, px * 2)
      ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(gx - px / 2), Math.round(gy - px), Math.ceil(px / 2), Math.ceil(px / 2))
      ctx.restore()
    }
  }
}
/** eye geometry of a plain drawStarChar result (no glasses wrapper) */
export function eyesOf(r) { const cell = r.size / G; return { ex: r.x, ey: r.y + (19.2 - HALF) * cell, dx: 4.6 * cell, px: Math.max(4, Math.round(cell)) } }

/** a sweat drop beside a star (upper right) */
const DROP = BM(`..X.. .XWX. XWWXX XWXXX .XXX.`)
export function drawSweat(ctx, t, x, y, px, alpha = 1) {
  const ph = (t * 1.2) % 1
  bmp(ctx, DROP, x, y + ph * px * 6, px, { X: '#7fd0f0', W: '#ffffff' }, alpha * (1 - ph * 0.6))
}

const HEART = BM(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
/** floating pixel hearts rising from (x, y) from t0 */
export function drawHearts(ctx, t, t0, x, y, { n = 6, px = 7, spread = 140, life = 1.6, cols = ['#ff5c8a', '#ff8fb1', '#f2c75c'], alpha = 1 } = {}) {
  for (let i = 0; i < n; i++) {
    const k = (t - t0 - i * 0.18) / life
    if (k < 0 || k > 1) continue
    const hx = x + (((i * 53) % 7) / 6 - 0.5) * spread + Math.sin(k * 6 + i) * 12
    bmp(ctx, HEART, hx - 3.5 * px, y - k * 260, px, { X: cols[i % cols.length] }, alpha * Math.sin(Math.PI * k))
  }
}

/** a stepped-corner pixel panel (like the RPG box): gold border, dark glass fill */
export function pixelPanel(ctx, x, y, w, h, { P = 8, fill = 'rgba(13,8,32,0.92)', border = '#f2c75c', glow = 0.5 } = {}) {
  const step = (o, col) => {
    ctx.fillStyle = col
    ctx.fillRect(x + o + 2 * P, y + o, w - 2 * o - 4 * P, h - 2 * o)
    ctx.fillRect(x + o, y + o + 2 * P, w - 2 * o, h - 2 * o - 4 * P)
    ctx.fillRect(x + o + P, y + o + P, w - 2 * o - 2 * P, h - 2 * o - 2 * P)
  }
  ctx.save(); ctx.shadowColor = rgba('#f2c75c', glow); ctx.shadowBlur = 40; step(0, border); ctx.restore()
  step(0, border)
  step(P, fill)
  ctx.fillStyle = 'rgba(239,230,214,0.45)'
  ctx.fillRect(x + 3 * P, y + 2 * P, w - 6 * P, P / 2); ctx.fillRect(x + 3 * P, y + h - 2.5 * P, w - 6 * P, P / 2)
  ctx.fillStyle = '#fff1c8'; ctx.fillRect(x + 2 * P, y, P * 3, P / 2); ctx.fillRect(x, y + 2 * P, P / 2, P * 2)
}

/** a ring of pixel stars bursting outward from (cx, cy) at t0 */
export function sparkBurst(ctx, t, cx, cy, t0, { n = 12, R = 200, size = 28, seed = 1, cols = ['#f2c75c', '#efe6d6', '#ff8fb1', '#c9a6ff'], life = 0.8 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  const p = ease.outCubic(tt / life)
  ctx.save(); ctx.globalAlpha *= 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    const rr = R * (0.45 + 0.75 * p) * (i % 2 ? 0.8 : 1)
    drawPixelStar(ctx, cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, size * (1 - 0.45 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  ctx.restore()
}

// ─────────────────────────────── from stlive5th
const TAU = Math.PI * 2
const INK = '#1b1236'
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
/** run fn with the context mapped to sprite cells (0…36) of the star drawn with the same args */
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
/** sprite cell → world point (ignores squash; for spawning things that leave the star) */
export const cellToWorld = (F, i, j) => [F.ox - F.S / 2 + i * F.cell, F.oy - F.S / 2 - F.base + j * F.cell]

// ── tiny cell painter with a 1-cell ink outline
function paintCells(ctx, cells, outline = INK) {
  const key = new Set(cells.map(([i, j]) => i + ',' + j))
  if (outline) {
    ctx.fillStyle = outline
    for (const [i, j] of cells) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!key.has((i + a) + ',' + (j + b))) ctx.fillRect(i + a, j + b, 1.02, 1.02)
  }
  for (const [i, j, c] of cells) { ctx.fillStyle = c; ctx.fillRect(i, j, 1.02, 1.02) }
}

// ── headset: band over the top point, two cups on the sides of the top arm
let HEADSET = null
function headsetCellsList(accent) {
  const out = [], seen = new Set()
  const put = (i, j, c) => { const k = i + ',' + j; if (seen.has(k)) return; seen.add(k); out.push([i, j, c]) }
  // band (an arch: centre (18, 11), rx 6, ry 10.5)
  for (let a = 0; a <= 180; a += 2) {
    const r = a * Math.PI / 180, i = Math.round(17.5 - Math.cos(r) * 6.2), j = Math.round(11 - Math.sin(r) * 10.6)
    put(i, j, a > 60 && a < 120 ? '#9aa0c8' : '#5d6288')
  }
  // cups
  for (const [x0, d] of [[9, 1], [23, -1]]) {
    for (let j = 8; j <= 14; j++) for (let i = 0; i < 4; i++) {
      const edge = (j === 8 || j === 14) && (i === 0 || i === 3)
      if (edge) continue
      const c = (i === (d > 0 ? 3 : 0)) ? accent : (j === 9 && i === (d > 0 ? 1 : 2)) ? '#6e7399' : '#2c2f4c'
      put(x0 + i, j, c)
    }
  }
  return out
}
export function headsetCells(ctx, accent) {
  const k = 'h' + accent
  HEADSET = HEADSET || new Map()
  if (!HEADSET.has(k)) HEADSET.set(k, headsetCellsList(accent))
  paintCells(ctx, HEADSET.get(k))
}
/** a headset in flight: centred at (x, y) world, rotated, cell px */
export function headsetWorld(ctx, x, y, rot, cell, accent, alpha = 1) {
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(cell, cell); ctx.translate(-18, -9)
  headsetCells(ctx, accent); ctx.restore()
}

// ── happy tears (cells). Eyes sit at (13.4, 19.2) and (22.6, 19.2); drops leave the outer corners.
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
      if (k >= 3) { x = ex + d * 15 * ph; y = 20 - 9 * ph + 24 * ph * ph }        // fountain arcs
      else if (k === 2) { x = ex + d * 3.5 * ph; y = 20.5 + 15 * ph * ph }      // streams down the cheeks
      else { x = ex + d * 0.6 * ph; y = 21 + 8 * ph * ph }                      // a sniffle
      drop(Math.round(x * 2) / 2, Math.round(y * 2) / 2)
    }
    // the welling pool under the eye
    ctx.fillStyle = '#8fe3ff'; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
export function tissueCells(ctx, k = 1) {
  const cells = []
  const rows = ['..WWWWWW..', '.WWWWWWWW.', 'WWWWgWWWWW', 'WWWWWWWgWW', 'WWgWWWWWWW', '.WWWWWWWW.', '..WWWWWW..']
  rows.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') cells.push([13 + i, 21 + j + (1 - k) * 2, c === 'g' ? '#cfc6dc' : '#fbf7ee']) }))
  paintCells(ctx, cells)
}
export function hankieCells(ctx, side) {
  const x0 = side < 0 ? 9 : 20, cells = []
  for (let j = 0; j < 5; j++) for (let i = 0; i < 6; i++) cells.push([x0 + i, 19 + j, (i === 0 || j === 0 || i === 5 || j === 4) ? '#ff8fb1' : (i + j) % 3 ? '#fff6ee' : '#ffd6e2'])
  paintCells(ctx, cells)
}

// ── broadcast desk mic
export function drawMic(ctx, x, y, ang, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s)
  const P = 6
  // base + stand
  ctx.fillStyle = INK; ctx.fillRect(-7 * P, -2 * P, 14 * P, 3 * P); ctx.fillRect(-1.5 * P, -16 * P, 3 * P, 15 * P)
  ctx.fillStyle = '#4a4f72'; ctx.fillRect(-6 * P, -1.5 * P, 12 * P, 2 * P); ctx.fillStyle = '#7d83ad'; ctx.fillRect(-6 * P, -1.5 * P, 12 * P, P / 2)
  ctx.fillStyle = '#5d6288'; ctx.fillRect(-0.75 * P, -15.5 * P, 1.5 * P, 14 * P)
  // capsule
  ctx.translate(0, -16 * P); ctx.rotate(ang)
  ctx.fillStyle = INK; ctx.beginPath(); ctx.roundRect(-4.5 * P, -13 * P, 9 * P, 14 * P, 4 * P); ctx.fill()
  ctx.fillStyle = '#9097bd'; ctx.beginPath(); ctx.roundRect(-3.5 * P, -12 * P, 7 * P, 12 * P, 3.4 * P); ctx.fill()
  ctx.fillStyle = '#5d6288'
  for (let j = -10; j <= -2; j += 2) ctx.fillRect(-3.5 * P, j * P, 7 * P, P * 0.5)
  for (let i = -2; i <= 2; i += 2) ctx.fillRect(i * P - P * 0.25, -11.5 * P, P * 0.5, 11 * P)
  ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.fillRect(-2.6 * P, -10.5 * P, P * 0.8, 5 * P)
  ctx.fillStyle = '#f2c75c'; ctx.fillRect(-4.5 * P, -1.5 * P, 9 * P, 1.6 * P)
  ctx.restore()
}

const step = (ctx, x, y, w, h, P, col) => { ctx.fillStyle = col; ctx.fillRect(x + 2 * P, y, w - 4 * P, h); ctx.fillRect(x, y + 2 * P, w, h - 4 * P); ctx.fillRect(x + P, y + P, w - 2 * P, h - 2 * P) }
export function drawDesk(ctx, x0, x1, y, h) {
  const P = 8
  step(ctx, x0 - P, y - P, x1 - x0 + 2 * P, h + 2 * P, P, INK)
  step(ctx, x0, y, x1 - x0, h, P, '#2c1f4e')
  ctx.fillStyle = '#f2c75c'; ctx.fillRect(x0 + P, y, x1 - x0 - 2 * P, P)
  ctx.fillStyle = '#fff1c8'; ctx.fillRect(x0 + 3 * P, y, 8 * P, P / 2)
  ctx.fillStyle = '#3d2c68'; ctx.fillRect(x0 + 2 * P, y + 2 * P, x1 - x0 - 4 * P, P / 2)
  ctx.fillStyle = '#1f1538'
  for (let xx = x0 + 6 * P; xx < x1 - 6 * P; xx += 18 * P) ctx.fillRect(xx, y + 3 * P, P / 2, h - 4 * P)
}

/** a pixel panel (stepped corners, gold border, bone hairline) on a canvas sized (w + 2m) × (h + 2m) */
/** confetti cannon from (x0, y0) at t0 — rectangles flipping in 3D-ish, analytic drag so it's pure f(t) */
const CONF_COLS = ['#f2c75c', '#ff8fb1', '#c9a6ff', '#7fe0ff', '#efe6d6', '#ff6b5b', '#9cf08a']
export function confetti(ctx, t, t0, { x0 = 540, y0 = 1300, n = 80, spread = 1, up = 1, seed = 1, life = 5.5 } = {}) {
  const dt0 = t - t0
  if (dt0 < 0 || dt0 > life) return
  const r = rng(seed * 977 + 3)
  const k = 1.5, vty = 330
  for (let i = 0; i < n; i++) {
    const delay = r() * 0.18, vx0 = (r() - 0.5) * 2100 * spread, vy0 = -(1500 + r() * 1300) * up, spin = 4 + r() * 9, sz = 12 + r() * 12, col = CONF_COLS[Math.floor(r() * CONF_COLS.length)], ph = r() * TAU, sway = 30 + r() * 50
    const dt = dt0 - delay
    if (dt < 0) continue
    const e = (1 - Math.exp(-k * dt)) / k
    const x = x0 + vx0 * e + Math.sin(dt * 3 + ph) * sway * clamp(dt)
    const y = y0 + vty * dt + (vy0 - vty) * e
    if (y > 2000) continue
    const a = clamp((life - dt0) / 0.6)
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.rotate(ph + dt * spin * 0.4); ctx.scale(Math.cos(dt * spin + ph), 1)
    ctx.fillStyle = col; ctx.fillRect(-sz / 2, -sz * 0.35, sz, sz * 0.7)
    ctx.restore()
  }
}

// ─────────────────────────────── from stintervention
const OUT = '#1a1030'
/** bitmap helper: rows of chars, pal maps char → colour; (x, y) = top-left */
export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } } })
}
const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)) }

export function drawPixelHeart(ctx, x, y, px, col = '#ff4f7e') {
  bitmap(ctx, ['.XX.XX.', 'XWXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'], { X: col, W: '#ffd0dc' }, x - 3.5 * px, y - 3 * px, px)
}

export function drawWhistle(ctx, x, y, px, { blow = 0 } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(-0.25 - blow * 0.12)
  const S = '#d6dbe8', H = '#ffffff', D = '#6b7390', L = OUT
  bitmap(ctx, [
    '...LLLL........',
    '..LSSSSL.......',
    '.LSHHSSSLLLLLL.',
    '.LSHSSSSSSSSSSL',
    '.LSSSSDDSSSSSSL',
    '.LSSSSDDSSLLLL.',
    '..LSSSSSSL.....',
    '...LLLLLL......',
  ], { L, S, H, D }, -4 * px, -4 * px, px)
  // the cord stub
  R(ctx, -6 * px, -3 * px, 3 * px, px, '#e8455e'); R(ctx, -8 * px, -2 * px, 3 * px, px, '#e8455e'); R(ctx, -9 * px, -px, 2 * px, px, '#b02a44')
  // blow puffs
  if (blow > 0) {
    ctx.globalAlpha = clamp(blow)
    for (let k = 0; k < 3; k++) { const d = (1 - blow) * 6 + k * 3; R(ctx, (11 + d) * px, (-3 + k * 2.5 - 2) * px, 3 * px, px, '#fffbea') }
  }
  ctx.restore()
}

export function drawClipboard(ctx, x, y, px, { strike = 0, rot = 0.12, page = 0 } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  const w = 16, h = 21, ox = -w / 2 * px, oy = -h / 2 * px
  R(ctx, ox - px, oy - px, (w + 2) * px, (h + 2) * px, OUT)
  R(ctx, ox, oy, w * px, h * px, '#a8693a'); R(ctx, ox, oy, w * px, px, '#d08a50')
  R(ctx, ox + 2 * px, oy + 2 * px, (w - 4) * px, (h - 3) * px, '#fbf3e2')
  // the notes (ink lines; the page flips at `page` > 0.5)
  const lines = page > 0.5 ? [9, 6, 10, 7, 8] : [10, 7, 9, 11, 6]
  lines.forEach((L, k) => R(ctx, ox + 3.5 * px, oy + (5 + k * 3) * px, L * px, px, '#5b4a7a'))
  R(ctx, ox + 3.5 * px, oy + 5 * px, 2 * px, px, '#ef5c94')
  // the clip
  R(ctx, ox + 4.5 * px, oy - 2 * px, 7 * px, 4 * px, OUT); R(ctx, ox + 5 * px, oy - 1.5 * px, 6 * px, 3 * px, '#c4bce0'); R(ctx, ox + 5 * px, oy - 1.5 * px, 6 * px, px, '#ffffff')
  // the red ✕
  if (strike > 0) {
    const k = clamp(strike), s = 0.75 + 0.25 * (1 - k) * 2
    ctx.save(); ctx.scale(s, s); ctx.fillStyle = '#ff3355'
    for (let i = -5; i <= 5; i++) { ctx.fillRect(Math.round(i * px * 1.1 - px), Math.round(i * px * 1.1 + px), Math.ceil(px * 2.2), Math.ceil(px * 2.2)); ctx.fillRect(Math.round(-i * px * 1.1 - px), Math.round(i * px * 1.1 + px), Math.ceil(px * 2.2), Math.ceil(px * 2.2)) }
    ctx.restore()
  }
  ctx.restore()
}

export function drawCrown(ctx, x, y, px, rot = -0.12) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, [
    'L...L...L',
    'GL.LGL.LG',
    'GGLGGGLGG',
    'GGGGGGGGG',
    'GRGGBGGRG',
    'GGGGGGGGG',
    'LLLLLLLLL',
  ], { L: '#7a4a10', G: '#ffd23f', R: '#ff3d6e', B: '#38c4ec' }, -4.5 * px, -7 * px, px)
  R(ctx, -3.5 * px, -5 * px, px, px, '#fff6c0')
  ctx.restore()
}


// ─────────────────────────────── new for season 2 extra
/** boxing glove in sprite cells, centred on (ci, cj); side −1 = left, +1 = right */
function gloveCells(ctx, ci, cj, side, col) {
  const rows = ['.OOOO.', 'OGGGGO', 'OGHGGO', 'OGGGGO', 'OGGGGO', 'OWWWWO', '.OOOO.']
  rows.forEach((r, j) => [...r].forEach((c, i) => {
    if (c === '.') return
    ctx.fillStyle = c === 'O' ? INK : c === 'G' ? col : c === 'H' ? '#ffffff' : '#fbf3e2'
    const ii = side < 0 ? 5 - i : i
    ctx.fillRect(ci - 3 + ii, cj - 3.5 + j, 1.02, 1.02)
  }))
}
/** a whole cast member: drawStarChar (+ auntie glasses) with optional headset, gloves, cell tears, tissue.
 *  o = drawStarChar opts + { glasses, headset: accent, gloves: { col, l, r } (punch 0…1 per side), tears: 0…3, tissue: 0…1 } */
export function cast(ctx, x, y, size, t, o = {}) {
  const r = o.glasses ? auntie(ctx, x, y, size, t, o) : drawStarChar(ctx, x, y, size, t, o)
  if ((o.pop ?? 1) <= 0.02 || (o.alpha ?? 1) <= 0) return r
  if (o.headset || o.gloves || o.tears || o.tissue) {
    const F = starFrame(x, y, size, t, { pop: o.pop ?? 1, bob: o.bob, squash: o.squash || 0, hops: o.hops, seed: o.seed ?? 1 })
    ctx.save(); ctx.globalAlpha *= o.alpha ?? 1
    inSprite(ctx, F, () => {
      if (o.headset) headsetCells(ctx, o.headset)
      if (o.tears) tearsCells(ctx, t, o.tears)
      if (o.tissue) tissueCells(ctx, o.tissue)
      if (o.gloves) {
        const g = o.gloves
        gloveCells(ctx, 1.5 - 5 * (g.l || 0), 15 + (g.dy || 0), -1, g.col || '#e8303f')
        gloveCells(ctx, 34.5 + 5 * (g.r || 0), 15 + (g.dy || 0), 1, g.col || '#e8303f')
      }
    })
    ctx.restore()
  }
  return r
}

// ─────────────────────────────── sound helpers (pure; for CUES)
const NOTES = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
export const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTES[(base + i) % NOTES.length], gain, (i % 2 ? 0.15 : -0.15)])
export const headCues = (t0, n, land, base = 0, gain = 0.026) => [...wordPops(t0, n, 0.07, base, gain), ['pop', +land.toFixed(3), 1046.5, 0.05, 0], ['pluck', +land.toFixed(3), 1046.5, 0.04, 0.6, 0]]
export const chipCue = (t, f, len, o = {}) => ['chip', +t.toFixed(3), f, len, { gain: 0.05, wave: 'square', duty: 0.25, decay: 0.12, sustain: 0.7, rev: 0.12, dly: 0.1, bus: 'lead', ...o }]
export const scratchCue = t => [chipCue(t, 1800, 0.11, { wave: 'noise', slide: 40, gain: 0.07, bus: 'drums', decay: 0.05, sustain: 0.8, rev: 0.05, dly: 0 }), chipCue(t + 0.11, 4200, 0.2, { wave: 'noise', slide: -70, gain: 0.08, bus: 'drums', decay: 0.1, sustain: 0.6, rev: 0.08, dly: 0 }), ['tick', +t.toFixed(3), 0.06]]
export const wompCue = (t, f = 466.16) => [[f, 0], [f * 0.944, 0.36], [f * 0.891, 0.72]].map(([ff, d]) => chipCue(t + d, ff, 0.3, { duty: 0.5, gain: 0.06, slide: -0.6, decay: 0.2, sustain: 0.6 })).concat([chipCue(t + 1.08, f * 0.841, 0.95, { duty: 0.5, gain: 0.06, slide: -2.2, vib: 0.03, decay: 0.4, sustain: 0.7 })])
export const drumrollCue = (t0, t1) => { const out = []; for (let t = t0; t < t1; t += 0.042) out.push(['snare', +t.toFixed(3), { gain: 0.04 + 0.11 * (t - t0) / (t1 - t0), tone: 210, decay: 0.07, snappy: 0.9, rev: 0.1 }]); return out }
export const flutterCue = (t0, n, gap, gain = 0.03) => Array.from({ length: n }, (_, i) => ['tick', +(t0 + i * gap).toFixed(3), gain * (1 - i / n * 0.5)])
/** a referee's whistle: two shrill trilled blasts */
export const whistleCue = (t, long = 0.42) => [chipCue(t, 2960, 0.16, { wave: 'square', duty: 0.5, gain: 0.045, vib: 0.06, decay: 0.05, sustain: 0.9, rev: 0.1, dly: 0 }), chipCue(t + 0.2, 2960, long, { wave: 'square', duty: 0.5, gain: 0.045, vib: 0.07, decay: 0.05, sustain: 0.9, rev: 0.12, dly: 0 })]
/** crickets: a chiptune chirp, three pairs */
export const cricketCue = (t, n = 3) => Array.from({ length: n * 2 }, (_, i) => chipCue(t + Math.floor(i / 2) * 0.55 + (i % 2) * 0.09, 4400, 0.05, { wave: 'square', duty: 0.125, gain: 0.025, decay: 0.03, sustain: 0.5, rev: 0.2, dly: 0 }))
