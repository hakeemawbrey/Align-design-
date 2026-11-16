// stbaggage props: small pixel drawings on canvas (Star Talk season 3, "Baggage Claim."). Every prop is a pure draw call
// in world px with an art-pixel size p (crisp rectangles), so it sits next to the pixel stars.
//   drawBelt(ctx, t, travel, { x0, x1, y })            the carousel belt seen from the front: moving plates (travel = px moved)
//   drawModule(ctx, t, o)                                the arrivals hatch: hazard frame, rubber flaps, BELT 3 sign, beacon
//   drawBoard(ctx, t, x, y, w, state)                    the split-flap ARRIVALS / DEPARTURES board (screen space)
//   drawTag(ctx, x, y, lines, o)                         a paper luggage tag hanging on a string from (x, y)
//   drawTrunk / drawTote / drawDuffel / drawCase / drawCrate   the baggage (x, y = bottom centre)
//   drawPretzel, drawList, drawWetFloor, drawDrop, drawPuddle, drawTear, drawSweat, drawPixelHeart, sparkle helpers
import { clamp, rng } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'

export const OUT = '#170d2c'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"

/** crisp rect (edges rounded so neighbours butt without gaps) */
export const R = (ctx, x, y, w, h, c) => {
  const x0 = Math.round(x), y0 = Math.round(y)
  ctx.fillStyle = c; ctx.fillRect(x0, y0, Math.round(x + w) - x0, Math.round(y + h) - y0)
}
/** bitmap helper: rows of chars, pal maps char → colour; (x, y) = top-left */
export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) R(ctx, x + i * px, y + j * px, px, px, c) } })
}
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
/** a stepped-corner block (2 steps of s px) */
function block(ctx, x, y, w, h, s, c) {
  R(ctx, x + 2 * s, y, w - 4 * s, h, c); R(ctx, x + s, y + s, w - 2 * s, h - 2 * s, c); R(ctx, x, y + 2 * s, w, h - 4 * s, c)
}

// ─────────────────────────────── the belt
export function drawBelt(ctx, t, travel, { x0 = 36, x1 = 1700, y = 1168 } = {}) {
  const H = 124
  ctx.save()
  // underglow
  const g = ctx.createLinearGradient(0, y + H - 10, 0, y + H + 70)
  g.addColorStop(0, 'rgba(90,209,255,0.32)'); g.addColorStop(1, 'rgba(90,209,255,0)')
  ctx.fillStyle = g; ctx.fillRect(x0 + 30, y + H - 10, x1 - x0 - 30, 80)
  // the rounded left end (the belt wraps round): clip everything to a pill end
  ctx.beginPath(); ctx.roundRect(x0, y, x1 - x0, H, [44, 0, 0, 44]); ctx.clip()
  // skirt
  R(ctx, x0, y + 40, x1 - x0, H - 40, '#2b2442')
  R(ctx, x0, y + 40, x1 - x0, 5, '#4a4170')
  R(ctx, x0, y + 70, x1 - x0, 4, '#362e52')
  for (let rx = x0 + 52; rx < x1; rx += 66) { R(ctx, rx, y + 88, 6, 6, '#8d84ab'); R(ctx, rx, y + 88, 3, 3, '#c4bce0') }
  R(ctx, x0, y + H - 8, x1 - x0, 4, '#17112a')
  R(ctx, x0, y + H - 4, x1 - x0, 4, '#5ad1ff')
  // rail
  R(ctx, x0, y + 30, x1 - x0, 8, '#c4bce0'); R(ctx, x0, y + 36, x1 - x0, 4, '#8d84ab'); R(ctx, x0, y + 30, x1 - x0, 2, '#ffffff')
  // plates (overlapping slats, slanted seams), scrolling left with the belt
  R(ctx, x0, y, x1 - x0, 30, '#3b3354')
  const PW = 46, off = ((travel % PW) + PW) % PW
  for (let sx = x0 - PW - off + PW; sx < x1 + PW; sx += PW) {
    R(ctx, sx, y + 2, PW - 4, 26, '#4a4166'); R(ctx, sx, y + 2, PW - 4, 4, '#6a5f8e')
    for (let k = 0; k < 7; k++) R(ctx, sx - 4 - k * 1.2, y + 2 + k * 4, 3, 4, '#221a38')
  }
  R(ctx, x0, y, x1 - x0, 3, '#251d3d')
  ctx.restore()
}

