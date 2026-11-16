// storion props — small pixel drawings on canvas, kept inside this film's folder (STARTALK2.md: props are shared
// helpers inside your own film). Pure functions of their arguments; nothing touches `document` at module load.
//
//   starFrame(x, y, size, t, opts) / inSprite(ctx, F, fn)
//        the exact transform drawStarChar uses for a frame (same maths as startalk.js), so props drawn in sprite CELLS
//        (the 36-cell grid) stay seated on a star through hops and squash.
//   beltCells(ctx, t, glow)       Orion's Belt: a dark strap across the lower body with three blue-white star studs.
//                                 glow 0…1 makes the studs flare (the "we can see your belt" blink).
//   shadesCells(ctx) / staCells(ctx)   the disguise: pixel sunglasses and a big fake moustache (cells).
//   tearsCells(ctx, t, k)         Pisces' tears: 1 sniffle · 2 streams · 3 fountains.
//   drawBouquet(ctx, x, y, cell, wilt, rot)   a pixel bouquet, (x, y) = where the hand holds it; wilt 0…1 droops it.
//   drawBoombox(ctx, x, y, cell, t)           a pixel boombox held overhead (speakers pump).
//   drawSign(ctx, x, y, w, h, lines, opts)    a hand-held cardboard sign on a stick; (x, y) = centre of the board.
//   drawColumn(ctx, x, y0, y1, w)             a pixel Greek column (the epic frame).
//   drawMeander(ctx, x0, x1, y, cell, col)    a pixel Greek-key band.
//   drawCloud(ctx, x, y, cell, alpha)         Pisces' little cloud seat.
//   confetti(ctx, t, t0, opts)                a confetti burst (pure f(t)).
//   drawPixels(ctx, bm, x, y, cell, pal, opts) generic bitmap painter ('.' = empty).
import { clamp, rng } from '../../../src/lib.js'

const TAU = Math.PI * 2
const INK = '#1b1236'
const G = 36, HALF = 18
const SC = { x: 18, y: 19.6, R: 17.6, r: 9.4, round: 2.6 }
const FOOT_ROW = SC.y + SC.R * Math.cos(Math.PI / 5)
const BM = s => s.trim().split(/\s+/)

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
/** run fn with the context mapped to sprite cells (0…36) of the star drawn with the same args */
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
/** sprite cell → world point (ignores squash) */
export const cellToWorld = (F, i, j) => [F.ox - F.S / 2 + i * F.cell, F.oy - F.S / 2 - F.base + j * F.cell]

/** the star's outline in cells (for clipping things to the body) */
function starPath(ctx) {
  const R0 = SC.R - SC.round * 0.4, r0 = SC.r - SC.round * 0.2
  ctx.beginPath()
  for (let k = 0; k < 10; k++) {
    const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r0 : R0
    const px = SC.x + Math.cos(a) * rr, py = SC.y + Math.sin(a) * rr
    k ? ctx.lineTo(px, py) : ctx.moveTo(px, py)
  }
  ctx.closePath()
}

