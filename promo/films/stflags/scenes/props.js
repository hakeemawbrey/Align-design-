// stflags props: the game-show set for "Red Flag, Green Flag." (Star Talk season 3 #13). Small pixel drawings on canvas,
// crisp rectangles at one art pixel = P px (P = 6 matches the contestant stars' sprite cells). Every function is a pure
// draw call of its arguments (time comes in as t); nothing touches `document` at load.
//
//   starFrame(x, y, size, t, opts) / inSprite(ctx, F, fn) / cellToWorld(F, i, j)   draw props in a star's sprite cells
//   leoSuitCells(ctx, t)            Leo's sequined host jacket, white shirt V and gold bow tie (cells)
//   crownCells(ctx)                 Leo's tiny crown on its top point (cells)
//   tearsCells(ctx, t, k)           happy tears, k: 1 sniffle · 2 streams · 3 fountains (cells)
//   sweatCells(ctx, t, k)           nervous sweat beads + drips on the brow, k 1…3 (cells)
//   hankieCells(ctx, side)          the brow-mopping hankie (cells)
//   drawPodium / drawButtons        a contestant podium (name window, bulbs) and its green + red buzzers on top
//   drawFlag                        a pixel flag on a pole that pops up out of a podium, waving
//   drawLectern / drawBigBuzzer     the host lectern and the giant red buzzer on it
//   drawScoreBox                    an LED score box (RED / GREEN) with a big pixel digit, or a glitch
//   drawMarquee                     the show sign with chasing bulbs
//   drawTruss / drawRiser / drawFloor / spotCone      the set
//   drawBoard                       the on-screen question board (screen space) with chasing bulbs and tabs
//   drawSign                        Pisces' ring-card placard
//   drawPlane / drawHangLamp / drawPuff / drawMiniFlag   gag props
//   drawDealCard                    YOUR CARD with dealbreakers as red flags (the tie-in)
//   confetti                        a confetti cannon burst (analytic, pure f(t))
import { clamp, lerp, rng } from '../../../src/lib.js'

export const INK = '#1b1236'
const TAU = Math.PI * 2
const G = 36, HALF = 18, SC_Y = 19.6, SC_R = 17.6
const FOOT_ROW = SC_Y + SC_R * Math.cos(Math.PI / 5)
export const RED = '#ff4b5c', RED_D = '#b8263f', RED_L = '#ff9aa3'
export const GRN = '#39dd7e', GRN_D = '#17904d', GRN_L = '#b5ffd0'
export const GOLD = '#f2c75c'
const GOLD_D = '#b88a2a', GOLD_HI = '#fff1c8', BONE = '#efe6d6'
const SET_D = '#1d1440', SET = '#2b1f52', SET_L = '#3d2c6e', SET_HL = '#5a46a0'
const SLAB = '#7d68c2', SLAB_HI = '#a996e6', SLAB_LO = '#55429a'
const CHROME = '#c9c2e6', CHROME_HI = '#f4f0ff', CHROME_LO = '#6e6694'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SERIF = "'EB Garamond', Georgia, serif"
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ─────────────────────────────── star transform (mirrors startalk.js drawStarChar exactly)
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
/** sprite cell → world point (ignores squash; for spawning things that leave the star) */
export const cellToWorld = (F, i, j) => [F.ox - F.S / 2 + i * F.cell, F.oy - F.S / 2 - F.base + j * F.cell]

// ─────────────────────────────── helpers
export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } } })
}
const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)) }
function paintCells(ctx, cells, outline = INK) {
  const key = new Set(cells.map(([i, j]) => i + ',' + j))
  if (outline) {
    ctx.fillStyle = outline
    for (const [i, j] of cells) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!key.has((i + a) + ',' + (j + b))) ctx.fillRect(i + a, j + b, 1.02, 1.02)
  }
  for (const [i, j, c] of cells) { ctx.fillStyle = c; ctx.fillRect(i, j, 1.02, 1.02) }
}
const hash2 = (i, j) => { let h = (i * 374761393 + j * 668265263) >>> 0; h = (h ^ (h >>> 13)) * 1274126177 >>> 0; return (h & 0xffff) / 65536 }

// the star's body mask (same maths as startalk.js), for clothes that follow the silhouette
let MASK = null
function starMask() {
  if (MASK) return MASK
  const SC = { x: HALF, y: 19.6, R: 17.6, r: 9.4, round: 2.6 }
  const V = [], R0 = SC.R - SC.round, r0 = SC.r - SC.round * 0.55
  for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r0 : R0; V.push([SC.x + Math.cos(a) * rr, SC.y + Math.sin(a) * rr]) }
  const sd = (px, py) => {
    let d = (px - V[0][0]) ** 2 + (py - V[0][1]) ** 2, s = 1
    for (let i = 0, j = V.length - 1; i < V.length; j = i, i++) {
      const ex = V[j][0] - V[i][0], ey = V[j][1] - V[i][1], wx = px - V[i][0], wy = py - V[i][1]
      const h = clamp((wx * ex + wy * ey) / (ex * ex + ey * ey), 0, 1), bx = wx - ex * h, by = wy - ey * h
      d = Math.min(d, bx * bx + by * by)
      const c1 = py >= V[i][1], c2 = py < V[j][1], c3 = ex * wy > ey * wx
      if ((c1 && c2 && c3) || (!c1 && !c2 && !c3)) s = -s
    }
    return s * Math.sqrt(d) - SC.round
  }
  MASK = new Uint8Array(G * G)
  for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) if (sd(i + 0.5, j + 0.5) <= 0) MASK[j * G + i] = 1
  return MASK
}
const inMask = (i, j) => i >= 0 && j >= 0 && i < G && j < G && starMask()[j * G + i] === 1

