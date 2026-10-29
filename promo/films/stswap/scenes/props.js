// stswap props — the pixel prop kit for "Sign Swap." (Freaky Friday in the night sky), kept inside this film's folder
// (STARTALK2.md: props are shared helpers inside your own film folder). The star-transform helpers, bmp, pixelPanel and
// the small fx are copied from stfirstfight/scenes/props.js so this film owns its copy. Pure functions of their
// arguments (and t); nothing touches `document` at module top level (the sound build imports scenes/index.js in node).
//
//   starFrame / inSprite / cellToWorld   the exact transform drawStarChar uses, so accessories drawn in sprite CELLS stay
//                                        seated through hops and squash
//   glassesCells / shadesCells / tearsCells    Virgo's reading glasses (over the eyes), Sag's shades (pushed up), tears
//   bmp(ctx, rows, x, y, px, pal, o)     a char bitmap ('.' = clear), anchored (ax, ay), rotated, flipped, ink-outlined
//   drawClipboard / drawPassport / drawPhone / drawFlower / drawTable / drawSun / drawCoin / shootingStar
//   pixelPanel / confetti / sparkBurst / drawHearts / dizzyStars / sweatDrop / steamPuffs / speedLines
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'

const TAU = Math.PI * 2
export const INK = '#1b1236'
const G = 36, HALF = 18
const MONO = "'Space Mono', ui-monospace, monospace"
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"
export const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const toHex = (r, g, b) => '#' + [r, g, b].map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('')
/** mix two hex colours (k 0 → a, 1 → b), quantised to 12 steps so drawStarChar's palette cache stays small */
export function mixHex(a, b, k) {
  const q = Math.round(clamp(k) * 12) / 12
  const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16)
  return toHex(lerp(A >> 16, B >> 16, q), lerp((A >> 8) & 255, (B >> 8) & 255, q), lerp(A & 255, B & 255, q))
}

// ───────────────────────────────────────── the star transform (mirrors startalk.js drawStarChar)
const SC = { x: HALF, y: 19.6, R: 17.6, r: 9.4, round: 2.6 }
const FOOT_ROW = SC.y + SC.R * Math.cos(Math.PI / 5)
export const FOOT = (FOOT_ROW - HALF)            // cells below the centre where the lower tips sit
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
/** sprite cell → world point (ignores squash; for things held beside the star) */
export const cellToWorld = (F, i, j) => [F.ox - F.S / 2 + i * F.cell, F.oy - F.S / 2 - F.base + j * F.cell]

// ───────────────────────────────────────── worn accessories (sprite cells)
/** Virgo's reading glasses: square gold frames around both eyes (eyes stay visible) + a bridge + little arms */
export function glassesCells(ctx, alpha = 1) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const F = '#2a1840', H = '#f2c75c'
  const frame = (x0, x1, y0, y1) => {
    ctx.fillStyle = F
    ctx.fillRect(x0, y0, x1 - x0 + 1, 1); ctx.fillRect(x0, y1, x1 - x0 + 1, 1); ctx.fillRect(x0, y0, 1, y1 - y0 + 1); ctx.fillRect(x1, y0, 1, y1 - y0 + 1)
    ctx.fillStyle = H; ctx.fillRect(x0 + 1, y0, 2, 0.5)
    ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.fillRect(x0 + 1, y0 + 1, x1 - x0 - 1, y1 - y0 - 1)
  }
  frame(9, 16, 14, 23); frame(19, 26, 14, 23)
  ctx.fillStyle = F; ctx.fillRect(17, 16, 2, 1); ctx.fillRect(7, 16, 2, 1); ctx.fillRect(27, 16, 2, 1)
  ctx.restore()
}
/** Sag's shades, pushed up on the forehead (the top arm): two dark lenses wider than the arm + a bridge */
export function shadesCells(ctx, alpha = 1) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.fillStyle = INK; ctx.fillRect(11, 9, 6, 4); ctx.fillRect(19, 9, 6, 4); ctx.fillRect(16, 9.5, 4, 1)
  ctx.fillStyle = '#3a2a66'; ctx.fillRect(12, 10, 4, 2); ctx.fillRect(20, 10, 4, 2)
  ctx.fillStyle = '#7fe0ff'; ctx.fillRect(12, 10, 1.5, 0.8); ctx.fillRect(20, 10, 1.5, 0.8)
  ctx.restore()
}
/** tears from both eyes (cells). k: 1 sniffle · 2 streams · 3 fountains */
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

