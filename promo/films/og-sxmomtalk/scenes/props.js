// sxmomtalk props — THE STARS EXPLAIN IT TO YOUR MOM (Star Talk Shows, show 5). Small pixel drawings on canvas, kept
// inside this film's folder (each Mom episode carries its own copy so no film reaches into another's folder).
// Pure functions of their arguments; nothing touches `document` at module load.
//
//   starFrame / inSprite / FOOT / tearsCells   overlay maths mirrored from startalk.js drawStarChar (via stpirates), so
//                                              costume pieces drawn in sprite CELLS ride every hop, bob and squash
//   mom(ctx, x, y, size, t, opts)              MOM: a ♋ Cancer star with a little grey bun, a heather-rose cardigan and
//                                              tortoiseshell reading glasses on a beaded chain. opts = drawStarChar opts +
//                                              { glassesDown 0…1, cardigan (default true) }
//   blit / drawArmchair / drawTeacup / drawLamp / drawRug / drawEasel / drawSunIcon / drawMoonIcon / drawRisingIcon /
//   drawTissues / drawPhone / drawPointer / sparkle / confetti     world props (px)
import { clamp, lerp, rng, ease } from '../../../src/lib.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { drawPixelStar } from '../../sky.js'

const TAU = Math.PI * 2
export const INK = '#1b1236'
const G = 36, HALF = 18
const SC = { x: 18, y: 19.6, R: 17.6, r: 9.4, round: 2.6 }
const FOOT_ROW = SC.y + SC.R * Math.cos(Math.PI / 5)

// ── colour helpers
export const hexRgb = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255] }
const toHex = (r, g, b) => '#' + [r, g, b].map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('')
export const mixHex = (a, b, k) => { const A = hexRgb(a), B = hexRgb(b); return toHex(...A.map((v, i) => lerp(v, B[i], clamp(k)))) }
export const rgba = (hex, a) => { const [r, g, b] = hexRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }

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
/** cell (i, j) of a star drawn at (x, y, size) → screen px (ignores squash; good for anchoring hand-held props) */
export function cellPt(F, i, j) { return { x: F.ox + (i - HALF) * F.cell * F.sx, y: F.oy + ((j - HALF) * F.cell - F.base) * F.sy } }
/** the star's base (feet) y offset from its centre, as a fraction of size */
export const FOOT = (FOOT_ROW - HALF) / G

// the star body mask (same maths as startalk.js), so the cardigan only ever covers the star
let MASK = null
function bodyMask() {
  if (MASK) return MASK
  const V = []
  const R0 = SC.R - SC.round, r0 = SC.r - SC.round * 0.55
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
  const m = new Uint8Array(G * G)
  for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) if (sd(i + 0.5, j + 0.5) <= 0) m[j * G + i] = 1
  MASK = m; return m
}
const inMask = (i, j) => i >= 0 && j >= 0 && i < G && j < G && bodyMask()[j * G + i] === 1

// ── happy tears (from stcomet). k: 1 sniffle · 2 streams · 3 fountains
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

// ═══════════════════════════════════ MOM (cells) ═══════════════════════════════════
export const MOM = { ...signStar('cancer'), knit: '#c98aa8', knitD: '#a86a8c', knitL: '#e3abc3', button: '#f2c75c', frame: '#8a4a2a', frameHi: '#d99a5a', bun: '#d8d0ea', bunD: '#a99fc4' }
const px1 = (ctx, i, j, c, w = 1, h = 1) => { ctx.fillStyle = c; ctx.fillRect(i, j, w + 0.02, h + 0.02) }