// ─────────────────────────────── Leo: the sequined host suit
const SEQ = ['#c9369e', '#b02a8a', '#de4fb6']
/** jacket over the lower body + sleeve cuffs on the arm tips, a white shirt V, a gold bow tie (sprite cells) */
export function leoSuitCells(ctx, t, { sparkle = 1 } = {}) {
  const V = { 26: [14, 21], 27: [15, 20], 28: [16, 19], 29: [17, 18] }     // the shirt V (inclusive columns)
  for (let j = 24; j < G; j++) for (let i = 0; i < G; i++) {
    if (!inMask(i, j)) continue
    const jacket = j >= 26 || ((i <= 4 || i >= 31) && j >= 11 && j <= 18)
    if (!jacket) continue
    const v = V[j]
    if (v && i >= v[0] && i <= v[1]) { ctx.fillStyle = (i === v[0] || i === v[1]) ? '#7a1f63' : '#fffaf0'; ctx.fillRect(i, j, 1.02, 1.02); continue }
    const h = hash2(i, j)
    let c = SEQ[Math.floor(h * 3)]
    const ph = (t * (0.9 + h * 0.8) + h * 7) % 1
    if (sparkle && ph < 0.07) c = '#fff6fd'
    else if (sparkle && ph < 0.14) c = '#ffc6ea'
    if (!inMask(i, j + 1) || !inMask(i + 1, j) || !inMask(i - 1, j)) c = '#7a1f63'
    ctx.fillStyle = c; ctx.fillRect(i, j, 1.02, 1.02)
  }
  // sleeve cuffs on the two side points
  for (let j = 11; j <= 18; j++) for (let i = 0; i < G; i++) {
    if (!inMask(i, j)) continue
    if (i === 5 || i === 30) { ctx.fillStyle = '#7a1f63'; ctx.fillRect(i, j, 1.02, 1.02) }
  }
  // the bow tie (gold) at the top of the V
  paintCells(ctx, [[15, 25, GOLD], [16, 25, GOLD_D], [19, 25, GOLD_D], [20, 25, GOLD], [15, 26, GOLD], [16, 26, GOLD], [17, 26, GOLD_HI], [18, 26, GOLD], [19, 26, GOLD], [20, 26, GOLD], [15, 27, GOLD_D], [16, 27, GOLD], [19, 27, GOLD], [20, 27, GOLD_D]])
}
export function crownCells(ctx, rot = -0.12) {
  ctx.save(); ctx.translate(18, 2.6); ctx.rotate(rot)
  bitmap(ctx, ['L...L...L', 'GL.LGL.LG', 'GGLGGGLGG', 'GGGGGGGGG', 'GRGGBGGRG', 'LLLLLLLLL'], { L: '#7a4a10', G: '#ffd23f', R: '#ff3d6e', B: '#38c4ec' }, -4.5, -6, 1)
  ctx.fillStyle = '#fff6c0'; ctx.fillRect(-3.5, -4, 1, 1)
  ctx.restore()
}
/** a long host mic held up by the right point (cells) */
export function micCells(ctx, up = 0) {
  const y0 = 4 - up * 2
  paintCells(ctx, [[33, y0, '#9aa0c8'], [34, y0, '#c9cdee'], [35, y0, '#9aa0c8'], [33, y0 + 1, '#6e7399'], [34, y0 + 1, '#9aa0c8'], [35, y0 + 1, '#6e7399'], [33, y0 + 2, '#9aa0c8'], [34, y0 + 2, '#c9cdee'], [35, y0 + 2, '#9aa0c8'],
    ...Array.from({ length: 8 }, (_, k) => [34, y0 + 3 + k, k < 1 ? GOLD : '#2c2f4c'])])
}

// ─────────────────────────────── tears / sweat / hankie (cells)
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
export function sweatCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j, big) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.2, j - 0.2, big ? 2.4 : 1.4, big ? 2.9 : 1.9); ctx.fillStyle = '#bfefff'; ctx.fillRect(i, j, big ? 2 : 1, big ? 2.5 : 1.5); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.6, 0.6) }
  // beads on the brow (top point's base) that slide down
  const spots = [[13.2, 10.5], [22.2, 10.2], [16.8, 8.2], [24.5, 12.4], [11.2, 12.6]]
  for (let q = 0; q < Math.min(spots.length, 1 + k * 2); q++) {
    const ph = ((t * (0.45 + q * 0.11) + q * 0.37) % 1)
    drop(spots[q][0], spots[q][1] + ph * 3.5, q === 0 && k >= 2)
  }
}
export function hankieCells(ctx, side) {
  const x0 = side < 0 ? 8 : 20, cells = []
  for (let j = 0; j < 5; j++) for (let i = 0; i < 7; i++) cells.push([x0 + i, 8 + j, (i === 0 || j === 0 || i === 6 || j === 4) ? '#ff8fb1' : (i + j) % 3 ? '#fff6ee' : '#ffd6e2'])
  paintCells(ctx, cells)
}

