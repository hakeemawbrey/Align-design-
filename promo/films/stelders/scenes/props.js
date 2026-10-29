// stelders props — the pixel drawings for "The Elders." (Star Talk, Wild Lessons #10), shared inside this film only
// (promo/films/STARTALK2.md: props live in the film's own folder). Every helper is a pure function of its arguments
// (and t); nothing touches `document` at module top level (the sound build imports scenes/index.js in node).
//
//   drawPorch(ctx, t, { floor, alpha })     the floating front porch: back railing + posts, plank floor, fascia, three
//       steps down the middle, a lattice skirt and pixel clouds underneath (it floats in the night sky), a porch lantern.
//   chairBack / chairFront(ctx, cx, floor, w, backH)   a pixel rocking chair in two layers (back behind the sitter,
//       seat edge + arms + legs + rockers in front). Draw both inside the same rocking transform.
//   drawGlasses(ctx, eyes, { col })        tiny round reading glasses over a star's eyes (eyes = eyesOf(r)).
//   drawScarf(ctx, x0, y0, hang, floorLen, floorY, px)   grandma's knitting: needles + a striped scarf that hangs to the
//       floor and keeps going along it (it grows all film).
//   drawPlanet / drawLemonade / drawCane / drawTag / drawCricket / drawConstellationPair — see each.
//   Copied from stsupernova (same film family): bmp, glowAt, mixHex, drawSun, drawTears, eyesOf, drawSweat,
//   drawHearts, pixelHeart, sparkBurst.
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'

const TAU = Math.PI * 2
export const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const toHex = (r, g, b) => '#' + [r, g, b].map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('')
export const mixHex = (a, b, k) => { const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16); return toHex(lerp(A >> 16, B >> 16, k), lerp((A >> 8) & 255, (B >> 8) & 255, k), lerp(A & 255, B & 255, k)) }
const canvasOf = (w, h) => (typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(w, h) : Object.assign(document.createElement('canvas'), { width: w, height: h }))
const BM = s => s.trim().split(/\s+/)
const R = Math.round

/** char bitmap, top-left at x, y ('.' = clear, other chars looked up in pal) */
export function bmp(ctx, rows, x, y, px, pal, alpha = 1) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (!c) continue; ctx.fillStyle = c; ctx.fillRect(R(x + i * px), R(y + j * px), Math.ceil(px), Math.ceil(px)) } })
  ctx.restore()
}

/** soft additive glow */
export function glowAt(ctx, x, y, r, color, a) {
  if (a <= 0 || r <= 0) return
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, rgba(color, 0.5 * a)); g.addColorStop(0.4, rgba(color, 0.2 * a)); g.addColorStop(1, rgba(color, 0))
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill()
  ctx.restore()
}

// ─────────────────────────────────────────────── wood
export const WOOD = { hi: '#c78f58', body: '#9c6538', mid: '#7f4e2a', dark: '#5a3418', line: '#2a1408', tread: '#b98450', paint: '#e9dcc4', paintSh: '#bfae92' }
const box = (ctx, x, y, w, h, col) => { ctx.fillStyle = col; ctx.fillRect(R(x), R(y), R(w), R(h)) }
/** an outlined wooden bar (top-lit) */
function bar(ctx, x, y, w, h, P = 6, { body = WOOD.body, hi = WOOD.hi, dark = WOOD.dark } = {}) {
  box(ctx, x - P / 2, y - P / 2, w + P, h + P, WOOD.line)
  box(ctx, x, y, w, h, body)
  if (h > 2 * P) { box(ctx, x, y, Math.min(P, w), h, hi); box(ctx, x + w - Math.min(P, w), y, Math.min(P, w), h, dark) }
  else { box(ctx, x, y, w, Math.min(P, h), hi) }
}

