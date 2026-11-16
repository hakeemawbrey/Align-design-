// stcooking props — the pixel prop kit for "Love Kitchen." (a cooking show hosted by Taurus), kept inside this film's
// folder (STARTALK2.md: props are shared helpers inside your own film folder). Pure functions of their arguments (and t);
// nothing touches `document` at module top level (the sound build imports scenes/index.js in node).
//
//   starFrame / inSprite / cellToWorld   the exact transform drawStarChar uses (mirrors startalk.js), so accessories drawn in
//                                        sprite CELLS (the 36-cell grid) stay seated through hops and squash
//   apronCells / bibCells / flourCells / tearsCells   things painted onto a star, in cells
//   bmp(ctx, rows, x, y, px, pal, o)     a char bitmap ('.' = clear), anchored (ax, ay), rotated, flipped, ink-outlined
//   drawToque (the chef hat; tall for Aries) · drawBowl · drawShaker · drawSack · drawPot · drawSoupBowl · drawLid ·
//   drawFork · drawKnife · drawVeg · drawSouffle · drawOven · drawSet (counter, rack, Pisces' prep shelf) ·
//   drawNeon · drawLamp · flourCloud · pixelPanel · drawCard (the recipe card) · drawTalkCard
//   confetti / sparkBurst / drawHearts / steamPuffs / sweatDrop / smoke
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

const TAU = Math.PI * 2
export const INK = '#1b1236'
const G = 36, HALF = 18
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SERIF = "'EB Garamond', Georgia, serif"
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', MINT = '#7dffb0'
export const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ───────────────────────────────────────── the star transform (mirrors startalk.js drawStarChar)
const SC = { x: HALF, y: 19.6, R: 17.6, r: 9.4, round: 2.6 }
const FOOT_ROW = SC.y + SC.R * Math.cos(Math.PI / 5)
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
/** sprite cell → world point (follows squash at the anchor row) */
export const cellToWorld = (F, i, j) => [F.ox + (i - HALF) * F.cell * F.sx, F.oy + (j - HALF) * F.cell * F.sy - F.base * F.sy]

function starPoly() {
  const V = [], R0 = SC.R - SC.round, r0 = SC.r - SC.round * 0.55
  for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r0 : R0; V.push([SC.x + Math.cos(a) * rr, SC.y + Math.sin(a) * rr]) }
  return V
}
function sdPoly(px, py, V) {
  let d = (px - V[0][0]) ** 2 + (py - V[0][1]) ** 2, s = 1
  for (let i = 0, j = V.length - 1; i < V.length; j = i, i++) {
    const ex = V[j][0] - V[i][0], ey = V[j][1] - V[i][1], wx = px - V[i][0], wy = py - V[i][1]
    const h = clamp((wx * ex + wy * ey) / (ex * ex + ey * ey), 0, 1), bx = wx - ex * h, by = wy - ey * h
    d = Math.min(d, bx * bx + by * by)
    const c1 = py >= V[i][1], c2 = py < V[j][1], c3 = ex * wy > ey * wx
    if ((c1 && c2 && c3) || (!c1 && !c2 && !c3)) s = -s
  }
  return s * Math.sqrt(d)
}
let ROWS = null
let MASK = null
function bodyRows() {
  if (ROWS) return ROWS
  const V = starPoly()
  ROWS = []; MASK = []
  for (let j = 0; j < G; j++) { let i0 = -1, i1 = -1; for (let i = 0; i < G; i++) if (sdPoly(i + 0.5, j + 0.5, V) - SC.round <= 0) { if (i0 < 0) i0 = i; i1 = i; MASK.push([i, j]) } ROWS.push([i0, i1]) }
  return ROWS
}
function paintCells(ctx, cells, outline = INK) {
  const key = new Set(cells.map(([i, j]) => i + ',' + j))
  if (outline) {
    ctx.fillStyle = outline
    for (const [i, j] of cells) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!key.has((i + a) + ',' + (j + b))) ctx.fillRect(i + a, j + b, 1.02, 1.02)
  }
  for (const [i, j, c] of cells) { ctx.fillStyle = c; ctx.fillRect(i, j, 1.02, 1.02) }
}