// ─────────────────────────────── the arrivals hatch (a floating module, behind the belt)
export const HATCH = { x: 892, top: 905, bottom: 1196, ox: 930, oy: 990, ow: 142, oh: 178 }
export function drawModule(ctx, t, { x1 = 1700, flap = 0, red = 0, beacon = 1, crack = 0, shake = 0 } = {}) {
  const { x, top, bottom, ox, oy, ow, oh } = HATCH
  ctx.save(); ctx.translate(shake, 0)
  // body
  R(ctx, x - 4, top - 4, x1 - x + 8, bottom - top + 8, OUT)
  R(ctx, x, top, x1 - x, bottom - top, '#342c52')
  R(ctx, x, top, 12, bottom - top, '#463d6a')
  for (let px = x + 150; px < x1; px += 150) R(ctx, px, top + 14, 3, bottom - top - 20, '#2a2344')
  for (let px = x + 30; px < x1; px += 75) { R(ctx, px, top + 20, 5, 5, '#5a5080'); R(ctx, px, bottom - 26, 5, 5, '#5a5080') }
  // top ledge
  R(ctx, x - 10, top - 12, x1 - x + 10, 14, '#4e4670'); R(ctx, x - 10, top - 12, x1 - x + 10, 3, '#8d84ab')
  // hazard frame round the opening
  ctx.save(); ctx.beginPath(); ctx.rect(ox - 16, oy - 16, ow + 32, oh + 16); ctx.clip()
  R(ctx, ox - 16, oy - 16, ow + 32, oh + 16, '#1a1030')
  ctx.fillStyle = '#ffc93c'
  for (let k = -12; k < 20; k++) { ctx.beginPath(); const sx = ox - 16 + k * 26; ctx.moveTo(sx, oy - 16); ctx.lineTo(sx + 13, oy - 16); ctx.lineTo(sx + 13 + oh + 16, oy + oh); ctx.lineTo(sx + oh + 16, oy + oh); ctx.closePath(); ctx.fill() }
  ctx.restore()
  // the opening: dark, lit a little from inside
  R(ctx, ox, oy, ow, oh, '#0b0718')
  const ig = ctx.createLinearGradient(0, oy, 0, oy + oh); ig.addColorStop(0, 'rgba(255,190,120,0.18)'); ig.addColorStop(1, 'rgba(255,190,120,0)')
  ctx.fillStyle = ig; ctx.fillRect(ox, oy, ow, oh)
  if (crack > 0) { ctx.globalAlpha = clamp(crack); R(ctx, ox - 16, oy - 22, 6, 10, '#1a1030'); R(ctx, ox - 10, oy - 30, 6, 10, '#1a1030'); R(ctx, ox + ow + 8, oy - 24, 6, 12, '#1a1030'); ctx.globalAlpha = 1 }
  // the sign
  R(ctx, ox + 6, oy - 66, ow - 12, 40, OUT); R(ctx, ox + 9, oy - 63, ow - 18, 34, '#1b1236')
  ctx.font = `700 22px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#efe6d6'
  if ('letterSpacing' in ctx) ctx.letterSpacing = '3px'
  ctx.fillText('BELT 3', ox + ow / 2 + 2, oy - 45)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
  // beacon (on the ledge, left end): amber, or red when it jams
  const bx = x + 250, by = top - 12
  R(ctx, bx - 18, by - 10, 36, 10, '#4e4670'); R(ctx, bx - 18, by - 10, 36, 2, '#8d84ab')
  const col = red > 0.5 ? '#ff3b4f' : '#ffb347', hi = red > 0.5 ? '#ffb0b8' : '#ffe2a8'
  R(ctx, bx - 12, by - 28, 24, 18, col); R(ctx, bx - 8, by - 32, 16, 4, col); R(ctx, bx - 8, by - 26, 5, 6, hi)
  if (beacon > 0) {
    const sw = Math.sin(t * (red > 0.5 ? 14 : 7))
    ctx.save(); ctx.globalCompositeOperation = 'lighter'
    const gl = ctx.createRadialGradient(bx, by - 20, 0, bx, by - 20, 120)
    gl.addColorStop(0, rgba(col, 0.55 * beacon)); gl.addColorStop(1, rgba(col, 0))
    ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(bx, by - 20, 120, 0, Math.PI * 2); ctx.fill()
    // the rotating beam
    ctx.fillStyle = rgba(col, 0.22 * beacon * Math.abs(sw))
    ctx.beginPath(); ctx.moveTo(bx, by - 20); ctx.lineTo(bx + sw * 260, by - 90); ctx.lineTo(bx + sw * 260, by + 40); ctx.closePath(); ctx.fill()
    ctx.restore()
  }
  ctx.restore()
}
/** the rubber flaps over the opening (drawn AFTER whatever is inside); flap 0…1 lifts them, w = a bag pushing through */
export function drawFlaps(ctx, t, flap = 0, shake = 0) {
  const { ox, oy, ow, oh } = HATCH, n = 6, sw = ow / n
  ctx.save(); ctx.translate(shake, 0)
  for (let i = 0; i < n; i++) {
    const lift = clamp(flap) * (0.55 + 0.35 * Math.sin(i * 1.7 + t * 9)), h = (oh - 6) * (1 - lift * 0.82)
    const skew = -lift * 26
    for (let k = 0; k < h; k += 6) { const dx = skew * (k / Math.max(1, h)); R(ctx, ox + i * sw + 1 + dx, oy + k, sw - 3, Math.min(6, h - k), i % 2 ? '#2a233c' : '#252036'); R(ctx, ox + i * sw + 1 + dx, oy + k, 3, Math.min(6, h - k), '#3d3556') }
  }
  R(ctx, ox, oy, ow, 6, '#4e4670')
  ctx.restore()
}

// ─────────────────────────────── the split-flap board (screen space)
const FLAPS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#'
const CELL_W = 40, CELL_H = 54, CELL_G = 4
/** a split-flap cell: ch, or scrambling while flipping (k 0…1 through the flip) */
function flapCell(ctx, x, y, ch, col, glow, flipping, seed) {
  R(ctx, x, y, CELL_W, CELL_H, '#120c26'); R(ctx, x, y, CELL_W, CELL_H / 2, '#19112f')
  if (ch && ch !== ' ') {
    ctx.save()
    if (glow > 0) { ctx.shadowColor = col; ctx.shadowBlur = 14 * glow }
    ctx.fillStyle = col; ctx.font = `700 38px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    if (flipping) { ctx.translate(x + CELL_W / 2, y + CELL_H / 2); ctx.scale(1, 0.55 + 0.45 * Math.abs(Math.sin(seed * 3.1))); ctx.fillText(ch, 0, 2) }
    else ctx.fillText(ch, x + CELL_W / 2, y + CELL_H / 2 + 2)
    ctx.restore()
  }
  R(ctx, x, y + CELL_H / 2 - 1, CELL_W, 2, 'rgba(0,0,0,0.75)')
  R(ctx, x, y + CELL_H / 2 + 1, CELL_W, 1, 'rgba(255,255,255,0.06)')
}
/** text in n cells (left- or right-aligned), flipping from `from` to `to` over [t0, t0 + 0.42 + stagger] */
function flapRun(ctx, t, x, y, n, from, to, t0, col, glow, align = 'left', seed = 1) {
  const pad = (s) => { s = (s || '').toUpperCase(); return align === 'left' ? s.padEnd(n).slice(0, n) : s.padStart(n).slice(-n) }
  const A = pad(from), B = pad(to)
  for (let i = 0; i < n; i++) {
    const s0 = t0 + i * 0.035, s1 = s0 + 0.38
    let ch = B[i], flipping = false
    if (t < s0) ch = A[i]
    else if (t < s1 && A[i] !== B[i]) { flipping = true; const k = Math.floor((t - s0) / 0.045); const r = rng(seed * 131 + i * 17 + k * 7); r(); ch = FLAPS[Math.floor(r() * FLAPS.length)] }
    flapCell(ctx, x + i * (CELL_W + CELL_G), y, ch, col, glow, flipping, i + seed)
  }
}
/** the board: state = { header, rows: [{ label, status, lc, sc }], prev: (same shape), at, rowsK (visible row count, may be fractional), hi: row index to glow } */
export function drawBoard(ctx, t, x, y, w, S) {
  const PAD = 16, HEAD = 58, ROW = 66
  const h = PAD * 2 + HEAD + ROW * S.rowsK
  // cables
  R(ctx, x + 60, y - 600, 3, 600, 'rgba(201,166,255,0.35)'); R(ctx, x + w - 63, y - 600, 3, 600, 'rgba(201,166,255,0.35)')
  // frame
  ctx.save(); ctx.shadowColor = 'rgba(6,3,18,0.7)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 12
  block(ctx, x - 8, y - 8, w + 16, h + 16, 6, '#4e4670'); ctx.restore()
  block(ctx, x - 8, y - 8, w + 16, h + 16, 6, '#4e4670')
  R(ctx, x + 4, y - 8, w - 8, 3, '#8d84ab')
  block(ctx, x, y, w, h, 4, '#0c0820')
  // header
  ctx.save()
  ctx.font = `700 34px ${MONO}`; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'
  if ('letterSpacing' in ctx) ctx.letterSpacing = '6px'
  const hk = clamp((t - S.at) / 0.3)
  let head = S.header
  if (S.prevHeader && S.prevHeader !== S.header && hk < 1) { const r = rng(Math.floor(t * 22)); head = [...S.header].map(c => c === ' ' ? ' ' : FLAPS[Math.floor(r() * 26)]).join('') }
  ctx.fillStyle = '#f2c75c'; ctx.shadowColor = 'rgba(242,199,92,0.6)'; ctx.shadowBlur = 12
  ctx.fillText(head, x + 30, y + PAD + HEAD / 2)
  ctx.restore()
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
  // a pixel plane on the right of the header
  bitmap(ctx, ['....X.....', '....XX....', 'XXXXXXXXXX', '.XXXXXXXXX', '....XX....', '....X.....', '...XXX....'], { X: '#f2c75c' }, x + w - 92, y + PAD + 10, 5)
  if (S.tag) { ctx.font = `700 26px ${MONO}`; ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; ctx.fillStyle = 'rgba(239,230,214,0.75)'; ctx.fillText(S.tag, x + w - 112, y + PAD + HEAD / 2 + 2) }
  R(ctx, x + 22, y + PAD + HEAD - 4, w - 44, 2, 'rgba(201,166,255,0.25)')
  // rows (clipped to the animated height)
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h - PAD + 4); ctx.clip()
  const nShow = Math.ceil(S.rowsK - 1e-3)
  for (let r = 0; r < Math.max(nShow, 1); r++) {
    const ry = y + PAD + HEAD + 6 + r * ROW
    const row = S.rows[r] || { label: '', status: '' }, pv = (S.prev && S.prev[r]) || { label: '', status: '' }
    const glow = S.hi === r ? 1 + 0.5 * Math.sin(t * 9) : 0.55
    if (S.hi === r) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = rgba(row.sc || '#ffffff', 0.12 + 0.06 * Math.sin(t * 9)); ctx.fillRect(x + 14, ry - 5, w - 28, CELL_H + 10); ctx.restore() }
    flapRun(ctx, t, x + 26, ry, 7, pv.label, row.label, S.at + r * 0.12, row.lc || '#efe6d6', glow * 0.6, 'left', 3 + r)
    const blink = row.blink && Math.floor(t * 3) % 2 === 0 ? 0.35 : 1
    ctx.save(); ctx.globalAlpha *= blink
    flapRun(ctx, t, x + w - 26 - 10 * (CELL_W + CELL_G) + CELL_G, ry, 10, pv.status, row.status, S.at + 0.1 + r * 0.12, row.sc || '#6dff9a', glow, 'right', 9 + r)
    ctx.restore()
  }
  ctx.restore()
  return h
}