// ─────────────────────────────────────────────── the porch (drawn every frame: it's cheap rectangles)
export const PORCH = { floor: 1050, top: 1022, fascia: 1076, fasciaB: 1112, steps: [1112, 1192, 1272], stepB: 1352, stepX: [262, 818], rail: 788 }
export function drawPorch(ctx, t, { alpha = 1, dy = 0 } = {}) {
  if (alpha <= 0) return
  const P = 6, F = PORCH
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(0, dy)
  // the lantern's warm pool of light on the porch
  glowAt(ctx, 96, 760, 420, '#ffb45a', 0.32 + 0.04 * Math.sin(t * 3.3))
  // clouds underneath (it floats)
  const puff = (cx, cy, rw, rh, col) => { for (let j = -rh; j <= rh; j += P) { const w = rw * Math.sqrt(Math.max(0, 1 - (j / rh) ** 2)); box(ctx, cx - w, cy + j, 2 * w, P, col) } }
  const drift = Math.sin(t * 0.4) * 10
  for (const [cx, cy, rw, rh] of [[150 + drift, 1196, 190, 54], [930 - drift, 1206, 200, 60], [540, 1376, 330, 46], [300 - drift, 1330, 150, 38], [800 + drift, 1336, 160, 40]]) {
    puff(ctx, cx, cy + 8, rw + 10, rh + 6, 'rgba(40,30,80,0.55)')
    puff(ctx, cx, cy, rw, rh, '#3d3470')
    puff(ctx, cx - rw * 0.12, cy - rh * 0.35, rw * 0.72, rh * 0.5, '#5a4f93')
  }
  // back railing: posts, top rail, balusters, bottom rail
  for (let x = 66; x < 1020; x += 54) bar(ctx, x, F.rail + 18, 12, F.top - F.rail - 30, P, { body: WOOD.paintSh, hi: WOOD.paint, dark: '#8f7f66' })
  bar(ctx, 10, F.rail, 1060, 18, P, { body: WOOD.paint, hi: '#fff6e4', dark: WOOD.paintSh })
  bar(ctx, 10, F.top - 22, 1060, 12, P, { body: WOOD.paintSh, hi: WOOD.paint, dark: '#8f7f66' })
  for (const x of [22, 1022]) { bar(ctx, x, F.rail - 230, 36, F.top - F.rail + 230, P, { body: WOOD.paint, hi: '#fff6e4', dark: WOOD.paintSh }); bar(ctx, x - 6, F.rail - 242, 48, 14, P, { body: '#fff6e4', hi: '#ffffff', dark: WOOD.paintSh }) }
  // the lantern hanging off the left post
  box(ctx, 58, F.rail - 200, 60, 6, WOOD.line); box(ctx, 106, F.rail - 200, 6, 30, WOOD.line)
  const lx = 109, ly = F.rail - 140
  box(ctx, lx - 24, ly - 36, 48, 8, '#3a2a1a'); box(ctx, lx - 18, ly - 28, 36, 52, '#3a2a1a'); box(ctx, lx - 12, ly - 22, 24, 40, '#ffd27a'); box(ctx, lx - 6, ly - 16, 12, 24, '#fff4c8'); box(ctx, lx - 24, ly + 24, 48, 8, '#3a2a1a')
  glowAt(ctx, lx, ly, 110, '#ffd27a', 0.8 + 0.1 * Math.sin(t * 5.1))
  // floor: planks (top surface), fascia
  box(ctx, -10, F.top - P / 2, 1100, F.fascia - F.top + P, WOOD.line)
  box(ctx, -10, F.top, 1100, F.fascia - F.top, WOOD.tread)
  box(ctx, -10, F.top, 1100, P, '#dca66c')
  for (let x = 30; x < 1080; x += 78) box(ctx, x, F.top + P, P / 2 + 1, F.fascia - F.top - P, WOOD.mid)
  box(ctx, -10, F.fascia, 1100, F.fasciaB - F.fascia, WOOD.body); box(ctx, -10, F.fascia, 1100, P, WOOD.hi); box(ctx, -10, F.fasciaB - P, 1100, P, WOOD.dark)
  // lattice skirt under the floor at the sides
  for (const [x0, x1] of [[-10, F.stepX[0]], [F.stepX[1], 1090]]) {
    box(ctx, x0, F.fasciaB, x1 - x0, 64, '#4a2a14')
    ctx.save(); ctx.beginPath(); ctx.rect(x0, F.fasciaB, x1 - x0, 64); ctx.clip()
    ctx.fillStyle = WOOD.mid
    for (let k = -80; k < x1 - x0 + 80; k += 30) for (let j = 0; j < 64; j += P) { ctx.fillRect(R(x0 + k + j), F.fasciaB + j, P, P); ctx.fillRect(R(x0 + k + 64 - j), F.fasciaB + j, P, P) }
    ctx.restore()
    box(ctx, x0, F.fasciaB + 64, x1 - x0, P, WOOD.line)
  }
  // three steps down the middle
  const [sx0, sx1] = F.stepX
  F.steps.forEach((y, k) => {
    const yb = k < 2 ? F.steps[k + 1] : F.stepB, x0 = sx0 - k * 0, x1 = sx1
    box(ctx, x0 - P / 2, y - P / 2, x1 - x0 + P, yb - y + P, WOOD.line)
    box(ctx, x0, y, x1 - x0, 20, WOOD.tread); box(ctx, x0, y, x1 - x0, P, '#dca66c')
    box(ctx, x0, y + 20, x1 - x0, yb - y - 20, WOOD.body); box(ctx, x0, yb - P, x1 - x0, P, WOOD.dark)
  })
  // stringers
  box(ctx, sx0 - 18, F.fasciaB, 18, F.stepB - F.fasciaB, WOOD.dark); box(ctx, sx1, F.fasciaB, 18, F.stepB - F.fasciaB, WOOD.dark)
  ctx.restore()
}