// ─────────────────────────────── podium + buzzers
/** a dome of wc × hc art pixels standing on (cx, baseY): lit → brighter + glow */
function dome(ctx, cx, baseY, wc, hc, P, col, hi, lo, lit = 0) {
  if (lit > 0) {
    ctx.save(); ctx.globalCompositeOperation = 'lighter'
    const g = ctx.createRadialGradient(cx, baseY - hc * P * 0.5, 0, cx, baseY - hc * P * 0.5, wc * P * 1.5)
    g.addColorStop(0, rgba(col, 0.55 * lit)); g.addColorStop(1, rgba(col, 0))
    ctx.fillStyle = g; ctx.fillRect(cx - wc * P * 1.5, baseY - hc * P * 0.5 - wc * P * 1.5, wc * P * 3, wc * P * 3); ctx.restore()
  }
  const rows = []
  for (let j = 0; j < hc; j++) { const yy = (hc - j - 0.5) / hc; rows.push(Math.max(1, Math.round((wc / 2) * Math.sqrt(Math.max(0, 1 - yy * yy * 0.92))))) }
  rows.forEach((hw, j) => { R(ctx, cx - (hw + 1) * P, baseY - (hc - j + 1) * P, (2 * hw + 2) * P, 2 * P, INK) })
  rows.forEach((hw, j) => {
    const y = baseY - (hc - j) * P
    R(ctx, cx - hw * P, y, 2 * hw * P, P, col)
    R(ctx, cx + (hw - 1) * P, y, P, P, lo)
    if (j === 1 || (hc <= 2 && j === 0)) R(ctx, cx - (hw - 1) * P, y, Math.min(2, hw) * P, P, hi)
  })
}
/** the podium front + top slab. (x, top) = top-centre of the slab. vote: null | 'G' | 'R'. flash 0…1 after a buzz */
export function drawPodium(ctx, x, top, { glyph = '', name = '', color = BONE, vote = null, flash = 0, t = 0, P = 6, seed = 0 } = {}) {
  const w = 35 * P, h = 28 * P, L = Math.round(x - w / 2)
  R(ctx, L - P, top - P, w + 2 * P, h + 2 * P, INK)
  // panel (inset 1P under the slab)
  const pl = L + P, pw = w - 2 * P, py = top + 3 * P, ph = h - 3 * P
  R(ctx, pl, py, pw, ph, SET); R(ctx, pl, py, P, ph, SET_L); R(ctx, pl + pw - P, py, P, ph, SET_D)
  R(ctx, L, py, P, ph, INK); R(ctx, L + w - P, py, P, ph, INK)
  R(ctx, pl, py, pw, P, GOLD); R(ctx, pl + 2 * P, py, 4 * P, P / 2, GOLD_HI)
  // top slab
  R(ctx, L, top, w, 3 * P, SLAB); R(ctx, L, top, w, P, SLAB_HI); R(ctx, L, top + 2 * P, w, P, SLAB_LO)
  // the name window
  const vc = vote === 'G' ? GRN : vote === 'R' ? RED : null
  const wx = pl + 2 * P, wy = top + 6 * P, ww = pw - 4 * P, wh = 8 * P
  R(ctx, wx - P, wy - P, ww + 2 * P, wh + 2 * P, vc || SET_HL)
  R(ctx, wx, wy, ww, wh, vote === 'G' ? '#0d3a24' : vote === 'R' ? '#3d0c1c' : '#120a2a')
  if (flash > 0 && vc) R(ctx, wx, wy, ww, wh, rgba(vc, 0.55 * flash))
  ctx.save(); ctx.textBaseline = 'middle'; ctx.textAlign = 'left'
  const fs = Math.round(3.9 * P)
  ctx.font = `700 ${fs}px ${GLYPH_FONT}`
  const gw = ctx.measureText(glyph + '︎').width
  ctx.font = `700 ${fs}px ${MONO}`
  const nw = ctx.measureText(name).width
  const tot = gw + P + nw, x0 = x - tot / 2, ym = wy + wh / 2 + P * 0.2
  ctx.font = `700 ${fs}px ${GLYPH_FONT}`; ctx.fillStyle = color; ctx.fillText(glyph + '︎', x0, ym)
  ctx.font = `700 ${fs}px ${MONO}`; ctx.fillStyle = vc ? (vote === 'G' ? GRN_L : RED_L) : BONE; ctx.fillText(name, x0 + gw + P, ym)
  ctx.restore()
  // bulbs
  const n = 8, by = top + 17 * P
  for (let i = 0; i < n; i++) {
    const bx = pl + 2 * P + i * ((pw - 6 * P) / (n - 1))
    const on = vc && flash > 0 ? (Math.floor(t * 10) + i) % 2 === 0 : (Math.floor(t * 5 + seed) + i) % 3 === 0
    const c = on ? (vc && flash > 0 ? vc : '#ffe08a') : (vc ? (vote === 'G' ? '#1d6b44' : '#6b1d2c') : '#6a4d24')
    R(ctx, bx - P, by - P, 3 * P, 3 * P, INK); R(ctx, bx - P / 2, by - P / 2, 2 * P, 2 * P, c)
    if (on) R(ctx, bx - P / 2, by - P / 2, P, P, '#fffbea')
  }
  // kick plate
  R(ctx, pl, top + 23 * P, pw, 5 * P, SET_D); R(ctx, pl, top + 23 * P, pw, P / 2, GOLD_D)
}
/** the two buzzers on the slab: green (left) at x − 13P, red (right) at x + 13P. press/lit: [green, red] 0…1 */
export function drawButtons(ctx, x, top, { press = [0, 0], lit = [0, 0], P = 6 } = {}) {
  const spots = [[x - 13 * P, GRN, GRN_L, GRN_D], [x + 13 * P, RED, RED_L, RED_D]]
  spots.forEach(([cx, col, hi, lo], k) => {
    const pk = clamp(press[k]), lk = clamp(lit[k])
    // chrome base ring
    R(ctx, cx - 5 * P, top - 2 * P, 10 * P, 2 * P, INK)
    R(ctx, cx - 4 * P, top - 2 * P + P / 2, 8 * P, P, CHROME); R(ctx, cx - 4 * P, top - 2 * P + P / 2, 3 * P, P / 2, CHROME_HI); R(ctx, cx + 2 * P, top - P, 2 * P, P / 2, CHROME_LO)
    const hc = Math.max(1, Math.round(3 - 2 * pk))
    dome(ctx, cx, top - 2 * P, 6, hc, P, lk > 0 ? hi : col, '#ffffff', lk > 0 ? col : lo, lk)
  })
}

// ─────────────────────────────── flag on a pole (pops out of the podium)
/** (px, baseY) = the foot of the pole. k 0…1 = how far it has risen. vote 'G' | 'R'. side ±1 = which way the cloth flies */
export function drawFlag(ctx, px, baseY, { k = 1, vote = 'R', t = 0, side = 1, P = 6, H = 46, seed = 0, alpha = 1 } = {}) {
  if (k <= 0.01 || alpha <= 0) return
  const top = baseY - H * P * k
  const col = vote === 'G' ? GRN : RED, hi = vote === 'G' ? GRN_L : RED_L, lo = vote === 'G' ? GRN_D : RED_D
  ctx.save(); ctx.globalAlpha *= alpha
  // pole
  R(ctx, px - P, top, 2 * P, baseY - top, INK); R(ctx, px - P / 2, top, P, baseY - top, '#d8d0f0'); R(ctx, px - P / 2, top, P / 2, baseY - top, '#ffffff')
  // the cloth: 15 columns, waving (more at the free end)
  if (k > 0.25) {
    const cw = 15, chh = 9, ck = clamp((k - 0.25) / 0.5)
    for (let c = 0; c < cw; c++) {
      const u = c / (cw - 1), ph = t * 6.5 - c * 0.62 + seed
      const yo = Math.round(Math.sin(ph) * 1.25 * (0.2 + u)) * P
      const xx = side > 0 ? px + P + c * P : px - P - (c + 1) * P
      const hh = Math.round(chh * ck) * P
      if (hh <= 0) continue
      R(ctx, xx, top + yo - P + P, P, hh + P, INK)
      const sh = Math.cos(ph)
      const base = sh > 0.45 ? hi : sh < -0.45 ? lo : col
      R(ctx, xx, top + yo + P, P, hh - P, base)
      R(ctx, xx, top + yo + P, P, P, sh > -0.45 ? hi : col)
      R(ctx, xx, top + yo + hh - P, P, P, lo)
      if (c === cw - 1) R(ctx, side > 0 ? xx + P : xx - P, top + yo, P, hh + P, INK)
    }
    // the top edge outline
  }
  // finial
  R(ctx, px - 1.5 * P, top - 2.5 * P, 3 * P, 3 * P, INK); R(ctx, px - P, top - 2 * P, 2 * P, 2 * P, GOLD); R(ctx, px - P, top - 2 * P, P, P, GOLD_HI)
  ctx.restore()
}