/** the little grey bun on the top point, with a gold pin */
function bunCells(ctx) {
  const rows = ['..XXXX..', '.XXXXXX.', 'XXXDXXXX', 'XXXXXDXX', '.XXXXXX.']
  rows.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') px1(ctx, 14 + i, -3 + j, c === 'D' ? MOM.bunD : MOM.bun) }))
  // outline
  ctx.fillStyle = INK
  rows.forEach((r, j) => [...r].forEach((c, i) => {
    if (c === '.') return
    for (const [a, b] of [[1, 0], [-1, 0], [0, -1]]) { const rr = rows[j + b], cc = rr ? rr[i + a] : undefined; if (!cc || cc === '.') ctx.fillRect(14 + i + a, -3 + j + b, 1.02, 1.02) }
  }))
  px1(ctx, 20, -4, MOM.button); px1(ctx, 21, -5, MOM.button)
}
/** the cardigan: knit body below the cheeks (open V, three gold buttons) + cuffs on both arm points */
function cardiganCells(ctx) {
  const BADGE = { x: 27.6, y: 29.4, r: 5.4 }
  for (let j = 24; j < 33; j++) for (let i = 0; i < G; i++) {
    if (!inMask(i, j)) continue
    if (Math.hypot(i + 0.5 - BADGE.x, j + 0.5 - BADGE.y) < BADGE.r) continue
    const vHalf = Math.max(0, (28.5 - j) * 0.55)
    if (Math.abs(i + 0.5 - 18) < vHalf) continue
    const edge = !inMask(i, j + 1) || j === 32
    let c = (i + j) % 4 === 0 ? MOM.knitD : MOM.knit
    if ((i % 6 === 2 || i % 6 === 3) && j % 2 === 0) c = MOM.knitL     // little cable ribs
    if (edge || j === 31) c = MOM.knitD
    px1(ctx, i, j, c)
  }
  // the V's trim + the buttons
  for (let j = 24; j <= 28; j++) { const h = (28.5 - j) * 0.55; px1(ctx, Math.round(18 - h) - 1, j, MOM.knitD); px1(ctx, Math.round(18 + h), j, MOM.knitD) }
  for (const j of [29, 31]) { px1(ctx, 17.5, j, INK, 1.2, 1.2); px1(ctx, 17.6, j + 0.1, MOM.button, 1, 1) }
  // cuffs on the two side points
  for (const [i0, i1] of [[0, 6], [30, 36]]) for (let j = 10; j < 20; j++) for (let i = i0; i < i1; i++) {
    if (!inMask(i, j)) continue
    const outer = i0 === 0 ? i < 3 : i > 32
    if (!outer) continue
    px1(ctx, i, j, (j % 2) ? MOM.knit : MOM.knitD)
  }
}
const LENS = [[8, 14], [19, 14]], LW = 9, LH = 9
function glassesCells(ctx, t, down = 0, fog = 0) {
  const dy = Math.round(down * 5)
  for (const [lx, ly0] of LENS) {
    const ly = ly0 + dy
    ctx.fillStyle = rgba('#bfefff', 0.14 + 0.6 * clamp(fog)); ctx.fillRect(lx + 1, ly + 1, LW - 2, LH - 2)
    for (let j = 0; j < LH; j++) for (let i = 0; i < LW; i++) {
      const edge = i === 0 || j === 0 || i === LW - 1 || j === LH - 1, corner = (i === 0 || i === LW - 1) && (j === 0 || j === LH - 1)
      if (edge && !corner) px1(ctx, lx + i, ly + j, (i + j) % 3 === 0 ? MOM.frameHi : MOM.frame)
    }
    for (const [i, j] of [[1, 1], [LW - 2, 1], [1, LH - 2], [LW - 2, LH - 2]]) px1(ctx, lx + i, ly + j, MOM.frame)
    px1(ctx, lx + 2, ly + 1, '#fff3c8'); px1(ctx, lx + 1, ly + 2, '#fff3c8')
  }
  px1(ctx, 17, 16 + dy, MOM.frame, 2, 1); px1(ctx, 6, 16 + dy, MOM.frame, 2, 1); px1(ctx, 28, 16 + dy, MOM.frame, 2, 1)
  // the beaded chain, swinging a little under the chin
  const sw = Math.sin(t * 2.4) * 1.1
  for (let k = 0; k <= 12; k++) {
    const u = k / 12, ci = lerp(6, 29, u), cj = 17 + dy + Math.sin(u * Math.PI) * 8 + sw * Math.sin(u * Math.PI)
    if (k % 2 === 0) px1(ctx, Math.round(ci), Math.round(cj), k % 4 === 0 ? MOM.button : '#fff3dc')
  }
}
/** MOM. Returns the star frame (for anchoring the teacup etc.) */
export function mom(ctx, x, y, size, t, o = {}) {
  drawStarChar(ctx, x, y, size, t, { color: MOM.color, glyph: MOM.glyph, ...o })
  const F = starFrame(x, y, size, t, o)
  if ((o.alpha ?? 1) <= 0 || (o.pop ?? 1) <= 0) return F
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1
  inSprite(ctx, F, () => {
    bunCells(ctx)
    if (o.cardigan !== false) cardiganCells(ctx)
    glassesCells(ctx, t, o.glassesDown || 0, o.fog || 0)
    if (o.tears) tearsCells(ctx, t, o.tears)
  })
  ctx.restore()
  return F
}