// ─────────────────────────────────────────────── rocking chair (origin = the rocker's floor contact)
/** the back of the chair (posts, top rail, spindles): behind the sitter */
export function chairBack(ctx, cx, floor, w, backH, seatH = 104) {
  const P = 6, seat = floor - seatH, top = seat - backH
  const px = w * 0.44
  // spindles
  for (let k = 0; k < 4; k++) { const x = cx - px * 0.6 + k * (px * 1.2 / 3); bar(ctx, x - 5, top + 30, 10, backH - 30, P, { body: WOOD.mid, hi: WOOD.body, dark: WOOD.dark }) }
  // top rail (slightly arched)
  for (let i = -6; i <= 6; i++) { const x = cx + i * px / 6, a = 8 * Math.cos(i / 6 * Math.PI / 2); bar(ctx, x - px / 12, top - a, px / 6 + 1, 26, P) }
  // posts with knob finials
  for (const s of [-1, 1]) { bar(ctx, cx + s * px - 8, top - 10, 16, backH + 10, P); bar(ctx, cx + s * px - 12, top - 26, 24, 18, P, { body: WOOD.hi, hi: '#e2ac72', dark: WOOD.mid }) }
}
/** the front of the chair (seat edge, arms, legs, rockers): in front of the sitter */
export function chairFront(ctx, cx, floor, w, seatH = 104) {
  const P = 6, seat = floor - seatH, hw = w / 2
  // legs
  for (const s of [-1, 1]) bar(ctx, cx + s * hw * 0.78 - 7, seat, 14, seatH - 14, P, { body: WOOD.mid, hi: WOOD.body, dark: WOOD.dark })
  // rockers: one curved runner (front view: a smile-shaped arc), thick
  const L = hw * 1.25
  for (let x = -L; x <= L; x += P) { const y = floor - 10 - 22 * ((x / L) ** 2); box(ctx, cx + x - 1, y - 3, P + 2, 16, WOOD.line); box(ctx, cx + x, y, P, 10, x < 0 ? WOOD.hi : WOOD.body) }
  // seat front edge
  bar(ctx, cx - hw, seat - 4, w, 20, P)
  // arms
  for (const s of [-1, 1]) { const ax = cx + s * (hw + 4) - (s > 0 ? 0 : 0); bar(ctx, ax - 10, seat - 70, 20, 66, P, { body: WOOD.mid, hi: WOOD.body, dark: WOOD.dark }); bar(ctx, ax - (s > 0 ? 18 : 26), seat - 82, 44, 16, P) }
}

// ─────────────────────────────────────────────── grandma's knitting
/** needles crossed at (x0, y0), the scarf hanging `hang` px to the floor, then lying `floorLen` px to the left along it */
export function drawScarf(ctx, x0, y0, hang, floorLen, floorY, px = 6, alpha = 1) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const W_ = 5 * px, cols = ['#ff7a66', '#efe6d6', '#ffb347']
  const hangY = Math.min(hang, floorY - y0)
  for (let y = 0; y < hangY; y += px) { const k = Math.floor(y / (3 * px)) % 3; box(ctx, x0 - W_ / 2, y0 + y, W_, px, cols[k]); box(ctx, x0 - W_ / 2 - px, y0 + y, px, px, '#3a1410'); box(ctx, x0 + W_ / 2, y0 + y, px, px, '#3a1410') }
  // the part lying on the floor (runs left)
  for (let x = 0; x < floorLen; x += px) { const k = Math.floor((x + hangY) / (3 * px)) % 3; const yy = floorY - W_ * 0.5 + Math.round(Math.sin(x * 0.035) * 1.5) * px * 0.5; box(ctx, x0 - x - px, yy, px, W_ * 0.6, cols[k]); box(ctx, x0 - x - px, yy + W_ * 0.6, px, px, '#3a1410') }
  // needles
  ctx.lineCap = 'round'
  for (const [a, b] of [[-1, 1], [1, 1]]) { ctx.strokeStyle = '#3a1410'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(x0 - 52 * a, y0 - 30 * b); ctx.lineTo(x0 + 40 * a, y0 + 18 * b); ctx.stroke(); ctx.strokeStyle = '#d9dbe8'; ctx.lineWidth = 5; ctx.stroke() }
  box(ctx, x0 - 54 - 6, y0 - 36, 12, 12, '#ff5c8a'); box(ctx, x0 + 54 - 6, y0 - 36, 12, 12, '#ff5c8a')
  ctx.restore()
}