// ─────────────────────────────── the luggage tag
/** a paper tag hanging on a string from (x, y); rot swings it about (x, y) */
export function drawTag(ctx, x, y, lines, { rot = 0, w = 200, size = 30, len = 24, paper = '#fbf3e2', ink = '#24163f', band = '#e23d66', alpha = 1, scale = 1 } = {}) {
  if (alpha <= 0) return
  const lh = Math.round(size * 1.08), pad = Math.round(size * 0.36), BAND = 12
  const h = 22 + BAND + pad * 2 + lh * lines.length, c = 12
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(scale, scale)
  R(ctx, -1.5, 0, 3, len + 6, 'rgba(239,230,214,0.9)')
  const top = len, L = -w / 2
  const shape = (dx, dy, col) => { R(ctx, L + c + dx, top + dy, w - 2 * c, c, col); R(ctx, L + c / 2 + dx, top + c / 2 + dy, w - c, c / 2, col); R(ctx, L + dx, top + c + dy, w, h - c, col) }
  shape(6, 8, 'rgba(8,4,20,0.35)')
  shape(-2, -2, '#1a1030'); shape(2, 2, '#1a1030'); shape(-2, 2, '#1a1030'); shape(2, -2, '#1a1030')
  shape(0, 0, paper)
  R(ctx, L, top + h - 5, w, 5, '#e2d5b8')
  R(ctx, L + c, top + 22, w - 2 * c, BAND, band)
  // the reinforced hole
  R(ctx, -9, top + 4, 18, 14, '#d9c9a2'); R(ctx, -5, top + 7, 10, 8, '#3a2d55')
  ctx.fillStyle = ink; ctx.font = `700 ${size}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  lines.forEach((ln, i) => ctx.fillText(ln, 0, top + 22 + BAND + pad + lh * (i + 0.5) + 1))
  ctx.restore()
}

// ─────────────────────────────── the bags (x, y = bottom centre)
export const TRUNK = { w: 300, h: 168, p: 6 }
/** Scorpio's steamer trunk: chains, three padlocks, an orange HEAVY sticker, a lid handle at each end */
export function drawTrunk(ctx, x, y, { wob = 0 } = {}) {
  const { p } = TRUNK, W = 50, H = 28, L = x - W * p / 2, Tp = y - H * p
  const C = (i, j, w, h, c) => R(ctx, L + i * p, Tp + j * p, w * p, h * p, c)
  ctx.save(); ctx.translate(x, y); ctx.rotate(wob * 0.03); ctx.translate(-x, -y)
  // lid handles (leather loops on the lid, one near each end)
  for (const hx of [6, 38]) { C(hx - 1, -4, 8, 5, OUT); C(hx, -3, 6, 1, '#8a3a46'); C(hx, -3, 1, 3, '#8a3a46'); C(hx + 5, -3, 1, 3, '#8a3a46'); C(hx + 1, -3, 4, 1, '#b5525f') }
  C(-1, -1, W + 2, H + 1, OUT)
  C(0, 0, W, H, '#2a1f3d')
  C(0, 0, W, 9, '#3a2c56'); C(0, 0, W, 1, '#5d4b85')
  C(0, 9, W, 1, OUT)
  C(0, H - 2, W, 2, '#1d152e')
  // straps + buckles
  for (const sx of [11, 36]) { C(sx, 0, 3, H, '#7a2e3a'); C(sx, 0, 1, H, '#a04452'); C(sx - 1, 8, 5, 4, '#e0b04a'); C(sx, 9, 3, 2, '#2a1f3d') }
  // brass corners
  for (const [cx, cy] of [[0, 0], [W - 4, 0], [0, H - 4], [W - 4, H - 4]]) { C(cx, cy, 4, 4, '#e0b04a'); C(cx + 1, cy + 1, 2, 2, '#9a6a1c'); C(cx + (cx ? 3 : 0), cy + (cy ? 3 : 0), 1, 1, '#fff0b0') }
  // chains: an X across the front
  for (let k = 0; k <= 10; k++) {
    const u = k / 10, ax = 15 + u * 19, ay = 11 + u * 15, bx = 34 - u * 19
    const col = k % 2 ? '#8d84ab' : '#d8d2ee'
    C(Math.round(ax), Math.round(ay), 2, 2, col); C(Math.round(bx), Math.round(ay), 2, 2, col)
  }
  // padlocks: a big one on the seam, two more on the chain
  const lock = (i, j, s) => { C(i + s * 0.5, j - s * 1.2, s * 2, s * 0.5, '#c4bce0'); C(i + s * 0.5, j - s * 1.2, s * 0.5, s * 1.2, '#c4bce0'); C(i + s * 2, j - s * 1.2, s * 0.5, s * 1.2, '#c4bce0'); C(i, j, s * 3, s * 2.4, '#e0b04a'); C(i, j, s * 3, s * 0.5, '#fff0b0'); C(i + s * 1.25, j + s * 0.8, s * 0.5, s * 0.9, '#2a1f3d') }
  lock(22.5, 7, 2)
  lock(17, 18, 1.4)
  lock(30.5, 19, 1.4)
  // the HEAVY sticker (airline orange)
  C(40, 16, 9, 7, OUT); C(40.5, 16.5, 8, 6, '#ff8a1f')
  ctx.fillStyle = '#1a1030'; ctx.font = `800 ${Math.round(p * 2.4)}px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText('HEAVY', L + 44.5 * p, Tp + 19.6 * p)
  ctx.restore()
  return { L, Tp, W: W * p, H: H * p, handles: [[L + 9 * p, Tp - 4 * p], [L + 41 * p, Tp - 4 * p]], tagAt: [L + 12.5 * p, Tp + 11 * p] }
}