// ─────────────────────────────── the host lectern + the giant buzzer
export function drawLectern(ctx, x, top, { P = 6, t = 0, w = 30, h = 22 } = {}) {
  const W2 = w * P, H2 = h * P, L = Math.round(x - W2 / 2)
  R(ctx, L - P, top - P, W2 + 2 * P, H2 + 2 * P, INK)
  R(ctx, L + P, top + 3 * P, W2 - 2 * P, H2 - 3 * P, '#3a1f5e'); R(ctx, L + P, top + 3 * P, P, H2 - 3 * P, '#4e2a7a'); R(ctx, L + W2 - 2 * P, top + 3 * P, P, H2 - 3 * P, '#26123f')
  R(ctx, L, top, W2, 3 * P, GOLD); R(ctx, L, top, W2, P, GOLD_HI); R(ctx, L, top + 2 * P, W2, P, GOLD_D)
  // a big pixel star emblem with a twinkle
  const star = ['.....X.....', '....XXX....', 'XXXXXXXXXXX', '.XXXXXXXXX.', '..XXXXXXX..', '..XXX.XXX..', '.XX.....XX.']
  bitmap(ctx, star, { X: GOLD }, x - 5.5 * P, top + 6 * P, P)
  if ((t * 0.7) % 1 < 0.1) R(ctx, x - 0.5 * P, top + 6 * P, P, P, '#ffffff')
  // bulb strip
  for (let i = 0; i < 9; i++) {
    const bx = L + 3 * P + i * ((W2 - 6 * P) / 8), on = (Math.floor(t * 6) + i) % 2 === 0
    R(ctx, bx - P, top + 16 * P, 2 * P, 2 * P, on ? '#ffe08a' : '#6a4d24')
  }
  R(ctx, L + P, top + H2 - 3 * P, W2 - 2 * P, 3 * P, '#1d0f33')
}
/** the giant buzzer: a red dome on a chrome base, (cx, baseY) = base bottom centre. press 0…1, lit 0…1 */
export function drawBigBuzzer(ctx, cx, baseY, { P = 6, press = 0, lit = 0, col = RED, hi = RED_L, lo = RED_D } = {}) {
  R(ctx, cx - 13 * P, baseY - 3 * P, 26 * P, 3 * P, INK)
  R(ctx, cx - 12 * P, baseY - 3 * P + P / 2, 24 * P, 2 * P, CHROME); R(ctx, cx - 12 * P, baseY - 3 * P + P / 2, 8 * P, P / 2, CHROME_HI); R(ctx, cx + 6 * P, baseY - 2 * P, 6 * P, P, CHROME_LO)
  const hc = Math.max(2, Math.round(7 - 5 * clamp(press)))
  dome(ctx, cx, baseY - 3 * P, 18, hc, P, lit > 0 ? hi : col, '#ffffff', lit > 0 ? col : lo, lit)
}

// ─────────────────────────────── LED score box
const FONT5 = {
  0: ['XXX', 'X.X', 'X.X', 'X.X', 'XXX'], 1: ['.X.', 'XX.', '.X.', '.X.', 'XXX'], 2: ['XXX', '..X', 'XXX', 'X..', 'XXX'], 3: ['XXX', '..X', '.XX', '..X', 'XXX'],
  4: ['X.X', 'X.X', 'XXX', '..X', '..X'], 5: ['XXX', 'X..', 'XXX', '..X', 'XXX'], 6: ['XXX', 'X..', 'XXX', 'X.X', 'XXX'], 7: ['XXX', '..X', '.X.', '.X.', '.X.'],
  8: ['XXX', 'X.X', 'XXX', 'X.X', 'XXX'], 9: ['XXX', 'X.X', 'XXX', '..X', 'XXX'], E: ['XXX', 'X..', 'XX.', 'X..', 'XXX'], R: ['XX.', 'X.X', 'XX.', 'X.X', 'X.X'], '?': ['XXX', '..X', '.X.', '...', '.X.'], '!': ['.X.', '.X.', '.X.', '...', '.X.'],
}
function ledText(ctx, s, cx, cy, px, col, glow = true) {
  const chars = String(s).split(''), wC = chars.length * 4 - 1
  let x0 = cx - (wC * px) / 2
  for (const ch of chars) {
    const bm = FONT5[ch]; if (!bm) { x0 += 4 * px; continue }
    if (glow) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; bitmap(ctx, bm, { X: rgba(col, 0.25) }, x0 - px * 0.5, cy - 2.5 * px - px * 0.5, px * 1.33); ctx.restore() }
    bitmap(ctx, bm, { X: col }, x0, cy - 2.5 * px, px)
    x0 += 4 * px
  }
}
/** an LED score box. value: a number or a string of FONT5 chars. glitch 0…1 */
export function drawScoreBox(ctx, cx, top, { label = 'RED', value = 0, col = RED, P = 6, t = 0, glitch = 0, seed = 1, flash = 0 } = {}) {
  const w = 24 * P, h = 18 * P, L = cx - w / 2
  R(ctx, L - P, top - P, w + 2 * P, h + 2 * P, INK)
  R(ctx, L, top, w, h, SET_L); R(ctx, L + P, top + 5 * P, w - 2 * P, h - 6 * P, '#0b0618')
  R(ctx, L + P, top + P, w - 2 * P, 3 * P, col)
  ctx.save(); ctx.font = `700 ${Math.round(2.6 * P)}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = INK
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${Math.round(P * 0.5)}px`
  ctx.fillText(label, cx, top + 2.6 * P)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
  ctx.restore()
  const cy = top + 11.5 * P
  if (flash > 0) R(ctx, L + P, top + 5 * P, w - 2 * P, h - 6 * P, rgba(col, 0.35 * flash))
  if (glitch > 0.02) {
    const r = rng(Math.floor(t * 14) * 31 + seed)
    const pick = r()
    const s = pick < 0.35 * glitch ? 'ERR' : pick < 0.55 ? String(Math.floor(r() * 10)) + String(Math.floor(r() * 10)) : pick < 0.7 ? '??' : String(value)
    const c = r() < 0.5 * glitch ? (col === RED ? GRN : RED) : col
    ledText(ctx, s, cx + (r() - 0.5) * 4 * P * glitch, cy, s.length > 2 ? 1.6 * P : 2 * P, c)
    // tear lines
    for (let k = 0; k < 3; k++) { if (r() > glitch) continue; const yy = top + 5 * P + r() * (h - 7 * P); R(ctx, L + P, yy, w - 2 * P, P * (0.5 + r()), rgba(r() < 0.5 ? '#7fe0ff' : '#ff8fd0', 0.6)) }
  } else ledText(ctx, String(value), cx, cy, String(value).length > 2 ? 1.6 * P : 2 * P, col)
}