// ═══════════════════════════════════ world props (px) ═══════════════════════════════════
export function blit(ctx, rows, pal, x, y, c, { outline = INK, flip = false } = {}) {
  const w = rows[0].length, h = rows.length, ox = Math.round(x - w * c / 2), oy = Math.round(y - h * c / 2)
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && pal[rows[j][flip ? w - 1 - i : i]]
  if (outline) {
    ctx.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) ctx.fillRect(ox + i * c, oy + j * c, c, c)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const col = on(i, j); if (col) { ctx.fillStyle = col; ctx.fillRect(ox + i * c, oy + j * c, c + 0.5, c + 0.5) } }
}

const ARMCHAIR = [
  '...BBBBBBBBBBBBBBBBBBBB...',
  '..BbbbbbbbbbbbbbbbbbbbbB..',
  '..BbBBBBBBBBBBBBBBBBBBbB..',
  '..BbBbbbbbbbbbbbbbbbBbB...',
  '..BbBbbbbbbbbbbbbbbbBbB...',
  '..BbBbbbbbbbbbbbbbbbBbB...',
  '..BbBbbbbbbbbbbbbbbbBbB...',
  'AAAAABbbbbbbbbbbbbbbBAAAAA',
  'AaaaaABbbbbbbbbbbbbBAaaaaA',
  'AaaaaAAAAAAAAAAAAAAAAaaaaA',
  'AaaaaASSSSSSSSSSSSSSAaaaaA',
  'AaaaaAsssssssssssssSAaaaaA',
  'AaaaaASSSSSSSSSSSSSSAaaaaA',
  'AAAAAAAAAAAAAAAAAAAAAAAAAA',
  'AaaaaaaaaaaaaaaaaaaaaaaaaA',
  'AAAAAAAAAAAAAAAAAAAAAAAAAA',
  '.LL....................LL.',
  '.LL....................LL.',
]
/** a rose velvet armchair; (cx, top) = top centre, c = cell px */
export function drawArmchair(ctx, cx, top, c) {
  blit(ctx, ARMCHAIR, { B: '#9b4a6c', b: '#b8607f', A: '#8a3d5e', a: '#a9567a', S: '#c7739a', s: '#d98fb0', L: '#5a3424' }, cx, top + ARMCHAIR.length * c / 2, c)
  // a crocheted doily on the backrest
  ctx.fillStyle = '#fbf3e6'
  for (let i = 0; i < 8; i++) ctx.fillRect(Math.round(cx - 4 * c + i * c), Math.round(top + 1.2 * c), c * 0.7, c * 0.7)
  for (let i = 0; i < 6; i++) ctx.fillRect(Math.round(cx - 3 * c + i * c + c * 0.15), Math.round(top + 2.1 * c), c * 0.7, c * 0.7)
}