// ───────────────────────────────────────── bitmaps
export const BM = s => s.trim().split(/\s+/)
/** char bitmap painter: (x, y) is the anchor point at (ax, ay) of the bitmap; rot about it; flip mirrors horizontally */
export function bmp(ctx, rows, x, y, px, pal, { rot = 0, ax = 0.5, ay = 0.5, outline = null, alpha = 1, flip = false } = {}) {
  if (alpha <= 0 || px <= 0) return
  const w = rows[0].length, h = rows.length
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.translate(x, y); if (rot) ctx.rotate(rot); if (flip) ctx.scale(-1, 1)
  const ox = -w * px * ax, oy = -h * px * ay, c = px + 0.5
  if (outline) {
    ctx.fillStyle = outline
    rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) {
      if (row[i] === '.' || !pal[row[i]]) continue
      for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const r2 = rows[j + b], ch2 = r2 ? r2[i + a] : undefined; if (!ch2 || ch2 === '.' || !pal[ch2]) ctx.fillRect(ox + (i + a) * px, oy + (j + b) * px, c, c) }
    } })
  }
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const col = pal[row[i]]; if (!col) continue; ctx.fillStyle = col; ctx.fillRect(ox + i * px, oy + j * px, c, c) } })
  ctx.restore()
}

const CLIP = BM(`
....SSSS....
...SHSSSS...
BBBSSSSSSBBB
BPPPPPPPPPPB
BPKKKKKKKPPB
BPPPPPPPPPPB
BPGPKKKKKPPB
BPPPPPPPPPPB
BPGPKKKKPPPB
BPPPPPPPPPPB
BPRPKKKKKKPB
BPPPPPPPPPPB
BPPPPPPPPPPB
BBBBBBBBBBBB`)
const CLIP_PAL = { B: '#9a6a3a', S: '#c9d3e6', H: '#ffffff', P: '#fff8ea', K: '#8b84a8', G: '#2fbf6a', R: '#e04a5a' }
/** Virgo's clipboard (12 × 14 cells), anchored at its centre */
export function drawClipboard(ctx, x, y, px, rot = 0, alpha = 1) { bmp(ctx, CLIP, x, y, px, CLIP_PAL, { rot, outline: INK, alpha }) }

const PASS = BM(`
NNNNNNNNN
NNNNNNNNN
NNNYYYNNN
NNYNYNYNN
NNYYYYYNN
NNYNYNYNN
NNNYYYNNN
NNNNNNNNN
NNYYYYYNN
NNNNNNNNN
NNNNNNNNN`)
/** Sag's passport (9 × 11 cells): navy cover, gold globe */
export function drawPassport(ctx, x, y, px, rot = 0, alpha = 1) { bmp(ctx, PASS, x, y, px, { N: '#24307a', Y: '#f2c75c' }, { rot, outline: INK, alpha }) }

const PHONE = BM(`
KKKKKKK
KSSSSSK
KSWSSSK
KSSSSSK
KSSSSSK
KSSSSSK
KSSSSSK
KKKOKKK`)
export function drawPhone(ctx, x, y, px, rot = 0, alpha = 1) { bmp(ctx, PHONE, x, y, px, { K: '#2b2140', S: '#7fe0ff', W: '#ffffff', O: '#5a4a86' }, { rot, outline: INK, alpha }) }

const FLOWER = BM(`
.PP.PP.
PPPWPPP
.PYYYP.
PPYYYPP
.PPYPP.
...G...
.GGG...
...G.GG
...GGG.
...G...`)
/** a little flower (7 × 10 cells), anchored at the bottom of the stem */
export function drawFlower(ctx, x, y, px, rot = 0, alpha = 1) { bmp(ctx, FLOWER, x, y, px, { P: '#ff8fb1', W: '#ffe0ea', Y: '#f2c75c', G: '#4fc06a' }, { rot, ax: 0.5, ay: 1, outline: INK, alpha }) }