// ─────────────────────────────── the set
/** the show sign: RED FLAG ✦ GREEN FLAG on a dark board with chasing bulbs. (cx, top), w × h px */
export function drawMarquee(ctx, cx, top, w, h, t, { P = 6, glitch = 0, allGreen = 0 } = {}) {
  const L = cx - w / 2
  R(ctx, L - P, top - P, w + 2 * P, h + 2 * P, INK)
  R(ctx, L, top, w, h, GOLD_D); R(ctx, L + P, top + P, w - 2 * P, h - 2 * P, GOLD); R(ctx, L + 2 * P, top + 2 * P, w - 4 * P, h - 4 * P, INK); R(ctx, L + 3 * P, top + 3 * P, w - 6 * P, h - 6 * P, '#140b2c')
  // bulbs around the border
  const per = 2 * (w + h), step = 7 * P, nB = Math.floor(per / step)
  for (let i = 0; i < nB; i++) {
    let d = i * step, bx, by
    if (d < w) { bx = L + d; by = top } else if ((d -= w) < h) { bx = L + w; by = top + d } else if ((d -= h) < w) { bx = L + w - d; by = top + h } else { d -= w; bx = L; by = top + h - d }
    const on = (i + Math.floor(t * 8)) % 3 === 0
    R(ctx, bx - P, by - P, 2 * P, 2 * P, on ? (allGreen > 0.5 ? GRN_L : '#fff1c8') : (allGreen > 0.5 ? GRN_D : '#8a6420'))
  }
  ctx.save(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  const fs = Math.round(h * 0.42)
  ctx.font = `800 ${fs}px ${INTER}`
  const a = 'RED FLAG', b = 'GREEN FLAG', gap = fs * 1.05
  const wa = ctx.measureText(a).width, wb = ctx.measureText(b).width, tot = wa + gap + wb
  const xa = cx - tot / 2 + wa / 2, xb = cx + tot / 2 - wb / 2
  const jit = glitch > 0 ? (rng(Math.floor(t * 20) + 3)() - 0.5) * 10 * glitch : 0
  const ca = allGreen > 0.5 ? GRN : RED
  ctx.lineWidth = Math.max(4, P); ctx.strokeStyle = INK
  ctx.strokeText(a, xa + jit, top + h / 2 + P * 0.4); ctx.fillStyle = ca; ctx.fillText(a, xa + jit, top + h / 2 + P * 0.4)
  ctx.strokeText(b, xb - jit, top + h / 2 + P * 0.4); ctx.fillStyle = GRN; ctx.fillText(b, xb - jit, top + h / 2 + P * 0.4)
  ctx.restore()
  // the ✦ between
  const sx = cx - tot / 2 + wa + gap / 2
  bitmap(ctx, ['..X..', '.XXX.', 'XXXXX', '.XXX.', '..X..'], { X: GOLD }, sx - 2.5 * P, top + h / 2 - 2.5 * P, P)
}
/** a lighting truss across the top with lamp cans (their lenses glow) */
export function drawTruss(ctx, x0, x1, y, t, { P = 6, lamps = [], on = 1 } = {}) {
  R(ctx, x0, y - P, x1 - x0, 6 * P, INK)
  R(ctx, x0, y, x1 - x0, P, '#8d84ab'); R(ctx, x0, y + 3 * P, x1 - x0, P, '#8d84ab')
  for (let xx = x0; xx < x1; xx += 6 * P) { R(ctx, xx, y, P, 4 * P, '#6e6694'); for (let k = 0; k < 3; k++) R(ctx, xx + (k + 1) * P, y + k * P + P, P, P, '#6e6694') }
  for (const [lx, col] of lamps) {
    R(ctx, lx - 3 * P, y + 4 * P, 6 * P, 6 * P, INK); R(ctx, lx - 2 * P, y + 4 * P, 4 * P, 4 * P, '#3a3352'); R(ctx, lx - 2 * P, y + 8 * P, 4 * P, P, on > 0 ? col : '#3a3352')
  }
}
/** soft additive light cone from (x0, y0) to a pool at (x1, y1) */
export function spotCone(ctx, x0, y0, x1, y1, w0, w1, col, a) {
  if (a <= 0.005) return
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createLinearGradient(0, y0, 0, y1)
  g.addColorStop(0, rgba(col, 0.02 * a)); g.addColorStop(0.55, rgba(col, 0.09 * a)); g.addColorStop(1, rgba(col, 0.17 * a))
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x0 - w0 / 2, y0); ctx.lineTo(x0 + w0 / 2, y0); ctx.lineTo(x1 + w1 / 2, y1); ctx.lineTo(x1 - w1 / 2, y1); ctx.closePath(); ctx.fill()
  const p = ctx.createRadialGradient(x1, y1, 0, x1, y1, w1 * 0.7)
  p.addColorStop(0, rgba(col, 0.2 * a)); p.addColorStop(1, rgba(col, 0))
  ctx.fillStyle = p; ctx.beginPath(); ctx.ellipse(x1, y1, w1 * 0.7, w1 * 0.16, 0, 0, TAU); ctx.fill()
  ctx.restore()
}
/** the low set wall behind the contestants (Leo's riser), gold pinstripes and a bulb edge */
export function drawRiser(ctx, x0, x1, top, bottom, t, { P = 6 } = {}) {
  R(ctx, x0, top - P, x1 - x0, bottom - top + P, INK)
  R(ctx, x0, top, x1 - x0, bottom - top, '#24183f')
  R(ctx, x0, top, x1 - x0, P, SET_HL)
  for (let xx = x0 + 9 * P; xx < x1; xx += 18 * P) R(ctx, xx, top + 2 * P, P / 2, bottom - top - 2 * P, 'rgba(242,199,92,0.28)')
}
export function drawFloor(ctx, x0, x1, y, t, { P = 6, allGreen = 0 } = {}) {
  R(ctx, x0, y - P, x1 - x0, 8 * P, INK)
  R(ctx, x0, y, x1 - x0, 2 * P, SLAB); R(ctx, x0, y, x1 - x0, P / 2, SLAB_HI)
  R(ctx, x0, y + 2 * P, x1 - x0, 4 * P, '#2a1d4e'); R(ctx, x0, y + 2 * P, x1 - x0, P / 2, GOLD)
  for (let xx = x0 + 4 * P, i = 0; xx < x1 - 2 * P; xx += 9 * P, i++) {
    const on = (i + Math.floor(t * 7)) % 4 === 0
    R(ctx, xx, y + 3.5 * P, 2 * P, 2 * P, on ? (allGreen > 0.5 ? GRN_L : '#fff1c8') : (allGreen > 0.5 ? GRN_D : '#6a4d24'))
  }
  const g = ctx.createLinearGradient(0, y + 7 * P, 0, y + 60 * P)
  g.addColorStop(0, 'rgba(20,12,44,0.85)'); g.addColorStop(1, 'rgba(20,12,44,0)')
  ctx.fillStyle = g; ctx.fillRect(x0, y + 7 * P, x1 - x0, 53 * P)
}