// ─────────────────────────────────────────────── glasses, cane, lemonade, planets, tags, crickets
/** round-ish pixel reading glasses over a star's eyes (e = eyesOf(r)) */
export function drawGlasses(ctx, e, { col = '#2a1a10', lens = 'rgba(220,240,255,0.18)' } = {}) {
  const p = e.px, rw = 4 * p, rh = 3.5 * p
  for (const s of [-1, 1]) {
    const cx = e.ex + s * e.dx, cy = e.ey + p * 0.5
    box(ctx, cx - rw, cy - rh, 2 * rw, 2 * rh, lens)
    box(ctx, cx - rw + p, cy - rh - p, 2 * rw - 2 * p, p, col); box(ctx, cx - rw + p, cy + rh, 2 * rw - 2 * p, p, col)
    box(ctx, cx - rw - p * 0, cy - rh, p, 2 * rh, col); box(ctx, cx + rw - p, cy - rh, p, 2 * rh, col)
  }
  box(ctx, e.ex - e.dx + 4 * p - p, e.ey - p, 2 * e.dx - 8 * p + 2 * p, p, col)
}
/** a hooked walking cane, the hook's top at (x, y), length len, angle rot */
export function drawCane(ctx, x, y, len, rot = 0, px = 6) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  const hook = BM(`.XXXX. XHHHHX XH..HX X...HX ....HX ....HX`)
  bmp(ctx, hook, -5 * px, -px, px, { X: WOOD.line, H: WOOD.hi })
  box(ctx, -px, 4 * px, 3 * px, len, WOOD.line); box(ctx, 0, 4 * px, px, len - px, WOOD.hi)
  ctx.restore()
}
/** a lemonade glass (straw + lemon slice), bottom-centre at x, y */
export function drawLemonade(ctx, x, y, px = 5, level = 1) {
  const G_ = BM(`
.S.......
..S......
XXSXXXXX.
XwSwwwwXL
XyyyyyyXL
XyyyyyyXL
XyWyyyyX.
XyyyyyyX.
.XXXXXX..`)
  bmp(ctx, G_, x - 4.5 * px, y - G_.length * px, px, { X: '#3a2a4a', w: '#e8f6ff', y: level > 0.5 ? '#ffe46a' : '#fff6c8', W: '#fffbe0', S: '#ff6b8a', L: '#c6f25c' })
}
/** a small pixel planet (disc + highlight, optional ring) */
export function drawPlanet(ctx, x, y, r, col, { ring = false, alpha = 1 } = {}) {
  if (alpha <= 0 || r <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const P = Math.max(3, R(r / 4))
  for (let j = -r; j <= r; j += P) { const w = Math.sqrt(Math.max(0, r * r - j * j)); box(ctx, x - w, y + j, 2 * w, P, j < -r * 0.3 ? mixHex(col, '#ffffff', 0.35) : j > r * 0.4 ? mixHex(col, '#1b1236', 0.35) : col) }
  if (ring) { box(ctx, x - r * 1.7, y - P / 2, r * 3.4, P, '#f2d9a0'); box(ctx, x - r * 1.7, y - P / 2, P, P, '#c9a66a') }
  ctx.restore()
}
/** a two-line name tag (pixel panel: dark fill, gold rim), centred at x, y; k pops it */
export function drawTag(ctx, x, y, title, sub, { k = 1, alpha = 1, gold = '#f2c75c', w = 300 } = {}) {
  if (k <= 0 || alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.scale(k, k)
  const h = 92, P = 6
  const step = (o, col) => { ctx.fillStyle = col; ctx.fillRect(-w / 2 + o + 2 * P, -h / 2 + o, w - 2 * o - 4 * P, h - 2 * o); ctx.fillRect(-w / 2 + o, -h / 2 + o + 2 * P, w - 2 * o, h - 2 * o - 4 * P); ctx.fillRect(-w / 2 + o + P, -h / 2 + o + P, w - 2 * o - 2 * P, h - 2 * o - 2 * P) }
  ctx.translate(4, 6); step(0, 'rgba(6,4,18,0.55)'); ctx.translate(-4, -6)
  step(0, gold); step(P, 'rgba(18,10,40,0.96)')
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.font = "700 30px 'Space Mono', ui-monospace, monospace"; ctx.fillStyle = gold; ctx.fillText(title, 0, -16)
  ctx.font = "700 24px 'Space Mono', ui-monospace, monospace"; ctx.fillStyle = '#efe6d6'; ctx.fillText(sub, 0, 18)
  ctx.restore()
}
const CRICKET = BM(`
..a.....a..
...a...a...
....GGG....
...GgGGG...
.L.GGGGG.L.
..LGGGGGL..
.L.GGGGG.L.
L...GGG...L`)
/** a tiny pixel cricket (chirp 0…1 lifts its antennae + little sound marks) */
export function drawCricket(ctx, x, y, px, { chirp = 0, alpha = 1 } = {}) {
  if (alpha <= 0) return
  bmp(ctx, CRICKET, x - 5.5 * px, y - 8 * px - (chirp > 0.5 ? px : 0), px, { a: '#a9c46a', G: '#6f9a3a', g: '#c6e27a', L: '#3e5a20' }, alpha)
  if (chirp > 0.3) { ctx.save(); ctx.globalAlpha *= alpha * chirp; ctx.fillStyle = '#efe6d6'; for (const s of [-1, 1]) for (let k = 0; k < 3; k++) ctx.fillRect(R(x + s * (8 + k * 1.5) * px - px / 2), R(y - (11 + k) * px), px, px); ctx.restore() }
}

/** two little constellation people holding hands (gold lines + pixel-star joints), centred at cx, cy */
export function drawConstellationPair(ctx, cx, cy, t, { k = 1, alpha = 1, s = 1 } = {}) {
  if (k <= 0 || alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(cx, cy); ctx.scale(k * s, k * s)
  const sway = Math.sin(t * 2.4) * 4
  const figs = [-1, 1].map(sd => {
    const x = sd * 62
    return { head: [x, -64], neck: [x, -40], hip: [x + sd * 2, 16], lf: [x - 22, 66], rf: [x + 22, 66], outer: [x + sd * 46, -10 + sway * sd], inner: [sd * 8, -18 - sway * 0.5] }
  })
  ctx.strokeStyle = 'rgba(242,199,92,0.85)'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.setLineDash([10, 8])
  for (const f of figs) {
    ctx.beginPath()
    ctx.moveTo(...f.head); ctx.lineTo(...f.neck); ctx.lineTo(...f.hip); ctx.lineTo(...f.lf); ctx.moveTo(...f.hip); ctx.lineTo(...f.rf)
    ctx.moveTo(...f.outer); ctx.lineTo(...f.neck); ctx.lineTo(...f.inner)
    ctx.stroke()
  }
  ctx.setLineDash([])
  for (const f of figs) for (const [key, p] of Object.entries(f)) { const big = key === 'head' || key === 'inner'; drawPixelStar(ctx, p[0], p[1], big ? 30 : 22, (Math.floor(t * 3 + p[0]) % 2) ? 1 : 2, key === 'inner' ? '#ffd27a' : '#efe6d6') }
  pixelHeart(ctx, 0, -48 - Math.abs(Math.sin(t * 3)) * 6, 4, '#ff5c8a')
  ctx.restore()
}

// ─────────────────────────────────────────────── the Sun (from stsupernova: a 60-cell sprite, disc r 17.5, rays, eyes)
const SG = 60, SCX = 30, SDR = 17.5
const SUN = { body: '#ffcc4a', core: '#ffe486', light: '#fff2b8', shade: '#f6a234', deep: '#e57d22', line: '#7f3410', ray: '#ffb83a', rayHi: '#ffe08a', rayLine: '#93400f', blush: '#ff7a6e' }
const SUN_EYES = {
  open: BM(`.XXXX. XWWXXX XWWXXX XWXXXX XXXXXX XXXXXX XXXXWX .XXXX.`),
  half: BM(`...... ...... ...... XXXXXX XXXXXX XWXXXX XXXXWX .XXXX.`),
  shut: BM(`...... ...... ...... ...... ...... XXXXXX .XXXX. ......`),
  happy: BM(`...... ...... .XXXX. XXXXXX XX..XX X....X ...... ......`),
}
let SUN_BUF = null
function paintSun(eyeL, eyeR, lx, ly, blush) {
  if (!SUN_BUF) { const c = canvasOf(SG, SG); SUN_BUF = { c, x: c.getContext('2d') } }
  const x = SUN_BUF.x
  x.clearRect(0, 0, SG, SG)
  const px = (i, j, col) => { x.fillStyle = col; x.fillRect(i, j, 1, 1) }
  const Lx = -0.62, Ly = -0.78
  for (let j = 0; j < SG; j++) for (let i = 0; i < SG; i++) {
    const dx = i + 0.5 - SCX, dy = j + 0.5 - SCX, d = Math.hypot(dx, dy)
    if (d < SDR - 0.2 || d > 26.5) continue
    const a = Math.atan2(dy, dx) + Math.PI / 2, k = Math.round(a / (TAU / 12)), off = a - k * TAU / 12
    const len = k % 2 ? 23.6 : 26.2, wid = (1 - (d - SDR) / (len - SDR)) * 0.19
    if (d > SDR && d < len && Math.abs(off) < wid) px(i, j, Math.abs(off) < wid - 0.075 ? (dx * Lx + dy * Ly > 0 ? SUN.rayHi : SUN.ray) : SUN.rayLine)
  }
  for (let j = 0; j < SG; j++) for (let i = 0; i < SG; i++) {
    const dx = i + 0.5 - SCX, dy = j + 0.5 - SCX, d = Math.hypot(dx, dy)
    if (d > SDR + 0.9) continue
    if (d > SDR) { px(i, j, SUN.line); continue }
    const f = (dx * Lx + dy * Ly) / (d || 1)
    let col = SUN.body
    if (d > SDR - 1.4 && f < -0.2) col = SUN.deep
    else if (d > SDR - 2.6 && f < -0.05) col = SUN.shade
    else if (d > SDR - 1.6 && f > 0.25) col = SUN.light
    else if (d < 9) col = SUN.core
    px(i, j, col)
  }
  for (const [i, j] of [[19, 16], [20, 15], [21, 14], [18, 17], [22, 14]]) px(i, j, '#fffbe6')
  if (blush > 0) { x.globalAlpha = blush; for (const i of [18, 19, 20, 40, 41, 42]) { px(i, 35, SUN.blush); px(i, 36, SUN.blush) } x.globalAlpha = 1 }
  const put = (bm, x0, y0) => bm.forEach((row, jj) => [...row].forEach((ch, ii) => { if (ch !== '.') px(x0 + ii, y0 + jj, ch === 'X' ? '#1b1236' : '#ffffff') }))
  put(eyeL, 21 + (eyeL === SUN_EYES.open ? lx : 0), 26 + (eyeL === SUN_EYES.open ? ly : 0))
  put(eyeR, 33 + (eyeR === SUN_EYES.open ? lx : 0), 26 + (eyeR === SUN_EYES.open ? ly : 0))
  return SUN_BUF.c
}
const lidOf = (k, base) => (k >= 0.75 ? SUN_EYES.shut : k >= 0.25 ? SUN_EYES.half : base)
/** the Sun centred at x, y; cell = px per sprite cell. eyes: 'open' | 'half' | 'happy'; wink 0…1 (right eye);
 *  blink 0…1 both lids; rot = roll angle; sx / sy squash */
export function drawSun(ctx, x, y, cell, t, { rot = 0, eyes = 'half', look = [0, 0], wink = 0, blink = 0, glow = 1, alpha = 1, k = 1, blush = 0.7, sx = 1, sy = 1 } = {}) {
  if (alpha <= 0 || k <= 0) return
  const base = SUN_EYES[eyes] || SUN_EYES.half
  const lx = clamp(Math.round(look[0]), -1, 1), ly = clamp(Math.round(look[1]), -1, 1)
  const eL = lidOf(blink, base), eR = wink >= 0.6 ? SUN_EYES.happy : wink >= 0.25 ? SUN_EYES.half : lidOf(blink, base)
  const img = paintSun(eL, eR, lx, ly, blush)
  const S = SG * cell * k
  ctx.save(); ctx.globalAlpha *= alpha
  glowAt(ctx, x, y, S * 0.95, '#ff9a2e', glow * (0.85 + 0.15 * Math.sin(t * 1.7)))
  glowAt(ctx, x, y, S * 0.5, '#ffd66a', glow * 0.55)
  ctx.translate(R(x), R(y)); ctx.rotate(rot); ctx.scale(sx, sy)
  const sm = ctx.imageSmoothingEnabled; ctx.imageSmoothingEnabled = false
  ctx.drawImage(img, -S / 2, -S / 2, S, S)
  ctx.imageSmoothingEnabled = sm
  ctx.restore()
}

// ─────────────────────────────────────────────── small bits (from stsupernova)
/** happy tears: two little arcs of pixel drops springing sideways from the eyes */
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
      ctx.fillStyle = '#9fe4ff'; ctx.fillRect(R(gx - px / 2), R(gy - px), px, px * 2)
      ctx.fillStyle = '#ffffff'; ctx.fillRect(R(gx - px / 2), R(gy - px), Math.ceil(px / 2), Math.ceil(px / 2))
      ctx.restore()
    }
  }
}
const G36 = 36, HALF = 18
/** eye geometry of a plain drawStarChar result */
export function eyesOf(r) { const cell = r.size / G36; return { ex: r.x, ey: r.y + (19.2 - HALF) * cell, dx: 4.6 * cell, px: Math.max(3, R(cell)) } }