const TABLE = BM(`
..........F..........
.........FYF.........
.........WWW.........
.........WWW.........
CCCCCCCCCCCCCCCCCCCCC
CRCRCRCRCRCRCRCRCRCRC
DDDDDDDDDDDDDDDDDDDDD
.........DDD.........
.........DDD.........
.........DDD.........
.........DDD.........
.......DDDDDDD.......`)
/** the café table with a candle (21 × 12 cells), anchored at the bottom centre; flick 0/1 flickers the flame */
export function drawTable(ctx, x, y, px, t, alpha = 1) {
  const fl = Math.sin(t * 17) > 0
  bmp(ctx, TABLE, x, y, px, { F: fl ? '#ffb347' : '#ffd27a', Y: '#fff3c4', W: '#efe6d6', C: '#efe6d6', R: '#e04a5a', D: '#6a3f8a' }, { ax: 0.5, ay: 1, outline: INK, alpha })
}

/** the morning sun: a pixel disc with blocky rays, centre (x, y), radius r (px) */
export function drawSun(ctx, t, x, y, r, alpha = 1) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const g = ctx.createRadialGradient(x, y, r * 0.3, x, y, r * 3.2); g.addColorStop(0, 'rgba(255,200,110,0.55)'); g.addColorStop(1, 'rgba(255,160,90,0)')
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 3.2, 0, TAU); ctx.fill()
  const P = Math.max(4, Math.round(r / 7))
  for (let k = 0; k < 8; k++) {
    const a = k * TAU / 8 + t * 0.3, L = r * (1.35 + 0.12 * Math.sin(t * 4 + k))
    for (let s = 0; s < 3; s++) { const d = L + s * P * 1.4; ctx.fillStyle = s ? '#ffd27a' : '#ffe9a8'; ctx.fillRect(Math.round((x + Math.cos(a) * d) / P) * P - P / 2, Math.round((y + Math.sin(a) * d) / P) * P - P / 2, P, P) }
  }
  for (let j = -r; j <= r; j += P) for (let i = -r; i <= r; i += P) {
    const d = Math.hypot(i + P / 2, j + P / 2)
    if (d > r) continue
    ctx.fillStyle = d > r - P * 1.2 ? '#ffb347' : (i < -r * 0.2 && j < -r * 0.2 ? '#fff6cf' : '#ffd96b')
    ctx.fillRect(Math.round(x + i), Math.round(y + j), P, P)
  }
  ctx.restore()
}