// ─────────────────────────────── the on-screen question board (screen space)
/** a dark panel with a gold pixel border and chasing bulbs; a label tab on top, an optional score tab under it.
 *  k: open 0…1 (a vertical squash), glitch 0…1. Returns nothing. */
export function drawBoard(ctx, cx, top, w, h, t, { k = 1, label = '', labelBg = GOLD, labelFg = INK, score = null, glitch = 0, P = 6, tint = null, tintK = 0 } = {}) {
  if (k <= 0.01) return
  const cyM = top + h / 2
  ctx.save(); ctx.translate(cx, cyM); ctx.scale(1, k); ctx.translate(-cx, -cyM)
  const L = cx - w / 2
  // drop shadow
  R(ctx, L + 2 * P, top + 3 * P, w, h, 'rgba(6,3,18,0.45)')
  R(ctx, L - P, top - P, w + 2 * P, h + 2 * P, INK)
  R(ctx, L, top, w, h, GOLD_D); R(ctx, L + P, top + P, w - 2 * P, h - 2 * P, GOLD); R(ctx, L + 2 * P, top + 2 * P, w - 4 * P, h - 4 * P, INK)
  R(ctx, L + 3 * P, top + 3 * P, w - 6 * P, h - 6 * P, 'rgba(16,9,38,0.94)')
  if (tint && tintK > 0) R(ctx, L + 3 * P, top + 3 * P, w - 6 * P, h - 6 * P, rgba(tint, 0.22 * tintK))
  // inner hairline
  R(ctx, L + 5 * P, top + 5 * P, w - 10 * P, P / 3, 'rgba(239,230,214,0.25)'); R(ctx, L + 5 * P, top + h - 5 * P, w - 10 * P, P / 3, 'rgba(239,230,214,0.25)')
  // bulbs on the gold frame
  const per = 2 * (w + h), step = 8 * P, nB = Math.floor(per / step)
  for (let i = 0; i < nB; i++) {
    let d = i * step + 4 * P, bx, by
    if (d < w) { bx = L + d; by = top + P } else if ((d -= w) < h) { bx = L + w - P; by = top + d } else if ((d -= h) < w) { bx = L + w - d; by = top + h - P } else { d -= w; bx = L + P; by = top + h - d }
    const on = (i + Math.floor(t * 7)) % 3 === 0
    R(ctx, bx - P, by - P, 2 * P, 2 * P, on ? '#fffbea' : '#a77a22')
  }
  // glitch slices
  if (glitch > 0.02) {
    const r = rng(Math.floor(t * 18) * 7 + 1)
    for (let q = 0; q < 6; q++) {
      if (r() > glitch) continue
      const yy = top + 4 * P + r() * (h - 8 * P), hh = P * (1 + r() * 3), dx = (r() - 0.5) * 60 * glitch
      R(ctx, L + 3 * P + Math.max(0, dx), yy, w - 6 * P - Math.abs(dx), hh, rgba([RED, GRN, '#7fe0ff', '#ff8fd0'][q % 4], 0.35 + 0.3 * r()))
    }
  }
  ctx.restore()
  // tabs (not squashed: they pop with k)
  const tabK = clamp((k - 0.6) / 0.4)
  if (label && tabK > 0) tab(ctx, cx, top, label, labelBg, labelFg, tabK, P)
  if (score && tabK > 0) scoreTab(ctx, cx, top + h, score, tabK, P, glitch, t)
}
function tab(ctx, cx, y, text, bg, fg, k, P) {
  ctx.save(); ctx.font = `700 ${Math.round(4.6 * P)}px ${MONO}`
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${Math.round(P * 0.9)}px`
  const tw = ctx.measureText(text).width, w = Math.round(tw / P + 8) * P, h = 8 * P
  ctx.translate(cx, y); ctx.scale(k, k)
  R(ctx, -w / 2 - P, -h / 2 - P, w + 2 * P, h + 2 * P, INK)
  R(ctx, -w / 2, -h / 2, w, h, bg); R(ctx, -w / 2, -h / 2, w, P, 'rgba(255,255,255,0.35)'); R(ctx, -w / 2, h / 2 - P, w, P, 'rgba(0,0,0,0.25)')
  ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, P * 0.45, P * 0.35)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
  ctx.restore()
}
function scoreTab(ctx, cx, y, [r, g], k, P, glitch, t) {
  const w = 62 * P, h = 8 * P
  ctx.save(); ctx.translate(cx, y); ctx.scale(k, k)
  R(ctx, -w / 2 - P, -h / 2 - P, w + 2 * P, h + 2 * P, INK)
  R(ctx, -w / 2, -h / 2, w / 2, h, '#3d0c1c'); R(ctx, 0, -h / 2, w / 2, h, '#0d3a24')
  ctx.font = `700 ${Math.round(4.2 * P)}px ${MONO}`; ctx.textBaseline = 'middle'
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${Math.round(P * 0.3)}px`
  let rs = String(r), gs = String(g)
  if (glitch > 0.3) { const q = rng(Math.floor(t * 16) + 9); rs = q() < 0.5 ? 'ERR' : String(Math.floor(q() * 99)); gs = q() < 0.5 ? 'ERR' : String(Math.floor(q() * 99)) }
  ctx.textAlign = 'left'; ctx.fillStyle = RED_L; ctx.fillText('RED', -w / 2 + 3 * P, P * 0.3)
  ctx.textAlign = 'right'; ctx.fillStyle = '#ffffff'; ctx.fillText(rs, -4 * P, P * 0.3)
  ctx.textAlign = 'left'; ctx.fillText(gs, 4 * P, P * 0.3)
  ctx.textAlign = 'right'; ctx.fillStyle = GRN_L; ctx.fillText('GREEN', w / 2 - 2 * P, P * 0.3)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
  R(ctx, -P / 2, -h / 2, P, h, INK)
  ctx.restore()
}