// ── Orion's Belt (cells): a strap across the lower body, three star studs
export function beltCells(ctx, t, glow = 0) {
  ctx.save(); starPath(ctx); ctx.clip()
  ctx.fillStyle = INK; ctx.fillRect(0, 26.2, 36, 2.4)
  ctx.fillStyle = '#5a46a0'; ctx.fillRect(0, 26.7, 36, 1.4)
  ctx.restore()
  // the three stars of the Belt (Alnitak, Alnilam, Mintaka): bright four-point twinkles on the strap, on a slight diagonal
  const studs = [[11.6, 27.9], [18, 27.4], [24.4, 26.9]]
  const g = clamp(glow)
  studs.forEach(([i, j], k) => {
    const tw = 0.5 + 0.5 * Math.sin(t * 4 + k * 2.1)
    if (g > 0.02) {
      ctx.save(); ctx.globalAlpha = g * 0.6; ctx.fillStyle = '#bfe6ff'
      const L = 3.5 + 5 * g
      ctx.fillRect(i - 0.5, j - L, 1, 2 * L); ctx.fillRect(i - L, j - 0.5, 2 * L, 1)
      ctx.restore()
    }
    const L = 2 + 0.6 * tw
    ctx.fillStyle = INK; ctx.fillRect(i - 1.0, j - L - 0.5, 2, 2 * L + 1); ctx.fillRect(i - L - 0.5, j - 1.0, 2 * L + 1, 2)
    ctx.fillStyle = '#bfe6ff'; ctx.fillRect(i - 0.5, j - L, 1, 2 * L); ctx.fillRect(i - L, j - 0.5, 2 * L, 1)
    ctx.fillStyle = '#ffffff'; ctx.fillRect(i - 0.5, j - 0.5, 1, 1)
  })
}

// ── the disguise (cells). Eyes sit at (13.4, 19.2) and (22.6, 19.2).
export function shadesCells(ctx) {
  ctx.fillStyle = INK
  ctx.fillRect(9.4, 16, 8, 6.4); ctx.fillRect(18.6, 16, 8, 6.4); ctx.fillRect(17, 16.8, 2, 1.2)
  ctx.fillRect(7.6, 16.6, 2, 1); ctx.fillRect(26.4, 16.6, 2, 1)
  ctx.fillStyle = '#2d2350'; ctx.fillRect(10.2, 16.8, 6.4, 4.8); ctx.fillRect(19.4, 16.8, 6.4, 4.8)
  ctx.fillStyle = 'rgba(190,220,255,0.55)'; ctx.fillRect(10.8, 17.4, 2, 1); ctx.fillRect(20, 17.4, 2, 1)
}
export function staCells(ctx) {
  const M = BM(`
  ..XXXX..XXXX..
  .XXXXXXXXXXXX.
  XXXXXXXXXXXXXX
  XXX..XXXX..XXX
  XX..........XX`)
  M.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X') { ctx.fillStyle = INK; ctx.fillRect(11 + i - 0.1, 22.2 + j - 0.1, 1.2, 1.2) } }))
  M.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X' && j < 3) { ctx.fillStyle = '#5a3a2a'; ctx.fillRect(11 + i + 0.15, 22.2 + j + 0.15, 0.7, 0.7) } }))
}

// ── tears (cells)
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

// ── generic bitmap painter
export function drawPixels(ctx, bm, x, y, cell, pal, { rot = 0, ax = 0.5, ay = 0.5, outline = null, alpha = 1, flip = false } = {}) {
  const w = bm[0].length, h = bm.length
  ctx.save()
  ctx.globalAlpha *= alpha
  ctx.translate(x, y); if (rot) ctx.rotate(rot); if (flip) ctx.scale(-1, 1)
  const ox = -w * cell * ax, oy = -h * cell * ay
  const c = Math.ceil(cell) + 0.5
  if (outline) {
    ctx.fillStyle = outline
    bm.forEach((row, j) => [...row].forEach((ch, i) => {
      if (ch === '.') return
      for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const r2 = bm[j + b], ch2 = r2 ? r2[i + a] : undefined
        if (!ch2 || ch2 === '.') ctx.fillRect(ox + (i + a) * cell, oy + (j + b) * cell, c, c)
      }
    }))
  }
  bm.forEach((row, j) => [...row].forEach((ch, i) => {
    if (ch === '.' || !pal[ch]) return
    ctx.fillStyle = pal[ch]; ctx.fillRect(ox + i * cell, oy + j * cell, c, c)
  }))
  ctx.restore()
}