/** Cancer's canvas tote, with the ex's hoodie sleeve flopping out */
export function drawTote(ctx, x, y, { p = 5, squeeze = 0 } = {}) {
  const W = 24, H = 21, L = x - W * p / 2, Tp = y - H * p
  const C = (i, j, w, h, c) => R(ctx, L + i * p, Tp + j * p, w * p, h * p, c)
  ctx.save(); ctx.translate(x, y); ctx.scale(1 + squeeze * 0.12, 1 - squeeze * 0.1); ctx.translate(-x, -y)
  // straps
  for (const sx of [5, 15]) { C(sx - 1, -8, 6, 9, OUT); C(sx, -7, 4, 1, '#c8b48a'); C(sx, -7, 1, 8, '#c8b48a'); C(sx + 3, -7, 1, 8, '#c8b48a') }
  C(-1, -1, W + 2, H + 2, OUT)
  C(0, 0, W, H, '#efe2c6'); C(W - 2, 0, 2, H, '#d8c7a3'); C(0, H - 2, W, 2, '#d2bf98'); C(0, 0, W, 1, '#fff6e2')
  // a little heart print
  bitmap(ctx, ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'], { X: '#ff7aa2' }, L + 8.5 * p, Tp + 8 * p, p)
  // the hoodie: a grey-blue lump over the top + a sleeve flopping over the left side, cuff + drawstring
  C(3, -3, 14, 4, '#7d8fb8'); C(4, -4, 10, 1, '#9fb0d6'); C(3, -3, 14, 1, '#9fb0d6')
  C(-3, -2, 6, 4, '#7d8fb8'); C(-4, 1, 4, 7, '#7d8fb8'); C(-4, 1, 1, 7, '#9fb0d6'); C(-5, 8, 5, 3, '#56658c'); C(-5, 8, 5, 1, '#6c7ba3')
  C(-5, -2, 1, 1, OUT); C(-5, 11, 5, 1, OUT)
  C(15, -2, 1, 6, '#ffffff'); C(14.5, 4, 2, 2, '#c4bce0')
  ctx.restore()
  return { L, Tp, tagAt: [L + 19 * p, Tp - 6 * p] }
}

/** Aries's tiny red duffel */
export function drawDuffel(ctx, x, y, { p = 4 } = {}) {
  const L = x - 14 * p, Tp = y - 14 * p
  bitmap(ctx, [
    '..........OOOOOOOO..........',
    '.........O........O.........',
    '.........O........O.........',
    '...OOOOOOOOOOOOOOOOOOOOOO...',
    '..OLLLLLLLLLLLLLLLLLLLLLLO..',
    '.OLLYGYGYGYGYGYGYGYGYGYLLLO.',
    'ODRRRRRRRRRRRRRRRRRRRRRRRRDO',
    'ODDRRRRRRRRRRRRRRRRRRRRRRDDO',
    'ODWDRRRRRRRRRRRRRRRRRRRRDWDO',
    'ODDDRRRRRRRRRRRRRRRRRRRRDDDO',
    'ODDRRRRRRRRRRRRRRRRRRRRRRDDO',
    '.ODSSSSSSSSSSSSSSSSSSSSSSDO.',
    '..OSSSSSSSSSSSSSSSSSSSSSSO..',
    '...OOOOOOOOOOOOOOOOOOOOOO...',
  ], { O: OUT, L: '#ff7a5e', R: '#e8453a', S: '#a82a26', D: '#7a1f1a', W: '#ffffff', Y: '#ffd23f', G: '#c99a20' }, L, Tp, p)
  return { L, Tp, tagAt: [x + 4 * p, Tp + 2 * p] }
}

/** a hard-shell suitcase with a telescoping handle, wheels and an optional big number sticker */
export function drawCase(ctx, x, y, { w = 96, h = 124, color = '#ff8a7a', p = 4, num = null, lit = '#ffc2b8', dark = '#d15e50' } = {}) {
  const L = x - w / 2, Tp = y - h
  // handle
  R(ctx, x - 18, Tp - 30, 36, 8, OUT); R(ctx, x - 16, Tp - 28, 32, 4, '#c4bce0'); R(ctx, x - 14, Tp - 24, 4, 26, '#8d84ab'); R(ctx, x + 10, Tp - 24, 4, 26, '#8d84ab')
  // wheels
  R(ctx, L + 6, y - 6, 14, 10, OUT); R(ctx, L + w - 20, y - 6, 14, 10, OUT)
  block(ctx, L - 4, Tp - 4, w + 8, h + 4, p, OUT)
  block(ctx, L, Tp, w, h - 4, p, color)
  for (let k = 1; k <= 3; k++) R(ctx, L + k * w / 4 - 3, Tp + 10, 6, h - 26, lit)
  R(ctx, L + 6, Tp + 3, w - 12, 4, '#ffffff')
  R(ctx, L, Tp + h - 16, w, 8, dark)
  if (num != null) {
    const r = Math.min(w, h) * 0.22
    R(ctx, x - r, Tp + h * 0.42 - r, 2 * r, 2 * r, '#fbf6ec'); R(ctx, x - r, Tp + h * 0.42 - r, 2 * r, 3, '#ffffff')
    ctx.fillStyle = dark; ctx.font = `800 ${Math.round(r * 1.5)}px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText(String(num), x, Tp + h * 0.42 + 2)
  }
  return { L, Tp, tagAt: [x + w * 0.18, Tp - 22] }
}

/** the FAMILY STUFF crate: planks, a brace, FRAGILE, and two THIS SIDE UP arrows that disagree */
export function drawCrate(ctx, x, y, { w = 300, h = 230, rot = 0 } = {}) {
  const L = -w / 2, Tp = -h
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  R(ctx, L - 5, Tp - 5, w + 10, h + 5, OUT)
  for (let j = 0; j < h; j += 38) { R(ctx, L, Tp + j, w, Math.min(36, h - j), (j / 38) % 2 ? '#b67c42' : '#c48a4e'); R(ctx, L, Tp + j, w, 3, '#d9a466') }
  // frame + diagonal brace
  R(ctx, L, Tp, w, 18, '#8f5a2c'); R(ctx, L, Tp + h - 18, w, 18, '#8f5a2c'); R(ctx, L, Tp, 18, h, '#8f5a2c'); R(ctx, L + w - 18, Tp, 18, h, '#8f5a2c')
  R(ctx, L, Tp, w, 3, '#c9905a'); R(ctx, L, Tp, 3, h, '#c9905a')
  for (let k = 0; k < 22; k++) { const u = k / 22; R(ctx, L + 18 + u * (w - 52), Tp + h - 34 - u * (h - 52), 18, 18, '#9a6432') }
  for (const [nx, ny] of [[8, 8], [w - 12, 8], [8, h - 12], [w - 12, h - 12]]) R(ctx, L + nx - 2, Tp + ny - 2, 6, 6, '#3a220e')
  // stencil
  ctx.fillStyle = 'rgba(30,16,40,0.92)'; ctx.font = `800 56px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  if ('letterSpacing' in ctx) ctx.letterSpacing = '2px'
  ctx.fillText('FAMILY', -6, Tp + h * 0.38); ctx.fillText('STUFF', -6, Tp + h * 0.38 + 60)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
  // FRAGILE stamp
  ctx.save(); ctx.translate(L + w * 0.74, Tp + h - 40); ctx.rotate(-0.16)
  ctx.strokeStyle = '#e8344e'; ctx.lineWidth = 4; ctx.strokeRect(-58, -16, 116, 32)
  ctx.fillStyle = '#e8344e'; ctx.font = `800 22px ${INTER}`; ctx.fillText('FRAGILE', 0, 1)
  ctx.restore()
  // THIS SIDE UP… both ways
  const arrow = (ax, ay, dir) => { for (let k = 0; k < 4; k++) R(ctx, ax - k * 4, ay + dir * k * 4, 4 + k * 8, 4, '#1e1028'); R(ctx, ax - 2, ay + dir * 16, 8, 22 * dir, '#1e1028') }
  arrow(L + 42, Tp + 30, 1)
  arrow(L + w - 40, Tp + h - 66, -1)
  ctx.restore()
}

// ─────────────────────────────── small stuff
export function drawPretzel(ctx, x, y, p, { bite = 0 } = {}) {
  const rows = [
    '.XXXX.XXXX.',
    'XYYYYXYYYYX',
    'XY..YXY..YX',
    'XY.XYYYX.YX',
    'XYXYX.XYXYX',
    '.XYX...XYX.',
    '..XYXXXYX..',
    '...XXXXX...',
  ]
  const r = bite ? rows.map((row, j) => j < 4 ? row.slice(0, 7) + '....' : row) : rows
  bitmap(ctx, r, { X: '#7a4416', Y: '#c98a3c' }, x - 5.5 * p, y - 4 * p, p)
  for (const [i, j] of [[2, 1], [7, 1], [1, 3], [9, 4], [4, 6]]) if (!(bite && j < 4 && i >= 7)) R(ctx, x - 5.5 * p + i * p + p * 0.25, y - 4 * p + j * p + p * 0.25, p * 0.5, p * 0.5, '#fff6e0')
}

/** Virgo's laminated packing list (centre x, y); glint 0…1 sweeps a shine across */
export function drawList(ctx, x, y, p, { glint = -1, rot = 0 } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  const w = 18 * p, h = 23 * p, L = -w / 2, Tp = -h / 2
  block(ctx, L - p, Tp - p, w + 2 * p, h + 2 * p, p, OUT)
  block(ctx, L, Tp, w, h, p, '#dff3ff')
  R(ctx, L + p, Tp + p, w - 2 * p, h - 2 * p, '#fbf6ec')
  R(ctx, L + 2 * p, Tp + 2 * p, w - 4 * p, 2 * p, '#ef5c94')
  const cols = ['#ff8a7a', '#f2c75c', '#6fe0b0', '#ff8a7a', '#f2c75c']
  cols.forEach((c, i) => { const ry = Tp + (6 + i * 3.2) * p; R(ctx, L + 2 * p, ry, 2 * p, 2 * p, c); R(ctx, L + 2.5 * p, ry + 0.5 * p, p, p, '#ffffff'); R(ctx, L + 5 * p, ry + 0.6 * p, (8 - (i % 3)) * p, p * 0.8, '#5b4a7a') })
  if (glint >= 0 && glint <= 1) {
    ctx.save(); ctx.beginPath(); ctx.rect(L - p, Tp - p, w + 2 * p, h + 2 * p); ctx.clip()
    ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,255,255,0.75)'
    const gx = L - w + glint * (w * 3)
    ctx.beginPath(); ctx.moveTo(gx, Tp - p); ctx.lineTo(gx + 3 * p, Tp - p); ctx.lineTo(gx - 6 * p, Tp + h + p); ctx.lineTo(gx - 9 * p, Tp + h + p); ctx.closePath(); ctx.fill()
    ctx.restore()
  }
  ctx.restore()
}

/** the yellow WET FLOOR A-frame (bottom centre) */
export function drawWetFloor(ctx, x, y, p, k = 1) {
  if (k <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k)
  const w = 16 * p, h = 22 * p
  R(ctx, -w / 2 - p, -h - p, w + 2 * p, h + p, OUT)
  R(ctx, -w / 2, -h, w, h - p, '#ffd23f'); R(ctx, -w / 2, -h, w, p, '#fff1a8'); R(ctx, w / 2 - 2 * p, -h, 2 * p, h - p, '#e0b020')
  R(ctx, -w / 2 - p, -p, 3 * p, p, OUT); R(ctx, w / 2 - 2 * p, -p, 3 * p, p, OUT)
  bitmap(ctx, ['...X...', '..XXX..', '..X.X..', '.XX.XX.', '.XXXXX.', 'XXX.XXX', 'XXXXXXX'], { X: '#1a1030' }, -3.5 * p, -h + 2 * p, p)
  ctx.fillStyle = '#1a1030'; ctx.font = `800 ${Math.round(p * 3.2)}px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText('WET', 0, -h + 12.5 * p); ctx.fillText('FLOOR', 0, -h + 16.5 * p)
  ctx.restore()
}

export function drawDrop(ctx, x, y, p) { bitmap(ctx, ['.D.', 'DWD', 'DDD', '.D.'], { D: '#6fd3ff', W: '#e6f8ff' }, x - 1.5 * p, y - 2 * p, p) }
export function drawTear(ctx, x, y, p) { bitmap(ctx, ['.T.', 'TWT', 'TTT', '.T.'], { T: '#6fd3ff', W: '#e6f8ff' }, x - 1.5 * p, y - 2 * p, p) }
export function drawSweat(ctx, x, y, p) { bitmap(ctx, ['.S.', 'SSS', 'SWS', '.S.'], { S: '#9fe4ff', W: '#ffffff' }, x - 1.5 * p, y - 2 * p, p) }
/** a flat pixel puddle centred on (x, y), w wide */
export function drawPuddle(ctx, x, y, w, p, t) {
  if (w <= 4) return
  const rows = [0.55, 0.85, 1, 0.8]
  rows.forEach((k, j) => R(ctx, x - (w * k) / 2, y + (j - 2) * p, w * k, p, j === 0 ? 'rgba(200,240,255,0.75)' : 'rgba(111,211,255,0.55)'))
  R(ctx, x - w * 0.2 + Math.sin(t * 2) * 4, y - 2 * p, p * 2, p * 0.6, '#ffffff')
}
export function drawPixelHeart(ctx, x, y, px, col = '#ff4f7e') {
  bitmap(ctx, ['.XX.XX.', 'XWXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'], { X: col, W: '#ffd0dc' }, x - 3.5 * px, y - 3 * px, px)
}
/** n small pixel stars circling (x, y) */
export function drawDizzy(ctx, x, y, t, r, n = 3) {
  for (let i = 0; i < n; i++) { const a = t * 5 + i * Math.PI * 2 / n; drawPixelStar(ctx, x + Math.cos(a) * r, y + Math.sin(a) * r * 0.32, 26, 1, ['#f2c75c', '#efe6d6', '#ff8fb1'][i % 3]) }
}
/** speed lines trailing to the right of (x, y) */
export function drawSpeed(ctx, x, y, len, h, a = 1, col = '#efe6d6') {
  ctx.save(); ctx.globalAlpha *= a
  for (let k = 0; k < 4; k++) { const ly = y - h / 2 + (k + 0.5) * h / 4, ll = len * (0.6 + 0.4 * ((k * 7) % 3) / 2); R(ctx, x + 10 + k * 6, ly, ll, 4, col) }
  ctx.restore()
}
/** a ring of pixel sparkles bursting from (cx, cy) */
export function sparkleRing(ctx, t, cx, cy, t0, n, R0, seed = 0, life = 0.7, size = 30) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  const p = 1 - Math.pow(1 - tt / life, 3)
  ctx.save(); ctx.globalAlpha *= 1 - (tt / life) ** 2
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(ctx, cx + Math.cos(a) * R0 * (0.6 + 0.6 * p), cy + Math.sin(a) * R0 * (0.6 + 0.6 * p) * 0.8, size * (1 - 0.4 * p), i % 2 ? 1 : 2, ['#f2c75c', '#efe6d6', '#ff8fb1', '#c9a6ff'][i % 4])
  }
  ctx.restore()
}
/** dust puffs (a heavy landing) at (x, y), k 0…1 */
export function drawDust(ctx, x, y, k, spread = 160, p = 8) {
  if (k <= 0 || k >= 1) return
  ctx.save(); ctx.globalAlpha *= (1 - k) * 0.85
  for (let i = 0; i < 8; i++) { const s = i % 2 ? 1 : -1, d = (0.3 + 0.7 * ((i * 37) % 10) / 10) * spread * (0.35 + 0.65 * k), yy = y - 10 - ((i * 13) % 4) * 6 * k - 18 * k; R(ctx, x + s * d - p, yy, p * (1.6 - k * 0.6), p * (1.6 - k * 0.6), i % 3 ? '#c9bfe6' : '#efe6d6') }
  ctx.restore()
}