/** Taurus' host apron: a white bib with a pink heart, straps up to the arms (cells) */
export function apronCells(ctx) {
  const R = bodyRows(), cells = [], W = '#fffaf2', S = '#e9dccb', H = '#ff5c8a', h = '#ffb3c8'
  for (let j = 24; j <= 34; j++) { const [i0, i1] = R[j]; for (let i = Math.max(i0, 12); i <= Math.min(i1, 23); i++) cells.push([i, j, j === 24 ? S : W]) }
  // straps
  for (const [i, j] of [[11, 23], [10, 22], [24, 23], [25, 22]]) cells.push([i, j, W])
  // heart
  const HEART = ['.XX.XX.', 'XhXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...']
  HEART.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') { const k = cells.findIndex(c => c[0] === 15 + i && c[1] === 26 + j); const col = ch === 'h' ? h : H; if (k >= 0) cells[k] = [15 + i, 26 + j, col] } }))
  paintCells(ctx, cells)
}
/** Libra's taste-tester napkin, tucked in under the eyes (cells) */
export function bibCells(ctx) {
  const cells = [], W = '#ffffff', B = '#7fd0f0'
  for (let j = 24; j <= 31; j++) { const half = Math.max(0, 7 - (j - 24)); for (let i = 18 - half; i <= 17 + half; i++) cells.push([i, j, (i + j) % 4 === 0 ? B : W]) }
  paintCells(ctx, cells)
}
/** a dusting of flour over the whole body (cells); k 0…1 */
export function flourCells(ctx, k, seed = 1) {
  if (k <= 0) return
  bodyRows()
  const r = rng(seed * 131 + 7)
  ctx.save()
  for (const [i, j] of MASK) { const v = r(); if (v < 0.42 * k) { ctx.globalAlpha = v < 0.2 * k ? 0.95 : 0.6; ctx.fillStyle = v < 0.1 ? '#ffffff' : '#f3eee6'; ctx.fillRect(i, j, 1.02, 1.02) } }
  ctx.restore()
}
/** tears from both eyes (cells). k: 0 none · 1 sniffle · 2 streams · 3 fountains */
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
export function bmp(ctx, rows, x, y, px, pal, { rot = 0, ax = 0.5, ay = 0.5, outline = null, alpha = 1, flip = false } = {}) {
  if (alpha <= 0) return
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

// the chef's toque: puffy top + a pleated band. Tall: the band repeats (Aries brought a very tall hat).
const TOQUE_TOP = BM(`
...XXX.XXX...
..XHHXXXHHXX.
.XHHXXXXXXXXX
XHXXXXXXXXXXX
XXXXXXXXXXXSX
XXXXXXXXXXSSX
.XXXXXXXXXSX.
..SXXXXXXXS..`)
const TOQUE_BAND = BM(`
..XSXSXSXSX..`)
const TOQUE_RIM = BM(`
..SSSSSSSSS..
..XXXXXXXXX..`)
const TOQUE_PAL = { X: '#f6f3ff', H: '#ffffff', S: '#cfc8e6' }
/** (x, y) = bottom centre of the hat (sit it on the star's top point). tall = extra band rows. flop 0…1 = it folds over. */
export function drawToque(ctx, x, y, px, { tall = 2, rot = 0, flop = 0, soot = 0, alpha = 1 } = {}) {
  const rows = [...TOQUE_TOP, ...Array.from({ length: tall }, () => TOQUE_BAND[0]), ...TOQUE_RIM]
  const pal = soot > 0 ? { X: mixHex('#f6f3ff', '#8c8494', soot), H: mixHex('#ffffff', '#a59dac', soot), S: mixHex('#cfc8e6', '#5d5566', soot) } : TOQUE_PAL
  if (flop <= 0) { bmp(ctx, rows, x, y, px, pal, { rot, ax: 0.5, ay: 1, outline: INK, alpha }); return }
  // flopped: the band stays, the puffy top hinges over to the side
  const band = [...Array.from({ length: tall }, () => TOQUE_BAND[0]), ...TOQUE_RIM]
  bmp(ctx, band, x, y, px, pal, { rot, ax: 0.5, ay: 1, outline: INK, alpha })
  const topY = y - band.length * px
  ctx.save(); ctx.translate(x + 5 * px, topY); ctx.rotate(rot + flop * 1.9)
  bmp(ctx, TOQUE_TOP, -1 * px, 0, px, pal, { ax: 0.5, ay: 1, outline: INK, alpha })
  ctx.restore()
}
function mixHex(a, b, k) {
  const A = parseInt(a.slice(1), 16), B_ = parseInt(b.slice(1), 16)
  const ch = s => Math.round(lerp((A >> s) & 255, (B_ >> s) & 255, clamp(k)))
  return '#' + ((1 << 24) + (ch(16) << 16) + (ch(8) << 8) + ch(0)).toString(16).slice(1)
}

const BOWL = BM(`
XXXXXXXXXXXXXXXX
WHHWWWWWWWWWWWWW
.WWWWWWWWWWWWWS.
.WWWPPPPPPPPWWS.
..WWWWWWWWWWWS..
...WWWWWWWWSS...
.....SSSSSS.....`)
/** the mixing bowl; (x, y) = bottom centre. fill: what's in it (null = empty) */
export function drawBowl(ctx, x, y, px, { fill = '#f7e7b0', alpha = 1, rot = 0 } = {}) {
  bmp(ctx, BOWL, x, y, px, { X: fill || '#d9d3ec', W: '#e6eef8', H: '#ffffff', S: '#a6b2c8', P: '#ff8fb1' }, { ax: 0.5, ay: 1, outline: INK, alpha, rot })
}
const SHAKER = BM(`
.KKK.
KKKKK
XXXXX
XHXXX
XHXXX
XXXXX
XXXXX
SSSSS`)
/** the tiny SORRY shaker; (x, y) = bottom centre */
export function drawShaker(ctx, x, y, px, { rot = 0, alpha = 1 } = {}) {
  bmp(ctx, SHAKER, x, y, px, { K: '#c9cfe0', X: '#f4f8ff', H: '#ffffff', S: '#b9c2d8' }, { ax: 0.5, ay: 1, outline: INK, rot, alpha })
}
const SACK = BM(`
.....TT.TT.....
......TTT......
.....XXXXX.....
....XXXXXXX....
...XXXXXXXXX...
..XXXXXXXXXXX..
.XXXXXXXXXXXXX.
XXXXXXXXXXXXXXX
XXXXXXXXXXXXXXX
XXXXXXXXXXXXXXX
XXXXXXXXXXXXXXX
XXXXXXXXXXXXXXX
SXXXXXXXXXXXXXS
.SSSSSSSSSSSSS.`)
/** the BUT sack (burlap, stencilled BUT); (x, y) = bottom centre; tilt rotates about the base */
export function drawSack(ctx, x, y, px, { rot = 0, alpha = 1, label = 'BUT', flour = 0 } = {}) {
  const pal = { X: flour > 0 ? mixHex('#c79a5b', '#efe6d6', flour * 0.5) : '#c79a5b', S: '#8f6838', T: '#7a4f2a' }
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  bmp(ctx, SACK, 0, 0, px, pal, { ax: 0.5, ay: 1, outline: INK, alpha })
  // burlap weave + the stencil
  ctx.globalAlpha *= alpha
  ctx.fillStyle = 'rgba(90,60,30,0.28)'
  for (let j = 7; j < 13; j += 2) for (let i = 1; i < 14; i += 3) ctx.fillRect((-7.5 + i) * px, (-14 + j) * px, px, px)
  ctx.font = `800 ${Math.round(px * 4.4)}px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillStyle = '#3a1c10'; ctx.fillText(label, 0, -4.2 * px)
  ctx.restore()
}
const POT = BM(`
....KKKKKKKKKK....
...KKKKKKKKKKKK...
.HXXXXXXXXXXXXXXH.
HHXXXXXXXXXXXXXXHH
.XXWXXXXXXXXXXXXX.
.XXWXXXXXXXXXXXXX.
.XXXXXXXXXXXXXXXX.
.XXXXXXXXXXXXXXXX.
.SXXXXXXXXXXXXXXS.
..SSSSSSSSSSSSSS..`)
/** Cancer's soup pot with a ladle; (x, y) = bottom centre */
export function drawPot(ctx, t, x, y, px, { rot = 0, alpha = 1, steam = 1, lid = false } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  // ladle handle sticking out
  ctx.globalAlpha *= alpha
  ctx.fillStyle = INK; ctx.fillRect(3 * px, -16 * px, 2.4 * px, 8 * px); ctx.fillStyle = '#c9cfe0'; ctx.fillRect(3.4 * px, -15.6 * px, 1.6 * px, 7.4 * px)
  ctx.globalAlpha = 1
  bmp(ctx, POT, 0, 0, px, { K: lid ? '#b84a3a' : '#ffb35c', X: '#e0503c', H: '#9c2e22', W: '#ff8f7a', S: '#a8321f' }, { ax: 0.5, ay: 1, outline: INK, alpha })
  ctx.restore()
  if (steam > 0) steamWisps(ctx, t, x, y - 11 * px, px, steam * alpha)
}
/** soft white wisps rising (soup, the pan) */
export function steamWisps(ctx, t, x, y, px, k = 1, n = 3) {
  for (let s = 0; s < n; s++) {
    const ph = (t * 0.8 + s / n) % 1
    const sx = x + (s - (n - 1) / 2) * 4 * px + Math.sin(ph * 7 + s) * 2 * px, sy = y - ph * 16 * px
    ctx.save(); ctx.globalAlpha = k * Math.sin(Math.PI * ph) * 0.75
    ctx.fillStyle = '#ffffff'; ctx.fillRect(sx - px, sy - px * 1.5, px * 2, px * 3); ctx.fillRect(sx + px * (ph > 0.5 ? 1 : -1), sy - px * 3.5, px * 1.6, px * 2)
    ctx.restore()
  }
}
const SOUPBOWL = BM(`
XXXXXXXXXXXX
WSSSSSSSSSSW
WWWWWWWWWWWW
.WWWPWWPWWW.
..WWWWWWWW..
...SSSSSS...`)
export function drawSoupBowl(ctx, t, x, y, px, { alpha = 1, steam = 1 } = {}) {
  bmp(ctx, SOUPBOWL, x, y, px, { X: '#ff9f5a', S: '#e8763a', W: '#fff4e6', P: '#ff8fb1' }, { ax: 0.5, ay: 1, outline: INK, alpha })
  if (steam > 0) steamWisps(ctx, t, x, y - 7 * px, px * 0.8, steam * alpha, 2)
}
const LID = BM(`
......KK......
.....KKKK.....
..XXXXXXXXXX..
.XHHXXXXXXXXX.
XHXXXXXXXXXXXX
SSSSSSSSSSSSSS`)
/** a pot lid held up like a shield; (x, y) = centre */
export function drawLid(ctx, x, y, px, { rot = 0, alpha = 1 } = {}) {
  bmp(ctx, LID, x, y, px, { K: '#3a2f55', X: '#c9cfe0', H: '#ffffff', S: '#8e97b0' }, { rot, outline: INK, alpha })
}
const FORK = BM(`
X.X.X
X.X.X
XXXXX
.XXX.
..X..
..X..
..X..
..X..
..X..`)
export function drawFork(ctx, x, y, px, rot = 0, alpha = 1) { bmp(ctx, FORK, x, y, px, { X: '#d6dcef' }, { outline: INK, rot, alpha, ay: 0 }) }
const SPOON = BM(`
.XXX.
XXXXX
XXXXX
.XXX.
..X..
..X..
..X..
..X..`)
export function drawSpoon(ctx, x, y, px, rot = 0, alpha = 1) { bmp(ctx, SPOON, x, y, px, { X: '#d6dcef' }, { outline: INK, rot, alpha, ay: 0 }) }
const KNIFE = BM(`
XXXXXXXXXHHHH
XXXXXXXXXHHHH
.XXXXXXX.....`)
export function drawKnife(ctx, x, y, px, rot = 0) { bmp(ctx, KNIFE, x, y, px, { X: '#dfe5f3', H: '#6b3f2a' }, { outline: INK, rot, ax: 0.2 }) }
const CUKE = BM(`
..GGGGGGGGGGG..
.GgGGgGGGgGGGG.
GGGGGGGGGGGGGGS
.GGGgGGGGGgGGS.
..SSSSSSSSSSS..`)
export function drawVeg(ctx, x, y, px, { rot = 0, alpha = 1 } = {}) { bmp(ctx, CUKE, x, y, px, { G: '#5fc76a', g: '#a6ec8f', S: '#2f8a45' }, { outline: INK, rot, alpha }) }

const RAMEKIN = BM(`
XXXXXXXXXXXXXXXX
XRXXRXXRXXRXXRXX
XRXXRXXRXXRXXRXX
XRXXRXXRXXRXXRXX
SSSSSSSSSSSSSSSS`)
/** the soufflé: a fluted ramekin + a golden dome of radius r (px), wobbling; (x, y) = bottom centre of the ramekin */
export function drawSouffle(ctx, t, x, y, r, { wob = 0, alpha = 1, glow = 0, cracks = 1 } = {}) {
  const px = Math.max(3, Math.round(r / 9))
  ctx.save(); ctx.globalAlpha *= alpha
  const domeY = y - 5 * px
  // dome (pixel-stepped half ellipse)
  const rx = r * (1 + 0.06 * Math.sin(t * 13) * wob), ry = r * 1.05 * (1 - 0.06 * Math.sin(t * 13) * wob)
  if (glow > 0) { const g = ctx.createRadialGradient(x, domeY - ry * 0.5, 10, x, domeY - ry * 0.5, r * 1.6); g.addColorStop(0, `rgba(255,214,120,${0.35 * glow})`); g.addColorStop(1, 'rgba(255,214,120,0)'); ctx.fillStyle = g; ctx.fillRect(x - r * 1.7, domeY - ry * 2, r * 3.4, ry * 2.6) }
  const steps = Math.max(6, Math.round(ry / px))
  const row = (s, ins) => { const u = (s + 0.5) / steps; return Math.sqrt(Math.max(0, 1 - u * u)) * rx - ins }
  for (const [col, ins, from] of [[INK, -px, 0], ['#d99a3a', 0, 0], ['#f2bd55', px * 1.5, 0], ['#f8d680', px * 3, Math.round(steps * 0.45)]]) {
    ctx.fillStyle = col
    for (let s = from; s < steps + (col === INK ? 1 : 0); s++) {
      const half = s < steps ? row(s, ins) : row(steps - 1, ins) * 0.6
      if (half <= 0) continue
      ctx.fillRect(Math.round(x - half), Math.round(domeY - (s + 1) * px), Math.round(half * 2), px + 1)
    }
  }
  // a glossy highlight, upper left
  ctx.fillStyle = '#fff3c4'
  ctx.fillRect(Math.round(x - rx * 0.5), Math.round(domeY - ry * 0.72), Math.round(px * 3), Math.round(px * 1.5))
  ctx.fillRect(Math.round(x - rx * 0.62), Math.round(domeY - ry * 0.55), Math.round(px * 1.5), Math.round(px * 2))
  // cracks
  if (cracks) { ctx.fillStyle = '#b5772a'; for (let k = 0; k < 3; k++) { const cx = x + (k - 1) * rx * 0.45, cy = domeY - ry * (0.35 + 0.15 * (k % 2)); ctx.fillRect(cx, cy, px, px); ctx.fillRect(cx + px, cy - px, px, px); ctx.fillRect(cx - px, cy - px * 2, px, px) } }
  ctx.restore()
  bmp(ctx, RAMEKIN, x, y, Math.max(3, rx / 8.5), { X: '#ffffff', R: '#dfe3f0', S: '#b9c2d8' }, { ax: 0.5, ay: 1, outline: INK, alpha })
}

// ───────────────────────────────────────── the oven (box: x, y, w, h; a wall oven standing at the end of the counter)
export function drawOven(ctx, t, box, { open = 0, heat = 0, ding = 0, shake = 0, flour = 0, temp = '350°', inside = null } = {}) {
  const { x, y, w, h } = box
  const sx = shake ? Math.round(Math.sin(t * 60) * 5 * shake) : 0
  ctx.save(); ctx.translate(sx, 0)
  // body
  ctx.fillStyle = INK; ctx.fillRect(x - 6, y - 6, w + 12, h + 12)
  ctx.fillStyle = '#cfd5e6'; ctx.fillRect(x, y, w, h)
  ctx.fillStyle = '#e9eef8'; ctx.fillRect(x, y, w, 8); ctx.fillRect(x, y, 8, h)
  ctx.fillStyle = '#a7aec4'; ctx.fillRect(x + w - 10, y, 10, h); ctx.fillRect(x, y + h - 10, w, 10)
  // control strip: knobs + the little LED display + the ding light
  ctx.fillStyle = '#2b2140'; ctx.fillRect(x + 14, y + 16, w - 28, 62)
  for (let k = 0; k < 2; k++) { const kx = x + 40 + k * 44, ky = y + 47; ctx.fillStyle = INK; ctx.fillRect(kx - 15, ky - 15, 30, 30); ctx.fillStyle = '#f2c75c'; ctx.fillRect(kx - 11, ky - 11, 22, 22); ctx.fillStyle = INK; ctx.fillRect(kx - 2, ky - 11 + (k ? 0 : 4), 4, 10) }
  ctx.fillStyle = '#100a1e'; ctx.fillRect(x + w - 96, y + 28, 72, 38)
  ctx.font = `700 26px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillStyle = heat > 0.5 ? '#ff6a4a' : '#7dffb0'; ctx.fillText(temp, x + w - 60, y + 48)
  // the door: hinged at its bottom edge; open 0…1 swings it down toward us
  const dy0 = y + 96, dh = h - 150, dx0 = x + 16, dw = w - 32
  // interior (seen when open)
  ctx.fillStyle = '#1a0d14'; ctx.fillRect(dx0, dy0, dw, dh)
  if (heat > 0) { ctx.fillStyle = `rgba(255,110,60,${0.55 * heat})`; ctx.fillRect(dx0 + 10, dy0 + dh - 26, dw - 20, 10); ctx.fillRect(dx0 + 10, dy0 + 16, dw - 20, 8); const g = ctx.createRadialGradient(dx0 + dw / 2, dy0 + dh * 0.6, 10, dx0 + dw / 2, dy0 + dh * 0.6, dw); g.addColorStop(0, `rgba(255,150,70,${0.45 * heat})`); g.addColorStop(1, 'rgba(255,150,70,0)'); ctx.fillStyle = g; ctx.fillRect(dx0, dy0, dw, dh) }
  if (inside) inside(dx0, dy0, dw, dh)
  const c = Math.cos(open * Math.PI * 0.5)
  if (c > 0.02) {
    ctx.save(); ctx.translate(0, dy0 + dh); ctx.scale(1, c); ctx.translate(0, -(dy0 + dh))
    ctx.fillStyle = INK; ctx.fillRect(dx0 - 4, dy0 - 4, dw + 8, dh + 8)
    ctx.fillStyle = '#dde3f1'; ctx.fillRect(dx0, dy0, dw, dh)
    // handle bar
    ctx.fillStyle = INK; ctx.fillRect(dx0 + 18, dy0 + 10, dw - 36, 18); ctx.fillStyle = '#9aa3bd'; ctx.fillRect(dx0 + 22, dy0 + 13, dw - 44, 11)
    // window (shows the inside, darker)
    const wx = dx0 + 20, wy = dy0 + 44, ww = dw - 40, wh = dh - 76
    ctx.fillStyle = INK; ctx.fillRect(wx - 4, wy - 4, ww + 8, wh + 8)
    ctx.save(); ctx.beginPath(); ctx.rect(wx, wy, ww, wh); ctx.clip()
    ctx.fillStyle = '#20121c'; ctx.fillRect(wx, wy, ww, wh)
    if (heat > 0) { const g = ctx.createRadialGradient(wx + ww / 2, wy + wh * 0.7, 6, wx + ww / 2, wy + wh * 0.7, ww); g.addColorStop(0, `rgba(255,140,60,${0.7 * heat})`); g.addColorStop(1, 'rgba(255,140,60,0.05)'); ctx.fillStyle = g; ctx.fillRect(wx, wy, ww, wh) }
    if (inside && c > 0.5) inside(wx, wy, ww, wh, true)
    ctx.fillStyle = 'rgba(255,255,255,0.16)'; ctx.fillRect(wx + 8, wy + 8, 10, wh - 16); ctx.fillRect(wx + 24, wy + 8, 5, wh * 0.4)
    ctx.restore()
    ctx.restore()
  }
  // feet
  ctx.fillStyle = INK; ctx.fillRect(x + 10, y + h + 6, 26, 10); ctx.fillRect(x + w - 36, y + h + 6, 26, 10)
  if (flour > 0) { const r = rng(91); ctx.fillStyle = `rgba(250,246,238,${0.85 * flour})`; for (let i = 0; i < 70; i++) ctx.fillRect(x + r() * w, y + r() * h * (0.3 + r() * 0.7), 8, 8) }
  ctx.restore()
  // the ding light
  if (ding > 0) { ctx.save(); ctx.globalAlpha = ding; ctx.fillStyle = '#ffe26a'; ctx.shadowColor = '#ffe26a'; ctx.shadowBlur = 20; ctx.fillRect(x + w / 2 - 10, y - 26, 20, 14); ctx.restore() }
}

// ───────────────────────────────────────── the set: counter, utensil rack, Pisces' prep shelf (static parts)
export function drawSet(ctx, t, { counterY = 1150, flour = 0, rackY = 690 } = {}) {
  const top = counterY
  // underglow
  const g = ctx.createRadialGradient(540, top + 260, 20, 540, top + 260, 640); g.addColorStop(0, 'rgba(255,120,190,0.22)'); g.addColorStop(1, 'rgba(255,120,190,0)')
  ctx.fillStyle = g; ctx.fillRect(0, top - 100, 1080, 700)
  // the counter face
  ctx.fillStyle = INK; ctx.fillRect(10, top - 6, 1060, 270)
  ctx.fillStyle = '#6e2f63'; ctx.fillRect(16, top + 30, 1048, 224)
  ctx.fillStyle = '#5a2552'; ctx.fillRect(16, top + 240, 1048, 14)
  // cabinet doors
  for (let k = 0; k < 5; k++) {
    const dx = 36 + k * 206, dw = 188
    ctx.fillStyle = INK; ctx.fillRect(dx, top + 54, dw, 176)
    ctx.fillStyle = '#7e3a73'; ctx.fillRect(dx + 6, top + 60, dw - 12, 164)
    ctx.fillStyle = '#93488a'; ctx.fillRect(dx + 6, top + 60, dw - 12, 8); ctx.fillRect(dx + 6, top + 60, 8, 164)
    ctx.fillStyle = GOLD; ctx.fillRect(dx + dw / 2 - 22, top + 80, 44, 10)
  }
  // countertop (butcher block)
  ctx.fillStyle = '#f0d9b5'; ctx.fillRect(16, top, 1048, 30)
  ctx.fillStyle = '#fff1da'; ctx.fillRect(16, top, 1048, 6)
  ctx.fillStyle = '#c99f6b'; ctx.fillRect(16, top + 24, 1048, 6)
  ctx.fillStyle = 'rgba(160,110,60,0.35)'; for (let k = 0; k < 18; k++) ctx.fillRect(40 + k * 58, top + 10, 30, 4)
  if (flour > 0) { const r = rng(17); ctx.fillStyle = `rgba(250,246,238,${0.8 * flour})`; for (let i = 0; i < 90; i++) ctx.fillRect(16 + r() * 640, top - 2 + r() * 40, 8 + r() * 10, 6) }
}
/** the hanging utensil rack (behind the cast) */
const LADLE = BM(`..X.. ..X.. ..X.. ..X.. ..X.. .XXX. XXXXX XXXXX .XXX.`)
const WHISK = BM(`..X.. ..X.. ..X.. .XXX. X.X.X X.X.X X.X.X .X.X. ..X..`)
const SPAT = BM(`..X.. ..X.. ..X.. ..X.. .XXX. XXXXX XXXXX XXXXX XXXXX`)
const PAN = BM(`......X ......X ......X ..XXXXX .XXXXX. XXXXXXX XXXXXXX .XXXXX.`)
export function drawRack(ctx, t, { y = 690, x0 = 330, x1 = 760, alpha = 1 } = {}) {
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.fillStyle = INK; ctx.fillRect(x0 - 6, y - 6, x1 - x0 + 12, 16)
  ctx.fillStyle = '#c9cfe0'; ctx.fillRect(x0, y - 2, x1 - x0, 8)
  ctx.fillStyle = INK; ctx.fillRect(x0 + 10, y - 120, 6, 116); ctx.fillRect(x1 - 16, y - 120, 6, 116)
  const items = [[LADLE, '#d6dcef'], [WHISK, '#d6dcef'], [PAN, '#e0503c'], [SPAT, '#f2c75c'], [LADLE, '#d6dcef']]
  items.forEach(([b, col], i) => { const ix = x0 + 50 + i * ((x1 - x0 - 100) / (items.length - 1)); bmp(ctx, b, ix, y + 6, 8, { X: col }, { ax: 0.5, ay: 0, outline: INK, rot: 0.05 * Math.sin(t * 1.6 + i) }) })
  ctx.restore()
}
/** Pisces' little floating prep shelf with a cutting board */
export function drawShelf(ctx, { x = 830, y = 870, w = 190 } = {}) {
  ctx.fillStyle = INK; ctx.fillRect(x - 6, y - 6, w + 12, 34)
  ctx.fillStyle = '#c99f6b'; ctx.fillRect(x, y, w, 22); ctx.fillStyle = '#f0d9b5'; ctx.fillRect(x, y, w, 6)
  // board
  ctx.fillStyle = INK; ctx.fillRect(x + 24, y - 18, w - 48, 16); ctx.fillStyle = '#e8c48e'; ctx.fillRect(x + 28, y - 14, w - 56, 10)
}

// ───────────────────────────────────────── signs
/** the neon "LOVE KITCHEN" sign with two pixel hearts; on 0…1 (flicker handled by the caller) */
const HEART = BM(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
export function drawNeon(ctx, t, { x = 540, y = 520, on = 1, alpha = 1 } = {}) {
  ctx.save(); ctx.globalAlpha *= alpha
  // backing board
  ctx.fillStyle = 'rgba(14,8,32,0.88)'; ctx.fillRect(x - 330, y - 54, 660, 108)
  ctx.strokeStyle = rgba('#ff7ab6', 0.35 + 0.4 * on); ctx.lineWidth = 4; ctx.strokeRect(x - 330, y - 54, 660, 108)
  ctx.font = `700 64px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  const col = on > 0.5 ? '#ff8fc4' : '#5a2a48'
  if (on > 0.5) { ctx.shadowColor = '#ff4fa0'; ctx.shadowBlur = 28 * on }
  ctx.fillStyle = col; ctx.fillText('LOVE KITCHEN', x, y + 4)
  ctx.shadowBlur = 0
  ctx.fillStyle = on > 0.5 ? '#fff0f7' : col; ctx.globalAlpha *= on > 0.5 ? 0.55 : 0; ctx.fillText('LOVE KITCHEN', x, y + 2)
  ctx.restore()
  for (const s of [-1, 1]) bmp(ctx, HEART, x + s * 290, y, 6, { X: on > 0.5 ? '#ff5c8a' : '#4a1e33' }, { outline: INK, alpha: alpha })
}
/** a studio lamp sign (ON AIR / APPLAUSE): box x, y, w, h */
export function drawLamp(ctx, t, { x, y, w, h, text, col, on = 0, alpha = 1, size = 30 }) {
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.fillStyle = INK; ctx.fillRect(x - 6, y - 6, w + 12, h + 12)
  ctx.fillStyle = on > 0.5 ? col : '#2a1a33'
  if (on > 0.5) { ctx.shadowColor = col; ctx.shadowBlur = 34 }
  ctx.fillRect(x, y, w, h)
  ctx.shadowBlur = 0
  ctx.font = `700 ${size}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillStyle = on > 0.5 ? '#fffaf0' : '#5c4a66'; ctx.fillText(text, x + w / 2, y + h / 2 + 2)
  ctx.restore()
}

// ───────────────────────────────────────── fx
/** the POOF: a fast flour cloud from (x, y) at t0; fills, then thins and drifts down */
export function flourCloud(ctx, t, t0, x, y, { R = 760, life = 1.6 } = {}) {
  const dt = t - t0
  if (dt < 0 || dt > life) return
  const grow = ease.outCubic(clamp(dt / 0.22)), fade = 1 - ease.inQuad(clamp((dt - 0.35) / (life - 0.35)))
  const r = rng(77)
  ctx.save()
  for (let i = 0; i < 26; i++) {
    const a = r() * TAU, d = (0.15 + r() * 0.85) * R * grow, rr = (90 + r() * 170) * (0.4 + 0.6 * grow) * (1 + dt * 0.3)
    const cx = x + Math.cos(a) * d, cy = y + Math.sin(a) * d * 0.8 + dt * dt * 60
    const q = 16
    ctx.globalAlpha = fade * (0.75 + 0.25 * r())
    ctx.fillStyle = i % 3 ? '#fbf8f2' : '#ece6dc'
    // pixel-stepped disc
    for (let yy = -rr; yy <= rr; yy += q) { const hw = Math.sqrt(Math.max(0, rr * rr - yy * yy)); ctx.fillRect(Math.round((cx - hw) / q) * q, Math.round((cy + yy) / q) * q, Math.round(hw * 2 / q) * q, q) }
  }
  ctx.restore()
}
/** falling flour specks after the poof */
export function flourSpecks(ctx, t, t0, { n = 90, life = 3, alpha = 1 } = {}) {
  const dt = t - t0
  if (dt < 0 || dt > life) return
  const r = rng(5)
  ctx.save()
  for (let i = 0; i < n; i++) { const x0 = r() * 1080, y0 = 500 + r() * 900, sp = 40 + r() * 80, ph = r() * 6; const yy = y0 + dt * sp, xx = x0 + Math.sin(dt * 2 + ph) * 20; ctx.globalAlpha = alpha * (1 - dt / life) * 0.9; ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(xx), Math.round(yy), 6, 6) }
  ctx.restore()
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
export function drawHearts(ctx, t, t0, x, y, { n = 6, px = 7, spread = 140, life = 1.6, rise = 260, cols = ['#ff5c8a', '#ff8fb1', '#f2c75c'], alpha = 1, loop = false } = {}) {
  for (let i = 0; i < n; i++) {
    let k = (t - t0 - i * 0.18) / life
    if (loop && k > 0) k = k % 1
    if (k < 0 || k > 1) continue
    const hx = x + (((i * 53) % 7) / 6 - 0.5) * spread + Math.sin(k * 6 + i) * 12
    bmp(ctx, HEART, hx, y - k * rise, px, { X: cols[i % cols.length] }, { alpha: alpha * Math.sin(Math.PI * k), outline: INK })
  }
}
/** grey smoke puffs (a scorched hat) */
export function smoke(ctx, t, x, y, px, k = 1) {
  if (k <= 0) return
  for (let s = 0; s < 4; s++) {
    const ph = (t * 0.9 + s * 0.25) % 1, sx = x + Math.sin(ph * 5 + s) * 3 * px, sy = y - ph * 14 * px, sz = px * (2 + ph * 3)
    ctx.save(); ctx.globalAlpha = k * Math.sin(Math.PI * ph) * 0.8
    ctx.fillStyle = INK; ctx.fillRect(sx - sz / 2 - px * 0.4, sy - sz / 2 - px * 0.4, sz + px * 0.8, sz + px * 0.8)
    ctx.fillStyle = '#8a8296'; ctx.fillRect(sx - sz / 2, sy - sz / 2, sz, sz)
    ctx.restore()
  }
}
const DROP = BM(`..X.. .XWX. XWWXX XWXXX .XXX.`)
export function sweatDrop(ctx, t, x, y, px, alpha = 1) { const ph = (t * 1.4) % 1; bmp(ctx, DROP, x, y + ph * px * 6, px, { X: '#7fd0f0', W: '#ffffff' }, { alpha: alpha * (1 - ph * 0.6), outline: INK }) }

// ───────────────────────────────────────── panels + cards
const step = (ctx, X, Y, w, h, P, col) => { ctx.fillStyle = col; ctx.fillRect(X + 2 * P, Y, w - 4 * P, h); ctx.fillRect(X, Y + 2 * P, w, h - 4 * P); ctx.fillRect(X + P, Y + P, w - 2 * P, h - 2 * P) }
export function pixelPanel(ctx, X, Y, w, h, { P = 8, fill = 'rgba(13,8,32,0.94)', border = GOLD, glow = 0.5 } = {}) {
  ctx.save(); ctx.shadowColor = rgba(border, glow); ctx.shadowBlur = 30; step(ctx, X, Y, w, h, P, border); ctx.restore()
  step(ctx, X, Y, w, h, P, border)
  step(ctx, X + P, Y + P, w - 2 * P, h - 2 * P, P, INK)
  step(ctx, X + P * 1.5, Y + P * 1.5, w - 3 * P, h - 3 * P, P, fill)
  ctx.fillStyle = '#fff1c8'; ctx.fillRect(X + 2 * P, Y, P * 4, P / 2); ctx.fillRect(X, Y + 2 * P, P / 2, P * 3)
}
const CHECK = BM(`......X .....XX X...XX. XX.XX.. .XXX... ..X....`)
/** the recipe card: a cream index card with a red header rule. st: { kind: 'dish' | 'real', ticks: [0…1 ×3], strike: 0…1 } */
export function drawCard(ctx, t, box, st) {
  const { x, y, w, h } = box
  ctx.save()
  // card body (cream, pixel corners, ink outline, drop shadow)
  ctx.fillStyle = 'rgba(6,4,18,0.5)'; step(ctx, x + 14, y + 16, w, h, 8, 'rgba(6,4,18,0.5)')
  step(ctx, x - 6, y - 6, w + 12, h + 12, 8, INK)
  step(ctx, x, y, w, h, 8, '#fff6e6')
  // ruled lines
  ctx.fillStyle = '#ff6a7a'; ctx.fillRect(x + 20, y + 92, w - 40, 5)
  ctx.fillStyle = 'rgba(110,160,220,0.35)'; for (let ly = y + 150; ly < y + h - 20; ly += 58) ctx.fillRect(x + 20, ly, w - 40, 3)
  ctx.textBaseline = 'middle'
  if (st.kind === 'dish') {
    ctx.textAlign = 'left'; ctx.font = `700 30px ${MONO}`; ctx.fillStyle = '#b8456b'; ctx.fillText("TODAY'S DISH", x + 36, y + 52)
    ctx.textAlign = 'right'; ctx.fillStyle = '#6b5a7a'; ctx.fillText('SERVES 2', x + w - 36, y + 52)
    ctx.textAlign = 'center'; ctx.font = `800 96px ${INTER}`; ctx.fillStyle = INK; ctx.fillText('The Apology', x + w / 2, y + 176)
    ctx.font = `italic 500 50px ${SERIF}`; ctx.fillStyle = '#7a4a8a'; ctx.fillText('prep: 1 minute · cook: honesty', x + w / 2, y + 240)
  } else {
    ctx.textAlign = 'left'; ctx.font = `700 30px ${MONO}`; ctx.fillStyle = '#b8456b'; ctx.fillText('THE REAL APOLOGY', x + 36, y + 52)
    ctx.textAlign = 'right'; ctx.fillStyle = '#6b5a7a'; ctx.fillText('SERVES 2', x + w - 36, y + 52)
    const rows = [['1', 'OWN IT', '“I did that.”'], ['2', 'NO “BUT”', 'not one.'], ['3', 'FIX IT', '“what can I do?”']]
    rows.forEach(([n, a, b], i) => {
      const ry = y + 150 + i * 62, k = st.ticks[i] || 0
      ctx.globalAlpha = 0.35 + 0.65 * clamp(k * 3)
      ctx.textAlign = 'left'; ctx.font = `800 50px ${INTER}`; ctx.fillStyle = INK; ctx.fillText(`${n}. ${a}`, x + 40, ry)
      const aw = ctx.measureText(`${n}. ${a}`).width
      ctx.font = `italic 500 42px ${SERIF}`; ctx.fillStyle = '#7a4a8a'; ctx.fillText(b, x + 60 + aw, ry + 2)
      ctx.globalAlpha = 1
      if (k > 0) bmp(ctx, CHECK, x + w - 60, ry, 7 * easeOutBack(clamp(k), 2.6), { X: '#2fb36a' }, { outline: INK })
      if (i === 1 && st.strike > 0) {
        // the BUT gets a red scribble through it
        ctx.font = `800 50px ${INTER}`; const pre = ctx.measureText(`${n}. NO `).width, bw = ctx.measureText('“BUT”').width
        ctx.fillStyle = '#e8263f'; ctx.fillRect(x + 40 + pre - 6, ry - 4, (bw + 12) * clamp(st.strike), 9)
      }
    })
  }
  ctx.restore()
}
/** the talk card for the tie-in: a question + two face-down answers that flip when both have played */
export function drawTalkCard(ctx, t, box, st) {
  const { x, y, w, h } = box
  pixelPanel(ctx, x, y, w, h, { P: 8, glow: 0.6, fill: 'rgba(16,9,38,0.97)' })
  ctx.save(); ctx.textBaseline = 'middle'; ctx.textAlign = 'center'
  ctx.font = `700 28px ${MONO}`; ctx.fillStyle = GOLD; ctx.fillText('★ TALK CARD ★', x + w / 2, y + 56)
  ctx.font = `800 58px ${INTER}`; ctx.fillStyle = BONE
  ctx.fillText('When I mess up,', x + w / 2, y + 150); ctx.fillText('what helps most?', x + w / 2, y + 220)
  const cw = 270, ch = 250, gy = y + 300
  ;[[x + w / 2 - cw - 18, st.flip[0], '♈︎ ARIES', 'own it.', '#ff7a5c'], [x + w / 2 + 18, st.flip[1], '♎︎ LIBRA', 'soup.', '#ff9ce8']].forEach(([cx, f, who, ans, col], i) => {
    const played = st.played[i]
    if (played <= 0) return
    const pk = easeOutBack(clamp(played), 2)
    const sx = Math.abs(Math.cos(Math.PI * clamp(f)))
    const face = f > 0.5
    ctx.save(); ctx.translate(cx + cw / 2, gy + ch / 2); ctx.scale(sx * pk, pk)
    ctx.fillStyle = INK; ctx.fillRect(-cw / 2 - 6, -ch / 2 - 6, cw + 12, ch + 12)
    ctx.fillStyle = face ? '#fff6e6' : '#3a2466'; ctx.fillRect(-cw / 2, -ch / 2, cw, ch)
    if (!face) {
      ctx.strokeStyle = GOLD; ctx.lineWidth = 4; ctx.strokeRect(-cw / 2 + 14, -ch / 2 + 14, cw - 28, ch - 28)
      drawPixelStar(ctx, 0, -8, 44, 2, GOLD)
      ctx.font = `700 22px ${MONO}`; ctx.fillStyle = BONE; ctx.fillText('HIDDEN', 0, 70)
    } else {
      ctx.font = `italic 500 64px ${SERIF}`; ctx.fillStyle = INK; ctx.fillText(ans, 0, -6)
    }
    ctx.restore()
    ctx.font = `700 26px ${MONO}`; ctx.fillStyle = col; ctx.globalAlpha = clamp(played * 2); ctx.fillText(who + (played >= 1 ? ' ✓' : ''), cx + cw / 2, gy + ch + 40); ctx.globalAlpha = 1
  })
  ctx.restore()
}