// ── the bouquet: heads up top, stems + wrap below; (x, y) = the grip. wilt droops the heads sideways and down.
const WRAP = BM(`
PPPPPPPPP
.PPPPPPP.
.PWPPPPP.
..PPPPP..
..PPPPP..
...PPP...
...PPP...
....P....`)
const HEADS = [[-3.5, -1, '#ff5c7a'], [0, -2.5, '#ffd166'], [3.5, -1, '#ff8fb1'], [-1.8, 1, '#c9a6ff'], [1.8, 1, '#ff6b5b']]
const FLOWER = BM(`.F.F. FFCFF .FFF. ..F..`)
export function drawBouquet(ctx, x, y, cell, wilt = 0, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  // stems
  ctx.fillStyle = INK; ctx.fillRect(-3.5 * cell, -6 * cell, 7 * cell, 6.5 * cell)
  ctx.fillStyle = '#5fbf6a'
  for (const s of [-2, 0, 2]) ctx.fillRect((s - 0.5) * cell, -6 * cell, cell, 6 * cell)
  // heads (droop with wilt)
  HEADS.forEach(([hx, hy, col], k) => {
    const side = hx === 0 ? (k % 2 ? 1 : -1) : Math.sign(hx)
    const px = (hx + side * 3 * wilt) * cell, py = (hy - 8 + 6 * wilt * (0.8 + 0.1 * k)) * cell
    drawPixels(ctx, FLOWER, px, py, cell, { F: wilt > 0.5 ? '#9a6a7a' : col, C: wilt > 0.5 ? '#b89a5a' : '#ffe9a8' }, { outline: INK, rot: side * 1.2 * wilt })
  })
  drawPixels(ctx, WRAP, 0, 2.2 * cell, cell, { P: '#efe6d6', W: '#ffffff' }, { outline: INK })
  ctx.fillStyle = '#ff5c7a'; ctx.fillRect(-2.5 * cell, 0.6 * cell, 5 * cell, cell)
  ctx.restore()
}

// ── the boombox (held overhead)
const BOX = BM(`
....HHHHHHHHHHHH....
....H..........H....
KKKKKKKKKKKKKKKKKKKK
KMMMMMMMMMMMMMMMMMMK
KMSSSSSMMMMMMSSSSSMK
KSSDDDSSMBBMSSDDDSSK
KSDDCDDSMBBMSDDCDDSK
KSDDDDDSMMMMSDDDDDSK
KSSDDDSSMRRMSSDDDSSK
KMSSSSSMMMMMMSSSSSMK
KMMMMMMMMMMMMMMMMMMK
KKKKKKKKKKKKKKKKKKKK`)
export function drawBoombox(ctx, x, y, cell, t) {
  const pump = Math.max(0, Math.sin(t * 11.3)) ** 2
  drawPixels(ctx, BOX, x, y, cell * (1 + 0.04 * pump), { K: INK, H: '#c8c2e0', M: '#8a84b8', S: '#3a3466', D: '#1b1236', C: pump > 0.5 ? '#ffd166' : '#6a5fa0', B: '#ffd166', R: '#ff5c7a' }, { outline: INK })
}

// ── a cardboard sign on a stick. lines: array of strings. (x, y) = the board's centre.
export function drawSign(ctx, x, y, w, h, lines, { rot = 0, font = "800 40px Inter", color = '#1b1236', board = '#f3e2c0', edge = '#c9a46a', stick = true, accent = null, k = 1 } = {}) {
  if (k <= 0.01) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k)
  if (stick) { ctx.fillStyle = INK; ctx.fillRect(-9, h / 2 - 4, 18, 120); ctx.fillStyle = '#a77a4a'; ctx.fillRect(-5, h / 2 - 4, 10, 116) }
  ctx.fillStyle = INK; ctx.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  ctx.fillStyle = board; ctx.fillRect(-w / 2, -h / 2, w, h)
  ctx.fillStyle = edge; ctx.fillRect(-w / 2, h / 2 - 8, w, 8); ctx.fillRect(w / 2 - 8, -h / 2, 8, h)
  ctx.font = font; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  const lh = h / (lines.length + 0.4)
  lines.forEach((s, i) => { ctx.fillStyle = accent && i === lines.length - 1 ? accent : color; ctx.fillText(s, 0, -h / 2 + lh * (i + 0.7)) })
  ctx.restore()
}