const DROP = BM(`..X.. .XWX. XWWXX XWXXX .XXX.`)
/** a sweat drop sliding down beside a star */
export function drawSweat(ctx, t, x, y, px, alpha = 1) {
  const ph = (t * 1.2) % 1
  bmp(ctx, DROP, x, y + ph * px * 6, px, { X: '#7fd0f0', W: '#ffffff' }, alpha * (1 - ph * 0.6))
}
const HEART = BM(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
/** floating pixel hearts rising from (x, y) from t0 */
export function drawHearts(ctx, t, t0, x, y, { n = 6, px = 7, spread = 140, life = 1.6, rise = 260, cols = ['#ff5c8a', '#ff8fb1', '#f2c75c'], alpha = 1 } = {}) {
  for (let i = 0; i < n; i++) {
    const k = (t - t0 - i * 0.12) / life
    if (k < 0 || k > 1) continue
    const hx = x + (((i * 53) % 7) / 6 - 0.5) * spread + Math.sin(k * 6 + i) * 12
    bmp(ctx, HEART, hx - 3.5 * px, y - k * rise, px, { X: cols[i % cols.length] }, alpha * Math.sin(Math.PI * k))
  }
}
/** one pixel heart, centred */
export function pixelHeart(ctx, x, y, px, col = '#ff5c8a', alpha = 1) { bmp(ctx, HEART, x - 3.5 * px, y - 3 * px, px, { X: col }, alpha) }
/** a ring of pixel stars bursting outward from (cx, cy) at t0 */
export function sparkBurst(ctx, t, cx, cy, t0, { n = 12, R: RR = 200, size = 28, seed = 1, cols = ['#f2c75c', '#efe6d6', '#ff8fb1', '#c9a6ff'], life = 0.8, squash = 1 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  const p = ease.outCubic(tt / life)
  ctx.save(); ctx.globalAlpha *= 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + seed
    const rr = RR * (0.45 + 0.75 * p) * (i % 2 ? 0.8 : 1)
    drawPixelStar(ctx, cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * squash, size * (1 - 0.45 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  ctx.restore()
}
/** speed lines trailing to the right of a body moving left (x, y = the body's centre) */
export function speedLinesL(ctx, x, y, len, { alpha = 1, n = 5, spread = 60, col = '#efe6d6', seed = 1 } = {}) {
  if (alpha <= 0 || len <= 2) return
  const r = rng(seed)
  ctx.save(); ctx.globalAlpha *= alpha; ctx.fillStyle = col
  for (let i = 0; i < n; i++) { const oy = (i / (n - 1) - 0.5) * spread, l = len * (0.55 + 0.45 * r()); ctx.fillRect(R(x + 30 + r() * 20), R(y + oy), R(l), 6) }
  ctx.restore()
}
void prog