// ─────────────────────────────── Pisces' ring-card placard
/** a placard on a stick. (cx, cy) = centre of the card. lines = ['ROUND', '1']. wet 0…1 drips + droop */
export function drawSign(ctx, cx, cy, w, h, lines, { rot = 0, wet = 0, t = 0, sy = 1, stick = 0 } = {}) {
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot + wet * 0.04 * Math.sin(t * 2)); ctx.scale(1, sy)
  if (stick > 0) { R(ctx, -5, h / 2 - 4, 10, stick, INK); R(ctx, -3, h / 2 - 4, 6, stick, '#b98a5a') }
  const droop = wet * 10
  R(ctx, -w / 2 - 5, -h / 2 - 5, w + 10, h + 10 + droop * 0.5, INK)
  R(ctx, -w / 2, -h / 2, w, h + droop * 0.5, '#fbf6ec'); R(ctx, -w / 2, h / 2 - 6 + droop * 0.5, w, 6, '#ddd0b8')
  // tear stains
  if (wet > 0) {
    ctx.fillStyle = `rgba(120,170,230,${0.28 * wet})`
    for (let k = 0; k < 5; k++) { const sx = -w / 2 + 18 + ((k * 53) % (w - 36)), sy2 = -h / 2 + 12 + ((k * 31) % (h - 24)); ctx.beginPath(); ctx.ellipse(sx, sy2, 10 + k * 2, 7 + k, 0, 0, TAU); ctx.fill() }
    for (let k = 0; k < 3; k++) { const ph = (t * 0.9 + k * 0.33) % 1; const dx = -w / 2 + 24 + k * (w - 48) / 2; R(ctx, dx, h / 2 + droop * 0.5 + ph * 22, 5, 8, rgba('#8fe3ff', (1 - ph) * wet)) }
  }
  ctx.fillStyle = '#2a1846'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  const fit = (s, fs) => { ctx.font = `800 ${fs}px ${INTER}`; const k = Math.min(1, (w - 22) / ctx.measureText(s).width); ctx.font = `800 ${Math.floor(fs * k)}px ${INTER}` }
  if (lines.length === 1) { fit(lines[0], Math.round(h * 0.42)); ctx.fillText(lines[0], 0, 2) }
  else { fit(lines[0], Math.round(h * 0.26)); ctx.fillText(lines[0], 0, -h * 0.19); fit(lines[1], Math.round(h * 0.44)); ctx.fillText(lines[1], 0, h * 0.17) }
  ctx.restore()
}

// ─────────────────────────────── gag props
/** a little airliner, side view; (x, y) = centre, dir 1 = flying right */
export function drawPlane(ctx, x, y, px, dir = 1, t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(dir, 1)
  bitmap(ctx, [
    '...LL.....................',
    '...LTL....................',
    '...LTTL...................',
    '..LLTTTLLLLLLLLLLLLLLLLL..',
    '..LWWWWWWWWWWWWWWWWWWWWWWL.',
    '.LWBWBWBWBWBWBWBWBWBWWWWWWL',
    '.LWWWWWWWWWWWWWWWWWWWWWWWDL',
    '..LSSSSSSSSSSSSSSSSSSSSSSL.',
    '...LLLLLLLLWWWWLLLLLLLLLL..',
    '..........LGGGGGL..........',
    '...........LLLLL...........',
  ], { L: INK, W: '#f4f0ff', B: '#7fd0ff', T: RED, S: '#c9c2e6', D: '#2a1846', G: '#9aa0c8' }, -13 * px, -5.5 * px, px)
  // a jet puff
  const ph = (t * 6) % 1
  ctx.globalAlpha = 0.7 * (1 - ph); R(ctx, -15 * px - ph * 6 * px, -1 * px, 2 * px, 2 * px, '#ffffff'); ctx.globalAlpha = 1
  ctx.restore()
}
/** a bare interrogation lamp on a cord from (ax, ay), swinging by ang; returns the bulb point */
export function drawHangLamp(ctx, ax, ay, len, ang, px, on = 1) {
  const bx = ax + Math.sin(ang) * len, by = ay + Math.cos(ang) * len
  ctx.save()
  ctx.strokeStyle = INK; ctx.lineWidth = px * 1.4; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke()
  ctx.strokeStyle = '#3a3352'; ctx.lineWidth = px * 0.6; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke()
  ctx.translate(bx, by); ctx.rotate(-ang)
  bitmap(ctx, ['....LL....', '...LSSL...', '..LSSSSL..', '.LSSHSSSL.', 'LSSSSSSSSL', 'LLLLLLLLLL', '...LYYL...', '....YY....'], { L: INK, S: '#2e7a5a', H: '#5fc79a', Y: on > 0 ? '#fff3a8' : '#8a8466' }, -5 * px, -1 * px, px)
  ctx.restore()
  return [bx, by]
}
/** a little pixel cloud puff (a sneeze); k 0…1 grows + fades */
export function drawPuff(ctx, x, y, px, k) {
  if (k <= 0 || k >= 1) return
  const s = 0.6 + 0.8 * k
  ctx.save(); ctx.globalAlpha = 1 - k * k; ctx.translate(x, y); ctx.scale(s, s)
  bitmap(ctx, ['..XXX..XX...', '.XWWWXXWWX..', 'XWWWWWWWWWX.', 'XWWWWWWWWWWX', '.XWWWWWWWWX.', '..XXXXXXXX..'], { X: '#c9c2e6', W: '#ffffff' }, -6 * px, -3 * px, px)
  ctx.restore()
}
/** a tiny red pixel flag icon (for the dealbreaker chips); (x, y) = top-left */
export function drawMiniFlag(ctx, x, y, px, col = RED) {
  bitmap(ctx, ['PRRRRR', 'PRRRRRR', 'PRRRRR', 'PRRR..', 'P.....', 'P.....', 'P.....'], { P: '#efe6d6', R: col }, x, y, px)
}