// ── a pixel Greek column: capital, fluted shaft, base
export function drawColumn(ctx, x, y0, y1, w, alpha = 1) {
  ctx.save(); ctx.globalAlpha *= alpha
  const c = w / 8
  ctx.fillStyle = INK; ctx.fillRect(x - w / 2 - c, y0 - c, w + 2 * c, y1 - y0 + 2 * c)
  // capital + base slabs
  ctx.fillStyle = '#e9e0f2'; ctx.fillRect(x - w / 2, y0, w, 2 * c); ctx.fillRect(x - w / 2, y1 - 2 * c, w, 2 * c)
  ctx.fillStyle = '#b9aed6'; ctx.fillRect(x - w / 2, y0 + 1.4 * c, w, 0.6 * c); ctx.fillRect(x - w / 2, y1 - 2 * c, w, 0.6 * c)
  // volutes
  ctx.fillStyle = '#c9a6ff'; ctx.fillRect(x - w / 2, y0 + 0.5 * c, c, c); ctx.fillRect(x + w / 2 - c, y0 + 0.5 * c, c, c)
  // shaft (narrower), fluting
  const sw = w - 2 * c
  ctx.fillStyle = INK; ctx.fillRect(x - sw / 2 - c * 0.5, y0 + 2 * c, sw + c, y1 - y0 - 4 * c)
  ctx.fillStyle = '#d8cdea'; ctx.fillRect(x - sw / 2, y0 + 2 * c, sw, y1 - y0 - 4 * c)
  ctx.fillStyle = '#a99cc9'
  for (let i = 1; i < 6; i += 2) ctx.fillRect(x - sw / 2 + i * sw / 6 - c * 0.35, y0 + 2.5 * c, c * 0.7, y1 - y0 - 5 * c)
  ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(x - sw / 2, y0 + 2 * c, c * 0.6, y1 - y0 - 4 * c)
  ctx.restore()
}

// ── a pixel Greek-key (meander) band, 5 cells tall
const KEY = BM(`
XXXXX.
X...X.
X.X.X.
X.XXX.
X.....
XXXXXX`)
export function drawMeander(ctx, x0, x1, y, cell, col, alpha = 1) {
  ctx.save(); ctx.globalAlpha *= alpha; ctx.fillStyle = col
  const n = Math.floor((x1 - x0) / (6 * cell))
  const off = x0 + ((x1 - x0) - n * 6 * cell) / 2
  for (let k = 0; k < n; k++) KEY.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X') ctx.fillRect(Math.round(off + (k * 6 + i) * cell), Math.round(y + j * cell), Math.ceil(cell), Math.ceil(cell)) }))
  ctx.restore()
}

// ── Pisces' cloud seat
const CLOUD = BM(`
.....WWWW.........
...WWWWWWWW.WWW...
..WWWWWWWWWWWWWWW.
.WWWWWWWWWWWWWWWWW
WWWWWWWWWWWWWWWWWW
SSWWWWWWWWWWWWWWSS
.SSSSSSSSSSSSSSSS.`)
export function drawCloud(ctx, x, y, cell, alpha = 1) {
  drawPixels(ctx, CLOUD, x, y, cell, { W: '#d9d2f2', S: '#a89cd6' }, { outline: INK, alpha })
}

// ── confetti
const CONF_COLS = ['#f2c75c', '#ff8fb1', '#c9a6ff', '#7fe0ff', '#efe6d6', '#ff6b5b', '#9cf08a']
export function confetti(ctx, t, t0, { x0 = 540, y0 = 1300, n = 80, spread = 1, up = 1, seed = 1, life = 4 } = {}) {
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