/** a glyph coin (the sign badge, flying loose during the swap) */
export function drawCoin(ctx, x, y, r, glyph, col, rot = 0, alpha = 1) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot)
  ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(0, 0, r + 5, 0, TAU); ctx.fill()
  ctx.fillStyle = col; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fill()
  ctx.fillStyle = '#140c2c'; ctx.beginPath(); ctx.arc(0, 0, r * 0.78, 0, TAU); ctx.fill()
  ctx.font = `700 ${Math.round(r * 1.15)}px ${GLYPH_FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillStyle = '#fff3e0'; ctx.fillText(glyph + '︎', 0, r * 0.08)
  ctx.restore()
}

/** a shooting star: a bright pixel star head moving from a to b over [t0, t1], with a fading pixel trail */
export function shootingStar(ctx, t, t0, t1, a, b, { size = 46, trail = 14, col = '#fff3c4' } = {}) {
  if (t < t0 || t > t1 + 0.4) return null
  const u = clamp((t - t0) / (t1 - t0)), e = ease.inOutQuad(u)
  const hx = lerp(a.x, b.x, e), hy = lerp(a.y, b.y, e) - Math.sin(Math.PI * e) * (a.arc || 0)
  const fade = 1 - clamp((t - t1) / 0.4)
  ctx.save(); ctx.globalAlpha *= fade
  for (let k = trail; k >= 1; k--) {
    const uk = clamp(u - k * 0.022), ek = ease.inOutQuad(uk)
    const tx = lerp(a.x, b.x, ek), ty = lerp(a.y, b.y, ek) - Math.sin(Math.PI * ek) * (a.arc || 0)
    const s = Math.round(size * 0.42 * (1 - k / (trail + 1)))
    ctx.globalAlpha = fade * (1 - k / (trail + 1)) * 0.85
    ctx.fillStyle = k % 3 ? '#ffd27a' : '#ff8fb1'
    ctx.fillRect(Math.round(tx - s / 2), Math.round(ty - s / 2), s, s)
  }
  ctx.globalAlpha = fade
  ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(hx, hy, 0, hx, hy, size * 2.2); g.addColorStop(0, 'rgba(255,240,190,0.7)'); g.addColorStop(1, 'rgba(255,240,190,0)')
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(hx, hy, size * 2.2, 0, TAU); ctx.fill()
  ctx.globalCompositeOperation = 'source-over'
  drawPixelStar(ctx, hx, hy, size, 2, col)
  ctx.restore()
  return { x: hx, y: hy }
}

// ───────────────────────────────────────── panels + small fx
const step = (ctx, X, Y, w, h, P, col) => { ctx.fillStyle = col; ctx.fillRect(X + 2 * P, Y, w - 4 * P, h); ctx.fillRect(X, Y + 2 * P, w, h - 4 * P); ctx.fillRect(X + P, Y + P, w - 2 * P, h - 2 * P) }
export function pixelPanel(ctx, X, Y, w, h, { P = 8, fill = 'rgba(13,8,32,0.94)', border = '#f2c75c', glow = 0.5 } = {}) {
  ctx.save(); ctx.shadowColor = rgba(border, glow); ctx.shadowBlur = 30; step(ctx, X, Y, w, h, P, border); ctx.restore()
  step(ctx, X, Y, w, h, P, border)
  step(ctx, X + P, Y + P, w - 2 * P, h - 2 * P, P, INK)
  step(ctx, X + P * 1.5, Y + P * 1.5, w - 3 * P, h - 3 * P, P, fill)
  ctx.fillStyle = '#fff1c8'; ctx.fillRect(X + 2 * P, Y, P * 4, P / 2); ctx.fillRect(X, Y + 2 * P, P / 2, P * 3)
}
/** a pixel check mark (✓) centred at (x, y), k 0…1 draws it on */
export function checkMark(ctx, x, y, px, k = 1, col = '#7dffb0') {
  if (k <= 0) return
  const cells = [[0, 2], [1, 3], [2, 4], [3, 3], [4, 2], [5, 1], [6, 0]]
  const n = Math.ceil(cells.length * clamp(k))
  for (let i = 0; i < n; i++) { const [a, b] = cells[i]; ctx.fillStyle = INK; ctx.fillRect(x + (a - 3.5) * px - 2, y + (b - 2.5) * px - 2, px + 4, px * 2 + 4) }
  for (let i = 0; i < n; i++) { const [a, b] = cells[i]; ctx.fillStyle = col; ctx.fillRect(x + (a - 3.5) * px, y + (b - 2.5) * px, px, px * 2) }
}
const CONF_COLS = ['#f2c75c', '#ff8fb1', '#c9a6ff', '#7fe0ff', '#efe6d6', '#ff6b5b', '#9cf08a']
export function confetti(ctx, t, t0, { x0 = 540, y0 = 1300, n = 80, spread = 1, up = 1, seed = 1, life = 5.5 } = {}) {
  const dt0 = t - t0
  if (dt0 < 0 || dt0 > life) return
  const r = rng(seed * 977 + 3), k = 1.5, vty = 330
  for (let i = 0; i < n; i++) {
    const delay = r() * 0.18, vx0 = (r() - 0.5) * 2100 * spread, vy0 = -(1500 + r() * 1300) * up, spin = 4 + r() * 9, sz = 12 + r() * 12, col = CONF_COLS[Math.floor(r() * CONF_COLS.length)], ph = r() * TAU, sway = 30 + r() * 50
    const dt = dt0 - delay
    if (dt < 0) continue
    const e = (1 - Math.exp(-k * dt)) / k, xx = x0 + vx0 * e + Math.sin(dt * 3 + ph) * sway * clamp(dt), yy = y0 + vty * dt + (vy0 - vty) * e
    if (yy > 2000) continue
    ctx.save(); ctx.globalAlpha = clamp((life - dt0) / 0.6); ctx.translate(xx, yy); ctx.rotate(ph + dt * spin * 0.4); ctx.scale(Math.cos(dt * spin + ph), 1)
    ctx.fillStyle = col; ctx.fillRect(-sz / 2, -sz * 0.35, sz, sz * 0.7); ctx.restore()
  }
}
export function sparkBurst(ctx, t, cx, cy, t0, { n = 12, R = 200, size = 28, seed = 1, cols = ['#f2c75c', '#efe6d6', '#ff8fb1', '#c9a6ff'], life = 0.7 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  const p = ease.outCubic(tt / life)
  ctx.save(); ctx.globalAlpha *= 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) { const a = (i / n) * TAU + seed, rr = R * (0.45 + 0.75 * p) * (i % 2 ? 0.8 : 1); drawPixelStar(ctx, cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, size * (1 - 0.45 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
  ctx.restore()
}
const HEART = BM(`.XX.XX. XWXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
export function drawHeart(ctx, x, y, px, col = '#ff5c8a', alpha = 1) { bmp(ctx, HEART, x, y, px, { X: col, W: '#ffe0ea' }, { alpha, outline: INK }) }
export function drawHearts(ctx, t, t0, x, y, { n = 6, px = 7, spread = 140, life = 1.6, rise = 260, cols = ['#ff5c8a', '#ff8fb1', '#f2c75c'], alpha = 1 } = {}) {
  for (let i = 0; i < n; i++) {
    const k = (t - t0 - i * 0.18) / life
    if (k < 0 || k > 1) continue
    const hx = x + (((i * 53) % 7) / 6 - 0.5) * spread + Math.sin(k * 6 + i) * 12
    bmp(ctx, HEART, hx, y - k * rise, px, { X: cols[i % cols.length], W: '#ffe0ea' }, { alpha: alpha * Math.sin(Math.PI * k), outline: INK })
  }
}
export function dizzyStars(ctx, t, x, y, r, { n = 3, size = 24, alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  for (let i = 0; i < n; i++) { const a = t * 5 + i * TAU / n; drawPixelStar(ctx, x + Math.cos(a) * r, y + Math.sin(a) * r * 0.32, size, 1, ['#f2c75c', '#efe6d6', '#ff8fb1'][i % 3]) }
  ctx.restore()
}
export function steamPuffs(ctx, t, x, y, px, k = 1) {
  if (k <= 0) return
  for (let s = 0; s < 4; s++) {
    const ph = (t * 1.7 + s * 0.25) % 1, side = s % 2 ? 1 : -1
    const sx = x + side * (2 + ph * 7) * px, sy = y - ph * 10 * px
    ctx.save(); ctx.globalAlpha = k * Math.sin(Math.PI * ph) * 0.9
    ctx.fillStyle = INK; ctx.fillRect(sx - px * 1.6, sy - px * 1.6, px * 3.2, px * 3.2)
    ctx.fillStyle = '#f4f0ff'; ctx.fillRect(sx - px * 1.1, sy - px * 1.1, px * 2.2, px * 2.2)
    ctx.restore()
  }
}
const DROP = BM(`..X.. .XWX. XWWXX XWXXX .XXX.`)
export function sweatDrop(ctx, t, x, y, px, alpha = 1) { const ph = (t * 1.4) % 1; bmp(ctx, DROP, x, y + ph * px * 6, px, { X: '#7fd0f0', W: '#ffffff' }, { alpha: alpha * (1 - ph * 0.6), outline: INK }) }
/** a mono word that floats up and fades (sfx lettering: "wheee", "zzz", "ring!") */
export function floatWord(ctx, t, t0, text, x, y, { size = 34, col = '#efe6d6', life = 1.1, rise = 60, rot = 0 } = {}) {
  const k = (t - t0) / life
  if (k < 0 || k > 1) return
  ctx.save(); ctx.globalAlpha = Math.sin(Math.PI * Math.min(1, k * 1.3)) ** 0.6 * (1 - k * 0.3)
  ctx.translate(x, y - k * rise); ctx.rotate(rot)
  const s = 0.7 + 0.3 * Math.min(1, k * 5)
  ctx.scale(s, s)
  ctx.font = `700 ${size}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.lineWidth = 9; ctx.lineJoin = 'round'; ctx.strokeStyle = INK; ctx.strokeText(text, 0, 0)
  ctx.fillStyle = col; ctx.fillText(text, 0, 0)
  ctx.restore()
}