const CUP = ['..........', 'WWWWWWWW..', 'WTTTTTTW..', 'WWWWWWWWHH', 'WWWWWWWW.H', 'WWWWWWWW.H', 'WWWWWWWWHH', '.WWWWWW...', '..WWWW....', 'SSSSSSSSSS']
/** a china teacup on its saucer, steam rising. glyph = printed on the side (shown when `turn` > 0.5) */
export function drawTeacup(ctx, x, y, c, t, { steam = 1, glyph = '♋︎', show = 0, tilt = 0 } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(tilt)
  blit(ctx, CUP, { W: '#fbf3e6', T: '#c98a4a', H: '#fbf3e6', S: '#e8d8f0' }, 0, 0, c)
  // a pink rim band + a little flower
  ctx.fillStyle = '#ff8fb1'; ctx.fillRect(Math.round(-5 * c), Math.round(-1.5 * c), 8 * c, c * 0.6)
  if (show > 0) {
    ctx.globalAlpha *= clamp(show)
    ctx.font = `700 ${Math.round(c * 4)}px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillStyle = '#3f7cf0'; ctx.fillText(glyph, -c, 0.6 * c)
    ctx.globalAlpha /= clamp(show) || 1
  } else {
    ctx.fillStyle = '#ff8fb1'; ctx.fillRect(Math.round(-2 * c), Math.round(0.2 * c), c, c); ctx.fillRect(Math.round(-1 * c), Math.round(-0.6 * c), c, c); ctx.fillRect(Math.round(-1 * c), Math.round(1 * c), c, c); ctx.fillRect(Math.round(0), Math.round(0.2 * c), c, c)
    ctx.fillStyle = '#f2c75c'; ctx.fillRect(Math.round(-1 * c), Math.round(0.2 * c), c, c)
  }
  ctx.restore()
  if (steam > 0) {
    for (let k = 0; k < 3; k++) {
      const ph = (t * 0.7 + k / 3) % 1
      ctx.save(); ctx.globalAlpha *= Math.sin(Math.PI * ph) * 0.75 * steam; ctx.fillStyle = '#ffffff'
      const sx = x - c + (k - 1) * c * 1.6 + Math.sin(ph * 6 + k) * c * 0.8, sy = y - c * 6 - ph * c * 8
      ctx.fillRect(Math.round(sx), Math.round(sy), c, c * 1.4); ctx.restore()
    }
  }
}

/** a little floor lamp with a fringed shade + a warm pool of light */
export function drawLamp(ctx, x, floorY, c, t, on = 1) {
  if (on > 0) {
    const g = ctx.createRadialGradient(x, floorY - 30 * c, 10, x, floorY - 30 * c, 46 * c)
    g.addColorStop(0, `rgba(255,214,140,${0.32 * on})`); g.addColorStop(1, 'rgba(255,214,140,0)')
    ctx.fillStyle = g; ctx.fillRect(x - 50 * c, floorY - 80 * c, 100 * c, 90 * c)
  }
  ctx.fillStyle = INK; ctx.fillRect(x - c, floorY - 30 * c, c * 2.2, 30 * c); ctx.fillRect(x - 5 * c, floorY - 1.5 * c, 10 * c, 2 * c)
  ctx.fillStyle = '#c9a56a'; ctx.fillRect(x - c * 0.5, floorY - 30 * c, c, 30 * c)
  const SHADE = ['...SSSSSS...', '..SSSSSSSS..', '.SSSSSSSSSS.', 'SSSSSSSSSSSS', 'FFFFFFFFFFFF', 'F.F.F.F.F.F.']
  blit(ctx, SHADE, { S: '#ffcf8a', F: '#e8846a' }, x, floorY - 34 * c, c)
}
/** an oval braided rug */
export function drawRug(ctx, cx, cy, rx, ry) {
  const rings = ['#7a3a5e', '#c98a4a', '#9b4a6c', '#e8b07a', '#7a3a5e']
  rings.forEach((col, i) => {
    const k = 1 - i * 0.16
    ctx.fillStyle = col
    for (let y = -ry * k; y <= ry * k; y += 8) { const w = rx * k * Math.sqrt(Math.max(0, 1 - (y / (ry * k)) ** 2)); ctx.fillRect(Math.round((cx - w) / 8) * 8, Math.round((cy + y) / 8) * 8, Math.round(2 * w / 8) * 8, 8) }
  })
}
/** an easel with a cream flip-chart board; returns the board rect */
export function drawEasel(ctx, cx, top, w, h, { k = 1 } = {}) {
  const x0 = cx - w / 2
  ctx.save(); ctx.globalAlpha *= clamp(k)
  // legs
  ctx.fillStyle = INK
  ctx.beginPath(); ctx.moveTo(cx - w * 0.36, top + h); ctx.lineTo(cx - w * 0.44, top + h + 190); ctx.lineTo(cx - w * 0.44 + 22, top + h + 190); ctx.lineTo(cx - w * 0.36 + 22, top + h); ctx.fill()
  ctx.beginPath(); ctx.moveTo(cx + w * 0.36, top + h); ctx.lineTo(cx + w * 0.44, top + h + 190); ctx.lineTo(cx + w * 0.44 - 22, top + h + 190); ctx.lineTo(cx + w * 0.36 - 22, top + h); ctx.fill()
  ctx.fillStyle = '#a8742a'
  ctx.fillRect(cx - w * 0.4 + 2, top + h + 10, 12, 170); ctx.fillRect(cx + w * 0.4 - 14, top + h + 10, 12, 170)
  // the board
  ctx.fillStyle = INK; ctx.fillRect(x0 - 10, top - 10, w + 20, h + 20)
  ctx.fillStyle = '#8a5a2c'; ctx.fillRect(x0 - 4, top - 4, w + 8, h + 8)
  ctx.fillStyle = '#fbf3e6'; ctx.fillRect(x0 + 6, top + 6, w - 12, h - 12)
  ctx.fillStyle = 'rgba(122,58,42,0.07)'; for (let y = top + 40; y < top + h - 10; y += 46) ctx.fillRect(x0 + 18, y, w - 36, 2)
  // the clip on top + tray
  ctx.fillStyle = INK; ctx.fillRect(cx - 50, top - 26, 100, 30); ctx.fillStyle = '#c9a56a'; ctx.fillRect(cx - 44, top - 20, 88, 18)
  ctx.fillStyle = INK; ctx.fillRect(x0 - 20, top + h + 6, w + 40, 20); ctx.fillStyle = '#a8742a'; ctx.fillRect(x0 - 14, top + h + 10, w + 28, 10)
  ctx.restore()
  return { x: x0 + 6, y: top + 6, w: w - 12, h: h - 12 }
}

/** pixel sun (rays turn slowly) */
export function drawSunIcon(ctx, x, y, r, t, { col = '#f7b733', face = true } = {}) {
  const c = Math.max(4, Math.round(r / 6))
  for (let k = 0; k < 8; k++) {
    const a = k * TAU / 8 + t * 0.4
    for (let d = 0; d < 3; d++) { const rr = r * 1.18 + d * c * 1.1; ctx.fillStyle = d === 2 ? '#ffd98a' : col; ctx.fillRect(Math.round((x + Math.cos(a) * rr) / c) * c - c / 2, Math.round((y + Math.sin(a) * rr) / c) * c - c / 2, c, c) }
  }
  pixelDisc(ctx, x, y, r, c, (i, j, R) => (Math.hypot(i, j) > R - 1.2 ? '#e8902a' : (i < -R * 0.3 && j < -R * 0.3 ? '#fff0b0' : col)))
  if (face) { ctx.fillStyle = INK; ctx.fillRect(Math.round(x - r * 0.38), Math.round(y - r * 0.15), c, c * 1.5); ctx.fillRect(Math.round(x + r * 0.28), Math.round(y - r * 0.15), c, c * 1.5) }
}
/** pixel crescent moon */
export function drawMoonIcon(ctx, x, y, r, { col = '#dfe6ff' } = {}) {
  const c = Math.max(4, Math.round(r / 6))
  pixelDisc(ctx, x, y, r, c, (i, j, R) => (Math.hypot(i - R * 0.42, j - R * 0.22) < R * 0.86 ? null : Math.hypot(i, j) > R - 1.2 ? '#8f9fd8' : col))
  ctx.fillStyle = INK; ctx.fillRect(Math.round(x - r * 0.55), Math.round(y - r * 0.1), c, c * 1.5)
}
/** a horizon line with a half-risen sun + little "up" chevrons */
export function drawRisingIcon(ctx, x, y, r, t, { col = '#ff8f6b' } = {}) {
  const c = Math.max(4, Math.round(r / 6))
  ctx.save(); ctx.beginPath(); ctx.rect(x - r * 2, y - r * 2, r * 4, r * 2 + 2); ctx.clip()
  const lift = Math.sin(t * 1.6) * c * 0.6
  pixelDisc(ctx, x, y + r * 0.25 - lift, r, c, (i, j, R) => (Math.hypot(i, j) > R - 1.2 ? '#e0603a' : col))
  for (let k = 0; k < 5; k++) { const a = Math.PI + (k + 1) * Math.PI / 6; ctx.fillStyle = '#ffb38a'; ctx.fillRect(Math.round(x + Math.cos(a) * r * 1.5 - c / 2), Math.round(y + Math.sin(a) * r * 1.5 - c / 2 - lift), c, c) }
  ctx.restore()
  ctx.fillStyle = INK; ctx.fillRect(Math.round(x - r * 1.9), Math.round(y), Math.round(r * 3.8), c * 1.4)
  ctx.fillStyle = '#7a3a2a'; ctx.fillRect(Math.round(x - r * 1.9), Math.round(y + c * 0.2), Math.round(r * 3.8), c)
}
function pixelDisc(ctx, x, y, r, c, colAt) {
  const R = r / c
  for (let j = -Math.ceil(R); j <= Math.ceil(R); j++) for (let i = -Math.ceil(R); i <= Math.ceil(R); i++) {
    if (Math.hypot(i, j) > R) continue
    const col = colAt(i, j, R); if (!col) continue
    ctx.fillStyle = col; ctx.fillRect(Math.round(x + i * c - c / 2), Math.round(y + j * c - c / 2), c + 0.5, c + 0.5)
  }
}

/** a tissue box with one tissue popping up */
export function drawTissues(ctx, x, y, c, t) {
  const BOX = ['TTTTTTTTTT', 'BBBBBBBBBB', 'BbBBbBBbBB', 'BBBBBBBBBB', 'BBbBBbBBbB', 'BBBBBBBBBB']
  blit(ctx, BOX, { B: '#7fd0f0', b: '#bff0ff', T: '#5aa8d0' }, x, y, c)
  const wv = Math.sin(t * 5) * c * 0.4
  const TIS = ['..WW..', '.WWWW.', 'WWWWWW', '.WWWW.']
  blit(ctx, TIS, { W: '#ffffff' }, x + wv, y - 5 * c, c)
}
/** a phone (screen-space): w × h, with content drawn by fn(x0, y0, w, h) inside the screen */
export function drawPhone(ctx, cx, cy, w, h, fn, { rot = 0, k = 1 } = {}) {
  if (k <= 0) return
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(k, k)
  ctx.fillStyle = INK; ctx.fillRect(-w / 2 - 12, -h / 2 - 12, w + 24, h + 24)
  ctx.fillStyle = '#2a1b46'; ctx.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  ctx.fillStyle = '#120a24'; ctx.fillRect(-w / 2, -h / 2, w, h)
  ctx.fillStyle = '#2a1b46'; ctx.fillRect(-30, -h / 2 + 8, 60, 10)
  ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.clip(); fn(-w / 2, -h / 2, w, h); ctx.restore()
  ctx.restore()
}
/** a wooden pointer stick from (x0, y0) to (x1, y1) with a red tip */
export function drawPointer(ctx, x0, y0, x1, y1) {
  ctx.save(); ctx.lineCap = 'square'
  ctx.strokeStyle = INK; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke()
  ctx.strokeStyle = '#c9a56a'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke()
  ctx.fillStyle = INK; ctx.fillRect(x1 - 11, y1 - 11, 22, 22); ctx.fillStyle = '#ff6b9a'; ctx.fillRect(x1 - 6, y1 - 6, 12, 12)
  ctx.restore()
}
/** a ring of pixel stars bursting out of (cx, cy) at t0 */
export function sparkle(ctx, t, cx, cy, t0, { n = 10, R = 160, size = 26, seed = 1, cols = ['#f2c75c', '#efe6d6', '#ff8fb1', '#c9a6ff', '#7fe0ff'], life = 0.75 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  const p = ease.outCubic(tt / life)
  ctx.save(); ctx.globalAlpha *= 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) { const a = (i / n) * TAU + seed; drawPixelStar(ctx, cx + Math.cos(a) * R * (0.5 + 0.7 * p), cy + Math.sin(a) * R * (0.5 + 0.7 * p), size * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
  ctx.restore()
}
/** confetti falling from the top over [t0, t0 + life] */
export function confetti(ctx, t, t0, { n = 70, life = 2.6, W = 1080, H = 1920, seed = 3 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  const R = rng(seed), cols = ['#f2c75c', '#ff8fb1', '#7fe0ff', '#c9a6ff', '#7dffb0', '#efe6d6']
  ctx.save(); ctx.globalAlpha *= 1 - ease.inQuad(clamp((tt - life + 0.6) / 0.6))
  for (let i = 0; i < n; i++) {
    const x0 = R() * W, v = 600 + R() * 700, delay = R() * 0.5, sw = R() * TAU, col = cols[i % cols.length]
    const k = tt - delay
    if (k < 0) continue
    const yy = -40 + v * k, xx = x0 + Math.sin(k * 4 + sw) * 40
    if (yy > H + 40) continue
    const flip = Math.abs(Math.cos(k * 9 + sw))
    ctx.fillStyle = col; ctx.fillRect(Math.round(xx), Math.round(yy), 16, Math.max(3, 12 * flip))
  }
  ctx.restore()
}
