// st8wedding props — a copy of st5finale/scenes/props.js, itself a copy of st4aunties1/scenes/props.js (itself a copy of staunties/scenes/props.js) (the Auntie Council, season 2), so the Aunties look the same.
// props to live in the film's own folder). Every helper is a pure function of its arguments (and t); nothing touches
// `document` at module top level (the sound build imports scenes/index.js in node).
//
//   auntie(ctx, x, y, size, t, opts)   drawStarChar + tiny pixel reading glasses that sit exactly on the sprite's eyes.
//       opts = drawStarChar opts + glasses: { frame, hi, down 0…1 (slid down the nose), fog 0…1, chain }
//   bmp(ctx, rows, x, y, px, pal, alpha)   a character bitmap ('.' = clear, other chars looked up in pal), top-left at x, y.
//   makeDoily(scale)                     → an offscreen canvas of a round lace doily, drawn pixel-chunky (build only).
//   drawScroll / drawFan / drawCrockpot / drawTears / drawSweat / drawHearts / pixelPanel / sparkBurst — see each.
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