// ─────────────────────────────── YOUR CARD (the tie-in): dealbreakers, picked at signup, stamped on as red flags
export function drawDealCard(ctx, cx, cy, w, h, t, { stamps = [], chips = [], sx = 1, tagK = 0, glow = 1 } = {}) {
  ctx.save(); ctx.translate(cx, cy); ctx.scale(sx, 1)
  const L = -w / 2, Tp = -h / 2
  ctx.save(); ctx.shadowColor = rgba(GOLD, 0.5 * glow); ctx.shadowBlur = 60
  ctx.beginPath(); ctx.roundRect(L, Tp, w, h, 34)
  const g = ctx.createLinearGradient(0, Tp, 0, Tp + h); g.addColorStop(0, '#2c1660'); g.addColorStop(1, '#170a36')
  ctx.fillStyle = g; ctx.fill(); ctx.restore()
  ctx.lineWidth = 6; ctx.strokeStyle = '#f2d27a'; ctx.beginPath(); ctx.roundRect(L, Tp, w, h, 34); ctx.stroke()
  ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(242,210,122,0.35)'; ctx.beginPath(); ctx.roundRect(L + 16, Tp + 16, w - 32, h - 32, 24); ctx.stroke()
  // name + coin
  ctx.fillStyle = BONE; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'
  ctx.font = `italic 500 64px ${SERIF}`; ctx.fillText('You', L + 46, Tp + 100)
  ctx.fillStyle = '#b48cff'; ctx.beginPath(); ctx.arc(-L - 74, Tp + 80, 32, 0, TAU); ctx.fill()
  ctx.fillStyle = '#fff6dc'; ctx.font = `700 34px ${GLYPH_FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('☾︎', -L - 74, Tp + 82)
  // the art window: a warm aura (no face: card first)
  const wx = L + 40, wy = Tp + 134, ww = w - 80, wh = 196
  ctx.save(); ctx.beginPath(); ctx.roundRect(wx, wy, ww, wh, 16); ctx.clip()
  const a = ctx.createRadialGradient(0, wy + wh * 0.62, 0, 0, wy + wh * 0.62, ww * 0.62); a.addColorStop(0, '#ffcf7a'); a.addColorStop(0.45, '#c2508a'); a.addColorStop(1, '#2a1250')
  ctx.fillStyle = a; ctx.fillRect(wx, wy, ww, wh)
  ctx.restore()
  ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(242,210,122,0.6)'; ctx.beginPath(); ctx.roundRect(wx, wy, ww, wh, 16); ctx.stroke()
  // dealbreakers
  ctx.fillStyle = '#ff9aa3'; ctx.font = `700 28px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'
  if ('letterSpacing' in ctx) ctx.letterSpacing = '6px'
  ctx.fillText('DEALBREAKERS', 3, Tp + 384)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
  chips.forEach((c, i) => {
    const cy2 = Tp + 412 + i * 90, cw = w - 70, ch = 70
    const s0 = stamps[i] ?? 1e9, k = clamp((t - (s0 - 0.12)) / 0.12)
    if (t < s0 - 0.12) {
      ctx.setLineDash([10, 9]); ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(239,230,214,0.3)'
      ctx.beginPath(); ctx.roundRect(-cw / 2, cy2, cw, ch, 35); ctx.stroke(); ctx.setLineDash([])
      return
    }
    const sc = 1 + (1 - k * k) * 0.9, after = t - s0
    const wob = after > 0 ? Math.exp(-after * 10) * Math.sin(after * 40) * 0.04 : 0
    ctx.save(); ctx.translate(0, cy2 + ch / 2); ctx.scale(sc + wob, sc - wob); ctx.rotate((i % 2 ? 1 : -1) * 0.022)
    ctx.globalAlpha = clamp(k * 1.5)
    ctx.beginPath(); ctx.roundRect(-cw / 2, -ch / 2, cw, ch, 35); ctx.fillStyle = '#4a1236'; ctx.fill()
    ctx.lineWidth = 4; ctx.strokeStyle = RED; ctx.stroke()
    drawMiniFlag(ctx, -cw / 2 + 26, -15, 4.5)
    ctx.fillStyle = '#fff1ea'; ctx.font = `700 30px ${MONO}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
    ctx.fillText(c, -cw / 2 + 74, 2)
    ctx.restore()
    if (after > 0 && after < 0.4) {
      const p = 1 - (1 - after / 0.4) ** 3
      ctx.save(); ctx.globalAlpha = 1 - p; ctx.fillStyle = '#ffd0d8'
      for (let q = 0; q < 14; q++) { const an = q / 14 * TAU; ctx.fillRect(Math.cos(an) * (cw * 0.5 + 10 + p * 60) - 4, cy2 + ch / 2 + Math.sin(an) * (ch * 0.5 + 10 + p * 40) - 4, 8, 8) }
      ctx.restore()
    }
  })
  // footer
  ctx.fillStyle = 'rgba(239,230,214,0.62)'; ctx.font = `700 20px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'
  if ('letterSpacing' in ctx) ctx.letterSpacing = '3px'
  ctx.fillText('PICKED AT SIGNUP · ON YOUR CARD', 0, -Tp - 34)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
  // the YOUR CARD tag
  if (tagK > 0) {
    ctx.save(); ctx.translate(-L - 104, Tp - 4); ctx.rotate(-0.1); ctx.scale(tagK, tagK)
    ctx.shadowColor = 'rgba(6,3,18,0.5)'; ctx.shadowBlur = 12
    ctx.beginPath(); ctx.roundRect(-128, -30, 256, 60, 16); ctx.fillStyle = '#f7f1ff'; ctx.fill(); ctx.shadowBlur = 0
    ctx.fillStyle = '#2a1846'; ctx.font = `700 26px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    if ('letterSpacing' in ctx) ctx.letterSpacing = '4px'
    ctx.fillText('✦ YOUR CARD', 0, 2)
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
    ctx.restore()
  }
  ctx.restore()
}

// ─────────────────────────────── confetti (pure f(t): analytic drag)
const CONF_COLS = ['#f2c75c', '#ff8fb1', '#c9a6ff', '#7fe0ff', '#efe6d6', '#39dd7e', '#b5ffd0']
export function confetti(ctx, t, t0, { x0 = 540, y0 = 1300, n = 80, spread = 1, up = 1, seed = 1, life = 5.5, cols = CONF_COLS } = {}) {
  const dt0 = t - t0
  if (dt0 < 0 || dt0 > life) return
  const r = rng(seed * 977 + 3)
  const k = 1.5, vty = 330
  for (let i = 0; i < n; i++) {
    const delay = r() * 0.18, vx0 = (r() - 0.5) * 2100 * spread, vy0 = -(1500 + r() * 1300) * up, spin = 4 + r() * 9, sz = 12 + r() * 12, col = cols[Math.floor(r() * cols.length)], ph = r() * TAU, sway = 30 + r() * 50
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
void lerp
